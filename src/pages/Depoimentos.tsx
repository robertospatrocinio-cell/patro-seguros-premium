import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MessageCircle, Play, ChevronLeft, ChevronRight, ArrowRight, Quote } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/tracking";

import avatarMaria from "@/assets/avatar-maria.webp";
import avatarJoao from "@/assets/avatar-joao.webp";
import avatarAna from "@/assets/avatar-ana.webp";
import avatarCarlos from "@/assets/avatar-carlos.webp";
import avatarFernanda from "@/assets/avatar-fernanda.webp";
import avatarRoberto from "@/assets/avatar-roberto.webp";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o.";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  content: string;
  fullContent: string;
  avatar: string;
  seguro: string;
  stars: number;
  destaque?: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: "Maria S.",
    role: "Empresária",
    location: "Guarulhos, SP",
    seguro: "Seguro Empresarial",
    stars: 5,
    content: "Atendimento excepcional. A equipe da Patro encontrou o seguro perfeito para minha empresa em poucas horas.",
    fullContent: "Atendimento excepcional. A equipe da Patro encontrou o seguro perfeito para minha empresa em poucas horas. Sinto que meu patrimônio está 100% protegido. O que mais me impressionou foi o acompanhamento — quando tive um problema elétrico no escritório, eles resolveram tudo com a seguradora sem que eu precisasse me preocupar. Recomendo para qualquer empresário.",
    avatar: avatarMaria,
    destaque: true,
  },
  {
    name: "João R.",
    role: "Autônomo",
    location: "São Paulo, SP",
    seguro: "Seguro Auto",
    stars: 5,
    content: "Em menos de 24h tinha minha cotação comparativa. Contratei o melhor seguro auto pagando menos do que eu esperava.",
    fullContent: "Em menos de 24h tinha minha cotação comparativa. Contratei o melhor seguro auto pagando menos do que eu esperava. Recomendo demais! O que mais gostei foi a transparência — me mostraram exatamente o que cada seguradora oferecia, sem esconder nada. Quando bateram no meu carro, o processo de sinistro foi resolvido em 5 dias. Excelente!",
    avatar: avatarJoao,
  },
  {
    name: "Ana Paula M.",
    role: "Advogada",
    location: "Guarulhos, SP",
    seguro: "Seguro RC Profissional",
    stars: 5,
    content: "Profissionais que entendem do assunto. Me orientaram sobre o RC profissional com muita clareza.",
    fullContent: "Profissionais que entendem do assunto. Me orientaram sobre o RC profissional com muita clareza e encontraram a melhor cobertura. Como advogada, preciso de proteção específica, e a Patro soube exatamente o que recomendar. O preço foi melhor do que eu encontrava direto nas seguradoras.",
    avatar: avatarAna,
  },
  {
    name: "Carlos H.",
    role: "Médico",
    location: "São Paulo, SP",
    seguro: "Plano de Saúde",
    stars: 5,
    content: "Precisava de um plano de saúde completo para minha família. A Patro comparou várias operadoras.",
    fullContent: "Precisava de um plano de saúde completo para minha família. A Patro comparou várias operadoras e encontrou exatamente o que eu precisava, com um custo-benefício que eu não sabia que existia. A Sandra me atendeu com muita paciência e conhecimento. Já indiquei para outros colegas médicos.",
    avatar: avatarCarlos,
    destaque: true,
  },
  {
    name: "Fernanda L.",
    role: "Designer",
    location: "Arujá, SP",
    seguro: "Seguro Residencial",
    stars: 5,
    content: "Minha casa é meu maior bem. A Patro me ajudou a proteger com o melhor custo-benefício.",
    fullContent: "Minha casa é meu maior bem. A Patro me ajudou a proteger com o melhor custo-benefício. O suporte no sinistro foi impecável! Tive um problema de dano elétrico na geladeira e no micro-ondas — em 10 dias recebi a indenização completa. O seguro residencial se pagou no primeiro mês.",
    avatar: avatarFernanda,
  },
  {
    name: "Roberto A.",
    role: "Produtor Rural",
    location: "Mogi das Cruzes, SP",
    seguro: "Seguro Rural",
    stars: 5,
    content: "Proteger minha lavoura era prioridade. A equipe entendeu a realidade do campo.",
    fullContent: "Proteger minha lavoura era prioridade. A equipe entendeu a realidade do campo e encontrou a cobertura ideal para minhas máquinas agrícolas e minha produção. O Roberto me atendeu pessoalmente e demonstrou um conhecimento do agronegócio que eu não encontrei em outras corretoras. Parceria de confiança que já dura 3 anos!",
    avatar: avatarRoberto,
    destaque: true,
  },
  {
    name: "Patrícia G.",
    role: "Contadora",
    location: "Guarulhos, SP",
    seguro: "Seguro de Vida",
    stars: 5,
    content: "Nunca tinha pensado em seguro de vida até conversar com a Patro.",
    fullContent: "Nunca tinha pensado em seguro de vida até conversar com a Patro. Me mostraram a importância de proteger minha família e encontraram um plano que cabe no meu orçamento — menos de R$ 50/mês para uma cobertura de R$ 300 mil. Fico tranquila sabendo que meus filhos estão protegidos.",
    avatar: avatarMaria,
  },
  {
    name: "Marcelo T.",
    role: "Transportador",
    location: "Itaquaquecetuba, SP",
    seguro: "Seguro de Frota",
    stars: 5,
    content: "Tenho 12 caminhões e a Patro conseguiu um seguro de frota com preço imbatível.",
    fullContent: "Tenho 12 caminhões e a Patro conseguiu um seguro de frota com preço imbatível. O que me surpreendeu foi a gestão — quando um motorista bateu, eles resolveram tudo em tempo recorde. Antes, eu perdia dias com burocracia. Agora é uma ligação e pronto. A economia na renovação foi de quase 30% comparado ao que eu pagava.",
    avatar: avatarJoao,
  },
  {
    name: "Luciana D.",
    role: "Dentista",
    location: "Guarulhos, SP",
    seguro: "RC Profissional + Empresarial",
    stars: 5,
    content: "Precisava de RC para minha clínica e seguro do consultório. A Patro resolveu tudo de uma vez.",
    fullContent: "Precisava de RC para minha clínica odontológica e seguro do consultório. A Patro resolveu tudo de uma vez com um pacote que ficou mais barato do que contratar separado. Me explicaram cada cobertura com paciência e encontraram condições que eu não sabia que existiam. Atendimento nota 10.",
    avatar: avatarAna,
  },
];

const videoTestimonials = [
  { name: "Maria S.", seguro: "Seguro Empresarial", thumb: avatarMaria },
  { name: "Carlos H.", seguro: "Plano de Saúde", thumb: avatarCarlos },
  { name: "Roberto A.", seguro: "Seguro Rural", thumb: avatarRoberto },
];

const Depoimentos = () => {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const destaques = testimonials.filter(t => t.destaque);

  const prev = () => setCarouselIdx(i => (i === 0 ? destaques.length - 1 : i - 1));
  const next = () => setCarouselIdx(i => (i === destaques.length - 1 ? 0 : i + 1));
  const current = destaques[carouselIdx];

  return (
    <>
      <PageMeta
        title="Depoimentos de Clientes"
        description="Veja o que nossos clientes dizem sobre a Patro Seguros. Depoimentos reais de empresários, médicos, produtores rurais e famílias protegidas em Guarulhos e região."
      />
      <Header />
      <main id="main-content">
        <Breadcrumb items={[{ label: "Depoimentos" }]} />

        {/* Hero */}
        <section className="gradient-hero py-20 md:py-28">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-white mb-4">O que nossos clientes dizem</h1>
            <p className="text-lg text-white/60 max-w-xl mx-auto">
              Histórias reais de pessoas e empresas que confiam na Patro para proteger o que mais importa.
            </p>
          </div>
        </section>

        {/* Destaque — Carrossel */}
        <section className="py-16 md:py-24" aria-label="Depoimentos em destaque">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="relative bg-primary/[0.03] border border-primary/10 rounded-2xl p-8 md:p-12">
              <Quote className="h-8 w-8 text-primary/20 absolute top-6 left-6" aria-hidden="true" />

              <div className="text-center">
                <img
                  src={current.avatar}
                  alt={current.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-primary/20"
                />
                <div className="flex gap-0.5 justify-center mb-5" role="img" aria-label={`${current.stars} de 5 estrelas`}>
                  {Array.from({ length: current.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto italic">
                  "{current.fullContent}"
                </blockquote>
                <p className="font-semibold">{current.name}</p>
                <p className="text-sm text-muted-foreground">{current.role} · {current.location}</p>
                <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {current.seguro}
                </span>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition-base"
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-2">
                  {destaques.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCarouselIdx(i)}
                      className={`w-2 h-2 rounded-full transition-base ${i === carouselIdx ? "bg-primary" : "bg-muted-foreground/20"}`}
                      aria-label={`Ir para depoimento ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition-base"
                  aria-label="Próximo depoimento"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Vídeo-depoimentos */}
        <section className="py-16 bg-muted/50" aria-labelledby="video-depoimentos-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <span className="section-label">Vídeos</span>
              <h2 id="video-depoimentos-heading" className="mt-3">Depoimentos em Vídeo</h2>
              <p className="text-sm text-muted-foreground mt-2">Em breve, depoimentos gravados pelos nossos clientes.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {videoTestimonials.map((v, i) => (
                <div key={i} className="group relative bg-background rounded-xl border overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center relative">
                    <img src={v.thumb} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" aria-hidden="true" />
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform">
                      <Play className="h-6 w-6 text-primary-foreground ml-0.5" />
                    </div>
                    <span className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded z-10">Em breve</span>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.seguro}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Todos os depoimentos */}
        <section className="py-16 md:py-24" aria-labelledby="todos-depoimentos-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="section-label">Todos os depoimentos</span>
              <h2 id="todos-depoimentos-heading" className="mt-3">Experiências de quem confia na Patro</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <article key={i} className="premium-card p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border" loading="lazy" />
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.role} · {t.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3" role="img" aria-label={`${t.stars} de 5 estrelas`}>
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-foreground text-foreground" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-[13px] text-muted-foreground leading-relaxed flex-1 mb-4">
                    "{t.fullContent}"
                  </blockquote>
                  <span className="self-start text-[11px] bg-muted px-2.5 py-1 rounded-full text-muted-foreground font-medium">
                    {t.seguro}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Nota Google */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 text-center max-w-lg">
            <div className="flex gap-1 justify-center mb-4" aria-label="4.9 de 5 estrelas">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-6 w-6 fill-primary text-primary" aria-hidden="true" />
              ))}
            </div>
            <p className="text-3xl font-bold mb-1">4.9</p>
            <p className="text-sm text-muted-foreground mb-2">Nota no Google Meu Negócio</p>
            <p className="text-xs text-muted-foreground mb-6">Baseado em 150+ avaliações reais de clientes</p>
            <a
              href="https://www.google.com/maps/place/Patro+Seguros/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
            >
              Ver avaliações no Google <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 gradient-hero" aria-label="Solicitar cotação">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-white mb-4">Quer ser o próximo a recomendar?</h2>
            <p className="text-white/60 mb-10 max-w-md mx-auto text-sm">
              Solicite sua cotação gratuita e descubra por que nossos clientes nos dão nota 4.9.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/cotacao">
                <Button size="lg" className="rounded-lg bg-white text-foreground hover:bg-white/90 h-11 px-7 text-[13px] font-semibold">
                  Pedir Cotação Gratuita
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("depoimentos")}>
                <Button size="lg" className="rounded-lg h-11 px-7 text-[13px] bg-white/[0.08] border border-white/[0.1] text-white/80 hover:bg-white/[0.12] font-medium">
                  <MessageCircle className="mr-1.5 h-3.5 w-3.5" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Depoimentos;
