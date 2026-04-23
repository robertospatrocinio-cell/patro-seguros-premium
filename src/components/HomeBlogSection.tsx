import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/OptimizedImage";
import { getArticleImage } from "@/lib/blogImages";
import { articles as allBlogArticles, formatDate } from "@/lib/blogData";

const blogDestaques = [...allBlogArticles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

const HomeBlogSection = () => (
  <section className="py-16 md:py-32 bg-background" aria-labelledby="blog-heading">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <span className="section-label">Blog</span>
        <h2 id="blog-heading" className="mt-3">Últimos artigos</h2>
        <p className="text-[14px] text-muted-foreground mt-4">Conteúdo de autoridade sobre seguros, proteção patrimonial e dicas para você e sua empresa.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {blogDestaques.map((article) => (
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
                <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-wider">{article.category}</span>
                <h3 className="text-[15px] font-semibold mt-3 mb-2 tracking-tight">{article.title}</h3>
                <p className="text-[13px] text-muted-foreground mb-3 leading-relaxed">{article.excerpt}</p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(article.date)}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><User className="h-3 w-3" />{article.author}</span>
                  <span className="text-[13px] font-medium text-primary flex items-center">
                    Ler mais <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/blog">
          <Button variant="outline" className="rounded-lg text-[13px] h-10">Ver todos os artigos <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" /></Button>
        </Link>
      </div>
    </div>
  </section>
);

export default HomeBlogSection;