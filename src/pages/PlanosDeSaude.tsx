import { Link } from "react-router-dom";
import { CheckCircle, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import heroImg from "@/assets/hero-planos-saude.webp";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20plano%20de%20sa%C3%BAde.";

const operadoras = [
  { name: "Bradesco Saúde", desc: "Ampla rede credenciada e cobertura nacional" },
  { name: "Amil Saúde", desc: "Planos individuais e empresariais com excelente custo-benefício" },
  { name: "SulAmérica Saúde", desc: "Tradição e qualidade em saúde suplementar" },
  { name: "Porto Saúde", desc: "Inovação e tecnologia em planos de saúde" },
  { name: "HapVida/NotreDame Intermédica", desc: "Rede própria e preços acessíveis" },
  { name: "Prevent Senior", desc: "Planos acessíveis com foco no público sênior" },
  { name: "MedSenior", desc: "Especialista em planos para a terceira idade" },
  { name: "Omint", desc: "Planos premium com atendimento diferenciado" },
];

const PlanosDeSaude = () => {
  return (
    <>
      <PageMeta title="Planos de Saúde" description="Compare planos de saúde das melhores operadoras: Bradesco, Amil, SulAmérica, Porto Saúde e mais. Cotação grátis para pessoa física e empresas em Guarulhos." />
      <Header />
      <main id="main-content">
        <section className="gradient-hero py-20 relative overflow-hidden">
          <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" aria-hidden="true" />
          <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
            <div className="text-6xl mb-6">🏥</div>
            <h1 className="text-white mb-6">Planos de Saúde — Compare e Encontre o Melhor</h1>
            <p className="text-xl text-white/70 mb-8">
              Trabalhamos com as principais operadoras do Brasil para encontrar o plano de saúde ideal para você, sua família ou sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20simular%20um%20plano%20de%20sa%C3%BAde." target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" onClick={() => trackWhatsAppClick("planos-saude-simular")}>
                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                  Simular Plano de Saúde <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" onClick={() => trackWhatsAppClick("planos-saude-hero")}>
                <Button size="lg" variant="cta" className="w-full sm:w-auto text-lg px-8">
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">Operadoras Parceiras</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {operadoras.map((op, i) => (
                <Card key={i} className="hover:shadow-lg transition-base">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">{op.name}</h3>
                    <p className="text-sm text-muted-foreground">{op.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-center mb-8">Por Que Contratar Plano de Saúde com a Patro?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Comparação entre todas as operadoras",
                "Análise do melhor custo-benefício para seu perfil",
                "Suporte na hora de usar o plano",
                "Planos individuais, familiares e empresariais",
                "Sem custo adicional para o cliente",
                "Atendimento consultivo e humanizado",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-white">Encontre o Plano de Saúde Ideal</h2>
            <p className="text-xl mb-8 text-white/90">Use nosso simulador ou fale com um especialista</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/551151997500?text=Ol%C3%A1%2C%20gostaria%20de%20simular%20um%20plano%20de%20sa%C3%BAde." target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">Simular Agora</Button>
              </a>
              <a href="tel:1151997500" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" /> (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-12">Perguntas Frequentes sobre Planos de Saúde</h2>
            <div className="space-y-6">
              {[
                { q: "Quanto custa um plano de saúde?", a: "O valor varia conforme a operadora, faixa etária, tipo de acomodação e cobertura. Fazemos uma análise personalizada para encontrar o melhor custo-benefício." },
                { q: "Posso contratar plano de saúde individual?", a: "Sim! Oferecemos opções de planos individuais, familiares e empresariais com diversas operadoras." },
                { q: "Qual o melhor plano de saúde em Guarulhos?", a: "Depende do perfil de cada cliente. Comparamos todas as operadoras para indicar a melhor opção para sua necessidade." },
                { q: "Existe carência no plano de saúde?", a: "A maioria dos planos tem períodos de carência regulados pela ANS. Podemos orientar sobre planos com carência reduzida." },
              ].map((faq, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
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

export default PlanosDeSaude;
