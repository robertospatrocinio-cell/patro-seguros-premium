#!/usr/bin/env node
/**
 * Post-build JSON-LD & breadcrumb validator.
 *
 * Walks dist/**\/*.html (populated by prerender + SSG passes), extracts every
 * <script type="application/ld+json"> block and validates:
 *  - JSON syntax
 *  - @context / @type presence
 *  - BreadcrumbList: itemListElement[].position (1..n contiguous), name, item
 *  - LocalBusiness / InsuranceAgency: name, address.streetAddress, telephone
 *  - FAQPage: mainEntity[].name + acceptedAnswer.text
 *  - Review / AggregateRating: ratingValue numeric
 *
 * Exits 1 on any failure so it aborts the build before deploy.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateHtml } from "./lib/jsonld-validator.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ not found — run build first.");
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

const files = walk(DIST);
let totalBlocks = 0;
const failures = [];

for (const file of files) {
  const rel = path.relative(DIST, file);
  const html = fs.readFileSync(file, "utf-8");
  const { blocks, errors } = validateHtml(html, rel);
  totalBlocks += blocks;
  failures.push(...errors);
}

console.log(`🔎 JSON-LD: ${totalBlocks} blocos em ${files.length} arquivos analisados.`);
if (failures.length) {
  console.error(`❌ ${failures.length} problema(s) de JSON-LD detectado(s):`);
  failures.slice(0, 50).forEach((f) => console.error("   • " + f));
  if (failures.length > 50) console.error(`   … (+${failures.length - 50} omitidos)`);
  process.exit(1);
}
console.log("✅ JSON-LD e breadcrumbs válidos em todas as páginas pré-renderizadas.");