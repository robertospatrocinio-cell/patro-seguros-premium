import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Star, Car, Home } from "lucide-react";

const ProtecaoPetPremium = () => (
  <>
    <PageMeta title="Proteção Pet Premium | Patro Seguros" />
    <Header />
    <main className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <Heart className="h-12 w-12 text-red-500 mx-auto mb-6" />
        <h1 className="mb-4">Área Pet Premium</h1>
        <p className="text-xl text-muted-foreground mb-12">Soluções exclusivas para famílias que tratam seus animais como prioridade.</p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
           <div className="bg-white p-8 rounded-2xl shadow-sm border">
             <Car className="h-8 w-8 text-primary mb-4" />
             <h3 className="text-lg font-bold mb-2">Pet no Auto</h3>
             <p className="text-sm text-muted-foreground">Cobertura para despesas veterinárias em caso de acidente de trânsito com seu pet no veículo.</p>
           </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border">
             <Home className="h-8 w-8 text-primary mb-4" />
             <h3 className="text-lg font-bold mb-2">Assistência Pet Residencial</h3>
             <p className="text-sm text-muted-foreground">Consultas, transporte emergencial e aplicação de vacinas em domicílio inclusas no seguro casa.</p>
           </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default ProtecaoPetPremium;
