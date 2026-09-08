import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { EMPRESA, NAP_LINHA_1, NAP_LINHA_2 } from "@/config/empresa";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/tracking";
import {
  GRANDE_SP_PATH,
  POR_QUE_COMPARAR,
  PASSOS_COTACAO,
  bairrosSaoPauloAuto,
  bairroSpSlugs,
} from "@/data/segurosSaoPauloRegional";

export const COTACAO_BAIRROS_PATH = "/cotacao-seguro-auto-por-bairro";

const FAQS = [
  {
    question: "A comparação por bairro mostra preços prontos na tela?",
    answer:
      "Não. O preço do seguro auto depende de veículo, condutor, uso e CEP de pernoite, e só existe depois que as seguradoras calculam. Esta página organiza os critérios que mudam de bairro para bairro e envia o seu caso para cotação com as seguradoras parceiras.",
  },
  {
    question: "Como o bairro influencia a cotação?",
    answer:
      "O endereço onde o carro passa a noite entra no cálculo de todas as companhias, junto com o tipo de vaga (garagem fechada ou via pública) e o padrão de uso da região. Por isso o mesmo carro pode ter preços diferentes na Vila Olímpia e em Perdizes.",
  },
  {
    question: "Com quantas seguradoras a Patro compara?",
    answer: `A Patro Seguros trabalha com ${EMPRESA.metricas.seguradorasParceiras} seguradoras parceiras e apresenta as alternativas lado a lado, com as diferenças de franquia, oficina, limite de terceiros e assistência explicadas em linguagem simples.`,
  },
  {
    question: "Preciso morar em São Paulo capital para usar esta página?",
    answer:
      "Não. A Patro Seguros é uma corretora sediada em Guarulhos que atende clientes na cidade, na capital, em toda a Grande São Paulo e, quando aplicável, em outras regiões do Brasil. Os bairros listados são as páginas-piloto de seguro auto na capital.",
  },
  {
    question: "A cotação tem custo ou compromisso?",
    answer:
      "Não. A comparação é gratuita e sem obrigação de fechar. Você recebe as opções por escrito, no WhatsApp ou por e-mail, e decide com calma.",
  },
];

const CRITERIOS = [
  {
    criterio: "CEP de pernoite",
    oQueMuda:
      "Cada seguradora tem sua própria leitura do endereço onde o carro dorme. É o item que mais varia entre companhias dentro da mesma cidade.",
  },
  {
    criterio: "Tipo de vaga",
    oQueMuda:
      "Garagem fechada em edifício, vaga em condomínio horizontal e estacionamento na rua são avaliados de formas diferentes.",
  },
  {
    criterio: "Franquia",
    oQueMuda:
      "Reduzida, normal ou majorada. Uma proposta mais barata costuma vir com franquia maior — o custo aparece no sinistro, não na contratação.",
  },
  {
    criterio: "Oficina de reparo",
    oQueMuda:
      "Rede referenciada, concessionária ou livre escolha. Muda o prazo do conserto e a garantia do serviço.",
  },
  {
    criterio: "Danos a terceiros (RCF-V)",
    oQueMuda:
      "Limites materiais, corporais e morais variam bastante. Em vias de tráfego intenso, este é o item mais sensível da apólice.",
  },
  {
    criterio: "Carro reserva e assistência 24h",
    oQueMuda:
      "Quantidade de diárias, quilometragem de guincho e serviços inclusos mudam de companhia para companhia.",
  },
];

const CotacaoComparativaBairros = () => {
  const [slug, setSlug] = useState<string>(bairroSpSlugs[0]);
  const bairro = useMemo(() => bairrosSaoPauloAuto[slug], [slug]);

  const whatsappUrl = buildWhatsAppUrl({
    origem: "cotacao_comparativa_bairros",
    extraLines: [
      `Quero comparar seguradoras de seguro auto em ${bairro.bairro} (${bairro.regiao}).`,
      "Posso enviar modelo/ano do veículo, CEP de pernoite e perfil do condutor.",
    ],
  });

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Cotação de Seguro Auto por Bairro em São Paulo | Patro Seguros"
        description="Compare seguradoras de seguro auto bairro a bairro em São Paulo: veja o que muda em franquia, oficina e danos a terceiros e receba a cotação comentada da Patro Seguros."
        absoluteTitle
      />
      <FAQSchema faqs={FAQS} />
      <Header />
      <Breadcrumb
        items={[
          { label: "Grande São Paulo", href: GRANDE_SP_PATH },
          { label: "Cotação por bairro" },
        ]}
      />

      <main>
        <section className="bg-primary text-primary-foreground py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs font-semibold tracking-widest uppercase opacity-80 mb-3">
              Cotação comparativa • Bairros de São Paulo
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Cotação de Seguro Auto por Bairro em São Paulo
            </h1>
            <p className="text-base md:text-lg opacity-90">
              Escolha o bairro onde o carro passa a noite e veja, com base no contexto de cada
              região, quais critérios pesam na comparação entre as seguradoras parceiras da Patro
              Seguros — corretora sediada em Guarulhos, com atendimento em toda a Grande São Paulo.
            </p>
          </div>
        </section>

        {/* Seletor de bairro */}
        <section className="py-12" aria-labelledby="selecao-bairro">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="selecao-bairro" className="text-2xl font-bold text-foreground mb-4">
              1. Escolha o bairro do carro
            </h2>
            <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Selecionar bairro">
              {bairroSpSlugs.map((s) => {
                const b = bairrosSaoPauloAuto[s];
                const active = s === slug;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlug(s)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:border-primary"
                    }`}
                  >
                    {b.bairro}
                  </button>
                );
              })}
            </div>

            <div className="rounded-lg border border-border p-6">
              <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                {bairro.bairro} — {bairro.regiao}
              </h3>
              {bairro.contexto.slice(0, 2).map((p) => (
                <p key={p} className="text-muted-foreground mb-3 leading-relaxed">
                  {p}
                </p>
              ))}

              <h4 className="font-semibold text-foreground mt-6 mb-2">
                O que pesa na cotação em {bairro.bairro}
              </h4>
              <ul className="space-y-2 mb-6">
                {bairro.fatores.map((f) => (
                  <li key={f.title} className="text-sm text-muted-foreground">
                    <strong className="text-foreground">{f.title}:</strong> {f.description}
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold text-foreground mb-2">
                Coberturas que costumam ser comparadas nesse perfil
              </h4>
              <ul className="space-y-2 mb-6">
                {bairro.coberturas.map((c) => (
                  <li key={c.title} className="text-sm text-muted-foreground">
                    <strong className="text-foreground">{c.title}:</strong> {c.description}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("cotacao_comparativa_bairros")}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                    Comparar seguradoras em {bairro.bairro}
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to={`/${bairro.slug}`}>
                    Ver a página de {bairro.bairro}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Critérios de comparação */}
        <section className="py-12 bg-muted/40" aria-labelledby="criterios-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="criterios-heading" className="text-2xl font-bold text-foreground mb-4">
              2. O que comparamos entre as seguradoras
            </h2>
            <p className="text-muted-foreground mb-6">
              A comparação é feita com o mesmo padrão de cobertura em todas as companhias, para que
              a diferença de preço signifique alguma coisa. Estes são os itens analisados em cada
              proposta:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border border-border rounded-lg overflow-hidden">
                <caption className="sr-only">
                  Critérios de comparação entre seguradoras de seguro auto
                </caption>
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th scope="col" className="p-3 font-semibold">Critério</th>
                    <th scope="col" className="p-3 font-semibold">O que muda de uma seguradora para outra</th>
                  </tr>
                </thead>
                <tbody>
                  {CRITERIOS.map((c, i) => (
                    <tr key={c.criterio} className={i % 2 ? "bg-background" : "bg-muted/30"}>
                      <th scope="row" className="p-3 font-medium text-foreground align-top">
                        {c.criterio}
                      </th>
                      <td className="p-3 text-muted-foreground">{c.oQueMuda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="mt-6 space-y-3">
              {POR_QUE_COMPARAR.map((p) => (
                <li key={p} className="flex gap-2 text-muted-foreground">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-12" aria-labelledby="passos-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="passos-heading" className="text-2xl font-bold text-foreground mb-6">
              3. Como funciona a cotação
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {PASSOS_COTACAO.map((p) => (
                <div key={p.title} className="rounded-lg border border-border p-5">
                  <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-muted/40" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="faq-heading" className="text-2xl font-bold text-foreground mb-6">
              Perguntas frequentes sobre cotação por bairro
            </h2>
            <div className="space-y-5">
              {FAQS.map((f) => (
                <div key={f.question}>
                  <h3 className="font-semibold text-foreground mb-1">{f.question}</h3>
                  <p className="text-muted-foreground">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bairros + NAP */}
        <section className="py-12" aria-labelledby="bairros-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="bairros-heading" className="text-2xl font-bold text-foreground mb-4">
              Páginas de seguro auto por bairro
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 mb-8">
              {bairroSpSlugs.map((s) => (
                <li key={s}>
                  <Link to={`/${s}`} className="text-primary hover:underline">
                    Seguro auto em {bairrosSaoPauloAuto[s].bairro}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              {EMPRESA.nome} — {NAP_LINHA_1} — {NAP_LINHA_2}. CNPJ {EMPRESA.cnpj} • SUSEP{" "}
              {EMPRESA.susep} • WhatsApp {EMPRESA.telefoneFormatado}.{" "}
              <Link to={GRANDE_SP_PATH} className="text-primary hover:underline">
                Atendimento na Grande São Paulo
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CotacaoComparativaBairros;
