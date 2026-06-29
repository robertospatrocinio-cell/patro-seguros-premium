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
const NOTIFY = String(process.env.NOTIFY || "1") !== "0";
const SITEMAP_INDEX_URL = `${SITE_URL}/sitemap-index.xml`;

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

async function run() {
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

  // ---- Notifica search engines (sempre que houve alteração e não é dry) ---
  const anyChanged = summary.some((s) => s.changed);
  if (NOTIFY && !DRY && anyChanged) {
    await notifySearchEngines();
  } else if (!anyChanged) {
    console.log("· notify: nada mudou, ping não enviado.");
  }

  // ---- Validação final: robots.txt + integridade dos sitemaps -------------
  const problems = validateOutputs(files);
  if (problems.length > 0) {
    console.error("❌ Validação falhou:");
    for (const p of problems) console.error(`   - ${p}`);
    process.exit(2);
  }
  console.log("✓ Validação OK: robots.txt e sitemaps consistentes.");
}

/**
 * Checa, ao final da execução, que:
 *   1. robots.txt existe no SITEMAP_DIR
 *   2. Aponta para sitemap-index.xml (linha Sitemap: …/sitemap-index.xml)
 *   3. Todos os Sitemap: declarados no robots.txt existem em disco
 *   4. Todos os sitemap*.xml em disco estão declarados no robots.txt
 *   5. Cada sitemap-*.xml referenciado pelo sitemap-index.xml existe em disco
 */
function validateOutputs(filesOnDisk) {
  const problems = [];
  const robotsPath = path.join(SITEMAP_DIR, "robots.txt");
  if (!fs.existsSync(robotsPath)) {
    problems.push("robots.txt não encontrado em " + SITEMAP_DIR);
    return problems;
  }

  const robots = fs.readFileSync(robotsPath, "utf-8");
  const declared = [...robots.matchAll(/^\s*Sitemap:\s*(\S+)\s*$/gim)].map((m) => m[1]);

  // (2) tem que referenciar o sitemap-index.xml
  const hasIndex = declared.some((u) => /\/sitemap-?index\.xml$/i.test(u));
  if (!hasIndex) {
    problems.push("robots.txt não referencia sitemap-index.xml");
  }

  // (3) cada Sitemap: declarado existe em disco
  const onDisk = new Set(filesOnDisk);
  for (const u of declared) {
    const fname = u.split("/").pop();
    if (!fname || !onDisk.has(fname)) {
      problems.push(`Sitemap declarado em robots.txt sem arquivo correspondente: ${u}`);
    }
  }

  // (4) cada sitemap*.xml em disco está declarado
  const declaredFnames = new Set(declared.map((u) => u.split("/").pop()));
  for (const f of filesOnDisk) {
    if (!declaredFnames.has(f)) {
      problems.push(`Arquivo presente mas não declarado em robots.txt: ${f}`);
    }
  }

  // (5) integridade do sitemap-index: filhos existem em disco
  const indexPath = path.join(SITEMAP_DIR, "sitemap-index.xml");
  if (fs.existsSync(indexPath)) {
    const xml = fs.readFileSync(indexPath, "utf-8");
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    for (const loc of locs) {
      const fname = loc.split("/").pop();
      if (!fname || !onDisk.has(fname)) {
        problems.push(`sitemap-index.xml referencia arquivo ausente: ${loc}`);
      }
    }
    if (locs.length === 0) {
      problems.push("sitemap-index.xml não contém nenhum <loc>");
    }
  } else {
    problems.push("sitemap-index.xml não encontrado em " + SITEMAP_DIR);
  }

  return problems;
}

/**
 * Dispara reindex no Google (via edge function resubmit-sitemaps quando
 * SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY estão presentes) e ping no Bing
 * (endpoint público, sem credencial). Google /ping foi descontinuado em
 * jun/2023 — só usamos a Search Console API via gateway.
 */
async function notifySearchEngines() {
  console.log("→ notify: disparando reindex em GSC e Bing…");

  // 1) Google Search Console (via edge function da Lovable Cloud)
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (SUPABASE_URL && SERVICE_KEY) {
    const url = `${SUPABASE_URL.replace(/\/$/, "")}/functions/v1/resubmit-sitemaps`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
        body: "{}",
      });
      const txt = await res.text().catch(() => "");
      console.log(`  GSC resubmit  → HTTP ${res.status}  ${txt.slice(0, 200)}`);
    } catch (err) {
      console.warn(`  ⚠ GSC resubmit falhou: ${err.message}`);
    }
  } else {
    console.log("  · GSC: SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY ausentes — pulado.");
  }

  // 2) Bing Webmaster (ping público, ainda suportado)
  const bingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_INDEX_URL)}`;
  try {
    const res = await fetch(bingUrl, { method: "GET" });
    console.log(`  Bing ping     → HTTP ${res.status}  ${bingUrl}`);
  } catch (err) {
    console.warn(`  ⚠ Bing ping falhou: ${err.message}`);
  }

  // 3) IndexNow (Bing/Yandex/Seznam) — só se INDEXNOW_KEY estiver definido
  const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
  if (INDEXNOW_KEY) {
    try {
      const res = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: new URL(SITE_URL).host,
          key: INDEXNOW_KEY,
          urlList: [SITEMAP_INDEX_URL],
        }),
      });
      console.log(`  IndexNow      → HTTP ${res.status}`);
    } catch (err) {
      console.warn(`  ⚠ IndexNow falhou: ${err.message}`);
    }
  }
}

run();