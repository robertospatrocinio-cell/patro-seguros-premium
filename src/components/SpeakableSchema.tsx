/**
 * SpeakableSchema — sinaliza para Google Assistant, Alexa e leitores IA
 * quais seletores CSS contêm as respostas "faladas" da página.
 *
 * Uso:
 *   <SpeakableSchema selectors={["h1", '[data-speakable="answer"]', '[data-speakable="faq"] h3']} />
 *
 * Marque o parágrafo answer-first / TL;DR com data-speakable="answer" e
 * o container das FAQs com data-speakable="faq".
 */

interface SpeakableSchemaProps {
  /** Seletores CSS (xpath NÃO suportado por questão de compatibilidade). */
  selectors?: string[];
  /** URL canônica da página que hospeda o schema. Opcional. */
  url?: string;
}

const DEFAULT_SELECTORS = [
  "h1",
  '[data-speakable="answer"]',
  '[data-speakable="faq"] h3',
  '[data-speakable="faq"] [data-speakable-answer]',
];

const SpeakableSchema = ({ selectors = DEFAULT_SELECTORS, url }: SpeakableSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    ...(url ? { url, "@id": `${url}#speakable` } : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: selectors,
    },
    inLanguage: "pt-BR",
  };

  return (
    <script
      type="application/ld+json"
      data-speakable-schema="true"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SpeakableSchema;