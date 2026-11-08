import { EMPRESA } from "@/config/empresa";

/**
 * Prova social oficial da Patro Seguros.
 *
 * REGRA (auditoria de credibilidade): não existe integração automática com a
 * API do Google Business, portanto a QUANTIDADE de avaliações não é exibida em
 * nenhum ponto do site nem em JSON-LD. Somente a nota consolidada é publicada,
 * sempre acompanhada de link para o perfil oficial, onde o número real pode ser
 * conferido pelo usuário.
 */
export const PATRO_SOCIAL_PROOF = {
  googleRating: EMPRESA.metricas.googleRating,
  bestRating: "5",
  worstRating: "1",
  /** Rótulo padrão para blocos de avaliação (sem contagem). */
  reviewsCtaLabel: "Confira nossas avaliações no Google",
  // Sem link direto de avaliação validado: usar o perfil cadastrado, não inferir um Place ID.
  leaveReviewUrl: EMPRESA.redesSociais.google,
  googleProfileUrl: EMPRESA.redesSociais.google,
  whatsappUrl: `https://wa.me/${EMPRESA.whatsapp.replace(/\D/g, "")}`, 
  reviewsPageUrl: "/avaliacoes",
  trustCopy: `Mais de ${EMPRESA.metricas.clientesAtendidos} clientes atendidos e sócios com mais de ${EMPRESA.metricas.experienciaAnos} anos de experiência. Nossa nota ${EMPRESA.metricas.googleRating} no Google reflete o compromisso com a agilidade no sinistro.`,
  stats: {
    experience: EMPRESA.metricas.experienciaAnos,
    clients: EMPRESA.metricas.clientesAtendidos,
    partners: EMPRESA.metricas.seguradorasParceiras,
  }
};
