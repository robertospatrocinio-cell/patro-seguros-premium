import { Link } from "react-router-dom";
import { CheckCircle, FileCheck2, Info, ShieldCheck, XCircle } from "lucide-react";
import ExternalLink from "@/components/ExternalLink";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WHATSAPP_URL_BASE } from "@/config/empresa";
import { trackWhatsAppClick } from "@/lib/tracking";

const operationRows = [
  ["Filmagem, fotografia e eventos", "Profissional / não recreativo", "Confirmar enquadramento e exigências antes do voo"],
  ["Inspeção de obras, telhados, torres e energia", "Profissional / não recreativo", "Confirmar enquadramento e exigências antes do voo"],
  ["Mapeamento, topografia e aerofotogrametria", "Profissional / não recreativo", "Confirmar enquadramento e exigências antes do voo"],
  ["Pulverização e monitoramento agrícola", "Profissional / não recreativo", "Pode exigir análise específica conforme peso e operação"],
  ["Segurança e monitoramento patrimonial", "Profissional / não recreativo", "Confirmar enquadramento e exigências antes do voo"],
  ["Hobby sem remuneração", "Recreativo", "As regras e a necessidade de seguro variam conforme o equipamento e a operação"],
];

const documents = [
  "Dados do proprietário ou operador, pessoa física ou jurídica",
  "Marca, modelo, número de série, peso máximo de decolagem e uso do drone",
  "Comprovante de cadastro aplicável na ANAC, quando exigido",
  "Código ou comprovante de homologação do equipamento na Anatel, quando aplicável",
  "Localidades, frequência e características das operações realizadas",
];

const quoteMessage = encodeURIComponent(
  "Olá! Gostaria de solicitar uma cotação de Seguro RETA para drone. Pode me orientar sobre os documentos e o enquadramento da minha operação?",
);

const RetaDroneDetails = () => (
  <>
    <section className="py-20 gradient-surface" aria-labelledby="reta-casco-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <span className="section-label">Proteções diferentes</span>
          <h2 id="reta-casco-heading" className="mt-4">Seguro RETA ou seguro casco: qual protege o quê?</h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            O RETA protege terceiros. O casco pode proteger o próprio equipamento. Uma cobertura não substitui a outra.
          </p>
        </div>
        <div className="premium-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Situação</TableHead>
                <TableHead scope="col">RETA</TableHead>
                <TableHead scope="col">Casco</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Drone atinge uma pessoa ou um bem no solo", true, false],
                ["Colisão com outra aeronave, conforme a apólice", true, false],
                ["Queda ou dano acidental no próprio drone", false, true],
                ["Roubo ou furto qualificado do equipamento", false, true],
                ["Proteção de acessórios e equipamentos embarcados", false, true],
              ].map(([situation, reta, hull]) => (
                <TableRow key={String(situation)}>
                  <TableCell className="min-w-56 font-medium">{String(situation)}</TableCell>
                  <TableCell>
                    {reta ? <CheckCircle className="h-5 w-5 text-primary" aria-label="Pode estar coberto" /> : <XCircle className="h-5 w-5 text-destructive" aria-label="Não é cobertura do produto" />}
                  </TableCell>
                  <TableCell>
                    {hull ? <CheckCircle className="h-5 w-5 text-primary" aria-label="Pode estar coberto" /> : <XCircle className="h-5 w-5 text-destructive" aria-label="Não é cobertura do produto" />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Comparação geral. Coberturas, limites, franquias e exclusões dependem das condições da seguradora e da proposta aceita.
        </p>
        <div className="mt-6 text-center">
          <Link to="/seguro-drone-agricola">
            <Button variant="outline">Conhecer o seguro casco para drone agrícola</Button>
          </Link>
        </div>
      </div>
    </section>

    <section className="py-20" aria-labelledby="operacoes-reta-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <span className="section-label">Enquadramento da operação</span>
          <h2 id="operacoes-reta-heading" className="mt-4">Minha operação com drone precisa de RETA?</h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            Uso, peso, classe da aeronave e características do voo influenciam as obrigações. A tabela ajuda na triagem, mas não substitui a análise da operação.
          </p>
        </div>
        <div className="premium-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Operação</TableHead>
                <TableHead scope="col">Uso</TableHead>
                <TableHead scope="col">Orientação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operationRows.map(([operation, use, guidance]) => (
                <TableRow key={operation}>
                  <TableCell className="min-w-56 font-medium">{operation}</TableCell>
                  <TableCell>{use}</TableCell>
                  <TableCell className="min-w-64 text-muted-foreground">{guidance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-6 flex gap-3 rounded-lg border border-border bg-muted/30 p-5">
          <Info className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            A Patro confirma o enquadramento com base nos dados do equipamento e da operação. Consulte também as regras oficiais vigentes da ANAC, do DECEA e da Anatel antes de operar.
          </p>
        </div>
      </div>
    </section>

    <section className="py-20 gradient-surface" aria-labelledby="documentos-reta-heading">
      <div className="container mx-auto px-4 max-w-5xl grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <span className="section-label">Antes da cotação</span>
          <h2 id="documentos-reta-heading" className="mt-4 mb-6">Dados e documentos normalmente solicitados</h2>
          <ul className="space-y-3 list-none">
            {documents.map((document) => (
              <li key={document} className="flex items-start gap-3">
                <FileCheck2 className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" aria-hidden="true" />
                <span className="text-sm text-muted-foreground leading-relaxed">{document}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="premium-card p-6 md:p-8" aria-labelledby="fontes-oficiais-heading">
          <ShieldCheck className="h-7 w-7 text-primary mb-4" aria-hidden="true" />
          <h3 id="fontes-oficiais-heading" className="text-lg font-semibold mb-3">Regulamentação e fontes oficiais</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            O enquadramento deve considerar o Código Brasileiro de Aeronáutica, o RBAC-E nº 94 e as regras operacionais vigentes. Requisitos podem mudar.
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <ExternalLink className="font-medium text-primary underline underline-offset-4" href="https://www.anac.gov.br/assuntos/legislacao/legislacao-1/rbha-e-rbac/rbac/rbac-e-94">Consultar o RBAC-E nº 94 na ANAC</ExternalLink>
            <ExternalLink className="font-medium text-primary underline underline-offset-4" href="https://www.gov.br/anac/pt-br/assuntos/drones">Consultar orientações para drones na ANAC</ExternalLink>
            <ExternalLink className="font-medium text-primary underline underline-offset-4" href="https://www.decea.mil.br/drone/">Consultar regras de acesso ao espaço aéreo no DECEA</ExternalLink>
          </div>
        </aside>
      </div>
    </section>

    <section className="py-20" aria-labelledby="cta-reta-heading">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <span className="section-label">Atendimento nacional</span>
        <h2 id="cta-reta-heading" className="mt-4">Solicite a análise do seu Seguro RETA Drone</h2>
        <p className="mt-4 mb-8 text-muted-foreground max-w-2xl mx-auto">
          Envie os dados do drone e da operação. A Patro orienta a documentação e apresenta as condições disponíveis, sem prometer aceitação antes da análise.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/cotacao?tipo=outros">
            <Button size="lg" className="w-full sm:w-auto">Solicitar cotação</Button>
          </Link>
          <ExternalLink
            href={`${WHATSAPP_URL_BASE}?text=${quoteMessage}`}
            onClick={() => trackWhatsAppClick("seguro-reta-drone:final", { origin: "reta-drone-final", insuranceType: "Seguro RETA Drone" })}
          >
            <Button size="lg" variant="outline" className="w-full sm:w-auto">Falar com um especialista</Button>
          </ExternalLink>
        </div>
      </div>
    </section>
  </>
);

export default RetaDroneDetails;