import { COMPANY } from "@/config/company";

/** Origem oficial, compartilhada com NAP e dados estruturados. */
export const CANONICAL_BASE_URL = COMPANY.dominioCanonico;

/** Sem consultas, fragmentos, barras duplicadas ou barra final (inclusive na raiz). */
export const getCanonicalUrl = (pathname: string): string => {
  let input = pathname || "/";
  if (/^https?:\/\//i.test(input)) {
    try {
      input = new URL(input).pathname;
    } catch {
      input = "/";
    }
  }
  const path = input.split(/[?#]/)[0].toLowerCase()
    .replace(/\/{2,}/g, "/").replace(/^\/+|\/+$/g, "");
  return path ? `${CANONICAL_BASE_URL}/${path}` : CANONICAL_BASE_URL;
};

/** Compatibilidade: coleções também seguem a regra institucional sem query string. */
export const getCanonicalPathUrl = getCanonicalUrl;
