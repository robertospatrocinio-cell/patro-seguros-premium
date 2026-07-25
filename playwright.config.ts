import { defineConfig } from "@playwright/test";

/**
 * E2E tests validam metatags SEO (robots + canonical) em rotas reais nos
 * dois hosts do projeto. Não usam o dev-server local — batem direto no
 * ambiente publicado.
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 1,
  reporter: [["list"]],
  use: {
    userAgent:
      "Mozilla/5.0 (compatible; PatroSeguros-E2E/1.0; +https://www.patroseguros.com.br)",
    ignoreHTTPSErrors: false,
  },
});