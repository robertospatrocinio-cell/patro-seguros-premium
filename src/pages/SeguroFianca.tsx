import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroFianca = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Fiança Locatícia"
      subtitle="Alugue seu imóvel sem fiador e sem burocracia"
      icon="🔑"
      metaDescription="Seguro Fiança Locatícia — alugue sem fiador e sem caução. Aprovação rápida para imóveis residenciais e comerciais. Cotação grátis Patro Seguros."
      description="O Seguro Fiança Locatícia substitui a necessidade de fiador ou caução em contratos de aluguel. É a forma mais moderna e segura de garantir o cumprimento das obrigações locatícias."
      detailedDescription={`Encontrar um fiador é uma das maiores dores de cabeça na hora de alugar um imóvel. Pedir para um amigo ou familiar colocar o patrimônio em risco é constrangedor e cada vez mais difícil. A caução, por sua vez, imobiliza 3 aluguéis que poderiam ser usados para mobiliar o imóvel ou investir.

O Seguro Fiança Locatícia resolve ambos os problemas: substitui o fiador e a caução de forma moderna, rápida e aceita pela maioria das imobiliárias. Para o proprietário, é ainda melhor que fiador: a seguradora garante o pagamento de aluguéis atrasados, encargos, danos ao imóvel e até custos de despejo.

Na prática, o inquilino paga o equivalente a cerca de 1 aluguel por ano (parcelável) e elimina toda a burocracia. A aprovação pode sair em poucas horas, acelerando o processo de locação.

Na Patro Seguros, trabalhamos com múltiplas seguradoras para encontrar a aprovação mais rápida e as melhores condições para cada perfil — inclusive autônomos, MEIs e profissionais liberais.`}
      howItWorks={[
        { step: "1", title: "Análise de Crédito", description: "Enviamos seus dados para análise de crédito em múltiplas seguradoras simultaneamente" },
        { step: "2", title: "Aprovação Rápida", description: "Em muitos casos, a aprovação sai em até 24 horas — algumas seguradoras aprovam em horas" },
        { step: "3", title: "Emissão da Apólice", description: "Após aprovação, emitimos a apólice e o certificado que substitui o fiador no contrato de locação" },
        { step: "4", title: "Proteção Durante a Locação", description: "A cobertura vale por toda a vigência do contrato, com renovação automática anual" },
      ]}
      coverages={[
        { title: "Aluguel em Atraso", description: "Pagamento dos aluguéis não pagos pelo inquilino" },
        { title: "Encargos Locatícios", description: "Cobertura de IPTU, condomínio e taxas relacionadas" },
        { title: "Danos ao Imóvel", description: "Cobertura para reparos de danos causados pelo locatário" },
        { title: "Multa Contratual", description: "Pagamento de multas por quebra de contrato" },
        { title: "Despesas Judiciais", description: "Cobertura de custos com ações de despejo" },
        { title: "Pintura Interna", description: "Cobertura para repintura ao final do contrato" },
      ]}
      coverageExclusions={[
        "Danos preexistentes ao início da locação (anteriores à vistoria)",
        "Desgaste natural do imóvel pelo uso normal",
        "Modificações estruturais não autorizadas pelo proprietário",
        "Inadimplência anterior ao início da vigência do seguro",
        "Aluguéis e encargos vencidos antes da contratação",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro Fiança equivale a aproximadamente 1 a 1,5 aluguel por ano, muito mais vantajoso que a caução.",
        factors: [
          "Valor do aluguel mensal",
          "Perfil de crédito do locatário (score)",
          "Renda comprovada vs valor do aluguel",
          "Tipo de imóvel (residencial ou comercial)",
          "Coberturas escolhidas (aluguel, encargos, danos, etc.)",
          "Pessoa física ou jurídica",
        ],
        note: "Para um aluguel de R$ 2.000/mês, o seguro fiança custa aproximadamente R$ 2.000 a R$ 3.000/ano (parcelável em até 12x). Muito melhor que imobilizar R$ 6.000 em caução ou pedir favor a alguém como fiador.",
      }}
      realScenarios={[
        { title: "Inquilino perdeu emprego", description: "Um inquilino perdeu o emprego e atrasou 4 meses de aluguel. O seguro fiança pagou ao proprietário R$ 10.000 em aluguéis e R$ 3.000 em condomínio atrasados, enquanto o processo de rescisão era conduzido." },
        { title: "Danos ao imóvel na saída", description: "Ao desocupar, o inquilino deixou paredes danificadas, piso riscado e banheiro com problemas. O seguro cobriu R$ 8.500 em reparos para devolução nas condições originais." },
        { title: "Aprovação para autônomo", description: "Um profissional liberal sem comprovante de renda formal (CLT) conseguiu aprovação em seguro fiança com comprovação de renda por extratos bancários. A Patro encontrou a seguradora adequada ao perfil." },
      ]}
      importantDetails={[
        { title: "Mais barato que caução", content: "A caução exige depósito de 3 aluguéis (R$ 6.000 para aluguel de R$ 2.000). O seguro fiança custa cerca de 1 aluguel/ano e ainda oferece coberturas muito mais amplas para o proprietário." },
        { title: "Renovação automática", content: "O seguro fiança renova automaticamente junto com o contrato de locação. Basta manter os pagamentos em dia para a cobertura continuar vigente." },
        { title: "Aceito pela maioria das imobiliárias", content: "O seguro fiança é amplamente aceito como garantia locatícia. Em caso de dúvida, verificamos previamente com a imobiliária antes da contratação." },
      ]}
      tips={[
        "Inicie a análise de crédito assim que encontrar o imóvel — a aprovação rápida garante que você não perca a oportunidade",
        "Se é autônomo ou MEI, prepare extratos bancários dos últimos 3 meses e declaração de IR como comprovante de renda",
        "Compare o custo do seguro fiança com a caução: além de mais barato, o seguro oferece coberturas adicionais ao proprietário",
        "Proprietários: exijam seguro fiança em vez de fiador — a cobertura é mais ampla e a seguradora paga mesmo que o inquilino não tenha bens",
        "Parcele o seguro em até 12x no cartão para diluir o custo ao longo do ano",
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
        { question: "Quanto custa o seguro fiança?", answer: "Normalmente equivale a cerca de 1 a 1,5 aluguel por ano, parcelável em até 12x. Muito mais vantajoso que caução." },
        { question: "Quem paga o seguro fiança?", answer: "Geralmente é o inquilino, mas pode ser negociado entre as partes." },
        { question: "Preciso ter renda comprovada?", answer: "Sim, as seguradoras exigem comprovação. Aceitamos CLT, autônomos, MEIs e profissionais liberais." },
        { question: "O seguro cobre todo o período do contrato?", answer: "Sim, a cobertura vale por toda a vigência do contrato de locação, com renovação anual." },
        { question: "É aceito por todas as imobiliárias?", answer: "A grande maioria aceita. Verificamos previamente se há alguma restrição específica." },
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
