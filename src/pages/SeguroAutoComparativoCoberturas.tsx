import { Link } from "react-router-dom";
import { Check, X, MessageCircle, Calculator, ArrowRight, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import { trackWhatsAppClick, trackCotacaoClick, trackInternalLinkClick } from "@/lib/tracking";

const PHONE = "551151997500";
const WA_MSG = "Olá! Quero entender as coberturas do seguro auto e saber qual combinação faz sentido pro meu perfil.";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MSG)}`;

type Cobertura = {
  nome: string;
  o_que: string;
  basica: boolean | "opcional";
  intermediaria: boolean | "opcional";
  compreensiva: boolean | "opcional";
  observacao?: string;
};

const COBERTURAS: Cobertura[] = [
  {
    nome: "Responsabilidade Civil Facultativa (RCF-V)",
    o_que: "Indenização para danos materiais e corporais causados a terceiros (outro veículo, pessoa ou patrimônio).",
    basica: true,
    intermediaria: true,
    compreensiva: true,
    observacao: "Limites de cobertura variam — recomenda-se mínimo de R$ 100 mil materiais + R$ 100 mil corporais, sujeito ao perfil.",
  },
  {
    nome: "Assistência 24h (guincho, pane, chaveiro)",
    o_que: "Socorro mecânico, guincho, troca de pneu, pane seca e chaveiro 24 horas.",
    basica: true,
    intermediaria: true,
    compreensiva: true,
  },
  {
    nome: "Acidentes Pessoais de Passageiros (APP)",
    o_que: "Indenização por morte ou invalidez de passageiros em acidente com o veículo segurado.",
    basica: "opcional",
    intermediaria: true,
    compreensiva: true,
    observacao: "Obrigatória para motoristas de aplicativo (Uber/99).",
  },
  {
    nome: "Colisão (perda parcial e total)",
    o_que: "Cobre danos ao próprio veículo em caso de colisão, capotagem ou abalroamento.",
    basica: false,
    intermediaria: true,
    compreensiva: true,
  },
  {
    nome: "Roubo e furto",
    o_que: "Indenização pelo valor de mercado (FIPE) em caso de subtração do veículo.",
    basica: false,
    intermediaria: true,
    compreensiva: true,
    observacao: "Pode exigir rastreador conforme CEP de pernoite e valor FIPE.",
  },
  {
    nome: "Incêndio e fenômenos da natureza",
    o_que: "Enchente, alagamento, granizo, queda de árvore, vendaval e incêndio.",
    basica: false,
    intermediaria: true,
    compreensiva: true,
  },
  {
    nome: "Vidros, faróis, lanternas e retrovisores",
    o_que: "Reparo ou troca de vidros e itens externos com franquia reduzida.",
    basica: false,
    intermediaria: "opcional",
    compreensiva: true,
  },
  {
    nome: "Carro reserva (7, 15 ou 30 dias)",
    o_que: "Veículo reserva enquanto o seu está na oficina ou aguardando indenização.",
    basica: false,
    intermediaria: "opcional",
    compreensiva: true,
  },
  {
    nome: "Cobertura para acessórios (multimídia, blindagem, kit gás)",
    o_que: "Indenização específica para itens não originais de fábrica.",
    basica: false,
    intermediaria: false,
    compreensiva: "opcional",
    observacao: "Exige nota fiscal dos acessórios para aceitação.",
  },
  {
    nome: "Cláusula uso aplicativo (Uber/99)",
    o_que: "Permite uso profissional do veículo em apps sem perda de cobertura.",
    basica: "opcional",
    intermediaria: "opcional",
    compreensiva: "opcional",
    observacao: "Deve ser contratada explicitamente — apólices padrão recusam sinistro durante corrida.",
  },
];

const FAQS = [
  {
    question: "Qual a diferença entre seguro básico, intermediário e compreensivo?",
    answer:
      "O seguro básico (RCF-V) cobre apenas danos a terceiros e assistência 24h — protege seu patrimônio contra processos, mas não indeniza o próprio carro. O intermediário acrescenta colisão, roubo, furto e incêndio. O compreensivo é o mais completo e inclui vidros, carro reserva e flexibilidade para acessórios. Conforme aceitação da seguradora e perfil do cliente, é possível personalizar coberturas dentro de cada nível.",
  },
  {
    question: "Vale a pena contratar só RCF-V (cobertura básica) em Guarulhos?",
    answer:
      "Faz sentido principalmente para veículos com FIPE abaixo de R$ 30 mil ou para quem já provisionou financeiramente uma eventual perda total. Em Guarulhos, com índice de roubo elevado em bairros como Cumbica, Bonsucesso e Pimentas, a cobertura compreensiva costuma ter melhor relação custo-benefício a partir de R$ 40 mil de FIPE — sujeito a análise da seguradora.",
  },
  {
    question: "O que é franquia e como ela afeta o preço?",
    answer:
      "Franquia é a participação obrigatória do segurado em sinistros de perda parcial (uma batida que dá conserto, por exemplo). Quanto menor a franquia, maior o prêmio anual. Em perdas totais por roubo ou colisão grave, a franquia não se aplica. Vale comparar pelo menos três opções: franquia reduzida (~50% da básica), franquia normal e franquia majorada — o ganho de prêmio pode ou não compensar conforme seu uso.",
  },
  {
    question: "Quando devo adicionar carro reserva à apólice?",
    answer:
      "Carro reserva vale para quem usa o veículo diariamente para trabalho, deslocamentos longos ou em rotas sem transporte público fluido. Em geral, o custo adicional fica entre R$ 200 e R$ 600/ano e libera 7, 15 ou 30 dias de carro reserva — conforme o produto contratado. Para motoristas de aplicativo, é praticamente essencial.",
  },
  {
    question: "Posso cobrir blindagem e kit gás na apólice?",
    answer:
      "Sim, mas é necessário contratar a cobertura específica de acessórios e apresentar nota fiscal. Sem essa cláusula, em caso de perda total a seguradora indeniza apenas o valor FIPE do veículo, ignorando o investimento extra. Conforme aceitação da seguradora, blindagem nível IIIA é a faixa mais comumente aceita.",
  },
  {
    question: "Como a Patro me ajuda a escolher a combinação certa de coberturas?",
    answer:
      "Numa conversa de 10 minutos por WhatsApp ou presencial no Cidade Maia, mapeamos seu perfil, uso do veículo, CEP de pernoite, tolerância a risco e orçamento. Em seguida cotamos em até 16 seguradoras e apresentamos 2 ou 3 combinações lado a lado, mostrando o que entra, o que fica de fora e o impacto de cada cobertura no prêmio. Você escolhe a que faz sentido. Cotação 100% gratuita e sem compromisso.",
  },
];

const Cell = ({ v }: { v: boolean | "opcional" }) => {
  if (v === true) return <Check className="h-5 w-5 text-emerald-600 mx-auto" aria-label="Incluso" />;
  if (v === "opcional")
    return <span className="inline-block rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold px-2 py-0.5">Opcional</span>;
  return <X className="h-5 w-5 text-muted-foreground mx-auto" aria-label="Não incluso" />;
};

const SeguroAutoComparativoCoberturas = () => (
  <>
    <PageMeta
      title="Seguro Auto: Comparativo de Coberturas (Básica, Intermediária e Compreensiva)"
      description="Comparativo claro de coberturas de seguro auto: RCF, colisão, roubo, vidros, carro reserva, APP e mais. Entenda o que cada nível cobre antes de cotar."
    />
    <FAQSchema faqs={FAQS} />
    <BreadcrumbSchema
      items={[
        { name: "Início", url: "/" },
        { name: "Seguro Auto", url: "/seguro-auto" },
        { name: "Comparativo de Coberturas", url: "/seguro-auto/comparativo-coberturas" },
      ]}
    />
    <Header />
    <main className="bg-background">
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumb
          items={[
            { label: "Seguro Auto", href: "/seguro-auto" },
            { label: "Comparativo de Coberturas", href: "/seguro-auto/comparativo-coberturas" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="section-label">Guia de coberturas</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Seguro Auto: Comparativo de Coberturas
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Antes de cotar, entenda o que cada nível de cobertura faz por você. Comparamos as três
            configurações mais comuns — básica, intermediária e compreensiva — sem jargão, com
            ressalvas e indicação de quando cada uma faz sentido. Valores e itens estão sujeitos à
            aceitação da seguradora e ao perfil do cliente.
          </p>
        </div>
      </section>

      {/* Tabela comparativa */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/40 text-foreground">
                <tr>
                  <th className="text-left p-4 font-semibold">Cobertura</th>
                  <th className="text-center p-4 font-semibold">Básica<br /><span className="text-xs font-normal text-muted-foreground">só terceiros</span></th>
                  <th className="text-center p-4 font-semibold">Intermediária<br /><span className="text-xs font-normal text-muted-foreground">terceiros + casco</span></th>
                  <th className="text-center p-4 font-semibold">Compreensiva<br /><span className="text-xs font-normal text-muted-foreground">mais completa</span></th>
                </tr>
              </thead>
              <tbody>
                {COBERTURAS.map((c) => (
                  <tr key={c.nome} className="border-t border-border align-top">
                    <td className="p-4">
                      <div className="font-semibold text-foreground">{c.nome}</div>
                      <div className="text-xs text-muted-foreground mt-1">{c.o_que}</div>
                      {c.observacao && (
                        <div className="mt-2 inline-flex items-start gap-1 text-[11px] text-muted-foreground">
                          <Info className="h-3 w-3 mt-0.5 shrink-0" aria-hidden="true" />
                          <span>{c.observacao}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-center"><Cell v={c.basica} /></td>
                    <td className="p-4 text-center"><Cell v={c.intermediaria} /></td>
                    <td className="p-4 text-center"><Cell v={c.compreensiva} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Itens, limites e franquias variam entre seguradoras. A tabela acima é didática — a
            apólice contratada prevalece. Conforme análise de risco, alguns itens marcados como
            "incluso" podem ser limitados ou excluídos.
          </p>
        </div>
      </section>

      {/* Quando vale cada cobertura */}
      <section className="py-14 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
            Quando cada cobertura faz sentido
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Básica (RCF-V)</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Para veículos com FIPE baixo (geralmente abaixo de R$ 30 mil) ou para quem já tem
                reserva financeira para uma eventual perda total. Protege seu patrimônio contra
                processos de terceiros, mas não indeniza o próprio carro.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Intermediária</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Para a maioria dos casos. Cobre o que pesa no bolso: colisão, roubo, furto e
                incêndio, além de terceiros. Equilíbrio entre prêmio e proteção. Recomendada a
                partir de R$ 40 mil de FIPE em Guarulhos.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">Compreensiva</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Para quem usa o carro diariamente, motoristas de aplicativo, veículos premium ou
                blindados. Inclui vidros, carro reserva e flexibilidade para acessórios. Maior
                tranquilidade no dia a dia, com menor custo por sinistro evitado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sinistro */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
            Como funciona um sinistro auto (3 passos)
          </h2>
          <ol className="mt-8 grid md:grid-cols-3 gap-4 list-none">
            {[
              { n: "1", t: "Acione a Patro", d: "Envie mensagem no WhatsApp (11) 5199-7500 com placa e descrição. Em horário comercial respondemos em minutos; fora dele, o boletim eletrônico fica registrado." },
              { n: "2", t: "Documentação e vistoria", d: "Orientamos sobre boletim, fotos, terceiros e laudo. Acompanhamos a abertura do sinistro na seguradora e a indicação de oficina referenciada ou de sua preferência." },
              { n: "3", t: "Acompanhamento até a entrega", d: "Acompanhamos prazos, autorização de peças, carro reserva e entrega. Se houver divergência da seguradora, argumentamos tecnicamente em seu nome." },
            ].map((s) => (
              <li key={s.n} className="rounded-xl border border-border bg-card p-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">{s.n}</div>
                <h3 className="mt-3 font-semibold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary/5 border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Não sabe qual combinação contratar?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Em 10 minutos por WhatsApp, montamos com você a combinação que faz sentido pro seu
            perfil, uso e bolso — sem custo e sem compromisso.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("comparativo-coberturas:mid")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> Falar com consultor
            </a>
            <Link
              to="/cotacao?tipo=auto"
              onClick={() => trackCotacaoClick("comparativo-coberturas:mid")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 transition-colors"
            >
              <Calculator className="h-5 w-5" /> Formulário de cotação
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Perguntas frequentes — Coberturas de seguro auto
          </h2>
          <dl className="space-y-4" data-speakable="faq">
            {FAQS.map((f) => (
              <div key={f.question} className="rounded-xl border border-border bg-card p-5">
                <dt className="font-semibold text-foreground">{f.question}</dt>
                <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Continue navegando</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-3 text-left">
            <Link
              to="/seguro-auto"
              onClick={() => trackInternalLinkClick({ source: "comparativo-coberturas", destination: "/seguro-auto", label: "Pilar Auto" })}
              className="group rounded-xl border border-border bg-card p-5 hover:border-primary transition-colors"
            >
              <span className="text-sm font-semibold text-foreground">Voltar ao Seguro Auto</span>
              <span className="mt-1 block text-xs text-muted-foreground">Pilar principal com coberturas, processo e FAQ.</span>
              <ArrowRight className="mt-3 h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/seguro-auto/marcas"
              onClick={() => trackInternalLinkClick({ source: "comparativo-coberturas", destination: "/seguro-auto/marcas", label: "Hub Marcas" })}
              className="group rounded-xl border border-border bg-card p-5 hover:border-primary transition-colors"
            >
              <span className="text-sm font-semibold text-foreground">Hub por marca</span>
              <span className="mt-1 block text-xs text-muted-foreground">VW, Toyota, Honda, BMW, BYD e mais.</span>
              <ArrowRight className="mt-3 h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/seguro-auto/modelos"
              onClick={() => trackInternalLinkClick({ source: "comparativo-coberturas", destination: "/seguro-auto/modelos", label: "Hub Modelos" })}
              className="group rounded-xl border border-border bg-card p-5 hover:border-primary transition-colors"
            >
              <span className="text-sm font-semibold text-foreground">Hub por modelo</span>
              <span className="mt-1 block text-xs text-muted-foreground">Onix, Corolla, T-Cross, Hilux e 40+ modelos.</span>
              <ArrowRight className="mt-3 h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <StickyQuoteBar
      source="comparativo-coberturas"
      quoteHref="/cotacao?tipo=auto"
      whatsappMessage={WA_MSG}
      ctaLabel="Cotação rápida"
    />
  </>
);

export default SeguroAutoComparativoCoberturas;