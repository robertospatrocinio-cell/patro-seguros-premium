import { useState, useRef, useEffect, ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Use native lazy loading + IntersectionObserver fallback */
  eager?: boolean;
  /** Low-quality placeholder color or gradient */
  placeholderClass?: string;
}

const OptimizedImage = ({
  src,
  alt = "",
  eager = false,
  placeholderClass = "bg-muted",
  className = "",
  ...props
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
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
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
