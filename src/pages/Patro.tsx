import { Link } from "react-router-dom";
import { Fragment } from "react";
import {
  ArrowRight,
  Car,
  Heart,
  Home as HomeIcon,
  Building2,
  Shield,
  Tractor,
  Briefcase,
  Plane,
  CheckCircle2,
  Clock,
  Award,
  Users,
  Phone,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import OptimizedImage from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import heroImage from "@/assets/hero-home.webp";

const WHATSAPP_URL =
  "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pela%20landing%20Patro%20e%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o.";

const heading = { fontFamily: '"Urbanist", system-ui, sans-serif' } as const;
const body = { fontFamily: '"Epilogue", system-ui, sans-serif' } as const;

const products = [
  { icon: Car, title: "Auto & Moto", desc: "Porto, Allianz, HDI, Tokio, Bradesco.", href: "/seguro-auto" },
  { icon: HomeIcon, title: "Residencial", desc: "Casa, apartamento e alto padrão.", href: "/seguro-residencial" },
  { icon: Heart, title: "Vida & Saúde", desc: "16+ seguradoras, 20+ operadoras.", href: "/planos-de-saude" },
  { icon: Building2, title: "Empresarial & Galpões", desc: "PMEs, condomínios, riscos patrimoniais.", href: "/seguro-empresarial" },
  { icon: Tractor, title: "Agro", desc: "Penhor rural, máquinas e granjas — nacional.", href: "/seguro-agro" },
  { icon: Briefcase, title: "RC Profissional", desc: "Médicos, advogados, engenheiros e mais.", href: "/seguro-rc-profissional" },
  { icon: Shield, title: "Frota & Transporte", desc: "Cargas, frotas e veículos pesados.", href: "/seguro-frota" },
  { icon: Plane, title: "Viagem & Bens", desc: "Viagem, celular, bike e equipamentos.", href: "/seguro-viagem" },
];

const proof = [
  { value: "4.7/5", label: "Avaliação no Google" },
  { value: "500+", label: "PMEs atendidas" },
  { value: "16+", label: "Seguradoras parceiras" },
  { value: "2h", label: "Cotação comparativa" },
];

const steps = [
  { n: "01", title: "Conte o que precisa", desc: "WhatsApp, formulário ou telefone — em 3 minutos." },
  { n: "02", title: "Recebe propostas em 2h", desc: "Comparamos 16+ seguradoras com transparência total." },
  { n: "03", title: "Contrate com suporte", desc: "Corretor SUSEP cuida da apólice, renovação e sinistro." },
];

const faqs = [
  {
    question: "A Patro Seguros atende fora de Guarulhos?",
    answer:
      "Sim. Sede em Guarulhos/SP, com atendimento em toda a Grande São Paulo, no estado e em todo o Brasil para Agro, RC Profissional, Galpões e Empresariais.",
  },
  {
    question: "Quanto custa contratar pela corretora?",
    answer:
      "Nada. A remuneração da corretora vem da seguradora — você paga o mesmo valor da contratação direta, mas com suporte completo de um corretor SUSEP.",
  },
  {
    question: "Em quanto tempo recebo a cotação?",
    answer:
      "Cotação comparativa em até 2 horas úteis, com explicação detalhada de coberturas, franquias e preços das principais seguradoras.",
  },
  {
    question: "Quais seguros a Patro oferece?",
    answer:
      "Auto, Moto, Residencial, Vida, Saúde, Odonto, Empresarial, Frota, Cyber, RC Profissional, Condomínio, Viagem, Celular, Previdência, Consórcios e Agro/Rural.",
  },
];

const Patro = () => {
  return (
    <Fragment>
      <PageMeta
        title="Patro Corretora de Seguros — Cotação em 2h | Guarulhos/SP"
        description="Patro Seguros: corretora SUSEP em Guarulhos com cotação comparativa em 2h. 16+ seguradoras, atendimento humano e suporte completo em sinistros. Fale no WhatsApp."
      />
      <FAQSchema faqs={faqs} />
      <Header />

      <main id="main-content" className="bg-white" style={body}>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#003366] text-white">
          <div className="absolute inset-0 opacity-20">
            <OptimizedImage
              src={heroImage}
              alt=""
              className="w-full h-full object-cover"
              eager
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#003366]/95 to-[#1e3a5f]/90" />

          <div className="relative container mx-auto px-4 py-20 lg:py-28 grid lg:grid-cols-12 gap-10 items-center">
            {/* Texto */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider uppercase">
                <Award className="h-3.5 w-3.5 text-[#F2994A]" /> Nota 4.7 no Google · SUSEP
              </span>
              <h1
                className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white"
                style={heading}
              >
                Sua proteção,{" "}
                <span className="text-[#F2994A]">cotada em 2 horas</span> com 16+ seguradoras.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
                A Patro é a corretora que humaniza seguros: comparamos as principais seguradoras do Brasil
                e entregamos a melhor proposta — auto, vida, empresarial, galpões e agro.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/cotacao" onClick={() => trackCotacaoClick("lp-patro-hero")}>
                  <Button size="lg" className="h-14 px-8 text-base font-bold rounded-xl bg-[#F2994A] text-[#003366] hover:bg-[#F2994A]/90 shadow-xl shadow-[#F2994A]/20">
                    Solicitar cotação grátis <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("lp-patro-hero")}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base font-bold rounded-xl bg-white/5 border-white/30 text-white hover:bg-white hover:text-[#003366]"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" /> Falar no WhatsApp
                  </Button>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
                {[
                  "Sem custo na corretagem",
                  "Corretor SUSEP dedicado",
                  "Apoio no sinistro 24/7",
                ].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#F2994A]" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Prova social card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/10 backdrop-blur border border-white/15 p-6 md:p-8 shadow-2xl">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">A Patro em números</p>
                <div className="mt-5 grid grid-cols-2 gap-5">
                  {proof.map((p) => (
                    <div key={p.label} className="rounded-2xl bg-[#003366]/40 border border-white/10 p-4">
                      <p className="text-3xl font-extrabold text-[#F2994A]" style={heading}>{p.value}</p>
                      <p className="text-sm text-white/80 mt-1">{p.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="w-10 h-10 rounded-full bg-[#F2994A]/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-[#F2994A]" />
                  </div>
                  <div>
                    <a href="tel:1151997500" className="text-white font-bold text-lg" style={heading}>
                      (11) 5199-7500
                    </a>
                    <p className="text-xs text-white/60">Cidade Maia · Guarulhos/SP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUTOS */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-12">
              <p className="text-xs uppercase tracking-[0.2em] text-[#F2994A] font-bold">Coberturas</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#003366] tracking-tight" style={heading}>
                Um corretor. Todas as proteções que importam.
              </h2>
              <p className="mt-3 text-slate-600">
                Comparamos as principais seguradoras do Brasil para você não pagar mais — e não cobrir menos.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map(({ icon: Icon, title, desc, href }) => (
                <Link key={title} to={href} className="group">
                  <Card className="h-full border-slate-200 hover:border-[#003366] hover:shadow-xl transition-all rounded-2xl">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-[#003366]/5 flex items-center justify-center mb-4 group-hover:bg-[#F2994A]/10 transition-colors">
                        <Icon className="h-6 w-6 text-[#003366] group-hover:text-[#F2994A] transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-[#003366]" style={heading}>{title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{desc}</p>
                      <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#003366] group-hover:text-[#F2994A]">
                        Ver detalhes <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs uppercase tracking-[0.2em] text-[#F2994A] font-bold">Como funciona</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#003366] tracking-tight" style={heading}>
                Cotação em 3 passos. Suporte para sempre.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((s) => (
                <div key={s.n} className="rounded-2xl bg-white border border-slate-200 p-7 shadow-sm">
                  <p className="text-[#F2994A] text-sm font-extrabold tracking-widest" style={heading}>{s.n}</p>
                  <h3 className="mt-2 text-xl font-bold text-[#003366]" style={heading}>{s.title}</h3>
                  <p className="mt-2 text-slate-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#F2994A] font-bold">Por que Patro</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#003366] tracking-tight" style={heading}>
                Atendimento humano. Decisão técnica. Resultado para o seu bolso.
              </h2>
              <div className="mt-8 space-y-5">
                {[
                  { icon: Clock, t: "Cotação em até 2h úteis", d: "Resposta rápida, sem você ficar refém de call center." },
                  { icon: Users, t: "Corretor SUSEP dedicado", d: "Mesma pessoa do orçamento ao sinistro." },
                  { icon: Shield, t: "16+ seguradoras", d: "Porto, Allianz, HDI, Tokio Marine, Bradesco e mais." },
                  { icon: Award, t: "500+ PMEs atendidas", d: "Especialistas em galpões, agro, RC e empresarial." },
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t} className="flex gap-4">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-[#003366] flex items-center justify-center">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[#003366]" style={heading}>{t}</p>
                      <p className="text-slate-600 text-sm">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#003366] text-white p-8 md:p-10 shadow-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-[#F2994A] font-bold">Pronto para começar?</p>
              <h3 className="mt-3 text-2xl md:text-3xl font-extrabold leading-tight" style={heading}>
                Receba sua cotação comparativa hoje, sem compromisso.
              </h3>
              <p className="mt-3 text-white/75">
                Em 3 minutos você envia seus dados. Em 2 horas você recebe as melhores propostas do mercado.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link to="/cotacao" onClick={() => trackCotacaoClick("lp-patro-cta")}>
                  <Button size="lg" className="h-13 px-7 font-bold rounded-xl bg-[#F2994A] text-[#003366] hover:bg-[#F2994A]/90 w-full sm:w-auto">
                    Quero minha cotação <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("lp-patro-cta")}
                >
                  <Button size="lg" variant="outline" className="h-13 px-7 font-bold rounded-xl bg-white/5 border-white/30 text-white hover:bg-white hover:text-[#003366] w-full sm:w-auto">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp direto
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#F2994A] font-bold text-center">FAQ</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#003366] tracking-tight text-center" style={heading}>
              Perguntas frequentes
            </h2>
            <div className="mt-10 space-y-4" data-speakable="faq">
              {faqs.map((f) => (
                <div key={f.question} className="rounded-2xl bg-white border border-slate-200 p-6">
                  <h3 className="font-bold text-[#003366]" style={heading}>{f.question}</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Fragment>
  );
};

export default Patro;