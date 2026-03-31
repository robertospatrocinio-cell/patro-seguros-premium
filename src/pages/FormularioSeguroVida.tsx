import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { trackCotacaoSubmit } from "@/lib/tracking";
import { supabase } from "@/integrations/supabase/client";
import { escapeHtml } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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
  const [form, setForm] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const u = (key: string, value: string) => setForm(p => ({ ...p, [key]: value }));

  const requiredFields = ["nomeCompleto", "cpf", "dataNascimento", "telefone", "email", "profissao", "valorSeguro"];

  const isValid = () => {
    for (const f of requiredFields) {
      if (!form[f]?.trim()) return false;
    }
    return consent;
  };

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;
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

    try {
      const { data, error } = await supabase.functions.invoke("send-form-email", {
        body: {
          subject: `Novo Lead — Seguro de Vida — ${form.nomeCompleto}`,
          textBody: lines,
          htmlBody,
        },
      });

      if (error) throw error;

      setSending(false);
      setSent(true);
      toast({ title: "Formulário enviado!", description: "Sua cotação foi recebida com sucesso." });
    } catch (err) {
      console.error("Erro ao enviar email:", err);
      setSending(false);
      toast({ title: "Erro ao enviar", description: "Tente novamente ou entre em contato pelo WhatsApp.", variant: "destructive" });
    }
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
      <main id="main-content">
        <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Seguro de Vida", href: "/seguro-vida" }, { label: "Formulário" }]} />

        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-10">
              <span className="text-4xl mb-3 block">🛡️</span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Formulário — Seguro de Vida</h1>
              <p className="text-muted-foreground text-lg">Preencha seus dados para receber uma proposta personalizada</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card border rounded-2xl p-6 md:p-8 space-y-6">
              {/* Dados Pessoais */}
              <div>
                <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</span>
                  Dados Pessoais
                </h2>
                <div className="grid gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="nomeCompleto">Nome Completo <span className="text-destructive">*</span></Label>
                    <Input id="nomeCompleto" placeholder="Seu nome completo" value={form.nomeCompleto || ""} onChange={e => u("nomeCompleto", e.target.value)} maxLength={120} required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="cpf">CPF <span className="text-destructive">*</span></Label>
                      <Input id="cpf" placeholder="000.000.000-00" value={form.cpf || ""} onChange={e => u("cpf", formatCPF(e.target.value))} maxLength={14} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="rg">RG</Label>
                      <Input id="rg" placeholder="00.000.000-0" value={form.rg || ""} onChange={e => u("rg", e.target.value)} maxLength={20} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="dataNascimento">Data de Nascimento <span className="text-destructive">*</span></Label>
                      <Input id="dataNascimento" type="date" value={form.dataNascimento || ""} onChange={e => u("dataNascimento", e.target.value)} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="profissao">Profissão <span className="text-destructive">*</span></Label>
                      <Input id="profissao" placeholder="Ex: Engenheiro" value={form.profissao || ""} onChange={e => u("profissao", e.target.value)} maxLength={80} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="peso">Peso (kg)</Label>
                      <Input id="peso" placeholder="Ex: 75" value={form.peso || ""} onChange={e => u("peso", e.target.value)} maxLength={6} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="altura">Altura (cm)</Label>
                      <Input id="altura" placeholder="Ex: 175" value={form.altura || ""} onChange={e => u("altura", e.target.value)} maxLength={6} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div>
                <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</span>
                  Endereço
                </h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="cep">CEP</Label>
                      <Input id="cep" placeholder="00000-000" value={form.cep || ""} onChange={e => u("cep", formatCEP(e.target.value))} maxLength={9} />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="rua">Rua / Logradouro</Label>
                      <Input id="rua" placeholder="Nome da rua" value={form.rua || ""} onChange={e => u("rua", e.target.value)} maxLength={150} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="numero">Número</Label>
                      <Input id="numero" placeholder="Nº" value={form.numero || ""} onChange={e => u("numero", e.target.value)} maxLength={10} />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="complemento">Complemento</Label>
                      <Input id="complemento" placeholder="Apto, bloco, etc." value={form.complemento || ""} onChange={e => u("complemento", e.target.value)} maxLength={80} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input id="bairro" placeholder="Bairro" value={form.bairro || ""} onChange={e => u("bairro", e.target.value)} maxLength={80} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input id="cidade" placeholder="Cidade" value={form.cidade || ""} onChange={e => u("cidade", e.target.value)} maxLength={80} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="estado">Estado</Label>
                      <Select value={form.estado || ""} onValueChange={v => u("estado", v)}>
                        <SelectTrigger id="estado"><SelectValue placeholder="UF" /></SelectTrigger>
                        <SelectContent>
                          {estadosBR.map(uf => <SelectItem key={uf} value={uf}>{uf}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seguro */}
              <div>
                <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</span>
                  Valor do Seguro
                </h2>
                <div className="space-y-1.5">
                  <Label htmlFor="valorSeguro">Capital Segurado Desejado <span className="text-destructive">*</span></Label>
                  <Select value={form.valorSeguro || ""} onValueChange={v => u("valorSeguro", v)}>
                    <SelectTrigger id="valorSeguro"><SelectValue placeholder="Selecione o valor" /></SelectTrigger>
                    <SelectContent>
                      {valoresSeguro.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contato */}
              <div>
                <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">4</span>
                  Contato
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="telefone">Telefone / WhatsApp <span className="text-destructive">*</span></Label>
                    <Input id="telefone" type="tel" placeholder="(11) 99999-9999" value={form.telefone || ""} onChange={e => u("telefone", formatPhone(e.target.value))} maxLength={16} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">E-mail <span className="text-destructive">*</span></Label>
                    <Input id="email" type="email" placeholder="seu@email.com" value={form.email || ""} onChange={e => u("email", e.target.value)} maxLength={255} required />
                  </div>
                </div>
              </div>

              {/* Consent + Submit */}
              <div className="space-y-4 pt-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <Checkbox checked={consent} onCheckedChange={v => setConsent(v === true)} className="mt-0.5" />
                  <span className="text-xs text-muted-foreground">
                    Concordo em receber contato via WhatsApp/Email para cotação do seguro de vida. 
                    Meus dados serão tratados conforme a <a href="/politica-privacidade" className="underline hover:text-primary">Política de Privacidade</a>.
                  </span>
                </label>

                <Button type="submit" variant="cta" className="w-full h-12 text-base" disabled={sending || !isValid()}>
                  {sending ? "Enviando..." : <><Send className="mr-2 h-4 w-4" /> Enviar Formulário</>}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  100% gratuito · Resposta em até 2 horas · Sem compromisso
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FormularioSeguroVida;
