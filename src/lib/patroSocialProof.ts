/**
 * PATRO_SOCIAL_PROOF — Fonte única de verdade para prova social da Patro Seguros.
 *
 * Todo componente que exibe nota Google, quantidade de avaliações, link para
 * avaliar ou perfil Google DEVE importar deste arquivo. Não hardcode números
 * em componentes soltos — atualize aqui para propagar em todo o site.
 *
 * Também é a fonte usada pelo AggregateRatingSchema (JSON-LD) e por qualquer
 * script de auditoria de rich snippets.
 */

export const PATRO_SOCIAL_PROOF = {
  /** Nota Google atual — string para preservar formato "4.7" no JSON-LD. */
  googleRating: "4.7",
  /** Nº de avaliações públicas no Google no momento da última atualização. */
  googleReviewCount: 27,
  /** Escala do rating (schema.org). */
  bestRating: "5",
  worstRating: "1",

  /** Link para o cliente DEIXAR uma avaliação (Google Business short link). */
  leaveReviewUrl: "https://g.page/r/CeVu6_U5BM0DEBE/review",
  /** Perfil público do Google Business (mostra reviews existentes). */
  googleProfileUrl: "https://www.google.com/maps/place/Patro+Seguros/",

  /** WhatsApp comercial padrão (com mensagem pré-preenchida). */
  whatsappUrl:
    "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20uma%20orienta%C3%A7%C3%A3o.",

  /** Página interna que agrega prova social + depoimentos. */
  reviewsPageUrl: "/avaliacoes-clientes",

  /**
   * Texto curto de confiança — reutilizado no bloco ProvaSocialPatro.
   * Reescreva aqui para propagar em todas as páginas.
   */
  trustCopy:
    "Corretora registrada na SUSEP, com atendimento humano em Guarulhos e avaliações reais de clientes no Google. Compare opções entre várias seguradoras e conte com orientação antes, durante e depois da contratação.",
} as const;

/** Última atualização manual dos números — atualize ao editar rating/count. */
export const PATRO_SOCIAL_PROOF_UPDATED_AT = "2026-07-06";

export type PatroSocialProof = typeof PATRO_SOCIAL_PROOF;