import { EMPRESA } from "@/config/empresa";

export const PATRO_SOCIAL_PROOF = {
  googleRating: EMPRESA.metricas.googleRating,
  googleReviewCount: EMPRESA.metricas.googleReviews,
  bestRating: "5",
  worstRating: "1",
  leaveReviewUrl: "https://g.page/r/CUx5x1P3uW1cEAg/review",
  googleProfileUrl: EMPRESA.redesSociais.google,
  whatsappUrl: "https://wa.me/551151997500",
  reviewsPageUrl: "/avaliacoes",
  trustCopy: `Mais de ${EMPRESA.metricas.clientesAtendidos} clientes atendidos e sócios com mais de ${EMPRESA.metricas.experienciaAnos} anos de experiência. Nossa nota 4.9 no Google reflete o compromisso com a agilidade no sinistro com base em ${EMPRESA.metricas.googleReviews} avaliações reais.`,
  stats: {
    experience: EMPRESA.metricas.experienciaAnos,
    clients: EMPRESA.metricas.clientesAtendidos,
    claimsPaid: EMPRESA.metricas.sinistrosPagos,
    partners: EMPRESA.metricas.seguradorasParceiras,
  }
};
