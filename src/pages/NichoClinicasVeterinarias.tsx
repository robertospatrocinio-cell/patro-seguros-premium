
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import WebSiteSchema from "@/components/WebSiteSchema";
import AggregateRatingSchema from "@/components/AggregateRatingSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, ArrowRight, Shield, Stethoscope, HeartPulse, Lock, Activity, Users, PawPrint, Building2, HardDrive, Dog, Briefcase } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import { veterinariaFormFields } from "@/data/veterinariaFormConfig";
import { lazy, Suspense } from "react";

const QuickQuoteForm = lazy(() => import("@/components/QuickQuoteForm"));

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20tenho%20uma%20cl%C3%ADnica%20veterin%C3%A1ria%20e%20gostaria%20de%20uma%20an%C3%A1lise%20gratuita.";

const faqs = [
  { question: "Por que uma clínica veterinária precisa de seguro empresarial?", answer: "Clínicas reúnem equipamentos de alto valor, dados sensíveis de clientes e riscos operacionais. O seguro protege o patrimônio, os equipamentos e a responsabilidade civil contra processos." },
  { question: "Qual a diferença entre RC Profissional e Seguro Empresarial?", answer: "O RC Profissional protege contra alegações de erro profissional do veterinário. O Empresarial protege contra danos físicos à clínica (incêndio, roubo)." },
  { question: "O seguro cobre acidentes no banho e tosa?", answer: "Sim, a cobertura de RC Animais sob Custódia protege contra acidentes ocorridos durante banho, tosa e estadia em hotéis pet." },
  { question: "A Patro Seguros atende hospitais 24h?", answer: "Sim, temos soluções robustas para grandes hospitais veterinários com coberturas para geradores, internação e RC ampliada." },
];

const paginas = [
  { name: "Seguro para Veterinários", slug: "seguro-para-veterinarios", desc: "Proteção pessoal e profissional." },
  { name: "Seguro Clínica Veterinária", slug: "seguro-clinica-veterinaria", desc: "Apólice integrada para clínicas." },
  { name: "Seguro Hospital Veterinário", slug: "seguro-hospital-veterinario", desc: "Gestão de risco para grandes hospitais." },
  { name: "RC Profissional Veterinário", slug: "responsabilidade-civil-veterinarios", desc: "Defesa contra erros médicos." },
  { name: "Seguro Equipamentos", slug: "seguro-equipamentos-veterinarios", desc: "Raio-X, ultrassom, monitoramento." },
  { name: "Seguro para Pet Shops", slug: "seguro-pet-shop", desc: "Proteção para comércio e estética pet." },
  { name: "Plano de Saúde Empresarial", slug: "plano-saude-clinicas-veterinarias", desc: "Benefícios para a sua equipe." },
  { name: "Seguro de Vida Empresarial", slug: "seguro-vida-clinicas-veterinarias", desc: "Proteção para sócios e funcionários." },
];

const coberturas = [
  { icon: Shield, title: "Seguro Empresarial", desc: "Incêndio, roubo, danos elétricos e lucros cessantes." },
  { icon: Activity, title: "Equipamentos Veterinários", desc: "Proteção contra quebra, roubo e danos elétricos." },
  { icon: Stethoscope, title: "RC Profissional Veterinário", desc: "Defesa jurídica contra alegações de erro médico." },
  { icon: Lock, title: "Seguro Cyber", desc: "Proteção de dados e conformidade LGPD." },
  { icon: HeartPulse, title: "Seguro de Vida Empresarial", desc: "Proteção para a sua equipe de especialistas." },
  { icon: Users, title: "Plano de Saúde Empresarial", desc: "Clínicas, centros de diagnóstico e hospitais." },
];

const NichoClinicasVeterinarias = () => (
  <>
    <PageMeta
      title="Seguro para Clínicas Veterinárias em Guarulhos | Patro Seguros"
      description="Proteja sua clínica, hospital veterinário ou pet shop com as soluções completas da Patro Seguros: RC, Equipamentos, Vida e Saúde."
    />
    <FAQSchema faqs={faqs} />
    <LocalBusinessSchema />
    <Header />
    <main id="main-content" tabIndex={-1}>
      <Breadcrumb items={[{ label: "Segmentos" }, { label: "Veterinária" }]} />
      
      {/* Hero Section */}
      <section className="gradient-hero py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <PawPrint className="h-16 w-16 text-white/20 mx-auto mb-6 animate-pulse" />
          <h1 className="text-white text-4xl md:text-6xl mb-6 font-heading">Proteção Completa para Clínicas e Hospitais Veterinários</h1>
          <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            Sua missão é cuidar dos animais. Nossa missão é proteger seu patrimônio, sua equipe e seu negócio em Guarulhos e região.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg font-bold shadow-xl shadow-black/10" onClick={() => {
              const el = document.getElementById('quote-form');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Solicitar Análise Gratuita
            </Button>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 h-14 px-8 text-lg">
                <MessageCircle className="mr-2 h-5 w-5" /> Falar com Especialista
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
             <span className="section-label mb-4 inline-block">Especialidades</span>
             <h2 className="text-3xl md:text-4xl font-heading">Soluções Desenhadas para o Setor Pet</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginas.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`} className="group bg-card p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <PawPrint className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl mb-3">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
                <div className="flex items-center text-primary text-sm font-bold group-hover:gap-2 transition-all">
                  Saiba mais <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coberturas em Destaque */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-3xl md:text-4xl mb-8 font-heading">Coberturas que Blindam seu Negócio</h2>
               <div className="grid gap-6">
                 {coberturas.map((c, i) => (
                   <div key={i} className="flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                       <c.icon className="h-5 w-5 text-primary" />
                     </div>
                     <div>
                       <h4 className="font-bold mb-1">{c.title}</h4>
                       <p className="text-sm text-muted-foreground">{c.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
             <div className="relative">
               <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl -z-10" />
               <div id="quote-form" className="bg-card rounded-2xl border border-border p-8 shadow-2xl relative z-10">
                 <Suspense fallback={<div className="h-[400px] bg-muted animate-pulse rounded-xl" />}>
                    <QuickQuoteForm 
                      insuranceType="Clínica Veterinária"
                      extraFields={veterinariaFormFields}
                      trackingLabel="hub-veterinaria"
                    />
                 </Suspense>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Parcerias & Área Premium */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-primary/5 p-10 rounded-3xl border border-primary/10">
               <Building2 className="h-10 w-10 text-primary mb-6" />
               <h3 className="text-2xl font-bold mb-4">Programa Parceiro Patro Pet</h3>
               <p className="text-muted-foreground mb-8">Credencie sua clínica para indicação mútua e gere novas fontes de receita com cotações automáticas para seus clientes.</p>
               <Link to="/parcerias-clinicas-veterinarias">
                 <Button className="rounded-xl px-8 h-12">Seja Parceiro <ArrowRight className="ml-2 h-4 w-4" /></Button>
               </Link>
             </div>
             <div className="bg-secondary/5 p-10 rounded-3xl border border-secondary/10">
               <Dog className="h-10 w-10 text-secondary mb-6" />
               <h3 className="text-2xl font-bold mb-4">Área Pet Premium</h3>
               <p className="text-muted-foreground mb-8">Benefícios exclusivos para tutores: seguro auto com cobertura pet, assistência residencial pet e muito mais.</p>
               <Link to="/protecao-pet-premium">
                 <Button variant="secondary" className="rounded-xl px-8 h-12">Conheça as Soluções <ArrowRight className="ml-2 h-4 w-4" /></Button>
               </Link>
             </div>
           </div>
        </div>
      </section>

      {/* Content Hub Section */}
      <section className="py-24 bg-muted/20 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-6xl text-center">
           <h2 className="text-3xl md:text-4xl mb-4 font-heading">Gestão e Proteção para Clínicas</h2>
           <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">Acesse nossa central de inteligência com artigos técnicos sobre riscos no setor pet.</p>
           <div className="grid md:grid-cols-3 gap-8 text-left mb-12">
             <Link to="/blog/7-riscos-clinica-veterinaria-proteger" className="bg-card p-6 rounded-2xl border hover:border-primary/30 transition-base">
               <h4 className="font-bold mb-2">7 Riscos Que Toda Clínica Deve Proteger</h4>
               <p className="text-sm text-muted-foreground">O guia essencial para blindar seu patrimônio e evitar prejuízos operacionais.</p>
             </Link>
             <Link to="/blog/veterinario-precisa-seguro-responsabilidade-civil" className="bg-card p-6 rounded-2xl border hover:border-primary/30 transition-base">
               <h4 className="font-bold mb-2">RC Profissional: Por que é indispensável?</h4>
               <p className="text-sm text-muted-foreground">Entenda os riscos de processos éticos e judiciais na medicina veterinária moderna.</p>
             </Link>
             <Link to="/blog/como-proteger-equipamentos-veterinarios" className="bg-card p-6 rounded-2xl border hover:border-primary/30 transition-base">
               <h4 className="font-bold mb-2">Proteção para Equipamentos de Alto Valor</h4>
               <p className="text-sm text-muted-foreground">Como garantir a reposição de Raio-X, Ultrassom e outros aparelhos críticos.</p>
             </Link>
           </div>
           <Link to="/blog/clinicas-veterinarias">
             <Button variant="outline" className="rounded-xl h-12 px-8">Ver todos os artigos do Blog <ArrowRight className="ml-2 h-4 w-4" /></Button>
           </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  </>
);

export default NichoClinicasVeterinarias;
