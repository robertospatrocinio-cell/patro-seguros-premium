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
  cidades: string[];
}

export interface RegiaoNacional {
  slug: string;
  nome: string;
  titulo: string;
  resumo: string;
  intro: string[];
  destaques: string[];
  estados: EstadoNacional[];
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
    estados: [
      { uf: "PR", nome: "Paraná", cidades: ["Curitiba", "Londrina", "Maringá", "Cascavel", "Ponta Grossa", "Toledo"] },
      { uf: "SC", nome: "Santa Catarina", cidades: ["Florianópolis", "Joinville", "Blumenau", "Chapecó", "Itajaí"] },
      { uf: "RS", nome: "Rio Grande do Sul", cidades: ["Porto Alegre", "Caxias do Sul", "Passo Fundo", "Santa Maria", "Cruz Alta"] },
    ],
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
    estados: [
      { uf: "SP", nome: "São Paulo (interior e litoral)", cidades: ["Campinas", "Ribeirão Preto", "Sorocaba", "São José dos Campos", "Piracicaba", "Bauru", "Presidente Prudente"] },
      { uf: "MG", nome: "Minas Gerais", cidades: ["Belo Horizonte", "Uberlândia", "Uberaba", "Patos de Minas", "Montes Claros"] },
      { uf: "RJ", nome: "Rio de Janeiro", cidades: ["Rio de Janeiro", "Niterói", "Campos dos Goytacazes", "Volta Redonda"] },
      { uf: "ES", nome: "Espírito Santo", cidades: ["Vitória", "Serra", "Linhares", "Cachoeiro de Itapemirim"] },
    ],
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
    estados: [
      { uf: "MT", nome: "Mato Grosso", cidades: ["Cuiabá", "Rondonópolis", "Sinop", "Sorriso", "Lucas do Rio Verde", "Primavera do Leste"] },
      { uf: "MS", nome: "Mato Grosso do Sul", cidades: ["Campo Grande", "Dourados", "Três Lagoas", "Maracaju"] },
      { uf: "GO", nome: "Goiás", cidades: ["Goiânia", "Rio Verde", "Jataí", "Anápolis", "Cristalina"] },
      { uf: "DF", nome: "Distrito Federal", cidades: ["Brasília"] },
    ],
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
    estados: [
      { uf: "BA", nome: "Bahia", cidades: ["Salvador", "Luís Eduardo Magalhães", "Barreiras", "Feira de Santana", "Juazeiro"] },
      { uf: "MA", nome: "Maranhão", cidades: ["São Luís", "Balsas", "Imperatriz"] },
      { uf: "PI", nome: "Piauí", cidades: ["Teresina", "Uruçuí", "Bom Jesus"] },
      { uf: "PE", nome: "Pernambuco", cidades: ["Recife", "Petrolina", "Caruaru"] },
      { uf: "CE", nome: "Ceará", cidades: ["Fortaleza", "Juazeiro do Norte", "Sobral"] },
      { uf: "RN, PB, AL e SE", nome: "Demais estados", cidades: ["Natal", "Mossoró", "João Pessoa", "Maceió", "Aracaju"] },
    ],
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
    estados: [
      { uf: "TO", nome: "Tocantins", cidades: ["Palmas", "Araguaína", "Gurupi", "Porto Nacional"] },
      { uf: "PA", nome: "Pará", cidades: ["Belém", "Paragominas", "Marabá", "Santarém"] },
      { uf: "RO", nome: "Rondônia", cidades: ["Porto Velho", "Vilhena", "Ji-Paraná"] },
      { uf: "AM, AC, RR e AP", nome: "Demais estados", cidades: ["Manaus", "Rio Branco", "Boa Vista", "Macapá"] },
    ],
    faqs: faqsComuns("na Região Norte"),
  },
];

export const regiaoPath = (slug: string) => `${ATENDIMENTO_NACIONAL_PATH}/${slug}`;
