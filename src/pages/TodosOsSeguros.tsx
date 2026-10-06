import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ObraSegurosComparativo from "@/components/ObraSegurosComparativo";
import { Button } from "@/components/ui/button";
import { catalogoSeguros, CATALOGO_PATH } from "@/data/catalogoSeguros";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const TodosOsSeguros = () => {
  const waUrl = buildWhatsAppUrl({ origem: "todos_os_seguros", extraLines: ["Origem: página Todos os seguros"] });

  return (
    <Fragment>
      <PageMeta
        title="Todos os Seguros | Catálogo por Perfil | Patro Seguros"
        description="Catálogo completo de seguros da Patro Seguros para pessoas e famílias, empresas e agronegócio. Compare as opções e solicite sua cotação."
        skipBreadcrumb
      />
      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: "Todos os seguros", url: CATALOGO_PATH }]} />
      <Header />
      <main id="main-content" className="outline-none">
        <section className="pt-10 pb-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <Breadcrumb items={[{ label: "Todos os seguros", href: CATALOGO_PATH }]} />
            <div className="max-w-3xl mx-auto text-center mt-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Todos os seguros</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Encontre a proteção certa para você, sua empresa ou sua propriedade rural.
              </p>
              <nav aria-label="Perfis" className="flex flex-wrap justify-center gap-2">
                {catalogoSeguros.map((p) => (
                  <Button key={p.id} asChild variant="outline" size="sm">
                    <a href={`#${p.id}`}>{p.title}</a>
                  </Button>
                ))}
                <Button asChild variant="outline" size="sm">
                  <a href="#seguros-da-obra">Seguros para obras</a>
                </Button>
              </nav>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 space-y-14">
          {catalogoSeguros.map((perfil) => (
            <section key={perfil.id} id={perfil.id} aria-labelledby={`h-${perfil.id}`} className="scroll-mt-28">
              <h2 id={`h-${perfil.id}`} className="text-2xl md:text-3xl font-bold mb-2">{perfil.title}</h2>
              <p className="text-muted-foreground mb-6">{perfil.description}</p>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {perfil.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="group flex h-full flex-col rounded-xl border bg-card p-4 hover:border-primary/40 hover:shadow-md transition-all"
                    >
                      <h3 className="font-bold group-hover:text-primary">{item.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1 flex-1">{item.short}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">
                        Ver seguro <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <ObraSegurosComparativo />

        <section className="py-14 text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl font-bold mb-3">Não sabe por onde começar?</h2>
            <p className="text-muted-foreground mb-6">Conte o que precisa proteger e indicamos as opções adequadas.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" variant="cta">
                <Link to="/cotacao" onClick={() => trackCotacaoClick("todos-os-seguros")}>Solicitar cotação</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("todos-os-seguros")}>
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default TodosOsSeguros;
