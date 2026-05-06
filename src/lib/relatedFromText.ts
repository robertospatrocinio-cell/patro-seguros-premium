import { CONTEXTUAL_KEYWORDS, type KeywordLink } from "@/lib/contextualKeywords";

export interface RelatedLink {
  href: string;
  label: string;
}

/**
 * Picks the most relevant internal pages for a given block of text by counting
 * how many times each keyword from CONTEXTUAL_KEYWORDS appears, then mapping
 * the winners to their canonical destination.
 *
 * - Excludes the current page (no self-links)
 * - Excludes any href listed in `excludeHrefs`
 * - Returns at most `limit` distinct destinations (default 3)
 * - Falls back to popular core products when there are not enough matches
 */
const FALLBACK: KeywordLink[] = [
  { keyword: "seguro auto", href: "/seguro-auto", title: "Seguro Auto" },
  { keyword: "seguro de vida", href: "/seguro-vida", title: "Seguro de Vida" },
  { keyword: "plano de saúde", href: "/planos-de-saude", title: "Planos de Saúde" },
  { keyword: "seguro residencial", href: "/seguro-residencial", title: "Seguro Residencial" },
  { keyword: "seguro empresarial", href: "/seguro-empresarial", title: "Seguro Empresarial" },
];

export function getRelatedLinks(
  text: string,
  options: { currentPath?: string; excludeHrefs?: string[]; limit?: number } = {},
): RelatedLink[] {
  const { currentPath, excludeHrefs = [], limit = 3 } = options;
  const blocked = new Set([...(currentPath ? [currentPath] : []), ...excludeHrefs]);
  const lower = text.toLowerCase();

  // Score destinations by total keyword hits, keeping the longest matching
  // keyword's label as the display label.
  const scores = new Map<string, { score: number; label: string }>();
  for (const k of CONTEXTUAL_KEYWORDS) {
    if (blocked.has(k.href)) continue;
    const re = new RegExp(`\\b${k.keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
    const hits = (lower.match(re) || []).length;
    if (!hits) continue;
    const prev = scores.get(k.href);
    const label = k.title ?? k.keyword;
    if (!prev || hits > prev.score) {
      scores.set(k.href, { score: (prev?.score ?? 0) + hits, label });
    } else {
      scores.set(k.href, { score: prev.score + hits, label: prev.label });
    }
  }

  const ranked = [...scores.entries()]
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, limit)
    .map(([href, { label }]) => ({ href, label }));

  if (ranked.length >= limit) return ranked;

  // Top up with fallback core products (skipping anything blocked / already chosen).
  const chosen = new Set(ranked.map((r) => r.href));
  for (const f of FALLBACK) {
    if (ranked.length >= limit) break;
    if (blocked.has(f.href) || chosen.has(f.href)) continue;
    ranked.push({ href: f.href, label: f.title ?? f.keyword });
    chosen.add(f.href);
  }
  return ranked;
}
