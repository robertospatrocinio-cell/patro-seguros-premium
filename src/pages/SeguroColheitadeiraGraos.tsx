import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-agro-maquinas.jpg";


const SeguroColheitadeiraGraos = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Colheitadeira de Grãos"
      subtitle="Proteção premium para colheitadeiras de soja, milho e trigo. Cobertura nacional com consultoria especializada."
      icon="🚜"
      badge="Especialista em Colheita de Grãos"
      metaDescription="Seguro para Colheitadeiras de Grãos: proteção contra incêndio, roubo, quebra de máquinas e tombamento. Cobertura em todo o Brasil com a Patro Seguros."
      description="A colheitadeira de grãos é o motor financeiro da safra. O Seguro especializado da Patro Seguros oferece a segurança necessária para proteger equipamentos de alto valor tecnológico contra os riscos reais do campo."
      detailedDescription={`A janela de colheita é curta e não permite erros. Uma colheitadeira de grãos parada por um incêndio elétrico ou um tombamento pode comprometer o lucro de um ano inteiro de trabalho.

Nossa consultoria para Seguro de Colheitadeira de Grãos desenha apólices robustas que cobrem desde danos materiais acidentais até a fundamental 'Quebra de Máquinas'. Protegemos modelos tecnológicos da John Deere, Case IH, New Holland, Valtra e Massey Ferguson, garantindo que em caso de sinistro, você tenha o suporte necessário para retomar a operação com agilidade.

Com atendimento 100% remoto, atendemos produtores de grãos em todas as fronteiras agrícolas do Brasil, do Sul ao Matopiba, com emissão rápida para financiamentos bancários e suporte total em sinistros.`}
      howItWorks={[
        { step: "1", title: "Cadastro Técnico", description: "Informe marca, modelo, ano e valor (nota fiscal ou mercado) da colheitadeira." },
        { step: "2", title: "Análise de Risco Rural", description: "Avaliamos a região de operação, culturas colhidas e o histórico da frota." },
        { step: "3", title: "Desenho de Cobertura", description: "Customizamos verbas para danos elétricos, incêndio, quebra e RC operador." },
        { step: "4", title: "Ativação Nacional", description: "Emissão da apólice com validade em todo o território nacional e suporte 24h." },
      ]}
      coverages={[
        { title: "Incêndio e Explosão", description: "Proteção vital contra riscos térmicos no motor e sistemas de trilha." },
        { title: "Roubo e Furto Qualificado", description: "Segurança para máquinas em frentes de trabalho ou pátios de fazendas." },
        { title: "Tombamento e Colisão", description: "Cobre acidentes durante a operação em terrenos variados ou manobras." },
        { title: "Danos Elétricos e Sensores", description: "Proteção para computadores de bordo, GPS e sistemas de agricultura de precisão." },
        { title: "Quebra de Maquinário", description: "Cobertura para falhas mecânicas súbitas e imprevistas de componentes internos." },
        { title: "Responsabilidade Civil Operador", description: "Protege contra danos causados a terceiros ou propriedades vizinhas." },
        { title: "Transporte do Equipamento", description: "Garante a colheitadeira durante deslocamentos em pranchas entre propriedades." },
      ]}
      coverageExclusions={[
        "Desgaste natural de correias, navalhas e componentes de atrito",
        "Danos por falta de manutenção preventiva ou negligência técnica",
        "Operação por pessoas sem o treinamento ou habilitação exigida",
        "Danos estéticos que não afetam a produtividade da máquina",
        "Atos de vandalismo não comprovados ou sabotagem",
      ]}
      pricingInfo={{
        intro: "O prêmio é calculado sobre o valor de mercado e o nível tecnológico do equipamento.",
        factors: [
          "Marca e valor de reposição (especialmente para máquinas novas)",
          "Ano de fabricação e regime de horas de motor",
          "Região geográfica e incidência de eventos climáticos",
          "Existência de dispositivos de rastreamento e telemetria",
          "Uso em lavoura própria ou prestação de serviços (arrendamento)",
        ],
        note: "Para frotas de colheita em cooperativas, oferecemos condições especiais de franquia reduzida.",
      }}
      realScenarios={[
        { title: "Incêndio em Colheita de Milho", description: "Acúmulo de palha causou incêndio no compartimento do motor. O seguro cobriu os R$ 220.000 em reparos, garantindo a continuidade da safra." },
        { title: "Tombamento em Talhão Úmido", description: "A colheitadeira tombou lateralmente em uma área de banhado. O seguro arcou com R$ 95.000 em custos de resgate e reparos estruturais." },
        { title: "Quebra de Módulo Eletrônico", description: "Uma descarga elétrica queimou o monitor de produtividade e sensores. A reposição de R$ 38.000 foi paga integralmente." },
      ]}
      importantDetails={[
        { title: "Agricultura de Precisão", content: "Nossas apólices permitem incluir separadamente itens de alto valor como antenas GPS, monitores e sensores de umidade, garantindo a proteção total da tecnologia." },
        { title: "Suporte a Financiamentos", content: "Emitimos certificados e apólices nos padrões exigidos por BNDES, Banco do Brasil e Cooperativas de Crédito com total agilidade." },
      ]}
      tips={[
        "Mantenha sempre os sistemas de combate a incêndio da máquina revisados",
        "Sempre digitalize a Nota Fiscal de compra e de acessórios adicionais",
        "Contrate verbas de RC condizentes com o tamanho da operação",
        "Em caso de sinistro, pare a máquina imediatamente para não agravar o dano",
      ]}
      whoNeeds={[
        "Produtores de Soja, Milho, Trigo e Arroz",
        "Empresas de Prestação de Serviços de Colheita (Cerealistas)",
        "Cooperativas Agrícolas",
        "Grupos de Investimento no Agronegócio",
        "Produtores de Sementes com Maquinário Especializado",
      ]}
      whyPatro={[
        "Especialista em seguros de máquinas e equipamentos",
        "Parceria com fabricantes e concessionárias pelo Brasil",
        "Especialistas em riscos rurais com foco em grãos",
        "Consultoria para correta valoração de máquinas usadas",
        "Suporte em sinistros com foco na rapidez operacional",
        "Atendimento 100% remoto para todas as regiões do Brasil",
      ]}
      faqs={[
        { question: "O seguro cobre colheitadeiras de grãos usadas?", answer: "Sim, aceitamos máquinas com até 12-15 anos de uso, dependendo da marca e conservação." },
        { question: "A Patro atende o Mato Grosso e Goiás?", answer: "Sim! Atendemos produtores em todos os estados do Brasil com a mesma eficiência e segurança." },
        { question: "O seguro cobre a plataforma de corte?", answer: "Sim, a plataforma de corte faz parte da cobertura principal, sendo necessário informar o modelo e valor na contratação." },
        { question: "Quanto tempo leva para receber a indenização?", answer: "O prazo médio é de 30 dias após a documentação, mas trabalhamos para agilizar casos críticos durante a safra." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro de Trator Agrícola", link: "/seguro-trator-agricola" },
        { title: "Seguro de Colhedora de Cana", link: "/seguro-colhedora-cana" },
        { title: "Seguro Rural", link: "/seguro-rural" },
      ]}
    />
  );
};

export default SeguroColheitadeiraGraos;
