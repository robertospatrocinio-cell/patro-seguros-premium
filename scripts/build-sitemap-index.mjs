#!/usr/bin/env node
/**
 * build-sitemap-index.mjs
 *
 * Reorganiza os sitemaps por TIPO de conteúdo:
 *   - sitemap-pages.xml    → páginas institucionais e utilitárias
 *   - sitemap-blog.xml     → posts do blog e artigos
 *   - sitemap-seguros.xml  → páginas de produtos/seguros e planos
 *   - sitemap-images.xml   → mantido como está (image sitemap)
 *   - sitemap-index.xml    → aponta apenas para os arquivos acima
 *
 * Regras:
 *   1. Fonte da verdade: public/sitemap.xml (master gerado no build).
 *   2. Somente URLs canônicas de https://www.patroseguros.com.br são
 *      aceitas — qualquer host de preview (lovable.app, etc) é descartado.
 *   3. Trailing slash é removido (exceto na home) para evitar duplicidade
 *      canônica; URLs duplicadas são deduplicadas.
 *   4. lastmod/changefreq/priority são preservados do master quando
 *      existirem.
 *
 * Rodar manualmente:
 *   node scripts/build-sitemap-index.mjs
 */

import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.resolve("public");
const MASTER = path.join(PUBLIC_DIR, "sitemap.xml");
const CANONICAL_HOST = "https://www.patroseguros.com.br";
const TODAY = new Date().toISOString().slice(0, 10);

// -------- Classificação por tipo -----------------------------------------
const SEGUROS_PATTERNS = [
  /^\/seguro(s)?(-|$|\/)/,
  /^\/plano(s)?(-|$|\/)/,
  /^\/planos-de-saude/,
  /^\/cotacao(-|$|\/)/,
  /^\/consorcio(-|$|\/)/,
  /^\/lp(-|$|\/)/,
  /^\/hub-/,
  /^\/nicho-/,
  /^\/vida-e-saude/,
  /^\/protecao-/,
  /^\/comparativo-/,
  /^\/melhor-corretora-/,
  /^\/corretora-de-seguros-/,
  /^\/como-comparar-seguradoras/,
  /^\/seguradoras(-|$|\/)/,
  /^\/responsabilidade-administradores/,
  /^\/solucoes-empresariais/,
  /^\/previdencia-privada/,
  /^\/planejamento-patrimonial/,
  /^\/investimentos/,
];

function classify(pathname) {
  if (pathname.startsWith("/blog") || pathname.startsWith("/artigos")) {
    return "blog";
  }
  if (SEGUROS_PATTERNS.some((rx) => rx.test(pathname))) {
    return "seguros";
  }
  return "pages";
}

// -------- Parse do master ------------------------------------------------
if (!fs.existsSync(MASTER)) {
  console.error(`❌ master sitemap não encontrado: ${MASTER}`);
  process.exit(1);
}

const masterXml = fs.readFileSync(MASTER, "utf-8");
const urlBlocks = [...masterXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  (m) => m[1],
);

const seen = new Set();
const buckets = { pages: [], blog: [], seguros: [] };
let skippedNonCanonical = 0;

for (const block of urlBlocks) {
  const locRaw = (block.match(/<loc>([^<]+)<\/loc>/) || [, ""])[1].trim();
  if (!locRaw) continue;

  // Somente URLs canônicas de patroseguros.com.br
  let u;
  try {
    u = new URL(locRaw);
  } catch {
    skippedNonCanonical++;
    continue;
  }
  if (u.origin !== CANONICAL_HOST) {
    skippedNonCanonical++;
    continue;
  }

  // Normaliza: remove trailing slash (exceto root), remove query/hash
  let pathname = u.pathname.replace(/\/+$/, "");
  if (pathname === "") pathname = "/";
  const canonical = `${CANONICAL_HOST}${pathname}`;

  if (seen.has(canonical)) continue;
  seen.add(canonical);

  const lastmod = (block.match(/<lastmod>([^<]+)<\/lastmod>/) || [, ""])[1].trim();
  const changefreq = (block.match(/<changefreq>([^<]+)<\/changefreq>/) || [, ""])[1].trim();
  const priority = (block.match(/<priority>([^<]+)<\/priority>/) || [, ""])[1].trim();

  buckets[classify(pathname)].push({ loc: canonical, lastmod, changefreq, priority });
}

// Ordena por path para diffs previsíveis
for (const k of Object.keys(buckets)) {
  buckets[k].sort((a, b) => a.loc.localeCompare(b.loc));
}

// -------- Serialização ---------------------------------------------------
function urlEntry({ loc, lastmod, changefreq, priority }) {
  const parts = [`    <loc>${loc}</loc>`];
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
  if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority) parts.push(`    <priority>${priority}</priority>`);
  return `  <url>\n${parts.join("\n")}\n  </url>`;
}

function buildUrlset(entries) {
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...entries.map(urlEntry),
    `</urlset>`,
    ``,
  ].join("\n");
}

function buildIndex(files) {
  const items = files.map(
    (f) =>
      `  <sitemap>\n    <loc>${CANONICAL_HOST}/${f}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`,
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...items,
    `</sitemapindex>`,
    ``,
  ].join("\n");
}

// -------- Grava arquivos -------------------------------------------------
const outputs = {
  "sitemap-pages.xml": buckets.pages,
  "sitemap-blog.xml": buckets.blog,
  "sitemap-seguros.xml": buckets.seguros,
};

for (const [name, entries] of Object.entries(outputs)) {
  fs.writeFileSync(path.join(PUBLIC_DIR, name), buildUrlset(entries), "utf-8");
  console.log(`  ✓ ${name.padEnd(22)} ${entries.length} URLs`);
}

// Lista de arquivos no índice (mantém sitemap-images.xml se existir)
const indexFiles = ["sitemap-pages.xml", "sitemap-blog.xml", "sitemap-seguros.xml"];
if (fs.existsSync(path.join(PUBLIC_DIR, "sitemap-images.xml"))) {
  indexFiles.push("sitemap-images.xml");
}

fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap-index.xml"), buildIndex(indexFiles), "utf-8");
console.log(`  ✓ sitemap-index.xml     ${indexFiles.length} sitemaps`);

// Mantém sitemap.xml como cópia do índice para autodiscovery em /sitemap.xml
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), buildIndex(indexFiles), "utf-8");
console.log(`  ✓ sitemap.xml           espelho do index (autodiscovery)`);

// -------- Remove sitemaps antigos por categoria --------------------------
const LEGACY = [
  "sitemap-auto.xml",
  "sitemap-bairros.xml",
  "sitemap-empresarial.xml",
  "sitemap-geral.xml",
  "sitemap-guarulhos.xml",
  "sitemap-vida-saude.xml",
];
for (const f of LEGACY) {
  const fp = path.join(PUBLIC_DIR, f);
  if (fs.existsSync(fp)) {
    fs.unlinkSync(fp);
    console.log(`  ✗ removido legacy: ${f}`);
  }
}

console.log(
  `\n✅ sitemap-index reorganizado por tipo (URLs não-canônicas descartadas: ${skippedNonCanonical})`,
);