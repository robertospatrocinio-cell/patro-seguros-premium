import LandingPageTemplate from "@/components/LandingPageTemplate";
import heroImg from "@/assets/lp-plano-saude.webp";

const LandingPlanoSaude = () => (
  <LandingPageTemplate
    heroImage={heroImg}
    title="Plano de Saúde"
    heroEmoji="🏥"
    headline="Plano de Saúde bom e barato existe. Nós encontramos para você."
    subheadline="Comparamos 20 operadoras — Amil, Bradesco Saúde, SulAmérica, Unimed e mais — para encontrar o plano ideal para seu bolso e sua família."
    metaDescription="Compare Planos de Saúde de 20 operadoras. Amil, Bradesco Saúde, SulAmérica, Unimed. Cotação gratuita em Guarulhos. Patro Seguros."
    ctaText="Comparar Planos de Saúde Grátis"
    ctaUrl="https://www.patroseguros.com"
    urgencyText="Reajustes anuais em breve — garanta o melhor preço agora"
    priceAnchor="Planos a partir de R$ 189/mês* por pessoa"
    guaranteeText="Apresentamos no mínimo 3 opções de operadoras diferentes com comparativo detalhado de coberturas, rede credenciada e preço. Você decide sem pressão."
    painPoints={[
      "Você ou sua família estão sem plano de saúde e dependem do SUS para qualquer emergência?",
      "Está pagando caro demais no plano atual e sente que não usa nem metade dos benefícios?",
      "Recebeu um reajuste absurdo e não sabe se vale a pena continuar ou trocar de operadora?",
      "Tentou pesquisar planos sozinho e se perdeu entre coberturas, carências e letras miúdas?",
    ]}
    stats={[
      { value: "20", label: "Operadoras" },
      { value: "2h", label: "Tempo Resposta" },
      { value: "0", label: "Carência*" },
      { value: "100%", label: "Gratuito" },
    ]}
    benefits={[
      { icon: "📊", title: "Comparativo real", description: "Tabela comparativa clara com preço, cobertura, rede e carência de cada operadora. Sem surpresas." },
      { icon: "💰", title: "Melhor preço garantido", description: "Negociamos diretamente com as operadoras. Nossos clientes economizam até 40% na troca de plano." },
      { icon: "🏥", title: "Rede credenciada ampla", description: "Hospitais, clínicas e laboratórios perto de você. Verificamos a rede antes de recomendar." },
      { icon: "⏱️", title: "Carência reduzida", description: "Em muitos casos, conseguimos portabilidade sem carência. Você troca de plano e já usa no dia seguinte." },
      { icon: "👨‍💼", title: "Consultor especialista", description: "Um profissional de saúde suplementar analisa seu perfil e necessidades para recomendar o plano certo." },
      { icon: "📋", title: "Suporte completo", description: "Ajudamos com autorização de exames, reembolso e qualquer problema com a operadora." },
    ]}
    testimonials={[
      { name: "Ana Paula S.", role: "Mãe de família", stars: 5, content: "Achei um plano com quarto individual para toda família por menos do que pagava no enfermaria. A Patro fez mágica!" },
      { name: "Marcos T.", role: "Empresário", stars: 5, content: "Coloquei 12 funcionários no plano empresarial e economizei R$ 800/mês comparado à proposta que tinha." },
      { name: "Lucia M.", role: "Aposentada", stars: 5, content: "Trocaram meu plano sem carência nenhuma. Já usei no dia seguinte. Equipe muito atenciosa." },
    ]}
    objections={[
      { question: "Consigo plano sem carência?", answer: "Em muitos casos, sim! Através da portabilidade ou planos empresariais (a partir de 2 vidas), é possível eliminar ou reduzir carências." },
      { question: "Plano individual ou empresarial?", answer: "Para famílias com 2+ pessoas, o plano empresarial costuma ser até 40% mais barato. Mesmo MEI pode contratar. Orientamos a melhor opção." },
      { question: "Vocês cobram alguma taxa?", answer: "Não! Nossa remuneração vem das operadoras. Para você, o serviço é 100% gratuito e o preço é o mesmo que comprando direto." },
      { question: "E se eu não gostar do plano?", answer: "Apresentamos sempre 3+ opções com comparativo detalhado. Você escolhe com calma, sem pressão, e pode trocar na renovação." },
      { question: "Atendem planos para idosos?", answer: "Sim! Temos opções específicas para 59+ com redes amplas e preços competitivos, incluindo Medsenior, Prevent Senior e Omint." },
    ]}
  />
);

export default LandingPlanoSaude;
