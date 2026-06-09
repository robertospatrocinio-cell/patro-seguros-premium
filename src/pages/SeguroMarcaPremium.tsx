import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Shield, Star, Clock, Phone, Car, Gem, CheckCircle2, Crown, Sparkles, ChevronDown, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/tracking";
import FAQSchema from "@/components/FAQSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import WebSiteSchema from "@/components/WebSiteSchema";
import LocalAreaSchema from "@/components/LocalAreaSchema";
import AggregateRatingSchema from "@/components/AggregateRatingSchema";
import { PREMIUM_BRANDS } from "@/data/premiumBrandsConfig";

const SeguroMarcaPremium = ({ brand: brandProp }: { brand?: string }) => {
  const { brand: brandParam } = useParams();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const brandSlug = brandProp || brandParam || window.location.pathname.split("/").pop()?.replace("seguro-", "").replace(/-/g, "");
  
  const config = brandSlug ? PREMIUM_BRANDS[brandSlug.toLowerCase()] : null;


  if (!config) {
    return <Navigate to="/404" replace />;
  }

  const WHATSAPP_URL = `https://wa.me/551151997500?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20Seguro%20${config.name}.%20Gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20exclusiva%20para%20o%20meu%20ve%C3%ADculo.`;

  return (
    <div className="min-h-screen bg-black">
      <PageMeta
        title={`Seguro ${config.name} em Guarulhos | Cotação em 2h | Patro Seguros`}
        description={`Seguro ${config.name} em Guarulhos: proteção premium e especializada para seu veículo. Reparo em concessionária, assistência 24h e cotação rápida na Patro Seguros.`}
      />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebSiteSchema />
      <LocalAreaSchema
        serviceName={`Seguro ${config.name}`}
        url={`https://patroseguros.lovable.app/seguro-${config.slug}`}
        description={`Seguro ${config.name} em Guarulhos: proteção premium e especializada para seu veículo.`}
        city="Guarulhos"
        faqs={config.faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
          <div className="absolute inset-0 z-0">
            <img
              src={config.heroImage}
              alt={`Seguro ${config.name} em Guarulhos com cotação online pela Patro Seguros`}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
                <Crown className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300 text-xs font-bold tracking-widest uppercase italic">{config.slogan}</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 font-heading uppercase tracking-tighter">
                Seguro <span className="text-blue-500 italic">{config.name}</span> <br />
                <span className="text-white/60">Sua Experiência Premium Protegida.</span>
              </h1>

              <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-xl">
                {config.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`lp-${config.slug}-hero`)}
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-7 rounded-none transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-blue-600/20">
                    <MessageCircle className="mr-2 h-6 w-6" />
                    Cotação Exclusiva {config.name}
                  </Button>
                </a>
                <a href="tel:+551151997500" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 font-bold text-lg px-8 py-7 rounded-none">
                    <Phone className="mr-2 h-6 w-6" />
                    (11) 5199-7500
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Modelos Atendidos */}
        <section className="bg-zinc-900 py-12 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white/40 text-sm font-bold uppercase tracking-widest italic">Modelos em Destaque</div>
              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                {config.modelos.slice(0, 6).map((modelo) => (
                  <span key={modelo} className="text-white/60 hover:text-blue-400 font-bold transition-colors cursor-default tracking-tight">
                    {modelo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="bg-black py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <span className="text-blue-500 font-bold text-sm uppercase tracking-widest mb-4 block">Exclusividade Patro Seguros</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6 italic">
                O Padrão de Excelência que <span className="text-blue-500">seu {config.name} Exige</span>
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {config.diferenciais.map((item, i) => (
                <div key={i} className="group p-8 bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 transition-all duration-500 rounded-none">
                  <div className="w-14 h-14 bg-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="h-7 w-7 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-4 uppercase italic tracking-tight">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cobertura Especializada */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
            <img 
              src={config.middleImage} 
              alt={`Detalhe do veículo ${config.name} - Seguro de carros de luxo`} 
              className="w-full h-full object-cover opacity-30 grayscale"
            />
          </div>
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-8 italic">
                Proteção para <br />
                <span className="text-blue-500">Alta Performance</span>
              </h2>
              <ul className="space-y-4 mb-10">
                {[
                  `Garantia de reparo com peças genuínas ${config.name}`,
                  "Cobertura para rodas esportivas e acessórios premium",
                  "Proteção específica para sistemas de assistência ao condutor",
                  "Cobertura total para blindagem (opcional)",
                  "Assistência 24h com guincho prancha em todo território nacional"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`lp-${config.slug}-middle`)}
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-7 rounded-none text-lg">
                  Falar com um Especialista {config.name}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="bg-black py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-white text-center uppercase italic tracking-tighter mb-16">
              A Opinião de <span className="text-blue-500">Quem Escolheu a Patro</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {config.depoimentos.map((dep, i) => (
                <div key={i} className="p-8 border border-white/5 bg-zinc-900/30">
                  <div className="flex gap-1 mb-6">
                    {[...Array(dep.stars)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-blue-500 text-blue-500" />
                    ))}
                  </div>
                  <p className="text-white/60 text-lg italic mb-8">"{dep.content}"</p>
                  <div>
                    <p className="text-white font-black uppercase tracking-tight">{dep.name}</p>
                    <p className="text-blue-500/70 text-sm font-bold">{dep.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-zinc-900 py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-black text-white text-center uppercase italic tracking-tighter mb-16">
              Dúvidas <span className="text-blue-500">Frequentes</span> sobre Seguro {config.name}
            </h2>
            <div className="space-y-4" data-speakable="faq">
              {config.faqs.map((faq, i) => (
                <div key={i} className="bg-black border border-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-8 py-6 text-left"
                  >
                    <span className="text-white font-bold text-lg pr-4">{faq.q}</span>
                    <ChevronDown className={`h-6 w-6 text-blue-500 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-8 pb-8 animate-fade-in">
                      <p className="text-white/50 leading-relaxed text-lg">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative py-32 overflow-hidden bg-blue-600">
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic mb-8">
              Proteja seu <br className="md:hidden" /> <span className="text-black">{config.name} Hoje</span>
            </h2>
            <p className="text-white/90 text-xl max-w-2xl mx-auto mb-12 font-medium">
              Não deixe seu maior prazer nas mãos de qualquer um. Escolha quem entende o valor e a engenharia do seu veículo.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`lp-${config.slug}-footer`)}
              >
                <Button size="lg" className="bg-black hover:bg-zinc-900 text-white font-black text-xl px-12 py-8 rounded-none border-none">
                  Cotação via WhatsApp
                </Button>
              </a>
              <a href="tel:+551151997500">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-black text-xl px-12 py-8 rounded-none">
                  Ligar Agora
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SeguroMarcaPremium;