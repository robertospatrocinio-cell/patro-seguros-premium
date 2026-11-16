import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "postcss";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const css = source("src/styles/home.css");
const stylesheet = parse(css);
const home = source("src/pages/Index.tsx");
const hero = source("src/components/HeroPatro.tsx");

function hasDeclaration(selector: string, property: string, value: string) {
  let found = false;
  stylesheet.walkRules((rule) => {
    if (rule.selector !== selector) return;
    rule.walkDecls(property, (declaration) => {
      if (declaration.value === value) found = true;
    });
  });
  return found;
}

describe("Design restrito à página inicial", () => {
  it("mantém as regras de aparência dentro da home e usa as fontes existentes", () => {
    stylesheet.walkRules((rule) => {
      expect(rule.selector.trim().startsWith(".patro-home")).toBe(true);
    });
    expect(home).toContain('className="patro-home"');
    expect(home).toContain('import "@/styles/home.css"');
    expect(css).not.toMatch(/@import|@font-face/);
  });

  it("mantém a foto existente e suas fontes responsivas prioritárias", () => {
    expect(hero).toContain('src="/images/hero-home-1280.webp"');
    expect(hero).toContain('loading="eager"');
    expect(hero).toContain('decoding="async"');
    expect(hero.match(/sizes="\(min-width: 1024px\) 43vw, 100vw"/g)).toHaveLength(2);
    expect(hasDeclaration(".patro-home .home-hero-media picture", "display", "block")).toBe(true);
    expect(hasDeclaration(".patro-home .home-hero-media picture", "height", "100%")).toBe(true);
  });

  it("dá à foto uma área própria no celular sem cobrir o texto", () => {
    let mobileMedia = false;
    stylesheet.walkAtRules("media", (media) => {
      if (media.params !== "(max-width: 1023px)") return;
      media.walkRules(".patro-home .home-hero-media", (rule) => {
        rule.walkDecls("position", (declaration) => {
          mobileMedia = declaration.value === "relative";
        });
      });
    });
    expect(mobileMedia).toBe(true);
  });

  it("preserva a navegação, os formulários e as seções da página", () => {
    for (const component of ["HeroPatro", "QuickLeadForm", "SolutionGuide", "ClaimsSupportTimeline", "Footer"]) {
      expect(home).toContain(`<${component}`);
    }
    for (const id of ["home-seo-intro", "home-solucoes", "home-private-heading", "home-depoimentos", "home-bairros", "home-faq"]) {
      expect(home).toContain(`id="${id}"`);
    }
    expect(home).toContain("onSelectInsuranceType={setQuickLeadInsuranceType}");
    expect(home).toContain("prefillInsuranceType={quickLeadInsuranceType}");
  });

  it("mantém foco visível e respeita redução de movimento", () => {
    expect(css).toContain(":focus-visible");
    expect(css).toContain("(prefers-reduced-motion: reduce)");
    expect(css).toContain("animation: none !important");
    expect(css).toContain("outline-offset: 4px");
  });
});
