/**
 * Resolve the parent breadcrumb category for an insurance product route.
 *
 * Uses the same taxonomy as the internal-link hub (INSURANCE_HUB) so the
 * breadcrumb hierarchy in Google's SERPs mirrors the site's IA.
 *
 * Returns null when the route does not belong to any known hub category — in
 * that case the breadcrumb falls back to "Início › <página>".
 */

import { INSURANCE_HUB } from "@/lib/insuranceHubLinks";

export interface BreadcrumbCategory {
  label: string;
  href: string;
}

// Categories that should NOT appear as a breadcrumb intermediate (already a hub).
const SKIP_CATEGORY_TITLES = new Set<string>(["Seguros em Guarulhos"]);

// Where each category points to in the breadcrumb. We anchor on the central
// Guarulhos hub which lists every product organized by section.
const CATEGORY_HREF = "/seguros-em-guarulhos";

// Overrides for long-tail / SEO pages that are not part of INSURANCE_HUB but
// belong logically to a category. Keeps breadcrumb hierarchy consistent for
// Google rich results and on-page navigation.
const ROUTE_OVERRIDES: Record<string, BreadcrumbCategory> = {
  "/valor-seguro-byd-dolphin": { label: "Seguro Auto", href: CATEGORY_HREF },
  "/melhor-seguro-para-uber-guarulhos": { label: "Seguro Auto", href: CATEGORY_HREF },
  "/cotacao-seguro-residencial-online": { label: "Seguro Residencial", href: CATEGORY_HREF },
  "/planos-de-saude-guarulhos-comparativo": { label: "Planos de Saúde", href: CATEGORY_HREF },
};

export const getBreadcrumbCategory = (
  pathname: string,
): BreadcrumbCategory | null => {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (ROUTE_OVERRIDES[normalized]) return ROUTE_OVERRIDES[normalized];
  for (const cat of INSURANCE_HUB) {
    if (SKIP_CATEGORY_TITLES.has(cat.title)) continue;
    const match = cat.links.some((l) => l.href === normalized);
    if (match) {
      return { label: cat.title, href: CATEGORY_HREF };
    }
  }
  return null;
};
