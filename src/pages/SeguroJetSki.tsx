import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroJetSki = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Jet Ski"
      subtitle="Proteção completa para seu jet ski e embarcações pessoais"
      icon="🚤"
      description="O Seguro Jet Ski oferece cobertura abrangente para proteger sua embarcação contra danos, roubo, furto e responsabilidade civil. Navegue com tranquilidade sabendo que seu investimento está protegido."
      coverages={[
        { title: "Colisão e Abalroamento", description: "Cobertura contra danos causados por colisão com outras embarcações ou objetos." },
        { title: "Roubo e Furto", description: "Proteção financeira em caso de roubo ou furto total do jet ski." },
        { title: "Incêndio e Explosão", description: "Cobertura contra danos por incêndio, explosão e queda de raio." },
        { title: "Danos a Terceiros", description: "Responsabilidade civil por danos materiais e corporais a terceiros." },
        { title: "Naufrágio e Afundamento", description: "Proteção em caso de naufrágio, afundamento ou encalhe." },
        { title: "Transporte Terrestre", description: "Cobertura durante o transporte do jet ski em reboque ou carreta." },
        { title: "Assistência Náutica", description: "Reboque náutico, socorro mecânico e assistência 24h na água." },
        { title: "Acessórios e Equipamentos", description: "Proteção para acessórios, equipamentos e itens instalados no jet ski." },
      ]}
      whoNeeds={[
        "Proprietários de jet ski",
        "Praticantes de esportes aquáticos",
        "Locadoras de embarcações",
        "Clubes náuticos e marinas",
        "Entusiastas de atividades aquáticas",
      ]}
      whyPatro={[
        "Especialistas em seguros náuticos",
        "Coberturas personalizadas para cada tipo de embarcação",
        "Assistência náutica 24h incluída",
        "Parceria com as melhores seguradoras do mercado",
        "Atendimento rápido em caso de sinistro",
      ]}
      faqs={[
        { question: "O seguro cobre o jet ski durante o transporte?", answer: "Sim, a cobertura inclui o transporte terrestre do jet ski em reboque ou carreta, protegendo contra danos durante o trajeto." },
        { question: "Preciso ter habilitação náutica para contratar o seguro?", answer: "Sim, é necessário possuir a Habilitação Náutica (Arrais Amador ou superior) válida para a contratação do seguro." },
        { question: "O seguro cobre danos em água doce e salgada?", answer: "Sim, a cobertura é válida tanto para navegação em água doce (rios, lagos, represas) quanto em água salgada (mar)." },
        { question: "Existe franquia no seguro de jet ski?", answer: "Sim, assim como no seguro auto, o seguro de jet ski possui franquia que varia conforme o plano contratado." },
      ]}
      relatedInsurances={[
        { title: "Seguro Embarcações", link: "/seguro-embarcacoes" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
      ]}
    />
  );
};

export default SeguroJetSki;
