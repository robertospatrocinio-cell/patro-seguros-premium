import { Helmet } from "react-helmet-async";
import React, { ReactNode } from "react";
import { stripHtml } from "@/components/BrandText";

interface FAQItem {
  question: ReactNode;
  answer: ReactNode;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  const validFaqs = faqs.filter(faq => {
    const q = stripHtml(faq.question);
    const a = stripHtml(faq.answer);
    return q?.trim() && a?.trim();
  });
  
  if (validFaqs.length < 2) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": validFaqs.map((faq) => ({
      "@type": "Question",
      "name": stripHtml(faq.question).trim(),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": stripHtml(faq.answer).trim()
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default FAQSchema;
