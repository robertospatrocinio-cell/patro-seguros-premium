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
    faqs={[
      // ====== SEGURO AUTO – clientes e funcionários do Shopping Maia ======
      { question: "Seguro auto cobre furto ou roubo no estacionamento do Shopping Maia?", answer: "Sim. A cobertura de roubo/furto da apólice auto vale em qualquer local do território nacional, incluindo o estacionamento do Shopping Maia. Em caso de sinistro: 1) registre o BO online imediatamente; 2) avise a administração do shopping e solicite imagens do CFTV; 3) acione a seguradora pelo app ou pelo seu corretor Patro. Indenização integral costuma sair em 10 a 30 dias corridos." },
      { question: "Tive minha porta amassada no estacionamento do Shopping Maia. O seguro paga?", answer: "Sim, desde que sua apólice tenha cobertura de colisão (cobertura compreensiva). Se o autor for identificado pelas câmeras do shopping, a seguradora pode acionar o terceiro em regresso e devolver sua franquia. Sempre solicite o registro de ocorrência interna na administração e peça as imagens do CFTV nas primeiras 48h." },
      { question: "Existe desconto para quem usa o carro só para ir ao Shopping Maia e voltar para casa?", answer: "Sim. Perfis de baixa quilometragem (até 10 mil km/ano) e uso urbano em Guarulhos têm tarifas reduzidas. Apólices com perfil 'uso particular sem deslocamento ao trabalho' podem custar de 15% a 35% menos. Faça a cotação informando o uso real para evitar agravamento em sinistro." },
      { question: "A assistência 24h cobre pane seca ou pneu furado no estacionamento do shopping?", answer: "Sim. A assistência 24h padrão cobre pane seca, pane elétrica, troca de pneu, chaveiro e reboque a partir de 0 km — inclusive dentro do estacionamento do Shopping Maia. Basta acionar o telefone de assistência da seguradora; o atendimento médio na região da Cidade Maia é de 40 a 90 minutos." },

      // ====== SEGURO DO CONDÔMINO (residencial) – moradores Cidade Maia ======
      { question: "O que é seguro do condômino e por que moradores da Cidade Maia precisam?", answer: "Seguro do condômino é a apólice residencial individual contratada pelo morador para cobrir o conteúdo do apartamento (móveis, eletrodomésticos, eletrônicos, roupas, joias) e benfeitorias internas (piso, armários planejados, gesso). Ele complementa o seguro obrigatório do condomínio, que cobre apenas estrutura e áreas comuns." },
      { question: "O seguro do condomínio da Cidade Maia já cobre meu apartamento?", answer: "Não. O seguro obrigatório do condomínio (Lei 4.591/64) cobre apenas a estrutura do prédio, áreas comuns, fachada, elevadores e RC do condomínio. Tudo que está dentro da sua unidade — incluindo benfeitorias e bens móveis — só é coberto se você contratar uma apólice residencial em seu nome." },
      { question: "Quanto custa o seguro do condômino para apartamento na Cidade Maia?", answer: "Para apartamentos de 70 a 120 m² na Cidade Maia, com cobertura básica de incêndio, roubo, danos elétricos, vidros e assistência 24h, os valores ficam entre R$ 70 e R$ 180/mês. Apólices com cobertura ampliada para joias, equipamentos eletrônicos e RC familiar podem chegar a R$ 250/mês." },
      { question: "Aluguei um apartamento na Cidade Maia. Sou eu ou o proprietário que faz o seguro do condômino?", answer: "Idealmente, ambos. O proprietário cobre a estrutura e benfeitorias permanentes; o inquilino cobre o conteúdo (móveis e eletrônicos próprios) e RC familiar. A maioria dos contratos de locação na Cidade Maia exige que o inquilino contrate uma apólice mínima — verifique o contrato." },

      // ====== DANOS A TERCEIROS / RC ======
      { question: "Bati em outro carro no estacionamento do Shopping Maia. Quem paga os danos a terceiros?", answer: "Se você tem cobertura de RCF-V (Responsabilidade Civil Facultativa de Veículos), a seguradora paga os danos materiais e corporais ao terceiro até o limite contratado (geralmente R$ 50 a R$ 200 mil). Sem RCF-V, a indenização sai do seu bolso. Recomendamos sempre limites a partir de R$ 100 mil para uso urbano em Guarulhos." },
      { question: "Meu filho derrubou um produto na loja do Shopping Maia. Tenho cobertura?", answer: "Sim, se sua apólice residencial tiver cobertura de RC Familiar. Ela paga danos involuntários causados a terceiros por você, cônjuge, filhos e até pets — incluindo quebra de mercadorias em lojas, queda de objetos da janela e acidentes em áreas comuns. Limite usual: R$ 20 a R$ 100 mil." },
      { question: "Sou lojista do Shopping Maia. E se um cliente cair dentro da minha loja?", answer: "A cobertura de RC do estabelecimento (incluída no seguro empresarial) paga indenizações por danos corporais e materiais causados a clientes dentro da loja — como quedas, prateleiras desabando ou produtos defeituosos. Limites a partir de R$ 100 mil. É exigida pela maioria das administradoras de shopping em contrato." },

      // ====== PROTEÇÃO DE EQUIPAMENTOS ======
      { question: "Como funciona a proteção de equipamentos para lojas do Shopping Maia?", answer: "A cobertura de Equipamentos Eletrônicos protege computadores, PDVs, máquinas de cartão, freezers, fornos, ar-condicionado e equipamentos específicos da operação contra queima por oscilação de tensão, curto-circuito, queda de raio, roubo qualificado e danos acidentais. Indenização paga em até 30 dias após laudo técnico." },
      { question: "Meu notebook foi roubado no Shopping Maia. O seguro residencial cobre fora de casa?", answer: "Depende. Apólices residenciais padrão cobrem bens apenas dentro do imóvel. Para cobrir notebook, celular, câmera e equipamentos fora de casa, é necessário contratar a cláusula de 'Equipamentos Portáteis' (geralmente +R$ 15 a R$ 40/mês) ou um seguro específico de eletrônicos." },
      { question: "Quanto custa proteger o estoque e equipamentos de uma loja de eletrônicos no Shopping Maia?", answer: "Para uma loja de eletrônicos com estoque de R$ 200 mil e equipamentos de R$ 80 mil, o seguro empresarial completo (incêndio, roubo, RC, danos elétricos, equipamentos eletrônicos, vidros) costuma ficar entre R$ 380 e R$ 750/mês — especialmente porque o sistema de monitoramento 24h do shopping reduz o risco para a seguradora." },

      // ====== ASSISTÊNCIA 24H ======
      { question: "Quais assistências 24h estão incluídas no seguro auto para uso no Shopping Maia?", answer: "O pacote padrão inclui: reboque (100 a 400 km), pane mecânica/elétrica, pane seca, troca de pneu, chaveiro, transporte alternativo (Uber/táxi), hospedagem em caso de pane longe de casa e carro reserva por 7 a 30 dias após sinistro com perda total. Atendimento médio na Cidade Maia: 40-90 minutos." },
      { question: "O seguro residencial tem assistência 24h para apartamento na Cidade Maia?", answer: "Sim. A assistência residencial 24h cobre encanador, eletricista, chaveiro emergencial, vidraceiro, desentupimento, conserto de fechadura e até cobertura provisória de telhado. Os serviços são solicitados por telefone e atendidos por rede credenciada na região da Cidade Maia, geralmente em até 2 horas." },
      { question: "A assistência 24h do seguro empresarial atende lojas do Shopping Maia em horário noturno?", answer: "Sim. A assistência empresarial 24h funciona inclusive fora do horário comercial e em finais de semana — essencial para lojas do shopping que operam até 22h e precisam de chaveiro, vidraceiro ou eletricista emergencial após o expediente. Acionamento direto pelo 0800 da seguradora." },
      { question: "Como aciono a assistência 24h estando no estacionamento do Shopping Maia?", answer: "1) Ligue para o telefone de assistência impresso no cartão da apólice (ou no app da seguradora); 2) Informe placa, localização exata (estacionamento Shopping Maia, Cidade Maia, Guarulhos) e o problema; 3) Aguarde no veículo — o tempo médio na região é de 40 a 90 minutos. Em caso de dúvida, o seu corretor Patro também pode acionar pelo WhatsApp (11) 5199-7500." },
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
