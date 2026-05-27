import { useState } from "react";
import { 
  Shield, Star, Clock, Phone, Waves, Gem, CheckCircle2, 
  Crown, Sparkles, ChevronDown, MessageCircle, Anchor,
  Navigation, Wind, AlertCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/tracking";
import heroImg from "@/assets/hero-seguro-jetski.webp";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20Seguro%20Jet%20Ski%20Premium.%20Gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20exclusiva.";

const diferenciais = [
  {
    icon: Crown,
    title: "Assistência Náutica VIP 24h",
    description: "Reboque náutico ilimitado, socorro mecânico e resgate de passageiros em qualquer lugar do litoral ou represas.",
  },
  {
    icon: Shield,
    title: "Proteção Total em Transporte",
    description: "Cobertura completa enquanto o jet ski está na carretinha, incluindo roubo em trânsito e danos por colisões terrestres.",
  },
  {
    icon: Waves,
    title: "Cobertura para Esportes Aquáticos",
    description: "Proteção estendida para quando você está puxando esqui, wakeboard ou boias — segurança total no lazer.",
  },
  {
    icon: Sparkles,
    title: "Reparo em Oficinas Premium",
    description: "Garantimos reparos em centros náuticos especializados com peças originais Yamaha, Sea-Doo e Kawasaki.",
  },
  {
    icon: Navigation,
    title: "RC Náutica Ampliada",
    description: "Alta cobertura para danos a terceiros, banhistas e outras embarcações — essencial para navegação em áreas movimentadas.",
  },
  {
    icon: Gem,
    title: "Indenização FIPE Náutica",
    description: "Garantia de recebimento do valor integral de mercado em caso de perda total, sem depreciação abusiva.",
  },
];

const coberturas = [
  "Colisão, abalroamento e naufrágio",
  "Roubo e furto qualificado (marina e reboque)",
  "Responsabilidade Civil Náutica (terceiros)",
  "Incêndio, explosão e raio",
  "Assistência 24h (Reboque e Socorro)",
  "Acessórios (GPS, Som, Equipamentos)",
  "Participação em competições (opcional)",
  "Acidentes pessoais de passageiros",
  "Danos durante transporte terrestre",
  "Remoção de destroços em caso de acidente",
];

const modelosAtendidos = [
  "Sea-Doo (GTX, RXT, Spark, FishPro)", 
  "Yamaha (WaveRunner, FX, VX, GP)", 
  "Kawasaki (Ultra, STX, SX-R)",
  "BRP", "Belassi", "HSR-Benelli", "Gibbs"
];

const depoimentos = [
  {
    name: "Marco Aurélio",
    role: "Proprietário Sea-Doo RXT-X 300",
    content: "O melhor seguro que já tive. Tive uma pane elétrica na Ilhabela e o reboque chegou rápido. O atendimento da Patro é diferenciado, entendem de náutica.",
    stars: 5,
  },
  {
    name: "Juliana Viegas",
    role: "Proprietária Yamaha FX Cruiser",
    content: "Mantenho meu jet em represa e viajo muito com ele na carretinha. A segurança de ter cobertura total no transporte me deixa muito tranquila na estrada.",
    stars: 5,
  },
  {
    name: "Felipe Mendes",
    role: "Praticante de Motonáutica",
    content: "Fiz o seguro do meu Spark com a Patro e o preço foi excelente. O RC Náutico me salvou quando tive um pequeno incidente em uma marina movimentada.",
    stars: 5,
  },
];

const faqs = [
  {
    q: "O seguro cobre o jet ski fora da água?",
    a: "Sim! O Seguro Jet Ski Premium da Patro cobre a embarcação na água, na marina, na sua garagem e inclusive durante o transporte terrestre em reboques ou carretinhas.",
  },
  {
    q: "Quais documentos preciso para contratar?",
    a: "Basicamente o TIE (Título de Inscrição da Embarcação) emitido pela Marinha e a sua Habilitação Náutica (Arrais Amador ou superior).",
  },
  {
    q: "Existe cobertura para motores e propulsão?",
    a: "Sim, a cobertura de danos parciais cobre o conjunto motor e propulsão em caso de acidentes, colisões ou naufrágios.",
  },
  {
    q: "O seguro é válido em todo o Brasil?",
    a: "Sim, a cobertura de navegação é válida em todo o território nacional, incluindo litoral, rios e represas.",
  },
  {
    q: "Qual o valor da franquia para Jet Ski?",
    a: "A franquia varia conforme o valor da embarcação e o perfil de risco, mas trabalhamos com as melhores condições do mercado para garantir que não seja um impeditivo em caso de sinistro.",
  },
];

const SeguroJetSki = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black">
      <PageMeta
        title="Seguro Jet Ski Premium | Proteção Sofisticada para Motonáutica — Patro Seguros"
        description="Seguro jet ski premium com assistência 24h, cobertura total no reboque e RC náutica. Proteção exclusiva Sea-Doo, Yamaha e Kawasaki."
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <img
            src={heroImg}
            alt="Seguro Jet Ski em Guarulhos com cotação online pela Patro Seguros"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/40 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
                <Anchor className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Náutica Premium</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight font-heading">
                Seguro Jet Ski
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Alta Performance
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
                Navegue com a liberdade que você merece. Proteção sofisticada contra roubo, naufrágio e danos a terceiros para proprietários exigentes de Sea-Doo, Yamaha e Kawasaki.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("lp-jetski-premium-hero")}
                >
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-base px-8 py-6 shadow-lg shadow-blue-500/25 border-0">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Solicitar Cotação VIP
                  </Button>
                </a>
                <a href="tel:+551151997500">
                  <Button size="lg" className="w-full sm:w-auto bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-6 text-base backdrop-blur-sm">
                    <Phone className="mr-2 h-5 w-5" />
                    (11) 5199-7500
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-6 mt-10 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  <span>Assistência 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  <span>RC Náutica</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  <span>FIPE Náutica</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Bar */}
        <section className="bg-[#050505] border-y border-white/5 py-10">
          <div className="container mx-auto px-4">
            <p className="text-center text-white/40 text-xs tracking-widest uppercase mb-6">Especialistas nas principais marcas</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60">
              {modelosAtendidos.map((marca) => (
                <span key={marca} className="text-white hover:text-blue-400 text-sm font-semibold transition-colors duration-300 cursor-default">
                  {marca}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Differentials */}
        <section className="bg-black py-20 md:py-32 relative">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <span className="inline-block text-blue-400 text-xs tracking-widest uppercase font-semibold mb-3">O Diferencial Patro</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
                Sua única preocupação será <span className="text-blue-400 italic">o vento no rosto</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {diferenciais.map((item, i) => (
                <div
                  key={i}
                  className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500 hover:bg-white/[0.05]"
                >
                  <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="h-7 w-7 text-blue-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-4">{item.title}</h3>
                  <p className="text-white/50 text-base leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverages Split Section */}
        <section className="bg-[#050505] py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-blue-400 text-xs tracking-widest uppercase font-semibold mb-3">Proteção Náutica 360º</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading mb-8">
                  A tranquilidade de quem sabe que <span className="text-blue-400">está bem protegido</span>
                </h2>
                <p className="text-white/60 mb-10 text-lg leading-relaxed">
                  Não importa se você navega em água doce ou salgada, recreativamente ou em competições. Nossa apólice é modular e se adapta ao seu estilo de navegação.
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <Wind className="h-6 w-6 text-blue-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-bold text-sm">Resgate em Alto Mar</h4>
                      <p className="text-white/40 text-xs mt-1">Serviço de busca e salvamento especializado para embarcações pessoais.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <AlertCircle className="h-6 w-6 text-blue-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-bold text-sm">Responsabilidade Civil banhistas</h4>
                      <p className="text-white/40 text-xs mt-1">Proteção jurídica e financeira para acidentes envolvendo banhistas.</p>
                    </div>
                  </div>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("lp-jetski-premium-coberturas")}
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-7 rounded-xl text-base shadow-xl shadow-blue-600/20 border-0">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Cotar Agora via WhatsApp
                  </Button>
                </a>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {coberturas.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] rounded-xl px-6 py-4 hover:border-blue-500/20 transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    <span className="text-white/80 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-black py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <span className="inline-block text-blue-400 text-xs tracking-widest uppercase font-semibold mb-3">Relatos Reais</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading">
                Aprovado por quem <span className="text-blue-400">vive na água</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {depoimentos.map((dep, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-10 hover:border-blue-500/20 transition-all duration-500 flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[...Array(dep.stars)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-blue-400 text-blue-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-base leading-relaxed mb-8 italic flex-1">"{dep.content}"</p>
                  <div>
                    <p className="text-white font-bold text-base">{dep.name}</p>
                    <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">{dep.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[#050505] py-24 border-t border-white/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading">
                Dúvidas <span className="text-blue-400">Frequentes</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-white/[0.06] rounded-2xl overflow-hidden hover:border-blue-500/20 transition-all duration-300">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-8 py-6 text-left"
                  >
                    <span className="text-white font-semibold text-base pr-4">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-blue-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-8 pb-8">
                      <p className="text-white/50 text-base leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-24 md:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-900 to-black" />
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <Sparkles className="h-16 w-16 text-blue-400/30 mx-auto mb-8 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight font-heading mb-6 max-w-4xl mx-auto">
              Pronto para navegar com <span className="text-blue-300">segurança máxima?</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              Não deixe seu patrimônio e sua diversão expostos a riscos. Solicite agora sua cotação personalizada com um de nossos especialistas náuticos.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("lp-jetski-premium-cta-final")}
              >
                <Button size="lg" className="bg-white hover:bg-white/90 text-blue-900 font-extrabold text-lg px-12 py-8 shadow-2xl rounded-2xl border-0 transition-transform hover:scale-105 active:scale-95">
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Quero Cotação Premium
                </Button>
              </a>
              <a href="tel:+551151997500">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold text-lg px-12 py-8 rounded-2xl backdrop-blur-md">
                  <Phone className="mr-3 h-6 w-6" />
                  Falar por Telefone
                </Button>
              </a>
            </div>
            <p className="text-white/30 mt-10 text-sm uppercase tracking-[0.2em] font-medium">
              Especialistas em Seguros Náuticos de Alta Performance
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SeguroJetSki;

