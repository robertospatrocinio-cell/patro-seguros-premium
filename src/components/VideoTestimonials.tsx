import { Play } from "lucide-react";

export const VideoTestimonials = () => {
  const videoTestimonials = [
    { name: "Ricardo Silva", neighborhood: "Vila Augusta", product: "Seguro Auto" },
    { name: "Mariana Costa", neighborhood: "Cidade Maia", product: "Seguro Residencial" },
    { name: "André Santos", neighborhood: "Cumbica", product: "Seguro Empresarial" },
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Clientes em vídeo</h2>
        <p className="text-center text-slate-600 mb-12">Confira depoimentos reais de quem escolheu a Patro Seguros em Guarulhos.</p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {videoTestimonials.map((v, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-video bg-slate-200 rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer border-2 border-dashed border-slate-300">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
                <div className="z-10 bg-white/90 p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-primary text-primary" />
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 bg-white/50 px-2 py-1 rounded">
                  Espaço para upload
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-900">{v.name}</p>
                <p className="text-sm text-slate-500">{v.neighborhood} • {v.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
