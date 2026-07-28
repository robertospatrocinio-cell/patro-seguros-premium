import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageCircle, Download, ArrowRight } from "lucide-react";
import { materiais } from "@/data/materiaisData";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

const HERO_WA = "https://wa.me/5511913800021?text=" + encodeURIComponent("Olá, quero receber os checklists da Patro Seguros.");

const CentralDeMateriais = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Materiais Gratuitos da Patro Seguros",
    url: `${CANONICAL_BASE_URL}/materiais-gratuitos-seguros`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: materiais.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: m.title,
        url: `${CANONICAL_BASE_URL}${m.href}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Materiais Gratuitos sobre Seguros"
        description="Checklists da Patro Seguros para renovar, contratar e revisar seguros, planos, consórcios e proteções empresariais."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6 text-sm">
            <Download className="h-4 w-4" /> Materiais
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
            Materiais gratuitos da Patro Seguros
          </h1>
          <p className="text-lg text-primary-foreground/85 max-w-2xl mx-auto mb-8">
            Checklists práticos para preparar renovações, contratações e revisões — pessoais e empresariais.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href={HERO_WA} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" /> Solicitar pelo WhatsApp
            </a>
          </Button>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {materiais.map((m) => (
              <Card key={m.slug} className="hover:shadow-md transition-shadow flex flex-col">
                <CardHeader>
                  <Badge variant="outline" className="text-xs w-fit mb-2">{m.category}</Badge>
                  <CardTitle className="text-lg leading-snug">{m.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{m.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex flex-col gap-2">
                  <a
                    href={m.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Solicitar checklist <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link to={m.relatedHref} className="text-xs text-muted-foreground hover:text-primary">
                    {m.relatedLabel}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-10 text-xs text-muted-foreground text-center max-w-2xl mx-auto">
            Ao solicitar um material, você concorda em ser contatado pela Patro Seguros exclusivamente para envio do conteúdo e orientação sobre produtos, conforme nossa política de privacidade e LGPD. As coberturas descritas nos materiais são exemplificativas e variam conforme apólice, seguradora e aceitação.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CentralDeMateriais;