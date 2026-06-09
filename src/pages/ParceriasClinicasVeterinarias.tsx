import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Handshake, MessageCircle, CheckCircle, Users, Award, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ParceriasClinicasVeterinarias = () => (
  <>
    <PageMeta 
      title="Parcerias para Clínicas Veterinárias | Patro Seguros" 
      description="Programa de parceria Patro Seguros para clínicas e pet shops: indicação mútua, comissionamento e atendimento especializado."
    />
    <Header />
    <main className="py-20">
      <div className="container mx-auto px-4 text-center">
        <Handshake className="h-12 w-12 text-primary mx-auto mb-6" />
        <h1 className="mb-4">Programa Parceiro Patro Pet</h1>
        <p className="text-lg text-muted-foreground mb-10">Conecte sua clínica ou pet shop a um ecossistema de proteção e benefícios.</p>
        <Link to="/cotacao?tipo=outros&origem=parceria-pet">
           <Button size="lg" className="rounded-full">Seja Parceiro da Patro Seguros</Button>
        </Link>
      </div>
    </main>
    <Footer />
  </>
);

export default ParceriasClinicasVeterinarias;
