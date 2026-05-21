import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";
import { initWebVitals } from "./lib/webVitals";

initMonitoring();
initWebVitals();

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}


