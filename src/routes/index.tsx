import React from 'react';

const SiteInfo = () => {
  return (
    <div style={{ display: 'none' }}>
      {`Execute esta instrucao no projeto: PROMPT LOVABLE — APLICAR TITLE TAGS E META DESCRIPTIONS EM TODO O SITE (RODADA UNIFICADA)

## 1. CONTEXTO
Aplicar os campos de SEO (title tag e meta description) em 19 URLs do site patroseguros.com.br: 5 páginas de seguro por modelo de veículo, 13 páginas de bairro e 1 artigo de autoridade. Preencher os campos nas configurações de SEO de cada página (SEO settings / meta tags). NÃO alterar o conteúdo do corpo das páginas — apenas os campos de SEO.

## 2. REGRAS GLOBAIS
- Title: máximo 60 caracteres, palavra-chave local no início, benefício de cotação em 2h no meio, marca "Patro" no final.
- Meta description: máximo 160 caracteres, com faixa de preço ou contexto local + CTA ("Peça sua proposta").
- Sem aspas duplas, sem quebras de linha nos campos.
- Se a página já existir com outra URL (ex.: /seguros-shopping-maia-cidade-maia-guarulhos em vez de /seguros-cidade-maia-guarulhos), aplicar o title/meta no caminho REAL existente — não criar página duplicada.
- Se a página do bairro não existir, criar com o padrão de conteúdo das demais (mínimo 400 palavras, contexto local, preços, CTA) e aplicar o title/meta correspondente.

## 3. PÁGINAS POR MODELO DE VEÍCULO

### 3.1 /seguro-auto-toyota-corolla-guarulhos
- Title: Seguro Toyota Corolla em Guarulhos | Cotação em 2h | Patro
- Meta: Seguro Toyota Corolla em Guarulhos comparado em 16+ seguradoras. Faixa média de R$ 2.800 a R$ 4.800/ano. Cotação em até 2h. Peça sua proposta grátis.

### 3.2 /seguro-auto-hyundai-hb20-guarulhos
- Title: Seguro Hyundai HB20 em Guarulhos | Cotação em 2h | Patro
- Meta: Seguro Hyundai HB20 em Guarulhos comparado em 16+ seguradoras. Faixa média de R$ 1.900 a R$ 3.600/ano. Cotação em até 2h. Peça sua proposta grátis.

### 3.3 /seguro-auto-chevrolet-onix-guarulhos
- Title: Seguro Chevrolet Onix em Guarulhos | Cotação em 2h | Patro
- Meta: Seguro Chevrolet Onix em Guarulhos comparado em 16+ seguradoras. Faixa média de R$ 1.900 a R$ 3.700/ano. Cotação em até 2h. Peça sua proposta grátis.

### 3.4 /seguro-auto-jeep-compass-guarulhos
- Title: Seguro Jeep Compass em Guarulhos | Cotação em 2h | Patro
- Meta: Seguro Jeep Compass em Guarulhos comparado em 16+ seguradoras. Faixa média de R$ 3.000 a R$ 5.400/ano. Cotação em até 2h. Peça sua proposta grátis.

### 3.5 /seguro-auto-toyota-hilux-guarulhos
- Title: Seguro Toyota Hilux em Guarulhos | Cotação em 2h | Patro
- Meta: Seguro Toyota Hilux em Guarulhos comparado em 16+ seguradoras. Faixa média de R$ 3.500 a R$ 6.500/ano. Cotação em até 2h. Peça sua proposta grátis.

## 4. PÁGINAS DE BAIRRO (aplicar no caminho real existente)

### 4.1 Cidade Maia (URL real: /seguros-shopping-maia-cidade-maia-guarulhos ou similar)
- Title: Seguros em Cidade Maia, Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial em Cidade Maia, Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

### 4.2 Cumbica
- Title: Seguros em Cumbica, Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial em Cumbica, Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

### 4.3 Pimentas
- Title: Seguros em Pimentas, Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial em Pimentas, Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

### 4.4 Bonsucesso
- Title: Seguros em Bonsucesso, Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial em Bonsucesso, Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

### 4.5 Vila Augusta
- Title: Seguros em Vila Augusta, Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial em Vila Augusta, Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

### 4.6 Centro
- Title: Seguros no Centro de Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial no Centro de Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

### 4.Taboão
- Title: Seguros em Taboão, Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial em Taboão, Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

### 4.8 Vila Galvão
- Title: Seguros em Vila Galvão, Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial em Vila Galvão, Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

### 4.9 Macedo
- Title: Seguros em Macedo, Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial em Macedo, Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

### 4.10 Gopoúva
- Title: Seguros em Gopoúva, Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial em Gopoúva, Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

### 4.11 Picanço
- Title: Seguros em Picanço, Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial em Picanço, Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

### 4.12 Jardim Maia
- Title: Seguros em Jardim Maia, Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial em Jardim Maia, Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

### 4.13 Ponte Grande
- Title: Seguros em Ponte Grande, Guarulhos | Cotação em 2h | Patro
- Meta: Seguro auto, residencial e empresarial em Ponte Grande, Guarulhos. Corretora local com 16+ seguradoras e nota 4.9. Cotação em até 2h. Peça sua proposta.

## 5. ARTIGO DE AUTORIDADE

### 5.1 /blog/guarulhos-entre-cidades-com-maior-roubo-furto-veiculos-brasil
- Title: Roubo de Carro em Guarulhos: Bairros de Maior Risco em 2026
- Meta: Guarulhos está entre as 10 cidades com mais roubo e furto de veículos do Brasil. Veja os bairros de maior risco e como se proteger.
- Aplicar também o schema Article (headline, datePublished, dateModified, author Person: Roberto Patrocínio, publisher Organization Patro Seguros).

## 6. VALIDAÇÃO OBRIGATÓRIA
1. Confirmar que as 19 URLs têm title e meta description preenchidos com os valores exatos.
2. Reportar o comprimento de cada title (≤60) e meta description (≤160).
3. Confirmar que nenhuma página duplicada foi criada — títulos aplicados nas URLs reais existentes.
4. Listar qualquer página em que o campo não foi aplicado ou o texto ficou diferente.
5. Confirmar que o article tem schema Article válido em validator.schema.org.
6. Relatório final em tabela: URL | Title | Meta | Status (✅/⚠️/❌) | Comprimento. ┌──────────────────────────────────────────────────────┐
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