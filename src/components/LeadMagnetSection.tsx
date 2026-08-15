import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { Link } from "react-router-dom";

const ebookMockup = "/images/ebook-mockup-seguro-auto.webp";

const LeadMagnetSection = memo(() => {
  return (
    <section className="py-16 md:py-24 relative z-[2] bg-white" aria-labelledby="lead-magnet-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-[hsl(210,100%,14%)] to-[hsl(210,100%,22%)] shadow-2xl">
          <div className="grid md:grid-cols-2 items-center">
            {/* Left — Text + CTA */}
            <div className="p-8 md:p-12 lg:p-16 text-left">
              <span className="inline-block text-sm font-semibold text-amber-500 mb-3" role="img" aria-label="Presente">🎁 Material Gratuito</span>
              <h2 id="lead-magnet-heading" className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                Quer baixar o preço do seu Seguro Auto em até 30%?
              </h2>
              <p className="text-white/80 text-sm mb-8 leading-relaxed">
                Baixe nosso guia definitivo para motoristas de Guarulhos e descubra <strong className="text-white">5 segredos que as seguradoras não te contam</strong> para economizar de verdade.
              </p>

              <Link to="/guia-completo-seguros-guarulhos">
                <Button
                  className="w-full md:w-auto h-14 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-primary font-bold text-lg shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-1"
                >
                  <Download className="mr-2 h-5 w-5" aria-hidden="true" /> Baixar Guia Completo Grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <p className="mt-4 text-[10px] text-white/40">
                Acesso imediato via PDF • Sem custo • 20+ anos de experiência
              </p>
            </div>

            {/* Right — Mockup */}
            <div className="hidden md:flex items-center justify-center p-8 lg:p-12 min-h-[400px]">
              <OptimizedImage
                src={ebookMockup}
                alt="E-book Guia Definitivo - Como Baixar o Preço do Seguro Auto em Guarulhos"
                width={400}
                height={400}
                className="w-full max-w-[340px] drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                placeholderClass="bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default LeadMagnetSection;
