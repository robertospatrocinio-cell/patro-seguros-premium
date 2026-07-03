# Checklist de Submissão de Citações Externas

> Executar na ordem. Cada linha é uma tarefa de 5–15 minutos. Sempre
> copiar as strings do arquivo `aeo-nap-master.md` — nunca digitar do zero.
>
> Após publicar, adicionar a URL final na coluna "URL viva" e rodar
> `node scripts/validate-nap-citations.mjs` para validar consistência.

---

## Tier 0 — Fundação (obrigatório, ordem sequencial)

| # | Diretório | URL de submissão | Login/Owner | Status | URL viva após publicação |
|---|---|---|---|---|---|
| 1 | Google Business Profile | https://business.google.com | Roberto | ☐ | (Google Maps CID já mapeado) |
| 2 | Bing Places for Business | https://www.bingplaces.com | Roberto | ☐ | |
| 3 | Apple Business Connect | https://businessconnect.apple.com | Roberto | ☐ | |

> Sem os 3 acima, os Tiers seguintes têm efeito reduzido. GBP alimenta
> Gemini/AI Overviews; Bing Places alimenta ChatGPT/Copilot; Apple
> alimenta Siri e Apple Intelligence.

---

## Tier 1 — Alta autoridade BR (impacto direto em LLMs)

| # | Diretório | URL de submissão | Status | URL viva |
|---|---|---|---|---|
| 4 | Reclame Aqui — perfil verificado | https://www.reclameaqui.com.br/empresa/cadastro/ | ☐ | |
| 5 | Sincor-SP (associação de corretoras) | https://www.sincorsp.org.br | ☐ | |
| 6 | CNseg — Cadastro Nacional | https://cnseg.org.br | ☐ | |
| 7 | Fenacor (Federação Nacional dos Corretores) | https://www.fenacor.org.br | ☐ | |
| 8 | LinkedIn Company Page — completar 100% | https://www.linkedin.com/company/patro-seguros/admin/ | ☐ | https://www.linkedin.com/company/patro-seguros |
| 9 | Wikidata — item da empresa | https://www.wikidata.org/wiki/Special:NewItem | ☐ | |

---

## Tier 2 — Diretórios locais BR (aumentam densidade de citações)

| # | Diretório | URL de submissão | Status | URL viva |
|---|---|---|---|---|
| 10 | Apontador | https://www.apontador.com.br/anuncie/ | ☐ | |
| 11 | Guia Mais | https://www.guiamais.com.br/anuncie | ☐ | |
| 12 | Solutudo | https://www.solutudo.com.br/anuncie | ☐ | |
| 13 | TeleListas | https://www.telelistas.net/anuncie | ☐ | |
| 14 | Guia Naval / Guia Local | https://www.guiadelocal.com.br | ☐ | |
| 15 | Hotfrog Brasil | https://www.hotfrog.com.br/adicionar-empresa | ☐ | |
| 16 | Cybo Brasil | https://www.cybo.com/BR | ☐ | |
| 17 | Encontra Guarulhos | https://www.encontraguarulhos.com.br | ☐ | |
| 18 | ACE-Guarulhos (Associação Comercial) | https://www.aceguarulhos.com.br | ☐ | |

---

## Tier 3 — Diretórios internacionais (fontes de Claude, Meta AI, Apple)

| # | Diretório | URL de submissão | Status | URL viva |
|---|---|---|---|---|
| 19 | Foursquare / Factual | https://foursquare.com/add-place | ☐ | |
| 20 | Yelp Brasil | https://biz.yelp.com | ☐ | |
| 21 | DuckDuckGo Business | https://duckduckgo.com/duckduckgo-help-pages/business/listings/ | ☐ | |
| 22 | Waze — reivindicar local | https://www.waze.com/business/local | ☐ | |
| 23 | OpenStreetMap (Nominatim) | https://www.openstreetmap.org | ☐ | |

---

## Tier 4 — Perfis de imprensa e portais setoriais

| # | Diretório | Ação | Status |
|---|---|---|---|
| 24 | Sonho Seguro (portal) | Enviar release do estudo original | ☐ |
| 25 | Revista Cobertura | Enviar release | ☐ |
| 26 | Segs (Portal Nacional de Seguros) | Enviar release | ☐ |
| 27 | CQCS (Clube dos Corretores) | Perfil de sócios + release | ☐ |
| 28 | Estadão PME | Guest post sobre gestão de risco | ☐ |
| 29 | Valor Investe | Pitch como fonte para matérias de auto/vida | ☐ |

---

## Regras de execução

1. **Uma sessão por Tier.** Não pular Tier 0 → 3 em blocos.
2. **Copiar-colar as strings do `aeo-nap-master.md`.** Zero digitação livre.
3. **Foto de perfil e capa idênticas** em todos: `/public/images/logo-full.webp` como perfil e `/public/images/og-cover.webp` como capa.
4. **Após cada publicação:** preencher a coluna "URL viva" e commitar este arquivo.
5. **Semanalmente:** rodar `node scripts/validate-nap-citations.mjs` — o script visita cada URL viva e alerta se detectar variação de NAP.
6. **Reviews:** meta de 3 reviews Google + 1 Reclame Aqui por semana até atingir selo RA1000 e 100+ reviews no Google.

## Métricas de sucesso (revisar mensalmente)

- ✅ 20+ citações com NAP idêntico
- ✅ 0 variações de nome/endereço/telefone entre citações
- ✅ Item Wikidata publicado e vinculado
- ✅ Selo RA1000 no Reclame Aqui
- ✅ Aparição em pelo menos 1 resposta orgânica do ChatGPT / Perplexity para "melhor corretora de seguros em Guarulhos"