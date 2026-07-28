#!/usr/bin/env node
/**
 * Gate PRÉ-prerender: valida que cada rota crítica tem conteúdo-fonte com
 * pelo menos MIN_WORDS palavras em `scripts/seo-content-full.mjs` ANTES
 * do prerender rodar. Evita descobrir o problema só no postbuild, quando
 * o build já gastou minutos gerando HTML.
 *
 * Executado como `prebuild` no package.json.
 */
import { FULL_SEO_CONTENT } from "./seo-content-full.mjs";

const MIN_WORDS = 600;

// Mesma lista das rotas críticas em scripts/validate-word-count.mjs.
const CRITICAL_ROUTES = [
  "/",
  "/seguro-auto-guarulhos",
  "/seguro-residencial-guarulhos",
  "/seguro-vida-saude-guarulhos",
  "/seguro-moto-guarulhos",
  "/plano-de-saude-guarulhos",
  "/seguro-empresarial-guarulhos",
  "/seguros-empresariais-pme-guarulhos",
  "/seguro-frota-empresas-guarulhos",
  "/seguro-condominio-guarulhos",
  "/consorcio-guarulhos",
  "/sobre",
  "/depoimentos",
  "/contato",
];

function countWords(input) {
  if (!input) return 0;
  const parts = (Array.isArray(input) ? input : [input])
    .filter(Boolean)
    .join(" ");
  const stripped = parts
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return stripped ? stripped.split(/\s+/).length : 0;
}

function routeWords(entry) {
  if (!entry) return 0;
  return countWords([entry.h1, entry.body]);
}

const results = [];
let failed = 0;

for (const route of CRITICAL_ROUTES) {
  const entry = FULL_SEO_CONTENT[route];
  if (!entry) {
    results.push({ route, words: 0, status: "MISSING" });
    failed++;
    continue;
  }
  const words = routeWords(entry);
  const status = words >= MIN_WORDS ? "OK" : "FAIL";
  if (status !== "OK") failed++;
  results.push({ route, words, status });
}

console.log(`\n📝 Fonte SEO — mínimo ${MIN_WORDS} palavras por rota crítica:`);
console.log("─".repeat(72));
for (const r of results) {
  const icon = r.status === "OK" ? "✅" : r.status === "MISSING" ? "❓" : "❌";
  const words = String(r.words).padStart(5);
  console.log(`${icon} ${words} palavras — ${r.route}`);
}
console.log("─".repeat(72));

if (failed > 0) {
  console.error(
    `\n❌ ${failed} rota(s) sem conteúdo-fonte suficiente em scripts/seo-content-full.mjs.`
  );
  console.error(
    "   Corrija o FULL_SEO_CONTENT antes do prerender — o build foi interrompido."
  );
  process.exit(1);
}

console.log(
  `\n✅ Fonte SEO OK: ${CRITICAL_ROUTES.length} rotas críticas com ≥${MIN_WORDS} palavras.`
);
