import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 right-5 z-50 group transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Falar no WhatsApp"
      onClick={() => trackWhatsAppClick("botao-fixo")}
    >
      <div className="relative bg-[#25D366] text-white rounded-full p-3.5 shadow-xl transition-base group-hover:scale-110 group-hover:shadow-2xl">
        <MessageCircle className="h-6 w-6" strokeWidth={1.8} />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </div>
    </a>
  );
};

export default WhatsAppButton;
