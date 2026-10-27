import { Fragment, lazy, Suspense } from "react";
const ProductQuoteForm = lazy(() => import("@/components/ProductQuoteForm"));
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ObraSegurosComparativo from "@/components/ObraSegurosComparativo";
import EspecialidadesPatro from "@/components/EspecialidadesPatro";
import { Button } from "@/components/ui/button";
import { catalogoSeguros, CATALOGO_PATH } from "@/data/catalogoSeguros";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const TodosOsSeguros = () => {
  const waUrl = buildWhatsAppUrl({ origem: "todos_os_seguros", extraLines: ["Origem: página Todos os seguros"] });

  return (
    <Fragment>
      <PageMeta
        title="Seguros, Saúde e Consórcio em Guarulhos | Patro Seguros"
        description="Seguros, planos de saúde e consórcio em Guarulhos e Grande São Paulo. Especialidades em máquinas agrícolas, linha amarela e drones. Solicite uma análise."
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
                Seguros, planos de saúde e consórcio para pessoas e empresas em Guarulhos e Grande São Paulo.
                Encontre seu produto por categoria, incluindo nossas especialidades em máquinas agrícolas,
                equipamentos, drones e máquinas de linha amarela.
              </p>
              <Button asChild size="lg" variant="cta" className="mb-6 h-auto min-h-11 max-w-full whitespace-normal">
                <a href="#solicitar-cotacao" onClick={() => trackCotacaoClick("todos-os-seguros:hero")}>Solicitar cotação ou simulação</a>
              </Button>
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 mb-6">
                <Button asChild className="h-auto min-h-11 whitespace-normal"><a href="#maquinas">Máquinas, equipamentos e drones</a></Button>
                <Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal"><a href="#saude">Saúde e odontológico</a></Button>
                <Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal"><a href="#consorcio">Consórcio</a></Button>
              </div>
              <nav aria-label="Perfis" className="flex flex-wrap justify-center gap-2">
                {catalogoSeguros.map((p) => (
                  <Button key={p.id} asChild variant="outline" size="sm" className="h-auto min-h-11 max-w-full whitespace-normal py-2">
                    <a href={`#${p.id}`}>{p.title}</a>
                  </Button>
                ))}
                <Button asChild variant="outline" size="sm" className="h-auto min-h-11 max-w-full whitespace-normal py-2">
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

        <section id="solicitar-cotacao" className="bg-muted/30 py-14 scroll-mt-28" aria-labelledby="cotacao-catalogo-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="cotacao-catalogo-heading" className="text-2xl md:text-3xl font-bold mb-3">Solicite uma análise para o produto que procura</h2>
            <p className="text-muted-foreground mb-6">Selecione um seguro, plano de saúde ou consórcio. Seu pedido chega à equipe com o produto escolhido e os detalhes que você informar.</p>
            <Suspense fallback={<div className="min-h-[400px] rounded-2xl bg-muted animate-pulse" />}>
              <ProductQuoteForm />
            </Suspense>
          </div>
        </section>

        <EspecialidadesPatro catalog />
        <ObraSegurosComparativo />

        <section className="py-14 text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl font-bold mb-3">Não sabe por onde começar?</h2>
            <p className="text-muted-foreground mb-6">Conte o que precisa proteger e indicamos as opções adequadas.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" variant="cta" className="h-auto min-h-11 whitespace-normal">
                <a href="#solicitar-cotacao" onClick={() => trackCotacaoClick("todos-os-seguros")}>Solicitar cotação ou simulação</a>
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
