import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import ExternalLink from "@/components/ExternalLink";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, HelpCircle, MessageCircle, BookOpen } from "lucide-react";
import { faqCategories } from "@/data/perguntasHubData";
import { perguntasCategoriaAprofundamento } from "@/data/perguntasCategoriaAprofundamento";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

const WA_BASE = "https://wa.me/5511913800021?text=";

const PerguntasCategoriaPage = () => {
  const { categoria } = useParams<{ categoria: string }>();
  const cat = useMemo(() => faqCategories.find((c) => c.id === categoria), [categoria]);
  const extra = categoria ? perguntasCategoriaAprofundamento[categoria] : undefined;

  if (!cat || !extra) return <Navigate to="/perguntas-frequentes-seguros" replace />;

  const url = `${CANONICAL_BASE_URL}/perguntas-frequentes-seguros/${cat.id}`;
  const todasPerguntas = [...cat.perguntas, ...extra.perguntasExtras];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: todasPerguntas.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: { "@type": "Answer", text: qa.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${CANONICAL_BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Perguntas Frequentes", item: `${CANONICAL_BASE_URL}/perguntas-frequentes-seguros` },
      { "@type": "ListItem", position: 3, name: cat.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={`${cat.title} — Perguntas Frequentes | Patro Seguros`}
        description={`Dúvidas frequentes sobre ${cat.title.toLowerCase()}: ${cat.description}`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Breadcrumb visual */}
      <div className="container mx-auto px-4 max-w-6xl pt-6 text-sm text-muted-foreground">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-primary">Início</Link></li>
            <li aria-hidden>/</li>
            <li><Link to="/perguntas-frequentes-seguros" className="hover:text-primary">Perguntas Frequentes</Link></li>
            <li aria-hidden>/</li>
            <li className="text-foreground">{cat.title}</li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <Badge variant="secondary" className="mb-4"><HelpCircle className="h-3 w-3 mr-1" /> FAQ · {cat.title}</Badge>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            {cat.title}: perguntas frequentes
          </h1>
          <p className="text-lg text-muted-foreground mb-6">{extra.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <ExternalLink href={WA_BASE + encodeURIComponent(extra.whatsappMsg)}>
                <MessageCircle className="h-4 w-4 mr-2" /> Tirar dúvida no WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to={cat.relatedHref}>
                {cat.relatedLabel} <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Guia rápido */}
      <section className="py-10 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Guia rápido</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {extra.quickGuide.map((g) => (
              <Card key={g.title}>
                <CardHeader>
                  <CardTitle className="text-base">{g.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  {g.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Perguntas frequentes</h2>
          <Accordion type="single" collapsible className="w-full">
            {todasPerguntas.map((qa, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{qa.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{qa.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Termos relacionados */}
      <section className="py-10 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" /> Termos relacionados
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {extra.termosRelacionados.map((t) => (
              <Card key={t.term} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <p className="font-semibold">{t.term}</p>
                  <p className="text-sm text-muted-foreground">{t.hint}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/glossario-seguros" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Ver glossário completo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Outras categorias */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl md:text-2xl font-bold mb-5">Outras categorias de perguntas</h2>
          <div className="flex flex-wrap gap-2">
            {faqCategories.filter((c) => c.id !== cat.id).map((c) => (
              <Link
                key={c.id}
                to={`/perguntas-frequentes-seguros/${c.id}`}
                className="text-sm px-3 py-1.5 rounded-full border bg-card hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-14 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{extra.ctaLine}</h2>
          <p className="mb-6 text-primary-foreground/85">Especialistas em {cat.title.toLowerCase()} — respostas rápidas pelo WhatsApp.</p>
          <Button size="lg" variant="secondary" asChild>
            <ExternalLink href={WA_BASE + encodeURIComponent(extra.whatsappMsg)}>
              <MessageCircle className="h-5 w-5 mr-2" /> Falar com especialista
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PerguntasCategoriaPage;
