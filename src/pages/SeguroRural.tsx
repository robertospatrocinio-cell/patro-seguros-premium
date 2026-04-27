import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rural.webp";

const SeguroRural = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Rural"
      subtitle="Proteção completa para o agronegócio em todo o Brasil. Atendemos produtores de todos os estados."
      icon="🚜"
      badge="Atendimento em Todo o Brasil"
      showAgrishowBanner
      metaDescription="Seguro Rural para lavoura, pecuária e máquinas agrícolas em todo o Brasil. Subsídio do governo federal. Proteção contra seca, granizo e geada. Cotação grátis Patro Seguros."
      description="O Seguro Rural protege produtores contra perdas na lavoura, pecuária, máquinas agrícolas e benfeitorias. Fenômenos climáticos, pragas, doenças e acidentes podem comprometer toda a produção."
      detailedDescription={`O agronegócio brasileiro é um dos mais importantes do mundo, mas também um dos mais expostos a riscos climáticos e biológicos. Secas prolongadas, geadas devastadoras, granizo, excesso de chuvas, pragas e doenças podem destruir safras inteiras em questão de horas. Para o produtor rural, cada safra representa meses de trabalho e investimentos significativos em insumos, combustível e mão de obra.

O Seguro Rural existe justamente para proteger esse investimento. E o melhor: o governo federal, através do Programa de Subvenção ao Prêmio do Seguro Rural (PSR), subsidia parte do custo do seguro agrícola — em alguns casos, até 40% do valor do prêmio. Isso torna o seguro muito mais acessível para produtores de todos os portes.

A Patro Seguros atende produtores rurais de todos os estados do Brasil — de Mato Grosso ao Rio Grande do Sul, de Goiás à Bahia, de Minas Gerais ao Maranhão. Todo o processo é feito de forma remota, com a mesma qualidade e agilidade. Somos especialistas no setor agro e entendemos as particularidades de cada cultura e região.`}
      howItWorks={[
        { step: "1", title: "Análise da Propriedade", description: "Identificamos culturas, área plantada, região, histórico climático e riscos predominantes" },
        { step: "2", title: "Escolha das Coberturas", description: "Definimos coberturas por tipo de risco: seca, geada, granizo, excesso de chuva, pragas, etc." },
        { step: "3", title: "Aplicação do Subsídio", description: "Verificamos elegibilidade para subsídio do governo federal (PSR) e aplicamos na cotação" },
        { step: "4", title: "Acompanhamento da Safra", description: "Em caso de sinistro, acionamos a seguradora para vistoria técnica e indenização rápida" },
      ]}
      coverages={[
        { title: "Seguro Agrícola (PROAGRO Mais)", description: "Proteção para lavouras contra fenômenos climáticos adversos" },
        { title: "Seguro Pecuário", description: "Cobertura para morte de animais por doenças e acidentes" },
        { title: "Máquinas e Equipamentos Agrícolas", description: "Proteção para tratores, colheitadeiras e implementos" },
        { title: "Benfeitorias Rurais", description: "Cobertura para galpões, silos, estufas e instalações" },
        { title: "Produtos Agropecuários", description: "Proteção para grãos armazenados e produtos estocados" },
        { title: "Florestas Plantadas", description: "Cobertura para reflorestamento e silvicultura" },
        { title: "Aquicultura", description: "Seguro para criação de peixes e camarões" },
        { title: "Penhor Rural", description: "Garantia para financiamentos e custeios rurais" },
      ]}
      coverageExclusions={[
        "Perdas causadas por falta de manejo adequado ou abandono da lavoura",
        "Plantio fora da janela recomendada pelo Zoneamento Agrícola (ZARC)",
        "Doenças e pragas quando não aplicados os tratamentos recomendados",
        "Perdas em áreas não declaradas ou com informações incorretas",
        "Roubo e furto de produção (cobertura específica necessária)",
        "Variação de preço de commodities (não é seguro de preço)",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro Rural varia conforme cultura, região, nível de cobertura e disponibilidade de subsídio governamental.",
        factors: [
          "Tipo de cultura (soja, milho, café, trigo, algodão, etc.)",
          "Região e município (histórico climático e risco)",
          "Nível de cobertura (% da produtividade esperada)",
          "Área plantada em hectares",
          "Disponibilidade de subsídio do PSR (até 40% de desconto)",
          "Histórico de sinistros do produtor e da região",
        ],
        note: "Uma lavoura de soja de 500 hectares em Mato Grosso pode custar entre R$ 50.000 e R$ 120.000 antes do subsídio. Com subsídio de 40%, o custo cai para R$ 30.000 a R$ 72.000. Dividido pela produção esperada, representa centavos por saca — um investimento muito baixo frente ao risco.",
      }}
      realScenarios={[
        { title: "Geada devastou cafezal", description: "Um produtor de café no Paraná perdeu 70% da produção em uma geada severa. O Seguro Rural indenizou R$ 620.000, permitindo que o produtor mantivesse os tratos culturais e se preparasse para a próxima safra." },
        { title: "Seca prolongada no milho safrinha", description: "Produtor em Goiás enfrentou 45 dias sem chuva durante o período crítico do milho safrinha. A produtividade caiu de 100 para 30 sacas/hectare. O seguro cobriu a diferença, indenizando R$ 280.000 em 800 hectares." },
        { title: "Granizo destruiu lavoura de soja", description: "Uma tempestade de granizo atingiu lavoura de soja em Mato Grosso do Sul, causando perda de 85% da área. A indenização de R$ 450.000 garantiu que o produtor pagasse os custos de custeio e mantivesse a operação." },
      ]}
      importantDetails={[
        { title: "Zoneamento Agrícola de Risco Climático (ZARC)", content: "Para ter direito ao subsídio do governo e à cobertura do seguro, o plantio deve seguir as recomendações do ZARC — janela de plantio, cultivares indicadas e manejo recomendado para cada município." },
        { title: "Subsídio do governo (PSR)", content: "O Programa de Subvenção ao Prêmio do Seguro Rural subsidia de 20% a 40% do custo do seguro, dependendo da cultura e da região. O recurso é limitado e costuma esgotar no primeiro semestre — contrate cedo!" },
        { title: "Vistoria de sinistro", content: "Em caso de sinistro, a seguradora envia perito para vistoriar a lavoura. É fundamental não colher ou alterar a área afetada antes da vistoria. Documente com fotos e registros." },
      ]}
      tips={[
        "Contrate o seguro logo após o plantio — quanto antes, melhor a disponibilidade de subsídio do PSR",
        "Siga rigorosamente o Zoneamento Agrícola (ZARC) para garantir cobertura e subsídio",
        "Mantenha registros de todos os insumos aplicados, notas fiscais e relatórios de manejo",
        "Em caso de sinistro, não colha nem altere a área afetada antes da vistoria do perito",
        "Considere segurar também máquinas e benfeitorias — uma perda de trator na safra pode ser tão grave quanto a perda da lavoura",
        "Produtores de todos os estados podem contratar conosco — atendimento 100% remoto",
      ]}
      whoNeeds={[
        "Produtores rurais de grãos e culturas em qualquer estado",
        "Pecuaristas e criadores de animais em todo o Brasil",
        "Agricultores familiares de Norte a Sul",
        "Empresas do agronegócio em todas as regiões",
        "Silvicultores e produtores florestais",
        "Aquicultores e piscicultores",
      ]}
      whyPatro={[
        "Atendimento em todos os estados do Brasil — não apenas Guarulhos",
        "Conhecimento do setor rural e suas especificidades regionais",
        "Acesso a seguros com subsídio do governo federal",
        "Orientação sobre documentação e processos do MAPA",
        "Análise de riscos climatológicos por região",
        "Suporte completo em sinistros com vistoria técnica",
        "Parcerias com seguradoras especializadas no agro",
      ]}
      faqs={[
        { question: "A Patro Seguros atende produtores rurais fora de São Paulo?", answer: "Sim! Atendemos produtores rurais de todos os estados do Brasil. Nossa sede é em Guarulhos/SP, mas fazemos cotações e acompanhamos sinistros em qualquer região." },
        { question: "O que é o subsídio do governo no seguro rural?", answer: "O governo federal subsidia parte do prêmio do seguro agrícola (até 40% em alguns casos), tornando-o mais acessível aos produtores de todo o país." },
        { question: "Como funciona o seguro agrícola?", answer: "Protege contra perdas na produção por fenômenos como seca, geada, granizo, excesso de chuva, pragas e doenças. A indenização é baseada na produtividade esperada." },
        { question: "Posso segurar animais?", answer: "Sim! O seguro pecuário cobre morte de bovinos, equinos, suínos e outros animais por doenças, acidentes, raios e outros eventos cobertos." },
        { question: "Quanto custa o seguro rural?", answer: "Varia conforme a cultura, localização, histórico da região e nível de cobertura. Com subsídio governamental, fica significativamente mais acessível." },
        { question: "Como solicitar cotação se estou longe de Guarulhos?", answer: "Todo o processo é 100% remoto. Basta entrar em contato pelo WhatsApp (11) 5199-7500, telefone ou e-mail. Enviamos a documentação digitalmente e acompanhamos tudo à distância — da cotação à regulação de sinistro." },
        { question: "Quais cidades e estados a Patro atende?", answer: "Atendemos produtores rurais e empresas do agronegócio em todos os 26 estados brasileiros e o Distrito Federal — capitais, interior e zona rural. Do Sul (PR, SC, RS) ao Norte (PA, TO, RO), passando por Centro-Oeste (MT, MS, GO), Sudeste (SP, MG, ES, RJ) e Nordeste (BA, PI, MA). Nossa sede é em Guarulhos/SP, mas o atendimento é 100% remoto." },
        { question: "Qual o prazo para receber a proposta?", answer: "Após o envio das informações sobre o bem ou atividade a ser segurada, retornamos com propostas comparativas de diversas seguradoras em até 24 horas úteis." },
        { question: "Como recebo a proposta de seguro?", answer: "Enviamos a proposta pelo canal de sua preferência — WhatsApp, e-mail ou ambos — com um resumo comparativo de valores e coberturas das melhores seguradoras do mercado." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Máquinas", link: "/seguro-maquinas" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro de Transporte", link: "/seguro-transporte" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroRural;
