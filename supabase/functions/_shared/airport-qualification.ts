export const AIRPORT_HUB = "/seguros-aeroportuarios";
export const AIRPORT_EO = "/seguro-eo-engenharia-aeroportos";
export const AIRPORT_CATEGORY = "Riscos Aeroportuários";
export const AIRPORT_PRODUCTS = {
  eo: "E&O Engenharia",
  rc_aeroportuario: "RC Aeroportuário",
  rc_geral: "RC Geral",
  garantia: "Seguro Garantia",
  engenharia: "Riscos de Engenharia",
  ambiental: "RC Ambiental",
  equipamentos: "Equipamentos",
  outros: "Outros",
} as const;
export type AirportProduct = keyof typeof AIRPORT_PRODUCTS;
export function isAirportProduct(value: unknown): value is AirportProduct {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(AIRPORT_PRODUCTS, value);
}

export const AIRPORT_YES_NO = ["Sim", "Não", "Ainda não sei"];
export const AIRPORT_SERVICES = ["Projetos, laudos ou consultoria técnica", "Obras, instalações ou montagem", "Manutenção, limpeza ou facilities", "Logística ou transporte", "Serviços ambientais", "Outra atividade"];
export const AIRPORT_CONTRACTS = ["Prestação de serviços", "Obra ou instalação", "Edital ou concorrência", "Subcontratação", "Outro tipo de contrato", "Ainda não sei"];
export const AIRPORT_QUESTIONS = [
  { key: "airport", label: "Em qual aeroporto a empresa irá atuar?", hint: "Ex.: Guarulhos (GRU) ou local a confirmar.", max: 100 },
  { key: "service", label: "Qual serviço será prestado?", options: AIRPORT_SERVICES },
  { key: "contract", label: "Qual é o tipo de contrato?", options: AIRPORT_CONTRACTS },
  { key: "eoRequired", label: "Existe exigência de E&O Engenharia?", options: AIRPORT_YES_NO },
  { key: "rcRequired", label: "Existe exigência de responsabilidade civil (RC)?", options: AIRPORT_YES_NO },
  { key: "guaranteeRequired", label: "Existe exigência de Seguro Garantia?", options: AIRPORT_YES_NO },
  { key: "limitDefined", label: "O contrato define um limite de cobertura?", options: AIRPORT_YES_NO },
  { key: "policy", label: "A empresa possui apólices vigentes?", options: AIRPORT_YES_NO },
  { key: "deadline", label: "Qual é o prazo para apresentação da apólice?", hint: "Informe a data, “sem prazo definido” ou “a confirmar”.", max: 100 },
  { key: "clauseAvailable", label: "A empresa já tem a cláusula de seguros?", options: AIRPORT_YES_NO },
] as const;
export type AirportBrief = Partial<Record<(typeof AIRPORT_QUESTIONS)[number]["key"], string>>;

const byService: Record<string, AirportProduct[]> = {
  [AIRPORT_SERVICES[0]]: ["eo", "rc_geral"],
  [AIRPORT_SERVICES[1]]: ["engenharia", "rc_geral"],
  [AIRPORT_SERVICES[2]]: ["rc_geral", "equipamentos"],
  [AIRPORT_SERVICES[3]]: ["rc_aeroportuario", "rc_geral"],
  [AIRPORT_SERVICES[4]]: ["ambiental", "rc_geral"],
};
export function airportPossibilities(brief: AirportBrief): AirportProduct[] {
  const options = new Set<AirportProduct>();
  if (brief.eoRequired === "Sim") options.add("eo");
  if (brief.rcRequired === "Sim") { options.add("rc_aeroportuario"); options.add("rc_geral"); }
  if (brief.guaranteeRequired === "Sim") options.add("garantia");
  for (const option of byService[brief.service ?? ""] ?? []) options.add(option);
  return [...options];
}

export function airportPriority(deadlineMs: number, nowDayMs: number, phase: string, hasClause: boolean) {
  const days = (deadlineMs - nowDayMs) / 86_400_000;
  if (["Contrato aprovado", "Exigência identificada"].includes(phase) || days <= 14) return { label: "Alta", score: 90 };
  if (["Contrato em negociação", "Exigência em definição"].includes(phase) || hasClause || Number.isFinite(days)) return { label: "Média", score: 55 };
  if (phase === "Pesquisa inicial ou projeto futuro") return { label: "Desenvolvimento", score: 20 };
  return { label: "A classificar", score: null };
}
