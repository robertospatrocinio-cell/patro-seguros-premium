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
import { CheckCircle, MessageCircle, ArrowRight, Shield, Stethoscope, HeartPulse, Lock, Activity, Users } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20sou%20dentista%20em%20Guarulhos%20e%20gostaria%20de%20uma%20an%C3%A1lise%20gratuita%20da%20minha%20cl%C3%ADnica.";

const faqs = [
  { question: "Por que uma clínica odontológica precisa de seguro empresarial?", answer: "Clínicas reúnem equipamentos caros (cadeiras, raio-X, scanners intraorais), dados sensíveis de pacientes e risco constante de processos por erro profissional. O seguro empresarial protege patrimônio, RC e lucros cessantes em caso de paralisação." },
  { question: "Qual a diferença entre RC Profissional e Seguro Empresarial para clínicas?", answer: "O RC Profissional cobre processos por alegação de erro odontológico contra o dentista. O Seguro Empresarial cobre danos físicos à clínica (incêndio, roubo, danos elétricos). Idealmente, a clínica contrata os dois — e a Patro Seguros estrutura uma apólice integrada." },
  { question: "Equipamentos odontológicos novos têm cobertura de roubo?", answer: "Sim. O seguro de equipamentos cobre cadeiras odontológicas, raio-X, scanners intraorais, impressoras 3D e computadores contra roubo qualificado, furto, danos elétricos e quebra acidental durante operação." },
  { question: "O seguro cobre processos por procedimentos estéticos?", answer: "Sim. O RC Profissional Dentistas inclui cobertura para reclamações por lentes de contato dental, facetas, harmonização e procedimentos estéticos — um dos motivos mais comuns de processo na odontologia atual." },
  { question: "A Patro Seguros atende dentistas autônomos ou só clínicas?", answer: "Ambos. Temos apólices específicas para dentistas autônomos (RC individual), consultórios pequenos, clínicas com vários sócios e redes/franquias odontológicas como OdontoCompany, Sorridents e OrthoPride." },
];

const paginas = [
  { name: "Seguro para Dentistas", slug: "seguro-para-dentistas", desc: "Proteção individual para o profissional autônomo." },
  { name: "Consultório Odontológico", slug: "seguro-consultorio-odontologico", desc: "Cobertura para consultórios de pequeno porte." },
  { name: "Clínica Odontológica", slug: "seguro-clinica-odontologica", desc: "Apólice integrada para clínicas e redes." },
  { name: "RC para Dentistas", slug: "responsabilidade-civil-dentistas", desc: "Defesa contra processos por erro odontológico." },
  { name: "Equipamentos Odontológicos", slug: "seguro-equipamentos-odontologicos", desc: "Cadeiras, raio-X, scanners, 3D." },
  { name: "Plano de Saúde Empresarial", slug: "plano-saude-clinicas-odontologicas", desc: "Benefícios para a equipe da clínica." },
  { name: "Seguro de Vida Empresarial", slug: "seguro-vida-clinicas-odontologicas", desc: "Proteção para sócios e funcionários." },
];

const coberturas = [
  { icon: Shield, title: "Seguro Empresarial", desc: "Incêndio, danos elétricos, roubo, furto qualificado, vendaval e alagamentos." },
  { icon: Activity, title: "Equipamentos Odontológicos", desc: "Cadeiras, raio-X, scanner intraoral, computadores, impressoras 3D, equipamentos de imagem." },
  { icon: Stethoscope, title: "Responsabilidade Civil Profissional", desc: "Erro profissional, danos a pacientes, custos judiciais e honorários advocatícios." },
  { icon: Lock, title: "Seguro Cyber", desc: "LGPD, vazamento de dados, ataques cibernéticos e ransomware." },
  { icon: HeartPulse, title: "Seguro de Vida Empresarial", desc: "Cobertura para sócios, funcionários e equipe clínica." },
  { icon: Users, title: "Plano de Saúde Empresarial", desc: "Clínicas pequenas, médias e redes odontológicas." },
];

const NichoClinicasOdontologicas = () => (
  <>
    <PageMeta
      title="Seguro para Clínicas Odontológicas em Guarulhos | Patro Seguros"
      description="Proteja sua clínica odontológica: seguro empresarial, RC profissional, equipamentos odontológicos, seguro de vida e plano de saúde empresarial."
    />
    <FAQSchema faqs={faqs} />
    <LocalBusinessSchema />
    <OrganizationSchema />
    <WebSiteSchema />
    <AggregateRatingSchema
      serviceName="Seguro para Clínicas Odontológicas em Guarulhos"
      url="https://www.patroseguros.com.br/seguros-para-clinicas-odontologicas"
      description="Hub estratégico de seguros para consultórios, clínicas e redes odontológicas em Guarulhos."
    />
    <BreadcrumbSchema items={[
      { name: "Início", url: "/" },
      { name: "Clínicas Odontológicas", url: "/seguros-para-clinicas-odontologicas" }
    ]} />
    <Header />
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Breadcrumb items={[{ label: "Segmentos" }, { label: "Clínicas Odontológicas" }]} />

      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-6">Hub de Seguros para Odontologia</span>
          <h1 className="text-white mb-4">Proteção Completa para Consultórios e Clínicas Odontológicas</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Seguros especializados para proteger sua estrutura, seus equipamentos, seus pacientes e o patrimônio construído ao longo de anos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cotacao?tipo=empresarial&origem=hub-odonto" onClick={() => trackCotacaoClick("hub-odonto")}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg h-12 px-8">Solicitar Análise Gratuita</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub-odonto")}>
              <Button size="lg" variant="cta" className="rounded-lg h-12 px-8"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Especialista</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Páginas */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-center mb-10">Soluções para Cada Perfil de Profissional</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginas.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`} className="group bg-background p-6 rounded-xl border border-border hover:border-primary/50 transition-all shadow-sm">
                <Stethoscope className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                <span className="text-sm font-medium text-primary flex items-center">Acessar página <ArrowRight className="ml-1 h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coberturas */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-center mb-4">Coberturas Especializadas para Odontologia</h2>
          <p className="text-center text-muted-foreground mb-10 text-sm">Apólices desenhadas para a realidade do consultório e da clínica odontológica.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coberturas.map((c) => (
              <div key={c.title} className="p-6 rounded-xl border border-border bg-background">
                <c.icon className="h-7 w-7 text-primary mb-4" />
                <h3 className="font-bold text-base mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parceria */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-white mb-4">Programa de Parceria com Clínicas Odontológicas</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">Indique pacientes e familiares e tenha atendimento especializado, condições diferenciadas e comissionamento estruturado.</p>
          <Link to="/parcerias-clinicas-odontologicas">
            <Button size="lg" variant="secondary" className="font-bold">Quero ser parceiro da Patro Seguros</Button>
          </Link>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Conteúdo para Dentistas e Gestores Clínicos</h2>
          <Link to="/blog/7-riscos-clinica-odontologica-proteger" className="block p-5 border rounded-xl hover:shadow-md transition-shadow mb-4">
            <h3 className="font-bold text-lg mb-2">7 Riscos Que Toda Clínica Odontológica Deve Proteger</h3>
            <p className="text-sm text-muted-foreground">Incêndios, processos, ciberataques, afastamento de sócios e mais — guia completo para blindar o patrimônio.</p>
          </Link>
          <Link to="/blog/odontologia" className="text-primary font-medium flex items-center justify-center mt-6">
            Ver central de conteúdo odontológico <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-background p-5 rounded-lg border">
                <h3 className="font-semibold text-base mb-2">{f.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="mb-6">Análise Gratuita para Sua Clínica</h2>
          <p className="text-muted-foreground mb-10">Receba uma proposta personalizada com coberturas integradas e condições especiais para o setor odontológico.</p>
          <div className="flex flex-col gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] h-14 text-lg gap-2">
                <MessageCircle className="h-6 w-6" /> WhatsApp Especialista Odontologia
              </Button>
            </a>
            <Link to="/cotacao?tipo=empresarial&origem=hub-odonto" className="w-full">
              <Button variant="outline" className="w-full h-14 text-lg">Formulário de Cotação</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default NichoClinicasOdontologicas;