import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";
import EbookConsorcioBanner from "@/components/EbookConsorcioBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Home, Car, Briefcase, Sparkles, TrendingUp, CheckCircle2, AlertTriangle,
  ArrowRight, Phone, MessageCircle, MapPin, ShieldCheck, ClipboardList,
  Search, Compass, Handshake, LifeBuoy, HelpCircle, Lock,
} from "lucide-react";
import { z } from "zod";
import { nameSchema, whatsappSchema, firstZodMessage } from "@/lib/leadValidation";
import { showValidationError, showFriendlyError } from "@/lib/friendlyToast";
import { trackWhatsAppClick, trackCotacaoSubmit, trackCotacaoClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=" + encodeURIComponent(
  "Olá, quero simular um consórcio com a Patro. Meu objetivo é entender as opções para imóvel, veículo ou empresa."
);

const objetivos = [
  { icon: Home, title: "Imóvel", desc: "Comprar casa, apartamento, terreno, sala comercial, construir, reformar ou quitar financiamento.", tipo: "Imóvel" },
  { icon: Car, title: "Veículo", desc: "Planejar a compra de carro novo, seminovo, moto, caminhão ou veículo para trabalho.", tipo: "Veículo" },
  { icon: Briefcase, title: "Empresa", desc: "Adquirir veículos, equipamentos, máquinas, imóvel comercial ou estruturar expansão com planejamento.", tipo: "Empresa" },
  { icon: Sparkles, title: "Serviços", desc: "Realizar projetos como reforma, viagem, estudo, procedimentos ou eventos importantes.", tipo: "Serviços" },
  { icon: TrendingUp, title: "Patrimônio", desc: "Usar o consórcio como estratégia para construir patrimônio no médio e longo prazo.", tipo: "Imóvel" },
];

const comoFunciona = [
  "Não há juros de financiamento — existe taxa de administração diluída nas parcelas.",
  "O crédito e as parcelas podem ser reajustados conforme o índice previsto em contrato.",
  "A contemplação pode ocorrer por sorteio mensal ou por lance.",
  "Não existe data garantida para contemplação — depende do grupo e da estratégia.",
  "A carta de crédito serve para o bem ou serviço previsto, conforme regras do grupo.",
  "O ideal é escolher o plano com orientação consultiva para evitar erros de planejamento.",
];

const comoAjudamos = [
  { icon: Search, title: "Entendemos seu objetivo", desc: "Imóvel, veículo, empresa, patrimônio ou serviço — começamos pelo que você quer conquistar." },
  { icon: Compass, title: "Simulamos possibilidades", desc: "Analisamos crédito, parcela, prazo e estratégia mais adequada ao seu momento." },
  { icon: ClipboardList, title: "Explicamos as regras", desc: "Taxas, reajustes, assembleias, sorteios e lances — sem letras miúdas escondidas." },
  { icon: Handshake, title: "Ajudamos na contratação", desc: "Você entende tudo antes de decidir e contrata com clareza." },
  { icon: LifeBuoy, title: "Acompanhamos sua jornada", desc: "Suporte até a contemplação e uso da carta de crédito." },
];

const vantagens = [
  "Planejamento financeiro de médio e longo prazo",
  "Sem juros de financiamento",
  "Possibilidade de antecipar com lance",
  "Flexibilidade de crédito conforme o objetivo",
  "Construção planejada de patrimônio",
  "Alternativa para quem não quer entrada alta",
  "Opção para pessoas físicas e empresas",
  "Acompanhamento consultivo da Patro",
];

const cuidados = [
  "Verifique a taxa de administração e o fundo de reserva.",
  "Entenda o índice de reajuste do crédito e das parcelas.",
  "Saiba que a contemplação não tem data garantida.",
  "Avalie sua capacidade real de pagamento mensal.",
  "Entenda as regras de lance embutido, fixo e livre.",
  "Confira as regras de cancelamento e desistência.",
  "Contrate com orientação para evitar decisões erradas.",
];

const comparativo = [
  { feat: "Indicação principal", c: "Quem pode planejar a compra", f: "Quem precisa do bem imediatamente" },
  { feat: "Juros de financiamento", c: "Não há", f: "Sim, compostos" },
  { feat: "Entrada", c: "Geralmente não exigida", f: "Normalmente obrigatória" },
  { feat: "Lance", c: "Pode ser usado para antecipar", f: "Não se aplica" },
  { feat: "Acesso ao bem", c: "Depende de contemplação", f: "Imediato após aprovação" },
  { feat: "Horizonte ideal", c: "Médio e longo prazo", f: "Curto prazo" },
  { feat: "Custo total da operação", c: "Tende a ser menor", f: "Pode ser maior" },
];

const faqs = [
  { q: "O que é consórcio?", a: "Consórcio é uma forma de compra planejada em grupo, regulamentada pelo Banco Central. Os participantes pagam parcelas mensais e podem ser contemplados por sorteio ou lance. Ao ser contemplado, o cliente recebe uma carta de crédito para adquirir o bem ou serviço previsto no grupo." },
  { q: "Consórcio tem juros?", a: "Não há juros de financiamento. Existe uma taxa de administração cobrada pela administradora, além de fundo de reserva e seguro quando previstos em contrato. Todos esses custos são apresentados antes da contratação." },
  { q: "O que é a taxa de administração?", a: "É a remuneração da administradora do consórcio pelos serviços prestados ao grupo. A taxa é diluída ao longo das parcelas e o percentual varia conforme a administradora, o prazo e o tipo de bem." },
  { q: "Como funciona a contemplação?", a: "Mensalmente, em assembleia, ocorrem sorteios e disputas de lance. O participante pode ser contemplado pelo sorteio ou ao oferecer um lance vencedor. Após contemplado, a carta de crédito é liberada conforme as regras do grupo." },
  { q: "Posso dar lance?", a: "Sim. Existem diferentes modalidades, como lance livre, lance fixo e lance embutido (usando parte do próprio crédito). A estratégia de lance é um dos pontos em que a orientação consultiva faz mais diferença." },
  { q: "Quanto tempo demora para ser contemplado?", a: "Não existe prazo garantido. A contemplação pode ocorrer em qualquer assembleia do grupo, por sorteio ou lance. Por isso o consórcio é indicado para quem pode planejar a aquisição." },
  { q: "Existe garantia de contemplação?", a: "Não. A única garantia é que todos os participantes ativos serão contemplados até o encerramento do grupo. Qualquer promessa de “carta contemplada garantida” em data específica deve ser vista com cautela." },
  { q: "Posso usar FGTS no consórcio de imóvel?", a: "Sim, conforme as regras vigentes do FGTS. O saldo pode ser utilizado para dar lance, complementar a carta de crédito ou amortizar parcelas, dentro das condições previstas pela Caixa." },
  { q: "Consórcio vale mais a pena que financiamento?", a: "Depende do perfil. O consórcio costuma ter custo total menor por não ter juros de financiamento, mas exige planejamento porque a contemplação não é imediata. O financiamento é melhor para quem precisa do bem agora." },
  { q: "Posso fazer consórcio para empresa?", a: "Sim. Empresas usam o consórcio para adquirir veículos, máquinas, equipamentos e imóveis comerciais com planejamento e sem comprometer o fluxo de caixa com juros." },
  { q: "O que acontece se eu cancelar?", a: "O cancelamento é permitido, mas o reembolso segue as regras do contrato — normalmente ocorre ao final do grupo, com possíveis descontos previstos. Avalie sempre antes de contratar." },
  { q: "A Patro acompanha depois da contratação?", a: "Sim. Nosso atendimento continua após a contratação: tiramos dúvidas sobre assembleias, lances, reajustes e ajudamos no uso correto da carta de crédito quando você é contemplado." },
];

const bairros = [
  "Centro de Guarulhos", "Cidade Maia", "Cumbica", "Bonsucesso",
  "Vila Galvão", "Picanço", "Maia", "Região do Aeroporto", "Grande São Paulo",
];

const simulacaoSchema = z.object({
  name: nameSchema,
  whatsapp: whatsappSchema,
  city: z.string().trim().min(2, "Informe sua cidade").max(80),
  tipo: z.string().min(1, "Escolha o tipo de consórcio"),
  credito: z.string().trim().min(1, "Informe o crédito aproximado").max(40),
  horario: z.string().min(1, "Escolha o melhor horário"),
});

const Consorcio = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", whatsapp: "", city: "Guarulhos", tipo: "", credito: "", horario: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = simulacaoSchema.safeParse(form);
    if (!parsed.success) {
      showValidationError(firstZodMessage(parsed.error));
      return;
    }
    setLoading(true);
    try {
      const { name, whatsapp, city, tipo, credito, horario } = parsed.data;
      const msg = `Olá, sou ${name} (${whatsapp}), de ${city}. Quero simular um consórcio de ${tipo} com crédito de ${credito}. Melhor horário: ${horario}.`;
      const popup = window.open(
        `https://wa.me/551151997500?text=${encodeURIComponent(msg)}`,
        "_blank", "noopener,noreferrer",
      );
      if (!popup) {
        showFriendlyError("Não conseguimos abrir o WhatsApp. Toque no botão para falar com a Patro.", { whatsappMessage: msg });
        return;
      }
      trackCotacaoSubmit("consorcio", { origin: "consorcio_simulacao" });
      toast.success("Recebemos sua solicitação! Um consultor da Patro responderá em breve.");
      setForm({ name: "", whatsapp: "", city: "Guarulhos", tipo: "", credito: "", horario: "" });
    } catch (err) {
      console.error("Consorcio submit failed", err);
      showFriendlyError();
    } finally {
      setLoading(false);
    }
  };

  const goToForm = () => {
    document.getElementById("simulacao")?.scrollIntoView({ behavior: "smooth", block: "start" });
    trackCotacaoClick("consorcio_anchor");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Consórcio em Guarulhos | Imóveis, Veículos e Empresas"
        description="Consórcio em Guarulhos com orientação consultiva. Simule crédito para imóvel, veículo, empresa ou serviços com explicação clara da Patro Seguros."
      />
      <FAQSchema faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[
        { name: "Início", url: "https://www.patroseguros.com.br/" },
        { name: "Consórcio em Guarulhos", url: "https://www.patroseguros.com.br/consorcio" },
      ]} />
      <ServiceSchema
        name="Consórcio em Guarulhos"
        description="Consultoria de consórcio para imóveis, veículos, empresas e serviços, com orientação sobre crédito, parcelas, lances e contemplação."
        serviceType="Consórcio"
        areaServed="Guarulhos e Grande São Paulo"
      />
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-blue-800 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              💰 Sem juros • Regulamentado pelo Banco Central
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight text-white">
              Consórcio Sem Juros: A Forma Mais <span className="text-yellow-300">Inteligente</span> de Conquistar Imóveis, Carros e Frota
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              Carro, moto, imóvel ou veículo pesado — sem juros, sem entrada e com parcelas que cabem no seu orçamento. Nossa consultoria desenha a estratégia de lance e contemplação para você economizar até 40% frente ao financiamento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio-hero")}>
                <Button size="lg" variant="cta" className="rounded-xl text-base px-8 w-full sm:w-auto">
                  Solicitar estudo personalizado
                </Button>
              </a>
              <a href="tel:1151997500">
                <Button size="lg" variant="outline" className="rounded-xl text-base px-8 border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                  <Phone className="h-4 w-4 mr-2" />
                  (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modalidades */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Escolha a Modalidade de Consórcio Ideal Para Você
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temos as melhores opções para cada necessidade. Compare e escolha a modalidade que faz sentido para o seu momento.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {modalidades.map((m) => (
              <div key={m.title} className="group bg-card rounded-2xl border p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <m.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">{m.title}</h3>
                    <p className="text-muted-foreground">{m.desc}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {m.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                {m.link ? (
                  <Link to={m.link} className="w-full">
                    <Button className="w-full rounded-xl group-hover:bg-primary">
                      Saiba Mais sobre {m.title} <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full" onClick={() => trackWhatsAppClick("consorcio-modalidade")}>
                    <Button className="w-full rounded-xl group-hover:bg-primary">
                      Simular {m.title} <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <EbookConsorcioBanner variant="full" />

      {/* Por que Consórcio */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Por Que Escolher o Consórcio em Vez do Financiamento?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra as vantagens que fazem do consórcio a melhor escolha para quem quer economizar e planejar.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {porqueConsorcio.map((item) => (
              <div key={item.title} className="bg-card rounded-2xl border p-6 text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Consórcio vs Financiamento: Comparativo Completo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Veja por que o consórcio é mais vantajoso para o seu bolso.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl border overflow-hidden">
              <div className="grid grid-cols-3 bg-primary text-primary-foreground font-heading font-bold text-sm">
                <div className="p-4">Característica</div>
                <div className="p-4 text-center">Consórcio ✅</div>
                <div className="p-4 text-center">Financiamento</div>
              </div>
              {[
                ["Juros", "Sem juros", "Juros compostos"],
                ["Taxa", "Administração (menor)", "IOF + Juros + TAC"],
                ["Entrada", "Não obrigatória", "Geralmente 20-30%"],
                ["Economia total", "Até 40% mais barato", "Pode dobrar o valor"],
                ["Poder de compra", "À vista na contemplação", "Parcelado"],
                ["Regulamentação", "Banco Central", "Banco Central"],
                ["FGTS (imóvel)", "Sim, para lance", "Sim, para entrada"],
              ].map(([feat, cons, fin]) => (
                <div key={feat} className="grid grid-cols-3 border-t text-sm">
                  <div className="p-4 font-medium text-foreground">{feat}</div>
                  <div className="p-4 text-center text-green-600 font-medium bg-green-50/50">{cons}</div>
                  <div className="p-4 text-center text-muted-foreground">{fin}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Como Funciona o Consórcio em 4 Passos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Em 4 passos simples você pode conquistar o seu bem.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {etapas.map((e) => (
              <div key={e.step} className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-heading font-bold mb-4 shadow-lg">
                  {e.step}
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Central */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-blue-700 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Vamos planejar a sua conquista juntos
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Em uma conversa rápida, montamos uma simulação personalizada com o melhor cenário de prazo, parcela e estratégia de lance — sem compromisso e sem custos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio-cta")}>
              <Button size="lg" variant="cta" className="rounded-xl text-base px-10">
                Conversar com um consultor
              </Button>
            </a>
            <Link to="/contato">
              <Button size="lg" variant="outline" className="rounded-xl text-base px-10 border-white/30 text-white hover:bg-white/10">
                Falar com Consultor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Perguntas Frequentes sobre Consórcio
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tire todas as suas dúvidas sobre consórcio.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-card rounded-2xl border overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-heading font-semibold text-foreground hover:text-primary transition-colors">
                  {faq.q}
                  <span className="text-primary ml-4 group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Ainda com dúvidas? Nossa equipe está pronta para ajudar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:1151997500">
              <Button variant="outline" className="rounded-xl">
                <Phone className="h-4 w-4 mr-2" />
                (11) 5199-7500
              </Button>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio-contato")}>
              <Button variant="cta" className="rounded-xl">
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <main id="main-content">
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-[#003366] via-[#003366] to-[#0a2a52] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
              <div className="max-w-2xl">
                <nav aria-label="Breadcrumb" className="mb-5 text-xs text-white/60">
                  <Link to="/" className="hover:text-white">Início</Link>
                  <span className="mx-2">/</span>
                  <span className="text-white/90">Consórcio em Guarulhos</span>
                </nav>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] uppercase tracking-widest font-semibold mb-5">
                  <MapPin className="h-3 w-3" /> Cidade Maia, Guarulhos/SP
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold tracking-tight leading-[1.1] mb-5 text-white">
                  Consórcio em Guarulhos com orientação consultiva
                </h1>
                <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                  Planeje a compra do seu imóvel, veículo ou projeto pessoal com uma consultoria que explica cada etapa: crédito, parcelas, lances, assembleias e contemplação.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button size="lg" onClick={goToForm} className="rounded-xl text-base px-7 h-12 bg-[#F2994A] hover:bg-[#e58a3b] text-white shadow-lg">
                    Simular consórcio <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio_hero")}>
                    <Button size="lg" variant="outline" className="rounded-xl text-base px-7 h-12 border-white/30 bg-white/5 text-white hover:bg-white/10 w-full sm:w-auto">
                      <MessageCircle className="h-4 w-4 mr-2" /> Falar com consultor
                    </Button>
                  </a>
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-white/85">
                  {[
                    "Atendimento em Guarulhos e região",
                    "Consultoria personalizada",
                    "Sem juros de financiamento",
                    "Acompanhamento até a contemplação",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-[#F2994A]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FORM */}
              <div id="simulacao" className="scroll-mt-24">
                <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-white/10 p-6 md:p-7">
                  <div className="mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#003366]">Simulação</span>
                    <h2 className="text-xl md:text-2xl font-heading font-semibold tracking-tight text-slate-900 mt-1">
                      Simule seu consórcio com orientação da Patro
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Um consultor da Patro irá analisar seu objetivo e explicar as melhores possibilidades.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <Input aria-label="Seu nome" placeholder="Seu nome completo" value={form.name} onChange={(e) => update("name", e.target.value)} className="h-11 rounded-xl bg-slate-50 border-slate-200" />
                    <Input aria-label="WhatsApp" inputMode="tel" placeholder="WhatsApp com DDD — (11) 9xxxx-xxxx" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className="h-11 rounded-xl bg-slate-50 border-slate-200" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input aria-label="Cidade" placeholder="Cidade" value={form.city} onChange={(e) => update("city", e.target.value)} className="h-11 rounded-xl bg-slate-50 border-slate-200" />
                      <Select value={form.tipo} onValueChange={(v) => update("tipo", v)}>
                        <SelectTrigger aria-label="Tipo de consórcio" className="h-11 rounded-xl bg-slate-50 border-slate-200"><SelectValue placeholder="Tipo de consórcio" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Imóvel">Imóvel</SelectItem>
                          <SelectItem value="Veículo">Veículo</SelectItem>
                          <SelectItem value="Moto">Moto</SelectItem>
                          <SelectItem value="Caminhão/Frota">Caminhão / Frota</SelectItem>
                          <SelectItem value="Serviços">Serviços</SelectItem>
                          <SelectItem value="Empresa">Empresa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input aria-label="Valor aproximado do crédito" placeholder="Valor aproximado do crédito (ex: R$ 250 mil)" value={form.credito} onChange={(e) => update("credito", e.target.value)} className="h-11 rounded-xl bg-slate-50 border-slate-200" />
                    <Select value={form.horario} onValueChange={(v) => update("horario", v)}>
                      <SelectTrigger aria-label="Melhor horário para contato" className="h-11 rounded-xl bg-slate-50 border-slate-200"><SelectValue placeholder="Melhor horário para contato" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Manhã (8h–12h)">Manhã (8h–12h)</SelectItem>
                        <SelectItem value="Tarde (12h–18h)">Tarde (12h–18h)</SelectItem>
                        <SelectItem value="Início da noite (18h–20h)">Início da noite (18h–20h)</SelectItem>
                        <SelectItem value="Qualquer horário comercial">Qualquer horário comercial</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-[#003366] hover:bg-[#0a2a52] text-white font-semibold text-base">
                      {loading ? "Enviando..." : (<span className="flex items-center gap-2">Receber simulação <ArrowRight className="h-4 w-4" /></span>)}
                    </Button>
                    <p className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                      <Lock className="h-3 w-3" /> Dados protegidos pela LGPD — usados apenas para o atendimento.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OBJETIVOS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#003366]">Objetivos</span>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-slate-900 mt-2">
                O que você pode conquistar com consórcio
              </h2>
              <p className="text-base text-slate-600 mt-3">
                Escolha o objetivo que mais se aproxima do seu momento. Em cada caso, simulamos crédito, parcela e estratégia de lance adequados.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {objetivos.map((o) => (
                <article key={o.title} className="group bg-white rounded-2xl border border-slate-200 p-7 hover:shadow-xl hover:border-[#003366]/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#003366]/5 flex items-center justify-center mb-4">
                    <o.icon className="h-6 w-6 text-[#003366]" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-slate-900 mb-2">{o.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">{o.desc}</p>
                  <button
                    type="button"
                    onClick={() => { update("tipo", o.tipo === "Imóvel" || o.tipo === "Veículo" || o.tipo === "Empresa" || o.tipo === "Serviços" ? o.tipo : "Imóvel"); goToForm(); }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#003366] hover:text-[#F2994A] transition-colors"
                  >
                    Simular este consórcio <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#003366]">Educativo</span>
                <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-slate-900 mt-2 mb-4">
                  Você sabe como funciona o consórcio?
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  Consórcio é uma forma de compra planejada em grupo. O cliente escolhe um crédito, paga parcelas mensais e pode ser contemplado por sorteio ou lance. Ao ser contemplado, utiliza a carta de crédito para comprar o bem ou contratar o serviço, conforme as regras do grupo.
                </p>
              </div>
              <ul className="space-y-3">
                {comoFunciona.map((t) => (
                  <li key={t} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                    <CheckCircle2 className="h-5 w-5 text-[#003366] mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700 leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* COMPARATIVO */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#003366]">Comparativo</span>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-slate-900 mt-2">
                Consórcio ou financiamento?
              </h2>
              <p className="text-base text-slate-600 mt-3">
                Cada modalidade tem um perfil. Veja as diferenças e entenda qual faz mais sentido para o seu caso.
              </p>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 bg-slate-900 text-white text-sm font-semibold">
                <div className="p-4">Critério</div>
                <div className="p-4 text-center border-l border-white/10">Consórcio</div>
                <div className="p-4 text-center border-l border-white/10">Financiamento</div>
              </div>
              {comparativo.map(({ feat, c, f }, i) => (
                <div key={feat} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-slate-50/40" : "bg-white"}`}>
                  <div className="p-4 font-medium text-slate-900">{feat}</div>
                  <div className="p-4 text-center text-slate-700 border-l border-slate-100">{c}</div>
                  <div className="p-4 text-center text-slate-700 border-l border-slate-100">{f}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio_comparativo")}>
                <Button size="lg" className="rounded-xl bg-[#003366] hover:bg-[#0a2a52] text-white h-12 px-6">
                  Não sabe qual escolher? Fale com a Patro
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* COMO A PATRO AJUDA */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#003366]">Consultoria Patro</span>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-slate-900 mt-2">
                Como a Patro te ajuda
              </h2>
              <p className="text-base text-slate-600 mt-3">
                Um processo simples, transparente e consultivo do começo ao fim.
              </p>
            </div>
            <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
              {comoAjudamos.map((s, i) => (
                <li key={s.title} className="bg-white rounded-2xl border border-slate-200 p-6 relative">
                  <span className="absolute -top-3 left-6 bg-[#003366] text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md">{i + 1}</span>
                  <s.icon className="h-6 w-6 text-[#F2994A] mb-3" />
                  <h3 className="text-base font-heading font-semibold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* VANTAGENS */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#003366]">Vantagens</span>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-slate-900 mt-2">
                Vantagens do consórcio
              </h2>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {vantagens.map((v) => (
                <li key={v} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <CheckCircle2 className="h-5 w-5 text-[#003366] mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-700 leading-relaxed">{v}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 mt-6 max-w-3xl">
              Importante: o consórcio não tem juros de financiamento, mas existem taxa de administração, fundo de reserva e demais custos previstos em contrato. Sempre confirmamos esses valores antes da contratação.
            </p>
          </div>
        </section>

        {/* CUIDADOS */}
        <section className="py-16 md:py-20 bg-[#003366]/[0.03]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2994A]/10 text-[#F2994A] text-xs font-bold uppercase tracking-widest mb-4">
                  <AlertTriangle className="h-3.5 w-3.5" /> Transparência
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-slate-900 mb-4">
                  Cuidados antes de contratar
                </h2>
                <p className="text-base text-slate-600 leading-relaxed mb-6">
                  Consórcio é um excelente instrumento de planejamento — desde que você entenda as regras antes de assinar. A Patro orienta cada um destes pontos.
                </p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio_cuidados")}>
                  <Button size="lg" className="rounded-xl bg-[#003366] hover:bg-[#0a2a52] text-white h-12 px-6">
                    Quero contratar com orientação <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </div>
              <ul className="space-y-3">
                {cuidados.map((c) => (
                  <li key={c} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200">
                    <ShieldCheck className="h-5 w-5 text-[#003366] mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700 leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* LOCAL */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#003366]">Atendimento local</span>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-slate-900 mt-2 mb-4">
                Consórcio em Guarulhos e região
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                A Patro atende clientes em Guarulhos e região, com orientação para quem deseja comprar imóvel, trocar de veículo, expandir empresa ou organizar projetos sem recorrer diretamente a financiamentos mais caros.
              </p>
            </div>
            <ul className="flex flex-wrap justify-center gap-2 mt-8 max-w-3xl mx-auto">
              {bairros.map((b) => (
                <li key={b} className="px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
                  <MapPin className="h-3 w-3 inline mr-1 text-[#003366]" />{b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <EbookConsorcioBanner variant="full" />

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <HelpCircle className="h-5 w-5 text-[#003366]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#003366]">Perguntas frequentes</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-slate-900">
                Dúvidas sobre consórcio
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-heading font-semibold text-slate-900 hover:text-[#003366] transition-colors">
                    <span className="text-base">{faq.q}</span>
                    <span className="text-[#F2994A] ml-4 group-open:rotate-45 transition-transform text-xl shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* LINKS INTERNOS */}
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-5 text-center">
              Veja também
            </h2>
            <ul className="flex flex-wrap justify-center gap-2.5 text-sm">
              {[
                { to: "/consorcio-imoveis", label: "Consórcio de Imóveis" },
                { to: "/consorcio-carro", label: "Consórcio de Veículos" },
                { to: "/consorcio-veiculos-pesados", label: "Consórcio de Caminhões" },
                { to: "/seguro-auto", label: "Seguro Auto" },
                { to: "/seguro-empresarial", label: "Seguro Empresarial" },
                { to: "/seguro-residencial", label: "Seguro Residencial" },
                { to: "/seguro-vida", label: "Seguro de Vida" },
                { to: "/planos-de-saude", label: "Planos de Saúde" },
                { to: "/cotacao", label: "Cotação online" },
                { to: "/contato", label: "Contato" },
                { to: "/blog", label: "Blog" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#003366] hover:border-[#003366]/30 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-14 bg-[#003366] text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold tracking-tight mb-3">
              Vamos planejar a sua conquista juntos
            </h2>
            <p className="text-white/80 mb-7 max-w-2xl mx-auto">
              Conversamos sobre seu objetivo, simulamos as melhores possibilidades e explicamos cada regra antes de você decidir.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={goToForm} className="rounded-xl h-12 px-7 bg-[#F2994A] hover:bg-[#e58a3b] text-white">
                Receber simulação <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio_cta_final")}>
                <Button size="lg" variant="outline" className="rounded-xl h-12 px-7 border-white/30 bg-white/5 text-white hover:bg-white/10">
                  <MessageCircle className="h-4 w-4 mr-2" /> Receber pelo WhatsApp
                </Button>
              </a>
              <a href="tel:1151997500" onClick={() => trackCotacaoClick("consorcio_phone")}>
                <Button size="lg" variant="outline" className="rounded-xl h-12 px-7 border-white/30 bg-white/5 text-white hover:bg-white/10 w-full sm:w-auto">
                  <Phone className="h-4 w-4 mr-2" /> (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* TRANSPARÊNCIA */}
        <aside className="bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <p className="text-xs text-slate-500 leading-relaxed text-center">
              <strong className="text-slate-700">Aviso de transparência:</strong> Consórcio é uma modalidade de compra planejada. Não há garantia de data de contemplação. A contratação está sujeita às regras do grupo, análise cadastral e condições da administradora. Consulte sempre as taxas, reajustes e condições antes de contratar.
            </p>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
};

export default Consorcio;
