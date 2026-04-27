import { useState, useRef, useEffect, ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Use native lazy loading + IntersectionObserver fallback */
  eager?: boolean;
  /** Low-quality placeholder color or gradient */
  placeholderClass?: string;
  /** Responsive srcset (e.g. "img-400.webp 400w, img-800.webp 800w") */
  srcSet?: string;
  /** Responsive sizes (e.g. "(max-width: 768px) 100vw, 50vw") */
  sizes?: string;
  /** Optional AVIF source for next-gen format priority */
  avifSrc?: string;
  /** Optional smaller WebP variant served on mobile via media query */
  mobileSrc?: string;
  /** Media query that triggers mobileSrc (default: max-width: 640px) */
  mobileMedia?: string;
}

const OptimizedImage = ({
  src,
  alt = "",
  eager = false,
  placeholderClass = "bg-muted",
  className = "",
  srcSet,
  sizes,
  avifSrc,
  mobileSrc,
  mobileMedia = "(max-width: 640px)",
  ...props
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(eager);
  const [inView, setInView] = useState(eager);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eager || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [eager]);

  const imgEl = (
    <img
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      fetchPriority={eager ? "high" : "auto"}
      onLoad={eager ? undefined : () => setLoaded(true)}
      width={props.width}
      height={props.height}
      className={`w-full h-full object-cover ${eager ? "" : "transition-opacity duration-500"} ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      {...props}
    />
  );

  const useSourceWrapper = !!(avifSrc || mobileSrc);

  return (
    <div ref={imgRef} className={`${placeholderClass} ${className}`}>
      {inView && (
        useSourceWrapper ? (
          <picture>
            {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
            {mobileSrc && <source media={mobileMedia} srcSet={mobileSrc} type="image/webp" />}
            {imgEl}
          </picture>
        ) : (
          imgEl
        )
      )}
    </div>
  );
};

export default OptimizedImage;
