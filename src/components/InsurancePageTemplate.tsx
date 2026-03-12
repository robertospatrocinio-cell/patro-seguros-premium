import { Link } from "react-router-dom";
import { CheckCircle, Phone, MessageCircle, ArrowRight, Award, AlertTriangle, DollarSign, BookOpen, Lightbulb } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

interface Coverage { title: string; description: string; }
interface FAQ { question: string; answer: string; }
interface HowItWorksStep { step: string; title: string; description: string; }
interface Scenario { title: string; description: string; }

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
  // New dense content sections
  detailedDescription?: string;
  howItWorks?: HowItWorksStep[];
  pricingInfo?: { intro: string; factors: string[]; note?: string };
  importantDetails?: { title: string; content: string }[];
  realScenarios?: Scenario[];
  coverageExclusions?: string[];
  tips?: string[];
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
}: InsurancePageProps) => {
  return (
    <>
      <PageMeta
        title={title}
        description={metaDescription || `${title} - ${subtitle}. Cotação grátis com a Patro Seguros em Guarulhos. Compare seguradoras e encontre a melhor proteção.`}
      />
      <FAQSchema faqs={faqs} />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsla(215,100%,60%,0.15),transparent_60%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="py-20 md:py-28 max-w-3xl mx-auto text-center">
              <div className="text-5xl mb-6 animate-fade-up">{icon}</div>
              {badge && (
                <div className="flex justify-center mb-6 animate-fade-up">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-400/20 border border-yellow-400/50 text-yellow-300 font-bold text-xs uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4), 0 0 8px rgba(251,191,36,0.3)' }}>
                    <Award className="h-4 w-4 text-yellow-300 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" />
                    {badge}
                  </span>
                </div>
              )}
              <h1 className="text-white text-balance mb-6 animate-fade-up-delay-1">{title}</h1>
              <p className="text-lg text-white/70 mb-10 animate-fade-up-delay-2">{subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up-delay-3">
                <Link to="/cotacao">
                  <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8">
                    Pedir Cotação Gratuita
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="rounded-xl h-12 px-8 bg-white/10 border border-white/20 text-white hover:bg-white/20">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Descrição Aprofundada */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
            {detailedDescription && (
              <div className="mt-8 space-y-4">
                {detailedDescription.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Como Funciona */}
        {howItWorks && howItWorks.length > 0 && (
          <section className="py-20 gradient-surface">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-14">
                <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Passo a Passo</span>
                <h2 className="mt-3">Como Funciona o {title}</h2>
              </div>
              <div className="space-y-6">
                {howItWorks.map((step, i) => (
                  <div key={i} className="premium-card p-6 flex gap-5 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Coberturas */}
        <section className={`py-20 ${howItWorks ? '' : 'gradient-surface'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Coberturas</span>
              <h2 className="mt-3">O que este seguro cobre</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {coverages.map((c, i) => (
                <div key={i} className="premium-card p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">{c.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O Que Não É Coberto */}
        {coverageExclusions && coverageExclusions.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0" />
                <h2 className="text-xl font-semibold">O que geralmente NÃO é coberto</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">É importante conhecer as exclusões para evitar surpresas. Confira os itens mais comuns que ficam fora da cobertura padrão:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {coverageExclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-destructive/5 border border-destructive/10 rounded-xl p-4">
                    <span className="text-destructive font-bold text-sm mt-0.5">✕</span>
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Quanto Custa */}
        {pricingInfo && (
          <section className="py-20 gradient-surface">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="text-center mb-10">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
                <h2>Quanto custa o {title}?</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">{pricingInfo.intro}</p>
              <div className="premium-card p-6">
                <h3 className="text-base font-semibold mb-4">Fatores que influenciam o preço:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {pricingInfo.factors.map((factor, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{factor}</p>
                    </div>
                  ))}
                </div>
                {pricingInfo.note && (
                  <div className="mt-6 pt-5 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">{pricingInfo.note}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Cenários Reais */}
        {realScenarios && realScenarios.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="text-center mb-14">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
                <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Exemplos Práticos</span>
                <h2 className="mt-3">Situações Reais que o Seguro Resolve</h2>
              </div>
              <div className="space-y-4">
                {realScenarios.map((scenario, i) => (
                  <div key={i} className="premium-card p-6">
                    <h3 className="text-base font-semibold mb-2">{scenario.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{scenario.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Informações Importantes */}
        {importantDetails && importantDetails.length > 0 && (
          <section className="py-20 gradient-surface">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="text-center mb-14">
                <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Aprofundamento</span>
                <h2 className="mt-3">O que você precisa saber</h2>
              </div>
              <div className="space-y-8">
                {importantDetails.map((detail, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold mb-3">{detail.title}</h3>
                    <div className="space-y-3">
                      {detail.content.split('\n\n').map((p, j) => (
                        <p key={j} className="text-muted-foreground leading-relaxed">{p}</p>
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
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <Lightbulb className="h-6 w-6 text-primary flex-shrink-0" />
                <h2 className="text-xl font-semibold">Dicas da Patro para Economizar</h2>
              </div>
              <div className="space-y-3">
                {tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 bg-primary/5 border border-primary/10 rounded-xl p-4">
                    <span className="text-primary font-bold text-sm mt-0.5">{i + 1}.</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Quem Precisa */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="mb-8">Quem precisa deste seguro?</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {whoNeeds.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-muted rounded-xl p-4">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Por que Patro */}
        <section className="py-20 bg-primary-light">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-14">
              <h2>Por que contratar com a Patro?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {whyPatro.map((reason, i) => (
                <div key={i} className="flex items-start gap-3 bg-card rounded-xl p-5 border">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(215,100%,60%,0.2),transparent_70%)]" />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-4">Solicite sua cotação agora</h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">Resposta em até 2 horas com as melhores opções do mercado</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/cotacao">
                <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8">Pedir Cotação</Button>
              </Link>
              <a href="tel:1151997500">
                <Button size="lg" className="rounded-xl h-12 px-8 bg-white/10 border border-white/20 text-white hover:bg-white/20">
                  <Phone className="mr-2 h-4 w-4" /> (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-14">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">FAQ</span>
              <h2 className="mt-3">Perguntas Frequentes</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="premium-card p-5">
                  <h3 className="text-base font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Relacionados */}
        {relatedInsurances.length > 0 && (
          <section className="py-16 gradient-surface">
            <div className="container mx-auto px-4">
              <h2 className="text-center mb-8">Você também pode se interessar</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {relatedInsurances.map((ins, i) => (
                  <Link key={i} to={ins.link}>
                    <Button variant="outline" className="rounded-xl">{ins.title} <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default InsurancePageTemplate;
