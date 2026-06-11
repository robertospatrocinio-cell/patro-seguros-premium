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
    const deferInit = () => {
      initMonitoring().catch(console.error);
      initWebVitals();
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(deferInit);
    } else {
      setTimeout(deferInit, 1);
    }

    // Smooth transition: hide loader instead of immediate removal
    const loader = document.getElementById("initial-loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 300);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageSkeleton />}>
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
