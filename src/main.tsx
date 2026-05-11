/**
 * Ponto de entrada da aplicação.
 * Inicializa o React, importa estilos globais e registra o Service Worker para suporte a PWA e Cache.
 */
 import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initWebVitals } from "./lib/webVitals";

createRoot(document.getElementById("root")!).render(<App />);

// Initialize Core Web Vitals monitoring
initWebVitals();

// Register service worker for route-based caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
