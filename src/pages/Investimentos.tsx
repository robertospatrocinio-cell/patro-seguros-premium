import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Landmark, Target, MessageCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trackWhatsAppClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20quero%20uma%20consultoria%20de%20planejamento%20patrimonial%20com%20a%20Patro%20Seguros.";

const pilares = [
  {
    icon: TrendingUp,
    title: "Alavancagem Inteligente",
    description: "Cons\u00f3rcio como ativo real sem juros: voc\u00ea constr\u00f3i patrim\u00f4nio enquanto preserva caixa de giro e capacidade de cr\u00e9dito.",
    href: "/consorcio",
    cta: "Conhecer cons\u00f3rcio",
  },
  {
    icon: Landmark,
    title: "Acumula\u00e7\u00e3o & Sucess\u00e3o",
    description: "Previd\u00eancia privada (VGBL/PGBL) com benef\u00edcio fiscal, portabilidade e transmiss\u00e3o direta sem invent\u00e1rio.",
    href: "/previdencia-privada",
    cta: "Ver previd\u00eancia",
  },
  {
    icon: Shield,
    title: "Blindagem Patrimonial",
    description: "Seguros estruturantes (D&O, RC Executivos, Vida Resgat\u00e1vel, Patrimonial) que protegem o patrim\u00f4nio j\u00e1 conquistado.",
    href: "/seguro-vida",
    cta: "Ver prote\u00e7\u00e3o",
  },
];

const artigos = [
  {
    slug: "consorcio-ou-financiamento-2026",
    pergunta: "Cons\u00f3rcio ou financiamento: qual o melhor para 2026?",
    leitura: "3 min",
    resumo:
      "Com Selic em patamar elevado e cr\u00e9dito imobili\u00e1rio bancando juros pr\u00f3ximos de 12% a.a., o cons\u00f3rcio voltou a ser a alternativa matem\u00e1ticamente superior para quem tem horizonte acima de 24 meses.",
    bullets: [
      "Financiamento de R$ 500 mil em 240 meses pode custar R$ 1,3 milh\u00e3o; cons\u00f3rcio equivalente fica entre R$ 580 mil e R$ 620 mil.",
      "Quem n\u00e3o precisa do bem AGORA, paga at\u00e9 60% menos optando pelo cons\u00f3rcio.",
      "Quem precisa do bem em menos de 12 meses e tem 30% de entrada deve avaliar financiamento curto + amortiza\u00e7\u00e3o agressiva.",
    ],
    veredito: "Para qualquer compra programada, cons\u00f3rcio vence em 2026. Para urg\u00eancia real e sem caixa, financiamento curto pode fazer sentido.",
    relacionado: { label: "Leia o guia completo no blog", href: "/blog/vantagens-do-consorcio-guia-completo" },
  },
  {
    slug: "vgbl-ou-pgbl-2026",
    pergunta: "VGBL ou PGBL: qual escolher conforme sua declara\u00e7\u00e3o de IR?",
    leitura: "2 min",
    resumo:
      "A escolha n\u00e3o \u00e9 sobre rentabilidade — \u00e9 sobre tributa\u00e7\u00e3o. Errar entre VGBL e PGBL pode custar 27,5% sobre o patrim\u00f4nio acumulado.",
    bullets: [
      "PGBL: ideal para quem declara IR completo e contribui para o INSS. Permite deduzir at\u00e9 12% da renda bruta tribut\u00e1vel.",
      "VGBL: ideal para autonomos, MEIs, isentos ou quem j\u00e1 deduz 12% no PGBL. Tributa\u00e7\u00e3o incide apenas sobre o rendimento.",
      "Tabela regressiva (10% ap\u00f3s 10 anos) \u00e9 quase sempre a melhor escolha para horizonte longo.",
    ],
    veredito: "Declarou completo no \u00faltimo IR e contribui pro INSS? PGBL. Caso contr\u00e1rio, VGBL.",
    relacionado: { label: "Saiba mais sobre Previd\u00eancia Privada", href: "/previdencia-privada" },
  },
  {
    slug: "imovel-quitado-blindagem",
    pergunta: "Tenho um im\u00f3vel quitado. Vale a pena 'blindar' meu patrim\u00f4nio?",
    leitura: "3 min",
    resumo:
      "Im\u00f3vel quitado \u00e9 ativo exposto: incurso em a\u00e7\u00f5es trabalhistas, civis e comerciais. Blindagem patrimonial via seguros e estruturas legais reduz risco sem comprometer liquidez.",
    bullets: [
      "Empres\u00e1rios e profissionais liberais s\u00e3o os maiores expostos — RC Profissional e D&O cobrem o que a holding n\u00e3o cobre.",
      "Seguro de Vida Resgat\u00e1vel funciona como reserva financeira protegida de penhora (com limites legais).",
      "Para fam\u00edlias, holding patrimonial + previd\u00eancia + seguros formam o trip\u00e9 cl\u00e1ssico de planejamento sucess\u00f3rio.",
    ],
    veredito: "Quem possui mais de R$ 1 milh\u00e3o em ativos n\u00e3o pode ignorar blindagem. Custo m\u00e9dio: 0,3% a 0,8% do patrim\u00f4nio ao ano.",
    relacionado: { label: "Conhe\u00e7a Seguro de Vida Resgat\u00e1vel", href: "/seguro-vida" },
  },
  {
    slug: "fgts-render-mais-imovel",
    pergunta: "Meu FGTS rende menos que a infla\u00e7\u00e3o. Como us\u00e1-lo de forma inteligente?",
    leitura: "2 min",
    resumo:
      "FGTS rende TR + 3% a.a. — menos que poupan\u00e7a. Usar para lance em cons\u00f3rcio de im\u00f3veis multiplica esse poder de compra em 3x a 5x.",
    bullets: [
      "FGTS pode ser usado como lance, complementa\u00e7\u00e3o de lance ou amortiza\u00e7\u00e3o em cons\u00f3rcio imobili\u00e1rio.",
      "Sai do baixo rendimento e vira parte de um ativo real (im\u00f3vel) que valoriza acima da infla\u00e7\u00e3o no longo prazo.",
      "Estrat\u00e9gia funciona mesmo para quem ainda n\u00e3o foi contemplado — o FGTS acelera a contempla\u00e7\u00e3o.",
    ],
    veredito: "Se voc\u00ea tem FGTS parado e horizonte de 5+ anos, cons\u00f3rcio imobili\u00e1rio \u00e9 a forma mais eficiente de transformar saldo em patrim\u00f4nio.",
    relacionado: { label: "Simular Cons\u00f3rcio de Im\u00f3veis", href: "/consorcio-imoveis" },
  },
  {
    slug: "previdencia-vs-tesouro-2026",
    pergunta: "Previd\u00eancia privada perde para Tesouro Direto? Depende.",
    leitura: "3 min",
    resumo:
      "Quando comparada apenas pela rentabilidade bruta, previd\u00eancia parece perder. Mas o c\u00e1lculo certo inclui IR, sucess\u00e3o, port\u00e1bilidade e disciplina de aporte.",
    bullets: [
      "Tesouro IPCA+ 2045 rende infla\u00e7\u00e3o + ~6% a.a. — excelente para quem tem disciplina de manter at\u00e9 o vencimento.",
      "Previd\u00eancia VGBL/PGBL com tabela regressiva paga apenas 10% de IR ap\u00f3s 10 anos (vs 15% do Tesouro).",
      "Previd\u00eancia transmite direto aos benefici\u00e1rios sem invent\u00e1rio — economia de 4% a 8% em ITCMD e custas.",
    ],
    veredito: "Investidor disciplinado e sem preocupa\u00e7\u00e3o sucess\u00f3ria: Tesouro. Para sucess\u00e3o, prote\u00e7\u00e3o e disciplina automatizada: previd\u00eancia.",
    relacionado: { label: "Conhecer Previd\u00eancia Privada", href: "/previdencia-privada" },
  },
  {
    slug: "seguro-vida-investimento",
    pergunta: "Seguro de vida pode ser considerado um investimento?",
    leitura: "2 min",
    resumo:
      "Sim, na modalidade resgat\u00e1vel. Funciona como reserva de longo prazo com prote\u00e7\u00e3o embutida e tratamento sucess\u00f3rio diferenciado.",
    bullets: [
      "Seguro de vida com cobertura por sobreviv\u00eancia: parte do pr\u00eamio acumula como reserva resgat\u00e1vel.",
      "Indeniza\u00e7\u00e3o por morte n\u00e3o entra em invent\u00e1rio e \u00e9 isenta de IR para benefici\u00e1rios diretos.",
      "Funciona como hedge de patrim\u00f4nio para fam\u00edlias com filhos pequenos ou d\u00edvidas relevantes.",
    ],
    veredito: "N\u00e3o substitui investimento financeiro, mas \u00e9 componente essencial de planejamento patrimonial completo.",
    relacionado: { label: "Ver Seguro de Vida", href: "/seguro-vida" },
  },
];

const faqs = artigos.map(a => ({
  question: a.pergunta,
  answer: `${a.resumo} ${a.veredito}`,
}));

const Investimentos = () => (
  <>
    <PageMeta
      title="Investimentos e Planejamento Patrimonial — Patro Seguros Guarulhos"
      description="Estrat\u00e9gia financeira para constru\u00e7\u00e3o, prote\u00e7\u00e3o e sucess\u00e3o de patrim\u00f4nio: cons\u00f3rcio, previd\u00eancia privada e seguros estruturantes. Consultoria gratuita em Guarulhos."
    />
    <FAQSchema faqs={faqs} />
    <Header />
    <main id="main-content">
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground text-white">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0%, transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--accent, 200 80% 50%)) 0%, transparent 40%)",
        }} />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <Breadcrumb items={[{ label: "In\u00edcio", href: "/" }, { label: "Investimentos" }]} />
          <div className="max-w-3xl mt-6">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-heading font-semibold text-primary/90 bg-primary/10 px-3 py-1.5 rounded-full">
              <Target className="h-3 w-3" /> Planejamento Patrimonial
            </span>
            <h1 className="mt-5 text-white text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] tracking-tight">
              Construir, proteger e perpetuar patrim\u00f4nio.
            </h1>
            <p className="mt-6 text-[15px] md:text-[17px] text-white/70 leading-relaxed max-w-2xl">
              Vamos al\u00e9m da ap\u00f3lice. Atuamos como consultores de estrat\u00e9gia financeira, integrando <strong className="text-white">cons\u00f3rcio</strong> como ferramenta de alavancagem sem juros, <strong className="text-white">previd\u00eancia privada</strong> como acumula\u00e7\u00e3o eficiente e <strong className="text-white">seguros estruturantes</strong> como blindagem do que voc\u00ea j\u00e1 conquistou.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("investimentos-hero")}
              >
                <Button size="lg" className="rounded-xl text-[14px] h-12 px-6">
                  <MessageCircle className="mr-2 h-4 w-4" /> Agendar consultoria gratuita
                </Button>
              </a>
              <a href="#duvidas-comuns">
                <Button size="lg" variant="outline" className="rounded-xl text-[14px] h-12 px-6 bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
                  Ler an\u00e1lises r\u00e1pidas <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="section-label">Os tr\u00eas pilares</span>
            <h2 className="mt-3">Estrat\u00e9gia integrada, n\u00e3o produtos isolados</h2>
            <p className="text-[14px] text-muted-foreground mt-4">
              Patrim\u00f4nio bem constru\u00eddo combina trajet\u00f3ria de aquisi\u00e7\u00e3o, motor de acumula\u00e7\u00e3o e camada de prote\u00e7\u00e3o. Tratar cada pe\u00e7a separadamente \u00e9 a forma mais cara de planejar.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {pilares.map(p => (
              <Card key={p.title} className="group border-border/60 hover:border-primary/40 hover:shadow-lg transition-base h-full">
                <CardContent className="pt-6 pb-7 px-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-base">
                    <p.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-[17px] font-heading font-semibold tracking-tight mb-2.5">{p.title}</h3>
                  <p className="text-[13.5px] text-muted-foreground leading-relaxed mb-5">{p.description}</p>
                  <Link to={p.href} className="inline-flex items-center text-[13px] font-semibold text-primary hover:underline">
                    {p.cta} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* D\u00favidas comuns — artigos curtos */}
      <section id="duvidas-comuns" className="py-20 md:py-28 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="section-label">An\u00e1lises r\u00e1pidas</span>
            <h2 className="mt-3">D\u00favidas comuns, respondidas com posicionamento claro</h2>
            <p className="text-[14px] text-muted-foreground mt-4">
              Cada decis\u00e3o patrimonial tem uma matem\u00e1tica por tr\u00e1s. Aqui, condensamos as discuss\u00f5es que mais aparecem na consultoria — com o veredito final, n\u00e3o com "depende".
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-5">
            {artigos.map((a, i) => (
              <article
                key={a.slug}
                id={a.slug}
                className="group bg-background border border-border/60 hover:border-primary/40 hover:shadow-lg rounded-2xl p-6 md:p-8 transition-base"
              >
                <header className="flex items-start gap-4 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-heading font-bold text-[13px]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[18px] md:text-[20px] font-heading font-semibold tracking-tight leading-snug">
                      {a.pergunta}
                    </h3>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1.5">An\u00e1lise r\u00e1pida · {a.leitura} de leitura</p>
                  </div>
                </header>

                <p className="text-[14px] text-muted-foreground leading-relaxed mb-5">{a.resumo}</p>

                <ul className="space-y-2.5 mb-5">
                  {a.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[13.5px] text-foreground/90 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-primary/5 border-l-2 border-primary rounded-r-lg p-4 mb-5">
                  <p className="text-[11px] uppercase tracking-wider font-heading font-semibold text-primary mb-1.5">
                    <AlertTriangle className="inline h-3 w-3 mr-1" /> Veredito Patro
                  </p>
                  <p className="text-[13.5px] text-foreground/90 leading-relaxed">{a.veredito}</p>
                </div>

                <Link
                  to={a.relacionado.href}
                  className="inline-flex items-center text-[13px] font-semibold text-primary hover:underline"
                >
                  {a.relacionado.label} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 md:py-24 bg-foreground text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-white mb-5">Quer uma leitura sob medida do seu cen\u00e1rio?</h2>
          <p className="text-[15px] text-white/70 leading-relaxed mb-8 max-w-xl mx-auto">
            Em 30 minutos, mapeamos seus objetivos, ativos atuais e exposi\u00e7\u00f5es. Voc\u00ea sai com um plano claro — sem custo, sem compromisso.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("investimentos-cta-final")}
          >
            <Button size="lg" className="rounded-xl text-[14px] h-12 px-7">
              <MessageCircle className="mr-2 h-4 w-4" /> Agendar consultoria gratuita
            </Button>
          </a>
          <p className="text-[12px] text-white/50 mt-5">
            Atendimento humanizado em Cidade Maia, Guarulhos/SP · (11) 5199-7500
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Investimentos;