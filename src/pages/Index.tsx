import { useEffect, useMemo, useState, lazy, Suspense, Fragment } from "react";
import { Link } from "react-router-dom";
import { Shield, Users, Phone, MessageCircle, ArrowRight, Zap, Headphones, MapPin, Globe, Smartphone, Mail } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick, trackInternalLinkClick, buildInternalLinkSource } from "@/lib/tracking";
import SmartText from "@/components/SmartText";
import { getRelatedLinks } from "@/lib/relatedFromText";
import Header from "@/components/Header";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import WebSiteSchema from "@/components/WebSiteSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import AggregateRatingSchema from "@/components/AggregateRatingSchema";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";
import LazySection from "@/components/LazySection";

// Static components
import InsuranceHeroSelector from "@/components/InsuranceHeroSelector";
import Footer from "@/components/Footer";

// Lazy-loaded components for better FCP
const LocalSavingsCalculator = lazy(() => import("@/components/LocalSavingsCalculator"));
const LocalTestimonials = lazy(() => import("@/components/LocalTestimonials"));
const FormCTASection = lazy(() => import("@/components/FormCTASection"));
const LeadMagnetSection = lazy(() => import("@/components/LeadMagnetSection"));
const GoogleBusinessWidget = lazy(() => import("@/components/GoogleBusinessWidget"));
const PortoPartnershipSection = lazy(() => import("@/components/PortoPartnershipSection"));
const HomeBlogSection = lazy(() => import("@/components/HomeBlogSection"));
const InsuranceHubLinks = lazy(() => import("@/components/InsuranceHubLinks"));
const AgrishowPromoBanner = lazy(() => import("@/components/AgrishowPromoBanner"));

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const parceiros = ["AKAD", "ALLIANZ", "AMIL", "AXA", "AZOS", "AZUL", "BRADESCO", "DARWIN", "EZZE", "HAPVIDA/NOTREDAME", "HDI", "ITAÚ", "ITURAN", "JUSTOS", "LIBERTY", "MAG", "MAPFRE", "MEDSENIOR", "MITSUI", "OMINT", "PIER", "PORTO", "PREVENT SENIOR", "SOMPO", "SUHAI", "SULAMERICA", "SURA", "TOKIO MARINE", "UNIMED", "YOUSE", "ZURICH"];

const stats = [
  { value: "16+", label: "Seguradoras" },
  { value: "20", label: "Operadoras de Saúde" },
  { value: "2h", label: "Tempo de Resposta" },
  { value: "100%", label: "Cotação Gratuita" },
];

const diferenciais = [
  { icon: Zap, title: "Cotação em até 2 horas", desc: "Propostas comparativas de várias seguradoras entregues rapidamente." },
  { icon: Users, title: "Consultor dedicado", desc: "Especialista analisa seu perfil e recomenda exatamente o que faz sentido." },
  { icon: Shield, title: "16+ seguradoras", desc: "Porto, Tokio Marine, Allianz, HDI e mais — comparamos todas." },
  { icon: Headphones, title: "Suporte em sinistro", desc: "Cuidamos de todo o processo: abertura, acompanhamento e resolução." },
];

const faqs = [
  { question: "Por que escolher uma corretora de seguros em Guarulhos?", answer: "Uma corretora local em Guarulhos conhece os riscos da região — alagamentos, índices de roubo por bairro, trânsito — e recomenda coberturas adequadas. A Patro Seguros compara cotações de mais de 16 seguradoras para encontrar o melhor custo-benefício." },
  { question: "Quanto tempo leva para receber uma cotação?", answer: "Em até 2 horas úteis você recebe sua cotação personalizada com propostas comparativas de múltiplas seguradoras." },
  { question: "A cotação é realmente gratuita?", answer: "Sim. Todas as nossas cotações de seguro são 100% gratuitas e sem compromisso. Compare à vontade." },
  { question: "Quais tipos de seguro a Patro Seguros oferece em Guarulhos?", answer: "Seguro auto, seguro residencial, seguro de vida, seguro empresarial, seguro de frota, planos de saúde, consórcio e muito mais. Atendemos pessoas físicas, famílias e empresas de todos os portes." },
  { question: "Como funciona o suporte em caso de sinistro?", answer: "A Patro cuida de todo o processo junto à seguradora: abertura, documentação, acompanhamento e resolução. Você não precisa ligar para a seguradora — nós fazemos isso por você." },
];

const Index = () => {
  const linkedKeywords = useMemo(() => new Set<string>(), []);
  
  useEffect(() => {
    try {
      const el = document.getElementById('persistent-hero-bg');
      if (el) {
        el.style.setProperty('display', 'none', 'important');
      }
      return () => { 
        if (el) el.style.display = ''; 
      };
    } catch (e) {
      console.warn("Effect error in Index:", e);
    }
  }, []);

  return (
    <>
      <PageMeta 
        title="Corretora de Seguros em Guarulhos | Patro Seguros"
        description="Patro Seguros: A melhor corretora de seguros em Guarulhos. Compare cotações de 16+ seguradoras para Seguro Auto, Uber, Residencial e Saúde. Cotação em 2h!"
        absoluteTitle={true}
      />
      <FAQSchema faqs={faqs} />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebSiteSchema />
      <AggregateRatingSchema
        serviceName="Corretora de Seguros em Guarulhos"
        url={CANONICAL_BASE_URL}
        description="Corretora de seguros em Guarulhos: auto, residencial, vida, saúde e frotas. 16+ seguradoras parceiras."
      />
      <BreadcrumbSchema items={[
        { name: "Início", url: "https://www.patroseguros.com.br" },
        { name: "Corretora de Seguros Guarulhos", url: "https://www.patroseguros.com.br" },
      ]} />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section className="relative gradient-hero overflow-hidden min-h-[500px] flex items-center bg-slate-900" aria-label="Apresentação da Patro Seguros em Guarulhos">
          <div className="absolute inset-0 z-0">
            <picture>
              <source media="(max-width: 600px)" srcSet="/images/hero-familia-sm.webp" type="image/webp" />
              <img
                src="/images/hero-home.webp"
                alt="Seguro auto em Guarulhos com cotação online pela Patro Seguros"
                width={1920}
                height={1080}
                className="w-full h-full object-cover opacity-25"
                fetchPriority="high"
                decoding="sync"
                loading="eager"
              />
            </picture>
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="py-20 md:py-40 max-w-[680px] mx-auto text-center">
              <div className="mb-6 md:mb-8 h-28 md:h-36 flex items-center justify-center relative z-20">
                <SeloMelhorCorretora size="lg" priority className="mx-auto" />
              </div>
              <h1 className="text-white text-balance mb-5 animate-fade-up-delay-1">
                Corretora de Seguros em Guarulhos: Proteção Completa e Cotação em até 2h
              </h1>
              <p className="text-[15px] md:text-lg text-white mb-1.5 font-semibold">
                Nota 4.9 no Google | +16 seguradoras parceiras | Cotação em 2h
              </p>
              <p className="text-[14px] md:text-base text-white mb-8 md:mb-10 text-balance max-w-[520px] mx-auto leading-relaxed">
                Atendimento humanizado e personalizado. Compare cotações de seguro auto, residencial, vida e empresarial entre as melhores seguradoras do mercado.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/cotacao" className="w-full sm:w-auto" onClick={() => trackCotacaoClick("homepage")}>
                  <Button size="lg" className="w-full sm:w-auto text-[13px] px-7 rounded-lg bg-white text-foreground hover:bg-white/90 h-11 font-semibold tracking-tight">
                    Cotar meu seguro agora
                    <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" onClick={() => trackWhatsAppClick("homepage-hero")}>
                  <Button size="lg" className="w-full sm:w-auto text-[13px] px-7 rounded-lg h-11 bg-white/[0.12] border border-white/[0.2] text-white hover:bg-white/[0.18] hover:text-white font-semibold tracking-tight">
                    <MessageCircle className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    Falar com especialista no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <InsuranceHeroSelector />

        <section className="border-b bg-background" aria-label="Números da Patro">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {stats.map((s) => (
                <div key={s.label} className="py-8 md:py-10 text-center">
                  <p className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight font-heading">{s.value}</p>
                  <p className="text-[11px] text-foreground/80 mt-1 uppercase tracking-[0.1em] font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 border-b bg-background overflow-hidden" aria-label="Seguradoras e operadoras parceiras">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-marquee whitespace-nowrap">
              {[...parceiros, ...parceiros].map((name, i) => (
                <span key={i} className="mx-6 text-[12px] font-semibold text-muted-foreground whitespace-nowrap select-none">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white relative overflow-hidden" aria-label="Simulador de economia">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2 space-y-6">
                <span className="section-label">Ferramenta Gratuita</span>
                <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                  O seguro em Guarulhos subiu? <span className="text-primary">Nós ajudamos você a pagar menos.</span>
                </h2>
                <p className="text-foreground leading-relaxed font-medium">
                  Nossa ferramenta analisa o custo médio das seguradoras parceiras com base no índice de risco de cada bairro em Guarulhos. Compare e economize em minutos.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">1</div>
                    <p className="text-sm font-medium">Informe quanto paga atualmente</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">2</div>
                    <p className="text-sm font-medium">Selecione seu bairro em Guarulhos</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">3</div>
                    <p className="text-sm font-medium">Receba o melhor comparativo do mercado</p>
                  </div>
                </div>
              </div>
              <LazySection className="lg:w-1/2 w-full" minHeight="400px">
                <Suspense fallback={<div className="h-[400px] w-full bg-muted animate-pulse rounded-xl" />}>
                  <LocalSavingsCalculator />
                </Suspense>
              </LazySection>
            </div>
          </div>
        </section>

        <LazySection minHeight="300px">
          <Suspense fallback={<div className="h-[300px] w-full bg-muted animate-pulse" />}>
            <LocalTestimonials />
          </Suspense>
        </LazySection>

        <section className="py-16 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="section-label">Diferenciais Patro Seguros</span>
              <h2 id="diferenciais-heading" className="mt-3">Por que escolher a Patro Seguros?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
              {diferenciais.map((item, i) => (
                <div key={i} className="bg-card p-8 text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/[0.05] flex items-center justify-center mx-auto mb-5">
                    <item.icon className="h-[18px] w-[18px] text-primary" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-[13px] text-muted-foreground/90 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="eeat-heading" className="text-center mb-8">Corretora de Seguros em Guarulhos: Proteção e Economia</h2>
            <div className="prose prose-sm max-w-none text-foreground space-y-4">
              <p>
                Desde 2020, a <strong>Patro Seguros</strong> atende moradores e empresas de <strong>Guarulhos</strong> com consultoria especializada em seguros. Somos uma das <strong>melhores corretoras de seguros em Guarulhos</strong>, reconhecida pela nota 4,9/5 no Google e por já ter atendido <strong>500+ PMEs locais</strong> com cases reais de economia e proteção. Nossa sede no <strong>Cidade Maia</strong> (Av. Salgado Filho, 2120 – Ed. Via Alameda, Sala 219) permite atendimento presencial para clientes de toda a região metropolitana, enquanto nosso canal online atende todo o Brasil.
              </p>
              <p>
                Guarulhos, a segunda maior cidade de São Paulo com mais de 1,4 milhão de habitantes, possui características únicas que exigem uma corretora que conheça profundamente a região. Do polo logístico de Cumbica às residências de alto padrão no Cidade Maia, cada bairro demanda uma estratégia de proteção diferente. É por isso que a Patro se especializou em entender os riscos locais — índices de roubo por região, alagamentos sazonais, perfil de trânsito nas rodovias Dutra e Fernão Dias — para recomendar exatamente as coberturas que fazem sentido para cada perfil.
              </p>

              <h2 className="text-foreground font-bold text-lg mt-8">Seguro Auto em Guarulhos</h2>
              <p>
                Guarulhos registra um dos maiores volumes de circulação de veículos do estado, com trânsito intenso na Dutra, Fernão Dias e vias locais como a Av. Paulo Faccini. Bairros como Cumbica, Bonsucesso e Pimentas apresentam índices elevados de roubo e furto de veículos, tornando o <Link to="/seguro-auto-guarulhos" className="text-primary hover:underline underline">seguro auto em Guarulhos</Link> essencial. A Patro compara cotações de Porto Seguro, Tokio Marine, Allianz, HDI, Mapfre, Liberty e outras seguradoras para garantir a melhor relation custo-benefício. Nosso diferencial: entregamos propostas comparativas em até 2 horas.
              </p>
              <p>
                Para quem tem <Link to="/seguro-moto-guarulhos" className="text-primary hover:underline underline">moto em Guarulhos</Link>, também oferecemos cotações especializadas com coberturas contra roubo, colisão e assistência 24h — fundamentais para motociclistas que enfrentam o trânsito intenso da cidade diariamente.
              </p>

              <h2 className="text-foreground font-bold text-lg mt-8">Seguro Residencial: Proteção para Casas e Apartamentos</h2>
              <p>
                O <Link to="/seguro-residencial-guarulhos" className="text-primary hover:underline underline">seguro residencial em Guarulhos</Link> custa a partir de R$ 150/ano para apartamentos e R$ 300/ano para casas, incluindo cobertura contra incêndio, roubo, danos elétricos (muito comum na região devido às oscilações de energia), vendaval e responsabilidade civil familiar. Moradores da <Link to="/seguros-guarulhos/cidade-maia" className="text-primary hover:underline underline">Cidade Maia</Link>, <Link to="/seguros-guarulhos/vila-augusta" className="text-primary hover:underline underline">Vila Augusta</Link>, Picanço e Macedo já contam com a Patro para proteger seus lares. Inclui assistência 24h com chaveiro, encanador, eletricista e vidraceiro sem custo adicional.
              </p>

              <h2 className="text-foreground font-bold text-lg mt-8">Como Solicitar Sua Cotação Passo a Passo</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Escolha o tipo de seguro</strong> — auto, residencial, vida, empresarial, frota ou saúde.</li>
                <li><strong>Preencha o <Link to="/cotacao" className="text-primary hover:underline underline">formulário de cotação online</Link></strong> ou envie uma mensagem pelo <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline">WhatsApp (11) 5199-7500</a>.</li>
                <li><strong>Receba propostas comparativas</strong> — em até 2 horas úteis, com análise de custo-benefício entre as melhores seguradoras.</li>
                <li><strong>Feche com segurança</strong> — seu consultor Patro cuida de toda documentação e ativação da apólice.</li>
              </ol>
              <p>O serviço é 100% gratuito e sem compromisso. Você também pode ligar para <a href="tel:1151997500" className="text-primary hover:underline underline">(11) 5199-7500</a> ou visitar nossa sede no Cidade Maia.</p>

              <div className="mt-12 bg-card rounded-xl p-8 border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Principais Bairros Atendidos</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link to="/seguros-guarulhos/cidade-maia" className="text-sm hover:text-primary">Cidade Maia</Link>
                  <Link to="/seguros-guarulhos/vila-augusta" className="text-sm hover:text-primary">Vila Augusta</Link>
                  <Link to="/seguros-guarulhos/picanco" className="text-sm hover:text-primary">Picanço</Link>
                  <Link to="/seguros-guarulhos/macedo" className="text-sm hover:text-primary">Macedo</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <LazySection minHeight="400px">
          <Suspense fallback={<div className="h-[400px] w-full bg-muted animate-pulse" />}>
            <LeadMagnetSection />
          </Suspense>
        </LazySection>

        <LazySection minHeight="400px">
          <Suspense fallback={<div className="h-[400px] w-full bg-muted animate-pulse" />}>
            <FormCTASection 
              title="Proteja seu patrimônio com quem entende de Guarulhos"
              subtitle="Seja para sua família ou sua empresa, encontramos a melhor cobertura pelo menor custo do mercado."
            />
          </Suspense>
        </LazySection>

        <section className="py-16 md:py-32 bg-background" aria-labelledby="sobre-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <span className="section-label">Quem somos</span>
              <h2 id="sobre-heading" className="mt-3 mb-6">Sua corretora de seguros<br className="hidden sm:block" /> no Cidade Maia, Guarulhos</h2>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                A Patro Seguros é uma corretora de seguros em Guarulhos registrada na SUSEP (nº 212113511), com sede no Cidade Maia. Atendemos pessoas físicas, famílias, empresas e produtores rurais em Guarulhos e em todo o Brasil.
              </p>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-10">
                Cada cliente conversa direto com um consultor especialista, recebe propostas comparativas de múltiplas seguradoras e tem suporte completo — da cotação ao sinistro.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/sobre"><Button variant="outline" className="rounded-lg text-[13px] h-10">Conheça a Patro</Button></Link>
                <Link to="/indique-um-amigo"><Button variant="ghost" className="rounded-lg text-primary text-[13px] h-10">Indique um amigo <ArrowRight className="ml-1 h-3 w-3" aria-hidden="true" /></Button></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background" aria-labelledby="atendimento-brasil-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="section-label">Atendimento Nacional</span>
              <h2 id="atendimento-brasil-heading" className="mt-3">Atendemos clientes de <span className="text-primary">todo o Brasil</span></h2>
              <p className="text-[14px] text-muted-foreground mt-4 max-w-xl mx-auto">
                Nossa sede fica em Guarulhos/SP, mas atendemos segurados de qualquer cidade e estado. 
                Todo o processo é 100% remoto — rápido, seguro e sem burocracia.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="text-center p-6 hover:shadow-md transition-base">
                <CardContent className="p-0 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-[15px] font-semibold">Cotação por WhatsApp</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    Envie os dados pelo WhatsApp e receba propostas comparativas de diversas seguradoras em até 24h.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 hover:shadow-md transition-base">
                <CardContent className="p-0 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-[15px] font-semibold">Emissão 100% Digital</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    Análise, emissão da apólice e envio de documentos — tudo feito online, sem necessidade de deslocamento.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 hover:shadow-md transition-base">
                <CardContent className="p-0 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Headphones className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-[15px] font-semibold">Sinistro com Suporte Total</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    Em caso de sinistro, acompanhamos toda a regulação remotamente — do aviso à indenização.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-[13px] text-muted-foreground mb-6">
                <MapPin className="inline h-3.5 w-3.5 mr-1 text-primary" />
                Sede: Guarulhos/SP · Atendemos todas as capitais, cidades do interior e zona rural de todos os 26 estados + DF.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/551151997500?text=Olá! Gostaria de uma cotação de seguro. Sou de outra cidade/estado."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("Atendimento Brasil")}
                >
                  <Button className="rounded-lg text-[13px] h-10 bg-[#25D366] hover:bg-[#1fb855] text-white w-full sm:w-auto">
                    <MessageCircle className="mr-1.5 h-4 w-4" /> Falar no WhatsApp
                  </Button>
                </a>
                <Link to="/cotacao">
                  <Button variant="outline" className="rounded-lg text-[13px] h-10 w-full sm:w-auto" onClick={() => trackCotacaoClick("Atendimento Brasil")}>
                    Cotação Rápida <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 gradient-surface" aria-labelledby="google-business-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="section-label">Google Meu Negócio</span>
              <h2 id="google-business-heading" className="mt-3">Avaliações reais de clientes reais</h2>
            </div>
            <div className="max-w-md mx-auto">
              <LazySection minHeight="250px">
                <Suspense fallback={<div className="h-[250px] w-full bg-muted animate-pulse" />}>
                  <GoogleBusinessWidget />
                </Suspense>
              </LazySection>
            </div>
          </div>
        </section>

        <LazySection minHeight="150px">
          <Suspense fallback={<div className="h-[150px] w-full bg-muted animate-pulse" />}>
            <AgrishowPromoBanner source="home" variant="full" />
          </Suspense>
        </LazySection>

        <LazySection minHeight="400px">
          <Suspense fallback={<div className="h-[400px] w-full bg-muted animate-pulse" />}>
            <HomeBlogSection />
          </Suspense>
        </LazySection>

        <LazySection minHeight="300px">
          <Suspense fallback={<div className="h-[300px] w-full bg-muted animate-pulse" />}>
            <PortoPartnershipSection />
          </Suspense>
        </LazySection>

        <section className="py-20 md:py-36 gradient-hero relative overflow-hidden" aria-label="Solicitar cotação">
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-4 font-extrabold">Cotação de Seguro em Guarulhos</h2>
            <p className="text-[14px] text-white/70 mb-12 max-w-md mx-auto">
              Gratuita, sem compromisso. Resposta em até 2 horas com propostas comparativas das melhores seguradoras.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/cotacao" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-[13px] px-7 rounded-lg h-11 bg-white text-foreground hover:bg-white/90 font-semibold">
                  Cotação Rápida
                </Button>
              </Link>
              <a href="tel:1151997500" aria-label="Ligar para (11) 5199-7500" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-[13px] px-7 rounded-lg h-11 bg-white/[0.08] border border-white/[0.1] text-white/80 hover:bg-white/[0.12] hover:text-white font-medium">
                  <Phone className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-32 bg-background" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-16">
              <span className="section-label">FAQ</span>
              <h2 id="faq-heading" className="mt-3">Perguntas frequentes</h2>
            </div>
            <div className="divide-y divide-border">
              {faqs.map((faq, i) => (
                <details key={i} className="group py-5" open={i === 0}>
                  <summary className="flex items-center justify-between cursor-pointer text-[14px] font-semibold text-foreground hover:text-primary transition-base select-none list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-muted-foreground/30 ml-4 group-open:rotate-45 transition-transform text-base font-light flex-shrink-0">+</span>
                  </summary>
                   <div className="pt-3 space-y-3">
                     <SmartText
                       text={faq.answer}
                       className="text-[13px] text-muted-foreground leading-relaxed"
                       linkedKeywords={linkedKeywords}
                       maxLinks={1}
                     />
                     {(() => {
                        const related = getRelatedLinks(`${faq.question} ${faq.answer}`, { limit: 1 });
                        if (related.length === 0) return null;
                        return (
                          <div className="pt-2 border-t border-border/40">
                            {related.map((r) => (
                              <Link
                                key={r.href}
                                to={r.href}
                                onClick={() =>
                                 trackInternalLinkClick({
                                   destination: r.href,
                                   source: buildInternalLinkSource("faq-global", "home"),
                                   label: r.label,
                                   placement: "veja-tambem"
                                 })
                                }
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:gap-1.5 transition-all uppercase tracking-wider"
                              >
                                Saiba mais sobre {r.label} <ArrowRight className="h-2.5 w-2.5" aria-hidden="true" />
                              </Link>
                            ))}
                          </div>
                        );
                     })()}
                   </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <LazySection minHeight="200px">
          <Suspense fallback={<div className="h-[200px] w-full bg-muted animate-pulse" />}>
            <InsuranceHubLinks />
          </Suspense>
        </LazySection>
      </main>
      <Footer />
    </>
  );
};

export default Index;
