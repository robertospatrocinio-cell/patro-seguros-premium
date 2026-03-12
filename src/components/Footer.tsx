import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import logoShield from "@/assets/logo-shield.png";
import logoText3d from "@/assets/logo-text-3d.png";

const Footer = () => {
  return (
    <footer className="bg-foreground" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-0.5 mb-5">
              <img src={logoShield} alt="" className="w-14 h-14 object-contain shrink-0" aria-hidden="true" />
              <img src={logoText3d} alt="Patro Seguros" className="h-10 object-contain brightness-200" />
            </div>
            <p className="text-[13px] text-white/60 mb-6 leading-relaxed max-w-xs">
              Corretora de seguros em Guarulhos. Comparamos as principais seguradoras para encontrar a melhor proteção pelo menor preço.
            </p>
            <div className="flex gap-2">
              {[
                { href: "https://www.instagram.com/patroseguros", icon: Instagram, label: "Instagram" },
                { href: "https://www.facebook.com/patroseguros", icon: Facebook, label: "Facebook" },
                { href: "https://www.linkedin.com/company/patro-seguros", icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center transition-base" aria-label={`Patro Seguros no ${label}`}>
                  <Icon className="h-3.5 w-3.5 text-white/50" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Links do site">
            <h4 className="font-heading font-semibold text-white/60 text-[11px] uppercase tracking-[0.1em] mb-5">Empresa</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/sobre", label: "Sobre" },
                { to: "/blog", label: "Blog" },
                { to: "/parceiros", label: "Parceiros" },
                { to: "/indique-um-amigo", label: "Indique" },
                { to: "/contato", label: "Contato" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="text-[13px] text-white/50 hover:text-white/80 transition-base">{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Seguros */}
          <nav aria-label="Principais seguros">
            <h4 className="font-heading font-semibold text-white/60 text-[11px] uppercase tracking-[0.1em] mb-5">Seguros</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/seguro-auto", label: "Auto" },
                { to: "/seguro-vida", label: "Vida" },
                { to: "/seguro-empresarial", label: "Empresarial" },
                { to: "/planos-de-saude", label: "Saúde" },
                { to: "/seguro-frota", label: "Frota" },
                { to: "/cotacao", label: "Cotação" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="text-[13px] text-white/50 hover:text-white/80 transition-base">{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h4 className="font-heading font-semibold text-white/60 text-[11px] uppercase tracking-[0.1em] mb-5">Contato</h4>
            <address className="not-italic">
              <ul className="space-y-3 text-[13px]">
                <li className="flex items-start gap-2.5 text-white/50">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-white/40" aria-hidden="true" />
                  <span>Av. Salgado Filho, 2120<br />Sala 219 — Guarulhos/SP</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0 text-white/40" aria-hidden="true" />
                  <a href="tel:1151997500" className="text-white/50 hover:text-white/80 transition-base">(11) 5199-7500</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 flex-shrink-0 text-white/40" aria-hidden="true" />
                  <a href="mailto:contato@patroseguros.com.br" className="text-white/50 hover:text-white/80 transition-base">contato@patroseguros.com.br</a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.08]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/40">
            <p>© {new Date().getFullYear()} Patro Corretora de Seguros · CNPJ 41.641.558/0001-33 · SUSEP 211112427</p>
            <div className="flex gap-6">
              <span className="cursor-default hover:text-white/60 transition-base">Privacidade</span>
              <span className="cursor-default hover:text-white/60 transition-base">Termos</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
