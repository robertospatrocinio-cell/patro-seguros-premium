import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-foreground text-white/80" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center" aria-hidden="true">
                  <span className="text-white font-heading font-bold text-base">P</span>
                </div>
                <span className="font-heading font-bold text-xl text-white">Patro <span className="text-primary-foreground/80">Seguros</span></span>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-4 leading-relaxed max-w-sm">
              Corretora de seguros em Guarulhos. Comparamos as principais seguradoras para encontrar a melhor proteção para você, sua família e sua empresa.
            </p>
            <p className="text-xs text-white/40 mb-6">www.patroseguros.com.br</p>
            <div className="flex gap-3">
              {[
                { href: "https://www.instagram.com/patroseguros", icon: Instagram, label: "Patro Seguros no Instagram" },
                { href: "https://www.facebook.com/patroseguros", icon: Facebook, label: "Patro Seguros no Facebook" },
                { href: "https://www.linkedin.com/company/patro-seguros", icon: Linkedin, label: "Patro Seguros no LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-base" aria-label={label}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Links do site">
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: "/sobre", label: "Sobre Nós" },
                { to: "/blog", label: "Blog" },
                { to: "/parceiros", label: "Seguradoras Parceiras" },
                { to: "/indique-um-amigo", label: "Indique um Amigo" },
                { to: "/cotacao", label: "Solicitar Cotação" },
                { to: "/contato", label: "Fale Conosco" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="text-white/60 hover:text-white transition-base">{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Seguros */}
          <nav aria-label="Principais seguros">
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Seguros</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: "/seguro-auto", label: "Seguro Auto" },
                { to: "/seguro-vida", label: "Seguro de Vida" },
                { to: "/seguro-residencial", label: "Seguro Residencial" },
                { to: "/seguro-empresarial", label: "Seguro Empresarial" },
                { to: "/planos-de-saude", label: "Planos de Saúde" },
                { to: "/seguro-frota", label: "Seguro de Frota" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="text-white/60 hover:text-white transition-base">{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Contato</h4>
            <address className="not-italic">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5 text-white/60">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-white/40" aria-hidden="true" />
                  <span>Av. Salgado Filho, 2120<br />Sala 219 – Guarulhos/SP</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 flex-shrink-0 text-white/40" aria-hidden="true" />
                  <a href="tel:1151997500" className="text-white/60 hover:text-white transition-base">(11) 5199-7500</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 flex-shrink-0 text-white/40" aria-hidden="true" />
                  <a href="mailto:contato@patroseguros.com.br" className="text-white/60 hover:text-white transition-base">contato@patroseguros.com.br</a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p>© {new Date().getFullYear()} Patro Corretora de Seguros. Todos os direitos reservados.</p>
              <p>CNPJ: 41.641.558/0001-33 | SUSEP — Registro nº 211112427</p>
            </div>
            <div className="flex gap-6">
              <span className="text-white/40 cursor-default">Privacidade</span>
              <span className="text-white/40 cursor-default">Termos</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;