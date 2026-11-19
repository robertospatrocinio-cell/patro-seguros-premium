import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import ExternalLink from "@/components/ExternalLink";
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
    "@id": `${CANONICAL_BASE_URL}/materiais-gratuitos-seguros#colecao`,
    name: "Materiais gratuitos da Patro Seguros",
    description: "Checklists práticos para preparar renovações, contratações e revisões — pessoais e empresariais.",
    inLanguage: "pt-BR",
    url: `${CANONICAL_BASE_URL}/materiais-gratuitos-seguros`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: materiais.length,
      itemListElement: materiais.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: m.title,
        description: m.description,
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

      <section className="py-14" aria-labelledby="materiais-disponiveis">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 id="materiais-disponiveis" className="text-2xl md:text-3xl font-bold mb-3">Escolha seu checklist gratuito</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Consulte os {materiais.length} checklists sem cadastro: abra o tema desejado para marcar os itens e imprimir ou salvar em PDF. Se preferir orientação da equipe, solicite pelo WhatsApp.
          </p>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
            {materiais.map((m) => (
              <li key={m.slug}>
                <Card className="hover:shadow-md transition-shadow flex flex-col h-full">
                  <CardHeader>
                    <Badge variant="outline" className="text-xs w-fit mb-2">{m.category}</Badge>
                    <CardTitle className="text-lg leading-snug">
                      <Link to={m.href} className="rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">{m.title}</Link>
                    </CardTitle>
                    <CardDescription className="leading-relaxed">{m.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto flex flex-col gap-2">
                    <Link to={m.href} aria-label={`Abrir ${m.title}`} className="inline-flex min-h-11 items-center gap-1 rounded-sm text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      Abrir checklist <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                    <ExternalLink href={m.whatsapp} aria-label={`Solicitar pelo WhatsApp: ${m.title}`} className="inline-flex min-h-11 items-center gap-1 rounded-sm text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      Solicitar pelo WhatsApp <MessageCircle aria-hidden="true" className="h-4 w-4" />
                    </ExternalLink>
                    <Link to={m.relatedHref} className="inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      {m.relatedLabel}
                    </Link>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-xs text-muted-foreground text-center max-w-2xl mx-auto">
            Ao solicitar um material, você concorda em ser contatado pela Patro Seguros exclusivamente para envio do conteúdo e orientação sobre produtos, conforme nossa política de privacidade e LGPD. As coberturas descritas nos materiais são exemplificativas e variam conforme apólice, seguradora e aceitação.
          </p>

          <div className="mt-10 rounded-xl border bg-muted/30 p-6 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Quer comparar planos antes de contratar?</h2>
            <p className="text-sm text-muted-foreground mb-4 max-w-2xl mx-auto">
              Nossa Central de Comparativos coloca lado a lado as principais modalidades de auto, empresarial, saúde, residencial, vida e consórcio.
            </p>
            <Button asChild>
              <Link to="/comparativos-seguros">
                Ver comparativos de seguros <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CentralDeMateriais;