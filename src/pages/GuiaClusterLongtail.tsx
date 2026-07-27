import { Link } from "react-router-dom";
import { ArrowRight, Map, Compass, MessageCircle, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { LONGTAIL_CLUSTERS } from "@/lib/longtailClusters";
import { seoMetadata } from "@/lib/seoMetadata";
import {
  trackInternalLinkClick,
  trackWhatsAppClick,
  buildInternalLinkSource,
} from "@/lib/tracking";

const WHATSAPP_URL =
  "https://wa.me/551151997500?text=Ol%C3%A1%2C%20cheguei%20pelo%20guia%20de%20clusters%20long-tail%20e%20quero%20uma%20cota%C3%A7%C3%A3o.";

const CLUSTER_ORDER: Array<keyof typeof LONGTAIL_CLUSTERS> = [
  "/melhor-seguro-para-uber-guarulhos",
  "/valor-seguro-byd-dolphin",
  "/cotacao-seguro-residencial-online",
  "/planos-de-saude-guarulhos-comparativo",
];

const CLUSTER_TITLES: Record<string, string> = {
  "/melhor-seguro-para-uber-guarulhos":
    "Melhor Seguro para Uber em Guarulhos",
  "/valor-seguro-byd-dolphin": "Valor do Seguro BYD Dolphin",
  "/cotacao-seguro-residencial-online": "Cotação Residencial Online",
  "/planos-de-saude-guarulhos-comparativo":
    "Comparativo de Planos de Saúde em Guarulhos",
};

const CLUSTER_INTRO: Record<string, string> = {
  "/melhor-seguro-para-uber-guarulhos":
    "Ranking Porto, Allianz, HDI e Tokio com cláusula de app obrigatória.",
  "/valor-seguro-byd-dolphin":
    "Faixa real R$ 2.500–4.800/ano em seguradoras que cobrem bateria de tração.",
  "/cotacao-seguro-residencial-online":
    "8 seguradoras cotadas em até 2h para casa, apartamento e condomínio.",
  "/planos-de-saude-guarulhos-comparativo":
    "SulAmérica, Bradesco, Amil e Hapvida lado a lado, com rede em Cidade Maia e Cumbica.",
};

const ANCHOR_LABELS: Record<string, string> = {
  "preco-heading": "Preço",
  "coberturas-heading": "Coberturas",
  "cenarios-heading": "Cenários",
  "detalhes-heading": "Detalhes",
  "faq-heading": "FAQ",
  "formulario-heading": "Cotar",
};

const FAQS = [
  {
    question: "O que é um cluster long-tail de seguros?",
    answer:
      "É um conjunto de páginas especializadas em uma pergunta específica (preço do BYD Dolphin, melhor seguro Uber em Guarulhos, cotação residencial online, comparativo de planos de saúde) que se conectam entre si por âncoras profundas — o leitor pula direto para a seção certa da próxima página, sem reler o hero.",
  },
  {
    question: "Por que usar links âncora entre as páginas?",
    answer:
      "Reduzem o esforço de navegação e reforçam a relevância semântica no Google. Cada âncora (#preco-heading, #coberturas-heading, #faq-heading, #formulario-heading) leva o usuário à seção equivalente da página irmã, transformando o site em um fluxo contínuo de resposta.",
  },
  {
    question: "Como escolher por onde começar?",
    answer:
      "Se você já sabe o produto (Uber, elétrico, residencial ou plano de saúde), entre pelo cluster correspondente. Se está em dúvida, comece pela seção de Preço da página mais próxima do seu perfil — os links âncora conduzem naturalmente para Coberturas, Cenários e Cotação.",
  },
];

const GuiaClusterLongtail = () => {
  const sourceSlug = "guia-cluster-longtail";

  return (
    <>
      <PageMeta
        title="Guia de Clusters Long-tail | Patro Seguros"
        description="Mapa de navegação entre as páginas long-tail da Patro Seguros: Uber, BYD Dolphin, cotação residencial online e planos de saúde em Guarulhos, conectados por âncoras profundas."
        canonicalPath="/guia-cluster-longtail"
      />
      <FAQSchema faqs={FAQS} pageUrl="/guia-cluster-longtail" />
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb
            items={[
              { label: "Início", href: "/" },
              { label: "Guia de Clusters Long-tail" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="py-14 md:py-20 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-wide mb-3">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              Navegação por âncoras
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Guia de Clusters Long-tail — pule direto para a resposta
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
              Cada link deste guia abre uma página long-tail da Patro Seguros
              <strong> já na seção certa</strong>: preço, coberturas, cenários,
              detalhes ou FAQ. Sem reler o hero, sem rolar até achar — vá
              direto ao que responde sua pergunta.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a
                  href="#clusters"
                  onClick={() =>
                    trackInternalLinkClick({
                      destination: "#clusters",
                      source: buildInternalLinkSource(sourceSlug, "hero-cta"),
                      anchor: "clusters",
                    })
                  }
                >
                  Ver os 4 clusters
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick({
                      source: "guia-cluster-longtail-hero",
                    })
                  }
                >
                  <MessageCircle
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Falar com um especialista
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Como usar */}
        <section className="py-12 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-start gap-4 rounded-lg border border-border/60 bg-card p-5">
              <Map
                className="h-6 w-6 text-primary flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div className="text-sm md:text-base text-muted-foreground">
                <p className="font-semibold text-foreground mb-1">
                  Como este guia funciona
                </p>
                <p>
                  Escolha um cluster, pule para a seção (#preço, #coberturas,
                  #cenários, #detalhes, #FAQ) e siga o fluxo — cada página
                  long-tail já tem CTAs internos que levam à próxima seção
                  relevante do cluster.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Clusters */}
        <section id="clusters" className="py-14 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-wide mb-2">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                4 clusters, 5 âncoras por página
              </div>
              <h2 className="text-2xl md:text-4xl font-semibold text-foreground">
                Clusters long-tail conectados
              </h2>
              <p className="mt-2 text-muted-foreground">
                Cada cluster mostra os saltos entre as páginas irmãs — abra o
                link no destino já na seção certa.
              </p>
            </div>

            <div className="space-y-8">
              {CLUSTER_ORDER.map((slug) => {
                const cluster = LONGTAIL_CLUSTERS[slug];
                const meta = seoMetadata[slug as keyof typeof seoMetadata];
                const cardTitle = CLUSTER_TITLES[slug] ?? slug;
                const cardIntro = CLUSTER_INTRO[slug] ?? meta?.description ?? "";

                return (
                  <article
                    key={slug}
                    className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm"
                    aria-labelledby={`cluster-${slug.replace(/\//g, "-")}`}
                  >
                    <header className="mb-5">
                      <h3
                        id={`cluster-${slug.replace(/\//g, "-")}`}
                        className="text-xl md:text-2xl font-semibold text-foreground"
                      >
                        <Link
                          to={slug}
                          className="hover:text-primary transition-colors"
                          onClick={() =>
                            trackInternalLinkClick({
                              destination: slug,
                              source: buildInternalLinkSource(
                                sourceSlug,
                                "cluster-title",
                              ),
                            })
                          }
                        >
                          {cardTitle}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm md:text-base text-muted-foreground">
                        {cardIntro}
                      </p>
                    </header>

                    <p className="text-xs uppercase tracking-wide text-primary/80 font-medium mb-3">
                      {cluster.title}
                    </p>

                    <ul className="grid md:grid-cols-3 gap-3 list-none pl-0">
                      {cluster.items.map((item) => {
                        const hashIndex = item.href.indexOf("#");
                        const anchor =
                          hashIndex >= 0
                            ? item.href.slice(hashIndex + 1)
                            : null;
                        const anchorLabel = anchor
                          ? ANCHOR_LABELS[anchor] ?? anchor
                          : null;
                        return (
                          <li key={item.href}>
                            <Link
                              to={item.href}
                              className="group block h-full rounded-lg border border-border/60 bg-background p-4 hover:border-primary hover:shadow-md transition-all"
                              onClick={() =>
                                trackInternalLinkClick({
                                  destination: item.href,
                                  source: buildInternalLinkSource(
                                    sourceSlug,
                                    `cluster-${slug.replace(/^\//, "")}`,
                                  ),
                                  anchor: anchor ?? undefined,
                                })
                              }
                            >
                              {anchorLabel && (
                                <span className="inline-block text-[10px] uppercase tracking-wide font-semibold text-primary bg-primary/10 rounded px-2 py-0.5 mb-2">
                                  #{anchorLabel}
                                </span>
                              )}
                              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                                {item.title}
                              </p>
                              {item.description && (
                                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                                Abrir na seção
                                <ArrowRight
                                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                                  aria-hidden="true"
                                />
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="py-14 border-t border-border/60"
          aria-labelledby="guia-faq-heading"
        >
          <div className="container mx-auto px-4 max-w-3xl">
            <h2
              id="guia-faq-heading"
              className="text-2xl md:text-3xl font-semibold text-foreground mb-6"
            >
              Perguntas frequentes
            </h2>
            <dl className="space-y-5">
              {FAQS.map((f) => (
                <div
                  key={f.question}
                  className="rounded-lg border border-border/60 bg-card p-5"
                >
                  <dt className="font-semibold text-foreground">
                    {f.question}
                  </dt>
                  <dd className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-14 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Não achou seu caso no guia?
            </h2>
            <p className="mt-3 opacity-90">
              Fale com um especialista da Patro — cotamos com 16+ seguradoras
              e devolvemos o comparativo em até 2h úteis.
            </p>
            <div className="mt-6">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="font-semibold"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick({
                      source: "guia-cluster-longtail-final",
                    })
                  }
                >
                  <MessageCircle
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GuiaClusterLongtail;