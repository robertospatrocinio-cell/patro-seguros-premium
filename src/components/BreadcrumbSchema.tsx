import { getCanonicalUrl } from "@/lib/canonical";

interface BreadcrumbItem {
  name: string;
  /** Full URL or path. Path-only values are normalized to the canonical host. */
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      // Normalize: accept both absolute URLs and root-relative paths and
      // collapse them to the canonical host (https://www.patroseguros.com.br).
      "item": item.url.startsWith("http")
        ? getCanonicalUrl(new URL(item.url).pathname)
        : getCanonicalUrl(item.url),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default BreadcrumbSchema;
