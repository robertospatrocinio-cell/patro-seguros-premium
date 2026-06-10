import { createRoot } from "react-dom/client";
import { Suspense, useEffect, lazy } from "react";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";
import { initWebVitals } from "./lib/webVitals";
import PageSkeleton from "./components/PageSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";

const App = lazy(() => import("./App.tsx"));

const Main = () => {
  useEffect(() => {
    const deferInit = () => {
      initMonitoring().catch(console.error);
      initWebVitals();
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(deferInit);
    } else {
      setTimeout(deferInit, 1);
    }

    // Remove initial loader once React takes over
    const loader = document.getElementById("initial-loader");
    if (loader) {
      loader.remove();
    }
  }, []);

  return (
    <ErrorBoundary>
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
