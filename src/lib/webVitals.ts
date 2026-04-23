import { onLCP, onCLS, onINP, type Metric } from 'web-vitals';

const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  CLS: { good: 0.1, poor: 0.25 },
  INP: { good: 200, poor: 500 },
};

type VitalName = keyof typeof THRESHOLDS;

interface VitalEntry {
  name: string;
  value: number;
  rating: string;
  id: string;
  page: string;
  timestamp: number;
  phase?: string;
}

const STORAGE_KEY = 'cwv_log';
const BASELINE_KEY = 'cwv_baseline';
const PHASE_KEY = 'cwv_phase';

function getRating(name: VitalName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const t = THRESHOLDS[name];
  if (value <= t.good) return 'good';
  if (value <= t.poor) return 'needs-improvement';
  return 'poor';
}

function formatValue(name: string, value: number): string {
  return name === 'CLS' ? value.toFixed(3) : Math.round(value) + 'ms';
}

function storeEntry(entry: VitalEntry) {
  try {
    const existing: VitalEntry[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(entry);
    if (existing.length > 200) existing.splice(0, existing.length - 200);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // storage full or unavailable
  }
}

function getCurrentPhase(): string {
  try {
    return localStorage.getItem(PHASE_KEY) || 'before';
  } catch {
    return 'before';
  }
}

function handleMetric(metric: Metric) {
  const name = metric.name as VitalName;
  const value = metric.value;
  const rating = getRating(name, value);
  const phase = getCurrentPhase();

  // Send to GA4
  window.gtag?.('event', 'web_vitals', {
    event_category: 'Web Vitals',
    event_label: name,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    metric_id: metric.id,
    metric_rating: rating,
    metric_phase: phase,
    non_interaction: true,
  });

  // Console alert for poor/needs-improvement metrics
  if (rating === 'poor') {
    console.warn(
      `🔴 CWV ALERT [${phase}] "${name}" is POOR: ${formatValue(name, value)}`,
    );
  } else if (rating === 'needs-improvement') {
    console.warn(
      `🟡 CWV [${phase}] "${name}" needs improvement: ${formatValue(name, value)}`,
    );
  } else {
    console.info(
      `🟢 CWV [${phase}] "${name}" is GOOD: ${formatValue(name, value)}`,
    );
  }

  // Store for comparison
  const entry: VitalEntry = {
    name,
    value,
    rating,
    id: metric.id,
    page: window.location.pathname,
    timestamp: Date.now(),
    phase,
  };
  storeEntry(entry);
}

export function initWebVitals() {
  onLCP(handleMetric);
  onCLS(handleMetric);
  onINP(handleMetric);
}

/**
 * Set the current monitoring phase.
 * Call from browser console:
 *   setCWVPhase('before') — before Cloudflare cache changes
 *   setCWVPhase('after')  — after Cloudflare cache changes
 */
export function setCWVPhase(phase: 'before' | 'after') {
  localStorage.setItem(PHASE_KEY, phase);
  console.info(`📊 CWV phase set to "${phase}". Reload the page to collect new metrics.`);
}

/**
 * Save current metrics as baseline for comparison.
 * Call from browser console: saveCWVBaseline()
 */
export function saveCWVBaseline() {
  const entries: VitalEntry[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const currentPhase = getCurrentPhase();
  const phaseEntries = entries.filter(e => e.phase === currentPhase);
  localStorage.setItem(BASELINE_KEY + '_' + currentPhase, JSON.stringify(phaseEntries));
  console.info(`📊 Saved ${phaseEntries.length} entries as "${currentPhase}" baseline.`);
}

/**
 * Compare before/after CWV metrics.
 * Call from browser console: compareCWV()
 */
export function compareCWV() {
  const beforeRaw = localStorage.getItem(BASELINE_KEY + '_before');
  const afterRaw = localStorage.getItem(BASELINE_KEY + '_after');

  if (!beforeRaw || !afterRaw) {
    console.warn('⚠️ Missing baseline. Save baselines for both phases first:');
    console.warn('  setCWVPhase("before"); // reload & navigate');
    console.warn('  saveCWVBaseline();');
    console.warn('  setCWVPhase("after"); // reload & navigate');
    console.warn('  saveCWVBaseline();');
    console.warn('  compareCWV();');
    return;
  }

  const before: VitalEntry[] = JSON.parse(beforeRaw);
  const after: VitalEntry[] = JSON.parse(afterRaw);

  const metrics: VitalName[] = ['LCP', 'CLS', 'INP'];

  const avg = (arr: VitalEntry[], metric: string) => {
    const filtered = arr.filter(e => e.name === metric);
    if (filtered.length === 0) return null;
    return filtered.reduce((sum, e) => sum + e.value, 0) / filtered.length;
  };

  console.group('📊 Core Web Vitals — Before vs After Cache Changes');
  console.table(
    metrics.map(m => {
      const b = avg(before, m);
      const a = avg(after, m);
      const delta = b != null && a != null ? ((a - b) / b) * 100 : null;
      return {
        Metric: m,
        'Before (avg)': b != null ? formatValue(m, b) : 'N/A',
        'After (avg)': a != null ? formatValue(m, a) : 'N/A',
        'Change': delta != null ? `${delta > 0 ? '+' : ''}${delta.toFixed(1)}%` : 'N/A',
        'Status': delta != null ? (delta < -5 ? '✅ Improved' : delta > 5 ? '❌ Regressed' : '➖ Stable') : '—',
      };
    }),
  );
  console.groupEnd();
}

// Expose utilities globally for console access
if (typeof window !== 'undefined') {
  (window as Record<string, unknown>).setCWVPhase = setCWVPhase;
  (window as Record<string, unknown>).saveCWVBaseline = saveCWVBaseline;
  (window as Record<string, unknown>).compareCWV = compareCWV;
}