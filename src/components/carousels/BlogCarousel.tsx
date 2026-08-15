import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import CarouselShell from "./CarouselShell";
import { articles, formatDate } from "@/lib/blogData";
import { getArticleImage, getArticleImageAlt } from "@/lib/blogImages";

const MAX_POSTS = 9;

export const BlogCarousel = () => {
  const posts = useMemo(
    () =>
      [...articles]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, MAX_POSTS),
    []
  );

  if (posts.length === 0) return null;

  return (
    <CarouselShell
      label="Artigos do blog da Patro Seguros"
      eyebrow="Conteúdo"
      title="Informação para proteger melhor"
      description="Orientações sobre seguros, prevenção e proteção patrimonial para pessoas e empresas."
      className="bg-secondary"
      footer={
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md sm:ml-auto"
        >
          Ver todos os artigos <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      }
    >
      {posts.map((post) => (
        <li
          key={post.slug}
          className="min-w-0 shrink-0 basis-[85%] sm:basis-[48%] lg:basis-[32%]"
        >
          <article className="h-full">
            <Link
              to={`/blog/${post.slug}`}
              className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="aspect-[16/9] overflow-hidden bg-muted">
                <img
                  src={getArticleImage(post.slug)}
                  alt={getArticleImageAlt(post.slug, post.title)}
                  width={640}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-muted-foreground">
                  {post.category}
                </span>
                <h3 className="font-heading text-lg font-bold leading-snug tracking-tight mt-2 line-clamp-3">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-5">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                  {post.readTime > 0 && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {post.readTime} min de leitura
                    </span>
                  )}
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Ler artigo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </article>
        </li>
      ))}
    </CarouselShell>
  );
};

export default BlogCarousel;
