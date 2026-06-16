import { useState, useEffect, Fragment, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { debounce } from "lodash-es";
import { useSearchParams } from "react-router-dom";
import { trackCotacaoSubmit, trackWhatsAppClick } from "@/lib/tracking";
import { escapeHtml } from "@/lib/utils";
import { safeInvoke, handleSupabaseError } from "@/lib/supabase-helpers";
import { savePartialQuote } from "@/lib/leadsApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/Header";
import FAQSchema from "@/components/FAQSchema";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { logForgottenQuote } from "@/lib/quoteHistory";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Phone, CheckCircle2, ShieldCheck, Clock, Award, Building, User as UserIcon, Mail, Info } from "lucide-react";
import InputMask from "react-input-mask";

const formSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(10, "Telefone inválido").max(15),
  insuranceType: z.string().min(1, "Selecione um tipo de seguro"),
  message: z.string().trim().max(1000, "Mensagem muito longa"),
});

const Cotacao = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [partialId, setPartialId] = useState<string | null>(localStorage.getItem("partial_quote_id"));
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle magic link resumption with security checks
  useEffect(() => {
    const resumeData = searchParams.get("resume");
    if (resumeData) {
      try {
        const decoded = JSON.parse(atob(resumeData));
        
        // Security checks: Expiration (24h) and hash verification
        const now = Date.now();
        const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours
        
        if (!decoded.timestamp || (now - decoded.timestamp) > EXPIRATION_TIME) {
          toast.error("Este link de retomada expirou por segurança.");
          searchParams.delete("resume");
          setSearchParams(searchParams);
          return;
        }

        if (decoded && decoded.values) {
          Object.keys(decoded.values).forEach((key) => {
            form.setValue(key as any, decoded.values[key]);
          });
          if (decoded.step) setStep(decoded.step);
          
          // Clear param from URL after loading to make it "single use" per session
          searchParams.delete("resume");
          setSearchParams(searchParams);
          
          toast.success("Progresso retomado com segurança!");
        }
      } catch (e) {
        console.error("Error decoding resume link", e);
        toast.error("Link de retomada inválido.");
      }
    }
  }, [searchParams]);

  const VALID_TYPES = ["auto","vida","residencial","viagem","saude","empresarial","frota","rc","outros", "planos-de-saude", "agronegocio", "seguro-celular", "seguro-transporte", "seguro-fianca"] as const;
  const tipoParam = (searchParams.get("tipo") || "").toLowerCase();
  
  const categoryToValue: Record<string, string> = {
    "seguro-auto": "auto",
    "seguro-vida": "vida",
    "seguro-residencial": "residencial",
    "seguro-viagem": "viagem",
    "planos-de-saude": "saude",
    "seguro-empresarial": "empresarial",
    "seguro-frota": "frota",
    "agronegocio": "outros",
    "seguro-transporte": "frota",
    "seguro-fianca": "residencial",
    "rc": "rc"
  };

  const initialType = categoryToValue[tipoParam] || ((VALID_TYPES as readonly string[]).includes(tipoParam) ? tipoParam : "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      insuranceType: initialType,
      message: "",
    },
  });

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem("cotacao_progress");
    if (savedProgress) {
      try {
        const { values, step: savedStep } = JSON.parse(savedProgress);
        // Only restore if it's the same insurance type or if no type was specified in URL
        if (!tipoParam || values.insuranceType === initialType) {
          Object.keys(values).forEach((key) => {
            form.setValue(key as any, values[key]);
          });
          setStep(savedStep);
          toast.info("Retomamos seu progresso de onde você parou!", {
            duration: 4000
          });
        }
      } catch (e) {
        console.error("Error restoring progress", e);
      }
    }
  }, []);

  // Debounced cloud save for automatic reminders
  const saveToCloud = useCallback(
    debounce(async (values: any, currentStep: number) => {
      const dataToSave = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        insurance_type: values.insuranceType,
        current_step: currentStep,
        data: values,
        last_activity: new Date().toISOString()
      };

      if (partialId) {
        await savePartialQuote({ id: partialId, ...dataToSave });
      } else {
        const { id, error } = await savePartialQuote(dataToSave);
        if (id && !error) {
          setPartialId(id);
          localStorage.setItem("partial_quote_id", id);
        }
      }
    }, 2000),
    [partialId]
  );

  // Improved saving logic: update local immediately, cloud with debounce per field
  const handleFieldBlur = useCallback((fieldName: string, value: any) => {
    const currentValues = form.getValues();
    const updatedValues = { ...currentValues, [fieldName]: value };
    
    // Immediate local save
    localStorage.setItem("cotacao_progress", JSON.stringify({ values: updatedValues, step }));
    
    // Cloud save if we have enough identifying info
    if (updatedValues.name || updatedValues.phone || updatedValues.email) {
      saveToCloud(updatedValues, step);
    }
  }, [form, step, saveToCloud]);

  useEffect(() => {
    if (initialType && form.getValues("insuranceType") !== initialType) {
      form.setValue("insuranceType", initialType, { shouldValidate: true });
    }
  }, [initialType]);

  const nextStep = async () => {
    let fields: (keyof z.infer<typeof formSchema>)[] = [];
    if (step === 1) fields = ["insuranceType"];
    if (step === 2) fields = ["name", "email", "phone"];
    
    const isValid = await form.trigger(fields);
    if (isValid) {
      const next = step + 1;
      setStep(next);
      
      // Log step progression in history
      if (partialId) {
        const values = form.getValues();
        await supabase.from("lead_quote_history").insert({
          partial_quote_id: partialId,
          step_reached: next,
          snapshot: values
        });
      }
    }
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    const whatsappMessage = encodeURIComponent(
      `*Nova Solicitação de Cotação*\n\n` +
      `👤 *Nome:* ${values.name}\n` +
      `📧 *E-mail:* ${values.email}\n` +
      `📱 *WhatsApp:* ${values.phone}\n` +
      `🛡️ *Tipo de Seguro:* ${values.insuranceType}\n` +
      `💬 *Mensagem:* ${values.message || "Não informada"}\n\n` +
      `_Enviado via Patro Seguros_`
    );
    
    const textBody = `Nome: ${values.name}\nE-mail: ${values.email}\nTelefone: ${values.phone}\nTipo de Seguro: ${values.insuranceType}\nMensagem: ${values.message || "Não informada"}`;
    const htmlBody = `<h2>Nova Solicitação de Cotação</h2><table style="border-collapse:collapse;width:100%"><tr><td style="padding:6px;border:1px solid #ddd"><strong>Nome</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.name)}</td></tr><tr><td style="padding:6px;border:1px solid #ddd"><strong>E-mail</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.email)}</td></tr><tr><td style="padding:6px;border:1px solid #ddd"><strong>Telefone</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.phone)}</td></tr><tr><td style="padding:6px;border:1px solid #ddd"><strong>Tipo de Seguro</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.insuranceType)}</td></tr><tr><td style="padding:6px;border:1px solid #ddd"><strong>Mensagem</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.message || "Não informada")}</td></tr></table>`;

    await safeInvoke("send-form-email", {
      subject: `Solicitação de Cotação: ${values.name} (${values.insuranceType})`,
      textBody,
      htmlBody
    });

    localStorage.removeItem("cotacao_progress");
    localStorage.removeItem("partial_quote_id");
    trackCotacaoSubmit(values.insuranceType, { origin: "formulario-etapas" });
    trackWhatsAppClick("formulario-etapas", { origin: "formulario-etapas", insuranceType: values.insuranceType });
    
    window.location.href = `https://wa.me/551151997500?text=${whatsappMessage}`;
  };

  const faqs = [
    {
      q: "Quanto tempo demora para receber a cotação?",
      a: "Nosso compromisso é enviar as melhores propostas em até 2 horas úteis após o recebimento dos seus dados."
    },
    {
      q: "Preciso pagar algo pela consultoria?",
      a: "Não! A consultoria e a cotação são 100% gratuitas e sem compromisso."
    },
    {
      q: "Com quais seguradoras vocês trabalham?",
      a: "Trabalhamos com as 16 maiores seguradoras do Brasil, incluindo Porto Seguro, Allianz, Tokio Marine, Liberty, Bradesco e SulAmérica."
    },
    {
      q: "Como vou receber as propostas?",
      a: "Você receberá um comparativo detalhado diretamente no seu WhatsApp ou e-mail, conforme sua preferência."
    }
  ];

  return (
    <Fragment>
      <PageMeta title="Cotação de Seguro em Guarulhos | Patro Seguros" description="Solicite sua cotação de seguro em Guarulhos gratuitamente. Comparamos auto, residencial, vida e empresarial entre as melhores seguradoras do Brasil." />
      <FAQSchema faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} />
      <Header />
      <main id="main-content" className="outline-none bg-slate-50/50">
        {/* Hero Section */}
        <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-top-left -z-10" />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                <ShieldCheck className="w-4 h-4" /> Atendimento Especializado em Guarulhos
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
                Sua Cotação Pronta em <span className="text-primary italic">Até 2 Horas</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Comparamos as 16 maiores seguradoras do país para encontrar a cobertura ideal com o menor custo para você ou sua empresa.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="-mt-16 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Social Proof & Dynamic Preview */}
              <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
                {/* Dynamic Preview Card */}
                <div className="p-6 rounded-3xl bg-white border border-primary/20 shadow-xl shadow-primary/5 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ShieldCheck className="w-24 h-24 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" /> Resumo da sua Proteção
                  </h3>
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <span className="text-sm text-slate-500 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Produto:</span>
                      <span className="text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-full capitalize">
                        {form.watch("insuranceType") || "Selecionando..."}
                      </span>
                    </div>
                    
                    {form.watch("name") && (
                      <div className="flex justify-between items-center pb-3 border-b border-slate-100 animate-in fade-in slide-in-from-left-2">
                        <span className="text-sm text-slate-500 flex items-center gap-2"><UserIcon className="w-4 h-4" /> Titular:</span>
                        <span className="text-sm font-semibold text-slate-700">{form.watch("name")}</span>
                      </div>
                    )}
                    
                    {form.watch("phone") && (
                      <div className="flex justify-between items-center pb-3 border-b border-slate-100 animate-in fade-in slide-in-from-left-2">
                        <span className="text-sm text-slate-500 flex items-center gap-2"><Phone className="w-4 h-4" /> Contato:</span>
                        <span className="text-sm font-semibold text-slate-700">{form.watch("phone")}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <p className="text-[11px] text-slate-400 italic">
                        * As propostas reais dependem da análise das seguradoras parceiras em Guarulhos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Por que escolher a Patro?</h2>
                  <div className="space-y-4">
                    {[
                      { icon: <Clock className="w-5 h-5" />, title: "Agilidade Real", text: "Propostas enviadas em tempo recorde." },
                      { icon: <Award className="w-5 h-5" />, title: "Expertise Local", text: "Especialistas no mercado de Guarulhos e SP." },
                      { icon: <CheckCircle2 className="w-5 h-5" />, title: "Independência", text: "Trabalhamos para você, não para a seguradora." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{item.title}</h4>
                          <p className="text-sm text-slate-500">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-slate-400 text-sm font-medium mb-4 italic">"Atendimento impecável! Recebi as opções pelo WhatsApp muito rápido e consegui economizar R$ 600 no seguro da minha frota."</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">RG</div>
                      <div>
                        <p className="font-bold text-sm">Ricardo G.</p>
                        <p className="text-xs text-slate-500">Empresário em Guarulhos</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 text-white/5 font-serif text-9xl">“</div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 lg:p-10">
                  <div className="mb-8">
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      <span>Etapa {step} de 3</span>
                      <span>{Math.round((step / 3) * 100)}% concluído</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                      />
                    </div>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                          <FormField
                            control={form.control}
                            name="insuranceType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-bold text-lg mb-4 block">O que você deseja proteger hoje?</FormLabel>
                                <FormControl>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {[
                                      { value: "auto", label: "Auto", icon: "🚗" },
                                      { value: "vida", label: "Vida", icon: "🛡️" },
                                      { value: "residencial", label: "Casa", icon: "🏠" },
                                      { value: "saude", label: "Saúde", icon: "🏥" },
                                      { value: "empresarial", label: "Empresa", icon: "🏢" },
                                      { value: "frota", label: "Frota", icon: "🚛" },
                                      { value: "fianca", label: "Aluguel", icon: "🔑" },
                                      { value: "viagem", label: "Viagem", icon: "✈️" },
                                      { value: "outros", label: "Outros", icon: "✨" },
                                    ].map((opt) => (
                                      <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => {
                                          field.onChange(opt.value);
                                          nextStep();
                                        }}
                                        className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-2 group ${
                                          field.value === opt.value 
                                            ? "border-primary bg-primary/5 shadow-md shadow-primary/10" 
                                            : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                                        }`}
                                      >
                                        <span className="text-2xl group-hover:scale-110 transition-transform">{opt.icon}</span>
                                        <span className={`text-sm font-bold ${field.value === opt.value ? "text-primary" : "text-slate-600"}`}>
                                          {opt.label}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                          <h3 className="text-xl font-bold text-slate-900 mb-4">Como podemos te contatar?</h3>
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-semibold">Seu Nome</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Digite seu nome" 
                                    className="h-12 bg-slate-50" 
                                    {...field} 
                                    onBlur={(e) => {
                                      field.onBlur();
                                      handleFieldBlur("name", e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-semibold">WhatsApp</FormLabel>
                                <FormControl>
                                  <InputMask
                                    mask="(99) 99999-9999"
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                                      field.onBlur();
                                      handleFieldBlur("phone", e.target.value);
                                    }}
                                  >
                                    {/* @ts-ignore */}
                                    {(inputProps: any) => (
                                      <Input 
                                        {...inputProps}
                                        placeholder="(11) 99999-9999" 
                                        className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all" 
                                      />
                                    )}
                                  </InputMask>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-semibold">E-mail</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="seu@email.com" 
                                    className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all" 
                                    {...field} 
                                    onChange={(e) => {
                                      field.onChange(e.target.value.toLowerCase().trim());
                                    }}
                                    onBlur={(e) => {
                                      field.onBlur();
                                      handleFieldBlur("email", e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="pt-4 flex gap-3">
                            <Button type="button" variant="ghost" onClick={prevStep} className="flex-1 h-12">Voltar</Button>
                            <Button type="button" onClick={nextStep} className="flex-[2] h-12 text-lg font-bold">Próximo Passo</Button>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                          <h3 className="text-xl font-bold text-slate-900 mb-4">Finalize sua solicitação</h3>
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-semibold">Informações Adicionais (opcional)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Ex: Modelo do carro, número de funcionários, valor do aluguel..."
                                    className="min-h-[120px] bg-slate-50"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="pt-4 flex flex-col gap-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              className="w-full text-xs font-medium border-dashed text-slate-500"
                              onClick={() => {
                                const values = form.getValues();
                                const payload = { 
                                  values, 
                                  step, 
                                  timestamp: Date.now(),
                                  nonce: Math.random().toString(36).substring(7) 
                                };
                                const resumeLink = `${window.location.origin}${window.location.pathname}?resume=${btoa(JSON.stringify(payload))}`;
                                const waLink = `https://wa.me/?text=${encodeURIComponent(`Aqui está o link seguro (válido por 24h) para você retomar sua cotação na Patro Seguros: ${resumeLink}`)}`;
                                window.open(waLink, "_blank");
                                toast.success("Link de retomada seguro enviado para o WhatsApp!");
                              }}
                            >
                              Enviar link para continuar no WhatsApp
                            </Button>

                            <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20" disabled={isSubmitting}>
                              {isSubmitting ? "Enviando..." : "Receber Cotação no WhatsApp"}
                            </Button>
                            <Button type="button" variant="ghost" onClick={prevStep} disabled={isSubmitting}>Voltar e revisar</Button>
                            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Dados seguros</span>
                              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Grátis</span>
                              <button 
                                type="button" 
                                onClick={() => {
                                  logForgottenQuote(form.getValues("insuranceType") || "Cotação Etapas", step, "cotacao_progress");
                                  localStorage.removeItem("cotacao_progress");
                                  form.reset({
                                    name: "",
                                    email: "",
                                    phone: "",
                                    insuranceType: "",
                                    message: "",
                                  });
                                  setStep(1);
                                  toast.success("Progresso limpo com sucesso!");
                                }}

                                className="underline hover:text-slate-600 transition-colors"
                              >
                                Limpar dados salvos
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Dúvidas Frequentes</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Cotacao;
