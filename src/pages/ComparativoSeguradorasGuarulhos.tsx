import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const ComparativoSeguradorasGuarulhos = () => {
  return (
    <InsurancePageTemplate
      title="Comparativo de Seguradoras em Guarulhos"
      headline="Qual a Melhor Seguradora em Guarulhos?"
      subtitle="Comparamos Porto Seguro, Allianz, Tokio Marine, HDI e Bradesco para o seu perfil."
      metaDescription="Compare as principais seguradoras de Guarulhos. Preços, benefícios e rede de oficinas para Porto Seguro, Allianz, Tokio Marine, Bradesco e HDI."
      description="Na Patro Seguros, acreditamos que a melhor seguradora não é apenas a mais barata, mas aquela que oferece o melhor suporte técnico e agilidade no momento do sinistro. Comparamos as maiores operadoras do mercado brasileiro com foco na realidade de Guarulhos."
      detailedDescription={`Escolher uma seguradora em Guarulhos exige atenção à rede de oficinas credenciadas, tempo de resposta da assistência 24h e competitividade de preço por CEP. Porto Seguro e Tokio Marine costumam ter excelente aceitação na região central e Cidade Maia, enquanto a Allianz e HDI oferecem condições diferenciadas para frotas e empresas logísticas em Cumbica.`}
      icon="📊"
      coverages={[
        { title: "Porto Seguro", description: "Referência em assistência 24h e rede de oficinas em Guarulhos." },
        { title: "Tokio Marine", description: "Excelente custo-benefício para seguro auto e residencial na Grande SP." },
        { title: "Allianz", description: "Foco em tecnologia e coberturas completas para veículos premium e empresas." },
        { title: "HDI Seguros", description: "Agilidade na liquidação de sinistros e preços competitivos para modelos populares." },
      ]}
      whoNeeds={[
        "Proprietários de veículos em Guarulhos",
        "Empresas que buscam renovação de frota",
        "Moradores de condomínios que precisam de seguro residencial",
        "Quem busca o melhor preço sem abrir mão da qualidade",
      ]}
      whyPatro={[
        "Corretora multimarcas com acesso a 16+ seguradoras",
        "Análise técnica imparcial baseada em dados reais de sinistros",
        "Suporte direto na regulação de sinistros junto às cias",
        "Condições comerciais exclusivas para o CEP de Guarulhos",
      ]}
      faqs={[
        { question: "Qual seguradora é mais barata em Guarulhos?", answer: "Não há uma única resposta, pois o preço varia por CEP e modelo de carro. HDI e Tokio Marine costumam ser muito competitivas em bairros como Vila Galvão e Pimentas." },
        { question: "Porto Seguro vale a pena em Guarulhos?", answer: "Sim, especialmente pela densidade da rede de assistência e oficinas referenciadas na região de Cidade Maia e Centro." },
        { question: "Como funciona a assistência 24h?", answer: "Todas as parceiras oferecem guincho, chaveiro e auxílio mecânico, mas os limites de quilometragem variam entre as apólices." },
        { question: "Posso trocar de seguradora na renovação?", answer: "Sim, e recomendamos sempre fazer uma nova cotação para garantir que você está pagando o preço de mercado atual." },
      ]}
    />
  );
};

export default ComparativoSeguradorasGuarulhos;