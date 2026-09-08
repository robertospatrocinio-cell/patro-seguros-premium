import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { getArticlesByTopic, formatDate, slugifyCategory } from "@/lib/blogData";
import { getArticleImage, getArticleImageAlt } from "@/lib/blogImages";

interface BlogRelatedByTopicProps {
  /** Tema da página (normalmente o título do produto de seguro). */
  topic: string;
  limit?: number;
  title?: string;
}

/**
 * Bloco "Artigos relacionados" para páginas de produto.
 * Puxa artigos do blog cuja categoria/tags combinam com o tema da página,
 * criando cross-linking natural entre conteúdo editorial e páginas comerciais.
 */
const BlogRelatedByTopic = ({
  topic,
  limit = 3,
  title = "Artigos relacionados",
}: BlogRelatedByTopicProps) => {
  const posts = getArticlesByTopic(topic, limit);
  if (posts.length === 0) return null;

  return (
    <section
      className="py-12 bg-muted/30"
      aria-labelledby="blog-relacionados-heading"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 id="blog-relacionados-heading" className="text-2xl font-bold">
            {title}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-background rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <OptimizedImage
                  src={getArticleImage(post.slug)}
                  alt={getArticleImageAlt(post.slug, post.title)}
                  width={640}
                  height={360}
                  className="w-full h-40 object-cover"
                />
              </Link>
              <div className="p-5">
                <Link
                  to={`/blog/categoria/${slugifyCategory(post.category)}`}
                  className="text-xs font-semibold uppercase tracking-wide text-primary hover:underline"
                >
                  {post.category}
                </Link>
                <h3 className="mt-2 text-base font-semibold leading-snug">
                  <Link to={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {formatDate(post.date)} · {post.readTime} min de leitura
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Ver todos os artigos do blog
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogRelatedByTopic;
