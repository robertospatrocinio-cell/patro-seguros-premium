import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, User, ShieldCheck, ArrowRight } from "lucide-react";

export const QuickLeadForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    insuranceType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { toast } = await import("sonner");
    if (!formData.name || !formData.phone || !formData.insuranceType) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Recebemos seu contato! Um consultor ligará em breve.");
    
    // Redirect to full quote or WhatsApp for better UX
    const msg = encodeURIComponent(`Olá, meu nome é ${formData.name}. Sou de Guarulhos e gostaria de uma cotação de ${formData.insuranceType}.`);
    window.open(`https://wa.me/551151997500?text=${msg}`, "_blank");
    
    setFormData({ name: "", phone: "", insuranceType: "" });
    setLoading(false);
  };

  const whatsappMessage = `Olá, meu nome é ${formData.name || '...'}. Sou de Guarulhos e gostaria de uma cotação de ${formData.insuranceType || '...'}.`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 -mt-12 relative z-20">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="text-center md:text-left shrink-0 md:max-w-[240px]">
            <h2 className="text-xl font-bold text-slate-900 leading-tight">Cotação Express</h2>
            <p className="text-sm text-slate-500 mt-1">Receba propostas em até 2 horas via WhatsApp.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Seu Nome"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="WhatsApp (DDD)"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            
            <div className="relative">
              <Select 
                value={formData.insuranceType} 
                onValueChange={(v) => setFormData({ ...formData, insuranceType: v })}
              >
                <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl pl-10 relative">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
                  <SelectValue placeholder="Tipo de Seguro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Auto">Seguro Auto</SelectItem>
                  <SelectItem value="Uber">Seguro Uber / APP</SelectItem>
                  <SelectItem value="Saude">Plano de Saúde</SelectItem>
                  <SelectItem value="Vida">Seguro de Vida</SelectItem>
                  <SelectItem value="Residencial">Seguro Residencial</SelectItem>
                  <SelectItem value="Empresarial">Seguro Empresa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col gap-2 md:col-span-3 lg:col-span-1">
              <Button 
                type="submit" 
                disabled={loading}
                className="h-12 w-full font-bold text-base bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg shadow-green-500/20 rounded-xl"
              >
                {loading ? "Enviando..." : (
                  <span className="flex items-center gap-2">
                    Receber Cotação em 2 Horas <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
              
              <div className="bg-slate-50 border border-slate-100 p-2 rounded-lg">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 px-1">Prévia da Mensagem:</p>
                <p className="text-[11px] text-slate-600 italic leading-tight px-1 line-clamp-2">
                  "{whatsappMessage}"
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};