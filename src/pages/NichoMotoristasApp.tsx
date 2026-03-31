import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, MessageCircle, ArrowRight, Shield, FileWarning, Car, Clock, MapPin, Smartphone, Users, AlertTriangle } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick, trackCotacaoSubmit } from "@/lib/tracking";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20sou%20motorista%20de%20aplicativo%20e%20gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const faqs = [
  { question: "Posso usar seguro convencional para rodar por aplicativo?", answer: "Não é recomendado. Se a seguradora constatar uso comercial não declarado, pode negar a indenização. A investigação verifica app no celular, GPS e depoimentos de passageiros." },
  { question: "Quanto custa o seguro para motorista de app em Guarulhos?", answer: "Para carros populares (Onix, HB20, Argo), de R$ 3.000 a R$ 5.500/ano. Sedãs como Corolla e Civic ficam entre R$ 5.000 e R$ 8.000. Depende do perfil, CEP e horas rodadas." },
  { question: "O seguro cobre acidente com passageiro?", answer: "Sim, com a cobertura RC-APP (Acidentes Pessoais de Passageiros). É obrigatória por lei para transporte remunerado e cobre despesas médicas, invalidez e morte acidental." },
  { question: "Todas as seguradoras aceitam motorista de app?", answer: "Não. Apenas parte aceita. Algumas exigem rastreador, outras limitam idade do veículo ou região. Na Patro, trabalhamos com todas as que aceitam e encontramos a melhor opção." },
  { question: "Motorista parcial precisa de seguro para app?", answer: "Sim. Mesmo rodando poucas horas, se sofrer sinistro durante corrida com seguro convencional, a cobertura pode ser negada. Motoristas parciais pagam menos." },
  { question: "O que acontece se eu for roubado durante uma corrida?", answer: "Com seguro para app, o processo é igual: B.O., contato conosco, e a seguradora indeniza 100% da FIPE sem franquia. A diferença é que o seguro para app contempla o risco elevado durante corridas." },
];

const seguros = [
  { title: "Seguro Auto para App", desc: "Cobertura completa com declaração de uso profissional por aplicativo.", link: "/seguro-motorista-app", icon: Car },
  { title: "RC Passageiros (APP)", desc: "Obrigatório por lei. Cobre despesas médicas e indenizações de passageiros.", link: "/seguro-acidentes-pessoais", icon: Users },
  { title: "Seguro de Vida", desc: "Proteção financeira para sua família — essencial para quem depende do carro para sustento.", link: "/seguro-vida", icon: Shield },
  { title: "Seguro Celular", desc: "Proteja seu smartphone, ferramenta essencial do motorista de app.", link: "/seguro-celular", icon: Smartphone },
  { title: "Seguro de Frota", desc: "Para quem tem mais de um veículo rodando por aplicativo.", link: "/seguro-frota", icon: Car },
  { title: "Seguro Acidentes Pessoais", desc: "Cobertura para o próprio motorista em caso de acidente durante o trabalho.", link: "/seguro-acidentes-pessoais", icon: AlertTriangle },
];

const dores = [
  "Seguro convencional pode NEGAR seu sinistro se descobrir que você roda por app",
  "Roubo durante corrida noturna e sem cobertura = carro perdido + meses sem renda",
  "Passageiro se machuca no seu carro e você responde judicialmente sem RC-APP",
  "Cada dia com carro na oficina sem carro reserva é R$ 200 a R$ 400 de renda perdida",
  "Alagamento em Guarulhos danifica seu carro e o seguro nega por 'uso não declarado'",
];

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const NichoMotoristasApp = () => {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    veiculo: "",
    plataforma: "",
    horas: "",
    regiao: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.telefone.trim() || !formData.veiculo.trim() || !formData.plataforma) {
      toast({ title: "Preencha os campos obrigatórios", variant: "destructive" });
      return;
    }

    setSending(true);
    trackCotacaoSubmit("nicho-motoristas-app");

    const subject = `[Nicho Motorista App] Cotação de ${formData.nome}`;
    const textBody = `Nome: ${formData.nome}\nTelefone: ${formData.telefone}\nEmail: ${formData.email}\nVeículo: ${formData.veiculo}\nPlataforma: ${formData.plataforma}\nHoras/dia: ${formData.horas}\nRegião: ${formData.regiao}`;
    const htmlBody = `<h2>Nova Cotação — Motorista de App</h2><p><strong>Nome:</strong> ${escapeHtml(formData.nome)}</p><p><strong>Telefone:</strong> ${escapeHtml(formData.telefone)}</p><p><strong>Email:</strong> ${escapeHtml(formData.email || "Não informado")}</p><p><strong>Veículo:</strong> ${escapeHtml(formData.veiculo)}</p><p><strong>Plataforma:</strong> ${escapeHtml(formData.plataforma)}</p><p><strong>Horas/dia:</strong> ${escapeHtml(formData.horas || "Não informado")}</p><p><strong>Região:</strong> ${escapeHtml(formData.regiao || "Não informada")}</p>`;

    try {
      await supabase.functions.invoke("send-form-email", { body: { subject, textBody, htmlBody } });
    } catch { /* silent */ }

    const msg = encodeURIComponent(`Olá, sou motorista de aplicativo e quero cotar seguro.\n\nNome: ${formData.nome}\nVeículo: ${formData.veiculo}\nPlataforma: ${formData.plataforma}\nHoras/dia: ${formData.horas || "Não informado"}\nRegião: ${formData.regiao || "Não informada"}`);
    window.open(`https://wa.me/551151997500?text=${msg}`, "_blank");
    trackWhatsAppClick("nicho-motoristas-app-form");

    toast({ title: "Solicitação enviada!", description: "Você será redirecionado ao WhatsApp." });
    setSending(false);
  };

  return (
    <>
      <PageMeta
        title="Seguros para Motoristas de Aplicativo | Patro Seguros"
        description="Seguros especializados para motoristas de Uber, 99 e inDrive em Guarulhos e região. Cobertura durante corridas, RC passageiros, carro reserva. Cotação grátis."
      />
      <FAQSchema faqs={faqs} />
      <Header />
      <main id="main-content">
        <Breadcrumb items={[{ label: "Seguros por Nicho" }, { label: "Motoristas de Aplicativo" }]} />

        {/* Hero */}
        <section className="gradient-hero py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-block bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-6">Especializado para Motoristas de App</span>
            <h1 className="text-white mb-4">Seguros para Motoristas de Uber, 99 e inDrive</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Proteção real para quem depende do carro para viver. Cobertura válida durante corridas, RC passageiros obrigatório e carro reserva estendido — em Guarulhos e região.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#formulario">
                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg" onClick={() => trackCotacaoClick("nicho-motoristas-app")}>Cotar Seguro para App</Button>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("nicho-motoristas-app")}>
                <Button size="lg" variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> Falar com Especialista</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Dores */}
        <section className="py-16 bg-destructive/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-8">Riscos Reais que Motoristas de App Enfrentam</h2>
            <div className="space-y-4">
              {dores.map((dor, i) => (
                <div key={i} className="flex items-start gap-3 bg-background p-4 rounded-lg shadow-sm">
                  <FileWarning className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{dor}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Car, value: "200-300 km", label: "Rodados por dia" },
                { icon: Clock, value: "24h", label: "Apólice ativa" },
                { icon: MapPin, value: "GRU + SP", label: "Área de cobertura" },
                { icon: Users, value: "RC-APP", label: "Passageiros cobertos" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <stat.icon className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seguros recomendados */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-center mb-4">Seguros Essenciais para Motoristas de App</h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto text-sm">Cada solução foi selecionada para cobrir os riscos específicos de quem roda por aplicativo.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {seguros.map((s, i) => (
                <Link key={i} to={s.link} className="group">
                  <div className="border rounded-xl p-6 h-full hover:shadow-lg transition-all hover:border-primary/30">
                    <s.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                    <span className="text-sm font-medium text-primary flex items-center">Saiba mais <ArrowRight className="ml-1 h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section id="formulario" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 max-w-xl">
            <h2 className="text-center mb-2">Cotação Rápida para Motorista de App</h2>
            <p className="text-center text-muted-foreground mb-8 text-sm">Preencha e receba sua cotação personalizada em até 2 horas.</p>
            <form onSubmit={handleSubmit} className="bg-background border rounded-xl p-6 space-y-4 shadow-sm">
              <div>
                <Label htmlFor="nome">Nome completo *</Label>
                <Input id="nome" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} placeholder="Seu nome" maxLength={100} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefone">WhatsApp *</Label>
                  <Input id="telefone" value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })} placeholder="(11) 99999-9999" maxLength={15} required />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="seu@email.com" maxLength={255} />
                </div>
              </div>
              <div>
                <Label htmlFor="veiculo">Veículo (Marca/Modelo/Ano) *</Label>
                <Input id="veiculo" value={formData.veiculo} onChange={(e) => setFormData({ ...formData, veiculo: e.target.value })} placeholder="Ex: Chevrolet Onix 2023" maxLength={100} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Plataforma(s) *</Label>
                  <Select value={formData.plataforma} onValueChange={(v) => setFormData({ ...formData, plataforma: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Uber">Uber</SelectItem>
                      <SelectItem value="99">99</SelectItem>
                      <SelectItem value="inDrive">inDrive</SelectItem>
                      <SelectItem value="Uber + 99">Uber + 99</SelectItem>
                      <SelectItem value="Múltiplas">Múltiplas plataformas</SelectItem>
                      <SelectItem value="Outra">Outra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Horas rodadas/dia</Label>
                  <Select value={formData.horas} onValueChange={(v) => setFormData({ ...formData, horas: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Até 4h">Até 4h (parcial)</SelectItem>
                      <SelectItem value="4h a 8h">4h a 8h</SelectItem>
                      <SelectItem value="8h a 12h">8h a 12h (integral)</SelectItem>
                      <SelectItem value="Mais de 12h">Mais de 12h</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Região de atuação</Label>
                <Select value={formData.regiao} onValueChange={(v) => setFormData({ ...formData, regiao: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Guarulhos">Guarulhos</SelectItem>
                    <SelectItem value="São Paulo">São Paulo - Capital</SelectItem>
                    <SelectItem value="Guarulhos + SP">Guarulhos + São Paulo</SelectItem>
                    <SelectItem value="Grande SP">Grande São Paulo</SelectItem>
                    <SelectItem value="Região Metropolitana">Região Metropolitana completa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={sending}>
                {sending ? "Enviando..." : "Enviar e Falar no WhatsApp"}
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">Ao enviar, você será redirecionado ao WhatsApp para dar continuidade ao atendimento.</p>
            </form>
          </div>
        </section>

        {/* Por que Patro */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-8">Por Que Motoristas de App Escolhem a Patro</h2>
            <div className="space-y-3">
              {[
                "Especialistas em seguro para motoristas de Uber, 99 e inDrive",
                "Cotamos apenas com seguradoras que aceitam uso profissional por app",
                "Suporte prioritário em sinistros — sabemos que cada dia parado é renda perdida",
                "Carro reserva estendido de até 30 dias para você não parar de trabalhar",
                "Atendimento rápido via WhatsApp — resposta em até 2 horas úteis",
                "Parcelamento em até 10x sem juros no cartão ou boleto",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog link */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h3 className="font-semibold mb-2">📖 Leia o Guia Completo</h3>
            <p className="text-sm text-muted-foreground mb-4">Tudo o que motoristas de app precisam saber sobre seguro: coberturas, preços, dicas e riscos em Guarulhos.</p>
            <Link to="/blog/seguro-motorista-aplicativo-guia">
              <Button variant="outline" className="rounded-lg">Ler Artigo Completo <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-center mb-8">Perguntas Frequentes</h2>
            <div className="divide-y divide-border">
              {faqs.map((faq, i) => (
                <details key={i} className="group py-5" open={i === 0}>
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-semibold hover:text-primary transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-muted-foreground/30 ml-4 group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                  </summary>
                  <p className="pt-3 text-sm text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-white mb-4">Proteja Seu Carro e Sua Renda</h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto text-sm">Cotação gratuita e sem compromisso. Resposta em até 2 horas.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#formulario">
                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg" onClick={() => trackCotacaoClick("nicho-motoristas-app-cta")}>Pedir Cotação Gratuita</Button>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("nicho-motoristas-app-cta")}>
                <Button size="lg" variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NichoMotoristasApp;
