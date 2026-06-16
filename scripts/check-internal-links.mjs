#!/usr/bin/env node
/**
 * Automated internal link checker.
 *
 * - Extrai todas as rotas registradas em src/App.tsx (`<Route path="..." />`).
 * - Varre todos os arquivos .ts/.tsx em src/ procurando links internos em:
 *     to="/..."        (React Router <Link>/<Navigate>)
 *     href="/..."      (anchors)
 *     link: "/..."     (datasets de links internos)
 *     navigate("/...") (programmatic navigation)
 * - Compara cada link com o conjunto de rotas (suportando params `:slug`,
 *   wildcard `*` e prefixos com sub-rotas).
 * - Reporta cada link que cairia no fallback `*` (NotFound) com a lista de
 *   arquivos:linha onde aparece.
 *
 * Saída: exit 0 quando tudo OK, exit 1 quando há links quebrados.
 * Uso:    node scripts/check-internal-links.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const SRC = join(ROOT, "src");
const APP_FILE = join(SRC, "App.tsx");

/** Rotas externas que devem ser ignoradas mesmo começando com "/". */
const IGNORE_EXACT = new Set([
  "/404", // tratado pelo catch-all * -> NotFound
]);

/** Prefixos ignorados (assets estáticos, downloads, sitemaps, etc). */
const IGNORE_PREFIX = [
  "/downloads/",
  "/assets/",
  "/lovable-uploads/",
  "/sitemap",
  "/robots.txt",
  "/favicon",
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|jsx?)$/.test(name)) out.push(full);
  }
  return out;
}

function extractRoutes(appSource) {
  const routes = new Set();
  const re = /<Route\s+[^>]*path=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(appSource)) !== null) routes.add(m[1]);
  return routes;
}

/** Converte um path de rota com `:param` / `*` numa RegExp. */
function routeToRegex(routePath) {
  if (routePath === "*") return /^.*$/;
  const pattern = routePath
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\/:[A-Za-z0-9_]+/g, "/[^/]+")
    .replace(/\/\*$/, "(?:/.*)?")
    .replace(/\*/g, ".*");
  return new RegExp(`^${pattern}/?$`);
}

function buildMatcher(routes) {
  const regexes = [...routes]
    .filter((r) => r !== "*")
    .map((r) => ({ raw: r, re: routeToRegex(r) }));
  return (link) => regexes.some(({ re }) => re.test(link));
}

function shouldIgnore(link) {
  if (IGNORE_EXACT.has(link)) return true;
  return IGNORE_PREFIX.some((p) => link.startsWith(p));
}

function normalize(link) {
  // remove query/hash
  const noHash = link.split("#")[0];
  const noQuery = noHash.split("?")[0];
  // remove trailing slash exceto raiz
  if (noQuery.length > 1 && noQuery.endsWith("/")) return noQuery.slice(0, -1);
  return noQuery;
}

function extractLinks(source) {
  const links = [];
  const patterns = [
    /\b(?:to|href)=["'`](\/[^"'`\s>]*)/g,
    /\blink:\s*["'`](\/[^"'`\s]*)/g,
    /\bhref:\s*["'`](\/[^"'`\s]*)/g,
    /\bnavigate\(\s*["'`](\/[^"'`\s]*)/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(source)) !== null) {
      // ignora interpolações tipo `${foo}`
      if (m[1].includes("${")) continue;
      const idx = m.index;
      const line = source.slice(0, idx).split("\n").length;
      links.push({ link: m[1], line });
    }
  }
  return links;
}

function main() {
  const appSrc = readFileSync(APP_FILE, "utf8");
  const routes = extractRoutes(appSrc);
  if (routes.size === 0) {
    console.error("Nenhuma rota encontrada em src/App.tsx — abortando.");
    process.exit(2);
  }
  const matches = buildMatcher(routes);

  const files = walk(SRC);
  /** @type {Map<string, Array<{file:string,line:number}>>} */
  const broken = new Map();

  for (const file of files) {
    if (file === APP_FILE) continue; // não validar paths literais do próprio router
    const src = readFileSync(file, "utf8");
    for (const { link, line } of extractLinks(src)) {
      const norm = normalize(link);
      if (!norm.startsWith("/")) continue;
      if (shouldIgnore(norm)) continue;
      if (matches(norm)) continue;
      if (!broken.has(norm)) broken.set(norm, []);
      broken.get(norm).push({ file: relative(ROOT, file), line });
    }
  }

  const total = broken.size;
  if (total === 0) {
    console.log(`✅ Nenhum link interno quebrado (${routes.size} rotas registradas).`);
    process.exit(0);
  }

  console.log(`❌ ${total} link(s) interno(s) quebrado(s):\n`);
  const sorted = [...broken.entries()].sort(([a], [b]) => a.localeCompare(b));
  for (const [link, hits] of sorted) {
    console.log(`  ${link}`);
    for (const { file, line } of hits.slice(0, 10)) {
      console.log(`      ↳ ${file}:${line}`);
    }
    if (hits.length > 10) console.log(`      ↳ ... +${hits.length - 10} ocorrência(s)`);
  }
  console.log(`\nTotal de rotas registradas: ${routes.size}`);
  process.exit(1);
}

main();