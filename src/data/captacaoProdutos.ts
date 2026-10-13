import { catalogoSeguros } from "@/data/catalogoSeguros";

export interface CaptacaoField {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "select";
  options?: string[];
}
export interface CaptacaoProfile {
  intro: string;
  checklist: string[];
  note: string;
  fields: CaptacaoField[];
}
const text = (id: string, label: string, placeholder: string): CaptacaoField => ({ id, label, placeholder });
const select = (id: string, label: string, options: string[]): CaptacaoField => ({ id, label, placeholder: "Selecione se souber", type: "select", options });
const city = text("localOperacao", "Cidade e UF da operação", "Ex.: Guarulhos/SP ou município da propriedade");
const equipment = text("equipamento", "Marca, modelo e ano", "Informe o que souber sobre o equipamento");
const value = text("valorBem", "Valor aproximado do bem", "Ex.: R$ 250.000");
const conditions = "Aceitação, preço, franquias e coberturas dependem da análise da seguradora e das condições da proposta. O envio não contrata nem inicia a cobertura.";
const machinery: CaptacaoProfile = {
  intro: "Conte como sua máquina trabalha. A Patro avalia o equipamento, o local de uso e os riscos da operação antes de apresentar as opções de seguro.",
  checklist: ["Danos ao equipamento e franquias", "Uso próprio, prestação de serviço ou locação", "Transporte entre locais e acessórios a declarar"],
  note: conditions,
  fields: [equipment, value, city, select("uso", "Uso do equipamento", ["Próprio", "Prestação de serviços", "Locação a terceiros", "Quero orientação"])],
};
const agricultural: CaptacaoProfile = {
  ...machinery,
  intro: "Trator, colheitadeira ou pulverizador: informe a máquina e a atividade no campo. Vamos avaliar os riscos de operação, deslocamento e guarda, sem tratar todos os equipamentos como iguais.",
  checklist: ["Máquina, implementos e acessórios declarados", "Operação na safra e deslocamentos entre propriedades", "Franquias, exclusões e condições para prestação de serviços"],
  fields: [...machinery.fields, text("atividade", "Cultura ou atividade", "Ex.: soja, café, cana ou colheita para terceiros")],
};
const yellow: CaptacaoProfile = {
  ...machinery,
  intro: "Escavadeira, retroescavadeira ou pá carregadeira: descreva a atividade e onde a máquina opera. A análise considera obra, terreno, transporte e eventual locação.",
  checklist: ["Operação em obra, terraplenagem ou outras atividades", "Equipamento próprio ou locado e responsabilidade contratual", "Transporte em prancha, franquias e restrições de uso"],
  fields: [...machinery.fields, text("atividade", "Atividade e condições de operação", "Ex.: terraplenagem, demolição ou trabalho próximo à água")],
};
const drone: CaptacaoProfile = {
  intro: "Proteção do drone e responsabilidade por danos a terceiros são necessidades diferentes. Informe seu uso para avaliar casco, RETA e outras responsabilidades separadamente.",
  checklist: ["Casco: danos ao próprio equipamento, conforme contratação", "RETA: responsabilidade civil aeronáutica, não reparo do drone", "Acessórios, uso declarado e documentação da operação"],
  note: `${conditions} Regularização e autorizações de voo não são substituídas pelo seguro.`,
  fields: [equipment, value, city, select("finalidade", "Finalidade do voo", ["Filmagem/fotografia", "Mapeamento/inspeção", "Pulverização agrícola", "Outra atividade"]), select("protecao", "O que deseja avaliar?", ["Casco do drone", "RETA / danos a terceiros", "Casco e responsabilidade civil", "Preciso de orientação"])],
};
const droneAgro: CaptacaoProfile = {
  ...drone,
  intro: "Seu drone pulveriza ou faz mapeamento? Vamos analisar o valor do equipamento e as responsabilidades da atividade agrícola, sem confundir casco, RETA e riscos da pulverização.",
  checklist: ["Drone, baterias e acessórios a declarar na proposta", "Pulverização, deriva e danos a lavouras: verificar aceitação específica", "Casco e RETA analisados separadamente, com seus limites e exclusões"],
};
const reta: CaptacaoProfile = {
  ...drone,
  intro: "Solicite uma análise de RETA para a operação do seu drone. A equipe confere a atividade e as informações necessárias à proposta de responsabilidade civil aeronáutica.",
  checklist: ["Finalidade de uso, local e características do drone", "Limites e condições aplicáveis à responsabilidade civil", "RETA não cobre danos ao próprio drone nem substitui autorizações"],
  fields: [equipment, city, select("finalidade", "Finalidade do voo", ["Filmagem/fotografia", "Mapeamento/inspeção", "Pulverização agrícola", "Outra atividade"]), text("peso", "Peso máximo de decolagem, se souber", "Informe o peso em kg")],
};
const groupProfiles: Record<string, CaptacaoProfile> = {
  maquinas: machinery,
  agro: {
    intro: "Informe a atividade rural e o que precisa proteger. A análise muda conforme a cultura, os animais, as instalações ou as mercadorias envolvidas.",
    checklist: ["Localização e atividade da propriedade", "Bem ou produção exposta ao risco", "Limites, franquias e exclusões da modalidade"], note: conditions,
    fields: [city, text("atividade", "Atividade ou cultura", "Ex.: pecuária, café, avicultura"), text("objeto", "O que deseja proteger?", "Produção, instalações, animais ou mercadorias")],
  },
  saude: {
    intro: "Compare opções a partir do número de pessoas, faixas etárias e região de atendimento. A equipe verifica elegibilidade, rede e condições antes de indicar alternativas.",
    checklist: ["Rede de hospitais, clínicas ou dentistas de interesse", "Carências, coparticipação e abrangência", "Regras de contratação para pessoa física, MEI ou empresa"],
    note: "Não envie diagnósticos, exames ou dados médicos neste formulário. Disponibilidade, valores e aceitação dependem da operadora e da modalidade.",
    fields: [city, text("vidas", "Quantidade de pessoas e faixas etárias", "Ex.: 3 pessoas — 30, 35 e 60 anos"), select("contratacao", "Tipo de contratação", ["Individual/familiar", "MEI", "PME/empresarial", "Preciso de orientação"]), text("rede", "Rede de preferência", "Hospitais, clínicas ou dentistas, se houver")],
  },
  consorcio: {
    intro: "Planeje a compra com uma simulação compatível com o bem, a carta de crédito e seu orçamento mensal. Entenda as condições antes de aderir a um grupo.",
    checklist: ["Valor da carta, prazo e parcela estimada", "Taxa de administração, reajustes e demais custos", "Contemplação por sorteio ou lance, sem data garantida"],
    note: "Consórcio não é financiamento nem investimento com retorno garantido. Não há promessa de contemplação imediata; aplicam-se as regras do grupo e da administradora.",
    fields: [text("bem", "Bem desejado", "Ex.: carro, imóvel ou veículo pesado"), text("carta", "Carta de crédito desejada", "Valor aproximado"), text("parcela", "Orçamento mensal", "Valor que pretende destinar por mês")],
  },
  rc: {
    intro: "Conte sua profissão ou atividade e o contexto da contratação. A proposta precisa considerar os riscos de reclamações de terceiros e os limites adequados ao seu trabalho.",
    checklist: ["Atividade, especialidade e serviços prestados", "Limites, franquias e riscos excluídos", "Vigência, retroatividade e forma de apresentação das reclamações"], note: conditions,
    fields: [text("atividade", "Profissão ou atividade", "Ex.: médico, engenheiro, prestador ou organizador de evento"), city, text("necessidade", "Necessidade ou exigência contratual", "Limite solicitado ou detalhes do serviço, se souber")],
  },
};

const productFields: Array<[RegExp, CaptacaoField[]]> = [
  [/viagem/, [text("destino", "Destino e período da viagem", "Países e datas previstas"), text("viajantes", "Viajantes e idades", "Quantidade e idades, sem documentos")]],
  [/fianca|imobiliario/, [city, text("imovel", "Imóvel e finalidade da locação", "Residencial ou comercial"), text("aluguel", "Valor do aluguel e encargos", "Valores aproximados")]],
  [/previdencia/, [text("objetivo", "Objetivo do planejamento", "Aposentadoria, sucessão ou outro objetivo"), text("prazo", "Prazo e contribuição pretendida", "Horizonte e valor aproximados")]],
  [/plano-pet|protecao-pet/, [city, text("pet", "Espécie e idade do pet", "Ex.: cão, 5 anos"), text("necessidade", "Cuidados que procura", "Consultas, exames ou outras necessidades")]],
  [/funeral|decesso/, [city, text("pessoas", "Pessoas e faixas etárias", "Individual ou familiar; idades aproximadas")]],
  [/acidentes-pessoais-passageiros|seguro-app-/, [text("veiculos", "Veículos e quantidade", "Modelos e número de veículos"), text("passageiros", "Lotação e atividade de transporte", "Número de passageiros, transporte escolar, fretamento ou aplicativo"), city]],
  [/vida|acidentes-pessoais|estagiario/, [text("pessoas", "Pessoas e faixas etárias", "Quantidade e idades, sem documentos"), text("atividade", "Profissão ou atividade", "Informe a atividade principal"), text("capital", "Proteção financeira desejada", "Capital ou exigência contratual, se souber")]],
  [/carta-verde/, [text("destino", "Países e período da viagem", "Destino e datas previstas"), text("veiculo", "Veículo e uso", "Modelo e finalidade da viagem")]],
  [/avioes|helicopteros/, [equipment, value, text("operacao", "Operação da aeronave", "Uso privado, comercial ou outra atividade"), city]],
  [/embarcacoes|jetski/, [equipment, value, text("navegacao", "Área de navegação e uso", "Lazer, trabalho e local de guarda")]],
  [/frota|caminhao|micro-onibus|seguro-app-/, [text("veiculos", "Veículos e quantidade", "Modelos e número de veículos"), text("uso", "Uso e rotas", "Cargas, passageiros, aplicativo ou outros usos"), city]],
  [/auto|moto|carro|bike|celular/, [equipment, value, city, text("uso", "Uso principal", "Pessoal, profissional ou outro")]],
  [/transporte|transportadoras/, [text("carga", "Mercadorias transportadas", "Tipo de carga e valor por embarque"), text("rotas", "Rotas e frequência", "Origem, destino e quantidade de viagens"), text("papel", "Seu papel na operação", "Embarcador ou transportador")]],
  [/garantia|credito/, [text("obrigacao", "Contrato ou necessidade de garantia", "Tipo de contrato, processo ou recebíveis"), text("limite", "Valor e prazo pretendidos", "Valores e vencimentos aproximados")]],
  [/cyber|cibernetico|ambiental/, [text("atividade", "Atividade e porte da empresa", "Setor e tamanho da operação"), text("risco", "Risco ou exigência a avaliar", "Descreva sem senhas, dados de clientes ou documentos"), city]],
  [/condominio|residencial|galp|armazenagem|lojas|restaurante|sala-comercial|flat|clinica|consultorio|hospital|petshop/, [city, text("imovel", "Imóvel, atividade e ocupação", "Tipo de imóvel e uso"), text("patrimonio", "Patrimônio a proteger", "Estrutura, equipamentos, estoque ou responsabilidades")]],
];

export const captacaoProdutos = catalogoSeguros.flatMap(group =>
  group.items.map(item => ({ ...item, groupId: group.id, groupTitle: group.title }))
);

/** Usa destinos reais do catálogo; páginas de suporte e campanhas desconhecidas não são alteradas. */
export function getCaptacaoProduto(pathname: string): (CaptacaoProfile & { label: string; path: string }) | null {
  const path = pathname.replace(/\/+$/, "") || "/";
  const product = captacaoProdutos.find(item => item.to === path)
    ?? (path.startsWith("/lp/") ? captacaoProdutos.find(item => item.to === path.replace("/lp/", "/")) : undefined);
  if (!product) return null;
  let profile: CaptacaoProfile | undefined;
  if (/reta-drone/.test(path)) profile = reta;
  else if (/drone-agricola/.test(path)) profile = droneAgro;
  else if (/drone/.test(path)) profile = drone;
  else if (/linha-amarela|trator-industrial/.test(path)) profile = yellow;
  else if (/maquinas-agricolas|equipamentos-agricolas|trator-agricola|colheitadeira|colhedora|pulverizador/.test(path)) profile = agricultural;
  else if (/plano-saude|plano-de-saude/.test(path)) profile = groupProfiles.saude;
  else if (/equipamentos-veterinarios/.test(path)) profile = machinery;
  else profile = groupProfiles[product.groupId];
  const specificFields = productFields.find(([pattern]) => pattern.test(path))?.[1];
  if (product.groupId === "agro" && /transporte/.test(path) && specificFields) {
    profile = {
      ...groupProfiles.agro,
      intro: "Informe quais produtos agropecuários são transportados, as rotas e seu papel na operação. A análise distingue a proteção das mercadorias das responsabilidades do transportador.",
      checklist: ["Mercadorias, valor por embarque e condições de transporte", "Origem, destino, frequência e eventuais exigências contratuais", "Coberturas, franquias e responsabilidades conforme a operação"],
      fields: specificFields,
    };
  }
  const fallback: CaptacaoProfile = {
    intro: `${product.short} Conte sua necessidade para a Patro avaliar as alternativas adequadas ao seu perfil, em vez de comparar apenas o preço.`,
    checklist: ["O que precisa ser protegido e em quais condições", "Limites, franquias e exclusões da proposta", "Próximos documentos necessários, após a análise inicial"],
    note: conditions,
    fields: specificFields ?? [city, text("necessidade", "O que deseja avaliar?", `Conte sua necessidade de ${product.label.toLowerCase()}`)],
  };
  return { ...(profile ?? fallback), label: product.label, path: product.to };
}

/** Campos já definidos pela página têm prioridade e nunca são removidos. */
export function mergeCaptacaoFields(existing: CaptacaoField[] = [], suggested: CaptacaoField[] = []) {
  return [...existing, ...suggested.filter(field => !existing.some(item => item.id === field.id))];
}

