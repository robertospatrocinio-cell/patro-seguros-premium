import { ReactNode } from "react";

interface PremiumHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: ReactNode;
}

/**
 * Hero editorial limpo: filete dourado, eyebrow discreto,
 * H1 serif, sem cards, CTA contido.
 */
export const PremiumHero = ({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  children,
}: PremiumHeroProps) => {
  return (
    <section
      aria-label="Apresentação"
      className="relative"
      style={{ background: "hsl(var(--premium-navy))", color: "white" }}
    >
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div
          className="mb-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "hsl(var(--premium-champagne))" }}
        >
          <span
            aria-hidden
            className="h-px w-8"
            style={{ background: "hsl(var(--premium-champagne))" }}
          />
          {eyebrow}
        </div>

        <h1
          className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          {title}
        </h1>

        <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/75 leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={primaryCta.href}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm tracking-wide transition"
            style={{
              background: "hsl(var(--premium-champagne))",
              color: "hsl(var(--premium-navy))",
            }}
          >
            {primaryCta.label} <span aria-hidden>→</span>
          </a>
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 px-1 py-3.5 text-sm tracking-wide border-b border-white/30 hover:border-white/80 transition"
            >
              {secondaryCta.label}
            </a>
          )}
        </div>

        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
};

export default PremiumHero;