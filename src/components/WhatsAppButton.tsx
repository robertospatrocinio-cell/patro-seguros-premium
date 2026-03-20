import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 group"
      aria-label="Falar no WhatsApp"
      onClick={() => trackWhatsAppClick("botao-fixo")}
    >
      <div className="relative bg-foreground text-white rounded-full p-3.5 shadow-xl transition-base group-hover:scale-105 group-hover:shadow-2xl">
        <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
      </div>
    </a>
  );
};

export default WhatsAppButton;
