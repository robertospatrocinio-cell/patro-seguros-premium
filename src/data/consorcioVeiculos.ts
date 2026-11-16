import { consorcioFinancialProductSchema, consorcioHub } from "./consorcioHub";

export const consorcioVeiculosPath = "/consorcio-veiculos";
const url = consorcioFinancialProductSchema.url.replace(/\/consorcio$/, consorcioVeiculosPath);

// Fonte única para o conteúdo visível, a versão estática e o JSON-LD.
export const consorcioVeiculosFaqs = [
  {
    question: "Posso comprar um carro usado ou seminovo com a carta de consórcio?",
    answer: "Sim, desde que o veículo seja aceito pela administradora e atenda à categoria e às condições do grupo. O limite de ano de fabricação não é universal: confirme a idade máxima permitida antes de aderir ou negociar a compra. A liberação do crédito depende da análise cadastral, das garantias, da documentação e da avaliação ou vistoria exigida pela administradora.",
  },
  {
    question: "Como funciona o reajuste das parcelas no consórcio de automóveis?",
    answer: "O crédito e as parcelas são atualizados conforme o índice ou o preço do bem de referência, a periodicidade e as regras previstos no contrato. O grupo pode adotar IPCA ou uma tabela de referência de veículos, sem que exista um critério único para todas as administradoras. O reajuste busca preservar o poder de compra, mas não garante acompanhar o preço do carro escolhido e pode elevar as parcelas. Confira também as regras após a contemplação e o uso do crédito.",
  },
  {
    question: "E se o carro que eu escolher custar menos do que o valor da minha carta de crédito?",
    answer: "Se uma carta de R$ 100 mil for usada para comprar um veículo de R$ 88 mil, o saldo será de R$ 12 mil. Parte desse saldo pode ser destinada a despesas vinculadas à aquisição, como transferência, tributos, registros e seguros, observadas as normas aplicáveis, a comprovação, a aprovação da administradora e o limite de até 10% do crédito para essa finalidade. Isso não significa que toda a diferença possa ser usada livremente ou pagar qualquer IPVA ou seguro. O saldo também pode ser usado para quitar prestações vincendas, conforme as regras do grupo. Confirme a destinação permitida antes de assumir despesas.",
  },
  {
    question: "Posso comprar o carro de um vendedor particular (pessoa física) em vez de concessionária?",
    answer: "Sim, pode ser possível comprar de concessionária, loja ou proprietário pessoa física, desde que a administradora aprove o veículo, o vendedor e a documentação. Após a contemplação, são exigidas análise cadastral, garantias e as etapas de avaliação e transferência aplicáveis, incluindo ATPV-e ou o documento correspondente. A administradora paga o vendedor após cumprir as exigências; a contemplação não libera automaticamente dinheiro para o participante.",
  },
  {
    question: "Vocês atendem clientes de qualquer estado do Brasil?",
    answer: "Sim. A Patro atende clientes de todos os estados do Brasil por canais digitais, com orientação sobre simulação, escolha do grupo, contratação e acompanhamento pelo WhatsApp. A assinatura, a vistoria, a transferência e o pagamento ao vendedor seguem as regras da administradora e podem exigir documentos ou etapas presenciais. Não há garantia de que todas as etapas sejam integralmente online, nem de contemplação em data específica.",
  },
];

export const consorcioVeiculosFinancialProductSchema = {
  ...consorcioFinancialProductSchema,
  "@id": `${url}#product`,
  name: "Consórcio de Veículos: Carros 0km, Seminovos, Elétricos e Motos",
  description: "Cartas de crédito de referência de R$ 30 mil a R$ 350 mil, sujeitas à disponibilidade do grupo, para carros novos, seminovos, elétricos, híbridos, utilitários e motos em todo o Brasil, conforme os veículos aceitos pela administradora. Sem juros de financiamento; há taxa de administração e outros custos contratuais.",
  url,
  category: "Consórcio de Automóveis e Motos",
  interestRate: 0,
  amount: {
    "@type": "MonetaryAmount",
    currency: "BRL",
    minValue: 30000,
    maxValue: 350000,
  },
  feesAndCommissionsSpecification: consorcioHub.warning,
};

export const consorcioVeiculosSchema = {
  "@context": "https://schema.org",
  "@graph": [
    consorcioVeiculosFinancialProductSchema,
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: consorcioVeiculosFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};
