import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";

interface Props {
  /** Onde o banner está sendo exibido (para tracking). Ex: 'home', 'seguro-rural'. */
  source: string;
  /** Variante visual: 'full' (destaque) ou 'compact' (faixa enxuta). Default: 'full'. */
  variant?: "full" | "compact";
}

const WA_URL =
  "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20quero%20aproveitar%20as%20condi%C3%A7%C3%B5es%20especiais%20da%20Semana%20Agrishow%202026%20para%20seguro%20de%20m%C3%A1quinas%20agr%C3%ADcolas.";

const AgrishowPromoBanner = ({ source, variant = "full" }: Props) => {
  const isCompact = variant === "compact";
  return (
    <section
      aria-labelledby={`agrishow-banner-${source}`}
      className={isCompact ? "py-6 bg-primary" : "py-10 md:py-14 bg-primary"}
    >
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto ${isCompact ? "text-left md:flex md:items-center md:justify-between md:gap-6" : "text-center"}`}>
          <div className={isCompact ? "mb-4 md:mb-0" : ""}>
            <span className="inline-flex items-center gap-1.5 bg-[hsl(var(--cta))]/20 text-[hsl(var(--cta))] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              <Sparkles className="h-3 w-3" aria-hidden="true" /> Semana Agrishow 2026
            </span>
            <h2
              id={`agrishow-banner-${source}`}
              className={`text-primary-foreground font-bold ${isCompact ? "text-base md:text-lg" : "text-xl md:text-2xl mb-2"}`}
            >
              Condições especiais em Seguro de Máquinas Agrícolas
            </h2>
            {!isCompact && (
              <p className="text-primary-foreground/80 text-sm md:text-base mb-6 max-w-2xl mx-auto">
                Cotação prioritária em até 2 horas úteis, comparação entre 6 seguradoras e atendimento em todo o Brasil. Veja o guia completo da feira em Ribeirão Preto.
              </p>
            )}
          </div>
          <div className={`flex flex-col sm:flex-row gap-3 ${isCompact ? "md:shrink-0" : "justify-center"}`}>
            <Link
              to="/blog/agrishow-2026-ribeirao-preto-seguro-maquinas-agricolas"
              className="w-full sm:w-auto"
            >
              <Button
                size={isCompact ? "default" : "lg"}
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
              >
                Ler guia da Agrishow <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              to="/seguro-maquinas-agricolas"
              onClick={() => trackCotacaoClick(`agrishow-banner-${source}`)}
              className="w-full sm:w-auto"
            >
              <Button
                size={isCompact ? "default" : "lg"}
                variant="cta"
                className="w-full sm:w-auto font-semibold"
              >
                Pedir Cotação <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`agrishow-banner-${source}`)}
              className="w-full sm:w-auto"
            >
              <Button
                size={isCompact ? "default" : "lg"}
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
              >
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgrishowPromoBanner;
