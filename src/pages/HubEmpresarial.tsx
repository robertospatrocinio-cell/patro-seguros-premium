  import { Link, useLocation } from "react-router-dom";
  import { Building2, Warehouse, Laptop, HardHat, ShieldCheck, ArrowRight, MessageCircle, BarChart3, Users, CheckCircle } from "lucide-react";
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
  import StickyQuoteBar from "@/components/StickyQuoteBar";
  import FormCTASection from "@/components/FormCTASection";
 
 const WHATSAPP_URL = "https://wa.me/551151997500?text=Olá! Gostaria de uma cotação de seguro empresarial para meu negócio.";
 
  const FAQS = [
    { question: "Por que contratar seguro empresarial em Guarulhos?", answer: "Guarulhos é um hub logístico e industrial. Um seguro empresarial protege contra incêndio, roubo e, principalmente, lucros cessantes, garantindo a sobrevivência do negócio em caso de sinistro." },
    { question: "O seguro empresarial cobre equipamentos de TI?", answer: "Sim, existe cobertura específica para equipamentos eletrônicos, servidores e sistemas, protegendo contra danos elétricos, quedas e roubo." },
    { question: "O que são lucros cessantes no seguro?", answer: "É uma das coberturas mais importantes: ela repõe o faturamento líquido que a empresa deixa de gerar enquanto está parada para reconstrução após um sinistro coberto." },
    { question: "Como funciona a vistoria técnica?", answer: "Para empresas de maior porte ou riscos específicos, um perito visita o local para dimensionar as proteções necessárias. A Patro acompanha todo esse processo." }
  ];

  const SECTIONS = [
   {
     title: "Patrimonial e Operacional",
     links: [
       { label: "Seguro Empresarial", href: "/seguro-empresarial", desc: "Proteção completa para PME e grandes empresas" },
       { label: "Seguro de Galpão", href: "/seguro-galpao", desc: "Hub nacional para logística e indústria" },
       { label: "Seguro Condomínio", href: "/seguro-condominio", desc: "Obrigatório para síndicos e administradoras" },
       { label: "Seguro Máquinas Industriais", href: "/seguro-maquinas-industriais", desc: "Proteção para equipamentos pesados e linha amarela" },
     ]
   },
   {
     title: "Riscos Especiais e Digitais",
     links: [
       { label: "Seguro Cyber", href: "/seguro-cyber", desc: "Proteção contra ataques hacker e vazamento de dados" },
       { label: "Seguro Engenharia", href: "/seguro-engenharia", desc: "Segurança para obras, reformas e montagem" },
       { label: "Seguro Garantia", href: "/seguro-garantia", desc: "Alternativa ao caução e depósitos judiciais" },
       { label: "Seguro Ambiental", href: "/seguro-ambiental", desc: "Responsabilidade civil por contaminação e vazamentos" },
     ]
   }
 ];
 
const HubEmpresarial = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
        title="Guia de Seguro Empresarial em Guarulhos: Proteção Completa para sua Empresa" 
        description="Especialistas em seguro empresarial em Guarulhos. Proteção para galpões, indústrias e PMEs. Consultoria técnica e gestão de riscos em Cumbica e região." 
      />
      <FAQSchema faqs={FAQS} />
      <AggregateRatingSchema
        serviceName="Seguros Empresariais em Guarulhos"
        url={canonicalUrl}
        description="Proteção patrimonial e operacional para empresas em Guarulhos."
      />
      <Header />
      <main id="main-content">
        <Breadcrumb items={[{ label: "Seguros Empresariais" }]} />
        
        <section className="relative gradient-hero py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
            <div className="flex justify-center mb-6">
              <Building2 className="h-16 w-16 text-white opacity-20" />
            </div>
            <h1 className="text-white mb-6">Seguro Empresarial em Guarulhos — Blindagem Estratégica</h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Proteção para empresas em Guarulhos. Consultoria especializada para converter riscos operacionais em previsibilidade financeira e continuidade do negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cotacao?tipo=empresarial" onClick={() => trackCotacaoClick("hub-empresarial:hero")}>
                <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                  Análise de Risco Gratuita
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub-empresarial:hero")}>
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
                          <h3 className="font-bold group-hover:text-primary transition-colors text-[15px]">{link.label}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{link.desc}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary flex-shrink-0 mt-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="py-24 bg-muted/30 border-y border-border" aria-labelledby="especialistas-empresariais-guarulhos">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 id="especialistas-empresariais-guarulhos" className="mb-4">Especialistas em Seguros para Empresas em Guarulhos</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              Como um dos maiores polos logísticos da América Latina, as empresas de Guarulhos precisam de seguros robustos. Proteja seu faturamento com quem entende o mercado local.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { t: "Lucros Cessantes", d: "Garante o fluxo de caixa se sua empresa precisar parar." },
                { t: "Gestão de Riscos", d: "Visitamos seu galpão ou indústria para dimensionar o seguro." },
                { t: "Atendimento VIP", d: "Consultor dedicado para resolver sinistros e renovações." }
              ].map((f, i) => (
                <div key={i} className="premium-card p-6 text-left">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-bold text-foreground mb-2">{f.t}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FormCTASection 
          title="Proteja sua Empresa com quem Domina Guarulhos"
          subtitle="Consultoria técnica gratuita para mapear os riscos do seu negócio e apresentar o melhor custo-benefício em até 24 horas."
          insuranceType="empresarial"
          trackingLabel="hub-empresarial-form"
        />

        <section className="py-24 bg-background" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <span className="section-label">FAQ</span>
              <h2 id="faq-heading" className="mt-3">Perguntas Frequentes — Empresas e Indústrias</h2>
            </div>
            <div className="space-y-3" data-speakable="faq">
              {FAQS.map((faq, i) => (
                <details key={i} className="premium-card group" open={i === 0}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-[15px] font-semibold hover:text-primary transition-base list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-primary/40 ml-4 group-open:rotate-45 transition-transform text-lg font-light">+</span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1 border-t border-border/50 pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <InsuranceHubLinks heading="Outras Soluções de Seguro" />
      </main>
      <Footer />
      <StickyQuoteBar 
        source="hub-empresarial" 
        quoteHref="/cotacao?tipo=empresarial" 
        whatsappMessage="Olá! Quero uma análise de seguro empresarial para minha empresa em Guarulhos."
        ctaLabel="Cotação Empresa"
      />
    </div>
  );
};
  
  export default HubEmpresarial;