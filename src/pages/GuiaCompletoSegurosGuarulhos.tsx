import { useState } from "react";
import { ebookLeadSchema as leadSchema } from "@/lib/leadValidation";
import { CheckCircle, Download, BookOpen, Shield, HelpCircle, MapPin, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { safeInvoke } from "@/lib/supabase-helpers";
import { escapeHtml } from "@/lib/utils"; // Assumindo utils existir

const GUIA_URL = "/downloads/guia-completo-seguros-guarulhos.pdf";

const GuiaCompletoSegurosGuarulhos = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse({ name, email, whatsapp });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    await safeInvoke("send-form-email", {
      subject: "📥 Novo Lead: Guia Completo Seguros Guarulhos",
      textBody: `Lead interessado no Guia Completo:\n\nNome: ${parsed.data.name}\nWhatsApp: ${parsed.data.whatsapp}`,
    });
    setSent(true);
    toast.success("Pronto! Seu guia está liberado.");
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Guia Completo de Seguros em Guarulhos | Patro Seguros"
        description="Baixe nosso guia completo: aprenda como proteger sua família, empresa e bens em Guarulhos. Passo a passo para economizar e escolher o seguro ideal."
      />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Guia Completo Seguros" }]} />
        
        <section className="py-12 md:py-20 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Guia Completo de Seguros em Guarulhos</h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Tudo o que você precisa saber para proteger seu patrimônio, família e empresa na maior cidade da região metropolitana.</p>
            
            <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                {!sent ? (
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        <Label>Nome completo</Label>
                        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" required className="h-12"/>
                        <Label>E-mail</Label>
                        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required className="h-12"/>
                        <Label>WhatsApp (apenas números)</Label>
                        <Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="(11) 9xxxx-xxxx" required className="h-12"/>
                        <Button type="submit" className="w-full h-12 bg-[#F2994A] hover:bg-[#d8873f]" disabled={submitting}>
                            {submitting ? "Enviando..." : "Baixar Guia Gratuito"}
                        </Button>
                    </form>
                ) : (
                    <div className="py-10 space-y-4">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto"/>
                        <h3 className="text-2xl font-bold">Sucesso!</h3>
                        <Button className="w-full bg-[#003366]" onClick={() => window.open(GUIA_URL, "_blank")}>
                            <Download className="mr-2"/> Abrir Guia Completo
                        </Button>
                    </div>
                )}
            </div>
        </section>
        
        {sent && (
            <section className="py-12 bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-3xl font-bold mb-8">Conteúdo Exclusivo do Guia</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {["Por que fazer seguro em Guarulhos?", "Tipos de seguro essenciais", "Quanto custa o seguro por bairro", "Como escolher a cobertura certa", "Dicas para economizar", "O que fazer em caso de sinistro"].map(item => (
                        <div key={item} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                            <Shield className="text-primary"/>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GuiaCompletoSegurosGuarulhos;
