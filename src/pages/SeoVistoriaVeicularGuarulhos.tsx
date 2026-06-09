import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import PrerenderText from "@/components/PrerenderText";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeoVistoriaVeicularGuarulhos = () => (
  <>
    <PrerenderText slug={"seguro-para-empresas-de-vistoria-veicular" as any} />
    <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Empresas de Vistoria Veicular | Patro Seguros"
    subtitle="Proteção Estratégica para ECVs, Inspeção e Vistoria em Guarulhos"
    description="Proteja sua empresa de vistoria veicular com seguros empresariais, responsabilidade civil profissional (erros de laudo), equipamentos, vida e saúde empresarial."
    icon="🔍"
    metaDescription="Seguro para Empresas de Vistoria Veicular em Guarulhos. Proteção para ECV contra processos por erros em laudos, roubo de equipamentos e incêndio. Cote agora."
    detailedDescription="O mercado de vistoria veicular em Guarulhos é altamente regulamentado e exige segurança jurídica e patrimonial. Empresas Credenciadas de Vistoria (ECVs) lidam com grandes responsabilidades ao emitir laudos de transferência e inspeções cautelares.\n\nA Patro Seguros oferece consultoria especializada para o setor automotivo, estruturando apólices que atendem às exigências do Detran e protegem o caixa da empresa contra processos judiciais decorrentes de erros operacionais ou omissões em vistorias."
    coverages={[
      { title: "Responsabilidade Civil Profissional", description: "Proteção contra processos judiciais por erros ou omissões em laudos de vistoria e inspeção." },
      { title: "Seguro de Equipamentos", description: "Cobertura para computadores, servidores e equipamentos de inspeção e fotografia." },
      { title: "Seguro Empresarial (Patrimônio)", description: "Proteção contra incêndio, explosão, danos elétricos e roubo no estabelecimento." },
      { title: "Seguro Cibernético", description: "Proteção contra vazamento de dados de clientes e ataques a sistemas digitais (LGPD)." },
      { title: "Seguro de Vida e Saúde", description: "Benefícios essenciais para retenção de vistoriadores e equipe administrativa." },
      { title: "Lucros Cessantes", description: "Garante o faturamento em caso de paralisação forçada por sinistro coberto." },
    ]}
    whoNeeds={[
      "ECVs (Empresas Credenciadas de Vistoria)",
      "Empresas de Vistoria Cautelar",
      "Empresas de Inspeção Veicular",
      "Despachantes com área de vistoria",
      "Empresas de Regularização de Veículos",
    ]}
    whyPatro={[
      "Especialista em seguros para o setor automotivo em Guarulhos",
      "Apólices que atendem 100% das exigências do Detran para ECVs",
      "Comparativo entre 16+ seguradoras para o melhor custo-benefício",
      "Suporte técnico em caso de processos e sinistros",
    ]}
    faqs={[
      { question: "O seguro é obrigatório para abrir uma ECV?", answer: "Sim, o Detran exige a apresentação de uma apólice de Responsabilidade Civil Profissional vigente para o credenciamento e funcionamento da empresa." },
      { question: "O que o seguro de RC para vistoria cobre?", answer: "Cobre custos de defesa judicial e indenizações caso a empresa seja processada por um erro técnico em um laudo emitido." },
      { question: "Equipamentos de fotografia estão cobertos?", answer: "Sim, se contratada a cobertura de equipamentos eletrônicos ou portáteis na apólice empresarial." },
      { question: "Como economizar no seguro da minha ECV?", answer: "A melhor forma é comparando várias seguradoras que aceitam o risco. A Patro faz esse trabalho para você gratuitamente." },
      { question: "Quanto tempo leva para emitir a apólice?", answer: "Geralmente em 24h a 48h após a aprovação da proposta e envio dos documentos." },
    ]}
    relatedInsurances={[
      { title: "Seguro para Despachantes", link: "/seguro-despachantes-e-vistorias" },
      { title: "Seguro Auto (Indicação)", link: "/seguro-auto-pos-vistoria" },
      { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      { title: "Seguro Cyber", link: "/seguro-cyber" },
    ]}
    />
  </>
);

export default SeoVistoriaVeicularGuarulhos;
