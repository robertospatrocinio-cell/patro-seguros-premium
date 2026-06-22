import { Fragment } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import {
  cardsPessoa,
  cardsEmpresa,
  cardsAgro,
  cardsConsorcio,
} from "@/components/HeroInsuranceCarousel";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const SECTIONS = [
  {
    id: "pessoa",
    title: "Para Você e sua Família",
    description:
      "Proteção pessoal, patrimonial e de saúde para o dia a dia, com atendimento especializado em Guarulhos e região.",
    items: cardsPessoa,
  },
  {
    id: "empresa",
    title: "Para sua Empresa",
    description:
      "Soluções corporativas: galpões em Cumbica, frotas, RC, cyber, planos PME e mais — feitos sob medida para o seu setor.",
    items: cardsEmpresa,
  },
  {
    id: "agro",
    title: "Agronegócio",
    description:
      "Cobertura para máquinas, lavoura, propriedade rural e transporte agro com atendimento nacional.",
    items: cardsAgro,
  },
  {
    id: "consorcio",
    title: "Consórcios",
    description:
      "Planeje a compra do seu carro, moto ou imóvel sem juros, com parcelas que cabem no orçamento.",
    items: cardsConsorcio,
  },
] as const;

const Servicos = () => {
  const waUrl = buildWhatsAppUrl({
    origem: "pagina_servicos",
    extraLines: ["Origem: página /servicos"],
  });

  const handleWhats = () =>
    trackWhatsAppClick("servicos-sticky", { origin: "pagina_servicos" });
  const handleCotacao = () =>
    trackCotacaoClick("servicos-sticky", { origin: "pagina_servicos" });

  return (
    <Fragment>
      <PageMeta
        title="Serviços | Todos os Seguros da Patro Seguros"
        description="Conheça todas as categorias de seguros e consórcios oferecidos pela Patro Seguros: auto, vida, residencial, empresarial, frota, galpões, agro, RC, cyber e mais. Cotação rápida e atendimento humano."
      />
      <Header />
      <main id="main-content" className="outline-none bg-slate-50/50 pb-32">
        {/* Hero */}
        <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-top-left -z-10" />
          <div className="container mx-auto px-4">
            <Breadcrumb
              items={[{ label: "Serviços", href: "/servicos" }]}
            />
            <div className="max-w-4xl mx-auto text-center mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                <ShieldCheck className="w-4 h-4" /> Catálogo completo de proteção
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
                Todos os <span className="text-primary italic">seguros</span> em um só lugar
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Mais de 40 produtos de seguros e consórcios com 16+ seguradoras parceiras.
                Escolha o que precisa proteger e fale com um especialista.
              </p>
            </div>
          </div>
        </section>

        {/* Sections */}
        <div className="container mx-auto px-4 space-y-16">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`heading-${section.id}`}>
              <div className="max-w-3xl mb-8">
                <h2
                  id={`heading-${section.id}`}
                  className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3"
                >
                  {section.title}
                </h2>
                <p className="text-slate-600 leading-relaxed">{section.description}</p>
              </div>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((card) => {
                  const Icon = card.Icon;
                  return (
                    <li key={card.slug}>
                      <Link
                        to={card.href}
                        className="group h-full flex flex-col gap-3 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Icon className="w-5 h-5" />
                          </span>
                          <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                            {card.title}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed flex-1">
                          {card.short}
                        </p>
                        <span className="text-xs font-bold text-primary inline-flex items-center gap-1 mt-auto">
                          Ver detalhes <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </main>

      {/* Sticky CTA bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3 sm:justify-between">
          <p className="text-sm font-semibold text-slate-700 hidden sm:block">
            Pronto para proteger o que importa?
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="flex-1 sm:flex-none font-bold shadow-md shadow-primary/20"
            >
              <Link to="/cotacao" onClick={handleCotacao}>
                Pedir Cotação
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="flex-1 sm:flex-none font-bold border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800"
            >
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhats}
              >
                <MessageCircle className="w-4 h-4 mr-2" /> Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Servicos;