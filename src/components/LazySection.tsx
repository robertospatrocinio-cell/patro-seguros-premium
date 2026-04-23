import { useState, useRef, useEffect, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** Placeholder height to prevent CLS */
  minHeight?: string;
  /** How far before viewport to start rendering */
  rootMargin?: string;
  className?: string;
}

const LazySection = ({
  children,
  minHeight = "200px",
  rootMargin = "300px",
  className = "",
}: LazySectionProps) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
};

export default LazySection;