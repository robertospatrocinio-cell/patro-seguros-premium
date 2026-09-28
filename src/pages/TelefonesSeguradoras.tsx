import { useMemo, useState } from "react";
import { Search, Phone, ExternalLink as ExternalLinkIcon, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import ExternalLink from "@/components/ExternalLink";
import { Input } from "@/components/ui/input";
import { INSURER_SUPPORT_CONTACTS } from "@/data/insurerSupportContacts";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const TelefonesSeguradoras = () => {
  const [query, setQuery] = useState("");
  const contacts = useMemo(() => {
    const term = normalize(query.trim());
    if (!term) return INSURER_SUPPORT_CONTACTS;
    return INSURER_SUPPORT_CONTACTS.filter((contact) => normalize(`${contact.insurer} ${contact.service}`).includes(term));
  }, [query]);

  return (
    <>
      <PageMeta title="Telefones e 0800 das Seguradoras | Patro Seguros" description="Consulte telefones oficiais de assistência e sinistro das seguradoras parceiras da Patro Seguros." />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container mx-auto px-4 pt-6"><Breadcrumb items={[{ label: "Telefones das Seguradoras" }]} /></div>
        <section className="py-12 md:py-16 bg-background" aria-labelledby="telefones-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <span className="section-label">Apoio ao segurado</span>
            <h1 id="telefones-heading" className="mt-3 mb-4">Telefones e 0800 das Seguradoras</h1>
            <p className="text-muted-foreground max-w-3xl mb-8">Encontre os canais oficiais de assistência e sinistro. Tenha a apólice em mãos, pois o atendimento e o número correto podem variar conforme o produto contratado.</p>

            <label htmlFor="buscar-seguradora" className="block text-sm font-semibold mb-2">Buscar seguradora</label>
            <div className="relative max-w-xl mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input id="buscar-seguradora" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: Porto, Allianz, HDI" className="pl-10 h-11" />
            </div>

            <div className="grid gap-4 md:grid-cols-2" aria-live="polite">
              {contacts.map((contact) => (
                <article key={contact.insurer} className="premium-card p-6">
                  <h2 className="text-lg font-semibold mb-1">{contact.insurer}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{contact.service} · {contact.hours}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {contact.phones.map((phone) => (
                      <a key={phone} href={`tel:${phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/5">
                        <Phone className="h-4 w-4" aria-hidden="true" /> {phone}
                      </a>
                    ))}
                  </div>
                  <ExternalLink href={contact.sourceUrl} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                    Conferir no site oficial <ExternalLinkIcon className="h-3 w-3" aria-hidden="true" />
                  </ExternalLink>
                </article>
              ))}
            </div>
            {contacts.length === 0 && <p className="rounded-lg border bg-muted p-4 text-sm">Nenhuma seguradora encontrada.</p>}

            <div className="mt-8 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 p-4 text-sm">
              <AlertTriangle className="h-4 w-4 text-accent-foreground mt-0.5 shrink-0" aria-hidden="true" />
              <p>Lista conferida em 23/09/2026. Antes de ligar, confirme o telefone na apólice ou no site oficial da seguradora, pois os canais podem mudar.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TelefonesSeguradoras;