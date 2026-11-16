import { EMPRESA, WHATSAPP_URL_BASE } from "../config/empresa";
import { consorcioServicos as copy } from "./consorcioServicos";

export const consorcioServicosWhatsapp = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent("Olá! Quero uma simulação de consórcio de serviços. Gostaria de comparar cartas, prazos, custos e condições para meu projeto.")}`;
export const consorcioServicosLinks = [
  { href: "/seguro-residencial", label: "Vai reformar sua casa? Conheça também o Seguro Residencial" },
  { href: "/seguro-viagem", label: "Vai viajar para o exterior? Veja opções de Seguro Viagem" },
  { href: "/consorcio", label: "Voltar para o hub geral de consórcios" },
];
export const consorcioServicosModalities = [
  { href: "/consorcio-imoveis", label: "Consórcio de Imóveis" },
  { href: "/consorcio-veiculos", label: "Consórcio de Veículos" },
  { href: "/consorcio-pesados-maquinas", label: "Consórcio de Pesados e Máquinas" },
];
const url = `${EMPRESA.dominioCanonico}${copy.path}`;
export const consorcioServicosFinancialProductSchema = {
  "@type": "FinancialProduct",
  "@id": `${url}#financial-product`,
  name: "Consórcio de Serviços",
  description: copy.description,
  url,
  category: "Consórcio de Serviços",
  areaServed: { "@type": "Country", name: "Brasil", alternateName: "BR" },
  provider: { "@type": "InsuranceAgency", "@id": `${EMPRESA.dominioCanonico}/#insurance-agency` },
  interestRate: 0,
  amount: {
    "@type": "MonetaryAmount",
    currency: "BRL",
    minValue: 10000,
    maxValue: 60000,
  },
  feesAndCommissionsSpecification: copy.warning,
};

// As mesmas perguntas alimentam a página, a versão estática e o JSON-LD.
export const consorcioServicosFaqSchema = {
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: copy.faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};
export const consorcioServicosSchema = {
  "@context": "https://schema.org",
  "@graph": [consorcioServicosFinancialProductSchema, consorcioServicosFaqSchema],
};

const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const p = (text: string) => `<p>${esc(text)}</p>`;
const h2 = (text: string) => `<h2>${esc(text)}</h2>`;
const link = ({ href, label }: { href: string; label: string }) => `<p><a href="${esc(href)}">${esc(label)}</a></p>`;

/** Fonte única para o conteúdo legível antes de o React carregar. */
export function getConsorcioServicosStaticContent() {
  return {
    h1: copy.h1,
    body: [
      '<nav aria-label="Breadcrumb"><a href="/">Início</a> / <a href="/consorcio">Consórcios</a> / Consórcio de Serviços</nav>',
      p(copy.badge), p(copy.subtitle),
      `<ul>${copy.highlights.map(text => `<li>${esc(text)}</li>`).join("")}</ul>`, p(copy.warning),
      '<section id="simulacao">', h2("Estudo de Consórcio de Serviços"),
      p("Receba opções de parcelas e prazos para realizar seu projeto sem juros de financiamento. Informe nome, WhatsApp, tipo de projeto, valor estimado da carta e previsão para realizar o projeto. A previsão não garante contemplação."),
      link({ href: consorcioServicosWhatsapp, label: "Receber simulação personalizada pelo WhatsApp" }), '</section>',
      h2(copy.pain.heading), ...copy.pain.paragraphs.map(p),
      h2(copy.projectsHeading), p(copy.projectsIntro),
      ...copy.projects.map(item => `<h3>${esc(item.title)}</h3>${p(item.text)}`),
      h2(copy.comparisonHeading), p(copy.comparisonIntro),
      '<table><caption>Comparação ilustrativa para projeto de R$ 30.000 em 36 meses</caption><thead><tr><th scope="col">Critério</th><th scope="col">Consórcio de Serviços</th><th scope="col">Empréstimo Pessoal / CDC</th></tr></thead><tbody>',
      ...copy.comparisonRows.map(([criterion, consortium, loan]) => `<tr><th scope="row">${esc(criterion)}</th><td>${esc(consortium)}</td><td>${esc(loan)}</td></tr>`),
      '</tbody></table>', p(copy.comparisonNote), h2(copy.stepsHeading),
      ...copy.steps.map((step, i) => `<h3>${i + 1}. ${esc(step.title)}</h3>${p(step.text)}`),
      ...consorcioServicosLinks.map(link),
      h2("Perguntas Frequentes sobre Consórcio de Serviços"),
      ...copy.faqs.map(faq => `<h3>${esc(faq.question)}</h3>${p(faq.answer)}`),
      h2(copy.closingHeading), p(copy.closingText),
      link({ href: consorcioServicosWhatsapp, label: `Falar no WhatsApp ${EMPRESA.telefone}` }),
      h2("Conheça as outras modalidades de consórcio"), ...consorcioServicosModalities.map(link),
    ].join("\n"),
  };
}
