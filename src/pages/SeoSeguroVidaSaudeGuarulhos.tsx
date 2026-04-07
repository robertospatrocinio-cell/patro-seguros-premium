import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-vida.webp";

const SeoSeguroVidaSaudeGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro de Vida e Saúde em Guarulhos"
    subtitle="Proteção para você e sua família em Guarulhos. Seguro de vida, planos de saúde e odontológico com cotação gratuita."
    description="A Patro Seguros oferece as melhores opções de seguro de vida e planos de saúde em Guarulhos para pessoas físicas, famílias e empresas. Comparamos operadoras como Amil, SulAmérica, Bradesco Saúde, Unimed, Hapvida e Prevent Senior para encontrar o plano ideal. Atendimento consultivo presencial no Cidade Maia e online para toda a região de Guarulhos. Com experiência no mercado local, entendemos as necessidades de saúde e proteção financeira de cada perfil de cliente."
    icon="❤️"
    metaDescription="Seguro de Vida e Plano de Saúde em Guarulhos. Compare Amil, SulAmérica, Unimed e mais. Cotação grátis para pessoa física e empresas. Patro Seguros Guarulhos."
    coverages={[
      { title: "Seguro de Vida Individual", description: "Proteção financeira para sua família em caso de falecimento, invalidez ou doenças graves." },
      { title: "Seguro de Vida em Grupo (PME)", description: "Benefício corporativo para empresas de Guarulhos com condições especiais." },
      { title: "Plano de Saúde Individual/Familiar", description: "Cobertura médica completa com ampla rede em Guarulhos e Grande SP." },
      { title: "Plano de Saúde Empresarial", description: "Planos com preços diferenciados a partir de 2 vidas para PMEs de Guarulhos." },
      { title: "Plano Odontológico", description: "Cobertura dental acessível para pessoa física e empresas." },
      { title: "Assistência Funeral", description: "Serviço completo de assistência funeral familiar incluído no seguro de vida." },
    ]}
    whoNeeds={[
      "Famílias de Guarulhos que buscam proteção financeira",
      "Profissionais liberais (médicos, advogados, engenheiros)",
      "PMEs que desejam oferecer benefícios aos colaboradores",
      "Pessoas acima de 50 anos buscando cobertura de saúde acessível",
    ]}
    whyPatro={[
      "Comparamos mais de 20 operadoras de saúde e seguradoras de vida",
      "Consultoria presencial no Cidade Maia, Guarulhos",
      "Especialistas em planos PME com condições exclusivas",
      "Suporte na utilização do plano e renovação sem burocracia",
    ]}
    faqs={[
      { question: "Quanto custa seguro de vida em Guarulhos?", answer: "O seguro de vida em Guarulhos começa a partir de R$ 30/mês. O valor depende da idade, profissão e coberturas escolhidas. Solicite cotação gratuita." },
      { question: "Qual o melhor plano de saúde em Guarulhos?", answer: "Depende do perfil. Para famílias, Amil e SulAmérica têm boa rede local. Para PMEs, Hapvida e Bradesco oferecem preços competitivos. Comparamos todas." },
      { question: "Seguro de vida cobre doenças graves?", answer: "Sim. Muitas apólices incluem cobertura para diagnóstico de doenças graves como câncer, AVC e infarto, com pagamento antecipado da indenização." },
    ]}
    relatedInsurances={[
      { title: "Seguro Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
      { title: "Plano de Saúde Empresarial", link: "/plano-saude-empresarial" },
      { title: "Veja seguro auto Guarulhos", link: "/seguro-auto-guarulhos" },
    ]}
  />
);

export default SeoSeguroVidaSaudeGuarulhos;
