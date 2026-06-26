import { useState, useMemo, useEffect, Fragment } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User, ArrowLeft } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { getArticleImage } from "@/lib/blogImages";
import {
  getCategoryBySlug,
  getArticlesByCategory,
  slugifyCategory,
  allCategories,
  formatDate,
} from "@/lib/blogData";
import { getCanonicalUrl } from "@/lib/canonical";

const POSTS_PER_PAGE = 9;

const BlogCategory = () => {
  const { categoria } = useParams<{ categoria: string }>();
  const categoryName = categoria ? getCategoryBySlug(categoria) : undefined;
  const articles = useMemo(
    () => (categoryName ? getArticlesByCategory(categoryName) : []),
    [categoryName]
  );
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => setCurrentPage(1), [categoria]);

  if (!categoryName) return <Navigate to="/blog" replace />;

  const totalPages = Math.max(1, Math.ceil(articles.length / POSTS_PER_PAGE));
  const pageArticles = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return articles.slice(start, start + POSTS_PER_PAGE);
  }, [articles, currentPage]);

  const canonical = getCanonicalUrl(`/blog/categoria/${categoria}`);
  const title = `${categoryName} — Artigos | Blog Patro Seguros`;
  const description = `Artigos da categoria ${categoryName} no blog da Patro Seguros: guias, dicas e análises sobre ${categoryName.toLowerCase()} para você e sua empresa.`;

  return (
    <Fragment>
      <PageMeta title={title} description={description} canonical={canonical} />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: categoryName, url: canonical },
        ]}
      />
      <Header />
      <main id="main-content" className="outline-none">
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link to="/blog" className="inline-flex items-center text-sm text-white/60 hover:text-white mb-4">
              <ArrowLeft className="mr-1 h-4 w-4" /> Voltar ao Blog
            </Link>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Categoria</p>
            <h1 className="text-white mt-2 mb-3">{categoryName}</h1>
            <p className="text-white/70 max-w-2xl">
              {articles.length} {articles.length === 1 ? "artigo" : "artigos"} sobre {categoryName.toLowerCase()} no blog da Patro Seguros.
            </p>
          </div>
        </section>

        <section className="py-10 border-b">
          <div className="container mx-auto px-4">
            <nav aria-label="Categorias" className="flex flex-wrap gap-2 justify-center">
              <Link
                to="/blog"
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80"
              >
                Todos
              </Link>
              {allCategories.map(cat => {
                const slug = slugifyCategory(cat);
                const active = slug === categoria;
                return (
                  <Link
                    key={cat}
                    to={`/blog/categoria/${slug}`}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </nav>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageArticles.map(article => (
                <Link key={article.slug} to={`/artigos/${article.slug}`}>
                  <Card className="hover:shadow-lg transition-base h-full overflow-hidden group">
                    <div className="aspect-video w-full overflow-hidden">
                      <OptimizedImage
                        src={getArticleImage(article.slug)}
                        alt={article.title}
                        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <h2 className="text-lg font-semibold mt-3 mb-2">{article.title}</h2>
                      <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(article.date)}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime} min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <User className="h-3 w-3" />{article.author}
                        </span>
                        <span className="text-sm font-medium text-primary flex items-center">
                          Ler mais <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default BlogCategory;