import { useMemo, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import OptimizedImage from "@/components/OptimizedImage";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, User, Filter } from "lucide-react";
import { calendar90dArticles } from "@/data/blogCalendar90dData";
import { getArticleImage } from "@/lib/blogImages";
import { formatDate } from "@/lib/blogData";

const TEMAS = [
  "Todos",
  "Seguro Auto",
  "Empresarial",
  "Seguro Frota",
  "Transporte",
  "Plano de Saúde",
  "Seguro Residencial",
  "Condomínio",
  "Seguro Fiança",
  "RC Profissional",
] as const;

type Tema = (typeof TEMAS)[number];

const BlogCalendario90Dias = () => {
  const [tema, setTema] = useState<Tema>("Todos");

  const posts = useMemo(() => {
    const ordered = [...calendar90dArticles].sort((a, b) => a.date.localeCompare(b.date));
    if (tema === "Todos") return ordered;
    return ordered.filter((a) => a.category === tema);
  }, [tema]);

  return (
    <Fragment>
      <PageMeta
        title="Calendário Editorial 90 Dias — Blog Patro Seguros"
        description="11 artigos novos do calendário editorial 90 dias da Patro Seguros: seguro auto, empresarial, frota, transporte, saúde, residencial, condomínio, fiança e RC profissional em Guarulhos."
      />
      <Header />
      <main id="main-content" className="outline-none">
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="text-white/70 mb-6">
              <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: "Calendário 90 dias" }]} />
            </div>
            <div className="text-center text-white">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full mb-4">
                Calendário editorial · 90 dias
              </span>
              <h1 className="mb-4">11 novos guias técnicos para empresas e famílias em Guarulhos</h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Conteúdo prático, atualizado e com dados reais de mercado, organizado por tema para resolver dúvidas comuns na hora de contratar ou renovar um seguro.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 justify-center mb-4 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filtrar por tema</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {TEMAS.map((t) => {
                const active = tema === t;
                const count = t === "Todos" ? calendar90dArticles.length : calendar90dArticles.filter((a) => a.category === t).length;
                if (count === 0 && t !== "Todos") return null;
                return (
                  <button
                    key={t}
                    onClick={() => setTema(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                  >
                    {t} <span className="opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>

            <p className="text-sm text-muted-foreground text-center mb-6">
              {posts.length} {posts.length === 1 ? "artigo" : "artigos"} no tema selecionado
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((article) => (
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
                      <h2 className="text-lg font-semibold mt-3 mb-2">{article.title}</h2>
                      <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(article.date)}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime} min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><User className="h-3 w-3" />{article.author}</span>
                        <span className="text-sm font-medium text-primary flex items-center">
                          Ler artigo <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link to="/blog" className="text-sm font-medium text-primary hover:underline">
                Ver todos os artigos do blog →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default BlogCalendario90Dias;