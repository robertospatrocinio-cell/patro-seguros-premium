import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20blog%20da%20Patro%20Seguros%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

const articlesContent: Record<string, { title: string; content: string; faqs: { q: string; a: string }[] }> = {
  "quanto-custa-seguro-auto": {
    title: "Quanto Custa Seguro Auto em 2025?",
    content: `O preço do seguro auto varia conforme diversos fatores: perfil do motorista, modelo e ano do veículo, região de circulação, tipo de cobertura e histórico de sinistros.\n\nEm média, o seguro auto no Brasil custa entre R$ 1.500 e R$ 5.000 por ano, mas esse valor pode ser maior para veículos de luxo ou motoristas jovens.\n\nPara economizar, compare cotações de diferentes seguradoras. Na Patro Seguros, fazemos essa comparação para você gratuitamente.\n\nFatores que influenciam o preço:\n- Idade e experiência do motorista\n- CEP de pernoite do veículo\n- Modelo, ano e valor do carro\n- Histórico de sinistros\n- Tipo de cobertura escolhida\n- Uso do veículo (particular ou profissional)`,
    faqs: [
      { q: "Qual o seguro auto mais barato?", a: "O valor depende do perfil. Compare cotações com a Patro Seguros para encontrar a melhor opção." },
      { q: "Como reduzir o valor do seguro auto?", a: "Instale rastreador, aumente a franquia, mantenha bom histórico e compare seguradoras." },
    ],
  },
  "seguro-auto-vale-a-pena": {
    title: "Seguro Auto Vale a Pena? Entenda os Prós e Contras",
    content: `Muitas pessoas se perguntam se vale a pena pagar seguro auto. A resposta depende do seu perfil, mas na maioria dos casos, sim — o seguro auto é um investimento em tranquilidade.\n\nPrós do seguro auto:\n- Proteção contra roubo e furto\n- Cobertura para acidentes e colisões\n- Assistência 24h (guincho, chaveiro, etc)\n- Carro reserva em caso de sinistro\n- Responsabilidade civil contra terceiros\n\nContras:\n- Custo anual que pode ser significativo\n- Franquia em caso de sinistro parcial\n\nPara a maioria dos motoristas, o custo do seguro é muito menor do que o prejuízo de um sinistro sem cobertura.`,
    faqs: [
      { q: "Posso andar sem seguro auto?", a: "Legalmente sim, mas financeiramente é muito arriscado. Um acidente pode custar dezenas de milhares de reais." },
    ],
  },
};

const defaultArticle = {
  title: "Artigo",
  content: "Este artigo está sendo preparado. Entre em contato conosco para mais informações sobre este tema.",
  faqs: [],
};

const BlogArticle = () => {
  const { slug } = useParams();
  const article = (slug && articlesContent[slug]) || defaultArticle;

  return (
    <>
      <Header />
      <main>
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="mr-1 h-4 w-4" /> Voltar ao Blog
            </Link>
            <h1 className="mb-4">{article.title}</h1>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg max-w-none">
              {article.content.split("\n\n").map((p, i) => (
                <p key={i} className="text-muted-foreground mb-4 whitespace-pre-line">{p}</p>
              ))}
            </div>

            {article.faqs.length > 0 && (
              <div className="mt-12 border-t pt-8">
                <h2 className="mb-6">Perguntas Frequentes</h2>
                <div className="space-y-4">
                  {article.faqs.map((faq, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold mb-1">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 p-8 bg-muted rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4">Precisa de Ajuda com Seguros?</h3>
              <p className="text-muted-foreground mb-6">Fale com nossos especialistas e encontre a melhor proteção.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cotacao">
                  <Button size="lg">Pedir Cotação</Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="cta">
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogArticle;
