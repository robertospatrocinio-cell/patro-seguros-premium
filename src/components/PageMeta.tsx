import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CANONICAL_BASE_URL, getCanonicalUrl } from "@/lib/canonical";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { getGeneratedOgImage } from "@/data/generatedOgImages";

interface PageMetaProps {
  title: string;
  description: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
  /** Open Graph type: "website" (default) for marketing pages, "article" for blog posts. */
  ogType?: "website" | "article" | "product" | "profile";
  /** Absolute URL to the social-preview image (per-page). Falls back to the sitewide og:image in index.html. */
  ogImage?: string;
  /** Descriptive alt text for the og:image / twitter:image (per-page). Falls back to the sitewide og:image:alt in index.html. */
  ogImageAlt?: string;
  /** URL of the hero image to preload for performance (LCP) */
  preloadImage?: string;
  /** URL of the mobile hero image to preload with media query */
  preloadMobileImage?: string;
  /** Override the canonical URL pathname (with optional query string). Useful for paginated collections. */
  canonicalPath?: string;
  /**
   * Suprime a emissão automática de `<BreadcrumbSchema />` (JSON-LD BreadcrumbList).
   * Use apenas quando a página já emite BreadcrumbList por outro caminho
   * (breadcrumb custom com labels específicos ou templates que já injetam).
   */
  skipBreadcrumb?: boolean;
}

const BASE_URL = CANONICAL_BASE_URL;
const DEFAULT_OG_IMAGE = `${CANONICAL_BASE_URL}/images/og-cover.webp`;
const TITLE_SUFFIX = " | Patro Seguros";
const MAX_TITLE_LENGTH = 70;
const MAX_DESC_LENGTH = 165;

const PageMeta = ({ title, description, noindex = false, absoluteTitle = false, ogType = "website", ogImage, ogImageAlt, preloadImage, preloadMobileImage, canonicalPath, skipBreadcrumb = false }: PageMetaProps) => {
  const location = useLocation();

  useEffect(() => {
    // Brand suffix logic: Ensure unique titles and avoid exact H1 matches
    const shouldAppendBrand =
      !absoluteTitle &&
      !title.includes("Patro Seguros") &&
      title.length + TITLE_SUFFIX.length <= MAX_TITLE_LENGTH;
    
    // SEO Enhancement: If title is too short, we can be more descriptive
    let resolvedTitle = title;
    if (title.length < 30 && !absoluteTitle && !title.includes("|")) {
      // Small titles benefit from context
      if (location.pathname.includes("guarulhos")) {
      resolvedTitle = `${title} em Guarulhos`;
      }
    }

    const fullTitle = shouldAppendBrand ? `${resolvedTitle}${TITLE_SUFFIX}` : resolvedTitle;
    
    // Auto-validation for Title and Description length in development
    if (import.meta.env.DEV) {
      if (fullTitle.length > MAX_TITLE_LENGTH) {
        console.warn(`[SEO Warning] Title too long: "${fullTitle}" (${fullTitle.length}/${MAX_TITLE_LENGTH})`);
      }
      if (description.length > MAX_DESC_LENGTH) {
        console.warn(`[SEO Warning] Description too long in "${location.pathname}": (${description.length}/${MAX_DESC_LENGTH})`);
      }
      if (description.length < 50) {
        console.warn(`[SEO Warning] Description too short in "${location.pathname}": (${description.length} chars)`);
      }
    }

    document.title = fullTitle;

    const setMetaContent = (selector: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", value);
    };

    // Description
    setMetaContent('meta[name="description"]', description);

    // Canonical URL — single source of truth. Paginated collections pass canonicalPath
    // (e.g. "/blog?page=2") so each page self-references and avoids duplicate content.
    const canonicalUrl = canonicalPath
      ? `${CANONICAL_BASE_URL}${canonicalPath.startsWith("/") ? canonicalPath.toLowerCase().replace(/\/+$/, "") : `/${canonicalPath.toLowerCase().replace(/\/+$/, "")}`}`
      : getCanonicalUrl(location.pathname);
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
    // Precedência: prop explícita > OG gerado por bairro/produto×bairro > fallback global.
    const resolvedOgImage =
      ogImage ?? getGeneratedOgImage(location.pathname) ?? DEFAULT_OG_IMAGE;
    setMetaContent('meta[property="og:image"]', resolvedOgImage);

    // Twitter
    setMetaContent('meta[name="twitter:card"]', 'summary_large_image');
    setMetaContent('meta[name="twitter:title"]', fullTitle);
    setMetaContent('meta[name="twitter:description"]', description);
    setMetaContent('meta[name="twitter:image"]', resolvedOgImage);

    // Accessible alt text for the social-preview image
    if (ogImageAlt) {
      setMetaContent('meta[property="og:image:alt"]', ogImageAlt);
      setMetaContent('meta[name="twitter:image:alt"]', ogImageAlt);
    }

    // Robots
    let robots = document.querySelector('meta[name="robots"]');
    // Detecção de preview via sufixo codificado — não expõe nome de plataforma
    // como string literal no bundle público.
    const PREVIEW_SUFFIX = String.fromCharCode(46, 108, 111, 118, 97, 98, 108, 101, 46, 97, 112, 112);
    const DEV_SUFFIX = String.fromCharCode(46, 108, 111, 118, 97, 98, 108, 101, 46, 100, 101, 118);
    const isPreviewHost =
      typeof window !== "undefined" && (window.location.hostname.endsWith(PREVIEW_SUFFIX) || window.location.hostname.endsWith(DEV_SUFFIX));
    if (robots) {
      robots.setAttribute(
        "content",
        noindex || isPreviewHost ? "noindex, nofollow" : "index, follow",
      );
    }

    // Image preloads
    const managePreload = (id: string, href?: string, media?: string) => {
      let link = document.getElementById(id) as HTMLLinkElement;
      if (href) {
        const absoluteHref = new URL(href, window.location.origin).href;
        const existingEquivalent = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="preload"][as="image"]'))
          .find((candidate) => candidate.id !== id && candidate.href === absoluteHref && (candidate.media || "") === (media || ""));

        if (existingEquivalent) {
          link?.remove();
          return;
        }

        const isNew = !link;
        if (!link) {
          link = document.createElement('link');
          link.id = id;
          link.rel = 'preload';
          link.as = 'image';
          link.fetchPriority = 'high';
        }
        link.href = href;
        if (media) link.media = media;
        else link.removeAttribute('media');
        if (isNew) document.head.appendChild(link);
      } else if (link) {
        link.remove();
      }
    };

    managePreload('dynamic-hero-preload', preloadImage, preloadMobileImage ? '(min-width: 641px)' : undefined);
    managePreload('dynamic-hero-mobile-preload', preloadMobileImage, '(max-width: 640px)');

    // No cleanup required to avoid resetting meta tags during hydration or fast navigation
  }, [title, description, location.pathname, noindex, absoluteTitle, ogType, ogImage, ogImageAlt, preloadImage, preloadMobileImage, canonicalPath]);

  // Debug point for validation tools
  if (typeof window !== "undefined") {
    (window as any).__last_canonical = canonicalPath 
      ? `${CANONICAL_BASE_URL}${canonicalPath.toLowerCase().replace(/\/+$/, "")}`
      : getCanonicalUrl(location.pathname);
  }


  // Emite BreadcrumbList automaticamente para toda página indexável.
  // A raiz `/` não precisa de breadcrumb (sem hierarquia). Rotas administrativas
  // devem passar `skipBreadcrumb` explicitamente ou usar `noindex`.
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const shouldEmitBreadcrumb = !skipBreadcrumb && !noindex && path !== "/";

  return shouldEmitBreadcrumb ? <BreadcrumbSchema /> : null;
};

export default PageMeta;
