import React from 'react';

const SiteInfo = () => {
  return (
    <div style={{ display: 'none' }}>
      {`Execute esta instrucao no projeto: PROMPT LOVABLE — APLICAR TITLE TAGS E META DESCRIPTIONS NAS PÁGINAS DE PRODUTO PRINCIPAIS

## 1. CONTEXTO
Aplicar os campos de SEO (title tag e meta description) nas 6 páginas de produto principais do site patroseguros.com.br: Seguro Auto, Seguro Residencial, Seguro de Vida, Plano de Saúde, Seguro Empresarial e Seguro de Frota. Preencher os campos nas configurações de SEO de cada página (SEO settings / meta tags). NÃO alterar o conteúdo do corpo — apenas os campos de SEO.

## 2. REGRAS GLOBAIS
- Title: máximo 60 caracteres, palavra-chave local no início, benefício de cotação em 2h no meio, marca "Patro" no final.
- Meta description: máximo 160 caracteres, com contexto do produto + CTA ("Peça sua proposta grátis").
- Sem aspas duplas, sem quebras de linha nos campos.
- Aplicar nos caminhos REAIS existentes de cada página (conferir a URL atual no projeto antes de aplicar).

## 3. VALORES POR PÁGINA

### 3.1 Seguro Auto (/seguro-auto-guarulhos)
- Title: Seguro Auto em Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto em Guarulhos comparado em 16+ seguradoras. Cobertura compreensiva, assistência 24h e cotação em até 2h. Peça sua proposta grátis.

### 3.2 Seguro Residencial (/seguro-residencial-guarulhos)
- Title: Seguro Residencial em Guarulhos | Cotação em 2h | Patro
- Meta: Seguro residencial em Guarulhos para casa e apartamento. Incêndio, roubo, danos elétricos e assistência 24h. Cotação em até 2h. Peça sua proposta grátis.

### 3.3 Seguro de Vida (/seguro-vida-guarulhos)
- Title: Seguro de Vida em Guarulhos | Cotação em 2h | Patro
- Meta: Seguro de vida em Guarulhos para proteger sua família. Morte, invalidez e doenças graves. Cotação em até 2h com consultoria. Peça sua proposta grátis.

### 3.4 Plano de Saúde (/plano-saude-guarulhos)
- Title: Plano de Saúde em Guarulhos | Cotação em 2h | Patro
- Meta: Plano de saúde em Guarulhos comparado em 20+ operadoras. Individual, familiar ou PME. Cotação em até 2h com consultoria. Peça sua proposta grátis.

### 3.5 Seguro Empresarial (/seguro-empresarial-guarulhos)
- Title: Seguro Empresarial em Guarulhos | Cotação em 2h | Patro
- Meta: Seguro empresarial em Guarulhos para PMEs e indústrias. Patrimonial, RC, lucros cessantes e cyber. Cotação em até 2h. Peça sua proposta grátis.

### 3.6 Seguro de Frota (/seguro-frota-empresas-guarulhos)
- Title: Seguro de Frota em Guarulhos | Gestão Completa | Patro
- Meta: Seguro de frota em Guarulhos para transportadoras e empresas. Gestão de risco, sinistros ágeis e desconto por volume. Cotação em até 2h. Peça sua proposta.

## 4. VALIDAÇÃO OBRIGATÓRIA
1. Confirmar que as 6 URLs têm title e meta description preenchidos com os valores exatos.
2. Reportar o comprimento de cada title (≤60) e meta description (≤160).
3. Confirmar que nenhuma página duplicada foi criada — aplicado nas URLs reais.
4. Listar qualquer página em que o campo não foi aplicado ou o texto ficou diferente.
5. Relatório final em tabela: URL | Title | Meta | Status (✅/⚠️/❌) | Comprimento. ┌──────────────────────────────────────────────────────┐
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