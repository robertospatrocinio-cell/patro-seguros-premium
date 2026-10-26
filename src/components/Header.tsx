import { useState, useMemo, memo, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SmartLink } from "./SmartLink";
import DesktopNavDisclosure from "./DesktopNavDisclosure";
import { catalogoSeguros, correspondeBuscaCatalogo } from "@/data/catalogoSeguros";
import { Menu, X, Phone, Mail, Instagram, Facebook, Linkedin, ChevronDown, MapPin, Search, Star, MessageCircle, PawPrint, Stethoscope, RotateCcw, ArrowRight, User as UserIcon, Car, ShieldCheck, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";
import { toast } from "sonner";
import { logForgottenQuote } from "@/lib/quoteHistory";
import { PATRO_SOCIAL_PROOF } from "@/lib/patroSocialProof";
import { scheduleIdle } from "@/lib/prefetch";
import { EMPRESA, WHATSAPP_URL_BASE } from "@/config/empresa";



const logoFull = "/images/logo-full.webp";
const WHATSAPP_URL = `https://wa.me/551151997500?text=${encodeURIComponent("Olá, vim pelo site da Patro Seguros e gostaria de solicitar uma cotação de seguro.")}`;
const WHATSAPP_SINISTRO_URL = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent("Olá, preciso de ajuda com um sinistro. Vim pela Central de Sinistro do site.")}`;

const MobileSection = ({ id, label, isOpen, onToggle, children }: { id: string; label: string; isOpen: boolean; onToggle: (id: string) => void; children: React.ReactNode }) => (
  <div className="border-b border-border/50 last:border-0">
    <button
      type="button"
      id={`mobile-section-trigger-${id}`}
      onClick={() => onToggle(id)}
      className="flex items-center justify-between w-full py-3 px-3 text-[13px] font-semibold text-foreground hover:text-primary transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-expanded={isOpen}
      aria-controls={`mobile-section-${id}`}
    >
      {label}
      <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
    </button>
    <div id={`mobile-section-${id}`} hidden={!isOpen} className="pb-3 px-3" role="region" aria-labelledby={`mobile-section-trigger-${id}`}>
      {isOpen ? children : null}
    </div>
  </div>
);

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [mobileSearch, setMobileSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [recoverableSession, setRecoverableSession] = useState<{ key: string; type: string; name?: string; step?: number } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    // O deslocamento do cabeçalho só existe a partir de md. No celular,
    // não executar trabalho a cada rolagem para um efeito que não é exibido.
    const desktop = window.matchMedia("(min-width: 768px)");
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        frame = 0;
      });
    };
    const syncViewport = () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
      frame = 0;
      if (desktop.matches) {
        setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
      } else {
        setIsScrolled(false);
      }
    };
    syncViewport();
    desktop.addEventListener("change", syncViewport);
    return () => {
      desktop.removeEventListener("change", syncViewport);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    // Check for recoverable sessions in localStorage
    const checkSessions = () => {
      const storageKeys = [
        { key: "cotacao_progress", label: "Cotação Geral" },
        { key: "seguro-vida-completo", label: "Seguro de Vida" },
        { key: "indique-amigo-data", label: "Indicação" },
        { key: "quote-form-seguro-auto", label: "Seguro Auto" },
        { key: "quote-form-seguro-vida", label: "Seguro de Vida" },
        { key: "quote-form-seguro-residencial", label: "Seguro Residencial" },
        { key: "quote-form-plano-de-saúde", label: "Plano de Saúde" },
        { key: "quote-form-seguro-empresarial", label: "Seguro Empresarial" }
      ];
      
      let foundSession: typeof recoverableSession = null;

      for (const config of storageKeys) {
        const item = localStorage.getItem(config.key);
        if (!item) continue;
        try {
          const parsed = JSON.parse(item);
          // If it's the stepped form format {values, step}
          if (parsed.values && Object.keys(parsed.values).length > 0) {
            foundSession = {
              key: config.key,
              type: parsed.values.insuranceType || config.label,
              name: parsed.values.name || parsed.values.nome,
              step: parsed.step
            };
            break;
          }
          // If it's just raw data record
          if (Object.keys(parsed).length > 0) {
            foundSession = {
              key: config.key,
              type: config.label,
              name: parsed.name || parsed.nome || parsed.nomeCompleto || parsed.nomeCliente,
              step: Number(localStorage.getItem(`${config.key}-step`)) || 1
            };
            break;
          }
        } catch {
          // If not JSON but exists
          foundSession = { key: config.key, type: config.label };
          break;
        }
      }
      
      // A verificação periódica não deve redesenhar todo o menu se nada mudou.
      setRecoverableSession((previous) => {
        if (previous === null || foundSession === null) {
          return previous === foundSession ? previous : foundSession;
        }
        return previous.key === foundSession.key &&
          previous.type === foundSession.type &&
          previous.name === foundSession.name &&
          previous.step === foundSession.step
          ? previous
          : foundSession;
      });
    };


    // Perf: a checagem inicial é adiada para requestIdleCallback (parse
    // de até 8 chaves de localStorage não pode competir com o LCP do
    // Hero). O polling é pausado quando a aba fica oculta para não
    // gastar CPU em segundo plano.
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | undefined;

    const startPolling = () => {
      if (interval || cancelled) return;
      interval = setInterval(checkSessions, 15000);
    };
    const stopPolling = () => {
      if (!interval) return;
      clearInterval(interval);
      interval = undefined;
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") stopPolling();
      else startPolling();
    };

    scheduleIdle(() => {
      if (cancelled) return;
      checkSessions();
      window.addEventListener("storage", checkSessions);
      document.addEventListener("visibilitychange", onVisibility);
      if (document.visibilityState !== "hidden") startPolling();
    }, 2500);

    return () => {
      cancelled = true;
      stopPolling();
      window.removeEventListener("storage", checkSessions);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const handleForgetClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (recoverableSession) {
      if (!window.confirm("Esquecer esta cotação? Os dados salvos neste dispositivo serão apagados.")) return;
      // Log to local history before removing
      logForgottenQuote(
        recoverableSession.type, 
        recoverableSession.step || 1, 
        recoverableSession.key
      );

      localStorage.removeItem(recoverableSession.key);
      localStorage.removeItem(`${recoverableSession.key}-step`);
      localStorage.removeItem(`${recoverableSession.key}-checkboxes`);
      localStorage.removeItem(`${recoverableSession.key}-partial-id`);
      
      if (recoverableSession.key === "cotacao_progress") {
        localStorage.removeItem("partial_quote_id");
      }
      
      setRecoverableSession(null);
      toast.success("Sessão esquecida com sucesso.");
    }
  }, [recoverableSession]);



  const handleResumeClick = useCallback(() => {
    if (!recoverableSession) return;
    
    // Determine the best page to resume based on the current session key
    if (recoverableSession.key === "cotacao_progress") {
      navigate("/cotacao");
    } else if (recoverableSession.key === "seguro-vida-completo") {
      navigate("/formulario-seguro-vida");
    } else if (recoverableSession.key === "indique-amigo-data") {
      navigate("/indique-amigo");
    } else if (recoverableSession.key.startsWith("quote-form-")) {
      const type = recoverableSession.key.replace("quote-form-", "");
      navigate(`/cotacao?tipo=${type}`);
    } else {
      navigate("/cotacao");
    }
  }, [navigate, recoverableSession]);



  const allMobileLinks = useMemo(() => catalogoSeguros.flatMap((grupo) =>
    grupo.items.map((item) => ({ ...item, section: grupo.id, categoria: grupo.title }))
  ), []);

  const searchResults = useMemo(() => {
    if (!mobileSearch.trim()) return [];
    return allMobileLinks.filter((item) => correspondeBuscaCatalogo(item, mobileSearch, item.categoria));
  }, [mobileSearch, allMobileLinks]);

  const toggleMobileSection = useCallback((section: string) => {
    setOpenMobileSection(prev => prev === section ? null : section);
  }, []);

  const close = useCallback(() => { 
    setIsMenuOpen(false); 
    setMobileSearch(""); 
  }, []);

  const MobileLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <SmartLink to={to} className="block py-1.5 px-2 text-[13px] text-foreground/60 hover:text-primary rounded-md hover:bg-muted/50 transition-base" onClick={close}>
      {children}
    </SmartLink>
  );

  return (
    <>
    <header
      className={`patro-site-header sticky top-0 z-50 w-full transition-transform duration-300 focus-within:!translate-y-0 ${isScrolled ? 'md:translate-y-[-36px]' : 'translate-y-0'}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isMenuOpen) {
          event.preventDefault();
          close();
          event.currentTarget.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]')?.focus();
        }
      }}
    >
      <div className="bg-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-1.5 text-[11px] gap-3">
            <div className="flex items-center gap-3 sm:gap-5 min-w-0 flex-1">
              <div className="hidden lg:flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-2.5 w-2.5 fill-current" aria-hidden="true" />)}
                </div>
                <span className="text-[10px] text-white font-bold">{PATRO_SOCIAL_PROOF.googleRating} no Google</span>
              </div>
              <span className="hidden lg:flex items-center gap-1.5 text-white/60 text-[10px]">
                <MapPin className="h-3 w-3" aria-hidden="true" role="presentation" />
                Cidade Maia, Guarulhos/SP
              </span>
              <a href={`tel:${EMPRESA.telefone.replace(/\D/g, '')}`} aria-label={`Ligar ${EMPRESA.telefone}`} className="flex items-center gap-1.5 text-white hover:text-white/80 transition-base font-medium">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" role="presentation" />
                <span>{EMPRESA.telefone} • {EMPRESA.horario}</span>
              </a>
              <a href="mailto:contato@patroseguros.com.br" aria-label="Enviar e-mail para contato@patroseguros.com.br" className="flex items-center gap-1.5 text-white/85 hover:text-white transition-base min-w-0">
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" role="presentation" />
                <span className="hidden md:inline truncate">contato@patroseguros.com.br</span>
              </a>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              onClick={() => trackWhatsAppClick("header_top")}
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full px-2.5 py-1 text-[11px] font-semibold transition-base shrink-0"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-background/95 md:backdrop-blur-xl border-b border-border/40 min-h-[64px]">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16" aria-label="Navegação principal">
            <SmartLink to="/" className="flex items-center relative z-[60]" onClick={() => window.scrollTo(0,0)}>
              <img
                src={logoFull}
                alt="Patro Seguros Guarulhos - Corretora de Seguros"
                width={140}
                height={70}
                decoding="sync"
                loading="eager"
                {...({ fetchpriority: "high" } as any)}
                className="h-16 md:h-20 w-auto object-contain relative z-50 transition-all"
              />
            </SmartLink>

            <div className="hidden lg:flex items-center gap-1">
              <SmartLink to="/" className="text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base px-3 py-2">Início</SmartLink>
              <SmartLink to="/seguros-guarulhos" className="text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base px-3 py-2">Guarulhos</SmartLink>
              <DesktopNavDisclosure label="Todos os seguros" panelClassName="left-0 w-[min(760px,70vw)]">
                <div className="bg-card rounded-xl shadow-xl border p-5 max-h-[70vh] overflow-y-auto overscroll-contain">
                  <SmartLink to="/todos-os-seguros" className="block mb-4 font-semibold text-primary hover:underline">Ver catálogo completo de seguros, saúde e consórcio →</SmartLink>
                  <div className="grid grid-cols-2 gap-6">
                    {catalogoSeguros.map((grupo) => (
                      <section key={grupo.id} aria-label={grupo.title}>
                        <SmartLink to={`/todos-os-seguros#${grupo.id}`} className="block mb-2 text-sm font-semibold text-primary hover:underline">{grupo.title}</SmartLink>
                        <ul className="space-y-1">
                          {grupo.items.map((item) => (
                            <li key={item.to}><SmartLink to={item.to} className="block rounded px-2 py-1.5 text-[13px] hover:bg-muted hover:text-primary">{item.label}</SmartLink></li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              </DesktopNavDisclosure>


              {/* Para você */}
              <DesktopNavDisclosure label="Para você" panelClassName="left-1/2 -translate-x-1/2 w-[520px]">
                <div className="bg-card rounded-xl shadow-xl border p-5">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.1em] mb-3">Mobilidade e Vida</p>
                      <div className="space-y-0.5 text-[13px]">
                        <SmartLink to="/seguro-auto" className="block py-1 hover:text-primary">Seguro Auto</SmartLink>
                        <SmartLink to="/seguro-moto" className="block py-1 hover:text-primary">Seguro Moto</SmartLink>
                        <SmartLink to="/seguro-vida" className="block py-1 hover:text-primary">Seguro de Vida</SmartLink>
                        <SmartLink to="/planos-de-saude" className="block py-1 hover:text-primary">Plano de Saúde</SmartLink>
                        <SmartLink to="/seguro-viagem" className="block py-1 hover:text-primary">Seguro Viagem</SmartLink>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.1em] mb-3">Patrimônio e Outros</p>
                      <div className="space-y-0.5 text-[13px]">
                        <SmartLink to="/seguro-residencial" className="block py-1 hover:text-primary">Seguro Residencial</SmartLink>
                        <SmartLink to="/seguro-fianca-locaticia" className="block py-1 hover:text-primary">Seguro Fiança Locatícia</SmartLink>
                        <SmartLink to="/seguro-celular" className="block py-1 hover:text-primary">Seguro Celular</SmartLink>
                        <SmartLink to="/seguro-motorista-app" className="block py-1 hover:text-primary">Motorista de Aplicativo</SmartLink>
                        <SmartLink to="/consorcio" className="block py-1 hover:text-primary">Consórcio</SmartLink>
                      </div>
                    </div>
                  </div>
                </div>
              </DesktopNavDisclosure>

              {/* Para sua empresa */}
              <DesktopNavDisclosure label="Para sua empresa" panelClassName="left-1/2 -translate-x-1/2 w-[580px]">
                <div className="bg-card rounded-xl shadow-xl border p-5">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.1em] mb-3">Proteção Empresarial</p>
                      <div className="space-y-0.5 text-[13px]">
                        <SmartLink to="/seguro-empresarial" className="block py-1 hover:text-primary">Seguro Empresarial</SmartLink>
                        <SmartLink to="/seguro-frota" className="block py-1 hover:text-primary">Seguro Frota</SmartLink>
                        <SmartLink to="/seguro-transporte" className="block py-1 hover:text-primary">Transporte e Carga</SmartLink>
                        <SmartLink to="/nicho-transportadoras" className="block py-1 hover:text-primary">Seguro para Transportadoras</SmartLink>
                        <SmartLink to="/seguro-galpoes-industriais" className="block py-1 hover:text-primary">Seguro Galpões</SmartLink>
                        <SmartLink to="/consorcio" className="block py-1 hover:text-primary">Consórcio</SmartLink>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.1em] mb-3">Riscos e Benefícios</p>
                      <div className="space-y-0.5 text-[13px]">
                        <SmartLink to="/seguro-rc" className="block py-1 hover:text-primary">Responsabilidade Civil</SmartLink>
                        <SmartLink to="/seguro-rc-obras" className="block py-1 hover:text-primary">RC Obras e Montagem</SmartLink>
                        <SmartLink to="/seguro-cyber" className="block py-1 hover:text-primary">Seguro Cyber</SmartLink>
                        <SmartLink to="/plano-saude-empresarial" className="block py-1 hover:text-primary">Plano de Saúde PME</SmartLink>
                        <SmartLink to="/seguro-vida-pme" className="block py-1 hover:text-primary">Seguro de Vida em Grupo</SmartLink>
                        <SmartLink to="/seguro-maquinas" className="block py-1 hover:text-primary">Máquinas e Equipamentos</SmartLink>
                      </div>
                    </div>
                  </div>
                </div>
              </DesktopNavDisclosure>

              {/* Agronegócio */}
              <DesktopNavDisclosure label="Agronegócio" panelClassName="left-1/2 -translate-x-1/2 w-[400px]">
                <div className="bg-card rounded-xl shadow-xl border p-5">
                  <div className="space-y-0.5 text-[13px]">
                    <SmartLink to="/seguro-rural" className="block py-1 hover:text-primary">Seguro Rural</SmartLink>
                    <SmartLink to="/seguro-maquinas-agricolas" className="block py-1 hover:text-primary">Máquinas Agrícolas</SmartLink>
                    <SmartLink to="/seguro-equipamentos-agricolas" className="block py-1 hover:text-primary">Equipamentos</SmartLink>
                    <SmartLink to="/seguro-propriedade-rural" className="block py-1 hover:text-primary">Propriedade Rural</SmartLink>
                    <SmartLink to="/seguro-pecuario" className="block py-1 hover:text-primary">Seguro Pecuário</SmartLink>
                    <SmartLink to="/seguro-transporte-agro" className="block py-1 hover:text-primary">Transporte Agro</SmartLink>
                    <SmartLink to="/seguro-drone" className="block py-1 hover:text-primary">Seguro Drone</SmartLink>
                    <SmartLink to="/seguro-drone-agricola" className="block py-1 hover:text-primary">Seguro Drone (Casco)</SmartLink>
                    <SmartLink to="/seguro-reta-drone" className="block py-1 hover:text-primary">RETA Drone (Responsabilidade Civil)</SmartLink>
                  </div>
                </div>
              </DesktopNavDisclosure>

              {/* Atendimento */}
              <DesktopNavDisclosure label="Atendimento" panelClassName="left-1/2 -translate-x-1/2 w-[400px]">
                <div className="bg-card rounded-xl shadow-xl border p-5">
                  <div className="space-y-0.5 text-[13px]">
                    <SmartLink to="/cotacao" className="block py-1 hover:text-primary">Solicitar Cotação</SmartLink>
                    <SmartLink to="/contato" className="block py-1 hover:text-primary">Renovar Seguro</SmartLink>
                    <SmartLink to="/central-de-sinistro" className="block py-1 hover:text-primary">Acionar Sinistro</SmartLink>
                    <SmartLink to="/central-de-sinistro" className="block py-1 hover:text-primary">Assistência 24h</SmartLink>
                    <SmartLink to="/telefones-seguradoras" className="block py-1 hover:text-primary">Telefones e 0800</SmartLink>
                    <SmartLink to="/consulta-tabela-fipe" className="block py-1 hover:text-primary">Consulta Tabela FIPE</SmartLink>
                    <SmartLink to="/contato" className="block py-1 hover:text-primary">Segunda Via</SmartLink>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block py-1 hover:text-primary">Falar com Consultor</a>
                    <SmartLink to="/verificar-susep" className="flex items-center gap-1.5 py-1 font-semibold text-primary hover:text-primary/80">
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      Verificar habilitação SUSEP
                    </SmartLink>
                    <SmartLink to="/crm" className="block py-1 font-semibold text-primary">Área do Cliente</SmartLink>
                  </div>
                </div>
              </DesktopNavDisclosure>

              {/* Conteúdo */}
              <DesktopNavDisclosure label="Conteúdo" panelClassName="right-0 w-[200px]">
                <div className="bg-card rounded-xl shadow-xl border p-5">
                  <div className="space-y-0.5 text-[13px]">
                    <SmartLink to="/blog" className="block py-1 hover:text-primary">Blog</SmartLink>
                    <SmartLink to="/guias-seguros" className="block py-1 hover:text-primary">Central de Guias</SmartLink>
                    <SmartLink to="/materiais-gratuitos-seguros" className="block py-1 hover:text-primary">Materiais Gratuitos</SmartLink>
                    <SmartLink to="/glossario-seguros" className="block py-1 hover:text-primary">Glossário</SmartLink>
                    <SmartLink to="/faq" className="block py-1 hover:text-primary">Perguntas Frequentes</SmartLink>
                  </div>
                </div>
              </DesktopNavDisclosure>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {recoverableSession && !location.pathname.includes('cotacao') && !location.pathname.includes('formulario') && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleResumeClick}
                        className="h-8 gap-2 border-primary/30 text-primary hover:bg-primary/5 font-semibold text-[11px] animate-in fade-in zoom-in duration-300 relative group"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Retomar {recoverableSession.type}
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="w-64 p-4 shadow-xl border-primary/10">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                          <RotateCcw className="h-4 w-4" />
                          <span className="font-bold text-xs uppercase tracking-wider">Cotação em Aberto</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <ShieldCheck className="h-4 w-4 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] text-muted-foreground leading-none mb-1">Produto</p>
                              <p className="text-xs font-bold truncate capitalize">{recoverableSession.type}</p>
                            </div>
                          </div>
                          
                          {recoverableSession.name && (
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <UserIcon className="h-4 w-4 text-primary" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[10px] text-muted-foreground leading-none mb-1">Titular</p>
                                <p className="text-xs font-bold truncate">{recoverableSession.name}</p>
                              </div>
                            </div>
                          )}

                          <div className="pt-1 flex items-center justify-between border-t border-primary/10 mt-2">
                            <span className="text-[10px] font-medium text-muted-foreground">Etapa {recoverableSession.step || 1}</span>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-2 text-[10px] text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                onClick={handleForgetClick}
                              >
                                Esquecer
                              </Button>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="h-6 p-0 text-[10px] font-bold text-primary flex items-center gap-1"
                                onClick={handleResumeClick}
                              >
                                Continuar <ArrowRight className="h-2 w-2" />
                              </Button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <Button asChild size="sm" className="rounded-lg text-[12px] font-semibold h-8 px-4 shadow-sm hover:shadow-md transition-shadow">
                <Link to="/cotacao" onClick={() => trackCotacaoClick("header-desktop")}>
                  Cotação grátis
                </Link>
              </Button>
            </div>


            <Button asChild size="sm" className="lg:hidden ml-auto mr-1 rounded-lg text-[12px] font-semibold h-9 px-3">
              <Link to="/cotacao" onClick={() => trackCotacaoClick("header-mobile")}>Cotação grátis</Link>
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-background border-b shadow-lg max-h-[80vh] overflow-y-auto p-4">
          {recoverableSession && !location.pathname.includes('cotacao') && !location.pathname.includes('formulario') && (
            <div className="mb-4 bg-primary/5 border border-primary/10 rounded-2xl overflow-hidden animate-in slide-in-from-right-4 duration-300">
              <button 
                onClick={handleResumeClick}
                className="w-full flex items-center justify-between p-4 group active:bg-primary/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <RotateCcw className="h-6 w-6" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold leading-tight">Retomar {recoverableSession.type}</p>
                    <p className="text-[11px] opacity-70 truncate">
                      {recoverableSession.name ? `${recoverableSession.name} • ` : ""}Etapa {recoverableSession.step || 1}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 opacity-40 group-active:translate-x-1 transition-transform" />
              </button>
              <div className="px-4 pb-3 flex justify-end border-t border-primary/10 pt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleForgetClick}
                  className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-medium"
                >
                  <Trash2 className="h-3 w-3" />
                  Esquecer esta cotação
                </Button>
              </div>
            </div>

          )}


          <div className="grid grid-cols-2 gap-2 mb-4">
            <SmartLink to="/todos-os-seguros" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center rounded-lg border border-primary text-primary font-semibold text-[13px] h-11">
              Todos os seguros
            </SmartLink>
            <SmartLink to="/cotacao" onClick={() => { trackCotacaoClick("header-mobile-menu"); setIsMenuOpen(false); }} className="flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-[13px] h-11">
              Solicitar cotação
            </SmartLink>
          </div>

          <div className="relative mb-4">
            <label htmlFor="mobile-insurance-search" className="sr-only">Buscar seguro no menu</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <input
              id="mobile-insurance-search"
              type="search"
              placeholder="Buscar seguro…"
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              aria-controls="mobile-search-results"
              className="w-full pl-9 pr-4 py-2 text-[13px] bg-muted rounded-lg border-0"
            />
          </div>

          <p role="status" className="sr-only">
            {mobileSearch.trim() ? `${searchResults.length} seguros encontrados.` : ""}
          </p>
          <div id="mobile-search-results" hidden={!mobileSearch.trim()}>
            {searchResults.length ? (
              <ul aria-label="Resultados da busca de seguros">
                {searchResults.map((result) => (
                  <li key={`${result.section}-${result.to}`}>
                    <SmartLink to={result.to} onClick={close} className="block rounded-md px-3 py-3 text-sm hover:bg-muted">
                      {result.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-3 text-sm text-muted-foreground">Nenhum seguro encontrado. Tente outro nome.</p>
            )}
          </div>

          <div className="space-y-1" hidden={!!mobileSearch.trim()}>
            {catalogoSeguros.map((grupo) => (
              <MobileSection key={grupo.id} id={grupo.id} label={grupo.title} isOpen={openMobileSection === grupo.id} onToggle={toggleMobileSection}>
                {grupo.items.map((item) => (
                  <MobileLink key={item.to} to={item.to}>{item.label}</MobileLink>
                ))}
              </MobileSection>
            ))}

            <MobileSection id="atendimento" label="Atendimento" isOpen={openMobileSection === "atendimento"} onToggle={toggleMobileSection}>
              <MobileLink to="/cotacao">Solicitar Cotação</MobileLink>
              <MobileLink to="/contato">Renovar Seguro</MobileLink>
              <MobileLink to="/central-de-sinistro">Central de Sinistro</MobileLink>
               <MobileLink to="/telefones-seguradoras">Telefones e 0800</MobileLink>
               <MobileLink to="/consulta-tabela-fipe">Consulta Tabela FIPE</MobileLink>
              <MobileLink to="/verificar-susep">Verificar habilitação SUSEP</MobileLink>
              <Link to="/crm" className="block py-2 px-2 text-[13px] font-bold text-primary" onClick={close}>Área do Cliente</Link>
            </MobileSection>

            <Link to="/blog" className="block py-3 px-3 text-[13px] font-semibold border-b" onClick={close}>Blog</Link>
            <Link to="/guias-seguros" className="block py-3 px-3 text-[13px] font-semibold border-b" onClick={close}>Central de Guias</Link>
            <Link to="/seguros-guarulhos" className="block py-3 px-3 text-[13px] font-semibold border-b" onClick={close}>Seguros em Guarulhos</Link>
            <Link to="/contato" className="block py-3 px-3 text-[13px] font-semibold border-b" onClick={close}>Contato</Link>
          </div>

        </div>
      )}
      {/* CTA FIXA CENTRAL DE SINISTRO - DESKTOP SIDE BAR & MOBILE FLOATING */}
    </header>
    {/*
      Floating sinistro CTAs are rendered as a sibling of <header>.
      Keep them OUTSIDE the header because the header uses `translate-*` for its
      scroll animation, which creates a containing block and would otherwise
      anchor `position: fixed` children to the header instead of the viewport.
    */}
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
        {/* Desktop: Barra fixa lateral/inferior para Central de Sinistro */}
        <div className="hidden lg:flex flex-col gap-2 group">
          <a 
            href={WHATSAPP_SINISTRO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("floating-desktop-sinistro")}
            className="flex items-center gap-3 bg-green-700 text-white shadow-xl rounded-full pl-4 pr-1.5 py-1.5 hover:bg-green-800 transition-[background-color,transform] translate-x-[calc(100%-48px)] hover:translate-x-0 focus-visible:translate-x-0"
          >
            <span className="text-xs font-bold whitespace-nowrap">WhatsApp de Emergência</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-600">
              <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M16.003 3C9.374 3 4 8.373 4 15.002c0 2.295.638 4.531 1.847 6.476L4 29l7.706-1.819a12.94 12.94 0 0 0 4.297.736h.005C22.637 27.917 28 22.544 28 15.915 28 12.7 26.748 9.681 24.471 7.404 22.193 5.126 19.218 3 16.003 3Zm0 21.832h-.004a10.78 10.78 0 0 1-5.493-1.503l-.394-.234-4.575 1.08 1.099-4.46-.257-.41a10.78 10.78 0 0 1-1.65-5.752c0-5.962 4.851-10.813 10.815-10.813 2.888 0 5.604 1.126 7.646 3.17a10.74 10.74 0 0 1 3.168 7.65c-.001 5.962-4.853 10.272-10.355 10.272Zm5.93-8.094c-.325-.163-1.924-.949-2.222-1.057-.298-.108-.515-.163-.732.163-.217.325-.84 1.057-1.03 1.275-.19.217-.379.244-.704.081-.325-.163-1.372-.506-2.614-1.613-.966-.862-1.618-1.927-1.808-2.252-.19-.325-.02-.5.143-.663.147-.146.325-.379.488-.569.163-.19.217-.325.325-.542.108-.217.054-.407-.027-.569-.081-.163-.732-1.765-1.003-2.418-.264-.635-.533-.549-.732-.559l-.624-.011a1.2 1.2 0 0 0-.867.407c-.298.325-1.139 1.113-1.139 2.715 0 1.602 1.165 3.15 1.328 3.367.163.217 2.293 3.502 5.555 4.911.776.335 1.382.535 1.853.685.778.247 1.487.213 2.047.13.625-.093 1.924-.787 2.196-1.547.272-.76.272-1.41.19-1.547-.081-.135-.298-.217-.624-.379Z"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </>
  );
});

Header.displayName = "Header";

export default Header;
