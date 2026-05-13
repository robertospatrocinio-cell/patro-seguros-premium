import { servicePagesContent } from "@/data/seoServiceContent";

interface PrerenderTextProps {
  slug: keyof typeof servicePagesContent;
}

/**
 * Component that renders hidden text content for indexability.
 * This content is visible to crawlers and screen readers.
 * For users, it's redundant with the template-rendered content but
 * ensures a flat textual block exists in the DOM for non-JS bots.
 */
const PrerenderText = ({ slug }: PrerenderTextProps) => {
  const content = servicePagesContent[slug]?.content;
  if (!content) return null;

  return (
    <div className="sr-only" aria-hidden="false">
      {content}
    </div>
  );
};

export default PrerenderText;
