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
import { CheckCircle } from "lucide-react";

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeCliente: "", telefoneCliente: "",
      nomeIndicado: "", telefoneIndicado: "",
      tipoSeguro: "", mensagem: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const text = `Indicação via site:\n\nCliente: ${values.nomeCliente}\nTel: ${values.telefoneCliente}\n\nIndicado: ${values.nomeIndicado}\nTel: ${values.telefoneIndicado}\nSeguro: ${values.tipoSeguro}\nMensagem: ${values.mensagem || "Não informada"}`;
    const encoded = encodeURIComponent(text);
    trackCotacaoSubmit(`indicacao-${values.tipoSeguro}`);
    trackWhatsAppClick("indique-amigo");
    window.open(`https://wa.me/551151997500?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <PageMeta title="Indicação Enviada" description="Obrigado por indicar um amigo para a Patro Seguros!" />
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center max-w-lg">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" aria-hidden="true" />
            <h1 className="mb-4">Obrigado pela Indicação!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Recebemos sua indicação e entraremos em contato com a pessoa indicada. Quando a contratação for realizada, você receberá benefícios exclusivos!
            </p>
            <Button onClick={() => { setSubmitted(false); form.reset(); }}>Fazer Outra Indicação</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PageMeta title="Indique um Amigo" description="Indique um amigo para a Patro Seguros e ganhe benefícios. Programa de indicação com vantagens para quem indica e quem é indicado." />
      <Header />
      <main id="main-content">
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-white mb-4">Indique um Amigo</h1>
            <p className="text-xl text-white/70 mb-4">
              Indique uma pessoa e receba benefícios exclusivos quando a contratação for realizada.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nomeCliente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu Nome *</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu nome completo" {...field} />
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
                      <FormLabel>Seu Telefone *</FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 99999-9999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nomeIndicado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Indicado *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da pessoa indicada" {...field} />
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
                      <FormLabel>Telefone do Indicado *</FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 99999-9999" {...field} />
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
                      <FormLabel>Tipo de Seguro *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
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
                      <FormLabel>Mensagem (opcional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Alguma observação sobre a indicação..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full">Enviar Indicação</Button>
              </form>
            </Form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default IndiqueAmigo;
