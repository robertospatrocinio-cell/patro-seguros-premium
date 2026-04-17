import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-consorcio.webp";

const ConsorcioVeiculosPesados = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Consórcio de Veículos Pesados"
      subtitle="Caminhões, ônibus, máquinas e implementos — renove ou amplie sua frota sem juros"
      icon="🚛"
      showEbookConsorcio
      metaDescription="Consórcio de Veículos Pesados sem juros. Caminhões, ônibus, máquinas e implementos. Ideal para empresas e autônomos. Simule grátis com a Patro Seguros!"
      description="O Consórcio de Veículos Pesados é a solução ideal para caminhoneiros autônomos, transportadoras e empresas que precisam renovar ou ampliar sua frota sem comprometer o fluxo de caixa. Sem juros e com parcelas planejadas, você adquire caminhões, carretas, ônibus, máquinas agrícolas e implementos com poder de compra à vista. A Patro Seguros compara as melhores administradoras especializadas em veículos pesados para garantir as condições mais vantajosas para o seu negócio."
      coverages={[
        { title: "Sem Juros", description: "Economize até 40% comparado ao financiamento de veículos pesados — pague apenas taxa de administração" },
        { title: "Caminhões e Carretas", description: "Cartas de crédito para caminhões de todas as categorias, cavalos mecânicos e carretas" },
        { title: "Ônibus e Micro-ônibus", description: "Ideal para empresas de transporte de passageiros que precisam renovar a frota" },
        { title: "Máquinas e Implementos", description: "Consórcio para máquinas agrícolas, retroescavadeiras, empilhadeiras e implementos" },
        { title: "Novos e Usados", description: "Use sua carta de crédito para adquirir veículos novos ou usados conforme sua necessidade" },
        { title: "Créditos Elevados", description: "Cartas de crédito com valores adequados ao mercado de veículos pesados" },
        { title: "Planejamento Financeiro", description: "Parcelas fixas que permitem planejar sem comprometer o capital de giro da empresa" },
        { title: "Poder de Compra à Vista", description: "Ao ser contemplado, negocie como comprador à vista e garanta os melhores descontos" },
      ]}
      whoNeeds={[
        "Caminhoneiros autônomos que precisam trocar de veículo",
        "Transportadoras que querem ampliar a frota",
        "Empresas de ônibus e transporte de passageiros",
        "Produtores rurais que precisam de máquinas agrícolas",
        "Empresas de construção e terraplanagem",
        "Operadores logísticos que buscam economia na renovação",
      ]}
      whyPatro={[
        "Especialistas em consórcio para veículos pesados",
        "Comparamos administradoras especializadas no segmento",
        "Simulação gratuita e personalizada para seu negócio",
        "Orientação sobre estratégias de lance para frota",
        "Acompanhamento durante todo o período do consórcio",
        "Condições especiais para múltiplas cotas",
      ]}
      faqs={[
        { question: "Consórcio de caminhão vale a pena?", answer: "Sim! A economia pode chegar a 40% comparada ao financiamento. Para caminhoneiros autônomos e transportadoras, é uma das formas mais inteligentes de adquirir ou renovar veículos sem comprometer o fluxo de caixa." },
        { question: "Posso comprar caminhão usado com consórcio?", answer: "Sim! A carta de crédito pode ser utilizada para veículos novos ou usados, desde que atendam aos critérios da administradora (geralmente com limite de idade do veículo)." },
        { question: "Qual o valor das parcelas?", answer: "Depende do crédito e prazo escolhidos. Fazemos simulações personalizadas para encontrar o plano que melhor se encaixa no orçamento do seu negócio." },
        { question: "Empresa pode contratar consórcio?", answer: "Sim! Tanto pessoa física quanto jurídica podem contratar. Empresas podem inclusive adquirir múltiplas cotas para renovação planejada da frota." },
        { question: "Como funciona o lance para veículos pesados?", answer: "Funciona como nos demais consórcios: lance livre, fixo ou embutido. A vantagem é que, com lances estratégicos, transportadoras podem planejar a contemplação para épocas de menor demanda." },
      ]}
      relatedInsurances={[
        { title: "Consórcio de Carro", link: "/consorcio-carro" },
        { title: "Consórcio de Imóveis", link: "/consorcio-imoveis" },
        { title: "Seguro de Caminhão", link: "/seguro-caminhao" },
        { title: "Consórcio Geral", link: "/consorcio" },
      ]}
    />
  );
};

export default ConsorcioVeiculosPesados;
