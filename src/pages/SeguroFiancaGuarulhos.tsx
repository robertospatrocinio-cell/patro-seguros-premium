import LocalPageTemplate from "@/components/LocalPageTemplate";
import heroImg from "@/assets/hero-seguro-fianca.webp";

/**
 * Fase 4 — Nicho defensável: seguro fiança locatícia em Guarulhos.
 * Guia prático para inquilino e imobiliária substituírem fiador.
 */
const SeguroFiancaGuarulhos = () => (
  <LocalPageTemplate
    slug="seguro-fianca-guarulhos"
    title="Seguro Fiança Locatícia em Guarulhos"
    subtitle="Substitua o fiador com garantia aceita pelas principais imobiliárias de Guarulhos: análise em 24h, parcelamento no aluguel e cobertura de inadimplência + danos."
    metaDescription="Seguro fiança locatícia em Guarulhos: substitua fiador, análise em 24h e parcelamento. Aceito pelas maiores imobiliárias. Corretora Patro Cidade Maia."
    icon="🏠"
    city="Guarulhos"
    neighborhood="Guarulhos"
    geo={{ latitude: -23.4538, longitude: -46.5333 }}
    heroImage={heroImg}
    description="Alugar sem fiador em Guarulhos é possível — o seguro fiança substitui o fiador tradicional com aprovação em 24h e proteção completa para o proprietário e para você, inquilino."
    detailedDescription={`O seguro fiança locatícia é a garantia mais aceita hoje em Guarulhos porque protege o proprietário contra inadimplência de aluguel, condomínio, IPTU, danos ao imóvel e multas contratuais — tudo em uma única apólice. Para o inquilino, é a saída para quem não tem fiador ou não quer pedir a alguém que se comprometa por 30 meses.

Trabalhamos com Porto, Tokio Marine, Pottencial, Junto Seguros e Confiança. A aprovação passa por análise de crédito (Serasa/SPC), renda declarada e histórico de aluguéis. Em Guarulhos, a maioria das imobiliárias já aceita e algumas exigem seguradoras específicas — nós verificamos a lista aceita pela sua imobiliária antes de emitir a proposta, evitando retrabalho.`}
    pricing={{
      intro: "O custo do seguro fiança em Guarulhos gira entre 12% e 18% do valor total anual do aluguel (aluguel + condomínio + IPTU), parcelado em 12x direto no boleto do aluguel.",
      factors: [
        "Score de crédito do inquilino (Serasa/SPC)",
        "Renda declarada versus valor do aluguel (proporção 3x é padrão)",
        "Tempo de contrato (30 meses é o padrão do mercado)",
        "Valor do aluguel + encargos (condomínio + IPTU)",
        "Imobiliária que administra o imóvel (algumas exigem seguradoras específicas)",
      ],
      note: "Score acima de 700 e renda 3x o aluguel garantem aprovação em 24h e custo próximo do piso da faixa (12%).",
      range: { min: 250, max: 720 },
    }}
    faqs={[
      { question: "Quanto custa o seguro fiança em Guarulhos em 2026?", answer: "O prêmio anual fica entre 12% e 18% do valor total anual do aluguel (aluguel + condomínio + IPTU). Para aluguel de R$ 2.500 + condomínio R$ 600 + IPTU R$ 100 (total R$ 3.200/mês, ou R$ 38.400/ano), o seguro custa entre R$ 4.600 e R$ 6.900/ano, parcelado em 12x no boleto do aluguel — algo entre R$ 380 e R$ 575/mês adicionais." },
      { question: "Quais imobiliárias de Guarulhos aceitam seguro fiança?", answer: "Praticamente todas as grandes: Lopes, Coelho da Fonseca, Space Imobiliária, Predial Guarulhos, Impacto, Guarulhos Imóveis e a maioria das administradoras independentes. Algumas exigem seguradora específica (Porto, Pottencial ou Confiança são as mais aceitas). Antes de fechar o contrato, verificamos a lista de seguradoras aceitas pela sua imobiliária." },
      { question: "Quanto tempo demora para aprovar o seguro fiança?", answer: "Aprovação em 24 a 48h úteis para quem tem score acima de 600 e renda compatível (3x o aluguel). Score abaixo de 500 ou pendências ativas em Serasa/SPC podem ser recusadas ou exigir contrafiador. Enviamos análise pré-aprovada em até 4h úteis para dizer se vale ou não seguir com a proposta oficial." },
      { question: "Preciso de fiador para contratar o seguro fiança?", answer: "Não. Esse é justamente o objetivo: substituir o fiador. Basta comprovar renda (holerite, extrato bancário, DECORE para autônomos) e ter score de crédito razoável. Para autônomos e MEI, aceitamos extrato de 3–6 meses e comprovante de faturamento como renda." },
      { question: "O seguro fiança cobre danos ao imóvel na saída?", answer: "Sim — é a principal vantagem frente ao fiador tradicional. Ao final do contrato, a vistoria de saída pode acionar a apólice para reparos (pintura, azulejo quebrado, danos em piso, portas) até o limite contratado. Também cobre aluguéis em atraso, multas contratuais, condomínio, IPTU e água/luz não pagos, tudo em uma única apólice." },
      { question: "Posso renovar o seguro fiança no fim do contrato de aluguel?", answer: "Sim. A renovação é anual e o custo pode até reduzir se o inquilino manteve pagamentos em dia e o score subiu. No 3º ano em diante, alguns proprietários dispensam a garantia — depende da relação. Se mudar de imóvel, a apólice não é transferível: contratamos uma nova para o novo endereço." },
    ]}
    insurers={[
      { name: "Porto Seguro", highlight: "A mais aceita em Guarulhos — aprovação em 24h e integração com imobiliárias" },
      { name: "Pottencial", highlight: "Aceita perfis com score menor mediante análise complementar" },
      { name: "Tokio Marine", highlight: "Boa opção para aluguéis acima de R$ 4.000, com prêmio competitivo" },
      { name: "Confiança Seguros", highlight: "Especialista em fiança locatícia, aceita autônomo e MEI" },
      { name: "Junto Seguros", highlight: "Digital e ágil — proposta e emissão 100% online" },
    ]}
    testimonials={[
      { author: "Rafaela D.", neighborhood: "Vila Augusta", quote: "Não tinha fiador em SP. A Patro fez análise no mesmo dia, aprovou em 22h com a Porto e a imobiliária aceitou sem discussão. Contrato assinado na sexta seguinte.", rating: 5 },
      { author: "Bruno C.", neighborhood: "Centro", quote: "Autônomo, sem holerite. A Sandra me orientou a levar 6 meses de extrato + DECORE e a Pottencial aprovou. Consegui alugar apartamento que eu jurava impossível para meu perfil.", rating: 5 },
    ]}
    realScenarios={[
      { title: "Inquilino sem fiador aprovado em 22 horas", description: "Profissional CLT recém-mudado para Guarulhos, sem parente-fiador na cidade, precisava alugar em 5 dias. Análise Porto aprovada em 22h com renda 3,2x o aluguel e score 780. Seguro custou R$ 5.100/ano parcelados em 12x — mais barato que remunerar um fiador profissional." },
      { title: "Danos de saída cobertos sem judicialização", description: "Ao devolver imóvel após 30 meses, vistoria apontou R$ 6.400 em reparos (pintura + 2 portas + azulejo). Seguro fiança pagou direto à imobiliária, evitando ação judicial e retenção de fiança calção. Inquilino saiu sem prejuízo extra." },
    ]}
    coverages={[
      { title: "Inadimplência de aluguel", description: "Cobre aluguéis em atraso até o limite contratado (normalmente 30x o aluguel mensal)." },
      { title: "Condomínio, IPTU e utilidades", description: "Cobre também condomínio, IPTU, água, luz e gás em atraso." },
      { title: "Danos ao imóvel", description: "Reparos apontados na vistoria de saída dentro do limite contratado." },
      { title: "Multa contratual", description: "Cobre multa por rescisão antecipada quando prevista em contrato." },
      { title: "Honorários advocatícios", description: "Cobre custos jurídicos se houver necessidade de despejo." },
    ]}
    whoNeeds={[
      "Inquilinos sem fiador tradicional em Guarulhos",
      "Quem quer preservar relacionamentos sem pedir fiador a parentes/amigos",
      "Autônomos e MEIs que têm dificuldade em fiador CLT",
      "Recém-mudados para Guarulhos que ainda não têm rede local",
      "Proprietários que querem garantia sólida sem risco de calote",
    ]}
    whyPatro={[
      "Pré-análise gratuita em até 4h — antes de gastar tempo com documentação oficial",
      "Verificação da lista de seguradoras aceitas pela sua imobiliária",
      "5+ seguradoras concorrendo o mesmo caso — melhor preço garantido",
      "Suporte na negociação com imobiliária caso a análise volte com ressalva",
      "Atendimento presencial no Cidade Maia ou 100% via WhatsApp",
    ]}
    tips={[
      "Antes de contratar, envie CPF para pré-análise gratuita de score",
      "Reúna comprovantes de renda dos últimos 3 meses (holerite ou extrato)",
      "Verifique se a imobiliária exige seguradora específica antes de emitir",
      "Compare fiança com título de capitalização e caução em dinheiro — nem sempre a fiança é a mais barata",
    ]}
    relatedInsurances={[
      { title: "Seguro Residencial em Guarulhos", link: "/seguro-residencial-guarulhos" },
      { title: "Seguro Fiança Locatícia (visão nacional)", link: "/seguro-fianca-locaticia" },
      { title: "Título de Capitalização como Garantia", link: "/seguro-fianca" },
      { title: "Hub de Seguros em Guarulhos", link: "/seguros-em-guarulhos" },
    ]}
    whatsappMessage="Olá! Quero pré-análise gratuita de seguro fiança para alugar em Guarulhos."
  />
);

export default SeguroFiancaGuarulhos;