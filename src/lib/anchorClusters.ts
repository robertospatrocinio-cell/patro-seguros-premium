/**
 * Mapeia um pathname (página onde a âncora foi clicada) para o
 * "cluster" temático que aparece no filtro do painel admin.
 *
 * A regra é intencionalmente por prefixo/keyword — não é um roteador,
 * é apenas rotulagem para agrupar o ranking de âncoras em famílias
 * de produto. Adicione novos clusters conforme as verticais crescem.
 */

export type AnchorClusterId =
  | "auto"
  | "residencial"
  | "saude"
  | "empresarial"
  | "b2b"
  | "vida"
  | "consorcio"
  | "moto-entregador"
  | "outros";

export interface AnchorClusterMeta {
  id: AnchorClusterId;
  label: string;
}

export const ANCHOR_CLUSTERS: AnchorClusterMeta[] = [
  { id: "auto", label: "Seguro Auto / Uber" },
  { id: "residencial", label: "Residencial" },
  { id: "saude", label: "Planos de Saúde" },
  { id: "empresarial", label: "Empresarial" },
  { id: "b2b", label: "B2B (Garantia / Crédito)" },
  { id: "vida", label: "Vida / Acidentes" },
  { id: "consorcio", label: "Consórcio" },
  { id: "moto-entregador", label: "Moto Entregador" },
  { id: "outros", label: "Outros" },
];

const CLUSTER_LABEL: Record<AnchorClusterId, string> = ANCHOR_CLUSTERS.reduce(
  (acc, c) => {
    acc[c.id] = c.label;
    return acc;
  },
  {} as Record<AnchorClusterId, string>,
);

export const anchorClusterLabel = (id: AnchorClusterId | null | undefined) =>
  (id && CLUSTER_LABEL[id]) || CLUSTER_LABEL.outros;

/**
 * Deriva o cluster a partir do pathname. Usa lower-case + substring
 * matching por keyword — barato e robusto contra variações de rota
 * (`/seguro-auto-guarulhos`, `/melhor-seguro-para-uber-guarulhos`, ...).
 */
export const getAnchorCluster = (pathname: string | null | undefined): AnchorClusterId => {
  if (!pathname) return "outros";
  const p = pathname.toLowerCase();

  // Ordem importa: matches mais específicos primeiro.
  if (p.includes("moto-entregador")) return "moto-entregador";
  if (p.includes("seguro-garantia") || p.includes("seguro-credito") || p.includes("b2b")) return "b2b";
  if (p.includes("consorcio")) return "consorcio";
  if (p.includes("plano-de-saude") || p.includes("planos-de-saude") || p.includes("saude")) return "saude";
  if (p.includes("residencial") || p.includes("condominio") || p.includes("imovel")) return "residencial";
  if (p.includes("empresarial") || p.includes("empresa") || p.includes("galpao") || p.includes("frota")) return "empresarial";
  if (p.includes("vida") || p.includes("acidentes-pessoais")) return "vida";
  if (
    p.includes("auto") ||
    p.includes("uber") ||
    p.includes("carro") ||
    p.includes("moto") ||
    p.includes("byd") ||
    p.includes("dolphin")
  ) return "auto";

  return "outros";
};