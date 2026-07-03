# Fase C — Wikidata Item — Rascunho para submissão

> Wikidata é a base de conhecimento estruturada usada por Google Knowledge
> Graph, ChatGPT, Claude e Gemini para desambiguar entidades. Criar um item
> Wikidata para "Patro Corretora de Seguros" é a via mais rápida de virar
> **entidade reconhecida** pelos LLMs.

## Pré-requisitos (senão a submissão é revertida)

Wikidata exige **notabilidade**: a entidade precisa ter ao menos 2 fontes
independentes e verificáveis (não o próprio site). Antes de criar o item:

- [ ] 1 menção em imprensa regional (Guarulhos Web, Folha Metropolitana,
      Diário de Guarulhos, JC Guarulhos)
- [ ] 1 menção em portal setorial (Sonho Seguro, CQCS, Revista Apólice,
      Segs, Sincor-SP)
- [ ] Registro público na SUSEP (já existe: 212113511)
- [ ] Registro público na Receita Federal (CNPJ 41.641.558/0001-33)
- [ ] Perfil no Reclame Aqui com histórico ativo

## Item — Statements (declarações)

**Label (pt-br):** Patro Corretora de Seguros
**Label (en):** Patro Insurance Brokerage
**Description (pt-br):** corretora de seguros brasileira sediada em Guarulhos, São Paulo
**Description (en):** Brazilian insurance brokerage based in Guarulhos, São Paulo
**Also known as:** Patro Seguros; Patrocínio Corretora

| Propriedade                   | Valor                                                     | Referência                                    |
| ----------------------------- | --------------------------------------------------------- | --------------------------------------------- |
| P31 instance of               | Q1057214 (corretora de seguros)                           | site oficial                                  |
| P17 country                   | Q155 (Brasil)                                             | CNPJ                                          |
| P131 located in               | Q170088 (Guarulhos)                                       | site oficial                                  |
| P159 headquarters location    | Guarulhos, São Paulo                                      | site oficial                                  |
| P625 coordinates              | (lat, long da sede em Cidade Maia)                        | Google Maps                                   |
| P856 official website         | https://www.patroseguros.com.br                           | —                                             |
| P1128 employees               | (número real, ex: 15)                                     | LinkedIn                                      |
| P571 inception                | (ano de fundação, ex: 1999)                               | Junta Comercial                               |
| P452 industry                 | Q43183 (seguros)                                          | SUSEP                                         |
| P1329 phone                   | +55-11-5199-7500                                          | site oficial                                  |
| P968 e-mail                   | contato@patroseguros.com.br                               | site oficial                                  |
| P2035 LinkedIn company ID     | patro-seguros                                             | LinkedIn                                      |
| P2013 Facebook ID             | patroseguros                                              | Facebook                                      |
| P2003 Instagram username      | patroseguros                                              | Instagram                                     |
| P3417 Quora topic ID          | (se criar)                                                | Quora                                         |
| P4264 LinkedIn company URL    | linkedin.com/company/patro-seguros                        | —                                             |
| P3199 CNPJ                    | 41641558000133                                            | Receita Federal                               |
| P8687 social media followers  | (Instagram/LinkedIn)                                      | rede social                                   |
| P1451 motto (pt-br)           | "Seguros feitos com gente, para gente."                   | site                                          |
| P169 CEO / P488 chairperson   | Roberto Patrocínio (criar item Q próprio)                 | site /sobre                                   |
| P112 founded by               | Roberto Patrocínio; Sandra Patrocínio                     | site /sobre                                   |
| P973 described at URL         | https://www.patroseguros.com.br/sobre                     | —                                             |
| P2701 file format             | —                                                         | —                                             |

## Itens Wikidata satélite a criar

1. **Roberto Patrocínio** (Q — pessoa)
   - P31: Q5 (human)
   - P106 occupation: Q188094 (insurance broker)
   - P108 employer: (item da Patro)
   - P27 country of citizenship: Q155 (Brasil)
   - Referência: página /blog/autor/roberto-patro

2. **Sandra Patrocínio** (Q — pessoa)
   - análoga a Roberto
   - Referência: página /blog/autor/sandra-patro

## Passo-a-passo

1. Criar conta em wikidata.org
2. Publicar 2 matérias na imprensa (release ABI + parcerias como Sonho
   Seguro / Sincor-SP) — investimento ~R$1500 em assessoria one-shot
3. Abrir "Create a new item" → preencher label + description
4. Adicionar statements com **fontes P248/P854** (URL de referência) em
   cada declaração — sem referências, statements são deletados em ~7 dias
5. Vincular a fontes externas: SUSEP, JUCESP, LinkedIn
6. Aguardar 30-90 dias para o Google absorver e o Knowledge Panel aparecer
7. Uma vez publicado, adicionar o URL do item Wikidata (`Q...`) ao
   `sameAs` do JSON-LD `Organization` em `index.html`

## Após aprovação — atualizar código

No arquivo `index.html`, dentro dos JSON-LD `InsuranceAgency` e
`Organization`, adicionar ao array `sameAs`:

```
"https://www.wikidata.org/wiki/Q<NUMERO>"
```
