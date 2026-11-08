import type { SeoLocalPageConfig } from "./seoLocalAutoPages";

type Product = "residencial" | "vida" | "empresarial" | "saude";
export interface CommercialLocalSeed {
  slug: string;
  bairro: string;
  hubSlug?: string;
  focus?: string;
}

type ProductContent = {
  name: string;
  icon: string;
  route: string;
  intro: string;
  preparation: string;
  factors: string[];
  coverages: SeoLocalPageConfig["coverages"];
  faqs: SeoLocalPageConfig["faqs"];
};

// Orientação por modalidade, sem estimativas de preço, rede ou casos sem fonte.
// Os catálogos consumidores preservam os slugs existentes; isto não cria rotas.
const content: Record<Product, ProductContent> = {
  residencial: {
    name: "Seguro residencial", icon: "🏠", route: "/seguro-residencial-guarulhos",
    intro: "Informe se o imóvel é casa ou apartamento, próprio ou alugado e como ele é utilizado. A proposta deve separar a proteção da construção, dos bens e das responsabilidades do morador.",
    preparation: "Separe o CEP, o tipo de construção, o valor de reconstrução e uma relação dos bens que deseja segurar. Valor de mercado do imóvel e custo de reconstrução são informações diferentes.",
    factors: ["CEP e uso do imóvel", "Tipo de construção e ocupação", "Valor de reconstrução e dos bens", "Coberturas, limites, franquias e assistências escolhidas"],
    coverages: [
      { title: "Incêndio, raio e explosão", description: "Confira os eventos cobertos e se os limites se aplicam à construção, ao conteúdo ou a ambos." },
      { title: "Danos elétricos", description: "Quando contratada, depende dos equipamentos previstos, da causa do dano, do limite e da franquia." },
      { title: "Subtração de bens", description: "Roubo e diferentes formas de furto têm regras próprias. Furto simples não deve ser presumido como coberto." },
      { title: "Responsabilidade civil familiar", description: "Pode cobrir danos a terceiros nas situações definidas no contrato, com limite próprio e exclusões." },
      { title: "Vendaval e danos por água", description: "São eventos distintos. Confira a contratação de cada cobertura; alagamento não está automaticamente incluído." },
      { title: "Assistência residencial", description: "Serviços dependem do pacote, da área atendida, do limite de utilizações e das regras para materiais e mão de obra." },
    ],
    faqs: [
      { question: "O seguro do condomínio substitui o seguro da unidade?", answer: "Compare as duas apólices. O contrato do condomínio não deve ser presumido como proteção de todos os bens ou responsabilidades do morador. A necessidade de complemento depende das coberturas existentes." },
      { question: "Inquilinos podem contratar seguro residencial?", answer: "Podem solicitar uma proposta para seus bens e responsabilidades. As obrigações da locação e os interesses do proprietário devem ser conferidos separadamente." },
      { question: "Assistência de encanador cobre o prejuízo de um vazamento?", answer: "Não necessariamente. O serviço emergencial e a indenização por danos por água são proteções diferentes, com regras e limites próprios." },
    ],
  },
  vida: {
    name: "Seguro de vida", icon: "❤️", route: "/seguro-vida-guarulhos",
    intro: "A escolha deve partir das necessidades financeiras dos dependentes, dos compromissos existentes e do orçamento. Morte, invalidez, doenças graves e incapacidade temporária são coberturas diferentes.",
    preparation: "Defina quem depende da sua renda, quais compromissos deseja proteger e quem serão os beneficiários. Responda às declarações de saúde e de atividade de forma completa e correta.",
    factors: ["Idade e informações solicitadas na proposta", "Capital segurado por cobertura", "Profissão, atividades e declaração de saúde", "Prazo do seguro, carências e regras de atualização e reajuste"],
    coverages: [
      { title: "Morte", description: "Confira os eventos previstos, os beneficiários, o capital, as carências e as exclusões do produto." },
      { title: "Invalidez por acidente", description: "Quando contratada, a indenização depende da definição de invalidez e dos critérios e percentuais da apólice." },
      { title: "Doenças graves", description: "Abrange apenas diagnósticos e critérios definidos no contrato. Não substitui um plano de saúde." },
      { title: "Incapacidade temporária", description: "Diárias dependem das atividades aceitas, do afastamento comprovado, da franquia e do prazo máximo contratado." },
      { title: "Funeral", description: "Diferencie assistência de reembolso e confirme pessoas atendidas, limites e procedimentos de acionamento." },
    ],
    faqs: [
      { question: "Toda doença grave gera indenização?", answer: "Não. É preciso que o diagnóstico e os critérios do evento estejam previstos na cobertura contratada, respeitando carências e exclusões." },
      { question: "O preço fica congelado durante toda a vida?", answer: "Não presuma isso. Prazo, renovação, atualização do capital e reajustes devem ser conferidos no produto exato antes da contratação." },
      { question: "Como escolher o capital e os beneficiários?", answer: "Considere despesas, dívidas, dependentes e outras reservas. Registre os beneficiários na proposta e revise essa indicação quando a situação familiar mudar." },
    ],
  },
  empresarial: {
    name: "Seguro empresarial", icon: "🏢", route: "/seguro-empresarial-guarulhos",
    intro: "A cotação precisa refletir a atividade efetivamente exercida, a ocupação do imóvel e os bens da empresa. Seguro patrimonial, transporte de mercadorias e responsabilidade civil não são proteções equivalentes.",
    preparation: "Separe CNPJ, atividades, CEP, características do imóvel e valores de estoque, equipamentos e instalações. Informe exigências do contrato de locação e medidas de prevenção existentes.",
    factors: ["Atividades e ocupação efetiva do imóvel", "Valores de estoque, equipamentos e instalações", "Construção, prevenção de incêndio e medidas de segurança", "Coberturas, limites, franquias e períodos de indenização"],
    coverages: [
      { title: "Incêndio e eventos associados", description: "Confira bens segurados, eventos previstos e critérios de avaliação. Mercadorias de terceiros precisam ser declaradas e aceitas." },
      { title: "Subtração de bens e mercadorias", description: "A contratação não garante cobertura de toda mercadoria no pátio ou em trânsito. Verifique local de risco, bens, eventos e exclusões." },
      { title: "Danos elétricos", description: "Depende da causa do dano, dos equipamentos segurados e dos limites e franquias contratados." },
      { title: "Responsabilidade civil", description: "A modalidade deve corresponder à atividade e ao dano a terceiros. RC operações não substitui automaticamente RC profissional ou de empregador." },
      { title: "Lucros cessantes", description: "Exige contratação e paralisação decorrente de evento previsto. Há critérios de cálculo, franquia e período máximo de indenização." },
      { title: "Eventos climáticos", description: "Vendaval, alagamento e outros eventos não são intercambiáveis. Confira a aceitação e as exclusões de cada cobertura." },
    ],
    faqs: [
      { question: "O seguro empresarial cobre mercadoria em transporte?", answer: "Não automaticamente. Local de risco, movimentação e interesse sobre a carga precisam ser analisados. Pode ser necessário seguro de transporte específico." },
      { question: "Lucros cessantes paga qualquer interrupção da empresa?", answer: "Não. A paralisação deve decorrer de evento previsto no contrato e atender aos critérios, limites, franquias e período de indenização da cobertura." },
      { question: "Medidas de segurança garantem desconto ou indenização?", answer: "Não. Declare as proteções existentes e cumpra as exigências da proposta. Preço e aceitação dependem da análise da seguradora; a indenização depende do evento e do contrato." },
    ],
  },
  saude: {
    name: "Plano de saúde", icon: "🏥", route: "/plano-de-saude-guarulhos",
    intro: "Compare o produto exato, a rede, a abrangência, a acomodação e as regras de utilização. O nome da operadora, sozinho, não confirma atendimento em um hospital ou laboratório.",
    preparation: "Informe idades, modalidade de contratação e unidades de atendimento de sua preferência. Para contratação empresarial ou MEI, apresente os vínculos e documentos exigidos pelo produto disponível.",
    factors: ["Idade de cada beneficiário", "Modalidade e elegibilidade para contratação", "Rede, abrangência, segmentação e acomodação", "Coparticipação, carências e regras de reajuste"],
    coverages: [
      { title: "Consultas e exames", description: "Dependem da segmentação, da rede do produto, das regras de cobertura e das carências aplicáveis." },
      { title: "Internação", description: "Confira se há segmentação hospitalar, acomodação contratada, rede e critérios de autorização." },
      { title: "Urgência e emergência", description: "Verifique as regras de atendimento e de carência aplicáveis à modalidade e à segmentação contratadas." },
      { title: "Obstetrícia", description: "Não está presente em todo plano. Confira a segmentação, a rede e as carências para parto e demais atendimentos." },
      { title: "Reembolso e telemedicina", description: "Não são universais. Quando disponíveis, têm critérios de utilização e limites definidos no produto." },
    ],
    faqs: [
      { question: "Como confirmar um hospital ou laboratório?", answer: "Consulte a rede oficial do produto exato e confirme unidade, endereço, especialidade e tipo de atendimento antes de contratar e antes de utilizar. Proximidade geográfica não significa credenciamento." },
      { question: "MEI garante plano mais barato?", answer: "Não. A contratação depende da elegibilidade e da documentação exigida. Compare o custo total, a rede, a coparticipação e as regras de reajuste, sem presumir desconto." },
      { question: "É possível trocar de plano sem novas carências?", answer: "Portabilidade e outras situações de aproveitamento dependem de requisitos específicos. Não cancele o plano atual antes de confirmar a aceitação, os prazos e as condições da nova contratação." },
    ],
  },
};

export function buildCommercialLocalPage(product: Product, seed: CommercialLocalSeed): SeoLocalPageConfig {
  const c = content[product];
  const location = seed.bairro === "Guarulhos" ? "Guarulhos" : `${seed.bairro}, Guarulhos`;
  const label = `${c.name} em ${location}`;
  const quoteType = product === "saude" ? "saude" : product;
  const quoteLink = `/cotacao?tipo=${quoteType}`;
  const focus = seed.focus ? ` ${seed.focus}` : "";
  return {
    slug: seed.slug,
    title: `${c.name} em ${seed.bairro} — Cotação`,
    subtitle: `Orientação para contratar em ${location}: compare condições e solicite uma proposta para seu perfil.`,
    description: `${label}.${focus} ${c.intro}`,
    detailedDescription: `### O que informar na cotação\n\n${c.preparation}\n\n### Como comparar propostas para ${seed.bairro}\n\n${c.intro} Confira a vigência, as condições de aceitação, os limites e as exclusões antes de decidir. A referência à localidade indica área atendida pela Patro, não uma filial no bairro.\n\n### Antes de contratar\n\nSolicite as condições do produto e registre suas dúvidas. O envio dos dados para cotação não confirma contratação, início de vigência ou aceitação. ${product === "saude" ? "Disponibilidade, rede e elegibilidade devem ser confirmadas para o plano exato." : "A indenização depende de evento coberto e da análise da seguradora conforme o contrato."}`,
    metaDescription: `${c.name} em ${seed.bairro}, Guarulhos. Compare condições, limites e regras de contratação com a Patro. Solicite uma proposta.`,
    icon: c.icon,
    pricingIntro: `O valor de ${c.name.toLocaleLowerCase("pt-BR")} depende da proposta para seu perfil. Não publicamos uma média por bairro sem fonte, data e condições de referência.`,
    pricingFactors: [...c.factors],
    pricingNote: "Compare propostas com condições equivalentes. Descontos, aceitação e benefícios não são garantidos pela localização.",
    faqs: [
      { question: `Como solicitar uma proposta para ${seed.bairro}?`, answer: `${c.preparation} Use o formulário de cotação para encaminhar os dados e confirmar as opções disponíveis.` },
      { question: `Existe preço único para ${seed.bairro}?`, answer: "Não. O preço depende das informações da proposta e das condições do produto. Confira a validade do orçamento e o custo total; uma referência de bairro não substitui a análise individual." },
      ...c.faqs.map((faq) => ({ ...faq })),
    ],
    whoNeeds: [
      `Pessoas ou empresas em ${seed.bairro} que desejam avaliar ${c.name.toLocaleLowerCase("pt-BR")}`,
      "Quem precisa comparar uma nova proposta com o contrato atual",
      "Quem quer entender limites, exclusões e regras antes de contratar",
      "Quem está revisando necessidades e orçamento na renovação",
    ],
    whyPatro: ["Orientação para organizar os dados da cotação", "Comparação das condições apresentadas nas propostas", "Esclarecimento de dúvidas de contratação", "Canal de contato para acompanhamento da solicitação"],
    coverages: c.coverages.map((coverage) => ({ ...coverage })),
    insurers: [], testimonials: [], realScenarios: [],
    tips: [c.preparation, "Guarde a proposta, as condições do produto e os registros da contratação.", "Na renovação, confira valores, regras e mudanças nas suas necessidades."],
    relatedInsurances: [
      { title: `${c.name} em Guarulhos: entenda a modalidade`, link: c.route },
      ...(product === "saude" ? [{ title: "Compare planos de saúde em Guarulhos", link: "/comparativo-planos-saude-guarulhos" }] : []),
      ...(seed.hubSlug ? [{ title: `Outras modalidades para ${seed.bairro}`, link: `/seguros-guarulhos/${seed.hubSlug}` }] : [{ title: "Seguros por bairro em Guarulhos", link: "/seguros-guarulhos" }]),
      { title: `Solicitar cotação: ${c.name.toLocaleLowerCase("pt-BR")}`, link: quoteLink },
    ],
    neighborhood: seed.bairro === "Guarulhos" ? undefined : seed.bairro,
    city: "Guarulhos",
  };
}
