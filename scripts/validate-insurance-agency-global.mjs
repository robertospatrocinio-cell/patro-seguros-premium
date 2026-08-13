#!/usr/bin/env node
/**
 * Validação de integridade do JSON-LD InsuranceAgency em TODAS as rotas.
 * Garante que a entidade institucional não desapareça em nenhuma página.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ ausente. Abortando.");
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

function routeFromFile(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"/index.html".length);
  if (rel.endsWith(".html")) return "/" + rel.slice(0, -".html".length);
  return "/" + rel;
}

function hasInsuranceAgency(file) {
  const html = fs.readFileSync(file, "utf-8");
  return html.includes('"@type": "InsuranceAgency"') || html.includes('"@type":"InsuranceAgency"');
}

const files = walk(DIST);
const errors = [];

console.log(`🔍 Validando InsuranceAgency em ${files.length} rotas...`);

for (const file of files) {
  const route = routeFromFile(file);
  // Algumas rotas técnicas podem não ter o schema por design, mas 99% devem ter via Layout/Template
  if (!hasInsuranceAgency(file)) {
    errors.push(`${route} (${path.relative(ROOT, file)})`);
  }
}

if (errors.length > 0) {
  console.error(`\n❌ Erro: ${errors.length} rotas estão sem o schema InsuranceAgency:`);
  errors.slice(0, 50).forEach(e => console.error(`   • ${e}`));
  if (errors.length > 50) console.error(`   ... e mais ${errors.length - 50} rotas.`);
  process.exit(1);
}

console.log("\n✅ Todas as rotas possuem o schema InsuranceAgency.");
