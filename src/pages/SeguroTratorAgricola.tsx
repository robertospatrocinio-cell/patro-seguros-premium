import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const heroImg = "https://images.unsplash.com/photo-1594411124406-8d59268f7b3c?auto=format&fit=crop&q=80&w=2000";

const SeguroTratorAgricola = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Trator Agrícola"
      subtitle="Proteção premium para o motor da sua produtividade. Cobertura completa em todo o território nacional."
      icon="🚜"
      badge="Especialista no Agronegócio"
      metaDescription="Seguro para Tratores Agrícolas: proteção contra roubo, incêndio, colisão e tombamento em todo o Brasil. Cotação rápida com a Patro Seguros."
      description="O trator é o coração da operação no campo. O Seguro de Trator Agrícola da Patro Seguros oferece a proteção robusta que o seu patrimônio exige, garantindo que imprevistos não paralisem sua safra."
      detailedDescription={`Sabemos que um trator parado é sinônimo de prejuízo. Seja por um defeito mecânico súbito, um acidente durante a operação ou a ação de terceiros, os riscos no campo são constantes e de alto impacto financeiro.

Nossa consultoria especializada desenha apólices que cobrem desde o uso em lavouras próprias até a prestação de serviços em propriedades de terceiros. Trabalhamos com coberturas para danos elétricos, quebra de vidros e, fundamentalmente, a cobertura de Responsabilidade Civil do Operador, protegendo o produtor contra danos causados a outras pessoas ou propriedades durante o trabalho.

Com atendimento 100% remoto, a Patro Seguros facilita a vida do homem do campo: da cotação rápida via WhatsApp até o suporte total na regulação de sinistros em qualquer estado do Brasil.`}
      howItWorks={[
        { step: "1", title: "Ficha Técnica", description: "Informe marca, modelo, ano e valor (nota fiscal ou FIPE) do seu trator." },
        { step: "2", title: "Perfil de Uso", description: "Definimos se o uso é em lavoura própria, arrendada ou prestação de serviços." },
        { step: "3", title: "Comparativo de Mercado", description: "Enviamos as melhores opções das seguradoras líderes do agro no Brasil." },
        { step: "4", title: "Proteção Ativa", description: "Emissão rápida e suporte 24h para garantir que você nunca fique na mão." },
      ]}
      coverages={[
        { title: "Roubo e Furto Qualificado", description: "Proteção essencial contra a criminalidade crescente no campo." },
        { title: "Incêndio e Explosão", description: "Cobre danos por fogo originado na própria máquina ou no ambiente." },
        { title: "Colisão e Tombamento", description: "Proteção contra acidentes comuns em terrenos acidentados ou manobras." },
        { title: "Danos Elétricos", description: "Seguro para sistemas eletrônicos sensíveis e chicotes elétricos." },
        { title: "Responsabilidade Civil Operador", description: "Cobre danos materiais ou corporais a terceiros causados pelo trator." },
        { title: "Transporte do Equipamento", description: "Garante a máquina durante o deslocamento entre propriedades." },
        { title: "Quebra de Máquinas", description: "Cobertura adicional para falhas mecânicas e elétricas imprevistas." },
      ]}
      coverageExclusions={[
        "Desgaste natural de pneus, correias e lubrificantes",
        "Manutenção básica negligenciada (falta de óleo ou água)",
        "Uso por operadores sem a devida habilitação ou treinamento",
        "Danos causados por sobrecarga intencional do equipamento",
        "Atos de guerra, terrorismo ou convulsões sociais",
      ]}
      pricingInfo={{
        intro: "O custo do seguro é um investimento pequeno perto do valor do equipamento e do risco de perda total.",
        factors: [
          "Marca e valor de reposição do trator",
          "Ano de fabricação e estado de conservação",
          "Tipo de atividade e culturas onde opera",
          "Região geográfica da propriedade",
          "Existência de dispositivos de rastreamento",
        ],
        note: "Tratores financiados por bancos ou cooperativas exigem apólices específicas que a Patro emite com agilidade.",
      }}
      realScenarios={[
        { title: "Tombamento em Encosta", description: "Durante a preparação do terreno, o trator tombou em uma área íngreme. O seguro cobriu os danos estruturais de R$ 55.000, preservando o caixa do produtor." },
        { title: "Curto-circuito no Painel", description: "Um superaquecimento elétrico destruiu o chicote e o painel digital. A reposição de R$ 12.000 foi paga integralmente pela cobertura de danos elétricos." },
        { title: "Roubo em Propriedade", description: "Bandidos levaram o trator durante a madrugada. A seguradora indenizou o valor total acordado em 22 dias, permitindo a compra de uma nova máquina." },
      ]}
      importantDetails={[
        { title: "Atendimento Nacional", content: "Não importa onde sua fazenda esteja localizada, a Patro Seguros atende do Rio Grande do Sul ao Mato Grosso com a mesma eficiência." },
        { title: "Acessórios e Implementos", content: "Lembre-se de incluir na apólice acessórios como GPS e implementos específicos para que a proteção seja total." },
      ]}
      tips={[
        "Sempre mantenha a Nota Fiscal do equipamento em local seguro e digitalizada",
        "Certifique-se de que seus operadores estão treinados e utilizam EPIs",
        "Contrate a verba de RC Operador; acidentes com terceiros podem gerar processos caros",
        "Em caso de financiamento, informe os dados da instituição para o beneficiário da apólice",
      ]}
      whoNeeds={[
        "Produtores de Soja, Milho, Café e Cana",
        "Empresas de Terraplenagem e Serviços Rurais",
        "Pequenos Agricultores Familiares",
        "Cooperativas Agrícolas",
        "Usinas e Grandes Grupos do Agro",
      ]}
      whyPatro={[
        "Especialista em seguros de máquinas e equipamentos",
        "Parceria com fabricantes e concessionárias pelo Brasil",
        "Consultoria técnica para evitar coberturas desnecessárias",
        "Parceria direta com John Deere, Case, Massey Ferguson e Valtra",
        "Agilidade total na emissão de certificados para financiamentos",
        "Suporte em sinistro com foco na rapidez da retomada do trabalho",
      ]}
      faqs={[
        { question: "O seguro de trator é obrigatório?", answer: "Não é obrigatório por lei para uso em propriedade privada, mas é exigido por todos os bancos em caso de financiamento (BNDES, Pronaf, etc)." },
        { question: "A Patro atende a minha região?", answer: "Sim! Atendemos produtores rurais em todos os 26 estados do Brasil e no Distrito Federal de forma 100% remota e segura." },
        { question: "Quanto tempo leva para cotar?", answer: "Com os dados básicos da máquina, enviamos o comparativo de preços em até 24 horas úteis." },
        { question: "O seguro cobre o trator na estrada?", answer: "Sim, se contratada a cobertura de transporte ou deslocamento em vias públicas." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro de Colheitadeira", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Rural", link: "/seguro-rural" },
      ]}
    />
  );
};

export default SeguroTratorAgricola;
