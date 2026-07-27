/**
 * Fonte única da vertical Planos de Saúde.
 * Alimenta o hub `/plano-de-saude-guarulhos`, as 7 páginas filhas por
 * intenção e as 12 páginas de operadora. Mantém copy, WhatsApp CTA e
 * FAQs em um só lugar para evitar duplicação e canibalização.
 */

export type SaudeSubtypeSlug =
  | "individual"
  | "familiar"
  | "empresarial"
  | "mei"
  | "pme"
  | "idosos"
  | "odontologico";

export interface SaudeSubtype {
  slug: SaudeSubtypeSlug;
  path: string;
  label: string;
  cardTitle: string;
  cardDescription: string;
  audience: string;
  seo: {
    title: string;
    description: string;
    h1: string;
    subtitle: string;
    serviceType: string;
  };
  whatsapp: {
    origem: string;
    extraLine: string;
  };
  cta: { primary: string; secondary: string };
  sections: {
    intro: string;
    forWhom: string[];
    howPatroHelps: string[];
    whatToCompare: string[];
    localNote: string;
  };
  faqs: { question: string; answer: string }[];
  relatedOperadoras: string[];
}

export interface SaudeOperadora {
  slug: string;
  path: string;
  name: string;
  legalName?: string;
  accentColor: string;
  shortDescription: string;
  profileFit: string;
  planTypes: string[];
  attentionPoints: string[];
  seoTitle: string;
  seoDescription: string;
  h1: string;
  faqs: { question: string; answer: string }[];
  /** Página já existente que renderiza esta operadora (usada apenas para o grid do hub). */
  existingRoute?: string;
}

/* -------------------------------------------------------------------------- */
/*                          SUBTIPOS POR INTENÇÃO                              */
/* -------------------------------------------------------------------------- */

export const SAUDE_SUBTYPES: SaudeSubtype[] = [
  {
    slug: "individual",
    path: "/plano-de-saude-individual-guarulhos",
    label: "Individual",
    cardTitle: "Plano de Saúde Individual em Guarulhos",
    cardDescription: "Para pessoa física, autônomo ou profissional liberal que quer contratar em nome próprio.",
    audience: "Pessoas físicas, autônomos e profissionais liberais",
    seo: {
      title: "Plano de Saúde Individual em Guarulhos | Patro Seguros",
      description: "Compare planos de saúde individuais em Guarulhos: Bradesco Saúde, SulAmérica, Amil, Porto Saúde e mais. Cotação consultiva pela Patro Seguros.",
      h1: "Plano de Saúde Individual em Guarulhos",
      subtitle: "Contrate em nome próprio com comparativo consultivo entre operadoras que aceitam pessoa física em Guarulhos e São Paulo.",
      serviceType: "Plano de Saúde Individual",
    },
    whatsapp: { origem: "saude_individual_guarulhos", extraLine: "Quero comparar planos de saúde individuais em Guarulhos." },
    cta: { primary: "Cotar plano individual", secondary: "Falar com especialista" },
    sections: {
      intro:
        "O plano de saúde individual em Guarulhos é a modalidade contratada diretamente por uma pessoa física, sem vínculo com CNPJ ou entidade de classe. É a opção mais indicada para quem não tem empresa aberta, para autônomos, profissionais liberais e para quem quer manter a titularidade do contrato em nome próprio. A disponibilidade de planos individuais varia por operadora — algumas comercializam apenas coletivo por adesão, MEI ou PME. A Patro Seguros avalia caso a caso quais produtos individuais estão disponíveis no seu perfil, faixa etária e região.",
      forWhom: [
        "Pessoas físicas sem CNPJ",
        "Autônomos e profissionais liberais",
        "Aposentados e pensionistas",
        "Quem prefere titularidade em nome próprio",
        "Famílias pequenas de até 2 titulares",
      ],
      howPatroHelps: [
        "Consulta prévia da rede credenciada disponível para o CEP",
        "Comparação de carência, coparticipação, reembolso e acomodação",
        "Análise de faixa etária e regras de reajuste por ANS",
        "Verificação de disponibilidade real do produto individual",
        "Apoio na declaração de saúde e no processo de contratação",
      ],
      whatToCompare: [
        "Preço mensal por faixa etária",
        "Carência para consultas, exames, internação e obstetrícia",
        "Rede credenciada em Guarulhos e São Paulo",
        "Coparticipação e reembolso",
        "Acomodação (enfermaria ou apartamento)",
        "Abrangência (municipal, estadual, nacional)",
      ],
      localNote:
        "Em Guarulhos, avaliamos disponibilidade de atendimento em bairros como Cidade Maia, Vila Galvão, Macedo, Gopoúva, Bonsucesso, Cumbica, Pimentas, Centro e Taboão. A rede efetiva depende da operadora, categoria do plano e regras vigentes.",
    },
    faqs: [
      { question: "Ainda existe plano de saúde individual em Guarulhos?", answer: "Sim, mas a oferta é reduzida. Nem toda operadora comercializa plano individual — muitas trabalham apenas com coletivo por adesão, MEI ou PME. A Patro verifica caso a caso quais produtos individuais estão realmente disponíveis para o seu perfil e CEP." },
      { question: "Plano individual é mais caro que empresarial?", answer: "Em geral, sim. O plano individual costuma custar 20% a 40% mais do que um plano empresarial ou por adesão equivalente, porque o reajuste é regulado pela ANS e o risco é concentrado em um único beneficiário. Quando faz sentido, sugerimos abrir MEI para viabilizar um plano PME mais econômico." },
      { question: "Como funciona o reajuste do plano individual?", answer: "O reajuste anual dos planos individuais é limitado pelo teto definido pela ANS todo mês de maio. Já a mudança de faixa etária (aos 19, 24, 29, 34, 39, 44, 49, 54 e 59 anos) segue regras contratuais próprias, com percentuais definidos na apólice." },
      { question: "Autônomo pode contratar plano individual?", answer: "Sim. Autônomo, profissional liberal e MEI podem contratar plano individual. A vantagem do MEI é ter acesso a planos empresariais (PME) mais baratos, mesmo com apenas 1 vida titular + 1 dependente, dependendo da operadora." },
      { question: "Qual carência costuma ter o plano individual?", answer: "Carências típicas: 24h para urgência/emergência, 30 dias para consultas e exames simples, 180 dias para exames complexos e internações, 300 dias para parto a termo. Alguns produtos aceitam aproveitamento de carência de plano anterior — a Patro verifica caso a caso." },
      { question: "A Patro cobra para cotar plano individual?", answer: "Não. A cotação é gratuita e você paga o mesmo valor de tabela da operadora. Nossa remuneração vem da operadora após a contratação." },
    ],
    relatedOperadoras: ["bradesco-saude", "sulamerica-saude", "amil", "porto-saude", "hapvida-notredame", "unimed"],
  },
  {
    slug: "familiar",
    path: "/plano-de-saude-familiar-guarulhos",
    label: "Familiar",
    cardTitle: "Plano de Saúde Familiar em Guarulhos",
    cardDescription: "Titular + cônjuge, filhos, dependentes e pais idosos, com rede compatível com a sua região.",
    audience: "Famílias, casais com filhos, gestantes e dependentes",
    seo: {
      title: "Plano de Saúde Familiar em Guarulhos | Compare Opções",
      description: "Plano de saúde familiar em Guarulhos com titular, cônjuge, filhos e dependentes. Compare rede, carência, coparticipação e obstetrícia pela Patro Seguros.",
      h1: "Plano de Saúde Familiar em Guarulhos",
      subtitle: "Titular, cônjuge, filhos e dependentes reunidos em um único contrato, com rede próxima da sua casa em Guarulhos.",
      serviceType: "Plano de Saúde Familiar",
    },
    whatsapp: { origem: "saude_familiar_guarulhos", extraLine: "Quero cotar um plano de saúde para minha família em Guarulhos." },
    cta: { primary: "Cotar plano para minha família", secondary: "Ver rede próxima da minha casa" },
    sections: {
      intro:
        "O plano de saúde familiar em Guarulhos permite reunir titular, cônjuge, filhos, enteados e, em alguns casos, pais e sogros em uma única apólice. É a escolha mais comum para famílias que querem centralizar a gestão do benefício e aproveitar preços por faixa etária mais equilibrados. A Patro Seguros compara operadoras que aceitam contrato familiar em Guarulhos — considerando idade dos dependentes, gestação em curso, uso previsto de obstetrícia, pediatria e rede credenciada próxima da residência.",
      forWhom: [
        "Casais com ou sem filhos",
        "Famílias com dependentes de várias faixas etárias",
        "Gestantes que querem cobertura obstétrica",
        "Pais que buscam pediatria consolidada",
        "Quem quer centralizar dependentes em um único contrato",
      ],
      howPatroHelps: [
        "Cálculo do custo real por vida em cada operadora",
        "Verificação de pediatria e obstetrícia próximas da residência",
        "Análise de carência para parto e exames de rotina",
        "Comparativo entre enfermaria e apartamento",
        "Simulação da variação anual por mudança de faixa etária",
      ],
      whatToCompare: [
        "Preço por faixa etária de cada dependente",
        "Rede pediátrica e obstétrica em Guarulhos",
        "Carência de parto a termo",
        "Cobertura de urgência 24h",
        "Coparticipação em consultas e exames",
        "Regras para inclusão de recém-nascidos",
      ],
      localNote:
        "Priorizamos rede compatível com o bairro da família — Cidade Maia, Vila Galvão, Centro, Macedo, Bonsucesso, Gopoúva, Jardim Maia, Vila Augusta ou Taboão — respeitando a disponibilidade real da operadora escolhida.",
    },
    faqs: [
      { question: "Quantos dependentes posso incluir no plano familiar?", answer: "Depende da operadora e do produto. A maioria aceita cônjuge, filhos até 21 anos (ou 24 anos se universitários) e enteados. Alguns produtos incluem pais e sogros com condições específicas. A Patro valida as regras antes da contratação." },
      { question: "Recém-nascido tem carência no plano familiar?", answer: "Quando o parto acontece pela obstetrícia do plano da mãe (após cumprida a carência de 300 dias), o recém-nascido tem inclusão sem nova carência se registrado em até 30 dias. Em outros casos, aplicam-se as carências padrão do produto." },
      { question: "Vale mais a pena um plano familiar ou individual para cada?", answer: "Financeiramente, o plano familiar tende a ser mais vantajoso quando há 3 ou mais vidas, porque distribui melhor as taxas administrativas. Para 1 titular + 1 dependente, o comparativo depende da operadora — recomendamos simular ambos os cenários." },
      { question: "Gestante consegue contratar plano familiar?", answer: "Sim, mas com atenção à carência obstétrica de 300 dias para parto a termo. Algumas operadoras aceitam aproveitamento de carência de plano anterior. Em urgências e emergências, a cobertura acontece após 24h da contratação." },
      { question: "O plano familiar cobre pediatria e vacinas?", answer: "Consultas pediátricas e exames pediátricos são cobertos após as carências padrão. Vacinas do calendário nacional não fazem parte do rol obrigatório da ANS — algumas operadoras oferecem programas próprios de imunização como benefício adicional." },
      { question: "Posso trocar de plano familiar sem perder carência?", answer: "Sim, por meio de portabilidade regulamentada pela ANS. É preciso cumprir prazos mínimos de permanência no plano atual e migrar para um plano de faixa de preço compatível. A Patro Seguros conduz o processo de portabilidade para você." },
    ],
    relatedOperadoras: ["bradesco-saude", "sulamerica-saude", "amil", "porto-saude", "hapvida-notredame", "unimed"],
  },
  {
    slug: "empresarial",
    path: "/plano-de-saude-empresarial-guarulhos",
    label: "Empresarial",
    cardTitle: "Plano de Saúde Empresarial em Guarulhos",
    cardDescription: "Benefício corporativo para empresas de todos os portes, com foco em retenção e produtividade.",
    audience: "Empresas, RH, benefícios corporativos, PME e grandes contratos",
    seo: {
      title: "Plano de Saúde Empresarial em Guarulhos | PME e Empresas",
      description: "Plano de saúde empresarial em Guarulhos para PME, corporativo e RH. Compare operadoras, rede, coparticipação e gestão de benefício com a Patro Seguros.",
      h1: "Plano de Saúde Empresarial em Guarulhos",
      subtitle: "Estruture o benefício de saúde da sua equipe com comparativo consultivo entre as principais operadoras que atendem Guarulhos.",
      serviceType: "Plano de Saúde Empresarial",
    },
    whatsapp: { origem: "saude_empresarial_guarulhos", extraLine: "Quero cotar plano de saúde empresarial para minha empresa em Guarulhos." },
    cta: { primary: "Cotar plano para minha empresa", secondary: "Montar benefício para equipe" },
    sections: {
      intro:
        "O plano de saúde empresarial em Guarulhos é o principal benefício buscado por profissionais em processos seletivos e o mais eficaz para retenção e redução de turnover. Envolve a contratação por meio de CNPJ — de MEI a grandes corporativos — com regras, preços e rede diferentes do plano individual. A Patro Seguros estrutura o benefício de saúde da equipe considerando porte da empresa, perfil dos colaboradores, orçamento disponível, política de coparticipação e nível de rede desejado.",
      forWhom: [
        "Empresas de 2 a 99 vidas (PME)",
        "Empresas com mais de 100 vidas (corporativo)",
        "Startups e escritórios que querem estruturar benefícios",
        "Empresas de Guarulhos, Cumbica e região",
        "Empresas nacionais com equipes em SP",
      ],
      howPatroHelps: [
        "Cotação simultânea nas principais operadoras",
        "Análise de política de coparticipação e limitadores",
        "Estruturação de tabela por faixa etária e cargo",
        "Apoio de RH: implantação, movimentações e boletos",
        "Renovação anual com benchmarking de mercado",
      ],
      whatToCompare: [
        "Rede credenciada por região da empresa",
        "Preço por faixa etária (tabela contratual)",
        "Coparticipação e teto",
        "Reajuste anual (uso e faixa etária)",
        "Categorias de acomodação",
        "Benefícios adicionais (odonto, telemedicina)",
      ],
      localNote:
        "Atendemos empresas instaladas em Cidade Maia, Cumbica, Bonsucesso, Vila Galvão, Vila Endres, Ponte Grande e distritos industriais de Guarulhos, com comparativo de rede próxima ao local de trabalho.",
    },
    faqs: [
      { question: "A partir de quantas vidas posso contratar plano empresarial em Guarulhos?", answer: "A maioria das operadoras aceita PME a partir de 2 vidas (titular + 1 dependente) com CNPJ ativo. Algumas trabalham a partir de 3 ou 5 vidas. Grandes operadoras nacionais têm produtos dedicados para MEI, PME de 2 a 29, PME de 30 a 99 e corporativo acima de 100 vidas." },
      { question: "Plano empresarial é sempre mais barato que individual?", answer: "Na maioria dos casos, sim — a economia costuma ficar entre 20% e 40% para o mesmo padrão de rede e cobertura. A diferença aumenta em faixas etárias mais altas, onde o reajuste por sinistralidade da carteira empresarial é diluído." },
      { question: "Empresa em fase de constituição pode contratar?", answer: "Depende da operadora. Algumas exigem CNPJ com pelo menos 6 meses; outras aceitam CNPJ recém-aberto mediante documentação complementar (contrato social, comprovante de atividade). A Patro identifica quais aceitam o seu caso." },
      { question: "Como funciona a coparticipação em plano empresarial?", answer: "A coparticipação é um valor fixo ou percentual que o beneficiário paga por consulta ou exame utilizado, funcionando como controle de uso. Em Guarulhos, produtos com coparticipação chegam a ser 15% a 30% mais baratos na mensalidade do titular." },
      { question: "Preciso incluir todos os funcionários no plano?", answer: "Não necessariamente. Você pode oferecer o plano por elegibilidade (por cargo, tempo de casa ou opcional). A regra deve estar no contrato coletivo e ser aplicada de forma isonômica dentro do critério escolhido." },
      { question: "A Patro faz gestão do plano depois da contratação?", answer: "Sim. Fazemos inclusões, exclusões, segunda via de carteirinha, orientação de rede, apoio em glosas e renovação anual com comparativo de mercado — sem custo adicional para a empresa." },
    ],
    relatedOperadoras: ["bradesco-saude", "sulamerica-saude", "amil", "porto-saude", "hapvida-notredame", "omint", "care-plus"],
  },
  {
    slug: "mei",
    path: "/plano-de-saude-mei-guarulhos",
    label: "MEI",
    cardTitle: "Plano de Saúde para MEI em Guarulhos",
    cardDescription: "CNPJ MEI ativo, titular + dependente, com preços de PME e regras de contratação simplificadas.",
    audience: "Microempreendedores Individuais com CNPJ ativo",
    seo: {
      title: "Plano de Saúde para MEI em Guarulhos | Cotação Patro",
      description: "Plano de saúde MEI em Guarulhos com CNPJ ativo: economia em relação ao individual, regras de contratação, carência e operadoras que aceitam MEI.",
      h1: "Plano de Saúde para MEI em Guarulhos",
      subtitle: "Aproveite as regras de plano empresarial usando o seu CNPJ MEI, com preços melhores que o individual e comparativo entre operadoras.",
      serviceType: "Plano de Saúde para MEI",
    },
    whatsapp: { origem: "saude_mei_guarulhos", extraLine: "Sou MEI e quero cotar plano de saúde em Guarulhos." },
    cta: { primary: "Cotar plano MEI", secondary: "Ver regras para CNPJ" },
    sections: {
      intro:
        "O plano de saúde para MEI em Guarulhos usa a estrutura de contrato empresarial (PME) para quem tem CNPJ como Microempreendedor Individual. Na prática, o MEI consegue acessar planos mais baratos que os individuais, com regras semelhantes às PMEs, desde que apresente documentação básica: cartão CNPJ, comprovante de atividade e declaração de vida vinculada. A Patro Seguros ajuda o MEI a montar o contrato dentro das regras da operadora, escolher rede compatível e evitar produtos que exigem quantidade de vidas incompatíveis com o porte MEI.",
      forWhom: [
        "Microempreendedores Individuais com CNPJ ativo",
        "MEI titular + 1 dependente",
        "Profissionais que querem sair do plano individual",
        "Prestadores de serviço em Guarulhos",
        "Consultores, motoristas de app e autônomos formalizados",
      ],
      howPatroHelps: [
        "Validação da documentação MEI exigida por cada operadora",
        "Filtro apenas de operadoras que aceitam MEI de 1 vida titular",
        "Comparativo entre plano MEI e plano individual equivalente",
        "Orientação sobre inclusão de dependente",
        "Acompanhamento pós-contratação",
      ],
      whatToCompare: [
        "Aceitação de MEI com 1 vida ativa",
        "Documentos exigidos (CNAE, tempo de CNPJ)",
        "Rede credenciada em Guarulhos",
        "Coparticipação e teto",
        "Carências e aproveitamento de plano anterior",
        "Preço final vs plano individual equivalente",
      ],
      localNote:
        "Nem toda operadora aceita MEI com 1 vida titular. Trabalhamos apenas com operadoras que possuem produtos MEI ativos e disponíveis para Guarulhos, evitando negativa após a proposta.",
    },
    faqs: [
      { question: "MEI pode contratar plano empresarial em Guarulhos?", answer: "Sim, desde que a operadora aceite MEI e o CNPJ esteja ativo. Bradesco Saúde, SulAmérica, Amil, Hapvida, NotreDame e algumas regionais têm produtos MEI. Cada operadora exige documentação e tempo mínimo de CNPJ diferente." },
      { question: "Posso contratar MEI só para o titular?", answer: "Algumas operadoras aceitam MEI apenas com 1 vida titular; outras exigem mínimo de 2 vidas (titular + dependente). A Patro identifica quais aceitam o seu caso antes de emitir proposta." },
      { question: "Plano MEI é mais barato que individual?", answer: "Em geral, sim. A economia costuma variar de 20% a 40% para o mesmo padrão de rede. A vantagem é maior em faixas etárias mais altas, onde o reajuste anual do individual pesa mais." },
      { question: "Quais documentos preciso apresentar como MEI?", answer: "Normalmente: cartão CNPJ, certificado de MEI atualizado, comprovante de atividade, RG, CPF e comprovante de residência do titular. Algumas operadoras pedem também declaração de vidas ativas e vínculo com dependente." },
      { question: "O CNAE do MEI influencia na contratação?", answer: "Sim. Algumas operadoras têm restrição por CNAE em atividades específicas. A Patro valida o CNAE antes de submeter a proposta para evitar recusa após análise da operadora." },
      { question: "Se eu fechar o MEI, perco o plano?", answer: "Sim, pois o vínculo com o contrato PME/MEI depende do CNPJ ativo. Nesse caso, é possível fazer portabilidade para plano individual ou coletivo por adesão dentro dos prazos regulamentados pela ANS. A Patro orienta o processo." },
    ],
    relatedOperadoras: ["bradesco-saude", "sulamerica-saude", "amil", "hapvida-notredame", "porto-saude", "unimed"],
  },
  {
    slug: "pme",
    path: "/plano-de-saude-pme-guarulhos",
    label: "PME",
    cardTitle: "Plano de Saúde PME em Guarulhos",
    cardDescription: "Empresas de 2 a 99 vidas com CNPJ ativo — comparativo entre operadoras e gestão de benefício.",
    audience: "Empresas PME de 2 a 99 vidas com CNPJ ativo",
    seo: {
      title: "Plano de Saúde PME em Guarulhos | Compare Operadoras",
      description: "Plano de saúde PME em Guarulhos para empresas de 2 a 99 vidas. Compare operadoras, coparticipação, rede local e gestão de benefício com a Patro.",
      h1: "Plano de Saúde PME em Guarulhos",
      subtitle: "Estrutura corporativa para pequenas e médias empresas de Guarulhos, com comparativo real entre operadoras que aceitam o seu porte.",
      serviceType: "Plano de Saúde PME",
    },
    whatsapp: { origem: "saude_pme_guarulhos", extraLine: "Minha empresa é PME e quero cotar plano de saúde em Guarulhos." },
    cta: { primary: "Cotar plano PME", secondary: "Falar com especialista PME" },
    sections: {
      intro:
        "O plano de saúde PME em Guarulhos atende empresas com 2 a 99 vidas ativas, unindo a economia da contratação coletiva com regras próprias de reajuste e coparticipação. Diferente do individual, o reajuste PME é definido por sinistralidade da carteira da operadora, e não pelo teto da ANS — o que exige acompanhamento anual do custo e do uso da equipe. A Patro Seguros faz a estruturação inicial e a renovação anual com comparativo de mercado, ajudando o RH a manter o benefício sustentável e competitivo.",
      forWhom: [
        "Empresas com 2 a 29 vidas",
        "Empresas com 30 a 99 vidas",
        "Startups e escritórios de serviços",
        "Comércio, indústria e logística de Guarulhos",
        "Franquias com múltiplas unidades",
      ],
      howPatroHelps: [
        "Cotação simultânea em 5+ operadoras",
        "Escolha entre coparticipação e sem coparticipação",
        "Estruturação de tabela por cargo/faixa etária",
        "Suporte contínuo em movimentações e boletos",
        "Renovação anual com benchmarking",
      ],
      whatToCompare: [
        "Faixa mínima de vidas aceita pela operadora",
        "Rede credenciada por bairro/região",
        "Modelo de coparticipação",
        "Regras de reajuste anual",
        "Categorias de acomodação",
        "Benefícios adicionais (odonto, telemedicina, wellness)",
      ],
      localNote:
        "Analisamos operadoras que efetivamente atendem endereços em Guarulhos, Cumbica e distritos industriais, priorizando rede próxima da sede da empresa.",
    },
    faqs: [
      { question: "Qual é o número mínimo de vidas para plano PME em Guarulhos?", answer: "A maioria das operadoras aceita PME a partir de 2 vidas com CNPJ ativo. Algumas exigem 3 ou 5 vidas mínimas. Bradesco Saúde, SulAmérica, Amil e Hapvida/NotreDame têm produtos dedicados para pequenas equipes." },
      { question: "Como funciona o reajuste anual do PME?", answer: "O reajuste PME é definido por dois fatores: o VCMH (variação de custos médico-hospitalares) e a sinistralidade da carteira empresarial da operadora. Não segue o teto da ANS (que se aplica só ao individual). A Patro faz benchmarking anual para negociar o reajuste." },
      { question: "Empresa nova pode contratar plano PME?", answer: "Depende da operadora. A maioria aceita empresas com CNPJ ativo há pelo menos 6 meses; algumas trabalham com CNPJ recém-aberto mediante documentação complementar. Identificamos qual operadora aceita seu caso." },
      { question: "Preciso incluir todos os funcionários no PME?", answer: "Não. Você define os critérios de elegibilidade (cargo, tempo de casa, opcional) e aplica isonomicamente. Muitos contratos PME oferecem o benefício apenas para diretoria e cargos técnicos, deixando outros como opcional." },
      { question: "Posso oferecer plano diferente por cargo?", answer: "Sim, desde que a regra esteja no contrato coletivo e siga critérios objetivos (cargo, departamento, tempo de empresa). Muitas empresas contratam 2 categorias — uma padrão para a equipe e outra premium para diretoria/gestores." },
      { question: "Qual é o prazo de vigência do contrato PME?", answer: "O contrato PME tem vigência de 12 meses com renovação automática se nenhuma das partes se manifestar em prazo contratual (normalmente 60 dias antes). A Patro alerta a empresa antes do reajuste e apresenta comparativo com outras operadoras." },
    ],
    relatedOperadoras: ["bradesco-saude", "sulamerica-saude", "amil", "porto-saude", "hapvida-notredame", "omint", "care-plus"],
  },
  {
    slug: "idosos",
    path: "/plano-de-saude-idosos-guarulhos",
    label: "Idosos",
    cardTitle: "Plano de Saúde para Idosos em Guarulhos",
    cardDescription: "Terceira idade, operadoras especializadas (Prevent Senior, MedSenior) e rede consolidada em SP.",
    audience: "Público 59+ e famílias que buscam plano para idosos",
    seo: {
      title: "Plano de Saúde para Idosos em Guarulhos | Patro Seguros",
      description: "Plano de saúde para idosos em Guarulhos: Prevent Senior, MedSenior, Bradesco Saúde e opções nacionais. Compare rede, carência e regras com a Patro.",
      h1: "Plano de Saúde para Idosos em Guarulhos",
      subtitle: "Comparativo consultivo entre operadoras que atendem o público 59+ em Guarulhos, com rede especializada e cuidado contínuo.",
      serviceType: "Plano de Saúde para Idosos",
    },
    whatsapp: { origem: "saude_idosos_guarulhos", extraLine: "Quero comparar planos de saúde para idosos em Guarulhos." },
    cta: { primary: "Falar com consultor para plano sênior", secondary: "Comparar opções para terceira idade" },
    sections: {
      intro:
        "O plano de saúde para idosos em Guarulhos exige atenção redobrada: a partir dos 59 anos, o preço é significativamente maior, a disponibilidade de produtos é reduzida e a rede credenciada precisa ter cardiologia, geriatria, oncologia e serviços de apoio. Operadoras como Prevent Senior e MedSenior são especializadas no público sênior, com rede própria em SP. Bradesco, SulAmérica, Amil e Porto Saúde também atendem 59+, mas cada uma com regras próprias de aceitação, carência e reajuste. A Patro Seguros ajuda a família a escolher o produto que faz sentido para o perfil do titular idoso, respeitando estado de saúde, uso previsto e orçamento familiar.",
      forWhom: [
        "Titulares a partir de 59 anos",
        "Famílias que querem incluir pai/mãe idosos",
        "Aposentados que perderam o plano corporativo",
        "Idosos em Guarulhos, Cidade Maia e região",
        "Quem busca especialidades geriátricas consolidadas",
      ],
      howPatroHelps: [
        "Filtro de operadoras que aceitam 59+ com o produto certo",
        "Verificação de rede geriátrica e cardiológica em Guarulhos",
        "Orientação sobre carência e portabilidade a partir do plano atual",
        "Análise do reajuste por faixa etária (última faixa aos 59)",
        "Apoio no preenchimento da declaração de saúde",
      ],
      whatToCompare: [
        "Aceitação da idade do titular",
        "Rede geriátrica e cardiológica em Guarulhos e SP",
        "Cobertura oncológica e de terapias contínuas",
        "Coparticipação para consultas de rotina",
        "Regras de reajuste (última faixa etária aos 59)",
        "Programas de cuidado continuado da operadora",
      ],
      localNote:
        "Verificamos a disponibilidade real de cada operadora para o CEP do idoso — inclusive rede em Cidade Maia, Vila Galvão, Centro, Macedo, Gopoúva e clínicas geriátricas de referência em São Paulo.",
    },
    faqs: [
      { question: "Qual é o melhor plano de saúde para idosos em Guarulhos?", answer: "Depende do perfil. Prevent Senior e MedSenior são operadoras dedicadas ao público 59+ com rede própria em SP. Bradesco, SulAmérica, Amil e Porto Saúde também atendem idosos, com rede mais ampla nacional. A Patro compara todas dentro da faixa etária e do CEP." },
      { question: "Existe carência específica para idosos?", answer: "As carências seguem o padrão da ANS (24h urgência, 180 dias exames/internações, 300 dias parto). O aproveitamento de carência é possível na portabilidade regulamentada — muito importante para quem já tem plano ativo e quer trocar sem perder tempo cumprido." },
      { question: "Aos 59 anos o plano fica muito mais caro?", answer: "Sim. A última faixa etária definida pela ANS é aos 59 anos, e o percentual do reajuste dessa mudança é normalmente o maior do contrato. Depois dos 59 não há mais reajuste por faixa etária, só por VCMH/sinistralidade." },
      { question: "Aposentado que perdeu o plano corporativo pode manter?", answer: "Sim. A Lei nº 9.656/98 garante ao aposentado com 10 anos ou mais de contribuição o direito de manter o plano corporativo pagando integralmente. Alternativamente, é possível migrar via portabilidade para outro plano, individual, adesão ou familiar." },
      { question: "Idoso pode contratar plano de saúde sem carência?", answer: "Sem carência 100% só via portabilidade regulamentada pela ANS, respeitando prazos mínimos no plano atual e faixa de preço compatível. Em novas contratações, as carências padrão se aplicam." },
      { question: "Prevent Senior e MedSenior atendem em Guarulhos?", answer: "Prevent Senior tem rede consolidada em SP capital e atende beneficiários de Guarulhos via unidades na zona norte e centro de SP. MedSenior tem operação nacional com rede credenciada e centros próprios. A Patro valida a rede disponível para o CEP do idoso." },
    ],
    relatedOperadoras: ["prevent-senior", "medsenior", "bradesco-saude", "sulamerica-saude", "amil", "porto-saude"],
  },
  {
    slug: "odontologico",
    path: "/plano-odontologico-guarulhos",
    label: "Odontológico",
    cardTitle: "Plano Odontológico em Guarulhos",
    cardDescription: "Pessoa física, família ou empresa, com rede odontológica ampla e mensalidade acessível.",
    audience: "Pessoa física, família e empresas que querem incluir odonto como benefício",
    seo: {
      title: "Plano Odontológico em Guarulhos | Cotação Patro Seguros",
      description: "Plano odontológico em Guarulhos para pessoa física, família e empresas. Compare operadoras, rede credenciada e valores com a Patro Seguros.",
      h1: "Plano Odontológico em Guarulhos",
      subtitle: "Cobertura de rotina, urgência, procedimentos e ortodontia com operadoras que atendem Guarulhos e São Paulo.",
      serviceType: "Plano Odontológico",
    },
    whatsapp: { origem: "saude_odonto_guarulhos", extraLine: "Quero cotar plano odontológico em Guarulhos." },
    cta: { primary: "Cotar plano odontológico", secondary: "Falar com especialista" },
    sections: {
      intro:
        "O plano odontológico em Guarulhos é uma das contratações de melhor custo-benefício em saúde: mensalidades acessíveis, rede ampla e cobertura obrigatória de procedimentos definidos pela ANS. Serve tanto para pessoa física quanto para empresas que querem incluí-lo como benefício adicional. A Patro Seguros compara operadoras como Bradesco Dental, Amil Dental, SulAmérica Odonto, MetLife, Odontoprev e outras — considerando rede em Guarulhos, cobertura de ortodontia, prótese e implantes, além do modelo de coparticipação.",
      forWhom: [
        "Pessoa física e famílias",
        "Empresas que querem oferecer odonto como benefício",
        "MEI com CNPJ ativo",
        "PMEs a partir de 2 vidas",
        "Quem quer complementar o plano de saúde médico-hospitalar",
      ],
      howPatroHelps: [
        "Comparativo de rede odontológica em Guarulhos",
        "Análise de cobertura de ortodontia e prótese",
        "Simulação de plano com ou sem coparticipação",
        "Estruturação como benefício empresarial",
        "Apoio na utilização e reembolso",
      ],
      whatToCompare: [
        "Rede credenciada em Guarulhos e SP",
        "Cobertura de ortodontia, prótese e implante",
        "Carência para cada procedimento",
        "Coparticipação",
        "Preço mensal por vida",
        "Regras para MEI, PME e corporativo",
      ],
      localNote:
        "Priorizamos clínicas odontológicas credenciadas próximas do bairro do beneficiário, com foco em Cidade Maia, Centro, Vila Galvão, Bonsucesso, Macedo, Cumbica e distritos vizinhos.",
    },
    faqs: [
      { question: "Quanto custa plano odontológico em Guarulhos?", answer: "Em geral, planos odontológicos em Guarulhos ficam entre R$ 25 e R$ 90 por vida/mês, dependendo da operadora, cobertura contratada (com ou sem ortodontia/prótese) e modelo de coparticipação. Planos empresariais são mais baratos por vida que os individuais." },
      { question: "Ortodontia é coberta pelo plano odontológico?", answer: "Nem sempre por padrão. A ANS obriga cobertura de procedimentos definidos no rol; ortodontia (aparelhos) costuma ser cobertura adicional, com carência maior e coparticipação. A Patro verifica caso a caso qual operadora inclui ortodontia sem custo extra." },
      { question: "Prótese e implante entram no plano odontológico?", answer: "Implantes não fazem parte do rol obrigatório da ANS na maioria dos casos; próteses simples (removíveis) são cobertas conforme regras da operadora. Alguns produtos premium incluem implantes com coparticipação — a Patro sinaliza produto a produto." },
      { question: "Qual a carência do plano odontológico?", answer: "Carências típicas: 24h para urgência/emergência, 30 dias para procedimentos simples (consultas, restaurações), 180 dias para procedimentos de alta complexidade (endodontia, cirurgia) e até 24 meses para ortodontia e prótese." },
      { question: "Empresa pode oferecer odonto como benefício isolado?", answer: "Sim. É uma das formas mais econômicas de estruturar benefícios: baixo custo por vida, alta percepção de valor pelo colaborador e regras de coparticipação flexíveis. Muitas empresas oferecem odonto isolado antes de estruturar plano médico." },
      { question: "MEI pode contratar plano odontológico empresarial?", answer: "Sim. Grande parte das operadoras aceita MEI com CNPJ ativo para plano odontológico empresarial, com preço melhor que o individual e regras similares às de PME." },
    ],
    relatedOperadoras: ["bradesco-saude", "amil", "sulamerica-saude", "porto-saude", "hapvida-notredame"],
  },
];

/* -------------------------------------------------------------------------- */
/*                                OPERADORAS                                    */
/* -------------------------------------------------------------------------- */

export const TRANSPARENCY_NOTICE = (name: string) =>
  `A Patro Seguros é uma corretora/intermediadora de seguros e planos de saúde. Esta página não é o site oficial da ${name}. As marcas mencionadas pertencem aos seus respectivos titulares. A disponibilidade de produtos, preços, rede, coberturas e aceitação depende das regras da operadora e do perfil do cliente.`;

export const SAUDE_OPERADORAS: SaudeOperadora[] = [
  {
    slug: "bradesco-saude",
    path: "/bradesco-saude-guarulhos",
    name: "Bradesco Saúde",
    accentColor: "#c8102e",
    shortDescription: "Uma das maiores operadoras do Brasil, referência em rede nacional e reembolso para o mercado corporativo e planos individuais.",
    profileFit: "Empresas, PMEs, MEIs e famílias que valorizam rede nacional ampla e sistema de reembolso.",
    planTypes: ["Individual", "Familiar", "MEI", "PME", "Corporativo"],
    attentionPoints: [
      "Categorias variam por hospital e região",
      "Reembolso segue tabela e limites contratuais",
      "Rede em Guarulhos varia por produto",
    ],
    seoTitle: "Bradesco Saúde em Guarulhos | Cotação pela Patro Seguros",
    seoDescription: "Cotação de Bradesco Saúde em Guarulhos: planos individuais, familiares, MEI, PME e corporativo. Comparativo consultivo pela Patro Seguros.",
    h1: "Bradesco Saúde em Guarulhos com atendimento da Patro Seguros",
    faqs: [
      { question: "Bradesco Saúde aceita MEI em Guarulhos?", answer: "Depende do produto vigente. A Bradesco tem histórico de produtos MEI com regras próprias de documentação e vidas mínimas. A Patro verifica a disponibilidade atual antes de qualquer proposta." },
      { question: "Bradesco Saúde tem rede em Guarulhos?", answer: "Sim, com hospitais, clínicas e laboratórios credenciados na região. A rede varia por categoria de plano — a Patro consulta a rede efetiva pelo CEP antes da contratação." },
      { question: "Como funciona o reembolso Bradesco?", answer: "O reembolso segue tabela contratual, com percentuais e limites por procedimento definidos no produto contratado. Depende da categoria escolhida (linha Efetivo, Nacional, Nacional Flex, Top, etc.)." },
    ],
    existingRoute: "/saude/bradesco",
  },
  {
    slug: "sulamerica-saude",
    path: "/sulamerica-saude-guarulhos",
    name: "SulAmérica Saúde",
    accentColor: "#f37021",
    shortDescription: "Operadora tradicional com forte oferta de reembolso, telemedicina e produtos para empresas e famílias em SP.",
    profileFit: "Famílias e empresas que buscam rede premium, reembolso e programas de saúde integrados.",
    planTypes: ["Individual (limitado)", "Familiar", "PME", "Corporativo"],
    attentionPoints: [
      "Oferta de individual reduzida em algumas regiões",
      "Categoria do plano define hospitais de acesso",
      "Programas de bem-estar e telemedicina inclusos em alguns produtos",
    ],
    seoTitle: "SulAmérica Saúde em Guarulhos | Cotação pela Patro Seguros",
    seoDescription: "SulAmérica Saúde em Guarulhos: planos familiares, PME, corporativo, telemedicina e reembolso. Comparativo consultivo com a Patro Seguros.",
    h1: "SulAmérica Saúde em Guarulhos com atendimento da Patro Seguros",
    faqs: [
      { question: "SulAmérica tem plano individual em Guarulhos?", answer: "A oferta de plano individual da SulAmérica é reduzida e depende da região. Em muitos casos, o portfólio ativo é focado em PME e corporativo. A Patro valida a disponibilidade real antes da proposta." },
      { question: "SulAmérica inclui telemedicina?", answer: "Em vários produtos, sim. A operadora tem programas de telemedicina e bem-estar embutidos em determinadas categorias — consulte o produto específico antes da contratação." },
      { question: "Como funciona o reembolso SulAmérica?", answer: "O reembolso é feito conforme tabela do produto contratado, com múltiplos e limites por procedimento. Cada linha de plano tem regras próprias — a Patro esclarece antes da adesão." },
    ],
    existingRoute: "/saude/sulamerica",
  },
  {
    slug: "amil",
    path: "/amil-guarulhos",
    name: "Amil",
    accentColor: "#0072ce",
    shortDescription: "Operadora com forte presença nacional, rede própria (One Health/Amil Med) e produtos amplos para PF, MEI, PME e corporativo.",
    profileFit: "Empresas, PMEs, MEIs e famílias que buscam rede nacional consolidada e centros médicos próprios.",
    planTypes: ["Individual", "Familiar", "MEI", "PME", "Corporativo"],
    attentionPoints: [
      "Diferentes categorias com abrangências distintas",
      "Centros médicos Amil disponíveis em SP",
      "Rede varia por segmento (Fácil, Blue, One, etc.)",
    ],
    seoTitle: "Amil em Guarulhos | Cotação pela Patro Seguros",
    seoDescription: "Amil em Guarulhos: cotação de planos individuais, familiares, MEI, PME e corporativo. Comparativo de rede e categoria com a Patro Seguros.",
    h1: "Amil em Guarulhos com atendimento da Patro Seguros",
    faqs: [
      { question: "Amil tem centros médicos próprios em SP?", answer: "Sim. A Amil opera centros médicos próprios e rede credenciada em várias regiões de SP, com uso frequente pelos beneficiários de Guarulhos. A Patro valida a rede efetiva pelo CEP." },
      { question: "Amil aceita MEI para plano de saúde?", answer: "Depende do produto vigente. A Amil tem histórico de produtos MEI e PME a partir de poucas vidas. A Patro verifica a disponibilidade atualizada antes da proposta." },
      { question: "Qual a diferença entre as linhas Amil?", answer: "Amil possui múltiplas linhas (Fácil, Blue, Amil One Health, etc.) com abrangência, rede e reembolso distintos. A Patro compara as opções disponíveis dentro do orçamento e perfil do cliente." },
    ],
    existingRoute: "/saude/amil",
  },
  {
    slug: "porto-saude",
    path: "/porto-saude-guarulhos",
    name: "Porto Saúde",
    accentColor: "#0033a0",
    shortDescription: "Operadora do grupo Porto, com foco em telemedicina, coordenação de cuidado e rede referenciada de qualidade em SP.",
    profileFit: "Famílias, empresas e MEIs que querem coordenação de cuidado, telemedicina e rede referenciada em SP.",
    planTypes: ["Individual", "Familiar", "MEI", "PME", "Corporativo"],
    attentionPoints: [
      "Rede referenciada mais enxuta que operadoras tradicionais",
      "Foco em telemedicina e coordenação de cuidado",
      "Alguns produtos exigem médico de referência",
    ],
    seoTitle: "Porto Saúde em Guarulhos | Cotação pela Patro Seguros",
    seoDescription: "Porto Saúde em Guarulhos: telemedicina, coordenação de cuidado, planos MEI, PME e familiares. Compare com a Patro Seguros.",
    h1: "Porto Saúde em Guarulhos com atendimento da Patro Seguros",
    faqs: [
      { question: "Porto Saúde tem rede em Guarulhos?", answer: "Sim, com hospitais e clínicas referenciados na região metropolitana. A rede varia por produto e categoria — a Patro consulta a rede efetiva pelo CEP antes da contratação." },
      { question: "Porto Saúde exige médico de referência?", answer: "Alguns produtos Porto Saúde utilizam modelo de coordenação com médico de referência. Outros são de livre escolha dentro da rede referenciada. A Patro esclarece o modelo antes da contratação." },
      { question: "A telemedicina Porto Saúde é ilimitada?", answer: "Nos produtos que incluem telemedicina, o modelo costuma ser de acesso amplo com regras próprias de agendamento e especialidades disponíveis. Consulte o produto específico antes da adesão." },
    ],
    existingRoute: "/saude/porto-saude",
  },
  {
    slug: "hapvida-notredame",
    path: "/hapvida-notredame-guarulhos",
    name: "Hapvida/NotreDame Intermédica",
    accentColor: "#ee1c25",
    shortDescription: "Maior operadora de saúde do Brasil por número de beneficiários, com rede própria (hospitais e clínicas) e foco em custo-benefício.",
    profileFit: "Famílias e empresas que valorizam custo-benefício e rede própria consolidada em SP.",
    planTypes: ["Individual", "Familiar", "MEI", "PME", "Corporativo"],
    attentionPoints: [
      "Rede predominantemente própria (hospitais e clínicas)",
      "Abrangência varia por produto (municipal, regional ou nacional)",
      "Programas de gerenciamento de saúde crônica",
    ],
    seoTitle: "Hapvida NotreDame Intermédica em Guarulhos | Patro Seguros",
    seoDescription: "Hapvida/NotreDame em Guarulhos: rede própria, PME, MEI, familiar. Compare custo-benefício e coberturas com a Patro Seguros.",
    h1: "Hapvida/NotreDame Intermédica em Guarulhos com atendimento da Patro Seguros",
    faqs: [
      { question: "Hapvida/NotreDame tem hospitais próprios em Guarulhos?", answer: "Sim. O grupo Hapvida/NotreDame possui rede própria consolidada em SP, com utilização frequente por beneficiários de Guarulhos. A rede efetiva depende do produto e é validada pela Patro antes da contratação." },
      { question: "A rede é apenas própria ou também credenciada?", answer: "Predominantemente própria (hospitais, clínicas e laboratórios do grupo), com credenciamento pontual para procedimentos específicos. É o principal diferencial de custo do grupo." },
      { question: "Aceita MEI e PME a partir de poucas vidas?", answer: "Historicamente, sim. Tanto Hapvida quanto NotreDame trabalham com MEI e PME a partir de vidas reduzidas. A Patro confirma a disponibilidade do produto vigente antes de emitir proposta." },
    ],
    existingRoute: "/saude/hapvida",
  },
  {
    slug: "prevent-senior",
    path: "/prevent-senior-guarulhos",
    name: "Prevent Senior",
    accentColor: "#005baa",
    shortDescription: "Operadora especializada no público 49+/59+, com rede própria em SP e programas de acompanhamento contínuo do idoso.",
    profileFit: "Público sênior (49+/59+), famílias que buscam plano dedicado à terceira idade.",
    planTypes: ["Individual (49+)", "Familiar"],
    attentionPoints: [
      "Restrição a faixa etária mínima",
      "Rede própria em SP capital",
      "Regras específicas de aceitação e carência",
    ],
    seoTitle: "Prevent Senior em Guarulhos | Cotação pela Patro Seguros",
    seoDescription: "Prevent Senior em Guarulhos: plano de saúde para 49+/59+, rede própria em SP e programa de cuidado contínuo. Compare com a Patro Seguros.",
    h1: "Prevent Senior em Guarulhos com atendimento da Patro Seguros",
    faqs: [
      { question: "Prevent Senior aceita a partir de que idade?", answer: "A Prevent Senior é especializada no público sênior, com produtos direcionados às faixas 49+ e 59+. A regra de aceitação depende do produto vigente e é validada pela Patro antes da proposta." },
      { question: "Prevent Senior atende beneficiários de Guarulhos?", answer: "A operadora tem rede consolidada em SP capital, utilizada por beneficiários de Guarulhos via unidades da zona norte e centro. A Patro valida a rede efetiva antes da contratação." },
      { question: "Prevent Senior aceita portabilidade?", answer: "Sim, mediante regras da ANS: prazo mínimo no plano atual e faixa de preço compatível. A Patro conduz o processo de portabilidade quando aplicável." },
    ],
    existingRoute: "/saude/prevent-senior",
  },
  {
    slug: "unimed",
    path: "/unimed-guarulhos",
    name: "Unimed",
    accentColor: "#00995d",
    shortDescription: "Cooperativa médica com forte capilaridade nacional, atendimento por Unimeds regionais e ampla rede referenciada.",
    profileFit: "Famílias, MEIs e empresas que valorizam presença nacional e atendimento cooperativado.",
    planTypes: ["Individual", "Familiar", "MEI", "PME", "Corporativo"],
    attentionPoints: [
      "Cada Unimed é uma cooperativa autônoma",
      "Portabilidade entre Unimeds tem regras próprias",
      "Rede varia por Unimed responsável pela venda",
    ],
    seoTitle: "Unimed em Guarulhos | Cotação pela Patro Seguros",
    seoDescription: "Unimed em Guarulhos: planos familiares, MEI, PME e corporativo com atendimento cooperativado. Comparativo consultivo pela Patro Seguros.",
    h1: "Unimed em Guarulhos com atendimento da Patro Seguros",
    faqs: [
      { question: "Qual Unimed atende Guarulhos?", answer: "Guarulhos é atendida por Unimeds da região metropolitana, com regras próprias de rede e comercialização. A Patro identifica a Unimed responsável pelo produto e valida a rede pelo CEP." },
      { question: "Posso usar Unimed de outra cidade?", answer: "Sim, o Sistema Unimed permite intercâmbio nacional entre as cooperativas. Alguns produtos limitam a abrangência à área de comercialização; outros são nacionais. A Patro confirma antes da contratação." },
      { question: "Unimed aceita MEI e PME?", answer: "Sim, com regras próprias de cada Unimed. A oferta varia por cooperativa comercializadora. A Patro identifica o produto vigente disponível para o cliente." },
    ],
    existingRoute: "/saude/unimed",
  },
  {
    slug: "medsenior",
    path: "/medsenior-guarulhos",
    name: "MedSenior",
    accentColor: "#8b5cf6",
    shortDescription: "Operadora nacional especializada em público 49+/60+, com centros próprios, programas de cuidado e foco em prevenção.",
    profileFit: "Público sênior 49+/60+ que busca centros próprios e programas dedicados à terceira idade.",
    planTypes: ["Individual (49+/60+)", "Familiar"],
    attentionPoints: [
      "Restrição por faixa etária",
      "Cobertura e rede variam por região",
      "Programas de prevenção como diferencial",
    ],
    seoTitle: "MedSenior em Guarulhos | Cotação pela Patro Seguros",
    seoDescription: "MedSenior em Guarulhos: plano de saúde para 49+/60+ com centros próprios e programas de prevenção. Compare com a Patro Seguros.",
    h1: "MedSenior em Guarulhos com atendimento da Patro Seguros",
    faqs: [
      { question: "MedSenior atende Guarulhos?", answer: "A rede MedSenior tem capilaridade nacional e é usada por beneficiários de Guarulhos via unidades próprias e credenciadas em SP. A Patro valida a rede efetiva pelo CEP antes da contratação." },
      { question: "MedSenior aceita menores de 49 anos?", answer: "Não. O foco da MedSenior é o público 49+/60+. A idade mínima varia por produto e é validada pela Patro antes da proposta." },
      { question: "Como funciona o programa de prevenção MedSenior?", answer: "A operadora oferece programas de gerenciamento de doenças crônicas, acompanhamento contínuo e prevenção — variam por produto e localidade. Consulte antes da adesão." },
    ],
    existingRoute: "/saude/medsenior",
  },
  {
    slug: "sami",
    path: "/sami-guarulhos",
    name: "Sami",
    accentColor: "#00b8a9",
    shortDescription: "Operadora digital com modelo de atenção primária, médico de referência e foco em jornada de cuidado.",
    profileFit: "Adultos jovens, famílias e PMEs que se identificam com modelo de atenção primária e app-first.",
    planTypes: ["Individual", "Familiar", "PME"],
    attentionPoints: [
      "Rede referenciada mais enxuta",
      "Uso do app é central na jornada",
      "Coordenação por médico de referência",
    ],
    seoTitle: "Sami em Guarulhos | Cotação pela Patro Seguros",
    seoDescription: "Sami em Guarulhos: plano de saúde digital com médico de referência, atenção primária e telemedicina. Compare com a Patro Seguros.",
    h1: "Sami em Guarulhos com atendimento da Patro Seguros",
    faqs: [
      { question: "Sami atende Guarulhos?", answer: "A Sami opera em regiões específicas da grande SP. A disponibilidade para CEPs de Guarulhos é validada pela Patro antes da proposta." },
      { question: "Como funciona o médico de referência Sami?", answer: "Cada beneficiário tem um médico de referência que coordena a jornada de cuidado, incluindo consultas com especialistas e exames. Encaixa-se em perfis que valorizam atenção primária estruturada." },
      { question: "Sami tem PME?", answer: "Sim, dentro do modelo digital e regras próprias. A Patro confirma a oferta atual antes de emitir proposta." },
    ],
    existingRoute: "/saude/sami",
  },
  {
    slug: "alice-saude",
    path: "/alice-saude-guarulhos",
    name: "Alice",
    accentColor: "#ff6b6b",
    shortDescription: "Operadora digital que combina time de saúde próprio, jornada por app e rede referenciada premium em SP.",
    profileFit: "PMEs, startups e famílias digitais que priorizam jornada guiada, telemedicina e rede referenciada.",
    planTypes: ["Familiar", "PME"],
    attentionPoints: [
      "Cobertura restrita a regiões atendidas",
      "Modelo com Time de Saúde próprio via app",
      "Rede referenciada premium mais enxuta",
    ],
    seoTitle: "Alice em Guarulhos | Cotação pela Patro Seguros",
    seoDescription: "Alice em Guarulhos: plano de saúde digital com time de saúde próprio, telemedicina e rede referenciada. Compare com a Patro Seguros.",
    h1: "Alice em Guarulhos com atendimento da Patro Seguros",
    faqs: [
      { question: "Alice atende Guarulhos?", answer: "A Alice opera em regiões específicas de SP. A disponibilidade para CEPs de Guarulhos é validada pela Patro antes da proposta." },
      { question: "Como funciona o Time de Saúde Alice?", answer: "O beneficiário tem acesso a um time de saúde próprio via app (médicos, enfermeiros e especialistas) para atendimento imediato e coordenação de cuidado. É o principal diferencial de jornada." },
      { question: "Alice tem plano individual?", answer: "O portfólio Alice é focado em coletivos (familiar e PME). A Patro confirma o produto vigente antes da proposta." },
    ],
    existingRoute: "/saude/alice",
  },
  {
    slug: "omint",
    path: "/omint-guarulhos",
    name: "Omint",
    accentColor: "#003366",
    shortDescription: "Operadora premium com foco em rede referenciada de alta linha, reembolso amplo e atendimento diferenciado.",
    profileFit: "Executivos, famílias de alta renda e empresas que buscam produto premium com rede diferenciada em SP.",
    planTypes: ["Familiar", "PME", "Corporativo"],
    attentionPoints: [
      "Portfólio premium com preço mais elevado",
      "Reembolso amplo em rede livre",
      "Rede referenciada seletiva",
    ],
    seoTitle: "Omint em Guarulhos | Cotação pela Patro Seguros",
    seoDescription: "Omint em Guarulhos: plano premium com rede referenciada, reembolso amplo e atendimento diferenciado. Compare com a Patro Seguros.",
    h1: "Omint em Guarulhos com atendimento da Patro Seguros",
    faqs: [
      { question: "Omint tem rede em Guarulhos?", answer: "Omint tem rede consolidada em SP capital, com uso frequente por beneficiários de Guarulhos via principais hospitais e clínicas premium. A Patro valida a rede efetiva pelo CEP." },
      { question: "Como funciona o reembolso Omint?", answer: "Omint é conhecida por reembolso amplo em rede livre, com múltiplos e limites definidos por produto. A Patro esclarece as regras do plano escolhido antes da contratação." },
      { question: "Omint tem plano individual?", answer: "O portfólio Omint concentra-se em familiar, PME e corporativo. Individual, quando disponível, tem regras específicas de aceitação. A Patro confirma o produto vigente." },
    ],
  },
  {
    slug: "care-plus",
    path: "/care-plus-guarulhos",
    name: "Care Plus",
    accentColor: "#0069b4",
    shortDescription: "Operadora premium com foco em corporativo, rede referenciada seletiva em SP e serviços de coordenação e wellness.",
    profileFit: "Corporativos e famílias que buscam produto premium com rede referenciada, wellness e coordenação de cuidado.",
    planTypes: ["PME (a partir de x vidas)", "Corporativo"],
    attentionPoints: [
      "Foco em empresas, oferta individual restrita",
      "Preço médio superior à média de mercado",
      "Rede referenciada premium",
    ],
    seoTitle: "Care Plus em Guarulhos | Cotação pela Patro Seguros",
    seoDescription: "Care Plus em Guarulhos: plano premium para empresas com rede referenciada e coordenação de cuidado. Compare com a Patro Seguros.",
    h1: "Care Plus em Guarulhos com atendimento da Patro Seguros",
    faqs: [
      { question: "Care Plus atende Guarulhos?", answer: "Care Plus tem rede referenciada em SP com uso por beneficiários de Guarulhos via principais hospitais e clínicas parceiras. A Patro confirma a rede pelo CEP antes da contratação." },
      { question: "Care Plus tem plano individual?", answer: "O portfólio Care Plus concentra-se em corporativo e PME acima de determinado porte. Individual é oferta restrita. A Patro verifica a viabilidade caso a caso." },
      { question: "Care Plus inclui wellness?", answer: "Sim, muitos produtos incluem programas de wellness, coordenação de cuidado e telemedicina como diferenciais premium. Consulte o produto específico antes da contratação." },
    ],
  },
];

export const getSubtype = (slug: SaudeSubtypeSlug) =>
  SAUDE_SUBTYPES.find((s) => s.slug === slug)!;

export const getOperadora = (slug: string) =>
  SAUDE_OPERADORAS.find((o) => o.slug === slug);

export const HUB_PATH = "/plano-de-saude-guarulhos";

export const HUB_FAQS: { question: string; answer: string }[] = [
  { question: "Qual é o melhor plano de saúde em Guarulhos?", answer: "Não existe melhor absoluto. O melhor plano depende do perfil, faixa etária, número de vidas, rede hospitalar desejada, coparticipação e orçamento. A Patro Seguros compara Bradesco Saúde, SulAmérica, Amil, Porto Saúde, Hapvida/NotreDame, Prevent Senior, Unimed e outras dentro do seu contexto." },
  { question: "Quanto custa um plano de saúde em Guarulhos?", answer: "O preço varia por faixa etária, tipo de contratação (individual, familiar, MEI, PME, empresarial), cobertura, acomodação, coparticipação e operadora. Em 2026, o ponto de partida costuma ficar entre R$ 280 e R$ 600/mês em adultos jovens e sobe conforme a idade. Cotação sem custo pela Patro." },
  { question: "MEI pode contratar plano de saúde empresarial?", answer: "Sim, com CNPJ MEI ativo e documentação básica. Nem toda operadora aceita MEI de 1 vida titular — a Patro filtra apenas produtos disponíveis para o seu caso." },
  { question: "Plano empresarial é mais barato que individual?", answer: "Na maioria dos casos, sim. A economia costuma variar de 20% a 40% para o mesmo padrão de rede e cobertura." },
  { question: "Como funciona a carência em plano de saúde?", answer: "Carência é o tempo mínimo até poder usar cada tipo de cobertura. Regras típicas: 24h urgência/emergência, 30 dias consultas simples, 180 dias exames complexos e internações, 300 dias parto a termo. Algumas coberturas pré-existentes seguem a CPT (24 meses)." },
  { question: "Posso aproveitar carências de outro plano?", answer: "Sim, via portabilidade regulamentada pela ANS, respeitando prazo mínimo no plano atual, faixa de preço compatível e produto de destino ativo. A Patro Seguros conduz o processo." },
  { question: "Quais operadoras atendem Guarulhos?", answer: "Bradesco Saúde, SulAmérica, Amil, Porto Saúde, Hapvida/NotreDame Intermédica, Prevent Senior, Unimed, MedSenior, Sami, Alice, Omint e Care Plus são operadoras que atendem beneficiários com CEP em Guarulhos, com regras próprias de rede, aceitação e produtos disponíveis." },
  { question: "A Patro compara planos de saúde?", answer: "Sim. Fazemos comparativo consultivo entre as operadoras disponíveis para o perfil do cliente, considerando rede, carência, coparticipação, reembolso, faixa etária, número de vidas e orçamento." },
  { question: "Posso contratar pelo WhatsApp?", answer: "Sim. Toda a jornada — cotação, comparativo, envio de documentos, contratação e apoio pós-venda — pode ser feita pelo WhatsApp. Também atendemos presencialmente na Cidade Maia, em Guarulhos." },
  { question: "A cotação é gratuita?", answer: "Sim. A cotação e o comparativo consultivo são gratuitos. Você paga o mesmo valor de tabela da operadora — a Patro é remunerada pela operadora após a contratação." },
];