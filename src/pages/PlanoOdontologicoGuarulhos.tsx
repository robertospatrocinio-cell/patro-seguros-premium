import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-odonto.webp";

/**
 * Plano Odontológico em Guarulhos — variante local SEO da página
 * /seguro-odonto. Mesmo conteúdo principal com headline, meta e FAQs
 * voltados para clientes de Guarulhos e região.
 */
const PlanoOdontologicoGuarulhos = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Plano Odontológico em Guarulhos | Patro Seguros"
      headline="Plano odontológico em Guarulhos para você, sua família e sua empresa"
      subtitle="Consultas, limpeza, canal, ortodontia e implantes com rede credenciada em Guarulhos"
      icon="🦷"
      metaDescription="Plano odontológico em Guarulhos a partir de R$ 20/mês. Rede de dentistas no Centro, Maia, Vila Galvão e Cumbica. Individual, familiar e PME. Cotação grátis."
      description="Plano odontológico em Guarulhos com ampla rede de dentistas credenciados na cidade e em São Paulo. Cobertura para consultas, prevenção, restauração, ortodontia e próteses, individual ou empresarial."
      detailedDescription={`Em Guarulhos, um tratamento de canal particular varia de R$ 800 a R$ 1.500. Uma coroa de porcelana pode chegar a R$ 3.000 e a ortodontia completa, a mais de R$ 8.000. Já um plano odontológico mensal a partir de cerca de R$ 20 cobre limpezas, restaurações e boa parte dos tratamentos — uma única limpeza semestral já costuma pagar o plano.

A Patro Seguros é uma corretora de seguros em Guarulhos que compara os principais planos odontológicos do mercado — incluindo Bradesco Dental, SulAmérica Odonto, Amil Dental, Porto Odonto, OdontoPrev e Uniodonto — e valida a rede credenciada de dentistas em Guarulhos, do Centro à Vila Galvão, Maia, Bonsucesso, Pimentas, Cumbica e Taboão.

Atendemos planos individuais, familiares e empresariais (a partir de 2 vidas, ideal para MEIs e PMEs de Guarulhos). A consultoria é 100% gratuita.`}
      howItWorks={[
        { step: "1", title: "Análise das necessidades", description: "Entendemos se o foco é preventivo, restaurador, ortodontia, próteses ou implantes." },
        { step: "2", title: "Comparação de planos", description: "Comparamos operadoras com rede credenciada em Guarulhos e na sua região." },
        { step: "3", title: "Contratação simples", description: "Documentação mínima e início após carência (alguns planos têm consulta sem carência)." },
        { step: "4", title: "Cuidado contínuo", description: "Suporte para indicações, urgências e dúvidas durante toda a vigência." },
      ]}
      coverages={[
        { title: "Consultas odontológicas", description: "Rotina e emergenciais em dentistas credenciados de Guarulhos" },
        { title: "Procedimentos preventivos", description: "Limpeza, aplicação de flúor e higiene" },
        { title: "Tratamentos de canal", description: "Endodontia completa para salvar dentes comprometidos" },
        { title: "Restaurações", description: "Tratamento de cáries em diversos materiais" },
        { title: "Periodontia", description: "Tratamento de gengivas e doenças periodontais" },
        { title: "Cirurgias odontológicas", description: "Inclusive extrações de sisos" },
        { title: "Ortodontia (planos completos)", description: "Aparelho fixo e manutenções mensais" },
        { title: "Próteses e implantes (opcional)", description: "Disponível em planos premium" },
      ]}
      pricingInfo={{
        intro: "O plano odontológico em Guarulhos é um dos benefícios de melhor custo-benefício do mercado.",
        factors: [
          "Idade dos beneficiários",
          "Tipo de plano: básico, intermediário ou completo",
          "Inclusão de ortodontia, próteses ou implantes",
          "Abrangência: municipal, estadual ou nacional",
          "Modalidade: individual, familiar ou empresarial",
        ],
        note: "Em Guarulhos, planos básicos partem de R$ 20–35/mês. Planos com ortodontia ficam entre R$ 60 e R$ 120/mês. Planos empresariais (PME/MEI) podem ser ainda mais baratos por vida.",
      }}
      tips={[
        "Verifique a rede credenciada perto da sua casa ou empresa em Guarulhos antes de fechar",
        "Para famílias com crianças, priorize planos com cobertura ortodôntica",
        "Empresas e MEIs conseguem condições melhores no plano coletivo (2+ vidas)",
        "Guarde radiografias e relatórios — facilitam o uso da cobertura e portabilidade",
        "Não esconda tratamentos prévios na declaração — pode anular a cobertura",
      ]}
      whoNeeds={[
        "Famílias de Guarulhos que evitam custos altos com tratamentos avulsos",
        "Profissionais que valorizam saúde bucal preventiva",
        "Pais com filhos em fase de ortodontia",
        "MEIs e PMEs que querem oferecer benefício barato e valorizado",
        "Aposentados e pessoas 60+ que precisam de manutenção contínua",
      ]}
      whyPatro={[
        "Corretora local em Guarulhos, com atendimento presencial no Cidade Maia",
        "Comparação entre as maiores operadoras odontológicas",
        "Validação de rede de dentistas por bairro de Guarulhos",
        "Planos individuais, familiares, MEI e empresariais",
        "Sem custo adicional: consultoria 100% gratuita",
      ]}
      faqs={[
        { question: "Quanto custa um plano odontológico em Guarulhos?", answer: "Planos básicos em Guarulhos partem de R$ 20 a R$ 35/mês por pessoa. Planos com ortodontia ficam entre R$ 60 e R$ 120/mês. Planos empresariais (PME ou MEI) costumam ter desconto adicional." },
        { question: "Quais operadoras de plano odontológico atendem Guarulhos?", answer: "Bradesco Dental, SulAmérica Odonto, Amil Dental, Porto Odonto, OdontoPrev e Uniodonto mantêm rede credenciada ampla em Guarulhos — Centro, Maia, Vila Galvão, Bonsucesso, Pimentas, Cumbica e Taboão." },
        { question: "O plano cobre ortodontia em Guarulhos?", answer: "Depende do plano. Planos básicos não cobrem ortodontia; planos intermediários e completos cobrem instalação, manutenção mensal e remoção. A Patro Seguros indica a opção certa para seu caso." },
        { question: "Qual a carência média do plano odontológico?", answer: "Consultas e urgências costumam ter carência de 24 horas a 30 dias. Tratamentos restauradores: 30 a 60 dias. Próteses e ortodontia: 180 dias. Para planos empresariais com 30+ vidas, normalmente há isenção." },
        { question: "Posso contratar plano odontológico empresarial em Guarulhos?", answer: "Sim. A partir de 2 vidas (CNPJ ativo), incluindo MEI. O custo por colaborador costuma ser bem menor que no individual e funciona como benefício de retenção." },
        { question: "A consultoria da Patro Seguros tem custo?", answer: "Não. É 100% gratuita. Você paga o preço de tabela da operadora — nossa remuneração vem direto dela. Atendimento presencial no Cidade Maia e online por WhatsApp." },
      ]}
      relatedInsurances={[
        { title: "Plano de Saúde em Guarulhos", link: "/plano-saude-guarulhos" },
        { title: "Plano de Saúde Empresarial em Guarulhos", link: "/plano-saude-empresarial-guarulhos" },
        { title: "Seguro de Vida em Guarulhos", link: "/seguro-vida-guarulhos" },
        { title: "Seguro Odontológico Nacional", link: "/seguro-odonto" },
      ]}
    />
  );
};

export default PlanoOdontologicoGuarulhos;