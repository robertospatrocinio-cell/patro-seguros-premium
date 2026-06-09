import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroHospitalVeterinario = () => (
  <InsurancePageTemplate
    title="Seguro para Hospitais Veterinários"
    subtitle="Soluções de alta complexidade para hospitais pet 24 horas."
    icon="🏢"
    metaDescription="Seguro para hospitais veterinários 24h: proteção para grandes estruturas, equipes numerosas e alta tecnologia. Gestão de risco Patro Seguros."
    description="Hospitais veterinários operam em um nível de risco elevado devido à alta rotatividade de pacientes e procedimentos complexos. Nossa apólice para hospitais é a mais completa do mercado."
    coverages={[
      { title: "RC Profissional para Corpo Clínico", description: "Protege o hospital contra erros cometidos por qualquer membro da equipe veterinária." },
      { title: "Danos Elétricos em UTI e Centro Cirúrgico", description: "Proteção vital para geradores, nobreaks e sistemas de suporte à vida." },
      { title: "RC Hospitalar Amplo", description: "Cobre quedas, erros de medicação e outros acidentes dentro das dependências do hospital." },
      { title: "Seguro Cyber e LGPD", description: "Proteção total para o banco de dados de prontuários e informações de clientes." }
    ]}
    whoNeeds={[
      "Hospitais Veterinários 24h",
      "Centros Médicos de Alta Complexidade",
      "Redes de Clínicas Veterinárias",
      "Hospitais Escolares Veterinários"
    ]}
    whyPatro={[
      "Especialista em Gestão de Riscos de Saúde",
      "Atendimento a Grandes Contas em Guarulhos",
      "Melhores Limites de Indenização",
      "Consultoria em LGPD e Compliance"
    ]}
    faqs={[
      { question: "O seguro cobre erro de um veterinário plantonista?", answer: "Sim, o seguro do hospital protege a instituição por atos de seus prepostos e funcionários." }
    ]}
  />
);

export default SeguroHospitalVeterinario;
