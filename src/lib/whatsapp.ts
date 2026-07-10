/**
 * Centralized WhatsApp CTA helper.
 * Garante mensagem pré-preenchida padronizada e parâmetros de rastreamento
 * consistentes em todas as CTAs (hero, cotação, fale conosco).
 */

export const WHATSAPP_NUMBER = "551151997500";

export type WhatsAppAudience = "pessoa" | "empresa" | "agro" | "consorcio" | "geral";

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
  if (audience === "consorcio") return "Para Consórcio";
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
// ---------------------------------------------------------------------------
// buildWhatsAppLink — newer, context-friendly helper used by pillar/hub pages
// and blog cross-links. Coexists with buildWhatsAppUrl above (CRM/forms).
// ---------------------------------------------------------------------------

export interface WhatsAppLinkContext {
  /** Origin of the click, e.g. "hub-auto:hero", "hub-agro:mid", "blog:slug" */
  origem: string;
  /** Product/branch the user is interested in, e.g. "Seguro Auto", "Seguro Agro" */
  produto?: string;
  /** Custom message override. If absent, a sensible default is composed. */
  mensagem?: string;
  /** Optional sub-detail, e.g. car model, hectares, niche. */
  detalhe?: string;
}

/**
 * Builds a wa.me URL with a contextualized message.
 *
 * Example:
 *   buildWhatsAppLink({ origem: "hub-auto:hero", produto: "Seguro Auto" })
 */
export function buildWhatsAppLink({
  origem,
  produto,
  mensagem,
  detalhe,
}: WhatsAppLinkContext): string {
  const base = mensagem
    ? mensagem
    : `Olá, vim pelo site da Patro Seguros (${origem})${
        produto ? ` e quero cotar ${produto}` : " e gostaria de falar com um especialista"
      }${detalhe ? `. ${detalhe}` : "."}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(base)}`;
}

// ---------------------------------------------------------------------------
// Landing Pages — mensagens pré-preenchidas por CTA (hero / cta-final / success)
// Fonte única de verdade. Edite aqui para ajustar textos de qualquer LP.
// ---------------------------------------------------------------------------

export type LpCtaKey = "hero" | "cta-final" | "success" | (string & {});

export interface LpWhatsAppTemplate {
  hero: string;
  "cta-final": string;
  success: string;
  /** Mensagem padrão caso o CTA solicitado não exista. */
  default?: string;
}

/** Mensagem genérica de fallback quando a LP não tem template dedicado. */
const GENERIC_LP_MESSAGE =
  "Olá! Vim pelo site da Patro Seguros e gostaria de mais informações.";

export const LP_WHATSAPP_TEMPLATES: Record<string, LpWhatsAppTemplate> = {
  "lp-transportes-360": {
    hero: "Olá! Vim pela landing page do Patro Transportes 360 e gostaria de solicitar um diagnóstico da operação da minha transportadora.",
    "cta-final":
      "Olá! Estou na página do Patro Transportes 360 e quero conversar sobre proteção completa para frota, cargas e motoristas.",
    success:
      "Olá! Acabei de enviar o formulário do Patro Transportes 360 e gostaria de agilizar o diagnóstico pelo WhatsApp.",
    default:
      "Olá! Vim pela landing page do Patro Transportes 360 e gostaria de mais informações.",
  },
  "lp-maquinas-equipamentos": {
    hero: "Olá! Vim pela landing page de Seguro de Máquinas e Equipamentos e gostaria de solicitar uma análise de risco.",
    "cta-final":
      "Olá! Estou na página de Seguro de Máquinas e Equipamentos e quero conversar sobre proteção para meus equipamentos.",
    success:
      "Olá! Acabei de enviar o formulário de Seguro de Máquinas e Equipamentos e gostaria de agilizar o atendimento pelo WhatsApp.",
    default:
      "Olá! Vim pela landing page de Seguro de Máquinas e Equipamentos e gostaria de mais informações.",
  },
  "lp-galpoes-centros-distribuicao": {
    hero: "Olá! Vim pela landing page Patro Galpões 360 e gostaria de solicitar um diagnóstico do meu galpão.",
    "cta-final":
      "Olá! Estou na página Patro Galpões 360 e quero conversar sobre proteção do meu galpão / CD.",
    success:
      "Olá! Acabei de enviar o formulário Patro Galpões 360 e gostaria de agilizar o diagnóstico pelo WhatsApp.",
  },
  "lp-cibernetico-empresas": {
    hero: "Olá! Vim pela landing page Patro Cyber PME e gostaria de solicitar um diagnóstico cibernético inicial.",
    "cta-final":
      "Olá! Estou na página Patro Cyber PME e quero conversar sobre proteção cibernética para a minha empresa.",
    success:
      "Olá! Acabei de enviar o formulário Patro Cyber PME e gostaria de agilizar o diagnóstico pelo WhatsApp.",
  },
  "lp-locadoras-equipamentos": {
    hero: "Olá! Vim pela landing page Patro Locadoras 360 e gostaria de solicitar uma análise da minha locadora.",
    "cta-final":
      "Olá! Estou na página Patro Locadoras 360 e quero conversar sobre proteção completa da minha frota locada.",
    success:
      "Olá! Acabei de enviar o formulário Patro Locadoras 360 e gostaria de agilizar a análise pelo WhatsApp.",
  },
  "lp-responsabilidade-admin-profissionais": {
    hero: "Olá! Vim pela landing page Patro Responsabilidade Empresarial e gostaria de solicitar uma análise das responsabilidades da minha empresa.",
    "cta-final":
      "Olá! Estou na página Patro Responsabilidade Empresarial e quero conversar sobre D&O, E&O e responsabilidade civil profissional.",
    success:
      "Olá! Acabei de enviar o formulário Patro Responsabilidade Empresarial e gostaria de agilizar a análise pelo WhatsApp.",
  },
};

/**
 * Resolve a mensagem de WhatsApp de um CTA em uma landing page e retorna a URL wa.me.
 *
 * Uso:
 *   buildLpWhatsAppUrl("lp-transportes-360", "hero")
 */
export function buildLpWhatsAppUrl(source: string, cta: LpCtaKey = "hero"): string {
  const template = LP_WHATSAPP_TEMPLATES[source];
  const message =
    template?.[cta as keyof LpWhatsAppTemplate] ??
    template?.default ??
    GENERIC_LP_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Retorna somente o texto pré-preenchido (útil p/ campos `whatsappSuccessMessage`). */
export function getLpWhatsAppMessage(source: string, cta: LpCtaKey = "hero"): string {
  const template = LP_WHATSAPP_TEMPLATES[source];
  return (
    template?.[cta as keyof LpWhatsAppTemplate] ??
    template?.default ??
    GENERIC_LP_MESSAGE
  );
}
