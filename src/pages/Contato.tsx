import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contato = () => {
  return (
    <>
      <PageMeta title="Contato" description="Entre em contato com a Patro Seguros em Guarulhos. Atendimento por WhatsApp, telefone e e-mail. Tire dúvidas e solicite cotações de seguros." />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-white mb-6">Fale Conosco</h1>
              <p className="text-xl text-white/70">
                Estamos prontos para atender você. Entre em contato e descubra como podemos te ajudar
              </p>
            </div>
          </div>
        </section>

        {/* Informações de Contato */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="text-center hover:shadow-lg transition-base">
                <CardContent className="pt-6">
                  <Phone className="h-12 w-12 mx-auto mb-4 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold mb-2">Telefone</h3>
                  <a href="tel:1151997500" className="text-primary hover:underline">
                    (11) 5199-7500
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-base">
                <CardContent className="pt-6">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <a 
                    href="https://wa.me/551151997500" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    (11) 5199-7500
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-base">
                <CardContent className="pt-6">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold mb-2">E-mail</h3>
                  <a href="mailto:contato@patroseguros.com.br" className="text-primary hover:underline text-sm">
                    contato@patroseguros.com.br
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-base">
                <CardContent className="pt-6">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-primary" aria-hidden="true" />
                  <h3 className="font-semibold mb-2">Horário</h3>
                  <p className="text-sm text-muted-foreground">
                    Seg a Sex: 9h às 18h<br />
                    Sáb: 9h às 13h
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Endereço e Mapa */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-6">
                      <MapPin className="h-8 w-8 text-primary flex-shrink-0" aria-hidden="true" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Nosso Endereço</h3>
                        <p className="text-muted-foreground mb-4">
                          Avenida Salgado Filho, 2120 – Sala 219<br />
                          Guarulhos/SP<br />
                          CEP: 07115-000
                        </p>
                        <a 
                          href="https://maps.google.com/?q=Avenida+Salgado+Filho+2120+Guarulhos+SP" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline">Ver no Google Maps</Button>
                        </a>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold mb-3">Como Chegar</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Próximo ao Aeroporto Internacional de Guarulhos</li>
                        <li>• Fácil acesso pela Rodovia Dutra</li>
                        <li>• Estacionamento no local</li>
                        <li>• Atendimento com hora marcada</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mapa */}
              <div>
                <Card className="h-full">
                  <CardContent className="p-0 h-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.8547956844783!2d-46.44936132378558!3d-23.44622945767449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8f1f8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sAv.%20Salgado%20Filho%2C%202120%20-%20Guarulhos%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: "400px", borderRadius: "0.75rem" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localização Patro Seguros"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6">Prefere Falar Agora?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para atender você via WhatsApp ou telefone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/551151997500" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="cta" className="w-full sm:w-auto text-lg px-8">
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Chamar no WhatsApp
                </Button>
              </a>
              <a href="tel:1151997500" className="w-full sm:w-auto">
                <Button size="lg" variant="default" className="w-full sm:w-auto text-lg px-8">
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  Ligar Agora
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-12">Perguntas Frequentes sobre Atendimento</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Preciso agendar para ser atendido?</h3>
                <p className="text-muted-foreground">
                  Não é obrigatório, mas recomendamos agendar para garantir atendimento personalizado e sem espera. 
                  Entre em contato pelo WhatsApp para agendar.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Atendem fora do horário comercial?</h3>
                <p className="text-muted-foreground">
                  Para emergências e sinistros, temos plantão 24h. Para cotações e dúvidas gerais, atendemos de 
                  segunda a sexta das 9h às 18h e sábados das 9h às 13h.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Posso ser atendido online?</h3>
                <p className="text-muted-foreground">
                  Sim! Grande parte do nosso atendimento é feito por WhatsApp, e-mail e videochamada. Você não precisa 
                  vir até o escritório se não quiser.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Quanto tempo demora para receber resposta?</h3>
                <p className="text-muted-foreground">
                  Respondemos em até 2 horas úteis para todas as solicitações. Cotações completas são entregues no 
                  mesmo dia ou em até 24h para casos mais complexos.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contato;
