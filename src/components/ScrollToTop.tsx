import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Encontra a âncora "mais próxima" quando o id exato não existe na página.
 * Ordem de preferência:
 *   1. id com mesmo token base (ex.: "preco-heading" → "preco" | "precos" | "preco-hero-heading")
 *   2. heading (h1/h2/h3) cujo texto contém o token
 *   3. null → chamador faz fallback para topo
 */
const findNearestAnchor = (missingId: string): HTMLElement | null => {
  const base = missingId.replace(/-heading$/i, "").toLowerCase();
  if (!base) return null;

  const ids = Array.from(document.querySelectorAll<HTMLElement>("[id]"));

  // 1. Match direto por token base
  const tokenMatch = ids.find((el) => {
    const id = el.id.toLowerCase();
    return (
      id === base ||
      id === `${base}-heading` ||
      id.startsWith(`${base}-`) ||
      id.endsWith(`-${base}`) ||
      id.includes(`-${base}-`)
    );
  });
  if (tokenMatch) return tokenMatch;

  // 2. Heading cujo texto contém a palavra
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id]"),
  );
  const textMatch = headings.find((h) =>
    (h.textContent || "").toLowerCase().includes(base),
  );
  return textMatch || null;
};

const reportFallback = (missingId: string, resolvedId: string | null) => {
  try {
    window.gtag?.("event", "anchor_fallback", {
      event_category: "navigation",
      missing_anchor: missingId,
      resolved_anchor: resolvedId || "top",
      page_path: window.location.pathname,
    });
  } catch {
    /* analytics indisponível — segue silencioso */
  }
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = prefersReduced ? "auto" : "smooth";

    if (hash) {
      // Deep-anchor navigation (e.g. cluster links to /rota#preco-heading).
      // Wait for the destination route to render, then scroll to the element.
      const id = hash.replace(/^#/, "");
      const focusEl = (el: HTMLElement) => {
        el.scrollIntoView({ behavior, block: "start" });
        const previousTabIndex = el.getAttribute("tabindex");
        if (previousTabIndex === null) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      };
      const scrollToAnchor = (attempt = 0) => {
        const el = document.getElementById(id);
        if (el) {
          focusEl(el);
          return;
        }
        if (attempt < 20) {
          window.setTimeout(() => scrollToAnchor(attempt + 1), 50);
          return;
        }
        // Fallback: âncora não existe → tenta seção mais próxima, ou topo.
        const nearest = findNearestAnchor(id);
        if (nearest) {
          reportFallback(id, nearest.id);
          focusEl(nearest);
          // Sincroniza a URL para refletir o destino real (sem novo history entry)
          try {
            history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${nearest.id}`);
          } catch { /* noop */ }
        } else {
          reportFallback(id, null);
          window.scrollTo({ top: 0, behavior });
          const mainContent = document.getElementById("main-content");
          mainContent?.focus();
        }
      };
      scrollToAnchor();
      return;
    }

    window.scrollTo(0, 0);
    // Move focus to main-content when navigating to a new page
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
