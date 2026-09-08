/**
 * Expansão regional — Grande São Paulo e bairros da capital.
 * ---------------------------------------------------------------------------
 * PRINCÍPIO: Guarulhos continua sendo a BASE (sede física e autoridade local).
 * Estas páginas ACRESCENTAM autoridade regional — nunca substituem as páginas
 * de Guarulhos e nunca afirmam unidade/filial física na capital.
 *
 * REGRAS OBRIGATÓRIAS AO EDITAR ESTE ARQUIVO:
 *  1. Nenhum endereço fora de Guarulhos. A sede é única (ver src/config/empresa.ts).
 *  2. Nenhum dado inventado: criminalidade, renda, preço médio, sinistralidade,
 *     número de veículos, número de clientes ou estatística local.
 *  3. Conteúdo original por bairro: proibido clonar a página de Guarulhos
 *     trocando o nome do bairro.
 *  4. Se não houver contexto local suficiente para justificar a página, não publicar.
 */

export interface BairroSpFaq {
  question: string;
  answer: string;
}

export interface BairroSpConfig {
  /** Slug canônico sem barra inicial (ex.: "seguro-auto-moema"). */
  slug: string;
  /** Nome do bairro como aparece no H1. */
  bairro: string;
  /** Região da capital (zona) — usada em texto, nunca como endereço. */
  regiao: string;
  title: string;
  metaDescription: string;
  /** Parágrafos de abertura (contexto local + atuação regional). */
  intro: string[];
  /** Seção 1 — Seguro auto no bairro. */
  contexto: string[];
  /** Seção 2 — O que influencia a contratação naquele bairro. */
  fatores: { title: string; description: string }[];
  /** Seção 3 — Coberturas importantes para o perfil do bairro. */
  coberturas: { title: string; description: string }[];
  /** Seção 4 — Perfis atendidos. */
  perfis: string[];
  /** Seção 7 — Outros seguros disponíveis para a região. */
  outrosSeguros: { title: string; link: string }[];
  /** Seção 9 — Bairros próximos (interlinking). */
  bairrosProximos: { name: string; link: string }[];
  /** Seção 10 — FAQ específico (mín. 5). */
  faqs: BairroSpFaq[];
}

export const GRANDE_SP_PATH = "/grande-sao-paulo";

/** Frase-base do posicionamento regional (variar a redação nas páginas). */
export const POSICIONAMENTO_REGIONAL =
  "A Patro Seguros é uma corretora sediada em Guarulhos, com atendimento a pessoas e empresas em Guarulhos, na Grande São Paulo e em outras regiões do Brasil.";

/** Seção 5 — por que comparar seguradoras (argumento comum, redação única). */
export const POR_QUE_COMPARAR: string[] = [
  "Cada seguradora calcula o risco com critérios próprios: mesmo carro, mesmo condutor e mesmo CEP podem gerar preços bem diferentes de uma companhia para outra.",
  "O preço isolado não decide nada. Franquia, tipo de oficina, limite de terceiros, carro reserva e assistência 24h mudam o valor que você recebe no momento do sinistro.",
  "Como corretora independente, a Patro cota com seguradoras parceiras e apresenta as alternativas lado a lado, explicando o que muda em cada uma.",
  "Você recebe a comparação por escrito e decide com calma — sem obrigação de fechar.",
];

/** Seção 6 — como funciona a cotação. */
export const PASSOS_COTACAO: { title: string; description: string }[] = [
  {
    title: "1. Você envia os dados básicos",
    description:
      "Modelo e ano do veículo, CEP onde ele dorme, uso (particular, trabalho ou aplicativo) e perfil do condutor principal.",
  },
  {
    title: "2. Cotamos com as seguradoras parceiras",
    description:
      "A cotação é feita em várias companhias ao mesmo tempo, com o mesmo padrão de cobertura, para a comparação ser justa.",
  },
  {
    title: "3. Você recebe o comparativo comentado",
    description:
      "Enviamos as opções por WhatsApp ou e-mail com as diferenças de franquia, assistência e limites explicadas em linguagem simples.",
  },
  {
    title: "4. Contratação e acompanhamento",
    description:
      "Depois de escolher, cuidamos da emissão e ficamos como seu ponto de contato em renovações, alterações e sinistros.",
  },
];

/** Seção 8 — atendimento (sede em Guarulhos + atuação regional). */
export const ATENDIMENTO_REGIONAL: string[] = [
  "A sede da Patro Seguros fica em Guarulhos, na Cidade Maia. Não temos escritório na capital: o atendimento em São Paulo é feito de forma digital e consultiva, por WhatsApp, telefone, e-mail e reuniões on-line.",
  "Na prática, isso não muda nada para você: cotação, envio de documentos, emissão da apólice e abertura de sinistro são resolvidos à distância, com um consultor responsável pelo seu caso.",
  "Quem prefere conversar pessoalmente pode agendar uma visita à sede em Guarulhos, com hora marcada.",
];

const linkAuto = (slug: string) => `/${slug}`;

export const bairrosSaoPauloAuto: Record<string, BairroSpConfig> = {
  "seguro-auto-itaim-bibi": {
    slug: "seguro-auto-itaim-bibi",
    bairro: "Itaim Bibi",
    regiao: "zona oeste de São Paulo",
    title: "Seguro Auto no Itaim Bibi SP | Patro Seguros",
    metaDescription:
      "Seguro auto no Itaim Bibi, São Paulo: compare seguradoras com a Patro Seguros, corretora sediada em Guarulhos com atendimento em toda a Grande São Paulo.",
    intro: [
      "O Itaim Bibi é um dos principais polos de escritórios de São Paulo, cortado pela Avenida Brigadeiro Faria Lima e pela Avenida Juscelino Kubitschek. O carro ali costuma alternar entre garagem de prédio corporativo, estacionamento rotativo e vaga em via pública no fim do dia.",
      "A Patro Seguros é uma corretora com sede em Guarulhos que atende clientes no Itaim Bibi e em outras regiões da Grande São Paulo, comparando alternativas de seguro auto entre as seguradoras parceiras.",
    ],
    contexto: [
      "Boa parte dos veículos do bairro roda poucos quilômetros por dia, mas em trechos de tráfego intenso e com muitas manobras em garagens verticais — situação clássica de sinistros de pequena monta, como retrovisores, faróis e amassados de para-choque.",
      "Também é comum o mesmo carro ser usado para deslocamento entre escritórios durante a semana e para viagens no fim de semana pelas marginais e rodovias que ligam a capital ao litoral e ao interior.",
      "Quem mora ou trabalha no Itaim e deixa o carro parado a maior parte do dia costuma se beneficiar de apólices com bom limite de danos a terceiros, já que o risco de colisão em via movimentada tende a pesar mais do que o tempo de rodagem.",
    ],
    fatores: [
      {
        title: "CEP de pernoite",
        description:
          "As seguradoras consideram o endereço onde o carro passa a noite. Garagem fechada em edifício costuma ser avaliada de forma diferente de vaga na rua.",
      },
      {
        title: "Uso profissional",
        description:
          "Visitas a clientes, deslocamento entre escritórios e uso comercial precisam ser declarados. Omitir esse ponto pode gerar discussão na hora do sinistro.",
      },
      {
        title: "Perfil do condutor",
        description:
          "Idade, tempo de habilitação e quem mais dirige o veículo entram no cálculo de todas as companhias.",
      },
      {
        title: "Valor e modelo do veículo",
        description:
          "Carros com peças importadas ou tecnologia embarcada elevam o custo de reparo e influenciam franquia e prêmio.",
      },
    ],
    coberturas: [
      { title: "Danos a terceiros (RCF-V)", description: "Limite reforçado faz diferença em vias de tráfego intenso como a Faria Lima e a JK." },
      { title: "Vidros, faróis e retrovisores", description: "Cobertura muito usada por quem faz manobras diárias em garagens estreitas." },
      { title: "Assistência 24 horas", description: "Guincho, chaveiro e pane seca, úteis para quem circula em região de estacionamento rotativo." },
      { title: "Carro reserva", description: "Evita ficar sem deslocamento durante o reparo, especialmente para quem usa o veículo a trabalho." },
      { title: "Roubo e furto", description: "Indenização conforme a tabela de referência contratada, válida em todo o território nacional." },
    ],
    perfis: [
      "Profissionais que trabalham em escritórios da região e guardam o carro em garagem corporativa",
      "Moradores de edifícios residenciais do bairro",
      "Motoristas de aplicativo que atuam no eixo Faria Lima / JK",
      "Empresas que mantêm veículos de diretoria ou de apoio",
    ],
    outrosSeguros: [
      { title: "Seguro residencial", link: "/seguro-residencial" },
      { title: "Seguro empresarial", link: "/seguro-empresarial" },
      { title: "Seguro de vida", link: "/seguro-vida" },
      { title: "Plano de saúde empresarial", link: "/plano-saude-empresarial" },
    ],
    bairrosProximos: [
      { name: "Vila Olímpia", link: linkAuto("seguro-auto-vila-olimpia") },
      { name: "Pinheiros", link: linkAuto("seguro-auto-pinheiros") },
      { name: "Jardim Paulista", link: linkAuto("seguro-auto-jardim-paulista") },
      { name: "Vila Nova Conceição", link: linkAuto("seguro-auto-vila-nova-conceicao") },
    ],
    faqs: [
      {
        question: "A Patro Seguros tem escritório no Itaim Bibi?",
        answer:
          "Não. A sede fica em Guarulhos, na Cidade Maia. O atendimento a clientes do Itaim Bibi é digital e consultivo, por WhatsApp, telefone, e-mail e reuniões on-line.",
      },
      {
        question: "Preciso ir até Guarulhos para contratar?",
        answer:
          "Não. Cotação, envio de documentos, assinatura e emissão da apólice são feitos à distância. A visita presencial é opcional e com hora marcada.",
      },
      {
        question: "O CEP do Itaim muda o preço do seguro?",
        answer:
          "Sim. O endereço de pernoite é um dos fatores de cálculo de todas as seguradoras, ao lado do perfil do condutor, do uso do veículo e do modelo.",
      },
      {
        question: "Uso o carro para visitar clientes. Isso precisa ser declarado?",
        answer:
          "Precisa. Uso profissional deve constar na proposta. Declarar corretamente evita questionamento da seguradora na hora do sinistro.",
      },
      {
        question: "Em quanto tempo recebo a comparação?",
        answer:
          "Assim que recebemos os dados do veículo e do condutor, cotamos com as seguradoras parceiras e devolvemos as opções comentadas, normalmente no mesmo dia útil.",
      },
    ],
  },

  "seguro-auto-moema": {
    slug: "seguro-auto-moema",
    bairro: "Moema",
    regiao: "zona sul de São Paulo",
    title: "Seguro Auto em Moema SP | Patro Seguros",
    metaDescription:
      "Seguro auto em Moema, São Paulo: compare coberturas e seguradoras com a Patro Seguros, corretora sediada em Guarulhos com atendimento na Grande São Paulo.",
    intro: [
      "Moema é um bairro predominantemente residencial da zona sul, com forte comércio de rua, proximidade do Parque Ibirapuera e do aeroporto de Congonhas, e vias movimentadas como a Avenida Ibirapuera e a Avenida Moaci.",
      "A Patro Seguros atende moradores e empresas de Moema a partir da sua sede em Guarulhos, com cotação comparada entre seguradoras parceiras e acompanhamento do início ao sinistro.",
    ],
    contexto: [
      "O perfil de uso do carro em Moema costuma misturar trajetos curtos dentro do bairro, deslocamentos diários para outras regiões da capital e idas frequentes ao aeroporto de Congonhas.",
      "Grande parte dos veículos dorme em garagem de prédio, mas o estacionamento em via pública durante compras e refeições no comércio local é rotina — o que torna relevantes as coberturas para pequenos danos e para furto de acessórios.",
      "Famílias com mais de um carro na mesma residência costumam conseguir condições melhores quando as apólices são cotadas em conjunto, algo que avaliamos caso a caso.",
    ],
    fatores: [
      { title: "Garagem fechada", description: "Pernoite em garagem de edifício é avaliado de forma diferente de vaga em rua pelas seguradoras." },
      { title: "Condutor jovem na residência", description: "A presença de motoristas mais jovens que também usam o carro altera o cálculo do prêmio." },
      { title: "Quilometragem baixa", description: "Alguns produtos oferecem condições específicas para quem roda pouco durante a semana." },
      { title: "Segundo veículo na família", description: "Cotar as apólices juntas pode abrir descontos por vínculo entre os contratos." },
    ],
    coberturas: [
      { title: "Vidros, faróis e retrovisores", description: "Frequentemente acionada por quem estaciona na rua no comércio do bairro." },
      { title: "Danos a terceiros (RCF-V)", description: "Importante em vias de fluxo constante como Ibirapuera, Moaci e Jurema." },
      { title: "Assistência 24 horas", description: "Guincho, chaveiro e socorro mecânico com atendimento em toda a capital." },
      { title: "Carro reserva", description: "Mantém a rotina da família enquanto o veículo está em reparo." },
      { title: "Proteção de acessórios", description: "Para quem instalou som, multimídia ou película fora do padrão de fábrica." },
    ],
    perfis: [
      "Famílias moradoras de edifícios residenciais do bairro",
      "Aposentados e pessoas que rodam pouco durante a semana",
      "Profissionais que usam Congonhas com frequência",
      "Lojistas e prestadores de serviço do comércio local",
    ],
    outrosSeguros: [
      { title: "Seguro residencial", link: "/seguro-residencial" },
      { title: "Seguro de vida", link: "/seguro-vida" },
      { title: "Plano de saúde", link: "/planos-de-saude" },
      { title: "Seguro para condomínio", link: "/seguro-condominio" },
    ],
    bairrosProximos: [
      { name: "Campo Belo", link: linkAuto("seguro-auto-campo-belo") },
      { name: "Vila Nova Conceição", link: linkAuto("seguro-auto-vila-nova-conceicao") },
      { name: "Brooklin", link: linkAuto("seguro-auto-brooklin") },
      { name: "Vila Mariana", link: linkAuto("seguro-auto-vila-mariana") },
    ],
    faqs: [
      {
        question: "A Patro Seguros tem unidade em Moema?",
        answer:
          "Não existe unidade da Patro em Moema. A corretora é sediada em Guarulhos e atende clientes do bairro de forma digital, sem necessidade de deslocamento.",
      },
      {
        question: "Dá para cotar o seguro de dois carros da mesma casa?",
        answer:
          "Sim. Cotamos as apólices em conjunto e verificamos se as seguradoras oferecem condição diferenciada por vínculo entre os contratos.",
      },
      {
        question: "Moro em Moema mas o carro fica em garagem de prédio. Isso ajuda?",
        answer:
          "Costuma ajudar. Garagem fechada com controle de acesso é um dado positivo na análise de risco, embora o peso varie de uma seguradora para outra.",
      },
      {
        question: "A cobertura de vidros vale a pena?",
        answer:
          "Para quem estaciona com frequência em via pública, costuma valer: é o tipo de dano mais comum e o reparo sem cobertura sai do bolso do segurado.",
      },
      {
        question: "Como funciona o atendimento em caso de sinistro?",
        answer:
          "Você aciona a Patro por WhatsApp ou telefone, orientamos sobre documentos e prazos e acompanhamos o processo junto à seguradora até a conclusão.",
      },
    ],
  },

  "seguro-auto-vila-nova-conceicao": {
    slug: "seguro-auto-vila-nova-conceicao",
    bairro: "Vila Nova Conceição",
    regiao: "zona sul de São Paulo",
    title: "Seguro Auto na Vila Nova Conceição SP | Patro",
    metaDescription:
      "Seguro auto na Vila Nova Conceição, São Paulo: comparação entre seguradoras com a Patro Seguros, corretora sediada em Guarulhos com atuação na Grande SP.",
    intro: [
      "A Vila Nova Conceição é um bairro residencial vizinho ao Parque Ibirapuera, com ruas arborizadas, edifícios de poucos andares, comércio de bairro e vias de ligação como a Avenida Hélio Pellegrino.",
      "Sediada em Guarulhos, a Patro Seguros atende moradores da Vila Nova Conceição e de outras regiões da Grande São Paulo com cotação comparada e acompanhamento consultivo.",
    ],
    contexto: [
      "O trajeto típico é curto: escola, academia, restaurantes do entorno e o parque. Ainda assim, a região concentra veículos de valor mais alto, o que aumenta o custo de reparo e pesa na definição de franquia.",
      "Ruas estreitas e garagens com rampa favorecem sinistros de baixa gravidade — arranhões, para-choques e retrovisores — que são justamente os que mais aparecem em avisos de sinistro.",
      "Muitos moradores mantêm um segundo veículo usado apenas em fins de semana e viagens; para esse perfil, vale avaliar coberturas e franquias diferentes das do carro do dia a dia.",
    ],
    fatores: [
      { title: "Valor do veículo", description: "Carros de maior valor têm peças e mão de obra mais caras, o que se reflete em franquia e prêmio." },
      { title: "Tipo de oficina", description: "Escolher oficina autorizada da marca muda o preço em relação à oficina referenciada pela seguradora." },
      { title: "Frequência de uso", description: "Carro usado poucas vezes por semana pode se encaixar em produtos com condições específicas." },
      { title: "Condutores adicionais", description: "Filhos habilitados ou terceiros que dirigem o veículo precisam constar na proposta." },
    ],
    coberturas: [
      { title: "Oficina autorizada", description: "Reparo com peças originais na concessionária da marca, indicado para veículos mais novos." },
      { title: "Vidros, faróis e retrovisores", description: "Cobertura recorrente em bairros com garagens estreitas e ruas de mão única." },
      { title: "Danos a terceiros (RCF-V)", description: "Limite adequado ao valor médio dos veículos que circulam na região." },
      { title: "Assistência 24 horas", description: "Guincho e apoio mecânico, com opção de raio de atendimento ampliado para viagens." },
      { title: "Carro reserva", description: "Categoria de reserva compatível com o veículo segurado." },
    ],
    perfis: [
      "Moradores de edifícios residenciais de baixa densidade",
      "Famílias com dois ou mais veículos",
      "Proprietários de carros de maior valor agregado",
      "Quem usa o carro poucas vezes por semana",
    ],
    outrosSeguros: [
      { title: "Seguro residencial", link: "/seguro-residencial" },
      { title: "Seguro de vida", link: "/seguro-vida" },
      { title: "Seguro para condomínio", link: "/seguro-condominio" },
      { title: "Seguro viagem", link: "/seguro-viagem" },
    ],
    bairrosProximos: [
      { name: "Moema", link: linkAuto("seguro-auto-moema") },
      { name: "Itaim Bibi", link: linkAuto("seguro-auto-itaim-bibi") },
      { name: "Campo Belo", link: linkAuto("seguro-auto-campo-belo") },
      { name: "Vila Olímpia", link: linkAuto("seguro-auto-vila-olimpia") },
    ],
    faqs: [
      {
        question: "Vale a pena contratar oficina autorizada?",
        answer:
          "Para veículos novos ou ainda em garantia, costuma valer. Para carros mais antigos, a oficina referenciada reduz o prêmio sem perda relevante de qualidade no reparo.",
      },
      {
        question: "Tenho um carro que quase não uso. Existe apólice para isso?",
        answer:
          "Existem produtos com condições para baixa quilometragem. Avaliamos se compensam frente a uma apólice tradicional, considerando franquia e coberturas.",
      },
      {
        question: "A Patro atende a Vila Nova Conceição presencialmente?",
        answer:
          "O atendimento é digital. A sede física fica em Guarulhos e pode receber visitas com agendamento, mas nada no processo exige presença.",
      },
      {
        question: "Meu filho vai dirigir o carro. Preciso avisar?",
        answer:
          "Sim. Condutores adicionais, principalmente os mais jovens, precisam constar na proposta para não haver discussão sobre cobertura depois.",
      },
      {
        question: "A franquia pode ser reduzida?",
        answer:
          "Algumas seguradoras oferecem franquia reduzida ou majorada. Reduzir aumenta o prêmio; nós mostramos as duas simulações para você comparar.",
      },
    ],
  },

  "seguro-auto-jardim-paulista": {
    slug: "seguro-auto-jardim-paulista",
    bairro: "Jardim Paulista",
    regiao: "região central-oeste de São Paulo",
    title: "Seguro Auto no Jardim Paulista SP | Patro Seguros",
    metaDescription:
      "Seguro auto no Jardim Paulista, São Paulo: compare seguradoras com a Patro Seguros, corretora com sede em Guarulhos e atendimento em toda a Grande SP.",
    intro: [
      "O Jardim Paulista reúne uso residencial e comercial em um mesmo território: prédios de moradia, consultórios, escritórios e um comércio forte nas imediações da Avenida Paulista, da Rua Augusta e da Rua Oscar Freire.",
      "A Patro Seguros, corretora sediada em Guarulhos, atende clientes do Jardim Paulista e da Grande São Paulo comparando alternativas de seguro auto entre suas seguradoras parceiras.",
    ],
    contexto: [
      "É uma das regiões da capital com maior circulação de pedestres e ciclistas, o que muda o perfil de risco: além da colisão entre veículos, ganham peso os danos a terceiros em manobras de baixa velocidade.",
      "Muitos moradores usam o carro apenas nos fins de semana, já que o transporte sobre trilhos e as opções a pé cobrem boa parte da rotina — perfil que costuma responder bem a apólices com franquia mais alta e prêmio menor.",
      "Profissionais de saúde e autônomos com consultório no bairro frequentemente usam o mesmo veículo para trabalho e vida pessoal, o que precisa estar declarado na proposta.",
    ],
    fatores: [
      { title: "Circulação de pedestres e ciclistas", description: "Aumenta a importância do limite de danos corporais a terceiros." },
      { title: "Estacionamento rotativo", description: "Períodos frequentes em via pública influenciam a análise de risco de furto e avarias." },
      { title: "Uso misto (trabalho e lazer)", description: "Declarar o uso real evita divergência na regulação de um sinistro." },
      { title: "Idade e histórico do condutor", description: "Tempo de habilitação e histórico de sinistros pesam em todas as seguradoras." },
    ],
    coberturas: [
      { title: "Danos corporais a terceiros", description: "Cobertura central em áreas de grande circulação de pedestres." },
      { title: "Danos morais a terceiros", description: "Complementa o RCF-V em situações de acordo judicial." },
      { title: "Vidros e retrovisores", description: "Recorrente para quem estaciona em via pública." },
      { title: "Assistência 24 horas", description: "Inclui guincho e chaveiro na capital e em viagens." },
      { title: "Roubo e furto", description: "Indenização conforme a referência contratada na apólice." },
    ],
    perfis: [
      "Moradores que usam o carro principalmente nos fins de semana",
      "Profissionais liberais com consultório ou escritório na região",
      "Famílias com veículo único",
      "Quem alterna carro próprio e transporte público no dia a dia",
    ],
    outrosSeguros: [
      { title: "Seguro para consultórios e clínicas", link: "/seguro-consultorio-guarulhos" },
      { title: "Seguro residencial", link: "/seguro-residencial" },
      { title: "Seguro de vida", link: "/seguro-vida" },
      { title: "Plano de saúde", link: "/planos-de-saude" },
    ],
    bairrosProximos: [
      { name: "Pinheiros", link: linkAuto("seguro-auto-pinheiros") },
      { name: "Itaim Bibi", link: linkAuto("seguro-auto-itaim-bibi") },
      { name: "Vila Mariana", link: linkAuto("seguro-auto-vila-mariana") },
      { name: "Perdizes", link: linkAuto("seguro-auto-perdizes") },
    ],
    faqs: [
      {
        question: "Uso pouco o carro. Compensa aumentar a franquia?",
        answer:
          "Pode compensar. Franquia maior reduz o prêmio e faz sentido para quem roda pouco e tem reserva para arcar com um reparo eventual. Mostramos as duas simulações.",
      },
      {
        question: "Atendo pacientes no consultório e uso o carro para isso. Muda algo?",
        answer:
          "Muda a classificação de uso. É preciso declarar o uso profissional; isso evita questionamento no sinistro e permite indicar coberturas mais adequadas.",
      },
      {
        question: "A Patro tem endereço no Jardim Paulista?",
        answer:
          "Não. A sede é em Guarulhos, na Cidade Maia, e o atendimento na capital é digital, por WhatsApp, telefone, e-mail e reuniões on-line.",
      },
      {
        question: "O que é cobertura de danos morais?",
        answer:
          "É a proteção para condenações por dano moral decorrentes de um acidente, contratada como um limite adicional ao de danos materiais e corporais.",
      },
      {
        question: "Consigo trocar de seguradora na renovação sem perder bônus?",
        answer:
          "Na maior parte dos casos sim: o bônus é transferido mediante comprovação da apólice anterior. Cuidamos desse trâmite na cotação.",
      },
    ],
  },

  "seguro-auto-vila-olimpia": {
    slug: "seguro-auto-vila-olimpia",
    bairro: "Vila Olímpia",
    regiao: "zona sul de São Paulo",
    title: "Seguro Auto na Vila Olímpia SP | Patro Seguros",
    metaDescription:
      "Seguro auto na Vila Olímpia, São Paulo: cotação comparada com a Patro Seguros, corretora sediada em Guarulhos com atendimento em toda a Grande São Paulo.",
    intro: [
      "A Vila Olímpia concentra torres corporativas, hotéis, bares e restaurantes ao longo da Avenida Juscelino Kubitschek e das ruas que ligam o bairro à Faria Lima e à Marginal Pinheiros.",
      "Corretora sediada em Guarulhos, a Patro Seguros atende quem mora, trabalha ou mantém empresa na Vila Olímpia, comparando alternativas de seguro auto entre as seguradoras parceiras.",
    ],
    contexto: [
      "O bairro tem um ciclo duplo: durante o dia recebe grande volume de veículos corporativos e, à noite, movimento de bares e casas noturnas, com uso frequente de manobrista.",
      "A entrega do carro a manobrista é um detalhe que costuma passar despercebido na contratação e que aparece nas condições gerais de várias apólices — vale ler esse item antes de assinar.",
      "Para empresas instaladas na região, faz sentido avaliar apólice de frota em vez de contratos individuais quando há três ou mais veículos.",
    ],
    fatores: [
      { title: "Manobrista e estacionamentos", description: "O uso frequente de valet aparece nas condições gerais e merece atenção na comparação." },
      { title: "Pernoite corporativo x residencial", description: "Onde o carro dorme durante a semana influencia diretamente o cálculo." },
      { title: "Veículos de empresa", description: "A partir de três veículos, a apólice de frota costuma ser mais eficiente." },
      { title: "Trânsito de rota curta", description: "Muitas manobras e paradas elevam a chance de sinistros de pequena monta." },
    ],
    coberturas: [
      { title: "Danos a terceiros (RCF-V)", description: "Limites reforçados para região de tráfego denso e veículos de valor variado." },
      { title: "Assistência 24 horas", description: "Guincho, chaveiro e apoio em garagem de difícil acesso." },
      { title: "Carro reserva", description: "Reduz o impacto do reparo em quem depende do veículo para trabalhar." },
      { title: "Vidros, faróis e retrovisores", description: "Danos comuns em manobras e estacionamentos verticais." },
      { title: "Roubo e furto", description: "Indenização conforme a referência contratada, válida em todo o país." },
    ],
    perfis: [
      "Profissionais que trabalham nas torres corporativas do bairro",
      "Empresas com veículos de diretoria, apoio ou frota leve",
      "Motoristas de aplicativo que atuam no eixo JK / Faria Lima",
      "Moradores dos edifícios residenciais da região",
    ],
    outrosSeguros: [
      { title: "Seguro de frota", link: "/seguro-frota" },
      { title: "Seguro empresarial", link: "/seguro-empresarial" },
      { title: "Seguro de responsabilidade civil", link: "/seguro-rc" },
      { title: "Plano de saúde empresarial", link: "/plano-saude-empresarial" },
    ],
    bairrosProximos: [
      { name: "Itaim Bibi", link: linkAuto("seguro-auto-itaim-bibi") },
      { name: "Brooklin", link: linkAuto("seguro-auto-brooklin") },
      { name: "Moema", link: linkAuto("seguro-auto-moema") },
      { name: "Pinheiros", link: linkAuto("seguro-auto-pinheiros") },
    ],
    faqs: [
      {
        question: "Deixar o carro com manobrista tem cobertura?",
        answer:
          "Depende da apólice. Esse ponto está nas condições gerais de cada seguradora e é um dos itens que destacamos na comparação, justamente por ser rotina na região.",
      },
      {
        question: "Minha empresa tem quatro carros. Vale fazer frota?",
        answer:
          "Em geral sim. A partir de três veículos, a apólice de frota tende a simplificar a gestão e melhorar as condições. Fazemos as duas cotações para comparar.",
      },
      {
        question: "A Patro tem escritório na Vila Olímpia?",
        answer:
          "Não. A corretora é sediada em Guarulhos e atende a Vila Olímpia de forma digital, com um consultor responsável pelo atendimento.",
      },
      {
        question: "Trabalho na Vila Olímpia mas moro em outra cidade. Qual CEP vale?",
        answer:
          "Vale o CEP onde o veículo passa a noite. É esse endereço que as seguradoras usam como referência principal de risco.",
      },
      {
        question: "Sou motorista de aplicativo. A apólice comum serve?",
        answer:
          "Não. O uso em aplicativo precisa de apólice específica ou de cláusula que contemple essa atividade, sob risco de negativa do sinistro.",
      },
    ],
  },

  "seguro-auto-pinheiros": {
    slug: "seguro-auto-pinheiros",
    bairro: "Pinheiros",
    regiao: "zona oeste de São Paulo",
    title: "Seguro Auto em Pinheiros SP | Patro Seguros",
    metaDescription:
      "Seguro auto em Pinheiros, São Paulo: compare coberturas e seguradoras com a Patro Seguros, corretora sediada em Guarulhos com atuação na Grande São Paulo.",
    intro: [
      "Pinheiros combina moradia, comércio e serviços em torno do Largo da Batata, da Avenida Rebouças e da Avenida Brigadeiro Faria Lima, com forte presença de transporte público, ciclovias e comércio de rua.",
      "A Patro Seguros é uma corretora com sede em Guarulhos que atende clientes de Pinheiros e de diferentes regiões da Grande São Paulo, com cotação comparada e suporte no sinistro.",
    ],
    contexto: [
      "É um dos bairros da capital em que o carro divide espaço com bicicletas, patinetes e um volume alto de pedestres — cenário que aumenta a relevância da cobertura de danos a terceiros.",
      "Boa parte dos moradores usa o veículo de forma intermitente, alternando com metrô e aplicativos, e mantém o carro estacionado em garagem de prédio durante a semana.",
      "O comércio local e os pequenos escritórios da região frequentemente usam veículos leves para entregas e visitas, o que exige declaração correta do uso comercial.",
    ],
    fatores: [
      { title: "Convívio com ciclistas e pedestres", description: "Reforça a necessidade de limites adequados de danos corporais a terceiros." },
      { title: "Uso intermitente do veículo", description: "Quem alterna carro e transporte público pode se beneficiar de produtos por perfil de uso." },
      { title: "Uso comercial leve", description: "Entregas e visitas a clientes mudam a classificação de uso na proposta." },
      { title: "Local de pernoite", description: "Garagem de edifício e vaga em rua recebem avaliações diferentes." },
    ],
    coberturas: [
      { title: "Danos corporais a terceiros", description: "Prioridade em bairro com alta circulação de pedestres e ciclistas." },
      { title: "Assistência 24 horas", description: "Guincho, chaveiro e pane elétrica, incluindo garagens de acesso difícil." },
      { title: "Vidros, faróis e retrovisores", description: "Cobertura útil para quem estaciona em via pública no comércio local." },
      { title: "Carro reserva", description: "Mantém a mobilidade durante o período de reparo." },
      { title: "Roubo e furto", description: "Indenização conforme a referência contratada na apólice." },
    ],
    perfis: [
      "Moradores que alternam carro, metrô e aplicativos",
      "Pequenos comerciantes e prestadores de serviço da região",
      "Profissionais de agências, estúdios e escritórios do bairro",
      "Famílias com veículo único usado nos fins de semana",
    ],
    outrosSeguros: [
      { title: "Seguro residencial", link: "/seguro-residencial" },
      { title: "Seguro empresarial", link: "/seguro-empresarial" },
      { title: "Seguro de vida", link: "/seguro-vida" },
      { title: "Seguro de celular", link: "/seguro-celular" },
    ],
    bairrosProximos: [
      { name: "Itaim Bibi", link: linkAuto("seguro-auto-itaim-bibi") },
      { name: "Jardim Paulista", link: linkAuto("seguro-auto-jardim-paulista") },
      { name: "Perdizes", link: linkAuto("seguro-auto-perdizes") },
      { name: "Vila Olímpia", link: linkAuto("seguro-auto-vila-olimpia") },
    ],
    faqs: [
      {
        question: "Bati em um ciclista. O seguro cobre?",
        answer:
          "A cobertura de danos corporais a terceiros é a que responde nesse tipo de ocorrência, dentro do limite contratado. Por isso recomendamos limites mais altos em bairros como Pinheiros.",
      },
      {
        question: "Uso o carro para entregas do meu negócio. Preciso avisar?",
        answer:
          "Sim. Entrega e visita a clientes configuram uso comercial e devem constar na proposta para não gerar recusa em um eventual sinistro.",
      },
      {
        question: "A Patro atende Pinheiros presencialmente?",
        answer:
          "O atendimento é digital. A sede física fica em Guarulhos e recebe visitas com agendamento, mas o processo inteiro pode ser feito à distância.",
      },
      {
        question: "Existe seguro para quem roda pouco?",
        answer:
          "Existem produtos com precificação por perfil de uso. Avaliamos se, no seu caso, eles saem melhor do que uma apólice tradicional com franquia ajustada.",
      },
      {
        question: "Quanto tempo leva para a apólice ficar pronta?",
        answer:
          "Após a escolha da proposta e o envio da documentação, a emissão costuma ocorrer em poucos dias úteis, com a vigência já garantida desde a aceitação.",
      },
    ],
  },

  "seguro-auto-brooklin": {
    slug: "seguro-auto-brooklin",
    bairro: "Brooklin",
    regiao: "zona sul de São Paulo",
    title: "Seguro Auto no Brooklin SP | Patro Seguros",
    metaDescription:
      "Seguro auto no Brooklin, São Paulo: compare seguradoras com a Patro Seguros, corretora sediada em Guarulhos com atendimento em toda a Grande São Paulo.",
    intro: [
      "O Brooklin mistura ruas residenciais tranquilas com o eixo corporativo da Avenida Engenheiro Luís Carlos Berrini e da Avenida Santo Amaro, além da proximidade com a Marginal Pinheiros e com o aeroporto de Congonhas.",
      "A Patro Seguros atende moradores e empresas do Brooklin a partir de Guarulhos, onde fica sua sede, com cotação comparada entre seguradoras parceiras.",
    ],
    contexto: [
      "O bairro reúne dois perfis bem distintos: o morador que usa o carro para trajetos curtos e o profissional que percorre diariamente marginais e pontes, com exposição maior a congestionamentos e colisões traseiras.",
      "A proximidade de Congonhas torna comum o deslocamento frequente para embarques, muitas vezes com o carro permanecendo dias em estacionamento pago.",
      "Empresas instaladas na Berrini costumam ter veículos de apoio e representantes comerciais rodando pela região metropolitana, cenário em que a apólice de frota tende a ser mais eficiente.",
    ],
    fatores: [
      { title: "Rodagem em marginais", description: "Trajetos diários por vias expressas elevam a exposição a colisões e pesam na análise." },
      { title: "Permanência em estacionamento", description: "Carros que ficam dias parados em estacionamento pago têm rotina diferente do pernoite em casa." },
      { title: "Veículos de empresa", description: "Frotas leves com representantes comerciais pedem análise separada da apólice pessoal." },
      { title: "Modelo do veículo", description: "Custo de peças e índice de furto do modelo influenciam o prêmio em todas as companhias." },
    ],
    coberturas: [
      { title: "Danos a terceiros (RCF-V)", description: "Essencial para quem roda diariamente em vias expressas." },
      { title: "Assistência 24 horas com guincho ampliado", description: "Útil para quem viaja com frequência a partir de Congonhas." },
      { title: "Carro reserva", description: "Evita interrupção da rotina profissional durante o reparo." },
      { title: "Roubo e furto", description: "Indenização conforme a referência contratada na apólice." },
      { title: "Vidros, faróis e retrovisores", description: "Danos frequentes em trânsito pesado e obras nas marginais." },
    ],
    perfis: [
      "Profissionais que trabalham no eixo Berrini / Santo Amaro",
      "Moradores das ruas residenciais do Brooklin Velho",
      "Empresas com veículos de apoio e representantes comerciais",
      "Quem usa Congonhas com frequência",
    ],
    outrosSeguros: [
      { title: "Seguro de frota", link: "/seguro-frota" },
      { title: "Seguro empresarial", link: "/seguro-empresarial" },
      { title: "Seguro residencial", link: "/seguro-residencial" },
      { title: "Seguro viagem", link: "/seguro-viagem" },
    ],
    bairrosProximos: [
      { name: "Campo Belo", link: linkAuto("seguro-auto-campo-belo") },
      { name: "Vila Olímpia", link: linkAuto("seguro-auto-vila-olimpia") },
      { name: "Moema", link: linkAuto("seguro-auto-moema") },
      { name: "Vila Nova Conceição", link: linkAuto("seguro-auto-vila-nova-conceicao") },
    ],
    faqs: [
      {
        question: "Rodo todo dia pela Marginal Pinheiros. Isso encarece o seguro?",
        answer:
          "A quilometragem e o tipo de via influenciam a análise de risco de cada seguradora, com pesos diferentes. Por isso a comparação entre companhias costuma revelar diferenças relevantes.",
      },
      {
        question: "Deixo o carro dias em estacionamento no aeroporto. Há cobertura?",
        answer:
          "As coberturas de roubo, furto e danos seguem valendo, observadas as condições gerais da apólice. Avaliamos esse ponto na comparação quando é parte da sua rotina.",
      },
      {
        question: "A Patro Seguros tem filial no Brooklin?",
        answer:
          "Não. A sede fica em Guarulhos e o atendimento no Brooklin é digital, com consultor dedicado por WhatsApp, telefone e reuniões on-line.",
      },
      {
        question: "Minha empresa tem representantes rodando pela Grande SP. Como segurar?",
        answer:
          "Nesse cenário, avaliamos apólice de frota com cobertura para uso comercial e assistência compatível com deslocamentos longos.",
      },
      {
        question: "O seguro cobre alagamento?",
        answer:
          "A cobertura para danos por alagamento existe em apólices compreensivas, mas as condições variam. É um item que verificamos caso a caso na comparação.",
      },
    ],
  },

  "seguro-auto-vila-mariana": {
    slug: "seguro-auto-vila-mariana",
    bairro: "Vila Mariana",
    regiao: "zona sul de São Paulo",
    title: "Seguro Auto na Vila Mariana SP | Patro Seguros",
    metaDescription:
      "Seguro auto na Vila Mariana, São Paulo: cotação comparada com a Patro Seguros, corretora sediada em Guarulhos com atendimento na Grande São Paulo.",
    intro: [
      "A Vila Mariana é um bairro residencial consolidado, com forte presença de instituições de ensino e saúde, comércio ao longo da Rua Vergueiro e da Avenida Domingos de Morais e boa cobertura de metrô.",
      "Com sede em Guarulhos, a Patro Seguros atende famílias e profissionais da Vila Mariana e de outras áreas da Grande São Paulo, comparando alternativas de seguro auto.",
    ],
    contexto: [
      "O perfil predominante é familiar: veículo usado para escola, trabalho e compras, com pernoite em garagem de edifício e uso mais intenso nos fins de semana.",
      "A boa oferta de metrô faz muitos moradores deixarem o carro parado durante a semana, o que abre espaço para produtos com precificação por uso ou franquia mais alta.",
      "Estudantes e profissionais da área de saúde que atuam nas instituições da região frequentemente compartilham o veículo da família, situação que precisa constar como condutor adicional.",
    ],
    fatores: [
      { title: "Condutores adicionais", description: "Filhos estudantes que dirigem o carro da família alteram diretamente o cálculo." },
      { title: "Baixa rodagem semanal", description: "Quem usa metrô no dia a dia pode encontrar condições melhores em produtos por perfil de uso." },
      { title: "Garagem de edifício", description: "Pernoite em local fechado é um dado positivo na análise de risco." },
      { title: "Uso em plantões e turnos", description: "Profissionais de saúde que dirigem em horários alternativos devem declarar essa rotina." },
    ],
    coberturas: [
      { title: "Danos a terceiros (RCF-V)", description: "Cobertura básica de proteção patrimonial em caso de acidente com terceiros." },
      { title: "Carro reserva", description: "Fundamental para famílias com um único veículo." },
      { title: "Assistência 24 horas", description: "Guincho, chaveiro e socorro em qualquer horário, incluindo plantões noturnos." },
      { title: "Vidros, faróis e retrovisores", description: "Danos comuns em estacionamento de rua no comércio do bairro." },
      { title: "Proteção para condutor jovem", description: "Condições específicas quando há motorista recém-habilitado na residência." },
    ],
    perfis: [
      "Famílias com filhos em idade escolar ou universitária",
      "Profissionais de saúde e educação que atuam na região",
      "Moradores que usam metrô durante a semana",
      "Aposentados com baixa quilometragem",
    ],
    outrosSeguros: [
      { title: "Seguro residencial", link: "/seguro-residencial" },
      { title: "Seguro de vida", link: "/seguro-vida" },
      { title: "Plano de saúde", link: "/planos-de-saude" },
      { title: "Seguro para consultórios", link: "/seguro-consultorio-guarulhos" },
    ],
    bairrosProximos: [
      { name: "Jardim Paulista", link: linkAuto("seguro-auto-jardim-paulista") },
      { name: "Moema", link: linkAuto("seguro-auto-moema") },
      { name: "Campo Belo", link: linkAuto("seguro-auto-campo-belo") },
      { name: "Perdizes", link: linkAuto("seguro-auto-perdizes") },
    ],
    faqs: [
      {
        question: "Meu filho recém-habilitado vai usar o carro. O seguro sobe muito?",
        answer:
          "Condutor jovem eleva o prêmio, mas o impacto varia bastante entre seguradoras. É um dos casos em que comparar companhias faz mais diferença.",
      },
      {
        question: "Uso metrô durante a semana. Existe desconto?",
        answer:
          "Não existe desconto automático, mas há produtos com precificação por quilometragem ou perfil de uso que podem sair melhor para quem roda pouco.",
      },
      {
        question: "A Patro tem unidade na Vila Mariana?",
        answer:
          "Não. A corretora é sediada em Guarulhos e atende clientes da Vila Mariana de forma digital, sem necessidade de deslocamento.",
      },
      {
        question: "Trabalho em plantões noturnos. Isso interfere?",
        answer:
          "Pode interferir na análise de risco. O importante é declarar a rotina real de uso para que a apólice não tenha brechas na hora do sinistro.",
      },
      {
        question: "O seguro cobre danos ao carro dentro da garagem do prédio?",
        answer:
          "Depende da origem do dano e das coberturas contratadas. Situações envolvendo terceiros dentro do condomínio costumam exigir análise específica, que orientamos caso a caso.",
      },
    ],
  },

  "seguro-auto-campo-belo": {
    slug: "seguro-auto-campo-belo",
    bairro: "Campo Belo",
    regiao: "zona sul de São Paulo",
    title: "Seguro Auto no Campo Belo SP | Patro Seguros",
    metaDescription:
      "Seguro auto no Campo Belo, São Paulo: compare seguradoras com a Patro Seguros, corretora sediada em Guarulhos com atuação em toda a Grande São Paulo.",
    intro: [
      "O Campo Belo é um bairro residencial e comercial da zona sul, vizinho ao aeroporto de Congonhas, com vias movimentadas como a Avenida Vereador José Diniz e a Avenida Santo Amaro.",
      "Sediada em Guarulhos, a Patro Seguros atende clientes do Campo Belo e de outras regiões da Grande São Paulo, comparando alternativas de seguro auto entre suas seguradoras parceiras.",
    ],
    contexto: [
      "A vizinhança do aeroporto gera um fluxo constante de veículos em circulação, incluindo transporte por aplicativo, táxis e carros de passageiros a caminho de embarques.",
      "Para os moradores, isso significa trânsito mais intenso em determinados horários e maior chance de pequenas colisões em cruzamentos e conversões.",
      "O comércio de rua e os pequenos escritórios do bairro mantêm veículos leves em operação, perfil que costuma exigir declaração de uso comercial e coberturas de terceiros mais robustas.",
    ],
    fatores: [
      { title: "Fluxo de veículos do aeroporto", description: "Circulação intensa em horários de pico aumenta a exposição a colisões leves." },
      { title: "Uso em aplicativo", description: "Quem trabalha com transporte de passageiros precisa de apólice específica para essa atividade." },
      { title: "Pernoite em garagem ou rua", description: "O local onde o carro dorme é um dos principais fatores de cálculo." },
      { title: "Comércio e uso leve de carga", description: "Veículos usados em entregas do comércio local mudam a classificação de uso." },
    ],
    coberturas: [
      { title: "Danos a terceiros (RCF-V)", description: "Limites reforçados para região de trânsito denso e conversões frequentes." },
      { title: "Cobertura para motorista de aplicativo", description: "Necessária para quem transporta passageiros — a apólice comum não cobre essa atividade." },
      { title: "Assistência 24 horas", description: "Guincho, chaveiro e socorro mecânico na capital e em viagens." },
      { title: "Vidros, faróis e retrovisores", description: "Danos recorrentes em trânsito com muitas paradas e arrancadas." },
      { title: "Carro reserva", description: "Reduz o impacto do reparo para quem depende do veículo para trabalhar." },
    ],
    perfis: [
      "Moradores dos edifícios residenciais do bairro",
      "Motoristas de aplicativo que operam no entorno de Congonhas",
      "Comerciantes e prestadores de serviço da região",
      "Profissionais que viajam com frequência a trabalho",
    ],
    outrosSeguros: [
      { title: "Seguro para motorista de aplicativo", link: "/seguro-motorista-app" },
      { title: "Seguro residencial", link: "/seguro-residencial" },
      { title: "Seguro empresarial", link: "/seguro-empresarial" },
      { title: "Seguro viagem", link: "/seguro-viagem" },
    ],
    bairrosProximos: [
      { name: "Moema", link: linkAuto("seguro-auto-moema") },
      { name: "Brooklin", link: linkAuto("seguro-auto-brooklin") },
      { name: "Vila Nova Conceição", link: linkAuto("seguro-auto-vila-nova-conceicao") },
      { name: "Vila Mariana", link: linkAuto("seguro-auto-vila-mariana") },
    ],
    faqs: [
      {
        question: "Trabalho com aplicativo. Posso contratar seguro comum?",
        answer:
          "Não. A apólice particular não cobre transporte remunerado de passageiros. É preciso contratar produto específico ou cláusula que contemple a atividade.",
      },
      {
        question: "Moro perto de Congonhas. Isso muda o preço?",
        answer:
          "O CEP de pernoite influencia o cálculo em todas as seguradoras, com pesos diferentes entre elas. A comparação mostra qual companhia avalia melhor o seu endereço.",
      },
      {
        question: "A Patro tem escritório no Campo Belo?",
        answer:
          "Não. A sede fica em Guarulhos, na Cidade Maia, e o atendimento no Campo Belo é feito de forma digital e consultiva.",
      },
      {
        question: "Uso o carro para entregas da minha loja. Como declarar?",
        answer:
          "Basta informar na cotação que há uso comercial e qual a rotina. Nós ajustamos a classificação na proposta junto às seguradoras.",
      },
      {
        question: "Posso incluir cobertura para passageiros?",
        answer:
          "Sim. Existe cobertura de acidentes pessoais de passageiros, que pode ser contratada em conjunto com as demais garantias da apólice.",
      },
    ],
  },

  "seguro-auto-perdizes": {
    slug: "seguro-auto-perdizes",
    bairro: "Perdizes",
    regiao: "zona oeste de São Paulo",
    title: "Seguro Auto em Perdizes SP | Patro Seguros",
    metaDescription:
      "Seguro auto em Perdizes, São Paulo: compare coberturas e seguradoras com a Patro Seguros, corretora sediada em Guarulhos com atendimento na Grande SP.",
    intro: [
      "Perdizes é um bairro residencial da zona oeste com ruas em aclive, comércio de vizinhança, universidades e arena esportiva, com circulação concentrada em vias como a Avenida Pompeia e a Rua Cardoso de Almeida.",
      "A Patro Seguros, corretora com sede em Guarulhos, atende moradores e empresas de Perdizes e de outras regiões da Grande São Paulo com cotação comparada e acompanhamento no sinistro.",
    ],
    contexto: [
      "A topografia acidentada e as ruas estreitas do bairro favorecem manobras difíceis e estacionamento em ladeira, situação em que arranhões e danos de baixa gravidade são mais frequentes.",
      "Em dias de evento na arena esportiva, o trânsito e a ocupação das vagas em via pública mudam bastante — um detalhe prático que quem mora no entorno conhece bem.",
      "O perfil predominante é familiar e universitário, com veículos usados para trajetos curtos e compartilhados entre mais de um condutor da mesma casa.",
    ],
    fatores: [
      { title: "Estacionamento em via pública", description: "Vaga na rua, especialmente em ladeira, pesa mais na análise do que garagem fechada." },
      { title: "Vários condutores na residência", description: "Carro compartilhado entre pais e filhos exige declaração de condutores adicionais." },
      { title: "Dias de evento", description: "Maior circulação e ocupação de vagas aumentam a chance de pequenos danos." },
      { title: "Perfil de trajeto curto", description: "Rodagem baixa pode abrir espaço para produtos com precificação por uso." },
    ],
    coberturas: [
      { title: "Vidros, faróis e retrovisores", description: "A cobertura mais acionada por quem estaciona na rua com frequência." },
      { title: "Danos a terceiros (RCF-V)", description: "Proteção patrimonial em colisões e manobras em vias estreitas." },
      { title: "Assistência 24 horas", description: "Guincho e chaveiro, úteis em ruas de difícil acesso e aclive acentuado." },
      { title: "Carro reserva", description: "Mantém a rotina da família durante o reparo." },
      { title: "Roubo e furto", description: "Indenização conforme a referência contratada na apólice." },
    ],
    perfis: [
      "Famílias que compartilham o veículo entre dois ou mais condutores",
      "Estudantes universitários com carro próprio",
      "Moradores que estacionam em via pública",
      "Pequenos comércios e serviços do bairro",
    ],
    outrosSeguros: [
      { title: "Seguro residencial", link: "/seguro-residencial" },
      { title: "Seguro de vida", link: "/seguro-vida" },
      { title: "Plano de saúde", link: "/planos-de-saude" },
      { title: "Seguro empresarial", link: "/seguro-empresarial" },
    ],
    bairrosProximos: [
      { name: "Pinheiros", link: linkAuto("seguro-auto-pinheiros") },
      { name: "Jardim Paulista", link: linkAuto("seguro-auto-jardim-paulista") },
      { name: "Itaim Bibi", link: linkAuto("seguro-auto-itaim-bibi") },
      { name: "Vila Mariana", link: linkAuto("seguro-auto-vila-mariana") },
    ],
    faqs: [
      {
        question: "Estaciono na rua. Isso inviabiliza o seguro?",
        answer:
          "Não inviabiliza. Aumenta o peso do risco na análise, mas cada seguradora avalia de forma diferente — a comparação costuma revelar variações relevantes de preço.",
      },
      {
        question: "Somos três pessoas dirigindo o mesmo carro. Como declarar?",
        answer:
          "Indicamos o condutor principal (quem mais usa) e incluímos os demais como condutores adicionais, com idade e tempo de habilitação de cada um.",
      },
      {
        question: "A Patro atende Perdizes presencialmente?",
        answer:
          "O atendimento é digital. A sede fica em Guarulhos e pode receber visitas com agendamento, mas nada no processo exige deslocamento.",
      },
      {
        question: "Danos causados por queda de galho ou objeto têm cobertura?",
        answer:
          "Em apólices compreensivas, esse tipo de dano costuma estar contemplado. É um item que confirmamos nas condições gerais de cada proposta.",
      },
      {
        question: "Posso pagar o seguro parcelado?",
        answer:
          "Sim. As seguradoras oferecem parcelamento, com número de parcelas e condições que variam por companhia e por forma de pagamento.",
      },
    ],
  },
};

/** Slugs das páginas piloto de bairros da capital (sem barra inicial). */
export const bairroSpSlugs = Object.keys(bairrosSaoPauloAuto);

/** Rotas completas das páginas piloto (com barra inicial). */
export const bairroSpPaths = bairroSpSlugs.map((slug) => `/${slug}`);

/** Conteúdo do hub regional `/grande-sao-paulo`. */
export const GRANDE_SP_HUB = {
  path: GRANDE_SP_PATH,
  title: "Corretora de Seguros em Guarulhos e Grande São Paulo | Patro",
  h1: "Corretora de Seguros em Guarulhos e Grande São Paulo",
  metaDescription:
    "Patro Seguros: corretora sediada em Guarulhos, com atendimento a pessoas e empresas em toda a Grande São Paulo. Compare seguradoras com apoio consultivo.",
  subtitle:
    "Sede em Guarulhos, atendimento consultivo em toda a região metropolitana — e em outras regiões do Brasil quando o cliente precisa.",
  intro: [
    "A Patro Seguros nasceu em Guarulhos e continua com sede na cidade, no Edifício Via Alameda, na Cidade Maia. É de lá que atendemos pessoas, famílias e empresas da própria cidade, da capital e das demais cidades da Grande São Paulo.",
    "Não temos filiais. O que temos é um modelo de atendimento consultivo e digital que permite cotar, contratar e acompanhar apólices sem que ninguém precise atravessar a região metropolitana para resolver um seguro.",
  ],
  guarulhos: {
    title: "Guarulhos: nossa base",
    text: "Guarulhos é onde a Patro está fisicamente e onde construímos a maior parte da nossa carteira. Atendemos bairros como Cidade Maia, Vila Galvão, Macedo, Gopoúva, Cumbica e Bonsucesso, com páginas dedicadas a cada produto e região.",
    links: [
      { label: "Seguros em Guarulhos", href: "/seguros-guarulhos" },
      { label: "Seguro auto em Guarulhos", href: "/seguro-auto-guarulhos" },
      { label: "Seguro empresarial em Guarulhos", href: "/seguro-empresarial-guarulhos" },
      { label: "Plano de saúde em Guarulhos", href: "/plano-de-saude-guarulhos" },
    ],
  },
  capital: {
    title: "Cidade de São Paulo",
    text: "Na capital, o atendimento é digital e consultivo. Começamos com páginas de seguro auto para bairros onde já recebemos procura, sempre deixando claro que a sede da corretora fica em Guarulhos.",
  },
  metropolitana: {
    title: "Cidades da Região Metropolitana",
    text: "Também atendemos clientes em cidades vizinhas da Grande São Paulo. A cobertura da apólice é definida pela seguradora e vale em todo o território nacional; o que muda é quem cuida de você — e isso continua sendo a Patro.",
  },
  brasil: {
    title: "Outras regiões do Brasil",
    text: "Clientes que se mudam ou que têm operação fora de São Paulo seguem atendidos por nós à distância. Seguros com abrangência nacional, como vida, frota e agronegócio, já fazem parte da nossa rotina.",
  },
  produtos: [
    { title: "Seguro auto", text: "Comparação entre seguradoras para uso particular, profissional e aplicativo.", href: "/seguro-auto" },
    { title: "Seguro residencial", text: "Casa, apartamento e flat, com coberturas de incêndio, danos elétricos e responsabilidade civil.", href: "/seguro-residencial" },
    { title: "Seguro de vida", text: "Proteção familiar e planejamento sucessório, individual ou em grupo.", href: "/seguro-vida" },
    { title: "Seguro empresarial", text: "Patrimônio, responsabilidade civil e continuidade operacional para PMEs.", href: "/seguro-empresarial" },
    { title: "Seguro de frota", text: "Gestão de veículos de empresa em uma única apólice.", href: "/seguro-frota" },
    { title: "Planos de saúde", text: "Individual, familiar, MEI e empresarial, com comparação entre operadoras.", href: "/planos-de-saude" },
  ],
  faqs: [
    {
      question: "A Patro Seguros tem escritório na cidade de São Paulo?",
      answer:
        "Não. A sede é única e fica em Guarulhos, na Cidade Maia. O atendimento a clientes da capital e das demais cidades da Grande São Paulo é digital e consultivo.",
    },
    {
      question: "Preciso morar em Guarulhos para ser atendido?",
      answer:
        "Não. Atendemos clientes em Guarulhos, na capital, em cidades da região metropolitana e em outras regiões do Brasil, sempre à distância quando necessário.",
    },
    {
      question: "O seguro vale só na região onde eu moro?",
      answer:
        "Não. As apólices das seguradoras parceiras têm abrangência nacional, salvo cláusula específica. O endereço influencia o preço, não o território de cobertura.",
    },
    {
      question: "Como funciona o atendimento em caso de sinistro fora de Guarulhos?",
      answer:
        "Você aciona a Patro por WhatsApp ou telefone de onde estiver. Orientamos sobre documentos e prazos e acompanhamos o processo junto à seguradora até a conclusão.",
    },
    {
      question: "Posso ir até a sede da corretora?",
      answer:
        "Pode, com hora marcada. O endereço é Av. Salgado Filho, 2120 — Sala 219, Edifício Via Alameda, Cidade Maia, Guarulhos/SP.",
    },
    {
      question: "A Patro atende empresas fora de Guarulhos?",
      answer:
        "Sim. Atendemos empresas na capital e na região metropolitana em seguros patrimoniais, de responsabilidade civil, frota e planos de saúde empresariais.",
    },
  ],
} as const;
