import { createRoot } from "react-dom/client";
import { Suspense, useEffect, lazy } from "react";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";
import { initWebVitals } from "./lib/webVitals";
import PageSkeleton from "./components/PageSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";

const App = lazy(() => import("./App.tsx"));

// Critical resources are already preloaded in index.html for maximum performance

const Main = () => {
  useEffect(() => {
    // Signal that the app is ready to remove the initial loader
    if (typeof window !== "undefined" && (window as any).onAppReady) {
      (window as any).onAppReady();
    }

    // Initial monitoring can be deferred slightly more
    const deferInit = () => {
      initMonitoring().catch(console.error);
      initWebVitals();
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(deferInit, { timeout: 2000 });
    } else {
      setTimeout(deferInit, 1000);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={null}>
        <App />
      </Suspense>
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
