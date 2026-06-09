import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-planos-saude.webp";

const PlanoSaudeClinicasOdontologicas = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Plano de Saúde para Clínicas Odontológicas"
    subtitle="Planos empresariais para a equipe da sua clínica com até 40% de economia."
    icon="🩺"
    metaDescription="Plano de saúde empresarial para clínicas odontológicas — Bradesco, SulAmérica, Amil, Hapvida e operadoras regionais. Cotação grátis com a Patro Seguros."
    description="Plano de saúde empresarial para clínicas e redes odontológicas, com condições agressivas para dentistas, auxiliares e equipe administrativa."
    detailedDescription={`Reter um bom auxiliar odontológico ou um dentista contratado depende, hoje, de benefícios competitivos. O plano de saúde empresarial é o principal benefício esperado pela equipe — e quando bem estruturado, custa menos que um plano individual e ainda gera benefício fiscal para a clínica.\n\nA Patro Seguros é hub de mais de 20 operadoras de saúde e negocia condições especiais para clínicas e redes odontológicas, com planos PME a partir de 2 vidas.`}
    coverages={[
      { title: "Cobertura Ambulatorial", description: "Consultas, exames e procedimentos ambulatoriais." },
      { title: "Cobertura Hospitalar com Obstetrícia", description: "Internações, cirurgias e parto." },
      { title: "Cobertura Odontológica", description: "Plano odontológico integrado ou separado, com rede ampla." },
      { title: "Reembolso", description: "Para clínicas que valorizam livre escolha de médicos." },
      { title: "Coparticipação ou Pleno", description: "Modelos flexíveis para reduzir o custo da clínica." },
      { title: "Carências Reduzidas", description: "Em planos a partir de 30 vidas, carências costumam ser zeradas." },
    ]}
    whoNeeds={[
      "Clínicas com 2 ou mais funcionários CLT",
      "Clínicas com dentistas contratados PJ",
      "Redes odontológicas com várias unidades",
      "Sócios que querem benefício fiscal via PJ",
    ]}
    whyPatro={[
      "Hub com 20+ operadoras de saúde",
      "Negociação direta — sem intermediários",
      "Renovação assistida com benchmarking anual",
      "Atendimento ao RH da clínica",
    ]}
    faqs={[
      { question: "Posso contratar plano para 2 vidas?", answer: "Sim. Operadoras como Bradesco, SulAmérica e Amil aceitam planos PME a partir de 2 vidas, com regras específicas." },
      { question: "Dentistas PJ podem entrar no plano?", answer: "Sim. Em clínicas com várias PJs, é possível estruturar um plano por adesão coletiva que inclui todos os contratados." },
      { question: "Há benefício fiscal?", answer: "Sim. O plano contratado pela clínica é despesa dedutível no Lucro Real e benefício isento na folha." },
      { question: "Quanto custa em média?", answer: "Planos PME a partir de R$ 280/vida (Hapvida, Amil) ou R$ 450/vida (Bradesco, SulAmérica) conforme faixa etária." },
    ]}
    relatedInsurances={[
      { title: "Plano de Saúde Empresarial", link: "/plano-saude-empresarial" },
      { title: "Seguro de Vida para Clínicas", link: "/seguro-vida-clinicas-odontologicas" },
      { title: "Hub Clínicas Odontológicas", link: "/seguros-para-clinicas-odontologicas" },
    ]}
  />
);

export default PlanoSaudeClinicasOdontologicas;