import { Link } from "react-router-dom";
import ExternalLink from "@/components/ExternalLink";

const COMPARISON_ROWS = [
  ["Preço total", "Prêmio total, encargos, parcelamento e validade da proposta.", "Uma parcela menor não significa menor custo total."],
  ["Casco", "Eventos cobertos, critério de indenização e percentual da referência, quando houver.", "Roubo/furto não equivale a cobertura de colisão; compare os mesmos eventos."],
  ["Franquia", "Valor em reais para reparos e franquias específicas de vidros e peças.", "Franquia reduzida ou majorada muda a participação do segurado no reparo."],
  ["Terceiros", "Limites separados para danos materiais, corporais e morais, se contratados.", "O limite de terceiros não é o valor segurado do próprio carro."],
  ["Assistência e carro reserva", "Quilometragem de guincho, usos permitidos, diárias e condições da locadora.", "Assistência não é necessariamente ilimitada nem carro reserva automático."],
  ["Perfil e aceitação", "Mesmo CEP de pernoite, condutores, uso, bônus, acessórios e vigência.", "Aplicativo, entregas, blindagem e outras alterações exigem declaração e análise."],
];

const linkClass = "text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm";

export default function AutoQuoteDecisionGuide() {
  return (
    <section id="comparar-propostas-auto" aria-labelledby="comparar-auto-heading" className="py-14 bg-muted scroll-mt-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 id="comparar-auto-heading" className="text-2xl md:text-3xl font-bold mb-4">Compare propostas de seguro auto, não só parcelas</h2>
        <p className="text-muted-foreground max-w-3xl mb-6">Não há uma média de preço por bairro publicada aqui: sem amostra, período e condições equivalentes, um número não representa sua cotação em Guarulhos. Use a mesma ficha de perfil e a mesma data de início para pedir as opções disponíveis.</p>
        <p id="auto-table-help" className="text-sm text-muted-foreground mb-3">No celular, deslize a tabela para comparar os critérios.</p>
        <div role="region" aria-label="Roteiro para comparar propostas de seguro auto" aria-describedby="auto-table-help" tabIndex={0} className="overflow-x-auto border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <table className="w-full min-w-[680px] text-left text-sm bg-card">
            <caption className="sr-only">Critérios para registrar em cada proposta de seguro auto</caption>
            <thead className="bg-primary text-primary-foreground"><tr><th scope="col" className="p-4">Critério</th><th scope="col" className="p-4">Anote em cada proposta</th><th scope="col" className="p-4">Por que importa</th></tr></thead>
            <tbody>{COMPARISON_ROWS.map(([title, record, reason]) => <tr key={title} className="border-t border-border"><th scope="row" className="p-4 align-top font-semibold">{title}</th><td className="p-4 align-top">{record}</td><td className="p-4 align-top text-muted-foreground">{reason}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          <div>
            <h3 className="font-semibold text-lg mb-3">O que separar antes de cotar</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>Modelo, versão, ano e informações dos condutores habituais.</li>
              <li>CEP de pernoite e utilização real: particular, profissional, aplicativo ou entregas.</li>
              <li>Apólice atual e classe de bônus, se houver; informe também blindagem e acessórios.</li>
              <li>Preferências de cobertura e limites. Envie documentos somente pelos canais oficiais orientados pela equipe.</li>
            </ul>
            <Link to="/cotacao?tipo=auto" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Pedir propostas para meu perfil</Link>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Referências para conferir a proposta</h3>
            <ul className="space-y-3 text-sm">
              <li><ExternalLink href="https://veiculos.fipe.org.br/" className={linkClass}>Tabela FIPE oficial</ExternalLink> — é referência de preço médio do veículo, não tabela de preço do seguro. Confira a base, o percentual e as regras de indenização na apólice.</li>
              <li><ExternalLink href="https://www.gov.br/susep/pt-br/assuntos/seguros/seguro-automovel" className={linkClass}>SUSEP: orientações sobre seguro de automóvel</ExternalLink> — consulte as modalidades e os conceitos para entender o contrato.</li>
              <li><Link to="/consulta-tabela-fipe" className={linkClass}>Como consultar a FIPE e usar a referência na comparação</Link>.</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">A proposta e as condições oficiais da seguradora são as fontes para preço, franquias, limites e exclusões. Confirme aceitação, eventuais exigências e vigência; solicitar cotação não inicia cobertura.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
