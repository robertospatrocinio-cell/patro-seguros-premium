import { Link } from "react-router-dom";
import { CheckCircle, MessageCircle, ArrowRight, Users } from "lucide-react";
import Header from "@/components/Header";
import ExternalLink from "@/components/ExternalLink";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceSchema from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { trackWhatsAppClick, trackInternalLinkClick, buildInternalLinkSource } from "@/lib/tracking";
import {
  HUB_PATH,
  SAUDE_OPERADORAS,
  SAUDE_SUBTYPES,
  type SaudeSubtype,
} from "@/data/saudeVertical";

interface Props {
  subtype: SaudeSubtype;
}

const SaudeSubPageTemplate = ({ subtype }: Props) => {
  const { seo, sections, faqs, whatsapp, cta, relatedOperadoras } = subtype;
  const whatsappUrl = buildWhatsAppUrl({
    origem: whatsapp.origem,
    extraLines: [whatsapp.extraLine],
  });
  const canonicalUrl = `${CANONICAL_BASE_URL}${subtype.path}`;
  const source = buildInternalLinkSource("landing", `saude-${subtype.slug}`);
  const otherSubtypes = SAUDE_SUBTYPES.filter((s) => s.slug !== subtype.slug).slice(0, 4);
  const operadoras = relatedOperadoras
    .map((slug) => SAUDE_OPERADORAS.find((o) => o.slug === slug))
    .filter((o): o is (typeof SAUDE_OPERADORAS)[number] => Boolean(o));

  return (
    <>
      <PageMeta title={seo.title} description={seo.description} />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: CANONICAL_BASE_URL },
          { name: "Planos de Saúde", url: `${CANONICAL_BASE_URL}${HUB_PATH}` },
          { name: subtype.label, url: canonicalUrl },
        ]}
      />
      <ServiceSchema
        name={seo.h1}
        serviceType={seo.serviceType}
        description={seo.description}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb
            items={[
              { label: "Planos de Saúde", href: HUB_PATH },
              { label: subtype.label },
            ]}
          />
        </div>

        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white/90 mb-4">
              {subtype.audience}
            </span>
            <h1 className="text-white mb-4">{seo.h1}</h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {seo.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={HUB_PATH}>
                <Button size="lg" className="text-base px-6">
                  {cta.primary} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <ExternalLink href={whatsappUrl} onClick={() =>
                  trackWhatsAppClick(whatsapp.origem, { insuranceType: subtype.slug })
                }
              >
                <Button size="lg" variant="cta" className="text-base px-6">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {cta.secondary}
                </Button>
              </ExternalLink>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground">{sections.intro}</p>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 grid gap-10 md:grid-cols-2 max-w-5xl">
            <div>
              <h2 className="text-2xl font-bold mb-4">Para quem é indicado</h2>
              <ul className="space-y-3">
                {sections.forWhom.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Como a Patro ajuda</h2>
              <ul className="space-y-3">
                {sections.howPatroHelps.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">O que comparar antes de contratar</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {sections.whatToCompare.map((it) => (
                <div key={it} className="p-4 bg-white rounded-lg border shadow-sm text-sm">
                  {it}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-4">
              {sections.localNote}
            </p>
          </div>
        </section>

        {operadoras.length > 0 && (
          <section className="py-14 bg-muted">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-bold mb-6">Operadoras relacionadas</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {operadoras.map((op) => (
                  <Link
                    key={op.slug}
                    to={op.path}
                    onClick={() =>
                      trackInternalLinkClick({
                        placement: "saude_subpage_operadoras",
                        source,
                        destination: op.path,
                        label: op.name,
                      })
                    }
                    className="block p-5 bg-white rounded-lg border hover:border-primary/60 transition-colors"
                  >
                    <h3 className="font-bold mb-1">{op.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {op.shortDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium">
                      Ver opções <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl" data-speakable="faq">
            <h2 id="faq-heading" className="text-center mb-10 text-2xl font-bold">
              Perguntas frequentes
            </h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.question}>
                  <h3 className="text-lg font-semibold mb-2">{f.question}</h3>
                  <p className="text-muted-foreground">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> Veja também
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                to={HUB_PATH}
                onClick={() =>
                  trackInternalLinkClick({
                    placement: "saude_subpage_veja_tambem",
                    source,
                    destination: HUB_PATH,
                    label: "Hub Planos de Saúde",
                  })
                }
                className="p-4 border rounded-lg hover:border-primary/60 flex items-center justify-between text-sm"
              >
                <span>Hub: Plano de Saúde em Guarulhos</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              {otherSubtypes.map((s) => (
                <Link
                  key={s.slug}
                  to={s.path}
                  onClick={() =>
                    trackInternalLinkClick({
                      placement: "saude_subpage_veja_tambem",
                      source,
                      destination: s.path,
                      label: s.cardTitle,
                    })
                  }
                  className="p-4 border rounded-lg hover:border-primary/60 flex items-center justify-between text-sm"
                >
                  <span>{s.cardTitle}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SaudeSubPageTemplate;