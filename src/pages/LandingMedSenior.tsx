import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Phone, CheckCircle, Shield, Clock, Star, Award, Building2, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageMeta from "@/components/PageMeta";
import OptimizedImage from "@/components/OptimizedImage";
import { trackWhatsAppClick } from "@/lib/tracking";
import heroImg from "@/assets/lp-medsenior.webp";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20MedS%C3%AAnior%20Infinite.";
const logoUrl = "/images/logo-full.webp";

const hospitaisElite = [
  "Oswaldo Cruz (Paulista)",
  "Hospital 9 de Julho",
  "Samaritano (Paulista/Higienópolis)",
  "Hosp. Santa Catarina",
  "Beneficência Portuguesa",
  "Hosp. Leforte Liberdade",
  "São Camilo (Pompéia/Ipiranga)",
  "Santa Paula",
  "Hosp. Santa Marcelina",
];

const hospitaisGrandeSP = [
  "Christóvão da Gama (ABC)",
  "Vera Cruz (Campinas)",
  "Madre Theodora (Campinas)",
];

const laboratorios = [
  "Laboratório Fleury",
  "Laboratório A+",
  "CDB (Centro Diag. Brasil)",
  "Femme (Lab. da Mulher)",
  "Hermes Pardini",
  "Labi Exames",
  "Sabin (Campinas)",
  "Vital Lab",
];

const faixasPreco = [
  { faixa: "49 a 53 anos", preco: "R$ 1.653,00" },
  { faixa: "54 a 58 anos", preco: "R$ 1.983,60" },
  { faixa: "59 anos ou mais", preco: "R$ 2.598,52" },
];

const diferenciais = [
  { icon: "🏥", title: "Rede Premium SP", description: "Acesso aos melhores hospitais: Oswaldo Cruz, 9 de Julho e Samaritano. Medicina de ponta com conforto." },
  { icon: "💳", title: "Sem Coparticipação", description: "Use o plano sem pagar nada a mais por consulta, exame ou internação. Preço fixo mensal." },
  { icon: "🧑‍⚕️", title: "Especialistas de Ponta", description: "Acesso ilimitado aos melhores especialistas e tecnologias de última geração." },
  { icon: "🛏️", title: "Apartamento Individual", description: "Internação em quarto privativo com acompanhante. Conforto e privacidade garantidos." },
  { icon: "✈️", title: "Proteção em Viagem", description: "Cobertura de R$ 30.000 em viagens nacionais e internacionais inclusa no plano." },
  { icon: "🌍", title: "Rede Nacional", description: "Cobertura nas principais capitais brasileiras. Atendimento onde você estiver." },
];

const objections = [
  { question: "Para quem é o MedSênior Infinite?", answer: "O plano é exclusivo para pessoas a partir de 49 anos que desejam acesso à rede premium de São Paulo com atendimento personalizado e sem coparticipação." },
  { question: "Posso trocar meu plano atual sem carência?", answer: "Em muitos casos, sim! Através da portabilidade de carências, você pode migrar sem cumprir carências novamente. Analisamos seu caso gratuitamente." },
  { question: "A Patro cobra alguma taxa pelo serviço?", answer: "Não! Nossa remuneração vem da operadora. Para você, o serviço é 100% gratuito e o preço é o mesmo que comprando direto com a MedSênior." },
  { question: "Como funciona o atendimento em outras cidades?", answer: "O MedSênior Infinite possui rede nacional nas principais capitais, além de cobertura completa em SP, ABC e Campinas." },
  { question: "Qual a diferença entre o Infinite e outros planos MedSênior?", answer: "O Infinite é o plano mais completo da MedSênior: apartamento individual, sem coparticipação, rede premium com os melhores hospitais e laboratórios de SP." },
];

const testimonials = [
  { name: "Maria Helena R.", role: "Aposentada, 62 anos", stars: 5, content: "Saí de um plano caro com rede limitada e encontrei o MedSênior Infinite. Agora tenho Oswaldo Cruz e 9 de Julho pagando menos!" },
  { name: "José Carlos M.", role: "Empresário, 55 anos", stars: 5, content: "A Patro me apresentou o comparativo completo. O Infinite foi disparado o melhor custo-benefício para minha faixa etária." },
  { name: "Sônia A.", role: "Professora aposentada", stars: 5, content: "Fiz a portabilidade sem carência nenhuma. No dia seguinte já estava usando o plano novo. Equipe da Patro excepcional!" },
];

const LandingMedSenior = () => {
  const CtaButton = ({ variant = "primary" }: { variant?: "primary" | "whatsapp" }) => {
    if (variant === "whatsapp") {
      return (
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" onClick={() => trackWhatsAppClick("lp-medsenior")}>
          <Button size="lg" className="w-full sm:w-auto rounded-xl h-12 px-8 text-sm bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white font-semibold shadow-lg">
            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Atendimento via WhatsApp
          </Button>
        </a>
      );
    }
    return (
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
        <Button size="lg" className="w-full sm:w-auto rounded-xl bg-[hsl(160,60%,35%)] hover:bg-[hsl(160,60%,30%)] text-white h-12 px-8 text-sm font-bold shadow-lg animate-pulse hover:animate-none">
          <ArrowRight className="mr-2 h-4 w-4" aria-hidden="true" /> Solicitar Opções Online
        </Button>
      </a>
    );
  };

  return (
    <>
      <PageMeta
        title="MedSênior Infinite — Plano Premium 49+ | Patro Seguros"
        description="MedSênior Infinite: plano premium sem coparticipação com Oswaldo Cruz, 9 de Julho e Samaritano. A partir de R$ 1.653/mês. Cotação gratuita. Patro Seguros."
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/">
            <img src={logoUrl} alt="Patro Seguros" width={180} height={40} className="h-10" />
          </Link>
          <a href="tel:1151997500" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Phone className="h-4 w-4" /> (11) 5199-7500
          </a>
        </div>
      </header>

      <main className="pt-14">
        {/* HERO */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(160,30%,15%) 0%, hsl(160,40%,22%) 50%, hsl(170,35%,18%) 100%)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(160,80%,50%,0.12),transparent)]" />
          <div className="container mx-auto px-4 relative">
            <div className="py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-[11px] uppercase tracking-wider mb-6">
                  <Shield className="h-3.5 w-3.5" /> Sem Coparticipação
                </div>

                <h1 className="text-white text-balance mb-4 font-extrabold leading-tight">
                  Oswaldo Cruz, 9 de Julho e Samaritano por um preço que cabe no seu bolso
                </h1>
                <p className="text-base md:text-lg text-white/70 mb-4 max-w-xl leading-relaxed">
                  O <strong className="text-white">MedSênior Infinite</strong> une a medicina de ponta de São Paulo com um atendimento exclusivo para o público 49+.
                </p>
                <p className="text-white/40 text-sm mb-8">
                  Apartamento · ANS 504.224/25-1 · A partir de R$ 1.653/mês
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8">
                  <CtaButton />
                  <CtaButton variant="whatsapp" />
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/50 text-[11px] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> Rede Premium SP</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Resposta em 2h</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> 100% Gratuito</span>
                </div>
              </div>

              <div className="flex-1 max-w-md w-full">
                <OptimizedImage
                  src={heroImg}
                  alt="MedSênior Infinite - Plano de Saúde Premium"
                  eager
                  className="w-full h-auto rounded-2xl shadow-2xl shadow-black/30 aspect-[4/3]"
                  width={448}
                  height={336}
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-16 bg-background" aria-labelledby="problemas">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 id="problemas" className="text-center mb-10">
              Quer manter a qualidade pagando um valor justo?
            </h2>
            <ul className="space-y-4 list-none">
              {[
                "Você faz questão de atendimento nos hospitais Oswaldo Cruz, Samaritano ou 9 de Julho, mas quer rever seus custos?",
                "Está pagando coparticipação em cada consulta e exame, encarecendo seu plano mês a mês?",
                "Recebeu um reajuste por faixa etária e não sabe se existe opção melhor para 49+?",
                "Quer um plano com apartamento individual sem pagar uma fortuna?",
              ].map((pain, i) => (
                <li key={i} className="flex items-start gap-4 bg-destructive/[0.04] border border-destructive/10 rounded-xl p-5">
                  <span className="text-destructive font-bold text-lg mt-0.5" aria-hidden="true">⚠️</span>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{pain}</p>
                </li>
              ))}
            </ul>
            <p className="text-center mt-8 text-muted-foreground text-sm">
              Se respondeu "sim" para qualquer uma, o <strong className="text-foreground">MedSênior Infinite pode ser a solução</strong>.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {[
                { value: "49+", label: "Idade Mínima" },
                { value: "0", label: "Coparticipação" },
                { value: "30+", label: "Hospitais" },
                { value: "100%", label: "Gratuito" },
              ].map((s) => (
                <div key={s.label} className="py-8 text-center">
                  <p className="text-2xl md:text-3xl font-extrabold text-[hsl(160,60%,35%)] tracking-tight font-heading">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-[0.1em] font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rede Premium */}
        <section className="py-20 bg-background" aria-labelledby="rede">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-14">
              <span className="section-label">Rede Credenciada</span>
              <h2 id="rede" className="mt-3">Destaques da Rede Premium SP</h2>
              <p className="text-sm text-muted-foreground mt-2">Cobertura na Capital, ABC e Campinas*</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Hospitais */}
              <div className="premium-card p-7">
                <h3 className="text-[15px] font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-[hsl(160,60%,35%)]">
                  <Building2 className="h-4 w-4" /> Hospitais Elite
                </h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground mb-5">
                  {hospitaisElite.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-[hsl(160,60%,35%)] flex-shrink-0" /> {h}
                    </li>
                  ))}
                </ul>
                <h4 className="text-[13px] font-bold text-[hsl(160,60%,35%)] mb-2">Grande SP e Interior:</h4>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {hospitaisGrandeSP.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-[hsl(160,60%,35%)] flex-shrink-0" /> {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Laboratórios */}
              <div className="premium-card p-7">
                <h3 className="text-[15px] font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-[hsl(160,60%,35%)]">
                  <Stethoscope className="h-4 w-4" /> Laboratórios
                </h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground mb-5">
                  {laboratorios.map((l) => (
                    <li key={l} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-[hsl(160,60%,35%)] flex-shrink-0" /> {l}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 rounded-lg bg-[hsl(160,60%,35%)]/10 border border-[hsl(160,60%,35%)]/20">
                  <p className="text-[13px] font-medium text-[hsl(160,60%,35%)]">Unidades Próprias:</p>
                  <p className="text-[12px] text-muted-foreground">Av. Paulista, Santana, Tatuapé, Av. Brasil e mais.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabela de Preços */}
        <section className="py-16 bg-muted/30 border-y" aria-labelledby="precos">
          <div className="container mx-auto px-4 max-w-lg">
            <h2 id="precos" className="text-center mb-10">Veja nossas sugestões de valores</h2>
            <div className="rounded-xl overflow-hidden border shadow-sm">
              <div className="grid grid-cols-2 bg-[hsl(160,60%,35%)] text-white text-sm font-bold">
                <div className="p-4 text-center">Faixa Etária</div>
                <div className="p-4 text-center">A partir de</div>
              </div>
              {faixasPreco.map((f, i) => (
                <div key={i} className={`grid grid-cols-2 text-sm ${i % 2 === 0 ? "bg-background" : "bg-muted/50"}`}>
                  <div className="p-4 text-center text-foreground font-medium">{f.faixa}</div>
                  <div className="p-4 text-center font-bold text-foreground">{f.preco}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-[11px] text-muted-foreground mt-3">*Valores sujeitos a alteração. Consulte condições.</p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-background" aria-labelledby="diferenciais">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="section-label">Diferenciais</span>
              <h2 id="diferenciais" className="mt-3">O que torna o Infinite especial</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {diferenciais.map((b, i) => (
                <div key={i} className="premium-card p-7 text-center">
                  <div className="text-3xl mb-4">{b.icon}</div>
                  <h3 className="text-[15px] font-semibold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-14 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(160,30%,15%) 0%, hsl(160,40%,22%) 100%)" }}>
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-3 text-xl md:text-2xl font-bold">Quer manter a qualidade pagando um valor justo?</h2>
            <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">Cotação gratuita e sem compromisso. Resultado em até 2 horas.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CtaButton />
              <CtaButton variant="whatsapp" />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-background" aria-labelledby="depoimentos">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="section-label">Depoimentos</span>
              <h2 id="depoimentos" className="mt-3">Quem contratou, recomenda</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {testimonials.map((t, i) => (
                <article key={i} className="premium-card p-7 flex flex-col">
                  <div className="flex gap-0.5 mb-4" role="img" aria-label={`${t.stars} de 5 estrelas`}>
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-[hsl(160,60%,35%)] text-[hsl(160,60%,35%)]" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-[13px] text-muted-foreground leading-relaxed flex-1 mb-5">
                    "{t.content}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-8 h-8 rounded-full bg-[hsl(160,60%,35%)]/10 flex items-center justify-center text-[hsl(160,60%,35%)] font-bold text-[11px]">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Objections */}
        <section className="py-20 gradient-surface" aria-labelledby="duvidas">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-14">
              <h2 id="duvidas" className="mt-3">Dúvidas frequentes</h2>
            </div>
            <div className="space-y-3">
              {objections.map((obj, i) => (
                <details key={i} className="premium-card group" open={i === 0}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-[15px] font-semibold hover:text-[hsl(160,60%,35%)] transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                    {obj.question}
                    <span className="text-[hsl(160,60%,35%)]/40 ml-4 group-open:rotate-45 transition-transform text-lg font-light flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{obj.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee */}
        <section className="py-14 bg-background">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <Award className="h-10 w-10 text-[hsl(160,60%,35%)] mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Nossa Garantia</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Apresentamos comparativo completo com outras operadoras para que você veja que o MedSênior Infinite oferece o melhor custo-benefício. Você decide sem pressão.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(160,30%,15%) 0%, hsl(160,40%,22%) 100%)" }}>
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-3 text-2xl md:text-3xl font-extrabold">
              Solicite sua cotação gratuita agora
            </h2>
            <p className="text-white/60 text-sm mb-4 max-w-lg mx-auto">
              Descubra como ter Oswaldo Cruz, 9 de Julho e Samaritano pagando um valor justo.
            </p>
            <p className="text-amber-300 text-xs font-bold uppercase tracking-wider mb-8">
              ⏰ Reajustes anuais em breve — garanta o melhor preço agora
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <CtaButton />
              <CtaButton variant="whatsapp" />
            </div>
            <a href="tel:1151997500" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              Prefere ligar? <strong className="text-white/60">(11) 5199-7500</strong>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-background border-t">
          <div className="container mx-auto px-4 text-center">
            <img src={logoUrl} alt="Patro Seguros" width={144} height={32} className="h-8 mx-auto mb-3" />
            <p className="text-[11px] text-muted-foreground">
              Patro Corretora de Seguros — SUSEP nº 212113511 — Guarulhos/SP
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default LandingMedSenior;
