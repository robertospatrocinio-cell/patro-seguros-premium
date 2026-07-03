import LocalPageTemplate from "@/components/LocalPageTemplate";
import heroImg from "@/assets/hero-seguro-motorista-app.webp";

/**
 * Fase 4 — Nicho defensável: seguro para táxi em Guarulhos.
 * Concorrência baixa e demanda constante (Aeroporto GRU + praças de táxi).
 */
const SeguroTaxiGuarulhos = () => (
  <LocalPageTemplate
    slug="seguro-taxi-guarulhos"
    title="Seguro para Táxi em Guarulhos"
    subtitle="Cobertura EAR obrigatória para taxistas de Guarulhos e do GRU Airport, com assistência 24h, carro reserva e franquia calibrada para uso profissional intenso."
    metaDescription="Seguro para táxi em Guarulhos: cobertura EAR, RCF-V ampliada, carro reserva e assistência 24h. Especialista para taxistas do GRU e praças locais."
    icon="🚕"
    city="Guarulhos"
    neighborhood="Guarulhos"
    geo={{ latitude: -23.4538, longitude: -46.5333 }}
    heroImage={heroImg}
    description="Táxi rodando 200+ km/dia em Guarulhos exige seguro com cláusula EAR (Exercício de Atividade Remunerada) — sem ela, a seguradora nega sinistro alegando uso profissional não declarado."
    detailedDescription={`Guarulhos concentra praças de táxi de alta rotatividade no entorno do GRU Airport, terminais rodoviários, shoppings (Maia, Internacional, Poli) e hospitais. Um veículo rodando 200 km/dia tem exposição 4 a 5 vezes maior a colisão, quebra de para-brisa e furto do que um carro de uso particular — e é isso que faz a maioria das seguradoras recusar ou negar sinistro se o taxista não declarou o uso profissional na proposta.

Trabalhamos com Porto, Tokio Marine, HDI e Allianz para taxistas em Guarulhos. Todos aceitam a cláusula EAR, mas cada um calibra franquia, cobertura de vidros e assistência de forma diferente. Nossa função é encontrar a combinação de menor prêmio compatível com o seu perfil (idade, tempo de habilitação, tempo de praça, garagem à noite) sem abrir mão de assistência 24h e carro reserva — porque para o taxista o carro parado é receita zero.`}
    pricing={{
      intro: "Seguro de táxi compreensivo em Guarulhos custa entre R$ 3.800 e R$ 7.200/ano para veículos populares e SUVs compactos, dependendo do perfil, ponto de praça e garagem noturna.",
      factors: [
        "Idade e tempo de CNH do taxista (bônus e sinistralidade histórica)",
        "Ponto de praça e trajeto habitual (aeroporto agrega risco)",
        "Garagem noturna coberta versus rua",
        "Presença de rastreador e câmera veicular",
        "Modelo do veículo (SUV compacto tem prêmio até 20% menor que hatch popular)",
      ],
      note: "Câmera veicular + rastreador com bloqueio remoto podem reduzir prêmio em até 25% em Guarulhos.",
      range: { min: 3800, max: 7200 },
    }}
    faqs={[
      { question: "Quanto custa seguro para táxi em Guarulhos em 2026?", answer: "O prêmio compreensivo (colisão + roubo + incêndio + terceiros) para táxi em Guarulhos costuma ficar entre R$ 3.800 e R$ 7.200/ano. Para um Corolla ou Onix Plus com garagem noturna em casa, taxista com 40+ anos e 5+ anos de praça, o valor médio fica em R$ 4.900/ano. Taxistas jovens (até 30 anos) ou sem garagem pagam até 30% a mais." },
      { question: "Preciso declarar que uso o carro como táxi na proposta?", answer: "Sim, obrigatoriamente — é a cláusula EAR (Exercício de Atividade Remunerada). Se você contratar seguro comum e sofrer sinistro dirigindo passageiros, a seguradora nega pagamento por 'uso profissional não declarado'. Todas as apólices que emitimos para taxistas em Guarulhos incluem EAR expressa, com prêmio calibrado para o uso real do veículo." },
      { question: "Seguro de táxi cobre roubo do celular do passageiro?", answer: "Não pela apólice do veículo. O que cobre é: roubo/furto do próprio veículo, danos ao veículo, danos a terceiros (RCF-V — Responsabilidade Civil Facultativa Veículos) e assistência 24h. Para cobertura de conteúdo pessoal do passageiro, seria necessário produto separado de responsabilidade civil geral — normalmente não vale a pena para táxi." },
      { question: "Tem carro reserva para táxi?", answer: "Sim, mas com peculiaridades. A maioria das seguradoras oferece carro reserva por 15 a 30 dias, mas só a partir do 3º dia após o sinistro e mediante indisponibilidade do próprio veículo. Para taxista, cada dia parado é R$ 200–400 de receita perdida — recomendamos contratar carro reserva estendido (até 45 dias) por adicional de R$ 180–320/ano." },
      { question: "Vale a pena rastreador para táxi em Guarulhos?", answer: "Vale, principalmente para quem opera no entorno do GRU e à noite. Rastreador com bloqueio remoto reduz prêmio em 15–25% na Porto e Tokio Marine, e a maioria das seguradoras exige rastreador para veículos FIPE acima de R$ 60 mil quando o uso é profissional. Custo de instalação: R$ 400–800 uma vez + R$ 40–80/mês de mensalidade — retorno é pago em 6–10 meses no desconto do prêmio." },
      { question: "Como funciona sinistro de colisão com passageiro no carro?", answer: "A cobertura de RCF-V paga danos ao passageiro (materiais e corporais) até o limite contratado — recomendamos mínimo de R$ 100 mil materiais e R$ 100 mil corporais para taxistas. Para o próprio veículo, cobertura de colisão paga o reparo (com franquia) ou indenização integral em caso de perda total. Assistência 24h remove o veículo do local sem custo." },
    ]}
    insurers={[
      { name: "Porto Seguro", highlight: "Melhor aceitação de EAR e rede de reparadoras ampla em Guarulhos" },
      { name: "Tokio Marine", highlight: "Prêmio competitivo para SUVs compactos e híbridos usados como táxi" },
      { name: "HDI", highlight: "Boa opção para taxistas com bônus alto e sinistralidade baixa" },
      { name: "Allianz", highlight: "RCF-V ampliada com limites elevados para acidentes com passageiros" },
    ]}
    testimonials={[
      { author: "Josué A.", neighborhood: "Cumbica", quote: "Rodo aeroporto todo dia. Corretora antiga me vendeu seguro sem EAR e neguei um sinistro de R$ 8 mil. A Patro refez com Porto EAR expressa, mais barato e com carro reserva de 30 dias.", rating: 5 },
      { author: "Nilson B.", neighborhood: "Centro", quote: "Táxi Prius, ponto no Poli Shopping. Comparei 4 seguradoras via Patro e fechei com Tokio: R$ 480/ano a menos que a proposta direta, com rastreador incluído.", rating: 5 },
    ]}
    realScenarios={[
      { title: "Sinistro com passageiro coberto pela RCF-V", description: "Taxista sofreu colisão com culpa levando passageira ao GRU. Danos ao veículo (R$ 12 mil) + danos corporais à passageira (R$ 8 mil de fisioterapia) foram totalmente cobertos pela apólice com RCF-V de R$ 100 mil. Sem essa cobertura, taxista responderia civilmente do próprio bolso." },
      { title: "Furto de veículo em praça noturna recuperado por rastreador", description: "Táxi furtado em praça próxima ao terminal noturno. Rastreador acionado em 4 min, veículo recuperado a 12 km sem danos. Assistência 24h fez remoção e entrega no dia seguinte. Cliente não perdeu franquia (sinistro sem indenização)." },
    ]}
    coverages={[
      { title: "Compreensiva com cláusula EAR", description: "Colisão + roubo + furto + incêndio + terceiros, com uso profissional declarado (evita recusa de sinistro)." },
      { title: "RCF-V ampliada (Responsabilidade Civil Facultativa)", description: "Limites de R$ 100 mil materiais e R$ 100 mil corporais mínimos — protege passageiros e terceiros." },
      { title: "Carro reserva estendido", description: "Até 45 dias — essencial para não ficar sem faturar durante reparo." },
      { title: "Assistência 24h com guincho ilimitado", description: "Remoção do local, socorro mecânico, troca de pneu e chaveiro em qualquer horário." },
      { title: "Vidros e faróis", description: "Cobertura de para-brisa, vigias e faróis com franquia reduzida — o desgaste em táxi é intenso." },
    ]}
    whoNeeds={[
      "Taxistas com ponto de praça em Guarulhos ou GRU Airport",
      "Cooperativas de táxi que gerenciam frota compartilhada",
      "Taxistas que rodam eventos e transferências para o aeroporto",
      "Motoristas de táxi que financiam veículo (banco exige seguro compreensivo)",
    ]}
    whyPatro={[
      "Concorrência entre 4+ seguradoras que aceitam EAR",
      "Rota de sinistro dedicada com acompanhamento presencial",
      "Sede em Guarulhos — vistoria sem deslocamento",
      "Renovação anual revisada para capturar bônus e queda de tarifa",
    ]}
    tips={[
      "Nunca contrate seguro sem cláusula EAR se usa como táxi — sinistro será negado",
      "Instale câmera veicular + rastreador — reduz prêmio e blinda em disputa de sinistro",
      "Guarde em casa fechada à noite sempre que possível — mudança de garagem cai o prêmio em ~10%",
      "Contrate carro reserva estendido (mín. 30 dias) — para taxista é seguro contra ficar sem faturar",
    ]}
    relatedInsurances={[
      { title: "Seguro para Motorista de App (Uber/99)", link: "/seguro-motorista-app" },
      { title: "Seguro Auto em Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Seguro de Frota para Cooperativas", link: "/seguro-frota" },
      { title: "Hub de Seguros em Guarulhos", link: "/seguros-em-guarulhos" },
    ]}
    whatsappMessage="Olá! Quero cotação de seguro para táxi em Guarulhos, com cláusula EAR e carro reserva estendido."
  />
);

export default SeguroTaxiGuarulhos;