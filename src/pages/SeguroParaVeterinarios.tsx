import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { veterinariaFormFields } from "@/data/veterinariaFormConfig";
import heroImg from "@/assets/hero-seguro-vida.webp";

const SeguroParaVeterinarios = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro para Veterinários"
      subtitle="Proteção pessoal e profissional para o médico veterinário moderno"
      icon="🐾"
      badge="Proteção para o Profissional"
      metaDescription="Seguro para Médico Veterinário: RC Profissional, Seguro de Vida com DIT e proteção para equipamentos portáteis. Proteja sua carreira com a Patro Seguros."
      description="Como médico veterinário, sua carreira é seu maior ativo. Proteja-se contra os riscos da profissão com uma consultoria que entende o dia a dia da medicina veterinária."
      detailedDescription={`Seja você um profissional autônomo, plantonista ou dono de clínica, sua exposição a riscos é real. O seguro para veterinários da Patro Seguros foca em três pilares: sua saúde e renda, sua responsabilidade profissional e seus equipamentos.

Com a cobertura de DIT (Diária de Incapacidade Temporária), você garante o recebimento de diárias se precisar se afastar do trabalho por doença ou acidente. Já o RC Profissional protege seu patrimônio contra processos judiciais.

Oferecemos soluções modulares que acompanham o crescimento da sua carreira, desde a recém-formação até a consolidação de um grande hospital.`}
      quoteFormFields={veterinariaFormFields}
      coverages={[
        { title: "RC Profissional (E&O)", description: "Proteção contra alegações de erro médico e custos de defesa." },
        { title: "Seguro de Vida com DIT", description: "Renda garantida em caso de afastamento médico temporário." },
        { title: "Equipamentos Portáteis", description: "Proteção para ultrassom e raio-X portáteis contra roubo e danos." },
        { title: "Invalidez Profissional", description: "Indenização em caso de perda da capacidade de exercer a profissão." },
      ]}
      whoNeeds={["Veterinários Autônomos", "Plantonistas", "Cirurgiões", "Veterinários de Grandes Animais"]}
      whyPatro={["Atendimento especializado em Guarulhos", "Comparativo das melhores seguradoras", "Consultoria para blindagem patrimonial"]}
      faqs={[
        { question: "O seguro de vida cobre mordidas de animais?", answer: "Sim, se resultar em afastamento médico, a cobertura de DIT pode ser acionada." }
      ]}
    />
  );
};

export default SeguroParaVeterinarios;
