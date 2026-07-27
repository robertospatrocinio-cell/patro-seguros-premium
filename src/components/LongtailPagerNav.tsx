import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getLongtailPager } from "@/lib/longtailClusters";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { trackInternalLinkClick, buildInternalLinkSource } from "@/lib/tracking";

interface LongtailPagerNavProps {
  /** Path canônico da rota atual (ex.: `/valor-seguro-byd-dolphin`). */
  pathname: string;
}

/**
 * Navegação Prev/Next entre páginas long-tail do mesmo cluster.
 *
 *  - Renderiza dois cards (Anterior/Próximo) com título + hint da página irmã.
 *  - Emite `<link rel="prev">` e `<link rel="next">` no head para reforçar
 *    a sequência semântica ao Google.
 *  - Rastreia cliques como `internal_link_click` com placement dedicado
 *    (`cluster-pager-prev` / `cluster-pager-next`) para o painel
 *    `/admin/links-internos` medir o efeito no tempo de permanência.
 *
 * Renderiza `null` fora dos clusters mapeados em `LONGTAIL_PAGER`.
 */
const LongtailPagerNav = ({ pathname }: LongtailPagerNavProps) => {
  const pager = getLongtailPager(pathname);
  if (!pager) return null;
  const { prev, next, current, position, total } = pager;
  if (!prev && !next) return null;

  const sourceSlug = current.slug.replace(/^\/+/, "") || "home";
  const source = buildInternalLinkSource("landing", sourceSlug);

  const handleClick = (
    direction: "prev" | "next",
    destination: string,
    label: string,
  ) =>
    trackInternalLinkClick({
      source,
      destination,
      label,
      placement: direction === "prev" ? "cluster-pager-prev" : "cluster-pager-next",
    });

  return (
    <>
      <Helmet>
        {prev && <link rel="prev" href={`${CANONICAL_BASE_URL}${prev.slug}`} />}
        {next && <link rel="next" href={`${CANONICAL_BASE_URL}${next.slug}`} />}
      </Helmet>
      <nav
        className="border-t border-border/60 bg-muted/30 py-10"
        aria-label={`Navegação entre páginas do cluster (${position} de ${total})`}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-4 text-center">
            Continue a leitura em série · {position} de {total}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {prev ? (
              <Link
                to={prev.slug}
                rel="prev"
                onClick={() => handleClick("prev", prev.slug, prev.label)}
                className="group flex flex-col rounded-lg border border-border bg-background p-5 transition hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-left"
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Anterior
                </span>
                <span className="mt-2 text-base font-semibold text-foreground group-hover:text-primary">
                  {prev.label}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">{prev.hint}</span>
              </Link>
            ) : (
              <div aria-hidden="true" className="hidden md:block" />
            )}
            {next ? (
              <Link
                to={next.slug}
                rel="next"
                onClick={() => handleClick("next", next.slug, next.label)}
                className="group flex flex-col rounded-lg border border-border bg-background p-5 transition hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-right md:items-end"
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Próximo
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="mt-2 text-base font-semibold text-foreground group-hover:text-primary">
                  {next.label}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">{next.hint}</span>
              </Link>
            ) : (
              <div aria-hidden="true" className="hidden md:block" />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default LongtailPagerNav;