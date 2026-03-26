import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, Car, Heart, Building2, Home, Shield, Bike, Warehouse, Trophy, Smartphone, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";

const landingPages = [
  { title: "Seguro Auto", description: "Campanhas de seguro automotivo — roubo, colisão e assistência 24h.", icon: Car, link: "/lp/seguro-auto", color: "bg-blue-500/10 text-blue-600" },
  { title: "Seguro Moto", description: "Alta conversão para motociclistas — roubo, terceiros e guincho.", icon: Bike, link: "/lp/seguro-moto", color: "bg-orange-500/10 text-orange-600" },
  { title: "Plano de Saúde", description: "Comparativo de 20 operadoras — Amil, Bradesco, Unimed e mais.", icon: Heart, link: "/lp/plano-de-saude", color: "bg-red-500/10 text-red-600" },
  { title: "Seguro de Galpões", description: "Proteção patrimonial para galpões industriais e logísticos.", icon: Warehouse, link: "/lp/seguro-galpoes", color: "bg-amber-500/10 text-amber-600" },
  { title: "Seguro de Vida", description: "Landing emocional e persuasiva — proteção familiar.", icon: Shield, link: "/lp/seguro-vida", color: "bg-purple-500/10 text-purple-600" },
  { title: "Consórcio", description: "Carro, imóvel e veículos pesados — sem juros e sem entrada.", icon: Trophy, link: "/lp/consorcio", color: "bg-yellow-500/10 text-yellow-600" },
  { title: "Seguro Celular", description: "Roubo, quebra acidental e dano por líquido — iPhone e Android.", icon: Smartphone, link: "/lp/seguro-celular", color: "bg-cyan-500/10 text-cyan-600" },
  { title: "Seguro Residencial", description: "Incêndio, roubo, danos elétricos e assistência 24h.", icon: Home, link: "/lp/seguro-residencial", color: "bg-green-500/10 text-green-600" },
  { title: "Seguro Empresarial", description: "PME, comércio e indústria — proteção completa do negócio.", icon: Building2, link: "/lp/seguro-empresarial", color: "bg-slate-500/10 text-slate-600" },
  { title: "Seguro Motorista App", description: "Uber, 99, inDrive — cobertura durante corridas, RC passageiros e carro reserva.", icon: MapPin, link: "/lp/seguro-motorista-app", color: "bg-violet-500/10 text-violet-600" },
];

const LandingPages = () => (
  <>
    <PageMeta title="Landing Pages — Campanhas" description="Páginas de campanha para anúncios online da Patro Seguros." />
    <Header />
    <main id="main-content">
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <Megaphone className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Landing Pages de Campanha</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-10">
            Páginas otimizadas para anúncios no Instagram, Facebook e Google Ads. Use os links abaixo nas suas campanhas.
          </p>
          <div className="space-y-3">
            {landingPages.map((lp) => (
              <Link key={lp.link} to={lp.link} className="group">
                <div className="premium-card p-5 flex items-center gap-4 hover:border-primary/20 transition-all">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${lp.color}`}>
                    <lp.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold">{lp.title}</h3>
                    <p className="text-xs text-muted-foreground">{lp.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                    <code className="bg-muted px-2 py-1 rounded text-[11px]">{lp.link}</code>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default LandingPages;
