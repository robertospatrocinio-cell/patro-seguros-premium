#!/usr/bin/env node
/**
 * Validação de elegibilidade a Google Rich Results.
 *
 * Complementa `validate-rich-snippets.mjs` (que checa presença + estrutura básica)
 * aplicando as regras específicas documentadas pelo Google Search Central para
 * elegibilidade a rich results — required + recommended por tipo. Cada bloco
 * JSON-LD extraído de dist/ recebe um verdict por tipo:
 *
 *   - eligible     → todas as required OK, sem faltar recommended crítico
 *   - eligible-warn→ required OK, recommended ausentes (ainda é elegível,
 *                    mas o Google pode ranquear pior)
 *   - ineligible   → required ausente/inválido — não vai gerar rich result
 *   - unsupported  → @type não gera rich result no Google (só reportado)
 *
 * Referências (Google Search Central – Structured data feature guides):
 *   BreadcrumbList  https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 *   FAQ             https://developers.google.com/search/docs/appearance/structured-data/faqpage
 *   HowTo           https://developers.google.com/search/docs/appearance/structured-data/how-to
 *   Article         https://developers.google.com/search/docs/appearance/structured-data/article
 *   LocalBusiness   https://developers.google.com/search/docs/appearance/structured-data/local-business
 *   Organization    https://developers.google.com/search/docs/appearance/structured-data/organization
 *   Logo            https://developers.google.com/search/docs/appearance/structured-data/logo
 *   Sitelinks SB    https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
 *
 * Uso:
 *   node scripts/validate-google-rich-results.mjs                # valida dist/
 *   node scripts/validate-google-rich-results.mjs --route=/faq   # filtra 1 rota
 *   node scripts/validate-google-rich-results.mjs --allow-warn   # não falha em warn
 *
 * Exit code:
 *   0 → nenhum bloco `ineligible`
 *   1 → algum bloco marcado como `ineligible`
 *       (`eligible-warn` não falha por padrão — passa a falhar sem --allow-warn
 *        se algum tipo crítico exigir. Hoje só reportamos.)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractBlocks } from "./lib/jsonld-validator.mjs";
import { CHECKERS, flattenNodes, typeOf } from "./lib/rich-results-checkers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const args = process.argv.slice(2);
const routeArg = args.find((a) => a.startsWith("--route="))?.split("=")[1];
const ALLOW_WARN = args.includes("--allow-warn");
const STRICT_WARN = args.includes("--strict-warn");

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ ausente. Rode `npm run build` antes.");
  process.exit(1);
}
// Checkers, helpers e CHECKERS ficam em `./lib/rich-results-checkers.mjs`
// para permitir testes unitários (scripts/lib/rich-results-checkers.test.mjs).

// ---------- walker ------------------------------------------------------------

function routeFromFile(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"/index.html".length);
  if (rel.endsWith(".html")) return "/" + rel.slice(0, -".html".length);
  return "/" + rel;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && e.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const files = walk(DIST);
const report = { generatedAt: new Date().toISOString(), routes: {}, summary: {
  files: 0, blocks: 0, nodes: 0,
  eligible: 0, eligibleWarn: 0, ineligible: 0, unsupported: 0,
}, byType: {} };

let ineligibleTotal = 0;

function bumpType(type, verdict) {
  const t = report.byType[type] || (report.byType[type] = {
    total: 0, eligible: 0, eligibleWarn: 0, ineligible: 0, unsupported: 0,
  });
  t.total++;
  if (verdict === "eligible") t.eligible++;
  else if (verdict === "eligible-warn") t.eligibleWarn++;
  else if (verdict === "ineligible") t.ineligible++;
  else if (verdict === "unsupported") t.unsupported++;
}

for (const file of files) {
  const route = routeFromFile(file);
  if (routeArg && route !== routeArg) continue;
  const html = fs.readFileSync(file, "utf-8");
  const blocks = extractBlocks(html);
  if (blocks.length === 0) continue;
  report.summary.files++;
  report.summary.blocks += blocks.length;

  const routeEntry = { file: path.relative(ROOT, file), nodes: [] };

  for (let bi = 0; bi < blocks.length; bi++) {
    let parsed;
    try { parsed = JSON.parse(blocks[bi]); }
    catch (e) {
      routeEntry.nodes.push({
        block: bi, type: "(parse-error)", verdict: "ineligible",
        required: [`JSON inválido — ${e.message}`], recommended: [],
      });
      ineligibleTotal++;
      continue;
    }
    const nodes = flattenNodes(parsed);
    report.summary.nodes += nodes.length;
    for (const node of nodes) {
      const types = typeOf(node);
      // pega o primeiro tipo com checker registrado; se nenhum, marca unsupported
      const matched = types.find((t) => CHECKERS[t]);
      if (!matched) {
        report.summary.unsupported++;
        const label = types[0] || "(sem @type)";
        bumpType(label, "unsupported");
        routeEntry.nodes.push({
          block: bi, type: types.join("|") || "(sem @type)",
          verdict: "unsupported", required: [], recommended: [],
        });
        continue;
      }
      const result = CHECKERS[matched](node);
      let verdict;
      if (result.unsupported) { verdict = "unsupported"; report.summary.unsupported++; }
      else if (result.req.length) { verdict = "ineligible"; report.summary.ineligible++; ineligibleTotal++; }
      else if (result.rec.length) { verdict = "eligible-warn"; report.summary.eligibleWarn++; }
      else { verdict = "eligible"; report.summary.eligible++; }
      bumpType(matched, verdict);
      routeEntry.nodes.push({
        block: bi, type: matched, verdict,
        required: result.req, recommended: result.rec,
      });
    }
  }
  report.routes[route] = routeEntry;
}

// ---------- output ------------------------------------------------------------

const out = path.join(DIST, "google-rich-results-report.json");
fs.writeFileSync(out, JSON.stringify(report, null, 2));

const s = report.summary;
console.log("\n🔎 Google Rich Results — elegibilidade");
console.log(`   arquivos: ${s.files}   blocos: ${s.blocks}   nodes: ${s.nodes}`);
console.log(`   ✅ eligible: ${s.eligible}   ⚠️  eligible-warn: ${s.eligibleWarn}   ❌ ineligible: ${s.ineligible}   ➖ unsupported: ${s.unsupported}`);

// Breakdown por @type
const typeRows = Object.entries(report.byType).sort((a, b) => b[1].total - a[1].total);
if (typeRows.length) {
  console.log("\n   Por @type:");
  const pad = (s, n) => String(s).padEnd(n);
  console.log(`   ${pad("@type", 26)} ${pad("total", 6)} ${pad("elig", 5)} ${pad("warn", 5)} ${pad("inel", 5)} ${pad("unsup", 5)}`);
  for (const [t, v] of typeRows) {
    console.log(`   ${pad(t, 26)} ${pad(v.total, 6)} ${pad(v.eligible, 5)} ${pad(v.eligibleWarn, 5)} ${pad(v.ineligible, 5)} ${pad(v.unsupported, 5)}`);
  }
}

// Imprime só rotas com problema (verdict ineligible ou warn)
const problematic = Object.entries(report.routes).filter(([, r]) =>
  r.nodes.some((n) => n.verdict === "ineligible" || n.verdict === "eligible-warn")
);
for (const [route, r] of problematic.slice(0, 60)) {
  console.log(`\n • ${route}`);
  for (const n of r.nodes) {
    if (n.verdict === "eligible" || n.verdict === "unsupported") continue;
    const icon = n.verdict === "ineligible" ? "❌" : "⚠️ ";
    console.log(`   ${icon} ${n.type} (block#${n.block}) → ${n.verdict}`);
    n.required.forEach((m) => console.log(`      REQ  ${m}`));
    n.recommended.forEach((m) => console.log(`      REC  ${m}`));
  }
}
if (problematic.length > 60) console.log(`   … (+${problematic.length - 60} rotas omitidas)`);

console.log(`\n📝 Relatório: ${path.relative(ROOT, out)}`);

if (ineligibleTotal > 0) {
  console.error(`\n❌ ${ineligibleTotal} bloco(s) marcado(s) como INELIGIBLE — não vão gerar Google Rich Result.`);
  process.exit(1);
}
if (s.eligibleWarn > 0 && !ALLOW_WARN) {
  console.log(`\n⚠️  ${s.eligibleWarn} bloco(s) elegível(is) com recomendações pendentes (use --allow-warn para silenciar).`);
  if (STRICT_WARN) {
    console.error(`\n❌ --strict-warn ativo: falhando build por ${s.eligibleWarn} eligible-warn.`);
    process.exit(1);
  }
}
console.log("\n✅ Nenhum bloco INELIGIBLE. Rich results estão elegíveis.");