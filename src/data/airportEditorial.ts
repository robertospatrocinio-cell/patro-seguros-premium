import { APOLICE_CONTRATOS_PATH } from "./apoliceContratosRoute";
import { eoArticlePath } from "./eoDiscovery";
import { GARANTIA_AEROPORTUARIA_PATH } from "./garantiaAeroportuaria";
import { GUIA_AEROPORTUARIO_PATH, guiaAeroportuarioTitle } from "./guiaAeroportuarioRoute";

export const airportEditorial = {
  eoGuide: {
    path: eoArticlePath,
    title: "Seguro E&O Engenharia para prestadores de serviços em aeroportos",
    summary: "Exemplos e checklist para ler a cláusula de responsabilidade profissional.",
    status: "public",
  },
  contractReview: {
    path: APOLICE_CONTRATOS_PATH,
    title: "Como evitar apólices inadequadas em contratos empresariais",
    summary: "Erros frequentes e checklist para comparar o texto da cláusula com a apólice.",
    status: "preview",
  },
  guarantee: {
    path: GARANTIA_AEROPORTUARIA_PATH,
    title: "Seguro Garantia para contratos aeroportuários",
    summary: "Quando a garantia pode ser exigida e como compará-la com caução e fiança bancária.",
    status: "preview",
  },
  pillar: {
    path: GUIA_AEROPORTUARIO_PATH,
    title: guiaAeroportuarioTitle,
    summary: "Guia pilar: modalidades por atividade e checklist para conferência do contrato.",
    status: "preview",
  },
} as const;
