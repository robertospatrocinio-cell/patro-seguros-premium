import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { catalogoSeguros, CATALOGO_PATH } from "@/data/catalogoSeguros";
import { CANONICAL_BASE_URL, getCanonicalUrl } from "@/lib/canonical";
import { EXACT_REDIRECTS } from "@/lib/redirects";

const especialidades = [
  {
    title: "Máquinas agrícolas e implementos",
    text: "Tratores, colheitadeiras e pulverizadores precisam de análise do uso, valor, transporte entre propriedades e eventual financiamento. Danos à máquina, quebra mecânica e responsabilidade civil não são automaticamente a mesma cobertura.",
    links: [
      { to: "/seguro-maquinas-agricolas", label: "Seguro de máquinas agrícolas" },
      { to: "/seguro-trator-agricola", label: "Seguro de trator agrícola" },
      { to: "/seguro-colheitadeira-graos", label: "Seguro de colheitadeira de grãos" },
      { to: "/seguro-pulverizador-agricola", label: "Seguro de pulverizador agrícola" },
    ],
  },
  {
    title: "Linha amarela e equipamentos",
    text: "Escavadeiras, retroescavadeiras e equipamentos industriais exigem avaliação do local de operação, deslocamentos e uso próprio ou locação. Informe se a máquina trabalha em obras, em diferentes locais ou sob responsabilidade de terceiros.",
    links: [
      { to: "/seguro-maquinas-linha-amarela", label: "Seguro de máquinas de linha amarela" },
      { to: "/seguro-maquinas-industriais", label: "Seguro de máquinas industriais" },
      { to: "/seguro-locadoras-equipamentos", label: "Seguro para locadoras de equipamentos" },
      { to: "/seguro-maquinas", label: "Máquinas e equipamentos: visão geral" },
    ],
  },
  {
    title: "Drones: casco, RETA e uso agrícola",
    text: "Casco protege o próprio drone contra os eventos contratados. RETA trata de responsabilidade por danos a terceiros e não substitui o casco. Na pulverização, danos por deriva e outros riscos da atividade exigem análise específica; não presuma que estejam incluídos.",
    links: [
      { to: "/seguro-drone", label: "Seguro de drone: opções de proteção" },
      { to: "/seguro-drone-agricola", label: "Casco de drone agrícola" },
      { to: "/seguro-reta-drone", label: "RETA drone: responsabilidade civil" },
    ],
  },
];

export function buildCatalogCollectionSchema() {
  const url = getCanonicalUrl(CATALOGO_PATH);
  const items = catalogoSeguros.flatMap((group) => group.items);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: "Todos os seguros, planos de saúde e consórcio — Patro Seguros",
    description: "Catálogo de produtos com atendimento em Guarulhos e Grande São Paulo e especialidades em máquinas, equipamentos e drones.",
    inLanguage: "pt-BR",
    publisher: { "@id": `${CANONICAL_BASE_URL}/#insurance-agency` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem", position: index + 1,
        name: item.label,
        url: getCanonicalUrl(EXACT_REDIRECTS.find((rule) => rule.from === item.to)?.to ?? item.to),
      })),
    },
  };
}

export default function EspecialidadesPatro({ catalog = false, pathname }: { catalog?: boolean; pathname?: string }) {
  const path = pathname?.replace(/\/+$/, "");
  if (path && !catalogoSeguros.find((group) => group.id === "maquinas")?.items.some((item) => item.to === path)) return null;
  return (
    <section className="py-12 border-t bg-muted/30" aria-labelledby="especialidades-patro-heading">
      {catalog && <Helmet><script type="application/ld+json">{JSON.stringify(buildCatalogCollectionSchema()).replace(/</g, "\\u003c")}</script></Helmet>}
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 id="especialidades-patro-heading" className="text-2xl md:text-3xl font-bold mb-4">Especialidades da Patro: da operação ao seguro</h2>
        <p className="text-muted-foreground mb-6 max-w-4xl">A Patro Seguros é uma corretora com sede em Guarulhos e atendimento consultivo na Grande São Paulo. Em máquinas agrícolas, atende também produtores de todo o Brasil por canais digitais. O local do bem e o tipo de operação orientam a análise — a sede da corretora não limita a localização do risco.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {especialidades.map((group) => (
            <article key={group.title} className="rounded-xl border bg-card p-5">
              <h3 className="text-lg font-semibold mb-3">{group.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{group.text}</p>
              <ul className="space-y-2">
                {group.links.filter((link) => link.to !== path).map((link) => <li key={link.to}><Link to={link.to} className="inline-block py-1 text-sm text-primary underline underline-offset-4">{link.label}</Link></li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-5">Aceitação, coberturas, franquias, limites e exclusões dependem da seguradora e da proposta. A contratação de seguro não substitui registros, autorizações ou regras de operação aplicáveis.</p>
        <div className="mt-8 max-w-4xl">
          <h3 className="text-lg font-semibold mb-3">Guarulhos e Grande São Paulo: como escolher</h3>
          <p className="text-muted-foreground mb-3">Para seguros, informe o CEP onde o bem fica e onde é utilizado. Em saúde, compare rede credenciada nas cidades em que precisa de atendimento, modalidade de contratação, carências e coparticipação. No consórcio, avalie crédito, prazo e taxas: a contemplação ocorre por sorteio ou lance, conforme o contrato, sem data garantida.</p>
          <nav aria-label="Atendimento regional, saúde e consórcio" className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <Link className="text-primary underline underline-offset-4" to="/seguros-guarulhos">Seguros em Guarulhos</Link>
            <Link className="text-primary underline underline-offset-4" to="/grande-sao-paulo">Atendimento na Grande São Paulo</Link>
            <Link className="text-primary underline underline-offset-4" to="/plano-de-saude-guarulhos">Planos de saúde em Guarulhos</Link>
            <Link className="text-primary underline underline-offset-4" to="/consorcio-guarulhos">Consórcio em Guarulhos</Link>
            <Link className="text-primary underline underline-offset-4" to="/contato">Sede e canais de atendimento</Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
