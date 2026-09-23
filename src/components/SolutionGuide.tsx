import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Building2, Wheat, Car, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type InsuranceType = "Auto" | "Uber" | "Saude" | "Vida" | "Residencial" | "Empresarial";

interface Solution {
  label: string;
  insuranceType?: InsuranceType;
  href?: string;
}

const profiles = [
  {
    id: "familia",
    label: "Para Mim e Minha Família",
    Icon: UserRound,
    solutions: [
      { label: "Seguro Auto", insuranceType: "Auto" },
      { label: "Seguro Moto", href: "/seguro-moto" },
      { label: "Seguro Residencial", insuranceType: "Residencial" },
      { label: "Plano de Saúde", insuranceType: "Saude" },
      { label: "Seguro Celular", href: "/seguro-celular" },
    ] satisfies Solution[],
  },
  {
    id: "empresa",
    label: "Para Minha Empresa ou Logística",
    Icon: Building2,
    solutions: [
      { label: "Seguro Frota", href: "/seguro-frota" },
      { label: "Seguro de Cargas", href: "/seguro-transporte" },
      { label: "Seguro para Galpões", href: "/seguro-galpoes-industriais" },
      { label: "Saúde PME", insuranceType: "Empresarial" },
      { label: "Seguro Cyber", href: "/seguro-cyber" },
    ] satisfies Solution[],
  },
  {
    id: "agro",
    label: "Para o Agronegócio",
    Icon: Wheat,
    solutions: [
      { label: "Tratores e Máquinas Agrícolas", href: "/seguro-maquinas-agricolas" },
      { label: "Seguro Rural", href: "/seguro-rural" },
      { label: "Transporte Agro", href: "/seguro-transporte-agro" },
    ] satisfies Solution[],
  },
  {
    id: "app",
    label: "Motorista de App / Uber",
    Icon: Car,
    solutions: [
      { label: "Cobertura para passageiros (APP)", insuranceType: "Uber" },
      { label: "Cobertura para terceiros", insuranceType: "Uber" },
      { label: "Carro reserva prolongado", insuranceType: "Uber" },
    ] satisfies Solution[],
  },
] as const;

interface SolutionGuideProps {
  onSelectInsuranceType: (type: InsuranceType) => void;
}

const SolutionGuide = ({ onSelectInsuranceType }: SolutionGuideProps) => {
  const [activeId, setActiveId] = useState(profiles[0].id);
  const active = profiles.find((profile) => profile.id === activeId) ?? profiles[0];

  const selectType = (type: InsuranceType) => {
    onSelectInsuranceType(type);
    window.requestAnimationFrame(() => {
      document.getElementById("cotacao-express")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  return (
    <section className="py-14 bg-background border-t" aria-labelledby="guia-solucoes-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <span className="section-label">Guia rápido de soluções</span>
          <h2 id="guia-solucoes-heading" className="mt-3 text-2xl md:text-3xl">O que você precisa proteger hoje?</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Perfis de proteção">
          {profiles.map(({ id, label, Icon }) => (
            <Button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeId === id}
              aria-controls="guia-solucoes-panel"
              variant={activeId === id ? "default" : "outline"}
              onClick={() => setActiveId(id)}
              className="h-auto min-h-10 whitespace-normal text-center"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </Button>
          ))}
        </div>

        <div id="guia-solucoes-panel" role="tabpanel" className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {active.solutions.map((solution) =>
            solution.insuranceType ? (
              <Button
                key={solution.label}
                type="button"
                variant="outline"
                className="h-12 justify-between px-4"
                onClick={() => selectType(solution.insuranceType)}
              >
                {solution.label}
                <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
              </Button>
            ) : (
              <Button key={solution.label} asChild variant="outline" className="h-12 justify-between px-4">
                <Link to={solution.href ?? "/servicos"}>
                  {solution.label}
                  <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
                </Link>
              </Button>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default SolutionGuide;