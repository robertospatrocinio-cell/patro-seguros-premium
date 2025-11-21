import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:1151997500" className="flex items-center gap-2 hover:opacity-80 transition-base">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">(11) 5199-7500</span>
              </a>
              <a href="mailto:contato@patroseguros.com.br" className="flex items-center gap-2 hover:opacity-80 transition-base">
                <Mail className="h-4 w-4" />
                <span className="hidden md:inline">contato@patroseguros.com.br</span>
              </a>
            </div>
            <div className="text-xs">
              📍 Guarulhos/SP - Atendimento Personalizado
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-bold text-2xl text-primary">Patro Seguros</div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-base">
              Início
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary transition-base">
                Seguros Pessoais
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-base">
                <Link to="/seguro-auto" className="block px-4 py-2 text-sm hover:bg-muted">Seguro Auto</Link>
                <Link to="/seguro-vida" className="block px-4 py-2 text-sm hover:bg-muted">Seguro de Vida</Link>
                <Link to="/seguro-residencial" className="block px-4 py-2 text-sm hover:bg-muted">Seguro Residencial</Link>
                <Link to="/seguro-viagem" className="block px-4 py-2 text-sm hover:bg-muted">Seguro Viagem</Link>
                <Link to="/seguro-fianca" className="block px-4 py-2 text-sm hover:bg-muted">Seguro Fiança</Link>
                <Link to="/previdencia-privada" className="block px-4 py-2 text-sm hover:bg-muted">Previdência Privada</Link>
                <Link to="/seguro-moto" className="block px-4 py-2 text-sm hover:bg-muted">Seguro Moto</Link>
                <Link to="/seguro-saude" className="block px-4 py-2 text-sm hover:bg-muted">Seguro Saúde</Link>
                <Link to="/seguro-odonto" className="block px-4 py-2 text-sm hover:bg-muted">Seguro Odonto</Link>
              </div>
            </div>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary transition-base">
                Seguros Empresariais
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-base">
                <Link to="/seguro-empresarial" className="block px-4 py-2 text-sm hover:bg-muted">Seguro Empresarial</Link>
                <Link to="/seguro-frota" className="block px-4 py-2 text-sm hover:bg-muted">Seguro de Frota</Link>
                <Link to="/seguro-transporte" className="block px-4 py-2 text-sm hover:bg-muted">Seguro de Transporte</Link>
                <Link to="/seguro-rural" className="block px-4 py-2 text-sm hover:bg-muted">Seguro Rural</Link>
                <Link to="/seguro-maquinas" className="block px-4 py-2 text-sm hover:bg-muted">Seguro de Máquinas</Link>
                <Link to="/seguro-rc" className="block px-4 py-2 text-sm hover:bg-muted">Responsabilidade Civil</Link>
                <Link to="/seguro-rc-profissional" className="block px-4 py-2 text-sm hover:bg-muted">RC Profissional</Link>
                <Link to="/seguro-condominio" className="block px-4 py-2 text-sm hover:bg-muted">Seguro Condomínio</Link>
                <Link to="/seguro-engenharia" className="block px-4 py-2 text-sm hover:bg-muted">Seguro Engenharia</Link>
                <Link to="/seguro-cyber" className="block px-4 py-2 text-sm hover:bg-muted">Seguro Cyber</Link>
              </div>
            </div>
            <Link to="/parceiros" className="text-sm font-medium hover:text-primary transition-base">
              Parceiros
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-primary transition-base">
              Blog
            </Link>
            <Link to="/sobre" className="text-sm font-medium hover:text-primary transition-base">
              Quem Somos
            </Link>
            <Link to="/contato" className="text-sm font-medium hover:text-primary transition-base">
              Contato
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/cotacao">
              <Button variant="default">Pedir Cotação</Button>
            </Link>
            <a href="https://wa.me/5511519975000" target="_blank" rel="noopener noreferrer">
              <Button variant="cta">WhatsApp</Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Início
            </Link>
            <div className="py-2">
              <div className="font-medium text-sm mb-2">Seguros Pessoais</div>
              <div className="pl-4 space-y-2">
                <Link to="/seguro-auto" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro Auto</Link>
                <Link to="/seguro-vida" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro de Vida</Link>
                <Link to="/seguro-residencial" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro Residencial</Link>
                <Link to="/seguro-viagem" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro Viagem</Link>
                <Link to="/seguro-fianca" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro Fiança</Link>
                <Link to="/previdencia-privada" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Previdência Privada</Link>
                <Link to="/seguro-moto" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro Moto</Link>
                <Link to="/seguro-saude" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro Saúde</Link>
                <Link to="/seguro-odonto" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro Odonto</Link>
              </div>
            </div>
            <div className="py-2">
              <div className="font-medium text-sm mb-2">Seguros Empresariais</div>
              <div className="pl-4 space-y-2">
                <Link to="/seguro-empresarial" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro Empresarial</Link>
                <Link to="/seguro-frota" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro de Frota</Link>
                <Link to="/seguro-transporte" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro de Transporte</Link>
                <Link to="/seguro-rural" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro Rural</Link>
                <Link to="/seguro-maquinas" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro de Máquinas</Link>
                <Link to="/seguro-rc" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Responsabilidade Civil</Link>
                <Link to="/seguro-rc-profissional" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>RC Profissional</Link>
                <Link to="/seguro-condominio" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro Condomínio</Link>
                <Link to="/seguro-engenharia" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro Engenharia</Link>
                <Link to="/seguro-cyber" className="block py-1 text-sm" onClick={() => setIsMenuOpen(false)}>Seguro Cyber</Link>
              </div>
            </div>
            <Link to="/parceiros" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Parceiros
            </Link>
            <Link to="/blog" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/sobre" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Quem Somos
            </Link>
            <Link to="/contato" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Contato
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Link to="/cotacao">
                <Button variant="default" className="w-full">Pedir Cotação</Button>
              </Link>
              <a href="https://wa.me/5511519975000" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="cta" className="w-full">WhatsApp</Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
