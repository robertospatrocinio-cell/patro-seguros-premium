# WebMCP — primeira versão (Imperative API)

Referência: https://developer.chrome.com/docs/ai/webmcp/imperative-api

## Ferramentas registradas

Registradas apenas enquanto o formulário **Cotação Express** (`src/components/QuickLeadForm.tsx`, home) está montado:

| Ferramenta | Tipo | Efeito |
| --- | --- | --- |
| `listar_tipos_de_seguro` | somente leitura (`readOnlyHint: true`) | devolve id + nome das opções reais do campo "Tipo de Seguro" |
| `preparar_solicitacao_cotacao` | modifica o formulário (`readOnlyHint: false`) | preenche os campos para revisão do visitante |

`preparar_solicitacao_cotacao` **não** envia formulário, não abre WhatsApp, não grava em banco, não dispara CRM/e-mail/analytics com dados pessoais, não marca consentimento e não calcula cotação. O envio continua exclusivamente no botão existente do formulário. Nenhuma ferramenta de envio é exposta nesta etapa.

## Implementação

- `src/lib/webmcp.ts` — feature detection de `navigator.modelContext.registerTool`; sem suporte, tudo é no-op silencioso.
- `src/hooks/useWebMcpTool.ts` — registro/remoção no ciclo de vida, com contador por nome (evita duplicação em StrictMode e navegação SPA).
- `src/data/quickLeadInsuranceTypes.ts` — fonte única das opções, consumida pelo `<Select>` e pela ferramenta de listagem.
- Validação em execução: chaves desconhecidas rejeitadas, tipos conferidos, ids resolvidos contra o enum e schema `expressLeadSchema` (mesmo do envio manual). Retornos mascaram dados pessoais.
- Sem servidor MCP, sem chatbot, sem dependência de API de IA. Execução restrita à própria origem.

## Pendência de ativação

WebMCP está em fase experimental no Chrome (flag/Origin Trial). Para `patroseguros.com.br`, é necessário registrar o site no Origin Trial vigente e publicar o token (meta `origin-trial`) — **token ainda não solicitado**; nenhum valor foi inventado. Sem o token/flag, o site funciona normalmente e as ferramentas simplesmente não são registradas.
