import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, ShieldCheck, Sparkles, Users, ArrowRight, Loader2, MessageCircle, Handshake, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import ServiceSchema from "@/components/ServiceSchema";
import FAQSchema from "@/components/FAQSchema";
import ContextualSeoHub from "@/components/ContextualSeoHub";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { safeInvoke } from "@/lib/supabase-helpers";
import { escapeHtml } from "@/lib/utils";
import { trackWhatsAppClick } from "@/lib/tracking";
import { EMPRESA } from "@/config/empresa";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const INSURANCE_OPTIONS = [
  "Seguro Auto",
  "Seguro Residencial",
  "Seguro de Vida",
  "Plano de Saúde",
  "Seguro Empresarial",
  "Consórcio",
  "Outro / Não sei",
] as const;

const RELATIONSHIP_OPTIONS = [
  "Amigo(a)",
  "Familiar",
  "Colega de trabalho",
  "Vizinho(a)",
  "Cliente / Parceiro",
  "Outro",
] as const;

const schema = z.object({
  referrerName: z.string().trim().min(3, "Informe seu nome completo"),
  referrerEmail: z.string().trim().email("E-mail inválido"),
  referrerPhone: z.string().trim().min(10, "Informe seu WhatsApp com DDD"),
  referredName: z.string().trim().min(3, "Informe o nome do indicado"),
  referredPhone: z.string().trim().min(10, "Informe o WhatsApp do indicado"),
  referredEmail: z.string().trim().email("E-mail inválido").or(z.literal("")).optional(),
  insuranceType: z.string().min(1, "Selecione o interesse"),
  relationship: z.string().min(1, "Selecione a relação"),
  notes: z.string().max(500).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "É necessário autorizar o contato" }) }),
});

type FormValues = z.infer<typeof schema>;

const STORAGE_KEY = "patro_indicacao_success";

const IndiqueEGanhe = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { insuranceType: "", relationship: "", referredEmail: "", notes: "" },
  });

  const insuranceType = watch("insuranceType");
  const relationship = watch("relationship");

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const { error: insertError } = await supabase.from("referrals").insert({
        referrer_name: values.referrerName,
        referrer_email: values.referrerEmail,
        referrer_phone: values.referrerPhone,
        referrer_relationship: values.relationship,
        referred_name: values.referredName,
        referred_phone: values.referredPhone,
        referred_email: values.referredEmail || null,
        insurance_type_interest: values.insuranceType,
        notes: values.notes || null,
        source_page: "/indique-e-ganhe",
        user_agent: navigator.userAgent.slice(0, 500),
        status: "pending",
      });

      if (insertError) {
        console.error("Referral insert error", insertError);
        toast.error(insertError.message || "Não foi possível registrar sua indicação.");
        setSubmitting(false);
        return;
      }

      const digits = values.referredPhone.replace(/\D/g, "");
      const firstName = values.referredName.split(" ")[0];
      const referrerFirst = values.referrerName.split(" ")[0];
      const waBrokerMsg = `Olá ${firstName}, aqui é da Patro Seguros. ${referrerFirst} indicou você para receber uma cotação de ${values.insuranceType}. Podemos conversar?`;
      const waBrokerUrl = `https://wa.me/${digits}?text=${encodeURIComponent(waBrokerMsg)}`;

      const subject = `Nova Indicação: ${values.referredName} (${values.insuranceType})`;
      const textBody = [
        "Nova indicação recebida via /indique-e-ganhe",
        "",
        "QUEM INDICOU",
        `Nome: ${values.referrerName}`,
        `E-mail: ${values.referrerEmail}`,
        `WhatsApp: ${values.referrerPhone}`,
        `Relação: ${values.relationship}`,
        "",
        "PESSOA INDICADA",
        `Nome: ${values.referredName}`,
        `WhatsApp: ${values.referredPhone}`,
        `E-mail: ${values.referredEmail || "não informado"}`,
        `Interesse: ${values.insuranceType}`,
        "",
        "OBSERVAÇÕES",
        values.notes || "(sem observações)",
        "",
        "Abrir WhatsApp direto com o indicado:",
        waBrokerUrl,
      ].join("\n");

      const htmlBody = `
        <h2 style="color:#003366">Nova indicação — Patro Seguros</h2>
        <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif">
          <tr><td colspan="2" style="background:#003366;color:#fff;padding:8px"><strong>Quem indicou</strong></td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd">Nome</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.referrerName)}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd">E-mail</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.referrerEmail)}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd">WhatsApp</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.referrerPhone)}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd">Relação</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.relationship)}</td></tr>
          <tr><td colspan="2" style="background:#F2994A;color:#fff;padding:8px"><strong>Pessoa indicada</strong></td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd">Nome</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.referredName)}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd">WhatsApp</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.referredPhone)}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd">E-mail</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.referredEmail || "—")}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd">Interesse</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.insuranceType)}</td></tr>
          <tr><td style="padding:6px;border:1px solid #ddd">Observações</td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.notes || "—")}</td></tr>
        </table>
        <p style="margin-top:16px">
          <a href="${waBrokerUrl}" style="background:#25D366;color:#fff;padding:10px 18px;text-decoration:none;border-radius:6px;font-weight:bold">Abrir WhatsApp com o indicado</a>
        </p>
      `;

      await safeInvoke("send-form-email", { subject, textBody, htmlBody });

      const waFriendlyMsg = `Olá ${firstName}! Acabei de te indicar para a Patro Seguros, uma corretora séria em Guarulhos/SP que cuida do meu ${values.insuranceType.toLowerCase()}. Vale a pena pedir uma cotação: https://www.patroseguros.com.br/cotacao`;
      const waFriendUrl = `https://wa.me/${digits}?text=${encodeURIComponent(waFriendlyMsg)}`;

      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          referrerName: values.referrerName,
          referredName: values.referredName,
          insuranceType: values.insuranceType,
          waFriendUrl,
          submittedAt: Date.now(),
        }),
      );

      navigate("/obrigado-indicacao");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "Como funciona o programa de indicação da Patro Seguros?",
      answer:
        "É simples: você preenche o formulário com seus dados e os do amigo, familiar ou colega que gostaria de indicar. Nossa equipe entra em contato com a pessoa em até 24 horas úteis para oferecer uma cotação personalizada, sem custo e sem compromisso.",
    },
    {
      question: "Preciso ser cliente da Patro Seguros para indicar?",
      answer:
        "Não. Qualquer pessoa pode indicar. Só pedimos que a pessoa indicada saiba que você forneceu os dados dela e concorde em receber nosso contato, respeitando a LGPD.",
    },
    {
      question: "O que a pessoa indicada recebe?",
      answer:
        "Ela recebe um atendimento consultivo (não é venda por telefone), com comparação de propostas de mais de 16 seguradoras parceiras e análise de coberturas de acordo com o perfil dela.",
    },
    {
      question: "Existe algum custo ou compromisso para o indicado?",
      answer:
        "Nenhum. A cotação é gratuita e a pessoa só contrata se realmente encontrar uma proposta que faça sentido.",
    },
    {
      question: "Como vocês agradecem quem indica?",
      answer:
        "Cada indicação é registrada e nossa equipe entra em contato pessoalmente para agradecer. Indicadores frequentes recebem atenção prioritária no atendimento e revisões gratuitas de apólices.",
    },
    {
      question: "Meus dados e os do indicado ficam seguros?",
      answer:
        `Sim. Somos uma corretora habilitada pela SUSEP (registro ${EMPRESA.susep}) e seguimos a LGPD. Os dados são usados exclusivamente para o contato comercial e não são vendidos ou compartilhados com terceiros.`,
    },
  ];

  return (
    <Fragment>
      <PageMeta
        title="Indique um amigo e fortaleça sua rede | Patro Seguros"
        description="Programa oficial de indicações da Patro Seguros. Indique amigos, familiares e parceiros para receber cotações de seguros com atendimento especializado em Guarulhos/SP."
        canonicalPath="/indique-e-ganhe"
      />
      <ServiceSchema
        name="Programa de Indicações Patro Seguros"
        description="Programa institucional de indicações da Patro Seguros: clientes e parceiros indicam amigos, familiares e colegas para receber cotação gratuita de seguros com atendimento consultivo em Guarulhos/SP."
        serviceType="ReferralProgram"
        
      />
      <FAQSchema faqs={faqs} />
      <Header />

      <main>
        <section className="relative bg-gradient-to-br from-[#003366] via-[#003366] to-[#00509d] text-white overflow-hidden">
          <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-6 backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-[#F2994A]" />
                  Programa oficial de indicações
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Indique quem você <span className="text-[#F2994A]">confia</span>. Fortaleça a rede que confia em você.
                </h1>
                <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
                  Boca a boca é a maior prova social de uma corretora. Se a Patro Seguros te atende bem, indique alguém que também merece atendimento consultivo, sem enrolação e com acesso a 16+ seguradoras parceiras.
                </p>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-[#F2994A]" />
                    <span>SUSEP {EMPRESA.susep}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#F2994A]" />
                    <span>500+ famílias e empresas atendidas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#F2994A]" />
                    <span>4,9/5 no Google</span>
                  </div>
                </div>
              </div>

              <div id="formulario" className="bg-white text-foreground rounded-2xl shadow-2xl p-6 md:p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-2 text-[#003366]">Fazer uma indicação</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Leva menos de 1 minuto. Entraremos em contato em até 24h úteis.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <fieldset className="space-y-3">
                    <legend className="text-xs font-bold uppercase tracking-wider text-[#003366] mb-1">Seus dados</legend>
                    <div>
                      <Label htmlFor="referrerName">Seu nome completo *</Label>
                      <Input id="referrerName" {...register("referrerName")} placeholder="Ex.: Ana Souza" />
                      {errors.referrerName && <p className="text-xs text-red-600 mt-1">{errors.referrerName.message}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="referrerEmail">Seu e-mail *</Label>
                        <Input id="referrerEmail" type="email" {...register("referrerEmail")} placeholder="voce@email.com" />
                        {errors.referrerEmail && <p className="text-xs text-red-600 mt-1">{errors.referrerEmail.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="referrerPhone">Seu WhatsApp *</Label>
                        <Input id="referrerPhone" {...register("referrerPhone")} placeholder="(11) 90000-0000" />
                        {errors.referrerPhone && <p className="text-xs text-red-600 mt-1">{errors.referrerPhone.message}</p>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="relationship">Qual sua relação com o indicado? *</Label>
                      <Select value={relationship} onValueChange={(v) => setValue("relationship", v, { shouldValidate: true })}>
                        <SelectTrigger id="relationship"><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                          {RELATIONSHIP_OPTIONS.map((o) => (
                            <SelectItem key={o} value={o}>{o}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.relationship && <p className="text-xs text-red-600 mt-1">{errors.relationship.message}</p>}
                    </div>
                  </fieldset>

                  <fieldset className="space-y-3 pt-2 border-t">
                    <legend className="text-xs font-bold uppercase tracking-wider text-[#F2994A] mb-1 pt-2">Dados de quem você indica</legend>
                    <div>
                      <Label htmlFor="referredName">Nome do indicado *</Label>
                      <Input id="referredName" {...register("referredName")} placeholder="Ex.: Carlos Almeida" />
                      {errors.referredName && <p className="text-xs text-red-600 mt-1">{errors.referredName.message}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="referredPhone">WhatsApp do indicado *</Label>
                        <Input id="referredPhone" {...register("referredPhone")} placeholder="(11) 90000-0000" />
                        {errors.referredPhone && <p className="text-xs text-red-600 mt-1">{errors.referredPhone.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="referredEmail">E-mail (opcional)</Label>
                        <Input id="referredEmail" type="email" {...register("referredEmail")} placeholder="opcional" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="insuranceType">Interesse principal *</Label>
                      <Select value={insuranceType} onValueChange={(v) => setValue("insuranceType", v, { shouldValidate: true })}>
                        <SelectTrigger id="insuranceType"><SelectValue placeholder="Selecione o tipo de seguro" /></SelectTrigger>
                        <SelectContent>
                          {INSURANCE_OPTIONS.map((o) => (
                            <SelectItem key={o} value={o}>{o}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.insuranceType && <p className="text-xs text-red-600 mt-1">{errors.insuranceType.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="notes">Observações (opcional)</Label>
                      <Textarea id="notes" rows={3} {...register("notes")} placeholder="Ex.: melhor horário para contato, contexto da necessidade..." />
                    </div>
                  </fieldset>

                  <label className="flex items-start gap-2 text-xs text-muted-foreground">
                    <input type="checkbox" {...register("consent")} className="mt-0.5" />
                    <span>
                      Confirmo que a pessoa indicada está ciente de que forneci os dados dela e concorda em receber contato da Patro Seguros, conforme a LGPD.
                    </span>
                  </label>
                  {errors.consent && <p className="text-xs text-red-600 -mt-2">{errors.consent.message}</p>}

                  <Button type="submit" disabled={submitting} className="w-full bg-[#F2994A] hover:bg-[#e08535] text-white font-bold h-12 text-base">
                    {submitting ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Enviando...</>) : (<>Enviar indicação <ArrowRight className="h-4 w-4 ml-2" /></>)}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">Como funciona em 3 passos</h2>
              <p className="text-muted-foreground text-lg">Simples, transparente e respeitoso com o tempo de quem você indica.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { n: "01", icon: Users, title: "Você indica", desc: "Preenche o formulário com seus dados e os do amigo, familiar ou colega. Menos de 1 minuto." },
                { n: "02", icon: MessageCircle, title: "A gente conversa", desc: "Nossa equipe entra em contato com o indicado em até 24h úteis, com abordagem consultiva — nunca invasiva." },
                { n: "03", icon: Heart, title: "Todos ganham", desc: "O indicado recebe a melhor cotação entre 16+ seguradoras. Você recebe agradecimento pessoal e atenção prioritária." },
              ].map(({ n, icon: Icon, title, desc }) => (
                <div key={n} className="relative bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
                  <span className="absolute -top-4 left-6 bg-[#F2994A] text-white text-xs font-bold px-3 py-1 rounded-full">{n}</span>
                  <Icon className="h-10 w-10 text-[#003366] mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-[#003366]">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#F2994A]/10 text-[#F2994A] rounded-full px-4 py-1.5 text-xs font-semibold mb-4">
                  <Handshake className="h-3.5 w-3.5" />
                  Reciprocidade e reconhecimento
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">
                  Por que a Patro Seguros valoriza indicação em vez de anúncio agressivo?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Somos uma corretora de bairro, com sede no <strong>Edifício Via Alameda, Cidade Maia — Guarulhos/SP</strong>. Nosso crescimento foi construído no boca a boca de clientes reais, não em campanhas de mídia paga.
                </p>
                <ul className="space-y-3 text-sm">
                  {[
                    "Cada indicação é registrada com nome e acompanhada pessoalmente por Roberto ou Sandra Patrocínio.",
                    "Indicadores frequentes têm prioridade em revisões de apólice, sinistros e renovações.",
                    "O indicado nunca recebe abordagem de televendas — apenas um contato consultivo humano.",
                    "Todos os dados seguem a LGPD e são usados apenas para o contato comercial.",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <ShieldCheck className="h-5 w-5 text-[#003366] shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <blockquote className="text-lg text-[#003366] leading-relaxed italic">
                  “Fui indicada por uma amiga e hoje já indiquei mais quatro pessoas. O atendimento é de gente que se importa — coisa que não se vê mais.”
                </blockquote>
                <footer className="mt-4 text-sm text-muted-foreground">— Cliente Patro Seguros, Cidade Maia</footer>
                <div className="mt-6 flex items-center gap-1 text-[#F2994A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">{`${EMPRESA.metricas.googleRating.toString().replace(".", ",")}/5 no Google · ${EMPRESA.metricas.googleReviews} avaliações`}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-10 text-center">Perguntas frequentes</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.question} className="group bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <summary className="font-semibold text-[#003366] cursor-pointer flex justify-between items-center list-none">
                    {f.question}
                    <span className="text-[#F2994A] text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-[#003366] to-[#00509d] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para indicar alguém que você confia?</h2>
            <p className="text-white/85 mb-8 max-w-xl mx-auto">
              Leva menos de 1 minuto. Retornamos em até 24 horas úteis, sempre com atendimento humano.
            </p>
            <a href="#formulario">
              <Button className="bg-[#F2994A] hover:bg-[#e08535] text-white font-bold h-12 px-8 text-base">
                Fazer minha indicação <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
            <div className="mt-6 text-sm text-white/70">
              Prefere conversar direto?{" "}
              <a
                href={buildWhatsAppUrl({ origem: "indique-e-ganhe" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("indique-e-ganhe-cta")}
                className="underline hover:text-[#F2994A]"
              >
                Fale conosco no WhatsApp
              </a>
            </div>
          </div>
        </section>

        <ContextualSeoHub />
      </main>

      <Footer />
    </Fragment>
  );
};

export default IndiqueEGanhe;
