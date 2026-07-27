import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = prefersReduced ? "auto" : "smooth";

    if (hash) {
      // Deep-anchor navigation (e.g. cluster links to /rota#preco-heading).
      // Wait for the destination route to render, then scroll to the element.
      const id = hash.replace(/^#/, "");
      const scrollToAnchor = (attempt = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior, block: "start" });
          // Move focus for a11y without changing scroll again.
          const previousTabIndex = el.getAttribute("tabindex");
          if (previousTabIndex === null) el.setAttribute("tabindex", "-1");
          (el as HTMLElement).focus({ preventScroll: true });
          return;
        }
        if (attempt < 20) window.setTimeout(() => scrollToAnchor(attempt + 1), 50);
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
