interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  /**
   * When true (default), includes a SpeakableSpecification pointing at the
   * rendered FAQ container. Pages must render the FAQ list with the attribute
   * `data-speakable="faq"` for voice assistants to pick the right region.
   */
  speakable?: boolean;
}

const FAQSchema = ({ faqs, speakable = true }: FAQSchemaProps) => {
  if (!faqs.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question.trim(),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.trim()
      }
    })),
    ...(speakable ? {
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["[data-speakable='faq']", "#faq-heading"]
      }
    } : {})
  };

  return (
    <script
      type="application/ld+json"
      data-faq-schema="true"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default FAQSchema;
