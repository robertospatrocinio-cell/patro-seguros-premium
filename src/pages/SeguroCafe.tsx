import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rural.webp";

const SeguroCafe = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Café — Proteção para sua Lavoura Cafeeira"
      subtitle="Proteja sua produção de café contra geada, seca, granizo e outros riscos. Atendemos cafeicultores de todos os estados do Brasil."
      description="O Seguro Café da Patro Seguros é a proteção ideal para cafeicultores. Cobrimos perdas na lavoura causadas por fenômenos climáticos adversos como geada, seca prolongada, granizo e excesso de chuva. Com subsídio do governo federal e análise especializada, garantimos as melhores condições para proteger sua safra. Atendemos cafeicultores de Minas Gerais, São Paulo, Espírito Santo, Bahia, Paraná, Rondônia e todos os demais estados produtores. Todo o atendimento é feito de forma remota, com a mesma qualidade e agilidade."
      icon="☕"
      metaDescription="Seguro Café em todo o Brasil — proteção da lavoura cafeeira contra geada, seca, granizo e excesso de chuva. Subsídio federal disponível. Cotação grátis Patro Seguros."
      badge="Atendimento em Todo o Brasil"
      coverages={[
        { title: "Geada", description: "Proteção contra perdas causadas por geada na lavoura de café." },
        { title: "Seca e Estiagem", description: "Cobertura para perdas por seca prolongada e déficit hídrico." },
        { title: "Granizo", description: "Proteção contra danos causados por chuva de granizo." },
        { title: "Excesso de Chuva", description: "Cobertura para perdas por excesso de precipitação." },
        { title: "Incêndio e Raio", description: "Proteção contra incêndio e raio na lavoura." },
        { title: "Ventos Fortes", description: "Cobertura contra danos causados por vendaval e tromba d'água." },
      ]}
      whoNeeds={[
        "Cafeicultores de arábica e conilon em qualquer estado",
        "Produtores de café especial em todo o Brasil",
        "Cooperativas de café de MG, SP, ES, BA, PR e demais estados",
        "Empresas de produção cafeeira em todas as regiões",
      ]}
      whyPatro={[
        "Atendemos cafeicultores de todos os estados do Brasil",
        "Conhecimento das especificidades da cafeicultura regional",
        "Acesso a seguros com subsídio do governo federal",
        "Análise de riscos climáticos por região produtora",
        "Cotação 100% remota — por WhatsApp, telefone ou e-mail",
        "Suporte completo na regulação de sinistros agrícolas",
      ]}
      faqs={[
        { question: "A Patro Seguros atende cafeicultores fora de São Paulo?", answer: "Sim! Atendemos cafeicultores de todos os estados produtores — Minas Gerais, Espírito Santo, Bahia, Paraná, Rondônia, São Paulo e todos os demais. O atendimento é 100% remoto." },
        { question: "O seguro café cobre geada?", answer: "Sim, a geada é uma das principais coberturas do seguro café, protegendo contra perdas na lavoura." },
        { question: "Tem subsídio do governo?", answer: "Sim, o governo federal oferece subsídio de até 40% no prêmio do seguro agrícola para café." },
        { question: "Quanto custa o seguro café?", answer: "O valor varia conforme a área plantada, região, variedade e coberturas escolhidas. Solicite uma cotação gratuita." },
      ]}
      relatedInsurances={[
        { title: "Seguro Pecuário", link: "/seguro-pecuario" },
        { title: "Seguro Armazenagem", link: "/seguro-armazenagem" },
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
      ]}
    />
  );
};

export default SeguroCafe;