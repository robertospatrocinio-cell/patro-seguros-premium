import { Link } from "react-router-dom";
import { MapPin, MessageCircle, ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";
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
  GARANTIA_HUB_PATH,
  GARANTIA_LOCAL_PATH,
  GARANTIA_HUB_FAQS,
  GARANTIA_INTENT_PAGES,
  B2B_INSURERS_GARANTIA,
  TRANSPARENCY_NOTICE,
} from "@/data/b2bVertical";

const BAIRROS = [
  "Cumbica",
  "Cidade Maia",
  "Centro",
  "Vila Galvão",
  "Bonsucesso",
  "Pimentas",
  "Macedo",
  "Gopoúva",
  "Taboão",
  "Vila Augusta",
];

const CIDADES = ["Arujá", "Itaquaquecetuba", "São Paulo (capital)", "Região metropolitana de SP"];

const SeguroGarantiaGuarulhos = () => {
  const canonicalUrl = `${CANONICAL_BASE_URL}${GARANTIA_LOCAL_PATH}`;
  const source = buildInternalLinkSource("landing", "b2b-garantia-guarulhos");
  const whatsappUrl = buildWhatsAppUrl({
    origem: "b2b_garantia_guarulhos",
    extraLines: [
      "Olá, sou de Guarulhos/SP e quero cotar Seguro Garantia. Posso enviar edital ou contrato para análise?",
    ],
  });

  return (
    <>
      <PageMeta
        title="Seguro Garantia em Guarulhos | Licitações e Contratos | Patro"
        description="Seguro Garantia em Guarulhos para empresas, construtoras, fornecedores e prestadores de serviço. Cotação com seguradoras parceiras pela Patro."
      />
      <FAQSchema faqs={GARANTIA_HUB_FAQS} />
      <ServiceSchema
        name="Seguro Garantia em Guarulhos"
        serviceType="Seguro Garantia"
        description="Seguro Garantia em Guarulhos e região para empresas com contratos, licitações e obrigações — intermediação pela Patro Seguros."
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb
            items={[
              { label: "Seguro Garantia", href: GARANTIA_HUB_PATH },
              { label: "Guarulhos" },
            ]}
          />
        </div>

        <section className="gradient-hero py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white/90 mb-4">
              <MapPin className="h-3 w-3" /> Guarulhos / SP
            </span>
            <h1 className="text-white mb-4">Seguro Garantia em Guarulhos</h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
              A Patro Seguros atende empresas de Guarulhos, Cumbica, Cidade Maia, Centro, Vila Galvão, Bonsucesso, Pimentas, Arujá, Itaquaquecetuba, São Paulo e região metropolitana que precisam de Seguro Garantia para contratos, licitações e obrigações empresariais.
            </p>
            <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick("b2b_garantia_guarulhos")}
            >
              <Button size="lg" variant="cta" className="text-base px-8">
                <MessageCircle className="mr-2 h-5 w-5" /> Cotar Seguro Garantia
              </Button>
            </a>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Guarulhos: polo logístico, industrial e de serviços</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Guarulhos concentra indústrias, transportadoras, operadores logísticos e empresas que participam de licitações públicas e privadas — em grande parte pela proximidade com o aeroporto de Cumbica e com a região metropolitana. Essa base empresarial usa muito Seguro Garantia em contratos de fornecimento, obras, prestação de serviços e concorrências.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A Patro Seguros é sediada em Guarulhos e atende empresas locais e de outras cidades com cotação consultiva de Seguro Garantia junto às seguradoras parceiras.
            </p>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-4">Regiões atendidas</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-bold mb-2">Bairros de Guarulhos</h3>
                <div className="flex flex-wrap gap-2">
                  {BAIRROS.map((b) => (
                    <span key={b} className="text-xs px-3 py-1 bg-white border rounded-full">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Cidades vizinhas</h3>
                <div className="flex flex-wrap gap-2">
                  {CIDADES.map((c) => (
                    <span key={c} className="text-xs px-3 py-1 bg-white border rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">Modalidades usadas por empresas da região</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GARANTIA_INTENT_PAGES.map((p) => (
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
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-xs uppercase font-bold">{p.navLabel}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{p.h1}</h3>
                  <span className="text-xs text-primary">Ver página <ArrowRight className="inline h-3 w-3" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Seguradoras parceiras</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {B2B_INSURERS_GARANTIA.map((i) => (
                <span key={i} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                  {i}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic">{TRANSPARENCY_NOTICE}</p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-4">Por que empresas em Guarulhos escolhem a Patro</h2>
            <ul className="grid gap-3 sm:grid-cols-2 text-sm">
              {[
                "Corretora sediada em Guarulhos, atendimento local e presencial",
                "Atuação nacional para grupos e filiais fora da região",
                "Análise consultiva de edital, contrato e cadastro",
                "Cotação simultânea com múltiplas seguradoras parceiras",
                "Apoio pós-emissão para endossos e renovação",
                "Sem custo para a empresa contratante",
              ].map((r) => (
                <li key={r} className="flex items-start gap-2 p-3 bg-muted rounded">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl" data-speakable="faq">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">Perguntas frequentes</h2>
            <div className="space-y-6">
              {GARANTIA_HUB_FAQS.map((f) => (
                <div key={f.question}>
                  <h3 className="text-lg font-semibold mb-2">{f.question}</h3>
                  <p className="text-muted-foreground">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Sua empresa é de Guarulhos ou região?</h2>
            <p className="text-muted-foreground mb-6">
              Envie o edital ou contrato e receba propostas comparadas de seguradoras parceiras em Seguro Garantia.
            </p>
            <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick("b2b_garantia_guarulhos_cta_final")}
            >
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

export default SeguroGarantiaGuarulhos;