import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import "./index.css";
// Urbanist/Epilogue são usadas apenas em src/pages/Patro.tsx — os @font-face
// foram movidos para lá para não pesar no CSS crítico de todas as páginas.
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
 * um shell irmão que só é removido quando a rota monta um <main> sem
 * aria-busy="true" dentro de #root, preservando a página durante o skeleton.
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
  const initialRootStyle = root.style.cssText;
  // O shell já ocupa o espaço da página. Mantemos a nova raiz mensurável,
  // mas fora do fluxo para não somar duas alturas enquanto a rota carrega.
  root.style.visibility = "hidden";
  root.style.position = "absolute";
  root.style.top = "0";
  root.style.width = "100%";

  let done = false;
  let frame = 0;
  let revealScheduled = false;
  let safetyTimer = 0;
  const reveal = () => {
    if (done) return;
    done = true;
    observer.disconnect();
    cancelAnimationFrame(frame);
    window.clearTimeout(safetyTimer);
    root.style.cssText = initialRootStyle;
    shell.remove();
  };

  const check = () => {
    // Não trocar a página já visível pelo esqueleto temporário da rota.
    if (done || revealScheduled || !root.querySelector('main:not([aria-busy="true"])')) return;
    revealScheduled = true;
    observer.disconnect();
    // Mantém a troca após a pintura, sem consultar o DOM a cada frame
    // enquanto o navegador ainda está baixando o chunk da rota.
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(reveal);
    });
  };
  const observer = new MutationObserver(check);
  observer.observe(root, { childList: true, subtree: true });

  // Rede de segurança: nunca manter #root oculto indefinidamente.
  safetyTimer = window.setTimeout(reveal, 6000);
  check();
};

if (rootElement) {
  // Um único observador delegado para formulários públicos e links de telefone.
  import("./lib/tracking")
    .then(({ initCommercialInteractions }) => initCommercialInteractions())
    .catch(console.error);
  preservePrerenderedContent(rootElement);
  const root = createRoot(rootElement);
  root.render(<Main />);
} else {
  console.error("Critical Error: Root element not found");
}
