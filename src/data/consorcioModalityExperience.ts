import type { ConsorcioIntentPage } from "./consorcioVertical";

export type ModalityExperience = {
  cta: string; message: string; focus: string; checklist: string[];
  steps: { title: string; text: string }[];
  costs: string; documents: string; bids: string;
  articles: { href: string; label: string }[];
};
const article = (slug: string, label: string) => ({ href: `/blog/${slug}`, label });
const costsArticle = article("taxa-de-administracao-no-consorcio-como-calcular-custo-real", "Como comparar a taxa de administração e o custo completo");

export const modalityExperiences: Record<string, ModalityExperience> = {
  imoveis: {
    cta: "Simular consórcio imobiliário",
    message: "Olá! Acessei a página de consórcio de imóveis e gostaria de receber uma simulação.",
    focus: "O imóvel certo começa com um orçamento que considera também a espera.",
    checklist: ["Tipo de imóvel e cidade da compra", "Orçamento para parcelas, reajustes e despesas de aquisição", "Prazo desejado e eventual elegibilidade ao FGTS"],
    steps: [
      { title: "Defina a finalidade", text: "Casa, apartamento, terreno ou imóvel comercial? Para construção e reforma, confirme a finalidade admitida e as exigências técnicas antes de escolher a carta." },
      { title: "Compare o grupo", text: "Leia o custo total, o índice e a periodicidade de reajuste e as regras de lance. Inclua aluguel durante a espera e despesas de avaliação, tributos e registro." },
      { title: "Acompanhe as assembleias", text: "Após a adesão, mantenha as obrigações em dia. Sorteio e lance dependem das regras e dos recursos do grupo; o FGTS só integra operações elegíveis." },
      { title: "Organize a aquisição", text: "Depois da contemplação, a administradora analisa cadastro, garantias e documentos do imóvel e do vendedor. Aguarde a autorização para assumir compromissos de compra." },
    ],
    costs: "Compare administração total, eventual fundo de reserva, seguros e reajustes do crédito e das parcelas. Verifique o saldo após a contemplação. Confirme quais despesas de aquisição podem ser incluídas na carta; não trate valorização ou aluguel futuro como renda garantida.",
    documents: "Podem ser necessários documentos pessoais ou da empresa, comprovação de capacidade de pagamento, matrícula atualizada, certidões do imóvel e documentos do vendedor. Construção e reforma podem exigir projeto, orçamento e aprovações. A lista final é da administradora.",
    bids: "Lance próprio, embutido ou com FGTS só pode ser utilizado quando admitido. O embutido reduz o crédito para a compra. O uso de FGTS depende do trabalhador, do imóvel e da operação; não presuma elegibilidade de terreno isolado, imóvel comercial ou de investimento. Nenhum lance assegura contemplação.",
    articles: [article("usar-consorcio-para-quitar-financiamento-imobiliario-interveniencia-quitante", "Uso da carta para quitar financiamento imobiliário"), costsArticle],
  },
  veiculos: {
    cta: "Simular consórcio de veículo",
    message: "Olá! Acessei a página de consórcio de veículos e gostaria de receber uma simulação para um veículo.",
    focus: "Planeje a troca pelo crédito que estará disponível para comprar.",
    checklist: ["Carro, moto ou utilitário pretendido", "Ano, condição e valor estimado do veículo", "Recursos próprios para lance e prazo de necessidade"],
    steps: [
      { title: "Escolha a categoria", text: "Informe carro, moto ou utilitário, inclusive híbrido ou elétrico. A aceitação de novos, usados e seminovos deve ser conferida no grupo pretendido." },
      { title: "Dimensione a carta líquida", text: "Compare custos, reajustes e eventual lance embutido. Se parte da carta financiar o lance, reserve recursos complementares para a compra." },
      { title: "Participe do grupo", text: "Acompanhe assembleias e pagamentos. A venda do usado pode gerar recursos próprios, mas troca de chaves ou entrega do bem não é aceita automaticamente." },
      { title: "Submeta o veículo à análise", text: "Após a contemplação, apresente os documentos e a avaliação exigidos. A administradora confirma procedência, idade e garantias antes de liberar o pagamento." },
    ],
    costs: "Além da administração, reserva, seguros e reajustes previstos no contrato, considere transferência, tributos, vistoria, manutenção e proteção do veículo. Não existe limite de idade universal para usados nem garantia de parcelas sem atualização.",
    documents: "Informe modelo, ano e condição do bem. Podem ser exigidos documentos pessoais ou societários, renda ou capacidade de pagamento, documentos do vendedor, nota fiscal ou documentação de transferência e avaliação. Não envie documentos sensíveis no primeiro contato.",
    bids: "Confirme lance livre, fixo e embutido no regulamento. O embutido não é crédito adicional: reduz o valor disponível para o veículo. Histórico de assembleias não prevê o próximo resultado. Se o carro ou a moto for indispensável agora para trabalhar, compare alternativas de aquisição imediata.",
    articles: [article("consorcio-carro-eletrico-ou-hibrido-vale-a-pena-financiamento", "Consórcio para elétricos e híbridos: o que comparar"), costsArticle],
  },
  pesados: {
    cta: "Planejar aquisição de caminhão ou frota",
    message: "Olá! Acessei a página de consórcio de caminhões e pesados e gostaria de planejar a aquisição de caminhão ou frota.",
    focus: "O calendário da operação vem antes do calendário de compra.",
    checklist: ["Bem, aplicação e ano de fabricação", "Prazo de renovação da frota ou do maquinário", "Parcelas, manutenção e capital de giro da operação"],
    steps: [
      { title: "Descreva a operação", text: "Informe caminhão, implemento ou máquina, ano e uso. Autônomos, transportadoras e produtores precisam confirmar o enquadramento do bem no grupo." },
      { title: "Projete o caixa", text: "Avalie parcelas e reajustes junto de combustível, manutenção, insumos e folha. Pagamentos sazonais só devem ser considerados se constarem da proposta." },
      { title: "Avalie a espera e o lance", text: "Confronte a necessidade do equipamento com a ausência de data garantida. Lance embutido reduz o crédito líquido e não assegura a chegada do bem antes da safra ou de um contrato." },
      { title: "Prepare a liberação", text: "Depois da contemplação, apresente nota fiscal ou documentação de compra, avaliação e garantias solicitadas. Aguarde a aprovação da administradora para concluir a aquisição." },
    ],
    costs: "Considere administração total, reserva, seguros, reajustes, avaliação e formalização de garantias, conforme contrato. Compare o custo completo com financiamento, Finame ou crédito rural efetivamente acessíveis, sem presumir subsídio, carência ou aprovação.",
    documents: "Podem ser solicitados documentos do autônomo ou da empresa, capacidade de pagamento, especificação técnica, ano, procedência, avaliação e documentos do fornecedor. Limites de idade e aceitação de usados dependem do grupo e da administradora.",
    bids: "Planeje o lance sem consumir o capital necessário à operação. Se houver embutido, calcule a carta líquida e o complemento para o equipamento. Contemplação depende de sorteio ou lance e dos recursos do grupo; não vincule safra, frete ou contrato a uma liberação presumida.",
    articles: [article("consorcio-de-caminhoes-como-renovar-frota-sem-juros", "Planejamento da renovação de caminhões e frota"), article("consorcio-maquinas-agricolas-vale-a-pena-finame-credito-rural", "Máquinas agrícolas: consórcio, Finame ou crédito rural?"), article("consorcio-linha-amarela-escavadeiras-retroescavadeiras", "Enquadramento de máquinas de linha amarela")],
  },
  empresa: {
    cta: "Conversar sobre consórcio para minha empresa",
    message: "Olá! Acessei a página de consórcio para empresas e gostaria de conversar sobre o planejamento da minha empresa.",
    focus: "A aquisição precisa caber no caixa, não apenas na estratégia de expansão.",
    checklist: ["Ativo desejado e finalidade na operação", "Prazo de necessidade e capital de giro", "Condições de adesão e garantias para pessoa jurídica"],
    steps: [
      { title: "Mapeie o ativo", text: "Separe os objetivos: veículos e frotas, máquinas e equipamentos ou imóvel comercial. Cada categoria tem regras próprias; uma carta não é livre para qualquer finalidade." },
      { title: "Faça o orçamento da empresa", text: "Projete parcelas, reajustes e lance sem comprometer folha, tributos e fornecedores. Compare propostas com outras alternativas de crédito e compra à vista." },
      { title: "Confira a adesão por CNPJ", text: "Valide capacidade de pagamento, representantes autorizados, garantias e regras contratuais. Não presuma benefício tributário ou aprovação automática para a empresa." },
      { title: "Acompanhe até a utilização", text: "A adesão e a contemplação não substituem a análise da operação. Apresente documentos do ativo e do fornecedor e aguarde a liberação antes de executar o plano de expansão." },
    ],
    costs: "Inclua administração, reserva, seguros e reajustes no fluxo de caixa. Lance e garantias também comprometem recursos. Não há promessa de preservação de capital ou vantagem tributária; o enquadramento contábil deve ser avaliado com o contador da empresa.",
    documents: "A administradora pode solicitar CNPJ, contrato social e alterações, documentos dos representantes, informações financeiras e comprovação de capacidade de pagamento. As exigências do ativo, do vendedor e de garantias dependem da categoria contratada.",
    bids: "A empresa deve separar a reserva operacional dos recursos de lance. No embutido, o valor usado sai da carta e reduz o crédito líquido. A contratação por pessoa jurídica não assegura data de contemplação nem liberação para cumprir um contrato comercial.",
    articles: [article("consorcio-de-caminhoes-como-renovar-frota-sem-juros", "Renovação planejada de frota"), costsArticle],
  },
};

export function getModalityExperience(page: ConsorcioIntentPage): ModalityExperience {
  if (page.path === "/consorcio-guarulhos") return {
    cta: "Solicitar simulação de consórcio",
    message: "Olá! Acessei a página de consórcio em Guarulhos e gostaria de consultar uma simulação para meu objetivo.",
    focus: "Escolha a modalidade a partir do que deseja realizar.",
    checklist: ["Finalidade do crédito e cidade", "Orçamento e prazo de necessidade", "Categoria e condições disponíveis"],
    steps: [
      { title: "Conte seu objetivo", text: "Informe se pretende adquirir imóvel, veículo ou equipamento, ou contratar um serviço. A finalidade orienta a consulta do grupo adequado." },
      { title: "Compare condições", text: "Considere custo completo, reajustes, tempo de espera e alternativas de aquisição. Confira a autorização da administradora no Banco Central." },
      { title: "Entenda as assembleias", text: "A contemplação ocorre por sorteio ou lance, conforme regulamento e recursos do grupo. Não há data garantida." },
      { title: "Prepare a documentação", text: "Após a contemplação, a liberação depende de análise cadastral, garantias e documentos do bem ou serviço. O atendimento local não dispensa essas etapas." },
    ],
    costs: "Compare administração total, fundo de reserva, seguros e reajustes previstos no contrato. Inclua o custo de esperar e preserve recursos para suas despesas. Crédito e prazo dependem da disponibilidade do grupo.",
    documents: "A administradora define os documentos pessoais ou societários, a comprovação de capacidade de pagamento, as garantias e os comprovantes do bem ou serviço. Não envie documentos sensíveis no primeiro contato.",
    bids: "Consulte as modalidades de lance admitidas. O lance embutido reduz o crédito líquido; o FGTS só pode integrar operações imobiliárias elegíveis. Histórico de lances não garante resultados futuros.",
    articles: [costsArticle],
  };
  if (page.path.includes("empresarial")) return modalityExperiences.empresa;
  if (page.path.includes("imoveis")) return modalityExperiences.imoveis;
  if (page.path.includes("veiculos")) return modalityExperiences.veiculos;
  return modalityExperiences.pesados;
}
