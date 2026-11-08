import { describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach } from "vitest";
import { faqCategories } from "./perguntasHubData";
import { perguntasPrioritarias, faqTechnicalSources } from "./perguntasPrioritarias";
import PerguntasCategoria from "@/pages/PerguntasCategoria";
import CentralDePerguntas from "@/pages/CentralDePerguntas";
import { WHATSAPP_URL_BASE, EMPRESA } from "@/config/empresa";

// Metadados globais têm testes próprios; aqui isolamos o conteúdo da rota.
vi.mock("@/components/PageMeta", () => ({ default: () => null }));
afterEach(cleanup);

function schemas(container: HTMLElement) {
  return Array.from(container.querySelectorAll('script[type="application/ld+json"]'))
    .map((script) => JSON.parse(script.textContent || "{}"));
}

function renderCategory(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/perguntas-frequentes-seguros/${id}`]}>
      <Routes>
        <Route path="/perguntas-frequentes-seguros/:categoria" element={<PerguntasCategoria />} />
        <Route path="/perguntas-frequentes-seguros" element={<CentralDePerguntas />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Respostas prioritárias GEO/AEO", () => {
  it("cobre as 12 modalidades sem duplicar IDs nem remover categorias anteriores", () => {
    expect(perguntasPrioritarias).toHaveLength(12);
    expect(new Set(faqCategories.map((c) => c.id)).size).toBe(faqCategories.length);
    for (const id of ["auto", "empresarial", "saude", "consorcio", "residencial", "vida", "garantia", "credito", "cyber", "consultorios", "salas", "eletricos"]) {
      expect(faqCategories.some((c) => c.id === id)).toBe(true);
    }
  });

  it("oferece sete respostas, referências e metadados curtos por modalidade", () => {
    for (const category of perguntasPrioritarias) {
      expect(category.perguntas).toHaveLength(7);
      expect(new Set(category.perguntas.map((qa) => qa.q)).size).toBe(7);
      expect(`${category.title}: dúvidas | Patro Seguros`.length).toBeLessThanOrEqual(70);
      expect(category.description.length).toBeLessThanOrEqual(165);
      expect(category.relatedHref).toMatch(/^\/[a-z0-9-]+$/);
      expect(category.sourceIds.length).toBeGreaterThan(0);
      for (const id of category.sourceIds) {
        expect(faqTechnicalSources.some((source) => source.id === id)).toBe(true);
      }
      for (const qa of category.perguntas) {
        expect(qa.a.length).toBeGreaterThan(100);
        expect(qa.a).not.toMatch(/R\$|\d+%|cinco estrelas|até 25|24-48h/);
      }
      expect(faqCategories.find((c) => c.id === category.id)).toEqual(category);
    }
  });

  it.each(perguntasPrioritarias)("renderiza $id sem complementos legados e com FAQ fiel", (category) => {
    const { container } = renderCategory(category.id);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(category.title);
    const markup = schemas(container);
    const faq = markup.find((schema) => schema["@type"] === "FAQPage");
    expect(faq.mainEntity).toEqual(category.perguntas.map((qa) => ({
      "@type": "Question", name: qa.q,
      acceptedAnswer: { "@type": "Answer", text: qa.a },
    })));
    expect(markup.filter((schema) => schema["@type"] === "BreadcrumbList")).toHaveLength(1);
    for (const qa of category.perguntas) {
      expect(screen.getByRole("button", { name: qa.q })).toBeInTheDocument();
    }
    expect(screen.getByText(/Registro SUSEP cadastrado:/)).toHaveTextContent(EMPRESA.susep);
    expect(screen.getByRole("link", { name: /Tirar dúvida no WhatsApp/ })).toHaveAttribute("href", expect.stringContaining(WHATSAPP_URL_BASE));
    expect(container.textContent).not.toMatch(/R\$ 200|reduzir o prêmio em até|declarar apenas condutor principal|respostas rápidas pelo WhatsApp/);
  });

  it("mantém as perguntas marcadas na central também disponíveis ao visitante", () => {
    const { container } = render(<MemoryRouter><CentralDePerguntas /></MemoryRouter>);
    const faq = schemas(container).find((schema) => schema["@type"] === "FAQPage");
    for (const entry of faq.mainEntity) {
      expect(screen.getByRole("button", { name: entry.name })).toBeInTheDocument();
      const visibleData = faqCategories.flatMap((c) => c.perguntas).find((qa) => qa.q === entry.name);
      expect(entry.acceptedAnswer.text).toBe(visibleData?.a);
    }
  });
});
