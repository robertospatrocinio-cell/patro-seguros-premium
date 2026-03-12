import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroLojasShopping = () => {
  return (
    <InsurancePageTemplate
      title="Seguro para Lojas de Shopping"
      subtitle="Proteção especializada para lojistas e operações dentro de shopping centers"
      icon="🏬"
      description="O Seguro para Lojas de Shopping é uma proteção essencial para lojistas que operam em centros comerciais. Incêndios, roubos, danos ao estoque, responsabilidade civil com clientes e interrupção das atividades podem gerar prejuízos imensos. Com a Patro Seguros, sua loja de shopping conta com coberturas personalizadas que garantem a continuidade do seu negócio, proteção do patrimônio e tranquilidade para vender todos os dias."
      coverages={[
        {
          title: "Incêndio, Raio e Explosão",
          description: "Cobertura para danos causados por fogo, descargas elétricas e explosões dentro do shopping",
        },
        {
          title: "Roubo e Furto Qualificado",
          description: "Proteção para mercadorias, equipamentos, móveis e valores em caso de roubo ou furto",
        },
        {
          title: "Danos Elétricos",
          description: "Cobertura para equipamentos danificados por curto-circuito, picos e oscilações de energia",
        },
        {
          title: "Responsabilidade Civil",
          description: "Proteção contra danos causados a clientes e terceiros dentro da loja (quedas, acidentes, etc.)",
        },
        {
          title: "Quebra de Vidros e Vitrines",
          description: "Cobertura para vitrines, espelhos, vidros decorativos e fachadas da loja",
        },
        {
          title: "Perda de Estoque",
          description: "Proteção para mercadorias danificadas por alagamento, vazamento ou sinistros cobertos",
        },
        {
          title: "Lucros Cessantes",
          description: "Indenização pela perda de receita durante o período de interrupção das atividades após um sinistro",
        },
        {
          title: "Danos por Água (Alagamento)",
          description: "Cobertura para danos causados por vazamentos, infiltrações e alagamentos internos do shopping",
        },
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
        {
          question: "O seguro da loja no shopping é obrigatório?",
          answer: "Muitos shoppings exigem que os lojistas apresentem apólice de seguro como condição para operar. Mesmo quando não obrigatório, é altamente recomendado para proteger o patrimônio e garantir a continuidade do negócio.",
        },
        {
          question: "O seguro do shopping não cobre a minha loja?",
          answer: "O seguro do condomínio do shopping cobre apenas áreas comuns (corredores, estacionamento, fachada). O interior da sua loja, estoque, equipamentos e responsabilidade civil são de responsabilidade do lojista.",
        },
        {
          question: "Quanto custa o seguro para loja de shopping?",
          answer: "O valor varia conforme o tipo de atividade, valor do estoque, tamanho da loja e coberturas escolhidas. Em geral, custa a partir de R$ 80/mês, um valor muito baixo comparado ao prejuízo de um sinistro. Faça uma cotação gratuita com a Patro.",
        },
        {
          question: "O seguro cobre roubo de mercadoria?",
          answer: "Sim, a cobertura de roubo e furto qualificado protege mercadorias, equipamentos e valores. É importante declarar corretamente o valor do estoque para garantir indenização integral.",
        },
        {
          question: "Se minha loja fechar por um incêndio no shopping, o seguro cobre?",
          answer: "Sim, a cobertura de Lucros Cessantes indeniza a perda de receita durante o período em que a loja ficar fechada por conta de um sinistro coberto, como incêndio ou alagamento.",
        },
        {
          question: "Quiosques e ilhas de shopping podem contratar seguro?",
          answer: "Sim! Quiosques, ilhas e espaços temporários dentro de shoppings também podem e devem ser segurados. A Patro Seguros oferece planos adequados para cada formato de operação.",
        },
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
