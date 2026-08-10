import type { SeoLocalPageConfig } from "@/data/seoLocalAutoPages";
import { generateLocalFAQs } from "@/data/localFAQGenerator";
import { BAIRRO_NEIGHBORS } from "@/lib/bairroNeighbors";
import { bairros } from "@/lib/bairrosData";

/**
 * Matriz estratégica de bairros de Guarulhos.
 * Mapeia o perfil socioeconômico e os seguros prioritários para cada região.
 */
export const BAIRROS_MATRIZ = [
  { 
    id: "pimentas", 
    nome: "Pimentas", 
    slug: "seguros-pimentas-guarulhos",
    perfil: "Região mais populosa de Guarulhos, com forte comércio local e perfil residencial denso. Eixo estratégico da Rodovia Ayrton Senna.",
    prioritarios: ["auto", "moto", "residencial", "vida", "saude-mei"],
    contexto: "Famílias e microempreendedores que buscam proteção acessível para seus bens e saúde.",
    referencia: "próximo ao Terminal Pimentas e Hospital Municipal",
    risco: "alto" as const
  },
  { 
    id: "bonsucesso", 
    nome: "Bonsucesso", 
    slug: "seguros-bonsucesso-guarulhos",
    perfil: "Polo industrial e logístico em expansão, com grande desenvolvimento residencial e comercial ao redor do Shopping Bonsucesso.",
    prioritarios: ["auto", "moto", "residencial", "empresarial", "vida"],
    contexto: "Trabalhadores e empresários que dependem da mobilidade e segurança patrimonial na Via Dutra.",
    referencia: "no entorno do Shopping Bonsucesso e UNIFESP",
    risco: "médio" as const
  },
  { 
    id: "cumbica", 
    nome: "Cumbica", 
    slug: "seguros-cumbica-guarulhos",
    perfil: "Coração industrial de Guarulhos e sede do GRU Airport. Fluxo constante de frotas, cargas e executivos.",
    prioritarios: ["empresarial", "frota", "transporte", "saude", "vida"],
    contexto: "Foco total em B2B, logística, transporte de cargas e benefícios para funcionários de grandes empresas.",
    referencia: "no entorno do GRU Airport e Rodovia Hélio Smidt",
    risco: "médio-alto" as const
  },
  { 
    id: "taboao", 
    nome: "Taboão", 
    slug: "seguros-taboao-guarulhos",
    perfil: "Região mista consolidada, com forte presença de serviços e residências. Ponto de conexão importante para a zona norte.",
    prioritarios: ["auto", "moto", "residencial", "saude", "consorcio"],
    contexto: "Proteção familiar e planejamento financeiro para aquisição de bens via consórcio.",
    referencia: "próximo à Avenida Silvestre Pires de Freitas e Praça Oito",
    risco: "médio" as const
  },
  { 
    id: "sao-joao", 
    nome: "São João", 
    slug: "seguros-sao-joao-guarulhos",
    perfil: "Bairro tradicional com perfil residencial estável e comércio de vizinhança ativo.",
    prioritarios: ["auto", "moto", "residencial", "vida", "saude"],
    contexto: "Segurança para a família e para o patrimônio construído ao longo de décadas na região.",
    referencia: "região da Estrada do Elenco e Avenida Jurema",
    risco: "médio" as const
  },
  { 
    id: "vila-augusta", 
    nome: "Vila Augusta", 
    slug: "seguros-vila-augusta-guarulhos",
    perfil: "Um dos bairros mais valorizados de Guarulhos, com alto índice de verticalização e condomínios premium.",
    prioritarios: ["auto", "residencial", "saude", "vida", "consorcio"],
    contexto: "Público exigente que busca coberturas completas para apartamentos de alto padrão e veículos novos.",
    referencia: "próximo ao Shopping Internacional e Parque Fracalanza",
    risco: "baixo" as const
  },
  { 
    id: "vila-galvao", 
    nome: "Vila Galvão", 
    slug: "seguros-vila-galvao-guarulhos",
    perfil: "Bairro histórico e charmoso na divisa com São Paulo, com forte identidade local e comércio tradicional.",
    prioritarios: ["auto", "residencial", "vida", "saude", "empresarial"],
    contexto: "Atendimento consultivo para famílias tradicionais e proteção para o comércio de rua consolidado.",
    referencia: "no entorno do Lago de Vila Galvão e Avenida Treze de Maio",
    risco: "baixo" as const
  },
  { 
    id: "centro", 
    nome: "Centro", 
    slug: "seguros-centro-guarulhos",
    perfil: "Centro administrativo e financeiro. Alta densidade de escritórios, consultórios e prestadores de serviço.",
    prioritarios: ["empresarial", "auto", "saude", "vida", "consorcio"],
    contexto: "Seguros de responsabilidade civil para profissionais liberais e proteção para ativos fixos no coração da cidade.",
    referencia: "região da Praça Tereza Cristina e Avenida Paulo Faccini",
    risco: "médio-alto" as const
  },
  { 
    id: "gopouva", 
    nome: "Gopoúva", 
    slug: "seguros-gopouva-guarulhos",
    perfil: "Bairro residencial de classe média com excelente localização e infraestrutura completa.",
    prioritarios: ["auto", "residencial", "saude", "vida", "empresarial"],
    contexto: "Proteção para consultórios e residências de famílias que buscam qualidade de vida em Guarulhos.",
    referencia: "região da Alameda Yayá e Avenida Emílio Ribas",
    risco: "médio" as const
  },
  { 
    id: "ponte-grande", 
    nome: "Ponte Grande", 
    slug: "seguros-ponte-grande-guarulhos",
    perfil: "Porta de entrada de Guarulhos via Marginal Tietê. Região estratégica para logística e frotas leves.",
    prioritarios: ["empresarial", "frota", "transporte", "auto", "saude"],
    contexto: "Soluções corporativas para empresas que operam no eixo Guarulhos-São Paulo.",
    referencia: "no entorno da Avenida Guarulhos e Rodovia Presidente Dutra",
    risco: "médio" as const
  }
];

export const seoLocalBairrosGuarulhos: Record<string, SeoLocalPageConfig> = BAIRROS_MATRIZ.reduce((acc, b) => {
  const productKey = b.prioritarios[0] as any; // Usar o primeiro da lista como destaque
  const neighborSlugs = BAIRRO_NEIGHBORS[b.id] || [];
  const nearbyAreas = neighborSlugs.map(nid => {
    const neighbor = BAIRROS_MATRIZ.find(m => m.id === nid);
    if (neighbor) {
      return { name: neighbor.nome, link: `/seguros-guarulhos/${neighbor.slug}` };
    }
    // Fallback para os IDs de bairrosData se não estiver na matriz estratégica
    const fallback = bairros.find(x => x.id === nid);
    if (fallback) {
      return { name: fallback.nome, link: `/seguros-guarulhos/${nid}` };
    }
    return null;
  }).filter(Boolean) as { name: string; link: string }[];

  acc[b.slug] = {
    slug: b.slug,
    title: `Seguros em ${b.nome} Guarulhos | Patro Corretora de Seguros`,
    subtitle: `Consultoria em seguros no ${b.nome}, Guarulhos. Cote auto, residencial, vida e saúde com atendimento local.`,
    description: `Buscando seguros no ${b.nome}, Guarulhos? A Patro Seguros oferece atendimento consultivo ${b.referencia}. ${b.perfil} Proteja seu patrimônio com quem conhece a região e cote nas 16 principais seguradoras em minutos.`,
    metaDescription: `Seguros no bairro ${b.nome} em Guarulhos: auto, residencial, vida e empresarial. Atendimento local ${b.referencia} e cotação rápida. Clique para cotar online!`,
    icon: "📍",
    neighborhood: b.nome,
    city: "Guarulhos",
    detailedDescription: `### Seguros no bairro ${b.nome} em Guarulhos\n\nO bairro ${b.nome} em Guarulhos é ${b.perfil} Para moradores e empresários desta região, a Patro Seguros oferece uma consultoria completa para identificar quais coberturas são essenciais conforme a realidade local. ${b.contexto}\n\n### Atendimento Próximo e Consultivo\n\nNossa sede física no Cidade Maia permite que moradores do ${b.nome} tenham um atendimento humanizado, ${b.referencia}. Não somos apenas um site de comparação; somos corretores especialistas que analisam cada apólice para garantir que você não tenha surpresas em caso de sinistro. Seja para o seu veículo, sua residência ou sua empresa, a proximidade com o cliente é nosso maior diferencial.\n\n### Seguros mais indicados para o ${b.nome}\n\nCom base na nossa matriz de risco para Guarulhos, recomendamos para o ${b.nome} os seguintes produtos: ${b.prioritarios.join(", ")}. Por exemplo, para o seguro auto, levamos em conta que o CEP do ${b.nome} possui classificação de risco ${b.risco}, o que influencia diretamente no cálculo da franquia e do prêmio. Nossa equipe ajuda a encontrar a seguradora que oferece a melhor condição para este CEP específico.\n\n### Corretora de Seguros Referência no ${b.nome}\n\nA Patro Seguros se consolidou como a principal corretora para o ${b.nome} por entender a dinâmica local. Sabemos que a segurança no ${b.nome} exige coberturas específicas contra roubo e furto, além de assistência técnica residencial 24h que realmente chegue rápido à sua casa. Ao cotar conosco, você tem acesso a mais de 16 seguradoras, garantindo o melhor custo-benefício do mercado para quem mora ou trabalha nesta região de Guarulhos.\n\n### Hub de Proteção Guarulhos e São Paulo\n\nAlém do atendimento local, a Patro Seguros atua em toda a Grande São Paulo e Capital, oferecendo expertise técnica para riscos complexos e proteção familiar com o selo de confiança de quem está no mercado há mais de 500 apólices emitidas.\n\nPara receber uma cotação personalizada agora, [clique aqui para acessar nosso formulário de cotação](/cotacao) ou utilize o botão de WhatsApp nesta página para falar com um de nossos especialistas.`,
    pricingIntro: `Os valores de seguros no ${b.nome} variam conforme o perfil do contratante e o produto escolhido. Para o seguro auto, por exemplo, o bairro possui risco ${b.risco}, o que permite negociações diferenciadas em certas seguradoras.`,
    pricingFactors: [
      `CEP de pernoite/risco no bairro ${b.nome}`,
      "Perfil do condutor ou empresa contratante",
      "Valor do bem segurado (FIPE ou valor de reconstrução)",
      "Sistemas de segurança instalados na região",
      "Coberturas adicionais (vidros, terceiros, lucros cessantes)"
    ],
    pricingNote: `Dica Patro: Clientes do ${b.nome} que contratam pacotes combinados (ex: Auto + Residencial) podem obter descontos progressivos na taxa de administração.`,
    faqs: generateLocalFAQs({
      slug: b.slug,
      neighborhood: b.nome,
      product: productKey === "frota" || productKey === "transporte" ? "empresarial" : productKey,
      riskLevel: b.risco,
      reference: b.referencia,
      extras: [
        { 
          question: `A Patro atende moradores do ${b.nome}?`, 
          answer: `Sim! Atendemos todos os moradores e empresas do ${b.nome} com suporte presencial na nossa sede no Cidade Maia ou via WhatsApp. Nosso foco é ser a corretora de referência para quem busca confiança em Guarulhos.` 
        },
        { 
          question: `Qual o seguro mais procurado no ${b.nome}?`, 
          answer: `Depende do perfil, mas no ${b.nome} vemos uma alta procura por ${b.prioritarios.slice(0, 2).join(" e ")}, dado o perfil ${b.perfil.toLowerCase()}` 
        }
      ]
    }),
    whoNeeds: [
      `Moradores do ${b.nome} que buscam atendimento local em Guarulhos`,
      `Empresas estabelecidas no ${b.nome} ${b.referencia}`,
      "Proprietários de veículos que circulam diariamente pela região",
      "Famílias que desejam proteger seu imóvel e saúde"
    ],
    whyPatro: [
      `Sede física próxima ao ${b.nome} (Cidade Maia)`,
      "Análise técnica de risco por bairro de Guarulhos",
      "Comparativo de 16+ seguradoras parceiras",
      "Suporte humano dedicado em caso de sinistro"
    ],
    coverages: [
      { title: "Seguro Auto e Moto", description: "Proteção completa com rastreador e assistência 24h em Guarulhos." },
      { title: "Seguro Residencial", description: "Incêndio, roubo e assistência técnica para sua casa ou apartamento." },
      { title: "Seguro Empresarial", description: "Proteção para ativos e responsabilidade civil do seu negócio." },
      { title: "Plano de Saúde", description: "Acesso aos melhores hospitais de Guarulhos (Stella Maris, Carlos Chagas)." }
    ],
    realScenarios: [
      { 
        title: `Atendimento ágil no ${b.nome}`, 
        description: `Cliente da região precisou de guincho no ${b.nome} e foi atendido em 25 minutos via assistência 24h da seguradora parceira.` 
      },
      { 
        title: "Cotação Comparativa", 
        description: `Morador do bairro economizou 18% na renovação do seguro auto ao comparar 9 seguradoras com a Patro.` 
      }
    ],
    tips: [
      "Informe sempre o CEP correto para garantir a validade da apólice.",
      "Aproveite os serviços de assistência 24h que já estão inclusos no seu seguro.",
      "Considere o seguro residencial: o custo é baixo e a proteção é alta no seu bairro."
    ],
    nearbyAreas,
    relatedInsurances: [
      { title: "Seguros em Guarulhos", link: "/seguros-guarulhos" },
      { title: "Seguro Residencial", link: "/seguro-residencial" },
      { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Seguro Residencial Guarulhos", link: "/seguro-residencial-guarulhos" },
      { title: "Plano de Saúde Guarulhos", link: "/plano-saude-guarulhos" }

    ]
  };
  return acc;
}, {} as Record<string, SeoLocalPageConfig>);
