/**
 * Cluster local Grupo A — bairros da capital com páginas de produto próprias.
 * ---------------------------------------------------------------------------
 * REGRAS (idênticas às de segurosSaoPauloRegional.ts):
 *  1. Sede única em Guarulhos. Nenhuma página sugere filial ou endereço na capital.
 *  2. Nenhum dado inventado: preços, sinistralidade, número de imóveis/empresas,
 *     renda, índices de roubo ou incêndio, avaliações ou rankings.
 *  3. Conteúdo original por bairro e por produto. É proibido clonar a página de
 *     Seguro Auto trocando o produto, ou clonar Residencial para Empresarial.
 */

export type PerfilBairro = "residencial" | "corporativo" | "misto";

export interface BairroSpFaqItem {
  question: string;
  answer: string;
}

export interface BairroGrupoA {
  /** Chave/slug do bairro (ex.: "moema") — também é a URL do hub: /moema */
  key: string;
  nome: string;
  regiao: string;
  perfil: PerfilBairro;
  autoSlug: string;
  /** Frase de posicionamento variada, específica desta página de hub. */
  posicionamento: string;
  /** Contexto do hub (2 parágrafos). */
  hubIntro: string[];
  /** Bairros vizinhos do cluster (interlinking). */
  vizinhos: string[];
}

export interface ResidencialBairroConfig {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string[];
  contexto: string[];
  apartamento: string[];
  casa: string[];
  proprietarioInquilino: string[];
  /** Pontos de atenção para escolher a cobertura, adaptados ao bairro. */
  escolha: { title: string; description: string }[];
  faqs: BairroSpFaqItem[];
}

export interface EmpresarialBairroConfig {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string[];
  contexto: string[];
  /** Quem pode contratar — perfis coerentes com o bairro. */
  quemContrata: string[];
  /** Riscos com leitura local. */
  riscos: { title: string; description: string }[];
  /** Segmentos com necessidades específicas na região. */
  segmentos: { title: string; description: string }[];
  pme: string[];
  faqs: BairroSpFaqItem[];
}

/* ------------------------------------------------------------------ */
/* Blocos comuns — usados como apoio, nunca como corpo principal.      */
/* ------------------------------------------------------------------ */

export const RESIDENCIAL_COBERTURAS: { title: string; description: string }[] = [
  { title: "Incêndio, raio e explosão", description: "É a cobertura básica da maioria das apólices residenciais e costuma ser a referência para o cálculo das demais garantias." },
  { title: "Danos elétricos", description: "Cobre equipamentos e instalações atingidos por variação de tensão ou curto-circuito, conforme limite contratado." },
  { title: "Vendaval, granizo e impacto de veículos", description: "Protege a estrutura e os bens contra eventos climáticos e impactos externos, dentro das condições da apólice." },
  { title: "Roubo e furto qualificado de bens", description: "Cobre bens do interior do imóvel quando há vestígios de arrombamento ou grave ameaça. Furto simples geralmente fica de fora." },
  { title: "Responsabilidade civil familiar", description: "Atende danos involuntários causados a terceiros por moradores ou animais de estimação, como um vazamento que atinge o vizinho." },
  { title: "Quebra de vidros, espelhos e mármores", description: "Cobertura opcional bastante contratada em imóveis com sacadas envidraçadas e bancadas de pedra." },
  { title: "Perda ou pagamento de aluguel", description: "Garante o custo de moradia temporária ou o aluguel enquanto o imóvel sinistrado estiver inabitável, conforme o plano." },
];

export const RESIDENCIAL_ASSISTENCIA: string[] = [
  "Chaveiro em caso de perda de chave, arrombamento ou trava danificada.",
  "Eletricista para pane no quadro de energia, curto-circuito ou falta de energia interna.",
  "Encanador para vazamentos, entupimentos e reparos emergenciais na hidráulica.",
  "Vidraceiro para reposição emergencial de vidros externos.",
  "Serviços emergenciais complementares, como cobertura provisória de telhado e reparos simples.",
];

export const RESIDENCIAL_PASSOS: { title: string; description: string }[] = [
  { title: "1. Você conta como é o imóvel", description: "Tipo (casa ou apartamento), metragem aproximada, se é próprio ou alugado, se fica vazio durante o dia e o CEP." },
  { title: "2. Identificamos o que precisa ser protegido", description: "Estrutura, conteúdo, equipamentos, bicicletas, obras de arte e responsabilidade civil entram na conversa antes da cotação." },
  { title: "3. Comparamos as seguradoras parceiras", description: "A cotação sai com o mesmo padrão de cobertura em várias companhias, para a comparação ser honesta." },
  { title: "4. Apresentamos as opções e você decide", description: "Você recebe as alternativas comentadas, com limites, franquias e assistências explicadas. A contratação é sua decisão." },
];

export const EMPRESARIAL_COBERTURAS: { title: string; description: string }[] = [
  { title: "Incêndio, raio e explosão", description: "Cobertura básica da apólice empresarial, que serve de referência para o dimensionamento das demais garantias." },
  { title: "Danos elétricos", description: "Atende equipamentos, quadros e instalações afetados por oscilação de tensão — relevante para operações dependentes de TI." },
  { title: "Roubo e furto qualificado", description: "Cobre mercadorias, equipamentos e valores conforme os limites e as condições contratadas." },
  { title: "Equipamentos eletrônicos", description: "Garantia específica para computadores, servidores, equipamentos médicos ou de produção, geralmente contratada à parte." },
  { title: "Responsabilidade civil operações", description: "Danos involuntários causados a clientes, visitantes ou vizinhos durante a atividade da empresa." },
  { title: "Lucros cessantes / despesas fixas", description: "Ajuda a manter compromissos como aluguel e folha quando a operação para em razão de um sinistro coberto." },
  { title: "Vendaval, impacto de veículos e danos a vidros", description: "Muito procurada por operações com fachada de vidro e atendimento na rua." },
  { title: "Assistência empresarial 24 horas", description: "Chaveiro, eletricista, encanador, vigilância provisória e reparos emergenciais, conforme o plano." },
];

export const EMPRESARIAL_PASSOS: { title: string; description: string }[] = [
  { title: "1. Entendemos a atividade", description: "CNAE, o que a empresa faz na prática, horário de funcionamento e se o imóvel é próprio ou alugado." },
  { title: "2. Mapeamos as exposições", description: "Estoque, equipamentos, atendimento ao público, dependência de energia e de sistemas, contratos com terceiros." },
  { title: "3. Levantamos os valores em risco", description: "Conteúdo, benfeitorias, equipamentos e o impacto financeiro de uma parada de atividade." },
  { title: "4. Comparamos e apresentamos as opções", description: "Cotamos com as seguradoras parceiras e explicamos o que muda em limites, franquias e exclusões antes de você contratar." },
];

export const PERSONALIZAR_APOLICE: string[] = [
  "Duas empresas do mesmo bairro podem ter riscos completamente diferentes: um escritório de consultoria e um restaurante compartilham o CEP, mas não a exposição.",
  "Limites mal dimensionados são o erro mais comum. Segurar o conteúdo por um valor abaixo do real pode reduzir a indenização proporcionalmente.",
  "A atividade define quais coberturas fazem sentido: equipamentos eletrônicos para quem depende de TI, responsabilidade civil para quem recebe público, lucros cessantes para quem não pode parar.",
  "Franquias e critérios de aceitação variam de uma seguradora para outra — por isso a comparação precisa ser feita com o mesmo padrão de cobertura.",
];

/* ------------------------------------------------------------------ */
/* Bairros Grupo A                                                      */
/* ------------------------------------------------------------------ */

export const bairrosGrupoA: Record<string, BairroGrupoA> = {
  "itaim-bibi": {
    key: "itaim-bibi",
    nome: "Itaim Bibi",
    regiao: "zona oeste de São Paulo",
    perfil: "corporativo",
    autoSlug: "seguro-auto-itaim-bibi",
    posicionamento:
      "A Patro Seguros é uma corretora sediada em Guarulhos que atende pessoas e empresas do Itaim Bibi de forma digital e consultiva.",
    hubIntro: [
      "O Itaim Bibi combina torres corporativas ao longo da Faria Lima e da JK com quadras residenciais verticalizadas, restaurantes e serviços que funcionam durante o dia inteiro.",
      "Reunimos nesta página os seguros que mais fazem sentido para quem mora, trabalha ou mantém um negócio no bairro: auto, residencial e empresarial.",
    ],
    vizinhos: ["vila-olimpia", "pinheiros", "jardim-paulista", "vila-nova-conceicao"],
  },
  moema: {
    key: "moema",
    nome: "Moema",
    regiao: "zona sul de São Paulo",
    perfil: "misto",
    autoSlug: "seguro-auto-moema",
    posicionamento:
      "Sediada em Guarulhos, a Patro Seguros atende moradores e empresas de Moema com cotação comparada entre seguradoras parceiras.",
    hubIntro: [
      "Moema é um bairro de forte vocação residencial, com prédios de médio e alto padrão, comércio de rua ativo e proximidade do Ibirapuera e de Congonhas.",
      "Esta página reúne os produtos que trabalhamos para a região: proteção do carro, do imóvel e do negócio.",
    ],
    vizinhos: ["campo-belo", "vila-nova-conceicao", "brooklin", "vila-mariana"],
  },
  "vila-nova-conceicao": {
    key: "vila-nova-conceicao",
    nome: "Vila Nova Conceição",
    regiao: "zona sul de São Paulo",
    perfil: "residencial",
    autoSlug: "seguro-auto-vila-nova-conceicao",
    posicionamento:
      "A Patro Seguros tem sede em Guarulhos e atende clientes da Vila Nova Conceição à distância, com consultor responsável pelo caso.",
    hubIntro: [
      "A Vila Nova Conceição é um bairro pequeno e predominantemente residencial, com edifícios de alto padrão, casas remanescentes e ruas arborizadas ao lado do Ibirapuera.",
      "Aqui você encontra os seguros que atendem o perfil do bairro: residencial, auto e empresarial para os escritórios e serviços locais.",
    ],
    vizinhos: ["moema", "jardim-paulista", "itaim-bibi", "campo-belo"],
  },
  "jardim-paulista": {
    key: "jardim-paulista",
    nome: "Jardim Paulista",
    regiao: "zona oeste de São Paulo",
    perfil: "misto",
    autoSlug: "seguro-auto-jardim-paulista",
    posicionamento:
      "Corretora com sede em Guarulhos, a Patro Seguros atende moradores, consultórios e escritórios do Jardim Paulista.",
    hubIntro: [
      "O Jardim Paulista mistura edifícios residenciais tradicionais, consultórios, clínicas e escritórios em torno da Avenida Paulista, da Oscar Freire e da Rua Augusta.",
      "Esta página organiza os seguros disponíveis para o bairro, do carro ao imóvel e ao negócio.",
    ],
    vizinhos: ["pinheiros", "itaim-bibi", "vila-mariana", "vila-nova-conceicao"],
  },
  "vila-olimpia": {
    key: "vila-olimpia",
    nome: "Vila Olímpia",
    regiao: "zona sul de São Paulo",
    perfil: "corporativo",
    autoSlug: "seguro-auto-vila-olimpia",
    posicionamento:
      "A Patro Seguros atua a partir de Guarulhos e atende empresas e moradores da Vila Olímpia sem exigir deslocamento.",
    hubIntro: [
      "A Vila Olímpia concentra edifícios corporativos, coworkings, agências e empresas de tecnologia, com uma camada residencial vertical que cresceu junto com o polo de escritórios.",
      "Reunimos nesta página as proteções mais procuradas no bairro: empresarial, auto e residencial.",
    ],
    vizinhos: ["itaim-bibi", "brooklin", "moema", "campo-belo"],
  },
  pinheiros: {
    key: "pinheiros",
    nome: "Pinheiros",
    regiao: "zona oeste de São Paulo",
    perfil: "misto",
    autoSlug: "seguro-auto-pinheiros",
    posicionamento:
      "A Patro Seguros é uma corretora de Guarulhos que atende clientes de Pinheiros por WhatsApp, telefone e reuniões on-line.",
    hubIntro: [
      "Pinheiros junta casas antigas convertidas em comércio, prédios novos, bares, estúdios criativos e empresas de tecnologia em quadras de uso muito misto.",
      "Esta página reúne os seguros que trabalhamos para moradores e negócios do bairro.",
    ],
    vizinhos: ["itaim-bibi", "jardim-paulista", "perdizes", "vila-olimpia"],
  },
  brooklin: {
    key: "brooklin",
    nome: "Brooklin",
    regiao: "zona sul de São Paulo",
    perfil: "misto",
    autoSlug: "seguro-auto-brooklin",
    posicionamento:
      "Com sede em Guarulhos, a Patro Seguros atende o Brooklin de forma remota, do orçamento à abertura de sinistro.",
    hubIntro: [
      "O Brooklin tem duas faces bem distintas: o eixo corporativo da Berrini e das Nações Unidas e a parte antiga, com casas, ruas tranquilas e comércio de bairro.",
      "Aqui estão os seguros disponíveis para as duas realidades do bairro.",
    ],
    vizinhos: ["vila-olimpia", "campo-belo", "moema", "itaim-bibi"],
  },
  "vila-mariana": {
    key: "vila-mariana",
    nome: "Vila Mariana",
    regiao: "zona sul de São Paulo",
    perfil: "residencial",
    autoSlug: "seguro-auto-vila-mariana",
    posicionamento:
      "A Patro Seguros é sediada em Guarulhos e atende famílias e negócios da Vila Mariana com atendimento digital.",
    hubIntro: [
      "A Vila Mariana é um bairro residencial consolidado, servido por metrô, com universidades, hospitais, consultórios e comércio de rua distribuídos entre os prédios.",
      "Esta página reúne os seguros que fazem sentido para o perfil do bairro.",
    ],
    vizinhos: ["moema", "jardim-paulista", "campo-belo", "perdizes"],
  },
  "campo-belo": {
    key: "campo-belo",
    nome: "Campo Belo",
    regiao: "zona sul de São Paulo",
    perfil: "residencial",
    autoSlug: "seguro-auto-campo-belo",
    posicionamento:
      "A Patro Seguros mantém sede em Guarulhos e atende clientes do Campo Belo à distância, com um consultor responsável.",
    hubIntro: [
      "O Campo Belo é um bairro residencial vizinho a Congonhas, com prédios de gabarito controlado pela proximidade do aeroporto, casas em ruas internas e comércio local.",
      "Reunimos nesta página os seguros disponíveis para moradores e negócios da região.",
    ],
    vizinhos: ["moema", "brooklin", "vila-nova-conceicao", "vila-olimpia"],
  },
  perdizes: {
    key: "perdizes",
    nome: "Perdizes",
    regiao: "zona oeste de São Paulo",
    perfil: "residencial",
    autoSlug: "seguro-auto-perdizes",
    posicionamento:
      "Sediada em Guarulhos, a Patro Seguros atende moradores e pequenos negócios de Perdizes de forma consultiva e remota.",
    hubIntro: [
      "Perdizes é um bairro residencial de ruas em aclive, com casas antigas, edifícios familiares, universidades e um comércio de vizinhança bastante ativo.",
      "Esta página organiza os seguros que trabalhamos para o bairro.",
    ],
    vizinhos: ["pinheiros", "jardim-paulista", "vila-mariana", "itaim-bibi"],
  },
};

export const bairroGrupoAKeys = Object.keys(bairrosGrupoA);
export const bairroGrupoAHubPaths = bairroGrupoAKeys.map((k) => `/${k}`);

/* ------------------------------------------------------------------ */
/* Seguro Residencial por bairro                                        */
/* ------------------------------------------------------------------ */

export const residencialBairrosSp: Record<string, ResidencialBairroConfig> = {
  "itaim-bibi": {
    slug: "seguro-residencial-itaim-bibi",
    title: "Seguro Residencial no Itaim Bibi SP | Patro Seguros",
    metaDescription:
      "Seguro residencial no Itaim Bibi: proteja apartamento ou casa contra incêndio, danos elétricos e roubo. Cotação comparada com a Patro Seguros, corretora de Guarulhos.",
    intro: [
      "Morar no Itaim Bibi quase sempre significa morar em apartamento, muitas vezes em torres residenciais espremidas entre edifícios de escritórios, com sacada envidraçada, home office montado dentro de casa e imóvel vazio boa parte do dia útil.",
      "A Patro Seguros é sediada em Guarulhos e atende moradores do Itaim Bibi de forma remota, comparando alternativas de seguro residencial entre as seguradoras parceiras.",
    ],
    contexto: [
      "O perfil de uso do imóvel no bairro tem uma característica clara: apartamento fechado durante o dia, com equipamentos de trabalho dentro. Notebook, monitores, câmeras e instrumentos de trabalho costumam valer mais do que os móveis, e nem sempre entram na conta na hora de definir o valor do conteúdo.",
      "Outra situação frequente é o imóvel usado por profissionais que viajam com frequência. Ausência prolongada é um dado que algumas seguradoras consideram e que precisa ser informado corretamente na proposta.",
      "Como boa parte dos prédios é nova e verticalizada, os sinistros mais comuns tendem a ser de infiltração, vazamento que atinge o apartamento de baixo e dano elétrico — casos em que a responsabilidade civil familiar costuma pesar mais do que a cobertura de incêndio.",
    ],
    apartamento: [
      "A apólice do condomínio cobre as áreas comuns e a estrutura do prédio; ela não cobre o que está dentro da sua unidade. Móveis, eletrodomésticos, equipamentos de trabalho e benfeitorias que você fez (armários planejados, revestimentos, automação) só entram se estiverem no seu seguro.",
      "Em apartamentos com sacada envidraçada e bancadas de pedra, a cobertura de quebra de vidros e mármores costuma ser contratada como adicional — vale checar se está incluída antes de assinar.",
    ],
    casa: [
      "O Itaim ainda tem casas em ruas internas, muitas convertidas em uso misto ou mantidas como residência familiar. Nesses imóveis, a estrutura precisa ser segurada, e não só o conteúdo, e coberturas como vendaval, impacto de veículos e danos ao muro entram na conversa.",
      "Casas com área externa, piscina ou dependência de funcionários também mudam a análise de responsabilidade civil, porque aumentam a chance de um acidente envolvendo terceiros dentro do imóvel.",
    ],
    proprietarioInquilino: [
      "Quem é proprietário costuma precisar de cobertura para a estrutura (imóvel) e para o conteúdo. Quem aluga geralmente contrata apenas o conteúdo e a responsabilidade civil, já que a estrutura é de responsabilidade do dono.",
      "Contratos de locação no bairro costumam exigir seguro incêndio. Ele é obrigatório em muitos contratos e não substitui o seguro residencial completo: protege basicamente o imóvel contra fogo, não os seus bens.",
    ],
    escolha: [
      { title: "Valor do conteúdo", description: "Some móveis, eletrodomésticos e equipamentos de trabalho. Declarar abaixo do real pode reduzir a indenização." },
      { title: "Equipamentos de home office", description: "Notebooks e monitores usados profissionalmente nem sempre entram na cobertura padrão de conteúdo. Pergunte antes." },
      { title: "Responsabilidade civil familiar", description: "Em prédio, um vazamento que atinge o vizinho é o sinistro mais provável. Vale limite folgado." },
      { title: "Franquia e assistência", description: "Compare a franquia de danos elétricos e o número de acionamentos de assistência incluídos por ano." },
    ],
    faqs: [
      { question: "O seguro do condomínio já protege meu apartamento no Itaim Bibi?", answer: "Não. A apólice do condomínio cobre áreas comuns e a estrutura do edifício. Os bens dentro da sua unidade e as benfeitorias que você fez só estão protegidos se você tiver um seguro residencial próprio." },
      { question: "Trabalho em home office. Meus equipamentos estão cobertos?", answer: "Depende do plano. Equipamentos usados profissionalmente às vezes exigem declaração específica ou cobertura adicional de equipamentos eletrônicos. Informe o uso na cotação para evitar recusa em um sinistro." },
      { question: "Preciso de seguro residencial se já tenho o seguro incêndio da locação?", answer: "São coisas diferentes. O seguro incêndio exigido em contrato protege basicamente o imóvel contra fogo, em favor do proprietário. O seguro residencial protege seus bens, sua responsabilidade civil e dá acesso à assistência 24 horas." },
      { question: "A Patro Seguros tem escritório no Itaim Bibi?", answer: "Não. A sede fica em Guarulhos, na Cidade Maia. O atendimento a clientes do Itaim Bibi é feito por WhatsApp, telefone, e-mail e reuniões on-line, incluindo cotação, emissão e sinistro." },
      { question: "Viajo muito e o apartamento fica fechado. Isso muda algo?", answer: "Pode mudar. Algumas seguradoras têm critérios específicos para imóveis desocupados por longos períodos. É melhor declarar essa situação na proposta do que descobrir uma restrição na hora do sinistro." },
      { question: "Como faço a cotação de seguro residencial em corretora para o Itaim Bibi?", answer: "Você envia o tipo de imóvel, a metragem aproximada, o CEP e uma ideia do que precisa ser protegido. A Patro cota com as seguradoras parceiras e devolve as opções comentadas, com limites e franquias explicados." },
    ],
  },

  moema: {
    slug: "seguro-residencial-moema",
    title: "Seguro Residencial em Moema SP | Patro Seguros",
    metaDescription:
      "Seguro residencial em Moema: cobertura para apartamento ou casa, danos elétricos, roubo e responsabilidade civil. Cotação comparada com a Patro Seguros.",
    intro: [
      "Moema é um bairro em que a casa realmente é o centro da rotina: famílias estabelecidas, apartamentos amplos, casas em ruas internas e uma população que circula a pé pelo comércio local e pelo Ibirapuera.",
      "A Patro Seguros atende moradores de Moema a partir da sede em Guarulhos, comparando coberturas de seguro residencial entre as seguradoras parceiras antes de qualquer contratação.",
    ],
    contexto: [
      "A convivência entre prédios antigos e lançamentos recentes muda bastante a conversa sobre cobertura. Em edifícios com instalação elétrica mais antiga, dano elétrico deixa de ser detalhe e passa a ser uma das coberturas centrais da apólice.",
      "Moema também tem muitas famílias com filhos, animais de estimação e empregados domésticos em casa — três fatores que aumentam a chance de um acidente doméstico envolvendo terceiros e tornam a responsabilidade civil familiar mais relevante.",
      "Nas ruas de casas, é comum encontrar imóveis reformados ao longo de décadas, com benfeitorias que valem muito e que raramente aparecem na conta quando o morador estima o valor do conteúdo por conta própria.",
    ],
    apartamento: [
      "Em prédio, o que costuma faltar na apólice é a cobertura das benfeitorias: armários planejados, piso, revestimento e automação instalados pelo morador. Eles pertencem à unidade e precisam estar declarados.",
      "Para quem mora em andar alto, vale checar a cobertura de vendaval e de quebra de vidros das sacadas, além do limite para danos causados ao apartamento de baixo por vazamento.",
    ],
    casa: [
      "As casas de Moema em geral têm quintal, área de serviço externa e garagem coberta. A estrutura precisa ser segurada com valor de reconstrução, não com valor de mercado do imóvel — são números bem diferentes.",
      "Portões automáticos, câmeras e sistemas de alarme entram como equipamentos e podem ser protegidos por dano elétrico, uma perda comum em dias de tempestade.",
    ],
    proprietarioInquilino: [
      "O proprietário que mora no imóvel normalmente contrata estrutura e conteúdo na mesma apólice. Quem alugou precisa, no mínimo, de conteúdo e responsabilidade civil.",
      "Já o proprietário que alugou o imóvel para terceiros tem outra necessidade: garantir a estrutura e, quando disponível, a cobertura de perda de aluguel enquanto o imóvel estiver inabitável após um sinistro coberto.",
    ],
    escolha: [
      { title: "Idade da instalação elétrica", description: "Prédios e casas mais antigos justificam limite maior em danos elétricos." },
      { title: "Benfeitorias e reformas", description: "Armários, revestimentos e automação feitos por você entram no valor do conteúdo." },
      { title: "Família, pets e funcionários", description: "Elevam a exposição a acidentes com terceiros e pedem responsabilidade civil dimensionada." },
      { title: "Assistência 24 horas", description: "Compare o número de acionamentos anuais de chaveiro, encanador e eletricista antes de decidir pelo preço." },
    ],
    faqs: [
      { question: "Vale a pena seguro residencial para apartamento em Moema?", answer: "Faz sentido quando o valor dos bens e das benfeitorias dentro da unidade é relevante — e normalmente é. O seguro do condomínio não cobre o interior do apartamento nem a sua responsabilidade por danos ao vizinho." },
      { question: "Meu prédio é antigo. Isso afeta a cobertura de danos elétricos?", answer: "Afeta a importância dela. Em instalações mais antigas, oscilações e curtos são mais prováveis, então vale contratar limite maior e conferir a franquia dessa cobertura específica." },
      { question: "Seguro casa em Moema cobre o muro e o portão?", answer: "Depende das garantias contratadas. Muros, portões e benfeitorias externas costumam estar dentro da cobertura de estrutura, e o portão automático pode ser atendido também por danos elétricos. Precisa estar declarado." },
      { question: "A Patro Seguros atende Moema presencialmente?", answer: "A sede da Patro fica em Guarulhos, na Cidade Maia. Em Moema, o atendimento é digital: cotação, documentos, emissão e sinistro são resolvidos por WhatsApp, telefone, e-mail ou reunião on-line." },
      { question: "O seguro cobre furto do meu apartamento?", answer: "A cobertura padrão é de roubo e furto qualificado, ou seja, quando há arrombamento, escalada ou grave ameaça. Furto simples, sem vestígio, geralmente não é coberto — vale ler essa cláusula com atenção." },
      { question: "Como a corretora de seguro residencial em Moema monta a cotação?", answer: "Levantamos tipo de imóvel, metragem, se é próprio ou alugado, valor aproximado do conteúdo e coberturas desejadas. Depois cotamos com as seguradoras parceiras e apresentamos as opções lado a lado." },
    ],
  },

  "vila-nova-conceicao": {
    slug: "seguro-residencial-vila-nova-conceicao",
    title: "Seguro Residencial na Vila Nova Conceição SP | Patro Seguros",
    metaDescription:
      "Seguro residencial na Vila Nova Conceição: proteção para apartamentos e casas de alto padrão, bens de valor e responsabilidade civil. Cotação com a Patro Seguros.",
    intro: [
      "A Vila Nova Conceição é um bairro pequeno, quase exclusivamente residencial, com edifícios de alto padrão, casas preservadas em ruas internas e uma rotina doméstica bastante estável.",
      "A Patro Seguros, corretora sediada em Guarulhos, atende moradores da Vila Nova Conceição de forma remota e consultiva, comparando alternativas antes de indicar qualquer apólice.",
    ],
    contexto: [
      "O ponto que mais diferencia o bairro na hora de montar um seguro residencial é o valor do conteúdo. Obras de arte, tapetes, coleções, adega, joias e equipamentos de áudio e vídeo raramente cabem no limite padrão de conteúdo e costumam exigir cobertura específica ou declaração item a item.",
      "Muitos imóveis têm funcionários domésticos com jornada regular. Isso muda a análise de responsabilidade civil e faz diferença em situações de acidente dentro do imóvel.",
      "Nos edifícios do bairro, obras de reforma de unidades são frequentes. Reforma em andamento é uma informação que a seguradora precisa ter, porque altera o risco durante o período da obra.",
    ],
    apartamento: [
      "Nos apartamentos de maior metragem, o valor das benfeitorias — marcenaria, revestimentos, automação, iluminação — costuma superar o dos móveis. Segurar apenas o conteúdo comum deixa uma parte grande do patrimônio descoberta.",
      "Vale também verificar a cobertura para bens de valor declarado: muitas apólices limitam a indenização de joias e obras de arte a um percentual pequeno do conteúdo, salvo se houver garantia específica.",
    ],
    casa: [
      "Nas casas do bairro, a estrutura precisa ser segurada pelo custo de reconstrução, considerando acabamento e projeto — não pelo preço de venda do imóvel, que embute o valor do terreno.",
      "Áreas externas, piscina, jardim e casa de apoio ampliam a exposição a acidentes com terceiros e devem ser consideradas no limite de responsabilidade civil familiar.",
    ],
    proprietarioInquilino: [
      "A maior parte dos moradores é proprietária e contrata estrutura mais conteúdo. Nesse caso, o cuidado principal está no dimensionamento dos limites, não na quantidade de coberturas.",
      "Quem aluga um imóvel de alto padrão precisa observar dois pontos: o seguro incêndio exigido no contrato, que protege o proprietário, e um seguro de conteúdo próprio, que protege seus bens e sua responsabilidade civil.",
    ],
    escolha: [
      { title: "Bens de valor declarado", description: "Joias, arte e coleções costumam ter limite reduzido na cobertura padrão. Peça a garantia específica." },
      { title: "Custo de reconstrução", description: "Em casas, o valor a segurar é o de reconstruir com o mesmo padrão, não o valor de venda." },
      { title: "Reformas em andamento", description: "Obra na unidade altera o risco e precisa ser comunicada à seguradora." },
      { title: "Responsabilidade civil ampliada", description: "Funcionários domésticos, pets e área externa justificam limite acima do básico." },
    ],
    faqs: [
      { question: "Obras de arte e joias entram no seguro residencial?", answer: "Entram, mas quase sempre com limite reduzido dentro da cobertura de conteúdo. Para proteção real, é preciso contratar garantia específica de bens de valor, geralmente com relação de itens e comprovação." },
      { question: "Como definir o valor a segurar de uma casa na Vila Nova Conceição?", answer: "Use o custo de reconstrução com o mesmo padrão de acabamento, sem incluir o terreno. Segurar pelo valor de venda infla o prêmio; segurar abaixo do custo pode reduzir a indenização." },
      { question: "Estou reformando meu apartamento. Preciso avisar a seguradora?", answer: "Sim. Reforma altera o risco durante o período da obra e a maioria das apólices exige comunicação. Deixar de informar pode gerar discussão em um sinistro ocorrido nesse intervalo." },
      { question: "A Patro Seguros tem unidade na Vila Nova Conceição?", answer: "Não. A corretora é sediada em Guarulhos e atende o bairro à distância, com consultor responsável pelo caso do início da cotação até um eventual sinistro." },
      { question: "Tenho funcionários domésticos. O seguro cobre acidentes com eles?", answer: "A responsabilidade civil familiar pode atender danos involuntários causados a terceiros, mas há condições e exclusões específicas por apólice. Esse é um ponto que precisa ser conferido cláusula a cláusula na cotação." },
      { question: "Vale contratar seguro para imóvel alugado no bairro?", answer: "Vale. O seguro incêndio do contrato protege o proprietário. Seus móveis, equipamentos e sua responsabilidade por um vazamento que atinja o vizinho só estão cobertos se você tiver apólice própria de conteúdo." },
    ],
  },

  "jardim-paulista": {
    slug: "seguro-residencial-jardim-paulista",
    title: "Seguro Residencial no Jardim Paulista SP | Patro Seguros",
    metaDescription:
      "Seguro residencial no Jardim Paulista: cobertura para apartamentos antigos e novos, danos elétricos, roubo e responsabilidade civil. Cotação com a Patro Seguros.",
    intro: [
      "O Jardim Paulista tem uma das maiores concentrações de edifícios residenciais antigos e bem conservados de São Paulo, muitos com plantas amplas, e convive com prédios recentes e uso misto perto da Paulista.",
      "A Patro Seguros é uma corretora com sede em Guarulhos que atende moradores do Jardim Paulista de forma digital, comparando coberturas entre as seguradoras parceiras.",
    ],
    contexto: [
      "A idade dos edifícios é o fator que mais influencia a montagem da apólice no bairro. Prédios com décadas de uso tendem a apresentar problemas hidráulicos e elétricos, e infiltração entre unidades é um dos sinistros mais recorrentes em imóveis assim.",
      "Também é comum encontrar apartamentos que funcionam parcialmente como consultório ou escritório. Esse uso misto precisa ser declarado, porque a apólice residencial pura pode não cobrir equipamentos e responsabilidade ligados à atividade profissional.",
      "Nas quadras mais próximas da Paulista e da Augusta, o fluxo intenso de pessoas na rua torna a cobertura de roubo e furto qualificado uma preocupação frequente dos moradores.",
    ],
    apartamento: [
      "Em prédios antigos, vale verificar se a apólice cobre danos causados por vazamento a outras unidades e se há limite adequado para os reparos na sua própria unidade.",
      "Muitos moradores reformaram integralmente o apartamento ao longo dos anos. Essas benfeitorias pertencem à unidade e devem ser incluídas no valor segurado, senão ficam de fora da indenização.",
    ],
    casa: [
      "As casas remanescentes do Jardim Paulista costumam ser imóveis antigos, às vezes tombados ou com restrições de reforma. Isso influencia o custo de reconstrução e precisa ser conversado com a seguradora antes da contratação.",
      "Imóveis com uso parcialmente comercial na rua exigem atenção: nesse caso, a proteção adequada pode ser uma combinação de residencial e empresarial, e não apenas uma apólice residencial.",
    ],
    proprietarioInquilino: [
      "Proprietário residente contrata estrutura e conteúdo. Inquilino, na prática, precisa de conteúdo e responsabilidade civil — a estrutura segue sendo obrigação do dono.",
      "Nos apartamentos alugados por temporada ou para profissionais em trânsito, o uso do imóvel muda e deve ser informado na proposta; locação de curta duração tem tratamento diferente em várias seguradoras.",
    ],
    escolha: [
      { title: "Idade do prédio", description: "Instalações antigas justificam limite maior em danos elétricos e em vazamentos." },
      { title: "Uso misto residencial e profissional", description: "Consultório ou escritório dentro de casa precisa ser declarado para não gerar recusa." },
      { title: "Benfeitorias acumuladas", description: "Reformas feitas ao longo dos anos integram o valor a segurar." },
      { title: "Roubo e furto qualificado", description: "Confira a diferença entre furto simples e qualificado nas condições da apólice." },
    ],
    faqs: [
      { question: "Moro em um prédio antigo. O seguro cobre infiltração?", answer: "Depende da origem. Vazamentos súbitos em tubulação costumam ser atendidos; infiltração por desgaste, falta de manutenção ou problema em área comum geralmente é exclusão. Vale ler essa cláusula com atenção na cotação." },
      { question: "Uso parte do apartamento como consultório. Posso contratar seguro residencial?", answer: "Você deve declarar o uso. Em muitos casos a solução é uma apólice residencial com adicional para a atividade, ou uma combinação com seguro empresarial, dependendo dos equipamentos e do atendimento a pacientes." },
      { question: "Seguro apartamento no Jardim Paulista cobre danos ao vizinho?", answer: "Sim, quando há cobertura de responsabilidade civil familiar. É ela que atende danos involuntários causados a terceiros, como um vazamento que atinge o apartamento de baixo, dentro do limite contratado." },
      { question: "A Patro tem escritório no Jardim Paulista?", answer: "Não. A sede é em Guarulhos, na Cidade Maia, e o atendimento no bairro é remoto: cotação, envio de documentos, emissão da apólice e acompanhamento de sinistro por canais digitais." },
      { question: "Aluguei meu apartamento. Que seguro devo manter?", answer: "Como proprietário, faz sentido garantir a estrutura e, quando disponível no plano, a cobertura de perda de aluguel. O conteúdo do inquilino é responsabilidade dele, em apólice própria." },
      { question: "Quanto tempo leva para receber a comparação?", answer: "Depois que recebemos os dados do imóvel e das coberturas desejadas, cotamos com as seguradoras parceiras e devolvemos as opções comentadas, normalmente dentro do mesmo dia útil." },
    ],
  },

  "vila-olimpia": {
    slug: "seguro-residencial-vila-olimpia",
    title: "Seguro Residencial na Vila Olímpia SP | Patro Seguros",
    metaDescription:
      "Seguro residencial na Vila Olímpia: proteção para apartamentos e studios, equipamentos de home office, danos elétricos e responsabilidade civil. Patro Seguros.",
    intro: [
      "A parte residencial da Vila Olímpia é majoritariamente vertical e recente, com muitos apartamentos compactos e studios ocupados por profissionais que trabalham nos escritórios do próprio bairro.",
      "A Patro Seguros atende moradores da Vila Olímpia a partir da sede em Guarulhos, com cotação comparada e explicação das diferenças entre as apólices.",
    ],
    contexto: [
      "Em unidades compactas, o valor concentrado em eletrônicos costuma ser proporcionalmente maior do que em imóveis grandes: notebook, monitor, TV, console e bicicleta podem representar a maior parte do conteúdo.",
      "A rotatividade de moradores é alta, com muitos imóveis alugados. Isso torna a distinção entre a responsabilidade do proprietário e a do inquilino especialmente importante na hora de escolher a apólice.",
      "Bicicletas e patinetes usados no deslocamento diário são bens que raramente estão cobertos automaticamente fora do imóvel — quando esse uso existe, precisa ser tratado na cotação.",
    ],
    apartamento: [
      "Studios e apartamentos de um dormitório costumam ter prêmios menores justamente porque o conteúdo é menor, mas isso não dispensa o cuidado com o limite de responsabilidade civil: em prédio, o vazamento que atinge o vizinho não depende do tamanho da sua unidade.",
      "Se o prédio tem coworking, academia e áreas compartilhadas, lembre que danos nessas áreas são tratados pela apólice do condomínio, e não pela sua.",
    ],
    casa: [
      "Casas na Vila Olímpia são exceção e normalmente estão em ruas internas ou convertidas em uso misto. Quando há residência de fato, a apólice precisa cobrir estrutura, e não apenas conteúdo.",
      "Imóveis térreos com acesso direto à rua pedem atenção extra às condições de roubo e furto qualificado, incluindo exigências de portas, trancas e vestígios de arrombamento.",
    ],
    proprietarioInquilino: [
      "Como boa parte das unidades é alugada, é comum o morador achar que está coberto pelo seguro incêndio do contrato. Não está: aquele seguro protege o imóvel em favor do proprietário.",
      "O inquilino que quer proteger notebook, TV, bicicleta e móveis precisa de uma apólice de conteúdo em seu nome, com responsabilidade civil incluída.",
    ],
    escolha: [
      { title: "Concentração em eletrônicos", description: "Em unidade compacta, o conteúdo é quase todo eletrônico. Dimensione por valor de reposição." },
      { title: "Bens usados fora de casa", description: "Bicicleta e equipamentos levados para a rua exigem cobertura específica." },
      { title: "Responsabilidade civil", description: "Independe da metragem: em prédio, o risco de atingir o vizinho é o mesmo." },
      { title: "Imóvel alugado", description: "Confirme quem contrata o quê: estrutura é do proprietário, conteúdo é seu." },
    ],
    faqs: [
      { question: "Vale a pena seguro residencial em studio na Vila Olímpia?", answer: "Costuma valer quando o conteúdo é predominantemente eletrônico e você depende desses equipamentos para trabalhar. Além do conteúdo, a responsabilidade civil e a assistência 24 horas justificam a contratação em prédio." },
      { question: "Minha bicicleta está coberta se for roubada na rua?", answer: "Em geral não, na cobertura padrão. Bens levados para fora do imóvel exigem garantia específica, com regras próprias de comprovação. Informe esse uso na cotação para avaliarmos as opções disponíveis." },
      { question: "Sou inquilino. O seguro incêndio do contrato já resolve?", answer: "Não resolve para você. O seguro incêndio exigido em locação protege o imóvel em favor do proprietário. Seus bens e sua responsabilidade por danos ao vizinho precisam de apólice própria de conteúdo." },
      { question: "A Patro Seguros tem sede na Vila Olímpia?", answer: "Não. A corretora é sediada em Guarulhos, na Cidade Maia, e atende a Vila Olímpia de forma digital, incluindo cotação, emissão e acompanhamento de sinistro." },
      { question: "O que acontece se eu declarar um valor de conteúdo menor do que o real?", answer: "A indenização pode ser reduzida proporcionalmente ao percentual segurado a menor. Por isso vale somar os bens pelo valor de reposição, e não pelo que você pagou há alguns anos." },
      { question: "Trabalho em casa alguns dias por semana. Preciso avisar?", answer: "Se há equipamentos profissionais relevantes no imóvel, vale declarar. Isso evita discussão sobre o enquadramento dos bens em um eventual sinistro e permite avaliar cobertura adicional de eletrônicos." },
    ],
  },

  pinheiros: {
    slug: "seguro-residencial-pinheiros",
    title: "Seguro Residencial em Pinheiros SP | Patro Seguros",
    metaDescription:
      "Seguro residencial em Pinheiros: proteção para casas antigas, apartamentos e imóveis de uso misto, com danos elétricos e responsabilidade civil. Patro Seguros.",
    intro: [
      "Pinheiros tem um tecido urbano bastante variado: casas antigas em ruas estreitas, edifícios novos, imóveis convertidos em ateliês e estúdios, e uma vida noturna intensa em algumas quadras.",
      "A Patro Seguros é sediada em Guarulhos e atende moradores de Pinheiros à distância, comparando alternativas de seguro residencial entre as seguradoras parceiras.",
    ],
    contexto: [
      "A convivência entre residência e comércio nas mesmas ruas cria situações particulares. Imóveis vizinhos a bares e restaurantes têm exposição diferente a barulho, resíduos e ocorrências na via, e imóveis com parte do espaço usada para trabalho criativo têm equipamentos de valor dentro de casa.",
      "As casas antigas do bairro, muitas construídas há décadas, tendem a ter instalação elétrica e hidráulica reformadas em camadas. Isso torna danos elétricos e vazamentos as coberturas mais acionadas nesse tipo de imóvel.",
      "Em quadras com movimento noturno intenso, moradores costumam se preocupar mais com roubo e furto qualificado e com danos a vidros e fachadas — coberturas que precisam ser conferidas item a item.",
    ],
    apartamento: [
      "Nos prédios novos da região, a maior parte do valor está em benfeitorias e eletrônicos. Vale confirmar se armários planejados, automação e ar-condicionado estão dentro do valor de conteúdo declarado.",
      "Prédios com poucas unidades e sem portaria 24 horas podem ter exigências específicas de segurança na cobertura de roubo. Confira essas condições antes de assinar.",
    ],
    casa: [
      "As casas de Pinheiros exigem cobertura de estrutura calculada pelo custo de reconstrução. Em imóveis antigos, esse custo pode ser maior do que parece por causa do tipo de construção e de eventuais restrições de reforma.",
      "Telhado, calhas e área externa merecem atenção nas coberturas de vendaval e alagamento, especialmente em ruas com histórico de escoamento difícil durante temporais.",
    ],
    proprietarioInquilino: [
      "Boa parte dos imóveis do bairro é alugada, inclusive casas usadas como moradia e trabalho ao mesmo tempo. Nesses casos, é preciso separar com clareza o que é bem pessoal e o que é equipamento de trabalho.",
      "O proprietário protege a estrutura e pode contar com perda de aluguel; o inquilino protege conteúdo e responsabilidade civil. Uma coisa não substitui a outra.",
    ],
    escolha: [
      { title: "Tipo de construção", description: "Casa antiga tem custo de reconstrução próprio, que não segue o valor de venda do imóvel." },
      { title: "Equipamentos de trabalho em casa", description: "Estúdio, ateliê ou escritório doméstico pedem declaração e, às vezes, cobertura de eletrônicos." },
      { title: "Exposição a temporais", description: "Vendaval, alagamento e danos ao telhado devem ser avaliados caso a caso." },
      { title: "Condições de segurança", description: "Imóvel sem portaria pode ter exigências específicas na cobertura de roubo." },
    ],
    faqs: [
      { question: "Seguro casa em Pinheiros cobre alagamento?", answer: "Alagamento costuma ser cobertura adicional, com condições próprias e exclusões. Não presuma que está incluída: peça para conferir a cláusula específica antes de fechar a apólice." },
      { question: "Tenho um estúdio dentro de casa. O seguro residencial atende?", answer: "Atende a parte residencial, mas equipamentos profissionais podem exigir declaração ou cobertura de equipamentos eletrônicos. Em operações maiores, a solução correta pode incluir uma apólice empresarial." },
      { question: "Prédio sem portaria muda a cobertura de roubo?", answer: "Pode mudar. Algumas seguradoras condicionam a cobertura de roubo a requisitos de segurança do imóvel. Essas exigências aparecem nas condições particulares e devem ser verificadas na cotação." },
      { question: "A Patro Seguros atende Pinheiros presencialmente?", answer: "A sede fica em Guarulhos, na Cidade Maia. Em Pinheiros o atendimento é digital, por WhatsApp, telefone, e-mail e reuniões on-line, com um consultor responsável pelo caso." },
      { question: "Como funciona a assistência 24 horas na prática?", answer: "Você aciona a central da seguradora e ela envia o profissional — chaveiro, eletricista, encanador ou vidraceiro. O número de acionamentos por ano e o limite de cada serviço variam conforme o plano contratado." },
      { question: "Quero comparar corretora de seguro residencial em Pinheiros. O que preciso enviar?", answer: "Tipo de imóvel, metragem aproximada, CEP, se é próprio ou alugado e uma estimativa do conteúdo. Com isso conseguimos cotar nas seguradoras parceiras com o mesmo padrão de cobertura." },
    ],
  },

  brooklin: {
    slug: "seguro-residencial-brooklin",
    title: "Seguro Residencial no Brooklin SP | Patro Seguros",
    metaDescription:
      "Seguro residencial no Brooklin: cobertura para casas do Brooklin Velho e apartamentos da região da Berrini, com danos elétricos e assistência. Patro Seguros.",
    intro: [
      "O Brooklin abriga duas realidades residenciais bem diferentes: as ruas de casas do Brooklin Velho, tranquilas e arborizadas, e os edifícios próximos ao eixo Berrini–Nações Unidas, com perfil mais corporativo no entorno.",
      "A Patro Seguros, com sede em Guarulhos, atende moradores das duas regiões do bairro de forma remota e comparativa.",
    ],
    contexto: [
      "Nas casas do Brooklin Velho, os pontos de atenção são estrutura, muros, telhado, área externa e equipamentos como portão automático e sistemas de segurança — itens que aparecem pouco em apólices contratadas sem análise.",
      "Nos apartamentos do lado corporativo, o padrão é o oposto: pouca estrutura sob responsabilidade do morador e conteúdo concentrado em eletrônicos e benfeitorias.",
      "Como o bairro tem áreas com arborização densa, danos por queda de galhos e vendaval durante temporais são preocupações concretas para quem mora em casa.",
    ],
    apartamento: [
      "Nos prédios do bairro, a cobertura mais relevante costuma ser a responsabilidade civil familiar, seguida de danos elétricos e roubo qualificado. Benfeitorias da unidade também precisam entrar na conta.",
      "Vale conferir se o plano cobre danos a equipamentos de ar-condicionado e automação, comuns nos lançamentos da região.",
    ],
    casa: [
      "Para as casas, o valor a segurar é o custo de reconstrução, considerando padrão de acabamento. Muros, portão e edícula devem ser mencionados para não ficarem de fora.",
      "Piscina, jardim e área externa aumentam a chance de acidente com visitantes e prestadores, o que justifica um limite mais folgado de responsabilidade civil familiar.",
    ],
    proprietarioInquilino: [
      "No Brooklin Velho predominam proprietários, que geralmente contratam estrutura e conteúdo em uma única apólice.",
      "Na parte de apartamentos, a locação é mais comum. O inquilino contrata conteúdo e responsabilidade civil; o proprietário mantém a estrutura e pode incluir perda de aluguel.",
    ],
    escolha: [
      { title: "Estrutura e benfeitorias externas", description: "Muro, portão, edícula e telhado precisam estar declarados nas casas." },
      { title: "Eventos climáticos", description: "Vendaval e queda de árvore são riscos reais em ruas arborizadas." },
      { title: "Equipamentos de automação", description: "Portão, câmeras e ar-condicionado podem ser atendidos por danos elétricos." },
      { title: "Perfil de ocupação", description: "Casa com moradores o dia todo e apartamento vazio durante o dia pedem análises diferentes." },
    ],
    faqs: [
      { question: "O seguro cobre queda de árvore sobre a casa?", answer: "Costuma ser tratado nas coberturas de vendaval e impacto, com condições específicas. Como não é automático em todos os planos, é um item para conferir explicitamente na cotação, sobretudo em ruas arborizadas." },
      { question: "Meu portão automático queimou em uma tempestade. Tem cobertura?", answer: "Se houver cobertura de danos elétricos contratada e o equipamento estiver dentro do escopo da apólice, sim, respeitados limite e franquia. Por isso vale declarar automações e sistemas de segurança." },
      { question: "Casa e apartamento no Brooklin têm o mesmo seguro?", answer: "Não. Na casa, o peso está na estrutura e nas benfeitorias externas. No apartamento, está no conteúdo, nas benfeitorias internas e na responsabilidade civil. O produto é o mesmo, a montagem é diferente." },
      { question: "A Patro Seguros tem escritório no Brooklin?", answer: "Não. A corretora é sediada em Guarulhos, na Cidade Maia, e atende o Brooklin de forma digital, do orçamento ao acompanhamento de sinistro." },
      { question: "Tenho piscina. Isso muda a responsabilidade civil?", answer: "Muda a exposição: acidentes com visitantes em área externa são justamente o tipo de situação atendida pela responsabilidade civil familiar. Nesse caso, faz sentido avaliar um limite maior do que o básico." },
      { question: "Consigo contratar seguro para imóvel no Brooklin sem sair de casa?", answer: "Sim. Todo o processo é remoto: você envia os dados, recebe a comparação comentada, escolhe a opção e a apólice é emitida digitalmente." },
    ],
  },

  "vila-mariana": {
    slug: "seguro-residencial-vila-mariana",
    title: "Seguro Residencial na Vila Mariana SP | Patro Seguros",
    metaDescription:
      "Seguro residencial na Vila Mariana: proteção para apartamentos e casas, danos elétricos, roubo qualificado e responsabilidade civil. Cotação com a Patro Seguros.",
    intro: [
      "A Vila Mariana é um bairro residencial consolidado, com prédios de diferentes épocas, casas em ruas internas e uma população estável de famílias, estudantes e profissionais da área de saúde e educação.",
      "A Patro Seguros é uma corretora sediada em Guarulhos e atende moradores da Vila Mariana com cotação comparada entre as seguradoras parceiras.",
    ],
    contexto: [
      "A mistura de edifícios antigos e novos faz com que dois vizinhos de rua tenham necessidades bem diferentes. Em prédios com mais tempo de uso, vazamentos e danos elétricos concentram os acionamentos; em lançamentos, o peso está nas benfeitorias e nos eletrônicos.",
      "O bairro também tem muitos imóveis alugados para estudantes e profissionais de hospitais e universidades próximos. Nesses casos, o conteúdo é pessoal e o proprietário raramente cobre esses bens.",
      "Casas em ruas internas costumam ter garagem, quintal e área de serviço externa, o que amplia a lista de bens e benfeitorias a considerar no valor segurado.",
    ],
    apartamento: [
      "Se você reformou o apartamento, essas benfeitorias fazem parte do que precisa estar segurado. Elas não estão na apólice do condomínio.",
      "Para quem mora sozinho ou passa o dia fora, vale conferir as condições da cobertura de roubo e furto qualificado, que exige vestígios de arrombamento na maioria dos contratos.",
    ],
    casa: [
      "Nas casas do bairro, a estrutura deve ser segurada pelo custo de reconstrução. Muro, portão e edícula precisam ser mencionados para entrar na cobertura.",
      "Casas com moradores durante todo o dia têm perfil de risco diferente de imóveis vazios, e isso pode ser considerado na análise da seguradora.",
    ],
    proprietarioInquilino: [
      "Muitos moradores da Vila Mariana alugam. O seguro incêndio exigido no contrato de locação protege o imóvel em favor do proprietário e não cobre os bens do inquilino.",
      "Para o proprietário que aluga, a atenção principal está na estrutura e, quando disponível, na cobertura de perda de aluguel após um sinistro coberto.",
    ],
    escolha: [
      { title: "Idade do imóvel", description: "Prédio antigo pede limite maior em danos elétricos e atenção a vazamentos." },
      { title: "Benfeitorias da unidade", description: "Reformas, armários e revestimentos entram no valor de conteúdo declarado." },
      { title: "Rotina do imóvel", description: "Imóvel vazio durante o dia muda a conversa sobre roubo e assistência." },
      { title: "Responsabilidade civil familiar", description: "Fundamental em prédio, pelo risco de vazamento atingir outras unidades." },
    ],
    faqs: [
      { question: "Sou estudante e moro de aluguel na Vila Mariana. Faz sentido contratar?", answer: "Faz, se você tem notebook, TV e móveis próprios. O seguro do contrato de locação protege o proprietário; o conteúdo pessoal e a responsabilidade civil precisam de apólice em seu nome, geralmente com prêmio modesto." },
      { question: "O seguro cobre roubo se não houver arrombamento?", answer: "Normalmente não. A cobertura padrão é de roubo e furto qualificado, que pressupõe grave ameaça ou vestígios de arrombamento. Furto simples costuma ser exclusão expressa nas condições gerais." },
      { question: "Meu prédio já tem seguro. Preciso de outro?", answer: "Sim, se quiser proteger o interior da sua unidade. A apólice do condomínio cobre áreas comuns e a estrutura do edifício, não seus móveis, equipamentos e benfeitorias." },
      { question: "A Patro Seguros atende a Vila Mariana pessoalmente?", answer: "A sede fica em Guarulhos, na Cidade Maia. O atendimento na Vila Mariana é digital: cotação, documentos, emissão e sinistro resolvidos por WhatsApp, telefone, e-mail ou reunião on-line." },
      { question: "Quais coberturas costumam ser as mais úteis no bairro?", answer: "Nos prédios, responsabilidade civil familiar, danos elétricos e roubo qualificado. Nas casas, entram também estrutura, vendaval e danos a benfeitorias externas como muro e portão." },
      { question: "Como peço uma cotação de seguro para imóvel na Vila Mariana?", answer: "Basta informar tipo de imóvel, metragem aproximada, CEP, se é próprio ou alugado e o que precisa ser protegido. Cotamos nas seguradoras parceiras e devolvemos as opções comentadas." },
    ],
  },

  "campo-belo": {
    slug: "seguro-residencial-campo-belo",
    title: "Seguro Residencial no Campo Belo SP | Patro Seguros",
    metaDescription:
      "Seguro residencial no Campo Belo: cobertura para apartamentos e casas próximos a Congonhas, com danos elétricos, roubo e responsabilidade civil. Patro Seguros.",
    intro: [
      "O Campo Belo é um bairro residencial de perfil familiar, com edifícios de gabarito controlado pela proximidade de Congonhas, casas em ruas internas e comércio de vizinhança bem distribuído.",
      "A Patro Seguros é sediada em Guarulhos e atende moradores do Campo Belo de forma digital, comparando coberturas antes de qualquer indicação.",
    ],
    contexto: [
      "Por causa das restrições de altura, o bairro tem muitos edifícios baixos e antigos, além de casas preservadas. Em imóveis desse tipo, manutenção elétrica e hidráulica pesa mais na conversa sobre cobertura do que em prédios novos.",
      "É um bairro com forte presença de famílias com filhos e funcionários domésticos, o que dá relevância prática à responsabilidade civil familiar.",
      "A proximidade do aeroporto influencia a rotina e o perfil profissional de parte dos moradores — tripulações e profissionais que viajam com frequência deixam o imóvel fechado por períodos, algo que deve ser declarado na proposta.",
    ],
    apartamento: [
      "Nos edifícios menores e mais antigos, danos elétricos e vazamentos são as ocorrências mais comuns. Verifique a franquia dessas coberturas, não apenas o limite.",
      "Se o prédio não tem portaria em tempo integral, confira as exigências de segurança na cobertura de roubo e furto qualificado.",
    ],
    casa: [
      "As casas do Campo Belo pedem cobertura de estrutura pelo custo de reconstrução, incluindo muro, portão e área externa quando existirem.",
      "Imóveis com quintal e garagem descoberta merecem atenção nas coberturas de vendaval, granizo e impacto de veículos.",
    ],
    proprietarioInquilino: [
      "O proprietário residente protege estrutura e conteúdo. Já quem aluga precisa de conteúdo e responsabilidade civil, porque o seguro incêndio do contrato beneficia o dono do imóvel.",
      "Para o proprietário que aluga a terceiros, a cobertura de perda ou pagamento de aluguel evita ficar sem receita enquanto o imóvel estiver inabitável após um sinistro coberto.",
    ],
    escolha: [
      { title: "Manutenção do imóvel", description: "Instalações antigas justificam limites maiores em danos elétricos e vazamento." },
      { title: "Ausências prolongadas", description: "Imóvel fechado por longos períodos deve ser informado à seguradora." },
      { title: "Família e funcionários", description: "Aumentam a exposição a acidentes com terceiros dentro do imóvel." },
      { title: "Assistência 24 horas", description: "Compare quantos acionamentos anuais o plano oferece para chaveiro e eletricista." },
    ],
    faqs: [
      { question: "Viajo a trabalho e o imóvel fica fechado. Isso é problema?", answer: "Não é impedimento, mas é informação relevante. Algumas seguradoras têm critérios para imóveis desocupados por períodos longos, então declarar essa rotina na proposta evita discussão em um eventual sinistro." },
      { question: "Prédio antigo tem seguro mais caro no Campo Belo?", answer: "Não necessariamente. A idade influencia a análise, mas o prêmio depende do conjunto: valor segurado, coberturas escolhidas, franquias e critérios de cada seguradora. Por isso a comparação faz diferença." },
      { question: "O que é furto qualificado na prática?", answer: "É o furto com arrombamento, escalada ou uso de chave falsa, que deixa vestígios. É essa a modalidade coberta na maioria das apólices residenciais; o furto simples, sem vestígio, geralmente fica de fora." },
      { question: "A Patro Seguros tem unidade no Campo Belo?", answer: "Não. A corretora é sediada em Guarulhos, na Cidade Maia, e atende o Campo Belo remotamente, incluindo cotação, emissão e acompanhamento de sinistro." },
      { question: "Aluguei minha casa. Que cobertura devo manter?", answer: "Estrutura, benfeitorias e, quando o plano permitir, perda de aluguel. Os bens do inquilino são responsabilidade dele, em apólice de conteúdo própria." },
      { question: "Como comparar seguro residencial no Campo Belo?", answer: "Compare com o mesmo padrão de cobertura em todas as seguradoras: mesmos limites, mesmas garantias, mesmas franquias. É assim que cotamos, para a diferença de preço significar alguma coisa." },
    ],
  },

  perdizes: {
    slug: "seguro-residencial-perdizes",
    title: "Seguro Residencial em Perdizes SP | Patro Seguros",
    metaDescription:
      "Seguro residencial em Perdizes: proteção para casas em ladeira, apartamentos familiares e imóveis alugados, com danos elétricos e assistência 24h. Patro Seguros.",
    intro: [
      "Perdizes é um bairro residencial de ruas em aclive, com casas antigas bem conservadas, edifícios familiares de plantas generosas e forte presença de estudantes e professores por causa das universidades da região.",
      "A Patro Seguros, corretora com sede em Guarulhos, atende moradores de Perdizes de forma consultiva e remota, comparando alternativas de seguro residencial.",
    ],
    contexto: [
      "A topografia do bairro tem efeito prático no seguro: ruas em declive concentram água em temporais, e imóveis em cota mais baixa costumam se preocupar mais com alagamento, infiltração e danos ao térreo.",
      "Nas casas antigas, o custo de reconstrução é frequentemente subestimado. Construções com pé-direito alto, madeira e detalhes originais custam mais para refazer do que um imóvel padrão da mesma metragem.",
      "Há também um número relevante de imóveis alugados para estudantes, com conteúdo modesto mas concentrado em eletrônicos — perfil que pede uma apólice enxuta e bem dimensionada, não a mais completa possível.",
    ],
    apartamento: [
      "Nos prédios familiares do bairro, muitos com décadas de uso, vale reforçar danos elétricos e verificar o limite para vazamentos que atinjam unidades vizinhas.",
      "Benfeitorias feitas em reformas antigas — marcenaria, pisos, esquadrias — integram o valor a segurar e são frequentemente esquecidas.",
    ],
    casa: [
      "Para casas, o valor de reconstrução deve considerar o tipo de construção original. Imóveis com características específicas de época podem ter custo de refazimento acima da média.",
      "Telhado, calhas, muros de arrimo e escadas externas são elementos comuns nas casas em ladeira e devem ser mencionados na análise das coberturas de vendaval e danos à estrutura.",
    ],
    proprietarioInquilino: [
      "O proprietário protege estrutura e conteúdo; o inquilino protege conteúdo e responsabilidade civil. Em repúblicas e imóveis compartilhados, vale definir quem é o segurado antes de contratar.",
      "O seguro incêndio exigido no contrato de locação não cobre os bens de quem mora no imóvel — é uma garantia em favor do proprietário.",
    ],
    escolha: [
      { title: "Posição do imóvel na rua", description: "Casas em cota baixa devem avaliar alagamento e danos ao térreo." },
      { title: "Custo real de reconstrução", description: "Construções antigas custam mais para refazer do que sugere a metragem." },
      { title: "Perfil de moradores", description: "Repúblicas e imóveis compartilhados exigem definir claramente o segurado." },
      { title: "Danos elétricos", description: "Instalações reformadas em camadas justificam limite maior nessa cobertura." },
    ],
    faqs: [
      { question: "Minha casa fica no ponto baixo da rua. O seguro cobre alagamento?", answer: "Alagamento é cobertura adicional na maioria das apólices, com condições e exclusões próprias. Em ruas com escoamento difícil, é um item que vale pedir cotado à parte para comparar o custo entre seguradoras." },
      { question: "Como calcular o valor de reconstrução de uma casa antiga em Perdizes?", answer: "Considere refazer a construção com o mesmo padrão, sem incluir o terreno. Em imóveis antigos, com pé-direito alto ou acabamentos originais, esse custo tende a ser maior por metro quadrado do que em construções recentes." },
      { question: "Moro em república. Quem contrata o seguro?", answer: "Pode ser um dos moradores ou o proprietário, mas a apólice cobre quem está declarado como segurado e os bens informados. Vale acertar isso antes da contratação para evitar bens de terceiros sem cobertura." },
      { question: "A Patro Seguros tem escritório em Perdizes?", answer: "Não. A sede fica em Guarulhos, na Cidade Maia, e o atendimento em Perdizes é digital, com um consultor responsável do orçamento à eventual abertura de sinistro." },
      { question: "O que a assistência 24 horas resolve no dia a dia?", answer: "Chaveiro quando você fica sem acesso ao imóvel, eletricista em pane no quadro, encanador em vazamento e vidraceiro em quebra de vidro externo. A quantidade de acionamentos por ano depende do plano." },
      { question: "Consigo contratar cobrindo só o que preciso?", answer: "Sim. A apólice é montada por garantias: dá para começar por incêndio, danos elétricos e responsabilidade civil e acrescentar o restante conforme sua necessidade e orçamento." },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Seguro Empresarial por bairro                                        */
/* ------------------------------------------------------------------ */

export const empresarialBairrosSp: Record<string, EmpresarialBairroConfig> = {
  "itaim-bibi": {
    slug: "seguro-empresarial-itaim-bibi",
    title: "Seguro Empresarial no Itaim Bibi SP | Patro Seguros",
    metaDescription:
      "Seguro empresarial no Itaim Bibi: proteção para escritórios, consultorias e empresas de serviços, com equipamentos, RC e lucros cessantes. Patro Seguros.",
    intro: [
      "O Itaim Bibi é um dos endereços corporativos mais procurados de São Paulo, com escritórios em torres da Faria Lima e da JK, consultorias, empresas financeiras, agências e uma camada grande de prestadores de serviço em conjuntos comerciais menores.",
      "A Patro Seguros é uma corretora sediada em Guarulhos que atende empresas do Itaim Bibi de forma consultiva, analisando a atividade antes de comparar as alternativas de apólice.",
    ],
    contexto: [
      "Em escritório de serviços, o risco raramente está no estoque: está nos equipamentos, nos dados, na continuidade da operação e na responsabilidade sobre o que a empresa entrega ao cliente.",
      "Empresas instaladas em torres corporativas costumam ter exigência contratual de seguro na locação do conjunto, com limites mínimos definidos pelo proprietário ou pela administradora — é um ponto que precisa ser conferido antes de contratar.",
      "Como boa parte das operações depende integralmente de energia e conectividade, danos elétricos e equipamentos eletrônicos deixam de ser coberturas acessórias e passam a ser centrais na montagem da apólice.",
    ],
    quemContrata: [
      "Escritórios de consultoria, advocacia e serviços financeiros",
      "Agências de publicidade, comunicação e design",
      "Empresas de tecnologia e software instaladas em conjuntos comerciais",
      "Prestadores de serviço e profissionais autônomos com CNPJ e sala própria",
      "Pequenos comércios e operações de alimentação que atendem o público corporativo",
    ],
    riscos: [
      { title: "Danos elétricos e falha de energia", description: "Servidores, estações de trabalho e sistemas de telefonia podem ser danificados por oscilação de tensão." },
      { title: "Incêndio em conjunto comercial", description: "Mesmo com prevenção do edifício, o conteúdo da sua sala é responsabilidade da empresa, não do condomínio." },
      { title: "Roubo de equipamentos", description: "Notebooks e equipamentos de alto valor concentrados em poucos metros quadrados." },
      { title: "Responsabilidade civil de operações", description: "Danos causados a visitantes, clientes ou a outras unidades do edifício durante a atividade." },
      { title: "Interrupção da atividade", description: "Uma sala interditada obriga a empresa a operar de outro lugar, mantendo aluguel e folha." },
    ],
    segmentos: [
      { title: "Consultorias e escritórios profissionais", description: "Além do patrimônio, costumam avaliar responsabilidade civil profissional pela natureza do serviço prestado." },
      { title: "Empresas de tecnologia", description: "Concentram valor em equipamentos e dependem de disponibilidade; equipamentos eletrônicos e danos elétricos são prioridade." },
      { title: "Agências e estúdios", description: "Equipamentos de produção, ilhas de edição e material de clientes dentro do escritório pedem limites específicos." },
      { title: "Alimentação e serviços de rua", description: "Operações com fachada de vidro e atendimento ao público têm exposição maior a RC e a danos a vidros." },
    ],
    pme: [
      "Empresas pequenas instaladas em uma sala do Itaim costumam achar que não têm o que segurar. Na prática, a soma de notebooks, monitores, mobiliário e benfeitorias da sala já justifica uma apólice enxuta.",
      "Para operações com poucos funcionários, o impacto de uma parada é proporcionalmente maior: sem estrutura alternativa, a empresa fica sem faturar. É aí que despesas fixas e lucros cessantes fazem diferença.",
    ],
    faqs: [
      { question: "Meu escritório fica em uma torre com seguro do condomínio. Preciso de apólice própria?", answer: "Precisa. O seguro do edifício cobre áreas comuns e a estrutura. Equipamentos, mobiliário, benfeitorias da sua sala e a responsabilidade civil da sua operação só estão protegidos em apólice empresarial própria." },
      { question: "O contrato de locação exige seguro. Qual cobertura atende?", answer: "Geralmente exige-se incêndio com limite mínimo, às vezes com o proprietário como beneficiário. Esse mínimo contratual costuma ser insuficiente para a sua operação, então vale montar a apólice completa a partir dele." },
      { question: "Seguro empresarial cobre erro profissional da consultoria?", answer: "Não. Erro na prestação do serviço é escopo de responsabilidade civil profissional, um produto distinto. A apólice empresarial patrimonial cobre danos ao patrimônio e RC de operações, não a qualidade técnica do trabalho." },
      { question: "Como funciona a cobertura de equipamentos que saem do escritório?", answer: "Notebooks levados para reuniões e home office exigem cláusula específica, porque a cobertura padrão vale dentro do endereço segurado. Informe esse uso na cotação para avaliarmos as opções." },
      { question: "A Patro Seguros tem escritório no Itaim Bibi?", answer: "Não. A corretora é sediada em Guarulhos e atende empresas do Itaim Bibi de forma digital, com reuniões on-line para levantamento de riscos e apresentação das opções." },
      { question: "Quanto tempo leva para cotar seguro para empresa no Itaim Bibi?", answer: "Depois do levantamento da atividade e dos valores em risco, cotamos com as seguradoras parceiras e apresentamos a comparação comentada. O prazo depende da complexidade, mas casos simples saem em poucos dias úteis." },
    ],
  },

  moema: {
    slug: "seguro-empresarial-moema",
    title: "Seguro Empresarial em Moema SP | Patro Seguros",
    metaDescription:
      "Seguro empresarial em Moema: proteção para lojas de rua, clínicas, restaurantes e escritórios, com RC, equipamentos e lucros cessantes. Patro Seguros.",
    intro: [
      "O comércio de rua é uma marca de Moema: lojas, restaurantes, clínicas, academias e escritórios distribuídos ao longo das avenidas e das alamedas do bairro, com atendimento direto ao público.",
      "A Patro Seguros é sediada em Guarulhos e atende empresas de Moema com análise de atividade e cotação comparada entre as seguradoras parceiras.",
    ],
    contexto: [
      "Operar no térreo, com fachada de vidro e porta para a rua, cria uma exposição diferente da de um escritório em andar alto: vitrine, toldo, letreiro e o fluxo de pessoas entram na conta.",
      "Negócios de alimentação somam ainda o risco de incêndio ligado a cozinha e o de perda de estoque refrigerado em caso de falta prolongada de energia.",
      "Clínicas e consultórios do bairro concentram valor em equipamentos e dependem de agenda: uma interdição de poucos dias já significa remarcar pacientes e perder faturamento.",
    ],
    quemContrata: [
      "Lojas de rua e operações de varejo",
      "Restaurantes, cafés, padarias e bares",
      "Clínicas, consultórios e estúdios de estética",
      "Academias, estúdios de pilates e serviços de bem-estar",
      "Escritórios e prestadores de serviço instalados em salas comerciais",
    ],
    riscos: [
      { title: "Incêndio e explosão em cozinha", description: "Operações de alimentação têm fonte de calor permanente e exigem atenção à cobertura básica e à manutenção." },
      { title: "Danos a vidros, vitrines e letreiros", description: "Fachadas envidraçadas na rua estão expostas a impacto e vandalismo." },
      { title: "Roubo de mercadoria e equipamentos", description: "Estoque, caixa e equipamentos de atendimento concentrados no ponto." },
      { title: "Responsabilidade civil com clientes", description: "Quedas, acidentes e danos a pertences de clientes dentro do estabelecimento." },
      { title: "Interrupção do atendimento", description: "Ponto interditado significa agenda parada e faturamento suspenso, com despesas fixas mantidas." },
    ],
    segmentos: [
      { title: "Restaurantes e alimentação", description: "Cozinha, estoque refrigerado e atendimento ao público pedem incêndio, RC e, quando possível, deterioração de mercadoria." },
      { title: "Clínicas e consultórios", description: "Equipamentos específicos e responsabilidade sobre pacientes dentro do estabelecimento exigem limites bem calculados." },
      { title: "Lojas de rua", description: "Vitrine, estoque e movimento na calçada tornam vidros, roubo e RC as coberturas mais acionadas." },
      { title: "Academias e estúdios", description: "Aparelhos de alto valor e risco de acidente com alunos dentro do espaço." },
    ],
    pme: [
      "A maior parte dos negócios de Moema é de pequeno porte, com sócios que trabalham no próprio ponto. Nesses casos, o objetivo do seguro não é cobrir tudo, e sim evitar que um único evento inviabilize a operação.",
      "Uma apólice enxuta com incêndio, danos elétricos, roubo, vidros e responsabilidade civil já cobre a maioria dos cenários que tiram um pequeno comércio do ar.",
    ],
    faqs: [
      { question: "Tenho uma loja de rua em Moema. Quais coberturas são prioridade?", answer: "Normalmente incêndio, danos elétricos, roubo de mercadoria, quebra de vidros da vitrine e responsabilidade civil por acidentes com clientes. A ordem muda conforme o valor do estoque e o tipo de fachada." },
      { question: "Seguro empresarial cobre perda de alimentos por falta de energia?", answer: "Existe cobertura de deterioração de mercadorias em ambiente refrigerado, mas é adicional e tem condições próprias, como tempo mínimo de interrupção. Precisa ser contratada expressamente." },
      { question: "Minha clínica tem equipamentos caros. Eles entram na apólice?", answer: "Entram, geralmente pela cobertura de equipamentos eletrônicos, contratada com valores declarados. Isso costuma dar uma proteção melhor do que deixar tudo dentro do limite genérico de conteúdo." },
      { question: "Se meu ponto for interditado, o seguro paga o aluguel?", answer: "Pode pagar, se houver cobertura de despesas fixas ou lucros cessantes contratada e o sinistro estiver coberto. Não é automático: é uma garantia adicional que precisa constar na apólice." },
      { question: "A Patro Seguros atende empresas em Moema presencialmente?", answer: "A corretora é sediada em Guarulhos. Em Moema, o atendimento é digital e consultivo, com reunião on-line para levantar a atividade, os valores em risco e apresentar as opções." },
      { question: "Como funciona a cotação de seguro para comércio em Moema?", answer: "Levantamos CNAE, metragem do ponto, valor de conteúdo e estoque, equipamentos e se o imóvel é alugado. Com esses dados cotamos nas seguradoras parceiras e explicamos o que muda entre elas." },
    ],
  },

  "vila-nova-conceicao": {
    slug: "seguro-empresarial-vila-nova-conceicao",
    title: "Seguro Empresarial na Vila Nova Conceição SP | Patro Seguros",
    metaDescription:
      "Seguro empresarial na Vila Nova Conceição: proteção para clínicas, escritórios e comércio de bairro, com equipamentos, RC e assistência. Patro Seguros.",
    intro: [
      "A atividade empresarial da Vila Nova Conceição é discreta e de escala menor: clínicas, consultórios, escritórios de profissionais liberais, ateliês, restaurantes e comércio de vizinhança em imóveis de poucos andares.",
      "A Patro Seguros, corretora sediada em Guarulhos, atende esses negócios com análise da atividade e cotação comparada entre as seguradoras parceiras.",
    ],
    contexto: [
      "Muitos negócios do bairro funcionam em casas adaptadas ou em pequenos conjuntos. Esse tipo de imóvel exige atenção às benfeitorias feitas pela empresa, que normalmente não pertencem ao proprietário e precisam estar seguradas pelo locatário.",
      "Por atender um público exigente, a continuidade do serviço tem peso alto: perder a agenda de uma semana por um sinistro afeta reputação e receita.",
      "Como as operações são pequenas, o erro mais comum é subdimensionar o valor de conteúdo e de equipamentos, imaginando que o volume não justifica uma análise detalhada.",
    ],
    quemContrata: [
      "Clínicas, consultórios médicos e odontológicos",
      "Estúdios de estética, fisioterapia e bem-estar",
      "Escritórios de profissionais liberais e pequenas consultorias",
      "Restaurantes, cafés e comércio de vizinhança",
      "Ateliês, galerias e serviços especializados",
    ],
    riscos: [
      { title: "Danos a equipamentos especializados", description: "Aparelhos clínicos e de estética têm custo de reposição elevado e prazo de reparo longo." },
      { title: "Incêndio e danos elétricos", description: "Imóveis adaptados podem ter instalação elétrica não dimensionada para o novo uso." },
      { title: "Responsabilidade civil sobre clientes", description: "Atendimento presencial cria exposição a acidentes dentro do estabelecimento." },
      { title: "Roubo em horário de funcionamento", description: "Equipamentos portáteis e valores em caixa em operações com porta para a rua." },
      { title: "Parada de atividade", description: "Agenda cancelada por interdição do ponto gera perda direta de faturamento." },
    ],
    segmentos: [
      { title: "Clínicas e consultórios", description: "Equipamentos declarados, RC de operações e continuidade da agenda são o núcleo da apólice." },
      { title: "Estúdios e serviços de bem-estar", description: "Aparelhos, mobiliário específico e risco de acidente com clientes durante o atendimento." },
      { title: "Restaurantes e cafés", description: "Cozinha, estoque e público no salão pedem incêndio, RC e atenção a vidros e fachada." },
      { title: "Escritórios e ateliês", description: "Concentração de valor em equipamentos, obras ou materiais de clientes sob guarda da empresa." },
    ],
    pme: [
      "Negócio pequeno não significa risco pequeno. Em uma clínica com dois consultórios, um único equipamento danificado pode custar mais do que a apólice de um ano inteiro.",
      "Para operações enxutas, o caminho costuma ser uma apólice com coberturas essenciais bem dimensionadas, em vez de muitas garantias com limites simbólicos.",
    ],
    faqs: [
      { question: "Minha clínica funciona em uma casa alugada. Quem segura o quê?", answer: "O proprietário responde pela estrutura; a empresa segura o conteúdo, os equipamentos e as benfeitorias que fez no imóvel, além da responsabilidade civil da operação. Isso deve estar claro antes de contratar." },
      { question: "Preciso declarar cada equipamento?", answer: "Para equipamentos de maior valor, sim: a cobertura de equipamentos eletrônicos costuma trabalhar com relação de itens. Isso evita discussão sobre o valor indenizado em caso de sinistro." },
      { question: "Seguro empresarial cobre erro no atendimento ao paciente?", answer: "Não. Isso é escopo de responsabilidade civil profissional, um produto separado. A apólice empresarial atende danos ao patrimônio e acidentes ocorridos no estabelecimento, não a conduta técnica." },
      { question: "A Patro Seguros tem unidade na Vila Nova Conceição?", answer: "Não. A sede é em Guarulhos, na Cidade Maia. O atendimento a empresas do bairro é feito de forma digital, com reunião on-line para levantamento de riscos." },
      { question: "Vale contratar cobertura de lucros cessantes em negócio pequeno?", answer: "Vale avaliar quando a operação depende do ponto físico e não tem estrutura alternativa. Se uma semana parada compromete o caixa, essa cobertura merece cotação para você comparar custo e benefício." },
      { question: "Como cotar seguro para empresa na Vila Nova Conceição?", answer: "Envie CNAE, metragem, lista de equipamentos relevantes, se o imóvel é alugado e o horário de funcionamento. Com isso conseguimos comparar propostas com o mesmo padrão de cobertura." },
    ],
  },

  "jardim-paulista": {
    slug: "seguro-empresarial-jardim-paulista",
    title: "Seguro Empresarial no Jardim Paulista SP | Patro Seguros",
    metaDescription:
      "Seguro empresarial no Jardim Paulista: cobertura para consultórios, escritórios e lojas próximos à Paulista, com equipamentos e RC. Patro Seguros.",
    intro: [
      "O Jardim Paulista concentra consultórios médicos, clínicas, escritórios de advocacia, lojas de rua e serviços em edifícios comerciais próximos à Avenida Paulista, à Oscar Freire e à Rua Augusta.",
      "A Patro Seguros é sediada em Guarulhos e atende essas empresas com levantamento de riscos e comparação entre as seguradoras parceiras.",
    ],
    contexto: [
      "Muitas operações do bairro funcionam em conjuntos comerciais dentro de edifícios antigos, com instalação elétrica reformada em etapas. Para clínicas e escritórios que dependem de equipamentos, isso torna danos elétricos uma cobertura estratégica.",
      "O fluxo intenso de pedestres nas quadras comerciais aumenta a exposição de lojas e serviços de rua a acidentes com clientes e a danos em fachadas e vitrines.",
      "Em consultórios, há ainda a guarda de documentos e prontuários e a dependência de agenda: uma interrupção de atendimento tem efeito imediato no faturamento.",
    ],
    quemContrata: [
      "Consultórios médicos e odontológicos",
      "Clínicas de estética, dermatologia e procedimentos",
      "Escritórios de advocacia, contabilidade e consultoria",
      "Lojas de rua, óticas e comércio especializado",
      "Salões, estúdios e prestadores de serviço com atendimento presencial",
    ],
    riscos: [
      { title: "Danos elétricos em prédios antigos", description: "Oscilações afetam equipamentos clínicos, servidores e sistemas de atendimento." },
      { title: "Roubo de equipamentos e valores", description: "Operações com porta para a rua e atendimento contínuo ao público." },
      { title: "Responsabilidade civil de operações", description: "Acidentes com clientes e pacientes dentro do estabelecimento." },
      { title: "Incêndio em conjunto comercial", description: "O conteúdo da sala é responsabilidade da empresa, não do condomínio do edifício." },
      { title: "Interrupção da agenda", description: "Interdição do ponto significa cancelar atendimentos já marcados." },
    ],
    segmentos: [
      { title: "Consultórios e clínicas", description: "Equipamentos declarados, RC e continuidade do atendimento são o centro da apólice." },
      { title: "Escritórios de advocacia e contabilidade", description: "Documentos, arquivos e equipamentos de TI concentram o valor do conteúdo." },
      { title: "Comércio da Oscar Freire e adjacências", description: "Estoque de alto valor unitário, vitrine e movimento de rua pedem vidros, roubo e RC." },
      { title: "Serviços de estética e beleza", description: "Aparelhos específicos e atendimento presencial com risco de acidente com clientes." },
    ],
    pme: [
      "Consultórios e escritórios pequenos costumam operar com poucos profissionais e alta dependência dos equipamentos. Nesse cenário, a apólice deve priorizar equipamentos, danos elétricos e responsabilidade civil.",
      "Quando o imóvel é alugado, é importante lembrar que as benfeitorias feitas pela empresa — divisórias, instalações, revestimentos — pertencem à operação e devem estar dentro do valor segurado.",
    ],
    faqs: [
      { question: "Meu consultório fica em um edifício antigo. O que priorizar na apólice?", answer: "Danos elétricos com limite adequado, equipamentos eletrônicos declarados e responsabilidade civil de operações. Incêndio segue como cobertura básica, e vale conferir o que a apólice do condomínio efetivamente cobre." },
      { question: "Prontuários e documentos têm cobertura?", answer: "Existem garantias para documentos e arquivos, mas com limites e condições específicas. É um item a pedir expressamente na cotação, porque não costuma vir na configuração padrão." },
      { question: "Loja na Oscar Freire precisa de cobertura diferente?", answer: "O ponto que mais muda é o valor do estoque por metro quadrado e a exposição da vitrine. Isso costuma exigir limites maiores em roubo e em quebra de vidros do que em um comércio comum." },
      { question: "A Patro Seguros tem escritório no Jardim Paulista?", answer: "Não. A corretora é sediada em Guarulhos, na Cidade Maia, e atende empresas do bairro de forma digital, com reuniões on-line para levantamento e apresentação das propostas." },
      { question: "Seguro empresarial cobre responsabilidade profissional do médico?", answer: "Não. Responsabilidade civil profissional é produto separado. A apólice empresarial protege patrimônio e acidentes ocorridos no estabelecimento, não a conduta técnica do profissional." },
      { question: "Como pedir uma cotação de seguro para escritório no Jardim Paulista?", answer: "Informe CNAE, metragem, equipamentos relevantes, se o imóvel é alugado e o horário de funcionamento. Cotamos nas seguradoras parceiras e apresentamos a comparação comentada." },
    ],
  },

  "vila-olimpia": {
    slug: "seguro-empresarial-vila-olimpia",
    title: "Seguro Empresarial na Vila Olímpia SP | Patro Seguros",
    metaDescription:
      "Seguro empresarial na Vila Olímpia: proteção para empresas de tecnologia, agências e coworkings, com equipamentos, RC e lucros cessantes. Patro Seguros.",
    intro: [
      "A Vila Olímpia é um dos polos corporativos mais dinâmicos da cidade, com empresas de tecnologia, agências, coworkings, startups e operações de serviços instaladas em torres e em conjuntos comerciais.",
      "A Patro Seguros é uma corretora sediada em Guarulhos que atende empresas da Vila Olímpia com análise de exposições e cotação comparada.",
    ],
    contexto: [
      "Em operações digitais, o patrimônio físico é enxuto, mas crítico: notebooks, servidores, equipamentos de rede e estúdios de conteúdo. Um evento elétrico pode parar a empresa inteira sem destruir nada visível.",
      "Empresas em crescimento mudam de sala com frequência e alteram o número de postos de trabalho ao longo do ano. A apólice precisa acompanhar essa variação, senão o valor segurado deixa de refletir a realidade.",
      "Em coworkings, a divisão de responsabilidades entre o operador do espaço e a empresa usuária costuma gerar dúvida — e é justamente aí que aparecem lacunas de cobertura para equipamentos próprios.",
    ],
    quemContrata: [
      "Empresas de tecnologia, software e serviços digitais",
      "Agências de marketing, mídia e produtoras de conteúdo",
      "Startups e operações instaladas em coworkings ou salas privativas",
      "Escritórios de consultoria e serviços corporativos",
      "Restaurantes, cafés e serviços que atendem o público corporativo do bairro",
    ],
    riscos: [
      { title: "Danos elétricos e queima de equipamentos", description: "Servidores, switches e estações de trabalho são sensíveis a variação de tensão." },
      { title: "Roubo de equipamentos portáteis", description: "Notebooks e câmeras concentram valor alto em volume pequeno." },
      { title: "Interrupção da operação", description: "Sala interditada obriga a empresa a improvisar estrutura enquanto mantém custos fixos." },
      { title: "Responsabilidade civil de operações", description: "Danos a visitantes, clientes e a terceiros dentro do endereço segurado." },
      { title: "Incêndio em conjunto comercial", description: "A estrutura é do edifício; o conteúdo da sala é da empresa." },
    ],
    segmentos: [
      { title: "Tecnologia e software", description: "Prioridade em equipamentos eletrônicos, danos elétricos e continuidade operacional." },
      { title: "Agências e produtoras", description: "Equipamentos de produção e material de clientes sob guarda exigem limites declarados." },
      { title: "Coworkings e escritórios compartilhados", description: "É preciso separar o que a apólice do operador cobre do que é responsabilidade da empresa usuária." },
      { title: "Alimentação e serviços de apoio", description: "Operações de rua com fachada de vidro e alto fluxo em horário comercial." },
    ],
    pme: [
      "Startups costumam adiar o seguro por acharem que só faz sentido depois de crescer. Na prática, é a fase em que a empresa tem menos caixa para absorver uma perda de equipamentos.",
      "Uma apólice inicial com equipamentos eletrônicos, danos elétricos, roubo e responsabilidade civil já cobre os cenários mais prováveis de uma operação enxuta.",
    ],
    faqs: [
      { question: "Trabalho em coworking. Preciso de seguro próprio?", answer: "Em geral sim. A apólice do operador cobre o espaço e a estrutura dele, não os seus equipamentos. Se a empresa mantém notebooks, câmeras ou servidores no local, faz sentido ter cobertura própria." },
      { question: "Equipamentos que os funcionários levam para casa estão cobertos?", answer: "Não pela cobertura padrão, que vale para o endereço segurado. É preciso cláusula específica para bens fora do local. Informe esse regime de trabalho na cotação para avaliarmos as alternativas." },
      { question: "Seguro empresarial cobre ataque cibernético?", answer: "Não. Incidente cibernético, vazamento de dados e extorsão digital são escopo de seguro cyber, um produto distinto que pode ser cotado em paralelo conforme a maturidade da operação." },
      { question: "Mudamos de sala com frequência. Como fica a apólice?", answer: "O endereço segurado consta da apólice e a mudança precisa ser comunicada à seguradora, com endosso. Manter isso atualizado é essencial para a cobertura valer no local certo." },
      { question: "A Patro Seguros tem escritório na Vila Olímpia?", answer: "Não. A corretora é sediada em Guarulhos, na Cidade Maia, e atende empresas da Vila Olímpia de forma remota, com reuniões on-line em todas as etapas." },
      { question: "Como é feita a análise para cotar seguro para empresa na Vila Olímpia?", answer: "Levantamos atividade, endereço, valores de equipamentos e conteúdo, dependência de sistemas e impacto de uma parada. Depois comparamos propostas com o mesmo padrão de cobertura entre as seguradoras parceiras." },
    ],
  },

  pinheiros: {
    slug: "seguro-empresarial-pinheiros",
    title: "Seguro Empresarial em Pinheiros SP | Patro Seguros",
    metaDescription:
      "Seguro empresarial em Pinheiros: cobertura para bares, restaurantes, estúdios criativos e lojas, com incêndio, RC e equipamentos. Patro Seguros.",
    intro: [
      "Pinheiros tem uma das misturas comerciais mais diversas de São Paulo: bares e restaurantes, estúdios criativos, lojas de rua, empresas de tecnologia e serviços instalados em casas convertidas ou em edifícios novos.",
      "A Patro Seguros, sediada em Guarulhos, atende empresas de Pinheiros com levantamento de atividade e comparação entre as seguradoras parceiras.",
    ],
    contexto: [
      "Imóveis adaptados são regra no bairro. Uma casa que virou restaurante ou estúdio raramente tem a instalação elétrica dimensionada para o novo uso, o que torna danos elétricos e incêndio pontos centrais da apólice.",
      "A operação noturna de bares e restaurantes acrescenta exposição: público no local até tarde, fachadas de vidro e movimentação na calçada.",
      "Estúdios criativos e produtoras costumam guardar equipamentos e material de clientes dentro do espaço, o que exige limites declarados e atenção à cobertura de bens de terceiros.",
    ],
    quemContrata: [
      "Bares, restaurantes, cafés e casas noturnas",
      "Estúdios criativos, produtoras e agências",
      "Lojas de rua, brechós e comércio especializado",
      "Empresas de tecnologia e serviços em imóveis adaptados",
      "Prestadores de serviço e pequenos escritórios",
    ],
    riscos: [
      { title: "Incêndio em imóvel adaptado", description: "Instalação antiga somada a cozinha ou equipamentos de alta demanda eleva a exposição." },
      { title: "Danos a vidros e fachada", description: "Portas e vitrines envidraçadas com movimento na calçada, inclusive à noite." },
      { title: "Responsabilidade civil com público", description: "Acidentes com clientes e danos a pertences no interior do estabelecimento." },
      { title: "Roubo de equipamentos e caixa", description: "Equipamentos de produção e valores em operação com atendimento presencial." },
      { title: "Bens de terceiros sob guarda", description: "Material de clientes deixado no estúdio ou na loja precisa de cobertura específica." },
    ],
    segmentos: [
      { title: "Bares e restaurantes", description: "Cozinha, público e operação noturna pedem incêndio, RC e vidros bem dimensionados." },
      { title: "Estúdios e produtoras", description: "Equipamentos de alto valor e bens de terceiros exigem relação declarada de itens." },
      { title: "Lojas de rua", description: "Estoque, vitrine e fluxo de pedestres concentram roubo, vidros e RC." },
      { title: "Tecnologia e serviços", description: "Dependência de equipamentos e de energia coloca danos elétricos no centro da apólice." },
    ],
    pme: [
      "A maioria dos negócios do bairro é de pequeno porte, muitos com sócios operando no dia a dia. Para esse perfil, a apólice deve mirar o evento que interrompe a operação, não a cobertura mais completa do mercado.",
      "Incêndio, danos elétricos, roubo, vidros e responsabilidade civil formam a base que costuma fazer sentido para começar, com espaço para incluir lucros cessantes conforme o faturamento.",
    ],
    faqs: [
      { question: "Meu restaurante funciona em uma casa antiga adaptada. Isso dificulta a contratação?", answer: "Não impede, mas influencia a análise da seguradora, que costuma perguntar sobre instalação elétrica, sistema de combate a incêndio e uso de gás. Ter essas informações organizadas agiliza a cotação." },
      { question: "Equipamentos de clientes guardados no estúdio estão cobertos?", answer: "Só com cobertura de bens de terceiros sob guarda, que é adicional e tem limite próprio. Sem essa garantia, a apólice cobre o patrimônio da empresa, não o material de clientes." },
      { question: "A vitrine quebrada de madrugada tem cobertura?", answer: "Se houver cobertura de quebra de vidros contratada, sim, respeitados limite e franquia. Em operações de rua com fachada envidraçada, é uma das garantias mais acionadas." },
      { question: "A Patro Seguros tem escritório em Pinheiros?", answer: "Não. A corretora é sediada em Guarulhos, na Cidade Maia, e atende empresas de Pinheiros por WhatsApp, telefone, e-mail e reuniões on-line." },
      { question: "Preciso de responsabilidade civil se meu bar tem seguro contra incêndio?", answer: "São coberturas diferentes. Incêndio protege o patrimônio; responsabilidade civil atende danos causados a clientes e terceiros. Para operação com público no local, as duas costumam andar juntas." },
      { question: "Como cotar seguro para comércio em Pinheiros?", answer: "Informe atividade, metragem, valor de conteúdo e estoque, se o imóvel é alugado e o horário de funcionamento, inclusive noturno. Com isso comparamos propostas com o mesmo padrão de cobertura." },
    ],
  },

  brooklin: {
    slug: "seguro-empresarial-brooklin",
    title: "Seguro Empresarial no Brooklin SP | Patro Seguros",
    metaDescription:
      "Seguro empresarial no Brooklin: proteção para escritórios da Berrini, comércio de bairro e prestadores de serviço, com RC e equipamentos. Patro Seguros.",
    intro: [
      "O Brooklin reúne escritórios corporativos no eixo Berrini–Nações Unidas e um comércio de bairro consolidado nas ruas do Brooklin Velho, com padarias, restaurantes, clínicas e prestadores de serviço.",
      "A Patro Seguros é sediada em Guarulhos e atende empresas das duas realidades do bairro, com levantamento de riscos e cotação comparada.",
    ],
    contexto: [
      "No eixo corporativo, as empresas ocupam conjuntos em torres e concentram valor em equipamentos de TI e benfeitorias das salas. A exigência de seguro no contrato de locação é comum e costuma definir um limite mínimo de incêndio.",
      "No comércio de bairro, o cenário é outro: ponto de rua, estoque, atendimento direto ao público e vitrine exposta. As coberturas mais acionadas mudam completamente.",
      "Prestadores de serviço que atuam na casa do cliente têm ainda uma exposição adicional: danos causados fora do endereço segurado, situação que exige cláusula específica de responsabilidade civil.",
    ],
    quemContrata: [
      "Escritórios corporativos e filiais instaladas em torres da Berrini",
      "Comércio de rua, padarias, restaurantes e mercados de bairro",
      "Clínicas, consultórios e serviços de saúde",
      "Prestadores de serviço que atendem no endereço do cliente",
      "Pequenas indústrias leves, oficinas e depósitos de apoio",
    ],
    riscos: [
      { title: "Incêndio e danos elétricos", description: "Vale tanto para o conjunto comercial quanto para o ponto de rua, com pesos diferentes." },
      { title: "Roubo de mercadoria e equipamentos", description: "Estoques e equipamentos de TI concentrados no endereço segurado." },
      { title: "Responsabilidade civil de operações", description: "Inclui danos causados a clientes no ponto e, com cláusula específica, fora dele." },
      { title: "Danos a vidros e fachadas", description: "Relevante para o comércio de rua com vitrine." },
      { title: "Parada de atividade", description: "Interdição do ponto ou da sala com manutenção de aluguel, folha e contratos." },
    ],
    segmentos: [
      { title: "Escritórios corporativos", description: "Equipamentos de TI, benfeitorias da sala e exigências contratuais de seguro na locação." },
      { title: "Comércio de bairro", description: "Estoque, vitrine, caixa e atendimento presencial definem as prioridades." },
      { title: "Clínicas e serviços de saúde", description: "Equipamentos declarados e responsabilidade civil sobre pacientes no estabelecimento." },
      { title: "Prestadores de serviço externos", description: "Danos causados na casa ou na empresa do cliente exigem RC ampliada." },
    ],
    pme: [
      "Para o pequeno negócio do Brooklin Velho, o objetivo prático do seguro é impedir que um incêndio, um roubo ou uma queima de equipamentos interrompa a operação por tempo indeterminado.",
      "Já para a pequena empresa em conjunto comercial, o foco costuma ser atender à exigência do contrato de locação e, a partir dela, montar cobertura real para equipamentos e responsabilidade civil.",
    ],
    faqs: [
      { question: "O contrato do meu conjunto comercial exige seguro. O mínimo basta?", answer: "O mínimo contratual atende ao proprietário, normalmente só incêndio. Ele não protege seus equipamentos, benfeitorias nem a responsabilidade civil da operação — vale usar esse mínimo como ponto de partida, não como solução." },
      { question: "Presto serviço na casa do cliente. O seguro cobre danos lá?", answer: "Só com cláusula de responsabilidade civil que contemple operações fora do endereço segurado. A cobertura padrão vale para o local indicado na apólice, então esse ponto precisa ser tratado na cotação." },
      { question: "Comércio de rua e escritório na Berrini têm a mesma apólice?", answer: "O produto é o mesmo, mas a montagem é bem diferente. No comércio pesam estoque, vidros e roubo; no escritório, equipamentos de TI, danos elétricos e benfeitorias da sala." },
      { question: "A Patro Seguros tem unidade no Brooklin?", answer: "Não. A corretora é sediada em Guarulhos, na Cidade Maia, e atende empresas do Brooklin de forma digital, do levantamento de riscos ao acompanhamento de sinistro." },
      { question: "Tenho um depósito de apoio. Ele entra na mesma apólice?", answer: "Cada endereço precisa estar declarado. É possível ter mais de um local na mesma apólice ou apólices separadas, dependendo da seguradora e da natureza do que é armazenado." },
      { question: "Como comparar seguro para empresa no Brooklin?", answer: "Compare sempre com o mesmo padrão de cobertura: mesmos limites, mesmas garantias e mesmas franquias. É esse método que usamos ao cotar com as seguradoras parceiras." },
    ],
  },

  "vila-mariana": {
    slug: "seguro-empresarial-vila-mariana",
    title: "Seguro Empresarial na Vila Mariana SP | Patro Seguros",
    metaDescription:
      "Seguro empresarial na Vila Mariana: cobertura para consultórios, escolas, comércio de rua e escritórios, com equipamentos e RC. Patro Seguros.",
    intro: [
      "A Vila Mariana tem uma economia local diversificada: consultórios e clínicas ligados aos hospitais da região, escolas e cursos, comércio de rua, restaurantes e escritórios de serviços.",
      "A Patro Seguros é uma corretora sediada em Guarulhos que atende essas empresas com análise da atividade e cotação comparada entre as seguradoras parceiras.",
    ],
    contexto: [
      "A concentração de serviços de saúde no entorno gera muitos consultórios em salas comerciais. Nesses casos, equipamentos e continuidade da agenda concentram a preocupação, mais do que estoque.",
      "O comércio de rua do bairro, com fluxo de pedestres constante perto das estações de metrô, tem exposição maior a acidentes com clientes e a danos em fachada e vitrine.",
      "Escolas, cursos e espaços com circulação de público têm um ponto de atenção próprio: responsabilidade civil por acidentes envolvendo alunos e visitantes dentro do estabelecimento.",
    ],
    quemContrata: [
      "Consultórios, clínicas e laboratórios de apoio",
      "Escolas, cursos livres e espaços de formação",
      "Comércio de rua e serviços de vizinhança",
      "Restaurantes, cafés e padarias",
      "Escritórios de serviços e pequenas empresas em salas comerciais",
    ],
    riscos: [
      { title: "Danos elétricos a equipamentos", description: "Equipamentos clínicos, de laboratório e de ensino são sensíveis a oscilação de tensão." },
      { title: "Responsabilidade civil com público", description: "Pacientes, alunos e clientes circulando no estabelecimento." },
      { title: "Incêndio e explosão", description: "Cobertura básica, com peso extra em operações com cozinha ou material inflamável." },
      { title: "Roubo de equipamentos e valores", description: "Pontos de rua e salas comerciais com equipamentos portáteis." },
      { title: "Interrupção da atividade", description: "Agenda de atendimentos ou calendário de aulas suspenso por interdição do ponto." },
    ],
    segmentos: [
      { title: "Consultórios e clínicas", description: "Equipamentos declarados, RC e continuidade do atendimento formam o núcleo da apólice." },
      { title: "Escolas e cursos", description: "Circulação de alunos e responsabilidade civil bem dimensionada são prioridade." },
      { title: "Comércio e alimentação", description: "Estoque, vidros, roubo e RC concentram os acionamentos." },
      { title: "Escritórios de serviços", description: "Equipamentos de TI, documentos e benfeitorias das salas." },
    ],
    pme: [
      "A maior parte das empresas do bairro é de pequeno porte e depende de um único endereço. Nesse cenário, a interrupção da atividade costuma doer mais do que a perda patrimonial em si.",
      "Uma apólice com incêndio, danos elétricos, roubo e responsabilidade civil bem dimensionada resolve a maioria dos cenários, e lucros cessantes entra quando o caixa não suporta uma parada.",
    ],
    faqs: [
      { question: "Tenho consultório em sala comercial. O seguro do prédio não basta?", answer: "Não basta. A apólice do condomínio cobre áreas comuns e a estrutura do edifício. Equipamentos, mobiliário, benfeitorias da sua sala e a responsabilidade civil do atendimento exigem apólice empresarial própria." },
      { question: "Escola precisa de responsabilidade civil maior?", answer: "Costuma precisar, sim. A circulação constante de alunos e responsáveis aumenta a chance de acidentes no estabelecimento, e o limite de RC deve refletir esse volume de pessoas." },
      { question: "Seguro empresarial cobre equipamentos de laboratório?", answer: "Pode cobrir pela garantia de equipamentos eletrônicos, geralmente com relação declarada de itens e valores. Equipamentos muito específicos podem ter condições próprias de aceitação, conferidas na cotação." },
      { question: "A Patro Seguros atende a Vila Mariana presencialmente?", answer: "A sede fica em Guarulhos, na Cidade Maia. As empresas da Vila Mariana são atendidas de forma digital, com reunião on-line para levantamento e apresentação das opções." },
      { question: "O que muda se meu ponto for alugado?", answer: "A estrutura é do proprietário, mas as benfeitorias que a empresa fez e todo o conteúdo são responsabilidade sua. Além disso, o contrato pode exigir uma cobertura mínima de incêndio em favor do locador." },
      { question: "Como solicitar cotação de seguro PME na Vila Mariana?", answer: "Envie CNAE, metragem, equipamentos relevantes, valor aproximado de conteúdo e horário de funcionamento. Cotamos nas seguradoras parceiras e explicamos as diferenças antes de você decidir." },
    ],
  },

  "campo-belo": {
    slug: "seguro-empresarial-campo-belo",
    title: "Seguro Empresarial no Campo Belo SP | Patro Seguros",
    metaDescription:
      "Seguro empresarial no Campo Belo: proteção para comércio de bairro, clínicas e escritórios próximos a Congonhas, com RC e equipamentos. Patro Seguros.",
    intro: [
      "A atividade econômica do Campo Belo é de escala local: comércio de rua, restaurantes, clínicas, escritórios de serviços e operações ligadas ao movimento do aeroporto de Congonhas.",
      "A Patro Seguros, sediada em Guarulhos, atende essas empresas com levantamento de riscos e comparação entre as seguradoras parceiras.",
    ],
    contexto: [
      "O comércio do bairro atende principalmente moradores e trabalhadores da região, com pontos de rua e vitrines expostas ao fluxo diário — perfil em que vidros, roubo e responsabilidade civil concentram os acionamentos.",
      "Empresas ligadas a serviços de viagem, hospedagem e apoio ao aeroporto lidam com bens de terceiros e circulação constante de pessoas, o que exige atenção à responsabilidade civil e à guarda de pertences.",
      "Em edifícios comerciais mais antigos do bairro, a instalação elétrica é um ponto recorrente de atenção para operações que dependem de equipamentos.",
    ],
    quemContrata: [
      "Comércio de rua e serviços de vizinhança",
      "Restaurantes, cafés e padarias",
      "Clínicas, consultórios e serviços de saúde",
      "Escritórios, agências e prestadores de serviço",
      "Operações de apoio a viagens, hospedagem e transporte",
    ],
    riscos: [
      { title: "Incêndio e danos elétricos", description: "Cobertura básica, com atenção redobrada em imóveis comerciais mais antigos." },
      { title: "Roubo de mercadoria, equipamentos e caixa", description: "Pontos de rua com atendimento presencial e movimento diário." },
      { title: "Danos a vidros e vitrines", description: "Fachadas envidraçadas expostas a impacto e vandalismo." },
      { title: "Responsabilidade civil de operações", description: "Acidentes com clientes dentro do estabelecimento ou na área de acesso." },
      { title: "Bens de terceiros sob guarda", description: "Pertences de clientes deixados na empresa exigem cobertura específica." },
    ],
    segmentos: [
      { title: "Comércio e alimentação", description: "Estoque, cozinha, vidros e público no salão definem as coberturas prioritárias." },
      { title: "Clínicas e consultórios", description: "Equipamentos declarados e responsabilidade civil sobre pacientes atendidos no local." },
      { title: "Escritórios e agências", description: "Equipamentos de TI, documentos e benfeitorias das salas." },
      { title: "Serviços de apoio a viagens", description: "Circulação de pessoas e guarda temporária de pertences de clientes." },
    ],
    pme: [
      "Para o pequeno comércio do Campo Belo, a apólice precisa cobrir o que faz o negócio parar: fogo, queima de equipamentos, roubo e um acidente com cliente dentro da loja.",
      "Quando o ponto é alugado, também vale checar a exigência de seguro no contrato e incluir as benfeitorias feitas pela empresa no valor segurado.",
    ],
    faqs: [
      { question: "Guardo pertences de clientes na minha loja. Isso é coberto?", answer: "Só com a cobertura de bens de terceiros sob guarda, que é adicional e tem limite próprio. A apólice padrão protege o patrimônio da empresa, não os bens de clientes deixados no local." },
      { question: "Vitrine quebrada entra em qual cobertura?", answer: "Na quebra de vidros, que é uma garantia específica e bastante contratada por comércio de rua. Confira limite e franquia, porque vitrines maiores podem exigir limite acima do padrão." },
      { question: "Minha empresa fica em prédio comercial antigo. O que priorizar?", answer: "Danos elétricos com limite adequado, incêndio como base e equipamentos declarados quando a operação depende deles. A idade da instalação costuma justificar esse reforço." },
      { question: "A Patro Seguros tem escritório no Campo Belo?", answer: "Não. A corretora é sediada em Guarulhos, na Cidade Maia, e atende as empresas do bairro de forma digital, com reuniões on-line quando necessário." },
      { question: "Preciso de seguro se meu ponto é alugado?", answer: "Sim, e por dois motivos: o contrato costuma exigir cobertura mínima de incêndio em favor do proprietário e, além disso, o conteúdo e as benfeitorias da sua operação são responsabilidade sua." },
      { question: "Como cotar seguro para comércio no Campo Belo?", answer: "Informe atividade, metragem, valor de conteúdo e estoque, equipamentos e horário de funcionamento. Cotamos nas seguradoras parceiras com o mesmo padrão de cobertura e apresentamos a comparação." },
    ],
  },

  perdizes: {
    slug: "seguro-empresarial-perdizes",
    title: "Seguro Empresarial em Perdizes SP | Patro Seguros",
    metaDescription:
      "Seguro empresarial em Perdizes: cobertura para comércio de vizinhança, consultórios, escolas e escritórios, com RC e equipamentos. Patro Seguros.",
    intro: [
      "A economia de Perdizes é de vizinhança: padarias, restaurantes, papelarias, consultórios, escolas, cursos e escritórios de profissionais liberais instalados em casas adaptadas e pequenos edifícios comerciais.",
      "A Patro Seguros é uma corretora sediada em Guarulhos que atende esses negócios de forma consultiva e remota.",
    ],
    contexto: [
      "A presença de universidades na região sustenta um comércio voltado a estudantes e a serviços de apoio, com movimento concentrado em horários específicos e picos ao longo do calendário acadêmico.",
      "Muitos pontos comerciais funcionam em casas adaptadas, o que exige atenção às benfeitorias feitas pela empresa e à adequação da instalação elétrica ao novo uso.",
      "Escolas, cursos e espaços com circulação de alunos têm exposição relevante a acidentes com terceiros dentro do estabelecimento, o que dá peso à responsabilidade civil.",
    ],
    quemContrata: [
      "Comércio de vizinhança, papelarias e serviços locais",
      "Padarias, restaurantes, cafés e lanchonetes",
      "Consultórios, clínicas e serviços de saúde",
      "Escolas, cursos e espaços de formação",
      "Escritórios de profissionais liberais e pequenas empresas de serviços",
    ],
    riscos: [
      { title: "Incêndio em imóvel adaptado", description: "Casas convertidas em comércio podem ter instalação não dimensionada para a nova atividade." },
      { title: "Danos elétricos", description: "Equipamentos de cozinha, de ensino e de atendimento sensíveis a oscilação de tensão." },
      { title: "Responsabilidade civil com público", description: "Alunos, pacientes e clientes circulando no estabelecimento." },
      { title: "Roubo de mercadoria e caixa", description: "Operações de rua com movimento concentrado em horários de pico." },
      { title: "Parada da operação", description: "Ponto interditado interrompe atendimento, aulas ou vendas com custos fixos mantidos." },
    ],
    segmentos: [
      { title: "Comércio de vizinhança", description: "Estoque, caixa, vidros e atendimento presencial definem a base da apólice." },
      { title: "Alimentação", description: "Cozinha e público no salão exigem incêndio e responsabilidade civil bem calculados." },
      { title: "Consultórios e clínicas", description: "Equipamentos declarados e RC de operações com pacientes atendidos no local." },
      { title: "Escolas e cursos", description: "Circulação de alunos e responsáveis pede limite de RC compatível com o volume de pessoas." },
    ],
    pme: [
      "Em negócios de bairro, o seguro raramente precisa ser sofisticado: precisa ser bem dimensionado. Conteúdo declarado corretamente e limites coerentes valem mais do que uma lista longa de coberturas simbólicas.",
      "Quando os sócios operam o próprio ponto, uma parada por sinistro significa perda direta de renda familiar — cenário em que despesas fixas e lucros cessantes merecem ser cotados.",
    ],
    faqs: [
      { question: "Meu ponto funciona em uma casa adaptada. Consigo contratar seguro empresarial?", answer: "Consegue. A seguradora vai considerar a atividade e as condições do imóvel, incluindo instalação elétrica e prevenção de incêndio. Ter essas informações em mãos torna a cotação mais rápida e precisa." },
      { question: "As benfeitorias que fiz no imóvel alugado estão cobertas?", answer: "Só se estiverem declaradas no valor segurado. Divisórias, balcões, instalações e revestimentos feitos pela empresa pertencem à operação e precisam entrar na conta do conteúdo." },
      { question: "Escola em Perdizes precisa de que cobertura extra?", answer: "O ponto mais sensível é a responsabilidade civil, pelo volume de alunos e responsáveis circulando. Equipamentos de ensino e danos elétricos também costumam entrar na análise." },
      { question: "A Patro Seguros tem escritório em Perdizes?", answer: "Não. A corretora é sediada em Guarulhos, na Cidade Maia, e atende as empresas do bairro por WhatsApp, telefone, e-mail e reuniões on-line." },
      { question: "Vale contratar lucros cessantes em comércio pequeno?", answer: "Vale cotar para comparar. Se o negócio depende de um único ponto e os sócios vivem do faturamento mensal, o custo dessa cobertura costuma ser pequeno diante do impacto de uma parada." },
      { question: "Como pedir cotação de seguro PME em Perdizes?", answer: "Informe atividade, metragem, valor de conteúdo e estoque, equipamentos relevantes e se o imóvel é alugado. Comparamos as seguradoras parceiras com o mesmo padrão de cobertura." },
    ],
  },
};

export const residencialBairroSlugs = Object.values(residencialBairrosSp).map((r) => r.slug);
export const empresarialBairroSlugs = Object.values(empresarialBairrosSp).map((e) => e.slug);
export const produtosBairroPaths = [
  ...bairroGrupoAHubPaths,
  ...residencialBairroSlugs.map((s) => `/${s}`),
  ...empresarialBairroSlugs.map((s) => `/${s}`),
];
