import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-lojas.webp";

const SeguroLojasShopping = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Loja em Shopping: Estoque, RC e Lucros Cessantes"
      headline="Seguro para loja em shopping: proteja estoque e operação"
      subtitle="Incêndio no estoque, vazamento sobre as mercadorias ou acidente com um cliente? Avalie as coberturas da sua loja e as exigências do shopping com a Patro Seguros."
      icon="🏬"
      metaDescription="Seguro para loja em shopping: estoque, incêndio, roubo, RC e lucros cessantes. Confira as exigências do contrato de locação e peça sua cotação."
      quoteCtaText="Cotar seguro para minha loja"
      description="O seguro para loja em shopping reúne coberturas para mercadorias, instalações e equipamentos, além de responsabilidade civil e interrupção da operação, conforme a contratação. A escolha deve considerar o seu segmento e o contrato de locação."
      detailedDescription={`Uma loja em shopping concentra estoque, mobiliário, equipamentos e vitrines em um espaço que precisa continuar funcionando. Incêndio, roubo, danos elétricos e vazamentos podem comprometer esses bens. Um acidente com um cliente também pode gerar um pedido de indenização.

A apólice do shopping não substitui automaticamente o seguro do lojista. Confira quais bens e responsabilidades estão contemplados no seguro do empreendimento e quais ficam a cargo da sua loja. O contrato de locação pode exigir coberturas e limites mínimos para a operação.

Estoque danificado e receita interrompida são prejuízos diferentes. A cobertura dos bens depende da causa do dano contratada; lucros cessantes exigem cobertura específica, evento previsto e regras de indenização. Fechamento do shopping, por si só, não garante indenização.

Na Patro Seguros, a cotação considera a atividade da loja, o estoque, os equipamentos e as exigências da locação. Você pode comparar limites, franquias e exclusões antes de contratar. As coberturas dependem da aceitação da seguradora e das condições da apólice.`}
      howItWorks={[
        { step: "1", title: "Informe os dados da loja", description: "Separe o contrato ou manual de seguros do shopping, a atividade, a área e os valores de estoque e equipamentos." },
        { step: "2", title: "Confira as exigências da locação", description: "Analisamos as coberturas e os limites solicitados pelo shopping junto aos riscos do seu segmento." },
        { step: "3", title: "Compare a proposta", description: "Avalie o preço junto com os limites por cobertura, franquias e exclusões antes de escolher." },
        { step: "4", title: "Contrate e acompanhe a apólice", description: "Após a aceitação e emissão, confira a vigência e apresente a apólice ao shopping. A Patro também orienta no aviso de sinistro." },
      ]}
      coverages={[
        { title: "Incêndio, Raio e Explosão", description: "Danos ao estoque, mobiliário e instalações por eventos previstos na apólice, até os limites contratados." },
        { title: "Roubo e Furto Qualificado", description: "Avalie proteção para mercadorias e equipamentos. Confira os critérios de furto qualificado, as exigências de segurança e os bens aceitos." },
        { title: "Danos Elétricos", description: "Equipamentos da loja podem ser protegidos contra danos elétricos previstos, como curto-circuito e oscilação de energia. Verifique franquias e exclusões." },
        { title: "Responsabilidade Civil da Loja", description: "Cobertura para a responsabilidade do lojista por danos a clientes e terceiros, como acidentes dentro da loja, conforme os riscos contratados." },
        { title: "Quebra de Vidros e Vitrines", description: "Considere o custo de reposição de vitrines, espelhos e vidros. Os itens e as causas de quebra precisam estar contemplados na contratação." },
        { title: "Proteção do Estoque", description: "Informe o valor das mercadorias e as variações em datas de maior venda. A indenização depende da causa do dano, dos limites e das regras da apólice." },
        { title: "Lucros Cessantes", description: "Pode amparar perdas financeiras durante a paralisação causada por um sinistro coberto. Confira o período de indenização, a carência ou franquia e a forma de cálculo." },
        { title: "Danos por Água", description: "Vazamento de tubulação e alagamento podem ter regras distintas. Confira quais origens do dano são aceitas para o estoque e as instalações da sua loja." },
      ]}
      coverageExclusions={[
        "Desgaste natural de mercadorias e equipamentos",
        "Furto simples e desaparecimento de mercadorias, sem cobertura expressa",
        "Eventos, bens e prejuízos fora das coberturas contratadas",
        "Perdas por variação cambial ou desvalorização de mercadorias",
        "Alimentos perecíveis por falta de refrigeração, sem cobertura específica",
        "Danos de obras e reformas sem previsão de cobertura",
      ]}
      pricingInfo={{
        intro: "O preço do seguro para loja em shopping depende da atividade, dos bens e das coberturas escolhidas. Para comparar propostas, confira também os limites e a participação do lojista em cada sinistro.",
        factors: [
          "Segmento da loja e características das mercadorias",
          "Valor do estoque e variações sazonais",
          "Valor dos equipamentos, instalações e mobiliário",
          "Localização, medidas de segurança e histórico de sinistros",
          "Coberturas, limites e franquias escolhidos",
          "Área da loja e exigências do contrato de locação",
        ],
        note: "Para pedir sua cotação, informe o shopping, a atividade, a área da loja e os valores dos bens. Tenha em mãos as exigências de seguro da locação e, em caso de renovação, a apólice atual. A cotação é gratuita; preço e aceitação dependem da análise da seguradora.",
      }}
      realScenarios={[
        { title: "Vazamento atinge o estoque de roupas", description: "Exemplo ilustrativo: uma tubulação rompe e molha as mercadorias. É preciso verificar se a origem do dano está coberta. Se a loja parar, lucros cessantes dependem de contratação específica e das condições previstas." },
        { title: "Arrombamento de loja de eletrônicos", description: "Exemplo ilustrativo: equipamentos são levados durante a madrugada. A análise considera a cobertura contratada, a caracterização do evento, os documentos do estoque e as exigências de segurança." },
        { title: "Cliente sofre uma queda dentro da loja", description: "Exemplo ilustrativo: um cliente se machuca e solicita reparação. A cobertura de responsabilidade civil depende da responsabilidade do lojista, do risco contratado e dos limites da apólice." },
      ]}
      importantDetails={[
        { title: "Seguro do shopping e seguro da loja têm funções diferentes", content: "Não presuma que a apólice do empreendimento proteja suas mercadorias e equipamentos. Confira a divisão de responsabilidades no contrato e as coberturas de cada apólice para identificar lacunas." },
        { title: "Confira o contrato de locação antes de contratar", content: "O shopping pode exigir seguro do lojista com coberturas e limites mínimos. Envie essas exigências na cotação e confira a proposta antes da emissão. A aceitação da apólice pelo shopping depende do atendimento às regras do contrato." },
        { title: "Estoque precisa acompanhar as datas de maior venda", content: "Informe o valor dos bens e avise sobre aumentos relevantes do estoque. Valores insuficientes podem limitar a indenização ou gerar rateio, conforme a modalidade e as condições contratadas." },
        { title: "Interrupção da loja exige análise própria", content: "Para lucros cessantes, confira o evento que dá direito à cobertura, o período de indenização e as despesas contempladas. Fechamento por decisão administrativa ou pandemia não deve ser tratado como automaticamente coberto." },
      ]}
      tips={[
        "Declare o valor correto do estoque — subdeclarar pode resultar em indenização proporcional (rateio)",
        "Inclua cobertura de Lucros Cessantes — o fechamento da loja por sinistro gera prejuízo duplo: perda de receita + custos fixos",
        "Fotografe periodicamente seu estoque e equipamentos — facilita a comprovação em caso de sinistro",
        "Verifique se seu contrato de locação exige seguro — muitos shoppings tornam obrigatório",
        "Inclua RC para clientes — acidentes dentro da loja podem gerar processos caros",
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
        "Coberturas personalizadas para cada tipo de loja",
        "Cotação gratuita com as melhores seguradoras do mercado",
        "Atendimento humanizado e consultivo",
        "Agilidade na emissão da apólice",
        "Suporte completo na hora do sinistro",
        "Preços competitivos com condições de pagamento flexíveis",
      ]}
      faqs={[
        { question: "O seguro para loja em shopping é obrigatório?", answer: "A exigência pode estar no contrato de locação ou no manual do shopping. Confira quais coberturas, limites e comprovantes são solicitados e envie essas informações ao pedir a cotação." },
        { question: "O seguro do shopping cobre o estoque e o interior da minha loja?", answer: "Não conte com essa proteção automaticamente. A abrangência depende da apólice do empreendimento e do contrato de locação. Confira se mercadorias, instalações, equipamentos e a responsabilidade do lojista precisam de seguro próprio." },
        { question: "Quanto custa o seguro para loja em shopping?", answer: "O valor depende do segmento, da área, do estoque, dos equipamentos, das coberturas e das franquias. Informe esses dados e as exigências da locação para receber uma cotação gratuita adequada à sua loja." },
        { question: "O seguro cobre roubo e furto de mercadorias?", answer: "Roubo e furto qualificado podem ser contratados, sujeitos aos bens aceitos, aos limites e às exigências de segurança. Furto simples e desaparecimento de mercadorias não devem ser considerados cobertos sem previsão expressa." },
        { question: "Vazamento de tubulação e alagamento estão cobertos?", answer: "Depende da cobertura e da origem da água. Ruptura de tubulação, infiltração e alagamento podem receber tratamentos diferentes. Confira as condições para danos ao estoque e às instalações antes de contratar." },
        { question: "Lucros cessantes cobrem qualquer fechamento da loja?", answer: "Não. A cobertura depende de contratação específica, de um evento previsto e das regras de apuração e indenização. Fechamento do shopping, decisão administrativa ou pandemia não geram cobertura automática." },
        { question: "A responsabilidade civil cobre acidentes com clientes?", answer: "Pode amparar a responsabilidade do lojista por danos a clientes e terceiros nos riscos contratados, como um acidente dentro da loja. A análise depende das circunstâncias, das condições e dos limites da apólice." },
        { question: "Quiosques e franquias em shopping podem contratar?", answer: "Sim, é possível solicitar cotação para quiosques, ilhas e franquias. A aceitação depende da atividade, dos bens, da segurança e das condições da seguradora. Informe também as exigências do shopping e da franquia, quando houver." },
        { question: "Quais informações preciso para cotar o seguro da loja?", answer: "Informe o shopping, a atividade, a área e os valores de estoque, equipamentos, instalações e mobiliário. Envie as exigências de seguro da locação e, para renovação, a apólice atual. A seguradora poderá solicitar dados adicionais." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Cyber", link: "/seguro-cyber" },
        { title: "Responsabilidade Civil", link: "/seguro-rc" },
        { title: "Seguro de Vida PME", link: "/seguro-vida-pme" },
      ]}
    />
  );
};

export default SeguroLojasShopping;
