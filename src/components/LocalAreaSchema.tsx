/**
 * LocalAreaSchema
 *
 * Extra JSON-LD for hyper-local pages (bairro / cidade / produto + região).
 * Adds a Service schema with explicit `areaServed` (Place + City), linked
 * via @id to the global LocalBusinessSchema, plus AggregateRating for
 * review-snippet stars in the SERP. Pairs with FAQSchema and BreadcrumbSchema
 * already injected by InsurancePageTemplate to maximize rich results.
 */

import { PATRO_RATING } from "@/components/AggregateRatingSchema";

interface LocalAreaSchemaProps {
  serviceName: string;
  url: string;
  description: string;
  city: string;
  neighborhood?: string;
  geo?: { latitude: number; longitude: number };
  priceRange?: { min: number; max: number; currency?: string };
}

const LocalAreaSchema = ({
  serviceName,
  url,
  description,
  city,
  neighborhood,
  geo,
  priceRange,
}: LocalAreaSchemaProps) => {
  const areaServed: Record<string, unknown>[] = [
    { "@type": "City", name: city, containedInPlace: { "@type": "State", name: "São Paulo" } },
  ];
  if (neighborhood) {
    areaServed.unshift({
      "@type": "Place",
      name: `${neighborhood}, ${city}`,
      ...(geo
        ? { geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude } }
        : {}),
    });
  }

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: serviceName,
    serviceType: serviceName,
    description,
    url,
    areaServed,
    provider: {
      "@type": "InsuranceAgency",
      "@id": "https://www.patroseguros.com.br/#insurance-agency",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: PATRO_RATING.ratingValue,
      reviewCount: PATRO_RATING.reviewCount,
      bestRating: PATRO_RATING.bestRating,
      worstRating: PATRO_RATING.worstRating,
      itemReviewed: serviceName,
    },
  };

  if (priceRange) {
    schema.offers = {
      "@type": "AggregateOffer",
      priceCurrency: priceRange.currency ?? "BRL",
      lowPrice: priceRange.min,
      highPrice: priceRange.max,
      availability: "https://schema.org/InStock",
    };
  }

  return (
    <script
      type="application/ld+json"
      data-local-area-schema="true"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalAreaSchema;