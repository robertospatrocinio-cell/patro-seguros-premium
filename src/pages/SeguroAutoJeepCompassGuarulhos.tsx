import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroAutoJeepCompassGuarulhos = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Jeep Compass em Guarulhos — Cotação com 16+ seguradoras"
      headline="Seguro Jeep Compass em Guarulhos — Cotação com 16+ seguradoras"
      subtitle="O Jeep Compass é o SUV médio mais vendido do Brasil e muito presente em Guarulhos, principalmente no Cidade Maia e na Vila Augusta."
      metaDescription="Seguro Jeep Compass em Guarulhos comparado em 16+ seguradoras. Faixa média de R$ 3.000 a R$ 5.400/ano. Cotação em até 2h com assistência VIP especializada."
      description="O Jeep Compass é o SUV médio mais vendido do Brasil e muito presente em Guarulhos, principalmente no Cidade Maia e na Vila Augusta, onde é o carro preferido de muitas famílias e profissionais liberais. Por ser um veículo de alto valor FIPE e com peças de reposição mais caras, o seguro fica na faixa média-alta — mas há formas legítimas de reduzir o custo."
      detailedDescription={`O perfil do motorista pesa muito nesse modelo: condutores acima de 30 anos, com garagem fechada e sem sinistros recentes, conseguem condições significativamente melhores. Para quem usa o carro em viagens pela Dutra e pela Fernão Dias, recomendamos reforçar a cobertura de colisão e a assistência 24h.

Na Patro, comparamos seu Compass em 16+ seguradoras e orientamos sobre coberturas, franquias e acessórios — com atendimento consultivo, sem pressão de venda.

## Dicas da Patro para economizar
1. Garagem fechada: reduz o prêmio em até 20% em bairros de menor risco.
2. Rastreador: desconto de 10% a 15% e mais segurança contra roubo.
3. Mantenha o bônus: é o maior fator de redução de custo ao longo do tempo.
4. Revise as coberturas anualmente: não pague por coberturas que não usa.
5. Compare na renovação: o mercado de SUVs muda rápido — nunca renove sem cotar.`}
      icon="🚗"
      pricingInfo={{
        intro: "A faixa média fica entre R$ 3.000 e R$ 5.400 por ano para cobertura compreensiva (estimativa com base no perfil médio dos nossos clientes).",
        factors: [
          "Versão (Sport, Longitude, Limited, S) e ano do veículo.",
          "CEP de pernoite: Cidade Maia e Vila Augusta são mais favoráveis; Cumbica e Pimentas elevam o prêmio.",
          "Idade, tempo de habilitação e histórico do condutor.",
          "Garagem fechada, rastreador e dispositivos de segurança.",
          "Classe de bônus.",
        ],
        note: "Seguradoras mais competitivas: Allianz e Tokio Marine costumam ter as melhores condições para SUVs como o Compass, combinando preço e rede de oficinas. A Porto Seguro se destaca pela assistência e agilidade no sinistro. Na cotação, apresentamos as propostas lado a lado para você decidir com clareza."
      }}
      coverages={[
        { title: "Compreensiva", description: "Roubo, furto, colisão, incêndio e fenômenos naturais." },
        { title: "Assistência 24h", description: "Guincho e socorro mecânico — importante para quem viaja." },
        { title: "Carro reserva", description: "SUV de categoria equivalente enquanto o seu está na oficina." },
        { title: "Vidros, faróis e retrovisores", description: "Itens caros nesse modelo." },
        { title: "Acessórios", description: "Central multimídia, rodas e itens de série." },
      ]}
      whoNeeds={[
        "Famílias que usam o SUV como veículo principal.",
        "Profissionais liberais e executivos do Cidade Maia e Vila Augusta.",
        "Quem viaja com frequência pela Dutra e Fernão Dias.",
        "Proprietários de Compass financiado (bancos exigem seguro).",
        "Quem valoriza conforto e tecnologia e quer proteger o investimento.",
      ]}
      whyPatro={[
        "Resposta em até 2 horas úteis",
        "Comparativo de 16+ seguradoras",
        "Atendimento consultivo especializado",
        "Expertise local em Guarulhos e região",
      ]}
      faqs={[
        { question: "Quanto custa seguro Compass em Guarulhos?", answer: "Entre R$ 3.000 e R$ 5.400 por ano para cobertura compreensiva, dependendo da versão, do CEP e do perfil do condutor." },
        { question: "O Compass é muito visado para roubo?", answer: "O risco é médio. Bairros como Cidade Maia e Vila Augusta têm índices mais favoráveis; Cumbica e Pimentas elevam o prêmio." },
        { question: "Preciso de rastreador para segurar o Compass?", answer: "Não é obrigatório, mas recomendado. Reduz o prêmio e aumenta as chances de recuperação em caso de roubo." },
        { question: "Qual seguradora é melhor para o Compass?", answer: "Allianz e Tokio Marine costumam ter boas condições para SUVs. A melhor escolha depende do seu perfil e do seu bairro." },
        { question: "O seguro cobre uso profissional?", answer: "Se você usar o Compass para trabalho (consultoria, vendas externas), precisa declarar o uso e, em alguns casos, contratar cobertura específica. A Patro orienta o caminho certo." },
      ]}
    />
  );
};

export default SeguroAutoJeepCompassGuarulhos;