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
import { CheckCircle, MessageCircle, ArrowRight, Shield, Stethoscope, HeartPulse, Lock, Activity, Users, PawPrint } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

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
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-white mb-4">Proteção para Clínicas e Hospitais Veterinários</h1>
          <p className="text-lg text-white/70 mb-8">Sua missão é cuidar dos animais. Nossa missão é proteger o seu negócio.</p>
          <div className="flex justify-center gap-3">
            <Link to="/cotacao?tipo=empresarial&origem=hub-vet">
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90">Solicitar Análise Gratuita</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-center mb-10">Nossas Soluções</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginas.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`} className="bg-background p-6 rounded-xl border border-border hover:border-primary transition">
                <PawPrint className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-bold mb-2">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
           <h2 className="mb-8">Central de Conteúdo</h2>
           <Link to="/blog/clinicas-veterinarias" className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90">
             Acessar Blog Veterinário
           </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  </>
);

export default NichoClinicasVeterinarias;
