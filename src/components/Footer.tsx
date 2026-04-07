import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import logoFull from "@/assets/logo-full.webp";

const Footer = () => {
  return (
    <footer className="bg-foreground" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-5">
              <img src={logoFull} alt="Patro Seguros" width={251} height={140} className="h-20 object-contain brightness-200" loading="lazy" />
            </div>
            <p className="text-[13px] text-white/80 mb-6 leading-relaxed max-w-xs">
              Corretora de seguros em Guarulhos especializada em seguro auto, residencial, vida e empresarial. Comparamos as principais seguradoras para encontrar a melhor proteção pelo menor preço.
            </p>
            <div className="flex gap-2">
              {[
                { href: "https://www.instagram.com/patroseguros", icon: Instagram, label: "Instagram" },
                { href: "https://www.facebook.com/patroseguros", icon: Facebook, label: "Facebook" },
                { href: "https://www.linkedin.com/company/patro-seguros", icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center transition-base" aria-label={`Patro Seguros no ${label}`}>
                  <Icon className="h-3.5 w-3.5 text-white/70" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Links do site">
            <h3 className="font-heading font-semibold text-white/90 text-[11px] uppercase tracking-[0.1em] mb-5">Empresa</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/sobre", label: "Sobre" },
                { to: "/blog", label: "Blog" },
                { to: "/parceiros", label: "Parceiros" },
                { to: "/faq", label: "FAQ" },
                { to: "/indique-um-amigo", label: "Indique" },
                { to: "/depoimentos", label: "Depoimentos" },
                { to: "/contato", label: "Contato" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="text-[13px] text-white/70 hover:text-white/90 transition-base">{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Seguros */}
          <nav aria-label="Seguros em Guarulhos">
            <h3 className="font-heading font-semibold text-white/90 text-[11px] uppercase tracking-[0.1em] mb-5">Seguros em Guarulhos</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/seguro-auto", label: "Seguro Auto" },
                { to: "/seguro-residencial", label: "Seguro Residencial" },
                { to: "/seguro-vida", label: "Seguro de Vida" },
                { to: "/seguro-empresarial", label: "Seguro Empresarial" },
                { to: "/planos-de-saude", label: "Plano de Saúde" },
                { to: "/seguro-frota", label: "Seguro de Frota" },
                { to: "/cotacao", label: "Cotação Grátis" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="text-[13px] text-white/70 hover:text-white/90 transition-base">{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h3 className="font-heading font-semibold text-white/90 text-[11px] uppercase tracking-[0.1em] mb-5">Contato</h3>
            <address className="not-italic">
              <ul className="space-y-3 text-[13px]">
                <li className="flex items-start gap-2.5 text-white/70">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-white/60" aria-hidden="true" />
                  <span>Av. Salgado Filho, 2120<br />Ed. Via Alameda – Sala 219 — Cidade Maia, Guarulhos/SP</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0 text-white/60" aria-hidden="true" />
                  <a href="tel:1151997500" className="text-white/70 hover:text-white/90 transition-base">(11) 5199-7500</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 flex-shrink-0 text-white/60" aria-hidden="true" />
                  <a href="mailto:contato@patroseguros.com.br" className="text-white/70 hover:text-white/90 transition-base">contato@patroseguros.com.br</a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.08]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/70">
            <p className="text-[13px]">© {new Date().getFullYear()} Patro Corretora de Seguros · <span className="text-white/90 font-semibold">CNPJ 41.641.558/0001-33</span> · <span className="text-white/90 font-semibold">SUSEP 212113511</span></p>
            <div className="flex gap-6 text-[13px]">
              <Link to="/landing-pages" className="hover:text-white/90 transition-base">Campanhas</Link>
              <Link to="/politica-privacidade" className="hover:text-white/90 transition-base">Privacidade</Link>
              <Link to="/termos-de-uso" className="hover:text-white/90 transition-base">Termos</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
