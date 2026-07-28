/**
 * Valida word count mínimo de 600 palavras no HTML pré-renderizado das
 * rotas prioritárias para GEO/AEO (crawlers sem JavaScript).
 *
 * Falha o build se qualquer rota crítica ficar abaixo do limite — sinal de
 * que o prerender não injetou o conteúdo completo.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");
const MIN_WORDS = 600;

const ROUTES = [
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

function readRoute(route) {
  const file = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf-8");
}

function countBodyWords(html) {
  // Extrai apenas <body>...</body>, remove <script>/<style> e tags, conta palavras.
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;
  const stripped = body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!stripped) return 0;
  return stripped.split(/\s+/).length;
}

let failed = 0;
const results = [];

for (const route of ROUTES) {
  const html = readRoute(route);
  if (!html) {
    results.push({ route, words: 0, status: "MISSING" });
    failed++;
    continue;
  }
  const words = countBodyWords(html);
  const status = words >= MIN_WORDS ? "OK" : "FAIL";
  if (status === "FAIL") failed++;
  results.push({ route, words, status });
}

// Relatório
console.log("\n📊 Word-count por rota (mínimo " + MIN_WORDS + " palavras):");
console.log("─".repeat(72));
for (const r of results) {
  const icon = r.status === "OK" ? "✅" : r.status === "MISSING" ? "❓" : "❌";
  const words = String(r.words).padStart(5);
  console.log(`${icon} ${words} palavras — ${r.route}`);
}
console.log("─".repeat(72));

if (failed > 0) {
  console.error(`\n❌ ${failed} rota(s) abaixo de ${MIN_WORDS} palavras. Prerender incompleto.`);
  process.exit(1);
}
console.log(`\n✅ Todas as ${ROUTES.length} rotas críticas passaram (≥${MIN_WORDS} palavras).`);