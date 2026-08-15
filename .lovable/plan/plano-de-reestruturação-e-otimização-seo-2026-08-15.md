---
title: Reestruturação e Otimização Massiva SEO Patro Seguros
author: Lovable
date: 2026-08-15
---

# Plano de Reestruturação e Otimização SEO

Este plano visa resolver falhas técnicas, eliminar duplicidade de conteúdo, implementar SEO técnico profundo e consolidar a Patro Seguros como autoridade máxima em Guarulhos.

## 1. Correções Técnicas (Fase 1)
- **Redirects 301**: Centralizar redirecionamentos em `src/lib/redirects.ts`. Criar redirect de `/seguros-cidade-maia-guarulhos` para `/seguros-shopping-maia-cidade-maia-guarulhos`.
- **Canonicidade**: Garantir que `PageMeta` e `index.html` apontem sempre para `www.patroseguros.com.br`.
- **Assets**: Sanitizar nomes de imagens e links malformados (remover `%20%22` e espaços).
- **Typos**: Corrigir "conhecer nossa atuação" na Home.

## 2. Conteúdo e SEO On-Page (Fase 2)
- **Páginas Pillar**: Consolidar `/seguros-guarulhos` como hub definitivo (migrar conteúdo de `/corretora-de-seguros-em-guarulhos`).
- **Seguro de Carga**: Expandir `/seguro-transporte-carga-guarulhos` com coberturas detalhadas (RCTR-C, RCF-DC), contexto local de Cumbica e FAQ robusto.
- **Headings Naturais**: Remover títulos repetitivos nos H1/H2 para português natural.
- **Footer**: Refatorar o "Mapa de Seguros" para uma página dedicada `/todos-os-seguros` e manter apenas categorias essenciais no rodapé.

## 3. SEO Local e Schemas (Fase 2)
- **NAP Centralizado**: Usar `src/config/empresa.ts` em todos os blocos JSON-LD.
- **Schemas**: Validar `InsuranceAgency`, `LocalBusiness`, `FAQPage`, `BreadcrumbList` e `Service` em todas as rotas comerciais.
- **Bairros**: Criar/atualizar páginas para bairros ausentes (Pimentas, Bonsucesso, Taboão) com conteúdo exclusivo.

## 4. Novas Páginas de Autoridade (Fase 3)
- **Comparativo**: Criar `/comparativo-seguradoras-guarulhos` com tabela competitiva (Porto, Allianz, Tokio, etc).
- **Modelos Auto**: Criar verticais para modelos populares (Corolla, HB20, Hilux) com preços médios em Guarulhos.

## 5. Conversão e UX (Fase 4)
- **WhatsApp**: Sincronizar mensagens pré-preenchidas com a origem da página.
- **Prova Social**: Integrar widget de avaliações Google nota 4.9.

### Detalhes Técnicos
- Uso de `react-helmet-async` para metadados dinâmicos.
- `InsurancePageTemplate` como base para todas as verticais.
- Validação de build rigorosa com `postbuild` scripts.
