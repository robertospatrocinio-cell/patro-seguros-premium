import { Link } from "react-router-dom";
import { SmartLink } from "./SmartLink";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, MessageCircle, Clock, ShieldCheck, Star } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";
import FooterReviewsBadge from "@/components/FooterReviewsBadge";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";
import NapBlock from "@/components/NapBlock";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { memo } from "react";
import { EMPRESA, TELEFONE_DIGITS, WHATSAPP_DIGITS, ENDERECO_LINHA } from "@/config/empresa";

const logoFull = "/images/logo-full.webp";

const Footer = memo(() => {
  return (
    <footer className="bg-foreground text-white/80" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <SmartLink to="/" className="inline-block mb-6">
              <picture>
                <source srcSet="/images/logo-full.webp" type="image/webp" />
                <img
                  src={logoFull}
                  alt="Patro Seguros Guarulhos - Corretora de Seguros"
                  width={140}
                  height={70}
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-auto object-contain brightness-200"
                />
              </picture>
            </SmartLink>
            <p className="text-[13px] mb-6 leading-relaxed max-w-xs text-white/70">
              A Patro Seguros é uma corretora especialista em soluções de proteção com mais de 20 anos de experiência e sede em Cidade Maia, Guarulhos.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <SeloMelhorCorretora size="sm" />
              <div className="text-[12px] leading-relaxed">
                <div className="flex text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                  ))}
                  <span className="ml-1.5 text-white/90 font-bold tracking-tight text-[10px] uppercase">Nota {EMPRESA.metricas.googleRating}</span>
                </div>
                <a
                  href="https://www2.susep.gov.br/safe/menumercado/regcorretores/pesquisa.asp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline decoration-white/30 hover:decoration-white transition-colors"
                  aria-label={`Consultar registro SUSEP ${EMPRESA.susep} no site oficial`}
                >
                  SUSEP {EMPRESA.susep}
                </a>
                <br />CNPJ {EMPRESA.cnpj}
              </div>
            </div>
            <ul className="space-y-2 mb-6 text-[12.5px] text-white/75">
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-white/50" aria-hidden="true" />
                <span>
                  {EMPRESA.endereco.logradouro}, {EMPRESA.endereco.numero} – Sala 219
                  <br />
                  {EMPRESA.endereco.bairro}, {EMPRESA.endereco.cidade}/{EMPRESA.endereco.estadoSigla}
                </span>
              </li>
              <li>
                <a href={`tel:${TELEFONE_DIGITS}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-white/50" aria-hidden="true" />
                  <span>{EMPRESA.telefone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMPRESA.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-white/50" aria-hidden="true" />
                  <span>{EMPRESA.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 shrink-0 text-white/50" aria-hidden="true" />
                <span>{EMPRESA.horario}</span>
              </li>
            </ul>
            <div className="flex gap-3">
              <TooltipProvider>
                {[
                  { href: `https://wa.me/${WHATSAPP_DIGITS}`, icon: MessageCircle, label: "WhatsApp" },
                  { href: "https://www.instagram.com/patroseguros", icon: Instagram, label: "Instagram" },
                  { href: "https://www.facebook.com/patroseguros", icon: Facebook, label: "Facebook" },
                  { href: "https://www.linkedin.com/company/patro-seguros", icon: Linkedin, label: "LinkedIn" },
                ].map(({ href, icon: Icon, label }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-[10px]">{label}</TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>

          {/* Segmentos */}
          <nav aria-label="Segmentos de Seguro">
            <h3 className="font-bold text-white text-[12px] uppercase tracking-wider mb-5">Segmentos</h3>
            <ul className="space-y-2.5 text-[13px]">
              <li><SmartLink to="/seguro-pessoa-fisica" className="hover:text-white transition-colors">Pessoa Física</SmartLink></li>
              <li><SmartLink to="/seguro-empresa" className="hover:text-white transition-colors">Empresas</SmartLink></li>
              <li><SmartLink to="/seguro-autonomo" className="hover:text-white transition-colors">Autônomos</SmartLink></li>
              <li><SmartLink to="/seguro-familia" className="hover:text-white transition-colors">Famílias</SmartLink></li>
              <li><SmartLink to="/patro-private" className="hover:text-white transition-colors">Patro Private</SmartLink></li>
            </ul>
          </nav>

          {/* Para Você */}
          <nav aria-label="Seguros para você">
            <h3 className="font-bold text-white text-[12px] uppercase tracking-wider mb-5">Para Você</h3>
            <ul className="space-y-2.5 text-[13px]">
              <li><SmartLink to="/seguro-auto" className="hover:text-white transition-colors">Seguro Auto</SmartLink></li>
              <li><SmartLink to="/seguro-moto" className="hover:text-white transition-colors">Seguro Moto</SmartLink></li>
              <li><SmartLink to="/seguro-residencial" className="hover:text-white transition-colors">Seguro Residencial</SmartLink></li>
              <li><SmartLink to="/seguro-vida" className="hover:text-white transition-colors">Seguro de Vida</SmartLink></li>
              <li><SmartLink to="/planos-de-saude" className="hover:text-white transition-colors">Plano de Saúde</SmartLink></li>
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
              <li><SmartLink to="/cotacao" className="hover:text-white transition-colors">Solicitar Cotação</SmartLink></li>
              <li><SmartLink to="/indique-e-ganhe" className="hover:text-white transition-colors">Indique um Amigo</SmartLink></li>
              <li><SmartLink to="/central-de-sinistro" className="hover:text-white transition-colors">Acionar Sinistro</SmartLink></li>
              <li>
                <SmartLink to="/verificar-susep" className="inline-flex items-center gap-1.5 text-white font-semibold hover:text-primary transition-colors">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Verificar habilitação SUSEP
                </SmartLink>
              </li>
              <li>
                <SmartLink
                  to="/patro-private"
                  className="hover:text-white transition-colors"
                  style={{ color: "hsl(38 60% 72%)" }}
                >
                  Patro Private →
                </SmartLink>
              </li>
              <li><SmartLink to="/crm" className="text-[#F2994A] font-bold hover:text-white">Área do Cliente</SmartLink></li>
            </ul>
            <h3 className="font-bold text-white text-[12px] uppercase tracking-wider mb-5">Conteúdo</h3>
            <ul className="space-y-2.5 text-[13px]">
              <li><SmartLink to="/blog" className="hover:text-white transition-colors">Blog</SmartLink></li>
              <li><SmartLink to="/faq" className="hover:text-white transition-colors">FAQ</SmartLink></li>
              <li><SmartLink to="/seguradoras-parceiras" className="hover:text-white transition-colors">Seguradoras Parceiras</SmartLink></li>
              <li><SmartLink to="/mapa-do-site" className="text-primary font-bold hover:text-white">Mapa do Site</SmartLink></li>
              <li><SmartLink to="/politica-privacidade" className="hover:text-white transition-colors">Privacidade</SmartLink></li>
              <li><SmartLink to="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</SmartLink></li>
            </ul>

          </nav>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-[12px] flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {EMPRESA.razaoSocial}. Todos os direitos reservados.</p>
          <a 
            href={EMPRESA.redesSociais.google} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <MapPin className="h-3 w-3" /> {ENDERECO_LINHA}
          </a>
        </div>

        {/* Bloco NAP canônico — obrigatório em 100% das páginas para SEO local + GEO */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <NapBlock />
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
