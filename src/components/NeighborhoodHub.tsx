import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { trackInternalLinkClick } from "@/lib/tracking";

export interface NeighborhoodLink {
  name: string;
  link: string;
  riskLevel?: "baixo" | "médio" | "médio-alto" | "alto";
  priceRange?: string;
}

interface Props {
  source: string;
  title?: string;
  subtitle?: string;
  neighborhoods: NeighborhoodLink[];
}

const riskBadge: Record<NonNullable<NeighborhoodLink["riskLevel"]>, string> = {
  "baixo": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "médio": "bg-amber-50 text-amber-700 border-amber-200",
  "médio-alto": "bg-orange-50 text-orange-700 border-orange-200",
  "alto": "bg-red-50 text-red-700 border-red-200",
};

const NeighborhoodHub = ({ source, title, subtitle, neighborhoods }: Props) => (
  <section className="py-16 bg-background" aria-labelledby="hub-bairros-heading">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <span className="section-label">Cobertura por bairro</span>
        <h2 id="hub-bairros-heading" className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
          {title ?? "Seguro Auto por Bairro em Guarulhos"}
        </h2>
        <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          {subtitle ??
            "O CEP de pernoite é uma das variáveis de maior peso no preço do seguro auto. Veja a página específica do seu bairro para entender preço médio, risco e seguradoras mais competitivas."}
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
        {neighborhoods.map((n) => (
          <li key={n.link}>
            <Link
              to={n.link}
              onClick={() =>
                trackInternalLinkClick({ source, destination: n.link, label: n.name })
              }
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <MapPin className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{n.name}</p>
                  {n.priceRange && (
                    <p className="text-xs text-muted-foreground truncate">{n.priceRange}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {n.riskLevel && (
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${riskBadge[n.riskLevel]}`}
                  >
                    Risco {n.riskLevel}
                  </span>
                )}
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default NeighborhoodHub;