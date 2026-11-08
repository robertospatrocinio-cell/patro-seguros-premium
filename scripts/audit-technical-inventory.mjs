#!/usr/bin/env node
/** Offline inventory. Never contacts Google, modifies public/ or deploys files. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { extractRouteDeclarations, duplicateRoutes, classifyPage, collectTemplateImports } from "./lib/technical-inventory.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] ?? fallback : fallback;
const publicDir = path.resolve(ROOT, option("--dir", "public"));
const outputDir = path.resolve(ROOT, option("--out", "audit-output/parte-1"));
const ORIGIN = "https://www.patroseguros.com.br";
const parser = new XMLParser();
const array = (value) => value == null ? [] : Array.isArray(value) ? value : [value];
const read = (file) => fs.readFileSync(file, "utf8");
const routes = extractRouteDeclarations(read(path.join(ROOT, "src/App.tsx")));
const findings = [];
const urls = new Map();
const visited = new Set();
const xmlFiles = [];
function inspectSitemap(name) {
  if (visited.has(name)) return;
  visited.add(name);
  const file = path.join(publicDir, name);
  if (!fs.existsSync(file)) {
    findings.push({ code: "SITEMAP_MISSING", file: name });
    return;
  }
  const xml = read(file);
  const valid = XMLValidator.validate(xml);
  if (valid !== true) {
    findings.push({ code: "SITEMAP_INVALID_XML", file: name, detail: valid });
    return;
  }
  const parsed = parser.parse(xml);
  xmlFiles.push(name);
  if (parsed.sitemapindex) {
    for (const entry of array(parsed.sitemapindex.sitemap)) {
      try {
        const url = new URL(entry.loc);
        if (url.origin !== ORIGIN || url.search || url.hash || !/^\/sitemap[^/]*\.xml$/.test(url.pathname)) {
          findings.push({ code: "INVALID_SITEMAP_REFERENCE", file: name, loc: entry.loc });
          continue;
        }
        inspectSitemap(url.pathname.slice(1));
      } catch {
        findings.push({ code: "INVALID_SITEMAP_REFERENCE", file: name, loc: entry.loc });
      }
    }
    return;
  }
  if (!parsed.urlset) {
    findings.push({ code: "SITEMAP_ROOT_UNKNOWN", file: name });
    return;
  }
  for (const entry of array(parsed.urlset.url)) {
    const loc = String(entry.loc ?? "");
    try {
      const url = new URL(loc);
      const canonical = url.pathname === "/" ? ORIGIN : ORIGIN + url.pathname.replace(/\/+$/, "").toLowerCase();
      if (loc !== canonical || url.search || url.hash) findings.push({ code: "NONCANONICAL_SITEMAP_URL", file: name, loc });
      if (/^\/(?:admin(?:\/|$)|crm(?:\/|$)|contato$|cotacao$|artigos(?:\/|$))/.test(url.pathname)) {
        findings.push({ code: "EXCLUDED_PATH_IN_SITEMAP", file: name, loc });
      }
      const item = urls.get(loc) ?? { url: loc, category: classifyPage(url.pathname), sitemaps: [], lastmod: [] };
      item.sitemaps.push(name);
      if (entry.lastmod) item.lastmod.push({ file: name, value: String(entry.lastmod), editorialVerification: "pending" });
      urls.set(loc, item);
    } catch {
      findings.push({ code: "INVALID_SITEMAP_URL", file: name, loc });
    }
  }
}
inspectSitemap("sitemap-index.xml");

function sourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(file);
    return /\.(?:ts|tsx)$/.test(entry.name) && !/\.(?:test|spec)\./.test(entry.name) ? [file] : [];
  });
}
const templateUsage = sourceFiles(path.join(ROOT, "src"))
  .flatMap((file) => collectTemplateImports(read(file), path.relative(ROOT, file)));
const duplicates = duplicateRoutes(routes);
for (const item of duplicates) findings.push({ code: "DUPLICATE_ROUTE_DECLARATION", ...item });
for (const item of urls.values()) {
  const owners = item.sitemaps.filter((name) => name !== "sitemap-images.xml");
  if (owners.length > 1) findings.push({ code: "DUPLICATE_SITEMAP_URL", url: item.url, files: owners });
}

// Inspect existing build artifacts only; never generate or rewrite the build.
const initialHtml = [];
if (args.includes("--html")) {
  for (const item of urls.values()) {
    const url = new URL(item.url);
    if (url.origin !== ORIGIN) continue;
    const file = path.resolve(publicDir, `.${url.pathname}`, "index.html");
    if (!file.startsWith(publicDir + path.sep)) continue;
    if (!fs.existsSync(file)) {
      findings.push({ code: "INITIAL_HTML_MISSING", url: item.url });
      continue;
    }
    const html = read(file);
    const tags = [...html.matchAll(/<(meta|link)\b[^>]*>/gi)].map((match) => {
      const attributes = Object.fromEntries([...match[0].matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)]
        .map((attr) => [attr[1].toLowerCase(), attr[2]]));
      return { tag: match[1].toLowerCase(), ...attributes };
    });
    const meta = (key) => tags.find((tag) => tag.name === key || tag.property === key)?.content ?? null;
    const canonical = tags.filter((tag) => tag.tag === "link" && tag.rel === "canonical").map((tag) => tag.href);
    const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null;
    const h1Count = [...html.matchAll(/<h1\b/gi)].length;
    const entry = { url: item.url, title, description: meta("description"), robots: meta("robots"), canonical, h1Count,
      ogTitle: meta("og:title"), ogImage: meta("og:image"), ogUrl: meta("og:url") };
    initialHtml.push(entry);
    if (!title || !entry.description) findings.push({ code: "INITIAL_METADATA_MISSING", url: item.url });
    if (canonical.length !== 1 || canonical[0] !== item.url) findings.push({ code: "INITIAL_CANONICAL_MISMATCH", url: item.url, canonical });
    if (/noindex/i.test(entry.robots ?? "")) findings.push({ code: "NOINDEX_IN_SITEMAP", url: item.url });
    if (h1Count !== 1) findings.push({ code: "INITIAL_H1_COUNT", url: item.url, count: h1Count });
  }
  for (const field of ["title", "description"]) {
    const groups = new Map();
    for (const item of initialHtml) {
      if (item[field]) groups.set(item[field], [...(groups.get(item[field]) ?? []), item.url]);
    }
    for (const [value, pages] of groups) {
      if (pages.length > 1) findings.push({ code: `DUPLICATE_${field.toUpperCase()}`, value, pages });
    }
  }
}

const report = {
  scope: "offline-static-evidence",
  sourceDirectory: path.relative(ROOT, publicDir),
  limitations: ["Dynamic route expressions are not expanded or executed", "A sitemap is a declared list, not proof of HTTP status or indexability",
    "No HTTP requests, GSC access, browser tests or performance measurements", "Orphan pages require a rendered link crawl",
    "HTML checks are preliminary static checks, not a full HTML/accessibility validator"],
  sitemapFiles: xmlFiles,
  sitemapUrls: [...urls.values()].sort((a, b) => a.url.localeCompare(b.url)),
  routes, duplicateRoutes: duplicates, templateUsage, initialHtml, findings,
};
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "inventory.json"), JSON.stringify(report, null, 2) + "\n");
const summary = ["# Inventário técnico offline", "", `Fonte: ${report.sourceDirectory}`,
  `URLs declaradas nos sitemaps alcançáveis: ${urls.size}. Declarações de rota: ${routes.length}.`,
  `Expressões dinâmicas pendentes: ${routes.filter((route) => !route.path).length}. Achados estáticos: ${findings.length}.`,
  "", "## Limites", ...report.limitations.map((item) => `- ${item}`), "",
  "## Rotas duplicadas", ...duplicates.map((item) => `- ${item.path}: linhas ${item.declarations.map((route) => route.line).join(", ")}`),
  "", "Os detalhes por URL, template e evidência estão em inventory.json. Nenhuma URL foi testada por HTTP.", ""];
fs.writeFileSync(path.join(outputDir, "summary.md"), summary.join("\n"));
console.log(`Inventário salvo em ${path.relative(ROOT, outputDir)} (${findings.length} achados para revisão).`);
if (args.includes("--strict") && findings.length) process.exitCode = 1;
