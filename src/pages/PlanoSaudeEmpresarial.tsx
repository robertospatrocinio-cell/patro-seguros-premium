import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-saude.webp";

const PlanoSaudeEmpresarial = () => {
  return (
    <InsurancePageTemplate
      title="Plano de Saúde Empresarial"
      subtitle="Cuide dos seus colaboradores com os melhores planos de saúde corporativos"
      icon="🏢"
      metaDescription="Plano de Saúde Empresarial para PMEs e grandes empresas. Compare Bradesco, Amil, SulAmérica, Porto Saúde e mais. Cotação grátis com a Patro Seguros em Guarulhos."
      description="O Plano de Saúde Empresarial é a melhor forma de oferecer assistência médica de qualidade para seus colaboradores, com valores significativamente menores que planos individuais. A partir de 2 vidas (incluindo MEI), sua empresa já pode contratar um plano corporativo com ampla cobertura."
      detailedDescription={`O plano de saúde é o benefício mais valorizado pelos colaboradores brasileiros. Empresas que oferecem assistência médica têm menor rotatividade, maior produtividade e conseguem atrair os melhores talentos do mercado.

Os planos empresariais são, em média, 30% a 50% mais baratos que os individuais, pois o risco é diluído entre todos os beneficiários do grupo. Além disso, empresas podem deduzir os custos do plano de saúde do Imposto de Renda (Lucro Real), gerando economia tributária.

A Patro Seguros compara planos de todas as principais operadoras — Bradesco Saúde, Amil, SulAmérica, Porto Saúde, HapVida/NotreDame Intermédica, Prevent Senior, entre outras — para encontrar a melhor relação custo-benefício para o porte e perfil da sua empresa. Nossa consultoria é gratuita: não cobramos nada adicional do cliente.

Atendemos desde microempreendedores individuais (MEI) com 2 beneficiários até grandes corporações com milhares de vidas. Cada empresa tem necessidades específicas, e nosso papel é encontrar o plano ideal para cada uma delas.`}
      howItWorks={[
        { step: "1", title: "Análise da Empresa", description: "Mapeamos o perfil dos colaboradores: quantidade, faixas etárias, localização e necessidades específicas de saúde" },
        { step: "2", title: "Cotação Multioperadora", description: "Comparamos planos de diversas operadoras, analisando rede credenciada, coberturas, carências e preços para o seu CNPJ" },
        { step: "3", title: "Proposta Personalizada", description: "Apresentamos as melhores opções com análise detalhada de custo-benefício, incluindo simulações com e sem coparticipação" },
        { step: "4", title: "Implantação e Gestão", description: "Cuidamos de toda a implantação, inclusão de vidas e oferecemos suporte contínuo na gestão do benefício" },
      ]}
      coverages={[
        { title: "Consultas e Especialistas", description: "Acesso a clínicos gerais e mais de 30 especialidades médicas" },
        { title: "Exames e Diagnósticos", description: "Exames laboratoriais, de imagem, endoscopia, ressonância e mais" },
        { title: "Internações e Cirurgias", description: "Cobertura completa para internações clínicas e procedimentos cirúrgicos" },
        { title: "Urgência e Emergência", description: "Pronto-socorro 24h com carência de apenas 24 horas" },
        { title: "Telemedicina", description: "Consultas online disponíveis em diversas operadoras" },
        { title: "Programas de Prevenção", description: "Check-ups, vacinação e programas de qualidade de vida" },
        { title: "Saúde Mental", description: "Consultas com psicólogos e psiquiatras incluídas" },
        { title: "Obstetrícia (opcional)", description: "Pré-natal, parto e acompanhamento pós-parto para colaboradoras" },
      ]}
      coverageExclusions={[
        "Procedimentos estéticos sem indicação médica",
        "Tratamentos experimentais não aprovados pela ANS",
        "Internação em acomodação superior à contratada",
        "Medicamentos de uso domiciliar (salvo exceções)",
        "Procedimentos não listados no Rol da ANS",
        "Tratamentos no exterior (salvo planos específicos)",
      ]}
      pricingInfo={{
        intro: "O valor do plano empresarial depende do número de vidas, faixa etária média, tipo de acomodação e operadora escolhida.",
        factors: [
          "Número de beneficiários (quanto mais vidas, menor o custo per capita)",
          "Faixa etária média dos colaboradores e dependentes",
          "Tipo de acomodação: enfermaria ou apartamento",
          "Abrangência: regional ou nacional",
          "Com ou sem coparticipação",
          "Sinistralidade do grupo (para renovações)",
        ],
        note: "Planos empresariais a partir de 2 vidas podem custar de R$ 200 a R$ 1.200/mês por beneficiário. PMEs com perfil jovem conseguem planos a partir de R$ 250/pessoa. Empresas com mais de 30 vidas geralmente obtêm condições ainda mais competitivas.",
      }}
      realScenarios={[
        { title: "Startup com 15 colaboradores", description: "Uma startup de tecnologia em Guarulhos contratou plano Amil com coparticipação para 15 funcionários jovens (média 28 anos). O custo ficou em R$ 280/pessoa — 45% mais barato que planos individuais equivalentes." },
        { title: "Comércio com 50 funcionários", description: "Uma rede de lojas contratou plano Bradesco Saúde enfermaria nacional para 50 colaboradores + dependentes (120 vidas). Negociamos desconto adicional de 12% sobre a tabela, gerando economia de R$ 18.000/ano." },
        { title: "MEI com família", description: "Um microempreendedor individual incluiu esposa e filho no plano empresarial. O custo total para 3 pessoas ficou em R$ 890/mês — muito abaixo dos R$ 1.800 que pagaria em planos individuais." },
      ]}
      importantDetails={[
        { title: "Carências reduzidas ou isentas", content: "Planos empresariais com mais de 30 vidas geralmente têm isenção total de carências. Para grupos menores, as carências seguem regras da ANS, mas podem ser negociadas dependendo da operadora." },
        { title: "Reajustes anuais", content: "Diferente dos planos individuais (reajuste definido pela ANS), planos empresariais são reajustados conforme a sinistralidade do grupo. Empresas com baixo uso pagam reajustes menores. Monitoramos e negociamos os reajustes para nossos clientes." },
        { title: "Benefício fiscal", content: "Empresas no regime de Lucro Real podem deduzir integralmente os gastos com plano de saúde do Imposto de Renda. No Simples Nacional e Lucro Presumido, o custo entra como despesa operacional." },
        { title: "Inclusão e exclusão de vidas", content: "Colaboradores podem ser incluídos ou excluídos a qualquer momento durante a vigência do contrato. Dependentes (cônjuge, filhos e pais) também podem ser adicionados." },
      ]}
      tips={[
        "Compare pelo menos 3 operadoras antes de decidir — preço não é tudo, avalie a rede credenciada na região dos colaboradores",
        "Considere plano com coparticipação para reduzir a mensalidade em até 40%",
        "Negocie a inclusão de dependentes com desconto — muitas operadoras oferecem condições especiais",
        "Avalie a telemedicina como complemento — reduz absenteísmo e custos com consultas presenciais",
        "Monitore a sinistralidade do grupo para evitar reajustes abusivos na renovação",
        "Empresas com mais de 30 vidas devem exigir isenção total de carências",
        "MEIs podem contratar plano empresarial a partir de 2 beneficiários — aproveite essa vantagem",
      ]}
      whoNeeds={[
        "PMEs que querem atrair e reter talentos",
        "Empresas que buscam reduzir absenteísmo e afastamentos",
        "MEIs e autônomos que querem plano mais barato que individual",
        "Empresas com obrigação convencional de oferecer plano de saúde",
        "Startups que precisam de benefícios competitivos",
        "Indústrias e comércios com alto número de colaboradores",
      ]}
      whyPatro={[
        "Cotação simultânea com múltiplas operadoras",
        "Análise comparativa de custo-benefício personalizada",
        "Negociação de descontos e condições especiais",
        "Implantação completa sem burocracia",
        "Gestão contínua do benefício e suporte ao RH",
        "Acompanhamento nos reajustes e renovações",
      ]}
      faqs={[
        { question: "Quantas pessoas preciso para contratar plano empresarial?", answer: "A partir de 2 beneficiários (incluindo o titular MEI ou sócio). Para grupos com menos de 30 vidas, pode haver carências. Acima de 30 vidas, geralmente há isenção total de carências." },
        { question: "Plano empresarial é realmente mais barato que individual?", answer: "Sim, significativamente. Planos empresariais custam em média 30% a 50% menos que individuais equivalentes, pois o risco é diluído entre todos os beneficiários do grupo." },
        { question: "Posso incluir dependentes dos colaboradores?", answer: "Sim! É possível incluir cônjuge, filhos, pais e dependentes legais. Muitas operadoras oferecem condições especiais para dependentes em planos empresariais." },
        { question: "Como funciona a coparticipação?", answer: "Na coparticipação, a empresa paga uma mensalidade menor e o colaborador paga um valor por cada utilização (consulta, exame, etc.). É uma forma de reduzir o custo mensal em até 40%." },
        { question: "O que acontece quando um colaborador é desligado?", answer: "O colaborador demitido sem justa causa tem direito a manter o plano por 1/3 do tempo de contribuição (mínimo 6 meses, máximo 24 meses), pagando integralmente. Aposentados têm direito vitalício se contribuíram por mais de 10 anos." },
        { question: "A empresa pode deduzir o plano de saúde do imposto?", answer: "Sim, empresas no Lucro Real podem deduzir integralmente. No Simples Nacional e Lucro Presumido, o gasto entra como despesa operacional, reduzindo a base de cálculo." },
      ]}
      relatedInsurances={[
        { title: "Planos de Saúde", link: "/planos-de-saude" },
        { title: "Seguro Vida PME", link: "/seguro-vida-pme" },
        { title: "Seguro Odonto", link: "/seguro-odonto" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default PlanoSaudeEmpresarial;
