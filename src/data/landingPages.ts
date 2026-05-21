export interface LandingPageContent {
  title: string;
  description: string;
  metaDescription?: string;
  heroImage: string;
  insuranceType: string;
  icon?: string;
  location?: string;
  coverages?: { title: string; description: string }[];
  whoNeeds?: string[];
  whyPatro?: string[];
  faqs?: { question: string; answer: string }[];
  detailedDescription?: string;
}

export const landingPagesData: Record<string, LandingPageContent> = {
  "seguro-auto-guarulhos": {
    title: "Seguro Auto em Guarulhos",
    description: "Compare cotações de 16+ seguradoras e economize até 40% no seu seguro auto em Guarulhos.",
    metaDescription: "Procurando seguro auto em Guarulhos? A Patro Seguros compara Porto, Tokio, Allianz e +16 seguradoras. Cotação grátis em 2h. Economize agora!",
    heroImage: "/images/hero-home.webp",
    insuranceType: "auto",
    icon: "🚗",
    location: "Guarulhos",
    detailedDescription: "Guarulhos possui um dos trânsitos mais intensos do Brasil, com as rodovias Dutra e Fernão Dias cruzando a cidade. Isso reflete diretamente no custo do seguro. Nossa consultoria analisa seu perfil e CEP de pernoite para encontrar a seguradora que oferece o melhor preço para a sua região específica, seja no Centro, Vila Augusta ou Pimentas.",
    coverages: [
      { title: "Colisão e Danos", description: "Cobertura total para acidentes e danos materiais ao seu veículo." },
      { title: "Roubo e Furto", description: "Indenização integral em caso de perda total por roubo ou furto qualificado." },
      { title: "Danos a Terceiros", description: "Proteção contra processos e danos causados a outros veículos ou pedestres." },
      { title: "Assistência 24h", description: "Guincho ilimitado, socorro mecânico e chaveiro em todo o Brasil." },
    ],
    whoNeeds: [
      "Proprietários de carros novos ou usados em Guarulhos",
      "Motoristas de aplicativo (Uber/99) na região",
      "Empresas com frotas locais que circulam pela Dutra"
    ],
    whyPatro: [
      "Atendimento local na Av. Salgado Filho",
      "Especialistas em riscos da região de Guarulhos",
      "Suporte humanizado em caso de sinistro"
    ],
    faqs: [
      { question: "Qual o bairro com seguro mais barato em Guarulhos?", answer: "Geralmente bairros como Cidade Maia e Vila Augusta possuem taxas menores que Cumbica ou Pimentas devido aos índices de roubo." },
      { question: "Como funciona a cotação?", answer: "Você preenche os dados, nós comparamos em 16 seguradoras e enviamos o comparativo em até 2 horas." }
    ]
  },
  "seguro-residencial-guarulhos": {
    title: "Seguro Residencial em Guarulhos",
    description: "Proteja sua casa ou apartamento em Guarulhos a partir de R$ 15,00 por mês.",
    metaDescription: "Seguro residencial em Guarulhos com assistência 24h (chaveiro, encanador). Proteja seu lar contra incêndio, roubo e danos elétricos. Confira!",
    heroImage: "/images/hero-home.webp",
    insuranceType: "residencial",
    icon: "🏠",
    location: "Guarulhos",
    detailedDescription: "O seguro residencial é um dos investimentos mais inteligentes que você pode fazer. Em Guarulhos, onde oscilações na rede elétrica são comuns, a cobertura de danos elétricos é essencial. Além disso, você conta com serviços de assistência que sozinhos já pagam o valor da apólice.",
    coverages: [
      { title: "Incêndio e Explosão", description: "Cobertura básica obrigatória para qualquer imóvel." },
      { title: "Danos Elétricos", description: "Proteção para seus eletrodomésticos contra surtos de tensão." },
      { title: "Roubo e Furto", description: "Segurança para seus bens dentro da residência." },
      { title: "Responsabilidade Civil", description: "Danos causados a terceiros, como vazamentos que atingem o vizinho." },
    ],
    faqs: [
      { question: "O seguro cobre vazamentos?", answer: "Sim, se contratada a cobertura de danos por água ou através da assistência 24h para reparos emergenciais." }
    ]
  },
  "plano-saude-guarulhos": {
    title: "Plano de Saúde em Guarulhos",
    description: "Os melhores planos de saúde empresariais e por adesão para você e sua empresa em Guarulhos.",
    metaDescription: "Compare planos de saúde em Guarulhos: Amil, Bradesco, SulAmérica, NotreDame e +. Planos empresariais com redução de carência. Peça sua cotação!",
    heroImage: "/images/hero-home.webp",
    insuranceType: "saude",
    icon: "🏥",
    location: "Guarulhos",
    detailedDescription: "Ter acesso aos melhores hospitais de Guarulhos, como o Hospital Carlos Chagas ou o Hospital Stella Maris, é fundamental para a segurança da sua família ou colaboradores. Trabalhamos com todas as operadoras que possuem rede credenciada forte na cidade.",
    coverages: [
      { title: "Consultas e Exames", description: "Acesso a ampla rede de clínicas e laboratórios." },
      { title: "Internações", description: "Acomodação em enfermaria ou apartamento conforme seu plano." },
      { title: "Obstetrícia", description: "Acompanhamento completo para gestantes e parto." },
    ],
    whoNeeds: [
      "Famílias que buscam segurança médica",
      "Empresas (PME) a partir de 2 vidas",
      "Profissionais liberais e MEI"
    ]
  }
};
