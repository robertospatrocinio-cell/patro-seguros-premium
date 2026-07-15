/**
 * Área SEO "Seguradoras Parceiras" — dados das 16 seguradoras exibidas em
 * /seguradoras-parceiras e nas páginas individuais /<slug>-guarulhos.
 *
 * IMPORTANTE (jurídico/marca):
 * - A Patro Seguros NÃO é site oficial de nenhuma das seguradoras listadas.
 * - Textos originais, não copiam material dos sites oficiais.
 * - Não afirmar exclusividade, oficialidade, preços, aprovação ou aceitação.
 * - "Corretora parceira / intermediadora de cotações" é a linguagem padrão.
 */

export interface ParceiraFAQ {
  q: string;
  a: string;
}

export interface SeguradoraParceira {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  sobre: string[];
  produtos: string[];
  destaques: string[];
  keywords: string[];
  faqs: ParceiraFAQ[];
}

const DISPONIBILIDADE =
  "A disponibilidade dos produtos pode variar conforme a seguradora, perfil do cliente, região, aceitação de risco e regras vigentes.";

export const buildDefaultFaqs = (name: string): ParceiraFAQ[] => [
  {
    q: `A Patro Seguros trabalha com a ${name}?`,
    a: `A Patro Seguros pode intermediar cotações e orientar clientes interessados em produtos da ${name}, conforme disponibilidade, perfil e aceitação da seguradora.`,
  },
  {
    q: `Posso cotar seguro da ${name} em Guarulhos?`,
    a: `Sim. A Patro atende clientes de Guarulhos, São Paulo e região interessados em cotar seguros com seguradoras parceiras, incluindo a ${name}, quando disponível.`,
  },
  {
    q: `A Patro é o site oficial da ${name}?`,
    a: `Não. A Patro Seguros é uma corretora de seguros independente. Esta página tem finalidade informativa e comercial para atendimento pela Patro — não é o site oficial da ${name}.`,
  },
  {
    q: `Quais seguros posso cotar com a ${name} pela Patro?`,
    a: `Depende da seguradora e do perfil do cliente. Em geral, podem ser cotados produtos como seguro auto, residencial, empresarial, vida, frota e outros, conforme disponibilidade. ${DISPONIBILIDADE}`,
  },
  {
    q: `Posso iniciar a cotação pelo WhatsApp?`,
    a: `Sim. A Patro pode iniciar o atendimento e orientar a cotação pelo WhatsApp, facilitando o processo para clientes de Guarulhos, São Paulo e região.`,
  },
];

export const SEGURADORAS_PARCEIRAS: SeguradoraParceira[] = [
  {
    slug: "porto-seguro-guarulhos",
    name: "Porto Seguro",
    shortName: "Porto Seguro",
    tagline: "Tradição, rede ampla de assistência e portfólio completo de seguros e serviços.",
    sobre: [
      "A Porto Seguro é uma das seguradoras conhecidas no mercado brasileiro e oferece diferentes soluções de proteção para pessoas físicas e empresas — de seguro auto a residencial, vida, empresarial e consórcio. Em Guarulhos, é uma das marcas mais lembradas em cotações de seguro auto e residencial.",
      "Como corretora independente, a Patro Seguros pode intermediar cotações da Porto para clientes de Guarulhos e região, comparando coberturas, franquia e serviços agregados com outras seguradoras parceiras — sempre conforme perfil, aceitação e regras vigentes.",
    ],
    produtos: ["Seguro Auto", "Seguro Residencial", "Seguro Vida", "Seguro Empresarial", "Seguro Moto", "Consórcio", "Seguro Viagem"],
    destaques: [
      "Portfólio amplo para pessoa física e empresa.",
      "Serviços agregados (chaveiro, guincho, assistência residencial).",
      "Rede referenciada consolidada na Grande São Paulo.",
    ],
    keywords: ["Porto Seguro Guarulhos", "cotação Porto Seguro Guarulhos", "seguro auto Porto Seguro Guarulhos", "corretor Porto Seguro Guarulhos"],
    faqs: [
      { q: "A Patro consegue cotar seguro auto Porto Seguro em Guarulhos?", a: "Sim, quando o perfil é aceito pela análise da Porto. Comparamos com outras seguradoras parceiras antes de apresentar a proposta." },
      { q: "A Porto Seguro cobre carro para Uber/99?", a: "Existem coberturas específicas para uso profissional, mas não estão inclusas por padrão. O uso precisa ser declarado no momento da cotação." },
    ],
  },
  {
    slug: "mapfre-seguros-guarulhos",
    name: "Mapfre Seguros",
    shortName: "Mapfre",
    tagline: "Multinacional com portfólio amplo de seguros pessoais, empresariais e rurais.",
    sobre: [
      "A Mapfre é uma das seguradoras conhecidas no mercado brasileiro, com atuação em diversos segmentos: auto, residencial, empresarial, vida, rural e transportes. Em Guarulhos, aparece com frequência em cotações comparativas para pessoa física e PMEs.",
      "A Patro Seguros pode intermediar cotações da Mapfre para clientes da região, comparando condições, franquias e coberturas com outras parceiras, sempre respeitando a aceitação e as regras da seguradora.",
    ],
    produtos: ["Seguro Auto", "Seguro Residencial", "Seguro Empresarial", "Seguro Vida", "Seguro Frota", "Seguro Transporte", "Seguro Rural"],
    destaques: [
      "Boa aceitação em perfis de PMEs e frota leve.",
      "Portfólio robusto em seguros patrimoniais.",
      "Presença consolidada em transporte e agro.",
    ],
    keywords: ["Mapfre Seguros Guarulhos", "cotação Mapfre Guarulhos", "seguro auto Mapfre Guarulhos", "corretor Mapfre Guarulhos"],
    faqs: [
      { q: "A Mapfre é boa para seguro empresarial em Guarulhos?", a: "Costuma ser uma opção competitiva para PMEs. A adequação depende da atividade, faturamento e local do risco — comparamos com outras parceiras antes de indicar." },
      { q: "A Mapfre cobre frota em Guarulhos?", a: "Sim, cotamos frotas via Mapfre quando o perfil da empresa e dos veículos é aceito pela análise da seguradora." },
    ],
  },
  {
    slug: "allianz-seguros-guarulhos",
    name: "Allianz Seguros",
    shortName: "Allianz",
    tagline: "Marca global com foco em auto, patrimônio, vida e responsabilidade civil.",
    sobre: [
      "A Allianz é uma das seguradoras conhecidas no mercado brasileiro, com forte presença em seguro auto, residencial, empresarial, vida, equipamentos e responsabilidade civil. Em Guarulhos, é comum aparecer em cotações comparativas de perfis mais exigentes.",
      "A Patro pode intermediar cotações da Allianz para clientes de Guarulhos, São Paulo e região, apresentando condições da Allianz junto às demais seguradoras parceiras conforme perfil e aceitação.",
    ],
    produtos: ["Seguro Auto", "Seguro Residencial", "Seguro Empresarial", "Seguro Vida", "Seguro Equipamentos", "Seguro Responsabilidade Civil"],
    destaques: [
      "Boa opção para clientes que valorizam marca global.",
      "Portfólio forte em responsabilidade civil e equipamentos.",
      "Coberturas customizáveis para empresas.",
    ],
    keywords: ["Allianz Seguros Guarulhos", "Allianz seguro auto Guarulhos", "cotação Allianz Guarulhos", "corretor Allianz Guarulhos"],
    faqs: [
      { q: "A Allianz é boa para seguro auto em Guarulhos?", a: "Pode ser uma opção interessante para perfis com bom histórico. O preço final depende do modelo, CEP e coberturas." },
      { q: "A Allianz aceita seguro para equipamentos e RC?", a: "Sim. É uma das seguradoras com bom apetite para responsabilidade civil e equipamentos — cotamos conforme a atividade da empresa." },
    ],
  },
  {
    slug: "tokio-marine-guarulhos",
    name: "Tokio Marine",
    shortName: "Tokio Marine",
    tagline: "Seguradora reconhecida em auto, empresarial, frota e soluções corporativas.",
    sobre: [
      "A Tokio Marine é uma das seguradoras conhecidas no mercado brasileiro, atuando em seguro auto, residencial, empresarial, vida, frota e soluções para empresas. Costuma aparecer em cotações comparativas por bons preços em determinados perfis.",
      "A Patro Seguros intermedeia cotações da Tokio Marine para clientes de Guarulhos, comparando franquia, cobertura e assistência com outras seguradoras parceiras.",
    ],
    produtos: ["Seguro Auto", "Seguro Residencial", "Seguro Empresarial", "Seguro Vida", "Seguro Frota", "Seguro Condomínio"],
    destaques: [
      "Competitividade em auto para diversos perfis.",
      "Boa aceitação em empresarial e condomínio.",
      "Frota leve costuma ter apetite consistente.",
    ],
    keywords: ["Tokio Marine Guarulhos", "cotação Tokio Marine Guarulhos", "seguro auto Tokio Marine Guarulhos", "seguro empresarial Tokio Marine Guarulhos"],
    faqs: [
      { q: "A Tokio Marine é boa para seguro auto?", a: "Costuma ser bastante competitiva em determinados perfis. Fazemos a comparação antes de indicar." },
      { q: "A Tokio Marine faz seguro condomínio em Guarulhos?", a: "Sim, cotamos seguro condomínio via Tokio quando o perfil do condomínio é aceito pela análise." },
    ],
  },
  {
    slug: "azul-seguros-guarulhos",
    name: "Azul Seguros",
    shortName: "Azul Seguros",
    tagline: "Auto com foco em custo-benefício e atendimento via corretora.",
    sobre: [
      "A Azul Seguros é uma das seguradoras conhecidas no mercado brasileiro, com foco em seguro auto e forte presença em cotações de perfis que priorizam custo-benefício. É comum em Guarulhos aparecer bem posicionada para veículos populares e perfis mais econômicos.",
      "A Patro pode intermediar cotações da Azul para clientes de Guarulhos e região, comparando com outras parceiras conforme perfil, veículo e aceitação.",
    ],
    produtos: ["Seguro Auto", "Seguro Moto"],
    destaques: [
      "Boa relação custo-benefício em muitos perfis.",
      "Foco em auto e moto.",
      "Atendimento via corretora.",
    ],
    keywords: ["Azul Seguros Guarulhos", "seguro auto Azul Guarulhos", "cotação Azul Seguros Guarulhos", "seguro moto Azul Guarulhos"],
    faqs: [
      { q: "A Azul Seguros é boa para carros populares?", a: "Costuma ser competitiva em veículos populares e perfis mais econômicos. Comparamos sempre com outras seguradoras antes de indicar." },
      { q: "A Azul cobre seguro moto?", a: "Sim, cotamos seguro moto pela Azul conforme aceitação e perfil do condutor." },
    ],
  },
  {
    slug: "suhai-seguros-guarulhos",
    name: "Suhai Seguradora",
    shortName: "Suhai",
    tagline: "Especializada em roubo e furto para auto e moto, com regras específicas de aceitação.",
    sobre: [
      "A Suhai é uma das seguradoras conhecidas no mercado brasileiro, com foco em coberturas essenciais (principalmente roubo e furto) para auto e moto. Costuma ser uma opção considerada por perfis mais restritos por outras seguradoras — sem, contudo, prometer aceitação automática.",
      "A Patro Seguros pode intermediar cotações da Suhai para clientes de Guarulhos e região. A aceitação segue sempre as regras da seguradora e depende do veículo, do perfil e da região.",
    ],
    produtos: ["Seguro Auto", "Seguro Moto"],
    destaques: [
      "Foco em coberturas essenciais (roubo/furto).",
      "Opção para veículos e perfis mais restritos.",
      "Cotação sujeita à aceitação da seguradora.",
    ],
    keywords: ["Suhai Seguradora Guarulhos", "seguro auto Suhai Guarulhos", "seguro moto Suhai Guarulhos", "cotação Suhai Guarulhos"],
    faqs: [
      { q: "A Suhai aceita qualquer veículo?", a: "Não. A aceitação segue as regras da própria seguradora e depende de veículo, perfil e região. A Patro não pode garantir aceitação prévia." },
      { q: "A Suhai cobre colisão?", a: "O foco principal da Suhai é roubo e furto. Coberturas de colisão dependem do plano cotado e das condições vigentes." },
    ],
  },
  {
    slug: "bradesco-seguros-guarulhos",
    name: "Bradesco Seguros",
    shortName: "Bradesco",
    tagline: "Grupo com portfólio amplo em auto, residencial, vida, saúde, odonto e empresarial.",
    sobre: [
      "O Bradesco Seguros é um dos grupos seguradores mais conhecidos no mercado brasileiro, com atuação em auto, residencial, vida, saúde, odontológico e empresarial. Em Guarulhos, aparece com frequência em cotações comparativas de vida, saúde e patrimonial.",
      "A Patro pode intermediar cotações do Bradesco Seguros para clientes da região, comparando condições com outras parceiras conforme perfil, produto e aceitação.",
    ],
    produtos: ["Seguro Auto", "Seguro Residencial", "Seguro Vida", "Seguro Empresarial", "Plano de Saúde", "Seguro Dental"],
    destaques: [
      "Portfólio amplo para pessoa física e empresa.",
      "Forte presença em vida, saúde e odonto.",
      "Grupo com marca reconhecida no país.",
    ],
    keywords: ["Bradesco Seguros Guarulhos", "cotação Bradesco Seguros Guarulhos", "seguro auto Bradesco Guarulhos", "seguro vida Bradesco Guarulhos"],
    faqs: [
      { q: "A Patro cota Bradesco Saúde em Guarulhos?", a: "Sim, quando disponível para o perfil (individual, familiar ou PME). Comparamos com outras operadoras parceiras." },
      { q: "O Bradesco Seguros é bom para vida?", a: "Costuma ser uma opção sólida em seguro de vida individual e em grupo — o preço e coberturas dependem do perfil." },
    ],
  },
  {
    slug: "sulamerica-seguros-guarulhos",
    name: "SulAmérica",
    shortName: "SulAmérica",
    tagline: "Referência histórica em saúde, odontológico e vida, com benefícios empresariais.",
    sobre: [
      "A SulAmérica é uma das seguradoras conhecidas no mercado brasileiro, com forte presença em saúde, odontológico, vida e benefícios empresariais. Em Guarulhos, aparece com frequência em cotações de plano de saúde individual, familiar e PME.",
      "A Patro Seguros pode intermediar cotações da SulAmérica para clientes da região, comparando planos e coberturas com outras operadoras e seguradoras parceiras.",
    ],
    produtos: ["Plano de Saúde", "Seguro Odontológico", "Seguro Vida", "Seguro Empresarial", "Benefícios Empresariais"],
    destaques: [
      "Rede hospitalar consolidada em SP.",
      "Forte em saúde, vida e odontológico.",
      "Opções para empresas de diversos portes.",
    ],
    keywords: ["SulAmérica Guarulhos", "plano de saúde SulAmérica Guarulhos", "SulAmérica seguros Guarulhos", "SulAmérica odonto Guarulhos"],
    faqs: [
      { q: "A Patro cota plano de saúde SulAmérica em Guarulhos?", a: "Sim, cotamos SulAmérica em planos individuais, familiares e empresariais quando disponíveis para o perfil." },
      { q: "A SulAmérica cobre reembolso?", a: "Sim, na maioria dos planos, com limites por procedimento. Detalhes de cada plano são apresentados na cotação." },
    ],
  },
  {
    slug: "hdi-seguros-guarulhos",
    name: "HDI Seguros",
    shortName: "HDI",
    tagline: "Auto, residencial, empresarial e frota com processos ágeis de sinistro.",
    sobre: [
      "A HDI Seguros é uma das seguradoras conhecidas no mercado brasileiro, com atuação em auto, residencial, empresarial e frota. Em Guarulhos, aparece em cotações comparativas de auto para diversos perfis.",
      "A Patro Seguros pode intermediar cotações da HDI, comparando franquia, cobertura, assistência e serviços agregados com outras parceiras.",
    ],
    produtos: ["Seguro Auto", "Seguro Residencial", "Seguro Empresarial", "Seguro Frota"],
    destaques: [
      "Boa competitividade em auto.",
      "Processos digitais bem estruturados.",
      "Portfólio equilibrado para pessoa física e empresa.",
    ],
    keywords: ["HDI Seguros Guarulhos", "cotação HDI Guarulhos", "seguro auto HDI Guarulhos", "HDI frota Guarulhos"],
    faqs: [
      { q: "A HDI é boa para seguro auto?", a: "Costuma ser competitiva em muitos perfis. Comparamos com outras parceiras antes de indicar." },
      { q: "A HDI faz seguro frota em Guarulhos?", a: "Sim. A cotação de frota depende do porte da empresa, dos veículos e do uso — sempre sujeita a análise." },
    ],
  },
  {
    slug: "liberty-seguros-guarulhos",
    name: "Liberty Seguros",
    shortName: "Liberty",
    tagline: "Marca com atuação em auto, residencial, vida e soluções para empresas.",
    sobre: [
      "A Liberty Seguros é uma das seguradoras conhecidas no mercado brasileiro (no Brasil, o portfólio passou por reorganizações societárias, incluindo a operação atualmente conduzida pela Yelum). Atua em seguro auto, residencial, vida e produtos empresariais.",
      "A Patro pode intermediar cotações relacionadas à marca Liberty conforme disponibilidade no mercado, comparando com outras seguradoras parceiras.",
    ],
    produtos: ["Seguro Auto", "Seguro Residencial", "Seguro Vida", "Seguro Empresarial"],
    destaques: [
      "Marca com histórico consolidado em auto.",
      "Portfólio com opções para pessoa física e empresa.",
      "Cotação sujeita à disponibilidade e regras vigentes.",
    ],
    keywords: ["Liberty Seguros Guarulhos", "cotação Liberty Seguros Guarulhos", "seguro auto Liberty Guarulhos", "corretor Liberty Guarulhos"],
    faqs: [
      { q: "A Liberty ainda opera no Brasil?", a: "O portfólio no Brasil passou por reorganizações. A Patro intermedeia cotações relacionadas à marca conforme disponibilidade e regras vigentes." },
      { q: "Posso comparar Liberty com outras seguradoras?", a: "Sim. Nossa proposta é justamente comparar antes de contratar, apresentando opções lado a lado." },
    ],
  },
  {
    slug: "mitsui-sumitomo-seguros-guarulhos",
    name: "Mitsui Sumitomo",
    shortName: "Mitsui Sumitomo",
    tagline: "Auto, empresarial, transportes e soluções corporativas.",
    sobre: [
      "A Mitsui Sumitomo é uma das seguradoras conhecidas no mercado brasileiro, com atuação em auto, empresarial, transportes e soluções corporativas. Em Guarulhos, é considerada em cotações comparativas para empresas e transportadores.",
      "A Patro Seguros pode intermediar cotações da Mitsui Sumitomo para clientes da região, comparando com outras parceiras conforme perfil e aceitação.",
    ],
    produtos: ["Seguro Auto", "Seguro Empresarial", "Seguro Transporte", "Seguro Frota", "Seguro Responsabilidade Civil"],
    destaques: [
      "Foco em empresarial e transporte.",
      "Marca com presença corporativa.",
      "Boa alternativa em cotações comparativas de PMEs.",
    ],
    keywords: ["Mitsui Sumitomo Guarulhos", "cotação Mitsui Sumitomo Guarulhos", "seguro empresarial Mitsui Guarulhos", "seguro transporte Mitsui Guarulhos"],
    faqs: [
      { q: "A Mitsui é boa para seguro empresarial?", a: "É uma marca considerada em cotações corporativas. A adequação depende da atividade e do risco — comparamos com outras parceiras." },
      { q: "A Mitsui cobre seguro de transporte?", a: "Sim, cotamos quando o perfil da operação é aceito pela análise da seguradora." },
    ],
  },
  {
    slug: "sompo-seguros-guarulhos",
    name: "Sompo Seguros",
    shortName: "Sompo",
    tagline: "Auto, residencial, empresarial, vida e responsabilidade civil.",
    sobre: [
      "A Sompo Seguros é uma das seguradoras conhecidas no mercado brasileiro, com atuação em auto, residencial, empresarial, vida e responsabilidade civil. Em Guarulhos, aparece em cotações comparativas de PMEs e pessoa física.",
      "A Patro pode intermediar cotações da Sompo, comparando condições com outras seguradoras parceiras conforme disponibilidade e aceitação.",
    ],
    produtos: ["Seguro Auto", "Seguro Residencial", "Seguro Empresarial", "Seguro Vida", "Seguro Responsabilidade Civil"],
    destaques: [
      "Portfólio equilibrado para pessoa física e empresa.",
      "Boa aceitação em determinados perfis empresariais.",
      "Presença nacional consolidada.",
    ],
    keywords: ["Sompo Seguros Guarulhos", "cotação Sompo Guarulhos", "seguro auto Sompo Guarulhos", "seguro empresarial Sompo Guarulhos"],
    faqs: [
      { q: "A Sompo é competitiva em auto?", a: "Pode ser em determinados perfis. Comparamos sempre com outras parceiras antes de indicar." },
      { q: "A Sompo faz responsabilidade civil?", a: "Sim, cotamos RC via Sompo conforme a atividade da empresa e a aceitação da seguradora." },
    ],
  },
  {
    slug: "zurich-seguros-guarulhos",
    name: "Zurich Seguros",
    shortName: "Zurich",
    tagline: "Auto, vida, empresarial, equipamentos e RC com foco em soluções corporativas.",
    sobre: [
      "A Zurich é uma das seguradoras conhecidas no mercado brasileiro, com atuação em auto, vida, empresarial, equipamentos e responsabilidade civil. Costuma aparecer em cotações comparativas de empresas e produtos específicos.",
      "A Patro pode intermediar cotações da Zurich para clientes de Guarulhos e região, comparando condições com outras parceiras conforme disponibilidade e regras vigentes.",
    ],
    produtos: ["Seguro Auto", "Seguro Vida", "Seguro Empresarial", "Seguro Equipamentos", "Seguro Responsabilidade Civil"],
    destaques: [
      "Marca global com histórico corporativo.",
      "Bom apetite em equipamentos e RC.",
      "Portfólio consistente para empresas.",
    ],
    keywords: ["Zurich Seguros Guarulhos", "cotação Zurich Guarulhos", "seguro empresarial Zurich Guarulhos", "seguro equipamentos Zurich Guarulhos"],
    faqs: [
      { q: "A Zurich é boa para seguro empresarial?", a: "Costuma ser uma opção considerada em cotações corporativas. A adequação depende da atividade e do risco." },
      { q: "A Zurich cobre equipamentos?", a: "Sim, cotamos seguro de equipamentos via Zurich quando o perfil é aceito pela análise da seguradora." },
    ],
  },
  {
    slug: "pottencial-seguradora-guarulhos",
    name: "Pottencial Seguradora",
    shortName: "Pottencial",
    tagline: "Seguro garantia, fiança locatícia, empresarial e riscos de engenharia.",
    sobre: [
      "A Pottencial é uma das seguradoras conhecidas no mercado brasileiro em produtos especializados — como seguro garantia, fiança locatícia, empresarial e riscos de engenharia. É uma referência frequente em cotações de licitações e contratos.",
      "A Patro Seguros pode intermediar cotações da Pottencial para clientes de Guarulhos e região, especialmente em produtos garantia e fiança, sempre conforme disponibilidade e aceitação.",
    ],
    produtos: ["Seguro Garantia", "Fiança Locatícia", "Seguro Empresarial", "Riscos de Engenharia", "Seguro Responsabilidade Civil"],
    destaques: [
      "Foco em produtos especializados (garantia e fiança).",
      "Boa opção para empresas em licitações.",
      "Cotação especializada exige documentação específica.",
    ],
    keywords: ["Pottencial Seguradora Guarulhos", "cotação Pottencial Guarulhos", "seguro garantia Pottencial Guarulhos", "fiança locatícia Pottencial Guarulhos"],
    faqs: [
      { q: "A Pottencial faz seguro garantia em Guarulhos?", a: "Sim, cotamos seguro garantia pela Pottencial conforme edital, contrato e aceitação da seguradora." },
      { q: "A Pottencial faz fiança locatícia?", a: "Sim, é um dos produtos de destaque. A aprovação depende do perfil do locatário e do imóvel." },
    ],
  },
  {
    slug: "akad-seguros-guarulhos",
    name: "Akad Seguros",
    shortName: "Akad",
    tagline: "Seguradora digital com foco em empresarial, RC profissional e produtos específicos.",
    sobre: [
      "A Akad é uma das seguradoras conhecidas no mercado brasileiro em produtos digitais, com foco em empresarial, responsabilidade civil profissional e coberturas específicas para nichos. Costuma ser considerada em cotações de riscos empresariais e profissionais.",
      "A Patro pode intermediar cotações da Akad para clientes de Guarulhos, comparando com outras parceiras conforme perfil e aceitação.",
    ],
    produtos: ["Seguro Empresarial", "Seguro Responsabilidade Civil", "RC Profissional", "Seguro D&O", "Seguro Cibernético"],
    destaques: [
      "Processos digitais bem estruturados.",
      "Foco em produtos empresariais e RC.",
      "Boa alternativa em nichos profissionais.",
    ],
    keywords: ["Akad Seguros Guarulhos", "cotação Akad Guarulhos", "RC profissional Akad Guarulhos", "seguro D&O Akad Guarulhos"],
    faqs: [
      { q: "A Akad faz RC profissional?", a: "Sim, é um dos focos. Cotamos conforme a atividade profissional e aceitação da seguradora." },
      { q: "A Akad cobre seguro cibernético?", a: "Sim, quando o perfil da empresa é aceito na análise. Cotamos conforme faturamento e maturidade de TI." },
    ],
  },
  {
    slug: "ezze-seguros-guarulhos",
    name: "Ezze Seguros",
    shortName: "Ezze",
    tagline: "Portfólio em auto, empresarial, transportes e seguro garantia.",
    sobre: [
      "A Ezze Seguros é uma das seguradoras conhecidas no mercado brasileiro, com atuação em auto, empresarial, transportes e seguro garantia. Costuma aparecer em cotações comparativas de empresas e transportadores.",
      "A Patro pode intermediar cotações da Ezze para clientes de Guarulhos e região conforme disponibilidade, perfil e regras vigentes.",
    ],
    produtos: ["Seguro Auto", "Seguro Empresarial", "Seguro Transporte", "Seguro Garantia", "Seguro Frota"],
    destaques: [
      "Boa alternativa em transporte e garantia.",
      "Portfólio flexível para empresas.",
      "Cotação sujeita à aceitação da seguradora.",
    ],
    keywords: ["Ezze Seguros Guarulhos", "cotação Ezze Guarulhos", "seguro garantia Ezze Guarulhos", "seguro transporte Ezze Guarulhos"],
    faqs: [
      { q: "A Ezze faz seguro transporte?", a: "Sim, é um dos focos. Cotamos conforme perfil da operação e aceitação da seguradora." },
      { q: "A Ezze cobre seguro garantia?", a: "Sim, cotamos conforme edital, contrato e análise da seguradora." },
    ],
  },
];

export const SEGURADORAS_PARCEIRAS_BY_SLUG: Record<string, SeguradoraParceira> = Object.fromEntries(
  SEGURADORAS_PARCEIRAS.map((s) => [s.slug, s])
);

export const AVISO_TRANSPARENCIA = (name: string) =>
  `A Patro Seguros é uma corretora de seguros independente e pode atuar como parceira/intermediadora de cotações junto a diferentes seguradoras. Esta página não é o site oficial da ${name}. As marcas, nomes e logotipos pertencem aos seus respectivos titulares. Produtos, coberturas, preços e aceitação estão sujeitos às regras de cada seguradora.`;

export const AVISO_DISPONIBILIDADE = DISPONIBILIDADE;

export const AVISO_MARCAS =
  "As marcas mencionadas pertencem aos seus respectivos titulares. A Patro Seguros atua como corretora de seguros e pode intermediar cotações junto às seguradoras parceiras, conforme disponibilidade, perfil do cliente e regras de aceitação.";
