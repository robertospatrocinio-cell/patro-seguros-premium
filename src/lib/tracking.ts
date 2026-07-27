import {
  getMonitoringSessionId,
  readVitalsSnapshot,
} from "@/lib/monitoringSession";

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

// Unified with the Web Vitals collector so LCP/TBT samples and CTA clicks
// share the same session_id and can be joined for correlation queries.
const getSessionId = () => getMonitoringSessionId();

// ---------- UTM / attribution capture ----------
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
type UtmKey = (typeof UTM_KEYS)[number];
type Attribution = Partial<Record<UtmKey, string>> & { referrer?: string; landing_page?: string };

const ATTR_KEY = "patro_attribution";

/**
 * Captures and persists marketing attribution data (UTMs, referrer) to sessionStorage.
 * Maps common ad-platform click IDs (gclid, fbclid) to utm_source if not explicitly set.
 */
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

/**
 * Persists a conversion event (click) to the Supabase database.
 * Includes full attribution context, session ID, and performance metrics.
 *
 * Perf: o envio é adiado para uma microtask e usa `navigator.sendBeacon`
 * quando disponível, para tirar 100% do trabalho síncrono do caminho do
 * clique (leitura de sessionStorage + construção do payload + fetch).
 * O CTA nativo (<a>/<Link>) navega instantaneamente; o beacon sobe em
 * background sem competir com a navegação.
 */
 const recordConversionClick = (
  eventType: "cotacao_click" | "whatsapp_click",
  source?: string,
  meta?: ConversionMeta,
) => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return;

  // Snapshot do timestamp ANTES da microtask, para métrica correta.
  const startedAt = Number((performance.now() / 1000).toFixed(3));
  const path = window.location.pathname;
  const analyticsLoaded = Boolean(window.__analyticsLoaded);
  const ua = navigator.userAgent;

  const send = () => {
    let attr: Attribution = {};
    let sessionId = "";
    const vitals = readVitalsSnapshot();
    try {
      attr = captureAttribution();
      sessionId = getSessionId();
    } catch { /* storage unavailable */ }

    const payload = JSON.stringify({
      event_type: eventType,
      source: source || "geral",
      page_path: path,
      analytics_loaded: analyticsLoaded,
      seconds_since_page_start: startedAt,
      session_id: sessionId,
      user_agent: ua,
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      utm_campaign: attr.utm_campaign,
      utm_term: attr.utm_term,
      utm_content: attr.utm_content,
      referrer: attr.referrer,
      landing_page: attr.landing_page,
      insurance_type: meta?.insuranceType,
      origin: meta?.origin,
      // Perceived performance at click time — correlates slow pages with
      // lower CTA conversion.
      lcp_ms: vitals.lcp != null ? Math.round(vitals.lcp) : undefined,
      inp_ms: vitals.inp != null ? Math.round(vitals.inp) : undefined,
      tbt_ms: vitals.tbt != null ? Math.round(vitals.tbt) : undefined,
      cls: vitals.cls,
      device_type: vitals.device_type,
      connection_type: vitals.connection_type,
    });

    const endpoint = `${url}/rest/v1/conversion_click_events`;

    // sendBeacon: assíncrono, sobrevive à navegação, não bloqueia a thread
    // principal e não conta como fetch pendente da página atual.
    // PostgREST aceita o Content-Type "application/json" via Blob.
    const beacon = navigator.sendBeacon;
    if (beacon) {
      try {
        // sendBeacon não permite cabeçalhos customizados (apikey/Authorization),
        // então concatenamos as chaves na query string — o PostgREST aceita
        // `apikey=...` como query param.
        const beaconUrl = `${endpoint}?apikey=${encodeURIComponent(key)}`;
        const blob = new Blob([payload], { type: "application/json" });
        if (beacon.call(navigator, beaconUrl, blob)) return;
      } catch { /* fallback abaixo */ }
    }

    // Fallback: fetch com keepalive, mantendo o comportamento anterior.
    fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      keepalive: true,
      body: payload,
    }).catch(() => undefined);
  };

  // Adia para depois do handler do clique: o navigate/window.open acontece
  // primeiro, e só depois a microtask constrói o payload + dispara o beacon.
  if (typeof queueMicrotask === "function") queueMicrotask(send);
  else Promise.resolve().then(send);
};

/**
 * Rastreia a "leitura" de uma seção quando o usuário realmente chega
 * na âncora via scroll (disparado por IntersectionObserver no
 * JumpLinksNav). Persiste na mesma tabela `internal_link_click_events`
 * com `event_kind='section-view'` para correlacionar CLIQUE em
 * jump-link com LEITURA real da seção no painel Admin.
 *
 * Dedupe por sessão: cada (pathname, anchor) só é registrado uma vez
 * na mesma aba (sessionStorage), evitando inflacionar o volume quando
 * o usuário rola pra frente e pra trás.
 */
export const trackSectionView = (anchor: string, label?: string) => {
  if (typeof window === "undefined") return;
  const id = (anchor || "").replace(/^#/, "").trim();
  if (!id) return;
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const dedupeKey = `sv:${path}#${id}`;
  try {
    if (window.sessionStorage.getItem(dedupeKey)) return;
    window.sessionStorage.setItem(dedupeKey, "1");
  } catch { /* storage indisponível — segue sem dedupe */ }

  ensureAnalytics();
  const attr = captureAttribution();
  const slug = path === "/" ? "home" : path.slice(1);
  const source = normalizeSource(`landing:${slug || "geral"}`);
  const destination = `${path}#${id}`;

  window.gtag?.("event", "section_view", {
    event_category: "engagement",
    event_label: label || id,
    placement: "section-view",
    source,
    destination,
    anchor: id,
    page_path: path,
  });

  persistInternalLinkClick({
    placement: "section-view",
    source,
    destination,
    label: label || "",
    anchor: id,
    attr,
    eventKind: "section-view",
  });
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

/**
 * Final conversion event fired on the success page (post-redirect).
 * Emits a dedicated `quote_submitted` event for GA4/Meta, plus a Meta Pixel
 * `CompleteRegistration` to track the end of the funnel cleanly.
 */
export const trackQuoteSubmitted = (tipoSeguro?: string, meta?: ConversionMeta) => {
  ensureAnalytics();
  const attr = captureAttribution();
  window.fbq?.("trackCustom", "QuoteSubmitted", {
    content_name: "Cotação Concluída",
    content_category: tipoSeguro || "geral",
    origin: meta?.origin,
  });
  window.fbq?.("track", "CompleteRegistration", {
    content_name: "Cotação Concluída",
    content_category: tipoSeguro || "geral",
  });
  window.gtag?.("event", "quote_submitted", {
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

// ---------- URL helpers with UTM attribution ----------

/**
 * Build an internal /cotacao URL with UTM parameters so downstream analytics
 * (GA4, Segfy) preserves the CTA origin even after the SPA route change.
 *
 * Example:
 *   buildCotacaoUrl("verificar-susep-cta", { tipo: "empresarial" })
 *   → "/cotacao?tipo=empresarial&utm_source=site&utm_medium=cta&utm_campaign=verificar-susep-cta&utm_content=verificar-susep-cta"
 */
export const buildCotacaoUrl = (
  source: string,
  opts?: { tipo?: string; basePath?: string },
): string => {
  const base = opts?.basePath || "/cotacao";
  const params = new URLSearchParams();
  if (opts?.tipo) params.set("tipo", opts.tipo);
  params.set("utm_source", "site");
  params.set("utm_medium", "cta");
  params.set("utm_campaign", source);
  params.set("utm_content", source);
  return `${base}?${params.toString()}`;
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

/**
 * Extrai a âncora (id de seção) do destino. Retorna null quando não há hash
 * ou quando o hash é inválido. Usado para drilldown por seção (`#preco-heading`,
 * `#faq-heading`) no painel Admin de correlação com o GSC.
 */
const extractAnchor = (destination: string): string | null => {
  if (!destination) return null;
  const hashIndex = destination.indexOf("#");
  if (hashIndex === -1) return null;
  const raw = destination.slice(hashIndex + 1).split("?")[0].trim().toLowerCase();
  // Aceita apenas ids razoáveis (letras/números/traços) para evitar ruído.
  if (!raw || !/^[a-z0-9][a-z0-9_-]{0,127}$/.test(raw)) return null;
  return raw;
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
  /**
   * Optional explicit anchor/section id (sem `#`). Quando omitido, é extraído
   * automaticamente do hash de `destination` (ex.: `/foo#preco-heading` →
   * `preco-heading`). Ex.: use quando o clique for numa aba/pill do
   * `JumpLinksNav`, cujo href já é `#id`.
   */
  anchor?: string;
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
  | "cta-block"
  | "jump-links"
  | "proximas-leituras"
  | "next-section-inline"
  | "next-section-list"
  | "next-section-mobile"
  | "cluster-pager-prev"
  | "cluster-pager-next";

/**
 * Variantes de CTA de "próxima seção" — nomes canônicos para
 * comparar conversão entre placements no painel Admin.
 *
 *  - `inline`  → `<NextSectionCta>` ancorado ao final de uma seção.
 *  - `list`    → `<ProximasLeiturasCluster>` (bibliografia no rodapé).
 *  - `mobile`  → `<MobileClusterNextCta>` (pill flutuante mobile).
 */
export type NextSectionCtaVariant = "inline" | "list" | "mobile";

export const NEXT_SECTION_CTA_PLACEMENT: Record<
  NextSectionCtaVariant,
  Extract<InternalLinkPlacement, `next-section-${string}`>
> = {
  inline: "next-section-inline",
  list: "next-section-list",
  mobile: "next-section-mobile",
};

/** Build a normalized `source` string. Always use this at call sites. */
export const buildInternalLinkSource = (
  surface: InternalLinkSurface,
  slug: string,
): string => normalizeSource(`${surface}:${slug || "geral"}`);

/**
 * Tracks navigation via internal high-value links (e.g., related products, contextual keywords).
 * Dispatches a standard GA4 `internal_link_click` event with normalized dimensions.
 */
 export const trackInternalLinkClick = (meta: InternalLinkClickMeta) => {
  ensureAnalytics();
  const attr = captureAttribution();
  const placement = normalizePlacement(meta.placement);
  const source = normalizeSource(meta.source);
  const destination = normalizeDestination(meta.destination);
  const label = (meta.label || "").trim();
  const anchor =
    (meta.anchor && extractAnchor(`#${meta.anchor.replace(/^#/, "")}`)) ||
    extractAnchor(meta.destination);
  window.gtag?.("event", "internal_link_click", {
    event_category: "navigation",
    event_label: label,
    placement,
    source,
    destination,
    anchor: anchor ?? undefined,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
  });
  window.fbq?.("trackCustom", "InternalLinkClick", {
    placement,
    source,
    destination,
    anchor,
    label,
  });
  persistInternalLinkClick({ placement, source, destination, label, anchor, attr });
};

/**
 * Rastreia clique num CTA de "próxima seção" (inline, lista de rodapé
 * ou pill flutuante mobile). Emite um evento GA4 dedicado
 * `next_section_cta_click` com a `variant` — permite comparar a
 * eficácia de cada placement no GA4 Explore — E persiste no
 * `internal_link_click_events` com placement canônico `next-section-*`
 * para o painel Admin correlacionar com conversões (`session_id`).
 */
export const trackNextSectionCtaClick = (
  variant: NextSectionCtaVariant,
  meta: Omit<InternalLinkClickMeta, "placement">,
) => {
  const placement = NEXT_SECTION_CTA_PLACEMENT[variant];
  ensureAnalytics();
  window.gtag?.("event", "next_section_cta_click", {
    event_category: "engagement",
    event_label: meta.label,
    variant,
    placement,
    source: meta.source,
    destination: meta.destination,
    anchor: meta.anchor,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
  // Reutiliza toda a atribuição/persistência de trackInternalLinkClick
  // — evita duplicar código de UTM/session/beacon.
  trackInternalLinkClick({ ...meta, placement });
};

/**
 * Persiste o clique em `internal_link_click_events` (via sendBeacon quando
 * disponível) para alimentar o painel Admin de correlação com o GSC.
 * Falhas são silenciosas — telemetria nunca deve quebrar a navegação.
 */
const persistInternalLinkClick = (payload: {
  placement: string;
  source: string;
  destination: string;
  label: string;
  anchor: string | null;
  attr: Attribution;
  eventKind?: "click" | "section-view";
}) => {
  if (typeof window === "undefined") return;
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return;

  const path = window.location.pathname;
  const ua = navigator.userAgent;
  const vitals = readVitalsSnapshot();
  let sessionId = "";
  try { sessionId = getSessionId(); } catch { /* noop */ }

  const body = JSON.stringify({
    placement: payload.placement.slice(0, 64),
    source: payload.source.slice(0, 128),
    destination: payload.destination.slice(0, 512),
    label: payload.label ? payload.label.slice(0, 256) : null,
    anchor: payload.anchor ? payload.anchor.slice(0, 128) : null,
    page_path: path.slice(0, 512),
    session_id: sessionId || null,
    utm_source: payload.attr.utm_source ?? null,
    utm_medium: payload.attr.utm_medium ?? null,
    utm_campaign: payload.attr.utm_campaign ?? null,
    referrer: payload.attr.referrer ?? null,
    device_type: vitals.device_type ?? null,
    user_agent: ua.slice(0, 512),
    event_kind: payload.eventKind ?? "click",
  });

  const endpoint = `${url}/rest/v1/internal_link_click_events`;
  const send = () => {
    const beacon = navigator.sendBeacon;
    if (beacon) {
      try {
        const beaconUrl = `${endpoint}?apikey=${encodeURIComponent(key)}`;
        const blob = new Blob([body], { type: "application/json" });
        if (beacon.call(navigator, beaconUrl, blob)) return;
      } catch { /* fallback abaixo */ }
    }
    fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      keepalive: true,
      body,
    }).catch(() => undefined);
  };
  if (typeof queueMicrotask === "function") queueMicrotask(send);
  else Promise.resolve().then(send);
};
