#!/usr/bin/env node
/**
 * Post-build validator: garante que cada HTML pré-renderizado em dist/
 * contém exatamente 1 nó Organization e 1 nó InsuranceAgency
 * (sem duplicação nem conflito de @id), e que os @id permanecem estáveis.
 *
 * Aborta o build (exit 1) ao detectar:
 *   - >1 Organization na mesma página
 *   - >1 InsuranceAgency/LocalBusiness na mesma página
 *   - @id repetido entre nós distintos
 *   - aggregateRating presente em mais de um nó na mesma página
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ não encontrado — rode o build antes.");
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

const LD_RE = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

function typesOf(node) {
  const t = node?.["@type"];
  if (!t) return [];
  return Array.isArray(t) ? t : [t];
}

function collectNodes(json, out = []) {
  if (!json || typeof json !== "object") return out;
  if (Array.isArray(json)) {
    json.forEach((n) => collectNodes(n, out));
    return out;
  }
  if (Array.isArray(json["@graph"])) {
    json["@graph"].forEach((n) => collectNodes(n, out));
  }
  if (json["@type"]) out.push(json);
  return out;
}

const files = walk(DIST);
const failures = [];

for (const file of files) {
  const rel = path.relative(DIST, file);
  const html = fs.readFileSync(file, "utf-8");

  const nodes = [];
  let m;
  LD_RE.lastIndex = 0;
  while ((m = LD_RE.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1].trim());
      collectNodes(parsed, nodes);
    } catch {
      // jsonld-validator já reporta JSON inválido; aqui apenas ignoramos.
    }
  }

  let orgCount = 0;
  let agencyCount = 0;
  let aggRatingCount = 0;
  const idMap = new Map();

  for (const node of nodes) {
    const types = typesOf(node);
    const isAgency = types.includes("InsuranceAgency") || types.includes("LocalBusiness");
    // "Organization puro" = Organization que NÃO é também InsuranceAgency/LocalBusiness
    const isPureOrg = types.includes("Organization") && !isAgency;

    if (isPureOrg) orgCount += 1;
    if (isAgency) agencyCount += 1;
    if (node.aggregateRating) aggRatingCount += 1;

    const id = node["@id"];
    if (id) {
      const sig = `${types.sort().join(",")}|${node.name || ""}`;
      if (idMap.has(id) && idMap.get(id) !== sig) {
        failures.push(`${rel}: @id duplicado "${id}" referenciando nós diferentes (${idMap.get(id)} vs ${sig})`);
      } else {
        idMap.set(id, sig);
      }
    }
  }

  if (orgCount !== 1) {
    failures.push(`${rel}: esperado 1 Organization, encontrado ${orgCount}`);
  }
  if (agencyCount !== 1) {
    failures.push(`${rel}: esperado 1 InsuranceAgency/LocalBusiness, encontrado ${agencyCount}`);
  }
  if (aggRatingCount > 1) {
    failures.push(`${rel}: aggregateRating aparece em ${aggRatingCount} nós (deve aparecer no máximo em 1)`);
  }
}

console.log(`🔎 Schema uniqueness: ${files.length} arquivos analisados.`);
if (failures.length) {
  console.error(`❌ ${failures.length} problema(s) de unicidade de schema:`);
  failures.slice(0, 50).forEach((f) => console.error("   • " + f));
  if (failures.length > 50) console.error(`   … (+${failures.length - 50} omitidos)`);
  process.exit(1);
}
console.log("✅ Exatamente 1 Organization e 1 InsuranceAgency por rota, sem conflitos de @id.");