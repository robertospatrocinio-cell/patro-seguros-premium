import { createRoot } from "react-dom/client";
import { Suspense, useEffect, lazy } from "react";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";
import { initWebVitals } from "./lib/webVitals";
import PageSkeleton from "./components/PageSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";

const App = lazy(() => import("./App.tsx"));

// Critical resources pre-warming
const prewarm = () => {
  const images = ['/images/logo-full.webp', '/images/hero-home.webp'];
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};
prewarm();

const Main = () => {
  useEffect(() => {
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

    // Loader removal logic removed for performance
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
