 import { Link } from "react-router-dom";
 import { Home, Building2, Key, Sun, Smartphone, ArrowRight, MessageCircle, ShieldCheck, Heart } from "lucide-react";
 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import PageMeta from "@/components/PageMeta";
 import Breadcrumb from "@/components/Breadcrumb";
 import { Button } from "@/components/ui/button";
 import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
 import InsuranceHubLinks from "@/components/InsuranceHubLinks";
 
 const WHATSAPP_URL = "https://wa.me/551151997500?text=Olá! Gostaria de uma cotação de seguro para meu patrimônio.";
 
 const SECTIONS = [
   {
     title: "Imóveis e Aluguel",
     links: [
       { label: "Seguro Residencial", href: "/seguro-residencial", desc: "Proteção para sua casa ou apartamento com assistência 24h" },
       { label: "Seguro Fiança Locatícia", href: "/seguro-fianca-locaticia", desc: "A garantia ideal para alugar sem precisar de fiador" },
       { label: "Seguro Imobiliário", href: "/seguro-imobiliario", desc: "Proteção para imóveis comerciais e residenciais alugados" },
     ]
   },
   {
     title: "Bens e Tecnologia",
     links: [
       { label: "Seguro Celular", href: "/seguro-celular", desc: "Contra roubo, furto qualificado e quebra acidental" },
       { label: "Seguro Placa Solar", href: "/seguro-placa-solar", desc: "Proteja seu investimento em energia sustentável" },
       { label: "Seguro Equipamentos", href: "/seguro-maquinas", desc: "Notebooks, câmeras e outros bens de valor" },
     ]
   }
 ];
 
 const HubPatrimonio = () => (
   <div className="min-h-screen flex flex-col">
     <PageMeta 
        title="Seguro Residencial e Fiança Locatícia em Guarulhos | Patro" 
        description="Proteja seu patrimônio com o melhor seguro residencial em Guarulhos. Fiança locatícia, seguro para celular e placas solares com assistência 24h local." 
     />
     <Header />
     <main id="main-content">
       <Breadcrumb items={[{ label: "Seguros de Patrimônio" }]} />
       
       <section className="relative gradient-hero py-20 overflow-hidden">
         <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
           <div className="flex justify-center mb-6">
             <Home className="h-16 w-16 text-white opacity-20" />
           </div>
            <h1 className="text-white mb-6">Seguro Residencial em Guarulhos — Proteja sua Conquista</h1>
            <p className="text-xl text-white/70 mb-8">
              Seu lar e seu aluguel em Guarulhos protegidos. Soluções inteligentes para garantir que imprevistos não virem grandes problemas financeiros.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/cotacao" onClick={() => trackCotacaoClick("hub-patrimonio")}>
               <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold">
                 Cotar Agora
               </Button>
             </Link>
             <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub-patrimonio")}>
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
           <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="mb-4">A melhor assistência residencial em Guarulhos</h2>
            <p className="text-muted-foreground mb-10">
              Nossos seguros em Guarulhos incluem serviços de chaveiro, eletricista e encanador local, garantindo rapidez no atendimento quando você mais precisa.
           </p>
           <div className="grid sm:grid-cols-3 gap-6">
             {[
               { t: "Economia Real", d: "Seguro residencial a partir de R$ 15/mês." },
               { t: "Aluguel Ágil", d: "Alugue seu imóvel em 24h com o seguro fiança." },
               { t: "Tudo Digital", d: "Contrate seu seguro celular em menos de 5 minutos." }
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
 
 export default HubPatrimonio;