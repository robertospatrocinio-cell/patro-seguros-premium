/**
 * Canonical URL helper
 *
 * Single source of truth for building canonical URLs across PageMeta, JSON-LD
 * schemas (AggregateRating, Article, Breadcrumb, etc.) and Open Graph tags.
 *
 * Rules:
 *  - Always use the apex `www.patroseguros.com.br` host (matches the canonical
 *    declared in <head>).
 *  - Always use https.
 *  - Strip query strings and hash fragments — those should never be part of a
 *    canonical URL.
 *  - Collapse the homepage to the bare origin (no trailing slash) to match the
 *    canonical link emitted by PageMeta.
 *  - Remove trailing slashes on subpaths to keep one URL per resource.
 *  - NORMALIZE: Ensure the pathname is clean, lowercased, and follows the "no trailing slash" rule strictly.
 */

export const CANONICAL_BASE_URL = "https://www.patroseguros.com.br";

export const getCanonicalUrl = (pathname: string): string => {
  if (!pathname || pathname === "/" || pathname === "") return CANONICAL_BASE_URL;

  // Drop query/hash and normalize to lowercase
  let path = pathname.split("?")[0].split("#")[0].toLowerCase();

  // Remove trailing slash strictly
  path = path.replace(/\/+$/, "");

  // Handle root again after cleaning
  if (!path || path === "") return CANONICAL_BASE_URL;

  // Ensure leading slash
  if (!path.startsWith("/")) path = `/${path}`;

  return `${CANONICAL_BASE_URL}${path}`;
};
