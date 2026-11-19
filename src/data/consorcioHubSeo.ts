import { EMPRESA } from "../config/empresa";
import { consorcioHub as copy, consorcioModalities, consorcioComparison, consorcioConsulting, consorcioFaqs, consorcioWhatsapp, consorcioOfficialSources } from "./consorcioHub";
import { calculateConsorcioScenario, formatConsorcioCurrency as money } from "../lib/consorcioSimulation";

const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
const p = (text: string) => `<p>${esc(text)}</p>`;

/** A mesma fonte editorial do hub, disponível também sem executar JavaScript. */
export function getConsorcioStaticContent() {
  const result = calculateConsorcioScenario({
    credit: 300000, consortiumMonths: 180, administrationPercent: 20, reservePercent: 2,
    consortiumOtherCosts: 0, financingMonths: 180, downPayment: 0,
    monthlyInterestPercent: 1, financingOtherCosts: 0,
  })!;
  return {
    h1: copy.h1,
    body: [
      `<nav aria-label="Breadcrumb"><a href="/">Início</a> / Consórcio</nav>`,
      p(copy.badge), p(copy.intro),
      `<ul>${copy.highlights.map(text => `<li>${esc(text)}</li>`).join("")}</ul>`,
      `<section id="comparar"><h2>Explore valores. Entenda os custos.</h2>`,
      p("Simulação educativa, sem cadastro. Os valores iniciais são exemplos hipotéticos, não taxas médias de mercado ou ofertas. Ajuste os custos conforme propostas reais; a economia não é garantida."),
      p("Modalidades: Imóveis, Veículos, Pesados & Agro e Serviços. Valor da carta de R$ 20 mil a R$ 2 milhões e prazo de 36 a 240 meses para comparação. Nem todo valor ou prazo está disponível em cada modalidade. Informe também se possui recursos para lance ou FGTS; FGTS apenas para imóveis e operações elegíveis."),
      p("Exemplo inicial: imóveis, carta de R$ 300.000,00, prazo de 180 meses, administração total de 20%, reserva de 2%, sem outros custos. Financiamento hipotético de mesmo valor e prazo, sem entrada, a 1% ao mês pela Tabela Price."),
      p(`Parcela estimada no consórcio: ${money(result.consortiumPayment)} por mês. Parcela estimada no financiamento: ${money(result.financingPayment)} por mês. Diferença nominal neste exemplo hipotético, sem garantia de economia: ${money(result.nominalDifference)}. Total consórcio: ${money(result.consortiumTotal)}. Total financiamento: ${money(result.financingTotal)}.`),
      p("Como calculamos: consórcio = carta + administração + reserva + outros custos, divididos pelo prazo. Financiamento = parcelas constantes pela Tabela Price sobre o valor após a entrada; entrada e custos extras somam-se ao total, não à parcela. Não é CET nem valor presente. Não inclui inflação, reajustes, lance, rentabilidade, aluguel durante a espera ou devolução eventual da reserva. Planos reais podem usar outras distribuições de parcelas ou SAC. Não há data garantida de contemplação."),
      `<p>Os controles interativos ficam disponíveis com JavaScript. Sem ele, <a href="${esc(consorcioWhatsapp)}">solicite a tabela de grupos e o histórico disponível de lances pelo WhatsApp</a>.</p></section>`,
      `<section id="modalidades"><h2>${esc(copy.modalitiesTitle)}</h2>${p(copy.modalitiesIntro)}`,
      ...consorcioModalities.map(item => `<article><h3>${esc(item.title)}</h3>${p(item.range)}${p(item.use)}${p(item.benefit)}<a href="${esc(item.href)}">${esc(item.action)}</a></article>`),
      `</section><section id="como-funciona"><h2>Como funciona, passo a passo.</h2>`,
      `<ol><li><h3>Defina seu objetivo</h3><p>Considere o crédito, a parcela e quando precisa do bem ou serviço.</p></li><li><h3>Conheça os planos e custos</h3><p>Compare taxas, reserva, seguros, reajustes e regras. Confirme a autorização da administradora no Banco Central.</p></li><li><h3>Participe do grupo</h3><p>Acompanhe assembleias e mantenha as parcelas em dia. Sorteio ou lance não têm data garantida de contemplação.</p></li><li><h3>Use o crédito conforme as regras</h3><p>Após a contemplação, siga as análises, documentos e garantias exigidos para liberação.</p></li></ol></section>`,
      `<section id="comparativo"><h2>Quando o consórcio faz sentido?</h2>${p(copy.comparisonIntro)}`,
      p("Pode ser adequado para quem pode planejar e esperar, desde que parcelas e reajustes caibam no orçamento. Se precisa do bem agora ou em uma data definida, compare compra à vista, financiamento e outras linhas, incluindo custo total e custo da espera. Lance não garante contemplação."),
      `<h3>${esc(copy.comparisonTitle)}</h3>`,
      `<table><caption>Critérios de decisão entre consórcio planejado e financiamento bancário</caption><thead><tr><th scope="col">Critério de decisão</th><th scope="col">Consórcio planejado</th><th scope="col">Financiamento bancário</th></tr></thead><tbody>`,
      ...consorcioComparison.map(row => `<tr><th scope="row">${esc(row.criterion)}</th><td>${esc(row.consortium)}</td><td>${esc(row.financing)}</td></tr>`),
      `</tbody></table></section><section><h2>${esc(copy.consultingTitle)}</h2>${p(copy.consultingIntro)}`,
      ...consorcioConsulting.map(item => `<h3>${esc(item.title)}</h3>${p(item.text)}`),
      `<p>Proteja o bem adquirido: <a href="/seguro-auto">Seguro Auto</a> ou <a href="/seguro-residencial">Seguro Residencial</a>.</p></section>`,
      `<section><h2>${esc(copy.safetyTitle)}</h2>${p(copy.safety)}${p(copy.safetyNote)}`,
      p(`CNPJ: ${EMPRESA.cnpj}. SUSEP: ${EMPRESA.susep}.`),
      `<p><a href="${esc(EMPRESA.redesSociais.google)}">Avaliações no Google: ${EMPRESA.metricas.googleRating.toFixed(1)}/5</a></p>`,
      `<p>Atendimento digital nacional e sede em Guarulhos. Conheça o <a href="/consorcio-guarulhos">atendimento de consórcio em Guarulhos</a>.</p></section>`,
      `<section id="duvidas"><h2>${esc(copy.faqTitle)}</h2>`,
      ...consorcioFaqs.map(faq => `<h3>${esc(faq.q)}</h3>${p(faq.a)}`),
      `<h3>Confira as regras nas fontes oficiais</h3>`,
      p("A Patro orienta sua consulta; a administradora conduz o grupo e decide sobre a liberação do crédito. O Banco Central fiscaliza as administradoras, mas não garante a operação nem a contemplação. Confirme as regras vigentes antes de contratar."),
      `<ul>${consorcioOfficialSources.map(source => `<li><a href="${esc(source.url)}">${esc(source.label)}</a></li>`).join("")}</ul>`,
      `</section><section><h2>${esc(copy.ctaTitle)}</h2>${p(copy.ctaText)}`,
      `<p><a href="#comparar">Simular meu consórcio agora</a> — <a href="${esc(consorcioWhatsapp)}">Falar com especialista no WhatsApp</a></p></section>`,
      `<section id="simulacao"><h2>Receba uma análise personalizada</h2><p>Informe seu objetivo e sua cidade para receber orientação da Patro. <a href="${esc(consorcioWhatsapp)}">Solicitar análise do meu consórcio pelo WhatsApp</a>.</p></section>`,
      `<aside>${p(copy.warning)}</aside>`,
    ].join("\n"),
  };
}
