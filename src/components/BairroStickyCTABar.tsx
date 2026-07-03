import { useEffect, useState } from "react";
import { MessageCircle, ArrowRight, MapPin } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

interface Props {
  /** Nome do bairro para exibir e rastrear (ex.: "Cidade Maia") */
  bairroNome: string;
  /** Slug do bairro (ex.: "jardim-maia") — usado no source de tracking */
  bairroSlug: string;
  /** Callback ao clicar em "Pedir Cotação" (rolar até o formulário da página) */
  onQuoteClick: () => void;
}

const PHONE = "551151997500";

/**
 * Barra fixa de conversão para páginas de bairro de Guarulhos.
 * Aparece após 300px de scroll, visível em mobile e desktop.
 * "Pedir Cotação" rola até o formulário da própria página.
 * "Falar no WhatsApp" abre conversa com mensagem contextual do bairro.
 */
const BairroStickyCTABar = ({ bairroNome, bairroSlug, onQuoteClick }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastState = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 300;
        if (next !== lastState) {
          lastState = next;
          setVisible(next);
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const message = `Olá! Vi a página de seguros para ${bairroNome} e quero uma cotação com a Patro Seguros.`;
  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  const trackingSource = `bairro-sticky:${bairroSlug}`;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.18)] transition-transform duration-300 motion-reduce:transition-none ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label={`Atalhos de cotação para ${bairroNome}`}
      data-cta-bar="bairro"
    >
      <div className="container mx-auto px-3 py-2.5 md:py-3 flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground/90 mr-auto">
          <MapPin className="h-5 w-5 text-[hsl(var(--primary))]" aria-hidden="true" />
          <span>Corretora local em {bairroNome} — resposta em até 2h úteis</span>
        </div>
        <button
          type="button"
          onClick={() => {
            trackCotacaoClick(trackingSource);
            onQuoteClick();
          }}
          className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-4 py-2.5 text-sm md:text-base transition-opacity"
        >
          Pedir Cotação
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(trackingSource)}
          className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 text-sm md:text-base transition-colors"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Falar no </span>WhatsApp
        </a>
      </div>
    </div>
  );
};

export default BairroStickyCTABar;