import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCommercialMetrics } from "@/hooks/queries/useCommercialMetrics";
import { buildCommercialMetrics } from "@/lib/commercialMetrics";

function Breakdown({ title, rows }: { title: string; rows: { label: string; count: number }[] }) {
  return <Card>
    <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
    <CardContent className="max-h-80 overflow-auto">
      {rows.length === 0 ? <p className="text-sm text-muted-foreground">Nenhum lead registrado neste período.</p> :
        <ul className="divide-y">{rows.map(row => <li key={row.label} className="flex justify-between gap-4 py-2 text-sm">
          <span className="break-words min-w-0">{row.label}</span><strong className="tabular-nums shrink-0">{row.count}</strong>
        </li>)}</ul>}
    </CardContent>
  </Card>;
}

export default function CommercialDashboard() {
  const [days, setDays] = useState(30);
  const query = useCommercialMetrics(days);
  const metrics = useMemo(() => query.data ? buildCommercialMetrics(query.data) : null, [query.data]);
  const dateLabel = (value: string) => new Date(value).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  return <section aria-labelledby="commercial-title" className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h2 id="commercial-title" className="text-2xl font-bold text-primary">Origem e resultado comercial</h2>
        <p className="text-sm text-muted-foreground max-w-2xl">Registros reais do CRM e cliques registrados no site. Sem estimativas de visitantes ou vendas.</p>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-sm font-medium space-y-1">Período
          <select className="block h-10 rounded-md border border-input bg-background px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={days} onChange={event => setDays(Number(event.target.value))}>
            <option value={7}>Últimos 7 dias</option><option value={30}>Últimos 30 dias</option><option value={60}>Últimos 60 dias</option><option value={90}>Últimos 90 dias</option>
          </select>
        </label>
        <Button variant="outline" onClick={() => query.refetch()} disabled={query.isFetching}>
          <RefreshCw aria-hidden="true" className="w-4 h-4 mr-2" />{query.isFetching ? "Consultando…" : "Atualizar indicadores"}
        </Button>
      </div>
    </div>
    {query.isPending && <p role="status">Consultando os registros do período…</p>}
    {query.isError && <div role="alert" className="rounded-lg border border-destructive p-4">
      <p>Indicadores indisponíveis: {query.error instanceof Error ? query.error.message : "Tente atualizar sua sessão."}</p>
      <p className="text-sm mt-1">Nenhum zero ou total parcial é apresentado como resultado desta consulta.</p>
    </div>}
    {!query.isError && metrics && query.data && <>
      <p className="text-xs text-muted-foreground">Janela consultada: {dateLabel(query.data.start)} até {dateLabel(query.data.end)}. Horários no fuso do seu dispositivo.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          ["Leads registrados", metrics.total, "Linhas confirmadas no CRM; não são pessoas únicas."],
          ["Cliques no WhatsApp", metrics.whatsapp, "Intenção de contato; não comprova mensagem recebida."],
          ["Cliques em cotação", metrics.quote, "Abertura do caminho de cotação; não é lead enviado."],
          ["Apólices cadastradas", metrics.policies, "Cadastros com número criados no período, de todos os canais; não comprova emissão ou venda do site."],
        ].map(([title, value, description]) => <Card key={title}>
          <CardHeader className="pb-2"><CardTitle className="text-sm">{title}</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold tabular-nums">{value}</p><p className="text-xs text-muted-foreground mt-2">{description}</p></CardContent>
        </Card>)}
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Andamento dos leads captados no período</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>{metrics.proposalStage}</strong> atualmente em “Proposta Enviada”; <strong>{metrics.wonStage}</strong> em “Fechado / Ganho”.</p>
          <p className="text-muted-foreground">É uma fotografia da etapa atual, não o total histórico de propostas emitidas ou fechamentos ocorridos no período. Contato realizado não é qualificação. A etapa do Pipeline tem prioridade sobre o status antigo.</p>
          <p>Entrada identificada em {metrics.withLanding} de {metrics.total} leads; campanha identificada em {metrics.withCampaign} de {metrics.total}. Ausência de UTM não significa tráfego direto.</p>
          <p className="text-muted-foreground">{metrics.beforeAnalytics} cliques foram registrados antes de analytics estar carregado. Os números locais podem diferir do GA4 por consentimento, bloqueadores, repetição e cobertura dos botões.</p>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Breakdown title="Leads por modalidade" rows={metrics.byType} />
        <Breakdown title="Leads por origem / mídia" rows={metrics.byChannel} />
        <Breakdown title="Leads por campanha" rows={metrics.byCampaign} />
        <Breakdown title="Etapa atual dos leads" rows={metrics.byStage} />
        <Breakdown title="Página de entrada" rows={metrics.byLanding} />
        <Breakdown title="Fonte cadastrada no CRM" rows={metrics.byOrigin} />
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Captação por página</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table><TableHeader><TableRow><TableHead>Página do registro</TableHead><TableHead>Leads</TableHead><TableHead>Cliques WhatsApp</TableHead><TableHead>Cliques cotação</TableHead></TableRow></TableHeader>
            <TableBody>{metrics.byPage.map(row => <TableRow key={row.label}>
              <TableCell className="break-all min-w-48">{row.label}</TableCell><TableCell>{row.leads}</TableCell><TableCell>{row.whatsapp}</TableCell><TableCell>{row.quote}</TableCell>
            </TableRow>)}</TableBody></Table>
          {metrics.byPage.length === 0 && <p className="text-sm py-4">Nenhum lead ou clique registrado neste período.</p>}
          <p className="text-xs text-muted-foreground mt-3">Leads agrupados pela página de envio; cliques pela página onde ocorreram. Não há ligação individual entre esses registros. Não divida leads por cliques para calcular a conversão do site.</p>
        </CardContent>
      </Card>
    </>}
    <Card>
      <CardHeader><CardTitle className="text-base">O que ainda não pode ser medido aqui</CardTitle></CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p><strong className="text-foreground">Visitantes orgânicos e conversão por visita:</strong> indisponíveis, sem sessões/visitantes do GA4 integrados. Cliques do Search Console não equivalem a visitantes.</p>
        <p><strong className="text-foreground">Leads qualificados:</strong> indisponíveis, sem critério comercial de qualificação acordado e registrado.</p>
        <p><strong className="text-foreground">Propostas e apólices atribuídas ao site:</strong> indisponíveis, sem vínculo confiável entre lead, proposta e apólice e sem histórico de transições. Não cruzamos nomes, e-mails ou telefones por aproximação.</p>
        <p><strong className="text-foreground">Receita atribuível:</strong> indisponível. Prêmio, comissão prevista e receita recebida são conceitos diferentes; os cadastros existentes não comprovam receita do site.</p>
        <p><strong className="text-foreground">WhatsApp:</strong> os indicadores representam apenas cliques instrumentados, não conversas, solicitações recebidas ou contatos únicos. E-mail enviado sem registro no CRM também não entra no total de leads.</p>
      </CardContent>
    </Card>
  </section>;
}
