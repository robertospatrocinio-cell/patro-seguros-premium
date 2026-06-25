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
  // Review-snippet eligible parent type → LocalBusiness (InsuranceAgency).
  // Google rejects `Service` as a valid parent for AggregateRating, so we
  // attach the rating directly to the InsuranceAgency entity.
  const agencyId = "https://www.patroseguros.com.br/#insurance-agency";
  const schema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": agencyId,
    name: "Patro Seguros",
    url: "https://www.patroseguros.com.br",
    telephone: "+551151997500",
    image: "https://www.patroseguros.com.br/images/logo-full.webp",
    priceRange: "$$",
    ...(description ? { description } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Salgado Filho, 2120, Ed. Via Alameda – Sala 219",
      addressLocality: "Guarulhos",
      addressRegion: "SP",
      postalCode: "07115-000",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Guarulhos", sameAs: "https://pt.wikipedia.org/wiki/Guarulhos" },
      { "@type": "City", name: "São Paulo", sameAs: "https://pt.wikipedia.org/wiki/S%C3%A3o_Paulo" },
      { "@type": "Country", name: "Brasil" },
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: serviceName, url },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.ratingValue,
      reviewCount: rating.reviewCount,
      bestRating: rating.bestRating,
      worstRating: rating.worstRating,
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