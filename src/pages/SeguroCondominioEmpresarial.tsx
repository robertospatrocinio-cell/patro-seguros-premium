import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-condominio.webp";

const SeguroCondominioEmpresarial = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Condomínio Empresarial"
      subtitle="Proteção sob medida para edifícios comerciais, escritórios e centros de negócios"
      icon="🏢"
      metaDescription="Seguro Condomínio Empresarial: proteção para edifícios comerciais, escritórios e consultórios. Cobertura de RC, incêndio e danos elétricos."
      description="O Seguro Condomínio Empresarial é focado nas necessidades específicas de edifícios comerciais, protegendo o patrimônio comum e garantindo a continuidade dos negócios."
      detailedDescription={`Edifícios comerciais e centros empresariais possuem dinâmicas de risco muito diferentes de condomínios residenciais. O fluxo intenso de pessoas (clientes e prestadores), a presença de equipamentos eletrônicos de alto valor, servidores, centrais de ar-condicionado e a responsabilidade civil perante empresas condôminas exigem uma apólice mais robusta.

O Seguro Condomínio Empresarial da Patro Seguros oferece proteção contra incêndio, danos elétricos em elevadores e sistemas inteligentes, além de uma cobertura de Responsabilidade Civil Sindico e Condomínio que protege contra processos judiciais decorrentes da operação do edifício. 

É o seguro ideal para garantir que um incidente em uma área comum não interrompa o funcionamento de dezenas de empresas e profissionais liberais que dependem da infraestrutura do prédio.`}
      howItWorks={[
        { step: "1", title: "Diagnóstico Predial", description: "Avaliamos a infraestrutura do edifício comercial, sistemas de segurança e perfil das empresas ocupantes." },
        { step: "2", title: "Customização de Verbas", description: "Ajustamos os limites de cobertura para equipamentos eletrônicos, elevadores e áreas de uso comum." },
        { step: "3", title: "Apresentação ao Síndico", description: "Enviamos um comparativo detalhado entre as principais seguradoras focadas em riscos comerciais." },
        { step: "4", title: "Gestão de Riscos", description: "Implementação da apólice com suporte total para renovações e gestão de eventuais sinistros." },
      ]}
      coverages={[
        { title: "Incêndio e Explosão", description: "Cobertura fundamental para a estrutura do edifício comercial." },
        { title: "Danos Elétricos", description: "Proteção para elevadores, geradores, nobreaks e sistemas de automação predial." },
        { title: "RC Condomínio e Síndico", description: "Cobre danos causados a terceiros e protege o patrimônio pessoal do síndico em caso de processos." },
        { title: "Vidros e Anúncios Luminosos", description: "Cobertura para fachadas pele de vidro, espelhos e letreiros da administração." },
        { title: "Subtração de Bens do Condomínio", description: "Proteção para móveis de recepção, auditórios e equipamentos de áreas comuns." },
        { title: "Vendaval e Granizo", description: "Proteção contra danos causados por fenômenos climáticos na fachada e telhado." },
        { title: "Equipamentos Eletrônicos", description: "Seguro específico para centrais de monitoramento e TI do condomínio." },
        { title: "Quebra de Maquinário", description: "Proteção contra quebra acidental de bombas e sistemas centrais de ar-condicionado." },
      ]}
      coverageExclusions={[
        "Danos ao conteúdo interno das salas comerciais (cada empresa deve ter seu seguro empresarial)",
        "Lucros cessantes das empresas condôminas",
        "Atos de má gestão intencionais do síndico",
        "Vazamentos de tubulações internas das salas",
        "Danos por falta de manutenção preventiva",
        "Obras de ampliação não comunicadas à seguradora",
      ]}
      pricingInfo={{
        intro: "O custo é determinado pelo valor de reconstrução do prédio e pela soma das coberturas acessórias contratadas.",
        factors: [
          "Localização e idade do edifício",
          "Tipo de atividade das empresas ocupantes (risco ocupacional)",
          "Número de elevadores e complexidade dos sistemas elétricos",
          "Medidas de segurança e combate a incêndio existentes",
          "Limites de Responsabilidade Civil escolhidos",
        ],
        note: "Para condomínios empresariais, a cobertura de Danos Elétricos deve ser robusta, dado o valor dos sistemas inteligentes e elevadores modernos.",
      }}
      realScenarios={[
        { title: "Curto-circuito no Gerador", description: "Uma falha elétrica danificou o gerador do prédio. O seguro cobriu o reparo de R$ 45.000, evitando que o condomínio ficasse sem energia de emergência." },
        { title: "Queda em piso molhado da Recepção", description: "Um visitante escorregou no hall de entrada. O seguro de RC Condomínio arcou com as despesas hospitalares e indenização, sem custos extras para os condôminos." },
        { title: "Fachada de vidro danificada por vendaval", description: "Ventos fortes quebraram placas de vidro da fachada. O seguro de vidros e vendaval cobriu a reposição rápida dos painéis." },
      ]}
      importantDetails={[
        { title: "Diferença entre Condomínio e Empresarial", content: "O seguro de condomínio empresarial cobre a estrutura comum. As salas comerciais devem contratar o 'Seguro Empresarial' individualmente para proteger seus móveis, estoques e equipamentos próprios." },
        { title: "RC Síndico", content: "Indispensável para edifícios comerciais, protegendo o gestor contra reclamações de terceiros ou condôminos sobre falhas na administração do condomínio." },
      ]}
      tips={[
        "Sempre contrate uma verba alta de Danos Elétricos — é a cobertura mais usada em prédios comerciais",
        "Verifique se a RC cobre garagista, se o prédio oferecer esse serviço",
        "Mantenha os laudos de para-raios e bombeiros (AVCB) sempre em dia para não invalidar sinistros",
        "Considere a cobertura de Quebra de Maquinário se o prédio possuir ar-condicionado central",
      ]}
      whoNeeds={[
        "Edifícios de Escritórios",
        "Centros Clínicos e Médicos",
        "Condomínios de Consultórios",
        "Prédios Comerciais Mistos",
        "Coworkings com áreas comuns amplas",
        "Centros Empresariais e Logísticos",
      ]}
      whyPatro={[
        "Consultoria técnica para dimensionamento de verbas elétricas",
        "Análise comparativa entre seguradoras líderes do mercado comercial",
        "Suporte na análise de contratos de manutenção preventiva",
        "Atendimento prioritário em caso de sinistros operacionais",
        "Experiência comprovada em gestão de riscos corporativos em Guarulhos",
      ]}
      faqs={[
        { question: "O seguro do condomínio cobre roubo dentro da minha sala?", answer: "Não. O seguro do condomínio cobre apenas o patrimônio comum. Bens dentro das salas devem ser protegidos por um Seguro Empresarial individual." },
        { question: "O síndico pode ser processado se um elevador cair?", answer: "Sim, ele pode ser responsabilizado. Por isso, a cobertura de RC Síndico é fundamental para protegê-lo." },
        { question: "Cobre danos por infiltração?", answer: "Geralmente infiltrações graduais são excluídas. O seguro foca em eventos súbitos e imprevistos, como estouro de tubulação comum (se contratada a cobertura de danos por água)." },
        { question: "Quanto tempo leva para receber a indenização?", answer: "Após a entrega de toda a documentação, a seguradora tem até 30 dias por lei para realizar o pagamento." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Responsabilidade Civil", link: "/seguro-rc" },
        { title: "Seguro de Condomínio", link: "/seguro-condominio" },
      ]}
    />
  );
};

export default SeguroCondominioEmpresarial;
