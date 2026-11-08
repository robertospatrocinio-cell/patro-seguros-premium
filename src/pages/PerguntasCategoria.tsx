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
import { perguntasPrioritarias } from "@/data/perguntasPrioritarias";
import FaqEditorialContext from "@/components/FaqEditorialContext";
import { WHATSAPP_URL_BASE } from "@/config/empresa";

const WA_BASE = `${WHATSAPP_URL_BASE}?text=`;

const PerguntasCategoriaPage = () => {
  const { categoria } = useParams<{ categoria: string }>();
  const cat = useMemo(() => faqCategories.find((c) => c.id === categoria), [categoria]);
  const reviewed = perguntasPrioritarias.find((category) => category.id === categoria);
  // Nas categorias revisadas, não reintroduzir promessas dos complementos legados.
  const extra = reviewed ? {
    intro: reviewed.description,
    quickGuide: [
      { title: "Descreva o risco real", content: "Informe uso, atividade, pessoas e bens envolvidos. Omissões podem tornar a proposta inadequada à sua necessidade." },
      { title: "Compare condições equivalentes", content: "Leia coberturas, exclusões, limites, franquias ou coparticipação e vigência. O menor preço isolado não define a proteção adequada." },
      { title: "Confirme antes de contratar", content: "Peça as condições do produto e esclareça as restrições. Solicitar cotação não garante aceitação nem início da proteção." },
    ],
    perguntasExtras: [],
    termosRelacionados: reviewed.id === "saude" ? [
      { term: "Segmentação assistencial", hint: "Define os tipos de atendimento previstos no plano, conforme as regras aplicáveis." },
      { term: "Coparticipação", hint: "Parcela do custo de utilização cobrada conforme os critérios do contrato." },
    ] : [
      { term: "Limite de indenização", hint: "Valor máximo de uma garantia, sujeito às condições e critérios de indenização." },
      { term: "Risco excluído", hint: "Situação que o contrato não abrange; confira a redação de cada garantia." },
    ],
    ctaLine: "Compare as condições para sua necessidade",
    whatsappMsg: `Olá, quero esclarecer uma dúvida sobre ${reviewed.title.toLowerCase()} e solicitar análise das opções.`,
  } : categoria ? perguntasCategoriaAprofundamento[categoria] : undefined;

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
        title={reviewed ? `${cat.title}: dúvidas | Patro Seguros` : `${cat.title} — Perguntas Frequentes | Patro Seguros`}
        description={reviewed ? cat.description : `Dúvidas frequentes sobre ${cat.title.toLowerCase()}: ${cat.description}`}
        skipBreadcrumb
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
              </ExternalLink>
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

      {reviewed && (
        <section className="container mx-auto max-w-4xl px-4 pb-10">
          <FaqEditorialContext categoryId={cat.id} />
        </section>
      )}

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
          <p className="mb-6 text-primary-foreground/85">Converse com a Patro sobre {cat.title.toLowerCase()} e confirme as condições disponíveis para seu caso.</p>
          <Button size="lg" variant="secondary" asChild>
            <ExternalLink href={WA_BASE + encodeURIComponent(extra.whatsappMsg)}>
              <MessageCircle className="h-5 w-5 mr-2" /> Falar com especialista
            </ExternalLink>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PerguntasCategoriaPage;
