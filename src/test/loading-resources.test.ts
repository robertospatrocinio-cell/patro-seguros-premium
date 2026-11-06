import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
const heroSource = readFileSync(resolve(process.cwd(), "src/components/HeroPatro.tsx"), "utf8");
const preloadScript = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .find((script) => script.includes("home-hero-preload"));

function loadPreload(pathname: string, doc: Document) {
  if (!preloadScript) throw new Error("Script de preload do hero ausente");
  new Function("location", "document", preloadScript)({ pathname }, doc);
}

describe("Recursos prioritários da página inicial", () => {
  it("antecipa só AVIF na home, sem duplicar ao executar novamente", () => {
    const doc = document.implementation.createHTMLDocument();
    loadPreload("/", doc);
    loadPreload("/", doc);
    const links = doc.querySelectorAll('link[rel="preload"]');
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("type")).toBe("image/avif");
    expect(links[0].getAttribute("fetchpriority")).toBe("high");
    const sizes = links[0].getAttribute("imagesizes");
    expect(sizes).toBe("(min-width: 1024px) 43vw, 100vw");
    expect(heroSource.match(/sizes="\(min-width: 1024px\) 43vw, 100vw"/g)).toHaveLength(2);
    expect(heroSource).toContain(`srcSet="${links[0].getAttribute("imagesrcset")}"`);
  });

  it.each(["/seguro-auto", "/blog", "/cotacao", "/admin"])(
    "não baixa antecipadamente o hero da home em %s",
    (pathname) => {
      const doc = document.implementation.createHTMLDocument();
      loadPreload(pathname, doc);
      expect(doc.querySelector('link[rel="preload"]')).toBeNull();
    },
  );

  it("não mantém preloads estáticos concorrentes do hero ou selo", () => {
    const preloads = html.match(/<link\b[^>]*rel="preload"[^>]*>/g) ?? [];
    expect(preloads.join("\n")).not.toMatch(/hero-home|selo-melhor-corretora/);
  });

  it("mantém a imagem do topo prioritária e com dimensões explícitas", () => {
    expect(heroSource).toContain('loading="eager"');
    expect(heroSource).toContain('fetchpriority: "high"');
    expect(heroSource).toContain("width={1280}");
    expect(heroSource).toContain("height={720}");
    expect(heroSource).not.toContain('loading="lazy"');
  });

  it("mantém o texto visível enquanto a fonte local carrega", () => {
    const fontFaces = html.match(/@font-face\s*\{[^}]+\}/g) ?? [];
    expect(fontFaces.length).toBeGreaterThan(0);
    for (const fontFace of fontFaces) {
      expect(fontFace).toMatch(/font-display\s*:\s*swap/);
    }
  });

  it("reserva espaço enquanto o bloco Como funciona a cotação carrega", () => {
    const homeSource = readFileSync(resolve(process.cwd(), "src/pages/Index.tsx"), "utf8");
    const section = homeSource.match(/<section aria-label="Como funciona a cotação">([\s\S]*?)<\/section>/)?.[1];
    expect(section).toBeDefined();
    expect(section).not.toContain("fallback={null}");
    expect(section).toContain('minHeight: "calc(480px - 7rem)"');
  });
});
