import type { CaptacaoField } from "@/data/captacaoProdutos";

// Rascunhos sem links no catálogo, sem sitemap e disponíveis apenas no editor.
export const DRONE_PREVIEW_PATH = "/previa/drones-agricolas";
export const RETA_PREVIEW_PATH = "/previa/reta-drone-agricola";
export function isDronePreviewHost(hostname: string) {
  const editorZone = [".lovableproject.com", ".lovableproject-dev.com", ".lovable.dev", ".gpt-eng.com", ".gptengineer.run"]
    .some(suffix => hostname.endsWith(suffix));
  return hostname === "localhost" || hostname === "127.0.0.1" || editorZone ||
    (/^(?:id-preview(?:-[a-z0-9]+)?|preview)--/.test(hostname) && hostname.endsWith(".lovable.app"));
}

export const droneQuoteFields: CaptacaoField[] = [
  { id: "equipamento", label: "Marca e modelo", placeholder: "Ex.: DJI Agras, XAG ou outra marca" },
  { id: "valor", label: "Valor aproximado do drone e acessórios", placeholder: "Ex.: R$ 120.000" },
  { id: "quote_city", label: "Cidade e estado da operação", placeholder: "Ex.: Sorriso / MT" },
  { id: "operacao", label: "Forma de operação", placeholder: "Selecione se souber", type: "select", options: ["Uso próprio", "Prestação de serviços", "Uso próprio e prestação de serviços"] },
  { id: "atividade", label: "Atividade agrícola", placeholder: "Selecione se souber", type: "select", options: ["Pulverização", "Mapeamento agrícola", "Pulverização e mapeamento agrícola"] },
  { id: "interesse", label: "Interesse na proteção", placeholder: "Selecione se souber", type: "select", options: ["Casco", "RETA", "Casco e RETA", "Preciso de orientação"] },
];

export const droneComparison = [
  { label: "O que protege", casco: "O próprio drone e os acessórios identificados e aceitos.", reta: "A responsabilidade civil aeronáutica por danos a terceiros." },
  { label: "Situações a analisar", casco: "Queda, colisão, pouso forçado e roubo, se previstos no contrato.", reta: "Dano corporal ou material a terceiro durante a operação agrícola, conforme o risco aceito." },
  { label: "Quem recebe a indenização", casco: "O segurado ou beneficiário indicado, inclusive o credor quando previsto.", reta: "O terceiro prejudicado ou o segurado por reembolso, conforme o contrato e a apuração da responsabilidade." },
  { label: "Limites e condições", casco: "Itens declarados, valores segurados, franquias, uso, guarda e transporte.", reta: "Limites por cobertura, riscos aceitos, exclusões e condições da operação." },
  { label: "O que não substitui", casco: "Não substitui RETA, garantia do fabricante ou manutenção.", reta: "Não substitui casco nem garante cobertura para pulverização, deriva ou dano ambiental." },
];

export const droneTopics = [
  { title: "Queda, colisão e pouso forçado", text: "Peça a análise desses eventos no casco. Falha de GPS, perda de sinal, pane e defeito de fabricação não têm cobertura automática; a causa e os danos resultantes precisam ser avaliados." },
  { title: "Roubo e furto qualificado", text: "Confira se estão previstos, quais itens estão segurados e as condições de guarda. Furto simples e desaparecimento não devem ser considerados incluídos." },
  { title: "Baterias, controles e sensores", text: "Informe também tanques e outros equipamentos embarcados, com quantidade e valor. A inclusão, o uso, a guarda e a recarga precisam ser aceitos. Desgaste e perda de capacidade não equivalem a acidente coberto." },
  { title: "Transporte entre propriedades", text: "Declare como o drone é transportado. Deslocamentos terrestres, carga e descarga precisam de previsão expressa; a proteção durante o voo não garante proteção nessas etapas." },
  { title: "Uso próprio ou prestação de serviços", text: "Informe se opera apenas na sua lavoura ou para clientes, os operadores e os estados de atuação. Mudanças de atividade ou de região devem ser comunicadas para avaliação." },
  { title: "Pulverização, deriva e ambiente", text: "A aplicação de insumos exige análise específica. Deriva, danos ambientais e prejuízos a lavouras vizinhas não estão automaticamente cobertos pelo RETA ou pelo casco. Confirme por escrito a disponibilidade, os limites e as exclusões." },
  { title: "Drone financiado", text: "Na próxima etapa, a equipe pode solicitar o contrato de crédito para conferir as exigências do credor, a identificação do bem e eventual beneficiário. Financiamento não garante aceitação nem substitui a análise de casco e RETA." },
  { title: "Franquias, limites e vigência", text: "Compare quanto fica a seu cargo em um sinistro, os limites de indenização e as exclusões. Confirme a data de início na contratação: pedir cotação não inicia cobertura. Perda de receita, safra ou contratação de drone substituto não têm cobertura automática." },
];

export const droneFaqs = [
  { question: "Qual a diferença entre casco e RETA?", answer: "Casco trata dos danos ao próprio drone nos eventos contratados. RETA trata da responsabilidade civil aeronáutica por danos a terceiros. São finalidades diferentes; informe se deseja analisar uma delas ou ambas." },
  { question: "RETA cobre queda do próprio drone?", answer: "Não é a finalidade do RETA. Para danos ao seu equipamento em uma queda, é preciso avaliar casco e conferir os eventos contratados, as causas, as franquias e os limites." },
  { question: "Danos por pulverização e deriva estão incluídos?", answer: "Não automaticamente. Declare a aplicação de insumos e peça análise expressa para deriva, danos ambientais e a lavouras vizinhas. Pode haver exclusões ou necessidade de contratação específica, se houver produto disponível para o risco." },
  { question: "Baterias e controles podem ser segurados?", answer: "Podem ser apresentados para análise junto com sensores, tanques e demais acessórios. A aceitação depende da identificação, dos valores e das condições do produto, inclusive uso, guarda e recarga. Desgaste e perda de capacidade não são automaticamente cobertos." },
  { question: "Como funciona a análise de drone financiado?", answer: "A equipe confere o contrato de financiamento, as exigências do credor, os itens a segurar e eventual indicação de beneficiário. Não presuma enquadramento em penhor rural ou cobertura de responsabilidade civil só porque o equipamento está financiado." },
  { question: "É possível analisar drones DJI Agras, XAG e outras marcas?", answer: "Sim, você pode informar marca e modelo para análise. A aceitação depende do equipamento, da documentação e da operação. A menção a DJI Agras ou XAG não representa parceria oficial com os fabricantes nem garantia de aceitação." },
  { question: "O que influencia o preço?", answer: "Modelo, idade e valor do drone e acessórios, atividade, locais de operação, experiência dos operadores, transporte, guarda e histórico de sinistros. Também influenciam as modalidades, franquias e limites escolhidos e os critérios da seguradora." },
  { question: "Quais documentos são necessários?", answer: "Para o primeiro contato, basta informar nome, WhatsApp e autorizar o contato. Na próxima etapa, a equipe poderá pedir identificação do proprietário e operador, dados e comprovantes de propriedade do drone e acessórios, registros e autorizações aplicáveis e contrato de financiamento, quando houver. A lista final depende da seguradora e da operação. Não envie documentos neste formulário." },
  { question: "A Patro atende em qualquer estado?", answer: "Sim. O atendimento é nacional, por canais digitais, para produtores rurais, prestadores, cooperativas e empresas do agronegócio. A aceitação do seguro depende da análise do equipamento, da atividade e dos locais informados." },
  { question: "Como solicitar orientação em caso de sinistro?", answer: "Priorize a segurança das pessoas e procure os serviços de emergência quando necessário. Comunique o ocorrido à seguradora e à Patro, informe a apólice, data e local e preserve registros e evidências, quando seguro. Antes de reparos ou descarte, peça orientação sobre o procedimento. A Patro apoia a documentação e o encaminhamento; a seguradora analisa o sinistro conforme a apólice." },
];

export const retaAgricolaTopics = [
  { title: "Declare a operação agrícola", text: "Informe pulverização, mapeamento ou ambas as atividades, uso próprio ou prestação de serviços, operadores e locais de atuação. Inclua todos os drones para conferir sua identificação na proposta." },
  { title: "Responsabilidade por danos a terceiros", text: "Peça análise dos danos corporais e materiais previstos para a operação, de quem é considerado terceiro e dos limites aplicáveis. RETA não é uma garantia de indenização para qualquer acidente." },
  { title: "Pulverização exige atenção específica", text: "Deriva, contaminação e prejuízos a lavouras vizinhas não devem ser presumidos como incluídos. Solicite confirmação expressa da disponibilidade e das exclusões para aplicação de insumos." },
  { title: "Leia a proposta antes de contratar", text: "Confira equipamentos, atividade aceita, limites, franquias quando aplicáveis, exclusões e vigência. O pedido de cotação não inicia cobertura nem substitui a verificação dos requisitos da operação." },
];
