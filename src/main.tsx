import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

// Initialize performance monitoring utilities lazily to keep the main thread clear
// during the critical hydration phase.
if ("requestIdleCallback" in window) {
  window.requestIdleCallback(async () => {
    const { initMonitoring } = await import("./lib/monitoring");
    const { initWebVitals } = await import("./lib/webVitals");
    
    initMonitoring();
    initWebVitals();
  });
} else {
  setTimeout(async () => {
    const { initMonitoring } = await import("./lib/monitoring");
    const { initWebVitals } = await import("./lib/webVitals");
    
    initMonitoring();
    initWebVitals();
  }, 2000);
}

// Register service worker for route-based caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
