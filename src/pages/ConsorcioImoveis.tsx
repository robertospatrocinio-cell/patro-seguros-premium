import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-consorcio.webp";
import blogConsorcio from "@/assets/blog/blog-consorcio-imoveis-guarulhos.webp";

const ConsorcioImoveis = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Consórcio de Imóveis"
      subtitle="Conquiste a casa própria, terreno ou imóvel comercial sem juros bancários"
      icon="🏠"
      showEbookConsorcio
      metaDescription="Consórcio de Imóveis sem juros com a Patro Seguros. Use o FGTS para lance, créditos de R$100 mil a R$1 milhão+. Prazos de até 200 meses. Simule grátis!"
      description="O Consórcio de Imóveis é o caminho mais econômico para conquistar seu patrimônio. Sem juros bancários e com parcelas planejadas, você pode adquirir casa, apartamento, terreno, imóvel comercial ou até usar o crédito para construção e reforma. A grande vantagem é poder utilizar o FGTS para dar lance e acelerar a contemplação. A Patro Seguros compara as melhores administradoras para encontrar o plano com o melhor custo-benefício para o seu objetivo imobiliário."
      coverages={[
        { title: "Sem Juros Bancários", description: "Economia expressiva comparada ao financiamento imobiliário — pague apenas taxa de administração" },
        { title: "Use o FGTS", description: "Utilize seu saldo do FGTS para dar lance e acelerar a contemplação do seu imóvel" },
        { title: "Créditos Altos", description: "Cartas de crédito de R$100 mil a mais de R$1 milhão para o imóvel que você precisa" },
        { title: "Prazos Longos", description: "Planos de até 200 meses com parcelas que cabem no seu orçamento mensal" },
        { title: "Casa, Apto ou Terreno", description: "Use para comprar casa, apartamento, terreno, sala comercial ou imóvel rural" },
        { title: "Construção e Reforma", description: "Algumas administradoras permitem usar o crédito para construir ou reformar" },
        { title: "Poder de Compra à Vista", description: "Ao ser contemplado, negocie como comprador à vista e garanta o melhor preço" },
        { title: "Regulamentado pelo Banco Central", description: "Toda a operação é fiscalizada e garantida pelo Banco Central do Brasil" },
      ]}
      whoNeeds={[
        "Quem quer sair do aluguel sem pagar juros bancários",
        "Quem está planejando a compra do primeiro imóvel",
        "Quem quer investir em imóveis para renda ou patrimônio",
        "Quem tem FGTS e quer usá-lo para conquistar um imóvel",
        "Quem busca terreno para construir",
        "Quem precisa de imóvel comercial para seu negócio",
      ]}
      whyPatro={[
        "Comparamos administradoras para o melhor custo-benefício",
        "Orientação sobre uso do FGTS para lance",
        "Simulação personalizada e gratuita sem compromisso",
        "Consultoria para escolher crédito e prazo ideais",
        "Acompanhamento durante todo o período do consórcio",
        "Experiência em consórcio imobiliário para diferentes perfis",
      ]}
      faqs={[
        { question: "Posso usar o FGTS no consórcio de imóveis?", answer: "Sim! O FGTS pode ser utilizado para dar lance no consórcio de imóveis residenciais, acelerando sua contemplação. Também pode complementar o valor do crédito na aquisição." },
        { question: "Qual o valor mínimo de crédito?", answer: "Os créditos geralmente começam a partir de R$100 mil, podendo chegar a mais de R$1 milhão dependendo da administradora. Fazemos uma simulação personalizada para seu objetivo." },
        { question: "Consórcio imobiliário tem juros?", answer: "Não! Diferente do financiamento imobiliário que cobra juros compostos, o consórcio cobra apenas taxa de administração, que é significativamente menor. A economia pode superar 40%." },
        { question: "Posso usar para construir?", answer: "Sim, algumas administradoras permitem usar a carta de crédito para construção ou reforma, desde que o terreno esteja quitado e em nome do consorciado." },
        { question: "Quanto tempo leva para ser contemplado?", answer: "Depende dos sorteios e lances. Com lance de FGTS, muitos clientes são contemplados nos primeiros meses. Todos os participantes são contemplados até o final do plano." },
      ]}
      relatedInsurances={[
        { title: "Consórcio de Carro", link: "/consorcio-carro" },
        { title: "Consórcio de Veículos Pesados", link: "/consorcio-veiculos-pesados" },
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Consórcio Geral", link: "/consorcio" },
      ]}
      featuredArticle={{
        eyebrow: "Leitura recomendada",
        title: "Por que o Consórcio de Imóveis é a Melhor Estratégia para Crescimento Patrimonial em Guarulhos (2026)",
        description:
          "Entenda como a linha Porto Imóveis, o uso do FGTS e a baixa taxa de administração superam o financiamento tradicional na valorização da Cidade Maia e região. Guia completo com comparativo de CET, lances e passo a passo.",
        href: "/blog/consorcio-imoveis-crescimento-patrimonial-guarulhos-2026",
        ctaText: "Ler o guia completo",
        image: blogConsorcio,
      }}
    />
  );
};

export default ConsorcioImoveis;
