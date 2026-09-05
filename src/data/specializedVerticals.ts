export interface SpecializedPage {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  intro: string;
  coverages: { title: string; description: string }[];
  whoNeeds: string[];
  sections: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
}

export const SPECIALIZED_PAGES: SpecializedPage[] = [
  {
    slug: "seguro-garantia-judicial-guarulhos",
    title: "Seguro Garantia Judicial em Guarulhos | Substituição de Depósito",
    metaDescription:
      "Otimize o fluxo de caixa da sua empresa com Seguro Garantia Judicial em Guarulhos. Substitua depósitos recursais por apólices aceitas pela justiça.",
    h1: "Seguro Garantia Judicial em Guarulhos",
    subtitle:
      "Libere capital de giro substituindo depósitos judiciais e penhoras por uma apólice aceita pelo Judiciário.",
    intro:
      "O Seguro Garantia Judicial permite que empresas de Guarulhos e região garantam processos trabalhistas, cíveis, fiscais e execuções sem imobilizar dinheiro em depósitos. A apólice é emitida por seguradora registrada na SUSEP e segue os requisitos da legislação processual, preservando o caixa da operação enquanto a discussão judicial avança.",
    coverages: [
      { title: "Garantia de execução fiscal", description: "Substitui penhora de bens e depósitos em execuções fiscais federais, estaduais e municipais." },
      { title: "Depósito recursal trabalhista", description: "Cobre o valor exigido para recorrer em processos trabalhistas, sem bloqueio de caixa." },
      { title: "Garantia cível e de recurso", description: "Assegura o cumprimento de obrigações discutidas em ações cíveis e recursos." },
      { title: "Atualização monetária", description: "Importância segurada corrigida conforme o índice determinado no processo." },
    ],
    whoNeeds: [
      "Indústrias e transportadoras de Guarulhos com passivo trabalhista em discussão",
      "Empresas com execuções fiscais em curso",
      "Construtoras e prestadoras de serviço que precisam recorrer sem travar capital",
      "Companhias que querem liberar depósitos já efetuados",
    ],
    sections: [
      {
        heading: "Como funciona a substituição do depósito",
        body: "A empresa passa por uma análise de crédito na seguradora, define o valor da garantia com base no processo e recebe a apólice para juntada nos autos. Após a homologação, o depósito em dinheiro pode ser levantado e o capital volta para a operação. O prazo padrão acompanha a duração do processo, com renovações automáticas até o trânsito em julgado.",
      },
      {
        heading: "Documentos normalmente exigidos",
        body: "Contrato social, balanços dos últimos exercícios, faturamento atualizado, certidões e a peça processual que indica o valor da garantia. Com esses documentos a Patro Seguros cota simultaneamente em várias seguradoras e apresenta o melhor prêmio e as condições aceitas pelo juízo.",
      },
      {
        heading: "Custo comparado ao depósito em dinheiro",
        body: "O prêmio anual costuma representar uma fração pequena do valor garantido, enquanto o depósito imobiliza 100% do montante. Para empresas com contratos e folha em Guarulhos, essa diferença se traduz diretamente em capital de giro disponível.",
      },
    ],
    faqs: [
      { question: "O juiz é obrigado a aceitar o seguro garantia?", answer: "O Código de Processo Civil e a legislação trabalhista equiparam o seguro garantia judicial ao dinheiro, desde que a apólice atenda aos requisitos formais e seja acrescida do percentual legal. A aceitação final é do juízo, e emitimos a apólice já no padrão exigido." },
      { question: "Qual o prazo de emissão da apólice?", answer: "Após a aprovação do crédito, a emissão costuma ocorrer entre 2 e 5 dias úteis, dependendo da seguradora e do porte da garantia." },
      { question: "Empresas com restrição conseguem contratar?", answer: "Depende da análise de crédito. Existem seguradoras com apetite para diferentes perfis, e por isso cotamos em várias ao mesmo tempo." },
      { question: "É possível trocar um depósito já feito por apólice?", answer: "Sim. É feito um pedido de substituição da garantia nos autos e, autorizado o levantamento, o valor depositado retorna à empresa." },
      { question: "O seguro cobre o pagamento da condenação?", answer: "Sim. Perdida a ação em definitivo, a seguradora indeniza o valor garantido e depois cobra a empresa em regresso, conforme o contrato de contragarantia." },
    ],
  },
  {
    slug: "seguro-credito-empresarial-guarulhos",
    title: "Seguro de Crédito em Guarulhos | Proteção contra Inadimplência",
    metaDescription:
      "Proteja o faturamento da sua empresa em Guarulhos contra calotes. Seguro de crédito para vendas B2B nacionais e exportação.",
    h1: "Seguro de Crédito em Guarulhos",
    subtitle:
      "Venda a prazo com segurança: proteção do contas a receber contra inadimplência e insolvência de clientes.",
    intro:
      "O Seguro de Crédito protege empresas que vendem a prazo no modelo B2B. Se o cliente não paga por insolvência ou por falta prolongada de pagamento, a seguradora indeniza um percentual da fatura. Além da indenização, a apólice entrega análise de crédito contínua da carteira, um recurso valioso para indústrias, distribuidoras e operadores logísticos de Guarulhos.",
    coverages: [
      { title: "Inadimplência prolongada", description: "Indenização quando a fatura não é paga após o prazo de espera contratado." },
      { title: "Insolvência declarada", description: "Cobertura em casos de falência, recuperação judicial ou insolvência do comprador." },
      { title: "Vendas para o exterior", description: "Modalidade para exportações, incluindo risco comercial e, quando contratado, risco político." },
      { title: "Monitoramento de limites", description: "Análise e revisão periódica dos limites de crédito por cliente." },
      { title: "Apoio na recuperação", description: "Cobrança e recuperação de créditos conduzidas pela estrutura da seguradora." },
    ],
    whoNeeds: [
      "Indústrias e distribuidoras que vendem a prazo",
      "Empresas com concentração de faturamento em poucos clientes",
      "Exportadores instalados na região de Cumbica",
      "Negócios que buscam antecipar recebíveis com melhor taxa",
    ],
    sections: [
      {
        heading: "Como a cobertura é estruturada",
        body: "A seguradora analisa a carteira de clientes e define um limite de crédito para cada comprador. As vendas dentro desses limites ficam cobertas, normalmente entre 80% e 90% do valor da fatura. Há uma franquia anual agregada e um prazo de espera antes do pagamento da indenização.",
      },
      {
        heading: "Ganho financeiro além da indenização",
        body: "Recebíveis segurados costumam ser aceitos com taxas melhores em operações de antecipação e financiamento bancário, porque o risco de perda cai. Na prática, a apólice pode se pagar pela redução do custo financeiro.",
      },
      {
        heading: "O que não é coberto",
        body: "Disputas comerciais sobre qualidade ou entrega, vendas fora do limite aprovado, operações com partes relacionadas e faturas emitidas antes do início de vigência ficam fora da cobertura.",
      },
    ],
    faqs: [
      { question: "Qual o percentual indenizado?", answer: "Normalmente de 80% a 90% do valor da fatura coberta, conforme o perfil da carteira e as condições negociadas." },
      { question: "Posso segurar apenas os maiores clientes?", answer: "Sim, existem apólices por cliente-chave (top buyers), embora a maioria das estruturas cubra toda a carteira, o que reduz o custo médio." },
      { question: "Quanto custa?", answer: "O prêmio é calculado como um percentual do faturamento segurado e varia conforme setor, prazo médio de recebimento e histórico de perdas." },
      { question: "Serve para vendas ao consumidor final?", answer: "Não. O seguro de crédito interno é voltado a vendas entre empresas (B2B)." },
      { question: "E se o cliente atrasar mas depois pagar?", answer: "Se o pagamento ocorre dentro do prazo de espera, não há sinistro. Recuperações posteriores à indenização são partilhadas com a seguradora." },
    ],
  },
  {
    slug: "seguro-carro-eletrico-guarulhos",
    title: "Seguro para Carro Elétrico em Guarulhos | BYD, GWM, Tesla",
    metaDescription:
      "Seguro especializado para carros elétricos e híbridos em Guarulhos. Cobertura para bateria, cabo de carregamento e assistência 24h dedicada.",
    h1: "Seguro para Carros Elétricos em Guarulhos",
    subtitle:
      "Cobertura pensada para veículos elétricos e híbridos: bateria, carregador e assistência com guincho apropriado.",
    intro:
      "Carros elétricos e híbridos têm riscos e custos de reparo diferentes dos veículos a combustão. A bateria pode representar boa parte do valor do carro, a rede de oficinas autorizadas é menor e o guincho exige procedimento específico. Na Patro Seguros cotamos entre as seguradoras que realmente têm apetite para BYD, GWM, Volvo, Tesla, Renault e híbridos, comparando preço e qualidade de rede em Guarulhos e na Grande São Paulo.",
    coverages: [
      { title: "Bateria de tração", description: "Danos por colisão, incêndio e eventos cobertos atingindo o pack de baterias." },
      { title: "Cabo e carregador (wallbox)", description: "Proteção para o equipamento de recarga residencial e cabos, conforme condições da apólice." },
      { title: "Assistência 24h dedicada", description: "Guincho com plataforma adequada e reboque até o ponto de recarga ou oficina autorizada." },
      { title: "Casco completo", description: "Colisão, incêndio, roubo, furto e fenômenos naturais." },
      { title: "Danos a terceiros (RCF)", description: "Cobertura de danos materiais, corporais e morais causados a terceiros." },
      { title: "Carro reserva", description: "Veículo substituto durante o reparo, importante pela menor rede autorizada." },
    ],
    whoNeeds: [
      "Proprietários de BYD Dolphin, Seal, Song, GWM Haval e Ora",
      "Motoristas de híbridos Toyota, Honda e Volvo em Guarulhos",
      "Frotas corporativas em transição para elétricos",
      "Motoristas de aplicativo com veículos eletrificados",
    ],
    sections: [
      {
        heading: "Por que o seguro de elétrico é diferente",
        body: "O custo de reparo depende de peças importadas e de mão de obra certificada em alta tensão. Uma batida que atinja o assoalho pode comprometer o pack de baterias e gerar perda total mesmo em colisões aparentemente moderadas. Por isso é essencial verificar se a apólice cobre a bateria e qual é a rede referenciada mais próxima de Guarulhos.",
      },
      {
        heading: "O que comparar antes de contratar",
        body: "Confira franquia (elétricos costumam ter franquia proporcionalmente maior), cobertura explícita para bateria e carregador, condições de guincho em pane elétrica, oficinas autorizadas na região e limite de RCF. Preço isolado engana quando a rede de atendimento é ruim.",
      },
      {
        heading: "Recarga e cuidados que reduzem sinistro",
        body: "Instalação de wallbox por profissional habilitado, uso de tomada dedicada e proteção contra surto evitam danos elétricos. Registre notas fiscais da instalação: elas facilitam a comprovação em caso de sinistro no equipamento de recarga.",
      },
    ],
    faqs: [
      { question: "A bateria é coberta em caso de colisão?", answer: "Nas apólices que trabalhamos, sim, a bateria de tração é tratada como parte do veículo em eventos cobertos. Sempre confirmamos a cláusula antes do fechamento." },
      { question: "O seguro cobre o carregador instalado em casa?", answer: "Algumas seguradoras cobrem o wallbox e os cabos, geralmente com limite específico. É um item que checamos na comparação." },
      { question: "O guincho comum pode rebocar um elétrico?", answer: "Não. Elétricos devem ser transportados sobre plataforma, com as rodas fora do solo. A assistência contratada precisa oferecer esse recurso." },
      { question: "O seguro de elétrico é mais caro?", answer: "Costuma ser um pouco mais alto que o de um carro a combustão de valor equivalente, por causa do custo de peças e da rede menor. A diferença varia bastante entre seguradoras." },
      { question: "Motorista de aplicativo com carro elétrico consegue contratar?", answer: "Sim, desde que o uso profissional seja declarado. Existem seguradoras com produto específico para essa finalidade." },
    ],
  },
];
