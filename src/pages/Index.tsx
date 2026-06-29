import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, AlertTriangle, Clock, ShieldCheck, Building2 } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import WebSiteSchema from "@/components/WebSiteSchema";
import ServiceSchema from "@/components/ServiceSchema";
import MedicalOrganizationSchema from "@/components/MedicalOrganizationSchema";

import AggregateRatingSchema from "@/components/AggregateRatingSchema";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";
import LazySection from "@/components/LazySection";
import GoogleBusinessWidget from "@/components/GoogleBusinessWidget";

// Below-the-fold heavy components — code-split to lighten initial JS
const HeroInsuranceCarousel = lazy(() => import("@/components/HeroInsuranceCarousel"));
const QuickLeadForm = lazy(() =>
  import("@/components/QuickLeadForm").then((m) => ({ default: m.QuickLeadForm }))
);
const HomeSelector = lazy(() =>
  import("@/components/HomeSelector").then((m) => ({ default: m.HomeSelector }))
);
const LocalSavingsCalculator = lazy(() => import("@/components/LocalSavingsCalculator"));
const LocalTestimonials = lazy(() => import("@/components/LocalTestimonials"));
const HomeBlogSection = lazy(() => import("@/components/HomeBlogSection"));
const PortoPartnershipSection = lazy(() => import("@/components/PortoPartnershipSection"));

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

import { INSURER_WEBSITES } from "@/data/insurerWebsites";

const parceiros = ["AKAD", "ALLIANZ", "AMIL", "AXA", "AZOS", "AZUL", "BRADESCO", "DARWIN", "EZZE", "HAPVIDA/NOTREDAME", "HDI", "ITAÚ", "ITURAN", "JUSTOS", "LIBERTY", "MAG", "MAPFRE", "MEDSENIOR", "MITSUI", "OMINT", "PIER", "PORTO", "PREVENT SENIOR", "SOMPO", "SUHAI", "SULAMERICA", "SURA", "TOKIO MARINE", "UNIMED", "YOUSE", "ZURICH"];

const faqs = [
  { question: "Por que escolher uma corretora de seguros em Guarulhos?", answer: "Uma corretora local em Guarulhos conhece os riscos da região — alagamentos, índices de roubo por bairro, trânsito — e recomenda coberturas adequadas. A Patro Seguros compara cotações de mais de 16 seguradoras para encontrar o melhor custo-benefício." },
  { question: "Quanto tempo leva para receber uma cotação?", answer: "Em até 2 horas úteis você recebe sua cotação personalizada com propostas comparativas de múltiplas seguradoras." },
  { question: "A cotação é realmente gratuita?", answer: "Sim. Todas as nossas cotações de seguro são 100% gratuitas e sem compromisso. Compare à vontade." },
  { question: "Quais tipos de seguro a Patro Seguros oferece em Guarulhos?", answer: "Seguro auto, seguro residencial, seguro de vida, seguro empresarial, seguro de frota, planos de saúde, consórcio e muito mais. Atendemos pessoas físicas, famílias e empresas de todos os portes." },
  { question: "Como funciona o suporte em caso de sinistro?", answer: "A Patro cuida de todo o processo junto à seguradora: abertura, documentação, acompanhamento e resolução. Você não precisa ligar para a seguradora — nós fazemos isso por você." },
  { question: "Vocês atendem em todos os bairros de Guarulhos?", answer: "Sim. A Patro Seguros atende toda Guarulhos — Centro, Cumbica, Pimentas, Bonsucesso, Taboão, Vila Galvão, Macedo, Cidade Maia, Gopoúva, Ponte Grande, Vila Augusta, Jardim Maia, Picanço — e também cidades vizinhas como Arujá, Itaquaquecetuba, Mairiporã e a zona leste de São Paulo." },
  { question: "Qual a diferença entre contratar com a Patro Seguros e direto com a seguradora?", answer: "Você paga o mesmo preço de tabela, mas ganha um corretor que compara várias seguradoras, recomenda a melhor cobertura para o seu perfil e cuida da sua apólice na hora do sinistro. Nossa remuneração vem da seguradora, não do cliente." },
  { question: "Posso comparar planos de saúde por bairro de Guarulhos?", answer: "Sim. Validamos a rede credenciada por bairro antes de fechar — hospitais, laboratórios e clínicas próximos da sua casa ou empresa em Guarulhos. Isso evita contratar um plano que tenha rede só do outro lado da cidade." },
];

const sinistroFaqs = [
  { question: "Sofri um acidente, o que devo fazer primeiro?", answer: "Sinalize o local, verifique se há feridos (se sim, ligue 192 ou 193) e não assuma culpa. Tire fotos dos danos e da posição dos veículos antes de removê-los e chame a Patro Seguros pelo WhatsApp para orientações imediatas." },
  { question: "Como acionar o guincho 24h?", answer: "Você pode solicitar diretamente pelo aplicativo da sua seguradora ou falar com a Patro Seguros no WhatsApp. Nós localizamos sua apólice e solicitamos a assistência técnica ou mecânica para você em minutos." },
  { question: "Fui roubado, qual o procedimento?", answer: "A primeira etapa é registrar o Boletim de Ocorrência (B.O.). Com o documento em mãos, entre em contato com a Central de Sinistro da Patro para iniciarmos o processo de indenização junto à seguradora." },
  { question: "Preciso pagar franquia em caso de sinistro de terceiros?", answer: "Geralmente não. Na maioria das apólices, a cobertura de danos a terceiros (RCF-V) não possui cobrança de franquia para o segurado. A franquia só é paga quando você decide consertar o seu próprio veículo pelo seguro." },
  { question: "Quanto tempo demora o conserto do veículo pelo seguro?", answer: "O prazo depende da liberação da seguradora (normalmente até 48h após a vistoria) e da disponibilidade de peças na oficina. A Patro Seguros acompanha todo o processo para agilizar a entrega do seu carro." },
];

const Index = () => {
  return (
    <>
      <PageMeta 
        title="Corretora de Seguros em Guarulhos | Patro Seguros"
        description="Corretora de seguros em Guarulhos com atendimento consultivo. Compare 16+ seguradoras para seguro auto, saúde, vida, empresa e residencial."
        absoluteTitle={true}
      />
      <FAQSchema faqs={[...faqs, ...sinistroFaqs]} />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebSiteSchema />
      <ServiceSchema 
        name="Consultoria de Seguros em Guarulhos" 
        description="Serviços profissionais de corretagem e consultoria de seguros para pessoas físicas e empresas."
      />
      <MedicalOrganizationSchema />
      <AggregateRatingSchema
        serviceName="Corretora de Seguros em Guarulhos"
        url={CANONICAL_BASE_URL}
        description="Corretora de seguros em Guarulhos: auto, residencial, vida, saúde e frotas. 16+ seguradoras parceiras."
      />
      <Header />
      <main id="main-content">
        {/* HERO SECTION */}
        <section className="relative min-h-[600px] flex items-center bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <picture>
              {/* Mobile variant (≤600px) — keeps weight low on slow connections */}
              <source
                media="(max-width: 600px)"
                srcSet="/images/hero-home-sm.webp"
                type="image/webp"
              />
              {/* Desktop / tablet */}
              <source srcSet="/images/hero-home.webp" type="image/webp" />
              <img
                src="/images/hero-home.webp"
                alt="Corretora de Seguros em Guarulhos"
                width={960}
                height={540}
                sizes="100vw"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover opacity-30"
                {...({ fetchpriority: "high" } as any)}
              />
            </picture>
          </div>
          <div className="container mx-auto px-4 relative z-10 py-12 md:py-20 text-center lg:text-left">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-3xl">
                <SeloMelhorCorretora size="lg" priority className="mb-8 mx-auto lg:mx-0" />
                <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Corretora de seguros em Guarulhos para você e sua empresa
                </h1>
                <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Compare seguradoras e encontre proteção para seu carro, família ou empresa com atendimento consultivo da Patro Seguros.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/cotacao" onClick={() => trackCotacaoClick("hero")}>
                    <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 font-bold bg-[#1e3a8a] hover:bg-[#1e40af] text-white border-b-4 border-[#172554] active:border-b-0 active:translate-y-1 transition-all">
                      Solicitar cotação agora
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hero")}>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-green-500 hover:bg-green-600 text-white border-green-600 hover:border-green-700 font-bold shadow-lg shadow-green-500/20 transition-all">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Falar no WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

              <div className="hidden lg:block animate-in fade-in slide-in-from-right duration-700">
                <GoogleBusinessWidget />
              </div>
            </div>
          </div>
        </section>

        {/* QUICK LEAD FORM */}
        <Suspense fallback={<div style={{ minHeight: 320 }} aria-hidden="true" />}>
          <QuickLeadForm />
        </Suspense>

        {/* HERO CARROSSEL — Conversion shortcut: toggle Pessoa/Empresa + cards principais */}
        <Suspense fallback={<div style={{ minHeight: 520 }} aria-hidden="true" />}>
          <HeroInsuranceCarousel />
        </Suspense>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/10">
                Excelência Comprovada
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                O que nossos clientes dizem
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl font-bold text-slate-900">4.9/5.0</span>
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map(i => (
                    <ArrowRight key={i} className="w-5 h-5 fill-current hidden" /> 
                  ))}
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-500 font-medium">+340 avaliações reais no Google Maps</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: "Ricardo Silva", loc: "Vila Augusta", text: "Consegui reduzir meu seguro auto em 20% com a Patro. O atendimento via WhatsApp foi muito rápido e prático." },
                { name: "Mariana Costa", loc: "Cidade Maia", text: "O seguro residencial deles é excelente. Tive um problema elétrico e a assistência 24h resolveu tudo no mesmo dia." },
                { name: "André Santos", loc: "Cumbica", text: "Para quem trabalha com logística aqui em Cumbica, ter uma corretora que entende da região faz toda a diferença." }
              ].map((t, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex text-yellow-400 mb-4">
                    {[1, 2, 3, 4, 5].map(j => (
                      <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-700 italic mb-6 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.loc}, Guarulhos</p>
                    </div>
                    <img
                      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                      alt="Avaliação verificada no Google"
                      width={46}
                      height={15}
                      decoding="async"
                      loading="lazy"
                      className="h-[15px] w-auto ml-auto opacity-50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GOOGLE BUSINESS WIDGET (Mobile Only Version for immediate social proof) */}
        <div className="lg:hidden container mx-auto px-4 pt-12">
          <div className="bg-slate-50 p-1 rounded-2xl border border-slate-100">
            <GoogleBusinessWidget />
          </div>
        </div>

        {/* CHAMADA FIXA CENTRAL DE SINISTRO */}
        <div className="bg-orange-500 py-3 text-white mt-12 md:mt-20">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 animate-pulse text-white" />
              <span className="font-bold text-sm md:text-base">Precisando de ajuda agora? Central de Sinistro 24h</span>
            </div>
            <Link to="/central-de-sinistro" className="bg-white text-orange-600 px-6 py-1.5 rounded-full font-bold text-sm hover:bg-orange-50 transition-colors uppercase shadow-sm">
              Clique aqui
            </Link>
          </div>
        </div>

        {/* 1. SELETOR "O QUE VOCÊ QUER PROTEGER?" */}
        <Suspense fallback={<div style={{ minHeight: 400 }} aria-hidden="true" />}>
          <HomeSelector />
        </Suspense>

        {/* 2. CENTRAL DE SINISTRO — preservada do placeholder antigo (os 3 cards de produto migraram para o HeroInsuranceCarousel acima) */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link
              to="/central-de-sinistro"
              className="group flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-primary/5 rounded-2xl border border-primary/20 hover:shadow-xl transition-all"
            >
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-2 text-primary">Sofreu um sinistro ou precisa de assistência?</h3>
                <p className="text-[14px] text-muted-foreground">Saiba o que fazer em caso de roubo, colisão ou pane 24h.</p>
              </div>
              <Button variant="default" className="font-bold whitespace-nowrap">
                Acessar Central de Sinistro
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Cotação em 2h", desc: "Sua proposta comparativa entregue via WhatsApp em tempo recorde.", icon: Clock },
                { step: "02", title: "Gestão Dedicada", desc: "Suporte total em caso de sinistro, cuidamos de toda a burocracia.", icon: ShieldCheck },
                { step: "03", title: "16+ Seguradoras", desc: "Comparamos as maiores do Brasil para garantir o menor preço.", icon: Building2 }
              ].map(s => (
                <div key={s.step} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center md:text-left">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SEGURADORAS PARCEIRAS */}
        <section className="py-12 border-y bg-muted/20 overflow-hidden">
          <div className="container mx-auto px-4 mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Comparamos com as melhores</p>
          </div>
          <div className="flex animate-marquee whitespace-nowrap">
            {[...parceiros, ...parceiros].map((name, i) => {
              const url = INSURER_WEBSITES[name];
              const baseClass =
                "mx-8 text-lg font-bold text-muted-foreground/60 transition-all duration-200 hover:scale-115 hover:text-primary hover:font-extrabold focus-visible:outline-none focus-visible:text-primary";
              return url ? (
                <a
                  key={`${name}-${i}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={`Visitar o site oficial da seguradora ${name}`}
                  onClick={() => {
                    try {
                      window.gtag?.("event", "clique_seguradora_parceira", {
                        event_category: "parceiros",
                        seguradora: name,
                        url_destino: url,
                        origem: "marquee_home",
                      });
                    } catch {
                      /* noop */
                    }
                  }}
                  className={baseClass}
                >
                  {name}
                </a>
              ) : (
                <span key={`${name}-${i}`} className="mx-8 text-lg font-bold text-muted-foreground/50">
                  {name}
                </span>
              );
            })}
          </div>
        </section>

        {/* 5. COMPARAÇÃO DE PROPOSTAS (Placeholder) */}
        {/* Will be detailed in Phase 4 */}

        {/* 6. AVALIAÇÕES REAIS */}
        <LazySection minHeight="420px" rootMargin="300px" className="bg-muted/10">
          <Suspense fallback={null}>
            <LocalTestimonials />
          </Suspense>
        </LazySection>

        {/* 7. SOLUÇÕES PARA EMPRESAS (Patro Empresas) */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center lg:text-left">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Proteção Especializada para Empresas em Guarulhos</h2>
                <p className="text-lg text-white/70 mb-8 leading-relaxed">
                  De frotas a galpões logísticos em Cumbica, oferecemos gestão de riscos completa para o seu negócio crescer com segurança.
                </p>
                <div className="grid grid-cols-2 gap-4 text-left mb-8">
                  {["Seguro Frota", "Transporte e Carga", "Saúde PME", "Responsabilidade Civil"].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/seguro-empresarial">
                  <Button size="lg" className="w-full sm:w-auto font-bold">Conhecer Patro Empresas</Button>
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all duration-500 opacity-50" />
                <div className="relative bg-white/5 p-4 md:p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-6 text-primary">
                    <div className="h-1 w-12 bg-primary rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-widest">Nossa Sede em Guarulhos</span>
                  </div>
                  <GoogleBusinessWidget />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. AUTORIDADE EM GUARULHOS */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-8">Especialistas em Guarulhos e Região</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p>
                A Patro Seguros é uma corretora de seguros em Guarulhos que ajuda pessoas, famílias e empresas a compararem opções de seguros e planos de saúde com atendimento consultivo. Atuamos com seguro auto, seguro empresarial, plano de saúde, seguro de vida, seguro residencial, seguro frota, seguro de carga e outras soluções para Guarulhos e região — sempre comparando 16+ seguradoras parceiras para encontrar a melhor cobertura pelo melhor preço.
              </p>
            </div>

            {/* Atendimento regional — bairros + links contextuais */}
            <div className="mt-12 text-left">
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                Atendimento em todos os bairros de Guarulhos
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-6 max-w-2xl mx-auto">
                Atuamos presencialmente no Cidade Maia e atendemos toda a cidade — incluindo cotações para seguros de carros, residências, empresas e planos de saúde com rede credenciada validada por bairro.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[
                  { label: "Centro", href: "/seguros-guarulhos/centro" },
                  { label: "Cumbica", href: "/seguros-guarulhos/cumbica" },
                  { label: "Pimentas", href: "/seguro-auto-pimentas" },
                  { label: "Bonsucesso", href: "/seguro-auto-bonsucesso" },
                  { label: "Taboão", href: "/seguros-guarulhos/taboao" },
                  { label: "Vila Galvão", href: "/seguros-guarulhos/vila-galvao" },
                  { label: "Macedo", href: "/seguros-guarulhos" },
                  { label: "Cidade Maia", href: "/seguro-auto-maia" },
                  { label: "Vila Augusta", href: "/seguro-auto-vila-augusta" },
                  { label: "Gopoúva", href: "/seguros-guarulhos" },
                  { label: "Ponte Grande", href: "/seguros-guarulhos" },
                  { label: "Jardim Maia", href: "/seguros-guarulhos" },
                  { label: "Picanço", href: "/seguros-guarulhos" },
                ].map((b) => (
                  <Link
                    key={b.label}
                    to={b.href}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-semibold border border-primary/10 hover:bg-primary hover:text-white transition-colors"
                  >
                    {b.label}
                  </Link>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
                {[
                  { label: "Seguro Auto em Guarulhos", href: "/seguro-auto-guarulhos" },
                  { label: "Plano de Saúde em Guarulhos", href: "/plano-saude-guarulhos" },
                  { label: "Plano de Saúde Empresarial", href: "/plano-saude-empresarial-guarulhos" },
                  { label: "Seguro Empresarial em Guarulhos", href: "/seguro-empresarial-guarulhos" },
                  { label: "Seguro Frota em Guarulhos", href: "/seguro-frota-guarulhos" },
                  { label: "Seguro de Carga em Guarulhos", href: "/seguro-transporte-carga-guarulhos" },
                  { label: "Seguro Residencial em Guarulhos", href: "/seguro-residencial-guarulhos" },
                  { label: "Seguro de Vida em Guarulhos", href: "/seguro-vida-guarulhos" },
                  { label: "Seguro Condomínio em Guarulhos", href: "/seguro-condominio-guarulhos" },
                  { label: "Plano Odontológico em Guarulhos", href: "/plano-odontologico-guarulhos" },
                  { label: "Seguro Moto em Guarulhos", href: "/seguro-moto-guarulhos" },
                  { label: "Corretora de Seguros em Guarulhos", href: "/sobre-guarulhos" },
                ].map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    className="text-sm text-slate-700 hover:text-primary font-medium inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-primary/60 group-hover:translate-x-0.5 transition-transform" />
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9. CONTEÚDOS E FERRAMENTAS */}
        <LazySection>
          <Suspense fallback={null}>
            <LocalSavingsCalculator />
            <HomeBlogSection />
            <PortoPartnershipSection />
          </Suspense>
        </LazySection>

        {/* 10. FAQ */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Perguntas Frequentes</h2>
            
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-6 text-primary border-l-4 border-primary pl-4">Dúvidas Gerais</h3>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-card p-6 rounded-xl border">
                    <h4 className="font-bold mb-3">{faq.question}</h4>
                    <p className="text-[14px] text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-600 border-l-4 border-orange-600 pl-4">Central de Sinistro & Ajuda</h3>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {sinistroFaqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="bg-card px-6 rounded-xl border border-orange-100 hover:border-orange-200 transition-colors">
                    <AccordionTrigger className="text-left font-bold hover:no-underline hover:text-orange-600 py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[14px] text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="mt-8 text-center">
                <Link to="/central-de-sinistro" className="text-primary font-bold hover:underline inline-flex items-center">
                  Ver guia completo de sinistro <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 11. CTA FINAL */}
        <section className="py-20 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Pronto para proteger o que importa?</h2>
            <p className="text-xl mb-10 opacity-90">Compare propostas em até 2 horas úteis.</p>
            <Link to="/cotacao">
              <Button size="lg" variant="secondary" className="text-lg h-14 px-10 font-bold">
                Começar cotação agora
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
