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

const SCRIPT_RE = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

function extractBlocks(html) {
  const blocks = [];
  let m;
  while ((m = SCRIPT_RE.exec(html)) !== null) blocks.push(m[1].trim());
  return blocks;
}

function validateBreadcrumb(node, errors, label) {
  const items = node.itemListElement;
  if (!Array.isArray(items) || items.length === 0) {
    errors.push(`${label} BreadcrumbList: itemListElement vazio ou ausente`);
    return;
  }
  items.forEach((it, i) => {
    if (it.position !== i + 1) errors.push(`${label} BreadcrumbList: position[${i}] esperado ${i + 1}, recebido ${it.position}`);
    if (!it.name) errors.push(`${label} BreadcrumbList: item[${i}] sem name`);
    if (!it.item && i < items.length - 1) errors.push(`${label} BreadcrumbList: item[${i}] sem URL`);
  });
}

function validateLocalBusiness(node, errors, label) {
  if (!node.name) errors.push(`${label} ${node["@type"]}: faltando name`);
  if (!node.address) errors.push(`${label} ${node["@type"]}: faltando address`);
  else if (!node.address.streetAddress) errors.push(`${label} ${node["@type"]}: address.streetAddress ausente`);
  if (!node.telephone) errors.push(`${label} ${node["@type"]}: faltando telephone`);
  if (node.aggregateRating) {
    const v = Number(node.aggregateRating.ratingValue);
    if (Number.isNaN(v) || v < 0 || v > 5) errors.push(`${label} aggregateRating.ratingValue inválido`);
  }
  if (Array.isArray(node.review)) {
    node.review.forEach((r, i) => {
      if (r.reviewRating && Number.isNaN(Number(r.reviewRating.ratingValue))) {
        errors.push(`${label} review[${i}].reviewRating.ratingValue não numérico`);
      }
      if (!r.author) errors.push(`${label} review[${i}] sem author`);
    });
  }
}

function validateFAQ(node, errors, label) {
  const items = node.mainEntity;
  if (!Array.isArray(items) || items.length === 0) {
    errors.push(`${label} FAQPage: mainEntity vazio`);
    return;
  }
  items.forEach((q, i) => {
    if (!q.name) errors.push(`${label} FAQPage: question[${i}] sem name`);
    if (!q.acceptedAnswer?.text) errors.push(`${label} FAQPage: question[${i}] sem acceptedAnswer.text`);
  });
}

function validateNode(node, errors, label) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) { node.forEach((n, i) => validateNode(n, errors, `${label}[${i}]`)); return; }
  if (!node["@context"]) errors.push(`${label}: faltando @context`);
  if (!node["@type"]) { errors.push(`${label}: faltando @type`); return; }
  const type = Array.isArray(node["@type"]) ? node["@type"][0] : node["@type"];
  if (type === "BreadcrumbList") validateBreadcrumb(node, errors, label);
  else if (type === "LocalBusiness" || type === "InsuranceAgency" || type === "Organization") validateLocalBusiness(node, errors, label);
  else if (type === "FAQPage") validateFAQ(node, errors, label);
}

const files = walk(DIST);
let totalBlocks = 0;
const failures = [];

for (const file of files) {
  const rel = path.relative(DIST, file);
  const html = fs.readFileSync(file, "utf-8");
  const blocks = extractBlocks(html);
  blocks.forEach((raw, idx) => {
    totalBlocks++;
    const label = `${rel}#${idx}`;
    let parsed;
    try { parsed = JSON.parse(raw); }
    catch (e) { failures.push(`${label}: JSON inválido — ${e.message}`); return; }
    const errors = [];
    validateNode(parsed, errors, label);
    failures.push(...errors);
  });
}

console.log(`🔎 JSON-LD: ${totalBlocks} blocos em ${files.length} arquivos analisados.`);
if (failures.length) {
  console.error(`❌ ${failures.length} problema(s) de JSON-LD detectado(s):`);
  failures.slice(0, 50).forEach((f) => console.error("   • " + f));
  if (failures.length > 50) console.error(`   … (+${failures.length - 50} omitidos)`);
  process.exit(1);
}
console.log("✅ JSON-LD e breadcrumbs válidos em todas as páginas pré-renderizadas.");