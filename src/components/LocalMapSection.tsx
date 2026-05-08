import { MapPin, Navigation, Clock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface RouteInfo {
  neighborhood: string;
  distance: string;
  time: string;
  description: string;
}

interface LocalMapSectionProps {
  routes: RouteInfo[];
  title?: string;
  description?: string;
}

const LocalMapSection = ({ 
  routes, 
  title = "Cobertura e Logística em Guarulhos",
  description = "Nossa localização estratégica permite atendimento rápido e vistorias presenciais nos principais polos industriais e logísticos da região."
}: LocalMapSectionProps) => {
  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">{title}</h2>
          <p className="text-muted-foreground text-lg">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Google Maps Embed */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-elegant h-[450px] bg-white border border-border"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d14637.362140417646!2d-46.54133405!3d-23.44813585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef563a921d003%3A0xf69372225e373a4b!2sPatro%20Seguros!5e0!3m2!1spt-BR!2sbr!4v1714574921932!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Patro Seguros Guarulhos"
              className="grayscale-[0.2] contrast-[1.1]"
            ></iframe>
          </motion.div>

          {/* Route Details */}
          <div className="space-y-4">
            {routes.map((route, index) => (
              <motion.div
                key={route.neighborhood}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white group overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-bold text-xl text-primary">{route.neighborhood}</h3>
                          <div className="flex items-center gap-2 text-xs font-semibold px-2 py-1 bg-accent/10 text-accent rounded-full">
                            <Navigation className="h-3 w-3" />
                            {route.distance}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">
                          {route.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Tempo estimado: {route.time}
                          </div>
                          <div className="flex items-center gap-1 text-green-600">
                            <Shield className="h-3 w-3" />
                            Vistoria Prioritária
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
              <p className="text-sm text-primary font-medium">
                📍 Av. Salgado Filho, 2120 - Vila Rio de Janeiro, Guarulhos - SP
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalMapSection;