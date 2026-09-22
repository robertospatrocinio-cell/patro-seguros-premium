/** HOME — PATRO SEGUROS
 *  Organização comercial da home (ordem fixa):
 *  Header → Hero → Proposta de valor → CTA principal → Indicadores de confiança
 *  → Cotação Express → Diferenciais → Principais soluções → Como funciona
 *  → Depoimentos → Autoridade local e sede → Bairros atendidos → Conteúdos
 *  → FAQ comercial → CTA final → Rodapé.
 *
 *  Regras mantidas nesta página:
 *  - apenas 6 produtos principais (os demais permanecem em páginas próprias);
 *  - uma única lista de seguradoras (repetição do carrossel é decorativa);
 *  - uma única seção de bairros, sempre com rota existente;
 *  - uma única FAQ comercial (FAQ de sinistro vive em /central-de-sinistro);
 *  - CTAs de cotação por produto via /cotacao?tipo=...
 */
import { lazy, Suspense, useEffect } from "react";
import { EMPRESA, WHATSAPP_URL_BASE } from "@/config/empresa";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageCircle,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Building2,
  MapPin,
  Car,
  Home as HomeIcon,
  HeartPulse,
  Stethoscope,
  Truck,
} from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import ServiceSchema from "@/components/ServiceSchema";
import MedicalOrganizationSchema from "@/components/MedicalOrganizationSchema";
import InsuranceAgencySchema from "@/components/InsuranceAgencySchema";
import AggregateRatingSchema from "@/components/AggregateRatingSchema";
import SpeakableSchema from "@/components/SpeakableSchema";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import LazySection from "@/components/LazySection";
import GooglePreferredSource from "@/components/GooglePreferredSource";
import { prefetchOnIdleAll } from "@/lib/prefetch";
import { PATRO_SOCIAL_PROOF } from "@/lib/patroSocialProof";
import { INSURER_WEBSITES } from "@/data/insurerWebsites";

// Below-the-fold heavy components — code-split to lighten initial JS
const loadQuickLeadForm = () => import("@/components/QuickLeadForm");
const loadLocalSavingsCalculator = () => import("@/components/LocalSavingsCalculator");
const loadLocalTestimonials = () => import("@/components/LocalTestimonials");
const loadHomeBlogSection = () => import("@/components/HomeBlogSection");
const loadPortoPartnershipSection = () => import("@/components/PortoPartnershipSection");
const loadGoogleBusinessWidget = () => import("@/components/GoogleBusinessWidget");
const loadProvaSocialPatro = () => import("@/components/ProvaSocialPatro");
const loadAutoridadePatro = () => import("@/components/AutoridadePatro");
const loadComoPatroAjuda = () => import("@/components/ComoPatroAjuda");
const HeroPatro = lazy(() => import("@/components/HeroPatro"));

const QuickLeadForm = lazy(() => loadQuickLeadForm().then((m) => ({ default: m.QuickLeadForm })));
const LocalSavingsCalculator = lazy(loadLocalSavingsCalculator);
const LocalTestimonials = lazy(loadLocalTestimonials);
const HomeBlogSection = lazy(loadHomeBlogSection);
const PortoPartnershipSection = lazy(loadPortoPartnershipSection);
const GoogleBusinessWidget = lazy(loadGoogleBusinessWidget);
const ProvaSocialPatro = lazy(loadProvaSocialPatro);
const AutoridadePatro = lazy(loadAutoridadePatro);
const ComoPatroAjuda = lazy(loadComoPatroAjuda);

const WHATSAPP_URL = `${WHATSAPP_URL_BASE}?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o.`;

const handleSeoBlockCotacaoClick = () => trackCotacaoClick("home-seo-block");
const handleFinalCotacaoClick = () => trackCotacaoClick("home-cta-final");
const handleFinalWhatsAppClick = () => trackWhatsAppClick("home-cta-final");

/** Seguradoras exibidas na home (lista única). O portfólio completo vive em /seguradoras-parceiras. */
const parceirosHome = [
  "ALLIANZ",
  "AZUL",
  "BRADESCO",
  "HDI",
  "ITAÚ",
  "LIBERTY",
  "MAPFRE",
  "PORTO",
  "SOMPO",
  "SUHAI",
  "TOKIO MARINE",
  "ZURICH",
];

/** Seis produtos principais da home. Demais produtos permanecem em páginas próprias. */
const produtosPrincipais = [
  {
    title: "Seguro Auto",
    desc: "Colisão, roubo, terceiros e assistência 24h para o seu carro.",
    href: "/seguro-auto",
    cotacao: "/cotacao?tipo=auto",
    Icon: Car,
  },
  {
    title: "Seguro Residencial",
    desc: "Casa, apartamento ou flat com assistência para reparos do dia a dia.",
    href: "/seguro-residencial",
    cotacao: "/cotacao?tipo=residencial",
    Icon: HomeIcon,
  },
  {
    title: "Seguro de Vida",
    desc: "Morte, invalidez e doenças graves para proteger a sua família.",
    href: "/seguro-vida",
    cotacao: "/cotacao?tipo=vida",
    Icon: HeartPulse,
  },
  {
    title: "Plano de Saúde",
    desc: "Individual, familiar, por adesão ou empresarial, com comparação de rede.",
    href: "/planos-de-saude",
    cotacao: "/cotacao?tipo=saude",
    Icon: Stethoscope,
  },
  {
    title: "Seguro Empresarial",
    desc: "Patrimônio, lucros cessantes e responsabilidade civil do seu negócio.",
    href: "/seguro-empresarial",
    cotacao: "/cotacao?tipo=empresarial",
    Icon: Building2,
  },
  {
    title: "Seguro Frota",
    desc: "Gestão centralizada de veículos para empresas de qualquer porte.",
    href: "/seguro-frota",
    cotacao: "/cotacao?tipo=frota",
    Icon: Truck,
  },
];

/** Bairros prioritários — todos com rota existente. */
const bairrosHome = [
  { label: "Cidade Maia", href: "/seguros-shopping-maia-cidade-maia-guarulhos" },
  { label: "Centro", href: "/seguros-guarulhos/centro" },
  { label: "Cumbica", href: "/seguros-guarulhos/cumbica" },
  { label: "Bonsucesso", href: "/seguros-guarulhos/bonsucesso" },
  { label: "Vila Augusta", href: "/seguros-guarulhos/vila-augusta" },
  { label: "Macedo", href: "/seguros-guarulhos/macedo" },
  { label: "Gopoúva", href: "/seguros-guarulhos/gopouva" },
  { label: "Pimentas", href: "/seguros-guarulhos/pimentas" },
  { label: "Taboão", href: "/seguros-guarulhos/taboao" },
  { label: "Vila Galvão", href: "/seguros-guarulhos/vila-galvao" },
];

/** Links estratégicos da home (sem listagem completa de topic cluster). */
const linksEstrategicos = [
  { label: "Seguro Auto em Guarulhos", href: "/seguro-auto-guarulhos" },
  { label: "Seguro Residencial em Guarulhos", href: "/seguro-residencial-guarulhos" },
  { label: "Seguro de Vida em Guarulhos", href: "/seguro-vida-guarulhos" },
  { label: "Plano de Saúde em Guarulhos", href: "/plano-saude-guarulhos" },
  { label: "Seguro Empresarial em Guarulhos", href: "/seguro-empresarial-guarulhos" },
  { label: "Seguro Frota em Guarulhos", href: "/seguro-frota-guarulhos" },
  { label: "Seguros por bairro em Guarulhos", href: "/seguros-guarulhos" },
  { label: "Seguradoras parceiras", href: "/seguradoras-parceiras" },
];

const faqs = [
  {
    question: "Qual a melhor corretora de seguros em Guarulhos?",
    answer: EMPRESA.posicionamento,
  },
  {
    question: "Quanto custa um seguro de carro em Guarulhos?",
    answer: `O preço varia conforme o veículo, CEP de pernoite e perfil do motorista. A Patro Seguros compara propostas de ${EMPRESA.metricas.seguradorasParceiras} seguradoras para você encontrar a melhor cobertura pelo melhor preço, com cotação em até 2h úteis.`,
  },
  {
    question: "Quais seguros a Patro Seguros oferece?",
    answer:
      "Auto, moto, residencial, vida, plano de saúde, empresarial, frota, transporte de carga, responsabilidade civil, cyber e agronegócio — para pessoas e empresas em Guarulhos e região.",
  },
  {
    question: "Como acionar o seguro em caso de sinistro em Guarulhos?",
    answer:
      "A Patro Seguros tem Central de Sinistro dedicada e WhatsApp de emergência 24h. Nossa equipe acompanha todo o processo, da vistoria à indenização.",
  },
  {
    question: "A Patro Seguros atende empresas em Guarulhos?",
    answer:
      "Sim. Oferecemos seguro empresarial, frota, transporte de carga, plano de saúde PME e responsabilidade civil, com gestão de riscos completa para negócios de todos os portes.",
  },
];

const Index = () => {
  useEffect(() => {
    prefetchOnIdleAll([loadQuickLeadForm, loadGoogleBusinessWidget]);
  }, []);

  return (
    <>
      <PageMeta
        title="Patro Seguros | Corretora de Seguros em Guarulhos e Brasil"
        description={`Faça sua cotação de seguro auto, empresarial e saúde em Guarulhos com a Patro Seguros. Comparamos ${EMPRESA.metricas.seguradorasParceiras} seguradoras. Atendimento humano e sem burocracia.`}
        absoluteTitle={true}
      />

      <FAQSchema faqs={faqs} />
      <SpeakableSchema url={CANONICAL_BASE_URL} />
      <InsuranceAgencySchema />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <ServiceSchema name="Seguros em Guarulhos" description={EMPRESA.posicionamento} />
      <MedicalOrganizationSchema />
      <AggregateRatingSchema
        serviceName="Corretora de Seguros em Guarulhos"
        url={CANONICAL_BASE_URL}
        description={`Corretora de seguros em Guarulhos: auto, residencial, vida, saúde e frotas. ${EMPRESA.metricas.seguradorasParceiras} seguradoras parceiras.`}
      />
      <Header />
      <main id="main-content">
        {/* 2. HERO */}
        <Suspense fallback={<div className="min-h-[640px] bg-slate-900 animate-pulse" />}>
          <HeroPatro />
        </Suspense>

        {/* 3. PROPOSTA DE VALOR + 4. CTA PRINCIPAL */}
        <section className="py-14 md:py-20 bg-white border-t border-slate-100" aria-labelledby="home-seo-intro">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="home-seo-intro" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Seguros em Guarulhos e Região — Consultoria Técnica
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed max-w-3xl">
              <p>
                A Patro Seguros é sua corretora de seguros em Guarulhos, especializada em comparar seguradoras e
                orientar clientes na escolha de seguros para auto, saúde, vida, residência, empresas e frotas.
              </p>
              <p>
                Com atendimento consultivo no Cidade Maia, a Patro ajuda pessoas, famílias e empresas a encontrarem
                proteção adequada ao seu perfil — analisando coberturas, preços, perfil de risco e suporte em caso de
                sinistro.
              </p>
              <p>
                Nosso trabalho é simplificar a contratação do seguro, explicar as diferenças entre as seguradoras e
                acompanhar o cliente antes, durante e depois da contratação.{" "}
                <Link to="/seguros-guarulhos" className="text-primary font-semibold hover:underline">
                  Conheça nossa atuação em Guarulhos
                </Link>{" "}
                ou explore as principais soluções abaixo.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link to="/cotacao" onClick={handleSeoBlockCotacaoClick}>
                <Button size="lg" className="rounded-xl font-bold w-full sm:w-auto">
                  Solicitar cotação de seguro
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/faq">
                <Button size="lg" variant="outline" className="rounded-xl font-semibold w-full sm:w-auto">
                  Ver dúvidas frequentes sobre seguros
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 5. INDICADORES DE CONFIANÇA — frase institucional + seguradoras (lista única) */}
        <section className="py-16 bg-white border-t border-slate-100" aria-label="Indicadores de confiança">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <p className="text-lg text-slate-800 font-medium italic">"{EMPRESA.posicionamento}"</p>
            </div>
          </div>
        </section>

        <section className="py-12 border-y bg-muted/20 overflow-hidden" aria-label="Seguradoras parceiras">
          <div className="container mx-auto px-4 mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Comparamos com as melhores
            </p>
          </div>
          <div className="flex animate-marquee whitespace-nowrap">
            {parceirosHome.map((name) => {
              const url = INSURER_WEBSITES[name];
              const baseClass =
                "mx-8 text-lg font-bold text-muted-foreground transition-all duration-200 hover:scale-115 hover:text-primary hover:font-extrabold focus-visible:outline-none focus-visible:text-primary";
              return url ? (
                <a
                  key={name}
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
                <span key={name} className="mx-8 text-lg font-bold text-muted-foreground">
                  {name}
                </span>
              );
            })}
            {/* Repetição puramente visual para o loop do carrossel: oculta para
                leitores de tela e crawlers, sem duplicar links ou texto útil. */}
            <span aria-hidden="true" className="flex whitespace-nowrap">
              {parceirosHome.map((name) => (
                <span key={`loop-${name}`} className="mx-8 text-lg font-bold text-muted-foreground">
                  {name}
                </span>
              ))}
            </span>
          </div>
          <div className="container mx-auto px-4 mt-8 text-center">
            <Link to="/seguradoras-parceiras" className="text-sm text-primary font-bold hover:underline">
              Ver todas as seguradoras
            </Link>
          </div>
        </section>

        {/* 6. COTAÇÃO EXPRESS */}
        <Suspense fallback={<div style={{ minHeight: 320 }} aria-hidden="true" />}>
          <QuickLeadForm />
        </Suspense>

        {/* 7. DIFERENCIAIS */}
        <section className="py-20 bg-slate-50" aria-label="Diferenciais da Patro Seguros">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Cotação em 2h",
                  desc: "Sua proposta comparativa entregue via WhatsApp em tempo recorde.",
                  icon: Clock,
                },
                {
                  step: "02",
                  title: "Gestão Dedicada",
                  desc: "Suporte total em caso de sinistro, cuidamos de toda a burocracia.",
                  icon: ShieldCheck,
                },
                {
                  step: "03",
                  title: `${EMPRESA.metricas.seguradorasParceiras} Seguradoras`,
                  desc: "Comparamos as maiores do Brasil para buscar a melhor relação entre cobertura e preço.",
                  icon: Building2,
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center md:text-left"
                >
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

        {/* 8. PRINCIPAIS SOLUÇÕES — apenas 6 produtos + link para a página pilar */}
        <section className="py-20 bg-white" aria-labelledby="home-solucoes">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 id="home-solucoes" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Principais soluções
              </h2>
              <p className="text-slate-600">
                Os seguros mais procurados por pessoas e empresas em Guarulhos e região.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {produtosPrincipais.map((p) => (
                <div
                  key={p.href}
                  className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <p.Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">{p.desc}</p>
                  <div className="flex flex-col gap-2">
                    <Link to={p.href} className="text-primary font-bold text-sm hover:underline inline-flex items-center">
                      Conhecer solução
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                      to={p.cotacao}
                      onClick={() => trackCotacaoClick(`home-card-${p.title}`)}
                      className="text-xs text-slate-500 font-semibold hover:text-primary hover:underline"
                    >
                      Solicitar cotação de {p.title.toLowerCase()}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/servicos">
                <Button size="lg" variant="outline" className="rounded-xl font-bold">
                  Ver todas as soluções
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 9. COMO FUNCIONA A COTAÇÃO */}
        <LazySection
          minHeight="480px"
          rootMargin="400px"
          className="py-14 bg-white"
          prefetch={[loadComoPatroAjuda]}
        >
          <section aria-label="Como funciona a cotação">
            <div className="container mx-auto px-4 max-w-5xl">
              <Suspense fallback={null}>
                <ComoPatroAjuda
                  trackingContext="home:como-ajuda"
                  quoteHref="/cotacao"
                  pageUrl={CANONICAL_BASE_URL}
                />
              </Suspense>
            </div>
          </section>
        </LazySection>

        {/* 10. DEPOIMENTOS */}
        <section className="py-20 bg-white" aria-labelledby="home-depoimentos">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/10">
                Excelência Comprovada
              </span>
              <h2
                id="home-depoimentos"
                className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4"
              >
                O que nossos clientes dizem
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl font-bold text-slate-900">{PATRO_SOCIAL_PROOF.googleRating}/5.0</span>
                <div className="flex text-yellow-400">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-500 font-medium">{PATRO_SOCIAL_PROOF.reviewsCtaLabel}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Ricardo Silva",
                  loc: "Vila Augusta",
                  text: "Consegui reduzir meu seguro auto em 20% com a Patro. O atendimento via WhatsApp foi muito rápido e prático.",
                },
                {
                  name: "Mariana Costa",
                  loc: "Cidade Maia",
                  text: "O seguro residencial deles é excelente. Tive um problema elétrico e a assistência 24h resolveu tudo no mesmo dia.",
                },
                {
                  name: "André Santos",
                  loc: "Cumbica",
                  text: "Para quem trabalha com logística aqui em Cumbica, ter uma corretora que entende da região faz toda a diferença.",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
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

        <LazySection minHeight="420px" rootMargin="300px" className="bg-muted/10" prefetch={[loadLocalTestimonials]}>
          <Suspense fallback={null}>
            <LocalTestimonials />
          </Suspense>
        </LazySection>

        <LazySection minHeight="380px" rootMargin="400px" className="py-14 bg-white" prefetch={[loadProvaSocialPatro]}>
          <section aria-label="Prova social consolidada">
            <div className="container mx-auto px-4 max-w-4xl">
              <Suspense fallback={null}>
                <ProvaSocialPatro variant="default" trackingContext="home:prova-social" />
              </Suspense>
              <div className="mt-8 border-t border-slate-200 pt-8">
                <GooglePreferredSource context="home:prova-social" />
              </div>
            </div>
          </section>
        </LazySection>

        {/* 11. AUTORIDADE LOCAL E SEDE */}
        <LazySection
          minHeight="420px"
          rootMargin="400px"
          className="py-14 bg-slate-50"
          prefetch={[loadAutoridadePatro]}
        >
          <section aria-label="Autoridade e credenciais">
            <div className="container mx-auto px-4 max-w-4xl">
              <Suspense fallback={null}>
                <AutoridadePatro />
              </Suspense>
            </div>
          </section>
        </LazySection>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center lg:text-left">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Proteção Especializada para Empresas em Guarulhos</h2>
                <p className="text-lg text-white/70 mb-8 leading-relaxed">
                  De frotas a galpões logísticos em Cumbica, oferecemos gestão de riscos completa para o seu negócio
                  crescer com segurança.
                </p>
                <div className="grid grid-cols-2 gap-4 text-left mb-8">
                  {["Seguro Frota", "Transporte e Carga", "Saúde PME", "Responsabilidade Civil"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/seguro-empresarial">
                  <Button size="lg" className="w-full sm:w-auto font-bold">
                    Conhecer Patro Empresas
                  </Button>
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

        {/* 12. BAIRROS ATENDIDOS — seção única */}
        <section className="py-20" aria-labelledby="home-bairros">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 id="home-bairros" className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
              Atendimento em Guarulhos
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-2xl mx-auto">
              Atuamos presencialmente no Cidade Maia e atendemos toda a cidade — com cotações de seguro auto,
              residencial, empresarial e planos de saúde por bairro.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {bairrosHome.map((b) => (
                <Link
                  key={b.href}
                  to={b.href}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-semibold border border-primary/10 hover:bg-primary hover:text-white transition-colors"
                >
                  {b.label}
                </Link>
              ))}
            </div>
            <Link to="/seguros-guarulhos" className="text-sm text-primary font-bold hover:underline">
              Ver todos os bairros atendidos
            </Link>

            <div className="mt-12 grid sm:grid-cols-2 gap-3 text-left max-w-3xl mx-auto">
              {linksEstrategicos.map((s) => (
                <Link
                  key={s.href}
                  to={s.href}
                  className="text-sm text-slate-700 hover:text-primary font-medium inline-flex items-center gap-1 group"
                >
                  <ArrowRight
                    className="h-3.5 w-3.5 text-primary/60 group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CONTEÚDOS E FERRAMENTAS */}
        <LazySection prefetch={[loadLocalSavingsCalculator, loadHomeBlogSection, loadPortoPartnershipSection]}>
          <Suspense fallback={null}>
            <LocalSavingsCalculator />
            <HomeBlogSection />
            <PortoPartnershipSection />
          </Suspense>
        </LazySection>

        {/* 13. FAQ COMERCIAL — única FAQ da home */}
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200" aria-labelledby="home-faq">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2
              id="home-faq"
              className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12"
            >
              Perguntas Frequentes sobre Seguros em Guarulhos
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white px-6 rounded-xl border border-slate-200 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-bold text-slate-900 hover:text-primary transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-700 leading-relaxed pb-5">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center">
              <Link to="/central-de-sinistro" className="text-primary font-bold hover:underline inline-flex items-center">
                Dúvidas sobre sinistro? Ver a Central de Sinistro
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* CHAMADA CENTRAL DE SINISTRO */}
        <div className="bg-orange-700 py-3 text-white">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 animate-pulse text-white" aria-hidden="true" />
              <span className="font-bold text-sm md:text-base">
                Precisando de ajuda agora? Central de Sinistro 24h
              </span>
            </div>
            <Link
              to="/central-de-sinistro"
              className="bg-white text-orange-800 px-6 py-1.5 rounded-full font-bold text-sm hover:bg-orange-50 transition-colors uppercase shadow-sm"
            >
              Clique aqui
            </Link>
          </div>
        </div>

        {/* 14. CTA FINAL */}
        <section className="py-20 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Pronto para proteger o que importa?</h2>
            <p className="text-xl mb-10 opacity-90">Compare propostas em até 2 horas úteis.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cotacao" onClick={handleFinalCotacaoClick}>
                <Button size="lg" variant="secondary" className="text-lg h-14 px-10 font-bold w-full sm:w-auto">
                  Começar cotação agora
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={handleFinalWhatsAppClick}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg h-14 px-10 font-bold w-full sm:w-auto bg-transparent border-white/60 text-primary-foreground hover:bg-white/10"
                >
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Falar no WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
