import { describe, expect, it } from "vitest";
import { consultorioArticles } from "@/data/blogConsultorioData";
import { flatArticles } from "@/data/blogFlatData";
import { salaComercialArticles } from "@/data/blogSalaComercialData";
import { articles, getArticleMeta, formatDate } from "../blogData";
import { getMetadataForRoute } from "../seoMetadata";
import { blogLastmod, normalizeBlogDates } from "../blogDates";

const corrected = [
  ...consultorioArticles,
  ...flatArticles,
  ...salaComercialArticles,
  { slug: "estudo-sinistros-prevencao-guarulhos-2026", date: "2026-11-14" },
];

describe("consistência editorial das publicações corrigidas", () => {
  it("distribui os 33 artigos por dias distintos dentro do intervalo solicitado", () => {
    expect(corrected).toHaveLength(33);
    expect(new Set(corrected.map(post => post.date)).size).toBe(33);
    for (const post of corrected) {
      expect(post.date >= "2026-09-15" && post.date <= "2026-11-16").toBe(true);
    }
  });

  it.each(corrected)("sincroniza catálogo, metadados e lastmod de $slug", post => {
    const actual = getArticleMeta(post.slug)!;
    const safe = normalizeBlogDates(post);
    const metadata = getMetadataForRoute(`/blog/${post.slug}`)!;
    expect(actual).toBeDefined();
    expect(actual.date).toBe(safe.date);
    expect(metadata.h1).toBe(actual.title);
    expect(metadata.title).toBe(actual.seoTitle || `${actual.title} | Patro Seguros`);
    expect(metadata.description).toBe(actual.excerpt);
    expect(metadata.schema.headline).toBe(actual.title);
    if (actual.date) {
      expect(metadata.schema.datePublished).toBe(actual.date);
      expect(metadata.schema.dateModified).toBe(blogLastmod(actual));
      expect(formatDate(actual.date)).not.toBe("");
    } else {
      expect(metadata.schema).not.toHaveProperty("datePublished");
      expect(metadata.schema).not.toHaveProperty("dateModified");
      expect(blogLastmod(actual)).toBe("");
    }
  });

  it("individualiza títulos e descrições dos 33 artigos corrigidos", () => {
    const metadata = corrected.map(post => getMetadataForRoute(`/blog/${post.slug}`)!);
    expect(new Set(metadata.map(post => post.title)).size).toBe(corrected.length);
    expect(new Set(metadata.map(post => post.description)).size).toBe(corrected.length);
    for (const post of metadata) {
      expect(post.title.trim()).not.toBe("");
      expect(post.description.trim()).not.toBe("");
    }
  });

  it("não exporta datas futuras de publicação ou revisão", () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const post of articles) {
      expect(!post.date || post.date <= today).toBe(true);
      expect(!post.updatedAt || (post.updatedAt <= today && post.updatedAt >= post.date)).toBe(true);
    }
  });
});
