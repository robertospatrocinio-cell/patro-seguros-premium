import { Link } from "react-router-dom";
import { CheckCircle, Phone, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Coverage {
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
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
  relatedInsurances?: {
    title: string;
    link: string;
  }[];
}

const InsurancePageTemplate = ({
  title,
  subtitle,
  description,
  icon,
  coverages,
  whoNeeds,
  whyPatro,
  faqs,
  relatedInsurances = [],
}: InsurancePageProps) => {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-6">{icon}</div>
              <h1 className="mb-6">{title}</h1>
              <p className="text-xl text-muted-foreground mb-8">
                {subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cotacao">
                  <Button size="lg">Pedir Cotação Gratuita</Button>
                </Link>
                <a href="https://wa.me/5511519975000" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="cta">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Descrição */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </section>

        {/* Coberturas */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">O Que Este Seguro Cobre</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {coverages.map((coverage, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-2">{coverage.title}</h3>
                        <p className="text-sm text-muted-foreground">{coverage.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quem Precisa */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="mb-8">Quem Precisa Deste Seguro?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {whoNeeds.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Por Que Contratar com a Patro */}
        <section className="py-16 bg-primary-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="mb-8 text-center">Por Que Contratar com a Patro Seguros?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {whyPatro.map((reason, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{reason}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-white">Solicite Sua Cotação Agora</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Resposta em até 2 horas com as melhores opções do mercado
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cotacao">
                <Button size="lg" variant="secondary">Pedir Cotação</Button>
              </Link>
              <a href="tel:1151997500">
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="mr-2 h-5 w-5" />
                  (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-12">Perguntas Frequentes</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seguros Relacionados */}
        {relatedInsurances.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-center mb-8">Você Também Pode Se Interessar</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {relatedInsurances.map((insurance, index) => (
                  <Link key={index} to={insurance.link}>
                    <Button variant="outline">{insurance.title}</Button>
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
