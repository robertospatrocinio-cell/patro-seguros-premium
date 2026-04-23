import { useEffect, useMemo, useState } from "react";
import { Activity, BarChart3, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ConversionClickEvent {
  id: string;
  event_type: "cotacao_click" | "whatsapp_click";
  source: string | null;
  page_path: string | null;
  analytics_loaded: boolean;
  seconds_since_page_start: number | null;
  created_at: string;
}

const ConversionDashboard = () => {
  const [events, setEvents] = useState<ConversionClickEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("conversion_click_events" as any)
      .select("id,event_type,source,page_path,analytics_loaded,seconds_since_page_start,created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    setEvents((data as unknown as ConversionClickEvent[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    const intervalId = window.setInterval(fetchEvents, 15000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const stats = useMemo(() => {
    const by = (type: ConversionClickEvent["event_type"], loaded: boolean) =>
      events.filter((event) => event.event_type === type && event.analytics_loaded === loaded).length;
    return {
      total: events.length,
      cotacaoBefore: by("cotacao_click", false),
      cotacaoAfter: by("cotacao_click", true),
      whatsappBefore: by("whatsapp_click", false),
      whatsappAfter: by("whatsapp_click", true),
    };
  }, [events]);

  const formatDate = (iso: string) => new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "medium" });
  const label = (type: ConversionClickEvent["event_type"]) => type === "cotacao_click" ? "Pedir Cotação" : "WhatsApp";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary">Painel de Conversão</h1>
            <p className="text-sm text-muted-foreground">Cliques antes e depois do carregamento do GA4/Pixel.</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchEvents} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Activity className="w-4 h-4" /> Total</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{stats.total}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Pedir Cotação</CardTitle></CardHeader>
            <CardContent className="flex gap-3"><Badge variant="secondary">Antes: {stats.cotacaoBefore}</Badge><Badge>Depois: {stats.cotacaoAfter}</Badge></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">WhatsApp</CardTitle></CardHeader>
            <CardContent className="flex gap-3"><Badge variant="secondary">Antes: {stats.whatsappBefore}</Badge><Badge>Depois: {stats.whatsappAfter}</Badge></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Últimos 100 cliques</CardTitle></CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Data</TableHead><TableHead>Evento</TableHead><TableHead>Status</TableHead><TableHead>Origem</TableHead><TableHead>Página</TableHead><TableHead>Tempo</TableHead></TableRow></TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{formatDate(event.created_at)}</TableCell>
                    <TableCell>{label(event.event_type)}</TableCell>
                    <TableCell><Badge variant={event.analytics_loaded ? "default" : "secondary"}>{event.analytics_loaded ? "Depois" : "Antes"}</Badge></TableCell>
                    <TableCell>{event.source || "geral"}</TableCell>
                    <TableCell>{event.page_path || "—"}</TableCell>
                    <TableCell>{event.seconds_since_page_start ? `${event.seconds_since_page_start}s` : "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ConversionDashboard;