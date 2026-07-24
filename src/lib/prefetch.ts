/**
 * prefetch.ts — warm-up de chunks lazy sem custo de TBT.
 *
 * Estratégias:
 *  - prefetchOnIdle(loader): dispara o import() dentro de requestIdleCallback
 *    (fallback: setTimeout). Só roda quando a main thread está ociosa, então
 *    não conta para TBT / não briga com o hero.
 *  - prefetchOnVisible(el, loader, {rootMargin}): usa IntersectionObserver
 *    com margem generosa (default 800px) para começar a baixar o chunk
 *    ANTES do usuário chegar à seção — o LazySection resolve o Suspense
 *    instantaneamente quando entra em cena.
 *  - prefetchOnInteraction(el, loader): pointerenter/focus/touchstart para
 *    warm-up em <a>/<button>. Usado por links de rota.
 *
 * Deduplica: cada loader é executado no máximo uma vez.
 */

type Loader = () => Promise<unknown>;

const started = new WeakSet<Loader>();

function once(loader: Loader): Promise<unknown> | void {
  if (started.has(loader)) return;
  started.add(loader);
  try {
    return loader().catch(() => {
      // Falha de rede: libera para nova tentativa
      started.delete(loader);
    });
  } catch {
    started.delete(loader);
  }
}

function schedule(cb: () => void, timeout = 2000) {
  if (typeof window === "undefined") return;
  const ric = (window as any).requestIdleCallback as
    | ((cb: () => void, opts?: { timeout: number }) => number)
    | undefined;
  if (ric) ric(cb, { timeout });
  else setTimeout(cb, 200);
}

/**
 * scheduleIdle — expõe o `schedule` interno para outros módulos poderem
 * adiar trabalho não-crítico (auth warm-up, checagem de sessões salvas,
 * banner de cookies) para depois do LCP, sem inflar o TBT.
 */
export function scheduleIdle(cb: () => void, timeout = 2000): void {
  schedule(cb, timeout);
}

export function prefetchOnIdle(loader: Loader, timeout = 2000): void {
  schedule(() => once(loader), timeout);
}

export function prefetchOnIdleAll(loaders: Loader[], timeout = 2000): void {
  loaders.forEach((l) => prefetchOnIdle(l, timeout));
}

export function prefetchOnVisible(
  el: Element | null,
  loader: Loader,
  opts: { rootMargin?: string } = {},
): (() => void) | void {
  if (!el || typeof window === "undefined" || !("IntersectionObserver" in window)) return;
  const obs = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        once(loader);
        obs.disconnect();
      }
    },
    { rootMargin: opts.rootMargin ?? "800px" },
  );
  obs.observe(el);
  return () => obs.disconnect();
}

export function prefetchOnInteraction(
  el: Element | null,
  loader: Loader,
): (() => void) | void {
  if (!el) return;
  const fire = () => once(loader);
  const events: Array<keyof HTMLElementEventMap> = [
    "pointerenter",
    "focus",
    "touchstart",
  ];
  events.forEach((ev) => el.addEventListener(ev, fire, { once: true, passive: true } as any));
  return () => events.forEach((ev) => el.removeEventListener(ev, fire as any));
}