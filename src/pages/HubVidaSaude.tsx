 import { Link, useLocation } from "react-router-dom";
 import { Heart, SmilePlus, HeartPulse, Activity, UserPlus, ArrowRight, MessageCircle, CheckCircle, Award } from "lucide-react";
 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import PageMeta from "@/components/PageMeta";
 import Breadcrumb from "@/components/Breadcrumb";
 import FAQSchema from "@/components/FAQSchema";
 import AggregateRatingSchema from "@/components/AggregateRatingSchema";
 import { getCanonicalUrl } from "@/lib/canonical";
 import { Button } from "@/components/ui/button";
 import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
 import InsuranceHubLinks from "@/components/InsuranceHubLinks";
 
 const WHATSAPP_URL = "https://wa.me/551151997500?text=Olá! Gostaria de uma cotação de plano de saúde ou seguro de vida.";
 
  const FAQS = [
    { question: "Qual o melhor plano de saúde em Guarulhos?", answer: "Para cobertura nacional, Bradesco e SulAmérica são as melhores. Para custo-benefício regional, Hapvida/NotreDame e Amil possuem rede local robusta." },
    { question: "Quanto custa um seguro de vida?", answer: "Para um adulto jovem, é possível contratar coberturas de R$ 100.000 a partir de R$ 30/mês. O valor varia conforme idade e capital segurado." },
    { question: "Plano de saúde MEI é mais barato?", answer: "Sim, planos empresariais (PME/MEI) podem ser até 40% mais baratos que planos individuais/familiares." },
    { question: "Vocês atendem todos os bairros de Guarulhos?", answer: "Sim, atendemos Cidade Maia, Vila Augusta, Cumbica, Macedo e demais regiões com consultoria local." }
  ];

  const SECTIONS = [
   {
     title: "Assistência Médica e Odonto",
     links: [
       { label: "Planos de Saúde", href: "/planos-de-saude", desc: "Hapvida, Bradesco, SulAmérica, Amil e mais 20 operadoras" },
       { label: "Saúde Empresarial", href: "/plano-saude-empresarial", desc: "PME e grandes empresas com custos até 40% menores" },
       { label: "Seguro Odontológico", href: "/seguro-odonto", desc: "Ampla rede de dentistas para você e seus funcionários" },
       { label: "Plano Pet", href: "/plano-pet", desc: "Cuidado e saúde para seus cães e gatos" },
     ]
   },
   {
     title: "Proteção de Vida e Acidentes",
     links: [
       { label: "Seguro de Vida", href: "/seguro-vida", desc: "Amparo financeiro para sua família nos momentos mais difíceis" },
       { label: "Seguro Vida PME", href: "/seguro-vida-pme", desc: "Proteção para sócios e colaboradores de pequenas empresas" },
       { label: "Acidentes Pessoais", href: "/seguro-acidentes-pessoais", desc: "Ideal para profissionais autônomos e passageiros (APP)" },
       { label: "Seguro Funeral", href: "/seguro-funeral", desc: "Assistência completa e imediata para toda a família" },
     ]
   }
 ];
 
  const HubVidaSaude = () => {
    const location = useLocation();
    const canonicalUrl = getCanonicalUrl(location.pathname);

    return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
         title="Plano de Saúde em Guarulhos: Individual, Familiar e Empresarial" 
         description="Compare os melhores planos de saúde em Guarulhos. Hapvida, Bradesco, Amil e SulAmérica com atendimento nos principais hospitais da região. Cotação online." 
      />
      <FAQSchema faqs={FAQS} />
      <AggregateRatingSchema
        serviceName="Vida e Saúde em Guarulhos"
        url={canonicalUrl}
        description="Planos de saúde e seguros de vida em Guarulhos."
      />
      <Header />
     <main id="main-content">
       <Breadcrumb items={[{ label: "Vida e Saúde" }]} />
       
       <section className="relative gradient-hero py-20 overflow-hidden">
         <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
           <div className="flex justify-center mb-6">
             <HeartPulse className="h-16 w-16 text-white opacity-20" />
           </div>
            <h1 className="text-white mb-6">Plano de Saúde em Guarulhos — O Que Você Tem de Mais Valioso</h1>
            <p className="text-xl text-white/70 mb-8">
              Acesso aos melhores hospitais de Guarulhos. Comparamos 20 operadoras para encontrar o plano de saúde perfeito para você ou sua empresa.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/cotacao" onClick={() => trackCotacaoClick("hub-vida-saude")}>
               <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold">
                 Simular Plano Online
               </Button>
             </Link>
             <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub-vida-saude")}>
               <Button size="lg" variant="cta" className="rounded-xl h-12 px-8 text-sm">
                 <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
               </Button>
             </a>
           </div>
         </div>
       </section>
 
       <div className="container mx-auto px-4 max-w-5xl py-16">
         <div className="grid gap-12">
           {SECTIONS.map((section, idx) => (
             <div key={idx}>
               <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{section.title}</h2>
               <div className="grid sm:grid-cols-2 gap-4">
                 {section.links.map((link, lIdx) => (
                   <Link key={lIdx} to={link.href} className="group premium-card p-6 hover:border-primary/30 transition-base">
                     <div className="flex justify-between items-start">
                       <div>
                         <h3 className="font-bold group-hover:text-primary transition-colors">{link.label}</h3>
                         <p className="text-sm text-muted-foreground mt-1">{link.desc}</p>
                       </div>
                       <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                     </div>
                   </Link>
                 ))}
               </div>
             </div>
           ))}
         </div>
       </div>
 
       <section className="py-20 bg-muted/30">
         <div className="container mx-auto px-4 text-center max-w-3xl">
           <Activity className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="mb-4">Consultoria de Planos de Saúde em Guarulhos</h2>
            <p className="text-muted-foreground mb-10">
              Nossa equipe local em Guarulhos acompanha você do contrato à utilização, auxiliando em liberações e dúvidas sobre a rede credenciada dos hospitais da região.
           </p>
           <div className="grid sm:grid-cols-3 gap-6">
             {[
               { t: "Consultoria Gratuita", d: "Ajudamos você a escolher entre as 20+ operadoras sem cobrar nada." },
               { t: "Redução de Custos", d: "Migração estratégica para planos mais modernos e baratos." },
               { t: "Suporte no Sinistro", d: "Auxílio imediato em casos de Seguro de Vida e Acidentes." }
             ].map((f, i) => (
               <div key={i} className="text-left">
                 <p className="font-bold text-primary mb-1">{f.t}</p>
                 <p className="text-xs text-muted-foreground">{f.d}</p>
               </div>
             ))}
           </div>
         </div>
       </section>
 
        <section className="py-24 bg-background" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <span className="section-label">FAQ</span>
              <h2 id="faq-heading" className="mt-3">Perguntas Frequentes — Saúde e Vida</h2>
            </div>
            <div className="space-y-3" data-speakable="faq">
              {FAQS.map((faq, i) => (
                <details key={i} className="premium-card group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-[15px] font-semibold hover:text-primary transition-base list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-primary/40 ml-4 group-open:rotate-45 transition-transform text-lg font-light">+</span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <InsuranceHubLinks />
     </main>
     <Footer />
   </div>
    );
  };
  
  export default HubVidaSaude;