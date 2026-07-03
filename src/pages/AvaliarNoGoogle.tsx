import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import HowToSchema from "@/components/HowToSchema";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import { trackInternalLinkClick, trackWhatsAppClick } from "@/lib/tracking";

const REVIEW_URL = "https://g.page/r/patroseguros/review";
const MAPS_URL = "https://www.google.com/maps/place/Patro+Seguros/";
const PHONE_WA = "551151997500";

const SEGMENTS = [
  {
    id: "auto",
    label: "Seguro Auto",
    keywords: ["seguro auto Guarulhos", "cotação Porto Seguro Guarulhos", "Cidade Maia"],
    template:
      "Fiz meu seguro auto em Guarulhos com a Patro Seguros e a experiência foi excelente. A equipe comparou Porto Seguro, Tokio Marine e Allianz, conseguiu o melhor preço para o meu CEP no(a) [BAIRRO] e explicou cada cobertura com clareza. Atendimento presencial no Cidade Maia, super recomendo para quem mora em Guarulhos.",
  },
  {
    id: "vida",
    label: "Seguro de Vida / Saúde",
    keywords: ["seguro de vida Guarulhos", "plano de saúde Guarulhos", "corretora Cidade Maia"],
    template:
      "Procurava plano de saúde / seguro de vida em Guarulhos e a Patro Seguros me ajudou a comparar várias operadoras. Atendimento humano, sem pressão de venda, e me indicaram a melhor opção para a minha família no(a) [BAIRRO]. Ótima corretora no Cidade Maia.",
  },
  {
    id: "empresarial",
    label: "PME / Empresarial / Galpões",
    keywords: [
      "seguro empresarial Guarulhos",
      "seguro de galpões Cumbica",
      "seguro PME Guarulhos",
    ],
    template:
      "Contratamos o seguro da nossa empresa em Guarulhos com a Patro Seguros. Avaliaram nosso galpão em [BAIRRO/Cumbica], explicaram coberturas patrimoniais, lucros cessantes e RC, e entregaram uma apólice muito mais competitiva que tínhamos antes. Recomendo para qualquer empresa de Guarulhos e região.",
  },
  {
    id: "residencial",
    label: "Residencial / Condomínio",
    keywords: [
      "seguro residencial Guarulhos",
      "seguro condomínio Guarulhos",
      "Vila Galvão / Cidade Maia",
    ],
    template:
      "Fechei o seguro residencial / do condomínio em Guarulhos com a Patro Seguros. Atendimento próximo, comparação real entre seguradoras e ótimo preço para o meu imóvel no(a) [BAIRRO]. Vale muito a pena para quem mora em Guarulhos.",
  },
  {
    id: "moto",
    label: "Moto / Motorista de App",
    keywords: [
      "seguro moto Guarulhos",
      "seguro Uber 99 Guarulhos",
      "motorista de aplicativo",
    ],
    template:
      "Sou motorista de aplicativo em Guarulhos e a Patro Seguros encontrou um seguro que cobre uso profissional, algo que outras corretoras não souberam resolver. Preço justo, atendimento rápido pelo WhatsApp e suporte completo. Recomendo para todo motorista de app da região.",
  },
];

const STEPS = [
  {
    title: "Clique em “Avaliar no Google”",
    description:
      "O botão abre direto a tela de avaliação no Google Maps, sem precisar buscar o nome da empresa.",
  },
  {
    title: "Selecione 5 estrelas",
    description:
      "Sua nota é o que mais ajuda outras pessoas de Guarulhos a encontrarem uma corretora confiável.",
  },
  {
    title: "Cole um modelo (opcional) e personalize",
    description:
      "Use um dos modelos abaixo, troque por suas próprias palavras, mencione o bairro e o tipo de seguro contratado.",
  },
  {
    title: "Publicar",
    description:
      "Pronto! Sua avaliação aparece em poucos minutos e fortalece a Patro Seguros no Google de Guarulhos.",
  },
];

const FAQS = [
  {
    question: "Por que avaliar a Patro Seguros no Google ajuda?",
    answer:
      "Como corretora local em Guarulhos, nosso ranqueamento no Google Maps depende muito das avaliações reais de clientes. Cada review com palavras-chave como 'seguro auto Guarulhos', 'Cidade Maia' ou 'Cumbica' nos ajuda a aparecer quando outras pessoas da região buscam por seguros.",
  },
  {
    question: "Preciso ter conta no Google para avaliar?",
    answer:
      "Sim. Qualquer conta Gmail funciona — basta estar logado no celular ou navegador. Não compartilhamos seus dados; tudo acontece dentro do Google.",
  },
  {
    question: "Posso editar ou apagar minha avaliação depois?",
    answer:
      "Pode. No Google Maps, vá em 'Suas contribuições' → 'Avaliações' e edite ou exclua quando quiser. Você tem total controle do seu review.",
  },
  {
    question: "Posso avaliar mesmo sem ter contratado ainda?",
    answer:
      "O ideal é avaliar quem já foi atendido. Se você ainda está em cotação, recomendamos esperar até concluir o atendimento ou fechar a apólice — assim sua avaliação é genuína e respeita as diretrizes do Google.",
  },
  {
    question: "Como menciono o bairro corretamente?",
    answer:
      "Cite naturalmente o bairro onde mora ou onde tem o imóvel/empresa: Cidade Maia, Vila Galvão, Vila Augusta, Centro, Bonsucesso, Cumbica, Pimentas, Taboão, Jardim São João etc. Isso ajuda muito o SEO local.",
  },
];

const AvaliarNoGoogle = () => {
  const [activeId, setActiveId] = useState(SEGMENTS[0].id);
  const [copied, setCopied] = useState(false);

  const active = useMemo(
    () => SEGMENTS.find((s) => s.id === activeId) ?? SEGMENTS[0],
    [activeId],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.template);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* ignore */
    }
  };

  const openReview = (source: string) => {
    trackInternalLinkClick({
      source: `avaliar-no-google:${source}`,
      destination: REVIEW_URL,
      label: "Avaliar no Google",
    });
    window.open(REVIEW_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <PageMeta
        title="Avaliar Patro Seguros no Google — Corretora em Guarulhos"
        description="Avalie a Patro Seguros no Google Business em poucos cliques. Modelos prontos com palavras-chave locais (Cidade Maia, Cumbica) para apoiar a corretora."
      />
      <FAQSchema faqs={FAQS} />
      <Header />

      <main className="bg-background">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb
            items={[
              { label: "Sobre", href: "/sobre" },
              { label: "Avaliar no Google", href: "/avaliar-no-google" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="section-label">Google Business Profile</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Avalie a Patro Seguros no Google
            </h1>
            <div className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-3xl font-bold text-foreground leading-none">4.7</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>· 27 avaliações reais de clientes em Guarulhos</span>
            </div>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Sua avaliação no Google ajuda outras pessoas de Guarulhos, Cidade Maia, Cumbica e
              região a encontrarem uma corretora de seguros de confiança. Leva menos de 60 segundos.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => openReview("hero")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-6 py-3 transition-opacity"
              >
                <Star className="h-5 w-5 fill-white" /> Avaliar no Google
              </button>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 transition-colors"
              >
                <ExternalLink className="h-5 w-5" /> Ver perfil no Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              Como avaliar em 4 passos
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {STEPS.map((step, idx) => (
                <li key={step.title} className="rounded-2xl border border-border bg-card p-5">
                  <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mb-3">
                    {idx + 1}
                  </div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Templates */}
        <section className="py-14 bg-primary/5 border-y border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <span className="section-label inline-flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Modelos prontos
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
                Escolha um modelo e personalize
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
                Use como inspiração — troque [BAIRRO] pelo seu (Cidade Maia, Vila Galvão, Cumbica,
                Bonsucesso, Centro, Pimentas etc.) e adicione algo verdadeiro sobre seu atendimento.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {SEGMENTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setActiveId(s.id);
                    setCopied(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    activeId === s.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Template card */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {active.keywords.map((k) => (
                  <span
                    key={k}
                    className="text-[11px] uppercase tracking-wide font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <p className="text-base md:text-lg leading-relaxed text-foreground whitespace-pre-line">
                {active.template}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-5 py-2.5 transition-colors"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copiado!" : "Copiar modelo"}
                </button>
                <button
                  type="button"
                  onClick={() => openReview(`template:${active.id}`)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-5 py-2.5 transition-opacity"
                >
                  Abrir avaliação no Google <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Importante: edite o texto com suas próprias palavras antes de publicar — avaliações
                únicas e verdadeiras valorizam mais para o Google e para outros clientes.
              </p>
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl grid md:grid-cols-3 gap-6">
            {[
              {
                title: "SEO local em Guarulhos",
                text: "Avaliações com palavras-chave locais ajudam a Patro a aparecer no topo do Google Maps quando outras pessoas buscam por seguros em Guarulhos.",
              },
              {
                title: "Confiança para novos clientes",
                text: "97% das pessoas leem reviews antes de contratar serviços locais. Sua opinião pode ajudar muita gente da região.",
              },
              {
                title: "Melhoria contínua",
                text: "Lemos cada avaliação e usamos para evoluir nosso atendimento, prazos e produtos.",
              },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
                <MessageSquare className="h-6 w-6 text-primary mb-3" aria-hidden="true" />
                <h3 className="font-bold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Address card */}
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 text-center">
              <MapPin className="h-6 w-6 text-primary mx-auto mb-2" aria-hidden="true" />
              <p className="font-semibold text-foreground">Patro Seguros — Cidade Maia, Guarulhos/SP</p>
              <p className="text-sm text-muted-foreground mt-1">
                Av. Salgado Filho, 2120 — Ed. Via Alameda, Sala 219 — Cidade Maia, Guarulhos/SP
              </p>
              <button
                type="button"
                onClick={() => openReview("address-card")}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-6 py-3 transition-opacity"
              >
                <Star className="h-5 w-5 fill-white" /> Avaliar agora no Google
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Perguntas frequentes
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

        {/* Closing */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Obrigado por apoiar a Patro Seguros 💙</h2>
            <p className="mt-3 text-primary-foreground/80">
              Tem alguma dúvida ou quer falar direto com a equipe? Estamos no WhatsApp.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
                  "Olá! Vim pela página de avaliações da Patro Seguros e queria falar com a equipe.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("avaliar-no-google:closing")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-primary font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
              >
                Falar no WhatsApp
              </a>
              <Link
                to="/depoimentos"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 text-white font-semibold px-6 py-3 hover:bg-white/10 transition-colors"
              >
                Ver depoimentos completos
              </Link>
            </div>
          </div>
        </section>
            <HowToSchema
        name='Como avaliar a Patro Seguros no Google'
        description='Passo a passo para deixar uma avaliação com nota e comentário no perfil da Patro Corretora de Seguros no Google Maps.'
        totalTime='PT2M'
        estimatedCost='0'
        tool={['Conta Google', 'Celular ou navegador']}
        url='https://www.patroseguros.com.br/avaliar-no-google'
        steps={[
          { name: 'Abra o perfil da Patro Seguros no Google', text: "Acesse https://www.google.com/maps?cid=273879799324962533 ou busque por 'Patro Seguros' no Google Maps." },
          { name: 'Faça login com sua conta Google', text: "Se ainda não estiver logado, clique em 'Entrar' no canto superior direito e use qualquer conta Google (Gmail)." },
          { name: "Clique em 'Escrever uma avaliação'", text: "Role até a seção 'Avaliações' no card do lado esquerdo e clique no botão 'Escrever uma avaliação'." },
          { name: 'Selecione a nota', text: 'Escolha de 1 a 5 estrelas — 5 estrelas é a nota máxima.' },
          { name: 'Escreva um comentário breve', text: 'Descreva sua experiência: atendimento, agilidade, produto contratado. Comentários com detalhes ajudam outros clientes.' },
          { name: 'Publique', text: "Clique em 'Publicar'. A avaliação aparece imediatamente no perfil e no Knowledge Panel do Google." }
        ]}
      />
      </main>

      <Footer />
    </>
  );
};

export default AvaliarNoGoogle;