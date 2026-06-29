#!/usr/bin/env node
/**
 * Gera um relatório (JSON + HTML) auditando cada HTML pré-renderizado em dist/
 * com a contagem de nós Organization, InsuranceAgency/LocalBusiness,
 * aggregateRating e os @id encontrados.
 *
 * Uso:
 *   node scripts/report-schema-uniqueness.mjs [outDir]
 *
 * Default outDir: /mnt/documents (fallback: ./reports).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ não encontrado — rode o build antes.");
  process.exit(1);
}

const argOut = process.argv[2];
const DEFAULT_OUT = "/mnt/documents";
const outDir = argOut || (fs.existsSync("/mnt/documents") ? DEFAULT_OUT : path.join(ROOT, "reports"));
fs.mkdirSync(outDir, { recursive: true });

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const LD_RE = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
const typesOf = (n) => (Array.isArray(n?.["@type"]) ? n["@type"] : n?.["@type"] ? [n["@type"]] : []);

function collectNodes(json, out = []) {
  if (!json || typeof json !== "object") return out;
  if (Array.isArray(json)) { json.forEach((n) => collectNodes(n, out)); return out; }
  if (Array.isArray(json["@graph"])) json["@graph"].forEach((n) => collectNodes(n, out));
  if (json["@type"]) out.push(json);
  return out;
}

function routeFromFile(rel) {
  const norm = rel.replace(/\\/g, "/");
  if (norm === "index.html") return "/";
  if (norm.endsWith("/index.html")) return "/" + norm.slice(0, -"/index.html".length);
  if (norm.endsWith(".html")) return "/" + norm.slice(0, -".html".length);
  return "/" + norm;
}

const files = walk(DIST);
const rows = [];
let totals = { files: files.length, ok: 0, fail: 0, parseErrors: 0 };

for (const file of files) {
  const rel = path.relative(DIST, file);
  const html = fs.readFileSync(file, "utf-8");
  const nodes = [];
  let parseErrors = 0;
  let m;
  LD_RE.lastIndex = 0;
  while ((m = LD_RE.exec(html)) !== null) {
    try { collectNodes(JSON.parse(m[1].trim()), nodes); }
    catch { parseErrors += 1; }
  }
  totals.parseErrors += parseErrors;

  let org = 0, agency = 0, agg = 0;
  const ids = [];
  const idDupes = [];
  const idMap = new Map();
  for (const node of nodes) {
    const types = typesOf(node);
    const isAgency = types.includes("InsuranceAgency") || types.includes("LocalBusiness");
    const isPureOrg = types.includes("Organization") && !isAgency;
    if (isPureOrg) org += 1;
    if (isAgency) agency += 1;
    if (node.aggregateRating) agg += 1;
    const id = node["@id"];
    if (id) {
      ids.push(id);
      const sig = `${types.sort().join(",")}|${node.name || ""}`;
      if (idMap.has(id) && idMap.get(id) !== sig) idDupes.push(id);
      else idMap.set(id, sig);
    }
  }

  const issues = [];
  if (org !== 1) issues.push(`Organization=${org} (esperado 1)`);
  if (agency !== 1) issues.push(`InsuranceAgency=${agency} (esperado 1)`);
  if (agg > 1) issues.push(`aggregateRating em ${agg} nós`);
  if (idDupes.length) issues.push(`@id duplicado: ${[...new Set(idDupes)].join(", ")}`);
  if (parseErrors) issues.push(`${parseErrors} JSON-LD inválido(s)`);

  const ok = issues.length === 0;
  if (ok) totals.ok += 1; else totals.fail += 1;

  rows.push({
    route: routeFromFile(rel),
    file: rel,
    organization: org,
    insuranceAgency: agency,
    aggregateRating: agg,
    jsonLdBlocks: nodes.length,
    parseErrors,
    ids: [...new Set(ids)],
    ok,
    issues,
  });
}

rows.sort((a, b) => Number(a.ok) - Number(b.ok) || a.route.localeCompare(b.route));

const generatedAt = new Date().toISOString();
const json = { generatedAt, totals, rows };
const jsonPath = path.join(outDir, "schema-uniqueness-report.json");
fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2));

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const badge = (ok) => ok
  ? '<span style="background:#16a34a;color:#fff;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600">OK</span>'
  : '<span style="background:#dc2626;color:#fff;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600">FAIL</span>';

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<title>Schema Uniqueness Report — Patro Seguros</title>
<style>
  body{font-family:ui-sans-serif,system-ui,sans-serif;margin:0;padding:24px;background:#f8fafc;color:#0f172a}
  h1{margin:0 0 4px;font-size:22px;color:#003366}
  .meta{color:#64748b;font-size:13px;margin-bottom:16px}
  .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px}
  .card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:12px}
  .card .label{font-size:11px;text-transform:uppercase;color:#64748b;letter-spacing:.05em}
  .card .value{font-size:24px;font-weight:700;margin-top:4px}
  .controls{margin-bottom:12px;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
  input[type=search]{padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:13px;min-width:240px}
  label{font-size:13px;color:#334155}
  table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;font-size:13px}
  th,td{padding:8px 10px;text-align:left;border-bottom:1px solid #f1f5f9;vertical-align:top}
  th{background:#f1f5f9;font-weight:600;font-size:12px;color:#334155;position:sticky;top:0}
  tr.fail td{background:#fef2f2}
  td.num{text-align:right;font-variant-numeric:tabular-nums}
  code{font-size:12px;background:#f1f5f9;padding:1px 4px;border-radius:3px}
  .issues{color:#dc2626;font-size:12px}
</style></head><body>
<h1>Schema Uniqueness Report</h1>
<div class="meta">Gerado em ${escape(generatedAt)} · dist/ pré-renderizado</div>
<div class="cards">
  <div class="card"><div class="label">Arquivos</div><div class="value">${totals.files}</div></div>
  <div class="card"><div class="label">OK</div><div class="value" style="color:#16a34a">${totals.ok}</div></div>
  <div class="card"><div class="label">Falhas</div><div class="value" style="color:#dc2626">${totals.fail}</div></div>
  <div class="card"><div class="label">JSON inválidos</div><div class="value">${totals.parseErrors}</div></div>
</div>
<div class="controls">
  <input id="q" type="search" placeholder="Filtrar por rota..."/>
  <label><input type="checkbox" id="only-fail"/> Mostrar só falhas</label>
</div>
<table id="t"><thead><tr>
  <th>Status</th><th>Rota</th><th class="num">Org</th><th class="num">Agency</th>
  <th class="num">AggRating</th><th class="num">Blocos JSON-LD</th><th>@id</th><th>Issues</th>
</tr></thead><tbody>
${rows.map((r) => `<tr class="${r.ok ? "ok" : "fail"}" data-route="${escape(r.route)}" data-ok="${r.ok}">
  <td>${badge(r.ok)}</td>
  <td><code>${escape(r.route)}</code></td>
  <td class="num">${r.organization}</td>
  <td class="num">${r.insuranceAgency}</td>
  <td class="num">${r.aggregateRating}</td>
  <td class="num">${r.jsonLdBlocks}</td>
  <td>${r.ids.map((i) => `<code>${escape(i)}</code>`).join(" ")}</td>
  <td class="issues">${r.issues.map(escape).join("<br>")}</td>
</tr>`).join("\n")}
</tbody></table>
<script>
  const q=document.getElementById('q'),of=document.getElementById('only-fail'),rows=[...document.querySelectorAll('#t tbody tr')];
  function apply(){const term=q.value.toLowerCase(),fo=of.checked;rows.forEach(r=>{const m=r.dataset.route.toLowerCase().includes(term);const f=!fo||r.dataset.ok==='false';r.style.display=m&&f?'':'none';});}
  q.addEventListener('input',apply);of.addEventListener('change',apply);
</script>
</body></html>`;

const htmlPath = path.join(outDir, "schema-uniqueness-report.html");
fs.writeFileSync(htmlPath, html);

console.log(`✅ Relatório gerado:`);
console.log(`   • ${jsonPath}`);
console.log(`   • ${htmlPath}`);
console.log(`   Totais: ${totals.ok} OK / ${totals.fail} falhas / ${totals.files} arquivos`);