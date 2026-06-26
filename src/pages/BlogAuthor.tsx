import { useMemo, Fragment } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, ArrowLeft, Award } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { getArticleImage } from "@/lib/blogImages";
import { articles, formatDate } from "@/lib/blogData";
import { getAuthorBySlug } from "@/lib/blogAuthors";
import { getCanonicalUrl } from "@/lib/canonical";

const BlogAuthor = () => {
  const { slug } = useParams<{ slug: string }>();
  const author = slug ? getAuthorBySlug(slug) : undefined;
  const authorArticles = useMemo(
    () =>
      author
        ? articles
            .filter(a => a.author.toLowerCase() === author.name.toLowerCase())
            .sort((a, b) => b.date.localeCompare(a.date))
        : [],
    [author]
  );

  if (!author) return <Navigate to="/blog" replace />;

  const canonical = getCanonicalUrl(`/blog/autor/${author.slug}`);
  const title = `${author.name} — ${author.role.split("—")[0].trim()} | Patro Seguros`;
  const description = author.shortBio;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${canonical}#person`,
    name: author.name,
    url: canonical,
    image: `https://www.patroseguros.com.br${author.image}`,
    jobTitle: author.role,
    description: author.shortBio,
    knowsAbout: author.expertise,
    worksFor: {
      "@type": "Organization",
      name: "Patro Seguros",
      url: "https://www.patroseguros.com.br",
    },
  };

  return (
    <Fragment>
      <PageMeta title={title} description={description} />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: author.name, url: canonical },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Header />
      <main id="main-content" className="outline-none">
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link
              to="/blog"
              className="inline-flex items-center text-sm text-white/60 hover:text-white mb-6"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Voltar ao Blog
            </Link>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-white/20 flex-shrink-0">
                <OptimizedImage
                  src={author.image}
                  alt={`Foto de ${author.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Autor</p>
                <h1 className="text-white mt-2 mb-2">{author.name}</h1>
                <p className="text-white/80 mb-4">{author.role}</p>
                <p className="text-white/70 max-w-2xl">{author.shortBio}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-b">
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold">Sobre {author.name.split(" ")[0]}</h2>
              {author.bio.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <aside>
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" /> Áreas de atuação
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {author.expertise.map(area => (
                  <li
                    key={area}
                    className="border-l-2 border-primary pl-3"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-2">
              Artigos de {author.name}
            </h2>
            <p className="text-muted-foreground mb-8">
              {authorArticles.length}{" "}
              {authorArticles.length === 1 ? "artigo publicado" : "artigos publicados"}
            </p>
            {authorArticles.length === 0 ? (
              <p className="text-muted-foreground">Nenhum artigo publicado ainda.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {authorArticles.map(article => (
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
                        <h3 className="text-lg font-semibold mt-3 mb-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(article.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime} min
                          </span>
                        </div>
                        <span className="text-sm font-medium text-primary flex items-center">
                          Ler artigo <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default BlogAuthor;