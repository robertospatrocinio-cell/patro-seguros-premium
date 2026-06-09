
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Handshake, MessageCircle, CheckCircle, Users, Award, Sparkles, TrendingUp, Heart, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const QuickQuoteForm = lazy(() => import("@/components/QuickQuoteForm"));

const ParceriasClinicasVeterinarias = () => (
  <>
    <PageMeta 
      title="Parceria para Clínicas Veterinárias e Pet Shops | Patro Seguros" 
      description="Programa de parceria Patro Seguros para o setor pet em Guarulhos: indicação mútua, comissionamento e atendimento especializado para seus clientes."
    />
    <Header />
    <main id="main-content">
      <Breadcrumb items={[{ label: "Segmentos", href: "/seguros-empresariais" }, { label: "Veterinária", href: "/seguros-para-clinicas-veterinarias" }, { label: "Parcerias" }]} />
      
      {/* Hero */}
      <section className="gradient-hero py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <Handshake className="h-16 w-16 text-white/30 mx-auto mb-6" />
          <h1 className="text-white mb-6">Programa Parceiro Patro Pet</h1>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Transforme sua clínica ou pet shop em um hub de proteção completa. Indique a Patro Seguros e ofereça benefícios exclusivos para seus clientes enquanto gera nova receita para seu negócio.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-10 font-bold shadow-xl" onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Seja Parceiro Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-heading mb-8">Vantagens para sua Clínica</h2>
              <div className="space-y-6">
                {[
                  { title: "Comissionamento por Indicação", desc: "Receba bonificações por cada seguro fechado através da sua indicação.", icon: TrendingUp },
                  { title: "Atendimento VIP", desc: "Seus clientes terão prioridade e consultoria especializada com a marca Patro.", icon: Award },
                  { title: "Apoio em Gestão de Riscos", desc: "Análise técnica gratuita das apólices da sua clínica ou hospital.", icon: ShieldCheck },
                  { title: "Marketing Conjunto", desc: "Ações de co-branding para fortalecer sua marca junto à nossa base de clientes.", icon: Sparkles },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-lg">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-muted/30 p-10 rounded-3xl border">
              <h2 className="text-3xl font-heading mb-8">Para seus Clientes</h2>
              <ul className="space-y-4">
                {[
                  "Descontos exclusivos em Seguros Auto e Residencial",
                  "Consultoria para Plano Pet com carências reduzidas",
                  "Acesso a benefícios da Área Pet Premium",
                  "Suporte 24h especializado para tutores",
                  "Condições especiais em Seguro de Vida para veterinários da equipe"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 p-6 bg-white rounded-2xl border border-dashed border-primary/30">
                <Heart className="h-8 w-8 text-primary mb-3" />
                <p className="text-sm font-medium italic text-muted-foreground">"Nossa parceria com a Patro Seguros aumentou a confiança dos nossos clientes, que agora se sentem protegidos em todas as esferas da vida pet."</p>
                <p className="text-xs mt-3 font-bold text-foreground">— Dr. Ricardo, Hospital Vet Guarulhos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="mb-16">Como funciona a parceria?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Cadastro", desc: "Preencha o formulário abaixo com os dados da sua empresa pet." },
              { step: "2", title: "Homologação", desc: "Nosso time entrará em contato para alinhar os detalhes e alinhar o fluxo." },
              { step: "3", title: "Início", desc: "Comece a indicar e a desfrutar dos benefícios do ecossistema Patro Pet." }
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-black text-primary/10 absolute -top-10 left-1/2 -translate-x-1/2">{s.step}</div>
                <div className="relative z-10">
                  <h4 className="font-bold text-xl mb-3">{s.title}</h4>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="partnership-form" className="py-24">
        <div className="container mx-auto px-4 max-w-xl">
           <div className="bg-card p-10 rounded-3xl border shadow-2xl">
             <div className="text-center mb-10">
                <h3 className="text-2xl font-bold mb-2">Credenciamento de Parceiro</h3>
                <p className="text-muted-foreground">Inicie sua jornada no ecossistema Patro Pet.</p>
             </div>
             <Suspense fallback={<div className="h-[400px] bg-muted animate-pulse rounded-xl" />}>
               <QuickQuoteForm 
                 insuranceType="Parceria Pet"
                 extraFields={[
                   { id: "nome_clinica", label: "Nome da Empresa Pet", placeholder: "Nome fantasia", type: "text" },
                   { id: "cargo", label: "Seu Cargo", placeholder: "Ex: Proprietário, Gestor", type: "text" },
                   { id: "cidade", label: "Cidade", placeholder: "Onde sua clínica está localizada", type: "text" },
                   { id: "servicos", label: "Serviços Oferecidos", placeholder: "Ex: Clínica, Banho e Tosa, Hotel", type: "text" }
                 ]}
                 trackingLabel="parceria-pet"
               />
             </Suspense>
           </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default ParceriasClinicasVeterinarias;
