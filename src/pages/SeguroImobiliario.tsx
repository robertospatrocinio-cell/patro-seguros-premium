import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroImobiliario = () => {
  return (
    <InsurancePageTemplate
      title="Seguros Imobiliários"
      subtitle="Proteção completa para imóveis residenciais, comerciais, em construção e locação"
      icon="🏢"
      metaDescription="Seguros Imobiliários com a Patro Seguros — proteção para imóveis residenciais, comerciais, em construção e locação. Cobertura contra incêndio, danos estruturais, responsabilidade civil e mais. Cotação grátis!"
      description="Os Seguros Imobiliários da Patro Seguros protegem o seu patrimônio imobiliário contra os principais riscos: incêndio, danos elétricos, vendaval, alagamento, roubo, responsabilidade civil e muito mais. Seja proprietário, locador, locatário, incorporador ou construtor, temos soluções sob medida para cada perfil e tipo de imóvel — residencial, comercial, industrial ou em construção."
      detailedDescription={`O mercado imobiliário envolve riscos significativos, desde danos físicos à estrutura até responsabilidades legais com terceiros. Um sinistro sem cobertura pode comprometer anos de investimento e planejamento.

Os Seguros Imobiliários abrangem diversas modalidades: seguro do imóvel (estrutura e conteúdo), seguro de responsabilidade civil do proprietário, seguro para imóveis em construção ou reforma, seguro fiança locatícia e proteção para condomínios. A Patro Seguros analisa o perfil do seu imóvel e recomenda a combinação ideal de coberturas para máxima proteção com o melhor custo-benefício.

Trabalhamos com as principais seguradoras do mercado para garantir condições competitivas, coberturas amplas e atendimento ágil em caso de sinistro.`}
      howItWorks={[
        { step: "1", title: "Análise do imóvel", description: "Avaliamos o tipo, localização, uso e valor do imóvel para definir o perfil de risco" },
        { step: "2", title: "Proposta personalizada", description: "Comparamos seguradoras e montamos a melhor combinação de coberturas e preço" },
        { step: "3", title: "Contratação simples", description: "Processo digital e rápido, sem burocracia, com emissão imediata da apólice" },
        { step: "4", title: "Suporte contínuo", description: "Acompanhamento durante toda a vigência, com assistência na regulação de sinistros" },
      ]}
      coverages={[
        { title: "Incêndio, Raio e Explosão", description: "Cobertura básica obrigatória que protege a estrutura do imóvel contra fogo, queda de raio e explosões" },
        { title: "Danos Elétricos", description: "Proteção contra curto-circuito, sobrecarga e oscilações de energia que danifiquem instalações e equipamentos" },
        { title: "Vendaval e Granizo", description: "Cobertura para danos causados por ventos fortes, granizo, ciclones e tornados na estrutura do imóvel" },
        { title: "Alagamento e Inundação", description: "Proteção contra danos por enchentes, transbordamento de rios e acúmulo de água da chuva" },
        { title: "Roubo e Furto Qualificado", description: "Cobertura para bens e equipamentos dentro do imóvel em caso de roubo ou furto com arrombamento" },
        { title: "Responsabilidade Civil", description: "Proteção contra danos causados a terceiros dentro ou nas proximidades do imóvel segurado" },
        { title: "Quebra de Vidros", description: "Cobertura para vidros, espelhos e mármores que fazem parte da estrutura do imóvel" },
        { title: "Perda de Aluguel", description: "Indenização pelo valor do aluguel caso o imóvel locado fique inabitável por sinistro coberto" },
      ]}
      coverageExclusions={[
        "Desgaste natural e deterioração por falta de manutenção",
        "Atos ilícitos do próprio segurado",
        "Danos por guerra, terrorismo ou eventos nucleares",
        "Vícios construtivos conhecidos antes da contratação",
        "Imóveis irregulares ou sem habite-se (quando exigido)",
      ]}
      pricingInfo={{
        intro: "O valor do seguro imobiliário varia conforme o tipo de imóvel, localização, coberturas escolhidas e valor segurado.",
        factors: [
          "Tipo do imóvel: residencial, comercial ou industrial",
          "Localização e região do imóvel",
          "Valor total do imóvel e do conteúdo",
          "Coberturas e assistências selecionadas",
          "Perfil de uso: próprio, locado ou em construção",
        ],
        note: "Em média, o seguro de um imóvel residencial custa entre 0,1% a 0,5% do valor do bem por ano. Solicite uma cotação personalizada e gratuita.",
      }}
      realScenarios={[
        { title: "Incêndio em apartamento", description: "Um curto-circuito causou incêndio em um apartamento, comprometendo a estrutura e o mobiliário. O seguro cobriu a reforma completa e reposição dos bens, totalizando R$180 mil." },
        { title: "Vendaval em imóvel comercial", description: "Ventos de 90 km/h danificaram o telhado e a fachada de uma loja comercial. A seguradora indenizou R$45 mil para reparos estruturais e perda de estoque." },
        { title: "Alagamento em térreo", description: "Chuvas intensas inundaram o andar térreo de um prédio residencial. O seguro cobriu a limpeza, restauração e substituição de pisos e instalações elétricas." },
      ]}
      importantDetails={[
        "O seguro imobiliário pode ser contratado pelo proprietário ou pelo locatário",
        "A cobertura básica (incêndio, raio e explosão) é obrigatória em condomínios",
        "É possível segurar apenas a estrutura, apenas o conteúdo ou ambos",
        "Imóveis em construção ou reforma possuem modalidades específicas de seguro",
        "A apólice deve ser atualizada sempre que houver reforma ou alteração significativa no imóvel",
      ]}
      tips={[
        "Mantenha o valor segurado atualizado para evitar sub-seguro em caso de sinistro",
        "Contrate coberturas adicionais de acordo com os riscos da sua região (alagamento, vendaval)",
        "Para imóveis alugados, combine o seguro com fiança locatícia para proteção completa",
        "Documente o estado do imóvel com fotos e laudos para agilizar a regulação de sinistros",
      ]}
      whoNeeds={[
        "Proprietários de imóveis residenciais ou comerciais",
        "Locadores que querem proteger seu patrimônio",
        "Locatários que desejam segurança no imóvel alugado",
        "Construtoras e incorporadoras com obras em andamento",
        "Administradoras de condomínios",
        "Investidores imobiliários com múltiplos imóveis",
      ]}
      whyPatro={[
        "Comparamos seguradoras para o melhor custo-benefício",
        "Consultoria especializada em seguros para o mercado imobiliário",
        "Atendimento personalizado para cada tipo e perfil de imóvel",
        "Suporte completo na regulação e acompanhamento de sinistros",
        "Experiência com seguros residenciais, comerciais e condominiais",
        "Processo 100% digital com emissão rápida da apólice",
      ]}
      faqs={[
        { question: "Qual a diferença entre seguro residencial e seguro imobiliário?", answer: "O seguro residencial é uma modalidade dentro dos seguros imobiliários, focado em casas e apartamentos. Os seguros imobiliários abrangem também imóveis comerciais, industriais, em construção e condomínios, com coberturas específicas para cada perfil." },
        { question: "O locatário pode contratar seguro do imóvel?", answer: "Sim! O locatário pode contratar seguro para proteger seus bens dentro do imóvel (conteúdo) e também a estrutura, caso o contrato de locação exija. É uma prática cada vez mais comum e recomendada." },
        { question: "O seguro cobre reformas e melhorias no imóvel?", answer: "Depende da cobertura contratada. É possível incluir benfeitorias e melhorias feitas pelo locatário ou proprietário. Para obras em andamento, existe o seguro de risco de engenharia, específico para construção." },
        { question: "Quanto custa o seguro de um imóvel?", answer: "O custo varia conforme o valor do imóvel, localização e coberturas. Em média, para imóveis residenciais, o seguro custa entre 0,1% a 0,5% do valor do bem por ano. Solicite uma cotação gratuita para valores exatos." },
        { question: "O seguro imobiliário é obrigatório?", answer: "Para condomínios, a cobertura básica contra incêndio é obrigatória por lei. Para imóveis individuais não é obrigatório, mas é altamente recomendado para proteção do patrimônio." },
      ]}
      relatedInsurances={[
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Seguro Condomínio", link: "/seguro-condominio" },
        { title: "Seguro Fiança Locatícia", link: "/seguro-fianca-locaticia" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Engenharia", link: "/seguro-engenharia" },
      ]}
    />
  );
};

export default SeguroImobiliario;
