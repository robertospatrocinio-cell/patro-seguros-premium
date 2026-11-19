import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BlogCategory from "./BlogCategory";

vi.mock("@/components/Header", () => ({ default: () => null }));
vi.mock("@/components/Footer", () => ({ default: () => null }));
vi.mock("@/components/BreadcrumbSchema", () => ({ default: () => null }));
vi.mock("@/components/OptimizedImage", () => ({
  default: (props: { src: string; alt: string; className?: string }) => <img {...props} />,
}));
vi.mock("@/lib/blogImages", () => ({
  getArticleImage: () => "/images/og-cover.webp",
  getArticleImageAlt: (slug: string) => `Descrição da capa ${slug}`,
}));
vi.mock("@/lib/blogData", () => ({
  getCategoryBySlug: (slug: string) => slug === "seguro-empresarial" ? "Seguro Empresarial" : undefined,
  getArticlesByCategory: () => Array.from({ length: 12 }, (_, index) => ({
    slug: `artigo-${index + 1}`,
    title: `Artigo ${index + 1}`,
    excerpt: "Orientações sobre seguro empresarial.",
    category: "Seguro Empresarial",
    author: "Equipe Patro Seguros",
    date: "2026-01-10",
    readTime: 5,
  })),
  slugifyCategory: () => "seguro-empresarial",
  allCategories: ["Seguro Empresarial"],
  formatDate: (date: string) => date,
}));

const categoryPath = "/blog/categoria/seguro-empresarial";
const canonical = `https://www.patroseguros.com.br${categoryPath}`;
const openCategory = (path = categoryPath) => render(
  <MemoryRouter initialEntries={[path]}>
    <Routes>
      <Route path="/blog/categoria/:categoria" element={<BlogCategory />} />
      <Route path="/blog" element={<p>Blog</p>} />
    </Routes>
  </MemoryRouter>,
);

beforeEach(() => { document.head.innerHTML = ""; });
afterEach(() => { cleanup(); document.head.innerHTML = ""; });

function getCollection(container: HTMLElement) {
  const script = container.querySelector('script[type="application/ld+json"]');
  return JSON.parse(script?.textContent ?? "{}");
}

describe("SEO das categorias do blog", () => {
  it("oferece links rastreáveis e atualiza título, descrição e canonical ao paginar", () => {
    openCategory();
    const firstTitle = document.title;
    const firstDescription = document.querySelector('meta[name="description"]')?.getAttribute("content");
    const next = screen.getByRole("link", { name: "Próxima" });
    expect(next).toHaveAttribute("href", `${categoryPath}?page=2`);
    expect(next).toHaveAttribute("rel", "next");
    fireEvent.click(next);
    expect(document.title).not.toBe(firstTitle);
    expect(document.title).toContain("Página 2");
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).not.toBe(firstDescription);
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", `${canonical}?page=2`);
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute("content", `${canonical}?page=2`);
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute("content", document.title);
    expect(screen.getByRole("link", { name: "Anterior" })).toHaveAttribute("href", categoryPath);
  });

  it("abre diretamente a segunda página e descreve somente os artigos exibidos", () => {
    const { container } = openCategory(`${categoryPath}?page=2`);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Seguro Empresarial");
    expect(screen.queryByRole("heading", { name: "Artigo 1" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Artigo 10" })).toBeInTheDocument();
    expect(screen.getByAltText("Descrição da capa artigo-10")).toBeInTheDocument();
    const schema = getCollection(container);
    expect(schema["@type"]).toBe("CollectionPage");
    expect(schema.url).toBe(`${canonical}?page=2`);
    expect(schema.mainEntity.numberOfItems).toBe(3);
    expect(schema.mainEntity.itemListElement[0].url).toBe("https://www.patroseguros.com.br/blog/artigo-10");
  });

  it.each(["0", "-1", "abc", "1.5"])("normaliza a página inválida %s sem criar outro canonical", (page) => {
    openCategory(`${categoryPath}?page=${page}`);
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    expect(screen.getByRole("heading", { name: "Artigo 1" })).toBeInTheDocument();
  });

  it("trata categoria desconhecida sem interromper a renderização", () => {
    openCategory("/blog/categoria/inexistente");
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });
});
