/**
 * Resolve o SeoHub relevante para uma rota e monta os itens
 * contextuais (LPs vizinhas + artigos do blog + cluster editorial)
 * consumidos pelo componente `ContextualSeoHub`.
 */

import { SEO_HUBS, type SeoHub } from "@/data/seoHubs";
import { articles as ALL_ARTICLES, type BlogArticleMeta } from "@/lib/blogData";
import { landingPagesData } from "@/data/landingPages";
import type { TrilhaSeoItem } from "@/components/TrilhaSeoRelacionados";

const normalize = (path: string) =>
  (path.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/").toLowerCase();

export function resolveHubForPath(pathname: string): SeoHub | null {
  const p = normalize(pathname);
  // exact match first
  for (const hub of SEO_HUBS) {
    if (hub.landingPaths.some((lp) => normalize(lp) === p)) return hub;
  }
  // pattern match
  for (const hub of SEO_HUBS) {
    if (hub.pathPatterns?.some((rx) => rx.test(p))) return hub;
  }
  // blog article: match hub by category
  const blogMatch = p.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const art = ALL_ARTICLES.find((a) => a.slug === blogMatch[1]);
    if (art) {
      const byCategory = SEO_HUBS.find(
        (h) => h.blogCategory && h.blogCategory.toLowerCase() === art.category.toLowerCase(),
      );
      if (byCategory) return byCategory;
      const byTag = SEO_HUBS.find((h) =>
        h.blogTags?.some((t) =>
          art.tags?.map((x) => x.toLowerCase()).includes(t.toLowerCase()),
        ),
      );
      if (byTag) return byTag;
    }
  }
  return null;
}

function relatedArticlesForHub(hub: SeoHub, limit = 3): BlogArticleMeta[] {
  const wantCat = hub.blogCategory?.toLowerCase();
  const wantTags = hub.blogTags?.map((t) => t.toLowerCase()) ?? [];
  const scored = ALL_ARTICLES.map((a) => {
    let score = 0;
    if (wantCat && a.category.toLowerCase() === wantCat) score += 10;
    const tags = a.tags?.map((x) => x.toLowerCase()) ?? [];
    score += tags.filter((t) => wantTags.includes(t)).length * 2;
    return { a, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.a.date.localeCompare(a.a.date));
  return scored.slice(0, limit).map((x) => x.a);
}

function landingTitle(path: string): string | null {
  const key = path.replace(/^\//, "");
  const lp = landingPagesData[key];
  return lp?.title ?? null;
}

/**
 * Monta até `limit` cards contextuais para a rota atual:
 * mistura LPs vizinhas do hub + artigos recentes + hub editorial.
 */
export function buildHubContextualItems(
  hub: SeoHub,
  currentPath: string,
  limit = 6,
): TrilhaSeoItem[] {
  const current = normalize(currentPath);
  const items: TrilhaSeoItem[] = [];
  const seen = new Set<string>([current]);

  const push = (item: TrilhaSeoItem) => {
    const href = normalize(item.href);
    if (seen.has(href)) return;
    seen.add(href);
    items.push(item);
  };

  // 1. Featured LPs (curadas)
  hub.featuredLandingPages?.forEach((f) =>
    push({ title: f.title, description: f.description, href: f.href, badge: "Página comercial" }),
  );

  // 2. Página pilar + local
  if (hub.pillarPath) {
    push({
      title: hub.name,
      description: `Página pilar de ${hub.name.toLowerCase()} com todas as coberturas.`,
      href: hub.pillarPath,
      badge: "Pilar",
    });
  }
  if (hub.localPath && hub.localPath !== hub.pillarPath) {
    push({
      title: `${hub.name} em Guarulhos`,
      description: `Atendimento local, cotação e comparativo por bairro em Guarulhos.`,
      href: hub.localPath,
      badge: "Local · Guarulhos",
    });
  }

  // 3. Demais LPs do hub — auto-descoberto
  hub.landingPaths.forEach((lp) => {
    if (items.length >= limit + 3) return;
    const title = landingTitle(lp);
    if (!title) return;
    push({
      title,
      description: `Consultoria especializada e cotação com 16+ seguradoras.`,
      href: lp,
      badge: "Landing page",
    });
  });

  // 4. Artigos relacionados do blog
  relatedArticlesForHub(hub, 3).forEach((a) => {
    push({
      title: a.title,
      description: a.excerpt,
      href: `/blog/${a.slug}`,
      badge: "Blog",
    });
  });

  // 5. Cluster editorial
  if (hub.blogClusterSlug) {
    push({
      title: `Hub editorial: ${hub.name}`,
      description: `Guias e comparativos de ${hub.name.toLowerCase()} em Guarulhos.`,
      href: `/blog/cluster/${hub.blogClusterSlug}`,
      badge: "Cluster",
    });
  }

  return items.slice(0, limit);
}