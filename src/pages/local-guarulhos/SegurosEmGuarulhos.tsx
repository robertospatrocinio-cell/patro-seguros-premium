import { lazy, Suspense } from "react";
import SeoLocalPage from "@/pages/SeoLocalPage";
import { seoLocalGuarulhosHub } from "@/data/seoLocalGuarulhosHub";
import { BAIRROS_MATRIZ } from "@/data/seoLocalBairrosGuarulhos";
import { Card, CardContent } from "@/components/ui/card";
import ExternalLink from "@/components/ExternalLink";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NeighborhoodHub = lazy(() => import("@/components/NeighborhoodHub"));

/**
 * Componente da Página Hub /seguros-guarulhos
 * Estende o SeoLocalPage com uma seção visual de bairros.
 */
const SegurosEmGuarulhos = () => {
  return (
    <>
      <Header />
      <SeoLocalPage slug="seguros-guarulhos" />
      
      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Seguros por bairro em Guarulhos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada região de Guarulhos possui necessidades de proteção específicas. 
              Clique no seu bairro para ver as coberturas indicadas e solicitar uma cotação personalizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BAIRROS_MATRIZ.map((b) => (
              <Card key={b.id} className="group hover:shadow-lg transition-all duration-300 border-border/60">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">{b.nome}</h3>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                        Risco {b.risco}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {b.perfil}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-foreground/70 uppercase">Seguros Recomendados:</p>
                    <div className="flex flex-wrap gap-2">
                      {b.prioritarios.slice(0, 3).map(p => (
                        <span key={p} className="bg-muted px-2 py-1 rounded text-[10px] font-medium capitalize">
                          {p.replace("-", " ")}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link to={`/seguros-guarulhos/${b.slug}`}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-all">
                        Ver seguros em {b.nome} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <ExternalLink href={`https://wa.me/551151997500?text=${encodeURIComponent(`Olá! Gostaria de cotar um seguro para o bairro ${b.nome} em Guarulhos.`)}`}>
                      <Button variant="ghost" className="w-full text-primary hover:bg-primary/5">
                        <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp {b.nome}
                      </Button>
                    </ExternalLink>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-primary text-white p-8 rounded-3xl text-center">
            <h3 className="text-2xl font-bold mb-4">Sua região não está na lista?</h3>
            <p className="mb-8 text-white/80 max-w-xl mx-auto">
              Nós atendemos todos os 20 principais bairros de Guarulhos e regiões complementares como Jardim Vila Galvão, Bom Clima, Cecap e Tranquilidade.
            </p>
            <Link to="/cotacao">
              <Button size="lg" variant="secondary" className="font-bold px-8">
                Solicitar Cotação para Qualquer Bairro
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default SegurosEmGuarulhos;
