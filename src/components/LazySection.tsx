import { useState, useRef, useEffect, ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { prefetchOnVisible } from "@/lib/prefetch";
import { getLazyMarginMultiplier } from "@/lib/monitoringSession";

interface LazySectionProps {
  children: ReactNode;
  /** Placeholder height to prevent CLS */
  minHeight?: string;
  /** How far before viewport to start rendering */
  rootMargin?: string;
  className?: string;
  /**
   * Loaders (`() => import("...")`) dos componentes lazy que esta seção
   * usa. O pré-carregamento começa por proximidade via IntersectionObserver,
   * antes da renderização. Seções distantes não baixam todos os chunks
   * apenas porque o navegador encontrou uma janela ociosa.
   */
  prefetch?: Array<() => Promise<unknown>>;
  /**
   * Margem extra para o prefetch por visibilidade. Default: 2× a margem
   * adaptada à conexão, sem impor 800px em redes com economia de dados.
   */
  prefetchRootMargin?: string;
}

const LazySection = ({
  children,
   minHeight = "200px",
   rootMargin = "600px",
   className = "",
   prefetch,
   prefetchRootMargin,
}: LazySectionProps) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Adaptive threshold: expand on fast connections (prefetch further out),
  // shrink on slow / Save-Data links to protect data + main-thread time.
  const baseMargin = parseInt(rootMargin, 10) || 600;
  const effectiveMarginPx = Math.round(baseMargin * getLazyMarginMultiplier());
  const effectiveMargin = `${effectiveMarginPx}px`;

  useEffect(() => {
    if (!ref.current) return;
    // Navegadores sem observer ainda precisam exibir o conteúdo.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: effectiveMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [effectiveMargin]);

  // Antecipa apenas as seções próximas, sem disputar banda com a rota atual.
  useEffect(() => {
    if (!prefetch || prefetch.length === 0 || !ref.current) return;
    const eagerMargin =
      prefetchRootMargin ?? `${effectiveMarginPx * 2}px`;
    const disposers = prefetch.map((l) =>
      prefetchOnVisible(ref.current, l, { rootMargin: eagerMargin }),
    );
    return () => disposers.forEach((d) => d && d());
  }, [prefetch, effectiveMarginPx, prefetchRootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        visible
          ? { contentVisibility: "auto", containIntrinsicSize: `1px ${minHeight}` } as any
          : { minHeight, contentVisibility: "auto", containIntrinsicSize: `1px ${minHeight}` } as any
      }
    >
      {visible ? children : (
        <div className="space-y-4 p-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      )}
    </div>
  );
};

export default LazySection;