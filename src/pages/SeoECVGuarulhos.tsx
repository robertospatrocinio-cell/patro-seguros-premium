import LocalPageTemplate from "@/components/LocalPageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeoECVGuarulhos = () => (
  <LocalPageTemplate
    slug="seguro-para-ecv"
    title="Seguro para ECV em Guarulhos | Empresas de Vistoria | Patro"
    subtitle="Seguro de Responsabilidade Civil e Empresarial para ECVs credenciadas."
    metaDescription="Seguro obrigatório para ECV em Guarulhos. Responsabilidade Civil Profissional para credenciamento Detran. Atendimento local Cidade Maia. Cote agora."
    icon="📋"
    city="Guarulhos"
    description="Proteja sua Empresa Credenciada de Vistoria (ECV) em Guarulhos com as apólices exigidas pelo Detran e a melhor consultoria local."
    detailedDescription="Empresas Credenciadas de Vistoria (ECVs) têm a responsabilidade legal de atestar a procedência e as condições de veículos em processos de transferência. Qualquer erro ou falha no laudo pode gerar processos judiciais pesados e até a perda do credenciamento.\n\nA Patro Seguros, localizada no Cidade Maia, é especialista em estruturar apólices de Responsabilidade Civil Profissional que atendem rigorosamente aos limites e exigências do Detran. Além disso, oferecemos o seguro empresarial para proteger seu estabelecimento contra roubo de equipamentos e danos elétricos, garantindo que sua operação não pare."
    pricing={{
      intro: "O custo do seguro para ECV em Guarulhos depende do faturamento e dos limites de cobertura exigidos pelo Detran.",
      factors: [
        "Número de laudos mensais",
        "Limites da apólice de RC Profissional",
        "Valor dos equipamentos de inspeção",
        "Localização do estabelecimento"
      ],
      note: "Dica: Planos empresariais combinados com RC costumam ter descontos agressivos."
    }}
    faqs={[
      { question: "O Detran exige seguro para ECV?", answer: "Sim, a apólice de Responsabilidade Civil Profissional é um dos documentos obrigatórios para o credenciamento estadual." },
      { question: "O que acontece se houver erro no laudo?", answer: "O seguro de RC cobre os custos de defesa e possíveis indenizações a terceiros prejudicados pela falha." },
      { question: "Atendem ECVs em quais bairros?", answer: "Atendemos em todo o município de Guarulhos, com destaque para regiões próximas ao Detran e Cumbica." },
      { question: "Qual a diferença entre RC e Seguro Empresarial?", answer: "O RC protege contra processos por erros de serviço; o Empresarial protege o prédio, móveis e equipamentos contra danos físicos." },
      { question: "Como funciona a renovação anual?", answer: "A Patro recota automaticamente com as principais seguradoras para garantir que você mantenha o credenciamento pelo menor custo." }
    ]}
    insurers={[
      { name: "Porto Seguro", highlight: "Melhor assistência local" },
      { name: "Tokio Marine", highlight: "Taxas competitivas para RC" },
      { name: "Allianz", highlight: "Expertise em riscos corporativos" },
      { name: "HDI Seguros", highlight: "Agilidade na emissão" }
    ]}
    testimonials={[
      { author: "Ricardo M.", neighborhood: "Vila Augusta", quote: "A Patro resolveu todo o seguro da minha ECV em 24h. Essencial para meu credenciamento.", rating: 5 },
      { author: "Ana Paula", neighborhood: "Centro", quote: "Atendimento nota 10 no Cidade Maia. Entendem tudo de seguro para vistoria.", rating: 5 }
    ]}
    realScenarios={[
      { title: "Defesa em Processo de Laudo", description: "Uma ECV cliente foi processada por erro em laudo de chassi. O seguro garantiu toda a assessoria jurídica e a vitória no processo." },
      { title: "Equipamento Queimado", description: "Após um temporal em Guarulhos, o servidor da empresa queimou. O seguro empresarial pagou um novo em 3 dias." }
    ]}
    coverages={[
      { title: "RC Profissional", description: "Erros e omissões em vistorias." },
      { title: "Danos Elétricos", description: "Proteção para computadores e câmeras." },
      { title: "Roubo e Furto", description: "Segurança para equipamentos portáteis." },
      { title: "Incêndio", description: "Proteção para a estrutura física." }
    ]}
    whoNeeds={["Empresários de ECV", "Sócios de Vistoria", "Gestores Automotivos", "Novas Empresas de Vistoria"]}
    whyPatro={["Referência em Guarulhos", "Nota 4.7 no Google", "Experiência com Detran", "Cotação em 2h"]}
    tips={["Verifique os limites mínimos exigidos no último edital do Detran.", "Mantenha o inventário de equipamentos atualizado.", "Contrate também cobertura de Lucros Cessantes."]}
    relatedInsurances={[
      { title: "Seguro Vistoria Veicular", link: "/seguro-para-empresas-de-vistoria-veicular" },
      { title: "Seguro Empresarial", link: "/seguro-empresarial" }
    ]}
    heroImage={heroImg}
  />
);

export default SeoECVGuarulhos;
