import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rural.webp";

const SeguroPropriedadeRural = () => {
  return (
    <InsurancePageTemplate
      localSeo={{ skip: true }}
      heroImage={heroImg}
      title="Seguro Propriedade Rural"
      subtitle="Consultoria patrimonial dedicada para proteger sedes, benfeitorias e instalações que sustentam a sua operação rural."
      icon="🏡"
      badge="Especialista em Patrimônio Agro"
      metaDescription="Seguro Propriedade Rural: proteção para sedes, galpões, armazéns e cercas contra incêndio e vendaval em todo o Brasil. Atendimento remoto Patro Seguros."
      description="A propriedade rural é a base de tudo o que se produz nela — e tratamos cada apólice como o desenho técnico do que sua família levou décadas para construir. Nossa consultoria de Propriedade Rural dimensiona, com critério, a proteção das estruturas físicas e benfeitorias da sua fazenda."
      detailedDescription={`Investir em infraestrutura rural exige capital e planejamento. De sedes imponentes a galpões de máquinas e silos de armazenamento, cada estrutura é vital para a operação. O risco de eventos climáticos, como vendavais e granizos, ou acidentes como incêndios e quedas de raios, pode gerar prejuízos que comprometem gerações de trabalho.

Nossa consultoria para Seguro de Propriedade Rural analisa estruturas, benfeitorias e instalações conforme o produto. Cercas, currais, irrigação, máquinas, estoque e outras partes da operação só devem ser considerados quando descritos, aceitos e cobertos pela apólice.

Com a Patro Seguros, você tem a garantia de que cada benfeitoria da sua propriedade está amparada pelas maiores seguradoras rurais do mundo, com suporte total para renovações e gestão ágil de sinistros catastróficos.`}
      howItWorks={[
        { step: "1", title: "Mapeamento Patrimonial", description: "Catalogamos todas as construções, benfeitorias e instalações fixas da propriedade." },
        { step: "2", title: "Avaliação de Risco Local", description: "Analisamos a incidência de ventos, raios e a proximidade de áreas de risco na região." },
        { step: "3", title: "Customização de Verbas", description: "Definimos o valor de reconstrução para cada estrutura, evitando o risco de seguro insuficiente." },
        { step: "4", title: "Emissão Digital", description: "Apólice emitida com rapidez e validade nacional, ideal para garantias bancárias." },
      ]}
      coverages={[
        { title: "Incêndio e explosão", description: "Podem ser contemplados para estruturas descritas e aceitas, conforme limites e condições da apólice." },
        { title: "Vendaval, Ciclone e Granizo", description: "Proteção indispensável contra ventos fortes que atingem telhados e estruturas." },
        { title: "Raio e danos elétricos", description: "Dependem da cobertura contratada, do evento, dos bens descritos e dos limites aplicáveis." },
        { title: "Alagamento e inundação", description: "Podem ser contratados conforme o produto, o risco e as condições da apólice." },
        { title: "Roubo e Furto Qualificado", description: "Segurança para móveis, utensílios e insumos estocados no interior das construções." },
        { title: "Responsabilidade Civil Familiar", description: "Proteção contra danos a terceiros ocorridos dentro dos limites da propriedade." },
        { title: "Instalações de Energia Solar", description: "Cobertura específica para usinas fotovoltaicas e painéis solares da fazenda." },
      ]}
      coverageExclusions={[
        "Danos a culturas e plantações (cobertos pelo Seguro Agrícola)",
        "Veículos e máquinas móveis (exigem Seguro de Máquinas Agrícolas)",
        "Desgaste natural das edificações ou falta de conservação",
        "Vazamentos de tubulações internas por má manutenção",
        "Danos estéticos em cercas ou muros sem comprometimento estrutural",
      ]}
      pricingInfo={{
        intro: "O custo é dimensionado pelo valor de reposição das estruturas e pelos limites de coberturas climáticas escolhidos.",
        factors: [
          "Material de construção das edificações (Alvenaria, Madeira, Metálica)",
          "Valor total das benfeitorias declaradas",
          "Localização geográfica e histórico climático da região",
          "Existência de sistemas de vigilância e combate a incêndio",
          "Finalidade da propriedade (Lazer, Criação, Cultivo)",
        ],
        note: "Quando houver financiamento, confirme eventual exigência contratual do banco e a cláusula de beneficiário. A existência do financiamento não garante cobertura nem cria obrigação universal de seguro.",
      }}
      realScenarios={[
        { title: "Vendaval em Galpão de Máquinas", description: "Um vendaval de 85km/h arrancou o telhado metálico do galpão principal. O seguro cobriu os R$ 65.000 da reconstrução em tempo recorde." },
        { title: "Raio no Transformador da Sede", description: "Uma descarga elétrica queimou o transformador e toda a rede de uma casa sede. A reposição de R$ 22.000 foi paga integralmente." },
        { title: "Incêndio em Curral e Cerca", description: "Um incêndio em pastagem atingiu as cercas e o curral de manejo. A cobertura de incêndio indenizou os materiais e a mão de obra para reparo." },
      ]}
      importantDetails={[
        { title: "Valor de reconstrução", content: "O critério de valor segurado — reposição, reconstrução, valor atual ou outro — deve ser definido conforme a modalidade, os limites e as condições do contrato. Não há garantia automática de indenização integral do valor da propriedade." },
        { title: "Seguro Rural vs Seguro Residencial", content: "Propriedades rurais exigem apólices específicas que permitem cobrir benfeitorias produtivas, algo que o seguro residencial urbano comum não aceita." },
      ]}
      tips={[
        "Mantenha sempre os para-raios da sede e silos com manutenção e laudo em dia",
        "Digitalize as notas fiscais de reformas e novos galpões construídos",
        "Informe corretamente o uso da propriedade para evitar negativas em sinistros",
        "Instale aceiros em torno das construções para mitigar o risco de incêndios em pastagens",
      ]}
      whoNeeds={[
        "Produtores Rurais de todos os portes",
        "Proprietários de Sítios, Chácaras e Haras",
        "Investidores com Patrimônio Imobiliário Rural",
        "Empresas Agroindustriais",
        "Cooperativas com Sedes Administrativas no Campo",
      ]}
      whyPatro={[
        "Consultoria técnica para dimensionamento patrimonial",
        "Agilidade na emissão de certificados para penhor e hipoteca rural",
        "Atendimento em todos os estados brasileiros de forma remota",
        "Parceria com seguradoras líderes em riscos rurais",
        "Suporte humanizado em casos de eventos climáticos severos",
      ]}
      faqs={[
        { question: "O seguro cobre as cercas da propriedade?", answer: "Pode cobrir se a cerca estiver descrita, aceita e abrangida pela cobertura e pelos limites da apólice." },
        { question: "Cobre a casa do caseiro?", answer: "A inclusão depende da descrição das edificações, da aceitação, da cobertura e das condições do produto." },
        { question: "O seguro é aceito para garantia de empréstimos?", answer: "Pode ser solicitado pela instituição financeira conforme o contrato de crédito. A cláusula, o beneficiário e o produto devem ser confirmados com o banco e a seguradora." },
        { question: "Quanto tempo dura a apólice?", answer: "Geralmente a vigência é de 1 ano, com renovação automática analisada pela nossa equipe." },
      ]}
      relatedInsurances={[
        { title: "Seguro Rural (Culturas)", link: "/seguro-rural" },
        { title: "Seguro de Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro de Silo Agrícola", link: "/seguro-silo-agricola" },
        { title: "Seguro Placa Solar", link: "/seguro-placa-solar" },
      ]}
    />
  );
};

export default SeguroPropriedadeRural;
