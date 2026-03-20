import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

const faqCategories = [
  {
    title: "Geral",
    faqs: [
      { question: "Qual é a diferença entre corretora e seguradora?", answer: "A seguradora é a empresa que emite e garante a apólice. A corretora — como a Patro — é a intermediária que compara cotações de várias seguradoras para encontrar a melhor opção para você. Trabalhamos a seu favor, sem custo adicional." },
      { question: "Como funciona o atendimento da Patro Seguros?", answer: "Você entra em contato por WhatsApp, telefone ou formulário. Um consultor especialista analisa seu perfil, compara cotações de múltiplas seguradoras e apresenta as melhores opções em até 2 horas úteis." },
      { question: "Qual é o tempo de resposta para cotação?", answer: "Em até 2 horas úteis você recebe sua cotação personalizada com propostas comparativas de várias seguradoras. Em casos mais complexos (como seguro empresarial ou frota), pode levar até 24 horas." },
      { question: "Vocês trabalham com quais seguradoras?", answer: "Trabalhamos com mais de 16 seguradoras e 20 operadoras de saúde, incluindo Porto, Tokio Marine, Allianz, HDI, Bradesco, SulAmérica, Mapfre, Zurich, Liberty, Sompo, entre outras." },
      { question: "Como faço para contratar um seguro?", answer: "Basta solicitar uma cotação gratuita pelo nosso site, WhatsApp ou telefone. Nosso consultor apresentará as melhores opções e, após sua aprovação, cuidamos de toda a documentação e emissão da apólice." },
      { question: "E se eu tiver um sinistro?", answer: "A Patro cuida de todo o processo junto à seguradora: abertura do sinistro, orientação sobre documentação, acompanhamento e resolução. Você não precisa se preocupar com burocracia." },
      { question: "A cotação é realmente gratuita e sem compromisso?", answer: "Sim. Todas as nossas cotações são 100% gratuitas e sem compromisso. Você só contrata se encontrar uma opção que faça sentido para você." },
    ]
  },
  {
    title: "Seguros Pessoais",
    faqs: [
      { question: "Qual a diferença entre seguro auto com cobertura compreensiva e contra terceiros?", answer: "A cobertura compreensiva protege seu veículo contra roubo, furto, colisão, incêndio e danos naturais. A cobertura contra terceiros cobre apenas os danos que você causar a outros veículos e pessoas — não protege o seu carro." },
      { question: "Seguro de vida cobre doenças?", answer: "O seguro de vida tradicional cobre morte (natural ou acidental) e invalidez. Para cobertura de doenças graves (câncer, AVC, infarto), é necessário contratar coberturas adicionais específicas." },
      { question: "Preciso de seguro residencial se moro de aluguel?", answer: "Sim! O seguro residencial protege seus bens dentro do imóvel (móveis, eletrodomésticos, eletrônicos) contra incêndio, roubo, danos elétricos e mais. É diferente do seguro do imóvel em si." },
      { question: "Como funciona o seguro viagem? É obrigatório?", answer: "O seguro viagem cobre despesas médicas, extravio de bagagem, cancelamento de voo e mais. É obrigatório para países do Tratado de Schengen (Europa) e altamente recomendado para qualquer destino." },
    ]
  },
  {
    title: "Seguros Empresariais",
    faqs: [
      { question: "Minha empresa é pequena. Preciso de seguro empresarial?", answer: "Sim. Empresas de todos os portes estão expostas a riscos como incêndio, roubo, ações trabalhistas e responsabilidade civil. O seguro empresarial protege seu patrimônio e garante a continuidade do negócio." },
      { question: "O que é seguro de Responsabilidade Civil (RC)?", answer: "O RC cobre danos que sua empresa ou atividade profissional possa causar a terceiros. É essencial para médicos, advogados, engenheiros, empresas de serviços e qualquer profissional que lide com clientes." },
      { question: "Seguro de frota: quantos veículos são necessários?", answer: "Geralmente, a partir de 5 veículos já é possível contratar seguro de frota com condições especiais. Quanto maior a frota, maiores os descontos e benefícios." },
      { question: "O que o seguro cyber cobre?", answer: "O seguro cyber protege sua empresa contra ataques cibernéticos, vazamento de dados, extorsão digital (ransomware), custos de notificação à LGPD e danos à reputação. É essencial na era digital." },
    ]
  },
  {
    title: "Seguros Agrícolas",
    faqs: [
      { question: "Seguro rural cobre seca e geada?", answer: "Sim. O seguro rural (agrícola) pode cobrir perdas por seca, geada, granizo, chuva excessiva, ventos fortes e pragas, dependendo da modalidade contratada. Cada cultura tem coberturas específicas." },
      { question: "Como funciona o seguro de máquinas agrícolas?", answer: "Cobre tratores, colheitadeiras, plantadeiras e implementos contra roubo, incêndio, tombamento, alagamento e danos operacionais. A cobertura vale dentro e fora da propriedade." },
      { question: "Existe subvenção do governo para seguro rural?", answer: "Sim. O Programa de Subvenção ao Prêmio do Seguro Rural (PSR) do governo federal cobre de 20% a 40% do valor do prêmio, dependendo da cultura e modalidade." },
    ]
  },
  {
    title: "Consórcio",
    faqs: [
      { question: "Consórcio é seguro? Posso confiar?", answer: "Sim. Consórcios são regulados pelo Banco Central do Brasil. As administradoras são fiscalizadas e os recursos dos consorciados ficam em fundo próprio, separado do patrimônio da administradora." },
      { question: "Qual a diferença entre consórcio e financiamento?", answer: "No financiamento você recebe o bem imediatamente, mas paga juros altos. No consórcio você paga parcelas menores (sem juros, apenas taxa de administração) e é contemplado por lance ou sorteio." },
      { question: "Posso usar o FGTS no consórcio de imóveis?", answer: "Sim. O FGTS pode ser utilizado para dar lance, complementar o crédito ou amortizar parcelas em consórcios de imóveis residenciais." },
    ]
  },
];

const allFaqs = faqCategories.flatMap(cat => cat.faqs);

const FAQ = () => {
  return (
    <>
      <PageMeta title="Perguntas Frequentes (FAQ)" description="Tire suas dúvidas sobre seguros, planos de saúde, consórcios e mais. FAQ completo da Patro Seguros — corretora em Guarulhos." />
      <FAQSchema faqs={allFaqs} />
      <Header />
      <main id="main-content">
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-white mb-4">Perguntas Frequentes</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Tire suas dúvidas sobre seguros, planos de saúde, consórcio e nosso atendimento.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            {faqCategories.map((category, catIdx) => (
              <div key={catIdx} className={catIdx > 0 ? "mt-12" : ""}>
                <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-border">{category.title}</h2>
                <div className="space-y-3">
                  {category.faqs.map((faq, i) => (
                    <details key={i} className="premium-card group" open={catIdx === 0 && i === 0}>
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
          </div>
        </section>

        <section className="py-20 gradient-hero" aria-label="Solicitar cotação">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-white mb-4">Não encontrou sua resposta?</h2>
            <p className="text-white/70 mb-10 max-w-md mx-auto text-[14px]">
              Fale diretamente com um especialista da Patro. Atendimento rápido e personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
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
