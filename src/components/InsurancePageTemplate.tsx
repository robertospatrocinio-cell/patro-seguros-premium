import { Link } from "react-router-dom";
import { CheckCircle, Phone, MessageCircle, ArrowRight, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

interface Coverage { title: string; description: string; }
interface FAQ { question: string; answer: string; }

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
}

const InsurancePageTemplate = ({
  title, subtitle, description, icon,
  coverages, whoNeeds, whyPatro, faqs,
  relatedInsurances = [],
  badge,
}: InsurancePageProps) => {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsla(215,100%,60%,0.15),transparent_60%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="py-20 md:py-28 max-w-3xl mx-auto text-center">
              <div className="text-5xl mb-6 animate-fade-up">{icon}</div>
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

        {/* Descrição */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </section>

        {/* Coberturas */}
        <section className="py-20 gradient-surface">
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
                      <p className="text-sm text-muted-foreground">{c.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
