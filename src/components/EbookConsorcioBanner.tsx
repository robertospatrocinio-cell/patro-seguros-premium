import { Link } from "react-router-dom";
import { Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ebookMockup from "@/assets/ebook-mockup-consorcio.webp";

interface EbookConsorcioBannerProps {
  variant?: "full" | "compact";
}

const EbookConsorcioBanner = ({ variant = "full" }: EbookConsorcioBannerProps) => {
  if (variant === "compact") {
    return (
      <section className="py-10" aria-labelledby="ebook-consorcio-compact-heading">
        <div className="container mx-auto px-4">
          <Link
            to="/ebook-consorcio"
            className="block max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-primary to-[hsl(210,100%,22%)] p-6 md:p-8 shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] group"
          >
            <div className="flex items-center gap-5 md:gap-8">
              <img
                src={ebookMockup}
                alt="E-book Guia do Consórcio Patro Seguros"
                width={120}
                height={120}
                loading="lazy"
                className="w-20 md:w-28 flex-shrink-0 drop-shadow-2xl group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 text-white">
                <span className="inline-block text-xs font-semibold text-amber-400 mb-1">🎁 E-book Gratuito</span>
                <h3 id="ebook-consorcio-compact-heading" className="text-lg md:text-xl font-heading font-bold mb-1 leading-tight">
                  Guia do Consórcio: passo a passo para conquistar imóveis e veículos
                </h3>
                <p className="text-white/70 text-sm hidden md:block">
                  Baixe gratuitamente o material exclusivo da Patro Seguros
                </p>
              </div>
              <Button
                variant="cta"
                className="rounded-xl hidden md:inline-flex flex-shrink-0"
                asChild
              >
                <span>
                  <Download className="mr-2 h-4 w-4" /> Baixar Agora
                </span>
              </Button>
              <BookOpen className="h-6 w-6 text-amber-400 md:hidden flex-shrink-0" />
            </div>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20" aria-labelledby="ebook-consorcio-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-[hsl(210,100%,22%)] shadow-2xl">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <span className="inline-block text-sm font-semibold text-amber-400 mb-3">🎁 E-book Gratuito</span>
              <h2 id="ebook-consorcio-heading" className="text-2xl md:text-3xl font-heading font-extrabold text-white mb-3 leading-tight">
                Baixe o Guia Completo do Consórcio Patro Seguros
              </h2>
              <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
                Tenha o passo a passo para adquirir <strong className="text-white">imóvel, veículo ou serviço</strong> de forma planejada, sem juros de financiamento.
              </p>
              <Link to="/ebook-consorcio">
                <Button variant="cta" size="lg" className="rounded-xl">
                  <Download className="mr-2 h-5 w-5" /> Baixar E-book Agora
                </Button>
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center p-8 lg:p-12">
              <img
                src={ebookMockup}
                alt="E-book Guia do Consórcio Desvendado - Patro Seguros"
                width={340}
                height={340}
                loading="lazy"
                className="w-full max-w-[300px] drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EbookConsorcioBanner;
