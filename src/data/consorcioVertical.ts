/**
 * Fonte única de verdade da vertical de Consórcio local (Guarulhos/SP).
 * Hub: /consorcio-guarulhos. As páginas filhas usam ConsorcioIntentPageTemplate.
 */

export interface ConsorcioFaq {
  question: string;
  answer: string;
}

export interface ConsorcioIntentPage {
  slug: string;
  path: string;
  navLabel: string;
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  intro: string;
  audience: string[];
  bullets: string[];
  sections: { heading: string; body: string }[];
  whatsappOrigem: string;
  whatsappMessage: string;
  faqs: ConsorcioFaq[];
}

export const CONSORCIO_HUB_PATH = "/consorcio";
export const CONSORCIO_LOCAL_PATH = "/consorcio-guarulhos";

export const CONSORCIO_TRANSPARENCY_NOTICE =
  "A Patro Seguros atua como representante de administradoras de consórcio autorizadas pelo Banco Central do Brasil. Consórcio não é investimento nem financiamento: a contemplação ocorre por sorteio ou lance, conforme o regulamento do grupo. Prazos, taxa de administração, fundo de reserva e regras de lance variam por administradora e constam no contrato de adesão.";

export const CONSORCIO_PRUDENT_LANGUAGE =
  "Valores, prazos e condições são simulações e dependem do grupo disponível na data da adesão, conforme regulamento da administradora.";

export const CONSORCIO_INTENT_PAGES: ConsorcioIntentPage[] = [
  {
    slug: "consorcio-guarulhos",
    path: "/consorcio-guarulhos",
    navLabel: "Consórcio Guarulhos",
    title: "Consórcio em Guarulhos | Imóveis, Carros e Caminhões | Patro",
    metaDescription: "Consórcio em Guarulhos sem juros. Compare as melhores administradoras para comprar seu imóvel, carro ou frota com parcelas que cabem no seu bolso.",
    h1: "Consórcio em Guarulhos",
    subtitle: "A forma inteligente de planejar suas conquistas patrimoniais em Guarulhos e região sem pagar juros de financiamento.",
    intro: "O consórcio é a alternativa ao financiamento bancário tradicional para quem planeja o futuro. Em Guarulhos, a Patro Seguros oferece consultoria para você escolher o grupo ideal, com as menores taxas e histórico real de contemplações.",
    audience: ["Pessoas que querem fugir dos juros bancários", "Investidores imobiliários", "Empresas que precisam renovar frotas"],
    bullets: ["Sem juros", "Prazos flexíveis", "Uso do FGTS para imóvel"],
    sections: [
      { heading: "Vantagens do Consórcio", body: "Diferente do financiamento, no consórcio você não paga juros compostos. Existe apenas a taxa de administração diluída no prazo." }
    ],
    whatsappOrigem: "consorcio_guarulhos",
    whatsappMessage: "Olá! Gostaria de fazer uma simulação de consórcio em Guarulhos.",
    faqs: [
      { question: "Como funciona a contemplação?", answer: "Por sorteio mensal ou lance (livre, fixo ou embutido)." }
    ]
  },
  {
    slug: "consorcio-imoveis-guarulhos",
    path: "/consorcio-imoveis-guarulhos",
    navLabel: "Consórcio Imobiliário",
    title: "Consórcio de Imóveis em Guarulhos | Casa e Apto | Patro",
    metaDescription: "Consórcio imobiliário em Guarulhos: compre sua casa, apartamento ou terreno sem juros. Use seu FGTS para lance. Cotação online.",
    h1: "Consórcio de Imóveis em Guarulhos",
    subtitle: "Saia do aluguel ou invista em imóveis em Guarulhos com parcelas acessíveis.",
    intro: "Com o consórcio imobiliário da Patro Seguros, você planeja a compra do seu imóvel nos melhores bairros de Guarulhos: Maia, Vila Augusta, Centro e mais.",
    audience: ["Quem quer sair do aluguel", "Quem busca segundo imóvel", "Investidores"],
    bullets: ["Poder de compra à vista", "Uso do FGTS", "Taxas reduzidas"],
    sections: [
      { heading: "FGTS no Consórcio", body: "Você pode utilizar seu saldo do FGTS para ofertar lances ou amortizar parcelas no consórcio de imóveis residenciais." }
    ],
    whatsappOrigem: "consorcio_imovel_guarulhos",
    whatsappMessage: "Olá! Quero simular um consórcio de imóveis em Guarulhos.",
    faqs: [
      { question: "Posso comprar terreno com consórcio?", answer: "Sim, é possível comprar terreno, construir ou reformar." }
    ]
  },
  {
    slug: "consorcio-veiculos-guarulhos",
    path: "/consorcio-veiculos-guarulhos",
    navLabel: "Consórcio de Veículos",
    title: "Consórcio de Veículos em Guarulhos | Carros e Motos | Patro",
    metaDescription: "Consórcio de carros e motos em Guarulhos. Troque de veículo sem juros com planos de 36 a 100 meses. Simule agora.",
    h1: "Consórcio de Veículos em Guarulhos",
    subtitle: "O caminho mais barato para seu carro novo ou seminovo.",
    intro: "O consórcio de veículos permite planejar a troca do seu carro com parcelas que não pesam no orçamento, sem a burocracia do financiamento bancário.",
    audience: ["Motoristas de app", "Famílias", "Jovens no primeiro carro"],
    bullets: ["Sem juros de banco", "Diversas administradoras", "Lance embutido"],
    sections: [
      { heading: "Veículos Seminovos", body: "A carta de crédito pode ser usada para carros zero km ou seminovos com até alguns anos de uso (conforme regra da administradora)." }
    ],
    whatsappOrigem: "consorcio_veiculos_guarulhos",
    whatsappMessage: "Olá! Gostaria de simular um consórcio de carro/moto em Guarulhos.",
    faqs: [
      { question: "O que é o lance embutido?", answer: "É quando você usa parte da própria carta de crédito para ofertar um lance." }
    ]
  },
  {
    slug: "consorcio-caminhoes-guarulhos",
    path: "/consorcio-caminhoes-guarulhos",
    navLabel: "Consórcio de Caminhões",
    title: "Consórcio de Caminhões em Guarulhos | Frotas e Pesados",
    metaDescription: "Consórcio de caminhões e pesados em Guarulhos. Ideal para renovação de frota e autônomos. Planos sem juros e taxas competitivas.",
    h1: "Consórcio de Caminhões em Guarulhos",
    subtitle: "Renove sua frota ou compre seu primeiro caminhão com inteligência financeira.",
    intro: "Especialmente para transportadores de Guarulhos e região de Cumbica, o consórcio de pesados é a melhor ferramenta para manter a frota atualizada.",
    audience: ["Transportadoras", "Motoristas autônomos", "Empresas de logística"],
    bullets: ["Foco em renovação de frota", "Prazos estendidos", "Cartas de alto valor"],
    sections: [
      { heading: "Logística em Guarulhos", body: "Guarulhos é o maior hub logístico do país. O consórcio de caminhões ajuda sua empresa a crescer sem se descapitalizar." }
    ],
    whatsappOrigem: "consorcio_caminhao_guarulhos",
    whatsappMessage: "Olá! Quero simular um consórcio de caminhão/pesados.",
    faqs: [
      { question: "Serve para implementos rodoviários?", answer: "Sim, a carta de crédito pode ser usada para carretas e implementos." }
    ]
  },
  {
    slug: "consorcio-empresarial-guarulhos",
    path: "/consorcio-empresarial-guarulhos",
    navLabel: "Consórcio Empresarial",
    title: "Consórcio Empresarial em Guarulhos | Máquinas e Imóveis | Patro",
    metaDescription: "Consórcio para empresas em Guarulhos. Compre sede própria, máquinas ou veículos para sua empresa sem juros. Alavanque seu negócio.",
    h1: "Consórcio Empresarial em Guarulhos",
    subtitle: "Crescimento sustentável para sua empresa sem depender de crédito bancário caro.",
    intro: "O consórcio empresarial é uma ferramenta estratégica para aquisição de ativos fixos, permitindo que a empresa cresça pagando taxas mínimas.",
    audience: ["PMEs de Guarulhos", "Indústrias de Cumbica", "Comércios locais"],
    bullets: ["Preservação de capital de giro", "Aquisição de ativos", "Planejamento tributário"],
    sections: [
      { heading: "Sede Própria", body: "Use o consórcio para sair do aluguel comercial e investir no patrimônio da sua empresa." }
    ],
    whatsappOrigem: "consorcio_empresarial_guarulhos",
    whatsappMessage: "Olá! Gostaria de falar sobre consórcio empresarial para minha empresa.",
    faqs: [
      { question: "Empresa pode fazer consórcio?", answer: "Sim, o consórcio PJ é amplamente utilizado para expansão de negócios." }
    ]
  }
];
