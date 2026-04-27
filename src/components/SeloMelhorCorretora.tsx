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

const SeloMelhorCorretora = ({ size = "md", className = "", priority = false }: SeloMelhorCorretoraProps) => {
  const { cls, w } = SIZE_MAP[size];
  return (
    <img
      src="/images/selo-melhor-corretora.png"
      alt="Selo Melhor Corretora de Seguros de Guarulhos"
      width={w}
      height={w}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`${cls} object-contain transition-transform duration-300 hover:scale-110 ${className}`}
    />
  );
};

export default SeloMelhorCorretora;
