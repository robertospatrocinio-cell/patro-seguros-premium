import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-shopping-maia.webp";

const SeoSegurosShoppingMaiaCidadeMaia = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguros no Shopping Maia e Cidade Maia, Guarulhos"
    subtitle="Corretora de seguros ao lado do Shopping Maia, no Edifício Via Alameda — Cidade Maia, Guarulhos/SP. Atendimento presencial para lojistas, frequentadores, moradores e empresas do bairro."
    description="A Patro Seguros tem escritório no Edifício Via Alameda (Av. Salgado Filho, 2120 — Sala 219), a poucos passos do Shopping Maia, no coração da Cidade Maia em Guarulhos. Atendemos lojistas e quiosques do shopping, moradores dos condomínios da região, profissionais liberais com consultório no bairro e clientes que circulam diariamente pelo polo comercial. Com mais de 16 seguradoras parceiras, comparamos preços e coberturas para entregar a melhor proteção em seguro auto, residencial, vida, empresarial, condomínio, RC profissional e plano de saúde."
    detailedDescription={`A Cidade Maia é hoje um dos endereços mais valorizados de Guarulhos. O bairro reúne torres residenciais de alto padrão, o Shopping Maia (com mais de 200 lojas e operação 7 dias por semana), restaurantes, clínicas, escritórios, escolas e o Parque Cidade Maia — tudo em uma microrregião planejada com forte movimento de consumo, serviços e visitantes da Grande São Paulo.

Esse perfil cria necessidades de seguro muito específicas. Lojistas e operadores de quiosque do Shopping Maia precisam de seguro empresarial com cobertura para incêndio, roubo, RC do estabelecimento e quebra de equipamentos. Consultórios e clínicas instalados no Via Alameda e nas torres comerciais do entorno (médicos, dentistas, advogados, contadores, fisioterapeutas) precisam de seguro de RC profissional para se proteger de processos. Moradores dos condomínios Cidade Maia, Maia Premium e empreendimentos vizinhos precisam de seguro residencial e seguro do condomínio dentro das exigências da Lei 4.591/64. E quem se desloca diariamente até o shopping, seja para trabalhar ou consumir, precisa de seguro auto com assistência 24h e cobertura contra furto/roubo no estacionamento.

A Patro Seguros está literalmente na frente do shopping, com atendimento presencial mediante agendamento, estacionamento próprio no Via Alameda e suporte digital via WhatsApp para quem prefere resolver tudo a distância. Conhecemos a realidade do bairro, dos lojistas que abrem antes das 10h, das clínicas que atendem até à noite, dos condomínios com poucas vagas para visitantes, e adaptamos cada apólice ao uso real — sem cobertura sobrando ou faltando.

Nossa equipe técnica acompanha o sinistro do início ao fim. Em caso de furto em loja, alagamento em sala comercial, batida no estacionamento do shopping ou processo contra um profissional liberal, o cliente fala diretamente com seu corretor responsável — sem call center, sem URA, sem sistema de senha. É essa proximidade que nos rendeu a indicação de mais de 500 PMEs e famílias na região.`}
    icon="🏬"
    badge="Atendimento presencial — em frente ao Shopping Maia"
    metaDescription="Corretora de seguros em frente ao Shopping Maia, Cidade Maia, Guarulhos. Seguro para lojistas, quiosques, consultórios, moradores e clientes do shopping. Cotação grátis com 16+ seguradoras."
    coverages={[
      { title: "Seguro Empresarial para Lojas e Quiosques do Shopping Maia", description: "Cobertura completa para incêndio, roubo de mercadorias, danos elétricos, RC do estabelecimento, vidros, lucros cessantes e quebra de equipamentos para lojas, quiosques e operações de food do Shopping Maia." },
      { title: "Seguro Residencial para Moradores da Cidade Maia", description: "Proteção para apartamentos e casas nos condomínios da Cidade Maia, Maia Premium e entorno do Shopping Maia. Inclui assistência 24h, vidros, danos elétricos e RC familiar." },
      { title: "Seguro Auto com Cobertura no Estacionamento do Shopping", description: "Apólice com cobertura de roubo, furto, colisão e assistência 24h para clientes e funcionários do shopping. Vistoria e atendimento presencial no Via Alameda." },
      { title: "Seguro de RC Profissional para Consultórios do Via Alameda", description: "Proteção contra processos para médicos, dentistas, fisioterapeutas, psicólogos, advogados e contadores que atuam no Edifício Via Alameda e nas torres comerciais da Cidade Maia." },
      { title: "Seguro de Condomínio (Obrigatório por Lei)", description: "Apólice obrigatória para os condomínios residenciais e comerciais da Cidade Maia conforme Lei 4.591/64. Cobre incêndio, RC do condomínio, vendaval e danos a terceiros nas áreas comuns." },
      { title: "Seguro de Vida e Plano de Saúde", description: "Para moradores, lojistas e funcionários do polo Cidade Maia. Comparação entre Amil, SulAmérica, Bradesco Saúde, Hapvida, Unimed e outras 20+ operadoras." },
      { title: "Seguro de Celular e Eletrônicos", description: "Para clientes e funcionários que circulam diariamente pelo Shopping Maia: cobertura contra roubo, furto qualificado, queda acidental e danos por líquidos." },
      { title: "Seguro Garantia para Lojistas", description: "Apólice exigida por administradoras de shopping em substituição ao depósito caução do contrato de locação. Libera capital de giro do lojista." },
    ]}
    howItWorks={[
      { step: "1", title: "Agende presencial ou online", description: "Visite-nos no Edifício Via Alameda — Sala 219 (em frente ao Shopping Maia) com agendamento prévio, ou inicie pelo WhatsApp / formulário online." },
      { step: "2", title: "Diagnóstico técnico do seu perfil", description: "Analisamos seu uso real (loja, consultório, residência, veículo) e dimensionamos coberturas sob medida — sem vendas casadas." },
      { step: "3", title: "Cotação comparativa em 2h úteis", description: "Comparamos 16+ seguradoras (Porto, Allianz, Bradesco, Tokio Marine, HDI, Mapfre, SulAmérica e outras) e devolvemos as 3 melhores propostas." },
      { step: "4", title: "Emissão e suporte com corretor humano", description: "Apólice emitida com assinatura digital ou presencial. Em caso de sinistro, você fala direto com seu corretor — sem call center." },
    ]}
    pricingInfo={{
      intro: "Os preços variam conforme o tipo de seguro, perfil do cliente e localização. Como referência para o entorno do Shopping Maia: seguro empresarial para loja de 50m² fica entre R$ 180 e R$ 450/mês; seguro residencial para apartamento de 80m² na Cidade Maia entre R$ 70 e R$ 180/mês; seguro auto para uso urbano em Guarulhos entre R$ 130 e R$ 380/mês; seguro de RC profissional entre R$ 90 e R$ 350/mês conforme especialidade.",
      factors: [
        "Tipo de imóvel ou veículo e finalidade de uso (residencial, comercial, profissional)",
        "Faturamento da loja, valor do estoque e número de funcionários",
        "Especialidade profissional (no caso de RC) e histórico de sinistros",
        "Coberturas adicionais escolhidas (lucros cessantes, vidros, equipamentos)",
        "Sistemas de segurança (alarme monitorado, CFTV, sprinkler) — geram desconto",
        "Histórico de sinistros nos últimos 5 anos do cliente",
      ],
      note: "Dica Patro: lojistas do Shopping Maia que apresentam o laudo de segurança patrimonial do shopping na cotação conseguem descontos de 10% a 20% no seguro empresarial — o sistema de monitoramento 24h da administração reduz o risco para a seguradora.",
    }}
    realScenarios={[
      { title: "Case: Loja do Shopping Maia recuperou R$ 85 mil após curto-circuito", description: "Uma loja de eletrônicos do Shopping Maia, cliente da Patro, sofreu curto-circuito que danificou estoque e equipamentos no valor de R$ 85.000. A apólice empresarial cobriu integralmente os danos elétricos + lucros cessantes pelos 22 dias de paralisação para reforma. Indenização paga em 18 dias." },
      { title: "Case: Consultório odontológico do Via Alameda evitou processo de R$ 200 mil", description: "Um dentista com consultório no Edifício Via Alameda foi alvo de uma reclamação judicial por procedimento estético. A apólice de RC profissional cobriu honorários advocatícios, perícia e o acordo final, evitando que o profissional descapitalizasse R$ 200 mil para se defender." },
      { title: "Case: Morador da Cidade Maia teve carro furtado e recebeu indenização em 12 dias", description: "Cliente da Patro teve seu Honda Civic furtado no estacionamento de uma rua próxima ao Shopping Maia. Com BO em 2h, documentos completos e apólice 100% em dia, a Porto Seguro pagou a indenização integral (R$ 92.000) em 12 dias úteis. Ele já estava com carro novo na garagem em 18 dias." },
      { title: "Case: Quiosque de café no Shopping Maia migrou para apólice mais barata", description: "Quiosque de café da praça de alimentação pagava R$ 520/mês em seguro empresarial com seguradora histórica. Após cotação comparativa da Patro entre 6 seguradoras, migrou para apólice equivalente por R$ 312/mês — economia de R$ 2.500/ano sem perder cobertura de RC, incêndio e quebra de equipamentos." },
    ]}
    tips={[
      "Lojistas do Shopping Maia: solicite o laudo de segurança patrimonial da administração — vale 10-20% de desconto no seguro empresarial.",
      "Moradores da Cidade Maia: verifique se o seguro do condomínio cobre as áreas comuns. O conteúdo do seu apartamento exige apólice residencial separada.",
      "Profissionais liberais no Via Alameda: seguro de RC profissional é dedutível no Imposto de Renda como despesa operacional.",
      "Quem estaciona no Shopping Maia: o estacionamento privado pode acionar a guarda do shopping, mas furto e arrombamento de veículos exigem seguro auto com cobertura específica.",
      "Renovação 60 dias antes do vencimento permite cotação comparativa real e evita renovação automática com aumento.",
    ]}
    whoNeeds={[
      "Lojistas, franqueados e operadores de quiosque do Shopping Maia",
      "Moradores dos condomínios da Cidade Maia, Maia Premium e adjacências",
      "Médicos, dentistas, advogados e profissionais liberais com consultório no Via Alameda ou torres comerciais da Cidade Maia",
      "Restaurantes, cafés e operações de food da praça de alimentação do Shopping Maia",
      "Síndicos e administradoras dos condomínios residenciais e comerciais da Cidade Maia",
      "Funcionários e prestadores de serviço que circulam diariamente pelo polo comercial",
      "Clientes do shopping que estacionam o veículo na região",
      "PMEs com escritório nas torres corporativas vizinhas ao Shopping Maia",
    ]}
    whyPatro={[
      "Escritório no Edifício Via Alameda — Sala 219, em frente ao Shopping Maia, atendimento presencial com agendamento",
      "Mais de 16 seguradoras comparadas em paralelo (Porto, Allianz, Bradesco, Tokio Marine, HDI, Mapfre, Sompo, SulAmérica e outras)",
      "Mais de 500 PMEs e famílias atendidas em Guarulhos — referência local desde 2012",
      "Suporte humano: você fala direto com seu corretor em caso de sinistro, sem call center ou URA",
      "Conhecimento técnico das exigências do Shopping Maia para lojistas e dos condomínios da Cidade Maia",
      "Atendimento digital paralelo via WhatsApp e formulário online para quem prefere a distância",
    ]}
    faqs={[
      { question: "A Patro Seguros fica dentro do Shopping Maia?", answer: "O escritório fica no Edifício Via Alameda (Av. Salgado Filho, 2120 — Sala 219), a poucos metros do Shopping Maia, na mesma quadra. O atendimento presencial é com agendamento prévio, e o estacionamento do prédio é próprio. Para urgências, atendemos por WhatsApp em (11) 5199-7500." },
      { question: "Quanto custa o seguro empresarial para uma loja do Shopping Maia?", answer: "Depende do tamanho da loja, valor do estoque, faturamento e coberturas escolhidas. Como referência, lojas de 50 a 80 m² costumam ficar entre R$ 180 e R$ 450/mês com cobertura de incêndio, roubo, RC, danos elétricos, vidros e lucros cessantes. Apresentar o laudo de segurança do shopping pode reduzir o prêmio em 10 a 20%." },
      { question: "Vocês atendem lojistas e quiosques de outros shoppings de Guarulhos?", answer: "Sim. Embora nosso escritório seja em frente ao Shopping Maia, atendemos lojistas de todos os shoppings de Guarulhos (Bonsucesso, Maia, Internacional Shopping, Parque Maia) e da região metropolitana, com cotação online e suporte digital." },
      { question: "Moro em condomínio da Cidade Maia. Preciso de seguro residencial mesmo com o seguro do condomínio?", answer: "Sim. O seguro do condomínio cobre apenas as áreas comuns (estrutura, elevadores, salão de festas, fachada). O conteúdo do seu apartamento (móveis, eletrodomésticos, eletrônicos, roupas, joias) e benfeitorias internas só são cobertos por uma apólice residencial individual em seu nome." },
      { question: "Preciso de seguro de RC para meu consultório no Via Alameda?", answer: "Altamente recomendado. Profissionais liberais (médicos, dentistas, fisioterapeutas, psicólogos, advogados, contadores, engenheiros) podem ser processados por erro técnico, falha de procedimento ou prejuízo a clientes. O seguro de RC profissional cobre honorários advocatícios, perícia e indenizações. É despesa dedutível no Imposto de Renda." },
      { question: "Meu carro foi furtado próximo ao Shopping Maia. Como acionar o seguro?", answer: "1) Faça o BO online ou na delegacia mais próxima imediatamente; 2) Comunique a seguradora pelo aplicativo, telefone ou pelo seu corretor da Patro; 3) Envie a documentação solicitada (BO, CNH, CRV, chaves remanescentes). Com tudo em ordem, a indenização sai em 10 a 30 dias corridos. Estamos em frente ao shopping caso precise de suporte presencial." },
      { question: "Vocês conseguem seguro garantia para substituir caução de loja?", answer: "Sim. O seguro garantia de obrigações contratuais é aceito pela maioria das administradoras de shopping em substituição ao depósito caução do contrato de locação, liberando capital de giro do lojista. Cotamos com Pottencial, BMG Seguros, Junto Seguros e outras especializadas." },
      { question: "O atendimento presencial precisa de agendamento?", answer: "Preferencialmente sim, para garantir que um corretor especializado no seu tipo de seguro esteja disponível. Agende pelo WhatsApp (11) 5199-7500 ou pelo formulário do site. Atendemos de segunda a sexta, das 9h às 18h, no Edifício Via Alameda — Sala 219." },
    ]}
    relatedInsurances={[
      { title: "Seguro para Lojas e Shopping", link: "/seguro-lojas-shopping" },
      { title: "Seguro Empresarial Guarulhos", link: "/seguro-empresarial-guarulhos" },
      { title: "Seguro Condomínio Guarulhos", link: "/seguro-condominio-guarulhos" },
      { title: "Seguro Residencial Guarulhos", link: "/seguro-residencial-guarulhos" },
      { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
      { title: "Plano de Saúde Guarulhos", link: "/plano-saude-guarulhos" },
      { title: "Corretora Seguros Guarulhos", link: "/corretora-seguros-guarulhos" },
    ]}
  />
);

export default SeoSegurosShoppingMaiaCidadeMaia;
