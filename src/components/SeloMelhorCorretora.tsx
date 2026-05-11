import { memo, useEffect, useState } from "react";

interface SeloMelhorCorretoraProps {
  /** Tamanho do selo. sm: 80px, md: 112px, lg: 144px, xl: 176px */
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Se true, marca como prioritário para LCP (use só na home/hero) */
  priority?: boolean;
}

const SIZE_MAP = {
  sm: { cls: "w-20 h-20", w: 80 },
  md: { cls: "w-28 h-28", w: 112 },
  lg: { cls: "w-28 h-28 md:w-36 md:h-36", w: 144 },
  xl: { cls: "w-32 h-32 md:w-44 md:h-44", w: 176 },
} as const;

const SeloMelhorCorretora = memo(({ size = "md", className = "", priority = false }: SeloMelhorCorretoraProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // If not high priority, we can wait for hydration to render
    if (!priority) {
      setIsClient(true);
    }
  }, [priority]);

  if (!priority && !isClient) {
    const { cls, w } = SIZE_MAP[size];
    return <div className={`${cls} ${className} bg-muted/10 rounded-full animate-pulse`} style={{ width: w, height: w }} />;
  }

  const { cls, w } = SIZE_MAP[size];
  const base = "/images/selo-melhor-corretora";
  const webpSrcSet = `${base}.webp 1x, ${base}@2x.webp 2x, ${base}@3x.webp 3x`;
  const pngSrcSet = `${base}.png 1x, ${base}@2x.png 2x, ${base}@3x.png 3x`;
  return (
    <picture>
      <source type="image/webp" srcSet={webpSrcSet} />
      <img
        src={`${base}.png`}
        srcSet={pngSrcSet}
         alt="Corretora de Seguros Patro em Guarulhos - Atendimento Presencial - Selo de Qualidade"
        width={w}
        height={w}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className={`${cls} object-contain transition-transform duration-300 hover:scale-110 ${className}`}
      />
    </picture>
  );
});

export default SeloMelhorCorretora;
