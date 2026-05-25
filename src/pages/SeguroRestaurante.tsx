import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeguroRestaurante = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro para Restaurantes, Bares e Cafés"
      subtitle="Proteção completa para o seu estabelecimento, clientes e funcionários."
      icon="🍽️"
      badge="Especialista em Gastronomia"
      metaDescription="Seguro para Restaurantes e Bares em Guarulhos: proteção contra incêndio, roubo, danos elétricos e intoxicação alimentar. Cotação grátis Patro Seguros."
      description="O setor de gastronomia possui riscos únicos, desde incidentes na cozinha até a responsabilidade por intoxicações alimentares. O seguro da Patro Seguros protege seu negócio de ponta a ponta."
      detailedDescription={`Operar um restaurante ou bar em Guarulhos exige atenção constante. Um pequeno foco de incêndio na cozinha, um curto-circuito em uma câmara fria que estraga todo o estoque, ou um cliente que se acidenta nas dependências do estabelecimento pode significar um prejuízo fatal para o caixa da empresa.

Nossa consultoria desenha apólices específicas para o setor de alimentação, incluindo coberturas fundamentais como Responsabilidade Civil Operações (incluindo intoxicação alimentar) e Lucros Cessantes, que garantem o pagamento das suas contas fixas caso o restaurante precise parar por um sinistro coberto.

Atendemos desde cafeterias e lanchonetes de bairro até grandes redes de restaurantes e bares badalados, com soluções que equilibram custo e proteção real.`}
      howItWorks={[
        { step: "1", title: "Perfil Gastronômico", description: "Identificamos o tipo de cozinha (fogo, chapa, industrial) e o perfil do público." },
        { step: "2", title: "Levantamento de Ativos", description: "Avaliamos o valor das máquinas, mobiliário, estoque de bebidas e alimentos." },
        { step: "3", title: "Análise de Risco", description: "Verificamos sistemas de exaustão, gás (GLP/Natural) e medidas de combate a incêndio." },
        { step: "4", title: "Customização e Emissão", description: "Estruturamos a apólice com foco em RC e Lucros Cessantes para sua tranquilidade." },
      ]}
      coverages={[
        { title: "Incêndio, Raio e Explosão", description: "Proteção básica vital para o imóvel e todo o conteúdo interno." },
        { title: "Danos Elétricos", description: "Protege geladeiras, câmaras frias, fornos combinados e sistemas de PDV." },
        { title: "RC Operações e Fornecimento", description: "Cobre intoxicação alimentar, acidentes com clientes e quedas no local." },
        { title: "Roubo e Furto Qualificado", description: "Segurança para estoque de bebidas premium, equipamentos e valores em caixa." },
        { title: "Lucros Cessantes", description: "Garante o faturamento líquido ou custos fixos se o restaurante precisar fechar." },
        { title: "Quebra de Vidros", description: "Cobertura para fachadas, vitrines e espelhos decorativos." },
        { title: "Deterioração de Alimentos", description: "Indenização por perda de mercadoria em câmaras frias por falta de energia." },
      ]}
      coverageExclusions={[
        "Danos por falta de limpeza no sistema de exaustão e coifas",
        "Multas de vigilância sanitária ou órgãos ambientais",
        "Atos de vandalismo em dias de grandes eventos externos",
        "Desgaste natural de utensílios de cozinha e louças",
        "Furtos cometidos por funcionários (exige cobertura de Fidelidade)",
      ]}
      pricingInfo={{
        intro: "O prêmio é calculado com base no faturamento, localização e complexidade da cozinha.",
        factors: [
          "Tipo de fonte de energia para cocção (Gás, Lenha, Elétrica)",
          "Valor do estoque médio (bebidas e perecíveis)",
          "Capacidade de público e horário de funcionamento",
          "Medidas de segurança e brigada de incêndio",
          "Localização (Rua, Shopping ou Centro Comercial)",
        ],
        note: "Restaurantes que mantêm laudos de limpeza de coifa em dia possuem melhores taxas e facilidade em sinistros.",
      }}
      realScenarios={[
        { title: "Incêndio na Coifa", description: "Acúmulo de gordura causou incêndio que danificou o teto e a cozinha. O seguro pagou R$ 45.000 em reparos e a limpeza técnica." },
        { title: "Queda de Energia e Perda de Estoque", description: "Um transformador estourou na rua, deixando o restaurante 12h sem luz. O seguro indenizou R$ 12.000 em carnes e perecíveis perdidos." },
        { title: "Intoxicação Alimentar", description: "Três clientes processaram o local alegando mal-estar. O seguro de RC cobriu os custos advocatícios e o acordo judicial de R$ 18.000." },
      ]}
      importantDetails={[
        { title: "Limpeza de Coifa", content: "Para a validade da cobertura de incêndio, é obrigatório manter a limpeza semestral das coifas e dutos, com apresentação de laudo técnico." },
        { title: "Vazamento de Gás", content: "Garantimos que a cobertura de RC cubra danos causados por explosões ou vazamentos de gás, protegendo também os imóveis vizinhos." },
      ]}
      tips={[
        "Mantenha sempre o AVCB e o laudo de estanqueidade de gás em dia",
        "Instale sensores de fumaça e detectores de gás na área da cozinha",
        "Treine sua equipe para agir em princípios de incêndio com extintores corretos",
        "Guarde notas fiscais de equipamentos importados ou de alto valor (como fornos)",
      ]}
      whoNeeds={[
        "Restaurantes de todos os portes (A la carte, Self-service)",
        "Bares, Pubs e Choperias",
        "Pizzarias e Hamburguerias",
        "Cafeterias e Padarias",
        "Buffets e Espaços de Eventos Gastronômicos",
        "Dark Kitchens e Operações de Delivery",
      ]}
      whyPatro={[
        "Especialistas em seguros para o setor de *food service*",
        "Consultoria técnica para dimensionamento de Lucros Cessantes",
        "Comparativo entre seguradoras com melhor aceitação para bares e casas noturnas",
        "Suporte direto em regulação de sinistros na cidade de Guarulhos",
        "Renovação estratégica baseada na evolução do seu negócio",
      ]}
      faqs={[
        { question: "O seguro cobre delivery?", answer: "Sim, podemos incluir coberturas para a operação de entrega e a responsabilidade sobre os produtos enviados." },
        { question: "Cobre briga de clientes no bar?", answer: "Sim, a cobertura de RC Operações pode ser estendida para cobrir danos decorrentes de tumultos e brigas dentro do estabelecimento." },
        { question: "O que acontece se o gerador falhar?", answer: "Se houver a cobertura de Deterioração de Alimentos, você será indenizado pela perda das mercadorias, independente da falha do gerador, desde que por evento coberto." },
        { question: "O custo é mensal?", answer: "O prêmio é anual, mas pode ser parcelado em até 10x ou 12x, dependendo da seguradora escolhida." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro de Vida PME", link: "/seguro-vida-pme" },
        { title: "Seguro de Entrega", link: "/seguro-transporte" },
      ]}
    />
  );
};

export default SeguroRestaurante;
