 import { Suspense, lazy } from "react";
 import { MessageCircle } from "lucide-react";
 const QuickQuoteForm = lazy(() => import("./QuickQuoteForm"));
 
 interface FormCTASectionProps {
   title?: string;
   subtitle?: string;
   insuranceType?: string;
   trackingLabel?: string;
   bgClass?: string;
 }
 
 const FormCTASection = ({
   title = "Solicite uma Cotação Personalizada",
   subtitle = "Resposta em até 2 horas úteis com o comparativo das melhores seguradoras.",
   insuranceType = "Seguros",
   trackingLabel = "home-cta",
   bgClass = "bg-muted/30"
 }: FormCTASectionProps) => {
   return (
     <section className={`py-20 md:py-32 relative z-[2] ${bgClass}`} aria-labelledby="form-cta-heading">
       <div className="container mx-auto px-4">
         <div className="max-w-5xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div>
               <span className="section-label mb-4 inline-block">Cotação Gratuita</span>
               <h2 id="form-cta-heading" className="text-3xl md:text-4xl lg:text-5xl mb-6">
                 {title}
               </h2>
               <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                 {subtitle}
               </p>
               <div className="space-y-4">
                 {[
                   "Consultoria técnica especializada",
                   "Comparativo entre 16+ seguradoras",
                   "Atendimento humano e ágil",
                   "Suporte completo do início ao sinistro"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                     </div>
                     <span className="text-sm font-medium text-foreground">{item}</span>
                   </div>
                 ))}
               </div>
               
               <div className="mt-10 p-5 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                   <MessageCircle className="h-5 w-5 text-primary" />
                 </div>
                 <div>
                   <p className="text-sm font-bold text-primary mb-0.5">Prefere falar agora?</p>
                   <p className="text-xs text-foreground/70 leading-relaxed">
                     Chame no WhatsApp <a href="tel:1151997500" className="font-semibold hover:underline">(11) 5199-7500</a> para atendimento imediato.
                   </p>
                 </div>
               </div>
             </div>
 
             <div>
               <Suspense fallback={<div className="h-[400px] bg-muted animate-pulse rounded-2xl" />}>
                 <QuickQuoteForm 
                   insuranceType={insuranceType} 
                   trackingLabel={trackingLabel} 
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default FormCTASection;