import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-agro-maquinas.webp";

const SeguroColheitadeiraGraos = () => (
  <InsurancePageTemplate
    localSeo={{ skip: true }}
    semGuarulhos
    heroImage={heroImg}
    title="Seguro de Colheitadeira de Grãos | Patro Seguros"
    headline="Seguro de colheitadeira de grãos para cada frente de trabalho"
    subtitle="Soja, milho, trigo e outras culturas. Analise a máquina, a plataforma, os deslocamentos e as exigências do financiamento."
    icon="🚜"
    badge="Atendimento nacional ao produtor e à concessionária"
    metaDescription="Seguro de colheitadeira de grãos: confira plataforma, transporte, coberturas e penhor rural. Atendimento nacional para produtores e prestadores de serviços."
    description="A Patro compara as condições disponíveis para colheitadeiras próprias ou financiadas. Nossa análise considera o equipamento, a operação e as exigências do credor, com apoio da rede de concessionárias parceiras."
    detailedDescription={`Durante a colheita, uma máquina pode passar por várias propriedades e estados. Informe as culturas, os municípios de atuação, o transporte e a prestação de serviços. A abrangência deve corresponder à operação aceita na apólice.

Plataformas de corte, monitores de produtividade, sensores e GPS precisam ser identificados e valorados. Não presuma que todos os acessórios estejam incluídos no valor da colheitadeira, sobretudo quando há troca de plataformas entre máquinas.

Incêndio, tombamento e colisão devem constar nas condições contratadas. Falha mecânica, desgaste e paralisação da safra não têm cobertura automática. O seguro também não garante uma máquina substituta ou a retomada imediata da colheita.

Para bens vinculados ao crédito rural, avaliamos o seguro penhor rural e as cláusulas exigidas pelo credor. Envie o contrato de financiamento, a nota fiscal e a relação de acessórios antes da comparação das propostas.`}
    howItWorks={[
      { step: "1", title: "Máquina e plataforma", description: "Envie modelo, série, ano, valor e documentos da colheitadeira e de seus acessórios." },
      { step: "2", title: "Frentes de colheita", description: "Informe culturas, municípios, prestação de serviços e transporte entre propriedades." },
      { step: "3", title: "Condições e crédito", description: "Compare coberturas, franquias e requisitos do financiamento, quando houver." },
      { step: "4", title: "Conferência final", description: "Após a aceitação, confira os bens descritos e a data de início da vigência." },
    ]}
    coverages={[
      { title: "Incêndio, raio e explosão", description: "Verifique os eventos cobertos, as exigências de segurança e a franquia aplicável." },
      { title: "Roubo e furto qualificado", description: "Confira as condições de guarda e os eventos aceitos na contratação." },
      { title: "Tombamento e colisão", description: "Danos acidentais podem ser contratados conforme o uso declarado e as condições do produto." },
      { title: "Eletrônica embarcada", description: "Monitores, sensores e GPS precisam ser declarados; danos elétricos podem exigir cobertura específica." },
      { title: "Transporte em prancha", description: "Avalie transporte, carga e descarga separadamente da operação na lavoura." },
      { title: "Responsabilidade civil", description: "Danos a terceiros exigem análise de atividade, limites e condições próprios." },
    ]}
    coverageExclusions={[
      "Desgaste de correias, navalhas e componentes de atrito não é automaticamente coberto.",
      "Quebra mecânica e defeitos de fabricação não equivalem a acidente coberto.",
      "Perda de safra, paralisação e aluguel de equipamento substituto não estão automaticamente incluídos.",
      "Acessórios, locais e atividades não declarados precisam ser avaliados conforme a apólice.",
    ]}
    pricingInfo={{ intro: "O custo depende da máquina, dos acessórios e da operação.", factors: ["Modelo, ano e valor do conjunto", "Culturas e frentes de colheita", "Transporte e prestação de serviços", "Histórico de sinistros e manutenção", "Limites, franquias e cláusulas do credor"], note: "Frotas e cooperativas são analisadas caso a caso, sem garantia de desconto ou franquia reduzida." }}
    importantDetails={[
      { title: "Colheita em diferentes regiões", content: "Atendemos produtores de Mato Grosso, Goiás, Mato Grosso do Sul, Paraná, Rio Grande do Sul e demais estados, incluindo o MATOPIBA. Declare os locais de trabalho e os deslocamentos sazonais; atendimento nacional não significa cobertura automática de qualquer rota." },
      { title: "Plataformas e tecnologia", content: "Descreva separadamente plataformas intercambiáveis e acessórios de alto valor. Confira em quais situações há cobertura quando o item está acoplado, armazenado ou sendo transportado." },
      { title: "Penhor rural e financiamento", content: "A identificação do bem e as cláusulas do credor devem corresponder ao contrato de crédito. A Patro organiza essa conferência com o produtor e a concessionária, sem prometer liberação bancária ou emissão em prazo fixo." },
    ]}
    tips={["Siga o plano de limpeza e manutenção do fabricante", "Guarde notas fiscais e registros dos acessórios", "Comunique mudanças nas frentes de trabalho", "Em sinistro, priorize a segurança, evite agravar os danos e avise a seguradora"]}
    whoNeeds={["Produtores de grãos com máquinas próprias ou financiadas", "Prestadores de serviços de colheita", "Cooperativas com frota compartilhada", "Concessionárias que apoiam a contratação do comprador"]}
    whyPatro={["Especialização em máquinas agrícolas e penhor rural", "Parceria com a rede de concessionárias dos principais fabricantes", "Conferência da máquina, das plataformas e do financiamento", "Atendimento nacional e orientação documental em sinistros"]}
    faqs={[
      { question: "Colheitadeira usada pode ser segurada?", answer: "Pode ser submetida à análise. Modelo, idade, conservação, manutenção e disponibilidade de peças influenciam a aceitação. Não há um limite de idade único para todas as seguradoras." },
      { question: "A plataforma de corte está incluída?", answer: "Não automaticamente. Informe modelo, série, valor e uso e confira a descrição na proposta. Troca de plataformas entre máquinas e armazenamento separado precisam ser declarados." },
      { question: "Quebra mecânica está coberta?", answer: "Não presuma essa cobertura. Falhas internas, desgaste e defeitos podem estar excluídos; eventual cobertura específica depende do produto disponível e da aceitação." },
      { question: "Posso acompanhar safras em outros estados?", answer: "Informe as regiões, as rotas e a prestação de serviços. Confira a abrangência aceita e as condições de transporte, inclusive carga e descarga." },
      { question: "Como funciona para colheitadeira financiada?", answer: "Envie o contrato e as exigências do credor para análise de penhor rural ou do seguro aplicável. A apólice deve identificar corretamente o bem, os acessórios e as cláusulas exigidas." },
      { question: "Qual o prazo de indenização?", answer: "Depende da análise do evento, dos documentos e das regras aplicáveis. A Patro acompanha o processo, mas não garante pagamento, valor integral ou conclusão em um número fixo de dias." },
    ]}
    relatedInsurances={[
      { title: "Seguro Penhor Rural", link: "/seguro-penhor-rural" },
      { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
      { title: "Equipamentos e Implementos", link: "/seguro-equipamentos-agricolas" },
      { title: "Colhedora de Cana", link: "/seguro-colhedora-cana" },
      { title: "Colhedora de Algodão", link: "/seguro-colhedora-algodao" },
    ]}
  />
);

export default SeguroColheitadeiraGraos;
