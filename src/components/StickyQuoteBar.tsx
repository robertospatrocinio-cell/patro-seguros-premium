import { useEffect, useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, X, ChevronUp } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import { Button } from "@/components/ui/button";

const QuickQuoteForm = lazy(() => import("./QuickQuoteForm"));

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
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!isFormOpen) setVisible(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-background border-t shadow-2xl transition-transform duration-500 ease-in-out md:max-w-md md:left-auto md:right-6 md:rounded-t-2xl md:border-x ${
          isFormOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4 pt-2">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="font-bold text-lg">Cotação Expressa</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsFormOpen(false)}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="max-h-[80vh] overflow-y-auto pb-4">
            <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <QuickQuoteForm 
                insuranceType={source.includes("auto") ? "Seguro Auto" : "Seguro"} 
                trackingLabel={`sticky-form:${source}`} 
              />
            </Suspense>
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
          visible && !isFormOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="region"
        aria-label="Atalhos de cotação"
      >
        <div className="container mx-auto px-3 py-2.5 flex gap-2">
          <button
            onClick={() => {
              setIsFormOpen(true);
              trackCotacaoClick(`sticky-bar-open:${source}`);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-3 py-2.5 text-sm transition-opacity"
          >
            {ctaLabel}
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          </button>
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
    </>
  );
};

export default StickyQuoteBar;