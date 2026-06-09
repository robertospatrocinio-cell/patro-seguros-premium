import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { articles, formatDate } from "@/lib/blogData";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/OptimizedImage";
import { getArticleImage } from "@/lib/blogImages";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const BlogClinicasVeterinarias = () => {
  const categoryArticles = articles.filter(a => a.category === "Veterinária");

  return (
    <>
      <PageMeta
        title="Gestão e Proteção para Clínicas Veterinárias – Blog Patro Seguros"
        description="Conteúdo especializado para veterinários, clínicas e hospitais pet: seguros, gestão de riscos, LGPD e proteção patrimonial."
      />
      <Header />
      <main id="main-content">
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-white mb-4">Gestão e Proteção para Clínicas Veterinárias</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Tudo o que você precisa saber para blindar seu negócio pet e focar no cuidado animal.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArticles.map((article) => (
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

export default BlogClinicasVeterinarias;
