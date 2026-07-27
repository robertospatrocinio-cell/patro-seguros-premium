import type { TrilhaSeoItem } from "@/components/TrilhaSeoRelacionados";

/**
 * Clusters de long-tail — conecta páginas irmãs via âncoras profundas
 * (#preco-heading, #coberturas-heading, #faq-heading, #formulario-heading)
 * para levar o usuário direto à resposta que ele busca, sem obrigá-lo a
 * reler o hero da próxima página.
 *
 * Regra de âncora: só usar IDs que existam em TODAS as long-tails alvo
 * (validados por scripts/validate-jumplinks.mjs).
 */

type LongtailSlug =
  | "/valor-seguro-byd-dolphin"
  | "/melhor-seguro-para-uber-guarulhos"
  | "/cotacao-seguro-residencial-online"
  | "/planos-de-saude-guarulhos-comparativo";

const AUTO_CLUSTER: TrilhaSeoItem[] = [
  {
    title: "Ranking Uber Guarulhos — direto no preço",
    description:
      "Pule para o comparativo de preços por seguradora com cláusula de app.",
    href: "/melhor-seguro-para-uber-guarulhos#preco-heading",
    badge: "Preço",
  },
  {
    title: "BYD Dolphin — coberturas específicas",
    description:
      "Bateria de tração, guincho com prancha e rede autorizada BYD lado a lado.",
    href: "/valor-seguro-byd-dolphin#coberturas-heading",
    badge: "Coberturas",
  },
  {
    title: "Cotação residencial online — dúvidas frequentes",
    description:
      "Veja as respostas mais buscadas antes de pedir sua cotação em 2h.",
    href: "/cotacao-seguro-residencial-online#faq-heading",
    badge: "FAQ",
  },
];

export const LONGTAIL_CLUSTERS: Record<
  LongtailSlug,
  { title: string; subtitle?: string; items: TrilhaSeoItem[] }
> = {
  "/valor-seguro-byd-dolphin": {
    title: "Do preço do Dolphin ao próximo passo",
    subtitle:
      "Continue exatamente onde você parou — cada link abre a próxima página já na seção certa.",
    items: [
      {
        title: "Uber em Guarulhos — quanto sobe com cláusula de app",
        description:
          "Se o Dolphin for usado em app, veja o impacto direto no preço.",
        href: "/melhor-seguro-para-uber-guarulhos#preco-heading",
        badge: "Preço app",
      },
      {
        title: "Residencial online — proteja garagem e Wallbox",
        description:
          "Coberturas essenciais para a carga do elétrico em casa.",
        href: "/cotacao-seguro-residencial-online#coberturas-heading",
        badge: "Coberturas",
      },
      {
        title: "Cotar agora com a Patro",
        description:
          "4 seguradoras que aceitam elétricos — comparativo em até 2h.",
        href: "/valor-seguro-byd-dolphin#formulario-heading",
        badge: "Cotar",
      },
    ],
  },
  "/melhor-seguro-para-uber-guarulhos": {
    title: "Do ranking Uber para a próxima decisão",
    subtitle:
      "Se o carro é elétrico, se o imóvel do motorista precisa de proteção ou se a família precisa de plano — pule direto para a seção certa.",
    items: [
      {
        title: "BYD Dolphin como carro de app — preço real",
        description:
          "Faixa exata para uso em Uber/99 com cláusula expressa.",
        href: "/valor-seguro-byd-dolphin#preco-heading",
        badge: "Preço",
      },
      {
        title: "Residencial online — proteja onde você para o carro",
        description:
          "Cobertura para garagem, portão e equipamentos em 8 seguradoras.",
        href: "/cotacao-seguro-residencial-online#coberturas-heading",
        badge: "Coberturas",
      },
      {
        title: "Plano de saúde para o motorista e família",
        description:
          "Comparativo Amil, Bradesco, SulAmérica e Hapvida com rede em Guarulhos.",
        href: "/planos-de-saude-guarulhos-comparativo#preco-heading",
        badge: "Plano",
      },
    ],
  },
  "/cotacao-seguro-residencial-online": {
    title: "Cotou o residencial? Continue por aqui",
    subtitle:
      "Cada link te leva direto para a resposta — sem repetir o hero da próxima página.",
    items: [
      {
        title: "Uber em Guarulhos — quanto custa o auto do motorista",
        description: "Ranking de preço por seguradora com cláusula de app.",
        href: "/melhor-seguro-para-uber-guarulhos#preco-heading",
        badge: "Preço",
      },
      {
        title: "BYD Dolphin — coberturas para elétricos",
        description: "Bateria, Wallbox e rede autorizada em detalhe.",
        href: "/valor-seguro-byd-dolphin#coberturas-heading",
        badge: "Coberturas",
      },
      {
        title: "Plano de saúde na sua região — comparativo",
        description:
          "Amil, Bradesco, SulAmérica e Hapvida com rede em Guarulhos.",
        href: "/planos-de-saude-guarulhos-comparativo#preco-heading",
        badge: "Saúde",
      },
    ],
  },
  "/planos-de-saude-guarulhos-comparativo": {
    title: "Depois do plano de saúde, complete a proteção",
    subtitle:
      "Links diretos para a seção que responde a próxima pergunta — sem rolar o hero de novo.",
    items: [
      {
        title: "Cotação residencial online — 8 seguradoras em 2h",
        description: "Pule direto para o que a apólice residencial cobre.",
        href: "/cotacao-seguro-residencial-online#coberturas-heading",
        badge: "Residencial",
      },
      {
        title: "Melhor seguro para Uber em Guarulhos",
        description:
          "Se alguém da família dirige app, veja o ranking de preço.",
        href: "/melhor-seguro-para-uber-guarulhos#preco-heading",
        badge: "Preço",
      },
      {
        title: "BYD Dolphin — quanto custa segurar um elétrico",
        description:
          "Faixa real e coberturas específicas para carros elétricos.",
        href: "/valor-seguro-byd-dolphin#preco-heading",
        badge: "Elétrico",
      },
    ],
  },
};

export const getLongtailCluster = (slug: string) =>
  LONGTAIL_CLUSTERS[slug as LongtailSlug];

export { AUTO_CLUSTER };

/* -------------------------------------------------------------------------- */
/* In-section CTAs — botões "próximo passo" ao final de cada seção da página. */
/*                                                                            */
/* Diferente do bloco "Trilha SEO" que aparece só no rodapé, estes CTAs vivem */
/* DENTRO de cada seção (Preço, Coberturas, Cenários, Detalhes, FAQ) e levam  */
/* o leitor direto à seção equivalente/complementar da página irmã do cluster,*/
/* usando deep anchors (#preco-heading, #coberturas-heading, ...).            */
/* -------------------------------------------------------------------------- */

export interface SectionCta {
  label: string;
  href: string;
  description?: string;
}

/** Ids de seção do `InsurancePageTemplate` que suportam CTAs "próximo passo". */
export type CtaSectionId =
  | "preco-heading"
  | "coberturas-heading"
  | "cenarios-heading"
  | "detalhes-heading"
  | "faq-heading";

type SectionCtaMap = Partial<Record<CtaSectionId, SectionCta>>;

const SECTION_CTAS: Record<LongtailSlug, SectionCtaMap> = {
  "/valor-seguro-byd-dolphin": {
    "preco-heading": {
      label: "Ver o impacto se o Dolphin rodar em app",
      description: "Faixa exata para Uber/99 com cláusula expressa.",
      href: "/melhor-seguro-para-uber-guarulhos#preco-heading",
    },
    "coberturas-heading": {
      label: "Comparar coberturas para a garagem e Wallbox",
      description: "Proteção do local onde o Dolphin é carregado.",
      href: "/cotacao-seguro-residencial-online#coberturas-heading",
    },
    "cenarios-heading": {
      label: "Ver casos reais de motoristas de app",
      href: "/melhor-seguro-para-uber-guarulhos#cenarios-heading",
    },
    "detalhes-heading": {
      label: "Cotar agora o seguro do BYD Dolphin",
      description: "4 seguradoras que aceitam elétricos, comparativo em 2h.",
      href: "/valor-seguro-byd-dolphin#formulario-heading",
    },
    "faq-heading": {
      label: "Solicitar cotação personalizada agora",
      href: "/valor-seguro-byd-dolphin#formulario-heading",
    },
  },
  "/melhor-seguro-para-uber-guarulhos": {
    "preco-heading": {
      label: "Ver preço quando o carro é elétrico (BYD Dolphin)",
      description: "Compare o custo do app em carro convencional vs. elétrico.",
      href: "/valor-seguro-byd-dolphin#preco-heading",
    },
    "coberturas-heading": {
      label: "Proteger também a casa do motorista",
      href: "/cotacao-seguro-residencial-online#coberturas-heading",
    },
    "cenarios-heading": {
      label: "Situações reais de sinistro em residencial",
      href: "/cotacao-seguro-residencial-online#cenarios-heading",
    },
    "detalhes-heading": {
      label: "Plano de saúde para o motorista e a família",
      description: "Comparativo Amil, Bradesco, SulAmérica e Hapvida.",
      href: "/planos-de-saude-guarulhos-comparativo#preco-heading",
    },
    "faq-heading": {
      label: "Falar com um especialista Uber agora",
      href: "/melhor-seguro-para-uber-guarulhos#formulario-heading",
    },
  },
  "/cotacao-seguro-residencial-online": {
    "preco-heading": {
      label: "Ver preço para quem dirige Uber/99",
      href: "/melhor-seguro-para-uber-guarulhos#preco-heading",
    },
    "coberturas-heading": {
      label: "Coberturas específicas para elétricos (BYD)",
      description: "Wallbox, bateria e rede autorizada em detalhe.",
      href: "/valor-seguro-byd-dolphin#coberturas-heading",
    },
    "cenarios-heading": {
      label: "Casos reais de motoristas de app",
      href: "/melhor-seguro-para-uber-guarulhos#cenarios-heading",
    },
    "detalhes-heading": {
      label: "Comparar planos de saúde na sua região",
      href: "/planos-de-saude-guarulhos-comparativo#preco-heading",
    },
    "faq-heading": {
      label: "Solicitar cotação residencial em 2h",
      href: "/cotacao-seguro-residencial-online#formulario-heading",
    },
  },
  "/planos-de-saude-guarulhos-comparativo": {
    "preco-heading": {
      label: "Complementar com seguro residencial",
      description: "Proteja onde a família mora — cotação em 2h.",
      href: "/cotacao-seguro-residencial-online#preco-heading",
    },
    "coberturas-heading": {
      label: "Ver coberturas do seguro para Uber/99",
      href: "/melhor-seguro-para-uber-guarulhos#coberturas-heading",
    },
    "cenarios-heading": {
      label: "Se alguém em casa pensa em carro elétrico",
      href: "/valor-seguro-byd-dolphin#cenarios-heading",
    },
    "detalhes-heading": {
      label: "Comparar preço de carro convencional para app",
      href: "/melhor-seguro-para-uber-guarulhos#preco-heading",
    },
    "faq-heading": {
      label: "Falar agora com a Patro sobre planos",
      href: "/planos-de-saude-guarulhos-comparativo#formulario-heading",
    },
  },
};

export const getSectionCtasForSlug = (slug: string): SectionCtaMap | undefined =>
  SECTION_CTAS[slug as LongtailSlug];