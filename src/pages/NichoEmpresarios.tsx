import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, ArrowRight, Shield, FileWarning } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20sou%20empres%C3%A1rio%20e%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20de%20seguros%20para%20minha%20empresa.";

const faqs = [
  { question: "Quais seguros toda empresa deveria ter?", answer: "No mínimo: Seguro Empresarial (patrimônio), RC Geral (responsabilidade civil), Seguro de Vida em Grupo (colaboradores) e Plano de Saúde Empresarial. Dependendo do porte, também Seguro Cyber e D&O." },
  { question: "Seguro empresarial cobre roubo e incêndio?", answer: "Sim. A cobertura básica inclui incêndio, raio e explosão. Roubo e furto qualificado são coberturas adicionais muito recomendadas." },
  { question: "O que é seguro D&O?", answer: "D&O (Directors and Officers) protege diretores, administradores e executivos contra processos pessoais decorrentes de decisões tomadas no exercício de suas funções." },
  { question: "Lucros cessantes são cobertos?", answer: "Sim, como cobertura adicional do seguro empresarial. Cobre o faturamento perdido durante a paralisação da empresa por sinistro coberto." },
  { question: "Posso contratar todos os seguros em um pacote?", answer: "Sim! A Patro faz uma análise completa da sua empresa e monta um pacote personalizado com todas as coberturas necessárias, otimizando custos." },
];

const seguros = [
  { title: "Seguro Empresarial", desc: "Proteção completa para o patrimônio: imóvel, equipamentos, estoque e lucros cessantes.", link: "/seguro-empresarial" },
  { title: "Seguro Cyber", desc: "Proteção contra ataques cibernéticos, vazamento de dados e extorsão digital.", link: "/seguro-cyber" },
  { title: "RC Geral e Profissional", desc: "Cobertura para danos causados a terceiros nas operações da empresa.", link: "/seguro-rc" },
  { title: "D&O — Executivos", desc: "Proteção pessoal para diretores e administradores contra processos.", link: "/seguro-rc-executivos" },
  { title: "Plano de Saúde Empresarial", desc: "Benefício essencial para atrair e reter talentos.", link: "/plano-saude-empresarial" },
  { title: "Seguro de Vida em Grupo", desc: "Proteção para colaboradores — exigido em muitas convenções coletivas.", link: "/seguro-vida-pme" },
];

const dores = [
  "Incêndio, alagamento ou roubo podem paralisar sua empresa por meses",
  "Processos trabalhistas e de terceiros ameaçam o patrimônio pessoal do empresário",
  "Ataques cibernéticos e vazamento de dados geram multas da LGPD e perda de clientes",
  "Falta de benefícios como plano de saúde dificulta retenção de talentos",
  "Sem seguro D&O, diretores respondem com patrimônio pessoal em processos societários",
];

const NichoEmpresarios = () => (
  <>
    <PageMeta
      title="Seguros para Empresários e Empresas | Patro Seguros"
      description="Pacote completo de seguros para empresas: Empresarial, Cyber, RC, D&O, Plano de Saúde e Vida em Grupo. Cotação grátis em Guarulhos e SP."
    />
    <FAQSchema faqs={faqs} />
    <Header />
    <main id="main-content">
      <Breadcrumb items={[{ label: "Seguros por Nicho" }, { label: "Empresários" }]} />

      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-6">Proteção Completa para Empresas</span>
          <h1 className="text-white mb-4">Seguros para Empresários e Empresas</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Do patrimônio aos colaboradores, da responsabilidade civil à proteção digital. Um pacote completo para sua empresa crescer com segurança.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("nicho-empresarios")}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg">Solicitar Cotação Grátis</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("nicho-empresarios")}>
              <Button size="lg" variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> Falar com Especialista</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-destructive/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Riscos que Toda Empresa Enfrenta</h2>
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

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-center mb-4">Seguros Essenciais para Sua Empresa</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto text-sm">Cada solução cobre um risco específico. Juntas, formam a blindagem completa do seu negócio.</p>
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

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Por Que Empresários Escolhem a Patro</h2>
          <div className="space-y-3">
            {[
              "Análise completa dos riscos da sua empresa antes de cotar",
              "Comparamos 16+ seguradoras para otimizar custo e cobertura",
              "Pacotes personalizados — você não paga por coberturas desnecessárias",
              "Suporte dedicado em sinistros: abertura, acompanhamento e resolução",
              "Atendimento consultivo — não vendemos, orientamos",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-background p-4 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white mb-4">Proteja Sua Empresa de Forma Inteligente</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto text-sm">Cotação gratuita e sem compromisso. Resposta em até 2 horas.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("nicho-empresarios-cta")}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg">Cotação Rápida</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("nicho-empresarios-cta")}>
              <Button size="lg" variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default NichoEmpresarios;
