import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import PageSkeleton from "@/components/PageSkeleton";

// Lazy-load non-critical layout components to reduce initial JS
const TooltipProvider = lazy(() => import("@/components/ui/tooltip").then(m => ({ default: m.TooltipProvider })));
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const CookieBanner = lazy(() => import("@/components/CookieBanner"));

// Lazy-loaded pages for code splitting
const Sobre = lazy(() => import("./pages/Sobre"));
const Parceiros = lazy(() => import("./pages/Parceiros"));
const Cotacao = lazy(() => import("./pages/Cotacao"));
const Contato = lazy(() => import("./pages/Contato"));
const SeguroAuto = lazy(() => import("./pages/SeguroAuto"));
const SeguroVida = lazy(() => import("./pages/SeguroVida"));
const SeguroResidencial = lazy(() => import("./pages/SeguroResidencial"));
const SeguroViagem = lazy(() => import("./pages/SeguroViagem"));
const SeguroFianca = lazy(() => import("./pages/SeguroFianca"));
const PrevidenciaPrivada = lazy(() => import("./pages/PrevidenciaPrivada"));
const Investimentos = lazy(() => import("./pages/Investimentos"));
const SeguroMoto = lazy(() => import("./pages/SeguroMoto"));
const SeguroSaude = lazy(() => import("./pages/SeguroSaude"));
const SeguroOdonto = lazy(() => import("./pages/SeguroOdonto"));
const SeguroEmpresarial = lazy(() => import("./pages/SeguroEmpresarial"));
const SeguroFrota = lazy(() => import("./pages/SeguroFrota"));
const SeguroTransporte = lazy(() => import("./pages/SeguroTransporte"));
const SeguroRural = lazy(() => import("./pages/SeguroRural"));
const SeguroMaquinas = lazy(() => import("./pages/SeguroMaquinas"));
const SeguroRC = lazy(() => import("./pages/SeguroRC"));
const SeguroRCProfissional = lazy(() => import("./pages/SeguroRCProfissional"));
const SeguroCondominio = lazy(() => import("./pages/SeguroCondominio"));
const SeguroEngenharia = lazy(() => import("./pages/SeguroEngenharia"));
const SeguroCyber = lazy(() => import("./pages/SeguroCyber"));
const SeguroCelular = lazy(() => import("./pages/SeguroCelular"));
const PlanosDeSaude = lazy(() => import("./pages/PlanosDeSaude"));
const IndiqueAmigo = lazy(() => import("./pages/IndiqueAmigo"));
const CotacaoSeguroAuto = lazy(() => import("./pages/CotacaoSeguroAuto"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const SeguroMaquinasAgricolas = lazy(() => import("./pages/SeguroMaquinasAgricolas"));
const SeguroEquipamentosAgricolas = lazy(() => import("./pages/SeguroEquipamentosAgricolas"));
const SeguroGalpoesIndustriais = lazy(() => import("./pages/SeguroGalpoesIndustriais"));
const SeguroGalpao = lazy(() => import("./pages/SeguroGalpao"));
const SeguroMaquinasIndustriais = lazy(() => import("./pages/SeguroMaquinasIndustriais"));
const SeguroMaquinasLinhaAmarela = lazy(() => import("./pages/SeguroMaquinasLinhaAmarela"));
const FormularioSeguroVida = lazy(() => import("./pages/FormularioSeguroVida"));
const SeoSeguroAutoGuarulhos = lazy(() => import("./pages/SeoSeguroAutoGuarulhos"));
const SeoSeguroAutoPorModeloGuarulhos = lazy(() => import("./pages/SeoSeguroAutoPorModeloGuarulhos"));
const AvaliarNoGoogle = lazy(() => import("./pages/AvaliarNoGoogle"));
const ParceirosLocais = lazy(() => import("./pages/ParceirosLocais"));
const Imprensa = lazy(() => import("./pages/Imprensa"));
const SeoPlanoSaudeGuarulhos = lazy(() => import("./pages/SeoPlanoSaudeGuarulhos"));
const SeoSeguroEmpresarialGuarulhos = lazy(() => import("./pages/SeoSeguroEmpresarialGuarulhos"));
const SeoCorretoraGuarulhos = lazy(() => import("./pages/SeoCorretoraGuarulhos"));
const SeoSeguroResidencialGuarulhos = lazy(() => import("./pages/SeoSeguroResidencialGuarulhos"));
const SeoSeguroVidaSaudeGuarulhos = lazy(() => import("./pages/SeoSeguroVidaSaudeGuarulhos"));
const SeoSeguroFrotaGuarulhos = lazy(() => import("./pages/SeoSeguroFrotaGuarulhos"));
const SeoSegurosPmeGuarulhos = lazy(() => import("./pages/SeoSegurosPmeGuarulhos"));
const SeoSeguroMotoGuarulhos = lazy(() => import("./pages/SeoSeguroMotoGuarulhos"));
const SeoSeguroCondominioGuarulhos = lazy(() => import("./pages/SeoSeguroCondominioGuarulhos"));
const SeoSegurosShoppingMaiaCidadeMaia = lazy(() => import("./pages/SeoSegurosShoppingMaiaCidadeMaia"));
const SeoSeguroUberGuarulhos = lazy(() => import("./pages/SeoSeguroUberGuarulhos"));
const SeoSeguroEmpresaGuarulhos = lazy(() => import("./pages/SeoSeguroEmpresaGuarulhos"));
const SeoSeguroVidaGuarulhos = lazy(() => import("./pages/SeoSeguroVidaGuarulhos"));
const SeoSeguroMotoristaAppGuarulhos = lazy(() => import("./pages/SeoSeguroMotoristaAppGuarulhos"));
const SeoLocalPage = lazy(() => import("./pages/SeoLocalPage"));
const SeguroAmbiental = lazy(() => import("./pages/SeguroAmbiental"));
const SeguroGeada = lazy(() => import("./pages/SeguroGeada"));
const SeguroPropriedadeRural = lazy(() => import("./pages/SeguroPropriedadeRural"));
const SeguroAcidentesPessoais = lazy(() => import("./pages/SeguroAcidentesPessoais"));
const SeguroEstagiario = lazy(() => import("./pages/SeguroEstagiario"));
const SeguroFiancaLocaticia = lazy(() => import("./pages/SeguroFiancaLocaticia"));
const SeguroCaminhao = lazy(() => import("./pages/SeguroCaminhao"));
const SeguroVidaPME = lazy(() => import("./pages/SeguroVidaPME"));
const SeguroArmazenagem = lazy(() => import("./pages/SeguroArmazenagem"));
const SeguroPlacaSolar = lazy(() => import("./pages/SeguroPlacaSolar"));
const SeguroPecuario = lazy(() => import("./pages/SeguroPecuario"));
const SeguroCafe = lazy(() => import("./pages/SeguroCafe"));
const Consorcio = lazy(() => import("./pages/Consorcio"));
const ConsorcioCarro = lazy(() => import("./pages/ConsorcioCarro"));
const ConsorcioImoveis = lazy(() => import("./pages/ConsorcioImoveis"));
const ConsorcioVeiculosPesados = lazy(() => import("./pages/ConsorcioVeiculosPesados"));
const EbookConsorcio = lazy(() => import("./pages/EbookConsorcio"));
const SeguroLojasShopping = lazy(() => import("./pages/SeguroLojasShopping"));
const SeguroDroneAgricola = lazy(() => import("./pages/SeguroDroneAgricola"));
const SeguroTransporteAgro = lazy(() => import("./pages/SeguroTransporteAgro"));
const SeguroGranja = lazy(() => import("./pages/SeguroGranja"));
const SeguroBike = lazy(() => import("./pages/SeguroBike"));
const SeguroJetSki = lazy(() => import("./pages/SeguroJetSki"));
const SeguroEmbarcacoes = lazy(() => import("./pages/SeguroEmbarcacoes"));
const SeguroAvioes = lazy(() => import("./pages/SeguroAvioes"));
const SeguroHelicopteros = lazy(() => import("./pages/SeguroHelicopteros"));
const SeguroCartaVerde = lazy(() => import("./pages/SeguroCartaVerde"));
const SeguroDecesso = lazy(() => import("./pages/SeguroDecesso"));
const SeguroGarantia = lazy(() => import("./pages/SeguroGarantia"));
const SeguroRCMedicos = lazy(() => import("./pages/SeguroRCMedicos"));
const SeguroRCVeterinarios = lazy(() => import("./pages/SeguroRCVeterinarios"));
const SeguroRCAdvogados = lazy(() => import("./pages/SeguroRCAdvogados"));
const SeguroRCDentistas = lazy(() => import("./pages/SeguroRCDentistas"));
const SeguroRCEngenheiros = lazy(() => import("./pages/SeguroRCEngenheiros"));
const SeguroRCExecutivos = lazy(() => import("./pages/SeguroRCExecutivos"));
const SeguroRCObras = lazy(() => import("./pages/SeguroRCObras"));
const SeguroRCPrestacaoServicos = lazy(() => import("./pages/SeguroRCPrestacaoServicos"));
const SeguroRCEventos = lazy(() => import("./pages/SeguroRCEventos"));
const PlanoPet = lazy(() => import("./pages/PlanoPet"));
const PlanoSaudeEmpresarial = lazy(() => import("./pages/PlanoSaudeEmpresarial"));
const SeguroImobiliario = lazy(() => import("./pages/SeguroImobiliario"));
const SeguroFuneral = lazy(() => import("./pages/SeguroFuneral"));
const SeguroMotoristaApp = lazy(() => import("./pages/SeguroMotoristaApp"));
const LandingPages = lazy(() => import("./pages/LandingPages"));
const LandingSeguroAuto = lazy(() => import("./pages/LandingSeguroAuto"));
const LandingSeguroAutoPremium = lazy(() => import("./pages/LandingSeguroAutoPremium"));
const LandingPlanoSaude = lazy(() => import("./pages/LandingPlanoSaude"));
const LandingSeguroEmpresarial = lazy(() => import("./pages/LandingSeguroEmpresarial"));
const LandingSeguroResidencial = lazy(() => import("./pages/LandingSeguroResidencial"));
const LandingSeguroVida = lazy(() => import("./pages/LandingSeguroVida"));
const LandingSeguroMoto = lazy(() => import("./pages/LandingSeguroMoto"));
const LandingSeguroGalpoes = lazy(() => import("./pages/LandingSeguroGalpoes"));
const LandingConsorcio = lazy(() => import("./pages/LandingConsorcio"));
const LandingSeguroCelular = lazy(() => import("./pages/LandingSeguroCelular"));
const LandingSeguroMotoristaApp = lazy(() => import("./pages/LandingSeguroMotoristaApp"));
const LandingMedSenior = lazy(() => import("./pages/LandingMedSenior"));
const LandingAlice = lazy(() => import("./pages/LandingAlice"));
const FAQ = lazy(() => import("./pages/FAQ"));
const SobreGuarulhos = lazy(() => import("./pages/SobreGuarulhos"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso"));
const NichoMedicos = lazy(() => import("./pages/NichoMedicos"));
const NichoTransportadoras = lazy(() => import("./pages/NichoTransportadoras"));
const NichoEmpresarios = lazy(() => import("./pages/NichoEmpresarios"));
const NichoProfissionaisLiberais = lazy(() => import("./pages/NichoProfissionaisLiberais"));
const NichoMotoristasApp = lazy(() => import("./pages/NichoMotoristasApp"));
const Depoimentos = lazy(() => import("./pages/Depoimentos"));
const SegurosQuotePage = lazy(() => import("./pages/SegurosQuotePage"));
const SegurosGuarulhosBairros = lazy(() => import("./pages/SegurosGuarulhosBairros"));
const HubSegurosGuarulhos = lazy(() => import("./pages/HubSegurosGuarulhos"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PurgeLogs = lazy(() => import("./pages/PurgeLogs"));
const PerformanceDiagnostico = lazy(() => import("./pages/PerformanceDiagnostico"));
const ConversionDashboard = lazy(() => import("./pages/ConversionDashboard"));
const SeoTechnicalReport = lazy(() => import("./pages/SeoTechnicalReport"));

const QueryClientProvider = lazy(() =>
  import("@tanstack/react-query").then(({ QueryClient, QueryClientProvider }) => {
    const queryClient = new QueryClient();
    return { default: ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> };
  })
);

/** Deferred wrapper – renders children after first paint / idle callback */
function DeferredRender({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => setReady(true));
    } else {
      setTimeout(() => setReady(true), 100);
    }
  }, []);
  if (!ready) return null;
  return <>{children}</>;
}

const App = () => (
  <Suspense fallback={null}>
  <QueryClientProvider>
    <Suspense fallback={null}>
      <TooltipProvider>
        <Suspense fallback={null}>
          <DeferredRender>
            <Toaster />
            <Sonner />
          </DeferredRender>
        </Suspense>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/parceiros" element={<Parceiros />} />
            <Route path="/cotacao" element={<Cotacao />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/depoimentos" element={<Depoimentos />} />
            <Route path="/avaliar-no-google" element={<AvaliarNoGoogle />} />
            <Route path="/parceiros-locais" element={<ParceirosLocais />} />
            <Route path="/imprensa" element={<Imprensa />} />
            <Route path="/seguro-auto" element={<SeguroAuto />} />
            <Route path="/seguro-vida" element={<SeguroVida />} />
            <Route path="/seguro-vida/formulario" element={<FormularioSeguroVida />} />
            <Route path="/seguro-residencial" element={<SeguroResidencial />} />
            <Route path="/seguro-viagem" element={<SeguroViagem />} />
            <Route path="/seguro-fianca" element={<SeguroFianca />} />
            <Route path="/previdencia-privada" element={<PrevidenciaPrivada />} />
            <Route path="/seguro-moto" element={<SeguroMoto />} />
            <Route path="/seguro-saude" element={<SeguroSaude />} />
            <Route path="/seguro-odonto" element={<SeguroOdonto />} />
            <Route path="/seguro-empresarial" element={<SeguroEmpresarial />} />
            <Route path="/seguro-frota" element={<SeguroFrota />} />
            <Route path="/seguro-transporte" element={<SeguroTransporte />} />
            <Route path="/seguro-rural" element={<SeguroRural />} />
            <Route path="/seguro-maquinas" element={<SeguroMaquinas />} />
            <Route path="/seguro-rc" element={<SeguroRC />} />
            <Route path="/seguro-rc-profissional" element={<SeguroRCProfissional />} />
            <Route path="/seguro-condominio" element={<SeguroCondominio />} />
            <Route path="/seguro-engenharia" element={<SeguroEngenharia />} />
            <Route path="/seguro-cyber" element={<SeguroCyber />} />
            <Route path="/seguro-celular" element={<SeguroCelular />} />
            <Route path="/planos-de-saude" element={<PlanosDeSaude />} />
            <Route path="/indique-um-amigo" element={<IndiqueAmigo />} />
            <Route path="/cotacao-seguro-auto" element={<CotacaoSeguroAuto />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/seguro-maquinas-agricolas" element={<SeguroMaquinasAgricolas />} />
            <Route path="/seguro-equipamentos-agricolas" element={<SeguroEquipamentosAgricolas />} />
            <Route path="/seguro-galpoes-industriais" element={<SeguroGalpoesIndustriais />} />
            <Route path="/seguro-galpao" element={<SeguroGalpao />} />
            <Route path="/seguro-maquinas-industriais" element={<SeguroMaquinasIndustriais />} />
            <Route path="/seguro-maquinas-linha-amarela" element={<SeguroMaquinasLinhaAmarela />} />
            <Route path="/seguro-auto-guarulhos" element={<SeoSeguroAutoGuarulhos />} />
            <Route path="/plano-saude-guarulhos" element={<SeoPlanoSaudeGuarulhos />} />
            <Route path="/seguro-empresarial-guarulhos" element={<SeoSeguroEmpresarialGuarulhos />} />
            <Route path="/corretora-seguros-guarulhos" element={<SeoCorretoraGuarulhos />} />
            <Route path="/seguro-residencial-guarulhos" element={<SeoSeguroResidencialGuarulhos />} />
            <Route path="/seguro-vida-saude-guarulhos" element={<SeoSeguroVidaSaudeGuarulhos />} />
            <Route path="/seguro-frota-empresas-guarulhos" element={<SeoSeguroFrotaGuarulhos />} />
            <Route path="/seguros-empresariais-pme-guarulhos" element={<SeoSegurosPmeGuarulhos />} />
            <Route path="/seguro-moto-guarulhos" element={<SeoSeguroMotoGuarulhos />} />
            <Route path="/seguro-condominio-guarulhos" element={<SeoSeguroCondominioGuarulhos />} />
            <Route path="/seguros-shopping-maia-cidade-maia-guarulhos" element={<SeoSegurosShoppingMaiaCidadeMaia />} />
            <Route path="/seguro-uber-guarulhos" element={<SeoSeguroUberGuarulhos />} />
            <Route path="/seguro-empresa-guarulhos" element={<SeoSeguroEmpresaGuarulhos />} />
            <Route path="/seguro-vida-guarulhos" element={<SeoSeguroVidaGuarulhos />} />
            <Route path="/seguro-para-motorista-app-guarulhos" element={<SeoSeguroMotoristaAppGuarulhos />} />
            {/* SEO local — bairros e páginas comerciais (data-driven) */}
            <Route path="/cotacao-seguro-auto-guarulhos" element={<SeoLocalPage slug="cotacao-seguro-auto-guarulhos" />} />
            <Route path="/melhor-corretora-de-seguros-guarulhos" element={<SeoLocalPage slug="melhor-corretora-de-seguros-guarulhos" />} />
            <Route path="/plano-saude-mei-guarulhos" element={<SeoLocalPage slug="plano-saude-mei-guarulhos" />} />
            <Route path="/seguro-empresarial-cumbica" element={<SeoLocalPage slug="seguro-empresarial-cumbica" />} />
            <Route path="/seguro-transportadora-guarulhos" element={<SeoLocalPage slug="seguro-transportadora-guarulhos" />} />
            <Route path="/seguro-99-guarulhos" element={<SeoLocalPage slug="seguro-99-guarulhos" />} />
            <Route path="/plano-saude-empresarial-guarulhos" element={<SeoLocalPage slug="plano-saude-empresarial-guarulhos" />} />
            <Route path="/plano-saude-pme-guarulhos" element={<SeoLocalPage slug="plano-saude-pme-guarulhos" />} />
            <Route path="/plano-saude-familia-guarulhos" element={<SeoLocalPage slug="plano-saude-familia-guarulhos" />} />
            <Route path="/plano-odontologico-guarulhos" element={<SeoLocalPage slug="plano-odontologico-guarulhos" />} />
            <Route path="/seguro-auto-barato-guarulhos" element={<SeoLocalPage slug="seguro-auto-barato-guarulhos" />} />
            <Route path="/seguro-restaurante-guarulhos" element={<SeoLocalPage slug="seguro-restaurante-guarulhos" />} />
            <Route path="/seguro-loja-guarulhos" element={<SeoLocalPage slug="seguro-loja-guarulhos" />} />
            <Route path="/seguro-frota-pequena-guarulhos" element={<SeoLocalPage slug="seguro-frota-pequena-guarulhos" />} />
            <Route path="/seguro-galpao-guarulhos" element={<SeoLocalPage slug="seguro-galpao-guarulhos" />} />
            <Route path="/seguro-galpao-cumbica" element={<SeoLocalPage slug="seguro-galpao-cumbica" />} />
           <Route path="/seguro-carro-eletrico-guarulhos" element={<SeoLocalPage slug="seguro-carro-eletrico-guarulhos" />} />
            <Route path="/seguro-logistica-guarulhos" element={<SeoLocalPage slug="seguro-logistica-guarulhos" />} />
            <Route path="/seguro-auto-vila-galvao" element={<SeoLocalPage slug="seguro-auto-vila-galvao" />} />
            <Route path="/seguro-auto-bonsucesso-guarulhos" element={<SeoLocalPage slug="seguro-auto-bonsucesso-guarulhos" />} />
            <Route path="/seguro-auto-cumbica" element={<SeoLocalPage slug="seguro-auto-cumbica" />} />
            <Route path="/seguro-auto-pimentas" element={<SeoLocalPage slug="seguro-auto-pimentas" />} />
            <Route path="/seguro-auto-maia-guarulhos" element={<SeoLocalPage slug="seguro-auto-maia-guarulhos" />} />
            <Route path="/seguro-auto-jardim-sao-joao" element={<SeoLocalPage slug="seguro-auto-jardim-sao-joao" />} />
            <Route path="/seguro-auto-taboao-guarulhos" element={<SeoLocalPage slug="seguro-auto-taboao-guarulhos" />} />
            <Route path="/seguro-auto-centro-guarulhos" element={<SeoLocalPage slug="seguro-auto-centro-guarulhos" />} />
            <Route path="/seguro-auto-vila-augusta" element={<SeoLocalPage slug="seguro-auto-vila-augusta" />} />
            {/* Programmatic SEO — modelos de carro em Guarulhos */}
            <Route path="/seguro-corolla-guarulhos" element={<SeoLocalPage slug="seguro-corolla-guarulhos" />} />
            <Route path="/seguro-civic-guarulhos" element={<SeoLocalPage slug="seguro-civic-guarulhos" />} />
            <Route path="/seguro-hb20-guarulhos" element={<SeoLocalPage slug="seguro-hb20-guarulhos" />} />
            <Route path="/seguro-onix-guarulhos" element={<SeoLocalPage slug="seguro-onix-guarulhos" />} />
            <Route path="/seguro-tcross-guarulhos" element={<SeoLocalPage slug="seguro-tcross-guarulhos" />} />
            <Route path="/seguro-compass-guarulhos" element={<SeoLocalPage slug="seguro-compass-guarulhos" />} />
            <Route path="/seguro-hilux-guarulhos" element={<SeoLocalPage slug="seguro-hilux-guarulhos" />} />
            <Route path="/seguro-strada-guarulhos" element={<SeoLocalPage slug="seguro-strada-guarulhos" />} />
            <Route path="/seguro-renegade-guarulhos" element={<SeoLocalPage slug="seguro-renegade-guarulhos" />} />
            <Route path="/seguro-mobi-guarulhos" element={<SeoLocalPage slug="seguro-mobi-guarulhos" />} />
            <Route path="/seguro-auto-por-modelo-guarulhos" element={<SeoSeguroAutoPorModeloGuarulhos />} />
            <Route path="/seguro-ambiental" element={<SeguroAmbiental />} />
            <Route path="/seguro-geada" element={<SeguroGeada />} />
            <Route path="/seguro-acidentes-pessoais" element={<SeguroAcidentesPessoais />} />
            <Route path="/seguro-estagiario" element={<SeguroEstagiario />} />
            <Route path="/seguro-fianca-locaticia" element={<SeguroFiancaLocaticia />} />
            <Route path="/seguro-caminhao" element={<SeguroCaminhao />} />
            <Route path="/seguro-vida-pme" element={<SeguroVidaPME />} />
            <Route path="/seguro-armazenagem" element={<SeguroArmazenagem />} />
            <Route path="/seguro-placa-solar" element={<SeguroPlacaSolar />} />
            <Route path="/seguro-pecuario" element={<SeguroPecuario />} />
            <Route path="/seguro-cafe" element={<SeguroCafe />} />
            <Route path="/consorcio" element={<Consorcio />} />
            <Route path="/consorcio-carro" element={<ConsorcioCarro />} />
            <Route path="/consorcio-imoveis" element={<ConsorcioImoveis />} />
            <Route path="/consorcio-veiculos-pesados" element={<ConsorcioVeiculosPesados />} />
            <Route path="/ebook-consorcio" element={<EbookConsorcio />} />
            <Route path="/seguro-lojas-shopping" element={<SeguroLojasShopping />} />
            <Route path="/seguro-drone-agricola" element={<SeguroDroneAgricola />} />
            <Route path="/seguro-transporte-agro" element={<SeguroTransporteAgro />} />
            <Route path="/seguro-granja" element={<SeguroGranja />} />
            <Route path="/seguro-bike" element={<SeguroBike />} />
            <Route path="/seguro-jetski" element={<SeguroJetSki />} />
            <Route path="/seguro-embarcacoes" element={<SeguroEmbarcacoes />} />
            <Route path="/seguro-avioes" element={<SeguroAvioes />} />
            <Route path="/seguro-helicopteros" element={<SeguroHelicopteros />} />
            <Route path="/seguro-carta-verde" element={<SeguroCartaVerde />} />
            <Route path="/seguro-decesso" element={<SeguroDecesso />} />
            <Route path="/seguro-garantia" element={<SeguroGarantia />} />
            <Route path="/seguro-rc-medicos" element={<SeguroRCMedicos />} />
            <Route path="/seguro-rc-veterinarios" element={<SeguroRCVeterinarios />} />
            <Route path="/seguro-rc-advogados" element={<SeguroRCAdvogados />} />
            <Route path="/seguro-rc-dentistas" element={<SeguroRCDentistas />} />
            <Route path="/seguro-rc-engenheiros" element={<SeguroRCEngenheiros />} />
            <Route path="/seguro-rc-executivos" element={<SeguroRCExecutivos />} />
            <Route path="/seguro-rc-obras" element={<SeguroRCObras />} />
            <Route path="/seguro-rc-prestacao-servicos" element={<SeguroRCPrestacaoServicos />} />
            <Route path="/seguro-rc-eventos" element={<SeguroRCEventos />} />
            <Route path="/plano-pet" element={<PlanoPet />} />
            <Route path="/plano-saude-empresarial" element={<PlanoSaudeEmpresarial />} />
            <Route path="/seguro-propriedade-rural" element={<SeguroPropriedadeRural />} />
            <Route path="/seguro-imobiliario" element={<SeguroImobiliario />} />
            <Route path="/seguro-funeral" element={<SeguroFuneral />} />
            <Route path="/seguro-motorista-app" element={<SeguroMotoristaApp />} />
            <Route path="/landing-pages" element={<LandingPages />} />
            <Route path="/lp/seguro-auto" element={<LandingSeguroAuto />} />
            <Route path="/lp/seguro-auto-premium" element={<LandingSeguroAutoPremium />} />
            <Route path="/lp/plano-de-saude" element={<LandingPlanoSaude />} />
            <Route path="/lp/seguro-empresarial" element={<LandingSeguroEmpresarial />} />
            <Route path="/lp/seguro-residencial" element={<LandingSeguroResidencial />} />
            <Route path="/lp/seguro-vida" element={<LandingSeguroVida />} />
            <Route path="/lp/seguro-moto" element={<LandingSeguroMoto />} />
            <Route path="/lp/seguro-galpoes" element={<LandingSeguroGalpoes />} />
            <Route path="/lp/consorcio" element={<LandingConsorcio />} />
            <Route path="/lp/seguro-celular" element={<LandingSeguroCelular />} />
            <Route path="/lp/seguro-motorista-app" element={<LandingSeguroMotoristaApp />} />
            <Route path="/lp/medsenior" element={<LandingMedSenior />} />
            <Route path="/lp/alice" element={<LandingAlice />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/sobre-guarulhos" element={<SobreGuarulhos />} />
            <Route path="/seguros-guarulhos-bairros" element={<SegurosGuarulhosBairros />} />
            <Route path="/seguros-guarulhos" element={<SegurosGuarulhosBairros />} />
            <Route path="/seguros-em-guarulhos" element={<HubSegurosGuarulhos />} />
            <Route path="/seguros-guarulhos/:bairro" element={<SegurosGuarulhosBairros />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosDeUso />} />
            <Route path="/seguros/medicos-e-clinicas" element={<NichoMedicos />} />
            <Route path="/seguros/transportadoras" element={<NichoTransportadoras />} />
            <Route path="/seguros/empresarios" element={<NichoEmpresarios />} />
            <Route path="/seguros/profissionais-liberais" element={<NichoProfissionaisLiberais />} />
            <Route path="/seguros/motoristas-app" element={<NichoMotoristasApp />} />
            <Route path="/seguros/:tipo" element={<SegurosQuotePage />} />
            <Route path="/admin/purge-logs" element={<PurgeLogs />} />
            <Route path="/admin/performance" element={<PerformanceDiagnostico />} />
            <Route path="/admin/seo-tecnico" element={<SeoTechnicalReport />} />
            <Route path="/admin/conversoes" element={<ConversionDashboard />} />
            <Route path="/investimentos" element={<Investimentos />} />
            <Route path="/planejamento-patrimonial" element={<Investimentos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
          <Suspense fallback={null}>
            <DeferredRender>
              <WhatsAppButton />
              <CookieBanner />
            </DeferredRender>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </Suspense>
  </QueryClientProvider>
  </Suspense>
);

export default App;
