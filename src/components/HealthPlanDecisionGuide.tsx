import { Link } from "react-router-dom";
import ExternalLink from "@/components/ExternalLink";

const NETWORK_CHECKS = [
  { name: "Hospital Stella Maris", check: "Confirmar a unidade, pronto-socorro, internação e especialidades necessárias." },
  { name: "Hospital Carlos Chagas", check: "Confirmar a unidade e se o serviço desejado integra o produto cotado." },
  { name: "Hospital e Maternidade Guarulhos", check: "Confirmar internação e, se necessária, cobertura obstétrica no produto." },
  { name: "Hospital São Luiz", check: "Identificar a unidade e o município antes de consultar o atendimento pretendido." },
  { name: "Lavoisier e Sanitas", check: "Informar a unidade e o exame; a aceitação pode variar por serviço e produto." },
];

const PROFILES = [
  { name: "PME com 2 vidas", inputs: "Idade de cada pessoa, CNPJ, vínculo dos beneficiários e CEP.", comparison: "Confirmar se o produto aceita duas vidas e esses vínculos. Comparar mensalidade total, custo por pessoa e coparticipação." },
  { name: "MEI", inputs: "Tempo de atividade, comprovação cadastral, idades, vínculos e quantidade de vidas.", comparison: "Verificar elegibilidade e mínimo de vidas por produto. Ter MEI não garante aceitação, redução de carência ou preço menor." },
  { name: "Individual ou familiar", inputs: "Idades, dependentes, CEP e hospitais de interesse.", comparison: "Confirmar oferta para pessoa física. Distinguir contrato individual/familiar de coletivo por adesão e comparar reajustes e permanência." },
];

const sourceClass = "text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm";

export default function HealthPlanDecisionGuide() {
  return (
    <>
      <section id="precos-saude" aria-labelledby="precos-saude-heading" className="py-16 scroll-mt-28 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 id="precos-saude-heading" className="text-2xl md:text-3xl font-bold mb-4">Quanto custa para o seu perfil?</h2>
          <p className="text-muted-foreground max-w-3xl mb-6">Não publicamos uma faixa de preço sem tabela comercial vigente, produto identificado e origem documentada. Use este roteiro para pedir propostas comparáveis em Guarulhos, em vez de decidir por uma mensalidade anunciada sem contexto.</p>
          <div className="grid gap-6 md:grid-cols-3">
            {PROFILES.map((profile) => (
              <article key={profile.name} className="border border-border rounded-lg p-5 bg-card">
                <h3 className="text-lg font-semibold mb-3">{profile.name}</h3>
                <p className="text-sm mb-3"><strong>Para cotar: </strong>{profile.inputs}</p>
                <p className="text-sm text-muted-foreground">{profile.comparison}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 border-l-4 border-primary pl-5">
            <h3 className="font-semibold mb-2">O que deve acompanhar o preço</h3>
            <p className="text-sm text-muted-foreground max-w-3xl">Peça nome e registro ANS do produto, data e validade da proposta, preço por beneficiário, total mensal, coparticipação por procedimento, acomodação, abrangência, carências e regras de reajuste. Uma consulta com coparticipação pode gerar cobrança além da mensalidade; confirme também eventuais limites previstos no contrato.</p>
            <Link to="/comparativo-planos-saude-guarulhos" className={`inline-flex min-h-11 items-center mt-3 ${sourceClass}`}>Veja os critérios do comparativo de planos de saúde</Link>
          </div>
        </div>
      </section>

      <section id="rede-saude" aria-labelledby="rede-saude-heading" className="py-16 bg-muted scroll-mt-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 id="rede-saude-heading" className="text-2xl md:text-3xl font-bold mb-4">Hospitais e laboratórios: confirme por produto</h2>
          <p className="text-muted-foreground max-w-3xl mb-4">Esta é uma matriz de conferência de prestadores de interesse, não uma lista de rede credenciada. Sem documentação atual da operadora para cada produto, não marcamos um hospital como coberto nem atribuímos atendimento a qualquer plano.</p>
          <p id="rede-saude-scroll" className="text-sm text-muted-foreground mb-3">No celular, deslize a tabela para ver todos os campos.</p>
          <div role="region" aria-label="Matriz de conferência de rede em Guarulhos" aria-describedby="rede-saude-scroll" tabIndex={0} className="overflow-x-auto rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <table className="w-full min-w-[640px] text-left text-sm bg-card">
              <caption className="sr-only">Prestadores a consultar, verificações necessárias e situação da comprovação neste hub</caption>
              <thead className="bg-primary text-primary-foreground"><tr><th scope="col" className="p-4">Prestador de interesse</th><th scope="col" className="p-4">O que verificar na rede oficial</th><th scope="col" className="p-4">Situação neste hub</th></tr></thead>
              <tbody>{NETWORK_CHECKS.map((row) => <tr key={row.name} className="border-t border-border"><th scope="row" className="p-4 font-semibold align-top">{row.name}</th><td className="p-4 align-top">{row.check}</td><td className="p-4 align-top text-muted-foreground">Credenciamento não confirmado por produto.</td></tr>)}</tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold mt-8 mb-3">Como validar antes de contratar ou agendar</h3>
          <ol className="list-decimal pl-5 space-y-3 text-sm text-muted-foreground max-w-3xl">
            <li>Identifique o nome comercial e o registro ANS do produto na proposta. A marca da operadora, sozinha, não define a rede.</li>
            <li>Abra a busca de rede no site oficial da operadora. Filtre produto, município, unidade e serviço desejado; confirme também acomodação e abrangência.</li>
            <li>Guarde a consulta com data, identificação do produto e protocolo. Confirme a informação com a operadora, inclusive antes de usar o atendimento, pois a rede pode mudar.</li>
          </ol>
          <p className="mt-5 text-sm text-muted-foreground">Pontos de partida oficiais: <ExternalLink href="https://www.amil.com.br/" className={sourceClass}>Amil</ExternalLink>{", "}<ExternalLink href="https://www.bradescosaude.com.br/" className={sourceClass}>Bradesco Saúde</ExternalLink>{", "}<ExternalLink href="https://portal.sulamericaseguros.com.br/" className={sourceClass}>SulAmérica</ExternalLink>{" e "}<ExternalLink href="https://www.portoseguro.com.br/" className={sourceClass}>Porto</ExternalLink>. Procure a opção de rede referenciada/credenciada e selecione o produto; estes links não confirmam contratação ou cobertura.</p>
          <div id="fontes-saude" className="mt-8 pt-6 border-t border-border scroll-mt-28">
            <h3 className="font-semibold mb-3">Fontes para conferir as regras</h3>
            <ul className="text-sm space-y-3">
              <li><ExternalLink href="https://www.ans.gov.br/gpw-beneficiario/" className={sourceClass}>Guia ANS de Planos de Saúde</ExternalLink> — consulte produtos e os procedimentos de portabilidade.</li>
              <li><ExternalLink href="https://www.gov.br/ans/pt-br/assuntos/consumidor" className={sourceClass}>ANS: orientações ao consumidor</ExternalLink> — confira contratação, carências e reajustes.</li>
              <li><ExternalLink href="https://www.planalto.gov.br/ccivil_03/leis/l9656.htm" className={sourceClass}>Lei nº 9.656/1998</ExternalLink> — marco legal dos planos de saúde.</li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">Os links são referências para consulta. Este conteúdo não é uma confirmação em tempo real de preços, rede ou disponibilidade de produtos.</p>
          </div>
        </div>
      </section>
    </>
  );
}
