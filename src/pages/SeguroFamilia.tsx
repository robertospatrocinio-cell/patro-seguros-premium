import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import ServiceSchema from "@/components/ServiceSchema";
import heroImg from "@/assets/hero-seguro-vida.webp";

const SeguroFamilia = () => {
  return (
    <>
      <ServiceSchema
        name="Seguros para Famílias"
        description="Proteção completa para o futuro da sua família em Guarulhos. Seguro de Vida Familiar, Plano de Saúde, Seguro Residencial e Previdência. Consultoria dedicada na Patro Seguros."
        serviceType="InsuranceAgency"
      />
      <InsurancePageTemplate
        heroImage={heroImg}
        title="Seguros para Famílias em Guarulhos | Proteção do Futuro | Patro"
        headline="Proteção familiar e blindagem patrimonial em Guarulhos"
        subtitle="Cuidamos de quem você ama com soluções que garantem tranquilidade e estabilidade"
        icon="👨‍👩‍👧‍👦"
        metaDescription="Seguros para famílias em Guarulhos: vida, saúde, residencial e previdência. Garanta o futuro dos seus filhos com a consultoria da Patro Seguros."
        description="Para uma família em Guarulhos, a segurança financeira é a base da felicidade. O seguro familiar não é apenas sobre o agora, é sobre garantir que a educação dos filhos, a moradia e o padrão de vida sejam preservados, independentemente do que aconteça. Na Patro, ajudamos a construir essa rede de proteção."
        detailedDescription={`A vida familiar é dinâmica. O nascimento de um filho, a compra da casa própria ou o planejamento da faculdade exigem proteções específicas. O seguro de vida familiar, por exemplo, garante que o projeto de vida dos seus dependentes não seja interrompido.

Em Guarulhos, unificamos a proteção da sua família em um 'Combo Família' que integra o Plano de Saúde com os melhores hospitais da região, o Seguro Residencial para proteger o lar e o Seguro de Vida com coberturas para doenças graves e assistência funeral familiar. Tudo com a proximidade e o carinho de uma corretora local.`}
        coverages={[
          { title: "Seguro de Vida Familiar", description: "Indenização que garante o futuro financeiro de cônjuge e filhos, além de assistência funeral completa." },
          { title: "Plano de Saúde Familiar", description: "Rede credenciada em Guarulhos (Stella Maris, Carlos Chagas) com valores reduzidos para grupos familiares." },
          { title: "Seguro Residencial", description: "Proteção total da casa ou apartamento, incluindo assistência 24h para emergências domésticas." },
          { title: "Previdência Infantil", description: "Comece a planejar a faculdade ou o futuro dos seus filhos com investimentos seguros e rentáveis." },
          { title: "Seguro de Acidentes Pessoais", description: "Proteção extra para o lazer da família, viagens e deslocamentos diários." },
          { title: "Assistência Pet", description: "Cuidado para os membros de quatro patas da família, com consultas e exames veterinários inclusos." },
        ]}
        whoNeeds={[
          "Casais com filhos pequenos ou adolescentes",
          "Proprietários de imóveis familiares em Guarulhos",
          "Responsáveis pelo sustento financeiro da casa",
          "Famílias que cuidam de pais ou avós idosos",
          "Casais que estão planejando a chegada do primeiro filho",
          "Famílias que buscam otimizar o orçamento de seguros",
        ]}
        whyPatro={[
          "Consultoria sensível focada no planejamento de longo prazo",
          "Cálculo preciso do capital segurado ideal para a sua renda",
          "Integração de benefícios: saúde, vida e patrimônio",
          "Atendimento próximo e humanizado para momentos difíceis",
          "Especialistas em Seguro de Vida Resgatável para famílias",
        ]}
        pricingInfo={{
          intro: "Investir na segurança da família custa menos que uma assinatura de streaming. Exemplos:",
          factors: [
            "Seguro Residencial: a partir de R$ 20/mês",
            "Seguro Vida Familiar: a partir de R$ 50/mês (conforme capitais)",
            "Plano de Saúde (3 vidas): a partir de R$ 750/mês (total familiar)",
            "Previdência Infantil: aportes a partir de R$ 100/mês",
            "Assistência Funeral Familiar: inclusa em muitos planos de vida",
          ],
          note: "Consultoria gratuita para revisar seus seguros atuais e encontrar oportunidades de economia de até 30%.",
        }}
        faqs={[
          { question: "Qual a vantagem do Plano de Saúde Familiar em relação ao Individual?", answer: "Planos familiares costumam ter tabelas de preços entre 10% a 25% mais baratas que os individuais, além de unificar o pagamento em uma única fatura." },
          { question: "O Seguro de Vida cobre toda a família?", answer: "Sim, é possível contratar apólices com cobertura extensiva ao cônjuge e assistência funeral para filhos e pais, garantindo suporte completo em um único contrato." },
          { question: "Como funciona a Previdência Infantil?", answer: "É um plano de investimento focado no longo prazo. O valor acumulado pode ser usado para pagar a faculdade, o intercâmbio ou dar entrada no primeiro imóvel do seu filho." },
        ]}
        relatedInsurances={[
          { title: "Seguro de Vida", link: "/seguro-vida" },
          { title: "Planos de Saúde", link: "/planos-de-saude" },
          { title: "Seguro Residencial", link: "/seguro-residencial" },
          { title: "Previdência Privada", link: "/previdencia-privada" },
        ]}
        quoteUrl="/cotacao"
        canonicalUrl="https://www.patroseguros.com.br/seguro-familia"
      />
    </>
  );
};

export default SeguroFamilia;