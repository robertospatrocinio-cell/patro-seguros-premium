/**
 * Helpers to generate responsive srcSet/sizes for images.
 * Focused on Unsplash URLs (which support &w= param) — the main
 * source of large decorative images in the codebase.
 */

const DEFAULT_WIDTHS = [400, 640, 828, 1200, 1600];

/**
 * Given an Unsplash URL, returns a srcSet string across the provided widths.
 * Non-Unsplash URLs return undefined (caller should skip the attr).
 */
export function unsplashSrcSet(url: string, widths: number[] = DEFAULT_WIDTHS): string | undefined {
  if (!url || !/images\.unsplash\.com/.test(url)) return undefined;
  const base = url.replace(/([?&])w=\d+/g, "$1").replace(/[?&]$/, "");
  const sep = base.includes("?") ? "&" : "?";
  return widths.map((w) => `${base}${sep}w=${w}&auto=format&fit=crop&q=75 ${w}w`).join(", ");
}

/**
 * Standard sizes hint for full-width hero/banner images.
 */
export const FULL_WIDTH_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw";

/**
 * Sizes for content images bounded to a container ~1200px.
 */
export const CONTAINED_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px";

/**
 * Sizes for card-grid thumbs (3-col desktop, 1-col mobile).
 */
export const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * Sizes for small logo/avatar thumbnails.
 */
export const THUMB_SIZES = "(max-width: 640px) 25vw, 96px";