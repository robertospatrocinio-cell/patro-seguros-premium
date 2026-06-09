import { getCanonicalUrl } from "./canonical";

export interface SchemaCheckResult {
  url: string;
  hasBreadcrumb: boolean;
  hasFAQ: boolean;
  hasAggregateRating: boolean;
  errors: string[];
}

export const checkPageSchemas = async (path: string): Promise<SchemaCheckResult> => {
  const fullUrl = getCanonicalUrl(path);
  const result: SchemaCheckResult = {
    url: fullUrl,
    hasBreadcrumb: false,
    hasFAQ: false,
    hasAggregateRating: false,
    errors: [],
  };

  try {
    const response = await fetch(path);
    const html = await response.text();
    
    // Check for script tags with ld+json
    const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    
    while ((match = scriptRegex.exec(html)) !== null) {
      try {
        const json = JSON.parse(match[1]);
        const graphs = json["@graph"] || [json];
        
        for (const node of graphs) {
          if (node["@type"] === "BreadcrumbList") result.hasBreadcrumb = true;
          if (node["@type"] === "FAQPage") result.hasFAQ = true;
          if (node["@type"] === "AggregateRating" || (node["@type"] === "Service" && node.aggregateRating)) {
            result.hasAggregateRating = true;
          }
        }
      } catch (e) {
        // Skip invalid JSON in scripts
      }
    }
  } catch (error) {
    result.errors.push(`Erro ao acessar página: ${error instanceof Error ? error.message : String(error)}`);
  }

  return result;
};
