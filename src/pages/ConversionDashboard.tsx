import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommercialDashboard from "@/components/crm/CommercialDashboard";

const ConversionDashboard = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1 container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Painel de Conversão</h1>
      <CommercialDashboard />
    </main>
    <Footer />
  </div>
);

export default ConversionDashboard;
