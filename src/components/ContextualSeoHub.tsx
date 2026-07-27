import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import TrilhaSeoRelacionados from "@/components/TrilhaSeoRelacionados";
import { resolveHubForPath, buildHubContextualItems } from "@/lib/seoHubResolver";

interface ContextualSeoHubProps {
  /** Rota atual — quando omitido usa `useLocation()`. Necessário no prerender. */
  pathname?: string;
  /** Máximo de cards renderizados. Default: 6. */
  limit?: number;
  /** Título custom. Default: "Continue explorando o hub". */
  title?: string;
}

/**
 * Injeta uma trilha de links contextuais baseada no hub SEO que
 * casa com a rota atual. Silencioso quando a rota não pertence a
 * nenhum cluster — não polui páginas fora de escopo.
 */
export const ContextualSeoHub = ({ pathname, limit = 6, title }: ContextualSeoHubProps) => {
  const location = useLocation();
  const path = pathname ?? location.pathname;

  const { hub, items } = useMemo(() => {
    const h = resolveHubForPath(path);
    if (!h) return { hub: null, items: [] };
    return { hub: h, items: buildHubContextualItems(h, path, limit) };
  }, [path, limit]);

  if (!hub || items.length === 0) return null;

  return (
    <TrilhaSeoRelacionados
      title={title ?? `Continue explorando: ${hub.name}`}
      subtitle={hub.ctaSubtitle}
      items={items}
      headingId={`seo-hub-${hub.slug}`}
    />
  );
};

export default ContextualSeoHub;