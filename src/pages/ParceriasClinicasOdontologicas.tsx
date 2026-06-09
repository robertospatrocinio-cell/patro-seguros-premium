import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Handshake, Users, Award, Sparkles, MessageCircle, CheckCircle } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20tenho%20uma%20cl%C3%ADnica%20odontol%C3%B3gica%20e%20quero%20ser%20parceiro%20da%20Patro%20Seguros.";

const beneficios = [
  { icon: Users, title: "Atendimento Especializado", desc: "Consultor dedicado para sua clínica, pacientes e equipe — sem fila de espera comum." },
  { icon: Award, title: "Condições Diferenciadas", desc: "Descontos exclusivos em seguro auto, vida, residencial e plano de saúde para indicados." },
  { icon: Sparkles, title: "Programa de Indicações", desc: "Comissionamento estruturado por indicação fechada — pagamento mensal e transparente." },
  { icon: Handshake, title: "Material de Apoio", desc: "Banners, flyers e conteúdo digital cobranded para usar na recepção e nas redes." },
];

const ParceriasClinicasOdontologicas = () => (
  <>
    <PageMeta
      title="Parcerias com Clínicas Odontológicas | Patro Seguros"
      description="Programa de parceria Patro Seguros para clínicas e consultórios odontológicos. Atendimento especializado, condições diferenciadas e programa de indicações."
    />
    <BreadcrumbSchema items={[
      { name: "Início", url: "/" },
      { name: "Clínicas Odontológicas", url: "/seguros-para-clinicas-odontologicas" },
      { name: "Parcerias", url: "/parcerias-clinicas-odontologicas" }
    ]} />
    <Header />
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Breadcrumb items={[
        { label: "Clínicas Odontológicas", href: "/seguros-para-clinicas-odontologicas" },
        { label: "Parcerias" }
      ]} />

      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Handshake className="h-12 w-12 text-white mx-auto mb-6 opacity-80" />
          <h1 className="text-white mb-4">Programa de Parceria com Clínicas Odontológicas</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Indique pacientes e familiares para a Patro Seguros e construa uma fonte recorrente de receita complementar — com atendimento premium para sua clínica.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("parceria-odonto")}>
            <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg h-12 px-8">
              <MessageCircle className="mr-2 h-4 w-4" /> Quero ser parceiro
            </Button>
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-center mb-10">Benefícios da Parceria</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {beneficios.map((b) => (
              <div key={b.title} className="p-6 rounded-xl border border-border bg-background flex gap-4">
                <b.icon className="h-7 w-7 text-primary shrink-0" />
                <div>
                  <h3 className="font-bold text-base mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Como Funciona</h2>
          <ol className="space-y-4">
            {[
              "Cadastre sua clínica via WhatsApp ou formulário.",
              "Receba o kit de materiais cobranded em até 5 dias úteis.",
              "Indique pacientes ou compartilhe seu link exclusivo de cotação.",
              "A Patro Seguros atende, cota e fecha o seguro.",
              "Você recebe o comissionamento mensal por indicação fechada.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3 items-start bg-background p-4 rounded-lg border">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="mb-6">Comece sua parceria hoje</h2>
          <p className="text-muted-foreground mb-10">Em 24h um consultor entra em contato para estruturar a parceria.</p>
          <div className="flex flex-col gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] h-14 text-lg gap-2">
                <MessageCircle className="h-6 w-6" /> Quero ser parceiro da Patro Seguros
              </Button>
            </a>
            <Link to="/cotacao?tipo=empresarial&origem=parceria-odonto" className="w-full" onClick={() => trackCotacaoClick("parceria-odonto-form")}>
              <Button variant="outline" className="w-full h-14 text-lg">Formulário de Cadastro</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default ParceriasClinicasOdontologicas;