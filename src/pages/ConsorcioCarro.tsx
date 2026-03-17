import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-consorcio.webp";

const ConsorcioCarro = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Consórcio de Carro"
      subtitle="Conquiste seu carro novo ou seminovo sem juros e com parcelas que cabem no bolso"
      icon="🚗"
      metaDescription="Consórcio de Carro sem juros com a Patro Seguros. Parcelas acessíveis, poder de compra à vista e economia de até 40% vs financiamento. Simule grátis!"
      description="O Consórcio de Carro é a forma mais inteligente e econômica de adquirir seu veículo. Diferente do financiamento, você não paga juros — apenas uma taxa de administração diluída nas parcelas. Ao ser contemplado por sorteio ou lance, você tem poder de compra à vista, conseguindo os melhores preços e condições nas concessionárias. A Patro Seguros trabalha com as principais administradoras do mercado para encontrar o plano ideal para o seu perfil e orçamento."
      coverages={[
        { title: "Sem Juros", description: "Diferente do financiamento, no consórcio você paga apenas taxa de administração — economia de até 40%" },
        { title: "Poder de Compra à Vista", description: "Ao ser contemplado, você negocia como comprador à vista e garante os melhores descontos" },
        { title: "Parcelas Acessíveis", description: "Planos com parcelas que se adaptam ao seu orçamento, sem comprometer suas finanças" },
        { title: "Lance para Antecipar", description: "Ofereça lances para antecipar sua contemplação — lance livre, fixo ou embutido" },
        { title: "Carro Novo ou Seminovo", description: "Use sua carta de crédito para adquirir veículos novos ou seminovos de qualquer marca" },
        { title: "Sem Entrada Obrigatória", description: "Comece a participar do grupo sem precisar dar entrada — diferente do financiamento" },
        { title: "Contemplação por Sorteio", description: "Todo mês você concorre ao sorteio e pode ser contemplado a qualquer momento do plano" },
        { title: "Regulamentado pelo Banco Central", description: "Segurança total — o consórcio é fiscalizado e regulamentado pelo Banco Central do Brasil" },
      ]}
      whoNeeds={[
        "Quem quer trocar de carro sem pagar juros",
        "Quem está planejando a compra do primeiro veículo",
        "Quem quer economizar até 40% comparado ao financiamento",
        "Quem busca parcelas fixas e previsíveis",
        "Quem quer poder de compra à vista na concessionária",
        "Quem não tem pressa e quer planejar com inteligência",
      ]}
      whyPatro={[
        "Comparamos as melhores administradoras do mercado",
        "Simulação personalizada e gratuita sem compromisso",
        "Consultoria para escolher o plano ideal para seu perfil",
        "Orientação sobre estratégias de lance para contemplação rápida",
        "Acompanhamento durante todo o período do consórcio",
        "Atendimento humano e consultivo — sem robôs",
      ]}
      faqs={[
        { question: "Quanto custa o consórcio de carro?", answer: "O valor da parcela depende do crédito escolhido e do prazo do plano. Por exemplo, para um carro de R$80.000, as parcelas podem partir de R$800/mês em planos mais longos. Fazemos uma simulação gratuita para encontrar o valor ideal." },
        { question: "Consórcio de carro tem juros?", answer: "Não! O consórcio não cobra juros. Existe apenas uma taxa de administração, que é muito menor que os juros de financiamento. A economia pode chegar a 40% do valor total pago." },
        { question: "Como funciona o lance no consórcio de carro?", answer: "Existem três tipos: lance livre (você oferece o valor que quiser), lance fixo (percentual definido pela administradora) e lance embutido (parte do próprio crédito é usado como lance, sem desembolso extra)." },
        { question: "Posso comprar carro usado com consórcio?", answer: "Sim! A carta de crédito pode ser usada para adquirir veículos novos ou seminovos, desde que atendam aos critérios da administradora (geralmente até 10 anos de fabricação)." },
        { question: "Em quanto tempo sou contemplado?", answer: "Depende da sorte nos sorteios e dos lances oferecidos. Alguns clientes são contemplados nos primeiros meses com lance. Por sorteio, pode ocorrer a qualquer momento. Todos são contemplados até o final do plano." },
      ]}
      relatedInsurances={[
        { title: "Consórcio de Imóveis", link: "/consorcio-imoveis" },
        { title: "Consórcio de Veículos Pesados", link: "/consorcio-veiculos-pesados" },
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Consórcio Geral", link: "/consorcio" },
      ]}
    />
  );
};

export default ConsorcioCarro;
