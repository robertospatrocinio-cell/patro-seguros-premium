import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const heroImg = "https://images.unsplash.com/photo-1594411124406-8d59268f7b3c?auto=format&fit=crop&q=80&w=2000";

const SeguroSiloAgricola = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Silo Agrícola"
      subtitle="Proteção para unidades de armazenamento e beneficiamento de grãos. Segurança total para o seu estoque e infraestrutura."
      icon="🌾"
      badge="Especialista em Armazenamento"
      metaDescription="Seguro para Silos Agrícolas: proteção contra incêndio, explosão de pó, vendaval e danos elétricos. Garanta a segurança do seu armazém com a Patro Seguros."
      description="A unidade de armazenamento é o cofre da fazenda. O Seguro de Silo Agrícola da Patro Seguros protege a estrutura física e os equipamentos de beneficiamento contra riscos catastróficos."
      detailedDescription={`Silos e armazéns são estruturas complexas que abrigam o resultado de meses de investimento no campo. Os riscos são específicos e graves: desde a temida explosão de pó de grãos até danos por vendaval, granizo e falhas críticas nos sistemas de aeração e termometria.

Nossa consultoria para Seguro de Silo Agrícola desenha apólices que protegem não apenas a estrutura metálica ou de concreto, mas também os secadores, elevadores de canecas, transportadores e toda a automação envolvida no processo. Garantimos que sua infraestrutura de pós-colheita esteja amparada pelas melhores seguradoras de riscos rurais e industriais.

Atendemos desde pequenos silos em fazendas familiares até grandes complexos armazenadores e cooperativas em todo o Brasil, com atendimento 100% remoto e agilidade técnica.`}
      howItWorks={[
        { step: "1", title: "Levantamento de Estrutura", description: "Identificamos o tipo de silo (metálico, concreto), capacidade de armazenamento e idade." },
        { step: "2", title: "Análise de Equipamentos", description: "Catalogamos secadores, fornalhas, elevadores e sistemas de limpeza." },
        { step: "3", title: "Desenho de Coberturas", description: "Definimos limites para incêndio, explosão, vendaval e danos elétricos." },
        { step: "4", title: "Ativação da Apólice", description: "Emissão com suporte para vistorias técnicas e gestão de riscos preventivos." },
      ]}
      coverages={[
        { title: "Incêndio, Raio e Explosão", description: "Inclui a vital cobertura para explosão de pó de grãos e falhas em secadores." },
        { title: "Vendaval, Ciclone e Granizo", description: "Proteção contra danos climáticos em coberturas e estruturas metálicas." },
        { title: "Danos Elétricos", description: "Seguro para painéis de comando, motores de aeração e termometria." },
        { title: "Alagamento e Inundação", description: "Cobre danos causados por entrada de água na unidade de armazenamento." },
        { title: "Quebra de Maquinário", description: "Proteção para falhas mecânicas súbitas em elevadores e transportadores." },
        { title: "Responsabilidade Civil", description: "Cobre danos a terceiros decorrentes da operação do armazém." },
        { title: "Danos por Fumaça", description: "Proteção específica contra contaminação por fumaça de secadores ou incêndios." },
      ]}
      coverageExclusions={[
        "Desgaste natural por corrosão ou oxidação das chapas",
        "Danos por falta de manutenção nas fornalhas e dutos",
        "Deterioração natural do grão por umidade excessiva (sem evento externo)",
        "Danos estéticos que não comprometem a vedação ou estrutura",
        "Vandalismo ou sabotagem interna não comprovada",
      ]}
      pricingInfo={{
        intro: "O prêmio é calculado com base no valor de reconstrução da infraestrutura e no nível de segurança do local.",
        factors: [
          "Material de construção (Metálico vs Alvenaria)",
          "Existência de sistemas de prevenção de incêndio e para-raios",
          "Distância de corpos d'água (risco de inundação)",
          "Histórico de ventos e granizo na região",
          "Idade e estado de conservação dos equipamentos de beneficiamento",
        ],
        note: "Complexos armazenadores novos com automação moderna possuem taxas reduzidas devido ao menor risco operacional.",
      }}
      realScenarios={[
        { title: "Explosão em Secador", description: "Uma falha no sistema de exaustão causou uma explosão de pó. O seguro cobriu R$ 350.000 em danos estruturais e substituição de sensores." },
        { title: "Destelhamento por Vendaval", description: "Ventos de 90km/h arrancaram parte da cobertura do armazém. O seguro arcou com R$ 120.000 para reparo imediato, evitando a perda do grão estocado." },
        { title: "Dano Elétrico no Elevador", description: "Um raio queimou o motor principal do elevador de canecas durante o recebimento da safra. A reposição de R$ 45.000 foi paga pela cobertura de danos elétricos." },
      ]}
      importantDetails={[
        { title: "Seguro da Estrutura vs Seguro do Grão", content: "Esta página trata da proteção da infraestrutura (silo/maquinário). O seguro para o estoque de grãos (mercadoria) é uma modalidade complementar que também oferecemos." },
        { title: "Prevenção de Explosão", content: "Seguradoras valorizam e podem exigir a manutenção rigorosa dos sistemas de aspiração de pó, que é o principal causador de explosões em silos." },
      ]}
      tips={[
        "Mantenha o laudo de SPDA (Para-raios) sempre atualizado por engenheiro credenciado",
        "Limpe regularmente os túneis e fossos de elevadores para evitar acúmulo de pó inflamável",
        "Digitalize as notas fiscais de construção e montagem para facilitar a valoração em sinistros",
        "Instale sensores de temperatura e fumaça integrados ao painel central",
      ]}
      whoNeeds={[
        "Produtores Rurais com Unidades Próprias",
        "Cooperativas Agroindustriais",
        "Cerealistas e Empresas de Logística",
        "Usinas de Beneficiamento de Grãos",
        "Locadoras de Estruturas de Armazenamento",
      ]}
      whyPatro={[
        "Especialistas em ativos fixos do agronegócio",
        "Consultoria técnica para dimensionamento de verbas de reconstrução",
        "Acesso às melhores seguradoras de riscos nomeados e operacionais",
        "Suporte em regulação de sinistros complexos com engenheiros especializados",
        "Atendimento em todas as regiões agrícolas do Brasil",
      ]}
      faqs={[
        { question: "O seguro cobre o grão que está dentro do silo?", answer: "Esta apólice protege a estrutura e as máquinas. O estoque pode ser incluído como 'Mercadorias' na mesma apólice ou em contrato separado." },
        { question: "Cobre silos de concreto antigos?", answer: "Sim, desde que a estrutura esteja em bom estado e possua para-raios e manutenção comprovada." },
        { question: "O seguro é aceito para financiamento de armazéns?", answer: "Sim, emitimos apólices com cláusula beneficiária para bancos como BNDES e Banco do Brasil, exigidas em financiamentos de infraestrutura." },
        { question: "Quanto tempo demora para receber a indenização?", answer: "Em eventos catastróficos (incêndio/vendaval), trabalhamos para liberar verbas emergenciais em poucos dias após a vistoria." },
      ]}
      relatedInsurances={[
        { title: "Seguro Rural", link: "/seguro-rural" },
        { title: "Seguro de Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default SeguroSiloAgricola;
