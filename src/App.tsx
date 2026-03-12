import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Parceiros from "./pages/Parceiros";
import Cotacao from "./pages/Cotacao";
import Contato from "./pages/Contato";
import SeguroAuto from "./pages/SeguroAuto";
import SeguroVida from "./pages/SeguroVida";
import SeguroResidencial from "./pages/SeguroResidencial";
import SeguroViagem from "./pages/SeguroViagem";
import SeguroFianca from "./pages/SeguroFianca";
import PrevidenciaPrivada from "./pages/PrevidenciaPrivada";
import SeguroMoto from "./pages/SeguroMoto";
import SeguroSaude from "./pages/SeguroSaude";
import SeguroOdonto from "./pages/SeguroOdonto";
import SeguroEmpresarial from "./pages/SeguroEmpresarial";
import SeguroFrota from "./pages/SeguroFrota";
import SeguroTransporte from "./pages/SeguroTransporte";
import SeguroRural from "./pages/SeguroRural";
import SeguroMaquinas from "./pages/SeguroMaquinas";
import SeguroRC from "./pages/SeguroRC";
import SeguroRCProfissional from "./pages/SeguroRCProfissional";
import SeguroCondominio from "./pages/SeguroCondominio";
import SeguroEngenharia from "./pages/SeguroEngenharia";
import SeguroCyber from "./pages/SeguroCyber";
import SeguroCelular from "./pages/SeguroCelular";
import PlanosDeSaude from "./pages/PlanosDeSaude";
import IndiqueAmigo from "./pages/IndiqueAmigo";
import CotacaoSeguroAuto from "./pages/CotacaoSeguroAuto";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import SeguroMaquinasAgricolas from "./pages/SeguroMaquinasAgricolas";
import SeguroEquipamentosAgricolas from "./pages/SeguroEquipamentosAgricolas";
import SeguroGalpoesIndustriais from "./pages/SeguroGalpoesIndustriais";
import SeguroMaquinasIndustriais from "./pages/SeguroMaquinasIndustriais";
import SeoSeguroAutoGuarulhos from "./pages/SeoSeguroAutoGuarulhos";
import SeoPlanoSaudeGuarulhos from "./pages/SeoPlanoSaudeGuarulhos";
import SeoSeguroEmpresarialGuarulhos from "./pages/SeoSeguroEmpresarialGuarulhos";
import SeoCorretoraGuarulhos from "./pages/SeoCorretoraGuarulhos";
import SeguroAmbiental from "./pages/SeguroAmbiental";
import SeguroAcidentesPessoais from "./pages/SeguroAcidentesPessoais";
import SeguroEstagiario from "./pages/SeguroEstagiario";
import SeguroFiancaLocaticia from "./pages/SeguroFiancaLocaticia";
import SeguroCaminhao from "./pages/SeguroCaminhao";
import SeguroVidaPME from "./pages/SeguroVidaPME";
import SeguroArmazenagem from "./pages/SeguroArmazenagem";
import SeguroPlacaSolar from "./pages/SeguroPlacaSolar";
import SeguroPecuario from "./pages/SeguroPecuario";
import SeguroCafe from "./pages/SeguroCafe";
import Consorcio from "./pages/Consorcio";
import SeguroLojasShopping from "./pages/SeguroLojasShopping";
import SeguroDroneAgricola from "./pages/SeguroDroneAgricola";
import SeguroTransporteAgro from "./pages/SeguroTransporteAgro";
import SeguroBike from "./pages/SeguroBike";
import SeguroJetSki from "./pages/SeguroJetSki";
import SeguroEmbarcacoes from "./pages/SeguroEmbarcacoes";
import SeguroAvioes from "./pages/SeguroAvioes";
import SeguroHelicopteros from "./pages/SeguroHelicopteros";
import SeguroCartaVerde from "./pages/SeguroCartaVerde";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/parceiros" element={<Parceiros />} />
          <Route path="/cotacao" element={<Cotacao />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/seguro-auto" element={<SeguroAuto />} />
          <Route path="/seguro-vida" element={<SeguroVida />} />
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
          <Route path="/seguro-maquinas-industriais" element={<SeguroMaquinasIndustriais />} />
          <Route path="/seguro-auto-guarulhos" element={<SeoSeguroAutoGuarulhos />} />
          <Route path="/plano-saude-guarulhos" element={<SeoPlanoSaudeGuarulhos />} />
          <Route path="/seguro-empresarial-guarulhos" element={<SeoSeguroEmpresarialGuarulhos />} />
          <Route path="/corretora-seguros-guarulhos" element={<SeoCorretoraGuarulhos />} />
          <Route path="/seguro-ambiental" element={<SeguroAmbiental />} />
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
          <Route path="/seguro-lojas-shopping" element={<SeguroLojasShopping />} />
          <Route path="/seguro-drone-agricola" element={<SeguroDroneAgricola />} />
          <Route path="/seguro-transporte-agro" element={<SeguroTransporteAgro />} />
          <Route path="/seguro-bike" element={<SeguroBike />} />
          <Route path="/seguro-jetski" element={<SeguroJetSki />} />
          <Route path="/seguro-embarcacoes" element={<SeguroEmbarcacoes />} />
          <Route path="/seguro-avioes" element={<SeguroAvioes />} />
          <Route path="/seguro-helicopteros" element={<SeguroHelicopteros />} />
          <Route path="/seguro-carta-verde" element={<SeguroCartaVerde />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
