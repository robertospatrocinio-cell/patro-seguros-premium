import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroAutoChevroletOnixGuarulhos = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Chevrolet Onix em Guarulhos — Cotação com 16+ seguradoras"
      headline="Seguro Chevrolet Onix em Guarulhos — Cotação com 16+ seguradoras"
      subtitle="O Chevrolet Onix é o hatch mais vendido do país e também um dos mais roubados em Guarulhos."
      metaDescription="Seguro Chevrolet Onix em Guarulhos comparado em 16+ seguradoras. Faixa média de R$ 1.900 a R$ 3.700/ano. Cotação em até 2h com proteção contra roubo e furto."
      description="O Chevrolet Onix é o hatch mais vendido do país e também um dos mais roubados em Guarulhos. O alto volume de vendas e a forte demanda no mercado paralelo fazem o prêmio ficar acima de outros populares da mesma categoria — mesmo sendo um carro de entrada, o Onix exige uma cotação cuidadosa."
      detailedDescription={`A seguradora avalia com atenção o CEP de pernoite, o histórico do motorista e os dispositivos de segurança. Para reduzir o custo, recomendamos garagem fechada e rastreador — juntos, podem gerar descontos de 10% a 20% no prêmio. O Onix também é muito usado por famílias e por quem roda diariamente na cidade, com um custo de manutenção baixo.

Na Patro, comparamos seu Onix em 16+ seguradoras e mostramos lado a lado coberturas, franquias e preços — sem pressão de venda e com explicação clara do que cada item significa.

## Dicas da Patro para economizar
1. Rastreador + garagem fechada: desconto combinado de 10% a 20%.
2. Declare o uso real: se usa o carro para app, a cobertura profissional evita negativa de sinistro.
3. Mantenha o bônus: cada ano sem sinistro reduz o prêmio progressivamente.
4. Compare na renovação: o Onix tem concorrência forte entre seguradoras — aproveite.
5. Evite subseguro: declare o valor FIPE correto para não ter indenização reduzida.`}
      icon="🚗"
      pricingInfo={{
        intro: "A faixa média fica entre R$ 1.900 e R$ 3.700 por ano para cobertura compreensiva (estimativa com base no perfil médio dos nossos clientes).",
        factors: [
          "CEP de pernoite: Cumbica, Pimentas e Bonsucesso elevam o prêmio; Cidade Maia e Vila Augusta reduzem.",
          "Ano e versão (1.0, 1.0T, RS, Premier).",
          "Idade e perfil do condutor.",
          "Garagem, rastreador e alarme.",
          "Classe de bônus e histórico de sinistros.",
        ],
        note: "Seguradoras mais competitivas: Porto Seguro e HDI costumam oferecer as melhores condições para o Onix. Para motoristas de aplicativo, trabalhamos com seguradoras que possuem cobertura profissional — essencial para quem roda de Uber, 99 ou iFood."
      }}
      coverages={[
        { title: "Compreensiva", description: "Roubo, furto, colisão, incêndio e fenômenos naturais — essencial dado o risco de roubo do modelo." },
        { title: "Assistência 24h", description: "Guincho, chaveiro e socorro mecânico." },
        { title: "Carro reserva", description: "Para quem depende do carro no dia a dia." },
        { title: "Cobertura para motorista de app", description: "Proteção durante corridas para quem usa o Onix para trabalhar." },
        { title: "Vidros e faróis", description: "Para-brisa com cobertura sem impacto na bonificação." },
      ]}
      whoNeeds={[
        "Proprietários de Onix novo, seminovo ou financiado.",
        "Famílias que usam o carro como veículo principal.",
        "Motoristas de aplicativo que precisam de cobertura profissional.",
        "Quem mora em bairros de risco elevado e quer proteção contra roubo.",
        "Jovens condutores que buscam bom custo-benefício.",
      ]}
      whyPatro={[
        "Resposta em até 2 horas úteis",
        "Comparativo de 16+ seguradoras",
        "Atendimento consultivo especializado",
        "Expertise local em Guarulhos e região",
      ]}
      faqs={[
        { question: "Quanto custa seguro Onix em Guarulhos?", answer: "Entre R$ 1.900 e R$ 3.700 por ano para cobertura compreensiva, variando por CEP, versão e perfil do condutor." },
        { question: "O Onix é muito visado para roubo em Guarulhos?", answer: "Sim. É um dos hatches mais roubados da cidade por causa da alta demanda no mercado paralelo. Rastreador e garagem fechada fazem diferença real no preço." },
        { question: "Preciso de rastreador para segurar o Onix?", answer: "Recomendado e, em alguns bairros, pode ser exigido para obter boa condição. O desconto compensa o investimento." },
        { question: "O seguro cobre uso como motorista de app?", answer: "Sim, com cobertura específica. Motoristas de Uber, 99 e iFood precisam dessa proteção — o seguro convencional não cobre corridas." },
        { question: "Qual seguradora é melhor para o Onix?", answer: "Porto Seguro e HDI costumam ter os melhores preços. Para uso profissional, orientamos as seguradoras com cobertura de app." },
      ]}
    />
  );
};

export default SeguroAutoChevroletOnixGuarulhos;