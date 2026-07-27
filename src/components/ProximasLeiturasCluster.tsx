import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { getLongtailCluster } from "@/lib/longtailClusters";
import { trackInternalLinkClick, buildInternalLinkSource } from "@/lib/tracking";

interface ProximasLeiturasClusterProps {
  /** Path canônico da rota atual (ex.: `/valor-seguro-byd-dolphin`). */
  pathname: string;
}

/**
 * "Próximas leituras" — bloco de leitura contínua ao final das páginas
 * long-tail. Diferente do `TrilhaSeoRelacionados` (que fica antes do FAQ
 * e vende "você também pode precisar"), este componente:
 *
 *  - Aparece **no rodapé** da página, como uma bibliografia sugerida.
 *  - Usa **links âncora profundos** (#preco-heading, #coberturas-heading, ...)
 *    para levar o leitor DIRETO à seção equivalente na página irmã do cluster.
 *  - Marca cada link com `rel="next"` (o primeiro item recebe o hint) e envia
 *    evento de tracking com o `anchor` clicado para o painel de correlação
 *    interna × GSC (`/admin/links-internos`).
 *
 * Renderiza `null` fora dos clusters mapeados em `LONGTAIL_CLUSTERS`.
 */
const ProximasLeiturasCluster = ({ pathname }: ProximasLeiturasClusterProps) => {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const cluster = getLongtailCluster(normalized);
  if (!cluster || !cluster.items?.length) return null;

  const sourceSlug = normalized.replace(/^\/+/, "") || "home";

  return (
    <section
      className="py-16 border-t border-border/60 bg-background"
      aria-labelledby="proximas-leituras-heading"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-wide mb-2">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Próximas leituras
          </div>
          <h2
            id="proximas-leituras-heading"
            className="text-2xl md:text-3xl font-semibold text-foreground"
          >
            Continue de onde você parou
          </h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Cada link abre a página irmã já na seção que responde a próxima
            pergunta — sem obrigá-lo a reler o hero.
          </p>
        </div>

        <ol className="space-y-3 list-none pl-0">
          {cluster.items.map((item, idx) => {
            // Extrai a âncora (#...) do href para etiquetar o drilldown.
            const hashIndex = item.href.indexOf("#");
            const anchor = hashIndex >= 0 ? item.href.slice(hashIndex + 1) : null;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  rel={idx === 0 ? "next" : undefined}
                  onClick={() =>
                    trackInternalLinkClick({
                      placement: "proximas-leituras",
                      source: buildInternalLinkSource("landing", sourceSlug),
                      destination: item.href,
                      label: item.title,
                      anchor: anchor ?? undefined,
                    })
                  }
                  className="group flex items-start gap-4 rounded-xl border border-border/60 bg-card p-4 md:p-5 hover:border-primary/40 hover:bg-primary/[0.02] transition-colors"
                >
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[13px] font-semibold text-primary"
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-[15px] md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="inline-flex items-center rounded-md bg-primary/[0.08] px-2 py-0.5 text-[11px] font-medium text-primary uppercase tracking-wide">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className="flex-shrink-0 mt-1 h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                  />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ProximasLeiturasCluster;