#!/usr/bin/env node
/**
 * Validação automatizada de rich snippets (FAQ, HowTo, Breadcrumb).
 *
 * O que faz:
 *  1. Percorre dist/**\/*.html (após `npm run build`) — se não existir, roda
 *     `vite build` automaticamente para gerar snapshot estático da SPA.
 *  2. Extrai todos os blocos <script type="application/ld+json">.
 *  3. Valida sintaxe/estrutura via lib/jsonld-validator.mjs (BreadcrumbList,
 *     FAQPage, HowTo, LocalBusiness/Organization, Article).
 *  4. Confere expectativas por rota: cada rota do mapa EXPECTED_ROUTES precisa
 *     ter os tipos declarados (ex.: /contato → HowTo + FAQ + Breadcrumb).
 *  5. Emite relatório JSON em dist/rich-snippets-report.json e resumo textual.
 *
 * Uso:
 *   node scripts/validate-rich-snippets.mjs           # valida dist/
 *   node scripts/validate-rich-snippets.mjs --build   # força build antes
 *   node scripts/validate-rich-snippets.mjs --route=/contato  # 1 rota
 *
 * Exit code:
 *   0 → tudo OK
 *   1 → erro estrutural ou expectativa não atendida
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { extractBlocks, validateJsonLdBlock } from "./lib/jsonld-validator.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

// Rota → tipos de rich snippet esperados. Ajuste conforme novas páginas.
const EXPECTED_ROUTES = {
  "/": ["BreadcrumbList", "Organization", "WebSite", "SiteNavigationElement"],
  "/sobre": ["BreadcrumbList", "FAQPage", "Organization"],
  "/servicos": ["BreadcrumbList", "FAQPage"],
  "/contato": ["BreadcrumbList", "FAQPage", "HowTo"],
  "/faq": ["FAQPage"],
  "/verificar-susep": ["BreadcrumbList"],
  "/como-comparar-seguradoras-guarulhos": ["BreadcrumbList", "FAQPage", "HowTo"],
};

const args = process.argv.slice(2);
const wantBuild = args.includes("--build") || !fs.existsSync(DIST);
const routeArg = args.find((a) => a.startsWith("--route="))?.split("=")[1];

if (wantBuild) {
  console.log("🔨 Gerando build para inspeção (vite build)…");
  execSync("npm run build", { cwd: ROOT, stdio: "inherit" });
}

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ ausente mesmo após build. Abortando.");
  process.exit(1);
}

function routeFromFile(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"/index.html".length);
  if (rel.endsWith(".html")) return "/" + rel.slice(0, -".html".length);
  return "/" + rel;
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function collectTypes(parsed, acc = new Set()) {
  if (!parsed || typeof parsed !== "object") return acc;
  if (Array.isArray(parsed)) { parsed.forEach((n) => collectTypes(n, acc)); return acc; }
  if (Array.isArray(parsed["@graph"])) parsed["@graph"].forEach((n) => collectTypes(n, acc));
  const t = parsed["@type"];
  if (t) (Array.isArray(t) ? t : [t]).forEach((x) => acc.add(x));
  return acc;
}

const files = walk(DIST);
const report = { generatedAt: new Date().toISOString(), routes: {}, summary: {} };
const errors = [];
let totalBlocks = 0;

for (const file of files) {
  const route = routeFromFile(file);
  if (routeArg && route !== routeArg) continue;
  const html = fs.readFileSync(file, "utf-8");
  const rawBlocks = extractBlocks(html);
  totalBlocks += rawBlocks.length;
  const types = new Set();
  const blockErrors = [];
  const relFile = path.relative(ROOT, file);
  rawBlocks.forEach((raw, idx) => {
    const label = `[route=${route} file=${relFile} block#${idx}]`;
    const e = validateJsonLdBlock(raw, label, {
      strict: true,
      canonicalHost: "www.patroseguros.com.br",
    });
    blockErrors.push(...e);
    try { collectTypes(JSON.parse(raw), types); } catch { /* JSON error já reportado */ }
  });
  const expected = EXPECTED_ROUTES[route] ?? [];
  const missing = expected.filter((t) => !types.has(t));
  const routeErrors = [
    ...blockErrors,
    ...missing.map((t) => `${route}: rich snippet esperado ausente — ${t}`),
  ];
  report.routes[route] = {
    file: path.relative(ROOT, file),
    blocks: rawBlocks.length,
    types: [...types],
    expected,
    missing,
    errors: routeErrors,
  };
  errors.push(...routeErrors);
}

// Rotas esperadas que nem sequer geraram HTML no dist
for (const route of Object.keys(EXPECTED_ROUTES)) {
  if (routeArg && route !== routeArg) continue;
  if (!report.routes[route]) {
    const msg = `${route}: nenhum HTML pré-renderizado encontrado em dist/`;
    errors.push(msg);
    report.routes[route] = { file: null, blocks: 0, types: [], expected: EXPECTED_ROUTES[route], missing: EXPECTED_ROUTES[route], errors: [msg] };
  }
}

report.summary = {
  files: files.length,
  totalBlocks,
  routesChecked: Object.keys(report.routes).length,
  errors: errors.length,
};

const out = path.join(DIST, "rich-snippets-report.json");
fs.writeFileSync(out, JSON.stringify(report, null, 2));

console.log(`\n🔎 Rich snippets: ${totalBlocks} blocos JSON-LD em ${files.length} arquivo(s).`);
for (const [route, info] of Object.entries(report.routes)) {
  const status = info.errors.length ? "❌" : "✅";
  console.log(`  ${status} ${route}  types=[${info.types.join(", ") || "—"}]  expected=[${info.expected.join(", ") || "—"}]`);
}
console.log(`\n📝 Relatório: ${path.relative(ROOT, out)}`);

if (errors.length) {
  console.error(`\n❌ ${errors.length} problema(s):`);
  errors.slice(0, 50).forEach((e) => console.error("   • " + e));
  if (errors.length > 50) console.error(`   … (+${errors.length - 50} omitidos)`);
  process.exit(1);
}
console.log("\n✅ Todos os rich snippets esperados (FAQ, HowTo, Breadcrumb) estão presentes e válidos.");