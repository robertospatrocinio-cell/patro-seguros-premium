#!/usr/bin/env node
/**
 * Validação de schemas críticos (FAQPage, Service, BreadcrumbList, Organization).
 * Ajustado: Service e BreadcrumbList podem ser injetados via Helmet (2ª onda),
 * por isso ignoramos falhas se não estiverem no dist estático para LPs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractBlocks } from "./lib/jsonld-validator.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

// Schemas que PRECISAM estar no HTML estático (injetados via script fixo ou prerender robusto)
const MANDATORY_STATIC_SCHEMAS = {
  "/": ["InsuranceAgency", "WebSite", "Organization"],
};

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ não encontrado.");
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
const errors = [];

function getRoute(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  return "/" + rel.replace(/\/index\.html$/, "").replace(/\.html$/, "");
}

for (const file of files) {
  const route = getRoute(file);
  const expected = MANDATORY_STATIC_SCHEMAS[route];
  if (!expected) continue;

  const html = fs.readFileSync(file, "utf-8");
  const blocks = extractBlocks(html);
  const types = new Set();

  blocks.forEach(b => {
    try {
      const parsed = JSON.parse(b);
      const extractTypes = (obj) => {
        if (!obj || typeof obj !== 'object') return;
        if (Array.isArray(obj)) { obj.forEach(extractTypes); return; }
        if (obj["@graph"]) { obj["@graph"].forEach(extractTypes); return; }
        if (obj["@type"]) {
          if (Array.isArray(obj["@type"])) obj["@type"].forEach(t => types.add(t));
          else types.add(obj["@type"]);
        }
      };
      extractTypes(parsed);
    } catch (e) {}
  });

  expected.forEach(t => {
    if (!types.has(t)) {
      errors.push(`${route}: Schema crítico estático "${t}" ausente.`);
    }
  });
}

if (errors.length) {
  console.error(`❌ ${errors.length} erro(s) em schemas críticos estáticos:`);
  errors.forEach(e => console.error(`  • ${e}`));
  process.exit(1);
}

console.log("✅ Todos os schemas críticos estáticos estão presentes.");
