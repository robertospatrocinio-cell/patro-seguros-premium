import { MapPin, Navigation, MessageCircle, Calendar, Clock, Info } from "lucide-react";
import LazyMapEmbed from "@/components/LazyMapEmbed";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EMPRESA, GOOGLE_MAPS_URL, NAP_LINHA_1, NAP_LINHA_2 } from "@/config/empresa";
import { trackWhatsAppClick } from "@/lib/tracking";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface ContactMapSectionProps {
  className?: string;
}

const ContactMapSection = ({ className }: ContactMapSectionProps) => {
  const { endereco, horario } = EMPRESA;
  const fullAddress = `${NAP_LINHA_1} — ${NAP_LINHA_2}`;
  const addressQuery = encodeURIComponent(fullAddress);
  const googleMapsUrl = GOOGLE_MAPS_URL;
  const wazeUrl = `https://waze.com/ul?q=${addressQuery}`;
  // Busca pelo endereço cadastrado; não é uma incorporação autenticada do perfil.
  const mapEmbedUrl = `https://www.google.com/maps?q=${addressQuery}&output=embed`;
  
  const handleWazeClick = () => {
    window.gtag?.("event", "clique_waze", {
      event_category: "local_seo",
      event_label: "Como chegar Waze"
    });
  };

  const handleMapsClick = () => {
    window.gtag?.("event", "clique_google_maps", {
      event_category: "local_seo",
      event_label: "Ver no Google Maps"
    });
  };

  return (
    <section className={`py-16 ${className}`} id="como-chegar">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Informações à Esquerda */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/5 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-2 uppercase tracking-wider">
                <MapPin className="h-3.5 w-3.5" /> Presença Física em Guarulhos
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                Como chegar à Patro Seguros
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Consulte abaixo o endereço cadastrado da Patro Seguros em <strong>{endereco.cidade}</strong>. Antes de se deslocar, confirme com a equipe a disponibilidade de atendimento presencial e as orientações de acesso ao edifício.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg h-fit">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-primary mb-1">Endereço</h3>
                      <p className="text-sm text-muted-foreground leading-snug">
                        {fullAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg h-fit">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-primary mb-1">Horário</h3>
                      <p className="text-sm text-muted-foreground">
                        {horario}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg h-fit">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-primary mb-1">Informações</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Confirme a disponibilidade antes da visita</li>
                        <li>• Consulte condições de acesso e estacionamento</li>
                        <li>• Atendimento no horário informado acima</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <a 
                  href={googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleMapsClick}
                >
                  <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5 transition-all">
                    <Navigation className="h-4 w-4" /> Ver no Google Maps
                  </Button>
                </a>
                
                <a 
                  href={wazeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleWazeClick}
                >
                  <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5 transition-all">
                    <img src="https://v0.dev/icons/waze.svg" alt="" aria-hidden="true" width={16} height={16} loading="lazy" decoding="async" className="h-4 w-4 grayscale opacity-70 group-hover:grayscale-0 transition-all" /> Abrir no Waze
                  </Button>
                </a>

                <a 
                  href={buildWhatsAppUrl({ origem: "contato_como_chegar" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("contato-como-chegar")}
                >
                  <Button variant="cta" className="gap-2">
                    <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
                  </Button>
                </a>
                
                <a 
                  href={buildWhatsAppUrl({ origem: "contato_agendamento", extraLines: ["Gostaria de agendar uma visita presencial no escritório."] })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" className="gap-2">
                    <Calendar className="h-4 w-4" /> Agendar Visita
                  </Button>
                </a>
              </div>
            </div>

            {/* Mapa à Direita */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <Card className="relative overflow-hidden border-none shadow-2xl rounded-2xl">
                <CardContent className="p-0">
                  <LazyMapEmbed
                    src={mapEmbedUrl}
                    title="Busca no mapa pelo endereço cadastrado da Patro Seguros em Guarulhos"
                    height={480}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;
