import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-bike.webp";

const SeguroBike = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Bike"
      subtitle="Proteção completa para sua bicicleta contra roubo, furto e acidentes — urbana, speed, MTB, gravel e elétrica"
      icon="🚲"
      metaDescription="Seguro Bike para bicicletas urbanas, speed, MTB, gravel e elétricas. Proteção contra roubo, furto e danos acidentais. A partir de R$ 12/mês. Cotação grátis Patro Seguros."
      description="O Seguro Bike protege sua bicicleta — urbana, speed, MTB, gravel ou elétrica — contra roubo, furto qualificado, danos acidentais, acidentes pessoais do ciclista e responsabilidade civil. Com o crescimento do ciclismo no Brasil e o aumento do valor das bicicletas, proteger seu investimento deixou de ser opcional."
      detailedDescription={`O ciclismo no Brasil vive um momento de crescimento acelerado. Segundo a Aliança Bike, o mercado de bicicletas movimentou mais de R$ 3 bilhões em 2024, com aumento expressivo nas categorias premium e elétricas. Bicicletas de alta performance custam entre R$ 5.000 e R$ 80.000, e e-bikes podem ultrapassar R$ 30.000 — investimentos que merecem proteção adequada.

Infelizmente, o roubo e furto de bicicletas também cresceu proporcionalmente. Grandes centros urbanos como São Paulo, Rio de Janeiro, Curitiba e Guarulhos registram milhares de ocorrências por ano. Bikes estacionadas em áreas públicas, em garagens de condomínios e até durante pedaladas são alvo constante. Sem seguro, o prejuízo recai integralmente sobre o ciclista.

O Seguro Bike da Patro Seguros oferece coberturas personalizadas para cada tipo de uso e bicicleta. Para ciclistas urbanos que usam a bike como transporte diário, focamos em roubo e furto qualificado. Para praticantes de MTB e trilhas, priorizamos danos acidentais e acidentes pessoais. Para atletas de speed e road bike, incluímos cobertura durante provas e competições. E para proprietários de e-bikes, oferecemos proteção específica para motor e bateria.

Trabalhamos com seguradoras especializadas no segmento ciclístico — como Bike Registrada, Véli Seguros e outras — que entendem as particularidades do mercado e oferecem processos de sinistro simplificados. Diferente de seguradoras generalistas, essas empresas conhecem os modelos, componentes e valores de mercado de cada tipo de bicicleta.

A contratação é simples: basta informar marca, modelo, ano e valor da bike (nota fiscal ou avaliação), escolher as coberturas desejadas e receber a cotação em minutos. A apólice pode ser emitida no mesmo dia, com vigência imediata. Em caso de sinistro, o processo é ágil e a indenização ocorre em prazo médio de 15 a 30 dias.`}
      howItWorks={[
        { step: "1", title: "Informações da bike", description: "Informe marca, modelo, ano, valor e tipo de uso (urbano, esportivo, competição). Tenha a nota fiscal ou laudo de avaliação em mãos." },
        { step: "2", title: "Escolha as coberturas", description: "Selecione as proteções: roubo/furto, danos acidentais, acidentes pessoais, RC, acessórios e cobertura para provas." },
        { step: "3", title: "Cotação em minutos", description: "A Patro consulta seguradoras especializadas em bikes e retorna com as melhores opções de preço e cobertura." },
        { step: "4", title: "Contratação digital", description: "Apólice emitida digitalmente no mesmo dia. Proteção com vigência imediata, sem burocracia." },
        { step: "5", title: "Sinistro simplificado", description: "Em caso de roubo, dano ou acidente, acione o seguro pelo app ou telefone. Processo simples e indenização ágil." },
      ]}
      coverages={[
        { title: "Roubo e Furto Qualificado", description: "Proteção contra roubo (com violência) e furto qualificado (com arrombamento) da bicicleta em qualquer local — durante pedaladas, estacionada ou em transporte." },
        { title: "Danos Acidentais", description: "Cobertura para danos causados por quedas, colisões, tombamentos e acidentes durante o uso. Ideal para praticantes de MTB, gravel e trilhas técnicas." },
        { title: "Acidentes Pessoais do Ciclista", description: "Indenização por morte acidental, invalidez permanente total ou parcial e reembolso de despesas médico-hospitalares do ciclista." },
        { title: "Responsabilidade Civil", description: "Cobertura para danos materiais e corporais causados a terceiros (pedestres, outros ciclistas, veículos) durante a prática do ciclismo." },
        { title: "Transporte da Bike", description: "Proteção durante o transporte da bicicleta em veículos, ônibus, trem e avião — essencial para cicloturistas e atletas que viajam com a bike." },
        { title: "Acessórios e Componentes", description: "Cobertura para GPS (Garmin, Wahoo), velocímetro, capacete, sapatilhas, rodas de carbono, grupo eletrônico e outros componentes de valor." },
        { title: "Assistência 24h para Ciclista", description: "Resgate do ciclista e da bike em caso de pane mecânica, acidente ou mal-estar durante pedalada. Transporte até residência ou oficina." },
        { title: "Participação em Provas e Competições", description: "Cobertura durante competições oficiais, provas amadoras, granfondos, ultramaratonas e eventos ciclísticos organizados." },
      ]}
      coverageExclusions={[
        "Furto simples (sem arrombamento ou violência) — apenas furto qualificado é coberto",
        "Desgaste natural de componentes: freios, pneus, corrente, câmbio e cabos",
        "Bike deixada em local público sem trava/cadeado homologado (U-lock ou corrente de aço)",
        "Uso profissional de entrega (iFood, Rappi) sem declaração específica na apólice",
        "Danos estéticos que não comprometam a funcionalidade (riscos superficiais)",
        "Bicicletas sem nota fiscal ou comprovação de propriedade válida",
        "Modificações não declaradas que alterem o valor segurado",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro Bike varia de 5% a 15% do valor da bicicleta ao ano, dependendo das coberturas, tipo de uso e região. A Patro compara seguradoras especializadas para encontrar o melhor custo-benefício para cada perfil de ciclista.",
        factors: [
          "Valor da bicicleta (nota fiscal ou avaliação atualizada)",
          "Tipo de uso: urbano/commute, esportivo recreativo, competição ou entrega",
          "Coberturas escolhidas: pacote básico (roubo) vs completo (roubo + danos + AP + RC)",
          "Região de utilização: cidades com maior índice de roubo têm taxas mais altas",
          "Tipo de trava/cadeado utilizado (U-lock homologado reduz o prêmio)",
          "Se é e-bike: motor e bateria aumentam o valor segurado em 20-40%",
          "Histórico do segurado: ciclistas sem sinistros anteriores têm desconto",
        ],
        note: "Exemplos reais: Bike urbana de R$ 3.000 → a partir de R$ 150/ano (R$ 12,50/mês). Road bike de R$ 10.000 → entre R$ 500 e R$ 1.500/ano. MTB full suspension de R$ 20.000 → entre R$ 1.000 e R$ 3.000/ano. E-bike de R$ 25.000 → entre R$ 1.250 e R$ 3.750/ano.",
      }}
      realScenarios={[
        { title: "Roubo de road bike durante pedalada matinal em São Paulo", description: "Um ciclista foi abordado por dois assaltantes em moto durante pedalada na Marginal Pinheiros e teve sua Specialized Tarmac de R$ 25.000 levada. Com seguro contratado pela Patro, a indenização integral foi paga em 15 dias úteis. Sem seguro, o prejuízo seria total." },
        { title: "Queda em trilha com danos em quadro de carbono", description: "Um praticante de MTB sofreu queda técnica em trilha em Campos do Jordão, danificando o quadro de carbono e as rodas de sua bike de R$ 18.000. O reparo ficaria em R$ 9.500. O seguro de danos acidentais cobriu 100% do custo, e a bike foi reparada em oficina autorizada." },
        { title: "Acidente urbano com pedestre — RC evitou processo", description: "Um ciclista commuter em Guarulhos colidiu acidentalmente com um pedestre em uma ciclovia, causando fratura no braço do terceiro. As despesas médicas somaram R$ 14.000. O Responsabilidade Civil do seguro cobriu integralmente, evitando um processo judicial contra o ciclista." },
        { title: "Furto de e-bike em garagem de condomínio", description: "Uma e-bike Caloi E-Vibe de R$ 12.000 foi furtada da garagem de um condomínio em Guarulhos (furto qualificado com arrombamento do bicicletário). O seguro indenizou o valor integral em 20 dias. O proprietário usou o valor para adquirir um modelo atualizado." },
        { title: "Danos durante transporte aéreo para prova", description: "Um atleta amador despachou sua bike para participar de uma granfondo no Nordeste. A bike chegou com danos graves na mala de transporte. A cobertura de transporte reembolsou R$ 6.000 em reparos, incluindo rodas e guidão de carbono." },
      ]}
      importantDetails={[
        { title: "Trava homologada: requisito obrigatório para cobertura de roubo/furto", content: "A maioria das seguradoras exige o uso de cadeado ou trava homologada (U-lock de aço temperado ou corrente de aço com cadeado) para validar a cobertura quando a bike está estacionada. Travas de cabo fino não são aceitas. Marcas recomendadas: Kryptonite, Abus e OnGuard. O investimento em uma boa trava (R$ 150-400) pode ser decisivo na hora do sinistro.\n\nAlgumas seguradoras oferecem desconto no prêmio para ciclistas que comprovem uso de trava U-lock nível máximo de segurança." },
        { title: "Nota fiscal ou laudo de avaliação: como comprovar valor", content: "Para contratar o seguro, é necessário comprovar a propriedade e o valor da bike. A nota fiscal é o documento ideal e mais aceito. Na ausência, algumas seguradoras aceitam laudo de avaliação emitido por loja especializada ou avaliador credenciado.\n\nPara bikes montadas com peças individuais (custom builds), é necessário apresentar as notas fiscais de cada componente ou um laudo detalhado com fotos e especificações." },
        { title: "Bikes elétricas (e-bikes): coberturas específicas", content: "E-bikes possuem motor e bateria que representam entre 30% e 50% do valor total da bicicleta. Certifique-se de que esses componentes estão incluídos no valor segurado. Algumas seguradoras oferecem cobertura específica para defeitos elétricos (curto-circuito, superaquecimento) além das coberturas padrão.\n\nBaterias de lítio têm vida útil limitada (geralmente 500-800 ciclos). O seguro não cobre desgaste natural da bateria, mas sim danos por surtos elétricos, queda e alagamento." },
        { title: "Seguro para bicicleta de entrega (delivery)", content: "Ciclistas que usam a bike para entregas (iFood, Rappi, Uber Eats) precisam declarar o uso profissional na apólice. Seguros convencionais podem negar sinistros se o uso profissional não estiver declarado. A Patro trabalha com seguradoras que oferecem coberturas específicas para entregadores ciclistas, incluindo AP com cobertura 24h durante o trabalho." },
      ]}
      tips={[
        "Guarde a nota fiscal da bicicleta em local seguro e digitalize — é o documento mais importante para o seguro e para o B.O.",
        "Invista em uma trava U-lock de qualidade (Kryptonite, Abus) — além de segurança real, é requisito obrigatório de muitas seguradoras",
        "Fotografe sua bike regularmente de vários ângulos, incluindo número de série do quadro — facilita identificação e processo de sinistro",
        "Registre sua bike em plataformas como Bike Registrada — aumenta as chances de recuperação e agiliza o sinistro",
        "Se você tem mais de uma bike, pergunte sobre desconto progressivo — segurar 2+ bicicletas na mesma apólice pode reduzir 10-15%",
        "Avise a seguradora se mudar o tipo de uso (ex: começar a competir ou fazer entregas) para manter a cobertura válida",
        "Para cicloturismo internacional, verifique se a cobertura tem validade no exterior ou contrate seguro viagem complementar",
      ]}
      whoNeeds={[
        "Ciclistas urbanos que usam bike como transporte diário (bike commuters)",
        "Praticantes de mountain bike (MTB), cross-country e enduro",
        "Ciclistas de speed, road bike e triathlon",
        "Praticantes de gravel, cicloturismo e bikepacking",
        "Proprietários de bicicletas elétricas (e-bikes) e speed pedelecs",
        "Atletas amadores e competidores de ciclismo",
        "Entregadores que utilizam bicicleta para delivery (iFood, Rappi)",
        "Qualquer pessoa com bicicleta acima de R$ 3.000",
      ]}
      whyPatro={[
        "Cotação rápida e gratuita para qualquer tipo de bicicleta — urbana, esportiva ou elétrica",
        "Parceria com seguradoras especializadas no segmento ciclístico",
        "Coberturas personalizadas para cada perfil: commuter, MTB, road, gravel ou delivery",
        "Processo de sinistro simplificado — abertura por app ou telefone",
        "Atendimento humanizado por consultores que entendem o universo ciclístico",
        "Cobertura nacional para pedaladas em qualquer cidade do Brasil",
        "Preços acessíveis: a partir de R$ 12,50/mês para bikes urbanas",
      ]}
      faqs={[
        { question: "Quanto custa seguro de bicicleta em 2025?", answer: "O valor varia de 5% a 15% do valor da bike ao ano. Bike urbana de R$ 3.000: a partir de R$ 150/ano (R$ 12,50/mês). Road bike de R$ 10.000: entre R$ 500 e R$ 1.500/ano. MTB de R$ 20.000: entre R$ 1.000 e R$ 3.000/ano. E-bike de R$ 25.000: a partir de R$ 1.250/ano." },
        { question: "O seguro cobre bicicleta elétrica (e-bike)?", answer: "Sim! E-bikes podem ser seguradas com coberturas específicas para motor e bateria elétrica, além das coberturas padrão de roubo, danos e acidentes pessoais." },
        { question: "Preciso de nota fiscal para fazer seguro de bike?", answer: "Sim, a nota fiscal é o documento ideal para comprovar propriedade e valor. Sem nota, algumas seguradoras aceitam laudo de avaliação de loja especializada. Para bikes custom, apresente notas de cada componente." },
        { question: "O seguro bike cobre roubo durante pedalada?", answer: "Sim. A cobertura de roubo vale tanto durante o uso (pedalada) quanto com a bike estacionada e presa com trava homologada. É a cobertura mais acionada." },
        { question: "Seguro de bicicleta cobre acidentes do ciclista?", answer: "Sim, a cobertura de Acidentes Pessoais (AP) inclui despesas médico-hospitalares, invalidez permanente e morte acidental. Ideal para praticantes de MTB, trilhas e ciclismo urbano." },
        { question: "O seguro cobre bike durante competição ou prova?", answer: "Sim, existem coberturas específicas para participação em provas, granfondos, ultramaratonas e eventos ciclísticos. Informe na contratação se você participa de competições." },
        { question: "Posso segurar mais de uma bicicleta?", answer: "Sim! Muitas seguradoras oferecem desconto progressivo de 10-15% para múltiplas bicicletas na mesma apólice. Ideal para ciclistas com bike de treino e de competição." },
        { question: "O seguro bike cobre transporte em avião?", answer: "Sim, a cobertura de transporte protege a bike durante deslocamento em veículos, ônibus, trem e avião. Essencial para cicloturistas e atletas que viajam." },
      ]}
      relatedInsurances={[
        { title: "Seguro Jet Ski", link: "/seguro-jetski" },
        { title: "Seguro Celular", link: "/seguro-celular" },
        { title: "Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
      ]}
    />
  );
};

export default SeguroBike;
