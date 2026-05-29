/**
 * Sentry is loaded lazily to reduce initial bundle size and main-thread work.
 * The SDK is only initialized if VITE_SENTRY_DSN is present.
 */
let sentryInstance: typeof import("@sentry/react") | null = null;

async function getSentry() {
  if (sentryInstance) return sentryInstance;
  if (!import.meta.env.VITE_SENTRY_DSN) return null;
  
  sentryInstance = await import("@sentry/react");
  return sentryInstance;
}

export const initMonitoring = async () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  // Register global error handlers even without Sentry for local logging and reporting
  if (typeof window !== "undefined") {
    window.onerror = (message, source, lineno, colno, error) => {
      captureException(error || message, { source, lineno, colno, type: 'window.onerror' });
    };

    window.onunhandledrejection = (event) => {
      captureException(event.reason, { type: 'unhandledrejection' });
    };
  }

  if (!dsn) {
    console.info("Monitoring: Sentry DSN not found. Basic global error handlers initialized.");
    return;
  }

  const Sentry = await getSentry();
  if (!Sentry) return;

  Sentry.init({
    dsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0.1, // Increased for better diagnostic coverage
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
    beforeSend(event, hint) {
      // Add more context to render failures
      if (hint.originalException && hint.originalException.toString().includes('render')) {
        event.level = 'fatal';
        event.tags = { ...event.tags, category: 'render_failure' };
      }
      return event;
    },
  });
};

export const captureException = async (error: any, context?: any) => {
  console.error("Error detected:", error, context);
  const Sentry = await getSentry();
  if (Sentry) {
    Sentry.captureException(error, { extra: context });
  }
};

export const setUserContext = async (user: { id?: string; email?: string; username?: string }) => {
  const Sentry = await getSentry();
  if (Sentry) {
    Sentry.setUser(user);
  }
};