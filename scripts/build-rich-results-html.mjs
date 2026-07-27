#!/usr/bin/env node
/**
 * Gera um relatório HTML navegável (por rota) a partir do JSON produzido por
 * `scripts/validate-google-rich-results.mjs` (dist/google-rich-results-report.json).
 *
 * Saída:
 *   dist/rich-results-report.html    → dashboard visual, filtros por verdict
 *   dist/rich-results-by-route.json  → índice compacto por rota (uma linha/rota)
 *
 * Uso:
 *   node scripts/build-rich-results-html.mjs [--dist=dist]
 *
 * Idempotente: não modifica dist/google-rich-results-report.json.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const distArg = args.find((a) => a.startsWith("--dist="))?.split("=")[1];
const DIST = distArg ? path.resolve(distArg) : path.join(ROOT, "dist");

const REPORT_JSON = path.join(DIST, "google-rich-results-report.json");
if (!fs.existsSync(REPORT_JSON)) {
  console.error(`❌ Relatório não encontrado: ${path.relative(ROOT, REPORT_JSON)}`);
  console.error("   Rode antes: node scripts/validate-google-rich-results.mjs");
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(REPORT_JSON, "utf-8"));

function rollupRoute(nodes) {
  const counts = { eligible: 0, warn: 0, ineligible: 0, unsupported: 0 };
  for (const n of nodes) {
    if (n.verdict === "eligible") counts.eligible++;
    else if (n.verdict === "eligible-warn") counts.warn++;
    else if (n.verdict === "ineligible") counts.ineligible++;
    else counts.unsupported++;
  }
  const verdict = counts.ineligible ? "ineligible"
    : counts.warn ? "eligible-warn"
    : counts.eligible ? "eligible" : "unsupported-only";
  return { counts, verdict };
}

const rows = Object.entries(report.routes).map(([route, r]) => {
  const { counts, verdict } = rollupRoute(r.nodes);
  return { route, file: r.file, verdict, counts, nodes: r.nodes };
}).sort((a, b) => {
  const order = { ineligible: 0, "eligible-warn": 1, eligible: 2, "unsupported-only": 3 };
  return (order[a.verdict] - order[b.verdict]) || a.route.localeCompare(b.route);
});

// Índice compacto (uma linha por rota) — útil para diffs em CI
const compact = rows.map(({ route, file, verdict, counts }) => ({ route, file, verdict, ...counts }));
fs.writeFileSync(path.join(DIST, "rich-results-by-route.json"), JSON.stringify(compact, null, 2));

const totals = rows.reduce((acc, r) => {
  acc[r.verdict] = (acc[r.verdict] || 0) + 1;
  return acc;
}, {});

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

const badge = (v) => `<span class="b b-${v}">${v}</span>`;

const rowHtml = rows.map((r, i) => {
  const problems = r.nodes.filter((n) => n.verdict === "ineligible" || n.verdict === "eligible-warn");
  const details = problems.length ? `<details><summary>${problems.length} nó(s) com pendência</summary><ul>${problems.map((n) => `
      <li>${badge(n.verdict)} <code>${esc(n.type)}</code> (block #${n.block})
        ${n.required.length ? `<div class="req"><b>REQ:</b> ${n.required.map(esc).join("; ")}</div>` : ""}
        ${n.recommended.length ? `<div class="rec"><b>REC:</b> ${n.recommended.map(esc).join("; ")}</div>` : ""}
      </li>`).join("")}</ul></details>` : "<span class=muted>—</span>";
  return `<tr data-verdict="${r.verdict}">
    <td>${i + 1}</td>
    <td><a href="${esc(r.route)}" target="_blank" rel="noreferrer"><code>${esc(r.route)}</code></a></td>
    <td>${badge(r.verdict)}</td>
    <td class="n">${r.counts.eligible}</td>
    <td class="n warn">${r.counts.warn}</td>
    <td class="n inel">${r.counts.ineligible}</td>
    <td class="n muted">${r.counts.unsupported}</td>
    <td>${details}</td>
  </tr>`;
}).join("\n");

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<title>Rich Results — relatório por rota</title>
<meta name="robots" content="noindex,nofollow">
<style>
  :root { color-scheme: light dark; }
  body { font: 14px/1.45 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 24px; }
  h1 { margin: 0 0 4px; }
  .meta { color: #6b7280; margin-bottom: 16px; }
  .cards { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
  .card { padding: 12px 16px; border-radius: 8px; border: 1px solid #d1d5db; min-width: 140px; }
  .card b { font-size: 20px; display: block; }
  .filters { margin: 8px 0 12px; display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .filters input { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; min-width: 260px; }
  .filters button { padding: 6px 10px; border: 1px solid #d1d5db; background: #f9fafb; border-radius: 6px; cursor: pointer; }
  .filters button.active { background: #111827; color: #fff; border-color: #111827; }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 6px 8px; border-bottom: 1px solid #e5e7eb; text-align: left; vertical-align: top; }
  th { position: sticky; top: 0; background: #f9fafb; z-index: 1; }
  td.n { text-align: right; font-variant-numeric: tabular-nums; width: 60px; }
  td.n.warn { color: #b45309; }
  td.n.inel { color: #b91c1c; font-weight: 600; }
  td.n.muted, .muted { color: #9ca3af; }
  code { font: 12px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  .b { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; }
  .b-eligible { background: #dcfce7; color: #166534; }
  .b-eligible-warn { background: #fef3c7; color: #92400e; }
  .b-ineligible { background: #fee2e2; color: #991b1b; }
  .b-unsupported-only { background: #e5e7eb; color: #374151; }
  details { margin: 0; }
  summary { cursor: pointer; color: #2563eb; }
  .req { color: #991b1b; margin-left: 8px; }
  .rec { color: #92400e; margin-left: 8px; }
  ul { margin: 6px 0 6px 20px; padding: 0; }
</style>
</head><body>
<h1>Google Rich Results — relatório por rota</h1>
<div class="meta">Gerado em ${esc(report.generatedAt)} · ${rows.length} rotas · ${report.summary.blocks} blocos · ${report.summary.nodes} nodes</div>
<div class="cards">
  <div class="card">Total rotas <b>${rows.length}</b></div>
  <div class="card">✅ eligible <b>${totals.eligible || 0}</b></div>
  <div class="card">⚠️ eligible-warn <b style="color:#b45309">${totals["eligible-warn"] || 0}</b></div>
  <div class="card">❌ ineligible <b style="color:#b91c1c">${totals.ineligible || 0}</b></div>
  <div class="card">➖ só unsupported <b style="color:#6b7280">${totals["unsupported-only"] || 0}</b></div>
</div>
<div class="filters">
  <input id="q" type="search" placeholder="Filtrar por rota ou @type…">
  <button data-f="all" class="active">Todas</button>
  <button data-f="ineligible">❌ ineligible</button>
  <button data-f="eligible-warn">⚠️ warn</button>
  <button data-f="eligible">✅ eligible</button>
</div>
<table>
  <thead><tr><th>#</th><th>rota</th><th>verdict</th><th>elig</th><th>warn</th><th>inel</th><th>unsup</th><th>pendências</th></tr></thead>
  <tbody id="tb">${rowHtml}</tbody>
</table>
<script>
  const tb = document.getElementById("tb");
  const q = document.getElementById("q");
  let filter = "all";
  function apply() {
    const term = q.value.trim().toLowerCase();
    for (const tr of tb.rows) {
      const okF = filter === "all" || tr.dataset.verdict === filter;
      const okQ = !term || tr.textContent.toLowerCase().includes(term);
      tr.style.display = okF && okQ ? "" : "none";
    }
  }
  q.addEventListener("input", apply);
  for (const b of document.querySelectorAll(".filters button")) {
    b.addEventListener("click", () => {
      document.querySelectorAll(".filters button").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      filter = b.dataset.f;
      apply();
    });
  }
</script>
</body></html>`;

const outHtml = path.join(DIST, "rich-results-report.html");
fs.writeFileSync(outHtml, html);

console.log("\n📄 Relatório HTML por rota gerado:");
console.log(`   • ${path.relative(ROOT, outHtml)}`);
console.log(`   • ${path.relative(ROOT, path.join(DIST, "rich-results-by-route.json"))}`);
console.log(`   Rotas: ${rows.length}  ·  ✅ ${totals.eligible || 0}  ⚠️ ${totals["eligible-warn"] || 0}  ❌ ${totals.ineligible || 0}`);