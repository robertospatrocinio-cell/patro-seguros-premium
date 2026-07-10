import { useState, useRef, FormEvent, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import {
  Truck,
  ShieldCheck,
  PackageCheck,
  ScrollText,
  FileWarning,
  AlertTriangle,
  HeartPulse,
  Building2,
  Radar,
  LifeBuoy,
  CheckCircle2,
  XCircle,
  MessageCircle,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Route as RouteIcon,
  ClipboardCheck,
  Search,
  Wrench,
  Compass,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitLead } from "@/lib/leadsApi";
import { trackCotacaoClick, trackWhatsAppClick, trackCotacaoSubmit } from "@/lib/tracking";
import { maskPhone } from "@/lib/utils";
import heroImg from "@/assets/hero-seguro-transporte.webp";

// ---------- Config editável ----------
// Altere aqui número, contatos e as mensagens pré-preenchidas de cada CTA de WhatsApp.
const WHATSAPP_NUMBER = "551151997500";
const CONTACT_EMAIL = "contato@patroseguros.com.br";
const CONTACT_PHONE = "(11) 5199-7500";
const CITY = "Guarulhos / SP";

const SOURCE = "lp-transportes-360";

/**
 * Mensagens pré-preenchidas do WhatsApp por CTA.
 * A chave é a origem do clique (também usada no tracking); o valor é o texto que
 * aparecerá pronto na conversa do WhatsApp.
 */
const WHATSAPP_MESSAGES: Record<string, string> = {
  hero: "Olá! Vim pela landing page do Patro Transportes 360 e gostaria de solicitar um diagnóstico da operação da minha transportadora.",
  "cta-final":
    "Olá! Estou na página do Patro Transportes 360 e quero conversar sobre proteção completa para frota, cargas e motoristas.",
  success:
    "Olá! Acabei de enviar o formulário do Patro Transportes 360 e gostaria de agilizar o diagnóstico pelo WhatsApp.",
};

const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Vim pela landing page do Patro Transportes 360 e gostaria de mais informações.";

const buildWhatsAppUrl = (key: keyof typeof WHATSAPP_MESSAGES | string) => {
  const text = WHATSAPP_MESSAGES[key] ?? DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

// ---------- Máscara CNPJ ----------
const maskCNPJ = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

// ---------- Schemas ----------
const step1Schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome"),
  company: z.string().trim().min(2, "Informe a transportadora"),
  cnpj: z.string().trim().optional().or(z.literal("")),
  phone: z.string().trim().refine((v) => v.replace(/\D/g, "").length >= 10, "Telefone inválido"),
  email: z.string().trim().email("E-mail inválido"),
  cityState: z.string().trim().min(2, "Informe a cidade e estado"),
});

const step2Schema = z.object({
  fleetSize: z.string().trim().min(1, "Informe a quantidade de veículos"),
  fleetType: z.string().trim().min(2, "Selecione o modelo de frota"),
  vehicleTypes: z.string().trim().min(2, "Informe os tipos de veículos"),
  cargoTypes: z.string().trim().min(2, "Informe os tipos de carga"),
  routes: z.string().trim().min(2, "Informe as regiões atendidas"),
  avgShipmentValue: z.string().trim().optional().or(z.literal("")),
  monthlyShipments: z.string().trim().optional().or(z.literal("")),
  tracking: z.enum(["Sim", "Não", "Parcial"], { errorMap: () => ({ message: "Selecione uma opção" }) }),
  hasPolicies: z.enum(["Sim", "Não", "Não sei"], { errorMap: () => ({ message: "Selecione uma opção" }) }),
  renewalDate: z.string().trim().optional().or(z.literal("")),
  operationNotes: z.string().trim().max(1500).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "É necessário autorizar o contato" }) }),
  // honeypot
  website: z.string().max(0, "").optional().or(z.literal("")),
});

type FormState = {
  name: string;
  company: string;
  cnpj: string;
  phone: string;
  email: string;
  cityState: string;
  fleetSize: string;
  fleetType: string;
  vehicleTypes: string;
  cargoTypes: string;
  routes: string;
  avgShipmentValue: string;
  monthlyShipments: string;
  tracking: string;
  hasPolicies: string;
  renewalDate: string;
  operationNotes: string;
  consent: boolean;
  website: string;
};

const initialForm: FormState = {
  name: "", company: "", cnpj: "", phone: "", email: "", cityState: "",
  fleetSize: "", fleetType: "", vehicleTypes: "", cargoTypes: "", routes: "",
  avgShipmentValue: "", monthlyShipments: "", tracking: "", hasPolicies: "",
  renewalDate: "", operationNotes: "", consent: false, website: "",
};

// ---------- Conteúdo ----------
const solutions = [
  { icon: Truck, title: "Seguro de Frota", desc: "Proteção para os veículos utilizados na operação, considerando o perfil da frota, uso, regiões de circulação e histórico da empresa." },
  { icon: ShieldCheck, title: "Responsabilidade Civil", desc: "Coberturas voltadas às responsabilidades da transportadora por danos causados a terceiros, conforme o produto contratado e a atividade realizada." },
  { icon: ScrollText, title: "Seguros obrigatórios do transportador", desc: "Orientação para identificar e contratar os seguros obrigatórios aplicáveis à operação, de acordo com a legislação e regulamentação vigentes." },
  { icon: PackageCheck, title: "Seguro de Carga", desc: "Análise da proteção das mercadorias transportadas, considerando valores, tipos de carga, frequência de embarques, rotas e condições da operação." },
  { icon: AlertTriangle, title: "Roubo, Colisão e Avarias", desc: "Soluções relacionadas a ocorrências durante o transporte, observados os riscos cobertos, exclusões, limites e procedimentos previstos nas apólices." },
  { icon: HeartPulse, title: "Vida e Acidentes para Motoristas", desc: "Proteção para motoristas e outros profissionais da operação, com alternativas de seguro de vida e acidentes pessoais." },
  { icon: Building2, title: "Seguro Empresarial", desc: "Proteção para escritórios, garagens, pátios, oficinas, armazéns, equipamentos e demais instalações da transportadora." },
  { icon: Radar, title: "Gerenciamento de Riscos", desc: "Apoio na identificação de vulnerabilidades, exigências operacionais, rastreamento, monitoramento, procedimentos e medidas preventivas." },
  { icon: LifeBuoy, title: "Assistência em Sinistros", desc: "Acompanhamento na comunicação, organização dos documentos e interação com a seguradora durante o processo de regulação." },
];

const journey = [
  { title: "Coleta", risks: ["Danos no carregamento", "Problemas documentais"] },
  { title: "Carregamento", risks: ["Avarias", "Danos a terceiros"] },
  { title: "Rodovia", risks: ["Acidentes de trânsito", "Falhas de rastreamento"] },
  { title: "Paradas", risks: ["Roubo e furto", "Paralisação do veículo"] },
  { title: "Entrega", risks: ["Ocorrências na entrega", "Avarias finais"] },
  { title: "Retorno", risks: ["Acidentes com motoristas", "Danos ao veículo"] },
];

const checkQuestions = [
  "As coberturas acompanham o crescimento da frota?",
  "Todos os tipos de carga transportados estão corretamente informados?",
  "As apólices contemplam as rotas e operações realizadas?",
  "Frota própria, agregados e terceiros estão tratados adequadamente?",
  "Os seguros obrigatórios e contratuais estão atualizados?",
  "A empresa sabe como agir imediatamente após um sinistro?",
  "Instalações, motoristas e continuidade da operação também estão protegidos?",
  "Existem lacunas ou sobreposições entre as diferentes apólices?",
];

const steps = [
  { icon: Search, title: "Conhecemos a transportadora", desc: "Levantamos informações sobre frota, motoristas, cargas, rotas, instalações e modelo operacional." },
  { icon: ClipboardCheck, title: "Analisamos as apólices atuais", desc: "Organizamos as coberturas existentes e identificamos pontos que merecem atenção." },
  { icon: ShieldCheck, title: "Mapeamos os riscos", desc: "Avaliamos possíveis lacunas, sobreposições e necessidades específicas." },
  { icon: Compass, title: "Consultamos alternativas", desc: "Buscamos soluções disponíveis de acordo com o perfil e a aceitação das seguradoras." },
  { icon: LifeBuoy, title: "Acompanhamos a operação", desc: "Apoiamos renovações, atualizações, movimentações e comunicação de sinistros." },
];

const claimsSupport = [
  "Orientação inicial após a ocorrência.",
  "Checklist de documentos.",
  "Apoio na abertura do aviso.",
  "Acompanhamento da regulação.",
  "Comunicação sobre pendências.",
  "Histórico centralizado dos processos.",
  "Análise periódica da sinistralidade.",
];

const faqs = [
  { q: "Quais seguros uma transportadora precisa contratar?", a: "Depende da operação, das cargas, das rotas e das exigências contratuais e regulatórias. Cada seguro tem finalidade própria e deve ser analisado individualmente." },
  { q: "Os seguros obrigatórios são iguais para todas as operações?", a: "Não. A obrigatoriedade varia conforme a atividade, a natureza da carga e a regulamentação aplicável. A verificação deve ser feita caso a caso." },
  { q: "Frota agregada pode ser considerada?", a: "Sim, há alternativas para frotas próprias, agregadas ou mistas. As condições dependem da seguradora e do perfil de cada veículo." },
  { q: "O seguro de frota também cobre a mercadoria?", a: "Não. O seguro de frota protege o veículo. A mercadoria transportada é objeto de coberturas específicas (seguro de carga)." },
  { q: "O seguro de carga cobre qualquer tipo de produto?", a: "Não. Cada produto possui características de risco próprias, e algumas cargas exigem condições especiais ou possuem exclusões." },
  { q: "Operações interestaduais exigem análise diferente?", a: "Sim. Rota, distâncias, paradas e regiões atendidas influenciam a análise do risco e as condições de aceitação." },
  { q: "É possível reunir diferentes seguros em um único programa?", a: "Sim. O Patro Transportes 360 organiza as proteções de forma integrada, mesmo quando emitidas por seguradoras diferentes." },
  { q: "A Patro Seguros analisa as apólices que já possuímos?", a: "Sim. Uma das etapas do diagnóstico é revisar as apólices vigentes e identificar lacunas ou sobreposições." },
  { q: "Como funciona o atendimento em caso de sinistro?", a: "Apoiamos a comunicação, a documentação e o acompanhamento junto à seguradora. A decisão sobre a indenização cabe à seguradora." },
  { q: "O envio do formulário garante a contratação?", a: "Não. O formulário inicia uma análise consultiva. A contratação depende de proposta, análise e aceitação do risco pela seguradora." },
  { q: "Como mudanças na frota devem ser comunicadas?", a: "Inclusões, exclusões e alterações de veículos devem ser comunicadas para atualização da apólice, evitando descoberturas." },
  { q: "Gerenciamento de riscos substitui o seguro?", a: "Não. O gerenciamento reduz a exposição e apoia a aceitação pelas seguradoras, mas não substitui as coberturas contratadas." },
];

// ---------- Componente ----------
const LpTransportes360 = () => {
  const [values, setValues] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = (source: string) => {
    trackCotacaoClick(source, { insuranceType: "transporte", origin: SOURCE });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleWhatsApp = (ctaKey: string) => {
    trackWhatsAppClick(`${SOURCE}-${ctaKey}`, {
      insuranceType: "transporte",
      origin: SOURCE,
      cta: ctaKey,
      message: WHATSAPP_MESSAGES[ctaKey] ?? DEFAULT_WHATSAPP_MESSAGE,
    });
  };

  const handleChange = (field: keyof FormState, val: string | boolean) => {
    setValues((p) => ({ ...p, [field]: val as never }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const nextStep = () => {
    const parsed = step1Schema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as string;
        if (!errs[k]) errs[k] = i.message;
      });
      setErrors(errs);
      toast.error("Verifique os campos da etapa 1.");
      return;
    }
    setStep(2);
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = step2Schema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as string;
        if (!errs[k]) errs[k] = i.message;
      });
      setErrors(errs);
      toast.error("Verifique os campos da etapa 2.");
      return;
    }
    if (values.website) return; // honeypot

    setIsSubmitting(true);
    try {
      const { error } = await submitLead({
        full_name: values.name,
        email: values.email,
        phone: values.phone,
        insurance_type: "transporte",
        source_page: SOURCE,
        raw_data: {
          company: values.company,
          cnpj: values.cnpj,
          cityState: values.cityState,
          fleetSize: values.fleetSize,
          fleetType: values.fleetType,
          vehicleTypes: values.vehicleTypes,
          cargoTypes: values.cargoTypes,
          routes: values.routes,
          avgShipmentValue: values.avgShipmentValue,
          monthlyShipments: values.monthlyShipments,
          tracking: values.tracking,
          hasPolicies: values.hasPolicies,
          renewalDate: values.renewalDate,
          operationNotes: values.operationNotes,
        },
      });
      if (error) throw error;
      trackCotacaoSubmit("transporte", { origin: SOURCE });
      setSubmitted(true);
      setValues(initialForm);
      setStep(1);
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
      name: "Patro Transportes 360 — Seguros para transportadoras",
      url: "https://patroseguros.lovable.app/lp-transportes-360",
      serviceType: "Seguro para transportadoras, frota e cargas",
      category: "Seguros empresariais para transporte rodoviário de cargas",
      description:
        "Programa consultivo de seguros e gestão de riscos para transportadoras rodoviárias: frota, RCTR-C, RCF-DC, cargas, roubo, avarias, vida de motoristas, instalações e apoio em sinistros.",
      areaServed: [
        { "@type": "City", name: "Guarulhos" },
        { "@type": "AdministrativeArea", name: "Grande São Paulo" },
        { "@type": "Country", name: "Brasil" },
      ],
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Transportadoras rodoviárias de cargas",
      },
      provider: {
        "@type": "InsuranceAgency",
        name: "Patro Seguros",
        url: "https://patroseguros.lovable.app",
        telephone: `+${WHATSAPP_NUMBER}`,
        areaServed: "BR",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Av. Salgado Filho, 2120 – Sala 219 – Edifício Via Alameda",
          addressLocality: "Guarulhos",
          addressRegion: "SP",
          addressCountry: "BR",
        },
      },
      offers: {
        "@type": "Offer",
        name: "Diagnóstico gratuito da operação de transporte",
        price: "0",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: "https://patroseguros.lovable.app/lp-transportes-360#formulario",
      },
    }),
    [],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageMeta
        title="Seguro para Transportadoras e Frota de Cargas"
        description="Patro Transportes 360: seguro para transportadoras com análise de frota, cargas (RCTR-C/RCF-DC), motoristas e gerenciamento de riscos. Solicite um diagnóstico."
        ogType="website"
        ogImage="https://patroseguros.lovable.app/images/og-cover.webp"
        ogImageAlt="Frota de caminhões — Patro Transportes 360, seguros para transportadoras"
        preloadImage={heroImg}
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
              alt="Frota de caminhões em operação logística"
              className="w-full h-full object-cover opacity-25"
              loading="eager"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
          </div>
          <div className="relative container mx-auto px-4 py-20 md:py-28 max-w-6xl">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs uppercase tracking-wide font-semibold">
                <Truck className="h-4 w-4" /> Patro Transportes 360
              </span>
              <h1 className="mt-6 text-3xl md:text-5xl font-bold leading-tight">
                Proteção completa para sua transportadora continuar em movimento.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/85">
                Seguros e gestão de riscos para quem movimenta o Brasil — frota, cargas, responsabilidades,
                motoristas, instalações e sinistros analisados de forma integrada.
              </p>
              <p className="mt-4 text-base text-white/75 max-w-2xl">
                Conhecemos os desafios de uma operação de transporte e buscamos soluções adequadas ao perfil da sua
                empresa, às suas rotas e às cargas transportadas.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => scrollToForm(`${SOURCE}-hero`)}
                  className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold px-8"
                  aria-label="Solicitar diagnóstico da operação"
                >
                  Solicitar diagnóstico da operação
                </Button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsApp(`${SOURCE}-hero`)}
                  aria-label="Falar com a Patro Seguros no WhatsApp"
                  className="inline-flex items-center gap-2 rounded-md border border-white/40 hover:bg-white/10 px-6 py-3 font-semibold transition-colors"
                >
                  <MessageCircle className="h-5 w-5" /> Falar pelo WhatsApp
                </a>
              </div>

              <p className="mt-6 text-sm text-white/70">
                Uma análise consultiva para identificar riscos, lacunas e oportunidades de proteção.
              </p>
            </div>
          </div>
        </section>

        {/* CHECKLIST */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Diagnóstico rápido</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                Sua transportadora está realmente protegida?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Contratar apólices separadamente pode deixar lacunas difíceis de perceber. O Patro Transportes 360
                analisa a operação de maneira integrada.
              </p>
            </div>

            <ul className="grid md:grid-cols-2 gap-3">
              {checkQuestions.map((q) => (
                <li key={q} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <FileWarning className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{q}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 text-center">
              <Button
                size="lg"
                onClick={() => scrollToForm(`${SOURCE}-checklist`)}
                className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold"
                aria-label="Quero revisar minhas proteções"
              >
                Quero revisar minhas proteções
              </Button>
            </div>
          </div>
        </section>

        {/* SOLUÇÕES */}
        <section id="solucoes" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Programa completo</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">Soluções para transportadoras</h2>
              <p className="mt-4 text-muted-foreground">
                Uma operação de transporte não enfrenta apenas um risco. Por isso, sua proteção também não deve ser
                isolada.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {solutions.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="group rounded-xl border border-border bg-card p-6 hover:border-primary hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs text-muted-foreground text-center max-w-3xl mx-auto">
              As soluções aplicáveis dependem das características da operação, das condições dos produtos disponíveis e
              da análise de aceitação realizada pelas seguradoras.
            </p>
          </div>
        </section>

        {/* JORNADA DA CARGA */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Uma operação, vários riscos</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                Os riscos começam antes de o caminhão entrar na rodovia.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Uma análise adequada considera toda a jornada: instalações, carregamento, veículo, motorista, rota,
                carga, entrega e responsabilidades assumidas pela empresa.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {journey.map((s, i) => (
                <div key={s.title} className="relative rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-sm">{s.title}</h3>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                    {s.risks.map((r) => (
                      <li key={r} className="flex items-start gap-1.5">
                        <span className="text-accent mt-1">•</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONFORMIDADE */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">Conformidade e regulamentação</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                As regras do transporte e dos seguros exigem acompanhamento constante.
              </h2>
              <p className="mt-5 text-white/85 leading-relaxed">
                A regulamentação dos seguros de responsabilidade civil relacionados ao transporte rodoviário de cargas
                passou por ajustes em março de 2026. Mudanças regulatórias reforçam a importância de revisar a
                operação, identificar quais seguros são aplicáveis e manter as contratações alinhadas às atividades
                efetivamente realizadas.
              </p>
              <p className="mt-4 text-white/70 text-sm">
                A Patro Seguros acompanha as informações fornecidas pelos órgãos reguladores e seguradoras para
                orientar cada cliente de acordo com seu perfil operacional.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  onClick={() => scrollToForm(`${SOURCE}-regulatorio`)}
                  className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold"
                  aria-label="Solicitar revisão das apólices"
                >
                  Solicitar revisão das apólices
                </Button>
              </div>
              <p className="mt-8 text-xs text-white/60 max-w-2xl mx-auto">
                As informações desta página têm caráter geral e não substituem análise jurídica, regulatória ou
                contratual. A obrigatoriedade, adequação e abrangência dos seguros devem ser verificadas conforme a
                legislação vigente, a atividade exercida e as características da operação.
              </p>
            </div>
          </div>
        </section>

        {/* DIFERENCIAL */}
        <section id="diferenciais" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Diferencial</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                Mais do que reunir apólices: compreender a operação.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-card border border-border p-8">
                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                  <XCircle className="h-5 w-5" />
                  <h3 className="font-semibold text-lg">Contratação fragmentada</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Apólices tratadas separadamente.</li>
                  <li>• Informações distribuídas entre diferentes fornecedores.</li>
                  <li>• Renovações sem visão consolidada.</li>
                  <li>• Dificuldade para identificar lacunas.</li>
                  <li>• Atendimento reativo após ocorrências.</li>
                </ul>
              </div>
              <div className="rounded-xl bg-primary text-primary-foreground p-8 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-lg">Patro Transportes 360</h3>
                </div>
                <ul className="space-y-3 text-sm text-white/90">
                  <li>• Diagnóstico integrado da operação.</li>
                  <li>• Mapeamento dos principais riscos.</li>
                  <li>• Centralização das apólices e renovações.</li>
                  <li>• Análise de frota, cargas e responsabilidades.</li>
                  <li>• Apoio preventivo e acompanhamento de sinistros.</li>
                  <li>• Visão consolidada das proteções contratadas.</li>
                </ul>
              </div>
            </div>

            <p className="mt-10 text-center text-lg font-medium text-foreground max-w-3xl mx-auto">
              “Antes de indicar um seguro, entendemos o que sua empresa transporta, como transporta e quais
              responsabilidades assume.”
            </p>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section id="como-funciona" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Processo</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">Como funciona?</h2>
            </div>

            <ol className="space-y-6 md:space-y-0 md:grid md:grid-cols-5 md:gap-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex md:flex-col gap-4 md:gap-3 md:text-center">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold md:mx-auto shadow-md">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ASSISTÊNCIA EM SINISTROS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wide text-primary">Assistência em sinistros</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                  Quando ocorre um sinistro, sua empresa precisa de orientação e agilidade.
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  A Patro Seguros auxilia na comunicação da ocorrência, organização dos documentos, acompanhamento do
                  processo e interação com a seguradora.
                </p>
                <p className="mt-6 text-xs text-muted-foreground rounded-md border border-border p-3 bg-muted/40">
                  O acompanhamento da corretora não implica garantia de cobertura, prazo ou indenização. A decisão
                  sobre o sinistro cabe à seguradora, conforme a apólice e a análise do evento.
                </p>
              </div>
              <ul className="space-y-3">
                {claimsSupport.map((t) => (
                  <li key={t} className="flex items-start gap-3 rounded-lg bg-card border border-border p-4">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FORMULÁRIO */}
        <section ref={formRef} id="contato" className="py-20 bg-muted/30 scroll-mt-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-8">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Diagnóstico da operação</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                Solicite um diagnóstico inicial da sua transportadora
              </h2>
            </div>

            {submitted ? (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Recebemos suas informações.</h3>
                <p className="mt-3 text-muted-foreground">
                  Nossa equipe entrará em contato para conhecer melhor a operação. O envio do formulário não representa
                  proposta, contratação, aceitação do risco ou garantia de cobertura.
                </p>
                <div className="mt-6">
                  <a
                    href={WHATSAPP_URL}
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
                className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm"
              >
                {/* Progresso */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-2">
                    <span className={step === 1 ? "text-primary" : ""}>1. Contato</span>
                    <span className={step === 2 ? "text-primary" : ""}>2. Operação</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: step === 1 ? "50%" : "100%" }}
                    />
                  </div>
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={values.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {step === 1 ? (
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <Field label="Nome" required error={errors.name}>
                        <input type="text" value={values.name} onChange={(e) => handleChange("name", e.target.value)} className={inputCls(errors.name)} autoComplete="name" required />
                      </Field>
                      <Field label="Empresa" required error={errors.company}>
                        <input type="text" value={values.company} onChange={(e) => handleChange("company", e.target.value)} className={inputCls(errors.company)} autoComplete="organization" required />
                      </Field>
                      <Field label="CNPJ (opcional)" error={errors.cnpj}>
                        <input type="text" value={values.cnpj} onChange={(e) => handleChange("cnpj", maskCNPJ(e.target.value))} className={inputCls(errors.cnpj)} placeholder="00.000.000/0000-00" inputMode="numeric" />
                      </Field>
                      <Field label="Telefone / WhatsApp" required error={errors.phone}>
                        <input type="tel" value={values.phone} onChange={(e) => handleChange("phone", maskPhone(e.target.value))} className={inputCls(errors.phone)} autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" required />
                      </Field>
                      <Field label="E-mail corporativo" required error={errors.email}>
                        <input type="email" value={values.email} onChange={(e) => handleChange("email", e.target.value)} className={inputCls(errors.email)} autoComplete="email" required />
                      </Field>
                      <Field label="Cidade e estado" required error={errors.cityState}>
                        <input type="text" value={values.cityState} onChange={(e) => handleChange("cityState", e.target.value)} className={inputCls(errors.cityState)} placeholder="Ex.: Guarulhos / SP" required />
                      </Field>
                    </div>
                    <div className="flex justify-end">
                      <Button type="button" size="lg" onClick={nextStep} className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold">
                        Avançar <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <Field label="Quantidade de veículos" required error={errors.fleetSize}>
                        <input type="text" inputMode="numeric" value={values.fleetSize} onChange={(e) => handleChange("fleetSize", e.target.value)} className={inputCls(errors.fleetSize)} required />
                      </Field>
                      <Field label="Modelo de frota" required error={errors.fleetType}>
                        <select value={values.fleetType} onChange={(e) => handleChange("fleetType", e.target.value)} className={inputCls(errors.fleetType)} required>
                          <option value="">Selecione</option>
                          <option value="Própria">Própria</option>
                          <option value="Agregada">Agregada</option>
                          <option value="Terceirizada">Terceirizada</option>
                          <option value="Mista">Mista</option>
                        </select>
                      </Field>
                      <Field label="Principais tipos de veículos" required error={errors.vehicleTypes}>
                        <input type="text" value={values.vehicleTypes} onChange={(e) => handleChange("vehicleTypes", e.target.value)} className={inputCls(errors.vehicleTypes)} placeholder="Ex.: Truck, carreta, VUC…" required />
                      </Field>
                      <Field label="Tipos de carga transportados" required error={errors.cargoTypes}>
                        <input type="text" value={values.cargoTypes} onChange={(e) => handleChange("cargoTypes", e.target.value)} className={inputCls(errors.cargoTypes)} placeholder="Ex.: E-commerce, alimentos…" required />
                      </Field>
                      <Field label="Regiões e rotas atendidas" required error={errors.routes}>
                        <input type="text" value={values.routes} onChange={(e) => handleChange("routes", e.target.value)} className={inputCls(errors.routes)} placeholder="Ex.: SP, Sudeste, nacional…" required />
                      </Field>
                      <Field label="Valor médio por embarque" error={errors.avgShipmentValue}>
                        <input type="text" value={values.avgShipmentValue} onChange={(e) => handleChange("avgShipmentValue", e.target.value)} className={inputCls(errors.avgShipmentValue)} placeholder="Ex.: R$ 80.000" />
                      </Field>
                      <Field label="Embarques por mês" error={errors.monthlyShipments}>
                        <input type="text" inputMode="numeric" value={values.monthlyShipments} onChange={(e) => handleChange("monthlyShipments", e.target.value)} className={inputCls(errors.monthlyShipments)} />
                      </Field>
                      <Field label="Possui rastreamento?" required error={errors.tracking}>
                        <select value={values.tracking} onChange={(e) => handleChange("tracking", e.target.value)} className={inputCls(errors.tracking)} required>
                          <option value="">Selecione</option>
                          <option value="Sim">Sim</option>
                          <option value="Não">Não</option>
                          <option value="Parcial">Parcial</option>
                        </select>
                      </Field>
                      <Field label="Possui apólices vigentes?" required error={errors.hasPolicies}>
                        <select value={values.hasPolicies} onChange={(e) => handleChange("hasPolicies", e.target.value)} className={inputCls(errors.hasPolicies)} required>
                          <option value="">Selecione</option>
                          <option value="Sim">Sim</option>
                          <option value="Não">Não</option>
                          <option value="Não sei">Não sei</option>
                        </select>
                      </Field>
                      <Field label="Data da próxima renovação" error={errors.renewalDate}>
                        <input type="date" value={values.renewalDate} onChange={(e) => handleChange("renewalDate", e.target.value)} className={inputCls(errors.renewalDate)} />
                      </Field>
                    </div>

                    <Field label="Conte brevemente como funciona sua operação" error={errors.operationNotes}>
                      <textarea value={values.operationNotes} onChange={(e) => handleChange("operationNotes", e.target.value)} className={inputCls(errors.operationNotes) + " min-h-[110px] resize-y"} maxLength={1500} />
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
                        </a>.
                      </span>
                    </label>
                    {errors.consent && <p className="text-xs text-destructive -mt-3">{errors.consent}</p>}

                    <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between pt-2">
                      <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
                        Voltar
                      </Button>
                      <Button type="submit" size="lg" disabled={isSubmitting} className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold">
                        {isSubmitting ? "Enviando…" : "Solicitar diagnóstico"}
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      O envio do formulário não representa proposta, contratação, aceitação do risco ou garantia de cobertura.
                    </p>
                  </div>
                )}
              </form>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">Perguntas frequentes</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">FAQ</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border bg-card overflow-hidden">
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
        <section className="relative py-20 bg-primary text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={heroImg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          </div>
          <div className="relative container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Sua transportadora movimenta negócios. Nós ajudamos a proteger essa jornada.
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Solicite uma análise integrada de frota, cargas, responsabilidades, instalações, motoristas e processos
              de sinistro.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button
                size="lg"
                onClick={() => scrollToForm(`${SOURCE}-cta-final`)}
                className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold px-8"
                aria-label="Solicitar diagnóstico da operação"
              >
                Solicitar diagnóstico da operação
              </Button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsApp(`${SOURCE}-cta-final`)}
                aria-label="Conversar pelo WhatsApp"
                className="inline-flex items-center gap-2 rounded-md border border-white/40 hover:bg-white/10 px-6 py-3 font-semibold transition-colors"
              >
                <MessageCircle className="h-5 w-5" /> Conversar pelo WhatsApp
              </a>
            </div>
            <p className="mt-8 text-xs text-white/60 flex items-center justify-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {CONTACT_PHONE}</span>
              <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {CONTACT_EMAIL}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {CITY}</span>
            </p>
            <p className="mt-8 text-xs text-white/50 max-w-3xl mx-auto">
              A contratação dos seguros está sujeita às condições do produto e à análise e aceitação do risco pela
              seguradora. Coberturas, exclusões, limites, franquias e serviços variam conforme a apólice contratada.
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
  label, required, error, children,
}: { label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="block text-sm font-medium mb-1.5">
      {label} {required && <span className="text-destructive">*</span>}
    </span>
    {children}
    {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
  </label>
);

export default LpTransportes360;