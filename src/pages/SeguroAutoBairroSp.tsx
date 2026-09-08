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
import {
  bairrosSaoPauloAuto,
  ATENDIMENTO_REGIONAL,
  POR_QUE_COMPARAR,
  PASSOS_COTACAO,
  GRANDE_SP_PATH,
} from "@/data/segurosSaoPauloRegional";

interface Props {
  slug: string;
}

const SeguroAutoBairroSp = ({ slug }: Props) => {
  const data = bairrosSaoPauloAuto[slug];
  if (!data) return null;

  const whatsappUrl = `https://wa.me/${EMPRESA.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Olá, vim pelo site da Patro Seguros e gostaria de uma cotação de seguro auto em ${data.bairro}, São Paulo.`,
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title={data.title} description={data.metaDescription} absoluteTitle />
      <FAQSchema faqs={data.faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <Header />
      <Breadcrumb
        items={[
          { label: "Guarulhos e Grande São Paulo", href: GRANDE_SP_PATH },
          { label: `Seguro auto em ${data.bairro}` },
        ]}
      />

      <main>
        <section className="bg-primary text-primary-foreground py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs font-semibold tracking-widest uppercase opacity-80 mb-3 inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {data.bairro} • {data.regiao}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Seguro Auto em {data.bairro} – São Paulo
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
                  onClick={() => trackWhatsAppClick(`bairro-sp-${slug}`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                  Cotar seguro auto
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
            <h2 className="text-2xl font-bold mb-4">Seguro auto em {data.bairro}</h2>
            <div className="space-y-4 text-muted-foreground">
              {data.contexto.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 2 — fatores */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">O que influencia o preço na região</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.fatores.map((f) => (
                <div key={f.title} className="bg-background rounded-lg border p-5">
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 — coberturas */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Coberturas importantes para quem dirige em {data.bairro}</h2>
            <ul className="space-y-4">
              {data.coberturas.map((c) => (
                <li key={c.title}>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 — perfis */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Perfis que atendemos na região</h2>
            <ul className="grid sm:grid-cols-2 gap-2 text-muted-foreground list-disc pl-5">
              {data.perfis.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 — comparar */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Por que comparar seguradoras antes de contratar</h2>
            <div className="space-y-3 text-muted-foreground">
              {POR_QUE_COMPARAR.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 6 — cotação */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Como funciona a cotação com a Patro</h2>
            <ol className="space-y-4">
              {PASSOS_COTACAO.map((s) => (
                <li key={s.title}>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7 — outros seguros */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Outros seguros disponíveis</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {data.outrosSeguros.map((o) => (
                <li key={o.link}>
                  <Link to={o.link} className="text-primary hover:underline inline-flex items-center gap-1">
                    {o.title}
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 8 — atendimento */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Atendimento em Guarulhos e Grande São Paulo</h2>
            <div className="space-y-3 text-muted-foreground">
              {ATENDIMENTO_REGIONAL.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
            <address className="not-italic text-sm text-muted-foreground mt-4">
              <strong className="block text-foreground">{EMPRESA.nomeFantasia}</strong>
              {NAP_LINHA_1}
              <br />
              {NAP_LINHA_2}
              <br />
              Telefone e WhatsApp: {EMPRESA.telefone} • CNPJ {EMPRESA.cnpj} • SUSEP {EMPRESA.susep}
            </address>
            <p className="mt-4">
              <Link to={GRANDE_SP_PATH} className="text-primary hover:underline">
                Veja como funciona o atendimento da Patro na Grande São Paulo
              </Link>
            </p>
          </div>
        </section>

        {/* 9 — bairros próximos */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Bairros próximos</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {data.bairrosProximos.map((b) => (
                <li key={b.link}>
                  <Link to={b.link} className="text-primary hover:underline inline-flex items-center gap-1">
                    Seguro auto em {b.name}
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 10 — FAQ */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Perguntas frequentes</h2>
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

export default SeguroAutoBairroSp;
