import { test, expect, Page } from "@playwright/test";

/**
 * E2E: cobertura ampliada dos jump links em TODAS as páginas long-tail
 * (cluster completo) + garantias extras:
 *
 *   a) Cada rota renderiza os pills declarados em `jumpLinks` e cada href
 *      aponta para um heading com id real no DOM.
 *   b) Clicar em uma pill NÃO recarrega a página — validado por um marker
 *      injetado em `window` que sobreviveria apenas se o contexto JS
 *      permanecer o mesmo (sem full reload / navegação SPA).
 *   c) A pill clicada recebe `aria-current="location"` e apenas UMA pill
 *      fica ativa por vez.
 *   d) O hash da URL é atualizado sem provocar navegação (sem incrementar
 *      o histórico via pushState — usa replaceState).
 *   e) O highlight persiste após reload (hidratação por hash + sessionStorage).
 *
 * Usamos `prefers-reduced-motion: reduce` para desativar o smooth scroll e
 * eliminar flakiness sem alterar o comportamento validado.
 */

const HOSTS = [
  { name: "lovable.app (preview)", origin: "https://patroseguros.lovable.app" },
  { name: "patroseguros.com.br (produção)", origin: "https://www.patroseguros.com.br" },
] as const;

// Deve refletir 1:1 os `jumpLinks` de cada página long-tail. Se qualquer
// destes ids mudar, este spec e `scripts/validate-jumplinks.mjs` precisam
// ser atualizados juntos.
const ROUTES: Array<{ path: string; ids: string[] }> = [
  {
    path: "/valor-seguro-byd-dolphin",
    ids: ["preco-heading", "coberturas-heading", "cenarios-heading", "faq-heading", "formulario-heading"],
  },
  {
    path: "/cotacao-seguro-residencial-online",
    ids: ["preco-heading", "coberturas-heading", "como-funciona-heading", "faq-heading", "formulario-heading"],
  },
  {
    path: "/melhor-seguro-para-uber-guarulhos",
    ids: ["coberturas-heading", "preco-heading", "quem-precisa-heading", "faq-heading", "formulario-heading"],
  },
  {
    path: "/planos-de-saude-guarulhos-comparativo",
    ids: ["coberturas-heading", "preco-heading", "quem-precisa-heading", "faq-heading", "formulario-heading"],
  },
];

const OFFSET_TOLERANCE_PX = 160;
const NAV_SELECTOR = 'nav[aria-label="Ir para a seção"]';

async function openRoute(page: Page, url: string) {
  const response = await page.goto(url, { waitUntil: "domcontentloaded" });
  expect(response, `response de ${url}`).not.toBeNull();
  expect(response!.ok(), `status ${response!.status()} em ${url}`).toBeTruthy();
  await page.waitForSelector(`${NAV_SELECTOR} a`);
}

for (const host of HOSTS) {
  test.describe(`Jump links (cluster) @ ${host.name}`, () => {
    test.use({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });

    for (const route of ROUTES) {
      test(`${route.path} — scroll, destaque e nenhum reload`, async ({ page }) => {
        await openRoute(page, `${host.origin}${route.path}`);

        // (b) Marker de contexto JS + snapshot do history length para provar
        // que não houve reload nem pushState durante os cliques.
        const initialHistoryLength = await page.evaluate(() => {
          (window as unknown as { __noReload: number }).__noReload = Date.now();
          return history.length;
        });

        // (a) Sanity: todos os ids configurados existem no DOM renderizado.
        for (const id of route.ids) {
          await expect(
            page.locator(`${NAV_SELECTOR} a[href="#${id}"]`),
            `pill #${id} deve existir`,
          ).toHaveCount(1);
          await expect(
            page.locator(`#${id}`),
            `heading #${id} deve existir`,
          ).toHaveCount(1);
        }

        // (c) + (d) Clica em cada pill, valida rolagem, destaque, hash e
        // que o histórico NÃO cresce (replaceState em vez de pushState).
        for (const id of route.ids) {
          const pill = page.locator(`${NAV_SELECTOR} a[href="#${id}"]`);
          await pill.click();

          await expect
            .poll(() => new URL(page.url()).hash)
            .toBe(`#${id}`);

          const top = await page.evaluate((sid) => {
            const el = document.getElementById(sid);
            return el ? el.getBoundingClientRect().top : Number.NaN;
          }, id);
          expect(Number.isFinite(top), `posição de #${id}`).toBeTruthy();
          expect(
            Math.abs(top),
            `#${id} deve estar próximo ao topo (dist=${top}px)`,
          ).toBeLessThan(OFFSET_TOLERANCE_PX);

          await expect(pill).toHaveAttribute("aria-current", "location");

          const activeCount = await page
            .locator(`${NAV_SELECTOR} a[aria-current="location"]`)
            .count();
          expect(activeCount, `1 pill ativa por vez (found=${activeCount})`).toBe(1);
        }

        // (b) Contexto JS preservado — marker ainda vivo => sem full reload.
        const marker = await page.evaluate(
          () => (window as unknown as { __noReload?: number }).__noReload ?? null,
        );
        expect(marker, "contexto JS deve sobreviver (sem reload)").not.toBeNull();

        // (d) Histórico não cresceu: cada click usa replaceState.
        const finalHistoryLength = await page.evaluate(() => history.length);
        expect(
          finalHistoryLength,
          "history.length não deve crescer após cliques em pills",
        ).toBe(initialHistoryLength);
      });
    }

    test(`highlight persiste após reload via hash + sessionStorage`, async ({
      page,
    }) => {
      const route = ROUTES[0];
      const targetId = route.ids[2];
      await openRoute(page, `${host.origin}${route.path}#${targetId}`);

      const pill = page.locator(`${NAV_SELECTOR} a[href="#${targetId}"]`);
      await expect(pill).toHaveAttribute("aria-current", "location");

      // Reload total: a pill deve reidratar-se a partir do hash da URL.
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.waitForSelector(`${NAV_SELECTOR} a`);
      await expect(pill).toHaveAttribute("aria-current", "location");
    });
  });
}