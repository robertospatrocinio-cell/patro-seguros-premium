import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageCircle, ArrowRight, BookOpen, Clock } from "lucide-react";
import { guiasBlocks } from "@/data/guiasHubData";
import GooglePreferredSource from "@/components/GooglePreferredSource";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

const HERO_WA = "https://wa.me/5511913800021?text=" + encodeURIComponent("Olá, quero orientação da Patro Seguros sobre seguros, planos ou consórcios.");

const CentralDeGuias = () => {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Central de Guias Patro Seguros",
    url: `${CANONICAL_BASE_URL}/guias-seguros`,
    description: "Hub editorial da Patro Seguros com guias, FAQ, glossário e materiais sobre seguros, planos de saúde e consórcios.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: guiasBlocks.flatMap((block, bi) =>
        block.cards.map((card, ci) => ({
          "@type": "ListItem",
          position: bi * 100 + ci + 1,
          name: card.title,
          url: `${CANONICAL_BASE_URL}${card.href}`,
        }))
      ),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Guias de Seguros, Saúde e Consórcios"
        description="Guias completos da Patro Seguros sobre seguro auto, empresarial, saúde, vida, consórcio, garantia, crédito, cyber e proteção em Guarulhos."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6 text-sm">
            <BookOpen className="h-4 w-4" />
            Central Editorial
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Central de Guias Patro Seguros
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 max-w-3xl mx-auto mb-10 leading-relaxed">
            Conteúdo completo, claro e atualizado para ajudar pessoas, famílias e empresas a escolherem seguros, planos de saúde, consórcios e soluções de proteção com mais segurança.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href={HERO_WA} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                Falar com especialista
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <a href="#guias-por-tema">Ver guias por tema</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Sumário */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <nav aria-label="Sumário" className="flex flex-wrap gap-2">
            {guiasBlocks.map((b) => (
              <a key={b.id} href={`#${b.id}`} className="text-sm px-3 py-1.5 rounded-full border bg-card hover:bg-primary hover:text-primary-foreground transition-colors">
                {b.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Blocos */}
      <section id="guias-por-tema" className="py-16">
        <div className="container mx-auto px-4 max-w-6xl space-y-16">
          {guiasBlocks.map((block) => (
            <div key={block.id} id={block.id} className="scroll-mt-28">
              <div className="mb-8 max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{block.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{block.intro}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {block.cards.map((card) => (
                  <Card key={card.href} className="hover:shadow-md transition-shadow flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">{card.level}</Badge>
                        <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {card.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-snug">{card.title}</CardTitle>
                      <CardDescription className="leading-relaxed">{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <Link
                        to={card.href}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      >
                        {card.cta ?? "Ler guia"} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fonte preferencial no Google — discreto, antes do CTA final */}
      <section className="border-t py-10">
        <div className="container mx-auto px-4">
          <GooglePreferredSource context="guias-seguros" />
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-muted/40 border-t py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Não achou o tema que procura?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            A equipe da Patro Seguros orienta você de forma consultiva sobre a melhor combinação de coberturas — conforme apólice, aceitação e produto disponível na seguradora parceira.
          </p>
          <Button size="lg" asChild>
            <a href={HERO_WA} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CentralDeGuias;