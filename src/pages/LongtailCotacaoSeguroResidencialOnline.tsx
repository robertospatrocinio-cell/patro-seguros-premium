import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const LongtailCotacaoSeguroResidencialOnline = () => (
  <InsurancePageTemplate
    title="Cotação de Seguro Residencial Online — Preço em 2 Minutos"
    subtitle="Faça sua cotação de seguro residencial online e receba propostas de Porto Seguro, Bradesco, Allianz, SulAmérica e HDI em até 2 horas. Cobertura completa a partir de R$ 25/mês para casas e apartamentos em Guarulhos e Grande SP."
    description="Cotação de seguro residencial online 100% gratuita e sem compromisso. A Patro Seguros compara 8 seguradoras em uma única cotação e envia o comparativo por WhatsApp em até 2h — com preço, coberturas, franquia e assistência 24h de cada uma."
    detailedDescription={`Fazer cotação de seguro residencial online deveria ser simples, mas na prática cada seguradora tem seu próprio simulador com perguntas diferentes, resultados que variam bastante e coberturas nem sempre comparáveis. A Patro Seguros resolve isso: você preenche um único formulário rápido (endereço, tipo do imóvel, valor a segurar e coberturas desejadas) e nós cotamos em Porto Seguro, Bradesco Auto RE, Allianz Casa, SulAmérica Residencial, HDI Residencial, Tokio Marine, Mapfre e Liberty em uma única passada.

O preço médio de seguro residencial online em 2026 para um apartamento de R$ 400 mil em Guarulhos, com R$ 40 mil em bens (móveis, eletrônicos), cobertura básica (incêndio, raio, explosão) mais roubo e danos elétricos, fica entre R$ 320 e R$ 580/ano — o equivalente a R$ 27 a R$ 48/mês. Para casa térrea de R$ 600 mil com R$ 80 mil em bens e coberturas ampliadas (impacto de veículos, vendaval, danos por água), o preço vai de R$ 480 a R$ 890/ano.

A cotação de seguro residencial online tem 3 armadilhas comuns: (1) simuladores que devolvem apenas o preço mais barato sem mostrar a franquia — muitas vezes a franquia de R$ 3.500 anula a economia; (2) coberturas 'básicas' que não incluem roubo (o sinistro mais comum em residências); (3) valor de bens subdeclarado — em sinistro, indenização proporcional reduz o pagamento.

A Patro Seguros mostra o comparativo completo com franquia, sublimites por cobertura, assistência 24h (chaveiro, encanador, eletricista) e diferenciais de cada produto — não apenas o preço. Você escolhe o que faz sentido para o seu imóvel em Guarulhos ou Grande SP e contrata em 24h.`}
    icon="🏠"
    metaDescription="Cotação de seguro residencial online grátis: compare Porto, Bradesco, Allianz e HDI em 2 horas. Preço a partir de R$ 25/mês para casas e apartamentos. Patro Seguros."
    coverages={[
      { title: "Básica (Incêndio, Raio, Explosão)", description: "Cobertura obrigatória em toda apólice residencial. Indeniza danos à estrutura e conteúdo por fogo, raio direto ou explosão de gás/vazamento." },
      { title: "Roubo e Furto Qualificado", description: "Indenização de móveis, eletrônicos e joias em caso de roubo com arrombamento. Sublimite variável — atenção ao teto." },
      { title: "Danos Elétricos", description: "Cobre eletrodomésticos, TV, geladeira e computadores queimados por raio ou variação elétrica — muito comum em Guarulhos por conta das chuvas de verão." },
      { title: "Vazamento e Danos por Água", description: "Indeniza danos causados por vazamento em canos, caixa d'água ou máquina de lavar — cobertura essencial em apartamentos." },
      { title: "Vidros e Espelhos", description: "Reparo/substituição de vidros externos, box de banheiro e espelhos por qualquer causa acidental." },
      { title: "Assistência 24h Residencial", description: "Chaveiro, encanador, eletricista, vidraceiro e desentupimento sem custo adicional — o benefício mais usado pelos clientes Patro." },
    ]}
    howItWorks={[
      { step: "1", title: "Preencha o formulário online", description: "CEP, tipo do imóvel (casa/apartamento), valor de reconstrução e valor dos bens. Leva 2 minutos." },
      { step: "2", title: "Cotamos em 8 seguradoras", description: "Porto Seguro, Bradesco, Allianz, SulAmérica, HDI, Tokio, Mapfre e Liberty em uma única passada." },
      { step: "3", title: "Comparativo por WhatsApp em 2h", description: "Você recebe tabela com preço, franquia, coberturas e assistência de cada uma — não só o mais barato." },
      { step: "4", title: "Escolha e contrate online", description: "Documentação simples, apólice digital, ativação imediata. Sem visita técnica na maioria dos casos." },
      { step: "5", title: "Suporte em sinistro", description: "Se acontecer algo, orientamos como abrir sinistro, agilizamos vistoria e acompanhamos até a indenização." },
    ]}
    pricingInfo={{
      intro: "A cotação de seguro residencial online em 2026 mostra preços a partir de R$ 25/mês para apartamento pequeno em Guarulhos com cobertura básica + roubo, chegando a R$ 75/mês para casa grande com coberturas ampliadas. Para o mesmo imóvel, a diferença entre a seguradora mais barata e a mais cara pode passar de 80% — daí a importância do comparativo real.",
      factors: [
        "Tipo do imóvel (apartamento tende a ser mais barato que casa térrea)",
        "Valor de reconstrução do imóvel (base para cobertura de estrutura)",
        "Valor dos bens declarados (móveis, eletrônicos, joias)",
        "Coberturas contratadas (básica, roubo, elétricos, vazamento, vidros)",
        "CEP — bairros com mais registros de roubo pagam mais",
        "Sistemas de segurança (alarme, portaria 24h, câmeras) reduzem o prêmio",
      ],
      note: "Dica Patro: Não subestime o valor dos bens no formulário online. Em caso de sinistro, se você declarou R$ 30 mil em bens mas tinha R$ 60 mil, a indenização é proporcional — você recebe apenas metade do prejuízo. Faça o levantamento real antes de cotar.",
    }}
    realScenarios={[
      { title: "Apartamento em Cidade Maia por R$ 28/mês", description: "Cliente com apartamento de R$ 380 mil, R$ 35 mil em bens, contratou Porto Essencial via cotação online da Patro por R$ 336/ano (R$ 28/mês) — R$ 180 mais barato que a cotação direta no site da Porto." },
      { title: "Casa em Vila Galvão renovou 45% mais barato", description: "Renovação de apólice de casa em Vila Galvão. Cliente pagava R$ 1.240/ano na Bradesco. A Patro cotou Allianz Casa por R$ 680/ano — mesma cobertura, R$ 560 de economia sem trocar de assistência técnica." },
      { title: "Sinistro de raio pago em 12 dias", description: "Casa em Bosque Maia teve TV, geladeira, computador e roteador queimados por raio. A cobertura de danos elétricos da SulAmérica Residencial pagou R$ 8.400 em 12 dias — cliente contratou a apólice via cotação online da Patro." },
    ]}
    coverageExclusions={[
      "Sinistros por falta de manutenção (infiltrações antigas, fiação exposta)",
      "Danos por guerra, motim ou terrorismo",
      "Sinistros em imóvel desocupado por mais de 60 dias (salvo cláusula específica)",
      "Joias, obras de arte e coleções acima do sublimite (exige cláusula específica)",
      "Danos por eventos naturais catastróficos não contratados (terremoto)",
    ]}
    tips={[
      "Sempre compare pelo menos 4 seguradoras — o preço varia até 80% para o mesmo imóvel.",
      "Cheque a franquia antes de fechar — franquia alta pode anular a economia na mensalidade.",
      "Declare o valor real dos bens — indenização proporcional pode reduzir o pagamento pela metade.",
      "Contrate assistência 24h — é o benefício mais usado no dia a dia (chaveiro e encanador).",
      "Renove sempre com cotação — o mercado muda a cada 12 meses e a renovação automática costuma ser mais cara.",
    ]}
    whoNeeds={[
      "Proprietários de casa ou apartamento em Guarulhos e Grande SP",
      "Inquilinos que querem proteger os bens dentro do imóvel alugado",
      "Quem financiou o imóvel (Caixa/BB exige seguro residencial)",
      "Quem tem apólice hoje e quer cotar para pagar menos na renovação",
      "Casas de veraneio e imóveis com uso esporádico (com cláusula específica)",
      "Condomínios que querem oferecer cotação coletiva aos moradores",
    ]}
    whyPatro={[
      "Cotação online em 8 seguradoras em uma única passada",
      "Resposta em até 2h no WhatsApp — sem visita técnica na maioria dos casos",
      "Comparativo completo com franquia, sublimites e assistência — não só o preço",
      "Análise gratuita do valor de bens para evitar indenização proporcional",
      "Atendimento presencial no Cidade Maia + WhatsApp para toda Grande SP",
      "Suporte em sinistro do início ao fim — vistoria, negociação, indenização",
    ]}
    faqs={[
      { question: "Como funciona a cotação de seguro residencial online?", answer: "Você preenche um formulário rápido (CEP, tipo do imóvel, valor a segurar, coberturas desejadas) e a Patro cota em 8 seguradoras simultaneamente — Porto, Bradesco, Allianz, SulAmérica, HDI, Tokio, Mapfre e Liberty. O comparativo chega no seu WhatsApp em até 2h." },
      { question: "Quanto custa um seguro residencial em Guarulhos?", answer: "A cotação online mostra preços a partir de R$ 25/mês para apartamento pequeno com cobertura básica + roubo, chegando a R$ 75/mês para casa grande com coberturas ampliadas. O preço médio para apartamento de R$ 400 mil fica em R$ 35/mês." },
      { question: "Preciso de visita técnica para contratar seguro residencial online?", answer: "Na maioria dos casos, não. Para apartamentos e casas de até R$ 1 milhão, a contratação é 100% online sem vistoria prévia. Imóveis acima disso ou com bens de alto valor (joias, obras de arte) podem exigir vistoria." },
      { question: "A cotação online da Patro é gratuita?", answer: "Sim, 100% gratuita e sem compromisso. Você recebe o comparativo completo e decide se quer ou não contratar — sem custo em nenhum caso." },
      { question: "Qual a diferença entre cotar direto no site da seguradora e cotar pela Patro?", answer: "No site da seguradora você vê o preço de uma única empresa. Pela Patro você vê 8 seguradoras lado a lado, com franquia, sublimites e assistência — e ainda tem suporte técnico em sinistro. Em 90% dos casos, o preço da mesma cobertura é melhor via corretora." },
      { question: "A cotação online de seguro residencial serve para casas em toda Guarulhos?", answer: "Sim. A cotação online cobre todos os bairros de Guarulhos (Cidade Maia, Vila Galvão, Bosque Maia, Cocaia, Cumbica, Pimentas, Macedo, Vila Augusta, Jardim Maia, Ponte Grande) e Grande SP. O CEP entra no cálculo — bairros com menor índice de roubo recebem prêmio mais barato." },
      { question: "Posso fazer cotação de seguro residencial online e contratar sem visita técnica?", answer: "Sim. Para apartamentos e casas de até R$ 1 milhão a contratação é 100% online — cotação, comparativo, assinatura digital e emissão de apólice em 24h, sem vistoria prévia. Imóveis maiores ou com bens de alto valor (joias, obras de arte) podem exigir vistoria simples por foto." },
    ]}
    extraSections={(
      <section aria-labelledby="cotacao-seguro-residencial-guarulhos" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="cotacao-seguro-residencial-guarulhos" className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Cotação de seguro residencial online em Guarulhos: passo a passo
          </h2>
          <p className="text-foreground/80 mb-4">
            A cotação de seguro residencial online da Patro Seguros foi desenhada para responder em 2h com preço real (não simulado) de 8 seguradoras. Diferente dos simuladores individuais das seguradoras, você recebe um comparativo consolidado — não só o valor da mensalidade, mas franquia, sublimites por cobertura, valor de bens coberto e assistência 24h.
          </p>
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Preço médio da cotação online por tipo de imóvel (2026)</h3>
          <ul className="list-disc pl-5 space-y-2 text-foreground/80 mb-4">
            <li><strong>Apartamento até R$ 300 mil (Guarulhos):</strong> R$ 25 a R$ 38/mês com cobertura básica + roubo + danos elétricos.</li>
            <li><strong>Apartamento R$ 400–600 mil:</strong> R$ 32 a R$ 55/mês com cobertura ampliada.</li>
            <li><strong>Casa térrea R$ 500–800 mil:</strong> R$ 45 a R$ 75/mês com todas as coberturas + vendaval.</li>
            <li><strong>Imóvel &gt; R$ 1 mi:</strong> a partir de R$ 90/mês, geralmente com vistoria por foto.</li>
          </ul>
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Comparativo de seguradoras na cotação residencial online</h3>
          <p className="text-foreground/80">
            As 8 seguradoras cotadas simultaneamente pela Patro são Porto Seguro, Bradesco Auto RE, Allianz Casa, SulAmérica Residencial, HDI Residencial, Tokio Marine, Mapfre e Liberty. Cada uma tem forças diferentes: Porto lidera em assistência 24h, Allianz em preço para casa térrea, SulAmérica em danos elétricos, Bradesco em cobertura de joias. A cotação online mostra qual se encaixa melhor no seu perfil.
          </p>
        </div>
      </section>
    )}
    relatedInsurances={[
      { title: "Seguro Residencial por Bairro em Guarulhos (Hub Local)", link: "/seguros-guarulhos" },
      { title: "Seguro Residencial Guarulhos", link: "/seguro-residencial-guarulhos" },
      { title: "Seguro Residencial", link: "/seguro-residencial" },
      { title: "Landing Seguro Residencial", link: "/landing-seguro-residencial" },
      { title: "Seguro Condomínio Guarulhos", link: "/seguro-condominio-guarulhos" },
      { title: "Seguro Fiança Locatícia", link: "/seguro-fianca-locaticia" },
      { title: "Como Comparar Seguradoras em Guarulhos", link: "/como-comparar-seguradoras-guarulhos" },
      { title: "Seguradoras Parceiras", link: "/seguradoras-parceiras" },
    ]}
  />
);

export default LongtailCotacaoSeguroResidencialOnline;