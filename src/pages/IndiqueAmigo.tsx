import { useState, useEffect, useCallback } from "react";
import { trackCotacaoSubmit, trackWhatsAppClick } from "@/lib/tracking";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { debounce } from "lodash";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, ChevronRight, ChevronLeft, Save, User as UserIcon, Users, Send, RotateCcw, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { usePersistentForm } from "@/hooks/usePersistentForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";


const tiposSeguros = [
  "Seguro Auto", "Seguro Moto", "Seguro Vida", "Seguro Residencial",
  "Seguro Empresarial", "Seguro Saúde", "Plano de Saúde", "Seguro Viagem",
  "Seguro Frota", "Previdência Privada", "Outro",
];

const formSchema = z.object({
  nomeCliente: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
  telefoneCliente: z.string().trim().min(10, "Telefone inválido").max(15, "Telefone inválido"),
  nomeIndicado: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").max(100, "Nome muito longo"),
  telefoneIndicado: z.string().trim().min(10, "Telefone inválido").max(15, "Telefone inválido"),
  tipoSeguro: z.string().min(1, "Selecione um tipo de seguro"),
  mensagem: z.string().trim().max(500, "Mensagem muito longa").optional().default(""),
});

const IndiqueAmigo = () => {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = usePersistentForm<number>("indique-amigo-step", 1);
  const [savedData, setSavedData, clearSavedData] = usePersistentForm<Partial<z.infer<typeof formSchema>>>("indique-amigo-data", {});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeCliente: savedData.nomeCliente || "", 
      telefoneCliente: savedData.telefoneCliente || "",
      nomeIndicado: savedData.nomeIndicado || "", 
      telefoneIndicado: savedData.telefoneIndicado || "",
      tipoSeguro: savedData.tipoSeguro || "", 
      mensagem: savedData.mensagem || "",
    },
  });

  // Persist form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      setSavedData(value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setSavedData]);

  const nextStep = async () => {
    const fields: (keyof z.infer<typeof formSchema>)[] = step === 1 
      ? ["nomeCliente", "telefoneCliente"] 
      : ["nomeIndicado", "telefoneIndicado", "tipoSeguro"];
      
    const isValid = await form.trigger(fields);
    if (isValid && step < 2) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const text = `Indicação via site:\n\nCliente: ${values.nomeCliente}\nTel: ${values.telefoneCliente}\n\nIndicado: ${values.nomeIndicado}\nTel: ${values.telefoneIndicado}\nSeguro: ${values.tipoSeguro}\nMensagem: ${values.mensagem || "Não informada"}`;
    const encoded = encodeURIComponent(text);
    trackCotacaoSubmit(`indicacao-${values.tipoSeguro}`);
    trackWhatsAppClick("indique-amigo");
    window.open(`https://wa.me/551151997500?text=${encoded}`, "_blank");
    setSubmitted(true);
    clearSavedData();
    localStorage.removeItem("indique-amigo-step");
  };

  if (submitted) {
    return (
      <>
        <PageMeta title="Indicação Enviada" description="Obrigado por indicar um amigo para a Patro Seguros!" />
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center max-w-lg">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" aria-hidden="true" />
            <h1 className="text-3xl font-bold mb-4">Obrigado pela Indicação!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Recebemos sua indicação e entraremos em contato com a pessoa indicada. Quando a contratação for realizada, você receberá benefícios exclusivos!
            </p>
            <Button onClick={() => { setSubmitted(false); form.reset(); setStep(1); }}>Fazer Outra Indicação</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const progress = (step / 2) * 100;

  return (
    <>
      <PageMeta title="Indique um Amigo | Patro Seguros" description="Indique um amigo para a Patro Seguros e ganhe benefícios. Programa de indicação com vantagens para quem indica e quem é indicado." />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none min-h-screen bg-slate-50/30">
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-white mb-4 text-4xl md:text-5xl font-bold">Indique um Amigo</h1>
            <p className="text-xl text-white/70 mb-4">
              Indique uma pessoa e receba benefícios exclusivos quando a contratação for realizada.
            </p>
          </div>
        </section>

        <section className="py-16 -mt-10">
          <div className="container mx-auto px-4 max-w-xl">
            <div className="bg-card border rounded-3xl p-6 md:p-10 shadow-xl shadow-primary/5">
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs font-bold text-primary uppercase tracking-widest mb-2">
                  <span>Etapa {step} de 2</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-primary/10" />
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {step === 1 ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <h2 className="text-xl font-bold flex items-center gap-3">
                        <UserIcon className="w-5 h-5 text-primary" />
                        Seus Dados
                      </h2>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="nomeCliente"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold">Seu Nome Completo *</FormLabel>
                              <FormControl>
                                <Input placeholder="Digite seu nome completo" className="h-11" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="telefoneCliente"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold">Seu WhatsApp *</FormLabel>
                              <FormControl>
                                <Input placeholder="(11) 99999-9999" className="h-11" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <h2 className="text-xl font-bold flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        Dados do Indicado
                      </h2>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="nomeIndicado"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold">Nome de Quem Você Indica *</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome da pessoa indicada" className="h-11" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="telefoneIndicado"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold">WhatsApp de Quem Você Indica *</FormLabel>
                              <FormControl>
                                <Input placeholder="(11) 99999-9999" className="h-11" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="tipoSeguro"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold">Qual Seguro Ele(a) Precisa? *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11">
                                    <SelectValue placeholder="Selecione o tipo de seguro" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {tiposSeguros.map((t) => (
                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="mensagem"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold">Mensagem Opcional</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Alguma observação importante..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                    {step > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevStep} 
                        className="h-12 order-2 sm:order-1 flex-1 font-semibold"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                      </Button>
                    )}
                    
                    <Button 
                      type="button" 
                      onClick={step < 2 ? nextStep : form.handleSubmit(onSubmit)}
                      className={`h-12 font-bold text-base flex-[2] order-1 sm:order-2 ${step === 1 ? "w-full" : ""}`}
                    >
                      {step < 2 ? (
                        <>Próximo Passo <ChevronRight className="ml-2 h-4 w-4" /></>
                      ) : (
                        <><Send className="mr-2 h-4 w-4" /> Enviar Indicação</>
                      )}
                    </Button>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <p className="text-[10px] text-muted-foreground text-center flex items-center gap-1.5 font-medium">
                      <Save className="h-3 w-3 text-primary" />
                      Progresso salvo automaticamente · Atendimento humano e seguro
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default IndiqueAmigo;
