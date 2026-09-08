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
  residencialBairrosSp,
  empresarialBairrosSp,
  RESIDENCIAL_COBERTURAS,
  RESIDENCIAL_ASSISTENCIA,
  RESIDENCIAL_PASSOS,
} from "@/data/segurosSaoPauloProdutos";

interface Props {
  /** Chave do bairro (ex.: "moema"). */
  bairroKey: string;
}

const SeguroResidencialBairroSp = ({ bairroKey }: Props) => {
  const bairro = bairrosGrupoA[bairroKey];
  const data = residencialBairrosSp[bairroKey];
  if (!bairro || !data) return null;

  const empresarial = empresarialBairrosSp[bairroKey];

  const whatsappUrl = `https://wa.me/${EMPRESA.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Olá, vim pelo site da Patro Seguros e gostaria de cotar um seguro residencial em ${bairro.nome}, São Paulo.`,
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
          { label: `Seguro residencial em ${bairro.nome}` },
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
              Seguro Residencial em {bairro.nome} – São Paulo
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
                  onClick={() => trackWhatsAppClick(`residencial-bairro-sp-${bairro.key}`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                  Cotar seguro residencial
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

        {/* 1 — contexto local */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Seguro residencial em {bairro.nome}</h2>
            <div className="space-y-4 text-muted-foreground">
              {data.contexto.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 2 — coberturas */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-3">O que o seguro residencial pode proteger</h2>
            <p className="text-sm text-muted-foreground mb-6">
              As garantias abaixo existem no mercado, mas não são automáticas: cada apólice é montada com as
              coberturas escolhidas, dentro dos limites e das condições da seguradora.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {RESIDENCIAL_COBERTURAS.map((c) => (
                <div key={c.title} className="bg-background rounded-lg border p-5">
                  <h3 className="font-semibold mb-1">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 — assistência */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-3">Assistência 24 horas</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Serviços que podem estar disponíveis conforme o plano contratado. Quantidade de acionamentos por ano e
              limite de cada atendimento variam de apólice para apólice.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {RESIDENCIAL_ASSISTENCIA.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 — apartamento */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Seguro para apartamento em {bairro.nome}</h2>
            <div className="space-y-4 text-muted-foreground">
              {data.apartamento.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 5 — casa */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Seguro para casa em {bairro.nome}</h2>
            <div className="space-y-4 text-muted-foreground">
              {data.casa.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 6 — proprietário x inquilino */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Proprietário e inquilino: necessidades diferentes</h2>
            <div className="space-y-4 text-muted-foreground">
              {data.proprietarioInquilino.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 7 — como escolher */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Como escolher a cobertura</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.escolha.map((e) => (
                <div key={e.title} className="rounded-lg border p-5">
                  <h3 className="font-semibold mb-1">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8 — cotação */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Como funciona a cotação com a Patro</h2>
            <ol className="space-y-4">
              {RESIDENCIAL_PASSOS.map((s) => (
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
                  onClick={() => trackWhatsAppClick(`residencial-bairro-sp-${bairro.key}-meio`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                  Proteger meu imóvel
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/cotacao?tipo=residencial">Comparar coberturas</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 9 — outros seguros / interlinking */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Outros seguros para quem mora em {bairro.nome}</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              <li>
                <Link to={`/${bairro.key}`} className="text-primary hover:underline inline-flex items-center gap-1">
                  Seguros em {bairro.nome} — visão geral
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link to={`/${bairro.autoSlug}`} className="text-primary hover:underline inline-flex items-center gap-1">
                  Seguro auto em {bairro.nome}
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </li>
              {empresarial && (
                <li>
                  <Link to={`/${empresarial.slug}`} className="text-primary hover:underline inline-flex items-center gap-1">
                    Seguro empresarial em {bairro.nome}
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </li>
              )}
              <li>
                <Link to="/seguro-residencial" className="text-primary hover:underline inline-flex items-center gap-1">
                  Seguro residencial — página principal
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
            <h2 className="text-2xl font-bold mb-4">Como a Patro atende {bairro.nome}</h2>
            <p className="text-muted-foreground">{bairro.posicionamento}</p>
            <p className="text-muted-foreground mt-3">
              Não temos escritório no bairro: cotação, envio de documentos, emissão da apólice e acompanhamento de
              sinistro são resolvidos por WhatsApp, telefone, e-mail e reuniões on-line, com um consultor responsável
              pelo seu caso. Quem preferir conversar pessoalmente pode agendar visita à sede em Guarulhos.
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
            <h2 className="text-2xl font-bold mb-6">Perguntas frequentes sobre seguro residencial em {bairro.nome}</h2>
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

export default SeguroResidencialBairroSp;
