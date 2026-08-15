import { useState } from "react";
import { Link } from "react-router-dom";

import { ebookLeadSchema as leadSchema } from "@/lib/leadValidation";
import { CheckCircle, Download, Shield, MapPin, Target, Users, AlertCircle, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { safeInvoke } from "@/lib/supabase-helpers";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

const GUIA_URL = "/downloads/guia-completo-seguros-guarulhos.pdf";

const formatWhatsApp = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

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
    
    try {
      await safeInvoke("send-form-email", {
        subject: "📥 Novo Lead: Guia Completo Seguros Guarulhos",
        textBody: `Lead interessado no Guia Completo:\n\nNome: ${parsed.data.name}\nWhatsApp: ${parsed.data.whatsapp}\nE-mail: ${parsed.data.email}`,
        htmlBody: `<h2>📥 Novo lead — Guia Completo</h2><p><strong>Nome:</strong> ${parsed.data.name}</p><p><strong>WhatsApp:</strong> ${parsed.data.whatsapp}</p><p><strong>E-mail:</strong> ${parsed.data.email}</p>`,
      });

      if (typeof window !== "undefined") {
        (window as any).fbq?.("track", "Lead", { content_name: "guia-completo-guarulhos" });
        (window as any).gtag?.("event", "generate_lead", { event_category: "lead_magnet", event_label: "guia-completo-guarulhos" });
      }

      setSent(true);
      toast.success("Pronto! Seu guia está liberado.");
    } catch (err) {
      toast.error("Ocorreu um erro ao processar sua solicitação.");
    } finally {
      setSubmitting(false);
    }
  };

  const capitulos = [
    { title: "Cap. 1: Por que fazer seguro em Guarulhos", desc: "Dados reais de risco local, frota e rodovias da região." },
    { title: "Cap. 2: Tipos de seguro essenciais", desc: "Auto, moto, residencial, vida, saúde, empresarial e mais." },
    { title: "Cap. 3: Quanto custa (Tabela por Bairro)", desc: "Faixas de preço reais para Cidade Maia, Pimentas, Cumbica e outros." },
    { title: "Cap. 4: Como escolher a cobertura certa", desc: "Franquia, assistência, carro reserva e proteção de vidros." },
    { title: "Cap. 5: 8 dicas para economizar", desc: "Compilação estratégica para reduzir o valor da sua apólice." },
    { title: "Cap. 6: O que fazer em caso de sinistro", desc: "Passo a passo da Central de Sinistros para evitar burocracia." }
  ];

  const faqs = [
    { question: "O guia é realmente gratuito?", answer: "Sim, o Guia Completo de Seguros em Guarulhos é um material educativo gratuito da Patro Seguros." },
    { question: "Como recebo o acesso ao guia?", answer: "Basta preencher seu nome e WhatsApp no formulário acima. O acesso é liberado instantaneamente na mesma página." },
    { question: "O guia serve para empresas também?", answer: "Sim, o guia dedica um capítulo inteiro para proteção empresarial, frotas e riscos logísticos em Guarulhos." }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PageMeta
        title="Guia Completo de Seguros em Guarulhos | Patro Seguros"
        description="Baixe nosso guia completo: aprenda como proteger sua família, empresa e bens em Guarulhos. Passo a passo para economizar e escolher o seguro ideal."
        canonicalPath="/guia-completo-seguros-guarulhos"
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: CANONICAL_BASE_URL },
          { name: "Guia Completo de Seguros em Guarulhos", url: `${CANONICAL_BASE_URL}/guia-completo-seguros-guarulhos` }
        ]}
      />
      <FAQSchema faqs={faqs} />
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb items={[{ label: "Guia Completo" }]} />
        
        <section className="py-12 md:py-20 flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 space-y-6 text-left">
                <span className="inline-block text-sm font-semibold text-[#F2994A] bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  Material Gratuito 2026
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                  Guia Completo de Seguros em <span className="text-[#003366]">Guarulhos</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Tudo o que você precisa saber para proteger seu patrimônio, família e empresa na maior cidade da região metropolitana, economizando até 30% na contratação.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                    <span>Tabelas de preços por bairro em Guarulhos</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                    <span>Dicas para baixar o preço do Seguro Auto e Residencial</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                    <span>Checklist para empresas e frotas industriais</span>
                  </li>
                </ul>
            </div>
            
            <div className="lg:w-1/2 w-full max-w-lg mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 relative">
                <div className="absolute -top-4 -right-4 bg-[#F2994A] text-white p-3 rounded-2xl shadow-lg transform rotate-12 hidden md:block">
                  <BookOpen className="w-6 h-6" />
                </div>

                {!sent ? (
                    <form onSubmit={handleSubmit} className="space-y-5 text-left">
                        <div className="text-center mb-6">
                          <h2 className="text-2xl font-bold text-slate-900">Acesso Gratuito</h2>
                          <p className="text-slate-500 text-sm">Preencha para liberar o guia completo em PDF</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-slate-700 font-semibold">Nome completo</Label>
                          <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" required className="h-12 border-slate-200 focus:border-primary"/>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-slate-700 font-semibold">E-mail</Label>
                          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required className="h-12 border-slate-200 focus:border-primary"/>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="whatsapp" className="text-slate-700 font-semibold">WhatsApp</Label>
                          <Input id="whatsapp" value={whatsapp} onChange={e => setWhatsapp(formatWhatsApp(e.target.value))} placeholder="(11) 9xxxx-xxxx" required className="h-12 border-slate-200 focus:border-primary"/>
                        </div>

                        <Button type="submit" className="w-full h-14 bg-[#F2994A] hover:bg-[#d8873f] text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-200 transition-all hover:-translate-y-1" disabled={submitting}>
                            {submitting ? "Liberando acesso..." : "QUERO O MEU GUIA GRÁTIS"}
                        </Button>
                        <p className="text-[10px] text-center text-slate-400">Ao clicar, você concorda com nossa política de privacidade (LGPD).</p>
                    </form>
                ) : (
                    <div className="py-10 text-center space-y-6">
                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-12 h-12"/>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">Seu Guia está pronto!</h3>
                        <p className="text-slate-600">O conteúdo foi liberado abaixo para leitura ou download em PDF.</p>
                        <div className="flex flex-col gap-3">
                          <Button className="w-full h-14 bg-[#003366] text-white font-bold rounded-xl" onClick={() => window.open(GUIA_URL, "_blank")}>
                              <Download className="mr-2"/> Baixar Guia (PDF)
                          </Button>
                          <a 
                            href="https://wa.me/551151997500?text=Olá! Acabei de baixar o Guia Completo e gostaria de tirar uma dúvida sobre seguro."
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick("guia-sent-wa")}
                            className="text-primary font-bold text-sm hover:underline"
                          >
                            Falar com um especialista no WhatsApp
                          </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
        
        {sent && (
            <section className="py-16 animate-in fade-in slide-in-from-bottom-10 duration-700">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                  <div className="bg-[#003366] p-8 text-white text-center">
                    <h2 className="text-3xl font-bold">Conteúdo do Guia Completo</h2>
                    <p className="opacity-80 mt-2">Corretora Patro Seguros — SUSEP 212113511</p>
                  </div>
                  
                  <div className="p-8 md:p-12 space-y-12">
                    <div className="grid md:grid-cols-2 gap-8">
                      {capitulos.map((cap, i) => (
                        <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                            {i+1}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1">{cap.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed text-left">{cap.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex items-start gap-4 text-left">
                      <AlertCircle className="text-[#F2994A] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-orange-900 mb-2">Dica Extra de Economia</h4>
                        <p className="text-sm text-orange-800 leading-relaxed">
                          Em Guarulhos, muitas seguradoras oferecem descontos extras se você possuir seguro residencial e auto na mesma companhia. Solicite sempre a "Venda Casada Reversa" (Desconto de Fidelidade).
                        </p>
                      </div>
                    </div>

                    <div className="text-center pt-8 border-t border-slate-100">
                      <Link to="/cotacao?tipo=auto" onClick={() => trackCotacaoClick("guia-bottom")}>
                        <Button size="lg" className="bg-primary text-white font-bold px-10 h-14 rounded-2xl">
                          Solicitar cotação grátis agora
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
            </section>
        )}

        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left">
                <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuiaCompletoSegurosGuarulhos;
