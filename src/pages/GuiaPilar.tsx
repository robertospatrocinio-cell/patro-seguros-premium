import { useParams, Link, Navigate } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, BookOpen, Clock, MessageCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { GUIAS_PILARES_BY_SLUG, GUIA_AUTHOR, type GuiaPilar } from "@/data/guiasPilaresData";
import { ALL_GLOSSARY_TERMS, type FlatGlossaryTerm } from "@/data/glossarioSegurosData";

const WA_BASE = "https://wa.me/5511913800021?text=";

// Mapeia a "category" editorial do guia pilar para as categorias do glossário.
const PILLAR_TO_GLOSSARY_CATEGORIES: Record<string, string[]> = {
  "Seguros para Veículos": ["auto", "gerais"],
  "Seguros para Empresas": ["empresarial", "gerais"],
  "Planos de Saúde": ["vida-saude", "gerais"],
  "Consórcios": ["gerais"],
  "Seguros de Vida": ["vida-saude", "gerais"],
  "Seguros Residenciais": ["empresarial", "gerais"],
  "Consultórios e Clínicas": ["vida-saude", "empresarial"],
  "Seguros B2B Especializados": ["empresarial", "gerais"],
  "Transporte & Logística": ["transporte", "empresarial", "gerais"],
  "Patrimônio Premium": ["empresarial", "gerais"],
  "Agro e Rural": ["agro", "gerais"],
};

const pickRelatedGlossaryTerms = (category: string, limit = 8): FlatGlossaryTerm[] => {
  const cats = PILLAR_TO_GLOSSARY_CATEGORIES[category] ?? ["gerais"];
  const seen = new Set<string>();
  const out: FlatGlossaryTerm[] = [];
  for (const catId of cats) {
    for (const t of ALL_GLOSSARY_TERMS) {
      if (t.categoryId !== catId) continue;
      if (seen.has(t.slug)) continue;
      seen.add(t.slug);
      out.push(t);
      if (out.length >= limit) return out;
    }
  }
  return out;
};

const buildSchemas = (guia: GuiaPilar) => {
  const url = `${CANONICAL_BASE_URL}/guias/${guia.slug}`;
  const articleBody = [
    guia.quickAnswer,
    ...guia.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]),
  ].join("\n\n");

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guia.h1,
    description: guia.metaDescription,
    inLanguage: "pt-BR",
    datePublished: guia.updatedAt,
    dateModified: guia.updatedAt,
    mainEntityOfPage: url,
    url,
    author: { "@type": "Organization", name: GUIA_AUTHOR.name },
    reviewedBy: { "@type": "Person", name: GUIA_AUTHOR.reviewer },
    publisher: {
      "@type": "Organization",
      name: "Patro Seguros",
      logo: { "@type": "ImageObject", url: `${CANONICAL_BASE_URL}/images/logo.webp` },
    },
    articleSection: guia.category,
    articleBody,
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guia.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${CANONICAL_BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Central de Guias", item: `${CANONICAL_BASE_URL}/guias-seguros` },
      { "@type": "ListItem", position: 3, name: guia.title, item: url },
    ],
  };

  return { article, faq, breadcrumb };
};

const GuiaPilarPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const guia = slug ? GUIAS_PILARES_BY_SLUG[slug] : undefined;

  if (!guia) return <Navigate to="/guias-seguros" replace />;

  const { article, faq, breadcrumb } = buildSchemas(guia);
  const waUrl = WA_BASE + encodeURIComponent(guia.whatsappMessage);
  const wordCount = guia.sections.reduce(
    (acc, s) => acc + s.paragraphs.join(" ").split(/\s+/).length + (s.bullets?.join(" ").split(/\s+/).length ?? 0),
    0,
  );

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={guia.metaTitle}
        description={guia.metaDescription}
        ogType="article"
        skipBreadcrumb
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Breadcrumb visual */}
      <nav aria-label="Trilha de navegação" className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3 max-w-5xl text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-primary">Início</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/guias-seguros" className="hover:text-primary">Central de Guias</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground line-clamp-1">{guia.title}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6 text-sm">
            <BookOpen className="h-4 w-4" />
            {guia.eyebrow}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{guia.h1}</h1>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/80 mb-8 flex-wrap">
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {guia.readTime}</span>
            <span>·</span>
            <span>Atualizado em {new Date(guia.updatedAt).toLocaleDateString("pt-BR")}</span>
            <span>·</span>
            <span>Por {GUIA_AUTHOR.name} · Revisão {GUIA_AUTHOR.reviewer}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" variant="secondary" asChild>
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" /> Falar no WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to={guia.commercialHref}>{guia.commercialLabel} <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick answer */}
      <section className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex gap-4">
            <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Resposta rápida</h2>
              <p className="text-base md:text-lg leading-relaxed text-foreground">{guia.quickAnswer}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sumário */}
      <section className="border-b">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Sumário</h2>
          <nav aria-label="Sumário do guia" className="flex flex-wrap gap-2">
            {guia.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-sm px-3 py-1.5 rounded-full border bg-card hover:bg-primary hover:text-primary-foreground transition-colors">
                {s.heading}
              </a>
            ))}
            <a href="#faq" className="text-sm px-3 py-1.5 rounded-full border bg-card hover:bg-primary hover:text-primary-foreground transition-colors">Perguntas frequentes</a>
            <a href="#glossario-relacionado" className="text-sm px-3 py-1.5 rounded-full border bg-card hover:bg-primary hover:text-primary-foreground transition-colors">Glossário</a>
          </nav>
        </div>
      </section>

      {/* Sections */}
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-14">
          {guia.sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28" aria-labelledby={`${s.id}-heading`}>
              <h2 id={`${s.id}-heading`} className="text-2xl md:text-3xl font-bold mb-5 leading-tight">{s.heading}</h2>
              <div className="space-y-4 text-base md:text-lg leading-relaxed text-foreground/90">
                {s.paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
                {s.bullets && (
                  <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                    {s.bullets.map((b, i) => (<li key={i}>{b}</li>))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          {/* Mid-CTA */}
          <aside className="border rounded-xl bg-primary/5 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-3">Precisa de ajuda para escolher?</h2>
            <p className="text-muted-foreground mb-5 leading-relaxed">Fale com um consultor da Patro Seguros. Cotação em várias seguradoras/operadoras e recomendação sob medida — sem custo.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild><a href={waUrl} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4 mr-2" /> WhatsApp</a></Button>
              <Button variant="outline" asChild><Link to={guia.commercialHref}>{guia.commercialLabel}</Link></Button>
            </div>
          </aside>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-28" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold mb-6">Perguntas frequentes</h2>
            <Accordion type="single" collapsible className="w-full">
              {guia.faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Termos do glossário relacionados (Fase 6.1) */}
          {(() => {
            const terms = pickRelatedGlossaryTerms(guia.category);
            if (terms.length === 0) return null;
            return (
              <section id="glossario-relacionado" className="scroll-mt-28" aria-labelledby="glossario-relacionado-heading">
                <h2 id="glossario-relacionado-heading" className="text-2xl md:text-3xl font-bold mb-3">
                  Termos do glossário relacionados
                </h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Definições rápidas dos termos que aparecem neste guia. Toque para ver a explicação
                  completa no glossário A–Z.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {terms.map((t) => (
                    <li key={t.slug} className="border rounded-lg bg-card p-4">
                      <Link
                        to={`/glossario-seguros/letra/${t.letter.toLowerCase()}#term-${t.slug}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {t.term}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{t.definition}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Link
                    to="/glossario-seguros"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Ver glossário completo <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            );
          })()}
        </div>
      </article>

      {/* Related */}
      <section className="bg-muted/40 border-t py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <Badge variant="outline" className="mb-3">Aprenda mais</Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Conteúdos relacionados</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guia.related.map((r) => (
              <Card key={r.href} className="hover:shadow-md transition-shadow flex flex-col">
                <CardHeader>
                  <CardTitle className="text-base leading-snug">{r.label}</CardTitle>
                  <CardDescription>{r.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Link to={r.href} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    Acessar <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 border-t">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para cotar {guia.title.toLowerCase()}?</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">Atendimento consultivo com múltiplas seguradoras/operadoras.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild><a href={waUrl} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-5 w-5 mr-2" /> Falar no WhatsApp</a></Button>
            <Button size="lg" variant="outline" asChild><Link to={guia.commercialHref}>{guia.commercialLabel}</Link></Button>
          </div>
          <p className="text-xs text-muted-foreground mt-6">Guia com aproximadamente {wordCount.toLocaleString("pt-BR")} palavras · Revisão editorial e técnica.</p>
        </div>
      </section>
    </div>
  );
};

export default GuiaPilarPage;