/**
 * Índice unificado de conteúdo do blog.
 *
 * Mescla os 8 módulos de conteúdo em um único `Record<slug, Article>`,
 * usado por `BlogArticle.tsx` via import SÍNCRONO. Importar de forma
 * síncrona é essencial para o SSG (puppeteer) capturar o conteúdo
 * renderizado sem depender de race de `useEffect + import()`.
 */
import { articlesContent } from "@/data/blogArticlesContent";
import { autoArticlesContent } from "@/data/blogAutoContent";
import { agroArticlesContent } from "@/data/blogAgroContent";
import { guarulhosArticlesContent } from "@/data/blogGuarulhosContent";
import { guarulhosLojistasArticlesContent } from "@/data/blogGuarulhosLojistasContent";
import { patroPrivateArticlesContent } from "@/data/blogPatroPrivateContent";
import { blogVeterinariaArticlesContent } from "@/data/blogVeterinariaContent";
import { vistoriaArticlesContent } from "@/data/blogVistoriaContent";
import { odontologiaArticlesContent } from "@/data/blogOdontologiaContent";
import { saudeAgroArticlesContent } from "@/data/blogSaudeAgroContent";
import { dicasRcResidContent } from "@/data/blogDicasRcResidContent";
import { lote5ArticlesContent } from "@/data/blogLote5Content";

export type BlogArticleContent = {
  title: string;
  content: string;
  faqs: { q: string; a: string }[];
};

// Ordem importa apenas em caso de duplicata de slug — fontes mais
// específicas sobrescrevem o catálogo genérico `articlesContent`.
export const blogContentIndex: Record<string, BlogArticleContent> = {
  ...(articlesContent as Record<string, BlogArticleContent>),
  ...(autoArticlesContent as Record<string, BlogArticleContent>),
  ...(agroArticlesContent as Record<string, BlogArticleContent>),
  ...(guarulhosArticlesContent as Record<string, BlogArticleContent>),
  ...(guarulhosLojistasArticlesContent as Record<string, BlogArticleContent>),
  ...(patroPrivateArticlesContent as unknown as Record<string, BlogArticleContent>),
  ...(blogVeterinariaArticlesContent as Record<string, BlogArticleContent>),
  ...(vistoriaArticlesContent as Record<string, BlogArticleContent>),
  ...(odontologiaArticlesContent as Record<string, BlogArticleContent>),
  ...(saudeAgroArticlesContent as Record<string, BlogArticleContent>),
  ...(dicasRcResidContent as Record<string, BlogArticleContent>),
  ...(lote5ArticlesContent as Record<string, BlogArticleContent>),
};

export const blogContentSlugs: string[] = Object.keys(blogContentIndex);

export function getBlogContent(slug: string | undefined): BlogArticleContent | undefined {
  if (!slug) return undefined;
  return blogContentIndex[slug];
}
