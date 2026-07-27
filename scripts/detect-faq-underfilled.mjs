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
 *
 * Saída:
 *   dist/faq-underfilled-report.json (sempre que dist/ existe)
 *
 * Exit code:
 *   0 sempre — não bloqueia build (isso é papel do validador de Rich Results).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadDataModule } from "./load-data-module.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const BACKFILL_FILE = path.join(ROOT, "src/data/blogFaqBackfill.ts");

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const JSON_OUT = args.includes("--json");

// ---------- suggestion generator --------------------------------------------

/**
 * Gera uma Q&A sugerida — determinística por slug para que rodar 2×
 * produza o mesmo output (idempotente). NÃO cita telefone/e-mail para
 * não desviar da fonte única `src/config/empresa.ts`.
 */
function suggestFaq({ slug, title, category }) {
  const topic = (category || "seguro").toLowerCase();
  const cleanTitle = String(title).replace(/\s*\|\s*.*$/, "").trim();
  // Pergunta contextual + resposta orientando à ação — sem número.
  return {
    q: `Como solicitar uma cotação de ${topic} em Guarulhos citada neste artigo?`,
    a: `Fale com a equipe da Patro Seguros pela página /contato ou pelo botão flutuante de WhatsApp. Envie o link deste artigo ("${cleanTitle}") junto com o CEP e o perfil desejado — a cotação personalizada com as principais seguradoras é enviada em até 2 horas úteis.`,
  };
}

// ---------- core ------------------------------------------------------------

function dedupe(faqs) {
  const seen = new Set();
  return faqs.filter((f) => {
    if (!f?.q || !f?.a) return false;
    const k = String(f.q).trim().toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function countFaqs(slug, contentIndex, extra, backfill) {
  const article = contentIndex?.[slug];
  const extraBlock = extra?.[slug];
  const all = [
    ...((article?.faqs ?? []).map((f) => ({ q: f.q, a: f.a }))),
    ...((extraBlock?.faqs ?? []).map((f) => ({ q: f.q, a: f.a }))),
    ...((extraBlock?.timeline?.stages ?? [])
      .filter((s) => s.faqQ && s.faqA)
      .map((s) => ({ q: s.faqQ, a: s.faqA }))),
    ...((extraBlock?.comparison?.rows ?? [])
      .filter((r) => r.faqQ && r.faqA)
      .map((r) => ({ q: r.faqQ, a: r.faqA }))),
    ...((backfill?.[slug] ?? []).map((f) => ({ q: f.q, a: f.a }))),
  ];
  return dedupe(all).length;
}

function serializeBackfill(map) {
  const slugs = Object.keys(map).sort();
  const body = slugs
    .map((slug) => {
      const items = map[slug]
        .map((f) => `    { q: ${JSON.stringify(f.q)}, a: ${JSON.stringify(f.a)} },`)
        .join("\n");
      return `  ${JSON.stringify(slug)}: [\n${items}\n  ],`;
    })
    .join("\n");
  return `/**
 * FAQs de backfill para posts do blog que originalmente têm menos de
 * 2 Q&A — abaixo desse limiar o Google emite \`eligible-warn\` no
 * FAQPage e não renderiza o rich result.
 *
 * Este arquivo é GERADO/ATUALIZADO por \`scripts/detect-faq-underfilled.mjs --apply\`.
 * Edições manuais são preservadas: o script só adiciona chaves faltantes
 * (não sobrescreve slugs já presentes).
 */
export const blogFaqBackfill: Record<string, { q: string; a: string }[]> = {
${body}
};
`;
}

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
  if (total >= 2) continue;
  const meta = metaBySlug.get(slug);
  const suggested = suggestFaq({
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

// Report
if (fs.existsSync(DIST)) {
  fs.writeFileSync(
    path.join(DIST, "faq-underfilled-report.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), total: affected.length, items: affected }, null, 2),
  );
}

if (JSON_OUT) {
  console.log(JSON.stringify(affected, null, 2));
} else {
  console.log(`\n📋 FAQ underfilled — ${affected.length} post(s) com < 2 Q&A`);
  for (const it of affected.slice(0, 40)) {
    console.log(`\n • ${it.slug}  (${it.currentCount} atual, categoria: ${it.category || "—"})`);
    console.log(`   Sugestão Q: ${it.suggested.q}`);
    console.log(`   Sugestão A: ${it.suggested.a.slice(0, 120)}…`);
  }
  if (affected.length > 40) console.log(`\n   … (+${affected.length - 40} omitidos — veja dist/faq-underfilled-report.json)`);
}

// Apply
if (APPLY && affected.length > 0) {
  const merged = { ...blogFaqBackfill };
  let added = 0;
  for (const it of affected) {
    if (merged[it.slug]) continue; // preserva edições manuais
    merged[it.slug] = [it.suggested];
    added++;
  }
  fs.writeFileSync(BACKFILL_FILE, serializeBackfill(merged), "utf-8");
  console.log(`\n✅ Gravado ${added} novo(s) backfill em src/data/blogFaqBackfill.ts`);
  console.log(`   (${Object.keys(merged).length - added} entrada(s) já existente(s) preservada(s))`);
} else if (APPLY) {
  console.log(`\n✅ Nada a gravar — todos os posts têm ≥ 2 Q&A ou já estão no backfill.`);
} else if (affected.length > 0) {
  console.log(`\n💡 Rode com --apply para gravar as sugestões em src/data/blogFaqBackfill.ts`);
}

process.exit(0);