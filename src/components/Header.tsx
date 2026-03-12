import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail, Instagram, Facebook, Linkedin, ChevronDown, Award } from "lucide-react";
import { Button } from "@/components/ui/button";


const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavDropdown = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="relative group">
      <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-base py-2">
        {label}
        <ChevronDown className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-base" />
      </button>
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-card rounded-2xl shadow-lg border p-2 backdrop-blur-xl">
          {children}
        </div>
      </div>
    </div>
  );

  const DropLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={to} className="block px-3 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-primary-light rounded-xl transition-base">
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Slim top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-1.5 text-xs">
            <div className="flex items-center gap-4">
              <a href="tel:1151997500" className="flex items-center gap-1.5 hover:opacity-80 transition-base">
                <Phone className="h-3 w-3" />
                <span className="hidden sm:inline">(11) 5199-7500</span>
              </a>
              <a href="mailto:contato@patroseguros.com.br" className="flex items-center gap-1.5 hover:opacity-80 transition-base">
                <Mail className="h-3 w-3" />
                <span className="hidden md:inline">contato@patroseguros.com.br</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-400/20 border border-yellow-400/50 text-yellow-300 font-bold text-[10px] uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4), 0 0 8px rgba(251,191,36,0.3)' }}>
                <Award className="h-3 w-3 text-yellow-300 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" />
                Melhor Corretora de Guarulhos
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/patroseguros" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-base"><Instagram className="h-3.5 w-3.5" /></a>
              <a href="https://www.facebook.com/patroseguros" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-base"><Facebook className="h-3.5 w-3.5" /></a>
              <a href="https://www.linkedin.com/company/patro-seguros" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-base"><Linkedin className="h-3.5 w-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav - glassmorphism */}
      <div className="bg-background/80 backdrop-blur-xl border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-sm">P</span>
                </div>
                <span className="font-heading font-bold text-lg text-foreground">Patro <span className="text-primary">Seguros</span></span>
              </div>
            </Link>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-base px-3 py-2">Início</Link>

              <NavDropdown label="Seguros Pessoais">
                <DropLink to="/seguro-auto">Seguro Auto</DropLink>
                <DropLink to="/seguro-moto">Seguro Moto</DropLink>
                <DropLink to="/seguro-vida">Seguro de Vida</DropLink>
                <DropLink to="/seguro-residencial">Seguro Residencial</DropLink>
                <DropLink to="/seguro-viagem">Seguro Viagem</DropLink>
                <DropLink to="/seguro-celular">Seguro Celular</DropLink>
                <DropLink to="/seguro-fianca">Seguro Fiança</DropLink>
                <DropLink to="/seguro-fianca-locaticia">Fiança Locatícia</DropLink>
                <DropLink to="/seguro-acidentes-pessoais">Acidentes Pessoais</DropLink>
                <DropLink to="/seguro-estagiario">Seguro Estagiário</DropLink>
                <DropLink to="/previdencia-privada">Previdência Privada</DropLink>
                <DropLink to="/planos-de-saude">Planos de Saúde</DropLink>
                <DropLink to="/seguro-odonto">Plano Odontológico</DropLink>
              </NavDropdown>

              <NavDropdown label="Empresarial">
                <DropLink to="/seguro-empresarial">Seguro Empresarial</DropLink>
                <DropLink to="/seguro-caminhao">Seguro Caminhão</DropLink>
                <DropLink to="/seguro-frota">Seguro de Frota</DropLink>
                <DropLink to="/seguro-transporte">Seguro de Transporte</DropLink>
                <DropLink to="/seguro-rc">Responsabilidade Civil</DropLink>
                <DropLink to="/seguro-rc-profissional">RC Profissional</DropLink>
                <DropLink to="/seguro-condominio">Seguro Condomínio</DropLink>
                <DropLink to="/seguro-engenharia">Seguro Engenharia</DropLink>
                <DropLink to="/seguro-cyber">Seguro Cyber</DropLink>
                <DropLink to="/seguro-vida-pme">Vida PME</DropLink>
                <DropLink to="/seguro-lojas-shopping">Lojas de Shopping</DropLink>
              </NavDropdown>

              <NavDropdown label="Agro">
                <DropLink to="/seguro-maquinas-agricolas">Máquinas Agrícolas</DropLink>
                <DropLink to="/seguro-armazenagem">Seguro Armazenagem</DropLink>
                <DropLink to="/seguro-placa-solar">Seguro Placas Solar</DropLink>
                <DropLink to="/seguro-pecuario">Seguro Pecuário</DropLink>
                <DropLink to="/seguro-cafe">Seguro Café</DropLink>
                <DropLink to="/seguro-ambiental">Seguro Ambiental</DropLink>
                <DropLink to="/seguro-drone-agricola">Drone Agrícola</DropLink>
                <DropLink to="/seguro-transporte-agro">Transporte Agrícola</DropLink>
              </NavDropdown>

              <NavDropdown label="Especialidades">
                <DropLink to="/seguro-equipamentos-agricolas">Equipamentos Agrícolas</DropLink>
                <DropLink to="/seguro-galpoes-industriais">Galpões Industriais</DropLink>
                <DropLink to="/seguro-maquinas-industriais">Máquinas Industriais</DropLink>
                <DropLink to="/seguro-rural">Seguro Rural</DropLink>
              </NavDropdown>

              <Link to="/consorcio" className="text-sm font-medium text-foreground/80 hover:text-primary transition-base px-3 py-2">Consórcio</Link>
              <Link to="/blog" className="text-sm font-medium text-foreground/80 hover:text-primary transition-base px-3 py-2">Blog</Link>
              <Link to="/sobre" className="text-sm font-medium text-foreground/80 hover:text-primary transition-base px-3 py-2">Sobre</Link>
              <Link to="/contato" className="text-sm font-medium text-foreground/80 hover:text-primary transition-base px-3 py-2">Contato</Link>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <Link to="/cotacao">
                <Button size="sm" className="rounded-xl">Cotação</Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="cta" className="rounded-xl">WhatsApp</Button>
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-xl hover:bg-muted transition-base">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-1">
            <Link to="/" className="block py-2.5 px-3 text-sm font-medium rounded-xl hover:bg-muted transition-base" onClick={() => setIsMenuOpen(false)}>Início</Link>

            <div className="py-2 px-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Seguros Pessoais</p>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { to: "/seguro-auto", label: "Auto" },
                  { to: "/seguro-moto", label: "Moto" },
                  { to: "/seguro-vida", label: "Vida" },
                  { to: "/seguro-residencial", label: "Residencial" },
                  { to: "/seguro-viagem", label: "Viagem" },
                  { to: "/seguro-celular", label: "Celular" },
                  { to: "/planos-de-saude", label: "Saúde" },
                  { to: "/seguro-acidentes-pessoais", label: "Acid. Pessoais" },
                  { to: "/seguro-estagiario", label: "Estagiário" },
                  { to: "/previdencia-privada", label: "Previdência" },
                  { to: "/seguro-odonto", label: "Plano Odonto" },
                ].map(l => (
                  <Link key={l.to} to={l.to} className="py-2 px-3 text-sm rounded-lg hover:bg-muted transition-base" onClick={() => setIsMenuOpen(false)}>{l.label}</Link>
                ))}
              </div>
            </div>

            <div className="py-2 px-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Empresarial</p>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { to: "/seguro-empresarial", label: "Empresarial" },
                  { to: "/seguro-caminhao", label: "Caminhão" },
                  { to: "/seguro-frota", label: "Frota" },
                  { to: "/seguro-transporte", label: "Transporte" },
                  { to: "/seguro-rc", label: "RC" },
                  { to: "/seguro-condominio", label: "Condomínio" },
                  { to: "/seguro-cyber", label: "Cyber" },
                  { to: "/seguro-vida-pme", label: "Vida PME" },
                  { to: "/seguro-lojas-shopping", label: "Lojas Shopping" },
                ].map(l => (
                  <Link key={l.to} to={l.to} className="py-2 px-3 text-sm rounded-lg hover:bg-muted transition-base" onClick={() => setIsMenuOpen(false)}>{l.label}</Link>
                ))}
              </div>
            </div>

            <div className="py-2 px-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Agro</p>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { to: "/seguro-maquinas-agricolas", label: "Máq. Agrícolas" },
                  { to: "/seguro-armazenagem", label: "Armazenagem" },
                  { to: "/seguro-placa-solar", label: "Placas Solar" },
                  { to: "/seguro-pecuario", label: "Pecuário" },
                  { to: "/seguro-cafe", label: "Café" },
                  { to: "/seguro-ambiental", label: "Ambiental" },
                  { to: "/seguro-drone-agricola", label: "Drone Agrícola" },
                ].map(l => (
                  <Link key={l.to} to={l.to} className="py-2 px-3 text-sm rounded-lg hover:bg-muted transition-base" onClick={() => setIsMenuOpen(false)}>{l.label}</Link>
                ))}
              </div>
            </div>

            <Link to="/consorcio" className="block py-2.5 px-3 text-sm font-medium rounded-xl hover:bg-muted transition-base" onClick={() => setIsMenuOpen(false)}>Consórcio</Link>
            <Link to="/blog" className="block py-2.5 px-3 text-sm font-medium rounded-xl hover:bg-muted transition-base" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/sobre" className="block py-2.5 px-3 text-sm font-medium rounded-xl hover:bg-muted transition-base" onClick={() => setIsMenuOpen(false)}>Sobre</Link>
            <Link to="/contato" className="block py-2.5 px-3 text-sm font-medium rounded-xl hover:bg-muted transition-base" onClick={() => setIsMenuOpen(false)}>Contato</Link>

            <div className="flex gap-2 pt-3">
              <Link to="/cotacao" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full rounded-xl">Cotação</Button>
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
