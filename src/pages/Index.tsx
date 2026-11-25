/** HOME — PATRO SEGUROS
 *  Jornada da página inicial:
 *  Header → Hero → Principais soluções → Orientação → Credenciais e seguradoras
 *  → Cotação Express → Guia de soluções → Diferenciais → Patro Private
 *  → Como funciona → Avaliações → Autoridade local e sede → Bairros
 *  → Conteúdos → FAQ comercial → CTA final → Rodapé.
 *
 *  Regras mantidas nesta página:
 *  - apenas 6 produtos principais (os demais permanecem em páginas próprias);
 *  - uma única lista de seguradoras (repetição do carrossel é decorativa);
 *  - uma única seção de bairros, sempre com rota existente;
 *  - uma única FAQ comercial (FAQ de sinistro vive em /central-de-sinistro);
 *  - CTAs de cotação por produto via /cotacao?tipo=...
 */
import { lazy, Suspense, useState } from "react";
import { EMPRESA, WHATSAPP_URL_BASE } from "@/config/company";
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
import { PATRO_SOCIAL_PROOF } from "@/lib/patroSocialProof";
import { INSURER_WEBSITES } from "@/data/insurerWebsites";
import SolutionGuide from "@/components/SolutionGuide";
import ClaimsSupportTimeline from "@/components/ClaimsSupportTimeline";

// Só as ferramentas interativas são adiadas; conteúdo editorial é síncrono.
const loadQuickLeadForm = () => import("@/components/QuickLeadForm");
const loadLocalSavingsCalculator = () => import("@/components/LocalSavingsCalculator");
const QuickLeadForm = lazy(() => loadQuickLeadForm().then((m) => ({ default: m.QuickLeadForm })));
const LocalSavingsCalculator = lazy(loadLocalSavingsCalculator);
import HomeBlogSection from "@/components/HomeBlogSection";
import PortoPartnershipSection from "@/components/PortoPartnershipSection";
import AutoridadePatro from "@/components/AutoridadePatro";
import ComoPatroAjuda from "@/components/ComoPatroAjuda";
import HeroPatro from "@/components/HeroPatro";
import "@/styles/home.css";

const WHATSAPP_URL = `${WHATSAPP_URL_BASE}?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o.`;

const handleSeoBlockCotacaoClick = () => trackCotacaoClick("home-seo-block");
const handleFinalCotacaoClick = () => trackCotacaoClick("home-cta-final");
const handleFinalWhatsAppClick = () => trackWhatsAppClick("home-cta-final");

/** Seguradoras exibidas na home (lista única). O portfólio completo vive em /seguradoras-parceiras. */
const parceirosHome = [
  { key: "ALLIANZ", name: "Allianz" },
  { key: "AZUL", name: "Azul Seguros" },
  { key: "BRADESCO", name: "Bradesco Seguros" },
  { key: "HDI", name: "HDI Seguros" },
  { key: "ITAÚ", name: "Itaú Seguros" },
  { key: "LIBERTY", name: "Liberty Seguros" },
  { key: "MAPFRE", name: "Mapfre" },
  { key: "PORTO", name: "Porto Seguro" },
  { key: "SOMPO", name: "Sompo Seguros" },
  { key: "SUHAI", name: "Suhai Seguradora" },
  { key: "TOKIO MARINE", name: "Tokio Marine" },
  { key: "ZURICH", name: "Zurich Seguros" },
];

/** Seis produtos principais da home. Demais produtos permanecem em páginas próprias. */
const produtosPrincipais = [
  {
    title: "Seguro Auto",
    desc: "Colisão, roubo, terceiros e assistência 24h para o seu carro.",
    href: "/seguro-auto-guarulhos",
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
    href: "/plano-de-saude-guarulhos",
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
  { label: "Plano de Saúde em Guarulhos", href: "/plano-de-saude-guarulhos" },
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
  const [quickLeadInsuranceType, setQuickLeadInsuranceType] = useState<string>();

  return (
    <>
      <PageMeta
        title="Corretora de Seguros em Guarulhos | Patro Seguros"
        description="Procura uma corretora em Guarulhos? Compare seguro auto, empresarial e planos de saúde com atendimento na Cidade Maia. Solicite sua cotação com a Patro."
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
      <main id="main-content" className="patro-home">
        {/* Abertura → escolha de proteção → orientação → cotação. */}
        <HeroPatro />

        <section className="home-solutions" aria-labelledby="home-solucoes">
          <div className="container mx-auto">
            <div className="home-section-heading">
              <div>
                <h2 id="home-solucoes">O que você quer proteger?</h2>
                <p>Escolha uma solução para conhecer as coberturas e os próximos passos.</p>
              </div>
              <Link to="/servicos" className="home-all-solutions">
                Ver todas as soluções <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="home-solutions-grid">
              {produtosPrincipais.map((p) => (
                <article key={p.href} className="home-solution">
                  <p.Icon className="home-solution-icon" aria-hidden="true" />
                  <h3><Link to={p.href}>{p.title}</Link></h3>
                  <p>{p.desc}</p>
                  <div className="home-solution-actions">
                    <Link to={p.href} aria-label={`Conhecer ${p.title.toLowerCase()}`}>
                      Ver coberturas <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                      to={p.cotacao}
                      onClick={() => trackCotacaoClick(`home-card-${p.title}`)}
                      aria-label={`Solicitar cotação de ${p.title.toLowerCase()}`}
                    >
                      Cotar
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. PROPOSTA DE VALOR + 4. CTA PRINCIPAL */}
        <section className="py-14 md:py-20 bg-white border-t border-slate-100" aria-labelledby="home-seo-intro">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="home-seo-intro" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Você não precisa entender tudo de seguros. Nós ajudamos.
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed max-w-3xl">
              <p>
                Do{" "}
                <Link to="/seguro-auto-guarulhos" className="text-primary font-semibold hover:underline">
                  seguro auto
                </Link>{" "}
                ao{" "}
                <Link to="/plano-de-saude-guarulhos" className="text-primary font-semibold hover:underline">
                  plano de saúde
                </Link>
                , a Patro compara propostas e explica o que muda em cada uma: coberturas, limites, assistência e preço.
                Você decide com informação, não só com um valor na tela.
              </p>
              <p>
                Nossa equipe, na Cidade Maia, acompanha você também depois da contratação, nas renovações e no sinistro.{" "}
                <Link to="/seguros-guarulhos" className="text-primary font-semibold hover:underline">
                  Conheça nossa atuação em Guarulhos e região.
                </Link>
              </p>
            </div>

            <div className="home-intro-actions">
              <Button asChild size="lg">
                <Link to="/cotacao" onClick={handleSeoBlockCotacaoClick}>
                  Solicitar cotação de seguro
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/faq">Ver dúvidas frequentes sobre seguros</Link>
              </Button>
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

        <section className="home-insurers" aria-label="Seguradoras parceiras">
          <div className="container mx-auto">
            <div className="home-insurers-heading">
              <p>Uma corretora. Diferentes seguradoras para comparar.</p>
              <Link to="/seguradoras-parceiras">Conhecer as parceiras <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <ul className="home-insurers-list" aria-label="Seguradoras parceiras da Patro Seguros">
              {parceirosHome.map(({ key, name }) => {
                const url = INSURER_WEBSITES[key];
                return (
                  <li key={key}>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label={`Visitar o site oficial de ${name}`}
                        onClick={() => {
                          try {
                            window.gtag?.("event", "clique_seguradora_parceira", {
                              event_category: "parceiros",
                              seguradora: key,
                              url_destino: url,
                              origem: "marquee_home",
                            });
                          } catch { /* noop */ }
                        }}
                      >
                        {name}
                      </a>
                    ) : <span>{name}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* O formulário só baixa seu código ao se aproximar da tela. */}
        <LazySection minHeight="520px" rootMargin="300px" prefetch={[loadQuickLeadForm]} placeholderId="cotacao-express">
          <Suspense fallback={<div id="cotacao-express" style={{ minHeight: 520 }} aria-hidden="true" />}>
            <QuickLeadForm prefillInsuranceType={quickLeadInsuranceType} />
          </Suspense>
        </LazySection>

        <SolutionGuide onSelectInsuranceType={setQuickLeadInsuranceType} />

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

        <section className="home-private" aria-labelledby="home-private-heading">
          <div className="container mx-auto">
            <div className="home-private-intro">
              <span className="home-private-signature">Patro Private</span>
              <h2 id="home-private-heading">Um olhar completo sobre o seu patrimônio.</h2>
              <p>
                Imóveis de alto padrão, veículos especiais e os planos da sua família merecem uma análise
                cuidadosa. Conheça nossa consultoria para organizar a proteção do que você construiu.
              </p>
              <Button asChild size="lg" className="home-private-cta">
                <Link to="/patro-private">
                  Conhecer a Patro Private
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="home-private-paths">
              <Link to="/seguro-residencial-alto-padrao-guarulhos">
                <div>
                  <h3>Residências de alto padrão</h3>
                  <p>Uma análise que considera o imóvel e o patrimônio da sua família.</p>
                </div>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link to="/seguro-auto-premium-guarulhos">
                <div>
                  <h3>Veículos premium</h3>
                  <p>Orientação para comparar coberturas, assistência e condições.</p>
                </div>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link to="/consorcio">
                <div>
                  <h3>Planejamento com consórcio</h3>
                  <p>Simule a aquisição de imóveis e veículos de forma planejada.</p>
                </div>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Conteúdo editorial disponível na primeira renderização. */}
        <section className="py-14 bg-white" aria-label="Como funciona a cotação">
          <div className="container mx-auto px-4 max-w-5xl">
            <ComoPatroAjuda trackingContext="home:como-ajuda" quoteHref="/cotacao" pageUrl={CANONICAL_BASE_URL} />
          </div>
        </section>

        {/* Uma única seção de avaliações, sem relatos reproduzidos ou inventados. */}
        <section className="py-20 bg-white" aria-labelledby="home-depoimentos">
          <div className="container mx-auto px-4">
            <div className="home-reviews-layout">
              <div>
                <span className="home-reviews-label">Avaliações no Google</span>
                <h2 id="home-depoimentos">O que nossos clientes dizem</h2>
              </div>
              <div className="home-reviews-proof">
                <p className="home-reviews-score">
                  Nota {EMPRESA.metricas.googleRating.toLocaleString("pt-BR")} no Google com {EMPRESA.metricas.googleReviews} avaliações verificadas
                </p>
                <a href={EMPRESA.redesSociais.google} target="_blank" rel="noopener noreferrer" className="home-reviews-link">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Consultar avaliações no Google
                </a>
                <p className="home-reviews-note">
                  Consulte os relatos completos, as datas e as notas diretamente no perfil público da Patro no Google.
                  Não reproduzimos depoimentos sem uma fonte verificável.
                </p>
              </div>
            </div>
            <div className="home-reviews-source">
              <GooglePreferredSource context="home:prova-social" />
            </div>
          </div>
        </section>

        <section className="py-14 bg-slate-50" aria-label="Autoridade e credenciais">
          <div className="container mx-auto px-4 max-w-4xl">
            <AutoridadePatro />
          </div>
        </section>

        <section className="home-business" aria-labelledby="home-business-heading">
          <div className="container mx-auto px-4">
            <div className="home-business-content">
              <h2 id="home-business-heading">Proteção Especializada para Empresas em Guarulhos</h2>
              <p>
                De frotas a galpões logísticos em Cumbica, oferecemos gestão de riscos completa para o seu negócio
                crescer com segurança.
              </p>
              <ul className="home-business-coverages">
                {["Seguro Frota", "Transporte e Carga", "Saúde PME", "Responsabilidade Civil"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Button asChild size="lg" className="home-business-cta">
                <Link to="/seguro-empresarial">Conhecer Patro Empresas</Link>
              </Button>
            </div>
            <div className="home-business-office">
              <h3>Nossa Sede em Guarulhos</h3>
              <p>{EMPRESA.enderecoCompleto}</p>
              <p>{EMPRESA.horario}</p>
              <a href={EMPRESA.redesSociais.google} target="_blank" rel="noopener noreferrer">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Abrir no Google Maps
              </a>
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

        {/* Cada bloco carrega por proximidade, sem esperar os demais. */}
        <LazySection minHeight="800px" rootMargin="300px" prefetch={[loadLocalSavingsCalculator]}>
          <Suspense fallback={<div className="min-h-[800px]" aria-hidden="true" />}>
            <LocalSavingsCalculator />
          </Suspense>
        </LazySection>
        <HomeBlogSection />
        <PortoPartnershipSection />

        {/* 13. FAQ COMERCIAL — única FAQ da home */}
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200" aria-labelledby="home-faq">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="home-faq">Perguntas Frequentes sobre Seguros em Guarulhos</h2>
            <Accordion type="single" collapsible className="home-faq-list">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="home-faq-answer">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="home-faq-support">
              <Link to="/central-de-sinistro">
                Dúvidas sobre sinistro? Ver a Central de Sinistro
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <ClaimsSupportTimeline compact />

        {/* CHAMADA CENTRAL DE SINISTRO */}
        <div className="home-claims-callout bg-orange-700 py-3 text-white">
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
        <section className="home-final-cta">
          <div className="container mx-auto px-4">
            <div>
              <h2>Pronto para proteger o que importa?</h2>
              <p>Compare propostas em até 2 horas úteis.</p>
            </div>
            <div className="home-final-actions">
              <Button asChild size="lg" variant="secondary">
                <Link to="/cotacao" onClick={handleFinalCotacaoClick}>Começar cotação agora</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={handleFinalWhatsAppClick}>
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
