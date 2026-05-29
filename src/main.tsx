import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";
import { initWebVitals } from "./lib/webVitals";
import PageSkeleton from "./components/PageSkeleton";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Suspense fallback={<PageSkeleton />}><App /></Suspense>);
  
  const deferInit = () => {
    initMonitoring();
    initWebVitals();
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(deferInit);
  } else {
    setTimeout(deferInit, 1);
  }
} else {
  console.error("Critical Error: Root element not found");
}
