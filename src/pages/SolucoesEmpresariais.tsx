import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Warehouse, ShieldCheck, Scale } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";

const solutions = [
  {
    href: "/seguro-locadoras-equipamentos",
    brand: "Patro Locadoras 360",
    title: "Seguro para locadoras de equipamentos",
    desc: "Proteção do ativo, da receita da locação, da responsabilidade e da continuidade da operação — mesmo quando o equipamento está no cliente.",
    icon: Wrench,
  },
  {
    href: "/seguro-galpoes-centros-distribuicao",
    brand: "Patro Galpões 360",
    title: "Seguro para galpões e centros de distribuição",
    desc: "Diagnóstico da operação, Mapa de Vulnerabilidades e proteção de imóvel, estoque, equipamentos e continuidade.",
    icon: Warehouse,
  },
  {
    href: "/seguro-cibernetico-empresas",
    brand: "Patro Cyber PME",
    title: "Seguro cibernético para PMEs",
    desc: "Prevenção, resposta e transferência de risco para empresas que dependem de sistemas, dados e operações digitais.",
    icon: ShieldCheck,
  },
  {
    href: "/responsabilidade-administradores-profissionais",
    brand: "Patro Responsabilidade Empresarial",
    title: "Proteção para administradores e profissionais",
    desc: "D&O, RC Profissional, RC Ambiental, RC Geral e Vida Empresarial analisados conforme a atividade e as responsabilidades.",
    icon: Scale,
  },
];

const SolucoesEmpresariais = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageMeta
        title="Soluções empresariais Patro Seguros"
        description="Programas empresariais da Patro Seguros: locadoras de equipamentos, galpões e centros de distribuição, seguro cibernético PME e responsabilidade de administradores e profissionais."
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Soluções empresariais Patro Seguros",
            hasPart: solutions.map((s) => ({ "@type": "Service", name: s.title, url: `https://patroseguros.lovable.app${s.href}` })),
          })}
        </script>
      </Helmet>

      <Header />
      <main id="main-content">
        <section className="bg-primary text-white">
          <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl text-center">
            <span className="text-xs uppercase tracking-wide font-semibold text-accent">Soluções empresariais</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold">Programas Patro Seguros para empresas</h1>
            <p className="mt-4 text-white/85 max-w-2xl mx-auto">
              Análise consultiva das operações empresariais para identificar riscos, revisar apólices e organizar as
              proteções de forma integrada.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-6">
            {solutions.map(({ href, brand, title, desc, icon: Icon }) => (
              <Link
                to={href}
                key={href}
                className="group rounded-2xl border border-border bg-card p-8 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-accent">{brand}</span>
                <h2 className="mt-2 text-xl font-bold">{title}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Conhecer a solução <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SolucoesEmpresariais;