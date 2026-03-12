import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroPlacaSolar = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Placas Solares — Proteção para Energia Solar no Campo"
      subtitle="Proteja seu investimento em energia solar fotovoltaica contra danos, furto e fenômenos naturais."
      description="O Seguro de Placas Solares da Patro Seguros oferece proteção completa para sistemas fotovoltaicos instalados em propriedades rurais e empresas do agronegócio. Cobrimos painéis solares, inversores e toda a estrutura de geração de energia contra os principais riscos, garantindo a continuidade da sua economia energética."
      icon="☀️"
      badge="Especialistas no Agro"
      coverages={[
        { title: "Danos aos Painéis", description: "Proteção contra quebra, trinca e danos físicos aos módulos fotovoltaicos." },
        { title: "Fenômenos Naturais", description: "Cobertura contra granizo, vendaval, raio e inundação." },
        { title: "Roubo e Furto", description: "Proteção contra roubo e furto dos painéis e equipamentos." },
        { title: "Danos Elétricos", description: "Cobertura para curto-circuito e sobrecarga nos inversores e sistemas." },
        { title: "Incêndio", description: "Proteção contra incêndio e explosão no sistema fotovoltaico." },
        { title: "Responsabilidade Civil", description: "Cobertura para danos causados a terceiros pela instalação." },
      ]}
      whoNeeds={[
        "Produtores rurais com energia solar",
        "Empresas do agronegócio com painéis fotovoltaicos",
        "Cooperativas com usinas solares",
        "Proprietários rurais investindo em sustentabilidade",
      ]}
      whyPatro={[
        "Conhecimento do setor rural e energético",
        "Coberturas específicas para sistemas fotovoltaicos",
        "Parceria com seguradoras especializadas",
        "Suporte completo na regulação de sinistros",
      ]}
      faqs={[
        { question: "O seguro cobre placas solares no campo?", answer: "Sim, cobrimos sistemas fotovoltaicos instalados em propriedades rurais contra diversos riscos." },
        { question: "Granizo é coberto?", answer: "Sim, danos causados por granizo aos painéis solares são cobertos pelo seguro." },
        { question: "Quanto custa o seguro de placas solares?", answer: "O valor depende da potência do sistema, localização e coberturas escolhidas. Solicite uma cotação gratuita." },
      ]}
      relatedInsurances={[
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroPlacaSolar;
