import * as Sentry from "@sentry/react";

export const initMonitoring = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (dsn) {
    Sentry.init({
      dsn,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, 
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      environment: import.meta.env.MODE,
    });
  } else {
    console.warn("Sentry DSN not found. Error monitoring is disabled.");
  }
};

export const captureException = (error: any, context?: any) => {
  console.error("Capturing exception:", error, context);
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureException(error, { extra: context });
  }
};

export const setUserContext = (user: { id?: string; email?: string; username?: string }) => {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.setUser(user);
  }
};