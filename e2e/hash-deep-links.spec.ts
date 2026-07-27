import { test, expect, Page } from "@playwright/test";

/**
 * E2E: navegação DIRETA por hash (deep link) em todas as páginas long-tail
 * com jump links. Valida o contrato ScrollToTop + JumpLinksNav:
 *
 *   1) Cold load em `/rota#id` rola até o heading correto (ScrollToTop
 *      trata o hash pós-hydration, com retry ~1s enquanto o React monta
 *      a seção).
 *   2) A pill correspondente reidrata como ativa (aria-current=location).
 *   3) Navegação SPA para o mesmo path com hash diferente reposiciona sem
 *      recarregar (marker `window.__spa` sobrevive) e sem retornar ao topo.
 *   4) O heading alvo recebe foco programático (tabindex=-1) para a11y.
 *   5) Hash inexistente é ignorado — não quebra a página e não rola.
 */

const HOSTS = [
  { name: "lovable.app (preview)", origin: "https://patroseguros.lovable.app" },
  { name: "patroseguros.com.br (produção)", origin: "https://www.patroseguros.com.br" },
] as const;

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

const OFFSET_TOLERANCE_PX = 200;
const NAV_SELECTOR = 'nav[aria-label="Ir para a seção"]';

async function waitScrolledTo(page: Page, id: string) {
  await expect
    .poll(
      () =>
        page.evaluate((sid) => {
          const el = document.getElementById(sid);
          return el ? el.getBoundingClientRect().top : Number.NaN;
        }, id),
      { timeout: 5_000, message: `#${id} deve rolar até o topo` },
    )
    .toBeLessThan(OFFSET_TOLERANCE_PX);
}

for (const host of HOSTS) {
  test.describe(`Deep-link por hash @ ${host.name}`, () => {
    test.use({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });

    for (const route of ROUTES) {
      // (1) + (2) + (4): cold load em cada âncora conhecida da rota.
      for (const id of route.ids) {
        test(`cold ${route.path}#${id} — ScrollToTop rola, pill ativa, foco no heading`, async ({
          page,
        }) => {
          const response = await page.goto(`${host.origin}${route.path}#${id}`, {
            waitUntil: "domcontentloaded",
          });
          expect(response!.ok(), `status ${response!.status()}`).toBeTruthy();
          await page.waitForSelector(`#${id}`);
          await waitScrolledTo(page, id);

          // (2) Pill correspondente reidrata como ativa via hash.
          await expect(
            page.locator(`${NAV_SELECTOR} a[href="#${id}"]`),
          ).toHaveAttribute("aria-current", "location");

          // (4) Heading alvo recebe foco (a11y).
          const focused = await page.evaluate(
            (sid) => document.activeElement?.id === sid,
            id,
          );
          expect(focused, `#${id} deve estar em foco após deep-link`).toBeTruthy();
        });
      }

      // (3) Navegação SPA entre hashes na mesma rota (sem recarregar).
      test(`SPA ${route.path} — troca de hash reposiciona sem reload`, async ({
        page,
      }) => {
        const first = route.ids[0];
        const second = route.ids[route.ids.length - 1];

        await page.goto(`${host.origin}${route.path}#${first}`, {
          waitUntil: "domcontentloaded",
        });
        await page.waitForSelector(`#${first}`);
        await waitScrolledTo(page, first);

        // Marker de contexto JS. Sobrevive só se não houver full reload.
        await page.evaluate(() => {
          (window as unknown as { __spa: number }).__spa = Date.now();
        });

        // Simula o clique de um link do cluster: mesmo pathname, hash diferente.
        await page.evaluate((sid) => {
          window.location.hash = `#${sid}`;
        }, second);

        await waitScrolledTo(page, second);

        const marker = await page.evaluate(
          () => (window as unknown as { __spa?: number }).__spa ?? null,
        );
        expect(marker, "sem full reload ao trocar de hash").not.toBeNull();

        // Pill nova deve estar ativa (observer/hash sync).
        await expect(
          page.locator(`${NAV_SELECTOR} a[href="#${second}"]`),
        ).toHaveAttribute("aria-current", "location");
      });
    }

    // (5) Hash inexistente: não quebra a página e não rola para lugar nenhum.
    test(`hash inexistente é ignorado sem quebrar a página`, async ({ page }) => {
      const route = ROUTES[0];
      const response = await page.goto(
        `${host.origin}${route.path}#nao-existe-xyz`,
        { waitUntil: "domcontentloaded" },
      );
      expect(response!.ok()).toBeTruthy();
      await page.waitForSelector(`${NAV_SELECTOR} a`);

      // Nenhuma pill deve estar ativa (hash não bate com nenhum id).
      await expect(
        page.locator(`${NAV_SELECTOR} a[aria-current="location"]`),
      ).toHaveCount(0);

      // Página continua respondendo (main-content presente).
      await expect(page.locator("#main-content")).toHaveCount(1);
    });
  });
}