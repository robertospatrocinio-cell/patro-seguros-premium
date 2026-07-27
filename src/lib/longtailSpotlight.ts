/**
 * Long-tail spotlight — 4 páginas long-tail que miram top 10 no Google
 * (posições atuais 20–40). Reforçadas por linkagem interna a partir dos hubs
 * e páginas irmãs para acelerar a subida no ranking.
 *
 * Fonte única da verdade: usar este array ao adicionar novos pontos de
 * linkagem contextual — evita divergência entre páginas.
 */
export interface LongtailSpotlightItem {
  /** Título curto usado em cards / listas de "relatedInsurances". */
  title: string;
  /** Título contextual (mais natural para uso em prosa). */
  contextualTitle: string;
  /** Rota canônica. */
  link: string;
  /** Keyword-alvo principal (para tracking / debug). */
  keyword: string;
  /** Descrição curta para cards de hub. */
  description: string;
}

export const LONGTAIL_SPOTLIGHT: LongtailSpotlightItem[] = [
  {
    title: "Comparativo de Planos de Saúde em Guarulhos 2026",
    contextualTitle: "comparativo de planos de saúde em Guarulhos",
    link: "/planos-de-saude-guarulhos-comparativo",
    keyword: "planos de saúde Guarulhos",
    description: "Amil, Bradesco, SulAmérica, Hapvida e Porto — preço, rede local e coberturas lado a lado.",
  },
  {
    title: "Valor do Seguro BYD Dolphin (Preço 2026)",
    contextualTitle: "valor do seguro BYD Dolphin",
    link: "/valor-seguro-byd-dolphin",
    keyword: "valor seguro BYD Dolphin",
    description: "Faixa real (R$ 2.500 a R$ 4.800/ano), cotação em seguradoras que cobrem elétricos.",
  },
  {
    title: "Melhor Seguro para Uber em Guarulhos — Ranking 2026",
    contextualTitle: "melhor seguro para Uber em Guarulhos",
    link: "/melhor-seguro-para-uber-guarulhos",
    keyword: "melhor seguro Uber Guarulhos",
    description: "Ranking Porto, Allianz, HDI e Tokio com cláusula expressa para app.",
  },
  {
    title: "Cotação de Seguro Residencial Online",
    contextualTitle: "cotação de seguro residencial online",
    link: "/cotacao-seguro-residencial-online",
    keyword: "cotação seguro residencial online",
    description: "Comparativo em 8 seguradoras via WhatsApp em 2h, sem visita técnica.",
  },
];