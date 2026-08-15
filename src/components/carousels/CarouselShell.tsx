import { ReactNode, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselShellProps {
  /** Rótulo acessível da região do carrossel */
  label: string;
  eyebrow?: string;
  title: string;
  description: string;
  /** Slides já renderizados como <li> filhos */
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Casca acessível dos carrosséis institucionais da Patro.
 * - Sem autoplay (o visitante controla o ritmo)
 * - Navegação por setas, teclado, swipe e scroll nativo (funciona sem JS)
 * - Respeita prefers-reduced-motion
 */
export const CarouselShell = ({
  label,
  eyebrow,
  title,
  description,
  children,
  footer,
  className = "",
}: CarouselShellProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      className={`py-16 md:py-24 ${className}`}
      aria-roledescription="carrossel"
      aria-label={label}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            {eyebrow && (
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-accent">
                {eyebrow}
              </span>
            )}
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mt-2">{title}</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">{description}</p>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 rounded-full"
              aria-label={`Ver itens anteriores: ${label}`}
              onClick={scrollPrev}
              disabled={!canPrev}
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 rounded-full"
              aria-label={`Ver próximos itens: ${label}`}
              onClick={scrollNext}
              disabled={!canNext}
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden -mx-1 px-1" ref={emblaRef}>
          <ul className="flex gap-5 list-none m-0 p-0">{children}</ul>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8">
          <div className="flex md:hidden items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 rounded-full"
              aria-label={`Ver itens anteriores: ${label}`}
              onClick={scrollPrev}
              disabled={!canPrev}
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 rounded-full"
              aria-label={`Ver próximos itens: ${label}`}
              onClick={scrollNext}
              disabled={!canNext}
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </div>
          {footer}
        </div>
      </div>
    </section>
  );
};

export default CarouselShell;
