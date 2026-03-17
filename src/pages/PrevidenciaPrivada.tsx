import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-previdencia.webp";

const PrevidenciaPrivada = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Previdência Privada"
      subtitle="Construa seu futuro com tranquilidade e segurança financeira"
      icon="💰"
      metaDescription="Previdência Privada VGBL e PGBL. Planeje sua aposentadoria com benefícios fiscais e rentabilidade. Compare planos. Cotação grátis Patro Seguros."
      description="A Previdência Privada é um investimento de longo prazo focado em garantir renda na aposentadoria ou realizar objetivos futuros."
      detailedDescription={`A aposentadoria pelo INSS está cada vez mais distante e com valores menores. A reforma da previdência aumentou a idade mínima e reduziu o valor dos benefícios. Para quem quer manter o padrão de vida na aposentadoria, depender exclusivamente do INSS não é opção.

A Previdência Privada é a ferramenta financeira mais utilizada no Brasil para complementar a renda na aposentadoria. São dois tipos principais: PGBL (para quem faz declaração completa do IR e quer deduzir até 12% da renda bruta) e VGBL (para quem faz declaração simplificada ou é isento).

Além da aposentadoria, a previdência privada serve como excelente instrumento de planejamento sucessório: em caso de falecimento, o valor acumulado vai direto para os beneficiários, sem inventário e sem ITCMD em muitos estados. É uma ferramenta versátil para objetivos de médio e longo prazo.

Na Patro Seguros, fazemos simulações realistas com diferentes cenários de contribuição e rentabilidade, orientamos sobre a melhor tributação (progressiva ou regressiva) e acompanhamos periodicamente a performance dos seus investimentos.`}
      howItWorks={[
        { step: "1", title: "Definição de Objetivos", description: "Estabelecemos quanto você quer acumular, em quanto tempo e qual renda mensal deseja na aposentadoria" },
        { step: "2", title: "Escolha do Plano", description: "Definimos PGBL ou VGBL, regime de tributação (progressiva ou regressiva) e perfil de investimento" },
        { step: "3", title: "Simulação Realista", description: "Apresentamos projeções com diferentes cenários de contribuição e rentabilidade" },
        { step: "4", title: "Acompanhamento Periódico", description: "Monitoramos a rentabilidade e sugerimos ajustes quando necessário, incluindo portabilidade" },
      ]}
      coverages={[
        { title: "PGBL - Plano Gerador de Benefício Livre", description: "Ideal para quem faz declaração completa do IR e busca dedução fiscal" },
        { title: "VGBL - Vida Gerador de Benefício Livre", description: "Indicado para quem faz declaração simplificada ou é isento" },
        { title: "Portabilidade Sem Custo", description: "Possibilidade de migrar para planos melhores sem perder rentabilidade" },
        { title: "Resgate Programado", description: "Defina como e quando resgatar seu dinheiro" },
        { title: "Benefício por Sobrevivência", description: "Receba renda vitalícia ou por período determinado" },
        { title: "Cobertura por Morte", description: "Garante que os beneficiários recebam o patrimônio acumulado" },
      ]}
      coverageExclusions={[
        "Não há garantia de rentabilidade (investimentos estão sujeitos a oscilações do mercado)",
        "Resgate antes do prazo pode ter carência e tributação desfavorável",
        "Taxas de administração e carregamento reduzem a rentabilidade líquida",
        "PGBL: o IR incide sobre todo o valor resgatado, não apenas os rendimentos",
        "Mudança de regime tributário não é permitida após a escolha",
      ]}
      pricingInfo={{
        intro: "A previdência privada não tem 'custo' fixo — você define quanto contribuir conforme seus objetivos e capacidade.",
        factors: [
          "Valor da contribuição mensal ou aportes únicos",
          "Taxa de administração do fundo (0,5% a 2% ao ano)",
          "Taxa de carregamento (muitos planos já isentam)",
          "Perfil de investimento (conservador, moderado, arrojado)",
          "Prazo até a aposentadoria ou resgate",
          "Regime tributário escolhido (progressivo ou regressivo)",
        ],
        note: "Contribuindo R$ 500/mês por 30 anos com rentabilidade real de 5% ao ano, você acumularia aproximadamente R$ 400.000. Com R$ 1.000/mês nas mesmas condições: R$ 800.000. O PGBL permite deduzir até 12% da renda bruta do IR — para quem ganha R$ 10.000/mês, é uma economia de até R$ 3.300/ano em imposto.",
      }}
      realScenarios={[
        { title: "Economia fiscal com PGBL", description: "Um executivo com renda de R$ 15.000/mês investiu R$ 1.800/mês em PGBL. Na declaração do IR, deduziu R$ 21.600 da base de cálculo, resultando em restituição adicional de R$ 5.940. Esse valor foi reinvestido no próprio PGBL." },
        { title: "Portabilidade para fundo melhor", description: "Um cliente tinha previdência com taxa de administração de 2,5% ao ano. Fizemos portabilidade para fundo com taxa de 0,8%, sem custo e sem perder o histórico tributário. A economia em 20 anos foi projetada em R$ 85.000." },
        { title: "Sucessão patrimonial", description: "Um empresário utilizou VGBL como instrumento de sucessão. Ao falecer, os R$ 500.000 acumulados foram para os beneficiários em 15 dias, sem inventário e sem custas judiciais." },
      ]}
      importantDetails={[
        { title: "PGBL vs VGBL", content: "PGBL: deduz até 12% da renda bruta do IR (declaração completa), mas o IR incide sobre o total no resgate. VGBL: não deduz no IR, mas o imposto incide apenas sobre os rendimentos. Escolha errada pode custar caro — orientamos com base no seu perfil fiscal." },
        { title: "Tributação regressiva vs progressiva", content: "Regressiva: alíquota diminui com o tempo (de 35% a 10% após 10 anos). Progressiva: segue a tabela do IR (0% a 27,5%). Para prazos longos (10+ anos), a regressiva costuma ser melhor." },
        { title: "Ferramenta de sucessão", content: "Em caso de morte, o valor da previdência vai direto para os beneficiários indicados, sem inventário. Em muitos estados, também não incide ITCMD. É uma ferramenta poderosa de planejamento sucessório." },
      ]}
      tips={[
        "Comece o mais cedo possível — o efeito dos juros compostos é exponencial no longo prazo",
        "Se faz declaração completa do IR, PGBL pode economizar milhares de reais por ano em impostos",
        "Fuja de fundos com taxa de administração acima de 1,5% ao ano — use portabilidade para migrar",
        "Reinvista a restituição do IR no próprio PGBL — acelera significativamente a acumulação",
        "Revise o perfil de investimento periodicamente — jovens podem ser mais arrojados, próximos da aposentadoria devem ser conservadores",
        "Use a previdência como instrumento de sucessão — evita inventário e garante liquidez para os beneficiários",
      ]}
      whoNeeds={[
        "Profissionais liberais e autônomos sem INSS",
        "Pessoas que querem complementar a aposentadoria oficial",
        "Quem busca benefícios fiscais e redução de IR",
        "Pais que querem garantir recursos para filhos no futuro",
        "Pessoas com renda variável que querem disciplina financeira",
        "Quem planeja aposentadoria antecipada",
      ]}
      whyPatro={[
        "Análise comparativa entre PGBL e VGBL para seu perfil",
        "Simulações realistas de acúmulo e rendimento",
        "Orientação sobre melhores fundos e gestoras",
        "Acompanhamento periódico da rentabilidade",
        "Auxílio em portabilidade quando necessário",
        "Consultoria sobre estratégias de resgate e sucessão",
      ]}
      faqs={[
        { question: "Qual a diferença entre PGBL e VGBL?", answer: "PGBL permite deduzir até 12% da renda bruta do IR (declaração completa). VGBL não permite dedução, mas o IR incide apenas sobre os rendimentos no resgate." },
        { question: "Quanto devo investir mensalmente?", answer: "Recomendamos 10% a 20% da renda. Fazemos simulações com diferentes valores para encontrar o ideal para seus objetivos." },
        { question: "Posso resgatar antes da aposentadoria?", answer: "Sim, mas há períodos de carência e a tributação pode ser desfavorável se o prazo for curto." },
        { question: "Tem garantia de rentabilidade?", answer: "Não há garantia, mas você pode escolher fundos conforme seu perfil de risco. Acompanhamos a performance periodicamente." },
        { question: "O que acontece se eu falecer?", answer: "O patrimônio acumulado vai para os beneficiários indicados, sem inventário. Excelente instrumento de sucessão patrimonial." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Saúde", link: "/seguro-saude" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default PrevidenciaPrivada;
