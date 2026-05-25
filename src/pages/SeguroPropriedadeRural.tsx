import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rural.webp";

const SeguroPropriedadeRural = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Propriedade Rural"
      subtitle="Proteção de alto nível para o seu maior patrimônio. Segurança total para sedes, benfeitorias e instalações."
      icon="🏡"
      badge="Especialista em Patrimônio Agro"
      metaDescription="Seguro Propriedade Rural: proteção completa para sedes, galpões, armazéns e cercas contra incêndio e vendaval em todo o Brasil. Atendimento 100% remoto Patro Seguros."
      description="A propriedade rural é a base de toda a produção. O Seguro de Propriedade Rural da Patro Seguros oferece a proteção robusta que as estruturas físicas e benfeitorias da sua fazenda exigem."
      detailedDescription={`Investir em infraestrutura rural exige capital e planejamento. De sedes imponentes a galpões de máquinas e silos de armazenamento, cada estrutura é vital para a operação. O risco de eventos climáticos, como vendavais e granizos, ou acidentes como incêndios e quedas de raios, pode gerar prejuízos que comprometem gerações de trabalho.

Nossa consultoria para Seguro de Propriedade Rural foca na blindagem patrimonial completa. Desenvolvemos apólices que cobrem desde a casa sede até cercas, currais e sistemas de irrigação. Atendemos proprietários em todas as regiões do Brasil, oferecendo um atendimento consultivo que entende a geografia e os riscos específicos de cada estado.

Com a Patro Seguros, você tem a garantia de que cada benfeitoria da sua propriedade está amparada pelas maiores seguradoras rurais do mundo, com suporte total para renovações e gestão ágil de sinistros catastróficos.`}
      howItWorks={[
        { step: "1", title: "Mapeamento Patrimonial", description: "Catalogamos todas as construções, benfeitorias e instalações fixas da propriedade." },
        { step: "2", title: "Avaliação de Risco Local", description: "Analisamos a incidência de ventos, raios e a proximidade de áreas de risco na região." },
        { step: "3", title: "Customização de Verbas", description: "Definimos o valor de reconstrução para cada estrutura, evitando o risco de seguro insuficiente." },
        { step: "4", title: "Emissão Digital", description: "Apólice emitida com rapidez e validade nacional, ideal para garantias bancárias." },
      ]}
      coverages={[
        { title: "Incêndio e Explosão", description: "Cobre danos térmicos na sede, casas de funcionários, galpões e silos." },
        { title: "Vendaval, Ciclone e Granizo", description: "Proteção indispensável contra ventos fortes que atingem telhados e estruturas." },
        { title: "Raio e Danos Elétricos", description: "Garante instalações elétricas e transformadores próprios contra descargas atmosféricas." },
        { title: "Alagamento e Inundação", description: "Cobre danos causados por entrada de água em edificações e depósitos." },
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
        note: "O seguro de benfeitorias rurais é fundamental para quem busca financiamento de infraestrutura em bancos.",
      }}
      realScenarios={[
        { title: "Vendaval em Galpão de Máquinas", description: "Um vendaval de 85km/h arrancou o telhado metálico do galpão principal. O seguro cobriu os R$ 65.000 da reconstrução em tempo recorde." },
        { title: "Raio no Transformador da Sede", description: "Uma descarga elétrica queimou o transformador e toda a rede de uma casa sede. A reposição de R$ 22.000 foi paga integralmente." },
        { title: "Incêndio em Curral e Cerca", description: "Um incêndio em pastagem atingiu as cercas e o curral de manejo. A cobertura de incêndio indenizou os materiais e a mão de obra para reparo." },
      ]}
      importantDetails={[
        { title: "Valor de Reconstrução", content: "Sempre oriente-se pelo custo de reconstruir a estrutura hoje, e não pelo valor de venda. Isso garante que a indenização seja suficiente em caso de perda total." },
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
        { question: "O seguro cobre as cercas da propriedade?", answer: "Sim, é possível incluir a cobertura para cercas contra incêndio, raio e impacto de veículos." },
        { question: "Cobre a casa do caseiro?", answer: "Sim, todas as moradias de funcionários e dependências de serviço podem ser incluídas na apólice." },
        { question: "O seguro é aceito para garantia de empréstimos?", answer: "Sim, emitimos apólices com a cláusula de beneficiário exigida pelos bancos para liberação de crédito rural." },
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
