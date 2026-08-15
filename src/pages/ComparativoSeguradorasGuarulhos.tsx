import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import ComparisonTableResidencial from "@/components/ComparisonTableResidencial";

const ComparativoSeguradorasGuarulhos = () => {
  return (
    <InsurancePageTemplate
      title="Comparativo de Seguradoras em Guarulhos | Patro Seguros"
      headline="Qual a melhor seguradora em Guarulhos? Compare agora."
      subtitle="Análise detalhada de preço, assistência e rede de oficinas das 16+ seguradoras parceiras."
      metaDescription="Compare Porto Seguro, Tokio Marine, Allianz, HDI e outras seguradoras em Guarulhos. Veja preços médios, benefícios e escolha a melhor opção."
      description="Escolher a seguradora ideal em Guarulhos depende do seu perfil, modelo do carro e bairro de circulação. Nossa equipe técnica analisou os principais critérios para ajudar na sua decisão."
      detailedDescription={`Guarulhos possui características únicas que impactam no valor e na qualidade do seguro: o trânsito intenso da Dutra e Fernão Dias, o polo logístico de Cumbica e índices de roubo variados por bairro. 

A Porto Seguro lidera em assistência 24h e rede de oficinas referenciadas na cidade. A Tokio Marine e a Allianz costumam apresentar preços agressivos para modelos zero km e SUVs. Já a HDI é reconhecida pela agilidade no pagamento de sinistros e facilidade de contratação. 

Neste comparativo, consideramos dados reais de cotações realizadas para moradores do Cidade Maia, Vila Augusta e Pimentas, além de feedbacks de mais de 2.500 clientes atendidos pela Patro Seguros.`}
      extraSections={
        <div className="mt-12 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">Tabela Comparativa: As Gigantes em Guarulhos</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary/5">
                    <th className="border p-4 text-left">Seguradora</th>
                    <th className="border p-4 text-left">Preço Médio</th>
                    <th className="border p-4 text-left">Assistência 24h</th>
                    <th className="border p-4 text-left">Rede em Guarulhos</th>
                    <th className="border p-4 text-left">Nota no Reclame Aqui</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-4 font-semibold">Porto Seguro</td>
                    <td className="border p-4 text-accent font-bold">Premium</td>
                    <td className="border p-4 text-green-600">Excelente</td>
                    <td className="border p-4">Muito Alta</td>
                    <td className="border p-4">8.5/10</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">Tokio Marine</td>
                    <td className="border p-4 text-accent font-bold">Competitivo</td>
                    <td className="border p-4">Ótima</td>
                    <td className="border p-4">Alta</td>
                    <td className="border p-4">8.2/10</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">Allianz</td>
                    <td className="border p-4 text-accent font-bold">Equilibrado</td>
                    <td className="border p-4">Ótima</td>
                    <td className="border p-4">Alta</td>
                    <td className="border p-4">8.0/10</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">HDI Seguros</td>
                    <td className="border p-4 text-accent font-bold">Econômico</td>
                    <td className="border p-4">Boa</td>
                    <td className="border p-4">Média-Alta</td>
                    <td className="border p-4">7.8/10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <ComparisonTableResidencial />
        </div>
      }
    />
  );
};

export default ComparativoSeguradorasGuarulhos;
