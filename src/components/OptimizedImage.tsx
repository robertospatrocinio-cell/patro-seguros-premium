import { useState, useRef, useEffect, ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Imagens críticas carregam imediatamente; as demais usam lazy nativo. */
  eager?: boolean;
  placeholderClass?: string;
  srcSet?: string;
  sizes?: string;
  avifSrc?: string;
  mobileSrc?: string;
  mobileMedia?: string;
  decoding?: "async" | "auto" | "sync";
}

const OptimizedImage = ({
  src,
  alt = "Patro Seguros",
  eager = false,
  placeholderClass = "bg-muted",
  className = "",
  srcSet,
  sizes,
  avifSrc,
  mobileSrc,
  mobileMedia = "(max-width: 640px)",
  decoding = "async",
  loading,
  fetchPriority,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) => {
  const critical = eager || loading === "eager";
  const [loaded, setLoaded] = useState(critical);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Imagens em cache podem terminar antes de o efeito ser executado.
    setLoaded(critical || !!imgRef.current?.complete);
  }, [src, srcSet, avifSrc, mobileSrc, critical]);

  const imgEl = (
    <img
      {...props}
      ref={imgRef}
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      loading={critical ? "eager" : loading ?? "lazy"}
      decoding={decoding}
      {...{ fetchpriority: fetchPriority ?? (critical ? "high" : "auto") }}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      onError={(event) => {
        setLoaded(true);
        onError?.(event);
      }}
      className={`w-full h-full object-cover ${critical ? "" : "transition-opacity duration-500"} ${
        critical || loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );

  return (
    <div
      className={`${placeholderClass} ${className}`}
      style={{
        aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : undefined,
        contain: "paint",
      }}
    >
      {/* Uma única estratégia de lazy loading: o navegador descobre a imagem
          no HTML e decide quando baixar, sem esperar um segundo observer. */}
      {avifSrc || mobileSrc ? (
        <picture>
          {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
          {mobileSrc && <source media={mobileMedia} srcSet={mobileSrc} type="image/webp" />}
          {imgEl}
        </picture>
      ) : imgEl}
    </div>
  );
};

export default OptimizedImage;
