import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-agro-maquinas.webp";

const SeguroColhedoraAlgodao = () => (
  <InsurancePageTemplate
    localSeo={{ skip: true }}
    semGuarulhos
    heroImage={heroImg}
    title="Seguro de Colhedora de Algodão | Patro Seguros"
    headline="Seguro de colhedora de algodão e seus sistemas embarcados"
    subtitle="Análise da máquina, dos acessórios e do financiamento. Atendimento nacional a produtores, prestadores e concessionárias."
    icon="🚜"
    badge="Especialistas em máquinas agrícolas e penhor rural"
    metaDescription="Seguro de colhedora de algodão: confira incêndio, eletrônica, transporte e penhor rural. Atendimento nacional, incluindo Mato Grosso e oeste da Bahia."
    description="A Patro analisa colhedoras de algodão de cestos e de fardos conforme o modelo e a operação. Nossa parceria com a rede de concessionárias dos principais fabricantes ajuda a reunir os documentos para comparar as condições disponíveis."
    detailedDescription={`A colhedora de algodão concentra componentes de colheita, transporte e formação de fardos. Declare o modelo, os sistemas embarcados, os acessórios e os valores para que a proposta identifique o conjunto corretamente.

Incêndio em resíduos, tombamento e danos elétricos precisam ser avaliados conforme as condições do seguro. Falhas mecânicas, desgaste e defeitos de fabricação não têm cobertura automática. A apólice da máquina também não inclui necessariamente o algodão colhido ou os fardos armazenados.

Se a máquina estiver vinculada ao crédito rural, envie o contrato para análise de seguro penhor rural e das exigências do credor. A identificação do bem, a vigência e as cláusulas devem ser conferidas antes da contratação. Não prometemos aprovação da seguradora ou liberação do financiamento em prazo fixo.`}
    coverages={[
      { title: "Incêndio, raio e explosão", description: "Confira eventos cobertos, exigências de prevenção, limites e franquias na proposta." },
      { title: "Roubo e furto qualificado", description: "Verifique os eventos aceitos e as condições de guarda nas frentes de trabalho e nos pátios." },
      { title: "Tombamento e colisão", description: "Danos acidentais durante a operação dependem da cobertura contratada e do uso declarado." },
      { title: "Eletrônica e sensores", description: "Declare os sistemas embarcados. Danos elétricos podem exigir cobertura e limites próprios." },
      { title: "Quebra de vidros da cabine", description: "Consulte cobertura para para-brisa, vidros laterais e traseiro. Peças, causas aceitas, limites e franquia variam conforme o produto; riscos superficiais e desgaste não estão automaticamente incluídos." },
      { title: "Transporte do equipamento", description: "Consulte cobertura para danos durante o transporte em caminhão ou prancha. Informe rotas e transportador e confira a inclusão de carga e descarga. Deslocamentos por meios próprios exigem análise separada." },
      { title: "Responsabilidade civil", description: "Danos a terceiros devem ser analisados em cobertura própria, com limites e exclusões definidos." },
    ]}
    coverageExclusions={[
      "Desgaste de fusos, correias, correntes e pneus não é automaticamente coberto.",
      "Quebra mecânica e defeitos de fabricação não equivalem a acidente coberto.",
      "Perda de produção, paralisação e locação de equipamento substituto não estão automaticamente incluídas.",
      "Algodão colhido e fardos armazenados exigem análise separada da máquina.",
    ]}
    howItWorks={[
      { step: "1", title: "Dados do conjunto", description: "Envie marca, modelo, série, ano, valor e relação dos acessórios." },
      { step: "2", title: "Operação e prevenção", description: "Informe locais de trabalho, transporte, manutenção e sistemas de prevenção de incêndio." },
      { step: "3", title: "Propostas e crédito", description: "Compare limites, franquias e as exigências do financiamento, quando houver." },
      { step: "4", title: "Conferência da vigência", description: "Após a aceitação, confira bens, cláusulas e início da cobertura na apólice." },
    ]}
    pricingInfo={{ intro: "O preço depende do equipamento e da operação declarada.", factors: ["Modelo, ano e valor do conjunto", "Sistemas de colheita e formação de fardos", "Regime de trabalho, manutenção e prevenção de incêndio", "Regiões, deslocamentos e histórico de sinistros", "Coberturas, limites, franquias e financiamento"], note: "Frotas e máquinas de alto valor são analisadas individualmente, sem garantia de taxa ou aceitação." }}
    importantDetails={[
      { title: "Mato Grosso e oeste da Bahia", content: "Atendemos produtores em Mato Grosso, Luís Eduardo Magalhães, Barreiras e demais regiões produtoras de algodão. Informe todos os municípios e estados de operação, inclusive quando a máquina acompanha frentes de colheita fora da propriedade." },
      { title: "Prevenção de incêndio", content: "Siga as instruções do fabricante para limpeza e manutenção. Sistemas de supressão e seus registros podem ser exigidos pela seguradora; a exigência varia conforme o risco e o produto." },
      { title: "Valor da máquina e penhor rural", content: "Confira o critério de avaliação do bem, os limites e as cláusulas do credor. Valor declarado e eventual indenização não são necessariamente iguais; podem incidir franquias e outras condições contratuais." },
    ]}
    tips={["Mantenha registros de manutenção e limpeza", "Documente acessórios e alterações técnicas", "Informe mudanças nos locais e no regime de trabalho", "Em sinistro, priorize a segurança e comunique a seguradora"]}
    whoNeeds={["Produtores de algodão com máquinas próprias ou financiadas", "Prestadores de serviços de colheita", "Cooperativas e empresas com frotas agrícolas", "Concessionárias que apoiam seus compradores"]}
    whyPatro={["Especialização em máquinas agrícolas e penhor rural", "Parceria com a rede de concessionárias dos principais fabricantes", "Conferência dos acessórios e das exigências do credor", "Atendimento nacional e orientação documental em sinistros"]}
    faqs={[
      { question: "Colhedoras de cestos usadas podem ser seguradas?", answer: "Podem ser submetidas à análise. Modelo, idade, conservação e manutenção influenciam a aceitação. Não há garantia de aprovação nem limite de idade único para todas as seguradoras." },
      { question: "A Patro atende o oeste da Bahia?", answer: "Sim, atendemos Luís Eduardo Magalhães, Barreiras e todo o Brasil por canais digitais. A sede é em Guarulhos/SP. Vistorias e procedimentos de sinistro podem exigir presença no local, conforme a seguradora." },
      { question: "Os fardos dentro da máquina estão cobertos?", answer: "Não presuma essa inclusão. Algodão colhido, fardos e estoque precisam de análise de cobertura própria. O seguro do equipamento não garante automaticamente o produto agrícola." },
      { question: "O seguro cobre falha do sistema de enfardamento?", answer: "Depende da causa e das condições contratadas. Desgaste, quebra interna e defeitos podem estar excluídos; danos acidentais e eventual cobertura específica precisam ser conferidos." },
      { question: "Como cotar uma colhedora financiada?", answer: "Envie os dados do bem, o contrato de crédito e as exigências do credor. A Patro analisa o penhor rural ou o seguro aplicável e compara as condições disponíveis." },
      { question: "A apólice é emitida em até 48 horas?", answer: "Não há promessa de emissão em prazo fixo. O prazo depende dos documentos, da análise e de eventual vistoria. O pedido de cotação não inicia cobertura." },
    ]}
    relatedInsurances={[
      { title: "Guia: Penhor Rural para Máquinas Financiadas", link: "/blog/seguro-penhor-rural-maquinas-financiadas" },
      { title: "Seguro Penhor Rural", link: "/seguro-penhor-rural" },
      { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
      { title: "Colheitadeira de Grãos", link: "/seguro-colheitadeira-graos" },
      { title: "Pulverizador Agrícola", link: "/seguro-pulverizador-agricola" },
    ]}
  />
);

export default SeguroColhedoraAlgodao;
