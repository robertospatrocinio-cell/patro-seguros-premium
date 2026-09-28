import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-lojas.webp";

const SeguroLojasShopping = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro para Loja em Shopping"
      subtitle="Seguro para loja em shopping: análise de proteção patrimonial e responsabilidade civil conforme o produto contratado"
      icon="🏬"
      metaDescription="Seguro para lojas em shopping: avalie proteção para estoque, equipamentos, responsabilidade civil e operação conforme o produto e a apólice."
      description="O seguro para lojas em shopping pode analisar patrimônio, estoque, equipamentos e responsabilidade civil da operação. O alcance da proteção depende do contrato, do produto, da seguradora e da apólice. A cotação considera atividade, localização, valores em risco, exigências do shopping e coberturas efetivamente contratadas."
      detailedDescription={`Operar uma loja de shopping envolve estoque, equipamentos, mobiliário, decoração e compromissos contratuais. A análise do seguro deve considerar a atividade, os valores em risco, a localização da unidade e as exigências do contrato de locação.

O seguro do condomínio não substitui automaticamente a proteção do lojista. O alcance da apólice do shopping, das áreas comuns e da unidade depende do contrato, do produto e das condições contratadas.

Podem ser avaliados riscos como danos ao patrimônio, roubo ou furto qualificado, danos elétricos, responsabilidade civil e interrupção da operação, sempre conforme a seguradora, os limites, as franquias e as exclusões da apólice.`}
      howItWorks={[
        { step: "1", title: "Análise da Loja", description: "Levantamos informações sobre tipo de negócio, valor do estoque, equipamentos e localização no shopping" },
        { step: "2", title: "Coberturas sob Medida", description: "Definimos coberturas específicas para o seu segmento: moda, alimentação, tecnologia, joalheria, etc." },
        { step: "3", title: "Comparação de alternativas", description: "Apresentamos as alternativas disponíveis conforme o perfil, o risco e os critérios de aceitação" },
        { step: "4", title: "Acompanhamento", description: "Durante a vigência, orientamos sobre a apólice e o contato com a seguradora em caso de necessidade" },
      ]}
      coverages={[
        { title: "Incêndio, raio e explosão", description: "Pode ser analisada conforme a cobertura, os limites e as condições contratadas" },
        { title: "Roubo e furto qualificado", description: "Pode contemplar mercadorias e equipamentos quando previsto no produto" },
        { title: "Danos elétricos", description: "Pode ser incluída para equipamentos conforme a apólice" },
        { title: "Responsabilidade civil", description: "Pode tratar de danos a clientes e terceiros conforme os eventos contratados" },
        { title: "Quebra de vidros e vitrines", description: "Pode ser avaliada para vitrines, espelhos e vidros da unidade" },
        { title: "Estoque e mercadorias", description: "O tratamento depende dos bens declarados, limites e condições da apólice" },
        { title: "Interrupção da operação", description: "Pode ser analisada quando houver cobertura específica e critérios aplicáveis" },
        { title: "Danos por água", description: "A aceitação depende da definição do evento, do produto e das exclusões" },
      ]}
      coverageExclusions={[
        "Desgaste natural de mercadorias e equipamentos",
        "Furto simples (sem arrombamento ou violência)",
        "Eventos ou bens fora do escopo contratado",
        "Perdas por variação cambial ou desvalorização de mercadorias",
        "Alimentos perecíveis por falta de refrigeração (sem cobertura específica)",
        "Danos causados por reformas do próprio lojista",
      ]}
      importantDetails={[
        { title: "Seguro do shopping e seguro da loja", content: "O alcance do seguro do condomínio e a necessidade de proteção da unidade dependem do contrato, do produto e da apólice. Verifique as responsabilidades previstas na locação." },
        { title: "Exigências contratuais", content: "Alguns contratos podem exigir apólice de seguro. Essa obrigação deve ser confirmada no contrato do shopping e não deve ser generalizada para todas as unidades." },
        { title: "Valor do estoque", content: "Informe valores e características do estoque de forma consistente com a realidade. Limites, rateio e indenização dependem das condições contratadas." },
      ]}
      tips={[
        "Declare corretamente os valores e bens analisados na contratação",
        "Avalie se a interrupção da operação exige cobertura específica",
        "Mantenha registros do estoque e dos equipamentos",
        "Confira as exigências do contrato de locação",
        "Analise a necessidade de responsabilidade civil para a atividade",
      ]}
      whoNeeds={[
        "Lojas de roupas, calçados e acessórios em shoppings",
        "Quiosques e ilhas comerciais",
        "Lojas de eletrônicos e tecnologia",
        "Restaurantes e praças de alimentação",
        "Óticas, joalherias e relojoarias",
        "Lojas de cosméticos e perfumaria",
        "Franquias instaladas em shopping centers",
        "Pet shops e lojas de serviços dentro de shoppings",
      ]}
      whyPatro={[
        "Especialistas em seguros empresariais para varejo",
        "Análise das alternativas disponíveis para cada tipo de loja",
        "Orientação sobre coberturas, limites e condições",
        "Atendimento humanizado e consultivo",
        "Acompanhamento durante a contratação e a vigência",
        "Orientação na comunicação de eventual sinistro",
      ]}
      faqs={[
        { question: "O seguro do shopping cobre automaticamente o interior da loja?", answer: "Não é possível afirmar isso de forma geral. O alcance do seguro do condomínio, das áreas comuns e da unidade depende do contrato, do produto e da apólice do shopping e do lojista." },
        { question: "O seguro pode proteger o estoque?", answer: "Pode, quando o estoque é aceito, declarado e incluído na cobertura contratada. Limites, franquias, eventos cobertos e exclusões devem ser conferidos na apólice." },
        { question: "Lojas de roupas e quiosques podem contratar?", answer: "Podem ser analisados, mas a aceitação depende da atividade, da estrutura, dos valores em risco, do contrato do shopping e dos critérios da seguradora." },
        { question: "A responsabilidade civil está incluída automaticamente?", answer: "Não. A responsabilidade civil depende da contratação da cobertura correspondente, dos limites e das condições do produto." },
        { question: "Como a Patro analisa o seguro para uma loja?", answer: "A análise considera a atividade, a localização, o estoque, os equipamentos, o contrato de locação e as coberturas disponíveis para aquele perfil de risco." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Cyber", link: "/seguro-cyber" },
        { title: "Responsabilidade Civil", link: "/seguro-rc" },
        { title: "Seguro de Vida PME", link: "/seguro-vida-pme" },
        { title: "Soluções empresariais", link: "/solucoes-empresariais" },
      ]}
    />
  );
};

export default SeguroLojasShopping;
