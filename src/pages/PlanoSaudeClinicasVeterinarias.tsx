import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { veterinariaFormFields } from "@/data/veterinariaFormConfig";
import heroImg from "@/assets/hero-planos-saude.webp";

const PlanoSaudeClinicasVeterinarias = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Plano de Saúde para Clínicas Veterinárias"
      subtitle="Retenha talentos e cuide de quem cuida dos animais"
      icon="👨‍⚕️"
      badge="Benefícios Corporativos Pet"
      metaDescription="Plano de Saúde Empresarial para Clínicas e Hospitais Veterinários em Guarulhos. Reduza turnover e valorize sua equipe médica. Patro Seguros."
      description="O mercado veterinário é altamente competitivo. Oferecer um plano de saúde de qualidade é a melhor estratégia para reter veterinários e auxiliares qualificados."
      detailedDescription={`Clínicas e hospitais veterinários dependem diretamente da qualidade e do bem-estar de seus profissionais. O desgaste físico e emocional da profissão exige acesso a uma rede médica de excelência.

A Patro Seguros é especialista em Planos de Saúde PME (Pequenas e Médias Empresas) e encontra a operadora ideal para o perfil da sua clínica — seja para os sócios ou para toda a equipe.

Trabalhamos com Bradesco, SulAmérica, Porto, Amil e operadoras regionais fortes em Guarulhos, garantindo o melhor custo-benefício e redução de carências para novos grupos.`}
      quoteFormFields={veterinariaFormFields}
      coverages={[
        { title: "Atendimento Nacional ou Regional", description: "Escolha o plano que melhor atende à mobilidade da sua equipe." },
        { title: "Redução de Carências", description: "Condições especiais para grupos acima de 30 vidas ou oriundos de outros planos." },
        { title: "Reembolso de Consultas", description: "Liberdade para escolher médicos de confiança fora da rede credenciada." },
        { title: "Programas de Saúde Mental", description: "Essencial para profissionais que lidam com situações de alta carga emocional." },
      ]}
      whoNeeds={["Clínicas Veterinárias", "Hospitais Pet", "Laboratórios Veterinários", "Redes de Franquias Pet"]}
      whyPatro={["Consultoria em gestão de benefícios", "Análise de sinistralidade", "Suporte total no RH da clínica"]}
      faqs={[
        { question: "Qual o mínimo de vidas para contratar?", answer: "A partir de 2 ou 3 vidas (sócios ou dependentes) já é possível contratar planos empresariais." }
      ]}
    />
  );
};

export default PlanoSaudeClinicasVeterinarias;
