#!/usr/bin/env node
/**
 * scripts/validate-opening-hours.mjs
 * 
 * CI gate: garante que os horários de funcionamento (openingHoursSpecification)
 * em JSON-LD estejam sincronizados com a fonte única da verdade (EMPRESA.horario)
 * e sigam o formato padrão schema.org.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

// Fonte única da verdade: EMPRESA.horario = "Seg. a Sex. 8h30–18h"
const EXPECTED_OPENS = "08:30";
const EXPECTED_CLOSES = "18:00";

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith(".html")) acc.push(full);
  }
  return acc;
}

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      blocks.push(JSON.parse(m[1].trim()));
    } catch {}
  }
  return blocks;
}

function validateOpeningHours(nodes, route) {
  const errors = [];
  let foundAgency = false;

  const check = (node) => {
    if (!node || typeof node !== "object") return;
    
    // Procura por InsuranceAgency ou LocalBusiness que tenha openingHoursSpecification
    const type = node["@type"];
    const isLocalBusiness = type === "InsuranceAgency" || type === "LocalBusiness" || (Array.isArray(type) && (type.includes("InsuranceAgency") || type.includes("LocalBusiness")));
    
    if (isLocalBusiness && node.openingHoursSpecification) {
      foundAgency = true;
      const specs = Array.isArray(node.openingHoursSpecification) ? node.openingHoursSpecification : [node.openingHoursSpecification];
      
      // Valida Seg-Sex 08:30-18:00 (fonte única: EMPRESA.horario)
      const hasWeekdayHours = specs.some(s =>
        (Array.isArray(s.dayOfWeek) ? s.dayOfWeek.includes("Monday") : s.dayOfWeek === "Monday") &&
        s.opens === EXPECTED_OPENS && s.closes === EXPECTED_CLOSES
      );

      if (!hasWeekdayHours) {
        errors.push(`Horário padrão (${EXPECTED_OPENS}-${EXPECTED_CLOSES}) ausente ou incorreto.`);
      }
    }

    if (node["@graph"]) visit(node["@graph"]);
    Object.values(node).forEach(v => {
      if (v && typeof v === "object") check(v);
    });
  };

  const visit = (arr) => arr.forEach(check);
  nodes.forEach(check);

  return { foundAgency, errors };
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.log("ℹ️  dist/ ausente — pulando validação de horários.");
    return;
  }

  const files = walk(DIST);
  const totalErrors = [];
  let checkedCount = 0;

  for (const file of files) {
    const html = fs.readFileSync(file, "utf-8");
    const blocks = extractJsonLd(html);
    const route = path.relative(DIST, file);
    
    const { foundAgency, errors } = validateOpeningHours(blocks, route);
    
    if (foundAgency) {
      checkedCount++;
      if (errors.length) {
        totalErrors.push(`[${route}] ${errors.join(" ")}`);
      }
    }
  }

  if (totalErrors.length) {
    console.error(`\n❌ Erro de consistência de horários (openingHours): ${totalErrors.length} falha(s)`);
    totalErrors.slice(0, 20).forEach(e => console.error(`  • ${e}`));
    process.exit(1);
  }

  console.log(`✅ Horários (openingHoursSpecification) validados em ${checkedCount} rotas.`);
}

main();
