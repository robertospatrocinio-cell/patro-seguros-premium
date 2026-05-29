import { createRoot } from "react-dom/client";
import { Suspense, useEffect } from "react";
import App from "./App.tsx";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";
import { initWebVitals } from "./lib/webVitals";
import PageSkeleton from "./components/PageSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";

console.log("main.tsx script execution started");

const Main = () => {
  useEffect(() => {
    console.log("React application mounted");
    const deferInit = () => {
      initMonitoring();
      initWebVitals();
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(deferInit);
    } else {
      setTimeout(deferInit, 1);
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
  console.log("Root element found, creating root");
  const root = createRoot(rootElement);
  root.render(<Main />);
} else {
  console.error("Critical Error: Root element not found");
}
