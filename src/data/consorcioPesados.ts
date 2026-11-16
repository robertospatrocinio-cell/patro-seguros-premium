import { consorcioFinancialProductSchema, consorcioHub } from "./consorcioHub";

export const consorcioPesadosPath = "/consorcio-pesados-maquinas";
const url = consorcioFinancialProductSchema.url.replace(/\/consorcio$/, consorcioPesadosPath);

// Mesma fonte para as perguntas visíveis, a versão estática e o JSON-LD.
export const consorcioPesadosFaqs = [
  {
    question: "Posso comprar um caminhão ou trator usado com a carta de consórcio?",
    answer: "Sim, desde que o grupo e a administradora aceitem o bem. Caminhões, implementos e máquinas agrícolas seminovos estão sujeitos ao limite de ano de fabricação, à avaliação e à documentação exigidos para cada equipamento. Não existe um limite universal de idade: confirme as condições antes de aderir. A contemplação não substitui a aprovação do bem e das garantias.",
  },
  {
    question: "Como funciona o reajuste das parcelas no consórcio de pesados?",
    answer: "O crédito e as parcelas são atualizados conforme o índice, o bem de referência e a periodicidade definidos no contrato. Podem ser utilizados IPCA ou tabelas de referência, conforme o grupo, sem uma regra única para todas as administradoras. O reajuste busca preservar o poder de compra e pode aumentar as parcelas. Confira também as regras após a contemplação e o uso do crédito.",
  },
  {
    question: "É possível juntar duas ou mais cartas de crédito para comprar uma colheitadeira ou caminhão de maior valor?",
    answer: "Pode ser possível combinar créditos de cotas contempladas da mesma administradora para adquirir um único equipamento, desde que ela autorize a operação e que as categorias, garantias e condições contratuais sejam compatíveis. Confirme essa possibilidade antes de contratar múltiplas cotas. As contemplações podem ocorrer em momentos diferentes e não há garantia de data para a compra.",
  },
  {
    question: "Como funciona o seguro obrigatório após a contemplação da carta?",
    answer: "A exigência de seguro depende do contrato e das garantias solicitadas pela administradora. Após a contemplação, o caminhão ou a máquina pode ficar alienado até a quitação, e pode ser exigida uma apólice ativa com cláusula beneficiária. A Patro orienta a contratação do seguro separadamente do consórcio, sujeita à análise, à aceitação do risco e às condições da seguradora. O registro SUSEP refere-se à corretagem de seguros; as administradoras de consórcio são fiscalizadas pelo Banco Central.",
  },
  {
    question: "Vocês atendem transportadoras e produtores rurais fora de São Paulo?",
    answer: "Sim. A Patro atende transportadoras, motoristas autônomos e produtores rurais de todos os estados do Brasil por canais digitais, da simulação à orientação sobre a contratação e o uso da carta. A disponibilidade dos planos, a assinatura, a avaliação do bem e o faturamento seguem as regras da administradora e podem exigir etapas ou documentos específicos.",
  },
];

export const consorcioPesadosFinancialProductSchema = {
  ...consorcioFinancialProductSchema,
  "@id": `${url}#product`,
  name: "Consórcio de Pesados, Caminhões e Máquinas Agrícolas",
  description: "Cartas de crédito de referência de R$ 150 mil a R$ 2 milhões, sujeitas à disponibilidade do grupo, para caminhões, implementos rodoviários, tratores, colheitadeiras e máquinas de linha amarela em todo o Brasil. Sem juros de financiamento; há taxa de administração e outros custos conforme o contrato.",
  url,
  category: "Consórcio de Pesados e Agronegócio",
  interestRate: 0,
  amount: {
    "@type": "MonetaryAmount",
    currency: "BRL",
    minValue: 150000,
    maxValue: 2000000,
  },
  feesAndCommissionsSpecification: consorcioHub.warning,
};

export const consorcioPesadosSchema = {
  "@context": "https://schema.org",
  "@graph": [
    consorcioPesadosFinancialProductSchema,
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: consorcioPesadosFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};
