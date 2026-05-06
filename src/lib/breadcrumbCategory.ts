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

export const getBreadcrumbCategory = (
  pathname: string,
): BreadcrumbCategory | null => {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  for (const cat of INSURANCE_HUB) {
    if (SKIP_CATEGORY_TITLES.has(cat.title)) continue;
    const match = cat.links.some((l) => l.href === normalized);
    if (match) {
      return { label: cat.title, href: CATEGORY_HREF };
    }
  }
  return null;
};
