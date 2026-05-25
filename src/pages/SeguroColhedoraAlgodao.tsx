import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const heroImg = "https://images.unsplash.com/photo-1594411124406-8d59268f7b3c?auto=format&fit=crop&q=80&w=2000";

const SeguroColhedoraAlgodao = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Colhedora de Algodão"
      subtitle="Proteção premium para colhedoras de fardos e cestos. Cobertura nacional para o 'Ouro Branco' do agronegócio."
      icon="🚜"
      badge="Especialista em Colheita de Alta Tecnologia"
      metaDescription="Seguro para Colhedoras de Algodão: proteção contra incêndio, roubo, quebra de máquinas e eletrônica embarcada. Atendimento em todo o Brasil. Cotação Patro Seguros."
      description="A colhedora de algodão é uma das máquinas mais complexas e caras do mundo agrícola. O seguro da Patro Seguros oferece a robustez necessária para proteger esse investimento de milhões de reais contra imprevistos na safra."
      detailedDescription={`Colher algodão exige precisão cirúrgica e equipamentos de altíssimo valor agregado. Uma colhedora de fardos cilíndricos (como a John Deere CP770 ou Case IH Module Express) representa um dos maiores ativos de uma fazenda, e qualquer parada operacional por incêndio em resíduos, falha eletrônica ou tombamento gera prejuízos em escala exponencial.

Nossa consultoria para Seguro de Colhedora de Algodão foca na proteção total do bem e da tecnologia embarcada. Cobrimos desde danos materiais acidentais até a fundamental 'Quebra de Máquinas', além da Responsabilidade Civil do Operador. Atendemos grandes produtores do Mato Grosso, Bahia e demais fronteiras agrícolas, garantindo que o seu 'Ouro Branco' seja colhido com segurança.

Com atendimento 100% remoto, a Patro Seguros facilita a emissão de apólices para financiamentos bancários (BNDES/BB) e oferece suporte especializado na regulação de sinistros complexos.`}
      howItWorks={[
        { step: "1", title: "Ficha Técnica Premium", description: "Informe marca, modelo, ano e valor real de mercado da colhedora e de seus sistemas de enfardamento." },
        { step: "2", title: "Análise de Risco Geográfico", description: "Avaliamos a região de operação (MT, BA, GO, etc.) e o histórico de sinistralidade local." },
        { step: "3", title: "Desenho da Apólice", description: "Estruturamos verbas elevadas para incêndio, danos elétricos e quebra de componentes mecânicos." },
        { step: "4", title: "Proteção Nacional", description: "Emissão ágil e suporte total para vistorias técnicas e gestão de sinistros na fazenda." },
      ]}
      coverages={[
        { title: "Incêndio e Explosão", description: "Proteção vital contra o alto risco de ignição de fibras de algodão e resíduos no motor." },
        { title: "Roubo e Furto Qualificado", description: "Segurança total para ativos de milhões de reais em frentes de trabalho ou pátios." },
        { title: "Tombamento e Colisão", description: "Cobre acidentes durante a operação em terrenos instáveis ou durante o transporte." },
        { title: "Eletrônica e Sensores", description: "Proteção para sistemas de monitoramento de fardos, GPS e automação de última geração." },
        { title: "Quebra de Máquinas", description: "Cobertura para falhas mecânicas súbitas e imprevistas dos sistemas de colheita e enfardamento." },
        { title: "Responsabilidade Civil", description: "Garante danos causados a propriedades vizinhas ou pessoas durante a operação." },
        { title: "Transporte do Bem", description: "Garante a máquina durante o deslocamento entre fazendas ou estados em pranchas." },
      ]}
      coverageExclusions={[
        "Desgaste natural de correias, fusos, correntes e pneus",
        "Danos por falta de limpeza técnica ou manutenção preventiva",
        "Operação por pessoas sem o treinamento específico da marca",
        "Atos de guerra, sabotagem ou vandalismo não comprovados",
        "Danos estéticos que não impedem a colheita ou a qualidade do fardo",
      ]}
      pricingInfo={{
        intro: "O prêmio é calculado com base no valor de reposição (que pode superar R$ 5 milhões) e no histórico do produtor.",
        factors: [
          "Marca e Valor de Mercado (John Deere, Case IH)",
          "Tipo de tecnologia (Fardos Cilíndricos vs Cestos)",
          "Horas de motor e regime de trabalho na safra",
          "Existência de sistemas de supressão de incêndio automáticos",
          "Região de operação e histórico de ventos/raios",
        ],
        note: "Grandes produtores com frotas de colhedoras possuem acesso a taxas diferenciadas e faturamento parcelado.",
      }}
      realScenarios={[
        { title: "Incêndio em Sistema de Enfardamento", description: "Um curto-circuito no monitor de fardos causou incêndio no compartimento traseiro. O seguro cobriu R$ 450.000 em reparos e peças eletrônicas." },
        { title: "Tombamento em Manobra", description: "A máquina tombou lateralmente ao desviar de uma vala oculta, gerando R$ 180.000 em danos estruturais. A cobertura de acidentes externos arcou com o resgate." },
        { title: "Falha de Sensor de Colheita", description: "Uma descarga elétrica destruiu toda a rede de sensores de bico e unidade central. A reposição de R$ 65.000 foi paga integralmente." },
      ]}
      importantDetails={[
        { title: "Sistemas de Supressão", content: "Muitas seguradoras só aceitam colhedoras de algodão equipadas com sistemas automáticos de combate a incêndio (como Fogmaker ou similar). Nossa consultoria ajuda a regularizar essa exigência." },
        { title: "Cobertura em Trânsito", content: "Devido ao tamanho e peso, o transporte de colhedoras de algodão é crítico. Garantimos que a apólice cubra o bem durante todo o deslocamento entre talhões ou propriedades." },
      ]}
      tips={[
        "Faça a limpeza rigorosa dos resíduos de algodão no motor pelo menos duas vezes ao dia",
        "Mantenha os certificados de calibração dos sistemas de supressão de incêndio sempre atualizados",
        "Contrate verbas de RC condizentes: o potencial de incêndio em lavouras vizinhas é altíssimo",
        "Para máquinas importadas via importação direta, consulte-nos sobre a modalidade de seguro específica",
      ]}
      whoNeeds={[
        "Grandes Grupos Produtores de Algodão",
        "Empresas de Prestação de Serviços de Colheita Mecanizada",
        "Cooperativas Agrícolas com Frotas Tecnológicas",
        "Produtores de Sementes de Algodão",
        "Investidores do Agronegócio com Ativos Imobilizados",
      ]}
      whyPatro={[
        "Especialista em seguros de máquinas e equipamentos",
        "Parceria com fabricantes e concessionárias pelo Brasil",
        "Especialistas em máquinas de altíssimo valor e complexidade",
        "Consultoria para dimensionamento de verbas em frotas de fardos cilíndricos",
        "Suporte em sinistros com foco na retomada imediata da colheita",
        "Atendimento em todas as fronteiras agrícolas (MT, BA, MS, GO, PI, MA)",
      ]}
      faqs={[
        { question: "O seguro cobre colhedoras de cestos antigas?", answer: "Sim, aceitamos máquinas com até 15 anos de uso, dependendo da conservação, mas o foco principal é na linha de fardos moderna." },
        { question: "A Patro atende o oeste da Bahia (LEM)?", answer: "Sim! Atendemos produtores em Luís Eduardo Magalhães e em todo o Brasil de forma 100% remota." },
        { question: "O seguro cobre os fardos de algodão dentro da máquina?", answer: "Sim, se estiverem dentro do processo de colheita e o evento for coberto (como incêndio), mas para o estoque no campo recomendamos o Seguro Rural de Benfeitorias/Produtos." },
        { question: "Quanto tempo leva para emitir a apólice?", answer: "Após a vistoria e aprovação, a emissão ocorre em até 48 horas úteis, ideal para liberações bancárias urgentes." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro de Colheitadeira de Grãos", link: "/seguro-colheitadeira-graos" },
        { title: "Seguro de Pulverizador Agrícola", link: "/seguro-pulverizador-agricola" },
        { title: "Seguro Rural", link: "/seguro-rural" },
      ]}
    />
  );
};

export default SeguroColhedoraAlgodao;
