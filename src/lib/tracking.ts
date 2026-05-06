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

// ---------- UTM / attribution capture ----------
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
type UtmKey = (typeof UTM_KEYS)[number];
type Attribution = Partial<Record<UtmKey, string>> & { referrer?: string; landing_page?: string };

const ATTR_KEY = "patro_attribution";

const captureAttribution = (): Attribution => {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(ATTR_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* noop */ }

  const params = new URLSearchParams(window.location.search);
  const attr: Attribution = {};
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) attr[k] = v.slice(0, 200);
  });

  // Map common ad-platform click ids to utm_source if no explicit utm_source
  if (!attr.utm_source) {
    if (params.get("gclid")) { attr.utm_source = "google"; attr.utm_medium = attr.utm_medium || "cpc"; }
    else if (params.get("fbclid")) { attr.utm_source = "facebook"; attr.utm_medium = attr.utm_medium || "social"; }
  }

  const ref = document.referrer || "";
  attr.referrer = ref ? ref.slice(0, 500) : "direct";
  attr.landing_page = window.location.pathname + window.location.search;

  try { sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr)); } catch { /* noop */ }
  return attr;
};

export interface ConversionMeta {
  insuranceType?: string;
  origin?: string; // hero-selector | product-page | faq | sticky | etc.
}

const recordConversionClick = (
  eventType: "cotacao_click" | "whatsapp_click",
  source?: string,
  meta?: ConversionMeta,
) => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return;

  const attr = captureAttribution();

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
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      utm_campaign: attr.utm_campaign,
      utm_term: attr.utm_term,
      utm_content: attr.utm_content,
      referrer: attr.referrer,
      landing_page: attr.landing_page,
      insurance_type: meta?.insuranceType,
      origin: meta?.origin,
    }),
  }).catch(() => undefined);
};

export const trackWhatsAppClick = (source?: string, meta?: ConversionMeta) => {
  recordConversionClick("whatsapp_click", source, meta);
  ensureAnalytics();
  const attr = captureAttribution();
  window.fbq?.("track", "Contact", {
    content_name: "WhatsApp",
    content_category: source || "geral",
    insurance_type: meta?.insuranceType,
    origin: meta?.origin,
  });
  window.gtag?.("event", "whatsapp_click", {
    event_category: "lead",
    event_label: source,
    insurance_type: meta?.insuranceType,
    origin: meta?.origin,
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
  });
};

export const trackCotacaoSubmit = (tipoSeguro?: string, meta?: ConversionMeta) => {
  ensureAnalytics();
  const attr = captureAttribution();
  window.fbq?.("track", "Lead", {
    content_name: "Cotação",
    content_category: tipoSeguro || "geral",
    origin: meta?.origin,
  });
  window.gtag?.("event", "generate_lead", {
    event_category: "cotacao",
    event_label: tipoSeguro,
    insurance_type: tipoSeguro,
    origin: meta?.origin,
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
  });
};

export const trackCotacaoClick = (source?: string, meta?: ConversionMeta) => {
  recordConversionClick("cotacao_click", source, meta);
  ensureAnalytics();
  const attr = captureAttribution();
  window.fbq?.("track", "InitiateCheckout", {
    content_name: "Cotação Click",
    content_category: source || "geral",
    insurance_type: meta?.insuranceType,
    origin: meta?.origin,
  });
  window.gtag?.("event", "cotacao_click", {
    event_category: "lead",
    event_label: source,
    insurance_type: meta?.insuranceType,
    origin: meta?.origin,
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
  });
};

// Init early so attribution is captured even before any click
if (typeof window !== "undefined") {
  try { captureAttribution(); } catch { /* noop */ }
}
