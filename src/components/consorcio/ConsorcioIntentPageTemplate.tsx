import { Link } from "react-router-dom";
import { CheckCircle, MessageCircle, ArrowRight, PiggyBank, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import {
  trackWhatsAppClick,
  trackInternalLinkClick,
  buildInternalLinkSource,
} from "@/lib/tracking";
import {
  ConsorcioIntentPage,
  CONSORCIO_HUB_PATH,
  CONSORCIO_LOCAL_PATH,
  CONSORCIO_INTENT_PAGES,
  CONSORCIO_TRANSPARENCY_NOTICE,
  CONSORCIO_PRUDENT_LANGUAGE,
} from "@/data/consorcioVertical";

interface Props {
  page: ConsorcioIntentPage;
}

const ConsorcioIntentPageTemplate = ({ page }: Props) => {
  const source = buildInternalLinkSource("landing", `consorcio-${page.slug}`);
  const siblings = CONSORCIO_INTENT_PAGES.filter((p) => p.slug !== page.slug).slice(0, 6);

  const whatsappUrl = buildWhatsAppUrl({
    origem: page.whatsappOrigem,
    audience: "consorcio",
    extraLines: [page.whatsappMessage],
  });

  return (
    <>
      <PageMeta title={page.title} description={page.metaDescription} />
      <FAQSchema faqs={page.faqs} />
      <ServiceSchema
        name={page.h1}
        serviceType="Consórcio"
        description={page.metaDescription}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb
            items={[
              { label: "Consórcio", href: CONSORCIO_HUB_PATH },
              { label: "Consórcio em Guarulhos", href: CONSORCIO_LOCAL_PATH },
              { label: page.navLabel },
            ]}
          />
        </div>

        <section className="gradient-hero py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white/90 mb-4">
              Consórcio • Guarulhos/SP
            </span>
            <h1 className="text-white mb-4">{page.h1}</h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">{page.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(page.whatsappOrigem, { insuranceType: page.slug })}>
                <Button size="lg" variant="cta" className="text-base px-6">
                  <MessageCircle className="mr-2 h-5 w-5" /> Simular no WhatsApp
                </Button>
              </a>
              <Link
                to={CONSORCIO_LOCAL_PATH}
                onClick={() =>
                  trackInternalLinkClick({
                    placement: "cta-block",
                    source,
                    destination: CONSORCIO_LOCAL_PATH,
                    label: "Hub de Consórcio em Guarulhos",
                  })
                }
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-6 bg-white/10 border-white/40 text-white hover:bg-white/20"
                  Ver todas as modalidades <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg leading-relaxed text-muted-foreground">{page.intro}</p>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" /> Indicado para
              </h2>
              <ul className="space-y-2">
                {page.audience.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <PiggyBank className="h-6 w-6 text-primary" /> O que você precisa saber
              </h2>
              <ul className="space-y-2">
                {page.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl space-y-10">
            {page.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-2xl font-bold mb-3">{s.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
            <div className="p-4 bg-muted border-l-4 border-primary rounded text-sm text-muted-foreground">
              {CONSORCIO_PRUDENT_LANGUAGE}
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Como simular com a Patro Seguros</h2>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
              {[
                "Conte o bem ou serviço desejado e o prazo que você tem em mente.",
                "Comparamos grupos abertos de administradoras autorizadas pelo Banco Central.",
                "Você recebe taxa de administração, prazo, parcela e histórico de contemplações.",
                "Escolhida a opção, acompanhamos a adesão, as assembleias e a estratégia de lance.",
              ].map((step, i) => (
                <li key={step} className="p-4 bg-background border rounded-lg">
                  <span className="text-xs uppercase font-bold text-primary">Passo {i + 1}</span>
                  <p className="mt-1">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 p-4 bg-background border-l-4 border-primary rounded text-sm text-muted-foreground">
              {CONSORCIO_TRANSPARENCY_NOTICE}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl" data-speakable="faq">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
              Perguntas frequentes sobre {page.navLabel.toLowerCase()}
            </h2>
            <div className="space-y-6">
              {page.faqs.map((f) => (
                <div key={f.question}>
                  <h3 className="text-lg font-semibold mb-2">{f.question}</h3>
                  <p className="text-muted-foreground">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">Outras modalidades de consórcio</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { to: CONSORCIO_LOCAL_PATH, label: "Consórcio em Guarulhos" },
                ...siblings.map((s) => ({ to: s.path, label: s.h1 })),
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() =>
                    trackInternalLinkClick({
                      placement: "veja-tambem",
                      source,
                      destination: link.to,
                      label: link.label,
                    })
                  }
                  className="p-4 bg-background border rounded-lg hover:border-primary/60 transition flex items-center justify-between text-sm"
                  <span className="font-medium">{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Quer uma simulação sem compromisso?</h2>
            <p className="text-muted-foreground mb-6">
              Um consultor da Patro Seguros compara administradoras, prazos e taxas e explica o
              regulamento antes de você assinar qualquer coisa.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(page.whatsappOrigem, { insuranceType: `${page.slug}-cta-final` })}>
              <Button size="lg" variant="cta" className="text-base px-8">
                <MessageCircle className="mr-2 h-5 w-5" /> Falar no WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ConsorcioIntentPageTemplate;