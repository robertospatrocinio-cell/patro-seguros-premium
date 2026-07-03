import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-saude.webp";

/**
 * Plano de Saúde Empresarial em Guarulhos — variante local SEO da página
 * /plano-saude-empresarial. Mesmo conteúdo principal, com headline, meta
 * e FAQs voltados para PMEs e MEIs de Guarulhos e região.
 */
const PlanoSaudeEmpresarialGuarulhos = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Plano de Saúde Empresarial em Guarulhos | Patro Seguros"
      headline="Plano de saúde empresarial em Guarulhos para PMEs e MEIs"
      subtitle="Cuide dos seus colaboradores em Guarulhos com planos corporativos mais baratos que o individual"
      icon="🏢"
      metaDescription="Plano de saúde empresarial em Guarulhos: PME e MEI a partir de 2 vidas. Compare Bradesco, Amil, SulAmérica, Hapvida e Porto Saúde. Cotação grátis."
      description="Plano de saúde empresarial em Guarulhos com assistência médica de qualidade para seus colaboradores e valores até 50% menores que o individual. Atendimento consultivo presencial no Cidade Maia."
      detailedDescription={`Empresas de Guarulhos enfrentam alta concorrência por talento — do polo industrial de Cumbica aos comércios do Centro, Vila Galvão e Maia. O plano de saúde empresarial é, hoje, o benefício mais valorizado pelos colaboradores e a forma mais eficiente de reter equipe.

Em Guarulhos, planos empresariais costumam custar 30% a 50% menos que individuais equivalentes, pois o risco é diluído no grupo. Para MEIs e PMEs a partir de 2 vidas, é possível contratar planos com Bradesco Saúde, Amil, SulAmérica, HapVida/NotreDame, Porto Saúde, Prevent Senior e MedSenior, todos com rede credenciada em hospitais de Guarulhos (Stella Maris, Carlos Chagas, Hospital Ipiranga) e em São Paulo.

A Patro Seguros é uma corretora de seguros em Guarulhos especializada em saúde empresarial. Comparamos as operadoras, validamos a rede credenciada perto da sua sede (Centro, Cumbica, Bonsucesso, Pimentas, Taboão, Vila Galvão, Macedo, Cidade Maia, Gopoúva, Ponte Grande ou Vila Augusta) e cuidamos da implantação. A consultoria é gratuita — o preço para a empresa é o mesmo da tabela da operadora.`}
      howItWorks={[
        { step: "1", title: "Diagnóstico da empresa", description: "Mapeamos número de vidas, faixas etárias, localização da sede em Guarulhos e necessidades específicas dos colaboradores." },
        { step: "2", title: "Cotação multioperadora", description: "Comparamos Bradesco, Amil, SulAmérica, Hapvida, Porto, Prevent Senior e outras para o seu CNPJ." },
        { step: "3", title: "Análise de rede em Guarulhos", description: "Conferimos hospitais e clínicas credenciados próximos à sua sede e à residência dos colaboradores." },
        { step: "4", title: "Implantação e suporte", description: "Cuidamos da papelada, inclusão de vidas e damos suporte contínuo ao RH durante toda a vigência." },
      ]}
      coverages={[
        { title: "Consultas e especialistas", description: "Mais de 30 especialidades com rede em Guarulhos e SP" },
        { title: "Exames e diagnósticos", description: "Laboratoriais, de imagem, endoscopia e ressonância" },
        { title: "Internações e cirurgias", description: "Cobertura clínica e cirúrgica em hospitais credenciados" },
        { title: "Urgência e emergência", description: "Pronto-socorro 24h com carência de 24 horas" },
        { title: "Telemedicina", description: "Consultas online disponíveis em diversas operadoras" },
        { title: "Saúde mental", description: "Psicólogos e psiquiatras inclusos no rol ANS" },
        { title: "Obstetrícia (opcional)", description: "Pré-natal, parto e pós-parto para colaboradoras" },
        { title: "Programas de prevenção", description: "Check-ups e programas de qualidade de vida" },
      ]}
      pricingInfo={{
        intro: "O valor do plano empresarial em Guarulhos depende do número de vidas, faixa etária média, tipo de acomodação e operadora.",
        factors: [
          "Número de beneficiários (mais vidas, menor custo per capita)",
          "Faixa etária média da equipe",
          "Acomodação: enfermaria ou apartamento",
          "Abrangência: regional (SP) ou nacional",
          "Com ou sem coparticipação",
          "Sinistralidade do grupo (nas renovações)",
        ],
        note: "Em Guarulhos, planos PME a partir de 2 vidas costumam variar de R$ 200 a R$ 1.200/mês por beneficiário. Empresas com perfil jovem (média até 30 anos) conseguem planos a partir de R$ 250/pessoa. Acima de 30 vidas geralmente há isenção total de carências.",
      }}
      tips={[
        "Compare pelo menos 3 operadoras — preço não é tudo, avalie a rede credenciada perto da sua sede em Guarulhos",
        "Considere coparticipação para reduzir a mensalidade em até 40%",
        "MEI com 2 vidas já se qualifica como plano empresarial — bem mais barato que individual",
        "Empresas com mais de 30 vidas devem exigir isenção total de carências",
        "Negocie reajustes anuais com base na sinistralidade real do seu grupo",
      ]}
      whoNeeds={[
        "PMEs de Guarulhos que querem atrair e reter colaboradores",
        "Indústrias e operadores logísticos de Cumbica e Bonsucesso",
        "Comércios do Centro, Vila Galvão, Pimentas e Maia",
        "MEIs que querem plano mais barato que individual",
        "Startups e escritórios com benefícios competitivos",
      ]}
      whyPatro={[
        "Corretora de seguros em Guarulhos com atendimento presencial no Cidade Maia",
        "Cotação simultânea com Bradesco, Amil, SulAmérica, Hapvida e Porto Saúde",
        "Análise de rede credenciada por bairro de Guarulhos",
        "Implantação sem burocracia para o RH",
        "Suporte contínuo nas inclusões, exclusões e renovações",
        "Consultoria 100% gratuita — você paga o preço de tabela",
      ]}
      faqs={[
        { question: "Quantas vidas preciso para contratar plano empresarial em Guarulhos?", answer: "A partir de 2 beneficiários — incluindo o titular MEI ou sócio. Para grupos menores que 30 vidas há carências; acima de 30 vidas, geralmente há isenção total." },
        { question: "Plano empresarial é mais barato que individual em Guarulhos?", answer: "Sim. Em Guarulhos, planos empresariais costumam custar 30% a 50% menos que individuais equivalentes, porque o risco é diluído entre todos os beneficiários do grupo." },
        { question: "Quais operadoras de plano empresarial atendem Guarulhos?", answer: "Bradesco Saúde, Amil, SulAmérica, HapVida/NotreDame Intermédica, Porto Saúde, Prevent Senior, MedSenior e Omint mantêm rede credenciada ampla em Guarulhos — Cidade Maia, Macedo, Centro, Vila Galvão, Bonsucesso e regiões próximas ao aeroporto." },
        { question: "MEI pode contratar plano empresarial em Guarulhos?", answer: "Sim. Com CNPJ ativo, o MEI contrata plano empresarial a partir de 2 vidas (titular + 1 dependente). Bradesco, Amil e SulAmérica aceitam essa modalidade, normalmente até 50% mais barata que o individual." },
        { question: "A Patro Seguros cobra para cotar plano de saúde empresarial?", answer: "Não. A consultoria é 100% gratuita. Você paga o mesmo preço de tabela da operadora — nossa remuneração vem direto dela." },
        { question: "Atendem empresas fora do Centro de Guarulhos?", answer: "Sim. Atendemos toda Guarulhos — Centro, Cumbica, Pimentas, Bonsucesso, Taboão, Vila Galvão, Macedo, Cidade Maia, Gopoúva, Ponte Grande, Vila Augusta e Jardim Maia — além de cidades próximas como Arujá, Itaquaquecetuba e zona leste de São Paulo." },
      ]}
      relatedInsurances={[
        { title: "Plano de Saúde em Guarulhos", link: "/plano-saude-guarulhos" },
        { title: "Plano Odontológico em Guarulhos", link: "/plano-odontologico-guarulhos" },
        { title: "Seguro Empresarial em Guarulhos", link: "/seguro-empresarial-guarulhos" },
        { title: "Seguro de Vida PME", link: "/seguro-vida-pme" },
      ]}
      howto={{
        name: "Como contratar plano de saúde empresarial em Guarulhos",
        description: "Passo a passo para contratar plano de saúde PME com CNPJ ativo, a partir de 2 vidas, com adesão em até 5 dias úteis.",
        totalTime: "P5D",
        supply: [
          "Contrato social ou MEI ativo há 6+ meses",
          "CNPJ",
          "Lista de beneficiários (nome, CPF, data de nascimento, dependentes)",
        ],
        tool: ["WhatsApp Patro Seguros", "Formulário online"],
        steps: [
          { name: "Envie a base de vidas", text: "Compartilhe com a Patro a lista de titulares e dependentes por faixa etária. Isso define preço e rede." },
          { name: "Escolha rede e coparticipação", text: "Rede referenciada ou credenciada em Guarulhos — Bradesco Saúde, SulAmérica, Amil, Notre Dame, Porto Seguro Saúde e Hapvida. Coparticipação reduz mensalidade em até 30%." },
          { name: "Receba cotação comparativa em 24h", text: "A Patro devolve 4 a 6 propostas com rede hospitalar, mensalidade por faixa e coparticipação lado a lado." },
          { name: "Assine contrato e envie documentação", text: "Assinatura digital + envio de contrato social, comprovante de vínculo (CTPS ou pró-labore) e RG/CPF dos beneficiários." },
          { name: "Ative carteirinhas em até 5 dias úteis", text: "Após aprovação, a operadora libera carteirinhas digitais e a Patro entrega manual de utilização + canal direto de gestão." },
        ],
      }}
    />
  );
};

export default PlanoSaudeEmpresarialGuarulhos;