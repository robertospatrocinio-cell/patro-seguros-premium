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
  if (!dsn) return;

  const Sentry = await getSentry();
  if (!Sentry) return;

  Sentry.init({
    dsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 0.2, // Reduced from 1.0 to save resources
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
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