#!/usr/bin/env node
/**
 * Sincroniza o bloco de redirects do public/.htaccess a partir da fonte única
 * `src/lib/redirects.ts`. Garante 301 permanente, um único salto e 410 para
 * conteúdo removido sem substituto.
 *
 * Uso: node scripts/sync-htaccess-redirects.mjs [--check]
 */
import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("src/lib/redirects.ts");
const HTACCESS = path.resolve("public/.htaccess");
const START = "    # >>> BEGIN generated-redirects (scripts/sync-htaccess-redirects.mjs)";
const END = "    # <<< END generated-redirects";

const ts = fs.readFileSync(SRC, "utf-8");

// Extrai os pares from/to das regras exatas sem precisar de transpilar TS.
const exact = [];
const exactBlock = ts.split("export const EXACT_REDIRECTS")[1]?.split("export const PATTERN_REDIRECTS")[0] ?? "";
for (const m of exactBlock.matchAll(/from:\s*"([^"]+)"[\s\S]*?to:\s*"([^"]+)"/g)) {
  exact.push({ from: m[1], to: m[2] });
}
if (exact.length === 0) {
  console.error("❌ nenhuma regra encontrada em EXACT_REDIRECTS");
  process.exit(1);
}

const escape = (p) => p.replace(/^\//, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const lines = [
  START,
  "    # NÃO EDITAR À MÃO — gerado de src/lib/redirects.ts",
  "",
  "    # 301 — conteúdo com substituto semanticamente equivalente (1 salto)",
  ...exact.map((r) => `    RewriteRule ^${escape(r.from)}/?$ ${r.to} [R=301,L,NC]`),
  "",
  "    # 301 — unificação /artigos/{slug} → /blog/{slug} preservando o slug",
  "    RewriteRule ^artigos/([^/]+)/?$ /blog/$1 [R=301,L,NC]",
  "",
  "    # 410 — conteúdo removido definitivamente, sem substituto equivalente",
  "    RewriteRule ^tag(/.*)?$ - [G,L,NC]",
  "    RewriteRule ^category(/.*)?$ - [G,L,NC]",
  "    RewriteRule ^author(/.*)?$ - [G,L,NC]",
  "    RewriteRule (^|/)feed/?$ - [G,L,NC]",
  "    RewriteRule ^wp-(content|admin|includes|json)(/.*)?$ - [G,L,NC]",
  "    RewriteRule ^[0-9]{4}/[0-9]{2}(/.*)?$ - [G,L]",
  END,
];

const block = lines.join("\n");
let htaccess = fs.readFileSync(HTACCESS, "utf-8");

if (htaccess.includes(START)) {
  htaccess = htaccess.replace(
    new RegExp(`${START.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}`),
    () => block,
  );
} else {
  // Insere logo antes da regra de remoção de barra final.
  const anchor = "    # Strip trailing slash on non-asset URLs";
  if (!htaccess.includes(anchor)) {
    console.error("❌ âncora não encontrada no .htaccess");
    process.exit(1);
  }
  htaccess = htaccess.replace(anchor, () => `${block}\n\n${anchor}`);
}

if (process.argv.includes("--check")) {
  const current = fs.readFileSync(HTACCESS, "utf-8");
  if (current !== htaccess) {
    console.error("❌ .htaccess dessincronizado de src/lib/redirects.ts — rode `node scripts/sync-htaccess-redirects.mjs`");
    process.exit(1);
  }
  console.log("✅ .htaccess sincronizado");
  process.exit(0);
}

fs.writeFileSync(HTACCESS, htaccess, "utf-8");
console.log(`✅ .htaccess: ${exact.length} redirects 301 exatos + /artigos + 6 padrões 410`);
