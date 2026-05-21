export interface LandingPageContent {
  title: string;
  description: string;
  heroImage: string;
  insuranceType: string;
  icon?: string;
  location?: string;
  coverages?: { title: string; description: string }[];
  whoNeeds?: string[];
  whyPatro?: string[];
  faqs?: { question: string; answer: string }[];
}

export const landingPagesData: Record<string, LandingPageContent> = {
  "seguro-auto-guarulhos": {
    title: "Seguro Auto em Guarulhos",
    description: "Proteja seu veículo com as melhores coberturas da região de Guarulhos. Cotação rápida e sem compromisso.",
    heroImage: "/lovable-uploads/65917997-6a1e-450b-857e-324ede83585c.png",
    insuranceType: "auto",
    icon: "🚗",
    location: "Guarulhos",
    coverages: [
      { title: "Colisão e Danos", description: "Cobertura total para acidentes e danos materiais ao seu veículo." },
      { title: "Roubo e Furto", description: "Indenização integral em caso de perda total por roubo ou furto qualificado." },
      { title: "Danos a Terceiros", description: "Proteção contra processos e danos causados a outros veículos ou pedestres." },
    ],
    whoNeeds: [
      "Proprietários de carros novos ou usados",
      "Motoristas de aplicativo em Guarulhos",
      "Empresas com frotas locais"
    ],
    whyPatro: [
      "Atendimento local em Guarulhos",
      "As melhores seguradoras do mercado",
      "Suporte 24h especializado"
    ]
  },
  "seguro-vida-guarulhos": {
    title: "Seguro de Vida em Guarulhos",
    description: "Tranquilidade para você e sua família com planos personalizados e coberturas completas.",
    heroImage: "/lovable-uploads/65917997-6a1e-450b-857e-324ede83585c.png",
    insuranceType: "vida",
    icon: "👨‍👩-👧‍👦",
    location: "Guarulhos",
    coverages: [
      { title: "Morte Natural ou Acidental", description: "Segurança financeira imediata para seus beneficiários." },
      { title: "Invalidez Permanente", description: "Indenização em caso de acidentes que impeçam o trabalho." },
    ]
  }
};
