import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Building2,
  ArrowRight,
  MessageCircle,
  CheckCircle,
  FileText,
  Handshake,
} from "lucide-react";
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
  B2B_HUB_PATH,
  B2B_HUB_FAQS,
  GARANTIA_HUB_PATH,
  GARANTIA_LOCAL_PATH,
  CREDITO_HUB_PATH,
  CREDITO_LOCAL_PATH,
  GARANTIA_INTENT_PAGES,
  CREDITO_INTENT_PAGES,
  B2B_INSURERS_GARANTIA,
  B2B_INSURERS_CREDITO,
  TRANSPARENCY_NOTICE,
} from "@/data/b2bVertical";

const SegurosEmpresariaisEspecializados = () => {
  const canonicalUrl = `${CANONICAL_BASE_URL}${B2B_HUB_PATH}`;
  const source = buildInternalLinkSource("hub", "b2b-especializados");
  const whatsappUrl = buildWhatsAppUrl({
    origem: "b2b_hub_especializados",
    extraLines: [
      "Olá, quero falar com um especialista B2B da Patro Seguros sobre Seguro Garantia ou Seguro de Crédito.",
    ],
  });

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonicalUrl}#produtos`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: `${CANONICAL_BASE_URL}${GARANTIA_HUB_PATH}`,
        name: "Seguro Garantia",
      },
      {
        "@type": "ListItem",
        position: 2,
        url: `${CANONICAL_BASE_URL}${CREDITO_HUB_PATH}`,
        name: "Seguro de Crédito",
      },
    ],
  };

  return (
    <>
      <PageMeta
        title="Seguros Empresariais Especializados | Garantia e Crédito | Patro Seguros"
        description="Seguro Garantia e Seguro de Crédito para empresas em Guarulhos, São Paulo e todo o Brasil. Cotação com Pottencial, Junto, Porto, Tokio, Akad, Ezze e Allianz."
      />
      <FAQSchema faqs={B2B_HUB_FAQS} />
      <ServiceSchema
        name="Seguros Empresariais Especializados"
        serviceType="Seguros Empresariais"
        description="Seguro Garantia e Seguro de Crédito para empresas — intermediação com seguradoras parceiras pela Patro Seguros."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb items={[{ label: "Seguros Empresariais Especializados" }]} />
        </div>

        <section className="gradient-hero py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white/90 mb-4">
              B2B • Empresas em Guarulhos, SP e Brasil
            </span>
            <h1 className="text-white mb-4">
              Seguros empresariais especializados para proteger contratos, vendas e operações
            </h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
              A Patro Seguros ajuda empresas de Guarulhos, São Paulo e todo o Brasil a contratar Seguro Garantia, Seguro de Crédito e soluções B2B com seguradoras parceiras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={GARANTIA_HUB_PATH}
                onClick={() =>
                  trackInternalLinkClick({
                    placement: "cta-block",
                    source,
                    destination: GARANTIA_HUB_PATH,
                    label: "Cotar Seguro Garantia",
                  })
                }
              >
                <Button size="lg" className="text-base px-6">
                  Cotar Seguro Garantia <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link
                to={CREDITO_HUB_PATH}
                onClick={() =>
                  trackInternalLinkClick({
                    placement: "cta-block",
                    source,
                    destination: CREDITO_HUB_PATH,
                    label: "Cotar Seguro de Crédito",
                  })
                }
              >
                <Button size="lg" variant="outline" className="text-base px-6 bg-white/10 border-white/40 text-white hover:bg-white/20">
                  Cotar Seguro de Crédito
                </Button>
              </Link>
              <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick("b2b_hub_especializados")}
              >
                <Button size="lg" variant="cta" className="text-base px-6">
                  <MessageCircle className="mr-2 h-5 w-5" /> Falar com especialista B2B
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">O que são seguros empresariais especializados</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Além dos seguros patrimoniais (galpão, frota, empresarial), existem produtos específicos para proteger obrigações contratuais e recebíveis de vendas a prazo. Seguro Garantia e Seguro de Crédito são os principais nesse grupo — muito usados por indústrias, construtoras, fornecedores, distribuidores e empresas com contratos relevantes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A Patro Seguros estrutura cotações com múltiplas seguradoras parceiras, compara taxas e condições e apoia a empresa em todo o ciclo — cotação, emissão, endossos e renovação.
            </p>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white border rounded-lg">
              <div className="flex items-center gap-2 text-primary mb-2">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-xs uppercase tracking-wider font-bold">Contratos e obrigações</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Seguro Garantia</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Garantia de licitação, contratual, judicial, adiantamento, retenção, execução, construção civil, prestação de serviços e fornecedores.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to={GARANTIA_HUB_PATH}
                  onClick={() =>
                    trackInternalLinkClick({
                      placement: "hub-grid",
                      source,
                      destination: GARANTIA_HUB_PATH,
                      label: "Ver Seguro Garantia",
                    })
                  }
                  className="text-sm text-primary font-medium underline-offset-2 hover:underline"
                >
                  Ver Seguro Garantia →
                </Link>
                <Link
                  to={GARANTIA_LOCAL_PATH}
                  onClick={() =>
                    trackInternalLinkClick({
                      placement: "hub-grid",
                      source,
                      destination: GARANTIA_LOCAL_PATH,
                      label: "Guarulhos e SP",
                    })
                  }
                  className="text-sm text-muted-foreground underline-offset-2 hover:underline"
                >
                  Guarulhos e SP →
                </Link>
              </div>
            </div>
            <div className="p-6 bg-white border rounded-lg">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Handshake className="h-5 w-5" />
                <span className="text-xs uppercase tracking-wider font-bold">Vendas a prazo</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Seguro de Crédito</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Proteção contra inadimplência de clientes PJ para indústrias, distribuidores, atacadistas, importadoras e exportadoras.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to={CREDITO_HUB_PATH}
                  onClick={() =>
                    trackInternalLinkClick({
                      placement: "hub-grid",
                      source,
                      destination: CREDITO_HUB_PATH,
                      label: "Ver Seguro de Crédito",
                    })
                  }
                  className="text-sm text-primary font-medium underline-offset-2 hover:underline"
                >
                  Ver Seguro de Crédito →
                </Link>
                <Link
                  to={CREDITO_LOCAL_PATH}
                  onClick={() =>
                    trackInternalLinkClick({
                      placement: "hub-grid",
                      source,
                      destination: CREDITO_LOCAL_PATH,
                      label: "Guarulhos e SP",
                    })
                  }
                  className="text-sm text-muted-foreground underline-offset-2 hover:underline"
                >
                  Guarulhos e SP →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">Modalidades e páginas dedicadas</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" /> Seguro Garantia
                </h3>
                <ul className="space-y-2">
                  {GARANTIA_INTENT_PAGES.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={p.path}
                        className="text-sm text-primary hover:underline"
                        onClick={() =>
                          trackInternalLinkClick({
                            placement: "hub-grid",
                            source,
                            destination: p.path,
                            label: p.h1,
                          })
                        }
                      >
                        {p.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Handshake className="h-5 w-5 text-primary" /> Seguro de Crédito
                </h3>
                <ul className="space-y-2">
                  {CREDITO_INTENT_PAGES.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={p.path}
                        className="text-sm text-primary hover:underline"
                        onClick={() =>
                          trackInternalLinkClick({
                            placement: "hub-grid",
                            source,
                            destination: p.path,
                            label: p.h1,
                          })
                        }
                      >
                        {p.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-4">Para quais empresas indicamos</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              {[
                "Empresas que participam de licitações",
                "Construtoras e incorporadoras",
                "Prestadores de serviço B2B",
                "Indústrias e fornecedores recorrentes",
                "Transportadoras e operadores logísticos",
                "Distribuidores e atacadistas",
                "Importadoras e exportadoras",
                "Empresas de tecnologia com contratos relevantes",
                "Empresas com departamento jurídico ativo",
              ].map((a) => (
                <div key={a} className="flex items-start gap-2 p-3 bg-white border rounded">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-4">Seguradoras parceiras</h2>
            <p className="text-muted-foreground mb-6">
              Trabalhamos com seguradoras reconhecidas no mercado B2B brasileiro. A disponibilidade e o apetite variam por operação, valor e perfil da empresa.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-bold mb-2">Seguro Garantia</h3>
                <div className="flex flex-wrap gap-2">
                  {B2B_INSURERS_GARANTIA.map((i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Seguro de Crédito</h3>
                <div className="flex flex-wrap gap-2">
                  {B2B_INSURERS_CREDITO.map((i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-muted border-l-4 border-primary rounded text-sm text-muted-foreground">
              {TRANSPARENCY_NOTICE}
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" /> Como funciona a cotação com a Patro
            </h2>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
              {[
                "Você envia o contrato, edital ou perfil da carteira.",
                "Analisamos o caso e submetemos às seguradoras parceiras.",
                "Retornamos com propostas comparadas — taxa, prazo e condições.",
                "Apoiamos a emissão, os endossos e a renovação.",
              ].map((step, i) => (
                <li key={step} className="p-4 bg-white border rounded-lg">
                  <span className="text-xs uppercase font-bold text-primary">Passo {i + 1}</span>
                  <p className="mt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" /> Por que contratar com uma corretora especializada
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 text-sm">
              {[
                "Comparação técnica entre múltiplas seguradoras",
                "Interpretação prática de edital e contrato",
                "Apoio na documentação e nos endossos",
                "Acompanhamento pós-emissão e renovação",
                "Sem custo adicional para a empresa contratante",
                "Base em Guarulhos com atuação nacional",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 p-3 bg-muted rounded">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl" data-speakable="faq">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">Perguntas frequentes</h2>
            <div className="space-y-6">
              {B2B_HUB_FAQS.map((f) => (
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
            <h2 className="text-3xl font-bold mb-4">Fale com um especialista B2B</h2>
            <p className="text-muted-foreground mb-6">
              Envie o contrato, edital ou uma descrição da sua operação. Nós retornamos com uma análise consultiva e propostas comparadas de seguradoras parceiras.
            </p>
            <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick("b2b_hub_especializados_cta_final")}
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

export default SegurosEmpresariaisEspecializados;