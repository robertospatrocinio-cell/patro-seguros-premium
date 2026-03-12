import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <PageMeta title="Página Não Encontrada" description="A página que você está procurando não existe ou foi movida." />
      <Header />
      <main>
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 text-center max-w-lg">
            <div className="text-7xl font-heading font-bold text-primary mb-4">404</div>
            <h1 className="text-2xl font-semibold mb-4">Página não encontrada</h1>
            <p className="text-muted-foreground mb-8">
              A página que você está procurando não existe ou foi movida. Que tal voltar à página inicial?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button size="lg" className="rounded-xl">
                  <Home className="mr-2 h-4 w-4" /> Ir para o Início
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-xl" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
