import { Link } from "react-router-dom";
import { MessageCircle, MapPin, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { EMPRESA } from "@/config/empresa";
import { trackWhatsAppClick } from "@/lib/tracking";
import {
  ATENDIMENTO_NACIONAL_PATH,
  produtosNacionais,
  regioesNacionais,
  regiaoPath,
  estadosDaRegiao,
  type RegiaoNacional,
} from "@/data/atendimentoNacional";

interface Props {
  /** Sem slug = página nacional; com slug = página da região. */
  regiaoSlug?: string;
}

const waUrl = (msg: string) =>
  `https://wa.me/${EMPRESA.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;

const grupos = ["Agronegócio", "Transporte e frotas", "Empresas e saúde PME", "Pessoas"] as const;

const Produtos = () => (
  <section aria-labelledby="produtos-nacional-heading" className="py-12">
    <div className="container mx-auto px-4 max-w-5xl">
      <h2 id="produtos-nacional-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Seguros com atendimento em todo o Brasil
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {grupos.map((g) => (
          <div key={g} className="rounded-lg border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-3">{g}</h3>
            <ul className="space-y-2">
              {produtosNacionais
                .filter((p) => p.grupo === g)
                .map((p) => (
                  <li key={p.href}>
                    <Link to={p.href} className="text-primary hover:underline inline-flex items-center gap-1">
                      {p.label} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ComoFunciona = () => (
  <section aria-labelledby="como-nacional-heading" className="py-12 bg-muted/40">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 id="como-nacional-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Como funciona o atendimento a distância
      </h2>
      <ol className="grid gap-4 md:grid-cols-3">
        {[
          ["Conversa inicial", "Você explica sua atividade e o que precisa proteger pelo WhatsApp, e-mail ou videochamada."],
          ["Análise e cotação", "Levantamos os dados do risco e comparamos seguradoras parceiras com atuação na sua região."],
          ["Contratação e pós-venda", "Emissão digital da apólice, acompanhamento de renovações e suporte em sinistros."],
        ].map(([t, d], i) => (
          <li key={t} className="rounded-lg border border-border bg-card p-5">
            <p className="text-sm font-semibold text-accent mb-1">Passo {i + 1}</p>
            <h3 className="font-semibold text-foreground mb-2">{t}</h3>
            <p className="text-muted-foreground text-sm">{d}</p>
          </li>
        ))}
      </ol>
      <p className="text-sm text-muted-foreground mt-4">
        A disponibilidade de cada produto e seguradora pode variar conforme o município; confirmamos isso na cotação.
      </p>
    </div>
  </section>
);

const Cta = ({ local, id }: { local: string; id: string }) => (
  <Button asChild size="lg" variant="secondary">
    <a
      href={waUrl(`Olá! Vim pelo site da Patro Seguros e gostaria de uma cotação de seguro para ${local}.`)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(id)}
    >
      <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
      Pedir cotação no WhatsApp
    </a>
  </Button>
);

const Faq = ({ faqs }: { faqs: RegiaoNacional["faqs"] }) => (
  <section aria-labelledby="faq-nacional-heading" className="py-12">
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 id="faq-nacional-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Perguntas frequentes
      </h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.question} className="rounded-lg border border-border bg-card p-4">
            <summary className="font-semibold text-foreground cursor-pointer">{f.question}</summary>
            <p className="text-muted-foreground mt-2">{f.answer}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
    </div>
  </section>
);

const AtendimentoNacional = ({ regiaoSlug }: Props) => {
  const regiao = regiaoSlug ? regioesNacionais.find((r) => r.slug === regiaoSlug) : undefined;

  if (regiao) {
    const outras = regioesNacionais.filter((r) => r.slug !== regiao.slug);
    return (
      <div className="min-h-screen bg-background">
        <PageMeta
          title={`${regiao.titulo} | Agro, Frotas e Empresas | Patro Seguros`}
          description={`${regiao.titulo}: ${regiao.resumo} Atendimento remoto da Patro Seguros com cotação comparando seguradoras.`}
          absoluteTitle
        />
        <Header />
        <Breadcrumb
          items={[
            { label: "Atendimento nacional", href: ATENDIMENTO_NACIONAL_PATH },
            { label: regiao.nome },
          ]}
        />
        <main>
          <section className="bg-primary text-primary-foreground py-14">
            <div className="container mx-auto px-4 max-w-4xl">
              <p className="text-xs font-semibold tracking-widest uppercase opacity-80 mb-3 inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" aria-hidden="true" /> {estadosDaRegiao(regiao.slug).map((e) => e.uf).join(" • ")}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-primary-foreground">{regiao.titulo}</h1>
              {regiao.intro.map((p) => (
                <p key={p.slice(0, 30)} className="opacity-90 mb-3">{p}</p>
              ))}
              <div className="mt-4">
                <Cta local={regiao.nome} id={`atendimento-nacional:${regiao.slug}`} />
              </div>
            </div>
          </section>

          <section aria-labelledby="estados-heading" className="py-12">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 id="estados-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Estados e cidades atendidos
              </h2>
              <p className="text-muted-foreground mb-6">
                Cidades de referência da região. Atendemos também os demais municípios, sempre de forma remota.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {estadosDaRegiao(regiao.slug).map((e) => (
                  <div key={e.uf} className="rounded-lg border border-border bg-card p-5">
                    <h3 className="font-semibold text-foreground mb-2">
                      {e.nome} ({e.uf})
                    </h3>
                    <p className="text-sm text-muted-foreground">{e.cidades.join(", ")}</p>
                  </div>
                ))}
              </div>
              <h3 className="font-semibold text-foreground mt-8 mb-3">Mais procurados na região</h3>
              <ul className="flex flex-wrap gap-2">
                {regiao.destaques.map((d) => (
                  <li key={d} className="rounded-full bg-muted px-3 py-1 text-sm text-foreground">{d}</li>
                ))}
              </ul>
            </div>
          </section>

          <Produtos />
          <ComoFunciona />
          <Faq faqs={regiao.faqs} />

          <section aria-labelledby="outras-regioes-heading" className="py-12 bg-muted/40">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 id="outras-regioes-heading" className="text-2xl font-bold text-foreground mb-4">Outras regiões</h2>
              <ul className="flex flex-wrap gap-3">
                {outras.map((r) => (
                  <li key={r.slug}>
                    <Link to={regiaoPath(r.slug)} className="text-primary hover:underline">{r.titulo}</Link>
                  </li>
                ))}
                <li>
                  <Link to={ATENDIMENTO_NACIONAL_PATH} className="text-primary hover:underline">Atendimento nacional</Link>
                </li>
              </ul>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Seguros em Todo o Brasil | Atendimento Nacional | Patro Seguros"
        description="Corretora com sede em Guarulhos/SP e atendimento remoto em todo o Brasil: seguro rural, drones, frotas, caminhões, empresarial e saúde PME. Cotação comparando seguradoras."
        absoluteTitle
      />
      <Header />
      <Breadcrumb items={[{ label: "Atendimento nacional" }]} />
      <main>
        <section className="bg-primary text-primary-foreground py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs font-semibold tracking-widest uppercase opacity-80 mb-3 inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" /> Sede em Guarulhos/SP • Atendimento em todo o Brasil
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-primary-foreground">Seguros com atendimento em todo o Brasil</h1>
            <p className="opacity-90 mb-3">
              A Patro Seguros é uma corretora com sede em Guarulhos/SP que atende clientes de todas as regiões do país
              de forma remota. Para agronegócio, transporte, empresas e pessoas, fazemos a análise do risco, comparamos
              seguradoras parceiras e acompanhamos a apólice do início ao sinistro.
            </p>
            <p className="opacity-90 mb-3">
              Escolha sua região para ver os estados e cidades de referência e os seguros mais procurados.
            </p>
            <div className="mt-4">
              <Cta local="minha cidade (fora de Guarulhos)" id="atendimento-nacional:hub" />
            </div>
          </div>
        </section>

        <section aria-labelledby="regioes-heading" className="py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="regioes-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Regiões atendidas
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {regioesNacionais.map((r) => (
                <Link
                  key={r.slug}
                  to={regiaoPath(r.slug)}
                  className="group rounded-lg border border-border bg-card p-5 hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary">{r.titulo}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{r.resumo}</p>
                  <p className="text-xs text-muted-foreground">{estadosDaRegiao(r.slug).map((e) => e.uf).join(" • ")}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Produtos />
        <ComoFunciona />
        <Faq faqs={regioesNacionais[0].faqs.map((f) => ({ ...f, question: f.question.replace(" na Região Sul", " fora de Guarulhos") }))} />
      </main>
      <Footer />
    </div>
  );
};

export default AtendimentoNacional;
