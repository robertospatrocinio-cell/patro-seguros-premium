import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-agro.webp";
import heroMobileImg from "@/assets/hero-agro-sm.webp";

const SeguroRural = () => {
  return (
    <InsurancePageTemplate
      localSeo={{ skip: true }}
      heroImage={heroImg}
      mobileHeroImage={heroMobileImg}
      title="Seguro Rural | Modalidades e condições de contratação | Patro Seguros"
      headline="Seguro Rural: entenda a categoria e suas modalidades"
      subtitle="Orientação para analisar modalidades de Seguro Rural conforme a atividade, o risco, o produto e as condições contratuais."
      icon="🚜"
      badge="Atendimento em todo o Brasil"
      showAgrishowBanner
      metaDescription="Seguro Rural para atividades agrícolas, pecuárias, patrimônio e produtos rurais. Coberturas conforme o produto, a apólice e as regras vigentes."
      description="Seguro Rural é uma categoria ampla que pode abranger atividades agrícolas e pecuárias, patrimônio, produtos, crédito e outras modalidades previstas na regulamentação. As coberturas dependem do produto, da apólice e dos riscos contratados."
      detailedDescription={`O que é Seguro Rural? É uma categoria de seguros que pode abranger diferentes modalidades relacionadas a atividades, bens e interesses do meio rural. Seguro Agrícola é uma modalidade voltada à produção agrícola, conforme o enquadramento aplicável; não é sinônimo de toda a categoria Seguro Rural.

O Proagro é um instrumento distinto do seguro privado. A existência de uma modalidade, a elegibilidade a programas públicos e as condições de contratação dependem das regras vigentes, do produto, da seguradora e da apólice.

O PSR pode subvencionar parte do prêmio de apólices elegíveis. Cultura, região, exercício, orçamento, seguradora habilitada e demais critérios devem ser verificados em fonte oficial e na documentação da contratação. ZARC é referência de zoneamento de risco climático e não garante aceitação, cobertura ou indenização.

A Patro Seguros atua como corretora e atende clientes em todo o Brasil. A orientação pode ser feita remotamente, conforme as informações do risco e a disponibilidade das seguradoras.`}
      howItWorks={[
        { step: "1", title: "Análise da Propriedade", description: "Identificamos culturas, área plantada, região, histórico climático e riscos predominantes" },
        { step: "2", title: "Escolha das Coberturas", description: "Definimos coberturas por tipo de risco: seca, geada, granizo, excesso de chuva, pragas, etc." },
        { step: "3", title: "Verificação das regras aplicáveis", description: "Quando houver interesse em PSR ou outra condição específica, verificamos os critérios vigentes e a documentação pertinente." },
        { step: "4", title: "Acompanhamento", description: "Durante a vigência, a corretora pode orientar comunicações e documentos conforme o produto e o procedimento da apólice." },
      ]}
      coverages={[
        { title: "Seguro Agrícola", description: "Proteção para lavouras conforme a cultura, os riscos, os limites e as condições contratadas. Seguro Agrícola e Proagro são instrumentos distintos." },
        { title: "Seguro Pecuário", description: "Cobertura para morte de animais por doenças e acidentes" },
        { title: "Máquinas e Equipamentos Agrícolas", description: "Proteção para tratores, colheitadeiras e implementos" },
        { title: "Benfeitorias Rurais", description: "Cobertura para galpões, silos, estufas e instalações" },
        { title: "Produtos Agropecuários", description: "Proteção para grãos armazenados e produtos estocados" },
        { title: "Florestas Plantadas", description: "Cobertura para reflorestamento e silvicultura" },
        { title: "Aquicultura", description: "Seguro para criação de peixes e camarões" },
        { title: "Penhor Rural", description: "Modalidade relacionada a bens rurais oferecidos em garantia de operação de crédito rural, quando o enquadramento e o produto forem aplicáveis." },
      ]}
      coverageExclusions={[
        "Perdas causadas por falta de manejo adequado ou abandono da lavoura",
        "Situações não amparadas pelas condições gerais, especiais ou particulares da apólice",
        "Doenças e pragas quando não aplicados os tratamentos recomendados",
        "Perdas em áreas não declaradas ou com informações incorretas",
        "Roubo e furto de produção (cobertura específica necessária)",
        "Variação de preço de commodities (não é seguro de preço)",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro Rural varia conforme cultura, região, nível de cobertura e disponibilidade de subsídio governamental.",
        factors: [
          "Tipo de cultura (soja, milho, café, trigo, algodão, etc.)",
          "Região e município (histórico climático e risco)",
          "Nível de cobertura (% da produtividade esperada)",
          "Área plantada em hectares",
          "Critérios e eventual disponibilidade de programas públicos aplicáveis",
          "Histórico de sinistros do produtor e da região",
        ],
        note: "Não há preço ou percentual de subvenção universal. A proposta, a apólice e a regulamentação do exercício são as referências para o prêmio e eventual benefício.",
      }}
      realScenarios={[
        { title: "Exemplo de análise de risco climático", description: "A modalidade, o risco coberto, a franquia, os limites e a forma de apuração devem ser verificados na proposta e na apólice antes da contratação." },
      ]}
      importantDetails={[
        { title: "Zoneamento Agrícola de Risco Climático (ZARC)", content: "O ZARC é uma referência de zoneamento de risco climático. Segui-lo não garante aceitação, cobertura ou indenização; os efeitos dependem da modalidade, do produto, da apólice e das regras do PSR quando aplicáveis." },
        { title: "Subsídio do governo (PSR)", content: "O PSR pode subvencionar parte do prêmio de apólices elegíveis, conforme exercício, cultura, modalidade, região, orçamento, seguradora habilitada e critérios vigentes. Consulte a regra oficial do MAPA antes de usar percentuais." },
        { title: "Vistoria de sinistro", content: "Em caso de sinistro, a seguradora envia perito para vistoriar a lavoura. É fundamental não colher ou alterar a área afetada antes da vistoria. Documente com fotos e registros." },
      ]}
      tips={[
        "Confira a modalidade, os riscos, os limites e as exclusões antes da contratação",
        "Consulte as regras oficiais quando houver referência a PSR, ZARC ou outro programa público",
        "Mantenha registros de todos os insumos aplicados, notas fiscais e relatórios de manejo",
        "Em caso de sinistro, não colha nem altere a área afetada antes da vistoria do perito",
        "Considere segurar também máquinas e benfeitorias — uma perda de trator na safra pode ser tão grave quanto a perda da lavoura",
        "Atendimento em todo o Brasil por canais remotos, conforme o risco e o produto",
      ]}
      whoNeeds={[
        "Produtores rurais de grãos e culturas em qualquer estado",
        "Pecuaristas e criadores de animais em todo o Brasil",
        "Agricultores familiares de Norte a Sul",
        "Empresas do agronegócio em todas as regiões",
        "Silvicultores e produtores florestais",
        "Aquicultores e piscicultores",
      ]}
      whyPatro={[
        "Atendimento em todo o Brasil",
        "Orientação sobre modalidades e documentação do risco",
        "Análise conforme produto, seguradora e condições contratuais",
        "Acompanhamento durante a contratação e a vigência",
      ]}
      faqs={[
        { question: "A Patro Seguros atende produtores rurais fora de São Paulo?", answer: "Sim. A sede fica em Guarulhos/SP, mas a Patro atende clientes em todo o Brasil por canais remotos, conforme o risco e a disponibilidade das seguradoras." },
        { question: "O que é o PSR no contexto do Seguro Rural?", answer: "O PSR pode subvencionar parte do prêmio de apólices elegíveis. A elegibilidade e os critérios dependem do exercício, da modalidade, da cultura, da região, do orçamento, da seguradora habilitada e das regras vigentes." },
        { question: "Como funciona o seguro agrícola?", answer: "É uma modalidade do Seguro Rural. Pode proteger a produção contra riscos previstos no produto e na apólice; eventos climáticos, produtividade, franquias e critérios de indenização devem ser conferidos no contrato." },
        { question: "O Seguro Rural pode abranger pecuária?", answer: "A categoria pode incluir modalidade pecuária, mas o produto, os riscos, os limites e as condições dependem da proposta e da apólice contratada." },
        { question: "Quanto custa o Seguro Rural?", answer: "O prêmio depende da modalidade, do risco, do bem ou atividade, da região, dos limites, da franquia e das condições aceitas pela seguradora. Não há preço universal." },
        { question: "Como solicitar cotação se estou longe de Guarulhos?", answer: "Entre em contato pelos canais da Patro e envie as informações disponíveis sobre o risco. A orientação e o retorno dependem do produto, da documentação e da análise das seguradoras." },
        { question: "A Patro atende clientes fora de São Paulo?", answer: "Sim. A Patro Seguros atende clientes em todo o Brasil por canais remotos, conforme as informações do risco e a disponibilidade das seguradoras." },
        { question: "Como recebo uma proposta?", answer: "Após a análise das informações necessárias, a corretora pode apresentar alternativas disponíveis pelos canais de atendimento, sempre sujeitas à análise e aceitação da seguradora." },
      ]}
      relatedInsurances={[
        { title: "Seguro Agro", link: "/seguro-agro" },
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Propriedade Rural", link: "/seguro-propriedade-rural" },
        { title: "Equipamentos Agrícolas", link: "/seguro-equipamentos-agricolas" },
      ]}
    />
  );
};

export default SeguroRural;
