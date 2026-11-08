export interface LeadAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_page?: string;
  referrer?: string;
}

// Only paths and campaign identifiers are forwarded, never full query strings.
export function safeAttributionPath(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return;
  return value.split(/[?#]/)[0].slice(0, 200);
}

export function sanitizeLeadAttribution(value: unknown): LeadAttribution {
  if (!value || typeof value !== "object") return {};
  const input = value as Record<string, unknown>;
  const output: LeadAttribution = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign"] as const) {
    const candidate = input[key];
    // Campaign names must not contain email addresses, phones or arbitrary URLs.
    if (typeof candidate === "string" && /^[\p{L}\p{N}_. ()+\-]{1,100}$/u.test(candidate)
      && !/\d{8,}/.test(candidate)) output[key] = candidate;
  }
  output.landing_page = safeAttributionPath(input.landing_page);
  if (typeof input.referrer === "string") {
    try { output.referrer = new URL(input.referrer).hostname.slice(0, 200); } catch { /* absent or direct */ }
  }
  return Object.fromEntries(Object.entries(output).filter(([, item]) => item !== undefined));
}

export function getLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return {};
  try {
    const saved = sessionStorage.getItem("patro_attribution");
    if (saved) return sanitizeLeadAttribution(JSON.parse(saved));
    const params = new URLSearchParams(window.location.search);
    return sanitizeLeadAttribution({
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      landing_page: window.location.pathname,
      referrer: document.referrer,
    });
  } catch { return {}; }
}
