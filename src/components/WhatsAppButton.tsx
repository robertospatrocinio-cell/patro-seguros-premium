import { useState, useEffect, useSyncExternalStore, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, FileText, ShieldCheck, ArrowRight, Plus, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const scrollStopTimeoutRef = useRef<number | null>(null);

  // Lê override (mensagem + tracking label) ditado por páginas locais.
  const override = useSyncExternalStore(
    subscribeWhatsAppOverride,
    getWhatsAppOverrideSnapshot,
    getWhatsAppOverrideServerSnapshot,
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const onMediaChange = () => setIsMobileViewport(media.matches);
    onMediaChange();
    media.addEventListener("change", onMediaChange);
    return () => media.removeEventListener("change", onMediaChange);
  }, []);

  useEffect(() => {
    let ticking = false;
    let lastVisible = false;
    let lastScrolling = false;
    const onScroll = () => {
      if (!lastScrolling) {
        lastScrolling = true;
        setIsUserScrolling(true);
      }
      if (scrollStopTimeoutRef.current) window.clearTimeout(scrollStopTimeoutRef.current);
      scrollStopTimeoutRef.current = window.setTimeout(() => {
        lastScrolling = false;
        setIsUserScrolling(false);
      }, 700);
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 300;
        if (next !== lastVisible) {
          lastVisible = next;
          setVisible(next);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollStopTimeoutRef.current) window.clearTimeout(scrollStopTimeoutRef.current);
    };
  }, []);

  // Close mobile menu on outside click / Esc / route change
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Hide on the Cotacao page itself (the user is already in the form)
  const isCotacaoPage = location.pathname.startsWith("/cotacao");
  const isSinistroPage = location.pathname.includes("central-de-sinistro");
  const tipo = inferQuoteTypeFromText(location.pathname);
  const cotacaoHref = tipo ? `/cotacao?tipo=${tipo}` : "/cotacao";

  const lastErrorId = typeof window !== "undefined" ? (window as Window & { lastErrorId?: string }).lastErrorId : null;
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
      <div
        className={`fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] right-3 z-50 flex flex-col items-end gap-2 transition-all duration-300 motion-reduce:transition-none lg:bottom-4 lg:right-4 ${
          visible && (!isMobileViewport || !isUserScrolling || open) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* === MOBILE: FAB retrátil agrupando as 3 ações === */}
        <div ref={menuRef} className="lg:hidden flex flex-col items-end gap-2">
          {/* Itens expansíveis */}
          <div
            className={`flex flex-col items-end gap-2 transition-all duration-200 origin-bottom-right ${
              open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
            }`}
            aria-hidden={!open}
          >
            {!isSinistroPage && (
              <Link
                to="/central-de-sinistro"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 bg-white text-foreground rounded-full pl-2 pr-3 py-1.5 shadow-md border border-border text-xs font-semibold active:scale-95"
              >
                <span className="bg-orange-600 text-white rounded-full p-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
                Central de Sinistro
              </Link>
            )}
            {!isCotacaoPage && (
              <Link
                to={cotacaoHref}
                onClick={() => {
                  trackCotacaoClick("botao-fixo", { origin: "sticky-fab-mobile", insuranceType: tipo || undefined });
                  setOpen(false);
                }}
                className="flex items-center gap-2 bg-white text-foreground rounded-full pl-2 pr-3 py-1.5 shadow-md border border-border text-xs font-semibold active:scale-95"
              >
                <span className="bg-primary text-primary-foreground rounded-full p-1.5">
                  <FileText className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
                Pedir Cotação
              </Link>
            )}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackWhatsAppClick(trackingLabel, { origin: "sticky-fab-mobile" });
                setOpen(false);
              }}
              className="flex items-center gap-2 bg-white text-foreground rounded-full pl-2 pr-3 py-1.5 shadow-md border border-border text-xs font-semibold active:scale-95"
            >
              <span className="bg-[#25D366] text-white rounded-full p-1.5">
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
              WhatsApp
            </a>
          </div>

          {/* Botão principal mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu de atendimento" : "Abrir menu de atendimento"}
            aria-expanded={open}
            className="relative bg-primary text-primary-foreground rounded-full p-2.5 shadow-xl active:scale-95 transition-transform"
          >
            {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
            {!open && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#25D366] rounded-full border-2 border-white animate-pulse" />
            )}
          </button>
        </div>

        {/* === DESKTOP: botões originais === */}
        {!isCotacaoPage && (
          <Link
            to={cotacaoHref}
            aria-label="Pedir cotação"
            onClick={() =>
              trackCotacaoClick("botao-fixo", { origin: "sticky-cta", insuranceType: tipo || undefined })
            }
            className="hidden lg:inline-flex group items-center gap-2 rounded-full bg-primary text-primary-foreground pl-3 pr-4 py-2.5 shadow-xl transition-base hover:scale-105 hover:shadow-2xl text-sm font-semibold"
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
          className="group hidden lg:block"
        >
          <div className="relative bg-[#25D366] text-white rounded-full p-3.5 shadow-xl transition-base group-hover:scale-110 group-hover:shadow-2xl">
            <MessageCircle className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </div>
        </a>
      </div>
    </>
  );
};

export default WhatsAppButton;
