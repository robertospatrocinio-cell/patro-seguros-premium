import { getCanonicalUrl } from "./canonical";
import { supabase } from "@/integrations/supabase/client";

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
        // Skip invalid JSON
      }
    }

    // Save to history in background if it's a real run
    await supabase.from('schema_audits').insert({
      page_path: path,
      has_breadcrumb: result.hasBreadcrumb,
      has_faq: result.hasFAQ,
      has_rating: result.hasAggregateRating,
      errors: result.errors
    });

  } catch (error) {
    result.errors.push(`Erro ao acessar página: ${error instanceof Error ? error.message : String(error)}`);
  }

  return result;
};

