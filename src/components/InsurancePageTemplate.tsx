import { Link } from "react-router-dom";
import { CheckCircle, Phone, MessageCircle, ArrowRight, Award, AlertTriangle, DollarSign, BookOpen, Lightbulb } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import OptimizedImage from "@/components/OptimizedImage";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OrganizationSchema from "@/components/OrganizationSchema";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

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
  quoteFormFields?: QuoteFormField[];
  contextualLinks?: ContextualSection;
  featuredArticle?: FeaturedArticle;
}

const InsurancePageTemplate = ({
  title, subtitle, description, icon,
  coverages, whoNeeds, whyPatro, faqs,
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
  quoteFormFields,
  contextualLinks,
}: InsurancePageProps) => {
  return (
    <>
      <PageMeta
        title={title}
        description={metaDescription || `${title} - ${subtitle}. Cotação grátis com a Patro Seguros em Guarulhos. Compare seguradoras e encontre a melhor proteção.`}
      />
      <FAQSchema faqs={faqs} />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <Header />
      <main id="main-content">
        <Breadcrumb items={[{ label: title }]} />
        {/* Hero */}
        <section className="relative gradient-hero overflow-hidden" aria-label={`${title} — cotação gratuita`}>
          {heroImage && (
            <div className="absolute inset-0">
              <OptimizedImage src={heroImage} alt="" className="w-full h-full" eager aria-hidden="true" placeholderClass="bg-transparent" style={{ opacity: 0.2 }} />
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
                  <Link to={quoteUrl} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                      Preencher Formulário Completo
                    </Button>
                  </Link>
                ) : (
                  <Link to="/cotacao" className="w-full sm:w-auto" onClick={() => trackCotacaoClick(title)}>
                    <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                      Pedir Cotação Gratuita
                    </Button>
                  </Link>
                )}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" onClick={() => trackWhatsAppClick(title)}>
                  <Button size="lg" className="w-full sm:w-auto rounded-xl h-12 px-8 text-sm bg-white/[0.06] border border-white/10 text-white/70 hover:bg-white/[0.12]">
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Descrição */}
        <section className="py-20" aria-labelledby="descricao-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="descricao-heading" className="sr-only">Sobre o {title}</h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed">{description}</p>
            {detailedDescription && (
              <div className="mt-8 space-y-4">
                {detailedDescription.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed text-[15px]">{paragraph}</p>
                ))}
              </div>
            )}
            {contextualLinks && (
              <div className="mt-10 premium-card p-6 md:p-8">
                <h3 className="text-base font-semibold mb-4">{contextualLinks.heading}</h3>
                <div className="space-y-3">
                  {contextualLinks.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
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
                <h2 id="preco-heading">Quanto custa o {title}?</h2>
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
                        <p key={j} className="text-muted-foreground leading-relaxed text-[15px]">{p}</p>
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
            <h2 id="quem-precisa-heading" className="mb-10">Quem precisa do {title}?</h2>
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
              <h2 id="por-que-patro-heading">Por que contratar {title} com a Patro?</h2>
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

        {/* Formulário Rápido */}
        <section className="py-24" aria-labelledby="formulario-heading">
          <div className="container mx-auto px-4 max-w-xl">
            <QuickQuoteForm
              insuranceType={title}
              extraFields={quoteFormFields}
              trackingLabel={title.toLowerCase().replace(/\s+/g, "-")}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 gradient-hero relative overflow-hidden" aria-label="Solicitar cotação">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,hsla(215,100%,60%,0.12),transparent)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-4">Solicite sua cotação de {title} agora</h2>
            <p className="text-base text-white/50 mb-12 max-w-lg mx-auto">Resposta em até 2 horas com as melhores opções do mercado</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {quoteUrl ? (
                quoteUrl.startsWith('/') ? (
                  <Link to={quoteUrl} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                      <ArrowRight className="mr-2 h-4 w-4" aria-hidden="true" /> Preencher Formulário Completo
                    </Button>
                  </Link>
                ) : (
                  <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                      <ArrowRight className="mr-2 h-4 w-4" aria-hidden="true" /> Fazer Cotação Online
                    </Button>
                  </a>
                )
              ) : (
                <Link to="/cotacao" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">Pedir Cotação Gratuita</Button>
                </Link>
              )}
              <a href="tel:1151997500" aria-label="Ligar para (11) 5199-7500" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-xl h-12 px-8 text-sm bg-white/[0.06] border border-white/10 text-white/70 hover:bg-white/[0.12]">
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" /> (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-background" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-16">
              <span className="section-label">FAQ</span>
              <h2 id="faq-heading" className="mt-4">Perguntas Frequentes sobre {title}</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="premium-card group" open={i === 0}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-[15px] font-semibold text-foreground hover:text-primary transition-base select-none list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-primary/40 ml-4 group-open:rotate-45 transition-transform text-lg font-light flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
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
      </main>
      <Footer />
    </>
  );
};

export default InsurancePageTemplate;
