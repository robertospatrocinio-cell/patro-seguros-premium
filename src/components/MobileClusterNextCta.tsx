import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { getLongtailCluster } from "@/lib/longtailClusters";
import {
  buildInternalLinkSource,
  trackInternalLinkClick,
} from "@/lib/tracking";

/**
 * CTA flutuante — **exclusivo mobile** — que empurra o leitor para a
 * próxima seção relevante do cluster long-tail sem exigir scroll até
 * o rodapé (`ProximasLeiturasCluster`).
 *
 * Regras:
 *  - Só renderiza em rotas com cluster mapeado em `LONGTAIL_CLUSTERS`.
 *  - Aparece após 480px de scroll para não competir com o hero.
 *  - Some quando o bloco "Próximas leituras" entra na viewport (o
 *    usuário já chegou naturalmente na próxima etapa).
 *  - "Auto-avança": se a URL atual tem `#hash` que bate com o item i,
 *    o CTA sugere o item i+1. Caso contrário, sugere o item 0.
 *  - Dedupe: se o usuário fechar (X), respeita a decisão até nova
 *    navegação (dedupe por pathname em sessionStorage).
 *  - Não colide com o WhatsApp flutuante (bottom-right) — ancorado à
 *    esquerda no mobile e centralizado como pill em telas médias.
 */
const DISMISS_KEY = "patro_cluster_next_cta_dismissed";
const SCROLL_THRESHOLD_PX = 480;

const isDismissed = (pathname: string): boolean => {
  try {
    const raw = window.sessionStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    return JSON.parse(raw).includes(pathname);
  } catch {
    return false;
  }
};

const markDismissed = (pathname: string) => {
  try {
    const raw = window.sessionStorage.getItem(DISMISS_KEY);
    const list = raw ? (JSON.parse(raw) as string[]) : [];
    if (!list.includes(pathname)) list.push(pathname);
    window.sessionStorage.setItem(DISMISS_KEY, JSON.stringify(list));
  } catch {
    /* storage indisponível — ignora */
  }
};

const MobileClusterNextCta = () => {
  const { pathname, hash } = useLocation();
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const cluster = getLongtailCluster(normalized);

  const [scrolled, setScrolled] = useState(false);
  const [reachedFooter, setReachedFooter] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Reinicia estado ao mudar de rota.
  useEffect(() => {
    setDismissed(isDismissed(normalized));
    setReachedFooter(false);
    setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
  }, [normalized]);

  // Observa scroll para revelar o CTA após um umbral.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Some quando "Próximas leituras" (rodapé do cluster) entra em vista.
  useEffect(() => {
    const target = document.getElementById("proximas-leituras-heading");
    if (!target || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setReachedFooter(true);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, [normalized]);

  // Escolhe o próximo item relevante conforme a âncora atual.
  const nextItem = useMemo(() => {
    if (!cluster?.items?.length) return null;
    const currentHash = hash.replace(/^#/, "");
    if (currentHash) {
      const idx = cluster.items.findIndex((it) => it.href.endsWith(`#${currentHash}`));
      if (idx >= 0) return cluster.items[idx + 1] ?? cluster.items[0];
    }
    return cluster.items[0];
  }, [cluster, hash]);

  if (!cluster || !nextItem) return null;
  if (!scrolled || reachedFooter || dismissed) return null;

  const sourceSlug = normalized.replace(/^\/+/, "") || "home";
  const hashIndex = nextItem.href.indexOf("#");
  const anchor = hashIndex >= 0 ? nextItem.href.slice(hashIndex + 1) : null;

  return (
    <div
      className="md:hidden fixed left-3 right-3 z-40 pointer-events-none"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 88px)" }}
      role="complementary"
      aria-label="Próxima seção do cluster"
    >
      <div className="pointer-events-auto flex items-stretch gap-2 rounded-2xl border border-primary/20 bg-background/95 backdrop-blur-md shadow-[0_12px_32px_-8px_rgba(0,51,102,0.25)] pl-3 pr-1 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <Link
          to={nextItem.href}
          onClick={() =>
            trackInternalLinkClick({
              placement: "mobile-cluster-cta",
              source: buildInternalLinkSource("landing", sourceSlug),
              destination: nextItem.href,
              label: nextItem.title,
              anchor: anchor ?? undefined,
            })
          }
          className="flex-1 min-w-0 flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label={`Próxima seção: ${nextItem.title}`}
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
          >
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-primary/80">
              {nextItem.badge ? `Próximo · ${nextItem.badge}` : "Próxima seção"}
            </span>
            <span className="block truncate text-[13px] font-semibold text-foreground">
              {nextItem.title}
            </span>
          </span>
          <ArrowRight aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-primary" />
        </Link>
        <button
          type="button"
          onClick={() => {
            markDismissed(normalized);
            setDismissed(true);
          }}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Fechar sugestão de próxima seção"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default MobileClusterNextCta;