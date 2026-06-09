
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Star, Car, Home, PawPrint, CheckCircle, ArrowRight, Activity, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const QuickQuoteForm = lazy(() => import("@/components/QuickQuoteForm"));

const ProtecaoPetPremium = () => (
  <>
    <PageMeta 
      title="Proteção Pet Premium | Patro Seguros" 
      description="Soluções exclusivas para tutores de animais: seguro auto com cobertura pet, assistência residencial pet e benefícios para sua família em Guarulhos."
    />
    <Header />
    <main id="main-content">
      <Breadcrumb items={[{ label: "Segmentos", href: "/seguros-empresariais" }, { label: "Veterinária", href: "/seguros-para-clinicas-veterinarias" }, { label: "Área Pet Premium" }]} />
      
      {/* Hero */}
      <section className="gradient-hero py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <Heart className="h-16 w-16 text-white/30 mx-auto mb-6" />
          <h1 className="text-white mb-6">Proteção Pet Premium</h1>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Porque quem ama protege. Criamos um conjunto de soluções exclusivas para famílias que tratam seus animais como prioridade máxima.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-10 font-bold shadow-xl" onClick={() => document.getElementById('premium-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Conhecer as Soluções
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-10 rounded-3xl border hover:shadow-xl transition-base">
              <Car className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Pet no Auto</h3>
              <p className="text-muted-foreground mb-6">Seu melhor amigo viaja seguro. Cobertura para despesas veterinárias em caso de acidente de trânsito com seu pet no veículo.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-foreground/70"><CheckCircle className="h-4 w-4 text-green-500" /> Atendimento emergencial</li>
                <li className="flex items-center gap-2 text-sm text-foreground/70"><CheckCircle className="h-4 w-4 text-green-500" /> Reembolso de medicação</li>
              </ul>
            </div>
            
            <div className="bg-card p-10 rounded-3xl border hover:shadow-xl transition-base">
              <Home className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Assistência Residencial Pet</h3>
              <p className="text-muted-foreground mb-6">O seguro da sua casa agora cuida de quem mora nela. Assistências exclusivas para seu pet direto no seu seguro residencial.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-foreground/70"><CheckCircle className="h-4 w-4 text-green-500" /> Consultas veterinárias</li>
                <li className="flex items-center gap-2 text-sm text-foreground/70"><CheckCircle className="h-4 w-4 text-green-500" /> Transporte emergencial</li>
                <li className="flex items-center gap-2 text-sm text-foreground/70"><CheckCircle className="h-4 w-4 text-green-500" /> Aplicação de vacinas</li>
              </ul>
            </div>

            <div className="bg-card p-10 rounded-3xl border hover:shadow-xl transition-base">
              <Activity className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Plano de Saúde Pet</h3>
              <p className="text-muted-foreground mb-6">A melhor rede credenciada de Guarulhos para consultas, exames, vacinas e procedimentos cirúrgicos para cães e gatos.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-foreground/70"><CheckCircle className="h-4 w-4 text-green-500" /> Rede 24h em Guarulhos</li>
                <li className="flex items-center gap-2 text-sm text-foreground/70"><CheckCircle className="h-4 w-4 text-green-500" /> Prevenção e bem-estar</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
               <span className="section-label mb-4 inline-block">Benefícios para Famílias</span>
               <h2 className="text-3xl md:text-4xl font-heading mb-6">Um ecossistema de cuidado para quem você ama</h2>
               <p className="text-lg text-muted-foreground mb-8">A Patro Seguros entende que pets são membros da família. Por isso, integramos benefícios em todos os nossos seguros pessoais.</p>
               <div className="space-y-4">
                 {[
                   "Seguro de Vida com cobertura de funeral pet",
                   "Assistência Pet em viagens nacionais e internacionais",
                   "Clube de descontos em pet shops e clínicas parceiras",
                   "Consultoria especializada em gestão de saúde animal"
                 ].map((t, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <LifeBuoy className="h-5 w-5 text-primary" />
                     <span className="font-medium">{t}</span>
                   </div>
                 ))}
               </div>
             </div>
             <div id="premium-form" className="bg-card p-10 rounded-3xl border shadow-2xl">
               <h3 className="text-2xl font-bold mb-6 text-center">Interesse na Proteção Premium</h3>
               <Suspense fallback={<div className="h-[400px] bg-muted animate-pulse rounded-xl" />}>
                 <QuickQuoteForm 
                   insuranceType="Pet Premium"
                   extraFields={[
                     { id: "nome_pet", label: "Nome do seu Pet", placeholder: "Como ele se chama?", type: "text" },
                     { id: "tipo_pet", label: "Tipo", placeholder: "Ex: Cão, Gato", type: "text" },
                     { id: "idade_pet", label: "Idade aproximada", placeholder: "Ex: 3 anos", type: "text" },
                     { id: "interesse", label: "O que você busca?", placeholder: "Ex: Plano de Saúde, Seguro Auto com Pet", type: "text" }
                   ]}
                   trackingLabel="pet-premium"
                 />
               </Suspense>
             </div>
           </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default ProtecaoPetPremium;
