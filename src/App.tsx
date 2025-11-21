import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
