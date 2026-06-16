/**
 * Conteúdo das páginas premium (Patro Private).
 * Cada entrada é consumida por PremiumPageTemplate.
 * Sem números inventados. Linguagem consultiva.
 */

export interface PremiumPageContent {
  slug: string;                       // ex: "/seguro-auto-premium-guarulhos"
  eyebrow: string;                    // tag editorial acima do H1
  heroSubtitle: string;               // até ~180 char
  intro: string;                      // parágrafo de abertura editorial
  audience: { title: string; items: string[] };
  coverages: { title: string; items: { name: string; desc: string }[] };
  compareChecklist: { title: string; items: string[] };
  commonMistakes: { title: string; items: string[] };
  faqs: { question: string; answer: string }[];
  relatedCta?: { label: string; href: string }[];
}

export const premiumPagesContent: Record<string, PremiumPageContent> = {
  "/seguro-auto-premium-guarulhos": {
    slug: "/seguro-auto-premium-guarulhos",
    eyebrow: "Patro Private · Veículos",
    heroSubtitle:
      "Análise consultiva de cobertura para veículos importados, SUVs premium e carros de alto valor em Guarulhos e região.",
    intro:
      "Um carro premium não é apenas mais caro de repor: ele exige peças importadas, oficinas autorizadas, guincho compatível e cláusulas que muitos seguros padrão não contemplam. A Patro Private estrutura a apólice a partir do perfil do condutor, do uso real do veículo e da rede de assistência adequada — não a partir de uma planilha genérica.",
    audience: {
      title: "Para quem é esta análise",
      items: [
        "Proprietários de SUVs e sedãs premium (Volvo, BMW, Mercedes, Audi, Lexus)",
        "Importados e veículos de luxo de baixo volume",
        "Veículos blindados em Guarulhos e região metropolitana",
        "Famílias com mais de um veículo de alto valor agregado",
        "Executivos com uso intercalado entre Guarulhos, São Paulo e aeroporto",
      ],
    },
    coverages: {
      title: "O que avaliamos em uma cobertura premium",
      items: [
        { name: "Casco compreensivo", desc: "Indenização integral em perda total, com cláusula de valor de mercado referenciado e revisão anual da soma segurada." },
        { name: "Peças e oficinas autorizadas", desc: "Reparo em concessionária ou rede equivalente, com peças genuínas e tempo médio de oficina compatível com importados." },
        { name: "Vidros, retrovisores e faróis", desc: "Sublimites adequados ao valor real dos componentes — não ao padrão de carros populares." },
        { name: "Assistência 24h compatível", desc: "Guincho com plataforma para tração integral, chaveiro especializado e carro reserva da mesma categoria." },
        { name: "Responsabilidade civil ampliada", desc: "Limites de RC compatíveis com o perfil patrimonial do segurado, não com o mínimo de mercado." },
        { name: "Cobertura para condutores eventuais", desc: "Cônjuge, filhos habilitados e motoristas autorizados, sem agravo desnecessário." },
      ],
    },
    compareChecklist: {
      title: "O que comparamos entre seguradoras",
      items: [
        "Critério de indenização: tabela FIPE, valor de mercado referenciado ou valor determinado",
        "Sublimites de vidros, faróis e equipamentos eletrônicos embarcados",
        "Rede referenciada para a marca específica do veículo",
        "Franquia obrigatória, reduzida e isenta — e em que situações cada uma se aplica",
        "Cobertura para uso em viagens internacionais (Mercosul)",
        "Tempo de regulação de sinistro e exigências documentais",
      ],
    },
    commonMistakes: {
      title: "Erros comuns em seguros para carros premium",
      items: [
        "Aceitar a tabela FIPE pura como referência de indenização em importados pouco negociados",
        "Subestimar o sublimite de vidros, que em premium pode ultrapassar o limite contratado",
        "Esquecer de declarar blindagem, customizações e equipamentos de áudio/multimídia",
        "Contratar oficina referenciada padrão sem rede para a marca",
        "Manter RC abaixo do necessário, expondo o patrimônio em caso de acidente com terceiros",
      ],
    },
    faqs: [
      { question: "O seguro auto premium é muito mais caro?", answer: "Não necessariamente. O prêmio depende do perfil do condutor, CEP, uso e cobertura escolhida. Em muitos casos, ajustar cláusulas (em vez de comprar a apólice mais cara) gera proteção melhor com prêmio equivalente ao convencional." },
      { question: "Posso ter cobertura para uso eventual de outro condutor?", answer: "Sim. A apólice pode ser estruturada com condutores nomeados ou com cobertura ampla para condutores eventuais, com ajuste técnico do perfil." },
      { question: "Vocês trabalham com oficinas autorizadas das montadoras premium?", answer: "Sim. Validamos com cada seguradora a rede referenciada para a marca específica do seu veículo antes de fechar a apólice." },
      { question: "Como funciona se o carro for roubado ou furtado?", answer: "Após o boletim e a comunicação à seguradora, a regulação verifica documentação e cobertura. Em perda total por roubo/furto, a indenização segue o critério contratado (FIPE, valor de mercado ou valor determinado)." },
    ],
    relatedCta: [
      { label: "Seguro para carros de luxo", href: "/seguro-carros-luxo-guarulhos" },
      { label: "Seguro para carro blindado", href: "/seguro-carro-blindado-guarulhos" },
    ],
  },

  "/seguro-carros-luxo-guarulhos": {
    slug: "/seguro-carros-luxo-guarulhos",
    eyebrow: "Patro Private · Carros de Luxo",
    heroSubtitle:
      "Cobertura técnica para Porsche, BMW, Mercedes-Benz, Audi, Volvo, Land Rover, Lexus e veículos de alto valor em Guarulhos.",
    intro:
      "Carros de luxo demandam uma leitura diferente da apólice. Peças importadas, baixa oferta de oficinas autorizadas e valor de mercado pouco padronizado tornam decisões automatizadas uma fonte real de prejuízo. A Patro Private compara propostas linha a linha e estrutura a cobertura conforme o uso real do veículo.",
    audience: {
      title: "Marcas e perfis que atendemos",
      items: [
        "Porsche (Cayenne, Macan, Panamera, 911)",
        "BMW (Série 3, 5, X3, X5, X6, M)",
        "Mercedes-Benz (Classe C, E, GLE, GLC, AMG)",
        "Audi (A4, A6, Q5, Q7, RS)",
        "Volvo (XC60, XC90, S90)",
        "Land Rover (Range Rover, Discovery, Defender)",
        "Lexus, BYD premium e GWM premium (Tank, H6 GT)",
        "Veículos blindados das marcas acima",
      ],
    },
    coverages: {
      title: "Pontos críticos avaliados em apólices de luxo",
      items: [
        { name: "Indenização por valor determinado", desc: "Indicada para modelos pouco negociados, em que a FIPE não reflete o valor real de reposição." },
        { name: "Rede de oficinas autorizadas da marca", desc: "Validação com a seguradora antes da contratação — não no momento do sinistro." },
        { name: "Peças importadas e tempo de reposição", desc: "Cláusulas que cubram o tempo real de reposição e carro reserva equivalente." },
        { name: "Cobertura para uso executivo, familiar ou lazer", desc: "Perfil declarado corretamente para evitar discussão na regulação." },
        { name: "Guincho com plataforma adequada", desc: "Especialmente para tração integral, low-rider e veículos blindados." },
      ],
    },
    compareChecklist: {
      title: "Antes de contratar, verificamos",
      items: [
        "Existe rede referenciada da seguradora para a marca específica em São Paulo capital ou Grande SP",
        "Tempo médio de regulação para essa categoria de veículo",
        "Sublimites de vidros, faróis adaptativos e sensores embarcados",
        "Cobertura para danos elétricos em sistemas multimídia e ADAS",
        "Critério para perda total e franquia em colisão parcial",
      ],
    },
    commonMistakes: {
      title: "Riscos frequentes em apólices mal estruturadas",
      items: [
        "Contratar pela tabela FIPE em modelos importados raros",
        "Aceitar oficina referenciada padrão para veículos de marca premium",
        "Não declarar blindagem ou ano da blindagem",
        "Não revisar a soma segurada anualmente",
        "Subestimar a importância do RCF-V para terceiros patrimonializados",
      ],
    },
    faqs: [
      { question: "Vocês trabalham com Porsche e Range Rover?", answer: "Sim. Estruturamos apólices para essas e outras marcas premium com seguradoras que possuem rede e regulação compatível com esse tipo de veículo." },
      { question: "É possível segurar veículo importado sem FIPE clara?", answer: "Sim, por meio de apólice por valor determinado, com laudo técnico e documentação adequada." },
      { question: "Posso incluir mais de um condutor na mesma apólice?", answer: "Sim. Avaliamos perfil de cada condutor e a melhor estrutura (nomeados ou condutor principal + eventuais)." },
    ],
    relatedCta: [
      { label: "Seguro auto premium em Guarulhos", href: "/seguro-auto-premium-guarulhos" },
      { label: "Seguro para carro blindado", href: "/seguro-carro-blindado-guarulhos" },
    ],
  },

  "/seguro-residencial-alto-padrao-guarulhos": {
    slug: "/seguro-residencial-alto-padrao-guarulhos",
    eyebrow: "Patro Private · Residencial",
    heroSubtitle:
      "Cobertura sob medida para casas em condomínio, apartamentos de alto valor e residências com patrimônio relevante em Guarulhos.",
    intro:
      "Apólices residenciais padrão dificilmente cobrem com adequação o conteúdo, a estrutura e a responsabilidade civil familiar de imóveis de alto padrão. Trabalhamos cada item — do mobiliário aos equipamentos eletrônicos, da obra à RC familiar — de forma técnica.",
    audience: {
      title: "Para quem é esta análise",
      items: [
        "Casas em condomínios fechados em Guarulhos e Arujá",
        "Apartamentos em torres de alto padrão (Cidade Maia, Vila Galvão)",
        "Residências com obras, piscina ou áreas de lazer extensas",
        "Imóveis com home office, estúdio ou consultório anexo",
        "Famílias com itens de valor (arte, joias, eletrônicos de alto valor)",
      ],
    },
    coverages: {
      title: "Coberturas que avaliamos",
      items: [
        { name: "Incêndio, raio e explosão", desc: "Inclui danos por fumaça e ações do corpo de bombeiros para conter sinistro." },
        { name: "Danos elétricos", desc: "Cobertura para curto-circuito, sobretensão e queima de equipamentos." },
        { name: "Roubo e furto qualificado", desc: "Indenização para bens e cobertura de reparos por arrombamento." },
        { name: "Alagamento e vendaval", desc: "Eventos cada vez mais frequentes em Guarulhos e Grande SP." },
        { name: "Responsabilidade civil familiar", desc: "Cobertura para danos causados a terceiros pelo segurado, cônjuge, filhos e empregados domésticos." },
        { name: "Assistência 24h", desc: "Chaveiro, encanador, eletricista, vidraceiro e técnicos especializados." },
        { name: "Equipamentos e itens de valor", desc: "Cobertura específica para arte, joias e equipamentos quando aplicável." },
        { name: "Obras e reformas", desc: "Cláusula de obras em andamento, indispensável durante reformas relevantes." },
      ],
    },
    compareChecklist: {
      title: "Antes de contratar, verificamos",
      items: [
        "Valor em risco da estrutura (custo de reconstrução, não valor de mercado)",
        "Valor em risco do conteúdo, item a item para bens de maior valor",
        "Limites de RC familiar compatíveis com o patrimônio",
        "Cobertura para empregados domésticos e prestadores recorrentes",
        "Cláusulas de obras, ampliação e melhorias",
      ],
    },
    commonMistakes: {
      title: "Erros recorrentes em apólices residenciais",
      items: [
        "Subestimar o conteúdo, deixando obras de arte e eletrônicos sem cobertura adequada",
        "Esquecer a cobertura de RC familiar",
        "Confundir valor de mercado com valor de reconstrução",
        "Não comunicar obras ou ampliações à seguradora",
        "Ignorar cobertura para equipamentos eletrônicos e linha branca",
      ],
    },
    faqs: [
      { question: "Casa em condomínio fechado precisa de seguro próprio?", answer: "Sim. O seguro do condomínio cobre áreas comuns e estrutura coletiva, não o conteúdo nem a estrutura privativa da sua residência." },
      { question: "Posso incluir obras de arte e joias?", answer: "Sim, mediante laudo e declaração de itens, com cobertura específica e franquia adequada." },
      { question: "A apólice cobre danos causados por empregados domésticos?", answer: "Sim, dentro da cobertura de Responsabilidade Civil Familiar, com sublimite contratado." },
    ],
    relatedCta: [
      { label: "Proteção patrimonial familiar", href: "/protecao-patrimonial-familiar-guarulhos" },
    ],
  },

  "/seguros-para-empresarios-guarulhos": {
    slug: "/seguros-para-empresarios-guarulhos",
    eyebrow: "Patro Private · Empresarial",
    heroSubtitle:
      "Diagnóstico patrimonial e contratual para sócios, executivos e empresas familiares em Guarulhos, com foco em continuidade do negócio.",
    intro:
      "O empresário acumula riscos pessoais e corporativos que raramente são endereçados em uma única apólice. A Patro Private estrutura o desenho de proteção de forma integrada: vida e saúde do sócio, D&O, RC profissional, frota, galpões, sucessão e liquidez familiar.",
    audience: {
      title: "Perfis atendidos",
      items: [
        "Sócios e diretores de empresas de pequeno e médio porte em Guarulhos",
        "Executivos com remuneração variável e participação societária",
        "Profissionais liberais com patrimônio relevante",
        "Empresas familiares com sucessão a planejar",
        "Indústrias e operadores logísticos em Cumbica e região",
      ],
    },
    coverages: {
      title: "Linhas de proteção que articulamos",
      items: [
        { name: "Seguro de vida individual", desc: "Cobertura para morte, invalidez e doenças graves, com soma segurada compatível com o patrimônio e dívidas." },
        { name: "Saúde empresarial e PME", desc: "Plano para sócios, família e equipe-chave, com hospitais de referência." },
        { name: "D&O (Diretores e Administradores)", desc: "Cobertura para responsabilidades dos administradores em decisões da gestão." },
        { name: "Responsabilidade civil profissional e operacional", desc: "Para erros profissionais e danos a terceiros decorrentes da operação." },
        { name: "Cyber e riscos digitais", desc: "Cobertura para vazamento de dados, sequestro de dados e responsabilidade LGPD." },
        { name: "Seguro patrimonial empresarial e galpões", desc: "Incêndio, roubo, lucros cessantes e RC operações." },
        { name: "Frota corporativa", desc: "Gestão centralizada de sinistros e descontos progressivos." },
        { name: "Sucessão e liquidez familiar", desc: "Estrutura para que herdeiros tenham liquidez sem leilão patrimonial." },
      ],
    },
    compareChecklist: {
      title: "O que avaliamos em um diagnóstico patrimonial",
      items: [
        "Exposição pessoal do sócio em caso de falecimento ou invalidez",
        "Dependência da empresa em pessoa-chave",
        "Riscos de continuidade da operação (incêndio, paralisação, cyber)",
        "Exposição em conselhos e tomadas de decisão (D&O)",
        "Cobertura de saúde para sócios e família com hospitais adequados",
        "Sucessão e liquidez para a família em caso de imprevisto",
      ],
    },
    commonMistakes: {
      title: "Erros frequentes em proteção empresarial",
      items: [
        "Confundir seguro do empresário com seguro da empresa",
        "Não contratar D&O em empresas que já demandariam essa cobertura",
        "Manter apólice patrimonial defasada em relação ao valor real do imóvel e máquinas",
        "Ignorar lucros cessantes em operações fortemente dependentes do espaço físico",
        "Não planejar liquidez para a família em caso de imprevisto com o sócio",
      ],
    },
    faqs: [
      { question: "Quando D&O passa a fazer sentido?", answer: "Geralmente quando a empresa cresce e o sócio ou administrador passa a tomar decisões com impacto financeiro relevante para terceiros, conselheiros ou investidores. Avaliamos caso a caso." },
      { question: "Seguro de vida do empresário é diferente do seguro de vida comum?", answer: "Em termos de produto não, mas o desenho é diferente: soma segurada considerando dívidas, sucessão, liquidez para a família e participação societária." },
      { question: "Vocês atendem indústrias em Cumbica?", answer: "Sim. Temos atuação consolidada em galpões e indústrias na região de Cumbica e arredores do Aeroporto de Guarulhos." },
    ],
    relatedCta: [
      { label: "Proteção patrimonial familiar", href: "/protecao-patrimonial-familiar-guarulhos" },
      { label: "Hub empresarial", href: "/hub-empresarial" },
    ],
  },

  "/seguro-carro-blindado-guarulhos": {
    slug: "/seguro-carro-blindado-guarulhos",
    eyebrow: "Patro Private · Blindados",
    heroSubtitle:
      "Apólice específica para veículos blindados em Guarulhos, com análise de perfil, valor da blindagem e seguradoras que entendem o produto.",
    intro:
      "Segurar um carro blindado exige conhecimento técnico do produto. A blindagem precisa ser declarada, o valor agregado precisa ser somado à soma segurada, e as oficinas e guinchos precisam ser compatíveis. Trabalhamos com seguradoras que efetivamente operam essa categoria.",
    audience: {
      title: "Para quem é",
      items: [
        "Veículos blindados nível IIIA em Guarulhos e Grande SP",
        "SUVs e sedãs premium com blindagem de fábrica ou pós-venda",
        "Famílias com perfil patrimonializado",
        "Executivos com deslocamento frequente entre regiões sensíveis",
      ],
    },
    coverages: {
      title: "Pontos críticos de uma apólice de blindado",
      items: [
        { name: "Soma segurada com blindagem", desc: "Indenização compatível com veículo + valor da blindagem declarado." },
        { name: "Vidros blindados", desc: "Cobertura específica, dado que o custo de troca é várias vezes superior ao vidro comum." },
        { name: "Oficina capacitada", desc: "Reparo em rede com experiência em desmontagem e remontagem de blindagem." },
        { name: "Guincho com plataforma adequada", desc: "Capacidade compatível com o peso do veículo blindado." },
        { name: "Manutenção da blindagem", desc: "Documentação de manutenção atualizada é exigência de diversas seguradoras." },
      ],
    },
    compareChecklist: {
      title: "Checklist antes de contratar",
      items: [
        "Nota fiscal e laudo da blindadora",
        "Nível de blindagem (IIIA é o padrão civil)",
        "Histórico de manutenção da blindagem",
        "Confirmação de aceitação pela seguradora ANTES da emissão",
        "Sublimite de vidros compatível com vidros blindados",
      ],
    },
    commonMistakes: {
      title: "O que evitar",
      items: [
        "Não declarar a blindagem (causa de negativa em sinistro)",
        "Manter sublimite de vidros padrão",
        "Contratar oficina referenciada sem checar capacidade técnica",
        "Esquecer da manutenção periódica da blindagem",
      ],
    },
    faqs: [
      { question: "Qualquer seguradora aceita blindado?", answer: "Não. Algumas seguradoras restringem por região, perfil ou modelo. A Patro consulta as que efetivamente operam essa categoria." },
      { question: "Posso blindar um carro já segurado?", answer: "Sim, mas é necessário comunicar a seguradora, apresentar nota fiscal da blindagem e atualizar a soma segurada e o sublimite de vidros." },
      { question: "Vidros blindados são cobertos?", answer: "Sim, mediante cobertura específica e sublimite adequado." },
    ],
    relatedCta: [
      { label: "Seguro auto premium", href: "/seguro-auto-premium-guarulhos" },
      { label: "Seguro carros de luxo", href: "/seguro-carros-luxo-guarulhos" },
    ],
  },

  "/protecao-patrimonial-familiar-guarulhos": {
    slug: "/protecao-patrimonial-familiar-guarulhos",
    eyebrow: "Patro Private · Proteção Familiar",
    heroSubtitle:
      "Planejamento integrado de seguros para proteger família, patrimônio, veículos, residência e continuidade financeira.",
    intro:
      "Proteção patrimonial familiar não é um único produto: é uma arquitetura. Vida, residencial, auto premium, previdência, saúde e RC familiar precisam conversar entre si. A Patro Private estrutura essa arquitetura de forma consultiva, com revisão periódica.",
    audience: {
      title: "Para quem é esta análise",
      items: [
        "Famílias com patrimônio acumulado (imóveis, veículos, investimentos)",
        "Casais com filhos dependentes em fase escolar ou universitária",
        "Empresários e profissionais liberais",
        "Famílias com herdeiros menores",
        "Pessoas com renda concentrada em uma única fonte (sócio único, profissional liberal)",
      ],
    },
    coverages: {
      title: "Eixos do planejamento patrimonial",
      items: [
        { name: "Seguro de vida", desc: "Soma segurada compatível com dívidas, padrão de vida e tempo de dependência dos filhos." },
        { name: "Seguro residencial", desc: "Estrutura, conteúdo, RC familiar e bens de valor." },
        { name: "Seguro auto premium", desc: "Apólice por veículo, com cobertura compatível com o valor e o uso." },
        { name: "Previdência privada", desc: "PGBL/VGBL como instrumento de planejamento sucessório e tributário." },
        { name: "Saúde", desc: "Plano de saúde com hospitais de referência para a família." },
        { name: "RC familiar", desc: "Proteção contra danos causados pelo segurado, cônjuge, filhos e dependentes." },
        { name: "Liquidez sucessória", desc: "Estrutura que garanta liquidez aos herdeiros sem necessidade de leilão patrimonial." },
      ],
    },
    compareChecklist: {
      title: "Diagnóstico que conduzimos",
      items: [
        "Levantamento de dívidas e compromissos de longo prazo",
        "Tempo de dependência financeira dos dependentes",
        "Padrão de vida atual da família",
        "Concentração de renda em uma única pessoa",
        "Composição patrimonial (líquido, imobilizado, participações)",
      ],
    },
    commonMistakes: {
      title: "Erros frequentes em planejamento familiar",
      items: [
        "Contratar seguro de vida com soma segurada desconectada da realidade",
        "Esquecer da RC familiar em residencial",
        "Não revisar apólices após filhos, mudança de imóvel ou compra de veículo",
        "Tratar previdência como produto isolado, sem leitura sucessória",
      ],
    },
    faqs: [
      { question: "Como vocês calculam a soma segurada do seguro de vida?", answer: "A partir de variáveis: dívidas, padrão de vida, tempo de dependência dos filhos, renda do cônjuge e objetivos sucessórios. Não é uma fórmula única — é uma análise consultiva." },
      { question: "Vocês trabalham com planejamento sucessório?", answer: "Trabalhamos com os instrumentos seguráveis e previdenciários do planejamento sucessório. Para estruturas societárias e holding, atuamos em conjunto com advogados e contadores indicados pela família." },
      { question: "Com que frequência a apólice deve ser revisada?", answer: "Recomendamos revisão anual ou sempre que houver evento relevante: novo filho, mudança de imóvel, novo veículo, mudança de cargo ou de renda." },
    ],
    relatedCta: [
      { label: "Seguros para empresários", href: "/seguros-para-empresarios-guarulhos" },
      { label: "Seguro residencial alto padrão", href: "/seguro-residencial-alto-padrao-guarulhos" },
    ],
  },
};

export type PremiumPageSlug = keyof typeof premiumPagesContent;