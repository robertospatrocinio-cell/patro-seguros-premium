// Meta Pixel & GA4 event helpers
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    __loadAnalytics?: () => void;
  }
}

const ensureAnalytics = () => window.__loadAnalytics?.();

export const trackWhatsAppClick = (source?: string) => {
  ensureAnalytics();
  window.fbq?.("track", "Contact", {
    content_name: "WhatsApp",
    content_category: source || "geral",
  });
  window.gtag?.("event", "whatsapp_click", { event_category: "lead", event_label: source });
};

export const trackCotacaoSubmit = (tipoSeguro?: string) => {
  ensureAnalytics();
  window.fbq?.("track", "Lead", {
    content_name: "Cotação",
    content_category: tipoSeguro || "geral",
  });
  window.gtag?.("event", "generate_lead", { event_category: "cotacao", event_label: tipoSeguro });
};

export const trackCotacaoClick = (source?: string) => {
  ensureAnalytics();
  window.fbq?.("track", "InitiateCheckout", {
    content_name: "Cotação Click",
    content_category: source || "geral",
  });
  window.gtag?.("event", "cotacao_click", { event_category: "lead", event_label: source });
};
