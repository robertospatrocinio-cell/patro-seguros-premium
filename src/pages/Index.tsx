import { useState, useMemo, memo, useEffect, useCallback, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, MapPin, Building2, Car, HeartPulse, ShieldCheck, Award, Users, Star, Home, Truck } from "lucide-react";
import { EMPRESA } from "@/config/empresa";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";

// Lazy components
const QuickLeadForm = lazy(() => import("@/components/QuickLeadForm").then(m => ({ default: m.QuickLeadForm })));
const LeadWhatsAppFlow = lazy(() => import("@/components/LeadWhatsAppFlow").then(m => ({ default: m.LeadWhatsAppFlow })));
const LocalTestimonials = lazy(() => import("@/components/LocalTestimonials"));
const RamosCarousel = lazy(() => import("@/components/carousels/RamosCarousel"));
const BlogCarousel = lazy(() => import("@/components/carousels/BlogCarousel"));

const WHATSAPP_URL = `https://wa.me/551151997500?text=${encodeURIComponent("Olá! Vim pelo site da Patro Seguros e gostaria de uma cotação de seguro.")}`;

const PRODUCT_CARDS = [
  { icon: Car, title: "Seguro Auto", desc: "Seguro compreensivo em Guarulhos.", path: "/seguro-auto-guarulhos" },
  { icon: Home, title: "Residencial", desc: "Sua casa ou apto protegidos.", path: "/seguro-residencial" },
  { icon: HeartPulse, title: "Vida", desc: "Segurança para quem você ama.", path: "/seguro-vida-guarulhos" },
  { icon: HeartPulse, title: "Saúde", desc: "Melhores operadoras da região.", path: "/planos-de-saude" },
  { icon: Building2, title: "Empresarial", desc: "Proteção para seu patrimônio.", path: "/seguro-empresarial-guarulhos" },
  { icon: Truck, title: "Frota", desc: "Gestão e economia para frotas.", path: "/seguro-frota-empresas-guarulhos" },
];

const BairrosChips = [
  { name: "Cidade Maia", path: "/seguros-guarulhos/seguros-cidade-maia-guarulhos" },
  { name: "Vila Galvão", path: "/seguros-guarulhos/seguros-vila-galvao-guarulhos" },
  { name: "Cumbica", path: "/seguros-guarulhos/seguros-cumbica-guarulhos" },
  { name: "Bonsucesso", path: "/seguros-guarulhos/seguros-bonsucesso-guarulhos" },
  { name: "Pimentas", path: "/seguros-guarulhos/seguros-pimentas-guarulhos" },
];

const Index = () => {
  return (
    <>
      <PageMeta
        title="Seguros em Guarulhos | Patro Seguros — Compare 16 Seguradoras"
        description="Corretora de seguros em Guarulhos com nota 4.9 no Google. Compare 16+ seguradoras em auto, residencial, vida, saúde e empresarial. Cotação em até 2h."
        service={{
          name: "Consultoria de Seguros Multiramos",
          description: "Corretora de seguros em Guarulhos comparando 16+ seguradoras para oferecer o melhor custo-benefício em auto, saúde, vida e empresarial.",
          type: "InsuranceBrokerage"
        }}
      />
      <Header />
      <main id="main-content">
        {/* HERO SECTION */}
        <section className="relative pt-16 pb-28 md:pt-24 md:pb-36 overflow-hidden gradient-hero">
          {/* Halo institucional discreto */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-[26rem] h-[26rem] rounded-full bg-primary-glow/10 blur-3xl z-0" aria-hidden="true" />
          {/* Background image optimized for LCP */}
          <picture className="absolute inset-0 z-0">
            <source
              media="(max-width: 640px)"
              srcSet="/images/hero-home-480.avif"
              type="image/avif"
            />
            <source
              media="(max-width: 640px)"
              srcSet="/images/hero-home-480.webp"
              type="image/webp"
            />
            <source
              media="(max-width: 1024px)"
              srcSet="/images/hero-home-960.avif"
              type="image/avif"
            />
            <source
              media="(max-width: 1024px)"
              srcSet="/images/hero-home-960.webp"
              type="image/webp"
            />
            <source srcSet="/images/hero-home-1280.avif" type="image/avif" />
            <img
              src="/images/hero-home-1280.webp"
              alt="Corretora de Seguros em Guarulhos"
              className="w-full h-full object-cover opacity-[0.18]"
              width="1280"
              height="720"
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </picture>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 mb-6 text-[11px] font-medium text-white/90">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] motion-safe:animate-pulse" aria-hidden="true" />
                  Atendimento consultivo em Guarulhos
                </p>
                <h1 className="font-heading text-white mb-5 font-extrabold tracking-tight text-balance text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.06]">
                  Seguros em Guarulhos — Compare <span className="text-primary-glow">16 seguradoras</span> e economize
                </h1>
                <p className="text-[17px] md:text-[19px] text-white/75 mb-9 max-w-xl leading-relaxed">Atendimento consultivo, registro SUSEP e nota 4.9 no Google. Cotação comparativa em até 2 horas úteis.</p>
                <div className="flex flex-col sm:flex-row gap-3 mb-7">
                  <Button size="lg" asChild className="h-14 px-8 text-base bg-accent hover:bg-accent-hover text-accent-foreground shadow-lg shadow-black/25 rounded-xl transition-colors duration-200">
                    <Link to="/cotacao" onClick={() => trackCotacaoClick("hero")}>Cotar agora com especialistas</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="h-14 px-8 text-base bg-transparent text-white border-white/35 hover:bg-white/10 hover:text-white rounded-xl transition-colors duration-200">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hero")}>Falar no WhatsApp</a>
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                   <Star className="text-yellow-400 fill-current w-4 h-4" /> <span><strong className="font-semibold text-white">4.9</strong> · 67 avaliações no Google</span>
                </div>
              </div>
              <div className="lg:ml-auto w-full lg:-mb-24">
                <Suspense fallback={<div className="h-[400px] min-w-[280px] bg-white/10 rounded-2xl animate-pulse" />}>
                    <LeadWhatsAppFlow />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* Confiança */}
        <section className="py-10 bg-secondary border-b border-border">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8">
            {[
              { label: "Registro", value: "SUSEP 212113511" },
              { label: "Carteira", value: "2.500+ clientes" },
              { label: "Parcerias", value: "16+ seguradoras" },
              { label: "Reputação", value: "Nota 4.9 no Google" },
            ].map((item) => (
              <div key={item.value} className="flex flex-col gap-1 md:items-center md:text-center">
                <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-muted-foreground">{item.label}</span>
                <span className="text-sm md:text-base font-bold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Produtos */}
        <section className="py-16 md:py-24 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">O que você quer proteger?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {PRODUCT_CARDS.map(p => (
              <Link key={p.title} to={p.path} className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group">
                <p.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        {/* Carrossel 1 — Ramos de seguros (obrigatório) */}
        <Suspense fallback={<div className="container mx-auto px-4 py-16"><div className="h-[380px] rounded-2xl bg-muted animate-pulse" /></div>}>
          <RamosCarousel />
        </Suspense>

        <section className="py-16 md:py-24 bg-background container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Como funciona a cotação</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
                    <h3 className="font-bold mb-2">Você envia os dados</h3>
                    <p className="text-muted-foreground">Preencha nosso formulário rápido ou nos chame no WhatsApp.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
                    <h3 className="font-bold mb-2">Comparamos em 16+ seguradoras</h3>
                    <p className="text-muted-foreground">Analisamos as melhores taxas e coberturas para o seu perfil.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
                    <h3 className="font-bold mb-2">Você recebe a proposta em até 2h</h3>
                    <p className="text-muted-foreground">Propostas claras e detalhadas enviadas direto no seu celular.</p>
                </div>
            </div>
        </section>

        {/* Avaliações */}
        <section className="py-16 md:py-24 bg-secondary rounded-3xl container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
            <Suspense fallback={<div>Carregando avaliações...</div>}>
                <LocalTestimonials />
            </Suspense>
        </section>

        {/* Empresas */}
        <section className="py-16 md:py-24 bg-background container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Proteção especializada para empresas em Guarulhos</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Frota", path: "/seguro-frota" },
                    { title: "Transporte e Carga", path: "/seguro-transporte" },
                    { title: "Saúde PME", path: "/plano-saude-empresarial" },
                    { title: "Responsabilidade Civil", path: "/seguro-rc" }
                ].map(e => (
                    <Link key={e.title} to={e.path} className="p-6 border border-border rounded-2xl bg-card transition-all duration-200 hover:border-accent/40 hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex items-center justify-between group">
                        <span className="font-bold">{e.title}</span>
                        <ArrowRight className="w-4 h-4 text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                ))}
            </div>
            <div className="mt-8 text-center">
                <Button variant="link" asChild>
                    <Link to="/seguro-empresa">Conhecer Patro Empresas →</Link>
                </Button>
            </div>
        </section>

        {/* Seção Local */}
        <section className="py-16 md:py-24 bg-secondary rounded-3xl container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Corretora de seguros em Guarulhos e região</h2>
            <div className="flex flex-wrap gap-3 justify-center">
                {BairrosChips.map(b => (
                    <Button key={b.name} variant="outline" asChild>
                        <Link to={b.path}>{b.name}</Link>
                    </Button>
                ))}
            </div>
        </section>
        
        {/* Mapa + NAP */}
        {/* Carrossel 2 — Artigos do blog (obrigatório) */}
        <Suspense fallback={<div className="container mx-auto px-4 py-16"><div className="h-[420px] rounded-2xl bg-muted animate-pulse" /></div>}>
          <BlogCarousel />
        </Suspense>

        <section className="py-16 container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nossa sede em Guarulhos</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-lg)] h-[400px]">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.626387083049!2d-46.52423982464134!3d-23.44577887884841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8b9a2c1f9d55%3A0x17b8f95c52c29015!2sAv.%20Salgado%20Filho%2C%202120%20-%20Vila%20Rio%20de%20Janeiro%2C%20Guarulhos%20-%20SP!5e0!3m2!1sen!2sbr!4v1700000000000!5m2!1sen!2sbr" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy"
                        title="Localização Patro Seguros no Google Maps"
                    ></iframe>
                </div>
                <div className="space-y-4">
                    <h3 className="font-bold text-2xl text-primary">Patro Corretora de Seguros LTDA</h3>
                    <div className="space-y-2 text-muted-foreground">
                        <p className="flex items-start gap-2">
                            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span>Av. Salgado Filho, 2120 — Sala 219 — Ed. Via Alameda<br/>Cidade Maia, Guarulhos/SP — CEP 07115-000</span>
                        </p>
                        <p>Telefone: (11) 5199-7500</p>
                        <p>Horário: Seg–Sex 8h30–18h</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;