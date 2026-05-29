import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";
import { initWebVitals } from "./lib/webVitals";

// Initialize non-critical tracking after the initial render to avoid blocking the main thread
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
  
  // Use requestIdleCallback or setTimeout to defer non-essential initialization
  const deferInit = () => {
    initMonitoring();
    initWebVitals();
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(deferInit);
  } else {
    setTimeout(deferInit, 1);
  }
}


