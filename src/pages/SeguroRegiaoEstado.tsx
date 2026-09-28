import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroAgro from "@/assets/hero-agro-maquinas.webp";
import heroRural from "@/assets/hero-seguro-rural.webp";
import heroFrota from "@/assets/hero-seguro-frota.webp";
import heroEmpresa from "@/assets/hero-seguro-empresarial.webp";
import {
  ATENDIMENTO_NACIONAL_PATH,
  estadoPath,
  estadosDaRegiao,
  estadosNacionais,
  produtosNacionais,
  regiaoPath,
  regioesNacionais,
  type EstadoNacional,
} from "@/data/atendimentoNacional";

interface Props {
  regiaoSlug?: string;
  estadoSlug?: string;
}

const heroPorFoco = { agro: heroAgro, empresas: heroEmpresa, logistica: heroFrota } as const;
const heroPorRegiao: Record<string, string> = {
  sul: heroRural,
  sudeste: heroEmpresa,
  "centro-oeste": heroAgro,
  nordeste: heroRural,
  norte: heroFrota,
};

const coberturas = [
  { title: "Agronegócio", description: "Seguro rural, máquinas e implementos agrícolas, drones (casco e RETA) e transporte da produção." },
  { title: "Transporte e frotas", description: "Frotas de veículos, caminhões e acidentes pessoais de passageiros para quem transporta pessoas." },
  { title: "Empresas", description: "Seguro empresarial para comércio, indústria e serviços, responsabilidade civil e seguro cyber." },
  { title: "Saúde PME e benefícios", description: "Plano de saúde empresarial para equipes, com apoio em movimentações e renovações." },
  { title: "Pessoas", description: "Seguro auto e consórcio para quem prefere atendimento consultivo a distância." },
];

const como = [
  { step: "1", title: "Conte sua necessidade", description: "Fale pelo WhatsApp, e-mail ou videochamada sobre a atividade e os bens a proteger." },
  { step: "2", title: "Análise do risco", description: "Levantamos os dados necessários e verificamos quais seguradoras aceitam o risco na sua localidade." },
  { step: "3", title: "Compare as propostas", description: "Apresentamos coberturas, limites, franquias e exclusões lado a lado, sem preço tabelado." },
  { step: "4", title: "Contratação e pós-venda", description: "Apólice digital, acompanhamento de renovações e suporte em sinistros, tudo a distância." },
];

const faqsBase = (local: string) => [
  {
    question: `A Patro Seguros atende em ${local} sem escritório local?`,
    answer: "Sim. O atendimento é remoto, por WhatsApp, e-mail e videochamada. A apólice é emitida pela seguradora escolhida, e a disponibilidade de cada produto é confirmada na cotação.",
  },
  {
    question: "Como é feita a vistoria à distância?",
    answer: "Depende do produto e da seguradora: pode ser por aplicativo, por fotos ou por empresa credenciada da seguradora na sua cidade. Informamos o procedimento na cotação.",
  },
  {
    question: "Quem me atende em caso de sinistro?",
    answer: "Você aciona seu consultor da Patro pelo WhatsApp e também pode usar a central da seguradora. Orientamos a documentação e acompanhamos o processo até a conclusão.",
  },
  {
    question: `Quanto custa o seguro em ${local}?`,
    answer: "O valor depende de análise do risco: atividade, bens, localização, histórico e coberturas escolhidas. Não publicamos preço tabelado; a cotação compara seguradoras parceiras.",
  },
  {
    question: "A Patro é uma corretora registrada?",
    answer: "Sim. A Patro Seguros é corretora registrada na SUSEP sob o código 212113511, com sede em Guarulhos/SP.",
  },
];

const whyPatro = [
  "Atendimento consultivo e remoto em todo o Brasil",
  "Comparação entre seguradoras parceiras com atuação nacional",
  "Experiência em agro, transporte, empresas e saúde PME",
  "Acompanhamento humano antes e depois da contratação",
  "Corretora registrada na SUSEP sob o código 212113511",
];

const related = [
  { title: "Seguro Rural", link: "/seguro-rural" },
  { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
  { title: "Seguro Drone", link: "/seguro-drone" },
  { title: "Seguro Frota", link: "/seguro-frota" },
  { title: "Seguro Empresarial", link: "/seguro-empresarial" },
  { title: "Plano de Saúde Empresarial", link: "/plano-saude-empresarial" },
];

const Cidades = ({ estado }: { estado: EstadoNacional }) => (
  <div className="rounded-lg border border-border bg-card p-5">
    <h3 className="font-semibold text-foreground mb-2">
      <Link to={estadoPath(estado.slug)} className="hover:text-primary inline-flex items-center gap-1">
        {estado.nome} ({estado.uf}) <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </Link>
    </h3>
    <p className="text-sm text-muted-foreground">{estado.cidades.join(", ")}</p>
  </div>
);

const ProdutosLinks = () => (
  <ul className="flex flex-wrap gap-2">
    {produtosNacionais.map((p) => (
      <li key={p.href}>
        <Link to={p.href} className="rounded-full bg-muted px-3 py-1 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
          {p.label}
        </Link>
      </li>
    ))}
  </ul>
);

const SeguroRegiaoEstado = ({ regiaoSlug, estadoSlug }: Props) => {
  const estado = estadoSlug ? estadosNacionais.find((x) => x.slug === estadoSlug) : undefined;
  const regiao = regioesNacionais.find((r) => r.slug === (estado?.regiao ?? regiaoSlug));
  if (!regiao) return null;

  if (estado) {
    const vizinhos = estadosDaRegiao(regiao.slug).filter((x) => x.slug !== estado.slug);
    return (
      <InsurancePageTemplate
        localSeo={{ skip: true }}
        heroImage={heroPorFoco[estado.foco]}
        title={`Seguros em ${estado.nome} (${estado.uf}) | Agro, Frotas e Empresas | Patro`}
        headline={`Seguros em ${estado.nome}`}
        subtitle={`Atendimento remoto para produtores, transportadoras e empresas de ${estado.nome}, com comparação entre seguradoras.`}
        icon="📍"
        badge={`${regiao.nome} • ${estado.uf}`}
        metaDescription={`Seguros em ${estado.nome} (${estado.uf}): rural, máquinas agrícolas, drones, frotas, empresarial e saúde PME. Atendimento remoto da Patro Seguros, sem preço tabelado.`}
        description={`${estado.perfil} A Patro Seguros atende clientes de ${estado.nome} de forma remota, com análise do risco e comparação entre seguradoras parceiras.`}
        detailedDescription={`## Atendimento a distância em ${estado.nome}

Com sede em Guarulhos/SP, a Patro Seguros atende ${estado.nome} por WhatsApp, e-mail e videochamada. A análise do risco, a comparação de propostas, a contratação e o pós-venda são feitos sem que você precise se deslocar.

## Disponibilidade por município

Cada seguradora define as regiões em que aceita cada tipo de risco. Por isso, confirmamos na cotação quais produtos e seguradoras estão disponíveis para a sua cidade em ${estado.nome}.`}
        howItWorks={como}
        coverages={coberturas}
        whoNeeds={[
          `Produtores rurais e cooperados de ${estado.nome}`,
          "Operadores de drones agrícolas e prestadores de serviço",
          "Transportadoras e empresas com frota própria",
          "Empresas de comércio, indústria e serviços",
          "Empresas que querem plano de saúde para a equipe",
        ]}
        whyPatro={whyPatro}
        faqs={faqsBase(estado.nome)}
        relatedInsurances={related}
        quoteUrl="/cotacao"
        quoteCtaText={`Pedir cotação em ${estado.nome}`}
        extraSections={
          <section aria-labelledby="cidades-estado-heading" className="space-y-6">
            <h2 id="cidades-estado-heading" className="text-2xl md:text-3xl font-bold text-foreground inline-flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" aria-hidden="true" /> Cidades de referência em {estado.nome}
            </h2>
            <p className="text-muted-foreground">
              {estado.cidades.join(", ")}. Atendemos também os demais municípios do estado, sempre de forma remota.
            </p>
            <h3 className="font-semibold text-foreground">Seguros disponíveis</h3>
            <ProdutosLinks />
            {vizinhos.length > 0 && (
              <>
                <h3 className="font-semibold text-foreground">Outros estados da {regiao.nome}</h3>
                <ul className="flex flex-wrap gap-3">
                  {vizinhos.map((v) => (
                    <li key={v.slug}>
                      <Link to={estadoPath(v.slug)} className="text-primary hover:underline">Seguros em {v.nome}</Link>
                    </li>
                  ))}
                  <li>
                    <Link to={regiaoPath(regiao.slug)} className="text-primary hover:underline">{regiao.titulo}</Link>
                  </li>
                </ul>
              </>
            )}
          </section>
        }
      />
    );
  }

  const estados = estadosDaRegiao(regiao.slug);
  const outras = regioesNacionais.filter((r) => r.slug !== regiao.slug);
  return (
    <InsurancePageTemplate
      localSeo={{ skip: true }}
      heroImage={heroPorRegiao[regiao.slug]}
      title={`${regiao.titulo} | Agro, Frotas e Empresas | Patro Seguros`}
      headline={regiao.titulo}
      subtitle={regiao.resumo}
      icon="🗺️"
      badge={estados.map((x) => x.uf).join(" • ")}
      metaDescription={`${regiao.titulo}: ${regiao.resumo} Atendimento remoto da Patro Seguros, com cotação comparando seguradoras.`}
      description={regiao.intro.join(" ")}
      detailedDescription={`## Mais procurados na ${regiao.nome}

${regiao.destaques.map((d) => `- ${d}`).join("\n")}

## Disponibilidade por município

A disponibilidade de cada produto e seguradora varia conforme a localidade. Confirmamos isso na cotação, antes de qualquer contratação.`}
      howItWorks={como}
      coverages={coberturas}
      whoNeeds={[
        "Produtores rurais e cooperativas",
        "Operadores de drones agrícolas",
        "Transportadoras e empresas com frota",
        "Empresas de comércio, indústria e serviços",
        "Empresas que querem plano de saúde para a equipe",
      ]}
      whyPatro={whyPatro}
      faqs={regiao.faqs}
      relatedInsurances={related}
      quoteUrl="/cotacao"
      quoteCtaText={`Pedir cotação na ${regiao.nome}`}
      extraSections={
        <section aria-labelledby="estados-regiao-heading" className="space-y-6">
          <h2 id="estados-regiao-heading" className="text-2xl md:text-3xl font-bold text-foreground">
            Estados e cidades atendidos na {regiao.nome}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {estados.map((x) => (
              <Cidades key={x.slug} estado={x} />
            ))}
          </div>
          <h3 className="font-semibold text-foreground">Outras regiões</h3>
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
        </section>
      }
    />
  );
};

export default SeguroRegiaoEstado;
