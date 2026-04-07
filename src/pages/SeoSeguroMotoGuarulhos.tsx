import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-moto.webp";

const SeoSeguroMotoGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro Moto em Guarulhos"
    subtitle="Proteção para sua moto em Guarulhos com as melhores seguradoras. Cotação gratuita e atendimento local."
    description="A Patro Seguros é especialista em seguro de moto em Guarulhos. Comparamos Porto Seguro, Tokio Marine, HDI, Liberty e outras seguradoras para garantir a melhor proteção para sua motocicleta. Guarulhos tem alto índice de furto e roubo de motos, especialmente em vias como a Dutra e bairros como Cumbica e Bonsucesso. Proteja seu patrimônio com quem conhece a região."
    icon="🏍️"
    metaDescription="Seguro Moto em Guarulhos – compare cotações de Porto, Tokio Marine, HDI e mais. Proteção contra roubo, furto e acidentes. Cotação grátis – Patro Seguros."
    coverages={[
      { title: "Cobertura Compreensiva", description: "Proteção contra roubo, furto, colisão, incêndio e fenômenos naturais." },
      { title: "Responsabilidade Civil", description: "Cobertura para danos materiais e corporais causados a terceiros." },
      { title: "Assistência 24h", description: "Guincho, socorro mecânico e auxílio pane em Guarulhos e região." },
      { title: "Acidentes Pessoais", description: "Indenização para o condutor em caso de acidentes." },
    ]}
    whoNeeds={[
      "Motociclistas de Guarulhos e região metropolitana",
      "Motoboys e entregadores de aplicativo",
      "Proprietários de motos novas e seminovas",
      "Quem usa a moto como transporte principal",
    ]}
    whyPatro={[
      "Corretora local com experiência em riscos de moto em Guarulhos",
      "Comparação entre as melhores seguradoras do mercado",
      "Cotação rápida e atendimento via WhatsApp",
      "Suporte completo em caso de sinistro",
    ]}
    faqs={[
      { question: "Quanto custa seguro de moto em Guarulhos?", answer: "O valor varia conforme modelo, ano e perfil do condutor. Em Guarulhos, a média é de R$ 800 a R$ 2.500/ano. Solicite cotação gratuita." },
      { question: "Seguro de moto cobre roubo em Guarulhos?", answer: "Sim, a cobertura compreensiva inclui roubo e furto. Guarulhos tem índices elevados, o que torna o seguro essencial." },
    ]}
    relatedInsurances={[
      { title: "Veja seguro auto Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Seguro Motorista App", link: "/seguro-motorista-app" },
    ]}
  />
);

export default SeoSeguroMotoGuarulhos;
