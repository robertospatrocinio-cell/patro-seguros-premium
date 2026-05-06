import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, FileText } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import { inferQuoteTypeFromText } from "@/lib/inferQuoteType";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on the Cotacao page itself (the user is already in the form)
  const isCotacaoPage = location.pathname.startsWith("/cotacao");
  const tipo = inferQuoteTypeFromText(location.pathname);
  const cotacaoHref = tipo ? `/cotacao?tipo=${tipo}` : "/cotacao";

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {!isCotacaoPage && (
        <Link
          to={cotacaoHref}
          aria-label="Pedir cotação"
          onClick={() =>
            trackCotacaoClick("botao-fixo", { origin: "sticky-cta", insuranceType: tipo || undefined })
          }
          className="group inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] text-white pl-3 pr-4 py-2.5 shadow-xl transition-base hover:scale-105 hover:shadow-2xl text-sm font-semibold"
        >
          <FileText className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          Pedir Cotação
        </Link>
      )}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        onClick={() => trackWhatsAppClick("botao-fixo", { origin: "sticky-cta" })}
        className="group"
      >
        <div className="relative bg-[#25D366] text-white rounded-full p-3.5 shadow-xl transition-base group-hover:scale-110 group-hover:shadow-2xl">
          <MessageCircle className="h-6 w-6" strokeWidth={1.8} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
