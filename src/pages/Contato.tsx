import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook, Linkedin, Send, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GoogleBusinessWidget from "@/components/GoogleBusinessWidget";
import { useToast } from "@/hooks/use-toast";

const contatoFaqs = [
  { question: "Preciso agendar para ser atendido?", answer: "Não é obrigatório, mas recomendamos agendar para garantir atendimento personalizado e sem espera. Entre em contato pelo WhatsApp para agendar." },
  { question: "Atendem fora do horário comercial?", answer: "Para emergências e sinistros, temos plantão 24h. Para cotações e dúvidas gerais, atendemos de segunda a sexta das 9h às 18h e sábados das 9h às 13h." },
  { question: "Posso ser atendido online?", answer: "Sim! Grande parte do nosso atendimento é feito por WhatsApp, e-mail e videochamada. Você não precisa vir até o escritório se não quiser." },
  { question: "Quanto tempo demora para receber resposta?", answer: "Respondemos em até 2 horas úteis para todas as solicitações. Cotações completas são entregues no mesmo dia ou em até 24h para casos mais complexos." },
];

const servicoOptions = [
  "Seguro Auto",
  "Seguro Moto",
  "Seguro Empresarial",
  "Seguro Residencial",
  "Seguro de Vida",
  "Plano de Saúde",
  "Plano Odontológico",
  "Consórcio",
  "Seguro de Frota",
  "Seguro Rural / Agro",
  "Responsabilidade Civil",
  "Outro",
];

const socials = [
  { href: "https://www.instagram.com/patroseguros", icon: Instagram, label: "Instagram", handle: "@patroseguros" },
  { href: "https://www.facebook.com/patroseguros", icon: Facebook, label: "Facebook", handle: "/patroseguros" },
  { href: "https://www.linkedin.com/company/patro-seguros", icon: Linkedin, label: "LinkedIn", handle: "/patro-seguros" },
];

const Contato = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({ nome: "", email: "", telefone: "", servico: "", mensagem: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.nome.trim() || !formState.telefone.trim()) {
      toast({ title: "Preencha pelo menos seu nome e telefone.", variant: "destructive" });
      return;
    }
    setSending(true);

    // Build WhatsApp message with form data
    const parts = [
      `Olá! Vim pelo formulário de contato do site.`,
      `Nome: ${formState.nome.trim()}`,
      formState.email.trim() && `E-mail: ${formState.email.trim()}`,
      `Telefone: ${formState.telefone.trim()}`,
      formState.servico && `Interesse: ${formState.servico}`,
      formState.mensagem.trim() && `Mensagem: ${formState.mensagem.trim()}`,
    ].filter(Boolean).join("\n");

    // Track Meta Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", { content_name: "formulario-contato", content_category: formState.servico || "geral" });
    }

    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.open(`https://wa.me/551151997500?text=${encodeURIComponent(parts)}`, "_blank");
    }, 600);
  };

  const update = (field: string, value: string) => setFormState(prev => ({ ...prev, [field]: value }));

  return (
    <>
      <PageMeta title="Contato – Cidade Maia, Guarulhos" description="Entre em contato com a Patro Seguros no Cidade Maia, Guarulhos. Atendimento por WhatsApp, telefone e e-mail. Tire dúvidas e solicite cotações de seguros." />
      <FAQSchema faqs={contatoFaqs} />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-white mb-6">Fale Conosco</h1>
              <p className="text-xl text-white/70">
                Estamos prontos para atender você. Entre em contato e descubra como podemos te ajudar
              </p>
            </div>
          </div>
        </section>

        {/* Cards de contato */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="text-center hover:shadow-lg transition-base">
                <CardContent className="pt-6">
                  <Phone className="h-12 w-12 mx-auto mb-4 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold mb-2">Telefone</h3>
                  <a href="tel:1151997500" className="text-primary hover:underline">(11) 5199-7500</a>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-base">
                <CardContent className="pt-6">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <a href="https://wa.me/551151997500" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">(11) 5199-7500</a>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-base">
                <CardContent className="pt-6">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold mb-2">E-mail</h3>
                  <a href="mailto:contato@patroseguros.com.br" className="text-primary hover:underline text-sm">contato@patroseguros.com.br</a>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-base">
                <CardContent className="pt-6">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold mb-2">Horário</h3>
                  <p className="text-sm text-muted-foreground">Seg a Sex: 9h às 18h<br />Sáb: 9h às 13h</p>
                </CardContent>
              </Card>
            </div>

            {/* Formulário + Mapa lado a lado */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Formulário */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-1">Envie sua Mensagem</h2>
                  <p className="text-sm text-muted-foreground mb-6">Preencha o formulário e entraremos em contato rapidamente.</p>

                  {sent ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <CheckCircle className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Mensagem enviada!</h3>
                      <p className="text-sm text-muted-foreground mb-6">Você foi redirecionado ao WhatsApp. Responderemos em até 2h úteis.</p>
                      <Button variant="outline" onClick={() => { setSent(false); setFormState({ nome: "", email: "", telefone: "", servico: "", mensagem: "" }); }}>
                        Enviar outra mensagem
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="nome">Nome *</Label>
                          <Input id="nome" placeholder="Seu nome completo" value={formState.nome} onChange={e => update("nome", e.target.value)} maxLength={100} required />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="telefone">Telefone / WhatsApp *</Label>
                          <Input id="telefone" placeholder="(11) 99999-9999" value={formState.telefone} onChange={e => update("telefone", e.target.value)} maxLength={20} required />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" placeholder="seu@email.com" value={formState.email} onChange={e => update("email", e.target.value)} maxLength={255} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="servico">Tipo de Serviço</Label>
                        <Select value={formState.servico} onValueChange={v => update("servico", v)}>
                          <SelectTrigger id="servico">
                            <SelectValue placeholder="Selecione o serviço de interesse" />
                          </SelectTrigger>
                          <SelectContent>
                            {servicoOptions.map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="mensagem">Mensagem</Label>
                        <Textarea id="mensagem" placeholder="Como podemos te ajudar?" value={formState.mensagem} onChange={e => update("mensagem", e.target.value)} maxLength={1000} rows={4} />
                      </div>
                      <Button type="submit" variant="cta" className="w-full" disabled={sending}>
                        {sending ? "Enviando..." : <><Send className="mr-2 h-4 w-4" /> Enviar Mensagem</>}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">Ao enviar, você será redirecionado ao nosso WhatsApp para atendimento imediato.</p>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Mapa interativo */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-0 overflow-hidden rounded-xl">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.8!2d-46.4494!3d-23.4462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8a1b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sAv.+Salgado+Filho%2C+2120+-+Centro%2C+Guarulhos+-+SP%2C+07115-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="320"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localização Patro Seguros — Av. Salgado Filho, 2120, Guarulhos"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-5">
                      <MapPin className="h-7 w-7 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <h3 className="font-semibold mb-1">Nosso Endereço</h3>
                        <p className="text-sm text-muted-foreground">
                          Avenida Salgado Filho, 2120 – Ed. Via Alameda – Sala 219<br />Cidade Maia, Guarulhos/SP · CEP 07115-000
                        </p>
                      </div>
                    </div>
                    <div className="border-t pt-5">
                      <h4 className="font-semibold text-sm mb-3">Como Chegar</h4>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        <li>• Próximo ao Aeroporto Internacional de Guarulhos</li>
                        <li>• Fácil acesso pela Rodovia Dutra</li>
                        <li>• Estacionamento no local</li>
                        <li>• Atendimento com hora marcada</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="mb-12">
              <h2 className="text-center text-xl font-bold mb-6">Siga a Patro nas Redes Sociais</h2>
              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {socials.map(({ href, icon: Icon, label, handle }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-muted/50 rounded-xl border hover:border-primary/30 hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{label}</p>
                      <p className="text-xs text-muted-foreground">{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Google Business Widget */}
            <GoogleBusinessWidget />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6">Prefere Falar Agora?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para atender você via WhatsApp ou telefone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/551151997500" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="cta" className="w-full sm:w-auto text-lg px-8">
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Chamar no WhatsApp
                </Button>
              </a>
              <a href="tel:1151997500" className="w-full sm:w-auto">
                <Button size="lg" variant="default" className="w-full sm:w-auto text-lg px-8">
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  Ligar Agora
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-12">Perguntas Frequentes sobre Atendimento</h2>
            <div className="divide-y divide-border">
              {contatoFaqs.map((faq, i) => (
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
      </main>
      <Footer />
    </>
  );
};

export default Contato;
