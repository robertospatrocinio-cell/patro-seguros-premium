import { useParams, Link } from "react-router-dom";
import { Fragment, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import WebSiteSchema from "@/components/WebSiteSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import ArticleSchema from "@/components/ArticleSchema";
import { getCanonicalUrl, CANONICAL_BASE_URL } from "@/lib/canonical";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ArrowLeft, ArrowRight, Calendar, Clock, User, Check, X, Scale, TrendingDown } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import { getArticleImage } from "@/lib/blogImages";
import OptimizedImage from "@/components/OptimizedImage";
import { getArticleMeta, getRelatedArticles, formatDate } from "@/lib/blogData";
import EbookConsorcioBanner from "@/components/EbookConsorcioBanner";
import { articlesContent } from "@/data/blogArticlesContent";
import { extraFaqsBySlug } from "@/data/blogExtraData";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20blog%20da%20Patro%20Seguros%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";
const BlogFormCTA = lazy(() => import("@/components/BlogFormCTA"));
const StickyQuoteBar = lazy(() => import("@/components/StickyQuoteBar"));

const defaultArticle = {
  title: "Artigo não encontrado",
  content: "O conteúdo solicitado não está disponível no momento.",
  faqs: []
};

const BlogArticle = () => {
  const { slug } = useParams();
  const article = (slug && articlesContent[slug]) || defaultArticle;
  const meta = slug ? getArticleMeta(slug) : undefined;
  const related = slug ? getRelatedArticles(slug, 3) : [];
  const extraFaqBlock = slug ? extraFaqsBySlug[slug] : undefined;
  const allFaqs = [
    ...article.faqs,
    ...(extraFaqBlock?.faqs ?? []),
    ...((extraFaqBlock?.timeline?.stages ?? []).map(s => ({ q: s.faqQ, a: s.faqA }))),
    ...((extraFaqBlock?.comparison?.rows ?? [])
      .filter(r => r.faqQ && r.faqA)
      .map(r => ({ q: r.faqQ as string, a: r.faqA as string }))),
  ];

  return (
    <>
      <PageMeta title={article.title} description={`${article.title} — Leia o artigo completo no blog da Patro Seguros. Dicas e informações sobre seguros para você e sua empresa.`} />
      {allFaqs.length > 0 && (
        <FAQSchema faqs={allFaqs.map(f => ({ question: f.q, answer: f.a }))} />
      )}
      {meta && slug && (() => {
        // Canonical URL uses the www. host to match the <link rel="canonical">
        // emitted by PageMeta, keeping JSON-LD `url`/`@id` consistent across signals.
        const articleUrl = getCanonicalUrl(`/blog/${slug}`);
        const imageUrl = `${CANONICAL_BASE_URL}${getArticleImage(slug)}`;
        const howToSchema = extraFaqBlock?.timeline ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": extraFaqBlock.timeline.title,
          "description": extraFaqBlock.timeline.subtitle ?? extraFaqBlock.timeline.title,
          "inLanguage": "pt-BR",
          "totalTime": "P30D",
          "image": [imageUrl],
          "supply": [
            { "@type": "HowToSupply", "name": "Boletim de Ocorrência (BO)" },
            { "@type": "HowToSupply", "name": "CNH do condutor" },
            { "@type": "HowToSupply", "name": "CRLV do veículo" },
            { "@type": "HowToSupply", "name": "CT-e e nota fiscal da carga" },
            { "@type": "HowToSupply", "name": "Relatório do rastreador" },
            { "@type": "HowToSupply", "name": "Laudo da gerenciadora de risco" },
          ],
          "tool": [
            { "@type": "HowToTool", "name": "Central 24h da seguradora" },
            { "@type": "HowToTool", "name": "Corretor de seguros (Patro Seguros)" },
          ],
          "step": extraFaqBlock.timeline.stages.map((s, i) => ({
            "@type": "HowToStep",
            "position": i + 1,
            "name": s.label,
            "text": `${s.eta}. ${s.bullets.join(". ")}.`,
            "url": `${articleUrl}#etapa-${i + 1}`,
            "itemListElement": s.bullets.map((b, j) => ({
              "@type": "HowToDirection",
              "position": j + 1,
              "text": b,
            })),
          })),
        } : null;
        return (
          <>
            <ArticleSchema
              url={articleUrl}
              headline={article.title}
              description={meta.excerpt}
              image={imageUrl}
              datePublished={meta.date}
              authorName={meta.author}
              category={meta.category}
              tags={meta.tags}
              wordCount={article.content.split(/\s+/).length}
              readTimeMinutes={meta.readTime}
            />
            {howToSchema && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
              />
            )}
            <BreadcrumbSchema
              items={[
                { name: "Início", url: "/" },
                { name: "Blog", url: "/blog" },
                { name: meta.category, url: "/blog" },
                { name: article.title, url: articleUrl },
              ]}
            />
            <WebSiteSchema />
            <OrganizationSchema />
          </>
        );
      })()}
      <Header />
      <main id="main-content">
        <section className="gradient-hero py-16 relative overflow-hidden">
          {slug && (
            <OptimizedImage
              src={getArticleImage(slug)}
              alt=""
              className="absolute inset-0 w-full h-full"
              eager
              placeholderClass="bg-transparent"
              style={{ opacity: 0.2 }}
            />
          )}
          <div className="container mx-auto px-4 max-w-3xl relative z-10">
            <Link to="/blog" className="inline-flex items-center text-sm text-white/60 hover:text-white mb-6">
              <ArrowLeft className="mr-1 h-4 w-4" /> Voltar ao Blog
            </Link>
            <h1 className="text-white mb-4">{article.title}</h1>
            {meta && (
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{meta.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(meta.date)}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{meta.readTime} min de leitura</span>
                <span className="bg-white/10 px-2 py-0.5 rounded text-xs">{meta.category}</span>
              </div>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* CTA persistente — TOPO do post */}
            <div className="mb-10 p-5 md:p-6 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm font-semibold text-primary mb-1">Precisa de uma cotação agora?</p>
                <p className="text-xs text-muted-foreground">Comparamos 16+ seguradoras parceiras. Resposta em até 2h úteis, sem compromisso.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("blog-article-top")}
                  className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebe57] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <Link
                  to="/cotacao"
                  onClick={() => trackCotacaoClick("blog-article-top")}
                  className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Pedir Cotação <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {article.content.split("\n\n").map((p, i) => {
                // Inline CTA block para o post Agrishow 2026
                if (p.trim() === "[[CTA_AGRISHOW]]") {
                  return (
                    <div
                      key={i}
                      className="my-10 p-6 md:p-8 rounded-xl bg-primary text-primary-foreground shadow-elegant"
                    >
                      <div className="text-center">
                        <span className="inline-block bg-[hsl(var(--cta))]/20 text-[hsl(var(--cta))] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                          Semana Agrishow 2026
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">
                          Aproveite as condições especiais em seguro de máquinas agrícolas
                        </h3>
                        <p className="text-primary-foreground/80 text-sm md:text-base mb-6 max-w-xl mx-auto">
                          Cotação prioritária em até 2 horas úteis, comparação entre 6 seguradoras e atendimento em todo o Brasil.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Link to="/cotacao" onClick={() => trackCotacaoClick("blog-agrishow-inline")}>
                            <Button size="lg" variant="cta" className="w-full sm:w-auto font-semibold">
                              Pedir Cotação Agora <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <a
                            href="https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20blog%20da%20Agrishow%202026%20e%20quero%20aproveitar%20as%20condi%C3%A7%C3%B5es%20especiais%20em%20seguro%20de%20m%C3%A1quinas%20agr%C3%ADcolas."
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick("blog-agrishow-inline")}
                          >
                            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold">
                              <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                }
                // Parse markdown-style [text](url) links
                const parts = p.split(/(\[[^\]]+\]\([^)]+\))/g);
                return (
                  <p key={i} className="text-muted-foreground mb-4 whitespace-pre-line">
                    {parts.map((part, j) => {
                      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
                      if (linkMatch) {
                        const [, text, url] = linkMatch;
                        if (url.startsWith("/")) {
                          return <Link key={j} to={url} className="text-primary underline hover:text-primary/80 font-medium">{text}</Link>;
                        }
                        return <a key={j} href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 font-medium">{text}</a>;
                      }
                      return <Fragment key={j}>{part}</Fragment>;
                    })}
                  </p>
                );
              })}
            </div>

            {meta?.category === "Consórcio" && (
              <div className="mt-10">
                <EbookConsorcioBanner variant="compact" />
              </div>
            )}

            {extraFaqBlock && (
              <div className="mt-12 border-t pt-8">
                <h2 className="mb-2">{extraFaqBlock.title}</h2>
                {extraFaqBlock.subtitle && (
                  <p className="text-muted-foreground mb-6">{extraFaqBlock.subtitle}</p>
                )}
                <div className="space-y-5">
                  {extraFaqBlock.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group rounded-lg border border-border bg-card p-4 open:shadow-sm"
                    >
                      <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                        <h3 className="text-base md:text-lg font-semibold text-foreground">
                          {faq.q}
                        </h3>
                        <span className="text-primary text-xl leading-none transition-transform group-open:rotate-45 shrink-0">
                          +
                        </span>
                      </summary>
                      <p className="text-muted-foreground mt-3 text-sm md:text-base">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
                {extraFaqBlock.relatedLink && (
                  <div className="mt-6 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
                      {extraFaqBlock.relatedLink.label}
                    </p>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      <Link
                        to={extraFaqBlock.relatedLink.to}
                        className="hover:underline"
                        onClick={() => trackCotacaoClick("blog-frota-faq-internal-link")}
                      >
                        {extraFaqBlock.relatedLink.anchor} →
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {extraFaqBlock.relatedLink.description}
                    </p>
                    {extraFaqBlock.relatedLink.variations && extraFaqBlock.relatedLink.variations.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-primary/20">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          Veja também (páginas relacionadas)
                        </p>
                        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                          {extraFaqBlock.relatedLink.variations.map((v, i) => (
                            <li key={i}>
                              <Link
                                to={v.to}
                                onClick={() => trackCotacaoClick(v.trackingLabel)}
                                className="text-primary hover:text-primary/80 underline underline-offset-2"
                              >
                                {v.anchor}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {extraFaqBlock?.timeline && (
              <div className="mt-12 border-t pt-8">
                <h2 className="mb-2">{extraFaqBlock.timeline.title}</h2>
                {extraFaqBlock.timeline.subtitle && (
                  <p className="text-muted-foreground mb-6">
                    {extraFaqBlock.timeline.subtitle}
                  </p>
                )}
                <ol className="relative border-l-2 border-primary/30 pl-6 space-y-6">
                  {extraFaqBlock.timeline.stages.map((stage, i) => (
                    <li key={i} id={`etapa-${i + 1}`} className="relative scroll-mt-24">
                      <span className="absolute -left-[34px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                        <Clock className="h-3.5 w-3.5" />
                      </span>
                      <div className="rounded-lg border border-border bg-card p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <h3 className="text-base md:text-lg font-semibold text-foreground">
                            {stage.label}
                          </h3>
                          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                            <Clock className="h-3 w-3" /> {stage.eta}
                          </span>
                        </div>
                        <ul className="space-y-1.5 text-sm md:text-base text-muted-foreground">
                          {stage.bullets.map((b, j) => (
                            <li key={j} className="flex gap-2">
                              <span className="text-primary mt-1 shrink-0">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-muted-foreground mt-4 italic">
                  Prazos baseados em normas SUSEP e prática de mercado. Podem variar conforme seguradora, complexidade do sinistro e completude da documentação.
                </p>
              </div>
            )}

            {extraFaqBlock?.comparison && (
              <div className="mt-12 border-t pt-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Scale className="h-5 w-5" />
                  </span>
                  <h2 className="m-0">{extraFaqBlock.comparison.title}</h2>
                </div>
                {extraFaqBlock.comparison.subtitle && (
                  <p className="text-muted-foreground mb-6">
                    {extraFaqBlock.comparison.subtitle}
                  </p>
                )}

                {/* Tabela comparativa — desktop */}
                <div className="hidden md:block overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/60">
                        <th className="text-left font-semibold p-4 w-1/4 text-foreground">Critério</th>
                        <th className="text-left font-semibold p-4 w-3/8">
                          <span className="inline-flex items-center gap-2 text-destructive">
                            <X className="h-4 w-4" /> {extraFaqBlock.comparison.columns.without}
                          </span>
                        </th>
                        <th className="text-left font-semibold p-4 w-3/8">
                          <span className="inline-flex items-center gap-2 text-primary">
                            <Check className="h-4 w-4" /> {extraFaqBlock.comparison.columns.with}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {extraFaqBlock.comparison.rows.map((row, i) => (
                        <tr key={i} className="border-t border-border align-top">
                          <td className="p-4 font-medium text-foreground">{row.criterion}</td>
                          <td className="p-4 text-muted-foreground">{row.without}</td>
                          <td className="p-4 text-foreground">{row.with}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cards comparativos — mobile */}
                <div className="md:hidden space-y-4">
                  {extraFaqBlock.comparison.rows.map((row, i) => (
                    <div key={i} className="rounded-lg border border-border bg-card p-4">
                      <h3 className="text-base font-semibold text-foreground mb-3">{row.criterion}</h3>
                      <div className="space-y-3">
                        <div className="rounded-md bg-destructive/5 border border-destructive/15 p-3">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-destructive mb-1.5">
                            <X className="h-3.5 w-3.5" /> {extraFaqBlock.comparison!.columns.without}
                          </div>
                          <p className="text-sm text-muted-foreground">{row.without}</p>
                        </div>
                        <div className="rounded-md bg-primary/5 border border-primary/15 p-3">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                            <Check className="h-3.5 w-3.5" /> {extraFaqBlock.comparison!.columns.with}
                          </div>
                          <p className="text-sm text-foreground">{row.with}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Exemplos práticos */}
                {extraFaqBlock.comparison.examples && extraFaqBlock.comparison.examples.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-primary" />
                      Exemplos práticos: quanto a família economiza
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">
                      Cenários reais de famílias atendidas pela Patro Seguros (valores e nomes alterados para preservar privacidade).
                    </p>
                    <div className="grid gap-4 md:grid-cols-3">
                      {extraFaqBlock.comparison.examples.map((ex, i) => (
                        <div key={i} className="rounded-xl border border-border bg-card p-5 flex flex-col">
                          <h4 className="text-base font-semibold text-foreground mb-2">{ex.title}</h4>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 mt-2">Patrimônio</p>
                          <p className="text-sm mb-3">{ex.patrimony}</p>
                          <p className="text-xs uppercase tracking-wider text-destructive flex items-center gap-1.5 mb-1 mt-2">
                            <X className="h-3.5 w-3.5" /> Sem seguro
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">{ex.withoutInsurance}</p>
                          <p className="text-xs uppercase tracking-wider text-primary flex items-center gap-1.5 mb-1 mt-2">
                            <Check className="h-3.5 w-3.5" /> Com seguro
                          </p>
                          <p className="text-sm mb-4">{ex.withInsurance}</p>
                          <div className="mt-auto pt-3 border-t border-border">
                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Resultado</p>
                            <p className="text-sm font-semibold text-primary">{ex.saved}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {extraFaqBlock.comparison.footnote && (
                  <p className="text-xs text-muted-foreground mt-5 italic">
                    {extraFaqBlock.comparison.footnote}
                  </p>
                )}
              </div>
            )}

            {slug === "seguro-vida-sucessao-patrimonial-itcmd" && (
              <div className="mt-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/10 p-6 md:p-8 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <Scale className="h-6 w-6 text-primary shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
                      Simule agora seu seguro de vida para sucessão patrimonial
                    </h3>
                    <p className="text-foreground/85 leading-relaxed">
                      Receba em até <strong>2 horas úteis</strong> uma análise patrimonial gratuita: quanto sua família precisa
                      em capital segurado para cobrir <strong>ITCMD, honorários, custas</strong> e manter o padrão de vida durante
                      o inventário. Comparamos as <strong>16+ seguradoras</strong> parceiras e enviamos as 3 melhores propostas.
                    </p>
                  </div>
                </div>

                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground/80 mb-6 mt-4">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Cálculo personalizado por estado (alíquota ITCMD)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Estruturação de beneficiários (sem inventário)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Buy-Sell Agreement para sócios de empresas</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> Atendimento humano com corretor dedicado</li>
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/551151997500?text=Ol%C3%A1%21%20Li%20o%20artigo%20sobre%20seguro%20de%20vida%20para%20sucess%C3%A3o%20patrimonial%20e%20gostaria%20de%20uma%20simula%C3%A7%C3%A3o%20personalizada%20para%20cobrir%20ITCMD%20e%20invent%C3%A1rio."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("blog_cta_sucessao_patrimonial")}
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb955] text-white px-5 py-3 rounded-md font-semibold transition shadow-sm"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Pedir simulação no WhatsApp
                  </a>
                  <Link
                    to="/seguro-vida/formulario"
                    onClick={() => trackCotacaoClick("blog_cta_sucessao_patrimonial")}
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-3 rounded-md font-semibold transition shadow-sm"
                  >
                    Solicitar cotação online
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Atendimento de seg. a sex., 9h às 18h. Resposta inicial em até 2h úteis. Sem compromisso de contratação.
                </p>
              </div>
            )}

            {article.faqs.length > 0 && (
              <>
                <FAQSchema faqs={article.faqs.map(f => ({ question: f.q, answer: f.a }))} />
                <div className="mt-12 border-t pt-8">
                  <h2 className="mb-6">Perguntas Frequentes</h2>
                  <div className="space-y-4">
                    {article.faqs.map((faq, i) => (
                      <div key={i}>
                        <h3 className="text-lg font-semibold mb-1">{faq.q}</h3>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Tags */}
            {meta && meta.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {meta.tags.map(tag => (
                  <Link key={tag} to="/blog" className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

             {/* Inline Form CTA */}
             <Suspense fallback={null}>
               <BlogFormCTA />
             </Suspense>
 
             {/* CTA persistente — FINAL do post */}
            <div className="mt-12 p-8 md:p-10 bg-primary text-primary-foreground rounded-xl text-center shadow-elegant">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Pronto para uma cotação personalizada?</h3>
              <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                Comparamos 16+ seguradoras parceiras e devolvemos a melhor proposta em até 2h úteis. Atendimento humano, sem call center.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("blog-article-bottom")}
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-[#25D366] text-white text-base font-semibold hover:bg-[#1ebe57] transition-colors"
                >
                  <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
                </a>
                <Link
                  to={`/cotacao?tipo=${meta?.category?.toLowerCase().includes("saúde") ? "saude" : meta?.category?.toLowerCase().includes("auto") ? "auto" : "outros"}`}
                  onClick={() => trackCotacaoClick("blog-article-bottom")}
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] text-base font-semibold hover:opacity-90 transition-opacity"
                >
                  Pedir Cotação <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
               <p className="text-xs text-primary-foreground/60 mt-4">Seg. a sex., 9h às 18h. Sem compromisso de contratação.</p>
               <div className="mt-8 pt-6 border-t border-white/10">
                 <p className="text-sm text-white/70 mb-4">A Patro Seguros é a autoridade máxima em seguros na região. Conheça nosso:</p>
                 <Link to="/seguros-em-guarulhos">
                   <Button variant="secondary" className="w-full sm:w-auto rounded-xl">
                     Guia Completo de Seguros em Guarulhos
                     <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                 </Link>
               </div>
            </div>

            {/* Artigos Relacionados */}
            {related.length > 0 && (
              <div className="mt-16">
                <h2 className="text-xl font-bold mb-6">Artigos Relacionados</h2>
                <div className="grid md:grid-cols-3 gap-5">
                  {related.map(rel => (
                    <Link key={rel.slug} to={`/blog/${rel.slug}`}>
                      <Card className="hover:shadow-lg transition-base h-full overflow-hidden group">
                        <div className="aspect-video w-full overflow-hidden">
                          <OptimizedImage
                            src={getArticleImage(rel.slug)}
                            alt={rel.title}
                            className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="pt-3">
                          <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{rel.category}</span>
                          <h3 className="text-sm font-semibold mt-2 mb-1">{rel.title}</h3>
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{rel.readTime} min</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Suspense fallback={null}>
        <StickyQuoteBar 
          source={`blog:${slug}`} 
          quoteHref="#cotacao-blog" 
          ctaLabel="Cotação Rápida" 
          whatsappMessage={`Olá! Li o artigo sobre ${article.title} e gostaria de uma cotação.`}
        />
      </Suspense>
      <Footer />
      {slug === "como-pagar-menos-seguro-frota-logistica-guarulhos" && (
        <div
          className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]"
          role="region"
          aria-label="Cotação de seguro de frota"
        >
          <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <p className="text-sm font-semibold text-foreground text-center sm:text-left flex-1">
              Reduza o custo do seguro da sua frota — fale com um especialista.
            </p>
            <div className="flex gap-2 w-full sm:w-auto">
              <Link
                to="/seguro-frota"
                onClick={() => trackCotacaoClick("blog-frota-sticky")}
                className="flex-1 sm:flex-initial"
              >
                <Button size="default" className="w-full font-semibold">
                  Pedir Cotação
                </Button>
              </Link>
              <a
                href="https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20blog%20da%20Patro%20Seguros%20e%20quero%20cota%C3%A7%C3%A3o%20de%20seguro%20de%20frota%20para%20minha%20transportadora%20em%20Guarulhos."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("blog-frota-sticky-especialista")}
                className="flex-1 sm:flex-initial hidden md:block"
              >
                <Button size="default" variant="outline" className="w-full font-semibold">
                  Falar com especialista
                </Button>
              </a>
              <a
                href="https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20blog%20da%20Patro%20Seguros%20e%20quero%20cota%C3%A7%C3%A3o%20de%20seguro%20de%20frota%20para%20minha%20transportadora%20em%20Guarulhos."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("blog-frota-sticky")}
                className="flex-1 sm:flex-initial"
              >
                <Button size="default" variant="cta" className="w-full font-semibold">
                  <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogArticle;
