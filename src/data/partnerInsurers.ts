/**
 * Dados consultivos únicos das 12 seguradoras parceiras da Patro.
 * Cada insurer expõe conteúdo original, sem cópia dos sites oficiais e
 * sem promessas comerciais indevidas (ver diretrizes legais no template).
 */

export type SeguroTipo =
  | "Auto"
  | "Moto"
  | "Residencial"
  | "Vida"
  | "Empresarial"
  | "Frota"
  | "Transporte"
  | "Viagem"
  | "Celular"
  | "Saúde"
  | "Consórcio"
  | "Condomínio"
  | "Equipamentos";

export interface PartnerFAQ {
  q: string;
  a: string;
}

export interface PartnerInsurer {
  /** Slug SEO — sempre termina em "-guarulhos". */
  slug: string;
  /** Nome comercial usado no title/H1. */
  name: string;
  /** Nome curto para chips e cards. */
  shortName: string;
  /** Foco editorial estratégico (uma linha, aparece no hero). */
  foco: string;
  /** 2 parágrafos únicos sobre a seguradora, sem copiar site oficial. */
  sobre: string[];
  /** Tipos de seguro que fazem sentido cotar com essa seguradora via Patro. */
  tipos: SeguroTipo[];
  /** Bullets curtos com contexto para cada tipo. */
  tiposDetalhes: string;
  /** Perfis de cliente para os quais a seguradora costuma ser interessante. */
  perfis: string[];
  /** O que comparar antes de contratar (pontos específicos dessa seguradora). */
  pontosComparar: string[];
  /** Vantagens possíveis conforme perfil (unique). */
  vantagens: string[];
  /** Limitações / cuidados (unique). */
  limitacoes: string[];
  /** FAQ visível — 5 a 7 perguntas únicas. */
  faqs: PartnerFAQ[];
  /** Cor semântica opcional para o hero (usa tokens do design system). */
  accent?: string;
}

export const PARTNER_INSURERS: PartnerInsurer[] = [
  {
    slug: "porto-seguro-guarulhos",
    name: "Porto Seguro",
    shortName: "Porto Seguro",
    foco: "Tradição, rede ampla de assistência e portfólio completo de seguros e serviços.",
    sobre: [
      "A Porto Seguro é uma das maiores seguradoras do Brasil, com décadas de atuação no mercado e ampla presença em São Paulo. Em Guarulhos, é uma das seguradoras mais buscadas em cotações de seguro auto, residencial e vida — em grande parte pela combinação de rede de oficinas referenciadas, assistência 24h e um leque grande de serviços agregados (chaveiro, encanador, eletricista, guincho).",
      "Na prática, a Porto costuma ser competitiva para perfis considerados de menor risco (motoristas com bom histórico, veículos populares e SUVs de linha, imóveis em bairros com baixa sinistralidade). Isso não significa que será sempre a mais barata — o preço final depende do perfil, do modelo, do CEP e das coberturas escolhidas. Por isso a Patro compara Porto com outras opções antes de fechar."
    ],
    tipos: ["Auto", "Moto", "Residencial", "Vida", "Empresarial", "Frota", "Viagem", "Consórcio"],
    tiposDetalhes:
      "Seguro auto (incluindo cobertura para motoristas de aplicativo em condições específicas), moto, residencial, vida individual e empresarial, seguro empresarial para PMEs, seguro de frota e consórcio de imóveis, automóveis e serviços.",
    perfis: [
      "Motoristas com histórico limpo que valorizam rede referenciada e assistência 24h consolidada.",
      "Famílias em bairros de Guarulhos como Cidade Maia, Vila Galvão e Vila Augusta que buscam seguro residencial com muitos serviços agregados.",
      "Empresas de pequeno e médio porte que preferem uma marca com forte reconhecimento e capilaridade de atendimento."
    ],
    pontosComparar: [
      "Franquia obrigatória vs. franquia reduzida — impacta bastante o valor da apólice.",
      "Serviços agregados (chaveiro, guincho, carro reserva) — Porto costuma oferecer pacote amplo, mas confira quantos usos por vigência.",
      "Cobertura para uso comercial/aplicativo — não é padrão em todos os planos; precisa ser contratada explicitamente.",
      "Descontos por uso de rastreador, garagem fechada e perfil condutor."
    ],
    vantagens: [
      "Rede referenciada extensa em Guarulhos e Grande SP.",
      "Portfólio amplo (auto, casa, vida, empresa, consórcio) — facilita concentrar apólices e negociar condições.",
      "Assistência 24h consolidada, com bom histórico de acionamento na região."
    ],
    limitacoes: [
      "Nem sempre é a opção mais barata para veículos populares ou perfis jovens — vale comparar.",
      "Algumas coberturas específicas (como uso profissional intensivo) exigem endosso e alteram o preço."
    ],
    faqs: [
      { q: "A Patro Seguros faz cotação da Porto Seguro em Guarulhos?", a: "Sim. A Patro é corretora e cota Porto Seguro para clientes de Guarulhos e região, comparando com outras seguradoras parceiras conforme o perfil do cliente." },
      { q: "A Porto Seguro é boa para seguro auto em Guarulhos?", a: "Costuma ser uma opção forte para perfis com bom histórico e veículos de uso pessoal, principalmente pela rede de assistência. Se o preço será competitivo depende do modelo, CEP e coberturas — por isso comparamos antes de indicar." },
      { q: "Posso comparar Porto Seguro com outras seguradoras?", a: "Sim. A Patro sempre apresenta ao menos 3 opções (quando aceitas pela análise) para o mesmo perfil, com preço, franquia, coberturas e serviços lado a lado." },
      { q: "A cotação da Porto Seguro com a Patro é gratuita?", a: "Sim. A cotação é gratuita e sem compromisso — você só contrata se aprovar a proposta." },
      { q: "A Patro ajuda em caso de sinistro na Porto?", a: "Ajudamos em toda a jornada: abertura, envio de documentos, acompanhamento e comunicação com a seguradora. Não substituímos a análise técnica da Porto, mas facilitamos o processo." },
      { q: "A Porto Seguro cobre carro para Uber/99 em Guarulhos?", a: "Existem coberturas específicas para uso profissional, mas não estão inclusas por padrão. Precisamos declarar o uso no momento da cotação para evitar recusa em sinistro." }
    ]
  },
  {
    slug: "tokio-marine-guarulhos",
    name: "Tokio Marine",
    shortName: "Tokio Marine",
    foco: "Seguradora com perfil analítico, boa aceitação em auto e forte atuação em empresarial e vida.",
    sobre: [
      "A Tokio Marine Seguradora, de origem japonesa, tem forte presença no mercado brasileiro e é uma das seguradoras mais cotadas em Guarulhos para seguro auto, empresarial e vida. É conhecida pelo cuidado com análise de risco e por trabalhar com uma tabela competitiva para perfis considerados de baixo a médio risco.",
      "Em auto, costuma ser interessante em veículos populares e sedans de uso urbano, com franquia bem calibrada. Em empresarial e vida, tem apetite consultivo — o que combina com o formato de atendimento da Patro, que gosta de discutir coberturas em detalhe antes de bater o martelo."
    ],
    tipos: ["Auto", "Residencial", "Vida", "Empresarial", "Transporte", "Viagem"],
    tiposDetalhes:
      "Seguro auto individual e frota leve, residencial, vida individual e empresarial (Vida Grupo), seguros patrimoniais para PMEs, seguro transporte para cargas e seguro viagem.",
    perfis: [
      "Motoristas com bom histórico buscando equilíbrio entre preço e cobertura.",
      "PMEs de Guarulhos que precisam de seguro empresarial com análise técnica cuidadosa.",
      "Empresas contratando Vida Grupo para colaboradores com faixa etária diversa."
    ],
    pontosComparar: [
      "Franquia obrigatória e reduzida — Tokio costuma ter tabelas competitivas nas duas modalidades.",
      "Cobertura de vidros e faróis (parciais x totais) — variação relevante entre planos.",
      "Capital segurado e coberturas adicionais no Vida Grupo (invalidez, doenças graves, funeral).",
      "Locais de risco cobertos em transporte de cargas — importante para operações que passam por rodovias como Dutra e Fernão Dias."
    ],
    vantagens: [
      "Aceitação boa em veículos populares e sedans médios.",
      "Produto Vida Grupo com condições competitivas para PMEs.",
      "Análise técnica cuidadosa em empresarial — bom para negócios com particularidades."
    ],
    limitacoes: [
      "Aceitação mais criteriosa em perfis jovens sem histórico ou veículos de alto valor.",
      "Nem todos os produtos são oferecidos em todas as praças — confirmar disponibilidade na cotação."
    ],
    faqs: [
      { q: "A Patro Seguros faz cotação da Tokio Marine em Guarulhos?", a: "Sim. A Tokio Marine é uma das seguradoras parceiras habituais da Patro para auto, empresarial e vida na região de Guarulhos." },
      { q: "A Tokio Marine é boa para seguro auto?", a: "Costuma ser competitiva em veículos populares e sedans de uso urbano, com franquia bem calibrada. Como sempre, o resultado depende do perfil — comparamos com outras seguradoras antes de indicar." },
      { q: "A Tokio Marine atende empresas em Guarulhos?", a: "Sim. Tem apetite para PMEs — seguro empresarial, Vida Grupo e transporte. A Patro estrutura a cotação com análise das coberturas necessárias para o setor da empresa." },
      { q: "Posso comparar Tokio Marine com Porto Seguro e Allianz?", a: "Sim, é exatamente o que a Patro faz. Apresentamos as opções lado a lado com preço, franquia, cobertura e assistência." },
      { q: "A cotação com a Patro é gratuita?", a: "Sim. Sem custo e sem compromisso de contratação." },
      { q: "A Tokio Marine cobre transporte de cargas para fora de SP?", a: "Sim, temos coberturas de transporte que podem incluir trajetos interestaduais. É preciso declarar rota, tipo de carga e valor para dimensionar a apólice corretamente." }
    ]
  },
  {
    slug: "suhai-guarulhos",
    name: "Suhai Seguradora",
    shortName: "Suhai",
    foco: "Alternativa para perfis com dificuldade de aceitação em auto e moto, com foco em roubo e furto.",
    sobre: [
      "A Suhai é uma seguradora especializada em coberturas para roubo e furto, muito buscada em Guarulhos por motoristas que enfrentam dificuldade de aceitação nas seguradoras tradicionais — seja pelo perfil (idade, tempo de habilitação, histórico), pelo bairro ou pelo modelo do veículo.",
      "O produto principal cobre roubo, furto e, em alguns planos, colisão parcial. Não é uma seguradora de portfólio amplo — o objetivo dela é resolver um problema específico: dar acesso a seguro para quem seria recusado ou pagaria caro demais em outras marcas. A Patro trabalha com a Suhai justamente para atender esse cenário."
    ],
    tipos: ["Auto", "Moto"],
    tiposDetalhes:
      "Seguro auto e moto com foco em roubo e furto (RF), com opções que incluem colisão parcial em determinados planos. Aceita motoristas de aplicativo e perfis que costumam ser recusados por seguradoras tradicionais.",
    perfis: [
      "Motoristas jovens ou com pouco tempo de habilitação em Guarulhos.",
      "Proprietários de motos usadas em uso urbano intenso (delivery, motoboy).",
      "Moradores de bairros com maior sinistralidade (ex.: Cumbica, Pimentas, Bonsucesso) que tiveram cotação recusada em outras seguradoras."
    ],
    pontosComparar: [
      "O que está coberto: só RF ou também colisão parcial? Isso muda muito o valor e a proteção real.",
      "Franquia em caso de colisão, quando essa cobertura estiver inclusa.",
      "Assistência 24h — costuma ser mais limitada do que nas seguradoras tradicionais.",
      "Indenização em caso de perda total (regras de vistoria prévia, tempo de análise)."
    ],
    vantagens: [
      "Aceita perfis que costumam ser recusados por seguradoras tradicionais.",
      "Preço competitivo especialmente em cenários de risco maior.",
      "Cobertura útil de RF que já resolve o principal medo em bairros com sinistralidade alta."
    ],
    limitacoes: [
      "Portfólio mais estreito — não faz residencial, vida, empresarial etc.",
      "Assistência 24h e serviços agregados costumam ser mais limitados que nas grandes seguradoras.",
      "Nem todo perfil se beneficia — para motoristas com bom histórico, seguradoras completas costumam sair melhor."
    ],
    faqs: [
      { q: "A Patro Seguros faz cotação da Suhai em Guarulhos?", a: "Sim. A Suhai é uma das seguradoras que a Patro utiliza principalmente para perfis que enfrentam dificuldade de aceitação em seguradoras tradicionais." },
      { q: "A Suhai é boa para seguro auto?", a: "É uma opção interessante quando o motorista tem perfil difícil ou o carro/bairro eleva muito o preço nas grandes seguradoras. Para perfis 'normais', outras seguradoras podem ser mais completas — comparamos antes de indicar." },
      { q: "A Suhai cobre colisão?", a: "Depende do plano. Existem opções só de roubo e furto, e opções que incluem colisão parcial. A escolha depende do orçamento e do risco que você quer transferir." },
      { q: "A Suhai é boa para motoboy/delivery?", a: "É uma das poucas seguradoras com apetite para motos em uso profissional intenso, mas com regras — o uso comercial precisa ser declarado corretamente na cotação." },
      { q: "A cotação da Suhai é gratuita?", a: "Sim, a cotação com a Patro é gratuita e sem compromisso." },
      { q: "Como saber se a Suhai é a melhor opção para mim?", a: "Só comparando. A Patro faz cotação da Suhai junto com Porto, Tokio, Azul e outras — se a Suhai for a melhor combinação de preço e cobertura para o seu caso, sinalizamos." }
    ]
  },
  {
    slug: "allianz-guarulhos",
    name: "Allianz",
    shortName: "Allianz",
    foco: "Solidez internacional, forte em auto premium, empresarial e transporte.",
    sobre: [
      "A Allianz é uma das maiores seguradoras do mundo e mantém operação relevante no Brasil, com produtos para auto, residencial, empresarial e transporte. Em Guarulhos, costuma ser uma das seguradoras mais buscadas quando o cliente valoriza solidez, coberturas mais amplas e apetite para veículos de valor médio-alto.",
      "Não é sempre a mais barata em veículos populares — o posicionamento tende a ser 'cobertura completa a preço justo' e não 'menor preço do mercado'. A Patro cota Allianz especialmente quando o cliente prioriza cobertura ampla, assistência estruturada ou tem operação empresarial mais complexa."
    ],
    tipos: ["Auto", "Residencial", "Empresarial", "Frota", "Transporte", "Vida"],
    tiposDetalhes:
      "Seguro auto (incluindo veículos de valor médio-alto), residencial, empresarial para PMEs e grandes riscos, seguro de frota, transporte de cargas e vida individual/empresarial.",
    perfis: [
      "Motoristas de sedans médios, SUVs e veículos importados que buscam cobertura completa.",
      "PMEs com galpões e operações mais complexas em Guarulhos e Cumbica.",
      "Empresas com necessidade de seguro transporte (rodoviário, nacional)."
    ],
    pontosComparar: [
      "Amplitude da cobertura — Allianz costuma trabalhar coberturas mais completas, o que impacta preço.",
      "Franquia obrigatória e opções de franquia reduzida.",
      "Coberturas adicionais em empresarial (equipamentos eletrônicos, lucros cessantes, RC operações).",
      "Assistência 24h e rede referenciada em Guarulhos."
    ],
    vantagens: [
      "Solidez financeira e presença global — relevante para operações empresariais.",
      "Apetite para veículos de valor médio-alto e importados.",
      "Produtos empresariais robustos com estruturas de cobertura personalizáveis."
    ],
    limitacoes: [
      "Preço pode não ser o mais competitivo em veículos populares — vale comparar com Azul e Tokio.",
      "Aceitação criteriosa em perfis jovens ou veículos muito visados."
    ],
    faqs: [
      { q: "A Patro Seguros faz cotação da Allianz em Guarulhos?", a: "Sim. A Allianz é uma das seguradoras parceiras da Patro, muito usada quando o cliente valoriza cobertura ampla e solidez." },
      { q: "A Allianz é boa para seguro auto?", a: "Costuma ser forte em sedans médios, SUVs e importados, especialmente para perfis com bom histórico. Em populares, outras seguradoras podem sair mais em conta." },
      { q: "A Allianz atende empresas em Guarulhos?", a: "Sim, tem forte atuação em seguro empresarial, frota e transporte. Estruturamos a cotação junto com a análise de risco da empresa." },
      { q: "Posso comparar Allianz com outras seguradoras?", a: "Sim. A Patro sempre coloca a Allianz frente a frente com Porto, Tokio, HDI e outras opções." },
      { q: "A cotação da Allianz é gratuita?", a: "Sim, cotação gratuita e sem compromisso." },
      { q: "A Allianz é boa para transporte de cargas?", a: "É uma das seguradoras com produto de transporte estruturado. É preciso detalhar rota, tipo de carga e valor para dimensionar corretamente." }
    ]
  },
  {
    slug: "azul-seguros-guarulhos",
    name: "Azul Seguros",
    shortName: "Azul Seguros",
    foco: "Preço competitivo em seguro auto, especialmente em veículos populares e perfis jovens.",
    sobre: [
      "A Azul Seguros faz parte do grupo Porto e é conhecida por trabalhar com tabelas mais agressivas em seguro auto, especialmente em veículos populares e para perfis que buscam a melhor relação custo-benefício. Em Guarulhos, aparece com frequência entre as cotações mais competitivas em modelos como HB20, Onix, Mobi, Ka e similares.",
      "O produto é enxuto e direto ao ponto: bom conjunto de coberturas essenciais, franquia justa e assistência 24h utilizando a mesma estrutura da Porto. Não tem o mesmo portfólio de serviços agregados da Porto Seguro tradicional, mas para quem quer proteção sólida com preço competitivo, é uma das primeiras opções que a Patro cota."
    ],
    tipos: ["Auto", "Residencial"],
    tiposDetalhes:
      "Foco principal em seguro auto (individual, com boa aceitação em veículos populares) e produto residencial complementar.",
    perfis: [
      "Motoristas de veículos populares em Guarulhos buscando o melhor custo-benefício.",
      "Perfis jovens ou com poucos anos de habilitação que precisam de preço competitivo.",
      "Clientes que querem cobertura sólida sem pagar por pacote extenso de serviços agregados."
    ],
    pontosComparar: [
      "Franquia — costuma ser bem competitiva, mas confira o valor absoluto para o seu modelo.",
      "Cobertura de terceiros (RCF-V): valores contratados fazem diferença em caso de sinistro.",
      "Coberturas adicionais opcionais (carro reserva, vidros) — não estão sempre inclusas.",
      "Assistência 24h — verifique o pacote (guincho, chaveiro, socorro mecânico)."
    ],
    vantagens: [
      "Preço frequentemente competitivo em populares e perfis jovens.",
      "Estrutura de sinistro apoiada pelo grupo Porto.",
      "Boa aceitação para primeiro seguro."
    ],
    limitacoes: [
      "Portfólio de serviços agregados mais enxuto que Porto Seguro tradicional.",
      "Nem sempre é a melhor opção para veículos médios ou importados — comparar com Allianz e HDI."
    ],
    faqs: [
      { q: "A Patro Seguros faz cotação da Azul Seguros em Guarulhos?", a: "Sim. A Azul é uma das primeiras seguradoras que cotamos quando o objetivo é otimizar o preço em seguro auto." },
      { q: "A Azul Seguros é do grupo Porto?", a: "Sim. A Azul faz parte do grupo Porto e utiliza estrutura compartilhada de sinistro e assistência, mas tem produto e tabela próprios." },
      { q: "A Azul é boa para carro popular em Guarulhos?", a: "É frequentemente uma das mais competitivas em modelos como HB20, Onix, Mobi e similares. Comparamos com outras opções antes de indicar." },
      { q: "Posso ter carro reserva na Azul?", a: "Não é padrão em todos os planos — é uma cobertura opcional que pode ser incluída na cotação." },
      { q: "A cotação da Azul Seguros é gratuita?", a: "Sim, cotação gratuita e sem compromisso." },
      { q: "A Azul aceita motorista de aplicativo?", a: "Depende do plano e do perfil. É preciso declarar o uso corretamente na cotação para evitar problemas em sinistro." }
    ]
  },
  {
    slug: "bradesco-seguros-guarulhos",
    name: "Bradesco Seguros",
    shortName: "Bradesco Seguros",
    foco: "Estrutura de grande grupo financeiro, forte em saúde, vida e auto para perfis consolidados.",
    sobre: [
      "A Bradesco Seguros é uma das marcas mais reconhecidas do mercado brasileiro e atua em várias linhas — auto, residencial, vida e, especialmente, saúde (via Bradesco Saúde). Em Guarulhos, é bastante cotada por clientes que valorizam a estrutura de um grande grupo financeiro e centralização de produtos.",
      "Em auto, tem apetite bom para perfis consolidados (motoristas experientes, veículos de uso pessoal). Em vida e saúde, é uma das principais referências do mercado, com Vida Individual, Vida Grupo e planos de saúde individuais/empresariais amplamente aceitos na rede hospitalar."
    ],
    tipos: ["Auto", "Residencial", "Vida", "Saúde", "Empresarial"],
    tiposDetalhes:
      "Seguro auto individual, residencial, vida individual e empresarial (Vida Grupo), plano de saúde individual/familiar/empresarial (Bradesco Saúde) e seguro empresarial para PMEs.",
    perfis: [
      "Motoristas experientes com veículos de uso pessoal em Guarulhos.",
      "Famílias buscando plano de saúde com rede hospitalar reconhecida (incluindo hospitais de referência em Guarulhos e São Paulo).",
      "Empresas que querem centralizar seguro empresarial, Vida Grupo e saúde em uma marca de grande grupo."
    ],
    pontosComparar: [
      "Rede hospitalar do plano de saúde: hospitais em Guarulhos vs. hospitais na capital.",
      "Coparticipação vs. sem coparticipação em saúde — impacta muito o custo mensal.",
      "Capital segurado no Vida Individual e coberturas adicionais.",
      "Franquia em auto e coberturas de casco/RCF-V."
    ],
    vantagens: [
      "Marca com forte reconhecimento e capilaridade.",
      "Portfólio integrado (auto, vida, saúde, empresarial) — bom para consolidar apólices.",
      "Rede hospitalar ampla no Bradesco Saúde."
    ],
    limitacoes: [
      "Preço em auto pode não ser o mais competitivo em populares — vale comparar.",
      "Aceitação em saúde depende de análise (idade, doenças preexistentes, tipo de contrato)."
    ],
    faqs: [
      { q: "A Patro Seguros faz cotação de Bradesco Seguros em Guarulhos?", a: "Sim, cotamos Bradesco Seguros em auto, residencial, vida e empresarial, e Bradesco Saúde em planos individuais e empresariais." },
      { q: "A Bradesco Saúde é boa em Guarulhos?", a: "Tem rede hospitalar reconhecida na região e em São Paulo. A escolha do plano depende do orçamento, da rede desejada e da existência de coparticipação — analisamos junto com você." },
      { q: "Posso comparar Bradesco com outras seguradoras?", a: "Sim. Em auto comparamos com Porto, Tokio, Azul e outras; em saúde comparamos com Amil, SulAmérica, Hapvida-NotreDame e Unimed." },
      { q: "A cotação Bradesco é gratuita?", a: "Sim, cotação gratuita e sem compromisso." },
      { q: "A Bradesco Seguros atende empresas?", a: "Sim — seguro empresarial, Vida Grupo e Bradesco Saúde empresarial. Estruturamos a proposta conforme o setor e o número de vidas." },
      { q: "Preciso ser cliente Bradesco para contratar?", a: "Não. A contratação é feita via corretora (Patro) e não exige vínculo bancário com o Bradesco." }
    ]
  },
  {
    slug: "mapfre-guarulhos",
    name: "Mapfre",
    shortName: "Mapfre",
    foco: "Grupo espanhol com atuação forte em auto, residencial, empresarial e assistência 24h robusta.",
    sobre: [
      "A Mapfre é uma seguradora do grupo espanhol de mesmo nome, com forte presença no Brasil e apetite consistente em seguro auto, residencial e empresarial. Em Guarulhos, é cotada com frequência por clientes que buscam assistência 24h robusta e coberturas completas a preço equilibrado.",
      "Historicamente, mantém tabelas competitivas em veículos populares e sedans, e produto residencial com bom pacote de assistências. Em empresarial, atende bem PMEs, com opção de coberturas modulares que ajudam a ajustar a apólice ao setor da empresa."
    ],
    tipos: ["Auto", "Residencial", "Empresarial", "Frota", "Viagem", "Vida"],
    tiposDetalhes:
      "Seguro auto individual, residencial (com pacote de assistência amplo), empresarial para PMEs, frota, viagem e vida.",
    perfis: [
      "Motoristas de veículos populares e sedans buscando equilíbrio preço/cobertura.",
      "Proprietários de imóveis em Guarulhos que valorizam assistência 24h no residencial (chaveiro, encanador, eletricista).",
      "PMEs que precisam de seguro empresarial modular."
    ],
    pontosComparar: [
      "Franquia em auto — Mapfre costuma ter opções bem calibradas.",
      "Pacote de assistência 24h no residencial (limite de chamados e valores por serviço).",
      "Coberturas modulares no empresarial: quais estão inclusas x quais são adicionais.",
      "Capital segurado e coberturas em vida."
    ],
    vantagens: [
      "Assistência 24h consolidada, especialmente em residencial.",
      "Boa aceitação em veículos populares e sedans médios.",
      "Produto empresarial modular — dá flexibilidade para PMEs."
    ],
    limitacoes: [
      "Em veículos importados ou de alto valor, nem sempre é a mais competitiva.",
      "Alguns adicionais no residencial e empresarial não estão inclusos por padrão."
    ],
    faqs: [
      { q: "A Patro Seguros faz cotação da Mapfre em Guarulhos?", a: "Sim, a Mapfre é uma das seguradoras parceiras habituais da Patro em auto, residencial e empresarial." },
      { q: "A Mapfre é boa para seguro residencial?", a: "Tem produto residencial com pacote de assistência 24h considerado forte. É uma das opções que costumamos apresentar em cotações de residencial em Guarulhos." },
      { q: "A Mapfre atende empresas?", a: "Sim, com produto empresarial modular para PMEs. Ajustamos as coberturas ao setor da empresa." },
      { q: "Posso comparar Mapfre com outras seguradoras?", a: "Sim, comparamos Mapfre com Porto, Allianz, Tokio, HDI e outras seguradoras conforme o produto." },
      { q: "A cotação da Mapfre é gratuita?", a: "Sim, sem custo e sem compromisso." },
      { q: "A Mapfre é boa para carro popular?", a: "Costuma ter tabela competitiva em populares e sedans. O resultado final depende do perfil e do CEP — comparamos antes de indicar." }
    ]
  },
  {
    slug: "hdi-guarulhos",
    name: "HDI Seguros",
    shortName: "HDI",
    foco: "Boa aceitação em auto, residencial e empresarial, com foco em análise técnica de perfil.",
    sobre: [
      "A HDI Seguros faz parte do grupo alemão HDI Global e é uma das seguradoras mais recorrentes nas cotações da Patro em Guarulhos. É conhecida por tabelas competitivas em diversos perfis de auto, bom apetite em residencial e empresarial e agilidade em atendimento de sinistros.",
      "Em auto, tem histórico bom em populares, sedans e SUVs de linha, com boa aceitação em perfis com pontuação intermediária. Em empresarial, atende PMEs com produto flexível — vale para lojas, escritórios, restaurantes e prestadores de serviço em Guarulhos."
    ],
    tipos: ["Auto", "Residencial", "Empresarial", "Frota", "Vida"],
    tiposDetalhes:
      "Seguro auto (com bom apetite em várias faixas de perfil), residencial, empresarial para PMEs, frota e vida.",
    perfis: [
      "Motoristas com perfil intermediário buscando bom equilíbrio preço/cobertura.",
      "Lojas, escritórios e prestadores de serviço em Guarulhos precisando de seguro empresarial.",
      "Famílias com imóveis em condomínio ou casa buscando residencial competitivo."
    ],
    pontosComparar: [
      "Franquia obrigatória — HDI costuma ter opções bem calibradas por modelo.",
      "Pacote de coberturas adicionais em auto (vidros, carro reserva, RCF-V).",
      "Coberturas incluídas no empresarial (incêndio, roubo, RC, danos elétricos, vidros).",
      "Prazo de atendimento de sinistro e rede referenciada."
    ],
    vantagens: [
      "Boa aceitação de perfis intermediários em auto.",
      "Produto empresarial flexível para PMEs.",
      "Agilidade em atendimento de sinistro (feedback recorrente de clientes)."
    ],
    limitacoes: [
      "Em perfis muito jovens ou veículos muito visados, pode não ser a mais competitiva.",
      "Alguns adicionais em residencial e empresarial exigem contratação separada."
    ],
    faqs: [
      { q: "A Patro Seguros faz cotação da HDI em Guarulhos?", a: "Sim, a HDI é uma das seguradoras mais recorrentes nas cotações que fazemos em Guarulhos." },
      { q: "A HDI é boa para seguro auto?", a: "Costuma ter tabelas competitivas em populares, sedans e SUVs de linha, especialmente em perfis intermediários. Comparamos com outras seguradoras antes de indicar." },
      { q: "A HDI atende empresas em Guarulhos?", a: "Sim, tem produto empresarial flexível para PMEs — lojas, escritórios, restaurantes e prestadores." },
      { q: "Posso comparar HDI com Porto e Tokio?", a: "Sim, colocamos as opções lado a lado com preço, franquia, cobertura e assistência." },
      { q: "A cotação da HDI é gratuita?", a: "Sim, sem custo e sem compromisso." },
      { q: "A HDI é boa para residencial em Guarulhos?", a: "É uma opção competitiva. O resultado depende do CEP, valor do imóvel e coberturas escolhidas." }
    ]
  },
  {
    slug: "yelum-guarulhos",
    name: "Yelum Seguradora",
    shortName: "Yelum",
    foco: "Nome que sucedeu a Liberty Seguros no Brasil — foco em auto e residencial com identidade renovada.",
    sobre: [
      "A Yelum é a marca que passou a operar no Brasil após a reestruturação da Liberty Seguros. Mantém foco em produtos de auto e residencial, com atendimento de sinistro e estrutura operacional herdadas da operação anterior.",
      "Como qualquer marca em transição, exige atenção redobrada na cotação: coberturas, franquias e condições podem ter sido ajustadas frente ao histórico Liberty. A Patro trabalha com a Yelum quando faz sentido no perfil, e sempre orienta o cliente sobre o que mudou e o que se mantém em relação ao produto anterior."
    ],
    tipos: ["Auto", "Residencial"],
    tiposDetalhes:
      "Seguro auto e residencial. Nem toda cobertura da antiga Liberty se manteve — vale conferir na cotação atualizada.",
    perfis: [
      "Ex-clientes Liberty avaliando renovação com a marca sucessora.",
      "Motoristas em Guarulhos buscando alternativa à Porto, Azul, HDI e Tokio.",
      "Clientes de residencial que querem comparar mais opções antes de fechar."
    ],
    pontosComparar: [
      "O que se manteve x o que mudou em relação ao produto Liberty anterior.",
      "Franquia e coberturas de auto.",
      "Pacote de assistência 24h.",
      "Condições de renovação para ex-clientes Liberty."
    ],
    vantagens: [
      "Alternativa a mais no mercado — bom para ampliar comparação.",
      "Estrutura operacional herdada de uma marca com histórico no Brasil."
    ],
    limitacoes: [
      "Marca em transição — algumas coberturas e condições foram ajustadas.",
      "Portfólio mais estreito do que grandes seguradoras."
    ],
    faqs: [
      { q: "A Patro Seguros faz cotação da Yelum em Guarulhos?", a: "Sim, cotamos Yelum como uma das opções em auto e residencial, quando faz sentido para o perfil do cliente." },
      { q: "A Yelum é a mesma coisa que Liberty Seguros?", a: "A Yelum passou a operar após a reestruturação da Liberty no Brasil. A estrutura operacional foi mantida em grande parte, mas coberturas, franquias e condições podem ter sido ajustadas — vale conferir na cotação atualizada." },
      { q: "A Yelum é boa para seguro auto?", a: "É uma alternativa a mais no mercado. O resultado depende do perfil e do modelo — comparamos com Porto, Azul, HDI e outras antes de indicar." },
      { q: "Posso comparar Yelum com outras seguradoras?", a: "Sim, é exatamente o que a Patro faz." },
      { q: "A cotação da Yelum é gratuita?", a: "Sim, sem custo e sem compromisso." },
      { q: "Sou ex-cliente Liberty — posso migrar para Yelum?", a: "Podemos avaliar. A recotação leva em conta o produto atual e o seu perfil hoje — pode fazer sentido, ou pode ser mais vantajoso migrar para outra seguradora." }
    ]
  },
  {
    slug: "sompo-guarulhos",
    name: "Sompo Seguros",
    shortName: "Sompo",
    foco: "Seguradora japonesa forte em auto, residencial, empresarial e transporte de cargas.",
    sobre: [
      "A Sompo Seguros tem origem japonesa e presença consolidada no Brasil, com atuação em auto, residencial, empresarial e transporte. Em Guarulhos, aparece com frequência em cotações de empresarial para operações logísticas — natural para uma cidade que concentra o maior aeroporto de cargas do país e milhares de galpões em Cumbica.",
      "Em auto, mantém tabelas competitivas em populares e sedans com bom histórico. Em transporte de cargas, é uma das seguradoras com estrutura consolidada para embarcadores e transportadoras — algo relevante para empresas de Guarulhos que operam com Dutra, Fernão Dias e Ayrton Senna."
    ],
    tipos: ["Auto", "Residencial", "Empresarial", "Frota", "Transporte"],
    tiposDetalhes:
      "Seguro auto individual, residencial, empresarial para PMEs, frota e transporte de cargas — com destaque para operações logísticas.",
    perfis: [
      "Empresas de logística e transporte em Guarulhos e Cumbica.",
      "Motoristas com bom histórico buscando alternativa a Porto/Tokio/HDI.",
      "PMEs com galpão precisando de empresarial + transporte."
    ],
    pontosComparar: [
      "Coberturas em transporte: RCF-DC, RCTR-C, RCA-C e faixas de responsabilidade.",
      "Franquia em auto e coberturas adicionais.",
      "Pacote empresarial (incêndio, roubo, RC, danos elétricos).",
      "Rede referenciada em auto na Grande São Paulo."
    ],
    vantagens: [
      "Estrutura consolidada em transporte de cargas.",
      "Boa aceitação em empresarial para operações logísticas.",
      "Tabela competitiva em auto para bons perfis."
    ],
    limitacoes: [
      "Nem todo perfil de auto é atendido — aceita mais critérios em veículos jovens/muito visados.",
      "Alguns produtos podem exigir análise técnica mais longa (empresarial + transporte)."
    ],
    faqs: [
      { q: "A Patro Seguros faz cotação da Sompo em Guarulhos?", a: "Sim, a Sompo é uma das seguradoras que a Patro utiliza especialmente em cotações de empresarial e transporte para clientes de Guarulhos/Cumbica." },
      { q: "A Sompo é boa para transporte de cargas?", a: "É uma das seguradoras com estrutura consolidada em cargas. Estruturamos a cotação com rota, tipo de carga e valor." },
      { q: "A Sompo atende empresas de logística em Guarulhos?", a: "Sim, tem apetite para empresarial e transporte. Muito procurada por operações que passam por Dutra, Fernão Dias e Ayrton Senna." },
      { q: "Posso comparar Sompo com Allianz e Tokio?", a: "Sim, é exatamente o que fazemos em cotações de empresarial e transporte." },
      { q: "A cotação da Sompo é gratuita?", a: "Sim, sem custo e sem compromisso." },
      { q: "A Sompo é boa para seguro auto?", a: "Costuma ter tabelas competitivas para bons perfis. Como sempre, comparamos com outras opções antes de indicar." }
    ]
  },
  {
    slug: "mitsui-guarulhos",
    name: "Mitsui Sumitomo",
    shortName: "Mitsui",
    foco: "Análise técnica de risco em auto, empresarial e transporte — especialmente para operações estruturadas.",
    sobre: [
      "A Mitsui Sumitomo é uma seguradora de origem japonesa com forte histórico em análise técnica de risco. Em Guarulhos, é procurada especialmente por empresas que precisam de seguro empresarial e transporte com dimensionamento cuidadoso — não é uma seguradora de 'produto de prateleira', e sim uma parceira que costuma calibrar a apólice caso a caso.",
      "Em auto, atende perfis consolidados com veículos de uso pessoal. Em empresarial e transporte, é frequente aparecer em cotações de PMEs com galpão em Cumbica, importadores/exportadores e operações logísticas — segmentos em que a análise técnica faz diferença real."
    ],
    tipos: ["Auto", "Empresarial", "Frota", "Transporte"],
    tiposDetalhes:
      "Seguro auto individual (para perfis consolidados), empresarial para PMEs, frota e transporte de cargas (nacional e, em alguns casos, internacional).",
    perfis: [
      "Motoristas experientes com veículos de uso pessoal.",
      "PMEs com galpão em Cumbica precisando de análise técnica cuidadosa.",
      "Importadores/exportadores e operações logísticas."
    ],
    pontosComparar: [
      "Coberturas de transporte (RCTR-C, RCF-DC, RCA-C, seguro internacional se aplicável).",
      "Análise de risco em empresarial (pode envolver visita técnica).",
      "Franquia obrigatória em auto e coberturas adicionais.",
      "Prazos de análise — costumam ser mais longos que seguradoras de 'balcão'."
    ],
    vantagens: [
      "Análise técnica de risco cuidadosa — bom para operações não-padrão.",
      "Boa atuação em transporte, incluindo cargas de maior valor.",
      "Portfólio confiável para empresas que preferem uma seguradora com histórico técnico."
    ],
    limitacoes: [
      "Não é a mais indicada para populares ou perfis jovens — foco é outro.",
      "Prazos de análise costumam ser mais longos que seguradoras de linha comum."
    ],
    faqs: [
      { q: "A Patro Seguros faz cotação da Mitsui em Guarulhos?", a: "Sim, principalmente em empresarial, frota e transporte. Em auto, cotamos para perfis consolidados." },
      { q: "A Mitsui é boa para empresa com galpão em Cumbica?", a: "É uma das opções que consideramos, especialmente por conta da análise técnica cuidadosa. Estruturamos a cotação com base no risco real da operação." },
      { q: "A Mitsui atende transporte de cargas?", a: "Sim, com produto estruturado. Precisamos detalhar rota, tipo de carga e valor para dimensionar corretamente." },
      { q: "Posso comparar Mitsui com Allianz, Sompo e Tokio?", a: "Sim, é exatamente o que fazemos em cotações de empresarial e transporte." },
      { q: "A cotação da Mitsui é gratuita?", a: "Sim, sem custo e sem compromisso." },
      { q: "A Mitsui é boa para carro popular?", a: "Não é o foco. Para populares, seguradoras como Azul, Porto, Tokio e HDI costumam ser mais competitivas." }
    ]
  },
  {
    slug: "sulamerica-guarulhos",
    name: "SulAmérica",
    shortName: "SulAmérica",
    foco: "Referência em saúde, odonto e vida — planos individuais, familiares e empresariais.",
    sobre: [
      "A SulAmérica é uma das principais operadoras de saúde e vida do Brasil, com produtos amplamente aceitos na rede hospitalar de São Paulo e Guarulhos. Em Guarulhos, é uma das operadoras mais cotadas em planos de saúde individuais, familiares e empresariais.",
      "Em vida individual e Vida Grupo, tem produtos robustos com coberturas adicionais (invalidez, doenças graves, funeral) que podem ser bem calibradas conforme o perfil e o orçamento. A Patro coordena a cotação avaliando rede, coparticipação, faixa etária e coberturas."
    ],
    tipos: ["Saúde", "Vida"],
    tiposDetalhes:
      "Planos de saúde individuais, familiares e empresariais (SulAmérica Saúde), seguro de vida individual e Vida Grupo empresarial. Odonto costuma ser oferecido como adicional dependendo do produto.",
    perfis: [
      "Famílias em Guarulhos buscando plano de saúde com rede hospitalar reconhecida em SP.",
      "Empresas de qualquer porte contratando saúde empresarial + Vida Grupo.",
      "Profissionais liberais/autônomos avaliando saúde individual ou por CNPJ (MEI)."
    ],
    pontosComparar: [
      "Rede hospitalar do plano em Guarulhos e capital.",
      "Coparticipação vs. sem coparticipação — impacto direto no valor mensal.",
      "Reembolso (limite por consulta e por procedimento).",
      "Coberturas do Vida Grupo (invalidez, doenças graves, funeral)."
    ],
    vantagens: [
      "Rede hospitalar consolidada em Guarulhos e SP.",
      "Vida Grupo robusto e customizável.",
      "Marca com forte histórico em saúde e vida."
    ],
    limitacoes: [
      "Preço depende muito da faixa etária e da rede escolhida — vale comparar planos mais enxutos.",
      "Aceitação e carência seguem regras da operadora."
    ],
    faqs: [
      { q: "A Patro Seguros faz cotação da SulAmérica em Guarulhos?", a: "Sim, cotamos SulAmérica em planos de saúde individuais, familiares, empresariais e em vida (Vida Individual e Vida Grupo)." },
      { q: "A SulAmérica Saúde é boa em Guarulhos?", a: "Tem rede hospitalar consolidada na região e em São Paulo. A escolha do plano depende do orçamento, da rede desejada e do modelo (com ou sem coparticipação)." },
      { q: "Posso comparar SulAmérica com Amil, Bradesco Saúde e Unimed?", a: "Sim, comparamos os principais planos disponíveis para o seu perfil, com rede, preço e coberturas lado a lado." },
      { q: "A SulAmérica atende empresas em Guarulhos?", a: "Sim — saúde empresarial e Vida Grupo. Estruturamos a proposta conforme o setor e o número de vidas." },
      { q: "A cotação da SulAmérica é gratuita?", a: "Sim, cotação gratuita e sem compromisso." },
      { q: "SulAmérica cobre reembolso?", a: "Sim, na maioria dos planos, com limites por consulta e por procedimento. Detalhamos os valores no momento da cotação." }
    ]
  }
];

export const PARTNER_INSURERS_BY_SLUG: Record<string, PartnerInsurer> = Object.fromEntries(
  PARTNER_INSURERS.map((i) => [i.slug, i])
);
