#!/usr/bin/env node
/**
 * Post-build validator: canonical self-reference + heading hierarchy.
 *
 * Walks dist/**\/*.html (prerendered routes), derives the route from the
 * file path and runs the canonical + heading validators. Exits 1 on any
 * failure so it aborts the build before deploy / blocks merges via CI.
 *
 * Override host via env: EXPECTED_HOST=www.patroseguros.com.br
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validatePage } from "./lib/canonical-heading-validator.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const EXPECTED_HOST = process.env.EXPECTED_HOST || "www.patroseguros.com.br";

// Páginas que legitimamente NÃO devem ser validadas
// (assets, fallback SPA, páginas de funil/admin).
const SKIP = new Set(["404.html"]);
const SKIP_PREFIXES = ["assets/", "admin/"];

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ não encontrado — execute o build antes.");
  process.exit(1);
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
  // index.html → "/"
  // foo/index.html → "/foo"
  // foo/bar.html → "/foo/bar"
  const noExt = rel.replace(/\.html$/, "");
  if (noExt === "index") return "/";
  if (noExt.endsWith("/index")) return "/" + noExt.slice(0, -"/index".length);
  return "/" + noExt;
}

const files = walk(DIST);
const failures = [];
let checked = 0;

for (const file of files) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  if (SKIP.has(rel) || SKIP_PREFIXES.some((p) => rel.startsWith(p))) continue;
  const route = fileToRoute(rel);
  const html = fs.readFileSync(file, "utf-8");
  const { canonical, headings } = validatePage(html, route, { expectedHost: EXPECTED_HOST });
  checked++;
  canonical.forEach((e) => failures.push(`${rel} [canonical] ${e}`));
  headings.forEach((e) => failures.push(`${rel} [headings] ${e}`));
}

console.log(`🔎 Canonical/headings: ${checked} páginas analisadas em dist/.`);
if (failures.length) {
  console.error(`❌ ${failures.length} problema(s) detectado(s):`);
  failures.slice(0, 80).forEach((f) => console.error("   • " + f));
  if (failures.length > 80) console.error(`   … (+${failures.length - 80} omitidos)`);
  process.exit(1);
}
console.log("✅ Canonical e hierarquia de headings válidos em todas as páginas.");