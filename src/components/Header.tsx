import { useState, useMemo, memo, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Mail, Instagram, Facebook, Linkedin, ChevronDown, MapPin, Search, Star, MessageCircle, PawPrint, Stethoscope, RotateCcw, ArrowRight, User as UserIcon, Car, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";
import { toast } from "sonner";
import { logForgottenQuote } from "@/lib/quoteHistory";



const logoFull = "/images/logo-full.webp";
const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [mobileSearch, setMobileSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [recoverableSession, setRecoverableSession] = useState<{ key: string; type: string; name?: string; step?: number } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      
      let foundSession = null;

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
      
      setRecoverableSession(foundSession);
    };


    checkSessions();
    // Listen for storage changes in other tabs
    window.addEventListener('storage', checkSessions);
    // Also check on interval as state might change in same tab
    const interval = setInterval(checkSessions, 5000);
    
    return () => {
      window.removeEventListener('storage', checkSessions);
      clearInterval(interval);
    };
  }, []);

  const handleForgetClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (recoverableSession) {
      // Log to local history before removing
      const historyKey = "forgotten_quotes_history";
      const history = JSON.parse(localStorage.getItem(historyKey) || "[]");
      const newEntry = {
        type: recoverableSession.type,
        step: recoverableSession.step || 1,
        timestamp: new Date().toISOString(),
        key: recoverableSession.key
      };
      localStorage.setItem(historyKey, JSON.stringify([newEntry, ...history].slice(0, 50)));

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



  const allMobileLinks = useMemo(() => [
    { label: "Auto", to: "/seguro-auto", section: "pessoal" },
    { label: "Moto", to: "/seguro-moto", section: "pessoal" },
    { label: "Residencial", to: "/seguro-residencial", section: "pessoal" },
    { label: "Vida", to: "/seguro-vida", section: "pessoal" },
    { label: "Plano de Saúde", to: "/planos-de-saude", section: "pessoal" },
    { label: "Viagem", to: "/seguro-viagem", section: "pessoal" },
    { label: "Celular", to: "/seguro-celular", section: "pessoal" },
    { label: "Motorista App", to: "/seguro-motorista-app", section: "pessoal" },
    { label: "Consórcio", to: "/consorcio", section: "pessoal" },
    { label: "Empresarial", to: "/seguro-empresarial", section: "empresarial" },
    { label: "Frota", to: "/seguro-frota", section: "empresarial" },
    { label: "Transporte e Carga", to: "/seguro-transporte", section: "empresarial" },
    { label: "Transportadoras", to: "/nicho-transportadoras", section: "empresarial" },
    { label: "Galpões", to: "/seguro-galpoes-industriais", section: "empresarial" },
    { label: "Responsabilidade Civil", to: "/seguro-rc", section: "empresarial" },
    { label: "Cyber", to: "/seguro-cyber", section: "empresarial" },
    { label: "Saúde PME", to: "/plano-saude-empresarial", section: "empresarial" },
    { label: "Vida em Grupo", to: "/seguro-vida-pme", section: "empresarial" },
    { label: "Máquinas e Equip.", to: "/seguro-maquinas", section: "empresarial" },
    { label: "Rural", to: "/seguro-rural", section: "agro" },
    { label: "Máquinas Agrícolas", to: "/seguro-maquinas-agricolas", section: "agro" },
    { label: "Equipamentos", to: "/seguro-equipamentos-agricolas", section: "agro" },
    { label: "Propriedade Rural", to: "/seguro-propriedade-rural", section: "agro" },
    { label: "Pecuário", to: "/seguro-pecuario", section: "agro" },
    { label: "Transporte Agro", to: "/seguro-transporte-agro", section: "agro" },
  ], []);

  const searchResults = useMemo(() => {
    if (!mobileSearch.trim()) return [];
    const q = mobileSearch.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return allMobileLinks.filter(link =>
      link.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(q)
    );
  }, [mobileSearch, allMobileLinks]);

  const toggleMobileSection = useCallback((section: string) => {
    setOpenMobileSection(prev => prev === section ? null : section);
  }, []);

  const close = useCallback(() => { 
    setIsMenuOpen(false); 
    setMobileSearch(""); 
  }, []);

  const MobileSection = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => {
    const isOpen = openMobileSection === id;
    return (
      <div className="border-b border-border/50 last:border-0">
        <button
          onClick={() => toggleMobileSection(id)}
          className="flex items-center justify-between w-full py-3 px-3 text-[13px] font-semibold text-foreground hover:text-primary transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-expanded={isOpen}
          aria-controls={`mobile-section-${id}`}
        >
          {label}
          <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        {isOpen && (
          <div id={`mobile-section-${id}`} className="pb-3 px-3" role="region">
            {children}
          </div>
        )}
      </div>
    );
  };

  const MobileLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={to} className="block py-1.5 px-2 text-[13px] text-foreground/60 hover:text-primary rounded-md hover:bg-muted/50 transition-base" onClick={close}>
      {children}
    </Link>
  );

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'translate-y-[-32px] md:translate-y-[-36px]' : 'translate-y-0'}`}>
      <div className="bg-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-1.5 text-[11px]">
            <div className="flex items-center gap-5">
              <div className="hidden lg:flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-2.5 w-2.5 fill-current" aria-hidden="true" />)}
                </div>
                <span className="text-[10px] text-white font-bold">5.0 no Google</span>
              </div>
              <span className="hidden lg:flex items-center gap-1.5 text-white/60 text-[10px]">
                <MapPin className="h-3 w-3" aria-hidden="true" role="presentation" />
                Cidade Maia, Guarulhos/SP
              </span>
              <a href="tel:1151997500" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-base">
                <Phone className="h-3 w-3" aria-hidden="true" role="presentation" />
                <span className="hidden sm:inline">(11) 5199-7500</span>
              </a>
              <a href="mailto:contato@patroseguros.com.br" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-base">
                <Mail className="h-3 w-3" aria-hidden="true" role="presentation" />
                <span className="hidden md:inline">contato@patroseguros.com.br</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-green-400 transition-base" onClick={() => trackWhatsAppClick("header_top")}>
                      <MessageCircle className="h-3 w-3" aria-hidden="true" role="presentation" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px] py-1 px-2">WhatsApp</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background/95 md:backdrop-blur-xl border-b border-border/40 min-h-[64px]">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16" aria-label="Navegação principal">
            <Link to="/" className="flex items-center relative z-[60]" onClick={() => window.scrollTo(0,0)}>
              <img src={logoFull} alt="Patro Seguros" width={160} height={80} className="h-20 w-auto object-contain -my-2 relative z-50" />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              <Link to="/" className="text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base px-3 py-2">Início</Link>

              {/* Para você */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base py-2 px-3">
                  Para você
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[520px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-3">Mobilidade e Vida</p>
                        <div className="space-y-0.5 text-[13px]">
                          <Link to="/seguro-auto" className="block py-1 hover:text-primary">Seguro Auto</Link>
                          <Link to="/seguro-moto" className="block py-1 hover:text-primary">Seguro Moto</Link>
                          <Link to="/seguro-vida" className="block py-1 hover:text-primary">Seguro de Vida</Link>
                          <Link to="/planos-de-saude" className="block py-1 hover:text-primary">Plano de Saúde</Link>
                          <Link to="/seguro-viagem" className="block py-1 hover:text-primary">Seguro Viagem</Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-3">Patrimônio e Outros</p>
                        <div className="space-y-0.5 text-[13px]">
                          <Link to="/seguro-residencial" className="block py-1 hover:text-primary">Seguro Residencial</Link>
                          <Link to="/seguro-celular" className="block py-1 hover:text-primary">Seguro Celular</Link>
                          <Link to="/seguro-motorista-app" className="block py-1 hover:text-primary">Motorista de Aplicativo</Link>
                          <Link to="/consorcio" className="block py-1 hover:text-primary">Consórcio</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Para sua empresa */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base py-2 px-3">
                  Para sua empresa
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[580px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-3">Proteção Empresarial</p>
                        <div className="space-y-0.5 text-[13px]">
                          <Link to="/seguro-empresarial" className="block py-1 hover:text-primary">Seguro Empresarial</Link>
                          <Link to="/seguro-frota" className="block py-1 hover:text-primary">Seguro Frota</Link>
                          <Link to="/seguro-transporte" className="block py-1 hover:text-primary">Transporte e Carga</Link>
                          <Link to="/nicho-transportadoras" className="block py-1 hover:text-primary">Seguro para Transportadoras</Link>
                          <Link to="/seguro-galpoes-industriais" className="block py-1 hover:text-primary">Seguro para Galpões</Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-3">Riscos e Benefícios</p>
                        <div className="space-y-0.5 text-[13px]">
                          <Link to="/seguro-rc" className="block py-1 hover:text-primary">Responsabilidade Civil</Link>
                          <Link to="/seguro-cyber" className="block py-1 hover:text-primary">Seguro Cyber</Link>
                          <Link to="/plano-saude-empresarial" className="block py-1 hover:text-primary">Plano de Saúde PME</Link>
                          <Link to="/seguro-vida-pme" className="block py-1 hover:text-primary">Seguro de Vida em Grupo</Link>
                          <Link to="/seguro-maquinas" className="block py-1 hover:text-primary">Máquinas e Equipamentos</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agronegócio */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base py-2 px-3">
                  Agronegócio
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <div className="space-y-0.5 text-[13px]">
                      <Link to="/seguro-rural" className="block py-1 hover:text-primary">Seguro Rural</Link>
                      <Link to="/seguro-maquinas-agricolas" className="block py-1 hover:text-primary">Máquinas Agrícolas</Link>
                      <Link to="/seguro-equipamentos-agricolas" className="block py-1 hover:text-primary">Equipamentos</Link>
                      <Link to="/seguro-propriedade-rural" className="block py-1 hover:text-primary">Propriedade Rural</Link>
                      <Link to="/seguro-pecuario" className="block py-1 hover:text-primary">Seguro Pecuário</Link>
                      <Link to="/seguro-transporte-agro" className="block py-1 hover:text-primary">Transporte Agro</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Atendimento */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base py-2 px-3">
                  Atendimento
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <div className="space-y-0.5 text-[13px]">
                      <Link to="/cotacao" className="block py-1 hover:text-primary">Solicitar Cotação</Link>
                      <Link to="/contato" className="block py-1 hover:text-primary">Renovar Seguro</Link>
                      <Link to="/contato" className="block py-1 hover:text-primary">Acionar Sinistro</Link>
                      <Link to="/contato" className="block py-1 hover:text-primary">Assistência 24h</Link>
                      <Link to="/contato" className="block py-1 hover:text-primary">Segunda Via</Link>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block py-1 hover:text-primary">Falar com Consultor</a>
                      <Link to="/crm" className="block py-1 font-semibold text-primary">Área do Cliente</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base py-2 px-3">
                  Conteúdo
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" />
                </button>
                <div className="absolute top-full right-0 pt-2 w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <div className="space-y-0.5 text-[13px]">
                      <Link to="/blog" className="block py-1 hover:text-primary">Blog</Link>
                      <Link to="/imprensa" className="block py-1 hover:text-primary">Guias</Link>
                      <Link to="/faq" className="block py-1 hover:text-primary">Perguntas Frequentes</Link>
                    </div>
                  </div>
                </div>
              </div>
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
              <Link to="/cotacao" onClick={() => trackCotacaoClick("header-desktop")}>
                <Button size="sm" className="rounded-lg text-[12px] font-semibold h-8 px-4">Cotação Grátis</Button>
              </Link>
            </div>


            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b shadow-lg max-h-[80vh] overflow-y-auto p-4">
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


          <div className="relative mb-4">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            <input
              type="search"
              placeholder="Buscar seguro…"
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-[13px] bg-muted rounded-lg border-0"
            />
          </div>

          <div className="space-y-1">
            <MobileSection id="você" label="Para você">
              <MobileLink to="/seguro-auto">Seguro Auto</MobileLink>
              <MobileLink to="/seguro-moto">Seguro Moto</MobileLink>
              <MobileLink to="/seguro-residencial">Seguro Residencial</MobileLink>
              <MobileLink to="/seguro-vida">Seguro de Vida</MobileLink>
              <MobileLink to="/planos-de-saude">Plano de Saúde</MobileLink>
              <MobileLink to="/consorcio">Consórcio</MobileLink>
            </MobileSection>

            <MobileSection id="empresa" label="Para sua empresa">
              <MobileLink to="/seguro-empresarial">Seguro Empresarial</MobileLink>
              <MobileLink to="/seguro-frota">Seguro Frota</MobileLink>
              <MobileLink to="/seguro-transporte">Transporte e Carga</MobileLink>
              <MobileLink to="/plano-saude-empresarial">Plano de Saúde PME</MobileLink>
            </MobileSection>

            <MobileSection id="agro" label="Agronegócio">
              <MobileLink to="/seguro-rural">Seguro Rural</MobileLink>
              <MobileLink to="/seguro-maquinas-agricolas">Máquinas Agrícolas</MobileLink>
            </MobileSection>

            <MobileSection id="atendimento" label="Atendimento">
              <MobileLink to="/cotacao">Solicitar Cotação</MobileLink>
              <MobileLink to="/contato">Renovar Seguro</MobileLink>
              <Link to="/crm" className="block py-2 px-2 text-[13px] font-bold text-primary" onClick={close}>Área do Cliente</Link>
            </MobileSection>

            <Link to="/blog" className="block py-3 px-3 text-[13px] font-semibold border-b" onClick={close}>Blog</Link>
            <Link to="/contato" className="block py-3 px-3 text-[13px] font-semibold border-b" onClick={close}>Contato</Link>
          </div>
        </div>
      )}
    </header>
  );
});

Header.displayName = "Header";

export default Header;
