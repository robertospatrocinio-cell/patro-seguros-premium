import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeguroGeradorEnergia = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Gerador de Energia"
      subtitle="Proteção de alto nível para garantir a continuidade energética do seu negócio"
      icon="⚡"
      badge="Especialista Corporativo"
      metaDescription="Seguro para Geradores de Energia em Guarulhos: proteção contra danos elétricos, quebra de maquinário e incêndio. Garanta a energia do seu negócio com a Patro Seguros."
      description="O Seguro de Gerador de Energia é uma proteção técnica especializada para equipamentos cruciais que sustentam operações em indústrias, condomínios, hospitais e centros de dados."
      detailedDescription={`Em um cenário de instabilidade energética, o gerador não é apenas um acessório, mas o coração da continuidade operacional. Uma falha crítica, um curto-circuito ou um dano mecânico acidental pode paralisar produções inteiras, comprometer estoques refrigerados ou colocar em risco a segurança de condomínios e centros médicos.

O seguro especializado da Patro Seguros cobre desde danos elétricos por variação de tensão até a quebra acidental de componentes internos. Oferecemos uma consultoria técnica para dimensionar corretamente as verbas de reparo e reposição, garantindo que o seu investimento tecnológico esteja amparado pelas melhores seguradoras do ramo de Riscos de Engenharia e Equipamentos.`}
      howItWorks={[
        { step: "1", title: "Levantamento Técnico", description: "Análise da marca, potência (kVA), ano e regime de uso do gerador (emergência ou contínuo)." },
        { step: "2", title: "Análise de Risco", description: "Avaliação do local de instalação, sistemas de proteção e histórico de manutenção preventiva." },
        { step: "3", title: "Desenho da Apólice", description: "Inclusão de coberturas específicas como quebra de máquinas e lucros cessantes por falta de energia." },
        { step: "4", title: "Ativação da Proteção", description: "Emissão da apólice com suporte total para gestão de manutenção e sinistros operacionais." },
      ]}
      coverages={[
        { title: "Danos Elétricos", description: "Proteção contra curto-circuito, sobrecarga e oscilações de tensão na rede." },
        { title: "Quebra de Maquinário", description: "Cobre falhas mecânicas súbitas e imprevistas de componentes internos do motor e alternador." },
        { title: "Incêndio e Explosão", description: "Cobertura para danos causados por fogo originado no próprio equipamento ou externamente." },
        { title: "Danos por Água e Alagamento", description: "Proteção em caso de inundações que atinjam a casa de máquinas ou local de instalação." },
        { title: "Roubo e Furto Qualificado", description: "Segurança contra a subtração do equipamento ou de componentes de alto valor." },
        { title: "Responsabilidade Civil", description: "Cobre danos a terceiros causados pelo funcionamento ou instalação do gerador." },
        { title: "Lucros Cessantes", description: "Garante a reposição de perdas financeiras caso a quebra do gerador paralise a operação principal." },
      ]}
      coverageExclusions={[
        "Desgaste natural de peças e consumíveis (filtros, óleos, correias)",
        "Manutenção preventiva negligenciada ou falta de combustível",
        "Danos estéticos que não afetam a funcionalidade do equipamento",
        "Atos de vandalismo ou sabotagem não comprovados",
        "Erros de projeto ou defeitos de fabricação (cobertos por garantia)",
      ]}
      pricingInfo={{
        intro: "O prêmio é calculado com base no valor de reposição do equipamento e no nível de risco da operação.",
        factors: [
          "Valor de mercado do gerador e custo de instalação",
          "Tipo de combustível (Diesel, Gás ou Biocombustível)",
          "Complexidade dos painéis de transferência (ATS)",
          "Localização geográfica e histórico de incidência de raios",
          "Regime de manutenção e existência de monitoramento remoto",
        ],
        note: "Para geradores de grande porte em indústrias, o seguro costuma representar menos de 1% do valor do bem ao ano.",
      }}
      realScenarios={[
        { title: "Curto no Alternador", description: "Uma oscilação severa na rede queimou o alternador de um gerador de 500kVA em um hospital. O seguro cobriu o reparo emergencial de R$ 38.000." },
        { title: "Quebra de Pistão", description: "Uma falha mecânica imprevista causou a quebra de um pistão durante um teste de carga. A cobertura de quebra de máquinas arcou com a retífica completa." },
        { title: "Inundação em Subsolo", description: "Um forte temporal alagou a casa de máquinas de um condomínio, danificando o sistema eletrônico do gerador. O seguro cobriu a substituição dos módulos." },
      ]}
      importantDetails={[
        { title: "Manutenção é Fundamental", content: "As seguradoras exigem que o plano de manutenção recomendado pelo fabricante esteja em dia. Relatórios técnicos são vitais em caso de sinistro." },
        { title: "Gerador de Aluguel", content: "Em caso de sinistro prolongado, algumas apólices cobrem o custo de locação de um gerador temporário para que o seu negócio não pare." },
      ]}
      tips={[
        "Mantenha sempre um log de testes semanais e manutenções preventivas",
        "Certifique-se de que a instalação elétrica segue as normas da ABNT",
        "Considere a cobertura de Lucros Cessantes se a energia for vital para sua receita",
        "Instale protetores de surto (DPS) adicionais para mitigar danos elétricos",
      ]}
      whoNeeds={[
        "Indústrias de Transformação",
        "Hospitais e Clínicas Médicas",
        "Data Centers e Empresas de TI",
        "Condomínios Residenciais e Comerciais",
        "Supermercados e Frigoríficos",
        "Hotéis e Shopping Centers",
      ]}
      whyPatro={[
        "Especialista em seguros de máquinas e equipamentos",
        "Parceria com fabricantes e concessionárias pelo Brasil",
        "Consultoria para dimensionamento de verbas técnicas",
        "Acesso a seguradoras globais especializadas em engenharia",
        "Agilidade no processo de regulação de sinistros corporativos",
        "Atendimento personalizado em Guarulhos e região metropolitana",
      ]}
      faqs={[
        { question: "O seguro cobre falta de combustível?", answer: "Não. A operação básica, como abastecimento e check-up de bateria, é de responsabilidade do segurado." },
        { question: "Cobre geradores usados?", answer: "Sim, desde que estejam em bom estado de conservação e com manutenção comprovada. Existe um limite de idade que varia por seguradora (geralmente até 10-15 anos)." },
        { question: "Quanto tempo demora para receber a indenização?", answer: "Após a entrega dos laudos técnicos e orçamentos, o prazo legal é de até 30 dias, mas trabalhamos para agilizar casos emergenciais." },
        { question: "O seguro é válido para geradores portáteis?", answer: "Sim, possuímos modalidades específicas para geradores portáteis e móveis usados em eventos ou obras." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro de Máquinas", link: "/seguro-maquinas" },
        { title: "Seguro Condomínio", link: "/seguro-condominio" },
      ]}
    />
  );
};

export default SeguroGeradorEnergia;
