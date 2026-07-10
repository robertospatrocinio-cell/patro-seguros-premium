import { ReactNode, useRef, MutableRefObject } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

// ---------- Config central editável (contato Patro Seguros) ----------
export const PATRO_CONTACT = {
  whatsappNumber: "551151997500",
  phone: "(11) 5199-7500",
  email: "contato@patroseguros.com.br",
  address: "Cidade Maia, Guarulhos / SP",
  cnpj: "—",
  susep: "—",
};

export const buildWhatsAppUrl = (msg: string) =>
  `https://wa.me/${PATRO_CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`;

// ---------- Section header ----------
export const LpSectionHeader = ({
  eyebrow,
  title,
  intro,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) => (
  <div className={`max-w-3xl mb-10 ${center ? "mx-auto text-center" : ""}`}>
    {eyebrow && <span className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</span>}
    <h2 className="mt-3 text-3xl md:text-4xl font-bold">{title}</h2>
    {intro && <p className="mt-4 text-muted-foreground">{intro}</p>}
  </div>
);

// ---------- Hero component (inline JSX) ----------
interface HeroProps {
  brand: string;
  title: string;
  subtitle: string;
  description?: string;
  supportLine?: string;
  primaryCta: string;
  secondaryCta?: string;
  image: string;
  imageAlt: string;
  source: string;
  onPrimary: () => void;
  whatsappUrl: string;
  onWhatsApp: () => void;
}

export const HeroSection = ({
  brand,
  title,
  subtitle,
  description,
  supportLine,
  primaryCta,
  secondaryCta = "Falar pelo WhatsApp",
  image,
  imageAlt,
  onPrimary,
  whatsappUrl,
  onWhatsApp,
}: HeroProps) => (
  <section id="inicio" className="relative overflow-hidden bg-primary text-white">
    <div className="absolute inset-0">
      <img
        src={image}
        alt={imageAlt}
        className="w-full h-full object-cover opacity-25"
        loading="eager"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
    </div>
    <div className="relative container mx-auto px-4 py-20 md:py-28 max-w-6xl">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs uppercase tracking-wide font-semibold">
          {brand}
        </span>
        <h1 className="mt-6 text-3xl md:text-5xl font-bold leading-tight">{title}</h1>
        <p className="mt-4 text-lg md:text-xl text-white/85">{subtitle}</p>
        {description && <p className="mt-4 text-base text-white/75 max-w-2xl">{description}</p>}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            onClick={onPrimary}
            className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold px-8"
            aria-label={primaryCta}
          >
            {primaryCta}
          </Button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onWhatsApp}
            aria-label="Falar com a Patro Seguros no WhatsApp"
            className="inline-flex items-center gap-2 rounded-md border border-white/40 hover:bg-white/10 px-6 py-3 font-semibold transition-colors"
          >
            <MessageCircle className="h-5 w-5" /> {secondaryCta}
          </a>
        </div>

        {supportLine && <p className="mt-6 text-sm text-white/70">{supportLine}</p>}
      </div>
    </div>
  </section>
);

// ---------- Etapas / Steps ----------
export const LpSteps = ({
  eyebrow,
  title,
  steps,
}: {
  eyebrow?: string;
  title: string;
  steps: { title: string; desc: string }[];
}) => (
  <section className="py-20 bg-muted/30">
    <div className="container mx-auto px-4 max-w-5xl">
      <LpSectionHeader eyebrow={eyebrow} title={title} />
      <ol className={`space-y-6 md:space-y-0 md:grid md:gap-4 ${steps.length <= 5 ? "md:grid-cols-5" : "md:grid-cols-6"}`}>
        {steps.map((s, i) => (
          <li key={s.title} className="flex md:flex-col gap-4 md:gap-3 md:text-center">
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold md:mx-auto shadow-md">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">{s.title}</h3>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

// ---------- FAQ ----------
export const LpFAQ = ({ items }: { items: { q: string; a: string }[] }) => (
  <section id="faq" className="py-20 bg-background">
    <div className="container mx-auto px-4 max-w-3xl">
      <LpSectionHeader eyebrow="Perguntas frequentes" title="FAQ" />
      <div className="space-y-3">
        {items.map((f) => (
          <details key={f.q} className="group rounded-xl border border-border bg-card overflow-hidden">
            <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="text-sm md:text-base font-semibold pr-4">{f.q}</h3>
              <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180 flex-shrink-0" />
            </summary>
            <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

// ---------- CTA final ----------
export const LpFinalCTA = ({
  title,
  description,
  primaryCta,
  secondaryCta = "Conversar pelo WhatsApp",
  onPrimary,
  whatsappUrl,
  onWhatsApp,
  legalNote,
}: {
  title: string;
  description?: string;
  primaryCta: string;
  secondaryCta?: string;
  onPrimary: () => void;
  whatsappUrl: string;
  onWhatsApp: () => void;
  legalNote?: string;
}) => (
  <section className="py-20 bg-primary text-white">
    <div className="container mx-auto px-4 max-w-4xl text-center">
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      {description && <p className="mt-4 text-white/80 max-w-2xl mx-auto">{description}</p>}
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Button
          size="lg"
          onClick={onPrimary}
          className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold px-8"
          aria-label={primaryCta}
        >
          {primaryCta}
        </Button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onWhatsApp}
          aria-label={secondaryCta}
          className="inline-flex items-center gap-2 rounded-md border border-white/40 hover:bg-white/10 px-6 py-3 font-semibold transition-colors"
        >
          <MessageCircle className="h-5 w-5" /> {secondaryCta}
        </a>
      </div>
      {legalNote && <p className="mt-8 text-xs text-white/60 max-w-3xl mx-auto">{legalNote}</p>}
    </div>
  </section>
);

// ---------- Card list simples ----------
export const LpCardGrid = ({
  items,
  columns = 3,
}: {
  items: { title: string; desc?: string; icon?: ReactNode }[];
  columns?: 2 | 3 | 4;
}) => {
  const cols = columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid gap-4 ${cols}`}>
      {items.map((it) => (
        <div key={it.title} className="rounded-xl border border-border bg-card p-6 hover:border-primary hover:shadow-md transition-all">
          {it.icon && (
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              {it.icon}
            </div>
          )}
          <h3 className="font-semibold">{it.title}</h3>
          {it.desc && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>}
        </div>
      ))}
    </div>
  );
};

// ---------- Hook para scroll até formulário ----------
export function useFormScroller(source: string, insuranceType: string) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollToForm = (place: string) => {
    trackCotacaoClick(`${source}-${place}`, { insuranceType, origin: source });
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const trackWa = (place: string) => trackWhatsAppClick(`${source}-${place}`, { insuranceType, origin: source });
  return { ref, scrollToForm, trackWa } as {
    ref: MutableRefObject<HTMLDivElement | null>;
    scrollToForm: (place: string) => void;
    trackWa: (place: string) => void;
  };
}

// ---------- Padrões de máscara ----------
export const maskCNPJ = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};