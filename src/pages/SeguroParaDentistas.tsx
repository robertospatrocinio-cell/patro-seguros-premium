import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroParaDentistas = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Dentistas"
    subtitle="Proteção integral para o cirurgião-dentista autônomo: RC profissional, vida, equipamentos e plano de saúde."
    icon="🦷"
    metaDescription="Seguro para Dentistas: RC profissional, equipamentos, vida e plano de saúde para cirurgiões-dentistas em Guarulhos. Cotação grátis com a Patro."
    description="Pacote completo de proteção para o dentista autônomo: responsabilidade civil profissional, equipamentos odontológicos, vida e benefícios."
    detailedDescription={`O cirurgião-dentista autônomo acumula riscos altos e pouco visíveis: processos por procedimentos estéticos, roubo de equipamentos portáteis, vazamento de dados de pacientes e perda de receita em caso de afastamento.\n\nA Patro Seguros estrutura um pacote integrado para dentistas autônomos com RC Profissional dimensionado para sua especialidade, cobertura para equipamentos (próprios ou de terceiros), seguro de vida com cobertura de invalidez profissional e plano de saúde com condições especiais para profissionais da odontologia.`}
    howItWorks={[
      { step: "1", title: "Diagnóstico", description: "Mapeamos sua especialidade, faturamento e perfil de risco." },
      { step: "2", title: "Cotação Integrada", description: "Cotamos RC, equipamentos, vida e saúde com seguradoras especializadas." },
      { step: "3", title: "Apólice Sob Medida", description: "Estruturamos um pacote único com condições competitivas." },
      { step: "4", title: "Suporte Vitalício", description: "Acompanhamos renovações, sinistros e mudanças de cobertura." },
    ]}
    coverages={[
      { title: "RC Profissional Dentista", description: "Defesa contra processos por alegação de erro odontológico, danos estéticos e materiais." },
      { title: "Equipamentos Portáteis", description: "Cobertura para instrumental, scanner intraoral e equipamentos transportados entre clínicas." },
      { title: "Seguro de Vida com Invalidez", description: "Cobertura específica para invalidez funcional das mãos — vital para o dentista." },
      { title: "Plano de Saúde Individual ou PJ", description: "Condições diferenciadas para profissionais da odontologia." },
      { title: "Seguro Cyber Individual", description: "Proteção contra vazamento de dados de pacientes (LGPD)." },
      { title: "Diárias por Incapacidade", description: "Renda mensal em caso de afastamento por doença ou acidente." },
    ]}
    whoNeeds={[
      "Cirurgiões-dentistas autônomos",
      "Dentistas que atendem em múltiplas clínicas",
      "Profissionais com equipamentos próprios de alto valor",
      "Especialistas em estética, implantes e ortodontia",
    ]}
    whyPatro={[
      "Especialista em RC Profissional Odontológico",
      "Negociação com seguradoras que conhecem a odontologia",
      "Pacotes integrados que reduzem o custo total",
      "Suporte completo em caso de sinistro",
    ]}
    faqs={[
      { question: "Sou dentista autônomo, preciso de CNPJ para contratar?", answer: "Não. A Patro Seguros estrutura apólices para pessoa física (CPF) e pessoa jurídica (PJ). Profissionais PJ costumam ter condições melhores em plano de saúde." },
      { question: "O seguro cobre equipamento se eu atender em outra clínica?", answer: "Sim. A apólice de equipamentos portáteis cobre o transporte e a operação em qualquer endereço de trabalho." },
      { question: "Existe cobertura para invalidez das mãos?", answer: "Sim. Estruturamos cláusulas específicas de invalidez funcional, essenciais para profissionais que dependem da motricidade fina das mãos." },
      { question: "Quanto custa o pacote completo?", answer: "Pacotes integrados começam a partir de R$ 250/mês para dentistas autônomos. A Patro Seguros monta o orçamento conforme seu perfil." },
    ]}
    relatedInsurances={[
      { title: "RC Dentistas", link: "/responsabilidade-civil-dentistas" },
      { title: "Equipamentos Odontológicos", link: "/seguro-equipamentos-odontologicos" },
      { title: "Plano Odontológico", link: "/seguro-odonto" },
      { title: "Hub Clínicas Odontológicas", link: "/seguros-para-clinicas-odontologicas" },
    ]}
  />
);

export default SeguroParaDentistas;