import { useState, useMemo, memo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail, Instagram, Facebook, Linkedin, ChevronDown, MapPin, Search, Star, MessageCircle, PawPrint, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";
const logoFull = "/images/logo-full.webp";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [mobileSearch, setMobileSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

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

  // All mobile menu links for search filtering
  const allMobileLinks = useMemo(() => [
    { label: "Auto", to: "/seguro-auto", section: "pessoal" },
    { label: "Moto", to: "/seguro-moto", section: "pessoal" },
    { label: "Caminhão", to: "/seguro-caminhao", section: "pessoal" },
    { label: "Micro-ônibus", to: "/seguro-micro-onibus", section: "pessoal" },
    { label: "Bike", to: "/seguro-bike", section: "pessoal" },
    { label: "Carta Verde", to: "/seguro-carta-verde", section: "pessoal" },
    { label: "BMW", to: "/seguro-bmw", section: "pessoal" },
    { label: "Mercedes", to: "/seguro-mercedes", section: "pessoal" },
    { label: "Audi", to: "/seguro-audi", section: "pessoal" },
    { label: "Land Rover", to: "/seguro-land-rover", section: "pessoal" },
    { label: "Jaguar", to: "/seguro-jaguar", section: "pessoal" },
    { label: "Volvo", to: "/seguro-volvo", section: "pessoal" },
    { label: "Ferrari", to: "/seguro-ferrari", section: "pessoal" },
    { label: "Porsche", to: "/seguro-porsche", section: "pessoal" },
    { label: "BYD", to: "/seguro-byd", section: "pessoal" },
    { label: "GWM", to: "/seguro-gwm", section: "pessoal" },
    { label: "Lexus", to: "/seguro-lexus", section: "pessoal" },
    { label: "Motorista App", to: "/seguro-motorista-app", section: "pessoal" },

    { label: "Vida", to: "/seguro-vida", section: "pessoal" },
    { label: "Plano de Saúde", to: "/planos-de-saude", section: "pessoal" },
    { label: "Plano Odonto", to: "/seguro-odonto", section: "pessoal" },
    { label: "Plano Pet", to: "/plano-pet", section: "pessoal" },
    { label: "Acidentes Pessoais", to: "/seguro-acidentes-pessoais", section: "pessoal" },
    { label: "Previdência Privada", to: "/previdencia-privada", section: "pessoal" },
    { label: "Funeral", to: "/seguro-funeral", section: "pessoal" },
    { label: "Residencial", to: "/seguro-residencial", section: "pessoal" },
    { label: "Celular", to: "/seguro-celular", section: "pessoal" },
    { label: "Viagem", to: "/seguro-viagem", section: "pessoal" },
    { label: "Fiança", to: "/seguro-fianca", section: "pessoal" },
    { label: "Fiança Locatícia", to: "/seguro-fianca-locaticia", section: "pessoal" },
    { label: "Estagiário", to: "/seguro-estagiario", section: "pessoal" },
    { label: "Jet Ski", to: "/seguro-jetski", section: "pessoal" },
    { label: "Embarcações", to: "/seguro-embarcacoes", section: "pessoal" },
    { label: "Aviões", to: "/seguro-avioes", section: "pessoal" },
    { label: "Helicópteros", to: "/seguro-helicopteros", section: "pessoal" },
    { label: "Empresarial", to: "/seguro-empresarial", section: "empresarial" },
    { label: "Seguro Restaurante", to: "/seguro-restaurante", section: "empresarial" },
    { label: "Seguro Petshop", to: "/seguro-petshop", section: "empresarial" },
    { label: "Gerador de Energia", to: "/seguro-gerador-energia", section: "empresarial" },
    { label: "Condomínio Residencial", to: "/seguro-condominio-residencial", section: "empresarial" },
    { label: "Condomínio Empresarial", to: "/seguro-condominio-empresarial", section: "empresarial" },
    { label: "Imobiliário", to: "/seguro-imobiliario", section: "empresarial" },
    { label: "Lojas Shopping", to: "/seguro-lojas-shopping", section: "empresarial" },
    { label: "Galpões Industriais", to: "/seguro-galpoes-industriais", section: "empresarial" },
    { label: "Trator Industrial", to: "/seguro-trator-industrial", section: "empresarial" },
    { label: "Maquinários Industriais", to: "/seguro-maquinas-industriais", section: "empresarial" },
    { label: "Linha Amarela", to: "/seguro-maquinas-linha-amarela", section: "empresarial" },
    { label: "Frota", to: "/seguro-frota", section: "empresarial" },
    { label: "Transporte", to: "/seguro-transporte", section: "empresarial" },
    { label: "RC Geral", to: "/seguro-rc", section: "empresarial" },
    { label: "RC Profissional", to: "/seguro-rc-profissional", section: "empresarial" },
    { label: "RC Médicos", to: "/seguro-rc-medicos", section: "empresarial" },
    { label: "RC Dentistas", to: "/seguro-rc-dentistas", section: "empresarial" },
    { label: "RC Advogados", to: "/seguro-rc-advogados", section: "empresarial" },
    { label: "RC Engenheiros", to: "/seguro-rc-engenheiros", section: "empresarial" },
    { label: "Cyber", to: "/seguro-cyber", section: "empresarial" },
    { label: "Engenharia", to: "/seguro-engenharia", section: "empresarial" },
    { label: "Garantia", to: "/seguro-garantia", section: "empresarial" },
    { label: "Vida PME", to: "/seguro-vida-pme", section: "empresarial" },
    { label: "Saúde Empresarial", to: "/plano-saude-empresarial", section: "empresarial" },
    { label: "Trator Agrícola", to: "/seguro-trator-agricola", section: "agro" },
    { label: "Colhedora de Cana", to: "/seguro-colhedora-cana", section: "agro" },
    { label: "Colheitadeira de Grãos", to: "/seguro-colheitadeira-graos", section: "agro" },
    { label: "Colhedora de Algodão", to: "/seguro-colhedora-algodao", section: "agro" },
    { label: "Pulverizador Agrícola", to: "/seguro-pulverizador-agricola", section: "agro" },
    { label: "Máquinas Agrícolas", to: "/seguro-maquinas-agricolas", section: "agro" },
    { label: "Equipamentos Agrícolas", to: "/seguro-equipamentos-agricolas", section: "agro" },
    { label: "Drone Agrícola", to: "/seguro-drone-agricola", section: "agro" },
    { label: "Placas Solar", to: "/seguro-placa-solar", section: "agro" },
    { label: "Rural", to: "/seguro-rural", section: "agro" },
    { label: "Silo Agrícola", to: "/seguro-silo-agricola", section: "agro" },
    { label: "Propriedade Rural", to: "/seguro-propriedade-rural", section: "agro" },
    { label: "Pecuário", to: "/seguro-pecuario", section: "agro" },
    { label: "Granja", to: "/seguro-granja", section: "agro" },
    { label: "Café", to: "/seguro-cafe", section: "agro" },
    { label: "Consórcio Carro", to: "/consorcio-carro", section: "consorcio" },
    { label: "Consórcio Imóveis", to: "/consorcio-imoveis", section: "consorcio" },
    { label: "Consórcio Veículos Pesados", to: "/consorcio-veiculos-pesados", section: "consorcio" },
    { label: "John Deere", to: "/seguro-john-deere", section: "agro" },
    { label: "Valtra", to: "/seguro-valtra", section: "agro" },
    { label: "CASE", to: "/seguro-case", section: "agro" },
    { label: "New Holland", to: "/seguro-new-holland", section: "agro" },
    { label: "Mahindra", to: "/seguro-mahindra", section: "agro" },
    { label: "Massey Ferguson", to: "/seguro-massey-ferguson", section: "agro" },
    { label: "JACTO", to: "/seguro-jacto", section: "agro" },
    { label: "Lojistas Guarulhos", to: "/seguros-para-lojistas-guarulhos", section: "empresarial" },
    { label: "Shopping Maia", to: "/seguro-lojas-shopping-maia", section: "empresarial" },
    { label: "Internacional Shopping", to: "/seguro-lojas-shopping-internacional-guarulhos", section: "empresarial" },
    { label: "Shopping Bonsucesso", to: "/seguro-lojas-shopping-bonsucesso", section: "empresarial" },
    { label: "Blog Lojistas", to: "/blog/lojistas-e-franquias", section: "empresarial" },
    { label: "Vistoria Veicular", to: "/seguro-para-empresas-de-vistoria-veicular", section: "empresarial" },
    { label: "Seguro ECV", to: "/seguro-para-ecv", section: "empresarial" },
    { label: "Transferência Veicular", to: "/seguro-transferencia-veicular", section: "empresarial" },
    { label: "Inspeção Veicular", to: "/seguro-inspecao-veicular", section: "empresarial" },
    { label: "Vistoria Cautelar", to: "/seguro-vistoria-cautelar", section: "empresarial" },
    { label: "Despachantes e Vistorias", to: "/seguro-despachantes-e-vistorias", section: "empresarial" },
    { label: "Parceria Vistorias", to: "/parceria-vistorias-veiculares", section: "empresarial" },
    { label: "Auto Pós-Vistoria", to: "/seguro-auto-pos-vistoria", section: "pessoal" },
    { label: "Clínicas Odontológicas", to: "/seguros-para-clinicas-odontologicas", section: "empresarial" },
    { label: "Seguro para Dentistas", to: "/seguro-para-dentistas", section: "empresarial" },
    { label: "Consultório Odontológico", to: "/seguro-consultorio-odontologico", section: "empresarial" },
    { label: "Clínica Odontológica", to: "/seguro-clinica-odontologica", section: "empresarial" },
    { label: "Equipamentos Odontológicos", to: "/seguro-equipamentos-odontologicos", section: "empresarial" },
    { label: "Plano Saúde Clínicas", to: "/plano-saude-clinicas-odontologicas", section: "empresarial" },
    { label: "Vida Clínicas Odonto", to: "/seguro-vida-clinicas-odontologicas", section: "empresarial" },
    { label: "Parcerias Odontológicas", to: "/parcerias-clinicas-odontologicas", section: "empresarial" },
    { label: "Blog Odontologia", to: "/blog/odontologia", section: "empresarial" },
    { label: "Clínicas Veterinárias", to: "/seguros-para-clinicas-veterinarias", section: "empresarial" },
    { label: "Blog Veterinária", to: "/blog/clinicas-veterinarias", section: "empresarial" },
    { label: "Seguro para Veterinários", to: "/seguro-para-veterinarios", section: "empresarial" },
    { label: "Seguro Clínica Veterinária", to: "/seguro-clinica-veterinaria", section: "empresarial" },
    { label: "Seguro Hospital Veterinário", to: "/seguro-hospital-veterinario", section: "empresarial" },
    { label: "Seguro Equipamentos Veterinários", to: "/seguro-equipamentos-veterinarios", section: "empresarial" },
    { label: "Plano Saúde Clínicas Pet", to: "/plano-saude-clinicas-veterinarias", section: "empresarial" },
    { label: "Vida Clínicas Pet", to: "/seguro-vida-clinicas-veterinarias", section: "empresarial" },
    { label: "Parcerias Pet", to: "/parcerias-clinicas-veterinarias", section: "empresarial" },
    { label: "Área Pet Premium", to: "/protecao-pet-premium", section: "pessoal" },
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
          <div id={`mobile-section-${id}`} className="pb-3 px-3" role="region" aria-labelledby={`mobile-label-${id}`}>
            {children}
          </div>
        )}
      </div>
    );
  };

  const MobileSubLabel = ({ children }: { children: React.ReactNode }) => (
    <p id={`mobile-label-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`} className="text-[10px] font-medium text-foreground/60 uppercase tracking-[0.1em] mt-3 mb-1 px-2">{children}</p>
  );

  const MobileLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={to} className="block py-1.5 px-2 text-[13px] text-foreground/60 hover:text-primary rounded-md hover:bg-muted/50 transition-base" onClick={close}>
      {children}
    </Link>
  );

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'translate-y-[-32px] md:translate-y-[-36px]' : 'translate-y-0'}`}>
      {/* Top bar */}
      <div className="bg-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-1.5 text-[11px]">
            <div className="flex items-center gap-5">
              <div className="hidden lg:flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <div className="flex text-yellow-400">
                  <Star className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                  <Star className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                  <Star className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                  <Star className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                  <Star className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                </div>
                <span className="text-[10px] text-white font-bold">5.0 no Google</span>
              </div>
              <span className="hidden lg:flex items-center gap-1.5 text-white/60 text-[10px]">
                <MapPin className="h-3 w-3" aria-hidden="true" role="presentation" />
                Cidade Maia, Guarulhos/SP
              </span>
              <a href="tel:1151997500" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-base" aria-label="Ligar para (11) 5199-7500">
                <Phone className="h-3 w-3" aria-hidden="true" role="presentation" />
                <span className="hidden sm:inline">(11) 5199-7500</span>
              </a>
              <a href="mailto:contato@patroseguros.com.br" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-base" aria-label="Enviar e-mail">
                <Mail className="h-3 w-3" aria-hidden="true" role="presentation" />
                <span className="hidden md:inline">contato@patroseguros.com.br</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href={WHATSAPP_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white/60 hover:text-green-400 transition-base" 
                      aria-label="WhatsApp"
                      onClick={() => trackWhatsAppClick("header_top")}
                    >
                      <MessageCircle className="h-3 w-3" aria-hidden="true" role="presentation" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px] py-1 px-2">WhatsApp</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://www.tiktok.com/@patroseguros" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white/90 transition-base" aria-label="TikTok">
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                      </svg>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px] py-1 px-2">TikTok</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://www.instagram.com/patroseguros" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white/90 transition-base" aria-label="Instagram"><Instagram className="h-3 w-3" aria-hidden="true" role="presentation" /></a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px] py-1 px-2">Instagram</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://www.facebook.com/patroseguros" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white/90 transition-base" aria-label="Facebook"><Facebook className="h-3 w-3" aria-hidden="true" role="presentation" /></a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px] py-1 px-2">Facebook</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://www.linkedin.com/company/patro-seguros" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white/90 transition-base" aria-label="LinkedIn"><Linkedin className="h-3 w-3" aria-hidden="true" role="presentation" /></a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px] py-1 px-2">LinkedIn</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-background/95 md:backdrop-blur-xl border-b border-border/40 min-h-[64px]">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16" aria-label="Navegação principal">
               <Link 
                 to="/" 
                 className="flex items-center relative z-[60]" 
                 aria-label="Patro Seguros — Página inicial" 
                 onClick={() => window.scrollTo(0,0)}
               >
                  <img
                    src={logoFull}
                    alt="Patro Seguros"
                    width={160}
                    height={80}
                    className="h-20 w-auto object-contain -my-2 relative z-50 will-change-transform"
                    fetchPriority="high"
                    decoding="async"
                    loading="eager"
                  />
               </Link>


            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              <Link to="/" className="text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base px-3 py-2">Início</Link>

              {/* Para você — mega menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base py-2 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-haspopup="menu" aria-expanded="false">
                  Para você
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" aria-hidden="true" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[520px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-3">Mobilidade e Vida</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-auto" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro Auto</Link>
                          <Link to="/seguro-moto" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro Moto</Link>
                          <Link to="/seguro-vida" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro de Vida</Link>
                          <Link to="/planos-de-saude" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Plano de Saúde</Link>
                          <Link to="/seguro-viagem" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro Viagem</Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-3">Patrimônio e Outros</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-residencial" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro Residencial</Link>
                          <Link to="/seguro-celular" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro Celular</Link>
                          <Link to="/seguro-motorista-app" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Motorista de Aplicativo</Link>
                          <Link to="/consorcio" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Consórcio</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Para sua empresa — mega menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base py-2 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-haspopup="menu" aria-expanded="false">
                  Para sua empresa
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" aria-hidden="true" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[580px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-3">Proteção Empresarial</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-empresarial" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro Empresarial</Link>
                          <Link to="/seguro-frota" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro Frota</Link>
                          <Link to="/seguro-transporte" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Transporte e Carga</Link>
                          <Link to="/nicho-transportadoras" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro para Transportadoras</Link>
                          <Link to="/seguro-galpoes-industriais" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro para Galpões</Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-3">Riscos e Benefícios</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-rc" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Responsabilidade Civil</Link>
                          <Link to="/seguro-cyber" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro Cyber</Link>
                          <Link to="/plano-saude-empresarial" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Plano de Saúde PME</Link>
                          <Link to="/seguro-vida-pme" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro de Vida em Grupo</Link>
                          <Link to="/seguro-maquinas" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Máquinas e Equipamentos</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agronegócio — mega menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base py-2 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-haspopup="menu" aria-expanded="false">
                  Agronegócio
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" aria-hidden="true" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <div className="space-y-0.5">
                      <Link to="/seguro-rural" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro Rural</Link>
                      <Link to="/seguro-maquinas-agricolas" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Máquinas Agrícolas</Link>
                      <Link to="/seguro-equipamentos-agricolas" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Equipamentos</Link>
                      <Link to="/seguro-propriedade-rural" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Propriedade Rural</Link>
                      <Link to="/seguro-pecuario" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro Pecuário</Link>
                      <Link to="/seguro-transporte-agro" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Transporte Agro</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Atendimento — mega menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base py-2 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-haspopup="menu" aria-expanded="false">
                  Atendimento
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" aria-hidden="true" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <div className="space-y-0.5">
                      <Link to="/cotacao" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Solicitar Cotação</Link>
                      <Link to="/contato" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Renovar Seguro</Link>
                      <Link to="/contato" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Acionar Sinistro</Link>
                      <Link to="/contato" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Assistência 24h</Link>
                      <Link to="/contato" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Segunda Via</Link>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Falar com Consultor</a>
                      <Link to="/crm" className="block py-1 text-[13px] font-semibold text-primary hover:text-primary/80 transition-base">Área do Cliente</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conteúdo — mega menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base py-2 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-haspopup="menu" aria-expanded="false">
                  Conteúdo
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" aria-hidden="true" />
                </button>
                <div className="absolute top-full right-0 pt-2 w-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <div className="space-y-0.5">
                      <Link to="/blog" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Blog</Link>
                      <Link to="/imprensa" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Guias</Link>
                      <Link to="/" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Calculadoras</Link>
                      <Link to="/faq" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Perguntas Frequentes</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                          <Link to="/seguro-rc-engenheiros" className="block py-1 text-[13px] text-foreground/50 hover:text-foreground transition-base">RC Engenheiros</Link>
                          <Link to="/seguro-rc-veterinarios" className="block py-1 text-[13px] text-foreground/50 hover:text-foreground transition-base">RC Veterinários</Link>
                          <Link to="/seguro-rc-executivos" className="block py-1 text-[13px] text-foreground/50 hover:text-foreground transition-base">RC Executivos (D&O)</Link>
                          <Link to="/seguro-rc-obras" className="block py-1 text-[13px] text-foreground/50 hover:text-foreground transition-base">RC Obras</Link>
                          <Link to="/seguro-rc-prestacao-servicos" className="block py-1 text-[13px] text-foreground/50 hover:text-foreground transition-base">RC Prest. Serviços</Link>
                          <Link to="/seguro-rc-eventos" className="block py-1 text-[13px] text-foreground/50 hover:text-foreground transition-base">RC Eventos</Link>
                          <Link to="/seguro-cyber" className="block py-1 text-[13px] text-foreground/50 hover:text-foreground transition-base">Cyber</Link>
                          <Link to="/seguro-engenharia" className="block py-1 text-[13px] text-foreground/50 hover:text-foreground transition-base">Engenharia</Link>
                          <Link to="/seguro-garantia" className="block py-1 text-[13px] text-foreground/50 hover:text-foreground transition-base">Garantia</Link>
                        </div>
                        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-2 mt-4">Pessoas</p>
                        <div className="space-y-0.5">
                         <Link to="/seguro-vida-pme" className="block py-1 text-[13px] text-foreground/50 hover:text-foreground transition-base">Vida PME</Link>
                          <Link to="/seguro-decesso" className="block py-1 text-[13px] text-foreground/50 hover:text-foreground transition-base">Decesso</Link>
                          <Link to="/plano-saude-empresarial" className="block py-1 text-[13px] text-foreground/50 hover:text-foreground transition-base">Saúde Empresarial</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agro — mega menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/50 hover:text-foreground transition-base py-2 px-3" aria-haspopup="true">
                  Agro
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" aria-hidden="true" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[520px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <div className="grid grid-cols-3 gap-5">
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-2">Máquinas</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-trator-agricola" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Trator Agrícola</Link>
                          <Link to="/seguro-colhedora-cana" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Colhedora de Cana</Link>
                          <Link to="/seguro-colheitadeira-graos" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Colheitadeira de Grãos</Link>
                          <Link to="/seguro-colhedora-algodao" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Colhedora de Algodão</Link>
                          <Link to="/seguro-pulverizador-agricola" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Pulverizador Agrícola</Link>
                          <Link to="/seguro-maquinas-agricolas" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Máquinas Agrícolas</Link>
                          <Link to="/seguro-equipamentos-agricolas" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Equipamentos</Link>
                          <Link to="/seguro-drone-agricola" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Drone</Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-2">Marcas Premium</p>
                        <div className="space-y-0.5">
                           <Link to="/seguro-john-deere" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">John Deere</Link>
                          <Link to="/seguro-valtra" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Valtra</Link>
                          <Link to="/seguro-case" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">CASE</Link>
                          <Link to="/seguro-new-holland" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">New Holland</Link>
                          <Link to="/seguro-mahindra" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Mahindra</Link>
                          <Link to="/seguro-massey-ferguson" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Massey Ferguson</Link>
                          <Link to="/seguro-jacto" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">JACTO</Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-2">Produção</p>
                        <div className="space-y-0.5">
                           <Link to="/seguro-rural" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Seguro Rural</Link>
                          <Link to="/seguro-propriedade-rural" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Propriedade Rural</Link>
                          <Link to="/seguro-silo-agricola" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Silo Agrícola</Link>
                          <Link to="/seguro-pecuario" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Pecuário</Link>
                          <Link to="/seguro-granja" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Granja</Link>
                          <Link to="/seguro-cafe" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Café</Link>
                          <Link to="/seguro-transporte-agro" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Transporte</Link>
                          <Link to="/seguro-placa-solar" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Placa Solar</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consórcio — mega menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/50 hover:text-foreground transition-base py-2 px-3" aria-haspopup="true">
                  Consórcio
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" aria-hidden="true" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-[0.1em] mb-2">Produtos</p>
                    <div className="space-y-0.5">
                      <Link to="/consorcio" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Visão Geral</Link>
                      <Link to="/consorcio-carro" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Carro</Link>
                      <Link to="/consorcio-imoveis" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Imóveis</Link>
                      <Link to="/consorcio-veiculos-pesados" className="block py-1 text-[13px] text-foreground/70 hover:text-foreground transition-base">Veículos Pesados</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Especialistas — mega menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/50 hover:text-foreground transition-base py-2 px-3" aria-haspopup="true">
                  Especialistas
                  <ChevronDown className="h-3 w-3 opacity-40 group-hover:opacity-70 transition-base" aria-hidden="true" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[480px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                  <div className="bg-card rounded-xl shadow-xl border p-5">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-[10px] font-medium text-primary uppercase tracking-[0.1em] mb-3 flex items-center gap-1.5">
                           <PawPrint className="h-3 w-3" /> Veterinária
                        </p>
                        <div className="space-y-0.5">
                          <Link to="/seguros-para-clinicas-veterinarias" className="block py-1 text-[13px] font-bold text-foreground hover:text-primary transition-base">Hub Veterinário</Link>
                          <Link to="/seguro-clinica-veterinaria" className="block py-1 text-[12px] text-foreground/60 hover:text-foreground transition-base">Clínica Veterinária</Link>
                          <Link to="/seguro-hospital-veterinario" className="block py-1 text-[12px] text-foreground/60 hover:text-foreground transition-base">Hospital Veterinário</Link>
                          <Link to="/responsabilidade-civil-veterinarios" className="block py-1 text-[12px] text-foreground/60 hover:text-foreground transition-base">RC Veterinário</Link>
                          <Link to="/seguro-pet-shop" className="block py-1 text-[12px] text-foreground/60 hover:text-foreground transition-base">Pet Shop</Link>
                          <Link to="/protecao-pet-premium" className="block py-1 text-[12px] text-primary/70 hover:text-primary transition-base italic">Área Pet Premium</Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-blue-600 uppercase tracking-[0.1em] mb-3 flex items-center gap-1.5">
                           <Stethoscope className="h-3 w-3" /> Odontologia
                        </p>
                        <div className="space-y-0.5">
                          <Link to="/seguros-para-clinicas-odontologicas" className="block py-1 text-[13px] font-bold text-foreground hover:text-primary transition-base">Hub Odontologia</Link>
                          <Link to="/seguro-clinica-odontologica" className="block py-1 text-[12px] text-foreground/60 hover:text-foreground transition-base">Clínica Odontológica</Link>
                          <Link to="/seguro-consultorio-odontologico" className="block py-1 text-[12px] text-foreground/60 hover:text-foreground transition-base">Consultório</Link>
                          <Link to="/responsabilidade-civil-dentistas" className="block py-1 text-[12px] text-foreground/60 hover:text-foreground transition-base">RC Dentista</Link>
                          <Link to="/seguro-equipamentos-odontologicos" className="block py-1 text-[12px] text-foreground/60 hover:text-foreground transition-base">Equipamentos</Link>
                        </div>
                        <p className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-[0.1em] mb-2 mt-4">Automotivo</p>
                        <div className="space-y-0.5">
                           <Link to="/seguro-para-empresas-de-vistoria-veicular" className="block py-1 text-[12px] text-foreground/60 hover:text-foreground transition-base">Vistoria Veicular (Hub)</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/blog" className="text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base px-3 py-2">Blog</Link>
              <Link to="/sobre" className="text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base px-3 py-2">Sobre</Link>
              <Link to="/contato" className="text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base px-3 py-2">Contato</Link>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <Link to="/cotacao" onClick={() => trackCotacaoClick("header-desktop")}>
                <Button size="sm" className="rounded-lg text-[12px] font-semibold h-8 px-4">Cotação Grátis</Button>
              </Link>
            </div>

            <button
              onClick={() => { setIsMenuOpen(!isMenuOpen); setOpenMobileSection(null); }}
              className="lg:hidden p-2 rounded-xl hover:bg-muted transition-base"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu de navegação"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile menu — accordion style */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b shadow-lg animate-fade-in max-h-[80vh] overflow-y-auto" role="navigation" aria-label="Menu mobile">
          <div className="container mx-auto px-4 py-2">
            {/* Search bar */}
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
              <input
                type="search"
                placeholder="Buscar seguro…"
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-[13px] bg-muted rounded-lg border-0 outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/40"
                autoComplete="off"
              />
            </div>

            {/* Search results */}
            {mobileSearch.trim() ? (
              <div className="py-2">
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-2 gap-0.5">
                    {searchResults.map((r) => (
                      <MobileLink key={r.to} to={r.to}>{r.label}</MobileLink>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-muted-foreground/60 text-center py-4">
                    Nenhum seguro encontrado para "{mobileSearch}"
                  </p>
                )}
              </div>
            ) : (
            <>
            <Link to="/" className="block py-3 px-3 text-sm font-semibold text-foreground/90 hover:text-primary border-b border-border/50 transition-base" onClick={close}>
              Início
            </Link>

            <MobileSection id="pessoal" label="Seguros Pessoais">
              <MobileSubLabel>Veículos</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-auto">Seguro Auto</MobileLink>
                <MobileLink to="/seguro-moto">Moto</MobileLink>
                <MobileLink to="/seguro-caminhao">Caminhão</MobileLink>
                <MobileLink to="/seguro-bike">Bike</MobileLink>
                <MobileLink to="/seguro-carta-verde">Carta Verde</MobileLink>
                <MobileLink to="/seguro-motorista-app">Motorista App</MobileLink>
              </div>
              <MobileSubLabel>Auto Premium</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-bmw">BMW</MobileLink>
                <MobileLink to="/seguro-mercedes">Mercedes-Benz</MobileLink>
                <MobileLink to="/seguro-audi">Audi</MobileLink>
                <MobileLink to="/seguro-porsche">Porsche</MobileLink>
                <MobileLink to="/seguro-land-rover">Land Rover</MobileLink>
                <MobileLink to="/seguro-jaguar">Jaguar</MobileLink>
                <MobileLink to="/seguro-volvo">Volvo</MobileLink>
                <MobileLink to="/seguro-ferrari">Ferrari</MobileLink>
                <MobileLink to="/seguro-byd">BYD</MobileLink>
                <MobileLink to="/seguro-gwm">GWM</MobileLink>
                <MobileLink to="/seguro-lexus">Lexus</MobileLink>
              </div>

              <MobileSubLabel>Marcas Populares</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-auto-jeep-guarulhos">Jeep</MobileLink>
                <MobileLink to="/seguro-auto-toyota-guarulhos">Toyota</MobileLink>
                <MobileLink to="/seguro-auto-honda-guarulhos">Honda</MobileLink>
                <MobileLink to="/seguro-auto-volkswagen-guarulhos">Volkswagen</MobileLink>
                <MobileLink to="/seguro-auto-fiat-guarulhos">Fiat</MobileLink>
                <MobileLink to="/seguro-auto-ford-guarulhos">Ford</MobileLink>
                <MobileLink to="/seguro-auto-chevrolet-guarulhos">Chevrolet</MobileLink>
                <MobileLink to="/seguro-auto-hyundai-guarulhos">Hyundai</MobileLink>
                <MobileLink to="/seguro-auto-nissan-guarulhos">Nissan</MobileLink>
                <MobileLink to="/seguro-auto-mitsubishi-guarulhos">Mitsubishi</MobileLink>
                <MobileLink to="/seguro-auto-renault-guarulhos">Renault</MobileLink>
                <MobileLink to="/seguro-auto-peugeot-guarulhos">Peugeot</MobileLink>
                <MobileLink to="/seguro-auto-citroen-guarulhos">Citroën</MobileLink>
                <MobileLink to="/seguro-auto-caoa-chery-guarulhos">Caoa Chery</MobileLink>
                <MobileLink to="/seguro-auto-gac-guarulhos">GAC</MobileLink>
              </div>
              <MobileSubLabel>Vida e Saúde</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-vida">Vida</MobileLink>
                <MobileLink to="/planos-de-saude">Planos de Saúde</MobileLink>
                <MobileLink to="/seguro-odonto">Plano Odonto</MobileLink>
                <MobileLink to="/plano-pet">Plano Pet</MobileLink>
                <MobileLink to="/seguro-acidentes-pessoais">Acid. Pessoais</MobileLink>
                <MobileLink to="/previdencia-privada">Previdência</MobileLink>
                <MobileLink to="/seguro-funeral">Funeral</MobileLink>
              </div>
              <MobileSubLabel>Patrimônio</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-residencial">Residencial</MobileLink>
                <MobileLink to="/seguro-celular">Celular</MobileLink>
                <MobileLink to="/seguro-viagem">Viagem</MobileLink>
                <MobileLink to="/seguro-fianca">Fiança</MobileLink>
                <MobileLink to="/seguro-fianca-locaticia">Fiança Locatícia</MobileLink>
                <MobileLink to="/seguro-estagiario">Estagiário</MobileLink>
              </div>
              <MobileSubLabel>Lazer</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-jetski">Jet Ski</MobileLink>
                <MobileLink to="/seguro-embarcacoes">Embarcações</MobileLink>
                <MobileLink to="/seguro-avioes">Aviões</MobileLink>
                <MobileLink to="/seguro-helicopteros">Helicópteros</MobileLink>
              </div>
            </MobileSection>

            <MobileSection id="empresarial" label="Empresarial">
              <MobileSubLabel>Empresas</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-empresarial">Empresarial</MobileLink>
                <MobileLink to="/seguro-condominio">Condomínio</MobileLink>
                <MobileLink to="/seguro-imobiliario">Imobiliário</MobileLink>
                <MobileLink to="/seguro-lojas-shopping">Lojas Shopping</MobileLink>
                <MobileLink to="/seguro-galpoes-industriais">Galpões Industriais</MobileLink>
              </div>
              <MobileSubLabel>Frotas e Transporte</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-frota">Frota</MobileLink>
                <MobileLink to="/seguro-transporte">Transporte</MobileLink>
              </div>
              <MobileSubLabel>Responsabilidade</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-rc">RC Geral</MobileLink>
                <MobileLink to="/seguro-rc-profissional">RC Profissional</MobileLink>
                <MobileLink to="/seguro-rc-medicos">RC Médicos</MobileLink>
                <MobileLink to="/seguro-rc-dentistas">RC Dentistas</MobileLink>
                <MobileLink to="/seguro-rc-advogados">RC Advogados</MobileLink>
                <MobileLink to="/seguro-rc-engenheiros">RC Engenheiros</MobileLink>
                <MobileLink to="/seguro-rc-veterinarios">RC Veterinários</MobileLink>
                <MobileLink to="/seguro-rc-executivos">RC Executivos (D&O)</MobileLink>
                <MobileLink to="/seguro-rc-obras">RC Obras</MobileLink>
                <MobileLink to="/seguro-rc-prestacao-servicos">RC Prest. Serviços</MobileLink>
                <MobileLink to="/seguro-rc-eventos">RC Eventos</MobileLink>
                <MobileLink to="/seguro-cyber">Cyber</MobileLink>
                <MobileLink to="/seguro-engenharia">Engenharia</MobileLink>
                <MobileLink to="/seguro-garantia">Garantia</MobileLink>
              </div>
              <MobileSubLabel>Industrial</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-maquinas">Máquinas e Equip.</MobileLink>
                <MobileLink to="/seguro-maquinas-industriais">Máq. Industriais</MobileLink>
                <MobileLink to="/seguro-maquinas-linha-amarela">Linha Amarela</MobileLink>
              </div>
              <MobileSubLabel>Colaboradores</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-vida-pme">Vida PME</MobileLink>
                <MobileLink to="/seguro-estagiario">Estagiário</MobileLink>
                <MobileLink to="/seguro-decesso">Decesso</MobileLink>
                <MobileLink to="/plano-saude-empresarial">Saúde Empresarial</MobileLink>
              </div>
            </MobileSection>

            <MobileSection id="agro" label="Agro — Especialistas">
              <MobileSubLabel>Máquinas e Equipamentos</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-trator-agricola">Trator Agrícola</MobileLink>
                <MobileLink to="/seguro-colhedora-cana">Colhedora Cana</MobileLink>
                <MobileLink to="/seguro-colheitadeira-graos">Colheitadeira Grãos</MobileLink>
                <MobileLink to="/seguro-colhedora-algodao">Colhedora Algodão</MobileLink>
                <MobileLink to="/seguro-pulverizador-agricola">Pulverizador</MobileLink>
                <MobileLink to="/seguro-maquinas-agricolas">Máq. Agrícolas</MobileLink>
                <MobileLink to="/seguro-equipamentos-agricolas">Equip. Agrícolas</MobileLink>
                <MobileLink to="/seguro-drone-agricola">Drone Agrícola</MobileLink>
              </div>
              <MobileSubLabel>Marcas Premium</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-john-deere">John Deere</MobileLink>
                <MobileLink to="/seguro-valtra">Valtra</MobileLink>
                <MobileLink to="/seguro-case">CASE</MobileLink>
                <MobileLink to="/seguro-new-holland">New Holland</MobileLink>
                <MobileLink to="/seguro-mahindra">Mahindra</MobileLink>
                <MobileLink to="/seguro-massey-ferguson">Massey Ferguson</MobileLink>
                <MobileLink to="/seguro-jacto">JACTO</MobileLink>
              </div>
              <MobileSubLabel>Produção e Rural</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-rural">Rural</MobileLink>
                <MobileLink to="/seguro-propriedade-rural">Propriedade Rural</MobileLink>
                <MobileLink to="/seguro-silo-agricola">Silo Agrícola</MobileLink>
                <MobileLink to="/seguro-pecuario">Pecuário</MobileLink>
                <MobileLink to="/seguro-granja">Granja</MobileLink>
                <MobileLink to="/seguro-cafe">Café</MobileLink>
                <MobileLink to="/seguro-transporte-agro">Transp. Agrícola</MobileLink>
                <MobileLink to="/seguro-placa-solar">Placas Solar</MobileLink>
              </div>
            </MobileSection>

            <MobileSection id="consorcio" label="Consórcio">
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/consorcio">Visão Geral</MobileLink>
                <MobileLink to="/consorcio-carro">Carro</MobileLink>
                <MobileLink to="/consorcio-imoveis">Imóveis</MobileLink>
                <MobileLink to="/consorcio-veiculos-pesados">Veículos Pesados</MobileLink>
              </div>
            </MobileSection>
            <MobileSection id="especialistas" label="Especialistas">
              <MobileSubLabel>Veterinária</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguros-para-clinicas-veterinarias">Hub Veterinário</MobileLink>
                <MobileLink to="/seguro-clinica-veterinaria">Clínica</MobileLink>
                <MobileLink to="/seguro-hospital-veterinario">Hospital</MobileLink>
                <MobileLink to="/seguro-rc-veterinarios">RC Veterinário</MobileLink>
                <MobileLink to="/seguro-pet-shop">Pet Shop</MobileLink>
                <MobileLink to="/protecao-pet-premium">Premium Pet</MobileLink>
              </div>
              <MobileSubLabel>Odontologia</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguros-para-clinicas-odontologicas">Hub Odonto</MobileLink>
                <MobileLink to="/seguro-clinica-odontologica">Clínica</MobileLink>
                <MobileLink to="/seguro-consultorio-odontologico">Consultório</MobileLink>
                <MobileLink to="/responsabilidade-civil-dentistas">RC Dentista</MobileLink>
                <MobileLink to="/seguro-equipamentos-odontologicos">Equipamentos</MobileLink>
              </div>
              <MobileSubLabel>Outros</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-para-empresas-de-vistoria-veicular">Hub Vistoria</MobileLink>
              </div>
            </MobileSection>
            <Link to="/blog" className="block py-3 px-3 text-[13px] font-semibold text-foreground hover:text-primary border-b border-border/50 transition-base" onClick={close}>Blog</Link>
            <Link to="/sobre" className="block py-3 px-3 text-[13px] font-semibold text-foreground hover:text-primary border-b border-border/50 transition-base" onClick={close}>Sobre</Link>
            <Link to="/contato" className="block py-3 px-3 text-[13px] font-semibold text-foreground hover:text-primary border-b border-border/50 transition-base" onClick={close}>Contato</Link>

            <div className="pt-4 pb-2">
              <Link to="/cotacao" className="block" onClick={() => { trackCotacaoClick("header-mobile"); close(); }}>
                <Button className="w-full rounded-lg text-[13px] h-10">Solicitar Cotação Grátis</Button>
              </Link>
            </div>
            </>
            )}
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;