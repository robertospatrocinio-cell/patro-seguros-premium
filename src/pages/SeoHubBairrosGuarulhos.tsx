import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { MapPin, Shield, CheckCircle, ArrowRight, Star, Clock, Heart, Building2, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NeighborhoodHub from "@/components/NeighborhoodHub";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import FAQSchema from "@/components/FAQSchema";
import { bairros } from "@/lib/bairrosData";
import { getCanonicalUrl } from "@/lib/canonical";

const SeoHubBairrosGuarulhos = () => {
  const canonicalUrl = getCanonicalUrl("/seguros-em-guarulhos-bairros");

   const selectedBairros = bairros.filter(b =>
     ["jardim-maia", "vila-augusta", "cumbica", "centro", "bonsucesso", "picanco", "macedo"].includes(b.id)
   );

   const neighborhoodLinks = [
     { name: "Seguro Empresarial Cumbica", link: "/seguro-empresarial-cumbica", riskLevel: "médio-alto" as any, priceRange: "Logística" },
     { name: "Seguro Residencial Centro", link: "/seguro-residencial-centro-guarulhos", riskLevel: "médio" as any, priceRange: "Centro" },
     { name: "Seguro Auto Vila Augusta", link: "/seguro-auto-vila-augusta", riskLevel: "baixo" as any, priceRange: "Residencial" },
     { name: "Plano de Saúde Cidade Maia", link: "/plano-saude-cidade-maia", riskLevel: "baixo" as any, priceRange: "Premium" },
     { name: "Seguro Empresarial Bonsucesso", link: "/seguro-empresarial-bonsucesso", riskLevel: "médio" as any, priceRange: "Industrial" },
     { name: "Seguro Residencial Jardim Maia", link: "/seguro-residencial-jardim-maia", riskLevel: "baixo" as any, priceRange: "Luxo" },
      { name: "Seguro Empresarial Pimentas", link: "/seguro-empresarial-pimentas", riskLevel: "alto" as any, priceRange: "Comércio" },
      { name: "Plano de Saúde Taboão", link: "/plano-saude-taboao-guarulhos", riskLevel: "médio" as any, priceRange: "Regional" },
      { name: "Plano de Saúde Macedo", link: "/plano-saude-macedo-guarulhos", riskLevel: "médio" as any, priceRange: "Centro" },
      { name: "Seguro Residencial Gopouva", link: "/seguro-residencial-gopouva-guarulhos", riskLevel: "baixo" as any, priceRange: "Tradição" },
      { name: "Seguro Residencial Taboão", link: "/seguro-residencial-taboao-guarulhos", riskLevel: "médio" as any, priceRange: "Residencial" },
      { name: "Seguro Empresarial Taboão", link: "/seguro-empresarial-taboao-guarulhos", riskLevel: "médio" as any, priceRange: "Comercial" },
      { name: "Seguro Empresarial Macedo", link: "/seguro-empresarial-macedo-guarulhos", riskLevel: "baixo" as any, priceRange: "Serviços" },
      { name: "Seguro Empresarial Gopouva", link: "/seguro-empresarial-gopouva-guarulhos", riskLevel: "baixo" as any, priceRange: "Lojas" },
      { name: "Plano de Saúde Gopouva", link: "/plano-saude-gopouva-guarulhos", riskLevel: "baixo" as any, priceRange: "Premium" },
     ...selectedBairros.map(b => ({
       name: `Seguros em ${b.nome}`,
       link: `/seguros-guarulhos/${b.id}`,
       riskLevel: (b.id === "cumbica" || b.id === "pimentas") ? "alto" : "baixo" as any,
       priceRange: b.id === "jardim-maia" ? "Alto Padrão" : (b.id === "cumbica" ? "Empresarial" : "Residencial")
     }))
   ];

  const faqs = [
    {
      question: "Qual a importância de um seguro com CEP de Guarulhos?",
      answer: "O CEP é um dos fatores que mais influenciam o preço do seguro. Guarulhos possui regiões com perfis de risco distintos (como Cumbica para logística e Cidade Maia para residencial). Ter um seguro configurado corretamente com seu endereço local garante que você não terá problemas com a indenização em caso de sinistro."
    },
    {
      question: "A Patro Seguros atende presencialmente em Guarulhos?",
      answer: "Sim! Nossa sede está localizada na Av. Salgado Filho, 2120, na Cidade Maia. Atendemos todos os bairros de Guarulhos com a agilidade de quem conhece as ruas da cidade."
    },
    {
      question: "Quais bairros têm o seguro auto mais barato em Guarulhos?",
      answer: "Geralmente, bairros com menor índice de roubo e furto, como Cidade Maia e Vila Augusta, tendem a ter prêmios de seguro auto mais competitivos em comparação a regiões industriais ou periféricas."
    }
  ];

  return (
    <>
      <PageMeta 
        title="Seguros em Guarulhos: Cidade Maia, Vila Augusta e Cumbica | Patro Seguros"
        description="Encontre o seguro ideal para seu bairro em Guarulhos. Especialistas em Cidade Maia, Vila Augusta e Cumbica. Proteção auto, residencial e empresarial local."
      />
      <LocalBusinessSchema />
      <FAQSchema faqs={faqs} />
      <Header />
      
      <main id="main-content">
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Breadcrumb items={[{ label: "Seguros em Guarulhos", href: "/seguros-em-guarulhos" }, { label: "Bairros Atendidos" }]} />
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                Seguros em Guarulhos: <span className="text-primary">Autoridade Regional</span> em Proteção
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                Seja na sofisticação da <span className="text-white font-semibold">Cidade Maia</span>, no crescimento da <span className="text-white font-semibold">Vila Augusta</span> ou na força logística de <span className="text-white font-semibold">Cumbica</span>, a Patro Seguros protege seu patrimônio.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full px-8 h-14 text-base font-bold shadow-lg shadow-primary/20" asChild>
                  <Link to="/cotacao">Solicitar Análise de Risco</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-bold bg-white/5 border-white/10 text-white hover:bg-white/10" asChild>
                  <a href="https://wa.me/551151997500">Falar com Consultor</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <NeighborhoodHub 
          source="hub-local-guarulhos"
          title="Hub de Seguros por Bairro"
          subtitle="Selecione seu bairro abaixo para ver coberturas específicas, análise de risco local e seguradoras mais competitivas para sua região."
          neighborhoods={neighborhoodLinks}
        />

        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Por que a localização importa para o seu seguro?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Shield className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">CEP de Pernoite</h3>
                      <p className="text-slate-600">Em cidades como Guarulhos, a diferença de preço entre bairros vizinhos pode chegar a 40% devido aos índices criminais locais.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Proximidade de Hubs</h3>
                      <p className="text-slate-600">Estar perto da Rodovia Dutra ou do Aeroporto de Cumbica exige coberturas específicas para roubo de carga e assistência 24h ágil.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Perfil do Imóvel</h3>
                      <p className="text-slate-600">Condomínios de alto padrão na Cidade Maia possuem riscos distintos de galpões logísticos em Cumbica.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar de cliente satisfeito" aria-hidden="true" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">4.9/5</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">O que dizem os clientes de Guarulhos</h3>
                <p className="text-slate-600 italic mb-6">"A Patro conhece Guarulhos como ninguém. Moro na Vila Augusta e eles conseguiram reduzir o custo do meu seguro auto em 25% comparado ao banco, com uma cobertura muito melhor."</p>
                <div className="flex items-center gap-3">
                  <div className="font-bold text-slate-900">Ricardo S.</div>
                  <div className="text-slate-400 text-sm">• Cliente há 5 anos</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes sobre Seguros em Guarulhos</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sua operação logística ou seu lar está realmente protegido?</h2>
            <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg">Não deixe sua segurança nas mãos de algoritmos genéricos. Fale com quem é autoridade em Guarulhos há mais de 30 anos.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="rounded-full px-10 h-14 text-base font-bold" asChild>
                <Link to="/cotacao">Pedir Cotação Agora</Link>
              </Button>
              <Button size="lg" className="rounded-full px-10 h-14 text-base font-bold bg-white/10 hover:bg-white/20 border-white/20 text-white" asChild>
                <a href="https://wa.me/551151997500">WhatsApp Direto</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default SeoHubBairrosGuarulhos;