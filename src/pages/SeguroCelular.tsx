import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroCelular = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Celular — Proteja Seu Smartphone"
      subtitle="Cobertura completa contra roubo, furto, quebra acidental e danos elétricos para seu celular."
      description="O Seguro Celular da Patro Seguros protege seu smartphone contra os principais riscos do dia a dia. Com cobertura para roubo, furto qualificado, quebra acidental e danos por líquidos, você garante a tranquilidade de usar seu aparelho sem preocupações. Trabalhamos com as melhores seguradoras para oferecer o melhor custo-benefício."
      icon="📱"
      metaDescription="Seguro Celular contra roubo, furto, quebra acidental e danos por líquidos. Proteção para iPhone, Samsung e todos os smartphones. Cotação grátis Patro Seguros."
      coverages={[
        { title: "Roubo e Furto Qualificado", description: "Proteção contra roubo e furto com arrombamento do seu smartphone." },
        { title: "Quebra Acidental", description: "Cobertura para danos causados por quedas e impactos acidentais." },
        { title: "Danos por Líquidos", description: "Proteção contra danos causados por contato com água e outros líquidos." },
        { title: "Danos Elétricos", description: "Cobertura para problemas causados por oscilações de energia e curto-circuito." },
      ]}
      whoNeeds={[
        "Quem depende do celular para trabalhar",
        "Quem usa smartphone de alto valor",
        "Quem transita em áreas de risco",
        "Profissionais que usam apps bancários no celular",
      ]}
      whyPatro={[
        "Comparamos as melhores seguradoras de celular",
        "Processo de sinistro simplificado",
        "Cobertura sob medida para seu aparelho",
        "Atendimento rápido e sem burocracia",
      ]}
      faqs={[
        { question: "O seguro cobre tela quebrada?", answer: "Sim, a maioria dos planos cobre quebra acidental, incluindo tela trincada ou quebrada." },
        { question: "Quanto custa o seguro de celular?", answer: "O valor varia conforme o modelo do aparelho e coberturas escolhidas. Solicite uma cotação gratuita." },
        { question: "Posso segurar celular usado?", answer: "Sim, é possível contratar seguro para celulares usados, desde que estejam em bom funcionamento." },
      ]}
      relatedInsurances={[
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
      ]}
    />
  );
};

export default SeguroCelular;
