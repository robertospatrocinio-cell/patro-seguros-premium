import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-funeral.webp";

const SeguroFuneral = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Funeral — Tranquilidade para Você e Sua Família"
      subtitle="Cobertura completa para despesas funerárias, sem burocracia e com assistência imediata. Proteja quem você ama de custos inesperados em um momento delicado."
      icon="🕊️"
      badge="A partir de R$ 15/mês"
      metaDescription="Seguro Funeral com cobertura completa para despesas funerárias. Assistência 24h, sem carência em algumas modalidades. Cotação grátis Patro Seguros Guarulhos."
      description="O Seguro Funeral (ou Assistência Funeral) é uma proteção que cobre todas as despesas relacionadas ao funeral do segurado e, em muitos planos, de seus familiares. Em um momento de dor e luto, a última coisa que a família precisa é se preocupar com custos — que podem facilmente ultrapassar R$ 10.000 a R$ 15.000 em grandes cidades como São Paulo e Guarulhos. O seguro funeral elimina essa preocupação, garantindo que todos os procedimentos sejam providenciados com dignidade e sem desembolso no momento do falecimento."
      detailedDescription="Diferente do que muitos imaginam, o Seguro Funeral não está restrito a pessoas idosas. Imprevistos acontecem em qualquer idade, e ter essa cobertura garante que a família não será surpreendida com despesas elevadas em um momento de vulnerabilidade emocional. Muitos planos de seguro de vida já incluem assistência funeral como cobertura adicional, mas contratar um seguro funeral individual ou familiar oferece coberturas mais abrangentes e valores de indenização maiores.

Na Patro Seguros, trabalhamos com as principais seguradoras do mercado para oferecer planos de assistência funeral que se adequam ao seu orçamento e às necessidades da sua família. Analisamos cada caso individualmente, comparando coberturas, limites de indenização, abrangência geográfica e serviços incluídos para recomendar a melhor opção."
      howItWorks={[
        {
          step: "1",
          title: "Escolha o plano ideal",
          description: "Defina se deseja cobertura individual ou familiar, o valor de indenização e os serviços incluídos. Orientamos você sobre as melhores opções do mercado."
        },
        {
          step: "2",
          title: "Contratação simples e rápida",
          description: "A contratação é feita de forma digital, sem exames médicos na maioria dos planos. A apólice é emitida em minutos com todas as informações de cobertura."
        },
        {
          step: "3",
          title: "Acionamento imediato quando necessário",
          description: "Em caso de falecimento, a família liga para a central 24h. A seguradora providencia todos os serviços funerários diretamente, sem necessidade de desembolso."
        },
        {
          step: "4",
          title: "Todos os serviços são providenciados",
          description: "Desde o translado do corpo até a cerimônia, tudo é organizado pela seguradora. A família recebe suporte completo sem se preocupar com logística ou pagamentos."
        },
      ]}
      coverages={[
        {
          title: "Serviços Funerários Completos",
          description: "Cobertura de todas as despesas do funeral, incluindo urna/caixão, velório, sepultamento ou cremação, ornamentação, paramentação e registro de óbito."
        },
        {
          title: "Translado do Corpo",
          description: "Transporte do corpo do local do falecimento até o local do velório e sepultamento, em qualquer cidade do Brasil. Inclui translado interestadual quando necessário."
        },
        {
          title: "Cremação",
          description: "Nos planos que incluem cremação, cobertura de todos os custos do processo de cremação, incluindo urna cinerária e taxa do crematório."
        },
        {
          title: "Assistência Familiar",
          description: "Planos familiares cobrem cônjuge, filhos e, em alguns casos, pais e sogros. Cada membro tem direito à mesma cobertura completa do titular."
        },
        {
          title: "Cobertura Nacional",
          description: "O seguro é válido em todo o território nacional. Se o falecimento ocorrer em cidade diferente da residência, o translado é providenciado sem custo adicional."
        },
        {
          title: "Auxílio Alimentação para a Família",
          description: "Alguns planos incluem auxílio alimentação para os familiares durante o período do velório, garantindo suporte prático em um momento difícil."
        },
        {
          title: "Coroa de Flores",
          description: "Fornecimento de coroa de flores para a cerimônia, incluída nos planos mais completos como parte da ornamentação do velório."
        },
        {
          title: "Assistência para Documentação",
          description: "Orientação e auxílio na obtenção de documentos necessários como certidão de óbito, guia de sepultamento e demais trâmites burocráticos."
        },
      ]}
      coverageExclusions={[
        "Falecimento por suicídio nos primeiros 24 meses de vigência (período de carência legal)",
        "Despesas que excedam o limite de indenização contratado",
        "Serviços funerários contratados diretamente pela família sem acionamento prévio da seguradora",
        "Falecimento no exterior (alguns planos não cobrem — verifique na contratação)",
        "Despesas com jazigo perpétuo ou construção de túmulo/mausoléu",
        "Custos de exumação posterior ao sepultamento",
        "Missas, cultos ou cerimônias religiosas além do velório padrão",
      ]}
      pricingInfo={{
        intro: "O Seguro Funeral é uma das coberturas mais acessíveis do mercado de seguros. O valor mensal é baixo em comparação com o custo real de um funeral, que pode facilmente ultrapassar R$ 10.000.",
        factors: [
          "Tipo de plano: individual (a partir de R$ 15/mês) ou familiar (a partir de R$ 30/mês)",
          "Valor da cobertura: planos de R$ 5.000 a R$ 20.000 de limite para despesas funerárias",
          "Idade do segurado: quanto mais jovem na contratação, menor o valor mensal",
          "Abrangência: planos com cobertura nacional custam ligeiramente mais que regionais",
          "Serviços incluídos: planos com cremação e translado interestadual têm valores maiores",
          "Número de dependentes: cada familiar adicional no plano incrementa o valor mensal",
        ],
        note: "Um funeral completo em São Paulo ou Guarulhos custa entre R$ 8.000 e R$ 18.000. Com o seguro funeral, você garante essa cobertura por menos de R$ 1 por dia. É um dos melhores custos-benefícios do mercado de seguros."
      }}
      realScenarios={[
        {
          title: "Falecimento inesperado em viagem a trabalho",
          description: "Segurado faleceu por infarto durante viagem a trabalho no interior de Minas Gerais. O seguro providenciou translado do corpo até Guarulhos (800 km), funeral completo com velório, caixão e sepultamento. A família não precisou se preocupar com nenhum custo ou logística. Valor total coberto: R$ 14.200."
        },
        {
          title: "Plano familiar acionado para pai idoso",
          description: "Cliente tinha plano familiar que cobria os pais. Quando o pai de 78 anos faleceu, o seguro cobriu todas as despesas funerárias, incluindo velório estendido, urna premium e translado dentro da cidade. Total coberto: R$ 11.500."
        },
        {
          title: "Cremação coberta pelo plano",
          description: "Segurada havia expressado desejo de cremação. O plano contratado incluía cobertura para cremação, e todos os custos foram cobertos — cerimônia, taxa do crematório e urna cinerária. A família recebeu suporte completo da seguradora. Total coberto: R$ 9.800."
        },
      ]}
      importantDetails={[
        {
          title: "Seguro Funeral vs. Plano Funerário",
          content: "São produtos diferentes. O Seguro Funeral é regulamentado pela SUSEP (Superintendência de Seguros Privados) e oferece garantia financeira através de uma seguradora. O Plano Funerário é oferecido por empresas funerárias e não tem a mesma regulamentação. O seguro oferece mais segurança jurídica e flexibilidade na escolha do prestador."
        },
        {
          title: "Carência e vigência",
          content: "A maioria dos seguros funerais tem carência de 60 a 90 dias para morte natural. Para morte acidental, geralmente não há carência — a cobertura é imediata. A vigência é anual com renovação automática. É importante manter o pagamento em dia para não perder a cobertura."
        },
        {
          title: "Assistência Funeral no Seguro de Vida",
          content: "Muitos seguros de vida incluem assistência funeral como cobertura adicional, mas geralmente com valores limitados (R$ 3.000 a R$ 5.000). Um seguro funeral dedicado oferece coberturas maiores e serviços mais completos. Os dois produtos podem ser complementares."
        },
        {
          title: "Como a família aciona o seguro",
          content: "Basta ligar para a central 24h da seguradora (número consta na apólice). A seguradora assume toda a organização: contata a funerária, providencia o translado, organiza o velório e o sepultamento ou cremação. A família não precisa pagar nada antecipadamente."
        },
      ]}
      tips={[
        "Contrate o seguro funeral o quanto antes — quanto mais jovem, menor o valor mensal e sem restrições de saúde",
        "Opte pelo plano familiar se tiver cônjuge e filhos — o custo por pessoa é menor que planos individuais separados",
        "Verifique se seu seguro de vida já inclui assistência funeral — pode ser suficiente ou complementar",
        "Informe toda a família sobre a existência do seguro e onde encontrar o número da apólice e da central 24h",
        "Prefira planos com cobertura nacional, especialmente se você viaja com frequência dentro do Brasil",
        "Se deseja cremação, confirme que o plano inclui essa modalidade — nem todos cobrem",
        "Mantenha os pagamentos em dia para não perder a cobertura — a recontratação pode ter novo período de carência",
      ]}
      whoNeeds={[
        "Famílias que desejam proteção financeira contra despesas funerárias inesperadas",
        "Pessoas acima de 50 anos que querem deixar a família tranquila",
        "Pais e mães de família que são os principais provedores financeiros",
        "Quem não possui seguro de vida com assistência funeral inclusa",
        "Idosos que não querem deixar essa despesa para os filhos",
        "Pessoas que moram longe da família e podem precisar de translado do corpo",
        "Quem deseja cremação e quer garantir que o desejo será respeitado sem custo para a família",
        "Empresas que oferecem benefício funeral aos colaboradores",
      ]}
      whyPatro={[
        "Comparamos planos de diversas seguradoras para encontrar o melhor custo-benefício",
        "Planos individuais a partir de R$ 15/mês e familiares a partir de R$ 30/mês",
        "Orientação sobre diferenças entre seguro funeral e plano funerário",
        "Cobertura nacional com translado interestadual incluído",
        "Contratação 100% digital, sem exames médicos",
        "Atendimento humanizado — sabemos da sensibilidade do tema e tratamos com respeito e cuidado",
      ]}
      faqs={[
        {
          question: "Qual a diferença entre seguro funeral e plano funerário?",
          answer: "O seguro funeral é regulamentado pela SUSEP e oferecido por seguradoras com garantia financeira. O plano funerário é oferecido por empresas funerárias sem a mesma regulamentação. O seguro permite escolher o prestador e tem respaldo legal mais robusto."
        },
        {
          question: "O seguro funeral tem carência?",
          answer: "Para morte natural, a maioria dos planos tem carência de 60 a 90 dias. Para morte acidental, geralmente não há carência — a cobertura é imediata desde o primeiro dia. Consulte as condições específicas de cada plano."
        },
        {
          question: "Posso incluir familiares no meu seguro funeral?",
          answer: "Sim! Existem planos familiares que cobrem cônjuge, filhos, pais e até sogros. O custo por pessoa é menor do que contratar planos individuais separados. Cada dependente tem direito à mesma cobertura do titular."
        },
        {
          question: "Quanto custa um funeral sem seguro?",
          answer: "Em grandes cidades como São Paulo e Guarulhos, um funeral completo (velório, caixão, sepultamento, documentação) custa entre R$ 8.000 e R$ 18.000, dependendo dos serviços escolhidos. Com cremação, o valor pode ser ainda maior."
        },
        {
          question: "O seguro cobre cremação?",
          answer: "Depende do plano contratado. Existem planos específicos que incluem cremação, com cobertura para todos os custos do processo — cerimônia, taxa do crematório e urna cinerária. Indicamos o plano adequado à sua preferência."
        },
        {
          question: "Preciso fazer exame médico para contratar?",
          answer: "Na maioria dos planos de seguro funeral, não é necessário exame médico. Basta preencher uma declaração de saúde simples. Isso torna a contratação rápida e acessível para pessoas de todas as idades."
        },
        {
          question: "Como minha família aciona o seguro?",
          answer: "Basta ligar para a central 24h da seguradora (número na apólice). A seguradora assume toda a organização: translado, velório, sepultamento ou cremação. A família não precisa pagar nada — tudo é providenciado diretamente."
        },
      ]}
      relatedInsurances={[
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Decesso", link: "/seguro-decesso" },
        { title: "Previdência Privada", link: "/previdencia-privada" },
        { title: "Seguro Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
      ]}
    />
  );
};

export default SeguroFuneral;
