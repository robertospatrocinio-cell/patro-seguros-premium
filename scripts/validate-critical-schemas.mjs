#!/usr/bin/env node
/**
 * Validação CI de schemas JSON-LD CRÍTICOS: FAQPage, Service, BreadcrumbList,
 * Organization. Falha o build (exit 1) em qualquer erro estrutural ou aviso
 * crítico (strict + canonicalHost) para esses tipos.
 *
 * Diferente de `validate-rich-snippets.mjs` (checa presença por rota), este
 * script foca em CORRETUDE dos 4 tipos onde quer que apareçam no dist/.
 *
 * Uso:
 *   node scripts/validate-critical-schemas.mjs        # roda em dist/
 *   node scripts/validate-critical-schemas.mjs --build
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { validateNode } from "./lib/jsonld-validator.mjs";
import {
  extractBlocksWithLocation,
  buildAnnotationFromError,
  emitAnnotation,
  isGithubActions,
} from "./lib/github-annotations.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const CRITICAL = new Set(["FAQPage", "Service", "BreadcrumbList", "Organization"]);
const CANONICAL_HOST = "www.patroseguros.com.br";

const args = process.argv.slice(2);
if (args.includes("--build") || !fs.existsSync(DIST)) {
  console.log("🔨 Gerando build antes de validar schemas críticos…");
  execSync("npm run build", { cwd: ROOT, stdio: "inherit" });
}
if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ ausente. Abortando.");
  process.exit(1);
}
const ANNOTATE = isGithubActions() || args.includes("--annotate");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function routeFromFile(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"/index.html".length);
  if (rel.endsWith(".html")) return "/" + rel.slice(0, -".html".length);
  return "/" + rel;
}

/**
 * Extrai nós {node, path} do JSON parseado, seguindo @graph e arrays.
 * Retorna somente nós cujo @type primário esteja em CRITICAL.
 */
function collectCriticalNodes(parsed, base = "") {
  const out = [];
  const visit = (n, p) => {
    if (!n || typeof n !== "object") return;
    if (Array.isArray(n)) { n.forEach((x, i) => visit(x, `${p}[${i}]`)); return; }
    if (Array.isArray(n["@graph"])) n["@graph"].forEach((x, i) => visit(x, `${p}@graph[${i}]`));
    const t = n["@type"];
    const primary = Array.isArray(t) ? t[0] : t;
    if (primary && CRITICAL.has(primary)) {
      // garante @context ao validar isoladamente
      out.push({ node: n["@context"] ? n : { "@context": "https://schema.org", ...n }, path: p || "(root)" });
    }
  };
  visit(parsed, base);
  return out;
}

const files = walk(DIST);
const perType = { FAQPage: 0, Service: 0, BreadcrumbList: 0, Organization: 0 };
const errors = [];
let totalCriticalNodes = 0;

for (const file of files) {
  const route = routeFromFile(file);
  const html = fs.readFileSync(file, "utf-8");
  const blocks = extractBlocksWithLocation(html);
  const relFile = path.relative(ROOT, file);
  blocks.forEach((block, idx) => {
    let parsed;
    try { parsed = JSON.parse(block.raw); } catch (e) {
      const msg = `[route=${route} file=${relFile} block#${idx}] JSON inválido — ${e.message}`;
      errors.push(msg);
      if (ANNOTATE) emitAnnotation({
        level: "error", file: relFile, line: block.line ?? 1,
        title: "JSON-LD inválido", message: msg,
      });
      return;
    }
    const critical = collectCriticalNodes(parsed);
    critical.forEach(({ node, path: p }) => {
      const type = Array.isArray(node["@type"]) ? node["@type"][0] : node["@type"];
      perType[type] = (perType[type] ?? 0) + 1;
      totalCriticalNodes++;
      const label = `[route=${route} file=${relFile} block#${idx} ${type} at ${p}]`;
      const nodeErrors = [];
      validateNode(node, nodeErrors, label, { strict: true, canonicalHost: CANONICAL_HOST });
      for (const err of nodeErrors) {
        errors.push(err);
        if (ANNOTATE) {
          const ann = buildAnnotationFromError({ file: relFile, block, errorMsg: err });
          emitAnnotation({ level: "error", ...ann });
        }
      }
    });
  });
}

const summary = {
  files: files.length,
  totalCriticalNodes,
  perType,
  errors: errors.length,
};
const reportPath = path.join(DIST, "critical-schemas-report.json");
fs.writeFileSync(reportPath, JSON.stringify({ generatedAt: new Date().toISOString(), summary, errors }, null, 2));

console.log("\n🛡️  Schemas críticos validados (FAQPage, Service, BreadcrumbList, Organization):");
for (const [t, n] of Object.entries(perType)) console.log(`   • ${t}: ${n} nó(s)`);
console.log(`   Total: ${totalCriticalNodes} nós críticos em ${files.length} HTMLs`);
console.log(`📝 Relatório: ${path.relative(ROOT, reportPath)}`);

if (errors.length) {
  console.error(`\n❌ ${errors.length} erro(s) crítico(s):`);
  errors.slice(0, 60).forEach((e) => console.error("   • " + e));
  if (errors.length > 60) console.error(`   … (+${errors.length - 60} omitidos)`);
  process.exit(1);
}
console.log("\n✅ Todos os schemas críticos passaram na validação strict.");