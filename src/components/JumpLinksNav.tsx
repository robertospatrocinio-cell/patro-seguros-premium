import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  buildInternalLinkSource,
  trackInternalLinkClick,
  trackSectionView,
} from "@/lib/tracking";

type JumpLink = { label: string; href: string };

interface JumpLinksNavProps {
  links: JumpLink[];
}

/**
 * Sticky in-page navigation with smooth scroll and active-section highlight
 * driven by IntersectionObserver. Respects `prefers-reduced-motion`.
 */
const JumpLinksNav = ({ links }: JumpLinksNavProps) => {
  const getId = (href: string) => (href.startsWith("#") ? href.slice(1) : href);

  const storageKey =
    typeof window !== "undefined"
      ? `patro:jumplink:${window.location.pathname.replace(/\/$/, "") || "/"}`
      : "patro:jumplink";

  // Hydrate from URL hash (deep link) or sessionStorage so the pill stays
  // highlighted when the user comes back to the page or lands via anchor.
  const [activeId, setActiveId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const ids = links.map((l) => getId(l.href));
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && ids.includes(hash)) return hash;
    try {
      const stored = window.sessionStorage.getItem(storageKey);
      if (stored && ids.includes(stored)) return stored;
    } catch {
      /* sessionStorage unavailable */
    }
    return null;
  });

  // Lock observer updates for a short window after a click, so smooth-scroll
  // through intermediate sections doesn't flicker the active pill.
  const lockUntilRef = useRef<number>(0);
  const navRef = useRef<HTMLElement | null>(null);
  const pillRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Persist the active pill so orientation survives re-renders and returns.
  useEffect(() => {
    if (typeof window === "undefined" || !activeId) return;
    try {
      window.sessionStorage.setItem(storageKey, activeId);
    } catch {
      /* ignore */
    }
  }, [activeId, storageKey]);

  // Keep the active pill in view inside the horizontal nav on mobile.
  useEffect(() => {
    if (!activeId) return;
    const el = pillRefs.current.get(activeId);
    if (el?.scrollIntoView) {
      el.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
  }, [activeId]);

  // Sync the URL hash with the currently active section as the user scrolls,
  // without triggering the browser's default anchor jump. Uses replaceState
  // so back/forward history stays clean, and debounces to avoid churn during
  // fast scrolling. Sharing the URL now reflects the section in view.
  useEffect(() => {
    if (typeof window === "undefined" || !activeId) return;
    const current = window.location.hash.replace(/^#/, "");
    if (current === activeId) return;
    const timer = window.setTimeout(() => {
      try {
        // Preserve pathname + search; only swap the hash. Using a full URL
        // with replaceState avoids the implicit scroll-into-view that a bare
        // `location.hash = ...` assignment would cause.
        const url = `${window.location.pathname}${window.location.search}#${activeId}`;
        window.history.replaceState(window.history.state, "", url);
      } catch {
        /* ignore */
      }
    }, 120);
    return () => window.clearTimeout(timer);
  }, [activeId]);

  // Reflect back/forward hash changes in the active pill so browser
  // navigation stays in sync with the visible section.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = new Set(links.map((l) => getId(l.href)));
    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && ids.has(hash)) {
        lockUntilRef.current = performance.now() + 600;
        setActiveId(hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [links]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = links.map((l) => getId(l.href)).filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const labelById = new Map(links.map((l) => [getId(l.href), l.label] as const));

    const observer = new IntersectionObserver(
      (entries) => {
        if (performance.now() < lockUntilRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.id;
          setActiveId(id);
          // Registra `section_view` uma única vez por (page, anchor) na
          // sessão — permite correlacionar CLIQUE em jump-link com
          // LEITURA real da seção no painel Admin. Só conta quando a
          // seção está de fato visível ≥ 25% (rating estável no
          // rootMargin abaixo).
          if (visible[0].intersectionRatio >= 0.25) {
            trackSectionView(id, labelById.get(id));
          }
        }
      },
      {
        // Trigger when section is near the top of the viewport (below sticky bar)
        rootMargin: "-120px 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [links]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
      const id = getId(href);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      // Drilldown por âncora: cada pill clicada é rastreada como
      // internal_link_click com `placement=jump-links` e `anchor=<id>`,
      // alimentando o painel Admin `Links Internos × GSC`.
      const pagePath =
        typeof window !== "undefined"
          ? window.location.pathname.replace(/\/$/, "") || "/"
          : "/";
      const slug = pagePath === "/" ? "home" : pagePath.slice(1);
      trackInternalLinkClick({
        source: buildInternalLinkSource("landing", slug),
        destination: `${pagePath}#${id}`,
        label,
        placement: "jump-links",
        anchor: id,
      });
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - 96;
      window.scrollTo({
        top,
        behavior: prefersReduced ? "auto" : "smooth",
      });
      setActiveId(id);
      // Prevent the observer from overriding the user's explicit choice while
      // smooth-scrolling through the sections above the target.
      lockUntilRef.current = performance.now() + (prefersReduced ? 0 : 900);
      // Update URL hash without jumping
      if (history.replaceState) {
        history.replaceState(null, "", `#${id}`);
      }
      // Move focus for a11y after scroll settles
      window.setTimeout(() => {
        target.setAttribute("tabindex", "-1");
        (target as HTMLElement).focus({ preventScroll: true });
      }, prefersReduced ? 0 : 400);
    },
    []
  );

  return (
    <nav
      aria-label="Ir para a seção"
      ref={navRef}
      className="sticky top-16 z-30 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
    >
      <div className="container mx-auto px-4 py-3 flex flex-nowrap md:flex-wrap gap-2 text-sm overflow-x-auto md:overflow-visible scroll-smooth">
        <span className="text-muted-foreground mr-1 py-1">Nesta página:</span>
        {links.map((l) => {
          const id = getId(l.href);
          const isActive = activeId === id;
          return (
            <a
              key={l.href}
              href={l.href}
              ref={(el) => {
                if (el) pillRefs.current.set(id, el);
                else pillRefs.current.delete(id);
              }}
              onClick={(e) => handleClick(e, l.href, l.label)}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "inline-flex shrink-0 items-center rounded-full border px-3 py-1 transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm font-medium ring-2 ring-primary/25 ring-offset-2 ring-offset-background"
                  : "border-border bg-background text-foreground/80 hover:text-primary hover:border-primary/60"
              )}
            >
              {l.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default JumpLinksNav;