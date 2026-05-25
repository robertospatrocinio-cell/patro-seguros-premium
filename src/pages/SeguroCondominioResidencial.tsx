import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-condominio.webp";

const SeguroCondominioResidencial = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Condomínio Residencial"
      subtitle="Proteção completa para o patrimônio coletivo, áreas comuns e síndicos"
      icon="🏢"
      metaDescription="Seguro Condomínio Residencial em Guarulhos: proteção para áreas comuns, lazer e RC síndico. Cobertura contra incêndio e danos elétricos. Cotação Patro Seguros."
      description="O Seguro Condomínio Residencial é essencial para proteger a estrutura e as áreas comuns de edifícios e loteamentos, garantindo tranquilidade aos moradores e proteção legal ao síndico."
      detailedDescription={`Administrar um condomínio residencial exige responsabilidade com o patrimônio de dezenas ou centenas de famílias. O seguro obrigatório por lei protege a edificação contra incêndio e explosão, mas a Patro Seguros oferece coberturas que vão muito além do básico.

Protegemos as áreas de lazer (piscina, academia, salão de festas), os sistemas coletivos (elevadores, portões automáticos, geradores) e, principalmente, a Responsabilidade Civil do Condomínio. Isso significa proteção contra processos de moradores ou terceiros por acidentes ocorridos nas dependências do prédio.

Com o Seguro Condomínio Residencial, o síndico tem a segurança de que um imprevisto elétrico ou um vazamento em área comum não gerará um rateio extra inesperado para os condôminos.`}
      howItWorks={[
        { step: "1", title: "Análise da Convenção", description: "Verificamos as exigências da convenção e as necessidades específicas das áreas de lazer e equipamentos." },
        { step: "2", title: "Dimensionamento de Verbas", description: "Cálculo preciso do valor de reconstrução e limites para danos elétricos e responsabilidade civil." },
        { step: "3", title: "Cotação Multisseguradoras", description: "Comparamos as melhores opções do mercado para condomínios residenciais em Guarulhos." },
        { step: "4", title: "Acompanhamento e Vistoria", description: "Suporte total na emissão da apólice, vistorias técnicas e gestão de renovações anuais." },
      ]}
      coverages={[
        { title: "Incêndio, Raio e Explosão", description: "Cobertura básica para a estrutura total do edifício." },
        { title: "Danos Elétricos", description: "Proteção fundamental para elevadores, interfones e sistemas de segurança." },
        { title: "Responsabilidade Civil Condomínio", description: "Cobre danos materiais ou corporais a moradores e visitantes em áreas comuns." },
        { title: "RC Síndico", description: "Protege o patrimônio pessoal do síndico em caso de processos por erros de gestão." },
        { title: "Danos por Água (Vazamentos)", description: "Cobertura para danos causados por rompimento de tubulações coletivas." },
        { title: "Vendaval e Granizo", description: "Proteção para o telhado, fachadas e áreas externas contra ventos fortes." },
        { title: "Vida e Acidentes de Funcionários", description: "Garante amparo aos colaboradores do prédio conforme convenção coletiva." },
        { title: "Subtração de Bens do Condomínio", description: "Proteção para equipamentos de academia, móveis de salão e ferramentas de zeladoria." },
      ]}
      coverageExclusions={[
        "Conteúdo interno dos apartamentos (cada morador deve ter seu seguro residencial)",
        "Veículos de moradores em garagens (exige cobertura específica de RC Garagista)",
        "Danos estéticos sem prejuízo funcional",
        "Vazamentos originados dentro das unidades privativas",
        "Atos ilícitos ou dolo comprovado do síndico",
        "Manutenção precária negligenciada",
      ]}
      pricingInfo={{
        intro: "O investimento no seguro é rateado entre as unidades, tornando o custo individual extremamente baixo.",
        factors: [
          "Número de torres e unidades",
          "Idade do condomínio e histórico de manutenção",
          "Complexidade das áreas de lazer (piscina, spas, etc.)",
          "Limites contratados para RC e Danos Elétricos",
          "Localização e medidas de segurança contra incêndio",
        ],
        note: "Um condomínio residencial bem segurado evita conflitos entre vizinhos e protege o valor de mercado do imóvel.",
      }}
      realScenarios={[
        { title: "Rompimento de Tubulação Central", description: "Um cano mestre estourou, alagando o hall social e o elevador. O seguro cobriu os custos de reparo e a secagem especializada, totalizando R$ 32.000." },
        { title: "Acidente na Piscina", description: "Um convidado se acidentou na borda da piscina devido a uma placa solta. O seguro de RC Condomínio cobriu todas as despesas médicas e indenização." },
        { title: "Raio Queimou Interfones", description: "Uma descarga elétrica queimou toda a central de interfones e câmeras. A reposição de R$ 18.000 foi paga integralmente pela cobertura de danos elétricos." },
      ]}
      importantDetails={[
        { title: "Obrigação Legal", content: "Conforme o Código Civil, o seguro da edificação é obrigatório. O síndico que não contrata pode responder pessoalmente por prejuízos em caso de sinistro." },
        { title: "Condomínio vs Residencial", content: "É vital que os moradores saibam que o seguro do prédio NÃO cobre os móveis e bens dentro do apartamento. Recomendamos que cada morador possua seu Seguro Residencial individual." },
      ]}
      tips={[
        "Contrate sempre a verba de RC Síndico para sua proteção pessoal",
        "Mantenha o AVCB (Auto de Vistoria do Corpo de Bombeiros) sempre atualizado",
        "Revise o valor de reconstrução periodicamente para evitar o 'seguro insuficiente'",
        "Incentive os condôminos a terem seguro residencial individual para proteção 100%",
      ]}
      whoNeeds={[
        "Condomínios Verticais (Prédios)",
        "Condomínios de Casas (Loteamentos)",
        "Associações de Moradores",
        "Apart-hotéis e Flats",
        "Condomínios de Veraneio",
      ]}
      whyPatro={[
        "Especialistas em riscos condominiais em Guarulhos",
        "Suporte direto ao síndico e administradora",
        "Análise minuciosa de verbas para evitar rateios em sinistros",
        "Plantão de atendimento em casos de emergência predial",
        "Acesso às melhores seguradoras do ramo de Condomínio",
      ]}
      faqs={[
        { question: "O seguro cobre batida de carro na garagem?", answer: "Apenas se for contratada a cobertura adicional de Responsabilidade Civil Garagista. A cobertura padrão não abrange veículos de moradores." },
        { question: "O que acontece se o síndico esquecer de renovar?", answer: "O síndico pode ser responsabilizado civil e criminalmente por qualquer prejuízo que ocorra no período sem seguro." },
        { question: "Cobre roubo dentro do apartamento?", answer: "Não. O seguro do condomínio cobre apenas o patrimônio coletivo. Roubo dentro das unidades é coberto apenas pelo Seguro Residencial individual." },
        { question: "Quanto custa o seguro por apartamento?", answer: "Geralmente o valor é muito baixo, variando entre R$ 5,00 a R$ 15,00 por mês no boleto do condomínio." },
      ]}
      relatedInsurances={[
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Seguro de Condomínio Empresarial", link: "/seguro-condominio-empresarial" },
        { title: "Seguro RC Síndico", link: "/seguro-rc" },
      ]}
    />
  );
};

export default SeguroCondominioResidencial;
