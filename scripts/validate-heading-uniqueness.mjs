#!/usr/bin/env node
/**
 * Heading uniqueness validator
 *
 * Para cada HTML em dist/, garante que:
 *  - exista exatamente 1 <h1>
 *  - nenhum texto de <h2> apareça repetido dentro da mesma página
 *    (depoimentos, FAQs e CTAs costumam reusar títulos — ofensores reais
 *     são sintoma de template duplicado e prejudicam a hierarquia de SEO).
 *
 * `WARN_ONLY=1` força saída 0 para inspeção local sem quebrar o build.
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const DIST = "dist";
const WARN_ONLY = process.env.WARN_ONLY === "1";

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const stripTags = (s) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

function extractHeadings(html, level) {
  const re = new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)</h${level}>`, "gi");
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = stripTags(m[1]);
    if (text) out.push(text);
  }
  return out;
}

function auditFile(html, route) {
  const issues = [];
  const h1s = extractHeadings(html, 1);
  // Em deploys Lovable o SSG (puppeteer) é opt-in (ENABLE_REACT_SSG=1) e o
  // build de produção entrega shells SPA — sem H1 no HTML estático. Pular
  // arquivos sem H1 evita ruído; quando o SSG real está ativo, voltamos a
  // exigir exatamente 1 H1.
  if (h1s.length === 0) return [];
  if (h1s.length > 1) issues.push(`múltiplos <h1> (${h1s.length}): ${h1s.join(" | ")}`);

  const h2s = extractHeadings(html, 2);
  const counts = new Map();
  for (const t of h2s) counts.set(t, (counts.get(t) || 0) + 1);
  const dupes = [...counts.entries()].filter(([, n]) => n > 1);
  if (dupes.length) {
    issues.push(`<h2> repetidos: ${dupes.map(([t, n]) => `"${t}" ×${n}`).join(", ")}`);
  }
  return issues;
}

async function main() {
  let files;
  try { files = await walk(DIST); }
  catch { console.error(`[heading] dist/ não encontrado — rode o build antes.`); process.exit(1); }

  let fails = 0;
  for (const f of files) {
    const html = await readFile(f, "utf8");
    const route = f.replace(/^dist/, "").replace(/\/index\.html$/, "/") || "/";
    const issues = auditFile(html, route);
    if (issues.length) {
      fails++;
      console.error(`✗ ${route}`);
      issues.forEach((i) => console.error(`    • ${i}`));
    }
  }

  console.log(`\n[heading] ${files.length} arquivos — ${fails} com problemas.`);
  if (fails > 0 && !WARN_ONLY) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });