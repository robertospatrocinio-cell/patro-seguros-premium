/** Modalidades locais: endereços e metadados preservados. */
export interface ConsorcioFaq { question: string; answer: string }
export interface ConsorcioIntentPage {
  slug: string; path: string; navLabel: string; title: string; metaDescription: string;
  h1: string; subtitle: string; intro: string; audience: string[]; bullets: string[];
  sections: { heading: string; body: string }[];
  whatsappOrigem: string; whatsappMessage: string; faqs: ConsorcioFaq[];
}
export const CONSORCIO_HUB_PATH = "/consorcio";
export const CONSORCIO_LOCAL_PATH = "/consorcio-guarulhos";
export const CONSORCIO_TRANSPARENCY_NOTICE = "As administradoras de consórcio são fiscalizadas pelo Banco Central. Confira a autorização da instituição antes de contratar. A contemplação ocorre por sorteio ou lance, conforme o regulamento e os recursos do grupo, sem data garantida. Adesão e contemplação não asseguram liberação: há análise de cadastro, garantias e documentação.";
export const CONSORCIO_PRUDENT_LANGUAGE = "Consulte a disponibilidade para seu objetivo. Crédito, prazo, taxa de administração, fundo de reserva, seguros, reajustes, bens aceitos e regras de lance dependem do grupo e do contrato. O seguro do bem adquirido é uma contratação separada.";

export const CONSORCIO_INTENT_PAGES: ConsorcioIntentPage[] = [
  {
    slug: "consorcio-guarulhos", path: "/consorcio-guarulhos", navLabel: "Consórcio Guarulhos",
    title: "Consórcio em Guarulhos | Imóveis, Carros e Caminhões | Patro",
    metaDescription: "Consórcio em Guarulhos sem juros. Compare as melhores administradoras para comprar seu imóvel, carro ou frota com parcelas que cabem no seu bolso.",
    h1: "Consórcio em Guarulhos",
    subtitle: "Planeje a aquisição do imóvel, do veículo ou de ativos para sua operação com orientação em Guarulhos e região.",
    intro: "A Patro orienta a consulta de grupos para imóveis, veículos, pesados e serviços. A escolha começa pela finalidade, pelo orçamento e pelo tempo que você pode esperar, com as mesmas análises e exigências da administradora.",
    audience: ["Moradores que podem planejar a aquisição sem data fixa", "Autônomos que avaliam a troca do veículo", "Empresas que programam a compra de ativos"],
    bullets: ["Sem juros de financiamento, com administração e outros custos contratuais", "Crédito e prazo sujeitos à disponibilidade", "FGTS somente nas operações imobiliárias elegíveis"],
    sections: [{ heading: "Atendimento e planejamento em Guarulhos", body: "Informe sua cidade, finalidade e prazo de necessidade. Para imóvel, veículo ou equipamento, confirme o enquadramento na categoria. O atendimento local não altera regras de lance, documentação ou análise de capacidade de pagamento." }],
    whatsappOrigem: "consorcio_guarulhos", whatsappMessage: "Olá! Gostaria de fazer uma simulação de consórcio em Guarulhos.",
    faqs: [{ question: "O atendimento em Guarulhos muda as regras de contemplação?", answer: "Não. Sorteio e lance seguem o regulamento e os recursos do grupo. A orientação local ajuda a organizar a consulta e os documentos, mas não assegura data, aprovação ou liberação imediata da carta." }],
  },
  {
    slug: "consorcio-imoveis-guarulhos", path: "/consorcio-imoveis-guarulhos", navLabel: "Consórcio Imobiliário",
    title: "Consórcio de Imóveis em Guarulhos | Casa e Apto | Patro",
    metaDescription: "Consórcio imobiliário em Guarulhos: compre sua casa, apartamento ou terreno sem juros. Use seu FGTS para lance. Cotação online.",
    h1: "Consórcio de Imóveis em Guarulhos",
    subtitle: "Planeje casa, apartamento, terreno ou imóvel comercial com atenção à documentação e ao custo de esperar.",
    intro: "Consulte imóveis novos ou usados em Guarulhos, inclusive nas regiões de Maia, Vila Augusta e Centro. Construção e reforma dependem de previsão contratual e podem exigir projeto, orçamento e aprovações. A carta só pode ser usada nas finalidades admitidas.",
    audience: ["Famílias que podem manter o aluguel durante a espera", "Compradores de terreno ou imóvel comercial elegível", "Quem planeja construção ou reforma admitida pelo grupo"],
    bullets: ["Compare o crédito com tributos, registro e avaliação", "Confirme índice e periodicidade dos reajustes", "FGTS depende do participante, imóvel e operação"],
    sections: [{ heading: "FGTS e o imóvel escolhido", body: "O FGTS pode participar de lance, complemento da compra ou amortização em operações elegíveis, conforme as regras vigentes. Não presuma aceitação para terreno isolado, imóvel comercial ou de investimento. Valide a operação antes de contar com esse recurso." }],
    whatsappOrigem: "consorcio_imovel_guarulhos", whatsappMessage: "Olá! Quero simular um consórcio de imóveis em Guarulhos.",
    faqs: [
      { question: "Posso comprar terreno, construir ou reformar em Guarulhos?", answer: "Pode ser possível se o grupo admitir a finalidade. A administradora define exigências para o terreno, matrícula, projeto, orçamento, garantias e eventual liberação por etapas. Confirme o enquadramento antes de aderir ou contratar a obra." },
      { question: "Preciso escolher o imóvel antes da adesão?", answer: "É importante definir finalidade e orçamento. A escolha e a aprovação do imóvel seguem as condições do grupo; contemplação não dispensa matrícula, certidões e análise do vendedor. Não assuma compromissos contando com uma data de liberação." },
      { question: "O FGTS é aceito em qualquer compra?", answer: "Não. O uso depende das regras vigentes, do trabalhador, do imóvel e da operação. Imóveis comerciais, terrenos isolados e aquisições para investimento não devem ser considerados elegíveis sem validação específica." },
    ],
  },
  {
    slug: "consorcio-veiculos-guarulhos", path: "/consorcio-veiculos-guarulhos", navLabel: "Consórcio de Veículos",
    title: "Consórcio de Veículos em Guarulhos | Carros e Motos | Patro",
    metaDescription: "Consórcio de carros e motos em Guarulhos. Troque de veículo sem juros com planos de 36 a 100 meses. Simule agora.",
    h1: "Consórcio de Veículos em Guarulhos",
    subtitle: "Programe a compra de carro, moto ou utilitário, considerando o veículo aceito e a carta líquida.",
    intro: "Consulte carros novos, seminovos ou usados e motos na categoria adequada. Híbridos e elétricos dependem das regras do grupo. Antes de contratar, confirme idade máxima, procedência, avaliação e condições do veículo desejado.",
    audience: ["Famílias que planejam a troca do carro", "Quem pretende adquirir uma moto sem data rígida", "Autônomos e empresas que podem esperar pelo utilitário"],
    bullets: ["Crédito líquido após eventual lance embutido", "Ano e aceitação do veículo conforme o grupo", "Transferência, tributos e manutenção no orçamento"],
    sections: [{ heading: "Seminovos e recursos da venda do usado", body: "Não há um limite de idade único para todas as administradoras. A venda do usado pode gerar recursos próprios para lance, mas entrega do bem ou troca de chaves não é aceita automaticamente. Confirme a operação e preserve uma reserva para a transferência." }],
    whatsappOrigem: "consorcio_veiculos_guarulhos", whatsappMessage: "Olá! Gostaria de simular um consórcio de carro/moto em Guarulhos.",
    faqs: [
      { question: "Como o lance embutido afeta minha compra?", answer: "Quando admitido e vencedor, o valor utilizado sai da própria carta, reduzindo o crédito disponível para o veículo. Confira o limite contratual e o complemento necessário. O embutido não garante contemplação." },
      { question: "Posso comprar moto, híbrido ou elétrico?", answer: "Consulte a categoria e os bens aceitos pelo grupo. Modelo, idade, condições de avaliação e documentação do vendedor precisam ser aprovados; não basta o preço ser inferior ao crédito." },
      { question: "Faz sentido para quem precisa do carro agora para trabalhar?", answer: "A contemplação não tem data garantida. Se o veículo é necessário imediatamente, compare financiamento, compra à vista e outras soluções disponíveis com seu custo completo e análise de aprovação." },
    ],
  },
  {
    slug: "consorcio-caminhoes-guarulhos", path: "/consorcio-caminhoes-guarulhos", navLabel: "Consórcio de Caminhões",
    title: "Consórcio de Caminhões em Guarulhos | Frotas e Pesados",
    metaDescription: "Consórcio de caminhões e pesados em Guarulhos. Ideal para renovação de frota e autônomos. Planos sem juros e taxas competitivas.",
    h1: "Consórcio de Caminhões em Guarulhos",
    subtitle: "Planeje a renovação do caminhão ou da frota sem vincular a operação a uma data presumida de contemplação.",
    intro: "Transportadores de Guarulhos e da região de Cumbica podem consultar caminhões, carretas e implementos admitidos no grupo. Avalie ano, aplicação, valor estimado e o calendário de substituição de cada ativo.",
    audience: ["Transportadoras com renovação planejada", "Motoristas autônomos com flexibilidade de aquisição", "Empresas de logística que comparam o custo de esperar"],
    bullets: ["Parcelas e reajustes junto de combustível e manutenção", "Prazo e bens aceitos definidos pelo grupo", "Lance sem comprometer o capital de giro"],
    sections: [{ heading: "Logística e fluxo de caixa em Cumbica", body: "Organize a renovação de frota por etapas, incluindo manutenção do veículo atual durante a espera. Se um frete ou contrato exige o caminhão em data determinada, compare alternativas de compra imediata. Consórcio compromete recursos e não assegura preservação do capital de giro." }],
    whatsappOrigem: "consorcio_caminhao_guarulhos", whatsappMessage: "Olá! Quero simular um consórcio de caminhão/pesados.",
    faqs: [
      { question: "A carta pode comprar implementos rodoviários?", answer: "Consulte se carretas e implementos estão incluídos na categoria do grupo. A aceitação depende de tipo, ano, avaliação, documentação e condições da administradora; não é automática para qualquer implemento." },
      { question: "Posso renovar vários caminhões ao mesmo tempo?", answer: "É necessário analisar o enquadramento e cada operação. Múltiplas cotas podem ter contemplações em momentos diferentes, sem data garantida. Dimensione as obrigações totais antes de comprometer o caixa da frota." },
      { question: "Quem trabalha como autônomo pode consultar?", answer: "Sim, a consulta pode considerar pessoa física ou jurídica, conforme a operação admitida. A adesão e a liberação exigem os documentos, a capacidade de pagamento e as garantias definidos pela administradora." },
    ],
  },
  {
    slug: "consorcio-empresarial-guarulhos", path: "/consorcio-empresarial-guarulhos", navLabel: "Consórcio Empresarial",
    title: "Consórcio Empresarial em Guarulhos | Máquinas e Imóveis | Patro",
    metaDescription: "Consórcio para empresas em Guarulhos. Compre sede própria, máquinas ou veículos para sua empresa sem juros. Alavanque seu negócio.",
    h1: "Consórcio Empresarial em Guarulhos",
    subtitle: "Planeje veículos, máquinas ou imóvel comercial conforme a necessidade e a capacidade de pagamento da empresa.",
    intro: "PMEs, indústrias de Cumbica e comércios locais podem consultar a aquisição de ativos pela categoria correspondente. Frotas, máquinas, equipamentos e imóveis comerciais têm condições próprias; confirme a adesão por CNPJ e os bens aceitos.",
    audience: ["PMEs que planejam ativos sem data fixa de entrega", "Indústrias que avaliam renovar máquinas e equipamentos", "Comércios que estudam sede própria ou utilitários"],
    bullets: ["Planejamento de caixa com taxas e reajustes", "Categoria compatível com o ativo desejado", "Análise cadastral e garantias para pessoa jurídica"],
    sections: [{ heading: "Sede própria e expansão da operação", body: "Compare a compra do imóvel comercial com a manutenção do aluguel durante a espera. Para máquinas e frotas, inclua instalação e manutenção no orçamento. Questões contábeis e tributárias devem ser avaliadas com o contador; não há vantagem fiscal universal ou expansão garantida." }],
    whatsappOrigem: "consorcio_empresarial_guarulhos", whatsappMessage: "Olá! Gostaria de falar sobre consórcio empresarial para minha empresa.",
    faqs: [
      { question: "Empresa pode contratar consórcio?", answer: "A contratação por pessoa jurídica depende de aceitação, documentos e condições da administradora. Consulte a categoria do ativo, a capacidade de pagamento, a representação da empresa e as garantias exigidas. O CNPJ não assegura aprovação." },
      { question: "A mesma carta pode ser usada para qualquer ativo?", answer: "Não presuma essa liberdade. Veículo, máquina, equipamento ou imóvel precisa estar dentro da categoria e das condições contratadas. Valide a finalidade antes da adesão e antes de escolher o fornecedor." },
      { question: "Quais documentos a empresa deve preparar?", answer: "Podem ser exigidos CNPJ, contrato social e alterações, documentos dos representantes, informações financeiras e documentos do bem e do vendedor. A lista e as garantias são definidas pela administradora para cada operação." },
      { question: "O consórcio garante capital de giro preservado?", answer: "Não. Parcelas, reajustes e recursos para lance comprometem o caixa. Projete as obrigações junto de folha, tributos e fornecedores e compare alternativas com seu contador. Não há data garantida para a aquisição." },
    ],
  },
];
