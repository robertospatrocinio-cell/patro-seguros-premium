import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/Breadcrumb";
import InsuranceQuoteForm from "@/components/InsuranceQuoteForm";
import { formConfigs } from "@/lib/insuranceFormConfigs";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o.";

const SegurosQuotePage = () => {
  const { tipo } = useParams<{ tipo: string }>();
  const config = tipo ? formConfigs[tipo] : null;

  if (!config) return <Navigate to="/cotacao" replace />;

  return (
    <>
      <PageMeta title={config.metaTitle} description={config.metaDescription} />
      <FAQSchema faqs={config.faqs} />
      <Header />
      <main id="main-content">
        <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Cotação", href: "/cotacao" }, { label: config.type }]} />

        {/* Hero + Form */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start max-w-5xl mx-auto">
              {/* Left: Content */}
              <div className="pt-4">
                <span className="text-4xl mb-4 block" aria-hidden="true">{config.emoji}</span>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">{config.title}</h1>
                <p className="text-muted-foreground text-lg mb-8">{config.subtitle}</p>

                <div className="space-y-4">
                  {config.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-2xl shrink-0" aria-hidden="true">{b.icon}</span>
                      <div>
                        <h3 className="font-semibold text-[15px]">{b.title}</h3>
                        <p className="text-sm text-muted-foreground">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Form */}
              <div className="md:sticky md:top-24">
                <InsuranceQuoteForm config={config} />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {config.faqs.length > 0 && (
          <section className="py-16 md:py-24 gradient-surface" aria-labelledby="faq-quote-heading">
            <div className="container mx-auto px-4 max-w-2xl">
              <h2 id="faq-quote-heading" className="text-2xl font-bold text-center mb-10">Perguntas Frequentes</h2>
              <div className="space-y-4">
                {config.faqs.map((faq, i) => (
                  <details key={i} className="group bg-card rounded-xl border p-0 overflow-hidden">
                    <summary className="cursor-pointer px-5 py-4 font-medium text-[15px] list-none flex items-center justify-between">
                      {faq.question}
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90 shrink-0 ml-2" />
                    </summary>
                    <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Final */}
        <section className="py-16 md:py-20 gradient-hero" aria-label="Contato WhatsApp">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-white text-2xl md:text-3xl font-extrabold mb-4">Prefere falar com um especialista?</h2>
            <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
              Nossa equipe está pronta para atender você via WhatsApp. Resposta em minutos!
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(config.type)}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg h-12 px-8 text-sm">
                <MessageCircle className="mr-2 h-4 w-4" /> Chamar no WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SegurosQuotePage;
