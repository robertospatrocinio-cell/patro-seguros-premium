/**
 * Extrai, de forma estática (sem browser), as FAQs já publicadas nas páginas
 * React e devolve um mapa `rota -> [{ q, a }]`.
 *
 * Usado por `scripts/prerender.mjs` para emitir o schema FAQPage no HTML
 * estático das páginas de produto — usando EXATAMENTE as perguntas e respostas
 * que a página renderiza (nada é inventado aqui).
 *
 * Estratégia:
 *   1. Lê `src/App.tsx` e mapeia `<Route path="/x" element={<Componente ...`
 *      (ignora redirects `<Navigate .../>`).
 *   2. Resolve o arquivo do componente pelos imports (lazy ou estáticos).
 *   3. Varre o arquivo por literais `{ question: "...", answer: "..." }`
 *      (também aceita `q`/`a`). Só aceita strings literais simples — nada com
 *      interpolação `${}` (que não pode ser resolvida sem executar o React).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function readIfExists(p) {
  try {
    return fs.readFileSync(p, "utf-8");
  } catch {
    return null;
  }
}

function resolveImportPath(spec) {
  let rel = spec;
  if (rel.startsWith("@/")) rel = rel.replace("@/", "src/");
  else if (rel.startsWith("./")) rel = rel.replace("./", "src/");
  else return null;
  for (const ext of [".tsx", ".ts"]) {
    const full = path.join(ROOT, rel + ext);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

function buildComponentFileMap(appSrc) {
  const map = new Map();
  const re = /(?:const|let)\s+(\w+)\s*=\s*(?:lazyWithRetry|lazy)\(\s*\(\)\s*=>\s*import\(\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(appSrc)) !== null) {
    const file = resolveImportPath(m[2]);
    if (file) map.set(m[1], file);
  }
  const staticRe = /import\s+(\w+)\s+from\s+["']([^"']+)["']/g;
  while ((m = staticRe.exec(appSrc)) !== null) {
    if (map.has(m[1])) continue;
    const file = resolveImportPath(m[2]);
    if (file) map.set(m[1], file);
  }
  return map;
}

function unescapeLiteral(raw) {
  return raw
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\n/g, " ")
    .replace(/\\\\/g, "\\")
    .replace(/\s+/g, " ")
    .trim();
}

const STRING = `"((?:[^"\\\\]|\\\\.)*)"`;

function extractFaqsFromSource(src) {
  const out = [];
  const seen = new Set();
  const patterns = [
    new RegExp(`question:\\s*${STRING}\\s*,\\s*answer:\\s*${STRING}`, "g"),
    new RegExp(`q:\\s*${STRING}\\s*,\\s*a:\\s*${STRING}`, "g"),
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(src)) !== null) {
      const q = unescapeLiteral(m[1]);
      const a = unescapeLiteral(m[2]);
      if (!q || !a || a.length < 20) continue;
      const key = q.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ q, a });
    }
  }
  return out;
}

/** @returns {Record<string, {q:string,a:string}[]>} */
export function extractPageFaqs() {
  const appSrc = readIfExists(path.join(ROOT, "src", "App.tsx"));
  if (!appSrc) return {};
  const componentFiles = buildComponentFileMap(appSrc);
  const cache = new Map();
  const result = {};

  const routeRe = /<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g;
  let m;
  while ((m = routeRe.exec(appSrc)) !== null) {
    const [, route, component] = m;
    if (route.includes(":") || route === "*" || component === "Navigate") continue;
    const file = componentFiles.get(component);
    if (!file) continue;
    if (!cache.has(file)) {
      const src = readIfExists(file);
      cache.set(file, src ? extractFaqsFromSource(src) : []);
    }
    const faqs = cache.get(file);
    if (faqs.length >= 2) result[route] = faqs;
  }
  return result;
}

export default extractPageFaqs;

if (process.argv[1] && process.argv[1].endsWith("extract-page-faqs.mjs")) {
  const map = extractPageFaqs();
  const routes = Object.keys(map);
  console.log(`Rotas com FAQ extraída: ${routes.length}`);
  console.log(routes.slice(0, 15).map((r) => `  ${r} (${map[r].length})`).join("\n"));
}
