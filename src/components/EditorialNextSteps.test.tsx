import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EditorialNextSteps from "./EditorialNextSteps";
import { editorialTopics, getEditorialTopic, getTopicForFaq } from "@/lib/editorialConnections";
import { articles, getRelatedArticles } from "@/lib/blogData";
import { GUIAS_PILARES_BY_SLUG } from "@/data/guiasPilaresData";
import { faqCategories } from "@/data/perguntasHubData";
import GuiaPilar from "@/pages/GuiaPilar";
import PerguntasCategoria from "@/pages/PerguntasCategoria";

vi.mock("@/components/PageMeta", () => ({ default: () => null }));

const parse = (html: string) => new DOMParser().parseFromString(html, "text/html");
const renderRoute = (path: string, route: string, page: React.ReactNode) => parse(
  renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes><Route path={route} element={page} /></Routes>
    </MemoryRouter>
  )
);

describe("Contexto e conexões editoriais", () => {
  it("só aponta para guias e categorias de perguntas existentes", () => {
    for (const topic of editorialTopics) {
      if (topic.guide) expect(GUIAS_PILARES_BY_SLUG[topic.guide.slug]).toBeDefined();
      if (topic.faqId) expect(faqCategories.some((cat) => cat.id === topic.faqId)).toBe(true);
    }
  });

  it("prioriza o assunto específico, sem confundir consórcio com seguro auto", () => {
    expect(getEditorialTopic("consorcio-carro-eletrico-ou-hibrido", "Seguro Auto")?.id).toBe("consorcio");
    expect(getEditorialTopic("plano-saude-empresarial", "Empresarial")?.id).toBe("saude");
    expect(getEditorialTopic("seguro-consultorio-odontologico")?.id).toBe("consultorios");
    expect(getTopicForFaq("consultorios")?.guide?.slug).toBe("seguros-para-consultorios");
    expect(getTopicForFaq("salas")?.guide?.slug).toBe("seguro-empresarial-guarulhos");
    expect(getTopicForFaq("eletricos")?.id).toBe("eletricos");
    expect(getEditorialTopic("seguro-byd-dolphin")?.id).toBe("eletricos");
    expect(getEditorialTopic("seguro-salas-comerciais")?.id).toBe("salas");
    expect(getEditorialTopic("seguro-danos-eletricos", "Seguro Residencial")?.id).toBe("residencial");
    expect(getEditorialTopic("riscos-da-atividade", "Seguro Empresarial")?.id).toBe("empresarial");
    expect(getEditorialTopic("seguro-de-vida-beneficiarios")?.id).toBe("vida");
    expect(getEditorialTopic("assunto-sem-correspondencia")).toBeUndefined();
  });

  it("oferece links no HTML sem apontar para a própria página", () => {
    const topic = getTopicForFaq("auto")!;
    const path = "/perguntas-frequentes-seguros/auto";
    const doc = parse(renderToStaticMarkup(
      <MemoryRouter><EditorialNextSteps topic={topic} currentPath={path} /></MemoryRouter>
    ));
    const nav = doc.querySelector('nav[aria-label="Continue a leitura"]')!;
    const links = Array.from(nav.querySelectorAll("a"));
    expect(links.some((link) => link.getAttribute("href") === path)).toBe(false);
    expect(links.some((link) => link.getAttribute("href") === "/guias/seguro-auto-guarulhos")).toBe(true);
    const articleLinks = links.filter((link) => link.getAttribute("href")?.startsWith("/blog/"));
    expect(articleLinks.length).toBeGreaterThan(0);
    for (const link of articleLinks) {
      expect(articles.some((article) => `/blog/${article.slug}` === link.getAttribute("href"))).toBe(true);
    }
  });

  it("evita repetir artigos quando a página já tem sua própria seleção", () => {
    const doc = parse(renderToStaticMarkup(
      <MemoryRouter>
        <EditorialNextSteps topic={getTopicForFaq("auto")} currentPath="/blog/exemplo" showArticles={false} />
      </MemoryRouter>
    ));
    const nav = doc.querySelector('nav[aria-label="Continue a leitura"]')!;
    expect(nav.querySelector('a[href="/guias/seguro-auto-guarulhos"]')).not.toBeNull();
    expect(nav.querySelector('a[href="/perguntas-frequentes-seguros/auto"]')).not.toBeNull();
    expect(nav.querySelector('a[href^="/blog/"]')).toBeNull();
  });

  it("mantém caminhos úteis quando não há correspondência temática", () => {
    const doc = parse(renderToStaticMarkup(
      <MemoryRouter><EditorialNextSteps currentPath="/blog/outro" /></MemoryRouter>
    ));
    expect(doc.querySelector('a[href="/guias-seguros"]')).not.toBeNull();
    expect(doc.querySelector('a[href="/perguntas-frequentes-seguros"]')).not.toBeNull();
    expect(getRelatedArticles("artigo-inexistente")).toEqual([]);
  });

  it("identifica autoria e revisão nos guias e mantém respostas no HTML", () => {
    const guia = GUIAS_PILARES_BY_SLUG["seguro-auto-guarulhos"];
    const doc = renderRoute(`/guias/${guia.slug}`, "/guias/:slug", <GuiaPilar />);
    expect(doc.querySelector('a[href="/blog/autor/sandra-patro"]')).not.toBeNull();
    expect(doc.querySelector('nav[aria-label="Continue a leitura"]')).not.toBeNull();
    expect(doc.querySelectorAll("#faq details")).toHaveLength(guia.faqs.length);
    const schemas = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'))
      .map((script) => JSON.parse(script.textContent || "{}"));
    const articleSchema = schemas.find((schema) => schema["@type"] === "Article");
    const faqSchema = schemas.find((schema) => schema["@type"] === "FAQPage");
    expect(articleSchema.author.url).toBe("https://www.patroseguros.com.br/sobre");
    expect(articleSchema.reviewedBy.url).toBe("https://www.patroseguros.com.br/blog/autor/sandra-patro");
    expect(faqSchema.mainEntity).toHaveLength(guia.faqs.length);
    guia.faqs.forEach((faq, index) => {
      const id = `resposta-guia-${index + 1}`;
      expect(doc.getElementById(id)?.textContent).toContain(faq.a);
      expect(faqSchema.mainEntity[index].url).toBe(`https://www.patroseguros.com.br/guias/${guia.slug}#${id}`);
      expect(faqSchema.mainEntity[index].acceptedAnswer.text).toBe(faq.a);
    });
    expect(doc.querySelector('nav[aria-label="Continue a leitura"] a[href="/guias/seguro-auto-guarulhos"]')).toBeNull();
  });

  it("conecta perguntas a guias e artigos, sem repetir o próprio destino", () => {
    const doc = renderRoute("/perguntas-frequentes-seguros/auto", "/perguntas-frequentes-seguros/:categoria", <PerguntasCategoria />);
    const nav = doc.querySelector('nav[aria-label="Continue a leitura"]')!;
    expect(nav.querySelector('a[href="/guias/seguro-auto-guarulhos"]')).not.toBeNull();
    expect(nav.querySelector('a[href="/perguntas-frequentes-seguros/auto"]')).toBeNull();
  });
});
