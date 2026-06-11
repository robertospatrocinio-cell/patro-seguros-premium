import { Link } from "react-router-dom";
import { SmartLink } from "./SmartLink";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";
import FooterReviewsBadge from "@/components/FooterReviewsBadge";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { memo } from "react";

const logoFull = "/images/logo-full.webp";

const Footer = memo(() => {
  return (
    <footer className="bg-foreground text-white/80" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <SmartLink to="/" className="inline-block mb-6">
              <img src={logoFull} alt="Patro Seguros" width={160} height={80} className="h-20 w-auto object-contain brightness-200" />
            </SmartLink>
            <p className="text-[13px] mb-6 leading-relaxed max-w-xs text-white/70">
              A experiência digital de uma grande corretora, com o atendimento próximo de uma especialista em Guarulhos e região.
            </p>
            <div className="mb-6">
              <FooterReviewsBadge />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <SeloMelhorCorretora size="sm" />
              <p className="text-[12px]">SUSEP 212113511<br />CNPJ 41.641.558/0001-33</p>
            </div>
            <div className="flex gap-3">
              <TooltipProvider>
                {[
                  { href: "https://wa.me/551151997500", icon: MessageCircle, label: "WhatsApp" },
                  { href: "https://www.instagram.com/patroseguros", icon: Instagram, label: "Instagram" },
                  { href: "https://www.facebook.com/patroseguros", icon: Facebook, label: "Facebook" },
                  { href: "https://www.linkedin.com/company/patro-seguros", icon: Linkedin, label: "LinkedIn" },
                ].map(({ href, icon: Icon, label }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <a href={href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                        <Icon className="h-4 w-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-[10px]">{label}</TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>

          {/* Para Você */}
          <nav aria-label="Seguros para você">
            <h3 className="font-bold text-white text-[12px] uppercase tracking-wider mb-5">Para Você</h3>
            <ul className="space-y-2.5 text-[13px]">
              <li><SmartLink to="/seguro-auto" className="hover:text-white transition-colors">Seguro Auto</SmartLink></li>
              <li><SmartLink to="/seguro-moto" className="hover:text-white transition-colors">Seguro Moto</SmartLink></li>
              <li><SmartLink to="/seguro-residencial" className="hover:text-white transition-colors">Seguro Residencial</SmartLink></li>
              <li><SmartLink to="/seguro-vida" className="hover:text-white transition-colors">Seguro de Vida</SmartLink></li>
              <li><SmartLink to="/planos-de-saude" className="hover:text-white transition-colors">Plano de Saúde</SmartLink></li>
              <li><SmartLink to="/consorcio" className="hover:text-white transition-colors">Consórcio</SmartLink></li>
            </ul>
          </nav>

          {/* Para Sua Empresa */}
          <nav aria-label="Seguros para empresas">
            <h3 className="font-bold text-white text-[12px] uppercase tracking-wider mb-5">Para Sua Empresa</h3>
            <ul className="space-y-2.5 text-[13px]">
              <li><SmartLink to="/seguro-empresarial" className="hover:text-white transition-colors">Seguro Empresarial</SmartLink></li>
              <li><SmartLink to="/seguro-frota" className="hover:text-white transition-colors">Seguro Frota</SmartLink></li>
              <li><SmartLink to="/seguro-transporte" className="hover:text-white transition-colors">Transporte e Carga</SmartLink></li>
              <li><SmartLink to="/plano-saude-empresarial" className="hover:text-white transition-colors">Plano de Saúde PME</SmartLink></li>
              <li><SmartLink to="/seguro-vida-pme" className="hover:text-white transition-colors">Seguro de Vida em Grupo</SmartLink></li>
              <li><SmartLink to="/seguro-maquinas" className="hover:text-white transition-colors">Máquinas e Equip.</SmartLink></li>
            </ul>
          </nav>

          {/* Atendimento e Conteúdo */}
          <nav aria-label="Atendimento e Conteúdo">
            <h3 className="font-bold text-white text-[12px] uppercase tracking-wider mb-5">Atendimento</h3>
            <ul className="space-y-2.5 text-[13px] mb-8">
              <li><Link to="/cotacao" className="hover:text-white transition-colors">Solicitar Cotação</Link></li>
              <li><Link to="/central-de-sinistro" className="hover:text-white transition-colors">Acionar Sinistro</Link></li>
              <li><Link to="/crm" className="text-primary font-bold hover:text-primary/80">Área do Cliente</Link></li>
            </ul>
            <h3 className="font-bold text-white text-[12px] uppercase tracking-wider mb-5">Conteúdo</h3>
            <ul className="space-y-2.5 text-[13px]">
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/politica-privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-[12px] flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Patro Seguros. Todos os direitos reservados.</p>
          <a 
            href="https://maps.google.com/?q=Avenida+Salgado+Filho+2120+Guarulhos+SP" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <MapPin className="h-3 w-3" /> Edifício Via Alameda – Av. Salgado Filho, 2120 – Sala 219 – Guarulhos/SP
          </a>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
