import { Link } from "react-router-dom";
import { EMPRESA } from "@/config/empresa";
import { faqTechnicalSources, perguntasPrioritarias } from "@/data/perguntasPrioritarias";

export default function FaqEditorialContext({ categoryId }: { categoryId?: string }) {
  const reviewed = perguntasPrioritarias.find((category) => category.id === categoryId);
  if (categoryId && !reviewed) return null;
  const sources = faqTechnicalSources.filter((source) =>
    !reviewed || reviewed.sourceIds.includes(source.id)
  );

  return (
    <aside aria-label="Orientações e referências" className="rounded-xl border bg-muted/30 p-5 text-sm leading-relaxed text-muted-foreground">
      <h2 className="mb-3 text-lg font-semibold text-foreground">Como usar estas respostas</h2>
      <p>
        Conteúdo informativo da {EMPRESA.nomeFantasia}. Nas modalidades prioritárias, as respostas explicam
        coberturas possíveis, restrições e critérios de comparação. A proposta, as condições do produto
        e as regras aplicáveis determinam a proteção; esta página não é uma oferta nem uma apólice.
      </p>
      <p className="mt-3">
        Para conferir uma informação técnica, consulte o órgão competente e peça as condições vigentes
        do produto analisado. As referências abaixo são institucionais, não comprovam a disponibilidade
        de uma cobertura específica. Não envie documentos pessoais ou dados de saúde em espaços públicos.
      </p>
      <ul className="my-3 list-disc space-y-2 pl-5">
        {sources.map((source) => (
          <li key={source.id}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
              {source.label} (site externo)
            </a>
          </li>
        ))}
      </ul>
      <p>
        {EMPRESA.razaoSocial} · CNPJ {EMPRESA.cnpj} · Registro SUSEP cadastrado: {EMPRESA.susep}.
        {" "}<Link to="/verificar-susep" className="text-primary underline">Como conferir o registro</Link>.
      </p>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        <Link to="/sobre" className="text-primary underline">Sobre a Patro</Link>
        <Link to="/contato" className="text-primary underline">Pedir esclarecimento ou correção</Link>
        <Link to="/politica-privacidade" className="text-primary underline">Política de privacidade</Link>
      </div>
    </aside>
  );
}
