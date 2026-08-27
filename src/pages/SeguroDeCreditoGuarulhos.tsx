import { Link } from "react-router-dom";
import { MapPin, MessageCircle, ArrowRight, Handshake, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import ExternalLink from "@/components/ExternalLink";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import {
  trackWhatsAppClick,
  trackInternalLinkClick,
  buildInternalLinkSource,
} from "@/lib/tracking";
import {
  CREDITO_HUB_PATH,
  CREDITO_LOCAL_PATH,
  CREDITO_HUB_FAQS,
  CREDITO_INTENT_PAGES,
  B2B_INSURERS_CREDITO,
  TRANSPARENCY_NOTICE,
} from "@/data/b2bVertical";

const SeguroDeCreditoGuarulhos = () => {
  const canonicalUrl = `${CANONICAL_BASE_URL}${CREDITO_LOCAL_PATH}`;
  const source = buildInternalLinkSource("landing", "b2b-credito-guarulhos");
  const whatsappUrl = buildWhatsAppUrl({
    origem: "b2b_credito_guarulhos",
    extraLines: [
      "Olá, sou empresa em Guarulhos/SP e quero avaliar Seguro de Crédito para vendas a prazo.",
    ],
  });

  return (
    <>
      <PageMeta
        title="Seguro de Crédito em Guarulhos e SP | Patro Seguros"
        description="Seguro de Crédito em Guarulhos para indústrias, distribuidores, importadoras, exportadoras e empresas que vendem a prazo. Cotação com a Patro."
      />
      <FAQSchema faqs={CREDITO_HUB_FAQS} />
      <ServiceSchema
        name="Seguro de Crédito em Guarulhos e São Paulo"
        serviceType="Seguro de Crédito"
        description="Seguro de Crédito em Guarulhos, SP e região metropolitana — intermediação pela Patro Seguros."
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb
            items={[
              { label: "Seguro de Crédito", href: CREDITO_HUB_PATH },
              { label: "Guarulhos" },
            ]}
          />
        </div>

        <section className="gradient-hero py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white/90 mb-4">
              <MapPin className="h-3 w-3" /> Guarulhos / SP
            </span>
            <h1 className="text-white mb-4">Seguro de Crédito em Guarulhos e São Paulo</h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
              Guarulhos é um polo estratégico para indústrias, logística, distribuição, comércio B2B e empresas que vendem a prazo. A Patro Seguros atende empresas da região que desejam reduzir riscos de inadimplência e proteger o fluxo de caixa com Seguro de Crédito.
            </p>
            <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick("b2b_credito_guarulhos")}
            >
              <Button size="lg" variant="cta" className="text-base px-8">
                <MessageCircle className="mr-2 h-5 w-5" /> Falar com especialista B2B
              </Button>
            </ExternalLink>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Por que Seguro de Crédito faz sentido em Guarulhos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A concentração de indústrias, operadores logísticos e distribuidores em Guarulhos e no entorno do aeroporto de Cumbica gera vendas B2B com prazos relevantes. Uma sequência de defaults compromete rapidamente margem e caixa. O Seguro de Crédito estrutura limites por cliente PJ e cobre inadimplência dentro dos limites contratados.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A Patro Seguros atende empresas de Guarulhos, Cumbica, Cidade Maia, Centro, Vila Galvão, Bonsucesso, Pimentas, Arujá, Itaquaquecetuba, São Paulo e região metropolitana.
            </p>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">Perfis atendidos</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CREDITO_INTENT_PAGES.map((p) => (
                <Link
                  key={p.slug}
                  to={p.path}
                  onClick={() =>
                    trackInternalLinkClick({
                      placement: "hub-grid",
                      source,
                      destination: p.path,
                      label: p.h1,
                    })
                  }
                  className="p-4 bg-white border rounded-lg hover:border-primary/60 transition"
                >
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <Handshake className="h-4 w-4" />
                    <span className="text-xs uppercase font-bold">{p.navLabel}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{p.h1}</h3>
                  <span className="text-xs text-primary">Ver página <ArrowRight className="inline h-3 w-3" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Seguradoras parceiras</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {B2B_INSURERS_CREDITO.map((i) => (
                <span key={i} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                  {i}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic">
              A disponibilidade de seguradoras pode variar conforme apetite de risco, faturamento, carteira de clientes e análise técnica. {TRANSPARENCY_NOTICE}
            </p>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-4">O que ganha a empresa da região</h2>
            <ul className="grid gap-3 sm:grid-cols-2 text-sm">
              {[
                "Análise técnica da carteira de clientes PJ",
                "Estrutura de limites por cliente",
                "Proteção contra inadimplência prolongada dentro dos limites",
                "Atendimento consultivo local em Guarulhos",
                "Comparação entre seguradoras parceiras",
                "Apoio nas renovações e ajustes de limite",
              ].map((r) => (
                <li key={r} className="flex items-start gap-2 p-3 bg-white border rounded">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14" data-speakable="faq">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">Perguntas frequentes</h2>
            <div className="space-y-6">
              {CREDITO_HUB_FAQS.map((f) => (
                <div key={f.question}>
                  <h3 className="text-lg font-semibold mb-2">{f.question}</h3>
                  <p className="text-muted-foreground">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 text-center bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Avaliar Seguro de Crédito para sua empresa</h2>
            <p className="text-muted-foreground mb-6">
              Envie uma amostra da sua carteira PJ. Comparamos propostas de seguradoras parceiras.
            </p>
            <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick("b2b_credito_guarulhos_cta_final")}
            >
              <Button size="lg" variant="cta" className="text-base px-8">
                <MessageCircle className="mr-2 h-5 w-5" /> Falar no WhatsApp
              </Button>
            </ExternalLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SeguroDeCreditoGuarulhos;