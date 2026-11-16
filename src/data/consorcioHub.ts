import { EMPRESA, WHATSAPP_URL_BASE } from "../config/empresa";

export const consorcioHub = {
  title: "Consórcio de Imóveis, Veículos e Pesados Sem Juros | Patro",
  description: "Simule seu consórcio de imóveis, carros, caminhões e máquinas agrícolas em todo o Brasil. Compare administradoras, estratégias de lance e economize juros.",
  h1: "Consórcio Planejado: Conquiste Imóveis, Veículos e Máquinas Sem Juros",
  badge: "Atendimento digital em todo o Brasil • Administradoras autorizadas pelo Banco Central",
  intro: "Planeje seu patrimônio pessoal, empresarial ou rural sem os juros de um financiamento bancário. Na Patro Seguros, avaliamos seu objetivo, orçamento e o histórico de assembleias disponível para comparar grupos e orientar sua estratégia de contemplação por sorteio, lance livre ou lance embutido.",
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
  ctaTitle: "Comece seu planejamento patrimonial sem juros de financiamento",
  ctaText: "Receba gratuitamente um comparativo de planos e solicite o histórico disponível de lances dos grupos para o valor que você procura.",
  warning: "Consórcio é compra planejada, não investimento com rendimento garantido. Não há data garantida de contemplação. Taxa de administração, fundo de reserva, seguros e reajustes podem compor o custo. A liberação do crédito depende de análise cadastral, garantias e regras da administradora. Não conte com aluguel futuro ou valorização do bem para pagar as parcelas.",
};

// Links existentes até a publicação das novas páginas satélites.
export const consorcioModalities = [
  { title: "Consórcio de imóveis", range: "R$ 100 mil a R$ 2 milhões+ • até 240 meses", use: "Casa ou apartamento novo ou usado, terreno, sala comercial, construção, reforma ou quitação de financiamento imobiliário, conforme o contrato.", benefit: "O FGTS pode ser usado para lance, complemento do crédito ou amortização quando o participante, o imóvel e a operação atendem às regras vigentes. Imóveis para locação exigem planejamento: aluguel e ocupação não são garantidos.", href: "/consorcio-imoveis", action: "Explorar consórcio de imóveis" },
  { title: "Consórcio de pesados e máquinas agrícolas", range: "R$ 150 mil a R$ 1,5 milhão+ • até 120 meses", use: "Caminhões, implementos rodoviários, tratores, colheitadeiras, pulverizadores e máquinas de linha amarela, como escavadeiras e pás carregadeiras, conforme os bens aceitos pelo grupo.", benefit: "Programe a renovação da frota e do maquinário respeitando o caixa da operação. Compare o custo completo com crédito rural e Finame; condições subsidiadas, urgência e sazonalidade podem alterar a escolha.", href: "/consorcio-veiculos-pesados", action: "Explorar consórcio de pesados e agro" },
  { title: "Consórcio de veículos: leves, elétricos e motos", range: "R$ 30 mil a R$ 350 mil • até 100 meses", use: "Carros novos, seminovos, híbridos e elétricos, utilitários e motos de baixa ou alta cilindrada. O limite de idade do veículo varia por administradora e deve ser confirmado antes da adesão.", benefit: "Avalie lance embutido e recursos provenientes da venda do veículo usado. Ofertas de troca de chaves dependem de condições específicas; o lance não garante retirada imediata do bem.", href: "/consorcio-carro", action: "Explorar consórcio de veículos" },
  { title: "Consórcio de serviços", range: "R$ 10 mil a R$ 60 mil • até 48 meses", use: "Projetos como instalação de energia solar, reformas, procedimentos médicos ou odontológicos, intercâmbio, cursos e festas, desde que admitidos na categoria contratada.", benefit: "Planeje o pagamento ao prestador de sua escolha após contemplação e aprovação da documentação. A contratação do serviço e a liberação do crédito seguem as exigências da administradora.", href: "/consorcio#simulacao", action: "Consultar consórcio de serviços" },
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

export const consorcioFaqs = [
  { q: "Como funciona o lance embutido no consórcio?", a: "O lance embutido permite utilizar parte da própria carta de crédito como lance, se o grupo admitir. O limite, por exemplo 25% ou 30%, depende do contrato. Se o lance for vencedor e homologado, esse valor é descontado do crédito disponível para comprar o bem. Portanto, planeje a compra com base na carta líquida; o recurso não é um valor adicional e não garante contemplação." },
  { q: "O valor da carta de crédito e das parcelas sofre reajuste?", a: "Sim, conforme o índice, a periodicidade e as regras do contrato. Podem ser utilizados INCC em imóveis, IPCA ou o preço de um bem de referência em veículos e pesados, sem que exista um índice único para todos os grupos. O reajuste busca preservar o poder de compra do grupo e pode aumentar as parcelas. Confira também as regras após a contemplação e a utilização do crédito." },
  { q: "Posso usar o consórcio para quitar um financiamento bancário que já estou pagando?", a: "É possível usar o crédito contemplado para a quitação total de financiamento de sua titularidade, da mesma categoria do consórcio, observadas a anuência da administradora, as condições contratuais e a documentação exigida. Não é uma troca automática de dívida. Compare custos, saldo devedor, eventuais recursos complementares e o tempo de espera pela contemplação." },
  { q: "Existe garantia de contemplação em um prazo específico?", a: "Não. A contemplação ocorre por sorteio ou lance, segundo as regras e os recursos disponíveis do grupo. Nenhum consultor pode garantir uma data ou o sucesso de um lance. A análise do histórico ajuda a escolher um plano compatível com o orçamento, mas não assegura resultado no curto ou médio prazo." },
  { q: "Quais documentos são necessários para aderir a um consórcio?", a: "Em geral, são solicitados RG ou CNH, CPF e comprovante de residência; para empresas, CNPJ, contrato social e documentos dos representantes. A administradora pode pedir comprovação de renda e outros documentos na adesão e na contemplação. A liberação do crédito exige análise cadastral, capacidade de pagamento, garantias e documentação do bem ou serviço, conforme o contrato." },
  { q: "Posso contratar meu consórcio com a Patro Seguros morando em qualquer estado?", a: "Sim. A Patro atende clientes em todo o Brasil por canais digitais, com orientação sobre simulação, escolha de grupos, assinatura e acompanhamento pelo WhatsApp e, quando necessário, videoconferência. A disponibilidade dos planos e as etapas de contratação, avaliação do bem e faturamento seguem as regras da administradora." },
];

export const consorcioWhatsapp = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent("Olá! Quero comparar planos de consórcio e consultar os grupos e o histórico de lances disponíveis para meu objetivo.")}`;
export const consorcioServiceSchema = {
  "@context": "https://schema.org", "@type": "Service",
  "@id": `${EMPRESA.dominioCanonico}/consorcio#service`, url: `${EMPRESA.dominioCanonico}/consorcio`,
  name: "Consultoria de consórcio em todo o Brasil", description: consorcioHub.intro, serviceType: "Consórcio",
  provider: { "@type": "InsuranceAgency", "@id": `${EMPRESA.dominioCanonico}/#insurance-agency` },
  areaServed: { "@type": "Country", name: "Brasil", identifier: "BR" },
};
