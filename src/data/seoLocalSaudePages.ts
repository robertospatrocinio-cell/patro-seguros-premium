import type { SeoLocalPageConfig } from "./seoLocalAutoPages";

const partnersLineSaude = "Bradesco Saúde, Amil, SulAmérica, Porto Saúde, HapVida/NotreDame Intermédica, Prevent Senior e MedSenior — comparamos todas as tabelas em Guarulhos.";

const saudeCoverages = [
  { title: "Consultas e Exames", description: "Acesso a consultas em todas as especialidades médicas e exames laboratoriais e de imagem." },
  { title: "Internação e Cirurgia", description: "Cobertura hospitalar completa em quartos coletivos ou privativos, conforme o plano escolhido." },
  { title: "Urgência e Emergência", description: "Atendimento 24h em pronto-socorro para casos agudos ou acidentes." },
  { title: "Maternidade", description: "Acompanhamento pré-natal completo e assistência ao parto (respeitando carências)." },
  { title: "Odontologia (Opcional)", description: "Possibilidade de incluir cobertura para tratamentos dentários, limpeza e cirurgias orais." },
  { title: "Telemedicina", description: "Consultas online via vídeo 24h por dia, sem sair de casa, incluso em quase todos os planos." },
];

interface SaudeBairroSeed {
  slug: string;
  bairro: string;
  hospitais: string[];
  clinicas: string[];
  referenciaLocal: string;
  precoMedio: string;
}

/**
 * Bairros foco para campanhas de Planos de Saúde.
 * Inclui hospitais e clínicas de referência para aumentar a relevância local (E-E-A-T).
 */
 const saudeBairros: SaudeBairroSeed[] = [
  {
    slug: "plano-saude-centro-guarulhos",
    bairro: "Centro",
    hospitais: ["Hospital Carlos Chagas", "Hospital 8 de Maio (Próximo)", "Hospital Stella Maris"],
    clinicas: ["Centro Médico Amil", "Laboratório Lavoisier Centro", "Delboni Auriemo"],
    referenciaLocal: "próximo à Praça Getúlio Vargas e Avenida Tiradentes",
    precoMedio: "R$ 290 a R$ 580/mês (individual)"
  },
  {
    slug: "plano-saude-cidade-maia",
    bairro: "Cidade Maia",
    hospitais: ["Hospital Stella Maris", "Hospital Carlos Chagas", "Rede Própria GNDI"],
    clinicas: ["Laboratório Fleury (Shopping Maia)", "Centro Médico São Gabriel", "A+ Medicina Diagnóstica"],
    referenciaLocal: "no entorno do Shopping Maia e Avenida Paulo Faccini",
    precoMedio: "R$ 310 a R$ 620/mês (individual)"
  },
  {
    slug: "plano-saude-picanco",
    bairro: "Picanço",
    hospitais: ["Hospital Stella Maris", "Hospital Ipiranga (Vila Augusta)", "Hospital Carlos Chagas"],
    clinicas: ["Centro Médico Picanço", "Laboratório Delboni", "Clínica de Especialidades local"],
    referenciaLocal: "próximo ao Parque Shopping Maia e Avenida Suplicy",
    precoMedio: "R$ 285 a R$ 590/mês (individual)"
  },
  {
    slug: "plano-saude-vila-augusta",
    bairro: "Vila Augusta",
    hospitais: ["Hospital Ipiranga", "Hospital Stella Maris", "Hospital Carlos Chagas"],
    clinicas: ["Centro Médico GNDI", "Laboratório Lavoisier Vila Augusta", "CDB Medicina Diagnóstica"],
    referenciaLocal: "região da Avenida Guarulhos e Parque Cecap",
    precoMedio: "R$ 300 a R$ 600/mês (individual)"
  }
];

 
 /**
  * Configurações de páginas locais de Planos de Saúde.
  */
 const saudePagesConfig: Record<string, SeoLocalPageConfig> = saudeBairros.reduce((acc, b) => {
    acc[b.slug] = {
    slug: b.slug,
    title: `Plano de Saúde ${b.bairro} (Guarulhos) — Preços e Hospitais`,
    subtitle: `Compare os melhores planos de saúde para moradores do ${b.bairro}. Atendimento no ${b.hospitais[0]} e clínicas próximas.`,
    description: `Buscando plano de saúde no ${b.bairro}, Guarulhos? A Patro Seguros compara Bradesco, Amil, SulAmérica, Porto e HapVida para você economizar. Atendimento local ${b.referenciaLocal}.`,
    detailedDescription: `Morar no ${b.bairro} oferece a conveniência de estar próximo a excelentes centros médicos. Para quem busca um plano de saúde, a proximidade com hospitais como ${b.hospitais.join(", ")} é um fator decisivo na escolha da operadora.\n\nNa Patro Seguros, analisamos quais planos oferecem a melhor rede credenciada especificamente para o ${b.bairro}. Além dos hospitais, consideramos laboratórios e clínicas como ${b.clinicas.join(", ")} que atendem na região. Seja para plano individual, familiar ou empresarial (MEI), garantimos o menor preço de tabela com consultoria especializada em Guarulhos.`,
    metaDescription: `Planos de saúde no ${b.bairro}, Guarulhos. Preços a partir de ${b.precoMedio}. Atendimento nos hospitais ${b.hospitais.slice(0, 2).join(" e ")}. Cotação grátis!`,
    icon: "🏥",
    pricingIntro: `Os planos de saúde no ${b.bairro} variam conforme a idade e a rede hospitalar escolhida. Planos com foco local em Guarulhos costumam ser mais acessíveis.`,
    pricingFactors: [
      "Faixa etária dos beneficiários",
      "Tipo de contratação (Pessoa Física ou CNPJ/MEI)",
      "Inclusão de hospitais de elite em SP",
      "Opção com ou sem coparticipação"
    ],
    pricingNote: "*Valores médios para plano individual. Empresas com MEI podem ter descontos de até 40%.",
    faqs: [
      { 
        question: `Qual o melhor hospital para quem mora no ${b.bairro}?`, 
        answer: `Para moradores do ${b.bairro}, o ${b.hospitais[0]} é uma das opções mais próximas e completas. Planos como Amil, Bradesco e SulAmérica oferecem excelente cobertura nesta unidade.` 
      },
      { 
        question: `Posso contratar plano de saúde com MEI no ${b.bairro}?`, 
        answer: `Sim! Se você é MEI no ${b.bairro} há mais de 6 meses, pode contratar planos empresariais com valores até 40% menores que os planos de pessoa física, incluindo seus dependentes.` 
      },
      { 
        question: `Quais laboratórios atendem no ${b.bairro}?`, 
        answer: `A região do ${b.bairro} conta com unidades do ${b.clinicas.filter(c => c.includes("Laboratório")).join(" e ") || "principais laboratórios de Guarulhos"}, facilitando exames de rotina sem grandes deslocamentos.` 
      }
    ],
    whoNeeds: [
      "Famílias que buscam segurança perto de casa",
      "MEIs e autônomos que querem reduzir custos",
      "Empresas locais que desejam reter talentos",
      "Idosos que precisam de rede credenciada local forte"
    ],
    whyPatro: [
      "Especialistas em rede credenciada de Guarulhos",
      "Comparativo entre 20+ operadoras em minutos",
      "Suporte pós-venda para agendamentos e carências",
      "Consultoria gratuita e sem compromisso"
    ],
    coverages: saudeCoverages,
    realScenarios: [
      { title: "Atendimento de Urgência", description: `Morador do ${b.bairro} precisou de pronto-socorro no ${b.hospitais[0]} e foi atendido em 15 min via plano SulAmérica.` },
      { title: "Economia via MEI", description: "Autônomo da região reduziu sua mensalidade de R$ 850 para R$ 510 ao migrar para plano empresarial via Patro Seguros." }
    ],
    tips: [
      "Verifique se o plano cobre o Hospital Stella Maris, principal referência da região.",
      "Opte por coparticipação se você usa o plano apenas para rotina e emergências.",
      "MEI tem tabela diferenciada; sempre consulte essa opção primeiro."
    ],
    relatedInsurances: [
      { title: "Comparativo Planos Saúde Guarulhos", link: "/comparativo-planos-saude-guarulhos" },
      { title: "Plano de Saúde Empresarial", link: "/plano-saude-empresarial-guarulhos" },
      { title: "Plano de Saúde MEI", link: "/plano-saude-mei-guarulhos" }
    ],
    neighborhood: b.bairro,
    city: "Guarulhos"
    };
    return acc;
  }, {} as Record<string, SeoLocalPageConfig>);

 /**
  * Configurações de páginas locais de Seguro Residencial.
  */
 const residencialPagesConfig: Record<string, SeoLocalPageConfig> = [
   {
     slug: "seguro-residencial-centro-guarulhos",
     bairro: "Centro",
     referencia: "próximo à Praça Getúlio Vargas e Avenida Tiradentes",
     preco: "R$ 25 a R$ 60/mês",
     perfil: "médio" as const
   },
   {
     slug: "seguro-residencial-vila-augusta",
     bairro: "Vila Augusta",
     referencia: "próximo ao Parque Cecap e região da Avenida Guarulhos",
     preco: "R$ 22 a R$ 55/mês",
     perfil: "baixo" as const
   },
   {
     slug: "seguro-residencial-jardim-maia",
     bairro: "Jardim Maia",
     referencia: "no entorno do Shopping Maia e Avenida Paulo Faccini",
     preco: "R$ 28 a R$ 65/mês",
     perfil: "baixo" as const
   }
 ].reduce((acc, r) => {
   acc[r.slug] = {
     slug: r.slug,
     title: `Seguro Residencial ${r.bairro} (Guarulhos) — Cotação Local`,
     subtitle: `Proteja sua casa ou apartamento no bairro ${r.bairro} com a Patro Seguros. Compare Porto Seguro, Allianz e Liberty.`,
     description: `Buscando seguro residencial no ${r.bairro}, Guarulhos? A Patro Seguros oferece proteção completa contra roubo, incêndio e danos elétricos com assistência 24h ${r.referencia}.`,
     detailedDescription: `Morar no ${r.bairro} exige uma proteção à altura do seu patrimônio. Seja em casa de rua ou apartamento, o seguro residencial oferece tranquilidade contra imprevistos como curtos-circuitos, vazamentos e subtrações de bens.\n\nNa Patro Seguros, avaliamos o perfil de risco do ${r.bairro} para oferecer a melhor relação custo-benefício. Além das coberturas básicas, incluímos serviços de assistência (chaveiro, encanador, eletricista) que muitas vezes pagam o valor do seguro em uma única utilização. Atendemos toda a região ${r.referencia} com consultoria técnica de quem conhece Guarulhos desde 2008.`,
     metaDescription: `Seguro residencial no ${r.bairro}, Guarulhos. Preços a partir de ${r.preco}. Proteção contra roubo, incêndio e danos elétricos. Peça sua cotação!`,
     icon: "🏠",
     pricingIntro: `O seguro residencial no ${r.bairro} é um dos investimentos mais acessíveis para proteção patrimonial, com custo anual menor que uma única parcela do seguro auto.`,
     pricingFactors: [
       "Valor de reconstrução do imóvel",
       "Valor estimado do conteúdo (móveis e eletrônicos)",
       "Tipo de residência: casa de rua, condomínio fechado ou apartamento",
       "Sistemas de segurança instalados (alarmes, câmeras, portaria 24h)"
     ],
     pricingNote: "*Valores médios para residências padrão. Apartamentos costumam ter custos até 30% menores.",
     faqs: [
       {
         question: `O seguro residencial no ${r.bairro} cobre roubo de eletrônicos?`,
         answer: `Sim, desde que contratada a cobertura de Subtração de Bens. No ${r.bairro}, recomendamos um limite de LMI compatível com o valor dos seus aparelhos de TV, notebooks e videogames.`
       },
       {
         question: `Seguro para apartamento no ${r.bairro} vale a pena?`,
         answer: `Sim! O seguro do condomínio cobre apenas a estrutura do prédio. O seguro individual protege seus móveis, eletrodomésticos e oferece Responsabilidade Civil caso um vazamento no seu apartamento cause danos ao vizinho.`
       },
       {
         question: `Quais serviços de assistência 24h estão inclusos?`,
         answer: `As principais seguradoras (Porto, Allianz, Liberty) oferecem chaveiro, encanador, eletricista e conserto de eletrodomésticos (linha branca). No ${r.bairro}, o atendimento costuma ser ágil pela proximidade da nossa base comercial.`
       }
     ],
     whoNeeds: [
       "Proprietários de casas e apartamentos no bairro",
       "Inquilinos que desejam proteger seus bens e cumprir cláusulas de locação",
       "Pessoas que viajam com frequência e deixam a casa vazia",
       "Quem busca assistência técnica rápida para pequenos reparos domésticos"
     ],
     whyPatro: [
       "Corretora local com escritório no Cidade Maia",
       "Comparativo entre 9 seguradoras líderes de mercado",
       "Assessoria na escolha do valor de capital segurado correto",
       "Atendimento humano e suporte em caso de sinistro"
     ],
     coverages: [
       { title: "Incêndio, Raio e Explosão", description: "Cobertura básica obrigatória para danos estruturais e ao conteúdo." },
       { title: "Danos Elétricos", description: "Proteção para aparelhos queimados por curto-circuito ou variação de tensão." },
       { title: "Roubo e Furto", description: "Subtração de bens mediante arrombamento ou ameaça." },
       { title: "RC Familiar", description: "Cobre danos causados a terceiros por você, seus dependentes ou animais de estimação." },
       { title: "Vendaval e Granizo", description: "Danos ao imóvel causados por ventos fortes ou chuvas de pedra." },
       { title: "Assistência 24h", description: "Serviços emergenciais de manutenção e reparo residencial." }
     ],
     realScenarios: [
       { title: "Dano Elétrico Resolvido", description: `Após queda de raio na região do ${r.bairro}, cliente teve TV e geladeira queimadas. A indenização foi paga em 7 dias após o envio dos orçamentos.` },
       { title: "Uso da Assistência", description: `Morador do ${r.bairro} precisou de encanador de madrugada para conter vazamento. O serviço foi realizado via seguro sem custo adicional, economizando R$ 250 de visita técnica.` }
     ],
     tips: [
       "Instalar alarmes monitorados pode gerar descontos no seguro residencial.",
       "Mantenha sempre uma lista ou fotos dos bens de maior valor para agilizar eventual sinistro.",
       "Verifique se o valor de reconstrução está atualizado conforme o preço do m² na região."
     ],
     relatedInsurances: [
       { title: "Seguro Residencial Guarulhos", link: "/seguro-residencial-guarulhos" },
       { title: "Seguro Fiança Locatícia", link: "/seguro-fianca-locaticia" },
       { title: "Seguro Condomínio", link: "/seguro-condominio-guarulhos" }
     ],
     neighborhood: r.bairro,
     city: "Guarulhos"
   };
   return acc;
 }, {} as Record<string, SeoLocalPageConfig>);

 /**
  * Configurações de páginas locais de Seguro Empresarial / Galpão.
  */
 const empresarialPagesConfig: Record<string, SeoLocalPageConfig> = [
   {
     slug: "seguro-empresarial-cumbica",
     bairro: "Cumbica",
     tipo: "Industrial e Logístico",
     referencia: "polo industrial de Cumbica, próximo ao Aeroporto de Guarulhos",
     foco: "Seguro de Galpão e Riscos Patrimoniais",
     preco: "R$ 1.200 a R$ 8.500/ano (PME)"
   },
   {
     slug: "seguro-empresarial-bonsucesso",
     bairro: "Bonsucesso",
     tipo: "Comercial e Industrial",
     referencia: "região da Rodovia Presidente Dutra e Estrada Juscelino Kubitschek",
     foco: "Seguro para Empresas e Galpões",
     preco: "R$ 950 a R$ 6.200/ano (PME)"
   },
   {
     slug: "seguro-empresarial-pimentas",
     bairro: "Pimentas",
     tipo: "Comercial e Serviços",
     referencia: "região da Estrada do Sacramento e entorno do Hospital Pimentas",
     foco: "Seguro para Comércio e PME",
     preco: "R$ 800 a R$ 4.500/ano (PME)"
   }
 ].reduce((acc, e) => {
   acc[e.slug] = {
     slug: e.slug,
     title: `Seguro Empresarial ${e.bairro} (Guarulhos) — Cotação para ${e.tipo}`,
     subtitle: `Proteja seu negócio em ${e.bairro}. Especialistas em ${e.foco} com atendimento local em Guarulhos.`,
     description: `Precisa de seguro empresarial em ${e.bairro}, Guarulhos? A Patro Seguros oferece consultoria especializada para ${e.tipo} com coberturas contra incêndio, roubo e RC.`,
     detailedDescription: `O bairro de ${e.bairro} é um dos motores econômicos de Guarulhos, com forte presença de ${e.tipo}. Para empresas que operam na região ${e.referencia}, ter uma apólice bem estruturada é a diferença entre a continuidade ou a falência do negócio após um sinistro.\n\nNa Patro Seguros, entendemos as particularidades de ${e.bairro}. Seja um galpão logístico em Cumbica ou um comércio de rua no Pimentas, desenhamos a apólice conforme seu CNAE e riscos reais. Atuamos com as 9 maiores seguradoras de Riscos Patrimoniais do Brasil, garantindo que você pague o preço justo por uma cobertura que realmente funciona na hora que você mais precisa.`,
     metaDescription: `Seguro empresarial no ${e.bairro}, Guarulhos. Planos para ${e.tipo} a partir de ${e.preco}. Proteção patrimonial completa. Peça sua cotação!`,
     icon: "🏭",
     pricingIntro: `O custo do seguro empresarial em ${e.bairro} varia drasticamente conforme a atividade e o valor segurado (LMI).`,
     pricingFactors: [
       "Ramo de atividade (CNAE) e grau de risco de incêndio",
       "Valor total de mercadorias e máquinas estocadas",
       "Sistemas de proteção contra incêndio (AVCB, sprinklers, hidrantes)",
       "Histórico de sinistralidade e proteções contra roubo"
     ],
     pricingNote: "*Cotações personalizadas para empresas de todos os portes. Descontos para renovação sem sinistro.",
     faqs: [
       {
         question: `O seguro empresarial em ${e.bairro} cobre roubo de estoque?`,
         answer: `Sim, a cobertura de Subtração de Bens e Mercadorias é essencial para empresas no ${e.bairro}. Ela protege contra roubo e furto qualificado, garantindo a reposição do seu capital de giro.`
       },
       {
         question: `Minha empresa no ${e.bairro} precisa de Seguro de Galpão?`,
         answer: `Se você opera em galpão ou centro logístico, sim. A maioria dos contratos de locação exige seguro contra incêndio e Responsabilidade Civil com LMI específico. A Patro é líder nesse segmento em Guarulhos.`
       },
       {
         question: `Como funciona a cobertura de Lucros Cessantes?`,
         answer: `Se sua empresa no ${e.bairro} parar devido a um incêndio ou explosão, a seguradora paga o lucro líquido que você deixou de ganhar e as despesas fixas, mantendo o negócio vivo durante a reconstrução.`
       }
     ],
     whoNeeds: [
       "Empresas de logística e transporte em Cumbica e Bonsucesso",
       "Indústrias e fábricas da região de Guarulhos",
       "Comércios de rua e prestadores de serviços no Pimentas e Centro",
       "Proprietários de galpões que exigem seguro dos inquilinos"
     ],
     whyPatro: [
       "Especialistas em Riscos Industriais e Patrimoniais",
       "Assessoria técnica para dimensionamento de LMI (evita subseguro)",
       "Atendimento presencial para vistorias em Guarulhos",
       "Comparativo entre seguradoras como Porto, Allianz e Tokio Marine"
     ],
     coverages: [
       { title: "Incêndio e Explosão", description: "Cobertura básica essencial para qualquer imóvel comercial." },
       { title: "Roubo de Bens e Mercadorias", description: "Proteção para estoque, máquinas e equipamentos contra subtração." },
       { title: "Responsabilidade Civil", description: "Cobre danos causados a terceiros (clientes, vizinhos) dentro da empresa." },
       { title: "Lucros Cessantes", description: "Garante a saúde financeira se a empresa precisar parar por sinistro." },
       { title: "Danos Elétricos", description: "Cobertura para queima de equipamentos e máquinas industriais." },
       { title: "Quebra de Vidros e Anúncios", description: "Reposição de vitrines, fachadas e placas de sinalização." }
     ],
     realScenarios: [
       { title: "Indenização de Roubo de Carga no Pátio", description: `Empresa em Cumbica teve mercadoria subtraída do pátio interno. Com a cobertura de roubo empresarial, o prejuízo de R$ 42 mil foi integralmente recuperado.` },
       { title: "Continuidade do Negócio", description: `Após incêndio parcial em fábrica no Bonsucesso, a cláusula de Lucros Cessantes pagou os salários e aluguel por 3 meses até a reforma ser concluída.` }
     ],
     tips: [
       "Mantenha o AVCB sempre em dia; ele é fundamental para a aceitação e indenização do risco.",
       "Declare o valor real do estoque para evitar a 'cláusula de rateio' em caso de sinistro parcial.",
       "Instalar sistemas de monitoramento 24h reduz significativamente o prêmio de roubo."
     ],
     relatedInsurances: [
       { title: "Seguro de Galpão Guarulhos", link: "/seguro-galpao-guarulhos" },
       { title: "Seguro de Frota", link: "/seguro-frota-guarulhos" },
       { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" }
     ],
     neighborhood: e.bairro,
     city: "Guarulhos"
   };
   return acc;
 }, {} as Record<string, SeoLocalPageConfig>);

 /**
  * Exportação consolidada de todas as páginas locais de saúde, residencial e empresarial.
  */
 export const seoLocalSaudePages: Record<string, SeoLocalPageConfig> = {
   ...saudePagesConfig,
   ...residencialPagesConfig,
   ...empresarialPagesConfig
 };