// Meta Pixel & GA4 event helpers
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    __loadAnalytics?: () => void;
    __analyticsLoaded?: boolean;
  }
}

const ensureAnalytics = () => window.__loadAnalytics?.();

const getSessionId = () => {
  const key = "patro_conversion_session_id";
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const next = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  sessionStorage.setItem(key, next);
  return next;
};

const recordConversionClick = (eventType: "cotacao_click" | "whatsapp_click", source?: string) => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return;

  fetch(`${url}/rest/v1/conversion_click_events`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    keepalive: true,
    body: JSON.stringify({
      event_type: eventType,
      source: source || "geral",
      page_path: window.location.pathname,
      analytics_loaded: Boolean(window.__analyticsLoaded),
      seconds_since_page_start: Number((performance.now() / 1000).toFixed(3)),
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
    }),
  }).catch(() => undefined);
};

export const trackWhatsAppClick = (source?: string) => {
  recordConversionClick("whatsapp_click", source);
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
  recordConversionClick("cotacao_click", source);
  ensureAnalytics();
  window.fbq?.("track", "InitiateCheckout", {
    content_name: "Cotação Click",
    content_category: source || "geral",
  });
  window.gtag?.("event", "cotacao_click", { event_category: "lead", event_label: source });
};
