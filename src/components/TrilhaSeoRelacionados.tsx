import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export interface TrilhaSeoItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

interface TrilhaSeoRelacionadosProps {
  /** Título da seção. Default: "Você também pode precisar" */
  title?: string;
  /** Subtítulo curto opcional para contextualizar. */
  subtitle?: string;
  /** 3 a 4 cards recomendados. */
  items: TrilhaSeoItem[];
  /** id do heading — permite aria-labelledby e âncora. */
  headingId?: string;
}

/**
 * Trilha de SEO interna com cards "Você também pode precisar".
 * Usada nas páginas mais fortes para distribuir PageRank interno
 * para páginas descobertas e ainda pouco indexadas.
 */
export const TrilhaSeoRelacionados = ({
  title = "Você também pode precisar",
  subtitle,
  items,
  headingId = "trilha-seo-relacionados",
}: TrilhaSeoRelacionadosProps) => {
  if (!items?.length) return null;

  return (
    <section
      className="py-14 bg-muted/30 border-y border-border/60"
      aria-labelledby={headingId}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-wide mb-2">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Trilha recomendada
          </div>
          <h2
            id={headingId}
            className="text-2xl md:text-3xl font-semibold text-foreground"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-5 transition-base hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <div>
                {item.badge && (
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5 mb-3">
                    {item.badge}
                  </span>
                )}
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Ver detalhes
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrilhaSeoRelacionados;