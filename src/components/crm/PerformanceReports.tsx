import { useMemo, useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Building2,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
  Download
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInsuranceSales } from "@/hooks/queries/useInsuranceSales";
import { toast } from "sonner";
import * as XLSX from "xlsx";

const PerformanceReports = () => {
  const { data: sales = [], isLoading } = useInsuranceSales();
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear().toString());

  const availableYears = useMemo(() => {
    const years = new Set<string>();
    sales.forEach(sale => {
      years.add(new Date(sale.sale_date).getFullYear().toString());
    });
    if (years.size === 0) years.add(new Date().getFullYear().toString());
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [sales]);

  const stats = useMemo(() => {
    const selectedYear = parseInt(yearFilter);
    const lastYear = selectedYear - 1;

    const currentYearData: Record<string, { total: number, count: number, byMonth: number[] }> = {};
    const lastYearData: Record<string, { total: number, count: number }> = {};

    sales.forEach(sale => {
      const saleDate = new Date(sale.sale_date);
      const year = saleDate.getFullYear();
      const month = saleDate.getMonth();
      const carrier = sale.carrier;

      if (year === selectedYear) {
        if (!currentYearData[carrier]) {
          currentYearData[carrier] = { total: 0, count: 0, byMonth: new Array(12).fill(0) };
        }
        currentYearData[carrier].total += Number(sale.amount);
        currentYearData[carrier].count += 1;
        currentYearData[carrier].byMonth[month] += Number(sale.amount);
      } else if (year === lastYear) {
        if (!lastYearData[carrier]) {
          lastYearData[carrier] = { total: 0, count: 0 };
        }
        lastYearData[carrier].total += Number(sale.amount);
        lastYearData[carrier].count += 1;
      }
    });

    const report = Object.entries(currentYearData).map(([name, current]) => {
      const last = lastYearData[name] || { total: 0, count: 0 };
      const growth = last.total === 0 ? 100 : ((current.total - last.total) / last.total) * 100;
      
      return {
        name,
        total: current.total,
        count: current.count,
        lastYearTotal: last.total,
        growth,
        byMonth: current.byMonth
      };
    }).sort((a, b) => b.total - a.total);

    return report;
  }, [sales, yearFilter]);

  const totals = useMemo(() => {
    return stats.reduce((acc, curr) => ({
      total: acc.total + curr.total,
      count: acc.count + curr.count,
      lastYearTotal: acc.lastYearTotal + curr.lastYearTotal
    }), { total: 0, count: 0, lastYearTotal: 0 });
  }, [stats]);

  const handleExport = () => {
    if (stats.length === 0) {
      toast.error("Sem dados para exportar");
      return;
    }

    const exportData = stats.map(s => ({
      "Seguradora": s.name,
      "Volume Anual": s.total,
      "Vendas": s.count,
      "Ano Anterior": s.lastYearTotal,
      "Crescimento %": s.growth.toFixed(2)
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Relatorio_Desempenho");
    XLSX.writeFile(wb, `desempenho_seguradoras_${yearFilter}.xlsx`);
    toast.success("Relatório exportado!");
  };

  if (isLoading) return <Skeleton className="h-[600px] w-full" />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Relatório de Desempenho Estratégico
          </h2>
          <p className="text-muted-foreground">Comparativos anuais para reuniões com seguradoras</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[120px] h-9">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleExport} variant="outline" size="sm" className="h-9">
            <Download className="w-4 h-4 mr-2" />
            Exportar XLS
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Produção Total ({yearFilter})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              R$ {totals.total.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {totals.total >= totals.lastYearTotal ? (
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-xs font-medium ${totals.total >= totals.lastYearTotal ? 'text-green-600' : 'text-red-600'}`}>
                {totals.lastYearTotal === 0 ? "100" : (((totals.total - totals.lastYearTotal) / totals.lastYearTotal) * 100).toFixed(1)}% vs ano ant.
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totals.count}</div>
            <p className="text-xs text-muted-foreground mt-1">Apólices emitidas no período</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Market Share Top Seguradora</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {stats[0] ? ((stats[0].total / totals.total) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">{stats[0]?.name || "Nenhuma"}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm border-none overflow-hidden">
        <CardHeader className="border-b border-slate-50">
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Ranking por Performance Anual
          </CardTitle>
          <CardDescription>Detalhamento pronto para apresentação</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="pl-6">Seguradora</TableHead>
                <TableHead>Volume ({yearFilter})</TableHead>
                <TableHead>Vendas</TableHead>
                <TableHead>Crescimento</TableHead>
                <TableHead className="hidden lg:table-cell">Distribuição Mensal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.map((row) => (
                <TableRow key={row.name} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-semibold text-slate-900 pl-6">{row.name}</TableCell>
                  <TableCell>R$ {row.total.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>{row.count}</TableCell>
                  <TableCell>
                    <Badge className={row.growth >= 0 ? "bg-green-100 text-green-700 border-none" : "bg-red-100 text-red-700 border-none"}>
                      {row.growth >= 0 ? "+" : ""}{row.growth.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell min-w-[200px]">
                    <div className="flex items-end gap-0.5 h-8">
                      {row.byMonth.map((val, i) => {
                        const max = Math.max(...row.byMonth);
                        const height = max === 0 ? 0 : (val / max) * 100;
                        return (
                          <div 
                            key={i} 
                            className="flex-1 bg-primary/20 hover:bg-primary transition-colors rounded-t-sm" 
                            style={{ height: `${Math.max(height, 5)}%` }}
                            title={`Mês ${i+1}: R$ ${val.toLocaleString('pt-BR')}`}
                          />
                        );
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceReports;