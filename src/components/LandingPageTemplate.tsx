import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Phone, CheckCircle, Shield, Clock, Users, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageMeta from "@/components/PageMeta";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";
const logoUrl = "/images/logo-full.webp";

interface Benefit { icon: string; title: string; description: string; }
interface Testimonial { name: string; role: string; content: string; stars: number; }
interface Objection { question: string; answer: string; }

interface LandingPageProps {
  title: string;
  headline: string;
  subheadline: string;
  painPoints: string[];
  benefits: Benefit[];
  stats: { value: string; label: string }[];
  testimonials: Testimonial[];
  objections: Objection[];
  ctaText: string;
  ctaUrl?: string;
  urgencyText?: string;
  metaDescription: string;
  heroEmoji: string;
  heroImage?: string;
  priceAnchor?: string;
  guaranteeText?: string;
}

const LandingPageTemplate = ({
  title, headline, subheadline, painPoints, benefits, stats,
  testimonials, objections, ctaText, ctaUrl, urgencyText,
  metaDescription, heroEmoji, priceAnchor, guaranteeText,
}: LandingPageProps) => {

  const mainCtaLink = ctaUrl || "/cotacao";
  const isExternal = ctaUrl?.startsWith("http");

  const CtaButton = ({ variant = "primary", size = "lg" }: { variant?: "primary" | "whatsapp"; size?: "lg" | "md" }) => {
    if (variant === "whatsapp") {
      return (
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
          <Button size={size === "lg" ? "lg" : "default"} className="w-full sm:w-auto rounded-xl h-12 px-8 text-sm bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white font-semibold shadow-lg">
            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Chamar no WhatsApp
          </Button>
        </a>
      );
    }
    const btn = (
      <Button size={size === "lg" ? "lg" : "default"} className="w-full sm:w-auto rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-sm font-bold shadow-lg shadow-primary/25 animate-pulse hover:animate-none">
        <ArrowRight className="mr-2 h-4 w-4" aria-hidden="true" /> {ctaText}
      </Button>
    );
    if (isExternal) {
      return <a href={mainCtaLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">{btn}</a>;
    }
    return <Link to={mainCtaLink} className="w-full sm:w-auto">{btn}</Link>;
  };

  return (
    <>
      <PageMeta title={`${title} | Patro Seguros`} description={metaDescription} />

      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/">
            <img src={logoUrl} alt="Patro Seguros" className="h-10" />
          </Link>
          <a href={`tel:1151997500`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Phone className="h-4 w-4" /> (11) 5199-7500
          </a>
        </div>
      </header>

      <main className="pt-14">
        {/* HERO — Above the fold */}
        <section className="relative gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(215,100%,60%,0.15),transparent)]" />
          <div className="container mx-auto px-4 relative">
            <div className="py-16 md:py-24 max-w-2xl mx-auto text-center">
              <div className="text-5xl mb-5" role="img" aria-label={title}>{heroEmoji}</div>

              {urgencyText && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-400/40 text-red-300 font-bold text-[11px] uppercase tracking-wider mb-6">
                  <Clock className="h-3.5 w-3.5" /> {urgencyText}
                </div>
              )}

              <h1 className="text-white text-balance mb-4 font-extrabold leading-tight">
                {headline}
              </h1>
              <p className="text-base md:text-lg text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
                {subheadline}
              </p>

              {priceAnchor && (
                <p className="text-white/50 text-sm mb-6">
                  {priceAnchor}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <CtaButton />
                <CtaButton variant="whatsapp" />
              </div>

              {/* Trust badges inline */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-white/50 text-[11px] uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> SUSEP Registrada</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Resposta em 2h</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> 100% Gratuito</span>
              </div>
            </div>
          </div>
        </section>

        {/* PAIN POINTS — Agitation */}
        <section className="py-16 bg-background" aria-labelledby="problemas">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 id="problemas" className="text-center mb-10">
              Você se identifica com alguma dessas situações?
            </h2>
            <ul className="space-y-4 list-none">
              {painPoints.map((pain, i) => (
                <li key={i} className="flex items-start gap-4 bg-destructive/[0.04] border border-destructive/10 rounded-xl p-5">
                  <span className="text-destructive font-bold text-lg mt-0.5" aria-hidden="true">⚠️</span>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{pain}</p>
                </li>
              ))}
            </ul>
            <p className="text-center mt-8 text-muted-foreground text-sm">
              Se respondeu "sim" para qualquer uma, você <strong className="text-foreground">precisa agir agora</strong>.
            </p>
          </div>
        </section>

        {/* SOCIAL PROOF — Stats */}
        <section className="border-y bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {stats.map((s) => (
                <div key={s.label} className="py-8 text-center">
                  <p className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight font-heading">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-[0.1em] font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS — Solution */}
        <section className="py-20 bg-background" aria-labelledby="beneficios">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="section-label">Por que a Patro</span>
              <h2 id="beneficios" className="mt-3">O que você ganha com a Patro Seguros</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="premium-card p-7 text-center">
                  <div className="text-3xl mb-4">{b.icon}</div>
                  <h3 className="text-[15px] font-semibold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MID CTA */}
        <section className="py-14 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,hsla(215,100%,60%,0.12),transparent)]" />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-3 text-xl md:text-2xl font-bold">Não deixe para depois. Proteja-se agora.</h2>
            <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">Cotação gratuita e sem compromisso. Resultado em até 2 horas.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CtaButton />
              <CtaButton variant="whatsapp" />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS — Social proof */}
        <section className="py-20 bg-background" aria-labelledby="depoimentos">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="section-label">Depoimentos</span>
              <h2 id="depoimentos" className="mt-3">Quem contratou, recomenda</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {testimonials.map((t, i) => (
                <article key={i} className="premium-card p-7 flex flex-col">
                  <div className="flex gap-0.5 mb-4" role="img" aria-label={`${t.stars} de 5 estrelas`}>
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-[13px] text-muted-foreground leading-relaxed flex-1 mb-5">
                    "{t.content}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[11px]">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* OBJECTIONS — FAQ style */}
        <section className="py-20 gradient-surface" aria-labelledby="duvidas">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-14">
              <h2 id="duvidas" className="mt-3">Ainda tem dúvidas?</h2>
            </div>
            <div className="space-y-3">
              {objections.map((obj, i) => (
                <details key={i} className="premium-card group" open={i === 0}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-[15px] font-semibold hover:text-primary transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                    {obj.question}
                    <span className="text-primary/40 ml-4 group-open:rotate-45 transition-transform text-lg font-light flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{obj.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        {guaranteeText && (
          <section className="py-14 bg-background">
            <div className="container mx-auto px-4 max-w-xl text-center">
              <Award className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Nossa Garantia</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{guaranteeText}</p>
            </div>
          </section>
        )}

        {/* FINAL CTA — Urgency */}
        <section className="py-20 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,hsla(215,100%,60%,0.15),transparent)]" />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-3 text-2xl md:text-3xl font-extrabold">
              Solicite sua cotação gratuita agora
            </h2>
            <p className="text-white/60 text-sm mb-4 max-w-lg mx-auto">
              Compare as melhores seguradoras em um só lugar. Sem compromisso, sem burocracia.
            </p>
            {urgencyText && (
              <p className="text-red-300 text-xs font-bold uppercase tracking-wider mb-8">
                ⏰ {urgencyText}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <CtaButton />
              <CtaButton variant="whatsapp" />
            </div>
            <a href="tel:1151997500" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              Prefere ligar? <strong className="text-white/60">(11) 5199-7500</strong>
            </a>
          </div>
        </section>

        {/* Mini footer */}
        <footer className="py-8 bg-background border-t">
          <div className="container mx-auto px-4 text-center">
            <img src={logoUrl} alt="Patro Seguros" className="h-8 mx-auto mb-3" />
            <p className="text-[11px] text-muted-foreground">
              Patro Corretora de Seguros — SUSEP nº 212113511 — Guarulhos/SP
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default LandingPageTemplate;
