/**
 * OrganizationSchema — NO-OP.
 *
 * O bloco Organization (@id = #organization) agora é emitido estaticamente
 * em `index.html` e copiado para todas as rotas pelo prerender. Emitir aqui
 * via Helmet criava um segundo nó com mesmo @id mas dados ligeiramente
 * diferentes — Google reporta como conflito no URL Inspection.
 *
 * Mantemos o componente exportado para não quebrar os ~40 imports
 * existentes; pode ser removido em refactor futuro.
 */
const OrganizationSchema = () => null;

export default OrganizationSchema;
