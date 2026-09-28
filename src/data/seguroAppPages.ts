import type { AppPageData } from "@/components/AppPassageirosPage";
import heroApp from "@/assets/lp-seguro-acidentes-pessoais.webp";
import heroMotorista from "@/assets/hero-seguro-motorista-app.webp";
import heroFrota from "@/assets/hero-seguro-frota.webp";

const COND = "conforme contratação e condições da apólice";

const RELATED_BASE = [
  { label: "Seguro de Acidentes Pessoais para Passageiros", to: "/seguro-acidentes-pessoais-passageiros" },
  { label: "Seguro APP para Motorista de Aplicativo", to: "/seguro-app-motorista-aplicativo" },
  { label: "Seguro APP para Táxi e Transporte Executivo", to: "/seguro-app-taxi-transporte-executivo" },
  { label: "Seguro APP para Ônibus, Vans e Frotas", to: "/seguro-app-onibus-vans-frotas" },
  { label: "Seguro Auto", to: "/seguro-auto" },
  { label: "Seguro Frota", to: "/seguro-frota" },
];
const related = (self: string) => RELATED_BASE.filter((r) => r.to !== self);

const STEPS = [
  "Envie os dados do veículo ou da frota.",
  "A Patro analisa o perfil e as necessidades.",
  "Compara opções entre seguradoras.",
  "Você recebe uma recomendação e escolhe a cobertura.",
];

const PRECO_FAQ =
  "O valor depende do tipo de veículo, da quantidade de passageiros, do capital segurado por pessoa, das coberturas escolhidas e da aceitação da seguradora. Por isso a Patro faz uma cotação personalizada, sem compromisso.";

export const APP_MAIN: AppPageData = {
  path: "/seguro-acidentes-pessoais-passageiros",
  metaTitle: "Seguro de Acidentes Pessoais para Passageiros (APP) | Patro Seguros",
  metaDescription:
    "Proteja passageiros e ocupantes do veículo contra morte acidental, invalidez e despesas médicas. Solicite uma cotação de seguro APP com a Patro Seguros.",
  h1: "Seguro de Acidentes Pessoais para Passageiros",
  heroTitle: "Seguro APP para passageiros e ocupantes do veículo",
  heroText:
    "Proteção financeira para passageiros e condutores em caso de acidente, com coberturas personalizadas para carros, aplicativos, táxis, vans, ônibus e frotas.",
  heroImage: heroApp,
  heroAlt: "Família sorridente ao ar livre, representando a proteção do seguro de acidentes pessoais para passageiros",
  whatsappMessage: "Olá! Quero uma cotação de Seguro de Acidentes Pessoais para Passageiros (APP).",
  sections: [
    {
      id: "o-que-e",
      title: "O que é o seguro APP",
      paragraphs: [
        "APP significa Acidentes Pessoais de Passageiros. É um seguro que protege as pessoas que estão dentro do veículo — passageiros e, em muitos planos, o próprio condutor — quando acontece um acidente, dentro dos limites e condições da apólice.",
        "Em vez de proteger o carro, o APP paga uma indenização às pessoas: à vítima ou à família dela, de acordo com o capital segurado escolhido na contratação.",
      ],
      cards: [
        { title: "Morte acidental", text: `Indenização aos beneficiários em caso de falecimento por acidente, ${COND}.` },
        { title: "Invalidez permanente", text: `Indenização por invalidez total ou parcial causada por acidente, ${COND}.` },
        { title: "Despesas médicas", text: "Despesas médicas, hospitalares e odontológicas, quando contratadas." },
        { title: "Outras garantias", text: `Assistências ou outras garantias previstas na apólice, ${COND}.` },
      ],
      intro: "Nem todas as coberturas estão disponíveis em todos os produtos. A composição final depende da seguradora e do plano escolhido.",
    },
    {
      id: "para-quem",
      title: "Para quem o seguro é indicado",
      cards: [
        { title: "Carros particulares", text: "Para quem transporta família e amigos e quer uma proteção extra para os ocupantes." },
        { title: "Motoristas de aplicativo", text: "Para quem leva passageiros por Uber, 99 e outras plataformas." },
        { title: "Táxis", text: "Proteção para os passageiros transportados no dia a dia do taxista." },
        { title: "Vans e transporte executivo", text: "Para operações de transporte remunerado com vários ocupantes." },
        { title: "Ônibus e transporte coletivo", text: "Capital segurado por passageiro em veículos de maior capacidade." },
        { title: "Empresas com frotas", text: "Para empresas que transportam colaboradores ou clientes." },
        { title: "Transportadoras de passageiros", text: "Para operações regulares de fretamento e linhas contratadas." },
        { title: "Locadoras e turismo", text: "Para locadoras, agências e empresas de receptivo e passeios." },
      ],
    },
    {
      id: "coberturas",
      title: "Principais coberturas",
      table: {
        head: ["Cobertura", "O que significa"],
        rows: [
          ["Morte acidental", "Indenização aos beneficiários se o ocupante falecer em decorrência do acidente."],
          ["Invalidez permanente", "Indenização proporcional ao grau de invalidez total ou parcial por acidente."],
          ["Despesas médico-hospitalares", "Reembolso de despesas com atendimento após o acidente, quando contratado."],
          ["Proteção do condutor", "Inclusão do motorista entre os segurados, quando prevista no plano."],
          ["Proteção dos passageiros", "Cobertura para os passageiros transportados, até a lotação informada."],
          ["Por pessoa ou por veículo", "O capital pode ser definido por ocupante ou por veículo, conforme o produto contratado."],
        ],
      },
      cta: { label: "Solicitar cotação", to: "#cotacao-app" },
    },
    {
      id: "diferencas",
      title: "Diferenças entre APP, seguro auto e RCF-V",
      intro: "São proteções diferentes e que podem se complementar. Entenda de forma simples:",
      table: {
        head: ["Seguro", "O que protege"],
        rows: [
          ["Seguro Auto", "O veículo, contra eventos como colisão, roubo, furto e incêndio."],
          ["RCF-V", "Danos causados pelo segurado a terceiros, de acordo com os limites contratados."],
          ["APP", "Passageiros e ocupantes, contra consequências de acidentes pessoais, conforme a apólice."],
        ],
      },
      paragraphs: ["Muitos motoristas contratam as três proteções juntas. A análise do seu caso indica a combinação mais adequada."],
    },
    {
      id: "motorista-aplicativo",
      title: "Seguro APP para motoristas de aplicativo",
      paragraphs: [
        "Quem trabalha com transporte de passageiros por aplicativo pode precisar de proteção adequada para passageiros e ocupantes. O seguro APP para Uber, o seguro APP para 99 e outros seguros para passageiros de aplicativo devem sempre observar as exigências da plataforma, a legislação aplicável e as condições da seguradora.",
        "A Patro verifica o que sua plataforma solicita e busca uma apólice de acidentes pessoais de passageiros para motorista de aplicativo compatível com o uso profissional do veículo.",
      ],
      cta: { label: "Ver seguro APP para aplicativo", to: "/seguro-app-motorista-aplicativo" },
    },
    {
      id: "frotas-empresas",
      title: "Seguro APP para frotas e empresas",
      cards: [
        { title: "Vans", text: "Transporte de colaboradores, escolar (quando aceito) e executivo." },
        { title: "Ônibus", text: "Linhas contratadas, transporte coletivo e eventos." },
        { title: "Fretamento e turismo", text: "Viagens, passeios e receptivo turístico." },
        { title: "Vários veículos", text: "Gestão centralizada de uma ou mais apólices para toda a frota." },
      ],
      paragraphs: ["Para empresas, também avaliamos o seguro de frota completo, que pode incluir casco, RCF-V e APP."],
      cta: { label: "Solicitar análise da minha frota", to: "/seguro-app-onibus-vans-frotas" },
    },
  ],
  steps: STEPS,
  faqs: [
    { question: "O que é seguro APP?", answer: "É o seguro de Acidentes Pessoais de Passageiros, que indeniza os ocupantes do veículo ou seus beneficiários em caso de acidente, conforme contratação e condições da apólice." },
    { question: "Quem fica protegido pelo seguro de acidentes pessoais para passageiros?", answer: "Os passageiros transportados, até a lotação informada na apólice. Dependendo do plano, o condutor também pode estar incluído." },
    { question: "O motorista também pode estar coberto?", answer: "Sim, em muitos produtos o condutor pode ser incluído. Isso precisa estar previsto no plano contratado." },
    { question: "O seguro APP cobre despesas médicas?", answer: "Pode cobrir despesas médicas, hospitalares e odontológicas quando essa garantia é contratada. Os limites constam na apólice." },
    { question: "Qual a diferença entre APP e RCF-V?", answer: "O APP protege as pessoas dentro do veículo. O RCF-V cobre danos causados a terceiros fora do veículo, de acordo com os limites contratados." },
    { question: "O seguro APP serve para Uber e 99?", answer: "Pode servir, desde que a apólice aceite o uso para transporte por aplicativo. A Patro verifica as exigências da plataforma e as condições da seguradora." },
    { question: "O seguro APP pode ser contratado para uma frota?", answer: "Sim. É possível contratar para vários veículos, com capital por passageiro ou por veículo, conforme o produto." },
    { question: "O pagamento depende da culpa pelo acidente?", answer: "Em geral, o APP indeniza a vítima independentemente de quem causou o acidente, mas as regras e exclusões de cada apólice devem ser consultadas." },
    { question: "Quanto custa um seguro APP?", answer: PRECO_FAQ },
    { question: "Como solicitar uma cotação?", answer: `Preencha o formulário desta página, fale pelo WhatsApp ou ligue para ${"(11) 5199-7500"}.` },
  ],
  finalTitle: "Proteja quem está dentro do veículo",
  finalText: "Conte com a Patro Seguros para encontrar uma solução de seguro APP adequada ao seu veículo, atividade e perfil de transporte.",
  related: related("/seguro-acidentes-pessoais-passageiros"),
};

export const APP_MOTORISTA: AppPageData = {
  path: "/seguro-app-motorista-aplicativo",
  metaTitle: "Seguro APP para Motorista de Aplicativo (Uber e 99) | Patro Seguros",
  metaDescription:
    "Seguro de acidentes pessoais para passageiros de Uber, 99 e outros aplicativos. Proteção para passageiros e condutor. Cotação com a Patro Seguros.",
  h1: "Seguro APP para Motorista de Aplicativo",
  heroTitle: "Proteção para passageiros de Uber, 99 e outras plataformas",
  heroText: "Quem transporta passageiros todos os dias precisa de uma apólice compatível com o uso profissional do carro. A Patro ajuda você a encontrar a opção certa.",
  heroImage: heroMotorista,
  heroAlt: "Motorista de aplicativo ao volante com passageiro no banco traseiro",
  whatsappMessage: "Olá! Sou motorista de aplicativo e quero cotar o Seguro APP para passageiros.",
  sections: [
    {
      id: "por-que",
      title: "Por que o motorista de aplicativo precisa de APP",
      paragraphs: [
        "No transporte por aplicativo, você leva pessoas desconhecidas várias vezes por dia. Se ocorrer um acidente, o seguro de acidentes pessoais para passageiros pode indenizar os ocupantes, conforme contratação e condições da apólice.",
        "Algumas plataformas oferecem proteções próprias durante as corridas. Vale conferir o que está incluso e se faz sentido complementar com uma apólice individual.",
      ],
    },
    {
      id: "coberturas",
      title: "Coberturas mais procuradas por motoristas",
      cards: [
        { title: "Passageiros", text: "Capital por ocupante até a lotação do veículo." },
        { title: "Condutor", text: "Inclusão do motorista, quando prevista no plano." },
        { title: "Despesas médicas", text: "Atendimento após o acidente, quando contratado." },
        { title: "Invalidez e morte", text: `Indenizações por acidente, ${COND}.` },
      ],
      cta: { label: "Solicitar cotação", to: "#cotacao-app" },
    },
    {
      id: "complementos",
      title: "APP, seguro auto e RCF-V para quem roda por aplicativo",
      paragraphs: [
        "O APP protege as pessoas. O seguro auto protege o carro e o RCF-V cobre danos a terceiros. Para uso em aplicativo, é importante declarar corretamente a atividade na contratação do seguro auto.",
      ],
      cta: { label: "Ver seguro auto", to: "/seguro-auto" },
    },
  ],
  steps: STEPS,
  faqs: [
    { question: "Preciso de seguro APP para rodar por aplicativo?", answer: "Depende das exigências da plataforma e da legislação local. A Patro verifica o que se aplica ao seu caso antes de recomendar." },
    { question: "O APP vale só durante as corridas?", answer: "Depende do produto. Algumas apólices valem durante todo o uso do veículo; outras têm regras específicas. Isso consta nas condições da apólice." },
    { question: "Serve para Uber e 99 ao mesmo tempo?", answer: "Em geral a cobertura está ligada ao veículo e ao uso declarado, não a uma plataforma específica. Confirmamos isso na cotação." },
    { question: "Posso incluir o condutor?", answer: "Sim, quando o plano prevê a proteção do condutor." },
    { question: "Quanto custa?", answer: PRECO_FAQ },
  ],
  finalTitle: "Rode com mais tranquilidade",
  finalText: "Fale com a Patro e receba opções de seguro APP adequadas ao transporte por aplicativo.",
  related: related("/seguro-app-motorista-aplicativo"),
};

export const APP_TAXI: AppPageData = {
  path: "/seguro-app-taxi-transporte-executivo",
  metaTitle: "Seguro APP para Táxi e Transporte Executivo | Patro Seguros",
  metaDescription:
    "Seguro de acidentes pessoais para passageiros de táxis, carros executivos e vans de transporte remunerado. Solicite sua cotação com a Patro Seguros.",
  h1: "Seguro APP para Táxi e Transporte Executivo",
  heroTitle: "Proteção para quem transporta passageiros de forma remunerada",
  heroText: "Táxis, carros executivos e vans atendem clientes que esperam segurança. O seguro APP complementa essa proteção para os ocupantes.",
  heroImage: heroApp,
  heroAlt: "Família sorridente, representando a proteção de passageiros em táxis e transporte executivo",
  whatsappMessage: "Olá! Quero cotar Seguro APP para táxi / transporte executivo.",
  sections: [
    {
      id: "perfis",
      title: "Perfis atendidos",
      cards: [
        { title: "Táxis", text: "Proteção para os passageiros do dia a dia, em ponto ou por chamada." },
        { title: "Carros executivos", text: "Transfers, aeroporto e atendimento corporativo." },
        { title: "Vans", text: "Transporte executivo e de grupos com vários ocupantes." },
        { title: "Transporte remunerado", text: "Outras operações de passageiros aceitas pela seguradora." },
      ],
    },
    {
      id: "coberturas",
      title: "Como funciona a cobertura",
      paragraphs: [
        `O capital segurado é definido por passageiro ou por veículo e pode incluir morte acidental, invalidez permanente e despesas médico-hospitalares, ${COND}.`,
        "Para quem atende empresas, uma apólice APP pode ser exigida em contratos de transporte. Verificamos as exigências do contratante antes de recomendar.",
      ],
      cta: { label: "Solicitar cotação", to: "#cotacao-app" },
    },
  ],
  steps: STEPS,
  faqs: [
    { question: "Taxista pode contratar seguro APP?", answer: "Sim, desde que a seguradora aceite o uso como táxi. A Patro compara as opções disponíveis." },
    { question: "O APP cobre passageiros de transfer de aeroporto?", answer: "Pode cobrir, se o uso estiver declarado e aceito na apólice." },
    { question: "Vans executivas entram no mesmo seguro?", answer: "Podem entrar em apólice própria, considerando a lotação da van." },
    { question: "Empresas contratantes exigem APP?", answer: "Alguns contratos exigem. Informe as exigências e buscamos uma apólice compatível." },
    { question: "Quanto custa?", answer: PRECO_FAQ },
  ],
  finalTitle: "Mais segurança para seus passageiros",
  finalText: "A Patro ajuda você a escolher o seguro APP adequado para táxi e transporte executivo.",
  related: related("/seguro-app-taxi-transporte-executivo"),
};

export const APP_FROTAS: AppPageData = {
  path: "/seguro-app-onibus-vans-frotas",
  metaTitle: "Seguro APP para Ônibus, Vans e Frotas | Patro Seguros",
  metaDescription:
    "Seguro de acidentes pessoais para passageiros de ônibus, vans, fretamento e turismo. Análise de frotas e cotação em várias seguradoras com a Patro.",
  h1: "Seguro APP para Ônibus, Vans e Frotas",
  heroTitle: "Proteção para passageiros em operações de transporte",
  heroText: "Empresas de transporte, turismo e fretamento transportam muitas pessoas por dia. O seguro APP ajuda a proteger passageiros e o negócio.",
  heroImage: heroFrota,
  heroAlt: "Frota de ônibus e vans estacionada no pátio de uma empresa de transporte",
  whatsappMessage: "Olá! Quero uma análise de Seguro APP para a frota da minha empresa.",
  sections: [
    {
      id: "operacoes",
      title: "Operações atendidas",
      cards: [
        { title: "Empresas de transporte", text: "Linhas contratadas e transporte de colaboradores." },
        { title: "Turismo", text: "Passeios, receptivo e excursões." },
        { title: "Fretamento", text: "Viagens eventuais e contínuas." },
        { title: "Gestão de frotas", text: "Várias placas em uma estrutura organizada de apólices." },
      ],
    },
    {
      id: "gestao",
      title: "Como a Patro ajuda na gestão da frota",
      paragraphs: [
        `Levantamos a lotação de cada veículo, o tipo de operação e as exigências de contratantes para definir o capital por passageiro, ${COND}.`,
        "Também podemos avaliar o seguro de frota completo, com casco e RCF-V, para uma visão única dos riscos.",
      ],
      cta: { label: "Solicitar análise da minha frota", to: "#cotacao-app" },
    },
  ],
  steps: STEPS,
  faqs: [
    { question: "Dá para contratar APP para toda a frota?", answer: "Sim. É possível incluir vários veículos, com capital por passageiro ou por veículo, conforme o produto." },
    { question: "O capital é por passageiro?", answer: "Normalmente sim, até a lotação de cada veículo, mas há produtos com capital por veículo." },
    { question: "Fretamento e turismo são aceitos?", answer: "Muitas seguradoras aceitam, sujeito à análise da operação." },
    { question: "Posso incluir veículos novos depois?", answer: "Em geral sim, por endosso da apólice, conforme regras da seguradora." },
    { question: "Quanto custa?", answer: PRECO_FAQ },
  ],
  finalTitle: "Proteja passageiros e sua operação",
  finalText: "Envie os dados da sua frota e receba uma análise consultiva da Patro Seguros.",
  related: related("/seguro-app-onibus-vans-frotas"),
};
