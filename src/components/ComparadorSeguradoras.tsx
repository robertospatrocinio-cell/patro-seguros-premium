import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Comparador interativo de seguradoras parceiras (Guarulhos/SP).
 *
 * Nota jurídica/marca: a Patro Seguros NÃO é site oficial das seguradoras
 * listadas. As avaliações abaixo são qualitativas, baseadas em características
 * públicas de cada operadora (portfólio, rede referenciada, serviços, presença
 * em Guarulhos e Grande SP) — não representam ranking, preço, aprovação ou
 * garantia de aceitação, que dependem de perfil e regras vigentes.
 */

type Nivel = "alto" | "medio" | "focado";

interface LinhaCriterio {
  id: string;
  titulo: string;
  descricao: string;
}

const CRITERIOS: LinhaCriterio[] = [
  {
    id: "cobertura",
    titulo: "Cobertura × franquia",
    descricao:
      "Amplitude de coberturas contratáveis (compreensiva, RCF-V, APP, vidros) e flexibilidade de franquia.",
  },
  {
    id: "servicos",
    titulo: "Serviços agregados",
    descricao:
      "Guincho, carro reserva, chaveiro, assistência 24h, residencial e conveniência.",
  },
  {
    id: "sinistro",
    titulo: "Regulação de sinistro",
    descricao:
      "Estrutura e agilidade de vistoria, oficinas homologadas e canais de acompanhamento.",
  },
  {
    id: "rede",
    titulo: "Rede referenciada em Guarulhos/SP",
    descricao:
      "Presença de oficinas, clínicas e prestadores próximos aos principais bairros de Guarulhos e Grande SP.",
  },
  {
    id: "reputacao",
    titulo: "Reputação e maturidade de marca",
    descricao:
      "Tempo de mercado no Brasil, presença nacional e reconhecimento junto ao consumidor.",
  },
];

interface SeguradoraComparativo {
  slug: string;
  nome: string;
  perfil: string;
  destaque: string;
  niveis: Record<string, Nivel>;
}

/**
 * Avaliações qualitativas por seguradora. Escala:
 *  - "alto"  = amplitude/rede/serviços amplos e consolidados
 *  - "medio" = oferta equilibrada, sem grande especialização
 *  - "focado"= atuação mais nichada (perfis específicos, produtos específicos)
 */
const SEGURADORAS: SeguradoraComparativo[] = [
  {
    slug: "porto-seguro-guarulhos",
    nome: "Porto Seguro",
    perfil: "Ampla • grandes centros",
    destaque: "Rede referenciada extensa em SP e serviços agregados robustos.",
    niveis: { cobertura: "alto", servicos: "alto", sinistro: "alto", rede: "alto", reputacao: "alto" },
  },
  {
    slug: "mapfre-seguros-guarulhos",
    nome: "Mapfre",
    perfil: "Ampla • multinacional",
    destaque: "Portfólio amplo em auto, residencial, vida e empresarial.",
    niveis: { cobertura: "alto", servicos: "medio", sinistro: "medio", rede: "alto", reputacao: "alto" },
  },
  {
    slug: "allianz-seguros-guarulhos",
    nome: "Allianz",
    perfil: "Ampla • premium",
    destaque: "Coberturas robustas e forte atuação em veículos de maior valor.",
    niveis: { cobertura: "alto", servicos: "alto", sinistro: "alto", rede: "medio", reputacao: "alto" },
  },
  {
    slug: "tokio-marine-guarulhos",
    nome: "Tokio Marine",
    perfil: "Ampla • familiar",
    destaque: "Boa aceitação de perfis diversos e serviços de conveniência.",
    niveis: { cobertura: "alto", servicos: "alto", sinistro: "alto", rede: "medio", reputacao: "alto" },
  },
  {
    slug: "azul-seguros-guarulhos",
    nome: "Azul Seguros",
    perfil: "Custo-benefício",
    destaque: "Foco em preço competitivo com serviços essenciais.",
    niveis: { cobertura: "medio", servicos: "medio", sinistro: "medio", rede: "medio", reputacao: "alto" },
  },
  {
    slug: "suhai-seguros-guarulhos",
    nome: "Suhai",
    perfil: "Focada • roubo/furto",
    destaque: "Especializada em roubo, furto e colisão para perfis específicos.",
    niveis: { cobertura: "focado", servicos: "focado", sinistro: "medio", rede: "focado", reputacao: "medio" },
  },
  {
    slug: "bradesco-seguros-guarulhos",
    nome: "Bradesco Seguros",
    perfil: "Ampla • bancária",
    destaque: "Portfólio integrado ao grupo Bradesco e forte em vida/saúde.",
    niveis: { cobertura: "alto", servicos: "medio", sinistro: "medio", rede: "alto", reputacao: "alto" },
  },
  {
    slug: "sulamerica-seguros-guarulhos",
    nome: "SulAmérica",
    perfil: "Vida/saúde • ampla",
    destaque: "Referência em saúde e vida, complementada por auto e patrimonial.",
    niveis: { cobertura: "alto", servicos: "medio", sinistro: "medio", rede: "alto", reputacao: "alto" },
  },
  {
    slug: "hdi-seguros-guarulhos",
    nome: "HDI Seguros",
    perfil: "Auto • flexível",
    destaque: "Boa flexibilidade em auto e franquias diferenciadas.",
    niveis: { cobertura: "alto", servicos: "medio", sinistro: "medio", rede: "medio", reputacao: "alto" },
  },
  {
    slug: "liberty-seguros-guarulhos",
    nome: "Liberty Seguros",
    perfil: "Auto • personalização",
    destaque: "Coberturas modulares e planos personalizáveis para auto.",
    niveis: { cobertura: "alto", servicos: "medio", sinistro: "medio", rede: "medio", reputacao: "alto" },
  },
  {
    slug: "zurich-seguros-guarulhos",
    nome: "Zurich",
    perfil: "Ampla • corporativa",
    destaque: "Forte atuação em riscos corporativos e apólices patrimoniais.",
    niveis: { cobertura: "alto", servicos: "medio", sinistro: "alto", rede: "medio", reputacao: "alto" },
  },
  {
    slug: "sompo-seguros-guarulhos",
    nome: "Sompo Seguros",
    perfil: "Ampla • multinacional",
    destaque: "Presença global e portfólio completo em auto e patrimonial.",
    niveis: { cobertura: "alto", servicos: "medio", sinistro: "medio", rede: "medio", reputacao: "alto" },
  },
];

const NIVEL_LABEL: Record<Nivel, string> = {
  alto: "Amplo",
  medio: "Médio",
  focado: "Focado",
};

const NIVEL_STYLE: Record<Nivel, string> = {
  alto: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  medio: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  focado: "bg-sky-500/10 text-sky-700 border-sky-500/20",
};

const NIVEL_ICON: Record<Nivel, JSX.Element> = {
  alto: <Check className="h-3.5 w-3.5" aria-hidden="true" />,
  medio: <Minus className="h-3.5 w-3.5" aria-hidden="true" />,
  focado: <X className="h-3.5 w-3.5" aria-hidden="true" />,
};

const MAX_COMPARAR = 3;
const DEFAULT_SELECAO = ["porto-seguro-guarulhos", "tokio-marine-guarulhos", "azul-seguros-guarulhos"];

const ComparadorSeguradoras = () => {
  const [selecionadas, setSelecionadas] = useState<string[]>(DEFAULT_SELECAO);

  const toggle = (slug: string) => {
    setSelecionadas((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARAR) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  };

  const seguradorasSelecionadas = useMemo(
    () => SEGURADORAS.filter((s) => selecionadas.includes(s.slug)),
    [selecionadas],
  );

  return (
    <div className="space-y-6">
      {/* Seletor */}
      <div>
        <div className="flex items-baseline justify-between mb-3 gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">
            Escolha até <strong>{MAX_COMPARAR}</strong> seguradoras para comparar lado a lado.
          </p>
          <span className="text-xs text-muted-foreground">
            {selecionadas.length}/{MAX_COMPARAR} selecionadas
          </span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Selecionar seguradoras para comparar">
          {SEGURADORAS.map((s) => {
            const ativo = selecionadas.includes(s.slug);
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => toggle(s.slug)}
                aria-pressed={ativo}
                className={[
                  "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
                  ativo
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:border-primary/50",
                ].join(" ")}
              >
                {s.nome}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabela comparativa */}
      {seguradorasSelecionadas.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          Selecione ao menos uma seguradora acima para ver a comparação.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-background">
          <table className="w-full text-sm border-collapse">
            <caption className="sr-only">
              Comparativo qualitativo entre seguradoras parceiras da Patro Seguros em Guarulhos e São Paulo.
            </caption>
            <thead>
              <tr className="bg-muted/40">
                <th scope="col" className="text-left p-3 font-semibold w-[220px] border-b">
                  Critério
                </th>
                {seguradorasSelecionadas.map((s) => (
                  <th key={s.slug} scope="col" className="text-left p-3 font-semibold border-b border-l">
                    <div className="font-bold text-foreground">{s.nome}</div>
                    <div className="text-xs font-normal text-muted-foreground">{s.perfil}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CRITERIOS.map((c) => (
                <tr key={c.id} className="border-b last:border-b-0">
                  <th scope="row" className="text-left p-3 align-top font-medium">
                    <div>{c.titulo}</div>
                    <div className="text-xs font-normal text-muted-foreground mt-1">{c.descricao}</div>
                  </th>
                  {seguradorasSelecionadas.map((s) => {
                    const nivel = s.niveis[c.id];
                    return (
                      <td key={s.slug} className="p-3 align-top border-l">
                        <span
                          className={[
                            "inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium",
                            NIVEL_STYLE[nivel],
                          ].join(" ")}
                        >
                          {NIVEL_ICON[nivel]}
                          {NIVEL_LABEL[nivel]}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="bg-muted/20">
                <th scope="row" className="text-left p-3 align-top font-medium">
                  Destaque
                </th>
                {seguradorasSelecionadas.map((s) => (
                  <td key={s.slug} className="p-3 align-top border-l text-xs text-muted-foreground">
                    {s.destaque}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="text-left p-3 align-top font-medium">
                  Página local
                </th>
                {seguradorasSelecionadas.map((s) => (
                  <td key={s.slug} className="p-3 align-top border-l border-t">
                    <Link
                      to={`/${s.slug}`}
                      className="inline-flex items-center gap-1 text-primary text-xs font-semibold hover:underline"
                    >
                      Ver página <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Legenda + disclaimer */}
      <div className="text-xs text-muted-foreground space-y-2">
        <div className="flex flex-wrap gap-3">
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border ${NIVEL_STYLE.alto}`}>
            <Check className="h-3.5 w-3.5" /> Amplo — oferta consolidada
          </span>
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border ${NIVEL_STYLE.medio}`}>
            <Minus className="h-3.5 w-3.5" /> Médio — oferta equilibrada
          </span>
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border ${NIVEL_STYLE.focado}`}>
            <X className="h-3.5 w-3.5" /> Focado — atuação nichada
          </span>
        </div>
        <p>
          Comparativo qualitativo produzido pela Patro Seguros com base em características públicas
          de portfólio, rede e serviços de cada seguradora. Não representa ranking, preço, aceitação
          garantida nem opinião oficial das operadoras. Preço e aprovação dependem do perfil, veículo,
          CEP e regras vigentes em cada cotação.
        </p>
      </div>

      <div className="flex justify-center">
        <Button asChild size="lg">
          <Link to="/cotacao">
            Comparar preços reais com a Patro <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ComparadorSeguradoras;