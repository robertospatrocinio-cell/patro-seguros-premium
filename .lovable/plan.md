# Plano — 8 Sugestões de Melhoria SEO/AEO Patro Seguros

Status inicial: Fase 0 concluída (itens 4 e 7). Demais fases aguardam aprovação.

## Fase 0 — Rápidas (FEITO)

### #7 Dados estruturados LocalBusiness + FAQ + Service
Já implementados no projeto:
- `LocalBusinessSchema` (@type InsuranceAgency) global na Home e em hubs locais.
- `FAQSchema` (@type FAQPage) nas páginas com Q&A.
- `ServiceSchema` (@type Service + OfferCatalog) nas páginas de produto.
- `OrganizationSchema`, `WebSiteSchema`, `BreadcrumbSchema` ativos.
- Validação: `schema-validation-report.json` = SUCCESS.
Ação restante: nenhuma. Marcar #7 como concluído.

### #4 SUSEP + credenciais visíveis
Footer já exibia SUSEP 212113511 + CNPJ 41.641.558/0001-33 + Selo Melhor Corretora.
Reforço aplicado: SUSEP agora é link para consulta pública oficial (prova verificável).

---

## Fase 1 — Prova social citável (#3)   [aguarda dados reais do cliente]

Requer conteúdo real que a Patro precisa fornecer:
- 5–10 depoimentos com nome completo + cidade + produto contratado (autorização LGPD).
- 3 casos de sinistro resolvidos (tipo, valor indenizado, prazo). Sem dados sensíveis.
- Contadores reais: nº de clientes ativos, nº de apólices/ano, ticket médio.
- Links públicos: perfil Google Business, Reclame Aqui (RA1000/verificado), LinkedIn.

Entrega: componente `SocialProofBlock` na Home + página `/prova-social` + schema `Review` e `AggregateRating` (com nota real, não inventada).

---

## Fase 2 — Diferenciar páginas locais (#2)

Problema atual: `LocalPageTemplate` gera muitas páginas de bairro com estrutura idêntica.
Solução: enriquecer `src/lib/bairrosData.ts` com por bairro:
- Índice de risco local (auto/residencial/empresarial) — fonte SSP-SP.
- 2–3 hospitais/postos, 2–3 shoppings/centros comerciais, principais vias.
- Exemplo real anonimizado ("cliente do Jd. Maia economizou X%").
- Perfil socioeconômico curto (2 linhas) para variar copy.

Entrega: campos novos em `Bairro` type + variação de copy no template + geração via `localFAQGenerator` com dados reais por bairro.

---

## Fase 3 — FAQs e comparativos por ramo × bairro (#1)

Criar matriz produto × bairro para os combos de maior valor:
- Ramos: auto, fiança, táxi/app, residencial, empresarial (galpão).
- Bairros prioritários: Cumbica, Cidade Maia, V. Augusta, Centro, Pimentas, Bonsucesso, Macedo.

Entregas:
1. `src/data/comparativoCoberturas.ts` — tabelas de cobertura por ramo (compreensiva vs RC vs APP) com valores/franquia típicos.
2. Componente `<ComparativoCoberturas ramo="auto" />` reutilizável.
3. Ampliar `localFAQGenerator` com perguntas reais coletadas de "People Also Ask" (item plugado ao Semrush).
4. 15–20 páginas ramo×bairro novas roteadas em `App.tsx` + adicionadas ao sitemap.

---

## Fase 4 — Nichos defensáveis (#6)

Expandir páginas onde a concorrência é fraca:
- `/seguro-taxi-guarulhos` — requisitos ANTT, franquia, GLP/CNG, passo-a-passo.
- `/seguro-app-motorista-guarulhos` (Uber/99) — cobertura APP, RCFV incluído.
- `/seguro-galpao-cumbica` — já existe cluster; incluir tabela de valores por m², CFTV, sprinkler.
- `/seguro-fianca-locaticia-guarulhos` — parcelamento, análise de crédito, aceite imobiliárias.

Cada página: preço médio (faixa), requisitos, checklist, FAQs específicas, CTA cotação segmentada.

---

## Fase 5 — Blog/guia local Guarulhos (#5)

Publicar 8–12 artigos long-tail em `src/data/blogGuarulhosContent.ts` (já existe base):
1. "Melhor seguro auto por bairro em Guarulhos [ano]"
2. "Seguro para táxi em Guarulhos: quanto custa e como contratar"
3. "Fiança locatícia em Guarulhos: guia para inquilino e proprietário"
4. "Roubo de carga em Cumbica: como proteger o galpão"
5. "Comparativo planos de saúde por bairro de Guarulhos"
6. "Seguro residencial em condomínio Cidade Maia"
7. "Motorista de app em Guarulhos: seguro que vale a pena"
8. "Índice de sinistralidade auto por CEP em Guarulhos"

Cada artigo: 1200–1800 palavras, 3+ estatísticas, links internos para páginas de produto/bairro, `ArticleSchema` + `BreadcrumbSchema`.

---

## Fase 6 — Menções externas / diretórios (#8)   [ação off-site]

Fora do código. Checklist para a equipe:
- Cadastro em: Encontre Seu Corretor (Fenacor), Portal SUSEP, Segs.com.br, Sonho Seguro, CQCS, Apólice.
- Portais locais Guarulhos: Guarulhos Web, Folha Metropolitana, Diário de Guarulhos.
- Parcerias: publicar case em blog de seguradora parceira (Porto, Allianz, HDI).
- Guest posts em 2–3 blogs de nicho (frota, condomínio).

Entrega no código: página `/imprensa` já existe — adicionar seção "Onde a Patro é mencionada" conforme menções forem conquistadas.

---

## Ordem sugerida de execução

1. Fase 2 (diferenciar locais) — maior impacto/menor esforço.
2. Fase 4 (nichos defensáveis) — ganho competitivo rápido.
3. Fase 3 (matriz ramo×bairro) — depende de 2 e 4.
4. Fase 5 (blog) — em paralelo com 3.
5. Fase 1 (prova social) — quando cliente fornecer dados.
6. Fase 6 — trilha off-site contínua.

Cada fase deve ser aprovada individualmente antes da execução.