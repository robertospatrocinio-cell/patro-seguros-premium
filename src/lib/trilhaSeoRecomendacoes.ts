import type { TrilhaSeoItem } from "@/components/TrilhaSeoRelacionados";

/**
 * Cards contextuais que direcionam PageRank interno das páginas mais fortes
 * para páginas descobertas/pouco indexadas.
 * Reaproveitável por categoria — mantém consistência editorial.
 */

export const TRILHA_SENIOR: TrilhaSeoItem = {
  title: "Plano de saúde sênior em Guarulhos",
  description:
    "Coberturas específicas para +60 anos com rede em Cidade Maia e Centro. Cotação personalizada por faixa etária.",
  href: "/planos-saude-senior-guarulhos",
  badge: "Saúde 60+",
};

export const TRILHA_ACIDENTES: TrilhaSeoItem = {
  title: "Seguro Acidentes Pessoais",
  description:
    "Indenização por invalidez, morte acidental e despesas médicas — contratação individual ou coletiva.",
  href: "/lp/seguro-acidentes-pessoais",
  badge: "Proteção pessoal",
};

export const TRILHA_SEGURADORAS: TrilhaSeoItem = {
  title: "Compare seguradoras parceiras",
  description:
    "Porto, Mapfre, Allianz, Bradesco e mais 12: veja diferenciais, sinistro e rede referenciada em Guarulhos.",
  href: "/seguradoras-parceiras",
  badge: "16 seguradoras",
};

export const TRILHA_COMPARADOR: TrilhaSeoItem = {
  title: "Como comparar seguradoras em Guarulhos",
  description:
    "Guia prático: cobertura × franquia, sinistro, rede e reputação — com tabela comparativa interativa.",
  href: "/como-comparar-seguradoras-guarulhos",
  badge: "Guia local",
};

export const TRILHA_CARTA_VERDE: TrilhaSeoItem = {
  title: "Seguro Carta Verde (Mercosul)",
  description:
    "Obrigatório para viagens de carro à Argentina, Uruguai, Paraguai, Chile e Bolívia. Emissão rápida.",
  href: "/seguro-carta-verde",
  badge: "Mercosul",
};

export const TRILHA_MOTO_ENTREGADOR: TrilhaSeoItem = {
  title: "Seguro Moto para Entregadores",
  description:
    "Proteja sua ferramenta de trabalho: iFood, Keeta, 99. Cobertura completa contra roubo, furto e assistência 24h em Guarulhos.",
  href: "/seguro-moto-entregadores-guarulhos",
  badge: "Entregadores",
};

/** Trilha padrão para páginas de seguro auto/moto/veicular. */
export const trilhaAuto: TrilhaSeoItem[] = [
  TRILHA_CARTA_VERDE,
  TRILHA_SEGURADORAS,
  TRILHA_COMPARADOR,
];

/** Trilha padrão para páginas residencial/patrimônio. */
export const trilhaResidencial: TrilhaSeoItem[] = [
  TRILHA_SEGURADORAS,
  TRILHA_ACIDENTES,
  TRILHA_SENIOR,
];

/** Trilha padrão para páginas de vida / acidentes / previdência. */
export const trilhaVida: TrilhaSeoItem[] = [
  TRILHA_ACIDENTES,
  TRILHA_SENIOR,
  TRILHA_SEGURADORAS,
];

/** Trilha padrão para páginas de saúde / planos. */
export const trilhaSaude: TrilhaSeoItem[] = [
  TRILHA_SENIOR,
  TRILHA_ACIDENTES,
  TRILHA_SEGURADORAS,
];

/** Trilha padrão para páginas empresariais / PJ. */
export const trilhaEmpresarial: TrilhaSeoItem[] = [
  TRILHA_SEGURADORAS,
  TRILHA_COMPARADOR,
  TRILHA_ACIDENTES,
];