import { droneComparison, droneFaqs, droneTopics, retaAgricolaTopics } from "./droneAgricolaPreview";

const origin = "https://www.patroseguros.com.br";
export const dronePublicPaths = ["/seguro-drone-agricola", "/seguro-reta-drone"] as const;

export function getDroneSeo(pathname: string) {
  const path = pathname.replace(/\/+$/, "");
  if (!dronePublicPaths.some(route => route === path)) return null;
  const reta = path === "/seguro-reta-drone";
  const h1 = reta ? "RETA para drones agrícolas" : "Seguro para drones agrícolas";
  const description = reta
    ? "Avalie RETA para drones agrícolas: responsabilidade por danos a terceiros, limites e cuidados com pulverização e deriva. Atendimento nacional da Patro."
    : "Analise casco e RETA para drones agrícolas, baterias e acessórios. Cotação com a Patro para produtores e prestadores em todo o Brasil.";
  const canonical = `${origin}${path}`;
  return {
    h1, title: `${h1} | Patro Seguros`, description, canonical, ogUrl: canonical,
    ogType: "website" as const,
    faqs: droneFaqs,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service", "@id": `${canonical}#service`, url: canonical,
          name: h1, description,
          serviceType: reta ? "Análise de RETA para drones agrícolas" : "Análise de casco e RETA para drones agrícolas",
          provider: { "@id": `${origin}/#insurance-agency` },
          areaServed: { "@type": "Country", name: "Brasil" },
        },
        {
          "@type": "FAQPage", "@id": `${canonical}#faq`, url: `${canonical}#perguntas-drone`,
          mainEntity: droneFaqs.map(faq => ({
            "@type": "Question", name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
      ],
    },
  };
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]!));

// Usa as mesmas fontes editoriais da página, sem promessas ou regras adicionais.
export function getDroneStaticContent(pathname: string) {
  const meta = getDroneSeo(pathname);
  if (!meta) return null;
  const reta = pathname === "/seguro-reta-drone";
  const topics = reta ? retaAgricolaTopics : droneTopics;
  const intro = reta
    ? "Analise a responsabilidade por danos a terceiros na operação agrícola. Orientação para produtores, prestadores de pulverização e mapeamento, cooperativas e empresas."
    : "Analise a proteção do seu drone, baterias e acessórios e as responsabilidades da operação agrícola. Atendimento em todo o Brasil para produtores e prestadores de serviços.";
  const body = [
    `<p>${intro}</p>`,
    '<h2>Duas proteções, finalidades diferentes</h2>',
    '<h3>Casco — proteção do equipamento</h3><p>Trata dos danos ao próprio drone nos eventos contratados. Inclua na análise baterias, controles, sensores, tanques e demais acessórios, com seus valores e condições de uso.</p>',
    '<h3>RETA — responsabilidade civil aeronáutica</h3><p>Trata da responsabilidade por danos a terceiros, conforme os limites e condições contratados. Não é a proteção do próprio drone.</p>',
    '<p>Casco e RETA têm finalidades diferentes. A responsabilidade pela pulverização e por deriva exige análise específica.</p>',
    '<h2>Vamos entender sua operação?</h2><p>Nome, WhatsApp e autorização para contato são suficientes para começar. Os detalhes do equipamento são opcionais. Sem CPF, nota fiscal ou envio de arquivos nesta etapa. Nossa equipe solicitará a documentação necessária na sequência. Pedir uma cotação não inicia a cobertura.</p>',
    '<h2>Casco e RETA em uma comparação</h2>',
    ...droneComparison.map(row => `<h3>${escapeHtml(row.label)}</h3><p><strong>Casco:</strong> ${escapeHtml(row.casco)}</p><p><strong>RETA:</strong> ${escapeHtml(row.reta)}</p>`),
    `<h2>${reta ? "O que conferir no RETA agrícola" : "O que analisar antes de contratar"}</h2>`,
    ...topics.map(topic => `<h3>${escapeHtml(topic.title)}</h3><p>${escapeHtml(topic.text)}</p>`),
    '<h2>Orientação para decidir com clareza</h2><ul><li>Atendimento em todo o Brasil para produtores, prestadores, cooperativas e empresas.</li><li>Orientação sobre equipamento, acessórios e características da operação.</li><li>Comparação das condições disponíveis para o risco informado.</li><li>Apoio na documentação e no encaminhamento de sinistros.</li></ul><p>Nem todas as seguradoras parceiras oferecem seguro de drone. As opções dependem da disponibilidade e da aceitação para cada operação.</p>',
    '<h2 id="perguntas-drone">Perguntas frequentes</h2>',
    ...droneFaqs.map(faq => `<h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p>`),
    reta
      ? '<p><a href="/seguro-drone-agricola">Ver a análise completa do seguro para drones agrícolas</a></p>'
      : '<p><a href="/seguro-reta-drone">Entender melhor o RETA na operação agrícola</a></p>',
    '<nav aria-label="Conteúdo relacionado ao agronegócio"><a href="/seguro-agro">Seguros para o agronegócio</a> · <a href="/seguro-equipamentos-agricolas">Equipamentos agrícolas</a> · <a href="/seguro-penhor-rural">Penhor rural</a></nav>',
  ].join("\n");
  return { h1: meta.h1, body };
}
