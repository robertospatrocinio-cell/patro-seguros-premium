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
  Tractor,
  Wheat,
  Sprout,
  Coffee,
  Leaf,
  Combine,
  PawPrint,
  PiggyBank,
  Activity,
  Building,
  FileCheck2,
  Trees,
  Beef,
  Plane as PlaneIcon,
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
import heroAgro from "@/assets/hero-agro.webp";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Audience = "pessoa" | "empresa" | "agro" | "consorcio";

type InsuranceCard = {
  title: string;
  short: string;
  href: string;
  Icon: LucideIcon;
  slug: string;
};

/**
 * Identidade visual por ramo: foto temática (Unsplash, CDN otimizada)
 * + cor de acento HSL para o gradiente do card.
 */
const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=640&q=70`;

/**
 * Theme único por aba (audiência) — cor padronizada, derivada da paleta da marca.
 * Cada card herda o accent da aba para uma identidade visual coesa.
 */
const AUDIENCE_THEMES: Record<Audience, {
  accent: string;        // HSL "h s% l%"
  accentSoft: string;    // HSL "h s% l%" — para gradientes claros
  label: string;
  shortLabel: string;
}> = {
  pessoa:    { accent: "212 88% 38%", accentSoft: "212 88% 55%", label: "Para Você",          shortLabel: "Você" },
  empresa:   { accent: "198 85% 32%", accentSoft: "198 85% 48%", label: "Para sua Empresa",   shortLabel: "Empresa" },
  agro:      { accent: "140 55% 28%", accentSoft: "140 55% 42%", label: "Para o Agro",        shortLabel: "Agro" },
  consorcio: { accent: "28 92% 45%",  accentSoft: "36 95% 55%",  label: "Para Consórcio",     shortLabel: "Consórcio" },
};

const CARD_VISUALS: Record<string, { bg: string; alt: string }> = {
  // Pessoa
  "seguro-auto":         { bg: UNSPLASH("1492144534655-ae79c964c9d7"), alt: "Carro em estrada" },
  "seguro-moto":         { bg: UNSPLASH("1558981806-ec527fa84c39"), alt: "Motocicleta esportiva" },
  "seguro-residencial":  { bg: UNSPLASH("1568605114967-8130f3a36994"), alt: "Casa moderna" },
  "seguro-vida":         { bg: UNSPLASH("1511895426328-dc8714191300"), alt: "Família reunida" },
  "plano-saude":         { bg: UNSPLASH("1576091160550-2173dba999ef"), alt: "Atendimento médico" },
  "seguro-viagem":       { bg: UNSPLASH("1436491865332-7a61a109cc05"), alt: "Avião sobre nuvens" },
  "seguro-celular":      { bg: UNSPLASH("1512941937669-90a1b58e7e9c"), alt: "Smartphone em uso" },
  "seguro-motorista-app":{ bg: UNSPLASH("1549317661-bd32c8ce0db2"), alt: "Motorista de aplicativo" },
  "consorcio":           { bg: UNSPLASH("1560518883-ce09059eeffa"), alt: "Chave de imóvel" },
  "seguro-bike":         { bg: UNSPLASH("1485965120184-e220f721d03e"), alt: "Ciclista urbano" },
  "plano-pet":           { bg: UNSPLASH("1450778869180-41d0601e046e"), alt: "Cachorro feliz" },
  "previdencia-privada": { bg: UNSPLASH("1554224155-6726b3ff858f"), alt: "Planejamento financeiro" },
  "seguro-acidentes-pessoais": { bg: UNSPLASH("1571019613454-1cb2f99b2d8b"), alt: "Pessoa praticando esporte" },
  // Empresa
  "seguro-empresarial":  { bg: UNSPLASH("1486406146926-c627a92ad1ab"), alt: "Prédio comercial" },
  "seguro-frota":        { bg: UNSPLASH("1601584115197-04ecc0da31d7"), alt: "Frota de veículos" },
  "seguro-transporte":   { bg: UNSPLASH("1494412519320-aa613dfb7738"), alt: "Caminhão de carga" },
  "transportadoras":     { bg: UNSPLASH("1586528116311-ad8dd3c8310d"), alt: "Operação logística" },
  "seguro-galpao":       { bg: UNSPLASH("1553413077-190dd305871c"), alt: "Galpão industrial" },
  "plano-saude-pme":     { bg: UNSPLASH("1576091160399-112ba8d25d1d"), alt: "Equipe médica corporativa" },
  "vida-em-grupo":       { bg: UNSPLASH("1521737604893-d14cc237f11d"), alt: "Equipe de trabalho" },
  "seguro-rc":           { bg: UNSPLASH("1505664194779-8beaceb93744"), alt: "Aperto de mãos profissional" },
  "seguro-cyber":        { bg: UNSPLASH("1550751827-4bd374c3f58b"), alt: "Servidor de dados" },
  "seguro-engenharia":   { bg: UNSPLASH("1503387762-592deb58ef4e"), alt: "Obra de engenharia" },
  "seguro-garantia":     { bg: UNSPLASH("1450101499163-c8848c66ca85"), alt: "Documento contratual" },
  "seguro-condominio":   { bg: UNSPLASH("1545324418-cc1a3fa10c00"), alt: "Condomínio residencial" },
  "seguro-ambiental":    { bg: UNSPLASH("1473448912268-2022ce9509d8"), alt: "Paisagem ambiental" },
  "seguro-armazenagem":  { bg: UNSPLASH("1586528116493-a029325540fa"), alt: "Centro de armazenagem" },
  // Agro
  "seguro-propriedade-rural": { bg: UNSPLASH("1500382017468-9049fed747ef"), alt: "Propriedade rural ao amanhecer" },
  "seguro-rural":             { bg: UNSPLASH("1464226184884-fa280b87c399"), alt: "Fazenda com plantação" },
  "seguro-maquinas-agricolas":{ bg: UNSPLASH("1605000797499-95a51c5269ae"), alt: "Trator agrícola no campo" },
  "seguro-colheitadeira-graos":{ bg: UNSPLASH("1500595046743-cd271d694d30"), alt: "Colheitadeira em campo de grãos" },
  "seguro-colhedora-cana":    { bg: UNSPLASH("1574943320219-89283c1f7d5e"), alt: "Colhedora de cana-de-açúcar" },
  "seguro-colhedora-algodao": { bg: UNSPLASH("1591100406836-1f7e3b94c4d3"), alt: "Plantação de algodão" },
  "seguro-cafe":              { bg: UNSPLASH("1542223189-67a03fa0f0bd"), alt: "Plantação de café" },
  "seguro-silo-agricola":     { bg: UNSPLASH("1625246333195-78d9c38ad449"), alt: "Silos agrícolas" },
  "seguro-transporte-agro":   { bg: UNSPLASH("1601584115197-04ecc0da31d7"), alt: "Transporte de cargas agrícolas" },
  "seguro-pecuario":          { bg: UNSPLASH("1500595046743-cd271d694d30"), alt: "Rebanho bovino" },
  "seguro-drone-agricola":    { bg: UNSPLASH("1473968512647-3e447244af8f"), alt: "Drone agrícola sobre lavoura" },
  "seguro-agro":              { bg: UNSPLASH("1625246333195-78d9c38ad449"), alt: "Operação agrícola completa" },
  // Consórcio
  "consorcio-carro":          { bg: UNSPLASH("1492144534655-ae79c964c9d7"), alt: "Carro novo entregue" },
  "consorcio-imoveis":        { bg: UNSPLASH("1568605114967-8130f3a36994"), alt: "Imóvel residencial" },
  "consorcio-veiculos-pesados":{ bg: UNSPLASH("1601584115197-04ecc0da31d7"), alt: "Caminhão pesado" },
  "consorcio-moto":           { bg: UNSPLASH("1558981806-ec527fa84c39"), alt: "Motocicleta nova" },
  "consorcio-geral":          { bg: UNSPLASH("1560518883-ce09059eeffa"), alt: "Conquista de bem" },
  "ebook-consorcio":          { bg: UNSPLASH("1521587760476-6c12a4b040da"), alt: "Guia de consórcio" },
};

export const cardsPessoa: InsuranceCard[] = [
  { title: "Seguro Auto", short: "Carro, terceiros e assistência 24h.", href: "/seguro-auto", Icon: Car, slug: "seguro-auto" },
  { title: "Seguro Moto", short: "Proteção para sua moto no dia a dia.", href: "/seguro-moto", Icon: Bike, slug: "seguro-moto" },
  { title: "Seguro Residencial", short: "Casa, apto e assistência completa.", href: "/seguro-residencial", Icon: Home, slug: "seguro-residencial" },
  { title: "Seguro de Vida", short: "Estabilidade financeira para sua família.", href: "/seguro-vida", Icon: HeartPulse, slug: "seguro-vida" },
  { title: "Plano de Saúde", short: "Comparamos 20+ operadoras para você.", href: "/planos-de-saude", Icon: Stethoscope, slug: "plano-saude" },
  { title: "Seguro Viagem", short: "Cobertura médica e bagagem no exterior.", href: "/seguro-viagem", Icon: Plane, slug: "seguro-viagem" },
  { title: "Seguro Celular", short: "Roubo, furto e danos acidentais.", href: "/seguro-celular", Icon: Smartphone, slug: "seguro-celular" },
  { title: "Motorista de App", short: "Cobertura para quem dirige Uber/99.", href: "/seguro-motorista-app", Icon: Navigation, slug: "seguro-motorista-app" },
  { title: "Seguro Bike", short: "Roubo, colisão e assistência ao ciclista.", href: "/seguro-bike", Icon: Bike, slug: "seguro-bike" },
  { title: "Plano Pet", short: "Saúde, consultas e cirurgias para seu pet.", href: "/plano-pet", Icon: PawPrint, slug: "plano-pet" },
  { title: "Acidentes Pessoais", short: "Invalidez, morte acidental e diárias.", href: "/seguro-acidentes-pessoais", Icon: Activity, slug: "seguro-acidentes-pessoais" },
  { title: "Previdência Privada", short: "Aposentadoria planejada e benefícios fiscais.", href: "/previdencia-privada", Icon: PiggyBank, slug: "previdencia-privada" },
  { title: "Consórcio", short: "Carro, moto ou imóvel sem juros.", href: "/consorcio", Icon: KeyRound, slug: "consorcio" },
];

export const cardsEmpresa: InsuranceCard[] = [
  { title: "Seguro Empresarial", short: "Patrimônio, lucros cessantes e RC.", href: "/seguro-empresarial", Icon: Building2, slug: "seguro-empresarial" },
  { title: "Seguro Frota", short: "Economia de até 40% vs apólices individuais.", href: "/seguro-frota", Icon: Truck, slug: "seguro-frota" },
  { title: "Transporte e Carga", short: "RCTR-C, RCF-DC e cargas em trânsito.", href: "/seguro-transporte", Icon: PackageCheck, slug: "seguro-transporte" },
  { title: "Transportadoras", short: "Solução completa para operação logística.", href: "/nicho-transportadoras", Icon: Boxes, slug: "transportadoras" },
  { title: "Seguro Galpão", short: "Blindagem patrimonial e All-Risks.", href: "/seguro-galpao", Icon: Warehouse, slug: "seguro-galpao" },
  { title: "Plano de Saúde PME", short: "Saúde corporativa a partir de 2 vidas.", href: "/plano-saude-empresarial", Icon: Briefcase, slug: "plano-saude-pme" },
  { title: "Vida em Grupo", short: "Benefício essencial para o seu time.", href: "/seguro-vida-pme", Icon: Users, slug: "vida-em-grupo" },
  { title: "Responsabilidade Civil", short: "Proteção contra danos a terceiros.", href: "/seguro-rc", Icon: ShieldCheck, slug: "seguro-rc" },
  { title: "Seguro Cyber", short: "Vazamento de dados e ataques digitais.", href: "/seguro-cyber", Icon: Lock, slug: "seguro-cyber" },
  { title: "Seguro Engenharia", short: "Obras civis, instalação e montagem.", href: "/seguro-engenharia", Icon: HardHat, slug: "seguro-engenharia" },
  { title: "Seguro Garantia", short: "Performance, judicial e contratual.", href: "/seguro-garantia", Icon: FileCheck2, slug: "seguro-garantia" },
  { title: "Seguro Condomínio", short: "Áreas comuns, RC e equipamentos.", href: "/seguro-condominio", Icon: Building, slug: "seguro-condominio" },
  { title: "Seguro Ambiental", short: "Riscos ambientais e remediação.", href: "/seguro-ambiental", Icon: Trees, slug: "seguro-ambiental" },
  { title: "Armazenagem", short: "Mercadorias estocadas e operadores logísticos.", href: "/seguro-armazenagem", Icon: Warehouse, slug: "seguro-armazenagem" },
];

export const cardsAgro: InsuranceCard[] = [
  { title: "Propriedade Rural", short: "Sede, benfeitorias e instalações.", href: "/seguro-propriedade-rural", Icon: Sprout, slug: "seguro-propriedade-rural" },
  { title: "Seguro Rural", short: "Cobertura ampla para produtor rural.", href: "/seguro-rural", Icon: Leaf, slug: "seguro-rural" },
  { title: "Máquinas Agrícolas", short: "Tratores, implementos e pulverizadores.", href: "/seguro-maquinas-agricolas", Icon: Tractor, slug: "seguro-maquinas-agricolas" },
  { title: "Colheitadeira de Grãos", short: "Soja, milho, trigo e sorgo.", href: "/seguro-colheitadeira-graos", Icon: Combine, slug: "seguro-colheitadeira-graos" },
  { title: "Colhedora de Cana", short: "Proteção total da safra canavieira.", href: "/seguro-colhedora-cana", Icon: Combine, slug: "seguro-colhedora-cana" },
  { title: "Colhedora de Algodão", short: "Equipamentos de alta complexidade.", href: "/seguro-colhedora-algodao", Icon: Combine, slug: "seguro-colhedora-algodao" },
  { title: "Seguro Café", short: "Lavoura, armazém e beneficiamento.", href: "/seguro-cafe", Icon: Coffee, slug: "seguro-cafe" },
  { title: "Silo Agrícola", short: "Armazenagem e estoque de grãos.", href: "/seguro-silo-agricola", Icon: Wheat, slug: "seguro-silo-agricola" },
  { title: "Transporte Agro", short: "Cargas agrícolas em trânsito nacional.", href: "/seguro-transporte-agro", Icon: Truck, slug: "seguro-transporte-agro" },
  { title: "Seguro Pecuário", short: "Bovinos, equinos e rebanho leiteiro.", href: "/seguro-pecuario", Icon: Beef, slug: "seguro-pecuario" },
  { title: "Drone Agrícola", short: "Pulverização e mapeamento de lavouras.", href: "/seguro-drone-agricola", Icon: PlaneIcon, slug: "seguro-drone-agricola" },
  { title: "Seguro Agro Completo", short: "Solução integrada para o agronegócio.", href: "/seguro-agro", Icon: Leaf, slug: "seguro-agro" },
];

export const cardsConsorcio: InsuranceCard[] = [
  { title: "Consórcio", short: "Conquiste sem juros: carro, moto ou imóvel.", href: "/consorcio", Icon: KeyRound, slug: "consorcio-geral" },
  { title: "Consórcio de Carro", short: "Carro novo ou seminovo sem juros.", href: "/consorcio-carro", Icon: Car, slug: "consorcio-carro" },
  { title: "Consórcio de Imóveis", short: "Casa, apto, terreno ou construção.", href: "/consorcio-imoveis", Icon: Home, slug: "consorcio-imoveis" },
  { title: "Veículos Pesados", short: "Caminhões, máquinas e implementos.", href: "/consorcio-veiculos-pesados", Icon: Truck, slug: "consorcio-veiculos-pesados" },
  { title: "E-book do Consórcio", short: "Guia gratuito para escolher sua carta.", href: "/ebook-consorcio", Icon: Briefcase, slug: "ebook-consorcio" },
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
    dragFree: true,
    skipSnaps: false,
    containScroll: "trimSnaps",
    duration: reduceMotion ? 0 : 22,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selectedSnap, setSelectedSnap] = useState(0);

  const cards =
    audience === "pessoa"
      ? cardsPessoa
      : audience === "empresa"
      ? cardsEmpresa
      : audience === "agro"
      ? cardsAgro
      : cardsConsorcio;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedSnap(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      onSelect();
      setSnaps(emblaApi.scrollSnapList());
    });
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    emblaApi?.scrollTo(0);
  }, [audience, emblaApi]);

  const handleAudience = (next: Audience) => {
    if (next === audience) return;
    setAudience(next);
    try {
      const eventName =
        next === "pessoa"
          ? "clique_toggle_para_voce"
          : next === "empresa"
          ? "clique_toggle_para_empresa"
          : next === "agro"
          ? "clique_toggle_para_agro"
          : "clique_toggle_para_consorcio";
      window.gtag?.("event", eventName, {
        event_category: "hero_carrossel",
        tipo_de_publico: next,
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
    () => buildWhatsAppUrl({ origem, audience }),
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

  const bgImage =
    audience === "pessoa"
      ? heroFamilia
      : audience === "empresa"
      ? heroEmpresa
      : audience === "agro"
      ? heroAgro
      : heroFamilia;
  const bgAlt =
    audience === "pessoa"
      ? "Família protegida pela consultoria da Patro Seguros"
      : audience === "empresa"
      ? "Empresário recebendo consultoria empresarial da Patro Seguros"
      : audience === "agro"
      ? "Produtor rural com plantação ao fundo, protegido pela Patro Seguros"
      : "Família conquistando seus bens com consórcio pela Patro Seguros";

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
            className="mt-6 text-3xl font-light leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.5rem]"
            style={{
              fontFeatureSettings: '"ss01", "kern"',
              letterSpacing: "-0.02em",
            }}
          >
            {headline}
          </HeadingTag>
          <span
            aria-hidden
            className="mx-auto mt-6 block h-px w-16 bg-gradient-to-r from-transparent via-[#D4A857] to-transparent"
          />
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
                audience === "pessoa"
                  ? "Para Você"
                  : audience === "empresa"
                  ? "Para sua Empresa"
                  : audience === "agro"
                  ? "Para o Agro"
                  : "Para Consórcio"
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

        {/* Toggle — cor padronizada por aba */}
        <div className="mx-auto mt-10 flex max-w-2xl justify-center">
          <div
            role="tablist"
            aria-label="Tipo de proteção"
            className="inline-flex w-full flex-wrap gap-1 rounded-2xl border border-white/15 bg-white/[0.06] p-1.5 backdrop-blur sm:flex-nowrap sm:rounded-full"
          >
            {(Object.keys(AUDIENCE_THEMES) as Audience[]).map((id) => {
              const opt = AUDIENCE_THEMES[id];
              const active = audience === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`hero-carrossel-painel-${id}`}
                  id={`hero-carrossel-tab-${id}`}
                  type="button"
                  onClick={() => handleAudience(id)}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:rounded-full ${
                    active
                      ? "text-white shadow-lg"
                      : "text-white/70 hover:text-white"
                  }`}
                  style={
                    active
                      ? {
                          background: `linear-gradient(135deg, hsl(${opt.accent}) 0%, hsl(${opt.accentSoft}) 100%)`,
                          boxShadow: `0 8px 24px -8px hsl(${opt.accent} / 0.6)`,
                        }
                      : undefined
                  }
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
          {(() => {
            const theme = AUDIENCE_THEMES[audience];
            return (
          <div
            className="-mx-4 overflow-hidden px-4 sm:mx-0 sm:px-0"
            ref={emblaRef}
            style={{ touchAction: "pan-y" }}
          >
            <ul className="-ml-3 flex list-none touch-pan-y md:-ml-4">
              {cards.map((card) => {
                const Icon = card.Icon;
                const visuals = CARD_VISUALS[card.slug] ?? {
                  bg: "",
                  alt: card.title,
                };
                return (
                  <li
                    key={`${audience}-${card.slug}`}
                    className="min-w-0 shrink-0 grow-0 basis-[82%] pl-3 xs:basis-[72%] sm:basis-[48%] md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5"
                  >
                    <Link
                      to={card.href}
                      onClick={() => handleCardClick(card)}
                      aria-label={`${card.title} — ${card.short}`}
                      className="group relative isolate flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-white/12 p-4 text-left shadow-[0_4px_16px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:min-h-[240px] sm:p-5 motion-reduce:transform-none motion-reduce:transition-none"
                      style={{
                        backgroundColor: `hsl(${theme.accent} / 0.22)`,
                      }}
                    >
                      {/* Foto temática de fundo */}
                      {visuals.bg && (
                        <img
                          src={visuals.bg}
                          alt=""
                          aria-hidden
                          loading="lazy"
                          decoding="async"
                          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-40 transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-90 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                      )}
                      {/* Gradient overlay tingido com a cor da aba */}
                      <div
                        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500 ease-out group-hover:opacity-50 motion-reduce:transition-none"
                        style={{
                          backgroundImage: `linear-gradient(150deg, hsl(${theme.accent} / 0.92) 0%, hsl(${theme.accentSoft} / 0.65) 45%, rgba(2,6,23,0.88) 100%)`,
                        }}
                      />
                      {/* Vinheta inferior para manter legibilidade do texto no hover */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(to top, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.45) 55%, rgba(2,6,23,0) 100%)",
                        }}
                      />
                      {/* Barra superior com cor da aba para identidade visual */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-1"
                        style={{
                          background: `linear-gradient(90deg, hsl(${theme.accent}), hsl(${theme.accentSoft}))`,
                        }}
                      />
                      <div>
                        <span
                          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-inset ring-white/30 backdrop-blur transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-slate-900 sm:h-12 sm:w-12"
                        >
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <h3 className="mt-3 text-[15px] font-semibold leading-snug text-white sm:mt-4 sm:text-base">{card.title}</h3>
                        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-white/85 sm:line-clamp-none sm:text-sm">
                          {card.short}
                        </p>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white drop-shadow sm:mt-5">
                        Saiba mais
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
            );
          })()}

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

          {/* Mobile: dots + hint */}
          <div className="mt-5 flex flex-col items-center gap-2 md:hidden">
            {snaps.length > 1 && (
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Navegar entre seguros">
                {snaps.map((_, i) => {
                  const active = i === selectedSnap;
                  const theme = AUDIENCE_THEMES[audience];
                  return (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-label={`Ir para o slide ${i + 1}`}
                      onClick={() => emblaApi?.scrollTo(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        active ? "w-6" : "w-1.5 bg-white/30"
                      }`}
                      style={
                        active
                          ? { background: `linear-gradient(90deg, hsl(${theme.accent}), hsl(${theme.accentSoft}))` }
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            )}
            <p className="text-center text-[11px] uppercase tracking-wider text-white/50" aria-hidden>
              Arraste para o lado
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroInsuranceCarousel;