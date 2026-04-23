import { onLCP, onCLS, onINP, type Metric } from 'web-vitals';

const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  CLS: { good: 0.1, poor: 0.25 },
  INP: { good: 200, poor: 500 },
};

type VitalName = keyof typeof THRESHOLDS;

function getRating(name: VitalName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const t = THRESHOLDS[name];
  if (value <= t.good) return 'good';
  if (value <= t.poor) return 'needs-improvement';
  return 'poor';
}

function handleMetric(metric: Metric) {
  const name = metric.name as VitalName;
  const value = metric.value;
  const rating = getRating(name, value);

  // Send to GA4
  window.gtag?.('event', 'web_vitals', {
    event_category: 'Web Vitals',
    event_label: name,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    metric_id: metric.id,
    metric_rating: rating,
    non_interaction: true,
  });

  // Console alert for poor metrics in dev
  if (import.meta.env.DEV && rating === 'poor') {
    console.warn(
      `⚠️ Core Web Vital "${name}" is POOR: ${name === 'CLS' ? value.toFixed(3) : Math.round(value) + 'ms'}`,
    );
  }

  // Beacon fallback for production monitoring
  if (import.meta.env.PROD && navigator.sendBeacon) {
    const payload = JSON.stringify({
      name,
      value,
      rating,
      id: metric.id,
      page: window.location.pathname,
      timestamp: Date.now(),
    });

    // Store locally for aggregation
    try {
      const key = 'cwv_log';
      const existing = JSON.parse(sessionStorage.getItem(key) || '[]');
      existing.push(JSON.parse(payload));
      // Keep max 50 entries per session
      if (existing.length > 50) existing.shift();
      sessionStorage.setItem(key, JSON.stringify(existing));
    } catch {
      // sessionStorage full or unavailable
    }
  }
}

export function initWebVitals() {
  onLCP(handleMetric);
  onCLS(handleMetric);
  onINP(handleMetric);
}