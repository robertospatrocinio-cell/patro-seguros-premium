/**
 * Atendimento nacional (fora de Guarulhos). Regiões, estados e cidades de referência
 * são exemplos geográficos de polos agrícolas, logísticos e empresariais — NÃO
 * representam carteira de clientes. Atendimento remoto (WhatsApp, e-mail, vídeo).
 */
export const ATENDIMENTO_NACIONAL_PATH = "/atendimento-nacional";

export interface ProdutoNacional {
  label: string;
  href: string;
  grupo: "Agronegócio" | "Transporte e frotas" | "Empresas e saúde PME" | "Pessoas";
}

export const produtosNacionais: ProdutoNacional[] = [
  { label: "Seguro Rural", href: "/seguro-rural", grupo: "Agronegócio" },
  { label: "Máquinas Agrícolas", href: "/seguro-maquinas-agricolas", grupo: "Agronegócio" },
  { label: "Transporte Agro", href: "/seguro-transporte-agro", grupo: "Agronegócio" },
  { label: "Seguro Drone", href: "/seguro-drone", grupo: "Agronegócio" },
  { label: "RETA Drone", href: "/seguro-reta-drone", grupo: "Agronegócio" },
  { label: "Seguro Frota", href: "/seguro-frota", grupo: "Transporte e frotas" },
  { label: "Seguro Caminhão", href: "/seguro-caminhao", grupo: "Transporte e frotas" },
  { label: "Seguro APP Passageiros", href: "/seguro-acidentes-pessoais-passageiros", grupo: "Transporte e frotas" },
  { label: "Seguro Empresarial", href: "/seguro-empresarial", grupo: "Empresas e saúde PME" },
  { label: "Plano de Saúde Empresarial", href: "/plano-saude-empresarial", grupo: "Empresas e saúde PME" },
  { label: "Seguro Cyber", href: "/seguro-cyber", grupo: "Empresas e saúde PME" },
  { label: "Responsabilidade Civil", href: "/seguro-rc", grupo: "Empresas e saúde PME" },
  { label: "Seguro Auto", href: "/seguro-auto", grupo: "Pessoas" },
  { label: "Consórcio", href: "/consorcio", grupo: "Pessoas" },
];

export interface EstadoNacional {
  uf: string;
  nome: string;
  /** Slug usado na URL (/atendimento-nacional/estado/<slug>). */
  slug: string;
  regiao: string;
  cidades: string[];
  /** Perfil econômico resumido (conhecimento público geral, sem dados de carteira). */
  perfil: string;
  foco: "agro" | "empresas" | "logistica";
}

export interface RegiaoNacional {
  slug: string;
  nome: string;
  titulo: string;
  resumo: string;
  intro: string[];
  destaques: string[];
  faqs: { question: string; answer: string }[];
}

const faqsComuns = (regiao: string) => [
  {
    question: `A Patro Seguros atende clientes em ${regiao} sem escritório local?`,
    answer:
      "Sim. O atendimento é feito de forma remota por WhatsApp, e-mail e videochamada. A apólice é emitida pela seguradora escolhida, que tem cobertura e rede de atendimento nacionais conforme as condições contratadas.",
  },
  {
    question: "Como funciona a vistoria ou a análise de risco à distância?",
    answer:
      "Depende do produto e da seguradora. Em muitos casos a vistoria é feita por aplicativo, por fotos ou por empresa credenciada da seguradora na sua cidade. Informamos o procedimento exato na cotação.",
  },
  {
    question: "E em caso de sinistro, quem me atende?",
    answer:
      "Você aciona seu consultor da Patro pelo WhatsApp e também pode usar a central 24h da seguradora. Nós orientamos a documentação e acompanhamos o processo junto à seguradora até a conclusão.",
  },
  {
    question: "Quanto custa o seguro na minha região?",
    answer:
      "O valor depende de análise do risco (atividade, bens, localização, histórico e coberturas escolhidas). Não trabalhamos com preço tabelado: enviamos a cotação comparando seguradoras parceiras.",
  },
];

export const regioesNacionais: RegiaoNacional[] = [
  {
    slug: "sul",
    nome: "Região Sul",
    titulo: "Seguros na Região Sul",
    resumo: "Agro, cooperativas, transporte e indústria no PR, SC e RS.",
    intro: [
      "A Região Sul reúne produção de grãos, proteína animal, cooperativas e um forte setor de transporte rodoviário e indústria. A Patro Seguros atende produtores, transportadoras e empresas do Paraná, Santa Catarina e Rio Grande do Sul de forma remota.",
      "Fazemos a análise do risco, comparamos seguradoras parceiras e acompanhamos a apólice e eventuais sinistros sem que você precise se deslocar.",
    ],
    destaques: ["Seguro rural e de máquinas agrícolas", "Frotas e transporte de cargas", "Seguro empresarial para indústria e comércio", "Saúde PME para equipes"],
    faqs: faqsComuns("na Região Sul"),
  },
  {
    slug: "sudeste",
    nome: "Região Sudeste",
    titulo: "Seguros na Região Sudeste",
    resumo: "Empresas, logística, saúde PME e agro em SP, MG, RJ e ES.",
    intro: [
      "Com sede em Guarulhos/SP, a Patro Seguros atende também o interior paulista e os demais estados do Sudeste. A região concentra polos logísticos, indústria, serviços e áreas agrícolas de cana, café, laranja e grãos.",
      "Para quem está fora da Grande São Paulo, o atendimento é remoto, com o mesmo acompanhamento consultivo de cotação, contratação e pós-venda.",
    ],
    destaques: ["Seguro empresarial e responsabilidade civil", "Plano de saúde empresarial", "Frotas e caminhões", "Rural, máquinas e drones agrícolas"],
    faqs: faqsComuns("no Sudeste, fora da Grande São Paulo"),
  },
  {
    slug: "centro-oeste",
    nome: "Região Centro-Oeste",
    titulo: "Seguros na Região Centro-Oeste",
    resumo: "Grãos, pecuária, máquinas, drones e transporte em MT, MS, GO e DF.",
    intro: [
      "O Centro-Oeste é uma das principais fronteiras agrícolas do país, com grandes áreas de soja, milho, algodão e pecuária, além de intenso transporte rodoviário da safra.",
      "A Patro Seguros atende produtores rurais, operadores de drones agrícolas, transportadoras e empresas da região de forma remota, com análise técnica de cada operação.",
    ],
    destaques: ["Seguro rural e pecuário", "Máquinas e implementos agrícolas", "Drone agrícola (casco e RETA)", "Transporte agro e frotas"],
    faqs: faqsComuns("no Centro-Oeste"),
  },
  {
    slug: "nordeste",
    nome: "Região Nordeste",
    titulo: "Seguros na Região Nordeste",
    resumo: "Agro do Matopiba, fruticultura, comércio e logística no Nordeste.",
    intro: [
      "O Nordeste combina polos agrícolas como o oeste baiano, o sul do Maranhão e do Piauí (Matopiba) e a fruticultura irrigada, com capitais de comércio, serviços e logística portuária.",
      "A Patro Seguros atende produtores, empresas e frotas nordestinas de forma remota, comparando seguradoras com atuação nacional.",
    ],
    destaques: ["Seguro rural e máquinas agrícolas", "Drones agrícolas", "Seguro empresarial e saúde PME", "Frotas e caminhões"],
    faqs: faqsComuns("no Nordeste"),
  },
  {
    slug: "norte",
    nome: "Região Norte",
    titulo: "Seguros na Região Norte",
    resumo: "Agro em expansão, transporte e empresas em TO, PA, RO e demais estados.",
    intro: [
      "Na Região Norte, a agricultura e a pecuária crescem em estados como Tocantins, Pará e Rondônia, ao lado de polos industriais e de logística fluvial e rodoviária.",
      "A Patro Seguros atende produtores, transportadoras e empresas da região de forma remota, sempre verificando a disponibilidade de cada seguradora para a localidade.",
    ],
    destaques: ["Seguro rural e pecuário", "Máquinas agrícolas e drones", "Transporte e frotas", "Seguro empresarial"],
    faqs: faqsComuns("na Região Norte"),
  },
];

export const regiaoPath = (slug: string) => `${ATENDIMENTO_NACIONAL_PATH}/${slug}`;

const e = (
  regiao: string, uf: string, nome: string, slug: string, foco: EstadoNacional["foco"], perfil: string, cidades: string[],
): EstadoNacional => ({ regiao, uf, nome, slug, foco, perfil, cidades });

export const estadosNacionais: EstadoNacional[] = [
  // Sul
  e("sul", "PR", "Paraná", "parana", "agro", "O Paraná combina produção de grãos, cooperativas agroindustriais, avicultura e um polo industrial e logístico ligado ao Porto de Paranaguá.", ["Curitiba", "Londrina", "Maringá", "Cascavel", "Ponta Grossa", "Toledo"]),
  e("sul", "SC", "Santa Catarina", "santa-catarina", "empresas", "Santa Catarina tem indústria diversificada, forte agroindústria de proteína animal no oeste e portos movimentados no litoral.", ["Florianópolis", "Joinville", "Blumenau", "Chapecó", "Itajaí"]),
  e("sul", "RS", "Rio Grande do Sul", "rio-grande-do-sul", "agro", "O Rio Grande do Sul reúne lavouras de soja, arroz e trigo, pecuária, indústria metalmecânica e intenso transporte rodoviário.", ["Porto Alegre", "Caxias do Sul", "Passo Fundo", "Santa Maria", "Cruz Alta"]),
  // Sudeste
  e("sudeste", "SP", "São Paulo (interior e litoral)", "sao-paulo-interior", "empresas", "O interior e o litoral paulista concentram indústria, centros de distribuição, cana-de-açúcar, laranja e café, além do Porto de Santos.", ["Campinas", "Ribeirão Preto", "Sorocaba", "São José dos Campos", "Piracicaba", "Bauru", "Santos"]),
  e("sudeste", "MG", "Minas Gerais", "minas-gerais", "agro", "Minas Gerais tem forte produção de café, leite e grãos no Triângulo e no Alto Paranaíba, além de mineração e indústria.", ["Belo Horizonte", "Uberlândia", "Uberaba", "Patos de Minas", "Montes Claros"]),
  e("sudeste", "RJ", "Rio de Janeiro", "rio-de-janeiro", "empresas", "O Rio de Janeiro concentra serviços, comércio, energia e logística portuária, com agropecuária no norte e noroeste fluminense.", ["Rio de Janeiro", "Niterói", "Campos dos Goytacazes", "Volta Redonda"]),
  e("sudeste", "ES", "Espírito Santo", "espirito-santo", "logistica", "O Espírito Santo se destaca na produção de café conilon, rochas ornamentais e na logística portuária.", ["Vitória", "Serra", "Linhares", "Cachoeiro de Itapemirim"]),
  // Centro-Oeste
  e("centro-oeste", "MT", "Mato Grosso", "mato-grosso", "agro", "Mato Grosso é um dos maiores produtores de soja, milho e algodão do país, com grande frota de máquinas e transporte rodoviário da safra.", ["Cuiabá", "Rondonópolis", "Sinop", "Sorriso", "Lucas do Rio Verde", "Primavera do Leste"]),
  e("centro-oeste", "MS", "Mato Grosso do Sul", "mato-grosso-do-sul", "agro", "Mato Grosso do Sul combina grãos, pecuária de corte, cana e celulose, com polos industriais em expansão.", ["Campo Grande", "Dourados", "Três Lagoas", "Maracaju"]),
  e("centro-oeste", "GO", "Goiás", "goias", "agro", "Goiás tem produção relevante de soja, milho, cana e pecuária, além de agroindústria e distribuição logística.", ["Goiânia", "Rio Verde", "Jataí", "Anápolis", "Cristalina"]),
  e("centro-oeste", "DF", "Distrito Federal", "distrito-federal", "empresas", "O Distrito Federal concentra serviços, comércio e empresas, com produção agrícola na região do PAD-DF.", ["Brasília"]),
  // Nordeste
  e("nordeste", "BA", "Bahia", "bahia", "agro", "A Bahia reúne o polo de grãos e algodão do oeste baiano, a fruticultura do Vale do São Francisco e um grande setor de comércio e serviços.", ["Salvador", "Luís Eduardo Magalhães", "Barreiras", "Feira de Santana", "Juazeiro"]),
  e("nordeste", "MA", "Maranhão", "maranhao", "agro", "O Maranhão integra o Matopiba, com soja e milho no sul do estado, e tem logística portuária em São Luís.", ["São Luís", "Balsas", "Imperatriz"]),
  e("nordeste", "PI", "Piauí", "piaui", "agro", "O Piauí tem fronteira agrícola de grãos no cerrado, no sul do estado, dentro da região do Matopiba.", ["Teresina", "Uruçuí", "Bom Jesus"]),
  e("nordeste", "PE", "Pernambuco", "pernambuco", "logistica", "Pernambuco combina o Porto de Suape, polos industriais e a fruticultura irrigada de Petrolina.", ["Recife", "Petrolina", "Caruaru"]),
  e("nordeste", "CE", "Ceará", "ceara", "empresas", "O Ceará tem comércio e serviços fortes, indústria e o complexo portuário do Pecém.", ["Fortaleza", "Juazeiro do Norte", "Sobral"]),
  e("nordeste", "RN", "Rio Grande do Norte", "rio-grande-do-norte", "empresas", "O Rio Grande do Norte reúne fruticultura irrigada, energia e comércio.", ["Natal", "Mossoró"]),
  e("nordeste", "PB", "Paraíba", "paraiba", "empresas", "A Paraíba concentra comércio, serviços e indústria nas regiões de João Pessoa e Campina Grande.", ["João Pessoa", "Campina Grande"]),
  e("nordeste", "AL", "Alagoas", "alagoas", "agro", "Alagoas tem tradição na cana-de-açúcar e um setor de comércio e serviços concentrado em Maceió.", ["Maceió", "Arapiraca"]),
  e("nordeste", "SE", "Sergipe", "sergipe", "empresas", "Sergipe combina comércio, serviços e agropecuária, com destaque para a região de Aracaju.", ["Aracaju", "Itabaiana"]),
  // Norte
  e("norte", "TO", "Tocantins", "tocantins", "agro", "Tocantins integra o Matopiba, com grãos e pecuária em expansão e logística ligada à Ferrovia Norte-Sul.", ["Palmas", "Araguaína", "Gurupi", "Porto Nacional"]),
  e("norte", "PA", "Pará", "para", "agro", "O Pará combina pecuária, grãos no sudeste e oeste do estado, mineração e logística fluvial.", ["Belém", "Paragominas", "Marabá", "Santarém"]),
  e("norte", "RO", "Rondônia", "rondonia", "agro", "Rondônia tem pecuária, grãos e café em expansão, com transporte rodoviário e fluvial.", ["Porto Velho", "Vilhena", "Ji-Paraná"]),
  e("norte", "AM", "Amazonas", "amazonas", "empresas", "O Amazonas concentra indústria e comércio na Zona Franca de Manaus, com logística fluvial.", ["Manaus"]),
  e("norte", "AC", "Acre", "acre", "empresas", "O Acre tem economia de comércio, serviços e agropecuária, com destaque para Rio Branco.", ["Rio Branco"]),
  e("norte", "RR", "Roraima", "roraima", "agro", "Roraima tem produção de grãos em expansão e comércio concentrado em Boa Vista.", ["Boa Vista"]),
  e("norte", "AP", "Amapá", "amapa", "empresas", "O Amapá concentra comércio e serviços em Macapá, com logística fluvial e portuária.", ["Macapá"]),
];

export const estadoPath = (slug: string) => `${ATENDIMENTO_NACIONAL_PATH}/estado/${slug}`;
export const estadosDaRegiao = (regiao: string) => estadosNacionais.filter((x) => x.regiao === regiao);

export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export interface CidadeNacional {
  nome: string;
  /** Slug único: cidade + UF (ex.: "sorriso-mt"). */
  slug: string;
  estado: EstadoNacional;
}

export const cidadesNacionais: CidadeNacional[] = estadosNacionais.flatMap((estado) =>
  estado.cidades.map((nome) => ({ nome, slug: `${slugify(nome)}-${estado.uf.toLowerCase()}`, estado })),
);

export const cidadePath = (slug: string) => `${ATENDIMENTO_NACIONAL_PATH}/cidade/${slug}`;
export const cidadeBySlug = (slug: string) => cidadesNacionais.find((c) => c.slug === slug);
