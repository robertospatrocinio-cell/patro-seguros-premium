import { EMPRESA, WHATSAPP_URL_BASE } from "../config/empresa";

export const consorcioHub = {
  title: "Consórcio: Imóveis, Veículos, Pesados e Serviços | Patro",
  description: "Entenda custos, lances e regras do consórcio de imóveis, veículos, pesados e serviços. Explore o simulador educativo e solicite orientação à Patro.",
  h1: "Consórcio: seus planos merecem uma boa estratégia.",
  badge: "CONSÓRCIO PATRO",
  intro: "Imóveis, veículos, máquinas e projetos: descubra alternativas de compra planejada com orientação para escolher um plano adequado ao seu objetivo.",
  highlights: [
    "Sem juros de financiamento — há taxa de administração e outros custos previstos em contrato.",
    "Poder de compra à vista após a liberação da carta para negociar com o vendedor.",
    "Consultoria da escolha do grupo à documentação para uso da carta contemplada.",
  ],
  modalitiesTitle: "Escolha o plano ideal para o seu momento de vida ou negócio",
  modalitiesIntro: "Cartas de crédito para pessoas físicas, investidores, transportadores e produtores rurais em todos os estados do Brasil. Faixas e prazos abaixo são referências para consulta, sujeitos à disponibilidade e às regras de cada grupo.",
  comparisonTitle: "Consórcio ou financiamento: qual vale mais a pena?",
  comparisonIntro: "Compare o custo total, o momento em que precisa do bem e sua capacidade de pagar as parcelas. Consórcio favorece a compra planejada; financiamento pode atender quem precisa do bem agora, após aprovação. Nenhuma modalidade é sempre mais vantajosa.",
  consultingTitle: "Não dependa apenas da sorte: planeje sua estratégia de lance",
  consultingIntro: "Antes de assinar a proposta, entenda o grupo e seus limites financeiros. O histórico de lances orienta o planejamento, mas não prevê o resultado da próxima assembleia nem garante antecipação da contemplação.",
  safetyTitle: "Administradoras autorizadas e informações para contratar com segurança",
  safety: "Consulte opções como Porto Seguro Consórcio e outras administradoras disponíveis para o seu objetivo. Antes de contratar, confira a razão social e a autorização da administradora no Banco Central, custos, reajustes, regras de lance e cancelamento. A ABAC é uma associação do setor: a filiação deve ser confirmada para cada instituição e não substitui a autorização do Banco Central.",
  safetyNote: "O registro SUSEP identifica a atuação da Patro como corretora de seguros; a fiscalização das administradoras de consórcio cabe ao Banco Central. A simulação é educativa e não consulta tabelas comerciais ou assembleias em tempo real.",
  faqTitle: "Perguntas frequentes sobre consórcio",
  ctaTitle: "Vamos planejar sua próxima conquista?",
  ctaText: "Conte com orientação para comparar possibilidades e escolher com clareza, sem pressa para decidir.",
  warning: "Consórcio é compra planejada, não investimento com rendimento garantido. Não há data garantida de contemplação. Taxa de administração, fundo de reserva, seguros e reajustes podem compor o custo. A liberação do crédito depende de análise cadastral, garantias e regras da administradora. Não conte com aluguel futuro ou valorização do bem para pagar as parcelas.",
};

// Endereços canônicos das quatro modalidades nacionais.
export const consorcioModalities = [
  { title: "Consórcio de imóveis", range: "R$ 100 mil a R$ 2 milhões • até 240 meses", use: "Casa ou apartamento novo ou usado, terreno, sala comercial, construção, reforma ou quitação de financiamento imobiliário, conforme o contrato.", benefit: "O FGTS pode ser usado para lance, complemento do crédito ou amortização quando o participante, o imóvel e a operação atendem às regras vigentes. Imóveis para locação exigem planejamento: aluguel e ocupação não são garantidos.", href: "/consorcio-imoveis", action: "Explorar consórcio de imóveis" },
  { title: "Consórcio de pesados e máquinas agrícolas", range: "R$ 150 mil a R$ 2 milhões • até 120 meses", use: "Caminhões, implementos rodoviários, tratores, colheitadeiras, pulverizadores e máquinas de linha amarela, como escavadeiras e pás carregadeiras, conforme os bens aceitos pelo grupo.", benefit: "Programe a renovação da frota e do maquinário respeitando o caixa da operação. Compare o custo completo com crédito rural e Finame; condições subsidiadas, urgência e sazonalidade podem alterar a escolha.", href: "/consorcio-pesados-maquinas", action: "Explorar consórcio de pesados e agro" },
  { title: "Consórcio de veículos: leves, elétricos e motos", range: "R$ 30 mil a R$ 350 mil • até 100 meses", use: "Carros novos, seminovos, híbridos e elétricos, utilitários e motos de baixa ou alta cilindrada. O limite de idade do veículo varia por administradora e deve ser confirmado antes da adesão.", benefit: "Avalie lance embutido e recursos provenientes da venda do veículo usado. Ofertas de troca de chaves dependem de condições específicas; o lance não garante retirada imediata do bem.", href: "/consorcio-veiculos", action: "Explorar consórcio de veículos" },
  { title: "Consórcio de serviços", range: "R$ 10 mil a R$ 60 mil • até 48 meses", use: "Projetos como instalação de energia solar, reformas, procedimentos médicos ou odontológicos, intercâmbio, cursos e festas, desde que admitidos na categoria contratada.", benefit: "Planeje o pagamento ao prestador de sua escolha após contemplação e aprovação da documentação. A contratação do serviço e a liberação do crédito seguem as exigências da administradora.", href: "/consorcio-servicos", action: "Explorar consórcio de serviços" },
];

export const consorcioComparison = [
  { criterion: "Custo financeiro", consortium: "Sem juros de financiamento. Taxa de administração, reserva, seguros e reajustes conforme contrato.", financing: "Juros e demais encargos. Compare o custo efetivo total (CET), não apenas a taxa anunciada." },
  { criterion: "Valor final pago", consortium: "Depende das taxas, reajustes e prazo. Não há multiplicador universal sobre a carta.", financing: "Depende dos juros, entrada, prazo e sistema de amortização. Use uma proposta real para comparar." },
  { criterion: "Poder de negociação", consortium: "Após liberação, a administradora paga o vendedor. Negocie o preço à vista; descontos não são garantidos.", financing: "O vendedor também pode receber à vista pela instituição. O desconto depende da negociação comercial." },
  { criterion: "Prazo de liberação", consortium: "Contemplação por sorteio ou lance, seguida de análise e documentação. Sem data garantida.", financing: "Após aprovação do crédito, garantias e formalização do contrato. Não é liberação automática." },
  { criterion: "Entrada obrigatória", consortium: "Em geral, não há entrada como no financiamento, mas existem parcelas e cobranças iniciais previstas no contrato.", financing: "Pode exigir entrada; percentual varia conforme instituição, bem e perfil do cliente." },
  { criterion: "Flexibilidade de uso", consortium: "Escolha dentro da categoria e das regras do grupo. Quitação de financiamento é possível nas condições admitidas.", financing: "Vinculado ao bem e à finalidade aprovados na contratação." },
];

export const consorcioConsulting = [
  { title: "Raio-X de grupos em andamento", text: "Comparamos o histórico disponível de lances vencedores, prazos, custos e regras de assembleia. Resultados passados não asseguram chances maiores no próximo mês; a disponibilidade financeira do grupo e os concorrentes também influenciam." },
  { title: "Estratégia de lance embutido", text: "Avaliamos se o grupo permite usar parte da própria carta no lance e qual é o limite contratado. Por exemplo, em uma carta de R$ 200 mil, um lance embutido de 25% reduz o crédito líquido para R$ 150 mil. Não é crédito extra nem aprovação garantida." },
  { title: "Lance livre, recursos próprios ou FGTS", text: "Planejamos o valor disponível sem comprometer sua reserva. Recursos da venda de um veículo podem compor o lance conforme as regras; FGTS só se aplica às operações imobiliárias elegíveis. Não existe momento exato que assegure contemplação." },
  { title: "Pós-contemplação e seguro integrado", text: "Apoiamos a organização dos documentos para liberação da carta. Também orientamos sobre Seguro Auto, Residencial ou de Máquinas e a cláusula beneficiária, quando exigida pela administradora, respeitando a análise e as condições de cada seguro." },
];

export const consorcioOfficialSources = [
  { label: "Banco Central: entenda o consórcio", url: "https://www.bcb.gov.br/estabilidadefinanceira/consorcio" },
  { label: "Banco Central: consulte a instituição antes de contratar", url: "https://www.bcb.gov.br/meubc/encontreinstituicao" },
  { label: "CAIXA: regras para uso do FGTS na moradia", url: "https://www.caixa.gov.br/voce/habitacao/uso-fgts/Paginas/default.aspx" },
];

export const consorcioFaqs = [
  { q: "O que é consórcio?", a: "Consórcio é uma forma de compra planejada em grupo, administrada por uma empresa autorizada pelo Banco Central. Os participantes pagam parcelas para formar um fundo comum, que permite atribuir créditos por sorteio ou lance conforme os recursos e as regras do grupo. Não é investimento com rendimento garantido nem crédito de liberação imediata." },
  { q: "Como funciona a contemplação?", a: "Contemplação é a atribuição do crédito por sorteio ou lance nas assembleias, conforme o contrato e os recursos disponíveis do grupo. Um lance pode não ser vencedor; não existe data garantida. Ser contemplado não significa liberação automática: a administradora ainda verifica cadastro, documentos e garantias antes de pagar o vendedor ou prestador." },
  { q: "Consórcio tem juros? Quais custos podem existir?", a: "Não há juros de financiamento, mas consórcio tem custos. A parcela pode incluir fundo comum, taxa de administração, fundo de reserva e seguros previstos no contrato. Carta e parcelas podem sofrer reajustes; também podem existir despesas de avaliação, registro, garantias e encargos por atraso. Compare o valor total e a distribuição das cobranças, não apenas a parcela inicial." },
  { q: "Quando é possível utilizar o FGTS no consórcio?", a: "O FGTS pode ser utilizado em operações de consórcio imobiliário elegíveis, como lance, complemento da compra, amortização ou liquidação, conforme as regras vigentes para cada finalidade. Não é permitido para qualquer imóvel ou participante. Em geral, exige pelo menos três anos de trabalho sob o regime do FGTS, além de condições sobre propriedade de outros imóveis, financiamento ativo, localização, valor e destinação residencial para moradia própria. A administradora e o agente operador devem confirmar o enquadramento antes de você contar com esse recurso. Não se aplica a veículos, máquinas ou serviços." },
  { q: "O que acontece depois da contemplação?", a: "Depois da contemplação, a administradora analisa o cadastro, a capacidade de pagamento, os documentos e as garantias para liberar o crédito. Você escolhe o bem ou serviço dentro da categoria contratada e apresenta a documentação exigida; o pagamento ao vendedor ou prestador segue a aprovação e os procedimentos da administradora. As parcelas restantes e os reajustes previstos continuam devidos. A Patro orienta o atendimento, mas não aprova nem libera o crédito." },
  { q: "Quando vale comparar consórcio com financiamento?", a: "Compare antes de contratar, especialmente se você precisa do bem em uma data definida ou pretende ofertar um lance elevado. Consórcio exige capacidade de esperar sem data garantida; financiamento depende da aprovação e pode permitir acesso ao bem antes. Considere propostas reais, CET do financiamento, taxas e reajustes do consórcio, entrada, reserva financeira e custo da espera. A comparação nominal do simulador não considera todos esses fatores e não garante economia." },
  { q: "Qual é o papel da Patro e do Banco Central no consórcio?", a: "A Patro oferece atendimento consultivo para entender seu objetivo, explicar condições e encaminhar a consulta de planos. A administradora é responsável pelo grupo, pelas assembleias, pelas análises e pela liberação do crédito. O Banco Central autoriza e fiscaliza administradoras; não garante a operação, a contemplação nem o pagamento ao participante. O registro SUSEP da Patro se refere à corretagem de seguros e não substitui a autorização da administradora." },
  { q: "Como funciona o lance embutido no consórcio?", a: "O lance embutido permite utilizar parte da própria carta de crédito como lance, se o grupo admitir. O limite, por exemplo 25% ou 30%, depende do contrato. Se o lance for vencedor e homologado, esse valor é descontado do crédito disponível para comprar o bem. Portanto, planeje a compra com base na carta líquida; o recurso não é um valor adicional e não garante contemplação." },
  { q: "O valor da carta de crédito e das parcelas sofre reajuste?", a: "Sim, conforme o índice, a periodicidade e as regras do contrato. Podem ser utilizados INCC em imóveis, IPCA ou o preço de um bem de referência em veículos e pesados, sem que exista um índice único para todos os grupos. O reajuste busca preservar o poder de compra do grupo e pode aumentar as parcelas. Confira também as regras após a contemplação e a utilização do crédito." },
  { q: "Posso usar o consórcio para quitar um financiamento bancário que já estou pagando?", a: "É possível usar o crédito contemplado para a quitação total de financiamento de sua titularidade, da mesma categoria do consórcio, observadas a anuência da administradora, as condições contratuais e a documentação exigida. Não é uma troca automática de dívida. Compare custos, saldo devedor, eventuais recursos complementares e o tempo de espera pela contemplação." },
  { q: "Existe garantia de contemplação em um prazo específico?", a: "Não. A contemplação ocorre por sorteio ou lance, segundo as regras e os recursos disponíveis do grupo. Nenhum consultor pode garantir uma data ou o sucesso de um lance. A análise do histórico ajuda a escolher um plano compatível com o orçamento, mas não assegura resultado no curto ou médio prazo." },
  { q: "Quais documentos são necessários para aderir a um consórcio?", a: "Em geral, são solicitados RG ou CNH, CPF e comprovante de residência; para empresas, CNPJ, contrato social e documentos dos representantes. A administradora pode pedir comprovação de renda e outros documentos na adesão e na contemplação. A liberação do crédito exige análise cadastral, capacidade de pagamento, garantias e documentação do bem ou serviço, conforme o contrato." },
  { q: "Posso contratar meu consórcio com a Patro Seguros morando em qualquer estado?", a: "Sim. A Patro atende clientes em todo o Brasil por canais digitais, com orientação sobre simulação, escolha de grupos, assinatura e acompanhamento pelo WhatsApp e, quando necessário, videoconferência. A disponibilidade dos planos e as etapas de contratação, avaliação do bem e faturamento seguem as regras da administradora." },
];

export const consorcioWhatsapp = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent("Olá! Quero comparar planos de consórcio e consultar os grupos e o histórico de lances disponíveis para meu objetivo.")}`;
export const consorcioFinancialProductSchema = {
  "@type": "FinancialProduct",
  "@id": `${EMPRESA.dominioCanonico}/consorcio#product`,
  name: "Consórcio Planejado de Imóveis, Veículos, Pesados e Serviços",
  description: "Consultoria e planos de consórcio sem juros de financiamento para aquisição de imóveis, carros, caminhões, máquinas agrícolas e serviços em todo o Brasil, por meio de administradoras autorizadas pelo Banco Central. Há taxas e outros custos conforme o contrato.",
  url: `${EMPRESA.dominioCanonico}/consorcio`,
  category: "Consórcio",
  interestRate: 0,
  feesAndCommissionsSpecification: consorcioHub.warning,
  areaServed: { "@type": "Country", name: "Brasil", alternateName: "BR", sameAs: "https://www.wikidata.org/wiki/Q155" },
  provider: {
    "@type": "InsuranceAgency",
    "@id": `${EMPRESA.dominioCanonico}/#insurance-agency`,
    name: EMPRESA.razaoSocial,
    alternateName: EMPRESA.nomeFantasia,
    url: EMPRESA.dominioCanonico,
    telephone: EMPRESA.telefoneE164,
    taxID: EMPRESA.cnpj,
  },
};

// As perguntas usam a mesma fonte do conteúdo visível e da versão estática.
export const consorcioFaqSchema = {
  "@type": "FAQPage",
  "@id": `${EMPRESA.dominioCanonico}/consorcio#faq`,
  mainEntity: consorcioFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export const consorcioSchema = {
  "@context": "https://schema.org",
  "@graph": [consorcioFinancialProductSchema, consorcioFaqSchema],
};
