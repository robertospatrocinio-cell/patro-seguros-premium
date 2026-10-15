import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-agro-maquinas.webp";

const SeguroEquipamentosAgricolas = () => (
  <InsurancePageTemplate
    localSeo={{ skip: true }}
    heroImage={heroImg}
    title="Seguro de Equipamentos Agrícolas e Implementos | Patro"
    headline="Seguro de equipamentos agrícolas conforme o uso no campo"
    subtitle="Implementos, irrigação e tecnologia de precisão precisam de uma análise própria. A Patro atende produtores e concessionárias de todo o Brasil."
    description="Identificamos os equipamentos, os acessórios e a rotina de trabalho para comparar as condições disponíveis. Em bens vinculados ao crédito rural, conferimos também as exigências de penhor e do financiamento."
    icon="⚙️"
    metaDescription="Seguro de equipamentos agrícolas, implementos, irrigação e GPS. Confira coberturas, documentos e penhor rural com atendimento nacional da Patro."
    badge="Especialistas em equipamentos agrícolas"
    quoteCtaText="Cotar meus equipamentos"
    detailedDescription={`Plantadeiras, semeadoras, plataformas de colheita e sistemas de irrigação têm características diferentes. O seguro deve identificar cada bem, seu valor e a forma de uso. Não presuma que todo implemento acoplado esteja incluído no seguro do trator.

Equipamentos de agricultura de precisão, como GPS, piloto automático e sensores, precisam ser declarados. Verifique se integram o valor da máquina ou se exigem descrição e limite próprios. O mesmo cuidado vale para acessórios removíveis e equipamentos compartilhados entre propriedades.

Se o equipamento estiver vinculado a financiamento ou garantia de crédito rural, envie o contrato para análise de seguro penhor rural. Devem ser conferidos a identificação do bem, o interesse do credor, a vigência e as cláusulas exigidas.

Drones de pulverização e mapeamento precisam de análise específica de casco e responsabilidade civil aeronáutica. A inclusão de um implemento agrícola não significa que o drone ou a operação aérea estejam segurados.`}
    coverages={[
      { title: "Incêndio, raio e explosão", description: "Eventos a verificar na proposta, conforme o equipamento, os limites e a franquia contratados." },
      { title: "Roubo e furto qualificado", description: "Confira os eventos aceitos e as condições de guarda, especialmente para acessórios removíveis." },
      { title: "Danos acidentais", description: "Colisão, tombamento e outros acidentes dependem do produto contratado e do uso informado." },
      { title: "Danos elétricos", description: "Sistemas de irrigação e componentes eletrônicos podem exigir cobertura específica e limites próprios." },
      { title: "Eventos da natureza", description: "Vendaval, granizo e outros eventos devem ser verificados individualmente; não são uma cobertura universal." },
      { title: "Transporte e deslocamento", description: "Informe deslocamentos, transporte em veículos e carga ou descarga para análise das condições aplicáveis." },
    ]}
    coverageExclusions={[
      "Desgaste, corrosão, manutenção e perda gradual de desempenho não têm cobertura automática.",
      "Defeitos de fabricação e quebra mecânica devem ser diferenciados dos danos acidentais cobertos.",
      "Perda de safra, paralisação e despesas de aluguel não estão automaticamente incluídas.",
      "Acessórios não declarados e atividades fora do uso aceito precisam ser avaliados conforme a apólice.",
    ]}
    howItWorks={[
      { step: "1", title: "Relação dos bens", description: "Liste modelo, ano, número de série, valor e documento de propriedade de cada equipamento." },
      { step: "2", title: "Rotina de uso", description: "Informe se o bem é fixo, móvel ou acoplado, os locais de operação e eventual aluguel ou comodato." },
      { step: "3", title: "Análise do contrato", description: "Envie as exigências do credor quando houver financiamento e compare as propostas disponíveis." },
      { step: "4", title: "Conferência da apólice", description: "Verifique os bens descritos, coberturas, franquias e início de vigência após a aceitação da seguradora." },
    ]}
    importantDetails={[
      { title: "Implementos acoplados e armazenados", content: "Confirme se a cobertura contempla o equipamento em operação, desacoplado e armazenado. Plataformas e plantadeiras podem exigir identificação separada mesmo quando adquiridas junto com a máquina." },
      { title: "Atendimento às regiões agrícolas", content: "Atendemos operações de grãos no Centro-Oeste e no Sul, café e cana no Sudeste e produção no MATOPIBA: Maranhão, Tocantins, Piauí e Bahia. Informe município, cultura, deslocamentos e sazonalidade; o estado sozinho não define o risco nem o preço." },
      { title: "Apoio da concessionária", content: "Nossa parceria com a rede de concessionárias dos principais fabricantes ajuda na organização da ficha técnica e dos documentos. A aceitação do seguro e o atendimento às exigências do crédito dependem da análise de cada contratação." },
    ]}
    pricingInfo={{
      intro: "O valor do seguro depende do conjunto de equipamentos e das condições de uso.",
      factors: ["Tipo, idade e valor de cada bem", "Equipamentos fixos, móveis ou acoplados", "Local de guarda e municípios de operação", "Coberturas, franquias e transporte", "Histórico de sinistros e vínculo com crédito rural"],
      note: "Uma proposta precisa identificar os bens. A menor parcela não significa a mesma proteção.",
    }}
    whoNeeds={[
      "Produtores com implementos e equipamentos de irrigação",
      "Empresas de agricultura de precisão",
      "Cooperativas com equipamentos compartilhados",
      "Prestadores de serviços e proprietários de bens financiados",
    ]}
    whyPatro={[
      "Especialização em máquinas, equipamentos agrícolas e penhor rural",
      "Parceria com a rede de concessionárias dos principais fabricantes",
      "Atendimento nacional por canais digitais",
      "Conferência dos acessórios, dos limites e das exigências do credor",
      "Orientação na contratação e no encaminhamento de sinistros",
    ]}
    faqs={[
      { question: "O implemento está incluído no seguro do trator?", answer: "Não necessariamente. Confira se o implemento está identificado, se seu valor integra a importância segurada e em quais situações há cobertura. Equipamentos acoplados, desacoplados e armazenados podem ter condições diferentes." },
      { question: "GPS e piloto automático podem ser segurados?", answer: "Podem ser submetidos à análise. Declare modelo, valor, instalação e uso. Verifique se a cobertura está na apólice da máquina ou se exige contratação específica, especialmente para acessórios removíveis." },
      { question: "Posso incluir um drone agrícola?", answer: "O drone precisa de análise específica. Seguro de equipamentos terrestres não garante casco aeronáutico, RETA ou danos decorrentes da pulverização. A Patro orienta a cotação de cada risco separadamente." },
      { question: "Equipamentos alugados ou em comodato podem ser analisados?", answer: "Sim, mediante informação do proprietário, do contrato e da responsabilidade de cada parte. A aceitação e as condições dependem da seguradora; o aluguel não está automaticamente contemplado." },
      { question: "Quando o equipamento precisa de seguro penhor rural?", answer: "Quando está vinculado a uma operação de crédito rural, confira o contrato e as exigências do credor. A Patro analisa o enquadramento e as cláusulas necessárias; uma apólice comum pode não atender ao financiamento." },
      { question: "Quais documentos ajudam na cotação?", answer: "Relação dos bens com marca, modelo, ano, série e valor, nota fiscal ou comprovante de propriedade, locais e forma de uso. Para bens financiados, envie o contrato e os requisitos do credor. Fotos ou vistoria podem ser solicitadas." },
      { question: "Como funciona o atendimento fora de São Paulo?", answer: "Atendemos todo o Brasil por WhatsApp, telefone e e-mail. A sede é em Guarulhos/SP. Vistorias e procedimentos de sinistro podem exigir presença no local, conforme a seguradora; o prazo de proposta depende da documentação e da análise." },
    ]}
    relatedInsurances={[
      { title: "Seguro Penhor Rural", link: "/seguro-penhor-rural" },
      { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
      { title: "Drone Agrícola", link: "/seguro-drone-agricola" },
      { title: "Seguros para o Agronegócio", link: "/seguro-agro" },
    ]}
  />
);

export default SeguroEquipamentosAgricolas;
