import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, BookOpen, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import { trackInternalLinkClick, trackWhatsAppClick } from "@/lib/tracking";
import {
  ALL_GLOSSARY_LETTERS,
  GLOSSARY_LETTERS_WITH_TERMS,
  getTermsByLetter,
  normalizeLetter,
} from "@/data/glossarioSegurosData";

const PHONE = "551151997500";

const GlossarioLetra = () => {
  const { letra: raw } = useParams<{ letra: string }>();
  const letter = normalizeLetter(raw ?? "");

  if (!letter) {
    return <Navigate to="/glossario-seguros" replace />;
  }

  const terms = useMemo(() => getTermsByLetter(letter), [letter]);

  if (terms.length === 0) {
    return <Navigate to="/glossario-seguros" replace />;
  }

  const idx = GLOSSARY_LETTERS_WITH_TERMS.indexOf(letter);
  const prevLetter = idx > 0 ? GLOSSARY_LETTERS_WITH_TERMS[idx - 1] : null;
  const nextLetter =
    idx >= 0 && idx < GLOSSARY_LETTERS_WITH_TERMS.length - 1
      ? GLOSSARY_LETTERS_WITH_TERMS[idx + 1]
      : null;

  const WA_MSG = `Olá! Vi o glossário de seguros da Patro (letra ${letter}) e tenho uma dúvida. Pode me ajudar?`;
  const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MSG)}`;

  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: `Glossário de Seguros — Letra ${letter} | Patro Seguros`,
    description: `Termos do mercado de seguros que começam com a letra ${letter}, explicados por corretor SUSEP.`,
    url: `https://www.patroseguros.com.br/glossario-seguros/letra/${letter.toLowerCase()}`,
    inDefinedTermSet: "https://www.patroseguros.com.br/glossario-seguros",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      inDefinedTermSet: "https://www.patroseguros.com.br/glossario-seguros",
      termCode: t.slug,
      url: `https://www.patroseguros.com.br/glossario-seguros/letra/${letter.toLowerCase()}#term-${t.slug}`,
    })),
  };

  return (
    <>
      <PageMeta
        title={`Glossário de Seguros — Letra ${letter} (${terms.length} termos) | Patro Seguros`}
        description={`${terms.length} termos de seguros começando com a letra ${letter}, explicados de forma simples por corretor SUSEP. Do jargão técnico ao dia a dia da apólice.`}
        skipBreadcrumb
      />
      <Helmet>
        <link
          rel="canonical"
          href={`https://www.patroseguros.com.br/glossario-seguros/letra/${letter.toLowerCase()}`}
        />
        <script type="application/ld+json">{JSON.stringify(definedTermSet)}</script>
      </Helmet>
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Glossário de seguros", url: "/glossario-seguros" },
          { name: `Letra ${letter}`, url: `/glossario-seguros/letra/${letter.toLowerCase()}` },
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb
            items={[
              { label: "Glossário de seguros", href: "/glossario-seguros" },
              { label: `Letra ${letter}`, href: `/glossario-seguros/letra/${letter.toLowerCase()}` },
            ]}
          />
        </div>

        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="section-label">Glossário A–Z</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Termos de seguro com a letra {letter}
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {terms.length} definições revisadas por corretor SUSEP. Passe o mouse ou toque para
              copiar o link direto de cada termo.
            </p>

            <nav
              className="mt-8 flex flex-wrap justify-center gap-1.5"
              aria-label="Navegar por letra"
            >
              {ALL_GLOSSARY_LETTERS.map((L) => {
                const enabled = GLOSSARY_LETTERS_WITH_TERMS.includes(L);
                const active = L === letter;
                if (!enabled) {
                  return (
                    <span
                      key={L}
                      aria-disabled="true"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 text-xs font-semibold text-muted-foreground/40"
                    >
                      {L}
                    </span>
                  );
                }
                return (
                  <Link
                    key={L}
                    to={`/glossario-seguros/letra/${L.toLowerCase()}`}
                    aria-current={active ? "page" : undefined}
                    className={
                      "inline-flex h-9 w-9 items-center justify-center rounded-md border text-xs font-semibold transition-colors " +
                      (active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary hover:text-primary")
                    }
                  >
                    {L}
                  </Link>
                );
              })}
            </nav>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <dl className="space-y-3">
              {terms.map((t) => (
                <div
                  key={t.slug}
                  id={`term-${t.slug}`}
                  className="rounded-xl border border-border bg-card p-5 scroll-mt-24"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <dt className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
                      {t.term}
                    </dt>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {t.categoryTitle}
                    </span>
                  </div>
                  <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t.definition}
                  </dd>
                  {t.related && t.related.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {t.related.map((r) => (
                        <Link
                          key={r.href}
                          to={r.href}
                          onClick={() =>
                            trackInternalLinkClick({
                              source: `glossario-letra-${letter}:${t.term}`,
                              destination: r.href,
                              label: r.label,
                            })
                          }
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                          {r.label} <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </dl>

            <nav
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
              aria-label="Navegação entre letras"
            >
              {prevLetter ? (
                <Link
                  to={`/glossario-seguros/letra/${prevLetter.toLowerCase()}`}
                  rel="prev"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Letra {prevLetter}
                </Link>
              ) : (
                <span />
              )}
              <Link
                to="/glossario-seguros"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Voltar ao glossário completo
              </Link>
              {nextLetter ? (
                <Link
                  to={`/glossario-seguros/letra/${nextLetter.toLowerCase()}`}
                  rel="next"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  Letra {nextLetter} <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </div>
        </section>

        <section className="py-12 bg-primary/5 border-y border-border">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Não achou o termo que procura?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Fala com a Patro no WhatsApp. Explicamos com seu caso real, sem juridiquês.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`glossario-letra-${letter}:cta`)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> Tirar dúvida no WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <StickyQuoteBar
        source={`glossario-letra-${letter.toLowerCase()}`}
        quoteHref="/cotacao"
        whatsappMessage={WA_MSG}
        ctaLabel="Falar com especialista"
      />
    </>
  );
};

export default GlossarioLetra;
