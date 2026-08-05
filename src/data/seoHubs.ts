/**
 * SEO Hubs — clusters temáticos que conectam landing pages comerciais,
 * páginas locais (Guarulhos), artigos do blog e cluster editoriais.
 *
 * Cada hub é resolvido automaticamente pelo pathname atual em
 * `src/lib/seoHubResolver.ts` e renderizado pelo componente
 * `ContextualSeoHub`, que injeta links contextuais em qualquer
 * template que o incluir — sem exigir configuração por página.
 *
 * Como adicionar um hub novo:
 * 1. Escolha um `slug` curto (ex.: "auto", "empresarial").
 * 2. Liste `landingPaths` (rotas que pertencem ao cluster) e
 *    `pathPatterns` (regex para casar variações).
 * 3. Aponte `blogCategory` (mesmo valor do campo `article.category`)
 *    e/ou `blogTags` para puxar artigos relacionados automaticamente.
 * 4. Opcional: `blogClusterSlug` para linkar ao hub editorial em
 *    `/blog/cluster/<slug>`.
 */

export interface SeoHub {
  slug: string;
  name: string;
  eyebrow: string;
  /** H2/subtítulo curto contextual usado pelo ContextualSeoHub. */
  ctaSubtitle: string;
  /** Página pilar (LP nacional) e página local Guarulhos. */
  pillarPath: string;
  localPath?: string;
  /** Rotas que fazem parte deste cluster (exact match, sem barra final). */
  landingPaths: string[];
  /** Regex adicionais para casar variações (bairros, marcas, etc.). */
  pathPatterns?: RegExp[];
  /** Categoria de blog que agrupa artigos deste hub. */
  blogCategory?: string;
  /** Tags de blog (fallback quando categoria não bater). */
  blogTags?: string[];
  /** Slug do cluster editorial em `/blog/cluster/<slug>`. */
  blogClusterSlug?: string;
  /** Cards fixos de LPs vizinhas — priorizados sobre o auto-descoberto. */
  featuredLandingPages?: { title: string; href: string; description: string }[];
}

export const SEO_HUBS: SeoHub[] = [
  {
    slug: "auto",
    name: "Seguro Auto",
    eyebrow: "Cluster · Seguro Auto",
    ctaSubtitle:
      "Guias, comparativos e páginas comerciais conectadas para você comparar coberturas, franquia e preço médio em Guarulhos.",
    pillarPath: "/seguro-auto",
    localPath: "/seguro-auto-guarulhos",
    landingPaths: [
      "/seguro-auto",
      "/seguro-auto-guarulhos",
      "/seguro-auto/comparativo-coberturas",
      "/seguro-auto-marcas",
      "/landing/seguro-auto",
      "/landing/seguro-auto-premium",
      "/seguro-moto",
      "/seguro-moto-guarulhos",
      "/seguro-frota",
      "/seguro-motorista-app",
      "/seguro-motorista-app",
      "/seguro-uber-guarulhos",
      "/seguro-taxi-guarulhos",
      "/seguro-carta-verde",
      "/seguro-bmw",
    ],
    pathPatterns: [/^\/seguro-auto\//, /^\/seo-seguro-auto/, /^\/seguros-guarulhos\//],
    blogCategory: "Seguro Auto",
    blogTags: ["guarulhos", "seguro auto"],
    blogClusterSlug: "seguro-auto",
    featuredLandingPages: [
      {
        title: "Seguro Auto em Guarulhos",
        href: "/seguro-auto-guarulhos",
        description: "Cotação local com 16+ seguradoras e análise por CEP.",
      },
      {
        title: "Comparativo de coberturas",
        href: "/seguro-auto/comparativo-coberturas",
        description: "Compreensiva x terceiros: escolha a melhor franquia.",
      },
      {
        title: "Seguro para motorista de app",
        href: "/seguro-motorista-app",
        description: "Cobertura APP para Uber/99 operando em Cumbica.",
      },
    ],
  },
  {
    slug: "residencial",
    name: "Seguro Residencial",
    eyebrow: "Cluster · Residencial & Condomínio",
    ctaSubtitle:
      "Proteção para casa, apartamento e condomínio em Guarulhos, com trilhas de conteúdo por bairro.",
    pillarPath: "/seguro-residencial",
    localPath: "/seo-seguro-residencial-guarulhos",
    landingPaths: [
      "/seguro-residencial",
      "/landing/seguro-residencial",
      "/seo-seguro-residencial-guarulhos",
      "/seguro-condominio",
      "/seguro-condominio-residencial",
      "/seguro-condominio-empresarial",
      "/seo-seguro-condominio-guarulhos",
      "/seguro-fianca",
      "/seguro-fianca-guarulhos",
      "/seguro-fianca-locaticia",
      "/seguro-imobiliario",
    ],
    blogCategory: "Seguro Residencial",
    blogTags: ["residencial", "condomínio", "guarulhos"],
  },
  {
    slug: "empresarial",
    name: "Seguro Empresarial & PME",
    eyebrow: "Cluster · Empresarial",
    ctaSubtitle:
      "PME, galpões, cyber e RC profissional: rotas comerciais e conteúdos técnicos para decisão B2B.",
    pillarPath: "/seguro-empresarial",
    localPath: "/seo-seguro-empresarial-guarulhos",
    landingPaths: [
      "/seguro-empresarial",
      "/seguro-empresarial-segmento",
      "/landing/seguro-empresarial",
      "/seo-seguro-empresarial-guarulhos",
      "/seo-seguro-empresa-guarulhos",
      "/seo-seguros-pme-guarulhos",
      "/seguro-cyber",
      "/seguro-lojas-shopping",
      "/seguro-restaurante",
      "/lp/maquinas-equipamentos",
      "/lp/transportes-360",
      "/lp/responsabilidade-administradores-profissionais",
      "/lp/seguro-cibernetico-empresas",
      "/lp/seguro-locadoras-equipamentos",
      "/hub-empresarial",
      "/solucoes-empresariais",
    ],
    pathPatterns: [/^\/lp\//, /^\/seo-seguros?-pme/, /^\/nicho-/],
    blogCategory: "Empresarial",
    blogTags: ["empresarial", "pme", "guarulhos"],
    blogClusterSlug: "seguro-empresarial",
  },
  {
    slug: "patrimonio",
    name: "Galpões & Patrimônio",
    eyebrow: "Cluster · Patrimônio & Logística",
    ctaSubtitle:
      "Galpões, armazenagem e transporte de carga com foco em Guarulhos/Cumbica.",
    pillarPath: "/seguro-galpao",
    localPath: "/seguro-galpao-cumbica",
    landingPaths: [
      "/seguro-galpao",
      "/seguro-galpao-cumbica",
      "/seguro-galpoes-industriais",
      "/landing/seguro-galpoes",
      "/landing/seguro-galpao-alugado",
      "/lp/seguro-galpoes-centros-distribuicao",
      "/seguro-armazenagem",
      "/seguro-transporte",
      "/seguro-transporte-agro",
      "/seo-seguro-transporte-carga-guarulhos",
      "/seguro-frota",
      "/hub-patrimonio",
    ],
    blogCategory: "Patrimonial",
    blogTags: ["galpão", "logística", "cumbica", "transporte"],
  },
  {
    slug: "vida-saude",
    name: "Vida & Saúde",
    eyebrow: "Cluster · Vida, Saúde e Previdência",
    ctaSubtitle:
      "Seguro de vida, planos de saúde e previdência com curadoria para famílias e PME em Guarulhos.",
    pillarPath: "/seguro-vida",
    localPath: "/seo-seguro-vida-guarulhos",
    landingPaths: [
      "/seguro-vida",
      "/seguro-vida-pme",
      "/landing/seguro-vida",
      "/seo-seguro-vida-guarulhos",
      "/seo-seguro-vida-saude-guarulhos",
      "/seguro-saude",
      "/planos-de-saude",
      "/plano-saude-empresarial",
      "/plano-saude-empresarial-guarulhos",
      "/planos-saude-senior-guarulhos",
      "/seo-plano-saude-guarulhos",
      "/comparativo-planos-saude",
      "/previdencia-privada",
      "/seguro-acidentes-pessoais",
      "/landing/seguro-acidentes-pessoais",
      "/hub-vida-saude",
    ],
    blogCategory: "Seguro Vida",
    blogTags: ["vida", "saúde", "família"],
  },
  {
    slug: "rc",
    name: "Responsabilidade Civil",
    eyebrow: "Cluster · RC Profissional",
    ctaSubtitle:
      "RC para médicos, advogados, engenheiros e prestadores de serviço — proteção contra erros e reclamações.",
    pillarPath: "/seguro-rc",
    landingPaths: [
      "/seguro-rc",
      "/seguro-rc-profissional",
      "/seguro-rc-medicos",
      "/seguro-rc-advogados",
      "/seguro-rc-engenheiros",
      "/seguro-rc-dentistas",
      "/seguro-rc-veterinarios",
      "/seguro-rc-executivos",
      "/seguro-rc-eventos",
      "/seguro-rc-obras",
      "/seguro-rc-prestacao-servicos",
      "/hub-rc",
    ],
    blogTags: ["responsabilidade civil", "rc profissional"],
  },
  {
    slug: "agro",
    name: "Seguro Agro",
    eyebrow: "Cluster · Agro & Rural",
    ctaSubtitle:
      "Máquinas, colheita, propriedade rural e transporte agro com atendimento nacional.",
    pillarPath: "/seguro-agro",
    landingPaths: [
      "/seguro-agro",
      "/seguro-rural",
      "/seguro-propriedade-rural",
      "/seguro-pecuario",
      "/seguro-granja",
      "/seguro-cafe",
      "/seguro-geada",
      "/seguro-maquinas-agricolas",
      "/seguro-trator-agricola",
      "/seguro-colhedora-cana",
      "/seguro-colhedora-algodao",
      "/seguro-colheitadeira-graos",
      "/seguro-drone-agricola",
      "/seguro-pulverizador-agricola",
      "/seguro-silo-agricola",
      "/seguro-equipamentos-agricolas",
      "/seguro-transporte-agro",
    ],
    blogCategory: "Agro",
    blogTags: ["agro", "rural", "agronegócio"],
  },
];

export const SEO_HUBS_BY_SLUG: Record<string, SeoHub> = Object.fromEntries(
  SEO_HUBS.map((h) => [h.slug, h]),
);