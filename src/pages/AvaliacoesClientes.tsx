/**
 * /avaliacoes-clientes — Página institucional de prova social.
 *
 * Reúne: hero, componente global ProvaSocialPatro, cards "o que os clientes
 * mais valorizam", grid de depoimentos (com badge "Exemplo" enquanto forem
 * placeholders), bloco "por que avaliações importam", CTA final.
 *
 * Fontes de dados:
 *   - Nota Google + links → src/lib/patroSocialProof.ts
 *   - Depoimentos          → src/data/patroTestimonials.ts
 */

import type { ElementType } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  MessageCircle,
  MapPin,
  Quote,
  Users,
  Heart,
  Scale,
  Zap,
  RefreshCw,
  LifeBuoy,
  Building2,
  Handshake,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ProvaSocialPatro from "@/components/ProvaSocialPatro";
import { PATRO_SOCIAL_PROOF } from "@/lib/patroSocialProof";
import { PATRO_TESTIMONIALS } from "@/data/patroTestimonials";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { trackWhatsAppClick } from "@/lib/tracking";

const VALORIZAM = [
  { icon: Heart, title: "Atendimento humano", copy: "Consultor real que entende o momento do cliente e responde sem robotizar." },
  { icon: Scale, title: "Clareza na explicação", copy: "Coberturas, franquias e exclusões traduzidas em linguagem simples." },
  { icon: Handshake, title: "Comparação entre seguradoras", copy: "Cotamos em várias parceiras e mostramos os pontos fortes de cada uma." },
  { icon: Zap, title: "Agilidade na cotação", copy: "Você envia os dados pelo WhatsApp e recebe orientação rápida." },
  { icon: RefreshCw, title: "Apoio em renovação", copy: "Revisamos cobertura, perfil e preço antes de renovar — sem piloto automático." },
  { icon: LifeBuoy, title: "Orientação em sinistros", copy: "Explicamos os próximos passos e ajudamos a organizar documentos." },
  { icon: Building2, title: "Presença local em Guarulhos", copy: "Escritório físico na Cidade Maia, acessível quando o cliente precisa." },
  { icon: Users, title: "Relacionamento de longo prazo", copy: "Muitos clientes estão conosco há anos, renovando ano após ano." },
];

const AvaliacoesClientes = () => {
  return (
    <>
      <PageMeta
        title="Avaliações dos Clientes da Patro Seguros em Guarulhos"
        description="Veja avaliações reais de clientes da Patro Seguros em Guarulhos. Atendimento humano, corretora registrada na SUSEP e soluções em seguro auto, residencial, vida, saúde, empresarial e muito mais."
      
      skipBreadcrumb
    />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: CANONICAL_BASE_URL },
          { name: "Avaliações dos Clientes", url: `${CANONICAL_BASE_URL}/avaliacoes-clientes` },
        ]}
      />

      <Header />
      <main id="main-content" className="outline-none">
        {/* Hero */}
        <section
          className="gradient-hero relative overflow-hidden"
          aria-labelledby="avaliacoes-heading"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(215,100%,60%,0.12),transparent)]" />
          <div className="container mx-auto px-4 relative">
            <div className="pt-6">
              <Breadcrumb
                items={[
                  { label: "Início", href: "/" },
                  { label: "Avaliações dos Clientes" },
                ]}
              />
            </div>

            <div className="py-16 md:py-24 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-white/85 mb-6">
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
                {PATRO_SOCIAL_PROOF.googleRating} · {PATRO_SOCIAL_PROOF.googleReviewCount} avaliações no Google
              </div>

              <h1
                id="avaliacoes-heading"
                className="text-white text-balance mb-5"
              >
                Avaliações dos Clientes da Patro Seguros
              </h1>
              <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                A confiança dos nossos clientes é o nosso maior patrimônio. Veja por que tantas
                pessoas escolhem a Patro Seguros para proteger carro, casa, empresa, família e
                patrimônio.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={PATRO_SOCIAL_PROOF.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="rounded-xl bg-white text-primary hover:bg-white/90 h-11 px-6 text-sm font-semibold"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Ver avaliações no Google
                  </Button>
                </a>
                <a
                  href={PATRO_SOCIAL_PROOF.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("avaliacoes-hero")}
                >
                  <Button
                    size="lg"
                    className="rounded-xl bg-green-600 hover:bg-green-700 text-white h-11 px-6 text-sm font-semibold"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" /> Falar com a Patro no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bloco 2 — ProvaSocialPatro global */}
        <section className="py-14 md:py-16 bg-slate-50" aria-label="Prova social consolidada">
          <div className="container mx-auto px-4 max-w-4xl">
            <ProvaSocialPatro
              variant="default"
              trackingContext="avaliacoes-page"
              hideReviewsLink
            />
          </div>
        </section>

        {/* Bloco 3 — O que os clientes mais valorizam */}
        <section className="py-16 md:py-20 bg-white" aria-labelledby="valorizam-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="section-label">Diferenciais</span>
              <h2 id="valorizam-heading" className="mt-3">
                O que os clientes mais valorizam na Patro
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {VALORIZAM.map(({ icon: Icon, title, copy }) => (
                <Card key={title} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1.5">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bloco 4 — Depoimentos */}
        <section className="py-16 md:py-20 bg-slate-50" aria-labelledby="depoimentos-heading">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-xl">
                <span className="section-label">Depoimentos</span>
                <h2 id="depoimentos-heading" className="mt-3">
                  Palavras de quem confia na Patro
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Sempre que possível, replicamos aqui avaliações que os clientes deixaram
                  publicamente no Google, com autorização. Clique em qualquer card para ler no Google.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PATRO_TESTIMONIALS.map((t, i) => {
                const Wrapper: ElementType = t.reviewUrl ? "a" : "div";
                const wrapperProps = t.reviewUrl
                  ? { href: t.reviewUrl, target: "_blank", rel: "noopener noreferrer" }
                  : {};
                return (
                  <Wrapper
                    key={i}
                    {...wrapperProps}
                    className="block group"
                  >
                    <Card className="h-full border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                      <CardContent className="p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex text-amber-500" role="img" aria-label="5 estrelas">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                            ))}
                          </div>
                          {t.placeholder ? (
                            <span className="text-[10px] uppercase tracking-wider font-bold text-amber-700 bg-amber-100 rounded-full px-2 py-0.5">
                              Exemplo
                            </span>
                          ) : (
                            <Quote className="h-5 w-5 text-primary/20 group-hover:text-primary/40 transition-colors" aria-hidden="true" />
                          )}
                        </div>
                        <p className="text-sm text-foreground/85 italic leading-relaxed">
                          "{t.text}"
                        </p>
                        <div className="pt-3 border-t border-slate-100">
                          <p className="text-sm font-semibold text-foreground">{t.name}</p>
                          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-0.5">
                            <MapPin className="w-3 h-3 text-primary" aria-hidden="true" />
                            {t.location} · {t.insurance} · {t.date}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Wrapper>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <a
                href={PATRO_SOCIAL_PROOF.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
              >
                Ver todas as avaliações no perfil do Google <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Bloco 5 — Por que avaliações importam */}
        <section className="py-16 md:py-20 bg-white" aria-labelledby="importam-heading">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <span className="section-label">Reputação</span>
            <h2 id="importam-heading" className="mt-3 mb-5">
              Por que avaliações importam em seguros?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Em seguros, preço importa, mas confiança pesa ainda mais. Uma boa corretora precisa
              orientar na contratação, explicar coberturas, comparar seguradoras e estar presente
              quando o cliente mais precisa: em uma renovação, dúvida ou sinistro.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Corretora registrada na SUSEP · Patro Corretora de Seguros Ltda
            </div>
          </div>
        </section>

        {/* Bloco 6 — CTA final */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-primary-foreground mb-4">
              Quer fazer seu seguro com uma corretora bem avaliada?
            </h2>
            <p className="text-primary-foreground/80 text-base mb-8">
              Fale com a Patro Seguros e receba uma orientação clara, humana e sem pressão para
              contratar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PATRO_SOCIAL_PROOF.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("avaliacoes-cta-final")}
              >
                <Button
                  size="lg"
                  className="rounded-xl bg-green-600 hover:bg-green-700 text-white h-12 px-8 text-sm font-semibold"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Solicitar cotação pelo WhatsApp
                </Button>
              </a>
              <Link to="/cotacao">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl h-12 px-8 text-sm bg-transparent border-white/30 text-white hover:bg-white/10"
                >
                  Preencher formulário de cotação
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AvaliacoesClientes;