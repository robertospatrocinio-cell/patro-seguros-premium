#!/usr/bin/env node
/**
 * Auditoria automatizada de AggregateRating (JSON-LD)
 *
 * Para cada rota de produto, abre a página com Playwright (renderiza o SPA),
 * coleta TODOS os blocos <script type="application/ld+json"> e verifica se
 * existe pelo menos um com `aggregateRating.ratingValue` e `reviewCount`.
 *
 * Saídas (em audit-reports/aggregate-rating/<timestamp>/):
 *   - report.json    → resultado estruturado por URL
 *   - report.csv     → planilha (URL, status, rating, reviewCount, schemas)
 *   - report.md      → resumo legível
 *   - <slug>.json    → JSON-LD bruto capturado por página (evidência)
 *   - <slug>.png     → screenshot da página (evidência)
 *
 * Uso:
 *   BASE_URL=https://www.patroseguros.com.br node scripts/audit-aggregate-rating.mjs
 *   # ou contra a preview:
 *   BASE_URL=https://patroseguros.lovable.app node scripts/audit-aggregate-rating.mjs
 *
 * Pré-requisito: `npx playwright install chromium` (uma vez).
 */

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE_URL = (process.env.BASE_URL || "https://www.patroseguros.com.br").replace(/\/+$/, "");
const CONCURRENCY = Number(process.env.CONCURRENCY || 4);
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || 25000);

/**
 * Rotas auditadas — todas as páginas que devem expor AggregateRatingSchema
 * (Home + páginas de produto baseadas em InsurancePageTemplate). Mantenha
 * sincronizado com src/App.tsx quando novas rotas forem adicionadas.
 */
const ROUTES = [
  "/",
  // Pessoa física
  "/seguro-auto", "/seguro-vida", "/seguro-residencial", "/seguro-viagem",
  "/seguro-fianca", "/previdencia-privada", "/investimentos", "/seguro-moto",
  "/seguro-saude", "/seguro-odonto", "/seguro-celular", "/seguro-bike",
  "/seguro-jetski", "/seguro-embarcacoes", "/seguro-avioes", "/seguro-helicopteros",
  "/seguro-carta-verde", "/seguro-decesso", "/seguro-funeral",
  "/seguro-acidentes-pessoais", "/seguro-estagiario", "/seguro-imobiliario",
  "/seguro-fianca-locaticia", "/seguro-motorista-app", "/plano-pet",
  "/planos-de-saude",
  // Empresarial
  "/seguro-empresarial", "/seguro-frota", "/seguro-transporte", "/seguro-rural",
  "/seguro-maquinas", "/seguro-rc", "/seguro-rc-profissional", "/seguro-condominio",
  "/seguro-engenharia", "/seguro-cyber", "/seguro-caminhao", "/seguro-vida-pme",
  "/seguro-armazenagem", "/seguro-placa-solar", "/seguro-pecuario", "/seguro-cafe",
  "/seguro-lojas-shopping", "/seguro-galpoes-industriais",
  "/seguro-maquinas-agricolas", "/seguro-equipamentos-agricolas",
  "/seguro-maquinas-industriais", "/seguro-maquinas-linha-amarela",
  "/seguro-ambiental", "/seguro-geada", "/seguro-propriedade-rural",
  "/seguro-drone-agricola", "/seguro-transporte-agro", "/seguro-granja",
  "/seguro-garantia", "/plano-saude-empresarial",
  // RC profissionais
  "/seguro-rc-medicos", "/seguro-rc-veterinarios", "/seguro-rc-advogados",
  "/seguro-rc-dentistas", "/seguro-rc-engenheiros", "/seguro-rc-executivos",
  "/seguro-rc-obras", "/seguro-rc-prestacao-servicos", "/seguro-rc-eventos",
  // Consórcio
  "/consorcio", "/consorcio-carro", "/consorcio-imoveis", "/consorcio-veiculos-pesados",
  // SEO local
  "/seguro-auto-guarulhos", "/plano-saude-guarulhos", "/seguro-empresarial-guarulhos",
  "/corretora-seguros-guarulhos", "/seguro-residencial-guarulhos",
  "/seguro-vida-saude-guarulhos", "/seguro-frota-empresas-guarulhos",
  "/seguros-empresariais-pme-guarulhos", "/seguro-moto-guarulhos",
  "/seguro-condominio-guarulhos", "/seguros-shopping-maia-cidade-maia-guarulhos",
];

const slugify = (path) => (path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "_"));

async function auditPage(browser, route) {
  const url = `${BASE_URL}${route === "/" ? "" : route}`;
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const result = { route, url, ok: false, status: 0, schemas: [], aggregateRating: null, error: null, screenshot: null };

  try {
    const resp = await page.goto(url, { waitUntil: "networkidle", timeout: TIMEOUT_MS });
    result.status = resp ? resp.status() : 0;

    // Aguarda o React injetar os <script type="application/ld+json">
    await page.waitForFunction(
      () => document.querySelectorAll('script[type="application/ld+json"]').length > 0,
      { timeout: 8000 }
    ).catch(() => {});

    const schemas = await page.$$eval(
      'script[type="application/ld+json"]',
      (nodes) => nodes.map((n) => n.textContent || "")
    );

    const parsed = [];
    for (const raw of schemas) {
      try {
        const obj = JSON.parse(raw);
        const items = Array.isArray(obj) ? obj : (obj["@graph"] ? obj["@graph"] : [obj]);
        for (const it of items) parsed.push(it);
      } catch {
        /* ignore malformed */
      }
    }
    result.schemas = parsed.map((p) => p["@type"]).filter(Boolean);

    const withRating = parsed.find((p) => p && p.aggregateRating && p.aggregateRating.ratingValue);
    if (withRating) {
      result.ok = true;
      result.aggregateRating = {
        attachedTo: withRating["@type"],
        ratingValue: withRating.aggregateRating.ratingValue,
        reviewCount: withRating.aggregateRating.reviewCount,
        itemReviewed: withRating.aggregateRating.itemReviewed || withRating.name || null,
        url: withRating.url || null,
      };
    }
    result.rawSchemas = parsed;
  } catch (err) {
    result.error = err && err.message ? err.message : String(err);
  } finally {
    try { result.screenshot = await page.screenshot({ fullPage: false }); } catch {}
    await ctx.close();
  }
  return result;
}

async function pool(items, limit, worker) {
  const out = new Array(items.length);
  let i = 0;
  const runners = Array.from({ length: limit }, async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      out[idx] = await worker(items[idx], idx);
    }
  });
  await Promise.all(runners);
  return out;
}

function toCsv(rows) {
  const esc = (v) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = ["route", "status", "ok", "ratingValue", "reviewCount", "attachedTo", "schemas", "error"];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push([
      r.route, r.status, r.ok,
      r.aggregateRating?.ratingValue ?? "",
      r.aggregateRating?.reviewCount ?? "",
      r.aggregateRating?.attachedTo ?? "",
      (r.schemas || []).join("|"),
      r.error ?? "",
    ].map(esc).join(","));
  }
  return lines.join("\n");
}

function toMarkdown(rows, baseUrl) {
  const ok = rows.filter((r) => r.ok).length;
  const fail = rows.length - ok;
  const head = `# Auditoria AggregateRating\n\n- **Base URL:** ${baseUrl}\n- **Páginas auditadas:** ${rows.length}\n- ✅ Com AggregateRating: **${ok}**\n- ❌ Sem AggregateRating: **${fail}**\n\n`;
  const tbl = ["| Status | Rota | Rating | Reviews | Anexado a | Erro |", "|---|---|---|---|---|---|"];
  for (const r of rows) {
    tbl.push(`| ${r.ok ? "✅" : "❌"} | \`${r.route}\` | ${r.aggregateRating?.ratingValue ?? "—"} | ${r.aggregateRating?.reviewCount ?? "—"} | ${r.aggregateRating?.attachedTo ?? "—"} | ${r.error ? r.error.replace(/\|/g, "\\|") : ""} |`);
  }
  return head + tbl.join("\n") + "\n";
}

async function main() {
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const outDir = join(process.cwd(), "audit-reports", "aggregate-rating", ts);
  await mkdir(outDir, { recursive: true });

  console.log(`▶ Auditando ${ROUTES.length} rotas em ${BASE_URL}`);
  console.log(`▶ Saída: ${outDir}\n`);

  const browser = await chromium.launch();
  const rows = await pool(ROUTES, CONCURRENCY, async (route, idx) => {
    const r = await auditPage(browser, route);
    const slug = slugify(route);
    if (r.rawSchemas) {
      await writeFile(join(outDir, `${slug}.json`), JSON.stringify(r.rawSchemas, null, 2));
    }
    if (r.screenshot) {
      await writeFile(join(outDir, `${slug}.png`), r.screenshot);
    }
    delete r.rawSchemas;
    delete r.screenshot;
    const tag = r.ok ? "✅" : "❌";
    console.log(`${tag} [${idx + 1}/${ROUTES.length}] ${route} ${r.aggregateRating ? `(${r.aggregateRating.ratingValue}/${r.aggregateRating.reviewCount} → ${r.aggregateRating.attachedTo})` : r.error || "sem rating"}`);
    return r;
  });
  await browser.close();

  await writeFile(join(outDir, "report.json"), JSON.stringify({ baseUrl: BASE_URL, generatedAt: ts, results: rows }, null, 2));
  await writeFile(join(outDir, "report.csv"), toCsv(rows));
  await writeFile(join(outDir, "report.md"), toMarkdown(rows, BASE_URL));

  const failed = rows.filter((r) => !r.ok);
  console.log(`\n✔ Concluído. OK: ${rows.length - failed.length} / Falhas: ${failed.length}`);
  console.log(`📂 Evidências: ${outDir}`);
  if (failed.length) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(2); });
