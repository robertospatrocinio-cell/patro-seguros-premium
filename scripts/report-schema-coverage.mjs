#!/usr/bin/env node
/**
 * Relatório de cobertura de schemas JSON-LD por rota.
 *
 * Percorre dist/**\/*.html (rode `npm run build` antes) e reporta, para cada
 * rota, quais dos schemas monitorados estão presentes e quais faltam:
 *   - BreadcrumbList
 *   - FAQPage
 *   - HowTo
 *   - Organization
 *   - LocalBusiness  (inclui InsuranceAgency como subtipo)
 *
 * Saída:
 *   - Console: tabela resumo + totais
 *   - /mnt/documents/schema-coverage-report.json (fallback: reports/)
 *   - /mnt/documents/schema-coverage-report.html (visualização filtrável)
 *
 * Uso:
 *   node scripts/report-schema-coverage.mjs [outDir]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ não encontrado — rode `npm run build` antes.");
  process.exit(1);
}

const TRACKED = ["BreadcrumbList", "FAQPage", "HowTo", "Organization", "LocalBusiness"];
// InsuranceAgency é subtipo de LocalBusiness → conta como LocalBusiness.
const TYPE_ALIASES = { InsuranceAgency: "LocalBusiness" };

const argOut = process.argv[2];
const outDir = argOut
  || (fs.existsSync("/mnt/documents") ? "/mnt/documents" : path.join(ROOT, "reports"));
fs.mkdirSync(outDir, { recursive: true });

const LD_RE = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function routeFromFile(rel) {
  const n = rel.replace(/\\/g, "/");
  if (n === "index.html") return "/";
  if (n.endsWith("/index.html")) return "/" + n.slice(0, -"/index.html".length);
  if (n.endsWith(".html")) return "/" + n.slice(0, -".html".length);
  return "/" + n;
}

function collectTypes(node, acc = new Set()) {
  if (!node || typeof node !== "object") return acc;
  if (Array.isArray(node)) { node.forEach((n) => collectTypes(n, acc)); return acc; }
  if (Array.isArray(node["@graph"])) node["@graph"].forEach((n) => collectTypes(n, acc));
  const t = node["@type"];
  if (t) (Array.isArray(t) ? t : [t]).forEach((x) => {
    acc.add(x);
    if (TYPE_ALIASES[x]) acc.add(TYPE_ALIASES[x]);
  });
  // recursão em filhos comuns (mainEntity, publisher, author, etc.)
  for (const [k, v] of Object.entries(node)) {
    if (k === "@graph" || k === "@type") continue;
    if (v && typeof v === "object") collectTypes(v, acc);
  }
  return acc;
}

const files = walk(DIST).sort();
const rows = [];
const totals = { files: files.length, parseErrors: 0 };
for (const t of TRACKED) totals[t] = 0;

for (const file of files) {
  const rel = path.relative(DIST, file);
  const route = routeFromFile(rel);
  const html = fs.readFileSync(file, "utf-8");
  const types = new Set();
  let blocks = 0;
  let parseErrors = 0;
  let m;
  LD_RE.lastIndex = 0;
  while ((m = LD_RE.exec(html)) !== null) {
    blocks += 1;
    try { collectTypes(JSON.parse(m[1].trim()), types); }
    catch { parseErrors += 1; }
  }
  totals.parseErrors += parseErrors;
  const present = TRACKED.filter((t) => types.has(t));
  const missing = TRACKED.filter((t) => !types.has(t));
  for (const t of present) totals[t] += 1;
  rows.push({ route, file: rel, blocks, parseErrors, present, missing });
}

rows.sort((a, b) => a.route.localeCompare(b.route));

const generatedAt = new Date().toISOString();
const report = { generatedAt, tracked: TRACKED, totals, rows };
const jsonPath = path.join(outDir, "schema-coverage-report.json");
fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

// -------- HTML --------
const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const cell = (ok) => ok
  ? '<td class="ok" title="presente">✅</td>'
  : '<td class="miss" title="faltando">—</td>';

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<title>Cobertura JSON-LD por rota — Patro Seguros</title>
<style>
  body{font-family:ui-sans-serif,system-ui,sans-serif;margin:0;padding:24px;background:#f8fafc;color:#0f172a}
  h1{margin:0 0 4px;font-size:22px;color:#003366}
  .meta{color:#64748b;font-size:13px;margin-bottom:16px}
  .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:20px}
  .card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:12px}
  .card .label{font-size:11px;text-transform:uppercase;color:#64748b;letter-spacing:.05em}
  .card .value{font-size:22px;font-weight:700;margin-top:4px}
  .card .sub{font-size:11px;color:#64748b;margin-top:2px}
  .controls{margin-bottom:12px;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
  input[type=search]{padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:13px;min-width:280px}
  label{font-size:13px;color:#334155}
  table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;font-size:13px}
  th,td{padding:6px 10px;text-align:left;border-bottom:1px solid #f1f5f9;vertical-align:middle}
  th{background:#f1f5f9;font-weight:600;font-size:11px;color:#334155;position:sticky;top:0;text-transform:uppercase;letter-spacing:.04em}
  td.ok{background:#f0fdf4;text-align:center;color:#16a34a;font-weight:700}
  td.miss{background:#fef2f2;text-align:center;color:#94a3b8}
  code{font-size:12px;background:#f1f5f9;padding:1px 4px;border-radius:3px}
  tr:hover td{background:#f8fafc}
  tr:hover td.ok{background:#dcfce7}
  tr:hover td.miss{background:#fee2e2}
</style></head><body>
<h1>Cobertura JSON-LD por rota</h1>
<div class="meta">Gerado em ${escape(generatedAt)} · ${totals.files} rota(s) analisada(s) em <code>dist/</code></div>
<div class="cards">
  ${TRACKED.map((t) => `<div class="card"><div class="label">${t}</div><div class="value">${totals[t]}</div><div class="sub">de ${totals.files} rotas (${((totals[t] / totals.files) * 100).toFixed(1)}%)</div></div>`).join("")}
</div>
<div class="controls">
  <input id="q" type="search" placeholder="Filtrar por rota..."/>
  <label><input type="checkbox" id="only-miss"/> Mostrar só rotas com algo faltando</label>
</div>
<table id="t"><thead><tr>
  <th>Rota</th>
  ${TRACKED.map((t) => `<th>${t}</th>`).join("")}
  <th>Blocos</th>
</tr></thead><tbody>
${rows.map((r) => {
  const hasMissing = r.missing.length > 0;
  return `<tr data-route="${escape(r.route)}" data-miss="${hasMissing}">
    <td><code>${escape(r.route)}</code></td>
    ${TRACKED.map((t) => cell(r.present.includes(t))).join("")}
    <td style="text-align:right">${r.blocks}${r.parseErrors ? ` <span style="color:#dc2626">(${r.parseErrors} erros)</span>` : ""}</td>
  </tr>`;
}).join("\n")}
</tbody></table>
<script>
  const q=document.getElementById('q'),om=document.getElementById('only-miss'),rows=[...document.querySelectorAll('#t tbody tr')];
  function apply(){const term=q.value.toLowerCase(),fo=om.checked;rows.forEach(r=>{const m=r.dataset.route.toLowerCase().includes(term);const f=!fo||r.dataset.miss==='true';r.style.display=m&&f?'':'none';});}
  q.addEventListener('input',apply);om.addEventListener('change',apply);
</script>
</body></html>`;

const htmlPath = path.join(outDir, "schema-coverage-report.html");
fs.writeFileSync(htmlPath, html);

// -------- Console summary --------
console.log(`\n📊 Cobertura JSON-LD — ${totals.files} rotas analisadas\n`);
const pad = (s, n) => String(s).padEnd(n);
console.log(pad("Schema", 18) + pad("Presente", 12) + "Cobertura");
console.log("─".repeat(48));
for (const t of TRACKED) {
  const pct = ((totals[t] / totals.files) * 100).toFixed(1) + "%";
  console.log(pad(t, 18) + pad(`${totals[t]}/${totals.files}`, 12) + pct);
}

const withMissing = rows.filter((r) => r.missing.length);
console.log(`\n${withMissing.length} rota(s) com pelo menos um schema faltando.`);
if (withMissing.length && withMissing.length <= 30) {
  for (const r of withMissing) {
    console.log(`  • ${r.route}  faltando: ${r.missing.join(", ")}`);
  }
} else if (withMissing.length) {
  console.log(`  (lista completa no HTML/JSON — mostrando 10 primeiras)`);
  for (const r of withMissing.slice(0, 10)) {
    console.log(`  • ${r.route}  faltando: ${r.missing.join(", ")}`);
  }
}

if (totals.parseErrors) {
  console.log(`\n⚠️  ${totals.parseErrors} bloco(s) JSON-LD com sintaxe inválida.`);
}

console.log(`\n📝 Relatórios:`);
console.log(`   • ${jsonPath}`);
console.log(`   • ${htmlPath}`);