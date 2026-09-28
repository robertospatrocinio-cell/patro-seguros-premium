import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Phone, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EMPRESA, TELEFONE_DIGITS, WHATSAPP_URL_BASE } from "@/config/empresa";
import { safeInvoke } from "@/lib/supabase-helpers";
import { escapeHtml } from "@/lib/utils";
import { trackWhatsAppClick } from "@/lib/tracking";

export interface AppSection {
  id: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  cards?: { title: string; text: string }[];
  table?: { head: string[]; rows: string[][] };
  cta?: { label: string; to: string };
}

export interface AppPageData {
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroTitle: string;
  heroText: string;
  heroImage: string;
  heroAlt: string;
  whatsappMessage: string;
  sections: AppSection[];
  steps?: string[];
  faqs: { question: string; answer: string }[];
  finalTitle: string;
  finalText: string;
  related: { label: string; to: string }[];
}

const FORM_ID = "cotacao-app";

const AppQuoteForm = ({ pageTitle }: { pageTitle: string }) => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (v.telefone.replace(/\D/g, "").length < 10) {
      setError("Informe um telefone com DDD.");
      return;
    }
    setError(null);
    setSending(true);
    const fields: [string, string][] = [
      ["Nome", v.nome],
      ["Telefone", v.telefone],
      ["E-mail", v.email],
      ["Cidade/UF", v.cidade],
      ["Tipo de veículo", v.veiculo],
      ["Quantidade de passageiros", v.passageiros],
      ["Finalidade de uso", v.finalidade],
      ["Mensagem", v.mensagem || "—"],
      ["Página", pageTitle],
    ];
    const htmlBody = `<h2>Nova solicitação — Seguro APP</h2><table>${fields
      .map(([k, val]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(val)}</td></tr>`)
      .join("")}</table>`;
    const textBody = fields.map(([k, val]) => `${k}: ${val}`).join("\n");
    const { error: err } = await safeInvoke("send-form-email", {
      subject: `Cotação Seguro APP — ${v.nome}`,
      textBody,
      htmlBody,
    });
    setSending(false);
    if (err) {
      setError("Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.");
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="rounded-xl border border-border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold text-foreground">Solicitação enviada!</h3>
        <p className="mt-2 text-muted-foreground">
          Recebemos seus dados. Um corretor da Patro Seguros entrará em contato pelo telefone ou e-mail informado.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border border-border bg-card p-6 sm:grid-cols-2">
      <div className="space-y-1.5"><Label htmlFor="app-nome">Nome</Label><Input id="app-nome" name="nome" required maxLength={100} autoComplete="name" /></div>
      <div className="space-y-1.5"><Label htmlFor="app-tel">Telefone / WhatsApp</Label><Input id="app-tel" name="telefone" type="tel" required maxLength={20} autoComplete="tel" placeholder="(11) 90000-0000" /></div>
      <div className="space-y-1.5"><Label htmlFor="app-email">E-mail</Label><Input id="app-email" name="email" type="email" required maxLength={255} autoComplete="email" /></div>
      <div className="space-y-1.5"><Label htmlFor="app-cidade">Cidade/UF</Label><Input id="app-cidade" name="cidade" required maxLength={80} placeholder="Guarulhos/SP" /></div>
      <div className="space-y-1.5">
        <Label htmlFor="app-veiculo">Tipo de veículo</Label>
        <select id="app-veiculo" name="veiculo" required defaultValue="" className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
          <option value="" disabled>Selecione</option>
          {["Carro particular", "Carro de aplicativo", "Táxi", "Carro executivo", "Van", "Micro-ônibus", "Ônibus", "Frota (vários veículos)"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="space-y-1.5"><Label htmlFor="app-pass">Quantidade de passageiros</Label><Input id="app-pass" name="passageiros" type="number" min={1} max={999} required /></div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="app-fin">Finalidade de uso</Label>
        <select id="app-fin" name="finalidade" required defaultValue="" className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
          <option value="" disabled>Selecione</option>
          {["Uso particular", "Transporte por aplicativo", "Táxi", "Transporte executivo", "Fretamento / turismo", "Transporte coletivo", "Frota empresarial"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="app-msg">Mensagem (opcional)</Label><Textarea id="app-msg" name="mensagem" maxLength={1000} rows={3} /></div>
      {error && <p role="alert" className="text-sm text-destructive sm:col-span-2">{error}</p>}
      <Button type="submit" size="lg" disabled={sending} className="sm:col-span-2">
        {sending ? "Enviando..." : "Solicitar cotação"}
      </Button>
      <p className="text-xs text-muted-foreground sm:col-span-2">
        Seus dados são usados apenas para retornar sua solicitação, conforme nossa <Link to="/politica-privacidade" className="underline">Política de Privacidade</Link>.
      </p>
    </form>
  );
};

const AppPassageirosPage = ({ data }: { data: AppPageData }) => {
  const waUrl = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(data.whatsappMessage)}`;
  const onWa = () => trackWhatsAppClick?.(data.path);

  const Ctas = ({ waLabel = "Falar com um corretor no WhatsApp" }: { waLabel?: string }) => (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button asChild size="lg"><a href={`#${FORM_ID}`}>Solicitar cotação</a></Button>
      <Button asChild size="lg" variant="outline">
        <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={onWa}>
          <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />{waLabel}
        </a>
      </Button>
    </div>
  );

  return (
    <>
      <PageMeta title={data.metaTitle} description={data.metaDescription} absoluteTitle ogImageAlt={data.heroAlt} />
      <FAQSchema faqs={data.faqs} />
      <Header />
      <main className="bg-background">
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:underline">Início</Link> ›{" "}
          {data.path !== "/seguro-acidentes-pessoais-passageiros" && (
            <><Link to="/seguro-acidentes-pessoais-passageiros" className="hover:underline">Seguro APP</Link> ›{" "}</>
          )}
          <span aria-current="page">{data.h1}</span>
        </nav>

        <section className="container mx-auto grid items-center gap-8 px-4 py-10 lg:grid-cols-2">
          <div className="space-y-5">
            <h1 className="text-3xl font-bold text-primary md:text-4xl">{data.h1}</h1>
            <p className="text-xl font-semibold text-foreground">{data.heroTitle}</p>
            <p className="text-lg text-muted-foreground">{data.heroText}</p>
            <Ctas />
            <a href={`tel:+55${TELEFONE_DIGITS}`} className="inline-flex items-center gap-2 font-semibold text-foreground">
              <Phone className="h-5 w-5 text-primary" aria-hidden="true" /> Telefone e WhatsApp: {EMPRESA.telefone}
            </a>
          </div>
          <img src={data.heroImage} alt={data.heroAlt} width={720} height={480} fetchpriority="high" className="h-auto w-full rounded-2xl object-cover shadow-lg" />
        </section>

        {data.sections.map((s, i) => (
          <section key={s.id} id={s.id} className={i % 2 === 0 ? "bg-muted/40 py-12" : "py-12"}>
            <div className="container mx-auto space-y-5 px-4">
              <h2 className="text-2xl font-bold text-primary md:text-3xl">{s.title}</h2>
              {s.intro && <p className="max-w-3xl text-muted-foreground">{s.intro}</p>}
              {s.paragraphs?.map((p) => <p key={p} className="max-w-3xl text-foreground">{p}</p>)}
              {s.cards && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {s.cards.map((c) => (
                    <div key={c.title} className="rounded-xl border border-border bg-card p-5">
                      <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
                      <h3 className="mt-3 font-semibold text-foreground">{c.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {s.table && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] border-collapse text-sm">
                    <thead><tr>{s.table.head.map((h) => <th key={h} scope="col" className="border border-border bg-primary p-3 text-left text-primary-foreground">{h}</th>)}</tr></thead>
                    <tbody>{s.table.rows.map((r) => <tr key={r[0]}>{r.map((c, j) => j === 0 ? <th key={j} scope="row" className="border border-border bg-card p-3 text-left font-semibold">{c}</th> : <td key={j} className="border border-border bg-card p-3">{c}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              )}
              {s.cta && (
                <Button asChild size="lg"><Link to={s.cta.to}>{s.cta.label} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></Button>
              )}
            </div>
          </section>
        ))}

        {data.steps && (
          <section id="como-contratar" className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-primary md:text-3xl">Como contratar</h2>
              <ol className="mt-6 grid gap-4 md:grid-cols-4">
                {data.steps.map((st, i) => (
                  <li key={st} className="rounded-xl border border-border bg-card p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">{i + 1}</span>
                    <p className="mt-3 text-foreground">{st}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-muted-foreground">A Patro Seguros trabalha com múltiplas seguradoras e oferece atendimento consultivo, do primeiro contato ao pós-venda.</p>
              <div className="mt-6"><Ctas /></div>
            </div>
          </section>
        )}

        <section id={FORM_ID} className="scroll-mt-24 bg-muted/40 py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-bold text-primary md:text-3xl">Solicite sua cotação</h2>
            <p className="mb-6 mt-2 text-muted-foreground">Preencha os dados e um corretor retorna com as opções disponíveis para o seu perfil.</p>
            <AppQuoteForm pageTitle={data.h1} />
          </div>
        </section>

        <section id="perguntas-frequentes" className="py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-bold text-primary md:text-3xl">Perguntas frequentes</h2>
            <Accordion type="single" collapsible className="mt-6">
              {data.faqs.map((f, i) => (
                <AccordionItem key={f.question} value={`f${i}`}>
                  <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                  <AccordionContent>{f.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8"><Ctas /></div>
          </div>
        </section>

        <section className="bg-primary py-12 text-primary-foreground">
          <div className="container mx-auto space-y-4 px-4 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">{data.finalTitle}</h2>
            <p className="mx-auto max-w-2xl opacity-90">{data.finalText}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary"><a href={`#${FORM_ID}`}>Solicitar cotação</a></Button>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={onWa}>Falar pelo WhatsApp</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-primary">Páginas relacionadas</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {data.related.map((r) => (
                <li key={r.to}><Link to={r.to} className="inline-block rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">{r.label}</Link></li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onWa}
        className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-full bg-accent py-3 font-bold text-accent-foreground shadow-lg md:hidden"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" /> Cotar pelo WhatsApp
      </a>
      <Footer />
    </>
  );
};

export default AppPassageirosPage;
