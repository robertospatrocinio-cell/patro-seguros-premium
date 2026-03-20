import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { trackWhatsAppClick } from "@/lib/tracking";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

const faqCategories = [
  {
    id: "geral",
    title: "Geral — Seguros e Corretagem",
    faqs: [
      { question: "Qual é a diferença entre corretora e seguradora?", answer: "A seguradora é a empresa que emite a apólice e assume o risco financeiro (ex: Porto, Tokio Marine, Allianz). A corretora — como a Patro — é a intermediária que compara cotações de várias seguradoras para encontrar a melhor opção para você. Trabalhamos a seu favor, sem custo adicional: quem remunera a corretora é a seguradora, não o cliente." },
      { question: "Por que contratar através de uma corretora em vez de direto com a seguradora?", answer: "A corretora compara preços e coberturas de dezenas de seguradoras simultaneamente, algo que o cliente não consegue fazer sozinho. Além disso, a corretora negocia condições, orienta sobre coberturas adequadas, cuida de toda burocracia e — mais importante — acompanha sinistros. O preço é o mesmo ou até menor do que contratando direto." },
      { question: "Como funciona o atendimento da Patro Seguros?", answer: "Você entra em contato por WhatsApp, telefone ou formulário. Um consultor especialista analisa seu perfil, compara cotações de múltiplas seguradoras e apresenta as melhores opções em até 2 horas úteis. Todo o processo pode ser feito 100% online." },
      { question: "Qual é o tempo de resposta para cotação?", answer: "Em até 2 horas úteis você recebe sua cotação personalizada com propostas comparativas de várias seguradoras. Em casos mais complexos (como seguro empresarial, frota ou agro), pode levar até 24 horas." },
      { question: "Vocês trabalham com quais seguradoras?", answer: "Trabalhamos com mais de 16 seguradoras e 20 operadoras de saúde, incluindo Porto, Tokio Marine, Allianz, HDI, Bradesco, SulAmérica, Mapfre, Zurich, Liberty, Sompo, Chubb, Excelsior, Fairfax, Essor, Sancor, entre outras." },
      { question: "Como faço para contratar um seguro?", answer: "Basta solicitar uma cotação gratuita pelo nosso site, WhatsApp ou telefone. Nosso consultor apresentará as melhores opções e, após sua aprovação, cuidamos de toda a documentação e emissão da apólice. Não precisa sair de casa." },
      { question: "A cotação é realmente gratuita e sem compromisso?", answer: "Sim. Todas as nossas cotações são 100% gratuitas e sem compromisso. Você só contrata se encontrar uma opção que faça sentido para você." },
      { question: "O que é uma apólice de seguro?", answer: "A apólice é o contrato formal entre o segurado e a seguradora. Ela detalha todas as coberturas contratadas, valores de indenização, franquias, vigência (período de validade), condições gerais e dados do segurado. Sempre guarde sua apólice em local seguro e leia as condições." },
      { question: "O que é franquia no seguro?", answer: "Franquia é o valor que o segurado paga do próprio bolso em caso de sinistro parcial (quando o bem é reparado, não substituído). Por exemplo, se sua franquia é R$ 3.000 e o reparo custa R$ 8.000, você paga R$ 3.000 e a seguradora paga R$ 5.000. Franquias maiores reduzem o preço do seguro." },
      { question: "O que é sinistro e como funciona o processo?", answer: "Sinistro é qualquer evento coberto pela apólice: batida, roubo, incêndio, doença grave, etc. Ao ocorrer um sinistro, entre em contato conosco imediatamente. A Patro cuida de todo o processo junto à seguradora: abertura, orientação sobre documentação, acompanhamento e resolução. O prazo legal para pagamento de indenização é de 30 dias após entrega de toda a documentação." },
      { question: "O que acontece se eu não renovar meu seguro?", answer: "Se o seguro vencer e não for renovado, você fica sem cobertura a partir da data de vencimento. Qualquer sinistro que ocorrer após essa data não será coberto. Na Patro, entramos em contato antes do vencimento para garantir sua renovação com as melhores condições." },
      { question: "Posso cancelar meu seguro antes do vencimento?", answer: "Sim. Você pode cancelar a qualquer momento e receber a restituição proporcional ao período não utilizado (prêmio pro rata). Entre em contato conosco para fazer o cancelamento sem burocracia." },
    ]
  },
  {
    id: "auto",
    title: "Seguro Auto e Moto",
    faqs: [
      { question: "Qual a diferença entre seguro compreensivo e contra terceiros?", answer: "A cobertura compreensiva protege seu veículo contra roubo, furto, colisão, incêndio e danos naturais — além de cobrir danos a terceiros. A cobertura contra terceiros cobre apenas os danos que você causar a outros veículos e pessoas, sem proteger o seu carro. É mais barata, mas deixa seu patrimônio exposto." },
      { question: "Por que meu seguro auto é tão caro?", answer: "O preço depende de muitos fatores: modelo do carro (veículos mais roubados custam mais), CEP de pernoite (regiões com mais sinistros encarecem), perfil do motorista (idade, sexo, tempo de habilitação), uso do veículo e histórico de sinistros. Na Patro, comparamos diversas seguradoras para encontrar diferenças de até 50% para o mesmo perfil." },
      { question: "Seguro auto cobre enchente e granizo?", answer: "Sim, desde que você tenha contratado a cobertura de 'Fenômenos Naturais' ou 'Eventos da Natureza'. Essa cobertura protege contra enchentes, inundações, granizo, vendavais, queda de árvores e raios. É essencial em cidades com histórico de chuvas fortes como Guarulhos e São Paulo." },
      { question: "Posso escolher a oficina para reparos?", answer: "Depende da apólice. Na modalidade 'oficina referenciada' (rede da seguradora), o preço é mais barato. Na 'livre escolha', você escolhe a oficina, mas o seguro tende a custar mais. Algumas seguradoras oferecem ambas as opções." },
      { question: "Se eu emprestar meu carro e ele bater, o seguro cobre?", answer: "Geralmente sim, desde que o motorista esteja dentro do perfil declarado na apólice (idade, sexo, relação com o segurado). Se o motorista estiver fora do perfil, pode haver recusa de sinistro. Por isso, é importante declarar corretamente quem dirige o veículo." },
      { question: "Seguro de moto é muito caro?", answer: "Motos de baixa cilindrada (até 300cc) podem ter seguro bastante acessível, especialmente para perfis de baixo risco (garagem, uso lazer, condutor experiente). Motos esportivas e de alta cilindrada são mais caras. Comparamos várias seguradoras para encontrar a melhor condição." },
    ]
  },
  {
    id: "vida",
    title: "Seguro de Vida e Saúde",
    faqs: [
      { question: "Seguro de vida cobre doenças graves?", answer: "O seguro de vida tradicional cobre morte (natural ou acidental) e invalidez permanente. Para cobertura de doenças graves (câncer, AVC, infarto), é necessário contratar a cobertura adicional de 'Doenças Graves (DG)', que paga indenização antecipada ao diagnóstico." },
      { question: "Quanto custa um seguro de vida?", answer: "Para um adulto de 30 a 40 anos, é possível contratar cobertura de R$ 200.000 por morte e invalidez a partir de R$ 30 a R$ 80/mês. O valor varia conforme idade, profissão, capital segurado e coberturas adicionais escolhidas." },
      { question: "Seguro de vida tem carência?", answer: "Não para morte acidental e invalidez por acidente — a cobertura começa na data de vigência. Para morte natural, algumas seguradoras podem ter carência de até 24 meses em condições específicas. Para suicídio, a lei estabelece carência de 2 anos." },
      { question: "Qual a diferença entre plano de saúde individual e empresarial?", answer: "Planos empresariais (a partir de 2 ou 3 vidas) geralmente são mais baratos, têm menos carência e mais opções de operadoras. Planos individuais são cada vez mais escassos no mercado e costumam ter valores mais altos. Se você tem CNPJ (mesmo MEI), vale considerar o empresarial." },
      { question: "Plano de saúde tem carência? Quanto tempo?", answer: "Sim. A ANS regulamenta os prazos máximos: urgência/emergência (24h), consultas e exames simples (30 dias), internações e cirurgias (180 dias), parto (300 dias), doenças preexistentes (24 meses). Alguns planos empresariais oferecem carência reduzida ou isenta." },
      { question: "Posso migrar de plano de saúde sem cumprir carência novamente?", answer: "Sim, através da portabilidade regulamentada pela ANS. Se você está há pelo menos 2 anos no plano atual (ou 3 anos para doenças preexistentes), pode migrar sem cumprir novas carências, desde que o novo plano tenha faixa de preço compatível." },
    ]
  },
  {
    id: "residencial",
    title: "Seguro Residencial",
    faqs: [
      { question: "Preciso de seguro residencial se moro de aluguel?", answer: "Sim! O seguro de conteúdo protege seus bens dentro do imóvel (móveis, eletrodomésticos, eletrônicos, roupas) contra incêndio, roubo, danos elétricos e mais. Você não precisa ser proprietário — o seguro protege o que é seu, não o imóvel do dono." },
      { question: "Seguro residencial cobre danos elétricos na geladeira e TV?", answer: "Sim, com a cobertura de 'Danos Elétricos'. Se uma queda de energia, curto-circuito ou variação de tensão queimar sua geladeira, TV, computador ou qualquer eletrodoméstico, o seguro indeniza o reparo ou substituição. É a cobertura mais acionada do seguro residencial." },
      { question: "Seguro residencial é caro?", answer: "É o seguro com melhor custo-benefício do mercado. Apartamentos a partir de R$ 150/ano e casas a partir de R$ 250/ano. Considerando que uma visita de encanador ou eletricista custa R$ 150 a R$ 400, o seguro se paga na primeira utilização da assistência 24h." },
      { question: "O que a assistência 24h do seguro residencial cobre?", answer: "Encanador, eletricista, chaveiro, vidraceiro, desentupidor, e dependendo do plano: limpeza de caixa d'água, instalação de ventilador de teto, reparo de portão eletrônico, caça-vazamentos e muito mais. Cada chamado tem limite de horas/valor, conforme a apólice." },
    ]
  },
  {
    id: "empresarial",
    title: "Seguros Empresariais",
    faqs: [
      { question: "Minha empresa é pequena. Preciso de seguro empresarial?", answer: "Sim. Empresas de todos os portes estão expostas a riscos como incêndio, roubo, ações de responsabilidade civil e danos a terceiros. Um incêndio ou roubo pode significar o fim do negócio. O seguro empresarial protege seu patrimônio e garante a continuidade das operações." },
      { question: "O que é seguro de Responsabilidade Civil (RC)?", answer: "O RC cobre danos materiais e corporais que sua empresa ou atividade profissional cause a terceiros. É essencial para médicos, advogados, engenheiros, contadores, empresas de serviços e qualquer profissional que lide com clientes ou opere com risco a terceiros." },
      { question: "O que são lucros cessantes?", answer: "É a cobertura que repõe o faturamento que sua empresa deixa de gerar durante uma paralisação por sinistro coberto (incêndio, por exemplo). Enquanto você reconstrói, os custos fixos continuam (aluguel, salários, financiamentos) — e os lucros cessantes cobrem isso." },
      { question: "Seguro de frota: quantos veículos são necessários?", answer: "Geralmente, a partir de 5 veículos já é possível contratar seguro de frota com condições especiais: preços menores, gestão centralizada, renovação unificada e atendimento dedicado. Quanto maior a frota, maiores os descontos." },
      { question: "O que o seguro cyber cobre?", answer: "Protege sua empresa contra ataques cibernéticos, vazamento de dados pessoais (LGPD), extorsão digital (ransomware), custos de notificação, defesa jurídica, multas regulatórias e danos à reputação. Essencial para empresas que armazenam dados de clientes." },
      { question: "Seguro Fiança Locatícia substitui fiador?", answer: "Sim. O seguro fiança elimina a necessidade de fiador ou depósito caução. A seguradora garante o pagamento do aluguel e encargos em caso de inadimplência do inquilino. É aceito por lei como modalidade de garantia locatícia." },
    ]
  },
  {
    id: "agro",
    title: "Seguros Agrícolas / Agronegócio",
    faqs: [
      { question: "Seguro rural cobre seca e geada?", answer: "Sim. O seguro rural (agrícola) pode cobrir perdas de produtividade por seca, geada, granizo, chuva excessiva, ventos fortes, incêndio e pragas, dependendo da modalidade contratada. Cada cultura (soja, milho, café, trigo) tem coberturas e condições específicas." },
      { question: "Como funciona o seguro de máquinas agrícolas?", answer: "Cobre tratores, colheitadeiras, plantadeiras e implementos contra roubo, furto, incêndio, tombamento, alagamento e danos durante operação. A cobertura vale dentro e fora da propriedade, inclusive durante transporte entre fazendas. Trabalhamos com parceiros como AGCO, John Deere e Case IH." },
      { question: "Existe subvenção do governo para seguro rural?", answer: "Sim. O Programa de Subvenção ao Prêmio do Seguro Rural (PSR) do governo federal pode cobrir de 20% a 40% do valor do prêmio, dependendo da cultura e modalidade. Isso significa que o produtor paga menos pelo seguro. Na Patro, orientamos sobre como aproveitar a subvenção." },
      { question: "O que é seguro pecuário?", answer: "Cobre a morte de animais (bovinos, equinos, suínos, aves, etc.) por causas como doenças, acidentes, fenômenos naturais e ataques de predadores. Importante para pecuaristas que investem em genética e rebanhos de alto valor." },
      { question: "A Patro é especialista em agronegócio?", answer: "Sim. O agronegócio é uma das nossas especialidades. Temos parceria direta com grandes montadoras de máquinas agrícolas e seguradoras especializadas no setor, como Essor, Sancor, Fairfax e Swiss Re. Entendemos as necessidades específicas do produtor rural." },
    ]
  },
  {
    id: "consorcio",
    title: "Consórcio",
    faqs: [
      { question: "Consórcio é seguro? Posso confiar?", answer: "Sim. Consórcios são regulados e fiscalizados pelo Banco Central do Brasil. As administradoras são autorizadas e os recursos dos consorciados ficam em fundo próprio, separado do patrimônio da administradora. É uma das formas mais seguras de planejar a aquisição de bens." },
      { question: "Qual a diferença entre consórcio e financiamento?", answer: "No financiamento você recebe o bem imediatamente, mas paga juros altos (podendo dobrar o valor total). No consórcio você paga parcelas menores (sem juros, apenas taxa de administração) e é contemplado por lance ou sorteio. O consórcio é ideal para quem pode planejar a aquisição." },
      { question: "Posso usar o FGTS no consórcio de imóveis?", answer: "Sim. O FGTS pode ser utilizado para dar lance, complementar o crédito da carta contemplada ou amortizar parcelas em consórcios de imóveis residenciais urbanos. As regras seguem a legislação vigente do FGTS." },
      { question: "Posso dar lance para ser contemplado mais rápido?", answer: "Sim. Existem modalidades de lance fixo (valor pré-determinado) e lance livre (você oferece o percentual que quiser). Quanto maior o lance, maior a chance de contemplação. O valor do lance é abatido das parcelas restantes." },
      { question: "O que posso comprar com consórcio?", answer: "Imóveis (casa, apartamento, terreno, construção), veículos (carro, moto, caminhão), veículos pesados (ônibus, máquinas), serviços e até investimentos. As cartas de crédito variam conforme a administradora." },
    ]
  },
];

const allFaqs = faqCategories.flatMap(cat => cat.faqs);

const FAQ = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const normalizedSearch = search.toLowerCase().trim();

  const filteredCategories = faqCategories
    .filter(cat => !activeCategory || cat.id === activeCategory)
    .map(cat => ({
      ...cat,
      faqs: normalizedSearch
        ? cat.faqs.filter(f =>
            f.question.toLowerCase().includes(normalizedSearch) ||
            f.answer.toLowerCase().includes(normalizedSearch)
          )
        : cat.faqs,
    }))
    .filter(cat => cat.faqs.length > 0);

  const totalResults = filteredCategories.reduce((sum, cat) => sum + cat.faqs.length, 0);

  return (
    <>
      <PageMeta title="Perguntas Frequentes (FAQ)" description="Tire suas dúvidas sobre seguros, planos de saúde, consórcios e mais. FAQ completo com respostas de especialistas — Patro Seguros, Guarulhos." />
      <FAQSchema faqs={allFaqs} />
      <Header />
      <main id="main-content">
        <Breadcrumb items={[{ label: "FAQ" }]} />

        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-white mb-4">Perguntas Frequentes</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Tire suas dúvidas sobre seguros, planos de saúde, consórcio e nosso atendimento.
            </p>
            {/* Busca */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Buscar pergunta..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 bg-white/95 border-0 h-11 rounded-xl text-foreground"
                aria-label="Buscar perguntas frequentes"
              />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Filtros de categoria */}
            <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Categorias de FAQ">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-base ${!activeCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                role="tab"
                aria-selected={!activeCategory}
              >
                Todas ({allFaqs.length})
              </button>
              {faqCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-base ${activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                >
                  {cat.title.split("—")[0].trim()}
                </button>
              ))}
            </div>

            {/* Resultado da busca */}
            {normalizedSearch && (
              <p className="text-sm text-muted-foreground mb-6">
                {totalResults === 0
                  ? `Nenhum resultado para "${search}"`
                  : `${totalResults} resultado${totalResults > 1 ? "s" : ""} para "${search}"`}
              </p>
            )}

            {/* FAQs */}
            {filteredCategories.map((category, catIdx) => (
              <div key={category.id} className={catIdx > 0 ? "mt-12" : ""}>
                <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-border">{category.title}</h2>
                <div className="space-y-3">
                  {category.faqs.map((faq, i) => (
                    <details key={i} className="premium-card group" open={catIdx === 0 && i === 0 && !normalizedSearch}>
                      <summary className="flex items-center justify-between p-5 cursor-pointer text-[15px] font-semibold text-foreground hover:text-primary transition-base select-none list-none [&::-webkit-details-marker]:hidden">
                        {faq.question}
                        <span className="text-primary/40 ml-4 group-open:rotate-45 transition-transform text-lg font-light flex-shrink-0">+</span>
                      </summary>
                      <div className="px-5 pb-5 -mt-1">
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                        <div className="mt-4 pt-3 border-t border-border/50">
                          <Link to="/cotacao" className="text-[13px] font-medium text-primary hover:underline inline-flex items-center gap-1">
                            Solicitar Cotação Grátis <ArrowRight className="h-3 w-3" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}

            {/* Sem resultados */}
            {filteredCategories.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">Não encontramos respostas para sua busca.</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("faq-busca-vazia")}>
                  <Button variant="cta" className="rounded-lg"><MessageCircle className="mr-2 h-4 w-4" /> Perguntar no WhatsApp</Button>
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 gradient-hero" aria-label="Solicitar cotação">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-white mb-4">Não encontrou sua resposta?</h2>
            <p className="text-white/70 mb-10 max-w-md mx-auto text-[14px]">
              Fale diretamente com um especialista da Patro. Atendimento rápido e personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("faq")}>
                <Button size="lg" className="rounded-lg bg-white text-foreground hover:bg-white/90 h-11 px-7 text-[13px] font-semibold">
                  <MessageCircle className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" /> Falar no WhatsApp
                </Button>
              </a>
              <Link to="/contato">
                <Button size="lg" className="rounded-lg h-11 px-7 text-[13px] bg-white/[0.08] border border-white/[0.1] text-white/80 hover:bg-white/[0.12] font-medium">
                  Página de Contato
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
