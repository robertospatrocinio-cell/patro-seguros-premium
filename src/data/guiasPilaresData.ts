/**
 * Central de Guias Patro Seguros — Fase 2
 * Guias pilares editoriais aprofundados servidos pela rota /guias/:slug.
 * Auto-gerado — editar preservando estrutura.
 */

export interface GuiaSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuiaFAQ { q: string; a: string; }
export interface GuiaRelated { label: string; href: string; description: string; }

export interface GuiaPilar {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  readTime: string;
  updatedAt: string;
  quickAnswer: string;
  commercialHref: string;
  commercialLabel: string;
  whatsappMessage: string;
  sections: GuiaSection[];
  faqs: GuiaFAQ[];
  related: GuiaRelated[];
  category: string;
}

export const GUIA_AUTHOR = { name: "Equipe Patro Seguros", reviewer: "Sandra Patrocínio (SUSEP)" };

export const GUIAS_PILARES: GuiaPilar[] = [
  {
    "slug": "seguro-auto-guarulhos",
    "title": "Guia Completo do Seguro Auto em Guarulhos",
    "h1": "Guia Completo do Seguro Auto em Guarulhos: coberturas, preço e como escolher",
    "metaTitle": "Guia do Seguro Auto em Guarulhos: coberturas, preço e como escolher",
    "metaDescription": "Guia definitivo do seguro auto em Guarulhos: coberturas, franquia, preço médio, seguradoras, assistência 24h e como cotar com um corretor local.",
    "eyebrow": "Guia · Seguro Auto",
    "readTime": "16 min",
    "updatedAt": "2026-07-28",
    "quickAnswer": "Seguro auto em Guarulhos protege contra roubo, colisão, incêndio e danos a terceiros, com assistência 24h e coberturas adicionais como carro reserva, vidros e acessórios. O preço médio varia conforme perfil do condutor, CEP de pernoite, uso do veículo (particular ou app) e histórico de sinistros — a cotação com 16+ seguradoras via corretor local costuma ser a rota mais econômica.",
    "commercialHref": "/seguro-auto",
    "commercialLabel": "Cotar seguro auto agora",
    "whatsappMessage": "Olá, quero cotar seguro auto em Guarulhos com a Patro Seguros.",
    "category": "Seguros para Veículos",
    "sections": [
      {
        "id": "o-que-e",
        "heading": "O que é o seguro auto e o que ele cobre em Guarulhos?",
        "paragraphs": [
          "O seguro auto é o contrato pelo qual uma seguradora se compromete a indenizar o proprietário (ou terceiros) diante de eventos previstos em apólice — como roubo, furto, colisão, incêndio, alagamento e responsabilidade civil por danos causados a outras pessoas. Em Guarulhos, essa proteção ganha peso extra por conta do trânsito intenso na Dutra, Ayrton Senna, Fernão Dias e no entorno do Aeroporto de Cumbica, além dos índices históricos de roubo em corredores de fluxo logístico.",
          "A cobertura básica costuma dividir-se em compreensiva (Casco + Roubo/Furto + Incêndio), RCF-V (danos materiais e corporais a terceiros) e APP (acidentes pessoais de passageiros). Sobre esse núcleo, são contratadas coberturas adicionais como carro reserva, vidros, faróis, retrovisores, acessórios (som, blindagem, engate), assistência 24h e cobertura para condutor de aplicativo.",
          "Nem toda apólice é igual: a mesma seguradora oferece produtos com franquias e limites diferentes para o mesmo veículo, e o valor de mercado tomado como referência é o da Tabela FIPE no momento do sinistro (com percentual ajustado, geralmente 100%)."
        ]
      },
      {
        "id": "quanto-custa",
        "heading": "Quanto custa o seguro auto em Guarulhos?",
        "paragraphs": [
          "O preço final é calculado individualmente pela seguradora com base em variáveis atuariais. Não existe uma tabela única — cada perfil recebe um cálculo distinto, e a diferença entre a cotação mais cara e a mais barata para o mesmo carro pode passar de 60% em Guarulhos.",
          "Os principais fatores que pesam no cálculo são: CEP de pernoite e circulação (bairros com maior índice de sinistros pagam mais), idade e gênero do principal condutor, uso do veículo (particular, comercial ou app), tempo de habilitação, sinistros anteriores, garagem em casa e no trabalho, existência de dispositivo antifurto/rastreador e classe de bônus acumulada.",
          "Um seguro compreensivo para um veículo popular novo em bairro residencial de Guarulhos costuma partir de faixas menores do que um SUV premium em região logística, e o Uber/99 aumenta o prêmio pelo risco de uso intensivo — mas com coberturas ampliadas para o motorista de app."
        ],
        "bullets": [
          "CEP e bairro de pernoite (garagem faz diferença)",
          "Uso: particular, comercial, transporte de passageiros por app",
          "Perfil: idade, gênero, tempo de CNH e histórico",
          "Modelo, ano e valor FIPE do veículo",
          "Equipamento de segurança e rastreador"
        ]
      },
      {
        "id": "coberturas",
        "heading": "Quais coberturas vale a pena contratar?",
        "paragraphs": [
          "Para uso urbano em Guarulhos, o núcleo recomendado é compreensiva + RCF-V robusto (mínimo R$ 100 mil materiais e R$ 100 mil corporais) + APP + assistência 24h com guincho ilimitado (ou pelo menos 400 km). Em veículos financiados, o compreensivo geralmente é exigido pela financeira.",
          "Coberturas adicionais que costumam compensar em Guarulhos: carro reserva (7 a 30 dias), vidros/faróis/retrovisores (sem franquia dedicada em muitos produtos), acessórios (som, engate, película) e cobertura para pequenos reparos (funilaria estética). Blindagem e teto solar devem ser declarados no ato da contratação para não gerar recusa em sinistro.",
          "Motoristas de aplicativo precisam de cobertura APP específica — sem ela, a seguradora pode negar sinistro alegando uso não declarado. A Patro trabalha com produtos desenhados para Uber, 99 e InDrive."
        ]
      },
      {
        "id": "franquia",
        "heading": "Como funciona a franquia e quando ela é aplicada?",
        "paragraphs": [
          "A franquia é a parte que o segurado paga do próprio bolso em sinistros de casco (colisão, incêndio, danos parciais). Em roubo, furto ou perda total, a franquia não se aplica — a seguradora paga 100% do valor de mercado.",
          "Existem três faixas comuns: franquia reduzida (mais barata para o segurado no sinistro, mas prêmio maior), normal (equilibrada) e ampliada (prêmio menor, mais caro no sinistro). A escolha depende do apetite de risco e do orçamento.",
          "Coberturas como vidros e assistência costumam ter franquia própria (ou serem sem franquia, dependendo do produto). Sempre confira a Condição Geral e a Especificação Particular da apólice."
        ]
      },
      {
        "id": "seguradoras",
        "heading": "Quais seguradoras atendem Guarulhos?",
        "paragraphs": [
          "A Patro Seguros é hub credenciado de 16+ seguradoras — Porto Seguro, Azul Seguros, Itaú Seguros, HDI, Allianz, Bradesco Auto, SulAmérica, Tokio Marine, Mapfre, Liberty, Zurich, entre outras. Cada uma tem apetite próprio de risco: algumas são mais competitivas em veículos populares, outras em premium, importados ou motoristas de app.",
          "Cotar em apenas uma seguradora é o principal motivo de as pessoas pagarem caro. O papel do corretor é rodar a mesma proposta em várias e apresentar a melhor combinação preço × cobertura × serviço, considerando ainda o histórico de pagamento de sinistros."
        ]
      },
      {
        "id": "assistencia",
        "heading": "Assistência 24h em Guarulhos: o que exigir?",
        "paragraphs": [
          "Em Guarulhos, com trânsito da Dutra, Ayrton Senna e Fernão Dias, uma assistência 24h consistente é mais valiosa do que 10% de economia no prêmio. Os itens essenciais são: guincho de pelo menos 400 km (ideal ilimitado), pane seca, pane elétrica, chaveiro, troca de pneu e táxi/hospedagem se o veículo ficar imobilizado longe de casa.",
          "Motoristas de app devem exigir também carro reserva com liberação rápida (48h) e cobertura em oficinas 24h próximas ao aeroporto, para não perderem dias de trabalho."
        ]
      },
      {
        "id": "como-cotar",
        "heading": "Como cotar seguro auto com a Patro Seguros?",
        "paragraphs": [
          "O caminho mais rápido é enviar os dados do veículo (placa, chassi ou FIPE), CEP de pernoite, uso, dados do principal condutor e coberturas desejadas pelo WhatsApp ou pelo formulário online. Em até 24h úteis retornamos com 3 a 5 propostas comparadas, destacando franquia, LMI, coberturas adicionais e serviços de assistência.",
          "Após a aprovação, a apólice é emitida em 1 a 3 dias úteis e o pagamento pode ser em cartão, débito recorrente, boleto ou parcelado sem juros (dependendo da seguradora)."
        ]
      },
      {
        "id": "sinistro",
        "heading": "O que fazer em caso de sinistro em Guarulhos?",
        "paragraphs": [
          "Em caso de colisão sem vítimas, faça o Boletim de Ocorrência eletrônico (BO-e da Polícia Civil de SP), fotografe o local, coleta dados dos envolvidos e acione a seguradora ou a Patro pelo canal de sinistros. Em roubo ou furto, o BO presencial é obrigatório e deve ser aberto o mais rápido possível.",
          "A Patro acompanha o sinistro de ponta a ponta: abertura, escolha da oficina referenciada, vistoria, aprovação de peças e acompanhamento até a devolução do veículo. Nossa taxa histórica de indenização é acima da média do mercado por causa desse acompanhamento técnico."
        ]
      },
      {
        "id": "erros",
        "heading": "Erros mais comuns ao contratar seguro auto",
        "paragraphs": [
          "1) Comprar direto pelo site da seguradora sem comparar — geralmente paga mais caro pelo mesmo produto. 2) Omitir o uso real do veículo (Uber, viagens longas, uso comercial), o que pode gerar negativa de sinistro. 3) Não declarar acessórios (som, blindagem, engate). 4) Escolher a franquia mais alta só pelo prêmio menor, sem analisar o risco. 5) Ignorar a assistência 24h e depois ficar na mão em uma pane no meio da Dutra."
        ]
      },
      {
        "id": "conclusao",
        "heading": "Próximos passos",
        "paragraphs": [
          "Se você mora ou trabalha em Guarulhos, o seguro auto correto combina cobertura compreensiva, RCF-V robusto, assistência ampla e franquia coerente com seu bolso. A Patro Seguros cota em 16+ seguradoras e monta a melhor combinação para o seu perfil, com atendimento consultivo antes e depois da contratação.",
          "As coberturas, condições, franquias, carências e valores dependem da apólice, aceitação da seguradora/operadora e perfil de risco. Este conteúdo é educacional e não substitui a análise técnica de um corretor habilitado."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Qual o preço médio do seguro auto em Guarulhos?",
        "a": "Não existe preço fixo: varia por perfil, veículo, uso e CEP. Cotar em 16+ seguradoras com a Patro costuma reduzir de 20% a 60% em relação à cotação direta na seguradora."
      },
      {
        "q": "Posso contratar seguro auto usando o carro para Uber ou 99?",
        "a": "Sim, mas é obrigatório declarar o uso como transporte de passageiros por aplicativo e contratar cobertura APP específica. Omitir esse uso é a principal causa de negativa em sinistro para motoristas de app."
      },
      {
        "q": "O seguro cobre roubo do carro em bairros de Guarulhos?",
        "a": "Sim, a cobertura compreensiva inclui roubo e furto em qualquer local do Brasil, sem franquia. O prêmio, porém, é calculado considerando o CEP de pernoite e a estatística da região."
      },
      {
        "q": "Quanto tempo demora a indenização em caso de perda total?",
        "a": "O prazo regulamentar é de até 30 dias após a entrega de todos os documentos exigidos. Com o acompanhamento da Patro, boa parte dos casos é resolvida em 15 a 20 dias."
      },
      {
        "q": "Vale a pena contratar franquia reduzida?",
        "a": "Vale se você usa muito o carro no trânsito pesado e tem apetite baixo para tirar dinheiro do bolso em sinistros pequenos. Para uso ocasional, a franquia normal ou ampliada costuma ser mais econômica no ano."
      },
      {
        "q": "O seguro auto cobre danos causados por enchente?",
        "a": "Sim, na cobertura compreensiva estão inclusos alagamento, enchente, granizo e queda de árvore — desde que o veículo não esteja em local expressamente proibido ou situação de dolo."
      },
      {
        "q": "É obrigatório ter seguro auto no Brasil?",
        "a": "Não. Apenas o DPVAT (agora Seguro Obrigatório) tem natureza compulsória. O seguro auto tradicional é facultativo, mas altamente recomendado — principalmente em regiões de trânsito intenso como Guarulhos."
      }
    ],
    "related": [
      {
        "label": "Página comercial: Seguro Auto",
        "href": "/seguro-auto",
        "description": "Cotar seguro auto com 16+ seguradoras."
      },
      {
        "label": "Comparativo de coberturas",
        "href": "/seguro-auto/comparativo-coberturas",
        "description": "Compreensiva x terceiros: qual escolher."
      },
      {
        "label": "Seguro para motorista de app",
        "href": "/seguro-motorista-app-guarulhos",
        "description": "Cobertura APP para Uber e 99."
      },
      {
        "label": "Central de Perguntas Frequentes",
        "href": "/perguntas-frequentes-seguros#auto",
        "description": "Dúvidas rápidas sobre seguro auto."
      }
    ]
  },
  {
    "slug": "seguro-empresarial-guarulhos",
    "title": "Guia do Seguro Empresarial em Guarulhos",
    "h1": "Guia do Seguro Empresarial em Guarulhos: coberturas para PME, indústria e comércio",
    "metaTitle": "Seguro Empresarial em Guarulhos: guia completo (PME, indústria, comércio)",
    "metaDescription": "Guia do seguro empresarial em Guarulhos: incêndio, roubo, RC, equipamentos, lucros cessantes e cyber. Como escolher para PME, indústria, comércio e galpão.",
    "eyebrow": "Guia · Empresarial",
    "readTime": "18 min",
    "updatedAt": "2026-07-28",
    "quickAnswer": "Seguro empresarial é uma apólice multirrisco que protege o patrimônio da empresa (prédio, conteúdo, estoque, equipamentos) e a responsabilidade civil frente a terceiros. Em Guarulhos, os produtos mais contratados combinam incêndio + roubo + danos elétricos + RC + equipamentos, com adicionais de lucros cessantes, cyber e vida em grupo para PME.",
    "commercialHref": "/seguro-empresarial",
    "commercialLabel": "Cotar seguro empresarial",
    "whatsappMessage": "Olá, quero cotar seguro empresarial em Guarulhos com a Patro Seguros.",
    "category": "Seguros para Empresas",
    "sections": [
      {
        "id": "o-que-e",
        "heading": "O que é o seguro empresarial e por que sua empresa precisa?",
        "paragraphs": [
          "O seguro empresarial (ou multirrisco empresarial) é uma apólice modular que reúne, em um único contrato, diversas coberturas patrimoniais e de responsabilidade civil pensadas para o dia a dia de comércios, escritórios, clínicas, indústrias, prestadores de serviço e galpões logísticos. É uma proteção contratada por CNPJ e emitida pela seguradora com base no perfil de risco da atividade (CNAE), local, valores em risco e sinistralidade histórica.",
          "Em Guarulhos — sede do Aeroporto Internacional, com forte concentração industrial em Cumbica, Bonsucesso, Vila Endres e nas margens da Dutra — o seguro empresarial é praticamente indispensável. Basta um curto-circuito, um incêndio em galpão vizinho ou um assalto para colocar em risco meses de faturamento, folha de pagamento e a continuidade do negócio."
        ]
      },
      {
        "id": "coberturas",
        "heading": "Quais coberturas o seguro empresarial oferece?",
        "paragraphs": [
          "As coberturas se dividem em básicas (obrigatórias em qualquer apólice), adicionais patrimoniais e responsabilidade civil. A cobertura básica costuma ser incêndio, raio e explosão. As demais são contratadas conforme o risco."
        ],
        "bullets": [
          "Incêndio, raio e explosão (básica)",
          "Vendaval, granizo, queda de aeronave",
          "Danos elétricos (equipamentos e instalações)",
          "Roubo e furto qualificado de bens e valores",
          "Quebra de vidros, letreiros e anúncios luminosos",
          "Responsabilidade Civil Operações (danos a terceiros)",
          "Responsabilidade Civil Empregador",
          "Equipamentos móveis e portáteis",
          "Lucros cessantes por paralisação",
          "Fidelidade de funcionários",
          "Alagamento e inundação"
        ]
      },
      {
        "id": "para-quem",
        "heading": "Para qual tipo de empresa em Guarulhos o seguro é indicado?",
        "paragraphs": [
          "Praticamente qualquer atividade empresarial em Guarulhos se beneficia — mas o desenho da apólice muda muito. Um escritório profissional tem risco patrimonial baixo, mas RC alta. Uma clínica precisa de equipamentos e RC Profissional. Uma indústria em Cumbica exige alta importância segurada em conteúdo, máquinas, estoque e lucros cessantes. Um galpão logístico precisa de proteção contra roubo de cargas, além de RCTR-C se movimenta mercadoria de terceiros.",
          "A Patro Seguros desenha o produto por segmento — comércio, escritório, clínica, indústria, galpão, restaurante, oficina, farmácia, loja de shopping, prestador de serviços — com apetite de risco correto por seguradora."
        ]
      },
      {
        "id": "importancia-segurada",
        "heading": "Como calcular a importância segurada correta?",
        "paragraphs": [
          "A importância segurada (IS) é o teto que a seguradora paga em caso de sinistro. Subdimensionar significa receber menos do que precisa reconstruir; sobre-dimensionar significa pagar prêmio a mais sem necessidade.",
          "A metodologia correta considera: valor de reconstrução do prédio (não o valor de mercado), valor de reposição de máquinas e equipamentos (novo, não depreciado), estoque médio (com pico sazonal em datas críticas como Black Friday e fim de ano) e faturamento mensal para dimensionar lucros cessantes. A Patro faz essa análise antes de cotar."
        ]
      },
      {
        "id": "rc",
        "heading": "Responsabilidade Civil: o risco mais subestimado",
        "paragraphs": [
          "A RC cobre danos materiais e corporais causados a terceiros no exercício da atividade. Uma queda de cliente em piso molhado, um produto que sai defeituoso, um erro de execução em obra ou um acidente de trabalho podem gerar indenizações que superam qualquer patrimônio da empresa.",
          "Recomendamos RC Operações mínima de R$ 500 mil para pequenos negócios e R$ 1 a 5 milhões para empresas de médio porte. RC Empregador e RC Produtos são extensões críticas para indústria e comércio."
        ]
      },
      {
        "id": "lucros-cessantes",
        "heading": "Lucros cessantes: por que é tão importante?",
        "paragraphs": [
          "Um incêndio grave em galpão pode paralisar operações por meses. A cobertura patrimonial paga o prédio e o conteúdo, mas não paga o faturamento perdido, a folha, o aluguel e os custos fixos durante a paralisação. É aí que entra a cobertura de lucros cessantes.",
          "Ela indeniza a margem de lucro e as despesas fixas pelo período de indenização contratado (geralmente 6 a 12 meses). Sem essa cobertura, uma parcela relevante das empresas atingidas por sinistros grandes não consegue reabrir."
        ]
      },
      {
        "id": "cyber",
        "heading": "Seguro Cyber para empresas: quando faz sentido?",
        "paragraphs": [
          "Toda empresa que trata dados pessoais (LGPD), aceita pagamento digital, tem sistema em nuvem ou opera com e-commerce está exposta a incidentes cibernéticos: ransomware, phishing, vazamento e fraude. O Seguro Cyber cobre custos de resposta, notificação, defesa jurídica, multas administrativas e a extorsão em si (dependendo da apólice).",
          "Ver guia dedicado em /guias/seguro-cyber."
        ]
      },
      {
        "id": "documentos",
        "heading": "Documentos necessários para cotar",
        "paragraphs": [
          "Para uma cotação bem calibrada, precisamos de: CNPJ e CNAE, endereço completo, área construída, tipo de construção, valor do imóvel (se próprio) ou aluguel, valores em risco (conteúdo, máquinas, estoque), faturamento anual, número de funcionários, medidas de segurança (alarme, CFTV, brigada, sprinkler), histórico de sinistros e coberturas desejadas."
        ]
      },
      {
        "id": "como-contratar",
        "heading": "Como contratar com a Patro Seguros",
        "paragraphs": [
          "Após o envio dos dados, rodamos a cotação em seguradoras com apetite para o CNAE em questão (nem toda seguradora aceita indústria química, ou galpão com carga inflamável, por exemplo). Em 2 a 5 dias úteis, apresentamos comparativo com franquia, LMI por cobertura, exclusões relevantes e serviços de assistência.",
          "Após aprovação, a apólice é emitida e o pagamento pode ser à vista, boleto ou parcelado. Renovações são acompanhadas anualmente com revisão de IS e coberturas."
        ]
      },
      {
        "id": "erros",
        "heading": "Erros comuns e disclaimers",
        "paragraphs": [
          "Os erros mais frequentes são: contratar apenas incêndio (subestimando roubo, RC e danos elétricos), subestimar a IS de conteúdo/estoque, ignorar lucros cessantes, não declarar depósito de material inflamável ou terceirizado no local e negligenciar renovação anual mesmo com mudança de faturamento.",
          "A Patro Seguros atende Guarulhos, Cumbica, região do Aeroporto Internacional, Cidade Maia, Vila Galvão, Ponte Grande, Bonsucesso e demais bairros, além de contratos em todo o Brasil.",
          "As coberturas, condições, franquias, carências e valores dependem da apólice, aceitação da seguradora/operadora e perfil de risco. Este conteúdo é educacional e não substitui a análise técnica de um corretor habilitado."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Quanto custa um seguro empresarial em Guarulhos?",
        "a": "Depende do CNAE, área, valores em risco e coberturas. Um escritório pequeno pode ter apólice a partir de R$ 100–200/mês; uma indústria em Cumbica pode ultrapassar R$ 3.000/mês. Cotação personalizada é obrigatória."
      },
      {
        "q": "Meu galpão alugado pode ser segurado?",
        "a": "Sim. O locatário pode segurar o conteúdo, estoque, equipamentos, lucros cessantes e RC. O prédio geralmente é seguro pelo proprietário, mas pode ser exigido em contrato de locação."
      },
      {
        "q": "O seguro empresarial cobre roubo de estoque?",
        "a": "Sim, na cobertura de roubo/furto qualificado, desde que a apólice tenha sido contratada com essa cobertura e a IS de conteúdo/estoque esteja compatível."
      },
      {
        "q": "É obrigatório ter seguro empresarial?",
        "a": "Não é obrigatório por lei em regra geral, mas contratos de locação, licitações e financiamentos frequentemente exigem apólices específicas. Condomínios empresariais e shoppings também costumam exigir."
      },
      {
        "q": "O que é o RC Operações?",
        "a": "É a Responsabilidade Civil Operações — cobre danos materiais e corporais causados a terceiros durante o exercício da atividade da empresa (ex.: cliente escorrega dentro da loja)."
      },
      {
        "q": "Preciso de vistoria prévia?",
        "a": "Depende da IS e do risco. Para valores baixos e atividades simples, a maioria das seguradoras aceita sem vistoria. Para indústria, galpão e alta IS, vistoria prévia é comum e chega em poucos dias."
      },
      {
        "q": "Posso incluir vários endereços na mesma apólice?",
        "a": "Sim, é possível emitir apólice multilocalidade com discriminação de IS por endereço. Comum para redes de lojas, franquias e filiais."
      }
    ],
    "related": [
      {
        "label": "Página comercial: Seguro Empresarial",
        "href": "/seguro-empresarial",
        "description": "Cotar apólice multirrisco para empresa."
      },
      {
        "label": "Guia: Seguro Cyber",
        "href": "/guias/seguro-cyber",
        "description": "Proteção contra ataques e vazamento de dados."
      },
      {
        "label": "Guia: Seguros para Consultórios",
        "href": "/guias/seguros-para-consultorios",
        "description": "Aplicação específica para clínicas."
      },
      {
        "label": "Página comercial: Seguro para Galpões",
        "href": "/seguro-galpao",
        "description": "Cobertura para galpões em Cumbica e região."
      }
    ]
  },
  {
    "slug": "plano-de-saude-guarulhos",
    "title": "Guia de Planos de Saúde em Guarulhos",
    "h1": "Guia de Planos de Saúde em Guarulhos: como comparar operadoras, carências e coberturas",
    "metaTitle": "Planos de Saúde em Guarulhos: guia de operadoras, carências e reajustes",
    "metaDescription": "Guia definitivo dos planos de saúde em Guarulhos: comparativo de operadoras, carência, coparticipação, reembolso, reajuste, portabilidade e regras da ANS.",
    "eyebrow": "Guia · Planos de Saúde",
    "readTime": "17 min",
    "updatedAt": "2026-07-28",
    "quickAnswer": "Planos de saúde em Guarulhos são regulados pela ANS e comercializados por operadoras como Amil, Bradesco, SulAmérica, Hapvida, Notre Dame Intermédica, Unimed, entre outras. A escolha correta considera rede credenciada em Guarulhos, carência, coparticipação, reembolso, reajuste e o tipo de contratação (individual, familiar, MEI, PME ou empresarial).",
    "commercialHref": "/plano-de-saude-guarulhos",
    "commercialLabel": "Cotar plano de saúde",
    "whatsappMessage": "Olá, quero cotar plano de saúde em Guarulhos com a Patro Seguros.",
    "category": "Planos de Saúde",
    "sections": [
      {
        "id": "tipos-contratacao",
        "heading": "Quais tipos de contratação existem?",
        "paragraphs": [
          "Os planos podem ser individuais/familiares (raríssimos hoje no mercado brasileiro por decisão das operadoras), coletivos por adesão (via associações e sindicatos), MEI (a partir de 1 vida), PME (2 a 99 vidas) e empresariais (100+ vidas). A modalidade define carência, reajuste, exigências e preço.",
          "Em Guarulhos, a maior parte das contratações hoje é PME e coletivo por adesão, com preços significativamente mais baixos do que o antigo individual e regras de reajuste mais flexíveis (embora menos protegidas pela ANS)."
        ]
      },
      {
        "id": "operadoras",
        "heading": "Quais operadoras atuam em Guarulhos?",
        "paragraphs": [
          "A Patro Seguros é hub credenciado de 20+ operadoras: Amil, Bradesco Saúde, SulAmérica, Hapvida, Notre Dame Intermédica, Unimed, Porto Saúde, Omint, Care Plus, Bradesco Dental, Uniodonto, entre outras. Cada uma tem rede própria em Guarulhos, com hospitais como Stella Maris, Bom Clima, Cema, Cruzeiro do Sul, Vitália e São Camilo — e a cobertura varia por produto.",
          "Antes de contratar, verifique se seus médicos, hospital de preferência e laboratório estão na rede credenciada do produto específico — não basta olhar apenas a marca da operadora."
        ]
      },
      {
        "id": "carencia",
        "heading": "Como funciona a carência?",
        "paragraphs": [
          "Carência é o período mínimo entre a assinatura do contrato e o direito ao uso de determinadas coberturas. A ANS estabelece máximos: 24h para urgência/emergência, 30 dias para consultas e exames simples, 180 dias para exames complexos e internações, 300 dias para parto a termo, e 24 meses para doenças e lesões preexistentes.",
          "Planos empresariais com determinado número de vidas frequentemente têm carência reduzida ou zerada. Em portabilidade de carências entre operadoras, é possível migrar sem cumprir prazos novamente, se atendidos os requisitos."
        ]
      },
      {
        "id": "coparticipacao",
        "heading": "O que é coparticipação e vale a pena?",
        "paragraphs": [
          "Coparticipação é o pagamento adicional pelo beneficiário toda vez que utilizar um serviço (consulta, exame, internação). Em troca, a mensalidade fica mais baixa — geralmente 15% a 30% mais barata.",
          "Vale a pena para famílias com baixa utilização, cujo objetivo principal é ter cobertura para eventos graves. Para usuários intensos (idosos, crianças pequenas, gestantes), o plano sem coparticipação costuma sair mais barato no ano."
        ]
      },
      {
        "id": "reembolso",
        "heading": "Como funciona reembolso e livre escolha?",
        "paragraphs": [
          "Planos com reembolso permitem consultar médicos e fazer exames fora da rede credenciada, com pagamento posterior de parte ou totalidade dos custos pela operadora, conforme tabela contratual. É um recurso valioso para quem tem médicos de confiança que não estão na rede.",
          "O valor reembolsado depende da tabela de referência da operadora — nem sempre reembolsa 100%. Sempre confirme antes de contratar se o padrão de reembolso é compatível com o preço médio dos profissionais que você deseja consultar."
        ]
      },
      {
        "id": "reajuste",
        "heading": "Reajuste anual e por mudança de faixa etária",
        "paragraphs": [
          "Todo plano tem dois tipos de reajuste: anual (por sinistralidade ou pelo índice regulado pela ANS, dependendo da modalidade) e por mudança de faixa etária (10 faixas até os 59 anos, com percentuais previstos em contrato).",
          "Em planos coletivos, o reajuste anual não é limitado pela ANS e reflete a sinistralidade do grupo (aumentos podem ultrapassar 20% em anos ruins). Em planos empresariais grandes, a negociação é possível."
        ]
      },
      {
        "id": "portabilidade",
        "heading": "Portabilidade de carências entre operadoras",
        "paragraphs": [
          "Se você está insatisfeito com sua operadora atual, pode migrar sem cumprir carências novamente, desde que atenda aos requisitos da RN 438/2018 da ANS: prazo mínimo no plano atual, adimplência, plano de destino compatível e faixa de preço equivalente.",
          "A Patro Seguros faz esse estudo de compatibilidade gratuitamente e acompanha a troca até a ativação do novo plano."
        ]
      },
      {
        "id": "como-escolher",
        "heading": "Como escolher o plano certo",
        "paragraphs": [
          "Roteiro: 1) Liste médicos, hospital e laboratório de referência. 2) Defina orçamento e se aceita coparticipação. 3) Decida se precisa de reembolso (livre escolha). 4) Verifique carências e reajustes. 5) Compare 3 a 5 propostas via corretor. 6) Leia o contrato e a ata de compromisso antes de assinar.",
          "A Patro Seguros atende Guarulhos, Cumbica, região do Aeroporto Internacional, Cidade Maia, Vila Galvão, Ponte Grande, Bonsucesso e demais bairros, além de contratos em todo o Brasil.",
          "As coberturas, condições, franquias, carências e valores dependem da apólice, aceitação da seguradora/operadora e perfil de risco. Este conteúdo é educacional e não substitui a análise técnica de um corretor habilitado."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Qual o plano de saúde mais barato em Guarulhos?",
        "a": "Depende do perfil e da modalidade. Para PME com 2+ vidas, o preço médio parte de faixas mais acessíveis. Cotação personalizada é obrigatória."
      },
      {
        "q": "É possível contratar plano de saúde individual em Guarulhos?",
        "a": "A maioria das operadoras suspendeu a venda de individuais. As alternativas hoje são coletivo por adesão (via associação/sindicato), MEI (com CNPJ) e PME (2+ vidas)."
      },
      {
        "q": "Quanto tempo demora a carência para cirurgia?",
        "a": "Pela ANS, 180 dias para internações e cirurgias eletivas, 300 dias para parto a termo. Em planos empresariais com número mínimo de vidas, a carência pode ser reduzida ou zerada."
      },
      {
        "q": "Posso portar carências para outro plano?",
        "a": "Sim, pela RN 438/2018 da ANS, desde que atenda a requisitos de tempo mínimo, adimplência e compatibilidade de preço e cobertura."
      },
      {
        "q": "Coparticipação vale a pena?",
        "a": "Vale para famílias com baixa utilização. Para uso intenso (idosos, crianças pequenas, gestantes), plano sem coparticipação costuma ser mais econômico."
      },
      {
        "q": "Reembolso reembolsa 100%?",
        "a": "Depende da tabela da operadora. Alguns produtos premium têm reembolso amplo; outros reembolsam apenas parte. Confirme o padrão antes de contratar."
      }
    ],
    "related": [
      {
        "label": "Página comercial: Planos de Saúde Guarulhos",
        "href": "/plano-de-saude-guarulhos",
        "description": "Cotar plano em 20+ operadoras."
      },
      {
        "label": "Plano de Saúde Empresarial",
        "href": "/plano-saude-empresarial",
        "description": "PME e empresarial 2+ vidas."
      },
      {
        "label": "Como comparar operadoras",
        "href": "/como-comparar-seguradoras-guarulhos",
        "description": "Critérios objetivos de escolha."
      },
      {
        "label": "Guia: Seguro Vida",
        "href": "/guias/seguro-vida",
        "description": "Complementar ao plano de saúde."
      }
    ]
  },
  {
    "slug": "consorcio-guarulhos",
    "title": "Guia do Consórcio em Guarulhos",
    "h1": "Guia do Consórcio em Guarulhos: como funciona, lance, sorteio e taxas",
    "metaTitle": "Consórcio em Guarulhos: guia completo (imóvel, veículo, empresarial)",
    "metaDescription": "Guia do consórcio em Guarulhos: como funciona carta de crédito, sorteio, lance, taxa de administração e fundo de reserva. Imóveis, veículos e empresarial.",
    "eyebrow": "Guia · Consórcio",
    "readTime": "14 min",
    "updatedAt": "2026-07-28",
    "quickAnswer": "Consórcio é uma modalidade de compra planejada regulada pelo Banco Central em que um grupo de participantes contribui mensalmente para formar cartas de crédito, contempladas por sorteio ou lance. Não há juros de financiamento — apenas taxa de administração e fundo de reserva — sendo indicado para quem tem planejamento e não pressa imediata.",
    "commercialHref": "/consorcio",
    "commercialLabel": "Ver planos de consórcio",
    "whatsappMessage": "Olá, quero informações sobre consórcio em Guarulhos com a Patro Seguros.",
    "category": "Consórcios",
    "sections": [
      {
        "id": "o-que-e",
        "heading": "O que é consórcio e como ele funciona?",
        "paragraphs": [
          "Consórcio é um sistema de autofinanciamento coletivo regulado pela Lei 11.795/2008 e supervisionado pelo Banco Central. Um grupo de pessoas ou empresas contribui mensalmente para formar um fundo comum; a cada assembleia, cartas de crédito são liberadas por sorteio ou por lance, permitindo ao contemplado adquirir o bem ou serviço previsto.",
          "Diferente de financiamento, não há incidência de juros — apenas taxa de administração cobrada pela administradora, fundo de reserva (para inadimplência) e, opcionalmente, seguro prestamista."
        ]
      },
      {
        "id": "carta-credito",
        "heading": "O que é a carta de crédito e como usá-la?",
        "paragraphs": [
          "A carta de crédito é o valor liberado ao contemplado, corrigido anualmente por índice previsto em contrato (INCC para imóveis, IPCA ou média equivalente para veículos). Ela é utilizada para comprar o bem previsto no grupo (imóvel, veículo, serviço) ou, em alguns casos, para quitação de financiamento existente.",
          "A carta é utilizada em negociação à vista, o que costuma render descontos relevantes em relação à venda financiada."
        ]
      },
      {
        "id": "sorteio-lance",
        "heading": "Sorteio e lance: quais as diferenças?",
        "paragraphs": [
          "Sorteio é a forma aleatória de contemplação — todo mês, um ou mais participantes são sorteados pela loteria federal. Lance é a antecipação de parcelas ofertadas voluntariamente para ser contemplado antes: quem ofertar o maior percentual leva.",
          "Existem também lances embutidos (usando a própria carta) e lances fixos (percentuais pré-definidos pelo grupo), além de sorteios especiais e regulamentos que reservam parte das cartas para lances mais baixos."
        ]
      },
      {
        "id": "taxas",
        "heading": "Taxa de administração e fundo de reserva",
        "paragraphs": [
          "A taxa de administração é o custo cobrado pela administradora, diluído nas parcelas ao longo do plano. Varia por administradora e categoria — imóveis costumam ficar entre 15% e 25% do valor total, veículos entre 12% e 22%. Fundo de reserva costuma ser 0,5% a 2% e retorna proporcionalmente se não usado.",
          "Compare sempre a taxa total (soma de administração + fundo) para comparar apples-to-apples."
        ]
      },
      {
        "id": "categorias",
        "heading": "Categorias de consórcio",
        "paragraphs": [
          "As principais categorias em Guarulhos são: imóveis (residencial, comercial, terreno), veículos leves, caminhões e pesados, motos, serviços (reforma, viagens, cirurgia, festa) e consórcio empresarial (máquinas, equipamentos, imóveis para empresa)."
        ],
        "bullets": [
          "Imóveis: prazo longo (180–240 meses), INCC",
          "Veículos leves: 60–100 meses",
          "Caminhões e pesados: 60–120 meses",
          "Serviços: 24–60 meses",
          "Empresarial: sob demanda por CNPJ"
        ]
      },
      {
        "id": "vantagens",
        "heading": "Vantagens e limitações do consórcio",
        "paragraphs": [
          "Vantagens: sem juros de financiamento, disciplina financeira, taxa de administração inferior aos juros compostos de longo prazo, poder de compra à vista após contemplação, possibilidade de usar FGTS para lance em imóveis.",
          "Limitações: não é indicado para quem precisa do bem imediato, não é aplicação financeira (o objetivo é a compra, não o rendimento), contemplação por sorteio é aleatória, é necessário disciplina de pagamento por vários anos."
        ]
      },
      {
        "id": "como-escolher",
        "heading": "Como escolher a administradora e o plano",
        "paragraphs": [
          "Critérios: administradora regulada pelo Banco Central (verifique no site do BC), tempo de mercado, número de contemplações mensais, taxa de administração total, valor da parcela, fundo de reserva, seguro prestamista, transparência do regulamento.",
          "A Patro Seguros trabalha com administradoras auditadas e apresenta comparativo entre planos considerando taxa total e política de lances.",
          "As coberturas, condições, franquias, carências e valores dependem da apólice, aceitação da seguradora/operadora e perfil de risco. Este conteúdo é educacional e não substitui a análise técnica de um corretor habilitado."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Consórcio é melhor que financiamento?",
        "a": "Depende do objetivo. Sem pressa e com disciplina, o consórcio sai bem mais barato (sem juros). Para necessidade imediata, o financiamento é a única saída."
      },
      {
        "q": "Posso usar FGTS no consórcio de imóveis?",
        "a": "Sim, o FGTS pode ser usado como lance ou complemento da carta de crédito, seguindo as regras da Caixa Econômica Federal."
      },
      {
        "q": "O que acontece se eu atrasar parcelas?",
        "a": "O atraso pode gerar multa e, dependendo do regulamento, exclusão do grupo. Nesse caso, os valores pagos são devolvidos apenas ao final do plano, corrigidos."
      },
      {
        "q": "Quanto tempo demora para ser contemplado?",
        "a": "Varia. Em média, contemplações ocorrem em qualquer momento do plano, mas podem levar anos por sorteio. Por lance, quanto maior o percentual ofertado, mais rápido."
      },
      {
        "q": "Consórcio tem seguro?",
        "a": "Sim, a maioria dos planos inclui seguro prestamista (quita o saldo em caso de morte ou invalidez do titular) e/ou seguro de vida."
      },
      {
        "q": "Posso vender minha cota de consórcio?",
        "a": "Sim, a cota pode ser transferida a terceiros, com anuência da administradora e mediante taxa de transferência prevista em contrato."
      }
    ],
    "related": [
      {
        "label": "Página comercial: Consórcio",
        "href": "/consorcio",
        "description": "Ver planos ativos."
      },
      {
        "label": "Consórcio de Imóveis",
        "href": "/consorcio-imoveis",
        "description": "Casa, apartamento, terreno e comercial."
      },
      {
        "label": "Consórcio de Veículos Pesados",
        "href": "/consorcio-veiculos-pesados",
        "description": "Caminhões e utilitários."
      }
    ]
  },
  {
    "slug": "seguro-vida",
    "title": "Guia do Seguro de Vida",
    "h1": "Guia do Seguro de Vida: coberturas, valores, beneficiários e planejamento",
    "metaTitle": "Seguro de Vida: guia completo (coberturas, valores, beneficiários)",
    "metaDescription": "Guia completo do seguro de vida: morte, invalidez, doenças graves, diária por incapacidade, escolha de beneficiários e planejamento sucessório.",
    "eyebrow": "Guia · Vida",
    "readTime": "15 min",
    "updatedAt": "2026-07-28",
    "quickAnswer": "Seguro de vida é a proteção financeira contratada para que a família (ou herdeiros indicados) receba uma indenização em caso de morte natural, morte acidental, invalidez, doenças graves ou incapacidade temporária do segurado. Diferente da herança, o pagamento é rápido (30 a 60 dias), não passa por inventário e é isento de IR até certos limites.",
    "commercialHref": "/seguro-vida",
    "commercialLabel": "Cotar seguro de vida",
    "whatsappMessage": "Olá, quero cotar seguro de vida com a Patro Seguros.",
    "category": "Seguros de Vida",
    "sections": [
      {
        "id": "por-que",
        "heading": "Por que contratar seguro de vida?",
        "paragraphs": [
          "O seguro de vida existe para proteger financeiramente quem depende da renda do segurado. Em famílias com filhos pequenos, dívida imobiliária, empresa em fase de crescimento ou dependentes vulneráveis, a ausência súbita da renda pode comprometer padrão de vida, educação e patrimônio conquistado.",
          "Além da morte, o seguro de vida moderno protege contra invalidez permanente por acidente, doenças graves (câncer, AVC, infarto), diária por incapacidade temporária e despesas com procedimentos médicos."
        ]
      },
      {
        "id": "coberturas",
        "heading": "Quais coberturas existem?",
        "paragraphs": [
          "As principais coberturas de um seguro de vida individual moderno são:"
        ],
        "bullets": [
          "Morte natural e acidental",
          "Invalidez permanente total ou parcial por acidente (IPA)",
          "Invalidez funcional permanente total por doença (IFPD)",
          "Doenças graves (câncer, infarto, AVC, insuficiência renal)",
          "Diária por incapacidade temporária (DIT)",
          "Diária por internação hospitalar (DIH)",
          "Despesas médicas e hospitalares (DMH)",
          "Assistência funeral (individual e/ou familiar)"
        ]
      },
      {
        "id": "valor-cobertura",
        "heading": "Qual o valor de cobertura ideal?",
        "paragraphs": [
          "Regra prática: o capital segurado ideal costuma variar entre 5 a 10 vezes a renda anual líquida do segurado, ajustado por dívidas, número de dependentes, idade dos filhos e patrimônio já formado.",
          "Exemplo: um profissional de 35 anos, casado, 2 filhos pequenos, com renda líquida de R$ 15 mil/mês e financiamento imobiliário de R$ 400 mil precisaria de capital mínimo entre R$ 900 mil e R$ 1,8 milhão para manter o padrão familiar por 5 a 10 anos e liquidar dívidas."
        ]
      },
      {
        "id": "beneficiarios",
        "heading": "Como indicar beneficiários corretamente?",
        "paragraphs": [
          "O segurado pode indicar livremente um ou mais beneficiários (com percentual definido) — inclusive fora da linha sucessória. A indicação pode ser alterada a qualquer tempo, sem inventário e sem os limites do Código Civil aplicados à herança.",
          "É comum designar cônjuge (50%) e filhos (50% divididos), mas casais em união estável, filhos de outros relacionamentos, pais idosos e até empresas podem ser beneficiários. Sempre revise a indicação após casamento, divórcio, nascimento de filho ou mudança patrimonial."
        ]
      },
      {
        "id": "individual-grupo",
        "heading": "Vida individual x vida em grupo (PME)",
        "paragraphs": [
          "O seguro de vida em grupo é contratado pelo empregador para todos os funcionários, com capital padrão (múltiplo do salário) e prêmio pago total ou parcialmente pela empresa. É benefício importante para atração/retenção mas costuma ser insuficiente como única proteção.",
          "O seguro de vida individual é contratado diretamente pela pessoa física, com capital dimensionado à necessidade real, coberturas mais amplas e portabilidade — segue com o segurado independentemente do emprego."
        ]
      },
      {
        "id": "resgate-planejamento",
        "heading": "Seguro de vida com sorteio e planejamento sucessório",
        "paragraphs": [
          "Alguns produtos oferecem sorteios mensais entre segurados. Não confunda com investimento: sorteio é benefício adicional, não é o produto principal.",
          "Para famílias com patrimônio, o seguro de vida também é ferramenta de planejamento sucessório: a indenização entra na conta dos beneficiários sem passar por inventário, com liquidez para pagar ITCMD, honorários e continuidade da empresa familiar."
        ]
      },
      {
        "id": "custo",
        "heading": "Quanto custa um seguro de vida?",
        "paragraphs": [
          "O prêmio depende da idade, sexo, fumante/não fumante, profissão, capital segurado e coberturas contratadas. Um homem de 35 anos, não fumante, saudável, com R$ 500 mil de capital pode pagar entre R$ 60 e R$ 150/mês num produto individual, dependendo das coberturas adicionais.",
          "Com o avançar da idade, o prêmio sobe. Contratar cedo trava um custo baixo por muitos anos e evita agravos por surgimento de doenças."
        ]
      },
      {
        "id": "declaracao-saude",
        "heading": "Declaração de saúde: por que é crítica",
        "paragraphs": [
          "Ao contratar, o segurado preenche declaração pessoal de saúde. Omissões ou falsidades podem gerar negativa de sinistro ou redução da indenização (art. 766 do Código Civil). Doenças preexistentes devem ser declaradas — a seguradora pode aceitar com agravo, exclusão ou recusa, mas a decisão fica documentada e a apólice fica válida.",
          "As coberturas, condições, franquias, carências e valores dependem da apólice, aceitação da seguradora/operadora e perfil de risco. Este conteúdo é educacional e não substitui a análise técnica de um corretor habilitado."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Seguro de vida cobre suicídio?",
        "a": "Sim, após 2 anos de vigência da apólice (art. 798 do Código Civil). Antes disso, a cobertura de suicídio é excluída, mas o prêmio pago é devolvido aos beneficiários."
      },
      {
        "q": "Preciso pagar imposto sobre a indenização?",
        "a": "A indenização por morte é isenta de IR e não entra no inventário. Coberturas em vida (invalidez, DIT, DMH) podem ter tratamento tributário diferente."
      },
      {
        "q": "Posso ter mais de um seguro de vida?",
        "a": "Sim, é permitido contratar vários seguros com seguradoras diferentes, cada um com capital próprio, sem limite regulatório."
      },
      {
        "q": "O seguro de vida em grupo do trabalho é suficiente?",
        "a": "Raramente. Em regra é insuficiente e depende do vínculo empregatício. O ideal é combiná-lo com um seguro individual."
      },
      {
        "q": "O que é DIT?",
        "a": "Diária por Incapacidade Temporária — indeniza o segurado por dia em que estiver afastado do trabalho por doença ou acidente, após franquia (geralmente 15 dias)."
      },
      {
        "q": "O beneficiário precisa ser familiar?",
        "a": "Não. O segurado pode indicar quem quiser: cônjuge, companheiro, filhos, pais, irmãos, amigos ou até empresas — sem os limites da herança."
      }
    ],
    "related": [
      {
        "label": "Página comercial: Seguro Vida",
        "href": "/seguro-vida",
        "description": "Cotar seguro vida individual."
      },
      {
        "label": "Seguro Vida PME (grupo)",
        "href": "/seguro-vida-pme",
        "description": "Vida coletivo para funcionários."
      },
      {
        "label": "Guia: Plano de Saúde",
        "href": "/guias/plano-de-saude-guarulhos",
        "description": "Proteção complementar em saúde."
      }
    ]
  },
  {
    "slug": "seguro-residencial-guarulhos",
    "title": "Guia do Seguro Residencial em Guarulhos",
    "h1": "Guia do Seguro Residencial em Guarulhos: coberturas, preço e assistência",
    "metaTitle": "Seguro Residencial em Guarulhos: guia (casa, apartamento, alugado)",
    "metaDescription": "Guia do seguro residencial em Guarulhos: coberturas para casa, apartamento e imóvel alugado, danos elétricos, roubo, RC familiar e assistência 24h.",
    "eyebrow": "Guia · Residencial",
    "readTime": "13 min",
    "updatedAt": "2026-07-28",
    "quickAnswer": "Seguro residencial protege casa, apartamento, flat ou imóvel alugado contra incêndio, roubo, danos elétricos, vendaval, alagamento e responsabilidade civil familiar, com assistência 24h para chaveiro, encanador, eletricista, vidraceiro e desentupimento.",
    "commercialHref": "/seguro-residencial",
    "commercialLabel": "Cotar seguro residencial",
    "whatsappMessage": "Olá, quero cotar seguro residencial em Guarulhos com a Patro Seguros.",
    "category": "Seguros Residenciais",
    "sections": [
      {
        "id": "o-que-e",
        "heading": "O que é o seguro residencial?",
        "paragraphs": [
          "O seguro residencial é uma apólice de baixo custo e alta relevância que protege o imóvel (estrutura) e o conteúdo (móveis, eletrodomésticos, objetos pessoais) contra os principais eventos que causam prejuízo: incêndio, raio, explosão, roubo, danos elétricos, vendaval, granizo e alagamento.",
          "Além de proteger o patrimônio, agrega assistência 24h — chaveiro, encanador, eletricista, vidraceiro, técnico em eletrodomésticos — e RC familiar (danos causados a terceiros pela família, incluindo pet)."
        ]
      },
      {
        "id": "coberturas",
        "heading": "Coberturas mais importantes",
        "paragraphs": [
          "As principais coberturas contratadas em Guarulhos são:"
        ],
        "bullets": [
          "Incêndio, raio, explosão e fumaça (básica)",
          "Danos elétricos (queima de eletrodomésticos)",
          "Roubo e furto qualificado",
          "Vendaval, granizo, queda de árvore",
          "Alagamento e inundação",
          "Impacto de veículos",
          "Responsabilidade Civil Familiar (inclusive pet)",
          "Quebra de vidros",
          "Perda ou pagamento de aluguel",
          "Assistência 24h ampla"
        ]
      },
      {
        "id": "casa-apartamento",
        "heading": "Casa, apartamento ou imóvel alugado: qual apólice?",
        "paragraphs": [
          "Casa: em geral tem IS maior no imóvel (paredes, telhado, área externa, portão), maior risco de roubo em áreas periféricas de Guarulhos e maior necessidade de cobertura vendaval/queda de árvore.",
          "Apartamento: IS do prédio geralmente já é coberto pelo condomínio (seguro obrigatório do condomínio); o morador segura conteúdo, danos elétricos, RC familiar e roubo. Apólices costumam ser mais baratas.",
          "Imóvel alugado: o inquilino pode segurar conteúdo e RC contra o proprietário; o proprietário pode segurar a estrutura. Contratos de locação frequentemente exigem seguro fiança ou seguro incêndio."
        ]
      },
      {
        "id": "preco",
        "heading": "Quanto custa o seguro residencial em Guarulhos?",
        "paragraphs": [
          "Em bairros residenciais padrão de Guarulhos, apólices completas para apartamentos partem de faixas mensais bem acessíveis, e casas com IS mais alta e coberturas amplas ficam em faixas ligeiramente superiores. A cotação com 8+ seguradoras via Patro costuma reduzir 20% a 40% em relação à compra direta."
        ]
      },
      {
        "id": "assistencia",
        "heading": "Assistência 24h: o que exigir",
        "paragraphs": [
          "Serviços recomendados: chaveiro (arrombamento, quebra de chave), encanador, eletricista, vidraceiro, técnico em linha branca e marrom, desentupimento, cobertura provisória de telhado, mudança emergencial. Verifique limites (número de acionamentos por ano e valor por acionamento)."
        ]
      },
      {
        "id": "rc-familiar",
        "heading": "RC Familiar: o que cobre",
        "paragraphs": [
          "A Responsabilidade Civil Familiar cobre danos causados a terceiros pelo segurado, cônjuge, filhos, empregados domésticos e pets — em qualquer lugar do Brasil. Exemplos: filho quebra o notebook do colega na escola, cachorro morde vizinho, quadro cai na cabeça do visitante. A IS costuma variar de R$ 20 a R$ 200 mil."
        ]
      },
      {
        "id": "como-contratar",
        "heading": "Como contratar",
        "paragraphs": [
          "Envie endereço, tipo de imóvel (casa/apto), área construída, valor de reconstrução (não valor de mercado), valor do conteúdo, medidas de segurança (portão, alarme, câmera) e coberturas desejadas. Em 24 a 48h úteis apresentamos comparativo com 3 a 5 seguradoras.",
          "As coberturas, condições, franquias, carências e valores dependem da apólice, aceitação da seguradora/operadora e perfil de risco. Este conteúdo é educacional e não substitui a análise técnica de um corretor habilitado."
        ]
      }
    ],
    "faqs": [
      {
        "q": "O seguro residencial cobre roubo sem sinais de arrombamento?",
        "a": "Não. A cobertura padrão exige sinais visíveis de arrombamento, ameaça ou emprego de violência. Furto simples não é coberto — apenas furto qualificado."
      },
      {
        "q": "O que é IS do imóvel?",
        "a": "É a Importância Segurada do imóvel: o valor de reconstrução da estrutura (paredes, cobertura, instalações), diferente do valor de mercado (que inclui o terreno)."
      },
      {
        "q": "Preciso listar item por item do conteúdo?",
        "a": "Não. A IS de conteúdo é global, mas bens de valor superior a um piso definido em apólice (joias, obras de arte, equipamentos de alto valor) devem ser declarados individualmente."
      },
      {
        "q": "Cobertura de danos elétricos é útil?",
        "a": "Muito. Em Guarulhos, oscilação de rede é comum. Cobre queima de eletrodomésticos, TV, computador, ar-condicionado e portão automático, dentro do LMI."
      },
      {
        "q": "Posso segurar imóvel de temporada?",
        "a": "Sim, existem apólices específicas para segunda residência, com cobertura diferenciada para desocupação prolongada."
      },
      {
        "q": "O seguro cobre danos causados por pet ao vizinho?",
        "a": "Sim, via cobertura de RC Familiar, dentro do LMI contratado."
      }
    ],
    "related": [
      {
        "label": "Página comercial: Seguro Residencial",
        "href": "/seguro-residencial",
        "description": "Cotar seguro residencial."
      },
      {
        "label": "Seguro Condomínio",
        "href": "/seguro-condominio",
        "description": "Proteção para áreas comuns."
      },
      {
        "label": "Seguro Fiança Locatícia",
        "href": "/seguro-fianca-locaticia",
        "description": "Alternativa ao fiador."
      }
    ]
  },
  {
    "slug": "seguros-para-consultorios",
    "title": "Guia de Seguros para Consultórios e Clínicas",
    "h1": "Seguros para Consultórios e Clínicas: RC Profissional, equipamentos e patrimonial",
    "metaTitle": "Seguros para Consultórios e Clínicas: guia (RC Profissional + Patrimonial)",
    "metaDescription": "Guia dos seguros para consultórios médicos, odontológicos, veterinários e clínicas: RC Profissional, equipamentos, patrimônio, cyber e lucros cessantes.",
    "eyebrow": "Guia · Consultórios",
    "readTime": "14 min",
    "updatedAt": "2026-07-28",
    "quickAnswer": "Consultórios e clínicas precisam de uma combinação: RC Profissional (erros e omissões no exercício da profissão), seguro patrimonial multirrisco (incêndio, roubo, danos elétricos), cobertura de equipamentos, cyber (LGPD e prontuário eletrônico) e lucros cessantes. Cada especialidade tem apetite de risco próprio.",
    "commercialHref": "/seguro-consultorio-guarulhos",
    "commercialLabel": "Cotar seguro para consultório",
    "whatsappMessage": "Olá, quero cotar seguro para consultório/clínica com a Patro Seguros.",
    "category": "Consultórios e Clínicas",
    "sections": [
      {
        "id": "por-que",
        "heading": "Por que consultórios precisam de seguro específico?",
        "paragraphs": [
          "Consultórios e clínicas concentram, em um único endereço, três exposições críticas: patrimônio de alto valor (equipamentos de imagem, cadeiras odontológicas, ultrassons, laser), responsabilidade profissional (processos por erro médico, odontológico, veterinário) e dados sensíveis (prontuário eletrônico sujeito à LGPD).",
          "Uma apólice residencial ou empresarial padrão não cobre adequadamente essas três dimensões. É preciso um pacote específico — geralmente combinando patrimonial + RC Profissional + Cyber."
        ]
      },
      {
        "id": "rc-profissional",
        "heading": "RC Profissional (E&O): a cobertura mais crítica",
        "paragraphs": [
          "RC Profissional cobre danos morais e materiais causados a pacientes por erros, omissões ou negligência no exercício da profissão. Cobre honorários advocatícios, indenizações judiciais e acordos extrajudiciais.",
          "É contratada por especialidade (clínica geral, ortopedia, ginecologia, cardiologia, cirurgia plástica, odontologia estética, veterinária). Especialidades cirúrgicas e estéticas têm prêmios mais altos por maior sinistralidade.",
          "A LMI mínima recomendada para consultórios é de R$ 500 mil; para cirurgiões plásticos e especialidades de alto risco, R$ 1 a 5 milhões."
        ]
      },
      {
        "id": "patrimonial",
        "heading": "Cobertura patrimonial e de equipamentos",
        "paragraphs": [
          "Cobre incêndio, raio, explosão, danos elétricos, roubo, quebra de vidros e roubo/furto qualificado de equipamentos. Equipamentos móveis (ultrassom portátil, notebooks, cadeira odontológica) podem ter cobertura estendida para uso fora do endereço.",
          "Recomendamos declarar equipamentos individualmente acima do piso da apólice — em caso de sinistro, evita subseguro e disputa técnica."
        ]
      },
      {
        "id": "cyber",
        "heading": "Seguro Cyber para clínicas: LGPD e prontuário",
        "paragraphs": [
          "Clínicas tratam dados sensíveis de saúde (art. 11 da LGPD), com risco elevado de sanção em caso de vazamento. Um ransomware que trava o prontuário eletrônico pode paralisar operações por dias.",
          "O Seguro Cyber cobre custos de resposta (perícia, notificação a pacientes, defesa jurídica), multas administrativas (dentro dos limites contratuais), extorsão cibernética e interrupção de negócio."
        ]
      },
      {
        "id": "lucros-cessantes",
        "heading": "Lucros cessantes",
        "paragraphs": [
          "Consultório sem funcionamento é consultório sem receita. A cobertura de lucros cessantes indeniza a receita perdida (menos custos variáveis) por período de reparo, geralmente 3 a 12 meses. Fundamental para consultórios com faturamento concentrado em poucos profissionais."
        ]
      },
      {
        "id": "outras-coberturas",
        "heading": "Outras coberturas relevantes",
        "paragraphs": [
          "Coberturas adicionais úteis para clínicas:"
        ],
        "bullets": [
          "RC Estabelecimento (queda de paciente, acidentes na recepção)",
          "Fidelidade de funcionários (desvio de valores por colaborador)",
          "Deterioração de medicamentos e vacinas por queda de energia",
          "Vida em Grupo para equipe médica e administrativa",
          "Plano de saúde e odontológico coletivo empresarial"
        ]
      },
      {
        "id": "como-cotar",
        "heading": "Como cotar",
        "paragraphs": [
          "Envie: especialidade médica, endereço, área, número de profissionais, faturamento anual, lista de equipamentos, procedimentos realizados, histórico de reclamações e coberturas desejadas. Em 3 a 7 dias apresentamos propostas comparadas.",
          "As coberturas, condições, franquias, carências e valores dependem da apólice, aceitação da seguradora/operadora e perfil de risco. Este conteúdo é educacional e não substitui a análise técnica de um corretor habilitado."
        ]
      }
    ],
    "faqs": [
      {
        "q": "RC Profissional cobre processo de paciente insatisfeito?",
        "a": "Sim, dentro do LMI e das exclusões da apólice. Não cobre atos dolosos, prática ilegal ou fora da especialidade contratada."
      },
      {
        "q": "Meu consultório está no meu apartamento; posso ter seguro?",
        "a": "Sim, mas a apólice deve ser específica: seguro residencial padrão não cobre atividade profissional. É preciso apólice comercial adequada ou extensão específica."
      },
      {
        "q": "Preciso declarar cada procedimento?",
        "a": "Não, mas deve declarar a especialidade principal e procedimentos habituais. Novos procedimentos de risco (harmonização, sedação) devem ser comunicados."
      },
      {
        "q": "Cyber cobre multa da LGPD?",
        "a": "Cobre parte, respeitando limites contratuais e legais — multas administrativas por conduta dolosa não são cobertas. Custos de defesa e notificação são cobertos amplamente."
      },
      {
        "q": "Equipamento cedido em comodato pode ser segurado?",
        "a": "Sim, mediante autorização do proprietário. Prevê-se cláusula de sub-rogação."
      },
      {
        "q": "Vale a pena RC Profissional para especialidade não cirúrgica?",
        "a": "Sim. Reclamações também ocorrem em clínica médica, dermatologia, nutrição, psicologia e odontologia estética."
      }
    ],
    "related": [
      {
        "label": "Página comercial: Seguros para consultório em Guarulhos",
        "href": "/seguro-consultorio-guarulhos",
        "description": "Cotação por especialidade."
      },
      {
        "label": "Guia: Seguro Empresarial",
        "href": "/guias/seguro-empresarial-guarulhos",
        "description": "Base patrimonial multirrisco."
      },
      {
        "label": "Guia: Seguro Cyber",
        "href": "/guias/seguro-cyber",
        "description": "Proteção para prontuário eletrônico."
      },
      {
        "label": "RC para Médicos",
        "href": "/seguro-rc-medicos",
        "description": "Página específica RC médica."
      }
    ]
  },
  {
    "slug": "seguro-garantia",
    "title": "Guia do Seguro Garantia",
    "h1": "Seguro Garantia: licitação, contratual, judicial e substituição de fiança bancária",
    "metaTitle": "Seguro Garantia: guia completo (licitação, contratual, judicial)",
    "metaDescription": "Guia do Seguro Garantia no Brasil: modalidades (licitação, contratual, judicial), regulamentação, custo, prazo de emissão e como substituir fiança bancária.",
    "eyebrow": "Guia · Garantia",
    "readTime": "15 min",
    "updatedAt": "2026-07-28",
    "quickAnswer": "Seguro Garantia é a apólice em que a seguradora se compromete a pagar ao segurado o valor da garantia caso o Tomador do contrato descumpra obrigações. Substitui fiança bancária e caução em dinheiro com custo geralmente menor. As modalidades mais usadas são Licitante, Executante Contratual (Performance Bond), Retenção de Pagamentos e Judicial.",
    "commercialHref": "/seguro-garantia",
    "commercialLabel": "Cotar Seguro Garantia",
    "whatsappMessage": "Olá, quero cotar Seguro Garantia com a Patro Seguros.",
    "category": "Seguros B2B Especializados",
    "sections": [
      {
        "id": "o-que-e",
        "heading": "O que é Seguro Garantia?",
        "paragraphs": [
          "Seguro Garantia é a modalidade regulada pela SUSEP em que a seguradora se responsabiliza pelo cumprimento de obrigações assumidas pelo Tomador perante o Segurado. Se o Tomador descumprir, o Segurado aciona a apólice e recebe o valor da garantia.",
          "É amplamente utilizado em licitações públicas (Lei 14.133/2021), contratos privados de grande porte e processos judiciais para substituir depósito em dinheiro ou fiança bancária."
        ]
      },
      {
        "id": "modalidades",
        "heading": "Quais as principais modalidades?",
        "paragraphs": [
          "As modalidades mais contratadas são:"
        ],
        "bullets": [
          "Garantia do Licitante (Bid Bond): garante manutenção da proposta em licitação (1% a 5% do valor do contrato)",
          "Garantia do Executante Contratual (Performance Bond): garante cumprimento do contrato (5% a 30% do valor)",
          "Retenção de Pagamentos: libera valores retidos pelo contratante",
          "Adiantamento de Pagamento: garante devolução em caso de inexecução",
          "Garantia Judicial: substitui depósito em ações judiciais (execuções, embargos)",
          "Garantia Aduaneira: para operações de importação/exportação",
          "Garantia Imobiliária: para incorporações e patrimônio de afetação"
        ]
      },
      {
        "id": "vs-fianca",
        "heading": "Seguro Garantia x fiança bancária: qual escolher?",
        "paragraphs": [
          "A fiança bancária consome limite de crédito da empresa no banco e costuma custar entre 1,5% e 4% ao ano sobre o valor garantido, sem prazo máximo padronizado.",
          "O Seguro Garantia não consome limite bancário, pode ter custo inferior (0,5% a 3% ao ano) e é aceito na quase totalidade das licitações públicas e privadas. A análise, porém, considera capacidade financeira do Tomador — não é aprovação automática."
        ]
      },
      {
        "id": "como-contratar",
        "heading": "Como contratar",
        "paragraphs": [
          "Passo a passo: 1) Envio do edital/contrato/decisão judicial. 2) Análise de risco pela seguradora (documentação societária, DRE, balanço, CND). 3) Emissão de proposta com custo, prazo e franquia. 4) Aprovação e emissão da apólice.",
          "Para clientes recorrentes, a Patro estrutura Limite Operacional (LO) prévio, permitindo emissão de apólices em 24 a 48h úteis."
        ]
      },
      {
        "id": "documentacao",
        "heading": "Documentação exigida",
        "paragraphs": [
          "Documentos padrão para análise:"
        ],
        "bullets": [
          "Contrato social e alterações",
          "Balanço patrimonial dos últimos 2 exercícios",
          "DRE dos últimos 2 exercícios",
          "Balancete atualizado",
          "Certidões negativas (federal, estadual, municipal, FGTS, trabalhista)",
          "Ficha cadastral dos sócios",
          "Objeto a ser garantido (edital ou contrato)"
        ]
      },
      {
        "id": "custos",
        "heading": "Quanto custa e por quanto tempo vale?",
        "paragraphs": [
          "O custo (taxa) varia por modalidade, prazo, valor da garantia, risco do objeto e perfil financeiro do Tomador. Prazo padrão: coincidente com o prazo do contrato ou processo, com endossos possíveis.",
          "As coberturas, condições, franquias, carências e valores dependem da apólice, aceitação da seguradora/operadora e perfil de risco. Este conteúdo é educacional e não substitui a análise técnica de um corretor habilitado."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Órgão público aceita Seguro Garantia no lugar de caução?",
        "a": "Sim. A Lei 14.133/2021 (nova Lei de Licitações) reconhece o Seguro Garantia como modalidade válida, inclusive com cláusula de retomada."
      },
      {
        "q": "Preciso ter faturamento mínimo para contratar?",
        "a": "Não há mínimo formal, mas a análise financeira considera capacidade proporcional ao valor garantido. Empresas pequenas contratam garantias menores com facilidade."
      },
      {
        "q": "O Seguro Garantia é caro?",
        "a": "Não, na maioria dos casos é mais barato que fiança bancária e não consome limite de crédito. Depende do perfil do Tomador."
      },
      {
        "q": "Posso substituir caução em dinheiro em processo judicial?",
        "a": "Sim, mediante requerimento ao juízo. Deve-se apresentar a apólice com aceitação prévia de eventual seguradora indicada pelo tribunal."
      },
      {
        "q": "Qual o prazo de emissão?",
        "a": "Após aprovação, 1 a 5 dias úteis. Com Limite Operacional prévio, 24 a 48h."
      },
      {
        "q": "Preciso pagar o prêmio anualmente?",
        "a": "Depende do produto. Em contratos plurianuais, é possível pagamento à vista ou por endosso anual."
      }
    ],
    "related": [
      {
        "label": "Página comercial: Seguro Garantia",
        "href": "/seguro-garantia",
        "description": "Cotar garantia por modalidade."
      },
      {
        "label": "Guia: Seguro de Crédito",
        "href": "/guias/seguro-de-credito",
        "description": "Proteção contra inadimplência B2B."
      },
      {
        "label": "Guia: Seguro Empresarial",
        "href": "/guias/seguro-empresarial-guarulhos",
        "description": "Base multirrisco empresarial."
      }
    ]
  },
  {
    "slug": "seguro-de-credito",
    "title": "Guia do Seguro de Crédito",
    "h1": "Seguro de Crédito: proteção contra inadimplência em vendas B2B",
    "metaTitle": "Seguro de Crédito: guia (interno, exportação, factoring, inadimplência B2B)",
    "metaDescription": "Guia do Seguro de Crédito: proteção contra inadimplência em vendas a prazo B2B, análise de compradores, cobertura interna e exportação e recovery.",
    "eyebrow": "Guia · Crédito B2B",
    "readTime": "14 min",
    "updatedAt": "2026-07-28",
    "quickAnswer": "Seguro de Crédito protege empresas que vendem a prazo para outras empresas (B2B) contra o não pagamento por insolvência ou mora prolongada. Inclui análise de crédito dos clientes, monitoramento contínuo, cobertura (interna ou exportação) e recovery do valor não pago. Reduz PDD, viabiliza financiamento e melhora condições bancárias.",
    "commercialHref": "/seguro-de-credito",
    "commercialLabel": "Cotar Seguro de Crédito",
    "whatsappMessage": "Olá, quero cotar Seguro de Crédito com a Patro Seguros.",
    "category": "Seguros B2B Especializados",
    "sections": [
      {
        "id": "o-que-e",
        "heading": "O que é Seguro de Crédito?",
        "paragraphs": [
          "Seguro de Crédito é a apólice que indeniza o segurado quando um cliente (comprador B2B) deixa de pagar dívida comercial dentro de determinado prazo (mora prolongada) ou entra em processo formal de insolvência (recuperação judicial, falência).",
          "É produto voltado a empresas que vendem a prazo para outras empresas — indústria, atacado, distribuidor, prestador de serviços B2B, exportador — que carregam risco de crédito relevante em suas contas a receber."
        ]
      },
      {
        "id": "modalidades",
        "heading": "Modalidades: interno x exportação",
        "paragraphs": [
          "Interno (Doméstico): cobre vendas dentro do Brasil, com foco em risco comercial dos compradores nacionais. Amplamente contratado por indústrias e atacadistas.",
          "Exportação (ECA): cobre riscos comercial e político (guerra, moratória, restrição cambial) de compradores no exterior. Estruturado com apoio de resseguradoras internacionais."
        ]
      },
      {
        "id": "beneficios",
        "heading": "Benefícios além da indenização",
        "paragraphs": [
          "Além da proteção contra perda direta, o Seguro de Crédito entrega:"
        ],
        "bullets": [
          "Análise contínua da saúde financeira de todos os compradores segurados",
          "Redução de PDD (Provisão para Devedores Duvidosos)",
          "Melhor condição em antecipação de recebíveis e financiamento bancário",
          "Aumento seguro do limite comercial com bons compradores",
          "Recovery (cobrança administrativa e judicial) via seguradora",
          "Inteligência de mercado sobre setores e regiões de risco"
        ]
      },
      {
        "id": "como-funciona",
        "heading": "Como funciona operacionalmente?",
        "paragraphs": [
          "1) Segurado envia carteira de clientes B2B (nome, CNPJ, limite pretendido). 2) Seguradora analisa cada CNPJ e aprova limite máximo por comprador. 3) Vendas dentro do limite ficam automaticamente cobertas. 4) Em caso de inadimplência acima do prazo de mora, segurado aciona a apólice.",
          "O prêmio é normalmente calculado como percentual sobre o faturamento segurado (ex.: 0,2% a 0,8% ao ano do faturamento B2B)."
        ]
      },
      {
        "id": "para-quem",
        "heading": "Para quais empresas faz sentido?",
        "paragraphs": [
          "Indústria com concentração de vendas em poucos clientes; atacadista com muitos compradores pequenos; distribuidor de bens duráveis; empresa exportadora; prestador de serviços B2B com faturamento parcelado; operações de vendor/factoring.",
          "Não faz sentido para varejo B2C, ticket muito baixo ou empresas com fluxo à vista."
        ]
      },
      {
        "id": "custo",
        "heading": "Custo e alavancagem financeira",
        "paragraphs": [
          "O custo é frequentemente inferior à economia gerada por PDD, custo de capital e perda direta com inadimplência — e habilita melhores condições em bancos e adiantamento de recebíveis, gerando ROI positivo desde o primeiro ano em boa parte dos casos.",
          "As coberturas, condições, franquias, carências e valores dependem da apólice, aceitação da seguradora/operadora e perfil de risco. Este conteúdo é educacional e não substitui a análise técnica de um corretor habilitado."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Seguro de Crédito cobre qualquer inadimplência?",
        "a": "Não. Cobre inadimplência por insolvência formal ou mora prolongada de compradores previamente aprovados dentro dos limites concedidos. Vendas fora do limite não são cobertas."
      },
      {
        "q": "Preciso segurar todos os meus clientes?",
        "a": "Geralmente sim, para evitar seleção adversa. Existem apólices catch-all (toda a carteira) e apólices por comprador nomeado, dependendo do produto."
      },
      {
        "q": "O que é 'mora prolongada'?",
        "a": "É o período em que o comprador está inadimplente sem sinal de recuperação (geralmente 90 a 180 dias após o vencimento). Após esse prazo, o segurado pode acionar a apólice."
      },
      {
        "q": "Qual o percentual indenizado?",
        "a": "Costuma ser de 80% a 90% do valor devido, com franquia por sinistro ou anual, dependendo da estrutura contratada."
      },
      {
        "q": "Serve para vendas ao setor público?",
        "a": "Existem produtos específicos para risco público, com condições diferenciadas. Ente público não entra em insolvência clássica, então o gatilho de sinistro é diferente."
      },
      {
        "q": "Reduz custo de captação bancária?",
        "a": "Sim, é comum. Bancos aceitam recebíveis segurados como colateral e reduzem taxa de desconto, melhorando o custo médio de capital."
      }
    ],
    "related": [
      {
        "label": "Página comercial: Seguro de Crédito",
        "href": "/seguro-de-credito",
        "description": "Cotação com resseguradoras internacionais."
      },
      {
        "label": "Guia: Seguro Garantia",
        "href": "/guias/seguro-garantia",
        "description": "Garantia de execução contratual."
      },
      {
        "label": "Guia: Seguro Empresarial",
        "href": "/guias/seguro-empresarial-guarulhos",
        "description": "Base multirrisco."
      }
    ]
  },
  {
    "slug": "seguro-cyber",
    "title": "Guia do Seguro Cyber",
    "h1": "Seguro Cyber: proteção contra ransomware, vazamento de dados e LGPD",
    "metaTitle": "Seguro Cyber: guia completo (ransomware, LGPD, vazamento)",
    "metaDescription": "Guia do Seguro Cyber: coberturas para ransomware, vazamento de dados, LGPD, fraude eletrônica, extorsão cibernética, resposta a incidentes e interrupção.",
    "eyebrow": "Guia · Cyber",
    "readTime": "14 min",
    "updatedAt": "2026-07-28",
    "quickAnswer": "Seguro Cyber cobre custos e responsabilidades decorrentes de incidentes cibernéticos: ransomware, vazamento de dados, ataques a sistemas, fraude eletrônica, interrupção de negócio, defesa jurídica, notificação a titulares e multas administrativas por LGPD (dentro dos limites contratuais). Indispensável para empresas com dados sensíveis, e-commerce, saúde, educação e serviços em nuvem.",
    "commercialHref": "/seguro-cyber",
    "commercialLabel": "Cotar Seguro Cyber",
    "whatsappMessage": "Olá, quero cotar Seguro Cyber com a Patro Seguros.",
    "category": "Seguros B2B Especializados",
    "sections": [
      {
        "id": "por-que",
        "heading": "Por que sua empresa precisa de Seguro Cyber?",
        "paragraphs": [
          "O Brasil está entre os países mais atacados por ransomware do mundo. O custo médio de um incidente cibernético para uma empresa média ultrapassa milhões de reais quando somados perícia, negociação, restauração, notificação, defesa, honorários, multa LGPD e interrupção de operações.",
          "Além disso, a LGPD (Lei 13.709/2018) responsabiliza controladores e operadores por vazamento de dados pessoais, com multas de até 2% do faturamento (limitadas a R$ 50 milhões por infração). Fornecedores exigem cada vez mais que parceiros comprovem apólice cyber."
        ]
      },
      {
        "id": "coberturas",
        "heading": "Quais coberturas o Seguro Cyber oferece?",
        "paragraphs": [
          "As coberturas se dividem em first-party (danos ao próprio segurado) e third-party (danos causados a terceiros):"
        ],
        "bullets": [
          "Resposta a incidentes: perícia forense, contenção, restauração",
          "Notificação a titulares de dados afetados",
          "Extorsão cibernética (negociação e pagamento em ransomware, quando legalmente possível)",
          "Interrupção de negócio por ataque (equivalente a lucros cessantes)",
          "Fraude eletrônica e phishing",
          "Defesa jurídica em processos por vazamento",
          "Multas administrativas por LGPD (dentro do limite contratual/legal)",
          "Indenização a terceiros afetados (clientes, parceiros)",
          "Custos de PR e reputação"
        ]
      },
      {
        "id": "quem-precisa",
        "heading": "Quem precisa mais desse seguro?",
        "paragraphs": [
          "Prioridade máxima: saúde (clínicas, hospitais, planos), educação, e-commerce, fintech, softwarehouse/SaaS, contabilidade, escritório de advocacia, indústria com automação e empresas com base grande de dados pessoais.",
          "Prioridade alta: indústria, comércio de médio/grande porte, prestadores de serviços B2B com sistemas ERP/CRM em nuvem."
        ]
      },
      {
        "id": "exclusoes",
        "heading": "Exclusões típicas",
        "paragraphs": [
          "Ato doloso do segurado, falha conhecida e não corrigida (patch disponível não aplicado), guerra cibernética entre estados, danos físicos a hardware, PII já comprometida antes da contratação. Cada apólice tem redação própria — leia com atenção."
        ]
      },
      {
        "id": "questionario",
        "heading": "Questionário de subscrição: como se preparar",
        "paragraphs": [
          "Seguradoras avaliam maturidade cyber antes de aceitar risco. Itens comuns: backup offline testado, MFA em acessos críticos, EDR/antivírus corporativo, política de senha, patch management, treinamento de colaboradores, plano de resposta a incidentes, encriptação de dados sensíveis.",
          "Empresas com boa maturidade recebem melhores condições. A Patro apoia na revisão do questionário antes do envio."
        ]
      },
      {
        "id": "custo",
        "heading": "Quanto custa?",
        "paragraphs": [
          "O prêmio depende do faturamento, setor, volume de dados pessoais, medidas de segurança, LMI e cobertura pretendida. Apólices para PME partem de valores acessíveis para R$ 500 mil a R$ 1 milhão de LMI; empresas médias contratam LMIs de R$ 5 a R$ 25 milhões.",
          "As coberturas, condições, franquias, carências e valores dependem da apólice, aceitação da seguradora/operadora e perfil de risco. Este conteúdo é educacional e não substitui a análise técnica de um corretor habilitado."
        ]
      }
    ],
    "faqs": [
      {
        "q": "O Seguro Cyber paga o ransomware?",
        "a": "Sim, dentro do LMI, respeitadas as sanções internacionais aplicáveis (ex.: OFAC). A seguradora costuma acompanhar a negociação com especialistas."
      },
      {
        "q": "Cobre multa da ANPD/LGPD?",
        "a": "Cobre parcialmente, respeitando limites contratuais e legalidade. Multas por dolo ou má-fé não são cobertas em regra."
      },
      {
        "q": "Preciso ter equipe de TI para contratar?",
        "a": "Não é obrigatório, mas exige-se conjunto mínimo de controles (backup, MFA, antivírus, política). Empresas sem controle mínimo têm dificuldade de aprovação."
      },
      {
        "q": "Cobre golpe do Pix?",
        "a": "Fraude eletrônica direcionada à empresa (BEC, golpe de troca de boleto, invasão de e-mail comercial) costuma ser coberta. Fraude contra cliente individual, geralmente não."
      },
      {
        "q": "Prazo para acionar?",
        "a": "Assim que houver suspeita fundada de incidente. A resposta rápida reduz custo e dano — a maioria das apólices exige comunicação em 24 a 72h."
      },
      {
        "q": "Cobre incidente por falha de fornecedor em nuvem?",
        "a": "Depende. Muitas apólices cobrem interrupção causada por provedor de serviço, dentro do LMI. Confira a cláusula 'dependent business interruption'."
      }
    ],
    "related": [
      {
        "label": "Página comercial: Seguro Cyber",
        "href": "/seguro-cyber",
        "description": "Cotação para PME e empresas médias."
      },
      {
        "label": "Guia: Seguros para Consultórios",
        "href": "/guias/seguros-para-consultorios",
        "description": "Cyber para clínicas e LGPD."
      },
      {
        "label": "Guia: Seguro Empresarial",
        "href": "/guias/seguro-empresarial-guarulhos",
        "description": "Base multirrisco."
      }
    ]
  },
  {
    "slug": "seguro-transporte-cargas",
    "title": "Guia do Seguro Transporte e Cargas",
    "h1": "Seguro Transporte e Cargas: RCTR-C, RCF-DC, RCTR-VI e cargas nacionais/internacionais",
    "metaTitle": "Seguro Transporte e Cargas: guia (RCTR-C, RCF-DC, embarcador)",
    "metaDescription": "Guia do seguro transporte e cargas: RCTR-C, RCF-DC, RCTR-VI, cobertura para embarcador e transportador, cargas nacionais, importação e exportação.",
    "eyebrow": "Guia · Transporte",
    "readTime": "15 min",
    "updatedAt": "2026-07-28",
    "quickAnswer": "Seguro Transporte protege cargas em movimento — em rodovia, ferrovia, hidrovia ou aérea. Divide-se em obrigatórios do transportador (RCTR-C, RCF-DC), facultativo do transportador (RCTR-VI) e cobertura do embarcador/dono da carga. Guarulhos, com o Aeroporto de Cumbica e forte concentração logística, é polo natural de contratação.",
    "commercialHref": "/seguro-transporte",
    "commercialLabel": "Cotar Seguro Transporte",
    "whatsappMessage": "Olá, quero cotar Seguro Transporte / Cargas com a Patro Seguros.",
    "category": "Transporte & Logística",
    "sections": [
      {
        "id": "quem-contrata",
        "heading": "Quem contrata: embarcador ou transportador?",
        "paragraphs": [
          "Existem dois perfis principais: o embarcador (dono da carga) e o transportador (quem executa o frete). Ambos podem — e devem — ter apólices próprias, pois cobrem riscos complementares.",
          "O transportador é obrigado por lei a contratar RCTR-C e RCF-DC. O embarcador pode contratar cobertura do valor total da carga, com base em declaração de embarque, para se proteger dos limites contratuais do transportador."
        ]
      },
      {
        "id": "obrigatorios",
        "heading": "Seguros obrigatórios do transportador",
        "paragraphs": [
          "Regulamentados pelo CTC (Código de Trânsito) e SUSEP:"
        ],
        "bullets": [
          "RCTR-C: Responsabilidade Civil do Transportador Rodoviário de Carga por perdas durante o transporte",
          "RCF-DC: Responsabilidade Civil Facultativa por Desaparecimento de Carga (roubo/furto)",
          "Seguro de Responsabilidade Civil sobre Danos Ambientais (para cargas perigosas)"
        ]
      },
      {
        "id": "facultativos",
        "heading": "Coberturas facultativas do transportador",
        "paragraphs": [
          "Ampliam a proteção além dos obrigatórios:"
        ],
        "bullets": [
          "RCTR-VI: cobre valor superior à média contratual com o embarcador",
          "RC Estrada (avarias em terceiros durante operação)",
          "Frota e RCF-V para veículos próprios",
          "Casco (para transportadora com frota própria)"
        ]
      },
      {
        "id": "embarcador",
        "heading": "Cobertura do embarcador: por que contratar?",
        "paragraphs": [
          "As coberturas obrigatórias do transportador têm limites contratuais. Cargas de alto valor (eletrônicos, farmacêuticos, cosméticos, moda) frequentemente superam esses limites — se algo acontecer, o embarcador arca com o gap.",
          "A apólice do embarcador cobre a carga em todo o trajeto (porta a porta), incluindo armazenagem intermediária, transbordo e importação/exportação, protegendo o dono da carga independentemente do transportador contratado."
        ]
      },
      {
        "id": "gerenciamento-risco",
        "heading": "Gerenciamento de risco (GR)",
        "paragraphs": [
          "Cargas de alto valor exigem plano de GR aprovado pela seguradora: rastreador, escolta armada em rotas específicas, veículos com bloqueio, motorista treinado e checagem de itinerário. O não cumprimento pode gerar negativa de sinistro.",
          "Em Guarulhos, rotas para o interior de SP, MG e RJ têm requisitos específicos de GR, especialmente para cargas de eletrônica e cosmética."
        ]
      },
      {
        "id": "internacional",
        "heading": "Transporte internacional (importação/exportação)",
        "paragraphs": [
          "Cargas internacionais são regidas por termos INCOTERMS (FOB, CIF, DAP, DDP, etc.) que determinam quem contrata o seguro em cada trecho. É comum contratar apólice ODA (Open Cover) para carteira anual de embarques."
        ]
      },
      {
        "id": "custo",
        "heading": "Custo e cotação",
        "paragraphs": [
          "O prêmio é calculado como percentual do valor movimentado (para embarcadores) ou percentual do faturamento de frete (para transportadores). Varia por tipo de carga, rota, GR e sinistralidade histórica.",
          "As coberturas, condições, franquias, carências e valores dependem da apólice, aceitação da seguradora/operadora e perfil de risco. Este conteúdo é educacional e não substitui a análise técnica de um corretor habilitado."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Preciso de RCTR-C mesmo com veículo agregado?",
        "a": "Sim. A responsabilidade pela carga é do transportador contratante, independentemente do veículo ser próprio ou agregado. RCTR-C é obrigatório."
      },
      {
        "q": "O que é averbação de carga?",
        "a": "É o registro individualizado de cada embarque na apólice, permitindo cobertura efetiva. Sem averbação, sinistro pode ser negado por ausência de comunicação."
      },
      {
        "q": "Roubo de carga em Guarulhos é coberto?",
        "a": "Sim, na cobertura RCF-DC (do transportador) ou na apólice do embarcador. GR aprovado é requisito para regiões de alto risco."
      },
      {
        "q": "Cargas perigosas têm apólice específica?",
        "a": "Sim, exigem cobertura ambiental adicional e habilitação específica do motorista (MOPP). Prêmio é significativamente mais alto."
      },
      {
        "q": "Aéreo Cumbica-exterior é coberto?",
        "a": "Sim, com apólice de transporte aéreo internacional, incluindo trajeto porta-a-porta e armazenagem em terminal."
      },
      {
        "q": "O que é apólice ODA (Open Cover)?",
        "a": "Apólice aberta com vigência anual que cobre automaticamente todos os embarques declarados, ideal para embarcadores frequentes."
      }
    ],
    "related": [
      {
        "label": "Página comercial: Seguro Transporte",
        "href": "/seguro-transporte",
        "description": "Cotação para transportador e embarcador."
      },
      {
        "label": "Página comercial: Seguro Galpão Cumbica",
        "href": "/seguro-galpao-cumbica",
        "description": "Armazenagem em Guarulhos/Cumbica."
      },
      {
        "label": "Página comercial: Seguro de Frota",
        "href": "/seguro-frota",
        "description": "Cobertura para 4+ veículos."
      }
    ]
  },
  {
    "slug": "patro-private",
    "title": "Guia Patro Private",
    "h1": "Patro Private: proteção patrimonial premium para empresários, executivos e famílias de alta renda",
    "metaTitle": "Patro Private: guia de proteção patrimonial premium (HNW)",
    "metaDescription": "Guia Patro Private: proteção patrimonial para famílias de alta renda — imóveis premium, veículos de luxo, obras de arte, D&O, kidnap, jatos e cobertura mundial.",
    "eyebrow": "Guia · Private",
    "readTime": "13 min",
    "updatedAt": "2026-07-28",
    "quickAnswer": "Patro Private é a vertical premium da Patro Seguros para famílias de alta renda, empresários e executivos. Combina apólices HNW (High Net Worth) para residências e veículos de luxo, obras de arte, joias, embarcações, aeronaves, D&O para conselhos, kidnap & ransom e cobertura mundial — com atendimento privativo e resposta 24/7.",
    "commercialHref": "/patro-private",
    "commercialLabel": "Conhecer Patro Private",
    "whatsappMessage": "Olá, quero informações sobre a Patro Private para proteção patrimonial premium.",
    "category": "Patrimônio Premium",
    "sections": [
      {
        "id": "para-quem",
        "heading": "Para quem é a Patro Private?",
        "paragraphs": [
          "A vertical Private atende famílias e empresas com patrimônio consolidado, exposição pública, patrimônio internacional ou operações que exigem tratamento diferenciado. Isso inclui empresários, C-levels de empresas listadas, herdeiros, profissionais liberais de alta renda, family offices e patriarcas gestores.",
          "O ponto de entrada típico é a soma de veículos de luxo/importados, imóveis premium, obras de arte, embarcações, joias e participação em conselhos — que juntos exigem coordenação atuarial diferente do mercado massificado."
        ]
      },
      {
        "id": "produtos",
        "heading": "Produtos e coberturas oferecidos",
        "paragraphs": [
          "Portfólio da vertical Private:"
        ],
        "bullets": [
          "HNW Residencial: imóveis premium (SP, litoral, interior, exterior)",
          "HNW Auto: veículos de luxo, importados, coleções, esportivos",
          "Fine Art: obras de arte, coleções, catalogação e transporte",
          "Jóias e relojoaria: apólice específica, com cobertura mundial",
          "Náutico: iates, lanchas, jet ski, cobertura em águas nacionais e internacionais",
          "Aeronaves: jato executivo, helicóptero, turbo hélice",
          "D&O (Directors & Officers): responsabilidade civil de administradores",
          "Kidnap & Ransom: sequestro, extorsão, escolta e resposta 24/7",
          "Vida Premium: capital elevado com planejamento sucessório",
          "Saúde internacional: cobertura fora do Brasil (Bupa, Cigna, GeoBlue)",
          "RC Familiar Ampliada: cobertura global com LMI elevado"
        ]
      },
      {
        "id": "diferenciais",
        "heading": "Diferenciais no atendimento",
        "paragraphs": [
          "Consultor dedicado com atendimento privativo, revisão anual proativa da carteira patrimonial (não só das apólices), coordenação com family office, jurídico e escritórios de wealth planning, resposta 24/7 em sinistros, coordenação de peritos internacionais e apoio em situações de crise (sequestro, extorsão, exposição midiática)."
        ]
      },
      {
        "id": "internacional",
        "heading": "Cobertura internacional",
        "paragraphs": [
          "Coberturas HNW são frequentemente estruturadas com base internacional (Chubb, AIG, HDI Global, Zurich, Allianz Global), permitindo apólice única com validade mundial para imóveis, veículos, obras de arte, embarcações e saúde do titular e dependentes."
        ]
      },
      {
        "id": "sucessao",
        "heading": "Integração com planejamento sucessório",
        "paragraphs": [
          "A vertical Private trabalha em conjunto com advogados e family offices para integrar seguros ao planejamento sucessório: seguro de vida como liquidez para ITCMD, D&O para proteger administradores de holdings familiares, apólices para blindagem patrimonial e proteção de sucessores.",
          "As coberturas, condições, franquias, carências e valores dependem da apólice, aceitação da seguradora/operadora e perfil de risco. Este conteúdo é educacional e não substitui a análise técnica de um corretor habilitado."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Qual patrimônio mínimo para acessar a Patro Private?",
        "a": "Não temos corte único formal. O ponto de entrada típico é a combinação de veículos de luxo, imóvel premium e coberturas específicas (arte, náutico, D&O). Uma conversa inicial define o encaixe."
      },
      {
        "q": "Atendem clientes fora de Guarulhos e SP?",
        "a": "Sim. A Patro Private atende em todo o Brasil e estrutura apólices internacionais para clientes com residência ou patrimônio no exterior."
      },
      {
        "q": "Fazem apólice para obra de arte específica?",
        "a": "Sim. Fine Art com catalogação, avaliação por perito, cobertura em exposições e transporte internacional."
      },
      {
        "q": "D&O é para qualquer empresa?",
        "a": "Priorizamos empresas médias, listadas, com investidor externo, com conselho ativo ou expostas a risco regulatório. Também estruturamos D&O para holdings familiares."
      },
      {
        "q": "Kidnap & Ransom é comercializado no Brasil?",
        "a": "Sim, com discrição elevada. A contratação é restrita e o produto é mantido sob sigilo — informações são compartilhadas apenas com o titular e conselheiros indicados."
      },
      {
        "q": "Como agendar uma reunião reservada?",
        "a": "Envie WhatsApp ao consultor Private com breve descrição do perfil (não é necessário detalhar patrimônio). Retornamos em 24h úteis com data e local reservados."
      }
    ],
    "related": [
      {
        "label": "Página comercial: Patro Private",
        "href": "/patro-private",
        "description": "Vertical premium da Patro Seguros."
      },
      {
        "label": "Guia: Seguro Vida",
        "href": "/guias/seguro-vida",
        "description": "Planejamento sucessório."
      },
      {
        "label": "Guia: Seguro Cyber",
        "href": "/guias/seguro-cyber",
        "description": "Proteção digital familiar e empresarial."
      }
    ]
  }
];

export const GUIAS_PILARES_BY_SLUG: Record<string, GuiaPilar> = Object.fromEntries(GUIAS_PILARES.map(g => [g.slug, g]));
export const GUIAS_PILARES_SLUGS = GUIAS_PILARES.map(g => g.slug);
