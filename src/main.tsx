import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import "./index.css";
import "@fontsource/urbanist/400.css";
import "@fontsource/urbanist/600.css";
import "@fontsource/urbanist/700.css";
import "@fontsource/urbanist/800.css";
import "@fontsource/epilogue/400.css";
import "@fontsource/epilogue/500.css";
import "@fontsource/epilogue/600.css";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App.tsx";

const runWhenIdle = (callback: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout: 3000 });
    return;
  }
  globalThis.setTimeout(callback, 1200);
};

const Main = () => {
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Não marcamos "loaded" no simples mount: o chunk lazy da rota pode ainda
    // estar baixando. A remoção do loader ocorre quando existe um <main>
    // (conteúdo real ou skeleton do Suspense) — ver index.html.
    if (document.getElementById("root")?.querySelector("main")) {
      document.body.classList.add("loaded");
    }
    window.dispatchEvent(new Event("patro:app-mounted"));

    runWhenIdle(() => {
      Promise.all([
        import("./lib/monitoring"),
        import("./lib/webVitals"),
      ])
        .then(([monitoring, webVitals]) => {
          monitoring.initMonitoring().catch(console.error);
          webVitals.initWebVitals();
        })
        .catch(console.error);
    });
  }, []);

  const handleReset = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <ErrorBoundary key={retryCount} onReset={handleReset}>
      <App />
    </ErrorBoundary>
  );
};

const rootElement = document.getElementById("root");

/**
 * O conteúdo pré-renderizado (build time) vive dentro de #root. Ao chamar
 * createRoot().render(), o React limpa esse conteúdo e, enquanto o chunk da
 * rota (lazy) não resolve, a página fica visualmente vazia (só o skip link).
 * Para evitar esse "flash" sem conteúdo, movemos o HTML pré-renderizado para
 * um shell irmão que só é removido quando o app realmente pintou um <main>
 * dentro de #root (nunca apenas por children.length > 0).
 */
const preservePrerenderedContent = (root: HTMLElement) => {
  if (root.getAttribute("data-prerender-seo") !== "1" || root.childElementCount === 0) return;

  // Se o conteúdo pré-renderizado não tem nada visível (ex.: apenas o bloco
  // SEO `#crawler-content` com display:none), esconder #root só produziria
  // tela branca até o chunk da rota chegar. Nesse caso mantemos #root visível
  // para o skeleton do Suspense pintar imediatamente.
  const hasVisibleContent = Array.from(root.children).some((el) => {
    if (el.id === "crawler-content") return false;
    const style = window.getComputedStyle(el as HTMLElement);
    if (style.display === "none" || style.visibility === "hidden") return false;
    return (el as HTMLElement).offsetHeight > 0 || el.querySelector("main") !== null;
  });
  if (!hasVisibleContent) return;

  const shell = document.createElement("div");
  shell.id = "prerender-shell";
  shell.setAttribute("data-prerender-shell", "1");
  while (root.firstChild) shell.appendChild(root.firstChild);
  root.parentNode?.insertBefore(shell, root);
  root.style.visibility = "hidden";

  let done = false;
  const reveal = () => {
    if (done) return;
    done = true;
    root.style.visibility = "";
    shell.remove();
  };

  const check = () => {
    if (done) return;
    if (root.querySelector("main")) {
      // Deixa o browser pintar o conteúdo real antes de remover o shell.
      requestAnimationFrame(() => requestAnimationFrame(reveal));
      return;
    }
    requestAnimationFrame(check);
  };
  requestAnimationFrame(check);

  // Rede de segurança: nunca manter #root oculto indefinidamente.
  window.setTimeout(reveal, 6000);
};

if (rootElement) {
  preservePrerenderedContent(rootElement);
  const root = createRoot(rootElement);
  root.render(<Main />);
} else {
  console.error("Critical Error: Root element not found");
}
