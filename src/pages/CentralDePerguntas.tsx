import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import DiscoverableFaq from "@/components/DiscoverableFaq";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, ArrowRight, HelpCircle } from "lucide-react";
import { faqCategories } from "@/data/perguntasHubData";
import FaqEditorialContext from "@/components/FaqEditorialContext";
import { WHATSAPP_URL_BASE } from "@/config/empresa";

const HERO_WA = WHATSAPP_URL_BASE + "?text=" + encodeURIComponent("Olá, tenho uma dúvida sobre seguros, planos ou consórcios.");

const CentralDePerguntas = () => {
  // O índice descreve as categorias; FAQPage fica nas páginas de cada tema.
  const url = `${CANONICAL_BASE_URL}/perguntas-frequentes-seguros`;
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: "Perguntas frequentes sobre seguros, planos e consórcios",
    inLanguage: "pt-BR",
    publisher: { "@id": `${CANONICAL_BASE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: faqCategories.length,
      itemListElement: faqCategories.map((cat, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: cat.title,
        url: `${url}/${cat.id}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Perguntas Frequentes sobre Seguros"
        description="Central de dúvidas da Patro Seguros: auto, empresarial, saúde, consórcio, vida, garantia, crédito, cyber, consultórios e mais."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6 text-sm">
            <HelpCircle className="h-4 w-4" /> FAQ
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
            Perguntas frequentes sobre seguros, planos e consórcios
          </h1>
          <p className="text-lg text-primary-foreground/85 max-w-2xl mx-auto mb-8">
            Consulte coberturas possíveis, exclusões, critérios de preço e documentos para cotação. Para avaliar seu caso, converse com a Patro.
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
              <a key={c.id} href={`#${c.id}`} className="inline-flex min-h-11 items-center text-sm px-3 py-2 rounded-full border bg-card hover:bg-primary hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                {c.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          <FaqEditorialContext />
          {faqCategories.map((cat) => (
            <Card key={cat.id} id={cat.id} className="scroll-mt-28">
              <CardHeader>
                <h2 className="text-2xl font-semibold leading-none tracking-tight">{cat.title}</h2>
                <p className="text-muted-foreground">{cat.description}</p>
              </CardHeader>
              <CardContent>
                <DiscoverableFaq items={cat.perguntas} idPrefix={`resposta-${cat.id}`} />
                <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <Link to={`/perguntas-frequentes-seguros/${cat.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    Ver todas as perguntas de {cat.title} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={cat.relatedHref} className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1">
                    {cat.relatedLabel} <ArrowRight className="h-3 w-3" />
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