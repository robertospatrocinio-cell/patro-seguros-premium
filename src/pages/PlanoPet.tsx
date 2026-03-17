import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-plano-pet.webp";

const PlanoPet = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Plano Pet (Petlove)"
      subtitle="Plano de saúde para cães e gatos com a maior plataforma pet do Brasil"
      icon="🐶"
      metaDescription="Plano Pet Petlove — plano de saúde para cães e gatos com consultas, exames, cirurgias e emergências. Cotação grátis na Patro Seguros, corretora parceira Petlove."
      description="O Plano Pet da Petlove é a forma mais inteligente de cuidar da saúde do seu cão ou gato sem sustos financeiros. Com cobertura para consultas, exames, cirurgias, internações e emergências 24h, o plano garante acesso à melhor medicina veterinária com mensalidades acessíveis. A Patro Seguros é parceira Petlove e oferece as melhores condições."
      detailedDescription={`O Brasil tem mais de 149 milhões de animais de estimação — o terceiro maior mercado pet do mundo. Cães e gatos são verdadeiros membros da família, mas os custos veterinários podem pegar os tutores de surpresa: uma cirurgia de emergência pode custar de R$ 3.000 a R$ 15.000, e tratamentos oncológicos ultrapassam facilmente R$ 20.000.

O Plano Pet da Petlove funciona como um plano de saúde humano: você paga uma mensalidade fixa e tem acesso a consultas, exames, cirurgias e internações em clínicas e hospitais veterinários credenciados em todo o Brasil.

A Petlove é a maior plataforma pet da América Latina, com mais de 6.000 clínicas e hospitais veterinários credenciados. A Patro Seguros é parceira da Petlove e oferece atendimento consultivo para ajudar você a escolher o plano ideal para o seu pet — considerando raça, idade, histórico de saúde e orçamento.`}
      howItWorks={[
        { step: "1", title: "Escolha do Plano", description: "A Patro Seguros apresenta as opções de plano da Petlove e orienta sobre qual é o mais adequado para o perfil, idade e raça do seu pet." },
        { step: "2", title: "Cadastro do Pet", description: "Informações básicas do animal: nome, raça, idade, peso e condições pré-existentes. Alguns planos exigem avaliação veterinária inicial." },
        { step: "3", title: "Carência", description: "Após a contratação, há períodos de carência que variam por tipo de procedimento — consultas têm carência menor, cirurgias eletivas carência maior." },
        { step: "4", title: "Utilização", description: "Agende consultas e procedimentos na rede credenciada Petlove (mais de 6.000 clínicas). Apresente a carteirinha digital e pronto — sem reembolso, sem burocracia." },
      ]}
      coverages={[
        { title: "Consultas Veterinárias", description: "Consultas com clínicos gerais e especialistas (dermatologia, ortopedia, cardiologia, oftalmologia, oncologia) na rede credenciada Petlove." },
        { title: "Exames e Diagnósticos", description: "Hemograma, bioquímico, raio-x, ultrassom, ecocardiograma, tomografia e ressonância magnética conforme o plano contratado." },
        { title: "Cirurgias", description: "Cobertura para cirurgias de emergência e eletivas: castração, retirada de tumores, cirurgias ortopédicas, abdominais e oftalmológicas." },
        { title: "Internação", description: "Internação com acompanhamento veterinário 24h, medicação, fluidoterapia e monitoramento." },
        { title: "Emergência e Urgência 24h", description: "Atendimento de emergência a qualquer hora — envenenamento, traumas, obstruções, convulsões e demais urgências." },
        { title: "Vacinas e Medicina Preventiva", description: "Alguns planos incluem vacinas, vermífugos e antipulgas como parte do pacote preventivo." },
        { title: "Fisioterapia e Reabilitação", description: "Sessões de fisioterapia e hidroterapia para recuperação pós-cirúrgica ou tratamento de problemas locomotores." },
        { title: "Telemedicina Veterinária", description: "Consultas online com veterinários para orientação inicial, triagem e acompanhamento de tratamentos." },
      ]}
      coverageExclusions={[
        "Doenças e condições pré-existentes (diagnosticadas antes da contratação) podem ter carência especial",
        "Procedimentos estéticos sem indicação clínica (conchectomia, caudectomia eletiva)",
        "Animais com idade acima do limite aceito pelo plano (varia conforme a operadora)",
        "Tratamentos experimentais não reconhecidos pelo CFMV",
        "Reprodução assistida e partos programados (algumas operadoras)",
      ]}
      pricingInfo={{
        intro: "Os planos Petlove têm mensalidades acessíveis que variam conforme a cobertura, a idade e a raça do animal. A Patro Seguros orienta sobre o melhor custo-benefício.",
        factors: [
          "Tipo de plano — básico, intermediário ou completo",
          "Idade do pet — filhotes e idosos podem ter valores diferenciados",
          "Raça — raças com predisposição a doenças específicas podem ter acréscimo",
          "Porte do animal — pequeno, médio ou grande",
          "Região — valores podem variar conforme a localidade",
          "Coberturas adicionais — vacinas, fisioterapia, telemedicina",
        ],
        note: "Planos básicos a partir de R$ 49/mês para cães de pequeno porte. Planos completos com cirurgias e internação de R$ 120 a R$ 350/mês. Compare com o custo de uma única emergência veterinária (R$ 3.000 a R$ 15.000) e veja que o plano se paga rapidamente.",
      }}
      realScenarios={[
        { title: "Cachorro engoliu objeto e precisou de cirurgia de emergência", description: "Um golden retriever de 2 anos engoliu um brinquedo que causou obstrução intestinal. A cirurgia de emergência, internação e medicação totalizaram R$ 8.500. Com o Plano Pet, o tutor pagou apenas a mensalidade — sem nenhum custo adicional." },
        { title: "Gata diagnosticada com doença renal crônica", description: "Gata de 10 anos diagnosticada com doença renal crônica precisou de exames mensais, medicação contínua e fluidoterapia. O custo anual sem plano seria de R$ 12.000. Com o plano, tudo coberto pela mensalidade." },
        { title: "Cachorro atropelado com fratura na pata", description: "Bulldog francês atropelado necessitou de cirurgia ortopédica (R$ 6.000), internação (R$ 2.000) e fisioterapia (R$ 3.000). Total de R$ 11.000 coberto integralmente pelo Plano Pet." },
      ]}
      importantDetails={[
        { title: "Por Que Plano Pet e Não Seguro Pet?", content: "O Plano Pet funciona como um plano de saúde — você paga mensalidade e usa a rede credenciada sem custo adicional. Já o seguro pet funciona por reembolso: você paga o veterinário e solicita reembolso depois. O Plano Pet é mais prático e elimina o desembolso do tutor no momento do atendimento." },
        { title: "Carências — O Que São e Como Funcionam", content: "Carência é o período entre a contratação e o início da cobertura para cada tipo de procedimento. Consultas geralmente têm carência de 24 a 48 horas. Exames de 15 a 30 dias. Cirurgias eletivas de 60 a 180 dias. Emergências de 24 a 48 horas. Por isso, contrate o plano antes de precisar — não espere a emergência." },
        { title: "Doenças Pré-Existentes", content: "Condições diagnosticadas antes da contratação podem ter carência especial ou cobertura parcial, dependendo do plano. Na Patro Seguros, orientamos sobre como declarar corretamente o histórico do pet para evitar problemas futuros." },
      ]}
      tips={[
        "Contrate o plano enquanto o pet é jovem e saudável — sem carências extras e com mensalidade menor",
        "Declare o histórico de saúde do pet corretamente — omissões podem gerar recusa de cobertura",
        "Use o plano para medicina preventiva (check-ups, vacinas) — prevenir é mais barato que tratar",
        "Verifique se há clínicas credenciadas próximas à sua residência antes de contratar",
        "Considere planos com telemedicina para orientações rápidas sem sair de casa",
      ]}
      whoNeeds={[
        "Tutores de cães e gatos de todas as raças e idades",
        "Tutores de pets idosos — quando os custos veterinários aumentam significativamente",
        "Tutores de raças com predisposição a doenças (Bulldog, Pug, Golden, Persa, Siamês)",
        "Famílias com múltiplos pets — planos familiares podem ter desconto",
        "Tutores que querem acesso a medicina veterinária de qualidade sem sustos financeiros",
        "Quem já passou por emergência veterinária cara e não quer repetir a experiência",
      ]}
      whyPatro={[
        "Parceira Petlove — acesso às melhores condições e planos disponíveis",
        "Orientação consultiva — ajudamos a escolher o plano ideal para o perfil do seu pet",
        "Comparação de planos — apresentamos as opções e explicamos as diferenças",
        "Suporte na utilização — orientamos sobre rede credenciada, carências e coberturas",
        "Atendimento humanizado — sabemos que seu pet é família",
        "A Patro Seguros cuida da proteção de toda a família — inclusive dos pets",
      ]}
      faqs={[
        { question: "O que o Plano Pet da Petlove cobre?", answer: "Consultas, exames, cirurgias, internação, emergências 24h e, em alguns planos, vacinas e fisioterapia. A cobertura varia conforme o plano escolhido. A Patro Seguros orienta sobre qual plano é o mais adequado para o seu pet." },
        { question: "Quanto custa o Plano Pet?", answer: "A partir de R$ 49/mês para cães de pequeno porte em planos básicos. Planos completos com cirurgias e internação ficam entre R$ 120 e R$ 350/mês. O valor varia conforme idade, raça e cobertura escolhida." },
        { question: "Gatos também podem ter Plano Pet?", answer: "Sim! A Petlove oferece planos específicos para gatos, com coberturas adequadas às necessidades felinas, incluindo doenças comuns como doença renal, DTUIF e problemas respiratórios." },
        { question: "Posso contratar para pet idoso?", answer: "Sim, mas os valores podem ser maiores e algumas coberturas podem ter carência estendida. Contrate o quanto antes — quanto mais jovem o pet na contratação, melhores as condições." },
        { question: "Como funciona o atendimento na rede credenciada?", answer: "Você agenda a consulta ou procedimento em uma das mais de 6.000 clínicas credenciadas Petlove, apresenta a carteirinha digital e é atendido sem custo adicional. Sem reembolso, sem burocracia." },
        { question: "A Patro Seguros é parceira da Petlove?", answer: "Sim! A Patro Seguros é parceira da Petlove e oferece atendimento consultivo para ajudar você a escolher o plano ideal para o seu pet, com as melhores condições disponíveis." },
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
