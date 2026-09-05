import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { getLongtailCluster, getSectionCtasForSlug } from "@/lib/longtailClusters";

const SLUG = "/valor-seguro-byd-dolphin";

const LongtailValorSeguroBydDolphin = () => (
  <InsurancePageTemplate
    sectionCtas={getSectionCtasForSlug(SLUG)}
    jumpLinks={[
      { label: "Valor médio", href: "#preco-heading" },
      { label: "Coberturas", href: "#coberturas-heading" },
      { label: "Cenários reais", href: "#cenarios-heading" },
      { label: "Perguntas frequentes", href: "#faq-heading" },
      { label: "Cotar agora", href: "#formulario-heading" },
    ]}
    title="Valor do Seguro BYD Dolphin 2026 — Preço, Cotação e Cobertura"
    subtitle="Quanto custa o seguro do BYD Dolphin? Faixa real de preço (R$ 2.500 a R$ 4.800/ano), o que afeta o valor e cotação nas seguradoras que aceitam elétricos: Porto Seguro, Allianz, HDI e Tokio Marine."
    description="Descubra o valor exato do seguro do BYD Dolphin com base em cotações reais feitas pela Patro Seguros em Guarulhos e região metropolitana de SP. Comparamos as seguradoras que cobrem carros elétricos com cláusula específica para bateria de tração, guincho com prancha e rede autorizada BYD."
    detailedDescription={`O BYD Dolphin é hoje um dos elétricos mais vendidos do Brasil, e o valor do seu seguro varia bastante entre seguradoras — de R$ 2.500 a R$ 4.800 por ano para o mesmo perfil de motorista. A razão é simples: nem toda seguradora tem tabela consolidada para elétricos e algumas cobram um adicional de risco de 15% a 30% por falta de dados de sinistralidade e por complexidade de reparo (bateria de tração, componentes de alta voltagem, oficinas certificadas).

Faixa de preço realista (2026, cobertura compreensiva 100% FIPE, CEP Guarulhos/SP, motorista 35 anos, sem sinistros, garagem em residência): BYD Dolphin GS (versão de entrada) fica entre R$ 2.500 e R$ 3.400/ano. BYD Dolphin Plus (versão mais equipada) fica entre R$ 2.900 e R$ 3.900/ano. BYD Dolphin Mini entre R$ 2.300 e R$ 3.100/ano. Versões com autonomia estendida e itens premium podem chegar a R$ 4.800/ano em perfis mais jovens ou CEPs de maior risco.

O que afeta mais o valor do seguro do BYD Dolphin: (1) cláusula específica para bateria de tração — item mais caro do veículo e nem toda apólice cobre integralmente; (2) rede autorizada BYD para reparo — obrigatória para não perder garantia da fábrica; (3) guincho com prancha (o Dolphin não pode ser rebocado convencionalmente); (4) parceria da seguradora com Wallbox e assistência residencial elétrica; (5) coparticipação em vidro dianteiro, que no Dolphin é sensor-integrado e caro.

A Patro Seguros trabalha com Porto Seguro, Allianz, HDI, Tokio Marine e Bradesco Auto — as seguradoras com melhor experiência em elétricos no Brasil — e compara todas simultaneamente para você contratar seguro BYD Dolphin com preço justo e cobertura correta.`}
    icon="⚡"
    metaDescription="Valor do seguro BYD Dolphin em 2026: R$ 2.500 a R$ 4.800/ano. Cotação Porto Seguro, Allianz e HDI para elétricos, com cobertura de bateria de tração. Patro Seguros."
    coverages={[
      { title: "Bateria de Tração (Blade Battery)", description: "Cobertura integral do componente mais caro do BYD Dolphin — item que muitas apólices excluem ou cobrem parcialmente." },
      { title: "Rede Autorizada BYD", description: "Reparo apenas em oficinas certificadas BYD para preservar a garantia de fábrica e a integridade dos componentes de alta voltagem." },
      { title: "Guincho com Prancha", description: "Obrigatório para carros elétricos — o BYD Dolphin não pode ser rebocado convencionalmente sem risco à transmissão." },
      { title: "Roubo e Furto 100% FIPE", description: "Indenização integral, considerando o valor Molicar/FIPE atualizado do modelo e versão." },
      { title: "Assistência para Wallbox", description: "Suporte técnico em caso de falha do carregador residencial — cobertura oferecida por Porto Seguro Elétricos e HDI Green." },
      { title: "APP + Terceiros", description: "Acidentes pessoais para ocupantes e responsabilidade civil contra terceiros, incluindo danos materiais e corporais." },
    ]}
    howItWorks={[
      { step: "1", title: "Envie os dados do veículo", description: "Placa, chassi ou nota fiscal, versão (GS/Plus/Mini), ano e CEP de pernoite. Aceitamos foto do CRV pelo WhatsApp." },
      { step: "2", title: "Cotamos em 4 seguradoras", description: "Porto Seguro, Allianz, HDI e Tokio Marine — as que têm produto específico para elétricos e cláusula de bateria." },
      { step: "3", title: "Comparativo em até 2h", description: "Tabela com preço, franquia, cobertura da bateria, rede BYD e assistência Wallbox." },
      { step: "4", title: "Escolha e ative", description: "Documentação simples, ativação em 24h e envio da apólice digital." },
      { step: "5", title: "Suporte em sinistro elétrico", description: "Orientação técnica em sinistros de bateria e componentes de alta voltagem — sinistro de elétrico exige cuidado extra." },
    ]}
    pricingInfo={{
      intro: "O valor do seguro BYD Dolphin em 2026 fica entre R$ 2.500 e R$ 4.800/ano para cobertura compreensiva completa. O Dolphin GS (entrada) tende a ser 15% mais barato que o Plus por ter itens de segurança e conforto em menor quantidade. Comparado a um Onix Turbo de valor similar, o Dolphin pode custar 10–20% mais caro por ser elétrico — a diferença cai a cada ano à medida que as seguradoras acumulam dados de sinistralidade.",
      factors: [
        "Versão do Dolphin — GS, Plus ou Mini (diferença de 15% a 25% no prêmio)",
        "CEP de pernoite — Cidade Maia e Vila Galvão têm taxa menor que Cumbica e Pimentas",
        "Idade e tempo de habilitação (motoristas <25 anos pagam até 40% mais)",
        "Uso — particular, motorista de app (Uber/99), ou frota empresarial",
        "Rastreador e Wallbox residencial reduzem o prêmio em 5–10%",
        "Franquia — dobrar a franquia costuma reduzir o prêmio em 12–18%",
      ],
      note: "Dica Patro: Se você contratou o BYD Dolphin com financiamento, o seguro exigido pela financeira normalmente já é compreensivo com 100% FIPE — vale confirmar a cobertura de bateria antes de aceitar a apólice do banco, quase sempre mais cara que a do mercado.",
    }}
    realScenarios={[
      { title: "Cliente em Guarulhos economiza R$ 900 no BYD Dolphin GS", description: "Motorista de 42 anos, garagem em Cidade Maia, cotou R$ 3.600/ano na apólice do banco financiador. A Patro encontrou apólice equivalente na HDI Green por R$ 2.700/ano — R$ 900 de economia mantendo cobertura de bateria e rede BYD." },
      { title: "Motorista Uber com BYD Dolphin Plus", description: "Motorista de app precisava de seguro para Dolphin Plus com cláusula de uso remunerado. A Patro estruturou apólice na Porto Seguro Elétricos por R$ 4.200/ano — 20% mais caro que o particular, mas com cobertura real durante corridas." },
      { title: "Frota de 3 Dolphins para empresa de tecnologia em Vila Galvão", description: "Empresa contratou seguro frota com 3 BYD Dolphin GS. Apólice unificada na Allianz por R$ 8.100/ano (média R$ 2.700 por veículo) — 15% mais barato que contratação individual." },
    ]}
    coverageExclusions={[
      "Uso do carregador não homologado (dano à bateria)",
      "Reparo em oficina não certificada BYD (perda de garantia + exclusão de cobertura)",
      "Danos por enchente em veículo estacionado em área não coberta pela apólice",
      "Sinistros durante uso comercial não declarado (Uber, delivery)",
      "Danos à bateria por reboque convencional sem prancha",
    ]}
    tips={[
      "Confirme sempre se a apólice cobre a bateria de tração — item mais caro do carro.",
      "Exija rede autorizada BYD para reparo — oficina não certificada anula a garantia de fábrica.",
      "Guincho com prancha é essencial — o Dolphin não pode ser rebocado convencionalmente.",
      "Instale rastreador e Wallbox homologada para reduzir o prêmio em 5–10%.",
      "Compare pelo menos 4 seguradoras — o preço do seguro elétrico varia até 40% entre elas.",
    ]}
    whoNeeds={[
      "Proprietários de BYD Dolphin GS, Plus ou Mini em Guarulhos e Grande SP",
      "Motoristas Uber/99 com BYD Dolphin (cláusula de uso remunerado)",
      "Empresas com frota de elétricos BYD para funcionários e diretoria",
      "Quem financiou o Dolphin e paga apólice cara imposta pelo banco",
      "Quem quer trocar a apólice atual por outra com melhor cobertura de bateria",
      "Proprietários de outros elétricos BYD (Yuan Plus, Song Plus, Seal) também atendidos",
    ]}
    whyPatro={[
      "Especialistas em seguros para elétricos desde 2023",
      "Cotamos em 4 seguradoras com produto específico para elétricos",
      "Análise gratuita da cláusula de bateria de tração de cada apólice",
      "Atendimento presencial no Cidade Maia + WhatsApp",
      "Suporte técnico em sinistros de alta voltagem (raro no mercado)",
      "Comparação anual com sugestão de troca quando o preço do elétrico cair",
    ]}
    faqs={[
      { question: "Quanto custa o seguro do BYD Dolphin em 2026?", answer: "O seguro do BYD Dolphin custa entre R$ 2.500 e R$ 4.800/ano para cobertura compreensiva completa, dependendo da versão (GS/Plus/Mini), CEP, idade do motorista e uso. Cotações reais em Guarulhos ficam próximas de R$ 2.800/ano para o GS em perfil médio." },
      { question: "O seguro do BYD Dolphin cobre a bateria de tração?", answer: "Só cobre integralmente em apólices específicas para elétricos (Porto Seguro Elétricos, HDI Green, Allianz Elétricos, Tokio Marine EV). Apólices convencionais excluem ou limitam a cobertura da bateria — item mais caro do veículo. A Patro valida essa cláusula antes de qualquer contratação." },
      { question: "Qual seguradora é melhor para BYD Dolphin?", answer: "Porto Seguro Elétricos, HDI Green, Allianz Elétricos e Tokio Marine EV têm produtos específicos para BYD Dolphin com cobertura de bateria e rede autorizada. O melhor varia por perfil — a Patro compara todas em uma única cotação." },
      { question: "Posso usar BYD Dolphin para Uber com seguro comum?", answer: "Não. Uso remunerado (Uber, 99, InDriver) exige cláusula específica de uso comercial. Sem essa cláusula, a seguradora nega o sinistro em corrida. A Patro contrata apólice para elétrico + uso remunerado no mesmo produto." },
      { question: "O seguro do Dolphin é mais caro que o de um Onix?", answer: "Em média 10–20% mais caro em 2026, por ser elétrico e ter menos dados de sinistralidade. A diferença tende a diminuir a cada ano. Modelos elétricos com garagem, rastreador e Wallbox têm preço competitivo em relação a hatches turbo do mesmo valor FIPE." },
      { question: "Qual o valor do seguro do BYD Dolphin GS zero km em Guarulhos?", answer: "Para BYD Dolphin GS 0 km em Guarulhos (motorista 35 anos, garagem em Cidade Maia, sem sinistros), o valor do seguro em 2026 fica entre R$ 2.500 e R$ 3.400/ano com cobertura compreensiva 100% FIPE, cláusula de bateria de tração e rede autorizada BYD. Motoristas <25 anos podem ver preços 30–40% maiores." },
      { question: "Como fazer cotação de seguro para BYD Dolphin online?", answer: "A Patro Seguros faz a cotação de seguro do BYD Dolphin em 4 seguradoras especializadas em elétricos (Porto Seguro Elétricos, Allianz Elétricos, HDI Green, Tokio Marine EV) em uma única passada. Envie placa/chassi e CEP pelo WhatsApp — o comparativo com preço, franquia e cláusula de bateria chega em até 2h." },
    ]}
    extraSections={(
      <section aria-labelledby="cotacao-seguro-byd-dolphin" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="cotacao-seguro-byd-dolphin" className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Cotação de Seguro BYD Dolphin: preço em 2h nas 4 seguradoras que cobrem elétrico
          </h2>
          <p className="text-foreground/80 mb-4">
            A cotação de seguro do BYD Dolphin exige seguradoras com produto específico para elétricos — Porto Seguro Elétricos, Allianz Elétricos, HDI Green e Tokio Marine EV são as únicas com cláusula robusta para bateria de tração (Blade Battery), rede autorizada BYD e guincho com prancha. A Patro cota nas 4 simultaneamente e envia o comparativo no WhatsApp em até 2h.
          </p>
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Valor do seguro por versão do BYD Dolphin (2026)</h3>
          <ul className="list-disc pl-5 space-y-2 text-foreground/80 mb-4">
            <li><strong>BYD Dolphin Mini:</strong> R$ 2.300 a R$ 3.100/ano — versão de entrada, seguro mais acessível da linha.</li>
            <li><strong>BYD Dolphin GS:</strong> R$ 2.500 a R$ 3.400/ano — melhor custo-benefício para o mercado brasileiro.</li>
            <li><strong>BYD Dolphin Plus:</strong> R$ 2.900 a R$ 3.900/ano — mais equipado, com autonomia estendida.</li>
          </ul>
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">BYD Dolphin para motorista de app (Uber/99)</h3>
          <p className="text-foreground/80">
            Para uso remunerado do BYD Dolphin (Uber, 99, InDriver) em Guarulhos, a apólice precisa ter cláusula expressa de uso por aplicativo — o valor sobe 15% a 25% em relação ao uso particular, ficando entre R$ 3.400 e R$ 4.800/ano. Sem essa cláusula, sinistros durante corrida são negados.
          </p>
        </div>
      </section>
    )}
    relatedInsurances={[
      { title: "Seguro Auto por Bairro em Guarulhos (Hub Local)", link: "/seguros-guarulhos" },
      { title: "Seguro Auto Elétrico e Híbrido", link: "/seguro-carro-eletrico-guarulhos" },
      { title: "Seguro Auto por Modelo Guarulhos", link: "/seguro-auto-por-modelo-guarulhos" },
      { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Seguro para Uber Guarulhos", link: "/seguro-uber-guarulhos" },
      { title: "Seguro para Motorista de App Guarulhos", link: "/seguro-para-motorista-app-guarulhos" },
      { title: "Seguro de Frota Empresas Guarulhos", link: "/seguro-frota-empresas-guarulhos" },
      { title: "Como Comparar Seguradoras em Guarulhos", link: "/como-comparar-seguradoras-guarulhos" },
    ]}
    trilhaSeo={getLongtailCluster("/valor-seguro-byd-dolphin")}
  />
);

export default LongtailValorSeguroBydDolphin;