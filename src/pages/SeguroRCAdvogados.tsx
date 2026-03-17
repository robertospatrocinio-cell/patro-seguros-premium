import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroRCAdvogados = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro RC Advogados"
      subtitle="Proteção contra processos por erro profissional na advocacia"
      icon="⚖️"
      metaDescription="Seguro RC para Advogados — proteção contra processos por perda de prazo, erro processual e negligência. A Patro Seguros é especialista em RC. Cotação grátis."
      description="O Seguro RC para Advogados protege o profissional e o escritório contra reclamações por erros, omissões e negligência na prestação de serviços jurídicos. A Patro Seguros é especialista neste tipo de seguro e trabalha com seguradoras que entendem os riscos da advocacia."
      detailedDescription={`Perda de prazo, erro processual, orientação jurídica equivocada, falha na produção de provas — a advocacia está repleta de situações que podem gerar responsabilização civil. Um único erro pode resultar em condenação que compromete o patrimônio pessoal do advogado.

O mercado jurídico brasileiro tem mais de 1,3 milhão de advogados ativos, e o número de processos disciplinares na OAB e ações judiciais contra advogados cresce a cada ano. Clientes prejudicados por falhas na prestação de serviços jurídicos têm buscado reparação com cada vez mais frequência.

A Patro Seguros é especialista em RC Profissional e oferece apólices desenhadas para a realidade da advocacia — de advogados autônomos a grandes escritórios. Cotamos com seguradoras especializadas para garantir a melhor proteção ao menor custo.`}
      howItWorks={[
        { step: "1", title: "Análise do Perfil", description: "Avaliamos a área de atuação (cível, trabalhista, tributário, criminal), porte do escritório e volume de processos para dimensionar a cobertura." },
        { step: "2", title: "Cotação com Especialistas", description: "A Patro Seguros cota com seguradoras que conhecem os riscos da advocacia e oferecem coberturas específicas." },
        { step: "3", title: "Emissão Personalizada", description: "Apólice com coberturas e limites adequados à sua área de atuação e volume de clientes." },
        { step: "4", title: "Suporte em Sinistros", description: "Em caso de reclamação, intermediamos todo o processo com a seguradora — defesa jurídica e indenização." },
      ]}
      coverages={[
        { title: "Perda de Prazo Processual", description: "Cobertura para o erro mais temido na advocacia: a perda de prazo que causa prejuízo ao cliente, incluindo prescrição e decadência." },
        { title: "Erro na Estratégia Jurídica", description: "Proteção contra alegações de orientação jurídica equivocada ou estratégia processual inadequada que resulte em perda do cliente." },
        { title: "Falha na Produção de Provas", description: "Cobertura para omissão na juntada de documentos, perda de provas ou falha na indicação de testemunhas." },
        { title: "Erros em Contratos e Pareceres", description: "Proteção contra falhas na elaboração de contratos, pareceres e documentos jurídicos que causem prejuízo ao cliente." },
        { title: "Custos de Defesa", description: "Honorários de advogados de defesa, custas processuais e perícias — cobertos mesmo em caso de absolvição." },
        { title: "Processos Éticos na OAB", description: "Custos de defesa em processos disciplinares na Ordem dos Advogados do Brasil." },
        { title: "Responsabilidade de Sócios e Associados", description: "Cobertura extensível a todos os advogados do escritório, sócios e associados." },
        { title: "Cobertura Retroativa", description: "Protege contra reclamações por atos praticados antes da contratação do seguro." },
      ]}
      pricingInfo={{
        intro: "O custo do RC para advogados é muito acessível comparado ao risco. A Patro Seguros, como especialista, encontra as melhores condições.",
        factors: [
          "Área de atuação — contencioso, consultivo, tributário, criminal",
          "Porte do escritório — autônomo, pequeno, médio ou grande",
          "Faturamento do escritório",
          "Limite de cobertura contratado",
          "Número de advogados cobertos",
          "Histórico de reclamações",
        ],
        note: "Advogados autônomos: R$ 1.000 a R$ 3.000/ano. Escritórios pequenos e médios: R$ 3.000 a R$ 15.000/ano. Um investimento mínimo para proteger sua carreira e patrimônio.",
      }}
      realScenarios={[
        { title: "Perda de prazo em recurso trabalhista", description: "Advogado perdeu prazo de recurso ordinário em ação trabalhista de R$ 180.000. O cliente processou por negligência. O RC cobriu a defesa e a indenização integral, protegendo o patrimônio do advogado." },
        { title: "Erro em cláusula contratual", description: "Escritório elaborou contrato com cláusula ambígua que gerou prejuízo de R$ 350.000 ao cliente. O seguro cobriu os custos de defesa e o acordo judicial." },
        { title: "Prescrição de ação por inércia", description: "Cliente descobriu que seu advogado deixou a ação prescrever por inércia. Processo de R$ 120.000. O RC cobriu integralmente a defesa e a condenação." },
      ]}
      tips={[
        "Use sistema de controle de prazos com alertas automáticos",
        "Mantenha comunicação documentada com clientes (e-mails e protocolos)",
        "Formalize a contratação com contrato de honorários detalhado",
        "Faça seguro para todos os advogados do escritório, inclusive associados",
        "Comunique à seguradora qualquer reclamação do cliente, mesmo informal",
      ]}
      whoNeeds={[
        "Advogados autônomos de todas as áreas",
        "Escritórios de advocacia — pequenos, médios e grandes",
        "Advogados contenciosos — cível, trabalhista, tributário, criminal",
        "Advogados consultivos — contratos, pareceres, compliance",
        "Advogados societários e de fusões e aquisições",
        "Departamentos jurídicos de empresas",
      ]}
      whyPatro={[
        "Especialista em RC Profissional — a Patro Seguros conhece os riscos da advocacia",
        "Cotação com seguradoras especializadas em RC para advogados e escritórios",
        "Apólices que cobrem todos os advogados do escritório em uma única apólice",
        "Orientação sobre limites adequados por área de atuação",
        "Acompanhamento integral em caso de sinistro",
        "Referência em seguros para profissionais liberais",
      ]}
      faqs={[
        { question: "O que o RC para advogados cobre?", answer: "Cobre indenizações e custos de defesa por erros profissionais: perda de prazo, erro processual, orientação equivocada, falha em contratos e pareceres. A Patro Seguros é especialista neste tipo de seguro." },
        { question: "Perda de prazo é coberta pelo seguro?", answer: "Sim, é uma das coberturas mais importantes e mais acionadas. A perda de prazo que cause prejuízo ao cliente gera responsabilidade civil do advogado, e o seguro cobre tanto a defesa quanto a eventual indenização." },
        { question: "O seguro cobre processo na OAB?", answer: "Sim, muitas apólices cobrem custos de defesa em processos disciplinares na OAB. A Patro Seguros orienta sobre as melhores opções com esta cobertura." },
        { question: "Quanto custa o RC para advogados?", answer: "Advogados autônomos: R$ 1.000 a R$ 3.000/ano. Escritórios: R$ 3.000 a R$ 15.000/ano. A Patro Seguros, como especialista, negocia as melhores condições." },
      ]}
      relatedInsurances={[
        { title: "RC Profissional (E&O)", link: "/seguro-rc-profissional" },
        { title: "RC Médicos", link: "/seguro-rc-medicos" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Cyber", link: "/seguro-cyber" },
      ]}
    />
  );
};

export default SeguroRCAdvogados;
