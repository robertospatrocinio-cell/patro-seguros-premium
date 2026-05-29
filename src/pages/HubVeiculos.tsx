  import { Link, useLocation } from "react-router-dom";
  import { Car, Bike, Truck, Shield, ArrowRight, MessageCircle, MapPin, Award, CheckCircle } from "lucide-react";
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
 
 const WHATSAPP_URL = "https://wa.me/551151997500?text=Olá! Gostaria de uma cotação de seguro para meu veículo.";
 
  const FAQS = [
    { question: "Qual a melhor seguradora para carros em Guarulhos?", answer: "Porto Seguro, Tokio Marine e Allianz são as líderes em Guarulhos, oferecendo excelente rede de oficinas e assistência 24h rápida nas rodovias Dutra e Fernão Dias." },
    { question: "Como funciona o seguro de frota para empresas?", answer: "A partir de 5 veículos, sua empresa já pode contratar um seguro de frota com gestão centralizada e descontos de até 30% em relação ao seguro individual." },
    { question: "O seguro cobre motorista de aplicativo (Uber/99)?", answer: "Sim, mas é necessário declarar o uso profissional no momento da cotação para garantir a cobertura durante as corridas e o RC passageiros." },
    { question: "Atendem caminhões e veículos pesados?", answer: "Sim, somos especialistas em seguros de caminhão e transporte de carga (RCTR-C), com foco no polo logístico de Cumbica e região." }
  ];

  const SECTIONS = [
   {
     title: "Automóveis e Motos",
     links: [
       { label: "Seguro Auto", href: "/seguro-auto", desc: "Completo contra roubo, colisão e assistência 24h" },
       { label: "Seguro Moto", href: "/seguro-moto", desc: "Proteção para motociclistas com os melhores preços" },
       { label: "Seguro Auto Premium", href: "/seguro-auto-premium", desc: "Exclusivo para veículos de alto padrão" },
       { label: "Seguro Auto Barato", href: "/seguro-auto-barato-guarulhos", desc: "Opções econômicas com proteção real" },
     ]
   },
   {
     title: "Carga e Logística",
     links: [
       { label: "Seguro Caminhão", href: "/seguro-caminhao", desc: "Segurança para seu instrumento de trabalho" },
       { label: "Seguro Frota", href: "/seguro-frota", desc: "Gestão e economia para frotas a partir de 5 veículos" },
       { label: "Seguro Transporte", href: "/seguro-transporte", desc: "RCTR-C e RCF-DC para transportadoras" },
     ]
   },
   {
     title: "Soluções Específicas",
     links: [
       { label: "Seguro Motorista App", href: "/seguro-motorista-app", desc: "Cobertura APP e danos a terceiros para Uber/99" },
       { label: "Seguro Bike", href: "/seguro-bike", desc: "Proteção contra roubo e danos para sua bicicleta" },
       { label: "Seguro Carta Verde", href: "/seguro-carta-verde", desc: "Obrigatório para viagens ao Mercosul" },
     ]
   }
 ];
 
const HubVeiculos = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta 
        title="Guia de Seguros de Veículos em Guarulhos: Auto e Frota | Patro" 
        description="A melhor corretora de seguros de veículos em Guarulhos. Cotação de seguro auto, moto, caminhão e frota com as 16 principais seguradoras. Resposta em 2h." 
      />
      <FAQSchema faqs={FAQS} />
      <AggregateRatingSchema
        serviceName="Seguros de Veículos em Guarulhos"
        url={canonicalUrl}
        description="Seguros para carros, motos, caminhões e frotas em Guarulhos."
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={[{ label: "Seguros de Veículos" }]} />
        
        <section className="relative gradient-hero py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
            <div className="flex justify-center mb-6">
              <Car className="h-16 w-16 text-white opacity-20" />
            </div>
            <h1 className="text-white mb-6">Seguros de Veículos em Guarulhos — Proteção de Verdade</h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Da cotação do seu carro à gestão de frotas logísticas em Guarulhos. Comparamos 16 seguradoras para garantir o menor custo e o melhor atendimento local.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cotacao?tipo=auto" onClick={() => trackCotacaoClick("hub-veiculos:hero")}>
                <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                  Pedir Cotação de Veículo
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub-veiculos:hero")}>
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

        <section className="py-24 bg-muted/30 border-y border-border" aria-labelledby="por-que-patro-veiculos">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Award className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 id="por-que-patro-veiculos" className="mb-4">Por que a Patro é a melhor Corretora de Seguros em Guarulhos?</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              Não somos apenas um comparador. Somos consultores locais em Guarulhos que analisam seu perfil para garantir a melhor indenização em caso de sinistro.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { t: "16+ Seguradoras", d: "Compare Porto, Tokio, Allianz e outras em um só lugar." },
                { t: "Suporte 24h", d: "Ajudamos você a acionar guincho e serviços a qualquer hora." },
                { t: "Gestão de Sinistro", d: "Cuidamos da burocracia para você receber rápido." }
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
          title="Pronto para Economizar no Seguro do seu Veículo?"
          subtitle="Em menos de 2 horas você recebe o comparativo das 16 maiores seguradoras de Guarulhos direto no seu WhatsApp."
          insuranceType="auto"
          trackingLabel="hub-veiculos-form"
        />

        <section className="py-24 bg-background" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <span className="section-label">FAQ</span>
              <h2 id="faq-heading" className="mt-3">Perguntas Frequentes — Veículos e Frota</h2>
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
        source="hub-veiculos" 
        quoteHref="/cotacao?tipo=auto" 
        whatsappMessage="Olá! Quero uma cotação rápida de seguro de veículo em Guarulhos."
        ctaLabel="Cotação Veículo"
      />
    </div>
  );
};
  
  export default HubVeiculos;