export type GuiaLevel = "Básico" | "Intermediário" | "Avançado";

export interface GuiaCard {
  title: string;
  description: string;
  level: GuiaLevel;
  readTime: string;
  href: string;
  cta?: string;
}

export interface GuiaBlock {
  id: string;
  title: string;
  intro: string;
  cards: GuiaCard[];
}

export const guiasBlocks: GuiaBlock[] = [
  {
    id: "guias-aprofundados",
    title: "Guias Aprofundados Patro Seguros",
    intro: "Guias editoriais completos (2.000+ palavras) revisados por especialistas, com resposta rápida, FAQ e schemas otimizados para busca e IAs.",
    cards: [
      { title: "Seguro Auto em Guarulhos", description: "Coberturas, franquia, preço, seguradoras e assistência 24h para veículos particulares e de app.", level: "Básico", readTime: "16 min", href: "/guias/seguro-auto-guarulhos" },
      { title: "Seguro Empresarial em Guarulhos", description: "Multirrisco para PME, indústria, comércio e galpão — incêndio, RC, danos elétricos e lucros cessantes.", level: "Intermediário", readTime: "18 min", href: "/guias/seguro-empresarial-guarulhos" },
      { title: "Planos de Saúde em Guarulhos", description: "Comparativo de operadoras, carência, coparticipação, reembolso, reajuste e portabilidade ANS.", level: "Intermediário", readTime: "17 min", href: "/guias/plano-de-saude-guarulhos" },
      { title: "Consórcio em Guarulhos", description: "Carta de crédito, sorteio, lance, taxas e regras do Banco Central para imóveis, veículos e serviços.", level: "Básico", readTime: "14 min", href: "/guias/consorcio-guarulhos" },
      { title: "Seguro de Vida", description: "Coberturas, capital ideal, beneficiários, individual x grupo e planejamento sucessório.", level: "Intermediário", readTime: "15 min", href: "/guias/seguro-vida" },
      { title: "Seguro Residencial em Guarulhos", description: "Casa, apartamento e imóvel alugado — danos elétricos, roubo, RC familiar e assistência 24h.", level: "Básico", readTime: "13 min", href: "/guias/seguro-residencial-guarulhos" },
      { title: "Seguros para Consultórios e Clínicas", description: "RC Profissional, equipamentos, patrimonial, cyber e lucros cessantes para clínicas de saúde.", level: "Intermediário", readTime: "14 min", href: "/guias/seguros-para-consultorios" },
      { title: "Seguro Garantia", description: "Licitação, contratual, judicial e substituição de fiança bancária pela Lei 14.133/2021.", level: "Avançado", readTime: "15 min", href: "/guias/seguro-garantia" },
      { title: "Seguro de Crédito", description: "Proteção contra inadimplência B2B interna e exportação — reduz PDD e viabiliza financiamento.", level: "Avançado", readTime: "14 min", href: "/guias/seguro-de-credito" },
      { title: "Seguro Cyber", description: "Ransomware, vazamento de dados, LGPD, fraude eletrônica e interrupção de negócio.", level: "Avançado", readTime: "14 min", href: "/guias/seguro-cyber" },
      { title: "Seguro Transporte e Cargas", description: "RCTR-C, RCF-DC, RCTR-VI e cobertura do embarcador — nacional e internacional via Cumbica.", level: "Avançado", readTime: "15 min", href: "/guias/seguro-transporte-cargas" },
      { title: "Patro Private", description: "Proteção patrimonial premium — HNW, D&O, kidnap, arte, náutico, aeronaves e cobertura mundial.", level: "Avançado", readTime: "13 min", href: "/guias/patro-private" },
    ],
  },
  {
    id: "voce-familia",
    title: "Seguros para Você e Família",
    intro: "Proteção pessoal, familiar, patrimonial e do dia a dia — de auto e residência a vida, viagem e acidentes pessoais.",
    cards: [
      { title: "Seguro Auto", description: "Roubo, colisão, terceiros, assistência 24h e coberturas adicionais para carros de passeio, elétricos e premium.", level: "Básico", readTime: "12 min", href: "/seguro-auto" },
      { title: "Seguro Residencial", description: "Casa, apartamento, flat, imóvel alugado — incêndio, danos elétricos, roubo, RC familiar e assistência.", level: "Básico", readTime: "10 min", href: "/seguro-residencial" },
      { title: "Seguro de Vida", description: "Proteção familiar, morte, invalidez, doenças graves, diária por incapacidade e planejamento sucessório.", level: "Intermediário", readTime: "12 min", href: "/seguro-vida" },
      { title: "Seguro Viagem", description: "Assistência médica, bagagem, cancelamento e coberturas para viagens nacionais e internacionais.", level: "Básico", readTime: "8 min", href: "/seguro-viagem" },
      { title: "Seguro Acidentes Pessoais", description: "Morte acidental, invalidez e diária por incapacidade — pessoal ou coletivo.", level: "Básico", readTime: "8 min", href: "/seguro-acidentes-pessoais" },
    ],
  },
  {
    id: "empresas",
    title: "Seguros para Empresas",
    intro: "Proteção patrimonial, responsabilidade civil, operações, frota, transporte, cyber e vida em grupo para pequenas, médias e grandes empresas.",
    cards: [
      { title: "Seguro Empresarial", description: "Multirrisco para comércio, escritório, clínica, indústria e prestadores — incêndio, roubo, danos elétricos, RC e equipamentos.", level: "Intermediário", readTime: "14 min", href: "/seguro-empresarial" },
      { title: "Seguro para Galpões", description: "Galpões industriais e logísticos em Guarulhos, Cumbica e região — incêndio, roubo, cargas e RC.", level: "Avançado", readTime: "12 min", href: "/seguro-galpao" },
      { title: "Seguro de Frota", description: "Cobertura para 4+ veículos com gestão simplificada, RC ampliada e assistência 24h.", level: "Intermediário", readTime: "10 min", href: "/seguro-frota" },
      { title: "Seguro Transporte e Cargas", description: "Embarcador, transportador, RCTR-C, RCF-DC, cargas nacionais e internacionais.", level: "Avançado", readTime: "12 min", href: "/seguro-transporte" },
      { title: "Seguro Vida em Grupo (PME)", description: "Vida coletivo para retenção e benefícios — morte, invalidez, doenças graves e assistência funeral.", level: "Intermediário", readTime: "9 min", href: "/seguro-vida-pme" },
    ],
  },
  {
    id: "saude",
    title: "Planos de Saúde",
    intro: "Planos individuais, familiares, MEI, PME e empresariais — com comparação de operadoras, rede credenciada em Guarulhos e regras da ANS.",
    cards: [
      { title: "Planos de Saúde em Guarulhos", description: "Hub principal com operadoras parceiras, hospitais e boas práticas de escolha.", level: "Básico", readTime: "12 min", href: "/plano-de-saude-guarulhos" },
      { title: "Plano Empresarial (PME)", description: "Planos com 2 a 99 vidas, tabelas, carências, coparticipação e portabilidade.", level: "Intermediário", readTime: "10 min", href: "/plano-saude-empresarial" },
      { title: "Como comparar operadoras", description: "Rede credenciada, carência, coparticipação, reembolso e reajuste — critérios objetivos.", level: "Intermediário", readTime: "9 min", href: "/como-comparar-seguradoras-guarulhos" },
      { title: "Plano Odontológico", description: "Individual, familiar, empresarial e coletivo por adesão.", level: "Básico", readTime: "7 min", href: "/seguro-odonto" },
    ],
  },
  {
    id: "consorcios",
    title: "Consórcios",
    intro: "Consórcios de imóveis, veículos, caminhões, galpões e serviços — regulados pelo Banco Central, sem juros de financiamento.",
    cards: [
      { title: "Consórcio", description: "Como funciona, carta de crédito, sorteio, lance, taxa de administração e fundo de reserva.", level: "Básico", readTime: "10 min", href: "/consorcio" },
      { title: "Consórcio de Imóveis", description: "Casa, apartamento, terreno, imóvel comercial ou galpão.", level: "Intermediário", readTime: "9 min", href: "/consorcio-imoveis" },
      { title: "Consórcio de Veículos", description: "Carros, motos, caminhões e utilitários.", level: "Básico", readTime: "8 min", href: "/consorcio-carro" },
      { title: "Consórcio Empresarial", description: "Máquinas, equipamentos, veículos e imóveis para empresas.", level: "Intermediário", readTime: "9 min", href: "/consorcio-veiculos-pesados" },
    ],
  },
  {
    id: "especializados",
    title: "Seguros Especializados",
    intro: "Garantia, crédito, cyber, ambiental, D&O, E&O e outras coberturas específicas para operações mais complexas.",
    cards: [
      { title: "Seguro Garantia", description: "Licitação, contratual, judicial e substituição de fiança bancária/caução.", level: "Avançado", readTime: "12 min", href: "/seguro-garantia" },
      { title: "Seguro de Crédito", description: "Proteção contra inadimplência em vendas a prazo B2B — nacional e exportação.", level: "Avançado", readTime: "11 min", href: "/seguro-credito-empresarial-guarulhos" },
      { title: "Seguro Cyber", description: "Ataques, vazamentos, LGPD, ransomware e resposta a incidentes.", level: "Avançado", readTime: "12 min", href: "/seguro-cyber" },
      { title: "Seguro Ambiental", description: "Passivos ambientais, poluição súbita e gradual para atividades de risco.", level: "Avançado", readTime: "10 min", href: "/seguro-ambiental" },
      { title: "RC Profissional (E&O)", description: "Cobertura para erros e omissões em serviços técnicos e consultivos.", level: "Avançado", readTime: "10 min", href: "/seguro-rc-profissional" },
    ],
  },
  {
    id: "perfis",
    title: "Guias por Perfil",
    intro: "Materiais direcionados a nichos específicos que atendemos com frequência.",
    cards: [
      { title: "Consultórios e Clínicas", description: "Médico, odontológico, veterinário, estética — equipamentos, RC Profissional, cyber e lucros cessantes.", level: "Intermediário", readTime: "10 min", href: "/seguro-consultorio-guarulhos" },
      { title: "Motorista de App", description: "Auto para Uber, 99 e apps — cobertura ampliada e assistência 24h.", level: "Básico", readTime: "8 min", href: "/seguro-motorista-app" },
      { title: "Vistoriadora Veicular", description: "ECVs, laudo cautelar, perícia e inspeção automotiva.", level: "Intermediário", readTime: "10 min", href: "/seguro-vistoriadora-veicular" },
      { title: "Patro Private", description: "Proteção patrimonial premium para empresários, executivos e famílias de alta renda.", level: "Avançado", readTime: "12 min", href: "/patro-private" },
    ],
  },
  {
    id: "glossario",
    title: "Glossário de Seguros",
    intro: "Termos técnicos explicados de forma simples, com exemplos práticos e links para os guias.",
    cards: [
      { title: "Glossário completo", description: "Apólice, prêmio, franquia, sinistro, endosso, cobertura, carência, coparticipação, RC, D&O, E&O, RCTR-C e mais.", level: "Básico", readTime: "15 min", href: "/glossario-seguros" },
    ],
  },
  {
    id: "materiais",
    title: "Checklists e Materiais Gratuitos",
    intro: "Checklists para preparar renovação, contratação e revisão anual — pessoais e empresariais.",
    cards: [
      { title: "Central de Materiais Gratuitos", description: "Checklists de auto, empresarial, saúde, consórcio, consultório, galpão, frota, cyber e imóveis.", level: "Básico", readTime: "5 min", href: "/materiais-gratuitos-seguros" },
    ],
  },
  {
    id: "faq",
    title: "Perguntas Frequentes",
    intro: "Central de FAQ com respostas rápidas por tema — auto, empresarial, saúde, consórcio, vida, garantia, crédito, cyber e mais.",
    cards: [
      { title: "Central de Perguntas Frequentes", description: "Dúvidas comuns sobre seguros, planos e consórcios com respostas objetivas.", level: "Básico", readTime: "10 min", href: "/perguntas-frequentes-seguros" },
    ],
  },
];