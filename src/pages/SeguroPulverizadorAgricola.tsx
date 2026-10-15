import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-agro-maquinas.webp";

const SeguroPulverizadorAgricola = () => (
  <InsurancePageTemplate
    localSeo={{ skip: true }}
    semGuarulhos
    heroImage={heroImg}
    title="Seguro de Pulverizador Agrícola | Patro Seguros"
    headline="Seguro de pulverizador agrícola conforme a operação"
    subtitle="Autopropelidos e implementos de arrasto. Analise a máquina, as barras, a eletrônica e a responsabilidade pela aplicação."
    icon="🚜"
    badge="Especialistas em máquinas agrícolas e penhor rural"
    metaDescription="Seguro de pulverizador agrícola: confira barras, eletrônica, responsabilidade civil e penhor rural. Atendimento nacional a produtores e prestadores."
    description="A Patro compara as condições disponíveis para pulverizadores e confere as exigências do financiamento. Nossa parceria com a rede de concessionárias dos principais fabricantes ajuda na organização dos dados técnicos e documentos."
    detailedDescription={`Um pulverizador reúne barras, bicos, sensores, monitores e sistemas de orientação. Informe os componentes e seus valores, inclusive equipamentos instalados depois da compra. Danos acidentais às barras não devem ser confundidos com desgaste, corrosão ou quebra interna.

O seguro da máquina trata dos danos ao equipamento nos eventos contratados. Responsabilidade civil pela aplicação de defensivos exige análise separada. Deriva, contaminação, danos ambientais e prejuízos a lavouras vizinhas não estão automaticamente incluídos em uma cobertura genérica de RC.

Declare culturas, produtos aplicados, locais, operadores e eventual prestação de serviços. A atividade precisa ser informada e aceita pela seguradora. A apólice não substitui as obrigações técnicas, ambientais e de segurança aplicáveis.

Para pulverizadores vinculados ao crédito rural, envie o contrato e os requisitos do credor para análise de seguro penhor rural. A aceitação depende do equipamento e da operação; o pedido de cotação não inicia cobertura.`}
    howItWorks={[
      { step: "1", title: "Equipamento e acessórios", description: "Envie marca, modelo, série, ano, valor e relação da tecnologia embarcada." },
      { step: "2", title: "Atividade de aplicação", description: "Informe culturas, locais, operadores, produtos aplicados e prestação de serviços." },
      { step: "3", title: "Análise por risco", description: "Compare danos à máquina, responsabilidade civil, transporte e requisitos do crédito." },
      { step: "4", title: "Conferência da apólice", description: "Após a aceitação, confira coberturas, exclusões, franquias e início da vigência." },
    ]}
    coverages={[
      { title: "Incêndio, raio e explosão", description: "Eventos sujeitos às condições, aos limites e à franquia da cobertura contratada." },
      { title: "Roubo e furto qualificado", description: "Verifique os eventos aceitos e as condições de guarda do pulverizador e dos acessórios." },
      { title: "Tombamento e colisão", description: "Danos acidentais durante o uso declarado precisam estar previstos na proposta." },
      { title: "Danos acidentais às barras", description: "Confira a inclusão das barras e os eventos aceitos. Desgaste e quebra interna não têm cobertura automática." },
      { title: "Eletrônica embarcada", description: "Declare GPS, monitores e sensores; danos elétricos podem exigir cobertura e limites próprios." },
      { title: "Responsabilidade pela aplicação", description: "Deriva, danos ambientais e prejuízos a terceiros exigem análise expressa e podem não ser aceitos." },
    ]}
    coverageExclusions={[
      "Desgaste de bicos, mangueiras e filtros e corrosão não equivalem a acidente coberto.",
      "Defeitos de fabricação, resíduos acumulados e falhas de manutenção podem estar excluídos.",
      "Perda de safra, paralisação e despesas de locação não estão automaticamente incluídas.",
      "Danos por defensivos e contaminação não devem ser presumidos como parte do seguro da máquina.",
    ]}
    pricingInfo={{ intro: "O custo depende do equipamento, da atividade e das coberturas analisadas.", factors: ["Modelo, ano e valor, incluindo acessórios", "Culturas, locais e produtos aplicados", "Uso próprio ou prestação de serviços", "Transporte e histórico de sinistros", "Limites, franquias e exigências do credor"], note: "Telemetria e treinamento não garantem desconto ou aceitação. Compare as condições além do preço." }}
    importantDetails={[
      { title: "Atendimento às regiões agrícolas", content: "Atendemos operações de grãos e algodão em Mato Grosso, Goiás e Bahia, cana no interior paulista e demais culturas e regiões do Brasil. Informe todos os municípios e deslocamentos; atendimento nacional não significa aceitação automática de qualquer operação." },
      { title: "Pulverizador financiado", content: "Confira a identificação da máquina, dos acessórios e as cláusulas exigidas no crédito rural. Penhor rural e responsabilidade pela aplicação são análises distintas." },
      { title: "Pulverização terrestre e por drone", content: "O pulverizador terrestre e o drone precisam de análise própria. Seguro de máquinas não garante casco aeronáutico ou RETA. Declare cada equipamento e sua atividade antes de contratar." },
    ]}
    tips={["Mantenha registros de calibração e manutenção", "Documente acessórios instalados após a compra", "Siga orientações técnicas e regras aplicáveis à aplicação", "Em vazamento, priorize a segurança, acione os responsáveis competentes e comunique a seguradora"]}
    whoNeeds={["Produtores com pulverizadores próprios ou financiados", "Prestadores de serviços de aplicação terrestre", "Cooperativas com frotas de pulverização", "Concessionárias que apoiam seus compradores"]}
    whyPatro={["Especialização em máquinas, equipamentos agrícolas e penhor rural", "Parceria com a rede de concessionárias dos principais fabricantes", "Análise separada do equipamento e da responsabilidade pela aplicação", "Atendimento nacional e orientação documental em sinistros"]}
    faqs={[
      { question: "Pulverizadores de arrasto podem ser segurados?", answer: "Podem ser submetidos à análise. Declare o implemento, seu valor, o trator utilizado e a rotina de operação. Não presuma inclusão automática no seguro do trator." },
      { question: "O seguro cobre contaminação e deriva?", answer: "Não automaticamente. A aplicação deve ser informada e aceita, com análise expressa de danos a terceiros, lavouras vizinhas e meio ambiente. Pode haver exclusões ou necessidade de contratação específica, conforme disponibilidade." },
      { question: "Quebra de barra está sempre coberta?", answer: "Não. Uma colisão acidental deve ser diferenciada de desgaste, corrosão ou falha interna. A causa, a inclusão do item e as condições da apólice determinam a análise." },
      { question: "Posso incluir GPS e monitor de outra marca?", answer: "Informe modelo, valor e instalação dos acessórios. A inclusão depende da aceitação e deve constar na proposta e na apólice; não é automática." },
      { question: "Quando avaliar seguro penhor rural?", answer: "Quando o pulverizador estiver vinculado a uma operação de crédito rural, envie o contrato e as exigências do credor. A Patro confere o enquadramento e as cláusulas necessárias." },
      { question: "Qual o prazo para receber a indenização?", answer: "A regulação depende do evento, dos documentos e das regras aplicáveis. A Patro acompanha o processo, mas não garante pagamento integral ou conclusão em prazo fixo." },
    ]}
    relatedInsurances={[
      { title: "Seguro Penhor Rural", link: "/seguro-penhor-rural" },
      { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
      { title: "Equipamentos Agrícolas", link: "/seguro-equipamentos-agricolas" },
      { title: "Drone Agrícola", link: "/seguro-drone-agricola" },
    ]}
  />
);

export default SeguroPulverizadorAgricola;
