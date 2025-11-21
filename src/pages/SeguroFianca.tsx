import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroFianca = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Fiança Locatícia"
      subtitle="Alugue seu imóvel sem fiador e sem burocracia"
      icon="🔑"
      description="O Seguro Fiança Locatícia substitui a necessidade de fiador ou caução em contratos de aluguel. É a forma mais moderna, rápida e segura de garantir o cumprimento das obrigações locatícias. Para o locatário, elimina a necessidade de pedir favor a amigos ou familiares. Para o proprietário, garante proteção financeira. Com a Patro Seguros, você contrata de forma ágil e com as melhores condições."
      coverages={[
        {
          title: "Aluguel em Atraso",
          description: "Pagamento dos aluguéis não pagos pelo inquilino",
        },
        {
          title: "Encargos Locatícios",
          description: "Cobertura de IPTU, condomínio e taxas relacionadas",
        },
        {
          title: "Danos ao Imóvel",
          description: "Cobertura para reparos de danos causados pelo locatário",
        },
        {
          title: "Multa Contratual",
          description: "Pagamento de multas por quebra de contrato",
        },
        {
          title: "Despesas Judiciais",
          description: "Cobertura de custos com ações de despejo",
        },
        {
          title: "Pintura Interna",
          description: "Cobertura para repintura ao final do contrato",
        },
      ]}
      whoNeeds={[
        "Inquilinos que não têm fiador disponível",
        "Pessoas que não querem comprometer conhecidos como fiadores",
        "Proprietários que querem garantia sólida sem depender de terceiros",
        "Imobiliárias que buscam agilidade na locação",
        "Quem prefere não imobilizar capital em caução",
        "Locatários e locadores que querem segurança jurídica",
      ]}
      whyPatro={[
        "Aprovação rápida (muitas vezes em 24h)",
        "Menos burocracia do que fiador tradicional",
        "Valores competitivos e parcelamento facilitado",
        "Orientação completa sobre documentação necessária",
        "Suporte em caso de sinistro tanto para locador quanto locatário",
        "Parceria com seguradoras especializadas em fiança",
      ]}
      faqs={[
        {
          question: "Quanto custa o seguro fiança?",
          answer: "Normalmente equivale a cerca de um aluguel por ano. O valor varia conforme o perfil do locatário e valor do aluguel. É mais barato que caução e não compromete capital.",
        },
        {
          question: "Quem paga o seguro fiança?",
          answer: "Geralmente é o inquilino, mas pode ser negociado entre as partes. É muito mais vantajoso do que imobilizar 3 aluguéis em caução.",
        },
        {
          question: "Preciso ter renda comprovada?",
          answer: "Sim, as seguradoras exigem comprovação de renda. Analisamos cada caso para encontrar a seguradora mais adequada ao seu perfil.",
        },
        {
          question: "O seguro cobre todo o período do contrato?",
          answer: "Sim, a cobertura vale por toda a vigência do contrato de locação, sendo renovada anualmente.",
        },
        {
          question: "É aceito por todas as imobiliárias?",
          answer: "A grande maioria das imobiliárias aceita. Verificamos previamente se há alguma restrição específica.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Seguro Condomínio", link: "/seguro-condominio" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default SeguroFianca;
