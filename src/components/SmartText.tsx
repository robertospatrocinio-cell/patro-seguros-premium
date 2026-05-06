import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { CONTEXTUAL_KEYWORDS, type KeywordLink } from "@/lib/contextualKeywords";

interface SmartTextProps {
  text: string;
  className?: string;
  /**
   * Maximum number of distinct keywords to link inside this single text block.
   * Keeps the prose clean and avoids over-optimization patterns.
   */
  maxLinks?: number;
  /**
   * Set of keywords already linked elsewhere on the page (mutated). Pass the
   * same Set to multiple SmartText siblings to dedupe across the whole page.
   */
  linkedKeywords?: Set<string>;
  /**
   * Element to render as the wrapper. Defaults to <p>.
   */
  as?: "p" | "span" | "div";
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Picks at most `maxLinks` distinct keywords to convert into internal <Link>s.
 * - longest keywords first (avoids matching "consórcio" before "consórcio de carro")
 * - skips keywords already linked on the page
 * - skips keywords whose href equals the current pathname (no self-links)
 * - links only the FIRST occurrence of each chosen keyword
 */
const SmartText = ({
  text,
  className,
  maxLinks = 2,
  linkedKeywords,
  as: Tag = "p",
}: SmartTextProps) => {
  const { pathname } = useLocation();

  const nodes = useMemo(() => {
    if (!text) return [text];

    const seen = linkedKeywords ?? new Set<string>();
    const candidates: KeywordLink[] = [...CONTEXTUAL_KEYWORDS]
      .filter((k) => k.href !== pathname && !seen.has(k.keyword.toLowerCase()))
      .sort((a, b) => b.keyword.length - a.keyword.length);

    type Match = { start: number; end: number; link: KeywordLink; matched: string };
    const matches: Match[] = [];
    const used: Array<[number, number]> = [];
    let linksLeft = maxLinks;

    for (const link of candidates) {
      if (linksLeft <= 0) break;
      const re = new RegExp(`\\b${escapeRegex(link.keyword)}\\b`, "i");
      const m = re.exec(text);
      if (!m) continue;
      const start = m.index;
      const end = start + m[0].length;
      // skip if overlaps another already-chosen match
      const overlaps = used.some(([s, e]) => start < e && end > s);
      if (overlaps) continue;
      matches.push({ start, end, link, matched: m[0] });
      used.push([start, end]);
      seen.add(link.keyword.toLowerCase());
      linksLeft--;
    }

    if (matches.length === 0) return [text];

    matches.sort((a, b) => a.start - b.start);
    const out: (string | JSX.Element)[] = [];
    let cursor = 0;
    matches.forEach((m, i) => {
      if (m.start > cursor) out.push(text.slice(cursor, m.start));
      out.push(
        <Link
          key={`sl-${i}-${m.start}`}
          to={m.link.href}
          title={m.link.title ?? m.link.keyword}
          className="text-primary underline-offset-4 hover:underline font-medium"
        >
          {m.matched}
        </Link>
      );
      cursor = m.end;
    });
    if (cursor < text.length) out.push(text.slice(cursor));
    return out;
  }, [text, pathname, maxLinks, linkedKeywords]);

  return <Tag className={className}>{nodes}</Tag>;
};

export default SmartText;
