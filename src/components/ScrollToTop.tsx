import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Região aria-live única, criada preguiçosamente, usada para anunciar
 * ao leitor de tela qual seção acabou de receber foco após a
 * navegação por âncora profunda.
 */
const LIVE_REGION_ID = "sr-anchor-announcer";
const ensureLiveRegion = (): HTMLElement => {
  let region = document.getElementById(LIVE_REGION_ID);
  if (region) return region;
  region = document.createElement("div");
  region.id = LIVE_REGION_ID;
  region.setAttribute("role", "status");
  region.setAttribute("aria-live", "polite");
  region.setAttribute("aria-atomic", "true");
  // Visualmente escondido mas exposto para AT (padrão sr-only)
  region.style.cssText =
    "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";
  document.body.appendChild(region);
  return region;
};

const announce = (message: string) => {
  if (!message) return;
  const region = ensureLiveRegion();
  // Limpa e reescreve para forçar releitura mesmo em textos repetidos.
  region.textContent = "";
  window.setTimeout(() => {
    region.textContent = message;
  }, 50);
};

/**
 * Dado o elemento alvo da âncora, devolve o heading (h1..h6) que
 * deve receber o foco do teclado — priorizando o próprio heading,
 * depois o heading referenciado por aria-labelledby, e por fim o
 * primeiro heading dentro do container.
 */
const resolveHeadingTarget = (el: HTMLElement): HTMLElement => {
  if (/^H[1-6]$/.test(el.tagName)) return el;
  const labelledBy = el.getAttribute("aria-labelledby");
  if (labelledBy) {
    const referenced = document.getElementById(labelledBy);
    if (referenced) return referenced;
  }
  const inner = el.querySelector<HTMLElement>("h1, h2, h3, h4, h5, h6");
  return inner || el;
};

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
        // 1. Rola até o container da seção para preservar o contexto visual.
        el.scrollIntoView({ behavior, block: "start" });
        // 2. Move o foco do teclado ao heading real da seção, para que o
        //    leitor de tela anuncie "Título da seção, nível 2".
        const heading = resolveHeadingTarget(el);
        if (!heading.hasAttribute("tabindex")) {
          heading.setAttribute("tabindex", "-1");
        }
        // Anuncia via live region antes do focus() para que NVDA/VoiceOver
        // não engulam a mudança de foco simultânea.
        const label = (heading.textContent || "").trim().replace(/\s+/g, " ");
        if (label) announce(`Seção: ${label}`);
        heading.focus({ preventScroll: true });
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
