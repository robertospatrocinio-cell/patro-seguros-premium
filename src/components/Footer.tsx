import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-foreground text-white/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logoPatron} alt="Patro Seguros" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-white/60 mb-4 leading-relaxed max-w-sm">
              Proteção inteligente para você, sua família e sua empresa. A corretora de seguros que compara o mercado para encontrar a melhor solução.
            </p>
            <p className="text-xs text-white/40 mb-6">www.patroseguros.com.br</p>
            <div className="flex gap-3">
              {[
                { href: "https://www.instagram.com/patroseguros", icon: Instagram },
                { href: "https://www.facebook.com/patroseguros", icon: Facebook },
                { href: "https://www.linkedin.com/company/patro-seguros", icon: Linkedin },
              ].map(({ href, icon: Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-base">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: "/sobre", label: "Sobre" },
                { to: "/blog", label: "Blog" },
                { to: "/parceiros", label: "Seguradoras" },
                { to: "/indique-um-amigo", label: "Indique um Amigo" },
                { to: "/cotacao", label: "Cotação" },
                { to: "/contato", label: "Contato" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="text-white/60 hover:text-white transition-base">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Seguros */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Seguros</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: "/seguro-auto", label: "Seguro Auto" },
                { to: "/seguro-vida", label: "Seguro de Vida" },
                { to: "/seguro-residencial", label: "Residencial" },
                { to: "/seguro-empresarial", label: "Empresarial" },
                { to: "/planos-de-saude", label: "Planos de Saúde" },
                { to: "/seguro-frota", label: "Frota" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="text-white/60 hover:text-white transition-base">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-white/60">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-white/40" />
                <span>Av. Salgado Filho, 2120<br />Sala 219 – Guarulhos/SP</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 flex-shrink-0 text-white/40" />
                <a href="tel:1151997500" className="text-white/60 hover:text-white transition-base">(11) 5199-7500</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 flex-shrink-0 text-white/40" />
                <a href="mailto:contato@patroseguros.com.br" className="text-white/60 hover:text-white transition-base">contato@patroseguros.com.br</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>© {new Date().getFullYear()} Patro Corretora de Seguros. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <Link to="/privacidade" className="hover:text-white/70 transition-base">Privacidade</Link>
              <Link to="/termos" className="hover:text-white/70 transition-base">Termos</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
