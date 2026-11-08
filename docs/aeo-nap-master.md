# Dados de referência — Patro Seguros

## Autoridade e limites

A fonte operacional do site é `src/config/empresa.ts` (`EMPRESA`). Este documento espelha os valores cadastrados; não comprova os dados no Google, em registros públicos ou em diretórios. A revisão da etapa 3 foi feita no repositório, sem acesso autorizado ao Perfil da Empresa. Não houve mudança de nome, endereço, telefone, horários ou outros dados oficiais.

Esta versão substitui instruções antigas deste documento sobre nome obrigatório, fundação em 2020, atendimento aos sábados e descrições com números comerciais. Eram divergentes da configuração atual ou não tinham comprovação apresentada nesta revisão. Não reutilizar essas instruções em novas submissões.

## Referência atualmente cadastrada no site

| Campo | Valor em `EMPRESA` | Situação |
| --- | --- | --- |
| Nome fantasia | Patro Seguros | Preservado; confirmar nome público real antes de editar diretórios |
| Razão social | Patro Corretora de Seguros LTDA | Identificação jurídica, não nome obrigatório do perfil |
| Telefone e WhatsApp | (11) 5199-7500 | Preservado |
| Telefone técnico | +551151997500 | Mesmo número em formato internacional |
| E-mail | contato@patroseguros.com.br | Preservado |
| Endereço, linha 1 | Av. Salgado Filho, 2120 — Sala 219 | `NAP_LINHA_1` |
| Endereço, linha 2 | Edifício Via Alameda — Cidade Maia, Guarulhos/SP — CEP 07115-000 | `NAP_LINHA_2` |
| Complemento cadastrado | Sala 219 — Edifício Via Alameda — Cidade Maia (Parque Renato Maia) | Confirmar nomenclatura com a Patro |
| Horário | Segunda a Sexta, 8h30 às 18h | Sábados, feriados e exceções precisam de confirmação |
| Site | https://www.patroseguros.com.br | Domínio canônico cadastrado |
| CNPJ | 41.641.558/0001-33 | Não consultado em registro externo nesta etapa |
| SUSEP | 212113511 | Não consultado em registro externo nesta etapa |
| Fundação | 2021 | Configuração preservada; antigo documento dizia 2020 |
| Google Maps | https://www.google.com/maps?cid=273879799324962533 | Destino cadastrado; titularidade e pin pendentes de conferência externa |
| Coordenadas | -23.4460, -46.5220 | Preservadas, não validadas em campo |

Não inventar filiais ou endereços de bairros atendidos. Confirmar se o local recebe clientes e se há necessidade de agendamento. Não inferir acessibilidade, estacionamento, plantão ou horário de seguradora como atributo da corretora.

## Formatos e nomes

Consistência significa identificar a mesma empresa, local e contato. Abreviações como “Av.”/“Avenida” e formatação do telefone não são, isoladamente, prova de erro nem de perda de posicionamento. No código, preferir os valores e auxiliares de `EMPRESA` para evitar cópias desatualizadas.

No Google, usar o nome pelo qual a empresa se apresenta no mundo real, comprovável em fachada e materiais oficiais; não acrescentar bairros, produtos ou palavras-chave. Não substituir automaticamente por razão social ou por “Patro Corretora de Seguros”. Nome de exibição e razão social têm funções diferentes.

## Descrição proposta — aprovação comercial antes de uso externo

> A Patro Seguros é uma corretora sediada em Guarulhos. A equipe orienta pessoas e empresas na solicitação e comparação de propostas de seguros. Entre em contato para consultar as modalidades disponíveis, os documentos necessários e as condições de contratação. Coberturas, limites, franquias e aceitação dependem do produto e da análise da seguradora. Confirme com a equipe a disponibilidade de atendimento presencial.

É uma proposta, não uma descrição publicada no Perfil da Empresa. Não inclui quantidade de clientes, nota, seguradoras, rede médica, descontos ou prazo garantido. Serviços específicos só devem ser acrescentados após validação da operação atual.

## Perfis cadastrados na configuração

- Google Maps: https://www.google.com/maps?cid=273879799324962533
- Instagram: https://www.instagram.com/patroseguros
- Facebook: https://www.facebook.com/patroseguros
- LinkedIn: https://www.linkedin.com/company/patro-seguros
- YouTube: https://www.youtube.com/@patroseguros

A configuração não comprova titularidade ou atividade desses perfis. TikTok, X/Twitter e Reclame Aqui apareciam no documento anterior, mas não em `EMPRESA.redesSociais`: não tratá-los como confirmados sem validação. Não é determinação de remoção em qualquer plataforma.

## Aprovação e manutenção

1. A direção confirma cada campo com documentos, funcionamento real e acesso ao perfil.
2. Registra-se valor atual, valor proposto, evidência, responsável e aprovação.
3. Só então se atualizam configuração, conteúdo estático, dados estruturados e diretórios autorizados.
4. Conferem-se preview e produção, links de telefone/WhatsApp, pin do mapa e horários especiais.
5. Repetir após mudanças operacionais e conferir contatos e horários periodicamente.

O verificador antigo `scripts/validate-nap-citations.mjs` tem nomes fixos, URLs presumidas e comparação textual limitada; não lê este documento em tempo de execução. Seus resultados não comprovam divergência factual, existência de ficha ou aprovação do nome do Google. Não usá-lo como autorização de alteração externa.

Auditoria e processo operacional: `docs/aeo-fase-c-gbp-checklist.md`. Relatório de passagem: `docs/auditoria-local-parte-2-etapa-3.md`.
