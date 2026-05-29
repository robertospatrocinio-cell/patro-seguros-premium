import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingDown, CheckCircle2, Car, Home, Building2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const insuranceTypes = [
  { id: 'auto', label: 'Auto', icon: Car, discount: 0.15, uberBonus: 0.10 },
  { id: 'residencial', label: 'Residencial', icon: Home, discount: 0.20 },
  { id: 'empresarial', label: 'Empresarial', icon: Building2, discount: 0.25 },
  { id: 'vida', label: 'Vida', icon: Heart, discount: 0.12 },
];

const LocalSavingsCalculator = () => {
  const [insuranceType, setInsuranceType] = useState('auto');
  const [currentInsurance, setCurrentInsurance] = useState(2500);
  const [hasUber, setHasUber] = useState(false);
  const [region, setRegion] = useState('centro');
  
  const selectedType = insuranceTypes.find(t => t.id === insuranceType) || insuranceTypes[0];
  const baseDiscount = selectedType.discount;
  const uberDiscount = (insuranceType === 'auto' && hasUber) ? selectedType.uberBonus || 0 : 0;
  
  const estimatedSavings = Math.round(currentInsurance * (baseDiscount + uberDiscount));
  const newPrice = currentInsurance - estimatedSavings;

  return (
    <Card className="w-full max-w-2xl mx-auto border-primary/10 shadow-xl bg-gradient-to-br from-white to-slate-50">
      <CardHeader className="text-center space-y-1">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold font-heading">Simulador de Economia Local</CardTitle>
        <p className="text-sm text-foreground/70">
          Descubra quanto você pode economizar comparando 16+ seguradoras em Guarulhos.
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Insurance Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">O que você quer proteger?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {insuranceTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Button
                    key={type.id}
                    variant={insuranceType === type.id ? "default" : "outline"}
                    className={cn(
                      "flex flex-col items-center gap-1 h-auto py-3 px-1",
                      insuranceType === type.id ? "bg-primary border-primary" : "hover:border-primary/50"
                    )}
                    onClick={() => {
                      setInsuranceType(type.id);
                      if (type.id !== 'auto') setHasUber(false);
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-bold">{type.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-foreground">Valor atual do seguro (Ano)</label>
              <span className="text-primary font-bold">R$ {currentInsurance.toLocaleString()}</span>
            </div>
            <Slider
              value={[currentInsurance]}
              onValueChange={(v) => setCurrentInsurance(v[0])}
              max={insuranceType === 'empresarial' ? 50000 : 15000}
              min={insuranceType === 'vida' ? 300 : 800}
              step={100}
              className="py-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insuranceType === 'auto' ? (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Tipo de Uso</label>
                <div className="flex gap-2">
                  <Button 
                    variant={!hasUber ? "default" : "outline"} 
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setHasUber(false)}
                  >
                    Passeio
                  </Button>
                  <Button 
                    variant={hasUber ? "default" : "outline"} 
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setHasUber(true)}
                  >
                    Uber / 99
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Perfil</label>
                <div className="flex items-center h-9 px-3 rounded-md border border-input bg-muted/30 text-xs text-foreground/60 italic">
                  Análise personalizada para Guarulhos
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Sua Região em Guarulhos</label>
              <select 
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="centro">Centro / Cidade Maia</option>
                <option value="cumbica">Cumbica / Pimentas</option>
                <option value="vila-augusta">Vila Augusta / Gopoúva</option>
                <option value="maia">Parque Continental / Maia</option>
                <option value="outros">Outros Bairros</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingDown className="w-24 h-24 text-primary" />
          </div>
          
          <div className="relative z-10 text-center space-y-4">
            <p className="text-sm font-medium text-foreground/60 uppercase tracking-[0.2em]">Economia Estimada</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl md:text-5xl font-black text-primary tracking-tighter">
                R$ {estimatedSavings.toLocaleString()}
              </span>
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold">-{Math.round((estimatedSavings/currentInsurance)*100)}%</span>
            </div>
            <p className="text-sm text-foreground/80 max-w-[300px] mx-auto">
              Seu novo preço estimado: <strong className="text-foreground">R$ {newPrice.toLocaleString()}</strong>
            </p>
          </div>
        </div>

        {/* Benefits List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Cotação em 16+ Seguradoras",
            "Análise do CEP de Guarulhos",
            "Desconto para Motorista APP",
            "Atendimento Humano VIP"
          ].map((text) => (
            <div key={text} className="flex items-center gap-2 text-[11px] font-medium text-foreground/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              {text}
            </div>
          ))}
        </div>

        <Link to="/cotacao?tipo=auto" className="block w-full">
          <Button className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20 group">
            Cotar meu seguro agora
            <TrendingDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default LocalSavingsCalculator;
