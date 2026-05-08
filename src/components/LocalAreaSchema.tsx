/**
 * LocalAreaSchema
 *
 * Unified JSON-LD `@graph` for hyper-local pages (bairro / cidade / produto
 * + região). Emits, in a single `<script>`:
 *
 *   1. Service node with explicit `areaServed` (Place + City) and AggregateOffer
 *   2. AggregateRating node (4.9 / 150 — from PATRO_RATING) referenced via @id
 *      so Service.aggregateRating, InsuranceAgency.aggregateRating and the
 *      review snippet all point to the same entity (no duplicate-rating warnings)
 *   3. FAQPage node (when `faqs` is provided), linked via mainEntityOfPage to
 *      the page URL — replaces the standalone <FAQSchema> for local pages so
 *      we never emit two FAQPage blocks on the same URL
 *
 * Pairs with `LocalBusinessSchema` and `BreadcrumbSchema` injected by
 * InsurancePageTemplate. When this component handles ratings/FAQ, the parent
 * LocalPageTemplate must pass `skipFAQSchema` and `skipAggregateRating` to
 * InsurancePageTemplate to keep the page's structured data graph consistent.
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
  /** When provided, also emits a FAQPage node inside the same graph. */
  faqs?: { question: string; answer: string }[];
}

const LocalAreaSchema = ({
  serviceName,
  url,
  description,
  city,
  neighborhood,
  geo,
  priceRange,
  faqs,
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

  const ratingId = "https://www.patroseguros.com.br/#aggregate-rating";
  const agencyId = "https://www.patroseguros.com.br/#insurance-agency";
  const serviceId = `${url}#service`;

  const aggregateRatingNode = {
    "@type": "AggregateRating",
    "@id": ratingId,
    ratingValue: PATRO_RATING.ratingValue,
    reviewCount: PATRO_RATING.reviewCount,
    bestRating: PATRO_RATING.bestRating,
    worstRating: PATRO_RATING.worstRating,
    itemReviewed: { "@id": agencyId },
  };

  const serviceNode: Record<string, unknown> = {
    "@type": "Service",
    "@id": serviceId,
    name: serviceName,
    serviceType: serviceName,
    description,
    url,
    areaServed,
    provider: {
      "@type": "InsuranceAgency",
      "@id": agencyId,
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
      // Same rating, referenced — never duplicated.
      aggregateRating: { "@id": ratingId },
    },
    // Service-level rating reference keeps SERP review snippet eligible
    // while pointing to the same canonical AggregateRating node.
    aggregateRating: { "@id": ratingId },
  };

  if (priceRange) {
    serviceNode.offers = {
      "@type": "AggregateOffer",
      priceCurrency: priceRange.currency ?? "BRL",
      lowPrice: priceRange.min,
      highPrice: priceRange.max,
      availability: "https://schema.org/InStock",
    };
  }

  const graph: Record<string, unknown>[] = [serviceNode, aggregateRatingNode];

  if (faqs && faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntityOfPage: url,
      // Voice-assistant ready (matches `data-speakable="faq"` rendered region).
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ['[data-speakable="faq"]', "#faq-heading"],
      },
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      data-local-area-schema="true"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalAreaSchema;