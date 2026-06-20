
# Auditoria SEO/GEO por clusters — Patro Seguros

## 1. Diagnóstico do site atual

O site já é robusto: **231 rotas**, sistema de blog com 7+ datasets de artigos, schema markup, sitemap segmentado, páginas locais por bairro, hub Guarulhos, camada Patro Private (premium) e Edge Functions para leads. A base técnica está sólida — o trabalho agora é **consolidar clusters, fechar gaps de conteúdo, reforçar GEO/AEO (IA) e padronizar ecossistemas**.

### Inventário por cluster (estado atual)

| Cluster | Pilar | Comerciais | Locais (bairro) | Blog dedicado | Premium | Gap principal |
|---|---|---|---|---|---|---|
| **Auto** | `/seguro-auto` | BMW, Marca/:brand, Motorista App, Frota | 4 bairros + Guarulhos | Vistoria | Auto Premium, Carros Luxo, Blindado | **Faltam comparativos, FAQ pilar, hub de modelos navegável, schema Vehicle/Service** |
| **Vida** | `/seguro-vida` | Form. detalhado | — | — | Patrimonial Familiar | Falta cluster com vida individual/empresarial/risco, FAQs |
| **Saúde** | `/seguro-saude`, `/planos-de-saude` | Odonto, Comparativo | — | Odontologia | MedSenior LP | Falta hub de operadoras (20+) com páginas individuais |
| **Empresarial** | `/seguro-empresarial`, HubEmpresarial | Galpão, Galpões Ind., Armazenagem, Condomínio Emp., Lojas Shopping, Restaurante, Imobiliário, Engenharia, Cyber, Ambiental, Garantia | Transportadoras | Lojistas Guarulhos | Empresários Premium | Falta pilar com taxonomia clara + comparativo de coberturas |
| **Agro** | `/seguro-rural` | 15+ páginas (trator, colhedora, drone, pecuário, café, geada, granja, silo…) | — | — | — | **Sem pilar consolidado, sem blog Agro, sem FAQ pilar, sem schema AgriculturalService** |
| **RC Profissional** | `/seguro-rc-profissional` | 9 profissões (médico, dentista, advogado, eng., vet., exec., obras, eventos, prest. serviços) | — | Veterinária | — | Faltam artigos por profissão, comparativos, casos |
| **Residencial/Condomínio** | `/seguro-residencial` | Condomínio Res./Emp., Placa Solar | — | — | Resid. Alto Padrão | Falta blog, FAQ por modalidade |
| **Patrimoniais especiais** | — | Fiança, Gerador, Máquinas Ind., Linha Amarela, Trator Ind. | — | — | — | Sem pilar agrupador |
| **Mobilidade** | — | Moto, JetSki, Celular | Moto Guarulhos | — | — | Falta hub mobilidade |
| **Transporte/Logística** | `/seguro-transporte` | Frota, Transp. Agro | Transportadoras | — | — | Faltam RCF-DC, RCTR-C explicados |
| **Financeiro** | — | Previdência, Consórcio (4), Investimentos | — | — | — | Sem hub financeiro/educacional |

### Camada técnica/GEO — gaps transversais

1. **`llms.txt`** — não existe. Crítico para ChatGPT/Perplexity/Claude entenderem o site sem parsear o React.
2. **Schema** — `InsuranceAgency` + `LocalBusiness` + `FAQPage` já existem, mas falta `Service` por ramo, `Product` por modalidade, `Offer`, `AggregateRating`, `Vehicle` nas páginas de modelo, `BreadcrumbList` em todas internas.
3. **FAQs por cluster** — só existem em algumas páginas. Para AI Overviews, **toda página pilar precisa de FAQ semântico (5–10 perguntas)**.
4. **Tabelas comparativas** — quase ausentes. IA cita tabelas com frequência.
5. **CTAs WhatsApp contextuais** — existem (sticky), mas não são **contextualizados por página** (mensagem pré-preenchida específica do produto).
6. **Hub de modelos Auto** — 40+ slugs em `seoModelosAutoPages.ts`, mas sem página índice navegável `/seguro-auto/modelos` ou `/seguro-auto/marcas`.
7. **Glossário de seguros** — não existe; é um dos formatos mais citados por LLMs.
8. **Cases / depoimentos por segmento** — existe `/depoimentos` genérico; falta atrelar ao cluster.

---

## 2. Roadmap em fases

### Fase 1 — Camada técnica GEO global (transversal, baixo risco)
- Criar `public/llms.txt` listando hubs por cluster.
- Adicionar `Service` + `BreadcrumbList` schema nos pilares que ainda não têm.
- Padronizar FAQ semântico (componente reutilizável) com `FAQPage` JSON-LD em **todas** as páginas pilar.
- Criar helper `buildWhatsAppLink(context)` para mensagens pré-preenchidas por produto.

### Fase 2 — Cluster piloto: Auto + Auto Premium *(escolhido)*
Detalhado na seção 3.

### Fase 3 — Clusters seguintes (ordem sugerida por ROI)
1. **Agro** (gap maior, nacional, ticket alto)
2. **Empresarial / Galpões** (expertise declarada)
3. **Saúde** (volume + hub de operadoras)
4. **RC Profissional** (nichos quentes)
5. **Vida / Patrimonial**
6. **Residencial / Condomínio**
7. **Financeiro / Consórcio**

### Fase 4 — Conteúdo de apoio
- Glossário de seguros (200+ termos com schema `DefinedTerm`).
- Central "Como funciona um sinistro" por ramo.
- Comparativos: PF vs PJ, seguradoras (sem ranquear), coberturas.

### Fase 5 — Local/GEO Guarulhos+SP
- Expandir páginas bairro além de Auto para Residencial e Empresarial.
- Páginas cidade Grande SP (Arujá, Mairiporã, Itaquaquecetuba, Mogi).

---

## 3. Cluster piloto — Auto + Auto Premium (Fase 2 detalhada)

### Estado atual
- Pilar: `/seguro-auto` (existe)
- Comerciais: `/seguro-bmw`, `/seguro/:brand`, `/seguro-motorista-app`, `/seguro-frota`, `/cotacao-seguro-auto`
- Premium: `/seguro-auto-premium-guarulhos`, `/seguro-carros-luxo-guarulhos`, `/seguro-carro-blindado-guarulhos`
- Local: `/seguro-auto-guarulhos` + 4 bairros + `/seguros-guarulhos/:bairro`
- Modelos: 40+ slugs prontos em `seoModelosAutoPages.ts` (mas sem hub navegável)
- LP paga: `/lp/seguro-auto`, `LandingSeguroAuto`, `LandingSeguroAutoPremium`
- Blog: 1 artigo (Vistoria Veicular)

### Entregas Fase 2

**A. Pilar `/seguro-auto` — reforço**
- Adicionar bloco FAQ com 10 perguntas + `FAQPage` schema.
- Tabela comparativa de coberturas (compreensiva / RCF / APP / vidros / carro reserva) com ressalvas.
- Bloco "Quando vale a pena cada cobertura" (consultivo, AEO-friendly).
- Bloco "Como funciona o sinistro auto" (3 passos + WhatsApp sinistro).
- Schema `Service` + `BreadcrumbList`.
- Links internos para: modelos, marcas, bairros, premium, motorista app, frota, blog.

**B. Hub navegável de marcas/modelos**
- Nova rota `/seguro-auto/marcas` → grid de 20+ marcas (logos, links).
- Nova rota `/seguro-auto/modelos` → grid de 40+ modelos.
- Adicionar `BreadcrumbList` schema em todas as páginas filhas.

**C. Comparativos**
- Nova página `/seguro-auto/comparativo-coberturas` (compreensiva vs básica vs intermediária).
- Nova página `/seguro-auto-vs-protecao-veicular` (diferencial regulatório SUSEP).

**D. Blog Auto (5 artigos iniciais)**
1. "Quanto custa seguro auto em Guarulhos em 2026" (sem cravar preço, faixas + variáveis)
2. "Carro reserva no seguro auto: como funciona"
3. "Franquia de seguro auto: como funciona e como escolher"
4. "Seguro auto para motorista de app: o que muda"
5. "Sinistro auto: passo a passo para acionar a seguradora"

Cada artigo: H1 único, intro 2 parágrafos, sumário, 5–8 seções H2, FAQ no final, schema `Article` + `FAQPage`, CTA WhatsApp contextual, links internos para pilar e bairros.

**E. Auto Premium — reforço**
- Adicionar FAQ específico (blindagem, importados, garagem, residência rastreada).
- Cross-link com Residencial Alto Padrão e Patrimonial Familiar.

**F. CTAs WhatsApp contextuais**
- Pilar Auto: "Olá, quero cotação de seguro auto"
- Modelo X: "Olá, quero cotação de seguro para [Modelo X]"
- Bairro Y: "Olá, sou do [Bairro Y] e quero cotação de seguro auto"
- Premium: "Olá, tenho interesse no atendimento Patro Private para auto premium"

### Entregáveis técnicos da Fase 2
- ~3 novas páginas (hub marcas, hub modelos, comparativo coberturas)
- 5 novos posts de blog
- 1 componente `<FAQBlock />` reutilizável com schema
- 1 helper `buildWhatsAppLink(context)`
- Atualização de schema em pilares + bairros
- Atualização do sitemap

### Critérios de aceite
- Todas as páginas Auto têm: H1 único, meta description ≤160ch, canonical próprio, FAQ schema, breadcrumb schema, CTA WhatsApp contextual.
- Hub de modelos resolve 100% dos 40+ slugs sem 404.
- `llms.txt` lista o cluster Auto com descrição.
- Lighthouse SEO ≥ 95 nas páginas tocadas.

---

## 4. Premissas e ressalvas (já alinhadas)

- **Sem inventar dados**: preços em faixas, com "estimativa sujeita a análise".
- **Sem ranquear seguradoras**: comparativos por cobertura, não por marca.
- **Tom**: humano, consultivo, sem cara de IA, sem agressividade.
- **Ressalvas padrão**: "conforme condições da apólice / aceitação da seguradora / perfil do cliente".
- **Design**: zero reconstrução; reuso de tokens e componentes existentes (`InsurancePageTemplate`, `LocalPageTemplate`, `OptimizedImage`, FAQ accordion).

---

## 5. Próximo passo

Se aprovado, eu inicio executando **Fase 1 (camada técnica GEO global) + Fase 2 (cluster Auto)** na mesma rodada, porque a Fase 1 é pré-requisito de qualidade da Fase 2 (componente FAQ, helper WhatsApp, schema padrão).

Estimativa de arquivos tocados nessa primeira execução: ~25 (3 novas páginas, 5 posts, 1 componente FAQ, 1 helper, ajustes em ~10 páginas existentes, sitemap, llms.txt).
