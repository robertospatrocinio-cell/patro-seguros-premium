import { InsurancePageProps } from "@/components/InsurancePageTemplate";

export const ezzeSegurosCorinthiansContent: InsurancePageProps = {
  title: "Seguro Auto Ezze Seguros em Guarulhos | Patro Seguros",
  headline: "Seguro Auto Ezze Seguros com atendimento especializado da Patro Seguros",
  subtitle: "A seguradora oficial do Corinthians com a consultoria da Patro Seguros em Guarulhos.",
  description: "Faça sua cotação do Seguro Auto Ezze Seguros com a Patro Seguros. Corretora parceira da Ezze Seguros com atendimento em Guarulhos, Zona Leste e toda São Paulo.",
  icon: "Shield",
  metaDescription: "Faça sua cotação do Seguro Auto Ezze Seguros com a Patro Seguros. Corretora parceira da Ezze Seguros. Atendimento em Guarulhos, Zona Leste e toda São Paulo. Compare coberturas.",
  
  detailedDescription: "A Ezze Seguros é uma das seguradoras que mais cresce no Brasil e consolidou sua marca como patrocinadora oficial do Sport Club Corinthians Paulista. Na Patro Seguros, você recebe atendimento consultivo para contratar o seu Seguro Auto Ezze com a certeza de ter a melhor cobertura pelo menor preço.",

  coverages: [
    { title: "Cobertura Compreensiva", description: "Proteção completa contra colisão, incêndio, roubo e furto do seu veículo." },
    { title: "Danos a Terceiros", description: "Cobertura para danos materiais e corporais causados a outras pessoas ou veículos." },
    { title: "Assistência 24 Horas", description: "Socorro mecânico, guincho, troca de pneus e chaveiro em todo o Brasil." },
    { title: "Vidros e Lanternas", description: "Troca ou reparo de vidros, retrovisores, faróis e lanternas com franquia reduzida." },
    { title: "Carro Reserva", description: "Garantia de mobilidade com carro alugado enquanto o seu está em reparo." },
    { title: "Eventos Naturais", description: "Proteção contra danos causados por alagamentos, quedas de árvores e granizo." }
  ],

  whoNeeds: [
    "Moradores de Guarulhos e ZL que buscam seguradora sólida e moderna.",
    "Torcedores do Timão que querem apoiar marcas parceiras.",
    "Motoristas de Aplicativo com opções específicas.",
    "Proprietários de Corolla, Compass, Onix e HB20."
  ],

  whyPatro: [
    "Atendimento humano e especializado",
    "Consultoria técnica para escolha de coberturas",
    "Suporte total no momento do sinistro",
    "Comparação em tempo real com outras 16 seguradoras",
    "Presença local em Guarulhos (Cidade Maia)",
    "Agilidade no WhatsApp (11) 5199-7500"
  ],

  faqs: [
    {
      question: "A Ezze Seguros é confiável?",
      answer: "Sim, a Ezze Seguros é uma seguradora brasileira autorizada pela SUSEP, com capital 100% nacional e forte investimento em tecnologia e inovação, operando em todo o território brasileiro."
    },
    {
      question: "A Ezze é a seguradora oficial do Corinthians?",
      answer: "A Ezze Seguros é patrocinadora oficial do Sport Club Corinthians Paulista, com sua marca presente nas camisas das equipes profissional masculina, feminina e categorias de base."
    },
    {
      question: "A Patro Seguros atende Seguro Auto Ezze em Guarulhos?",
      answer: "Sim, a Patro Seguros é uma corretora parceira da Ezze Seguros com sede em Guarulhos e atendimento especializado para toda a região, incluindo Zona Leste de São Paulo."
    }
  ],

  howItWorks: [
    { step: "1", title: "Cotação Online", description: "Você preenche os dados do seu veículo ou nos chama no WhatsApp." },
    { step: "2", title: "Análise Técnica", description: "Nossos consultores comparam o Seguro Ezze com as melhores opções do mercado." },
    { step: "3", title: "Emissão e Ativação", description: "Você escolhe a melhor opção, assina digitalmente e seu carro já sai protegido." }
  ],

  pricingInfo: {
    intro: "O valor do Seguro Auto Ezze depende de fatores como o modelo do carro, perfil do condutor e o CEP de pernoite na Grande São Paulo.",
    factors: [
      "Modelo e ano do veículo (FIPE)",
      "Uso do carro (lazer ou trabalho/app)",
      "Bairro de residência em Guarulhos ou SP",
      "Histórico do condutor (Classe de Bônus)"
    ]
  },

  localSeo: {
    city: "Guarulhos",
    neighborhood: "Cidade Maia",
    geo: { latitude: -23.4542, longitude: -46.5333 }
  },

  jumpLinks: [
    { label: "Coberturas", href: "#coberturas-heading" },
    { label: "Quem é a Ezze", href: "#detalhes-heading" },
    { label: "FAQ", href: "#faq-heading" },
    { label: "Cotação", href: "#formulario-heading" }
  ]
};
