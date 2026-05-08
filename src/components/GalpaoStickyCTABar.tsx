import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, Building2 } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

interface Props {
  /** ex.: "seguro-galpao-cumbica" — usado no rastreamento */
  source: string;
  /** rota do form de cotação (default: /cotacao?tipo=empresarial) */
  quoteHref?: string;
  /** Mensagem WhatsApp pré-preenchida */
  whatsappMessage?: string;
  /** Texto curto da CTA principal */
  ctaLabel?: string;
}

const PHONE = "551151997500";

/**
 * Barra fixa de conversão para o cluster Seguro de Galpão.
 *
 * Diferença para o `StickyQuoteBar` (que é mobile-only):
 *   - Visível em TODOS os viewports (mobile + desktop) para garantir que
 *     "Pedir Cotação" e "Falar no WhatsApp" estejam sempre acessíveis em
 *     qualquer seção das páginas de Galpão (cluster de alto ticket).
 *   - Aparece após 300px de scroll (logo após o hero).
 *   - Respeita `prefers-reduced-motion`.
 *   - Reserva espaço na parte inferior para não cobrir o botão flutuante
 *     global de WhatsApp (canto inferior direito) — alinhamento à esquerda
 *     no desktop e largura completa no mobile.
 */
const GalpaoStickyCTABar = ({
  source,
  quoteHref = "/cotacao?tipo=empresarial",
  whatsappMessage = "Olá! Quero uma cotação rápida de Seguro de Galpão com a Patro Seguros.",
  ctaLabel = "Pedir Cotação",
}: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.18)] transition-transform duration-300 motion-reduce:transition-none ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label="Atalhos de cotação Seguro de Galpão"
      data-cta-bar="galpao"
    >
      <div className="container mx-auto px-3 py-2.5 md:py-3 flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground/90 mr-auto">
          <Building2 className="h-5 w-5 text-[hsl(var(--primary))]" aria-hidden="true" />
          <span>Especialistas em Seguro de Galpão — resposta em até 4h úteis</span>
        </div>
        <Link
          to={quoteHref}
          onClick={() => trackCotacaoClick(`galpao-sticky:${source}`)}
          className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-4 py-2.5 text-sm md:text-base transition-opacity"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(`galpao-sticky:${source}`)}
          className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 text-sm md:text-base transition-colors"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
};

export default GalpaoStickyCTABar;