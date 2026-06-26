import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import "./index.css";
import "@fontsource/urbanist/400.css";
import "@fontsource/urbanist/600.css";
import "@fontsource/urbanist/700.css";
import "@fontsource/urbanist/800.css";
import "@fontsource/epilogue/400.css";
import "@fontsource/epilogue/500.css";
import "@fontsource/epilogue/600.css";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App.tsx";

const runWhenIdle = (callback: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout: 3000 });
    return;
  }
  globalThis.setTimeout(callback, 1200);
};

const Main = () => {
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    document.body.classList.add("loaded");
    window.dispatchEvent(new Event("patro:app-mounted"));

    runWhenIdle(() => {
      Promise.all([
        import("./lib/monitoring"),
        import("./lib/webVitals"),
      ])
        .then(([monitoring, webVitals]) => {
          monitoring.initMonitoring().catch(console.error);
          webVitals.initWebVitals();
        })
        .catch(console.error);
    });
  }, []);

  const handleReset = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <ErrorBoundary key={retryCount} onReset={handleReset}>
      <App />
    </ErrorBoundary>
  );
};

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Main />);
} else {
  console.error("Critical Error: Root element not found");
}
