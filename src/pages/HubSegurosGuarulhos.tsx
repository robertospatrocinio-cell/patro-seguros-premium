import { Link } from "react-router-dom";
import { Car, Home, Heart, Building2, Shield, Tractor, Briefcase, Phone, MessageCircle, ArrowRight, MapPin, CheckCircle, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import WebSiteSchema from "@/components/WebSiteSchema";
import AggregateRatingSchema from "@/components/AggregateRatingSchema";
import { Button } from "@/components/ui/button";
import { getCanonicalUrl } from "@/lib/canonical";
import SeloMelhorCorretora from "@/components/SeloMelhorCorretora";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o.";

interface SectionLink { label: string; href: string; description?: string }
interface Section { id: string; title: string; intro: string; icon: React.ReactNode; links: SectionLink[] }

const SECTIONS: Section[] = [
  {
    id: "auto",
    title: "Seguro Auto e Veículos",
    icon: <Car className="h-6 w-6" />,
    intro: "Guarulhos tem alto índice de furto/roubo de veículos, especialmente nas regiões de Cumbica, Bonsucesso e ao longo da Dutra. Proteja seu carro, moto ou caminhão com as melhores seguradoras do mercado.",
    links: [
      { label: "Seguro Auto em Guarulhos", href: "/seguro-auto-guarulhos", description: "Cotação local com Porto, Tokio, HDI e mais" },
      { label: "Seguro Moto em Guarulhos", href: "/seguro-moto-guarulhos", description: "Proteção contra roubo e furto em vias de risco" },
      { label: "Seguro de Frota Empresarial", href: "/seguro-frota-empresas-guarulhos", description: "Para empresas de Guarulhos com 5+ veículos" },
      { label: "Seguro Caminhão", href: "/seguro-caminhao" },
      { label: "Seguro Motorista de App", href: "/seguro-motorista-app" },
    ],
  },
  {
    id: "residencial",
    title: "Seguro Residencial e Condomínio",
    icon: <Home className="h-6 w-6" />,
    intro: "Cobertura para casas, apartamentos e condomínios em Guarulhos — incêndio, roubo, danos elétricos, vendaval e responsabilidade civil familiar.",
    links: [
      { label: "Seguro Residencial em Guarulhos", href: "/seguro-residencial-guarulhos", description: "Casas e apartamentos em todos os bairros" },
      { label: "Seguro Condomínio em Guarulhos", href: "/seguro-condominio-guarulhos", description: "Áreas comuns + RC do síndico" },
      { label: "Seguros no Shopping/Cidade Maia", href: "/seguros-shopping-maia-cidade-maia-guarulhos", description: "Especializado para a região nobre" },
      { label: "Seguro Fiança Locatícia", href: "/seguro-fianca-locaticia" },
      { label: "Seguro Placa Solar", href: "/seguro-placa-solar" },
    ],
  },
  {
    id: "vida-saude",
    title: "Vida, Saúde e Bem-estar",
    icon: <Heart className="h-6 w-6" />,
    intro: "Acesso aos principais hospitais de Guarulhos e região metropolitana. Trabalhamos com 20+ operadoras de saúde para encontrar o melhor custo-benefício.",
    links: [
      { label: "Plano de Saúde em Guarulhos", href: "/plano-saude-guarulhos", description: "Hapvida, Bradesco, SulAmérica, Amil e mais" },
      { label: "Seguro de Vida e Saúde Guarulhos", href: "/seguro-vida-saude-guarulhos" },
      { label: "Seguro de Vida", href: "/seguro-vida" },
      { label: "Plano de Saúde Empresarial", href: "/plano-saude-empresarial" },
      { label: "Seguro Odontológico", href: "/seguro-odonto" },
      { label: "Plano Pet", href: "/plano-pet" },
    ],
  },
  {
    id: "empresarial",
    title: "Seguros Empresariais",
    icon: <Building2 className="h-6 w-6" />,
    intro: "Guarulhos é um polo industrial e logístico — protegemos comércios, indústrias, galpões e prestadores de serviços com soluções sob medida.",
    links: [
      { label: "Seguro Empresarial em Guarulhos", href: "/seguro-empresarial-guarulhos", description: "Comércios, escritórios e prestadores" },
      { label: "Seguros PME em Guarulhos", href: "/seguros-empresariais-pme-guarulhos", description: "Pacotes para pequenas e médias empresas" },
      { label: "Seguro de Galpões Industriais", href: "/seguro-galpoes-industriais" },
      { label: "Seguro Lojas em Shopping", href: "/seguro-lojas-shopping" },
      { label: "Seguro de Máquinas Industriais", href: "/seguro-maquinas-industriais" },
      { label: "Seguro Cyber para Empresas", href: "/seguro-cyber" },
      { label: "Seguro Garantia", href: "/seguro-garantia" },
    ],
  },
  {
    id: "rc",
    title: "Responsabilidade Civil (RC)",
    icon: <Shield className="h-6 w-6" />,
    intro: "Especialidade Patro: protegemos profissionais liberais e empresas de Guarulhos contra processos por erro, omissão ou danos a terceiros.",
    links: [
      { label: "RC Médicos e Clínicas", href: "/seguro-rc-medicos" },
      { label: "RC Dentistas", href: "/seguro-rc-dentistas" },
      { label: "RC Advogados", href: "/seguro-rc-advogados" },
      { label: "RC Engenheiros", href: "/seguro-rc-engenheiros" },
      { label: "RC Veterinários", href: "/seguro-rc-veterinarios" },
      { label: "RC Executivos (D&O)", href: "/seguro-rc-executivos" },
      { label: "RC Obras", href: "/seguro-rc-obras" },
      { label: "RC Eventos", href: "/seguro-rc-eventos" },
    ],
  },
  {
    id: "agro",
    title: "Agro e Rural (Atendemos todo Brasil)",
    icon: <Tractor className="h-6 w-6" />,
    intro: "Embora sediados em Guarulhos, atendemos produtores rurais em todo o Brasil. Especialistas em seguros agrícolas, pecuários e de máquinas.",
    links: [
      { label: "Seguro Rural", href: "/seguro-rural" },
      { label: "Seguro Pecuário", href: "/seguro-pecuario" },
      { label: "Seguro de Máquinas Agrícolas", href: "/seguro-maquinas-agricolas" },
      { label: "Seguro Drone Agrícola", href: "/seguro-drone-agricola" },
      { label: "Seguro de Café", href: "/seguro-cafe" },
      { label: "Seguro Geada", href: "/seguro-geada" },
    ],
  },
  {
    id: "consorcio",
    title: "Consórcio e Investimentos",
    icon: <Briefcase className="h-6 w-6" />,
    intro: "Alternativa ao financiamento para conquistar bens e planejar o futuro com inteligência financeira.",
    links: [
      { label: "Consórcio de Carro", href: "/consorcio-carro" },
      { label: "Consórcio de Imóveis", href: "/consorcio-imoveis" },
      { label: "Consórcio Veículos Pesados", href: "/consorcio-veiculos-pesados" },
      { label: "Previdência Privada", href: "/previdencia-privada" },
      { label: "Planejamento Patrimonial", href: "/planejamento-patrimonial" },
    ],
  },
];

const FAQS = [
  { question: "Por que contratar seguro com uma corretora local em Guarulhos?", answer: "Uma corretora local entende os riscos específicos da região (índices de roubo por bairro, perfil de trânsito, hospitais credenciados, etc.) e oferece atendimento presencial em caso de sinistro. A Patro Seguros atende Guarulhos há mais de 30 anos." },
  { question: "Quais seguradoras a Patro representa em Guarulhos?", answer: "Trabalhamos com 16+ seguradoras (Porto Seguro, Bradesco, Tokio Marine, HDI, Liberty, Sompo, Mapfre, Allianz, SulAmérica, Itaú, entre outras) e 20+ operadoras de saúde. Comparamos opções para você." },
  { question: "Atendem em todos os bairros de Guarulhos?", answer: "Sim. Atendemos do Centro, Maia, Vila Galvão, Cumbica, Bonsucesso, Picanço, Macedo, Gopouva, Continental, Paraventi e demais bairros. Nosso escritório fica na Cidade Maia." },
  { question: "Em quanto tempo recebo a cotação?", answer: "Em até 2 horas úteis enviamos o comparativo das melhores opções por WhatsApp ou e-mail. Para casos mais complexos (frota, RC profissional, agro), o prazo pode chegar a 24h." },
  { question: "A Patro atende empresas de Guarulhos?", answer: "Sim — temos mais de 500 empresas atendidas em Guarulhos e região, com pacotes para indústrias, comércios, prestadores de serviços, condomínios e PMEs." },
  { question: "Posso resolver tudo online ou preciso ir até o escritório?", answer: "Tudo pode ser feito online (WhatsApp, e-mail, formulário). Mas se preferir atendimento presencial, nosso escritório fica na Av. Salgado Filho 2120 (Cidade Maia, Guarulhos/SP)." },
];

const HubSegurosGuarulhos = () => {
  const canonicalUrl = getCanonicalUrl("/seguros-em-guarulhos");

  return (
    <>
      <PageMeta
         title="Guia Completo de Seguros em Guarulhos 2026 | Patro Seguros"
         description="A autoridade máxima em seguros em Guarulhos. Guia completo sobre seguro auto, residencial, vida, empresarial e agrícola. Compare 16+ seguradoras locais."
      />
      <FAQSchema faqs={FAQS} />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebSiteSchema />
      <AggregateRatingSchema
        serviceName="Seguros em Guarulhos"
        url={canonicalUrl}
        description="Corretora de seguros em Guarulhos com 16+ seguradoras parceiras."
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={[{ label: "Seguros em Guarulhos" }]} />

        {/* Hero */}
        <section className="relative gradient-hero overflow-hidden" aria-label="Seguros em Guarulhos">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(215,100%,60%,0.12),transparent)]" />
          <div className="container mx-auto px-4 relative">
            <div className="py-20 md:py-28 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-white/70 text-xs mb-6">
                <MapPin className="h-3.5 w-3.5" /> Cidade Maia, Guarulhos/SP
              </div>
               <h1 className="text-white text-balance mb-5">Guia Completo de Seguros em Guarulhos — A Sua Referência Local</h1>
               <p className="text-base md:text-lg text-white/60 mb-10 max-w-2xl mx-auto">
                 Da proteção do seu carro na Dutra à blindagem estratégica de galpões em Cumbica. Entenda por que a Patro é a autoridade máxima em seguros na região.
               </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/cotacao" onClick={() => trackCotacaoClick("hub-guarulhos:hero", { origin: "hub-guarulhos" })}>
                  <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold">
                    Cotar meu seguro agora
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub-guarulhos:hero", { origin: "hub-guarulhos" })}>
                  <Button size="lg" className="rounded-xl h-12 px-8 text-sm bg-white/[0.06] border border-white/10 text-white/70 hover:bg-white/[0.12]">
                    <MessageCircle className="mr-2 h-4 w-4" /> Falar com especialista no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick nav */}
        <nav className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border" aria-label="Navegação por categoria">
          <div className="container mx-auto px-4">
            <ul className="flex gap-2 md:gap-4 overflow-x-auto py-3 list-none scrollbar-hide">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 whitespace-nowrap transition-colors">
                    {s.title.split(" e ")[0].split("(")[0].trim()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Sections */}
        <div className="container mx-auto px-4 max-w-5xl py-16 space-y-16">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {section.icon}
                </div>
                <h2 id={`${section.id}-heading`} className="text-2xl md:text-3xl">{section.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">{section.intro}</p>
              <ul className="grid sm:grid-cols-2 gap-3 list-none">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="group block premium-card p-5 hover:border-primary/30 transition-base">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">{link.label}</p>
                          {link.description && (
                            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{link.description}</p>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Bairros card */}
        <section className="py-16 bg-primary/[0.03] border-y border-border" aria-labelledby="bairros-heading">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <MapPin className="h-7 w-7 text-primary mx-auto mb-3" />
            <h2 id="bairros-heading" className="mb-3">Atendimento em todos os bairros de Guarulhos</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Jardim Maia, Vila Augusta, Cumbica, Centro, Picanço, Macedo, Gopouva, Bonsucesso, Paraventi, Continental e mais.
            </p>
            <Link to="/seguros-guarulhos">
              <Button variant="outline" className="rounded-xl">
                Ver páginas por bairro <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Por que Patro */}
        <section className="py-20" aria-labelledby="por-que-patro-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <SeloMelhorCorretora size="md" />
              <h2 id="por-que-patro-heading" className="mt-6">Por que escolher a Patro Seguros em Guarulhos?</h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-4 list-none">
              {[
                "30+ anos de experiência exclusiva em Guarulhos e região",
                "16+ seguradoras parceiras + 20 operadoras de saúde",
                "Atendimento presencial na Cidade Maia",
                "Cotação em até 2 horas úteis",
                "500+ empresas atendidas em Guarulhos",
                "Especialistas em RC profissional e agronegócio",
                "Suporte completo em sinistros — você não fica sozinho",
                "Avaliação 4.9 estrelas no Google (150+ reviews)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-card rounded-xl p-5 border">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-background" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <span className="section-label">FAQ</span>
              <h2 id="faq-heading" className="mt-3">Perguntas Frequentes — Seguros em Guarulhos</h2>
            </div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <details key={i} className="premium-card group" open={i === 0}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-[15px] font-semibold hover:text-primary transition-base list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-primary/40 ml-4 group-open:rotate-45 transition-transform text-lg font-light">+</span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 gradient-hero relative overflow-hidden" aria-label="Cotação final">
          <div className="container mx-auto px-4 text-center relative">
            <Award className="h-8 w-8 text-yellow-300 mx-auto mb-4" />
            <h2 className="text-white mb-4">Pronto para proteger o que importa?</h2>
            <p className="text-white/60 mb-10 max-w-lg mx-auto">Resposta em até 2 horas com as melhores opções para você ou sua empresa em Guarulhos.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/cotacao" onClick={() => trackCotacaoClick("hub-guarulhos:final", { origin: "hub-guarulhos" })}>
                <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold">
                  Cotar agora
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub-guarulhos:final", { origin: "hub-guarulhos" })}>
                <Button size="lg" variant="cta" className="rounded-xl h-12 px-8 text-sm">
                  <MessageCircle className="mr-2 h-4 w-4" /> Falar com especialista no WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky bottom CTA (desktop + mobile) */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-40 flex flex-col sm:flex-row gap-2 max-w-md md:max-w-none mx-auto md:mx-0 pointer-events-none">
        <Link
          to="/cotacao"
          onClick={() => trackCotacaoClick("hub-guarulhos:sticky", { origin: "hub-guarulhos" })}
          className="pointer-events-auto flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-3 text-sm font-semibold shadow-xl shadow-primary/30"
        >
          Cotar agora <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("hub-guarulhos:sticky", { origin: "hub-guarulhos" })}
          className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full bg-green-600 hover:bg-green-700 text-white px-5 py-3 text-sm font-semibold shadow-xl shadow-green-600/30"
          aria-label="WhatsApp Patro Seguros"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="sm:inline">WhatsApp</span>
        </a>
      </div>

      <Footer />
    </>
  );
};

export default HubSegurosGuarulhos;
