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

  it("reserva uma área de proporção conhecida para a foto no celular, separada do texto", () => {
    expect(hasDeclaration(".patro-home .home-hero-media", "position", "relative")).toBe(true);
    expect(hasDeclaration(".patro-home .home-hero-media", "aspect-ratio", "16 / 9")).toBe(true);
    expect(hero.indexOf('className="home-hero-copy"')).toBeLessThan(hero.indexOf('className="home-hero-media"'));
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

  it("mostra as seis soluções antes do formulário de cotação", () => {
    const solutions = home.indexOf('aria-labelledby="home-solucoes"');
    expect(solutions).toBeGreaterThan(home.indexOf("<HeroPatro"));
    expect(solutions).toBeLessThan(home.indexOf("<QuickLeadForm"));
    expect(home.match(/id="home-solucoes"/g)).toHaveLength(1);
    expect(home.match(/produtosPrincipais\.map/g)).toHaveLength(1);
    expect(home).toContain('className="home-solutions-grid"');
    expect(home).toContain("to={p.cotacao}");
    expect(hasDeclaration(".patro-home .home-solutions-grid", "grid-template-columns", "repeat(3, minmax(0, 1fr))")).toBe(true);
    expect(hasDeclaration(".patro-home .home-solutions-grid", "grid-template-columns", "repeat(2, minmax(0, 1fr))")).toBe(true);
    expect(hasDeclaration(".patro-home .home-solutions-grid", "grid-template-columns", "1fr")).toBe(true);
  });

  it("exibe as seguradoras em uma lista estática e sem cópias decorativas", () => {
    expect(home).toContain('className="home-insurers-list"');
    expect(home.match(/parceirosHome\.map/g)).toHaveLength(1);
    expect(home).not.toContain("animate-marquee");
    expect(home).toContain('"clique_seguradora_parceira"');
  });

  it("dá contraste à abertura e distingue a cotação do contato por WhatsApp", () => {
    expect(hasDeclaration(".patro-home .home-hero", "background", "var(--home-navy)")).toBe(true);
    expect(hasDeclaration(".patro-home .home-hero h1", "color", "var(--home-paper)")).toBe(true);
    expect(hasDeclaration(".patro-home .home-hero-actions > a:first-child", "background", "var(--home-paper)")).toBe(true);
    expect(hasDeclaration(".patro-home .home-hero-actions > a:last-child", "border-color", "rgb(255 255 255 / 50%)")).toBe(true);
    expect(hero).toContain('aria-labelledby="home-heading"');
    expect(hero).toContain('id="home-heading"');
    expect(hero).toContain('to="/central-de-sinistro"');
    expect(hero).toContain('trackCotacaoClick("hero")');
    expect(hero).toContain('trackWhatsAppClick("hero")');
  });

  it("mantém os destinos e o rastreamento das ações de cotação e WhatsApp", () => {
    expect(home).toContain('<Link to="/cotacao" onClick={handleSeoBlockCotacaoClick}>');
    expect(home).toContain('<Link to="/cotacao" onClick={handleFinalCotacaoClick}>');
    expect(home).toContain('href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={handleFinalWhatsAppClick}');
    expect(home).toContain('<Accordion type="single" collapsible className="home-faq-list">');
  });

  it("mantém foco visível e respeita redução de movimento", () => {
    expect(css).toContain(":focus-visible");
    expect(css).toContain("(prefers-reduced-motion: reduce)");
    expect(css).toContain("animation: none !important");
    expect(css).toContain("outline-offset: 4px");
  });
});
