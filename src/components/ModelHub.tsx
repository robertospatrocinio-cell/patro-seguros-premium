import { Link } from "react-router-dom";
import { Car, ArrowRight } from "lucide-react";
import { trackInternalLinkClick } from "@/lib/tracking";

export interface ModelLink {
  name: string;
  link: string;
  category?: string;
  priceRange?: string;
}

interface Props {
  source: string;
  title?: string;
  subtitle?: string;
  models: ModelLink[];
}

const ModelHub = ({ source, title, subtitle, models }: Props) => (
  <section className="py-16 bg-muted/30" aria-labelledby="hub-modelos-heading">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <span className="section-label">Cotação por modelo</span>
        <h2 id="hub-modelos-heading" className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
          {title ?? "Seguro Auto por Modelo em Guarulhos"}
        </h2>
        <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          {subtitle ??
            "O modelo, ano e valor FIPE do veículo definem boa parte do prêmio. Veja a página específica do seu carro para conhecer faixa de preço, cobertura ideal e seguradoras mais competitivas em Guarulhos."}
        </p>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
        {models.map((m) => (
          <li key={m.link}>
            <Link
              to={m.link}
              onClick={() =>
                trackInternalLinkClick({ source, destination: m.link, label: m.name })
              }
              className="group flex flex-col h-full gap-1 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <p className="text-sm font-semibold text-foreground truncate">{m.name}</p>
              </div>
              {m.category && (
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{m.category}</p>
              )}
              {m.priceRange && (
                <p className="text-xs text-muted-foreground">{m.priceRange}</p>
              )}
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                Ver cotação <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ModelHub;