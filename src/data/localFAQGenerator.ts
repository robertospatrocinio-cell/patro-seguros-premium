import type { LocalFAQ } from "@/components/LocalPageTemplate";

/**
 * Gerador de FAQ local hyper-segmentado por slug + bairro + produto.
 *
 * Objetivo: produzir ≥ 6 perguntas e respostas únicas por página local,
 * satisfazendo o contrato do `LocalPageTemplate` (FAQ ≥ 5) sem precisar
 * escrever Q&A à mão para cada bairro/produto.
 *
 * Uso:
 *   const faqs = generateLocalFAQs({
 *     slug: "seguro-auto-vila-galvao",
 *     neighborhood: "Vila Galvão",
 *     product: "auto",
 *     riskLevel: "baixo",
 *     priceRange: "R$ 2.300 a R$ 4.200/ano",
 *     reference: "próxima ao Parque Cecap",
 *   });
 */

export type LocalProduct =
  | "auto"
  | "moto"
  | "residencial"
  | "vida"
  | "saude"
  | "saude-mei"
  | "empresarial"
  | "consorcio"
  | "uber";

export type LocalRiskLevel = "baixo" | "médio" | "médio-alto" | "alto";

export interface GenerateLocalFAQInput {
  /** Slug canônico da página (usado em logs e como chave de unicidade). */
  slug: string;
  /** Bairro alvo (ex.: "Vila Galvão"). */
  neighborhood: string;
  /** Cidade (default: "Guarulhos"). */
  city?: string;
  /** Produto principal vendido na página. */
  product: LocalProduct;
  /** Perfil de risco do CEP (afeta resposta sobre rastreador/franquia). */
  riskLevel?: LocalRiskLevel;
  /** Faixa de preço típica (ex.: "R$ 2.300 a R$ 4.200/ano"). */
  priceRange?: string;
  /** Referência geográfica (ex.: "próximo ao Shopping Maia"). */
  reference?: string;
  /** Quantidade de seguradoras parceiras (default: 9). */
  insurersCount?: number;
  /** Lista personalizada de seguradoras (default: linha padrão Patro). */
  insurersLabel?: string;
  /** Q&A adicionais que serão acrescentadas ao final (sobrescreve duplicatas pela `question`). */
  extras?: LocalFAQ[];
}

const DEFAULT_CITY = "Guarulhos";
const DEFAULT_INSURERS = 9;
const DEFAULT_INSURERS_LABEL =
  "Porto Seguro, Allianz, HDI, Tokio Marine, Bradesco, SulAmérica, Liberty, Mapfre e Azul Seguros";

 export const PRODUCT_LABEL: Record<LocalProduct, string> = {
   auto: "seguro auto",
   moto: "seguro moto",
   residencial: "seguro residencial",
   vida: "seguro de vida",
   saude: "plano de saúde",
   "saude-mei": "plano de saúde MEI",
   empresarial: "seguro empresarial",
   consorcio: "consórcio",
   uber: "seguro para Uber/99",
 };

/** Resposta condicionada a risco do CEP — só faz sentido para produtos veiculares/patrimoniais. */
const RISK_PRODUCTS: LocalProduct[] = ["auto", "moto", "uber", "residencial", "empresarial"];

/* ---------- Builders por produto ---------- */

type Ctx = Required<Pick<GenerateLocalFAQInput, "neighborhood" | "city" | "product">> & {
  riskLevel: LocalRiskLevel;
  priceRange: string;
  reference: string;
  insurersCount: number;
  insurersLabel: string;
  productLabel: string;
};

const baseFAQs = (c: Ctx): LocalFAQ[] => [
  {
    question: `Quanto custa ${c.productLabel} no ${c.neighborhood}, ${c.city}?`,
    answer: `O ${c.productLabel} no ${c.neighborhood} fica, em média, ${c.priceRange}. O valor exato depende do perfil contratante, dos itens cobertos e da seguradora escolhida — solicite cotação grátis com a Patro Seguros para receber o comparativo entre ${c.insurersCount} seguradoras parceiras (${c.insurersLabel}).`,
  },
  {
    question: `Quais seguradoras atendem o ${c.neighborhood} em ${c.city}?`,
    answer: `Todas as ${c.insurersCount} seguradoras parceiras da Patro atendem o ${c.neighborhood}: ${c.insurersLabel}. Cada uma precifica o CEP do bairro de forma diferente — por isso o comparativo é essencial para evitar pagar a mais.`,
  },
  {
    question: `Vale mais a pena contratar ${c.productLabel} com corretora local ou direto pelo site da seguradora?`,
    answer: `Com corretora local você tem comparativo entre ${c.insurersCount} seguradoras em uma única cotação, suporte presencial em sinistro e renovação otimizada todo ano. A Patro Seguros fica no Cidade Maia, atende moradores do ${c.neighborhood} ${c.reference} e não cobra nada pelo serviço — a remuneração da corretora é paga pela seguradora.`,
  },
];

const productSpecific: Record<LocalProduct, (c: Ctx) => LocalFAQ[]> = {
  auto: (c) => [
    {
      question: `O CEP do ${c.neighborhood} encarece o ${c.productLabel}?`,
      answer: `O ${c.neighborhood} tem perfil de risco ${c.riskLevel} segundo as seguradoras. Isso impacta o prêmio em comparação a bairros como Cidade Maia (mais barato) ou Pimentas (mais caro). A Patro identifica qual seguradora trata o CEP do seu bairro de forma mais favorável.`,
    },
    {
      question: `Preciso ter rastreador morando no ${c.neighborhood}?`,
      answer:
        c.riskLevel === "alto" || c.riskLevel === "médio-alto"
          ? `Sim. Para CEPs do ${c.neighborhood} a maioria das seguradoras exige rastreador, especialmente em veículos acima de R$ 60 mil. Em compensação, o desconto chega a 18% no prêmio.`
          : `No ${c.neighborhood} o rastreador raramente é obrigatório, mas instalar reduz o prêmio entre 8% e 15% e libera coberturas adicionais como assistência premium.`,
    },
    {
      question: `O ${c.productLabel} cobre sinistro fora do ${c.neighborhood}?`,
      answer: `Sim. A apólice vale em todo o território nacional, sem restrição geográfica. Você está coberto no ${c.neighborhood}, em qualquer outro bairro de ${c.city}, em São Paulo capital e nas rodovias Dutra, Fernão Dias, Bandeirantes e Anhanguera.`,
    },
  ],
  moto: (c) => [
    {
      question: `Faz sentido segurar moto no ${c.neighborhood}?`,
      answer: `Sim. O ${c.neighborhood} tem perfil de risco ${c.riskLevel} e motos são alvo prioritário em furto rápido. A apólice cobre roubo, colisão, terceiros e assistência 24h — fundamental para quem usa a moto como meio principal de transporte ou trabalho com app.`,
    },
    {
      question: `Existe seguro moto para entregadores de app no ${c.neighborhood}?`,
      answer: `Sim. Trabalhamos com seguradoras que aceitam motofretistas e entregadores iFood, Rappi, 99Food etc. Por ser uso profissional, o prêmio é mais alto, mas mantemos cobertura completa e RCF-V para danos a terceiros.`,
    },
    {
      question: `O seguro moto cobre o capacete e os acessórios?`,
      answer: `Cobre via cláusula adicional de "acessórios e equipamentos". Inclua capacete, baú, GPS e roupas técnicas no momento da contratação — se não declarar, a indenização não ocorre. A Patro orienta moradores do ${c.neighborhood} sobre cada item declarável.`,
    },
  ],
  uber: (c) => [
    {
      question: `Posso usar seguro auto comum rodando de Uber/99 no ${c.neighborhood}?`,
      answer: `Não. O seguro auto comum exclui sinistros em uso profissional. Para Uber, 99 e InDriver é obrigatória apólice com cláusula de "transporte remunerado de passageiros" — caso contrário a seguradora nega indenização. A Patro contrata apólices específicas para motoristas de app no ${c.neighborhood}.`,
    },
    {
      question: `Quais seguradoras aceitam Uber/99 no ${c.neighborhood}?`,
      answer: `Porto Seguro, Tokio Marine, HDI e Allianz têm produtos específicos para motoristas de aplicativo. O preço é cerca de 25% a 40% maior que o particular, mas é o único formato que garante indenização em sinistro durante corrida.`,
    },
    {
      question: `O ${c.productLabel} cobre o passageiro durante a corrida?`,
      answer: `Sim. Apólices de transporte remunerado incluem APP (Acidentes Pessoais por Passageiro) com indenização por morte e invalidez. Dirija sempre com a apólice correta para garantir essa proteção a quem está com você.`,
    },
  ],
  residencial: (c) => [
    {
      question: `O ${c.productLabel} no ${c.neighborhood} cobre incêndio, raio e explosão?`,
      answer: `Sim, essas três coberturas são básicas em qualquer apólice residencial. No ${c.neighborhood} (perfil ${c.riskLevel}), recomendamos adicionar danos elétricos, vendaval e RC familiar — o custo extra anual é baixo e protege equipamentos e terceiros.`,
    },
    {
      question: `Vale a pena contratar ${c.productLabel} para apartamento no ${c.neighborhood}?`,
      answer: `Sim. Mesmo com seguro do condomínio, ele cobre apenas a estrutura — móveis, eletrônicos e responsabilidade civil são por sua conta. Apólices residenciais a partir de R$ 25/mês no ${c.neighborhood} já incluem essas proteções.`,
    },
    {
      question: `O ${c.productLabel} cobre roubo de bens no ${c.neighborhood}?`,
      answer: `Cobre via cláusula adicional de "subtração de bens". Considerando o perfil ${c.riskLevel} do ${c.neighborhood}, é uma cobertura altamente recomendada — protege eletrônicos, joias e dinheiro mediante arrombamento comprovado.`,
    },
  ],
  empresarial: (c) => [
    {
      question: `Quanto custa ${c.productLabel} para uma PME no ${c.neighborhood}?`,
      answer: `O ${c.productLabel} para PME no ${c.neighborhood} fica em ${c.priceRange}, dependendo do faturamento, atividade (CNAE), valor em estoque e capital segurado. Cobre incêndio, roubo, RC operações, lucros cessantes e equipamentos eletrônicos.`,
    },
    {
      question: `Galpão no ${c.neighborhood} precisa de seguro patrimonial?`,
      answer: `Sim — e a maioria dos contratos de locação exige. Para galpões e centros logísticos próximos ao GRU Airport e às rodovias Presidente Dutra/Fernão Dias, cobertura mínima de incêndio + RC é exigência padrão. A Patro é especialista em riscos patrimoniais.`,
    },
    {
      question: `O ${c.productLabel} cobre lucros cessantes em caso de sinistro?`,
      answer: `Sim, via cláusula específica de "lucros cessantes". Indeniza o faturamento perdido enquanto a empresa estiver paralisada após sinistro coberto — fundamental para PMEs do ${c.neighborhood} que operam com margem apertada.`,
    },
  ],
  vida: (c) => [
    {
      question: `Vale a pena contratar ${c.productLabel} morando no ${c.neighborhood}?`,
      answer: `Sim. O ${c.productLabel} independe do bairro — é calculado por idade, profissão e capital segurado. Para moradores do ${c.neighborhood}, recomendamos capital de 5 a 10 vezes a renda anual e cobertura por invalidez total e parcial.`,
    },
    {
      question: `O ${c.productLabel} cobre doenças graves?`,
      answer: `Cobre via cláusula adicional de "doenças graves" (DG): câncer, infarto, AVC, insuficiência renal e outras 8 condições. O capital é pago em parcela única ao diagnóstico, sem precisar aguardar o óbito.`,
    },
    {
      question: `Posso incluir cônjuge e filhos na mesma apólice?`,
      answer: `Sim. Apólices familiares ou empresariais incluem cônjuge e dependentes com capital próprio para cada um. Para famílias do ${c.neighborhood}, esse modelo costuma sair 30% mais barato que apólices individuais separadas.`,
    },
  ],
  saude: (c) => [
    {
      question: `Quais operadoras de ${c.productLabel} atendem o público do ${c.neighborhood}?`,
      answer: `Trabalhamos com Amil, SulAmérica, Bradesco Saúde, Hapvida, GNDI, Porto Saúde e mais 14 operadoras. Todas oferecem rede credenciada em ${c.city}, incluindo hospitais como Stella Maris e Helios, com opções de atendimento em São Paulo capital para moradores do ${c.neighborhood}.`,
    },
    {
      question: `Como funciona o ${c.productLabel} para idosos e famílias no ${c.neighborhood}?`,
      answer: `Para a terceira idade, priorizamos operadoras com programas de medicina preventiva e hospitais de excelência próximos a ${c.city}. Para famílias com crianças, focamos em planos com pronto-atendimento pediátrico 24h e rede de laboratórios capilarizada.`,
    },
    {
      question: `Qual a carência para jovens e adultos no ${c.neighborhood}?`,
      answer: `Jovens e adultos saudáveis no ${c.neighborhood} costumam ter carência zero para consultas e exames simples após a primeira mensalidade. Para cirurgias, internações e partos, as carências seguem o padrão da ANS (até 180 e 300 dias), mas analisamos reduções por portabilidade.`,
    },
    {
      question: `Existe carência mesmo trocando de plano?`,
      answer: `Em portabilidade entre operadoras o cliente do ${c.neighborhood} pode aproveitar carências já cumpridas — desde que o plano de origem esteja ativo há mais de 24 meses e a faixa de preço seja compatível. A Patro analisa essa elegibilidade gratuitamente.`,
    },
  ],
  "saude-mei": (c) => [
    {
      question: `Quanto custa ${c.productLabel} no ${c.neighborhood}?`,
      answer: `O ${c.productLabel} para microempreendedores no ${c.neighborhood} parte de R$ 169/mês com cobertura ambulatorial e R$ 289/mês com internação hospitalar (referência para 0-18 anos). Inclui rede credenciada em ${c.city} e em São Paulo capital.`,
    },
    {
      question: `Preciso ter CNPJ ativo para contratar ${c.productLabel}?`,
      answer: `Sim, com CCMEI emitido há pelo menos 30 dias. A Patro orienta moradores do ${c.neighborhood} sobre a documentação exata exigida por cada operadora e cuida do envio do contrato.`,
    },
    {
      question: `Posso incluir esposa/marido e filhos no plano MEI?`,
      answer: `Sim. Cônjuge, filhos até 21 anos (ou 24 se universitários) e dependentes legais entram como agregados no mesmo contrato MEI, com mensalidade proporcional à faixa etária — bem mais barato que planos individuais.`,
    },
  ],
  consorcio: (c) => [
    {
      question: `Vale a pena entrar em ${c.productLabel} morando no ${c.neighborhood}?`,
      answer: `Sim, especialmente para imóveis e veículos sem pressa de uso imediato. ${c.productLabel.charAt(0).toUpperCase() + c.productLabel.slice(1)} dispensa juros e oferece taxa de administração entre 14% e 22% sobre o valor da carta. A Patro intermedia 4 administradoras com sede em ${c.city}.`,
    },
    {
      question: `Posso ofertar lance com FGTS no ${c.productLabel} de imóvel?`,
      answer: `Sim, em consórcios de imóvel residencial e desde que o bem se destine à moradia do consorciado. Moradores do ${c.neighborhood} costumam usar FGTS como lance livre, antecipando a contemplação em 30% a 60% dos casos.`,
    },
    {
      question: `Qual a diferença entre ${c.productLabel} e financiamento bancário?`,
      answer: `O ${c.productLabel} não cobra juros — apenas taxa de administração diluída. O financiamento bancário pode dobrar o valor pago ao final. Em compensação, o ${c.productLabel} exige paciência: a contemplação acontece por sorteio ou lance, sem prazo garantido.`,
    },
  ],
};

/** Q&A finais, apresentando a Patro e fechando com CTA local — comuns a todos os produtos. */
const closingFAQs = (c: Ctx): LocalFAQ[] => [
  {
    question: `Como solicitar cotação de ${c.productLabel} no ${c.neighborhood}?`,
    answer: `Pelo WhatsApp (11) 5199-7500, presencialmente no Cidade Maia (próximo ao ${c.neighborhood}) ou pelos formulários do site. Em até 2 horas úteis você recebe o comparativo entre ${c.insurersCount} seguradoras parceiras, sem compromisso e sem cadastro forçado.`,
  },
];

/** Mescla extras sobrescrevendo perguntas duplicadas (case-insensitive). */
function mergeExtras(base: LocalFAQ[], extras?: LocalFAQ[]): LocalFAQ[] {
  if (!extras || extras.length === 0) return base;
  const map = new Map<string, LocalFAQ>();
  for (const f of base) map.set(f.question.trim().toLowerCase(), f);
  for (const f of extras) map.set(f.question.trim().toLowerCase(), f);
  return Array.from(map.values());
}

export function generateLocalFAQs(input: GenerateLocalFAQInput): LocalFAQ[] {
  if (!input.neighborhood) throw new Error(`generateLocalFAQs[${input.slug}]: neighborhood obrigatório.`);
  if (!input.product) throw new Error(`generateLocalFAQs[${input.slug}]: product obrigatório.`);

  const ctx: Ctx = {
    neighborhood: input.neighborhood,
    city: input.city ?? DEFAULT_CITY,
    product: input.product,
    productLabel: PRODUCT_LABEL[input.product],
    riskLevel: input.riskLevel ?? "médio",
    priceRange: input.priceRange ?? "valores variáveis conforme perfil",
    reference: input.reference ?? `da região central de ${input.city ?? DEFAULT_CITY}`,
    insurersCount: input.insurersCount ?? DEFAULT_INSURERS,
    insurersLabel: input.insurersLabel ?? DEFAULT_INSURERS_LABEL,
  };

  // Para produtos não veiculares/patrimoniais, ignoramos riskLevel nas respostas base.
  if (!RISK_PRODUCTS.includes(ctx.product)) {
    ctx.riskLevel = "médio"; // valor neutro, não citado no copy
  }

  const builder = productSpecific[ctx.product];
  if (!builder) {
    throw new Error(`generateLocalFAQs[${input.slug}]: produto não suportado "${input.product}".`);
  }

  const faqs = mergeExtras(
    [...baseFAQs(ctx), ...builder(ctx), ...closingFAQs(ctx)],
    input.extras,
  );

  if (faqs.length < 5) {
    throw new Error(`generateLocalFAQs[${input.slug}]: gerou apenas ${faqs.length} FAQs (mínimo 5).`);
  }

  return faqs;
}

/** Lista de produtos suportados — útil para selects e validação externa. */
export const SUPPORTED_LOCAL_PRODUCTS = Object.keys(PRODUCT_LABEL) as LocalProduct[];