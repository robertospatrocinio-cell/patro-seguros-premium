import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { segmentos } from "@/data/segmentosEmpresariais";

const SegurosPorSegmento = () => {
  return (
    <>
      <PageMeta
        title="Seguros por Segmento de Negócio | Patro Seguros"
        description="Seguro Empresarial sob medida para roupas, bares, restaurantes, farmácias, escritórios, escolas, hotéis e muito mais. Cotação grátis."
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Seguros Empresariais", url: "/seguro-empresarial" },
          { name: "Por Segmento", url: "/seguro-empresarial/segmentos" },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-background">
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <Breadcrumb
              items={[
                { label: "Seguros Empresariais", href: "/seguro-empresarial" },
                { label: "Por Segmento" },
              ]}
            />
            <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
              Seguro Empresarial por Segmento
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl">
              Coberturas sob medida para o seu ramo de atividade. Confira nossas opções de proteção
              e contratação para cada tipo de negócio:
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {segmentos.map((s) => (
                <Link
                  key={s.slug}
                  to={`/seguro-empresarial/${s.slug}`}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card hover:border-accent hover:shadow-lg transition-all"
                >
                  <div className="text-5xl mb-4 transition-transform group-hover:scale-110">
                    {s.icon}
                  </div>
                  <h2 className="text-base md:text-lg font-semibold text-foreground group-hover:text-accent">
                    {s.nome}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {s.subtitle}
                  </p>
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

export default SegurosPorSegmento;