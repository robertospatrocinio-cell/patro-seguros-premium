import { Link } from "react-router-dom";
 import { CheckCircle, Shield, Users, Clock, Award, MessageCircle, Phone, LayoutDashboard } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const faqs = [
  { question: "Onde fica a Patro Seguros em Guarulhos?", answer: "Estamos na Avenida Salgado Filho, 2120 – Ed. Via Alameda – Sala 219 – Cidade Maia, Guarulhos/SP, CEP 07115-000. Atendemos presencialmente, por telefone (11) 5199-7500 e online via WhatsApp." },
  { question: "Qual a melhor corretora de seguros de Guarulhos?", answer: "A Patro Seguros é uma das corretoras mais bem avaliadas de Guarulhos, com nota 4,9/5 no Google e mais de 500 PMEs atendidas. Trabalhamos com 16+ seguradoras e 20+ operadoras de saúde, oferecendo atendimento consultivo gratuito." },
  { question: "A Patro atende clientes fora de Guarulhos?", answer: "Sim! Embora nossa sede seja em Guarulhos, atendemos clientes em toda a Grande São Paulo, no estado de SP e em todo o Brasil — especialmente para seguros agro, RC profissional e empresariais." },
  { question: "Como funciona a cotação de seguros na Patro?", answer: "Você solicita pelo site, WhatsApp ou telefone. Em até 2 horas comparamos as melhores seguradoras parceiras e enviamos as propostas mais vantajosas, com explicação detalhada de coberturas, franquias e preços." },
  { question: "Quanto custa contratar uma corretora de seguros?", answer: "Nada. A corretora não cobra do cliente — somos remunerados via comissão paga pela seguradora. O cliente paga o mesmo valor que pagaria contratando direto, mas com o suporte completo de um corretor especializado." },
  { question: "Quais seguros a Patro Seguros oferece em Guarulhos?", answer: "Auto, Moto, Residencial, Vida, Saúde, Empresarial, Frota, Cyber, RC Profissional, Condomínio, Viagem, Celular, Previdência Privada, Consórcios e seguros Agro/Rural — entre outros." },
  { question: "A Patro Seguros é corretora Porto Seguro Guarulhos?", answer: "Sim. A Patro Seguros é corretora Porto Seguro Guarulhos credenciada e faz cotação Porto Seguro Guarulhos para auto, moto, residencial, vida, saúde, empresarial e frota. Comparamos a Porto com Tokio, Allianz, HDI, Bradesco e outras para você escolher o melhor preço." },
  { question: "Como faço cotação Porto Seguro Guarulhos pela Patro?", answer: "Envie seus dados pelo WhatsApp (11) 5199-7500 ou preencha o formulário do site. Em até 2 horas você recebe a cotação Porto Seguro Guarulhos junto com propostas comparativas de outras seguradoras." },
];

 const SeoCorretoraGuarulhos = () => {
   return (
     <>
       <PageMeta title="Corretora de Seguros em Guarulhos | Patro Seguros" description="Patro Seguros: a melhor corretora de seguros em Guarulhos. Atendimento presencial no Cidade Maia. Porto, Allianz, HDI e Bradesco. Cotação em 2h." />
       <FAQSchema faqs={faqs} />
       <Header />
 
       {/* Barra de Conversão Fixa */}
       <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] py-3 md:py-4 px-4">
         <div className="container mx-auto max-w-5xl flex items-center justify-between gap-3 md:gap-4">
           <div className="hidden sm:flex items-center gap-2">
             <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
               <Shield className="h-5 w-5 text-primary" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-900 leading-tight">Patro Seguros Guarulhos</p>
               <p className="text-xs text-slate-500">Nota 4.7/5 no Google</p>
             </div>
           </div>
           <div className="flex-1 flex gap-2 md:gap-3 max-w-md ml-auto">
             <Button asChild className="flex-1 rounded-xl h-12 text-sm font-bold shadow-lg shadow-primary/20">
               <Link to="/cotacao">
                 <LayoutDashboard className="mr-2 h-4 w-4 hidden xs:block" />
                 Pedir Cotação
               </Link>
             </Button>
             <Button asChild variant="cta" className="flex-1 rounded-xl h-12 text-sm font-bold">
               <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                 <MessageCircle className="mr-2 h-4 w-4 hidden xs:block" />
                 WhatsApp
               </a>
             </Button>
           </div>
         </div>
       </div>
 
       <main id="main-content" className="pb-24">
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="flex justify-center mb-6">
            <SeloMelhorCorretora size="lg" priority />
          </div>
           <h1 className="text-white mb-6">Corretora de Seguros em Guarulhos — Atendimento Especializado</h1>
           <p className="text-xl text-white/70 mb-8">
             Atendimento presencial no Cidade Maia com corretor credenciado Porto Seguro, Allianz, HDI, Bradesco e Tokio Marine. Cotação comparativa em até 2 horas úteis.
           </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("seo-corretora-guarulhos")}>
              <Button size="lg" className="text-lg px-8"><Shield className="mr-2 h-5 w-5" /> Solicitar Cotação</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("seo-corretora-guarulhos")}>
              <Button size="lg" variant="cta" className="text-lg px-8"><MessageCircle className="mr-2 h-5 w-5" /> WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-10">
            <SeloMelhorCorretora size="md" className="mb-4" />
            <h2 className="text-center">Por Que Somos a Melhor Corretora de Guarulhos</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: "Cotação em 2h", desc: "Resposta rápida com as melhores opções." },
              { icon: Users, title: "Atendimento Local", desc: "Escritório em Guarulhos com atendimento presencial." },
              { icon: Shield, title: "+13 Seguradoras", desc: "Parceria com as maiores seguradoras do Brasil." },
              { icon: Award, title: "Suporte Total", desc: "Acompanhamento completo em sinistros." },
            ].map((item, i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-6">
                  <item.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="mb-8">Seguros Disponíveis em Guarulhos</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Seguro Auto", "Seguro Moto", "Seguro Residencial", "Seguro Vida",
              "Seguro Empresarial", "Seguro Frota", "Planos de Saúde", "Seguro Viagem",
              "Seguro RC", "Previdência Privada", "Seguro Celular", "Seguro Condomínio",
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-white">Fale com a Melhor Corretora de Guarulhos</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cotacao"><Button size="lg" variant="secondary">Cotação Rápida</Button></Link>
            <a href="tel:1151997500"><Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"><Phone className="mr-2 h-5 w-5" /> (11) 5199-7500</Button></a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="faq-heading" className="text-center mb-12">Perguntas Frequentes sobre a Corretora em Guarulhos</h2>
          <div className="space-y-6" data-speakable="faq">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
       <Footer />
     </>
   );
 };

export default SeoCorretoraGuarulhos;
