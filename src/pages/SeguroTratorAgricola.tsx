import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-agro-maquinas.webp";

const SeguroTratorAgricola = () => (
  <InsurancePageTemplate
    localSeo={{ skip: true }}
    semGuarulhos
    heroImage={heroImg}
    title="Seguro de Trator Agrícola e Financiado | Patro Seguros"
    headline="Seguro de trator agrícola para o trabalho e o financiamento"
    subtitle="Análise do trator, dos implementos e da operação. Atendimento nacional a produtores e concessionárias."
    icon="🚜"
    badge="Especialistas em máquinas agrícolas e penhor rural"
    metaDescription="Seguro de trator agrícola próprio ou financiado. Compare coberturas, transporte e exigências de penhor rural com atendimento nacional da Patro."
    description="A Patro analisa os riscos do trator conforme o uso em lavoura própria, área arrendada ou prestação de serviços. Conferimos as condições disponíveis e as exigências do credor para máquinas financiadas."
    detailedDescription={`O trator pode trabalhar com plantadeira, grade, carreta ou outros implementos. Informe cada item e seu valor: o seguro do trator não inclui automaticamente tudo o que estiver acoplado. GPS e piloto automático também precisam ser declarados.

Incêndio, colisão e tombamento são eventos a conferir na proposta. Defeito mecânico e desgaste não devem ser confundidos com acidente coberto. Responsabilidade civil, transporte em prancha e circulação em vias públicas exigem análise das condições específicas.

Em um financiamento rural, envie o contrato e as exigências do banco ou cooperativa para avaliação de seguro penhor rural. A identificação da máquina, a vigência e as cláusulas do credor devem corresponder ao bem e à operação contratados.

Nossa parceria com a rede de concessionárias dos principais fabricantes facilita a organização de dados técnicos e documentos. A seguradora decide a aceitação após analisar o risco; a parceria não implica aprovação automática nem vínculo direto com cada fabricante.`}
    howItWorks={[
      { step: "1", title: "Identifique o trator", description: "Envie marca, modelo, ano, série ou chassi, valor e documento de propriedade." },
      { step: "2", title: "Declare o trabalho", description: "Informe culturas, municípios, implementos, prestação de serviços e deslocamentos." },
      { step: "3", title: "Confira o financiamento", description: "Envie o contrato, quando houver, e compare coberturas, franquias e cláusulas do credor." },
      { step: "4", title: "Verifique a vigência", description: "Após a aceitação, confira os dados e o início da cobertura na apólice." },
    ]}
    coverages={[
      { title: "Incêndio, raio e explosão", description: "Eventos sujeitos às condições, aos limites e à franquia da cobertura contratada." },
      { title: "Roubo e furto qualificado", description: "Confira eventos aceitos e exigências de guarda; furto simples não deve ser presumido como incluído." },
      { title: "Colisão e tombamento", description: "Analise danos acidentais durante o uso informado e aceito pela seguradora." },
      { title: "Danos elétricos", description: "Componentes e acessórios eletrônicos podem exigir contratação e limites específicos." },
      { title: "Responsabilidade civil", description: "Danos a terceiros precisam de cobertura própria, com atividades e limites definidos." },
      { title: "Quebra de vidros da cabine", description: "Consulte cobertura para para-brisa, vidros laterais e traseiro. Itens aceitos, causas cobertas, limites e franquia variam conforme a seguradora; riscos e desgaste não estão automaticamente incluídos." },
      { title: "Transporte do trator", description: "Consulte cobertura para danos durante o transporte em caminhão ou prancha. Informe rotas e transportador e confira se carga e descarga estão incluídas. Circulação por meios próprios exige análise separada." },
    ]}
    coverageExclusions={[
      "Desgaste de pneus e correias, manutenção e corrosão não têm cobertura automática.",
      "Quebra mecânica e defeitos de fabricação não são automaticamente cobertos.",
      "Perda de safra, paralisação e aluguel de trator substituto exigem análise específica.",
      "Uso e operadores fora das condições aceitas podem afetar a cobertura, conforme a apólice.",
    ]}
    pricingInfo={{ intro: "O custo depende do trator e da rotina de trabalho.", factors: ["Modelo, ano e valor", "Culturas e locais de operação", "Implementos e eletrônica embarcada", "Uso próprio ou prestação de serviços", "Coberturas, franquias e financiamento"], note: "Compare limites e exclusões. O pedido de cotação não inicia cobertura." }}
    importantDetails={[
      { title: "Trator financiado e penhor rural", content: "O contrato de crédito define as exigências a conferir. Não presuma que todo financiamento tenha as mesmas cláusulas ou que qualquer apólice de máquinas seja suficiente." },
      { title: "Regiões agrícolas e mobilidade", content: "Atendemos todo o Brasil, incluindo grãos no Centro-Oeste e Sul, café em Minas Gerais e cana no interior de São Paulo. Informe relevo, culturas e deslocamentos; essas características importam mais do que uma indicação genérica do estado." },
      { title: "Conservação e segurança", content: "Siga as orientações do fabricante para manutenção e operação. Registros de revisão e identificação dos acessórios ajudam na análise, mas não garantem aceitação ou desconto." },
    ]}
    whoNeeds={["Produtores com tratores próprios ou financiados", "Prestadores de serviços rurais", "Cooperativas com frota agrícola", "Concessionárias que apoiam o comprador"]}
    whyPatro={["Especialização em máquinas, equipamentos agrícolas e penhor rural", "Parceria com a rede de concessionárias dos principais fabricantes", "Conferência documental do equipamento e do financiamento", "Atendimento nacional e orientação em sinistros"]}
    faqs={[
      { question: "O seguro de trator é obrigatório?", answer: "Confira as exigências da atividade e do contrato de crédito. Financiamentos podem exigir seguro e cláusulas em favor do credor. Isso não significa que todo banco ou contrato tenha condições idênticas." },
      { question: "Seguro penhor rural substitui qualquer seguro de trator?", answer: "O penhor rural deve ser analisado quando o bem está vinculado ao crédito rural. É necessário conferir os riscos cobertos e os requisitos do credor, além do uso da máquina. A modalidade não garante cobertura para todo evento." },
      { question: "A Patro atende fora de São Paulo?", answer: "Sim. A sede é em Guarulhos/SP e o atendimento comercial é nacional por canais digitais. Vistorias e procedimentos de sinistro seguem as regras da seguradora e podem exigir presença no local." },
      { question: "O seguro cobre transporte em prancha?", answer: "Somente conforme a cobertura e as condições aceitas. Informe rotas, forma de transporte e operações de carga e descarga antes de contratar." },
      { question: "Implementos e GPS estão incluídos?", answer: "Não automaticamente. Declare os itens, seus valores e usos e confira a descrição na proposta e na apólice." },
      { question: "Qual o prazo para cotar ou indenizar?", answer: "A cotação depende dos documentos e da análise do risco. A regulação de sinistro depende do evento, da documentação e das regras aplicáveis; não prometemos emissão ou pagamento em prazo fixo." },
    ]}
    relatedInsurances={[
      { title: "Guia: Penhor Rural para Máquinas Financiadas", link: "/blog/seguro-penhor-rural-maquinas-financiadas" },
      { title: "Seguro Penhor Rural", link: "/seguro-penhor-rural" },
      { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
      { title: "Equipamentos e Implementos", link: "/seguro-equipamentos-agricolas" },
      { title: "Colheitadeira de Grãos", link: "/seguro-colheitadeira-graos" },
    ]}
  />
);

export default SeguroTratorAgricola;
