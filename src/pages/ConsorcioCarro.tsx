import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-consorcio.webp";
import heroMobileImg from "@/assets/hero-consorcio-sm.webp";

const ConsorcioCarro = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      mobileHeroImage={heroMobileImg}
      title="Consórcio de Automóveis"
      subtitle="Como trocar de carro sem pagar dois para o banco? A estratégia de inteligência financeira para seu patrimônio."
      icon="🚗"
      showEbookConsorcio
      metaDescription="Consórcio de carros em Guarulhos: troque de veículo sem pagar juros bancários. Estratégia de troca planejada e estudo de lance com a Patro Seguros."
      description="O Consórcio de Automóveis é a estratégia principal para ampliar frotas ou trocar de veículos sem pagar juros bancários e sem queimar o seu capital de giro."
      detailedDescription="Enquanto no financiamento você paga pelo 'uso imediato do dinheiro' com taxas que podem dobrar o valor do veículo, no consórcio você paga apenas uma taxa de administração diluída. Com a carta de crédito contemplada, você negocia como se tivesse o dinheiro no bolso, extraindo os melhores descontos nas concessionárias (poder de compra à vista)."
      importantDetails={[
        {
          title: "O Custo da Imparcialidade vs. Juros Bancários",
          content: "A economia direta entre o custo de um financiamento e um consórcio pode ser o valor de entrada para o seu próximo investimento imobiliário ou um aporte significativo em sua previdência privada."
        },
        {
          title: "Ciclo de Troca Planejada (A Estratégia dos 3 Anos)",
          content: "Adesão com parcelas que cabem no fluxo de caixa -> Contemplação via lance estratégico (usando seu usado) -> Upgrade para carro novo com garantia de fábrica. Repita o ciclo para manter o patrimônio sempre atualizado e com baixa manutenção."
        },
        {
          title: "Alavancagem para Empresas (B2B)",
          content: "Para o empresário que precisa de utilitários ou veículos executivos, o consórcio permite a expansão da frota sem comprometer as linhas de crédito bancário, que ficam livres para capital de giro ou emergências."
        }
      ]}
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
        "Estudo de Lance: Analisamos o histórico do grupo para recomendar o momento exato da oferta",
        "Consultoria Estratégica: Transformamos o consórcio em ferramenta de inteligência financeira",
        "Comparativo Real: Mostramos a economia exata do consórcio vs. financiamento",
        "Foco em B2B: Soluções para ampliação de frota sem queimar capital de giro",
        "Poder de Negociação: Orientação para extrair os melhores descontos com a carta contemplada",
        "Atendimento Especialista: Consultores que entendem de patrimônio, não apenas de cotas",
      ]}
      faqs={[
        { question: "Quanto custa o consórcio de carro?", answer: "O valor da parcela depende do crédito escolhido e do prazo do plano. Por exemplo, para um carro de R$80.000, as parcelas podem partir de R$800/mês em planos mais longos. Fazemos uma simulação gratuita para encontrar o valor ideal." },
        { question: "Consórcio de carro tem juros?", answer: "Não! O consórcio não cobra juros. Existe apenas uma taxa de administração, que é muito menor que os juros de financiamento. A economia pode chegar a 40% do valor total pago." },
        { question: "Como funciona o lance no consórcio de carro?", answer: "Existem três tipos: lance livre (você oferece o valor que quiser), lance fixo (percentual definido pela administradora) e lance embutido (parte do próprio crédito é usado como lance, sem desembolso extra)." },
        { question: "Posso comprar carro usado com consórcio?", answer: "Sim! A carta de crédito pode ser usada para adquirir veículos novos ou seminovos, desde que atendam aos critérios da administradora (geralmente até 10 anos de fabricação)." },
        { question: "Em quanto tempo sou contemplado?", answer: "Depende da sorte nos sorteios e dos lances oferecidos. Alguns clientes são contemplados nos primeiros meses com lance. Por sorteio, pode ocorrer a qualquer momento. Todos são contemplados até o final do plano." },
      ]}
      realScenarios={[
        {
          title: "Upgrade Programado",
          description: "Troque seu veículo a cada 3 anos usando o valor da venda do usado como lance, mantendo parcelas baixas e patrimônio sempre novo."
        },
        {
          title: "Expansão de Frota PME",
          description: "Empresa de Guarulhos adquiriu 3 utilitários via consórcio, economizando R$ 120 mil em juros que foram reinvestidos no marketing do negócio."
        }
      ]}
      pricingInfo={{
        intro: "O custo do consórcio é baseado na taxa de administração, que é diluída pelo prazo do grupo. Diferente do banco, você não paga juros compostos.",
        factors: [
          "Valor do crédito desejado",
          "Prazo do grupo (até 100 meses)",
          "Administradora escolhida",
          "Estratégia de lance (embutido ou recurso próprio)"
        ],
        note: "Quer ver a simulação real da economia do consórcio vs. financiamento para o seu próximo carro? Fale com nossos consultores estratégicos."
      }}
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
