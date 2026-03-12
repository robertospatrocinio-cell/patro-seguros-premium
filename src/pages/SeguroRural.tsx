import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroRural = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Rural"
      subtitle="Proteção completa para o agronegócio em todo o Brasil. Atendemos produtores de todos os estados."
      icon="🚜"
      badge="Atendimento em Todo o Brasil"
      metaDescription="Seguro Rural para lavoura, pecuária e máquinas agrícolas em todo o Brasil. Subsídio do governo federal. Proteção contra seca, granizo e geada. Cotação grátis Patro Seguros."
      description="O Seguro Rural protege produtores contra perdas na lavoura, pecuária, máquinas agrícolas e benfeitorias. Fenômenos climáticos, pragas, doenças e acidentes podem comprometer toda a produção. Com a Patro Seguros, você tem acesso a seguros agrícolas subsidiados pelo governo, pecuário, de máquinas e equipamentos, sempre com análise especializada para o setor do agronegócio. Atendemos produtores rurais de todos os estados do Brasil — de Mato Grosso ao Rio Grande do Sul, de Goiás à Bahia. Não importa onde sua fazenda está localizada, a Patro Seguros leva proteção inteligente até você."
      coverages={[
        { title: "Seguro Agrícola (PROAGRO Mais)", description: "Proteção para lavouras contra fenômenos climáticos adversos" },
        { title: "Seguro Pecuário", description: "Cobertura para morte de animais por doenças e acidentes" },
        { title: "Máquinas e Equipamentos Agrícolas", description: "Proteção para tratores, colheitadeiras e implementos" },
        { title: "Benfeitorias Rurais", description: "Cobertura para galpões, silos, estufas e instalações" },
        { title: "Produtos Agropecuários", description: "Proteção para grãos armazenados e produtos estocados" },
        { title: "Florestas Plantadas", description: "Cobertura para reflorestamento e silvicultura" },
        { title: "Aquicultura", description: "Seguro para criação de peixes e camarões" },
        { title: "Penhor Rural", description: "Garantia para financiamentos e custeios rurais" },
      ]}
      whoNeeds={[
        "Produtores rurais de grãos e culturas em qualquer estado",
        "Pecuaristas e criadores de animais em todo o Brasil",
        "Agricultores familiares de Norte a Sul",
        "Empresas do agronegócio em todas as regiões",
        "Silvicultores e produtores florestais",
        "Aquicultores e piscicultores",
      ]}
      whyPatro={[
        "Atendimento em todos os estados do Brasil — não apenas Guarulhos",
        "Conhecimento do setor rural e suas especificidades regionais",
        "Acesso a seguros com subsídio do governo federal",
        "Orientação sobre documentação e processos do MAPA",
        "Análise de riscos climatológicos por região",
        "Suporte completo em sinistros com vistoria técnica",
        "Parcerias com seguradoras especializadas no agro",
      ]}
      faqs={[
        { question: "A Patro Seguros atende produtores rurais fora de São Paulo?", answer: "Sim! Atendemos produtores rurais de todos os estados do Brasil. Nossa sede é em Guarulhos/SP, mas fazemos cotações e acompanhamos sinistros em qualquer região — Mato Grosso, Goiás, Minas Gerais, Bahia, Paraná, Rio Grande do Sul e todos os demais estados." },
        { question: "O que é o subsídio do governo no seguro rural?", answer: "O governo federal subsidia parte do prêmio do seguro agrícola (até 40% em alguns casos), tornando-o mais acessível aos produtores de todo o país." },
        { question: "Como funciona o seguro agrícola?", answer: "Protege contra perdas na produção por fenômenos como seca, geada, granizo, excesso de chuva, pragas e doenças. A indenização é baseada na produtividade esperada." },
        { question: "Posso segurar animais?", answer: "Sim! O seguro pecuário cobre morte de bovinos, equinos, suínos e outros animais por doenças, acidentes, raios e outros eventos cobertos." },
        { question: "Quanto custa o seguro rural?", answer: "Varia conforme a cultura, localização, histórico da região e nível de cobertura. Com subsídio governamental, fica significativamente mais acessível." },
        { question: "Como faço a cotação se estou longe de Guarulhos?", answer: "Todo o processo é feito de forma remota — por WhatsApp, telefone ou e-mail. Enviamos a documentação digital e acompanhamos tudo à distância com a mesma qualidade." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Máquinas", link: "/seguro-maquinas" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro de Transporte", link: "/seguro-transporte" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroRural;