import { useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import ExternalLink from "@/components/ExternalLink";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, CheckCircle2, Download, MessageCircle, Lightbulb, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { materiais } from "@/data/materiaisData";
import { materiaisConteudo } from "@/data/materiaisConteudoData";
import InteractiveChecklist from "@/components/InteractiveChecklist";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { submitLead } from "@/lib/leadsApi";
import { trackCotacaoSubmit } from "@/lib/tracking";

const schema = z.object({
  full_name: z.string().trim().min(2, "Informe seu nome").max(120),
  email: z.string().trim().email("E-mail inválido").max(160),
  phone: z
    .string()
    .trim()
    .min(10, "Telefone inválido")
    .max(20)
    .regex(/^[0-9()\-\s+]+$/, "Telefone inválido"),
  consent: z.literal(true, { errorMap: () => ({ message: "Aceite para receber o material" }) }),
});

type FormValues = z.infer<typeof schema>;

const MaterialDetalhePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const material = useMemo(() => materiais.find((m) => m.slug === slug), [slug]);
  const conteudo = slug ? materiaisConteudo[slug] : undefined;
  const [sent, setSent] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { full_name: "", email: "", phone: "", consent: false as unknown as true },
  });

  if (!material || !conteudo) return <Navigate to="/materiais-gratuitos-seguros" replace />;

  const url = `${CANONICAL_BASE_URL}${material.href}`;
  const totalChecklistItems = conteudo.checklist.reduce((acc, s) => acc + s.items.length, 0);

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: material.title,
    description: material.description,
    inLanguage: "pt-BR",
    totalTime: "PT10M",
    url,
    step: conteudo.checklist.map((s, i) => ({
      "@type": "HowToSection",
      position: i + 1,
      name: s.title,
      itemListElement: s.items.map((it, j) => ({
        "@type": "HowToStep",
        position: j + 1,
        name: it,
      })),
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: conteudo.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${CANONICAL_BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Materiais Gratuitos", item: `${CANONICAL_BASE_URL}/materiais-gratuitos-seguros` },
      { "@type": "ListItem", position: 3, name: material.title, item: url },
    ],
  };

  const onSubmit = async (values: FormValues) => {
    const { error } = await submitLead({
      full_name: values.full_name,
      email: values.email,
      phone: values.phone,
      insurance_type: material.category,
      source_page: material.href,
      raw_data: { material_slug: material.slug, material_title: material.title },
    });
    if (error) {
      toast.error("Não foi possível enviar. Tente novamente.");
      return;
    }
    trackCotacaoSubmit(material.category, { origin: `material:${material.slug}` });
    setSent(true);
    toast.success("Material enviado! Confira seu WhatsApp e e-mail.");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={`${material.title} | Material Gratuito Patro Seguros`}
        description={material.description}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Breadcrumb visual */}
      <div className="container mx-auto px-4 max-w-6xl pt-6 text-sm text-muted-foreground">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-primary">Início</Link></li>
            <li aria-hidden>/</li>
            <li><Link to="/materiais-gratuitos-seguros" className="hover:text-primary">Materiais Gratuitos</Link></li>
            <li aria-hidden>/</li>
            <li className="text-foreground">{material.title}</li>
          </ol>
        </nav>
      </div>

      {/* Hero + Form */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-6xl grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
          <div>
            <Badge variant="secondary" className="mb-4">{material.category} · Material Gratuito</Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{material.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{conteudo.intro}</p>
            <ul className="space-y-2 mb-6">
              {conteudo.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="default">
                <ExternalLink href={material.whatsapp}>
                  <MessageCircle className="h-4 w-4 mr-2" /> Falar no WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to={material.relatedHref}>
                  {material.relatedLabel} <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Lead form */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" /> Receber o material
              </CardTitle>
              <CardDescription>
                {totalChecklistItems} itens práticos + resumo por WhatsApp.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sent ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
                  <p className="font-medium">Material enviado com sucesso!</p>
                  <p className="text-sm text-muted-foreground">
                    Nossa equipe entra em contato pelo WhatsApp em minutos.
                  </p>
                  <Button asChild className="w-full">
                    <ExternalLink href={material.whatsapp}>
                      <MessageCircle className="h-4 w-4 mr-2" /> Acelerar pelo WhatsApp
                    </a>
                  </Button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="full_name">Nome completo</Label>
                    <Input id="full_name" {...form.register("full_name")} placeholder="Seu nome" />
                    {form.formState.errors.full_name && (
                      <p className="text-xs text-destructive">{form.formState.errors.full_name.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" {...form.register("email")} placeholder="voce@email.com" />
                    {form.formState.errors.email && (
                      <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">WhatsApp</Label>
                    <Input id="phone" {...form.register("phone")} placeholder="(11) 99999-9999" />
                    {form.formState.errors.phone && (
                      <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="consent"
                      checked={!!form.watch("consent")}
                      onCheckedChange={(v) => form.setValue("consent", v === true ? (true as unknown as true) : (false as unknown as true), { shouldValidate: true })}
                    />
                    <Label htmlFor="consent" className="text-xs text-muted-foreground leading-snug">
                      Autorizo o contato da Patro Seguros pelos dados informados (LGPD).
                    </Label>
                  </div>
                  {form.formState.errors.consent && (
                    <p className="text-xs text-destructive">{form.formState.errors.consent.message}</p>
                  )}
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Enviando..." : "Receber material gratuito"}
                  </Button>
                  <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Seus dados protegidos pela LGPD.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">O que você recebe neste checklist</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Marque cada item conforme avança. O progresso fica salvo neste navegador. Use "Imprimir / PDF" para levar o checklist com você.
          </p>
          <InteractiveChecklist slug={material.slug} title={material.title} sections={conteudo.checklist} />
        </div>
      </section>

      {/* Dicas */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" /> Dicas da Patro Seguros
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {conteudo.tips.map((tip, i) => (
              <Card key={i} className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 text-sm">{tip}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Perguntas frequentes</h2>
          <Accordion type="single" collapsible className="w-full">
            {conteudo.faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-14 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{conteudo.ctaHeadline}</h2>
          <p className="mb-6 text-primary-foreground/85">{conteudo.ctaSubline}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <ExternalLink href={material.whatsapp}>
                <MessageCircle className="h-5 w-5 mr-2" /> Falar no WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to={material.relatedHref}>
                {material.relatedLabel} <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MaterialDetalhePage;
