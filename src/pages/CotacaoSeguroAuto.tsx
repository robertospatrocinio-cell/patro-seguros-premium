import { ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";

const SEGFY_URL = "https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D";
const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro%20auto.";

const CotacaoSeguroAuto = () => {
  return (
    <>
      <Header />
      <main>
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <div className="text-6xl mb-6">🚗</div>
            <h1 className="mb-6">Cotação de Seguro Auto Online</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Faça sua cotação 100% online e gratuita. Compare as melhores seguradoras em minutos.
            </p>
            <a href={SEGFY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="cta" className="text-lg px-10">
                Fazer Cotação Online <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-8">Cotação Válida Para</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: "🚗", label: "Seguro Auto" },
                { icon: "🏍️", label: "Seguro Moto" },
                { icon: "🚛", label: "Seguro Caminhão" },
                { icon: "🚐", label: "Seguro Vans" },
              ].map((item, i) => (
                <div key={i} className="bg-muted rounded-lg p-6">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="font-semibold text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="mb-6">Prefere Falar com um Especialista?</h2>
            <p className="text-muted-foreground mb-8">
              Nosso time está pronto para te ajudar a encontrar a melhor proteção para o seu veículo.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="cta" className="text-lg px-8">
                <MessageCircle className="mr-2 h-5 w-5" /> Falar no WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CotacaoSeguroAuto;
