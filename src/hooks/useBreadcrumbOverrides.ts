import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type {
  BreadcrumbOverride,
  BreadcrumbOverrideMap,
} from "@/lib/breadcrumbCategory";

export interface BreadcrumbOverrideRow {
  slug: string;
  category_label: string | null;
  category_href: string | null;
  pillar_label: string | null;
  pillar_href: string | null;
  notes: string | null;
  updated_at: string;
}

const normalizeSlug = (slug: string) => slug.replace(/\/+$/, "") || "/";

/**
 * Interpretação dos campos de override:
 *  - `null`  → mantém o valor default (não sobrescreve).
 *  - `""`    → remove explicitamente aquele nível do breadcrumb.
 *  - texto   → substitui o default por esse valor.
 *
 * Categoria e pilar só ficam ativos quando `label` E `href` estão
 * ambos preenchidos; se qualquer um dos dois for `""`, o nível é
 * removido do breadcrumb (retorna `null`).
 */
export const rowToOverride = (row: BreadcrumbOverrideRow): BreadcrumbOverride => {
  const parse = (
    label: string | null,
    href: string | null,
  ): BreadcrumbOverride["category"] => {
    if (label === null && href === null) return undefined;
    if (label === "" || href === "") return null;
    if (label && href) return { label, href };
    return undefined;
  };
  return {
    category: parse(row.category_label, row.category_href),
    pillar: parse(row.pillar_label, row.pillar_href),
  };
};

async function fetchBreadcrumbOverrides(): Promise<BreadcrumbOverrideMap> {
  const { data, error } = await supabase
    .from("breadcrumb_overrides")
    .select("slug, category_label, category_href, pillar_label, pillar_href, notes, updated_at");
  if (error) throw error;
  const map: BreadcrumbOverrideMap = {};
  for (const row of (data ?? []) as BreadcrumbOverrideRow[]) {
    map[normalizeSlug(row.slug)] = rowToOverride(row);
  }
  return map;
}

/**
 * Carrega overrides de breadcrumbs uma vez por sessão. Os consumidores
 * (BreadcrumbSchema/InsurancePageTemplate) usam o resultado para compor
 * a cadeia final; enquanto o fetch não termina, os defaults estáticos
 * são utilizados — evita layout shift no primeiro paint.
 */
export const useBreadcrumbOverrides = () =>
  useQuery({
    queryKey: ["breadcrumb-overrides"],
    queryFn: fetchBreadcrumbOverrides,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });