/**
 * Tipos globais para SDKs de tracking carregados via `<script>` no
 * `index.html` (Meta Pixel, Google Analytics, Google Tag Manager).
 *
 * Mantém o uso simples (`window.fbq?.("track", "Lead")`) sem `as any`.
 */

type FbqCommand = "init" | "track" | "trackCustom" | "trackSingle" | "consent";
type GtagCommand = "config" | "event" | "set" | "consent" | "js";

declare global {
  interface Window {
    fbq?: (command: FbqCommand, eventName: string, params?: Record<string, unknown>) => void;
    gtag?: (command: GtagCommand, action: string, params?: Record<string, unknown>) => void;
    dataLayer?: Array<Record<string, unknown>>;
    /** Último ID de erro registrado pelo monitoring/Sentry — usado em fallbacks. */
    lastErrorId?: string;
  }
}

export {};