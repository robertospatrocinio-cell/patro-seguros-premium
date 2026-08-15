import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Bike, Home, Users, Heart, Building2, Truck, Package, ShieldCheck, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const options = [
  { label: 'Pessoa Física', icon: User, path: '/seguro-pessoa-fisica' },
  { label: 'Minha Empresa', icon: Building2, path: '/seguro-empresa' },
  { label: 'Sou Autônomo', icon: Settings, path: '/seguro-autonomo' },
  { label: 'Minha Família', icon: Users, path: '/seguro-familia' },
  { label: 'Meu Carro', icon: Car, path: '/seguro-auto' },
  { label: 'Minha Moto', icon: Bike, path: '/seguro-moto' },
  { label: 'Minha Casa', icon: Home, path: '/seguro-residencial' },
  { label: 'Minha Saúde', icon: Heart, path: '/planos-de-saude' },
  { label: 'Minha Frota', icon: Truck, path: '/seguro-frota' },
  { label: 'Meu Patrimônio', icon: ShieldCheck, path: '/seguros-de-patrimonio' },
];

const HomeSelectorImpl = () => {
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

// memo: blindagem defensiva — hoje o pai (Index) não passa props e não
// tem state que mude após mount, mas isolar evita regressões futuras se
// Index ganhar state que force um re-render do subtree.
export const HomeSelector = memo(HomeSelectorImpl);
