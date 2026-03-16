import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const articles = [
  { slug: "quanto-custa-seguro-auto", title: "Quanto Custa Seguro Auto em 2025?", excerpt: "Descubra os fatores que influenciam o preço do seguro auto e como economizar.", category: "Seguro Auto" },
  { slug: "seguro-auto-vale-a-pena", title: "Seguro Auto Vale a Pena? Entenda os Prós e Contras", excerpt: "Análise completa sobre quando contratar seguro auto e quando não faz sentido.", category: "Seguro Auto" },
  { slug: "o-que-seguro-residencial-cobre", title: "O Que o Seguro Residencial Cobre?", excerpt: "Conheça todas as coberturas do seguro residencial e proteja seu lar.", category: "Seguro Residencial" },
  { slug: "quanto-custa-plano-de-saude", title: "Quanto Custa um Plano de Saúde em 2025?", excerpt: "Guia completo de preços de planos de saúde por faixa etária e operadora.", category: "Planos de Saúde" },
  { slug: "melhor-plano-saude-guarulhos", title: "Melhor Plano de Saúde em Guarulhos", excerpt: "Compare as principais operadoras que atendem Guarulhos e região.", category: "Planos de Saúde" },
  { slug: "seguro-empresarial-o-que-cobre", title: "Seguro Empresarial: O Que Cobre?", excerpt: "Entenda todas as coberturas do seguro empresarial e proteja seu negócio.", category: "Seguro Empresarial" },
  { slug: "seguro-para-tratores", title: "Seguro para Tratores: Guia Completo", excerpt: "Tudo sobre seguro de tratores, coberturas, preços e como contratar.", category: "Agronegócio" },
  { slug: "seguro-para-colheitadeiras", title: "Seguro para Colheitadeiras", excerpt: "Proteja sua colheitadeira contra roubo, incêndio e acidentes operacionais.", category: "Agronegócio" },
  { slug: "seguro-galpoes-industriais-guia", title: "Seguro para Galpões Industriais: Como Funciona", excerpt: "Guia completo sobre proteção para instalações industriais.", category: "Empresarial" },
  { slug: "7-seguros-proteger-familia", title: "Os 7 Seguros Mais Importantes para Proteger Sua Família", excerpt: "Descubra quais seguros toda família deveria ter.", category: "Dicas" },
  { slug: "como-escolher-seguro-empresa", title: "Como Escolher o Seguro Ideal para Sua Empresa", excerpt: "Passo a passo para encontrar a proteção certa para o seu negócio.", category: "Empresarial" },
  { slug: "seguro-auto-7-erros", title: "Seguro Auto: 7 Erros que Fazem Você Pagar Mais", excerpt: "Evite esses erros comuns e economize no seguro do seu carro.", category: "Seguro Auto" },
  { slug: "seguro-vida-por-que-ter", title: "Seguro de Vida: Por Que Todo Adulto Deveria Ter Um", excerpt: "Entenda a importância do seguro de vida e como ele protege sua família.", category: "Seguro Vida" },
  { slug: "seguro-fianca-vs-caucao", title: "Seguro Fiança Locatícia vs. Caução: Qual Escolher?", excerpt: "Comparativo completo entre as duas modalidades de garantia locatícia.", category: "Seguro Fiança" },
  { slug: "o-que-e-responsabilidade-civil", title: "O Que É Responsabilidade Civil e Por Que Você Precisa", excerpt: "Entenda como o RC protege profissionais e empresas.", category: "RC" },
  { slug: "como-proteger-frota", title: "Como Proteger Sua Frota com Menor Custo", excerpt: "Estratégias para reduzir o custo do seguro de frota sem perder cobertura.", category: "Seguro Frota" },
  { slug: "seguro-rural-como-funciona", title: "Seguro Rural: Como Funciona", excerpt: "Tudo sobre seguro agrícola, pecuário e de máquinas no campo.", category: "Agronegócio" },
  { slug: "como-funciona-cotacao-seguros", title: "Como Funciona a Cotação de Seguros", excerpt: "Entenda o processo de cotação e como escolher a melhor proposta.", category: "Dicas" },
  { slug: "dicas-evitar-sinistros", title: "Dicas para Evitar Sinistros no Dia a Dia", excerpt: "Prevenção é o melhor seguro. Confira dicas práticas.", category: "Dicas" },
  { slug: "seguro-moto-vale-a-pena", title: "Seguro Moto Vale a Pena? Análise Completa", excerpt: "Descubra quando o seguro de moto compensa e como contratar.", category: "Seguro Moto" },
  { slug: "plano-saude-individual-vs-empresarial", title: "Plano de Saúde Individual vs Empresarial", excerpt: "Entenda as diferenças e qual é mais vantajoso para você.", category: "Planos de Saúde" },
  { slug: "seguro-viagem-internacional", title: "Seguro Viagem Internacional: O Que Você Precisa Saber", excerpt: "Guia completo para viajar protegido para qualquer destino.", category: "Seguro Viagem" },
  { slug: "seguro-condominio-obrigatorio", title: "Seguro Condomínio é Obrigatório? Entenda a Lei", excerpt: "Saiba sobre a obrigatoriedade e coberturas do seguro condominial.", category: "Seguro Condomínio" },
  { slug: "seguro-cyber-empresas", title: "Seguro Cyber: Proteção Digital para Empresas", excerpt: "Proteja sua empresa contra ataques cibernéticos e vazamento de dados.", category: "Seguro Cyber" },
  { slug: "previdencia-privada-vgbl-pgbl", title: "Previdência Privada: VGBL ou PGBL?", excerpt: "Entenda as diferenças e escolha o melhor plano de previdência.", category: "Previdência" },
  { slug: "seguro-celular-como-contratar", title: "Seguro Celular: Como Contratar e Quanto Custa", excerpt: "Proteja seu smartphone contra roubo, furto e quebra acidental.", category: "Seguro Celular" },
  { slug: "seguro-transporte-cargas", title: "Seguro de Transporte de Cargas: Guia Completo", excerpt: "Tudo sobre seguro de carga e RCTR-C para transportadoras.", category: "Seguro Transporte" },
  { slug: "seguro-engenharia-obras", title: "Seguro Engenharia para Obras e Construções", excerpt: "Proteção para riscos de engenharia em obras civis e montagem.", category: "Seguro Engenharia" },
  { slug: "como-acionar-seguro-auto", title: "Como Acionar o Seguro Auto: Passo a Passo", excerpt: "Guia prático para quando você precisar usar seu seguro.", category: "Seguro Auto" },
  { slug: "seguro-odontologico-coberturas", title: "Seguro Odontológico: Coberturas e Valores", excerpt: "Entenda o que o seguro odonto cobre e quanto custa.", category: "Seguro Odonto" },
  { slug: "seguro-acidentes-pessoais-passageiros-uber-vans", title: "Seguro de Acidentes Pessoais para Passageiros de Uber, Vans Escolares e Vans de Transporte", excerpt: "Entenda como o seguro de acidentes pessoais protege passageiros de aplicativos e vans, quem é obrigado a contratar e como funciona a cobertura.", category: "Acidentes Pessoais" },
  { slug: "cobertura-vidros-retrovisores-farois-seguro-auto", title: "Cobertura de Vidros, Retrovisores e Faróis no Seguro Auto: Guia Completo", excerpt: "Saiba como funciona a cobertura de vidros, retrovisores e faróis no seguro auto, quando acionar e como economizar.", category: "Seguro Auto" },
  { slug: "seguro-auto-premium-diferenciais", title: "Seguro Auto Premium: Conheça os Principais Diferenciais", excerpt: "Descubra o que diferencia o seguro auto premium do convencional e por que vale a pena investir em proteção superior.", category: "Seguro Auto" },
  { slug: "seguro-carta-verde-mercosul", title: "Seguro Carta Verde: Tudo Sobre a Proteção Obrigatória para o Mercosul", excerpt: "Entenda o que é o Seguro Carta Verde, por que é obrigatório e como contratar para viajar de carro pela América do Sul.", category: "Seguro Auto" },
  { slug: "rc-clinicas-estetica", title: "Seguro RC para Clínicas de Estética: Proteção Essencial", excerpt: "Entenda por que clínicas de estética precisam de seguro de responsabilidade civil e como se proteger contra processos.", category: "RC" },
  { slug: "seguro-condominio-guia-completo", title: "Seguro de Condomínio: Guia Completo — Obrigatoriedade, Coberturas e Como Contratar", excerpt: "Saiba tudo sobre o seguro condominial obrigatório, o que cobre, responsabilidades do síndico e como escolher a melhor apólice.", category: "Seguro Condomínio" },
  { slug: "seguro-agricola-contra-granizo", title: "Seguro Agrícola Contra Granizo: Proteja Sua Lavoura", excerpt: "Entenda como o seguro agrícola protege contra granizo, quais culturas são cobertas, custos e como acionar em caso de sinistro.", category: "Agronegócio" },
  { slug: "consorcio-imoveis-casa-propria", title: "Consórcio de Imóveis: O Sonho da Casa Própria ao Seu Alcance", excerpt: "Descubra como o consórcio de imóveis funciona, vantagens sobre o financiamento, formas de contemplação e dicas para realizar o sonho da casa própria.", category: "Consórcio" },
  { slug: "seguro-cobertura-lucros-cessantes", title: "Os Benefícios do Seguro com Cobertura de Lucros Cessantes", excerpt: "Entenda como a cobertura de lucros cessantes protege o faturamento da sua empresa em caso de sinistro e por que é indispensável.", category: "Empresarial" },
  { slug: "5-dicas-baratear-seguro-auto", title: "5 Dicas para Baratear o Seguro Auto", excerpt: "Confira estratégias práticas para pagar menos no seguro do seu carro sem abrir mão da proteção.", category: "Seguro Auto" },
  { slug: "coberturas-assistencia-24h-seguro-residencial", title: "Coberturas da Assistência 24h e Benefícios do Seguro Residencial", excerpt: "Descubra tudo o que a assistência 24h do seguro residencial cobre e os benefícios que protegem seu lar.", category: "Seguro Residencial" },
  { slug: "3-erros-produtor-rural-seguro-maquinas", title: "3 Coisas que o Produtor Rural Esquece na Hora de Contratar um Seguro de Máquinas", excerpt: "Erros comuns que podem deixar tratores, colheitadeiras e implementos sem proteção real. Saiba como evitar.", category: "Agronegócio" },
  { slug: "seguro-veiculos-blindados", title: "Seguro para Veículos Blindados: Guia Completo", excerpt: "Tudo sobre seguro de carros blindados: coberturas, preços, exigências e como contratar a proteção certa.", category: "Seguro Auto" },
  { slug: "penhor-rural-seguro-maquinas-agricolas", title: "Penhor Rural e Seguro de Máquinas Agrícolas: O Que Todo Produtor Precisa Saber", excerpt: "Entenda o que é o penhor rural, como ele se relaciona com o seguro de máquinas e equipamentos agrícolas e por que sua lavoura depende dessa proteção.", category: "Agronegócio" },
  { slug: "seguro-pivo-central-equipamentos-irrigacao", title: "Seguro de Pivô Central e Equipamentos de Irrigação: Guia Completo", excerpt: "Tudo sobre seguro para pivôs centrais, carretéis, gotejamento e aspersão. Coberturas, preços e como proteger seu sistema de irrigação.", category: "Agronegócio" },
  { slug: "carros-mais-roubados-furtados-sp-2025", title: "Ranking: Os 10 Carros Mais Roubados e Furtados de SP em 2025", excerpt: "Confira o ranking atualizado dos veículos mais visados pelos criminosos em São Paulo e saiba como proteger o seu.", category: "Seguro Auto" },
  { slug: "5-acoes-apos-acidente-veicular", title: "5 Ações Essenciais Após um Acidente Veicular", excerpt: "Saiba exatamente o que fazer nos primeiros minutos após uma colisão para garantir sua segurança, seus direitos e a cobertura do seguro.", category: "Seguro Auto" },
  { slug: "seguro-rc-medicos", title: "Seguro RC para Médicos: Por Que Todo Profissional da Saúde Precisa", excerpt: "Entenda como o Seguro de Responsabilidade Civil protege médicos contra processos, reclamações e indenizações por erros profissionais.", category: "RC" },
  { slug: "rc-geral-profissional-do-diferencas", title: "RC Geral, RC Profissional e D&O: Entenda as Diferenças", excerpt: "Descubra as diferenças entre os três principais seguros de Responsabilidade Civil e saiba qual sua empresa precisa.", category: "RC" },
  { slug: "seguros-contra-alagamentos", title: "Seguros Contra Alagamentos: Quais Cobrem e Como se Proteger", excerpt: "Descubra quais seguros cobrem alagamentos, enchentes e inundações — para casa, carro, empresa e lavoura.", category: "Dicas" },
];

const Blog = () => {
  return (
    <>
      <PageMeta title="Blog" description="Blog da Patro Seguros — artigos sobre seguro auto, residencial, empresarial, saúde, vida e mais. Dicas, guias e informações para proteger seu patrimônio." />
      <Header />
      <main id="main-content">
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-white mb-4">Blog Patro Seguros</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Conteúdo de autoridade sobre seguros, proteção patrimonial e dicas para você e sua empresa.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link key={article.slug} to={`/blog/${article.slug}`}>
                  <Card className="hover:shadow-lg transition-base h-full">
                    <CardContent className="pt-6">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{article.category}</span>
                      <h3 className="text-lg font-semibold mt-3 mb-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                      <span className="text-sm font-medium text-primary flex items-center">
                        Ler mais <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
