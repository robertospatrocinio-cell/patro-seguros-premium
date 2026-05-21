import { useState } from "react";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Por favor, informe seu nome.");
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error("Por favor, informe um telefone válido.");
      return false;
    }
    return true;
  };

  const submitToWhatsApp = (whatsappMessage?: string) => {
    if (!validateForm()) return;

    trackWhatsAppClick(`${source}-form-submit`);
    const defaultMsg = `Olá! Meu nome é ${formData.name}. Gostaria de uma cotação.\nE-mail: ${formData.email}\nTelefone: ${formData.phone}\n${formData.message ? `Mensagem: ${formData.message}` : ""}`;
    const encoded = encodeURIComponent(whatsappMessage || defaultMsg);
    window.open(`https://wa.me/551151997500?text=${encoded}`, "_blank");
  };

  const submitForm = async (e: React.FormEvent, onSuccess?: () => void) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    trackCotacaoClick(`${source}-form-submit`);
    
    try {
      // Save to Supabase (Leads table)
      const { error } = await supabase.from("leads").insert([
        {
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          raw_data: { message: formData.message },
          source_page: source,
          insurance_type: source,
        },
      ]);

      if (error) throw error;

      toast.success("Solicitação enviada com sucesso!", {
        description: "Nossa equipe entrará em contato em breve.",
      });
      
      onSuccess?.();
    } catch (err: any) {
      console.error("Error submitting form:", err);
      toast.error("Erro ao enviar solicitação", {
        description: "Não foi possível salvar seus dados agora. Tente novamente ou use o WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
