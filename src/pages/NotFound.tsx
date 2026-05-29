import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Home,
  ArrowLeft,
  Search,
  ArrowRight,
  MessageCircle,
  Phone,
} from "lucide-react";
import { INSURANCE_HUB } from "@/lib/insuranceHubLinks";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const WHATSAPP_URL =
  "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o.";

// Top categorias mais buscadas — ordem otimizada por intent
const TOP_CATEGORY_TITLES = [
  "Veículos",
  "Pessoa, Vida e Saúde",
  "Patrimônio e Imóveis",
  "Empresarial e Indústria",
  "Agro e Rural",
  "Responsabilidade Civil (RC)",
  "Consórcio",
  "Seguros em Guarulhos",
];

const NotFound = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const categories = useMemo(
    () =>
      TOP_CATEGORY_TITLES.map((t) =>
        INSURANCE_HUB.find((c) => c.title === t),
      ).filter(Boolean) as typeof INSURANCE_HUB,
    [],
  );

  // Sugestão automática: tenta inferir um seguro a partir do path quebrado
  const suggestion = useMemo(() => {
    const slug = location.pathname.toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!slug) return null;
    const all = INSURANCE_HUB.flatMap((c) => c.links);
    return (
      all.find((l) => l.href.toLowerCase().replace(/[^a-z0-9-]/g, "") === slug) ||
      all.find((l) => slug.length > 4 && l.href.includes(slug.slice(0, Math.min(slug.length, 12)))) ||
      null
    );
  }, [location.pathname]);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return INSURANCE_HUB.flatMap((c) => c.links)
      .filter((l) => l.label.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  return (
    <>
      <PageMeta
        title="Página Não Encontrada (404) | Patro Seguros"
        description="A página que você está procurando não existe. Encontre o seguro ideal por categoria ou solicite uma cotação gratuita com a Patro Seguros."
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden" aria-labelledby="not-found-heading">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(215,100%,60%,0.12),transparent)]" />
          <div className="container mx-auto px-4 relative">
            <div className="py-20 md:py-28 max-w-3xl mx-auto text-center">
              <div className="text-6xl md:text-7xl font-heading font-bold text-white/90 mb-3 tracking-tight">
                404
              </div>
              <h1 id="not-found-heading" className="text-white text-balance mb-4">
                Não encontramos essa página
              </h1>
              <p className="text-base md:text-lg text-white/60 mb-8 max-w-xl mx-auto">
                O endereço que você acessou não existe ou foi movido. Use a busca abaixo,
                escolha uma categoria ou solicite uma cotação direto pelo WhatsApp.
              </p>

              {suggestion && (
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-2">
                    Você quis dizer:
                  </p>
                  <Link to={suggestion.href}>
                    <Button
                      size="lg"
                      className="rounded-xl bg-white text-primary hover:bg-white/90 h-11 px-6 text-sm font-semibold"
                    >
                      {suggestion.label} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}

              {/* Busca */}
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (filteredResults[0]) window.location.href = filteredResults[0].href;
                }}
                className="relative max-w-md mx-auto"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="search"
                  placeholder="Buscar seguro (ex: auto, vida, residencial)…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-11 pl-9 bg-white/95 text-foreground rounded-xl"
                  aria-label="Buscar tipo de seguro"
                />
                {filteredResults.length > 0 && (
                  <ul
                    className="absolute z-20 left-0 right-0 mt-2 bg-card text-card-foreground border rounded-xl shadow-xl overflow-hidden text-left"
                    role="listbox"
                  >
                    {filteredResults.map((r) => (
                      <li key={r.href}>
                        <Link
                          to={r.href}
                          className="block px-4 py-2.5 text-sm hover:bg-muted transition-base flex items-center justify-between"
                        >
                          <span>{r.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </form>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Link to="/">
                  <Button
                    size="lg"
                    className="rounded-xl bg-white/[0.08] border border-white/10 text-white hover:bg-white/[0.15] h-11 px-6 text-sm"
                  >
                    <Home className="mr-2 h-4 w-4" /> Página Inicial
                  </Button>
                </Link>
                <Button
                  size="lg"
                  onClick={() => window.history.back()}
                  className="rounded-xl bg-white/[0.08] border border-white/10 text-white hover:bg-white/[0.15] h-11 px-6 text-sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categorias principais */}
        <section className="py-16 md:py-20" aria-labelledby="categorias-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="section-label">Categorias</span>
              <h2 id="categorias-heading" className="mt-3">
                Encontre seu seguro por categoria
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((cat) => (
                <article key={cat.title} className="premium-card p-6">
                  <h3 className="text-base font-semibold mb-4">{cat.title}</h3>
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 list-none">
                    {cat.links.slice(0, 8).map((l) => (
                      <li key={l.href}>
                        <Link
                          to={l.href}
                          className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-base inline-flex items-center gap-1"
                        >
                          <ArrowRight className="h-3 w-3 opacity-60" aria-hidden="true" />
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* CTA fixo no rodapé da viewport */}
      <div className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none">
        <div className="container mx-auto max-w-3xl">
          <div className="pointer-events-auto premium-card flex flex-col sm:flex-row items-center justify-between gap-3 p-4 shadow-2xl border-primary/20">
            <p className="text-sm font-medium text-foreground text-center sm:text-left">
              Não encontrou o que procurava? Fale com um consultor agora.
            </p>
            <div className="flex gap-2 w-full sm:w-auto">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("404-sticky-cta")}
                className="flex-1 sm:flex-none"
              >
                <Button className="w-full rounded-xl h-10 px-4 text-sm bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </Button>
              </a>
              <Link
                to="/cotacao"
                onClick={() => trackCotacaoClick("404-sticky-cta")}
                className="flex-1 sm:flex-none"
              >
                <Button className="w-full rounded-xl h-10 px-4 text-sm">
                  Cotação <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:1151997500" aria-label="Ligar (11) 5199-7500" className="hidden md:inline-flex">
                <Button variant="outline" className="rounded-xl h-10 px-3 text-sm">
                  <Phone className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NotFound;
