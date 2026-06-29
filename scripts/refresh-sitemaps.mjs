#!/usr/bin/env node
/**
 * refresh-sitemaps.mjs
 *
 * Script standalone (Node 18+, sem dependências) para rodar via cron em
 * Hostinger (ou qualquer host com Node) e atualizar o campo <lastmod> dos
 * sitemaps já publicados, sinalizando freshness ao Google sem precisar de
 * rebuild da aplicação.
 *
 * Estratégia (anti-ruído):
 *   - O sitemap-index.xml recebe lastmod = hoje em todas as entradas
 *     (sinal global de atualização).
 *   - Em cada cluster sitemap-*.xml, só recebem lastmod = hoje as URLs
 *     cujo lastmod anterior é mais antigo que MIN_AGE_DAYS (default 14).
 *   - Limita a MAX_PER_FILE URLs renovadas por arquivo por execução
 *     (default 25), rotacionando naturalmente entre semanas.
 *
 * Uso:
 *   node scripts/refresh-sitemaps.mjs                    # usa ./public
 *   SITEMAP_DIR=/home/u123/public_html node scripts/refresh-sitemaps.mjs
 *   MIN_AGE_DAYS=7 MAX_PER_FILE=40 node scripts/refresh-sitemaps.mjs
 *   node scripts/refresh-sitemaps.mjs --dir /home/u123/public_html --dry
 *
 * Hostinger (cPanel/hPanel → Avançado → Cron Jobs):
 *   Comando semanal (segunda 04:00):
 *     0 4 * * 1 /usr/bin/node /home/USER/public_html/scripts/refresh-sitemaps.mjs --dir /home/USER/public_html >> /home/USER/logs/sitemap-refresh.log 2>&1
 */

import fs from "node:fs";
import path from "node:path";

// -------- CLI / env config ------------------------------------------------
const args = process.argv.slice(2);
function flag(name) {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return undefined;
  const next = args[i + 1];
  return next && !next.startsWith("--") ? next : true;
}

const SITEMAP_DIR = path.resolve(
  String(flag("dir") || process.env.SITEMAP_DIR || "public")
);
const MIN_AGE_DAYS = Number(process.env.MIN_AGE_DAYS || 14);
const MAX_PER_FILE = Number(process.env.MAX_PER_FILE || 25);
const DRY = Boolean(flag("dry"));
const TODAY = new Date().toISOString().slice(0, 10);
const SITE_URL = (process.env.SITE_URL || "https://www.patroseguros.com.br").replace(/\/$/, "");
const WRITE_ROBOTS = String(process.env.WRITE_ROBOTS || "1") !== "0";

// -------- Helpers ---------------------------------------------------------
function daysBetween(iso, ref) {
  const a = Date.parse(iso);
  if (Number.isNaN(a)) return Infinity;
  return Math.floor((ref - a) / 86400000);
}

/** Normaliza qualquer formato de data ISO para YYYY-MM-DD. */
function normalizeDate(value) {
  if (!value) return TODAY;
  const trimmed = value.trim();
  const m = trimmed.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : TODAY;
}

/** Substitui (ou injeta) <lastmod> dentro de um bloco <url>...</url>. */
function setLastmod(block, newDate) {
  if (/<lastmod>[^<]*<\/lastmod>/.test(block)) {
    return block.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${newDate}</lastmod>`);
  }
  // injeta logo após o <loc>
  return block.replace(/<\/loc>/, `</loc>\n    <lastmod>${newDate}</lastmod>`);
}

function processIndex(xml) {
  // sitemap-index: bate lastmod em todos os <sitemap>
  let touched = 0;
  const out = xml.replace(/<sitemap>([\s\S]*?)<\/sitemap>/g, (full, inner) => {
    touched++;
    const updated = setLastmod(inner, TODAY);
    return `<sitemap>${updated}</sitemap>`;
  });
  return { xml: out, touched, total: touched };
}

function processCluster(xml) {
  const now = Date.now();
  let touched = 0;
  let total = 0;
  const out = xml.replace(/<url>([\s\S]*?)<\/url>/g, (full, inner) => {
    total++;
    if (touched >= MAX_PER_FILE) return full;
    const cur = (inner.match(/<lastmod>([^<]+)<\/lastmod>/) || [, ""])[1];
    const curNorm = normalizeDate(cur);
    const age = daysBetween(curNorm, now);
    if (age < MIN_AGE_DAYS) {
      // só normaliza o formato, sem renovar a data
      if (cur && cur.trim() !== curNorm) {
        return `<url>${setLastmod(inner, curNorm)}</url>`;
      }
      return full;
    }
    touched++;
    return `<url>${setLastmod(inner, TODAY)}</url>`;
  });
  return { xml: out, touched, total };
}

function run() {
  if (!fs.existsSync(SITEMAP_DIR)) {
    console.error(`❌ Diretório não encontrado: ${SITEMAP_DIR}`);
    process.exit(1);
  }
  const files = fs
    .readdirSync(SITEMAP_DIR)
    .filter((f) => /^sitemap.*\.xml$/i.test(f));

  if (files.length === 0) {
    console.error(`❌ Nenhum sitemap*.xml encontrado em ${SITEMAP_DIR}`);
    process.exit(1);
  }

  console.log(`▶ refresh-sitemaps  dir=${SITEMAP_DIR}  today=${TODAY}  min_age=${MIN_AGE_DAYS}d  max_per_file=${MAX_PER_FILE}  dry=${DRY}`);

  const summary = [];
  for (const name of files) {
    const fp = path.join(SITEMAP_DIR, name);
    let xml;
    try {
      xml = fs.readFileSync(fp, "utf-8");
    } catch (err) {
      console.warn(`  ⚠ ${name}: falha ao ler — ${err.message}`);
      continue;
    }

    const isIndex = /sitemap-?index/i.test(name) || /<sitemapindex/i.test(xml);
    const result = isIndex ? processIndex(xml) : processCluster(xml);

    if (result.xml !== xml) {
      if (!DRY) {
        fs.writeFileSync(fp, result.xml, "utf-8");
      }
      summary.push({ name, kind: isIndex ? "index" : "urlset", touched: result.touched, total: result.total, changed: true });
      console.log(`  ✓ ${name.padEnd(28)} ${isIndex ? "[index]" : "[urls ]"} touched=${result.touched}/${result.total}`);
    } else {
      summary.push({ name, kind: isIndex ? "index" : "urlset", touched: 0, total: result.total, changed: false });
      console.log(`  · ${name.padEnd(28)} ${isIndex ? "[index]" : "[urls ]"} sem alterações (total=${result.total})`);
    }
  }

  const totalTouched = summary.reduce((a, s) => a + s.touched, 0);
  console.log(`✅ Concluído — arquivos alterados: ${summary.filter((s) => s.changed).length}/${files.length}  URLs renovadas: ${totalTouched}`);
  if (DRY) console.log("   (dry-run: nenhum arquivo foi gravado)");

  // ---- robots.txt sempre sincronizado com os sitemaps presentes -----------
  if (WRITE_ROBOTS) {
    const robotsPath = path.join(SITEMAP_DIR, "robots.txt");
    // ordem preferida: index primeiro, depois clusters em ordem alfabética
    const sitemapFiles = files
      .slice()
      .sort((a, b) => {
        const ai = /sitemap-?index/i.test(a) ? 0 : 1;
        const bi = /sitemap-?index/i.test(b) ? 0 : 1;
        if (ai !== bi) return ai - bi;
        return a.localeCompare(b);
      });

    const robotsTxt = [
      "# Gerado automaticamente por scripts/refresh-sitemaps.mjs — não editar manualmente.",
      `# Última atualização: ${new Date().toISOString()}`,
      "User-agent: *",
      "Allow: /",
      "Disallow: /admin/",
      "Disallow: /api/",
      "Disallow: /~api/",
      "Disallow: /~flock.js",
      "Disallow: /ebook-consorcio/",
      "Disallow: /avaliar-no-google/",
      "Disallow: /performance-diagnostico",
      "Disallow: /conversion-dashboard",
      "Disallow: /seo-technical-report",
      "Disallow: /pagespeed-history",
      "",
      "# Allow public high-value paths",
      "Allow: /lp/",
      "Allow: /blog/",
      "Allow: /seguros-guarulhos/",
      "Allow: /planos-de-saude/",
      "",
      "# Sitemaps (auto-descobertos)",
      ...sitemapFiles.map((f) => `Sitemap: ${SITE_URL}/${f}`),
      "",
      "# Optimization for Search Bots",
      "User-agent: Googlebot",
      "Allow: /",
      "Crawl-delay: 0.1",
      "",
      "User-agent: Bingbot",
      "Allow: /",
      "Crawl-delay: 0.5",
      "",
    ].join("\n");

    let prev = "";
    try { prev = fs.readFileSync(robotsPath, "utf-8"); } catch { /* nuevo */ }
    // ignora a linha de timestamp para detectar mudança real
    const strip = (s) => s.replace(/^# Última atualização:.*$/m, "");
    if (strip(prev) !== strip(robotsTxt)) {
      if (!DRY) fs.writeFileSync(robotsPath, robotsTxt, "utf-8");
      console.log(`✓ robots.txt atualizado (${sitemapFiles.length} sitemaps).`);
    } else {
      console.log("· robots.txt já em dia.");
    }
  }
}

run();