import { Link } from "react-router-dom";
import { MessageCircle, ShieldCheck, Scale } from "lucide-react";
import { WHATSAPP_URL_BASE } from "@/config/empresa";
import { trackWhatsAppClick } from "@/lib/tracking";
import tiposImg from "@/assets/seguro-drone-tipos.jpg";

const waUrl = (msg: string) => `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(msg)}`;

const rows: { aspecto: string; casco: string; reta: string }[] = [
  {
    aspecto: "O que protege",
    casco: "O próprio drone e equipamentos embarcados (câmeras, sensores, tanques).",
    reta: "Terceiros: pessoas e bens que o drone possa atingir durante a operação.",
  },
  {
    aspecto: "Exemplos de sinistro",
    casco: "Queda, colisão, pouso forçado, roubo ou furto qualificado do equipamento.",
    reta: "Drone que atinge uma pessoa, veículo, imóvel ou lavoura vizinha.",
  },
  {
    aspecto: "Obrigatoriedade",
    casco: "Facultativo — contratado para proteger o investimento no equipamento.",
    reta: "O RBAC-E nº 94 prevê cobertura de danos a terceiros para operações de aeronaves não tripuladas acima de 250 gramas, com exceções regulatórias.",
  },
  {
    aspecto: "Quem indeniza",
    casco: "O proprietário do drone, pelo reparo ou substituição do equipamento.",
    reta: "O terceiro prejudicado, dentro dos limites e condições da apólice.",
  },
  {
    aspecto: "Uso típico",
    casco: "Drones agrícolas de pulverização e mapeamento de alto valor.",
    reta: "Qualquer operação profissional: agro, filmagem, inspeção, topografia.",
  },
];

const DroneCascoVsReta = () => (
  <section aria-labelledby="comparativo-drone-heading" className="space-y-8">
    <div className="text-center space-y-3">
      <h2 id="comparativo-drone-heading" className="text-2xl md:text-3xl font-bold text-foreground">
        Seguro Casco × Seguro RETA: qual seu drone precisa?
      </h2>
      <p className="text-muted-foreground max-w-3xl mx-auto">
        São proteções diferentes e complementares. O casco protege o equipamento; o RETA protege
        terceiros. Muitas operações profissionais precisam dos dois.
      </p>
    </div>

    <figure className="max-w-4xl mx-auto">
      <img
        src={tiposImg}
        alt="Drone de filmagem sobrevoando área urbana ao lado de drone agrícola pulverizando lavoura"
        loading="lazy"
        width={1536}
        height={1024}
        className="w-full h-auto rounded-2xl shadow-lg"
      />
    </figure>

    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">Comparação entre Seguro Casco Agrícola e Seguro RETA para drones</caption>
        <thead>
          <tr className="bg-muted/60">
            <th scope="col" className="p-4 font-semibold text-foreground">Aspecto</th>
            <th scope="col" className="p-4 font-semibold text-foreground">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                Seguro Casco (Drone Agrícola)
              </span>
            </th>
            <th scope="col" className="p-4 font-semibold text-foreground">
              <span className="inline-flex items-center gap-2">
                <Scale className="h-4 w-4 text-primary" aria-hidden="true" />
                Seguro RETA (Responsabilidade Civil)
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.aspecto} className="border-t border-border align-top">
              <th scope="row" className="p-4 font-medium text-foreground whitespace-nowrap">{row.aspecto}</th>
              <td className="p-4 text-muted-foreground">{row.casco}</td>
              <td className="p-4 text-muted-foreground">{row.reta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
      <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Precisa proteger o equipamento?</h3>
        <p className="text-sm text-muted-foreground">
          Conheça o Seguro Drone Agrícola, voltado a drones de pulverização e mapeamento de alto valor.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/seguro-drone-agricola"
            className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
          >
            Ver Seguro Drone Agrícola
          </Link>
          <a
            href={waUrl("Olá! Quero uma cotação de Seguro Casco para meu drone agrícola.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("seguro-drone:comparativo:casco", { origin: "comparativo-drone", insuranceType: "Seguro Drone Casco" })}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
            Cotar Casco no WhatsApp
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Precisa cobrir danos a terceiros?</h3>
        <p className="text-sm text-muted-foreground">
          Conheça o Seguro RETA, a responsabilidade civil aeronáutica para operações com drones.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/seguro-reta-drone"
            className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
          >
            Ver Seguro RETA Drone
          </Link>
          <a
            href={waUrl("Olá! Quero uma cotação de Seguro RETA (responsabilidade civil) para meu drone.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("seguro-drone:comparativo:reta", { origin: "comparativo-drone", insuranceType: "Seguro RETA Drone" })}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
            Cotar RETA no WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default DroneCascoVsReta;
