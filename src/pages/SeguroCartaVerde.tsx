import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-auto.webp";

const SeguroCartaVerde = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Carta Verde em Guarulhos e São Paulo"
      headline="Seguro Carta Verde para viajar de carro pela América do Sul"
      subtitle="Conte com a Patro Seguros para contratar o seguro obrigatório para circular com veículo brasileiro em países como Argentina, Uruguai, Paraguai, Chile, Bolívia e Peru."
      icon="🌎"
      metaDescription="Contrate Seguro Carta Verde para viajar com veículo brasileiro pela América do Sul. Atendimento em Guarulhos e SP para Argentina, Uruguai, Paraguai, Chile e mais."
      description="Vai viajar com seu carro para outro país da América do Sul? A Patro Seguros ajuda você a contratar o Seguro Carta Verde com orientação rápida, atendimento em Guarulhos/São Paulo e suporte para viajar com mais tranquilidade."
      detailedDescription={`O Seguro Carta Verde é uma proteção de responsabilidade civil exigida para veículos brasileiros que circulam em determinados países da América do Sul. Ele cobre danos materiais e corporais causados a terceiros no exterior, de acordo com as regras do país visitado e as condições da apólice.

Importante: o Seguro Carta Verde não substitui o seguro auto tradicional. Ele é uma cobertura específica para responsabilidade civil no exterior — sem ela, o veículo pode ser impedido de entrar em fronteiras como as da Argentina, Uruguai, Paraguai, Chile, Bolívia e Peru.

A Patro Seguros atende clientes de Guarulhos, São Paulo e região com orientação consultiva: analisamos o roteiro da viagem, comparamos seguradoras parceiras e ajudamos você a escolher prazo e cobertura adequados antes de pegar a estrada. A contratação é rápida e o certificado é enviado digitalmente, pronto para apresentar em fiscalizações e postos de fronteira.`}
      howItWorks={[
        { step: "1", title: "Informe o destino e as datas", description: "Diga o(s) país(es) de destino, datas de ida e volta e o roteiro previsto." },
        { step: "2", title: "Envie os dados do veículo", description: "Documento do veículo, dados do proprietário e do condutor principal." },
        { step: "3", title: "A Patro consulta as opções", description: "Comparamos seguradoras parceiras conforme prazo, país e tipo de veículo." },
        { step: "4", title: "Você recebe orientação e cotação", description: "Explicamos coberturas, exclusões e o melhor prazo para o seu roteiro." },
        { step: "5", title: "Contratação e apólice", description: "Após aprovação, você recebe a apólice/certificado digital pronto para viajar." },
      ]}
      coverages={[
        { title: "Danos materiais a terceiros", description: "Cobertura para prejuízos causados a bens e veículos de terceiros no exterior." },
        { title: "Danos corporais a terceiros", description: "Indenização por lesões corporais ou morte de terceiros decorrentes de acidente." },
        { title: "Responsabilidade civil no exterior", description: "Proteção conforme regras do país visitado e limites da apólice contratada." },
        { title: "Vigência conforme roteiro", description: "Cobertura válida pelo prazo contratado e nos países previstos na apólice." },
        { title: "Assistência conforme seguradora", description: "Orientação e assistência em viagem quando disponíveis na apólice escolhida." },
        { title: "Documento aceito em fronteiras", description: "Certificado reconhecido para fiscalização em postos de fronteira da América do Sul." },
      ]}
      coverageExclusions={[
        "Danos ao próprio veículo do segurado",
        "Roubo ou furto do veículo, salvo cobertura específica em outro seguro",
        "Despesas médicas dos ocupantes do veículo, salvo contratação específica",
        "Multas, infrações ou problemas documentais",
        "Condutor sem habilitação válida",
        "Situações fora das condições da apólice contratada",
      ]}
      pricingInfo={{
        intro: "O valor do Seguro Carta Verde varia conforme o período de cobertura, o tipo de veículo e os países do roteiro. A Patro Seguros compara opções entre seguradoras parceiras para você.",
        factors: [
          "Período de cobertura contratado",
          "Tipo de veículo (passeio, utilitário, moto, caminhonete, van, caminhão)",
          "Países de destino e de passagem",
          "Perfil do condutor e uso do veículo",
        ],
        note: "Os valores exatos, limites e condições dependem da seguradora escolhida. Solicite uma cotação personalizada com a equipe da Patro Seguros.",
      }}
      importantDetails={[
        { title: "Países mais frequentes", content: "Argentina, Uruguai, Paraguai, Chile, Bolívia e Peru. Antes de viajar, confirme as exigências do país de destino e dos países de passagem — a equipe da Patro orienta conforme o roteiro." },
        { title: "Documentos para cotação", content: "Documento do veículo, dados do proprietário, país(es) de destino, data de início e retorno previsto, tipo de veículo e informações do condutor, quando necessário." },
        { title: "Atendimento em Guarulhos e São Paulo", content: "A Patro Seguros atende clientes de Guarulhos, São Paulo e região com orientação presencial, por telefone ou WhatsApp. Ideal para quem sai da Grande SP rumo à América do Sul." },
        { title: "Não substitui o seguro auto", content: "O Carta Verde é uma cobertura específica de responsabilidade civil no exterior. Para proteger o próprio veículo (colisão, roubo, incêndio), verifique o seguro auto contratado." },
        { title: "Contrate com antecedência", content: "O ideal é contratar antes da viagem para evitar problemas em fronteiras, fiscalizações e imprevistos. Emissões de última hora podem atrasar sua viagem." },
      ]}
      tips={[
        "Contrate o Carta Verde antes de sair de casa — na fronteira, a contratação costuma ser mais cara e burocrática.",
        "Imprima o certificado e leve no porta-luvas — alguns países exigem o documento físico em fiscalizações.",
        "Se a viagem ultrapassar o período contratado, renove antes do vencimento para não circular irregular.",
        "Combine com Seguro Viagem para proteção médica, bagagem e cancelamento.",
        "Verifique se seu seguro auto brasileiro tem extensão para o exterior — o Carta Verde continua obrigatório.",
        "Confirme com a Patro as exigências específicas de cada país do roteiro antes de emitir a apólice.",
      ]}
      whoNeeds={[
        "Pessoas que vão viajar de carro próprio para a América do Sul",
        "Famílias em viagem internacional de carro",
        "Motoristas que cruzam fronteiras a trabalho",
        "Empresas com veículos em trânsito internacional",
        "Proprietários de carros, motos, vans, utilitários e caminhonetes",
        "Clientes de Guarulhos, São Paulo e região com destino ao Mercosul",
      ]}
      whyPatro={[
        "Atendimento consultivo em Guarulhos e São Paulo",
        "Corretora experiente, com parceria com as principais seguradoras",
        "Orientação antes da viagem, com análise do roteiro",
        "Comparação entre seguradoras parceiras para melhor custo-benefício",
        "Atendimento rápido pelo WhatsApp, sem complicação",
        "Apoio para escolher prazo e cobertura adequados",
        "Suporte também para clientes de seguro auto, viagem, residencial ou empresarial",
      ]}
      faqs={[
        { question: "O Seguro Carta Verde é obrigatório?", answer: "Em vários casos, sim. Ele pode ser exigido para circulação de veículo brasileiro em países da América do Sul. A exigência pode variar conforme destino e rota — confirme com a Patro Seguros antes de viajar." },
        { question: "A Carta Verde cobre meu próprio carro?", answer: "Não. A Carta Verde é voltada principalmente para responsabilidade civil contra terceiros no exterior. Para proteger o próprio veículo, é necessário verificar o seguro auto contratado e possíveis extensões de perímetro." },
        { question: "Posso contratar Seguro Carta Verde em Guarulhos?", answer: "Sim. A Patro Seguros atende clientes de Guarulhos, São Paulo e região com cotação e orientação para Seguro Carta Verde, presencialmente, por telefone ou pelo WhatsApp." },
        { question: "Quais países aceitam ou exigem Carta Verde?", answer: "O seguro é comumente relacionado a viagens para Argentina, Uruguai, Paraguai, Chile, Bolívia e Peru. É importante confirmar as exigências conforme o roteiro e os países de passagem." },
        { question: "Quanto tempo dura o Seguro Carta Verde?", answer: "A vigência depende do período contratado e das condições da seguradora. O ideal é contratar conforme as datas reais da viagem, cobrindo ida, permanência e retorno." },
        { question: "Preciso contratar com antecedência?", answer: "Sim. O ideal é contratar antes da viagem para evitar problemas em fronteiras, fiscalizações ou imprevistos. Emissões de última hora podem atrasar a saída." },
        { question: "Posso fazer tudo pelo WhatsApp?", answer: "Sim. A Patro Seguros pode orientar a cotação e contratação pelo WhatsApp, de forma rápida e prática, com envio digital da apólice." },
        { question: "Preciso de Carta Verde para viajar para a Argentina?", answer: "Sim, a Carta Verde é o seguro comumente exigido para entrada e circulação de veículo brasileiro na Argentina. Verifique com a Patro as regras vigentes antes de viajar." },
      ]}
      relatedInsurances={[
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Consórcio", link: "/consorcio" },
        { title: "Seguro de Frota", link: "/seguro-frota" },
        { title: "Contato", link: "/contato" },
        { title: "Blog", link: "/blog" },
      ]}
    />
  );
};

export default SeguroCartaVerde;
