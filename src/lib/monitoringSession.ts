/**
 * Shared monitoring session ID used by both Web Vitals telemetry and CTA
 * conversion click tracking. A single ID lets the analytics layer correlate
 * "this user had LCP=4.2s and then clicked (or did not click) the CTA".
 */
const KEY = "patro_monitoring_sid";
let memoryFallback: string | null = null;

function newId(): string {
  try { return crypto.randomUUID(); }
  catch { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
}

export function getMonitoringSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    const existing = sessionStorage.getItem(KEY);
    if (existing) return existing;
    const next = newId();
    sessionStorage.setItem(KEY, next);
    return next;
  } catch {
    if (!memoryFallback) memoryFallback = newId();
    return memoryFallback;
  }
}

// ---------- Live vitals snapshot ----------
export interface VitalsSnapshot {
  lcp?: number;
  inp?: number;
  cls?: number;
  tbt?: number;
  device_type?: string;
  connection_type?: string;
}

const snapshot: VitalsSnapshot = {};

export function updateVitalsSnapshot(patch: Partial<VitalsSnapshot>) {
  Object.assign(snapshot, patch);
}

export function readVitalsSnapshot(): VitalsSnapshot {
  return { ...snapshot };
}

// ---------- Adaptive loading thresholds ----------
export type NetworkProfile = "fast" | "medium" | "slow" | "save-data";

export function getNetworkProfile(): NetworkProfile {
  if (typeof navigator === "undefined") return "medium";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (navigator as any).connection;
  if (!c) return "medium";
  if (c.saveData) return "save-data";
  const et: string | undefined = c.effectiveType;
  if (et === "4g") return "fast";
  if (et === "3g") return "medium";
  if (et === "2g" || et === "slow-2g") return "slow";
  return "medium";
}

export function getLazyMarginMultiplier(): number {
  switch (getNetworkProfile()) {
    case "fast": return 1.5;
    case "medium": return 1;
    case "slow": return 0.5;
    case "save-data": return 0.35;
  }
}