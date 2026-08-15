#!/usr/bin/env node
/**
 * Validador de Unicidade e Consistência de FAQPage.
 * 
 * Verifica se:
 * 1. Cada página tem exatamente zero ou um FAQPage (duplicidade).
 * 2. O conteúdo do FAQ é único por página (evitar doorway pages/duplicate content).
 * 3. O schema está bem formado e atende aos critérios do Google (mínimo 2 questões).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractBlocks } from "./lib/jsonld-validator.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ não encontrado. Rode o build primeiro.");
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
const faqMap = new Map(); // Hash de conteúdo -> lista de URLs
const failures = [];
let totalFaqPages = 0;

console.log(`🔎 Analisando FAQs em ${files.length} arquivos...`);

for (const file of files) {
  const rel = path.relative(DIST, file);
  const html = fs.readFileSync(file, "utf-8");
  const blocks = extractBlocks(html);
  
  const faqBlocks = [];
  for (const block of blocks) {
    try {
      const parsed = JSON.parse(block);
      // Pode ser um objeto FAQPage ou um @graph contendo FAQPage
      const nodes = parsed["@graph"] || (Array.isArray(parsed) ? parsed : [parsed]);
      for (const node of nodes) {
        if (node["@type"] === "FAQPage") {
          faqBlocks.push(node);
        }
      }
    } catch (e) {}
  }

  if (faqBlocks.length > 1) {
    failures.push(`${rel}: Detectados ${faqBlocks.length} schemas FAQPage (deve haver apenas 1).`);
  }

  if (faqBlocks.length === 1) {
    totalFaqPages++;
    const faq = faqBlocks[0];
    const questions = faq.mainEntity || [];
    
    if (questions.length < 2) {
      failures.push(`${rel}: FAQPage com poucas perguntas (${questions.length}). Google exige no mínimo 2.`);
      continue;
    }

    // Criar um hash do conteúdo para detectar duplicidade exata
    const contentHash = questions
      .map(q => (q.name || "") + (q.acceptedAnswer?.text || ""))
      .join("|")
      .toLowerCase()
      .replace(/\s+/g, "");
      
    if (faqMap.has(contentHash)) {
      faqMap.get(contentHash).push(rel);
    } else {
      faqMap.set(contentHash, [rel]);
    }
  }
}

// Verificar duplicidade de conteúdo entre páginas diferentes
for (const [hash, urls] of faqMap.entries()) {
  if (urls.length > 1) {
    // Permitir algumas exceções globais se necessário, mas por padrão é erro de SEO
    failures.push(`Conteúdo de FAQ duplicado em ${urls.length} páginas: \n    ${urls.slice(0, 5).join("\n    ")}${urls.length > 5 ? "\n    ..." : ""}`);
  }
}

console.log(`✅ Análise concluída. ${totalFaqPages} FAQs encontrados.`);

if (failures.length > 0) {
  console.error(`❌ Falha na validação de FAQ (${failures.length} erros):`);
  failures.forEach(f => console.error(`  - ${f}`));
  process.exit(1);
} else {
  console.log("✨ Todos os FAQs são únicos e consistentes.");
}
