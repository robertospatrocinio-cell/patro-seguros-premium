import { empresa } from "@/config/empresa";

export const PATRO_SOCIAL_PROOF = {
  googleRating: empresa.metricas.googleRating,
  googleReviewCount: empresa.metricas.googleReviews,
  leaveReviewUrl: "https://g.page/r/CUx5x1P3uW1cEAg/review",
  googleProfileUrl: empresa.redesSociais.google,
  whatsappUrl: "https://wa.me/551151997500",
  reviewsPageUrl: "/avaliacoes",
  trustCopy: `Mais de ${empresa.metricas.clientesAtendidos} clientes atendidos e ${empresa.metricas.experienciaAnos} anos de mercado. Nossa nota 4.9 no Google reflete o compromisso com a agilidade no sinistro.`,
  stats: {
    experience: empresa.metricas.experienciaAnos,
    clients: empresa.metricas.clientesAtendidos,
    claimsPaid: empresa.metricas.sinistrosPagos,
    partners: empresa.metricas.seguradorasParceiras,
  }
};
