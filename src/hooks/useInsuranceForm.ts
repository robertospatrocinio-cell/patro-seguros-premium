import { useState } from "react";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const useInsuranceForm = (source: string) => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitToWhatsApp = (whatsappMessage?: string) => {
    trackWhatsAppClick(`${source}-form-submit`);
    const defaultMsg = `Olá! Meu nome é ${formData.name}. Gostaria de uma cotação.\nE-mail: ${formData.email}\nTelefone: ${formData.phone}\n${formData.message ? `Mensagem: ${formData.message}` : ""}`;
    const encoded = encodeURIComponent(whatsappMessage || defaultMsg);
    window.open(`https://wa.me/551151997500?text=${encoded}`, "_blank");
  };

  const submitForm = async (e: React.FormEvent, onSuccess?: () => void) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackCotacaoClick(`${source}-form-submit`);
    
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    onSuccess?.();
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    handleChange,
    submitForm,
    submitToWhatsApp
  };
};
