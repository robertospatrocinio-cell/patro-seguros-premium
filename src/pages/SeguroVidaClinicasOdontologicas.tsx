import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-vida.webp";

const SeguroVidaClinicasOdontologicas = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro de Vida Empresarial para Clínicas Odontológicas"
    subtitle="Proteção para sócios, funcionários e equipe clínica — com cobertura específica para invalidez profissional."
    icon="💛"
    metaDescription="Seguro de vida empresarial para clínicas odontológicas — cobertura para sócios, equipe clínica e invalidez profissional. Cotação grátis com a Patro Seguros."
    description="Apólice de vida em grupo para a equipe odontológica, com cobertura para morte, invalidez e doenças graves."
    detailedDescription={`O afastamento de um sócio dentista pode paralisar parcial ou totalmente a clínica. A morte de um sócio sem planejamento sucessório gera disputa entre herdeiros e funcionários. O seguro de vida empresarial é o instrumento mais barato e ágil para resolver esses cenários — e proteger a equipe clínica simultaneamente.\n\nA Patro Seguros estrutura apólices de vida em grupo para clínicas com cláusulas específicas: capital diferenciado para sócios, cobertura de invalidez funcional das mãos, doenças graves e diárias por incapacidade.`}
    coverages={[
      { title: "Morte por Qualquer Causa", description: "Capital integral pago aos beneficiários em até 30 dias." },
      { title: "Invalidez Permanente Total ou Parcial", description: "Indenização proporcional à perda funcional." },
      { title: "Invalidez Funcional das Mãos", description: "Cobertura específica vital para o dentista." },
      { title: "Doenças Graves", description: "Câncer, AVC, infarto e outras — antecipação do capital." },
      { title: "Diárias por Incapacidade Temporária", description: "Renda mensal durante afastamento por doença ou acidente." },
      { title: "Assistência Funeral Familiar", description: "Cobertura para o segurado e família imediata." },
    ]}
    whoNeeds={[
      "Sócios de clínicas odontológicas",
      "Dentistas contratados (CLT ou PJ)",
      "Auxiliares de saúde bucal e recepcionistas",
      "Clínicas com 2+ colaboradores",
    ]}
    whyPatro={[
      "Apólices de vida com cobertura específica para dentistas",
      "Capitais diferenciados por categoria (sócio vs. equipe)",
      "Pagamento de sinistro em até 30 dias",
      "Renovação automática com revisão de capital",
    ]}
    faqs={[
      { question: "Vale a pena fazer vida em grupo na clínica?", answer: "Sim. O custo é até 60% menor que apólices individuais e o benefício é dedutível para a empresa." },
      { question: "Posso ter capital maior para os sócios?", answer: "Sim. Estruturamos apólices com classes diferentes: capital alto para sócios, capital padrão para a equipe." },
      { question: "A invalidez das mãos é mesmo coberta?", answer: "Sim. É uma cláusula complementar essencial para dentistas — a Patro Seguros sempre inclui na cotação." },
      { question: "Quanto custa?", answer: "Apólices em grupo a partir de R$ 25/vida/mês para coberturas básicas, ou R$ 80–150/vida para coberturas amplas." },
    ]}
    relatedInsurances={[
      { title: "Plano de Saúde Empresarial", link: "/plano-saude-clinicas-odontologicas" },
      { title: "Seguro Vida PME", link: "/seguro-vida-pme" },
      { title: "Hub Clínicas Odontológicas", link: "/seguros-para-clinicas-odontologicas" },
    ]}
  />
);

export default SeguroVidaClinicasOdontologicas;