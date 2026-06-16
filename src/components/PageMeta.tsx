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
    // Brand suffix logic
    const shouldAppendBrand =
      !absoluteTitle &&
      !title.includes("Patro Seguros") &&
      title.length + TITLE_SUFFIX.length <= MAX_TITLE_LENGTH;
    const fullTitle = shouldAppendBrand ? `${title}${TITLE_SUFFIX}` : title;
    document.title = fullTitle;

    const setMetaContent = (selector: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", value);
    };

    // Description
    setMetaContent('meta[name="description"]', description);

    // Canonical URL — single source of truth
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
  }, [title, description, location.pathname, noindex, absoluteTitle, ogType, ogImage, preloadImage, preloadMobileImage]);

  return null;
};

export default PageMeta;
