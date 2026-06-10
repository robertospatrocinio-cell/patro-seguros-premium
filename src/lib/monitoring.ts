/**
 * Monitoring module to capture and store errors for diagnostic purposes.
 */
let sentryInstance: typeof import("@sentry/react") | null = null;

// Memory storage for diagnostics
const MAX_LOGS = 50;
export const diagnosticLogs: {
  type: 'error' | 'network' | 'console';
  message: string;
  timestamp: string;
  details?: any;
}[] = [];

const addDiagnosticLog = (log: { type: 'error' | 'network' | 'console', message: string, timestamp: string, details?: any }) => {
  diagnosticLogs.unshift(log);
  if (diagnosticLogs.length > MAX_LOGS) {
    diagnosticLogs.pop();
  }
};

async function getSentry() {
  if (sentryInstance) return sentryInstance;
  if (!import.meta.env.VITE_SENTRY_DSN) return null;
  
  sentryInstance = await import("@sentry/react");
  return sentryInstance;
}

export const initMonitoring = async () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (typeof window !== "undefined") {
    // Intercept console errors
    const originalConsoleError = console.error;
    console.error = function(this: any, ...args: any[]) {
      const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      addDiagnosticLog({
        type: 'console',
        message,
        timestamp: new Date().toISOString(),
      });
      return originalConsoleError.apply(this, args);
    };

    // Intercept network failures if possible via fetch
    const originalFetch = window.fetch;
    window.fetch = async function(this: any, ...args: any[]) {
      try {
        const response = await originalFetch.apply(this, args);
        if (!response.ok) {
          addDiagnosticLog({
            type: 'network',
            message: `HTTP Error ${response.status}: ${args[0]}`,
            timestamp: new Date().toISOString(),
            details: { status: response.status, url: args[0] }
          });
        }
        return response;
      } catch (error: any) {
        addDiagnosticLog({
          type: 'network',
          message: `Network Failure: ${args[0]} - ${error.message}`,
          timestamp: new Date().toISOString(),
          details: { error: error.message, url: args[0] }
        });
        throw error;
      }
    };

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
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
    beforeSend(event, hint) {
      if (hint.originalException && hint.originalException.toString().includes('render')) {
        event.level = 'fatal';
        event.tags = { ...event.tags, category: 'render_failure' };
      }
      return event;
    },
  });
};

export const captureException = async (error: any, context?: any) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  addDiagnosticLog({
    type: 'error',
    message: errorMessage,
    timestamp: new Date().toISOString(),
    details: context
  });

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