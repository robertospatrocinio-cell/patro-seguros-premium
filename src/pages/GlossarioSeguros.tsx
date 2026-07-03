import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, ArrowRight, MessageCircle, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import SpeakableSchema from "@/components/SpeakableSchema";
import { trackInternalLinkClick, trackWhatsAppClick } from "@/lib/tracking";

const PHONE = "551151997500";
const WA_MSG =
  "Olá! Vi o glossário de seguros da Patro e tenho uma dúvida sobre um termo específico. Pode me ajudar?";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MSG)}`;

type Term = {
  term: string;
  definition: string;
  related?: { label: string; href: string }[];
};

type Category = {
  id: string;
  title: string;
  description: string;
  terms: Term[];
};

const CATEGORIES: Category[] = [
  {
    id: "gerais",
    title: "Conceitos gerais",
    description: "Termos comuns a qualquer apólice de seguro.",
    terms: [
      { term: "Apólice", definition: "Contrato formal entre o segurado e a seguradora que descreve coberturas, exclusões, prêmio, vigência, franquia, importância segurada e demais condições. Toda apólice é registrada na SUSEP." },
      { term: "Prêmio", definition: "Valor que o segurado paga à seguradora pela cobertura contratada. Pode ser anual, semestral, mensal ou em parcelas, conforme o produto." },
      { term: "Sinistro", definition: "Evento previsto na apólice que aciona o pagamento da indenização — colisão, incêndio, roubo, morte, internação etc." },
      { term: "Franquia", definition: "Parte do prejuízo que fica por conta do segurado em cada sinistro. Quanto menor a franquia, maior tende a ser o prêmio." },
      { term: "Importância segurada", definition: "Valor máximo que a seguradora paga em caso de sinistro coberto. Deve refletir o valor real do bem para evitar subseguro." },
      { term: "Indenização", definition: "Valor pago pela seguradora ao segurado (ou beneficiário) após a regulação do sinistro, descontada a franquia." },
      { term: "Vigência", definition: "Período em que a apólice está válida. No Brasil, em geral 12 meses, com renovação anual." },
      { term: "Carência", definition: "Prazo após a contratação durante o qual determinadas coberturas ainda não estão ativas. Comum em vida, saúde e doenças graves." },
      { term: "Cláusula", definition: "Item específico da apólice que detalha uma cobertura, exclusão, obrigação ou condição. Cláusulas adicionais aumentam o prêmio." },
      { term: "Endosso", definition: "Alteração formal feita na apólice durante a vigência (inclusão de motorista, mudança de endereço, ampliação de cobertura)." },
      { term: "Beneficiário", definition: "Pessoa indicada pelo segurado para receber a indenização (típico de seguro de vida e acidentes pessoais)." },
      { term: "Corretor de seguros", definition: "Profissional habilitado pela SUSEP que intermedia a contratação entre segurado e seguradora, sem custo adicional para o cliente." },
      { term: "SUSEP", definition: "Superintendência de Seguros Privados — autarquia federal que regula e fiscaliza o mercado de seguros, capitalização e previdência aberta no Brasil." },
      { term: "Resseguro", definition: "Operação na qual a seguradora transfere parte do risco a uma resseguradora, garantindo capacidade para grandes apólices." },
      { term: "Regulação de sinistro", definition: "Processo técnico em que a seguradora apura causa, extensão do prejuízo e enquadramento na cobertura antes de pagar a indenização." },
    ],
  },
  {
    id: "auto",
    title: "Auto e veículos",
    description: "Termos específicos de seguro auto, moto, caminhão e veículos pesados.",
    terms: [
      { term: "Cobertura compreensiva (Casco)", definition: "Cobertura mais completa do seguro auto — inclui colisão, incêndio, roubo, furto qualificado, fenômenos da natureza e RCF.", related: [{ label: "Comparativo de coberturas", href: "/seguro-auto/comparativo-coberturas" }] },
      { term: "RCF (Responsabilidade Civil Facultativa)", definition: "Cobertura para danos materiais e corporais que o segurado causar a terceiros — fundamental em qualquer apólice auto." },
      { term: "APP (Acidentes Pessoais de Passageiros)", definition: "Indenização por morte ou invalidez de ocupantes do veículo segurado em acidente coberto." },
      { term: "Carro reserva", definition: "Veículo cedido ao segurado enquanto o seu está em reparo em oficina referenciada, conforme dias e categoria contratados." },
      { term: "Valor de mercado referenciado (FIPE)", definition: "Forma de indenização em que, em caso de perda total, a seguradora paga o valor FIPE do veículo na data do sinistro multiplicado pelo fator contratado." },
      { term: "Valor determinado", definition: "Forma de indenização em que o valor pago em caso de perda total é fixo, definido na contratação — comum em veículos premium, blindados e clássicos.", related: [{ label: "Seguro auto premium", href: "/seguro-auto/marcas" }] },
      { term: "Bônus", definition: "Desconto por histórico sem sinistro. A cada vigência sem aviso, o segurado sobe de classe (1 a 10), reduzindo o prêmio na renovação." },
      { term: "Perfil", definition: "Conjunto de dados do principal condutor (idade, sexo, estado civil, CEP de pernoite, uso) que determina o cálculo do prêmio." },
      { term: "Vistoria prévia", definition: "Inspeção feita no início da apólice para verificar estado do veículo e equipamentos. Algumas seguradoras dispensam para zero-km." },
      { term: "Sinistro de pequeno reparo", definition: "Avaria de baixo valor (martelinho, polimento, troca de para-choque) que pode ser regulada sem perda integral de bônus, conforme produto." },
    ],
  },
  {
    id: "empresarial",
    title: "Empresarial e patrimonial",
    description: "Termos do seguro empresarial, galpões, condomínios e responsabilidade civil.",
    terms: [
      { term: "Seguro Compreensivo Empresarial", definition: "Apólice multirrisco para PME — incêndio, raio, explosão, roubo, vendaval, danos elétricos, RC e equipamentos." },
      { term: "Lucros Cessantes", definition: "Cobertura que indeniza o lucro líquido que a empresa deixa de ganhar enquanto está paralisada por um sinistro coberto." },
      { term: "RC Operações", definition: "Responsabilidade Civil por danos causados a terceiros decorrentes da operação normal da empresa." },
      { term: "RC Produto", definition: "Responsabilidade Civil por danos causados por produto fabricado, vendido ou distribuído pela empresa após a entrega." },
      { term: "RC Empregador", definition: "Cobertura para indenizações trabalhistas decorrentes de acidente de trabalho com funcionário próprio." },
      { term: "Riscos Patrimoniais", definition: "Linha de seguros que protege ativos físicos — prédio, conteúdo, máquinas, estoque — contra incêndio, vendaval, alagamento e demais eventos contratados.", related: [{ label: "Seguro de galpão", href: "/seguro-galpao-guarulhos" }] },
      { term: "Riscos de Engenharia", definition: "Cobertura para obras civis e instalação/montagem de equipamentos durante o período de construção." },
      { term: "Garantia Judicial e Contratual", definition: "Substitui depósito judicial em dinheiro ou caução em contrato público/privado, liberando capital de giro." },
      { term: "D&O (Directors & Officers)", definition: "Seguro de responsabilidade civil para administradores, diretores e conselheiros por atos de gestão." },
      { term: "E&O (Errors & Omissions)", definition: "RC Profissional para prestadores de serviço técnico (engenharia, TI, consultoria, saúde) por erro ou omissão.", related: [{ label: "RC Profissional", href: "/seguro-rc-profissional" }] },
      { term: "Cyber Risk", definition: "Cobertura para incidentes cibernéticos — vazamento de dados, ransomware, interrupção de sistemas e LGPD." },
    ],
  },
  {
    id: "vida-saude",
    title: "Vida, saúde e pessoas",
    description: "Termos de seguro de vida, acidentes pessoais e planos de saúde.",
    terms: [
      { term: "Morte natural", definition: "Cobertura básica do seguro de vida — indeniza o beneficiário em caso de óbito por qualquer causa após o término da carência." },
      { term: "Morte acidental", definition: "Cobertura adicional que dobra (ou complementa) a indenização quando o óbito decorre exclusivamente de acidente." },
      { term: "Invalidez Permanente Total ou Parcial por Acidente (IPA)", definition: "Indenização proporcional ao grau de invalidez decorrente de acidente coberto." },
      { term: "Invalidez Funcional por Doença (IFPD)", definition: "Indenização quando a doença causa perda funcional permanente e irreversível para a atividade laboral." },
      { term: "Doenças Graves", definition: "Cobertura que antecipa parte do capital segurado no diagnóstico de doenças listadas (câncer, AVC, infarto, transplante)." },
      { term: "Auxílio funeral", definition: "Reembolso ou prestação de serviço funeral em caso de óbito do segurado ou de dependentes contratados." },
      { term: "Capital Segurado", definition: "Valor total da indenização contratado para cada cobertura do seguro de vida." },
      { term: "Coparticipação (saúde)", definition: "Percentual ou valor fixo pago pelo beneficiário a cada uso de consulta, exame ou procedimento — reduz a mensalidade." },
      { term: "Carência (saúde)", definition: "Prazo após a adesão em que determinadas coberturas ainda não podem ser usadas, conforme regras da ANS." },
      { term: "Rede credenciada", definition: "Conjunto de hospitais, clínicas, laboratórios e médicos que atendem o beneficiário sem desembolso. Sujeita a alterações pela operadora." },
      { term: "Reembolso", definition: "Modalidade em que o beneficiário paga o atendimento fora da rede e a operadora reembolsa parte ou o total, conforme tabela." },
    ],
  },
  {
    id: "agro",
    title: "Agro e rural",
    description: "Termos específicos de seguro agrícola, pecuário, máquinas e propriedade rural.",
    terms: [
      { term: "PSR (Programa de Subvenção ao Prêmio do Seguro Rural)", definition: "Programa federal que paga parte do prêmio do seguro agrícola, reduzindo o custo para o produtor — sujeito a cota anual e elegibilidade da cultura.", related: [{ label: "Hub Seguro Agro", href: "/seguro-agro" }] },
      { term: "Penhor Rural", definition: "Seguro do estoque rural (grãos, insumos) dado em garantia em operação de crédito rural.", related: [{ label: "Seguro Rural", href: "/seguro-rural" }] },
      { term: "Seguro Agrícola (Lavoura)", definition: "Cobertura do ciclo da cultura contra eventos climáticos cobertos — granizo, geada, vendaval, chuva excessiva, seca, conforme produto." },
      { term: "Seguro Pecuário", definition: "Cobertura para rebanho contra morte por acidente e doenças cobertas." },
      { term: "Silo / Armazém Graneleiro", definition: "Estrutura para armazenamento de grãos — seguro cobre a estrutura, conteúdo e, em alguns produtos, perda por falha de aeração.", related: [{ label: "Seguro de silo", href: "/seguro-silo-agricola" }] },
      { term: "Importância Segurada por hectare", definition: "Valor segurado calculado por hectare plantado, multiplicado pela área da apólice — base do cálculo no seguro agrícola." },
      { term: "ZARC (Zoneamento Agrícola de Risco Climático)", definition: "Estudo do MAPA que define janelas de plantio por município e cultura com menor risco climático. Plantar fora do ZARC tende a recusa de cobertura, mesmo com apólice vigente." },
      { term: "Drone Agrícola (RPA)", definition: "Aeronave remotamente pilotada usada para mapeamento ou pulverização. Operação acima de 25 kg ou comercial exige registro ANAC, cadastro SISANT e Seguro RCF obrigatório.", related: [{ label: "Seguro de drone agrícola", href: "/seguro-drone-agricola" }] },
    ],
  },
  {
    id: "transporte",
    title: "Transporte de cargas",
    description: "Termos do seguro de transporte rodoviário, aéreo e internacional.",
    terms: [
      { term: "RCTR-C (Resp. Civil do Transportador Rodoviário de Carga)", definition: "Cobertura obrigatória para empresas que transportam cargas de terceiros — cobre danos à carga em acidente do veículo transportador." },
      { term: "RCF-DC (Desaparecimento de Carga)", definition: "Cobertura facultativa para roubo e desaparecimento de carga sob responsabilidade do transportador." },
      { term: "RCA-C (Ambiental do Transportador)", definition: "Cobertura para danos ambientais decorrentes de acidente no transporte de cargas perigosas." },
      { term: "Averbação", definition: "Comunicação prévia à seguradora dos embarques realizados no mês, base para o cálculo do prêmio do seguro de transporte." },
      { term: "GRIS", definition: "Gerenciamento de Risco — exigências da seguradora (rastreador, escolta, rota, pernoite) para que a apólice esteja válida." },
    ],
  },
];

const ALL_TERMS_COUNT = CATEGORIES.reduce((sum, c) => sum + c.terms.length, 0);

const GlossarioSeguros = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.map((cat) => ({
      ...cat,
      terms: cat.terms.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q),
      ),
    })).filter((cat) => cat.terms.length > 0);
  }, [query]);

  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glossário de Seguros — Patro Seguros",
    description: `${ALL_TERMS_COUNT}+ termos do mercado de seguros brasileiro explicados de forma simples por um corretor SUSEP.`,
    url: "https://www.patroseguros.com.br/glossario-seguros",
    inDefinedTermSet: "https://www.patroseguros.com.br/glossario-seguros",
    hasDefinedTerm: CATEGORIES.flatMap((cat) =>
      cat.terms.map((t) => ({
        "@type": "DefinedTerm",
        name: t.term,
        description: t.definition,
        inDefinedTermSet: "https://www.patroseguros.com.br/glossario-seguros",
        termCode: t.term
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      })),
    ),
  };

  return (
    <>
      <PageMeta
        title={`Glossário de Seguros — ${ALL_TERMS_COUNT}+ termos explicados | Patro Seguros`}
        description={`Glossário com ${ALL_TERMS_COUNT}+ termos de seguros explicados de forma simples: apólice, sinistro, franquia, RCF, lucros cessantes, PSR, RCTR-C e mais. Por corretor SUSEP.`}
      />
      <Helmet>
        <link rel="canonical" href="https://www.patroseguros.com.br/glossario-seguros" />
        <script type="application/ld+json">{JSON.stringify(definedTermSet)}</script>
      </Helmet>
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Glossário de seguros", url: "/glossario-seguros" },
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb items={[{ label: "Glossário de seguros", href: "/glossario-seguros" }]} />
        </div>

        {/* Hero */}
        <section className="py-14 md:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="section-label">Conteúdo de referência</span>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Glossário de Seguros
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {ALL_TERMS_COUNT} termos do mercado de seguros explicados de forma simples,
              organizados por linha. Escrito por corretor registrado na SUSEP — sem letras
              miúdas, sem termo inventado.
            </p>

            {/* Search */}
            <div className="mt-8 max-w-xl mx-auto relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                aria-hidden="true"
              />
              <label htmlFor="glossary-search" className="sr-only">
                Buscar termo no glossário
              </label>
              <input
                id="glossary-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar termo (ex.: franquia, lucros cessantes, PSR)"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            {/* Categories nav */}
            <nav className="mt-6 flex flex-wrap gap-2 justify-center" aria-label="Categorias do glossário">
              {CATEGORIES.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {c.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Terms */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-10">
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground">
                Nenhum termo encontrado para “{query}”. Tente outra palavra ou fale com a Patro no
                WhatsApp.
              </p>
            )}
            {filtered.map((cat) => (
              <article key={cat.id} id={cat.id} className="scroll-mt-24">
                <header className="mb-5">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" /> {cat.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
                </header>
                <dl className="space-y-3">
                  {cat.terms.map((t) => {
                    const id = t.term
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "");
                    return (
                      <div
                        key={t.term}
                        id={`term-${id}`}
                        className="rounded-xl border border-border bg-card p-5 scroll-mt-24"
                      >
                        <dt className="font-semibold text-foreground">{t.term}</dt>
                        <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {t.definition}
                        </dd>
                        {t.related && t.related.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {t.related.map((r) => (
                              <Link
                                key={r.href}
                                to={r.href}
                                onClick={() =>
                                  trackInternalLinkClick({
                                    source: `glossario:${t.term}`,
                                    destination: r.href,
                                    label: r.label,
                                  })
                                }
                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                              >
                                {r.label} <ArrowRight className="h-3 w-3" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-primary/5 border-y border-border">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Ficou em dúvida sobre algum termo?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Fala com a Patro no WhatsApp. Explicamos com seu caso real, sem juridiquês — e, se
              for o caso, já cotamos junto.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("glossario:cta")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> Tirar dúvida no WhatsApp
            </a>
          </div>
        </section>
      <SpeakableSchema />
      </main>
      <Footer />
      <StickyQuoteBar
        source="glossario-seguros"
        quoteHref="/cotacao"
        whatsappMessage={WA_MSG}
        ctaLabel="Falar com especialista"
      />
    </>
  );
};

export default GlossarioSeguros;