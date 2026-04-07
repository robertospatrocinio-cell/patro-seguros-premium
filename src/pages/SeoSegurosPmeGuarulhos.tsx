import { Link } from "react-router-dom";
import { CheckCircle, Shield, Users, Building2, Truck, Heart, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguros%20para%20minha%20empresa.";

const faqs = [
  { question: "Quais seguros uma PME em Guarulhos precisa?", answer: "Os mais importantes são: seguro empresarial (patrimônio), seguro de vida em grupo, plano de saúde empresarial, seguro de frota (se aplicável) e RC profissional. A Patro analisa seu negócio e recomenda o pacote ideal." },
  { question: "Quanto custa seguro empresarial para PME em Guarulhos?", answer: "Depende do tipo de negócio, localização e coberturas. Comércios pagam a partir de R$ 500/ano. Indústrias e galpões têm valores variáveis. Solicite cotação gratuita." },
  { question: "A Patro atende empresas de todos os portes?", answer: "Sim. Atendemos MEIs, micro e pequenas empresas, médias empresas e grandes corporações em Guarulhos e região." },
];

const segurosEmpresariais = [
  { icon: Building2, title: "Seguro Empresarial", desc: "Proteção patrimonial para comércios, escritórios e indústrias.", link: "/seguro-empresarial-guarulhos" },
  { icon: Truck, title: "Seguro de Frota", desc: "Gestão de risco para frotas corporativas e logísticas.", link: "/seguro-frota-empresas-guarulhos" },
  { icon: Heart, title: "Plano de Saúde PME", desc: "Planos empresariais com preços diferenciados a partir de 2 vidas.", link: "/plano-saude-empresarial" },
  { icon: Shield, title: "Seguro de Vida Grupo", desc: "Benefício para colaboradores com condições especiais.", link: "/seguro-vida-pme" },
  { icon: Users, title: "RC Profissional", desc: "Proteção contra erros e omissões profissionais.", link: "/seguro-rc-profissional" },
  { icon: Building2, title: "Seguro Cyber", desc: "Proteção contra ataques cibernéticos e vazamento de dados.", link: "/seguro-cyber" },
];

const SeoSegurosPmeGuarulhos = () => (
  <>
    <PageMeta
      title="Seguros para PMEs em Guarulhos"
      description="Pacote completo de seguros para PMEs em Guarulhos: empresarial, frota, vida grupo, saúde e RC. Cotação gratuita e consultoria personalizada. Patro Seguros."
    />
    <FAQSchema faqs={faqs} />
    <LocalBusinessSchema />
    <BreadcrumbSchema items={[
      { name: "Início", url: "https://www.patroseguros.com.br" },
      { name: "Seguros para Empresas", url: "https://www.patroseguros.com.br/seguros-empresariais-pme-guarulhos" },
    ]} />
    <Header />
    <main id="main-content">
      <Breadcrumb items={[{ label: "Início", to: "/" }, { label: "Seguros PME Guarulhos" }]} />

      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-white mb-6">Seguros para PMEs e Empresas em Guarulhos</h1>
          <p className="text-lg text-white/80 mb-4 max-w-2xl mx-auto">
            Guarulhos é o segundo maior polo empresarial do estado de São Paulo. A Patro Seguros oferece consultoria especializada em seguros corporativos para proteger seu patrimônio, sua equipe e sua operação.
          </p>
          <p className="text-sm text-white/60 mb-8">
            Desde 2020, atendemos comércios, indústrias, transportadoras e prestadores de serviço com atendimento presencial no Cidade Maia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cotacao" onClick={() => trackCotacaoClick("seo-pme-guarulhos")}>
              <Button size="lg" className="text-lg px-8"><Shield className="mr-2 h-5 w-5" /> Cotação para Empresas</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("seo-pme-guarulhos")}>
              <Button size="lg" variant="cta" className="text-lg px-8"><MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Empresarial</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4">Soluções de Seguros para Empresas de Guarulhos</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Cada empresa tem riscos específicos. A Patro analisa seu negócio e monta o pacote ideal de proteção.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {segurosEmpresariais.map((item, i) => (
              <Link key={i} to={item.link}>
                <Card className="h-full hover:shadow-lg transition-all group">
                  <CardContent className="pt-6">
                    <item.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <span className="text-sm text-primary font-medium mt-3 flex items-center">
                      Saiba mais <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">3 Erros Comuns de Empresários ao Contratar Seguros em Guarulhos</h2>
          <div className="space-y-6">
            {[
              { title: "1. Contratar apenas pelo menor preço", desc: "O seguro mais barato pode ter exclusões que deixam sua empresa vulnerável. A Patro compara coberturas, não só preços." },
              { title: "2. Não revisar o seguro anualmente", desc: "Seu negócio muda, e o seguro precisa acompanhar. Fazemos revisão gratuita a cada renovação." },
              { title: "3. Ignorar o seguro de responsabilidade civil", desc: "Um acidente com cliente ou terceiro pode gerar processos milionários. O RC protege o patrimônio da empresa." },
            ].map((item, i) => (
              <div key={i} className="bg-background rounded-xl p-6">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-8">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border rounded-xl p-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-white">Proteja Sua Empresa em Guarulhos</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Cotação gratuita, sem compromisso. Atendimento presencial no Cidade Maia ou online.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cotacao"><Button size="lg" variant="secondary">Solicitar Cotação</Button></Link>
            <a href="tel:1151997500"><Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"><Phone className="mr-2 h-5 w-5" /> (11) 5199-7500</Button></a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default SeoSegurosPmeGuarulhos;
