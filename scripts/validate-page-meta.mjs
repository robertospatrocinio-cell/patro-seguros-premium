// Build-time validator: ensures every <PageMeta description="..."> across
// src/pages/**/*.tsx (and anywhere else) stays at most 160 characters, the
// safe upper bound for Google SERP truncation. Mirrors the rule already
// enforced by validate-local-pages.mjs for data-driven local pages.
//
// Only validates string-literal descriptions wrapped in double quotes — JSX
// expressions like description={someVar} are skipped (they cannot be
// statically measured here).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MAX_LEN = 160;
const SRC_ROOT = path.resolve(process.cwd(), "src");

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else if (/\.(tsx|ts)$/.test(entry.name)) acc.push(p);
  }
  return acc;
}

export async function validatePageMeta() {
  if (!fs.existsSync(SRC_ROOT)) {
    throw new Error(`validate-page-meta: src/ not found at ${SRC_ROOT}`);
  }
  const files = walk(SRC_ROOT);
  const blockRe = /<PageMeta\b[\s\S]*?\/>/g;
  const descRe = /description\s*=\s*"([^"\\]*(?:\\.[^"\\]*)*)"/;
  const errors = [];
  let checked = 0;

  for (const f of files) {
    const src = fs.readFileSync(f, "utf8");
    if (!src.includes("PageMeta")) continue;
    const blocks = src.match(blockRe) || [];
    for (const block of blocks) {
      const m = descRe.exec(block);
      if (!m) continue;
      checked++;
      const desc = m[1];
      if (desc.length > MAX_LEN) {
        const rel = path.relative(process.cwd(), f);
        errors.push(`${rel}: description com ${desc.length} chars (máx ${MAX_LEN}) → "${desc.slice(0, 80)}…"`);
      }
    }
  }

  if (errors.length) {
    const header = `\n❌ validate-page-meta: ${errors.length} description(s) acima de ${MAX_LEN} chars.\n`;
    throw new Error(header + errors.map((e) => "  • " + e).join("\n") + "\n");
  }
  console.log(`✅ validate-page-meta: ${checked} <PageMeta> description(s) ≤ ${MAX_LEN} chars.`);
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  validatePageMeta().catch((err) => {
    console.error(err.message ?? err);
    process.exit(1);
  });
}
