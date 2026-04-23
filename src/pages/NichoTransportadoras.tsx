import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, ArrowRight, Shield, FileWarning, Truck } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20tenho%20uma%20transportadora%20e%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20de%20seguros.";

const faqs = [
  { question: "Qual seguro é obrigatório para transportadoras?", answer: "O RCTR-C (Responsabilidade Civil do Transportador Rodoviário de Cargas) é obrigatório para toda transportadora que realiza transporte de cargas de terceiros." },
  { question: "Como funciona o seguro de frota?", answer: "O seguro de frota cobre todos os veículos da empresa em uma única apólice, com condições e preços melhores do que segurar individualmente cada veículo." },
  { question: "Seguro de frota cobre terceiros?", answer: "Sim. A cobertura de RC Facultativa protege contra danos causados a terceiros (outros veículos, pedestres, propriedades) em caso de acidente com veículos da frota." },
  { question: "Quanto custa o seguro de frota?", answer: "Depende do número de veículos, tipos, perfil dos motoristas e região de atuação. Frotas maiores tendem a ter descontos progressivos." },
  { question: "O seguro cobre roubo de carga?", answer: "O RCTR-C cobre roubo de carga em algumas modalidades. Para proteção completa, recomendamos combinar com seguro de carga específico e gerenciamento de risco." },
];

const seguros = [
  { title: "Seguro de Frota", desc: "Proteção completa para todos os veículos da empresa em uma única apólice.", link: "/seguro-frota" },
  { title: "Seguro de Transporte (RCTR-C)", desc: "Cobertura obrigatória para transporte de cargas de terceiros.", link: "/seguro-transporte" },
  { title: "Seguro de Caminhão", desc: "Proteção individual para caminhões, carretas e veículos pesados.", link: "/seguro-caminhao" },
  { title: "RC do Transportador", desc: "Responsabilidade civil por danos a cargas, terceiros e meio ambiente.", link: "/seguro-rc" },
  { title: "Seguro Empresarial", desc: "Proteção do patrimônio: galpões, escritórios e equipamentos.", link: "/seguro-empresarial" },
  { title: "Seguro de Vida para Motoristas", desc: "Proteção para a equipe de motoristas e colaboradores.", link: "/seguro-vida-pme" },
];

const dores = [
  "Roubo de carga gera prejuízo milionário e pode comprometer contratos com clientes",
  "Acidentes com veículos pesados envolvem indenizações de alto valor a terceiros",
  "Frota parada por sinistro significa faturamento perdido e contratos descumpridos",
  "Custos crescentes de manutenção e seguro individual por veículo",
  "Exigência de RCTR-C para operar — multas e impedimentos sem o seguro obrigatório",
];

const NichoTransportadoras = () => (
  <>
    <PageMeta
      title="Seguros para Transportadoras e Frotistas | Patro Seguros"
      description="Seguros especializados para transportadoras, frotistas e logística. Seguro de Frota, RCTR-C, Transporte de Cargas. Cotação grátis em Guarulhos e SP."
    />
    <FAQSchema faqs={faqs} />
    <Header />
    <main id="main-content">
      <Breadcrumb items={[{ label: "Seguros por Nicho" }, { label: "Transportadoras e Frotistas" }]} />

      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-6">Especializado para Transporte e Logística</span>
          <h1 className="text-white mb-4">Seguros para Transportadoras e Frotistas</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Proteção completa para quem move o Brasil. Seguro de Frota, RCTR-C e Transporte de Cargas com as melhores condições do mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("nicho-transportadoras")}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg">Solicitar Cotação Grátis</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("nicho-transportadoras")}>
              <Button size="lg" variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> Falar com Especialista</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-destructive/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Riscos que Transportadoras Enfrentam</h2>
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
          <h2 className="text-center mb-4">Seguros Essenciais para Transporte e Logística</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto text-sm">Soluções que cobrem desde a carga até o motorista, passando pelo veículo e patrimônio da empresa.</p>
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
          <h2 className="text-center mb-8">Por Que Transportadoras Escolhem a Patro</h2>
          <div className="space-y-3">
            {[
              "Experiência com frotas de 5 a 500+ veículos",
              "Negociamos condições especiais com seguradoras parceiras",
              "Suporte 24h em caso de sinistro na estrada",
              "Gestão centralizada da apólice de toda a frota",
              "Atendimento humano e consultoria personalizada",
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
          <h2 className="text-white mb-4">Proteja Sua Frota e Suas Cargas</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto text-sm">Cotação gratuita e sem compromisso. Resposta em até 2 horas.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("nicho-transportadoras-cta")}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg">Cotação Rápida</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("nicho-transportadoras-cta")}>
              <Button size="lg" variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default NichoTransportadoras;
