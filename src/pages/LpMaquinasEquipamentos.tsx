import { useState, useRef, FormEvent, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import {
  ShieldCheck,
  Wrench,
  Truck,
  Factory,
  Sun,
  Snowflake,
  Cpu,
  Zap,
  Forklift,
  ArrowUpFromLine,
  Building2,
  Boxes,
  ClipboardList,
  Search,
  Route,
  Handshake,
  LifeBuoy,
  CheckCircle2,
  XCircle,
  MessageCircle,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitLead } from "@/lib/leadsApi";
import { trackCotacaoClick, trackWhatsAppClick, trackCotacaoSubmit } from "@/lib/tracking";
import { maskPhone } from "@/lib/utils";
import { WHATSAPP_NUMBER, buildLpWhatsAppUrl } from "@/lib/whatsapp";
import heroImg from "@/assets/hero-seguro-maquinas.webp";

// ---------- Config editável ----------
// Número e templates de WhatsApp por CTA vivem em `src/lib/whatsapp.ts`.
// Para ajustar os textos desta LP, edite `LP_WHATSAPP_TEMPLATES["lp-maquinas-equipamentos"]` lá.
const CONTACT_EMAIL = "contato@patroseguros.com.br";
const CONTACT_PHONE = "(11) 5199-7500";
const CITY = "Guarulhos / SP";

const SOURCE = "lp-maquinas-equipamentos";

const buildWhatsAppUrl = (cta: string) => buildLpWhatsAppUrl(SOURCE, cta);

// ---------- Validação ----------
const formSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  company: z.string().trim().min(2, "Informe o nome da empresa").max(120),
  phone: z.string().trim().refine((v) => v.replace(/\D/g, "").length >= 10, "Telefone inválido"),
  email: z.string().trim().email("E-mail inválido").max(150),
  cityState: z.string().trim().min(2, "Informe a cidade e estado").max(80),
  equipmentType: z.string().trim().min(2, "Descreva o tipo de equipamento").max(120),
  quantity: z.string().trim().max(20).optional().or(z.literal("")),
  value: z.string().trim().max(40).optional().or(z.literal("")),
  ownership: z.enum(["Próprio", "Financiado", "Alugado", "Misto"], {
    errorMap: () => ({ message: "Selecione uma opção" }),
  }),
  location: z.enum(["Local próprio", "Dentro do cliente", "Ambos"], {
    errorMap: () => ({ message: "Selecione uma opção" }),
  }),
  transport: z.enum(["Sim", "Não", "Eventualmente"], {
    errorMap: () => ({ message: "Selecione uma opção" }),
  }),
  usage: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "É necessário autorizar o contato" }),
  }),
});

type FormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  cityState: string;
  equipmentType: string;
  quantity: string;
  value: string;
  ownership: string;
  location: string;
  transport: string;
  usage: string;
  consent: boolean;
};

const initialState: FormState = {
  name: "",
  company: "",
  phone: "",
  email: "",
  cityState: "",
  equipmentType: "",
  quantity: "",
  value: "",
  ownership: "",
  location: "",
  transport: "",
  usage: "",
  consent: false,
};

// ---------- Dados de conteúdo ----------
const equipments = [
  { icon: Forklift, label: "Empilhadeiras" },
  { icon: ArrowUpFromLine, label: "Plataformas elevatórias" },
  { icon: Zap, label: "Geradores" },
  { icon: Boxes, label: "Equipamentos alugados" },
  { icon: Factory, label: "Máquinas industriais" },
  { icon: Snowflake, label: "Equipamentos de climatização" },
  { icon: Sun, label: "Sistemas de energia solar" },
  { icon: Cpu, label: "Equipamentos eletrônicos" },
  { icon: Building2, label: "Máquinas em instalações do cliente" },
];

const risksCards = [
  { title: "Danos físicos", desc: "Cobertura para danos ao equipamento, conforme condições contratadas." },
  { title: "Incêndio, explosão e danos elétricos", desc: "Proteção para eventos súbitos que atingem a máquina ou o ambiente." },
  { title: "Roubo e furto", desc: "Conforme cláusulas específicas do produto contratado." },
  { title: "Acidentes durante a operação", desc: "Danos ocorridos durante o uso regular do equipamento." },
  { title: "Operações em locais de terceiros", desc: "Cobertura pensada para máquinas trabalhando fora da empresa." },
  { title: "Deslocamento e transporte", desc: "Proteção para movimentação, quando prevista em apólice." },
  { title: "Responsabilidade civil", desc: "Para danos causados a terceiros durante a operação." },
  { title: "Perda de receita / paralisação", desc: "Quando houver produto e cobertura aplicáveis." },
  { title: "Equipamentos alugados", desc: "Proteções específicas para locadoras e locatários." },
];

const audiences = [
  "Proprietários de máquinas",
  "Locadoras de equipamentos",
  "Indústrias e operadores logísticos",
  "Prestadores de serviços",
  "Empresas que trabalham dentro do cliente",
  "Revendedores e distribuidores",
  "Empresas com equipamentos financiados",
  "Gestores de frotas de equipamentos",
];

const steps = [
  { icon: ClipboardList, title: "Conte sobre o equipamento", desc: "Informe o tipo, valor, localização e utilização." },
  { icon: Search, title: "Entendemos a operação", desc: "Analisamos ambiente, atividade, mobilidade, operadores e exposição." },
  { icon: ShieldCheck, title: "Mapeamos os principais riscos", desc: "Identificamos os pontos que precisam de atenção." },
  { icon: Route, title: "Buscamos alternativas", desc: "Consultamos soluções disponíveis conforme o perfil analisado." },
  { icon: LifeBuoy, title: "Acompanhamos a contratação", desc: "Apoiamos na contratação, renovação e condução do sinistro." },
];

const faqs = [
  { q: "Posso segurar apenas um equipamento?", a: "Sim. A análise pode ser feita para um único equipamento ou para uma frota. As condições dependem do produto e da aceitação da seguradora." },
  { q: "Equipamentos alugados podem ser segurados?", a: "Sim. Existem produtos específicos para locadoras e locatários. As coberturas variam conforme o contrato de locação e o produto disponível." },
  { q: "É possível analisar uma frota de máquinas?", a: "Sim. Levantamos as informações de cada equipamento e buscamos alternativas coerentes com o perfil da operação." },
  { q: "O seguro pode cobrir equipamentos trabalhando dentro do cliente?", a: "Há produtos que consideram essa exposição. A cobertura depende das condições contratadas e da aceitação do risco pela seguradora." },
  { q: "Equipamentos financiados podem ser incluídos?", a: "Sim, respeitando as exigências do contrato de financiamento e as regras da seguradora." },
  { q: "O transporte do equipamento está automaticamente coberto?", a: "Nem sempre. O transporte costuma ser uma cobertura adicional que depende do produto e das características da movimentação." },
  { q: "Quais documentos podem ser solicitados?", a: "Nota fiscal, ficha técnica, fotos, comprovação de valor, laudos e informações da operação. A lista varia por seguradora." },
  { q: "Como funciona a análise da seguradora?", a: "A seguradora avalia informações do equipamento, da operação e do histórico da empresa antes de aceitar o risco e emitir a apólice." },
  { q: "O que acontece em caso de sinistro?", a: "É aberto o processo junto à seguradora com a documentação exigida. Acompanhamos o cliente durante todo o trâmite." },
  { q: "A solicitação de análise já garante a cobertura?", a: "Não. O envio do formulário é o início de um processo. A contratação depende de proposta, análise e aceitação do risco pela seguradora." },
];

// ---------- Componente ----------
const LpMaquinasEquipamentos = () => {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = (source: string) => {
    trackCotacaoClick(source, { insuranceType: "maquinas-equipamentos", origin: SOURCE });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleWhatsApp = (source: string) => {
    trackWhatsAppClick(source, { insuranceType: "maquinas-equipamentos", origin: SOURCE });
  };

  const handleChange = (field: keyof FormState, val: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: val as never }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const key = i.path[0] as string;
        if (!errs[key]) errs[key] = i.message;
      });
      setErrors(errs);
      toast.error("Verifique os campos do formulário.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await submitLead({
        full_name: values.name,
        email: values.email,
        phone: values.phone,
        insurance_type: "maquinas-equipamentos",
        source_page: SOURCE,
        raw_data: {
          company: values.company,
          cityState: values.cityState,
          equipmentType: values.equipmentType,
          quantity: values.quantity,
          value: values.value,
          ownership: values.ownership,
          location: values.location,
          transport: values.transport,
          usage: values.usage,
        },
      });
      if (error) throw error;
      trackCotacaoSubmit("maquinas-equipamentos", { origin: SOURCE });
      setSubmitted(true);
      setValues(initialState);
      toast.success("Solicitação enviada com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível enviar agora. Tente novamente ou fale no WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Seguro para Máquinas e Equipamentos",
      provider: {
        "@type": "InsuranceAgency",
        name: "Patro Seguros",
        areaServed: "Guarulhos, Grande São Paulo",
        telephone: `+${WHATSAPP_NUMBER}`,
      },
      serviceType: "Seguro de máquinas e equipamentos empresariais",
      description:
        "Análise consultiva e busca de seguro para empilhadeiras, plataformas, geradores, máquinas industriais e equipamentos alugados.",
    }),
    [],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageMeta
        title="Seguro para Máquinas e Equipamentos"
        description="Seguro especializado para empilhadeiras, plataformas, geradores, máquinas industriais e equipamentos alugados. Análise consultiva da sua operação com a Patro Seguros."
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Header />

      <main id="main-content">
        {/* HERO */}
        <section id="inicio" className="relative overflow-hidden bg-primary text-white">
          <div className="absolute inset-0">
            <img
              src={heroImg}
              alt="Empilhadeira operando em galpão industrial moderno"
              className="w-full h-full object-cover opacity-25"
              loading="eager"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
          </div>
          <div className="relative container mx-auto px-4 py-20 md:py-28 max-w-6xl">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs uppercase tracking-wide font-medium">
                <ShieldCheck className="h-4 w-4" /> Análise consultiva de risco
              </span>
              <h1 className="mt-6 text-3xl md:text-5xl font-bold leading-tight">
                Seguro para máquinas e equipamentos começa com a compreensão da sua operação.
              </h1>
              <p className="mt-5 text-lg md:text-xl text-white/85">
                Proteção especializada para equipamentos próprios, financiados ou alugados — inclusive quando trabalham
                dentro das instalações dos seus clientes.
              </p>
              <p className="mt-4 text-base text-white/75 max-w-2xl">
                Analisamos o equipamento, sua aplicação, o ambiente de trabalho e os riscos da operação para buscar uma
                solução de seguro adequada ao seu negócio.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => scrollToForm(`${SOURCE}-hero`)}
                  className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold px-8"
                  aria-label="Solicitar análise de risco"
                >
                  Solicitar análise de risco
                </Button>
                <a
                  href={buildWhatsAppUrl("hero")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsApp(`${SOURCE}-hero`)}
                  aria-label="Falar com a Patro Seguros no WhatsApp"
                  className="inline-flex items-center gap-2 rounded-md border border-white/40 hover:bg-white/10 px-6 py-3 font-semibold transition-colors"
                >
                  <MessageCircle className="h-5 w-5" /> Falar pelo WhatsApp
                </a>
              </div>

              <p className="mt-6 text-sm text-white/70 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Atendimento consultivo para empresas de Guarulhos, Grande São Paulo e
                outras regiões.
              </p>
            </div>
          </div>
        </section>

        {/* EQUIPAMENTOS */}
        <section id="equipamentos" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                Escopo de análise
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                Quais equipamentos podem ser analisados?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Avaliamos equipamentos empresariais de diversos segmentos. Se o seu equipamento não estiver na lista,
                fale com a nossa equipe.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {equipments.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="group rounded-xl border border-border bg-card p-6 hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-semibold text-base">{label}</h3>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl bg-primary/5 border border-primary/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-base md:text-lg text-foreground">
                <strong>Não encontrou seu equipamento?</strong> Fale com nossa equipe para avaliarmos as características
                da operação.
              </p>
              <Button
                onClick={() => scrollToForm(`${SOURCE}-equipamentos`)}
                className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold"
                aria-label="Consultar meu equipamento"
              >
                Consultar meu equipamento
              </Button>
            </div>
          </div>
        </section>

        {/* COMPARATIVO */}
        <section id="diferenciais" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                Não é só o equipamento
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                Duas máquinas iguais podem ter riscos completamente diferentes.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Uma empilhadeira que trabalha em um centro de distribuição não enfrenta necessariamente os mesmos riscos
                de outra utilizada em ambiente externo. Por isso, compreender a operação é parte fundamental da análise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-card border border-border p-8">
                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                  <XCircle className="h-5 w-5" />
                  <h3 className="font-semibold text-lg">Cotação convencional</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Considera principalmente o tipo e o valor do equipamento.</li>
                  <li>• Pode não aprofundar as condições da operação.</li>
                  <li>• Trata situações diferentes de maneira semelhante.</li>
                </ul>
              </div>
              <div className="rounded-xl bg-primary text-primary-foreground p-8 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-lg">Análise Patro Seguros</h3>
                </div>
                <ul className="space-y-3 text-sm text-white/90">
                  <li>• Entende onde o equipamento trabalha.</li>
                  <li>• Avalia a atividade realizada.</li>
                  <li>• Identifica quem utiliza o equipamento.</li>
                  <li>• Analisa transporte, mobilidade e exposição.</li>
                  <li>• Considera equipamentos em poder de terceiros.</li>
                  <li>• Identifica possíveis impactos de uma paralisação.</li>
                  <li>• Busca coberturas coerentes com o risco identificado.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* RISCOS E COBERTURAS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                Riscos e coberturas
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                Proteção pensada para os riscos reais do negócio.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {risksCards.map((card) => (
                <div key={card.title} className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-base">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-lg border-l-4 border-primary/40 bg-primary/5 p-5 text-sm text-muted-foreground">
              <strong className="text-foreground">Importante:</strong> as coberturas, exclusões, limites, franquias e
              condições variam conforme o equipamento, a operação e o produto oferecido pela seguradora. A contratação
              está sujeita à análise e aceitação do risco.
            </div>
          </div>
        </section>

        {/* PÚBLICO */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Para quem</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">Para quem é essa solução?</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {audiences.map((a) => (
                <div
                  key={a}
                  className="rounded-xl bg-card border border-border p-5 hover:border-primary transition-colors flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Handshake className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium leading-snug">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Processo</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">Como funciona?</h2>
            </div>

            <ol className="space-y-6 md:space-y-0 md:grid md:grid-cols-5 md:gap-4">
              {steps.map((s, i) => (
                <li key={s.title} className="relative flex md:flex-col gap-4 md:gap-3 md:text-center">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold md:mx-auto shadow-md">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base flex items-center md:justify-center gap-2">
                      <s.icon className="h-4 w-4 text-primary md:hidden" /> {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* DIFERENCIAL */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wide text-primary">Diferencial</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold">Mais do que preencher uma cotação.</h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">
                  Máquinas e equipamentos fazem parte da operação e da capacidade de gerar receita de uma empresa. Por
                  isso, nossa análise começa pelo negócio do cliente, e não somente pelo formulário da seguradora.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "Atendimento consultivo.",
                  "Visão técnica da aplicação.",
                  "Experiência com máquinas e equipamentos.",
                  "Análise de equipamentos próprios ou alugados.",
                  "Atenção às operações em locais de terceiros.",
                  "Apoio durante todo o ciclo do seguro.",
                  "Centralização das informações e renovações.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FORMULÁRIO */}
        <section ref={formRef} id="contato" className="py-20 bg-background scroll-mt-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Análise de risco</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">Vamos entender o seu equipamento?</h2>
              <p className="mt-3 text-muted-foreground">
                Preencha o formulário e nossa equipe entrará em contato para compreender melhor a operação.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Recebemos suas informações.</h3>
                <p className="mt-3 text-muted-foreground">
                  Nossa equipe entrará em contato para compreender melhor a operação. O envio do formulário não
                  representa contratação, garantia de cobertura ou aceitação do risco.
                </p>
                <div className="mt-6">
                  <a
                    href={buildWhatsAppUrl("success")}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleWhatsApp(`${SOURCE}-success`)}
                    className="inline-flex items-center gap-2 rounded-md bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold px-6 py-3"
                  >
                    <MessageCircle className="h-5 w-5" /> Falar pelo WhatsApp agora
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Nome" required error={errors.name}>
                    <input
                      type="text"
                      value={values.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={inputCls(errors.name)}
                      autoComplete="name"
                      required
                    />
                  </Field>
                  <Field label="Empresa" required error={errors.company}>
                    <input
                      type="text"
                      value={values.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      className={inputCls(errors.company)}
                      autoComplete="organization"
                      required
                    />
                  </Field>
                  <Field label="Telefone / WhatsApp" required error={errors.phone}>
                    <input
                      type="tel"
                      value={values.phone}
                      onChange={(e) => handleChange("phone", maskPhone(e.target.value))}
                      className={inputCls(errors.phone)}
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </Field>
                  <Field label="E-mail corporativo" required error={errors.email}>
                    <input
                      type="email"
                      value={values.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={inputCls(errors.email)}
                      autoComplete="email"
                      required
                    />
                  </Field>
                  <Field label="Cidade e estado" required error={errors.cityState}>
                    <input
                      type="text"
                      value={values.cityState}
                      onChange={(e) => handleChange("cityState", e.target.value)}
                      className={inputCls(errors.cityState)}
                      placeholder="Ex.: Guarulhos / SP"
                      required
                    />
                  </Field>
                  <Field label="Tipo de equipamento" required error={errors.equipmentType}>
                    <input
                      type="text"
                      value={values.equipmentType}
                      onChange={(e) => handleChange("equipmentType", e.target.value)}
                      className={inputCls(errors.equipmentType)}
                      placeholder="Ex.: Empilhadeira, gerador…"
                      required
                    />
                  </Field>
                  <Field label="Quantidade de equipamentos" error={errors.quantity}>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={values.quantity}
                      onChange={(e) => handleChange("quantity", e.target.value)}
                      className={inputCls(errors.quantity)}
                    />
                  </Field>
                  <Field label="Valor aproximado" error={errors.value}>
                    <input
                      type="text"
                      value={values.value}
                      onChange={(e) => handleChange("value", e.target.value)}
                      className={inputCls(errors.value)}
                      placeholder="Ex.: R$ 120.000"
                    />
                  </Field>
                  <Field label="O equipamento é" required error={errors.ownership}>
                    <select
                      value={values.ownership}
                      onChange={(e) => handleChange("ownership", e.target.value)}
                      className={inputCls(errors.ownership)}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="Próprio">Próprio</option>
                      <option value="Financiado">Financiado</option>
                      <option value="Alugado">Alugado</option>
                      <option value="Misto">Misto</option>
                    </select>
                  </Field>
                  <Field label="Local de operação" required error={errors.location}>
                    <select
                      value={values.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      className={inputCls(errors.location)}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="Local próprio">Local próprio</option>
                      <option value="Dentro do cliente">Dentro do cliente</option>
                      <option value="Ambos">Ambos</option>
                    </select>
                  </Field>
                  <Field label="Movimentação ou transporte frequente?" required error={errors.transport}>
                    <select
                      value={values.transport}
                      onChange={(e) => handleChange("transport", e.target.value)}
                      className={inputCls(errors.transport)}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>
                      <option value="Eventualmente">Eventualmente</option>
                    </select>
                  </Field>
                </div>

                <Field label="Conte brevemente como o equipamento é utilizado" error={errors.usage}>
                  <textarea
                    value={values.usage}
                    onChange={(e) => handleChange("usage", e.target.value)}
                    className={inputCls(errors.usage) + " min-h-[110px] resize-y"}
                    maxLength={1000}
                  />
                </Field>

                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={values.consent}
                    onChange={(e) => handleChange("consent", e.target.checked)}
                    className="mt-1 h-4 w-4"
                    required
                  />
                  <span>
                    Autorizo o contato da Patro Seguros e declaro que li a{" "}
                    <a href="/politica-de-privacidade" className="text-primary underline" target="_blank" rel="noreferrer">
                      Política de Privacidade
                    </a>
                    .
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-destructive -mt-3">{errors.consent}</p>}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold"
                >
                  {isSubmitting ? "Enviando…" : "Solicitar análise de risco"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  O envio do formulário não representa contratação, garantia de cobertura ou aceitação do risco.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Dúvidas frequentes</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">Perguntas frequentes</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-border bg-card overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-sm md:text-base font-semibold pr-4">{f.q}</h3>
                    <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180 flex-shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Seu equipamento movimenta a sua empresa. Vamos entender como protegê-lo?
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Conte como sua máquina trabalha e receba uma análise inicial das necessidades da sua operação.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button
                size="lg"
                onClick={() => scrollToForm(`${SOURCE}-cta-final`)}
                className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold px-8"
                aria-label="Solicitar análise de risco"
              >
                Solicitar análise de risco
              </Button>
              <a
                href={buildWhatsAppUrl("cta-final")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsApp(`${SOURCE}-cta-final`)}
                aria-label="Conversar pelo WhatsApp"
                className="inline-flex items-center gap-2 rounded-md border border-white/40 hover:bg-white/10 px-6 py-3 font-semibold transition-colors"
              >
                <MessageCircle className="h-5 w-5" /> Conversar pelo WhatsApp
              </a>
            </div>
            <p className="mt-6 text-xs text-white/60 flex items-center justify-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {CONTACT_PHONE}</span>
              <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {CONTACT_EMAIL}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {CITY}</span>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// ---------- Helpers ----------
const inputCls = (err?: string) =>
  `w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-primary/40 ${
    err ? "border-destructive" : "border-input focus:border-primary"
  }`;

const Field = ({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="block text-sm font-medium mb-1.5">
      {label} {required && <span className="text-destructive">*</span>}
    </span>
    {children}
    {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
  </label>
);

export default LpMaquinasEquipamentos;