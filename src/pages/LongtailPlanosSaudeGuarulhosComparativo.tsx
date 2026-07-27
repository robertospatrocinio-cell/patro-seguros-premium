import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { getLongtailCluster, getSectionCtasForSlug } from "@/lib/longtailClusters";

const SLUG = "/planos-de-saude-guarulhos-comparativo";

const LongtailPlanosSaudeGuarulhosComparativo = () => (
  <InsurancePageTemplate
    sectionCtas={getSectionCtasForSlug(SLUG)}
    jumpLinks={[
      { label: "Comparativo de operadoras", href: "#coberturas-heading" },
      { label: "Quanto custa", href: "#preco-heading" },
      { label: "Para quem é indicado", href: "#quem-precisa-heading" },
      { label: "Perguntas frequentes", href: "#faq-heading" },
      { label: "Cotar agora", href: "#formulario-heading" },
    ]}
    title="Planos de Saúde Guarulhos — Comparativo 2026 (Preços, Redes e Coberturas)"
    subtitle="Comparativo direto entre os principais planos de saúde em Guarulhos: Amil, Bradesco Saúde, SulAmérica, Hapvida NotreDame e Porto Saúde. Preço, rede credenciada em Guarulhos e cobertura, lado a lado."
    description="Comparativo completo dos planos de saúde disponíveis em Guarulhos, com preços atualizados, rede credenciada local, carências e diferenciais de cada operadora. A Patro Seguros é hub oficial de 20+ operadoras e faz a análise técnica gratuita para você escolher o melhor plano de saúde em Guarulhos sem perder benefício."
    detailedDescription={`Escolher planos de saúde em Guarulhos não é trivial: são mais de 20 operadoras ativas na cidade, com redes credenciadas diferentes por bairro, faixas etárias com reajustes distintos e coberturas que variam de plano ambulatorial simples até apartamento com obstetrícia e reembolso nacional. Este comparativo consolida as opções mais contratadas em Guarulhos (individual/familiar, PME e adesão) para que você decida com base em dados, não em promessa de vendedor.

A rede credenciada é o critério que mais pesa: um plano barato que não atende no seu bairro perde valor rapidamente. Em Guarulhos, os hospitais de referência são Stella Maris, Padre Bento, Bosque da Saúde, IGESP, Hospital Cruz Azul e Hospital São Lucas. Nem toda operadora credencia todos — por isso comparamos por bairro (Cidade Maia, Vila Galvão, Jardim Maia, Cocaia, Ponte Grande, Macedo, Vila Rio de Janeiro, Vila Augusta, Cumbica e Pimentas).

Preço médio (2026, titular 30 anos, enfermaria, com obstetrícia): Hapvida NotreDame parte de R$ 320/mês (rede própria em Guarulhos), Porto Saúde a partir de R$ 480/mês, Amil Fácil S250 a partir de R$ 520/mês, SulAmérica Direto a partir de R$ 560/mês, Bradesco Saúde Nacional Flex a partir de R$ 680/mês. Planos empresariais (PME 2 a 29 vidas) chegam a ficar 30–40% mais baratos que o individual equivalente.

Para escolher o melhor plano de saúde em Guarulhos para o seu perfil, veja também o comparativo por bairro no nosso hub local — cada região tem prestadores diferentes e o preço muda por CEP.`}
    icon="🏥"
    metaDescription="Planos de saúde Guarulhos: comparativo 2026 com Amil, Bradesco, SulAmérica, Hapvida e Porto Saúde. Preços, rede credenciada por bairro e coberturas. Cotação grátis pela Patro Seguros."
    coverages={[
      { title: "Ambulatorial", description: "Consultas, exames simples e complexos, terapias e pequenas cirurgias sem internação. Ideal para quem tem baixa sinistralidade." },
      { title: "Hospitalar com Obstetrícia", description: "Internação, cirurgias, UTI e parto, com escolha de enfermaria ou apartamento. Cobertura mais completa para famílias." },
      { title: "Rede Credenciada Guarulhos", description: "Hospitais Stella Maris, Padre Bento, IGESP, Cruz Azul e Bosque da Saúde, dependendo da operadora e do produto." },
      { title: "Reembolso Nacional", description: "Disponível em planos Bradesco, SulAmérica e Porto — importante para quem viaja ou quer atendimento fora da rede." },
      { title: "PME (2 a 29 vidas)", description: "Planos coletivos empresariais com preço até 40% menor que o individual e sem análise de risco por vida." },
      { title: "Odontológico", description: "Opcional em quase todas as operadoras. Bradesco Dental e Amil Dental são os mais contratados em Guarulhos." },
    ]}
    howItWorks={[
      { step: "1", title: "Levantamento de perfil", description: "Idade dos beneficiários, bairro em Guarulhos, hospitais preferidos, orçamento e se há gestante ou tratamento em curso." },
      { step: "2", title: "Comparativo técnico", description: "Montamos tabela lado a lado com preço, rede credenciada no seu bairro, carências e reajustes históricos." },
      { step: "3", title: "Análise da rede local", description: "Confirmamos se seus médicos e hospitais de referência em Guarulhos estão na rede do plano escolhido." },
      { step: "4", title: "Contratação sem burocracia", description: "Enviamos proposta, coletamos declaração de saúde e ativamos o plano — normalmente em 5 a 15 dias." },
      { step: "5", title: "Suporte contínuo", description: "Apoio em autorizações, negativas, mudança de plano e renovação. Você não fica na URA da operadora." },
    ]}
    pricingInfo={{
      intro: "Em Guarulhos, o preço médio de planos de saúde individuais varia de R$ 320 a R$ 900/mês para titular adulto jovem, enfermaria com obstetrícia. Planos PME (empresariais) são 30–40% mais baratos que o individual equivalente e não fazem entrevista qualificada por vida.",
      factors: [
        "Faixa etária — o maior componente do preço (reajuste por idade a cada 10 anos)",
        "Tipo de acomodação — enfermaria vs apartamento (diferença de 25% a 60%)",
        "Abrangência — municipal (Guarulhos), estadual (SP) ou nacional",
        "Coparticipação — planos com coparticipação ficam 20–35% mais baratos",
        "Operadora e rede credenciada — Hapvida (rede própria) tende a ser o mais barato; Bradesco/SulAmérica os mais completos",
        "Adesão a entidade de classe (para planos por adesão via Qualicorp, Allcare etc.)",
      ],
      note: "Dica Patro: Para famílias em Guarulhos com 3 ou mais vidas, o plano PME (via MEI/CNPJ) costuma custar até 40% menos que o individual — vale abrir uma empresa só para contratar. Fazemos essa análise gratuitamente.",
    }}
    realScenarios={[
      { title: "Família Cidade Maia migra da Amil para Porto Saúde", description: "Casal com 2 filhos pagava R$ 3.400/mês na Amil One. Migrou para Porto Saúde Bronze (mesma rede em Guarulhos) por R$ 2.180/mês — economia de R$ 14.640/ano sem perder o hospital de referência." },
      { title: "PME de 4 vidas em Vila Galvão", description: "Escritório de contabilidade com 4 funcionários contratou plano SulAmérica Direto PME por R$ 1.620/mês (média R$ 405/vida) — 35% menor que o individual equivalente." },
      { title: "Gestante em Pimentas encontra plano com obstetrícia", description: "Cliente com carência de obstetrícia em plano antigo migrou para Bradesco Saúde Nacional Flex com aproveitamento de carências — pariu 8 meses depois no Hospital Stella Maris sem custo adicional." },
    ]}
    coverageExclusions={[
      "Tratamentos estéticos sem indicação médica",
      "Procedimentos experimentais e não previstos no Rol da ANS",
      "Fertilização in vitro (exceto planos que oferecem como diferencial)",
      "Tratamentos no exterior (salvo cláusula específica)",
      "Órteses e próteses não ligadas ao ato cirúrgico coberto",
    ]}
    tips={[
      "Nunca compare apenas mensalidade: cheque rede credenciada no seu bairro de Guarulhos.",
      "Se tem CNPJ, avalie plano PME — quase sempre mais barato que individual.",
      "Reajuste por faixa etária é o vilão: simule o custo aos 44, 54 e 59 anos antes de contratar.",
      "Coparticipação reduz mensalidade — vale a pena se você usa pouco o plano.",
      "Peça sempre a tabela de reajustes históricos da operadora nos últimos 5 anos.",
    ]}
    whoNeeds={[
      "Famílias em Guarulhos buscando plano com rede local (Cidade Maia, Vila Galvão, Cocaia, Macedo)",
      "Empresas de 2 a 99 vidas em Guarulhos que querem plano coletivo",
      "MEIs e autônomos que querem contratar plano PME (mais barato que individual)",
      "Gestantes que precisam de plano com obstetrícia e aproveitamento de carência",
      "Idosos com plano antigo caro buscando alternativa com boa rede em Guarulhos",
      "Profissionais liberais que podem aderir via entidade de classe (adesão)",
    ]}
    whyPatro={[
      "Hub oficial de 20+ operadoras de saúde: Amil, Bradesco, SulAmérica, Hapvida, Porto, Unimed, Notre Dame, One Health, Allcare, Qualicorp",
      "Comparativo técnico gratuito com rede credenciada por bairro em Guarulhos",
      "Atendimento presencial no Cidade Maia + WhatsApp",
      "Suporte em autorizações e negativas — você não briga sozinho com a operadora",
      "Análise anual de reajuste com sugestão de troca quando compensar",
      "Especialistas em migração com aproveitamento de carências",
    ]}
    faqs={[
      { question: "Qual o melhor plano de saúde em Guarulhos em 2026?", answer: "Não existe 'o melhor' universal — depende de bairro, orçamento e uso. Para custo-benefício com rede própria em Guarulhos, Hapvida NotreDame lidera. Para rede ampla e reembolso, Bradesco Saúde e SulAmérica são referência. Para PME, Porto Saúde e Amil têm as melhores condições. A Patro monta o comparativo com o seu perfil." },
      { question: "Quanto custa um plano de saúde em Guarulhos?", answer: "Planos individuais em Guarulhos custam de R$ 320 a R$ 900/mês para titular adulto jovem, enfermaria com obstetrícia. Planos PME (empresariais) partem de R$ 250/vida. Preço final depende de idade, acomodação, abrangência e operadora." },
      { question: "Quais hospitais atendem em Guarulhos?", answer: "Os principais hospitais credenciados em Guarulhos são Stella Maris, Padre Bento, IGESP, Cruz Azul, Bosque da Saúde e Hospital São Lucas. Cada operadora credencia um conjunto diferente — validamos gratuitamente no comparativo." },
      { question: "Plano PME é realmente mais barato que individual?", answer: "Sim, na maioria dos casos até 30–40% mais barato. Para famílias com CNPJ (mesmo MEI), migrar do individual para PME gera economia relevante. Fazemos essa análise sem custo." },
      { question: "Como funciona a portabilidade de carência entre planos em Guarulhos?", answer: "A ANS permite portabilidade sem cumprir carência se você tem plano regular há pelo menos 2 anos (ou 3 anos com doença preexistente) e migra para plano de mesma faixa de preço. A Patro faz esse enquadramento tecnicamente para não perder carências." },
      { question: "Qual o melhor plano de saúde empresarial em Guarulhos para PME?", answer: "Para PME (2 a 29 vidas) em Guarulhos, Porto Saúde PME e SulAmérica Direto PME lideram em custo-benefício (R$ 380 a R$ 520/vida), enquanto Bradesco Saúde Nacional Flex Empresarial e Amil Empresarial oferecem a rede credenciada mais ampla. A Patro monta o comparativo empresarial gratuito com base no perfil das vidas." },
      { question: "Onde fazer cotação de planos de saúde em Guarulhos?", answer: "A Patro Seguros, hub oficial de 20+ operadoras, faz cotação simultânea de planos de saúde em Guarulhos (individual, familiar, PME e adesão) e envia comparativo por WhatsApp em até 2h — com preço, rede credenciada no seu bairro, carência e reajustes históricos lado a lado." },
    ]}
    extraSections={(
      <section aria-labelledby="planos-saude-empresarial-guarulhos" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="planos-saude-empresarial-guarulhos" className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Planos de Saúde Empresarial em Guarulhos (PME 2 a 99 vidas)
          </h2>
          <p className="text-foreground/80 mb-4">
            O plano de saúde empresarial em Guarulhos custa em média 30% a 40% menos que o individual equivalente e não exige entrevista qualificada por vida a partir de 3 beneficiários. Para MEIs, autônomos com CNPJ e escritórios pequenos em Guarulhos (Cidade Maia, Vila Galvão, Bosque Maia, Macedo), o PME é quase sempre a via mais econômica de contratar planos de saúde.
          </p>
          <p className="text-foreground/80 mb-4">
            Operadoras que aceitam PME a partir de 2 vidas em Guarulhos: Porto Saúde, SulAmérica, Bradesco Saúde, Amil, Hapvida NotreDame, Unimed e One Health. A rede credenciada local (Stella Maris, IGESP, Padre Bento, Cruz Azul) é a mesma do individual — muda apenas o modelo de contrato e o preço.
          </p>
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Como comparar planos de saúde em Guarulhos</h3>
          <p className="text-foreground/80">
            Comparar planos de saúde em Guarulhos vai além do preço da mensalidade: analise rede credenciada no seu bairro, reajuste histórico dos últimos 5 anos, carência para partos e cirurgias eletivas, coparticipação e sublimites. A Patro Seguros consolida esses 5 critérios em uma tabela única — pronta para você decidir.
          </p>
        </div>
      </section>
    )}
    relatedInsurances={[
      { title: "Planos de Saúde por Bairro em Guarulhos (Hub Local)", link: "/seguros-guarulhos" },
      { title: "Plano de Saúde Guarulhos", link: "/plano-saude-guarulhos" },
      { title: "Plano de Saúde Empresarial Guarulhos", link: "/plano-saude-empresarial-guarulhos" },
      { title: "Comparativo Planos de Saúde Guarulhos", link: "/comparativo-planos-saude-guarulhos" },
      { title: "Plano de Saúde Sênior Guarulhos", link: "/planos-saude-senior-guarulhos" },
      { title: "Plano Odontológico Guarulhos", link: "/plano-odontologico-guarulhos" },
      { title: "Seguro Vida e Saúde Guarulhos", link: "/seguro-vida-saude-guarulhos" },
      { title: "Como Comparar Seguradoras em Guarulhos", link: "/como-comparar-seguradoras-guarulhos" },
    ]}
    trilhaSeo={getLongtailCluster("/planos-de-saude-guarulhos-comparativo")}
  />
);

export default LongtailPlanosSaudeGuarulhosComparativo;