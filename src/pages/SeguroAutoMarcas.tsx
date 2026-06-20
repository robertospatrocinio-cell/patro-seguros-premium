import { Link } from "react-router-dom";
import { ArrowRight, Crown, Car, MessageCircle, Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import { PREMIUM_BRANDS } from "@/data/premiumBrandsConfig";
import { trackInternalLinkClick, trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const PHONE = "551151997500";
const WA_MSG = "Olá! Quero cotar seguro auto em Guarulhos. Pode me ajudar a comparar seguradoras pela marca do meu carro?";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MSG)}`;

const MARCAS_POPULARES: { name: string; slug: string }[] = [
  { name: "Volkswagen", slug: "seguro-volkswagen-guarulhos" },
  { name: "Chevrolet", slug: "seguro-chevrolet-guarulhos" },
  { name: "Fiat", slug: "seguro-fiat-guarulhos" },
  { name: "Hyundai", slug: "seguro-hyundai-guarulhos" },
  { name: "Toyota", slug: "seguro-auto-toyota-guarulhos" },
  { name: "Honda", slug: "seguro-auto-honda-guarulhos" },
  { name: "Jeep", slug: "seguro-auto-jeep-guarulhos" },
  { name: "Renault", slug: "seguro-auto-renault-guarulhos" },
  { name: "Nissan", slug: "seguro-auto-nissan-guarulhos" },
  { name: "Peugeot", slug: "seguro-auto-peugeot-guarulhos" },
  { name: "Citroën", slug: "seguro-auto-citroen-guarulhos" },
  { name: "Mitsubishi", slug: "seguro-auto-mitsubishi-guarulhos" },
  { name: "Caoa Chery", slug: "seguro-auto-caoa-chery-guarulhos" },
  { name: "Volvo", slug: "seguro-auto-volvo-guarulhos" },
];

const FAQS = [
  {
    question: "A marca do carro influencia muito o preço do seguro em Guarulhos?",
    answer:
      "Sim. Cada seguradora tem afinidade técnica e comercial com determinadas marcas — rede referenciada, custo de peças, índice de roubo histórico e relacionamento com a montadora pesam na composição do prêmio. Em geral marcas com forte rede de concessionárias e peças nacionais tendem a ter prêmio mais competitivo.",
  },
  {
    question: "Marcas premium (BMW, Mercedes, Audi, Porsche) têm seguro inviável?",
    answer:
      "Não — mas exigem cotação especializada. Trabalhamos com seguradoras que aceitam blindagem, reparo em concessionária oficial, carro reserva de mesma categoria e cobertura para acessórios originais. Conforme aceitação da seguradora e perfil do condutor, é totalmente viável proteger um veículo premium com custo proporcional ao valor segurado.",
  },
  {
    question: "Marcas chinesas (BYD, GWM, Chery, Jac) já têm seguro em Guarulhos?",
    answer:
      "Sim. Seguradoras como Porto Seguro, Allianz, HDI e Tokio Marine já operam com BYD, GWM e Caoa Chery. O ponto de atenção é a rede de oficinas autorizadas e a disponibilidade de peças — por isso recomendamos cobertura compreensiva com cláusula de reparo em concessionária oficial enquanto a marca está consolidando rede no Brasil.",
  },
  {
    question: "Posso cotar seguro de marca que não está nesta página?",
    answer:
      "Sim. Cotamos seguro para qualquer marca aceita pelas 16 seguradoras parceiras. Basta enviar marca, modelo, ano e CEP de pernoite pelo WhatsApp (11) 5199-7500 que devolvemos comparativo em até 2 horas úteis.",
  },
  {
    question: "Como a Patro escolhe a melhor seguradora para a minha marca?",
    answer:
      "Cotamos simultaneamente nas 16 seguradoras parceiras e analisamos preço, cobertura, franquia, rede referenciada e histórico de atendimento de sinistros para a marca específica. Apresentamos comparativo lado a lado e ajudamos você a escolher — sem custo e sem compromisso.",
  },
];

const PREMIUM_LIST = Object.values(PREMIUM_BRANDS);

const SeguroAutoMarcas = () => (
  <>
    <PageMeta
      title="Seguro Auto por Marca em Guarulhos — Volkswagen, Toyota, BMW, BYD e mais"
      description="Cotação de seguro auto por marca em Guarulhos: Volkswagen, Chevrolet, Toyota, Honda, BMW, Mercedes, Audi, BYD, GWM e mais. Compare 16 seguradoras com a Patro."
    />
    <FAQSchema faqs={FAQS} />
    <BreadcrumbSchema
      items={[
        { name: "Início", url: "/" },
        { name: "Seguro Auto", url: "/seguro-auto" },
        { name: "Marcas", url: "/seguro-auto/marcas" },
      ]}
    />
    <Header />
    <main className="bg-background">
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumb
          items={[
            { label: "Seguro Auto", href: "/seguro-auto" },
            { label: "Marcas", href: "/seguro-auto/marcas" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <span className="section-label">Hub de Marcas</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Seguro Auto por Marca em Guarulhos
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Cada marca tem uma seguradora com melhor apetite técnico e comercial. Escolha a marca do
            seu veículo e veja a página dedicada com coberturas, exemplos e como cotamos em até 16
            seguradoras. Atendimento humano em Guarulhos e nacional para frotas e veículos premium.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/cotacao?tipo=auto"
              onClick={() => trackCotacaoClick("hub-marcas:hero")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-6 py-3 transition-opacity"
            >
              <Calculator className="h-5 w-5" /> Cotação rápida grátis
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("hub-marcas:hero")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Marcas populares */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Marcas populares</h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Marcas com maior volume de cotação em Guarulhos. Cada página traz coberturas, faixas
              de preço e ressalvas específicas (sujeitas a aceitação da seguradora e perfil do
              cliente).
            </p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {MARCAS_POPULARES.map((m) => (
              <li key={m.slug}>
                <Link
                  to={`/${m.slug}`}
                  onClick={() =>
                    trackInternalLinkClick({
                      source: "hub-marcas",
                      destination: `/${m.slug}`,
                      label: m.name,
                    })
                  }
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-4 hover:border-primary hover:shadow-md transition-all"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <Car className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                    <span className="text-sm font-semibold text-foreground truncate">{m.name}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Premium */}
      <section className="py-14 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6 flex items-start gap-3">
            <Crown className="h-7 w-7 text-amber-500 shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Marcas premium</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Atendimento exclusivo Patro Private para veículos importados, blindados e topo de
                linha. Reparo em concessionária oficial, carro reserva de mesma categoria e
                cobertura para blindagem — conforme condições da apólice.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <li>
              <Link
                to="/seguro-bmw"
                onClick={() =>
                  trackInternalLinkClick({
                    source: "hub-marcas:premium",
                    destination: "/seguro-bmw",
                    label: "BMW",
                  })
                }
                className="group flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-card px-4 py-4 hover:border-amber-500 hover:shadow-md transition-all"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <Crown className="h-5 w-5 text-amber-500 shrink-0" aria-hidden="true" />
                  <span className="text-sm font-semibold text-foreground truncate">BMW</span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              </Link>
            </li>
            {PREMIUM_LIST.map((b) => (
              <li key={b.slug}>
                <Link
                  to={`/seguro/${b.slug}`}
                  onClick={() =>
                    trackInternalLinkClick({
                      source: "hub-marcas:premium",
                      destination: `/seguro/${b.slug}`,
                      label: b.name,
                    })
                  }
                  className="group flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-card px-4 py-4 hover:border-amber-500 hover:shadow-md transition-all"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <Crown className="h-5 w-5 text-amber-500 shrink-0" aria-hidden="true" />
                    <span className="text-sm font-semibold text-foreground truncate">{b.name}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA mid */}
      <section className="py-12 bg-primary/5 border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Não encontrou sua marca?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Cotamos seguro auto para qualquer marca aceita pelas 16 seguradoras parceiras. Mande
            marca, modelo, ano e CEP de pernoite no WhatsApp que devolvemos comparativo em até 2
            horas úteis — sem custo.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("hub-marcas:mid")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> Cotar pelo WhatsApp
            </a>
            <Link
              to="/cotacao?tipo=auto"
              onClick={() => trackCotacaoClick("hub-marcas:mid")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 transition-colors"
            >
              <Calculator className="h-5 w-5" /> Formulário de cotação
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Perguntas frequentes — Seguro auto por marca em Guarulhos
          </h2>
          <dl className="space-y-4" data-speakable="faq">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-xl border border-border bg-card p-5">
                <dt className="font-semibold text-foreground">{f.question}</dt>
                <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Cross-link */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Prefere navegar por modelo do carro?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Veja também o hub completo por modelo (Onix, HB20, Corolla, Civic, T-Cross, Hilux,
            Compass, Strada, Renegade e mais de 40 outros).
          </p>
          <Link
            to="/seguro-auto/modelos"
            onClick={() =>
              trackInternalLinkClick({
                source: "hub-marcas",
                destination: "/seguro-auto/modelos",
                label: "Hub de modelos",
              })
            }
            className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Ver hub de modelos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    <StickyQuoteBar
      source="hub-marcas-guarulhos"
      quoteHref="/cotacao?tipo=auto"
      whatsappMessage={WA_MSG}
      ctaLabel="Cotação rápida"
    />
  </>
);

export default SeguroAutoMarcas;