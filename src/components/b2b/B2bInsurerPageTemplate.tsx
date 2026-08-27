import { Link } from "react-router-dom";
import { CheckCircle, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import ExternalLink from "@/components/ExternalLink";
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
  B2bInsurerPage,
  TRANSPARENCY_NOTICE,
  GARANTIA_HUB_PATH,
  CREDITO_HUB_PATH,
  GARANTIA_LOCAL_PATH,
  CREDITO_LOCAL_PATH,
} from "@/data/b2bVertical";

interface Props {
  page: B2bInsurerPage;
}

const B2bInsurerPageTemplate = ({ page }: Props) => {
  const canonicalUrl = `${CANONICAL_BASE_URL}${page.path}`;
  const source = buildInternalLinkSource("landing", `b2b-insurer-${page.slug}`);
  const isGarantia = page.line === "garantia";
  const parentHub = isGarantia ? GARANTIA_HUB_PATH : CREDITO_HUB_PATH;
  const parentLocal = isGarantia ? GARANTIA_LOCAL_PATH : CREDITO_LOCAL_PATH;
  const title = `${page.insurer} ${page.lineLabel} | Cotação pela Patro`;
  const description = `Cotação de ${page.lineLabel} com ${page.insurer} intermediada pela Patro Seguros. Empresas em Guarulhos, São Paulo e todo o Brasil.`;
  const h1 = `${page.lineLabel} ${page.insurer} com atendimento da Patro Seguros`;
  const whatsappOrigem = `b2b_${page.line}_${page.slug}`;
  const whatsappUrl = buildWhatsAppUrl({
    origem: whatsappOrigem,
    extraLines: [
      `Olá, quero cotar ${page.lineLabel} com ${page.insurer} pela Patro Seguros. Podemos avaliar?`,
    ],
  });

  return (
    <>
      <PageMeta title={title} description={description} />
      <FAQSchema faqs={page.faqs} />
      <ServiceSchema
        name={h1}
        serviceType={page.lineLabel}
        description={description}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb
            items={[
              { label: page.lineLabel, href: parentHub },
              { label: `${page.insurer}` },
            ]}
          />
        </div>

        <section className="gradient-hero py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white/90 mb-4">
              {page.lineLabel} • Seguradora parceira
            </span>
            <h1 className="text-white mb-4">{h1}</h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
              {page.intro}
            </p>
            <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick(whatsappOrigem, { insuranceType: page.slug })}
            >
              <Button size="lg" variant="cta" className="text-base px-8">
                <MessageCircle className="mr-2 h-5 w-5" /> Cotar {page.lineLabel}
              </Button>
            </a>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="p-4 border-l-4 border-primary bg-muted rounded text-sm text-muted-foreground mb-8">
              A Patro Seguros é uma corretora/intermediadora. Esta página <strong>não é o site oficial da {page.insurer}</strong>. As marcas pertencem aos seus respectivos titulares. Produtos e condições dependem de aceitação, análise e regras da seguradora.
            </div>
            <h2 className="text-2xl font-bold mb-4">Destaques da atuação</h2>
            <ul className="space-y-2 mb-8">
              {page.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Posicionamento
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{page.positioning}</p>
            <p className="text-sm text-muted-foreground italic">{TRANSPARENCY_NOTICE}</p>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl" data-speakable="faq">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">Perguntas frequentes</h2>
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

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">Veja também</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { to: parentHub, label: page.lineLabel },
                { to: parentLocal, label: `${page.lineLabel} em Guarulhos` },
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
                >
                  <span className="font-medium">{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
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

export default B2bInsurerPageTemplate;