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

// Diretório-alvo: por padrão public/, mas aceita --dir dist para rodar
// no postbuild (o vite plugin regenera clusters em dist/ a cada build).
const args = process.argv.slice(2);
const dirIdx = args.indexOf("--dir");
const TARGET_DIR = path.resolve(
  dirIdx >= 0 && args[dirIdx + 1] ? args[dirIdx + 1] : "public",
);
const MASTER = path.join(TARGET_DIR, "sitemap.xml");
const CANONICAL_HOST = "https://www.patroseguros.com.br";
const TODAY = new Date().toISOString().slice(0, 10);

// -------- lastmod real ----------------------------------------------------
// Regra: `lastmod` só muda quando o conteúdo muda. Preservamos o valor já
// publicado por URL (lido dos sitemaps commitados em public/) e só usamos a
// data de hoje para URLs realmente novas. Rebuild sozinho nunca altera datas.
function loadPublishedLastmod() {
  const map = new Map();
  const publicDir = path.resolve("public");
  if (!fs.existsSync(publicDir)) return map;
  const files = fs
    .readdirSync(publicDir)
    .filter((f) => /^sitemap.*\.xml$/i.test(f));
  for (const f of files) {
    let xml = "";
    try {
      xml = fs.readFileSync(path.join(publicDir, f), "utf-8");
    } catch {
      continue;
    }
    for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = (m[1].match(/<loc>([^<]+)<\/loc>/) || [, ""])[1].trim();
      const lastmod = (m[1].match(/<lastmod>([^<]+)<\/lastmod>/) || [, ""])[1].trim();
      if (loc && lastmod && !map.has(loc)) map.set(loc, lastmod);
    }
  }
  return map;
}

const PUBLISHED_LASTMOD = loadPublishedLastmod();

// URLs que já pertencem ao cluster hyper-local não podem ser repetidas nos
// demais sitemaps — cada URL aparece uma única vez na união dos sitemaps.
function loadClaimedUrls(fileName) {
  const claimed = new Set();
  const fp = path.join(TARGET_DIR, fileName);
  if (!fs.existsSync(fp)) return claimed;
  const xml = fs.readFileSync(fp, "utf-8");
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    claimed.add(m[1].trim().replace(/\/+$/, ""));
  }
  return claimed;
}

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

console.log(`▶ build-sitemap-index  dir=${TARGET_DIR}`);

const masterXml = fs.readFileSync(MASTER, "utf-8");
const urlBlocks = [...masterXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  (m) => m[1],
);

// Guard rerun-safe: se o master já é um sitemapindex (0 <url>), aborta
// para não sobrescrever os sitemaps de tipo com um index vazio.
if (urlBlocks.length === 0) {
  console.error(
    `❌ ${MASTER} não contém <url> — provavelmente já é um sitemapindex.\n` +
      `   Regere o master (build do Vite) antes de rodar este script.`,
  );
  process.exit(1);
}

const seen = new Set();
const buckets = { pages: [], blog: [], seguros: [] };
let skippedNonCanonical = 0;
let skippedParams = 0;
let skippedArtigos = 0;
let skippedClaimed = 0;

// sitemap-bairros.xml é gerado antes deste script e é dono exclusivo das
// URLs hyper-locais.
const BAIRROS_CLAIMED = loadClaimedUrls("sitemap-bairros.xml");

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

  // Nenhuma URL com parâmetros entra em sitemap.
  if (u.search) {
    skippedParams++;
    continue;
  }

  // Normaliza: remove trailing slash (exceto root), remove query/hash
  // A home é a origem nua (sem "/"), igual ao canonical do PageMeta.
  const pathname = u.pathname.replace(/\/+$/, "") || "/";
  const canonical =
    pathname === "/" ? CANONICAL_HOST : `${CANONICAL_HOST}${pathname}`;

  // `/artigos/*` responde 301 para `/blog/*` — URLs redirecionadas ficam fora.
  if (/^\/artigos(\/|$)/i.test(pathname)) {
    skippedArtigos++;
    continue;
  }

  // Já publicada em sitemap-bairros.xml → não repetir em outro sitemap.
  if (BAIRROS_CLAIMED.has(canonical)) {
    skippedClaimed++;
    continue;
  }

  if (seen.has(canonical)) continue;
  seen.add(canonical);

  // lastmod: preserva a data já publicada para a URL; só cai no valor gerado
  // quando a URL é nova (não existia em nenhum sitemap publicado).
  const generatedLastmod = (block.match(/<lastmod>([^<]+)<\/lastmod>/) || [, ""])[1].trim();
  const lastmod = PUBLISHED_LASTMOD.get(canonical) || generatedLastmod;
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

/**
 * `lastmod` do sitemap filho = maior `lastmod` real entre suas URLs.
 * Nunca a data de build: recompilar o site não é alteração de conteúdo.
 */
function childLastmod(fileName) {
  const fp = path.join(TARGET_DIR, fileName);
  if (!fs.existsSync(fp)) return null;
  const xml = fs.readFileSync(fp, "utf-8");
  const dates = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)]
    .map((m) => m[1].trim())
    .filter(Boolean)
    .sort();
  return dates.length ? dates[dates.length - 1] : null;
}

function buildIndex(files) {
  const items = files.map((f) => {
    const lastmod = childLastmod(f);
    return [
      `  <sitemap>`,
      `    <loc>${CANONICAL_HOST}/${f}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      `  </sitemap>`,
    ]
      .filter(Boolean)
      .join("\n");
  });
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
  fs.writeFileSync(path.join(TARGET_DIR, name), buildUrlset(entries), "utf-8");
  console.log(`  ✓ ${name.padEnd(22)} ${entries.length} URLs`);
}

// Lista de arquivos no índice (mantém sitemap-images.xml se existir)
const indexFiles = ["sitemap-pages.xml", "sitemap-blog.xml", "sitemap-seguros.xml"];
if (fs.existsSync(path.join(TARGET_DIR, "sitemap-images.xml"))) {
  indexFiles.push("sitemap-images.xml");
}
// sitemap-bairros.xml é gerado por scripts/generate-sitemap.ts (bairros +
// subpáginas produto×bairro). Incluí-lo no índice garante que o GSC rastreie
// o cluster hyper-local separadamente dos demais.
if (fs.existsSync(path.join(TARGET_DIR, "sitemap-bairros.xml"))) {
  indexFiles.push("sitemap-bairros.xml");
}

fs.writeFileSync(path.join(TARGET_DIR, "sitemap-index.xml"), buildIndex(indexFiles), "utf-8");
console.log(`  ✓ sitemap-index.xml     ${indexFiles.length} sitemaps`);

// Mantém sitemap.xml como cópia do índice para autodiscovery em /sitemap.xml
fs.writeFileSync(path.join(TARGET_DIR, "sitemap.xml"), buildIndex(indexFiles), "utf-8");
console.log(`  ✓ sitemap.xml           espelho do index (autodiscovery)`);

// -------- Remove sitemaps antigos por categoria --------------------------
const LEGACY = [
  "sitemap-auto.xml",
  "sitemap-empresarial.xml",
  "sitemap-geral.xml",
  "sitemap-guarulhos.xml",
  "sitemap-vida-saude.xml",
  // Espelho antigo do índice: mantinha um conjunto concorrente de URLs
  // apontando para sitemaps já removidos.
  "sitemap_index.xml",
];
for (const f of LEGACY) {
  const fp = path.join(TARGET_DIR, f);
  if (fs.existsSync(fp)) {
    fs.unlinkSync(fp);
    console.log(`  ✗ removido legacy: ${f}`);
  }
}

// -------- robots.txt: sincroniza referências de Sitemap ------------------
const robotsPath = path.join(TARGET_DIR, "robots.txt");
if (fs.existsSync(robotsPath)) {
  const original = fs.readFileSync(robotsPath, "utf-8");
  const lines = original.split("\n");
  const kept = lines.filter((l) => !/^\s*Sitemap:\s*\S+/i.test(l));
  // Uma única referência: o índice canônico já declara todos os filhos.
  // Declarar filhos de novo cria conjuntos concorrentes no Search Console.
  const sitemapLines = [`Sitemap: ${CANONICAL_HOST}/sitemap-index.xml`];
  const rebuilt = kept.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() +
    `\n\n# Sitemaps (organizados por tipo)\n${sitemapLines.join("\n")}\n`;
  fs.writeFileSync(robotsPath, rebuilt, "utf-8");
  console.log(`  ✓ robots.txt            Sitemap: ${sitemapLines.length} entradas`);
}

console.log(
  `\n✅ sitemap-index reorganizado por tipo` +
    `\n   descartadas → não-canônicas: ${skippedNonCanonical} | com parâmetros: ${skippedParams}` +
    ` | /artigos/ (301): ${skippedArtigos} | já em sitemap-bairros: ${skippedClaimed}`,
);

// -------- Auditoria: nenhuma URL em dois sitemaps ------------------------
{
  const all = new Map();
  let dupes = 0;
  for (const f of indexFiles) {
    const fp = path.join(TARGET_DIR, f);
    if (!fs.existsSync(fp) || f === "sitemap-images.xml") continue;
    const xml = fs.readFileSync(fp, "utf-8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const loc = m[1].trim();
      if (all.has(loc)) {
        dupes++;
        console.error(`  ⚠ duplicada: ${loc} (${all.get(loc)} e ${f})`);
      } else {
        all.set(loc, f);
      }
    }
  }
  console.log(`  ✓ auditoria: ${all.size} URLs únicas, ${dupes} duplicadas`);
  if (dupes > 0) process.exitCode = 1;
}