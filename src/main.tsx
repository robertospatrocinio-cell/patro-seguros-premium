import { createRoot } from "react-dom/client";
import { Suspense, useEffect, lazy } from "react";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";
import { initWebVitals } from "./lib/webVitals";
import PageSkeleton from "./components/PageSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";

const App = lazy(() => import("./App.tsx"));

const Main = () => {
  useEffect(() => {
    initMonitoring().catch(console.error);
    initWebVitals();
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
