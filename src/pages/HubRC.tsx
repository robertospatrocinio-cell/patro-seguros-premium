 import { Link } from "react-router-dom";
 import { Shield, Briefcase, Stethoscope, Scale, HardHat, HeartPulse, ArrowRight, MessageCircle, Gavel } from "lucide-react";
 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import PageMeta from "@/components/PageMeta";
 import Breadcrumb from "@/components/Breadcrumb";
 import { Button } from "@/components/ui/button";
 import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
 import InsuranceHubLinks from "@/components/InsuranceHubLinks";
 
 const WHATSAPP_URL = "https://wa.me/551151997500?text=Olá! Gostaria de uma cotação de seguro de Responsabilidade Civil Profissional.";
 
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
 
 const HubRC = () => (
   <div className="min-h-screen flex flex-col">
     <PageMeta 
       title="Responsabilidade Civil: Seguro para Profissionais e Empresas | Patro" 
       description="Hub de seguros de Responsabilidade Civil (RC). Proteção para médicos, advogados, engenheiros e executivos. Blindagem jurídica e financeira em Guarulhos." 
     />
     <Header />
     <main id="main-content">
       <Breadcrumb items={[{ label: "Responsabilidade Civil" }]} />
       
       <section className="relative gradient-hero py-20 overflow-hidden">
         <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
           <div className="flex justify-center mb-6">
             <Shield className="h-16 w-16 text-white opacity-20" />
           </div>
           <h1 className="text-white mb-6">Responsabilidade Civil — Sua Carreira Protegida</h1>
           <p className="text-xl text-white/70 mb-8">
             Erros e omissões acontecem com os melhores profissionais. Garanta que uma falha acidental não destrua sua reputação ou seu patrimônio financeiro.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/cotacao" onClick={() => trackCotacaoClick("hub-rc")}>
               <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold">
                 Solicitar Análise de Risco
               </Button>
             </Link>
             <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub-rc")}>
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
           <Gavel className="h-10 w-10 text-primary mx-auto mb-4" />
           <h2 className="mb-4">Blindagem Financeira e de Reputação</h2>
           <p className="text-muted-foreground mb-10">
             O seguro de RC não cobre apenas indenizações, mas também todos os custos de defesa jurídica, honorários advocatícios e perícias necessárias para sua defesa.
           </p>
           <div className="grid sm:grid-cols-3 gap-6">
             {[
               { t: "Custos de Defesa", d: "Advogados e perícias pagos pela seguradora." },
               { t: "Danos Morais", d: "Cobertura para reclamações de terceiros por danos imateriais." },
               { t: "Acordos Judiciais", d: "Recursos para encerrar processos de forma rápida e segura." }
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
 
 export default HubRC;