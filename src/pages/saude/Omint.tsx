import HealthPlanTemplate from "@/components/HealthPlanTemplate";
import { getOperadora, TRANSPARENCY_NOTICE } from "@/data/saudeVertical";

const Omint = () => {
  const op = getOperadora("omint")!;
  return (
    <HealthPlanTemplate
      operator={op.name}
      accentColor={op.accentColor}
      description={`${op.shortDescription} ${TRANSPARENCY_NOTICE(op.name)}`}
      benefits={[
        "Rede referenciada premium em SP e uso em Guarulhos",
        "Reembolso amplo em rede livre, conforme tabela contratual",
        "Portfólio familiar, PME e corporativo",
        "Atendimento diferenciado para executivos e famílias premium",
        "Programas de coordenação e telemedicina em produtos selecionados",
      ]}
      faqs={op.faqs.map((f) => ({ q: f.question, a: f.answer }))}
    />
  );
};

export default Omint;