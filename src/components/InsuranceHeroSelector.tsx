import { useState, useRef, useEffect, useCallback, lazy, Suspense, memo } from "react";
import { Link } from "react-router-dom";
import { Car, Heart, Home, Building2, Shield, Truck, Wheat, Tractor, Beef, Bike, Plane, SmilePlus, Key, Umbrella, Ship, Phone, Laptop, HardHat, Sprout, CloudRain, Bug, Handshake, Warehouse } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
const InsuranceQuoteForm = lazy(() => import("@/components/InsuranceQuoteForm"));
import { formConfigs, cardTitleToFormKey } from "@/lib/insuranceFormConfigs";
import { trackCotacaoClick } from "@/lib/tracking";

import heroEmpresa from "@/assets/hero-empresa.webp";
import heroAgro from "@/assets/hero-agro.webp";
import heroConsorcio from "@/assets/hero-consorcio.webp";
import heroEmpresaSm from "@/assets/hero-empresa-sm.webp";
import heroAgroSm from "@/assets/hero-agro-sm.webp";
import heroConsorcioSm from "@/assets/hero-consorcio-sm.webp";

// Served from /public so the URL matches the <link rel="preload"> in index.html
// (allowing the LCP image to be discovered immediately from the initial HTML).
const heroFamilia = "/images/hero-familia.webp";
const heroFamiliaSm = "/images/hero-familia-sm.webp";

type TabKey = "voce" | "empresa" | "agro" | "consorcio";

interface InsuranceCard {
  title: string;
  icon: React.ElementType;
  link: string;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "voce", label: "Para Você" },
  { key: "empresa", label: "Para sua Empresa" },
  { key: "agro", label: "Para o Agro" },
  { key: "consorcio", label: "Consórcio" },
];

const cardsByTab: Record<TabKey, InsuranceCard[]> = {
  voce: [
    { title: "Seguro Auto", icon: Car, link: "/seguro-auto" },
    { title: "Seguro de Vida", icon: Heart, link: "/seguro-vida" },
    { title: "Seguro Residencial", icon: Home, link: "/seguro-residencial" },
    { title: "Plano de Saúde", icon: SmilePlus, link: "/planos-de-saude" },
    { title: "Seguro Viagem", icon: Plane, link: "/seguro-viagem" },
    { title: "Seguro Moto", icon: Bike, link: "/seguro-moto" },
    { title: "Seguro Celular", icon: Phone, link: "/seguro-celular" },
    { title: "Fiança Locatícia", icon: Key, link: "/seguro-fianca-locaticia" },
  ],
  empresa: [
    { title: "Seguro Empresarial", icon: Building2, link: "/seguro-empresarial" },
    { title: "RC Geral", icon: Shield, link: "/seguro-rc" },
    { title: "Seguro Frota", icon: Truck, link: "/seguro-frota" },
    { title: "Seguro Cyber", icon: Laptop, link: "/seguro-cyber" },
    { title: "Seguro Transporte", icon: Truck, link: "/seguro-transporte" },
    { title: "Seguro Condomínio", icon: Building2, link: "/seguro-condominio" },
    { title: "Seguro Engenharia", icon: HardHat, link: "/seguro-engenharia" },
    { title: "Seguro Garantia", icon: Shield, link: "/seguro-garantia" },
  ],
  agro: [
    { title: "Seguro Safra", icon: Wheat, link: "/seguro-rural" },
    { title: "Máquinas Agrícolas", icon: Tractor, link: "/seguro-maquinas-agricolas" },
    { title: "Seguro Rebanho", icon: Beef, link: "/seguro-pecuario" },
    { title: "Seguro Geada", icon: CloudRain, link: "/seguro-geada" },
    { title: "Propriedade Rural", icon: Home, link: "/seguro-propriedade-rural" },
    { title: "Transporte Agro", icon: Truck, link: "/seguro-transporte-agro" },
    { title: "Equipamentos", icon: Sprout, link: "/seguro-equipamentos-agricolas" },
    { title: "Drone Agrícola", icon: Bug, link: "/seguro-drone-agricola" },
    { title: "Seguro Granja", icon: Warehouse, link: "/seguro-granja" },
  ],
  consorcio: [
    { title: "Consórcio Imóveis", icon: Home, link: "/consorcio-imoveis" },
    { title: "Consórcio Carro", icon: Car, link: "/consorcio-carro" },
    { title: "Consórcio Veículos Pesados", icon: Truck, link: "/consorcio-veiculos-pesados" },
    { title: "Consórcio Geral", icon: Handshake, link: "/consorcio" },
  ],
};

const bgByTab: Record<TabKey, string> = {
  voce: heroFamilia,
  empresa: heroEmpresa,
  agro: heroAgro,
  consorcio: heroConsorcio,
};

const bgSmByTab: Record<TabKey, string> = {
  voce: heroFamiliaSm,
  empresa: heroEmpresaSm,
  agro: heroAgroSm,
  consorcio: heroConsorcioSm,
};

const InsuranceHeroSelector = memo(() => {
  const [active, setActive] = useState<TabKey>("voce");
  const tabsRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({ voce: null, empresa: null, agro: null, consorcio: null });
  const [modalFormKey, setModalFormKey] = useState<string | null>(null);

  const updatePill = useCallback(() => {
    const btn = buttonRefs.current[active];
    const container = tabsRef.current;
    if (!btn || !container) return;

    // Use direct DOM manipulation for the decorative pill to avoid 
    // React state re-renders during layout-critical phases.
    const newLeft = btn.offsetLeft;
    const newWidth = btn.offsetWidth;
    
    container.style.setProperty('--pill-left', `${newLeft}px`);
    container.style.setProperty('--pill-width', `${newWidth}px`);
    container.style.setProperty('--pill-opacity', '1');
  }, [active]);

  useEffect(() => {
    // Start with a safe default or calculated position if possible
    // but wait for first paint to measure exact pixels.
    const frame = requestAnimationFrame(updatePill);
    return () => cancelAnimationFrame(frame);
  }, [updatePill]);

  // Watch the tabs container with ResizeObserver instead of window resize.
  // This only fires when the layout actually changes and runs in its own
  // batched layout phase, eliminating the previous forced-reflow trace.
  useEffect(() => {
    const container = tabsRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    let frame = 0;
    const ro = new ResizeObserver(() => {
      // ResizeObserver callback already runs in a safe phase,
      // but we use rAF to ensure it doesn't block the current task.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => updatePill());
    });
    ro.observe(container);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [updatePill]);

  const cards = cardsByTab[active];
  const modalConfig = modalFormKey ? formConfigs[modalFormKey] : null;

  const handleCardClick = (card: InsuranceCard, e: React.MouseEvent) => {
    trackCotacaoClick(`hero-selector:${active}:${card.title}`, {
      origin: "hero-selector",
      insuranceType: card.title,
    });
    // Always navigate to the insurance page; user chooses form or WhatsApp there
  };

  return (
    <>
      <section className="relative w-full min-h-[520px] md:min-h-[600px] overflow-hidden bg-slate-900" aria-label="Seguros por perfil">
        {tabs.map((tab) => (
          active === tab.key && (
            <div
              key={tab.key}
              className="absolute inset-0 animate-fade-in"
              aria-hidden="false"
            >
              <img
                src={bgByTab[tab.key]}
                srcSet={`${bgSmByTab[tab.key]} 900w, ${bgByTab[tab.key]} 1920w`}
                sizes="100vw"
                alt={tab.key === "voce" ? "Seguro auto e vida em Guarulhos para sua família" : 
                     tab.key === "empresa" ? "Seguro empresarial e frotas para empresas em Guarulhos" :
                     tab.key === "agro" ? "Seguro agrícola e de máquinas para o produtor rural" :
                     "Consórcio de imóveis e veículos com a Patro Seguros"}
                width={1280}
                height={720}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          )
        ))}

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-[2] container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
          <h2 className="text-white text-2xl md:text-4xl font-extrabold text-center mb-3 tracking-tight font-heading">
            Encontre o seguro ideal
          </h2>
          <p className="text-white/70 text-sm md:text-base text-center mb-8 max-w-md">
            Selecione seu perfil e descubra as melhores opções
          </p>

          <div ref={tabsRef} className="relative inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 mb-12 w-full sm:w-auto" style={{ "--pill-left": "0px", "--pill-width": "0px", "--pill-opacity": "0" } as any}>
            <div
              className="absolute top-1 bottom-1 rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out"
              style={{ 
                left: "var(--pill-left)", 
                width: "var(--pill-width)",
                opacity: "var(--pill-opacity)" 
              }}
            />
            {tabs.map((tab) => (
              <button
                key={tab.key}
                ref={(el) => { buttonRefs.current[tab.key] = el; }}
                onClick={() => setActive(tab.key)}
                className={`relative z-10 flex-1 sm:flex-none px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-300 whitespace-nowrap ${
                  active === tab.key ? "text-foreground" : "text-white/80 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl" key={active}>
            {cards.map((card) => (
              <Link
                key={card.title}
                to={card.link}
                onClick={(e) => handleCardClick(card, e)}
                className="group transition-opacity duration-500 animate-fade-in relative z-[3]"
              >
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`p-4 md:p-6 flex items-center justify-center ${active === "consorcio" ? "bg-gradient-to-br from-orange-500 to-orange-600" : "bg-gradient-to-br from-primary to-primary/80"}`}>
                    <card.icon className="h-6 w-6 md:h-8 md:w-8 text-white drop-shadow-md" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div className="bg-white p-2 md:p-3 text-center">
                    <p className="text-[10px] md:text-xs font-semibold text-foreground tracking-tight leading-tight">
                      {card.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <Dialog open={!!modalFormKey} onOpenChange={(open) => !open && setModalFormKey(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">{modalConfig?.title}</DialogTitle>
          <DialogDescription className="sr-only">{modalConfig?.subtitle}</DialogDescription>
          {modalConfig && (
            <Suspense fallback={<div className="py-8 text-center text-sm text-muted-foreground">Carregando…</div>}>
              <InsuranceQuoteForm config={modalConfig} compact />
            </Suspense>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
});

export default InsuranceHeroSelector;
