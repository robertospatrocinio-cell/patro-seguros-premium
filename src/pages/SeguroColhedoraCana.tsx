import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const heroImg = "https://images.unsplash.com/photo-1594411124406-8d59268f7b3c?auto=format&fit=crop&q=80&w=2000";

const SeguroColhedoraCana = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Colhedora de Cana"
      subtitle="Proteção premium para o ativo mais valioso da sua colheita. Cobertura nacional com consultoria técnica especializada."
      icon="🚜"
      badge="Especialista no Setor Sucroenergético"
      metaDescription="Seguro para Colhedoras de Cana: proteção contra incêndio, roubo, quebra de máquinas e tombamento em todo o Brasil. Cotação rápida Patro Seguros."
      description="A colhedora de cana é um investimento de alto impacto que não pode parar. O seguro especializado da Patro Seguros garante a proteção do seu patrimônio contra os riscos severos da safra."
      detailedDescription={`No setor sucroenergético, a eficiência operacional é ditada pelo ritmo das máquinas. Uma colhedora de cana representa um investimento de milhões de reais e opera em condições extremas, sujeita a riscos de incêndio por superaquecimento, tombamentos em terrenos irregulares e danos elétricos em seus complexos sistemas de automação.

Nossa consultoria para Seguro de Colhedora de Cana oferece um desenho de apólice que entende a realidade das usinas e dos grandes produtores. Cobrimos desde danos materiais acidentais até a fundamental cobertura de 'Quebra de Máquinas', além da Responsabilidade Civil do Operador, essencial para proteger a empresa contra danos a terceiros.

Com atendimento 100% remoto e agilidade na regulação de sinistros, a Patro Seguros é a parceira estratégica para garantir que sua colheita não seja interrompida por imprevistos financeiros.`}
      howItWorks={[
        { step: "1", title: "Levantamento de Ativos", description: "Identificação de marca, modelo, ano e tecnologia embarcada das colhedoras." },
        { step: "2", title: "Análise de Operação", description: "Avaliação do regime de trabalho (safra 24h), local de operação e guarda." },
        { step: "3", title: "Estruturação da Apólice", description: "Definição de limites para incêndio, danos elétricos, quebra e RC." },
        { step: "4", title: "Suporte e Gestão", description: "Acompanhamento total desde a emissão até a renovação e sinistros." },
      ]}
      coverages={[
        { title: "Incêndio e Explosão", description: "Proteção vital contra o risco térmico elevado na colheita mecanizada." },
        { title: "Roubo e Furto Qualificado", description: "Segurança para máquinas em frentes de trabalho ou pátios de usinas." },
        { title: "Tombamento e Colisão", description: "Cobre acidentes operacionais comuns em terrenos de difícil manobra." },
        { title: "Danos Elétricos", description: "Proteção para computadores de bordo, sensores e chicotes eletrônicos." },
        { title: "Quebra de Máquinas", description: "Cobertura para falhas mecânicas súbitas de componentes internos." },
        { title: "Responsabilidade Civil Operador", description: "Garante danos causados a propriedades vizinhas ou pessoas." },
        { title: "Transporte do Equipamento", description: "Cobertura durante o deslocamento entre frentes de colheita ou usinas." },
      ]}
      coverageExclusions={[
        "Desgaste natural de facas, correias, óleos e pneus",
        "Danos por falta de manutenção preventiva recomendada",
        "Operação por pessoas sem a devida qualificação técnica",
        "Atos ilícitos intencionais ou negligência comprovada",
        "Danos estéticos que não impedem a operação da máquina",
      ]}
      pricingInfo={{
        intro: "O prêmio é calculado com base no valor de reposição e no perfil tecnológico do maquinário.",
        factors: [
          "Marca (John Deere, Case IH, etc.) e valor de mercado",
          "Ano de fabricação e histórico de manutenção",
          "Regime de trabalho e horas de operação por safra",
          "Região de operação e histórico de sinistros",
          "Implementação de sistemas de combate a incêndio onboard",
        ],
        note: "Usinas com frotas acima de 5 máquinas possuem condições diferenciadas de taxa e franquia.",
      }}
      realScenarios={[
        { title: "Incêndio por Superaquecimento", description: "Uma colhedora sofreu incêndio total devido ao acúmulo de resíduos no motor. O seguro pagou a indenização integral em 25 dias, permitindo a reposição imediata." },
        { title: "Tombamento em Talhão", description: "Máquina tombou durante manobra em terreno úmido, gerando R$ 140.000 em danos estruturais. A cobertura de acidentes externos arcou com o reparo." },
        { title: "Falha Eletrônica Crítica", description: "Uma descarga elétrica queimou o módulo central de controle. A reposição de R$ 45.000 foi paga pela cobertura de danos elétricos." },
      ]}
      importantDetails={[
        { title: "Combate a Incêndio Onboard", content: "Muitas seguradoras oferecem descontos significativos para máquinas equipadas com sistemas automáticos de extinção de incêndio no compartimento do motor." },
        { title: "Valor Acordado", content: "Para máquinas de alto valor e tecnologia específica, trabalhamos com a modalidade de valor acordado, evitando discussões de depreciação em caso de perda total." },
      ]}
      tips={[
        "Mantenha sempre os certificados de manutenção preventiva digitalizados",
        "Certifique-se de que os sistemas de supressão de incêndio estão carregados e testados",
        "Contrate verbas de RC elevadas: o potencial de dano em áreas vizinhas é alto",
        "Para máquinas financiadas, informe os dados da instituição para agilizar a apólice",
      ]}
      whoNeeds={[
        "Grandes Usinas de Açúcar e Álcool",
        "Produtores de Cana-de-Açúcar Mechanizados",
        "Empresas de Prestação de Serviços de Colheita",
        "Cooperativas do Setor Sucroenergético",
        "Locadoras de Maquinário Pesado para o Agro",
      ]}
      whyPatro={[
        "Profundo conhecimento técnico do setor sucroenergético",
        "Parceria com as maiores seguradoras de riscos rurais do mundo",
        "Consultoria para dimensionamento de verbas em frotas complexas",
        "Suporte em sinistros com foco na mínima parada operacional",
        "Atendimento nacional para todas as regiões produtoras do Brasil",
      ]}
      faqs={[
        { question: "O seguro cobre colhedoras usadas?", answer: "Sim, seguramos máquinas com até 10-12 anos de uso, dependendo do estado de conservação e marca." },
        { question: "Qual o prazo para receber a indenização?", answer: "Após a entrega da documentação, o prazo legal é de 30 dias, mas trabalhamos para agilizar o processo em até 20 dias para nossos clientes." },
        { question: "O seguro é válido em todo o Brasil?", answer: "Sim, a cobertura tem abrangência em todo o território nacional, incluindo transporte entre propriedades." },
        { question: "Posso segurar só contra incêndio e roubo?", answer: "Sim, existe a modalidade de cobertura básica (incêndio e roubo), mas para colhedoras recomendamos sempre a cobertura compreensiva com quebra de máquinas." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro de Trator Agrícola", link: "/seguro-trator-agricola" },
        { title: "Seguro Rural", link: "/seguro-rural" },
      ]}
    />
  );
};

export default SeguroColhedoraCana;
