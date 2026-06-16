import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";
import { initWebVitals } from "./lib/webVitals";
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
    runWhenIdle(() => {
      initMonitoring().catch(console.error);
      initWebVitals();
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
