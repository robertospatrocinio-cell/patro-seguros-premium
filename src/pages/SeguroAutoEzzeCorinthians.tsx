import React from "react";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { ezzeSegurosCorinthiansContent } from "@/data/ezzeSegurosCorinthians";
import { Shield, Users, Award, MapPin } from "lucide-react";

const SeguroAutoEzzeCorinthians = () => {
  return (
    <InsurancePageTemplate
      {...ezzeSegurosCorinthiansContent}
      extraSections={
        <>
          {/* Seção Quem é a Ezze */}
          <section id="detalhes-heading" className="py-24 bg-white" aria-labelledby="ezze-info-heading">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <span className="section-label">Sobre a Seguradora</span>
                  <h2 id="ezze-info-heading" className="mt-4">Quem é a Ezze Seguros?</h2>
                  <div className="prose prose-slate mt-6 text-muted-foreground">
                    <p>
                      A <strong>Ezze Seguros</strong> é uma seguradora brasileira multiprodutos que atua em todo o território nacional. 
                      Com foco em inovação e agilidade, a companhia oferece soluções modernas para Seguro Auto, Frota, Residencial, Vida e Empresarial.
                    </p>
                    <p>
                      Operando com capital 100% nacional, a Ezze se destaca pelo forte investimento em canais digitais e pela experiência do cliente, 
                      sendo uma das seguradoras que mais cresce no setor de seguros no Brasil.
                    </p>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  {[
                    { icon: Shield, label: "Segurança SUSEP" },
                    { icon: Award, label: "Inovação Digital" },
                    { icon: Users, label: "Foco no Cliente" },
                    { icon: MapPin, label: "Presença Nacional" }
                  ].map((item, i) => (
                    <div key={i} className="premium-card p-6 text-center flex flex-col items-center gap-3">
                      <item.icon className="h-8 w-8 text-primary" />
                      <span className="text-xs font-semibold">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Seção Parceria Corinthians */}
          <section className="py-24 gradient-surface" aria-labelledby="corinthians-parceria-heading">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="premium-card overflow-hidden border-primary/20 bg-primary/[0.02]">
                <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <h2 id="corinthians-parceria-heading" className="text-primary leading-tight">
                      Ezze Seguros: Patrocinadora Oficial do Corinthians
                    </h2>
                    <p className="mt-6 text-muted-foreground leading-relaxed">
                      A parceria entre a Ezze Seguros e o Sport Club Corinthians Paulista reforça a solidez e a visibilidade da marca. 
                      A seguradora está presente nos uniformes das equipes profissional masculina, feminina e sub-20, além de realizar ativações institucionais junto ao clube.
                    </p>
                    <div className="mt-8 p-4 bg-white/50 rounded-lg border border-primary/10 italic text-sm text-muted-foreground">
                      * A Patro Seguros é corretora parceira autorizada Ezze Seguros. Esta página possui fins informativos e comerciais sobre o produto Seguro Auto Ezze.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Seção Grande São Paulo */}
          <section className="py-24 bg-white" aria-labelledby="regiao-atendimento-heading">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-16">
                <span className="section-label">Cobertura Geográfica</span>
                <h2 id="regiao-atendimento-heading" className="mt-4">Atendimento Especializado na Grande São Paulo</h2>
                <p className="text-muted-foreground mt-4">
                  Nossa sede em Guarulhos nos permite oferecer um atendimento consultivo e ágil para toda a região.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Guarulhos (Cidade Maia)", "Vila Augusta", "Cumbica", "Bonsucesso",
                  "Tatuapé", "Mooca", "Itaquera", "São Miguel",
                  "Vila Matilde", "Aricanduva", "Penha", "Carrão",
                  "Vila Maria", "Belém", "Vila Prudente", "Capital SP"
                ].map((bairro, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border bg-muted/30 text-center text-sm font-medium">
                    {bairro}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      }
    />
  );
};

export default SeguroAutoEzzeCorinthians;
