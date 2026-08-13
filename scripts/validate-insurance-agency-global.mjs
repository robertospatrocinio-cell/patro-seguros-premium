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

function validateInsuranceAgency(file) {
  const html = fs.readFileSync(file, "utf-8");
  const hasType = html.includes('"@type": "InsuranceAgency"') || html.includes('"@type":"InsuranceAgency"');
  
  if (!hasType) return { valid: false, reason: "Schema InsuranceAgency ausente ou @type incorreto" };

  // Validação básica de sintaxe JSON-LD para evitar quebras silenciosas
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let found = false;
  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const json = JSON.parse(match[1]);
      const search = (obj) => {
        if (!obj || typeof obj !== "object") return false;
        if (Array.isArray(obj)) return obj.some(search);
        if (obj["@type"] === "InsuranceAgency") return true;
        if (obj["@graph"]) return search(obj["@graph"]);
        return false;
      };
      if (search(json)) {
        found = true;
        break;
      }
    } catch (e) {
      return { valid: false, reason: `Erro de sintaxe JSON no script LD+JSON: ${e.message}` };
    }
  }

  return found ? { valid: true } : { valid: false, reason: "InsuranceAgency não encontrado no grafo JSON-LD" };
}

const files = walk(DIST);
const errors = [];

console.log(`🔍 Validando integridade do InsuranceAgency em ${files.length} rotas...`);

for (const file of files) {
  const route = routeFromFile(file);
  const result = validateInsuranceAgency(file);
  if (!result.valid) {
    errors.push({
      route,
      path: path.relative(ROOT, file),
      reason: result.reason
    });
  }
}

if (errors.length > 0) {
  console.error(`\n❌ ERRO CRÍTICO: ${errors.length} rotas falharam na validação institucional:`);
  errors.slice(0, 50).forEach(e => {
    console.error(`   • Rota: ${e.route}`);
    console.error(`     Arquivo: ${e.path}`);
    console.error(`     Motivo: ${e.reason}`);
    console.error(`     ---`);
  });
  if (errors.length > 50) console.error(`   ... e mais ${errors.length - 50} falhas omitidas.`);
  process.exit(1);
}

console.log("\n✅ Todas as rotas possuem o schema InsuranceAgency.");
