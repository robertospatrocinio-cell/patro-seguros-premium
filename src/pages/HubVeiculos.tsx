 import { Link } from "react-router-dom";
 import { Car, Bike, Truck, Shield, ArrowRight, MessageCircle, MapPin, Award } from "lucide-react";
 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import PageMeta from "@/components/PageMeta";
 import Breadcrumb from "@/components/Breadcrumb";
 import { Button } from "@/components/ui/button";
 import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
 import InsuranceHubLinks from "@/components/InsuranceHubLinks";
 
 const WHATSAPP_URL = "https://wa.me/551151997500?text=Olá! Gostaria de uma cotação de seguro para meu veículo.";
 
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
 
 const HubVeiculos = () => (
   <div className="min-h-screen flex flex-col">
     <PageMeta 
        title="Corretora de Seguros de Veículos em Guarulhos: Auto e Frota | Patro" 
        description="A melhor corretora de seguros de veículos em Guarulhos. Cotação de seguro auto, moto, caminhão e frota com as 16 principais seguradoras. Resposta em 2h." 
     />
     <Header />
     <main id="main-content">
       <Breadcrumb items={[{ label: "Seguros de Veículos" }]} />
       
       <section className="relative gradient-hero py-20 overflow-hidden">
         <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
           <div className="flex justify-center mb-6">
             <Car className="h-16 w-16 text-white opacity-20" />
           </div>
            <h1 className="text-white mb-6">Seguros de Veículos em Guarulhos — Proteção de Verdade</h1>
            <p className="text-xl text-white/70 mb-8">
              Da cotação do seu carro à gestão de frotas logísticas em Guarulhos. Comparamos 16 seguradoras para garantir o menor custo.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/cotacao" onClick={() => trackCotacaoClick("hub-veiculos")}>
               <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold">
                 Cotar Agora
               </Button>
             </Link>
             <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub-veiculos")}>
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
           <Award className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="mb-4">Por que a Patro é a melhor Corretora de Seguros em Guarulhos?</h2>
            <p className="text-muted-foreground mb-10">
              Não somos apenas um comparador. Somos consultores locais em Guarulhos que analisam seu perfil para garantir a melhor indenização em caso de sinistro.
           </p>
           <div className="grid sm:grid-cols-3 gap-6">
             {[
               { t: "16+ Seguradoras", d: "Compare Porto, Tokio, Allianz e outras em um só lugar." },
               { t: "Suporte 24h", d: "Ajudamos você a acionar guincho e serviços a qualquer hora." },
               { t: "Gestão de Sinistro", d: "Cuidamos da burocracia para você receber rápido." }
             ].map((f, i) => (
               <div key={i} className="text-left">
                 <p className="font-bold text-primary mb-1">{f.t}</p>
                 <p className="text-xs text-muted-foreground">{f.d}</p>
               </div>
             ))}
           </div>
         </div>
       </section>
 
       <InsuranceHubLinks />
     </main>
     <Footer />
   </div>
 );
 
 export default HubVeiculos;