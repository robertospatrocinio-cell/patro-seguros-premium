import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import ServiceSchema from "@/components/ServiceSchema";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeguroEmpresa = () => {
  return (
    <>
      <ServiceSchema
        name="Seguros para Empresas"
        description="Gestão de riscos completa para empresas de Guarulhos e região. Seguros Empresarial, Frota, Vida em Grupo, Saúde PME e Seguro Garantia. Consultoria especializada na Patro Seguros."
        serviceType="InsuranceAgency"
      />
      <InsurancePageTemplate
        heroImage={heroImg}
        title="Seguros para Empresas em Guarulhos | Soluções PJ e PME | Patro"
        headline="Gestão de riscos e proteção patrimonial para sua empresa em Guarulhos"
        subtitle="Consultoria estratégica para blindar o faturamento e o patrimônio do seu negócio"
        icon="🏢"
        metaDescription="Seguros para empresas em Guarulhos: empresarial, frota, saúde PME, vida em grupo e garantia. Proteja seu negócio com a consultoria da Patro Seguros."
        description="Uma empresa em Guarulhos enfrenta riscos que vão além do operacional. O seguro empresarial é a engenharia financeira que garante a continuidade do negócio após um incêndio, roubo ou processo judicial. Na Patro, cuidamos desde o pequeno comércio no Cidade Maia até grandes indústrias em Cumbica."
        detailedDescription={`A proteção empresarial moderna exige um olhar 360º. Não basta proteger o prédio; é preciso garantir que o faturamento continue (Lucros Cessantes), que os funcionários estejam protegidos (Saúde e Vida) e que as obrigações contratuais sejam honradas (Seguro Garantia).

Nossa consultoria em Guarulhos mapeia os riscos específicos do seu CNAE. Indústrias, comércios, transportadoras e prestadores de serviços têm necessidades distintas. Comparamos taxas nas principais seguradoras corporativas do Brasil (Porto, Allianz, Tokio Marine, Sompo, Akad, Ezze) para entregar o melhor custo-benefício.`}
        coverages={[
          { title: "Seguro Empresarial (Patrimonial)", description: "Proteção contra incêndio, roubo, danos elétricos e vendaval. Essencial para prédios, estoques e equipamentos." },
          { title: "Seguro de Frota", description: "Gestão simplificada para veículos da empresa, com coberturas contra colisão, roubo e danos a terceiros." },
          { title: "Saúde & Odonto PME", description: "Retenção de talentos com os melhores planos de saúde de Guarulhos e SP. Economia de até 40% em relação ao individual." },
          { title: "Vida em Grupo", description: "Proteção para seus colaboradores e cumprimento de convenções coletivas de trabalho (CCT)." },
          { title: "Seguro Garantia & Crédito", description: "Alternativa à caução em licitações e contratos, preservando o capital de giro da sua empresa." },
          { title: "Responsabilidade Civil (RC)", description: "Proteção contra danos causados a terceiros (clientes, vizinhos) durante a operação do negócio." },
        ]}
        whoNeeds={[
          "Micro, Pequenas e Médias Empresas (PME) de Guarulhos",
          "Indústrias de Cumbica, Bonsucesso e Pimentas",
          "Comércios de rua e shopping centers",
          "Condomínios comerciais e residenciais",
          "Prestadores de serviços e escritórios",
          "Empresas que participam de licitações",
        ]}
        whyPatro={[
          "Análise de risco técnica baseada no seu segmento (CNAE)",
          "Especialistas em Lucros Cessantes para garantir fluxo de caixa",
          "Cotação em seguradoras com foco corporativo",
          "Gestão ativa de apólices e suporte em vistorias técnicas",
          "Atendimento local em Guarulhos para rápida resolução de problemas",
        ]}
        pricingInfo={{
          intro: "O custo do seguro empresarial é um investimento na continuidade do negócio. Estimativas médias:",
          factors: [
            "Pequeno Comércio: a partir de R$ 600/ano",
            "Escritórios/Serviços: a partir de R$ 450/ano",
            "Saúde PME (2-29 vidas): a partir de R$ 180/vida (conforme idade)",
            "Seguro Garantia: taxas a partir de 0,5% a.a. sobre o valor garantido",
            "Frota (acima de 3 veículos): descontos progressivos por volume",
          ],
          note: "O investimento em seguro geralmente representa menos de 1% do faturamento anual, mas protege 100% do patrimônio.",
        }}
        faqs={[
          { question: "O seguro empresarial é obrigatório?", answer: "A cobertura de incêndio é obrigatória por lei para toda empresa. Além disso, muitos contratos de aluguel comercial exigem apólices específicas." },
          { question: "Consigo contratar seguro para empresa com CNPJ MEI?", answer: "Sim! O MEI tem acesso a condições especiais, principalmente em planos de saúde e seguros de vida simplificados." },
          { question: "Como funciona a cobertura de Lucros Cessantes?", answer: "Ela repõe o faturamento líquido que a empresa deixa de gerar enquanto está parada por um sinistro (como um incêndio), garantindo o pagamento de salários e aluguel." },
        ]}
        relatedInsurances={[
          { title: "Seguro Empresarial", link: "/seguro-empresarial" },
          { title: "Seguro de Frota", link: "/seguro-frota" },
          { title: "Seguro Garantia", link: "/seguro-garantia" },
          { title: "Plano de Saúde PME", link: "/plano-de-saude-pme-guarulhos" },
        ]}
        quoteUrl="/cotacao"
        canonicalUrl="https://www.patroseguros.com.br/seguro-empresa"
      />
    </>
  );
};

export default SeguroEmpresa;