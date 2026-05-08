 import { Suspense, lazy } from "react";
 const QuickQuoteForm = lazy(() => import("./QuickQuoteForm"));
 
 interface BlogFormCTAProps {
   title?: string;
   description?: string;
 }
 
 const BlogFormCTA = ({ 
   title = "Gostou do conteúdo? Solicite uma análise personalizada",
   description = "Nossos consultores ajudam você a desenhar o melhor trilho de proteção e crescimento para seu patrimônio."
 }: BlogFormCTAProps) => {
   return (
     <div className="my-16 p-8 md:p-12 rounded-3xl bg-primary text-primary-foreground relative overflow-hidden">
       {/* Background decorative elements */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
       <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-24 -mb-24 blur-2xl" />
       
       <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
         <div>
           <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{title}</h2>
           <p className="text-primary-foreground/80 mb-6 leading-relaxed">
             {description}
           </p>
           <ul className="space-y-3 mb-8">
             {[
               "Atendimento humano em Guarulhos",
               "Comparativo de 16+ seguradoras",
               "Especialistas em grandes riscos"
             ].map((item, i) => (
               <li key={i} className="flex items-center gap-2 text-sm text-white/90">
                 <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                 {item}
               </li>
             ))}
           </ul>
         </div>
         
         <div className="bg-white rounded-2xl p-2 shadow-2xl">
           <Suspense fallback={<div className="h-[300px] bg-white/10 animate-pulse rounded-xl" />}>
             <QuickQuoteForm 
               insuranceType="Consultoria" 
               trackingLabel="blog-inline-cta" 
             />
           </Suspense>
         </div>
       </div>
     </div>
   );
 };
 
 export default BlogFormCTA;