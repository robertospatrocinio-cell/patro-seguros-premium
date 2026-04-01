import { Link } from "react-router-dom";
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";

const SeoPlanoSaudeGuarulhos = () => (
  <>
    <PageMeta title="Plano de Saúde em Guarulhos – Cidade Maia" description="Encontre o melhor plano de saúde no Cidade Maia, Guarulhos. Compare Bradesco Saúde, Amil, SulAmérica e mais. Atendimento local e cotação gratuita com a Patro Seguros." />
    <Header />
    <main id="main-content">
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-white mb-6">Plano de Saúde em Guarulhos — Compare e Contrate</h1>
          <p className="text-xl text-white/70 mb-8">
            Encontre o melhor plano de saúde em Guarulhos com a Patro Seguros. Comparamos Bradesco, Amil, SulAmérica, Porto e outras operadoras.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/planos-de-saude">
              <Button size="lg" className="text-lg px-8">Simular Plano de Saúde <ArrowRight className="ml-2 h-5 w-5" /></Button>
            </Link>
            <a href="https://wa.me/551151997500?text=Ol%C3%A1%2C%20quero%20cotar%20plano%20de%20sa%C3%BAde%20em%20Guarulhos" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="cta"><MessageCircle className="mr-2 h-5 w-5" /> WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="mb-8">Por Que Contratar Plano de Saúde em Guarulhos com a Patro?</h2>
          <div className="space-y-4">
            {["Corretora local com atendimento presencial em Guarulhos", "Comparação entre todas as operadoras com cobertura na cidade", "Planos individuais, familiares e empresariais", "Suporte na utilização do plano", "Sem custo adicional para o cliente"].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-12">Perguntas Frequentes</h2>
          <div className="space-y-6">
            {[
              { q: "Qual o melhor plano de saúde em Guarulhos?", a: "Depende do perfil e necessidades. Comparamos todas as operadoras para encontrar a melhor opção para você." },
              { q: "Quanto custa plano de saúde em Guarulhos?", a: "Os valores variam por operadora, faixa etária e tipo de plano. Simule gratuitamente com a Patro." },
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

export default SeoPlanoSaudeGuarulhos;
