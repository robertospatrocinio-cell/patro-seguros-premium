import HealthPlanTemplate from "@/components/HealthPlanTemplate";
import { getOperadora, TRANSPARENCY_NOTICE } from "@/data/saudeVertical";

const CarePlus = () => {
  const op = getOperadora("care-plus")!;
  return (
    <HealthPlanTemplate
      operator={op.name}
      accentColor={op.accentColor}
      description={`${op.shortDescription} ${TRANSPARENCY_NOTICE(op.name)}`}
      benefits={[
        "Rede referenciada premium em SP com uso por beneficiários de Guarulhos",
        "Foco corporativo e PME de porte acima de determinada faixa",
        "Programas de wellness e coordenação de cuidado",
        "Portfólio orientado a executivos e famílias premium",
        "Atendimento diferenciado e telemedicina em produtos específicos",
      ]}
      faqs={op.faqs.map((f) => ({ q: f.question, a: f.answer }))}
    />
  );
};

export default CarePlus;