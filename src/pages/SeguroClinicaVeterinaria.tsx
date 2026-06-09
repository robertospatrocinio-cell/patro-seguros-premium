import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { veterinariaFormFields } from "@/data/veterinariaFormConfig";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeguroClinicaVeterinaria = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro para Clínicas Veterinárias"
      subtitle="Proteção completa para o imóvel, equipamentos e responsabilidade da sua clínica"
      icon="🐾"
      badge="Especialista em Saúde Animal"
      metaDescription="Seguro para Clínicas Veterinárias em Guarulhos: proteção contra incêndio, roubo, danos elétricos e RC Profissional. Cotação Patro Seguros."
      description="Sua clínica veterinária merece uma proteção tão cuidadosa quanto o atendimento que você dedica aos animais. A Patro Seguros oferece o seguro empresarial completo para blindar seu negócio."
      detailedDescription={`Clínicas veterinárias possuem riscos únicos que vão além de um escritório convencional. Equipamentos caros, internação de animais sob sua responsabilidade e o fluxo constante de tutores exigem uma apólice customizada.
      
Nosso seguro empresarial pet contempla coberturas para danos elétricos (essencial para raio-X e ultrassom), roubo de medicamentos e equipamentos, além da responsabilidade civil sobre os animais sob sua custódia.

Atendemos clínicas de todos os portes em Guarulhos, garantindo que você tenha suporte 24h para emergências e total segurança jurídica em caso de incidentes.`}
      quoteFormFields={veterinariaFormFields}
      howItWorks={[
        { step: "1", title: "Análise de Risco", description: "Mapeamos os equipamentos e serviços oferecidos pela sua clínica." },
        { step: "2", title: "Cotação Multi-Seguradora", description: "Buscamos as melhores taxas nas seguradoras especializadas no setor pet." },
        { step: "3", title: "Customização", description: "Ajustamos os limites de cobertura conforme sua necessidade real." },
        { step: "4", title: "Implantação", description: "Ativação da apólice com suporte total da Patro Seguros." },
      ]}
      coverages={[
        { title: "Patrimônio e Imóvel", description: "Incêndio, raio, explosão e danos por fumaça." },
        { title: "Equipamentos Eletrônicos", description: "Proteção para raio-X, ultrassom, monitores e computadores." },
        { title: "Danos Elétricos", description: "Cobre queima de aparelhos por picos de energia ou curtos." },
        { title: "RC Animais sob Custódia", description: "Proteção contra acidentes com animais internados ou em atendimento." },
        { title: "Roubo e Furto", description: "Segurança para medicamentos, vacinas e equipamentos." },
        { title: "Lucros Cessantes", description: "Garante o faturamento da clínica se ela tiver que parar após um sinistro." },
      ]}
      whoNeeds={["Clínicas de Pequenos Animais", "Centros de Diagnóstico", "Clínicas de Especialidades", "Franquias Veterinárias"]}
      whyPatro={["Líder em seguros veterinários em Guarulhos", "Consultoria gratuita de gestão de riscos", "Suporte ágil em sinistros"]}
      faqs={[
        { question: "O seguro cobre se um animal fugir?", answer: "Sim, se contratada a cobertura de RC Animais sob Custódia." },
        { question: "Equipamentos novos são cobertos pelo valor de compra?", answer: "Sim, podemos configurar a apólice para reposição pelo valor de novo." }
      ]}
    />
  );
};

export default SeguroClinicaVeterinaria;
