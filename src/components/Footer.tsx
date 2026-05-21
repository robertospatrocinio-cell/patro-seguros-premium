import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";
import FooterReviewsBadge from "@/components/FooterReviewsBadge";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";
import { memo } from "react";

const logoFull = "/images/logo-full.webp";

const Footer = memo(() => {
  return (
    <footer className="bg-foreground" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
           {/* Brand */}
           <div className="lg:col-span-2">
 
            <div className="flex items-center mb-5">
               <img src={logoFull} alt="Corretora de Seguros Patro em Guarulhos - Atendimento Presencial" width={251} height={140} className="h-20 object-contain brightness-200" loading="lazy" />
            </div>
            <p className="text-[13px] text-white/80 mb-6 leading-relaxed max-w-xs">
              Corretora de seguros em Guarulhos especializada em seguro auto, residencial, vida e empresarial. Comparamos as principais seguradoras para encontrar a melhor proteção pelo menor preço.
            </p>
            <div className="mb-6 max-w-xs">
              <FooterReviewsBadge />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <SeloMelhorCorretora size="sm" />
              <p className="text-[12px] text-white/70 leading-snug">
                Reconhecida como uma das <strong className="text-white/90">melhores corretoras de Guarulhos</strong> pelos nossos clientes.
              </p>
            </div>
            <div className="flex gap-2">
              {[
                { href: "https://wa.me/551151997500", icon: MessageCircle, label: "WhatsApp", color: "hover:bg-green-500/20", iconColor: "hover:text-green-500" },
                { href: "https://www.tiktok.com/@patroseguros", icon: "TikTok", label: "TikTok" },
                { href: "https://www.instagram.com/patroseguros", icon: Instagram, label: "Instagram" },
                { href: "https://www.facebook.com/patroseguros", icon: Facebook, label: "Facebook" },
                { href: "https://www.linkedin.com/company/patro-seguros", icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label, color, iconColor }) => (
                <a 
                  key={href} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center transition-base ${color || ''}`} 
                  aria-label={`Patro Seguros no ${label}`}
                  onClick={() => label === "WhatsApp" && trackWhatsAppClick("footer_social")}
                >
                  {typeof Icon === 'string' ? (
                    <svg className="h-3.5 w-3.5 fill-white/70" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                    </svg>
                  ) : (
                    <Icon className={`h-3.5 w-3.5 text-white/70 ${iconColor || ''}`} aria-hidden="true" />
                  )}
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

          {/* Local Hub */}
          <nav aria-label="Bairros atendidos em Guarulhos">
            <h3 className="font-heading font-semibold text-white/90 text-[11px] uppercase tracking-[0.1em] mb-5">Bairros em Guarulhos</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {[
                { to: "/seguros-guarulhos/cidade-maia", label: "Cidade Maia" },
                { to: "/seguros-guarulhos/vila-augusta", label: "Vila Augusta" },
                { to: "/seguros-guarulhos/jardim-maia", label: "Jardim Maia" },
                { to: "/seguro-empresarial-cumbica", label: "Cumbica" },
                { to: "/seguros-guarulhos/bonsucesso", label: "Bonsucesso" },
                { to: "/seguros-guarulhos/picanco", label: "Picanço" },
                { to: "/seguros-guarulhos/macedo", label: "Macedo" },
                { to: "/seguros-guarulhos/centro", label: "Centro" },
                { to: "/seguros-guarulhos/pimentas", label: "Pimentas" },
                { to: "/seguros-guarulhos/gopouva", label: "Gopouva" },
              ].map(l => (
                <li key={l.to}><Link to={l.to} className="text-[12px] text-white/60 hover:text-white/90 transition-base">{l.label}</Link></li>
              ))}
            </ul>
            <div className="mt-4">
               <Link to="/seguros-em-guarulhos-bairros" className="text-[11px] text-primary hover:underline font-medium">Ver todos os bairros →</Link>
            </div>
          </nav>

          {/* Contato */}

          <div>
            <h3 className="font-heading font-semibold text-white/90 text-[11px] uppercase tracking-[0.1em] mb-5">Contato</h3>
            <address className="not-italic">
              <ul className="space-y-3 text-[13px]">
                <li className="flex items-start gap-2.5 text-white/70">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-white/60" aria-hidden="true" />
                  <span>Av. Salgado Filho, 2120<br />Ed. Via Alameda – Sala 219 — Cidade Maia, Guarulhos/SP<br /><Link to="/seguros-em-guarulhos" className="text-[11px] underline opacity-50 hover:opacity-100">Ver todas as regiões atendidas em Guarulhos</Link></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0 text-white/60" aria-hidden="true" />
                  <a href="tel:1151997500" className="text-white/70 hover:text-white/90 transition-base">(11) 5199-7500</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0 text-white/60" aria-hidden="true" />
                  <a href="https://wa.me/551151997500" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white/90 transition-base" onClick={() => trackWhatsAppClick("footer")}>WhatsApp</a>
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
});

Footer.displayName = "Footer";

export default Footer;