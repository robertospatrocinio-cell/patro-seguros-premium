import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-agro-maquinas.webp";

const SeguroColhedoraCana = () => (
  <InsurancePageTemplate
    localSeo={{ skip: true }}
    semGuarulhos
    heroImage={heroImg}
    title="Seguro de Colhedora de Cana e Penhor Rural | Patro"
    headline="Seguro de colhedora de cana para usinas e prestadores"
    subtitle="Análise da máquina, das frentes de colheita e do financiamento. Atendimento nacional com apoio à organização dos documentos."
    icon="🚜"
    badge="Especialistas em máquinas agrícolas"
    metaDescription="Seguro de colhedora de cana: analise incêndio, tombamento, transporte e exigências de penhor rural. Atendimento nacional da Patro a produtores e usinas."
    description="A Patro é especialista em máquinas agrícolas e mantém parceria com a rede de concessionárias dos principais fabricantes. Conferimos os riscos declarados e as condições disponíveis para colhedoras próprias ou financiadas."
    detailedDescription={`O regime de trabalho na safra, o acúmulo de resíduos e os deslocamentos entre frentes de colheita precisam ser informados na cotação. Registros de limpeza e manutenção ajudam a documentar a conservação da colhedora, mas não garantem aceitação ou desconto.

Incêndio, colisão e tombamento são eventos a conferir na proposta. Quebra de componentes internos, desgaste e falhas mecânicas não estão automaticamente cobertos. Danos elétricos e responsabilidade civil também precisam de análise própria.

Em colhedoras vinculadas ao crédito rural, envie o contrato para conferência do seguro penhor rural, do interesse do credor e da vigência exigida. A emissão depende da análise da seguradora; o pedido de cotação não inicia cobertura nem garante liberação bancária.`}
    coverages={[
      { title: "Incêndio, raio e explosão", description: "Confira eventos aceitos, medidas de segurança, limites e franquia na proposta." },
      { title: "Roubo e furto qualificado", description: "A contratação depende dos eventos previstos e das condições de guarda declaradas." },
      { title: "Colisão e tombamento", description: "Danos acidentais durante a operação devem estar previstos na cobertura contratada." },
      { title: "Danos elétricos", description: "Monitores, sensores e chicotes exigem identificação e análise de cobertura específica." },
      { title: "Transporte entre frentes", description: "Confira deslocamento próprio, transporte em prancha, carga e descarga separadamente." },
      { title: "Responsabilidade civil", description: "Danos a terceiros exigem análise de atividade, limites e exclusões próprios." },
    ]}
    coverageExclusions={[
      "Desgaste de facas, correias e pneus e manutenção rotineira não têm cobertura automática.",
      "Quebra mecânica e defeitos de fabricação não equivalem a acidente coberto.",
      "Perda de produção, paralisação e locação de outra máquina não estão automaticamente incluídas.",
      "Uso, operadores e locais fora das condições aceitas precisam ser avaliados conforme a apólice.",
    ]}
    howItWorks={[
      { step: "1", title: "Identifique o ativo", description: "Envie marca, modelo, ano, série, valor e documento de propriedade." },
      { step: "2", title: "Informe a operação", description: "Descreva frentes de colheita, regime de trabalho, transporte e prestação de serviços." },
      { step: "3", title: "Compare as condições", description: "Confira coberturas, franquias e requisitos do financiamento, quando houver." },
      { step: "4", title: "Confira a apólice", description: "Após a aceitação, verifique bens, cláusulas e início da vigência." },
    ]}
    pricingInfo={{ intro: "O preço depende da colhedora e da rotina de operação.", factors: ["Modelo, ano e valor", "Regime de trabalho e histórico de manutenção", "Regiões, transporte e frentes de colheita", "Coberturas, limites e franquias", "Financiamento e histórico de sinistros"], note: "Frotas são analisadas individualmente. Quantidade de máquinas não garante taxa menor." }}
    importantDetails={[
      { title: "Regiões produtoras de cana", content: "Atendemos usinas e prestadores no interior de São Paulo, Goiás, Minas Gerais, Mato Grosso do Sul e demais regiões produtoras. Informe todos os locais de atuação e as rotas de transporte, inclusive mudanças durante a safra." },
      { title: "Segurança e valor do bem", content: "Confira as exigências de prevenção de incêndio e o critério de avaliação da máquina. Valor declarado, limite da cobertura e valor de eventual indenização não são necessariamente iguais." },
      { title: "Concessionária e financiamento", content: "A parceria com concessionárias ajuda a reunir ficha técnica, nota fiscal e dados do crédito. A Patro confere as exigências de penhor rural sem prometer aceitação ou liberação do financiamento." },
    ]}
    tips={["Siga as orientações do fabricante sobre limpeza e manutenção", "Mantenha registros dos sistemas de prevenção de incêndio", "Informe mudanças de operação antes de assumir que estão cobertas"]}
    whoNeeds={["Usinas de açúcar e etanol", "Produtores de cana com colheita mecanizada", "Prestadores de serviços de colheita", "Cooperativas e proprietários de máquinas financiadas"]}
    whyPatro={["Especialização em máquinas agrícolas e penhor rural", "Parceria com a rede de concessionárias dos principais fabricantes", "Conferência do uso e das exigências do credor", "Atendimento nacional e orientação documental em sinistros"]}
    faqs={[
      { question: "Colhedoras usadas podem ser seguradas?", answer: "Podem ser submetidas à análise. Modelo, idade, conservação e manutenção influenciam a aceitação; não existe um limite único de idade para todas as seguradoras." },
      { question: "Quebra de máquinas está incluída?", answer: "Não automaticamente. Falhas internas e desgaste podem estar excluídos. Eventual cobertura específica depende do produto disponível e da aceitação da seguradora." },
      { question: "O seguro inclui transporte entre usinas?", answer: "Somente conforme as condições contratadas. Informe rotas, meio de transporte, carga e descarga; não presuma que a cobertura na lavoura inclua o transporte." },
      { question: "Como funciona para colhedora financiada?", answer: "Envie o contrato e os requisitos do credor para análise de penhor rural ou do seguro aplicável. Confira identificação da máquina, vigência e cláusulas exigidas." },
      { question: "Há prazo garantido de indenização?", answer: "Não prometemos pagamento ou conclusão em prazo fixo. A regulação depende do evento, dos documentos e das regras aplicáveis. A Patro acompanha o encaminhamento com a seguradora." },
    ]}
    relatedInsurances={[
      { title: "Seguro Penhor Rural", link: "/seguro-penhor-rural" },
      { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
      { title: "Equipamentos Agrícolas", link: "/seguro-equipamentos-agricolas" },
      { title: "Colheitadeira de Grãos", link: "/seguro-colheitadeira-graos" },
    ]}
  />
);

export default SeguroColhedoraCana;
