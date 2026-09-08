import PageMeta from "@/components/PageMeta";

/**
 * SeoHead — componente central de SEO por rota.
 *
 * REGRA OBRIGATÓRIA: toda nova rota pública do site deve renderizar
 * exatamente um <SeoHead /> (ou <PageMeta />) com `title` e `description`
 * únicos. As props são `required` no TypeScript de propósito: uma página
 * sem meta tags próprias não compila.
 *
 * O componente gerencia, por rota:
 * - <title> (com sufixo de marca automático e aviso de tamanho em dev)
 * - <meta name="description">
 * - <link rel="canonical"> (auto-referente à rota)
 * - Open Graph (og:title, og:description, og:url, og:type, og:image)
 * - Twitter Cards (twitter:card, twitter:title, twitter:description, twitter:image)
 * - <meta name="robots"> (index,follow por padrão; noindex,follow em
 *   páginas de formulário; noindex,nofollow em hosts de preview)
 * - BreadcrumbList JSON-LD (automático, salvo `skipBreadcrumb`)
 *
 * Para páginas de formulário sem conteúdo único (ex.: /contato, /cotacao),
 * passe `noindex` — os links internos seguem sendo rastreados (follow).
 */
interface SeoHeadProps {
  /** Título único da página (obrigatório). Máx. recomendado: 60 caracteres. */
  title: string;
  /** Descrição única da página (obrigatória). Entre 120 e 160 caracteres. */
  description: string;
  /** Marca a página como noindex,follow (formulários, utilidades). */
  noindex?: boolean;
  /** Não adiciona o sufixo " | Patro Seguros" ao título. */
  absoluteTitle?: boolean;
  /** Tipo Open Graph: "website" (padrão) ou "article" para posts do blog. */
  ogType?: "website" | "article" | "product" | "profile";
  /** URL absoluta da imagem social da página (og:image / twitter:image). */
  ogImage?: string;
  /** Texto alternativo da imagem social. */
  ogImageAlt?: string;
  /** Imagem hero para preload (LCP). */
  preloadImage?: string;
  /** Imagem hero mobile para preload com media query. */
  preloadMobileImage?: string;
  /** Sobrescreve o pathname do canonical (ex.: coleções paginadas). */
  canonicalPath?: string;
  /** Suprime o BreadcrumbList automático quando a página já emite o seu. */
  skipBreadcrumb?: boolean;
}

const SeoHead = (props: SeoHeadProps) => <PageMeta {...props} />;

export default SeoHead;
