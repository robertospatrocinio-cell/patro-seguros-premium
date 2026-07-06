/**
 * AutoridadePatro — Bloco reutilizável de E-E-A-T.
 *
 * Exibe: foto dos fundadores + nome + cargo, credenciais (SUSEP/CNPJ),
 * 4 estatísticas-chave e link para a página "Sobre". Reforça
 * Experience / Expertise / Authoritativeness / Trustworthiness para SEO
 * e conversão.
 *
 * Uso:
 *   <AutoridadePatro />
 *   <AutoridadePatro variant="compact" />
 *
 * Fonte de dados: hardcoded aqui (institucional estável). Atualize
 * SUSEP/CNPJ/ano-fundação neste único arquivo para propagar em todo o site.
 */

import { Link } from "react-router-dom";
import { ShieldCheck, Award, Users, Building2, ArrowRight } from "lucide-react";
import roberto from "@/assets/socio-roberto.webp";
import sandra from "@/assets/socia-sandra.webp";

const CREDENCIAIS = {
  susep: "SUSEP nº 212113511",
  cnpj: "CNPJ 41.641.558/0001-33",
  fundacao: 2010,
  sede: "Cidade Maia, Guarulhos/SP",
} as const;

const STATS: Array<{ icon: typeof ShieldCheck; value: string; label: string }> = [
  { icon: Users,      value: "2.500+", label: "Clientes atendidos" },
  { icon: Building2,  value: "16+",    label: "Seguradoras parceiras" },
  { icon: Award,      value: "15+",    label: "Anos de mercado" },
  { icon: ShieldCheck, value: "100%",  label: "Registrada na SUSEP" },
];

type Variant = "default" | "compact";

interface AutoridadePatroProps {
  variant?: Variant;
  className?: string;
  /** Título principal (sobrescreve o padrão). */
  heading?: string;
  /** Texto de apoio (sobrescreve o padrão). */
  copy?: string;
}

const AutoridadePatro = ({
  variant = "default",
  className,
  heading = "Quem cuida do seu seguro na Patro",
  copy = "Corretora familiar em Guarulhos, fundada por Roberto e Sandra Patrocínio. Atendimento consultivo, orientação sem pressão para contratar e presença física no Cidade Maia — quem responde é quem te acompanha.",
}: AutoridadePatroProps) => {
  const isCompact = variant === "compact";

  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm ${className ?? ""}`}
      aria-labelledby="autoridade-patro-heading"
    >
      <div className={`grid gap-6 ${isCompact ? "md:grid-cols-[auto,1fr]" : "md:grid-cols-[auto,1fr]"} items-start`}>
        {/* Fotos dos fundadores */}
        <div className="flex -space-x-3 md:-space-x-4 flex-shrink-0">
          <img
            src={roberto}
            alt="Roberto Patrocínio — sócio-fundador da Patro Seguros"
            width={72}
            height={72}
            loading="lazy"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover object-top ring-4 ring-white shadow-md"
          />
          <img
            src={sandra}
            alt="Sandra Patrocínio — sócia-fundadora da Patro Seguros"
            width={72}
            height={72}
            loading="lazy"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover object-top ring-4 ring-white shadow-md"
          />
        </div>

        {/* Texto principal */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-primary/80 mb-1.5">
            Autoridade & Confiança
          </p>
          <h2
            id="autoridade-patro-heading"
            className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-2"
          >
            {heading}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{copy}</p>

          {/* Credenciais */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground font-medium">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-600" aria-hidden="true" />
              {CREDENCIAIS.susep}
            </span>
            <span>{CREDENCIAIS.cnpj}</span>
            <span>Desde {CREDENCIAIS.fundacao}</span>
            <span>Sede: {CREDENCIAIS.sede}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      {!isCompact && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-3 text-center"
            >
              <Icon className="mx-auto h-4 w-4 text-primary mb-1.5" aria-hidden="true" />
              <div className="text-lg font-bold text-foreground leading-none">{value}</div>
              <div className="mt-1 text-[11px] text-muted-foreground leading-tight">{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Link "Sobre" */}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Link
          to="/sobre"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline underline-offset-4"
        >
          Conhecer a história da Patro <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        <a
          href="https://www2.susep.gov.br/safe/menumercado/regcorretores/pesquisa.asp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary hover:underline underline-offset-4"
        >
          Consultar registro na SUSEP →
        </a>
      </div>
    </section>
  );
};

export default AutoridadePatro;