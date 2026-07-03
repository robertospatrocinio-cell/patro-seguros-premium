# Wikidata — Submissão da entidade "Patro Corretora de Seguros"

> Wikidata alimenta Google Knowledge Graph, ChatGPT, Gemini, Claude e Perplexity.
> Um item Wikidata com boas referências transforma a Patro em **entidade
> desambiguada** — passa a aparecer em respostas geradas por IA como fonte
> reconhecida, e não como "uma corretora qualquer em Guarulhos".
>
> Tempo total estimado: **15 minutos** (5 min para copiar-colar o
> QuickStatements + 10 min para carregar as 2 fontes independentes).

---

## Passo 1 — Pré-requisitos de notabilidade (obrigatório)

Wikidata exige ao menos **2 fontes secundárias independentes** (não o próprio
site) para o item não ser deletado por "Speedy deletion — non-notable". Antes
de submeter, ter na mão as **URLs finais** de pelo menos duas fontes desta
lista:

- [ ] SUSEP — página pública de consulta: https://www2.susep.gov.br/safe/menumercado/regcorretores/pesquisa.asp (registro 212113511)
- [ ] Receita Federal — CNPJ 41.641.558/0001-33 (comprovante público)
- [ ] Sincor-SP — perfil da corretora associada
- [ ] 1 matéria em imprensa regional (Folha Metropolitana Guarulhos, Diário de Guarulhos, JC Guarulhos)
- [ ] 1 matéria em portal setorial nacional (Sonho Seguro, CQCS, Revista Apólice, Revista Cobertura, Segs)

> Sem 2 fontes o item é revertido em 24–72h.

---

## Passo 2 — Criar conta Wikidata

1. Acessar https://www.wikidata.org/wiki/Special:CreateAccount
2. Usar e-mail corporativo (`contato@patroseguros.com.br` ou dos sócios)
3. Fazer 4 edições em outros itens (traduzir uma label pt-br, adicionar uma referência) — Wikidata bloqueia "autopromoção" de contas com < 4 edições

---

## Passo 3 — Executar o QuickStatements (bulk import)

QuickStatements é a ferramenta oficial de bulk-add do Wikidata:
https://quickstatements.toolforge.org/#/batch

**Copiar exatamente o bloco abaixo e colar em "V1 commands":**

```
CREATE
LAST	Lpt-br	"Patro Corretora de Seguros"
LAST	Len	"Patro Insurance Brokerage"
LAST	Lpt	"Patro Corretora de Seguros"
LAST	Les	"Patro Corredora de Seguros"
LAST	Dpt-br	"corretora de seguros brasileira sediada em Guarulhos, São Paulo, fundada em 2020"
LAST	Den	"Brazilian insurance brokerage based in Guarulhos, São Paulo, founded in 2020"
LAST	Des	"correduría de seguros brasileña con sede en Guarulhos, São Paulo"
LAST	Apt-br	"Patro Seguros"
LAST	Apt-br	"Patrocínio Corretora de Seguros"
LAST	Aen	"Patro Seguros"
LAST	P31	Q1057214	S854	"https://www2.susep.gov.br/safe/menumercado/regcorretores/pesquisa.asp"
LAST	P17	Q155	S854	"https://www.gov.br/receitafederal"
LAST	P131	Q170088	S854	"https://www.patroseguros.com.br/sobre"
LAST	P452	Q43183	S854	"https://www2.susep.gov.br/safe/menumercado/regcorretores/pesquisa.asp"
LAST	P571	+2020-01-01T00:00:00Z/9	S854	"https://www.patroseguros.com.br/sobre"
LAST	P625	@-23.4460/-46.5220	S854	"https://www.google.com/maps?cid=273879799324962533"
LAST	P856	"https://www.patroseguros.com.br"
LAST	P1329	"+55-11-5199-7500"	S854	"https://www.patroseguros.com.br/contato"
LAST	P968	"mailto:contato@patroseguros.com.br"	S854	"https://www.patroseguros.com.br/contato"
LAST	P6375	pt-br:"Av. Salgado Filho, 2120, Sala 219, Cidade Maia, Guarulhos, SP, 07115-000"	S854	"https://www.patroseguros.com.br/sobre"
LAST	P281	"07115-000"	S854	"https://www.patroseguros.com.br/sobre"
LAST	P112	Q_ROBERTO	S854	"https://www.patroseguros.com.br/sobre"
LAST	P112	Q_SANDRA	S854	"https://www.patroseguros.com.br/sobre"
LAST	P169	Q_ROBERTO	S854	"https://www.patroseguros.com.br/sobre"
LAST	P2013	"patroseguros"
LAST	P2003	"patroseguros"
LAST	P2035	"patro-seguros"
LAST	P973	"https://www.patroseguros.com.br/sobre"	Ppt-br	"Página institucional"
LAST	P1454	Q10541491	S854	"https://www.gov.br/receitafederal"
```

> Substituir `Q_ROBERTO` e `Q_SANDRA` pelos QIDs dos itens dos fundadores
> depois de criá-los (ver Passo 4). Enquanto não existem, remover essas 3
> linhas do bloco.

### Identificadores externos (adicionar manualmente após criação)

Wikidata **não** tem propriedades nativas para CNPJ ou SUSEP (o Brasil não
petições da comunidade Wiki ainda não aprovaram esses PIDs). Duas opções:

**Opção A (recomendada — pronta hoje):** usar `P3999` (número de identificação
fiscal do país) ou `P8168` (external identifier) para armazenar CNPJ e SUSEP
como propriedade genérica `described at URL` (P973) apontando para a página
oficial de consulta:

```
LAST	P973	"https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/valida.asp?cnpj=41641558000133"	Ppt-br	"CNPJ 41.641.558/0001-33 na Receita Federal"
LAST	P973	"https://www2.susep.gov.br/safe/menumercado/regcorretores/pesquisa.asp"	Ppt-br	"Registro SUSEP 212113511"
```

**Opção B (longo prazo):** submeter proposta em
https://www.wikidata.org/wiki/Wikidata:Property_proposal/Authority_control
para criar `P-CNPJ` e `P-SUSEP` como identificadores oficiais. Prazo médio:
90 dias de discussão + votação.

---

## Passo 4 — Itens satélite (fundadores)

Criar 2 itens separados via QuickStatements — obrigatório porque a Wikidata
usa referências cruzadas entre pessoa (P108 employer) e empresa (P112 founded by):

```
CREATE
LAST	Lpt-br	"Roberto Patrocínio"
LAST	Len	"Roberto Patrocínio"
LAST	Dpt-br	"corretor de seguros brasileiro, cofundador da Patro Corretora de Seguros"
LAST	Den	"Brazilian insurance broker, co-founder of Patro Insurance Brokerage"
LAST	P31	Q5
LAST	P27	Q155
LAST	P106	Q188094
LAST	P108	Q_PATRO	S854	"https://www.patroseguros.com.br/sobre"
LAST	P569	+1970-01-01T00:00:00Z/9	S854	"https://www.linkedin.com/in/roberto-patrocinio"
LAST	P2035	"roberto-patrocinio"
LAST	P973	"https://www.patroseguros.com.br/blog/autor/roberto-patrocinio"
```

```
CREATE
LAST	Lpt-br	"Sandra Patrocínio"
LAST	Len	"Sandra Patrocínio"
LAST	Dpt-br	"corretora de seguros brasileira, cofundadora da Patro Corretora de Seguros"
LAST	Den	"Brazilian insurance broker, co-founder of Patro Insurance Brokerage"
LAST	P31	Q5
LAST	P27	Q155
LAST	P21	Q6581072
LAST	P106	Q188094
LAST	P108	Q_PATRO	S854	"https://www.patroseguros.com.br/sobre"
LAST	P569	+1972-01-01T00:00:00Z/9	S854	"https://www.linkedin.com/in/sandra-patrocinio"
LAST	P2035	"sandra-patrocinio"
LAST	P973	"https://www.patroseguros.com.br/blog/autor/sandra-patrocinio"
```

> Trocar `Q_PATRO` pelo QID da empresa após o Passo 3. Trocar datas P569
> pelas reais.

---

## Passo 5 — Após publicação

1. Anotar os 3 QIDs gerados (empresa, Roberto, Sandra), ex.: `Q123456789`.
2. Editar o item da empresa e voltar em P112/P169 para ligar os QIDs reais dos fundadores.
3. Editar os itens dos fundadores e voltar em P108 para ligar o QID real da empresa.
4. Rodar `node scripts/check-wikidata-item.mjs` — o script detecta a URL
   publicada e imprime o snippet pronto para colar no `sameAs`.
5. Adicionar `https://www.wikidata.org/wiki/Q123456789` ao `sameAs` em:
   - `index.html` (blocos InsuranceAgency + Organization)
   - `src/components/LocalBusinessSchema.tsx`
   - `public/llms-full.txt`
   - `docs/aeo-nap-master.md`
6. Aguardar 30–90 dias para o Google Knowledge Graph absorver e o Knowledge
   Panel começar a aparecer em buscas por "Patro Seguros".

---

## Passo 6 — Manutenção

- **A cada nova matéria de imprensa**, adicionar como referência (S854) em
  1–2 statements do item Patro. Wikidata premia itens com múltiplas fontes.
- **A cada reconhecimento setorial** (prêmio, ranking), adicionar como
  statement P166 (award received) com fonte.
- **Nunca editar como conta "conflito de interesse não declarado"** —
  declarar no perfil da conta que é a corretora, evita bloqueio por COI.

---

## Propriedades usadas — dicionário

| PID | Nome | O que representa |
|---|---|---|
| P31 | instance of | tipo do item (Q1057214 = corretora de seguros) |
| P17 | country | Q155 = Brasil |
| P131 | located in the administrative territorial entity | Q170088 = Guarulhos |
| P452 | industry | Q43183 = seguros |
| P571 | inception | data de fundação |
| P625 | coordinate location | latitude/longitude da sede |
| P856 | official website | URL principal |
| P1329 | phone number | telefone em formato E.164 |
| P968 | e-mail address | e-mail em formato mailto: |
| P6375 | street address | endereço postal completo |
| P281 | postal code | CEP |
| P112 | founded by | pessoa(s) fundadora(s) |
| P169 | chief executive officer | CEO atual |
| P106 | occupation | profissão (para pessoas) |
| P108 | employer | empregador (para pessoas) |
| P2013 | Facebook ID | handle no Facebook |
| P2003 | Instagram username | handle no Instagram |
| P2035 | LinkedIn personal profile / company | handle no LinkedIn |
| P973 | described at URL | URL de página descritiva |
| P854 | reference URL | (qualifier) URL da referência |
| P1454 | legal form | forma jurídica (Q10541491 = Ltda) |

---

## Placeholder até o item existir — já implementado no site

Os schemas JSON-LD do site já incluem `PropertyValue` para SUSEP e CNPJ nos
blocos **InsuranceAgency** e **Organization** (arquivo `index.html`), mais
`vatID`, `iso6523Code` e `naics`. Isso garante que **antes mesmo do
Wikidata sair**, o Google Knowledge Graph já reconhece a Patro como entidade
com identificadores oficiais verificáveis — os mesmos que serão usados como
fontes S854 nas statements Wikidata.