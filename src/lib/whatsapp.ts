// Centralized WhatsApp link builder for consistent context tracking.
// Use across pillars, hubs and blog so origin/product are always present.

export const PATRO_WHATSAPP_PHONE = "551151997500";

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
  return `https://wa.me/${PATRO_WHATSAPP_PHONE}?text=${encodeURIComponent(base)}`;
}