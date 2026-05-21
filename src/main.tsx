import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

// Initialize performance monitoring utilities lazily to keep the main thread clear
// during the critical hydration phase.
const initPerf = async () => {
  try {
    const { initMonitoring } = await import("./lib/monitoring");
    const { initWebVitals } = await import("./lib/webVitals");
    
    await initMonitoring();
    initWebVitals();
  } catch (error) {
    console.error("Failed to initialize monitoring:", error);
  }
};

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(initPerf);
} else {
  setTimeout(initPerf, 2000);
}

