import { Link } from "react-router-dom";
import { MessageCircle, Phone, ArrowRight, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { EMPRESA, NAP_LINHA_1, NAP_LINHA_2 } from "@/config/empresa";
import { trackWhatsAppClick } from "@/lib/tracking";
import { GRANDE_SP_PATH } from "@/data/segurosSaoPauloRegional";
import {
  bairrosGrupoA,
  empresarialBairrosSp,
  residencialBairrosSp,
  EMPRESARIAL_COBERTURAS,
  EMPRESARIAL_PASSOS,
  PERSONALIZAR_APOLICE,
} from "@/data/segurosSaoPauloProdutos";

interface Props {
  /** Chave do bairro (ex.: "vila-olimpia"). */
  bairroKey: string;
}

const SeguroEmpresarialBairroSp = ({ bairroKey }: Props) => {
  const bairro = bairrosGrupoA[bairroKey];
  const data = empresarialBairrosSp[bairroKey];
  if (!bairro || !data) return null;

  const residencial = residencialBairrosSp[bairroKey];

  const whatsappUrl = `https://wa.me/${EMPRESA.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Olá, vim pelo site da Patro Seguros e gostaria de uma análise de seguro empresarial para minha empresa em ${bairro.nome}, São Paulo.`,
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title={data.title} description={data.metaDescription} absoluteTitle />
      <FAQSchema faqs={data.faqs} />
      <Header />
      <Breadcrumb
        items={[
          { label: "Guarulhos e Grande São Paulo", href: GRANDE_SP_PATH },
          { label: bairro.nome, href: `/${bairro.key}` },
          { label: `Seguro empresarial em ${bairro.nome}` },
        ]}
      />

      <main>
        <section className="bg-primary text-primary-foreground py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs font-semibold tracking-widest uppercase opacity-80 mb-3 inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {bairro.nome} • {bairro.regiao}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Seguro Empresarial em {bairro.nome} – São Paulo
            </h1>
            {data.intro.map((p) => (
              <p key={p.slice(0, 30)} className="opacity-90 mb-3">
                {p}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 mt-4">
              <Button asChild size="lg" variant="secondary">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`empresarial-bairro-sp-${bairro.key}`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                  Cotar seguro empresarial
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent">
                <a href={`tel:${EMPRESA.telefoneE164}`}>
                  <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                  {EMPRESA.telefone}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 1 — contexto */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Seguro empresarial em {bairro.nome}</h2>
            <div className="space-y-4 text-muted-foreground">
              {data.contexto.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 2 — quem pode contratar */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Quem pode contratar na região</h2>
            <ul className="grid sm:grid-cols-2 gap-2 text-muted-foreground list-disc pl-5">
              {data.quemContrata.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 — riscos */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Principais riscos empresariais no bairro</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.riscos.map((r) => (
                <div key={r.title} className="rounded-lg border p-5">
                  <h3 className="font-semibold mb-1">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 — coberturas */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-3">Coberturas que podem fazer sentido</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Nenhuma dessas garantias é automática. A apólice é montada conforme a atividade da empresa, e cada
              seguradora tem critérios próprios de aceitação, limites e franquias.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {EMPRESARIAL_COBERTURAS.map((c) => (
                <div key={c.title} className="bg-background rounded-lg border p-5">
                  <h3 className="font-semibold mb-1">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 — PME */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Seguro empresarial para pequenos negócios</h2>
            <div className="space-y-4 text-muted-foreground">
              {data.pme.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 6 — segmentos */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Empresas com necessidades específicas</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.segmentos.map((s) => (
                <div key={s.title} className="bg-background rounded-lg border p-5">
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7 — personalizar */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Por que personalizar a apólice</h2>
            <div className="space-y-3 text-muted-foreground">
              {PERSONALIZAR_APOLICE.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 8 — cotação */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Como funciona a cotação com a Patro</h2>
            <ol className="space-y-4">
              {EMPRESARIAL_PASSOS.map((s) => (
                <li key={s.title}>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`empresarial-bairro-sp-${bairro.key}-meio`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                  Solicitar análise de cobertura
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/cotacao?tipo=empresarial">Falar com um especialista</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 9 — outras proteções empresariais */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Outras proteções para empresas de {bairro.nome}</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              <li>
                <Link to={`/${bairro.key}`} className="text-primary hover:underline inline-flex items-center gap-1">
                  Seguros em {bairro.nome} — visão geral
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </li>
              {residencial && (
                <li>
                  <Link to={`/${residencial.slug}`} className="text-primary hover:underline inline-flex items-center gap-1">
                    Seguro residencial em {bairro.nome}
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </li>
              )}
              <li>
                <Link to={`/${bairro.autoSlug}`} className="text-primary hover:underline inline-flex items-center gap-1">
                  Seguro auto em {bairro.nome}
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link to="/seguro-empresarial" className="text-primary hover:underline inline-flex items-center gap-1">
                  Seguro empresarial — página principal
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link to={GRANDE_SP_PATH} className="text-primary hover:underline inline-flex items-center gap-1">
                  Atendimento na Grande São Paulo
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* atendimento + NAP real */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Como a Patro atende empresas de {bairro.nome}</h2>
            <p className="text-muted-foreground">{bairro.posicionamento}</p>
            <p className="text-muted-foreground mt-3">
              O levantamento de riscos é feito em reunião on-line, com envio de fotos e documentos pelos canais
              digitais. Não mantemos unidade no bairro: a sede é em Guarulhos e o acompanhamento da apólice, das
              renovações e de eventuais sinistros é feito à distância pelo consultor responsável.
            </p>
            <address className="not-italic text-sm text-muted-foreground mt-4">
              <strong className="block text-foreground">{EMPRESA.nomeFantasia}</strong>
              {NAP_LINHA_1}
              <br />
              {NAP_LINHA_2}
              <br />
              Telefone e WhatsApp: {EMPRESA.telefone} • CNPJ {EMPRESA.cnpj} • SUSEP {EMPRESA.susep}
            </address>
          </div>
        </section>

        {/* 10 — FAQ */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Perguntas frequentes sobre seguro empresarial em {bairro.nome}</h2>
            <div className="space-y-5">
              {data.faqs.map((f) => (
                <div key={f.question}>
                  <h3 className="font-semibold mb-1">{f.question}</h3>
                  <p className="text-sm text-muted-foreground">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SeguroEmpresarialBairroSp;
