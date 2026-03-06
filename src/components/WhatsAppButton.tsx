import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Falar no WhatsApp"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[hsl(142,70%,45%)] blur-lg opacity-40 group-hover:opacity-60 transition-base scale-110" />
        <div className="relative bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white rounded-full p-4 shadow-xl transition-base group-hover:scale-110">
          <MessageCircle className="h-6 w-6" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
