/**
 * Centralized WhatsApp CTA helper.
 * Garante mensagem pré-preenchida padronizada e parâmetros de rastreamento
 * consistentes em todas as CTAs (hero, cotação, fale conosco).
 */

export const WHATSAPP_NUMBER = "551151997500";

export type WhatsAppAudience = "pessoa" | "empresa" | "agro" | "geral";

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
  if (audience === "agro") return "Para o Agro";
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

/**
 * Constrói uma URL wa.me para um número específico (usado no CRM).
 * Normaliza removendo caracteres não numéricos e prefixando 55 quando ausente.
 */
export const getWhatsAppUrl = (phone?: string | null, message?: string): string => {
  const digits = (phone || "").replace(/\D/g, "");
  const normalized = digits.startsWith("55") ? digits : `55${digits}`;
  const base = `https://wa.me/${normalized}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/**
 * E-mail padrão para fallback quando o WhatsApp não estiver disponível
 * (popup bloqueado, dispositivo sem app instalado, etc.).
 */
export const FALLBACK_EMAIL = "contato@patroseguros.com.br";

export interface BuildMailtoOptions extends BuildWhatsAppOptions {
  /** Assunto do e-mail. Default reflete a origem. */
  subject?: string;
}

export const buildMailtoUrl = ({
  origem,
  audience,
  extraLines = [],
  subject,
}: BuildMailtoOptions): string => {
  const finalSubject =
    subject || `Contato pelo site — ${origem}`;
  const body = buildWhatsAppMessage({ origem, audience, extraLines });
  const params = new URLSearchParams({
    subject: finalSubject,
    body,
  });
  return `mailto:${FALLBACK_EMAIL}?${params.toString()}`;
};

export interface OpenWhatsAppOptions extends BuildMailtoOptions {
  /** Mensagem amigável exibida no toast quando o fallback for acionado. */
  fallbackToastMessage?: string;
}

/**
 * Tenta abrir o WhatsApp e oferece fallback automático por e-mail
 * caso a janela seja bloqueada pelo navegador.
 * Retorna `true` quando o WhatsApp foi aberto com sucesso.
 */
export const openWhatsAppOrFallback = (
  options: OpenWhatsAppOptions,
  toastFn?: (
    message: string,
    opts: { action: { label: string; onClick: () => void }; duration?: number }
  ) => void,
): boolean => {
  const waUrl = buildWhatsAppUrl(options);
  const mailtoUrl = buildMailtoUrl(options);
  const popup = window.open(waUrl, "_blank", "noopener,noreferrer");
  const blocked = !popup || popup.closed || typeof popup.closed === "undefined";

  if (blocked) {
    try {
      window.gtag?.("event", "whatsapp_fallback_email", {
        event_category: "fallback",
        origem: options.origem,
        url_destino: mailtoUrl,
      });
    } catch {
      /* noop */
    }

    if (toastFn) {
      toastFn(
        options.fallbackToastMessage ||
          "Não conseguimos abrir o WhatsApp. Quer enviar por e-mail?",
        {
          action: {
            label: "Enviar por e-mail",
            onClick: () => {
              window.location.href = mailtoUrl;
            },
          },
          duration: 10000,
        },
      );
    } else {
      window.location.href = mailtoUrl;
    }
    return false;
  }
  return true;
};