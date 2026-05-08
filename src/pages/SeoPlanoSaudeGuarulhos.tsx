import { Link } from "react-router-dom";
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";

const faqs = [
  { question: "Qual o melhor plano de saúde em Guarulhos?", answer: "Depende do seu perfil. Para cobertura ampla nacional, Bradesco Saúde e SulAmérica se destacam. Para custo-benefício em Guarulhos, HapVida/NotreDame e Amil têm rede local extensa. Para 59+, Prevent Senior e MedSenior são especialistas. A Patro Seguros compara todas as operadoras gratuitamente." },
  { question: "Quanto custa plano de saúde em Guarulhos?", answer: "Em Guarulhos, planos individuais começam em torno de R$ 280/mês para jovens adultos, R$ 600/mês para 40-49 anos e podem chegar a R$ 2.500/mês para 59+. Planos empresariais (PME) costumam ser 30% a 50% mais baratos." },
  { question: "Quais operadoras de plano de saúde têm rede credenciada em Guarulhos?", answer: "Bradesco Saúde, Amil, SulAmérica, Porto Saúde, HapVida/NotreDame Intermédica, Prevent Senior, MedSenior e Omint mantêm rede credenciada robusta em Guarulhos — incluindo Cidade Maia, Macedo, Vila Galvão e bairros próximos ao Aeroporto." },
  { question: "Plano de saúde empresarial em Guarulhos exige quantas vidas?", answer: "A maioria das operadoras aceita PMEs a partir de 2 vidas (CNPJ ativo). Algumas operadoras, como Bradesco e Amil, permitem MEI com 1 titular + 1 dependente. Os preços são significativamente menores que os planos individuais." },
  { question: "Como contratar plano de saúde MEI Guarulhos?", answer: "O plano de saúde MEI Guarulhos é contratado com CNPJ ativo de MEI e geralmente exige titular + 1 dependente. A Patro Seguros cota Bradesco Saúde, Amil, SulAmérica e Hapvida para MEIs em Guarulhos com preços até 50% menores que planos individuais. Atendimento presencial no Cidade Maia." },
  { question: "A Patro Seguros cobra para cotar plano de saúde?", answer: "Não. A cotação é 100% gratuita. Atendemos presencialmente no escritório da Cidade Maia, em Guarulhos, ou online por WhatsApp. Você paga o mesmo preço de tabela da operadora — recebemos comissão direta dela." },
];

const SeoPlanoSaudeGuarulhos = () => (
  <>
    <PageMeta title="Plano de Saúde Guarulhos e Plano de Saúde MEI Guarulhos" description="Plano de saúde Guarulhos e plano de saúde MEI Guarulhos: compare Bradesco, Amil, SulAmérica, Hapvida e Porto Saúde. Cotação grátis Patro Seguros." />
    <FAQSchema faqs={faqs} />
    <Header />
    <main id="main-content">
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-white mb-6">Plano de Saúde Guarulhos e Plano de Saúde MEI Guarulhos</h1>
          <p className="text-xl text-white/70 mb-8">
            Encontre o melhor plano de saúde em Guarulhos — individual, familiar, empresarial e plano de saúde MEI Guarulhos. Comparamos Bradesco, Amil, SulAmérica, Hapvida, Porto Saúde e mais.
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
       <div className="container mx-auto px-4 max-w-3xl" data-speakable="faq">
         <h2 id="faq-heading" className="text-center mb-12">Perguntas Frequentes sobre Plano de Saúde em Guarulhos</h2>
         <div className="space-y-6">
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

export default SeoPlanoSaudeGuarulhos;
