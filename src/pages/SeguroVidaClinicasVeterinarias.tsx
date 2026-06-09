import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { veterinariaFormFields } from "@/data/veterinariaFormConfig";
import heroImg from "@/assets/hero-seguro-vida.webp";

const SeguroVidaClinicasVeterinarias = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Vida para Clínicas Veterinárias"
      subtitle="Proteção financeira para sócios e especialistas do setor pet"
      icon="🤝"
      badge="Proteção Familiar e Societária"
      metaDescription="Seguro de Vida Empresarial para Veterinários e Equipes de Clínicas em Guarulhos. Cobertura para invalidez e doenças graves. Patro Seguros."
      description="Garanta a continuidade do seu negócio e a proteção da sua família com um seguro de vida desenhado para as particularidades da profissão veterinária."
      detailedDescription={`O seguro de vida empresarial para o setor veterinário vai muito além da cobertura de falecimento. Para o médico veterinário, as coberturas de Invalidez Profissional e Doenças Graves são os pilares mais importantes.

Uma mordida grave, um acidente de trânsito em atendimento domiciliar ou uma doença ocupacional podem impedir o exercício da profissão. O seguro garante a liquidez necessária para tratamentos e manutenção do padrão de vida.

Para donos de clínicas, o seguro de vida para sócios é uma ferramenta de sucessão empresarial, garantindo que a clínica continue operando em caso de falta de um dos pilares do negócio.`}
      quoteFormFields={veterinariaFormFields}
      coverages={[
        { title: "Invalidez Profissional", description: "Indenização específica para quem não pode mais exercer a veterinária." },
        { title: "Doenças Graves", description: "Capital livre para uso em diagnósticos de câncer, infarto, AVC e outros." },
        { title: "DIT - Incapacidade Temporária", description: "Garante o pagamento de diárias enquanto você se recupera de um acidente ou cirurgia." },
        { title: "Assistência Funeral Familiar", description: "Suporte completo em momentos difíceis, estendido à família do segurado." },
      ]}
      whoNeeds={["Sócios de Clínicas", "Veterinários Cirurgiões", "Profissionais de Campo", "Funcionários de Hospitais"]}
      whyPatro={["Especialista em planejamento sucessório", "Análise técnica de coberturas profissionais", "Atendimento humano em Guarulhos"]}
      faqs={[
        { question: "O seguro de vida tem carência?", answer: "Para acidentes a cobertura é imediata; para doenças costuma haver carência de 60 a 90 dias." }
      ]}
    />
  );
};

export default SeguroVidaClinicasVeterinarias;
