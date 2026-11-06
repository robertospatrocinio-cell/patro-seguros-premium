import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-plano-pet.webp";
import PetPlanConversion from "@/components/PetPlanConversion";

const PlanoPet = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Plano Pet (Petlove)"
      headline="Plano Petlove: cuidado para seu cão ou gato, com orientação para escolher"
      subtitle="Compare as opções com a Patro Seguros. Confira mensalidade, rede veterinária perto de você, carências e possíveis coparticipações antes de decidir."
      quoteCtaText="Ver opções para meu pet"
      quoteAnchor="#opcoes-plano-pet"
      afterHeroContent={<PetPlanConversion />}
      semGuarulhos
      jumpLinks={[
        { label: "Ver opções para meu pet", href: "#pet-opcoes-heading" },
        { label: "O que pode cobrir", href: "#coberturas-heading" },
        { label: "Quanto custa", href: "#preco-heading" },
        { label: "Tire suas dúvidas", href: "#faq-heading" },
      ]}
      icon="🐶"
      metaDescription="Plano Pet Petlove: plano de saúde para cães e gatos com consultas, exames e cirurgias. Cotação grátis na Patro Seguros, corretora parceira da Petlove."
      description="Seu pet faz parte da família. Um plano de saúde pode ajudar a organizar os cuidados veterinários, desde consultas de rotina até procedimentos previstos na opção contratada. A Patro Seguros ajuda você a comparar os planos Petlove e entender as condições antes de contratar."
      detailedDescription={`Para escolher um plano pet, comece pela rotina do seu cão ou gato: idade, cuidados que costuma precisar e clínicas onde você gostaria de ser atendido. Um plano focado em consultas não deve ser comparado com outro que também prevê cirurgias e internação olhando apenas a mensalidade.

Na rede credenciada, o atendimento segue as regras da opção contratada. Verifique os procedimentos incluídos, as carências, os limites de utilização e se existe coparticipação. Uma mensalidade não significa que todos os atendimentos estejam liberados ou que não haja outros valores a pagar.

A Patro Seguros é parceira da Petlove e oferece orientação para essa escolha. Conte sobre seu pet e a cidade onde precisa de atendimento: a equipe ajuda a conferir as opções, esclarecer as diferenças e avaliar o que faz sentido para você.`}
      howItWorks={[
        { step: "1", title: "Conte sobre seu pet", description: "Comece com seu nome e WhatsApp. Se quiser, informe a espécie, a idade e a cidade de atendimento nos detalhes opcionais." },
        { step: "2", title: "Compare as opções", description: "A Patro orienta sobre mensalidades, coberturas e possíveis coparticipações. Confira também se as clínicas de interesse atendem à opção escolhida." },
        { step: "3", title: "Entenda as condições", description: "Antes de contratar, verifique carências por procedimento, limites de uso, regras de aceitação e cuidados já necessários ao pet." },
        { step: "4", title: "Contrate e planeje os cuidados", description: "Após a contratação, utilize a rede conforme a vigência, as carências e as regras do plano. O pedido de cotação não inicia a cobertura." },
      ]}
      coverages={[
        { title: "Consultas Veterinárias", description: "Confira consultas com clínicos gerais e a disponibilidade de especialidades na rede da opção escolhida. Verifique limites e coparticipações." },
        { title: "Exames e Diagnósticos", description: "Compare quais exames estão incluídos, dos laboratoriais aos de imagem. Exames mais complexos podem ter regras e carências específicas." },
        { title: "Cirurgias", description: "Verifique quais cirurgias eletivas ou de urgência estão previstas, os limites e a necessidade de autorização. Nem toda opção inclui esses procedimentos." },
        { title: "Internação", description: "Confira se há internação, quais serviços estão incluídos e os limites de utilização. Medicamentos e outros itens devem ser conferidos nas condições do plano." },
        { title: "Urgência e Emergência", description: "Consulte os estabelecimentos disponíveis, horários e regras de atendimento. A contratação não garante atendimento imediato ou dispensa de carência." },
        { title: "Cuidados Preventivos", description: "Veja se a opção inclui vacinas e outros cuidados preventivos. Confira os procedimentos previstos e a frequência permitida." },
        { title: "Fisioterapia e Reabilitação", description: "Para pets que precisam de recuperação ou cuidados locomotores, verifique disponibilidade, indicação e limites de sessões." },
        { title: "Orientação Veterinária Online", description: "Confira a disponibilidade e o escopo do atendimento remoto. A orientação online não substitui atendimento presencial em situações de emergência." },
      ]}
      coverageExclusions={[
        "Procedimentos não previstos na opção contratada",
        "Atendimentos antes do cumprimento das carências aplicáveis",
        "Serviços fora da rede ou sem as autorizações exigidas, conforme as regras do plano",
        "Utilizações acima dos limites ou frequências previstos",
        "Condições anteriores à contratação, quando sujeitas a restrições nas condições do plano",
      ]}
      pricingInfo={{
        intro: "O valor precisa ser consultado para a opção disponível ao seu pet e à sua região. Compare o custo mensal junto com o que poderá usar, não apenas o menor preço anunciado.",
        factors: [
          "Opção escolhida e procedimentos incluídos",
          "Dados do pet e regras de aceitação aplicáveis",
          "Cidade e rede disponível para atendimento",
          "Possíveis coparticipações por procedimento",
          "Limites e frequência de utilização",
          "Carências e condições vigentes na contratação",
        ],
        note: "Solicite os valores atuais à Patro. A equipe ajuda a entender a mensalidade e os possíveis custos de utilização antes de você decidir. Não há promessa de economia ou de cobertura integral de qualquer tratamento.",
      }}
      realScenarios={[
        { title: "Seu pet precisa de acompanhamento de rotina", description: "Ao comparar as opções, confira consultas, exames e cuidados preventivos. Observe a rede próxima e a frequência permitida para planejar os atendimentos." },
        { title: "Você quer se preparar para procedimentos mais complexos", description: "Verifique a inclusão de cirurgias e internação, os limites, as autorizações e as carências. Uma opção básica pode não contemplar esses cuidados." },
        { title: "Seu pet já está em tratamento", description: "Converse com a equipe sobre as regras para condições anteriores à contratação. Não presuma que um tratamento em andamento ficará coberto ao aderir ao plano. Em uma emergência, procure atendimento veterinário sem esperar a cotação." },
      ]}
      importantDetails={[
        { title: "Plano Pet é igual a seguro pet?", content: "Não necessariamente. No plano, o uso costuma ocorrer na rede credenciada, seguindo as condições contratadas. Produtos de seguro ou assistência podem ter outras formas de atendimento ou reembolso. Compare o funcionamento real da proposta, não apenas o nome do produto." },
        { title: "A mensalidade cobre todos os gastos?", content: "Não presuma que sim. Verifique possíveis coparticipações, procedimentos não incluídos e limites. Peça essas informações antes de contratar para entender o custo de usar o plano, além da mensalidade." },
        { title: "Quando posso começar a usar?", content: "Cada procedimento pode ter uma carência. Confirme os prazos na proposta e a data de início da vigência. O envio do formulário é apenas uma solicitação de contato e não libera consultas ou procedimentos." },
      ]}
      tips={[
        "Confira as clínicas de interesse e os serviços disponíveis para a opção escolhida",
        "Compare mensalidade e possíveis coparticipações em conjunto",
        "Pergunte pelas carências dos procedimentos que pretende utilizar",
        "Informe corretamente o histórico do pet na etapa indicada pela equipe",
        "Guarde a proposta e consulte os limites e regras antes de agendar um procedimento",
      ]}
      whoNeeds={[
        "Tutores de cães e gatos que querem planejar os cuidados veterinários",
        "Quem procura orientação para comparar opções e coberturas",
        "Famílias que querem verificar uma rede de atendimento perto de casa",
        "Tutores de pets idosos que precisam conferir aceitação e regras específicas",
        "Quem deseja avaliar cuidados de rotina e procedimentos mais complexos separadamente",
      ]}
      whyPatro={[
        "Parceria com a Petlove e orientação sobre as opções disponíveis",
        "Ajuda para comparar coberturas, carências e condições de utilização",
        "Conferência da rede de interesse antes da escolha",
        "Atendimento humano para esclarecer dúvidas antes de contratar",
        "Orientação para considerar as necessidades do pet e o orçamento da família",
      ]}
      faqs={[
        { question: "Quanto custa o Plano Petlove para meu pet?", answer: "Solicite os valores atuais informando seu contato e, se possível, a espécie, a idade e a cidade de atendimento. A Patro ajuda a conferir as opções disponíveis e a comparar mensalidade, possíveis coparticipações e procedimentos incluídos. O pedido não representa contratação." },
        { question: "Como saber se há uma clínica perto de mim?", answer: "Informe sua cidade e as clínicas ou hospitais de interesse à equipe. Confira a rede específica da opção antes de contratar: a presença de um estabelecimento na rede não significa que todos os serviços estejam disponíveis em todos os planos." },
        { question: "Vou pagar algo além da mensalidade?", answer: "Pode haver coparticipação ou cobrança por itens e procedimentos não incluídos. Peça a relação de valores, limites e condições de utilização da opção escolhida. Não considere o atendimento automaticamente sem custo adicional." },
        { question: "O plano cobre consultas, exames e cirurgias?", answer: "Esses cuidados podem estar disponíveis conforme a opção, mas não são iguais em todos os planos. Confira os procedimentos incluídos, a rede habilitada, as carências, as autorizações e os limites antes de contratar." },
        { question: "Posso usar o plano assim que pedir a cotação?", answer: "Não. Solicitar uma cotação não contrata o plano nem inicia a cobertura. Após a contratação, é preciso observar a vigência e as carências de cada procedimento. Se seu pet está em emergência, procure atendimento veterinário imediatamente, sem aguardar a cotação." },
        { question: "Posso contratar para um gato ou pet idoso?", answer: "Há opções voltadas a cães e gatos. Para pets idosos ou com condições anteriores, a equipe precisa conferir as regras de aceitação e utilização aplicáveis. Não há garantia de aceitação nem de cobertura de um tratamento já necessário." },
        { question: "O que acontece depois de enviar meu contato?", answer: "A equipe da Patro conversa com você sobre o pet e a região de atendimento, verifica as opções e explica as condições. Você avalia a proposta antes de decidir. Também pode tirar suas dúvidas pelo WhatsApp disponível nesta página." },
      ]}
      relatedInsurances={[
        { title: "Planos de Saúde", link: "/planos-de-saude" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "RC Veterinários", link: "/seguro-rc-veterinarios" },
      ]}
    />
  );
};

export default PlanoPet;
