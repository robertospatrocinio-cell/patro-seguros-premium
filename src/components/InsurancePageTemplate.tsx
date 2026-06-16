import { Link, useLocation } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";
import { CheckCircle, Phone, MessageCircle, ArrowRight, Award, AlertTriangle, DollarSign, BookOpen, Lightbulb } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick, trackInternalLinkClick, buildInternalLinkSource } from "@/lib/tracking";
import OptimizedImage from "@/components/OptimizedImage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { Button } from "@/components/ui/button";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import LocalAreaSchema from "@/components/LocalAreaSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import WebSiteSchema from "@/components/WebSiteSchema";
import AggregateRatingSchema from "@/components/AggregateRatingSchema";
import ServiceSchema from "@/components/ServiceSchema";
import MedicalOrganizationSchema from "@/components/MedicalOrganizationSchema";

import { getCanonicalUrl } from "@/lib/canonical";
import EbookConsorcioBanner from "@/components/EbookConsorcioBanner";
import AgrishowPromoBanner from "@/components/AgrishowPromoBanner";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";
import InsuranceHubLinks from "@/components/InsuranceHubLinks";
import SmartText from "@/components/SmartText";
import { getBreadcrumbCategory } from "@/lib/breadcrumbCategory";
import { getRelatedLinks } from "@/lib/relatedFromText";

// Inferência de palavras-chave (em inglês) para a galeria temática automática
const inferGalleryKeywords = (title: string): string[] => {
  const t = title.toLowerCase();
  const map: Array<[RegExp, string[]]> = [
    [/silo|arma(z|s)|gr[ãa]os|colheitadeira|safra/, ["grain silo farm", "grain harvest", "farm storage", "agriculture wheat"]],
    [/trator|m[áa]quina agr[íi]cola|colheit|agro|rural|fazenda/, ["tractor farm field", "agriculture brazil", "harvest combine", "farm landscape"]],
    [/granja|av[íi]cola|aves|frango/, ["poultry farm", "chicken farm", "rural farm shed", "agriculture poultry"]],
    [/m[áa]quinas?.*linha amarela|escavadeira|retroescavadeira|p[áa] carregadeira/, ["excavator construction", "yellow heavy machinery", "construction site", "heavy equipment"]],
    [/m[áa]quinas?.*industriais?/, ["industrial machinery", "factory floor", "manufacturing plant", "industrial equipment"]],
    [/galp[ãa]o|log[íi]stica|armaz[ée]m|patrimon/, ["warehouse interior", "logistics warehouse", "industrial warehouse", "shipping pallets"]],
    [/frota|cami(nh)?[ãa]o|transporte/, ["truck fleet highway", "logistics truck", "cargo trucks", "transport brazil"]],
    [/auto|carro|ve[íi]culo/, ["new car", "car driving city", "automobile brazil", "modern sedan"]],
    [/moto/, ["motorcycle city", "motorbike rider", "sport motorcycle", "urban motorbike"]],
    [/bike|bicicleta|ciclista/, ["bicycle city", "road cyclist", "mountain bike", "urban bike"]],
    [/celular|smartphone/, ["smartphone", "mobile phone hand", "modern smartphone", "phone screen"]],
    [/drone/, ["drone flying", "aerial drone", "quadcopter sky", "drone landscape"]],
    [/avi[ãa]o|avia[çc][ãa]o|aeronave/, ["private jet", "small airplane", "aircraft runway", "aviation cockpit"]],
    [/embarca[çc][ãa]o|barco|lancha|n[áa]utico/, ["luxury boat", "yacht marina", "speedboat", "sailing boat"]],
    [/jet ?ski|jetski/, ["jet ski water", "jetski beach", "personal watercraft", "ocean recreation"]],
    [/residencial|casa|im[óo]vel|moradia/, ["modern house", "family home interior", "cozy living room", "residential home"]],
    [/condom[íi]nio/, ["condo building", "modern condominium", "apartment lobby", "residential tower"]],
    [/fian[çc]a|aluguel|locat/, ["house keys hand", "apartment rental", "real estate keys", "modern apartment"]],
    [/saude|sa[úu]de|hospital|m[ée]dic|cl[íi]nica/, ["doctor consultation", "modern hospital", "stethoscope hands", "healthcare brazil"]],
    [/odonto|dent/, ["dental clinic", "dentist office", "modern dentistry", "dental chair"]],
    [/pet|animal|c[ãa]o|gato/, ["happy dog", "pet veterinary", "cat home", "puppy family"]],
    [/funeral/, ["white lily flowers", "candle memorial", "peaceful sunset", "minimalist tribute"]],
    [/vida|fam[íi]lia/, ["happy family brazil", "family hands together", "smiling parents kids", "family sunset"]],
    [/viagem|travel/, ["airport traveler", "passport luggage", "vacation beach", "tourist suitcase"]],
    [/cyber|digital|dados|ti/, ["server room", "cyber security code", "data center", "developer screen"]],
    [/engenharia|obra|constru/, ["construction site engineer", "civil engineering", "building under construction", "architect blueprints"]],
    [/solar|energia|fotovolt/, ["solar panels rooftop", "solar farm sunset", "photovoltaic panels", "renewable energy"]],
    [/ambiental|meio ambiente/, ["green forest brazil", "environmental nature", "river forest aerial", "sustainability"]],
    [/loja|com[ée]rcio|varejo/, ["modern retail store", "boutique interior", "shop counter", "small business owner"]],
    [/empresa|empresarial|pme|neg[óo]cio/, ["modern office team", "business meeting brazil", "startup workspace", "corporate handshake"]],
    [/rc|responsabilidade civil/, ["business handshake contract", "lawyer office", "professional meeting", "corporate office"]],
    [/previd[êe]ncia|aposentad/, ["happy retired couple", "senior couple beach", "elderly hands", "retirement planning"]],
    [/cons[óo]rcio/, ["new car keys", "house keys couple", "real estate handover", "smiling owner car"]],
    [/motorista de app|uber|99/, ["rideshare driver", "uber driver car", "app driver smartphone", "city driver"]],
  ];
  for (const [re, kws] of map) if (re.test(t)) return kws;
  return ["insurance brazil", "professional handshake", "modern office", "family home"];
};

const buildAutoGallery = (title: string, keywords?: string[]): string[] => {
  // source.unsplash.com/featured was deprecated by Unsplash (returns 503).
  // We now hide the gallery section unless callers pass explicit `galleryImages`.
  void title; void keywords;
  return [];
};

// Map page title keywords to the Cotacao select values
const inferQuoteType = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes("auto") || t.includes("carro") || t.includes("moto")) return "auto";
  if (t.includes("vida")) return "vida";
  if (t.includes("residencial") || t.includes("casa") || t.includes("imóvel") || t.includes("condom")) return "residencial";
  if (t.includes("viagem")) return "viagem";
  if (t.includes("saúde") || t.includes("saude") || t.includes("odonto") || t.includes("plano de saúde")) return "saude";
  if (t.includes("frota")) return "frota";
  if (t.includes("rc") || t.includes("responsabilidade")) return "rc";
  if (t.includes("empresa") || t.includes("pme") || t.includes("galpão") || t.includes("galpoes") || t.includes("indústria") || t.includes("industria") || t.includes("comercial")) return "empresarial";
  return "outros";
};

const QuickQuoteForm = lazy(() => import("@/components/QuickQuoteForm"));

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

// Mensagem personalizada por tipo de seguro para o link do WhatsApp
const buildProductWhatsAppUrl = (title: string): string => {
  const msg = `Olá! Vim pelo site da Patro Seguros e gostaria de uma cotação de ${title}. Pode me ajudar?`;
  return `https://wa.me/551151997500?text=${encodeURIComponent(msg)}`;
};

interface Coverage { title: string; description: string; }
interface FAQ { question: string; answer: string; }
interface HowItWorksStep { step: string; title: string; description: string; }
interface Scenario { title: string; description: string; }

interface QuoteFormField {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "select";
  options?: string[];
}

interface ContextualLink {
  text: string;
  href: string;
}

interface ContextualSection {
  heading: string;
  paragraphs: string[];
  links: ContextualLink[];
}

interface FeaturedArticle {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  ctaText?: string;
  image?: string;
}

interface InsurancePageProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  coverages: Coverage[];
  whoNeeds: string[];
  whyPatro: string[];
  faqs: FAQ[];
  relatedInsurances?: { title: string; link: string }[];
  badge?: string;
  metaDescription?: string;
  detailedDescription?: string;
  howItWorks?: HowItWorksStep[];
  pricingInfo?: { intro: string; factors: string[]; note?: string };
  importantDetails?: { title: string; content: string }[];
  realScenarios?: Scenario[];
  coverageExclusions?: string[];
  tips?: string[];
  quoteUrl?: string;
  heroImage?: string;
  mobileHeroImage?: string;
  /**
   * Galeria de 3 a 6 imagens reais do produto (URLs). Quando omitida,
   * o template gera automaticamente 4 imagens temáticas via Unsplash
   * a partir de palavras-chave inferidas do título.
   */
  galleryImages?: string[];
  /** Palavras-chave em inglês para o fallback automático de galeria. */
  galleryKeywords?: string[];
  quoteFormFields?: QuoteFormField[];
  contextualLinks?: ContextualSection;
  featuredArticle?: FeaturedArticle;
  showEbookConsorcio?: boolean;
  showAgrishowBanner?: boolean;
  /** Conteúdo extra renderizado após "Relacionados" e antes do Footer */
  extraSections?: ReactNode;
  /**
   * Quando true, suprime o `<FAQSchema>` injetado por este template.
   * Use em páginas locais que já emitem FAQPage via `LocalAreaSchema`
   * para evitar dois blocos FAQPage no mesmo URL.
   */
  skipFAQSchema?: boolean;
  /**
   * Quando true, suprime o `<FAQSchema>` injetado por este template.
   * Útil para páginas que já emitem FAQPage via outros componentes (ex: LocalAreaSchema)
   */
  skipFAQSchemaManual?: boolean;
  /**
   * Quando true, suprime o `<AggregateRatingSchema>` injetado por este template.
   * Use em páginas locais que já emitem AggregateRating via `LocalAreaSchema`
   * para evitar nodos de rating duplicados / inconsistentes.
   */
  skipAggregateRating?: boolean;
  /**
   * Fornece o URL canônico para as schemas internas.
   */
  canonicalUrl?: string;
}

const InsurancePageTemplate = ({
   title, subtitle, description, icon,
   coverages, whoNeeds, whyPatro,
   relatedInsurances = [],
  badge,
  metaDescription,
  detailedDescription,
  howItWorks,
  pricingInfo,
  importantDetails,
  realScenarios,
  coverageExclusions,
  tips,
  quoteUrl,
  heroImage,
  mobileHeroImage,
  galleryImages,
  galleryKeywords,
  quoteFormFields,
  contextualLinks,
  featuredArticle,
  showEbookConsorcio,
  showAgrishowBanner,
  extraSections,
  skipFAQSchema,
  skipFAQSchemaManual,
  skipAggregateRating,
  faqs = [],
  canonicalUrl: canonicalUrlProp,
}: InsurancePageProps) => {
  const location = useLocation();
  const canonicalUrl = canonicalUrlProp || getCanonicalUrl(location.pathname);
  const breadcrumbCategory = getBreadcrumbCategory(location.pathname);
  const breadcrumbItems = breadcrumbCategory
    ? [{ label: breadcrumbCategory.label, href: breadcrumbCategory.href }, { label: title }]
    : [{ label: title }];
  // Shared set to dedupe contextual keyword links across all narrative blocks
  // of the page (description, detailedDescription, contextualLinks, importantDetails).
  const linkedKeywords = new Set<string>();

  // Determine descriptive alt for hero image based on product type
  // Padrão unificado para SEO + acessibilidade:
  //   "{descrição contextual} — Patro Seguros, Corretora em Guarulhos/SP"
  // O mesmo texto é usado em `alt` e `title` para consistência.
  const getHeroAlt = () => {
    const t = title.toLowerCase();
    const suffix = " — Patro Seguros, Corretora em Guarulhos/SP";
    if (t.includes("auto") || t.includes("carro") || t.includes("veículo") || t.includes("frota") || t.includes("moto")) 
      return `${title} com cotação online${suffix}`;
    if (t.includes("saúde") || t.includes("saude") || t.includes("médico") || t.includes("plano")) 
      return `${title}: consultoria especializada${suffix}`;
    if (t.includes("residencial") || t.includes("casa") || t.includes("apartamento") || t.includes("imóvel")) 
      return `${title} para proteger casa e apartamento${suffix}`;
    if (t.includes("empresa") || t.includes("pme") || t.includes("negócio") || t.includes("empresarial")) 
      return `${title} para pequenas e médias empresas${suffix}`;
    if (t.includes("vida")) 
      return `${title} para proteção familiar${suffix}`;
    if (t.includes("consórcio") || t.includes("consorcio")) 
      return `${title} para carro, imóvel ou caminhão${suffix}`;
    return `${title}${suffix}`;
  };

  // SEO Local: se o title da página ainda não menciona uma localidade
  // (Guarulhos, São Paulo, SP, Brasil), reforça os H2 com geomodificador
  // para capturar buscas geolocalizadas (ex.: "quanto custa seguro auto em Guarulhos").
  const hasGeo = /(guarulhos|são paulo|sao paulo|\bsp\b|brasil)/i.test(title);
  const geoSuffix = hasGeo ? "" : " em Guarulhos e Região";
  const geoTitle = `${title}${geoSuffix}`;

  return (
    <>
       <PageMeta
         title={title}
         description={metaDescription || `${title} - ${subtitle}. Cotação grátis com a Patro Seguros em Guarulhos. Compare seguradoras e encontre a melhor proteção.`}
         preloadImage={heroImage}
         preloadMobileImage={mobileHeroImage}
       />
       
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebSiteSchema />
      {!skipFAQSchemaManual && faqs.length > 0 && <FAQSchema faqs={faqs} />}
      <LocalAreaSchema
        serviceName={title}
        url={canonicalUrl}
        description={metaDescription || subtitle}
        city="Guarulhos"
        faqs={faqs}
      />

      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          ...(breadcrumbCategory
            ? [{ name: breadcrumbCategory.label, url: breadcrumbCategory.href }]
            : []),
          { name: title, url: location.pathname },
        ]}
      />
      <ServiceSchema 
        name={title} 
        description={description} 
        serviceType={inferQuoteType(title) === "saude" ? "HealthInsurance" : "Insurance"}
      />
      {(inferQuoteType(title) === "saude" || title.toLowerCase().includes("plano")) && <MedicalOrganizationSchema />}
      <Header />
      <main id="main-content" className="outline-none">
        <Breadcrumb items={breadcrumbItems} />
        {/* Hero */}
        <section className="relative gradient-hero overflow-hidden min-h-[480px] md:min-h-[520px] flex items-center" aria-label={`${title} — cotação gratuita`}>
          {heroImage && (
            <div className="absolute inset-0">
               <OptimizedImage 
                src={heroImage} 
                mobileSrc={mobileHeroImage}
                alt={getHeroAlt()} 
                title={getHeroAlt()}
                className="w-full h-full" 
                eager 
                aria-hidden="false" 
                placeholderClass="bg-transparent" 
                decoding="sync"

                style={{ opacity: 0.45, objectPosition: 'center center' }} 
              />
              {/* Overlay suave: escurece para legibilidade do texto sem apagar a foto temática */}
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(212,60%,8%)]/70 via-[hsl(212,60%,10%)]/55 to-[hsl(212,60%,12%)]/75" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent,hsl(212,60%,8%)/0.5)]" />
            </div>
          )}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(215,100%,60%,0.12),transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="py-24 md:py-32 max-w-3xl mx-auto text-center">
              <div className="text-4xl mb-6 animate-fade-up" role="img" aria-label={title}>{icon}</div>
              {badge && (
                <div className="flex justify-center mb-6 animate-fade-up">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-400/20 border border-yellow-400/50 text-yellow-300 font-bold text-[11px] uppercase tracking-wider">
                    <Award className="h-3.5 w-3.5 text-yellow-300" aria-hidden="true" />
                    {badge}
                  </span>
                </div>
              )}
              <h1 className="text-white text-balance mb-5 animate-fade-up-delay-1">{title}</h1>
              <p className="text-base md:text-lg text-white/50 mb-10 animate-fade-up-delay-2 max-w-2xl mx-auto">{subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up-delay-3">
                {quoteUrl && quoteUrl.startsWith('/') ? (
                  <Link to={quoteUrl} className="w-full sm:w-auto" onClick={() => trackCotacaoClick(`product-page:hero:${title}`, { origin: "product-page-hero", insuranceType: title })}>
                    <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                      Pedir Cotação do {title}
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/cotacao?tipo=${inferQuoteType(title)}`} className="w-full sm:w-auto" onClick={() => trackCotacaoClick(`product-page:hero:${title}`, { origin: "product-page-hero", insuranceType: title })}>
                    <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                      Pedir Cotação do {title}
                    </Button>
                  </Link>
                )}
                <a href={buildProductWhatsAppUrl(title)} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" aria-label={`Falar no WhatsApp sobre ${title}`} onClick={() => trackWhatsAppClick(`product-page:hero:${title}`, { origin: "product-page-hero", insuranceType: title })}>
                  <Button size="lg" className="w-full sm:w-auto rounded-xl h-12 px-8 text-sm bg-white/[0.06] border border-white/10 text-white/70 hover:bg-white/[0.12]">
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Falar no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {showAgrishowBanner && (
          <AgrishowPromoBanner source={title.toLowerCase().replace(/\s+/g, "-")} variant="compact" />
        )}

        {/* Galeria temática do produto (3-6 imagens reais) */}
        {(() => {
          const gallery = (galleryImages && galleryImages.length >= 3)
            ? galleryImages.slice(0, 6)
            : buildAutoGallery(title, galleryKeywords);
          if (!gallery || gallery.length < 3) return null;
          const colsClass = gallery.length >= 6
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
            : gallery.length === 5
            ? "grid-cols-2 md:grid-cols-5"
            : gallery.length === 4
            ? "grid-cols-2 md:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-3";
          return (
            <section className="py-12 md:py-16 bg-gradient-surface border-y border-border/60" aria-labelledby="galeria-heading">
              <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-10">
                  <span className="section-label">Veja na prática</span>
                  <h2 id="galeria-heading" className="mt-3 text-2xl md:text-3xl text-foreground">
                    {title}: o que protegemos
                  </h2>
                </div>
                <div className={`grid ${colsClass} gap-3 md:gap-4`}>
                  {gallery.map((src, i) => (
                    <figure
                      key={`${src}-${i}`}
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted shadow-sm transition-smooth hover:shadow-lg"
                    >
                      <img
                        src={src}
                        alt={`${title} — imagem ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={600}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* Descrição */}
        <section className="py-20" aria-labelledby="descricao-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="descricao-heading" className="sr-only">Sobre o {title}</h2>
            <SmartText
              text={description}
              className="text-[15px] text-muted-foreground leading-relaxed"
              linkedKeywords={linkedKeywords}
              maxLinks={2}
            />
            {detailedDescription && (
              <div className="mt-8 space-y-4">
                {detailedDescription.split('\n\n').map((paragraph, i) => (
                  <SmartText
                    key={i}
                    text={paragraph}
                    className="text-muted-foreground leading-relaxed text-[15px]"
                    linkedKeywords={linkedKeywords}
                    maxLinks={2}
                  />
                ))}
              </div>
            )}
            {contextualLinks && (
              <div className="mt-10 premium-card p-6 md:p-8">
                <h3 className="text-base font-semibold mb-4">{contextualLinks.heading}</h3>
                <div className="space-y-3">
                  {contextualLinks.paragraphs.map((p, i) => (
                    <SmartText
                      key={i}
                      text={p}
                      className="text-sm text-muted-foreground leading-relaxed"
                      linkedKeywords={linkedKeywords}
                      maxLinks={2}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {contextualLinks.links.map((link, i) => (
                    <Link key={i} to={link.href} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/[0.06] text-primary text-sm font-medium hover:bg-primary/[0.12] transition-colors">
                      <ArrowRight className="h-3 w-3" aria-hidden="true" /> {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Como Funciona */}
        {howItWorks && howItWorks.length > 0 && (
          <section className="py-24 gradient-surface" aria-labelledby="como-funciona-heading">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-16">
                <span className="section-label">Passo a Passo</span>
                <h2 id="como-funciona-heading" className="mt-4">Como Funciona o {title}</h2>
              </div>
              <ol className="space-y-4 list-none">
                {howItWorks.map((step, i) => (
                  <li key={i} className="premium-card p-6 flex gap-5 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/[0.06] flex items-center justify-center" aria-hidden="true">
                      <span className="text-sm font-bold text-primary">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold mb-1.5">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Coberturas */}
        <section className={`py-24 ${howItWorks ? '' : 'gradient-surface'}`} aria-labelledby="coberturas-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="section-label">Coberturas</span>
              <h2 id="coberturas-heading" className="mt-4">O que o {title} cobre</h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto list-none">
              {coverages.map((c, i) => (
                <li key={i} className="premium-card p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="text-[15px] font-semibold mb-1">{c.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Exclusões */}
        {coverageExclusions && coverageExclusions.length > 0 && (
          <section className="py-20" aria-labelledby="exclusoes-heading">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" aria-hidden="true" />
                <h2 id="exclusoes-heading" className="text-lg font-semibold">O que geralmente NÃO é coberto</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">É importante conhecer as exclusões para evitar surpresas:</p>
              <ul className="grid md:grid-cols-2 gap-3 list-none">
                {coverageExclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-destructive/[0.03] border border-destructive/10 rounded-xl p-4">
                    <span className="text-destructive font-bold text-xs mt-0.5" aria-hidden="true">✕</span>
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Preço */}
        {pricingInfo && (
          <section className="py-24 gradient-surface" aria-labelledby="preco-heading">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="text-center mb-12">
                <DollarSign className="h-7 w-7 text-primary mx-auto mb-3" aria-hidden="true" />
                <h2 id="preco-heading">Quanto custa o {geoTitle}?</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">{pricingInfo.intro}</p>
              <div className="premium-card p-7">
                <h3 className="text-[15px] font-semibold mb-4">Fatores que influenciam o preço:</h3>
                <ul className="grid md:grid-cols-2 gap-3 list-none">
                  {pricingInfo.factors.map((factor, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm text-muted-foreground">{factor}</p>
                    </li>
                  ))}
                </ul>
                {pricingInfo.note && (
                  <div className="mt-6 pt-5 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">{pricingInfo.note}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Cenários */}
        {realScenarios && realScenarios.length > 0 && (
          <section className="py-24" aria-labelledby="cenarios-heading">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="text-center mb-16">
                <BookOpen className="h-7 w-7 text-primary mx-auto mb-3" aria-hidden="true" />
                <span className="section-label">Exemplos Práticos</span>
                <h2 id="cenarios-heading" className="mt-4">Situações Reais que o Seguro Resolve</h2>
              </div>
              <div className="space-y-4">
                {realScenarios.map((scenario, i) => (
                  <article key={i} className="premium-card p-6">
                    <h3 className="text-[15px] font-semibold mb-2">{scenario.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{scenario.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Detalhes */}
        {importantDetails && importantDetails.length > 0 && (
          <section className="py-24 gradient-surface" aria-labelledby="detalhes-heading">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="text-center mb-16">
                <span className="section-label">Aprofundamento</span>
                <h2 id="detalhes-heading" className="mt-4">O que você precisa saber</h2>
              </div>
              <div className="space-y-8">
                {importantDetails.map((detail, i) => (
                  <div key={i}>
                    <h3 className="text-base font-semibold mb-3">{detail.title}</h3>
                    <div className="space-y-3">
                      {detail.content.split('\n\n').map((p, j) => (
                        <SmartText
                          key={j}
                          text={p}
                          className="text-muted-foreground leading-relaxed text-[15px]"
                          linkedKeywords={linkedKeywords}
                          maxLinks={2}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Dicas */}
        {tips && tips.length > 0 && (
          <section className="py-20" aria-labelledby="dicas-heading">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <Lightbulb className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                <h2 id="dicas-heading" className="text-lg font-semibold">Dicas da Patro para Economizar</h2>
              </div>
              <ol className="space-y-3 list-none">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 bg-primary/[0.03] border border-primary/10 rounded-xl p-4">
                    <span className="text-primary font-bold text-sm mt-0.5" aria-hidden="true">{i + 1}.</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Quem Precisa */}
        <section className="py-20" aria-labelledby="quem-precisa-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="quem-precisa-heading" className="mb-10">Quem precisa do {geoTitle}?</h2>
            <ul className="grid md:grid-cols-2 gap-3 list-none">
              {whoNeeds.map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-muted/50 rounded-xl p-4 border border-transparent hover:border-primary/10 transition-base">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Por que Patro */}
        <section className="py-24 bg-primary/[0.03]" aria-labelledby="por-que-patro-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <SeloMelhorCorretora size="md" />
              </div>
              <h2 id="por-que-patro-heading">Por que contratar {title} com a Patro{hasGeo ? "" : " em Guarulhos"}?</h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-4 list-none">
              {whyPatro.map((reason, i) => (
                <li key={i} className="flex items-start gap-3 bg-card rounded-xl p-5 border hover:border-primary/15 transition-base">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">{reason}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

         {/* CTA Form Integrado */}
         <section className="py-24 bg-muted/30" aria-labelledby="formulario-heading">
           <div className="container mx-auto px-4 max-w-5xl">
             <div className="grid lg:grid-cols-2 gap-12 items-center">
               <div>
                 <span className="section-label mb-4 inline-block">Cotação Gratuita</span>
                 <h2 id="formulario-heading" className="text-3xl md:text-4xl mb-6">
                   {title === "Consórcio de Automóveis" 
                     ? "Simule sua economia real vs. financiamento"
                     : title.includes("Galpão")
                     ? "Solicite uma análise de risco estratégica"
                     : `Solicite sua cotação de ${title}`}
                 </h2>
                 <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                   {title === "Consórcio de Automóveis"
                     ? "Descubra como o consórcio pode acelerar seu crescimento patrimonial sem pagar juros bancários."
                     : title.includes("Galpão")
                     ? "Proteja seu ativo logístico com quem conhece profundamente os riscos de Guarulhos e Cumbica."
                     : "Resposta em até 2 horas úteis com o comparativo das melhores seguradoras do mercado."}
                 </p>
                 <div className="space-y-4">
                   {[
                     "Consultoria técnica especializada",
                     "Comparativo entre 16+ seguradoras",
                     "Atendimento humano e ágil",
                     "Suporte completo do início ao sinistro"
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                       </div>
                       <span className="text-sm font-medium text-foreground/80">{item}</span>
                     </div>
                   ))}
                 </div>
               </div>
 
               <div>
                 <Suspense fallback={<div className="h-[400px] bg-muted animate-pulse rounded-2xl" />}>
                   <QuickQuoteForm
                     insuranceType={title}
                     extraFields={quoteFormFields}
                     trackingLabel={title.toLowerCase().replace(/\s+/g, "-")}
                   />
                 </Suspense>
               </div>
             </div>
           </div>
         </section>

        {/* CTA */}
        <section className="py-28 gradient-hero relative overflow-hidden" aria-label="Solicitar cotação">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,hsla(215,100%,60%,0.12),transparent)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-4">Pronto para proteger o seu {title}?</h2>
            <p className="text-base text-white/60 mb-12 max-w-lg mx-auto">Cotação gratuita do {title} em até 2h úteis — fale agora com um especialista da Patro.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {quoteUrl ? (
                quoteUrl.startsWith('/') ? (
                  <Link to={quoteUrl} className="w-full sm:w-auto" onClick={() => trackCotacaoClick(`product-page:bottom:${title}`, { origin: "product-page-bottom", insuranceType: title })}>
                    <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                      <ArrowRight className="mr-2 h-4 w-4" aria-hidden="true" /> Pedir Cotação do {title}
                    </Button>
                  </Link>
                ) : (
                  <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" onClick={() => trackCotacaoClick(`product-page:bottom:${title}`, { origin: "product-page-bottom", insuranceType: title })}>
                    <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                      <ArrowRight className="mr-2 h-4 w-4" aria-hidden="true" /> Pedir Cotação do {title}
                    </Button>
                  </a>
                )
              ) : (
                <Link to={`/cotacao?tipo=${inferQuoteType(title)}`} className="w-full sm:w-auto" onClick={() => trackCotacaoClick(`product-page:bottom:${title}`, { origin: "product-page-bottom", insuranceType: title })}>
                  <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                    <ArrowRight className="mr-2 h-4 w-4" aria-hidden="true" /> Pedir Cotação do {title}
                  </Button>
                </Link>
              )}
              <a
                href={buildProductWhatsAppUrl(title)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Falar no WhatsApp sobre ${title}`}
                className="w-full sm:w-auto"
                onClick={() => trackWhatsAppClick(`product-page:bottom:${title}`, { origin: "product-page-bottom", insuranceType: title })}
              >
                <Button size="lg" className="w-full sm:w-auto rounded-xl h-12 px-8 text-sm bg-[#25D366] text-white hover:bg-[#1ebe57] border border-[#25D366]/40 shadow-lg shadow-[#25D366]/20">
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Falar no WhatsApp sobre {title}
                </Button>
              </a>
              <a href="tel:1151997500" aria-label="Ligar para (11) 5199-7500" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-xl h-12 px-8 text-sm bg-white/[0.06] border border-white/10 text-white/70 hover:bg-white/[0.12]">
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" /> (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        {showEbookConsorcio && <EbookConsorcioBanner variant="compact" />}

        {/* Artigo em destaque */}
        {featuredArticle && (
          <section className="py-20 bg-background" aria-labelledby="artigo-destaque-heading">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="premium-card overflow-hidden grid md:grid-cols-2 gap-0">
                {featuredArticle.image && (
                  <div className="relative min-h-[240px] md:min-h-full">
                    <OptimizedImage
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full"
                    />
                  </div>
                )}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  {featuredArticle.eyebrow && (
                    <span className="section-label mb-3">{featuredArticle.eyebrow}</span>
                  )}
                  <h2 id="artigo-destaque-heading" className="text-2xl md:text-3xl mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {featuredArticle.description}
                  </p>
                  <Link to={featuredArticle.href} className="inline-block">
                    <Button size="lg" className="rounded-xl">
                      <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                      {featuredArticle.ctaText || "Ler artigo completo"}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-24 bg-background" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-16">
              <span className="section-label">FAQ</span>
              <h2 id="faq-heading" className="mt-4">Perguntas Frequentes sobre {geoTitle}</h2>
            </div>
            <div className="space-y-3" data-speakable="faq">
              {faqs.map((faq, i) => (
                <details key={i} className="premium-card group" open={i === 0}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-[15px] font-semibold text-foreground hover:text-primary transition-base select-none list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-primary/40 ml-4 group-open:rotate-45 transition-transform text-lg font-light flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1">
                    <SmartText
                      text={faq.answer}
                      className="text-sm text-muted-foreground leading-relaxed"
                      linkedKeywords={linkedKeywords}
                      maxLinks={2}
                    />
                    {(() => {
                      const related = getRelatedLinks(`${faq.question} ${faq.answer}`, {
                        currentPath: location.pathname,
                      });
                      if (related.length === 0) return null;
                      return (
                        <div className="mt-4 pt-3 border-t border-border/40">
                          <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 mb-2">
                            Veja também
                          </p>
                          <ul className="flex flex-wrap gap-1.5 list-none">
                            {related.map((r) => (
                              <li key={r.href}>
                                <Link
                                  to={r.href}
                                  onClick={() =>
                                    trackInternalLinkClick({
                                      placement: "veja-tambem",
                                      source: buildInternalLinkSource("faq-product", title),
                                      destination: r.href,
                                      label: r.label,
                                    })
                                  }
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/[0.06] text-primary text-xs font-medium hover:bg-primary/[0.12] transition-colors"
                                >
                                  {r.label} <ArrowRight className="h-2.5 w-2.5" aria-hidden="true" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })()}
                  </div>
                </details>
              ))}
            </div>

            {/* CTA para clientes fora de Guarulhos */}
            <div className="mt-10 p-6 md:p-8 rounded-2xl border border-primary/10 bg-primary/[0.03] text-center">
              <p className="text-base md:text-lg font-semibold text-foreground mb-2">
                Mora fora de Guarulhos? Sem problema!
              </p>
              <p className="text-sm text-muted-foreground mb-5 max-w-xl mx-auto">
                Atendemos produtores rurais de todos os estados do Brasil. Solicite sua cotação personalizada por WhatsApp — retornamos com a melhor proposta em até 24h.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/551151997500?text=Olá! Sou de fora de Guarulhos e gostaria de uma cotação de seguro."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`faq-fora-guarulhos-${title}`)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 text-sm transition-colors"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Cotação Rápida por WhatsApp
                </a>
                <Link to={`/cotacao?tipo=${inferQuoteType(title)}`} onClick={() => trackCotacaoClick(`faq-fora-guarulhos-${title}`)}>
                  <Button variant="outline" className="rounded-xl w-full sm:w-auto">
                    Preencher formulário online
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Relacionados */}
        {relatedInsurances.length > 0 && (
          <section className="py-16 gradient-surface" aria-labelledby="relacionados-heading">
            <div className="container mx-auto px-4">
              <h2 id="relacionados-heading" className="text-center text-xl mb-8">Você também pode se interessar</h2>
              <nav className="flex flex-wrap gap-3 justify-center" aria-label="Seguros relacionados">
                {relatedInsurances.map((ins, i) => (
                  <Link key={i} to={ins.link}>
                    <Button variant="outline" className="rounded-xl text-sm">{ins.title} <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" /></Button>
                  </Link>
                ))}
              </nav>
            </div>
          </section>
        )}

        {/* Hub completo de links internos para fortalecer crawl & autoridade tópica */}
        <InsuranceHubLinks />
        {extraSections}
      </main>
      <Footer />
    </>
  );
};

export default InsurancePageTemplate;
