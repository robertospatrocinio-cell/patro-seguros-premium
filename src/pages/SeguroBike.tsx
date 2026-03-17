import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-bike.webp";

const SeguroBike = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Bike"
      subtitle="Proteção completa para sua bicicleta contra roubo, furto e acidentes"
      icon="🚲"
      metaDescription="Seguro Bike para bicicletas urbanas, speed, MTB e elétricas. Proteção contra roubo, furto e danos acidentais. Cotação grátis Patro Seguros."
      description="O Seguro Bike protege sua bicicleta — urbana, speed, MTB, gravel ou elétrica — contra roubo, furto, danos acidentais e muito mais."
      detailedDescription={`O ciclismo no Brasil vive um momento de crescimento acelerado. Cada vez mais pessoas adotam a bicicleta como meio de transporte, esporte e lazer. Com isso, os investimentos em bikes de alta performance cresceram: é comum encontrar bicicletas custando de R$ 5.000 a R$ 80.000 ou mais. Infelizmente, o roubo de bicicletas também acompanhou esse crescimento.

O Seguro Bike protege seu investimento contra os principais riscos: roubo e furto qualificado (com arrombamento), danos acidentais (quedas, colisões), acidentes pessoais do ciclista e até responsabilidade civil por danos a terceiros. Para bikes elétricas, existem coberturas específicas para motor e bateria.

Na Patro Seguros, trabalhamos com seguradoras especializadas no segmento de bikes, oferecendo coberturas personalizadas para cada tipo de uso — urbano, trail, road, gravel ou competição. O processo de cotação é rápido e a contratação descomplicada.`}
      howItWorks={[
        { step: "1", title: "Informações da Bike", description: "Informe marca, modelo, ano, valor e tipo de uso da sua bicicleta. Precisamos da nota fiscal ou laudo de avaliação" },
        { step: "2", title: "Escolha as Coberturas", description: "Selecione as proteções desejadas: roubo, danos acidentais, acidentes pessoais, RC e acessórios" },
        { step: "3", title: "Cotação Rápida", description: "Receba a cotação em minutos com as melhores seguradoras especializadas em bikes" },
        { step: "4", title: "Pedale Protegido", description: "Em caso de sinistro, acione o seguro com processo simples e receba a indenização com agilidade" },
      ]}
      coverages={[
        { title: "Roubo e Furto Qualificado", description: "Proteção contra roubo e furto da bicicleta em qualquer local, inclusive durante pedaladas" },
        { title: "Danos Acidentais", description: "Cobertura para danos causados por quedas, colisões e acidentes durante o uso" },
        { title: "Acidentes Pessoais do Ciclista", description: "Indenização por morte acidental, invalidez permanente e despesas médicas do ciclista" },
        { title: "Responsabilidade Civil", description: "Cobertura para danos causados a terceiros durante a prática do ciclismo" },
        { title: "Transporte da Bike", description: "Proteção durante o transporte da bicicleta em veículos, ônibus e avião" },
        { title: "Acessórios e Componentes", description: "Cobertura para GPS, velocímetro, capacete, sapatilhas e outros acessórios" },
        { title: "Assistência 24h", description: "Guincho/resgate da bike e do ciclista em caso de pane mecânica ou acidente" },
        { title: "Participação em Provas", description: "Cobertura durante competições, provas e eventos ciclísticos" },
      ]}
      coverageExclusions={[
        "Furto simples (sem arrombamento ou violência) — apenas furto qualificado",
        "Desgaste natural e manutenção preventiva (freios, pneus, corrente)",
        "Bike deixada em local público sem trava/cadeado homologado",
        "Uso profissional de entrega sem declaração específica",
        "Danos estéticos que não comprometam a funcionalidade",
        "Bicicletas sem nota fiscal ou comprovação de propriedade",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro Bike varia de 5% a 15% do valor da bicicleta ao ano, dependendo das coberturas e perfil de uso.",
        factors: [
          "Valor da bicicleta (nota fiscal ou avaliação)",
          "Tipo de uso: urbano, esportivo, competição ou entrega",
          "Coberturas escolhidas (roubo, danos, AP, RC)",
          "Região de utilização (cidades com maior roubo são mais caras)",
          "Tipo de trava/cadeado utilizado",
          "Se é e-bike (motor e bateria aumentam o valor segurado)",
        ],
        note: "Uma bike de R$ 10.000 pode custar entre R$ 500 e R$ 1.500/ano (R$ 42 a R$ 125/mês). Uma e-bike de R$ 25.000: de R$ 1.250 a R$ 3.750/ano. Bikes urbanas de R$ 3.000: a partir de R$ 150/ano (R$ 12,50/mês).",
      }}
      realScenarios={[
        { title: "Roubo durante pedalada", description: "Um ciclista foi abordado por assaltantes durante uma pedalada matinal e teve sua bike de R$ 15.000 roubada. O seguro indenizou o valor integral em 15 dias úteis." },
        { title: "Queda em trilha com danos graves", description: "Um praticante de MTB sofreu queda em trilha, danificando quadro de carbono e rodas. O reparo custaria R$ 8.000. O seguro cobriu integralmente os danos." },
        { title: "Acidente com pedestre", description: "Um ciclista urbano colidiu acidentalmente com um pedestre, causando lesões. O RC do seguro cobriu R$ 12.000 em despesas médicas do terceiro." },
      ]}
      importantDetails={[
        { title: "Trava homologada obrigatória", content: "A maioria das seguradoras exige o uso de cadeado/trava homologada (tipo U-lock) para validar a cobertura de roubo quando a bike está estacionada. Verifique os modelos aceitos." },
        { title: "Nota fiscal ou laudo de avaliação", content: "Para contratar o seguro, é necessário comprovar a propriedade e o valor da bike. Nota fiscal é o ideal; na ausência, um laudo de avaliação pode ser aceito por algumas seguradoras." },
        { title: "Bikes elétricas", content: "E-bikes têm coberturas específicas para motor e bateria, que são os componentes mais caros. Certifique-se de que esses itens estão incluídos no valor segurado." },
      ]}
      tips={[
        "Guarde a nota fiscal da bicicleta em local seguro — é o documento mais importante para o seguro",
        "Invista em uma trava U-lock de qualidade — além de segurança, é requisito de muitas seguradoras",
        "Fotografe sua bike regularmente, incluindo número de série do quadro — facilita o processo de sinistro",
        "Se você tem mais de uma bike, pergunte sobre desconto progressivo para múltiplas bicicletas",
        "Avise a seguradora se mudar o tipo de uso (ex: começar a competir) para manter a cobertura válida",
      ]}
      whoNeeds={[
        "Ciclistas urbanos que usam bike para transporte diário",
        "Praticantes de mountain bike e trilhas",
        "Ciclistas de speed e road bike",
        "Proprietários de bicicletas elétricas (e-bikes)",
        "Atletas e competidores de ciclismo",
        "Entregadores que utilizam bicicleta",
        "Praticantes de gravel e cicloturismo",
        "Quem possui bicicletas de alto valor",
      ]}
      whyPatro={[
        "Cotação rápida e gratuita para qualquer tipo de bicicleta",
        "Coberturas personalizadas para seu perfil de uso",
        "Parceria com seguradoras especializadas em bikes",
        "Atendimento humanizado por especialistas",
        "Processo de sinistro simples e ágil",
        "Cobertura nacional para pedaladas em qualquer lugar",
        "Preços acessíveis a partir de R$ 15/mês",
      ]}
      faqs={[
        { question: "Quanto custa o seguro de bicicleta?", answer: "O valor varia de 5% a 15% do valor da bike ao ano. Para uma bicicleta de R$ 10.000, o seguro pode custar entre R$ 500 e R$ 1.500/ano. Faça sua cotação gratuita." },
        { question: "O seguro cobre bicicleta elétrica?", answer: "Sim! Bicicletas elétricas (e-bikes) podem ser seguradas com coberturas específicas, incluindo proteção para motor e bateria elétrica." },
        { question: "Preciso de nota fiscal para contratar o seguro?", answer: "Sim, a nota fiscal é necessária para comprovar a propriedade e o valor da bicicleta. Caso não tenha, algumas seguradoras aceitam laudo de avaliação." },
        { question: "O seguro cobre roubo durante pedalada?", answer: "Sim. A cobertura de roubo vale tanto para a bike parada (presa com cadeado) quanto durante o uso." },
        { question: "O seguro cobre acidentes do ciclista?", answer: "Sim, a cobertura de Acidentes Pessoais inclui despesas médicas, invalidez permanente e morte acidental durante a prática do ciclismo." },
        { question: "Posso segurar mais de uma bicicleta?", answer: "Sim! Você pode segurar todas as suas bikes, muitas vezes com desconto progressivo para mais de uma bicicleta." },
      ]}
      relatedInsurances={[
        { title: "Seguro Celular", link: "/seguro-celular" },
        { title: "Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
      ]}
    />
  );
};

export default SeguroBike;
