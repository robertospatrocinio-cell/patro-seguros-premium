import { Link } from "react-router-dom";
import { CheckCircle, Shield, Users, Clock, Award, MessageCircle, Phone } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const SeoCorretoraGuarulhos = () => (
  <>
    <PageMeta title="Corretora de Seguros em Guarulhos" description="Patro Seguros — a melhor corretora de seguros de Guarulhos. Atendimento consultivo, cotação grátis e parceria com as principais seguradoras do Brasil." />
    <Header />
    <main id="main-content">
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-white mb-6">Corretora de Seguros em Guarulhos — Patro Seguros</h1>
          <p className="text-xl text-white/70 mb-8">
            A Patro Seguros é a corretora de seguros mais completa de Guarulhos. Atendimento consultivo, cotação rápida e as melhores seguradoras do mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cotacao">
              <Button size="lg" className="text-lg px-8"><Shield className="mr-2 h-5 w-5" /> Solicitar Cotação</Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="cta" className="text-lg px-8"><MessageCircle className="mr-2 h-5 w-5" /> WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Por Que Somos a Melhor Corretora de Guarulhos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: "Cotação em 2h", desc: "Resposta rápida com as melhores opções." },
              { icon: Users, title: "Atendimento Local", desc: "Escritório em Guarulhos com atendimento presencial." },
              { icon: Shield, title: "+13 Seguradoras", desc: "Parceria com as maiores seguradoras do Brasil." },
              { icon: Award, title: "Suporte Total", desc: "Acompanhamento completo em sinistros." },
            ].map((item, i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-6">
                  <item.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="mb-8">Seguros Disponíveis em Guarulhos</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Seguro Auto", "Seguro Moto", "Seguro Residencial", "Seguro Vida",
              "Seguro Empresarial", "Seguro Frota", "Planos de Saúde", "Seguro Viagem",
              "Seguro RC", "Previdência Privada", "Seguro Celular", "Seguro Condomínio",
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-white">Fale com a Melhor Corretora de Guarulhos</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cotacao"><Button size="lg" variant="secondary">Pedir Cotação Gratuita</Button></Link>
            <a href="tel:1151997500"><Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"><Phone className="mr-2 h-5 w-5" /> (11) 5199-7500</Button></a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-center mb-12">Perguntas Frequentes</h2>
          <div className="space-y-6">
            {[
              { q: "Onde fica a Patro Seguros?", a: "Estamos na Avenida Salgado Filho, 2120 – Sala 219 – Guarulhos/SP. Atendemos presencialmente e online." },
              { q: "A Patro atende outras cidades?", a: "Sim! Embora nossa sede seja em Guarulhos, atendemos clientes de todo o Brasil." },
              { q: "Como funciona a cotação?", a: "Você solicita pelo site, WhatsApp ou telefone. Em até 2 horas enviamos as melhores propostas." },
            ].map((faq, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default SeoCorretoraGuarulhos;
