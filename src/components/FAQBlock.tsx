import { ArrowRight } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  /** Section title rendered as <h2>. */
  title?: string;
  /** Optional eyebrow above the title. */
  eyebrow?: string;
  /** List of Q/A items. */
  items: FAQItem[];
  /** ID used by aria-labelledby. */
  headingId?: string;
  /** Tailwind override for outer <section>. */
  className?: string;
}

/**
 * Padronized FAQ accordion used across pillars, hubs and niche pages.
 * Uses native <details>/<summary> for SEO/AEO friendliness — Googlebot reads
 * collapsed content and `data-speakable="faq"` flags it for voice surfaces.
 */
const FAQBlock = ({
  title = "Perguntas frequentes",
  eyebrow,
  items,
  headingId = "faq-heading",
  className = "py-16",
}: FAQBlockProps) => {
  if (!items?.length) return null;

  return (
    <section className={className} aria-labelledby={headingId}>
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          {eyebrow && <span className="section-label">{eyebrow}</span>}
          <h2 id={headingId} className="mt-3">
            {title}
          </h2>
        </div>
        <div className="space-y-4" data-speakable="faq">
          {items.map((faq, i) => (
            <details key={i} className="group premium-card overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-[15px] font-semibold pr-4">{faq.question}</h3>
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQBlock;