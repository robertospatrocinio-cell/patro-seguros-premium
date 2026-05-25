import { useMemo, useState } from "react";
import { 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  ChevronUp, 
  ChevronDown, 
  Filter,
  BarChart3,
  Calendar
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
import { Skeleton } from "@/components/ui/skeleton";
import { useInsuranceSales } from "@/hooks/queries/useInsuranceSales";

const CarriersModule = () => {
  const { data: sales = [], isLoading } = useInsuranceSales();
  const [timeFilter, setTimeFilter] = useState("month"); // month, year

  const carrierStats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const lastYear = currentYear - 1;

    const stats: Record<string, {
      currentMonth: number;
      lastMonth: number;
      currentYear: number;
      lastYear: number;
      total: number;
    }> = {};

    sales.forEach(sale => {
      const saleDate = new Date(sale.sale_date);
      const saleMonth = saleDate.getMonth();
      const saleYear = saleDate.getFullYear();
      const carrier = sale.carrier;

      if (!stats[carrier]) {
        stats[carrier] = {
          currentMonth: 0,
          lastMonth: 0,
          currentYear: 0,
          lastYear: 0,
          total: 0
        };
      }

      stats[carrier].total += Number(sale.amount);

      if (saleYear === currentYear) {
        stats[carrier].currentYear += Number(sale.amount);
        if (saleMonth === currentMonth) {
          stats[carrier].currentMonth += Number(sale.amount);
        }
      }

      if (saleYear === lastMonthYear && saleMonth === lastMonth) {
        stats[carrier].lastMonth += Number(sale.amount);
      }

      if (saleYear === lastYear) {
        stats[carrier].lastYear += Number(sale.amount);
      }
    });

    return Object.entries(stats).map(([name, data]) => {
      const monthGrowth = data.lastMonth === 0 ? 100 : ((data.currentMonth - data.lastMonth) / data.lastMonth) * 100;
      const yearGrowth = data.lastYear === 0 ? 100 : ((data.currentYear - data.lastYear) / data.lastYear) * 100;

      return {
        name,
        ...data,
        monthGrowth,
        yearGrowth
      };
    }).sort((a, b) => b.currentMonth - a.currentMonth);
  }, [sales]);

  const topProducts = useMemo(() => {
    const products: Record<string, number> = {};
    sales.forEach(sale => {
      products[sale.insurance_type] = (products[sale.insurance_type] || 0) + 1;
    });
    return Object.entries(products)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [sales]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            Performance por Seguradora
          </h2>
          <p className="text-muted-foreground">Volume de vendas e crescimento por parceiro</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px] h-9">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Visão Mensal</SelectItem>
              <SelectItem value="year">Visão Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Melhor Performance (Mês)</CardTitle>
          </CardHeader>
          <CardContent>
            {carrierStats[0] ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900">{carrierStats[0].name}</span>
                  <Badge className="bg-green-100 text-green-700 border-none">
                    <ChevronUp className="w-3 h-3 mr-1" />
                    {carrierStats[0].monthGrowth.toFixed(1)}%
                  </Badge>
                </div>
                <p className="text-sm text-primary font-semibold mt-1">
                  R$ {carrierStats[0].currentMonth.toLocaleString('pt-BR')}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Sem dados</p>
            )}
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Seguros Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{product.name}</span>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-none h-5">
                    {product.count} vendas
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm border-none">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Ranking de Produção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-100">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead>Seguradora</TableHead>
                  <TableHead>Volume (Mês)</TableHead>
                  <TableHead>Cresc. Mensal</TableHead>
                  <TableHead>Volume (Ano)</TableHead>
                  <TableHead>Cresc. Anual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carrierStats.length > 0 ? (
                  carrierStats.map((stat) => (
                    <TableRow key={stat.name} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell className="font-semibold text-slate-900">
                        {stat.name}
                      </TableCell>
                      <TableCell>
                        R$ {stat.currentMonth.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 font-medium ${stat.monthGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.monthGrowth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {Math.abs(stat.monthGrowth).toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        R$ {stat.currentYear.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 font-medium ${stat.yearGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.yearGrowth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {Math.abs(stat.yearGrowth).toFixed(1)}%
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      Nenhum dado de produção encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarriersModule;
