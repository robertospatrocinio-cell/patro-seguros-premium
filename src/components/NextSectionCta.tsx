import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  buildInternalLinkSource,
  trackNextSectionCtaClick,
} from "@/lib/tracking";

export interface NextSectionCtaProps {
  /** Rótulo curto do botão (ex.: "Ver preço para Uber"). */
  label: string;
  /** Deep link — deve incluir a âncora (#preco-heading, #faq-heading, …). */
  href: string;
  /** Frase de apoio opcional que explica por que seguir agora. */
  description?: string;
  /**
   * Id da seção de origem (usado no tracking como `placement` para
   * correlacionar cliques com o painel Admin `Links Internos × GSC`).
   */
  sourceSection: string;
  /** Slug/título da página atual — vira `source` do tracking. */
  sourceSlug: string;
}

/**
 * CTA compacto ancorado ao final de uma seção. Empurra o leitor para a
 * próxima resposta relevante no cluster (mesma página ou página irmã),
 * usando âncoras profundas para eliminar o hero da próxima rota.
 *
 * Renderiza como <Link> do React Router para preservar navegação SPA;
 * o `<ScrollToTop>` global já trata `location.hash` (rola até o elemento
 * correto após a hidratação).
 */
const NextSectionCta = ({
  label,
  href,
  description,
  sourceSection,
  sourceSlug,
}: NextSectionCtaProps) => {
  // Extrai a âncora para o drilldown do painel de links internos.
  const anchor = href.includes("#") ? href.split("#").pop() ?? null : null;
  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <Link
        to={href}
        onClick={() =>
          trackNextSectionCtaClick("inline", {
            // "landing" é o surface canônico para páginas long-tail/produto;
            // a variant "inline" identifica o placement no painel.
            source: buildInternalLinkSource("landing", sourceSlug),
            destination: href,
            label: `${label} · from:${sourceSection}`,
            anchor,
          })
        }
        className="group flex items-center justify-between gap-4 rounded-xl border border-primary/15 bg-primary/[0.04] px-5 py-4 transition-all hover:border-primary/40 hover:bg-primary/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        aria-label={description ? `${label}: ${description}` : label}
      >
        <span className="flex-1">
          <span className="block text-[13px] uppercase tracking-wider text-primary/80 font-semibold">
            Próximo passo
          </span>
          <span className="mt-1 block text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">
            {label}
          </span>
          {description && (
            <span className="mt-1 block text-sm text-muted-foreground">
              {description}
            </span>
          )}
        </span>
        <ArrowRight
          className="h-5 w-5 text-primary flex-shrink-0 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
};

export default NextSectionCta;