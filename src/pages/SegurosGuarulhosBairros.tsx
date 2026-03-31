import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Car, Home, Building2, Shield, Clock, Star, Phone, Mail, MapPin, ChevronRight, MessageCircle, HeartPulse } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { escapeHtml } from "@/lib/utils";
import { toast } from "sonner";
import { bairros, type BairroData } from "@/lib/bairrosData";
import { trackWhatsAppClick } from "@/lib/tracking";

const WHATSAPP_NUMBER = "5511951997500";

const SegurosGuarulhosBairros = () => {
  const { bairro: bairroSlug } = useParams<{ bairro: string }>();
  const navigate = useNavigate();

  const initialBairro = bairroSlug
    ? bairros.find((b) => b.id === bairroSlug) || bairros[0]
    : bairros[0];

  const [selectedBairro, setSelectedBairro] = useState<BairroData>(initialBairro);
  const [transitioning, setTransitioning] = useState(false);

  // Sync state when URL param changes
  useEffect(() => {
    if (bairroSlug) {
      const found = bairros.find((b) => b.id === bairroSlug);
      if (found && found.id !== selectedBairro.id) {
        setSelectedBairro(found);
      } else if (!found) {
        navigate("/seguros-guarulhos", { replace: true });
      }
    }
  }, [bairroSlug]);
  const [formData, setFormData] = useState({ nome: "", telefone: "", email: "" });
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleBairroChange = useCallback((bairro: BairroData) => {
    if (bairro.id === selectedBairro.id) return;
    setTransitioning(true);
    setTimeout(() => {
      setSelectedBairro(bairro);
      setTransitioning(false);
      navigate(`/seguros-guarulhos/${bairro.id}`, { replace: true });
    }, 300);
  }, [selectedBairro.id, navigate]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.telefone) {
      toast.error("Preencha nome e telefone.");
      return;
    }
    setSending(true);
    try {
      await supabase.functions.invoke("send-form-email", {
        body: {
          to: ["contato@patroseguros.com.br", "sandra@patroseguros.com.br"],
          subject: `Lead SEO Bairro — ${selectedBairro.nome}`,
          html: `<h2>Novo Lead — Seguros em ${selectedBairro.nome}</h2>
<table style="border-collapse:collapse;width:100%">
<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nome</td><td style="padding:8px;border:1px solid #ddd">${formData.nome}</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefone</td><td style="padding:8px;border:1px solid #ddd">${formData.telefone}</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">E-mail</td><td style="padding:8px;border:1px solid #ddd">${formData.email || "Não informado"}</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Interesse</td><td style="padding:8px;border:1px solid #ddd">Seguro - ${selectedBairro.nome} (${selectedBairro.foco})</td></tr>
</table>`,
        },
      });
      toast.success("Dados enviados! Entraremos em contato em breve.");
      const msg = encodeURIComponent(`Olá, vi o site da Patro e quero uma cotação para o bairro ${selectedBairro.nome}.`);
      trackWhatsAppClick(`bairro_${selectedBairro.id}`);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
      setFormData({ nome: "", telefone: "", email: "" });
    } catch {
      toast.error("Erro ao enviar. Tente pelo WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá, vi o site da Patro e quero uma cotação para o bairro ${selectedBairro.nome}`)}`;

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Guarulhos", href: "/sobre-guarulhos" },
    { label: `Seguros em ${selectedBairro.nome}` },
  ];

  const localBusinessSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Patro Seguros",
    "alternateName": `Patro Seguros ${selectedBairro.nome}`,
    "url": "https://patro-secures-success.lovable.app/seguros-guarulhos-bairros",
    "logo": "https://patro-secures-success.lovable.app/favicon.ico",
    "description": `Corretora de seguros em ${selectedBairro.nome}, Guarulhos. Especialista em ${selectedBairro.foco.toLowerCase()}: seguro auto, residencial, empresarial, saúde e mais.`,
    "telephone": "+55-11-5199-7500",
    "email": "contato@patroseguros.com.br",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Salgado Filho, 2120 – Ed. Via Alameda – Sala 219 – Jardim Maia",
      "addressLocality": "Guarulhos",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.4538,
      "longitude": -46.5333
    },
    "areaServed": {
      "@type": "Place",
      "name": `${selectedBairro.nome}, Guarulhos, SP`
    },
    "sameAs": [
      "https://www.instagram.com/patroseguros",
      "https://www.facebook.com/patroseguros"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5"
    }
  }), [selectedBairro]);

  const servicosCards = [
    { icon: Car, title: "Seguro Auto", desc: "Proteção completa com assistência 24h e cobertura contra roubo, furto e colisão.", href: "/seguro-auto" },
    { icon: Home, title: "Seguro Residencial", desc: "Proteja seu lar contra incêndio, roubo, danos elétricos e mais.", href: "/seguro-residencial" },
    { icon: Building2, title: "Seguro Empresarial", desc: "Proteja seu negócio com coberturas contra incêndio, roubo, RC e lucros cessantes.", href: "/seguro-empresarial" },
    { icon: HeartPulse, title: "Plano de Saúde", desc: "Planos individuais, familiares e empresariais das melhores operadoras.", href: "/planos-de-saude" },
  ];

  return (
    <>
      <PageMeta
        title={`Especialista em Seguros no ${selectedBairro.nome} | Patro Seguros`}
        description={`Corretora de seguros em ${selectedBairro.nome}, Guarulhos. ${selectedBairro.foco}: seguro auto, residencial, empresarial, saúde e mais. Cotação rápida pelo WhatsApp.`}
      />

      <FAQSchema faqs={selectedBairro.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Header />

      <main id="main-content">
        {/* HERO SECTION */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${transitioning ? "opacity-0" : "opacity-100"}`}
          >
            <img
              src={selectedBairro.image}
              alt={`Bairro ${selectedBairro.nome} em Guarulhos`}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-[#003366]/80" />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-20">
            <Breadcrumb items={breadcrumbItems} />
            <div className={`max-w-3xl transition-all duration-500 ${transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
              <span className="inline-block bg-[#F2994A] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                {selectedBairro.foco}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Especialista em Seguros no {selectedBairro.nome}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
                {selectedBairro.subtitulo}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`hero_bairro_${selectedBairro.id}`)}
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-base"
                >
                  <MessageCircle className="h-5 w-5" />
                  Cotação pelo WhatsApp
                </a>
                <button
                  onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center gap-2 bg-[#F2994A] hover:bg-[#e08a3a] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-base"
                >
                  Solicitar Cotação Online
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BAIRRO TABS */}
        <section className="sticky top-0 z-30 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide -mx-4 px-4">
              {bairros.map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleBairroChange(b)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0 ${
                    selectedBairro.id === b.id
                      ? "bg-[#003366] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {b.nome}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS LOCAIS */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className={`max-w-4xl mx-auto transition-all duration-500 ${transitioning ? "opacity-0" : "opacity-100"}`}>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-[#F2994A] shrink-0" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#003366]">
                  Patro Seguros em {selectedBairro.nome}
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {selectedBairro.descricao}
              </p>
            </div>
          </div>
        </section>

        {/* GRADE DE SERVIÇOS — 4 CARDS */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#003366] text-center mb-10">
              Principais Seguros para {selectedBairro.nome}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {servicosCards.map((s) => (
                <Link key={s.href} to={s.href}>
                  <Card className="group hover:shadow-xl transition-all border-0 shadow-md h-full">
                    <CardContent className="pt-8 pb-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#003366]/10 flex items-center justify-center group-hover:bg-[#003366] transition-colors">
                        <s.icon className="h-8 w-8 text-[#003366] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-[#003366] mb-2">{s.title}</h3>
                      <p className="text-sm text-gray-500">{s.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST SIGNALS */}
        <section className="py-12 bg-[#003366]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
              <div className="flex flex-col items-center gap-3">
                <Shield className="h-10 w-10 text-[#F2994A]" />
                <h3 className="text-white font-bold text-lg">Selo SUSEP</h3>
                <p className="text-white/70 text-sm">Corretora registrada e habilitada pela Superintendência de Seguros Privados</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Clock className="h-10 w-10 text-[#F2994A]" />
                <h3 className="text-white font-bold text-lg">Resposta em até 2h</h3>
                <p className="text-white/70 text-sm">Atendimento ágil via WhatsApp com cotação personalizada em até 2 horas</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Star className="h-10 w-10 text-[#F2994A]" />
                <h3 className="text-white font-bold text-lg">Nota 4.9 no Google</h3>
                <p className="text-white/70 text-sm">Avaliação de excelência no Google com centenas de clientes satisfeitos</p>
              </div>
            </div>
          </div>
        </section>

        {/* FORMULÁRIO */}
        <section className="py-16 bg-gray-50" ref={formRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#003366] text-center mb-2">
                Solicite sua Cotação
              </h2>
              <p className="text-center text-gray-500 mb-8">
                Preencha seus dados e receba uma proposta personalizada para {selectedBairro.nome}
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-1 block">Nome completo *</label>
                  <Input
                    id="nome"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="text-sm font-medium text-gray-700 mb-1 block">WhatsApp *</label>
                  <Input
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">E-mail</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                  />
                </div>
                <input type="hidden" name="interesse" value={`Interesse em Seguro - ${selectedBairro.nome}`} />
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full h-12 bg-[#F2994A] hover:bg-[#e08a3a] text-white font-bold text-base"
                >
                  {sending ? "Enviando..." : "Solicitar Cotação Gratuita"}
                </Button>
                <p className="text-xs text-center text-gray-400">
                  Ao enviar, você será redirecionado para o WhatsApp para agilizar o atendimento.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ POR BAIRRO */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#003366] text-center mb-2">
                Perguntas Frequentes — {selectedBairro.nome}
              </h2>
              <p className="text-center text-gray-500 mb-8">
                Dúvidas comuns sobre seguros em {selectedBairro.nome}, Guarulhos
              </p>
              <Accordion type="single" collapsible className="w-full">
                {selectedBairro.faqs.map((faq, idx) => (
                  <AccordionItem key={`${selectedBairro.id}-${idx}`} value={`faq-${idx}`}>
                    <AccordionTrigger className="text-left text-[#003366] font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* RODAPÉ LOCAL */}
        <section className="py-10 bg-[#003366] border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-white/80 text-sm">
              <div>
                <h4 className="text-white font-bold mb-3">Endereço</h4>
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#F2994A]" />
                  Av. Salgado Filho, 2120 – Ed. Via Alameda – Sala 219 – Jardim Maia, Guarulhos/SP
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-3">Contato</h4>
                <p className="flex items-center gap-2 mb-1">
                  <Phone className="h-4 w-4 text-[#F2994A]" />
                  (11) 5199-7500
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#F2994A]" />
                  contato@patroseguros.com.br
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-3">Legal</h4>
                <div className="flex flex-col gap-1">
                  <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
                  <Link to="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link>
                  <Link to="/cotacao" className="text-[#F2994A] hover:text-[#f5a862] font-medium transition-colors">Cotação Online →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SegurosGuarulhosBairros;