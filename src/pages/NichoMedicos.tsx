import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, ArrowRight, Shield, Stethoscope, FileWarning, Scale } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20sou%20profissional%20da%20sa%C3%BAde%20e%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20de%20seguros.";

const faqs = [
  { question: "Quais seguros um médico precisa ter?", answer: "RC Profissional (obrigatório na prática), Seguro de Vida, Plano de Saúde e, se tiver clínica, Seguro Empresarial com cobertura de equipamentos." },
  { question: "O RC Médico cobre processos de pacientes?", answer: "Sim. O Seguro RC Médico cobre custos de defesa jurídica e indenizações decorrentes de alegações de erro médico, negligência ou imperícia." },
  { question: "Clínicas de estética também precisam de RC?", answer: "Sim, especialmente. Procedimentos estéticos têm alto índice de reclamações. O RC para clínicas de estética cobre danos alegados por pacientes." },
  { question: "Quanto custa o seguro RC para médicos?", answer: "Depende da especialidade e limite de cobertura. Valores a partir de R$ 800/ano para clínico geral, podendo ser maior para cirurgiões e obstetras." },
  { question: "O seguro cobre equipamentos médicos?", answer: "Sim. Com o Seguro Empresarial, equipamentos como ultrassom, raio-X, laser e aparelhos de diagnóstico ficam protegidos contra roubo, incêndio e danos elétricos." },
];

const seguros = [
  { title: "RC Profissional Médico", desc: "Proteção contra processos por alegações de erro médico, negligência e imperícia.", link: "/seguro-rc-medicos" },
  { title: "RC para Clínicas de Estética", desc: "Cobertura para procedimentos estéticos e reclamações de pacientes.", link: "/seguro-rc-medicos" },
  { title: "RC para Dentistas", desc: "Proteção para consultórios e clínicas odontológicas.", link: "/seguro-rc-dentistas" },
  { title: "Seguro Empresarial para Clínicas", desc: "Proteção do patrimônio: equipamentos, instalações e lucros cessantes.", link: "/seguro-empresarial" },
  { title: "Plano de Saúde Empresarial", desc: "Planos para a equipe da clínica com as melhores operadoras.", link: "/plano-saude-empresarial" },
  { title: "Seguro de Vida para Médicos", desc: "Proteção financeira para a família do profissional.", link: "/seguro-vida" },
];

const dores = [
  "Processos judiciais por alegação de erro médico podem custar centenas de milhares de reais",
  "Equipamentos médicos de alto valor sem proteção contra roubo, incêndio ou pane elétrica",
  "Responsabilidade civil por eventos adversos em procedimentos estéticos",
  "Falta de cobertura para custos de defesa jurídica — mesmo quando o médico está certo",
  "Clínicas sem seguro empresarial ficam vulneráveis a paralisação total após sinistro",
];

const NichoMedicos = () => (
  <>
    <PageMeta
      title="Seguros para Médicos e Clínicas | Patro Seguros"
      description="Seguros especializados para médicos, dentistas, clínicas e profissionais da saúde em Guarulhos e SP. RC Médico, Seguro Empresarial, Plano de Saúde. Cotação grátis."
    />
    <FAQSchema faqs={faqs} />
    <Header />
    <main id="main-content">
      <Breadcrumb items={[{ label: "Seguros por Nicho" }, { label: "Médicos e Clínicas" }]} />

      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-6">Especializado para Profissionais da Saúde</span>
          <h1 className="text-white mb-4">Seguros para Médicos, Dentistas e Clínicas</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Proteção completa para quem cuida da saúde das pessoas. RC Profissional, Seguro Empresarial e Plano de Saúde com as melhores seguradoras do mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("nicho-medicos")}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg">Solicitar Cotação Grátis</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("nicho-medicos")}>
              <Button size="lg" variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> Falar com Especialista</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Dores */}
      <section className="py-16 bg-destructive/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Riscos que Médicos e Clínicas Enfrentam</h2>
          <div className="space-y-4">
            {dores.map((dor, i) => (
              <div key={i} className="flex items-start gap-3 bg-background p-4 rounded-lg shadow-sm">
                <FileWarning className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{dor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seguros */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-center mb-4">Seguros Recomendados para o Setor de Saúde</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto text-sm">Cada solução foi selecionada para cobrir os riscos específicos da prática médica e da gestão de clínicas.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {seguros.map((s, i) => (
              <Link key={i} to={s.link} className="group">
                <div className="border rounded-xl p-6 h-full hover:shadow-lg transition-all hover:border-primary/30">
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                  <span className="text-sm font-medium text-primary flex items-center">Saiba mais <ArrowRight className="ml-1 h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Por que Patro */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Por Que a Patro é a Escolha de Profissionais da Saúde</h2>
          <div className="space-y-3">
            {[
              "Especialistas que entendem os riscos da prática médica",
              "Comparamos propostas de 16+ seguradoras para encontrar o melhor custo-benefício",
              "Suporte completo em caso de sinistro ou processo judicial",
              "Atendimento humano — você fala com pessoas, não com robôs",
              "Experiência comprovada com clínicas, consultórios e hospitais",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-background p-4 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-center mb-8">Perguntas Frequentes</h2>
          <div className="divide-y divide-border">
            {faqs.map((faq, i) => (
              <details key={i} className="group py-5" open={i === 0}>
                <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold hover:text-primary transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="text-muted-foreground/30 ml-4 group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                </summary>
                <p className="pt-3 text-sm text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white mb-4">Proteja Sua Carreira e Sua Clínica</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto text-sm">Cotação gratuita e sem compromisso. Resposta em até 2 horas.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("nicho-medicos-cta")}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg">Pedir Cotação Gratuita</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("nicho-medicos-cta")}>
              <Button size="lg" variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default NichoMedicos;
