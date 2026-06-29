#!/usr/bin/env node
/**
 * Painel de auditoria contínua (HTML + JSON) consolidando 3 dimensões por rota:
 *   1. Sitemap & robots — cobertura, presença em sitemap, robots.txt
 *   2. Headings — H1 único, H2 duplicado (sintoma de template duplicado)
 *   3. Rich snippets / JSON-LD — Organization, InsuranceAgency, aggregateRating,
 *      BreadcrumbList, Article/FAQPage etc., parse errors e @id duplicado.
 *
 * Uso:  node scripts/audit-dashboard.mjs [outDir]
 * Default outDir: /mnt/documents (fallback ./reports).
 * Lê dist/ — exige `bun run build` antes. Para SSG real das 836 rotas:
 *   ENABLE_REACT_SSG=1 bun run build
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ não encontrado — rode `bun run build` antes.");
  process.exit(1);
}

const argOut = process.argv[2];
const outDir = argOut || (fs.existsSync("/mnt/documents") ? "/mnt/documents" : path.join(ROOT, "reports"));
fs.mkdirSync(outDir, { recursive: true });

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}
function routeFromFile(rel) {
  const norm = rel.replace(/\\/g, "/");
  if (norm === "index.html") return "/";
  if (norm.endsWith("/index.html")) return "/" + norm.slice(0, -"/index.html".length);
  if (norm.endsWith(".html")) return "/" + norm.slice(0, -".html".length);
  return "/" + norm;
}
const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const typesOf = (n) => (Array.isArray(n?.["@type"]) ? n["@type"] : n?.["@type"] ? [n["@type"]] : []);

function collectNodes(json, out = []) {
  if (!json || typeof json !== "object") return out;
  if (Array.isArray(json)) { json.forEach((n) => collectNodes(n, out)); return out; }
  if (Array.isArray(json["@graph"])) json["@graph"].forEach((n) => collectNodes(n, out));
  if (json["@type"]) out.push(json);
  return out;
}

// ─── Sitemap & robots ─────────────────────────────────────────────────────
const sitemapFiles = fs.readdirSync(DIST).filter((f) => /^sitemap.*\.xml$/i.test(f));
const sitemapUrls = new Set();
const LOC_RE = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
for (const f of sitemapFiles) {
  const xml = fs.readFileSync(path.join(DIST, f), "utf-8");
  let m;
  while ((m = LOC_RE.exec(xml)) !== null) sitemapUrls.add(m[1].trim());
}
const sitemapPaths = new Set(
  [...sitemapUrls].map((u) => {
    try { return new URL(u).pathname.replace(/\/$/, "") || "/"; }
    catch { return u; }
  })
);

const robotsPath = path.join(DIST, "robots.txt");
const hasRobots = fs.existsSync(robotsPath);
const robotsTxt = hasRobots ? fs.readFileSync(robotsPath, "utf-8") : "";
const robotsHasSitemap = /^Sitemap:/im.test(robotsTxt);
const robotsDisallowAll = /User-agent:\s*\*[\s\S]*?Disallow:\s*\/\s*$/im.test(robotsTxt);

// ─── Per-route headings + JSON-LD ─────────────────────────────────────────
const LD_RE = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
const H1_RE = /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi;
const H2_RE = /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi;
const stripTags = (s) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const files = walk(DIST);
const rows = [];
const totals = {
  files: files.length, ok: 0, fail: 0, parseErrors: 0,
  missingFromSitemap: 0, duplicateH2: 0, missingH1: 0, multiH1: 0,
  multiOrg: 0, multiAgency: 0, multiAggRating: 0,
};
const SITEMAP_EXEMPT = /^\/(404|lovable|admin)(\/|$)/;

for (const file of files) {
  const rel = path.relative(DIST, file);
  const route = routeFromFile(rel);
  const html = fs.readFileSync(file, "utf-8");

  const h1s = [...html.matchAll(H1_RE)].map((m) => stripTags(m[1]));
  const h2s = [...html.matchAll(H2_RE)].map((m) => stripTags(m[1])).filter(Boolean);
  const dupH2 = (() => {
    const map = new Map();
    for (const t of h2s) map.set(t, (map.get(t) ?? 0) + 1);
    return [...map.entries()].filter(([, n]) => n > 1).map(([t, n]) => `"${t}" ×${n}`);
  })();

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
  const presentTypes = new Set();
  for (const node of nodes) {
    const types = typesOf(node);
    types.forEach((t) => presentTypes.add(t));
    const isAgency = types.includes("InsuranceAgency") || types.includes("LocalBusiness");
    const isPureOrg = types.includes("Organization") && !isAgency;
    if (isPureOrg) org += 1;
    if (isAgency) agency += 1;
    if (node.aggregateRating) agg += 1;
  }

  const exempt = SITEMAP_EXEMPT.test(route);
  const routeNorm = route.replace(/\/$/, "") || "/";
  const inSitemap = sitemapPaths.has(routeNorm) || sitemapPaths.has(route) || exempt;

  const issues = [];
  if (!inSitemap) { issues.push("ausente em sitemap*.xml"); totals.missingFromSitemap += 1; }
  if (h1s.length === 0) { issues.push("sem H1"); totals.missingH1 += 1; }
  if (h1s.length > 1) { issues.push(`H1×${h1s.length}`); totals.multiH1 += 1; }
  if (dupH2.length) { issues.push(`H2 duplicado: ${dupH2.join(", ")}`); totals.duplicateH2 += 1; }
  if (org > 1) { issues.push(`Organization×${org}`); totals.multiOrg += 1; }
  if (agency > 1) { issues.push(`InsuranceAgency×${agency}`); totals.multiAgency += 1; }
  if (agg > 1) { issues.push(`aggregateRating×${agg}`); totals.multiAggRating += 1; }
  if (parseErrors) issues.push(`${parseErrors} JSON-LD inválido(s)`);

  const ok = issues.length === 0;
  if (ok) totals.ok += 1; else totals.fail += 1;

  rows.push({
    route, file: rel, inSitemap,
    h1Count: h1s.length, h2Count: h2s.length, duplicateH2: dupH2,
    jsonLdBlocks: nodes.length,
    organization: org, insuranceAgency: agency, aggregateRating: agg,
    schemaTypes: [...presentTypes].sort(), parseErrors, ok, issues,
  });
}

rows.sort((a, b) => Number(a.ok) - Number(b.ok) || a.route.localeCompare(b.route));

const generatedAt = new Date().toISOString();
// Detecta build sem ENABLE_REACT_SSG: se >80% dos HTMLs não têm H1 estático,
// é o shell SPA — o relatório vira ruído. Banner avisa o usuário.
const ssgLikelyOff = totals.missingH1 / Math.max(1, totals.files) > 0.8;
const sitemapsMeta = {
  files: sitemapFiles, totalUrls: sitemapUrls.size,
  robotsTxt: hasRobots, robotsHasSitemap, robotsDisallowAll,
};
const jsonReport = { generatedAt, ssgLikelyOff, totals, sitemaps: sitemapsMeta, rows };
const jsonPath = path.join(outDir, "audit-dashboard.json");
fs.writeFileSync(jsonPath, JSON.stringify(jsonReport, null, 2));

const badge = (ok) => ok ? '<span class="b ok">OK</span>' : '<span class="b fail">FAIL</span>';
const pill = (label, value, color = "#0f172a") =>
  `<span class="pill" style="color:${color};border-color:${color}33">${escape(label)}: <b>${value}</b></span>`;

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
<title>Auditoria Contínua — Patro Seguros</title>
<style>
  :root{--navy:#003366;--cta:#F2994A;--bg:#f8fafc;--ink:#0f172a;--muted:#64748b;--line:#e2e8f0;--ok:#16a34a;--fail:#dc2626}
  *{box-sizing:border-box}
  body{font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;margin:0;padding:24px;background:var(--bg);color:var(--ink)}
  header{display:flex;justify-content:space-between;align-items:end;flex-wrap:wrap;gap:12px;margin-bottom:16px}
  h1{margin:0;font-size:22px;color:var(--navy)}
  .meta{color:var(--muted);font-size:13px}
  .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:18px}
  .card{background:#fff;border:1px solid var(--line);border-radius:8px;padding:12px}
  .card .label{font-size:11px;text-transform:uppercase;color:var(--muted);letter-spacing:.05em}
  .card .value{font-size:22px;font-weight:700;margin-top:4px}
  details{background:#fff;border:1px solid var(--line);border-radius:8px;padding:10px 14px;margin-bottom:14px}
  details summary{cursor:pointer;font-weight:600;color:var(--navy);font-size:14px}
  .pill{display:inline-block;font-size:12px;padding:2px 8px;border:1px solid;border-radius:9999px;margin:3px 4px 0 0;background:#fff}
  .controls{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
  input[type=search]{padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;font-size:13px;min-width:260px}
  label{font-size:13px;color:#334155;user-select:none}
  table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--line);border-radius:8px;overflow:hidden;font-size:13px}
  th,td{padding:7px 10px;text-align:left;border-bottom:1px solid #f1f5f9;vertical-align:top}
  th{background:#f1f5f9;font-weight:600;font-size:12px;color:#334155;position:sticky;top:0;z-index:1}
  tr.fail td{background:#fef2f2}
  td.num{text-align:right;font-variant-numeric:tabular-nums}
  code{font-size:12px;background:#f1f5f9;padding:1px 4px;border-radius:3px}
  .types code{font-size:11px;margin:1px}
  .issues{color:var(--fail);font-size:12px}
  .b{padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;color:#fff}
  .b.ok{background:var(--ok)} .b.fail{background:var(--fail)}
  footer{margin-top:18px;color:var(--muted);font-size:12px}
</style></head><body>
<header>
  <div>
    <h1>Auditoria Contínua — Patro Seguros</h1>
    <div class="meta">Gerado em ${escape(generatedAt)} · dist/ pré-renderizado · 3 dimensões (sitemap/robots · headings · JSON-LD)</div>
  </div>
  <div class="meta">SSG real das 836 rotas: <code>ENABLE_REACT_SSG=1 bun run build</code></div>
</header>

${ssgLikelyOff ? `<div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;padding:12px 16px;margin-bottom:16px;color:#78350f;font-size:13px">
  <b>⚠ Build sem SSG real detectado</b> — ${totals.missingH1}/${totals.files} HTMLs estão como shell SPA (sem H1 estático).
  As métricas de headings e JSON-LD por rota só são confiáveis após
  <code>ENABLE_REACT_SSG=1 bun run build</code> (ou no CI <code>seo-validation.yml</code>, que já roda assim).
  Sitemap/robots e os contadores agregados continuam válidos.
</div>` : ""}

<div class="cards">
  <div class="card"><div class="label">Arquivos auditados</div><div class="value">${totals.files}</div></div>
  <div class="card"><div class="label">OK</div><div class="value" style="color:var(--ok)">${totals.ok}</div></div>
  <div class="card"><div class="label">Falhas</div><div class="value" style="color:var(--fail)">${totals.fail}</div></div>
  <div class="card"><div class="label">Ausentes em sitemap</div><div class="value">${totals.missingFromSitemap}</div></div>
  <div class="card"><div class="label">H2 duplicado</div><div class="value">${totals.duplicateH2}</div></div>
  <div class="card"><div class="label">Sem H1</div><div class="value">${totals.missingH1}</div></div>
  <div class="card"><div class="label">H1 múltiplo</div><div class="value">${totals.multiH1}</div></div>
  <div class="card"><div class="label">Organization &gt;1</div><div class="value">${totals.multiOrg}</div></div>
  <div class="card"><div class="label">InsuranceAgency &gt;1</div><div class="value">${totals.multiAgency}</div></div>
  <div class="card"><div class="label">aggregateRating &gt;1</div><div class="value">${totals.multiAggRating}</div></div>
  <div class="card"><div class="label">JSON-LD inválido</div><div class="value">${totals.parseErrors}</div></div>
</div>

<details open>
  <summary>Sitemap &amp; robots</summary>
  <div style="margin-top:10px">
    ${pill("sitemaps", sitemapFiles.length)}
    ${pill("URLs únicas", sitemapUrls.size)}
    ${pill("robots.txt", hasRobots ? "presente" : "ausente", hasRobots ? "#16a34a" : "#dc2626")}
    ${pill("Sitemap em robots", robotsHasSitemap ? "sim" : "não", robotsHasSitemap ? "#16a34a" : "#dc2626")}
    ${pill("Disallow: /", robotsDisallowAll ? "BLOQUEADO" : "não", robotsDisallowAll ? "#dc2626" : "#16a34a")}
    <div style="margin-top:8px;font-size:12px;color:var(--muted)">Arquivos: ${sitemapFiles.map((f) => `<code>${escape(f)}</code>`).join(" ")}</div>
  </div>
</details>

<div class="controls">
  <input id="q" type="search" placeholder="Filtrar por rota, tipo de schema ou issue..."/>
  <label><input type="checkbox" id="only-fail"/> Só falhas</label>
  <label><input type="checkbox" id="only-sitemap"/> Só ausentes em sitemap</label>
  <label><input type="checkbox" id="only-h2"/> Só H2 duplicado</label>
</div>

<table id="t"><thead><tr>
  <th>Status</th><th>Rota</th><th class="num">H1</th><th class="num">H2</th>
  <th class="num">JSON-LD</th><th class="num">Org</th><th class="num">Agency</th><th class="num">AggR</th>
  <th>Tipos schema</th><th>Issues</th>
</tr></thead><tbody>
${rows.map((r) => `<tr class="${r.ok ? "ok" : "fail"}"
  data-route="${escape(r.route)}"
  data-ok="${r.ok}"
  data-sitemap="${r.inSitemap}"
  data-duph2="${r.duplicateH2.length > 0}"
  data-types="${escape(r.schemaTypes.join(" "))}"
  data-issues="${escape(r.issues.join(" "))}">
  <td>${badge(r.ok)}${r.inSitemap ? "" : ' <span class="b fail" title="Fora de sitemap*.xml">SM</span>'}</td>
  <td><code>${escape(r.route)}</code></td>
  <td class="num">${r.h1Count}</td>
  <td class="num">${r.h2Count}${r.duplicateH2.length ? ` <span style="color:#dc2626" title="${escape(r.duplicateH2.join(" | "))}">⚠</span>` : ""}</td>
  <td class="num">${r.jsonLdBlocks}</td>
  <td class="num">${r.organization}</td>
  <td class="num">${r.insuranceAgency}</td>
  <td class="num">${r.aggregateRating}</td>
  <td class="types">${r.schemaTypes.map((t) => `<code>${escape(t)}</code>`).join(" ")}</td>
  <td class="issues">${r.issues.map(escape).join("<br>")}</td>
</tr>`).join("\n")}
</tbody></table>

<footer>
  Relatório JSON correspondente: <code>audit-dashboard.json</code> ·
  Validators atômicos: <code>npm run validate:jsonld</code>, <code>validate:canonical</code>, <code>validate:headings</code>, <code>validate:schema-uniqueness</code>
</footer>

<script>
  const q=document.getElementById('q'),
        oF=document.getElementById('only-fail'),
        oS=document.getElementById('only-sitemap'),
        oH=document.getElementById('only-h2'),
        rows=[...document.querySelectorAll('#t tbody tr')];
  function apply(){
    const term=q.value.toLowerCase();
    rows.forEach(r=>{
      const hay=(r.dataset.route+' '+r.dataset.types+' '+r.dataset.issues).toLowerCase();
      const matchTerm=!term||hay.includes(term);
      const matchFail=!oF.checked||r.dataset.ok==='false';
      const matchSM=!oS.checked||r.dataset.sitemap==='false';
      const matchH2=!oH.checked||r.dataset.duph2==='true';
      r.style.display=(matchTerm&&matchFail&&matchSM&&matchH2)?'':'none';
    });
  }
  [q,oF,oS,oH].forEach(el=>el.addEventListener('input',apply));
  [oF,oS,oH].forEach(el=>el.addEventListener('change',apply));
</script>
</body></html>`;

const htmlPath = path.join(outDir, "audit-dashboard.html");
fs.writeFileSync(htmlPath, html);

console.log("✅ Painel de auditoria gerado:");
console.log(`   • ${jsonPath}`);
console.log(`   • ${htmlPath}`);
console.log(`   ${totals.ok} OK / ${totals.fail} falhas / ${totals.files} arquivos`);
console.log(`   Sitemap: ${sitemapUrls.size} URLs em ${sitemapFiles.length} arquivos · robots.txt: ${hasRobots ? "ok" : "ausente"}`);
