import { useState, useEffect, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, FileText, ShieldCheck, ArrowRight } from "lucide-react";
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
  const isSinistroPage = location.pathname.includes("central-de-sinistro");
  const tipo = inferQuoteTypeFromText(location.pathname);
  const cotacaoHref = tipo ? `/cotacao?tipo=${tipo}` : "/cotacao";

  const lastErrorId = typeof window !== "undefined" ? (window as any).lastErrorId : null;
  const baseMessage = isSinistroPage 
    ? "Olá, preciso de ajuda com um sinistro. Vim pela Central de Sinistro do site." 
    : (override?.message ?? DEFAULT_MESSAGE);
  
  const whatsappMessage = lastErrorId 
    ? `${baseMessage}\n\n_Ref. Erro anterior: ${lastErrorId}_`
    : baseMessage;
  
  const whatsappHref = WHATSAPP_BASE + encodeURIComponent(whatsappMessage);
  const trackingLabel = isSinistroPage ? "central-sinistro-flutuante" : (override?.trackingLabel ?? DEFAULT_TRACKING_LABEL);
  const ariaLabel = isSinistroPage 
    ? "Central de Sinistro no WhatsApp" 
    : (override
      ? `Falar no WhatsApp sobre ${override.trackingLabel.replace(/^local-page:/, "").replace(/:floating$/, "")}`
      : "Falar no WhatsApp");

  return (
    <>
      {/* Barra Fixa Desktop (Central de Sinistro) */}
      <div className={`hidden lg:flex fixed top-[84px] right-0 z-[40] transition-all duration-500 ${visible ? "translate-x-0" : "translate-x-full"}`}>
        <Link 
          to="/central-de-sinistro"
          className="bg-orange-600 text-white px-5 py-3 rounded-l-2xl shadow-2xl flex items-center gap-3 font-black text-sm uppercase tracking-wider hover:bg-orange-700 transition-all hover:pr-8"
        >
          <div className="bg-white/20 p-1.5 rounded-lg">
            <ShieldCheck className="h-5 w-5" />
          </div>
          Central de Sinistro
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div
        className={`fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Botão Mobile Especial (Central de Sinistro) */}
        {!isSinistroPage && (
          <div className="lg:hidden flex flex-col items-end gap-2">
            <Link
              to="/central-de-sinistro"
              className="bg-orange-600 text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 font-bold text-[12px] uppercase animate-in slide-in-from-bottom-2"
            >
              <ShieldCheck className="h-4 w-4" />
              Central de Sinistro
            </Link>
          </div>
        )}

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
          className="group lg:block hidden"
        >
          <div className="relative bg-[#25D366] text-white rounded-full p-3.5 shadow-xl transition-base group-hover:scale-110 group-hover:shadow-2xl">
            <MessageCircle className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </div>
        </a>

        {/* Sticky Mobile WhatsApp Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-slate-100 p-3 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] flex gap-3 animate-in slide-in-from-bottom duration-500">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(trackingLabel, { origin: "sticky-mobile-bar" })}
            className="flex-1 bg-[#25D366] text-white h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-lg shadow-green-500/20 active:scale-95 transition-all"
          >
            <MessageCircle className="h-5 w-5" />
            Cotação via WhatsApp
          </a>
          {!isCotacaoPage && (
            <Link
              to={cotacaoHref}
              onClick={() => trackCotacaoClick("sticky-mobile-bar")}
              className="px-4 bg-primary text-primary-foreground h-12 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all"
            >
              <FileText className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default WhatsAppButton;
