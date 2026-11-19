import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import DiscoverableFaq from "./DiscoverableFaq";

const items = [
  { q: "O que comparar antes de contratar?", a: "Compare coberturas, limites, franquias e exclusões nas condições do produto." },
  { q: "A cotação inicia a proteção?", a: "Não. Confirme aceitação, vigência e demais condições antes de considerar o risco protegido." },
];

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", window.location.pathname);
});

describe("FAQ acessível e rastreável", () => {
  it("inclui todas as respostas no HTML sem depender de clique nem JavaScript", () => {
    const html = renderToStaticMarkup(<DiscoverableFaq items={items} idPrefix="resposta-auto" />);
    const document = new DOMParser().parseFromString(html, "text/html");
    expect(document.querySelectorAll("details")).toHaveLength(items.length);
    items.forEach((item, index) => {
      const answer = document.getElementById(`resposta-auto-${index + 1}`);
      expect(answer?.querySelector("summary h3")?.textContent).toBe(item.q);
      expect(answer?.querySelector("p")?.textContent).toBe(item.a);
      expect(answer?.querySelector("a")?.getAttribute("href")).toBe(`#resposta-auto-${index + 1}`);
    });
  });

  it("abre a resposta apontada pelo endereço ao entrar na página", () => {
    window.history.replaceState(null, "", "#resposta-auto-2");
    const { container } = render(<DiscoverableFaq items={items} idPrefix="resposta-auto" />);
    expect(container.querySelector("#resposta-auto-2")).toHaveAttribute("open");
    expect(container.querySelector("#resposta-auto-1")).not.toHaveAttribute("open");
    expect(screen.getByRole("link", { name: `Link para a pergunta: ${items[1].q}` })).toHaveAttribute("href", "#resposta-auto-2");
  });

  it("acompanha mudanças de âncora sem substituir os controles nativos", () => {
    const { container } = render(<DiscoverableFaq items={items} idPrefix="resposta-auto" />);
    window.history.replaceState(null, "", "#resposta-auto-1");
    fireEvent(window, new Event("hashchange"));
    expect(container.querySelector("#resposta-auto-1")).toHaveAttribute("open");
    expect(container.querySelector("summary")).toBeInTheDocument();
  });
});
