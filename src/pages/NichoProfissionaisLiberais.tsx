import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, ArrowRight, Shield, FileWarning } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20sou%20profissional%20liberal%20e%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20de%20seguros.";

const faqs = [
  { question: "O que é Seguro RC Profissional?", answer: "É o seguro que protege profissionais liberais contra processos de clientes que aleguem erros, falhas ou negligência na prestação de serviços." },
  { question: "Quais profissionais precisam de RC?", answer: "Advogados, engenheiros, arquitetos, contadores, corretores de imóveis, consultores, fisioterapeutas, nutricionistas, psicólogos e qualquer profissional que preste serviços a terceiros." },
  { question: "Profissional autônomo pode contratar seguro empresarial?", answer: "Sim! Se você tem escritório ou consultório, o seguro empresarial protege o local, equipamentos e até responsabilidade civil das operações." },
  { question: "O RC cobre processos já em andamento?", answer: "Não. O RC Profissional cobre reclamações feitas durante a vigência da apólice, referentes a serviços prestados durante ou antes da vigência (retroatividade)." },
  { question: "Posso ter RC Profissional como pessoa física?", answer: "Sim. O seguro pode ser contratado em nome da pessoa física (CPF) ou jurídica (CNPJ). A cobertura protege a atuação profissional em ambos os casos." },
];

const seguros = [
  { title: "RC Profissional", desc: "Proteção contra processos por erros ou omissões na prestação de serviços.", link: "/seguro-rc-profissional" },
  { title: "RC para Advogados", desc: "Cobertura para erros advocatícios, perda de prazos e falhas processuais.", link: "/seguro-rc-advogados" },
  { title: "RC para Engenheiros", desc: "Proteção para projetos, laudos técnicos e responsabilidade por obras.", link: "/seguro-rc-engenheiros" },
  { title: "Seguro de Vida Individual", desc: "Proteção financeira para a família do profissional.", link: "/seguro-vida" },
  { title: "Previdência Privada", desc: "Planejamento de aposentadoria e benefícios fiscais (PGBL/VGBL).", link: "/previdencia-privada" },
  { title: "Seguro Empresarial", desc: "Proteção para escritório ou consultório: equipamentos, mobiliário e RC.", link: "/seguro-empresarial" },
];

const dores = [
  "Um único processo de cliente pode comprometer anos de patrimônio construído",
  "Profissionais liberais não têm a proteção de uma CLT — qualquer erro é responsabilidade pessoal",
  "Equipamentos de trabalho (notebooks, câmeras, instrumentos) sem proteção",
  "Sem previdência corporativa, a aposentadoria depende exclusivamente do profissional",
  "Prestadores de serviço são alvos crescentes de processos por responsabilidade civil",
];

const NichoProfissionaisLiberais = () => (
  <>
    <PageMeta
      title="Seguros para Profissionais Liberais | Patro Seguros"
      description="Seguros para advogados, engenheiros, arquitetos, contadores e profissionais liberais. RC Profissional, Vida e Previdência. Cotação grátis."
    />
    <FAQSchema faqs={faqs} />
    <Header />
    <main id="main-content">
      <Breadcrumb items={[{ label: "Seguros por Nicho" }, { label: "Profissionais Liberais" }]} />

      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-6">Para Quem Trabalha por Conta Própria</span>
          <h1 className="text-white mb-4">Seguros para Profissionais Liberais</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Advogados, engenheiros, contadores, consultores — proteja sua carreira, seu patrimônio e seu futuro com seguros feitos para quem empreende sozinho.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("nicho-profissionais-liberais")}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg">Solicitar Cotação Grátis</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("nicho-profissionais-liberais")}>
              <Button size="lg" variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> Falar com Especialista</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-destructive/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Riscos que Profissionais Liberais Enfrentam</h2>
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
          <h2 className="text-center mb-4">Seguros Recomendados para Profissionais Liberais</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto text-sm">Proteção personalizada para cada tipo de atuação profissional.</p>
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
          <h2 className="text-center mb-8">Por Que Profissionais Liberais Escolhem a Patro</h2>
          <div className="space-y-3">
            {[
              "Entendemos os riscos de cada profissão — não oferecemos soluções genéricas",
              "Comparamos propostas de diversas seguradoras para encontrar o melhor preço",
              "Orientação sobre coberturas essenciais vs. opcionais para seu perfil",
              "Suporte completo na hora do sinistro ou processo",
              "Consultor dedicado que acompanha suas necessidades ao longo do tempo",
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
          <h2 className="text-white mb-4">Proteja Sua Carreira e Seu Patrimônio</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto text-sm">Cotação gratuita e sem compromisso. Resposta em até 2 horas.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("nicho-profissionais-cta")}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg">Cotação Rápida</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("nicho-profissionais-cta")}>
              <Button size="lg" variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default NichoProfissionaisLiberais;
