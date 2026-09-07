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

const files = [];
const walk = (p) => {
  const st = statSync(p, { throwIfNoEntry: false });
  if (!st) return;
  if (st.isDirectory()) { for (const e of readdirSync(p)) walk(join(p, e)); return; }
  if (EXT.test(p)) files.push(p);
};
ROOTS.forEach(walk);

const errors = [];
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const { re, msg } of PATTERNS) {
      re.lastIndex = 0;
      if (re.test(line)) errors.push(`${f}:${i + 1} → ${line.trim().slice(0, 120)}\n    ${msg}`);
    }
  });
}

if (errors.length) {
  console.error("Inconsistências institucionais encontradas:\n" + errors.map((e) => " - " + e).join("\n"));
  process.exit(1);
}
console.log(`[brand] ${files.length} arquivos verificados — consistência institucional OK.`);
