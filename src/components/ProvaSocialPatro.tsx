/**
 * ProvaSocialPatro — Bloco global de prova social reutilizável.
 *
 * Uso:
 *   <ProvaSocialPatro />                    // versão default (banner)
 *   <ProvaSocialPatro variant="compact" />  // inline mais discreto
 *   <ProvaSocialPatro variant="hero" />     // dentro do hero da página de avaliações
 *
 * Puxa TODOS os dados de `@/lib/patroSocialProof`. Não hardcode números aqui.
 */

import { Link } from "react-router-dom";
import { Star, MessageCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PATRO_SOCIAL_PROOF } from "@/lib/patroSocialProof";
import { trackWhatsAppClick } from "@/lib/tracking";

type Variant = "default" | "compact" | "hero";

interface ProvaSocialPatroProps {
  variant?: Variant;
  /** Sobrescreve o texto padrão de confiança (opcional). */
  copy?: string;
  /** Contexto para tracking do clique no WhatsApp. */
  trackingContext?: string;
  className?: string;
  /** Esconde o link para a página de avaliações (em páginas onde já estamos nela). */
  hideReviewsLink?: boolean;
}

const GoogleG = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const ProvaSocialPatro = ({
  variant = "default",
  copy,
  trackingContext = "prova-social",
  className,
  hideReviewsLink = false,
}: ProvaSocialPatroProps) => {
  const {
    googleRating,
    googleReviewCount,
    leaveReviewUrl,
    googleProfileUrl,
    whatsappUrl,
    reviewsPageUrl,
    trustCopy,
  } = PATRO_SOCIAL_PROOF;

  const finalCopy = copy ?? trustCopy;
  const ratingLabel = `Nota ${googleRating} de 5 estrelas`;

  if (variant === "compact") {
    return (
      <div
        className={`flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm ${className ?? ""}`}
      >
        <GoogleG className="h-4 w-4" />
        <div className="flex items-center gap-1.5" role="img" aria-label={ratingLabel}>
          <span className="text-sm font-bold text-foreground">{googleRating}</span>
          <div className="flex text-amber-500">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="h-3 w-3 fill-current" aria-hidden="true" />
            ))}
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          {googleReviewCount} avaliações no Google
        </span>
        {!hideReviewsLink && (
          <Link
            to={reviewsPageUrl}
            className="text-xs font-semibold text-primary hover:underline underline-offset-4"
          >
            Ver avaliações →
          </Link>
        )}
      </div>
    );
  }

  const isHero = variant === "hero";

  return (
    <div
      className={`rounded-2xl border ${isHero ? "border-white/15 bg-white/[0.06] text-white" : "border-slate-200 bg-white text-foreground"} p-6 md:p-7 shadow-sm ${className ?? ""}`}
      aria-labelledby="prova-social-heading"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Bloco nota + estrelas */}
        <div className="flex items-center gap-4">
          <GoogleG className="h-8 w-8 flex-shrink-0" />
          <div>
            <p
              className={`text-[11px] uppercase tracking-[0.12em] font-semibold ${isHero ? "text-white/70" : "text-muted-foreground"}`}
            >
              Avaliações no Google
            </p>
            <div className="mt-1 flex items-end gap-2.5">
              <span className="text-3xl font-bold leading-none">{googleRating}</span>
              <div className="pb-1">
                <div
                  className="flex gap-0.5 text-amber-500"
                  role="img"
                  aria-label={ratingLabel}
                >
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className={`text-xs ${isHero ? "text-white/70" : "text-muted-foreground"}`}>
                  {googleReviewCount} avaliações reais
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor + texto */}
        <div className={`hidden md:block h-16 w-px ${isHero ? "bg-white/15" : "bg-slate-200"}`} aria-hidden="true" />
        <div className="flex-1">
          <p
            id="prova-social-heading"
            className={`text-sm leading-relaxed ${isHero ? "text-white/85" : "text-foreground/85"}`}
          >
            {finalCopy}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium">
            <ShieldCheck className={`h-3.5 w-3.5 ${isHero ? "text-emerald-300" : "text-emerald-600"}`} aria-hidden="true" />
            <span className={isHero ? "text-white/80" : "text-muted-foreground"}>
              Corretora registrada na SUSEP
            </span>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-5 flex flex-col sm:flex-row flex-wrap gap-2">
        <a
          href={leaveReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none"
        >
          <Button
            size="sm"
            variant={isHero ? "secondary" : "outline"}
            className="w-full rounded-xl h-10 px-4 text-sm"
          >
            <Star className="mr-2 h-4 w-4" /> Avaliar no Google
          </Button>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(`prova-social:${trackingContext}`)}
          className="flex-1 sm:flex-none"
        >
          <Button
            size="sm"
            className="w-full rounded-xl h-10 px-4 text-sm bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
          </Button>
        </a>
        <a
          href={googleProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none"
        >
          <Button
            size="sm"
            variant="ghost"
            className={`w-full rounded-xl h-10 px-4 text-sm ${isHero ? "text-white hover:bg-white/10" : ""}`}
          >
            <ExternalLink className="mr-2 h-4 w-4" /> Ver no Google
          </Button>
        </a>
        {!hideReviewsLink && (
          <Link to={reviewsPageUrl} className="flex-1 sm:flex-none">
            <Button
              size="sm"
              variant="ghost"
              className={`w-full rounded-xl h-10 px-4 text-sm ${isHero ? "text-white hover:bg-white/10" : ""}`}
            >
              Ver avaliações dos clientes →
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProvaSocialPatro;