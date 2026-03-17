import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, Car, Heart, Building2, Home, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";

const landingPages = [
  { title: "Seguro Auto", description: "Landing page focada em conversão para campanhas de seguro automotivo.", icon: Car, link: "/lp/seguro-auto", color: "bg-blue-500/10 text-blue-600" },
  { title: "Plano de Saúde", description: "Landing page de alta conversão para campanhas de planos de saúde.", icon: Heart, link: "/lp/plano-de-saude", color: "bg-red-500/10 text-red-600" },
  { title: "Seguro Empresarial", description: "Landing page para captação de leads empresariais.", icon: Building2, link: "/lp/seguro-empresarial", color: "bg-amber-500/10 text-amber-600" },
  { title: "Seguro Residencial", description: "Landing page para campanhas de seguro residencial.", icon: Home, link: "/lp/seguro-residencial", color: "bg-green-500/10 text-green-600" },
  { title: "Seguro de Vida", description: "Landing page emocional e persuasiva para seguro de vida.", icon: Shield, link: "/lp/seguro-vida", color: "bg-purple-500/10 text-purple-600" },
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
