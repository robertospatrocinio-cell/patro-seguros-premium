import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroOdonto = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Odontológico"
      subtitle="Cuide da saúde bucal da sua família com tranquilidade"
      icon="🦷"
      metaDescription="Plano Odontológico com ampla rede de dentistas. Consultas, limpeza, canal, ortodontia e implantes. Valores a partir de R$ 20/mês. Cotação grátis Patro Seguros."
      description="O Seguro Odontológico oferece acesso a consultas, procedimentos preventivos e tratamentos odontológicos com valores acessíveis."
      detailedDescription={`A saúde bucal é um dos pilares da saúde geral, mas tratamentos odontológicos particulares podem ser extremamente caros. Um tratamento de canal custa em média R$ 800 a R$ 1.500. Uma coroa de porcelana, R$ 1.500 a R$ 3.000. Ortodontia completa pode ultrapassar R$ 8.000. Implantes dentários: R$ 3.000 a R$ 6.000 cada.

Com um plano odontológico, você paga uma mensalidade acessível — muitas vezes a partir de R$ 20/mês — e tem acesso a consultas, procedimentos preventivos, tratamentos restauradores e, em planos mais completos, ortodontia e próteses. Uma simples limpeza semestral já paga o plano anual.

Na Patro Seguros, comparamos as melhores operadoras de planos odontológicos para encontrar o plano ideal para você, sua família ou seus funcionários. Analisamos rede credenciada na sua região, coberturas necessárias e o melhor custo-benefício.`}
      howItWorks={[
        { step: "1", title: "Análise de Necessidades", description: "Entendemos suas necessidades odontológicas: preventivo, restaurador, ortodontia, próteses ou implantes" },
        { step: "2", title: "Comparação de Planos", description: "Comparamos operadoras e planos, verificando rede credenciada próxima a você" },
        { step: "3", title: "Contratação Simples", description: "Contrate com documentação mínima e comece a usar após o período de carência" },
        { step: "4", title: "Cuidado Contínuo", description: "Acesse consultas e tratamentos na rede credenciada durante toda a vigência do plano" },
      ]}
      coverages={[
        { title: "Consultas Odontológicas", description: "Consultas de rotina e emergenciais com dentistas" },
        { title: "Procedimentos Preventivos", description: "Limpeza, aplicação de flúor e orientação de higiene" },
        { title: "Tratamentos de Canal", description: "Endodontia completa para salvar dentes comprometidos" },
        { title: "Restaurações", description: "Tratamento de cáries e recuperação de dentes" },
        { title: "Periodontia", description: "Tratamento de gengivas e doenças periodontais" },
        { title: "Cirurgias Odontológicas", description: "Extração de dentes, incluindo sisos" },
        { title: "Ortodontia", description: "Aparelhos dentários (conforme plano)" },
        { title: "Próteses e Implantes", description: "Recuperação total da dentição (conforme plano)" },
      ]}
      coverageExclusions={[
        "Procedimentos exclusivamente estéticos (clareamento dental em muitos planos)",
        "Implantes e próteses (apenas em planos com cobertura específica)",
        "Tratamentos experimentais ou não reconhecidos pela ANS",
        "Procedimentos realizados fora da rede credenciada (sem reembolso na maioria)",
        "Materiais especiais não listados no rol de coberturas",
      ]}
      pricingInfo={{
        intro: "Planos odontológicos são os mais acessíveis do mercado de saúde suplementar.",
        factors: [
          "Tipo de cobertura (básico, completo, com ortodontia, com próteses)",
          "Operadora e rede credenciada",
          "Número de beneficiários",
          "Individual, familiar ou empresarial",
          "Com ou sem coparticipação",
          "Região de atendimento",
        ],
        note: "Planos básicos: R$ 20 a R$ 50/mês por pessoa. Com ortodontia: R$ 60 a R$ 150/mês. Com próteses e implantes: R$ 100 a R$ 300/mês. Planos empresariais costumam ser 30% mais baratos que individuais.",
      }}
      realScenarios={[
        { title: "Economia com canal e coroa", description: "Um segurado precisou de tratamento de canal e coroa de porcelana. Particular: R$ 3.500. Com o plano odontológico de R$ 45/mês: zero custo adicional. Economia total de R$ 2.960 no primeiro ano." },
        { title: "Ortodontia para adolescente", description: "Uma família contratou plano com ortodontia para a filha de 14 anos. O tratamento particular custaria R$ 8.000. Com o plano de R$ 80/mês, pagaram apenas R$ 960 no ano — economia de R$ 7.040." },
        { title: "Emergência com extração de siso", description: "Extração de 4 sisos inclusos em hospital: custo particular de R$ 4.000 a R$ 6.000. Com plano odontológico, coberto integralmente, sem desembolso adicional." },
      ]}
      importantDetails={[
        { title: "Carências típicas", content: "Urgências: 24 horas. Procedimentos preventivos: 30 a 60 dias. Tratamentos restauradores: 90 a 180 dias. Ortodontia: 6 a 12 meses. Existem planos sem carência para procedimentos básicos." },
        { title: "Rede credenciada", content: "A qualidade do plano depende da rede credenciada disponível na sua região. Verificamos previamente se há dentistas e clínicas próximos ao seu endereço antes de recomendar um plano." },
        { title: "Ortodontia e cobertura", content: "Nem todos os planos cobrem ortodontia (aparelho). É o procedimento mais procurado e precisa ser contratado especificamente. Verifique se o plano inclui manutenção mensal e documentação ortodôntica." },
      ]}
      tips={[
        "Mesmo que não precise de tratamento agora, um plano odontológico preventivo evita problemas futuros e sai mais barato que pagar particular",
        "Se precisa de ortodontia, confirme que o plano cobre manutenção mensal — não apenas a instalação do aparelho",
        "Planos empresariais (mesmo MEI com 2 vidas) costumam ser mais baratos que individuais — consulte essa opção",
        "Faça limpeza profissional a cada 6 meses — a prevenção evita tratamentos caros no futuro",
        "Verifique a rede credenciada perto de casa e do trabalho antes de contratar",
      ]}
      whoNeeds={[
        "Famílias que querem cuidar da saúde bucal preventivamente",
        "Pessoas que precisam de tratamentos odontológicos regulares",
        "Quem busca economia em procedimentos dentários",
        "Pais que querem acompanhamento ortodôntico para filhos",
        "Idosos que necessitam de próteses e manutenção",
        "Profissionais que querem manter sorriso saudável",
      ]}
      whyPatro={[
        "Planos individuais, familiares e empresariais",
        "Comparação entre operadoras e coberturas",
        "Verificação de rede credenciada próxima a você",
        "Planos com e sem carência para urgências",
        "Orientação sobre ortodontia e procedimentos estéticos",
        "Valores acessíveis com pagamento facilitado",
      ]}
      faqs={[
        { question: "Quanto custa um plano odontológico?", answer: "Planos básicos a partir de R$ 20/mês. Com ortodontia: R$ 60 a R$ 150/mês. Com próteses: R$ 100 a R$ 300/mês." },
        { question: "Tem carência?", answer: "Urgências: 24h. Procedimentos simples: 30 a 90 dias. Ortodontia: 6 a 12 meses. Existem planos com carência reduzida." },
        { question: "Cobre aparelho ortodôntico?", answer: "Alguns planos cobrem ortodontia parcial ou totalmente. Analisamos as opções conforme sua necessidade." },
        { question: "Posso escolher o dentista?", answer: "Você escolhe entre os dentistas da rede credenciada. Verificamos quais profissionais atendem na sua região." },
        { question: "Vale a pena contratar?", answer: "Sim! Uma simples limpeza semestral mais uma restauração já paga o plano anual. Tratamentos maiores geram economia muito significativa." },
      ]}
      relatedInsurances={[
        { title: "Seguro Saúde", link: "/seguro-saude" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
      ]}
    />
  );
};

export default SeguroOdonto;
