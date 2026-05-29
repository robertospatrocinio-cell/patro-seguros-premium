import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ricardo Silva",
    location: "Vila Augusta",
    text: "Consegui reduzir meu seguro auto em 20% com a Patro. O atendimento via WhatsApp foi muito rápido e prático.",
    rating: 5,
    type: "Seguro Auto"
  },
  {
    name: "Mariana Costa",
    location: "Cidade Maia",
    text: "O seguro residencial deles é excelente. Tive um problema elétrico e a assistência 24h resolveu tudo no mesmo dia.",
    rating: 5,
    type: "Residencial"
  },
  {
    name: "André Santos",
    location: "Cumbica",
    text: "Para quem trabalha com logística aqui em Cumbica, ter uma corretora que entende da região faz toda a diferença.",
    rating: 5,
    type: "Empresarial"
  },
  {
    name: "Juliana Mendes",
    location: "Gopoúva",
    text: "Fiz o plano de saúde da minha família e fui muito bem orientada. Atendimento humano nota 10!",
    rating: 5,
    type: "Saúde"
  }
];

const LocalTestimonials = () => {
  return (
    <section className="py-16 bg-slate-50 overflow-hidden" aria-label="Depoimentos de clientes em Guarulhos">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="section-label">Confiança Local</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-3">
              O que dizem os clientes de <span className="text-primary">Guarulhos</span>
            </h2>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="flex flex-col items-center border-r pr-4 border-slate-100">
              <span className="text-2xl font-black text-foreground">5.0</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" width={46} height={15} className="h-4 w-auto object-contain" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Reviews</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-medium">Baseado em 340+ avaliações reais</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow bg-white group">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex text-yellow-400">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                  <Quote className="w-6 h-6 text-primary/10 group-hover:text-primary/20 transition-colors" />
                </div>
                
                <p className="text-sm text-foreground/80 italic leading-relaxed">
                  "{t.text}"
                </p>
                
                <div className="pt-4 border-t border-slate-50">
                  <p className="font-bold text-sm text-foreground">{t.name}</p>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium mt-0.5">
                    <MapPin className="w-3 h-3 text-primary" />
                    {t.location} • {t.type}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground font-medium">
            Junte-se a mais de 2.500 segurados protegidos pela Patro em Guarulhos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocalTestimonials;