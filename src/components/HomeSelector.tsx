import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Bike, Home, Users, Heart, Building2, Truck, Package, ShieldCheck, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const options = [
  { label: 'Meu carro', icon: Car, path: '/seguro-auto' },
  { label: 'Minha moto', icon: Bike, path: '/seguro-moto' },
  { label: 'Minha casa', icon: Home, path: '/seguro-residencial' },
  { label: 'Minha família', icon: Users, path: '/seguro-vida' },
  { label: 'Minha saúde', icon: Heart, path: '/planos-de-saude' },
  { label: 'Minha empresa', icon: Building2, path: '/seguro-empresarial' },
  { label: 'Minha frota', icon: Truck, path: '/seguro-frota' },
  { label: 'Minha carga', icon: Package, path: '/seguro-transporte' },
  { label: 'Meu patrimônio', icon: ShieldCheck, path: '/seguros-de-patrimonio' },
  { label: 'Minhas máquinas', icon: Settings, path: '/seguro-maquinas' },
];

export const HomeSelector = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-background border-b" aria-label="O que você quer proteger?">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">O que você quer proteger?</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => navigate(option.path)}
              className="flex flex-col items-center justify-center p-6 bg-card hover:bg-primary/5 rounded-xl border transition-all shadow-sm hover:shadow-md"
            >
              <option.icon className="h-8 w-8 text-primary mb-3" aria-hidden="true" />
              <span className="text-[14px] font-semibold text-foreground text-center">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
