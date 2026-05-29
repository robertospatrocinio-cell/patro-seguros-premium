import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";
import { initWebVitals } from "./lib/webVitals";
import PageSkeleton from "./components/PageSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <Suspense fallback={<PageSkeleton />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  );
  
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
  const errorMsg = "Critical Error: Root element not found";
  console.error(errorMsg);
  const fallback = document.createElement("div");
  fallback.style.padding = "20px";
  fallback.style.textAlign = "center";
  fallback.innerHTML = `<h1>Erro Crítico</h1><p>${errorMsg}</p><button onclick="location.reload()">Recarregar Página</button>`;
  document.body.appendChild(fallback);
}
