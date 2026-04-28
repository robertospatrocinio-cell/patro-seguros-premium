import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Star, Clock, Phone, Car, Gem, CheckCircle2, Crown, Sparkles, ChevronDown, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/tracking";
import heroImg from "@/assets/lp-seguro-auto-premium.webp";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20Seguro%20Auto%20Premium.%20Gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20exclusiva.";

const diferenciais = [
  {
    icon: Crown,
    title: "Cobertura Total sem Franquia",
    description: "Opção de franquia zero para reparos — seu veículo premium merece atendimento sem burocracia nem custos surpresa.",
  },
  {
    icon: Car,
    title: "Carro Reserva Premium",
    description: "Veículo reserva de categoria equivalente ao seu, por até 30 dias, para que você mantenha seu padrão durante reparos.",
  },
  {
    icon: Sparkles,
    title: "Reparo em Concessionária Oficial",
    description: "Garantimos reparos exclusivamente em concessionárias autorizadas, com peças originais de fábrica.",
  },
  {
    icon: Shield,
    title: "Cobertura para Acessórios e Blindagem",
    description: "Proteção completa para blindagem, rodas esportivas, equipamentos de som, insulfilm e todos os acessórios do veículo.",
  },
  {
    icon: Clock,
    title: "Assistência 24h Dedicada",
    description: "Linha exclusiva com atendimento prioritário, guincho especializado para veículos de alto valor e socorro imediato.",
  },
  {
    icon: Gem,
    title: "Indenização por Valor de Mercado Referenciado",
    description: "Em caso de perda total, você recebe o valor integral FIPE ou acordado, sem depreciação injusta.",
  },
];

const coberturas = [
  "Colisão, incêndio e roubo/furto",
  "Danos a terceiros (material e corporal)",
  "Fenômenos naturais (enchentes, granizo, raios)",
  "Vidros, faróis, lanternas e retrovisores",
  "Blindagem e equipamentos especiais",
  "Extensão de perímetro (Mercosul)",
  "Despesas extraordinárias (hotel, táxi)",
  "Responsabilidade civil do condutor",
  "Assistência mecânica e elétrica 24h",
  "Proteção para acessórios e personalização",
];

const marcasAtendidas = [
  "BMW", "Mercedes-Benz", "Audi", "Porsche", "Volvo",
  "Land Rover", "Jaguar", "Lexus", "Jeep", "Toyota",
  "Hyundai", "Volkswagen", "Chevrolet", "Honda", "Ford",
];

const depoimentos = [
  {
    name: "Dr. Ricardo Almeida",
    role: "Médico — BMW X5",
    content: "Atendimento impecável. Quando precisei do guincho, chegou em 25 minutos e o carro reserva era um SUV equivalente. Isso é seguro premium de verdade.",
    stars: 5,
  },
  {
    name: "Patrícia Mendonça",
    role: "Empresária — Mercedes GLC",
    content: "A Patro cuidou de tudo quando meu carro foi atingido por granizo. Reparo na concessionária, sem franquia, sem dor de cabeça. Superou minhas expectativas.",
    stars: 5,
  },
  {
    name: "Eduardo Santos",
    role: "Executivo — Audi Q8",
    content: "Comparei 4 corretoras antes. A Patro foi a única que entendeu que meu carro blindado precisava de coberturas específicas. Preço justo e serviço excepcional.",
    stars: 5,
  },
];

const faqs = [
  {
    q: "O que diferencia o Seguro Auto Premium de um seguro convencional?",
    a: "O Premium oferece franquia zero ou reduzida, carro reserva de categoria equivalente, reparo exclusivo em concessionárias autorizadas, cobertura para blindagem e acessórios, e uma linha de atendimento dedicada com prioridade.",
  },
  {
    q: "Quais marcas e modelos são elegíveis?",
    a: "Atendemos todas as marcas nacionais e importadas — de BMW e Mercedes a Porsche e Land Rover. Veículos blindados, esportivos e de coleção também são cobertos com condições especiais.",
  },
  {
    q: "Como funciona o carro reserva premium?",
    a: "Em caso de sinistro, disponibilizamos um veículo de categoria similar ao seu (SUV, sedan executivo, etc.) por até 30 dias, para que você não altere sua rotina.",
  },
  {
    q: "A blindagem é coberta integralmente?",
    a: "Sim. Oferecemos cobertura específica para blindagem nível III-A, incluindo a reposição completa em caso de sinistro, com parceiros homologados.",
  },
  {
    q: "Quanto custa o Seguro Auto Premium?",
    a: "O valor varia conforme modelo, perfil e coberturas escolhidas. Nossos clientes premium recebem uma cotação personalizada em até 2 horas, com condições exclusivas de pagamento em até 10x sem juros.",
  },
];

const LandingSeguroAutoPremium = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageMeta
        title="Seguro Auto Premium | Proteção Exclusiva para Veículos de Alto Padrão — Patro Seguros"
        description="Seguro auto premium: franquia zero, carro reserva de categoria, reparo em concessionária e cobertura para blindagem. Veículos de alto valor."
        noindex
      />

      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Veículo premium protegido pelo Seguro Auto Premium da Patro Seguros"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 mb-6">
              <Crown className="h-4 w-4 text-amber-400" />
              <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase">Exclusivo</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight font-heading">
              Seguro Auto
              <span className="block bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                Premium
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
              Proteção exclusiva para veículos de alto padrão. Franquia zero, carro reserva equivalente, reparo em concessionária e atendimento dedicado — porque seu carro merece o mesmo nível de excelência que você.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("lp-auto-premium-hero")}
              >
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-base px-8 py-6 shadow-lg shadow-amber-500/25 border-0">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Solicitar Cotação Exclusiva
                </Button>
              </a>
              <a href="tel:+551151997500">
                <Button size="lg" className="w-full sm:w-auto bg-transparent border border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base">
                  <Phone className="mr-2 h-5 w-5" />
                  (11) 5199-7500
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-6 mt-10 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
                <span>Cotação em 2h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
                <span>100% digital</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
                <span>Sem compromisso</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-white/40 text-xs tracking-widest uppercase mb-6">Protegemos veículos das maiores marcas</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {marcasAtendidas.map((marca) => (
              <span key={marca} className="text-white/50 hover:text-amber-400 text-sm font-medium transition-colors duration-300 cursor-default">
                {marca}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="bg-[#050505] py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-400 text-xs tracking-widest uppercase font-semibold mb-3">Diferenciais exclusivos</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
              O que o Premium cobre <span className="text-amber-400">além do convencional</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto text-base md:text-lg">
              Cada detalhe pensado para quem exige o melhor em proteção veicular
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {diferenciais.map((item, i) => (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-2xl p-8 hover:border-amber-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-5 group-hover:from-amber-500/30 group-hover:to-amber-600/20 transition-all duration-500">
                  <item.icon className="h-6 w-6 text-amber-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coberturas */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0d0906] to-[#050505]" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-amber-400 text-xs tracking-widest uppercase font-semibold mb-3">Cobertura completa</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading mb-6">
                Tudo incluído. <span className="text-amber-400">Sem surpresas.</span>
              </h2>
              <p className="text-white/50 mb-8 text-base leading-relaxed">
                Do básico ao extraordinário — cada item pensado para a proteção total do seu patrimônio sobre rodas.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("lp-auto-premium-coberturas")}
              >
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold px-8 py-6 shadow-lg shadow-amber-500/20 border-0">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Quero minha cotação premium
                </Button>
              </a>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {coberturas.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] rounded-lg px-5 py-3.5 hover:border-amber-500/20 transition-colors duration-300">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-[#050505] py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-400 text-xs tracking-widest uppercase font-semibold mb-3">Depoimentos</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading">
              Quem protege com <span className="text-amber-400">Premium</span> recomenda
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {depoimentos.map((dep, i) => (
              <div key={i} className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-2xl p-8 hover:border-amber-500/20 transition-all duration-500">
                <div className="flex gap-1 mb-4">
                  {[...Array(dep.stars)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{dep.content}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{dep.name}</p>
                  <p className="text-white/40 text-xs">{dep.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0a0a0a] py-20 md:py-28 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-400 text-xs tracking-widest uppercase font-semibold mb-3">Dúvidas frequentes</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading">
              Perguntas sobre o <span className="text-amber-400">Auto Premium</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/[0.06] rounded-xl overflow-hidden hover:border-amber-500/20 transition-colors duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-amber-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-500 to-amber-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wOCkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Crown className="h-12 w-12 text-black/30 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight font-heading mb-4">
            Seu veículo merece proteção premium
          </h2>
          <p className="text-black/70 text-lg max-w-xl mx-auto mb-10">
            Solicite agora sua cotação exclusiva e descubra como proteger seu patrimônio com o melhor seguro auto do mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("lp-auto-premium-cta-final")}
            >
              <Button size="lg" className="bg-black hover:bg-black/90 text-amber-400 font-bold text-base px-10 py-6 shadow-xl border-0">
                <MessageCircle className="mr-2 h-5 w-5" />
                Cotação Premium via WhatsApp
              </Button>
            </a>
            <a href="tel:+551151997500">
              <Button size="lg" variant="outline" className="border-black/30 text-black hover:bg-black/10 font-bold text-base px-10 py-6">
                <Phone className="mr-2 h-5 w-5" />
                Ligar Agora
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingSeguroAutoPremium;
