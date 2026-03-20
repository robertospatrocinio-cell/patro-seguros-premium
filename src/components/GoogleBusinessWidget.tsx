import { Star, MapPin, Clock, Phone, ExternalLink } from "lucide-react";

const GoogleBusinessWidget = () => {
  return (
    <div className="border rounded-xl p-6 bg-background">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Patro Seguros</h3>
          <p className="text-xs text-muted-foreground">Corretora de Seguros</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl font-bold">4.9</span>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">(150+ avaliações)</span>
      </div>

      {/* Info */}
      <div className="space-y-2.5 mb-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Av. Salgado Filho, 2120 – Sala 219, Guarulhos/SP</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-3.5 w-3.5 flex-shrink-0" />
          <a href="tel:1151997500" className="hover:text-primary transition-colors">(11) 5199-7500</a>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Seg–Sex: 9h–18h · Sáb: 9h–13h</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <a
          href="https://g.page/r/patroseguros/review"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted transition-colors"
        >
          <Star className="h-3.5 w-3.5" /> Avaliar no Google
        </a>
        <a
          href="https://maps.google.com/?q=Avenida+Salgado+Filho+2120+Guarulhos+SP"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Ver no Maps
        </a>
      </div>
    </div>
  );
};

export default GoogleBusinessWidget;
