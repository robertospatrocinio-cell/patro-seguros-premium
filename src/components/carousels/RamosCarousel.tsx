import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CarouselShell from "./CarouselShell";

import imgAuto from "@/assets/hero-seguro-auto.webp";
import imgMoto from "@/assets/hero-seguro-moto.webp";
import imgResidencial from "@/assets/hero-seguro-residencial.webp";
import imgVida from "@/assets/hero-seguro-vida.webp";
import imgEmpresarial from "@/assets/hero-seguro-empresarial.webp";
import imgCondominio from "@/assets/hero-seguro-condominio.webp";
import imgViagem from "@/assets/hero-seguro-viagem.webp";
import imgCelular from "@/assets/hero-seguro-celular.webp";
import imgEmpresa from "@/assets/hero-empresa.webp";
import imgSaude from "@/assets/hero-planos-saude.webp";
import imgFrota from "@/assets/hero-seguro-frota.webp";
import imgMaquinas from "@/assets/hero-seguro-maquinas.webp";
import imgRural from "@/assets/hero-seguro-rural.webp";
import imgRc from "@/assets/hero-seguro-rc.webp";
import imgTransporte from "@/assets/hero-seguro-transporte.webp";

interface Ramo {
  title: string;
  desc: string;
  path: string;
  image: string;
  alt: string;
}

/** Ramos já publicados no site — URLs preservadas. */
const RAMOS: Ramo[] = [
  { title: "Seguro Auto", desc: "Cobertura compreensiva, assistência 24h e comparação entre 16 seguradoras.", path: "/seguro-auto-guarulhos", image: imgAuto, alt: "Carro protegido em via urbana de Guarulhos" },
  { title: "Seguro Moto", desc: "Proteção contra roubo, furto e colisão para motos de uso diário e trabalho.", path: "/seguro-moto", image: imgMoto, alt: "Motociclista em deslocamento urbano" },
  { title: "Seguro Residencial", desc: "Casa ou apartamento com cobertura de incêndio, roubo e danos elétricos.", path: "/seguro-residencial", image: imgResidencial, alt: "Fachada residencial protegida" },
  { title: "Seguro de Vida", desc: "Amparo financeiro para a família e coberturas por invalidez e doenças graves.", path: "/seguro-vida-guarulhos", image: imgVida, alt: "Família reunida em ambiente doméstico" },
  { title: "Planos de Saúde", desc: "Operadoras com rede credenciada em Guarulhos para famílias e empresas.", path: "/planos-de-saude", image: imgSaude, alt: "Atendimento médico em consultório" },
  { title: "Seguro Empresarial", desc: "Patrimônio, estoque, lucros cessantes e responsabilidade para o seu negócio.", path: "/seguro-empresarial-guarulhos", image: imgEmpresarial, alt: "Equipe corporativa em escritório" },
  { title: "Seguro Condomínio", desc: "Cobertura obrigatória e assistências para áreas comuns e administração.", path: "/seguro-condominio", image: imgCondominio, alt: "Edifício residencial em condomínio" },
  { title: "Seguro Viagem", desc: "Assistência médica, bagagem e cancelamento em viagens nacionais e internacionais.", path: "/seguro-viagem", image: imgViagem, alt: "Passageiro em terminal de aeroporto" },
  { title: "Seguro Celular", desc: "Proteção contra roubo, furto qualificado e danos acidentais ao aparelho.", path: "/seguro-celular", image: imgCelular, alt: "Smartphone em uso cotidiano" },
  { title: "Seguro para Estagiários", desc: "Apólice de acidentes pessoais exigida por lei nos contratos de estágio.", path: "/seguro-estagiario", image: imgEmpresa, alt: "Estagiário em ambiente corporativo" },
  { title: "Seguro Frota", desc: "Gestão centralizada, redução de custo e cobertura para veículos da empresa.", path: "/seguro-frota", image: imgFrota, alt: "Frota de veículos corporativos" },
  { title: "Máquinas e Equipamentos", desc: "Proteção para equipamentos fixos, móveis e linha amarela em operação.", path: "/seguro-maquinas", image: imgMaquinas, alt: "Equipamento industrial em operação" },
  { title: "Seguro Rural", desc: "Lavoura, benfeitorias, rebanho e maquinário agrícola com cobertura técnica.", path: "/seguro-rural", image: imgRural, alt: "Plantação em propriedade rural" },
  { title: "Responsabilidade Civil", desc: "Defesa patrimonial contra danos causados a terceiros na atividade profissional.", path: "/seguro-rc", image: imgRc, alt: "Reunião de análise de contrato" },
  { title: "Transporte e Carga", desc: "Cobertura de cargas em trânsito rodoviário para embarcadores e transportadoras.", path: "/seguro-transporte", image: imgTransporte, alt: "Caminhão de carga em rodovia" },
];

export const RamosCarousel = () => {
  return (
    <CarouselShell
      label="Ramos de seguros da Patro Seguros"
      eyebrow="Ramos de seguros"
      title="Proteção para cada momento"
      description="Encontre soluções para você, sua família, seu patrimônio e sua empresa."
      className="bg-background"
      footer={
        <Link
          to="/mapa-do-site"
          className="inline-flex items-center gap-2 font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md sm:ml-auto"
        >
          Ver todos os seguros <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      }
    >
      {RAMOS.map((ramo, i) => (
        <li
          key={ramo.path}
          className="min-w-0 shrink-0 basis-[80%] sm:basis-[48%] lg:basis-[31%] xl:basis-[25%]"
        >
          <Link
            to={ramo.path}
            className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="aspect-[16/10] overflow-hidden bg-muted">
              <img
                src={ramo.image}
                alt={ramo.alt}
                width={480}
                height={300}
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col flex-1 p-5">
              <h3 className="font-heading text-lg font-bold tracking-tight">{ramo.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-2">{ramo.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Conheça
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </CarouselShell>
  );
};

export default RamosCarousel;
