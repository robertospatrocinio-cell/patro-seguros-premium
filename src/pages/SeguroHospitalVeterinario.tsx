import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { veterinariaFormFields } from "@/data/veterinariaFormConfig";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeguroHospitalVeterinario = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro para Hospitais Veterinários"
      subtitle="Gestão de riscos robusta para operações 24h e alta complexidade"
      icon="🏥"
      badge="Seguro Corporate Pet"
      metaDescription="Seguro para Hospitais Veterinários em Guarulhos: proteção para UTI, centro cirúrgico, internação e RC Profissional de toda a equipe. Patro Seguros."
      description="Hospitais veterinários operam em um regime de alta pressão e complexidade. Nossa solução protege toda a estrutura 24h, garantindo a continuidade do atendimento."
      detailedDescription={`Um hospital veterinário em Guarulhos ou São Paulo enfrenta desafios proporcionais ao seu tamanho. Geradores, sistemas de climatização para medicamentos, UTIs e grandes equipes cirúrgicas exigem uma apólice de seguro empresarial diferenciada.

A Patro Seguros desenha proteções que incluem a Responsabilidade Civil do estabelecimento e de todos os seus prepostos, além de coberturas específicas para quebra de máquinas de alta tecnologia.

Focamos na gestão de riscos para evitar que sinistros paralisem seu hospital e para garantir que você tenha liquidez imediata para reposição de ativos críticos.`}
      quoteFormFields={veterinariaFormFields}
      coverages={[
        { title: "RC Estabelecimento e Profissional", description: "Protege o hospital por atos de sua equipe médica e funcionários." },
        { title: "Danos Elétricos e Quebra de Máquinas", description: "Proteção para geradores, raio-X fixo, tomógrafos e UTIs." },
        { title: "RC Animais sob Custódia (Internação)", description: "Cobertura para óbitos, fugas e acidentes durante a internação." },
        { title: "Seguro Cyber e LGPD", description: "Proteção dos prontuários digitais e dados de tutores contra ataques." },
        { title: "Danos por Água e Alagamento", description: "Proteção contra vazamentos em tubulações e danos por chuvas." },
      ]}
      whoNeeds={["Hospitais Veterinários 24h", "Centros de Trauma Animal", "Grandes Clínicas com Internação", "Redes de Hospitais Pet"]}
      whyPatro={["Experiência em riscos complexos", "Sinistro assistido 24h", "Parceria com as maiores seguradoras do mundo"]}
      faqs={[
        { question: "A apólice cobre os veterinários plantonistas?", answer: "Sim, configuramos o RC para abranger toda a equipe técnica vinculada ao hospital." }
      ]}
    />
  );
};

export default SeguroHospitalVeterinario;
