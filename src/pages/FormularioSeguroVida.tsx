import { useState, useEffect, useCallback } from "react";
import { Send, CheckCircle, ChevronRight, ChevronLeft, Save, RotateCcw, AlertCircle } from "lucide-react";
import { debounce } from "lodash";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { trackCotacaoSubmit } from "@/lib/tracking";
import { escapeHtml } from "@/lib/utils";
import { safeInvoke, handleSupabaseError } from "@/lib/supabase-helpers";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { usePersistentForm } from "@/hooks/usePersistentForm";
import { logForgottenQuote } from "@/lib/quoteHistory";



const WHATSAPP_NUMBER = "551151997500";

const formatPhone = (value: string) => {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const formatCPF = (value: string) => {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
};

const formatCEP = (value: string) => {
  const d = value.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
};

const estadosBR = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA",
  "PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
];

const valoresSeguro = [
  "R$ 50.000", "R$ 100.000", "R$ 150.000", "R$ 200.000", "R$ 300.000",
  "R$ 500.000", "R$ 750.000", "R$ 1.000.000", "Acima de R$ 1.000.000"
];

const FormularioSeguroVida = () => {
  const storageKey = "seguro-vida-completo";
  const [form, setForm, clearForm, isRestored] = usePersistentForm<Record<string, string>>(storageKey, {});
  const [currentStep, setCurrentStep, clearStep] = usePersistentForm<number>(`${storageKey}-step`, 1);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [showRestoreNotice, setShowRestoreNotice] = useState(false);
  const [partialId, setPartialId] = useState<string | null>(localStorage.getItem(`${storageKey}-partial-id`));

  // Handle restoration notice
  useEffect(() => {
    if (isRestored && Object.keys(form).length > 0 && !sent) {
      setShowRestoreNotice(true);
      const timer = setTimeout(() => setShowRestoreNotice(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [isRestored, sent]);

  // Debounced cloud save
  const saveToCloud = useCallback(
    debounce(async (values: Record<string, string>, step: number) => {
      const dataToSave = {
        name: values.nomeCompleto || null,
        email: values.email || null,
        phone: values.telefone || null,
        insurance_type: "Seguro de Vida - Completo",
        current_step: step,
        data: values,
        last_activity: new Date().toISOString()
      };

      try {
        if (partialId) {
          await supabase.from("partial_quotes").update(dataToSave).eq("id", partialId);
        } else if (dataToSave.name || dataToSave.email || dataToSave.phone) {
          const { data, error } = await supabase.from("partial_quotes").insert(dataToSave).select("id").single();
          if (data && !error) {
            setPartialId(data.id);
            localStorage.setItem(`${storageKey}-partial-id`, data.id);
          }
        }
      } catch (err) {
        console.error("Cloud save failed", err);
      }
    }, 3000),
    [partialId, storageKey]
  );

  useEffect(() => {
    if (Object.keys(form).length > 0) {
      saveToCloud(form, currentStep);
    }
  }, [form, currentStep, saveToCloud]);

  const startOver = () => {
    clearForm();
    clearStep();
    localStorage.removeItem(`${storageKey}-partial-id`);
    setPartialId(null);
    setTouched({});
    setShowRestoreNotice(false);
    toast.success("Formulário reiniciado.");
  };


  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const u = (key: string, value: string) => setForm(p => ({ ...p, [key]: value }));
  const handleBlur = (key: string) => setTouched(p => ({ ...p, [key]: true }));

  const stepFields: Record<number, string[]> = {
    1: ["nomeCompleto", "cpf", "dataNascimento", "profissao"],
    2: ["cep", "rua", "numero", "bairro", "cidade", "estado"],
    3: ["valorSeguro", "peso", "altura"],
    4: ["telefone", "email"]
  };

  const requiredFields = ["nomeCompleto", "cpf", "dataNascimento", "telefone", "email", "profissao", "valorSeguro"];

  const getFieldError = (key: string) => {
    if (!touched[key]) return "";
    const value = form[key] || "";
    if (requiredFields.includes(key) && !value.trim()) return "Campo essencial para sua proposta.";
    if (key === "email" && value.trim() && !/^\S+@\S+\.\S+$/.test(value)) return "E-mail inválido. Ex: nome@exemplo.com";
    if (key === "cpf" && value.trim() && value.replace(/\D/g, "").length < 11) return "CPF precisa de 11 dígitos.";
    if (key === "telefone" && value.trim() && value.replace(/\D/g, "").length < 10) return "WhatsApp incompleto.";
    return "";
  };


  const isStepValid = (stepNum: number) => {
    const fields = stepFields[stepNum] || [];
    for (const f of fields) {
      if (requiredFields.includes(f)) {
        if (!form[f]?.trim()) return false;
        if (getFieldError(f)) return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    const fields = stepFields[currentStep] || [];
    const newTouched = { ...touched };
    fields.forEach(f => { newTouched[f] = true });
    setTouched(newTouched);

    if (!isStepValid(currentStep)) {
      const firstInvalidField = fields.find(f => requiredFields.includes(f) && (!form[f]?.trim() || getFieldError(f)));
      if (firstInvalidField) {
        toast.error("Por favor, preencha os dados obrigatórios para continuar.");
        const element = document.getElementById(firstInvalidField);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep < totalSteps) {
      nextStep();
      return;
    }

    if (!consent) {
      toast.error("Você precisa aceitar os termos para continuar.");
      return;
    }

    const allTouched: Record<string, boolean> = {};
    requiredFields.forEach(f => { allTouched[f] = true });
    setTouched(allTouched);

    const firstInvalidField = requiredFields.find(f => !form[f]?.trim() || getFieldError(f));
    if (firstInvalidField) {
      toast.error("Por favor, preencha todos os campos obrigatórios corretamente.");
      return;
    }

    setSending(true);

    const lines = [
      `Seguro de Vida — Novo Lead`,
      ``,
      `📋 Dados Pessoais`,
      `Nome: ${form.nomeCompleto}`,
      form.cpf ? `CPF: ${form.cpf}` : null,
      form.rg ? `RG: ${form.rg}` : null,
      form.dataNascimento ? `Data de Nascimento: ${form.dataNascimento}` : null,
      form.profissao ? `Profissão: ${form.profissao}` : null,
      (form.peso || form.altura) ? `Peso/Altura: ${form.peso || "—"} / ${form.altura || "—"}` : null,
      ``,
      `📍 Endereço`,
      form.cep ? `CEP: ${form.cep}` : null,
      form.rua ? `Rua: ${form.rua}${form.numero ? `, ${form.numero}` : ""}` : null,
      form.complemento ? `Complemento: ${form.complemento}` : null,
      form.bairro ? `Bairro: ${form.bairro}` : null,
      (form.cidade || form.estado) ? `Cidade/UF: ${form.cidade || ""} - ${form.estado || ""}` : null,
      ``,
      `💰 Seguro`,
      `Valor desejado: ${form.valorSeguro}`,
      ``,
      `📞 Contato`,
      `Telefone: ${form.telefone}`,
      `Email: ${form.email}`,
    ].filter(Boolean).join("\n");

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1a5632;">🛡️ Novo Lead — Seguro de Vida</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nome</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(form.nomeCompleto)}</td></tr>
          ${form.cpf ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">CPF</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(form.cpf)}</td></tr>` : ""}
          ${form.dataNascimento ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nascimento</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(form.dataNascimento)}</td></tr>` : ""}
          ${form.profissao ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Profissão</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(form.profissao)}</td></tr>` : ""}
          ${form.telefone ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Telefone</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(form.telefone)}</td></tr>` : ""}
          ${form.email ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(form.email)}</td></tr>` : ""}
          ${form.valorSeguro ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Valor Desejado</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(form.valorSeguro)}</td></tr>` : ""}
          ${form.cep ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">CEP</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(form.cep)}</td></tr>` : ""}
          ${(form.cidade || form.estado) ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Cidade/UF</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(form.cidade || "")} - ${escapeHtml(form.estado || "")}</td></tr>` : ""}
        </table>
        <p style="color:#888;font-size:12px;margin-top:20px;">Enviado pelo formulário do site Patro Seguros</p>
      </div>
    `;

    trackCotacaoSubmit("Seguro de Vida - Formulário Completo");
    window.fbq?.("track", "Lead", { content_name: "formulario-seguro-vida", content_category: "Seguro de Vida" });
    window.gtag?.("event", "generate_lead", { event_category: "formulario-seguro-vida", event_label: "Seguro de Vida" });

    const { error } = await safeInvoke("send-form-email", {
      subject: `Novo Lead — Seguro de Vida — ${form.nomeCompleto}`,
      textBody: lines,
      htmlBody,
    });

    if (error) {
      handleSupabaseError(error, "Ops! Ocorreu um erro ao enviar seu formulário de seguro de vida.");
      setSending(false);
      return;
    }

    setSending(false);
    clearForm();
    clearStep();
    localStorage.removeItem(`${storageKey}-partial-id`);
    setSent(true);

    clearForm();
    clearStep();
  };

  if (sent) {
    return (
      <>
        <PageMeta title="Formulário Enviado — Seguro de Vida | Patro Seguros" description="Formulário de seguro de vida enviado com sucesso." />
        <Header />
        <main id="main-content" className="py-20">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Formulário enviado com sucesso!</h1>
            <p className="text-muted-foreground mb-8">
              Nossa equipe entrará em contato em até 2 horas pelo WhatsApp (11) 5199-7500.
            </p>
            <Button variant="outline" onClick={() => { setSent(false); setForm({}); setConsent(false); }}>
              Preencher novamente
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Formulário Seguro de Vida | Patro Seguros"
        description="Preencha o formulário completo para cotação de Seguro de Vida. Receba uma proposta personalizada da Patro Seguros."
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none min-h-screen bg-slate-50/30">
        <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Seguro de Vida", href: "/seguro-vida" }, { label: "Formulário" }]} />

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-10">
              <span className="text-4xl mb-3 block">🛡️</span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Formulário — Seguro de Vida</h1>
              <p className="text-muted-foreground text-lg">Receba uma proposta personalizada e completa</p>
            </div>

            <div className="bg-card border rounded-3xl p-6 md:p-10 shadow-xl shadow-primary/5">
              <div className="mb-10">
                <div className="flex justify-between items-center text-xs font-bold text-primary uppercase tracking-widest mb-2">
                  <span>Etapa {currentStep} de {totalSteps}</span>
                  <span>{Math.round(progress)}% completo</span>
                </div>
                <Progress value={progress} className="h-2 bg-primary/10" />
              </div>

              {showRestoreNotice && (
                <div className="mb-8 animate-in slide-in-from-top-4 duration-500">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <AlertCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-primary">Formulário recuperado</p>
                        <p className="text-sm text-muted-foreground">Retomamos de onde você parou.</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
                      onClick={startOver}
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reiniciar
                    </Button>
                  </div>
                </div>
              )}


              <form onSubmit={handleSubmit} className="space-y-8">
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</span>
                      Dados Pessoais
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="nomeCompleto" className={getFieldError("nomeCompleto") ? "text-destructive font-semibold" : "font-semibold"}>Nome Completo *</Label>
                        <Input 
                          id="nomeCompleto" 
                          placeholder="Seu nome completo" 
                          value={form.nomeCompleto || ""} 
                          onChange={e => u("nomeCompleto", e.target.value)} 
                          onBlur={() => handleBlur("nomeCompleto")}
                          maxLength={120} 
                          className={`h-11 ${getFieldError("nomeCompleto") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {getFieldError("nomeCompleto") && <p className="text-xs text-destructive">{getFieldError("nomeCompleto")}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="cpf" className={getFieldError("cpf") ? "text-destructive font-semibold" : "font-semibold"}>CPF *</Label>
                          <Input 
                            id="cpf" 
                            placeholder="000.000.000-00" 
                            value={form.cpf || ""} 
                            onChange={e => u("cpf", formatCPF(e.target.value))} 
                            onBlur={() => handleBlur("cpf")}
                            maxLength={14} 
                            className={`h-11 ${getFieldError("cpf") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          />
                          {getFieldError("cpf") && <p className="text-xs text-destructive">{getFieldError("cpf")}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="rg" className="font-semibold">RG</Label>
                          <Input id="rg" placeholder="00.000.000-0" value={form.rg || ""} onChange={e => u("rg", e.target.value)} onBlur={() => handleBlur("rg")} maxLength={20} className="h-11" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="dataNascimento" className={getFieldError("dataNascimento") ? "text-destructive font-semibold" : "font-semibold"}>Data de Nascimento *</Label>
                          <Input 
                            id="dataNascimento" 
                            type="date" 
                            value={form.dataNascimento || ""} 
                            onChange={e => u("dataNascimento", e.target.value)} 
                            onBlur={() => handleBlur("dataNascimento")}
                            className={`h-11 ${getFieldError("dataNascimento") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          />
                          {getFieldError("dataNascimento") && <p className="text-xs text-destructive">{getFieldError("dataNascimento")}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="profissao" className={getFieldError("profissao") ? "text-destructive font-semibold" : "font-semibold"}>Profissão *</Label>
                          <Input 
                            id="profissao" 
                            placeholder="Ex: Engenheiro" 
                            value={form.profissao || ""} 
                            onChange={e => u("profissao", e.target.value)} 
                            onBlur={() => handleBlur("profissao")}
                            maxLength={80} 
                            className={`h-11 ${getFieldError("profissao") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          />
                          {getFieldError("profissao") && <p className="text-xs text-destructive">{getFieldError("profissao")}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</span>
                      Endereço Residencial
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="cep" className="font-semibold">CEP</Label>
                          <Input id="cep" placeholder="00000-000" value={form.cep || ""} onChange={e => u("cep", formatCEP(e.target.value))} onBlur={() => handleBlur("cep")} maxLength={9} className="h-11" />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                          <Label htmlFor="rua" className="font-semibold">Rua / Logradouro</Label>
                          <Input id="rua" placeholder="Nome da rua" value={form.rua || ""} onChange={e => u("rua", e.target.value)} onBlur={() => handleBlur("rua")} maxLength={150} className="h-11" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="numero" className="font-semibold">Número</Label>
                          <Input id="numero" placeholder="Nº" value={form.numero || ""} onChange={e => u("numero", e.target.value)} onBlur={() => handleBlur("numero")} maxLength={10} className="h-11" />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                          <Label htmlFor="complemento" className="font-semibold">Complemento</Label>
                          <Input id="complemento" placeholder="Apto, bloco, etc." value={form.complemento || ""} onChange={e => u("complemento", e.target.value)} onBlur={() => handleBlur("complemento")} maxLength={80} className="h-11" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="bairro" className="font-semibold">Bairro</Label>
                          <Input id="bairro" placeholder="Bairro" value={form.bairro || ""} onChange={e => u("bairro", e.target.value)} onBlur={() => handleBlur("bairro")} maxLength={80} className="h-11" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="cidade" className="font-semibold">Cidade</Label>
                          <Input id="cidade" placeholder="Cidade" value={form.cidade || ""} onChange={e => u("cidade", e.target.value)} onBlur={() => handleBlur("cidade")} maxLength={80} className="h-11" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="estado" className="font-semibold">Estado</Label>
                          <Select value={form.estado || ""} onValueChange={v => { u("estado", v); handleBlur("estado"); }}>
                            <SelectTrigger id="estado" className="h-11"><SelectValue placeholder="UF" /></SelectTrigger>
                            <SelectContent>
                              {estadosBR.map(uf => <SelectItem key={uf} value={uf}>{uf}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</span>
                      Personalização da Proteção
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-1.5">
                        <Label htmlFor="valorSeguro" className={getFieldError("valorSeguro") ? "text-destructive font-semibold" : "font-semibold"}>Capital Segurado Desejado *</Label>
                        <Select value={form.valorSeguro || ""} onValueChange={v => { u("valorSeguro", v); handleBlur("valorSeguro"); }}>
                          <SelectTrigger 
                            id="valorSeguro"
                            className={`h-11 ${getFieldError("valorSeguro") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          ><SelectValue placeholder="Selecione o valor" /></SelectTrigger>
                          <SelectContent>
                            {valoresSeguro.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        {getFieldError("valorSeguro") && <p className="text-xs text-destructive">{getFieldError("valorSeguro")}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="peso" className="font-semibold">Peso (kg)</Label>
                          <Input id="peso" placeholder="Ex: 75" value={form.peso || ""} onChange={e => u("peso", e.target.value)} onBlur={() => handleBlur("peso")} maxLength={6} className="h-11" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="altura" className="font-semibold">Altura (cm)</Label>
                          <Input id="altura" placeholder="Ex: 175" value={form.altura || ""} onChange={e => u("altura", e.target.value)} onBlur={() => handleBlur("altura")} maxLength={6} className="h-11" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">4</span>
                      Informações de Contato
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="telefone" className={getFieldError("telefone") ? "text-destructive font-semibold" : "font-semibold"}>Telefone / WhatsApp *</Label>
                          <Input 
                            id="telefone" 
                            type="tel" 
                            placeholder="(11) 99999-9999" 
                            value={form.telefone || ""} 
                            onChange={e => u("telefone", formatPhone(e.target.value))} 
                            onBlur={() => handleBlur("telefone")}
                            maxLength={16} 
                            className={`h-11 ${getFieldError("telefone") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          />
                          {getFieldError("telefone") && <p className="text-xs text-destructive">{getFieldError("telefone")}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email" className={getFieldError("email") ? "text-destructive font-semibold" : "font-semibold"}>E-mail *</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="seu@email.com" 
                            value={form.email || ""} 
                            onChange={e => u("email", e.target.value)} 
                            onBlur={() => handleBlur("email")}
                            maxLength={120} 
                            className={`h-11 ${getFieldError("email") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          />
                          {getFieldError("email") && <p className="text-xs text-destructive">{getFieldError("email")}</p>}
                        </div>
                      </div>

                      <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <Checkbox checked={consent} onCheckedChange={v => setConsent(v === true)} className="mt-1" />
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                            Concordo em receber cotações e comunicações especializadas da Patro Seguros. Seus dados estão protegidos sob nossa Política de Privacidade.
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                  {currentStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep} 
                      className="h-12 order-2 sm:order-1 flex-1 font-semibold"
                      disabled={sending}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                    </Button>
                  )}
                  
                  <Button 
                    type="submit" 
                    variant="cta" 
                    className={`h-12 font-bold text-base flex-[2] order-1 sm:order-2 ${currentStep === 1 ? "w-full" : ""}`}
                    disabled={sending}
                  >
                    {sending ? (
                      "Enviando..."
                    ) : currentStep < totalSteps ? (
                      <>Próximo Passo <ChevronRight className="ml-2 h-4 w-4" /></>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" /> Finalizar e Receber Cotação</>
                    )}
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <p className="text-[10px] text-muted-foreground text-center flex items-center gap-1.5 font-medium">
                    <Save className="h-3 w-3 text-primary" />
                    Progresso salvo automaticamente · 100% gratuito e sem compromisso
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FormularioSeguroVida;
