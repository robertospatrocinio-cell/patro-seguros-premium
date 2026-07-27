/**
 * Fonte única de verdade para a vertical B2B (Seguro Garantia + Seguro de Crédito).
 * Todo o conteúdo comercial das páginas filhas e páginas por seguradora vive aqui.
 */

export type B2bLine = "garantia" | "credito";

export interface B2bFaq {
  question: string;
  answer: string;
}

export interface B2bIntentPage {
  slug: string;
  path: string;
  line: B2bLine;
  navLabel: string;
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  audience: string[];
  intro: string;
  sections: { heading: string; body: string }[];
  bullets: string[];
  whatsappOrigem: string;
  whatsappMessage: string;
  faqs: B2bFaq[];
}

export interface B2bInsurerPage {
  slug: string;
  path: string;
  insurer: string;
  line: B2bLine;
  lineLabel: string;
  highlights: string[];
  intro: string;
  positioning: string;
  faqs: B2bFaq[];
}

export const TRANSPARENCY_NOTICE =
  "A Patro Seguros atua como corretora/intermediadora de seguros. A disponibilidade de produtos, aceitação, taxas e condições depende da análise de cada seguradora parceira e da documentação apresentada pela empresa.";

export const PRUDENT_LANGUAGE =
  "A aceitação depende da análise da seguradora, do tipo de obrigação, documentação apresentada e regras do edital ou contrato.";

export const B2B_HUB_PATH = "/seguros-empresariais-especializados";
export const GARANTIA_HUB_PATH = "/seguro-garantia";
export const GARANTIA_LOCAL_PATH = "/seguro-garantia-guarulhos";
export const CREDITO_HUB_PATH = "/seguro-de-credito";
export const CREDITO_LOCAL_PATH = "/seguro-de-credito-guarulhos";

export const B2B_INSURERS_GARANTIA = [
  "Pottencial",
  "Junto Seguros",
  "Porto",
  "Tokio Marine",
  "Akad",
  "Ezze",
  "Allianz",
] as const;

export const B2B_INSURERS_CREDITO = [
  "Allianz",
  "Tokio Marine",
  "Porto",
  "Akad",
  "Ezze",
] as const;

// ---------------------------------------------------------------------------
// Subpáginas de intenção — Seguro Garantia
// ---------------------------------------------------------------------------

export const GARANTIA_INTENT_PAGES: B2bIntentPage[] = [
  {
    slug: "seguro-garantia-licitacao",
    path: "/seguro-garantia-licitacao",
    line: "garantia",
    navLabel: "Licitação",
    title: "Seguro Garantia para Licitação | Cotação Patro Seguros",
    metaDescription:
      "Seguro Garantia para licitação: cotação com Pottencial, Junto, Porto, Tokio, Akad, Ezze e Allianz pela Patro Seguros. Atendimento nacional para empresas.",
    h1: "Seguro Garantia para Licitação",
    subtitle:
      "Cotação de Seguro Garantia para participar de concorrências, pregões e contratos administrativos, com análise da Patro Seguros e seguradoras parceiras.",
    audience: [
      "Empresas que participam de licitações públicas ou privadas",
      "Fornecedores de órgãos governamentais",
      "Construtoras e empreiteiras",
      "Prestadores de serviço com contratos administrativos",
      "Indústrias fornecedoras de bens ao setor público",
    ],
    intro:
      "O Seguro Garantia para Licitação é uma modalidade que pode ser utilizada por empresas participantes de processos licitatórios como forma de comprovar garantia diante do órgão contratante, conforme regras do edital e condições da apólice. Substitui garantias tradicionais como caução em dinheiro ou fiança bancária quando aceito pelo edital.",
    sections: [
      {
        heading: "Como funciona o Seguro Garantia para Licitação",
        body: "O produto funciona em dois momentos típicos: (1) garantia de proposta (bid bond), apresentada durante a fase de habilitação, e (2) garantia de execução do contrato, apresentada após a assinatura. A Patro Seguros analisa o edital e ajuda a estruturar a apólice com prazos, valores e beneficiários corretos. A aceitação depende da análise da seguradora, do tipo de obrigação, documentação apresentada e regras do edital ou contrato.",
      },
      {
        heading: "Vantagens frente à caução em dinheiro",
        body: "Preserva o caixa da empresa (não imobiliza recursos), pode ter custo competitivo em relação a garantias bancárias, é aceito na maioria dos editais que preveem seguro-garantia, e libera limite bancário para outras operações. Cada edital estabelece regras específicas — sempre confirme antes de contratar.",
      },
      {
        heading: "O que a Patro Seguros faz por você",
        body: "Recebemos o edital, mapeamos requisitos (valor, prazo, cláusulas obrigatórias), enviamos para múltiplas seguradoras parceiras (Pottencial, Junto, Porto, Tokio Marine, Akad, Ezze, Allianz), comparamos taxas e prazos, e apoiamos o envio da documentação. Nossa consultoria é gratuita para a empresa contratante.",
      },
    ],
    bullets: [
      "Bid bond (garantia de proposta)",
      "Performance bond (garantia de execução)",
      "Garantia de manutenção pós-obra quando exigida",
      "Análise de edital antes da contratação",
      "Comparação entre seguradoras parceiras",
    ],
    whatsappOrigem: "b2b_garantia_licitacao",
    whatsappMessage:
      "Olá, quero cotar Seguro Garantia para participar de uma licitação. Posso enviar o edital para análise?",
    faqs: [
      {
        question: "Qual documentação preciso enviar para cotar Seguro Garantia de licitação?",
        answer:
          "Normalmente edital ou minuta do contrato, cartão CNPJ, contrato social, últimos balanços, faturamento dos últimos 12 meses e certidões negativas. A lista final varia por seguradora e por porte da apólice.",
      },
      {
        question: "O Seguro Garantia substitui caução ou fiança bancária?",
        answer:
          "Pode substituir quando o edital ou contrato prevê essa modalidade e a apólice é aceita pelo contratante. A validade da substituição depende sempre das regras do edital e da análise da seguradora.",
      },
      {
        question: "Quanto tempo leva a emissão?",
        answer:
          "Após aprovação de crédito na seguradora, a emissão pode ocorrer em dias úteis. O prazo total depende da complexidade do risco, valor garantido e documentação enviada.",
      },
      {
        question: "A Patro atende empresas fora de Guarulhos?",
        answer:
          "Sim. Atendemos empresas de todo o Brasil em Seguro Garantia. Somos sediados em Guarulhos/SP e cobrimos também São Paulo e região metropolitana.",
      },
    ],
  },
  {
    slug: "seguro-garantia-contratual",
    path: "/seguro-garantia-contratual",
    line: "garantia",
    navLabel: "Contratual",
    title: "Seguro Garantia Contratual | Contratos e Prestação de Serviços",
    metaDescription:
      "Seguro Garantia Contratual para fornecimento, prestação de serviços e obras. Cotação com seguradoras parceiras pela Patro Seguros.",
    h1: "Seguro Garantia Contratual",
    subtitle:
      "Garanta o cumprimento de obrigações assumidas em contratos privados ou públicos com Seguro Garantia Contratual, analisado pela Patro Seguros.",
    audience: [
      "Prestadores de serviço com contratos privados",
      "Fornecedores B2B recorrentes",
      "Construtoras e empreiteiras em contratos privados",
      "Empresas de manutenção e facilities",
      "Indústrias com contratos de fornecimento",
    ],
    intro:
      "O Seguro Garantia Contratual é utilizado para garantir a execução de contratos e o cumprimento de obrigações assumidas — de fornecimento, prestação de serviços, obras, manutenção e outros. A aceitação depende da análise da seguradora, do tipo de obrigação e da documentação apresentada.",
    sections: [
      {
        heading: "Quando usar o Seguro Garantia Contratual",
        body: "Sempre que o contratante exigir uma garantia formal do cumprimento das obrigações contratuais. Pode ser cláusula do contrato, ou negociado como alternativa a retenção de recebíveis, caução em dinheiro ou fiança bancária.",
      },
      {
        heading: "Modalidades comuns",
        body: "Performance bond (execução), advance payment (adiantamento), retention (retenção), maintenance (manutenção pós-entrega) e supply (fornecimento). A Patro Seguros ajuda a identificar a modalidade correta a partir da leitura do contrato.",
      },
      {
        heading: "Documentação típica",
        body: "Contrato ou minuta, cartão CNPJ, contrato social, balanços recentes, faturamento, certidões negativas e, quando relevante, portfólio de contratos anteriores. Requisitos variam por seguradora e valor.",
      },
    ],
    bullets: [
      "Contratos privados de fornecimento",
      "Prestação de serviços recorrente",
      "Manutenção e facilities",
      "Obras e reformas privadas",
      "Alternativa a caução ou retenção",
    ],
    whatsappOrigem: "b2b_garantia_contratual",
    whatsappMessage:
      "Olá, quero cotar Seguro Garantia Contratual para um contrato B2B. Posso enviar o contrato para análise?",
    faqs: [
      {
        question: "Contratos privados podem usar Seguro Garantia?",
        answer:
          "Sim. O Seguro Garantia Contratual é utilizado em contratos privados quando as partes decidem substituir garantias tradicionais por uma apólice. As condições ficam definidas no contrato e na apólice.",
      },
      {
        question: "Qual o valor médio da garantia?",
        answer:
          "Normalmente entre 5% e 30% do valor do contrato, mas depende do que for negociado com o contratante. Percentuais maiores são aceitos conforme análise da seguradora.",
      },
      {
        question: "É possível ampliar o prazo depois?",
        answer:
          "Sim, mediante endosso na apólice, aceitação da seguradora e do beneficiário. A Patro apoia a solicitação junto à seguradora.",
      },
      {
        question: "Preciso de escritório em Guarulhos para contratar?",
        answer:
          "Não. A Patro atende empresas de todo o Brasil, embora seja sediada em Guarulhos/SP.",
      },
    ],
  },
  {
    slug: "seguro-garantia-judicial",
    path: "/seguro-garantia-judicial",
    line: "garantia",
    navLabel: "Judicial",
    title: "Seguro Garantia Judicial | Cotação com Corretora Especializada",
    metaDescription:
      "Seguro Garantia Judicial para empresas em processos trabalhistas, fiscais ou cíveis. Cotação com seguradoras parceiras pela Patro Seguros.",
    h1: "Seguro Garantia Judicial",
    subtitle:
      "Empresas em disputas judiciais podem avaliar o Seguro Garantia Judicial como alternativa a depósitos em dinheiro, sempre conforme decisão do juízo e aceitação da seguradora.",
    audience: [
      "Empresas em execuções fiscais",
      "Empresas em disputas trabalhistas",
      "Empresas em disputas cíveis relevantes",
      "Departamentos jurídicos que buscam preservar caixa",
      "Escritórios que assessoram empresas",
    ],
    intro:
      "O Seguro Garantia Judicial é uma modalidade utilizada por empresas em disputas judiciais para garantir o juízo em substituição a depósitos em dinheiro ou outras garantias, quando aceito pelo tribunal e conforme as condições da apólice. Não substitui aconselhamento jurídico e depende da decisão judicial.",
    sections: [
      {
        heading: "Como funciona",
        body: "A empresa contrata uma apólice cujo beneficiário é o juízo. Quando aceita pelo tribunal, a apólice substitui o depósito recursal ou penhora em dinheiro. A aceitação depende da natureza do processo, do juízo e da análise da seguradora.",
      },
      {
        heading: "Vantagens potenciais",
        body: "Preserva capital de giro, evita imobilização de valores em depósito judicial, e pode gerar economia frente ao custo de oportunidade do dinheiro. Cada caso deve ser avaliado com o jurídico da empresa.",
      },
      {
        heading: "O papel da Patro Seguros",
        body: "Recebemos o dado do processo, alinhamos com o jurídico da empresa, enviamos para as seguradoras parceiras que operam Garantia Judicial, comparamos taxas e prazos, e apoiamos a emissão da apólice.",
      },
    ],
    bullets: [
      "Depósito recursal em processos trabalhistas",
      "Execuções fiscais",
      "Ações cíveis relevantes",
      "Suspensão de exigibilidade de créditos tributários (quando aceito)",
      "Alternativa a depósito em dinheiro",
    ],
    whatsappOrigem: "b2b_garantia_judicial",
    whatsappMessage:
      "Olá, quero cotar Seguro Garantia Judicial. Posso passar os dados do processo para análise?",
    faqs: [
      {
        question: "O tribunal sempre aceita Seguro Garantia Judicial?",
        answer:
          "Depende do tipo de processo, do tribunal e da decisão do juízo. A aceitação não é automática e deve ser avaliada pelo jurídico da empresa em conjunto com a decisão judicial.",
      },
      {
        question: "Vocês oferecem aconselhamento jurídico?",
        answer:
          "Não. A Patro Seguros é corretora de seguros e apoia a estruturação da apólice. Recomendamos sempre alinhar a estratégia com o advogado ou departamento jurídico da empresa.",
      },
      {
        question: "Como é calculado o custo?",
        answer:
          "Cada seguradora aplica uma taxa sobre o valor garantido, considerando prazo, tipo de processo e perfil de crédito da empresa. Recomendamos comparar propostas antes de contratar.",
      },
      {
        question: "Empresas de Guarulhos são atendidas?",
        answer:
          "Sim. A Patro é sediada em Guarulhos/SP e atende empresas locais e em todo o Brasil.",
      },
    ],
  },
  {
    slug: "seguro-garantia-construcao-civil",
    path: "/seguro-garantia-construcao-civil",
    line: "garantia",
    navLabel: "Construção Civil",
    title: "Seguro Garantia para Construção Civil | Obras e Contratos",
    metaDescription:
      "Seguro Garantia para construção civil: performance, adiantamento e retenção. Cotação para construtoras, incorporadoras e empreiteiras pela Patro Seguros.",
    h1: "Seguro Garantia para Construção Civil",
    subtitle:
      "Construtoras, incorporadoras, empreiteiras e engenharias podem estruturar Seguro Garantia para obras públicas e privadas com a Patro Seguros.",
    audience: [
      "Construtoras de obras públicas e privadas",
      "Incorporadoras imobiliárias",
      "Empreiteiras",
      "Empresas de engenharia",
      "Fornecedores de grandes obras",
    ],
    intro:
      "Obras exigem múltiplas garantias ao longo do ciclo: proposta, execução, adiantamento e retenção. O Seguro Garantia para construção civil cobre modalidades adequadas a cada fase, conforme contrato/edital e análise da seguradora.",
    sections: [
      {
        heading: "Modalidades típicas em obras",
        body: "Performance bond (execução da obra), advance payment (adiantamento), retention (retenção de pagamentos convertidos em apólice), maintenance (manutenção pós-obra) e supply (fornecimento de materiais).",
      },
      {
        heading: "Por que construtoras contratam",
        body: "Para preservar capital de giro, atender exigências de editais públicos e contratos privados, e substituir caução ou retenções que impactam o fluxo de caixa da obra.",
      },
      {
        heading: "Como a Patro apoia obras",
        body: "Analisamos edital ou contrato, identificamos as modalidades necessárias, negociamos com seguradoras especializadas em risco construção (Pottencial, Junto, Porto, Tokio, Akad, Ezze, Allianz), comparamos taxas e prazos e apoiamos os endossos ao longo da obra.",
      },
    ],
    bullets: [
      "Performance bond de obra",
      "Advance payment (adiantamento)",
      "Retention (retenção)",
      "Maintenance (manutenção)",
      "Supply (fornecimento)",
    ],
    whatsappOrigem: "b2b_garantia_construcao",
    whatsappMessage:
      "Olá, sou de uma construtora e quero cotar Seguro Garantia para uma obra. Posso enviar o contrato/edital?",
    faqs: [
      {
        question: "Uma mesma obra pode ter várias apólices?",
        answer:
          "Sim. É comum contratar apólices distintas para adiantamento, execução, retenção e manutenção. A Patro estrutura o conjunto de garantias adequado ao contrato.",
      },
      {
        question: "Quanto custa em média o Seguro Garantia de obra?",
        answer:
          "As taxas variam por seguradora, prazo e perfil de crédito. É recomendável comparar propostas — a Patro faz esse trabalho com seguradoras parceiras.",
      },
      {
        question: "Empresas de engenharia menores podem contratar?",
        answer:
          "Sim, desde que passem pela análise de crédito da seguradora. O porte da empresa influencia limite, taxa e exigências documentais.",
      },
      {
        question: "A obra precisa estar em Guarulhos?",
        answer:
          "Não. Atendemos obras em todo o Brasil. Nossa base é Guarulhos/SP.",
      },
    ],
  },
  {
    slug: "seguro-garantia-fornecedores",
    path: "/seguro-garantia-fornecedores",
    line: "garantia",
    navLabel: "Fornecedores",
    title: "Seguro Garantia para Fornecedores | Empresas B2B",
    metaDescription:
      "Seguro Garantia para fornecedores B2B: entrega, fornecimento e obrigações contratuais. Cotação pela Patro Seguros com seguradoras parceiras.",
    h1: "Seguro Garantia para Fornecedores",
    subtitle:
      "Fornecedores industriais, comerciais e de serviços podem usar Seguro Garantia para reforçar credibilidade contratual e substituir garantias tradicionais.",
    audience: [
      "Fornecedores industriais recorrentes",
      "Fornecedores comerciais B2B",
      "Distribuidores de bens",
      "Prestadores de serviço fornecedores de grandes contas",
      "Fornecedores estratégicos de cadeias produtivas",
    ],
    intro:
      "O Seguro Garantia para Fornecedores serve para garantir o cumprimento de obrigações de entrega, qualidade, prazo e continuidade contratual assumidas com clientes B2B. A modalidade e o valor dependem do contrato e das exigências do contratante.",
    sections: [
      {
        heading: "Casos comuns de uso",
        body: "Contratos de fornecimento contínuo, contratos de longo prazo com grandes indústrias, contratos com o setor público em modalidade fornecimento, e substituição de retenções ou garantias bancárias exigidas pelos clientes.",
      },
      {
        heading: "Requisitos típicos",
        body: "Análise de crédito da seguradora, faturamento consistente, documentação societária e contratos anteriores. Cada seguradora avalia com critérios próprios.",
      },
      {
        heading: "Como a Patro ajuda",
        body: "Estruturamos o pedido, submetemos a múltiplas seguradoras (Pottencial, Junto, Porto, Tokio, Akad, Ezze, Allianz), comparamos taxas, apoiamos endossos e renovações ao longo do contrato.",
      },
    ],
    bullets: [
      "Contratos de fornecimento contínuo",
      "Grandes contratos B2B",
      "Substituição de retenção contratual",
      "Alternativa a fiança bancária",
      "Fornecedores de setor público",
    ],
    whatsappOrigem: "b2b_garantia_fornecedores",
    whatsappMessage:
      "Olá, sou fornecedor B2B e quero cotar Seguro Garantia para um contrato. Posso enviar os documentos?",
    faqs: [
      {
        question: "Fornecedores pequenos conseguem contratar?",
        answer:
          "Depende da análise de crédito da seguradora e do valor a garantir. Fornecedores menores muitas vezes conseguem em valores compatíveis com seu porte.",
      },
      {
        question: "É possível usar em contratos internacionais?",
        answer:
          "Sim, existem estruturas específicas para operações internacionais. A Patro avalia caso a caso com as seguradoras que operam esse nicho.",
      },
      {
        question: "O contratante precisa aprovar?",
        answer:
          "Sim. O beneficiário da apólice é o contratante, e ele precisa aceitar a modalidade em substituição a outras garantias.",
      },
      {
        question: "A Patro atende fornecedores fora de SP?",
        answer:
          "Sim. Atendemos fornecedores B2B em todo o Brasil.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Subpáginas de intenção — Seguro de Crédito
// ---------------------------------------------------------------------------

export const CREDITO_INTENT_PAGES: B2bIntentPage[] = [
  {
    slug: "seguro-de-credito-vendas-a-prazo",
    path: "/seguro-de-credito-vendas-a-prazo",
    line: "credito",
    navLabel: "Vendas a Prazo",
    title: "Seguro de Crédito para Vendas a Prazo | Patro Seguros",
    metaDescription:
      "Seguro de Crédito para empresas que vendem a prazo e querem reduzir inadimplência. Cotação com seguradoras parceiras pela Patro Seguros.",
    h1: "Seguro de Crédito para vendas a prazo",
    subtitle:
      "Empresas que vendem a prazo podem contratar Seguro de Crédito para reduzir o impacto da inadimplência de clientes PJ, conforme análise e limites aprovados pela seguradora.",
    audience: [
      "Empresas com carteira PJ significativa",
      "Indústrias que vendem a distribuidores",
      "Atacadistas e distribuidores",
      "Empresas com risco de concentração de clientes",
      "Empresas em crescimento comercial",
    ],
    intro:
      "Vendas a prazo aceleram crescimento, mas expõem o caixa à inadimplência. O Seguro de Crédito oferece proteção contra o não pagamento de clientes PJ, conforme análise de crédito, limites aprovados e condições da apólice.",
    sections: [
      {
        heading: "Como funciona a proteção",
        body: "A seguradora analisa a carteira de clientes PJ da empresa e estabelece limites por cliente. Vendas dentro dos limites aprovados ficam protegidas em caso de inadimplência prolongada, respeitando franquia, carência e demais condições da apólice.",
      },
      {
        heading: "Benefícios além da proteção",
        body: "Acesso a informação de crédito estruturada sobre clientes, apoio na cobrança em atraso e maior segurança para conceder prazos maiores em vendas estratégicas.",
      },
      {
        heading: "Papel da Patro",
        body: "A Patro Seguros analisa o perfil da empresa, submete a proposta a seguradoras parceiras, ajuda a interpretar limites aprovados e a estruturar a rotina operacional de comunicação de vendas e cobrança.",
      },
    ],
    bullets: [
      "Proteção contra inadimplência de clientes PJ",
      "Limites por cliente definidos pela seguradora",
      "Apoio à cobrança em atraso",
      "Segurança para conceder prazos maiores",
      "Mais previsibilidade de caixa",
    ],
    whatsappOrigem: "b2b_credito_vendas_prazo",
    whatsappMessage:
      "Olá, quero entender Seguro de Crédito para proteger as vendas a prazo da minha empresa.",
    faqs: [
      {
        question: "Preciso segurar todos os clientes?",
        answer:
          "Em geral sim. A maioria das seguradoras exige que toda a carteira PJ seja submetida à análise, o que evita seleção adversa (segurar só clientes de maior risco).",
      },
      {
        question: "Qual é o tempo médio para pagamento em caso de inadimplência?",
        answer:
          "Existe carência (período de inadimplência antes do pagamento) que varia por apólice, tipicamente entre 90 e 180 dias após o vencimento, conforme condições contratadas.",
      },
      {
        question: "Quanto custa em média?",
        answer:
          "O custo é geralmente calculado como percentual do faturamento a prazo protegido, ajustado por risco da carteira. Varia por seguradora e perfil da empresa.",
      },
      {
        question: "Empresas de Guarulhos são atendidas?",
        answer:
          "Sim. A Patro é sediada em Guarulhos/SP e atende empresas de todo o Brasil.",
      },
    ],
  },
  {
    slug: "seguro-de-credito-industria",
    path: "/seguro-de-credito-industria",
    line: "credito",
    navLabel: "Indústria",
    title: "Seguro de Crédito para Indústrias | Proteção contra Inadimplência",
    metaDescription:
      "Seguro de Crédito para indústrias que vendem a prazo para distribuidores, atacadistas e varejo. Cotação pela Patro Seguros.",
    h1: "Seguro de Crédito para indústrias",
    subtitle:
      "Indústrias que vendem a prazo para distribuidores, atacadistas e varejo podem estruturar Seguro de Crédito para reduzir o risco de inadimplência e proteger o fluxo de caixa.",
    audience: [
      "Indústrias de bens de consumo",
      "Indústrias químicas, plásticas e metalúrgicas",
      "Indústrias de alimentos e bebidas",
      "Fabricantes que vendem para grandes redes",
      "Indústrias com concentração de clientes",
    ],
    intro:
      "Indústrias tipicamente concentram parte relevante do faturamento em poucos clientes PJ. Um único default pode comprometer margem de vários meses. O Seguro de Crédito oferece proteção para esse cenário, conforme análise e limites aprovados.",
    sections: [
      {
        heading: "Riscos típicos da indústria",
        body: "Concentração de faturamento em grandes clientes, prazos longos de recebimento, exposição setorial (setores em crise) e dependência de poucos canais de distribuição.",
      },
      {
        heading: "Como o Seguro de Crédito ajuda",
        body: "Traz visibilidade estruturada sobre a saúde financeira dos clientes, estabelece limites de exposição por cliente e cobre inadimplência prolongada dentro dos limites contratados.",
      },
      {
        heading: "Como cotar",
        body: "A Patro apresenta a indústria às seguradoras parceiras (Allianz, Tokio Marine, Porto, Akad, Ezze), submete a carteira para análise e ajuda a interpretar as propostas — foco em cobertura efetiva e custo justo.",
      },
    ],
    bullets: [
      "Concentração de faturamento em grandes clientes",
      "Prazos longos de recebimento",
      "Proteção contra inadimplência prolongada",
      "Análise estruturada da carteira",
      "Maior segurança para conceder prazos",
    ],
    whatsappOrigem: "b2b_credito_industria",
    whatsappMessage:
      "Olá, tenho uma indústria e quero cotar Seguro de Crédito para proteger vendas a prazo.",
    faqs: [
      {
        question: "A seguradora avalia meus clientes?",
        answer:
          "Sim. A análise da carteira é parte central do produto. A seguradora estabelece limites por cliente, que podem ser menores do que os praticados hoje pela indústria.",
      },
      {
        question: "Preciso alterar meu processo comercial?",
        answer:
          "Sim, moderadamente. É preciso comunicar vendas conforme regras da apólice e observar limites aprovados. A Patro apoia a implantação operacional.",
      },
      {
        question: "O produto cobre vendas para o exterior?",
        answer:
          "Existe modalidade específica para exportação. Vendas ao mercado interno e ao mercado externo geralmente são tratadas em produtos ou coberturas distintas.",
      },
      {
        question: "A Patro atende indústrias fora de Guarulhos?",
        answer:
          "Sim, atendemos em todo o Brasil.",
      },
    ],
  },
  {
    slug: "seguro-de-credito-exportacao",
    path: "/seguro-de-credito-exportacao",
    line: "credito",
    navLabel: "Exportação",
    title: "Seguro de Crédito à Exportação | Empresas Exportadoras",
    metaDescription:
      "Seguro de Crédito à Exportação para empresas que vendem no exterior. Cotação com seguradoras parceiras pela Patro Seguros.",
    h1: "Seguro de Crédito à Exportação",
    subtitle:
      "Empresas exportadoras podem avaliar Seguro de Crédito à Exportação para proteger recebíveis em moeda estrangeira e reduzir risco de inadimplência internacional.",
    audience: [
      "Indústrias exportadoras",
      "Trading companies",
      "Empresas com clientes recorrentes no exterior",
      "PMEs exportadoras",
      "Empresas em processo de internacionalização",
    ],
    intro:
      "Vender para o exterior envolve variáveis adicionais: risco político, risco cambial, prazos maiores e menor visibilidade sobre a saúde do cliente. O Seguro de Crédito à Exportação oferece proteção contra inadimplência de compradores estrangeiros, conforme análise, limites e condições da apólice.",
    sections: [
      {
        heading: "Cobertura típica",
        body: "Inadimplência prolongada de compradores estrangeiros, alguns produtos podem cobrir risco político (moratória, restrição de transferência, guerra) — sempre conforme condições contratadas.",
      },
      {
        heading: "Requisitos comuns",
        body: "Histórico de exportação, base de compradores, faturamento em moeda estrangeira, prazos praticados e política de crédito da empresa. A seguradora analisa cada país e cada comprador.",
      },
      {
        heading: "Como a Patro atua",
        body: "Encaminhamos a proposta para seguradoras com apetite em risco de exportação, comparamos propostas e apoiamos a estruturação operacional do produto.",
      },
    ],
    bullets: [
      "Proteção de recebíveis em moeda estrangeira",
      "Análise de compradores no exterior",
      "Risco comercial e, em produtos específicos, risco político",
      "Apoio ao crescimento internacional",
      "Estrutura operacional acompanhada pela Patro",
    ],
    whatsappOrigem: "b2b_credito_exportacao",
    whatsappMessage:
      "Olá, minha empresa exporta e quero avaliar Seguro de Crédito à Exportação.",
    faqs: [
      {
        question: "Todos os países são cobertos?",
        answer:
          "Não. Cada seguradora tem apetite diferente por país. Alguns países podem ter limite reduzido, exigir cobertura de risco político ou serem excluídos.",
      },
      {
        question: "É possível cobrir só alguns compradores?",
        answer:
          "Em geral a apólice cobre a carteira submetida à análise. Estruturas parciais são possíveis conforme seguradora e produto.",
      },
      {
        question: "Empresas pequenas podem contratar?",
        answer:
          "Sim, existem produtos voltados a PMEs exportadoras. O apetite varia por seguradora.",
      },
      {
        question: "Vocês atendem exportadoras em todo o Brasil?",
        answer:
          "Sim. Atendemos exportadoras em todo o país, com base em Guarulhos/SP.",
      },
    ],
  },
  {
    slug: "seguro-de-credito-distribuidores",
    path: "/seguro-de-credito-distribuidores",
    line: "credito",
    navLabel: "Distribuidores",
    title: "Seguro de Crédito para Distribuidores e Atacadistas",
    metaDescription:
      "Seguro de Crédito para distribuidores e atacadistas que vendem a prazo para varejo, redes e pequenos comércios. Cotação pela Patro Seguros.",
    h1: "Seguro de Crédito para distribuidores e atacadistas",
    subtitle:
      "Distribuidores e atacadistas convivem com milhares de clientes PJ. O Seguro de Crédito ajuda a proteger o fluxo de caixa contra a inadimplência recorrente da carteira.",
    audience: [
      "Distribuidores de bens de consumo",
      "Atacadistas em geral",
      "Distribuidores farmacêuticos",
      "Distribuidores de material de construção",
      "Distribuidores de alimentos e bebidas",
    ],
    intro:
      "Distribuidores e atacadistas operam volumes altos com margem apertada e prazos comuns entre 30 e 90 dias. Uma sequência de defaults compromete rapidamente a operação. O Seguro de Crédito estrutura limites por cliente e cobre inadimplência conforme condições da apólice.",
    sections: [
      {
        heading: "Riscos do canal",
        body: "Alta pulverização de clientes, dificuldade de análise individual, informalidade em parte da base, sazonalidade e concentração regional.",
      },
      {
        heading: "Como o Seguro apoia",
        body: "A seguradora entrega análise estruturada por cliente PJ e absorve inadimplência prolongada dentro dos limites. O distribuidor ganha previsibilidade e pode ampliar prazos com segurança.",
      },
      {
        heading: "O que fazemos na Patro",
        body: "Estruturamos a apresentação da empresa às seguradoras parceiras, comparamos custos e coberturas e ajudamos a implantar a rotina de comunicação de vendas.",
      },
    ],
    bullets: [
      "Milhares de clientes PJ",
      "Prazos comuns de 30 a 90 dias",
      "Análise estruturada por cliente",
      "Proteção do fluxo de caixa",
      "Possibilidade de estender prazos com segurança",
    ],
    whatsappOrigem: "b2b_credito_distribuidores",
    whatsappMessage:
      "Olá, sou distribuidor/atacadista e quero cotar Seguro de Crédito para minha carteira PJ.",
    faqs: [
      {
        question: "É possível cobrir toda a carteira, mesmo com muitos clientes?",
        answer:
          "Sim. As seguradoras operam com carteiras extensas e estabelecem limites individuais. Clientes de menor porte podem ter limites reduzidos ou padronizados.",
      },
      {
        question: "Preciso mudar meu ERP?",
        answer:
          "Não necessariamente. É preciso comunicar vendas conforme regras da apólice. Em muitos casos há integrações simples com o ERP existente.",
      },
      {
        question: "O custo compensa?",
        answer:
          "Depende do nível histórico de inadimplência, margem e prazo. Distribuidores com carteira pulverizada normalmente veem valor no produto — a Patro ajuda a fazer essa análise.",
      },
      {
        question: "Vocês atendem fora de SP?",
        answer:
          "Sim, atendemos distribuidores em todo o Brasil.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Páginas por seguradora
// ---------------------------------------------------------------------------

export const B2B_INSURER_PAGES: B2bInsurerPage[] = [
  {
    slug: "pottencial-seguro-garantia",
    path: "/pottencial-seguro-garantia",
    insurer: "Pottencial",
    line: "garantia",
    lineLabel: "Seguro Garantia",
    highlights: [
      "Especialização em Seguro Garantia com operação nacional",
      "Portfólio amplo em modalidades de licitação e contratual",
      "Aceitação em obras e contratos administrativos",
    ],
    intro:
      "A Pottencial é reconhecida no mercado brasileiro como uma das principais seguradoras especializadas em Seguro Garantia. A Patro Seguros intermedia cotações com a Pottencial para empresas de todos os portes, conforme análise e aceitação da seguradora.",
    positioning:
      "A operação da Pottencial em Seguro Garantia atende licitações, contratos e obras. A capacidade específica para o seu caso depende de análise de crédito, valor, prazo e documentação enviada.",
    faqs: [
      {
        question: "A Pottencial atende empresas de qualquer porte?",
        answer:
          "Atende empresas de diversos portes, respeitando análise de crédito e política de risco. A Patro apresenta o pedido e aguarda retorno da seguradora.",
      },
      {
        question: "É possível cotar Pottencial e outras seguradoras?",
        answer:
          "Sim. A Patro tipicamente cota com Pottencial e demais parceiras (Junto, Porto, Tokio, Akad, Ezze, Allianz) para comparar taxas e prazos.",
      },
    ],
  },
  {
    slug: "junto-seguro-garantia",
    path: "/junto-seguro-garantia",
    insurer: "Junto Seguros",
    line: "garantia",
    lineLabel: "Seguro Garantia",
    highlights: [
      "Tradição no segmento de Seguro Garantia",
      "Atua em modalidades de licitação, contratual e judicial",
      "Aceitação em operações complexas",
    ],
    intro:
      "A Junto Seguros é uma seguradora com forte atuação em Seguro Garantia e Fiança. A Patro Seguros submete pedidos à Junto conforme perfil da empresa e da operação a ser garantida.",
    positioning:
      "A Junto avalia cada caso considerando o tipo de garantia, valor, prazo e perfil de crédito. Nenhum resultado é garantido antes da análise.",
    faqs: [
      {
        question: "A Junto aceita empresas em fase inicial?",
        answer:
          "Depende do valor garantido, do tipo de obrigação e da documentação apresentada. Cada caso passa por análise.",
      },
      {
        question: "Como a Patro ajuda no processo?",
        answer:
          "Analisamos o edital ou contrato, montamos o pedido, submetemos à Junto e a outras seguradoras parceiras e comparamos as propostas recebidas.",
      },
    ],
  },
  {
    slug: "porto-seguro-garantia",
    path: "/porto-seguro-garantia",
    insurer: "Porto",
    line: "garantia",
    lineLabel: "Seguro Garantia",
    highlights: [
      "Marca consolidada e atuação nacional",
      "Portfólio empresarial amplo, incluindo Seguro Garantia",
      "Capacidade para diversas modalidades contratuais",
    ],
    intro:
      "A Porto atua em Seguro Garantia dentro do seu portfólio empresarial. A Patro Seguros intermedia cotações com a Porto conforme perfil da empresa e da obrigação garantida.",
    positioning:
      "A aceitação e as condições oferecidas pela Porto dependem da análise da seguradora, do tipo de obrigação garantida e da documentação enviada pela empresa.",
    faqs: [
      {
        question: "A Porto compete com seguradoras especializadas?",
        answer:
          "Sim, em muitos casos. A Patro cota Porto em paralelo às demais seguradoras parceiras para comparar taxas e prazos.",
      },
      {
        question: "Quais documentos preciso enviar?",
        answer:
          "Documentação societária, contratos ou edital, balanços e certidões negativas. Requisitos finais dependem do valor e da operação.",
      },
    ],
  },
  {
    slug: "tokio-marine-seguro-garantia",
    path: "/tokio-marine-seguro-garantia",
    insurer: "Tokio Marine",
    line: "garantia",
    lineLabel: "Seguro Garantia",
    highlights: [
      "Seguradora global com forte presença no Brasil",
      "Atuação em riscos empresariais complexos",
      "Portfólio inclui Seguro Garantia empresarial",
    ],
    intro:
      "A Tokio Marine é uma seguradora global com operação relevante no Brasil e presença em diversas linhas empresariais. A Patro intermedia cotações em Seguro Garantia conforme análise da seguradora.",
    positioning:
      "A oferta da Tokio Marine em Seguro Garantia atende empresas com operações qualificadas. Cada caso é avaliado pela seguradora.",
    faqs: [
      {
        question: "A Tokio atende operações internacionais?",
        answer:
          "Sim, para determinados perfis, especialmente empresas com operações globais. A avaliação é caso a caso.",
      },
      {
        question: "É possível comparar Tokio com outras seguradoras?",
        answer:
          "Sim. A Patro estrutura cotações paralelas com as principais seguradoras parceiras.",
      },
    ],
  },
  {
    slug: "akad-seguro-garantia",
    path: "/akad-seguro-garantia",
    insurer: "Akad",
    line: "garantia",
    lineLabel: "Seguro Garantia",
    highlights: [
      "Seguradora com forte digitalização",
      "Operação em Seguro Garantia empresarial",
      "Agilidade em cotação e emissão em perfis compatíveis",
    ],
    intro:
      "A Akad atua em linhas empresariais, incluindo Seguro Garantia. A Patro Seguros submete pedidos à Akad conforme perfil da empresa e da obrigação garantida.",
    positioning:
      "A Akad tem como diferencial a experiência digital do processo. A aceitação e as condições dependem da análise da seguradora.",
    faqs: [
      {
        question: "A Akad é seguradora digital?",
        answer:
          "A Akad opera com forte apoio de tecnologia, o que costuma agilizar cotação e emissão. Isso não substitui a análise de crédito.",
      },
      {
        question: "Quando faz sentido cotar Akad?",
        answer:
          "Em quase todos os perfis vale cotar. A Patro submete o pedido à Akad em paralelo às demais seguradoras parceiras.",
      },
    ],
  },
  {
    slug: "ezze-seguro-garantia",
    path: "/ezze-seguro-garantia",
    insurer: "Ezze",
    line: "garantia",
    lineLabel: "Seguro Garantia",
    highlights: [
      "Seguradora com atuação em linhas empresariais",
      "Presença em modalidades contratuais",
      "Estrutura para operações qualificadas",
    ],
    intro:
      "A Ezze é uma seguradora que opera linhas empresariais, incluindo Seguro Garantia. A Patro Seguros intermedia cotações com a Ezze quando compatível com o perfil do risco.",
    positioning:
      "Cada cotação com a Ezze passa por análise de crédito e avaliação da operação. Não há garantia automática de aceitação.",
    faqs: [
      {
        question: "A Ezze cobre operações de médio porte?",
        answer:
          "Sim, quando o perfil está dentro da política da seguradora. A Patro submete o pedido e aguarda análise.",
      },
      {
        question: "É possível ter propostas de várias seguradoras?",
        answer:
          "Sim. A Patro trabalha com múltiplas seguradoras parceiras para comparar taxa e prazo.",
      },
    ],
  },
  {
    slug: "allianz-seguro-garantia",
    path: "/allianz-seguro-garantia",
    insurer: "Allianz",
    line: "garantia",
    lineLabel: "Seguro Garantia",
    highlights: [
      "Seguradora global com forte marca corporativa",
      "Atua em riscos empresariais complexos",
      "Portfólio inclui Seguro Garantia",
    ],
    intro:
      "A Allianz é uma seguradora global com forte presença corporativa no Brasil. Em Seguro Garantia, atua em perfis empresariais qualificados. A Patro Seguros intermedia cotações com a Allianz conforme o caso.",
    positioning:
      "A Allianz costuma ser avaliada em conjunto com outras seguradoras. A aceitação e as condições dependem da análise.",
    faqs: [
      {
        question: "Faz sentido cotar Allianz em pequenas empresas?",
        answer:
          "Vale sempre submeter em paralelo. Cada seguradora tem apetite distinto para cada perfil.",
      },
      {
        question: "A Patro cota apenas grandes contratos?",
        answer:
          "Não. Atendemos empresas de diversos portes em Seguro Garantia, das PMEs a grandes corporações.",
      },
    ],
  },
  {
    slug: "allianz-seguro-de-credito",
    path: "/allianz-seguro-de-credito",
    insurer: "Allianz",
    line: "credito",
    lineLabel: "Seguro de Crédito",
    highlights: [
      "Uma das seguradoras globais mais relevantes em Seguro de Crédito",
      "Estrutura consolidada para análise de carteira PJ",
      "Atuação em empresas de médio e grande porte",
    ],
    intro:
      "A Allianz Trade (grupo Allianz) é uma das operadoras globais de referência em Seguro de Crédito. No Brasil, atende empresas com carteira PJ estruturada. A Patro Seguros intermedia cotações conforme análise e apetite da seguradora.",
    positioning:
      "A disponibilidade da Allianz em Seguro de Crédito pode variar conforme apetite de risco, faturamento, carteira de clientes e análise técnica.",
    faqs: [
      {
        question: "A Allianz atende PMEs em Seguro de Crédito?",
        answer:
          "Existem produtos voltados a diferentes portes. A análise depende do faturamento e da carteira apresentada.",
      },
      {
        question: "Como é feita a análise da carteira?",
        answer:
          "A seguradora avalia cada cliente PJ e estabelece limites individuais. A Patro apoia a interpretação dos resultados.",
      },
    ],
  },
  {
    slug: "tokio-marine-seguro-de-credito",
    path: "/tokio-marine-seguro-de-credito",
    insurer: "Tokio Marine",
    line: "credito",
    lineLabel: "Seguro de Crédito",
    highlights: [
      "Seguradora global com portfólio empresarial abrangente",
      "Atuação em riscos corporativos e comerciais",
      "Estrutura para análise de crédito PJ",
    ],
    intro:
      "A Tokio Marine opera linhas empresariais no Brasil, e sua presença em Seguro de Crédito depende do apetite vigente e do perfil da empresa. A Patro Seguros submete a proposta para análise.",
    positioning:
      "A disponibilidade em Seguro de Crédito pode variar conforme apetite de risco, faturamento e análise técnica.",
    faqs: [
      {
        question: "Sempre é possível cotar Tokio em Crédito?",
        answer:
          "Nem sempre. O apetite pode variar. A Patro submete a proposta e retorna com o resultado.",
      },
      {
        question: "É possível combinar com outras seguradoras?",
        answer:
          "Sim. Cotamos em paralelo com as parceiras que operam a linha.",
      },
    ],
  },
  {
    slug: "porto-seguro-de-credito",
    path: "/porto-seguro-de-credito",
    insurer: "Porto",
    line: "credito",
    lineLabel: "Seguro de Crédito",
    highlights: [
      "Marca consolidada em seguros no Brasil",
      "Portfólio empresarial abrangente",
      "Atendimento nacional para PMEs e grandes contas",
    ],
    intro:
      "A Porto oferece portfólio empresarial amplo. A cobertura efetiva em Seguro de Crédito depende do apetite vigente e do perfil da empresa. A Patro apresenta a proposta e retorna com o resultado da análise.",
    positioning:
      "A disponibilidade em Seguro de Crédito pode variar conforme apetite de risco, faturamento e análise técnica.",
    faqs: [
      {
        question: "Quando a Porto é uma boa opção?",
        answer:
          "Em muitos perfis vale submeter em paralelo com outras seguradoras. A Patro compara as propostas.",
      },
      {
        question: "O produto exige integração?",
        answer:
          "Sim, é preciso comunicar vendas conforme regras da apólice. A Patro apoia a implantação operacional.",
      },
    ],
  },
  {
    slug: "akad-seguro-de-credito",
    path: "/akad-seguro-de-credito",
    insurer: "Akad",
    line: "credito",
    lineLabel: "Seguro de Crédito",
    highlights: [
      "Seguradora com forte apoio tecnológico",
      "Ativa em linhas empresariais",
      "Foco em experiência digital",
    ],
    intro:
      "A Akad atua em linhas empresariais e pode operar Seguro de Crédito conforme o apetite vigente. A Patro Seguros submete a proposta para análise e retorna com o resultado.",
    positioning:
      "A disponibilidade em Seguro de Crédito pode variar conforme apetite de risco, faturamento, carteira de clientes e análise técnica.",
    faqs: [
      {
        question: "A Akad tem produto próprio de Crédito?",
        answer:
          "A oferta depende do momento. A Patro consulta a seguradora ao submeter o pedido.",
      },
      {
        question: "Cotamos apenas com Akad?",
        answer:
          "Não é obrigatório. A Patro cota em paralelo com outras seguradoras parceiras.",
      },
    ],
  },
  {
    slug: "ezze-seguro-de-credito",
    path: "/ezze-seguro-de-credito",
    insurer: "Ezze",
    line: "credito",
    lineLabel: "Seguro de Crédito",
    highlights: [
      "Seguradora com atuação em linhas empresariais",
      "Presença em riscos corporativos",
      "Estrutura para atender operações qualificadas",
    ],
    intro:
      "A Ezze opera linhas empresariais no Brasil e pode ofertar Seguro de Crédito conforme apetite e perfil da empresa. A Patro Seguros submete a proposta para análise.",
    positioning:
      "A disponibilidade em Seguro de Crédito pode variar conforme apetite de risco, faturamento, carteira de clientes e análise técnica.",
    faqs: [
      {
        question: "A Ezze aceita PMEs?",
        answer:
          "Depende do produto vigente e do perfil da empresa. A Patro submete a proposta e retorna com o resultado.",
      },
      {
        question: "Faz sentido cotar mais de uma seguradora?",
        answer:
          "Sim. A Patro compara propostas para escolher a melhor relação custo × cobertura.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// FAQs comuns dos hubs
// ---------------------------------------------------------------------------

export const B2B_HUB_FAQS: B2bFaq[] = [
  {
    question: "Qual a diferença entre Seguro Garantia e Seguro de Crédito?",
    answer:
      "Seguro Garantia garante o cumprimento de obrigações contratuais, licitatórias ou judiciais. Seguro de Crédito protege a empresa contra inadimplência de clientes PJ em vendas a prazo. São produtos distintos, com finalidades diferentes.",
  },
  {
    question: "A Patro atende empresas fora de Guarulhos?",
    answer:
      "Sim. A Patro é sediada em Guarulhos/SP, mas atende empresas em todo o Brasil nas linhas de Seguro Garantia e Seguro de Crédito.",
  },
  {
    question: "Quais seguradoras vocês cotam?",
    answer:
      "Trabalhamos com Pottencial, Junto Seguros, Porto, Tokio Marine, Akad, Ezze e Allianz em Seguro Garantia, além de operações de Crédito com parceiras compatíveis. A disponibilidade varia por operação.",
  },
  {
    question: "A cotação tem custo?",
    answer:
      "Não. A consultoria da Patro é gratuita para a empresa contratante. Nossa remuneração vem da corretagem paga pela seguradora, dentro das regras de mercado.",
  },
  {
    question: "Quanto tempo demora a análise?",
    answer:
      "Depende da modalidade, do valor e da documentação enviada. Operações simples podem sair em poucos dias úteis; operações complexas levam mais tempo em função da análise de crédito da seguradora.",
  },
];

export const GARANTIA_HUB_FAQS: B2bFaq[] = [
  {
    question: "O que é Seguro Garantia?",
    answer:
      "É uma modalidade que pode ser utilizada para garantir o cumprimento de obrigações assumidas em contratos, licitações, processos judiciais ou administrativos, conforme condições da apólice e exigências do contratante.",
  },
  {
    question: "O Seguro Garantia substitui fiança bancária?",
    answer:
      "Pode substituir em muitos casos, quando o edital ou contrato prevê a modalidade. A substituição depende sempre das regras da operação e da análise da seguradora.",
  },
  {
    question: "Quais tipos de Seguro Garantia existem?",
    answer:
      "Os mais comuns são: licitação (bid bond e performance), contratual, judicial, adiantamento de pagamento, retenção de pagamento, execução, construção civil, prestação de serviços e fornecedores.",
  },
  {
    question: "Quais documentos são necessários?",
    answer:
      "Documentação societária, contrato ou edital, balanços recentes, faturamento e certidões negativas. A lista final varia por seguradora e por porte da operação.",
  },
  {
    question: "Qual o prazo para emissão?",
    answer:
      "Depende da análise de crédito da seguradora e do porte da operação. Casos simples podem ser emitidos em dias úteis; operações complexas requerem prazo maior.",
  },
];

export const CREDITO_HUB_FAQS: B2bFaq[] = [
  {
    question: "O que é Seguro de Crédito?",
    answer:
      "É uma solução voltada para empresas que vendem a prazo e desejam proteção contra o risco de não pagamento por parte de seus clientes PJ, conforme análise de crédito, limites aprovados e condições da apólice.",
  },
  {
    question: "Quais empresas costumam contratar?",
    answer:
      "Indústrias, distribuidores, atacadistas, importadoras, exportadoras e demais empresas com carteira relevante de clientes PJ que vendem a prazo.",
  },
  {
    question: "O Seguro de Crédito cobre calote de qualquer cliente?",
    answer:
      "Cobre inadimplência de clientes PJ dentro dos limites analisados e aprovados pela seguradora, respeitando franquia, carência e demais condições da apólice.",
  },
  {
    question: "É o mesmo que empresa de cobrança?",
    answer:
      "Não. O Seguro de Crédito é um seguro. Ele pode incluir apoio à cobrança em atraso, mas seu papel principal é indenizar em caso de inadimplência prolongada, conforme a apólice.",
  },
  {
    question: "Quanto custa?",
    answer:
      "Geralmente é calculado como um percentual do faturamento a prazo protegido, ajustado por risco. Varia por seguradora, perfil da empresa e composição da carteira.",
  },
];

export const getIntentPage = (slug: string) =>
  [...GARANTIA_INTENT_PAGES, ...CREDITO_INTENT_PAGES].find((p) => p.slug === slug)!;

export const getInsurerPage = (slug: string) =>
  B2B_INSURER_PAGES.find((p) => p.slug === slug)!;