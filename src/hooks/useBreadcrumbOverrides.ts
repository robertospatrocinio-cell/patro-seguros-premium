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

export const rowToOverride = (row: BreadcrumbOverrideRow): BreadcrumbOverride => ({
  category:
    row.category_label && row.category_href
      ? { label: row.category_label, href: row.category_href }
      : row.category_label === "" || row.category_href === ""
        ? null
        : undefined,
  pillar:
    row.pillar_label && row.pillar_href
      ? { label: row.pillar_label, href: row.pillar_href }
      : row.pillar_label === "" || row.pillar_href === ""
        ? null
        : undefined,
});

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