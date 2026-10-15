import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-drone.webp";

const SeguroDroneAgricola = () => (
  <InsurancePageTemplate
    localSeo={{ skip: true }}
    heroImage={heroImg}
    title="Seguro de Drone Agrícola: Casco e RC | Patro Seguros"
    headline="Seguro de drone agrícola para pulverização e mapeamento"
    subtitle="Analise danos ao equipamento e responsabilidade civil em contratações adequadas à sua operação. Atendimento nacional a produtores, prestadores de serviços e concessionárias."
    icon="🚁"
    metaDescription="Seguro de drone agrícola para pulverização e mapeamento. Entenda casco, RETA, responsabilidade civil e financiamento com a orientação da Patro."
    badge="Especialistas no agro • Atendimento nacional"
    quoteCtaText="Analisar o seguro do meu drone"
    description="A Patro é especialista em máquinas, equipamentos e drones agrícolas e tem parceria com a rede de concessionárias dos principais fabricantes. Conferimos o uso declarado, os acessórios e as condições disponíveis, sem tratar casco, RETA e pulverização como uma única cobertura."
    detailedDescription={`Um drone agrícola pode operar na própria lavoura ou prestar serviços em várias propriedades. Pulverização, aplicação de insumos, mapeamento e monitoramento têm riscos diferentes. Informe a atividade, os municípios de operação, os operadores e a documentação aplicável antes de comparar propostas.

O seguro de casco trata dos danos ao próprio equipamento nos eventos contratados. O RETA trata da responsabilidade civil aeronáutica nos limites e condições da apólice. Ter RETA não significa que o drone esteja coberto contra queda, roubo ou danos aos acessórios.

Danos por deriva de defensivos, contaminação, prejuízos a lavouras vizinhas e danos ambientais precisam de análise expressa. Não presuma que estejam incluídos no RETA ou em uma cobertura genérica de responsabilidade civil. A atividade de pulverização deve ser informada e aceita pela seguradora.

Se o drone estiver financiado ou vinculado a uma garantia de crédito rural, envie o contrato. A Patro confere as exigências do credor e a possibilidade de enquadramento do bem no seguro apropriado. O penhor rural não substitui automaticamente o casco aeronáutico nem a responsabilidade civil.`}
    coverages={[
      { title: "Casco: danos ao drone", description: "Queda, colisão e pouso forçado precisam estar previstos na cobertura contratada, respeitando o uso aceito, as franquias e os limites." },
      { title: "Roubo e furto qualificado", description: "Verifique os eventos aceitos, locais de guarda e itens descritos. Furto simples e desaparecimento não devem ser considerados incluídos." },
      { title: "Responsabilidade civil e RETA", description: "Analise danos a terceiros e os limites aplicáveis à operação. Essa proteção é distinta do seguro do próprio drone." },
      { title: "Pulverização e deriva", description: "A responsabilidade por aplicação de insumos exige avaliação específica. Danos ambientais e a lavouras vizinhas não têm cobertura automática." },
      { title: "Baterias e acessórios", description: "Declare baterias, controles, sensores, câmeras e tanques. Confirme valores, inclusão e condições de uso, guarda e recarga." },
      { title: "Transporte terrestre", description: "Informe o transporte entre propriedades e verifique se há cobertura durante deslocamentos, carga e descarga." },
    ]}
    coverageExclusions={[
      "Desgaste de hélices e perda gradual da capacidade de baterias não equivalem a acidente coberto.",
      "Defeito de fabricação, pane, falha de GPS e perda de sinal não têm cobertura automática; causa e consequências dependem da apólice.",
      "Lucros cessantes, perda de safra e despesas com equipamento substituto não estão automaticamente incluídos.",
      "Operações, operadores ou locais fora das condições legais e contratuais precisam ser avaliados conforme as regras aplicáveis e a apólice.",
    ]}
    howItWorks={[
      { step: "1", title: "Drone e acessórios", description: "Envie marca, modelo, série, ano, valor, documento de propriedade e relação dos acessórios." },
      { step: "2", title: "Atividade e documentação", description: "Informe pulverização ou mapeamento, locais, operadores, registros e autorizações aplicáveis à operação." },
      { step: "3", title: "Análise por risco", description: "Compare casco, responsabilidade civil, transporte e eventuais exigências do credor nas propostas disponíveis." },
      { step: "4", title: "Aceitação e vigência", description: "Confira condições, franquias e início da vigência após a análise da seguradora. Cotação não inicia cobertura." },
    ]}
    importantDetails={[
      { title: "Regras para operar", content: "Verifique as exigências vigentes da ANAC, do DECEA e da ANATEL conforme aeronave e operação. Na aplicação aeroagrícola, confira também as regras do MAPA e demais autoridades competentes. Cadastro, habilitação e autorizações variam; a apólice não regulariza uma operação." },
      { title: "Operação nas regiões agrícolas", content: "Atendemos produtores e prestadores no Centro-Oeste, Sul, Sudeste e MATOPIBA, além das demais regiões do Brasil. Informe todos os estados de atuação, especialmente quando o drone acompanha safras em Mato Grosso, Goiás, Paraná, Minas Gerais ou Bahia. Atendimento nacional não significa que qualquer operação esteja aceita." },
      { title: "Financiamento e concessionária", content: "Organizamos os dados técnicos com o produtor e a concessionária parceira. Em drones financiados, conferimos o bem, os acessórios e as cláusulas exigidas pelo credor sem presumir aceitação no penhor rural." },
    ]}
    pricingInfo={{
      intro: "Não existe uma taxa única que represente todas as operações de drone agrícola.",
      factors: ["Modelo, ano e valor do drone e dos acessórios", "Pulverização, mapeamento ou outras atividades declaradas", "Regiões de operação e experiência dos operadores", "Coberturas de casco e responsabilidade civil, limites e franquias", "Guarda, recarga, transporte e histórico de sinistros"],
      note: "A cotação depende de análise. Frota, treinamento ou histórico favorável não garantem desconto nem aceitação.",
    }}
    whoNeeds={[
      "Produtores que utilizam drones na própria lavoura",
      "Prestadores de serviços de pulverização e mapeamento",
      "Cooperativas e empresas de agricultura de precisão",
      "Compradores de drones financiados e concessionárias que os atendem",
    ]}
    whyPatro={[
      "Especialização em máquinas, equipamentos agrícolas, drones e penhor rural",
      "Parceria com a rede de concessionárias dos principais fabricantes",
      "Análise separada de casco, responsabilidade civil e exigências do financiamento",
      "Atendimento nacional por canais digitais e orientação documental",
      "Acompanhamento do sinistro conforme os procedimentos da seguradora",
    ]}
    faqs={[
      { question: "RETA cobre queda do meu drone agrícola?", answer: "O RETA é voltado à responsabilidade civil aeronáutica e não substitui o seguro de casco. Para danos ao próprio drone, confira a contratação de casco, os eventos previstos, os limites e as franquias." },
      { question: "Danos por pulverização e deriva estão cobertos?", answer: "Não automaticamente. Declare a aplicação de insumos e peça análise expressa para danos a terceiros, lavouras vizinhas e meio ambiente. Esses riscos podem ter exclusões ou exigir contratação específica, conforme a disponibilidade da seguradora." },
      { question: "O seguro cobre falha de GPS ou defeito de fabricação?", answer: "Não é possível afirmar isso de forma geral. Defeitos e panes podem estar excluídos, e eventuais danos consequentes dependem da causa e das condições contratadas. O seguro não substitui garantia do fabricante nem manutenção." },
      { question: "Posso cotar um DJI Agras ou outra marca?", answer: "Sim, podemos encaminhar os dados para análise. Marca, modelo, idade, documentação e operação influenciam a aceitação. Isso não representa aprovação de todos os modelos nem vínculo exclusivo com o fabricante." },
      { question: "Drone financiado pode ter seguro penhor rural?", answer: "É necessário analisar o contrato de crédito, a garantia, o equipamento e os produtos disponíveis. A aceitação não é automática. Mesmo quando há vínculo com penhor rural, casco e responsabilidade civil aeronáutica devem ser conferidos separadamente." },
      { question: "Baterias e controles estão incluídos?", answer: "Somente conforme a identificação dos itens e as condições aceitas. Informe quantidade, valor e forma de uso, guarda e recarga. Desgaste e perda de capacidade não devem ser confundidos com danos acidentais cobertos." },
      { question: "Como cotar fora de São Paulo?", answer: "Envie os dados do equipamento, dos operadores e da atividade por nossos canais digitais. A Patro tem sede em Guarulhos/SP e atende todo o Brasil. Prazos, vistorias e documentos adicionais dependem da seguradora; não há início de cobertura apenas com o pedido de cotação." },
    ]}
    relatedInsurances={[
      { title: "Seguro RETA Drone", link: "/seguro-reta-drone" },
      { title: "Seguro Penhor Rural", link: "/seguro-penhor-rural" },
      { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
      { title: "Equipamentos Agrícolas", link: "/seguro-equipamentos-agricolas" },
      { title: "Seguros para o Agronegócio", link: "/seguro-agro" },
    ]}
  />
);

export default SeguroDroneAgricola;
