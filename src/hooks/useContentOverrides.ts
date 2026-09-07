import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ContentScope = "cidade" | "blog";

export interface ContentOverrideFaq {
  q: string;
  a: string;
}

export interface ContentOverrideRow {
  id: string;
  scope: ContentScope;
  slug: string;
  title: string | null;
  summary: string | null;
  intro: string | null;
  body: string | null;
  faqs: ContentOverrideFaq[];
  published: boolean;
  notes?: string | null;
  updated_at: string;
}

const PUBLIC_COLUMNS = "id, scope, slug, title, summary, intro, body, faqs, published, updated_at";
const ADMIN_COLUMNS = `${PUBLIC_COLUMNS}, notes`;

const normalizeFaqs = (value: unknown): ContentOverrideFaq[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const { q, a } = item as Record<string, unknown>;
      if (typeof q !== "string" || typeof a !== "string") return null;
      const question = q.trim();
      const answer = a.trim();
      if (!question || !answer) return null;
      return { q: question, a: answer };
    })
    .filter((item): item is ContentOverrideFaq => item !== null);
};

const normalizeRow = (row: Record<string, unknown>): ContentOverrideRow => ({
  id: String(row.id),
  scope: row.scope as ContentScope,
  slug: String(row.slug),
  title: (row.title as string | null) ?? null,
  summary: (row.summary as string | null) ?? null,
  intro: (row.intro as string | null) ?? null,
  body: (row.body as string | null) ?? null,
  faqs: normalizeFaqs(row.faqs),
  published: Boolean(row.published),
  notes: (row.notes as string | null) ?? null,
  updated_at: String(row.updated_at ?? ""),
});

/**
 * Overrides publicados de um escopo (cidade|blog), indexados por slug.
 *
 * Os textos estáticos continuam sendo a fonte padrão: o override só
 * substitui os campos preenchidos. Como nenhuma rota nova é criada aqui,
 * o sitemap NÃO precisa ser recalculado a cada publicação de conteúdo.
 */
async function fetchPublishedOverrides(scope: ContentScope) {
  const { data, error } = await supabase
    .from("content_overrides")
    .select(PUBLIC_COLUMNS)
    .eq("scope", scope)
    .eq("published", true);
  if (error) throw error;
  const map: Record<string, ContentOverrideRow> = {};
  for (const row of (data ?? []) as Record<string, unknown>[]) {
    const normalized = normalizeRow(row);
    map[normalized.slug] = normalized;
  }
  return map;
}

export const usePublishedContentOverrides = (scope: ContentScope) =>
  useQuery({
    queryKey: ["content-overrides", "published", scope],
    queryFn: () => fetchPublishedOverrides(scope),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

/** Atalho para uma única página. Retorna `undefined` enquanto carrega. */
export const usePublishedContentOverride = (scope: ContentScope, slug?: string) => {
  const query = usePublishedContentOverrides(scope);
  return slug ? query.data?.[slug] : undefined;
};

/** Listagem completa (rascunhos incluídos) — apenas para o painel admin. */
async function fetchAllOverrides(scope: ContentScope) {
  const { data, error } = await supabase
    .from("content_overrides")
    .select(ADMIN_COLUMNS)
    .eq("scope", scope)
    .order("slug");
  if (error) throw error;
  return ((data ?? []) as Record<string, unknown>[]).map(normalizeRow);
}

export const useAllContentOverrides = (scope: ContentScope) =>
  useQuery({
    queryKey: ["content-overrides", "all", scope],
    queryFn: () => fetchAllOverrides(scope),
    staleTime: 0,
  });

export interface SaveContentOverrideInput {
  scope: ContentScope;
  slug: string;
  title: string | null;
  summary: string | null;
  intro: string | null;
  body: string | null;
  faqs: ContentOverrideFaq[];
  published: boolean;
  notes: string | null;
}

export async function saveContentOverride(input: SaveContentOverrideInput) {
  const { data: userData } = await supabase.auth.getUser();
  const { error } = await supabase.from("content_overrides").upsert(
    {
      ...input,
      faqs: input.faqs,
      updated_by: userData.user?.id ?? null,
    },
    { onConflict: "scope,slug" },
  );
  if (error) throw error;
}

export async function deleteContentOverride(scope: ContentScope, slug: string) {
  const { error } = await supabase
    .from("content_overrides")
    .delete()
    .eq("scope", scope)
    .eq("slug", slug);
  if (error) throw error;
}
