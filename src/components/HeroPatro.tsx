import { memo } from "react";
import { ArrowRight, Clock, MessageCircle, ShieldCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EMPRESA } from "@/config/empresa";
import { PATRO_SOCIAL_PROOF } from "@/lib/patroSocialProof";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const WHATSAPP_URL = `https://wa.me/${EMPRESA.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Olá, vim pelo site da Patro Seguros e gostaria de solicitar uma cotação.")}`;

const HeroPatro = memo(() => {
  const handleCotacaoClick = () => trackCotacaoClick("hero");
  const handleWhatsAppClick = () => trackWhatsAppClick("hero");

  return (
    <section className="home-hero" aria-labelledby="home-heading">
      <div className="container mx-auto">
        <div className="home-hero-layout">
          <div className="home-hero-content">
            <div className="home-hero-copy">
              <p className="home-hero-label">Patro Seguros · Guarulhos e Grande São Paulo</p>
              <h1 id="home-heading">Corretora de seguros em Guarulhos. Proteção com orientação.</h1>
              <p className="home-hero-description">
                Compare coberturas e preços com quem explica as diferenças.
                Atendimento humano para você, sua família e sua empresa — da cotação ao sinistro.
              </p>
              <div className="home-hero-actions">
                <Button asChild size="lg">
                  <Link to="/cotacao" onClick={handleCotacaoClick}>
                    Solicitar cotação
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Conversar no WhatsApp
                </a>
              </div>
              <a
                href={PATRO_SOCIAL_PROOF.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="home-hero-review"
              >
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                <span><strong>{PATRO_SOCIAL_PROOF.googleRating.toLocaleString("pt-BR")}</strong> no Google</span>
                <span className="home-hero-review-detail">Ver avaliações</span>
              </a>
            </div>
          </div>
          <div className="home-hero-media">
            <picture>
              <source
                type="image/avif"
                srcSet="/images/hero-home-480.avif 480w, /images/hero-home-960.avif 960w, /images/hero-home-1280.avif 1280w"
                sizes="(min-width: 1024px) 43vw, 100vw"
              />
              <source
                type="image/webp"
                srcSet="/images/hero-home-480.webp 480w, /images/hero-home-960.webp 960w, /images/hero-home-1280.webp 1280w"
                sizes="(min-width: 1024px) 43vw, 100vw"
              />
              <img
                src="/images/hero-home-1280.webp"
                alt="Consultor da Patro Seguros realizando cotação de seguro empresarial em Guarulhos"
                width={1280}
                height={720}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
                {...({ fetchpriority: "high" } as any)}
              />
            </picture>
            <div className="home-hero-caption">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <span>Mais do que contratar.<br /><strong>Ter com quem contar.</strong></span>
            </div>
          </div>
        </div>
        <div className="home-hero-trust" aria-label="Credenciais da Patro Seguros">
          <p><Clock className="h-4 w-4" aria-hidden="true" /><span>Sócios com {EMPRESA.metricas.experienciaAnos} anos de experiência</span></p>
          <p><ShieldCheck className="h-4 w-4" aria-hidden="true" /><span>SUSEP {EMPRESA.susep}</span></p>
          <Link to="/central-de-sinistro">Já é cliente? Acesse o suporte <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
});

export default HeroPatro;
