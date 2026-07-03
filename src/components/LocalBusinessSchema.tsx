/**
 * LocalBusinessSchema — NO-OP.
 *
 * O bloco InsuranceAgency+LocalBusiness (@id = #insurance-agency) é emitido
 * estaticamente em `index.html` e servido em todas as rotas do SPA. Emitir
 * outro nó via Helmet criava um segundo LocalBusiness com @id diferente
 * (#local-business), gerando dados divergentes (endereço, horário, sameAs)
 * no mesmo documento — fonte de conflito no Google URL Inspection.
 *
 * Mantemos o componente exportado (no-op) para não quebrar os ~15 imports
 * existentes. Toda a fonte canônica agora vive em index.html.
 */
const LocalBusinessSchema = () => null;

export default LocalBusinessSchema;
