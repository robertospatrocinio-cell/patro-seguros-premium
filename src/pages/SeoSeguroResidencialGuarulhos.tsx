import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import PrerenderText from "@/components/PrerenderText";
import heroImg from "@/assets/hero-seguro-residencial.webp";

const SeoSeguroResidencialGuarulhos = () => (
  <>
    <PrerenderText slug="seguro-residencial-guarulhos" />
    <InsurancePageTemplate
      heroImage={heroImg}
      quoteUrl="https://www.patroseguros.com.br/cotacao?tipo=residencial"
      title="Seguro Residencial em Guarulhos | Patro Seguros"
      subtitle="Seguro Residencial em Guarulhos — Compare as Condições"
      description="Solicite uma proposta para sua casa ou apartamento em Guarulhos. Compare eventos cobertos, limites, franquias e assistências conforme as características do imóvel."
      detailedDescription={`Para cotar seguro residencial em Guarulhos, informe o endereço, o tipo de construção, a ocupação e os valores a proteger. Casas, apartamentos, imóveis alugados e locais com atividade profissional podem ter critérios de aceitação diferentes. O nome do bairro não permite concluir o preço ou os riscos de um imóvel.

Separe a proteção da edificação da proteção do conteúdo. Informe móveis, eletrônicos e outros bens, observando limites por item. Joias, obras de arte e equipamentos profissionais podem exigir declaração e contratação específicas, ou não ser aceitos no produto escolhido.

Danos elétricos, roubo ou furto, vendaval, responsabilidade civil familiar e assistências precisam ser conferidos na proposta. Alagamento e inundação não devem ser presumidos incluídos na cobertura de vendaval. Confira eventos, limites, franquias, exclusões e exigências de segurança.

O seguro do condomínio e o residencial individual têm objetos distintos, que podem se complementar. Analise as duas apólices para identificar o que já está protegido e o que ainda precisa ser contratado. A Patro orienta essa comparação e a leitura das propostas disponíveis. A vigência depende das condições confirmadas na contratação, não do envio do formulário.`}
      icon="🏠"
      metaDescription="Seguro residencial em Guarulhos para casas e apartamentos. Compare coberturas, franquias e assistências. Peça cotação personalizada à Patro Seguros."
      coverages={[
        { title: "Incêndio, Raio e Explosão", description: "Confira os eventos previstos, os valores destinados à edificação e ao conteúdo e as despesas adicionais amparadas pelo contrato." },
        { title: "Roubo e Furto", description: "Quando contratada, a cobertura segue as definições dos eventos, os bens aceitos, os limites e as exigências de segurança. Furto simples pode estar excluído." },
        { title: "Danos Elétricos", description: "Pode ser contratada para determinados danos em equipamentos. Confira causas cobertas, franquias e exclusões; não abrange automaticamente qualquer defeito." },
        { title: "Vendaval e Outros Eventos Naturais", description: "Verifique os eventos expressamente contratados. Granizo, alagamento e inundação têm regras próprias e não devem ser presumidos incluídos." },
        { title: "Responsabilidade Civil Familiar", description: "Depende de contratação e dos danos e pessoas abrangidos. Confira limites, exclusões e se há previsão para eventos envolvendo animais." },
        { title: "Assistência Residencial", description: "Chaveiro, encanador e eletricista podem estar disponíveis no plano contratado. Confira horários, região, limites por serviço, utilizações e custos não incluídos." },
      ]}
      howItWorks={[
        { step: "1", title: "Informe os dados do imóvel", description: "Envie tipo de imóvel, endereço, ocupação, valores da edificação e dos bens e coberturas desejadas." },
        { step: "2", title: "Compare as propostas", description: "A Patro consulta as opções disponíveis para o perfil informado e orienta a leitura das condições." },
        { step: "3", title: "Confira custos e limites", description: "Avalie preço total, franquias, limites por cobertura e assistências. Consulte a previsão de retorno no atendimento." },
        { step: "4", title: "Confirme a contratação", description: "Confira a aceitação, eventuais exigências, a apólice e a data de início da vigência. A cotação não ativa a proteção." },
      ]}
      pricingInfo={{
        intro: "O valor do seguro residencial depende das características e da ocupação do imóvel, dos bens declarados e das coberturas escolhidas. Solicite uma proposta atualizada para sua casa ou apartamento, com limites e franquias definidos.",
        factors: ["Tipo, construção, conservação e ocupação do imóvel", "Endereço e informações solicitadas pela seguradora", "Valores da edificação e dos bens a proteger", "Sistemas de segurança informados na proposta", "Eventos cobertos, limites e franquias", "Uso residencial, profissional, habitual ou de temporada"],
        note: "Portaria, câmeras ou contratação junto com outro seguro não garantem desconto. Compare propostas com os mesmos bens e limites antes de decidir.",
      }}
      realScenarios={[]}
      coverageExclusions={[
        "Confira as exclusões e os riscos não contratados nas condições da apólice.",
        "Desgaste, falta de manutenção e vícios de construção podem estar excluídos.",
        "Imóveis desocupados, em reforma ou com alteração de uso precisam ser informados à seguradora.",
        "Bens especiais e equipamentos profissionais podem ter restrições ou exigir contratação própria.",
      ]}
      tips={[
        "Mantenha um inventário com fotos e comprovantes dos bens; ele auxilia a documentação, sem garantir indenização.",
        "Informe reformas, novos bens e alterações de uso para avaliar ajustes na apólice.",
        "Antes de solicitar assistência, confira os serviços, limites e despesas que ficam por sua conta.",
        "Leia a apólice do condomínio junto com a residencial para identificar eventuais lacunas.",
        "Compare os limites de cada cobertura, não apenas a parcela do seguro.",
      ]}
      whoNeeds={[
        "Moradores de casas e apartamentos em Guarulhos e região",
        "Proprietários que desejam avaliar a proteção da edificação e do conteúdo",
        "Inquilinos que precisam proteger seus bens e verificar obrigações da locação",
        "Famílias que desejam avaliar assistência residencial",
        "Proprietários de imóveis alugados, conforme o produto e a ocupação",
      ]}
      whyPatro={[
        "Atendimento pelos contatos oficiais e na sede em Guarulhos",
        "Orientação para comparar coberturas, franquias e limites",
        "Análise das opções disponíveis para o perfil do imóvel",
        "Apoio na comunicação de sinistros e na documentação solicitada",
      ]}
      faqs={[
        { question: "Quanto custa seguro residencial em Guarulhos?", answer: "O preço é calculado conforme o imóvel, a ocupação, os bens e as coberturas. Não há valor mínimo ou desconto válido para todas as casas e apartamentos. Solicite uma proposta atualizada com preço total, limites e franquias." },
        { question: "Seguro residencial cobre danos elétricos?", answer: "Pode haver cobertura específica, quando contratada. Confira causas cobertas, equipamentos aceitos, franquias e exclusões. Desgaste ou defeito de manutenção não devem ser confundidos com um evento coberto." },
        { question: "Preciso de seguro residencial se moro em condomínio?", answer: "Compare a apólice do condomínio com suas necessidades individuais. O seguro condominial não se limita necessariamente às áreas comuns, mas não substitui automaticamente a proteção de seus bens e da responsabilidade civil familiar." },
        { question: "O seguro cobre furto se eu deixar a porta aberta?", answer: "Não presuma cobertura. As definições de roubo e furto e as exigências de segurança variam conforme a apólice. Furto simples e eventos sem os vestígios exigidos podem estar excluídos. Consulte as condições do produto." },
        { question: "Seguro residencial cobre home office?", answer: "Informe a atividade e os equipamentos profissionais na cotação. A aceitação e os limites dependem do produto. Responsabilidade civil profissional não deve ser presumida incluída na responsabilidade civil familiar." },
        { question: "Vendaval inclui alagamento?", answer: "Não presuma que um evento inclua o outro. Confira as definições de vendaval, alagamento e inundação, sua contratação expressa e as exclusões da proposta." },
      ]}
      relatedInsurances={[
        { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
        { title: "Seguro Condomínio Guarulhos", link: "/seguro-condominio-guarulhos" },
        { title: "Seguro Vida e Saúde Guarulhos", link: "/seguro-vida-saude-guarulhos" },
        { title: "Seguros PME Guarulhos", link: "/seguros-empresariais-pme-guarulhos" },
        { title: "Seguro Frota Guarulhos", link: "/seguro-frota-empresas-guarulhos" },
        { title: "Corretora Seguros Guarulhos", link: "/" },
      ]}
    />
  </>
);

export default SeoSeguroResidencialGuarulhos;
