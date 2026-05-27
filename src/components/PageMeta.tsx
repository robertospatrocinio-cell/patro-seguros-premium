import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CANONICAL_BASE_URL, getCanonicalUrl } from "@/lib/canonical";

 interface PageMetaProps {
   title: string;
   description: string;
   noindex?: boolean;
   absoluteTitle?: boolean;
   /** Open Graph type: "website" (default) for marketing pages, "article" for blog posts. */
   ogType?: "website" | "article" | "product" | "profile";
    /** Absolute URL to the social-preview image (per-page). Falls back to the sitewide og:image in index.html. */
    ogImage?: string;
    /** URL of the hero image to preload for performance (LCP) */
    preloadImage?: string;
    /** URL of the mobile hero image to preload with media query */
    preloadMobileImage?: string;
  }

const BASE_URL = CANONICAL_BASE_URL;
const DEFAULT_OG_IMAGE = `${CANONICAL_BASE_URL}/images/og-cover.webp`;
const TITLE_SUFFIX = " | Patro Seguros";
const MAX_TITLE_LENGTH = 60;

 const PageMeta = ({ title, description, noindex = false, absoluteTitle = false, ogType = "website", ogImage, preloadImage, preloadMobileImage }: PageMetaProps) => {
  const location = useLocation();

   useEffect(() => {
     // Brand suffix only if title doesn't already contain "Patro Seguros" AND adding it
     // would keep the final title within Google's ~60-char display limit. This prevents
     // truncation in SERPs across all service/local pages that use PageMeta.
     const shouldAppendBrand =
       !absoluteTitle &&
       !title.includes("Patro Seguros") &&
       title.length + TITLE_SUFFIX.length <= MAX_TITLE_LENGTH;
     const fullTitle = shouldAppendBrand ? `${title}${TITLE_SUFFIX}` : title;
     document.title = fullTitle;

    // Meta description
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr === "property" ? "content" : attr, value);
      }
    };

    const setMetaContent = (selector: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", value);
    };

    // Description
    setMetaContent('meta[name="description"]', description);

    // Canonical URL — single source of truth (strips query/hash, normalizes slashes)
    const canonicalUrl = getCanonicalUrl(location.pathname);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    if (canonical) {
      canonical.setAttribute("href", canonicalUrl);
    }

    // Open Graph
    setMetaContent('meta[property="og:title"]', fullTitle);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[property="og:type"]', ogType);
    setMetaContent('meta[property="og:image"]', ogImage ?? DEFAULT_OG_IMAGE);

    // Twitter
    setMetaContent('meta[name="twitter:title"]', fullTitle);
    setMetaContent('meta[name="twitter:description"]', description);
    setMetaContent('meta[name="twitter:image"]', ogImage ?? DEFAULT_OG_IMAGE);

    // Robots
    let robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      robots.setAttribute("content", noindex ? "noindex, nofollow" : "index, follow");
    }

    // Image preloads
    const managePreload = (id: string, href?: string, media?: string) => {
      let link = document.getElementById(id) as HTMLLinkElement;
      if (href) {
        if (!link) {
          link = document.createElement('link');
          link.id = id;
          link.rel = 'preload';
          link.as = 'image';
          link.fetchPriority = 'high';
          document.head.appendChild(link);
        }
        link.href = href;
        if (media) link.media = media;
        else link.removeAttribute('media');
      } else if (link) {
        link.remove();
      }
    };

    managePreload('dynamic-hero-preload', preloadImage, preloadMobileImage ? '(min-width: 641px)' : undefined);
    managePreload('dynamic-hero-mobile-preload', preloadMobileImage, '(max-width: 640px)');

     return () => {
       document.title = "Patro Seguros | Corretora de Seguros em Guarulhos";
       setMetaContent('meta[name="description"]', "Corretora de seguros em Guarulhos: auto, residencial, vida, saúde e frotas. Compare 16+ seguradoras. Cotação grátis em 2h. Patro Seguros (11) 5199-7500.");
      if (canonical) canonical.setAttribute("href", BASE_URL);
      setMetaContent('meta[property="og:url"]', BASE_URL);
      setMetaContent('meta[property="og:type"]', "website");
      setMetaContent('meta[property="og:image"]', DEFAULT_OG_IMAGE);
      setMetaContent('meta[name="twitter:image"]', DEFAULT_OG_IMAGE);
      if (robots) robots.setAttribute("content", "index, follow");
    };
  }, [title, description, location.pathname, noindex, absoluteTitle, ogType, ogImage, preloadImage, preloadMobileImage]);

  return null;
};

export default PageMeta;
