import type { BairroData } from "@/lib/bairrosData";

// Prioridade editorial, não ranking de risco nem alegação de filial.
export const LOCAL_PRIORITY_AREAS = [
  { id: "jardim-maia", name: "Cidade Maia", focus: "Apartamento, patrimônio e atividade profissional" },
  { id: "cumbica", name: "Cumbica", focus: "Galpão, estoque e operação logística" },
  { id: "centro", name: "Centro", focus: "Comércio, escritório e atendimento ao público" },
  { id: "vila-augusta", name: "Vila Augusta", focus: "Moradia, condomínio e trabalho em casa" },
  { id: "bonsucesso", name: "Bonsucesso", focus: "Instalações, máquinas e movimentação de mercadorias" },
] as const;

const preparation: Record<string, string[]> = {
  "jardim-maia": [
    "Apartamento: confronte a apólice do condomínio com a proteção da unidade, dos bens e da responsabilidade do morador.",
    "Bens de valor: descreva eletrônicos, joias e coleções; confirme aceitação, limites e documentação, sem presumir cobertura automática.",
    "Atividade profissional: informe uso do imóvel como escritório e diferencie a proteção dos equipamentos da responsabilidade profissional.",
  ],
  cumbica: [
    "Galpão: informe ocupação, construção, prevenção de incêndio e as responsabilidades do locador e do locatário.",
    "Armazenagem: separe estoque próprio de mercadorias de terceiros e declare valores máximos, inclusive em períodos de pico.",
    "Logística: identifique quando termina a armazenagem e começa o transporte; frota, carga e patrimônio exigem análises distintas.",
  ],
  centro: [
    "Comércio: declare atividade, estoque, equipamentos e horários de funcionamento, inclusive mudanças de ocupação.",
    "Atendimento ao público: avalie responsabilidade civil operações e diferencie-a da responsabilidade por serviços profissionais.",
    "Imóvel alugado: confira exigências do contrato e separe a garantia de aluguel da proteção patrimonial do estabelecimento.",
  ],
  "vila-augusta": [
    "Moradia: informe se o imóvel é casa ou apartamento, próprio ou alugado, e quem responde pela construção e pelos bens.",
    "Condomínio: compare a apólice das áreas comuns com a cobertura da unidade, evitando presumir que são equivalentes.",
    "Trabalho em casa: declare equipamentos de uso profissional e atendimento a clientes para verificar aceitação e exclusões.",
  ],
  bonsucesso: [
    "Instalações: relacione atividade, construção, equipamentos e medidas de prevenção existentes no endereço segurado.",
    "Máquinas: informe uso fixo ou móvel, idade e valor dos bens; quebra de máquinas e danos elétricos são coberturas distintas.",
    "Mercadorias: detalhe carga, descarga, pátio e transporte para identificar lacunas entre as apólices da operação.",
  ],
};

export function getLocalPreparation(id: string): string[] {
  return preparation[id] ?? [
    "Informe CEP, uso do imóvel ou veículo e as necessidades de quem será segurado.",
    "Separe o contrato atual, se houver, e compare coberturas, limites, franquias e exclusões nas mesmas condições.",
    "Confirme os dados da proposta antes de contratar. A localização não garante desconto, aceitação ou indenização.",
  ];
}

/** Publicação conservadora: não reproduz casos, preços ou níveis de risco sem fonte. */
export function reviewNeighborhood(bairro: BairroData): BairroData {
  const priority = LOCAL_PRIORITY_AREAS.find((area) => area.id === bairro.id);
  const focus = priority?.focus ?? "Auto, moradia e atividade empresarial";
  return {
    ...bairro,
    foco: focus,
    subtitulo: `Orientação para moradores e empresas de ${bairro.nome}, Guarulhos`,
    descricao: `Esta página organiza os dados para solicitar uma proposta em ${bairro.nome}. O foco desta orientação é ${focus.toLocaleLowerCase("pt-BR")}. As situações abaixo são pontos para conferir na contratação, não estatísticas do bairro nem relatos de clientes. A análise considera o endereço e o perfil informados na proposta.`,
    intel: undefined,
    testimonials: [],
    localFaqs: [],
    faqs: [
      { question: `Como preparar uma cotação para ${bairro.nome}?`, answer: getLocalPreparation(bairro.id).join(" ") },
      { question: "O bairro determina sozinho o preço do seguro?", answer: "Não. CEP, uso, características dos bens ou das pessoas e condições do produto podem influenciar a proposta. Não publicamos preço médio nem classificação de risco local sem fonte e período de referência." },
      { question: "Existe uma filial da Patro neste bairro?", answer: "A página indica área atendida, não uma filial. Consulte o endereço da sede nos canais de contato. É possível iniciar a solicitação online, sem que isso confirme aceitação ou vigência." },
      { question: "Como saber se a proposta atende à minha necessidade?", answer: "Confira eventos cobertos, limites, franquias, exclusões, assistência e obrigações de contratação. Peça esclarecimentos antes de aceitar; o envio de dados para cotação não inicia a cobertura." },
      { question: "Posso cotar em outro bairro de Guarulhos?", answer: "Sim. Informe o endereço real do risco e a modalidade desejada no formulário de cotação ou no WhatsApp. A orientação desta página não restringe a área de atendimento." },
      { question: "Posso considerar um hospital próximo como credenciado?", answer: "Não. A proximidade não comprova credenciamento. Confira no guia oficial da operadora a unidade, o produto e o tipo de atendimento antes de contratar." },
    ],
  };
}
