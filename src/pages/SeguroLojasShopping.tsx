import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroLojasShopping = () => {
  return (
    <InsurancePageTemplate
      title="Seguro para Lojas de Shopping"
      subtitle="Proteção especializada para lojistas e operações dentro de shopping centers"
      icon="🏬"
      metaDescription="Seguro para Lojas de Shopping — proteção contra incêndio, roubo, RC e lucros cessantes para lojistas em centros comerciais. Cotação grátis Patro Seguros."
      description="O Seguro para Lojas de Shopping é essencial para proteger o patrimônio, estoque e operação de lojistas em centros comerciais."
      detailedDescription={`Operar uma loja de shopping envolve investimentos significativos: estoque, equipamentos, mobiliário, decoração e ponto comercial premium. Um incêndio, roubo ou alagamento pode destruir tudo em questão de horas — e o seguro do condomínio do shopping NÃO cobre o interior da sua loja.

Muitos lojistas desconhecem esse fato: o seguro do shopping cobre apenas as áreas comuns (corredores, estacionamento, fachada). Todo o interior da loja — mercadorias, equipamentos, vitrines e responsabilidade civil — é de responsabilidade exclusiva do lojista.

Além dos riscos tradicionais, lojas de shopping enfrentam riscos específicos: alagamentos por ruptura de tubulações do prédio, danos por obras em lojas vizinhas, acidentes com clientes dentro da loja e lucros cessantes por fechamento compulsório do shopping (como ocorreu na pandemia).

Na Patro Seguros, oferecemos coberturas personalizadas para cada tipo de loja e segmento, com valores acessíveis que representam uma fração do risco financeiro envolvido.`}
      howItWorks={[
        { step: "1", title: "Análise da Loja", description: "Levantamos informações sobre tipo de negócio, valor do estoque, equipamentos e localização no shopping" },
        { step: "2", title: "Coberturas sob Medida", description: "Definimos coberturas específicas para o seu segmento: moda, alimentação, tecnologia, joalheria, etc." },
        { step: "3", title: "Cotação Rápida", description: "Apresentamos proposta com valores acessíveis e coberturas abrangentes em poucos dias" },
        { step: "4", title: "Proteção Ativa", description: "Em caso de sinistro, acionamos a seguradora com agilidade para minimizar o impacto na sua operação" },
      ]}
      coverages={[
        { title: "Incêndio, Raio e Explosão", description: "Cobertura para danos causados por fogo, descargas elétricas e explosões dentro do shopping" },
        { title: "Roubo e Furto Qualificado", description: "Proteção para mercadorias, equipamentos, móveis e valores" },
        { title: "Danos Elétricos", description: "Cobertura para equipamentos danificados por curto-circuito e picos de energia" },
        { title: "Responsabilidade Civil", description: "Proteção contra danos causados a clientes e terceiros dentro da loja" },
        { title: "Quebra de Vidros e Vitrines", description: "Cobertura para vitrines, espelhos, vidros decorativos e fachadas" },
        { title: "Perda de Estoque", description: "Proteção para mercadorias danificadas por alagamento, vazamento ou sinistros" },
        { title: "Lucros Cessantes", description: "Indenização pela perda de receita durante interrupção das atividades" },
        { title: "Danos por Água (Alagamento)", description: "Cobertura para danos causados por vazamentos, infiltrações e alagamentos internos" },
      ]}
      coverageExclusions={[
        "Desgaste natural de mercadorias e equipamentos",
        "Furto simples (sem arrombamento ou violência)",
        "Danos cobertos pelo seguro do condomínio do shopping",
        "Perdas por variação cambial ou desvalorização de mercadorias",
        "Alimentos perecíveis por falta de refrigeração (sem cobertura específica)",
        "Danos causados por reformas do próprio lojista",
      ]}
      pricingInfo={{
        intro: "O seguro para loja de shopping é surpreendentemente acessível quando comparado ao risco financeiro.",
        factors: [
          "Tipo de negócio e segmento (joalheria paga mais que vestuário)",
          "Valor do estoque médio mantido na loja",
          "Valor dos equipamentos e mobiliário",
          "Localização do shopping e histórico de sinistros",
          "Coberturas e limites escolhidos",
          "Tamanho da loja (m²)",
        ],
        note: "Lojas de roupas: a partir de R$ 80/mês. Restaurantes e alimentação: R$ 100 a R$ 300/mês. Joalherias e eletrônicos: R$ 200 a R$ 800/mês. Quiosques: a partir de R$ 50/mês. Valores muito baixos frente ao risco de um sinistro.",
      }}
      realScenarios={[
        { title: "Alagamento por tubulação do shopping", description: "Uma tubulação do andar superior rompeu e alagou uma loja de roupas. R$ 180.000 em mercadorias foram danificadas. O seguro cobriu integralmente, incluindo R$ 25.000 em lucros cessantes durante 15 dias de reforma." },
        { title: "Roubo noturno na loja", description: "Uma joalheria dentro de shopping foi arrombada durante a madrugada. R$ 250.000 em mercadorias foram levados. O seguro de roubo cobriu o valor integral do estoque declarado." },
        { title: "Acidente com cliente", description: "Uma cliente escorregou dentro da loja e fraturou o pulso. A RC cobriu R$ 35.000 em despesas médicas e indenização, evitando processo judicial contra o lojista." },
      ]}
      importantDetails={[
        { title: "Seguro do shopping ≠ seguro da loja", content: "O seguro do condomínio do shopping cobre APENAS áreas comuns. O interior da sua loja, estoque, equipamentos e RC são sua responsabilidade. Não confie apenas no seguro do shopping." },
        { title: "Exigência do shopping", content: "Muitos shoppings exigem que lojistas apresentem apólice de seguro como condição para operar. Verifique seu contrato de locação — pode ser obrigatório." },
        { title: "Valor do estoque", content: "Declare o valor real do estoque médio mantido na loja. Subdeclarar pode resultar em rateio — indenização proporcional ao que foi declarado vs real." },
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
        { question: "O seguro da loja no shopping é obrigatório?", answer: "Muitos shoppings exigem apólice de seguro para operar. Mesmo quando não obrigatório, é altamente recomendado." },
        { question: "O seguro do shopping não cobre minha loja?", answer: "Não. O seguro do condomínio cobre apenas áreas comuns. O interior da loja é responsabilidade do lojista." },
        { question: "Quanto custa?", answer: "A partir de R$ 50/mês para quiosques e R$ 80/mês para lojas. Um valor muito baixo comparado ao risco." },
        { question: "O seguro cobre roubo?", answer: "Sim, roubo e furto qualificado. Declare corretamente o valor do estoque para garantir indenização integral." },
        { question: "Quiosques podem contratar?", answer: "Sim! Quiosques, ilhas e espaços temporários também podem e devem ser segurados." },
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
