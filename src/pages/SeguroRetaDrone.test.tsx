import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SeguroRetaDrone from "./SeguroRetaDrone";

vi.mock("@/components/Header", () => ({ default: () => <header /> }));
vi.mock("@/components/Footer", () => ({ default: () => <footer /> }));
vi.mock("@/components/PageMeta", () => ({ default: () => null }));
vi.mock("@/components/JumpLinksNav", () => ({ default: () => <nav aria-label="Navegação desta página" /> }));
vi.mock("@/hooks/useBreadcrumbOverrides", () => ({ useBreadcrumbOverrides: () => ({ data: undefined }) }));

describe("SeguroRetaDrone", () => {
  it("separa RETA de casco e evita preços não verificados", () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/seguro-reta-drone"]}>
          <SeguroRetaDrone />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Seguro RETA Drone" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Seguro RETA ou seguro casco/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Conhecer o seguro casco/i })).toHaveAttribute("href", "/seguro-drone-agricola");
    expect(screen.getByText(/não publica um preço fixo/i)).toBeInTheDocument();
    expect(screen.queryByText(/R\$\s*585,64/i)).not.toBeInTheDocument();
  });
});