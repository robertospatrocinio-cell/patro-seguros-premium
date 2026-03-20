import { useState } from "react";
import { trackCotacaoSubmit, trackWhatsAppClick } from "@/lib/tracking";
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
import { Phone } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(10, "Telefone inválido").max(15),
  insuranceType: z.string().min(1, "Selecione um tipo de seguro"),
  message: z.string().trim().max(1000, "Mensagem muito longa"),
});

const Cotacao = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      insuranceType: "",
      message: "",
    },
  });

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
    
    // Redirecionar para WhatsApp
    trackCotacaoSubmit(values.insuranceType);
    trackWhatsAppClick("formulario-cotacao");
    window.open(`https://wa.me/551151997500?text=${whatsappMessage}`, "_blank");
    
    toast.success("Redirecionando para WhatsApp...", {
      description: "Em instantes você será atendido por um de nossos especialistas!",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <>
      <PageMeta title="Cotação de Seguros" description="Solicite uma cotação gratuita de seguros com a Patro Seguros. Comparamos as melhores seguradoras para encontrar o melhor preço e cobertura para você." />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-white mb-6">Solicitar Cotação</h1>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
    </>
  );
};

export default Cotacao;
