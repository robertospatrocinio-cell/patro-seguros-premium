import { Link } from "react-router-dom";
import { EMPRESA, WHATSAPP_URL_BASE } from "@/config/empresa";
import { droneFaqs } from "@/data/droneAgricolaPreview";

type Props = { reta: boolean; whatsapp: string; onWhatsAppClick: () => void };

export default function DroneAgricolaClosing({ reta, whatsapp, onWhatsAppClick }: Props) {
  const claimsUrl = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent("Olá, Patro! Preciso de orientação sobre um sinistro envolvendo meu drone agrícola.")}`;
  return <>
    <section aria-labelledby="exemplos-drone" className="rounded-xl bg-secondary p-6 md:p-8">
      <h2 id="exemplos-drone" className="text-2xl md:text-3xl">Como isso aparece no campo</h2>
      <p className="mt-3 text-sm font-medium">Exemplos ilustrativos, não relatos de clientes. A análise de cada sinistro depende da apólice e da apuração dos fatos.</p>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <article><h3 className="text-xl">{reta ? "Dano a um bem de terceiro" : "Colisão durante o mapeamento"}</h3><p className="mt-2">{reta ? "Durante um voo agrícola, o drone atinge um veículo de terceiro. É preciso verificar a responsabilidade, o risco aceito e os limites do RETA. O reparo do drone é outra análise, ligada ao casco." : "O drone atinge um obstáculo e danifica um sensor. A análise de casco verifica a causa, o evento contratado, a identificação do sensor e a franquia. Não basta o acessório estar instalado para estar segurado."}</p></article>
        <article><h3 className="text-xl">Aplicação próxima a outra lavoura</h3><p className="mt-2">Um vizinho relata danos após uma pulverização. A existência de RETA não confirma cobertura para deriva. A atividade, a causa e as condições específicas precisam ser examinadas.</p></article>
      </div>
    </section>
    <section aria-labelledby="patro-drone" className="py-8">
      <h2 id="patro-drone" className="text-2xl md:text-3xl">Orientação para decidir com clareza</h2>
      <ul className="mt-5 grid list-disc gap-x-10 gap-y-3 pl-5 md:grid-cols-2">
        <li>Atendimento em todo o Brasil para produtores, prestadores, cooperativas e empresas.</li>
        <li>Orientação sobre equipamento, acessórios e características da operação.</li>
        <li>Comparação das condições disponíveis para o risco informado.</li>
        <li>Apoio na documentação e no encaminhamento de sinistros.</li>
      </ul>
      <p className="mt-5">{EMPRESA.razaoSocial} · Registro SUSEP {EMPRESA.susep}. <Link to="/verificar-susep">Consulte a identificação da corretora</Link>.</p>
      <p className="mt-3 text-sm text-muted-foreground">Nem todas as seguradoras parceiras oferecem seguro de drone. As opções dependem da disponibilidade e da aceitação para cada operação.</p>
    </section>
    <section id="perguntas-drone" aria-labelledby="faq-drone-title" className="border-t py-8">
      <h2 id="faq-drone-title" className="mb-5 text-2xl md:text-3xl">Perguntas frequentes</h2>
      <div className="divide-y rounded-xl border px-5">
        {droneFaqs.map(faq => <details key={faq.question} className="py-2">
          <summary className="flex min-h-12 cursor-pointer items-center py-3 font-semibold">{faq.question}</summary>
          <p className="pb-4 pt-1">{faq.answer}</p>
        </details>)}
      </div>
    </section>
    <section aria-labelledby="ajuda-drone" className="border-y py-8">
      <h2 id="ajuda-drone" className="text-2xl md:text-3xl">Conte com a Patro na próxima etapa</h2>
      <p className="mt-3">Vamos conferir seu drone, sua atividade e o que precisa ser analisado na proposta.</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href="#cotacao-drone" className="inline-flex min-h-12 items-center justify-center rounded-md bg-cta px-5 py-3 text-center font-semibold text-cta-foreground">{reta ? "Avaliar RETA do drone" : "Cotar meu drone agrícola"}</a>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={onWhatsAppClick} className="inline-flex min-h-12 items-center justify-center rounded-md border border-primary px-5 py-3 text-center font-semibold text-primary">Falar com a Patro no WhatsApp</a>
      </div>
      <p className="mt-5">Já tem um sinistro? <a href={claimsUrl} target="_blank" rel="noopener noreferrer">Solicitar orientação sobre sinistro com drone agrícola</a>.</p>
    </section>
    <nav aria-label="Conteúdo relacionado ao agronegócio" className="pt-8">
      <h2 className="text-xl">Outras necessidades da propriedade</h2>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2"><li><Link to="/seguro-agro">Seguros para o agronegócio</Link></li><li><Link to="/seguro-equipamentos-agricolas">Equipamentos agrícolas</Link></li><li><Link to="/seguro-penhor-rural">Penhor rural</Link></li></ul>
    </nav>
  </>;
}
