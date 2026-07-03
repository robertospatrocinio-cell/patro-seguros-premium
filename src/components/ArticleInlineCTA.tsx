import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";

interface Props {
  quoteHref: string;
  whatsappUrl: string;
  source: string;
  headline?: string;
  subline?: string;
  variant?: "solid" | "soft";
}

/**
 * CTA reutilizável para inserir no MEIO dos artigos /artigos/* e /blog/*.
 * Mantém texto, cores e eventos de tracking consistentes com o CTA final,
 * garantindo que "Pedir Cotação" e "Falar no WhatsApp" apareçam em toda
 * página de artigo tanto no corpo quanto no rodapé.
 */
export default function ArticleInlineCTA({
  quoteHref,
  whatsappUrl,
  source,
  headline = "Quer uma cotação personalizada agora?",
  subline = "Comparamos 16+ seguradoras e devolvemos a melhor proposta em até 2h úteis. Atendimento humano, sem call center.",
  variant = "solid",
}: Props) {
  const isSolid = variant === "solid";
  return (
    <aside
      role="complementary"
      aria-label="Chamada para cotação"
      className={
        "not-prose my-10 p-6 md:p-8 rounded-2xl shadow-elegant " +
        (isSolid
          ? "bg-primary text-primary-foreground"
          : "bg-primary/5 border border-primary/20 text-foreground")
      }
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          <h3 className={"text-xl md:text-2xl font-bold mb-2 " + (isSolid ? "" : "text-primary")}>{headline}</h3>
          <p className={"text-sm md:text-base " + (isSolid ? "text-primary-foreground/80" : "text-muted-foreground")}>
            {subline}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Link to={quoteHref} onClick={() => trackCotacaoClick(source)}>
            <Button size="lg" variant="cta" className="w-full sm:w-auto font-semibold">
              Pedir Cotação <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(source)}
          >
            <Button
              size="lg"
              variant="outline"
              className={
                "w-full sm:w-auto font-semibold " +
                (isSolid
                  ? "bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  : "bg-white")
              }
            >
              <MessageCircle className="mr-2 h-4 w-4 text-green-600" /> Falar no WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </aside>
  );
}