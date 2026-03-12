import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle } from "lucide-react";

const tiposSeguros = [
  "Seguro Auto", "Seguro Moto", "Seguro Vida", "Seguro Residencial",
  "Seguro Empresarial", "Seguro Saúde", "Plano de Saúde", "Seguro Viagem",
  "Seguro Frota", "Previdência Privada", "Outro",
];

const IndiqueAmigo = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nomeCliente: "", telefoneCliente: "",
    nomeIndicado: "", telefoneIndicado: "",
    tipoSeguro: "", mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Indicação via site:\n\nCliente: ${formData.nomeCliente}\nTel: ${formData.telefoneCliente}\n\nIndicado: ${formData.nomeIndicado}\nTel: ${formData.telefoneIndicado}\nSeguro: ${formData.tipoSeguro}\nMensagem: ${formData.mensagem}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/551151997500?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center max-w-lg">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-4">Obrigado pela Indicação!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Recebemos sua indicação e entraremos em contato com a pessoa indicada. Quando a contratação for realizada, você receberá benefícios exclusivos!
            </p>
            <Button onClick={() => setSubmitted(false)}>Fazer Outra Indicação</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="mb-4">Indique um Amigo</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Indique uma pessoa e receba benefícios exclusivos quando a contratação for realizada.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nomeCliente">Seu Nome</Label>
                <Input id="nomeCliente" required value={formData.nomeCliente} onChange={(e) => setFormData({ ...formData, nomeCliente: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefoneCliente">Seu Telefone</Label>
                <Input id="telefoneCliente" required value={formData.telefoneCliente} onChange={(e) => setFormData({ ...formData, telefoneCliente: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomeIndicado">Nome do Indicado</Label>
                <Input id="nomeIndicado" required value={formData.nomeIndicado} onChange={(e) => setFormData({ ...formData, nomeIndicado: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefoneIndicado">Telefone do Indicado</Label>
                <Input id="telefoneIndicado" required value={formData.telefoneIndicado} onChange={(e) => setFormData({ ...formData, telefoneIndicado: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Seguro</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, tipoSeguro: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {tiposSeguros.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mensagem">Mensagem (opcional)</Label>
                <Textarea id="mensagem" value={formData.mensagem} onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })} />
              </div>
              <Button type="submit" size="lg" className="w-full">Enviar Indicação</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default IndiqueAmigo;
