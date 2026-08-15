import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Info, ArrowRight, MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-seguro-auto.webp";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { COMPARATIVO_SEGURADORAS } from "@/data/comparativoSeguradorasData";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import FAQSchema from "@/components/FAQSchema";


const ComparativoSeguradorasGuarulhos = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", url: CANONICAL_BASE_URL },
          { name: "Guia Guarulhos", url: `${CANONICAL_BASE_URL}/seguros-em-guarulhos` },
          { name: "Comparativo de Seguradoras", url: `${CANONICAL_BASE_URL}/comparativo-seguradoras-guarulhos` },
        ]}
      />
      <InsurancePageTemplate
        heroImage={heroImg}
        title="Comparativo de Seguradoras em Guarulhos: qual é a melhor para você?"
        headline="Comparativo de Seguradoras em Guarulhos: qual é a melhor para você?"
        subtitle="Comparamos critérios técnicos, agilidade no sinistro e benefícios das principais seguradoras para o seu CEP em Guarulhos."
        metaDescription="Melhor seguradora de carro em Guarulhos: comparativo real entre Porto Seguro, Tokio, Allianz, HDI e mais. Veja qual perfil se encaixa melhor no seu bairro."
        description="Não existe uma 'melhor seguradora' universal para todos os motoristas de Guarulhos. A escolha ideal depende do seu perfil de condutor, do modelo do seu veículo e, principalmente, do seu CEP de pernoite. Enquanto uma seguradora pode ser imbatível em custo-benefício na Vila Augusta, outra pode oferecer melhores condições e maior aceitação no Pimentas ou Cumbica. Na Patro Seguros, nossa consultoria analisa esses fatores técnicos para você, comparando as 16 principais seguradoras do mercado em minutos e sem custo adicional."
        icon="📊"
        customContentBeforeForm={
          <div className="space-y-12">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 bg-slate-50 border-b border-gray-100">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Tabela Comparativa de Seguradoras (Foco Guarulhos/SP)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50">
                      <TableHead className="font-bold">Seguradora</TableHead>
                      <TableHead className="font-bold">Destaque em Guarulhos</TableHead>
                      <TableHead className="font-bold">Melhor Perfil</TableHead>
                      <TableHead className="font-bold">Observações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {COMPARATIVO_SEGURADORAS.map((item) => (
                      <TableRow key={item.seguradora} className="hover:bg-slate-50/30 transition-colors">
                        <TableCell className="font-semibold text-primary">{item.seguradora}</TableCell>
                        <TableCell className="text-sm">{item.destaque}</TableCell>
                        <TableCell className="text-sm">{item.perfil}</TableCell>
                        <TableCell className="text-sm italic text-muted-foreground">{item.observacoes}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-primary/5">
                      <TableCell colSpan={4} className="p-6 text-center">
                        <p className="text-primary font-bold mb-4">Não sabe qual escolher? A Patro compara todas gratuitamente para você.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link to="/cotacao?tipo=auto" onClick={() => trackCotacaoClick("comparativo-table")}>
                            <Button className="w-full sm:w-auto font-bold">
                              Cotar agora nas 16 Seguradoras
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <a 
                            href="https://wa.me/551151997500?text=Olá! Gostaria de comparar o preço do meu seguro entre as seguradoras."
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick("comparativo-table")}
                          >
                            <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/5">
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Dúvidas no WhatsApp
                            </Button>
                          </a>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Como escolher a seguradora certa?</h2>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>A escolha da seguradora ideal envolve analisar fatores que vão muito além do preço da parcela mensal:</p>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <Check className="h-5 w-5 text-green-600 shrink-0" />
                      <strong>CEP de Pernoite:</strong> Algumas companhias possuem melhor 'apetite de risco' para bairros específicos de Guarulhos.
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-5 w-5 text-green-600 shrink-0" />
                      <strong>Perfil do Condutor:</strong> Idade, estado civil e tempo de habilitação mudam drasticamente a aceitação entre as marcas.
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-5 w-5 text-green-600 shrink-0" />
                      <strong>Modelo do Veículo:</strong> Veículos importados, SUVs ou picapes possuem seguradoras especialistas como Allianz e Tokio Marine.
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-5 w-5 text-green-600 shrink-0" />
                      <strong>Rede de Oficinas:</strong> Verificamos quais seguradoras possuem as melhores oficinas referenciadas próximas à sua casa ou trabalho.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Melhor por tipo de veículo</h2>
                <div className="space-y-4 text-slate-700">
                  <div className="pb-4 border-b border-slate-50">
                    <p className="font-bold text-primary mb-1">Carros Populares (Onix, HB20, Gol):</p>
                    <p className="text-sm">HDI e Porto Seguro costumam ser muito competitivas em preço e facilidade de contratação.</p>
                  </div>
                  <div className="pb-4 border-b border-slate-50">
                    <p className="font-bold text-primary mb-1">Importados e SUVs (BMW, Volvo, Compass):</p>
                    <p className="text-sm">Allianz e Tokio Marine oferecem coberturas robustas e limites de assistência superiores para este segmento.</p>
                  </div>
                  <div className="pb-4 border-b border-slate-50">
                    <p className="font-bold text-primary mb-1">Picapes e Utilitários (Hilux, Frontier, S10):</p>
                    <p className="text-sm">Tokio Marine e Allianz possuem clausulas específicas que protegem melhor o uso urbano e rodoviário desses veículos.</p>
                  </div>
                  <div>
                    <p className="font-bold text-primary mb-1">Empresas e Frotas:</p>
                    <p className="text-sm">Bradesco, Mapfre e AIG são focadas em gestão corporativa e altos limites de responsabilidade civil.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        coverages={[
          { title: "Consultoria Imparcial", description: "Não temos preferência por seguradora, buscamos o que é melhor para o seu bolso e proteção." },
          { title: "Análise de Bairros", description: "Ajustamos a cotação conforme a realidade de risco de cada região de Guarulhos." },
          { title: "Gestão de Sinistros", description: "Nossa equipe acompanha todo o processo junto à seguradora, garantindo agilidade." },
          { title: "Multi-Cálculo Real", description: "Consultamos simultaneamente 16+ seguradoras com seus dados reais para transparência total." },
        ]}
        whoNeeds={[
          "Quem busca renovar o seguro auto com o melhor custo-benefício",
          "Empresas de Guarulhos que precisam otimizar custos de frotas",
          "Proprietários de modelos visados (Corolla, Hilux, Onix, Compass)",
          "Motoristas que desejam assistência 24h eficiente na Dutra e Fernão Dias",
        ]}
        whyPatro={[
          "Registro oficial SUSEP 212113511 para sua total segurança",
          "Sócios com 20+ anos de experiência no mercado segurador",
          "Atendimento local no Cidade Maia, Guarulhos/SP",
          "Suporte humano dedicado e agilidade comprovada no sinistro",
        ]}
        faqs={[
          { 
            question: "Qual a melhor seguradora de carro em Guarulhos?", 
            answer: "Não existe uma resposta única. A Porto Seguro lidera em assistência e rede de oficinas locais, enquanto Tokio e HDI costumam vencer no preço para veículos populares. Allianz é excelente para modelos premium. O ideal é comparar as opções para o seu perfil específico." 
          },
          { 
            question: "A Porto Seguro é a melhor em Guarulhos?", 
            answer: "Em termos de infraestrutura de guinchos e Centros Automotivos (CAP) dentro da cidade, sim. Porém, para alguns perfis de condutor, outras seguradoras podem oferecer a mesma proteção com um custo até 25% menor." 
          },
          { 
            question: "Qual seguradora paga sinistro mais rápido?", 
            answer: "Todas as 16 seguradoras com as quais trabalhamos são reguladas pela SUSEP. Em nossa experiência em Guarulhos, Porto Seguro e Allianz possuem processos de liquidação muito eficientes e digitais." 
          },
          { 
            question: "Vale a pena contratar direto com a seguradora?", 
            answer: "Contratar com uma corretora como a Patro não custa nada a mais (a comissão é paga pela seguradora) e garante que você tenha um especialista para te defender e orientar em caso de batida ou roubo. Direto no site, você fica sozinho com o 0800." 
          },
          { 
            question: "A Patro trabalha com quais seguradoras?", 
            answer: "Trabalhamos com as 16 maiores do Brasil, incluindo Porto Seguro, Tokio Marine, Allianz, HDI, Bradesco, Mapfre, SulAmérica, Suhai, Liberty, Azul, Zurich, Sompo, AIG e outras." 
          }
        ]}
      />
      <div className="container mx-auto px-4 py-12 border-t border-slate-100">
        <h4 className="font-bold text-slate-900 mb-6 text-center">Links Úteis para Motoristas de Guarulhos</h4>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link to="/seguro-auto-guarulhos" className="text-primary hover:underline">Seguro Auto Guarulhos</Link>
          <Link to="/seguro-auto-toyota-corolla-guarulhos" className="text-primary hover:underline">Seguro Corolla</Link>
          <Link to="/seguro-auto-toyota-hilux-guarulhos" className="text-primary hover:underline">Seguro Hilux</Link>
          <Link to="/seguro-auto-hyundai-hb20-guarulhos" className="text-primary hover:underline">Seguro HB20</Link>
          <Link to="/seguro-auto-chevrolet-onix-guarulhos" className="text-primary hover:underline">Seguro Onix</Link>
          <Link to="/seguro-auto-jeep-compass-guarulhos" className="text-primary hover:underline">Seguro Compass</Link>
          <Link to="/seguro-empresarial-guarulhos" className="text-primary hover:underline">Seguro Empresarial</Link>
          <Link to="/blog/guarulhos-entre-cidades-com-maior-roubo-furto-veiculos-brasil" className="text-primary hover:underline">Artigo: Roubo e Furto em Guarulhos</Link>
        </div>
      </div>
    </>
  );
};

export default ComparativoSeguradorasGuarulhos;