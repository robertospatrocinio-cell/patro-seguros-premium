import { MessageCircle, Radio, CheckCircle2, MapPin } from "lucide-react";

const steps = [
  {
    title: "Minuto 0 — Acionamento Imediato",
    description: "Contato direto com seu consultor via WhatsApp, com orientação passo a passo sobre boletim e segurança, sem você precisar decifrar apólices sozinho.",
    Icon: MessageCircle,
  },
  {
    title: "Atuação Rápida",
    description: "Nossa equipe aciona a seguradora, intermedia guincho, socorro ou oficina credenciada e acompanha a vistoria técnica.",
    Icon: Radio,
  },
  {
    title: "Resolução sem Burocracia",
    description: "Monitoramento de prazos até a entrega do veículo ou pagamento de indenização integral.",
    Icon: CheckCircle2,
  },
];

interface ClaimsSupportTimelineProps {
  compact?: boolean;
}

const ClaimsSupportTimeline = ({ compact = false }: ClaimsSupportTimelineProps) => (
  <section className={`${compact ? "py-14" : "py-16 md:py-20"} bg-background`} aria-labelledby={compact ? "home-sinistro-timeline" : "sinistro-timeline"}>
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="section-label">Suporte humano no sinistro</span>
        <h2 id={compact ? "home-sinistro-timeline" : "sinistro-timeline"} className="mt-3 text-2xl md:text-3xl">
          Como estamos ao seu lado quando o imprevisto acontece
        </h2>
      </div>
      <ol className="grid gap-4 md:grid-cols-3 list-none">
        {steps.map(({ title, description, Icon }, index) => (
          <li key={title} className="premium-card p-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm" aria-hidden="true">
                {index + 1}
              </span>
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex items-start gap-2 rounded-lg border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-foreground">
        <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
        <p className="font-medium">Especialistas em suporte para frotas, caminhões e galpões logísticos na região da Dutra, Ayrton Senna e polos industriais.</p>
      </div>
    </div>
  </section>
);

export default ClaimsSupportTimeline;