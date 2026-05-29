import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";
import { initWebVitals } from "./lib/webVitals";
import PageSkeleton from "./components/PageSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";

console.log("Main module starting...");

const rootElement = document.getElementById("root");

if (rootElement) {
  console.log("Root element found, rendering...");
  const root = createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <Suspense fallback={<PageSkeleton />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  );
  
  const deferInit = () => {
    console.log("Initializing monitoring and web vitals...");
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
