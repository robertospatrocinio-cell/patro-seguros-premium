import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, ArrowRight, MapPin, Building2, Users, TrendingUp, Plane, Shield } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import GoogleBusinessWidget from "@/components/GoogleBusinessWidget";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pela%20p%C3%A1gina%20sobre%20Guarulhos%20e%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o.";

const faqs = [
  { question: "A Patro Seguros atende apenas Guarulhos?", answer: "Não. Nossa sede fica em Guarulhos, mas atendemos toda a Região Metropolitana de São Paulo, interior do estado e, para seguros Agro, todo o Brasil. O atendimento é presencial, por WhatsApp, telefone e videochamada." },
  { question: "Qual é a melhor corretora de seguros em Guarulhos?", answer: "A Patro Seguros é referência em Guarulhos, com nota 4.9 no Google, mais de 150 avaliações positivas e registro na SUSEP (nº 212113511). Comparamos cotações de 16+ seguradoras para encontrar o melhor custo-benefício." },
  { question: "Vocês fazem seguro para empresas em Guarulhos?", answer: "Sim! Temos ampla experiência com empresas de Guarulhos — desde pequenas lojas até indústrias e transportadoras. Oferecemos Seguro Empresarial, RC, Frota, Cyber, Plano de Saúde Empresarial e mais." },
  { question: "Como funciona o atendimento presencial?", answer: "Nosso escritório fica na Av. Salgado Filho, 2120 – Sala 219, com fácil acesso e estacionamento. Atendemos de segunda a sexta das 9h às 18h e sábados das 9h às 13h. Recomendamos agendar pelo WhatsApp." },
  { question: "Vocês trabalham com planos de saúde em Guarulhos?", answer: "Sim! Trabalhamos com as principais operadoras que atendem Guarulhos: Amil, Bradesco Saúde, SulAmérica, Hapvida/NotreDame, Prevent Senior, Unimed e mais. Comparamos preços e coberturas para encontrar o ideal." },
  { question: "Quanto custa um seguro auto em Guarulhos?", answer: "O preço varia conforme veículo, perfil do condutor e região de periculosidade. Em Guarulhos, valores médios vão de R$ 1.800 a R$ 5.000/ano. Solicite uma cotação gratuita para seu perfil específico." },
];

const dadosGuarulhos = [
  { icon: Users, value: "1,4 milhão", label: "Habitantes", desc: "2ª maior cidade de SP" },
  { icon: Plane, value: "GRU Airport", label: "Aeroporto Internacional", desc: "Maior da América do Sul" },
  { icon: Building2, value: "50.000+", label: "Empresas ativas", desc: "Polo industrial e logístico" },
  { icon: TrendingUp, value: "R$ 65 bi", label: "PIB municipal", desc: "Top 10 do Brasil" },
];

const nichos = [
  { title: "Transportadoras e Logística", desc: "Guarulhos é um dos maiores polos logísticos do Brasil, com centenas de transportadoras operando na região do Aeroporto e Rodovia Dutra.", link: "/seguros/transportadoras" },
  { title: "Indústrias e Galpões", desc: "O parque industrial de Guarulhos concentra fábricas de autopeças, alimentos, cosméticos e eletrônicos que precisam de proteção completa.", link: "/seguro-empresarial" },
  { title: "Comércio e Serviços", desc: "Shoppings, lojas de rua e prestadores de serviço formam a base econômica da cidade e precisam de seguros empresariais e RC.", link: "/seguros/empresarios" },
  { title: "Profissionais da Saúde", desc: "Guarulhos possui uma rede extensa de clínicas, consultórios e hospitais. RC Médico e Plano de Saúde são essenciais.", link: "/seguros/medicos-e-clinicas" },
  { title: "Profissionais Liberais", desc: "Advogados, engenheiros, contadores e consultores que atuam na região precisam de RC Profissional.", link: "/seguros/profissionais-liberais" },
  { title: "Famílias e Pessoas Físicas", desc: "Seguro Auto, Residencial, Vida e Plano de Saúde para proteger o que mais importa na segunda maior cidade de SP.", link: "/cotacao" },
];

const SobreGuarulhos = () => (
  <>
    <PageMeta
      title="Corretora de Seguros em Guarulhos | Patro Seguros"
      description="A Patro Seguros é a corretora de seguros referência em Guarulhos/SP. Seguro Auto, Empresarial, Saúde, Vida, Frota e mais. Nota 4.9 no Google. Cotação grátis!"
    />
    <FAQSchema faqs={faqs} />
    <LocalBusinessSchema />
    <Header />
    <main id="main-content">
      <Breadcrumb items={[{ label: "Patro em Guarulhos" }]} />

      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-6">
            <MapPin className="inline h-3 w-3 mr-1" />Guarulhos/SP
          </span>
          <h1 className="text-white mb-4">Por Que Escolher a Patro Seguros em Guarulhos</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Somos a corretora de seguros referência na segunda maior cidade de São Paulo. Conhecemos o mercado local, os riscos da região e as melhores soluções para proteger famílias e empresas de Guarulhos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("sobre-guarulhos")}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg">Solicitar Cotação Grátis</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("sobre-guarulhos")}>
              <Button size="lg" variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> Falar com Especialista</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Dados sobre Guarulhos */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-center mb-4">Guarulhos em Números</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto text-sm">
            A segunda maior cidade do estado de São Paulo é um polo econômico diversificado que demanda soluções de seguros especializadas.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {dadosGuarulhos.map((d, i) => (
              <div key={i} className="text-center p-6 border rounded-xl">
                <d.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold text-foreground">{d.value}</p>
                <p className="text-sm font-medium mt-1">{d.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mercado de Seguros em Guarulhos */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">O Mercado de Seguros em Guarulhos</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              Guarulhos é a <strong>segunda maior cidade do estado de São Paulo</strong> e uma das 10 maiores do Brasil, com mais de 1,4 milhão de habitantes e um PIB superior a R$ 65 bilhões. A cidade abriga o <strong>Aeroporto Internacional de Guarulhos (GRU Airport)</strong>, o maior da América do Sul, que movimenta toda uma cadeia de logística, transporte e serviços.
            </p>
            <p>
              O <strong>parque industrial</strong> da cidade é diversificado: autopeças, alimentos, cosméticos, eletrônicos, metalurgia e químicos. Centenas de galpões industriais e centros de distribuição operam ao longo das rodovias Dutra e Fernão Dias, gerando demanda constante por <strong>seguro empresarial, de frota, transporte de cargas e RC</strong>.
            </p>
            <p>
              No segmento de <strong>pessoas físicas</strong>, Guarulhos apresenta índices de roubo e furto de veículos acima da média estadual, especialmente nas regiões centrais e no entorno do aeroporto. Isso torna o <strong>seguro auto</strong> ainda mais essencial para moradores da cidade.
            </p>
            <p>
              A rede de <strong>saúde</strong> local inclui hospitais, clínicas e consultórios que atendem a população crescente. A demanda por <strong>planos de saúde</strong> individuais e empresariais é alta, com diversas operadoras atuando na região.
            </p>
          </div>
        </div>
      </section>

      {/* Por que Patro em Guarulhos */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Por Que a Patro é a Melhor Opção em Guarulhos</h2>
          <div className="space-y-3">
            {[
              "Sede em Guarulhos — conhecemos a realidade local, os bairros e os riscos da região",
              "Registrada na SUSEP (nº 212113511) — corretora regulamentada e fiscalizada",
              "Nota 4.9 no Google com mais de 150 avaliações de clientes reais",
              "Comparamos cotações de 16+ seguradoras e 20 operadoras de saúde",
              "Atendimento presencial no escritório ou 100% online (WhatsApp, e-mail, videochamada)",
              "Resposta em até 2 horas com propostas comparativas",
              "Suporte completo em sinistros — da abertura à resolução",
              "Especialistas em Agro e RC com atuação nacional",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nichos atendidos */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-center mb-4">Quem Atendemos em Guarulhos</h2>
          <p className="text-center text-muted-foreground mb-10 text-sm max-w-2xl mx-auto">Soluções específicas para cada perfil de cliente na região.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {nichos.map((n, i) => (
              <Link key={i} to={n.link} className="group">
                <div className="border rounded-xl p-6 h-full bg-background hover:shadow-lg transition-all hover:border-primary/30">
                  <Shield className="h-7 w-7 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{n.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{n.desc}</p>
                  <span className="text-sm font-medium text-primary flex items-center">Ver seguros <ArrowRight className="ml-1 h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Google Business + Mapa */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-center mb-8">Visite Nosso Escritório</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <GoogleBusinessWidget />
              <div className="mt-6 p-6 border rounded-xl">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Como Chegar</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Av. Salgado Filho, 2120 – Sala 219<br />
                  Guarulhos/SP – CEP 07115-000
                </p>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>• Próximo ao Aeroporto Internacional de Guarulhos</li>
                  <li>• Fácil acesso pela Rodovia Dutra</li>
                  <li>• Estacionamento no local</li>
                  <li>• Atendimento com hora marcada</li>
                </ul>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border" style={{ minHeight: 450 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.8547956844783!2d-46.44936132378558!3d-23.44622945767449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8f1f8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sAv.%20Salgado%20Filho%2C%202120%20-%20Guarulhos%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 450 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Patro Seguros em Guarulhos"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-center mb-8">Perguntas Frequentes sobre Seguros em Guarulhos</h2>
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
          <h2 className="text-white mb-4">Proteja o Que É Seu em Guarulhos</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto text-sm">Cotação gratuita e sem compromisso. Resposta em até 2 horas.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("sobre-guarulhos-cta")}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg">Pedir Cotação Gratuita</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("sobre-guarulhos-cta")}>
              <Button size="lg" variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default SobreGuarulhos;
