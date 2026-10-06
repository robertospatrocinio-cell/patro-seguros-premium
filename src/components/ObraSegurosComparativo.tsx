import { Link, useLocation } from "react-router-dom";
import { ArrowRight, HardHat, FileCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  {
    to: "/seguro-engenharia",
    Icon: HardHat,
    title: "Seguro de Engenharia",
    question: "E se a própria obra for danificada?",
    text: "Protege os bens da obra ou da montagem — estruturas, materiais e equipamentos descritos — contra acidentes cobertos.",
  },
  {
    to: "/seguro-garantia",
    Icon: FileCheck,
    title: "Seguro Garantia",
    question: "E se o contrato não for cumprido?",
    text: "Garante ao contratante as obrigações previstas no contrato ou edital, como prazo e execução. Não cobre danos à obra.",
  },
  {
    to: "/seguro-rc-obras",
    Icon: Users,
    title: "Responsabilidade Civil de Obras",
    question: "E se a obra causar danos a outras pessoas?",
    text: "Ampara reclamações de terceiros — vizinhos, pedestres, visitantes — por danos materiais ou corporais cobertos.",
  },
];

const ObraSegurosComparativo = () => {
  const { pathname } = useLocation();
  return (
    <section id="seguros-da-obra" className="py-16 bg-muted/40" aria-labelledby="seguros-obra-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <h2 id="seguros-obra-heading" className="text-2xl md:text-3xl mb-3">Engenharia, Garantia ou Responsabilidade Civil?</h2>
          <p className="text-muted-foreground">
            Numa mesma obra, os três seguros atendem necessidades diferentes e podem ser contratados juntos. Veja por onde começar.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map(({ to, Icon, title, question, text }) => {
            const atual = pathname === to;
            return (
              <div key={to} className={`rounded-2xl border bg-card p-6 flex flex-col ${atual ? "border-primary ring-1 ring-primary" : ""}`}>
                <Icon className="h-7 w-7 text-primary mb-3" aria-hidden="true" />
                <h3 className="text-lg font-bold mb-1">{title}</h3>
                <p className="text-sm font-semibold text-primary mb-2">{question}</p>
                <p className="text-sm text-muted-foreground flex-1">{text}</p>
                {atual ? (
                  <span className="mt-4 text-sm font-semibold text-muted-foreground">Você está nesta página</span>
                ) : (
                  <Button asChild variant="outline" className="mt-4 justify-between">
                    <Link to={to}>Ver {title} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ObraSegurosComparativo;
