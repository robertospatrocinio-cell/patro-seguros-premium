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

  it("não faz os logos disputarem prioridade alta com a imagem principal", () => {
    const headerSource = readFileSync(resolve(process.cwd(), "src/components/Header.tsx"), "utf8");
    expect(html).not.toMatch(/<link\b[^>]*rel="preload"[^>]*logo-full/);
    const loaderLogo = html.match(/<img\b[^>]*class="loader-logo"[^>]*>/)?.[0];
    expect(loaderLogo).toBeDefined();
    expect(loaderLogo).not.toContain('fetchpriority="high"');
    const headerLogo = headerSource.match(/<img\s+src=\{logoFull\}[\s\S]*?\/>/)?.[0];
    expect(headerLogo).toBeDefined();
    expect(headerLogo).toContain('loading="eager"');
    expect(headerLogo).toContain('decoding="async"');
    expect(headerLogo).not.toContain('fetchpriority: "high"');
    // A proporção declarada deve coincidir com a do mesmo logo no HTML.
    expect(headerLogo).toContain("width={251}");
    expect(headerLogo).toContain("height={140}");
    expect(loaderLogo).toContain('width="251" height="140"');
  });

  it("não exige decodificação síncrona da foto para pintar o texto do topo", () => {
    expect(heroSource).toContain('decoding="async"');
    expect(heroSource).not.toContain('decoding="sync"');
  });

  it("não duplica a altura da página durante a troca do conteúdo pré-renderizado", () => {
    const mainSource = readFileSync(resolve(process.cwd(), "src/main.tsx"), "utf8");
    expect(mainSource).toContain('root.style.visibility = "hidden"');
    expect(mainSource).toContain('root.style.position = "absolute"');
    expect(mainSource).toContain('root.style.width = "100%"');
    expect(mainSource).toContain('root.style.cssText = initialRootStyle');
    expect(mainSource).not.toContain('root.style.display = "none"');
    expect(mainSource).toContain('root.querySelector(\'main:not([aria-busy="true"])\')');
    expect(mainSource).toContain("shell.remove()");
    expect(mainSource).toContain("window.setTimeout(reveal, 6000)");
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
