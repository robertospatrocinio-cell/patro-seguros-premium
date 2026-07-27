import { test, expect, Page } from "@playwright/test";

/**
 * E2E: valida os jump links (JumpLinksNav) em uma página long-tail real.
 *
 * Cobre o contrato ponta a ponta:
 *  1) Cada pill aponta para um heading com id estável no DOM renderizado.
 *  2) Clicar na pill rola até a seção correta (heading dentro do viewport,
 *     considerando o offset da barra sticky).
 *  3) A pill clicada recebe `aria-current="location"` (destaque ativo).
 *  4) O hash da URL é atualizado sem recarregar a página.
 *  5) Ao navegar entre múltiplas pills, o destaque migra corretamente e
 *     apenas UMA pill fica ativa por vez.
 *
 * Usamos `prefers-reduced-motion: reduce` para desativar o smooth scroll e
 * eliminar flakiness sem alterar o comportamento validado (o handler
 * respeita a media query e usa `behavior: "auto"`).
 */

const HOSTS = [
  {
    name: "lovable.app (preview)",
    origin: "https://patroseguros.lovable.app",
  },
  {
    name: "patroseguros.com.br (produção)",
    origin: "https://www.patroseguros.com.br",
  },
] as const;

// Página long-tail que renderiza InsurancePageTemplate com jumpLinks.
// Se este path for renomeado, os validadores em
// `scripts/validate-jumplinks.mjs` também precisam ser atualizados.
const ROUTE = "/valor-seguro-byd-dolphin";

const JUMP_LINKS = [
  { label: "Valor médio", id: "preco-heading" },
  { label: "Coberturas", id: "coberturas-heading" },
  { label: "Cenários reais", id: "cenarios-heading" },
  { label: "Perguntas frequentes", id: "faq-heading" },
  { label: "Cotar agora", id: "formulario-heading" },
] as const;

// Tolerância vertical: a barra sticky tem ~96px de offset (ver JumpLinksNav).
const OFFSET_TOLERANCE_PX = 160;

async function gotoRoute(page: Page, origin: string) {
  const response = await page.goto(`${origin}${ROUTE}`, {
    waitUntil: "domcontentloaded",
  });
  expect(response, "response deve existir").not.toBeNull();
  expect(
    response!.ok(),
    `status ${response!.status()} em ${ROUTE}`,
  ).toBeTruthy();
  // Aguarda a barra de jump links (renderizada via React após hydration).
  await page.waitForSelector('nav[aria-label="Ir para a seção"] a');
}

for (const host of HOSTS) {
  test.describe(`Jump links @ ${host.name}`, () => {
    test.use({
      // Desativa smooth scroll para o handler navegar instantaneamente.
      colorScheme: "light",
      reducedMotion: "reduce",
      viewport: { width: 1280, height: 900 },
    });

    test(`rola até cada seção e mantém o destaque da pill ativa`, async ({
      page,
    }) => {
      await gotoRoute(page, host.origin);

      // 1) Sanity: todas as pills configuradas existem e apontam para um id
      // real no DOM (blindagem contra regressões do template).
      for (const link of JUMP_LINKS) {
        const pill = page.locator(
          `nav[aria-label="Ir para a seção"] a[href="#${link.id}"]`,
        );
        await expect(
          pill,
          `pill "${link.label}" deve existir`,
        ).toHaveCount(1);
        const target = page.locator(`#${link.id}`);
        await expect(
          target,
          `heading #${link.id} deve existir no DOM`,
        ).toHaveCount(1);
      }

      // 2) Clica em cada pill em ordem e valida rolagem + destaque + hash.
      for (const link of JUMP_LINKS) {
        const pill = page.locator(
          `nav[aria-label="Ir para a seção"] a[href="#${link.id}"]`,
        );
        await pill.click();

        // Hash da URL atualizado sem reload.
        await expect
          .poll(() => new URL(page.url()).hash, {
            message: `hash deve virar #${link.id} após clicar "${link.label}"`,
          })
          .toBe(`#${link.id}`);

        // A seção alvo deve estar próxima ao topo do viewport (respeitando
        // o offset da barra sticky).
        const distance = await page.evaluate((id) => {
          const el = document.getElementById(id);
          if (!el) return Number.NaN;
          return el.getBoundingClientRect().top;
        }, link.id);
        expect(
          Number.isFinite(distance),
          `heading #${link.id} deve existir ao medir posição`,
        ).toBeTruthy();
        expect(
          Math.abs(distance),
          `heading #${link.id} deve estar próximo ao topo (dist=${distance}px)`,
        ).toBeLessThan(OFFSET_TOLERANCE_PX);

        // A pill clicada recebe aria-current="location" (destaque ativo)
        // — o handler seta `activeId` imediatamente após o clique.
        await expect(pill).toHaveAttribute("aria-current", "location");

        // Apenas UMA pill ativa por vez.
        const activeCount = await page
          .locator(
            'nav[aria-label="Ir para a seção"] a[aria-current="location"]',
          )
          .count();
        expect(
          activeCount,
          `somente uma pill deve estar ativa (encontradas ${activeCount})`,
        ).toBe(1);

        // As demais pills NÃO devem ter aria-current.
        for (const other of JUMP_LINKS) {
          if (other.id === link.id) continue;
          const otherPill = page.locator(
            `nav[aria-label="Ir para a seção"] a[href="#${other.id}"]`,
          );
          await expect(
            otherPill,
            `pill "${other.label}" não deve estar ativa`,
          ).not.toHaveAttribute("aria-current", "location");
        }
      }
    });

    test(`navegação direta via hash já rola até a seção correspondente`, async ({
      page,
    }) => {
      const target = JUMP_LINKS[2]; // "Cenários reais"
      const response = await page.goto(
        `${host.origin}${ROUTE}#${target.id}`,
        { waitUntil: "domcontentloaded" },
      );
      expect(response!.ok()).toBeTruthy();
      await page.waitForSelector(`#${target.id}`);

      // Dá tempo do ScrollToTop tratar o hash pós-hydration.
      await expect
        .poll(
          async () =>
            await page.evaluate((id) => {
              const el = document.getElementById(id);
              return el ? el.getBoundingClientRect().top : Number.NaN;
            }, target.id),
          {
            timeout: 5_000,
            message: `#${target.id} deve rolar até o topo via hash`,
          },
        )
        .toBeLessThan(OFFSET_TOLERANCE_PX);
    });
  });
}