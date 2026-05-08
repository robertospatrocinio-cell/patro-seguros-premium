import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Newspaper,
  Mail,
  MessageCircle,
  Download,
  Copy,
  Check,
  Quote,
  Users,
  Building2,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import { trackWhatsAppClick, trackInternalLinkClick } from "@/lib/tracking";

const PHONE = "551151997500";
const EMAIL = "imprensa@patroseguros.com.br";
const WA_MSG =
  "Olá! Sou jornalista/produtor de conteúdo e gostaria de falar com a Patro Seguros para uma matéria.";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MSG)}`;

const TOPICS = [
  {
    icon: Building2,
    title: "Mercado segurador em Guarulhos e Grande SP",
    description:
      "Tendências de preços, sinistralidade por bairro, impacto de rodovias (Dutra, Fernão Dias) e cenário pós-aeroporto Cumbica.",
  },
  {
    icon: Newspaper,
    title: "Seguro auto, residencial e empresarial",
    description:
      "Comparativos entre seguradoras, perfis de risco, motoristas de aplicativo, frotas, PME, condomínios e galpões industriais.",
  },
  {
    icon: Quote,
    title: "Riscos patrimoniais e logísticos",
    description:
      "Galpões, transporte, riscos nomeados, lucros cessantes — referência regional em Guarulhos/Cumbica e atendimento nacional.",
  },
  {
    icon: Users,
    title: "Saúde, vida e benefícios",
    description:
      "Planos de saúde individuais e empresariais, seguros de vida, previdência privada e estratégias para PME em Guarulhos.",
  },
];

const SPOKES = [
  {
    name: "Roberto Patrocínio",
    role: "Sócio-fundador da Patro Seguros",
    bio: "Mais de 25 anos no mercado segurador, especialista em riscos patrimoniais, galpões industriais e seguros corporativos. Atende empresas em Guarulhos, Cumbica e em todo o Brasil.",
  },
  {
    name: "Sandra Patrocínio",
    role: "Sócia-fundadora da Patro Seguros",
    bio: "Especialista em seguros de vida, saúde e benefícios para pessoas físicas e PMEs. Liderou mais de 500 atendimentos consultivos para famílias e empresas em Guarulhos.",
  },
];

const FACTS = [
  "Corretora com sede no Cidade Maia, Guarulhos/SP, atendendo toda a Grande São Paulo.",
  "Hub de mais de 16 seguradoras e 20+ operadoras de saúde.",
  "Especialização em galpões e riscos patrimoniais (Guarulhos, Cumbica e nacional).",
  "Mais de 500 cases atendidos para PMEs e pessoas físicas.",
  "Nota 4.9 no Google Business com mais de 150 avaliações reais.",
  "Atendimento Agro com cobertura nacional para máquinas, lavoura e propriedades rurais.",
];

const FAQS = [
  {
    question: "Como entrar em contato para uma entrevista ou matéria?",
    answer:
      "Envie um e-mail para imprensa@patroseguros.com.br com pauta, veículo, deadline e formato (texto, áudio, vídeo). Também respondemos via WhatsApp da equipe de imprensa. Retornamos em até 1 dia útil — solicitações com deadline curto têm prioridade.",
  },
  {
    question: "Os porta-vozes podem dar entrevistas presenciais em Guarulhos?",
    answer:
      "Sim. Roberto e Sandra Patrocínio recebem jornalistas no escritório no Cidade Maia (Av. Salgado Filho, 2120 — Ed. Via Alameda). Também atendemos por vídeo (Google Meet, Teams) e telefone.",
  },
  {
    question: "Posso usar dados, gráficos ou citações da Patro Seguros em matérias?",
    answer:
      "Pode. Liberamos uso de citações, dados de mercado e estimativas próprias mediante atribuição correta (Patro Seguros — Corretora em Guarulhos). Para uso de marca/logotipo, consulte nosso kit de imprensa.",
  },
  {
    question: "A Patro Seguros publica releases?",
    answer:
      "Sim, periodicamente publicamos releases sobre mercado segurador, novas linhas de produto e cases. Inscreva-se na nossa lista de imprensa enviando um e-mail para imprensa@patroseguros.com.br.",
  },
  {
    question: "Vocês aceitam parcerias editoriais e coautoria?",
    answer:
      "Sim. Trabalhamos com mídias regionais de Guarulhos e portais nacionais especializados em seguros, finanças, agro e logística. Para parcerias formais, fale com nosso time pelo WhatsApp ou e-mail.",
  },
];

const Imprensa = () => {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <>
      <PageMeta
        title="Sala de Imprensa — Patro Seguros, corretora em Guarulhos/SP"
        description="Sala de imprensa Patro Seguros: porta-vozes, pautas (galpões, agro, auto, saúde), contato e fact-sheet da corretora no Cidade Maia."
      />
      <FAQSchema faqs={FAQS} />
      <Header />

      <main className="bg-background">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb
            items={[
              { label: "Sobre", href: "/sobre" },
              { label: "Imprensa", href: "/imprensa" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="section-label inline-flex items-center gap-1">
              <Newspaper className="h-3.5 w-3.5" /> Press / Mídia
            </span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Sala de Imprensa
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Jornalistas, podcasters e produtores de conteúdo: a Patro Seguros disponibiliza
              porta-vozes, dados de mercado e cases reais sobre o setor de seguros em Guarulhos,
              Grande SP e Brasil.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  "Pauta — Patro Seguros",
                )}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-6 py-3 transition-opacity"
              >
                <Mail className="h-5 w-5" /> {EMAIL}
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("imprensa:hero")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 transition-colors"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp imprensa
              </a>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">
              Pautas que falamos com propriedade
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
              Disponibilizamos análises, dados próprios e cases reais sobre estes temas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TOPICS.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-2xl border border-border bg-card p-6">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spokespeople */}
        <section className="py-14 bg-primary/5 border-y border-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              Porta-vozes oficiais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SPOKES.map((p) => (
                <div key={p.name} className="rounded-2xl bg-card border border-border p-6 md:p-8">
                  <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
                  <p className="text-sm text-primary font-semibold mt-1">{p.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fact-sheet */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">
              Fact-sheet para citação
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Dados verificados que podem ser citados em matérias com atribuição à Patro Seguros.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FACTS.map((f) => (
                <li
                  key={f}
                  className="rounded-xl border border-border bg-card p-4 text-sm text-foreground"
                >
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center">
              <Download className="h-6 w-6 text-primary mx-auto mb-2" aria-hidden="true" />
              <p className="font-semibold text-foreground">Logos e materiais de marca</p>
              <p className="text-sm text-muted-foreground mt-1">
                Solicite o kit de imprensa (logos, cores, fotos institucionais) por e-mail —
                enviamos em até 1 dia útil.
              </p>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  "Solicitação de kit de imprensa",
                )}`}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-5 py-2.5 transition-opacity"
              >
                <Mail className="h-4 w-4" /> Solicitar kit de imprensa
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Contato direto da Imprensa</h2>
            <p className="mt-3 text-primary-foreground/80">
              Resposta em até 1 dia útil. Deadlines curtos têm prioridade — sinalize no assunto.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-primary font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                {copied ? "E-mail copiado!" : `Copiar ${EMAIL}`}
              </button>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("imprensa:cta")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 text-white font-semibold px-6 py-3 hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp imprensa
              </a>
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

        {/* Cross-link */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">É um negócio local em Guarulhos?</p>
            <Link
              to="/parceiros-locais"
              onClick={() =>
                trackInternalLinkClick({
                  source: "imprensa",
                  destination: "/parceiros-locais",
                  label: "Parceiros Locais",
                })
              }
              className="mt-2 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Conheça o programa Parceiros Locais <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Imprensa;