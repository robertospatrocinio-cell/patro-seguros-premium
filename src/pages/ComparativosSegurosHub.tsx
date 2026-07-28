import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Scale, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { comparativos } from "@/data/comparativosData";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

const WA = "https://wa.me/5511913800021?text=" + encodeURIComponent("Olá, quero ajuda para comparar planos de seguro com a Patro.");

const ComparativosSegurosHub = () => {
  const url = `${CANONICAL_BASE_URL}/comparativos-seguros`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Comparativos de Seguros",
    url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: comparativos.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.title,
        url: `${CANONICAL_BASE_URL}/comparativos-seguros/${c.slug}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Comparativos de Seguros | Planos, Coberturas e Preços"
        description="Comparativos lado a lado de planos de seguro auto, empresarial, saúde, residencial, vida e consórcio. Escolha com clareza a modalidade certa."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6 text-sm">
            <Scale className="h-4 w-4" /> Comparativos
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Comparativos de seguros lado a lado</h1>
          <p className="text-lg text-primary-foreground/85 max-w-2xl mx-auto">
            Tabelas objetivas para você entender rapidamente as diferenças entre modalidades e escolher o plano certo para o seu perfil.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {comparativos.map((c) => (
            <Card key={c.slug} className="flex flex-col">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">{c.category}</Badge>
                <CardTitle className="text-lg leading-snug">{c.title}</CardTitle>
                <CardDescription>{c.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/comparativos-seguros/${c.slug}`}>
                    Ver comparativo <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ainda em dúvida sobre qual escolher?</h2>
          <p className="mb-6 text-primary-foreground/85">Nosso time compara em minutos com base no seu perfil e envia recomendação com preço.</p>
          <Button size="lg" variant="secondary" asChild>
            <a href={WA} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" /> Falar com um consultor
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ComparativosSegurosHub;