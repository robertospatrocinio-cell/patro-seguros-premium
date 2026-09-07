#!/usr/bin/env node
/**
 * Impede o retorno de números institucionais divergentes:
 * - "30+ anos" / "30 anos de mercado" (a empresa foi fundada em 2021)
 * - "8 seguradoras" / "8+ seguradoras" (o padrão é 16+)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src", "index.html", "public"];
const EXT = /\.(tsx?|jsx?|mjs|html|md)$/;
const PATTERNS = [
  { re: /\b(30\+?\s*anos\s+de\s+(mercado|experiência)|mais de 30 anos de (mercado|experiência))/gi,
    msg: 'Use "fundada em 2021 por profissionais com mais de 20 anos de experiência".' },
  { re: /\b8\+?\s+seguradoras\b/gi, msg: 'Padronize para "16+ seguradoras".' },
];


/** Detecta `${...}` escrito fora de template literal (aparece literal na página). */
function findUnrenderedInterpolations(src) {
  const out = [];
  let mode = null;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (mode === null) {
      if (c === "`" || c === '"' || c === "'") { mode = c; continue; }
      if (src.startsWith("//", i)) { const j = src.indexOf("\n", i); i = j < 0 ? src.length : j; continue; }
      if (src.startsWith("/*", i)) { const j = src.indexOf("*/", i); i = j < 0 ? src.length : j + 1; continue; }
      if (src.startsWith("${", i)) out.push(i);
    } else {
      if (c === "\\") { i++; continue; }
      if (c === mode) { mode = null; continue; }
      if (mode !== "`" && src.startsWith("${", i)) out.push(i);
    }
  }
  return out;
}

const files = [];
const walk = (p) => {
  const st = statSync(p, { throwIfNoEntry: false });
  if (!st) return;
  if (st.isDirectory()) { for (const e of readdirSync(p)) walk(join(p, e)); return; }
  if (EXT.test(p)) files.push(p);
};
ROOTS.forEach(walk);

const TODAY = new Date().toISOString().slice(0, 10);
const DATE_FIELD = /\b(date|updatedAt|datePublished|dateModified|lastReviewed)\s*[:=]\s*"(\d{4}-\d{2}-\d{2})"/g;

const errors = [];
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const { re, msg } of PATTERNS) {
      re.lastIndex = 0;
      if (re.test(line)) errors.push(`${f}:${i + 1} → ${line.trim().slice(0, 120)}\n    ${msg}`);
    }
    DATE_FIELD.lastIndex = 0;
    let m;
    while ((m = DATE_FIELD.exec(line)) !== null) {
      if (m[2] > TODAY) {
        errors.push(`${f}:${i + 1} → ${m[1]}="${m[2]}" está no futuro (hoje: ${TODAY}).\n    Publique apenas conteúdo com data igual ou anterior a hoje.`);
      }
    }
  });
}

for (const f of files) {
  if (!/\.(tsx?|jsx?)$/.test(f)) continue;
  const src = readFileSync(f, "utf8");
  for (const idx of findUnrenderedInterpolations(src)) {
    const line = src.slice(0, idx).split("\n").length;
    errors.push(`${f}:${line} → interpolação \`${src.slice(idx, idx + 40)}\` fora de template literal; o texto sairia literal na página.`);
  }
}

if (errors.length) {
  console.error("Inconsistências institucionais encontradas:\n" + errors.map((e) => " - " + e).join("\n"));
  process.exit(1);
}
console.log(`[brand] ${files.length} arquivos verificados — consistência institucional OK.`);
