import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ServiceSchema from "@/components/ServiceSchema";
import { trilhaVida } from "@/lib/trilhaSeoRecomendacoes";
import heroImg from "@/assets/hero-seguro-vida.webp";
import heroMobileImg from "@/assets/hero-familia-sm.webp";

const SeguroVida = () => {
  return (
    <>
      <ServiceSchema
        name="Seguro de Vida"
        description="O seguro de vida em Guarulhos oferece proteção conforme as coberturas contratadas. A Patro Seguros, corretora registrada na SUSEP, compara alternativas entre até 16 seguradoras conforme o perfil e o produto."
        serviceType="LifeInsurance"
      />
    <InsurancePageTemplate
      heroImage={heroImg}
      mobileHeroImage={heroMobileImg}
      title="Seguro de Vida em Guarulhos | Patro Seguros"
      headline="Seguro de vida em Guarulhos para proteger sua família"
      subtitle="Consultoria sensível e técnica para garantir estabilidade à sua família — em qualquer cenário"
      icon="❤️"
      metaDescription="Seguro de vida em Guarulhos: conheça alternativas de proteção e compare propostas conforme seu perfil com a Patro Seguros."
      description="O Seguro de Vida é uma forma de planejamento financeiro que pode oferecer proteção conforme as coberturas contratadas, inclusive em situações de morte ou invalidez previstas no contrato."
      detailedDescription={`Muitas pessoas associam o seguro de vida apenas à morte, mas o produto pode incluir garantias adicionais para situações em que o segurado está vivo, conforme o contrato. O impacto financeiro de um acidente ou doença depende da renda, das responsabilidades e da proteção efetivamente contratada.

O seguro de vida pode reunir coberturas para morte e, conforme o produto contratado, garantias adicionais relacionadas a invalidez, doenças graves, diárias, assistência funeral ou outras situações previstas nas condições contratuais. A existência, o alcance e os critérios de cada cobertura devem ser conferidos na proposta e na apólice.`}
      howItWorks={[
        { step: "1", title: "Análise das Necessidades", description: "Avaliamos sua situação familiar e financeira, incluindo dependentes, renda, dívidas, custo de vida, profissão e objetivos. O capital adequado depende desse diagnóstico e da aceitação da seguradora; não há uma regra universal de meses de renda." },
        { step: "2", title: "Escolha das Coberturas", description: "Analisamos coberturas de morte e, quando disponíveis e contratadas, invalidez, doenças graves, diárias, assistência funeral e outras garantias. Cada cobertura possui definição, capital, limites, carências e exclusões próprios." },
        { step: "3", title: "Cotação e Contratação", description: "A cotação considera o perfil, o produto e os critérios de aceitação da seguradora. A proposta pode exigir DPS e, conforme o caso, informações ou exames adicionais; o procedimento não é igual em todos os produtos." },
        { step: "4", title: "Revisão Periódica", description: "A vida muda — e o seguro precisa acompanhar. Nascimento de filhos, aquisição de imóvel, mudança de renda: tudo isso impacta o capital necessário. Revisamos anualmente para manter a proteção adequada." },
      ]}
      coverages={[
        { title: "Morte", description: "Pode prever indenização aos beneficiários em caso de morte natural, acidental ou ambas, conforme a cobertura contratada, os limites, as exclusões e as condições da apólice." },
        { title: "Invalidez por acidente", description: "Pode oferecer indenização por invalidez permanente total ou parcial decorrente de acidente, conforme a definição, o grau de invalidez e o critério previsto no contrato." },
        { title: "Invalidez por doença", description: "Modalidades como IFPD ou outras garantias de invalidez dependem da definição contratual. Não se deve confundir incapacidade para a profissão com os critérios específicos da cobertura." },
        { title: "Doenças graves", description: "Quando contratada, a cobertura depende da lista de doenças, diagnóstico, período de carência, critérios, limites e demais condições previstos na apólice." },
        { title: "Diária por internação hospitalar", description: "Pode prever pagamento diário durante internação, se essa garantia estiver contratada e forem atendidos os requisitos, limites, carências e documentos do produto." },
        { title: "Assistência funeral", description: "Pode oferecer serviços ou reembolso relacionados ao funeral, conforme a modalidade contratada, limites, rede, eventos cobertos e condições da seguradora." },
      ]}
      coverageExclusions={[
        "Suicídio: a aplicação da regra legal e contratual deve ser analisada conforme o art. 120 da Lei nº 15.040/2024 e as circunstâncias do caso",
        "Atos ilícitos dolosos praticados pelo segurado",
        "Participação em guerras, insurreições ou atos terroristas",
        "Atividade esportiva ou de risco não informada ou não aceita, conforme o produto e as condições contratuais",
        "Uso de drogas ilícitas como causa direta do sinistro",
        "Epidemias e pandemias (varia conforme a seguradora e apólice)",
        "Informações de saúde omitidas ou inexatas podem ser analisadas conforme a lei, a proposta, o conhecimento do segurado e a relação com o sinistro",
      ]}
      pricingInfo={{
        intro: "O preço depende do capital segurado, coberturas, idade, perfil, profissão, saúde declarada, prazo, forma de contratação e critérios de aceitação. Não há um preço médio universal aplicável a todos os segurados.",
        factors: [
          "Idade — é o principal fator. Quanto mais jovem, mais barato. Contratar cedo trava condições melhores",
          "Capital segurado — valor da indenização desejada",
          "Coberturas escolhidas — morte, invalidez, doenças graves, assistência funeral",
          "Profissão — atividades de risco elevado (motoboy, eletricista, pedreiro) encarecem",
          "Estado de saúde — fumantes pagam mais; doenças preexistentes podem encarecer ou restringir",
          "Sexo — estatisticamente, mulheres pagam menos (menor taxa de mortalidade)",
        ],
        note: "Importante: a incidência tributária, os efeitos sucessórios e o prazo de pagamento devem ser analisados conforme a legislação vigente, a cobertura, a apólice e os documentos do sinistro. A Lei nº 15.040/2024 disciplina o capital segurado devido por morte, sem permitir generalização para previdência ou investimentos.",
      }}
      realScenarios={[
        { title: "Doença grave", description: "Uma cobertura de doenças graves pode prever pagamento após diagnóstico que atenda aos critérios contratuais. O uso do valor e os limites dependem da apólice." },
        { title: "Invalidez por acidente", description: "Uma cobertura de invalidez pode prever indenização quando o evento e o grau de invalidez atendem à definição contratual. A regulação é feita pela seguradora." },
        { title: "Falecimento do provedor familiar", description: "Em caso de morte coberta, os beneficiários podem requerer a indenização conforme a apólice, a documentação e a análise da seguradora." },
      ]}
      importantDetails={[
        { title: "Como dimensionar o capital segurado", content: "Não existe uma fórmula universal. Considere dependentes, renda, dívidas, despesas futuras, patrimônio, objetivos e o orçamento disponível. O capital é livremente estipulado na contratação, dentro da aceitação e dos limites do produto." },
        { title: "Beneficiários — Como definir", content: "O beneficiário não se confunde automaticamente com herdeiro. A indicação, a alteração e a ausência de beneficiário devem ser analisadas conforme a Lei nº 15.040/2024, a apólice e eventual manifestação do segurado. Não se deve prometer alteração sem burocracia nem afirmar que todo caso evitará inventário." },
        { title: "Seguro de Vida vs Previdência Privada", content: "São produtos diferentes e complementares. O seguro de vida paga indenização em caso de sinistro (morte, invalidez). A previdência privada é um investimento de longo prazo para aposentadoria.\n\nO seguro de vida é essencial durante a fase ativa (quando você trabalha e tem dependentes). A previdência privada constrói reserva para quando você parar de trabalhar. O ideal é ter os dois." },
        { title: "DPS — Declaração Pessoal de Saúde", content: "A DPS é um questionário de saúde usado em determinados processos de aceitação. A seguradora pode solicitar informações ou exames conforme o produto, o capital, a idade e seus critérios. As respostas devem ser completas e verdadeiras; eventual omissão será analisada conforme a lei, a proposta, o conhecimento do segurado e sua relação com o sinistro. A aceitação de condição preexistente, agravamento ou exclusão depende da seguradora e do contrato." },
      ]}
      tips={[
        "A idade é um dos fatores de precificação; compare propostas sem presumir um percentual ou preço universal.",
        "Revise o capital segurado quando sua vida mudar: casamento, filhos, compra de imóvel, aumento de renda.",
        "Considere Doenças Graves apenas se a definição, a lista, a carência e os critérios da cobertura fizerem sentido para o seu perfil.",
        "Não esqueça da assistência funeral familiar — em momento de luto, não ter que lidar com custos faz enorme diferença.",
        "Se você fuma, há seguradoras com condições melhores para fumantes — comparar é essencial.",
        "Mantenha os dados dos beneficiários atualizados e confirme as regras legais e contratuais aplicáveis.",
      ]}
      whoNeeds={[
        "Pessoas com dependentes financeiros — cônjuge, filhos menores, pais idosos",
        "Profissionais autônomos e liberais — não têm FGTS, INSS robusto nem benefícios de CLT",
        "Quem tem financiamento imobiliário — o seguro quita a dívida e a família mantém o imóvel",
        "Casais em que ambos contribuem para a renda — a perda de uma renda impacta o padrão de vida",
        "Empresários e sócios — protege a empresa e a família em caso de falecimento de sócio",
        "Profissionais de risco — motoristas, eletricistas, trabalhadores em altura, etc.",
        "Qualquer adulto a partir dos 25 anos que queira proteger quem ama",
      ]}
      whyPatro={[
        "Orientação para dimensionar o capital segurado com base na sua realidade financeira e familiar",
        "Comparação entre alternativas de seguradoras especializadas em vida, conforme o perfil e as condições do produto",
        "Orientação sobre DPS — como declarar condições preexistentes sem comprometer a apólice",
        "Orientação aos beneficiários sobre comunicação e documentação do sinistro, sem substituir a regulação da seguradora",
        "Revisão periódica das coberturas conforme mudanças na vida (filhos, imóvel, renda)",
        "Atendimento humanizado — entendemos a sensibilidade do tema e tratamos com cuidado",
      ]}
      faqs={[
        { question: "Quanto custa um seguro de vida?", answer: "Depende do capital segurado, coberturas, idade, perfil, profissão, saúde declarada, prazo e critérios da seguradora. A proposta e as condições do produto devem ser analisadas individualmente." },
        { question: "Qual o valor ideal de cobertura?", answer: "Não há uma fórmula universal. O capital deve considerar dependentes, renda, dívidas, despesas futuras, patrimônio, objetivos e orçamento, sempre conforme a aceitação e os limites do produto." },
        { question: "Quem pode ser beneficiário?", answer: "A indicação deve ser analisada conforme a lei e a apólice. Beneficiário e herdeiro não são conceitos automaticamente iguais; a ausência, a alteração e a distribuição dependem das regras aplicáveis ao caso." },
        { question: "Preciso fazer exames médicos?", answer: "Depende do produto, capital, idade, perfil e critérios de aceitação. A seguradora pode usar DPS e solicitar informações ou exames adicionais; não há uma regra única para todas as propostas." },
        { question: "O seguro de vida cobre suicídio?", answer: "A regra deve ser analisada à luz do art. 120 da Lei nº 15.040/2024, da vigência e das circunstâncias do caso. Não é correto tratar a cobertura como sempre excluída ou sempre garantida sem examinar a norma e o contrato." },
        { question: "A indenização paga Imposto de Renda?", answer: "A tributação e os efeitos sucessórios dependem da legislação vigente, da natureza do pagamento e do produto. Não generalize essa resposta para previdência ou investimentos; confirme o caso concreto com orientação especializada." },
        { question: "Posso ter mais de um seguro de vida?", answer: "Em princípio, é possível contratar mais de uma apólice, mas a aceitação, os capitais, a acumulação de coberturas e o pagamento dependem das condições de cada contrato e da análise do sinistro." },
        { question: "Seguro de vida em grupo (empresa) é suficiente?", answer: "Geralmente não. O seguro de vida em grupo oferecido pela empresa costuma ter capitais baixos (12 a 24 salários) e você perde a cobertura ao sair da empresa. O ideal é ter um seguro individual com capital adequado como base e considerar o do grupo como complemento." },
      ]}
      contextualLinks={{
        heading: "Vamos conversar sobre proteção patrimonial completa",
        paragraphs: [
          "O seguro de vida protege financeiramente quem você ama. Mas a proteção da família vai além: seu imóvel é provavelmente o maior patrimônio da família — e o seguro residencial protege contra incêndio, roubo e danos elétricos a partir de R$ 150/ano.",
          "Se você é autônomo ou profissional liberal, considere também o seguro de acidentes pessoais (veja nossa página dedicada de contratação rápida) para complementar a cobertura. Para quem busca construir patrimônio a longo prazo, a previdência privada é o complemento ideal ao seguro de vida. E não esqueça: um bom plano de saúde garante acesso rápido a tratamentos que podem salvar vidas — para pais e avós, temos plano específico para idosos 60+ em Guarulhos.",
        ],
        links: [
          { text: "Seguro Residencial", href: "/seguro-residencial" },
          { text: "Seguro Acidentes Pessoais", href: "/seguro-acidentes-pessoais" },
          { text: "Contratar Acidentes Pessoais (LP)", href: "/lp/seguro-acidentes-pessoais" },
          { text: "Plano de Saúde Sênior em Guarulhos", href: "/planos-saude-senior-guarulhos" },
          { text: "Previdência Privada", href: "/previdencia-privada" },
          { text: "Planos de Saúde", href: "/planos-de-saude" },
          { text: "Seguro Auto", href: "/seguro-auto" },
          { text: "Cotação Gratuita", href: "/cotacao" },
        ],
      }}
      relatedInsurances={[
        { title: "Previdência Privada", link: "/previdencia-privada" },
        { title: "Seguro Saúde", link: "/seguro-saude" },
        { title: "Seguro Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
        { title: "Seguro Residencial", link: "/seguro-residencial" },
      ]}
      quoteUrl="/seguro-vida/formulario"
      quoteFormFields={[
        { id: "nascimento", label: "Data de nascimento", placeholder: "Ex: 15/03/1985" },
        { id: "profissao", label: "Profissão", placeholder: "Ex: Engenheiro, Médico, Autônomo" },
        { id: "capital", label: "Capital desejado", placeholder: "Selecione", type: "select", options: ["Até R$ 100.000", "R$ 100.000 a R$ 300.000", "R$ 300.000 a R$ 500.000", "Acima de R$ 500.000", "Não sei / quero orientação"] },
      ]}
      canonicalUrl="https://www.patroseguros.com.br/seguro-vida"
      howto={{
        name: "Como contratar um seguro de vida em Guarulhos",
        description: "Passo a passo para contratar o seguro de vida certo, com capital adequado à sua renda e responsabilidades familiares.",
        totalTime: "PT48H",
        supply: ["CPF", "Data de nascimento", "Renda mensal aproximada", "Dependentes financeiros"],
        tool: ["WhatsApp Patro Seguros", "Formulário online"],
        steps: [
          { name: "Levante suas responsabilidades", text: "Some renda anual x anos que sua família precisaria de suporte + dívidas em aberto (financiamento, escola, cartão). Esse é o capital-alvo do seu seguro." },
          { name: "Escolha as coberturas essenciais", text: "Além da cobertura de morte, avalie garantias de invalidez, doenças graves ou outras opções somente quando disponíveis, contratadas e adequadas às definições e critérios da apólice." },
          { name: "Solicite cotação comparativa", text: "Envie os dados à Patro Seguros pelo WhatsApp (11) 5199-7500 ou pelo formulário. A quantidade de seguradoras consultadas depende do produto, do perfil e dos critérios de aceitação." },
          { name: "Analise a proposta e a declaração de saúde", text: "Preencha a DPS ou os formulários solicitados com veracidade. A análise de informações de saúde e eventual pedido de exames seguem o produto e os critérios da seguradora." },
          { name: "Assine digitalmente e ative a apólice", text: "A vigência começa conforme a proposta, a aceitação, o pagamento e as condições contratuais; não há promessa universal de ativação em prazo fixo." },
        ],
      }}
      trilhaSeo={{
        subtitle:
          "Proteções complementares mais contratadas junto ao Seguro de Vida em Guarulhos.",
        items: trilhaVida,
      }}
    />
    <ExitIntentPopup />
    </>
  );
};

export default SeguroVida;
