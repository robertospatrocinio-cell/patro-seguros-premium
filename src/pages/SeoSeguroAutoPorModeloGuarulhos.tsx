import { Link } from "react-router-dom";
import { Car, ArrowRight, MessageCircle, Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import FAQSchema from "@/components/FAQSchema";
import { MODELO_LIST } from "@/data/seoModelosAutoPages";
import { trackInternalLinkClick, trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const PHONE = "551151997500";
const WA_MSG = "Olá! Quero cotar seguro auto em Guarulhos. Pode me ajudar a comparar seguradoras pelo modelo do meu carro?";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MSG)}`;

const CATEGORIAS: Record<string, { label: string; description: string }> = {
  popular: { label: "Populares & Compactos", description: "Modelos de entrada com seguro mais acessível em Guarulhos." },
  sedan: { label: "Sedãs", description: "Sedãs médios com alta liquidez e procura no mercado de seguros." },
  suv: { label: "SUVs & Crossovers", description: "Veículos com perfil de risco específico — coberturas reforçadas." },
  premium: { label: "Premium & Pickups", description: "Modelos de maior valor FIPE — exige rastreamento e oficinas referenciadas." },
};

const FAQS = [
  {
    question: "Por que o modelo do carro influencia tanto o preço do seguro em Guarulhos?",
    answer:
      "Cada modelo possui um índice de roubo, custo de reparo e disponibilidade de peças diferente. Em Guarulhos, modelos como Onix, HB20 e Corolla figuram entre os mais visados em CEPs como Cumbica, Pimentas e Bonsucesso, o que eleva o prêmio. Já SUVs com baixa sinistralidade e pickups com rastreador obrigatório podem ter prêmios mais favoráveis.",
  },
  {
    question: "Como escolher a melhor seguradora pelo modelo do meu carro?",
    answer:
      "Cada seguradora tem 'apetite' por perfis específicos: a Toyota tem rede forte com Porto Seguro, a Honda com Allianz e Bradesco, a Hyundai com Tokio Marine. A Patro Seguros consulta as 8 principais seguradoras e indica a que oferece o melhor custo-benefício para o seu modelo, ano e CEP em Guarulhos.",
  },
  {
    question: "Modelos populares têm seguro mais barato em Guarulhos?",
    answer:
      "Nem sempre. Apesar do menor valor FIPE, modelos como Onix, HB20 e Mobi têm altíssima procura por quadrilhas em Guarulhos. Em alguns casos, um SUV intermediário pode ter prêmio percentual menor sobre o valor do veículo. Por isso a comparação caso a caso é essencial.",
  },
  {
    question: "Existe seguro específico para carro de aplicativo (Uber/99) em Guarulhos?",
    answer:
      "Sim. O uso profissional precisa estar declarado na apólice, caso contrário a seguradora pode negar o sinistro. A Patro trabalha com seguradoras que aceitam motoristas de aplicativo em Guarulhos para modelos como Onix, HB20, Corolla, Civic e similares — geralmente com adicional de 10% a 25% sobre o prêmio base.",
  },
  {
    question: "Vale a pena instalar rastreador no meu modelo?",
    answer:
      "Para modelos visados em Guarulhos (Corolla, Civic, HB20, Onix, T-Cross, Renegade, Hilux), o rastreador pode reduzir o prêmio entre 10% e 25%. Em alguns modelos premium ele é obrigatório para aceitação do risco em CEPs de Cumbica e Pimentas.",
  },
];

const grouped = MODELO_LIST.reduce<Record<string, typeof MODELO_LIST>>((acc, m) => {
  (acc[m.categoria] ||= []).push(m);
  return acc;
}, {});

const SeoSeguroAutoPorModeloGuarulhos = () => (
  <>
    <PageMeta
      title="Seguro Auto por Modelo em Guarulhos — Cotação por Carro 2026"
      description="Cotação de seguro auto por modelo em Guarulhos: Corolla, Civic, HB20, Onix, T-Cross, Compass, Hilux, Strada, Renegade e Mobi. Compare seguradoras."
    />
    <FAQSchema faqs={FAQS} />
    <Header />
    <main className="bg-background">
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumb
          items={[
            { label: "Seguros em Guarulhos", href: "/seguros-guarulhos" },
            { label: "Seguro Auto Guarulhos", href: "/seguro-auto-guarulhos" },
            { label: "Por Modelo", href: "/seguro-auto-por-modelo-guarulhos" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <span className="section-label">Hub de Modelos</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Seguro Auto por Modelo em Guarulhos
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Cada carro tem um perfil de risco e uma seguradora ideal. Selecione o modelo do seu veículo
            abaixo e veja faixa de preço, melhores seguradoras e dicas específicas para circular em
            Guarulhos, Cumbica e região.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/cotacao?tipo=auto"
              onClick={() => trackCotacaoClick("hub-modelos:hero")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-6 py-3 transition-opacity"
            >
              <Calculator className="h-5 w-5" /> Cotação rápida grátis
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("hub-modelos:hero")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Lista por categoria */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          {Object.entries(grouped).map(([cat, models]) => {
            const meta = CATEGORIAS[cat];
            return (
              <div key={cat}>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">{meta?.label ?? cat}</h2>
                  {meta?.description && (
                    <p className="mt-2 text-sm md:text-base text-muted-foreground">{meta.description}</p>
                  )}
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {models.map((m) => (
                    <li key={m.slug}>
                      <Link
                        to={`/${m.slug}`}
                        onClick={() =>
                          trackInternalLinkClick({
                            source: "hub-modelos-guarulhos",
                            destination: `/${m.slug}`,
                            label: m.modelo,
                          })
                        }
                        className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-4 hover:border-primary hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Car className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              Seguro {m.modelo} em Guarulhos
                            </p>
                            <p className="text-xs text-muted-foreground truncate">{m.priceRange}</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA mid */}
      <section className="py-12 bg-primary/5 border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Não encontrou seu modelo?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Cotamos seguro para qualquer marca/modelo em Guarulhos — Volkswagen, Fiat, Chevrolet,
            Hyundai, Toyota, Honda, Jeep, Renault, Nissan, BMW, Mercedes-Benz, Audi e mais. Envie a
            placa ou modelo no WhatsApp.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("hub-modelos:mid")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> Cotar pelo WhatsApp
            </a>
            <Link
              to="/cotacao?tipo=auto"
              onClick={() => trackCotacaoClick("hub-modelos:mid")}
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
            Perguntas frequentes — Seguro auto por modelo em Guarulhos
          </h2>
          <dl className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-xl border border-border bg-card p-5">
                <dt className="font-semibold text-foreground">{f.question}</dt>
                <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Bairros relacionados */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Procurando por bairro?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Veja também a página principal por região:
          </p>
          <Link
            to="/seguro-auto-guarulhos"
            onClick={() =>
              trackInternalLinkClick({
                source: "hub-modelos-guarulhos",
                destination: "/seguro-auto-guarulhos",
                label: "Seguro Auto Guarulhos",
              })
            }
            className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Seguro Auto Guarulhos — hub de bairros <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    <StickyQuoteBar
      source="hub-modelos-guarulhos"
      quoteHref="/cotacao?tipo=auto"
      whatsappMessage={WA_MSG}
      ctaLabel="Cotação rápida"
    />
  </>
);

export default SeoSeguroAutoPorModeloGuarulhos;