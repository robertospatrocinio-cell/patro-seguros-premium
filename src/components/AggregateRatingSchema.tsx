/**
 * AggregateRatingSchema
 *
 * Injects a Service schema with aggregateRating on each product page so Google
 * can show review-snippet stars in the SERP. Uses the consolidated Patro Seguros
 * Google Reviews rating (single source of truth: PATRO_RATING).
 *
 * Spec reference: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 */

export const PATRO_RATING = {
  ratingValue: "4.9",
  reviewCount: "150",
  bestRating: "5",
  worstRating: "1",
} as const;

interface AggregateRatingSchemaProps {
  /** Service / product name (e.g. "Seguro Auto em Guarulhos") */
  serviceName: string;
  /** Canonical URL of the page */
  url: string;
  /** Optional short description shown in rich results context */
  description?: string;
  /** Override rating numbers if needed (defaults to consolidated 4.9 / 150) */
  rating?: typeof PATRO_RATING;
}

const AggregateRatingSchema = ({
  serviceName,
  url,
  description,
  rating = PATRO_RATING,
}: AggregateRatingSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    serviceType: serviceName,
    url,
    ...(description ? { description } : {}),
    provider: {
      "@type": "InsuranceAgency",
      "@id": "https://www.patroseguros.com.br/#organization",
      name: "Patro Seguros",
      url: "https://www.patroseguros.com.br",
      telephone: "+551151997500",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Salgado Filho, 2120, Ed. Via Alameda – Sala 219",
        addressLocality: "Guarulhos",
        addressRegion: "SP",
        postalCode: "07115-000",
        addressCountry: "BR",
      },
    },
    areaServed: [
      { "@type": "City", name: "Guarulhos" },
      { "@type": "State", name: "São Paulo" },
      { "@type": "Country", name: "Brasil" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.ratingValue,
      reviewCount: rating.reviewCount,
      bestRating: rating.bestRating,
      worstRating: rating.worstRating,
      itemReviewed: serviceName,
    },
  };

  return (
    <script
      type="application/ld+json"
      data-aggregate-rating-schema="true"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default AggregateRatingSchema;