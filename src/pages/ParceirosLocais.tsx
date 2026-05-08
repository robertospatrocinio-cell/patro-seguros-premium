import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Handshake,
  Wrench,
  Car,
  Building2,
  GraduationCap,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import { trackWhatsAppClick, trackInternalLinkClick } from "@/lib/tracking";

const PHONE = "551151997500";
const EMAIL = "parcerias@patroseguros.com.br";
const WA_MSG =
  "Olá! Tenho um negócio em Guarulhos e quero conhecer o programa Parceiros Locais da Patro Seguros.";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MSG)}`;

const SEGMENTS = [
  {
    icon: Wrench,
    title: "Oficinas mecânicas e funilarias",
    description:
      "Indicamos sua oficina para sinistros de seguro auto em Guarulhos, Cidade Maia, Cumbica e região. Você recebe fluxo qualificado de clientes e troca de backlink no nosso hub de oficinas referenciadas.",
  },
  {
    icon: GraduationCap,
    title: "Autoescolas e CFCs",
    description:
      "Parceria para alunos recém-habilitados em Guarulhos: condições especiais de seguro auto e moto, conteúdo coproduzido e link recíproco entre os sites.",
  },
  {
    icon: Car,
    title: "Concessionárias e revendas",
    description:
      "Cotação imediata na entrega do veículo, atendimento presencial em Guarulhos e link parceiro no nosso hub de modelos.",
  },
  {
    icon: Building2,
    title: "Imobiliárias e administradoras",
    description:
      "Seguro fiança locatícia, residencial e condomínio em Guarulhos com condições preferenciais e cross-link entre páginas locais.",
  },
  {
    icon: Stethoscope,
    title: "Clínicas e profissionais liberais",
    description:
      "RC profissional para médicos, dentistas, advogados, engenheiros e veterinários em Guarulhos. Indicação mútua e backlink temático.",
  },
  {
    icon: ShieldCheck,
    title: "Rastreadores e segurança veicular",
    description:
      "Empresas de rastreamento, blindagem e cercamento que atendem Guarulhos: indicação mútua + página parceira com link.",
  },
];

const BENEFITS = [
  "Tráfego qualificado: linkamos seu negócio em páginas com bom posicionamento local em Guarulhos.",
  "Indicação ativa: sua marca entra no roteiro de recomendação dos nossos consultores.",
  "Conteúdo coproduzido: artigos e páginas conjuntas focadas no público de Guarulhos.",
  "Backlink contextual em páginas temáticas (não em rodapé/diretório genérico).",
  "Sem custo financeiro — parceria por troca de valor e indicação mútua.",
];

const REQUIREMENTS = [
  "Empresa formalizada (CNPJ ativo) com atendimento na Grande SP, preferencialmente Guarulhos.",
  "Site institucional com bom estado técnico (sem malware, https ativo).",
  "Reputação consistente — avaliações 4.0+ no Google ou referências verificáveis.",
  "Disposição para indicar a Patro Seguros quando fizer sentido para seu cliente.",
];

const FAQS = [
  {
    question: "Como funciona a troca de backlinks com a Patro Seguros?",
    answer:
      "Após validação rápida do seu site e do seu negócio, criamos uma menção contextual em uma página temática relevante (ex: hub de oficinas, página de seguro residencial). Em troca, pedimos um link da sua página institucional para uma página específica da Patro, alinhada ao seu público.",
  },
  {
    question: "Tem custo para participar do programa?",
    answer:
      "Não. Parceiros Locais é um programa por troca de valor: tráfego, indicação e backlinks. Pode haver remuneração eventual em casos de comissionamento por indicação fechada — mas isso é negociado caso a caso.",
  },
  {
    question: "Quais tipos de empresa não entram no programa?",
    answer:
      "Não trabalhamos com sites de baixa qualidade (PBN, diretórios spam, conteúdo duplicado), empresas sem CNPJ, ou negócios cujo público não tem qualquer aderência com seguros pessoais ou empresariais.",
  },
  {
    question: "Quanto tempo leva para validar uma parceria?",
    answer:
      "Em média 5 a 10 dias úteis: análise de site, alinhamento de proposta, escolha das páginas que receberão os links e publicação.",
  },
  {
    question: "Posso indicar mais de um link/área?",
    answer:
      "Pode. Avaliamos cada caso para garantir que cada link entregue valor real para o leitor — evitamos links repetitivos ou fora de contexto.",
  },
];

const ParceirosLocais = () => {
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
        title="Parceiros Locais — Programa de Indicação e Backlinks em Guarulhos"
        description="Programa Parceiros Locais da Patro Seguros: oficinas, autoescolas, concessionárias, imobiliárias, clínicas e empresas de rastreamento em Guarulhos. Indicação mútua e troca de backlinks contextuais."
      />
      <FAQSchema faqs={FAQS} />
      <Header />

      <main className="bg-background">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb
            items={[
              { label: "Sobre", href: "/sobre" },
              { label: "Parceiros Locais", href: "/parceiros-locais" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="section-label inline-flex items-center gap-1">
              <Handshake className="h-3.5 w-3.5" /> Programa Parceiros Locais
            </span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Parcerias e backlinks locais em Guarulhos
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Conectamos a Patro Seguros a oficinas, autoescolas, concessionárias, imobiliárias,
              clínicas e empresas de segurança veicular de Guarulhos e região. Indicação mútua,
              conteúdo conjunto e troca de backlinks contextuais — sem custo.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("parceiros-locais:hero")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--cta))] hover:opacity-90 text-white font-semibold px-6 py-3 transition-opacity"
              >
                <MessageCircle className="h-5 w-5" /> Propor parceria via WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  "Proposta de parceria local — Guarulhos",
                )}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 transition-colors"
              >
                <Mail className="h-5 w-5" /> {EMAIL}
              </a>
            </div>
          </div>
        </section>

        {/* Segments */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">
              Quem buscamos como parceiro
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
              Negócios locais com público que se beneficia de seguros pessoais, veiculares,
              residenciais ou empresariais.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SEGMENTS.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition-shadow"
                >
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

        {/* Benefits + Requirements */}
        <section className="py-14 bg-primary/5 border-y border-border">
          <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-card border border-border p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                Benefícios para parceiros
              </h2>
              <ul className="space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-card border border-border p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                Requisitos mínimos
              </h2>
              <ul className="space-y-3">
                {REQUIREMENTS.map((r) => (
                  <li key={r} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              Como funciona
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { t: "1. Contato", d: "Envie WhatsApp ou e-mail com link do seu site e área de atuação." },
                { t: "2. Análise", d: "Avaliamos seu site, público e potencial de sinergia em até 5 dias úteis." },
                { t: "3. Proposta", d: "Definimos as páginas alvo, formato do link e cláusulas de indicação mútua." },
                { t: "4. Publicação", d: "Publicamos as menções nos dois sites e iniciamos a troca de indicações." },
              ].map((s) => (
                <li key={s.t} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Quer propor uma parceria?</h2>
            <p className="mt-3 text-primary-foreground/80">
              Fale com nosso time de parcerias. Respondemos em até 1 dia útil.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("parceiros-locais:cta")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-primary font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp parcerias
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 text-white font-semibold px-6 py-3 hover:bg-white/10 transition-colors"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                {copied ? "E-mail copiado!" : `Copiar ${EMAIL}`}
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

        {/* Cross-link */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">É jornalista ou produtor de conteúdo?</p>
            <Link
              to="/imprensa"
              onClick={() =>
                trackInternalLinkClick({
                  source: "parceiros-locais",
                  destination: "/imprensa",
                  label: "Sala de imprensa",
                })
              }
              className="mt-2 inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Acesse nossa Sala de Imprensa <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ParceirosLocais;