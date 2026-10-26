import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SeguroRetaDrone from "./SeguroRetaDrone";
import SeguroDroneAgricola from "./SeguroDroneAgricola";
import SeguroDrone from "./SeguroDrone";
import { getDroneSeo, getDroneStaticContent } from "@/data/droneAgricolaSeo";
import { resolveRoute } from "@/lib/redirects";

vi.mock("@/components/Header", () => ({ default: () => <header /> }));
vi.mock("@/components/PageMeta", () => ({ default: () => null }));
vi.mock("@/components/CookieBanner", () => ({ default: () => null }));
vi.mock("@/components/ProductQuoteForm", () => ({
  default: ({ productName }: { productName: string }) => <form aria-label={`Solicitar ${productName}`} />,
}));
afterEach(cleanup);

function showPage(path: string, page: React.ReactNode) {
  return render(<HelmetProvider><MemoryRouter initialEntries={[path]}>{page}</MemoryRouter></HelmetProvider>);
}

describe("Páginas públicas de drones agrícolas", () => {
  it("publica a principal sem aviso de rascunho e com cotação agrícola", () => {
    showPage("/seguro-drone-agricola", <SeguroDroneAgricola />);
    expect(screen.getByRole("heading", { level: 1, name: "Seguro para drones agrícolas" })).toBeInTheDocument();
    expect(screen.getByRole("form", { name: "Solicitar Drone agrícola" })).toBeInTheDocument();
    expect(screen.queryByText(/Prévia para aprovação/)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Quem recebe a indenização" })).toBeInTheDocument();
  });

  it("mantém RETA complementar, sem prometer cobertura de deriva", () => {
    showPage("/seguro-reta-drone", <SeguroRetaDrone />);
    expect(screen.getByRole("heading", { level: 1, name: "RETA para drones agrícolas" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cotar casco do drone" })).toHaveAttribute("href", "/seguro-drone-agricola#cotacao-drone");
    expect(screen.getByRole("form", { name: "Solicitar RETA para drone agrícola" })).toBeInTheDocument();
    expect(screen.getByText(/Deriva, contaminação e prejuízos a lavouras vizinhas/)).toBeInTheDocument();
    expect(screen.queryByText(/R\$\s*585,64/)).not.toBeInTheDocument();
  });

  it("consolida o endereço antigo na regra permanente e no fallback SPA", () => {
    expect(resolveRoute("/seguro-drone")).toMatchObject({ kind: "redirect", to: "/seguro-drone-agricola" });
    const { container } = showPage("/seguro-drone?utm_source=agro#cotacao-drone", <SeguroDrone />);
    expect(container.textContent).not.toContain("Carregando");
  });

  it.each(["/seguro-drone-agricola", "/seguro-reta-drone"])("sincroniza metadados e HTML em %s", path => {
    const metadata = getDroneSeo(path)!;
    const content = getDroneStaticContent(path)!;
    expect(metadata.canonical).toBe(`https://www.patroseguros.com.br${path}`);
    expect(metadata.title).toContain("agrícolas");
    expect(content.h1).toBe(metadata.h1);
    expect(content.body).toContain("Quem recebe a indenização");
    expect(content.body).toContain("Pulverização");
    expect(metadata.schema["@graph"].map(node => node["@type"])).toEqual(["Service", "FAQPage"]);
    expect(metadata.faqs).toHaveLength(10);
    expect(content.body).not.toMatch(/filmagens|recreativo|inspeções urbanas/i);
  });
});
