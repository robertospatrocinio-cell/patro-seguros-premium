import { useState } from "react";
import { z } from "zod";
import { CheckCircle, Download, BookOpen, Target, TrendingUp, Lightbulb, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ebookMockup from "@/assets/ebook-mockup-consorcio.webp";

const EBOOK_URL = "/downloads/ebook-consorcio-patro.pdf";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(80, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\(\d{2}\)\s9\d{4}-\d{4}$/, "WhatsApp inválido. Use formato (11) 9xxxx-xxxx"),
});

const formatWhatsApp = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const beneficios = [
  { icon: Lightbulb, title: "Entenda como funciona", desc: "Saiba como escolher o consórcio certo para suas necessidades e objetivos." },
  { icon: Target, title: "Estratégias de contemplação", desc: "Descubra estratégias inteligentes para aumentar suas chances de contemplação." },
  { icon: TrendingUp, title: "Tire suas dúvidas", desc: "Respostas claras sobre consórcios e suas vantagens reais frente ao financiamento." },
];

const publicoAlvo = [
  { title: "Quem deseja adquirir bens ou serviços", desc: "Se você está com um plano em mente, no carro, no imóvel ou comprometer com altas taxas, aprenda como o consórcio pode ser a solução ideal e econômica." },
  { title: "Quem já considera consórcios, mas tem dúvidas sobre como funcionam", desc: "Se você já ouviu falar sobre consórcios, mas não sabe ao certo como essa modalidade pode beneficiá-lo, descubra tudo o que você precisa saber para escolher com confiança." },
  { title: "Investidores que buscam alternativas de aquisição sem pressa", desc: "Se você é um investidor que prefere alternativas de longo prazo e deseja adquirir bens sem a pressão do financiamento tradicional, este guia mostrará como os consórcios podem ser encarados na sua estratégia." },
  { title: "Pessoas que querem entender melhor suas opções de compra", desc: "Se você está começando a explorar suas opções de aquisição e quer entender como os consórcios se comparam a outras formas de compra, este guia oferece uma visão clara e essencial sobre a modalidade." },
];

const bensCategorias = [
  { emoji: "🚗", title: "Bens Móveis", items: ["Aquisição de veículos novos e usados", "Aquisição de motocicletas", "Aquisição de pesados como caminhões, tratores, ônibus e implementos agrícolas"] },
  { emoji: "🏠", title: "Imóveis", items: ["Compra e venda (mover prontoLatransferência patrimonial/terreno/área urbana e rural)", "Compra e venda com garantia substitutiva (móvel na planta)", "Construção", "Reforma", "Quitação de financiamento próprio", "Compra e venda com intervenção bancária (financiamento de terceiros)", "Substituição de garantia"] },
  { emoji: "🛠️", title: "Serviços", items: ["Utilização em cirurgias plásticas", "Casamentos", "Formaturas", "Viagens", "Eventos", "Intercâmbio", "Instalações"] },
];

const EbookConsorcio = () => {
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
      const safeName = escapeHtml(parsed.data.name);
      const safeEmail = escapeHtml(parsed.data.email);
      const safeWhats = escapeHtml(parsed.data.whatsapp);

      try {
        await supabase.functions.invoke("send-form-email", {
          body: {
            subject: "📥 Novo Lead E-book Consórcio",
            textBody: `Novo download de E-book do Consórcio.\n\nNome: ${parsed.data.name}\nE-mail: ${parsed.data.email}\nWhatsApp: ${parsed.data.whatsapp}`,
            htmlBody: `<h2>📥 Novo lead — E-book Consórcio</h2>
              <p><strong>Nome:</strong> ${safeName}</p>
              <p><strong>E-mail:</strong> ${safeEmail}</p>
              <p><strong>WhatsApp:</strong> ${safeWhats}</p>`,
          },
        });
      } catch (mailErr) {
        // Não bloqueia o download se o envio de e-mail falhar (SMTP instável)
        console.warn("Falha ao notificar lead por e-mail:", mailErr);
      }

      try {
        (window as any).fbq?.("track", "Lead", { content_name: "ebook-consorcio" });
        (window as any).gtag?.("event", "generate_lead", {
          event_category: "lead_magnet",
          event_label: "ebook-consorcio",
        });
      } catch {}

      setSent(true);
      toast.success("Pronto! Seu e-book está liberado.");
    } catch (err) {
      console.error(err);
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="E-book Grátis: Guia do Consórcio Desvendado | Patro Seguros"
        description="Baixe gratuitamente o Guia do Consórcio Patro Seguros: passo a passo para adquirir imóvel, veículo ou serviço sem juros de financiamento."
      />
      <Header />
      <main id="main-content" className="flex-1">
        <Breadcrumb items={[{ label: "E-book Consórcio" }]} />

        {/* Hero + Form */}
        <section className="bg-gradient-to-br from-primary via-primary to-[hsl(210,100%,18%)] text-white">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
              {/* Left: copy + mockup */}
              <div>
                <span className="inline-block text-sm font-semibold text-amber-400 mb-4">
                  🎁 Material Gratuito Patro Seguros
                </span>
                <h1 className="text-3xl md:text-5xl font-heading font-extrabold mb-5 leading-tight">
                  Baixe gratuitamente o <span className="text-amber-400">Guia do Consórcio Desvendado</span>
                </h1>
                <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
                  Tenha o passo a passo para adquirir <strong>imóvel, veículo ou serviço</strong> de forma planejada e sem juros de financiamento.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Entenda como escolher o consórcio para suas necessidades e objetivos",
                    "Descubra estratégias inteligentes para aumentar suas chances de contemplação",
                    "Tire suas dúvidas com respostas claras sobre consórcios e suas vantagens",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="hidden lg:flex justify-start">
                  <img
                    src={ebookMockup}
                    alt="Capa do E-book Guia do Consórcio Patro Seguros"
                    width={280}
                    height={280}
                    loading="eager"
                    className="w-full max-w-[260px] drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Right: Form card */}
              <div className="bg-white text-foreground rounded-2xl shadow-2xl p-6 md:p-8">
                <div className="lg:hidden flex justify-center mb-4">
                  <img
                    src={ebookMockup}
                    alt="Capa do E-book Guia do Consórcio Patro Seguros"
                    width={180}
                    height={180}
                    loading="eager"
                    className="w-40 drop-shadow-xl"
                  />
                </div>
                <div className="text-center mb-6">
                  <BookOpen className="h-10 w-10 text-primary mx-auto mb-2" />
                  <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                    {sent ? "Tudo pronto!" : "Atenção: não deixe seus sonhos para depois"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {sent ? "Clique abaixo para baixar seu e-book." : "Preencha os dados e receba o e-book gratuitamente"}
                  </p>
                </div>

                {!sent ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome"
                        required
                        maxLength={80}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        required
                        maxLength={255}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                        placeholder="(11) 9xxxx-xxxx"
                        required
                        inputMode="tel"
                        maxLength={16}
                        className="h-12"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="cta"
                      disabled={submitting}
                      className="w-full h-12 rounded-xl text-base font-bold"
                    >
                      {submitting ? "Enviando..." : (
                        <>
                          <Download className="mr-2 h-5 w-5" /> BAIXAR AGORA
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Seus dados estão protegidos. Respeitamos a LGPD.
                    </p>
                  </form>
                ) : (
                  <div className="text-center space-y-4 py-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    <p className="text-foreground font-semibold">
                      Sucesso! Seu e-book está liberado.
                    </p>
                    <a href={EBOOK_URL} download>
                      <Button variant="cta" size="lg" className="rounded-xl">
                        <Download className="mr-2 h-5 w-5" /> Baixar E-book
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Tenha o passo a passo */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Tenha o passo a passo do <span className="text-primary">Guia Consórcio Desvendado</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Para adquirir imóvel, veículo ou serviço de forma planejada e sem juros de financiamento.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {beneficios.map((b) => (
                <div key={b.title} className="bg-card border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="mx-auto w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <b.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categorias de bens */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-center text-foreground mb-10">
              O que você pode conquistar com um consórcio
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {bensCategorias.map((cat) => (
                <div key={cat.title} className="bg-card border rounded-2xl p-6">
                  <div className="text-3xl mb-3">{cat.emoji}</div>
                  <h3 className="font-heading font-bold text-foreground mb-3">{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a href="#topo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                <Button variant="cta" size="lg" className="rounded-xl">
                  <Download className="mr-2 h-5 w-5" /> BAIXAR AGORA
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Para quem é o guia */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <Users className="h-10 w-10 text-primary mx-auto mb-3" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Para quem é o Guia Desvendando os Consórcios
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {publicoAlvo.map((p) => (
                <div key={p.title} className="bg-card border-l-4 border-primary rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-heading font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-[hsl(210,100%,18%)] text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Pronto para conquistar seus sonhos sem juros?
            </h2>
            <p className="text-lg text-white/85 mb-8">
              Baixe gratuitamente agora o e-book exclusivo da Patro Seguros e comece seu planejamento hoje mesmo.
            </p>
            <a href="#topo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <Button variant="cta" size="lg" className="rounded-xl text-base px-10">
                <Download className="mr-2 h-5 w-5" /> BAIXAR AGORA GRATUITAMENTE
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EbookConsorcio;
