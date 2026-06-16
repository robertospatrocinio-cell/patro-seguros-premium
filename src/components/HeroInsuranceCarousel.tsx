import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import type { LucideIcon } from "lucide-react";
import {
  Car,
  Bike,
  Home,
  HeartPulse,
  Stethoscope,
  Plane,
  Smartphone,
  Navigation,
  KeyRound,
  Building2,
  Truck,
  PackageCheck,
  Boxes,
  Warehouse,
  Briefcase,
  Users,
  ShieldCheck,
  Lock,
  HardHat,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  trackCotacaoClick,
  trackWhatsAppClick,
  trackInternalLinkClick,
  buildInternalLinkSource,
} from "@/lib/tracking";
import heroFamilia from "@/assets/hero-familia.webp";
import heroEmpresa from "@/assets/hero-empresa.webp";

type Audience = "pessoa" | "empresa";

type InsuranceCard = {
  title: string;
  short: string;
  href: string;
  Icon: LucideIcon;
  slug: string;
};

const WHATSAPP_NUMBER = "551151997500";

const buildWhatsAppUrl = (audience: Audience, origem: string) => {
  const publico = audience === "pessoa" ? "Para Você" : "Para sua Empresa";
  const message =
    `Olá! Vim pelo site da Patro Seguros (${origem}) — perfil ${publico}. ` +
    `Gostaria de uma cotação consultiva e de falar com um consultor.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const cardsPessoa: InsuranceCard[] = [
  { title: "Seguro Auto", short: "Carro, terceiros e assistência 24h.", href: "/seguro-auto-guarulhos", Icon: Car, slug: "seguro-auto" },
  { title: "Seguro Moto", short: "Proteção para sua moto no dia a dia.", href: "/seguro-moto-guarulhos", Icon: Bike, slug: "seguro-moto" },
  { title: "Seguro Residencial", short: "Casa, apto e assistência completa.", href: "/seguro-residencial-guarulhos", Icon: Home, slug: "seguro-residencial" },
  { title: "Seguro de Vida", short: "Estabilidade financeira para sua família.", href: "/seguro-vida-guarulhos", Icon: HeartPulse, slug: "seguro-vida" },
  { title: "Plano de Saúde", short: "Comparamos 20+ operadoras para você.", href: "/plano-saude-guarulhos", Icon: Stethoscope, slug: "plano-saude" },
  { title: "Seguro Viagem", short: "Cobertura médica e bagagem no exterior.", href: "/seguro-viagem", Icon: Plane, slug: "seguro-viagem" },
  { title: "Seguro Celular", short: "Roubo, furto e danos acidentais.", href: "/seguro-celular", Icon: Smartphone, slug: "seguro-celular" },
  { title: "Motorista de App", short: "Cobertura para quem dirige Uber/99.", href: "/seguro-motorista-app", Icon: Navigation, slug: "seguro-motorista-app" },
  { title: "Consórcio", short: "Carro, moto ou imóvel sem juros.", href: "/consorcio", Icon: KeyRound, slug: "consorcio" },
];

const cardsEmpresa: InsuranceCard[] = [
  { title: "Seguro Empresarial", short: "Patrimônio, lucros cessantes e RC.", href: "/seguro-empresarial-guarulhos", Icon: Building2, slug: "seguro-empresarial" },
  { title: "Seguro Frota", short: "Economia de até 40% vs apólices individuais.", href: "/seguro-frota-empresas-guarulhos", Icon: Truck, slug: "seguro-frota" },
  { title: "Transporte e Carga", short: "RCTR-C, RCF-DC e cargas em trânsito.", href: "/seguro-transporte", Icon: PackageCheck, slug: "seguro-transporte" },
  { title: "Transportadoras", short: "Solução completa para operação logística.", href: "/seguros/transportadoras", Icon: Boxes, slug: "transportadoras" },
  { title: "Seguro Galpão", short: "Blindagem patrimonial e All-Risks.", href: "/seguro-galpao", Icon: Warehouse, slug: "seguro-galpao" },
  { title: "Plano de Saúde PME", short: "Saúde corporativa a partir de 2 vidas.", href: "/plano-saude-empresarial", Icon: Briefcase, slug: "plano-saude-pme" },
  { title: "Vida em Grupo", short: "Benefício essencial para o seu time.", href: "/seguro-vida-pme", Icon: Users, slug: "vida-em-grupo" },
  { title: "Responsabilidade Civil", short: "Proteção contra danos a terceiros.", href: "/seguro-rc", Icon: ShieldCheck, slug: "seguro-rc" },
  { title: "Seguro Cyber", short: "Vazamento de dados e ataques digitais.", href: "/seguro-cyber", Icon: Lock, slug: "seguro-cyber" },
  { title: "Seguro Engenharia", short: "Obras civis, instalação e montagem.", href: "/seguro-engenharia", Icon: HardHat, slug: "seguro-engenharia" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

type HeroInsuranceCarouselProps = {
  headline?: string;
  subheadline?: string;
  origem?: string;
  headingId?: string;
  as?: "h2" | "h3";
  showCtas?: boolean;
};

const HeroInsuranceCarousel = ({
  headline = "Faça sua cotação com a Patro Seguros",
  subheadline = "Compare seguradoras e encontre a proteção ideal para você, sua família ou sua empresa.",
  origem = "hero_carrossel_home",
  headingId = "hero-carrossel-heading",
  as: HeadingTag = "h2",
  showCtas = true,
}: HeroInsuranceCarouselProps) => {
  const [audience, setAudience] = useState<Audience>("pessoa");
  const reduceMotion = useMemo(prefersReducedMotion, []);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
    duration: reduceMotion ? 0 : 22,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const cards = audience === "pessoa" ? cardsPessoa : cardsEmpresa;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    emblaApi?.scrollTo(0);
  }, [audience, emblaApi]);

  const handleAudience = (next: Audience) => {
    if (next === audience) return;
    setAudience(next);
    try {
      window.gtag?.("event", next === "pessoa" ? "clique_toggle_para_voce" : "clique_toggle_para_empresa", {
        event_category: "hero_carrossel",
        tipo_de_publico: next === "pessoa" ? "pessoa" : "empresa",
        origem,
      });
    } catch {
      /* noop */
    }
  };

  const handleCardClick = (card: InsuranceCard) => {
    try {
      window.gtag?.("event", "clique_card_seguro", {
        event_category: "hero_carrossel",
        tipo_de_publico: audience,
        seguro: card.title,
        url_destino: card.href,
        origem,
      });
    } catch {
      /* noop */
    }
    trackInternalLinkClick({
      source: buildInternalLinkSource("landing", `${origem}-${audience}`),
      destination: card.href,
      label: card.title,
      placement: "hub-grid",
    });
  };

  const handleCotacao = () => {
    try {
      window.gtag?.("event", "clique_cta_cotacao_hero", {
        event_category: "hero_carrossel",
        tipo_de_publico: audience,
        origem,
      });
    } catch {
      /* noop */
    }
    trackCotacaoClick("hero-carrossel", { origin: origem });
  };

  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl(audience, origem),
    [audience, origem]
  );

  const handleWhatsApp = () => {
    try {
      window.gtag?.("event", "clique_whatsapp_hero", {
        event_category: "hero_carrossel",
        tipo_de_publico: audience,
        origem,
        url_destino: whatsappUrl,
      });
    } catch {
      /* noop */
    }
    trackWhatsAppClick("hero-carrossel", { origin: origem });
  };

  const bgImage = audience === "pessoa" ? heroFamilia : heroEmpresa;
  const bgAlt =
    audience === "pessoa"
      ? "Família protegida pela consultoria da Patro Seguros"
      : "Empresário recebendo consultoria empresarial da Patro Seguros";

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden bg-slate-950 text-white"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          key={bgImage}
          src={bgImage}
          alt={bgAlt}
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover object-center ${
            reduceMotion ? "" : "transition-opacity duration-500"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/85 to-[#0b1f3a]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.12),transparent_55%)]" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur">
            Cotação consultiva · 16+ seguradoras
          </span>
          <HeadingTag
            id={headingId}
            className="mt-5 text-3xl font-black leading-tight tracking-tight md:text-5xl"
          >
            {headline}
          </HeadingTag>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 md:text-lg">
            {subheadline}
          </p>

          {showCtas && (
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/cotacao" onClick={handleCotacao} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-12 w-full rounded-lg bg-white px-7 text-sm font-semibold text-slate-900 hover:bg-white/90 sm:w-auto"
              >
                Solicitar cotação
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Button>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsApp}
              aria-label={`Falar com consultor da Patro Seguros pelo WhatsApp — perfil ${
                audience === "pessoa" ? "Para Você" : "Para sua Empresa"
              }`}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-lg border-white/25 bg-white/[0.04] px-7 text-sm font-semibold text-white hover:bg-white/[0.1] hover:text-white sm:w-auto"
              >
                <MessageCircle className="mr-2 h-4 w-4" aria-hidden />
                Falar com consultor
              </Button>
            </a>
          </div>
          )}
        </div>

        {/* Toggle */}
        <div className="mx-auto mt-10 flex max-w-md justify-center">
          <div
            role="tablist"
            aria-label="Tipo de proteção"
            className="inline-flex w-full rounded-full border border-white/15 bg-white/[0.06] p-1 backdrop-blur"
          >
            {([
              { id: "pessoa" as const, label: "Para Você" },
              { id: "empresa" as const, label: "Para sua Empresa" },
            ]).map((opt) => {
              const active = audience === opt.id;
              return (
                <button
                  key={opt.id}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`hero-carrossel-painel-${opt.id}`}
                  id={`hero-carrossel-tab-${opt.id}`}
                  type="button"
                  onClick={() => handleAudience(opt.id)}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                    active
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel */}
        <div
          id={`hero-carrossel-painel-${audience}`}
          role="tabpanel"
          aria-labelledby={`hero-carrossel-tab-${audience}`}
          className="relative mt-8"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <ul className="-ml-3 flex list-none md:-ml-4">
              {cards.map((card) => {
                const Icon = card.Icon;
                return (
                  <li
                    key={`${audience}-${card.slug}`}
                    className="min-w-0 shrink-0 grow-0 basis-[78%] pl-3 sm:basis-[48%] md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5"
                  >
                    <Link
                      to={card.href}
                      onClick={() => handleCardClick(card)}
                      className="group flex h-full flex-col justify-between rounded-xl border border-white/12 bg-white/[0.06] p-5 text-left backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      <div>
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 ring-1 ring-inset ring-white/15 transition-colors group-hover:bg-white group-hover:text-slate-900">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <h3 className="mt-4 text-base font-semibold text-white">{card.title}</h3>
                        <p className="mt-1.5 hidden text-sm leading-relaxed text-white/65 sm:block">
                          {card.short}
                        </p>
                      </div>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 group-hover:text-white">
                        Saiba mais
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Arrow controls (desktop) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between md:flex">
            <button
              type="button"
              aria-label="Ver seguros anteriores"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="pointer-events-auto -ml-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white shadow-lg backdrop-blur transition-opacity hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Ver mais seguros"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="pointer-events-auto -mr-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white shadow-lg backdrop-blur transition-opacity hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>

          {/* Mobile hint */}
          <p className="mt-4 text-center text-xs text-white/55 md:hidden" aria-hidden>
            Deslize para o lado para ver todos os seguros
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroInsuranceCarousel;