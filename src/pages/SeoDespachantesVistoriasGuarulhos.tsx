import LocalPageTemplate from "@/components/LocalPageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeoDespachantesVistoriasGuarulhos = () => (
  <LocalPageTemplate
    slug="seguro-despachantes-e-vistorias"
    title="Seguro para Despachantes e Áreas de Vistoria em Guarulhos"
    subtitle="Proteção empresarial e de responsabilidade civil para escritórios de despachante."
    metaDescription="Seguro para despachantes em Guarulhos. Proteja seu escritório contra roubo, incêndio e processos por erros operacionais. Atendimento local. Cote agora."
    icon="👔"
    city="Guarulhos"
    description="Escritórios de despachante lidam com alto fluxo de documentos e responsabilidades perante o Detran e clientes."
    detailedDescription="O dia a dia de um despachante em Guarulhos exige organização e segurança. Falhas no processamento de documentos ou vistorias de transferência podem gerar multas e insatisfação. Além disso, o escritório físico concentra equipamentos valiosos e arquivos sensíveis.\n\nA Patro Seguros oferece o Seguro para Despachantes, com coberturas que vão desde a proteção contra roubo de computadores e aparelhos de fax até a responsabilidade civil profissional para erros em processos administrativos."
    pricing={{
      intro: "Planos acessíveis para escritórios de todos os portes, com foco em proteção documental e patrimonial.",
      factors: [
        "Volume de processos mensais",
        "Número de funcionários",
        "Valor de equipamentos e mobiliário",
        "Sistemas de segurança do local"
      ],
      note: "Parcelamos o seguro anual em até 10x no boleto ou cartão para facilitar o fluxo de caixa."
    }}
    faqs={[
      { question: "O seguro cobre erro de digitação em processo?", answer: "Sim, através da cobertura de Responsabilidade Civil Profissional para erros e omissões." },
      { question: "Mobiliário e computadores estão protegidos?", answer: "Sim, o seguro empresarial cobre incêndio, roubo e furto qualificado de todo o conteúdo do escritório." },
      { question: "Cobre veículos de clientes no pátio?", answer: "Sim, é possível incluir a cobertura de RC Pátio se o despachante realizar vistorias no local." },
      { question: "Qual seguradora é melhor para despachante?", answer: "Porto Seguro e Tokio Marine possuem excelentes produtos focados em prestadores de serviços PME." },
      { question: "Como funciona a assistência 24h?", answer: "Oferecemos chaveiro, encanador e eletricista para emergências no seu escritório em Guarulhos." }
    ]}
    insurers={[
      { name: "Porto Seguro", highlight: "Líder em seguros para serviços" },
      { name: "Tokio Marine", highlight: "Agilidade e ótimas taxas" },
      { name: "Mapfre Seguros", highlight: "Soluções corporativas completas" },
      { name: "HDI Seguros", highlight: "Foco em pequenas empresas" }
    ]}
    testimonials={[
      { author: "Jorge V.", neighborhood: "Macedo", quote: "Protegemos nosso escritório com a Patro há 3 anos. Suporte impecável sempre.", rating: 5 },
      { author: "Mariana L.", neighborhood: "Vila Augusta", quote: "O seguro de RC nos deu a segurança que faltava para crescer sem medo de erros.", rating: 5 }
    ]}
    realScenarios={[
      { title: "Indenização por Multa Detran", description: "Um erro administrativo gerou uma multa ao cliente. O seguro de RC ressarciu o valor e os custos de defesa." },
      { title: "Curto-circuito no Servidor", description: "Um raio danificou a rede do escritório. O seguro pagou a troca dos roteadores e do servidor de arquivos." }
    ]}
    coverages={[
      { title: "RC Profissional", description: "Proteção contra erros de serviço." },
      { title: "Roubo de Equipamentos", description: "Segurança para computadores e scanners." },
      { title: "Danos Elétricos", description: "Proteção da rede de TI." },
      { title: "Interrupção de Atividade", description: "Garante faturamento se o escritório fechar por sinistro." }
    ]}
    whoNeeds={["Despachantes Documentalistas", "Escritórios de Trânsito", "ECVs Parceiras", "Empresas de Regularização"]}
    whyPatro={["Atendimento no Cidade Maia", "Conhecimento do Mercado Local", "Zero Burocracia", "Nota 4.7 no Google"]}
    tips={["Verifique se sua apólice de RC cobre custos de defesa judicial.", "Mantenha o backup digital dos arquivos atualizado.", "Informe à seguradora se o escritório possui pátio para veículos."]}
    relatedInsurances={[
      { title: "Seguro Vistoria Veicular", link: "/seguro-para-empresas-de-vistoria-veicular" },
      { title: "Seguro Empresarial", link: "/seguro-empresarial" }
    ]}
    heroImage={heroImg}
  />
);

export default SeoDespachantesVistoriasGuarulhos;
