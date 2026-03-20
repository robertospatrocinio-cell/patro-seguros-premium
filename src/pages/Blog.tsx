import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { getArticleImage } from "@/lib/blogImages";
import OptimizedImage from "@/components/OptimizedImage";
import { articles, allCategories, allTags, formatDate } from "@/lib/blogData";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...articles].sort((a, b) => b.date.localeCompare(a.date));
    if (selectedCategory) list = list.filter(a => a.category === selectedCategory);
    if (selectedTag) list = list.filter(a => a.tags.includes(selectedTag));
    return list;
  }, [selectedCategory, selectedTag]);

  return (
    <>
      <PageMeta title="Blog" description="Blog da Patro Seguros — artigos sobre seguro auto, residencial, empresarial, saúde, vida e mais. Dicas, guias e informações para proteger seu patrimônio." />
      <Header />
      <main id="main-content">
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-white mb-4">Blog Patro Seguros</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Conteúdo de autoridade sobre seguros, proteção patrimonial e dicas para você e sua empresa.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="mb-10 space-y-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => { setSelectedCategory(null); setSelectedTag(null); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!selectedCategory && !selectedTag ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >
                  Todos
                </button>
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setSelectedTag(null); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => { setSelectedTag(selectedTag === tag ? null : tag); setSelectedCategory(null); }}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors ${selectedTag === tag ? "bg-primary/20 text-primary font-semibold" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center mb-6">
              {filtered.length} {filtered.length === 1 ? "artigo encontrado" : "artigos encontrados"}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <Link key={article.slug} to={`/blog/${article.slug}`}>
                  <Card className="hover:shadow-lg transition-base h-full overflow-hidden group">
                    <div className="aspect-video w-full overflow-hidden">
                      <OptimizedImage
                        src={getArticleImage(article.slug)}
                        alt={article.title}
                        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{article.category}</span>
                      <h3 className="text-lg font-semibold mt-3 mb-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(article.date)}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime} min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><User className="h-3 w-3" />{article.author}</span>
                        <span className="text-sm font-medium text-primary flex items-center">
                          Ler mais <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
