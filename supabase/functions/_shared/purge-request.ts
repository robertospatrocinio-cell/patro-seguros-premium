const SITE_ORIGIN = "https://www.patroseguros.com.br";

export type PurgeRequest = { tags: string[]; urls: string[]; purgeEverything: boolean };

/** Validate before contacting Cloudflare or persisting request data. */
export function parsePurgeRequest(value: unknown, allowedTags: readonly string[]): PurgeRequest {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Envie um objeto com tags, URLs ou purgeEverything.");
  }
  const body = value as Record<string, unknown>;
  const parseList = (input: unknown, max: number, field: string): string[] => {
    if (input === undefined) return [];
    if (!Array.isArray(input) || input.length > max ||
        input.some((item) => typeof item !== "string" || !item.trim() || item.length > 2048)) {
      throw new Error(`${field}: informe uma lista válida com até ${max} itens.`);
    }
    return input.map((item: string) => item.trim());
  };
  const tags = parseList(body.tags, 30, "Tags").map((tag) => tag.toLowerCase());
  if (tags.some((tag) => !allowedTags.includes(tag))) {
    throw new Error("Uma ou mais tags não são reconhecidas.");
  }
  if (body.purgeEverything !== undefined && typeof body.purgeEverything !== "boolean") {
    throw new Error("purgeEverything deve ser verdadeiro ou falso.");
  }
  const urls = parseList(body.urls, 300, "URLs").map((input) => {
    let url: URL;
    try {
      url = new URL(input, SITE_ORIGIN);
    } catch {
      throw new Error("URL inválida.");
    }
    if (url.origin !== SITE_ORIGIN || url.username || url.password || /[\u0000-\u0020\\]/.test(input)) {
      throw new Error("Use somente URLs de https://www.patroseguros.com.br.");
    }
    url.hash = "";
    return url.href;
  });
  const purgeEverything = body.purgeEverything === true || tags.includes("all");
  if (!purgeEverything && !tags.length && !urls.length) {
    throw new Error("Informe ao menos uma tag ou URL.");
  }
  return { tags, urls: [...new Set(urls)], purgeEverything };
}
