import LocalPageTemplate from "@/components/LocalPageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeoInspecaoVeicularGuarulhos = () => (
  <LocalPageTemplate
    slug="seguro-inspecao-veicular"
    title="Seguro para Empresa de Inspeção Veicular em Guarulhos"
    subtitle="Proteção para centros de inspeção técnica e segurança veicular."
    metaDescription="Seguro empresarial e de RC para empresas de inspeção veicular em Guarulhos. Proteja seus equipamentos e garanta segurança jurídica. Cote agora."
    icon="🔬"
    city="Guarulhos"
    description="Centros de inspeção veicular exigem apólices de seguro robustas para proteger seus equipamentos de alta precisão e responsabilidade técnica."
    detailedDescription="Empresas de inspeção técnica lidam com equipamentos sensíveis e processos que impactam diretamente a segurança viária. Um erro em um teste de freios ou suspensão pode ter consequências graves.\n\nA Patro Seguros oferece soluções moldadas para centros de inspeção em Guarulhos, incluindo coberturas para danos elétricos em equipamentos, roubo de servidores e responsabilidade civil profissional para os engenheiros responsáveis."
    pricing={{
      intro: "O investimento em seguro para inspeção veicular é dimensionado pelo valor dos equipamentos e volume de operações.",
      factors: [
        "Custo de reposição de máquinas",
        "Área física do estabelecimento",
        "Limites de responsabilidade civil",
        "Número de funcionários"
      ],
      note: "Oferecemos condições especiais para renovação de apólices com histórico sem sinistros."
    }}
    faqs={[
      { question: "O seguro cobre quebra de máquinas?", answer: "Sim, através da cobertura de Danos Elétricos ou Quebra de Máquinas em apólices empresariais específicas." },
      { question: "Cobre erro do engenheiro técnico?", answer: "Sim, a Responsabilidade Civil Profissional protege contra erros técnicos nas avaliações." },
      { question: "Posso incluir o prédio no seguro?", answer: "Sim, o seguro empresarial protege a estrutura física, seja ela própria ou alugada." },
      { question: "Atendem em Bonsucesso e Pimentas?", answer: "Atendemos todos os centros de inspeção de Guarulhos, com consultoria presencial se necessário." },
      { question: "Como funciona a assistência 24h?", answer: "Incluímos serviços emergenciais de manutenção predial como vidraceiro e desentupimento." }
    ]}
    insurers={[
      { name: "Allianz", highlight: "Referência em riscos industriais" },
      { name: "Porto Seguro", highlight: "Melhor suporte pós-venda" },
      { name: "Tokio Marine", highlight: "Líder em seguros corporativos" },
      { name: "Sompo Seguros", highlight: "Especialista em equipamentos" }
    ]}
    testimonials={[
      { author: "Marcos L.", neighborhood: "Pimentas", quote: "Protegemos toda nossa linha de inspeção com a Patro. Segurança total para rodar.", rating: 5 },
      { author: "Julia S.", neighborhood: "Macedo", quote: "A assessoria em RC Profissional nos deu a tranquilidade que precisávamos.", rating: 5 }
    ]}
    realScenarios={[
      { title: "Dano Elétrico em Frenômetro", description: "Um pico de energia queimou o sistema de medição. A cobertura de danos elétricos pagou o conserto e a calibração." },
      { title: "Defesa em Laudo Técnico", description: "A seguradora custeou toda a perícia e defesa técnica após questionamento judicial de um laudo." }
    ]}
    coverages={[
      { title: "Equipamentos de Teste", description: "Proteção contra danos físicos e elétricos." },
      { title: "RC Profissional", description: "Proteção jurídica para o corpo técnico." },
      { title: "Interrupção de Negócios", description: "Cobre faturamento se a linha de inspeção parar." },
      { title: "Incêndio e Vendaval", description: "Proteção patrimonial completa." }
    ]}
    whoNeeds={["Centros de Inspeção Técnica", "Engenheiros Mecânicos", "Gestores de Pátio", "Empresas de Laudo"]}
    whyPatro={["Especialistas em Guarulhos", "Nota 4.9 no Google", "Consultoria Técnica", "Comparativo Real"]}
    tips={["Mantenha as manutenções preventivas dos equipamentos em dia.", "Verifique se a cobertura de RC contempla a LGPD.", "Considere o seguro de Vida em Grupo para os técnicos."]}
    relatedInsurances={[
      { title: "Seguro Vistoria Veicular", link: "/seguro-para-empresas-de-vistoria-veicular" },
      { title: "Seguro Máquinas", link: "/seguro-maquinas" }
    ]}
    heroImage={heroImg}
  />
);

export default SeoInspecaoVeicularGuarulhos;
