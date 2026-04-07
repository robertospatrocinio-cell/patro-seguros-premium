import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-residencial.webp";

const SeoSeguroResidencialGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro Residencial em Guarulhos"
    subtitle="Proteção completa para sua casa, apartamento ou condomínio em Guarulhos. Cotação gratuita e personalizada."
    description="A Patro Seguros é referência em seguro residencial em Guarulhos e região metropolitana. Protegemos casas, apartamentos e condomínios contra incêndio, roubo, vendaval, danos elétricos e muito mais. Atendemos moradores da Cidade Maia, Vila Augusta, Picanço, Macedo, Gopouva e todos os bairros de Guarulhos. Desde 2020, oferecemos consultoria personalizada com comparação entre as melhores seguradoras do mercado."
    icon="🏠"
    metaDescription="Seguro Residencial em Guarulhos para casas e apartamentos. Cobertura contra incêndio, roubo, vendaval e danos elétricos. Cotação grátis – Patro Seguros Guarulhos."
    coverages={[
      { title: "Incêndio, Raio e Explosão", description: "Cobertura básica obrigatória para danos estruturais ao imóvel." },
      { title: "Roubo e Furto Qualificado", description: "Proteção para bens dentro da residência: eletrônicos, móveis e objetos pessoais." },
      { title: "Danos Elétricos", description: "Cobertura para equipamentos danificados por oscilações de energia — muito comum em Guarulhos." },
      { title: "Vendaval e Granizo", description: "Proteção contra fenômenos naturais frequentes na região metropolitana de São Paulo." },
      { title: "Responsabilidade Civil Familiar", description: "Cobertura para danos causados a terceiros por membros da família." },
      { title: "Assistência 24h", description: "Chaveiro, encanador, eletricista e vidraceiro — serviços emergenciais sem custo adicional." },
    ]}
    whoNeeds={[
      "Moradores de casas e apartamentos em Guarulhos",
      "Proprietários de imóveis na Cidade Maia e Vila Augusta",
      "Inquilinos que desejam proteger seus bens",
      "Famílias com crianças e idosos que precisam de assistência 24h",
    ]}
    whyPatro={[
      "Corretora local em Guarulhos com atendimento presencial no Cidade Maia",
      "Comparação entre Porto Seguro, Tokio Marine, Allianz e mais",
      "Cotação em até 2 horas com propostas comparativas",
      "Conhecemos os riscos específicos de cada bairro de Guarulhos",
    ]}
    faqs={[
      { question: "Quanto custa seguro residencial em Guarulhos?", answer: "O seguro residencial em Guarulhos custa a partir de R$ 150/ano para apartamentos e R$ 300/ano para casas. O valor varia conforme localização, coberturas e valor do imóvel. Solicite cotação gratuita." },
      { question: "Seguro residencial cobre danos elétricos em Guarulhos?", answer: "Sim! Danos elétricos são uma das coberturas mais contratadas em Guarulhos devido às oscilações de energia na região. A Patro compara as melhores opções." },
      { question: "Preciso de seguro residencial se moro em condomínio?", answer: "Sim. O seguro do condomínio cobre áreas comuns. Seus bens pessoais, eletrônicos e responsabilidade civil precisam de seguro residencial individual." },
    ]}
    relatedInsurances={[
      { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Seguro Condomínio Guarulhos", link: "/seguro-condominio-guarulhos" },
      { title: "Seguro Vida e Saúde Guarulhos", link: "/seguro-vida-saude-guarulhos" },
      { title: "Seguro Empresarial Guarulhos", link: "/seguro-empresarial-guarulhos" },
      { title: "Corretora Seguros Guarulhos", link: "/" },
    ]}
  />
);

export default SeoSeguroResidencialGuarulhos;
