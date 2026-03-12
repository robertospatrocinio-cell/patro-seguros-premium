import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail, Instagram, Facebook, Linkedin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection(openMobileSection === section ? null : section);
  };

  const close = () => setIsMenuOpen(false);

  const MobileSection = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => {
    const isOpen = openMobileSection === id;
    return (
      <div className="border-b border-border/50 last:border-0">
        <button
          onClick={() => toggleMobileSection(id)}
          className="flex items-center justify-between w-full py-3 px-3 text-sm font-semibold text-foreground/90 hover:text-primary transition-base"
          aria-expanded={isOpen}
        >
          {label}
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        {isOpen && (
          <div className="pb-3 px-3 animate-fade-in">
            {children}
          </div>
        )}
      </div>
    );
  };

  const MobileSubLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2 mb-1 px-2">{children}</p>
  );

  const MobileLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={to} className="block py-1.5 px-2 text-sm text-foreground/70 hover:text-primary rounded-lg hover:bg-muted/50 transition-base" onClick={close}>
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Slim top bar */}
      <div className="bg-[hsl(220,40%,12%)] text-white/70">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-1.5 text-[11px]">
            <div className="flex items-center gap-4">
              <a href="tel:1151997500" className="flex items-center gap-1.5 hover:text-white transition-base" aria-label="Ligar para (11) 5199-7500">
                <Phone className="h-3 w-3" aria-hidden="true" />
                <span className="hidden sm:inline">(11) 5199-7500</span>
              </a>
              <a href="mailto:contato@patroseguros.com.br" className="flex items-center gap-1.5 hover:text-white transition-base" aria-label="Enviar e-mail para contato@patroseguros.com.br">
                <Mail className="h-3 w-3" aria-hidden="true" />
                <span className="hidden md:inline">contato@patroseguros.com.br</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-white/50 font-medium text-[10px] uppercase tracking-widest">
                SUSEP 211112427
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/patroseguros" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80 transition-base" aria-label="Patro Seguros no Instagram"><Instagram className="h-3.5 w-3.5" aria-hidden="true" /></a>
              <a href="https://www.facebook.com/patroseguros" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80 transition-base" aria-label="Patro Seguros no Facebook"><Facebook className="h-3.5 w-3.5" aria-hidden="true" /></a>
              <a href="https://www.linkedin.com/company/patro-seguros" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80 transition-base" aria-label="Patro Seguros no LinkedIn"><Linkedin className="h-3.5 w-3.5" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-[60px]" aria-label="Navegação principal">
            <Link to="/" className="flex items-center gap-2.5" aria-label="Patro Seguros — Página inicial">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center" aria-hidden="true">
                <span className="text-white font-heading font-bold text-sm">P</span>
              </div>
              <span className="font-heading font-bold text-lg text-foreground tracking-tight">Patro <span className="text-primary">Seguros</span></span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              <Link to="/" className="text-[13px] font-medium text-foreground/60 hover:text-primary transition-base px-3 py-2">Início</Link>

              {/* Pessoal — mega menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/60 hover:text-primary transition-base py-2 px-3" aria-haspopup="true">
                  Pessoal
                  <ChevronDown className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-base" aria-hidden="true" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[520px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-card rounded-2xl shadow-xl border p-5 backdrop-blur-xl">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Veículos</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-auto" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Auto</Link>
                          <Link to="/seguro-moto" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Moto</Link>
                          <Link to="/seguro-caminhao" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Caminhão</Link>
                          <Link to="/seguro-bike" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Bike</Link>
                          <Link to="/seguro-carta-verde" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Carta Verde</Link>
                        </div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 mt-4">Lazer</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-jetski" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Jet Ski</Link>
                          <Link to="/seguro-embarcacoes" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Embarcações</Link>
                          <Link to="/seguro-avioes" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Aviões</Link>
                          <Link to="/seguro-helicopteros" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Helicópteros</Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Vida e Saúde</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-vida" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro de Vida</Link>
                          <Link to="/planos-de-saude" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Planos de Saúde</Link>
                          <Link to="/seguro-odonto" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Plano Odontológico</Link>
                          <Link to="/seguro-acidentes-pessoais" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Acidentes Pessoais</Link>
                          <Link to="/previdencia-privada" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Previdência Privada</Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Patrimônio</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-residencial" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Residencial</Link>
                          <Link to="/seguro-celular" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Celular</Link>
                          <Link to="/seguro-viagem" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Viagem</Link>
                          <Link to="/seguro-fianca" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Fiança</Link>
                          <Link to="/seguro-fianca-locaticia" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Fiança Locatícia</Link>
                          <Link to="/seguro-estagiario" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Estagiário</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Empresarial — mega menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/60 hover:text-primary transition-base py-2 px-3" aria-haspopup="true">
                  Empresarial
                  <ChevronDown className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-base" aria-hidden="true" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[480px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-card rounded-2xl shadow-xl border p-5 backdrop-blur-xl">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Empresas</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-empresarial" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Empresarial</Link>
                          <Link to="/seguro-condominio" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Condomínio</Link>
                          <Link to="/seguro-lojas-shopping" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Lojas de Shopping</Link>
                          <Link to="/seguro-galpoes-industriais" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Galpões Industriais</Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Frotas e Transporte</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-frota" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro de Frota</Link>
                          <Link to="/seguro-transporte" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro de Transporte</Link>
                        </div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 mt-4">Industrial</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-maquinas" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Máquinas e Equip.</Link>
                          <Link to="/seguro-maquinas-industriais" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Máq. Industriais</Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Responsabilidade</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-rc" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">RC Geral</Link>
                          <Link to="/seguro-rc-profissional" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">RC Profissional</Link>
                          <Link to="/seguro-cyber" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Cyber</Link>
                          <Link to="/seguro-engenharia" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Engenharia</Link>
                        </div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 mt-4">Colaboradores</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-vida-pme" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Vida PME</Link>
                          <Link to="/seguro-estagiario" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Estagiário</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agro — mega menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-[13px] font-medium text-foreground/60 hover:text-primary transition-base py-2 px-3" aria-haspopup="true">
                  Agro
                  <ChevronDown className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-base" aria-hidden="true" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-card rounded-2xl shadow-xl border p-5 backdrop-blur-xl">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Máquinas e Equipamentos</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-maquinas-agricolas" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Máquinas Agrícolas</Link>
                          <Link to="/seguro-equipamentos-agricolas" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Equipamentos Agrícolas</Link>
                          <Link to="/seguro-drone-agricola" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Drone Agrícola</Link>
                          <Link to="/seguro-placa-solar" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Placas Solar</Link>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Produção e Transporte</p>
                        <div className="space-y-0.5">
                          <Link to="/seguro-rural" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Rural</Link>
                          <Link to="/seguro-pecuario" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Pecuário</Link>
                          <Link to="/seguro-cafe" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Café</Link>
                          <Link to="/seguro-armazenagem" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Armazenagem</Link>
                          <Link to="/seguro-transporte-agro" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Transporte Agrícola</Link>
                          <Link to="/seguro-ambiental" className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-base">Seguro Ambiental</Link>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                        Atendemos produtores rurais de todos os estados do Brasil
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/consorcio" className="text-[13px] font-medium text-foreground/60 hover:text-primary transition-base px-3 py-2">Consórcio</Link>
              <Link to="/blog" className="text-[13px] font-medium text-foreground/60 hover:text-primary transition-base px-3 py-2">Blog</Link>
              <Link to="/sobre" className="text-[13px] font-medium text-foreground/60 hover:text-primary transition-base px-3 py-2">Sobre</Link>
              <Link to="/contato" className="text-[13px] font-medium text-foreground/60 hover:text-primary transition-base px-3 py-2">Contato</Link>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <Link to="/cotacao">
                <Button size="sm" className="rounded-xl text-[13px] font-medium h-9">Cotação Grátis</Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="cta" className="rounded-xl text-[13px] font-medium h-9">WhatsApp</Button>
              </a>
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
            <Link to="/" className="block py-3 px-3 text-sm font-semibold text-foreground/90 hover:text-primary border-b border-border/50 transition-base" onClick={close}>
              Início
            </Link>

            <MobileSection id="pessoal" label="Seguros Pessoais">
              <MobileSubLabel>Veículos</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-auto">Auto</MobileLink>
                <MobileLink to="/seguro-moto">Moto</MobileLink>
                <MobileLink to="/seguro-caminhao">Caminhão</MobileLink>
                <MobileLink to="/seguro-bike">Bike</MobileLink>
                <MobileLink to="/seguro-carta-verde">Carta Verde</MobileLink>
              </div>
              <MobileSubLabel>Vida e Saúde</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-vida">Vida</MobileLink>
                <MobileLink to="/planos-de-saude">Planos de Saúde</MobileLink>
                <MobileLink to="/seguro-odonto">Plano Odonto</MobileLink>
                <MobileLink to="/seguro-acidentes-pessoais">Acid. Pessoais</MobileLink>
                <MobileLink to="/previdencia-privada">Previdência</MobileLink>
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
                <MobileLink to="/seguro-cyber">Cyber</MobileLink>
                <MobileLink to="/seguro-engenharia">Engenharia</MobileLink>
              </div>
              <MobileSubLabel>Industrial</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-maquinas">Máquinas e Equip.</MobileLink>
                <MobileLink to="/seguro-maquinas-industriais">Máq. Industriais</MobileLink>
              </div>
              <MobileSubLabel>Colaboradores</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-vida-pme">Vida PME</MobileLink>
                <MobileLink to="/seguro-estagiario">Estagiário</MobileLink>
              </div>
            </MobileSection>

            <MobileSection id="agro" label="Agro — Todo o Brasil">
              <MobileSubLabel>Máquinas e Equipamentos</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-maquinas-agricolas">Máq. Agrícolas</MobileLink>
                <MobileLink to="/seguro-equipamentos-agricolas">Equip. Agrícolas</MobileLink>
                <MobileLink to="/seguro-drone-agricola">Drone Agrícola</MobileLink>
                <MobileLink to="/seguro-placa-solar">Placas Solar</MobileLink>
              </div>
              <MobileSubLabel>Produção e Transporte</MobileSubLabel>
              <div className="grid grid-cols-2 gap-0.5">
                <MobileLink to="/seguro-rural">Rural</MobileLink>
                <MobileLink to="/seguro-pecuario">Pecuário</MobileLink>
                <MobileLink to="/seguro-cafe">Café</MobileLink>
                <MobileLink to="/seguro-armazenagem">Armazenagem</MobileLink>
                <MobileLink to="/seguro-transporte-agro">Transp. Agrícola</MobileLink>
                <MobileLink to="/seguro-ambiental">Ambiental</MobileLink>
              </div>
            </MobileSection>

            <Link to="/consorcio" className="block py-3 px-3 text-sm font-semibold text-foreground/90 hover:text-primary border-b border-border/50 transition-base" onClick={close}>Consórcio</Link>
            <Link to="/blog" className="block py-3 px-3 text-sm font-semibold text-foreground/90 hover:text-primary border-b border-border/50 transition-base" onClick={close}>Blog</Link>
            <Link to="/sobre" className="block py-3 px-3 text-sm font-semibold text-foreground/90 hover:text-primary border-b border-border/50 transition-base" onClick={close}>Sobre</Link>
            <Link to="/contato" className="block py-3 px-3 text-sm font-semibold text-foreground/90 hover:text-primary border-b border-border/50 transition-base" onClick={close}>Contato</Link>

            <div className="flex gap-2 pt-4 pb-2">
              <Link to="/cotacao" className="flex-1" onClick={close}>
                <Button className="w-full rounded-xl">Cotação Grátis</Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="cta" className="w-full rounded-xl">WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;