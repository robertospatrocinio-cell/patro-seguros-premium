/**
 * FAQs de backfill para posts do blog que originalmente têm menos de
 * 2 Q&A — abaixo desse limiar o Google emite `eligible-warn` no
 * FAQPage e não renderiza o rich result.
 *
 * Este arquivo é GERADO/ATUALIZADO por `scripts/detect-faq-underfilled.mjs --apply`.
 * Edições manuais são preservadas: o script só adiciona chaves faltantes
 * (não sobrescreve slugs já presentes).
 *
 * Formato: `{ [slug]: Array<{ q: string; a: string }> }`
 *
 * O merge é feito em `src/pages/BlogArticle.tsx` (client) e
 * `scripts/prerender.mjs` (SSG) — ambos aplicam as mesmas regras
 * de dedupe por pergunta.
 */
export const blogFaqBackfill: Record<string, { q: string; a: string }[]> = {};