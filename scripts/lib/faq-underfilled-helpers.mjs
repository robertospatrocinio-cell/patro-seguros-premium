/**
 * Puros helpers usados por `scripts/detect-faq-underfilled.mjs`.
 * Extraídos para permitir testes unitários (idempotência, determinismo,
 * dedupe) sem tocar em I/O nem no filesystem.
 */

/** Normaliza a chave de comparação de perguntas (case + trim). */
export function normalizeQuestion(q) {
  return String(q ?? "").trim().toLowerCase();
}

/** Remove Q&A vazias e duplicadas por pergunta (case-insensitive, mantém 1ª). */
export function dedupe(faqs) {
  const seen = new Set();
  return (faqs ?? []).filter((f) => {
    if (!f?.q || !f?.a) return false;
    const k = normalizeQuestion(f.q);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/**
 * Gera Q&A sugeridas — determinístico por (slug, title, category):
 * mesmas entradas ⇒ mesma saída exata. Retorna 3 candidatas para
 * garantir 2 únicas mesmo quando alguma colide com Q&A existentes
 * (fundamental para posts com 0 Q&A, que precisam alcançar exatamente
 * 2 Question e evitar `eligible-warn`/`ineligible` no FAQPage).
 */
export function suggestFaqs({ title, category }) {
  const topic = (category || "seguro").toLowerCase();
  const cleanTitle = String(title ?? "").replace(/\s*\|\s*.*$/, "").trim();
  return [
    {
      q: `Como solicitar uma cotação de ${topic} em Guarulhos citada neste artigo?`,
      a: `Fale com a equipe da Patro Seguros pela página /contato ou pelo botão flutuante de WhatsApp. Envie o link deste artigo ("${cleanTitle}") junto com o CEP e o perfil desejado — a cotação personalizada com as principais seguradoras é enviada em até 2 horas úteis.`,
    },
    {
      q: `A Patro Seguros atende ${topic} em toda Guarulhos e região metropolitana?`,
      a: `Sim. A Patro Seguros é uma corretora sediada em Guarulhos/SP (Cidade Maia) e atua em toda a região metropolitana e demais cidades do estado, com atendimento nacional para carteiras específicas. O time acompanha desde a cotação até a regulação de sinistros — envie o artigo "${cleanTitle}" pelo WhatsApp para receber a orientação adequada.`,
    },
    {
      q: `Quais documentos são necessários para contratar ${topic} após ler este artigo?`,
      a: `Para avançar com uma proposta de ${topic} após o artigo "${cleanTitle}" a Patro Seguros costuma solicitar: documento com foto do proponente/PJ, CNPJ ou CPF, endereço completo com CEP, dados do bem/atividade a ser segurado e histórico de sinistros (quando existir). Envie os documentos pelo WhatsApp da corretora — a equipe monta a cotação comparativa entre as principais seguradoras parceiras.`,
    },
  ];
}

/** Conta Q&A únicas somando artigo + extras + backfill. */
export function countFaqs(slug, contentIndex, extra, backfill) {
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

/**
 * Faz "top-up" do backfill de um slug: adiciona sugestões distintas até
 * alcançar (currentCount + additions) >= 2. Nunca sobrescreve entradas
 * existentes e nunca duplica perguntas — retorna o novo array.
 */
export function topUpBackfillForSlug({ existing = [], suggestions = [], currentCount = 0, target = 2 }) {
  const needed = Math.max(0, target - currentCount);
  if (needed === 0) return { next: existing.slice(), added: 0, shortfall: 0 };
  const seen = new Set(existing.map((f) => normalizeQuestion(f.q)));
  const additions = [];
  for (const s of suggestions) {
    if (additions.length >= needed) break;
    if (!s?.q || !s?.a) continue;
    const k = normalizeQuestion(s.q);
    if (seen.has(k)) continue;
    additions.push({ q: s.q, a: s.a });
    seen.add(k);
  }
  const shortfall = Math.max(0, needed - additions.length);
  return { next: [...existing, ...additions], added: additions.length, shortfall };
}

/** Serialização determinística do arquivo `blogFaqBackfill.ts`. */
export function serializeBackfill(map) {
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