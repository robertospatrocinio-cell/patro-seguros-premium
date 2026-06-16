import { toast } from "sonner";

const WHATSAPP_URL = "https://wa.me/551151997500";

/**
 * Toast de erro com tom acolhedor + ação direta para o WhatsApp.
 * Use quando uma operação falhar (rede, validação inesperada, edge function).
 */
export function showFriendlyError(
  message = "Algo deu errado. Tente novamente em instantes ou fale com a gente no WhatsApp.",
  opts: { whatsappMessage?: string; duration?: number } = {},
) {
  const url = opts.whatsappMessage
    ? `${WHATSAPP_URL}?text=${encodeURIComponent(opts.whatsappMessage)}`
    : WHATSAPP_URL;

  toast.error(message, {
    duration: opts.duration ?? 8000,
    action: {
      label: "Falar no WhatsApp",
      onClick: () => {
        window.open(url, "_blank", "noopener,noreferrer");
      },
    },
  });
}

/**
 * Toast de validação (curto, sem CTA WhatsApp). Use quando o usuário só
 * precisa corrigir um campo do formulário.
 */
export function showValidationError(message: string) {
  toast.error(message, { duration: 5000 });
}