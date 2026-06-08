import { useState, useEffect, Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import { trackCotacaoSubmit, trackWhatsAppClick } from "@/lib/tracking";
 import { escapeHtml } from "@/lib/utils";
 import { safeInvoke, handleSupabaseError } from "@/lib/supabase-helpers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Phone, CheckCircle2, ShieldCheck, Clock, Award } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(10, "Telefone inválido").max(15),
  insuranceType: z.string().min(1, "Selecione um tipo de seguro"),
  message: z.string().trim().max(1000, "Mensagem muito longa"),
});

const Cotacao = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();

  const VALID_TYPES = ["auto","vida","residencial","viagem","saude","empresarial","frota","rc","outros", "planos-de-saude", "agronegocio", "seguro-celular", "seguro-transporte", "seguro-fianca"] as const;
  const tipoParam = (searchParams.get("tipo") || "").toLowerCase();
  
  // Mapeamento de slugs de categoria do blog para valores do select
  const categoryToValue: Record<string, string> = {
    "seguro-auto": "auto",
    "seguro-vida": "vida",
    "seguro-residencial": "residencial",
    "seguro-viagem": "viagem",
    "planos-de-saude": "saude",
    "seguro-empresarial": "empresarial",
    "seguro-frota": "frota",
    "agronegocio": "outros",
    "seguro-transporte": "frota", // ou novo valor se disponível
    "seguro-fianca": "residencial", // ou novo valor
    "rc": "rc"
  };

  const initialType = categoryToValue[tipoParam] || ((VALID_TYPES as readonly string[]).includes(tipoParam) ? tipoParam : "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      insuranceType: initialType,
      message: "",
    },
  });

  // Sync if the query param changes after mount (SPA navigation)
  useEffect(() => {
    if (initialType && form.getValues("insuranceType") !== initialType) {
      form.setValue("insuranceType", initialType, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialType]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Criar mensagem para WhatsApp
    const whatsappMessage = encodeURIComponent(
      `*Nova Solicitação de Cotação*\n\n` +
      `Nome: ${values.name}\n` +
      `E-mail: ${values.email}\n` +
      `Telefone: ${values.phone}\n` +
      `Tipo de Seguro: ${values.insuranceType}\n` +
      `Mensagem: ${values.message || "Não informada"}`
    );
    
    // Enviar email
    const textBody = `Nome: ${values.name}\nE-mail: ${values.email}\nTelefone: ${values.phone}\nTipo de Seguro: ${values.insuranceType}\nMensagem: ${values.message || "Não informada"}`;
    const htmlBody = `<h2>Nova Solicitação de Cotação — ${escapeHtml(values.insuranceType)}</h2><table style="border-collapse:collapse;width:100%"><tr><td style="padding:6px;border:1px solid #ddd"><strong>Nome</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.name)}</td></tr><tr><td style="padding:6px;border:1px solid #ddd"><strong>E-mail</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.email)}</td></tr><tr><td style="padding:6px;border:1px solid #ddd"><strong>Telefone</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.phone)}</td></tr><tr><td style="padding:6px;border:1px solid #ddd"><strong>Tipo de Seguro</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.insuranceType)}</td></tr><tr><td style="padding:6px;border:1px solid #ddd"><strong>Mensagem</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(values.message || "Não informada")}</td></tr></table>`;

    const { error: mailErr } = await safeInvoke("send-form-email", {
      subject: `Nova Cotação — ${values.insuranceType}`,
      textBody,
      htmlBody
    });

     if (mailErr) {
       // Don't use handleSupabaseError here as we want to manage the redirection flow gracefully
       console.error("Email notification error:", mailErr);
       toast.warning("Houve uma instabilidade no sistema de notificações.", {
         description: "Mas não se preocupe, estamos redirecionando você agora para o WhatsApp para garantir seu atendimento.",
         duration: 6000,
       });
     }

    // Redirecionar para WhatsApp
    trackCotacaoSubmit(values.insuranceType, { origin: "formulario-cotacao" });
    trackWhatsAppClick("formulario-cotacao", { origin: "formulario-cotacao", insuranceType: values.insuranceType });
    window.open(`https://wa.me/551151997500?text=${whatsappMessage}`, "_blank");
    
    toast.success("Redirecionando para WhatsApp...", {
      description: "Em instantes você será atendido por um de nossos especialistas!",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Fragment>
      <PageMeta title="Cotação de Seguro em Guarulhos | Patro Seguros" description="Solicite sua cotação de seguro em Guarulhos gratuitamente. Comparamos auto, residencial, vida e empresarial entre as melhores seguradoras do Brasil." />
      <Header />
      <main id="main-content" className="outline-none">
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-white mb-6">Cotação de Seguro em Guarulhos</h1>
              <p className="text-xl text-white/70">
                Preencha o formulário abaixo e receba sua cotação personalizada em até 2 horas
              </p>
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-primary-light p-6 rounded-lg mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2 text-primary">Cotação Gratuita e Sem Compromisso</h2>
                <p className="text-muted-foreground">
                  Analisamos seu perfil e enviamos as melhores opções do mercado
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone/WhatsApp *</FormLabel>
                          <FormControl>
                            <Input placeholder="(11) 99999-9999" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="insuranceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Seguro *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo de seguro" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="auto">Seguro Auto</SelectItem>
                            <SelectItem value="vida">Seguro de Vida</SelectItem>
                            <SelectItem value="residencial">Seguro Residencial</SelectItem>
                            <SelectItem value="viagem">Seguro Viagem</SelectItem>
                            <SelectItem value="saude">Seguro Saúde</SelectItem>
                            <SelectItem value="empresarial">Seguro Empresarial</SelectItem>
                            <SelectItem value="frota">Seguro de Frota</SelectItem>
                            <SelectItem value="rc">Responsabilidade Civil</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem (opcional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Conte-nos um pouco mais sobre o que você precisa..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Solicitar Cotação via WhatsApp"}
                    </Button>
                    <a href="tel:1151997500" className="flex-1">
                      <Button type="button" variant="outline" size="lg" className="w-full">
                        <Phone className="mr-2 h-5 w-5" />
                        Ou Ligue Agora
                      </Button>
                    </a>
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    Ao enviar, você será redirecionado para nosso WhatsApp com suas informações preenchidas.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">Por Que Solicitar Cotação Conosco?</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Resposta Rápida</h3>
                <p className="text-muted-foreground">
                  Retorno em até 2 horas úteis com cotação completa e personalizada
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Melhor Custo-Benefício</h3>
                <p className="text-muted-foreground">
                  Comparamos várias seguradoras para encontrar a melhor opção
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">100% Personalizado</h3>
                <p className="text-muted-foreground">
                  Análise consultiva com recomendações sob medida para você
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Cotacao;
