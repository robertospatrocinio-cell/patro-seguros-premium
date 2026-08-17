import { memo } from "react";
import { Star, ShieldCheck, CheckCircle2, Globe, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { EMPRESA } from "@/config/empresa";
import { PATRO_SOCIAL_PROOF } from "@/lib/patroSocialProof";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const WHATSAPP_URL = `https://wa.me/${EMPRESA.whatsapp.replace(/\D/g, "")}?text=Olá, vim pelo site da Patro Seguros e gostaria de solicitar uma cotação.`;

const HeroPatro = memo(() => {
  const handleCotacaoClick = () => trackCotacaoClick("hero");
  const handleWhatsAppClick = () => trackWhatsAppClick("hero");

  return (
    <section className="relative overflow-hidden bg-slate-900 pt-20 md:pt-0">
      {/* Background Image Container - Desktop/Tablet Right Side, Mobile Background */}
      <div className="absolute top-0 right-0 w-full lg:w-[45%] h-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent z-10 hidden lg:block" />
        <div className="absolute inset-0 bg-slate-900/60 z-10 lg:hidden" />
        <picture>
          <source
            type="image/avif"
            srcSet="/images/hero-home-480.avif 480w, /images/hero-home-960.avif 960w, /images/hero-home-1280.avif 1280w"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <source
            type="image/webp"
            srcSet="/images/hero-home-480.webp 480w, /images/hero-home-960.webp 960w, /images/hero-home-1280.webp 1280w"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <img
            src="/images/hero-home-960.webp"
            alt="Família protegida pela Patro Seguros - Atendimento humanizado e especializado"
            width={1280}
            height={720}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover lg:object-[center_right]"
            {...({ fetchpriority: "high" } as any)}
          />
        </picture>
      </div>

      <div className="container relative z-20 mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center min-h-[640px] lg:min-h-[720px] py-12 lg:py-0">
          {/* Content Area */}
          <div className="w-full lg:w-[58%] text-left">
            <div className="max-w-[680px]">
              {/* Header Label */}
              <span className="inline-block text-[11px] md:text-[13px] font-bold tracking-widest text-primary-light mb-4 uppercase">
                SEGUROS EM GUARULHOS • ATENDIMENTO EM TODO O BRASIL
              </span>
              
              {/* H1 Title */}
              <h1 className="text-white text-[32px] md:text-[54px] lg:text-[62px] font-extrabold mb-6 leading-[1.1] tracking-tight">
                Proteção inteligente para você, sua família e sua empresa.
              </h1>
              
              {/* Subtitle */}
              <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-[620px]">
                Compare soluções entre 16 seguradoras com orientação especializada e atendimento humano do início ao sinistro.
              </p>

              {/* Google Social Proof */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <a 
                  href={PATRO_SOCIAL_PROOF.googleProfileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/90 text-sm hover:underline"
                >
                  <span className="font-bold">{PATRO_SOCIAL_PROOF.googleRating}</span> no Google · {PATRO_SOCIAL_PROOF.googleReviewCount} avaliações
                </a>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link to="/cotacao" onClick={handleCotacaoClick}>
                  <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 font-bold bg-[#1e3a8a] hover:bg-[#1e40af] text-white border-b-4 border-[#172554] active:border-b-0 active:translate-y-1 transition-all shadow-xl">
                    Solicitar cotação
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-white/5 hover:bg-white/10 text-white hover:text-white border-white/20 hover:border-white/40 font-medium transition-all">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Falar no WhatsApp
                  </Button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-8 gap-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Clock className="h-4 w-4 shrink-0 text-primary-light" />
                  <span>Mais de 20 anos de experiência</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-primary-light" />
                  <span>16 seguradoras</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-light" />
                  <span>Corretora registrada na SUSEP</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Globe className="h-4 w-4 shrink-0 text-primary-light" />
                  <span>Atendimento em todo o Brasil</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroPatro;

import { Clock } from "lucide-react";
