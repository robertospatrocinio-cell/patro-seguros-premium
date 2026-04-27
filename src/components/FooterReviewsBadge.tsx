import { Star, MessageSquare } from "lucide-react";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Patro+Seguros/";
const LEAVE_REVIEW_URL = "https://g.page/r/patroseguros/review";

/**
 * Compact Google Reviews badge for the footer.
 * Reinforces local SEO trust signals (4.9★ · 150+ avaliações no Google).
 * The aggregateRating is also embedded in LocalBusinessSchema (JSON-LD)
 * so Google can render rich snippets in the SERP.
 */
const FooterReviewsBadge = () => (
  <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 flex flex-col gap-4">
    <div className="flex items-center gap-3">
      {/* Google "G" */}
      <svg viewBox="0 0 24 24" className="h-7 w-7 flex-shrink-0" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.1em] font-heading font-semibold text-white/60">Avaliações no Google</p>
        <p className="text-[12px] text-white/80">Corretora em Guarulhos</p>
      </div>
    </div>

    <div className="flex items-end gap-3">
      <span className="text-3xl font-bold text-white leading-none">4.9</span>
      <div className="pb-0.5">
        <div className="flex gap-0.5 mb-1" aria-label="Nota 4.9 de 5 estrelas">
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-[11px] text-white/60">+150 avaliações reais</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/90 px-3 py-2 text-[11px] font-medium transition-base"
      >
        Ver avaliações
      </a>
      <a
        href={LEAVE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground px-3 py-2 text-[11px] font-semibold transition-base"
      >
        <MessageSquare className="h-3 w-3" /> Avaliar
      </a>
    </div>
  </div>
);

export default FooterReviewsBadge;