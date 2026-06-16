/**
 * Centralized WhatsApp CTA helper.
 * Garante mensagem pré-preenchida padronizada e parâmetros de rastreamento
 * consistentes em todas as CTAs (hero, cotação, fale conosco).
 */

export const WHATSAPP_NUMBER = "551151997500";

export type WhatsAppAudience = "pessoa" | "empresa" | "geral";

export interface BuildWhatsAppOptions {
  /** Identificador de origem usado em analytics (ex.: hero_carrossel_home, cotacao_pagina, contato_fale_conosco). */
  origem: string;
  /** Público selecionado, quando aplicável. */
  audience?: WhatsAppAudience;
  /** Linhas extras a serem anexadas ao final da mensagem (ex.: tipo de seguro). */
  extraLines?: string[];
}

const audienceLabel = (audience?: WhatsAppAudience) => {
  if (audience === "pessoa") return "Para Você";
  if (audience === "empresa") return "Para sua Empresa";
  return null;
};

export const buildWhatsAppMessage = ({
  origem,
  audience,
  extraLines = [],
}: BuildWhatsAppOptions): string => {
  const perfil = audienceLabel(audience);
  const lines = [
    `Olá! Vim pelo site da Patro Seguros (origem: ${origem})${
      perfil ? ` — perfil ${perfil}` : ""
    }.`,
    `Gostaria de uma cotação consultiva e de falar com um consultor.`,
    ...extraLines.filter(Boolean),
  ];
  return lines.join("\n");
};

export const buildWhatsAppUrl = (options: BuildWhatsAppOptions): string => {
  const message = buildWhatsAppMessage(options);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};