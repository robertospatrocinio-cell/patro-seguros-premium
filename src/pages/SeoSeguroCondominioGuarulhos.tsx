import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-residencial.webp";

const SeoSeguroCondominioGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro Condomínio em Guarulhos"
    subtitle="Proteção obrigatória para condomínios residenciais e comerciais em Guarulhos. Cotação gratuita."
    description="O seguro de condomínio é obrigatório por lei (Lei 4.591/64) e a Patro Seguros ajuda síndicos e administradoras de Guarulhos a encontrar a melhor proteção. Atendemos condomínios na Cidade Maia, Vila Augusta, Gopouva, Macedo e toda região de Guarulhos. Comparamos seguradoras para garantir cobertura completa com o melhor custo-benefício."
    icon="🏢"
    metaDescription="Seguro Condomínio em Guarulhos – obrigatório por lei. Proteção contra incêndio, RC e mais. Cotação grátis para síndicos e administradoras. Patro Seguros."
    coverages={[
      { title: "Incêndio, Raio e Explosão", description: "Cobertura básica obrigatória para áreas comuns e estrutura do condomínio." },
      { title: "Responsabilidade Civil do Condomínio", description: "Proteção contra danos causados a condôminos e visitantes nas áreas comuns." },
      { title: "Vendaval e Granizo", description: "Cobertura para danos causados por fenômenos naturais." },
      { title: "Quebra de Vidros", description: "Proteção para vidros e espelhos das áreas comuns." },
    ]}
    whoNeeds={[
      "Síndicos de condomínios residenciais em Guarulhos",
      "Administradoras de condomínios",
      "Condomínios comerciais e mistos",
      "Condomínios novos em fase de entrega",
    ]}
    whyPatro={[
      "Atendimento presencial para síndicos e administradoras de Guarulhos",
      "Comparação entre as melhores seguradoras do mercado",
      "Documentação e laudo de vistoria incluso",
      "Suporte completo em caso de sinistro condominial",
    ]}
    faqs={[
      { question: "Seguro de condomínio é obrigatório em Guarulhos?", answer: "Sim. O seguro de condomínio é obrigatório por lei federal (Lei 4.591/64) em todo o Brasil, incluindo Guarulhos." },
      { question: "Quanto custa seguro de condomínio?", answer: "O valor depende do número de unidades, coberturas e localização. Solicite cotação gratuita e compare." },
    ]}
    relatedInsurances={[
      { title: "Seguro Residencial Guarulhos", link: "/seguro-residencial-guarulhos" },
      { title: "Seguro Empresarial Guarulhos", link: "/seguro-empresarial-guarulhos" },
      { title: "Seguros PME Guarulhos", link: "/seguros-empresariais-pme-guarulhos" },
      { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Corretora Seguros Guarulhos", link: "/" },
    ]}
  />
);

export default SeoSeguroCondominioGuarulhos;
