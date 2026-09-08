import { Link } from "react-router-dom";
import { MapPin, Building2, Globe2, ArrowRight, MessageCircle, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { EMPRESA, NAP_LINHA_1, NAP_LINHA_2 } from "@/config/empresa";
import { trackWhatsAppClick } from "@/lib/tracking";
import {
  GRANDE_SP_HUB,
  bairrosSaoPauloAuto,
  bairroSpSlugs,
} from "@/data/segurosSaoPauloRegional";

const WHATSAPP_URL =
  "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o.";

const GrandeSaoPaulo = () => {
  const hub = GRANDE_SP_HUB;

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={hub.title}
        description={hub.metaDescription}
        absoluteTitle
      />
      <FAQSchema faqs={hub.faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <Header />
      <Breadcrumb items={[{ label: "Guarulhos e Grande São Paulo" }]} />

      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs font-semibold tracking-widest uppercase opacity-80 mb-3">
              Sede em Guarulhos • Atendimento na Grande São Paulo
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{hub.h1}</h1>
            <p className="text-lg opacity-90 mb-6">{hub.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("grande-sao-paulo-hero")}
                >
                  <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                  Falar com um consultor
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent">
                <a href={`tel:${EMPRESA.telefoneE164}`}>
                  <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                  {EMPRESA.telefone}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-4 text-muted-foreground">
            {hub.intro.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </div>
        </section>

        {/* Camadas territoriais */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Onde a Patro Seguros atende</h2>

            <div className="space-y-6">
              <article className="bg-background rounded-lg p-6 border">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                  {hub.guarulhos.title}
                </h3>
                <p className="text-muted-foreground mb-4">{hub.guarulhos.text}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {hub.guarulhos.links.map((l) => (
                    <li key={l.href}>
                      <Link to={l.href} className="text-primary hover:underline inline-flex items-center gap-1">
                        {l.label}
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="bg-background rounded-lg p-6 border">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />
                  {hub.capital.title}
                </h3>
                <p className="text-muted-foreground mb-4">{hub.capital.text}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {bairroSpSlugs.map((slug) => {
                    const b = bairrosSaoPauloAuto[slug];
                    return (
                      <li key={slug}>
                        <Link to={`/${slug}`} className="text-primary hover:underline inline-flex items-center gap-1">
                          Seguro auto em {b.bairro}
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </article>

              <article className="bg-background rounded-lg p-6 border">
                <h3 className="text-lg font-semibold mb-2">{hub.metropolitana.title}</h3>
                <p className="text-muted-foreground">{hub.metropolitana.text}</p>
              </article>

              <article className="bg-background rounded-lg p-6 border">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <Globe2 className="h-5 w-5 text-primary" aria-hidden="true" />
                  {hub.brasil.title}
                </h3>
                <p className="text-muted-foreground">{hub.brasil.text}</p>
              </article>
            </div>
          </div>
        </section>

        {/* Produtos */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Seguros para pessoas e empresas</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {hub.produtos.map((p) => (
                <Link
                  key={p.href}
                  to={p.href}
                  className="block rounded-lg border p-5 hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sede */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Sede física em Guarulhos</h2>
            <p className="text-muted-foreground mb-4">
              A Patro Seguros tem um único endereço, em Guarulhos. Não mantemos filiais na capital nem em
              outras cidades — o atendimento regional é digital e consultivo.
            </p>
            <address className="not-italic text-sm text-muted-foreground">
              <strong className="block text-foreground">{EMPRESA.nomeFantasia}</strong>
              {NAP_LINHA_1}
              <br />
              {NAP_LINHA_2}
              <br />
              Telefone e WhatsApp: {EMPRESA.telefone}
              <br />
              CNPJ {EMPRESA.cnpj} • SUSEP {EMPRESA.susep}
            </address>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Perguntas frequentes sobre o atendimento regional</h2>
            <div className="space-y-5">
              {hub.faqs.map((f) => (
                <div key={f.question}>
                  <h3 className="font-semibold mb-1">{f.question}</h3>
                  <p className="text-muted-foreground text-sm">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GrandeSaoPaulo;
