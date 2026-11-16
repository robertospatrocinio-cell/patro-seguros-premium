import { consorcioFinancialProductSchema, consorcioHub } from "./consorcioHub";

export const consorcioImoveisPath = "/consorcio-imoveis";
const url = consorcioFinancialProductSchema.url.replace(/\/consorcio$/, consorcioImoveisPath);

// Fonte única para o conteúdo visível, a versão estática e o JSON-LD.
export const consorcioImoveisFaqs = [
  {
    question: "Posso usar o consórcio de imóveis para quitar um financiamento que já tenho no banco?",
    answer: "Sim, após a contemplação pode ser possível usar o crédito para a quitação total de financiamento imobiliário de sua titularidade, mediante aprovação da administradora e atendimento às condições contratuais e à documentação exigida. A operação pode envolver interveniência quitante. Se o crédito não cobrir o saldo devedor, confirme a possibilidade de complementar com recursos próprios. Não presuma que seja permitida a amortização parcial do financiamento com a carta. O uso do FGTS, quando elegível, segue regras próprias.",
  },
  {
    question: "Como funciona o reajuste pelo INCC no consórcio imobiliário?",
    answer: "O INCC (Índice Nacional de Custo da Construção) pode ser usado para atualizar o crédito e as parcelas, mas não é obrigatório em todos os grupos. O índice e a periodicidade são definidos no contrato, que pode prever outro critério de atualização. O reajuste busca preservar o poder de compra, sem garantir que a carta acompanhe o preço de um imóvel específico, e pode elevar as parcelas. Confira as regras também após a contemplação e o uso do crédito.",
  },
  {
    question: "Posso comprar um imóvel rural (sítio, chácara ou fazenda) com consórcio de imóveis?",
    answer: "Depende da administradora, da categoria do grupo e da documentação e das garantias aceitas. A compra de imóvel rural pode exigir matrícula regularizada, avaliação e documentos rurais, como CCIR e comprovação de regularidade do ITR, além de outras exigências aplicáveis. Confirme a aceitação antes de aderir; não presuma que uma carta de pesados ou máquinas possa comprar terras. O FGTS não se aplica à aquisição de imóvel rural.",
  },
  {
    question: "E se eu contemplar a carta, mas ainda não tiver escolhido o imóvel?",
    answer: "Você pode escolher o imóvel posteriormente, conforme as regras do grupo. Enquanto não utilizado, o crédito disponibilizado permanece aplicado pela administradora e recebe os rendimentos líquidos previstos nas regras aplicáveis. Isso não garante retorno fixo nem valorização igual à dos imóveis. As obrigações da cota continuam, e o pagamento ao vendedor depende da análise cadastral, da documentação e das garantias exigidas.",
  },
  {
    question: "Vocês atendem clientes que querem comprar imóveis fora de São Paulo?",
    answer: "Sim. A Patro atende compradores e investidores de todos os estados do Brasil por canais digitais, da simulação à orientação sobre a contratação e o uso do crédito. A aceitação do imóvel, a assinatura, a avaliação, o registro e o pagamento ao vendedor seguem as regras da administradora e podem exigir documentos ou etapas presenciais. Não há garantia de que todas as etapas sejam integralmente digitais.",
  },
];

export const consorcioImoveisFinancialProductSchema = {
  ...consorcioFinancialProductSchema,
  "@id": `${url}#product`,
  name: "Consórcio de Imóveis Residenciais, Comerciais e Construção",
  description: "Cartas de crédito de referência de R$ 100 mil a R$ 2 milhões, sujeitas à disponibilidade do grupo, para compra de imóvel, terreno, construção, reforma, planejamento patrimonial e quitação de financiamento, conforme o contrato. Uso do FGTS apenas nas operações habitacionais elegíveis. Sem juros de financiamento; há taxa de administração e outros custos contratuais.",
  url,
  category: "Consórcio Imobiliário",
  interestRate: 0,
  amount: {
    "@type": "MonetaryAmount",
    currency: "BRL",
    minValue: 100000,
    maxValue: 2000000,
  },
  feesAndCommissionsSpecification: consorcioHub.warning,
};

export const consorcioImoveisSchema = {
  "@context": "https://schema.org",
  "@graph": [
    consorcioImoveisFinancialProductSchema,
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: consorcioImoveisFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};
