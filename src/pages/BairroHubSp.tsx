import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { EMPRESA, NAP_LINHA_1, NAP_LINHA_2 } from "@/config/empresa";
import { trackWhatsAppClick } from "@/lib/tracking";
import { GRANDE_SP_PATH, bairrosSaoPauloAuto } from "@/data/segurosSaoPauloRegional";
import {
  bairrosGrupoA,
  residencialBairrosSp,
  empresarialBairrosSp,
  bairroGrupoAKeys,
} from "@/data/segurosSaoPauloProdutos";

interface Props {
  /** Chave do bairro (ex.: "itaim-bibi"). */
  bairroKey: string;
}

/** Hub de bairro Grupo A — porta de entrada para Auto, Residencial e Empresarial. */
const BairroHubSp = ({ bairroKey }: Props) => {
  const bairro = bairrosGrupoA[bairroKey];
  if (!bairro) return null;

  const residencial = residencialBairrosSp[bairroKey];
  const empresarial = empresarialBairrosSp[bairroKey];
  const auto = bairrosSaoPauloAuto[bairro.autoSlug];

  const whatsappUrl = `https://wa.me/${EMPRESA.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Olá, vim pelo site da Patro Seguros e gostaria de uma cotação em ${bairro.nome}, São Paulo.`,
  )}`;

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={`Seguros em ${bairro.nome} | Auto, Residencial e Empresarial | Patro Seguros`}
        description={`Seguros em ${bairro.nome} (${bairro.regiao}): cotação consultiva de seguro auto, residencial e empresarial com corretora sediada em Guarulhos. Fale com a Patro Seguros.`}
        absoluteTitle
      />
      <Header />
      <Breadcrumb
        items={[
          { label: "Guarulhos e Grande São Paulo", href: GRANDE_SP_PATH },
          { label: `Seguros em ${bairro.nome}` },
        ]}
      />

      <main>
        <section className="bg-primary text-primary-foreground py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs font-semibold tracking-widest uppercase opacity-80 mb-3 inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {bairro.nome} • {bairro.regiao}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Seguros em {bairro.nome} – São Paulo</h1>
            {bairro.hubIntro.map((p) => (
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
                  onClick={() => trackWhatsAppClick(`hub-bairro-sp-${bairro.key}`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                  Pedir cotação no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* produtos do bairro */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Seguros para quem mora ou trabalha em {bairro.nome}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {auto && (
                <div className="rounded-lg border p-5 flex flex-col">
                  <h3 className="font-semibold mb-2">Seguro Auto em {bairro.nome}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    CEP de pernoite, estacionamento e uso do carro definem o preço. Comparamos as seguradoras com o
                    mesmo padrão de cobertura.
                  </p>
                  <Button asChild variant="outline" size="sm" className="self-start">
                    <Link to={`/${bairro.autoSlug}`}>
                      Ver seguro auto
                      <ArrowRight className="h-3 w-3 ml-1" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              )}
              {residencial && (
                <div className="rounded-lg border p-5 flex flex-col">
                  <h3 className="font-semibold mb-2">Seguro Residencial em {bairro.nome}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    Casa ou apartamento, próprio ou alugado: estrutura, conteúdo e assistência 24 horas sob medida
                    para o seu imóvel.
                  </p>
                  <Button asChild variant="outline" size="sm" className="self-start">
                    <Link to={`/${residencial.slug}`}>
                      Ver seguro residencial
                      <ArrowRight className="h-3 w-3 ml-1" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              )}
              {empresarial && (
                <div className="rounded-lg border p-5 flex flex-col">
                  <h3 className="font-semibold mb-2">Seguro Empresarial em {bairro.nome}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    Comércio, escritório, clínica ou serviço: apólice personalizada para a atividade, o imóvel e o
                    conteúdo da sua empresa.
                  </p>
                  <Button asChild variant="outline" size="sm" className="self-start">
                    <Link to={`/${empresarial.slug}`}>
                      Ver seguro empresarial
                      <ArrowRight className="h-3 w-3 ml-1" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* atendimento + NAP real */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Como a Patro Seguros atende {bairro.nome}</h2>
            <p className="text-muted-foreground">{bairro.posicionamento}</p>
            <p className="text-muted-foreground mt-3">
              A Patro Seguros é sediada em Guarulhos, na Cidade Maia. O atendimento a {bairro.nome} é feito de forma
              remota e consultiva — WhatsApp, telefone, e-mail e reuniões on-line — com a possibilidade de agendar
              uma visita à sede para quem preferir falar pessoalmente. Não temos escritório ou unidade no bairro.
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

        {/* vizinhos */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Bairros próximos que também atendemos</h2>
            <div className="flex flex-wrap gap-2">
              {bairro.vizinhos
                .filter((v) => bairrosGrupoA[v])
                .map((v) => (
                  <Button key={v} asChild variant="secondary" size="sm" className="rounded-full">
                    <Link to={`/${v}`}>Seguros em {bairrosGrupoA[v].nome}</Link>
                  </Button>
                ))}
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link to={GRANDE_SP_PATH}>Toda a região</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BairroHubSp;

// Referência explícita para o bundler/verificadores: lista de hubs ativos.
export const hubsGrupoAAtivos = bairroGrupoAKeys;
