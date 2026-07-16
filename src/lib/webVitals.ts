import { onLCP, onCLS, onINP, type Metric } from 'web-vitals';

const INGEST_URL =
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/log-web-vitals`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as
  | string
  | undefined;

function getDeviceType(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const w = window.innerWidth;
  if (w < 640) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function getConnectionType(): string | undefined {
  const c = (navigator as any).connection;
  return c?.effectiveType;
}

function getSessionId(): string {
  try {
    const k = 'cwv_sid';
    let sid = sessionStorage.getItem(k);
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem(k, sid);
    }
    return sid;
  } catch {
    return 'anon';
  }
}

function persistToProd(entry: VitalEntry) {
  // Ignore localhost/preview traffic to keep prod dataset clean
  if (typeof location === 'undefined') return;
  if (/localhost|127\.0\.0\.1|\.lovable\.app$/.test(location.hostname)) return;
  if (!ANON_KEY) return;

  const payload = JSON.stringify({
    name: entry.name,
    value: entry.value,
    rating: entry.rating,
    page: entry.page,
    device_type: getDeviceType(),
    connection_type: getConnectionType(),
    session_id: getSessionId(),
    metric_id: entry.id,
    phase: entry.phase,
  });

  try {
    // sendBeacon can't set custom headers → include apikey as query param
    // fallback: use fetch keepalive with headers
    const blob = new Blob([payload], { type: 'application/json' });
    const url = `${INGEST_URL}?apikey=${encodeURIComponent(ANON_KEY)}`;
    const ok = navigator.sendBeacon?.(url, blob);
    if (!ok) {
      fetch(INGEST_URL, {
        method: 'POST',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
        },
        body: payload,
      }).catch(() => {});
    }
  } catch {
    // fail silent — monitoring must never break the page
  }
}

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
  persistToProd(entry);
}

export function initWebVitals() {
  onLCP(handleMetric);
  onCLS(handleMetric);
  onINP(handleMetric);

  // Monitor total rendering performance
  if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
    window.performance.mark('app-init');
    
    // Check if navigation takes too long (detecting slow render or white screens)
    window.addEventListener('load', () => {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;

      if (loadTime > 10000) { // 10s threshold for critical performance issues
        window.gtag?.('event', 'performance_critical', {
          event_category: 'Performance',
          event_label: 'Critical Load Time',
          value: loadTime,
          non_interaction: true,
        });
      }
    }, { once: true });
  }
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.setCWVPhase = setCWVPhase;
  w.saveCWVBaseline = saveCWVBaseline;
  w.compareCWV = compareCWV;
}