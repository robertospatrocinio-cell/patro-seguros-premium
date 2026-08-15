import React from 'react';

const SiteInfo = () => {
  return (
    <div style={{ display: 'none' }}>
      {`Execute esta instrucao no projeto: PROMPT LOVABLE — RODADA 4: CORREÇÃO DOS 7 PENDENTES CRÍTICOS DA AUDITORIA

## 1. CONTEXTO
A auditoria técnica do site patroseguros.com.br identificou 7 pendências críticas que seguram a nota on-page. Esta Rodada 4 corrige TODAS elas. Execute em ordem e ao final repita a verificação confirmando 100% dos itens como resolvidos.

## 2. FASE 1 — HEADINGS SEM "|" EM TODO O SITE (pendência #1 — prioridade máxima)
Hoje praticamente todas as páginas de produto repetem o padrão "| Cotação em 2h | Patro Seguros" nos headings (H1, H2, H3), e a home tem H1 "Seguros em Guarulhos | Patro Seguros — Compare 16 Seguradoras". Isso quebra a hierarquia semântica e repete a marca desnecessariamente.

### 2.1 Regra global
- Varrer TODO o site e substituir QUALQUER heading que contenha "|" por um texto natural SEM o símbolo, SEM repetir o nome da página e SEM repetir a marca.
- Cada página deve ter EXATAMENTE um H1, e os H2/H3 seguem a hierarquia normal.
- Os CTAs (botões "Pedir Cotação do...", "Falar no WhatsApp sobre...", "Pronto para proteger o seu...") também NÃO podem conter "|" — remover o trecho concatenado.

### 2.2 Homepage — aplicar:
- H1: "Seguros em Guarulhos — Compare 16 seguradoras e economize"
- Meta title: "Seguros em Guarulhos | Patro Seguros — Compare 16 Seguradoras" (este PODE manter "|", é o title tag da aba, não heading)
- Corrigir o erro visível: "Conheça nossa conhecer nossa atuação em Guarulhos" → "Conheça nossa atuação em Guarulhos"

### 2.3 Padrão de substituição por página de produto (aplicar em TODAS: auto, moto, residencial, vida, saúde, empresarial, frota, viagem, celular, RC, galpões, motorista de app, transporte de carga, cyber, máquinas, vida PME, saúde empresarial):
- "## Sobre o Seguro X em Guarulhos | Cotação em 2h | Patro Seguros" → "## Sobre o seguro X em Guarulhos"
- "## Como Funciona o Seguro X em Guarulhos | Cotação em 2h | Patro Seguros" → "## Como funciona o seguro X em Guarulhos"
- "## O que o Seguro X em Guarulhos | Cotação em 2h | Patro Seguros cobre" → "## O que o seguro X em Guarulhos cobre"
- "## Quanto custa o Seguro X em Guarulhos | Cotação em 2h | Patro Seguros?" → "## Quanto custa o seguro X em Guarulhos?"
- "## Quem precisa do Seguro X em Guarulhos | Cotação em 2h | Patro Seguros?" → "## Quem precisa do seguro X em Guarulhos?"
- "## Perguntas Frequentes sobre Seguro X em Guarulhos | Cotação em 2h | Patro Seguros" → "## Perguntas frequentes sobre o seguro X em Guarulhos"
- Os títulos de seção genéricos ("Passo a Passo", "Coberturas", "Exemplos Práticos", "Aprofundamento", "Avaliações no Google", "Autoridade & Confiança", "Cotação Gratuita", "FAQ", "Topic Cluster", "Trilha recomendada", "Mapa de Seguros") permanecem como estão — apenas remova o trecho "| ... | Patro Seguros" quando aparecer.

### 2.4 Página Central de Sinistros — corrigir gênero:
- "## O que o Central de Sinistros cobre" → "## O que a Central de Sinistros cobre"
- "## Quem deve usar o Central de Sinistros" → "## Quem deve usar a Central de Sinistros"
- "## Por que acionar o Central pela Patro" → "## Por que acionar a Central pela Patro"
- "## Perguntas Frequentes sobre Central de Sinistros" → "## Perguntas frequentes sobre a Central de Sinistros"
- Verificar todos os "o Central de Sinistros" no corpo → "a Central de Sinistros".

## 3. FASE 2 — WHATSAPP SEM TÍTULO CONCATENADO (pendência #2)
Hoje os botões de WhatsApp das páginas de produto enviam mensagem com o título completo da página (ex.: "gostaria de uma cotação de Seguro Empresarial em Guarulhos | Cotação em 2h | Patro Seguros.").

### Regra
- Varrer o projeto e substituir TODA mensagem de WhatsApp que contenha "|" ou o título completo da página por: "Olá! Vim pelo site da Patro Seguros e gostaria de uma cotação de [PRODUTO]." — ex.: "Olá! Vim pelo site da Patro Seguros e gostaria de uma cotação de seguro empresarial."
- Manter apenas o nome simples do produto (sem "|", sem "em Guarulhos", sem "Cotação em 2h", sem "Patro Seguros" repetido).
- Padrões aceitos: "Olá! Vim pelo site da Patro Seguros e gostaria de uma cotação de seguro." (genérico) ou com o produto específico.
- Nos formulários e no hero, manter a mensagem existente do padrão já usado ("Olá, vim pelo site...").

## 4. FASE 3 — PÁGINAS DE BAIRRO FINAS (pendência #3)
As páginas de bairro estão com meta description genérica "Procurando por X? A Patro Seguros é especialista em soluções de proteção em Guarulhos." e conteúdo fino (só template).

### Regra por bairro (aplicar em TODAS as páginas de bairro existentes: Cidade Maia, Cumbica, Pimentas, Bonsucesso, Vila Augusta, Centro, Taboão, Vila Galvão, Macedo, Gopoúva, Picanço, Jardim Maia, Ponte Grande):
- Garantir mínimo de 400-600 palavras de conteúdo EXCLUSIVO por bairro (proibido copiar texto entre bairros).
- Estrutura mínima: contexto local real do bairro (perfil residencial/comercial, vias principais, pontos de referência), faixa de preço média de seguro auto (dados já publicados no site), seguradoras mais competitivas no perfil do bairro, dicas de economia, FAQ local com 3-4 perguntas, CTA de cotação e WhatsApp.
- Meta description nova no padrão: "Seguros em [Bairro], Guarulhos: auto, residencial, empresarial e saúde. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta." (ajustar o nome do bairro).
- Title: "Seguros em [Bairro], Guarulhos | Cotação em 2h | Patro" (≤60 caracteres).
- Links internos para as páginas de produto (auto, residencial, empresarial, saúde) e para o blog.
- Verificar se a URL real de cada bairro é a que está no menu da home — se alguma URL antiga existir (ex.: /seguros-cidade-maia-guarulhos), garantir 301 para a canônica atual (/seguros-shopping-maia-cidade-maia-guarulhos) e NÃO criar página duplicada.

## 5. FASE 4 — SCHEMA JSON-LD (pendência #4 — provavelmente não implementado)
Se os schemas não foram implementados nas Rodadas 1-3, implemente agora via Custom Code / SEO settings no <head> de cada página. NUNCA duplicar blocos na mesma página.

### 5.1 Homepage — colar este JSON-LD exato:
{
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "name": "Patro Seguros — Patro Corretora de Seguros LTDA",
  "url": "https://www.patroseguros.com.br/",
  "logo": "https://www.patroseguros.com.br/images/logo-full.webp",
  "image": "https://www.patroseguros.com.br/images/logo-full.webp",
  "telephone": "+551151997500",
  "email": "contato@patroseguros.com.br",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Salgado Filho, 2120 — Sala 219 — Ed. Via Alameda",
    "addressLocality": "Guarulhos",
    "addressRegion": "SP",
    "postalCode": "07115-000",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-23.4460",
    "longitude": "-46.5220"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:30",
    "closes": "18:00"
  },
  "areaServed": [
    { "@type": "City", "name": "Guarulhos" },
    { "@type": "AdministrativeArea", "name": "Grande São Paulo" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "67"
  },
  "sameAs": [
    "https://www.instagram.com/patroseguros",
    "https://www.facebook.com/patroseguros",
    "https://www.linkedin.com/company/patro-seguros",
    "https://www.google.com/maps?cid=273879799324962533"
  ],
  "parentOrganization": {
    "@type": "Organization",
    "name": "Patro Corretora de Seguros LTDA",
    "taxID": "41.641.558/0001-33"
  }
}

### 5.2 Páginas de produto (auto, residencial, vida, saúde, empresarial, frota, moto, viagem, celular, RC, galpões, motorista de app, transporte de carga, cyber, máquinas):
- Adicionar no <head>: Service (name, description, provider Patro Seguros, areaServed Guarulhos, url) + FAQPage (marcar as perguntas/ respostas visíveis da página) + BreadcrumbList (Início > Categoria > Página).
### 5.3 Blog: Article em cada post (headline, datePublished, dateModified, author Person "Roberto Patrocínio", publisher Organization "Patro Seguros").
### 5.4 Validar em validator.schema.org: homepage, 1 página de produto, 1 post. Corrigir erros reportados e salvar o relatório.

## 6. FASE 5 — CANONICAL E REDIRECT WWW (pendência #5)
6.1 Garantir tag <link rel="canonical" href="https://www.patroseguros.com.br/[URL]" /> em TODAS as páginas (mecanismo global do projeto).
6.2 Garantir 301: versão sem www → www, e http → https (se o projeto controlar o servidor; senão, garantir canonical + links internos sempre com www).
6.3 Garantir 301 de URLs antigas que ainda existirem (ex.: /seguros-cidade-maia-guarulhos → /seguros-shopping-maia-cidade-maia-guarulhos).
6.4 Verificar que TODOS os links internos usam https://www.patroseguros.com.br (sem URLs relativas quebradas).

## 7. FASE 6 — VALIDAÇÃO TÉCNICA FINAL (pendências #6 e #7)
7.1 PageSpeed Insights (mobile e desktop): reportar Performance, LCP e CLS. Se LCP > 2,5s ou CLS > 0,1, aplicar: imagens com lazy loading e dimensões definidas, priorizar CSS crítico, adiar JS não essencial.
7.2 Verificação de links quebrados: rodar auditoria de links do projeto e corrigir qualquer 404 interno.
7.3 Confirmar que sitemaps (pages, blog, seguros, bairros, images) continuam válidos após as alterações.

## 8. VALIDAÇÃO OBRIGATÓRIA (responder ao final)
1. Confirmar ZERO headings com "|" em todo o site (buscar no código por "| Cotação em 2h", "| Gestão Completa", "| Preços e Operadoras", "| Ajuda e Assistência 24h").
2. Confirmar que NENHUM botão de WhatsApp contém "|" ou título completo de página.
3. Confirmar "Conheça nossa atuação em Guarulhos" (sem duplicação) na home.
4. Confirmar "a Central de Sinistros" (feminino) em toda a página.
5. Confirmar as páginas de bairro com 400+ palavras e meta description nova.
6. Confirmar schemas validados em validator.schema.org (salvar relatório).
7. Confirmar canonical em todas as páginas e 301 ativos.
8. Reportar PageSpeed antes/depois (mobile + desktop).
9. Relatório final em tabela: | # | Pendência | Status (✅/⚠️/❌) | Evidência | Observação | — objetivo: ZERO ❌ e ZERO ⚠️.

## 9. RESTRIÇÕES
- Não inventar dados, preços ou avaliações. Usar apenas o que já existe no site.
- Não remover páginas sem 301.
- pt-BR, tom consultivo e humano, identidade visual mantida (logo, paleta, selos).
- URLs limpas com hífens.
- Zero headings com "|" como meta final obrigatória. ┌──────────────────────────────────────────────────────┐
│ HEADER (fixo)                                        │
│ Logo · Para Você · Empresa · Atendimento · Conteúdo  │
│                        [Cotação grátis]  [WhatsApp]  │
├──────────────────────────────────────────────────────┤
│ HERO — 2 colunas                                     │
│ ESQUERDA                          DIREITA            │
│ H1: Seguros em Guarulhos —         ┌─────────────┐   │
│ Compare 16 seguradoras e           │ COTAÇÃO     │   │
│ economize                          │ EXPRESS     │   │
│ Sub: atendimento consultivo,       │ Tipo de     │   │
│ SUSEP, nota 4.9, resposta 2h       │ seguro ▾    │   │
│ [Cotar agora] [WhatsApp]           │ Nome        │   │
│ ★ 4,9 · 67 avaliações (link)       │ WhatsApp    │   │
│                                    │ [Receber    │   │
│                                    │  em 2h]     │   │
│                                    │ LGPD        │   │
│                                    └─────────────┘   │
├──────────────────────────────────────────────────────┤
│ FAIXA DE CONFIANÇA                                   │
│ [SUSEP 212113511] [2.500+ clientes] [16+ seguradoras]│
│ [Nota 4,9 no Google]                                 │
├──────────────────────────────────────────────────────┤
│ GRADE DE PRODUTOS — 6 cards fixos                    │
│ [🛡 Auto] [🏠 Residencial] [❤ Vida]                  │
│ [🏥 Saúde] [🏢 Empresarial] [🚛 Frota]               │
│ (ícones consistentes, 1 linha cada, link)            │
├──────────────────────────────────────────────────────┤
│ COMO FUNCIONA — 3 passos                             │
│ 1. Você envia os dados → 2. Comparamos 16+ →         │
│ 3. Proposta em até 2h                                │
├──────────────────────────────────────────────────────┤
│ PROVA SOCIAL (1x)                                    │
│ 4,9 ★ · 3 avaliações reais (nome, bairro, produto)   │
│ [Ver todas no Google] [Deixar avaliação]             │
├──────────────────────────────────────────────────────┤
│ EMPRESAS — 4 cards                                   │
│ Frota · Transporte e Carga · Saúde PME · RC          │
│ [Conhecer Patro Empresas]                            │
├──────────────────────────────────────────────────────┤
│ LOCAL — texto + chips de bairros                     │
│ [Cidade Maia] [Cumbica] [Pimentas] [Bonsucesso]      │
│ [Vila Augusta] [Centro] [Vila Galvão] [Taboão] ...   │
├──────────────────────────────────────────────────────┤
│ FAQ — 5 perguntas (accordion)                        │
├──────────────────────────────────────────────────────┤
│ MAPA + NAP (1x)                                      │
│ [Mapa Google] Av. Salgado Filho 2120 · Sala 219      │
│ (11) 5199-7500 · Seg–Sex 8h30–18h                    │
├──────────────────────────────────────────────────────┤
│ SEGURADORAS — faixa discreta, logos cinza (1x)       │
├──────────────────────────────────────────────────────┤
│ FOOTER                                               │
│ Para Você · Empresa · Atendimento · Conteúdo         │
│ NAP curto + selos + redes                            │
└──────────────────────────────────────────────────────┘`}
    </div>
  );
};

export default SiteInfo;