import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { veterinariaFormFields } from "@/data/veterinariaFormConfig";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroRCVeterinarios = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Responsabilidade Civil para Veterinários"
      subtitle="Proteção contra alegações de erro profissional e danos a animais"
      icon="🛡️"
      badge="Proteção Jurídica Especializada"
      metaDescription="Seguro RC para Veterinários em Guarulhos: proteção contra processos por erro profissional, óbito de animais e danos a tutores. Cotação Patro Seguros."
      description="O Seguro RC para Veterinários protege o profissional contra reclamações por alegação de erro, negligência ou imperícia no tratamento de animais. Blindagem para sua carreira."
      detailedDescription={`O mercado pet brasileiro cresce e com ele a judicialização. Tutores exigentes tratam pets como família — e não hesitam em processar quando algo sai do esperado.

Cirurgias com intercorrências, diagnósticos tardios, reações adversas e lesões em banho e tosa são causas comuns de processos. As indenizações incluem danos materiais e morais elevados.

A Patro Seguros é especialista em RC Profissional. Cotamos com seguradoras que entendem as particularidades da veterinária, garantindo sua defesa jurídica e preservando seu patrimônio.`}
      quoteFormFields={veterinariaFormFields}
      coverages={[
        { title: "Erro Médico e Diagnóstico", description: "Proteção contra alegações de imperícia ou negligência profissional." },
        { title: "Custos de Defesa Jurídica", description: "Honorários, custas judiciais e perícias pagos pela seguradora." },
        { title: "Danos Morais ao Tutor", description: "Cobertura para sofrimento emocional do tutor em caso de óbito do pet." },
        { title: "Processos Éticos no CRMV", description: "Custos de defesa em processos disciplinares nos conselhos regionais." },
        { title: "RC sob Custódia", description: "Proteção para animais sob guarda em internação ou hotelaria." },
      ]}
      whoNeeds={["Veterinários Autônomos", "Distas", "Cirurgiões", "Clínicas e Hospitais", "Pet Shops com Veterinário"]}
      whyPatro={["Referência em RC Profissional em Guarulhos", "Suporte jurídico preventivo", "Apólices de alta cobertura e baixo custo"]}
      faqs={[
        { question: "O seguro cobre processos antigos?", answer: "Geralmente cobre fatos ocorridos durante a vigência da apólice, mas existem cláusulas de retroatividade." }
      ]}
    />
  );
};

export default SeguroRCVeterinarios;
