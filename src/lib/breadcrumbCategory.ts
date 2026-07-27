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

/**
 * Overrides que vêm do painel `/admin/breadcrumbs`. Injetados em runtime
 * por `useBreadcrumbOverrides` para permitir edição sem redeploy.
 * Chave = pathname normalizado (sem trailing slash).
 */
export interface BreadcrumbOverride {
  category?: BreadcrumbCategory | null;
  pillar?: BreadcrumbCategory | null;
}
export type BreadcrumbOverrideMap = Record<string, BreadcrumbOverride>;

// Categories that should NOT appear as a breadcrumb intermediate (already a hub).
const SKIP_CATEGORY_TITLES = new Set<string>(["Seguros em Guarulhos"]);

// Where each category points to in the breadcrumb. We anchor on the central
// Guarulhos hub which lists every product organized by section.
const CATEGORY_HREF = "/seguros-em-guarulhos";

/**
 * Página-pilar (hub temático) que fica ENTRE a categoria e a long-tail
 * no BreadcrumbList. Reforça, para o Google, que cada long-tail é
 * filha de um cluster com autoridade — em vez de uma folha solta.
 *
 * Ex.: `/valor-seguro-byd-dolphin` deixa de ser
 *   Início › Seguro Auto › Valor do Seguro BYD Dolphin
 * e passa a ser
 *   Início › Seguro Auto › Seguro Auto em Guarulhos › Valor do Seguro BYD Dolphin
 */
const CLUSTER_PILLAR: Record<string, BreadcrumbCategory> = {
  "/valor-seguro-byd-dolphin": {
    label: "Seguro Auto em Guarulhos",
    href: "/seguro-auto-guarulhos",
  },
  "/melhor-seguro-para-uber-guarulhos": {
    label: "Seguro Auto em Guarulhos",
    href: "/seguro-auto-guarulhos",
  },
  "/cotacao-seguro-residencial-online": {
    label: "Seguro Residencial em Guarulhos",
    href: "/seguro-residencial-guarulhos",
  },
  "/planos-de-saude-guarulhos-comparativo": {
    label: "Plano de Saúde em Guarulhos",
    href: "/plano-de-saude-guarulhos",
  },
};

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
  overrides?: BreadcrumbOverrideMap,
): BreadcrumbCategory | null => {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const override = overrides?.[normalized];
  if (override && override.category !== undefined) return override.category;
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

/**
 * Cadeia ordenada de ancestrais para BreadcrumbList (sem incluir a página
 * atual nem o "Início"). Retorna 0..N níveis:
 *   - Categoria (INSURANCE_HUB ou override)
 *   - Pilar do cluster (quando a rota participa de um cluster long-tail)
 *
 * Manter a ordem: categoria genérica primeiro, pilar mais específico
 * em seguida — assim o Google entende a hierarquia do mais amplo ao mais
 * específico e reforça a autoridade do pilar como pai direto da long-tail.
 */
export const getBreadcrumbChain = (
  pathname: string,
  overrides?: BreadcrumbOverrideMap,
): BreadcrumbCategory[] => {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const chain: BreadcrumbCategory[] = [];
  const category = getBreadcrumbCategory(normalized, overrides);
  if (category) chain.push(category);
  const override = overrides?.[normalized];
  const pillar =
    override && override.pillar !== undefined
      ? override.pillar
      : CLUSTER_PILLAR[normalized];
  // Evita duplicar o pilar quando ele coincide com a própria categoria.
  if (pillar && pillar.href !== category?.href) chain.push(pillar);
  return chain;
};

/**
 * Defaults estáticos expostos para o painel admin comparar com overrides.
 */
export const getStaticBreadcrumbDefaults = (
  pathname: string,
): BreadcrumbOverride => {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const category = getBreadcrumbCategory(normalized);
  const pillar = CLUSTER_PILLAR[normalized] ?? null;
  return { category, pillar };
};

/** Slugs conhecidos que participam de um cluster long-tail. */
export const KNOWN_LONGTAIL_SLUGS: string[] = Object.keys(CLUSTER_PILLAR);
