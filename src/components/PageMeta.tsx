import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CANONICAL_BASE_URL, getCanonicalUrl } from "@/lib/canonical";

 interface PageMetaProps {
   title: string;
   description: string;
   noindex?: boolean;
   absoluteTitle?: boolean;
 }

const BASE_URL = CANONICAL_BASE_URL;

const PageMeta = ({ title, description, noindex = false }: PageMetaProps) => {
  const location = useLocation();

   useEffect(() => {
     const fullTitle = absoluteTitle ? title : `${title} | Patro Seguros`;
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
    if (canonical) {
      canonical.setAttribute("href", canonicalUrl);
    }

    // Open Graph
    setMetaContent('meta[property="og:title"]', fullTitle);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);

    // Twitter
    setMetaContent('meta[name="twitter:title"]', fullTitle);
    setMetaContent('meta[name="twitter:description"]', description);

    // Robots
    let robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      robots.setAttribute("content", noindex ? "noindex, nofollow" : "index, follow");
    }

     return () => {
       document.title = "Patro Seguros | Corretora em Guarulhos - Auto, Vida, Saúde, Empresarial";
       setMetaContent('meta[name="description"]', "Corretora de seguros em Guarulhos: auto, residencial, vida, saúde e frotas. Compare 16+ seguradoras. Cotação grátis em 2h. Patro Seguros (11) 5199-7500.");
      if (canonical) canonical.setAttribute("href", BASE_URL);
      setMetaContent('meta[property="og:url"]', BASE_URL);
      if (robots) robots.setAttribute("content", "index, follow");
    };
  }, [title, description, location.pathname, noindex]);

  return null;
};

export default PageMeta;
