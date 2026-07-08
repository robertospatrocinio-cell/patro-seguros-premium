import { useState, useMemo, Fragment, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import SpeakableSchema from "@/components/SpeakableSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Search,
  X,
  MessageCircle,
  ShieldCheck,
  MapPin,
  Building2,
  Car,
  HeartPulse,
  Landmark,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { getArticleImage, getArticleImageAlt } from "@/lib/blogImages";
import OptimizedImage from "@/components/OptimizedImage";
import { articles, allCategories, allTags, formatDate, slugifyCategory } from "@/lib/blogData";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

const POSTS_PER_PAGE = 9;

const WHATSAPP_URL =
  "https://wa.me/551151997500?text=Ol%C3%A1%2C%20cheguei%20pelo%20blog%20da%20Patro%20Seguros%20e%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o.";

// Clusters editoriais: conectam o blog às páginas comerciais da Patro.
const CLUSTERS = [
  {
    icon: Car,
    title: "Seguro Auto",
    description:
      "Guias, comparativos e estudos locais sobre seguro para carros em Guarulhos, Cumbica e região.",
    href: "/seguro-auto-guarulhos",
    ctaHref: "/cotacao/auto",
    ctaLabel: "Cotar seguro auto",
    categoryFilter: "Seguro Auto",
  },
  {
    icon: Building2,
    title: "Seguro Empresarial",
    description:
      "Conteúdos para lojistas, PMEs, galpões em Cumbica e empresas de vistoria e logística.",
    href: "/seguro-empresarial-guarulhos",
    ctaHref: "/cotacao/empresarial",
    ctaLabel: "Proteger minha empresa",
    categoryFilter: "Seguro Empresarial",
  },
  {
    icon: HeartPulse,
    title: "Plano de Saúde",
    description:
      "Plano de saúde empresarial, MEI e coletivo em Guarulhos — comparativos e regras práticas.",
    href: "/planos-de-saude",
    ctaHref: "/cotacao/saude",
    ctaLabel: "Simular plano de saúde",
    categoryFilter: "Plano de Saúde",
  },
  {
    icon: Landmark,
    title: "Consórcio",
    description:
      "Consórcio de imóveis, veículos, elétricos e planejamento patrimonial em Guarulhos.",
    href: "/consorcio",
    ctaHref: "/cotacao/consorcio",
    ctaLabel: "Falar sobre consórcio",
    categoryFilter: "Consórcio",
  },
] as const;

// FAQ visível na página (mesmas perguntas do FAQPage schema).
const BLOG_FAQS = [
  {
    question: "Qual seguro é mais procurado em Guarulhos?",
    answer:
      "Seguro auto lidera em volume por causa dos índices de roubo e furto na região de Cumbica e Centro. Em seguida vêm seguro empresarial para lojistas e galpões, plano de saúde empresarial para PMEs e seguro residencial em bairros como Cidade Maia, Vila Galvão e Bonsucesso.",
  },
  {
    question: "Como escolher uma corretora de seguros em Guarulhos?",
    answer:
      "Verifique registro SUSEP, tempo de mercado, portfólio de seguradoras parceiras, atendimento local e cases documentados. A Patro Seguros é registrada na SUSEP, atende em Cidade Maia/Guarulhos e trabalha com 16+ seguradoras nacionais.",
  },
  {
    question: "Vale a pena comparar seguradoras antes de contratar?",
    answer:
      "Sim. Preço e coberturas variam muito entre seguradoras para o mesmo perfil — em Guarulhos as diferenças podem passar de 40% para o mesmo carro. Uma corretora independente cota em várias seguradoras e recomenda a proteção que faz mais sentido para o seu caso.",
  },
  {
    question: "A Patro atende seguro empresarial?",
    answer:
      "Sim. Atendemos empresas de todos os portes, com foco em lojistas de shoppings, galpões em Cumbica, transportadoras, clínicas, PMEs, empresas de vistoria e frotas. Cotamos seguro empresarial, RC profissional, cyber, D&O e frotas.",
  },
  {
    question: "A Patro faz cotação de plano de saúde empresarial?",
    answer:
      "Sim. Trabalhamos com 20+ operadoras de saúde e cotamos planos empresariais a partir de 2 vidas (PME) e planos MEI conforme regras vigentes em Guarulhos e região metropolitana.",
  },
  {
    question: "Posso contratar seguro pelo WhatsApp?",
    answer:
      "Sim. Você pode iniciar a cotação pelo WhatsApp (11) 5199-7500 e receber propostas em até 24h úteis. A contratação segue todas as exigências da seguradora e da SUSEP.",
  },
] as const;

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") ?? "";
  const categoryFromUrl = searchParams.get("categoria") ?? "";
  const pageFromUrl = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [query, setQuery] = useState(queryFromUrl);

  // Hydrate from URL params (?q=...&categoria=...) so search is shareable + SEO-aware.
  useEffect(() => {
    setQuery(queryFromUrl);
    setSelectedCategory(
      categoryFromUrl
        ? allCategories.find(c => slugifyCategory(c) === categoryFromUrl) ?? null
        : null,
    );
    setCurrentPage(pageFromUrl);
  }, [queryFromUrl, categoryFromUrl, pageFromUrl]);

  // Reflect query/category state back into the URL (debounced via useEffect).
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (query.trim()) next.set("q", query.trim()); else next.delete("q");
    if (selectedCategory) next.set("categoria", slugifyCategory(selectedCategory));
    else next.delete("categoria");
    if (currentPage > 1) next.set("page", String(currentPage));
    else next.delete("page");
    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true });
    }
  }, [query, selectedCategory, currentPage, searchParams, setSearchParams]);

  const filtered = useMemo(() => {
    let list = [...articles].sort((a, b) => b.date.localeCompare(a.date));
    if (selectedCategory) list = list.filter(a => a.category === selectedCategory);
    if (selectedTag) list = list.filter(a => a.tags.includes(selectedTag));
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [selectedCategory, selectedTag, query]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const currentArticles = useMemo(() => {
    const safePage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));
    const start = (safePage - 1) * POSTS_PER_PAGE;
    return filtered.slice(start, start + POSTS_PER_PAGE);
  }, [filtered, currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedTag, query]);

  const isSearching = query.trim().length > 0 || !!selectedCategory;
  const pageSuffix = currentPage > 1 ? ` — Página ${currentPage}` : "";
  const pageTitle = isSearching
    ? `Busca${query.trim() ? `: "${query.trim()}"` : ""}${selectedCategory ? ` em ${selectedCategory}` : ""} | Blog Patro Seguros`
    : `Blog de Seguros em Guarulhos${pageSuffix} | Patro Seguros`;
  const pageDescription = isSearching
    ? `${filtered.length} ${filtered.length === 1 ? "artigo encontrado" : "artigos encontrados"}${query.trim() ? ` para "${query.trim()}"` : ""}${selectedCategory ? ` na categoria ${selectedCategory}` : ""} no blog da Patro Seguros.`
    : currentPage > 1
      ? `Página ${currentPage} do blog da Patro Seguros — mais guias sobre seguro auto, empresarial, saúde, vida, residência e consórcio em Guarulhos.`
      : "Guias da Patro sobre seguro auto, empresarial, saúde, vida, residência e consórcio em Guarulhos. Conteúdo local para escolher melhor.";

  // Clean canonical per page: /blog for page 1, /blog?page=N for N>1.
  // Paginated pages are noindex,follow to prevent duplicate content while
  // keeping crawlers walking through the article links.
  const canonicalPath = currentPage > 1 ? `/blog?page=${currentPage}` : "/blog";
  const prevUrl = currentPage > 2
    ? `${CANONICAL_BASE_URL}/blog?page=${currentPage - 1}`
    : currentPage === 2 ? `${CANONICAL_BASE_URL}/blog` : null;
  const nextUrl = currentPage < totalPages
    ? `${CANONICAL_BASE_URL}/blog?page=${currentPage + 1}`
    : null;

  const buildPageHref = (n: number) => (n <= 1 ? "/blog" : `/blog?page=${n}`);

  // Compact page number list (1 … c-1 c c+1 … total)
  const pageNumbers = useMemo<(number | "…")[]>(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const set = new Set<number>([1, 2, totalPages - 1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
    const list = [...set].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
    const out: (number | "…")[] = [];
    list.forEach((n, i) => {
      if (i > 0 && n - (list[i - 1] as number) > 1) out.push("…");
      out.push(n);
    });
    return out;
  }, [currentPage, totalPages]);

  // Artigo em destaque: pega o mais recente que tenha capa dedicada.
  const sortedAll = useMemo(
    () => [...articles].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );
  const featured = sortedAll[0];
  const featuredImg = getArticleImage(featured.slug);
  const featuredAlt = getArticleImageAlt(featured.slug, featured.title);

  // ItemList JSON-LD com os 20 artigos mais recentes (evita payload gigante).
  const itemListSchema = useMemo(() => {
    const items = sortedAll.slice(0, 20).map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${CANONICAL_BASE_URL}/artigos/${a.slug}`,
      name: a.title,
    }));
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${CANONICAL_BASE_URL}/blog#collection`,
      name: "Blog Patro Seguros",
      description: pageDescription,
      url: `${CANONICAL_BASE_URL}/blog`,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${CANONICAL_BASE_URL}/#website` },
      about: [
        { "@type": "Thing", name: "Seguro Auto" },
        { "@type": "Thing", name: "Seguro Empresarial" },
        { "@type": "Thing", name: "Plano de Saúde" },
        { "@type": "Thing", name: "Consórcio" },
        { "@type": "Place", name: "Guarulhos, SP" },
      ],
      publisher: { "@id": `${CANONICAL_BASE_URL}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        name: "Artigos recentes — Blog Patro Seguros",
        numberOfItems: items.length,
        itemListElement: items,
      },
    };
  }, [sortedAll, pageDescription]);

  // Blog schema (com posts recentes como blogPost).
  const blogSchema = useMemo(() => {
    const posts = sortedAll.slice(0, 20).map((a) => ({
      "@type": "BlogPosting",
      "@id": `${CANONICAL_BASE_URL}/artigos/${a.slug}#article`,
      headline: a.title.length > 110 ? a.title.slice(0, 107) + "..." : a.title,
      description: a.excerpt,
      url: `${CANONICAL_BASE_URL}/artigos/${a.slug}`,
      image: `${CANONICAL_BASE_URL}${getArticleImage(a.slug)}`,
      datePublished: a.date,
      dateModified: a.updatedAt || a.date,
      author: { "@type": "Person", name: a.author },
      publisher: { "@id": `${CANONICAL_BASE_URL}/#organization` },
      articleSection: a.category,
      keywords: a.tags.join(", "),
      inLanguage: "pt-BR",
      mainEntityOfPage: `${CANONICAL_BASE_URL}/artigos/${a.slug}`,
    }));
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${CANONICAL_BASE_URL}/blog#blog`,
      name: "Blog Patro Seguros",
      description: pageDescription,
      url: `${CANONICAL_BASE_URL}/blog`,
      inLanguage: "pt-BR",
      publisher: { "@id": `${CANONICAL_BASE_URL}/#organization` },
      blogPost: posts,
    };
  }, [sortedAll, pageDescription]);

  return (
    <Fragment>
      <PageMeta
        title={pageTitle}
        description={pageDescription}
        noindex={isSearching || currentPage > 1}
        ogType="website"
        ogImage={`${CANONICAL_BASE_URL}${featuredImg}`}
        ogImageAlt={`Blog Patro Seguros — ${featured.title}`}
        canonicalPath={canonicalPath}
      />
      <Helmet>
        {prevUrl && <link rel="prev" href={prevUrl} />}
        {nextUrl && <link rel="next" href={nextUrl} />}
      </Helmet>
      <SpeakableSchema url="https://www.patroseguros.com.br/blog" />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />
      {!isSearching && (
        <>
          <FAQSchema faqs={BLOG_FAQS.map((f) => ({ question: f.question, answer: f.answer }))} />
          <Helmet>
            <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
          </Helmet>
        </>
      )}
      <Header />
      <main id="main-content" className="outline-none">
        {/* Hero editorial */}
        <section className="gradient-hero py-16 md:py-20" aria-labelledby="blog-heading">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-3 flex items-center justify-center gap-2">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Central editorial · Guarulhos/SP
            </p>
            <h1 id="blog-heading" className="text-white mb-4">
              Blog Patro Seguros
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Guias, estudos e orientações sobre seguros para proteger famílias, empresas e patrimônios em Guarulhos e região.
            </p>
            <p className="text-sm text-white/60 max-w-2xl mx-auto mt-4">
              No Blog da Patro Seguros você encontra conteúdos sobre seguro auto, empresarial, plano de saúde, residencial, vida, consórcio e proteção patrimonial — sempre com foco em decisões mais seguras e bem informadas.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Link to="/cotacao">
                <Button size="lg" className="rounded-lg h-11 bg-[#F2994A] hover:bg-[#e0873a] text-white">
                  Cotar meu seguro agora
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Cotar pelo WhatsApp">
                <Button size="lg" variant="outline" className="rounded-lg h-11 bg-white/5 border-white/30 text-white hover:bg-white/15">
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  Falar no WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12 bg-muted/30" aria-labelledby="destaque-heading">
          <div className="container mx-auto px-4">
            <h2 id="destaque-heading" className="text-center text-2xl md:text-3xl font-semibold mb-6">
              Conteúdos em Destaque
            </h2>
            <Link
              to={`/artigos/${featured.slug}`}
              className="block max-w-5xl mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              aria-label={`Ler artigo em destaque: ${featured.title}`}
            >
              <Card className="overflow-hidden group md:flex hover:shadow-xl transition-base">
                <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                   <OptimizedImage
                    src={featuredImg}
                    alt={featuredAlt}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="md:w-1/2 flex flex-col justify-center p-6 md:p-8">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded w-fit mb-3">
                    <Sparkles className="inline h-3 w-3 mr-1 -mt-0.5" aria-hidden="true" />
                    Em destaque · {featured.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-4 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                    </span>
                    {featured.updatedAt && featured.updatedAt !== featured.date && (
                      <span className="flex items-center gap-1">
                        Atualizado em <time dateTime={featured.updatedAt}>{formatDate(featured.updatedAt)}</time>
                      </span>
                    )}
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" />{featured.readTime} min</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" aria-hidden="true" />{featured.author}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary inline-flex items-center">
                    Ler guia completo <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            {/* CTA após o destaque */}
            <div className="max-w-5xl mx-auto mt-8 rounded-2xl border bg-background p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Não sabe qual seguro faz sentido para você?</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xl">
                  A Patro Seguros compara seguradoras e ajuda você a escolher a melhor proteção para seu momento, sua família ou sua empresa.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Link to="/contato"><Button variant="outline" size="sm">Falar com consultor</Button></Link>
                <Link to="/cotacao"><Button size="sm" className="bg-[#F2994A] hover:bg-[#e0873a] text-white">Cotar agora</Button></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Clusters editoriais */}
        <section className="py-14 border-b" aria-labelledby="clusters-heading">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Cluster editorial</span>
              <h2 id="clusters-heading" className="mt-2 text-2xl md:text-3xl font-semibold">Guias de Seguro em Guarulhos</h2>
              <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
                Navegue pelos principais temas do blog e acesse diretamente a página comercial para uma cotação sem compromisso.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CLUSTERS.map((c) => (
                <div key={c.title} className="rounded-2xl border bg-card p-5 flex flex-col hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <c.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold mb-1.5">{c.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{c.description}</p>
                  <div className="mt-4 flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(c.categoryFilter);
                        setSelectedTag(null);
                        setQuery("");
                        document.getElementById("artigos-lista")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="text-xs font-medium text-primary hover:underline text-left"
                    >
                      Ver artigos de {c.title} →
                    </button>
                    <Link to={c.href} className="text-xs text-muted-foreground hover:text-primary">
                      Página do serviço
                    </Link>
                    <Link to={c.ctaHref} className="text-xs font-semibold text-[#F2994A] hover:underline mt-1">
                      {c.ctaLabel} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="artigos-lista" className="py-16" aria-labelledby="artigos-heading">
          <div className="container mx-auto px-4">
            <h2 id="artigos-heading" className="sr-only">Artigos do blog</h2>
            {/* Search bar */}
            <div className="mb-8 max-w-2xl mx-auto">
              <label htmlFor="blog-search" className="sr-only">Buscar no blog</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por título, descrição ou tag..."
                  className="pl-10 pr-10 h-12 rounded-xl"
                  aria-label="Buscar artigos no blog"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Limpar busca"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {selectedCategory && (
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span>Filtrando por categoria:</span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                    {selectedCategory}
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(null)}
                      aria-label={`Remover filtro ${selectedCategory}`}
                      className="hover:text-primary/70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="mb-10 space-y-4" role="group" aria-label="Filtros do blog">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => { setSelectedCategory(null); setSelectedTag(null); setQuery(""); }}
                  aria-pressed={!selectedCategory && !selectedTag}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!selectedCategory && !selectedTag ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >
                  Todos
                </button>
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                    aria-pressed={selectedCategory === cat}
                    aria-label={`Filtrar por categoria ${cat}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 justify-center" role="group" aria-label="Filtrar por tag">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => { setSelectedTag(selectedTag === tag ? null : tag); setSelectedCategory(null); }}
                    aria-pressed={selectedTag === tag}
                    aria-label={`Filtrar pela tag ${tag}`}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors ${selectedTag === tag ? "bg-primary/20 text-primary font-semibold" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center mb-6" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "artigo encontrado" : "artigos encontrados"}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentArticles.map((article, index) => (
                <Link
                  key={article.slug}
                  to={`/artigos/${article.slug}`}
                  aria-label={`Ler artigo: ${article.title}`}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                >
                  <Card className="hover:shadow-lg transition-base h-full overflow-hidden group">
                    <div className="aspect-video w-full overflow-hidden">
                      <OptimizedImage
                        src={getArticleImage(article.slug)}
                        alt={getArticleImageAlt(article.slug, article.title)}
                        loading={index < 3 ? "eager" : "lazy"}
                        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{article.category}</span>
                      <h3 className="text-lg font-semibold mt-3 mb-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          <time dateTime={article.date}>{formatDate(article.date)}</time>
                        </span>
                        {article.updatedAt && article.updatedAt !== article.date && (
                          <span className="flex items-center gap-1 text-primary/80">
                            Atualizado <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                          </span>
                        )}
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" />{article.readTime} min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><User className="h-3 w-3" aria-hidden="true" />{article.author}</span>
                        <span className="text-sm font-medium text-primary flex items-center">
                          Ler guia completo <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {currentArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhum artigo encontrado{query.trim() ? ` para "${query.trim()}"` : ""}{selectedCategory ? ` em ${selectedCategory}` : ""}.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => { setQuery(""); setSelectedCategory(null); setSelectedTag(null); }}
                >
                  Limpar filtros
                </Button>
              </div>
            )}

            {totalPages > 1 && (
              <nav className="mt-12 flex justify-center items-center gap-4" aria-label="Paginação do blog">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground" aria-current="page">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Próxima página"
                >
                  Próxima
                </Button>
              </nav>
            )}
          </div>
        </section>

        {/* Autoridade local */}
        <section className="py-14 bg-muted/30 border-y" aria-labelledby="local-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-3">
              <MapPin className="h-4 w-4" aria-hidden="true" /> SEO local
            </div>
            <h2 id="local-heading" className="text-2xl md:text-3xl font-semibold mb-4">
              Seguros em Guarulhos e Região
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              A Patro Seguros acompanha as necessidades de proteção de famílias, profissionais e empresas em{" "}
              <Link to="/seguros-guarulhos" className="text-primary hover:underline">Guarulhos</Link>,
              Cumbica, Centro, Vila Galvão, Pimentas, Bonsucesso e região. Nossos conteúdos consideram dúvidas reais de
              clientes locais e ajudam na escolha de seguros mais adequados para cada perfil — do{" "}
              <Link to="/seguro-auto-guarulhos" className="text-primary hover:underline">seguro auto</Link> ao{" "}
              <Link to="/seguro-empresarial-guarulhos" className="text-primary hover:underline">seguro empresarial</Link>,
              passando por{" "}
              <Link to="/planos-de-saude" className="text-primary hover:underline">plano de saúde</Link>,{" "}
              <Link to="/seguro-residencial" className="text-primary hover:underline">seguro residencial</Link>,{" "}
              <Link to="/seguro-vida" className="text-primary hover:underline">seguro de vida</Link> e{" "}
              <Link to="/consorcio" className="text-primary hover:underline">consórcio</Link>.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/corretora-de-seguros-em-guarulhos"><Button variant="outline" size="sm">Sobre a corretora em Guarulhos</Button></Link>
              <Link to="/seguradoras"><Button variant="outline" size="sm">Seguradoras parceiras</Button></Link>
              <Link to="/contato"><Button variant="outline" size="sm">Falar com consultor</Button></Link>
            </div>
          </div>
        </section>

        {/* E-E-A-T / Editorial trust */}
        <section className="py-10" aria-labelledby="editorial-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="rounded-2xl border bg-card p-6 md:p-7 flex flex-col md:flex-row gap-5 md:items-start">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 id="editorial-heading" className="text-lg font-semibold mb-2">Padrão editorial Patro Seguros</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Conteúdo produzido e revisado pela equipe da Patro Seguros — corretora registrada na SUSEP (nº 212113511), com sede em Cidade Maia, Guarulhos/SP, atendimento consultivo e mais de 500 casos empresariais atendidos. Todos os artigos citam fontes, datas de publicação e de atualização.
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  <Link to="/sobre" className="text-primary hover:underline">Sobre a Patro</Link>
                  <Link to="/contato" className="text-primary hover:underline">Contato</Link>
                  <Link to="/seguradoras" className="text-primary hover:underline">Seguradoras parceiras</Link>
                  <a
                    href="https://www2.susep.gov.br/safe/menumercado/regcorretores/pesquisa.asp"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary hover:underline"
                  >
                    Consultar registro SUSEP
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 bg-muted/30 border-y" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">FAQ</span>
              <h2 id="faq-heading" className="mt-2 text-2xl md:text-3xl font-semibold">Dúvidas Frequentes sobre Seguros</h2>
            </div>
            <dl className="space-y-4">
              {BLOG_FAQS.map((f) => (
                <details key={f.question} className="group rounded-xl border bg-background p-4">
                  <summary className="cursor-pointer list-none font-semibold text-sm md:text-base flex justify-between items-center">
                    <span>{f.question}</span>
                    <span className="text-primary transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-14" aria-labelledby="cta-final-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="rounded-3xl gradient-hero p-8 md:p-10 text-center">
              <h2 id="cta-final-heading" className="text-white text-2xl md:text-3xl font-semibold mb-3">
                Pronto para comparar seguradoras e economizar?
              </h2>
              <p className="text-white/75 text-sm md:text-base max-w-xl mx-auto">
                Nosso time analisa seu perfil, compara 16+ seguradoras e envia a melhor recomendação — sem custo e sem compromisso.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Link to="/cotacao">
                  <Button size="lg" className="rounded-lg bg-[#F2994A] hover:bg-[#e0873a] text-white">
                    Cotar meu seguro agora
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Cotar seguro pelo WhatsApp">
                  <Button size="lg" variant="outline" className="rounded-lg bg-white/5 border-white/30 text-white hover:bg-white/15">
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                    Cotar pelo WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Blog;
