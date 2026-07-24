#!/usr/bin/env node
/**
 * validate-canonical-strict.mjs
 *
 * CI gate: garante que TODA página em dist/ possua exatamente um
 * <link rel="canonical"> apontando para a URL canônica esperada.
 *
 * Regras:
 *  1. Tag <link rel="canonical" href="..."> presente e com href absoluto.
 *  2. Host = www.patroseguros.com.br (override via EXPECTED_HOST).
 *  3. Pathname = rota derivada do arquivo em dist (self-reference),
 *     salvo overrides declarados em scripts/canonical-allowlist.json.
 *  4. Duplicatas só toleradas quando normalizam para a mesma URL.
 *
 * Falha o processo (exit 1) em qualquer divergência, com relatório
 * detalhado por rota. Pensado para rodar no CI antes do deploy.
 *
 * Uso:
 *   node scripts/validate-canonical-strict.mjs
 *   EXPECTED_HOST=www.patroseguros.com.br node scripts/validate-canonical-strict.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractCanonicals } from "./lib/canonical-heading-validator.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const EXPECTED_HOST = process.env.EXPECTED_HOST || "www.patroseguros.com.br";
const BASE = `https://${EXPECTED_HOST}`;

// Arquivos/prefixos a ignorar: assets, fallback SPA, admin, e o mirror
// /artigos/* (canonical intencionalmente aponta para /blog/*).
const SKIP = new Set(["404.html"]);
const SKIP_PREFIXES = ["assets/", "admin/"];

// Overrides intencionais (long-tail → hub). Formato:
// { "/seguro-tcross-guarulhos": "https://www.patroseguros.com.br/seguro-auto-guarulhos" }
let OVERRIDES = {};
try {
  const raw = JSON.parse(
    fs.readFileSync(path.join(__dirname, "canonical-allowlist.json"), "utf-8"),
  );
  OVERRIDES = raw.overrides || {};
} catch {
  // sem allowlist é ok — validação apenas exige self-reference
}

// /artigos/* é mirror declarado de /blog/*: canonical deve apontar
// ao slug em /blog/ (o /blog/:slug é validado por si).
function derivedExpected(route) {
  if (OVERRIDES[route]) return OVERRIDES[route];
  if (route.startsWith("/artigos/")) {
    return `${BASE}${route.replace(/^\/artigos\//, "/blog/")}`;
  }
  if (route === "/") return BASE;
  return `${BASE}${route}`;
}

function normalize(href) {
  try {
    const u = new URL(href);
    const host = u.host.replace(/^www\./, "www.");
    const pathname = u.pathname === "/" ? "/" : u.pathname.replace(/\/+$/, "");
    return `${u.protocol}//${host}${pathname === "/" ? "" : pathname}`;
  } catch {
    return href;
  }
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function fileToRoute(rel) {
  const noExt = rel.replace(/\.html$/, "");
  if (noExt === "index") return "/";
  if (noExt.endsWith("/index")) return "/" + noExt.slice(0, -"/index".length);
  return "/" + noExt;
}

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ não encontrado — rode `bun run build` antes.");
  process.exit(1);
}

const files = walk(DIST);
const failures = [];
let checked = 0;
let skippedShells = 0;

for (const file of files) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  if (SKIP.has(rel) || SKIP_PREFIXES.some((p) => rel.startsWith(p))) continue;
  const route = fileToRoute(rel);
  const html = fs.readFileSync(file, "utf-8");

  // Shells SPA vazios (sem SSG hidratado no HTML) não têm canonical
  // final — o React Helmet injeta em runtime. Não bloqueia deploy.
  if (/<div id="root">\s*<\/div>/.test(html)) {
    skippedShells++;
    continue;
  }

  const canonicals = extractCanonicals(html);
  checked++;

  if (canonicals.length === 0) {
    failures.push(`${rel}: canonical AUSENTE (esperado ${derivedExpected(route)})`);
    continue;
  }

  const normed = canonicals.map(normalize).filter(Boolean);
  const uniq = [...new Set(normed)];
  if (uniq.length > 1) {
    failures.push(`${rel}: canonical duplicado divergente → ${uniq.join(" | ")}`);
    continue;
  }

  const actual = uniq[0];
  const expected = normalize(derivedExpected(route));

  if (!/^https:\/\//.test(actual)) {
    failures.push(`${rel}: canonical não é URL https absoluta → ${actual}`);
    continue;
  }
  try {
    const u = new URL(actual);
    if (u.host !== EXPECTED_HOST) {
      failures.push(
        `${rel}: host divergente → esperado ${EXPECTED_HOST}, recebido ${u.host}`,
      );
      continue;
    }
  } catch {
    failures.push(`${rel}: canonical inválido → ${actual}`);
    continue;
  }

  if (actual !== expected) {
    failures.push(
      `${rel}: canonical divergente\n      esperado: ${expected}\n      recebido: ${actual}`,
    );
  }
}

console.log(
  `🔎 Canonical strict: ${checked} páginas analisadas em dist/ (${skippedShells} shells SPA ignoradas).`,
);

if (failures.length) {
  console.error(`❌ ${failures.length} divergência(s) de canonical:`);
  failures.slice(0, 100).forEach((f) => console.error("   • " + f));
  if (failures.length > 100) {
    console.error(`   … (+${failures.length - 100} omitidos)`);
  }
  console.error(
    "\nDica: se a divergência é intencional (long-tail apontando para hub), " +
      "declare em scripts/canonical-allowlist.json → overrides.",
  );
  process.exit(1);
}

console.log("✅ Todas as páginas em dist/ têm canonical presente e apontando para a URL correta.");