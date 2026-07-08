import { Fragment, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import SpeakableSchema from "@/components/SpeakableSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  User,
} from "lucide-react";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { formatDate, getArticlesByCategory } from "@/lib/blogData";
import { getArticleImage, getArticleImageAlt } from "@/lib/blogImages";
import { getBlogCluster } from "@/data/blogClusters";

const WHATSAPP_BASE = "https://wa.me/551151997500?text=";

const BlogCluster = () => {
  const { cluster } = useParams<{ cluster: string }>();
  const config = getBlogCluster(cluster);

  if (!config) return <Navigate to="/blog" replace />;

  const articles = useMemo(
    () => getArticlesByCategory(config.categoryFilter)
      .sort((a, b) => b.date.localeCompare(a.date)),
    [config.categoryFilter],
  );

  const clusterUrl = `${CANONICAL_BASE_URL}/blog/cluster/${config.slug}`;
  const whatsappUrl = `${WHATSAPP_BASE}${config.whatsappText}`;

  const collectionSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${clusterUrl}#collection`,
    name: config.title,
    description: config.metaDescription,
    url: clusterUrl,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${CANONICAL_BASE_URL}/#website` },
    about: [
      { "@type": "Thing", name: config.title },
      { "@type": "Place", name: "Guarulhos, SP" },
    ],
    publisher: { "@id": `${CANONICAL_BASE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      name: `Artigos — ${config.title}`,
      numberOfItems: articles.length,
      itemListElement: articles.slice(0, 20).map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${CANONICAL_BASE_URL}/artigos/${a.slug}`,
        name: a.title,
      })),
    },
  }), [articles, clusterUrl, config]);

  const featured = articles[0];

  return (
    <Fragment>
      <PageMeta
        title={config.metaTitle}
        description={config.metaDescription}
        canonicalPath={`/blog/cluster/${config.slug}`}
        ogType="website"
        ogImage={featured ? `${CANONICAL_BASE_URL}${getArticleImage(featured.slug)}` : undefined}
        ogImageAlt={featured ? `${config.title} — ${featured.title}` : config.title}
      />
      <SpeakableSchema url={clusterUrl} />
      <FAQSchema faqs={config.faqs.map(f => ({ question: f.question, answer: f.answer }))} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>
      <Header />
      <main id="main-content" className="outline-none">
        <Breadcrumb
          items={[
            { label: "Blog", href: "/blog" },
            { label: config.title },
          ]}
        />

        {/* Hero */}
        <section className="gradient-hero py-14 md:py-20" aria-labelledby="cluster-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-3 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {config.eyebrow}
            </p>
            <h1 id="cluster-heading" className="text-white mb-4">{config.h1}</h1>
            <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-3xl">{config.intro}</p>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-3xl mt-4">{config.localAngle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to={config.primaryCTA.href}>
                <Button size="lg" className="rounded-lg h-11 bg-[#B45309] hover:bg-[#9a4708] text-white font-semibold">
                  {config.primaryCTA.label}
                </Button>
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`Falar no WhatsApp sobre ${config.title} — abre em nova aba`}>
                <Button size="lg" variant="outline" className="rounded-lg h-11 bg-white/5 border-white/30 text-white hover:bg-white/15">
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Falar no WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Intent-based sections with CTAs */}
        <section className="py-14 border-b" aria-labelledby="intents-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Por intenção</span>
              <h2 id="intents-heading" className="mt-2 text-2xl md:text-3xl font-semibold">O que você quer resolver hoje?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {config.intentSections.map((sec) => (
                <article key={sec.heading} className="rounded-2xl border bg-card p-6 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2">{sec.heading}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{sec.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {sec.ctas.map((c) => (
                      <Link key={c.href + c.label} to={c.href}>
                        <Button
                          size="sm"
                          variant={c.variant === "primary" ? "default" : "outline"}
                          className={c.variant === "primary" ? "bg-[#B45309] hover:bg-[#9a4708] text-white font-semibold" : ""}
                        >
                          {c.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Articles list */}
        <section id="artigos-lista" className="py-16" aria-labelledby="artigos-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Biblioteca</span>
              <h2 id="artigos-heading" className="mt-2 text-2xl md:text-3xl font-semibold">
                Todos os artigos sobre {config.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {articles.length} {articles.length === 1 ? "guia publicado" : "guias publicados"} pela Patro Seguros.
              </p>
            </div>
            {articles.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">
                Ainda não temos artigos publicados nesta categoria. Fale com um consultor da Patro.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((a, i) => (
                  <Link
                    key={a.slug}
                    to={`/artigos/${a.slug}`}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                  >
                    <Card className="hover:shadow-lg transition-base h-full overflow-hidden group">
                      <div className="aspect-video w-full overflow-hidden">
                        <OptimizedImage
                          src={getArticleImage(a.slug)}
                          alt={getArticleImageAlt(a.slug, a.title)}
                          loading={i < 3 ? "eager" : "lazy"}
                          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{a.category}</span>
                        <h3 className="text-lg font-semibold mt-3 mb-2">{a.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{a.excerpt}</p>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" aria-hidden="true" />
                            <time dateTime={a.date}>{formatDate(a.date)}</time>
                          </span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" />{a.readTime} min</span>
                          <span className="flex items-center gap-1"><User className="h-3 w-3" aria-hidden="true" />{a.author}</span>
                        </div>
                        <span className="text-sm font-semibold text-primary inline-flex items-center">
                          Ler guia completo <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Related commercial pages */}
        <section className="py-14 bg-muted/30 border-y" aria-labelledby="relacionados-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-3">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Serviços da Patro
            </div>
            <h2 id="relacionados-heading" className="text-2xl md:text-3xl font-semibold mb-4">
              Ir direto para a cotação
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
              Depois de ler os guias, vá direto para a página do serviço da Patro Seguros e receba a proposta.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {config.relatedPages.map((p) => (
                <Link
                  key={p.href}
                  to={p.href}
                  className="rounded-xl border bg-background p-4 hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <p className="text-sm font-semibold text-foreground">{p.label}</p>
                  {p.description && (
                    <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                  )}
                  <span className="mt-2 inline-flex items-center text-xs font-semibold text-primary">
                    Abrir página <ArrowRight className="ml-1 h-3 w-3" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">FAQ</span>
              <h2 id="faq-heading" className="mt-2 text-2xl md:text-3xl font-semibold">
                Dúvidas sobre {config.title}
              </h2>
            </div>
            <div className="space-y-4">
              {config.faqs.map((f) => (
                <details key={f.question} className="group rounded-xl border bg-background p-4">
                  <summary className="cursor-pointer list-none font-semibold text-sm md:text-base flex justify-between items-center">
                    <span>{f.question}</span>
                    <span className="text-primary transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-14 bg-muted/30 border-t" aria-labelledby="cta-final-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="rounded-3xl gradient-hero p-8 md:p-10 text-center">
              <h2 id="cta-final-heading" className="text-white text-2xl md:text-3xl font-semibold mb-3">
                Pronto para uma cotação sob medida?
              </h2>
              <p className="text-white/75 text-sm md:text-base max-w-xl mx-auto">
                Nosso time compara seguradoras/operadoras e envia a melhor recomendação em até 24h úteis.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Link to={config.primaryCTA.href}>
                  <Button size="lg" className="rounded-lg bg-[#B45309] hover:bg-[#9a4708] text-white font-semibold">
                    {config.primaryCTA.label}
                  </Button>
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`Falar pelo WhatsApp — abre em nova aba`}>
                  <Button size="lg" variant="outline" className="rounded-lg bg-white/5 border-white/30 text-white hover:bg-white/15">
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Falar no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default BlogCluster;