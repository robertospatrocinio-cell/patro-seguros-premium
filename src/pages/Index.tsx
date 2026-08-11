/** Execute esta instrucao no projeto: Otimizar os CTAs persistentes (WhatsApp e formulário) para ficarem visíveis em todas as seções da página de obrigado sem atrapalhar a leitura. */
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, AlertTriangle, Clock, ShieldCheck, Building2, MapPin } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import ServiceSchema from "@/components/ServiceSchema";
import MedicalOrganizationSchema from "@/components/MedicalOrganizationSchema";

import AggregateRatingSchema from "@/components/AggregateRatingSchema";
import SpeakableSchema from "@/components/SpeakableSchema";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";
import LazySection from "@/components/LazySection";
import { useEffect } from "react";
import { prefetchOnIdleAll } from "@/lib/prefetch";
import { PATRO_SOCIAL_PROOF } from "@/lib/patroSocialProof";

// Below-the-fold heavy components — code-split to lighten initial JS
// Loaders expostos como constantes para que possamos passar o MESMO
// `() => import(...)` para React.lazy e para o prefetch do LazySection —
// isso garante que o chunk pré-carregado seja exatamente o que o Suspense
// vai consumir (dedupe via WeakSet em prefetch.ts).
const loadHeroInsuranceCarousel = () => import("@/components/HeroInsuranceCarousel");
const loadQuickLeadForm = () => import("@/components/QuickLeadForm");
const loadHomeSelector = () => import("@/components/HomeSelector");
const loadLocalSavingsCalculator = () => import("@/components/LocalSavingsCalculator");
const loadLocalTestimonials = () => import("@/components/LocalTestimonials");
const loadHomeBlogSection = () => import("@/components/HomeBlogSection");
const loadPortoPartnershipSection = () => import("@/components/PortoPartnershipSection");
const loadGoogleBusinessWidget = () => import("@/components/GoogleBusinessWidget");
const loadProvaSocialPatro = () => import("@/components/ProvaSocialPatro");
const loadAutoridadePatro = () => import("@/components/AutoridadePatro");
const loadComoPatroAjuda = () => import("@/components/ComoPatroAjuda");

const HeroInsuranceCarousel = lazy(loadHeroInsuranceCarousel);
const QuickLeadForm = lazy(() => loadQuickLeadForm().then((m) => ({ default: m.QuickLeadForm })));
const HomeSelector = lazy(() => loadHomeSelector().then((m) => ({ default: m.HomeSelector })));
const LocalSavingsCalculator = lazy(loadLocalSavingsCalculator);
const LocalTestimonials = lazy(loadLocalTestimonials);
const HomeBlogSection = lazy(loadHomeBlogSection);
const PortoPartnershipSection = lazy(loadPortoPartnershipSection);
const GoogleBusinessWidget = lazy(loadGoogleBusinessWidget);
const ProvaSocialPatro = lazy(loadProvaSocialPatro);
const AutoridadePatro = lazy(loadAutoridadePatro);
const ComoPatroAjuda = lazy(loadComoPatroAjuda);

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o.";

// Handlers dos CTAs extraídos para o escopo do módulo: closures estáveis
// entre renders, sem realocação por render do <Index>, e prontas para
// serem passadas como props para componentes memoizados sem quebrar memo.
const handleHeroCotacaoClick = () => trackCotacaoClick("hero");
const handleHeroWhatsAppClick = () => trackWhatsAppClick("hero");
const handleSeoBlockCotacaoClick = () => trackCotacaoClick("home-seo-block");

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
  // Warm-up dos chunks acima-da-dobra em requestIdleCallback: como o Hero
  // Carousel / QuickLeadForm / HomeSelector / GoogleBusinessWidget não
  // estão dentro de <LazySection>, disparamos o import() manualmente
  // quando a main thread ficar ociosa — Suspense resolve sem espera de
  // rede e sem inflar o TBT do LCP.
  useEffect(() => {
    prefetchOnIdleAll([
      loadHeroInsuranceCarousel,
      loadQuickLeadForm,
      loadHomeSelector,
      loadGoogleBusinessWidget,
    ]);
  }, []);
  return (
    <>
      <PageMeta 
        title="Seguros em Guarulhos | Patro Seguros — Compare 16 Seguradoras"
        description="Corretora de seguros em Guarulhos há 20+ anos. Compare 16 seguradoras de auto, vida, saúde, residencial e empresarial. Cotação grátis em até 2h úteis. Fale com um especialista."
        absoluteTitle={true}
      />
      <FAQSchema faqs={[...faqs, ...sinistroFaqs]} />
      <SpeakableSchema url={CANONICAL_BASE_URL} />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <ServiceSchema 
        name="Seguros em Guarulhos" 
        description="A Patro Seguros, corretora de seguros em Guarulhos há mais de 20 anos, com registro SUSEP 212113511 e avaliação 4.9 no Google, é referência em atendimento consultivo na região, comparando cotações em 16+ seguradoras."
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
              {/* AVIF primeiro (menor payload em ~20-40% vs WebP). Browsers sem
                  suporte descartam a <source> e caem para WebP; se nem WebP, o
                  <img> serve como último fallback. srcSet responsivo evita
                  baixar 1280px num celular. */}
              <source
                type="image/avif"
                srcSet="/images/hero-home-480.avif 480w, /images/hero-home-960.avif 960w, /images/hero-home-1280.avif 1280w"
                sizes="100vw"
              />
              <source
                type="image/webp"
                srcSet="/images/hero-home-480.webp 480w, /images/hero-home-960.webp 960w, /images/hero-home-1280.webp 1280w"
                sizes="100vw"
              />
              <img
                src="/images/hero-home-960.webp"
                alt="Corretora de seguros em Guarulhos — Patro Seguros, com 20+ anos de mercado e atendimento consultivo"
                width={1280}
                height={720}
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
                  Seguros em Guarulhos | Patro Seguros — Compare 16 Seguradoras
                </h1>
                <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  A Patro Seguros, corretora de seguros em Guarulhos há mais de 20 anos, com registro SUSEP 212113511 e avaliação 4.9 no Google, é referência em atendimento consultivo na região, comparando cotações em 16+ seguradoras.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/cotacao" onClick={handleHeroCotacaoClick}>
                    <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 font-bold bg-[#1e3a8a] hover:bg-[#1e40af] text-white border-b-4 border-[#172554] active:border-b-0 active:translate-y-1 transition-all">
                      Cotar agora com especialistas
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={handleHeroWhatsAppClick}>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-green-500 hover:bg-green-600 text-white border-green-600 hover:border-green-700 font-bold shadow-lg shadow-green-500/20 transition-all">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Falar no WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

              <div className="hidden lg:block animate-in fade-in slide-in-from-right duration-700">
                <Suspense fallback={<div style={{ minHeight: 320 }} aria-hidden="true" />}>
                  <GoogleBusinessWidget />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCO RESPOSTA RÁPIDA (ANSWER-READY) */}
        <div className="bg-slate-50 border-y border-slate-200 py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg border border-slate-200 shadow-sm text-center lg:text-left">
              <p className="text-slate-800 leading-relaxed">
                <strong>Resposta rápida:</strong> A Patro Seguros é a corretora de seguros de referência em Guarulhos e região, com mais de 20 anos de mercado e registro SUSEP 212113511. Comparamos cotações em 16+ seguradoras — auto, vida, saúde, residencial e empresarial — com atendimento consultivo e resposta em até 2h úteis via WhatsApp (11) 5199-7500.
              </p>
              <p className="text-slate-500 text-xs mt-3 flex items-center justify-center lg:justify-start">
                <Clock className="w-3 h-3 mr-1" />
                Atualizado em {new Date().toLocaleDateString('pt-BR')} · Fonte: Patro Corretora de Seguros — SUSEP 212113511
              </p>
            </div>
          </div>
        </div>

        {/* QUICK LEAD FORM */}
        <Suspense fallback={<div style={{ minHeight: 320 }} aria-hidden="true" />}>
          <QuickLeadForm />
        </Suspense>

        {/* BLOCO SEO LOCAL — visível, sem texto escondido, links âncora descritivos.
            Fica logo abaixo do hero/form para garantir que crawlers simples leiam
            parágrafos reais, H2s e <a href> com contexto antes dos componentes pesados. */}
        <section className="py-14 md:py-20 bg-white border-t border-slate-100" aria-labelledby="home-seo-intro">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2
              id="home-seo-intro"
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
            >
              Seguros em Guarulhos e Região — Há 20+ anos protegendo você
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed max-w-3xl">
              <p>
                A Patro Seguros é uma corretora de seguros em Guarulhos há mais de 20 anos especializada
                em comparar seguradoras e orientar clientes na escolha de seguros
                para auto, saúde, vida, residência, empresas, frotas e consórcios.
              </p>
              <p>
                Com atendimento consultivo no Cidade Maia, a Patro ajuda pessoas,
                famílias e empresas a encontrarem proteção adequada ao seu perfil
                — analisando coberturas, preços, perfil de risco e suporte em caso
                de sinistro.
              </p>
              <p>
                Nosso trabalho é simplificar a contratação do seguro, explicar as
                diferenças entre as seguradoras e acompanhar o cliente antes,
                durante e depois da contratação. Conheça nossa{" "}
                <Link to="/corretora-de-seguros-em-guarulhos" className="text-primary font-semibold hover:underline">
                  conhecer nossa atuação em Guarulhos
                </Link>{" "}
                ou explore as principais soluções abaixo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 mt-12">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Seguros para Você</h3>
                <ul className="space-y-2 text-[15px]">
                  <li>
                    <Link to="/seguro-auto-guarulhos" className="text-primary hover:underline">
                      Seguro Auto em Guarulhos
                    </Link>{" "}
                    — proteção contra colisão, roubo e assistência 24h.
                  </li>
                  <li>
                    <Link to="/seguro-residencial" className="text-primary hover:underline">
                      Seguro Residencial
                    </Link>{" "}
                    — proteção completa para sua{" "}
                    <Link to="/seguro-residencial" className="text-primary hover:underline">casa</Link>,{" "}
                    <Link to="/seguro-residencial" className="text-primary hover:underline">apartamento</Link> ou{" "}
                    <Link to="/seguro-flat-guarulhos" className="text-primary hover:underline">flat</Link>.
                  </li>
                  <li>
                    <Link to="/seguro-vida-guarulhos" className="text-primary hover:underline">
                      Seguro de Vida em Guarulhos
                    </Link>{" "}
                    — morte, invalidez e doenças graves para proteger sua família.
                  </li>
                  <li>
                    <Link to="/plano-saude-guarulhos" className="text-primary hover:underline">
                      Plano de Saúde em Guarulhos
                    </Link>{" "}
                    — individual, familiar ou por adesão, com comparação de rede.
                  </li>
                  <li>
                    <Link to="/consorcio-guarulhos" className="text-primary hover:underline">
                      Consórcio em Guarulhos
                    </Link>{" "}
                    — carro, imóvel e caminhão sem juros, com administradoras BACEN.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Seguros para Empresas</h3>
                <ul className="space-y-2 text-[15px]">
                  <li>
                    <Link to="/seguro-empresarial-guarulhos" className="text-primary hover:underline">
                      Seguro Empresarial em Guarulhos
                    </Link>{" "}
                    — patrimônio, lucros cessantes e responsabilidade civil.
                  </li>
                  <li>
                    <Link to="/seguro-frota-empresas-guarulhos" className="text-primary hover:underline">
                      Seguro Frota para Empresas em Guarulhos
                    </Link>{" "}
                    — gestão centralizada para qualquer porte de frota.
                  </li>
                  <li>
                    <Link to="/seguro-transporte-carga-guarulhos" className="text-primary hover:underline">
                      Seguro Transporte de Cargas em Guarulhos
                    </Link>{" "}
                    — RCTR-C, RCF-DC e cargas para transportadoras em Cumbica.
                  </li>
                  <li>
                    <Link to="/plano-saude-empresarial-guarulhos" className="text-primary hover:underline">
                      Plano de Saúde Empresarial em Guarulhos
                    </Link>{" "}
                    — planos PME e corporativos para reter talentos.
                  </li>
                  <li>
                    <Link to="/seguros-guarulhos" className="text-primary hover:underline">
                      Cotação de Seguro em Guarulhos por bairro
                    </Link>{" "}
                    — Cidade Maia, Centro, Cumbica, Bonsucesso, Pimentas e mais.
                  </li>
                </ul>
              </div>
            </div>

            {/* BLOCO DE LINKS INTERNOS ESTRATÉGICOS (SERVIÇOS E BAIRROS) */}
            <div className="mt-16 pt-12 border-t border-slate-100">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                <div>
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Principais Seguros
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Seguro Auto", path: "/seguro-auto-guarulhos" },
                      { name: "Plano de Saúde", path: "/plano-saude-guarulhos" },
                      { name: "Seguro Residencial", path: "/seguro-residencial" },
                      { name: "Seguro de Vida", path: "/seguro-vida-guarulhos" },
                      { name: "Empresarial", path: "/seguro-empresarial-guarulhos" },
                      { name: "Frota", path: "/seguro-frota-empresas-guarulhos" },
                      { name: "Transporte", path: "/seguro-transporte-carga-guarulhos" },
                      { name: "Consórcio", path: "/consorcio-guarulhos" },
                      { name: "Carta Verde", path: "/seguro-carta-verde" }
                    ].map((link) => (
                      <Link 
                        key={link.path} 
                        to={link.path}
                        className="text-xs px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Atendimento em Guarulhos
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Cidade Maia", path: "/seguros-cidade-maia-guarulhos" },
                      { name: "Cumbica", path: "/seguros-cumbica-guarulhos" },
                      { name: "Pimentas", path: "/seguros-pimentas-guarulhos" },
                      { name: "Bonsucesso", path: "/seguros-bonsucesso-guarulhos" },
                      { name: "Vila Augusta", path: "/seguros-vila-augusta-guarulhos" },
                      { name: "Centro", path: "/seguros-centro-guarulhos" },
                      { name: "Taboão", path: "/seguros-taboao-guarulhos" },
                      { name: "Vila Galvão", path: "/seguros-vila-galvao-guarulhos" }
                    ].map((link) => (
                      <Link 
                        key={link.path} 
                        to={link.path}
                        className="text-xs px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Seguradoras Parceiras
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Porto", "Allianz", "Tokio Marine", "Bradesco", "Azul", "HDI", "Liberty", "Suhai"].map((seg) => (
                      <Link 
                        key={seg} 
                        to="/seguradoras-parceiras"
                        className="text-xs px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all"
                      >
                        {seg}
                      </Link>
                    ))}
                    <Link to="/seguradoras-parceiras" className="text-xs px-3 py-1.5 text-primary font-semibold hover:underline">
                      Ver todas 16+ seguradoras →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link to="/cotacao" onClick={handleSeoBlockCotacaoClick}>
                <Button size="lg" className="rounded-xl font-bold">
                  Solicitar cotação de seguro
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/faq">
                <Button size="lg" variant="outline" className="rounded-xl font-semibold">
                  Ver dúvidas frequentes sobre seguros
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* HERO CARROSSEL — Conversion shortcut: toggle Pessoa/Empresa + cards principais */}
        <Suspense fallback={<div style={{ minHeight: 520 }} aria-hidden="true" />}>
          <HeroInsuranceCarousel />
        </Suspense>

        {/* CONTEÚDO CITÁVEL DE AUTORIDADE */}
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <p className="text-lg text-slate-800 font-medium italic">
                "A Patro Seguros, corretora de seguros em Guarulhos há mais de 20 anos com registro SUSEP 212113511 e avaliação 4.9 no Google, é referência em atendimento consultivo na região, comparando cotações em 16+ seguradoras."
              </p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
              Perguntas Frequentes sobre Seguros em Guarulhos
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { 
                  q: "Qual a melhor corretora de seguros em Guarulhos?", 
                  a: "A Patro Seguros é referência em Guarulhos há mais de 20 anos, com registro SUSEP 212113511 e avaliação 4.9 no Google. Comparamos cotações em 16+ seguradoras com atendimento consultivo." 
                },
                { 
                  q: "Quanto custa um seguro de carro em Guarulhos?", 
                  a: "O preço varia conforme o veículo, CEP de pernoite e perfil do motorista. A Patro Seguros compara propostas de 16+ seguradoras para você encontrar a melhor cobertura pelo melhor preço, com cotação em até 2h úteis." 
                },
                { 
                  q: "Quais seguros a Patro Seguros oferece?", 
                  a: "Auto, moto, residencial, vida, plano de saúde, empresarial, frota, transporte de carga, responsabilidade civil, cyber e agronegócio — para pessoas e empresas em Guarulhos e região." 
                },
                { 
                  q: "Como acionar o seguro em caso de sinistro em Guarulhos?", 
                  a: "A Patro Seguros tem Central de Sinistro dedicada e WhatsApp de emergência 24h. Nossa equipe acompanha todo o processo, da vistoria à indenização." 
                },
                { 
                  q: "A Patro Seguros atende empresas em Guarulhos?", 
                  a: "Sim. Oferecemos seguro empresarial, frota, transporte de carga, plano de saúde PME e responsabilidade civil, com gestão de riscos completa para negócios de todos os portes." 
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white px-6 rounded-xl border border-slate-200 shadow-sm">
                  <AccordionTrigger className="text-left font-bold text-slate-900 hover:text-primary transition-colors py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-700 leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

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
                <span className="text-2xl font-bold text-slate-900">{PATRO_SOCIAL_PROOF.googleRating}/5.0</span>
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
              <p className="text-slate-500 font-medium">{PATRO_SOCIAL_PROOF.googleReviewCount} avaliações reais no Google</p>
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
            <Suspense fallback={<div style={{ minHeight: 300 }} aria-hidden="true" />}>
              <GoogleBusinessWidget />
            </Suspense>
          </div>
        </div>

        {/* CHAMADA FIXA CENTRAL DE SINISTRO */}
        <div className="bg-orange-600 py-3 text-white mt-12 md:mt-20">
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
                <span key={`${name}-${i}`} className="mx-8 text-lg font-bold text-muted-foreground">
                  {name}
                </span>
              );
            })}
          </div>
        </section>

        {/* 5. COMPARAÇÃO DE PROPOSTAS (Placeholder) */}
        {/* Will be detailed in Phase 4 */}

        {/* 6. AVALIAÇÕES REAIS */}
        <LazySection minHeight="420px" rootMargin="300px" className="bg-muted/10"
          prefetch={[loadLocalTestimonials]}>
          <Suspense fallback={null}>
            <LocalTestimonials />
          </Suspense>
        </LazySection>

        {/* 6b. PROVA SOCIAL UNIFICADA (fonte única + CTAs) */}
        <LazySection minHeight="380px" rootMargin="400px" className="py-14 bg-white"
          prefetch={[loadProvaSocialPatro]}>
          <section aria-label="Prova social consolidada">
            <div className="container mx-auto px-4 max-w-4xl">
              <Suspense fallback={null}>
                <ProvaSocialPatro variant="default" trackingContext="home:prova-social" />
              </Suspense>
            </div>
          </section>
        </LazySection>

        {/* 6c. AUTORIDADE / E-E-A-T — fundadores + credenciais */}
        <LazySection minHeight="420px" rootMargin="400px" className="py-14 bg-slate-50"
          prefetch={[loadAutoridadePatro]}>
          <section aria-label="Autoridade e credenciais">
            <div className="container mx-auto px-4 max-w-4xl">
              <Suspense fallback={null}>
                <AutoridadePatro />
              </Suspense>
            </div>
          </section>
        </LazySection>

        {/* 6d. COMO A PATRO AJUDA — 4 passos + CTA duplo consistente */}
        <LazySection minHeight="480px" rootMargin="400px" className="py-14 bg-white"
          prefetch={[loadComoPatroAjuda]}>
          <section aria-label="Como a Patro ajuda">
            <div className="container mx-auto px-4 max-w-5xl">
              <Suspense fallback={null}>
                <ComoPatroAjuda
                  trackingContext="home:como-ajuda"
                  quoteHref="/cotacao"
                  pageUrl="https://www.patroseguros.com.br/"
                />
              </Suspense>
            </div>
          </section>
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
                  <Suspense fallback={<div style={{ minHeight: 300 }} aria-hidden="true" />}>
                    <GoogleBusinessWidget />
                  </Suspense>
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
                A Patro Seguros é uma corretora de seguros em Guarulhos que ajuda pessoas, famílias e empresas a compararem opções de seguros e planos de saúde com atendimento consultivo. Atuamos com seguro auto, seguro empresarial, plano de saúde, seguro de vida, seguro residencial, seguro frota, seguro de carga e outras soluções para Guarulhos e região — sempre comparando 16+ seguradoras parceiras para encontrar a melhor cobertura pelo melhor preço, com atendimento consultivo há mais de 20 anos e registro SUSEP 212113511.
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
                  { label: "Cidade Maia", href: "/seguros-shopping-maia-cidade-maia-guarulhos" },
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
        <LazySection
          prefetch={[loadLocalSavingsCalculator, loadHomeBlogSection, loadPortoPartnershipSection]}>
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
