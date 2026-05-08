  import { Link, useLocation } from "react-router-dom";
  import { Shield, Briefcase, Stethoscope, Scale, HardHat, HeartPulse, ArrowRight, MessageCircle, Gavel, CheckCircle } from "lucide-react";
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
 
 const WHATSAPP_URL = "https://wa.me/551151997500?text=Olá! Gostaria de uma cotação de seguro de Responsabilidade Civil Profissional.";
 
  const FAQS = [
    { question: "O que o seguro de Responsabilidade Civil cobre?", answer: "Ele cobre indenizações por danos materiais ou corporais causados involuntariamente a terceiros, além de todos os custos de defesa jurídica, honorários e perícias." },
    { question: "RC Profissional vs RC Geral: qual a diferença?", answer: "O RC Profissional (E&O) foca em falhas, erros ou omissões no exercício da profissão. O RC Geral foca em acidentes físicos no estabelecimento ou operações da empresa." },
    { question: "Médicos e advogados precisam de seguro RC?", answer: "Sim, é fundamental para proteger o patrimônio pessoal e a reputação contra processos judiciais de pacientes ou clientes." },
    { question: "Como funciona a retroatividade no seguro RC?", answer: "É uma cláusula que cobre reclamações feitas hoje por fatos ocorridos antes do início da apólice, desde que o profissional não tivesse conhecimento do fato no momento da contratação." }
  ];

  const SECTIONS = [
   {
     title: "Saúde e Bem-estar",
     links: [
       { label: "RC Médicos", href: "/seguro-rc-medicos", desc: "Proteção contra processos por erro médico ou omissão" },
       { label: "RC Dentistas", href: "/seguro-rc-dentistas", desc: "Segurança jurídica para cirurgiões-dentistas" },
       { label: "RC Veterinários", href: "/seguro-rc-veterinarios", desc: "Cobertura para profissionais de medicina veterinária" },
       { label: "RC Clínicas de Estética", href: "/seguro-rc-profissional", desc: "Essencial para procedimentos estéticos e clínicas" },
     ]
   },
   {
     title: "Profissões e Gestão",
     links: [
       { label: "RC Advogados", href: "/seguro-rc-advogados", desc: "Proteção contra falhas em prazos e consultoria" },
       { label: "RC Engenheiros", href: "/seguro-rc-engenheiros", desc: "Segurança para projetos, execução e ARTs" },
       { label: "RC Executivos (D&O)", href: "/seguro-rc-executivos", desc: "Blindagem do patrimônio pessoal de diretores e gestores" },
       { label: "RC Eventos", href: "/seguro-rc-eventos", desc: "Proteção para organizadores de feiras, shows e congressos" },
     ]
   },
   {
     title: "Geral e Obras",
     links: [
       { label: "RC Geral", href: "/seguro-rc", desc: "Danos materiais e corporais causados a terceiros" },
       { label: "RC Obras", href: "/seguro-rc-obras", desc: "Proteção durante a execução de construções e reformas" },
       { label: "RC Prestação de Serviços", href: "/seguro-rc-prestacao-servicos", desc: "Para empresas que atuam em locais de clientes" },
     ]
   }
 ];
 
const HubRC = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
        title="Guia de Seguro de Responsabilidade Civil em Guarulhos: Profissional e E&O" 
        description="Proteção para médicos, advogados e engenheiros em Guarulhos. Seguro de Responsabilidade Civil Profissional para blindagem jurídica e financeira." 
      />
      <FAQSchema faqs={FAQS} />
      <AggregateRatingSchema
        serviceName="Responsabilidade Civil em Guarulhos"
        url={canonicalUrl}
        description="Proteção profissional e jurídica em Guarulhos."
      />
      <Header />
      <main id="main-content">
        <Breadcrumb items={[{ label: "Responsabilidade Civil" }]} />
        
        <section className="relative gradient-hero py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-white opacity-20" />
            </div>
            <h1 className="text-white mb-6">Responsabilidade Civil em Guarulhos — Carreira Protegida</h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Proteção para profissionais de Guarulhos. Garanta que uma falha acidental não destrua sua reputação ou seu patrimônio financeiro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cotacao?tipo=rc" onClick={() => trackCotacaoClick("hub-rc:hero")}>
                <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                  Solicitar Análise de Risco
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub-rc:hero")}>
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

        <section className="py-24 bg-muted/30 border-y border-border" aria-labelledby="blindagem-financeira-rc">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <Gavel className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 id="blindagem-financeira-rc" className="mb-4">Blindagem Financeira e de Reputação</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              O seguro de RC não cobre apenas indenizações, mas também todos os custos de defesa jurídica, honorários advocatícios e perícias necessárias para sua defesa.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { t: "Custos de Defesa", d: "Advogados e perícias pagos pela seguradora." },
                { t: "Danos Morais", d: "Cobertura para reclamações de terceiros por danos imateriais." },
                { t: "Acordos Judiciais", d: "Recursos para encerrar processos de forma rápida e segura." }
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
          title="Sua Carreira Vale Muito para Ficar Exposta"
          subtitle="Em poucos minutos você recebe uma análise de risco e o comparativo das melhores apólices de RC do mercado."
          insuranceType="rc"
          trackingLabel="hub-rc-form"
        />

        <section className="py-24 bg-background" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <span className="section-label">FAQ</span>
              <h2 id="faq-heading" className="mt-3">Perguntas Frequentes — Responsabilidade Civil</h2>
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

        <InsuranceHubLinks heading="Outros Seguros em Guarulhos" />
      </main>
      <Footer />
      <StickyQuoteBar 
        source="hub-rc" 
        quoteHref="/cotacao?tipo=rc" 
        whatsappMessage="Olá! Quero uma cotação de seguro de Responsabilidade Civil Profissional em Guarulhos."
        ctaLabel="Cotação RC"
      />
    </div>
  );
};
  
  export default HubRC;