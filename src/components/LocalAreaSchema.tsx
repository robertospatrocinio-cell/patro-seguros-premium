/**
 * LocalAreaSchema
 *
 * Extra JSON-LD for hyper-local pages (bairro / cidade / produto + região).
 * Adds a Place + Service schema with explicit `areaServed` for the
 * neighborhood, complementing the global LocalBusinessSchema.
 */

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