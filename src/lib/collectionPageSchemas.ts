/**
 * Central builders for every CollectionPage JSON-LD emitted by the site.
 *
 * Extracted from the individual pages so both runtime rendering AND the
 * automated Rich Results validator (see `src/test/collection-pages.test.ts`
 * and `scripts/lib/hubs-collectionpage.test.mjs`) share the exact same
 * object shape. Any regression that would break Google's `CollectionPage`
 * rich result is caught by the unit tests below.
 */
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { PARTNER_INSURERS } from "@/data/partnerInsurers";
import { SEGURADORAS_PARCEIRAS } from "@/data/seguradorasParceirasSeo";

export interface CollectionPageArticleLike {
  slug: string;
  title: string;
}

export interface CollectionPageBlogClusterConfig {
  slug: string;
  title: string;
  metaDescription: string;
}

// ---------- /seguradoras ----------
export function buildSeguradorasHubCollectionSchema() {
  const canonical = `${CANONICAL_BASE_URL}/seguradoras`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Seguradoras parceiras em Guarulhos — Patro Seguros",
    url: canonical,
    description:
      "Hub de comparação de seguradoras parceiras da Patro Seguros para clientes de Guarulhos e região.",
    isPartOf: { "@type": "WebSite", name: "Patro Seguros", url: CANONICAL_BASE_URL },
    hasPart: PARTNER_INSURERS.map((i) => ({
      "@type": "WebPage",
      name: `${i.name} em Guarulhos`,
      url: `${CANONICAL_BASE_URL}/seguradoras/${i.slug}`,
    })),
    mainEntity: {
      "@type": "ItemList",
      "@id": `${canonical}#itemlist`,
      name: "Seguradoras parceiras da Patro Seguros em Guarulhos",
      numberOfItems: PARTNER_INSURERS.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: PARTNER_INSURERS.map((i, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${CANONICAL_BASE_URL}/seguradoras/${i.slug}`,
        name: `${i.name} em Guarulhos`,
      })),
    },
  };
}

// ---------- /seguradoras-parceiras ----------
export function buildSeguradorasParceirasHubCollectionSchema() {
  const canonical = `${CANONICAL_BASE_URL}/seguradoras-parceiras`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Seguradoras Parceiras em Guarulhos | Patro Seguros",
    url: canonical,
    description:
      "Página central das seguradoras parceiras da Patro Seguros em Guarulhos e região.",
    isPartOf: { "@type": "WebSite", name: "Patro Seguros", url: CANONICAL_BASE_URL },
    hasPart: SEGURADORAS_PARCEIRAS.map((s) => ({
      "@type": "WebPage",
      name: `${s.name} em Guarulhos`,
      url: `${CANONICAL_BASE_URL}/${s.slug}`,
    })),
    mainEntity: {
      "@type": "ItemList",
      "@id": `${canonical}#itemlist`,
      name: "Seguradoras parceiras da Patro Seguros",
      numberOfItems: SEGURADORAS_PARCEIRAS.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: SEGURADORAS_PARCEIRAS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${CANONICAL_BASE_URL}/${s.slug}`,
        name: `${s.name} em Guarulhos`,
      })),
    },
  };
}

// ---------- /solucoes-empresariais ----------
export interface SolucaoEmpresarialLike {
  href: string;
  title: string;
}
export function buildSolucoesEmpresariaisCollectionSchema(
  solutions: SolucaoEmpresarialLike[],
) {
  const canonical = `${CANONICAL_BASE_URL}/solucoes-empresariais`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Soluções empresariais Patro Seguros",
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "Patro Seguros", url: CANONICAL_BASE_URL },
    hasPart: solutions.map((s) => ({
      "@type": "WebPage",
      name: s.title,
      url: `${CANONICAL_BASE_URL}${s.href}`,
    })),
    mainEntity: {
      "@type": "ItemList",
      "@id": `${canonical}#itemlist`,
      name: "Soluções empresariais Patro Seguros",
      numberOfItems: solutions.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: solutions.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${CANONICAL_BASE_URL}${s.href}`,
        name: s.title,
      })),
    },
  };
}

// ---------- /blog ----------
export function buildBlogCollectionSchema(
  articlesSorted: CollectionPageArticleLike[],
  description: string,
) {
  const items = articlesSorted.slice(0, 20).map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${CANONICAL_BASE_URL}/artigos/${a.slug}`,
    name: a.title,
  }));
  const canonical = `${CANONICAL_BASE_URL}/blog`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#collection`,
    name: "Blog Patro Seguros",
    description,
    url: canonical,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${CANONICAL_BASE_URL}/#website` },
    about: [
      { "@type": "Thing", name: "Seguro Auto" },
      { "@type": "Thing", name: "Seguro Empresarial" },
      { "@type": "Thing", name: "Plano de Saúde" },
      { "@type": "Thing", name: "Consórcio" },
      { "@type": "Place", name: "Guarulhos, SP" },
    ],
    publisher: { "@id": `${CANONICAL_BASE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      "@id": `${canonical}#itemlist`,
      name: "Artigos recentes — Blog Patro Seguros",
      numberOfItems: items.length,
      itemListElement: items,
    },
  };
}

// ---------- /blog/cluster/:cluster ----------
export function buildBlogClusterCollectionSchema(
  config: CollectionPageBlogClusterConfig,
  articles: CollectionPageArticleLike[],
) {
  const clusterUrl = `${CANONICAL_BASE_URL}/blog/cluster/${config.slug}`;
  const items = articles.slice(0, 20).map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${CANONICAL_BASE_URL}/artigos/${a.slug}`,
    name: a.title,
  }));
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${clusterUrl}#collection`,
    name: config.title,
    description: config.metaDescription,
    url: clusterUrl,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${CANONICAL_BASE_URL}/#website` },
    about: [
      { "@type": "Thing", name: config.title },
      { "@type": "Place", name: "Guarulhos, SP" },
    ],
    publisher: { "@id": `${CANONICAL_BASE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      "@id": `${clusterUrl}#itemlist`,
      name: `Artigos — ${config.title}`,
      numberOfItems: items.length,
      itemListElement: items,
    },
  };
}