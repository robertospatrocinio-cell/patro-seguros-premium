import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, MessageCircle, Scale, Lightbulb } from "lucide-react";
import { comparativosBySlug } from "@/data/comparativosData";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

const WA_BASE = "https://wa.me/5511913800021?text=";

const ComparativoCategoria = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = useMemo(() => (slug ? comparativosBySlug.get(slug) : undefined), [slug]);
  if (!data) return <Navigate to="/comparativos-seguros" replace />;

  const url = `${CANONICAL_BASE_URL}/comparativos-seguros/${data.slug}`;
  const wa = WA_BASE + encodeURIComponent(`Olá, quero comparar planos: ${data.title}`);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${CANONICAL_BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Comparativos", item: `${CANONICAL_BASE_URL}/comparativos-seguros` },
      { "@type": "ListItem", position: 3, name: data.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title={`${data.title} | Patro Seguros`} description={data.description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="container mx-auto px-4 max-w-6xl pt-6 text-sm text-muted-foreground">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-primary">Início</Link></li>
            <li aria-hidden>/</li>
            <li><Link to="/comparativos-seguros" className="hover:text-primary">Comparativos</Link></li>
            <li aria-hidden>/</li>
            <li className="text-foreground">{data.category}</li>
          </ol>
        </nav>
      </div>

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <Badge variant="secondary" className="mb-4">{data.category} · Comparativo</Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{data.h1}</h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl">{data.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" /> Comparar com um consultor
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to={data.relatedHref}>{data.relatedLabel} <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" /> Tabela comparativa
          </h2>
          <div className="overflow-x-auto rounded-lg border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold min-w-[180px]">Critério</th>
                  {data.colunas.map((c) => (
                    <th key={c.key} className="text-left p-3 font-semibold">{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.linhas.map((linha) => (
                  <tr key={linha.criterio} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="p-3 font-medium">{linha.criterio}</td>
                    {data.colunas.map((c) => (
                      <td key={c.key} className="p-3 align-top">{linha.valores[c.key] ?? "—"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Lightbulb className="h-5 w-5 text-primary" /> Recomendação da Patro Seguros
              </CardTitle>
            </CardHeader>
            <CardContent className="text-base leading-relaxed">{data.recomendacao}</CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Perguntas frequentes</h2>
          <Accordion type="single" collapsible className="w-full">
            {data.faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-14 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Pronto para escolher com confiança?</h2>
          <p className="mb-6 text-primary-foreground/85">Nosso time monta a proposta ideal com base no seu perfil e nas seguradoras parceiras.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" /> Falar no WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/comparativos-seguros">Ver outros comparativos <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComparativoCategoria;