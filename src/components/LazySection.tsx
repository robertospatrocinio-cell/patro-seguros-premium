import { useState, useRef, useEffect, ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { prefetchOnIdle, prefetchOnVisible } from "@/lib/prefetch";
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
   * usa. Serão pré-carregados quando a main thread ficar ociosa E ainda
   * antecipados via IntersectionObserver (com margem maior que a de
   * renderização), garantindo que o chunk chegue antes do Suspense.
   * Não impacta TBT — roda em requestIdleCallback.
   */
  prefetch?: Array<() => Promise<unknown>>;
  /**
   * Margem extra para o prefetch por visibilidade. Default: 2× rootMargin
   * de renderização (mínimo 800px). Assim o download começa antes da
   * hidratação.
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

  // Prefetch em idle + antecipação por proximidade de scroll.
  useEffect(() => {
    if (!prefetch || prefetch.length === 0) return;
    // 1) Idle: puxa os chunks na primeira janela ociosa (sem custo de TBT).
    prefetch.forEach((l) => prefetchOnIdle(l));
    // 2) Visibilidade adiantada: se o usuário scrollar rápido, garante que
    // o download já começou antes do rootMargin de renderização.
    if (!ref.current) return;
    const eagerMargin =
      prefetchRootMargin ?? `${Math.max(effectiveMarginPx * 2, 800)}px`;
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