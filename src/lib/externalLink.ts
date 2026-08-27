/**
 * Retorna os atributos de segurança padrão para links externos.
 * Use com `<a>` ou componentes que espandem props de âncora.
 */
export const getExternalLinkProps = () => ({
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
});

/**
 * Verifica se uma URL deve ser tratada como externa (começa com http/https).
 */
export const isExternalUrl = (url: string): boolean =>
  url.startsWith("http://") || url.startsWith("https://");
