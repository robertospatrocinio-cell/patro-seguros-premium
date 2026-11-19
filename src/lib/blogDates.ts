/** Datas civis ISO: UTC evita mudar o dia por causa do fuso do navegador. */
export function safeBlogDate(value: string | undefined, now = new Date()): string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) return "";
  return parsed.getTime() <= now.getTime() ? value : "";
}

/** Não inventa datas: uma data inválida/futura é omitida até ser corrigida. */
export function normalizeBlogDates<T extends { date: string; updatedAt?: string }>(article: T, now = new Date()): T {
  const date = safeBlogDate(article.date, now);
  const revision = safeBlogDate(article.updatedAt, now);
  return { ...article, date, updatedAt: date && revision && revision >= date ? revision : undefined };
}

export function blogLastmod(article: { date: string; updatedAt?: string }, now = new Date()): string {
  const normalized = normalizeBlogDates(article, now);
  return normalized.updatedAt || normalized.date;
}
