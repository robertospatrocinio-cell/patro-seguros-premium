import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import DesktopNavDisclosure from "./DesktopNavDisclosure";
import SkipLink from "./SkipLink";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Navegação acessível", () => {
  it("abre o menu por botão e fecha com Escape devolvendo o foco", () => {
    render(
      <DesktopNavDisclosure label="Para você" panelClassName="w-64">
        <a href="/seguro-auto">Seguro Auto</a>
      </DesktopNavDisclosure>,
    );
    const trigger = screen.getByRole("button", { name: "Para você" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: "Seguro Auto" })).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const destination = screen.getByRole("link", { name: "Seguro Auto" });
    destination.focus();
    fireEvent.keyDown(destination, { key: "Escape" });
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: "Seguro Auto" })).not.toBeInTheDocument();
  });

  it("fecha o painel quando o teclado sai do grupo", () => {
    render(
      <>
        <DesktopNavDisclosure label="Conteúdo" panelClassName="w-64">
          <a href="/blog">Blog</a>
        </DesktopNavDisclosure>
        <button>Próximo destino</button>
      </>,
    );
    const trigger = screen.getByRole("button", { name: "Conteúdo" });
    fireEvent.click(trigger);
    fireEvent.blur(screen.getByRole("link", { name: "Blog" }), {
      relatedTarget: screen.getByRole("button", { name: "Próximo destino" }),
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("pula ao conteúdo mesmo quando main não tem id nem tabindex", () => {
    render(<><SkipLink /><main>Conteúdo da página</main></>);
    const main = screen.getByRole("main");
    const scroll = vi.fn();
    Object.defineProperty(main, "scrollIntoView", { configurable: true, value: scroll });
    fireEvent.click(screen.getByRole("link", { name: "Ir para o conteúdo principal" }));
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(main).toHaveFocus();
    expect(scroll).toHaveBeenCalledWith({ block: "start", behavior: "auto" });
  });
});
