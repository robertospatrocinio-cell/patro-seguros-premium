import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
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
});