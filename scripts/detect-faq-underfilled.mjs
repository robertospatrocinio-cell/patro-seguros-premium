#!/usr/bin/env node
/**
 * Detecta posts de blog cujo FAQPage tem menos de 2 Q&A e sugere
 * (ou grava) uma segunda pergunta genérica contextualizada pelo
 * título/categoria — zerando os `eligible-warn` do FAQPage no
 * relatório do Google Rich Results.
 *
 * Fluxo:
 *   1. Carrega o índice de blog (`blogContentIndex`), `extraFaqsBySlug`
 *      e o `blogFaqBackfill` atual — dedupe por pergunta (case-insensitive).
 *   2. Para cada slug: se `totalUnique < 2`, marca como underfilled.
 *   3. Gera Q&A sugerida usando o título do post e a categoria (quando
 *      houver). O texto NÃO cita telefone (a fonte da verdade
 *      `EMPRESA` fica no runtime), só direciona para cotação/WhatsApp.
 *
 * Uso:
 *   node scripts/detect-faq-underfilled.mjs             # relatório (dry-run)
 *   node scripts/detect-faq-underfilled.mjs --apply     # grava em blogFaqBackfill.ts
 *   node scripts/detect-faq-underfilled.mjs --json      # imprime JSON
 *   node scripts/detect-faq-underfilled.mjs --ci        # exit 1 se houver post < 2 Q&A
 *
 * Saída:
 *   dist/faq-underfilled-report.json (sempre que dist/ existe)
 *
 * Exit code:
 *   0 quando não há posts underfilled (ou em modo dry-run sem --ci).
 *   1 no modo --ci quando existir ao menos 1 post com < 2 Q&A após o merge.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadDataModule } from "./load-data-module.mjs";
import {
  suggestFaqs,
  countFaqs,
  serializeBackfill,
  topUpBackfillForSlug,
} from "./lib/faq-underfilled-helpers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PUBLIC_ADMIN = path.join(ROOT, "public/admin");
const BACKFILL_FILE = path.join(ROOT, "src/data/blogFaqBackfill.ts");

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const JSON_OUT = args.includes("--json");
const CI = args.includes("--ci");
const minFaqsArg = args.find((a) => a.startsWith("--min="))?.split("=")[1];
const MIN_FAQS = minFaqsArg ? parseInt(minFaqsArg, 10) : 2;

// ---------- main ------------------------------------------------------------

const { blogContentIndex } = await loadDataModule("src/data/blogContentIndex.ts");
const { extraFaqsBySlug } = await loadDataModule("src/data/blogExtraData.ts");
const { blogFaqBackfill } = await loadDataModule("src/data/blogFaqBackfill.ts");
const { articles } = await loadDataModule("src/lib/blogData.ts");

const metaBySlug = new Map(articles.map((a) => [a.slug, a]));
const slugs = Object.keys(blogContentIndex);

const affected = [];
for (const slug of slugs) {
  const total = countFaqs(slug, blogContentIndex, extraFaqsBySlug, blogFaqBackfill);
  if (total >= MIN_FAQS) continue;
  const meta = metaBySlug.get(slug);
  const suggested = suggestFaqs({
    slug,
    title: blogContentIndex[slug]?.title ?? meta?.title ?? slug,
    category: meta?.category,
  });
  affected.push({
    slug,
    title: blogContentIndex[slug]?.title ?? meta?.title ?? slug,
    category: meta?.category ?? null,
    currentCount: total,
    suggested,
  });
}

// Report — grava em dist/ (pipeline) e em public/admin/ (consumido pela
// página admin `/admin/faq-underfilled` em runtime).
const report = { generatedAt: new Date().toISOString(), total: affected.length, items: affected };
if (fs.existsSync(DIST)) {
  fs.writeFileSync(path.join(DIST, "faq-underfilled-report.json"), JSON.stringify(report, null, 2));
}
fs.mkdirSync(PUBLIC_ADMIN, { recursive: true });
fs.writeFileSync(path.join(PUBLIC_ADMIN, "faq-underfilled.json"), JSON.stringify(report, null, 2));

if (JSON_OUT) {
  console.log(JSON.stringify(affected, null, 2));
} else {
  console.log(`\n📋 FAQ underfilled — ${affected.length} post(s) com < ${MIN_FAQS} Q&A`);
  for (const it of affected.slice(0, 40)) {
    console.log(`\n • ${it.slug}  (${it.currentCount} atual, categoria: ${it.category || "—"})`);
    for (const s of it.suggested) {
      console.log(`   Sugestão Q: ${s.q}`);
      console.log(`   Sugestão A: ${s.a.slice(0, 120)}…`);
    }
  }
  if (affected.length > 40) console.log(`\n   … (+${affected.length - 40} omitidos — veja dist/faq-underfilled-report.json)`);
}

// Apply
if (APPLY && affected.length > 0) {
  const merged = { ...blogFaqBackfill };
  let added = 0;
  const shortfalls = [];
  for (const it of affected) {
    const existing = merged[it.slug] ?? [];
    const { next, added: n, shortfall } = topUpBackfillForSlug({
      existing,
      suggestions: it.suggested,
      currentCount: it.currentCount,
      target: MIN_FAQS,
    });
    if (n > 0) {
      merged[it.slug] = next;
      added += n;
    }
    if (shortfall > 0) shortfalls.push({ slug: it.slug, shortfall });
  }
  fs.writeFileSync(BACKFILL_FILE, serializeBackfill(merged), "utf-8");
  console.log(`\n✅ Gravado ${added} novo(s) Q&A de backfill em src/data/blogFaqBackfill.ts`);
  if (shortfalls.length > 0) {
    console.error(
      `\n⚠️  ${shortfalls.length} slug(s) não atingiram ${MIN_FAQS} Q&A após o top-up ` +
        `(sugestões colidiram com Q&A existentes). Adicione perguntas manuais para: ` +
        shortfalls.map((s) => s.slug).join(", "),
    );
    if (CI) process.exit(1);
  }
} else if (APPLY) {
  console.log(`\n✅ Nada a gravar — todos os posts têm ≥ ${MIN_FAQS} Q&A ou já estão no backfill.`);
} else if (affected.length > 0) {
  console.log(`\n💡 Rode com --apply para gravar as sugestões em src/data/blogFaqBackfill.ts`);
}

if (CI && affected.length > 0) {
  console.error(
    `\n❌ CI: ${affected.length} post(s) do blog com FAQPage < ${MIN_FAQS} Question após merge do backfill.` +
      `\n   Rode \`node scripts/detect-faq-underfilled.mjs --apply --min=${MIN_FAQS}\` e commite src/data/blogFaqBackfill.ts.`,
  );
  process.exit(1);
}

process.exit(0);