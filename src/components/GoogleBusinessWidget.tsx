import { Star, MapPin, Clock, Phone, ExternalLink, MessageSquare } from "lucide-react";

const googleReviews = [
  { name: "Marcos L.", text: "Atendimento rápido e personalizado. Conseguiram o melhor preço para meu seguro auto.", stars: 5 },
  { name: "Carla P.", text: "Equipe muito atenciosa. Me ajudaram com o sinistro do começo ao fim, sem burocracia.", stars: 5 },
  { name: "Eduardo S.", text: "Profissionais de confiança. Já renovo meu seguro empresarial há 3 anos com eles.", stars: 5 },
];

const GoogleBusinessWidget = () => {
  return (
    <div className="border rounded-2xl p-6 md:p-8 bg-background shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold">Patro Seguros</h3>
            <p className="text-xs text-muted-foreground">Corretora de Seguros · Guarulhos</p>
          </div>
        </div>
        <a
          href="https://www.google.com/maps/place/Patro+Seguros/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver perfil no Google"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" fill="currentColor" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        </a>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b">
        <span className="text-4xl font-bold text-foreground">4.9</span>
        <div>
          <div className="flex gap-0.5 mb-1">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">150+ avaliações no Google</p>
        </div>
      </div>

      {/* Sample Reviews */}
      <div className="space-y-4 mb-6">
        {googleReviews.map((review, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-xs font-bold text-muted-foreground">
              {review.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-xs font-semibold">{review.name}</p>
                <div className="flex gap-px">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <Star key={j} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{review.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="space-y-2 mb-6 pb-6 border-t pt-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          <span>Av. Salgado Filho, 2120 – Ed. Via Alameda – Sala 219 – Jardim Maia, Guarulhos/SP</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          <a href="tel:1151997500" className="hover:text-primary transition-colors">(11) 5199-7500</a>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          <span>Seg–Sex: 9h–18h · Sáb: 9h–13h</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <a
          href="https://g.page/r/patroseguros/review"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-xs font-semibold hover:bg-primary-hover transition-base"
        >
          <MessageSquare className="h-3.5 w-3.5" /> Deixar Avaliação
        </a>
        <a
          href="https://maps.google.com/?q=Avenida+Salgado+Filho+2120+Guarulhos+SP"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-medium hover:bg-muted transition-base"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Ver no Maps
        </a>
      </div>
    </div>
  );
};

export default GoogleBusinessWidget;
