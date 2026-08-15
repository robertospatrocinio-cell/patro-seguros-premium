import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Info } from "lucide-react";
import heroImg from "@/assets/hero-seguro-auto.webp";

const ComparativoSeguradorasGuarulhos = () => {
  const comparativoData = [
    { seguradora: "Porto Seguro", assist: "Elite 24h", oficinas: "Ampla (Guarulhos)", perfil: "Premium / Completo" },
    { seguradora: "Tokio Marine", assist: "Completa", oficinas: "Muito Boa", perfil: "Custo-Benefício" },
    { seguradora: "Allianz", assist: "Global", oficinas: "Alta Qualidade", perfil: "Frota / Premium" },
    { seguradora: "HDI Seguros", assist: "Ágil", oficinas: "Eficiente", perfil: "Popular / Ágil" },
    { seguradora: "Azul Seguros", assist: "Essencial", oficinas: "Rede Porto", perfil: "Econômico" },
    { seguradora: "Libery Seguros", assist: "Personalizada", oficinas: "Boa", perfil: "Perfil Específico" },
  ];

  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Comparativo de Seguradoras em Guarulhos | Patro"
      headline="Qual a Melhor Seguradora para você em Guarulhos?"
      subtitle="Comparamos critérios técnicos, preços e benefícios das principais seguradoras do mercado."
      metaDescription="Comparativo completo de seguradoras em Guarulhos. Veja tabelas de benefícios, oficinas e suporte para Porto, Allianz, Tokio Marine e mais. Simule agora."
      description="Na Patro Seguros, analisamos além do preço. Nossa consultoria compara a rede de atendimento local em Guarulhos, a agilidade na liquidação de sinistros e o custo-benefício real de cada apólice para o seu CEP específico."
      icon="📊"
      customContentBeforeForm={
        <div className="mb-12 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-50 border-b border-gray-100">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Tabela Comparativa de Benefícios (Foco Guarulhos)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="font-bold">Seguradora</TableHead>
                  <TableHead className="font-bold">Assistência 24h</TableHead>
                  <TableHead className="font-bold">Rede em Guarulhos</TableHead>
                  <TableHead className="font-bold">Perfil Ideal</TableHead>
                  <TableHead className="text-center font-bold">Cotação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparativoData.map((item) => (
                  <TableRow key={item.seguradora} className="hover:bg-slate-50/30 transition-colors">
                    <TableCell className="font-semibold text-primary">{item.seguradora}</TableCell>
                    <TableCell>{item.assist}</TableCell>
                    <TableCell>{item.oficinas}</TableCell>
                    <TableCell>{item.perfil}</TableCell>
                    <TableCell className="text-center">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 bg-slate-50 text-sm text-slate-600 italic">
            * Análise baseada em dados técnicos de 2026 e feedback de sinistros em Guarulhos/SP.
          </div>
        </div>
      }
      coverages={[
        { title: "Consultoria Imparcial", description: "Não temos preferência por seguradora, buscamos o que é melhor para o cliente." },
        { title: "Análise de CEP", description: "Preços calculados com base na criminalidade e risco real de cada bairro de Guarulhos." },
        { title: "Rede de Oficinas", description: "Verificamos as melhores oficinas referenciadas próximas à sua residência." },
        { title: "Suporte no Sinistro", description: "Gestão completa da comunicação com a seguradora para evitar burocracia." },
      ]}
      whoNeeds={[
        "Quem busca renovar o seguro auto com melhor preço",
        "Empresas que precisam comparar custos de frotas",
        "Novos proprietários de veículos em Guarulhos",
        "Pessoas que tiveram experiências ruins com assistências anteriores",
      ]}
      whyPatro={[
        "Acesso direto a 16+ seguradoras líderes",
        "Know-how técnico de 20+ anos no mercado",
        "Especialistas em regulação de sinistros",
        "Atendimento personalizado via WhatsApp em minutos",
      ]}
      faqs={[
        { 
          question: "Qual seguradora tem o melhor guincho em Guarulhos?", 
          answer: "A Porto Seguro é reconhecida pela densidade de sua frota de guinchos, oferecendo o menor tempo de espera na região do Centro e Dutra." 
        },
        { 
          question: "A seguradora mais barata é sempre a pior?", 
          answer: "Nem sempre. Muitas vezes uma seguradora está com uma campanha agressiva para um perfil específico. Analisamos se a economia não compromete a cobertura essencial." 
        },
        { 
          question: "Como é feito o comparativo de preços?", 
          answer: "Utilizamos sistemas de multicálculo que consultam simultaneamente as 16 principais seguradoras com os seus dados reais." 
        },
        { 
          question: "Posso comparar seguro de vida e saúde também?", 
          answer: "Sim, realizamos comparativos técnicos para todas as modalidades de seguro, incluindo planos de saúde empresariais." 
        }
      ]}
    />
  );
};

export default ComparativoSeguradorasGuarulhos;