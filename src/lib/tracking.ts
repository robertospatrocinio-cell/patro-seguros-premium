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

// ---------- Internal link clicks (e.g. "Veja também" related-coverage chips) ----------

/**
 * Standardized GA4 dimensions for internal link tracking.
 *
 * Conventions (enforced via normalization helpers below):
 *  - `placement`: kebab-case slug describing the UI block (e.g. "veja-tambem", "smart-text", "hub-grid").
 *  - `source`: "{surface}:{slug}" — both parts kebab-case, lowercased, accent-stripped.
 *      surfaces in use: "faq-product", "faq-global", "hub", "footer", "404", "blog".
 *  - `destination`: absolute path, lowercased, no trailing slash, no query/hash.
 *  - `label`: human readable, trimmed (kept as-is for readability in reports).
 */

const toSlug = (value: string): string =>
  (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizePlacement = (value?: string): string => toSlug(value || "veja-tambem") || "veja-tambem";

const normalizeSource = (value: string): string => {
  if (!value) return "unknown:unknown";
  const [rawSurface, ...rest] = value.split(":");
  const surface = toSlug(rawSurface) || "unknown";
  const slug = toSlug(rest.join(":")) || "geral";
  return `${surface}:${slug}`;
};

const normalizeDestination = (value: string): string => {
  if (!value) return "/";
  let path = value.split("#")[0].split("?")[0].toLowerCase().trim();
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path;
};

export interface InternalLinkClickMeta {
  /** Where the link was rendered. Format "{surface}:{slug}" — normalized automatically. */
  source: string;
  /** The destination URL (relative path). */
  destination: string;
  /** The visible link label (e.g. "Seguro de Vida"). */
  label: string;
  /** Optional UI block grouping (e.g. "veja-tambem", "smart-text", "hub-grid"). */
  placement?: string;
}

/**
 * Canonical surfaces. Use `buildInternalLinkSource(surface, slug)` at call sites
 * so all pages emit `source` in the same `{surface}:{slug}` format.
 */
export type InternalLinkSurface =
  | "faq-product"
  | "faq-global"
  | "hub"
  | "footer"
  | "header"
  | "blog"
  | "404"
  | "landing"
  | "sidebar";

/** Canonical placements (UI block where the link is rendered). */
export type InternalLinkPlacement =
  | "veja-tambem"
  | "smart-text"
  | "hub-grid"
  | "related-posts"
  | "footer-links"
  | "breadcrumb"
  | "cta-block";

/** Build a normalized `source` string. Always use this at call sites. */
export const buildInternalLinkSource = (
  surface: InternalLinkSurface,
  slug: string,
): string => normalizeSource(`${surface}:${slug || "geral"}`);

export const trackInternalLinkClick = (meta: InternalLinkClickMeta) => {
  ensureAnalytics();
  const attr = captureAttribution();
  const placement = normalizePlacement(meta.placement);
  const source = normalizeSource(meta.source);
  const destination = normalizeDestination(meta.destination);
  const label = (meta.label || "").trim();
  window.gtag?.("event", "internal_link_click", {
    event_category: "navigation",
    event_label: label,
    placement,
    source,
    destination,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
  });
  window.fbq?.("trackCustom", "InternalLinkClick", {
    placement,
    source,
    destination,
    label,
  });
};
