import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-agro-maquinas.webp";

const SeguroMaquinasAgricolas = () => (
  <InsurancePageTemplate
    localSeo={{ skip: true }}
    heroImage={heroImg}
    title="Seguro de Máquinas Agrícolas e Financiadas | Patro"
    headline="Seguro para máquinas agrícolas, do financiamento à operação"
    subtitle="Tratores, colheitadeiras e pulverizadores com análise do uso, dos deslocamentos e das exigências do financiamento. Atendimento nacional ao produtor e à concessionária."
    description="A Patro é especialista em máquinas e equipamentos agrícolas e mantém parceria com a rede de concessionárias dos principais fabricantes. Comparamos as condições disponíveis e conferimos a identificação do bem, as franquias e as exigências do credor antes da contratação."
    icon="🚜"
    metaDescription="Seguro de máquinas agrícolas: tratores, colheitadeiras e pulverizadores. Análise de penhor rural e financiamento com atendimento nacional da Patro."
    badge="Especialistas em máquinas agrícolas • Atendimento nacional"
    quoteCtaText="Cotar minha máquina agrícola"
    detailedDescription={`O seguro de máquinas agrícolas deve acompanhar a rotina do equipamento. Uma colheitadeira que trabalha em várias fazendas exige uma análise diferente da de um trator usado apenas na propriedade. Informe culturas, municípios de operação, deslocamentos e eventual prestação de serviços.

Para máquinas financiadas ou dadas em garantia de crédito rural, avaliamos o seguro penhor rural e as exigências do contrato. É preciso conferir o bem vinculado, o interesse do credor, a vigência e as cláusulas exigidas. Uma apólice de equipamentos sem essa conferência pode não atender ao financiamento.

A parceria com concessionárias facilita a organização de nota fiscal, ficha técnica e dados do financiamento. Ela não representa aprovação automática da seguradora nem exclusividade com uma marca. A aceitação depende do equipamento e da operação informados.

Incêndio, roubo, tombamento e outros riscos devem constar expressamente na proposta e na apólice. Quebra mecânica, transporte, danos elétricos e responsabilidade civil não devem ser presumidos como parte de toda contratação.`}
    coverages={[
      { title: "Incêndio, raio e explosão", description: "Eventos a verificar na cobertura contratada, com limites, franquias e condições definidos na apólice." },
      { title: "Roubo e furto qualificado", description: "Verifique os eventos aceitos e as exigências de guarda. Furto simples e desaparecimento não devem ser considerados incluídos." },
      { title: "Colisão e tombamento", description: "Danos acidentais durante a operação podem ser contratados conforme o produto e o uso declarado." },
      { title: "Danos elétricos", description: "Analise a contratação específica para componentes elétricos e eletrônicos, incluindo limites e exclusões." },
      { title: "Transporte entre propriedades", description: "Deslocamento por meios próprios, prancha e carga ou descarga precisam ser avaliados separadamente." },
      { title: "Responsabilidade civil", description: "Danos a terceiros exigem análise de cobertura própria; não se confundem com os danos à máquina." },
    ]}
    coverageExclusions={[
      "Desgaste, corrosão e manutenção rotineira não equivalem a acidente coberto.",
      "Defeito de fabricação e quebra mecânica não têm cobertura automática.",
      "Lucros cessantes, despesas de locação e perda de safra não estão automaticamente incluídos.",
      "Uso, local ou operador fora das condições aceitas podem afetar a cobertura; consulte a apólice.",
    ]}
    howItWorks={[
      { step: "1", title: "Identificação do bem", description: "Envie marca, modelo, ano, série ou chassi, valor e nota fiscal ou documento de propriedade." },
      { step: "2", title: "Operação e crédito", description: "Informe municípios, culturas, prestação de serviços e contrato de financiamento ou penhor, quando houver." },
      { step: "3", title: "Comparação das propostas", description: "Confira coberturas, exclusões, franquias, transporte e cláusulas do credor nas opções disponíveis." },
      { step: "4", title: "Aceitação e vigência", description: "Após análise da seguradora, confira a apólice e o início da vigência antes de considerar a máquina protegida." },
    ]}
    importantDetails={[
      { title: "Centro-Oeste e MATOPIBA", content: "Para operações em Mato Grosso, Mato Grosso do Sul, Goiás, Maranhão, Tocantins, Piauí e Bahia, informe as rotas entre fazendas e as frentes de colheita. Máquinas que acompanham safras em diferentes estados precisam ter essa mobilidade declarada." },
      { title: "Sul e Sudeste", content: "No Paraná, Rio Grande do Sul, Santa Catarina, Minas Gerais e interior de São Paulo, avaliamos a operação declarada em grãos, café, cana e outras culturas. Relevo, implementos acoplados e circulação entre propriedades ajudam a definir a análise." },
      { title: "Concessionária e produtor na mesma conferência", content: "A Patro organiza as informações com o produtor e a concessionária parceira. Marca, série, acessórios, valor e requisitos do financiamento precisam corresponder aos documentos e à proposta aceita." },
    ]}
    pricingInfo={{
      intro: "O preço depende do bem e da operação. Uma taxa genérica não substitui uma proposta individual.",
      factors: ["Modelo, ano e valor do equipamento", "Municípios e estados de operação", "Uso próprio, locação ou prestação de serviços", "Coberturas, franquias e histórico de sinistros", "Transporte e exigências do credor"],
      note: "Compare limites e exclusões, além do preço. Cotação não significa aceitação nem início de cobertura.",
    }}
    whoNeeds={[
      "Produtores com tratores, colheitadeiras e pulverizadores próprios ou financiados",
      "Prestadores de serviços que operam em diferentes propriedades",
      "Cooperativas e empresas com frota agrícola",
      "Concessionárias que apoiam clientes na compra e no financiamento",
    ]}
    whyPatro={[
      "Especialização em máquinas, equipamentos agrícolas e penhor rural",
      "Parceria com a rede de concessionárias dos principais fabricantes",
      "Atendimento a produtores de todas as regiões do Brasil",
      "Conferência das exigências do credor e das condições da proposta",
      "Orientação documental e acompanhamento do sinistro, conforme os procedimentos da seguradora",
    ]}
    faqs={[
      { question: "Seguro de máquinas agrícolas é igual a seguro penhor rural?", answer: "Não necessariamente. O seguro da máquina considera o equipamento e seus riscos. Quando o bem garante uma operação de crédito rural, o penhor rural deve ser analisado conforme o contrato e as exigências do credor. A Patro confere qual estrutura se aplica ao caso." },
      { question: "O seguro cobre a máquina durante a colheita?", answer: "Pode cobrir eventos contratados durante a operação declarada. Tombamento, colisão e incêndio devem ser conferidos na proposta. Desgaste e quebra mecânica não estão automaticamente incluídos." },
      { question: "Posso operar em mais de um estado?", answer: "Informe todos os estados e municípios de atuação, a prestação de serviços e os deslocamentos. A abrangência depende da aceitação e das condições da apólice, inclusive para transporte por prancha." },
      { question: "Quais marcas podem ser analisadas?", answer: "Podemos solicitar análise para máquinas John Deere, Case IH, New Holland, Valtra, Massey Ferguson, Jacto, Stara e outras marcas. Modelo, idade, conservação e uso influenciam a aceitação. A lista não significa parceria direta ou exclusividade com cada fabricante." },
      { question: "Como cotar uma máquina comprada na concessionária?", answer: "Envie os dados do produtor, nota fiscal ou ficha do bem, série, ano, valor e local de operação. Se houver financiamento, envie também o contrato e as exigências do credor. A seguradora pode solicitar fotos, documentos adicionais ou vistoria." },
      { question: "A Patro atende fora de São Paulo?", answer: "Sim. Nossa sede fica em Guarulhos/SP e atendemos produtores em todo o Brasil por canais digitais. Vistorias e regulação de sinistros seguem os procedimentos da seguradora e podem exigir atendimento presencial no local do bem." },
      { question: "Quanto tempo leva para emitir a apólice?", answer: "O prazo depende da documentação, da análise do risco e de eventual vistoria. A equipe informa o andamento; o envio dos dados ou o pedido de cotação não inicia a cobertura." },
    ]}
    relatedInsurances={[
      { title: "Seguro Penhor Rural", link: "/seguro-penhor-rural" },
      { title: "Trator Agrícola", link: "/seguro-trator-agricola" },
      { title: "Colheitadeira de Grãos", link: "/seguro-colheitadeira-graos" },
      { title: "Colhedora de Cana", link: "/seguro-colhedora-cana" },
      { title: "Colhedora de Algodão", link: "/seguro-colhedora-algodao" },
      { title: "Pulverizador Agrícola", link: "/seguro-pulverizador-agricola" },
      { title: "Equipamentos Agrícolas", link: "/seguro-equipamentos-agricolas" },
      { title: "Drone Agrícola", link: "/seguro-drone-agricola" },
      { title: "Seguros para o Agronegócio", link: "/seguro-agro" },
    ]}
  />
);

export default SeguroMaquinasAgricolas;
