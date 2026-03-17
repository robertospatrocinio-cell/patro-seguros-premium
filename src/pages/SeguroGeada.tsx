import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rural.webp";

const SeguroGeada = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Geada — Proteção para sua Lavoura"
      subtitle="Proteja sua produção agrícola contra perdas causadas por geada. Atendemos produtores de todos os estados do Brasil."
      description="O Seguro Geada da Patro Seguros é a proteção essencial para produtores rurais que enfrentam risco de geada em suas lavouras. Cobrimos perdas na produção de café, trigo, milho, hortaliças, fruticultura e outras culturas sensíveis à queda brusca de temperatura. Com subsídio do governo federal e análise especializada de riscos climáticos por região, garantimos as melhores condições para proteger sua safra. Atendimento 100% remoto para produtores de todo o Brasil."
      icon="❄️"
      metaDescription="Seguro Geada em todo o Brasil — proteção da lavoura contra perdas por geada, friagem e queda brusca de temperatura. Subsídio federal disponível. Cotação grátis Patro Seguros."
      badge="Atendimento em Todo o Brasil"
      coverages={[
        { title: "Geada de Radiação", description: "Proteção contra perdas causadas por geada em noites de céu limpo e baixa umidade." },
        { title: "Geada de Advecção", description: "Cobertura contra geada causada por massas de ar frio intensas." },
        { title: "Geada Negra", description: "Proteção contra a temida geada negra, que causa danos severos sem formação de gelo visível." },
        { title: "Friagem", description: "Cobertura contra quedas bruscas de temperatura que afetam a produção." },
        { title: "Granizo Associado", description: "Proteção adicional contra granizo que pode acompanhar frentes frias." },
        { title: "Replantio", description: "Cobertura para custos de replantio quando a geada destrói a lavoura." },
      ]}
      whoNeeds={[
        "Cafeicultores em regiões de altitude de MG, SP, PR e demais estados",
        "Produtores de trigo e milho safrinha no Sul e Sudeste",
        "Fruticultores e horticultores em áreas de risco",
        "Produtores de cana-de-açúcar em regiões sujeitas a geada",
        "Cooperativas agrícolas em todo o Brasil",
      ]}
      whyPatro={[
        "Atendemos produtores de todos os estados do Brasil",
        "Análise de risco climático específica para geada por região",
        "Acesso a seguros com subsídio do governo federal",
        "Experiência com sinistros de geada em diversas culturas",
        "Cotação 100% remota — por WhatsApp, telefone ou e-mail",
        "Suporte completo na regulação de sinistros agrícolas",
      ]}
      faqs={[
        { question: "O seguro cobre geada negra?", answer: "Sim, o seguro cobre tanto a geada branca quanto a geada negra, que é a mais destrutiva para as lavouras." },
        { question: "Quais culturas podem ser seguradas contra geada?", answer: "Café, trigo, milho, hortaliças, frutas, cana-de-açúcar e outras culturas sensíveis à queda de temperatura." },
        { question: "Tem subsídio do governo?", answer: "Sim, o governo federal oferece subsídio no prêmio do seguro agrícola, incluindo cobertura contra geada." },
        { question: "Como é feita a vistoria após a geada?", answer: "A seguradora envia um perito agrícola para avaliar os danos na lavoura e calcular a indenização devida." },
        { question: "Quanto custa o seguro geada?", answer: "O valor varia conforme a cultura, área plantada, região e coberturas escolhidas. Solicite uma cotação gratuita." },
      ]}
      relatedInsurances={[
        { title: "Seguro Café", link: "/seguro-cafe" },
        { title: "Seguro Rural", link: "/seguro-rural" },
        { title: "Seguro Pecuário", link: "/seguro-pecuario" },
        { title: "Seguro Armazenagem", link: "/seguro-armazenagem" },
      ]}
    />
  );
};

export default SeguroGeada;
