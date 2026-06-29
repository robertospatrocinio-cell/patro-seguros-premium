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

const AggregateRatingSchema = (_props: AggregateRatingSchemaProps) => {
  /**
   * NO-OP: o aggregateRating agora vive no bloco estático de InsuranceAgency
   * em `index.html` (mesmo @id #insurance-agency). Emitir aqui criava um
   * segundo nó InsuranceAgency com mesmo @id mas dados divergentes
   * (sem geo/openingHours), e o Google reportava no URL Inspection como
   * "Invalid object type for field <parent_node>" em Review snippets.
   *
   * Mantemos o componente exportado por compatibilidade com os imports
   * existentes em ~30 páginas — pode ser removido em refactor futuro.
   */
  return null;
};

export default AggregateRatingSchema;