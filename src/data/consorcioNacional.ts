import type { ConsorcioIntentPage } from "./consorcioVertical";
import { consorcioModalities } from "./consorcioHub";

export const CONSORCIO_NATIONAL_PATHS = ["/consorcio-imoveis", "/consorcio-pesados-maquinas", "/consorcio-veiculos", "/consorcio-servicos"];

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export function getConsorcioNationalStaticContent(page: ConsorcioIntentPage) {
  const p = (text: string) => `<p>${escapeHtml(text)}</p>`;
  const list = (items: string[]) => `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  return {
    h1: page.h1,
    body: `<nav aria-label="Breadcrumb"><a href="/">Início</a> / <a href="/consorcio">Consórcio</a> / ${escapeHtml(page.navLabel)}</nav>`
      + p("Atendimento digital em todo o Brasil") + p(page.subtitle)
      + `<h2>O que você pode planejar</h2>${p(page.intro)}<h3>Para quem faz sentido</h3>${list(page.audience)}<h3>Crédito, prazo e condições</h3>${list(page.bullets)}`
      + page.sections.map(section => `<h2>${escapeHtml(section.heading)}</h2>${p(section.body)}`).join("")
      + `<h2>Perguntas frequentes sobre ${escapeHtml(page.navLabel.toLowerCase())}</h2>`
      + page.faqs.map(faq => `<h3>${escapeHtml(faq.question)}</h3>${p(faq.answer)}`).join("")
      + `<h2>Continue seu planejamento</h2><p>Compare no <a href="/consorcio#comparar">simulador de consórcio</a> ou conheça o <a href="/consorcio-guarulhos">atendimento em Guarulhos</a>.</p>`
      + CONSORCIO_NATIONAL_PAGES.filter(item => item.path !== page.path).map(item => `<p><a href="${item.path}">${escapeHtml(item.navLabel)}</a></p>`).join("")
      + `<h2>Proteja o patrimônio adquirido</h2><p>O seguro é uma contratação separada, conforme o bem e as exigências da administradora.</p>`
      + (page.path === "/consorcio-pesados-maquinas" ? `<p><a href="/seguro-agronegocio">Seguro Agronegócio</a> e <a href="/seguro-maquinas-equipamentos">Seguro de Máquinas e Equipamentos</a>.</p>` : page.path === "/consorcio-veiculos" ? `<p><a href="/seguro-auto">Seguro Auto</a> e <a href="/seguro-moto">Seguro Moto</a>.</p>` : `<p><a href="/seguro-residencial">Seguro Residencial</a> e <a href="/seguro-empresarial">Seguro Empresarial</a>.</p>`)
      + `<h2>Receba uma análise para o seu objetivo</h2><p>Informe sua cidade, o crédito desejado e os recursos para lance. <a href="/consorcio#simulacao">Solicitar análise personalizada</a>.</p>`,
  };
}
const details = [
  {
    title: "Consórcio de Imóveis e FGTS | Patro Seguros",
    description: "Planeje casa, apartamento, terreno ou construção. Compare custos, regras de FGTS e lances no consórcio de imóveis com atendimento em todo o Brasil.",
    audience: ["Famílias que podem planejar a compra sem data fixa", "Quem busca construir ou reformar conforme as regras do grupo", "Empresas e compradores de imóveis comerciais"],
    sections: [
      { heading: "Da escolha do imóvel à liberação da carta", body: "Informe o tipo de imóvel, sua cidade, o crédito necessário e quanto cabe no orçamento. Casas, apartamentos, terrenos, construção e reformas podem ser admitidos conforme o contrato. Após a contemplação, a administradora analisa cadastro, garantias e documentação do imóvel; a compra não é liberada automaticamente. Reserve recursos para avaliação, tributos e registro, conferindo quais despesas podem ser pagas com o crédito." },
      { heading: "FGTS: confira a elegibilidade antes de contar com o saldo", body: "O FGTS pode compor lance, complementar a compra ou amortizar o saldo nas operações imobiliárias elegíveis. A possibilidade depende do trabalhador, do imóvel e das regras vigentes. Não presuma que terrenos isolados, imóveis comerciais ou destinados a investimento admitem FGTS. Confirme a operação com a administradora antes da adesão." },
      { heading: "Compare com financiamento e preserve sua reserva", body: "Compare taxa de administração total, fundo de reserva, seguros, índice de reajuste e prazo com o CET de uma proposta de financiamento. O consórcio não oferece uso imediato do imóvel. Inclua o aluguel durante a espera e os reajustes no orçamento; não dependa de futura locação ou valorização para pagar as parcelas." },
    ],
    faqs: [
      { question: "Posso comprar imóvel usado ou construir?", answer: "Pode ser possível, desde que a finalidade, o imóvel e a documentação sejam aceitos pela administradora. Construções podem exigir projeto, cronograma e liberações por etapas. Consulte as condições do grupo antes de contratar." },
      { question: "Consórcio de imóveis tem parcelas fixas?", answer: "Não necessariamente. Crédito e parcelas seguem o índice e a periodicidade previstos no contrato, como INCC ou outro índice acordado. Verifique as regras também após a contemplação e o uso do crédito." },
      { question: "O FGTS garante contemplação?", answer: "Não. Quando elegível, o saldo pode compor um lance, mas a contemplação depende das regras e dos recursos do grupo e dos lances concorrentes. Não existe data garantida." },
    ],
  },
  {
    title: "Consórcio de Pesados e Máquinas Agrícolas | Patro",
    description: "Planeje caminhões, tratores, implementos e máquinas com consórcio. Compare custos, crédito líquido e regras de lance com atendimento nacional da Patro.",
    audience: ["Transportadores e motoristas autônomos", "Produtores rurais que planejam a renovação do maquinário", "Construtoras e empresas com máquinas de linha amarela"],
    sections: [
      { heading: "Caminhões, implementos e máquinas aceitos pelo grupo", body: "Informe marca, modelo, ano, aplicação e valor estimado do equipamento. Caminhões, carretas, tratores, colheitadeiras, pulverizadores, escavadeiras e pás carregadeiras exigem enquadramento na categoria contratada. Bens usados podem ter limites de idade, avaliação e documentação próprios; não basta a carta ter valor suficiente." },
      { heading: "Planejamento de safra, frota e capital de giro", body: "Dimensione as parcelas sem comprometer manutenção, insumos e folha de pagamento. A contemplação não tem data garantida: se a máquina for indispensável para a próxima safra ou para um contrato já assinado, avalie alternativas de aquisição imediata. Pagamentos sazonais ou planos específicos só devem integrar a decisão quando estiverem previstos na proposta." },
      { heading: "Consórcio, Finame ou crédito rural?", body: "Compare o custo completo e as condições efetivamente disponíveis. Linhas subsidiadas, carência, garantias e urgência podem tornar o financiamento mais adequado. No consórcio, considere administração, reserva, seguros e reajustes. O lance embutido reduz a carta líquida e pode exigir recursos complementares para comprar o equipamento." },
      { heading: "Proteção após a aquisição", body: "Depois da contemplação, organize nota fiscal, avaliação e garantias para liberação do crédito. Confirme se a administradora exige seguro e cláusula beneficiária. Seguro de máquinas e proteção do agronegócio são contratações distintas do consórcio, sujeitas à aceitação e às condições de cada seguradora." },
    ],
    faqs: [
      { question: "Posso adquirir trator ou colheitadeira usados?", answer: "Depende dos bens aceitos pelo grupo, do limite de idade, da avaliação e da documentação. Informe os dados da máquina antes de aderir; a aprovação do crédito não substitui a aprovação do bem." },
      { question: "A contemplação pode ser programada para a safra?", answer: "Não há garantia de mês ou data. O planejamento deve prever a possibilidade de não receber a máquina antes da safra. Sorteios e lances seguem o regulamento e a disponibilidade do grupo." },
      { question: "Consórcio sempre custa menos que Finame?", answer: "Não. Compare propostas reais, incluindo linhas subsidiadas quando disponíveis, reajustes, garantias, custos totais e o impacto de esperar pelo equipamento. A escolha depende da operação." },
    ],
  },
  {
    title: "Consórcio de Veículos, Carros e Motos | Patro Seguros",
    description: "Compare consórcio de carros, motos, elétricos e utilitários. Entenda lance embutido, veículos usados e custos com consultoria digital em todo o Brasil.",
    audience: ["Quem planeja o primeiro carro ou a troca de veículo", "Compradores de motos, híbridos e elétricos", "Empresas que programam a renovação de utilitários"],
    sections: [
      { heading: "Carros, motos, elétricos e seminovos", body: "A carta deve pertencer à categoria adequada ao veículo desejado. Confirme modelos aceitos, idade máxima, procedência e exigências de avaliação. Veículos elétricos e híbridos também precisam atender às regras do grupo. Não conte com um limite de idade universal: cada administradora define seus critérios." },
      { heading: "Lance com o usado e crédito líquido", body: "Recursos da venda de seu veículo podem compor um lance próprio. Operações de troca de chaves dependem de oferta e condições específicas; o veículo não é aceito automaticamente como pagamento. No lance embutido, parte da carta é usada no lance e deixa de estar disponível para a compra. Planeje o valor líquido, não apenas a carta anunciada." },
      { heading: "Quando a compra planejada faz sentido", body: "O consórcio pode atender quem tem flexibilidade de prazo. Se o veículo for necessário imediatamente para trabalhar, compare financiamento e outras alternativas. Além das parcelas e reajustes, reserve recursos para transferência, tributos, manutenção e seguro. Histórico de lances não garante o resultado de assembleias futuras." },
    ],
    faqs: [
      { question: "Posso escolher a marca do veículo?", answer: "Em geral há liberdade de escolha dentro da categoria e das condições aceitas no contrato. A administradora verifica o veículo e sua documentação antes de pagar o vendedor." },
      { question: "Lance embutido é dinheiro extra?", answer: "Não. Ele utiliza parte do próprio crédito, reduzindo o valor disponível para comprar o veículo se o lance vencer e for homologado. Limites e possibilidade de combinar recursos próprios dependem do grupo." },
      { question: "Posso usar FGTS no consórcio de carro?", answer: "Não. O uso do FGTS está sujeito às operações habitacionais elegíveis, não à compra de carros ou motos. Para veículos, avalie recursos próprios e os tipos de lance admitidos pelo grupo." },
    ],
  },
  {
    title: "Consórcio de Serviços e Projetos | Patro Seguros",
    description: "Planeje reformas, cursos, intercâmbio e outros serviços. Consulte categorias aceitas, custos e liberação do crédito com atendimento nacional da Patro.",
    audience: ["Famílias com projetos sem data rígida", "Quem planeja formação ou intercâmbio", "Empresas que pretendem contratar serviços elegíveis"],
    sections: [
      { heading: "Quais projetos podem ser contemplados?", body: "Reformas, cursos, intercâmbio, festas e determinados procedimentos de saúde podem ser admitidos, conforme o contrato. Projetos de energia solar exigem atenção à separação entre equipamentos e instalação e ao enquadramento aceito. Apresente o orçamento detalhado antes de escolher o grupo; nem todo projeto pertence à categoria de serviços." },
      { heading: "Prestador, orçamento e pagamento", body: "A escolha do prestador precisa respeitar os critérios documentais da administradora. Após a contemplação, podem ser exigidos orçamento, contrato, documentos fiscais e garantias. A liberação não é automática nem equivale a dinheiro livre para qualquer uso; confirme como e quando o prestador será pago antes de assumir compromissos." },
      { heading: "Evite compromissos com data fixa", body: "Não contrate um evento, viagem ou procedimento contando com contemplação em determinado mês. A adesão não garante prazo de liberação e não substitui avaliação médica ou profissional. Compare o custo total do plano, seus reajustes e a alternativa de poupar recursos quando houver flexibilidade." },
    ],
    faqs: [
      { question: "Posso escolher qualquer prestador?", answer: "A escolha deve atender às exigências de documentação e pagamento da administradora. Confirme os critérios antes de assinar com o prestador ou pagar sinal." },
      { question: "Consórcio de serviços tem análise de crédito?", answer: "Sim. A administradora pode avaliar cadastro e capacidade de pagamento na adesão e na contemplação e exigir garantias para liberar o crédito. Não há aprovação garantida." },
      { question: "Posso pagar um serviço já contratado?", answer: "Não presuma que haverá reembolso ou pagamento retroativo. Apresente o contrato e consulte as regras da administradora antes de assumir a despesa; finalidade, momento e documentação precisam ser aceitos." },
    ],
  },
];

export const CONSORCIO_NATIONAL_PAGES: ConsorcioIntentPage[] = details.map((detail, index) => {
  const modality = consorcioModalities[index];
  const path = CONSORCIO_NATIONAL_PATHS[index];
  return {
    slug: path.slice(1), path, navLabel: modality.title,
    title: detail.title, metaDescription: detail.description,
    h1: modality.title, subtitle: "Planejamento sem juros de financiamento, com atendimento digital em todo o Brasil.",
    intro: modality.use, audience: detail.audience,
    bullets: [modality.range + " — referências sujeitas à disponibilidade do grupo.", modality.benefit, "Há taxa de administração e podem existir reserva, seguros e reajustes. Sem garantia de contemplação em data específica."],
    sections: detail.sections, faqs: detail.faqs,
    whatsappOrigem: path.slice(1).replace(/-/g, "_"),
    whatsappMessage: `Olá! Quero comparar planos de ${modality.title.toLowerCase()}. Gostaria de consultar custos, grupos e histórico disponível de lances para minha cidade.`,
  };
});
