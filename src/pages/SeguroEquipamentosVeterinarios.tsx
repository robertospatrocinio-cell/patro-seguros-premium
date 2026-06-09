import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { veterinariaFormFields } from "@/data/veterinariaFormConfig";
import heroImg from "@/assets/hero-seguro-maquinas.webp";

const SeguroEquipamentosVeterinarios = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro para Equipamentos Veterinários"
      subtitle="Proteja seus aparelhos de diagnóstico e cirurgia contra danos e roubo"
      icon="🔬"
      badge="Proteção de Ativos Críticos"
      metaDescription="Seguro para Equipamentos Veterinários em Guarulhos: proteção para Raio-X, Ultrassom, Monitores e Lab. Cobre roubo e danos elétricos. Patro Seguros."
      description="Seus equipamentos são o coração do seu diagnóstico. Não deixe seu faturamento parar por conta de um dano acidental ou roubo de aparelhos caros."
      detailedDescription={`Ultrassom, raio-X digital, monitores multiparâmetros e autoclaves são investimentos pesados. Além do alto valor de aquisição, eles são extremamente sensíveis a picos de energia — um problema comum em diversas regiões.

Nossa apólice específica para equipamentos veterinários garante a reposição rápida ou o conserto desses aparelhos. Oferecemos cobertura para roubo e furto qualificado, danos elétricos e até quebra acidental durante o uso.

Protegemos também seus equipamentos portáteis em trânsito, essencial para veterinários que realizam atendimentos domiciliares ou em haras.`}
      quoteFormFields={veterinariaFormFields}
      coverages={[
        { title: "Danos Elétricos", description: "Proteção contra queima por picos de tensão ou descargas atmosféricas." },
        { title: "Roubo e Furto Qualificado", description: "Segurança total dentro do seu estabelecimento ou em trânsito." },
        { title: "Danos Acidentais (Quebra)", description: "Cobre quedas ou impactos que danifiquem o funcionamento do aparelho." },
        { title: "Equipamentos Portáteis", description: "Cobertura em todo o território nacional para aparelhos móveis." },
      ]}
      whoNeeds={["Centros de Diagnóstico", "Clínicas Móveis", "Veterinários de Campo", "Hospitais Veterinários"]}
      whyPatro={["Especialistas em equipamentos médicos em Guarulhos", "Cláusula de valor de novo para importados", "Reposição ágil de ativos"]}
      faqs={[
        { question: "O seguro cobre se o ultrassom cair no chão?", answer: "Sim, se contratada a cobertura de danos acidentais." }
      ]}
    />
  );
};

export default SeguroEquipamentosVeterinarios;
