import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import PrerenderText from "@/components/PrerenderText";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeguroVistoriadoraVeicular = () => (
  <>
    <PrerenderText slug={"seguro-vistoriadora-veicular" as any} />
    <InsurancePageTemplate
      heroImage={heroImg}
      icon="🔍"
      title="Seguro para Vistoriadora Veicular | ECV e Laudo Cautelar | Patro"
      subtitle="A Patro Seguros ajuda empresas de vistoria veicular, ECVs, laudo cautelar e inspeção automotiva a protegerem operação, equipamentos, responsabilidade civil e riscos profissionais."
      description="Seguro consultivo para vistoriadoras veiculares, ECVs e empresas de laudo cautelar em Guarulhos, São Paulo e todo o Brasil — cotação sob análise e aceitação das seguradoras parceiras."
      metaDescription="Seguro para vistoriadoras veiculares, ECVs, laudo cautelar e perícia automotiva. Proteja empresa, equipamentos e responsabilidade civil com a Patro."
      detailedDescription={
        "Seguro para vistoriadora veicular é uma solução voltada para empresas que atuam com vistoria, inspeção, laudo cautelar, vistoria de transferência, perícia automotiva e serviços técnicos ligados a veículos. A proteção pode envolver seguro empresarial, responsabilidade civil, equipamentos, danos a terceiros, riscos operacionais, cyber/LGPD e outras coberturas conforme a atividade e apólice contratada.\n\nA Patro Seguros atua de forma consultiva, comparando alternativas entre as seguradoras parceiras e orientando cada empresa conforme o seu perfil de risco. As coberturas descritas são exemplificativas e podem variar conforme apólice, aceitação da seguradora, contratos e análise técnica de cada operação.\n\nEmpresas Credenciadas de Vistoria (ECVs), laudo cautelar, vistoria de transferência e perícia automotiva lidam com informações relevantes para compra, venda, regularização e avaliação de veículos. As exigências regulatórias e contratuais devem ser verificadas junto aos órgãos competentes, contratos e entidades responsáveis. A Patro pode ajudar na análise securitária, mas não substitui orientação jurídica ou regulatória."
      }
      coverages={[
        { title: "Seguro empresarial / patrimonial", description: "Incêndio, raio e explosão, danos elétricos, roubo e furto qualificado, equipamentos eletrônicos, móveis e conteúdo, quebra de vidros e assistência 24h, conforme apólice." },
        { title: "Responsabilidade Civil Operações", description: "Danos materiais ou corporais causados a terceiros durante a operação da vistoriadora, conforme apólice e limites contratados." },
        { title: "Responsabilidade Civil Profissional / E&O", description: "Reclamações por erro, falha, omissão ou prejuízo decorrente da atividade técnica, sujeito à análise e aceitação da seguradora e ao produto disponível." },
        { title: "Seguro Cyber / LGPD", description: "Proteção relacionada a dados de clientes, documentos, sistemas, incidentes digitais e vazamentos, conforme apólice." },
        { title: "Equipamentos de vistoria", description: "Computadores, câmeras, scanners, tablets, impressoras, servidores e dispositivos portáteis, conforme modalidade contratada." },
        { title: "Lucros cessantes / interrupção", description: "Apoio financeiro em caso de paralisação decorrente de evento coberto, quando disponível na apólice." },
      ]}
      whoNeeds={[
        "Empresas Credenciadas de Vistoria (ECVs)",
        "Vistoriadoras veiculares",
        "Empresas de laudo cautelar",
        "Empresas de vistoria de transferência",
        "Perícia automotiva",
        "Inspeção automotiva",
        "Empresas que avaliam veículos usados",
        "Empresas parceiras de lojistas e concessionárias",
        "Empresas que prestam serviço para despachantes",
        "Empresas que atendem seguradoras, frotistas ou financeiras",
        "Unidades em salas comerciais, lojas ou galpões pequenos",
      ]}
      whyPatro={[
        "Atendimento consultivo especializado em empresas automotivas",
        "Comparação entre seguradoras parceiras (RC, E&O, cyber e equipamentos)",
        "Análise de riscos específicos da atividade de vistoria",
        "Suporte humano por WhatsApp e sede em Guarulhos",
        "Atendimento para empresas locais e nacionais, sujeito à aceitação da seguradora",
      ]}
      faqs={[
        { question: "Vistoriadora veicular precisa de seguro?", answer: "Não existe uma única resposta: as exigências regulatórias e contratuais variam por atividade, contrato e órgão competente. Do ponto de vista securitário, empresas de vistoria costumam avaliar seguro empresarial, responsabilidade civil, E&O, cyber e equipamentos para proteger operação e caixa." },
        { question: "Qual seguro uma ECV deve contratar?", answer: "Normalmente é analisada uma combinação de seguro empresarial (patrimônio), responsabilidade civil, E&O (erros e omissões) e cyber, conforme apólice, contratos e análise de risco. A Patro orienta sobre a estrutura, mas não substitui assessoria jurídica ou regulatória." },
        { question: "Seguro cobre erro em laudo cautelar?", answer: "Reclamações por erro, falha ou omissão em laudos podem ser analisadas em produtos de RC Profissional / E&O, sujeitas à aceitação da seguradora e às condições da apólice. Não há garantia automática de cobertura." },
        { question: "Seguro cobre danos a veículo de cliente?", answer: "Danos a veículos de terceiros durante a operação podem ser avaliados em coberturas de responsabilidade civil ou guarda de veículos, conforme apólice e limites contratados." },
        { question: "Seguro cobre equipamentos de vistoria?", answer: "Sim, é possível contratar cobertura para computadores, câmeras, scanners, tablets, impressoras, servidores e dispositivos portáteis, conforme modalidade (equipamentos eletrônicos, portáteis, etc.)." },
        { question: "Seguro cyber faz sentido para vistoriadora?", answer: "Empresas que lidam com documentos, fotos, laudos e dados de clientes podem ter exposição a incidentes digitais e LGPD. A cobertura cyber apoia resposta a incidentes, notificações e responsabilidades relacionadas, conforme apólice." },
        { question: "O seguro substitui exigências legais de credenciamento?", answer: "Não. As exigências regulatórias e contratuais devem ser confirmadas junto aos órgãos competentes, contratos e entidades responsáveis. A Patro orienta sobre seguros, mas não substitui assessoria jurídica ou regulatória." },
        { question: "Quanto custa seguro para vistoriadora veicular?", answer: "O preço depende de atividade detalhada, faturamento, estrutura, equipamentos, contratos e histórico. A cotação é feita sob análise e aceitação das seguradoras parceiras — a Patro compara alternativas para cada perfil." },
        { question: "A Patro atende vistoriadoras em Guarulhos?", answer: "Sim. Atendemos empresas em Guarulhos, Cumbica, Centro, Cidade Maia, Vila Galvão, Pimentas, Bonsucesso, Taboão, Ponte Grande, Arujá, Itaquaquecetuba, São Paulo, Zona Leste e região metropolitana, e orientamos empresas de outras regiões conforme disponibilidade das seguradoras." },
        { question: "Posso cotar pelo WhatsApp?", answer: "Sim. Envie CNPJ, endereço, atividade detalhada, faturamento aproximado, equipamentos e principais contratos — a Patro estrutura a análise e retorna com as alternativas disponíveis." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Responsabilidade Civil Profissional (E&O)", link: "/seguro-rc-profissional" },
        { title: "Seguro Cyber / LGPD", link: "/seguro-cyber" },
        { title: "Seguro Empresas de Vistoria Veicular (Guarulhos)", link: "/seguro-vistoria-veicular-guarulhos" },
        { title: "Seguro para Despachantes e Vistorias", link: "/seguro-despachantes-e-vistorias" },
      ]}
    />
  </>
);

export default SeguroVistoriadoraVeicular;