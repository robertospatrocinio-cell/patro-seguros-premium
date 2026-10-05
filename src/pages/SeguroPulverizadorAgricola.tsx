import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-agro-maquinas.webp";


const SeguroPulverizadorAgricola = () => {
  return (
    <InsurancePageTemplate
      localSeo={{ skip: true }}
      heroImage={heroImg}
      title="Seguro de Pulverizador Agrícola"
      subtitle="Proteção para pulverizadores autopropelidos e de arrasto. Cobertura nacional com foco em tecnologia e precisão."
      icon="🚜"
      badge="Especialista em Tecnologia do Campo"
      metaDescription="Seguro para Pulverizadores Agrícolas: analise roubo, incêndio, danos elétricos, barras e outras coberturas conforme a apólice."
      description="O pulverizador é um dos equipamentos mais tecnológicos e sensíveis do campo. O Seguro especializado da Patro Seguros garante a proteção contra danos mecânicos, elétricos e acidentais em todo o Brasil."
      detailedDescription={`A pulverização é uma etapa crítica para a saúde da lavoura. Um pulverizador autopropelido parado por uma quebra de barra, um curto-circuito no monitor de fluxo ou um tombamento em manobra pode comprometer toda a janela de aplicação de defensivos.

Nossa consultoria para Seguro de Pulverizador Agrícola entende a complexidade desses equipamentos. Cobrimos desde a estrutura física até os sistemas de agricultura de precisão, sensores de bico e eletrônica embarcada. Trabalhamos com as melhores seguradoras do agro para oferecer coberturas como 'Quebra de Máquinas' e Responsabilidade Civil Operacional, protegendo o produtor contra danos ambientais ou a terceiros.

Com atendimento 100% remoto, facilitamos a contratação para produtores de todos os estados, garantindo agilidade na emissão e um suporte técnico de alto nível em caso de sinistros.`}
      howItWorks={[
        { step: "1", title: "Dados do Equipamento", description: "Informe marca (Jacto, John Deere, Case, etc), modelo, ano e tecnologia embarcada." },
        { step: "2", title: "Análise Operacional", description: "Definimos o perfil de uso, região de atuação e histórico de manutenção." },
        { step: "3", title: "Proposta Personalizada", description: "Apresentamos as melhores opções com foco em coberturas técnicas e preço justo." },
        { step: "4", title: "Emissão Digital", description: "Apólice emitida rapidamente com assinatura digital, válida em todo o território nacional." },
      ]}
      coverages={[
        { title: "Incêndio e Explosão", description: "Proteção contra riscos térmicos no motor e sistemas hidráulicos." },
        { title: "Roubo e Furto Qualificado", description: "Segurança para equipamentos em galpões ou frentes de trabalho." },
        { title: "Tombamento e colisão", description: "Podem ser cobertos durante a operação quando previstos no produto e na apólice." },
        { title: "Quebra de barras e estrutura", description: "Pode existir cobertura específica para dano acidental; desgaste, manutenção e pane não são automaticamente cobertos." },
        { title: "Danos Elétricos e Eletrônicos", description: "Proteção para GPS, monitores, bicos eletrônicos e sensores de fluxo." },
        { title: "Responsabilidade Civil Operador", description: "Protege contra danos causados a propriedades vizinhas ou pessoas." },
        { title: "RC Ambiental eventual", description: "Pode contemplar danos a terceiros ou ambientais quando a cobertura específica for contratada e o evento estiver abrangido." },
      ]}
      coverageExclusions={[
        "Desgaste natural de bicos, mangueiras e filtros",
        "Danos por falta de limpeza ou resíduos químicos acumulados",
        "Operação por pessoas sem a devida qualificação técnica",
        "Atos ilícitos intencionais ou negligência grave comprovada",
        "Danos estéticos que não afetam a funcionalidade do pulverizador",
      ]}
      pricingInfo={{
        intro: "O prêmio é calculado conforme o valor tecnológico e a região de operação do equipamento.",
        factors: [
          "Marca e valor de mercado (incluindo tecnologia embarcada)",
          "Ano de fabricação e estado das barras e motor",
          "Tipo de cultura e regime de aplicação (safra/safrinha)",
          "Existência de dispositivos de rastreamento e telemetria",
          "Localização da propriedade e histórico de sinistros",
        ],
        note: "Pulverizadores com sistemas de corte de seção e telemetria avançada possuem análise técnica diferenciada.",
      }}
      realScenarios={[
        { title: "Dano em barra", description: "Danos acidentais em barras dependem da cobertura, do evento, dos limites e das condições da apólice." },
        { title: "Sistema de GPS", description: "Danos em antena, monitor ou sensores dependem da descrição dos equipamentos e da cobertura de danos elétricos contratada." },
        { title: "Tombamento em Curva de Nível", description: "Máquina tombou durante aplicação em terreno íngreme. O seguro arcou com R$ 110.000 em reparos estruturais e resgate especializado." },
      ]}
      importantDetails={[
        { title: "Proteção de Bicos e Sensores", content: "Muitas seguradoras não cobrem itens periféricos; nossa consultoria garante que os sensores de alta tecnologia e o sistema de pulverização estejam descritos na apólice." },
        { title: "Uso de Defensivos", content: "A cobertura de Responsabilidade Civil é fundamental para resguardar o produtor em caso de deriva acidental que atinja lavouras vizinhas." },
      ]}
      tips={[
        "Mantenha sempre os relatórios de calibração do sistema de pulverização em dia",
        "Sempre digitalize a Nota Fiscal do equipamento e de upgrades tecnológicos",
        "Instale protetores de surto adicionais para proteger a eletrônica sensível",
        "Em caso de vazamento químico acidental, acione o seguro imediatamente para contenção",
      ]}
      whoNeeds={[
        "Produtores de Grandes Culturas (Soja, Milho, Algodão)",
        "Empresas de Aviação e Pulverização Agrícola",
        "Cooperativas Rurais com Frotas de Aplicação",
        "Prestadores de Serviços de Pulverização",
        "Produtores de Fruticultura Mechanizada",
      ]}
      whyPatro={[
        "Especialista em seguros de máquinas e equipamentos",
        "Parceria com fabricantes e concessionárias pelo Brasil",
        "Especialistas em riscos rurais e alta tecnologia no campo",
        "Consultoria para correta valoração de tecnologia embarcada",
        "Suporte em sinistros com foco na agilidade de aplicação",
        "Atendimento nacional para todas as fronteiras agrícolas",
      ]}
      faqs={[
        { question: "O seguro cobre pulverizadores de arrasto?", answer: "A aceitação de modelos autopropelidos ou acoplados depende do produto, da descrição do bem, do uso e dos critérios da seguradora." },
        { question: "O seguro cobre contaminação ambiental?", answer: "Sim, desde que seja contratada a cobertura adicional de Responsabilidade Civil Ambiental Eventual." },
        { question: "Qual o prazo para receber a indenização?", answer: "O prazo depende do evento, da cobertura, da documentação, da regulação, da apólice e da legislação aplicável. Não há promessa universal de prazo fixo." },
        { question: "Posso incluir o GPS e monitor de outra marca?", answer: "Sim, é possível incluir acessórios de agricultura de precisão instalados posteriormente, desde que informados na contratação." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro de Trator Agrícola", link: "/seguro-trator-agricola" },
        { title: "Seguro de Drone Agrícola", link: "/seguro-drone-agricola" },
        { title: "Seguro Rural", link: "/seguro-rural" },
      ]}
    />
  );
};

export default SeguroPulverizadorAgricola;
