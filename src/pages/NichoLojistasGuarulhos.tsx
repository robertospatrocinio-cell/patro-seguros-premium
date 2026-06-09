import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import WebSiteSchema from "@/components/WebSiteSchema";
import AggregateRatingSchema from "@/components/AggregateRatingSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, ArrowRight, Shield, ShoppingBag, Store, Building2, MapPin } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20sou%20lojista%20em%20Guarulhos%20e%20gostaria%20de%20uma%20an%C3%A1lise%20gratuita%20da%20minha%20opera%C3%A7%C3%A3o.";

const faqs = [
  { question: "O seguro do shopping já não cobre minha loja?", answer: "Não. O seguro do condomínio do shopping cobre apenas as áreas comuns, estrutura do prédio e responsabilidade civil do condomínio. Todo o conteúdo da sua loja (estoque, móveis, vitrines) e sua responsabilidade civil perante clientes são de sua exclusiva responsabilidade." },
  { question: "O que o shopping exige em relação a seguros?", answer: "A maioria dos shoppings exige coberturas mínimas de Incêndio e Responsabilidade Civil Operações para autorizar o funcionamento da loja ou quiosque. A Patro analisa seu contrato de locação para garantir que a apólice atenda todas as exigências." },
  { question: "Seguro para quiosque é diferente de seguro para loja?", answer: "Sim, os riscos e valores são diferentes. Quiosques são mais expostos a furtos e pequenos acidentes. Temos produtos específicos para quiosques com custos reduzidos e coberturas sob medida." },
  { question: "A Patro Seguros atende quais shoppings em Guarulhos?", answer: "Atendemos lojistas do Shopping Maia, Internacional Shopping Guarulhos e Shopping Bonsucesso, além de centros comerciais e lojas de rua em toda a cidade." },
];

const shoppings = [
  { name: "Shopping Maia", slug: "seguro-lojas-shopping-maia", desc: "Especialistas na região Cidade Maia/Via Alameda." },
  { name: "Internacional Shopping", slug: "seguro-lojas-shopping-internacional-guarulhos", desc: "Proteção para um dos maiores fluxos de SP." },
  { name: "Shopping Bonsucesso", slug: "seguro-lojas-shopping-bonsucesso", desc: "Consultoria para o varejo da zona leste." },
];

const segmentos = [
  { name: "Franquias", slug: "seguro-para-franquias-guarulhos" },
  { name: "Lojas de Roupas", slug: "seguro-loja-de-roupas-guarulhos" },
  { name: "Óticas", slug: "seguro-otica-guarulhos" },
  { name: "Joalherias", slug: "seguro-joalheria-guarulhos" },
  { name: "Perfumarias", slug: "seguro-perfumaria-guarulhos" },
  { name: "Lojas de Celulares", slug: "seguro-loja-celular-guarulhos" },
  { name: "Restaurantes", slug: "seguro-restaurante-guarulhos" },
  { name: "Quiosques", slug: "seguro-quiosque-shopping-guarulhos" },
  { name: "Clínicas e Estéticas", slug: "seguro-clinica-estetica-guarulhos" },
];

const coberturas = [
  "Seguro Empresarial (Incêndio/Roubo)",
  "Seguro de Equipamentos",
  "Seguro de Estoque",
  "Lucros Cessantes",
  "Responsabilidade Civil (RC)",
  "Seguro de Vida Empresarial",
  "Plano de Saúde Empresarial",
  "Seguro Cibernético",
];

const NichoLojistasGuarulhos = () => (
  <>
    <PageMeta
      title="Seguros para Lojistas em Guarulhos | Patro Seguros"
      description="Proteja sua loja, franquia ou quiosque nos shoppings de Guarulhos. Seguro empresarial, vida, saúde e responsabilidade civil. Cotação grátis."
    />
    <FAQSchema faqs={faqs} />
    <LocalBusinessSchema />
    <OrganizationSchema />
    <WebSiteSchema />
    <AggregateRatingSchema
      serviceName="Seguros para Lojistas em Guarulhos"
      url="https://www.patroseguros.com.br/seguros-para-lojistas-guarulhos"
      description="Hub estratégico de seguros para lojistas de shopping em Guarulhos."
    />
    <BreadcrumbSchema items={[
      { name: "Início", url: "/" },
      { name: "Lojistas Guarulhos", url: "/seguros-para-lojistas-guarulhos" }
    ]} />
    <Header />
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Breadcrumb items={[{ label: "Segmentos" }, { label: "Lojistas Guarulhos" }]} />

      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-6">Hub de Seguros para Shopping</span>
          <h1 className="text-white mb-4">Seguros para Lojistas em Guarulhos</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Proteção estratégica para sua loja, franquia ou quiosque nos principais shoppings de Guarulhos. Geração de leads e autoridade local.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("hub-lojistas")}>
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold rounded-lg h-12 px-8">Solicite uma análise gratuita</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub-lojistas")}>
              <Button size="lg" variant="cta" className="rounded-lg h-12 px-8"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Direto</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-center mb-10">Páginas Específicas por Shopping</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {shoppings.map((s) => (
              <Link key={s.slug} to={`/${s.slug}`} className="group bg-background p-6 rounded-xl border border-border hover:border-primary/50 transition-all shadow-sm">
                <Building2 className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{s.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                <span className="text-sm font-medium text-primary flex items-center">Acessar página <ArrowRight className="ml-1 h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-center mb-4">Seguros por Segmento de Atuação</h2>
          <p className="text-center text-muted-foreground mb-10 text-sm">Soluções moldadas para a realidade de cada lojista.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {segmentos.map((seg) => (
              <Link key={seg.slug} to={`/${seg.slug}`} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors border border-transparent hover:border-primary/20">
                <ShoppingBag className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">{seg.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-white mb-8">O que sua loja precisa para estar 100% segura</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {coberturas.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <span className="text-xs md:text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/cotacao">
              <Button size="lg" variant="secondary" className="font-bold">Solicite uma análise gratuita da sua operação</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Artigos Recomendados para Lojistas</h2>
          <div className="space-y-4">
            <Link to="/blog/7-riscos-lojista-shopping-guarulhos" className="block p-5 border rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-2">7 Riscos Que Todo Lojista de Shopping em Guarulhos Precisa Conhecer</h3>
              <p className="text-sm text-muted-foreground">Saiba como proteger sua operação no Shopping Maia, Internacional ou Bonsucesso.</p>
            </Link>
            <Link to="/blog/lojistas-e-franquias" className="text-primary font-medium flex items-center justify-center mt-6">
              Ver todos os artigos para lojistas <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="mb-6">Cotação Rápida para Lojistas</h2>
          <p className="text-muted-foreground mb-10">Preencha os dados e receba uma proposta personalizada em até 2 horas.</p>
          <div className="bg-background p-8 rounded-2xl border shadow-lg text-left">
            {/* O formulário será injetado aqui via componente reutilizável ou link para cotação */}
            <p className="text-center text-sm mb-6">Para agilizar, você pode falar diretamente com nossa equipe:</p>
            <div className="flex flex-col gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] h-14 text-lg gap-2">
                  <MessageCircle className="h-6 w-6" /> WhatsApp Especialista Lojista
                </Button>
              </a>
              <Link to="/cotacao?tipo=empresarial&origem=hub-lojistas" className="w-full">
                <Button variant="outline" className="w-full h-14 text-lg">
                  Formulário de Cotação
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default NichoLojistasGuarulhos;
