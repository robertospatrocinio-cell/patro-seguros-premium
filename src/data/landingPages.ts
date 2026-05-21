export interface LandingPageContent {
  title: string;
  description: string;
  heroImage: string;
  insuranceType: string;
  location?: string;
  faqs?: { question: string; answer: string }[];
}

export const landingPagesData: Record<string, LandingPageContent> = {
  "seguro-auto-guarulhos": {
    title: "Seguro Auto em Guarulhos",
    description: "Proteja seu veículo com as melhores coberturas da região de Guarulhos.",
    heroImage: "/lovable-uploads/65917997-6a1e-450b-857e-324ede83585c.png",
    insuranceType: "auto",
    location: "Guarulhos",
  },
  "seguro-vida-guarulhos": {
    title: "Seguro de Vida em Guarulhos",
    description: "Tranquilidade para você e sua família com planos personalizados.",
    heroImage: "/lovable-uploads/65917997-6a1e-450b-857e-324ede83585c.png",
    insuranceType: "vida",
    location: "Guarulhos",
  },
  // Mais dados podem ser adicionados aqui
};
