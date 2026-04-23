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
}

const OptimizedImage = ({
  src,
  alt = "",
  eager = false,
  placeholderClass = "bg-muted",
  className = "",
  srcSet,
  sizes,
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
      { rootMargin: "200px" }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div ref={imgRef} className={`${placeholderClass} ${className}`}>
      {inView && (
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
      )}
    </div>
  );
};

export default OptimizedImage;
