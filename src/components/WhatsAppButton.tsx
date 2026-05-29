import { useState, useEffect, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, FileText } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import { inferQuoteTypeFromText } from "@/lib/inferQuoteType";
import {
  subscribeWhatsAppOverride,
  getWhatsAppOverrideSnapshot,
  getWhatsAppOverrideServerSnapshot,
} from "@/lib/whatsappOverride";

const WHATSAPP_BASE = "https://wa.me/551151997500?text=";
const DEFAULT_MESSAGE =
  "Olá, vim pelo site da Patro Seguros e gostaria de solicitar uma cotação de seguro.";
const DEFAULT_TRACKING_LABEL = "botao-fixo";

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // Lê override (mensagem + tracking label) ditado por páginas locais.
  const override = useSyncExternalStore(
    subscribeWhatsAppOverride,
    getWhatsAppOverrideSnapshot,
    getWhatsAppOverrideServerSnapshot,
  );

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

  const lastErrorId = typeof window !== "undefined" ? (window as any).lastErrorId : null;
  const baseMessage = override?.message ?? DEFAULT_MESSAGE;
  const whatsappMessage = lastErrorId 
    ? `${baseMessage}\n\n_Ref. Erro anterior: ${lastErrorId}_`
    : baseMessage;
  
  const whatsappHref = WHATSAPP_BASE + encodeURIComponent(whatsappMessage);
  const trackingLabel = override?.trackingLabel ?? DEFAULT_TRACKING_LABEL;
  const ariaLabel = override
    ? `Falar no WhatsApp sobre ${override.trackingLabel.replace(/^local-page:/, "").replace(/:floating$/, "")}`
    : "Falar no WhatsApp";

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
          className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-3 pr-4 py-2.5 shadow-xl transition-base hover:scale-105 hover:shadow-2xl text-sm font-semibold"
        >
          <FileText className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          Pedir Cotação
        </Link>
      )}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onClick={() =>
          trackWhatsAppClick(trackingLabel, {
            origin: "sticky-cta",
            ...(override ? { localOverride: true } : {}),
          })
        }
        className="group"
      >
        <div className="relative bg-[#25D366] text-white rounded-full p-3.5 shadow-xl transition-base group-hover:scale-110 group-hover:shadow-2xl">
          <MessageCircle className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
