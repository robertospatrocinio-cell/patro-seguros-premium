import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ArrowRight, HelpCircle } from "lucide-react";
import { faqCategories } from "@/data/perguntasHubData";

const HERO_WA = "https://wa.me/5511913800021?text=" + encodeURIComponent("Olá, tenho uma dúvida sobre seguros, planos ou consórcios.");

const CentralDePerguntas = () => {
  // FAQPage enxuto: apenas 3 perguntas por categoria para não inflar a página
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((cat) =>
      cat.perguntas.slice(0, 3).map((qa) => ({
        "@type": "Question",
        name: qa.q,
        acceptedAnswer: { "@type": "Answer", text: qa.a },
      }))
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Perguntas Frequentes sobre Seguros"
        description="Central de dúvidas da Patro Seguros: auto, empresarial, saúde, consórcio, vida, garantia, crédito, cyber, consultórios e mais."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6 text-sm">
            <HelpCircle className="h-4 w-4" /> FAQ
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
            Perguntas frequentes sobre seguros, planos e consórcios
          </h1>
          <p className="text-lg text-primary-foreground/85 max-w-2xl mx-auto mb-8">
            Respostas objetivas para as dúvidas mais comuns. Se não encontrar o que procura, fale com um especialista da Patro.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href={HERO_WA} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" /> Tirar dúvida no WhatsApp
            </a>
          </Button>
        </div>
      </section>

      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <nav aria-label="Categorias" className="flex flex-wrap gap-2">
            {faqCategories.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="text-sm px-3 py-1.5 rounded-full border bg-card hover:bg-primary hover:text-primary-foreground transition-colors">
                {c.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          {faqCategories.map((cat) => (
            <Card key={cat.id} id={cat.id} className="scroll-mt-28">
              <CardHeader>
                <CardTitle className="text-2xl">{cat.title}</CardTitle>
                <p className="text-muted-foreground">{cat.description}</p>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {cat.perguntas.map((qa, i) => (
                    <AccordionItem key={i} value={`${cat.id}-${i}`}>
                      <AccordionTrigger className="text-left">{qa.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">{qa.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <Link to={cat.relatedHref} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    {cat.relatedLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/guias-seguros" className="text-xs text-muted-foreground hover:text-primary">
                    Ver Central de Guias
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CentralDePerguntas;