import { Link } from "react-router-dom";
import {
  CheckCircle,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
} from "lucide-react";
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
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import {
  B2bIntentPage,
  TRANSPARENCY_NOTICE,
  GARANTIA_HUB_PATH,
  GARANTIA_LOCAL_PATH,
  CREDITO_HUB_PATH,
  CREDITO_LOCAL_PATH,
  GARANTIA_INTENT_PAGES,
  CREDITO_INTENT_PAGES,
} from "@/data/b2bVertical";

interface Props {
  page: B2bIntentPage;
}

const B2bIntentPageTemplate = ({ page }: Props) => {
  const canonicalUrl = `${CANONICAL_BASE_URL}${page.path}`;
  const source = buildInternalLinkSource("landing", `b2b-${page.slug}`);
  const isGarantia = page.line === "garantia";
  const parentHub = isGarantia ? GARANTIA_HUB_PATH : CREDITO_HUB_PATH;
  const parentLocal = isGarantia ? GARANTIA_LOCAL_PATH : CREDITO_LOCAL_PATH;
  const parentLabel = isGarantia ? "Seguro Garantia" : "Seguro de Crédito";
  const parentLocalLabel = isGarantia
    ? "Seguro Garantia em Guarulhos"
    : "Seguro de Crédito em Guarulhos";
  const siblings = (isGarantia ? GARANTIA_INTENT_PAGES : CREDITO_INTENT_PAGES).filter(
    (p) => p.slug !== page.slug,
  );

  const whatsappUrl = buildWhatsAppUrl({
    origem: page.whatsappOrigem,
    extraLines: [page.whatsappMessage],
  });

  return (
    <>
      <PageMeta title={page.title} description={page.metaDescription} />
      <FAQSchema faqs={page.faqs} />
      <ServiceSchema
        name={page.h1}
        serviceType={parentLabel}
        description={page.metaDescription}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb
            items={[
              { label: parentLabel, href: parentHub },
              { label: page.navLabel },
            ]}
          />
        </div>

        <section className="gradient-hero py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white/90 mb-4">
              {parentLabel} • Empresas
            </span>
            <h1 className="text-white mb-4">{page.h1}</h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
              {page.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(page.whatsappOrigem, { insuranceType: page.slug })}>
                <Button size="lg" variant="cta" className="text-base px-6">
                  <MessageCircle className="mr-2 h-5 w-5" /> Falar com especialista B2B
                </Button>
              </a>
              <Link
                to={parentHub}
                onClick={() =>
                  trackInternalLinkClick({
                    placement: "cta-block",
                    source,
                    destination: parentHub,
                    label: `Voltar ao hub de ${parentLabel}`,
                  })
                }
                <Button size="lg" variant="outline" className="text-base px-6 bg-white/10 border-white/40 text-white hover:bg-white/20">
                  Voltar ao hub <ArrowRight className="ml-2 h-5 w-5" />
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
                <Building2 className="h-6 w-6 text-primary" /> Ideal para
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
                <ShieldCheck className="h-6 w-6 text-primary" /> Cobertura e uso
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
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Como cotar com a Patro Seguros</h2>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
              {[
                "Envie edital, contrato ou informações da operação.",
                "Analisamos o caso e submetemos a múltiplas seguradoras parceiras.",
                "Comparamos taxas, prazos e condições para a sua empresa.",
                "Você escolhe a melhor proposta e nós apoiamos a emissão.",
              ].map((step, i) => (
                <li key={step} className="p-4 bg-white border rounded-lg">
                  <span className="text-xs uppercase font-bold text-primary">Passo {i + 1}</span>
                  <p className="mt-1">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 p-4 bg-white border-l-4 border-primary rounded text-sm text-muted-foreground">
              {TRANSPARENCY_NOTICE}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl" data-speakable="faq">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
              Perguntas frequentes
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
            <h2 className="text-2xl font-bold mb-6">Veja também</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { to: parentHub, label: parentLabel },
                { to: parentLocal, label: parentLocalLabel },
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
                  className="p-4 bg-white border rounded-lg hover:border-primary/60 transition flex items-center justify-between text-sm"
                  <span className="font-medium">{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Quer avaliar essa modalidade para sua empresa?</h2>
            <p className="text-muted-foreground mb-6">
              Envie o contrato, edital ou detalhes da operação. A Patro Seguros analisa e traz propostas comparadas de seguradoras parceiras.
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

export default B2bIntentPageTemplate;