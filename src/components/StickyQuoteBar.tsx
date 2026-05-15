import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

interface Props {
  /** ex.: "seguro-auto-guarulhos" */
  source: string;
  /** rota do form (ex.: "/cotacao?tipo=auto") */
  quoteHref: string;
  /** Mensagem WhatsApp pré-preenchida */
  whatsappMessage?: string;
  /** Texto curto da CTA principal */
  ctaLabel?: string;
}

const PHONE = "551151997500";

const StickyQuoteBar = ({
  source,
  quoteHref,
  whatsappMessage = "Olá! Quero uma cotação rápida de seguro auto em Guarulhos.",
  ctaLabel = "Cotação rápida",
}: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
       className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
         visible ? "translate-y-0" : "translate-y-full"
       }`}
      role="region"
      aria-label="Atalhos de cotação"
    >
      <div className="container mx-auto px-3 py-2.5 flex gap-2">
        <Link
          to={quoteHref}
          onClick={() => trackCotacaoClick(`sticky-bar:${source}`)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-3 py-2.5 text-sm transition-opacity"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(`sticky-bar:${source}`)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-2.5 text-sm transition-colors"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default StickyQuoteBar;