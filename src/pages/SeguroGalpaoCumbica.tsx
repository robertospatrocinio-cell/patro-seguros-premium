import LocalPageTemplate from "@/components/LocalPageTemplate";
import heroImg from "@/assets/hero-seguro-galpoes.webp";

/**
 * Fase 4 — Nicho defensável: seguro de galpão em Cumbica.
 * Área de menor concorrência com alta demanda pelo polo logístico e GRU.
 */
const SeguroGalpaoCumbica = () => (
  <LocalPageTemplate
    slug="seguro-galpao-cumbica"
    title="Seguro de Galpão em Cumbica, Guarulhos"
    subtitle="Proteção patrimonial para galpões logísticos no entorno do GRU Airport, com cobertura contra incêndio, roubo, RC e lucros cessantes."
    metaDescription="Seguro de galpão em Cumbica: cotação com 6+ seguradoras, cobertura para incêndio, roubo de mercadoria, RC e lucros cessantes. Corretora Patro em Guarulhos."
    icon="🏢"
    city="Guarulhos"
    neighborhood="Cumbica"
    geo={{ latitude: -23.4356, longitude: -46.4731 }}
    heroImage={heroImg}
    description="Cumbica concentra o maior polo logístico de Guarulhos — galpões modulares, condomínios logísticos e operadores de e-commerce que abastecem o GRU Airport. Nesse cenário, um sinistro sem seguro correto quebra a operação."
    detailedDescription={`O CEP de Cumbica tem sinistralidade acima da média de Guarulhos para roubo de mercadoria em trânsito e incêndio em galpão, principalmente onde há armazenamento de eletrônicos, cosméticos, autopeças e bebidas. Nossa subscrição aqui exige três camadas: (1) cobertura patrimonial do imóvel (incêndio, raio, explosão, vendaval), (2) cobertura de conteúdo/estoque com sublimite realista de roubo e furto qualificado e (3) lucros cessantes para bancar folha e aluguel durante a reconstrução.

Trabalhamos com Porto Empresarial, Tokio Marine, Allianz, HDI, Chubb e Zurich em Cumbica. Antes de emitir a apólice, fazemos vistoria com relatório de brigada, hidrantes, sprinklers, CFTV e controle de acesso — porque a diferença entre uma apólice barata que "explode" no sinistro e uma apólice bem calibrada normalmente está em cláusulas que a maioria dos corretores ignora (compartimentação, distância entre lotes, gerenciamento de risco).`}
    pricing={{
      intro: "Prêmio anual de seguro para galpão em Cumbica costuma ficar entre R$ 0,08 e R$ 0,25 por R$ 100 de LMI (limite máximo de indenização), dependendo do risco e do estoque armazenado.",
      factors: [
        "Área construída e material construtivo (alvenaria vs pré-moldado vs metálico)",
        "Tipo de mercadoria armazenada (eletrônicos > cosméticos > alimentos secos)",
        "Presença de brigada, hidrantes, sprinklers e CFTV com gravação",
        "Distância até corpo de bombeiros e ao aeroporto",
        "Histórico de sinistros (frequência e severidade) nos últimos 5 anos",
      ],
      note: "Galpões com AVCB atualizado, sprinkler e gerenciamento de risco podem reduzir prêmio em até 35%. Solicite vistoria consultiva gratuita.",
      range: { min: 3800, max: 42000 },
    }}
    faqs={[
      { question: "Seguro de galpão em Cumbica cobre roubo de mercadoria armazenada?", answer: "Sim, mas com sublimite específico. A cobertura básica de incêndio/raio/explosão é padrão; roubo qualificado de estoque é adicional contratado com sublimite (normalmente 20–40% do LMI patrimonial). Para operações de e-commerce com estoque acima de R$ 2 milhões em Cumbica, recomendamos sublimite de roubo de pelo menos R$ 500 mil combinado com gerenciamento de risco (CFTV 24h + monitoramento remoto)." },
      { question: "Preciso de RC (Responsabilidade Civil) para operar galpão em Cumbica?", answer: "Sim, é praticamente obrigatório. RC Operações protege contra danos a terceiros no galpão (visitantes, prestadores, motoristas de coleta). RC Empregador cobre acidentes com funcionários acima do INSS. Para operadores logísticos que fazem armazenagem de terceiros, é preciso RC de guarda de bens (DDR — Depositário) — sem ela, uma perda total do estoque de um cliente vira ação regressiva contra sua empresa." },
      { question: "Como funciona lucros cessantes para galpão em Cumbica?", answer: "Cobre a receita perdida enquanto o galpão está inoperante após sinistro coberto. Cobertura típica: 6 a 12 meses de faturamento bruto, com franquia de 15–30 dias. Para operações que faturam R$ 500 mil/mês, uma apólice com R$ 3 milhões de lucros cessantes custa cerca de R$ 4.800–8.500/ano — trocado por continuidade operacional durante reconstrução (que costuma levar 4–9 meses)." },
      { question: "Galpão modular ou pré-moldado tem seguro mais caro?", answer: "Sim. Estruturas metálicas ou pré-moldadas têm prêmio 15–40% maior que alvenaria, porque em incêndio prolongado a estrutura colapsa e amplifica a perda. Mitigação: sprinkler automático, compartimentação por parede corta-fogo e brigada treinada podem neutralizar boa parte do agravamento." },
      { question: "Preciso de AVCB para contratar seguro em Cumbica?", answer: "Não é obrigatório para emissão, mas seguradoras cobram até 25% a mais de prêmio para galpões sem AVCB e algumas negam sinistro se a ausência de AVCB tiver relação com o dano (ex.: falta de hidrante em incêndio). Nossa recomendação é sempre regularizar AVCB antes da renovação — reduz prêmio e blinda o pagamento." },
      { question: "Qual seguradora atende melhor galpão logístico em Cumbica?", answer: "Depende do porte e do estoque. Para galpões até R$ 5 milhões de LMI, Porto Empresarial e Tokio Marine costumam ganhar em preço. Acima disso, Allianz, HDI e Chubb têm melhor apetite. Para operações com carga de alto valor agregado (eletrônicos, cosméticos) ou operação 24h, Zurich e Chubb têm produtos com sublimites mais generosos e RC de guarda mais robusta." },
    ]}
    insurers={[
      { name: "Porto Empresarial", highlight: "Melhor custo-benefício para galpões até R$ 5 mi de LMI, franquia flexível" },
      { name: "Tokio Marine", highlight: "Apetite alto para logística de e-commerce e prazo curto de vistoria" },
      { name: "Allianz", highlight: "Cobertura robusta para grandes riscos e RC Empregador ampliada" },
      { name: "HDI Empresarial", highlight: "Especialista em galpões metálicos com sprinkler" },
      { name: "Chubb", highlight: "Ideal para carga de alto valor (eletrônicos, cosméticos) e operação 24h" },
      { name: "Zurich", highlight: "RC Guarda de Bens (Depositário) ampla para operadores logísticos" },
    ]}
    testimonials={[
      { author: "Marcelo R.", neighborhood: "Cumbica", quote: "Reestruturamos a apólice do galpão de eletrônicos com a Patro. Colocaram sprinkler no laudo, reduziram prêmio em 22% e ampliaram sublimite de roubo para o dobro. Sinistro pequeno em 2026 foi pago em 21 dias.", rating: 5 },
      { author: "Patrícia M.", neighborhood: "Cumbica", quote: "Operamos armazenagem para terceiros. A Patro incluiu RC Depositário na apólice, coisa que 2 corretoras anteriores nem mencionaram. Descobri que estava exposto a milhões em ação regressiva.", rating: 5 },
    ]}
    realScenarios={[
      { title: "Incêndio em galpão vizinho com propagação parcial", description: "Galpão de 2.400 m² em Cumbica sofreu propagação de incêndio originado no lote ao lado. Cobertura de incêndio + lucros cessantes de 6 meses permitiu reconstrução parcial da estrutura metálica e pagamento de folha durante 5 meses de reforma. Sem lucros cessantes, operação teria fechado." },
      { title: "Roubo qualificado com arrombamento noturno de portão", description: "E-commerce com estoque de smartphones sofreu roubo de R$ 380 mil em uma madrugada. CFTV com gravação em nuvem + laudo policial + sublimite de roubo qualificado de R$ 500 mil garantiram indenização integral em 45 dias — permitindo recomposição de estoque para Black Friday." },
      { title: "RC de guarda de bens acionada por sinistro de cliente", description: "Operador logístico teve enchente em rua adjacente que atingiu docas do galpão, danificando mercadoria de 3 clientes. RC Depositário absorveu R$ 620 mil em ações — sem essa cobertura, seria pagamento do bolso ou judicialização." },
    ]}
    coverages={[
      { title: "Incêndio, raio e explosão", description: "Cobertura patrimonial padrão para a estrutura do galpão e conteúdo. Base obrigatória de qualquer apólice." },
      { title: "Roubo e furto qualificado de estoque", description: "Sublimite específico para mercadoria armazenada. Requer CFTV + controle de acesso comprovados." },
      { title: "Lucros cessantes", description: "Receita perdida durante inoperância pós-sinistro. Essencial para galpões com folha fixa e contratos ativos." },
      { title: "RC Operações + Empregador + Guarda de Bens", description: "Protege contra ações de terceiros, funcionários e clientes com mercadoria armazenada." },
      { title: "Vendaval, alagamento e danos elétricos", description: "Cobre eventos climáticos e queima de equipamentos por variação de tensão — comum no polo logístico." },
      { title: "Equipamentos eletrônicos e empilhadeiras", description: "Cobertura para racks, scanners, esteiras, empilhadeiras e sistemas WMS." },
    ]}
    whoNeeds={[
      "Operadores logísticos com galpão próprio ou alugado em Cumbica",
      "E-commerces com centro de distribuição no entorno do GRU",
      "Transportadoras que fazem armazenagem antes do transporte aéreo",
      "Importadores e exportadores com estoque em condomínio logístico",
      "Indústrias com galpão de matéria-prima e produto acabado",
    ]}
    whyPatro={[
      "Sede em Guarulhos (Cidade Maia) a 15 min de Cumbica — vistoria in loco",
      "Concorrência entre 6+ seguradoras em cada renovação",
      "Gestão de risco: apoio em AVCB, brigada, gerenciamento de gates",
      "Acompanhamento de sinistro presencial da vistoria à indenização",
      "Experiência com apólices de LMI acima de R$ 20 milhões",
    ]}
    tips={[
      "Regularize AVCB antes da renovação — reduz prêmio em até 15%",
      "Instale sprinkler nas áreas de estoque de alto valor — reduz prêmio em até 20%",
      "Contrate lucros cessantes de pelo menos 6 meses para operação contínua",
      "Revise anualmente o LMI conforme cresce o estoque — subseguro é a causa nº 1 de indenização parcial",
    ]}
    nearbyAreas={[
      { name: "Aeroporto de Guarulhos (GRU)", link: "/seguros-guarulhos/aeroporto-guarulhos" },
      { name: "Cidade Industrial Satélite", link: "/seguros-guarulhos/cidade-industrial-satelite" },
      { name: "Jardim Cumbica", link: "/seguros-guarulhos/jardim-cumbica" },
      { name: "Bonsucesso", link: "/seguros-guarulhos/bonsucesso" },
    ]}
    relatedInsurances={[
      { title: "Seguro de Frota para Transportadoras", link: "/seguro-frota" },
      { title: "Seguro de Transporte e Carga", link: "/seguro-transporte-carga-guarulhos" },
      { title: "Seguro Empresarial em Guarulhos", link: "/seguro-empresarial-guarulhos" },
      { title: "Hub de Seguros em Guarulhos", link: "/seguros-em-guarulhos" },
    ]}
    whatsappMessage="Olá! Quero uma cotação de seguro para galpão em Cumbica. Podemos agendar vistoria consultiva?"
  />
);

export default SeguroGalpaoCumbica;