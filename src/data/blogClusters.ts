/**
 * Cluster hubs editoriais do blog.
 *
 * Cada cluster agrupa artigos por intenção de busca, com texto local
 * (Guarulhos/Cumbica/Cidade Maia), CTAs comerciais e FAQ próprio.
 * Renderizado por `src/pages/BlogCluster.tsx` na rota
 * `/blog/cluster/:cluster`.
 */

export interface BlogClusterCTA {
  label: string;
  href: string;
  variant?: "primary" | "outline";
}

export interface BlogClusterLink {
  label: string;
  href: string;
  description?: string;
}

export interface BlogClusterFAQ {
  question: string;
  answer: string;
}

export interface BlogCluster {
  slug: string;
  categoryFilter: string; // deve casar com `article.category`
  eyebrow: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  localAngle: string;
  intentSections: {
    heading: string;
    body: string;
    ctas: BlogClusterCTA[];
  }[];
  relatedPages: BlogClusterLink[];
  faqs: BlogClusterFAQ[];
  primaryCTA: BlogClusterCTA;
  whatsappText: string;
}

export const BLOG_CLUSTERS: BlogCluster[] = [
  {
    slug: "seguro-auto",
    categoryFilter: "Seguro Auto",
    eyebrow: "Cluster editorial · Seguro Auto",
    title: "Seguro Auto em Guarulhos",
    h1: "Blog Seguro Auto em Guarulhos — guias, preços e economia",
    metaTitle: "Blog Seguro Auto em Guarulhos | Patro Seguros",
    metaDescription:
      "Guias, comparativos de preço por bairro (Cumbica, Cidade Maia, Vila Galvão), franquia e carro reserva. Cotação de seguro auto em Guarulhos com a Patro.",
    intro:
      "Guarulhos tem índices de roubo e furto acima da média da Grande São Paulo, especialmente na região de Cumbica, Centro e Pimentas. Por isso, o mesmo carro pode ter até 40% de diferença de preço entre seguradoras — e a escolha da cobertura certa (compreensiva, terceiros, franquia reduzida) faz enorme diferença no bolso.",
    localAngle:
      "Nossos guias analisam preço médio por CEP em Guarulhos, comportamento por bairro, carros mais roubados na região e coberturas obrigatórias para motoristas de aplicativo (Uber/99) que operam no Aeroporto de Cumbica.",
    intentSections: [
      {
        heading: "Quero saber quanto custa",
        body:
          "Compare preço médio por modelo e bairro antes de fechar. Nosso estudo local analisa Corolla, Hilux, HR-V, Compass, GWM Haval H6, BYD Dolphin e outros modelos populares em Guarulhos.",
        ctas: [
          { label: "Cotar seguro auto em 2 min", href: "/cotacao/auto", variant: "primary" },
          { label: "Ver preços por bairro", href: "/blog/estudo-custo-seguro-auto-guarulhos-bairros-2026", variant: "outline" },
        ],
      },
      {
        heading: "Quero entender coberturas e franquia",
        body:
          "Compreensiva x terceiros, franquia reduzida x majorada, carro reserva, assistência 24h: escolher errado pode custar milhares em um sinistro. Nossos guias explicam com exemplos reais.",
        ctas: [
          { label: "Comparar coberturas", href: "/seguro-auto/comparativo-coberturas", variant: "outline" },
          { label: "Falar com consultor", href: "/contato", variant: "outline" },
        ],
      },
    ],
    relatedPages: [
      { label: "Seguro Auto em Guarulhos", href: "/seguro-auto-guarulhos", description: "Página comercial com cotação local" },
      { label: "Seguro Auto — pilar nacional", href: "/seguro-auto" },
      { label: "Seguro Moto Guarulhos", href: "/seguro-moto-guarulhos" },
      { label: "Seguro Frota PME", href: "/seguro-frota" },
    ],
    faqs: [
      {
        question: "Por que o seguro auto em Guarulhos costuma ser mais caro?",
        answer:
          "Guarulhos concentra alto volume de tráfego, proximidade com o Aeroporto de Cumbica e índices elevados de roubo/furto em bairros como Centro, Pimentas, Bonsucesso e São João. Seguradoras precificam esse risco no CEP.",
      },
      {
        question: "Vale a pena contratar com franquia reduzida em Guarulhos?",
        answer:
          "Depende do uso. Motoristas urbanos com uso diário e trajetos em regiões com mais sinistros normalmente economizam com franquia reduzida; quem roda pouco pode preferir franquia normal e prêmio menor.",
      },
      {
        question: "A Patro atende motorista de aplicativo (Uber/99)?",
        answer:
          "Sim. Cotamos seguro auto com cobertura para uso profissional em app, RC para passageiros e coberturas específicas para quem roda em Cumbica, Centro e Marginal Tietê.",
      },
    ],
    primaryCTA: { label: "Cotar meu seguro auto agora", href: "/cotacao/auto", variant: "primary" },
    whatsappText: "Ol%C3%A1%2C+vi+o+cluster+Seguro+Auto+no+blog+da+Patro+e+quero+uma+cota%C3%A7%C3%A3o.",
  },
  {
    slug: "seguro-empresarial",
    categoryFilter: "Seguro Empresarial",
    eyebrow: "Cluster editorial · Seguro Empresarial",
    title: "Seguro Empresarial em Guarulhos",
    h1: "Blog Seguro Empresarial em Guarulhos — PMEs, galpões e logística",
    metaTitle: "Blog Seguro Empresarial Guarulhos | Patro Seguros",
    metaDescription:
      "Guias de seguro empresarial para lojistas, PMEs, galpões em Cumbica, empresas de vistoria e clínicas em Guarulhos. Coberturas, preços e checklists.",
    intro:
      "Guarulhos é o segundo maior polo empresarial de São Paulo, com galpões em Cumbica, shopping Internacional/Maia, transportadoras e centenas de PMEs. Um seguro empresarial mal contratado deixa o negócio exposto a incêndio, roubo de estoque, RC e paralisação.",
    localAngle:
      "Cobrimos vertentes específicas do ecossistema local: galpões logísticos em Cumbica, lojistas de shopping em Guarulhos, empresas de vistoria (ECVs) credenciadas pelo Detran-SP, clínicas veterinárias e frotas comerciais.",
    intentSections: [
      {
        heading: "Quero proteger meu galpão / estoque",
        body:
          "Galpões em Cumbica exigem coberturas de incêndio, roubo, danos elétricos e lucros cessantes. Vazamentos e blackouts são frequentes na região do aeroporto.",
        ctas: [
          { label: "Cotar seguro empresarial", href: "/cotacao/empresarial", variant: "primary" },
          { label: "Seguro Galpão Cumbica", href: "/seguro-galpao-cumbica", variant: "outline" },
        ],
      },
      {
        heading: "Sou lojista / PME em shopping",
        body:
          "Shoppings de Guarulhos exigem seguro obrigatório com valores mínimos. Cobrimos vidros, RC, roubo, incêndio e lucros cessantes com preço PME.",
        ctas: [
          { label: "Cotar seguro lojista", href: "/cotacao/empresarial", variant: "primary" },
          { label: "Seguro Empresarial PME", href: "/seguros-empresariais-pme-guarulhos", variant: "outline" },
        ],
      },
    ],
    relatedPages: [
      { label: "Seguro Empresarial em Guarulhos", href: "/seguro-empresarial-guarulhos" },
      { label: "Seguros Empresariais PME", href: "/seguros-empresariais-pme-guarulhos" },
      { label: "Seguro Frota — Empresas", href: "/seguro-frota-empresas-guarulhos" },
      { label: "Seguro Cyber", href: "/seguro-cyber" },
      { label: "RC Profissional", href: "/seguro-rc-profissional" },
    ],
    faqs: [
      {
        question: "Qual seguro é obrigatório para lojistas em shopping em Guarulhos?",
        answer:
          "A maioria dos shoppings (Internacional, Maia, Bonsucesso, Parque Shopping) exige apólice com RC mínimo, incêndio e vidros. Os limites variam por shopping — nosso time envia o comparativo pronto.",
      },
      {
        question: "Meu galpão em Cumbica precisa de cobertura especial?",
        answer:
          "Recomendado. A proximidade com o Aeroporto de Cumbica, o tráfego pesado e a alta densidade logística elevam risco de incêndio, roubo de carga estacionada e danos elétricos.",
      },
      {
        question: "A Patro atende empresas de vistoria (ECV)?",
        answer:
          "Sim. Estruturamos seguros para ECVs credenciadas ao Detran-SP: RC profissional, cyber (proteção de dados de clientes), patrimonial e vida em grupo para equipe.",
      },
    ],
    primaryCTA: { label: "Cotar seguro da minha empresa", href: "/cotacao/empresarial", variant: "primary" },
    whatsappText: "Ol%C3%A1%2C+preciso+cotar+seguro+empresarial+em+Guarulhos.",
  },
  {
    slug: "plano-de-saude",
    categoryFilter: "Plano de Saúde",
    eyebrow: "Cluster editorial · Plano de Saúde",
    title: "Plano de Saúde em Guarulhos",
    h1: "Blog Plano de Saúde em Guarulhos — MEI, PME e empresarial",
    metaTitle: "Blog Plano de Saúde Guarulhos | Patro Seguros",
    metaDescription:
      "Comparativos de plano de saúde MEI e empresarial em Guarulhos: carência, coberturas, tabelas, odonto e como reduzir turnover.",
    intro:
      "Plano de saúde é o benefício mais valorizado por colaboradores em Guarulhos. Para MEIs, PMEs e empresas com 2+ vidas, existem tabelas exclusivas com preço muito abaixo do individual — e a escolha entre operadoras regionais e nacionais impacta rede credenciada e reembolso.",
    localAngle:
      "Trabalhamos com 20+ operadoras que atendem Guarulhos: SulAmérica, Bradesco Saúde, Amil, Hapvida, Notre Dame Intermédica, Unimed e regionais. Comparamos rede credenciada por bairro (Centro, Cidade Maia, Bonsucesso) e hospital de referência.",
    intentSections: [
      {
        heading: "Sou MEI e quero plano com preço acessível",
        body:
          "Existem tabelas MEI a partir de 1 vida em Guarulhos, com CNAE compatível e regras específicas. Comparamos preço e rede em minutos.",
        ctas: [
          { label: "Simular plano MEI", href: "/cotacao/saude", variant: "primary" },
          { label: "Guia Plano MEI Guarulhos", href: "/blog/plano-saude-mei-guarulhos-tabelas-regras", variant: "outline" },
        ],
      },
      {
        heading: "Sou empresa (2+ vidas) e quero benefícios",
        body:
          "Planos empresariais em Guarulhos reduzem turnover e melhoram atração de talento. Estruturamos combo saúde + odonto + vida em grupo com preço PME.",
        ctas: [
          { label: "Cotar plano empresarial", href: "/cotacao/saude", variant: "primary" },
          { label: "Comparativo PME Guarulhos", href: "/comparativo-planos-saude-guarulhos", variant: "outline" },
        ],
      },
    ],
    relatedPages: [
      { label: "Planos de Saúde", href: "/planos-de-saude" },
      { label: "Plano de Saúde Guarulhos", href: "/plano-saude-guarulhos" },
      { label: "Seguro Odonto", href: "/seguro-odonto" },
      { label: "Seguro de Vida em grupo", href: "/seguro-vida" },
    ],
    faqs: [
      {
        question: "MEI consegue plano de saúde em Guarulhos?",
        answer:
          "Sim. Diversas operadoras aceitam MEI ativo com pelo menos 6 meses de CNPJ, CNAE compatível e comprovação de faturamento mínimo. Preço fica muito abaixo do plano individual.",
      },
      {
        question: "Qual a diferença entre plano coletivo por adesão e empresarial?",
        answer:
          "Coletivo por adesão é vinculado a entidade de classe; empresarial exige CNPJ e vínculo com a empresa. Em Guarulhos, o empresarial costuma ter reajuste mais previsível e rede maior.",
      },
      {
        question: "Quanto tempo demora para contratar?",
        answer:
          "Do envio da documentação à emissão: entre 3 e 10 dias úteis, dependendo da operadora. Enviamos as opções em até 24h úteis.",
      },
    ],
    primaryCTA: { label: "Simular plano de saúde", href: "/cotacao/saude", variant: "primary" },
    whatsappText: "Ol%C3%A1%2C+quero+simular+plano+de+sa%C3%BAde+em+Guarulhos.",
  },
  {
    slug: "consorcio",
    categoryFilter: "Consórcio",
    eyebrow: "Cluster editorial · Consórcio",
    title: "Consórcio em Guarulhos",
    h1: "Blog Consórcio em Guarulhos — imóveis, veículos e patrimônio",
    metaTitle: "Blog Consórcio em Guarulhos | Patro Seguros",
    metaDescription:
      "Guias de consórcio imobiliário, veículos, elétricos e planejamento patrimonial em Guarulhos. Como funciona, contemplação e vantagens.",
    intro:
      "Consórcio é a via mais racional para conquistar imóvel ou veículo em Guarulhos sem juros bancários. Com valorização recente da Cidade Maia, Vila Rosália e bairros próximos a Cumbica, o consórcio imobiliário virou instrumento de crescimento patrimonial de médio prazo.",
    localAngle:
      "Analisamos as principais administradoras que operam em Guarulhos (Porto, Bradesco, Rodobens, Embracon, Ademicon) e ajudamos a escolher a carta certa por perfil — imóvel na Cidade Maia, primeiro carro, veículo elétrico ou frota executiva.",
    intentSections: [
      {
        heading: "Quero comprar imóvel via consórcio",
        body:
          "Cartas de crédito imobiliário em Guarulhos permitem ampliar, reformar, construir ou comprar. Sem juros, com lance embutido e carta corrigida pelo INCC.",
        ctas: [
          { label: "Falar sobre consórcio de imóveis", href: "/cotacao/consorcio", variant: "primary" },
          { label: "Consórcio Imóveis Guarulhos", href: "/consorcio-imoveis", variant: "outline" },
        ],
      },
      {
        heading: "Quero trocar de carro sem juros",
        body:
          "Consórcio de veículos leves, elétricos ou pesados. Ideal para quem quer previsibilidade orçamentária e não tem pressa por 6–18 meses.",
        ctas: [
          { label: "Cotar consórcio de veículos", href: "/cotacao/consorcio", variant: "primary" },
          { label: "Consórcio de Carro", href: "/consorcio-carro", variant: "outline" },
        ],
      },
    ],
    relatedPages: [
      { label: "Consórcio — visão geral", href: "/consorcio" },
      { label: "Consórcio em Guarulhos", href: "/consorcio-guarulhos" },
      { label: "Consórcio de Imóveis", href: "/consorcio-imoveis" },
      { label: "Consórcio de Veículos Pesados", href: "/consorcio-veiculos-pesados" },
    ],
    faqs: [
      {
        question: "Consórcio vale a pena para comprar imóvel em Guarulhos?",
        answer:
          "Sim, quando o comprador tem horizonte de 6 a 36 meses e busca a menor taxa efetiva total. Em Guarulhos, com valorização recente, o consórcio protege do crédito bancário caro.",
      },
      {
        question: "Quais são as principais administradoras que atendem Guarulhos?",
        answer:
          "Porto, Bradesco, Rodobens, Embracon e Ademicon têm forte presença local, cada uma com prazos, taxas e regras de lance diferentes. Comparamos as 5 no mesmo relatório.",
      },
      {
        question: "Posso usar FGTS no consórcio de imóveis?",
        answer:
          "Sim, para ofertar lance ou quitar parcelas após a contemplação, obedecidas as regras do FGTS e do imóvel de destino.",
      },
    ],
    primaryCTA: { label: "Falar sobre consórcio", href: "/cotacao/consorcio", variant: "primary" },
    whatsappText: "Ol%C3%A1%2C+quero+entender+cons%C3%B3rcio+em+Guarulhos.",
  },
];

export const BLOG_CLUSTER_SLUGS = BLOG_CLUSTERS.map(c => c.slug);

export function getBlogCluster(slug: string | undefined): BlogCluster | undefined {
  if (!slug) return undefined;
  return BLOG_CLUSTERS.find(c => c.slug === slug);
}