import { useEffect, useRef, useState, type CSSProperties } from "react";

interface LazyMapEmbedProps {
  src: string;
  title: string;
  className?: string;
  style?: CSSProperties;
  height?: number | string;
  width?: number | string;
  /** Distance from viewport (px) at which the iframe boots. */
  rootMargin?: string;
}

let preconnectInjected = false;
function injectMapsPreconnect() {
  if (preconnectInjected || typeof document === "undefined") return;
  preconnectInjected = true;
  const hosts = [
    "https://www.google.com",
    "https://maps.googleapis.com",
    "https://maps.gstatic.com",
  ];
  hosts.forEach((href) => {
    const l = document.createElement("link");
    l.rel = "preconnect";
    l.href = href;
    l.crossOrigin = "";
    document.head.appendChild(l);
  });
}

/**
 * Mounts a Google Maps embed only when it approaches the viewport.
 * Compared to native `loading="lazy"` on an <iframe>, this saves the
 * ~500 KB of Maps JS/CSS/tiles whenever the map is below the fold
 * and the user never scrolls to it — and avoids competing with LCP
 * on pages where the map sits mid-fold.
 */
const LazyMapEmbed = ({
  src,
  title,
  className = "",
  style,
  height = "100%",
  width = "100%",
  rootMargin = "200px",
}: LazyMapEmbedProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          injectMapsPreconnect();
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, visible]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ width, height, background: "#eef2f6", ...style }}
      aria-label={title}
    >
      {visible && (
        <iframe
          src={src}
          title={title}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default LazyMapEmbed;