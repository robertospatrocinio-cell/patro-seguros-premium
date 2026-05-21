import HealthPlanTemplate from "@/components/HealthPlanTemplate";

const UnimedGuarulhos = () => {
  return (
    <HealthPlanTemplate 
      operator="Unimed"
      accentColor="#009933"
      description="A Unimed Guarulhos é uma cooperativa local com forte presença na cidade, oferecendo hospitais próprios e uma rede de médicos cooperados de todas as especialidades."
      benefits={[
        "Forte atuação regional com sede em Guarulhos",
        "Rede Hospitalar Própria (Hospital Unimed Guarulhos)",
        "Planos com abrangência nacional através do sistema Unimed",
        "Vasta lista de médicos cooperados locais",
        "Opções para planos familiares e empresariais com custo acessível"
      ]}
      faqs={[
        {
          q: "A Unimed Guarulhos é diferente da Unimed Nacional?",
          a: "Sim, a Unimed Guarulhos é a cooperativa local, mas seus planos podem oferecer atendimento em todo o Brasil através da rede de intercâmbio Unimed."
        },
        {
          q: "Qual hospital a Unimed tem em Guarulhos?",
          a: "A cooperativa possui o Hospital Unimed Guarulhos, uma das unidades mais modernas e completas da região."
        }
      ]}
    />
  );
};

export default UnimedGuarulhos;