import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import PageMeta from "./PageMeta";

const setHostname = (hostname: string) => {
  Object.defineProperty(window, "location", {
    writable: true,
    value: { ...window.location, hostname, origin: `https://${hostname}` },
  });
};

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/seguro-auto"]}>
        <PageMeta title="Teste" description="Descrição de teste para robots meta." />
      </MemoryRouter>
    </HelmetProvider>,
  );

describe("PageMeta robots meta by hostname", () => {
  beforeEach(() => {
    document.head.innerHTML = '<meta name="robots" content="index, follow" />';
  });

  afterEach(() => {
    cleanup();
    setHostname("localhost");
    document.head.innerHTML = "";
  });

  it("emite noindex, nofollow no domínio lovable.app", () => {
    setHostname("patroseguros.lovable.app");
    renderPage();
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toBe("noindex, nofollow");
  });

  it("emite index, follow no domínio patroseguros.com.br", () => {
    setHostname("patroseguros.com.br");
    renderPage();
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toBe("index, follow");
  });

  it("emite index, follow no domínio www.patroseguros.com.br", () => {
    setHostname("www.patroseguros.com.br");
    renderPage();
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute("content")).toBe("index, follow");
  });

  it("não repete Guarulhos quando a cidade já está no título", () => {
    setHostname("www.patroseguros.com.br");
    render(
      <MemoryRouter initialEntries={["/seguro-auto-guarulhos"]}>
        <PageMeta title="Seguro Auto Guarulhos" description="Compare opções de seguro auto em Guarulhos." skipBreadcrumb />
      </MemoryRouter>,
    );
    expect(document.title).toBe("Seguro Auto Guarulhos | Patro Seguros");
  });

  it("cria metadados ausentes, inclusive noindex no preview", () => {
    document.head.innerHTML = "";
    setHostname("preview.lovable.dev");
    renderPage();
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", "Descrição de teste para robots meta.");
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute("content", "https://www.patroseguros.com.br/seguro-auto");
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  });

  it("limpa a descrição social anterior e não duplica tags ao atualizar", () => {
    setHostname("www.patroseguros.com.br");
    const page = (customAlt?: string, noindex = false) => (
      <MemoryRouter initialEntries={["/"]}>
        <PageMeta title="Patro Seguros" description="Conheça nossas soluções de seguros." ogImageAlt={customAlt} noindex={noindex} skipBreadcrumb />
      </MemoryRouter>
    );
    const { rerender } = render(page("Imagem específica da página anterior"));
    rerender(page(undefined, true));
    expect(document.querySelector('meta[property="og:image:alt"]')).toHaveAttribute("content", "Patro Seguros — Corretora de Seguros");
    expect(document.querySelector('meta[name="twitter:image:alt"]')).toHaveAttribute("content", "Patro Seguros — Corretora de Seguros");
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.querySelectorAll('meta[property="og:image"]')).toHaveLength(1);
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  });
});