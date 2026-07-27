/**
 * Sanitização e validação de itens de BreadcrumbList JSON-LD.
 *
 * Regras aplicadas (chamadas em runtime por `BreadcrumbSchema`, e
 * também exercidas isoladamente por `breadcrumbValidation.test.ts`):
 *
 *  1. Deduplicação por href absoluto — se dois itens resolvem para
 *     a mesma URL, mantém o primeiro (preserva a ordem hierárquica).
 *  2. Rejeição de URLs inválidas — qualquer item cujo href não seja
 *     um `http(s)` absoluto válido é descartado. Evita que "javascript:",
 *     "mailto:", "#foo" ou strings vazias entrem no rich result.
 *  3. Rejeição de itens sem `name` (após trim).
 */

export interface RawBreadcrumbItem {
  name: string;
  /** URL absoluta (http/https) já resolvida pelo caller. */
  url: string;
}

export interface BreadcrumbValidationIssue {
  reason: "invalid-url" | "duplicate-href" | "empty-name";
  index: number;
  item: RawBreadcrumbItem;
}

export interface BreadcrumbValidationResult {
  items: RawBreadcrumbItem[];
  issues: BreadcrumbValidationIssue[];
}

const isValidAbsoluteHttpUrl = (raw: string): boolean => {
  if (typeof raw !== "string" || raw.trim().length === 0) return false;
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

/**
 * Aplica dedup + validação. NÃO faz normalização de path — o caller
 * (`BreadcrumbSchema.toAbsolute`) já entrega URLs canônicas.
 */
export const sanitizeBreadcrumbItems = (
  input: RawBreadcrumbItem[],
): BreadcrumbValidationResult => {
  const issues: BreadcrumbValidationIssue[] = [];
  const seenHref = new Set<string>();
  const items: RawBreadcrumbItem[] = [];

  input.forEach((item, index) => {
    const name = (item?.name ?? "").trim();
    const url = (item?.url ?? "").trim();

    if (name.length === 0) {
      issues.push({ reason: "empty-name", index, item });
      return;
    }
    if (!isValidAbsoluteHttpUrl(url)) {
      issues.push({ reason: "invalid-url", index, item });
      return;
    }
    if (seenHref.has(url)) {
      issues.push({ reason: "duplicate-href", index, item });
      return;
    }

    seenHref.add(url);
    items.push({ name, url });
  });

  return { items, issues };
};